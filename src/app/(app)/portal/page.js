"use client";

import { useState, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Plus,
    Settings,
    ArrowRight,
    Globe,
    Sparkles,
    ChevronRight,
    Mic,
    Bell,
    Trash2,
    X,
} from "lucide-react";
import { templates } from "@/data/templates";
import RemixModal from "@/components/modals/RemixModal";
import TemplatePreviewModal from "@/components/modals/TemplatePreviewModal";
import { useAuth } from "@/context/AuthContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { useProjects } from "@/context/ProjectContext";
import { useTypewriter } from "@/hooks/useAnimations";
import { getPortalSuggestions } from "@/data/portalSuggestions";
import SuggestionChips from "@/components/canvas/SuggestionChips";
import NotificationBell from "@/components/portal/NotificationBell";
import ProjectPreview from "@/components/portal/ProjectPreview";

const PLACEHOLDER_PROMPTS = [
    "Ask Struxly to create a dashboard to...",
    "Ask Struxly to build a landing page for...",
    "Ask Struxly to create a portfolio that...",
    "Ask Struxly to design an e-commerce store...",
];

// Note: Some imports like AnimatePresence, Mic, etc., will be added in a subsequent tool call to the top of the file.
function PromptBar({ user, addProject }) {
    const router = useRouter();
    const { projects } = useProjects();
    const [inputValue, setInputValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isPlanMode, setIsPlanMode] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const fileInputRef = useRef(null);
    const [attachedImages, setAttachedImages] = useState([]);

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        if (attachedImages.length + files.length > 5) {
            alert("You can only attach up to 5 images.");
            return;
        }

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAttachedImages(prev => [...prev, reader.result]);
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        });

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const removeImage = (index) => {
        setAttachedImages(prev => prev.filter((_, i) => i !== index));
    };

    const toggleRecording = () => {
        if (isRecording) return;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        let finalTranscript = inputValue;
        let silenceTimer;

        const resetSilenceTimer = () => {
            clearTimeout(silenceTimer);
            silenceTimer = setTimeout(() => {
                recognition.stop();
            }, 3000);
        };

        recognition.onstart = () => {
            setIsRecording(true);
            resetSilenceTimer();
        };

        recognition.onresult = (event) => {
            resetSilenceTimer();
            let interimTranscript = '';
            let currentFinal = finalTranscript;

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    currentFinal += event.results[i][0].transcript + ' ';
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            setInputValue(currentFinal + interimTranscript);
            finalTranscript = currentFinal;
        };

        recognition.onerror = () => {
            setIsRecording(false);
            clearTimeout(silenceTimer);
        };

        recognition.onend = () => {
            setIsRecording(false);
            clearTimeout(silenceTimer);
        };

        try {
            recognition.start();
        } catch (e) {
            setIsRecording(false);
        }
    };

    const recentProject = projects?.length > 0 ? [...projects].sort((a, b) => new Date(b.lastEdited) - new Date(a.lastEdited))[0] : null;
    const portalSuggestions = getPortalSuggestions(projects || [], recentProject);

    const handleSend = async () => {
        if ((!inputValue.trim() && attachedImages.length === 0) || isSubmitting) return;
        setIsSubmitting(true);
        const prompt = inputValue.trim() || "Analyze the attached images";

        try {
            // Generate a short name for the project based on the prompt
            const shortName = prompt.length > 25 ? prompt.substring(0, 25) + '...' : prompt;
            const projectName = `App: ${shortName}`;

            const newProject = await addProject({
                name: projectName,
                templateSlug: "default" // or dynamic if needed
            });

            // Save additional context to localStorage so Canvas can pick it up
            localStorage.setItem("struxly_plan_mode", isPlanMode ? "true" : "false");
            if (attachedImages.length > 0) {
                try {
                    localStorage.setItem("struxly_attached_images", JSON.stringify(attachedImages));
                } catch (e) {
                    console.error("Failed to save images to local storage (might be too large):", e);
                }
            } else {
                localStorage.removeItem("struxly_attached_images");
            }

            const params = new URLSearchParams({
                projectId: newProject.id,
                project: newProject.title,
                prompt: prompt,
            });
            router.push(`/canvas?${params.toString()}`);
        } catch (error) {
            console.error("Failed to create project from prompt", error);
            setIsSubmitting(false);
        }
    };

    const portalSuffixes = [
        "create a dashboard...",
        "build a landing page...",
        "design an e-commerce store...",
    ];
    const { displayText } = useTypewriter("Ask Struxly to ", portalSuffixes);

    const showTypewriter = !inputValue && !isFocused;

    return (
        <div className="w-full max-w-[720px] mx-auto px-4 md:px-0">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full glass-strong rounded-3xl overflow-visible max-w-[700px] hover:shadow-2xl hover:shadow-violet-500/10 transition-shadow duration-500 mx-auto bg-white/40 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
            >
                {/* Multi-Image Attachment Preview */}
                <AnimatePresence>
                    {attachedImages.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-5 pt-4 pb-0 overflow-hidden"
                        >
                            <div className="flex items-center gap-2 flex-wrap">
                                {attachedImages.map((img, i) => (
                                    <div key={i} className="relative w-14 h-14 rounded-lg overflow-hidden border border-gray-200 group">
                                        <img src={img} alt={`Attachment ${i + 1}`} className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => removeImage(i)}
                                            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-black transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                                {attachedImages.length < 5 && (
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-14 h-14 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors text-gray-400 hover:text-indigo-500"
                                    >
                                        <span className="text-lg">+</span>
                                    </button>
                                )}
                            </div>
                            <p className="text-[10px] text-gray-400 mt-1.5 px-0.5">{attachedImages.length}/5 images</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="px-5 pt-4 pb-2 relative min-h-[56px] flex items-center">
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
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder=""
                        className="w-full bg-transparent text-gray-900 text-[15px] placeholder-gray-400 resize-none focus:outline-none leading-relaxed relative z-10"
                        style={{ caretColor: inputValue ? undefined : "transparent" }}
                    />
                </div>
                <div className="flex items-center justify-between px-4 pb-3">
                    <div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*,application/pdf"
                            multiple
                            onChange={handleFileUpload}
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="p-1.5 rounded-lg hover:bg-black/5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                        >
                            <Plus className="w-4.5 h-4.5" />
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsPlanMode(!isPlanMode)}
                            className={`text-[12.5px] font-medium transition-colors cursor-pointer mr-1 px-2 py-1 rounded-md ${isPlanMode ? "bg-indigo-50 text-indigo-600" : "text-gray-400 hover:text-gray-600 hover:bg-black/5"
                                }`}
                        >
                            Plan
                        </button>

                        <button
                            onClick={toggleRecording}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${isRecording ? "bg-red-50 text-red-500 animate-pulse" : "text-gray-400 hover:text-gray-600 hover:bg-black/5"
                                }`}
                        >
                            <Mic className="w-4 h-4" />
                        </button>

                        <button
                            onClick={handleSend}
                            disabled={isSubmitting}
                            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${(inputValue.trim() || attachedImages.length > 0) && !isSubmitting
                                ? "bg-black text-white hover:bg-gray-800 cursor-pointer"
                                : "bg-black/5 text-black/40 cursor-not-allowed"
                                }`}
                        >
                            {isSubmitting ? (
                                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <ArrowRight className="w-3.5 h-3.5" />
                            )}
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Contextual Suggestion Chips Below Prompt Bar */}
            <div className="mt-4 flex justify-center w-full max-w-[850px] mx-auto opacity-90 hover:opacity-100 transition-opacity duration-300">
                <SuggestionChips
                    suggestions={portalSuggestions}
                    onSelect={(text) => {
                        setInputValue(text);
                        // Using setTimeout to let state update before sending
                        setTimeout(() => document.querySelector('.bg-black.text-white')?.click(), 50);
                    }}
                />
            </div>
        </div>
    );
}

