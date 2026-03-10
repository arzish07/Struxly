"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    MessageSquare, Users, Award, BookOpen, ArrowRight, Heart, ExternalLink,
    Plus, Mic, ArrowUp, ChevronDown, ChevronRight, Sparkles, ImageUp,
    FileText, Lightbulb, Palette, Upload, Camera, Link2, Lock
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { PromptPlusMenu } from "@/components/PromptPlusMenu";
import { UserMenu } from "@/components/UserMenu";

/* ─────────────── NAV DROPDOWN ─────────────── */
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
    const handleEnter = () => { clearTimeout(timeoutRef.current); setOpen(true); };
    const handleLeave = () => { timeoutRef.current = setTimeout(() => setOpen(false), 150); };

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
                            <Link key={item.label} href={item.href} className="block px-4 py-2.5 text-[13.5px] text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
                                {item.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ───────────── LOCKED FEATURE TOOLTIP ───────────── */
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
        setCoords({ top: (position === "top" ? rect.top - 10 : rect.bottom + 10) + window.scrollY, left: rect.left + rect.width / 2 + window.scrollX });
    }, [position]);
    const handleEnter = () => { clearTimeout(timeoutRef.current); updatePosition(); setShow(true); };
    const handleLeave = () => { timeoutRef.current = setTimeout(() => setShow(false), 200); };
    const tooltipContent = show && mounted ? createPortal(
        <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: position === "top" ? 6 : -6, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: position === "top" ? 6 : -6, scale: 0.95 }} transition={{ duration: 0.15 }} style={{ position: "absolute", top: coords.top, left: coords.left, transform: position === "top" ? "translate(-50%, -100%)" : "translate(-50%, 0)", zIndex: 9999 }} className="w-[220px] bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 p-3.5" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                <div className="flex items-start gap-2.5 mb-3">
                    <Lock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-[12.5px] font-semibold text-gray-800 leading-tight mb-0.5">Sign in to unlock</p>
                        <p className="text-[11px] text-gray-400 leading-snug">Access all tools after signing in with your account.</p>
                    </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); onSignIn(); setShow(false); }} className="w-full bg-gray-900 text-white text-[11.5px] font-medium rounded-lg py-2 hover:bg-black transition-colors">Sign in</button>
            </motion.div>
        </AnimatePresence>, document.body
    ) : null;
    return (
        <div className="relative" ref={wrapperRef} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <div onClick={() => { updatePosition(); setShow(!show); }}>{children}</div>
            {tooltipContent}
        </div>
    );
}

