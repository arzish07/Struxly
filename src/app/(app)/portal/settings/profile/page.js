"use client";

import { UserCircle } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="max-w-3xl mx-auto py-12 px-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile</h1>
            <p className="text-[14px] text-gray-500 mb-8">Manage your personal account settings.</p>

            <div className="space-y-6">
                <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-[20px]">
                            JD
                        </div>
                        <div>
                            <button className="border border-gray-200 text-[13px] font-medium text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                Upload new photo
                            </button>
                            <p className="text-[12px] text-gray-400 mt-2">JPG, GIF or PNG. 1MB max.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-[13px] font-semibold text-gray-700 mb-2 block">First name</label>
                            <input
                                type="text"
                                defaultValue="John"
                                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-800 outline-none focus:border-gray-300 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="text-[13px] font-semibold text-gray-700 mb-2 block">Last name</label>
                            <input
                                type="text"
                                defaultValue="Doe"
                                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-800 outline-none focus:border-gray-300 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="text-[13px] font-semibold text-gray-700 mb-2 block">Email address</label>
                        <input
                            type="email"
                            defaultValue="john@example.com"
                            disabled
                            className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2 text-sm text-gray-500 outline-none cursor-not-allowed"
                        />
                        <p className="text-[12px] text-gray-400 mt-2">Your email address is managed through your authentication provider.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
