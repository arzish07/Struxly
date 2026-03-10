"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";

export default function BuildProgress({ steps = [], isComplete = false }) {
    const [activeStep, setActiveStep] = useState(0);

    // Simulate progress through the steps while generating
    useEffect(() => {
        if (!steps || steps.length === 0 || isComplete) return;

        // Rough estimation: spend equal time on each step, aiming for ~10-15s total
        const timePerStep = Math.max(2500, 15000 / steps.length);

        const interval = setInterval(() => {
            setActiveStep((prev) => {
                if (prev < steps.length - 1) return prev + 1;
                clearInterval(interval);
                return prev;
            });
        }, timePerStep);

        return () => clearInterval(interval);
    }, [steps, isComplete]);

    // Fast-forward to end if completed externally
    useEffect(() => {
        if (isComplete) {
            setActiveStep(steps.length);
        }
    }, [isComplete, steps.length]);

    if (!steps || steps.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="w-full bg-[#fcfcfd] border border-gray-100/80 rounded-2xl shadow-sm overflow-hidden p-4 text-left max-w-[95%] mt-2"
        >
            <div className="flex items-center gap-1.5 mb-3 text-gray-900 border-b border-gray-100 pb-3">
                <span className="text-[14px] font-bold tracking-tight">
                    {isComplete ? "Finished" : "Editing"}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[13px] font-medium text-gray-500 truncate">
                    {isComplete
                        ? "Coordinating tasks completed"
                        : "Coordinating task in progress"}
                </span>
            </div>

            <div className="space-y-3 pl-1">
                {steps.map((step, index) => {
                    const status = isComplete ? "done" : index < activeStep ? "done" : index === activeStep ? "active" : "pending";

                    return (
                        <div key={index} className="flex gap-3 items-center group">
                            <div className="relative flex items-center justify-center w-[18px] h-[18px] shrink-0">
                                {status === "done" ? (
                                    <div className="w-[18px] h-[18px] rounded-full border border-gray-200 bg-white flex items-center justify-center">
                                        <Check className="w-3 h-3 text-gray-800" strokeWidth={3} />
                                    </div>
                                ) : status === "active" ? (
                                    <div className="w-[18px] h-[18px] rounded-full border border-gray-200 bg-white flex items-center justify-center">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
                                    </div>
                                ) : (
                                    <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-200 bg-transparent" />
                                )}
                            </div>

                            <span className={`text-[12.5px] transition-colors duration-300 ${status === "done"
                                    ? "text-gray-900 font-medium"
                                    : status === "active"
                                        ? "text-gray-700 font-medium"
                                        : "text-gray-400"
                                }`}>
                                {step}
                            </span>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}
