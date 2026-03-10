import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAxc6oIHY4162lYRbY-g0xItw5JNR4AOV0",
    authDomain: "struxly-e249b.firebaseapp.com",
    projectId: "struxly-e249b",
    storageBucket: "struxly-e249b.firebasestorage.app",
    messagingSenderId: "731001641950",
    appId: "1:731001641950:web:3075fa0f3c0c86075d5b4f",
    measurementId: "G-RX2T7KWWLD",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app, 'struxlydatabase');
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export default app;
