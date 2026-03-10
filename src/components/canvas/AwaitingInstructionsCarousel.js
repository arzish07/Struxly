"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronUp, ChevronDown, Pause, Play, Loader2 } from "lucide-react";
import { useCanvas } from "@/context/CanvasContext";

const CAROUSEL_SLIDES = [
    {
        id: "visual-edits",
        title: "Visual Edits",
        description: "Click any element in the preview to select it. Then, ask Struxly to change its color, padding, or layout. No coding required.",
        videoSrc: "/Visual edits. .mp4"
    },
    {
        id: "publishing",
        title: "Publish your project",
        description: "Instantly publish your app, connect a custom domain, and share it with the world.",
        videoSrc: "/Publish.mp4"
    },
    {
        id: "building",
        title: "Build at the speed of thought",
        description: "Describe what you want to build in plain English, and Struxly will generate production-ready code instantly.",
        videoSrc: "/Prompt .mp4"
    }
];

export default function AwaitingInstructionsCarousel() {
    const { isGenerating } = useCanvas();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const videoRef = useRef(null);

    // Auto-advance the carousel
    useEffect(() => {
        if (isPaused) return; // Stop advancing if paused

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, [isPaused]);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
    const togglePause = () => setIsPaused(!isPaused);

    // Sync video pause state
    useEffect(() => {
        if (videoRef.current) {
            if (isPaused) {
                videoRef.current.pause();
            } else {
                videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
            }
        }
    }, [isPaused, currentIndex]);

    return (
        <div className="absolute inset-0 bg-[#FAFAFA]/90 backdrop-blur-[1px] z-40 flex flex-col items-center justify-center p-6 pb-[120px]">

            {/* Top Loading Indicator - dynamically switches based on isGenerating state */}
            <div className="flex items-center gap-2.5 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-gray-200/50 mb-12 transition-all duration-300">
                {isGenerating ? (
                    <>
                        <Loader2 className="w-4 h-4 text-gray-500 animate-spin" strokeWidth={2} />
                        <span className="text-[13px] font-medium text-gray-700">Getting ready...</span>
                    </>
                ) : (
                    <>
                        <Clock className="w-4 h-4 text-gray-500" strokeWidth={2} />
                        <span className="text-[13px] font-medium text-gray-700">Awaiting further instructions</span>
                    </>
                )}
            </div>

            {/* Main Layout: Left Dots + Center Stack + Right Controls */}
            <div className="flex items-center gap-8 w-full max-w-[650px] justify-center">

                {/* Left Side: Vertical Dots */}
                <div className="flex flex-col items-center gap-2">
                    {/* Ghost dots to mimic Lovable's 8-dot scale */}
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-200/60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-200/60" />
                    {CAROUSEL_SLIDES.map((_, i) => (
                        <div
                            key={i}
                            className={`w-1.5 rounded-full transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${i === currentIndex ? 'h-5 bg-gray-800' : 'h-1.5 bg-gray-300'}`}
                        />
                    ))}
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-200/60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-200/60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-200/60" />
                </div>

                {/* Center: Stacked Cards */}
                <div className="relative w-[480px]">
                    {/* Background Stack Cards matching the paper-stack effect */}
                    <div className="absolute -top-[14px] left-8 right-8 h-10 bg-[#E8E8E6] rounded-t-[28px] -z-20 border border-[#DFDFDD]"></div>
                    <div className="absolute -top-[7px] left-4 right-4 h-10 bg-[#EAEBE8]/80 backdrop-blur-sm rounded-t-[28px] -z-10 border border-[#E2E2E0] shadow-sm"></div>

                    {/* Main Cream Card */}
                    <div className="relative bg-[#F5F4F0] rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#EAE9E4] overflow-hidden min-h-[380px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, filter: "blur(4px)" }}
                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, filter: "blur(4px)" }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="flex flex-col p-6 h-full"
                            >
                                {/* Video Area with rounded edges */}
                                <div className="w-full aspect-[16/10] sm:aspect-[4/3] bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 mb-6 relative">
                                    <video
                                        ref={videoRef}
                                        src={CAROUSEL_SLIDES[currentIndex].videoSrc}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="absolute bottom-0 left-0 w-full h-[120%] object-cover object-bottom"
                                    />
                                </div>

                                {/* Text Area below video */}
                                <div className="px-1 text-left mt-auto">
                                    <h3 className="text-[17px] font-bold text-gray-900 mb-2">
                                        {CAROUSEL_SLIDES[currentIndex].title}
                                    </h3>
                                    <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
                                        {CAROUSEL_SLIDES[currentIndex].description}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Side: Vertical Controls */}
                <div className="flex flex-col gap-3">
                    <button onClick={prevSlide} className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-200 shadow-sm text-gray-400 hover:text-gray-900 hover:border-gray-300 transition-all">
                        <ChevronUp className="w-4 h-4 ml-[1px] mb-[1px]" />
                    </button>
                    <button onClick={togglePause} className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-200 shadow-sm text-gray-400 hover:text-gray-900 hover:border-gray-300 transition-all">
                        {isPaused ? <Play className="w-3.5 h-3.5 ml-0.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
                    </button>
                    <button onClick={nextSlide} className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-gray-200 shadow-sm text-gray-400 hover:text-gray-900 hover:border-gray-300 transition-all">
                        <ChevronDown className="w-4 h-4 ml-[1px] mt-[1px]" />
                    </button>
                </div>

            </div>
        </div>
    );
}
