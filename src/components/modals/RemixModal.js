"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Activity } from "lucide-react";
import { useProjects } from "@/context/ProjectContext";
import { useRouter } from "next/navigation";

export default function RemixModal({ isOpen, onClose, template }) {
    const router = useRouter();
    const { addProject } = useProjects();
    const [projectName, setProjectName] = useState(`Remix of ${template?.title || "Project"}`);
    const [includeHistory, setIncludeHistory] = useState(false);
    const [isRemixing, setIsRemixing] = useState(false);

    if (!isOpen) return null;

    const isProjectNameValid = projectName.trim().length > 0;

    const handleRemix = async () => {
        if (!isProjectNameValid) return;

        setIsRemixing(true);

        try {
            // Save to Firestore
            const newProject = await addProject({
                name: projectName.trim(),
                templateSlug: template?.slug,
                image: template?.image
            });

            if (!newProject) {
                console.error("Failed to remix project");
                setIsRemixing(false);
                return;
            }

            // Optional delay for UX
            setTimeout(() => {
                const params = new URLSearchParams({
                    projectId: newProject.id,
                    project: newProject.title,
                    template: template?.slug || "nexus-flow",
                    history: includeHistory
                });
                router.push(`/canvas?${params.toString()}`);
            }, 1000);
        } catch (error) {
            console.error("Error remixing: ", error);
            setIsRemixing(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-[20px] w-full max-w-[480px] overflow-hidden shadow-2xl relative"
                    >
                        {/* Header Image/Icon area matching Lovable */}
                        <div className="px-6 pt-6 pb-2 relative">
                            <button
                                onClick={onClose}
                                disabled={isRemixing}
                                className="absolute top-6 right-6 p-1 rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors disabled:opacity-50"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <img src="/logo-symbol.png" alt="Struxly" className="w-[36px] h-[36px] mb-4 object-contain" />
                            <h2 className="text-[22px] font-semibold text-gray-900 leading-tight">
                                {isRemixing ? "Remixing project" : "Remix project"}
                            </h2>
                            <p className="text-[14px] text-gray-500 mt-1.5">
                                {isRemixing
                                    ? "This may take a few moments."
                                    : "By remixing a project, you will create a copy that you own."}
                            </p>
                        </div>

                        {/* Body */}
                        <div className="px-6 py-4">
                            {isRemixing ? (
                                <div className="mt-2 bg-[#F9F9F8] border border-gray-100 rounded-xl p-4 flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin" />
                                    <span className="text-[14px] font-medium text-gray-700">Setting up integrations</span>
                                </div>
                            ) : (
                                <div className="space-y-5">
                                    {/* Project Name Input */}
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-semibold text-gray-900">Project name</label>
                                        <input
                                            type="text"
                                            value={projectName}
                                            onChange={(e) => setProjectName(e.target.value)}
                                            className="w-full text-[14px] px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-gray-100 transition-shadow bg-white text-gray-900 placeholder-gray-400"
                                            placeholder="Enter project name..."
                                        />
                                    </div>

                                    {/* Toggle */}
                                    <div className="flex items-center justify-between pt-1">
                                        <span className="text-[14px] font-semibold text-gray-900">Include project history</span>
                                        <button
                                            onClick={() => setIncludeHistory(!includeHistory)}
                                            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 ${includeHistory ? "bg-gray-900" : "bg-gray-200"}`}
                                        >
                                            <span className="sr-only">Include project history</span>
                                            <span
                                                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${includeHistory ? "translate-x-4" : "translate-x-0"}`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {!isRemixing && (
                            <div className="px-6 pt-2 pb-6 flex justify-end gap-3">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 rounded-lg text-[14px] font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRemix}
                                    disabled={!isProjectNameValid}
                                    className="px-4 py-2 rounded-lg text-[14px] font-medium text-white bg-[#1F2937] hover:bg-[#111827] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm min-w-[80px]"
                                >
                                    Remix
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
