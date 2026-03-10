"use client";

import NexusLayout from "../NexusLayout";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, AlertTriangle } from "lucide-react";

export default function Analytics() {
    return (
        <NexusLayout>
            <div className="max-w-7xl mx-auto w-full">
                <div className="mb-8">
                    <h1 className="text-3xl font-mono font-bold text-white mb-2 neon-text tracking-tight">Telemetry & Analytics</h1>
                    <p className="text-slate-400 font-sans text-sm">Deep inspection of payload sizes, response times, and failure rates.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-panel p-6 rounded-2xl border border-slate-800/50 min-h-[350px] flex flex-col items-center justify-center relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05)_0%,transparent_70%)]" />
                        <BarChart3 className="w-16 h-16 text-slate-700 mb-4" />
                        <p className="text-slate-400 font-mono text-sm text-center">Historical Node Performance<br />Gathering telemetry data...</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="glass-panel p-6 rounded-2xl border border-slate-800/50 min-h-[350px] flex flex-col items-center justify-center relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05)_0%,transparent_70%)]" />
                        <TrendingUp className="w-16 h-16 text-slate-700 mb-4" />
                        <p className="text-slate-400 font-mono text-sm text-center">API Request Volume (Global)<br />Syncing with edge cache...</p>
                    </motion.div>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-slate-800/50">
                    <h3 className="font-mono text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-400" /> Recent Anomalies
                    </h3>

                    <div className="space-y-3">
                        {[
                            { time: "08:24:12 UTC", type: "Spike", desc: "Unusual traffic volume detected on eu-central ingress port 443.", sev: "Low" },
                            { time: "07:11:59 UTC", type: "Latency", desc: "Database query degraded performance in redis-cache-tier.", sev: "High" },
                        ].map((anom, i) => (
                            <div key={i} className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl bg-slate-900/30 border border-slate-800">
                                <span className="font-mono text-xs text-slate-500 w-24">{anom.time}</span>
                                <span className={`px-2 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-widest w-20 text-center ${anom.sev === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}>
                                    {anom.type}
                                </span>
                                <p className="text-sm text-slate-300 flex-1">{anom.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </NexusLayout>
    );
}
