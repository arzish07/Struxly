"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const roles = [
    { title: "Senior Frontend Engineer", team: "Engineering", location: "Remote", type: "Full-time" },
    { title: "AI/ML Research Engineer", team: "AI", location: "Remote", type: "Full-time" },
    { title: "Product Designer", team: "Design", location: "Guwahati / Remote", type: "Full-time" },
    { title: "Developer Advocate", team: "Community", location: "Remote", type: "Full-time" },
    { title: "Growth Marketing Lead", team: "Marketing", location: "Remote", type: "Full-time" },
];

export default function CareersPage() {
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
                    <h1 className="text-[42px] font-bold text-gray-900 mb-3">Join Struxly</h1>
                    <p className="text-[17px] text-gray-500 max-w-[480px] mx-auto">Help us build the future of AI-powered web creation. Remote-first, global team.</p>
                </motion.div>
            </section>

            <section className="max-w-[700px] mx-auto px-6 pb-24">
                <h2 className="text-[20px] font-bold text-gray-900 mb-6">Open positions</h2>
                <div className="space-y-3">
                    {roles.map((role, i) => (
                        <motion.div
                            key={role.title}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="flex items-center justify-between border border-gray-200 rounded-xl px-5 py-4 hover:shadow-sm hover:border-gray-300 transition-all cursor-pointer group"
                        >
                            <div>
                                <h3 className="text-[14px] font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">{role.title}</h3>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-[12px] text-gray-400">{role.team}</span>
                                    <span className="flex items-center gap-1 text-[12px] text-gray-400"><MapPin className="w-3 h-3" />{role.location}</span>
                                    <span className="text-[11px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">{role.type}</span>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-violet-500 transition-colors" />
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
