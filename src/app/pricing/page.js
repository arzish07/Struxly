"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    Plus, Mic, ArrowUp, ChevronDown, ChevronRight, Lock, Check, ArrowRight, Zap, Globe,
    Sparkles, ImageUp, FileText, Lightbulb, Palette, Upload, Camera, Link2
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
                <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[14px] text-gray-500 font-medium mb-3">
                    No More Drag. Just Dialogue.
                </motion.p>
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-[38px] md:text-[48px] font-bold text-gray-900 tracking-tight leading-[1.1] mb-10">
                    Ready to build?
                </motion.h2>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="w-full glass-strong rounded-3xl overflow-visible max-w-[520px] mx-auto hover:shadow-2xl hover:shadow-violet-500/10 transition-shadow duration-500">
                    <div className="px-5 pt-4 pb-2 relative text-left">
                        {showTypewriter && (
                            <div className="absolute inset-0 px-5 pt-4 pb-2 pointer-events-none flex items-start">
                                <span className="text-black/60 text-[15px] leading-relaxed">
                                    {displayText}
                                    <span className="inline-block w-[2px] h-[18px] bg-gray-400 ml-[1px] align-middle" style={{ animation: "blink 1s step-end infinite" }} />
                                </span>
                            </div>
                        )}
                        <textarea rows={2} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} onKeyDown={handleKeyDown} placeholder="" className="w-full bg-transparent text-gray-900 text-[15px] placeholder-gray-400 resize-none focus:outline-none leading-relaxed relative z-10" style={{ caretColor: inputValue ? undefined : "transparent" }} />
                    </div>
                    <div className="flex items-center justify-between px-4 pb-3">
                        {isAuthenticated ? (
                            <PromptPlusMenu onSelectPrompt={setInputValue} className="relative" />
                        ) : (
                            <LockedFeatureTooltip onSignIn={handleSubmit}>
                                <button className="p-1.5 rounded-lg hover:bg-black/5 text-gray-400 transition-colors"><Plus className="w-4.5 h-4.5" /></button>
                            </LockedFeatureTooltip>
                        )}
                        <div className="flex items-center gap-2">
                            {isAuthenticated ? (
                                <button className="text-[12.5px] text-gray-400 font-medium hover:text-gray-500 transition-colors cursor-pointer">Plan</button>
                            ) : (
                                <LockedFeatureTooltip onSignIn={handleSubmit}>
                                    <button className="text-[12.5px] text-gray-400 font-medium hover:text-gray-500 transition-colors cursor-pointer">Plan</button>
                                </LockedFeatureTooltip>
                            )}
                            {isAuthenticated ? (
                                <button className="p-1.5 rounded-lg hover:bg-black/5 text-gray-400 transition-colors"><Mic className="w-4 h-4" /></button>
                            ) : (
                                <LockedFeatureTooltip onSignIn={handleSubmit}>
                                    <button className="p-1.5 rounded-lg hover:bg-black/5 text-gray-400 transition-colors"><Mic className="w-4 h-4" /></button>
                                </LockedFeatureTooltip>
                            )}
                            <button onClick={handleSubmit} className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-900 text-white hover:bg-black transition-colors"><ArrowUp className="w-3.5 h-3.5" /></button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

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
        return () => { window.removeEventListener("mousemove", handleMouseMove); if (frameId) cancelAnimationFrame(frameId); };
    }, []);

    return (
        <div className="relative w-full overflow-hidden mt-[-2px]">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ maskImage: "linear-gradient(to bottom, transparent, black 25%)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 25%)" }}>
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

/* ─────────────── PLAN DATA ─────────────── */
const plans = [
    { name: "Free", price: "$0", period: "", description: "Get started with the basics.", features: ["1 website", "50 AI edits / month", "Community templates", "Struxly subdomain"], cta: "Get started", popular: false, href: "/login" },
    { name: "Starter", price: "$19", period: "/month", description: "For individuals building real projects.", features: ["3 websites", "300 AI edits / month", "Template Library", "Struxly subdomain", "Priority support"], cta: "Start free trial", popular: false, href: "/login" },
    { name: "Pro", price: "$49", period: "/month", description: "Advanced tools for growing businesses.", features: ["10 websites", "1,200 AI edits / month", "Advanced Templates", "Shopify Export", "Custom Domains", "Analytics Dashboard"], cta: "Start free trial", popular: true, href: "/login" },
    { name: "Studio", price: "$99", period: "/month", description: "Built for teams and agencies.", features: ["Unlimited websites", "4,000 AI edits / month", "Team Workspace", "White-label Export", "Dedicated Support", "All Pro features"], cta: "Contact sales", popular: false, href: "/login" },
];

