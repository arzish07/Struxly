"use client";

import { useSubscription } from "@/context/SubscriptionContext";
import { motion } from "framer-motion";
import { Zap, Cloud, FileText, ChevronRight } from "lucide-react";

function UsageBar({ label, used, total, unit = "$" }) {
    const pct = total > 0 ? Math.min((used / total) * 100, 100) : 0;
    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
                <div className="flex items-center gap-1 mb-1">
                    <span className="text-[13px] font-medium text-gray-700">{label}</span>
                    <span className="text-gray-300 cursor-help">ⓘ</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        className="h-full bg-blue-500 rounded-full"
                        transition={{ duration: 0.8 }}
                    />
                </div>
            </div>
            <div className="text-right">
                <p className="text-[14px] font-semibold text-gray-900">
                    {unit}{used} / {unit}{total}
                </p>
                <p className="text-[11px] text-gray-400">Free balance used</p>
            </div>
        </div>
    );
}

export default function CloudBalancePage() {
    const { currentPlan } = useSubscription();

    return (
        <div className="max-w-3xl mx-auto py-12 px-8">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-gray-900">Cloud & AI balance</h1>
                <button className="text-[12px] text-gray-400 flex items-center gap-1 hover:text-gray-600 transition-colors">
                    <FileText className="w-3.5 h-3.5" /> Docs
                </button>
            </div>
            <p className="text-[14px] text-gray-500 mb-8">
                All plans include free monthly usage. For increased Cloud and AI usage, you can top up on paid plans.
            </p>

            {/* Cloud + AI Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-pink-500 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-[15px] font-semibold text-gray-900">Cloud + AI</p>
                            <p className="text-[12px] text-gray-400">Monthly included usage resets 1 Apr 2026</p>
                        </div>
                    </div>
                    <p className="text-[13px] text-gray-500 mb-3">Upgrade to top up your balance ($0).</p>
                    <button className="border border-gray-200 text-[13px] font-medium text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        Upgrade plan
                    </button>
                </div>

                <div className="border border-gray-200 rounded-xl p-6 space-y-6">
                    <UsageBar label="Cloud" used={0} total={25} />
                    <UsageBar label="AI" used={0} total={1} />
                </div>
            </div>

            {/* Project Breakdown */}
            <div className="border border-gray-200 rounded-xl">
                <button className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors rounded-xl">
                    <h3 className="text-[14px] font-semibold text-gray-900">Project breakdown</h3>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
            </div>

            <p className="text-[12px] text-gray-400 mt-6">
                This is a temporary offering until the end of Q1 2026 as we refine our pricing model.{" "}
                <span className="text-blue-500 underline cursor-pointer">Read more</span>
            </p>
        </div>
    );
}
