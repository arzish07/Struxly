"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Activity, BarChart3, Settings,
    Cpu, Database, Shield, Hexagon, Zap, Globe, Users,
    ArrowUpRight, AlertCircle, RefreshCw
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function NexusLayout({ children }) {
    const pathname = usePathname();

    const navItems = [
        { name: "Overview", href: "/", icon: Activity },
        { name: "Dashboard", href: "/dashboard", icon: Hexagon },
        { name: "Analytics", href: "/analytics", icon: BarChart3 },
        { name: "Settings", href: "/settings", icon: Settings },
    ];

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar - Glassmorphic */}
            <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-64 border-r border-slate-800 bg-slate-900/30 backdrop-blur-xl flex flex-col h-full z-50 shrink-0"
            >
                <div className="h-20 flex items-center px-6 border-b border-slate-800">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/50 flex items-center justify-center group-hover:bg-sky-500/40 transition-colors shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                            <Zap className="w-4 h-4 text-sky-400" />
                        </div>
                        <span className="font-mono text-xl font-bold tracking-tight text-white neon-text">NEXUS</span>
                    </Link>
                </div>

                <nav className="flex-1 overflow-y-auto py-8 px-4 flex flex-col gap-2">
                    <div className="text-xs font-mono text-slate-500 mb-2 px-2 uppercase tracking-widest">Platform</div>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link href={item.href} key={item.name}>
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                                            ? "bg-sky-500/10 text-sky-400 border border-sky-500/30 shadow-[inset_0_0_10px_rgba(56,189,248,0.1)]"
                                            : "text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent"
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? "text-sky-400" : "text-slate-500"}`} />
                                    {item.name}
                                </motion.div>
                            </Link>
                        )
                    })}

                    <div className="mt-8 text-xs font-mono text-slate-500 mb-2 px-2 uppercase tracking-widest">Infrastructure</div>

                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent cursor-pointer transition-all">
                        <Database className="w-4 h-4 text-slate-500" /> Datastores
                    </div>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent cursor-pointer transition-all">
                        <Cpu className="w-4 h-4 text-slate-500" /> Compute
                    </div>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent cursor-pointer transition-all">
                        <Shield className="w-4 h-4 text-slate-500" /> Security
                    </div>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="glass-panel p-4 rounded-xl flex items-center justify-between border-sky-500/20 bg-sky-950/20 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                        <div className="flex items-center gap-3 relative z-10">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                <span className="text-xs font-mono text-white">OP</span>
                            </div>
                            <div>
                                <p className="text-white text-xs font-bold">Admin-01</p>
                                <p className="text-sky-400 text-[10px] font-mono flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" /> ONLINE</p>
                            </div>
                        </div>
                        <Settings className="w-4 h-4 text-slate-500 hover:text-white cursor-pointer relative z-10" />
                    </div>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">

                {/* Top Header */}
                <header className="h-20 glass-panel border-b border-t-0 border-r-0 border-l-0 border-slate-800/50 flex items-center justify-between px-8 bg-slate-900/10 z-40">
                    <div className="flex items-center gap-4 text-sm font-mono text-slate-400">
                        <span>NEXUS-CORE</span>
                        <span className="text-slate-600">/</span>
                        <span className="text-sky-400">{pathname === "/" ? "OVERVIEW" : pathname.replace("/", "").toUpperCase()}</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="glass-panel px-4 py-2 rounded-lg flex items-center gap-3 font-mono text-xs border-slate-700/50">
                            <Globe className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-slate-300">EU-WEST-2</span>
                        </div>

                        <div className="flex gap-4">
                            <button className="relatve text-slate-400 hover:text-white transition-colors">
                                <AlertCircle className="w-5 h-5" />
                                <span className="absolute top-6 right-[6.8rem] w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7]" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Scrollable Page Content Container */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                    {children}
                </div>

            </main>
        </div>
    );
}
