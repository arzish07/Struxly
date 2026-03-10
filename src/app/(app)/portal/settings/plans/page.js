"use client";

import { useSubscription } from "@/context/SubscriptionContext";
import { PLANS, TOPUP_OPTIONS } from "@/data/subscriptions";
import { motion } from "framer-motion";
import { Check, X, Zap, FileText, ChevronDown } from "lucide-react";

function CreditBar({ current, max }) {
    const pct = Math.min((current / max) * 100, 100);
    return (
        <div className="flex items-center gap-4">
            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    className="h-full bg-blue-500 rounded-full"
                    transition={{ duration: 0.8 }}
                />
            </div>
            <span className="text-[13px] font-semibold text-gray-600">{current} of {max}</span>
        </div>
    );
}

function TierCard({ plan, isCurrent }) {
    return (
        <div className={`border rounded-xl p-6 ${isCurrent ? "border-blue-300 bg-blue-50/30" : "border-gray-200"}`}>
            <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
            <p className="text-[13px] text-gray-500 mt-1 min-h-[40px]">
                {plan.id === "free" && "Get started with the basics."}
                {plan.id === "starter" && "For individuals building real projects."}
                {plan.id === "pro" && "Advanced tools for growing businesses."}
                {plan.id === "studio" && "Built for teams and agencies."}
            </p>
            <div className="mt-4 mb-6">
                {plan.price > 0 ? (
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                        <span className="text-[13px] text-gray-400">per month</span>
                    </div>
                ) : (
                    <span className="text-3xl font-bold text-gray-900">Free</span>
                )}
            </div>

            {isCurrent ? (
                <div className="w-full border border-gray-300 text-[13px] font-medium text-gray-500 py-2.5 rounded-lg text-center cursor-default">
                    Current plan
                </div>
            ) : (
                <button className={`w-full text-[13px] font-semibold py-2.5 rounded-lg transition-colors ${plan.popular
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}>
                    {plan.price === 0 ? "Downgrade" : "Upgrade"}
                </button>
            )}

            <div className="mt-4 flex items-center gap-2">
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[12px] text-gray-600 bg-white outline-none">
                    <option>{plan.maxEdits} credits / month</option>
                </select>
            </div>

            <div className="mt-6">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    {plan.id === "free" ? "Includes:" : `All features in ${plan.id === "starter" ? "Free" : plan.id === "pro" ? "Starter" : "Pro"}, plus:`}
                </p>
                <ul className="space-y-2">
                    {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-[13px] text-gray-600">
                            <Check className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" /> {f}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default function PlansPage() {
    const { currentPlan, editCredits, maxCredits } = useSubscription();

    return (
        <div className="max-w-5xl mx-auto py-12 px-8">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-gray-900">Plans & credits</h1>
                <button className="text-[12px] text-gray-400 flex items-center gap-1 hover:text-gray-600 transition-colors">
                    <FileText className="w-3.5 h-3.5" /> Docs
                </button>
            </div>
            <p className="text-[14px] text-gray-500 mb-8">Manage your subscription plan and credit balance.</p>

            {/* Current Plan & Credits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-[15px] font-semibold text-gray-900">You're on {currentPlan.name} Plan</p>
                            <p className="text-[12px] text-gray-400">Upgrade anytime</p>
                        </div>
                    </div>
                    <button className="border border-gray-200 text-[13px] font-medium text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        Manage
                    </button>
                </div>

                <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-[14px] font-semibold text-gray-900">Credits remaining</p>
                    </div>
                    <CreditBar current={editCredits} max={maxCredits} />
                    <div className="mt-4 space-y-1.5">
                        <p className="text-[12px] text-gray-500 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500" /> Daily credits used first
                        </p>
                        <p className="text-[12px] text-gray-400 flex items-center gap-2">
                            <X className="w-3 h-3" /> No credits will rollover
                        </p>
                        <p className="text-[12px] text-gray-500 flex items-center gap-2">
                            <Check className="w-3 h-3 text-gray-400" /> Credits renew automatically every month
                        </p>
                    </div>
                </div>
            </div>

            {/* Tier Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {Object.values(PLANS).map((plan) => (
                    <TierCard key={plan.id} plan={plan} isCurrent={plan.id === currentPlan.id} />
                ))}
            </div>

            {/* Top-up Credits */}
            <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-[16px] font-semibold text-gray-900 mb-1">Need more credits?</h3>
                <p className="text-[13px] text-gray-500 mb-6">Top up your credits instantly.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {TOPUP_OPTIONS.map((opt) => (
                        <button
                            key={opt.credits}
                            className={`border rounded-xl p-4 text-center transition-all hover:shadow-md ${opt.popular ? "border-blue-300 bg-blue-50/30" : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            {opt.popular && (
                                <span className="text-[10px] font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded mb-2 inline-block">
                                    Best value
                                </span>
                            )}
                            <p className="text-2xl font-bold text-gray-900">{opt.label}</p>
                            <p className="text-[13px] text-gray-500 mt-1">${opt.price}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
