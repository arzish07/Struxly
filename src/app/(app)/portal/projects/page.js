"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Search, Plus, Globe, ChevronDown, Check,
    LayoutGrid, List, Grid3X3, Star, Trash2
} from "lucide-react";
import { useProjects } from "@/context/ProjectContext";
import ProjectPreview from "@/components/portal/ProjectPreview";

const SORT_OPTIONS = [
    { id: "last_edited", label: "Last edited" },
    { id: "last_viewed", label: "Last viewed" },
    { id: "created", label: "Created" },
    { id: "name", label: "Name" },
];

const VISIBILITY_OPTIONS = [
    { id: "any", label: "Any visibility" },
    { id: "public", label: "Public" },
    { id: "workspace", label: "Workspace" },
];

const STATUS_OPTIONS = [
    { id: "any", label: "Any status" },
    { id: "all_published", label: "All published" },
    { id: "internally", label: "Internally published" },
    { id: "externally", label: "Externally published" },
    { id: "not_published", label: "Not published" },
];

function FilterDropdown({ label, options, value, onChange }) {
    const [open, setOpen] = useState(false);
    const selected = options.find(o => o.id === value);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
            >
                {selected?.label || label}
                <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute top-full left-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-xl z-50 min-w-[180px] py-1">
                        {label && <p className="px-4 py-2 text-[12px] font-semibold text-gray-900">{label}</p>}
                        {options.map(opt => (
                            <button
                                key={opt.id}
                                onClick={() => { onChange(opt.id); setOpen(false); }}
                                className="flex items-center justify-between w-full px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                {opt.label}
                                {value === opt.id && <Check className="w-3.5 h-3.5 text-gray-900" />}
                            </button>
                        ))}
                    </div>
                </>
            )}
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

function ProjectCard({ project }) {
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
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : project.currentCode ? (
                        <ProjectPreview code={project.currentCode} />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Globe className="w-8 h-8 text-gray-300" />
                        </div>
                    )}
                    {project.published && (
                        <span className="absolute bottom-2 left-2 text-[10px] font-semibold bg-green-500 text-white px-2 py-0.5 rounded-md">Published</span>
                    )}
                </div>
                <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">{project.title}</h4>
                        <div className="ml-auto flex items-center gap-2">
                            <button
                                className="text-gray-300 hover:text-amber-400 transition-colors relative z-10"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                            >
                                <Star className="w-3.5 h-3.5 relative z-10" />
                            </button>
                            <button
                                className="text-gray-300 hover:text-red-500 transition-colors relative z-10"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (window.confirm("Are you sure you want to delete this project?")) {
                                        removeProject(project.id);
                                    }
                                }}
                            >
                                <Trash2 className="w-3.5 h-3.5 relative z-10" />
                            </button>
                        </div>
                    </div>
                    <p className="text-[12px] text-gray-400">Edited {formatDate(project.lastEdited)}</p>
                </div>
            </motion.div>
        </Link>
    );
}

export default function ProjectsPage() {
    const { projects, removeProject } = useProjects();
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("last_edited");
    const [visibility, setVisibility] = useState("any");
    const [status, setStatus] = useState("any");
    const [viewMode, setViewMode] = useState("grid"); // grid | list | compact

    const myProjects = projects || [];
    const filtered = myProjects.filter(p =>
        p.title?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="h-full overflow-y-auto">
            <div className="max-w-[1200px] mx-auto px-8 py-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-[24px] font-bold text-gray-900">Projects</h1>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="relative flex-1 max-w-[400px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search projects..."
                            className="w-full pl-9 pr-4 py-2 text-[13px] border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                        <FilterDropdown label="Sort by" options={SORT_OPTIONS} value={sortBy} onChange={setSortBy} />
                        <FilterDropdown label="Visibility" options={VISIBILITY_OPTIONS} value={visibility} onChange={setVisibility} />
                        <FilterDropdown label="Publish status" options={STATUS_OPTIONS} value={status} onChange={setStatus} />
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden ml-2">
                            {[
                                { id: "compact", icon: Grid3X3 },
                                { id: "grid", icon: LayoutGrid },
                                { id: "list", icon: List },
                            ].map(v => (
                                <button
                                    key={v.id}
                                    onClick={() => setViewMode(v.id)}
                                    className={`p-2 transition-colors ${viewMode === v.id ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-600"}`}
                                >
                                    <v.icon className="w-4 h-4" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Grid View */}
                {viewMode !== "list" ? (
                    <div className={`grid gap-5 ${viewMode === "compact" ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"}`}>
                        {/* Create new project card */}
                        <motion.div
                            whileHover={{ y: -2 }}
                            onClick={() => router.push("/portal")}
                            className="rounded-xl border border-dashed border-gray-300 overflow-hidden bg-white hover:border-gray-400 hover:shadow-md transition-all cursor-pointer flex flex-col items-center justify-center aspect-[16/10]"
                        >
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                                <Plus className="w-5 h-5 text-gray-400" />
                            </div>
                            <span className="text-[13px] font-medium text-gray-500">Create new project</span>
                        </motion.div>

                        {filtered.map(p => (
                            <ProjectCard key={p.id} project={p} />
                        ))}
                    </div>
                ) : (
                    /* List View */
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                        <div className="grid grid-cols-[1fr_150px_150px_60px] gap-4 px-6 py-3 text-[12px] font-medium text-gray-500 border-b border-gray-100 bg-gray-50/50">
                            <span>Name</span>
                            <span>Created at</span>
                            <span>Created by</span>
                            <span></span>
                        </div>
                        {filtered.map(p => (
                            <Link
                                key={p.id}
                                href={`/canvas?projectId=${p.id}&project=${encodeURIComponent(p.title)}&template=${p.templateSlug || "nexus-flow"}`}
                                className="grid grid-cols-[1fr_150px_150px_60px] gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center border-b border-gray-100 last:border-0"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-8 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                                        {p.image ? (
                                            <img src={p.image} alt="" className="w-full h-full object-cover" />
                                        ) : p.currentCode ? (
                                            <ProjectPreview code={p.currentCode} />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                                <Globe className="w-3 h-3 text-gray-300" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-medium text-gray-900 truncate">{p.title}</p>
                                        <p className="text-[11px] text-gray-400">Edited {formatDate(p.lastEdited)}</p>
                                    </div>
                                </div>
                                <span className="text-[12px] text-gray-500">{formatDate(p.lastEdited)}</span>
                                <span className="text-[12px] text-gray-500 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                    You
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        className="text-gray-300 hover:text-amber-400 transition-colors relative z-10"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                    >
                                        <Star className="w-3.5 h-3.5 relative z-10" />
                                    </button>
                                    <button
                                        className="text-gray-300 hover:text-red-500 transition-colors relative z-10"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            if (window.confirm("Are you sure you want to delete this project?")) {
                                                removeProject(p.id);
                                            }
                                        }}
                                    >
                                        <Trash2 className="w-3.5 h-3.5 relative z-10" />
                                    </button>
                                </div>
                            </Link>
                        ))}
                        {filtered.length === 0 && (
                            <div className="px-6 py-12 text-center text-[14px] text-gray-400">No projects found.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
