"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, FolderPlus, Sparkles } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const WORKSPACE_COLORS = [
    { bg: "from-violet-500 to-indigo-600", label: "Indigo" },
    { bg: "from-blue-500 to-cyan-500", label: "Blue" },
    { bg: "from-emerald-500 to-teal-600", label: "Emerald" },
    { bg: "from-rose-500 to-pink-600", label: "Rose" },
    { bg: "from-amber-400 to-orange-500", label: "Amber" },
    { bg: "from-slate-600 to-gray-700", label: "Slate" },
];

export default function CreateWorkspaceModal({ onClose, onCreated }) {
    const { user } = useAuth();
    const router = useRouter();

    const [name, setName] = useState("");
    const [selectedColor, setSelectedColor] = useState(0);
    const [loading, setLoading] = useState(false);
    const [created, setCreated] = useState(null);
    const [error, setError] = useState("");

    const initial = name.trim() ? name.trim()[0].toUpperCase() : "W";

    const handleCreate = async () => {
        const trimmed = name.trim();
        if (!trimmed) {
            setError("Please enter a workspace name.");
            return;
        }
        if (trimmed.length < 2) {
            setError("Name must be at least 2 characters.");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const docRef = await addDoc(collection(db, "workspaces"), {
                name: trimmed,
                color: WORKSPACE_COLORS[selectedColor].bg,
                ownerUid: user.uid,
                ownerEmail: user.email,
                members: [user.uid],
                plan: "free",
                createdAt: serverTimestamp(),
            });
            setCreated({ id: docRef.id, name: trimmed });
            if (onCreated) onCreated({ id: docRef.id, name: trimmed });
        } catch (err) {
            console.error(err);
            setError("Failed to create workspace. Please try again.");
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
                    className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-sm overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                                <FolderPlus className="w-4 h-4 text-violet-600" />
                            </div>
                            <div>
                                <h2 className="text-[14px] font-semibold text-gray-900">New workspace</h2>
                                <p className="text-[11px] text-gray-400">Organise projects separately</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {!created ? (
                        <div className="p-5 space-y-4">
                            {/* Preview avatar */}
                            <div className="flex justify-center">
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${WORKSPACE_COLORS[selectedColor].bg} flex items-center justify-center text-white text-[22px] font-bold shadow-lg transition-all duration-200`}>
                                    {initial}
                                </div>
                            </div>

                            {/* Name input */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Workspace name</label>
                                <input
                                    type="text"
                                    autoFocus
                                    value={name}
                                    onChange={(e) => { setName(e.target.value); setError(""); }}
                                    onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                                    placeholder="e.g. Client Projects, Personal..."
                                    maxLength={40}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-[13px] text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-400 focus:bg-white transition-all"
                                />
                                {error && <p className="text-[11px] text-red-500">{error}</p>}
                            </div>

                            {/* Color picker */}
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Colour</label>
                                <div className="flex gap-2">
                                    {WORKSPACE_COLORS.map((c, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedColor(i)}
                                            className={`w-7 h-7 rounded-lg bg-gradient-to-br ${c.bg} transition-all ${selectedColor === i ? "ring-2 ring-offset-1 ring-gray-400 scale-110" : "hover:scale-105"}`}
                                            title={c.label}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Create button */}
                            <button
                                onClick={handleCreate}
                                disabled={loading || !name.trim()}
                                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[13px] font-semibold rounded-xl transition-all shadow-sm active:scale-[0.98]"
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                {loading ? "Creating..." : "Create workspace"}
                            </button>
                        </div>
                    ) : (
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
                                <p className="text-[14px] font-semibold text-gray-900 mb-1">"{created.name}" created! 🎉</p>
                                <p className="text-[12px] text-gray-400">Your new workspace is ready. Start adding projects to it.</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[13px] font-medium rounded-xl transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
