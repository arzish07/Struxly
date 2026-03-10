"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Sparkles, CheckCircle2, AlertCircle, Info, ExternalLink } from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";

export default function NotificationBell() {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const getIcon = (type) => {
        switch (type) {
            case "success": return <CheckCircle2 className="w-4 h-4 text-green-500" />;
            case "warning": return <AlertCircle className="w-4 h-4 text-amber-500" />;
            case "insight": return <Sparkles className="w-4 h-4 text-indigo-500" />;
            default: return <Info className="w-4 h-4 text-blue-500" />;
        }
    };

    const handleNotificationClick = (notif) => {
        if (!notif.read) markAsRead(notif.id);
        if (notif.link) window.open(notif.link, "_blank", "noopener,noreferrer");
    };

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-white/60 backdrop-blur-md border border-gray-200/50 flex items-center justify-center text-gray-700 hover:bg-white/90 hover:shadow-md transition-all relative shadow-sm group"
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/10 to-transparent group-hover:rotate-180 transition-transform duration-1000 pointer-events-none" />
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-2.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
                )}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-12 right-0 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden z-50 flex flex-col max-h-[400px]"
                    >
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50 shrink-0">
                            <div className="flex items-center gap-2 text-gray-900">
                                <span className="text-[12px] font-bold uppercase tracking-wider">Notifications</span>
                                {unreadCount > 0 && (
                                    <span className="text-[10px] font-medium bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">
                                        {unreadCount} new
                                    </span>
                                )}
                            </div>
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="text-[11px] text-gray-500 hover:text-gray-800 transition-colors"
                                >
                                    Mark all read
                                </button>
                            )}
                        </div>

                        <div className="p-2 space-y-1 overflow-y-auto overflow-x-hidden flex-1">
                            {notifications.length === 0 ? (
                                <div className="py-8 text-center text-[12px] text-gray-400">
                                    No notifications yet.
                                </div>
                            ) : (
                                notifications.map(notif => (
                                    <div
                                        key={notif.id}
                                        onClick={() => handleNotificationClick(notif)}
                                        className={`p-3 rounded-xl border transition-all cursor-pointer relative group ${notif.read
                                                ? "bg-transparent border-transparent hover:bg-gray-50"
                                                : "bg-indigo-50/30 border-indigo-100/50 hover:bg-indigo-50/50"
                                            }`}
                                    >
                                        {!notif.read && (
                                            <span className="absolute top-4 right-3 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                                        )}
                                        <div className="flex gap-3">
                                            <div className="shrink-0 mt-0.5">
                                                {getIcon(notif.type)}
                                            </div>
                                            <div className="pr-4">
                                                <h4 className={`text-[13px] mb-0.5 ${notif.read ? "text-gray-700 font-medium" : "text-gray-900 font-semibold"}`}>
                                                    {notif.title}
                                                </h4>
                                                <p className="text-[12px] text-gray-600 leading-relaxed">
                                                    {notif.message}
                                                </p>
                                                {notif.link && (
                                                    <div className="mt-2 flex items-center gap-1 text-[11px] text-indigo-600 font-medium group-hover:text-indigo-700">
                                                        View details <ExternalLink className="w-3 h-3" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
