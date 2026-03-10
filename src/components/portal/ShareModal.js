"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Sparkles, Gift, Medal } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ShareModal({ isOpen, onClose }) {
    const { user } = useAuth();
    const [copied, setCopied] = useState(false);

    const inviteCode = user?.uid?.slice(0, 8)?.toUpperCase() || "STRUXLY";
    const inviteLink = `https://struxly.ai/invite/${inviteCode}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(inviteLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
            const el = document.createElement("textarea");
            el.value = inviteLink;
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    useEffect(() => {
        if (!isOpen) setCopied(false);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 z-[100]"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[480px] bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden border border-gray-200"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 pt-5 pb-3">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-amber-500" />
                                <span className="text-[14px] font-semibold text-gray-900">Earn 100+ credits</span>
                            </div>
                            <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Banner */}
                        <div className="mx-6 mb-5 rounded-xl bg-gradient-to-r from-amber-50 via-orange-50 to-pink-50 p-6">
                            <h2 className="text-[24px] font-bold text-gray-900 mb-1">Spread the love</h2>
                            <p className="text-[14px] text-gray-500">and earn free credits</p>
                        </div>

                        {/* How it works */}
                        <div className="px-6 space-y-4 mb-6">
                            <p className="text-[13px] font-semibold text-gray-700">How it works:</p>
                            <div className="flex items-start gap-3">
                                <Gift className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                                <p className="text-[13px] text-gray-600">Share your invite link</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <Sparkles className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                                <p className="text-[13px] text-gray-600">They sign up and get <strong>extra 10 credits</strong></p>
                            </div>
                            <div className="flex items-start gap-3">
                                <Medal className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                                <p className="text-[13px] text-gray-600">You get <strong>100 credits</strong> once they subscribe to a paid plan</p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="px-6 mb-4">
                            <p className="text-[12px] text-gray-500 mb-3">0 signed up, 0 converted</p>
                        </div>

                        {/* Invite Link */}
                        <div className="px-6 mb-5">
                            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
                                <span className="flex-1 text-[13px] text-gray-600 truncate">{inviteLink}</span>
                                <button
                                    onClick={handleCopy}
                                    className={`px-4 py-1.5 rounded-md text-[12px] font-medium transition-colors ${copied
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-900 text-white hover:bg-gray-800"
                                        }`}
                                >
                                    {copied ? (
                                        <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Copied</span>
                                    ) : (
                                        "Copy link"
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 pb-5">
                            <button className="text-[12px] text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
                                View Terms and Conditions
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
