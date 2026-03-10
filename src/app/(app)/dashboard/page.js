'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { VibeBar } from '@/components/dashboard/VibeBar';
import { BentoGrid } from '@/components/dashboard/BentoGrid';
import { LivePreview } from '@/components/dashboard/LivePreview';

export default function DashboardPage() {
    const [generatedCode, setGeneratedCode] = useState(null);

    return (
        <div className="min-h-screen bg-[#FFFFFF] p-8 lg:p-12 relative overflow-hidden">
            {/* Subtle modern background decorations */}
            <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-gradient-to-bl from-indigo-50/50 via-purple-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10 transform translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-50/40 via-cyan-50/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10 transform -translate-x-1/3 translate-y-1/3" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto space-y-10"
            >
                <header className="flex flex-col items-center justify-center pt-8 pb-4 text-center">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Build at the speed of thought.
                    </h1>
                    <p className="text-gray-500 text-lg max-w-2xl">
                        Describe your vision, and Struxly's AI agents will architect, design, and deploy it in seconds.
                    </p>
                </header>

                <section className="relative z-20">
                    <VibeBar onGenerate={(code) => setGeneratedCode(code)} />
                </section>

                <section className="relative z-10 pt-4">
                    {generatedCode ? (
                        <div className="animate-in slide-in-from-bottom-4 fade-in duration-700">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Live Preview
                                </h2>
                                <div className="flex gap-2">
                                    <button onClick={() => setGeneratedCode(null)} className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                        Discard
                                    </button>
                                    <button className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm shadow-indigo-200">
                                        Save Project
                                    </button>
                                </div>
                            </div>
                            <LivePreview code={generatedCode} />
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-8 border-t border-gray-100 pt-8">
                                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Your Projects</h2>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                        Filter
                                    </button>
                                    <button className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm shadow-indigo-200">
                                        New Project
                                    </button>
                                </div>
                            </div>
                            <BentoGrid />
                        </>
                    )}
                </section>
            </motion.div>
        </div>
    );
}
