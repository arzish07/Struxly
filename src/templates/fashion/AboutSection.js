"use client";

import { motion } from "framer-motion";

export default function AboutSection({ title, description }) {
    return (
        <section
            data-struxly-id="fashion-about"
            data-struxly-label="About Section"
            className="glass rounded-2xl p-12 mb-8 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-3xl">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs uppercase tracking-[0.3em] text-violet-400 mb-4"
                >
                    Our Story
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-white mb-6"
                >
                    {title || "Crafted with Intention"}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm text-slate-400 leading-relaxed"
                >
                    {description ||
                        "Born from a passion for minimalist design and sustainable craftsmanship, our brand bridges the gap between haute couture and everyday wear. Every piece tells a story of meticulous attention to detail and uncompromising quality. We believe fashion should be both beautiful and responsible."}
                </motion.p>
            </div>
        </section>
    );
}
