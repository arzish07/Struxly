"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Video, FileText, Lightbulb, ArrowRight } from "lucide-react";

const guides = [
    { icon: Lightbulb, title: "Getting Started with Struxly", desc: "Learn the basics of creating your first AI-powered website in under 5 minutes.", tag: "Beginner" },
    { icon: FileText, title: "Mastering AI Prompts", desc: "Write better prompts to get exactly the design and layout you want from Struxly.", tag: "Intermediate" },
    { icon: Video, title: "Building an E-commerce Store", desc: "Step-by-step guide to creating and launching a full online store with Struxly.", tag: "Tutorial" },
    { icon: BookOpen, title: "Custom Domains & Deployment", desc: "Connect your own domain and deploy your site with SSL in just a few clicks.", tag: "Setup" },
    { icon: FileText, title: "Template Customization", desc: "How to start from a template and make it uniquely yours with AI-powered edits.", tag: "Intermediate" },
    { icon: Lightbulb, title: "SEO Best Practices", desc: "Optimize your Struxly-built site for search engines and drive organic traffic.", tag: "Advanced" },
];

export default function GuidesPage() {
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
                    <h1 className="text-[42px] font-bold text-gray-900 mb-3">Guides</h1>
                    <p className="text-[17px] text-gray-500 max-w-[480px] mx-auto">Learn how to build, customize, and deploy with Struxly.</p>
                </motion.div>
            </section>

            <section className="max-w-[1000px] mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {guides.map((g, i) => (
                        <motion.div key={g.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow cursor-pointer group">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"><g.icon className="w-4 h-4 text-gray-600" /></div>
                                <span className="text-[11px] font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">{g.tag}</span>
                            </div>
                            <h3 className="text-[15px] font-bold text-gray-900 mb-1 group-hover:text-violet-600 transition-colors">{g.title}</h3>
                            <p className="text-[13px] text-gray-500 leading-relaxed">{g.desc}</p>
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
