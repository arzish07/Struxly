"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export default function OnboardingQuestions({ data, onComplete, onSkip, forceLight = false }) {
    // Current question index if there are multiple
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    if (!data || !data.questions || data.questions.length === 0) return null;

    const currentQuestion = data.questions[currentIndex];

    // Auto-advance logic integrated into handleSelect
    const handleSelect = (optionId) => {
        // Prevent clicking again if we are about to auto-advance
        if (answers[currentQuestion.id] === optionId) return;

        const newAnswers = {
            ...answers,
            [currentQuestion.id]: optionId
        };
        setAnswers(newAnswers);

        // Calculate final answers immediately for this branch
        const finalAnswers = {};
        data.questions.forEach((q, idx) => {
            const selectedOptId = idx === currentIndex ? optionId : newAnswers[q.id];
            if (selectedOptId) {
                const opt = q.options.find(o => o.id === selectedOptId);
                finalAnswers[q.title] = opt ? opt.label : selectedOptId;
            }
        });

        // Delay completion slightly for user to see the selection animation
        setTimeout(() => {
            if (currentIndex < data.questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                onComplete(finalAnswers);
            }
        }, 400);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-[#fcfcfd] border border-gray-100/80 rounded-2xl shadow-sm overflow-hidden p-4 mt-2 max-w-[95%] text-left transition-colors"
        >
            <h3 className="text-[14px] font-bold tracking-tight mb-1 text-gray-900">
                {currentQuestion.title}
            </h3>
            <p className="text-[11px] font-medium mb-4 text-gray-400">
                {currentQuestion.subtitle}
            </p>

            <div className="space-y-2 mb-3">
                {currentQuestion.options.map((option) => {
                    const isSelected = answers[currentQuestion.id] === option.id;
                    return (
                        <div
                            key={option.id}
                            onClick={() => handleSelect(option.id)}
                            className={`p-3 rounded-xl border flex gap-3 cursor-pointer transition-all active:scale-[0.98] ${isSelected
                                ? "bg-indigo-50/50 border-indigo-200"
                                : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"
                                }`}
                        >
                            <div className="mt-0.5 relative shrink-0">
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${isSelected
                                    ? "border-indigo-500 bg-indigo-500"
                                    : "border-gray-300 bg-white"
                                    }`}>
                                    {isSelected && <Check className="w-2.5 h-2.5 text-white stroke-[3]" />}
                                </div>
                            </div>
                            <div>
                                <h4 className={`text-[13px] font-semibold tracking-tight transition-colors ${isSelected
                                    ? "text-indigo-900"
                                    : "text-gray-800"
                                    }`}>
                                    {option.label}
                                </h4>
                                <p className={`text-[11px] leading-snug mt-0.5 transition-colors ${isSelected
                                    ? "text-indigo-600/80"
                                    : "text-gray-400"
                                    }`}>
                                    {option.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-start pt-1">
                <button
                    onClick={onSkip}
                    className="px-2 py-1 text-[12.5px] font-semibold text-gray-400 hover:text-gray-600 transition-colors"
                >
                    Skip
                </button>
            </div>
        </motion.div>
    );
}
