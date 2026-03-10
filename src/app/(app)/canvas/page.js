"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Code2,
    BarChart2,
    MoreHorizontal,
    Monitor,
    Smartphone,
    Share,
    Download,
    Copy,
    RotateCw,
} from "lucide-react";
import { CanvasProvider, useCanvas } from "@/context/CanvasContext";
import { useNotifications } from "@/context/NotificationContext";
import { useProjects } from "@/context/ProjectContext";
import { useSubscription } from "@/context/SubscriptionContext";
import DialogueBox from "@/components/canvas/DialogueBox";
import CanvasPreview from "@/components/canvas/CanvasPreview";
import DeployPanel from "@/components/deploy/DeployPanel";
import CodeEditorWorkspace from "@/components/canvas/CodeEditorWorkspace";


function CanvasToolbar() {
    const {
        activeView,
        setActiveView,
        deviceView,
        setDeviceView,
        isPublished,
        isGenerating,
        generatedCode,
        projectId,
    } = useCanvas();
    const { addNotification } = useNotifications();
    const { projects } = useProjects();
    const { currentPlan } = useSubscription();

    // Default to a fallback slug if projectId isn't perfectly mapped
    const currentProject = projects?.find(p => p.id === (typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("project") : null));
    const projectSlug = currentProject ? currentProject.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") : "my-project";

    const [showDeploy, setShowDeploy] = useState(false);
    const [showMoreMenu, setShowMoreMenu] = useState(false);

    const handleShare = () => {
        const url = `https://${projectSlug}.struxly.app`;
        navigator.clipboard.writeText(url);
        addNotification({
            type: "success",
            title: "Link copied to clipboard",
            message: "Share this link with anyone to show off your un-published preview."
        });
    };

    const handleDownloadCode = () => {
        setShowMoreMenu(false);
        if (!currentPlan || !["pro", "studio"].includes(currentPlan.id)) {
            addNotification({ type: "error", title: "Pro Plan Required", message: "Upgrade to Pro to download the React source code." });
            return;
        }

        if (!generatedCode) return;
        const blob = new Blob([generatedCode], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${projectSlug || 'App'}.jsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setShowMoreMenu(false);
        addNotification({ type: "success", title: "Downloaded", message: "React component downloaded successfully." });
    };

    const handleCopyCode = async () => {
        setShowMoreMenu(false);
        if (!currentPlan || !["pro", "studio"].includes(currentPlan.id)) {
            addNotification({ type: "error", title: "Pro Plan Required", message: "Upgrade to Pro to copy the React source code." });
            return;
        }

        if (!generatedCode) return;
        await navigator.clipboard.writeText(generatedCode);
        setShowMoreMenu(false);
        addNotification({ type: "success", title: "Code Copied", message: "React component code copied to clipboard." });
    };

    return (
        <>
            <div className="h-14 bg-white/60 backdrop-blur-xl border-b border-white/50 grid grid-cols-[1fr_auto_1fr] items-center px-6 shrink-0 transition-colors z-20 relative shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                {/* Left: View Switcher (Preview / Code / Analytics) */}
                <div className="flex items-center">
                    <div className="flex items-center gap-1 bg-gray-50/50 p-1 rounded-full border border-gray-200/60 backdrop-blur-md shadow-inner">
                        <button
                            onClick={() => setActiveView("preview")}
                            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all text-xs font-semibold tracking-wide ${activeView === "preview"
                                ? "bg-white text-indigo-600 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200/50 ring-1 ring-black/5"
                                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
                                }`}
                        >
                            <Monitor className="w-3.5 h-3.5" />
                            Preview
                        </button>
                        <button
                            onClick={() => setActiveView("code")}
                            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all text-xs font-semibold tracking-wide ${activeView === "code"
                                ? "bg-white text-indigo-600 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200/50 ring-1 ring-black/5"
                                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
                                }`}
                        >
                            <Code2 className="w-3.5 h-3.5" />
                            Code
                        </button>
                        <button
                            onClick={() => setActiveView("analytics")}
                            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all text-xs font-semibold tracking-wide ${activeView === "analytics"
                                ? "bg-white text-indigo-600 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200/50 ring-1 ring-black/5"
                                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
                                }`}
                        >
                            <BarChart2 className="w-3.5 h-3.5" />
                            Analytics
                        </button>
                    </div>
                </div>

                {/* Center: Device Switcher & Refresh */}
                <div className="flex justify-center items-center gap-3">
                    <div className="flex items-center gap-1 bg-gray-50/50 p-1 rounded-full border border-gray-200/60 backdrop-blur-md shadow-inner">
                        <button
                            onClick={() => setDeviceView("desktop")}
                            title="Desktop View"
                            className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${deviceView === "desktop"
                                ? "bg-white text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200/50 ring-1 ring-black/5"
                                : "text-gray-400 hover:text-gray-900 hover:bg-gray-100/50"
                                }`}
                        >
                            <Monitor className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setDeviceView("tablet")}
                            title="Tablet View"
                            className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${deviceView === "tablet"
                                ? "bg-white text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200/50 ring-1 ring-black/5"
                                : "text-gray-400 hover:text-gray-900 hover:bg-gray-100/50"
                                }`}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                        </button>
                        <button
                            onClick={() => setDeviceView("mobile")}
                            title="Mobile View"
                            className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${deviceView === "mobile"
                                ? "bg-white text-gray-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-200/50 ring-1 ring-black/5"
                                : "text-gray-400 hover:text-gray-900 hover:bg-gray-100/50"
                                }`}
                        >
                            <Smartphone className="w-4 h-4" />
                        </button>
                    </div>
                    {/* Refresh Button */}
                    <button
                        title="Refresh Preview"
                        className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-900 hover:bg-gray-100/80 rounded-full transition-colors"
                        onClick={() => {
                            // Dummy refresh logic for now, can be hooked into an iframe reload later
                            const iframe = document.querySelector('iframe');
                            if (iframe) iframe.src = iframe.src;
                        }}
                    >
                        <RotateCw className="w-4 h-4" />
                    </button>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center justify-end gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 mr-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${isGenerating ? "bg-amber-400 animate-pulse" : "bg-emerald-500"}`} />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            {isGenerating ? "Active" : "Ready"}
                        </span>
                    </div>

                    <button
                        onClick={handleShare}
                        className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-500 hover:text-gray-900 transition-colors px-2"
                    >
                        <Share className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => setShowDeploy(!showDeploy)}
                        className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[12px] font-bold px-4 py-2 rounded-lg transition-all shadow-sm active:scale-95"
                    >
                        Publish
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setShowMoreMenu(!showMoreMenu)}
                            className="flex items-center justify-center w-8 h-8 bg-gray-50 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors border border-gray-100"
                        >
                            <MoreHorizontal className="w-4 h-4" />
                        </button>

                        <AnimatePresence>
                            {showMoreMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.15, ease: "easeOut" }}
                                    className="absolute top-10 right-0 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden z-[100]"
                                >
                                    <div className="py-1">
                                        {(() => {
                                            const isPro = ["pro", "studio"].includes(currentPlan?.id);
                                            return (
                                                <>
                                                    <div className={isPro ? "" : "group relative"}>
                                                        <button
                                                            onClick={handleDownloadCode}
                                                            className={`w-full flex items-center gap-2 px-3 py-2 text-[12px] font-medium transition-colors text-left ${isPro ? "text-gray-700 hover:bg-gray-50 hover:text-gray-900" : "text-gray-400 cursor-not-allowed"}`}
                                                        >
                                                            <Download className={`w-3.5 h-3.5 ${isPro ? "text-gray-400" : "text-gray-300"}`} />
                                                            <span className="flex-1">Download React .jsx</span>
                                                            {!isPro && <span className="text-[9px] font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-white px-1.5 py-0.5 rounded-full shrink-0">PRO</span>}
                                                        </button>
                                                        {!isPro && (
                                                            <div className="absolute left-2 right-2 bottom-full mb-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 pointer-events-none group-hover:pointer-events-auto z-50">
                                                                <div className="px-2.5 py-2 bg-amber-50 border border-amber-100 rounded-lg shadow-lg">
                                                                    <p className="text-[10px] text-amber-700 font-medium leading-tight">
                                                                        🔒 Code export is a <strong>Pro</strong> feature.{" "}
                                                                        <a href="/portal/settings/plans" className="underline text-amber-800 hover:text-amber-900 pointer-events-auto" onClick={() => setShowMoreMenu(false)}>Upgrade →</a>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className={isPro ? "" : "group relative"}>
                                                        <button
                                                            onClick={handleCopyCode}
                                                            className={`w-full flex items-center gap-2 px-3 py-2 text-[12px] font-medium transition-colors text-left ${isPro ? "text-gray-700 hover:bg-gray-50 hover:text-gray-900" : "text-gray-400 cursor-not-allowed"}`}
                                                        >
                                                            <Copy className={`w-3.5 h-3.5 ${isPro ? "text-gray-400" : "text-gray-300"}`} />
                                                            <span className="flex-1">Copy Code to Clipboard</span>
                                                            {!isPro && <span className="text-[9px] font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-white px-1.5 py-0.5 rounded-full shrink-0">PRO</span>}
                                                        </button>
                                                        {!isPro && (
                                                            <div className="absolute left-2 right-2 bottom-full mb-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150 pointer-events-none group-hover:pointer-events-auto z-50">
                                                                <div className="px-2.5 py-2 bg-amber-50 border border-amber-100 rounded-lg shadow-lg">
                                                                    <p className="text-[10px] text-amber-700 font-medium leading-tight">
                                                                        🔒 Code export is a <strong>Pro</strong> feature.{" "}
                                                                        <a href="/portal/settings/plans" className="underline text-amber-800 hover:text-amber-900 pointer-events-auto" onClick={() => setShowMoreMenu(false)}>Upgrade →</a>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </>
                                            );
                                        })()}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {showDeploy && (
                <div className="absolute top-14 right-4 z-50">
                    <DeployPanel onClose={() => setShowDeploy(false)} />
                </div>
            )}
        </>
    );
}



function CanvasLayout() {
    const { activeView, isPublished, generatedCode } = useCanvas();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="h-screen flex bg-[#FAFAFA] overflow-hidden font-sans select-none relative theme-lockdown-light">
            {/* Subtle Glassmorphic Ambient Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/30 blur-[120px] rounded-full mix-blend-multiply opacity-70" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/30 blur-[120px] rounded-full mix-blend-multiply opacity-70" />
            </div>

            {/* Dialogue Box Sidebar (Left) - FULL HEIGHT */}
            <motion.div
                initial={false}
                animate={{ width: sidebarOpen ? 340 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 40 }}
                className="bg-white/70 backdrop-blur-2xl border-r border-white/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex-shrink-0 relative z-10 h-full"
            >
                <div className="w-[340px] h-full overflow-hidden flex flex-col">
                    <DialogueBox />
                </div>
            </motion.div>

            <div className="flex-1 flex flex-col min-w-0 bg-transparent overflow-hidden relative z-10">
                <CanvasToolbar />
                {/* Main Content Area (Pure Flex-Fill for 100% Coverage) */}
                <div className="flex-1 relative w-full overflow-hidden bg-transparent">
                    <AnimatePresence mode="wait">
                        {activeView === "preview" && (
                            <motion.div
                                key="preview"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.1 }}
                                className="absolute inset-0"
                            >
                                <CanvasPreview />
                            </motion.div>
                        )}

                        {activeView === "code" && (
                            <motion.div
                                key="code"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.1 }}
                                className="w-full h-full flex flex-col overflow-hidden"
                            >
                                <CodeEditorWorkspace />
                            </motion.div>
                        )}

                        {activeView === "analytics" && (
                            <motion.div
                                key="analytics"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.1 }}
                                className="w-full h-full flex items-center justify-center p-6 bg-gray-50/30 overflow-hidden"
                            >
                                <div className="max-w-md text-center">
                                    <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-500/5 border border-gray-100 transition-transform hover:scale-110 duration-500">
                                        <BarChart2 className="w-12 h-12 text-indigo-500" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Analytics is locked</h2>
                                    <p className="text-gray-500 mb-10 text-lg leading-relaxed font-medium">
                                        To view analytics, you first need to publish your project. Once published, you'll see visitor data, performance metrics, and more.
                                    </p>
                                    <div className="flex flex-col items-center gap-3">
                                        <button
                                            className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all active:scale-95"
                                        >
                                            Publish Now
                                        </button>
                                        <button
                                            onClick={() => setActiveView("preview")}
                                            className="text-gray-400 font-semibold hover:text-gray-600 transition-colors"
                                        >
                                            Return to Preview
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default function CanvasPage() {
    return (
        <CanvasProvider>
            <CanvasLayout />
        </CanvasProvider>
    );
}
