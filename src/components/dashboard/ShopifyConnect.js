"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Store,
    Link as LinkIcon,
    CheckCircle2,
    Loader2,
    XCircle,
    Wifi,
    WifiOff,
    ArrowRight,
} from "lucide-react";

export default function ShopifyConnect({ onConnect }) {
    const [storeUrl, setStoreUrl] = useState("");
    const [status, setStatus] = useState("disconnected"); // disconnected | connecting | connected | error

    const handleConnect = () => {
        if (!storeUrl.trim()) return;
        setStatus("connecting");

        // Mock OAuth handshake
        setTimeout(() => {
            // Simulate OAuth redirect
            const cleanUrl = storeUrl
                .replace("https://", "")
                .replace("http://", "")
                .replace(".myshopify.com", "")
                .trim();

            if (cleanUrl.length > 0) {
                setStatus("connected");
                onConnect?.({
                    url: `${cleanUrl}.myshopify.com`,
                    name: cleanUrl.charAt(0).toUpperCase() + cleanUrl.slice(1),
                    token: "mock_shpat_" + Math.random().toString(36).substring(7),
                });
            } else {
                setStatus("error");
                setTimeout(() => setStatus("disconnected"), 3000);
            }
        }, 2000);
    };

    return (
        <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/10">
                    <Store className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-white">Connect Shopify</h3>
                    <p className="text-xs text-slate-500">
                        One-click OAuth handshake
                    </p>
                </div>
                <div className="ml-auto">
                    {status === "connected" ? (
                        <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                            <Wifi className="w-3 h-3" /> Connected
                        </span>
                    ) : status === "connecting" ? (
                        <span className="flex items-center gap-1.5 text-[10px] font-medium text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
                            <Loader2 className="w-3 h-3 animate-spin" /> Connecting
                        </span>
                    ) : status === "error" ? (
                        <span className="flex items-center gap-1.5 text-[10px] font-medium text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full">
                            <XCircle className="w-3 h-3" /> Failed
                        </span>
                    ) : (
                        <span className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500 bg-white/5 px-2.5 py-1 rounded-full">
                            <WifiOff className="w-3 h-3" /> Not Connected
                        </span>
                    )}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {status !== "connected" ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                                <input
                                    type="text"
                                    value={storeUrl}
                                    onChange={(e) => setStoreUrl(e.target.value)}
                                    placeholder="your-store.myshopify.com"
                                    disabled={status === "connecting"}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-all disabled:opacity-50"
                                />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleConnect}
                                disabled={!storeUrl.trim() || status === "connecting"}
                                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-500 text-white text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-opacity"
                            >
                                {status === "connecting" ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                    <>
                                        Connect
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </>
                                )}
                            </motion.button>
                        </div>
                        <p className="text-[10px] text-slate-600 mt-2">
                            We'll handle the OAuth flow automatically. No API keys needed.
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="connected"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                    >
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-emerald-300">
                                Store connected successfully!
                            </p>
                            <p className="text-[10px] text-emerald-400/60 truncate">
                                {storeUrl}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
