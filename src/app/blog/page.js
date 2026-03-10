"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

const posts = [
    { title: "Introducing Struxly Studio: Team Workspaces", date: "Mar 3, 2026", tag: "Product", excerpt: "Collaborate with your team in real-time on AI-powered web projects.", image: "/template-dashboard.png" },
    { title: "How to Build a Landing Page in 60 Seconds", date: "Feb 28, 2026", tag: "Tutorial", excerpt: "A step-by-step guide to creating your first site with Struxly's AI dialogue.", image: "/template-fashion.png" },
    { title: "Shopify Export: From Dialogue to Live Store", date: "Feb 22, 2026", tag: "Feature", excerpt: "Export your AI-built site directly to Shopify with one click.", image: "/template-agency.png" },
    { title: "The Future of No-Code: AI-First Design", date: "Feb 15, 2026", tag: "Insights", excerpt: "Why conversational AI is replacing drag-and-drop builders.", image: "/template-realestate.png" },
    { title: "Template Library: 20+ New Templates Added", date: "Feb 10, 2026", tag: "Product", excerpt: "Browse our expanded collection of professionally designed templates.", image: "/template-portfolio.png" },
    { title: "Custom Domains & SSL: Now Available on Pro", date: "Feb 5, 2026", tag: "Feature", excerpt: "Connect your own domain with automatic SSL provisioning.", image: "/template-events.png" },
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-white">
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-[1200px] mx-auto px-6 h-[60px] flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/logo-symbol.png" alt="" className="w-5 h-5 object-contain" />
                        <img src="/logo-word.png" alt="Struxly" className="h-[18px] w-auto object-contain" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link href="/login" className="px-4 py-2 text-[13px] font-medium text-gray-700 hover:text-gray-900">Log in</Link>
                        <Link href="/login" className="px-4 py-2 text-[13px] font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800">Get started</Link>
                    </div>
                </div>
            </nav>

            <section className="pt-20 pb-16 px-6 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-[42px] font-bold text-gray-900 mb-3">Blog</h1>
                    <p className="text-[17px] text-gray-500">News, updates, and guides from the Struxly team.</p>
                </motion.div>
            </section>

            <section className="max-w-[1000px] mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post, i) => (
                        <motion.article
                            key={post.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        >
                            <div className="aspect-[16/10] bg-gray-100 overflow-hidden">
                                <img src={post.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[11px] font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">{post.tag}</span>
                                    <span className="flex items-center gap-1 text-[11px] text-gray-400"><Clock className="w-3 h-3" />{post.date}</span>
                                </div>
                                <h3 className="text-[15px] font-bold text-gray-900 mb-1 group-hover:text-violet-600 transition-colors">{post.title}</h3>
                                <p className="text-[12.5px] text-gray-500 leading-relaxed">{post.excerpt}</p>
                            </div>
                        </motion.article>
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
