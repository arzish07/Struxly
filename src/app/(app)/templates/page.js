"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { templates } from "@/data/templates";

export default function TemplatesPage() {
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

            <section className="pt-20 pb-12 px-6 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-[42px] font-bold text-gray-900 mb-3">Templates</h1>
                    <p className="text-[17px] text-gray-500 max-w-[480px] mx-auto">Start from a professionally designed template and make it yours with AI.</p>
                </motion.div>
            </section>

            <section className="max-w-[1100px] mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {templates.map((t, i) => (
                        <motion.div
                            key={t.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                        >
                            <Link
                                href={`/templates/${t.slug}`}
                                className="group block border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                            >
                                <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                                    <img
                                        src={t.image}
                                        alt={t.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-[14px] font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">{t.name}</h3>
                                    <p className="text-[12px] text-gray-400 mt-0.5">{t.category}</p>
                                </div>
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
