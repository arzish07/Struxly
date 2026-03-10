"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    Mic,
    ArrowUp,
    ChevronDown,
    ChevronRight,
    Heart,
    Play,
    Globe,
    Search,
    X,
    Sparkles,
    Lock,
    Plus,
} from "lucide-react";
import { useMousePosition, useTypewriter } from "@/hooks/useAnimations";

/* ─────────────── NAVBAR ─────────────── */
const solutionsLinks = [
    { label: "Startups", href: "/solutions/startups" },
    { label: "Freelancers", href: "/solutions/freelancers" },
    { label: "Small Businesses", href: "/solutions/small-businesses" },
    { label: "Agencies", href: "/solutions/agencies" },
    { label: "E-commerce", href: "/solutions/ecommerce" },
];

const resourcesLinks = [
    { label: "Blog", href: "/blog" },
    { label: "Templates", href: "/templates" },
    { label: "Guides", href: "/guides" },
    { label: "Documentation", href: "/docs" },
    { label: "Support", href: "/support" },
];

function NavDropdown({ label, items }) {
    const [open, setOpen] = useState(false);
    const timeoutRef = useRef(null);

    const handleEnter = () => {
        clearTimeout(timeoutRef.current);
        setOpen(true);
    };
    const handleLeave = () => {
        timeoutRef.current = setTimeout(() => setOpen(false), 150);
    };

    return (
        <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <button className="flex items-center gap-1 px-3 py-1.5 text-[13.5px] text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100/60">
                {label} <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full left-0 mt-2 w-[200px] bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-[60]"
                    >
                        {items.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="block px-4 py-2.5 text-[13.5px] text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

import { UserMenu } from "@/components/UserMenu";

function Navbar({ onLoginClick, onGetStartedClick }) {
    const [scrolled, setScrolled] = useState(false);
    const { isAuthenticated, user, signOut } = useAuth();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${scrolled ? "py-4" : "py-0"}`}
        >
            <div className={`max-w-[1280px] mx-auto transition-all duration-500 ease-out ${scrolled ? "px-2" : "px-6"}`}>
                <div className={`flex items-center justify-between h-[60px] transition-all duration-500 ${scrolled ? "bg-white/10 glass-glow rounded-2xl px-6 shadow-2xl" : "bg-transparent"}`}>
                    {/* Logo */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-4">
                            <img src="/logo-symbol.png" alt="" className="w-[22px] h-[22px] object-contain" />
                            <img src="/logo-word.png" alt="Struxly" className="h-[20px] w-auto object-contain translate-y-[3px]" />
                        </Link>

                        {/* Nav Links */}
                        <div className="hidden md:flex items-center gap-1">
                            <NavDropdown label="Solutions" items={solutionsLinks} />
                            <NavDropdown label="Resources" items={resourcesLinks} />
                            <Link
                                href="/pricing"
                                className="px-3 py-1.5 text-[13.5px] text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100/60"
                            >
                                Pricing
                            </Link>
                            <Link
                                href="/community"
                                className="px-3 py-1.5 text-[13.5px] text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100/60"
                            >
                                Community
                            </Link>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-2">
                        {isAuthenticated ? (
                            <UserMenu user={user} onSignOut={signOut} />
                        ) : (
                            <>
                                <button
                                    onClick={onLoginClick}
                                    className="px-4 py-[7px] text-[13px] font-medium text-gray-700 bg-white/50 backdrop-blur-md border border-white/40 rounded-lg hover:bg-white/80 transition-all hover:shadow-sm"
                                >
                                    Log in
                                </button>
                                <button
                                    onClick={onGetStartedClick}
                                    className="px-4 py-[7px] text-[13px] font-medium text-white bg-gray-900/90 backdrop-blur-md border border-white/20 rounded-lg hover:bg-gray-800 transition-all hover:shadow-md hover:-translate-y-0.5"
                                    style={{ boxShadow: 'inset 0 0.5px 0 0 rgba(255,255,255,0.2), 0 4px 12px 0 rgba(0,0,0,0.1)' }}
                                >
                                    Get started
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

import { PromptPlusMenu } from "@/components/PromptPlusMenu";

/* ─────────────── LOCKED FEATURE TOOLTIP ─────────────── */
function LockedFeatureTooltip({ children, onSignIn, position = "top" }) {
    const [show, setShow] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const wrapperRef = useRef(null);
    const timeoutRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); return () => clearTimeout(timeoutRef.current); }, []);

    const updatePosition = useCallback(() => {
        if (!wrapperRef.current) return;
        const rect = wrapperRef.current.getBoundingClientRect();
        if (position === "top") {
            setCoords({ top: rect.top + window.scrollY - 10, left: rect.left + rect.width / 2 + window.scrollX });
        } else {
            setCoords({ top: rect.bottom + window.scrollY + 10, left: rect.left + rect.width / 2 + window.scrollX });
        }
    }, [position]);

    const handleEnter = () => { clearTimeout(timeoutRef.current); updatePosition(); setShow(true); };
    const handleLeave = () => { timeoutRef.current = setTimeout(() => setShow(false), 200); };

    const tooltipContent = show && mounted ? createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: position === "top" ? 6 : -6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: position === "top" ? 6 : -6, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                style={{
                    position: "absolute",
                    top: position === "top" ? coords.top : coords.top,
                    left: coords.left,
                    transform: position === "top" ? "translate(-50%, -100%)" : "translate(-50%, 0)",
                    zIndex: 9999,
                }}
                className="w-[220px] bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 p-3.5"
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
            >
                <div className="flex items-start gap-2.5 mb-3">
                    <Lock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-[12.5px] font-semibold text-gray-800 leading-tight mb-0.5">Sign in to unlock</p>
                        <p className="text-[11px] text-gray-400 leading-snug">Access all tools after signing in with your account.</p>
                    </div>
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); onSignIn(); setShow(false); }}
                    className="w-full bg-gray-900 text-white text-[11.5px] font-medium rounded-lg py-2 hover:bg-black transition-colors"
                >
                    Sign in
                </button>
            </motion.div>
        </AnimatePresence>,
        document.body
    ) : null;

    return (
        <div
            className="relative"
            ref={wrapperRef}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <div onClick={() => { updatePosition(); setShow(!show); }}>
                {children}
            </div>
            {tooltipContent}
        </div>
    );
}

/* ─────────────── HERO ─────────────── */
function HeroSection({ onGetStartedClick }) {
    const { isAuthenticated } = useAuth();
    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const words = ["Drag", "Guesswork", "Complexity"];
    const [currentWord, setCurrentWord] = useState(0);

    // Restore saved prompt from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("struxly_prompt");
        if (saved) setInputValue(saved);
    }, []);

    const handleSubmit = () => {
        if (inputValue.trim()) {
            localStorage.setItem("struxly_prompt", inputValue.trim());
        }
        onGetStartedClick();
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    // Use shared hooks
    const mousePos = useMousePosition();

    const heroSuffixes = [
        "create a website for my business",
        "create a dashboard",
        "create a landing page for my startup",
        "change product descriptions",
        "update the hero section",
        "create a blog about tech trends",
        "design a portfolio site",
    ];
    const { displayText } = useTypewriter("Ask Struxly to ", heroSuffixes);

    // Cycle hero heading words
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Pause typewriter when user is typing
    const showTypewriter = !inputValue && !isFocused;

    return (
        <section className="relative pt-[60px] min-h-screen overflow-hidden">
            {/* Animated CSS gradient mesh background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 z-0 hero-gradient-bg" />
                <motion.div
                    className="hero-blob hero-blob-1"
                    animate={{
                        x: mousePos.x * -40,
                        y: mousePos.y * -40,
                    }}
                    transition={{ type: "spring", stiffness: 30, damping: 20 }}
                />
                <motion.div
                    className="hero-blob hero-blob-2"
                    animate={{
                        x: mousePos.x * 30,
                        y: mousePos.y * 30,
                    }}
                    transition={{ type: "spring", stiffness: 40, damping: 25 }}
                />
                <motion.div
                    className="hero-blob hero-blob-3"
                    animate={{
                        x: mousePos.x * -50,
                        y: mousePos.y * -50,
                    }}
                    transition={{ type: "spring", stiffness: 20, damping: 15 }}
                />
                <motion.div
                    className="hero-blob hero-blob-4"
                    animate={{
                        x: mousePos.x * 20,
                        y: mousePos.y * 20,
                    }}
                    transition={{ type: "spring", stiffness: 50, damping: 30 }}
                />
            </div>

            <div className="relative z-10 max-w-[720px] mx-auto px-6 pb-[200px] flex flex-col items-center justify-center min-h-screen text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[38px] md:text-[48px] lg:text-[56px] font-semibold text-gray-900 leading-[1.08] mb-4"
                    style={{ letterSpacing: '-0.03em' }}
                >
                    <span>No More </span>
                    <span className="relative inline-block text-left align-bottom" style={{ width: "280px", height: "1.1em" }}>
                        <AnimatePresence mode="popLayout">
                            <motion.span
                                key={currentWord}
                                initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -20, filter: "blur(12px)" }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="absolute left-0 top-0 bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 bg-clip-text whitespace-nowrap"
                                style={{ WebkitTextFillColor: "transparent" }}
                            >
                                {words[currentWord]}
                            </motion.span>
                        </AnimatePresence>
                    </span>
                    <br />
                    <span>Just </span>
                    <span
                        className="bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 bg-clip-text"
                        style={{ WebkitTextFillColor: "transparent" }}
                    >
                        Dialogue.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="text-[17px] text-gray-600 mb-12 mt-3"
                >
                    Describe it. Struxly builds it.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="w-full glass-strong rounded-3xl overflow-visible max-w-[700px] hover:shadow-2xl hover:shadow-violet-500/10 transition-shadow duration-500 animate-float"
                >
                    <div className="px-5 pt-4 pb-2 relative">
                        {/* Typewriter overlay */}
                        {showTypewriter && (
                            <div
                                className="absolute inset-0 px-5 pt-4 pb-2 pointer-events-none flex items-start"
                            >
                                <span className="text-black/60 text-[15px] leading-relaxed">
                                    {displayText}
                                    <span className="inline-block w-[2px] h-[18px] bg-gray-400 ml-[1px] align-middle" style={{ animation: "blink 1s step-end infinite" }} />
                                </span>
                            </div>
                        )}
                        <textarea
                            rows={2}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onKeyDown={handleKeyDown}
                            placeholder=""
                            className="w-full bg-transparent text-gray-900 text-[15px] placeholder-gray-400 resize-none focus:outline-none leading-relaxed relative z-10"
                            style={{ caretColor: inputValue ? undefined : "transparent" }}
                        />
                    </div>
                    <div className="flex items-center justify-between px-4 pb-3">
                        {isAuthenticated ? (
                            <PromptPlusMenu onSelectPrompt={setInputValue} className="relative" />
                        ) : (
                            <LockedFeatureTooltip onSignIn={handleSubmit}>
                                <button className="p-1.5 rounded-lg hover:bg-black/5 text-gray-400 transition-colors">
                                    <Plus className="w-4.5 h-4.5" />
                                </button>
                            </LockedFeatureTooltip>
                        )}
                        <div className="flex items-center gap-2">
                            {isAuthenticated ? (
                                <button className="text-[12.5px] text-gray-400 font-medium hover:text-gray-500 transition-colors cursor-pointer">
                                    Plan
                                </button>
                            ) : (
                                <LockedFeatureTooltip onSignIn={handleSubmit}>
                                    <button className="text-[12.5px] text-gray-400 font-medium hover:text-gray-500 transition-colors cursor-pointer">
                                        Plan
                                    </button>
                                </LockedFeatureTooltip>
                            )}
                            {isAuthenticated ? (
                                <button className="p-1.5 rounded-lg hover:bg-black/5 text-gray-400 transition-colors">
                                    <Mic className="w-4 h-4" />
                                </button>
                            ) : (
                                <LockedFeatureTooltip onSignIn={handleSubmit}>
                                    <button className="p-1.5 rounded-lg hover:bg-black/5 text-gray-400 transition-colors">
                                        <Mic className="w-4 h-4" />
                                    </button>
                                </LockedFeatureTooltip>
                            )}
                            <button
                                onClick={handleSubmit}
                                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${inputValue.trim()
                                    ? "bg-gray-900 text-white hover:bg-black"
                                    : "bg-gray-900 text-white hover:bg-black"
                                    }`}
                            >
                                <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── SOCIAL PROOF LOGOS ─────────────── */
function SocialProofSection() {
    const companies = [
        "Shopify", "Amazon", "Stripe", "Microsoft", "Vercel"
    ];

    return (
        <section className="bg-white py-12 border-b border-gray-100">
            <div className="max-w-[1100px] mx-auto px-6">
                <p className="text-[13px] text-gray-500 text-center mb-8 font-medium">
                    Teams from top companies build with Struxly
                </p>
                <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap">
                    {companies.map((name) => (
                        <span
                            key={name}
                            className="text-[18px] font-bold text-gray-300 tracking-tight select-none"
                        >
                            {name}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────── MEET STRUXLY ─────────────── */
function MeetSection() {
    const steps = [
        {
            title: "Start with an idea",
            description:
                "Describe the app or website you want to create or drop in screenshots and docs",
            active: false,
        },
        {
            title: "Watch it come to life",
            description:
                "See your vision transform into a working prototype in real-time as AI builds it for you",
            active: true,
        },
        {
            title: "Refine and ship",
            description:
                "Iterate on your creation with simple feedback and deploy it to the world with one click",
            active: false,
        },
    ];

    return (
        <section className="bg-white py-20">
            <div className="max-w-[1100px] mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[36px] font-bold text-gray-900 tracking-tight mb-12"
                >
                    Meet Struxly.ai
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Preview Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-2xl overflow-hidden bg-[#f5f0e8] aspect-[4/3] animate-float"
                    >
                        <Image
                            src="/meet-preview.png"
                            alt="Struxly.ai Interface Preview"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full glass-glow flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 transition-all duration-300">
                                <Play className="w-6 h-6 text-white ml-1 shadow-sm" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Steps */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="space-y-8"
                    >
                        {steps.map((step, i) => (
                            <div key={step.title} className="group">
                                <h3
                                    className={`text-[22px] font-bold tracking-tight mb-2 ${step.active ? "text-gray-900" : "text-gray-400"
                                        }`}
                                >
                                    {step.title}
                                </h3>
                                <p className="text-[14.5px] text-gray-500 leading-relaxed max-w-sm">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────── DISCOVER TEMPLATES ─────────────── */
import { templates } from "@/data/templates";

function TemplatesSection() {
    return (
        <section className="bg-[#faf9f6]/40 py-24 border-t border-gray-100 antialiased relative z-10">
            <div className="max-w-[1100px] mx-auto px-6">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[34px] font-bold text-gray-900 tracking-tight mb-2 font-serif"
                        >
                            Discover templates
                        </motion.h2>
                        <p className="text-[15px] text-gray-500 font-medium">
                            Start your next project with a handcrafted template
                        </p>
                    </div>

                    {/* Glassmorphic Filters & Actions */}
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2.5 bg-white/40 backdrop-blur-md border border-white/80 rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] w-[240px] transition-all hover:bg-white/60 focus-within:bg-white/80 focus-within:ring-2 focus-within:ring-gray-900/10">
                            <Search className="w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search templates..."
                                className="bg-transparent border-none outline-none w-full text-[13px] text-gray-900 placeholder-gray-400 font-medium"
                            />
                        </div>
                        <Link
                            href="/dashboard"
                            className="px-5 py-2.5 text-[13px] font-semibold text-gray-800 bg-white/40 backdrop-blur-md border border-white/80 rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:bg-white/70 hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all whitespace-nowrap"
                        >
                            View all
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
                    {templates.map((tpl, i) => (
                        <Link href={`/templates/${tpl.slug}`} key={`${tpl.slug}-${i}`} className="block group">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="flex flex-col h-full cursor-pointer"
                            >
                                <div className="relative aspect-[16/10] rounded-[16px] overflow-hidden bg-gray-100 border border-gray-200/50 mb-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] group-hover:-translate-y-1 transition-all duration-500 ease-[0.22,1,0.36,1]">
                                    <Image
                                        src={tpl.image}
                                        alt={tpl.title}
                                        fill
                                        className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-[0.22,1,0.36,1]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                </div>
                                <div className="flex-1 px-1">
                                    <h3 className="text-[15px] font-bold text-gray-900 tracking-tight leading-snug mb-0.5 group-hover:text-blue-600 transition-colors">
                                        {tpl.title}
                                    </h3>
                                    <p className="text-[13px] text-gray-500 font-medium">
                                        {tpl.description}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────── DISCOVER APPS ─────────────── */
const apps = [
    {
        image: "/template-portfolio.png",
        icon: "🎨",
        name: "DesignStack",
        description: "Design system builder",
        likes: 991,
    },
    {
        image: "/template-events.png",
        icon: "📅",
        name: "Attendflow",
        description: "Event marketing made simple",
        likes: 715,
    },
    {
        image: "/template-fashion.png",
        icon: "✨",
        name: "creativable",
        description: "All-in-one CRM, AI Assistant,...",
        likes: 461,
    },
    {
        image: "/template-ecommerce.png",
        icon: "⭕",
        name: "ShopCircle",
        description: "Scale your store.",
        likes: 421,
    },
    {
        image: "/template-ecommerce.png",
        icon: "🔮",
        name: "Flux AI",
        description: "Every successful app starts h...",
        likes: 372,
    },
    {
        image: "/template-fashion.png",
        icon: "🎵",
        name: "VibeBeats AI",
        description: "Adaptive music streaming en...",
        likes: 284,
    },
    {
        image: "/template-events.png",
        icon: "📊",
        name: "Schedra",
        description: "All-in-One Content Creation Pl...",
        likes: 198,
    },
    {
        image: "/template-portfolio.png",
        icon: "🚀",
        name: "Launchspace",
        description: "AI Media Made Simple",
        likes: 164,
    },
];

function AppsSection() {
    return (
        <section className="bg-white py-20 border-t border-gray-100">
            <div className="max-w-[1100px] mx-auto px-6">
                <div className="flex items-start justify-between mb-10">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[36px] font-bold text-gray-900 tracking-tight mb-2"
                        >
                            Discover apps
                        </motion.h2>
                        <p className="text-[15px] text-gray-500">
                            Explore what others are building
                        </p>
                    </div>
                    <Link
                        href="/dashboard"
                        className="px-4 py-2 text-[13px] font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors mt-2"
                    >
                        View all
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {apps.map((app, i) => (
                        <motion.div
                            key={`${app.name}-${i}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-900 border border-gray-100 mb-3 group-hover:shadow-md transition-shadow">
                                <Image
                                    src={app.image}
                                    alt={app.name}
                                    fill
                                    className="object-cover opacity-90 group-hover:scale-[1.02] transition-transform duration-500"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-lg">{app.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-[13.5px] font-semibold text-gray-900">
                                        {app.name}
                                    </h3>
                                    <p className="text-[12px] text-gray-500 truncate">
                                        {app.description}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1 text-gray-400 flex-shrink-0">
                                    <Heart className="w-3.5 h-3.5" />
                                    <span className="text-[12px] font-medium">{app.likes}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────── ANIMATED COUNTER HOOK ─────────────── */
function useCountUp(target, duration = 2000, suffix = "") {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;
        let start = 0;
        const startTime = performance.now();
        const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            setCount(current);
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [hasStarted, target, duration]);

    return { count, ref };
}

function AnimatedStat({ target, suffix, label, decimal, delay }) {
    const { count, ref } = useCountUp(decimal ? target * 10 : target, 2200, suffix);
    const displayValue = decimal ? (count / 10).toFixed(1) : count.toLocaleString();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="glass rounded-2xl p-8 hover:bg-white/10 transition-colors border border-gray-200/50"
        >
            <p className="text-[42px] font-bold text-gray-900 tracking-tight mb-3">
                {displayValue}{suffix}
            </p>
            <p className="text-[14px] text-gray-500">{label}</p>
        </motion.div>
    );
}

/* ─────────────── STATS / NUMBERS ─────────────── */
function StatsSection() {
    return (
        <section className="bg-white pt-20 pb-8 relative z-10 border-b border-transparent">
            <div className="max-w-[1100px] mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[36px] font-bold text-gray-900 tracking-tight mb-2"
                >
                    Struxly in numbers
                </motion.h2>
                <p className="text-[15px] text-gray-500 mb-10">
                    Builders are already turning ideas into reality
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <AnimatedStat target={12} suffix="K+" label="projects built on Struxly" decimal={false} delay={0} />
                    <AnimatedStat target={500} suffix="+" label="new projects every day" decimal={false} delay={0.1} />
                    <AnimatedStat target={1.2} suffix="M" label="monthly visits to Struxly-built apps" decimal={true} delay={0.2} />
                </div>
            </div>
        </section>
    );
}

/* ─────────────── READY TO BUILD CTA ─────────────── */
function ReadyToBuildSection({ onGetStartedClick }) {
    const { isAuthenticated } = useAuth();
    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("struxly_prompt");
        if (saved) setInputValue(saved);
    }, []);

    const handleSubmit = () => {
        if (inputValue.trim()) {
            localStorage.setItem("struxly_prompt", inputValue.trim());
        }
        onGetStartedClick();
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const ctaSuffixes = [
        "create a website for my business",
        "create a dashboard",
        "create a landing page for my startup",
        "change product descriptions",
        "update the hero section",
        "create a blog about tech trends",
        "design a portfolio site",
    ];
    const { displayText } = useTypewriter("Ask Struxly to ", ctaSuffixes);

    const showTypewriter = !inputValue && !isFocused;

    return (
        <section className="relative overflow-hidden z-10 w-full pt-24 pb-20">

            <div className="relative z-10 max-w-[620px] mx-auto px-6 pt-24 pb-44 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[14px] text-gray-500 font-medium mb-3"
                >
                    No More Drag. Just Dialogue.
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-[38px] md:text-[48px] font-bold text-gray-900 tracking-tight leading-[1.1] mb-10"
                >
                    Ready to build?
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="w-full glass-strong rounded-3xl overflow-visible max-w-[520px] mx-auto hover:shadow-2xl hover:shadow-violet-500/10 transition-shadow duration-500"
                >
                    <div className="px-5 pt-4 pb-2 relative text-left">
                        {/* Typewriter overlay */}
                        {showTypewriter && (
                            <div
                                className="absolute inset-0 px-5 pt-4 pb-2 pointer-events-none flex items-start"
                            >
                                <span className="text-black/60 text-[15px] leading-relaxed">
                                    {displayText}
                                    <span className="inline-block w-[2px] h-[18px] bg-gray-400 ml-[1px] align-middle" style={{ animation: "blink 1s step-end infinite" }} />
                                </span>
                            </div>
                        )}
                        <textarea
                            rows={2}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            onKeyDown={handleKeyDown}
                            placeholder=""
                            className="w-full bg-transparent text-gray-900 text-[15px] placeholder-gray-400 resize-none focus:outline-none leading-relaxed relative z-10"
                            style={{ caretColor: inputValue ? undefined : "transparent" }}
                        />
                    </div>
                    <div className="flex items-center justify-between px-4 pb-3">
                        {isAuthenticated ? (
                            <PromptPlusMenu onSelectPrompt={setInputValue} className="relative" />
                        ) : (
                            <LockedFeatureTooltip onSignIn={handleSubmit}>
                                <button className="p-1.5 rounded-lg hover:bg-black/5 text-gray-400 transition-colors">
                                    <Plus className="w-4.5 h-4.5" />
                                </button>
                            </LockedFeatureTooltip>
                        )}
                        <div className="flex items-center gap-2">
                            {isAuthenticated ? (
                                <button className="text-[12.5px] text-gray-400 font-medium hover:text-gray-500 transition-colors cursor-pointer">
                                    Plan
                                </button>
                            ) : (
                                <LockedFeatureTooltip onSignIn={handleSubmit}>
                                    <button className="text-[12.5px] text-gray-400 font-medium hover:text-gray-500 transition-colors cursor-pointer">
                                        Plan
                                    </button>
                                </LockedFeatureTooltip>
                            )}
                            {isAuthenticated ? (
                                <button className="p-1.5 rounded-lg hover:bg-black/5 text-gray-400 transition-colors">
                                    <Mic className="w-4 h-4" />
                                </button>
                            ) : (
                                <LockedFeatureTooltip onSignIn={handleSubmit}>
                                    <button className="p-1.5 rounded-lg hover:bg-black/5 text-gray-400 transition-colors">
                                        <Mic className="w-4 h-4" />
                                    </button>
                                </LockedFeatureTooltip>
                            )}
                            <button
                                onClick={handleSubmit}
                                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${inputValue.trim()
                                    ? "bg-gray-900 text-white hover:bg-black"
                                    : "bg-gray-900 text-white hover:bg-black"
                                    }`}
                            >
                                <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────── FOOTER ─────────────── */
const footerColumns = [
    {
        title: "Product",
        links: [
            { label: "Pricing", href: "/pricing" },
            { label: "Templates", href: "/templates" },
            { label: "Changelog", href: "/changelog" },
            { label: "Status", href: "#" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", href: "/about" },
            { label: "Careers", href: "/careers" },
            { label: "Press & media", href: "#" },
            { label: "Security", href: "#" },
            { label: "Partnerships", href: "#" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Blog", href: "/blog" },
            { label: "Guides", href: "#" },
            { label: "Support", href: "/support" },
            { label: "Documentation", href: "#" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Privacy policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Cookie settings", href: "#" },
        ],
    },
    {
        title: "Community",
        links: [
            { label: "Discord", href: "#" },
            { label: "X / Twitter", href: "#" },
            { label: "YouTube", href: "#" },
            { label: "LinkedIn", href: "#" },
        ],
    },
];

function Footer() {
    return (
        <footer className="relative w-full z-10 pb-10">

            <div className="relative z-10 max-w-[1100px] mx-auto px-6 pt-6 pb-10">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl px-10 py-12 shadow-sm">
                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* Logo */}
                        <div className="flex-shrink-0 lg:pr-8">
                            <div className="flex items-center gap-1">
                                <Image src="/logo-symbol.png" alt="Struxly" width={32} height={32} className="w-8 h-8 object-contain" />
                            </div>
                        </div>

                        {/* Columns */}
                        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
                            {footerColumns.map((col) => (
                                <div key={col.title}>
                                    <h4 className="text-[13px] font-semibold text-gray-900 mb-4">
                                        {col.title}
                                    </h4>
                                    <ul className="space-y-2.5">
                                        {col.links.map((link) => (
                                            <li key={link.label}>
                                                <Link
                                                    href={link.href}
                                                    className="text-[12.5px] text-gray-500 hover:text-gray-900 transition-colors leading-tight"
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom: Language + HQ */}
                    <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
                        <button className="flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-600 transition-colors">
                            <Globe className="w-3.5 h-3.5" />
                            EN
                        </button>
                        <p className="text-[11px] text-gray-300 font-medium">
                            HQ: Guwahati
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* ─────────────── SHARED BOTTOM SECTION ─────────────── */
function BottomSection({ onGetStartedClick }) {
    const mousePos = useMousePosition();

    return (
        <div className="relative w-full overflow-hidden mt-[-2px]">
            {/* Shared Animated CSS gradient mesh background */}
            <div
                className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
                style={{
                    maskImage: "linear-gradient(to bottom, transparent, black 25%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent, black 25%)"
                }}
            >
                <div className="absolute inset-0 z-0 hero-gradient-bg opacity-70" />
                <motion.div
                    className="hero-blob hero-blob-1 opacity-70"
                    animate={{ x: mousePos.x * -40, y: mousePos.y * -40 }}
                    transition={{ type: "spring", stiffness: 30, damping: 20 }}
                />
                <motion.div
                    className="hero-blob hero-blob-2 opacity-70"
                    animate={{ x: mousePos.x * 30, y: mousePos.y * 30 }}
                    transition={{ type: "spring", stiffness: 40, damping: 25 }}
                />
                <motion.div
                    className="hero-blob hero-blob-3 opacity-70"
                    animate={{ x: mousePos.x * -50, y: mousePos.y * -50 }}
                    transition={{ type: "spring", stiffness: 20, damping: 15 }}
                />
                <motion.div
                    className="hero-blob hero-blob-4 opacity-70"
                    animate={{ x: mousePos.x * 20, y: mousePos.y * 20 }}
                    transition={{ type: "spring", stiffness: 50, damping: 30 }}
                />
            </div>

            {/* Content Layers */}
            <div className="relative z-10 w-full flex flex-col items-center pt-10">
                <ReadyToBuildSection onGetStartedClick={onGetStartedClick} />
                <Footer />
            </div>
        </div>
    );
}

/* ─────────────── LOGIN MODAL ─────────────── */
function LoginModal({ isOpen, onClose, initialMode = "login" }) {
    const { signInWithGoogle } = useAuth();
    const router = useRouter();

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-white/20 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        className="relative w-full max-w-[440px] bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col p-8 md:p-10 border border-gray-100"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="mb-8 mt-2">
                            <img src="/logo-symbol.png" alt="Struxly" className="w-8 h-8 object-contain mb-4" />
                            <h2 className="text-[28px] font-bold text-gray-900 tracking-tight leading-tight">
                                Start Building.
                            </h2>
                            <h3 className="text-[28px] font-bold text-gray-400 tracking-tight leading-tight">
                                {initialMode === "signup" ? "Create free account" : "Log in to your account"}
                            </h3>
                        </div>

                        <div className="space-y-3 mb-6">
                            <button
                                onClick={async () => {
                                    try {
                                        await signInWithGoogle();
                                        onClose();
                                        router.push("/portal");
                                    } catch (err) {
                                        console.error(err);
                                    }
                                }}
                                className="w-full border border-gray-200 rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm bg-white relative"
                            >
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
                                <span className="text-[13px] font-medium text-gray-700">Continue with Google</span>
                                {/* Dummy "Last used" pill */}
                                <div className="absolute -top-2 -right-2 bg-indigo-50 text-indigo-500 border border-indigo-200 text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded pointer-events-none shadow-sm">
                                    Last used
                                </div>
                            </button>

                            <button className="w-full border border-gray-200 rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm bg-white">
                                <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" className="w-4 h-4" />
                                <span className="text-[13px] font-medium text-gray-700">Continue with GitHub</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-4 mb-6 pt-1">
                            <div className="h-[1px] bg-gray-100 flex-1"></div>
                            <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">OR</span>
                            <div className="h-[1px] bg-gray-100 flex-1"></div>
                        </div>

                        <button
                            onClick={() => window.location.href = '/login'}
                            className="w-full bg-[#18181b] text-white rounded-lg py-3.5 text-[14px] font-medium hover:bg-black transition-colors shadow-sm cursor-pointer mb-6"
                        >
                            Continue with email
                        </button>

                        {initialMode === "signup" && (
                            <p className="text-[11px] text-gray-500 text-center leading-relaxed">
                                By continuing, you agree to the <a href="/terms" className="underline underline-offset-2 hover:text-gray-800">Terms of Service</a> and <a href="/privacy" className="underline underline-offset-2 hover:text-gray-800">Privacy Policy</a>.
                            </p>
                        )}

                        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center items-center gap-1.5 text-[12px] text-gray-500">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            <span>SSO available on <a href="#" className="underline underline-offset-2 hover:text-gray-800">Business and Enterprise</a> plans</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export default function HomePage() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState("login");

    const openLogin = () => {
        setAuthMode("login");
        setIsAuthModalOpen(true);
    };

    const openSignup = () => {
        setAuthMode("signup");
        setIsAuthModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar onLoginClick={openLogin} onGetStartedClick={openSignup} />
            <HeroSection onGetStartedClick={openSignup} />
            <SocialProofSection />
            <MeetSection />
            <TemplatesSection />
            <AppsSection />
            <StatsSection />
            <BottomSection onGetStartedClick={openSignup} />
            <LoginModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialMode={authMode} />
        </div>
    );
}

