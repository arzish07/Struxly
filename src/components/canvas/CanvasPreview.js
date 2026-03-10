"use client";

import React, { useEffect, Suspense } from "react";
import { useCanvas } from "@/context/CanvasContext";
import { useSearchParams } from "next/navigation";
import { templates } from "@/data/templates";
import { LivePreview } from "@/components/dashboard/LivePreview";
import { Sparkles, ShoppingCart, LayoutDashboard, Rocket, Bell } from "lucide-react";
import AwaitingInstructionsCarousel from "./AwaitingInstructionsCarousel";

function CanvasPreviewContent() {
    const { generatedCode, setGeneratedCode, inspectorActive, selectElement, isLoaded, isAwaitingInstructions, deviceView } = useCanvas();
    const searchParams = useSearchParams();
    const templateSlug = searchParams.get('template');
    const initialPrompt = searchParams.get('prompt');

    // Fetch template code if we don't have any generated code yet, and the DB has finished loading
    useEffect(() => {
        if (isLoaded && templateSlug && !generatedCode) {
            const fetchTemplateCode = async () => {
                try {
                    const response = await fetch(`/api/templates/${templateSlug}`);
                    if (response.ok) {
                        const data = await response.json();
                        if (data.code) {
                            setGeneratedCode(data.code);
                        }
                    }
                } catch (err) {
                    console.error("Failed to fetch template code:", err);
                }
            };
            fetchTemplateCode();
        }
    }, [isLoaded, templateSlug, generatedCode, setGeneratedCode]);

    const templateData = templateSlug
        ? templates.find(t => t.slug === templateSlug)
        : null;

    const liveUrl = templateData?.liveUrl;
    const hasLiveUrl = liveUrl && liveUrl !== "" && liveUrl !== "#";

    if (!isLoaded) {
        return (
            <div className="h-full bg-transparent flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-[3px] border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                    <p className="text-[13px] text-gray-400 font-medium">Loading workspace...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="absolute inset-0 bg-transparent overflow-hidden flex items-center justify-center p-4">
            <div
                className={`h-full transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] relative bg-white overflow-hidden ring-1 ring-gray-200/50 flex flex-col ${deviceView === 'mobile' ? 'w-[375px] rounded-[3rem] shadow-2xl border-[12px] border-gray-900/95 ring-gray-900/10' :
                        deviceView === 'tablet' ? 'w-[768px] rounded-[2rem] shadow-2xl border-[12px] border-gray-900/95 ring-gray-900/10' :
                            'w-full rounded-none border-none !p-0 shadow-none ring-0'
                    }`}
            >
                {isAwaitingInstructions || initialPrompt ? (
                    <AwaitingInstructionsCarousel />
                ) : generatedCode ? (
                    <div className="w-full h-full overflow-auto relative">
                        <LivePreview
                            code={generatedCode}
                            inspectorActive={inspectorActive}
                            onElementSelect={selectElement}
                        />
                        {inspectorActive && (
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-full shadow-lg text-[12px] font-medium animate-pulse">
                                    <span>🎯</span>
                                    <span>Click any element to select it</span>
                                </div>
                            </div>
                        )}
                    </div>
                ) : hasLiveUrl ? (
                    <iframe
                        src={liveUrl}
                        className="w-full h-full border-none flex-1"
                        title={`${templateData.title} Preview`}
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    />
                ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center text-center px-8 bg-transparent">
                        <div className="w-14 h-14 bg-white/60 backdrop-blur-md border border-gray-200/50 shadow-sm rounded-2xl flex items-center justify-center mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                            <Sparkles className="w-6 h-6 text-indigo-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Build something extraordinary</h3>
                        <p className="text-[14px] text-gray-500 max-w-sm mb-10 leading-relaxed">
                            Describe what you want to build in the chat, or start with one of these popular architectures:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full">
                            {[
                                { title: "E-Commerce", desc: "Build a modern storefront...", icon: <ShoppingCart /> },
                                { title: "SaaS Dashboard", desc: "Create an intricate admin panel...", icon: <LayoutDashboard /> },
                                { title: "Landing Page", desc: "Design a high-converting waitlist...", icon: <Rocket /> }
                            ].map((item, i) => (
                                <div key={i} className="bg-white/50 backdrop-blur-sm border border-gray-100 rounded-xl p-5 text-left hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center mb-3 text-indigo-600">
                                        {React.cloneElement(item.icon, { className: "w-4 h-4" })}
                                    </div>
                                    <h4 className="text-[14px] font-semibold text-gray-900 mb-1">{item.title}</h4>
                                    <p className="text-[12px] text-gray-500 leading-relaxed truncate">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function CanvasPreview() {
    return (
        <Suspense fallback={<div className="h-full bg-transparent flex items-center justify-center"><div className="w-6 h-6 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" /></div>}>
            <CanvasPreviewContent />
        </Suspense>
    );
}
