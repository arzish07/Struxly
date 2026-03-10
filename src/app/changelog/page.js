"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Zap, Globe, Palette } from "lucide-react";

const entries = [
    { version: "v2.4", date: "Mar 3, 2026", icon: Sparkles, title: "Studio Plan & Team Workspaces", items: ["Unlimited websites on Studio plan", "Real-time team collaboration", "White-label export for agencies"] },
    { version: "v2.3", date: "Feb 22, 2026", icon: Zap, title: "Shopify Export", items: ["One-click Shopify theme export (Pro+)", "Theme customization preserved", "Automatic section mapping"] },
    { version: "v2.2", date: "Feb 10, 2026", icon: Palette, title: "Template Library Expansion", items: ["20+ new professional templates", "Real-estate, SaaS, and portfolio categories", "One-click template cloning"] },
    { version: "v2.1", date: "Feb 5, 2026", icon: Globe, title: "Custom Domains & SSL", items: ["Connect your own domain (Pro+)", "Automatic SSL certificate provisioning", "DNS verification wizard"] },
    { version: "v2.0", date: "Jan 28, 2026", icon: Sparkles, title: "Struxly 2.0 Launch", items: ["Complete light-mode redesign", "AI dialogue-based editing", "New subscription tiers", "Revamped portal experience"] },
];

export default function ChangelogPage() {
    return (
        <div className="min-h-screen bg-white">
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-[1200px] mx-auto px-6 h-[60px] flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3"><img src="/logo-symbol.png" alt="" className="w-5 h-5" /><img src="/logo-word.png" alt="Struxly" className="h-[18px] w-auto" /></Link>
                    <div className="flex items-center gap-3">
                        <Link href="/login" className="px-4 py-2 text-[13px] font-medium text-gray-700">Log in</Link>
                        <Link href="/login" className="px-4 py-2 text-[13px] font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800">Get started</Link>
                    </div>
                </div>
            </nav>

            <section className="pt-20 pb-10 px-6 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-[42px] font-bold text-gray-900 mb-3">Changelog</h1>
                    <p className="text-[17px] text-gray-500">What's new in Struxly</p>
                </motion.div>
            </section>

            <section className="max-w-[650px] mx-auto px-6 pb-24">
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gray-200" />

                    <div className="space-y-10">
                        {entries.map((entry, i) => (
                            <motion.div
                                key={entry.version}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="relative pl-12"
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-0 top-1 w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                                    <entry.icon className="w-4 h-4 text-gray-500" />
                                </div>

                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[11px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">{entry.version}</span>
                                    <span className="text-[12px] text-gray-400">{entry.date}</span>
                                </div>
                                <h3 className="text-[16px] font-bold text-gray-900 mb-2">{entry.title}</h3>
                                <ul className="space-y-1.5">
                                    {entry.items.map((item) => (
                                        <li key={item} className="text-[13px] text-gray-500 flex items-start gap-2">
                                            <span className="text-gray-300 mt-1.5">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="border-t border-gray-100 py-8 px-6">
                <div className="max-w-[1200px] mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2"><img src="/logo-symbol.png" alt="" className="w-5 h-5" /><span className="text-[13px] font-semibold text-gray-900">Struxly</span></Link>
                    <p className="text-[11px] text-gray-300">HQ: Guwahati</p>
                </div>
            </footer>
        </div>
    );
}
