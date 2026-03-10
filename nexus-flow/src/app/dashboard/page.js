"use client";

import NexusLayout from "../NexusLayout";
import { motion } from "framer-motion";
import { Database, Search, ArrowRight, ShieldCheck, Cpu } from "lucide-react";

export default function Dashboard() {
    const instances = [
        { id: "inst-8291a", name: "auth-service-prod", status: "running", region: "us-east-1", type: "t4g.xlarge", ip: "10.0.14.22" },
        { id: "inst-bb92c", name: "payment-gateway", status: "running", region: "eu-central", type: "c6i.2xlarge", ip: "10.1.8.84" },
        { id: "inst-0019f", name: "redis-cache-tier", status: "warning", region: "us-east-1", type: "r6g.large", ip: "10.0.99.11" },
        { id: "inst-44a8b", name: "worker-node-01", status: "stopped", region: "ap-south", type: "t3.medium", ip: "10.4.1.109" },
        { id: "inst-99d7x", name: "worker-node-02", status: "running", region: "ap-south", type: "t3.medium", ip: "10.4.1.110" },
    ];

    return (
        <NexusLayout>
            <div className="max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-mono font-bold text-white mb-2 neon-text tracking-tight">Infrastructure Hub</h1>
                        <p className="text-slate-400 font-sans text-sm">Manage compute instances and routing configurations.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search resources..."
                                className="bg-slate-900/50 border border-slate-700/50 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-sky-500/50 transition-colors placeholder:text-slate-600 font-mono"
                            />
                        </div>
                        <button className="bg-sky-500 text-slate-950 font-bold font-mono text-sm px-4 py-2 rounded-lg hover:bg-sky-400 transition-colors shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                            Deploy Instance
                        </button>
                    </div>
                </div>

                <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
                    {/* Table Header */}
                    <div className="grid grid-cols-6 gap-4 p-4 border-b border-slate-800 bg-slate-900/30 text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                        <div className="col-span-2">Resource Name</div>
                        <div>Status</div>
                        <div>Region</div>
                        <div>Type / Size</div>
                        <div className="text-right">Internal IP</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-slate-800/50">
                        {instances.map((inst, i) => (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                key={inst.id}
                                className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-slate-800/30 transition-colors cursor-pointer group"
                            >
                                <div className="col-span-2 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-slate-800/80 border border-slate-700 flex items-center justify-center">
                                        <Database className="w-4 h-4 text-slate-400 group-hover:text-sky-400 transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{inst.name}</p>
                                        <p className="text-[10px] font-mono text-slate-500">{inst.id}</p>
                                    </div>
                                </div>

                                <div>
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest ${inst.status === 'running' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                        inst.status === 'warning' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                                            'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                        }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${inst.status === 'running' ? 'bg-green-400 animate-pulse' : inst.status === 'warning' ? 'bg-orange-400' : 'bg-slate-400'}`} />
                                        {inst.status}
                                    </span>
                                </div>

                                <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                                    <ShieldCheck className="w-3 h-3 text-slate-500" /> {inst.region}
                                </div>

                                <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                                    <Cpu className="w-3 h-3 text-slate-500" /> {inst.type}
                                </div>

                                <div className="text-right flex items-center justify-end gap-3">
                                    <span className="text-xs font-mono text-slate-400">{inst.ip}</span>
                                    <ArrowRight className="w-4 h-4 text-slate-600 opacity-0 group-hover:opacity-100 group-hover:text-sky-400 transition-all transform group-hover:translate-x-1" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </NexusLayout>
    );
}
