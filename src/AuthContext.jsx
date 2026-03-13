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

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get extra data (plan, goal etc) from Firestore
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        const extra = docSnap.exists() ? docSnap.data() : {};
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || extra.name || "Learner",
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

  // Save user doc to Firestore
  async function saveUserDoc(firebaseUser, extra = {}) {
    const docRef = doc(db, "users", firebaseUser.uid);
    const docSnap = await getDoc(docRef);
    const existing = docSnap.exists() ? docSnap.data() : {};
    await setDoc(docRef, {
      name: firebaseUser.displayName || extra.name || "Learner",
      email: firebaseUser.email,
      plan: existing.plan || "free", // never downgrade existing plan
      goal: extra.goal || existing.goal || "",
      createdAt: existing.createdAt || new Date().toISOString(),
    }, { merge: true });
  }

  // Email + password login
  async function login(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await saveUserDoc(result.user);
    return result;
  }

  // Email + password signup
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

  // Google login
  async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    await saveUserDoc(result.user);
    return result;
  }

  // Upgrade to Pro — saves to Firestore
  async function upgradePro() {
    if (!user) return;
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, { plan: "pro" }, { merge: true });
    setUser(prev => ({ ...prev, plan: "pro" }));
  }

  // Logout
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