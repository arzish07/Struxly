"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowUp, Plus, Mic } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [mode, setMode] = useState("login");
    const router = useRouter();
    const { signInWithGoogle, signInWithEmailPassword, signUpWithEmailPassword } = useAuth();

    /* ── Typewriter effect (same as homepage hero) ── */
    const baseText = "Ask Struxly to ";
    const suffixes = [
        "create a website for my business",
        "create a dashboard",
        "create a landing page for my startup",
        "change product descriptions",
        "update the hero section",
        "design a portfolio site",
    ];
    const [displayText, setDisplayText] = useState(baseText);
    const [suffixIndex, setSuffixIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentSuffix = suffixes[suffixIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (charIndex < currentSuffix.length) {
                    setCharIndex((prev) => prev + 1);
                    setDisplayText(baseText + currentSuffix.slice(0, charIndex + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 1200);
                }
            } else {
                if (charIndex > 0) {
                    setCharIndex((prev) => prev - 1);
                    setDisplayText(baseText + currentSuffix.slice(0, charIndex - 1));
                } else {
                    setIsDeleting(false);
                    setSuffixIndex((prev) => (prev + 1) % suffixes.length);
                    setDisplayText(baseText);
                }
            }
        }, isDeleting ? 18 : 35);
        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, suffixIndex]);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError("");
        try {
            await signInWithGoogle();
            router.push("/portal");
        } catch (error) {
            console.error("Sign-in error:", error);
            setError("Failed to sign in with Google.");
        } finally {
            setLoading(false);
        }
    };

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            if (mode === "login") {
                await signInWithEmailPassword(email, password);
            } else {
                await signUpWithEmailPassword(email, password);
            }
            router.push("/portal");
        } catch (error) {
            console.error("Email auth error:", error);
            setError(mode === "login" ? "Invalid email or password." : "Failed to create account.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-white overflow-hidden">
            {/* ── Left: Auth Form ── */}
            <div className="w-full lg:w-[480px] flex flex-col justify-center px-10 lg:px-16 py-12 flex-shrink-0">
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Logo */}
                    <div className="flex items-center gap-2.5 mb-10">
                        <img src="/logo-symbol.png" alt="" className="w-7 h-7 object-contain" />
                    </div>

                    {/* Title */}
                    <h1 className="text-[28px] font-bold text-gray-900 mb-8">
                        {mode === "login" ? "Log in" : "Create your account"}
                    </h1>

                    {/* OAuth Buttons */}
                    <div className="space-y-3 mb-5">
                        <button
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors relative disabled:opacity-60"
                        >
                            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            {loading ? "Signing in..." : "Continue with Google"}
                            <span className="absolute right-3 text-[10px] font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                                Last used
                            </span>
                        </button>

                        <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            Continue with GitHub
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-5">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-[12px] font-medium text-gray-400 uppercase">or</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 text-[13px] font-medium text-red-500 bg-red-50 px-3 py-2 rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}

                    {/* Email / Password Form */}
                    <form onSubmit={handleEmailAuth}>
                        <div className="space-y-4 mb-5">
                            <div className="space-y-1.5">
                                <label className="text-[13px] font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-gray-800 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[13px] font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] text-gray-800 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !email || !password}
                            className="w-full bg-gray-900 text-white text-[14px] font-semibold py-2.5 rounded-lg hover:bg-gray-800 transition-colors mb-5 disabled:opacity-60"
                        >
                            {loading ? "Please wait..." : "Continue"}
                        </button>
                    </form>

                    {/* Toggle */}
                    <p className="text-center text-[13px] text-gray-500">
                        {mode === "login" ? (
                            <>Don't have an account?{" "}
                                <button onClick={() => setMode("signup")} className="text-gray-900 underline underline-offset-2 font-medium hover:text-gray-700">
                                    Create your account
                                </button>
                            </>
                        ) : (
                            <>Already have an account?{" "}
                                <button onClick={() => setMode("login")} className="text-gray-900 underline underline-offset-2 font-medium hover:text-gray-700">
                                    Log in
                                </button>
                            </>
                        )}
                    </p>

                    {/* SSO Note */}
                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center items-center gap-1.5 text-[12px] text-gray-400">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span>SSO available on <span className="underline underline-offset-2 cursor-pointer hover:text-gray-600">Business and Enterprise</span> plans</span>
                    </div>
                </motion.div>
            </div>

            {/* ── Right: Exact same gradient as hero section ── */}
            <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden">
                {/* Same animated gradient + blobs as homepage hero */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 z-0 hero-gradient-bg" />
                    <div className="hero-blob hero-blob-1" />
                    <div className="hero-blob hero-blob-2" />
                    <div className="hero-blob hero-blob-3" />
                    <div className="hero-blob hero-blob-4" />
                </div>

                {/* Prompt bar with typewriter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="relative z-10 w-full max-w-[500px] mx-8"
                >
                    <div
                        className="rounded-2xl overflow-hidden"
                        style={{
                            background: "rgba(255,255,255,0.65)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            boxShadow: "0 8px 32px rgba(249, 115, 22, 0.12), 0 0 0 1px rgba(255,255,255,0.5)",
                        }}
                    >
                        <div className="px-5 pt-4 pb-2">
                            <div className="flex items-start">
                                <span className="text-gray-600 text-[15px] leading-relaxed">
                                    {displayText}
                                    <span
                                        className="inline-block w-[2px] h-[18px] bg-gray-400 ml-[1px] align-middle"
                                        style={{ animation: "blink 1s step-end infinite" }}
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between px-4 pb-3">
                            <div className="p-1.5 rounded-lg text-gray-400">
                                <Plus className="w-4 h-4" />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[12.5px] text-gray-400 font-medium">Plan</span>
                                <div className="p-1.5 rounded-lg text-gray-400">
                                    <Mic className="w-4 h-4" />
                                </div>
                                <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center text-white">
                                    <ArrowUp className="w-3.5 h-3.5" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
