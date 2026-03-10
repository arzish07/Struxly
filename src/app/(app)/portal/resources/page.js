"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { templates } from "@/data/templates";
import TemplatePreviewModal from "@/components/modals/TemplatePreviewModal";
import RemixModal from "@/components/modals/RemixModal";

export default function ResourcesPage() {
    const [activeTab, setActiveTab] = useState("templates");
    const [previewingTemplate, setPreviewingTemplate] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    return (
        <div className="h-full overflow-y-auto">
            <div className="max-w-[1200px] mx-auto px-8 py-8">
                <h1 className="text-[24px] font-bold text-gray-900 mb-6">Resources</h1>

                {/* Tabs */}
                <div className="flex items-center gap-1 mb-6">
                    {["discover", "templates"].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 text-[13px] font-medium rounded-full transition-colors capitalize ${activeTab === tab
                                ? "bg-gray-900 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {tab === "discover" ? "Discover" : "Templates"}
                        </button>
                    ))}
                </div>

                <p className="text-[15px] text-gray-500 mb-8">
                    Start from a template to build your next project
                </p>

                {/* Template Grid */}
                {activeTab === "templates" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                        {templates.map((t, i) => (
                            <motion.div
                                key={t.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.04 }}
                                onClick={() => setPreviewingTemplate(t)}
                                className="rounded-xl border border-gray-200 overflow-hidden bg-white hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer group"
                            >
                                <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                                    <img
                                        src={t.image}
                                        alt={t.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4">
                                    <h4 className="text-[13px] font-semibold text-gray-900">{t.title}</h4>
                                    <p className="text-[12px] text-gray-400 mt-0.5 line-clamp-1">{t.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {activeTab === "discover" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                        {templates.slice(0, 8).map((t, i) => (
                            <motion.div
                                key={t.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.04 }}
                                onClick={() => setPreviewingTemplate(t)}
                                className="rounded-xl border border-gray-200 overflow-hidden bg-white hover:shadow-lg hover:border-gray-300 transition-all cursor-pointer group"
                            >
                                <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                                    <img
                                        src={t.image}
                                        alt={t.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4">
                                    <h4 className="text-[13px] font-semibold text-gray-900">{t.title}</h4>
                                    <p className="text-[12px] text-gray-400 mt-0.5 line-clamp-1">{t.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <TemplatePreviewModal
                isOpen={!!previewingTemplate}
                onClose={() => setPreviewingTemplate(null)}
                template={previewingTemplate}
                onUseTemplate={() => {
                    setPreviewingTemplate(null);
                    setSelectedTemplate(previewingTemplate);
                }}
            />

            <RemixModal
                isOpen={!!selectedTemplate}
                onClose={() => setSelectedTemplate(null)}
                template={selectedTemplate}
            />
        </div>
    );
}
