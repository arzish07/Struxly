"use client";

import { Shield, Key } from "lucide-react";

export default function SecurityPage() {
    return (
        <div className="max-w-3xl mx-auto py-12 px-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Privacy & security</h1>
            <p className="text-[14px] text-gray-500 mb-8">Manage authentication and data sharing preferences.</p>

            <div className="space-y-6">
                <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-[14px] font-semibold text-gray-900 mb-1 flex items-center gap-2">
                                <Key className="w-4 h-4 text-gray-500" /> Two-factor authentication
                            </h3>
                            <p className="text-[13px] text-gray-500">Add an extra layer of security to your account.</p>
                        </div>
                        <button className="border border-gray-200 text-[13px] font-medium text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                            Enable 2FA
                        </button>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="text-[14px] font-semibold text-gray-900 mb-1 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-gray-500" /> AI Data Sharing
                            </h3>
                            <p className="text-[13px] text-gray-500 leading-relaxed max-w-lg">
                                Allow Struxly to use your generations to improve our models. Disabling this will prevent your private code from being used as training data.
                            </p>
                        </div>
                        <div className="pt-1">
                            {/* Simple toggle switch placeholder */}
                            <div className="w-11 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                                <div className="absolute top-1 left-6 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
