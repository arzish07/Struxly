"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle, Mail, BookOpen, ArrowRight } from "lucide-react";

export default function SupportPage() {
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
                    <h1 className="text-[42px] font-bold text-gray-900 mb-3">Support</h1>
                    <p className="text-[17px] text-gray-500 max-w-[480px] mx-auto">We're here to help. Get in touch or browse our resources.</p>
                </motion.div>
            </section>

            <section className="max-w-[800px] mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                        { icon: MessageCircle, title: "Live Chat", desc: "Get instant help from our support team during business hours.", action: "Start chat", color: "bg-blue-50 text-blue-600" },
                        { icon: Mail, title: "Email Us", desc: "Send us a detailed message and we'll respond within 24 hours.", action: "support@struxly.ai", color: "bg-green-50 text-green-600" },
                        { icon: BookOpen, title: "Documentation", desc: "Browse guides, tutorials, and API docs.", action: "View docs", color: "bg-violet-50 text-violet-600" },
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow text-center"
                        >
                            <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mx-auto mb-4`}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <h3 className="text-[16px] font-bold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-[13px] text-gray-500 mb-4 leading-relaxed">{item.desc}</p>
                            <button className="text-[13px] font-semibold text-gray-900 hover:text-violet-600 transition-colors inline-flex items-center gap-1">
                                {item.action} <ArrowRight className="w-3.5 h-3.5" />
                            </button>
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
