'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { consumeCredits } from '@/lib/credits/consumption';
import { TopUpModal } from '@/components/pricing/TopUpModal';

export function VibeBar({ onGenerate }: { onGenerate?: (code: string) => void }) {
    const [prompt, setPrompt] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const { user, profile: userData } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if (!prompt.trim() || !user || isGenerating) return;

        setIsGenerating(true);

        try {
            // 1. Consume Credits
            const result = await consumeCredits(user.uid, 'full_gen');
            if (!result.success) {
                if (result.error === 'INSUFFICIENT_CREDITS') {
                    setError('Insufficient credits. Please Top-up to continue building.');
                    setIsTopUpOpen(true);
                } else {
                    setError('Action not allowed on your current tier.');
                }
                setIsGenerating(false);
                return;
            }

            // 2. Call Gemini API
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });

            if (!response.ok) {
                throw new Error('Failed to generate code');
            }

            const data = await response.json();

            if (data.code && onGenerate) {
                onGenerate(data.code);
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred during generation');
        } finally {
            setIsGenerating(false);
            setPrompt(''); // clear prompt only after generation
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto mb-12">
            <form
                onSubmit={handleSubmit}
                className={`relative flex items-center bg-white/60 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-sm transition-all duration-300 ${isFocused ? 'ring-4 ring-indigo-50/50 border-indigo-200 shadow-md' : 'hover:shadow-md'
                    }`}
            >
                <div className="pl-6 pr-4 flex-1">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="What would you like Struxly to build today?"
                        className="w-full py-5 bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-400 font-medium text-lg leading-relaxed"
                    />
                </div>

                <div className="pr-3 flex items-center gap-3">
                    {userData?.top_up_credits > 0 && (
                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 text-yellow-700 text-xs font-semibold rounded-full border border-yellow-200">
                            <Sparkles className="w-3.5 h-3.5" />
                            {userData.top_up_credits} Extra
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!prompt.trim()}
                        className="p-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </form>

            {/* Error Message Display */}
            {error && (
                <div className="flex items-center gap-2 mt-4 text-red-600 bg-red-50 text-sm font-medium px-4 py-2.5 rounded-lg border border-red-200 animate-in fade-in slide-in-from-top-1">
                    <AlertTriangle className="w-4 h-4" />
                    {error}
                </div>
            )}

            <div className="flex items-center justify-center gap-6 mt-4 opacity-60">
                <span className="text-xs font-medium text-gray-500">Popular vibes:</span>
                <button className="text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors">Start a SaaS landing page</button>
                <button className="text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors">Design an interior deco store</button>
                <button className="text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors">Build a personal portfolio</button>
            </div>

            {/* Global Credit Top-Up Modal */}
            <TopUpModal
                isOpen={isTopUpOpen}
                onClose={() => setIsTopUpOpen(false)}
            />
        </div>
    );
}
