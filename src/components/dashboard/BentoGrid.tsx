'use client';

import { Calendar, Globe, MoreVertical, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface Project {
    id: string;
    name: string;
    url: string;
    thumbnail: string;
    lastEdited: string;
    status: 'active' | 'draft' | 'archived';
}

// Mock data for initial MVP
const MOCK_PROJECTS: Project[] = [
    {
        id: '1',
        name: 'Nexus Flow',
        url: 'nexus-flow.struxly.app',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        lastEdited: 'Just now',
        status: 'active',
    },
    {
        id: '2',
        name: 'Canvas & Co',
        url: 'canvas.struxly.app',
        thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
        lastEdited: '2 hours ago',
        status: 'active',
    },
    {
        id: '3',
        name: 'The Artisan',
        url: 'artisan.struxly.app',
        thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
        lastEdited: 'Yesterday',
        status: 'draft',
    },
];

export function BentoGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {MOCK_PROJECTS.map((project) => (
                <div
                    key={project.id}
                    className="group relative bg-white border border-gray-200/70 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-gray-200/40 hover:-translate-y-1 transition-all duration-300"
                >
                    <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                        <Image
                            src={project.thumbnail}
                            alt={project.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="absolute top-3 right-3">
                            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-white hover:text-gray-900">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="absolute bottom-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md backdrop-blur-md ${project.status === 'active'
                                ? 'bg-emerald-500/20 text-emerald-100 border border-emerald-400/30'
                                : 'bg-gray-500/20 text-gray-100 border border-gray-400/30'
                                }`}>
                                {project.status}
                            </span>
                        </div>
                    </div>

                    <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-gray-900 text-lg truncate pr-4 group-hover:text-indigo-600 transition-colors">
                                {project.name}
                            </h3>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1.5 font-medium">
                                <Globe className="w-3.5 h-3.5" />
                                <span className="truncate max-w-[120px]">{project.url}</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-gray-300" />
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {project.lastEdited}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Create New Project Card */}
            <button className="group relative bg-[#F9FAFB] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 min-h-[280px] hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors duration-300">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-md group-hover:border-indigo-200 transition-all duration-300">
                    <Sparkles className="w-5 h-5 text-gray-500 group-hover:text-indigo-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Start from scratch</h3>
                <p className="text-sm text-gray-500 text-center">Use the prompt bar above to magically generate a new site</p>
            </button>
        </div>
    );
}
