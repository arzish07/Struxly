"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { useCanvas } from "@/context/CanvasContext";
import { useNotifications } from "@/context/NotificationContext";
import { useAuth } from "@/context/AuthContext";
import { consumeCredits } from "@/lib/credits/consumption";
import { deployVibeProject } from "@/lib/hosting/deploy";
import {
    Rocket,
    ExternalLink,
    Download,
    Check,
    Loader2,
    X,
    Globe,
    Copy,
    Link as LinkIcon,
    Sparkles,
    Crown,
    ArrowRight,
} from "lucide-react";

function DeployPanelContent({ onClose }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { generatedCode, projectId } = useCanvas();
    const { addNotification } = useNotifications();
    const { user } = useAuth();

    const projectName = searchParams.get("project") || "my-project";
    const projectSlug = projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const [step, setStep] = useState("options"); // options | deploying | published
    const [deployProgress, setDeployProgress] = useState(0);
    const [copied, setCopied] = useState(false);
    const [deployTarget, setDeployTarget] = useState(null);

    const previewUrl = `${projectSlug}.struxly.app`;
    const fullUrl = `https://${previewUrl}`;

    const handleDeploy = async (target) => {
        if (!generatedCode || !user?.uid || !projectId) {
            addNotification({ type: 'warning', title: 'Action failed', message: 'No project code to deploy.' });
            return;
        }

        setDeployTarget(target);
        setStep("deploying");
        setDeployProgress(0);

        // 1. Consume 1 publish credit
        const consumption = await consumeCredits(user.uid, 'publish');
        if (!consumption.success) {
            setStep("options");
            addNotification({
                type: 'error',
                title: 'Deployment Failed',
                message: consumption.error === 'INSUFFICIENT_CREDITS'
                    ? 'Insufficient credits to publish. Please upgrade your plan.'
                    : 'Failed to authorize deployment.'
            });
            return;
        }

        // 2. Simulate deploy progress UX
        const steps = [
            { progress: 15, delay: 400 },
            { progress: 35, delay: 600 },
            { progress: 55, delay: 500 },
            { progress: 75, delay: 700 },
        ];

        let totalDelay = 0;
        steps.forEach(({ progress, delay }) => {
            totalDelay += delay;
            setTimeout(() => setDeployProgress(progress), totalDelay);
        });

        // 3. Actual Deploy
        const deployResult = await deployVibeProject({
            userId: user.uid,
            projectId: projectId,
            projectSlug: projectSlug,
            code: generatedCode
        });

        if (deployResult.success) {
            setDeployProgress(100);
            setTimeout(() => {
                setStep("published");
                addNotification({
                    type: 'success',
                    title: 'Site Published',
                    message: `Your site is now live at ${previewUrl}`
                });
            }, 500);
        } else {
            setStep("options");
            addNotification({
                type: 'error',
                title: 'Deployment Failed',
                message: 'Failed to deploy the site to Struxly Cloud. Please try again.'
            });
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadCode = () => {
        if (!generatedCode) return;
        const blob = new Blob([generatedCode], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${projectSlug || 'App'}.jsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        addNotification({
            type: "success",
            title: "Downloaded",
            message: "React component downloaded successfully."
        });
    };

    const handleCopyCode = async () => {
        if (!generatedCode) return;
        await navigator.clipboard.writeText(generatedCode);
        addNotification({
            type: "success",
            title: "Code Copied",
            message: "React component code copied to clipboard."
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="w-[360px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <h3 className="text-[14px] font-semibold text-gray-900">
                        {step === "published" ? "Published!" : step === "deploying" ? "Publishing..." : "Publish Site"}
                    </h3>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            <AnimatePresence mode="wait">
                {/* Step 1: Deploy Options */}
                {step === "options" && (
                    <motion.div
                        key="options"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-4"
                    >
                        {/* Preview URL Preview */}
                        <div className="bg-gray-50 rounded-lg p-3.5 mb-4 border border-gray-100">
                            <p className="text-[11px] text-gray-400 font-medium mb-2 uppercase tracking-wide">Your site will be live at</p>
                            <div className="flex items-center gap-2 bg-white rounded-md border border-gray-200 px-3 py-2">
                                <LinkIcon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                <span className="text-[13px] text-gray-900 font-mono truncate">{previewUrl}</span>
                            </div>
                        </div>

                        {/* Deploy Options */}
                        <div className="space-y-2">
                            {/* Struxly Cloud — Primary */}
                            <button
                                onClick={() => handleDeploy("struxly")}
                                className="w-full flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all text-left group cursor-pointer"
                            >
                                <div className="p-2 bg-white/15 rounded-lg">
                                    <Rocket className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-semibold">Publish to Struxly</p>
                                    <p className="text-[11px] text-white/60">Free subdomain · Global CDN · SSL included</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors" />
                            </button>

                            {/* Custom Domain — Pro */}
                            <button
                                onClick={() => router.push("/portal/settings/domains")}
                                className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-left group cursor-pointer"
                            >
                                <div className="p-2 bg-amber-50 rounded-lg">
                                    <Crown className="w-4 h-4 text-amber-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-semibold text-gray-900">Custom Domain</p>
                                    <p className="text-[11px] text-gray-400">Connect your own domain</p>
                                </div>
                                <span className="text-[10px] font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 rounded-full shrink-0">PRO</span>
                            </button>

                        </div>
                    </motion.div>
                )}

                {/* Step 2: Deploying */}
                {step === "deploying" && (
                    <motion.div
                        key="deploying"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-6 text-center"
                    >
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                        </div>
                        <p className="text-[14px] font-semibold text-gray-900 mb-1">Publishing your site</p>
                        <p className="text-[12px] text-gray-400 mb-5">
                            {deployProgress < 30 ? "Building assets..." : deployProgress < 60 ? "Optimizing for production..." : deployProgress < 90 ? "Deploying to CDN..." : "Almost there..."}
                        </p>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: `${deployProgress}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <p className="text-[11px] text-gray-400 mt-2">{deployProgress}%</p>
                    </motion.div>
                )}

                {/* Step 3: Published */}
                {step === "published" && (
                    <motion.div
                        key="published"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-5"
                    >
                        <div className="text-center mb-5">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.1 }}
                                className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-3"
                            >
                                <Check className="w-6 h-6 text-green-600" />
                            </motion.div>
                            <p className="text-[14px] font-semibold text-gray-900 mb-1">Your site is live! 🎉</p>
                            <p className="text-[12px] text-gray-400">Accessible to anyone with the link</p>
                        </div>

                        {/* Published URL */}
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 mb-4">
                            <p className="text-[10px] text-gray-400 font-medium mb-2 uppercase tracking-wide">Live URL</p>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 flex items-center gap-2 bg-white rounded-md border border-gray-200 px-3 py-2.5 overflow-hidden">
                                    <Globe className="w-3.5 h-3.5 text-green-500 shrink-0" />
                                    <span className="text-[13px] text-gray-900 font-mono truncate">{previewUrl}</span>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="p-2.5 rounded-md bg-white border border-gray-200 hover:bg-gray-50 transition-colors shrink-0"
                                >
                                    {copied ? (
                                        <Check className="w-4 h-4 text-green-600" />
                                    ) : (
                                        <Copy className="w-4 h-4 text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2">
                            <a
                                href={`/site/${projectSlug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[13px] font-medium transition-colors"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                                Open Live Site
                            </a>
                            <button
                                onClick={onClose}
                                className="w-full py-2 text-[12px] font-medium text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                Done
                            </button>
                        </div>

                        {/* Upgrade hint */}
                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <p className="text-[11px] text-gray-400">
                                <span className="font-medium text-gray-600">Want a custom domain?</span>{" "}
                                Upgrade to Pro to connect <span className="font-mono text-gray-600">yourdomain.com</span>
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function DeployPanel({ onClose }) {
    return (
        <Suspense fallback={<div className="w-[360px] bg-white rounded-xl shadow-2xl border border-gray-200 p-8 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-gray-400" /></div>}>
            <DeployPanelContent onClose={onClose} />
        </Suspense>
    );
}
