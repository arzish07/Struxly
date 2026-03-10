"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
    onAuthStateChanged,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribeSnapshot = null;

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                try {
                    // Fetch or create user profile in Firestore
                    const profileRef = doc(db, "users", firebaseUser.uid);
                    const profileSnap = await getDoc(profileRef);

                    if (!profileSnap.exists()) {
                        // First-time user — create profile
                        const newProfile = {
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            displayName: firebaseUser.displayName || "User",
                            photoURL: firebaseUser.photoURL || null,
                            plan: "free",
                            editCredits: 50,
                            maxEditCredits: 50,
                            sites: 0,
                            maxSites: 1,
                            createdAt: serverTimestamp(),
                            lastLogin: serverTimestamp(),
                        };
                        await setDoc(profileRef, newProfile);
                    }

                    // Attach real-time listener with error handler
                    unsubscribeSnapshot = onSnapshot(profileRef, async (snapshot) => {
                        if (snapshot.exists()) {
                            const data = snapshot.data();

                            // Live migration for older accounts to new schema
                            if (data.editCredits === undefined) {
                                const legacyEdits = data.edit_credits !== undefined ? data.edit_credits : 50;
                                await setDoc(profileRef, { editCredits: legacyEdits, maxEditCredits: 50 }, { merge: true });
                                data.editCredits = legacyEdits;
                                data.maxEditCredits = 50;
                            }

                            setProfile(data);
                        }
                    }, (error) => {
                        // Silently handle Firestore errors (e.g., Datastore not initialized)
                        console.warn("⚠️ onSnapshot error (non-fatal):", error.message);
                    });

                } catch (error) {
                    console.warn("⚠️ Firestore profile fetch failed (Datastore may still be initializing):", error.message);
                    // Provide fallback profile so the UI doesn't show "0 credits"
                    setProfile({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        displayName: firebaseUser.displayName || "User",
                        photoURL: firebaseUser.photoURL || null,
                        plan: "free",
                        editCredits: 50,
                        maxEditCredits: 50,
                        sites: 0,
                        maxSites: 1,
                    });
                }
            } else {
                setUser(null);
                setProfile(null);
                if (unsubscribeSnapshot) {
                    unsubscribeSnapshot();
                    unsubscribeSnapshot = null;
                }
            }
            setLoading(false);
        });
        return () => {
            unsubscribe();
            if (unsubscribeSnapshot) unsubscribeSnapshot();
        };
    }, []);

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return result.user;
        } catch (error) {
            console.error("Google sign-in error:", error);
            throw error;
        }
    };

    const signInWithEmailPassword = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (error) {
            console.error("Email sign-in error:", error);
            throw error;
        }
    };

    const signUpWithEmailPassword = async (email, password, displayName = "User") => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (error) {
            console.error("Email sign-up error:", error);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            if (typeof window !== 'undefined') {
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Sign-out error:", error);
        }
    };

    const value = {
        user,
        profile,
        setProfile,
        loading,
        isAuthenticated: !!user,
        signInWithGoogle,
        signInWithEmailPassword,
        signUpWithEmailPassword,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}
