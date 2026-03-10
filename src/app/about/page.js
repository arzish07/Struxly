"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Globe, Users, Zap } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-[1200px] mx-auto px-6 h-[60px] flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/logo-symbol.png" alt="" className="w-5 h-5 object-contain" />
                        <img src="/logo-word.png" alt="Struxly" className="h-[18px] w-auto object-contain" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link href="/login" className="px-4 py-2 text-[13px] font-medium text-gray-700 hover:text-gray-900 transition-colors">Log in</Link>
                        <Link href="/login" className="px-4 py-2 text-[13px] font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">Get started</Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-24 pb-20 px-6 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-[42px] font-bold text-gray-900 leading-tight mb-4">
                        Building the future of<br />web creation
                    </h1>
                    <p className="text-[17px] text-gray-500 max-w-[540px] mx-auto mb-10">
                        Struxly empowers anyone to create stunning websites and applications through the power of AI conversation. No code. No complexity. Just dialogue.
                    </p>
                </motion.div>

                <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {[
                        { icon: Sparkles, title: "AI-First", desc: "Every feature is designed around intelligent AI assistance that understands your vision." },
                        { icon: Globe, title: "HQ: Guwahati", desc: "Born in India's northeast, built for the world. We're proudly headquartered in Guwahati, Assam." },
                        { icon: Users, title: "Community Driven", desc: "Our product roadmap is shaped by our community of creators and builders worldwide." },
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                            className="text-center p-6"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-4">
                                <item.icon className="w-5 h-5 text-gray-600" />
                            </div>
                            <h3 className="text-[16px] font-bold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-[13px] text-gray-500 leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Mission */}
            <section className="bg-gray-50 py-20 px-6">
                <div className="max-w-[600px] mx-auto text-center">
                    <h2 className="text-[28px] font-bold text-gray-900 mb-4">Our Mission</h2>
                    <p className="text-[15px] text-gray-500 leading-relaxed mb-6">
                        We believe that building for the web should be as natural as having a conversation. Struxly removes every barrier between your idea and a live website — no code, no drag-and-drop complexity, just tell us what you want.
                    </p>
                    <p className="text-[15px] text-gray-500 leading-relaxed">
                        Our team of engineers, designers, and AI researchers works every day to make web creation more accessible, more powerful, and more delightful for everyone.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 text-center">
                <h2 className="text-[28px] font-bold text-gray-900 mb-3">Start building today</h2>
                <p className="text-[15px] text-gray-500 mb-6">Join thousands of creators using Struxly to bring ideas to life.</p>
                <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-[14px] font-semibold rounded-xl hover:bg-gray-800 transition-colors">
                    Get started <ArrowRight className="w-4 h-4" />
                </Link>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-100 py-8 px-6">
                <div className="max-w-[1200px] mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/logo-symbol.png" alt="" className="w-5 h-5 object-contain" />
                        <span className="text-[13px] font-semibold text-gray-900">Struxly</span>
                    </Link>
                    <p className="text-[11px] text-gray-300">HQ: Guwahati</p>
                </div>
            </footer>
        </div>
    );
}
