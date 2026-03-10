"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Send,
    X,
    Sparkles,
    MousePointerClick,
    Bot,
    User,
    AlertCircle,
    ChevronLeft,
    ChevronDown,
    ChevronRight,
    Monitor,
    Smartphone,
    Mic,
    Paperclip,
    ArrowRight,
    ListOrdered,
    Trash2,
    FileCode,
    Eye,
    Code,
    Loader2,
    Undo2,
} from "lucide-react";
import { useCanvas } from "@/context/CanvasContext";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useProjects } from "@/context/ProjectContext";
import SuggestionChips from "./SuggestionChips";
import OnboardingQuestions from "./OnboardingQuestions";
import BuildProgress from "./BuildProgress";
import { consumeCredits } from "@/lib/credits/consumption";
import { useAuth } from "@/context/AuthContext";
import { TopUpModal } from "@/components/pricing/TopUpModal";

const mockResponses = [
    "I've updated the styling. The changes are now live on the canvas.",
    "Done! I've applied a bolder, more editorial look to that section.",
    "Great choice! I've adjusted the typography and spacing to feel more premium.",
    "I've swapped the layout to a 3-column grid with modern card styling.",
    "Applied! The section now has a sleek glassmorphism background with subtle animation.",
    "I've updated the button styling — it now has a gradient hover effect.",
];

const GENERATION_STATUSES = [
    "Analyzing requirements...",
    "Drafting component structure...",
    "Writing JSX markup...",
    "Applying modern styling...",
    "Adding interactions & animations...",
    "Finalizing code..."
];

const INTENT_STATUSES = [
    "Analyzing intent...",
    "Checking framework...",
    "Loading context..."
];

