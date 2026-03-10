"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Users, Layers, Zap, Globe, ArrowRight } from "lucide-react";

const features = [
    { icon: Users, title: "Team workspaces", desc: "Collaborate with your team in real-time. Assign roles, share projects, and manage clients together." },
    { icon: Layers, title: "White-label export", desc: "Export and deploy client sites under their own brand. No Struxly branding visible." },
    { icon: Zap, title: "Rapid prototyping", desc: "Win more pitches by showing clients a working prototype in the first meeting." },
    { icon: Globe, title: "Multi-site management", desc: "Manage all your client websites from a single dashboard with unified billing." },
];

export default function AgenciesPage() {
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

            <section className="pt-24 pb-16 px-6 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 text-[12px] font-semibold mb-6">
                        <Users className="w-3.5 h-3.5" /> For Agencies
                    </div>
                    <h1 className="text-[42px] font-bold text-gray-900 leading-tight mb-4">Scale your agency with AI</h1>
                    <p className="text-[17px] text-gray-500 max-w-[520px] mx-auto mb-8">Build client websites 10x faster with team collaboration, white-label exports, and AI-powered creation tools.</p>
                    <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-[14px] font-semibold rounded-xl hover:bg-gray-800 transition-colors">
                        Start building free <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </section>

            <section className="max-w-[1000px] mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {features.map((f, i) => (
                        <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mb-4"><f.icon className="w-5 h-5 text-gray-600" /></div>
                            <h3 className="text-[16px] font-bold text-gray-900 mb-1">{f.title}</h3>
                            <p className="text-[13px] text-gray-500 leading-relaxed">{f.desc}</p>
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
