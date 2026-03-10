"use client";

import { Users, UserPlus } from "lucide-react";

export default function PeoplePage() {
    return (
        <div className="max-w-3xl mx-auto py-12 px-8">
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-gray-900">People</h1>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                    <UserPlus className="w-4 h-4" /> Invite member
                </button>
            </div>
            <p className="text-[14px] text-gray-500 mb-8">Manage who has access to this workspace.</p>

            <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-6 py-4 flex items-center justify-between bg-white border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-[14px]">
                            JD
                        </div>
                        <div>
                            <p className="text-[14px] font-medium text-gray-900">John Doe (You)</p>
                            <p className="text-[12px] text-gray-500">john@example.com</p>
                        </div>
                    </div>
                    <div className="text-[12px] font-medium text-gray-500 px-3 py-1 bg-gray-100 rounded-full">
                        Owner
                    </div>
                </div>
                
                <div className="px-6 py-12 flex flex-col items-center justify-center text-center bg-gray-50/50">
                    <div className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                        <Users className="w-6 h-6 text-gray-400" />
                    </div>
                    <h3 className="text-[15px] font-semibold text-gray-900 mb-2">Collaborate with your team</h3>
                    <p className="text-[13px] text-gray-500 max-w-sm mb-2 leading-relaxed">
                        Invite developers, designers, and managers to build together in real-time.
                    </p>
                </div>
            </div>
        </div>
    );
}
