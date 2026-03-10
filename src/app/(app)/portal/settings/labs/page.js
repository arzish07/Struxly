"use client";

import { FlaskConical } from "lucide-react";

export default function LabsPage() {
    return (
        <div className="max-w-3xl mx-auto py-12 px-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                Labs <span className="bg-amber-100 text-amber-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wider">Beta</span>
            </h1>
            <p className="text-[14px] text-gray-500 mb-8 max-w-xl">
                Try out experimental features before they are widely released. Features in Labs may change or be removed at any time.
            </p>

            <div className="space-y-4">
                <div className="border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row justify-between gap-4 transition-all hover:border-blue-200 hover:shadow-sm">
                    <div className="flex-1">
                        <h3 className="text-[14px] font-semibold text-gray-900 mb-1 flex items-center gap-2">
                            Advanced Animation Engine
                        </h3>
                        <p className="text-[13px] text-gray-500 leading-relaxed max-w-lg mb-4">
                            Allow Struxly to generate complex Framer Motion layouts automatically during canvas generation.
                        </p>
                    </div>
                    <div className="pt-1">
                        {/* Simulating a disabled toggle */}
                        <div className="w-11 h-6 bg-gray-200 rounded-full relative cursor-not-allowed opacity-50">
                            <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        </div>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row justify-between gap-4 transition-all hover:border-blue-200 hover:shadow-sm">
                    <div className="flex-1">
                        <h3 className="text-[14px] font-semibold text-gray-900 mb-1 flex items-center gap-2">
                            Native Database Integration
                        </h3>
                        <p className="text-[13px] text-gray-500 leading-relaxed max-w-lg mb-4">
                            Connect your UI directly to Supabase or Firebase without writing backend code.
                        </p>
                    </div>
                    <div className="pt-1">
                        {/* Simulating an enabled toggle */}
                        <div className="w-11 h-6 bg-blue-600 rounded-full relative cursor-pointer shadow-inner">
                            <div className="absolute top-1 left-6 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
