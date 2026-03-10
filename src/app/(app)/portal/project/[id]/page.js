"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    ChevronLeft,
    Eye,
    BarChart3,
    Cloud,
    Code2,
    Palette,
    Shield,
    Zap,
    Share2,
    ArrowUpCircle,
    Rocket,
    Plus,
    Send,
    Sparkles,
    Pin,
    MoreHorizontal,
    Copy,
    RefreshCw,
    X,
    Users,
    Link2,
    Globe,
    Settings,
    CheckCircle2,
    Bell,
} from "lucide-react";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { useAuth } from "@/context/AuthContext";

/* ── Top Toolbar ── */
function EditorToolbar({ projectName, activePanel, setActivePanel, onShare, onPublish }) {
    const { currentPlan } = useSubscription();

    const centerTabs = [
        { id: "preview", icon: Eye, label: "Preview" },
        { id: "analytics", icon: BarChart3, label: "Analytics" },
        { id: "cloud", icon: Cloud, label: "Cloud" },
        { id: "code", icon: Code2, label: "Code" },
    ];

    return (
        <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4">
            {/* Left */}
            <div className="flex items-center gap-3">
                <Link href="/portal" className="flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                </Link>
                <div className="flex items-center gap-2">
                    <img src="/logo-symbol.png" alt="" className="w-5 h-5 object-contain" />
                    <span className="text-sm font-semibold text-gray-800">{projectName}</span>
                    <span className="text-[9px] font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded">✓</span>
                </div>
            </div>

            {/* Center: Panel tabs */}
            <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
                {centerTabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActivePanel(tab.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${activePanel === tab.id
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <tab.icon className="w-3.5 h-3.5" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
                <button className="text-[12px] font-medium text-gray-500 hover:text-gray-800 transition-colors px-2 py-1.5 rounded-lg hover:bg-gray-100 flex items-center justify-center relative">
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
                </button>
                <div className="w-px h-4 bg-gray-200/60 mx-1" />
                <button
                    onClick={onShare}
                    className="text-[12px] font-medium text-gray-600 hover:text-gray-800 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100 flex items-center gap-1.5"
                >
                    <Share2 className="w-3.5 h-3.5" /> Share
                </button>
                {currentPlan.id === "free" && (
                    <Link href="/portal/settings/plans" className="text-[12px] font-medium text-white bg-green-500 hover:bg-green-600 transition-colors px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" /> Upgrade
                    </Link>
                )}
                <button
                    onClick={onPublish}
                    className="text-[12px] font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-colors px-4 py-1.5 rounded-lg flex items-center gap-1.5"
                >
                    Publish
                </button>
            </div>
        </div>
    );
}

/* ── Chat Message ── */
function ChatMessage({ message, isAi }) {
    const [viewMode, setViewMode] = useState("preview");

    if (isAi) {
        return (
            <div className="px-4 py-3">
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <Pin className="w-3 h-3 text-gray-400" />
                            <span className="text-[12px] font-medium text-gray-600">Code edited in Struxly Editor</span>
                        </div>
                        <MoreHorizontal className="w-4 h-4 text-gray-300" />
                    </div>
                    <div className="flex">
                        <button
                            onClick={() => setViewMode("details")}
                            className={`flex-1 py-2 text-[12px] font-medium text-center transition-colors ${viewMode === "details" ? "text-gray-900" : "text-gray-400 hover:text-gray-600"}`}
                        >
                            Details
                        </button>
                        <button
                            onClick={() => setViewMode("preview")}
                            className={`flex-1 py-2 text-[12px] font-medium text-center rounded-lg mx-1 my-1 transition-colors ${viewMode === "preview"
                                ? "bg-blue-500 text-white"
                                : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            Preview
                        </button>
                    </div>
                </div>
                {message.text && (
                    <p className="text-[13px] text-gray-700 mt-3 leading-relaxed px-1">{message.text}</p>
                )}
            </div>
        );
    }

    return (
        <div className="px-4 py-2">
            <p className="text-[13px] text-gray-800">{message.text}</p>
        </div>
    );
}

/* ── Chat Panel ── */
function ChatPanel() {
    const [messages, setMessages] = useState([
        { id: 1, isAi: true, text: "I've set up the project structure. You can start making changes by describing what you want!" },
    ]);
    const [input, setInput] = useState("");
    const { editCredits } = useSubscription();
    const messagesEndRef = useRef(null);

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages((prev) => [
            ...prev,
            { id: Date.now(), isAi: false, text: input },
            { id: Date.now() + 1, isAi: true, text: "Working on your changes..." },
        ]);
        setInput("");
    };

    return (
        <div className="flex flex-col h-full bg-[#fafafa]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-2">
                    <img src="/logo-symbol.png" alt="" className="w-5 h-5 object-contain" />
                    <span className="text-sm font-semibold text-gray-800">Struxly AI</span>
                </div>
                <span className="text-[11px] font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                    {editCredits} credits
                </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto py-4 space-y-1">
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} isAi={msg.isAi} />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200 bg-white">
                <div className="px-3 py-2">
                    <div className="flex items-center gap-2 mb-2">
                        <button className="text-[11px] text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors">
                            <Plus className="w-3 h-3" /> Add file upload
                        </button>
                        <span className="text-gray-200">|</span>
                        <button className="text-[11px] text-gray-400 hover:text-gray-600 transition-colors">
                            Add task history tracking
                        </button>
                    </div>
                </div>
                <div className="px-3 pb-3">
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                        <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                            <Plus className="w-3.5 h-3.5" />
                        </button>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Ask Struxly..."
                            className="flex-1 bg-transparent text-[13px] text-gray-800 placeholder-gray-400 outline-none"
                        />
                        <div className="flex items-center gap-1.5">
                            <button className="text-[11px] text-gray-400 flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 transition-colors">
                                <Sparkles className="w-3 h-3" /> Visual edits
                            </button>
                            <span className="text-[11px] font-medium text-gray-400 px-2 py-1">Plan</span>
                            <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                                <Settings className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={handleSend}
                                className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                            >
                                <Send className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── Share Panel ── */
function SharePanel({ onClose }) {
    const { user } = useAuth();
    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="w-[320px] bg-white border-l border-gray-200 h-full flex flex-col"
        >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Share project</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-5 flex-1 overflow-y-auto">
                <input placeholder="Add people" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-gray-300" />
                <div>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Project access</p>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-[13px] text-gray-600 flex-1">People you invited</span>
                            <ChevronLeft className="w-3.5 h-3.5 text-gray-300 rotate-180" />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold">
                                {(user?.displayName?.[0] || "U").toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <p className="text-[13px] font-medium text-gray-800">{user?.displayName || "You"}</p>
                                <p className="text-[11px] text-gray-400">{user?.email || ""}</p>
                            </div>
                            <span className="text-[11px] text-gray-400">Owner</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link2 className="w-4 h-4 text-gray-400" />
                            <span className="text-[13px] text-gray-600 flex-1">Invite link</span>
                            <span className="text-[11px] text-gray-400">Disabled</span>
                        </div>
                    </div>
                </div>
                <button className="w-full bg-gray-900 text-white text-[13px] font-medium py-2.5 rounded-lg hover:bg-gray-800 transition-colors">
                    Create invite link
                </button>
                <div className="space-y-2">
                    <button className="w-full border border-gray-200 text-[13px] font-medium text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                        <Rocket className="w-3.5 h-3.5" /> Publish project
                    </button>
                    <button className="w-full border border-gray-200 text-[13px] font-medium text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                        <Share2 className="w-3.5 h-3.5" /> Share preview
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

/* ── Publish Panel ── */
function PublishPanel({ onClose, projectName }) {
    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="w-[320px] bg-white border-l border-gray-200 h-full flex flex-col"
        >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <h3 className="text-sm font-semibold text-gray-900">Published</h3>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-400">0 Visitors</span>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
                </div>
            </div>
            <div className="p-5 space-y-4 flex-1">
                <div>
                    <p className="text-[11px] font-medium text-gray-500 mb-1">Live URL</p>
                    <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-[11px] text-gray-400">Add custom domain</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 bg-gray-50 rounded-lg px-3 py-2">
                        <span className="text-[13px] text-gray-700 flex-1">{projectName}.struxly.app</span>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex-1 border border-gray-200 text-[12px] font-medium text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5">
                        <Shield className="w-3.5 h-3.5" /> Review security
                    </button>
                    <button className="flex-1 border border-gray-200 text-[12px] font-medium text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5">
                        <Settings className="w-3.5 h-3.5" /> Edit settings
                    </button>
                </div>
                <button className="w-full bg-green-500 text-white text-[13px] font-semibold py-2.5 rounded-lg hover:bg-green-600 transition-colors">
                    Update
                </button>
            </div>
        </motion.div>
    );
}

/* ── Main Editor Page ── */
function EditorContent({ params }) {
    const [activePanel, setActivePanel] = useState("preview");
    const [showShare, setShowShare] = useState(false);
    const [showPublish, setShowPublish] = useState(false);
    const projectName = params?.id || "My Project";

    return (
        <div className="h-screen flex flex-col bg-white overflow-hidden">
            <EditorToolbar
                projectName={projectName.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                activePanel={activePanel}
                setActivePanel={setActivePanel}
                onShare={() => { setShowShare(!showShare); setShowPublish(false); }}
                onPublish={() => { setShowPublish(!showPublish); setShowShare(false); }}
            />

            <div className="flex-1 flex overflow-hidden">
                {/* Chat Panel */}
                <div className="w-[340px] border-r border-gray-200 flex-shrink-0">
                    <ChatPanel />
                </div>

                {/* Preview */}
                <div className="flex-1 bg-gray-100 p-4 flex items-center justify-center relative">
                    <div className="w-full h-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <iframe
                            src="about:blank"
                            className="w-full h-full border-0"
                            title="Preview"
                        />
                    </div>
                </div>

                {/* Side panels */}
                <AnimatePresence>
                    {showShare && <SharePanel onClose={() => setShowShare(false)} />}
                    {showPublish && <PublishPanel onClose={() => setShowPublish(false)} projectName={projectName} />}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default function ProjectEditorPage({ params }) {
    return (
        <SubscriptionProvider>
            <EditorContent params={params} />
        </SubscriptionProvider>
    );
}
