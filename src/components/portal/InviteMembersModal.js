"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Send, UserPlus, Check, Crown } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function InviteMembersModal({ onClose }) {
    const { user } = useAuth();
    const { currentPlan } = useSubscription();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [role, setRole] = useState("viewer");
    const [invites, setInvites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    const isPro = ["pro", "studio"].includes(currentPlan?.id);

    const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

    const handleAdd = () => {
        const trimmed = email.trim().toLowerCase();
        if (!isValidEmail(trimmed)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (invites.find((i) => i.email === trimmed)) {
            setError("Already added.");
            return;
        }
        setInvites((prev) => [...prev, { email: trimmed, role }]);
        setEmail("");
        setError("");
    };

    const handleRemove = (emailToRemove) => {
        setInvites((prev) => prev.filter((i) => i.email !== emailToRemove));
    };

    const handleSend = async () => {
        if (invites.length === 0) {
            setError("Add at least one email address.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const invitesRef = collection(db, "workspaceInvites");
            await Promise.all(
                invites.map((inv) =>
                    addDoc(invitesRef, {
                        inviterUid: user.uid,
                        inviterName: user.displayName || user.email,
                        inviterEmail: user.email,
                        inviteeEmail: inv.email,
                        role: inv.role,
                        status: "pending",
                        createdAt: serverTimestamp(),
                    })
                )
            );
            setSent(true);
        } catch (err) {
            console.error(err);
            setError("Failed to send invites. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 8 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                                <UserPlus className="w-4 h-4 text-indigo-600" />
                            </div>
                            <div>
                                <h2 className="text-[14px] font-semibold text-gray-900">Invite members</h2>
                                <p className="text-[11px] text-gray-400">Collaborate on your workspace</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Pro Gate */}
                    {!isPro ? (
                        <div className="p-6 text-center space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mx-auto">
                                <Crown className="w-6 h-6 text-amber-500" />
                            </div>
                            <div>
                                <p className="text-[14px] font-semibold text-gray-900 mb-1">Team collaboration is a Pro feature</p>
                                <p className="text-[12px] text-gray-400 leading-relaxed">Upgrade to Pro or Studio to invite teammates and collaborate on projects together.</p>
                            </div>
                            <Link
                                href="/portal/settings/plans"
                                onClick={onClose}
                                className="block w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[13px] font-semibold rounded-xl hover:from-indigo-700 hover:to-violet-700 transition-all shadow-sm"
                            >
                                Upgrade to Pro →
                            </Link>
                            <button onClick={onClose} className="text-[12px] text-gray-400 hover:text-gray-600 transition-colors">
                                Maybe later
                            </button>
                        </div>
                    ) : sent ? (
                        /* Success state */
                        <div className="p-6 text-center space-y-4">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mx-auto"
                            >
                                <Check className="w-6 h-6 text-green-600" />
                            </motion.div>
                            <div>
                                <p className="text-[14px] font-semibold text-gray-900 mb-1">Invites sent! 🎉</p>
                                <p className="text-[12px] text-gray-400">
                                    {invites.length} invite{invites.length > 1 ? "s" : ""} sent successfully. They'll receive an email shortly.
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[13px] font-medium rounded-xl transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    ) : (
                        /* Invite form */
                        <div className="p-5 space-y-4">
                            {/* Email input + role */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Email address</label>
                                <div className="flex gap-2">
                                    <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-indigo-400 focus-within:bg-white transition-all">
                                        <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value); setError(""); }}
                                            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                                            placeholder="teammate@company.com"
                                            className="flex-1 bg-transparent text-[13px] text-gray-900 placeholder-gray-400 outline-none"
                                        />
                                    </div>
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-[12px] text-gray-700 font-medium outline-none focus:border-indigo-400 transition-all"
                                    >
                                        <option value="viewer">Viewer</option>
                                        <option value="editor">Editor</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <button
                                    onClick={handleAdd}
                                    className="w-full py-2 text-[12px] font-medium text-indigo-600 border border-dashed border-indigo-200 rounded-xl hover:bg-indigo-50 transition-colors"
                                >
                                    + Add to invite list
                                </button>
                                {error && <p className="text-[11px] text-red-500">{error}</p>}
                            </div>

                            {/* Pending invites list */}
                            {invites.length > 0 && (
                                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Ready to send</p>
                                    {invites.map((inv) => (
                                        <div key={inv.email} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                                            <Mail className="w-3 h-3 text-gray-400 shrink-0" />
                                            <span className="flex-1 text-[12px] text-gray-700 truncate">{inv.email}</span>
                                            <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-medium capitalize">{inv.role}</span>
                                            <button onClick={() => handleRemove(inv.email)} className="text-gray-400 hover:text-red-500 transition-colors ml-1">
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Send button */}
                            <button
                                onClick={handleSend}
                                disabled={loading || invites.length === 0}
                                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[13px] font-semibold rounded-xl transition-all shadow-sm active:scale-[0.98]"
                            >
                                <Send className="w-3.5 h-3.5" />
                                {loading ? "Sending..." : `Send ${invites.length > 0 ? invites.length : ""} Invite${invites.length !== 1 ? "s" : ""}`}
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
