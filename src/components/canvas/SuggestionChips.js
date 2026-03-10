"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function SuggestionChips({ suggestions = [], codeAnalysis = null, onSelect, forceLight = false }) {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    // Shuffle suggestions to keep them "smart" and varied
    // We memoize based on the content of the suggestions to prevent re-shuffling on Every re-render
    const shuffledSuggestions = useMemo(() => {
        let combined = [...(suggestions || [])];

        // Inject smart context-aware suggestions based on code analysis
        if (codeAnalysis) {
            if (codeAnalysis.hasHero === false) combined.unshift("Add a hero section");
            if (codeAnalysis.hasFooter === false) combined.push("Add a site footer");
            if (codeAnalysis.hasTestimonials === false) combined.push("Add testimonials");
            if (codeAnalysis.hasPricing === false) combined.push("Add pricing options");
            if (codeAnalysis.hasImages === false) combined.push("Add some images");
            if (codeAnalysis.isMobileResponsive === false) combined.unshift("Make it mobile responsive");
            if (codeAnalysis.hasDarkMode === false) combined.push("Add dark mode support");
        }

        // Deduplicate and filter empty
        combined = [...new Set(combined.filter(Boolean))];

        return combined.sort(() => 0.5 - Math.random());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(suggestions), JSON.stringify(codeAnalysis)]);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            // Increased thresholds to prevent jitter at edges and floating point rounding issues
            setShowLeftArrow(scrollLeft > 15);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 15);
        }
    };

    useEffect(() => {
        // Initial check and setup listeners
        const timer = setTimeout(checkScroll, 100);
        window.addEventListener('resize', checkScroll);
        return () => {
            window.removeEventListener('resize', checkScroll);
            clearTimeout(timer);
        };
    }, [shuffledSuggestions]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 200;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (!suggestions || suggestions.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.3 }}
            className="group/container relative w-full overflow-hidden"
        >
            <AnimatePresence>
                {showLeftArrow && (
                    <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </motion.button>
                )}
            </AnimatePresence>

            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex items-center gap-2 overflow-x-auto w-full py-2 px-1 scrollbar-none scroll-smooth"
                style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
                <div className="flex items-center gap-2 flex-nowrap w-max pr-12">
                    {shuffledSuggestions.map((suggestion, i) => (
                        <motion.button
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 + (i * 0.05), duration: 0.2 }}
                            onClick={() => onSelect(suggestion)}
                            className="group flex flex-none items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[11px] font-medium text-slate-600 hover:text-slate-900 transition-all shadow-sm active:scale-95"
                        >
                            {suggestion}
                        </motion.button>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {showRightArrow && (
                    <motion.button
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-900 transition-all"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Fade effect at the right edge */}
            <div className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white/95 to-transparent pointer-events-none transition-opacity duration-300 ${showRightArrow ? 'opacity-100' : 'opacity-0'}`} />
        </motion.div>
    );
}
