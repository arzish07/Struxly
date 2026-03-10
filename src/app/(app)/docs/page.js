"use client";

import { BookOpen, FileText, Search, Code, Terminal, Zap, Shield, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function DocumentationPage() {
    return (
        <div className="min-h-screen bg-[#F9FAFB] flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-100 bg-white p-6 sticky top-0 h-screen overflow-y-auto">
                <div className="flex items-center gap-2 mb-8">
                    <BookOpen className="w-5 h-5 text-violet-600" />
                    <span className="font-bold text-gray-900 tracking-tight text-lg">Docs</span>
                </div>

                <div className="space-y-6">
                    <div>
                        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Getting Started</h4>
                        <div className="space-y-1">
                            {["Introduction", "Installation", "Quick Start"].map((item) => (
                                <button key={item} className="w-full text-left px-3 py-1.5 text-[13px] text-gray-600 hover:text-violet-600 hover:bg-violet-50 rounded-md transition-colors">
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Core Features</h4>
                        <div className="space-y-1">
                            {["Vibe Coding", "Agent Orchestration", "Artifacts"].map((item) => (
                                <button key={item} className="w-full text-left px-3 py-1.5 text-[13px] text-gray-600 hover:text-violet-600 hover:bg-violet-50 rounded-md transition-colors">
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Content */}
            <main className="flex-1 p-12 overflow-y-auto">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <header className="mb-12">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Documentation</h1>
                            <p className="text-xl text-gray-500 font-medium">Welcome to the Struxly knowledge base. Everything you need to build at the speed of thought.</p>
                        </header>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                            {[
                                { title: "Quickstart Guide", desc: "Build your first project in minutes.", icon: Zap, color: "text-amber-500" },
                                { title: "API Reference", desc: "Deep dive into our core APIs.", icon: Code, color: "text-blue-500" },
                                { title: "Security Guide", desc: "Our commitment to your data.", icon: Shield, color: "text-emerald-500" },
                                { title: "Changelog", desc: "What's new in the latest version.", icon: Info, color: "text-violet-500" }
                            ].map((card, i) => (
                                <div key={i} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                    <card.icon className={`w-8 h-8 ${card.color} mb-3`} />
                                    <h3 className="font-bold text-gray-900 mb-1">{card.title}</h3>
                                    <p className="text-sm text-gray-500">{card.desc}</p>
                                </div>
                            ))}
                        </div>

                        <section className="prose prose-slate max-w-none">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Struxly?</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Struxly is designed to bridge the gap between imagination and implementation. By combining powerful AI agents with a sleek,
                                intuitive interface, we enable you to "vibe code" entire applications through simple natural language commands.
                            </p>
                            <div className="bg-violet-50 border-l-4 border-violet-500 p-6 rounded-r-xl">
                                <p className="text-violet-900 font-medium italic">
                                    "Architecture should be as fluid as conversation."
                                </p>
                            </div>
                        </section>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
