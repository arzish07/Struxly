"use client";

import { Link2, Database, MessageSquare, Briefcase } from "lucide-react";

export default function ConnectorsPage() {
    return (
        <div className="max-w-3xl mx-auto py-12 px-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Connectors</h1>
            <p className="text-[14px] text-gray-500 mb-8">Connect external services to use their APIs directly in your projects.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-xl p-6 flex items-start gap-4 hover:border-blue-300 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                        <Database className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <h4 className="text-[14px] font-semibold text-gray-900">Supabase</h4>
                            <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">Database</span>
                        </div>
                        <p className="text-[12px] text-gray-500 mt-1 mb-3">Connect your Postgres database for live data.</p>
                        <button className="text-[12px] font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-md transition-colors w-full">
                            Connect
                        </button>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-6 flex items-start gap-4 hover:border-blue-300 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                        <MessageSquare className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <h4 className="text-[14px] font-semibold text-gray-900">Stripe</h4>
                            <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">Payments</span>
                        </div>
                        <p className="text-[12px] text-gray-500 mt-1 mb-3">Accept payments and manage subscriptions.</p>
                        <button className="text-[12px] font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-md transition-colors w-full">
                            Connect
                        </button>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-6 flex items-start gap-4 hover:border-blue-300 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-100 transition-colors">
                        <Briefcase className="w-5 h-5 text-rose-600" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <h4 className="text-[14px] font-semibold text-gray-900">Shopify</h4>
                            <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">Storefront</span>
                        </div>
                        <p className="text-[12px] text-gray-500 mt-1 mb-3">Sync products and create headless storefronts.</p>
                        <button className="text-[12px] font-medium text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-md transition-colors w-full flex justify-center items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span> Connected
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