const formatDate = (date) => {
    if (!date) return "recently";
    if (date instanceof Date) return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    if (typeof date === 'string') return date;
    if (date?.seconds) return new Date(date.seconds * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    return "recently";
};

const ProjectCard = memo(function ProjectCard({ project }) {
    const { removeProject } = useProjects();
    const params = new URLSearchParams({
        projectId: project.id,
        project: project.title,
        template: project.templateSlug || "nexus-flow",
    });
    return (
        <Link href={`/canvas?${params.toString()}`}>
            <motion.div
                whileHover={{ y: -2 }}
                className="rounded-xl border border-gray-200 overflow-hidden bg-white hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer group"
            >
                <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                    {project.image ? (
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : project.currentCode ? (
                        <ProjectPreview code={project.currentCode} />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Globe className="w-8 h-8 text-gray-300" />
                        </div>
                    )}
                    {project.badge && (
                        <span className="absolute bottom-2 left-2 text-[10px] font-semibold bg-green-500 text-white px-2 py-0.5 rounded-md">
                            {project.badge}
                        </span>
                    )}
                </div>
                <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex-shrink-0" />
                        <h4 className="text-sm font-semibold text-gray-900 truncate">{project.title}</h4>
                        <div className="ml-auto flex items-center gap-2">
                            {project.type && (
                                <span className="text-[10px] font-medium bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-md flex-shrink-0">
                                    {project.type}
                                </span>
                            )}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (window.confirm("Are you sure you want to delete this project?")) {
                                        removeProject(project.id);
                                    }
                                }}
                                className="text-gray-300 hover:text-red-500 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <p className="text-[12px] text-gray-400">{project.subtitle || `Edited ${formatDate(project.lastEdited)}`}</p>
                </div>
            </motion.div>
        </Link>
    );
});

