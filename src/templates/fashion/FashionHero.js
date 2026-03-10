"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FashionHero({ heading, subtitle, ctaText, onCtaClick }) {
    return (
        <section
            data-struxly-id="fashion-hero"
            data-struxly-label="Fashion Hero"
            className="relative overflow-hidden rounded-2xl mb-8"
        >
            <div className="bg-gradient-to-br from-violet-600/20 via-slate-900 to-rose-500/15 p-20 text-center relative">
                {/* Background decorative elements */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-10 left-10 w-32 h-32 border border-white/5 rounded-full" />
                    <div className="absolute bottom-10 right-10 w-48 h-48 border border-white/5 rounded-full" />
                    <div className="absolute top-1/2 left-1/4 w-1 h-20 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xs uppercase tracking-[0.3em] text-violet-400 mb-6"
                >
                    New Season Collection
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-7xl font-extrabold mb-6 gradient-text leading-tight"
                >
                    {heading || "The Future of Fashion"}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto"
                >
                    {subtitle || "Discover curated collections that redefine modern elegance. Bold designs, timeless appeal."}
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onCtaClick}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-sm hover:shadow-xl hover:shadow-violet-500/25 transition-all inline-flex items-center gap-2"
                >
                    {ctaText || "Shop Collection"}
                    <ArrowRight className="w-4 h-4" />
                </motion.button>
            </div>
        </section>
    );
}