/* ─────────────── READY TO BUILD CTA ─────────────── */
function ReadyToBuildSection() {
    const { isAuthenticated } = useAuth();
    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("struxly_prompt");
        if (saved) setInputValue(saved);
    }, []);

    const handleSubmit = () => {
        if (inputValue.trim()) localStorage.setItem("struxly_prompt", inputValue.trim());
        window.location.href = '/login';
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
    };

    const baseText = "Ask Struxly to ";
    const suffixes = [
        "create a website for my business",
        "create a dashboard",
        "create a landing page for my startup",
        "change product descriptions",
        "update the hero section",
        "create a blog about tech trends",
        "design a portfolio site",
    ];
    const [displayText, setDisplayText] = useState("");
    const [suffixIndex, setSuffixIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (inputValue || isFocused) return;
        const currentSuffix = suffixes[suffixIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (charIndex < currentSuffix.length) {
                    setCharIndex((prev) => prev + 1);
                    setDisplayText(baseText + currentSuffix.slice(0, charIndex + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 1200);
                }
            } else {
                if (charIndex > 0) {
                    setCharIndex((prev) => prev - 1);
                    setDisplayText(baseText + currentSuffix.slice(0, charIndex - 1));
                } else {
                    setIsDeleting(false);
                    setSuffixIndex((prev) => (prev + 1) % suffixes.length);
                    setDisplayText(baseText);
                }
            }
        }, isDeleting ? 18 : 35);
        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, suffixIndex, inputValue, isFocused]);

    useEffect(() => { setDisplayText(baseText); }, []);

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
                        {showTypewriter && (
                            <div className="absolute inset-0 px-5 pt-4 pb-2 pointer-events-none flex items-start">
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
                                className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-900 text-white hover:bg-black transition-colors"
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

/* ─────────────── BOTTOM SECTION WITH GRADIENT ─────────────── */
function BottomSection() {
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
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (frameId) cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <div className="relative w-full overflow-hidden mt-[-2px]">
            <div
                className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
                style={{
                    maskImage: "linear-gradient(to bottom, transparent, black 25%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent, black 25%)"
                }}
            >
                <div className="absolute inset-0 z-0 hero-gradient-bg opacity-70" />
                <motion.div className="hero-blob hero-blob-1 opacity-70" animate={{ x: mousePos.x * -40, y: mousePos.y * -40 }} transition={{ type: "spring", stiffness: 30, damping: 20 }} />
                <motion.div className="hero-blob hero-blob-2 opacity-70" animate={{ x: mousePos.x * 30, y: mousePos.y * 30 }} transition={{ type: "spring", stiffness: 40, damping: 25 }} />
                <motion.div className="hero-blob hero-blob-3 opacity-70" animate={{ x: mousePos.x * -50, y: mousePos.y * -50 }} transition={{ type: "spring", stiffness: 20, damping: 15 }} />
                <motion.div className="hero-blob hero-blob-4 opacity-70" animate={{ x: mousePos.x * 20, y: mousePos.y * 20 }} transition={{ type: "spring", stiffness: 50, damping: 30 }} />
            </div>
            <div className="relative z-10 w-full flex flex-col items-center pt-10">
                <ReadyToBuildSection />
                <footer className="relative w-full z-10 pb-10">
                    <div className="relative z-10 max-w-[1100px] mx-auto px-6 pt-6 pb-10">
                        <div className="bg-white/80 backdrop-blur-xl rounded-2xl px-10 py-8">
                            <div className="flex items-center justify-between">
                                <Link href="/" className="flex items-center gap-2">
                                    <img src="/logo-symbol.png" alt="" className="w-5 h-5 object-contain" />
                                    <span className="text-[13px] font-semibold text-gray-900">Struxly</span>
                                </Link>
                                <p className="text-[11px] text-gray-300 font-medium">HQ: Guwahati</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

/* ─────────────── DATA ─────────────── */
const highlights = [
    { icon: Users, title: "10,000+", sub: "Active builders", desc: "Join a thriving community of creators building with AI." },
    { icon: MessageSquare, title: "Discord", sub: "Live chat", desc: "Get help, share tips, and connect with fellow builders." },
    { icon: Award, title: "Expert Program", sub: "For top builders", desc: "Become a certified Struxly expert and get featured." },
    { icon: BookOpen, title: "Resources", sub: "Learn & grow", desc: "Tutorials, guides, and docs to level up your skills." },
];

const showcaseProjects = [
    { name: "SilkHaven", type: "E-commerce", author: "Maria K.", image: "/template-fashion.png" },
    { name: "NexusFlow", type: "SaaS Dashboard", author: "James T.", image: "/template-dashboard.png" },
    { name: "The Estate", type: "Real Estate", author: "Priya S.", image: "/template-realestate.png" },
    { name: "Canvas & Co.", type: "Agency", author: "Liam O.", image: "/template-agency.png" },
];

export default function CommunityPage() {
    const { isAuthenticated, user, signOut } = useAuth();

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-[1200px] mx-auto px-6 h-[60px] flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-3">
                            <img src="/logo-symbol.png" alt="" className="w-5 h-5 object-contain" />
                            <img src="/logo-word.png" alt="Struxly" className="h-[18px] w-auto object-contain" />
                        </Link>
                        <div className="hidden md:flex items-center gap-1">
                            <NavDropdown label="Solutions" items={solutionsLinks} />
                            <NavDropdown label="Resources" items={resourcesLinks} />
                            <Link href="/pricing" className="px-3 py-1.5 text-[13.5px] text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100/60">Pricing</Link>
                            <Link href="/community" className="px-3 py-1.5 text-[13.5px] text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100/60 font-semibold text-gray-900">Community</Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            <UserMenu user={user} onSignOut={signOut} />
                        ) : (
                            <>
                                <Link href="/login" className="px-4 py-2 text-[13px] font-medium text-gray-700 hover:text-gray-900 transition-colors">Log in</Link>
                                <Link href="/login" className="px-4 py-2 text-[13px] font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">Get started</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-20 pb-16 px-6 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 text-violet-600 text-[12px] font-semibold mb-6">
                        <Heart className="w-3.5 h-3.5" /> Built by builders, for builders
                    </div>
                    <h1 className="text-[42px] font-bold text-gray-900 leading-tight mb-4">
                        Join the Struxly Community
                    </h1>
                    <p className="text-[17px] text-gray-500 max-w-[520px] mx-auto mb-8">
                        Connect with thousands of creators, share your projects, get feedback, and learn from the best.
                    </p>
                    <div className="flex items-center justify-center gap-3">
                        <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-[#5865F2] text-white text-[14px] font-semibold rounded-xl hover:bg-[#4752C4] transition-colors">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" /></svg>
                            Join Discord
                        </a>
                        <a href="#" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 text-[14px] font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                            Follow on X
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* Stats */}
            <section className="max-w-[1000px] mx-auto px-6 pb-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {highlights.map((h, i) => (
                        <motion.div
                            key={h.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                            className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                                <h.icon className="w-5 h-5 text-gray-600" />
                            </div>
                            <h3 className="text-[22px] font-bold text-gray-900">{h.title}</h3>
                            <p className="text-[13px] text-gray-400 font-medium mb-2">{h.sub}</p>
                            <p className="text-[13px] text-gray-500 leading-relaxed">{h.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Community Showcase */}
            <section className="max-w-[1000px] mx-auto px-6 pb-24">
                <h2 className="text-[28px] font-bold text-gray-900 text-center mb-3">Community Showcase</h2>
                <p className="text-[15px] text-gray-400 text-center mb-10">See what people are building with Struxly</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {showcaseProjects.map((p, i) => (
                        <motion.div
                            key={p.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                            className="group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-4">
                                <h4 className="text-[14px] font-semibold text-gray-900">{p.name}</h4>
                                <p className="text-[12px] text-gray-400">{p.type} · by {p.author}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Ready to Build CTA — matches homepage */}
            <BottomSection />
        </div>
    );
}
