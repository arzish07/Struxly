"use client";

import { useSubscription } from "@/context/SubscriptionContext";
import { ExternalLink, Star, MoreHorizontal, Globe, ArrowUpRight, ShoppingBag } from "lucide-react";

export default function DomainsPage() {
    const { canAddCustomDomain } = useSubscription();

    return (
        <div className="max-w-3xl mx-auto py-12 px-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Domains</h1>
            <p className="text-[14px] text-gray-500 mb-8">Publish your project to custom domains.</p>

            {/* Overview */}
            <div className="border border-gray-200 rounded-xl p-6 mb-6">
                <h3 className="text-[14px] font-semibold text-gray-900 mb-4">Overview</h3>
                <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <span className="text-[13px] font-medium text-gray-700">mysite.struxly.app</span>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-gray-600" />
                        <span className="text-[10px] font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-md">Live</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-gray-300 cursor-pointer hover:text-yellow-400 transition-colors" />
                        <MoreHorizontal className="w-4 h-4 text-gray-300 cursor-pointer hover:text-gray-600" />
                    </div>
                </div>
            </div>

            {/* Add domain cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-xl p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                        <ArrowUpRight className="w-5 h-5 text-amber-700" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-[14px] font-semibold text-gray-900">Add existing domain</h4>
                            <span className="text-[10px] font-semibold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">Pro</span>
                        </div>
                        {canAddCustomDomain ? (
                            <button className="mt-2 border border-gray-200 text-[12px] font-medium text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                Connect domain
                            </button>
                        ) : (
                            <p className="text-[12px] text-blue-500 underline cursor-pointer mt-1">Upgrade your plan</p>
                        )}
                    </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <ShoppingBag className="w-5 h-5 text-green-700" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-[14px] font-semibold text-gray-900">Purchase new domain</h4>
                            <span className="text-[10px] font-semibold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">Pro</span>
                        </div>
                        {canAddCustomDomain ? (
                            <button className="mt-2 border border-gray-200 text-[12px] font-medium text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                Buy new domain
                            </button>
                        ) : (
                            <p className="text-[12px] text-blue-500 underline cursor-pointer mt-1">Upgrade your plan</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
