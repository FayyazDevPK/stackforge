import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBE4ryO2LltZ_41PdEvYUWldxk_8Ytjqys",
  authDomain: "stackforge-61696.firebaseapp.com",
  projectId: "stackforge-61696",
  storageBucket: "stackforge-61696.firebasestorage.app",
  messagingSenderId: "1048903880505",
  appId: "1:1048903880505:web:42af14dc3af2c5f23822e8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();