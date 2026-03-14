import { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "./firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        const extra = docSnap.exists() ? docSnap.data() : {};
        setUser({
          uid: firebaseUser.uid,
          name: extra.name || firebaseUser.displayName || "Learner",
          email: firebaseUser.email,
          plan: extra.plan || "free",
          goal: extra.goal || "",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  async function createUserDocIfNew(firebaseUser, extra = {}) {
    const docRef = doc(db, "users", firebaseUser.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        name: extra.name || firebaseUser.displayName || "Learner",
        email: firebaseUser.email,
        plan: "free",
        goal: extra.goal || "",
        createdAt: new Date().toISOString(),
      });
    }
  }

  async function login(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await createUserDocIfNew(result.user);
    return result;
  }

  async function signup(name, email, password, goal) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });
    await setDoc(doc(db, "users", result.user.uid), {
      name,
      email,
      plan: "free",
      goal,
      createdAt: new Date().toISOString(),
    });
    return result;
  }

  // Google login with popup
  async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    await createUserDocIfNew(result.user);
    // Manually set user state immediately so navigate works right away
    const docRef = doc(db, "users", result.user.uid);
    const docSnap = await getDoc(docRef);
    const extra = docSnap.exists() ? docSnap.data() : {};
    setUser({
      uid: result.user.uid,
      name: extra.name || result.user.displayName || "Learner",
      email: result.user.email,
      plan: extra.plan || "free",
      goal: extra.goal || "",
    });
    return result;
  }

  async function upgradePro() {
    if (!user) return;
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, { plan: "pro" }, { merge: true });
    setUser(prev => ({ ...prev, plan: "pro" }));
  }

  async function logout() {
    await signOut(auth);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, loginWithGoogle, upgradePro, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}