const faqs = [
    { q: "Can I try Struxly for free?", a: "Yes! Our Free plan includes 1 website and 50 AI edits per month, forever. No credit card required." },
    { q: "How do AI edit credits work?", a: "Each time you prompt the AI to make changes to your site, it uses one edit credit. Credits reset at the beginning of each billing cycle." },
    { q: "Can I upgrade or downgrade my plan?", a: "Absolutely. You can change your plan at any time from your settings. Changes take effect immediately." },
    { q: "What payment methods do you accept?", a: "We accept all major credit cards, debit cards, and PayPal through our secure payment processor Stripe." },
    { q: "What is Shopify Export?", a: "Pro and Studio plans include the ability to export your Struxly-built site as a Shopify theme, ready for deployment on your Shopify store." },
    { q: "Do you offer refunds?", a: "We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied, contact support for a full refund." },
];

export default function PricingPage() {
    const { isAuthenticated, user, signOut } = useAuth();
    const [annual, setAnnual] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

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
                            <Link href="/pricing" className="px-3 py-1.5 text-[13.5px] text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100/60 font-semibold text-gray-900">Pricing</Link>
                            <Link href="/community" className="px-3 py-1.5 text-[13.5px] text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100/60">Community</Link>
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
            <section className="pt-20 pb-6 text-center px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 text-[12px] font-semibold mb-6">
                        <Zap className="w-3.5 h-3.5" /> Simple, transparent pricing
                    </div>
                    <h1 className="text-[42px] font-bold text-gray-900 leading-tight mb-4">Plans that grow with you</h1>
                    <p className="text-[17px] text-gray-500 max-w-[500px] mx-auto mb-8">Start free. Scale as you build. Only pay for what you need.</p>

                    <div className="flex items-center justify-center gap-3 mb-12">
                        <span className={`text-[13px] font-medium ${!annual ? "text-gray-900" : "text-gray-400"}`}>Monthly</span>
                        <button onClick={() => setAnnual(!annual)} className={`w-11 h-6 rounded-full transition-colors relative ${annual ? "bg-gray-900" : "bg-gray-200"}`}>
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${annual ? "translate-x-6" : "translate-x-1"}`} />
                        </button>
                        <span className={`text-[13px] font-medium ${annual ? "text-gray-900" : "text-gray-400"}`}>Annual</span>
                        <span className="text-[11px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Save 20%</span>
                    </div>
                </motion.div>
            </section>

            {/* Plans */}
            <section className="max-w-[1100px] mx-auto px-6 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {plans.map((plan, i) => (
                        <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }} className={`relative rounded-2xl p-6 border transition-shadow hover:shadow-lg ${plan.popular ? "border-gray-900 shadow-md" : "border-gray-200"}`}>
                            {plan.popular && (<div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[11px] font-semibold px-3 py-1 rounded-full">Most popular</div>)}
                            <h3 className="text-[18px] font-bold text-gray-900 mb-1">{plan.name}</h3>
                            <p className="text-[13px] text-gray-500 mb-4">{plan.description}</p>
                            <div className="mb-5">
                                <span className="text-[36px] font-bold text-gray-900">
                                    {annual && plan.price !== "$0" ? `$${Math.round(parseInt(plan.price.replace("$", "")) * 0.8)}` : plan.price}
                                </span>
                                {plan.period && <span className="text-[14px] text-gray-400">{plan.period}</span>}
                            </div>
                            <Link href={plan.href} className={`block w-full text-center py-2.5 rounded-lg text-[13px] font-semibold transition-colors mb-6 ${plan.popular ? "bg-gray-900 text-white hover:bg-gray-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                                {plan.cta}
                            </Link>
                            <ul className="space-y-2.5">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2.5 text-[13px] text-gray-600">
                                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{f}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-[700px] mx-auto px-6 pb-24">
                <h2 className="text-[28px] font-bold text-gray-900 text-center mb-10">Frequently asked questions</h2>
                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left text-[14px] font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                                {faq.q}
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                            </button>
                            {openFaq === i && (<div className="px-5 pb-4 text-[13px] text-gray-500 leading-relaxed">{faq.a}</div>)}
                        </div>
                    ))}
                </div>
            </section>

            {/* Ready to Build CTA — matches homepage */}
            <BottomSection />
        </div>
    );
}
