"use client";

import { Github } from "lucide-react";

export default function GitHubPage() {
    return (
        <div className="max-w-3xl mx-auto py-12 px-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">GitHub Integration</h1>
            <p className="text-[14px] text-gray-500 mb-8">Manage the connection between Struxly and your GitHub repositories.</p>

            <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-6 py-5 bg-gray-50 flex items-center justify-between border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <Github className="w-5 h-5 text-gray-900" />
                        <div>
                            <h3 className="text-[14px] font-semibold text-gray-900">GitHub Account</h3>
                            <p className="text-[12px] text-gray-500">Connected as <span className="font-medium text-gray-700">@arzish07</span></p>
                        </div>
                    </div>
                    <button className="text-[12px] font-medium text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors">
                        Disconnect
                    </button>
                </div>
                
                <div className="p-6">
                    <h4 className="text-[13px] font-semibold text-gray-900 mb-3">Sync Preferences</h4>
                    
                    <div className="space-y-4">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input type="checkbox" defaultChecked className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <div>
                                <p className="text-[13px] font-medium text-gray-800 group-hover:text-blue-600 transition-colors">Auto-sync on publish</p>
                                <p className="text-[12px] text-gray-500 leading-relaxed mt-0.5">Automatically push code to your repository when clicking "Publish" from the canvas.</p>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                            <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <div>
                                <p className="text-[13px] font-medium text-gray-800 group-hover:text-blue-600 transition-colors">Create branches for major changes</p>
                                <p className="text-[12px] text-gray-500 leading-relaxed mt-0.5">Create a new branch instead of committing directly to main when making multi-file structural changes.</p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            
            <p className="text-[12px] text-gray-400 mt-6 text-center">
                Need to connect an organizational repository? <span className="text-blue-500 underline cursor-pointer">Configure GitHub App</span>
            </p>
        </div>
    );
}
