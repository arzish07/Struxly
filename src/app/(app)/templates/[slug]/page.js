"use client";

import { useState, use } from "react";
import { notFound, useRouter } from "next/navigation";
import { templates } from "@/data/templates";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Monitor, Smartphone, Check, Zap, Moon, Image as ImageIcon, ChevronDown, CheckCircle, Globe, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import RemixModal from "@/components/modals/RemixModal";
import TemplatePreviewModal from "@/components/modals/TemplatePreviewModal";

export default function TemplatePage({ params }) {
    const [previewMode, setPreviewMode] = useState("static");
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [showRemixModal, setShowRemixModal] = useState(false);
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    // In Next.js 15 app router, params is a promise
    const resolvedParams = use(params);
    const slug = resolvedParams.slug;
    const template = templates.find((t) => t.slug === slug);

    if (!template) {
        return <div className="min-h-screen flex items-center justify-center text-gray-900 font-medium">Template not found</div>;
    }

    return (
        <div className="min-h-screen bg-[#faf9f6]">
            {/* Fullscreen Preview Modal */}
            <TemplatePreviewModal
                isOpen={showPreviewModal}
                onClose={() => setShowPreviewModal(false)}
                template={template}
                onUseTemplate={() => {
                    setShowPreviewModal(false);
                    if (isAuthenticated) {
                        setShowRemixModal(true);
                    } else {
                        router.push("/login");
                    }
                }}
            />
            {/* Simple Navbar (Simplified for detail page) */}
            <nav className="border-b border-gray-100 bg-white sticky top-0 z-[40]">
                <div className="max-w-[1280px] mx-auto px-6 h-[60px] flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/logo-symbol.png" alt="" className="w-5 h-5 object-contain" />
                        <img src="/logo-word.png" alt="Struxly" className="h-[18px] w-auto object-contain translate-y-[2px]" />
                    </Link>
                    <div className="hidden md:flex gap-6 text-[13px] text-gray-600 font-medium cursor-pointer">
                        <span className="hover:text-gray-900">Solutions <ChevronDown className="w-3.5 h-3.5 inline" /></span>
                        <span className="hover:text-gray-900">Resources <ChevronDown className="w-3.5 h-3.5 inline" /></span>
                        <span className="hover:text-gray-900">Enterprise</span>
                        <span className="hover:text-gray-900">Pricing</span>
                        <span className="hover:text-gray-900">Community</span>
                        <span className="hover:text-gray-900">Security</span>
                    </div>
                    <div className="flex gap-3">
                        {!isAuthenticated && (
                            <>
                                <Link href="/login" className="px-4 py-1.5 text-[13px] font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Log in</Link>
                                <Link href="/login" className="px-4 py-1.5 text-[13px] font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">Get started</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <main className="max-w-[1100px] mx-auto px-6 py-12">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-8">
                    <Link href="/" className="hover:text-gray-900">Templates</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span>{template.category}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-gray-900 font-medium">{template.subcategory}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16 relative items-start">

                    {/* Left Main Content */}
                    <div className="min-w-0">
                        <h1 className="text-[36px] md:text-[42px] font-bold text-gray-900 tracking-tight leading-[1.1] mb-5">
                            {template.fullTitle}
                        </h1>
                        <p className="text-[16px] text-gray-600 leading-relaxed mb-6">
                            {template.fullDescription}
                        </p>
                        <div className="flex items-center gap-2 mb-10 text-[13.5px] font-medium pb-8 border-b border-gray-200">
                            <div className="flex items-center gap-1 shrink-0">
                                <img src="/logo-symbol.png" alt="" className="w-4 h-4 object-contain" />
                                <span className="bg-gradient-to-r from-violet-600 to-orange-400 bg-clip-text text-transparent font-bold">Struxly</span>
                            </div>
                            <span className="text-gray-300">•</span>
                            <span className="text-gray-500">{template.remixes} remixes</span>
                        </div>

                        {/* Preview Image Frame */}
                        <div className="relative w-full aspect-[16/10] bg-gray-100 rounded-2xl overflow-hidden mb-5 border border-gray-200 shadow-sm group transform-gpu">
                            {previewMode === "live" && template.liveUrl && template.liveUrl !== "#" ? (
                                <iframe
                                    src={template.liveUrl}
                                    className="w-full h-full border-none bg-white absolute inset-0 z-10"
                                    title={`${template.title} Live Preview`}
                                />
                            ) : (
                                <>
                                    <Image src={template.image} alt={template.title} fill priority className="object-cover" />
                                    <div className="absolute inset-0 bg-black/10 transition-opacity opacity-0 group-hover:opacity-100 z-10" />
                                </>
                            )}
                        </div>

                        {/* Preview Toggles (Live / Static) */}
                        <div className="flex gap-4 mb-20">
                            {template.liveUrl && template.liveUrl !== "#" && (
                                <button
                                    onClick={() => setPreviewMode("live")}
                                    className={`w - 24 h - [68px] rounded - xl flex flex - col items - center justify - center gap - 1.5 transition - all
                                        ${previewMode === "live"
                                            ? "border-[1.5px] border-gray-900 bg-white shadow-sm ring-2 ring-gray-900/10"
                                            : "border border-gray-200 bg-white/50 text-gray-500 hover:bg-white"
                                        } `}
                                >
                                    <Monitor className={`w - 4.5 h - 4.5 ${previewMode === "live" ? "text-gray-900" : "text-gray-500"} `} />
                                    <span className={`text - [12px] font - semibold ${previewMode === "live" ? "text-gray-900" : "text-gray-500"} `}>Live</span>
                                </button>
                            )}
                            <button
                                onClick={() => setPreviewMode("static")}
                                className={`w - 32 h - [68px] rounded - xl overflow - hidden relative transition - all
                                    ${previewMode === "static" || !template.liveUrl || template.liveUrl === "#"
                                        ? "border-[1.5px] border-gray-900 shadow-sm ring-2 ring-gray-900/10"
                                        : "border border-gray-200 opacity-60 hover:opacity-100"
                                    } `}
                            >
                                <Image src={template.image} alt="Static" fill className="object-cover" />
                            </button>
                        </div>

                        {/* Detailed Content / Blog Format */}
                        <div className="bg-[#f5f3ef] rounded-3xl p-8 md:p-12">
                            <h2 className="text-[22px] font-bold text-gray-900 mb-6 font-serif">About this template</h2>
                            <div className="text-[15px] text-gray-600 leading-[1.8] space-y-6 mb-16 whitespace-pre-wrap">
                                {template.aboutText}
                            </div>

                            <h3 className="text-[18px] font-bold text-gray-900 mb-6 font-serif">Who This Is For</h3>
                            <ul className="list-disc pl-5 space-y-4 text-[15px] text-gray-600 mb-16 leading-[1.7]">
                                {template.whoIsFor?.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>

                            <h3 className="text-[18px] font-bold text-gray-900 mb-8 font-serif">Best Use Cases</h3>
                            <div className="space-y-10 mb-16">
                                {template.useCases?.map((useCase, i) => (
                                    <div key={i}>
                                        <h4 className="text-[15.5px] font-semibold text-gray-900 mb-3">{useCase.title}</h4>
                                        <p className="text-[15px] text-gray-600 leading-[1.7]">{useCase.description}</p>
                                    </div>
                                ))}
                            </div>

                            <h3 className="text-[18px] font-bold text-gray-900 mb-8 font-serif">Getting Started</h3>
                            <div className="space-y-8 mb-16">
                                {template.gettingStarted?.map((step, i) => (
                                    <div key={i}>
                                        <h4 className="text-[15.5px] font-semibold text-gray-900 mb-3">{step.step}</h4>
                                        <p className="text-[15px] text-gray-600 leading-[1.7]">{step.description}</p>
                                    </div>
                                ))}
                            </div>

                            <h3 className="text-[18px] font-bold text-gray-900 mb-6 font-serif">Conclusion</h3>
                            <div className="text-[15px] text-gray-600 leading-[1.8] space-y-6 whitespace-pre-wrap">
                                {template.conclusion}
                            </div>
                        </div>
                    </div>

                    {/* Right Column / Sticky Sidebar */}
                    <div className="lg:sticky lg:top-24 space-y-6">

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowPreviewModal(true)}
                                className="flex-1 py-3 bg-white border border-gray-200 rounded-xl text-[14px] font-semibold text-gray-900 hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                Preview
                            </button>
                            <button
                                onClick={() => {
                                    if (isAuthenticated) {
                                        setShowRemixModal(true);
                                    } else {
                                        router.push("/login");
                                    }
                                }}
                                className="flex-1 py-3 flex items-center justify-center bg-gray-900 rounded-xl text-[14px] font-semibold text-white hover:bg-gray-800 transition-colors shadow-sm block text-center"
                            >
                                Create your own
                            </button>
                        </div>

                        {/* Highlights Panel */}
                        <div className="bg-[#f5f3ef] rounded-2xl p-6 md:p-8">
                            <h3 className="text-[18px] font-bold text-gray-900 mb-8 font-serif">Key Highlights</h3>
                            <div className="space-y-8">
                                {template.highlights?.map((highlight, i) => {
                                    const iconMap = {
                                        "Image": ImageIcon, "Zap": Zap, "Smartphone": Smartphone, "Moon": Moon, "CheckCircle": CheckCircle
                                    };
                                    const IconComponent = iconMap[highlight.icon] || Check;

                                    return (
                                        <div key={i} className="flex gap-4">
                                            <div className="w-9 h-9 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0 text-gray-400 mt-1">
                                                <IconComponent className="w-[18px] h-[18px]" />
                                            </div>
                                            <div>
                                                <h4 className="text-[13.5px] font-bold text-gray-900 mb-1.5">{highlight.title}</h4>
                                                <p className="text-[12.5px] text-gray-500 leading-relaxed">{highlight.description}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Features Panel */}
                        <div className="bg-[#f5f3ef] rounded-2xl p-6 md:p-8">
                            <h3 className="text-[18px] font-bold text-gray-900 mb-4 font-serif">Features & Capabilities</h3>
                            <p className="text-[12.5px] text-gray-500 mb-8 leading-relaxed">Production-ready features built with modern tech stack for exceptional performance and user experience</p>
                            <div className="space-y-0.5">
                                {template.features?.map((feature, i) => (
                                    <div key={i} className="flex items-center justify-between py-3 border-b border-gray-200/50 last:border-0 group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <Check className="w-4 h-4 text-gray-300" />
                                            <span className="text-[13.5px] font-medium text-gray-900">{feature}</span>
                                        </div>
                                        <ChevronDown className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Related Templates Section */}
                <div className="mt-24 pt-16 border-t border-gray-200">
                    <h2 className="text-[22px] font-bold text-gray-900 mb-8">Related Templates</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {templates.filter(t => t.slug !== slug).slice(0, 4).map((tpl, i) => (
                            <Link href={`/ templates / ${tpl.slug} `} key={i} className="group block">
                                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-3 border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                                    <Image src={tpl.image} alt={tpl.title} fill className="object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                                </div>
                                <div className="flex justify-between items-start gap-2">
                                    <div className="min-w-0 pr-2">
                                        <h3 className="text-[14px] font-semibold text-gray-900 leading-tight mb-1 truncate">{tpl.title}</h3>
                                        <p className="text-[12.5px] text-gray-500 truncate">{tpl.description}</p>
                                    </div>
                                    <span className="text-[10px] font-medium text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded flex-shrink-0 mt-0.5">{tpl.category}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            {/* Simple Footer directly below related templates */}
            <footer className="w-full bg-[#f5f3ef] border-t border-gray-200 pt-16 pb-12 mt-12">
                <div className="max-w-[1100px] mx-auto px-6 flex flex-col items-center text-center">
                    <img src="/logo-symbol.png" alt="Struxly" className="w-8 h-8 object-contain mb-8" />

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-10 sm:gap-6 text-left w-full mb-12">
                        <div>
                            <h4 className="text-[12px] font-semibold text-gray-900 mb-4 uppercase tracking-wider">Company</h4>
                            <ul className="space-y-3 text-[13px] text-gray-500 flex flex-col">
                                <Link href="#" className="hover:text-gray-900">Careers</Link>
                                <Link href="#" className="hover:text-gray-900">Security</Link>
                                <Link href="#" className="hover:text-gray-900">Enterprise</Link>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[12px] font-semibold text-gray-900 mb-4 uppercase tracking-wider">Product</h4>
                            <ul className="space-y-3 text-[13px] text-gray-500 flex flex-col">
                                <Link href="#" className="hover:text-gray-900">Pricing</Link>
                                <Link href="#" className="hover:text-gray-900">Changelog</Link>
                                <Link href="#" className="hover:text-gray-900">Status</Link>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[12px] font-semibold text-gray-900 mb-4 uppercase tracking-wider">Resources</h4>
                            <ul className="space-y-3 text-[13px] text-gray-500 flex flex-col">
                                <Link href="#" className="hover:text-gray-900">Templates</Link>
                                <Link href="#" className="hover:text-gray-900">Guides</Link>
                                <Link href="#" className="hover:text-gray-900">Videos</Link>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[12px] font-semibold text-gray-900 mb-4 uppercase tracking-wider">Legal</h4>
                            <ul className="space-y-3 text-[13px] text-gray-500 flex flex-col">
                                <Link href="#" className="hover:text-gray-900">Privacy policy</Link>
                                <Link href="#" className="hover:text-gray-900">Terms of Service</Link>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[12px] font-semibold text-gray-900 mb-4 uppercase tracking-wider">Community</h4>
                            <ul className="space-y-3 text-[13px] text-gray-500 flex flex-col">
                                <Link href="#" className="hover:text-gray-900">Discord</Link>
                                <Link href="#" className="hover:text-gray-900">X / Twitter</Link>
                            </ul>
                        </div>
                    </div>

                    <div className="w-full flex justify-start pt-6 border-t border-gray-200/60">
                        <button className="flex items-center gap-1.5 text-[12px] font-medium text-gray-500 hover:text-gray-700 transition-colors">
                            <Globe className="w-3.5 h-3.5" />
                            EN
                        </button>
                    </div>
                </div>
            </footer>

            {/* Remix Modal Overlay */}
            <RemixModal
                isOpen={showRemixModal}
                onClose={() => setShowRemixModal(false)}
                template={template}
            />
        </div>
    );
}
