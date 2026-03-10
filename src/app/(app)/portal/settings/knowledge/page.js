"use client";

import { BookOpen } from "lucide-react";

export default function KnowledgePage() {
    return (
        <div className="max-w-3xl mx-auto py-12 px-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Knowledge</h1>
            <p className="text-[14px] text-gray-500 mb-8">Manage context and documentation for the AI.</p>

            <div className="border border-gray-200 rounded-xl p-12 flex flex-col items-center justify-center text-center bg-gray-50/50">
                <div className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                    <BookOpen className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-[15px] font-semibold text-gray-900 mb-2">No knowledge base connected</h3>
                <p className="text-[13px] text-gray-500 max-w-sm mb-6 leading-relaxed">
                    Upload documents or link external URLs to provide custom context for your AI generations.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors">
                    Add knowledge source
                </button>
            </div>
        </div>
    );
}