const TemplateCard = memo(function TemplateCard({ template, onSelect }) {
    return (
        <motion.div
            onClick={() => onSelect(template)}
            whileHover={{ y: -2 }}
            className="rounded-xl border border-gray-200 overflow-hidden bg-white hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer group"
        >
            <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                <img
                    src={template.image}
                    alt={template.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-4">
                <h4 className="text-sm font-semibold text-gray-900">{template.title}</h4>
                <p className="text-[12px] text-gray-400 mt-0.5">{template.description}</p>
            </div>
        </motion.div>
    );
});

export default function PortalHome() {
    const { user } = useAuth();
    const { projects, addProject } = useProjects();
    const [activeTab, setActiveTab] = useState("templates");
    const [previewingTemplate, setPreviewingTemplate] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [mounted, setMounted] = useState(false);

    // Exact Homepage Hero Texts & Tracking - Optimized with Motion Values to prevent re-renders
    const words = ["Drag", "Guesswork", "Complexity"];
    const [currentWord, setCurrentWord] = useState(0);

    // Using useMotionValue + useSpring instead of React state for mouse movement
    // This allows background animations to run at 60fps without triggering any React re-renders of the component tree
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 50, damping: 20 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // For other blobs (moving hooks to top level to fix Rules of Hooks error)
    const blob2X = useSpring(useMotionValue(0), { ...springConfig, stiffness: 40 });
    const blob2Y = useSpring(useMotionValue(0), { ...springConfig, stiffness: 40 });
    const blob3X = useSpring(useMotionValue(0), { ...springConfig, stiffness: 60 });
    const blob3Y = useSpring(useMotionValue(0), { ...springConfig, stiffness: 60 });

    useEffect(() => {
        setMounted(true);

        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 3000);

        const handleMouseMove = (e) => {
            // Set motion values directly - does NOT trigger re-render
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            mouseX.set(x);
            mouseY.set(y);
            // We can also make other blobs subtlely follow or stay static
        };
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            clearInterval(interval);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY]);

    const displayName = user?.displayName?.split(" ")[0] || "there";

    const myProjects = projects || [];

    const tabs = [
        { id: "recent", label: "Recently viewed" },
        { id: "projects", label: "My projects" },
        { id: "templates", label: "Templates" },
    ];

    if (!mounted) return <div className="h-full bg-white" />;

    return (
        <div className="h-full overflow-y-auto">
            {/* Gradient Hero - Full height, extending behind tabs exactly like homepage */}
            <div className="relative w-full min-h-screen py-10 flex flex-col items-center justify-center overflow-hidden">

                {/* Smart Notification Bell */}
                <div className="absolute top-6 right-6 z-[100]">
                    <NotificationBell />
                </div>

                {/* Animated CSS gradient mesh background matching homepage exactly */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 z-0 hero-gradient-bg" />
                    <motion.div
                        className="hero-blob hero-blob-1"
                        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%", scale: 1.2 }}
                    // Using style property with motion values instead of animate prop prevents re-renders
                    />
                    <motion.div
                        className="hero-blob hero-blob-2"
                        style={{
                            x: blob2X,
                            y: blob2Y,
                            translateX: "20%", translateY: "-20%"
                        }}
                    />
                    <motion.div
                        className="hero-blob hero-blob-3"
                        style={{
                            x: blob3X,
                            y: blob3Y,
                            translateX: "-30%", translateY: "30%"
                        }}
                    />
                </div>

                <div className="relative z-10 w-full max-w-[720px] mx-auto px-6 pb-[200px] flex flex-col items-center justify-center min-h-[80vh] text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[38px] md:text-[48px] lg:text-[56px] font-semibold text-gray-900 leading-[1.08] mt-6 mb-4"
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
                        className="w-full relative z-30"
                    >
                        <PromptBar user={user} addProject={addProject} />
                    </motion.div>
                </div>
            </div>

            {/* Tabbed Content - Floating up over the hero gradient */}
            <div className="relative z-30 -mt-[200px] mx-4 md:mx-8 lg:mx-12 mb-12">
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden min-h-[500px]">
                    {/* Tab Bar */}
                    <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100/50">
                        <div className="flex items-center gap-4 sm:gap-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-5 py-2 text-[14px] font-semibold rounded-full transition-all duration-200 ${activeTab === tab.id
                                        ? "text-gray-900 bg-gray-100 shadow-sm"
                                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <Link
                            href="/portal"
                            className="flex items-center gap-1 text-[13px] font-medium text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            Browse all <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {/* Content */}
                    <div className="px-6 pb-8">
                        {activeTab === "templates" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                {templates.map((t) => (
                                    <TemplateCard key={t.slug} template={t} onSelect={setPreviewingTemplate} />
                                ))}
                            </div>
                        )}

                        {activeTab === "projects" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                {myProjects.length === 0 ? (
                                    <div className="col-span-full py-12 text-center">
                                        <p className="text-gray-500 text-[14px]">No projects yet. Browse templates to get started.</p>
                                    </div>
                                ) : (
                                    myProjects.map((p) => (
                                        <ProjectCard key={p.id} project={p} />
                                    ))
                                )}
                            </div>
                        )}

                        {activeTab === "recent" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                {myProjects.length === 0 ? (
                                    <div className="col-span-full py-12 text-center">
                                        <p className="text-gray-500 text-[14px]">No recently viewed projects.</p>
                                    </div>
                                ) : (
                                    myProjects.slice(0, 4).map((p) => (
                                        <ProjectCard key={p.id} project={p} />
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Spacer */}
            <div className="h-12" />

            {/* Template Preview Overlay */}
            <TemplatePreviewModal
                isOpen={!!previewingTemplate}
                onClose={() => setPreviewingTemplate(null)}
                template={previewingTemplate}
                onUseTemplate={() => {
                    setPreviewingTemplate(null);
                    setSelectedTemplate(previewingTemplate);
                }}
            />

            {/* Remix Modal Overlay */}
            <RemixModal
                isOpen={!!selectedTemplate}
                onClose={() => setSelectedTemplate(null)}
                template={selectedTemplate}
            />
        </div>
    );
}
