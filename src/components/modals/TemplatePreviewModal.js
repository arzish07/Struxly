import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function TemplatePreviewModal({ isOpen, onClose, template, onUseTemplate }) {
    if (!isOpen || !template) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/60 flex flex-col p-4 md:p-8 animate-in fade-in duration-200">
            <div className="bg-[#f5f5f4] w-full max-w-[1400px] h-full mx-auto rounded-xl flex flex-col overflow-hidden shadow-2xl relative">
                {/* Modal Header */}
                <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 relative">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-[15px] text-gray-900">{template.title}</span>
                        <span className="text-[14px] text-gray-500">by Struxly</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onUseTemplate}
                            className="bg-gray-900 hover:bg-black text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-colors"
                        >
                            Use template
                        </button>
                        <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors ml-2 cursor-pointer">
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>
                {/* Modal Body / iframe */}
                <div className="flex-1 bg-gray-100 w-full h-full relative p-4 md:p-8 flex items-center justify-center overflow-auto">
                    {template.liveUrl && template.liveUrl !== "#" ? (
                        <iframe
                            src={template.liveUrl}
                            className="w-full h-full border-none bg-white rounded-xl shadow-sm"
                            title={`${template.title} Preview`}
                        />
                    ) : (
                        <div className="relative w-full h-full max-w-[1200px] bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 isolate">
                            <Image src={template.image} alt={template.title} fill className="object-contain" priority />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
