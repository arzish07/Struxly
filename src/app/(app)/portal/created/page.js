"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, Check, Star, LayoutGrid, List, Trash2 } from "lucide-react";
import { useProjects } from "@/context/ProjectContext";
import ProjectPreview from "@/components/portal/ProjectPreview";

const SORT_OPTIONS = [
    { id: "last_edited", label: "Last edited" },
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
    { id: "published", label: "All published" },
    { id: "not_published", label: "Not published" },
];

function FilterDropdown({ label, options, value, onChange }) {
    const [open, setOpen] = useState(false);
    const selected = options.find(o => o.id === value);
    return (
        <div className="relative">
            <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-gray-600 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
                {selected?.label || label} <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute top-full left-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-xl z-50 min-w-[170px] py-1">
                        {options.map(opt => (
                            <button key={opt.id} onClick={() => { onChange(opt.id); setOpen(false); }} className="flex items-center justify-between w-full px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors">
                                {opt.label} {value === opt.id && <Check className="w-3.5 h-3.5 text-gray-900" />}
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

export default function CreatedByMePage() {
    const { projects, removeProject } = useProjects();
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("last_edited");
    const [visibility, setVisibility] = useState("any");
    const [status, setStatus] = useState("any");

    const myProjects = (projects || []).filter(p =>
        p.title?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="h-full overflow-y-auto">
            <div className="max-w-[1200px] mx-auto px-8 py-8">
                <h1 className="text-[24px] font-bold text-gray-900 mb-6">Created by me</h1>

                {/* Toolbar */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="relative flex-1 max-w-[400px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search your projects..." className="w-full pl-9 pr-4 py-2 text-[13px] border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200" />
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                        <FilterDropdown label="Sort by" options={SORT_OPTIONS} value={sortBy} onChange={setSortBy} />
                        <FilterDropdown label="Visibility" options={VISIBILITY_OPTIONS} value={visibility} onChange={setVisibility} />
                        <FilterDropdown label="Status" options={STATUS_OPTIONS} value={status} onChange={setStatus} />
                    </div>
                </div>

                {/* List View */}
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="grid grid-cols-[1fr_150px_150px_40px] gap-4 px-6 py-3 text-[12px] font-medium text-gray-500 border-b border-gray-100 bg-gray-50/50">
                        <span>Name</span>
                        <span>Created at</span>
                        <span>Created by</span>
                        <span></span>
                    </div>
                    {myProjects.length > 0 ? myProjects.map(p => (
                        <Link
                            key={p.id}
                            href={`/canvas?projectId=${p.id}&project=${encodeURIComponent(p.title)}&template=${p.templateSlug || "nexus-flow"}`}
                            className="grid grid-cols-[1fr_150px_150px_60px] gap-4 px-6 py-3 hover:bg-gray-50 transition-colors items-center border-b border-gray-100 last:border-0"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-14 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                                    {p.image ? (
                                        <img src={p.image} alt="" className="w-full h-full object-cover" />
                                    ) : p.currentCode ? (
                                        <ProjectPreview code={p.currentCode} />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                            <Globe className="w-4 h-4 text-gray-300" />
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
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> You
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
                    )) : (
                        <div className="px-6 py-12 text-center text-[14px] text-gray-400">No projects yet.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
