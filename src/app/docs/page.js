"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Code2, Puzzle, Rocket, Search, ArrowRight } from "lucide-react";

const sections = [
    { icon: Rocket, title: "Quick Start", desc: "Get up and running with Struxly in under 5 minutes.", href: "#" },
    { icon: Code2, title: "AI Prompt Reference", desc: "Learn how to write effective prompts for website creation and editing.", href: "#" },
    { icon: Puzzle, title: "Templates", desc: "Browse and customize pre-built templates for your project.", href: "#" },
    { icon: BookOpen, title: "Deployment", desc: "Deploy your site with custom domains, SSL, and CDN.", href: "#" },
];

export default function DocsPage() {
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

            <section className="pt-20 pb-16 px-6 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-[42px] font-bold text-gray-900 mb-3">Documentation</h1>
                    <p className="text-[17px] text-gray-500 max-w-[480px] mx-auto mb-8">Everything you need to know about building with Struxly.</p>
                    <div className="max-w-[400px] mx-auto flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search documentation..." className="bg-transparent border-none outline-none w-full text-[13px] text-gray-900 placeholder-gray-400" />
                    </div>
                </motion.div>
            </section>

            <section className="max-w-[900px] mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {sections.map((s, i) => (
                        <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <Link href={s.href} className="block border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow group">
                                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mb-4"><s.icon className="w-5 h-5 text-gray-600" /></div>
                                <h3 className="text-[16px] font-bold text-gray-900 mb-1 group-hover:text-violet-600 transition-colors">{s.title}</h3>
                                <p className="text-[13px] text-gray-500 leading-relaxed">{s.desc}</p>
                            </Link>
                        </motion.div>
                    ))}
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
