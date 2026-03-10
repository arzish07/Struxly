"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Wand2,
    Sparkles,
    Send,
    LayoutGrid,
    Rows3,
    GalleryHorizontal,
    Loader2,
} from "lucide-react";
import { mockProducts } from "@/lib/mockShopifyData";

const vibeLayouts = {
    editorial: {
        label: "Editorial Grid",
        cols: "grid-cols-2",
        aspect: "aspect-[3/4]",
        textSize: "text-lg",
    },
    magazine: {
        label: "Magazine Layout",
        cols: "grid-cols-3",
        aspect: "aspect-square",
        textSize: "text-sm",
    },
    minimal: {
        label: "Minimal List",
        cols: "grid-cols-1",
        aspect: "aspect-[16/6]",
        textSize: "text-base",
    },
};

function parseVibePrompt(prompt) {
    const lower = prompt.toLowerCase();
    if (lower.includes("editorial") || lower.includes("fashion") || lower.includes("high-end")) {
        return "editorial";
    }
    if (lower.includes("magazine") || lower.includes("lookbook") || lower.includes("catalog")) {
        return "magazine";
    }
    if (lower.includes("minimal") || lower.includes("clean") || lower.includes("simple")) {
        return "minimal";
    }
    return "editorial"; // default
}

export default function VibeMapper({ isConnected }) {
    const [prompt, setPrompt] = useState("");
    const [activeLayout, setActiveLayout] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        if (!prompt.trim() || !isConnected) return;
        setIsGenerating(true);

        setTimeout(() => {
            const layout = parseVibePrompt(prompt);
            setActiveLayout(layout);
            setIsGenerating(false);
        }, 1800);
    };

    const layout = activeLayout ? vibeLayouts[activeLayout] : null;

    return (
        <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500/20 to-pink-500/10">
                    <Wand2 className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-white">Vibe Mapper</h3>
                    <p className="text-xs text-slate-500">
                        Vibe-code your product displays
                    </p>
                </div>
            </div>

            {/* Vibe Prompt Input */}
            <div className="flex gap-2 mb-4">
                <div className="flex-1 relative">
                    <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-violet-500/50" />
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                        placeholder={
                            isConnected
                                ? "Show my latest drops in a high-fashion editorial grid..."
                                : "Connect Shopify to start vibe-coding..."
                        }
                        disabled={!isConnected || isGenerating}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25 transition-all disabled:opacity-40"
                    />
                </div>
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || !isConnected || isGenerating}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 text-white text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                    {isGenerating ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                        <Send className="w-3.5 h-3.5" />
                    )}
                </motion.button>
            </div>

            {/* Quick layout buttons */}
            <div className="flex gap-2 mb-4">
                {[
                    { key: "editorial", icon: GalleryHorizontal, label: "Editorial" },
                    { key: "magazine", icon: LayoutGrid, label: "Magazine" },
                    { key: "minimal", icon: Rows3, label: "Minimal" },
                ].map(({ key, icon: Icon, label }) => (
                    <button
                        key={key}
                        onClick={() => {
                            if (isConnected) {
                                setActiveLayout(key);
                            }
                        }}
                        disabled={!isConnected}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all ${activeLayout === key
                                ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
                                : "bg-white/5 text-slate-500 border border-transparent hover:text-slate-300 hover:bg-white/8"
                            } disabled:opacity-30 disabled:cursor-not-allowed`}
                    >
                        <Icon className="w-3 h-3" />
                        {label}
                    </button>
                ))}
            </div>

            {/* Product Grid Preview */}
            <AnimatePresence mode="wait">
                {layout && (
                    <motion.div
                        key={activeLayout}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-[10px] text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded">
                                {layout.label}
                            </span>
                            <span className="text-[10px] text-slate-600">
                                {mockProducts.length} products loaded from Shopify
                            </span>
                        </div>
                        <div className={`grid ${layout.cols} gap-3`}>
                            {mockProducts.slice(0, 6).map((product, i) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.08 }}
                                    className="glass rounded-xl overflow-hidden group hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <div
                                        className={`${layout.aspect} bg-gradient-to-br ${product.gradient} group-hover:scale-105 transition-transform duration-500 relative`}
                                    >
                                        {product.tags.includes("new-arrival") && (
                                            <span className="absolute top-2 left-2 text-[8px] font-bold uppercase tracking-wider bg-white/10 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                                                New
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-3">
                                        <h4 className={`${layout.textSize} font-semibold text-white truncate`}>
                                            {product.title}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-white font-medium">
                                                ${product.price}
                                            </span>
                                            {product.compareAtPrice && (
                                                <span className="text-[10px] text-slate-500 line-through">
                                                    ${product.compareAtPrice}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[10px] text-slate-500 mt-1">{product.vendor}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!layout && isConnected && (
                <div className="text-center py-8">
                    <Sparkles className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                    <p className="text-xs text-slate-600">
                        Type a vibe prompt above to generate your product display
                    </p>
                </div>
            )}
        </div>
    );
}
