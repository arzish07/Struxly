"use client";

import NexusLayout from "../NexusLayout";
import { motion } from "framer-motion";
import { User, Key, Globe, Bell, Fingerprint, HardDrive } from "lucide-react";

export default function Settings() {
    const settingsGroups = [
        {
            title: "Account & Profile",
            icon: User,
            items: [
                { label: "Organization Name", value: "Struxly.ai Labs", type: "text" },
                { label: "Support Email", value: "ops@struxly.ai", type: "email" },
            ]
        },
        {
            title: "Security & Access",
            icon: Fingerprint,
            items: [
                { label: "Two-Factor Authentication", value: true, type: "toggle" },
                { label: "Require VPN for Production", value: false, type: "toggle" },
                { label: "Session Timeout (Minutes)", value: "30", type: "number" },
            ]
        },
        {
            title: "Regional Defaults",
            icon: Globe,
            items: [
                { label: "Primary Datacenter", value: "eu-central-1", type: "select" },
                { label: "CDN Edge Caching", value: true, type: "toggle" },
            ]
        },
        {
            title: "Alerts & Notifications",
            icon: Bell,
            items: [
                { label: "Deployment Webhooks", value: true, type: "toggle" },
                { label: "PagerDuty Integration", value: true, type: "toggle" },
                { label: "Slack Channel ID", value: "#ops-alerts", type: "text" },
            ]
        }
    ];

    return (
        <NexusLayout>
            <div className="max-w-4xl mx-auto w-full">
                <div className="mb-8">
                    <h1 className="text-3xl font-mono font-bold text-white mb-2 neon-text tracking-tight">Platform Settings</h1>
                    <p className="text-slate-400 font-sans text-sm">Configure global constraints, security protocols, and operational parameters.</p>
                </div>

                <div className="space-y-6">
                    {settingsGroups.map((group, i) => {
                        const Icon = group.icon;
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={i}
                                className="glass-panel rounded-2xl border border-slate-800/50 overflow-hidden"
                            >
                                <div className="flex items-center gap-3 p-4 border-b border-slate-800 bg-slate-900/30">
                                    <div className="w-8 h-8 rounded bg-slate-800/80 border border-slate-700 flex items-center justify-center">
                                        <Icon className="w-4 h-4 text-sky-400" />
                                    </div>
                                    <h2 className="font-mono font-bold text-white tracking-wide">{group.title}</h2>
                                </div>

                                <div className="p-6 space-y-6">
                                    {group.items.map((item, j) => (
                                        <div key={j} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <label className="font-sans text-sm text-slate-300 font-medium">{item.label}</label>

                                            {item.type === 'toggle' ? (
                                                <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${item.value ? 'bg-sky-500' : 'bg-slate-700'}`}>
                                                    <motion.div
                                                        className="w-4 h-4 rounded-full bg-white shadow-sm"
                                                        layout
                                                        initial={false}
                                                        animate={{ x: item.value ? 24 : 0 }}
                                                    />
                                                </div>
                                            ) : item.type === 'select' ? (
                                                <select className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-sky-500 font-mono w-full md:w-64">
                                                    <option>{item.value}</option>
                                                    <option>us-east-1</option>
                                                    <option>ap-south-1</option>
                                                </select>
                                            ) : (
                                                <input
                                                    type={item.type}
                                                    defaultValue={item.value}
                                                    className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-sky-500 font-mono w-full md:w-64 transition-colors"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                <div className="mt-8 flex justify-end gap-4">
                    <button className="px-6 py-2 rounded-lg font-mono text-sm font-bold text-slate-400 hover:text-white transition-colors">
                        Reset Changes
                    </button>
                    <button className="bg-sky-500 text-slate-950 font-bold font-mono text-sm px-6 py-2 rounded-lg hover:bg-sky-400 transition-colors shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                        Save Configuration
                    </button>
                </div>
            </div>
        </NexusLayout>
    );
}
