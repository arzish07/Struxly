"use client";

import NexusLayout from "./NexusLayout";
import { motion } from "framer-motion";
import { Activity, Zap, Server, ShieldAlert, GitMerge, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function NexusHome() {
  const metrics = [
    { label: "Active Nodes", val: "1,204", trend: "+12%", color: "text-sky-400", icon: Server },
    { label: "System Load", val: "42%", trend: "-5%", color: "text-green-400", icon: Activity },
    { label: "Network I/O", val: "84TB", trend: "+24%", color: "text-purple-400", icon: GitMerge },
    { label: "Threats Blocked", val: "892", trend: "0%", color: "text-orange-400", icon: ShieldAlert },
  ];

  return (
    <NexusLayout>
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-mono font-bold text-white mb-2 neon-text tracking-tight">System Overview</h1>
            <p className="text-slate-400 font-sans text-sm">Real-time telemetry and infrastructure analytics.</p>
          </div>
          <Link href="/analytics">
            <button className="glass-panel px-4 py-2 rounded-lg text-sm font-bold text-sky-400 font-mono flex items-center gap-2 hover:bg-sky-500/10 transition-colors border-sky-500/30">
              Full Report <ArrowUpRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i}
                className="glass-panel p-6 rounded-2xl flex flex-col justify-between glass-panel-hover"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${m.color}`} />
                  </div>
                  <span className={`text-xs font-mono font-bold ${m.trend.startsWith("+") ? "text-green-400" : "text-slate-400"}`}>
                    {m.trend}
                  </span>
                </div>
                <div>
                  <h3 className="text-slate-400 text-sm font-sans mb-1">{m.label}</h3>
                  <p className={`text-3xl font-mono font-bold ${m.color}`}>{m.val}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Main Chart Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 glass-panel p-6 rounded-2xl min-h-[400px] flex flex-col relative overflow-hidden"
          >
            {/* Abstract Chart Background */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-sky-500/20 to-transparent mask-image-b" />
            <div className="flex justify-between items-center mb-8 relative z-10">
              <h3 className="font-mono text-lg font-bold text-white">Throughput Analytics</h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded bg-slate-800 text-xs font-mono text-slate-300">1H</span>
                <span className="px-3 py-1 rounded bg-sky-500/20 text-xs font-mono text-sky-400 border border-sky-500/50">24H</span>
                <span className="px-3 py-1 rounded bg-slate-800 text-xs font-mono text-slate-300">7D</span>
              </div>
            </div>

            {/* Mock Graph Lines */}
            <div className="flex-1 w-full flex items-end justify-between relative z-10 gap-2 pb-4 border-b border-slate-800">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="w-full bg-sky-500/20 rounded-t-sm hover:bg-sky-400 transition-colors relative group" style={{ height: `${Math.max(20, Math.random() * 100)}%` }}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 glass-panel px-2 py-1 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Vol: {Math.floor(Math.random() * 1000)}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-mono text-slate-500">
              <span>00:00</span>
              <span>12:00</span>
              <span>23:59</span>
            </div>
          </motion.div>

          {/* Active Clusters list */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-panel p-6 rounded-2xl flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-mono text-lg font-bold text-white">Active Clusters</h3>
              <Zap className="w-4 h-4 text-sky-400" />
            </div>

            <div className="flex flex-col gap-4 flex-1">
              {[
                { name: "us-east-1", status: "Healthy", load: "78%", color: "text-green-400" },
                { name: "eu-central", status: "Warning", load: "92%", color: "text-orange-400" },
                { name: "ap-south", status: "Healthy", load: "45%", color: "text-green-400" },
                { name: "sa-east", status: "Syncing", load: "60%", color: "text-sky-400" },
              ].map((cluster, i) => (
                <div key={i} className="glass-panel p-4 rounded-xl flex items-center justify-between border-slate-800/50 hover:bg-slate-800/30 transition-colors cursor-pointer group">
                  <div>
                    <p className="font-mono text-sm text-white group-hover:text-sky-400 transition-colors">{cluster.name}</p>
                    <p className={`text-[10px] uppercase tracking-widest mt-1 ${cluster.color}`}>{cluster.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm text-slate-300">{cluster.load}</p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">Load</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/dashboard">
              <button className="w-full mt-6 py-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-400 hover:bg-slate-800 hover:text-white transition-all uppercase tracking-widest">
                Manage Infrastructure
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </NexusLayout>
  );
}
