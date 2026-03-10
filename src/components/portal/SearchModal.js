"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, FileText } from "lucide-react";
import Link from "next/link";
import { useProjects } from "@/context/ProjectContext";

export default function SearchModal({ isOpen, onClose }) {
    const [query, setQuery] = useState("");
    const inputRef = useRef(null);
    const { projects } = useProjects();

    const formatDate = (dateObj) => {
        if (!dateObj) return "";
        if (typeof dateObj === 'string') return new Date(dateObj).toLocaleDateString();
        // If it's a Firestore Timestamp, it has toDate()
        if (dateObj && typeof dateObj.toDate === 'function') {
            return dateObj.toDate().toLocaleDateString();
        }
        // Fallback for native Date objects
        if (dateObj instanceof Date) {
            return dateObj.toLocaleDateString();
        }
        return "";
    };

    useEffect(() => {
        if (isOpen) {
            setQuery("");
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Ctrl+K shortcut
    useEffect(() => {
        function handleKeyDown(e) {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                if (isOpen) onClose();
            }
            if (e.key === "Escape" && isOpen) onClose();
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    const recentProjects = (projects || []).slice(0, 6);
    const filtered = query
        ? recentProjects.filter(p => p.title?.toLowerCase().includes(query.toLowerCase()))
        : recentProjects;

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
                        initial={{ opacity: 0, y: -20, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-[560px] bg-white rounded-2xl shadow-2xl z-[101] overflow-hidden border border-gray-200"
                    >
                        {/* Search Input */}
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                            <Search className="w-5 h-5 text-gray-400 shrink-0" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search projects and folders"
                                className="flex-1 text-[15px] text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
                            />
                        </div>

                        {/* Results */}
                        <div className="max-h-[350px] overflow-y-auto">
                            {filtered.length > 0 && (
                                <div className="px-3 py-2">
                                    <p className="px-3 py-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                                        {query ? "Results" : "Recent projects"}
                                    </p>
                                    {filtered.map(p => (
                                        <Link
                                            key={p.id}
                                            href={`/canvas?projectId=${p.id}&project=${encodeURIComponent(p.title)}&template=${p.templateSlug || "nexus-flow"}`}
                                            onClick={onClose}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="w-10 h-7 rounded-md bg-gray-100 overflow-hidden flex-shrink-0">
                                                {p.image ? (
                                                    <img src={p.image} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <FileText className="w-3.5 h-3.5 text-gray-300" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[13px] font-medium text-gray-900 truncate">{p.title}</p>
                                                <p className="text-[11px] text-gray-400 flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                                    You
                                                </p>
                                            </div>
                                            <span className="text-[11px] text-gray-400 shrink-0">{formatDate(p.lastEdited)}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                            {query && filtered.length === 0 && (
                                <div className="px-5 py-8 text-center text-[14px] text-gray-400">No projects found.</div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