// Lovable-style Action Block — shows live progress, then becomes a permanent card
function ActionBlock({ isActive, isIntentPhase, promptText, completedMessage, onToggleDetails, onUndo, canUndo }) {
    const statuses = isIntentPhase ? INTENT_STATUSES : GENERATION_STATUSES;
    const [statusIndex, setStatusIndex] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const [activeTab, setActiveTab] = useState('preview'); // 'details' | 'preview'

    useEffect(() => {
        if (!isActive) return;
        setStatusIndex(0);
        const interval = setInterval(() => {
            setStatusIndex(prev => Math.min(prev + 1, statuses.length - 1));
        }, isIntentPhase ? 1500 : 2500);
        return () => clearInterval(interval);
    }, [isActive, isIntentPhase, statuses.length]);

    // ACTIVE / GENERATING state
    if (isActive) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 w-full max-w-[95%]"
            >
                <div className="w-7 h-7 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <img src="/logo-symbol.png" alt="AI" className="w-[14px] h-[14px] object-contain opacity-90" />
                </div>
                <div className="flex-1 max-w-[85%]">
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm shadow-sm overflow-hidden">
                        {/* File being edited */}
                        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-50">
                            <Loader2 className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
                            <span className="text-[12px] font-semibold text-gray-800">Editing</span>
                            <span className="text-[12px] font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">App.jsx</span>
                        </div>
                        {/* Live cycling status */}
                        <div className="px-4 py-3">
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key={statusIndex}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="flex gap-1 items-center">
                                        <motion.div className="w-1 h-1 bg-indigo-400 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0 }} />
                                        <motion.div className="w-1 h-1 bg-indigo-400 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }} />
                                        <motion.div className="w-1 h-1 bg-indigo-400 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }} />
                                    </div>
                                    <span className="text-[13px] text-gray-500 font-medium">
                                        {statuses[statusIndex]}
                                    </span>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    // COMPLETED state — permanent card
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 w-full max-w-[95%]"
        >
            <div className="w-7 h-7 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                <img src="/logo-symbol.png" alt="AI" className="w-[14px] h-[14px] object-contain opacity-90" />
            </div>
            <div className="flex-1 max-w-[85%]">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm shadow-sm overflow-hidden">
                    {/* Clickable header — shows file edited + chevron */}
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-50/50 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <FileCode className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-[12px] font-semibold text-gray-800">Edited</span>
                            <span className="text-[12px] font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">App.jsx</span>
                        </div>
                        <div className="flex items-center gap-1">
                            {canUndo && onUndo && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); onUndo(); }}
                                    className="p-1 rounded-md hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-colors"
                                    title="Undo to previous version"
                                >
                                    <Undo2 className="w-3.5 h-3.5" />
                                </button>
                            )}
                            <ChevronRight className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${showDetails ? 'rotate-90' : ''}`} />
                        </div>
                    </button>

                    {/* Expandable details panel */}
                    <AnimatePresence>
                        {showDetails && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden border-t border-gray-50"
                            >
                                {/* Tab bar */}
                                <div className="flex border-b border-gray-100">
                                    <button
                                        onClick={() => setActiveTab('details')}
                                        className={`flex-1 px-4 py-2 text-[12px] font-medium transition-colors ${activeTab === 'details'
                                            ? 'text-indigo-600 border-b-2 border-indigo-500 bg-indigo-50/30'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        Details
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('preview')}
                                        className={`flex-1 px-4 py-2 text-[12px] font-medium transition-colors ${activeTab === 'preview'
                                            ? 'text-indigo-600 border-b-2 border-indigo-500 bg-indigo-50/30'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        Preview
                                    </button>
                                </div>
                                {/* Tab content */}
                                <div className="px-4 py-3">
                                    {activeTab === 'details' ? (
                                        <p className="text-[12px] text-gray-600 leading-relaxed">
                                            {completedMessage || "Code has been updated successfully."}
                                        </p>
                                    ) : (
                                        <p className="text-[12px] text-gray-500 italic">
                                            Preview is showing on the canvas →
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Summary line when collapsed */}
                    {!showDetails && completedMessage && (
                        <div className="px-4 pb-2.5">
                            <p className="text-[13px] text-gray-500 truncate">
                                {completedMessage.length > 80 ? completedMessage.substring(0, 80) + '...' : completedMessage}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function DialogueBoxContent() {
    const {
        chatMessages,
        selectedElement,
        addMessage,
        deselectElement,
        setGeneratedCode,
        generatedCode,
        inspectorActive,
        toggleInspector,
        projectId,
        suggestions,
        setSuggestions,
        setIsAwaitingInstructions,
        setIsGenerating,
        isGenerating,
        promptQueue,
        addToQueue,
        removeFromQueue,
        shiftQueue,
        undoCode,
        canUndo,
    } = useCanvas();
    const { user, profile: userData } = useAuth();
    const { touchProject, updateProjectDetails, projects } = useProjects();
    const searchParams = useSearchParams();

    // Prioritize Live Context title, fallback to URL
    const currentProject = projects.find(p => p.id === projectId);
    const projectName = currentProject?.title || searchParams.get('project') || "Project";

    const [isEditingProjectName, setIsEditingProjectName] = useState(false);
    const [editProjectName, setEditProjectName] = useState(projectName);

    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isPlanMode, setIsPlanMode] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [attachedImages, setAttachedImages] = useState([]);
    const [codeAnalysis, setCodeAnalysis] = useState(null);
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);

    // Smart Onboarding States
    const [activeIntent, setActiveIntent] = useState(null);
    const [isDetectingIntent, setIsDetectingIntent] = useState(false);
    const [loadingSteps, setLoadingSteps] = useState(null);
    const [completedSteps, setCompletedSteps] = useState(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const menuRef = useRef(null);
    const recognitionRef = useRef(null);
    const fileInputRef = useRef(null);
    const initialPromptHandled = useRef(false);
    const prevIsGeneratingRef = useRef(false);
    const router = useRouter();

    // Click outside to close menu
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Get current formatted date like "Mar 7 at 1:58 AM"
    const [currentTime, setCurrentTime] = useState("");
    useEffect(() => {
        const now = new Date();
        setCurrentTime(now.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }));
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    // Auto-focus input when an element is selected via the inspector
    useEffect(() => {
        if (selectedElement && inputRef.current) {
            inputRef.current.focus();
        }
    }, [selectedElement]);

    // Initialize Speech Recognition — continuous mode with interim results
    useEffect(() => {
        if (typeof window !== "undefined") {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = 'en-US';

                let finalTranscript = '';
                let silenceTimer = null;

                recognition.onresult = (event) => {
                    let interim = '';
                    finalTranscript = '';
                    for (let i = 0; i < event.results.length; i++) {
                        const result = event.results[i];
                        if (result.isFinal) {
                            finalTranscript += result[0].transcript + ' ';
                        } else {
                            interim += result[0].transcript;
                        }
                    }
                    setInput(finalTranscript + interim);

                    // Reset auto-stop timer on every new result
                    if (silenceTimer) clearTimeout(silenceTimer);
                    silenceTimer = setTimeout(() => {
                        recognition.stop();
                    }, 3000); // Auto-stop after 3s of silence
                };

                recognition.onend = () => {
                    setIsRecording(false);
                    if (silenceTimer) clearTimeout(silenceTimer);
                };

                recognition.onerror = (event) => {
                    console.warn('Speech recognition error:', event.error);
                    if (event.error !== 'no-speech') {
                        setIsRecording(false);
                    }
                };

                recognitionRef.current = recognition;
            }
        }
    }, []);

    const toggleRecording = () => {
        if (isRecording) {
            recognitionRef.current?.stop();
            setIsRecording(false);
        } else {
            recognitionRef.current?.start();
            setIsRecording(true);
        }
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        const remaining = 5 - attachedImages.length;
        const toProcess = files.slice(0, remaining);

        toProcess.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAttachedImages(prev => {
                    if (prev.length >= 5) return prev;
                    return [...prev, reader.result];
                });
            };
            reader.readAsDataURL(file);
        });

        // Reset input so the same files can be re-selected
        e.target.value = '';
    };

    const removeImage = (index) => {
        setAttachedImages(prev => prev.filter((_, i) => i !== index));
    };

    // Handle initial prompt from Dashboard
    useEffect(() => {
        const initialPrompt = searchParams.get('prompt');
        if (initialPrompt && !initialPromptHandled.current) {
            initialPromptHandled.current = true;

            // Read any passed context from Dashboard
            let initImages = [];
            let initPlanMode = false;
            try {
                if (localStorage.getItem("struxly_plan_mode") === "true") {
                    initPlanMode = true;
                    setIsPlanMode(true);
                }
                const storedImages = localStorage.getItem("struxly_attached_images");
                if (storedImages) {
                    initImages = JSON.parse(storedImages);
                    setAttachedImages(initImages);
                }
            } catch (e) {
                console.error("Failed to parse initial context:", e);
            }

            // Clean the URL without causing a full reload
            const newParams = new URLSearchParams(window.location.search);
            newParams.delete('prompt');
            const newUrl = `${window.location.pathname}?${newParams.toString()}`;
            router.replace(newUrl, { scroll: false });

            // Execute the send logic with the initial prompt & context
            handlePromptText(initialPrompt, initImages, initPlanMode);

            // Cleanup local storage
            localStorage.removeItem("struxly_plan_mode");
            localStorage.removeItem("struxly_attached_images");
        }
    }, [searchParams, chatMessages.length, router]);

    // Touch project on mount to update last opened (fire only once)
    const touchedRef = useRef(false);
    useEffect(() => {
        if (projectId && !touchedRef.current) {
            touchedRef.current = true;
            touchProject(projectId);
        }
    }, [projectId, touchProject]);

    const handlePromptText = async (promptText, passedImages = null, passedPlanMode = null) => {
        // Show the beautiful loading carousel instantly for new projects before any async work starts
        if (!generatedCode) {
            setIsAwaitingInstructions(true);
        }

        const imagesToUse = passedImages !== null ? passedImages : attachedImages;
        const planModeToUse = passedPlanMode !== null ? passedPlanMode : isPlanMode;

        // Only run intent detection if it's the first real message
        if (!activeIntent && chatMessages.length <= 2) {
            setIsDetectingIntent(true);

            // Optimistically add user message
            addMessage({
                id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                role: "user",
                content: promptText,
                images: imagesToUse.length > 0 ? [...imagesToUse] : undefined,
            });

            try {
                const response = await fetch('/api/intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: promptText })
                });

                if (!response.ok) throw new Error("Intent API failed");

                const data = await response.json();

                if (data.requiresQuestions && data.intent) {
                    setActiveIntent({
                        ...data.intent,
                        originalPrompt: promptText,
                        initialImages: imagesToUse,
                        initialPlanMode: planModeToUse
                    });
                    setSuggestions([]);
                    setIsAwaitingInstructions(true);
                } else {
                    // Fallthrough to standard generation without bypassing the optimistic message
                    executeSend(promptText, true, null, imagesToUse, planModeToUse);
                }
            } catch (err) {
                console.error("Failed to detect intent dynamically:", err);
                // Fallback to building directly
                executeSend(promptText, true, null, imagesToUse, planModeToUse);
            } finally {
                setIsDetectingIntent(false);
            }
        } else {
            // Standard follow-up turn
            executeSend(promptText, false, null, imagesToUse, planModeToUse);
        }
    };

    const handleSend = () => {
        if (!input.trim()) return;
        const promptText = input.trim();
        setInput("");

        // If AI is currently busy, queue the prompt instead of executing
        if (isGenerating) {
            addToQueue(promptText);
            // Still show user message bubble so it feels responsive
            addMessage({
                id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                role: "user",
                content: promptText,
            });
            return;
        }

        handlePromptText(promptText);

        // Auto-deselect any selected element after sending so next prompt starts fresh
        if (selectedElement) {
            deselectElement();
        }
    };

    // Queue Processor: auto-execute next queued prompt when AI becomes idle
    useEffect(() => {
        const wasGenerating = prevIsGeneratingRef.current;
        prevIsGeneratingRef.current = isGenerating;

        // Only trigger on true→false transition (AI just finished)
        if (wasGenerating && !isGenerating && promptQueue.length > 0) {
            const next = shiftQueue();
            if (next) {
                // Small delay so the user can see the result before next starts
                setTimeout(() => {
                    handlePromptText(next.text);
                }, 800);
            }
        }
    }, [isGenerating, promptQueue.length]);

    const handleQuestionsComplete = (answers) => {
        let enrichedPrompt = `${activeIntent.originalPrompt}\n\nAdditional Requirements:\n`;
        for (const [question, answer] of Object.entries(answers)) {
            enrichedPrompt += `- ${question}: ${answer}\n`;
        }

        setLoadingSteps(activeIntent.buildSteps);
        const currentSteps = activeIntent.buildSteps;
        const imagesToUse = activeIntent.initialImages || null;
        const planModeToUse = activeIntent.initialPlanMode !== undefined ? activeIntent.initialPlanMode : null;
        setActiveIntent(null);
        executeSend(enrichedPrompt, true, currentSteps, imagesToUse, planModeToUse);
    };

    const handleQuestionsSkip = () => {
        setLoadingSteps(activeIntent.buildSteps);
        const original = activeIntent.originalPrompt;
        const currentSteps = activeIntent.buildSteps;
        const imagesToUse = activeIntent.initialImages || null;
        const planModeToUse = activeIntent.initialPlanMode !== undefined ? activeIntent.initialPlanMode : null;
        setActiveIntent(null);
        executeSend(original, true, currentSteps, imagesToUse, planModeToUse);
    };

    const executeSend = async (promptText, skipUserMessage = false, currentLoadingSteps = null, passedImages = null, passedPlanMode = null) => {
        const imagesToProcess = passedImages !== null ? [...passedImages] : [...attachedImages];
        const planModeToProcess = passedPlanMode !== null ? passedPlanMode : isPlanMode;

        if (!skipUserMessage) {
            const userMessage = {
                id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                role: "user",
                content: promptText,
                images: imagesToProcess.length > 0 ? [...imagesToProcess] : undefined,
            };
            addMessage(userMessage);
        }

        setInput("");
        if (passedImages === null) setAttachedImages([]);
        setIsGenerating(true);
        setIsTyping(true);
        setSuggestions([]); // Clear previous suggestions when user types
        setCompletedSteps(null); // Clear previous build steps

        // Inject a live ActionBlock message into the chat — but only for follow-up edits (not the first build)
        const genMsgId = `gen-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        if (generatedCode) {
            addMessage({
                id: genMsgId,
                role: "generation",
                content: promptText,
            });
        }

        // Show the beautiful loading carousel if this is the very first generation (no code yet)
        if (!generatedCode) {
            setIsAwaitingInstructions(true);
        }

        try {
            // Construct history from local client state
            let historyContext = "";
            if (chatMessages && chatMessages.length > 0) {
                const recentHistory = chatMessages.slice(-5).map(msg =>
                    `${msg.role.toUpperCase()}: ${msg.content}`
                ).join("\n");
                historyContext = `\n\nPREVIOUS CONVERSATION HISTORY (Last 5 messages):\n${recentHistory}`;
            }

            // Deduct 1 credit for the generation (tweak/gen)
            if (user?.uid) {
                const consumptionResult = await consumeCredits(user.uid, planModeToProcess ? 'new_page' : 'tweak');

                if (!consumptionResult.success) {
                    throw new Error(
                        consumptionResult.error === 'INSUFFICIENT_CREDITS'
                            ? "INSUFFICIENT_CREDITS"
                            : consumptionResult.error || "CREDIT_ERROR"
                    );
                }
            }

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: promptText,
                    currentCode: generatedCode,
                    selectedElement: selectedElement ? {
                        label: selectedElement.label,
                        id: selectedElement.id
                    } : null,
                    projectId,
                    historyContext,
                    isPlanMode: planModeToProcess,
                    attachedImages: imagesToProcess,
                    userId: user?.uid
                })
            });

            if (!response.ok) {
                let errorText = 'Failed to generate code';
                try {
                    const errJson = await response.json();
                    errorText = errJson.error?.message || errJson.error || JSON.stringify(errJson) || errorText;
                } catch (e) {
                    // ignore parse error
                }
                throw new Error(errorText);
            }

            const data = await response.json();

            // Convert the live ActionBlock into a completed card with the AI message
            // For the first build, add as a regular assistant message (no ActionBlock was shown)
            const wasFirstBuild = !generatedCode;
            addMessage({
                id: genMsgId,
                role: wasFirstBuild ? "assistant" : "generation_complete",
                content: data.message || "Code updated successfully.",
            });

            // Silently update the code if provided
            if (data.code) {
                setGeneratedCode(data.code);
            }

            // Set AI suggestions if any
            if (data.suggestions && Array.isArray(data.suggestions)) {
                setSuggestions(data.suggestions);
            }

            // Save code analysis for smart UI chips
            if (data.codeAnalysis) {
                setCodeAnalysis(data.codeAnalysis);
            }

            // If we are in plan mode, we might want to attach a Proceed button to the message
            if (isPlanMode && data.message) {
                addMessage({
                    id: `msg-${Date.now()}-plan-action`,
                    role: "action",
                    content: "plan_ready",
                    originalPrompt: promptText
                });
            }
        } catch (err) {
            console.error("Canvas Generation Error:", err);

            let errorMessage = `Error: ${err.message || 'Unknown'}. Please try again.`;
            if (err.message === "INSUFFICIENT_CREDITS") {
                errorMessage = "You have run out of Cloud + AI credits. Please upgrade your plan or top up to continue building.";
            }

            // Remove the generation block and show an error instead
            addMessage({
                id: genMsgId,
                role: "generation_complete",
                content: errorMessage,
            });

            addMessage({
                id: `msg-${Date.now()}-err`,
                role: "system",
                content: errorMessage,
            });
        } finally {
            setIsGenerating(false);
            setIsTyping(false);
            if (currentLoadingSteps || loadingSteps) {
                setCompletedSteps(currentLoadingSteps || loadingSteps);
                setLoadingSteps(null);
            }
            setIsAwaitingInstructions(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-transparent theme-lockdown-light">
            <div className="p-4 border-b border-gray-100/50 bg-white/40 backdrop-blur-md shrink-0 relative" style={{ zIndex: 999 }}>
                <div ref={menuRef}>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="w-full text-left rounded-xl hover:bg-gray-100/60 transition-all p-1.5 flex items-center gap-3 group cursor-pointer"
                    >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm overflow-hidden border border-gray-100 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                            <img src="/logo-symbol.png" alt="Struxly" className="w-5 h-5 object-contain opacity-90" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                                {isEditingProjectName ? (
                                    <input
                                        type="text"
                                        autoFocus
                                        className="text-[14px] font-bold text-gray-900 leading-tight bg-transparent focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded -mx-1 px-1 min-w-[50px]"
                                        value={editProjectName}
                                        onChange={(e) => setEditProjectName(e.target.value)}
                                        onBlur={(e) => {
                                            setIsEditingProjectName(false);
                                            e.stopPropagation();
                                            if (editProjectName.trim() !== projectName && editProjectName.trim() !== '') {
                                                updateProjectDetails(projectId, { title: editProjectName.trim() });
                                            } else {
                                                setEditProjectName(projectName);
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.target.blur();
                                            } else if (e.key === 'Escape') {
                                                setEditProjectName(projectName);
                                                setIsEditingProjectName(false);
                                            }
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        style={{ width: `${Math.max(editProjectName.length, 5)}ch` }}
                                    />
                                ) : (
                                    <h1
                                        className="text-[14px] font-bold text-gray-900 leading-tight truncate hover:text-indigo-600 transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditProjectName(projectName);
                                            setIsEditingProjectName(true);
                                            setMenuOpen(false);
                                        }}
                                        title="Click to rename"
                                    >
                                        {projectName}
                                    </h1>
                                )}
                                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-all ${menuOpen ? 'rotate-180' : ''}`} />
                            </div>
                            <p className="text-[11px] text-gray-400 font-medium leading-tight mt-0.5">
                                Previewing last saved version
                            </p>
                        </div>
                    </button>

                    {/* Project Dropdown Menu */}
                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                                transition={{ duration: 0.12, ease: "easeOut" }}
                                className="absolute top-[60px] left-2 right-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
                                style={{ zIndex: 9999 }}
                            >
                                <div className="py-1.5 px-1.5">
                                    {/* Go to Dashboard */}
                                    <Link
                                        href="/portal"
                                        className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4" /> Go to Dashboard
                                    </Link>

                                    <div className="h-px bg-gray-100 my-1.5 mx-1" />

                                    {/* Plan Info */}
                                    <div className="px-3 py-2.5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center">
                                                <span className="text-white text-[9px] font-bold">{user?.displayName ? user.displayName[0].toUpperCase() : 'U'}</span>
                                            </div>
                                            <span className="text-[13px] font-medium text-gray-900">{user?.displayName ? user.displayName.split(' ')[0] : 'User'}&apos;s Struxly</span>
                                            <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded ml-auto">free</span>
                                        </div>
                                        {(() => {
                                            const credits = userData?.editCredits || 0;
                                            const percentage = Math.min(100, Math.max(0, (credits / 50) * 100));
                                            const bgColor = credits < 10 ? 'bg-red-500' : credits < 25 ? 'bg-amber-500' : 'bg-indigo-500';
                                            const groupHoverBgColor = credits < 10 ? 'group-hover:bg-red-600' : credits < 25 ? 'group-hover:bg-amber-600' : 'group-hover:bg-indigo-600';

                                            return (
                                                <div
                                                    onClick={() => {
                                                        setMenuOpen(false);
                                                        router.push("/portal/settings/plans");
                                                    }}
                                                    className="cursor-pointer group hover:bg-gray-50 -mx-1 px-1 py-1.5 rounded-lg transition-colors"
                                                >
                                                    <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1.5 group-hover:text-gray-900 transition-colors">
                                                        <span>Credits</span>
                                                        <span className="font-medium">{credits} left &lsaquo;</span>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full transition-all duration-500 ease-out ${bgColor} ${groupHoverBgColor}`}
                                                            style={{ width: `${percentage}%` }}
                                                        />
                                                    </div>
                                                    <p className="text-[10px] text-gray-400 mt-1.5">● Credits renew automatically every month</p>
                                                </div>
                                            );
                                        })()}
                                    </div>

                                    <div className="h-px bg-gray-100 my-1 mx-1" />

                                    {/* Actions */}
                                    <Link href="#" className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg transition-colors">
                                        <Sparkles className="w-4 h-4" /> Get free credits
                                    </Link>

                                    <div className="h-px bg-gray-100 my-1 mx-1" />

                                    <button onClick={() => router.push("/portal/settings")} className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                                        Settings
                                    </button>
                                    <button onClick={() => alert("Remix functionality coming soon!")} className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                        Remix this project
                                    </button>
                                    <button
                                        onClick={() => {
                                            setMenuOpen(false);
                                            setEditProjectName(projectName);
                                            setIsEditingProjectName(true);
                                        }}
                                        className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                        Rename project
                                    </button>
                                    <button className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                        Star project
                                    </button>
                                    <button className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                                        Move to folder
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
                                                removeProject(projectId);
                                                window.location.href = "/portal/projects";
                                            }
                                        }}
                                        className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-red-500"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                        Delete project
                                    </button>

                                    <div className="h-px bg-gray-100 my-1 mx-1" />

                                    <button onClick={() => alert("Details coming soon!")} className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                                        Details
                                    </button>
                                    <button onClick={() => router.push("/portal/support")} className="w-full flex items-center justify-between px-3 py-2 text-[13px] text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left">
                                        <span className="flex items-center gap-2.5">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                                            Help
                                        </span>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-300"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Context Banner */}
            <AnimatePresence>
                {selectedElement && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden shrink-0 bg-transparent"
                    >
                        <div className="mx-4 mt-4 px-3 py-2.5 rounded-xl bg-indigo-50/70 backdrop-blur-md border border-indigo-100/50 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-2 min-w-0">
                                <MousePointerClick className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-[10px] text-indigo-500/80 uppercase tracking-widest font-semibold">
                                        Editing Element
                                    </p>
                                    <p className="text-[12px] text-indigo-900 font-medium truncate">
                                        {selectedElement.label}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={deselectElement}
                                className="p-1 rounded-md hover:bg-indigo-100 transition-colors flex-shrink-0"
                            >
                                <X className="w-3.5 h-3.5 text-indigo-400" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="text-center pb-2">
                    <span className="text-[11px] font-medium text-gray-400">{currentTime}</span>
                </div>

                {chatMessages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex gap-3 ${msg.role === "user" ? "justify-end" : msg.role === "generation" || msg.role === "generation_complete" ? "justify-start" : "justify-start"}`}
                    >
                        {/* Generation ActionBlock (live) */}
                        {msg.role === "generation" && (
                            <ActionBlock
                                isActive={true}
                                isIntentPhase={false}
                                promptText={msg.content}
                            />
                        )}

                        {/* Generation ActionBlock (completed) */}
                        {msg.role === "generation_complete" && (
                            <ActionBlock
                                isActive={false}
                                isIntentPhase={false}
                                promptText=""
                                completedMessage={msg.content}
                                canUndo={canUndo}
                                onUndo={() => {
                                    undoCode();
                                    addMessage({
                                        id: `msg-${Date.now()}-undo`,
                                        role: "system",
                                        content: "↩ Reverted to the previous version.",
                                    });
                                }}
                            />
                        )}

                        {/* Regular messages */}
                        {msg.role !== "generation" && msg.role !== "generation_complete" && msg.role !== "user" && msg.role !== "action" && (
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${msg.role === "system" ? "bg-amber-100 text-amber-600" : "bg-white border border-gray-100 shadow-sm"
                                }`}>
                                {msg.role === "system" ? (
                                    <AlertCircle className="w-4 h-4" />
                                ) : (
                                    <img src="/logo-symbol.png" alt="AI" className="w-[14px] h-[14px] object-contain opacity-90" />
                                )}
                            </div>
                        )}

                        {msg.role !== "generation" && msg.role !== "generation_complete" && (
                            <>
                                {msg.role !== "action" && (
                                    <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed ${msg.role === "user"
                                        ? "bg-indigo-50 border border-indigo-100/50 text-gray-900 rounded-tr-sm"
                                        : msg.role === "system"
                                            ? "bg-amber-50 text-amber-800 border border-amber-200 rounded-tl-sm"
                                            : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm"
                                        }`}>
                                        {msg.content}
                                        {/* Show attached images in user messages */}
                                        {msg.role === "user" && msg.images && msg.images.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-2">
                                                {msg.images.map((img, i) => (
                                                    <div key={i} className="w-16 h-16 rounded-lg overflow-hidden border border-indigo-200/50 shadow-sm">
                                                        <img src={img} alt={`Attachment ${i + 1}`} className="w-full h-full object-cover" />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {msg.role === "user" && (
                                    <div className="w-7 h-7 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <User className="w-3.5 h-3.5 text-indigo-600" />
                                    </div>
                                )}

                                {msg.role === "action" && msg.content === "plan_ready" && (
                                    <div className="w-full flex justify-end mt-2 pr-11">
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => {
                                                setIsPlanMode(false);
                                                executeSend(`Please implement the architecture plan we just discussed for the request: "${msg.originalPrompt}"`);
                                            }}
                                            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[13px] font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 group ring-1 ring-white/20"
                                        >
                                            Proceed with Implementation
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                        </motion.button>
                                    </div>
                                )}
                            </>
                        )}
                    </motion.div>
                ))}

                {/* Detecting Intent Indicator */}
                {isDetectingIntent && (
                    <ActionBlock isActive={true} isIntentPhase={true} promptText="" />
                )}

                {/* Active Intent Onboarding Questions */}
                {activeIntent && !isTyping && (
                    <div className="pt-2 pb-1 flex justify-start pr-2 w-full">
                        <OnboardingQuestions
                            data={activeIntent}
                            onComplete={handleQuestionsComplete}
                            onSkip={handleQuestionsSkip}
                            forceLight={true}
                        />
                    </div>
                )}

                {/* Build Progress Tracker */}
                {(loadingSteps || completedSteps) && (
                    <div className="pt-2 pb-2 flex justify-start pr-2 w-full">
                        <BuildProgress
                            steps={loadingSteps || completedSteps}
                            isComplete={!isTyping && !!completedSteps && !loadingSteps}
                        />
                    </div>
                )}

                {/* Contextual Suggestion Chips */}
                {!isTyping && suggestions && suggestions.length > 0 && !activeIntent && (
                    <div className="pt-2 pb-1">
                        <SuggestionChips
                            suggestions={suggestions}
                            codeAnalysis={codeAnalysis}
                            onSelect={(text) => executeSend(text)}
                            forceLight={true}
                        />
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Wrapper - forced light mode overlay */}
            <div className="p-4 bg-gradient-to-t from-white/80 via-white/50 to-transparent backdrop-blur-[2px] sticky bottom-0 shrink-0 border-t border-gray-100 flex flex-col gap-2">

                {/* Prompt Queue Panel */}
                <AnimatePresence>
                    {promptQueue.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="bg-indigo-50/60 backdrop-blur-sm rounded-2xl border border-indigo-100/50 p-3 mb-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <ListOrdered className="w-3.5 h-3.5 text-indigo-500" />
                                    <span className="text-[12px] font-semibold text-indigo-700">Queue ({promptQueue.length})</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    {promptQueue.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10, height: 0 }}
                                            className="flex items-center gap-2 bg-white/70 rounded-xl px-3 py-2 border border-indigo-100/30 group"
                                        >
                                            <div className="w-1 h-5 rounded-full bg-indigo-400 shrink-0" />
                                            <span className="text-[12px] text-gray-700 font-medium truncate flex-1">
                                                {item.text.length > 60 ? item.text.substring(0, 60) + "..." : item.text}
                                            </span>
                                            <button
                                                onClick={() => removeFromQueue(item.id)}
                                                className="p-1 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 shrink-0"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Lovable-Style Credits Display */}
                {!isTyping && (
                    <div className="w-full flex items-center justify-between px-2">
                        <span className="text-[13px] font-medium text-gray-500">
                            {userData?.editCredits || 0} credits remaining
                        </span>
                        <button
                            onClick={() => setIsTopUpOpen(true)}
                            className="px-4 py-1.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-[12px] font-medium rounded-full shadow-sm transition-all flex items-center gap-1.5"
                        >
                            Add credits
                        </button>
                    </div>
                )}

                <div className="bg-white/90 backdrop-blur-xl rounded-[24px] border border-gray-200 shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-2 flex flex-col focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-300 transition-all">

                    {/* Multi-Image Attachment Preview */}
                    <AnimatePresence>
                        {attachedImages.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="px-2 pt-2 pb-1 overflow-hidden"
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

                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder={
                            selectedElement
                                ? `Edit ${selectedElement.label}...`
                                : "Ask Struxly..."
                        }
                        className="w-full bg-transparent px-3 py-2 text-[14px] text-gray-900 placeholder-gray-500 focus:outline-none"
                    />

                    <div className="flex items-center justify-between mt-2 px-1">
                        <div className="flex items-center gap-1">
                            <button
                                onClick={toggleInspector}
                                className={`p-1.5 rounded-full transition-colors flex items-center gap-1.5 px-2 ${inspectorActive
                                    ? "bg-indigo-100 text-indigo-600 shadow-sm"
                                    : "hover:bg-gray-200 text-gray-500"
                                    }`}
                            >
                                <MousePointerClick className="w-4 h-4" />
                                <span className="text-[12px] font-medium">
                                    {inspectorActive ? "Selection active" : "Visual edits"}
                                </span>
                            </button>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setIsPlanMode(!isPlanMode)}
                                className={`px-3 h-8 rounded-full text-[12px] font-medium flex items-center justify-center transition-all ${isPlanMode
                                    ? "bg-gray-800 text-white shadow-sm"
                                    : "hover:bg-gray-200 text-gray-500"
                                    }`}
                            >
                                Plan
                            </button>
                            <button
                                onClick={toggleRecording}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isRecording
                                    ? "bg-red-100 text-red-600 animate-pulse"
                                    : "hover:bg-gray-200 text-gray-500"
                                    }`}
                            >
                                <Mic className="w-4 h-4" />
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${attachedImages.length > 0
                                    ? "bg-indigo-100 text-indigo-600"
                                    : "hover:bg-gray-200 text-gray-500"
                                    }`}
                            >
                                <Paperclip className="w-4 h-4" />
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSend}
                                disabled={!input.trim() && attachedImages.length === 0}
                                className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center ml-1 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity shadow-sm"
                            >
                                <Send className="w-3.5 h-3.5" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Credit Top-Up Modal */}
            <TopUpModal
                isOpen={isTopUpOpen}
                onClose={() => setIsTopUpOpen(false)}
            />
        </div >
    );
}

export default function DialogueBox() {
    return (
        <Suspense fallback={<div className="h-full bg-transparent flex items-center justify-center"><div className="w-6 h-6 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" /></div>}>
            <DialogueBoxContent />
        </Suspense>
    );
}
