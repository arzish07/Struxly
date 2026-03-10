"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Shared mouse position hook. Tracks cursor position normalized to -1..1 range.
 * Uses a ref-based approach to batch updates and avoid excessive re-renders.
 */
export function useMousePosition() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        let frameId;
        const handleMouseMove = (e) => {
            if (frameId) cancelAnimationFrame(frameId);
            frameId = requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth - 0.5) * 2;
                const y = (e.clientY / window.innerHeight - 0.5) * 2;
                setMousePos({ x, y });
            });
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (frameId) cancelAnimationFrame(frameId);
        };
    }, []);

    return mousePos;
}

/**
 * Typewriter effect hook. Cycles through suffixes with typing/deleting animation.
 * @param {string} baseText - Static prefix text
 * @param {string[]} suffixes - Array of strings to cycle through
 * @param {{ typeSpeed?: number, deleteSpeed?: number, pauseMs?: number }} options
 */
export function useTypewriter(baseText, suffixes, { typeSpeed = 35, deleteSpeed = 18, pauseMs = 1200 } = {}) {
    const [displayText, setDisplayText] = useState(baseText);
    const stateRef = useRef({ suffixIndex: 0, charIndex: 0, isDeleting: false, paused: false });

    useEffect(() => {
        const s = stateRef.current;
        const currentSuffix = suffixes[s.suffixIndex];

        if (s.paused) return;

        const timeout = setTimeout(() => {
            if (!s.isDeleting) {
                if (s.charIndex < currentSuffix.length) {
                    s.charIndex++;
                    setDisplayText(baseText + currentSuffix.slice(0, s.charIndex));
                } else {
                    s.paused = true;
                    setTimeout(() => {
                        s.paused = false;
                        s.isDeleting = true;
                        setDisplayText(d => d); // trigger re-render
                    }, pauseMs);
                }
            } else {
                if (s.charIndex > 0) {
                    s.charIndex--;
                    setDisplayText(baseText + currentSuffix.slice(0, s.charIndex));
                } else {
                    s.isDeleting = false;
                    s.suffixIndex = (s.suffixIndex + 1) % suffixes.length;
                    setDisplayText(baseText);
                }
            }
        }, s.isDeleting ? deleteSpeed : typeSpeed);

        return () => clearTimeout(timeout);
    }, [displayText, baseText, suffixes, typeSpeed, deleteSpeed, pauseMs]);

    const pause = () => { stateRef.current.paused = true; };
    const resume = () => {
        stateRef.current.paused = false;
        setDisplayText(d => d); // trigger re-render to restart loop
    };

    return { displayText, pause, resume };
}
