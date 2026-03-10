"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Lightbulb,
    Palette,
    FileText,
    Sparkles,
    ChevronDown,
    ChevronRight,
    Upload,
    ImageUp,
    Camera,
    Link2,
} from "lucide-react";

export const inspirePrompts = [
    { icon: Lightbulb, label: "Landing page for my startup", prompt: "Create a modern landing page for my SaaS startup with a hero section, features grid, pricing table, and a contact form" },
    { icon: Palette, label: "Portfolio website", prompt: "Design a clean portfolio website for a designer with a project gallery, about section, and contact page" },
    { icon: FileText, label: "Blog platform", prompt: "Build a blog platform with article cards, categories, reading time, and a newsletter signup" },
    { icon: Sparkles, label: "E-commerce store", prompt: "Create an e-commerce store with product cards, shopping cart, and checkout flow" },
];

export function PromptPlusMenu({ onSelectPrompt, className = "" }) {
    const [open, setOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
                setActiveCategory(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`relative ${className}`} ref={menuRef}>
            <button
                onClick={() => { setOpen(!open); setActiveCategory(null); }}
                className="p-1.5 rounded-lg hover:bg-black/5 text-gray-400 transition-colors"
            >
                <Plus className="w-4.5 h-4.5" />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute bottom-full left-0 mb-2 w-[240px] bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden z-[60]"
                    >
                        {!activeCategory && (
                            <div className="py-1.5">
                                <button
                                    onClick={() => setActiveCategory("inspire")}
                                    className="w-full flex items-center justify-between px-4 py-2.5 text-[13.5px] text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors group"
                                >
                                    <span className="flex items-center gap-2.5">
                                        <Sparkles className="w-4 h-4 text-violet-500" />
                                        Inspire
                                    </span>
                                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-violet-400" />
                                </button>
                                <button
                                    onClick={() => setActiveCategory("upload")}
                                    className="w-full flex items-center justify-between px-4 py-2.5 text-[13.5px] text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
                                >
                                    <span className="flex items-center gap-2.5">
                                        <Upload className="w-4 h-4 text-blue-500" />
                                        Upload
                                    </span>
                                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-400" />
                                </button>
                            </div>
                        )}

                        {activeCategory === "inspire" && (
                            <div className="py-1.5">
                                <button
                                    onClick={() => setActiveCategory(null)}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-[12px] text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <ChevronDown className="w-3 h-3 rotate-90" />
                                    <span className="font-medium">Inspire</span>
                                </button>
                                <div className="border-t border-gray-50 mt-1">
                                    {inspirePrompts.map((item) => (
                                        <button
                                            key={item.label}
                                            onClick={() => {
                                                onSelectPrompt(item.prompt);
                                                setOpen(false);
                                                setActiveCategory(null);
                                            }}
                                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors text-left"
                                        >
                                            <item.icon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeCategory === "upload" && (
                            <div className="py-1.5">
                                <button
                                    onClick={() => setActiveCategory(null)}
                                    className="w-full flex items-center gap-2 px-4 py-2 text-[12px] text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <ChevronDown className="w-3 h-3 rotate-90" />
                                    <span className="font-medium">Upload</span>
                                </button>
                                <div className="border-t border-gray-50 mt-1">
                                    <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                                        <ImageUp className="w-3.5 h-3.5 text-gray-400" />
                                        Image or wireframe
                                    </button>
                                    <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                                        <FileText className="w-3.5 h-3.5 text-gray-400" />
                                        Document
                                    </button>
                                    <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                                        <Camera className="w-3.5 h-3.5 text-gray-400" />
                                        Screenshot
                                    </button>
                                    <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                                        <Link2 className="w-3.5 h-3.5 text-gray-400" />
                                        Paste a URL
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
