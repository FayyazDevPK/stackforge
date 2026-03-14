import { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
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
    // Handle Google redirect result when user comes back
    getRedirectResult(auth).then(async (result) => {
      if (result?.user) {
        await createUserDocIfNew(result.user);
      }
    }).catch((err) => {
      console.error("Redirect error:", err);
    });

    // Listen to auth state
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

  // Create user doc only if new user
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

  // Email + password login
  async function login(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await createUserDocIfNew(result.user);
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

  // Google login — uses redirect instead of popup (more reliable)
  async function loginWithGoogle() {
    await signInWithRedirect(auth, googleProvider);
    // Page will redirect to Google, then come back
    // getRedirectResult above handles the result
  }

  // Upgrade to Pro
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