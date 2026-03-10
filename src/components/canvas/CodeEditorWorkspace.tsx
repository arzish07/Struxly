"use client";

import { SandpackLayout, SandpackProvider, SandpackCodeEditor } from "@codesandbox/sandpack-react";
import { useCanvas } from "@/context/CanvasContext";
import { Search, ChevronDown, ChevronRight, Folder, FileCode2, FileText, FileJson, X } from "lucide-react";

const tailwindCSS = `
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Inter', system-ui, sans-serif;
  background: white;
  margin: 0;
  padding: 0;
}
`;

export default function CodeEditorWorkspace() {
    const { generatedCode, setActiveView } = useCanvas();

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
            {/* Top Bar (Lovable Style) */}
            <div className="h-14 bg-white flex items-center px-4 shrink-0 z-10 relative border-b border-gray-100 flex-shrink-0">
                <div className="flex-1"></div>
                <div className="text-[13px] font-semibold text-gray-900 absolute left-1/2 -translate-x-1/2">Code</div>
                <div className="flex-1 flex justify-end items-center gap-4">
                    <span className="text-[12px] font-medium text-gray-500">Read only</span>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-colors">Upgrade</button>
                    <button 
                        className="text-gray-500 hover:bg-gray-100 hover:text-gray-900 p-1.5 rounded-lg transition-colors border border-gray-200"
                        onClick={() => setActiveView("preview")}
                    >
                        <span className="text-[12px] font-medium px-1">Close</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left File Explorer Sidebar */}
                <div className="w-64 border-r border-gray-100 bg-[#FAFCFF] flex flex-col shrink-0 hidden md:flex">
                    <div className="p-3">
                        <div className="bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 flex items-center gap-2 shadow-sm">
                            <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <input type="text" placeholder="Search files" className="bg-transparent border-none outline-none text-[12px] text-gray-700 w-full placeholder:text-gray-400" />
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto px-2 py-1 space-y-0.5 select-none">
                        {/* Folder: public */}
                        <div className="flex items-center gap-1.5 px-2 py-1.5 hover:bg-gray-100 rounded-md cursor-pointer text-gray-600 transition-colors">
                            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                            <Folder className="w-4 h-4 text-gray-400" />
                            <span className="text-[13px] font-medium">public</span>
                        </div>
                        
                        {/* Folder: src */}
                        <div className="flex items-center gap-1.5 px-2 py-1.5 hover:bg-gray-100 rounded-md cursor-pointer text-gray-900 transition-colors">
                            <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
                            <Folder className="w-4 h-4 text-blue-500" />
                            <span className="text-[13px] font-medium">src</span>
                        </div>
                        
                        {/* Subfolder: components */}
                        <div className="flex items-center gap-1.5 pl-6 pr-2 py-1.5 hover:bg-gray-100 rounded-md cursor-pointer text-gray-600 transition-colors">
                            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                            <Folder className="w-4 h-4 text-gray-400" />
                            <span className="text-[13px] font-medium">components</span>
                        </div>
                        
                        {/* Subfolder: hooks */}
                        <div className="flex items-center gap-1.5 pl-6 pr-2 py-1.5 hover:bg-gray-100 rounded-md cursor-pointer text-gray-600 transition-colors">
                            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                            <Folder className="w-4 h-4 text-gray-400" />
                            <span className="text-[13px] font-medium">hooks</span>
                        </div>

                        {/* File: App.tsx */}
                        <div className="flex items-center gap-1.5 pl-[28px] pr-2 py-1.5 bg-blue-50 text-blue-700 rounded-md cursor-pointer border border-blue-100/50">
                            <FileCode2 className="w-4 h-4 text-blue-500" />
                            <span className="text-[13px] font-medium">App.tsx</span>
                        </div>
                        
                        {/* File: index.css */}
                        <div className="flex items-center gap-1.5 pl-[28px] pr-2 py-1.5 hover:bg-gray-100 rounded-md cursor-pointer text-gray-600 transition-colors">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-[13px] font-medium">index.css</span>
                        </div>
                        
                        {/* File: main.tsx */}
                        <div className="flex items-center gap-1.5 pl-[28px] pr-2 py-1.5 hover:bg-gray-100 rounded-md cursor-pointer text-gray-600 transition-colors">
                            <FileCode2 className="w-4 h-4 text-gray-400" />
                            <span className="text-[13px] font-medium">main.tsx</span>
                        </div>

                        {/* File: package.json */}
                        <div className="flex items-center gap-1.5 px-2 py-1.5 mt-2 hover:bg-gray-100 rounded-md cursor-pointer text-gray-600 transition-colors">
                            <FileJson className="w-4 h-4 text-gray-400" />
                            <span className="text-[13px] font-medium">package.json</span>
                        </div>
                        
                        {/* File: README.md */}
                        <div className="flex items-center gap-1.5 px-2 py-1.5 hover:bg-gray-100 rounded-md cursor-pointer text-gray-600 transition-colors">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-[13px] font-medium">README.md</span>
                        </div>
                    </div>
                </div>

                {/* Right Editor Area */}
                <div className="flex-1 overflow-hidden relative border-l border-gray-100 bg-white">
                    <SandpackProvider
                        template="react-ts"
                        theme="light"
                        files={{
                            "/App.tsx": {
                                code: generatedCode || "// Start by describing what you want to build...",
                                active: true,
                            },
                            "/index.css": {
                                code: tailwindCSS,
                                hidden: true,
                            },
                        }}
                        customSetup={{
                            dependencies: {
                                "lucide-react": "latest",
                                "clsx": "latest",
                                "tailwind-merge": "latest",
                                "framer-motion": "latest",
                                "recharts": "^2.12.7",
                            },
                        }}
                        options={{
                            classes: {
                                "sp-wrapper": "h-full bg-white",
                                "sp-layout": "h-full border-none bg-white",
                                "sp-editor": "h-full bg-white",
                            }
                        }}
                    >
                        {/* File Path Header matching the Reference Image */}
                        <div className="h-10 border-b border-gray-100 flex items-center px-4 bg-white shrink-0">
                            <span className="text-[12px] text-gray-500 font-medium">
                                src / <span className="text-gray-900 font-semibold">App.tsx</span>
                            </span>
                        </div>
                        <div style={{ height: 'calc(100% - 40px)' }}>
                            <SandpackLayout style={{ height: '100%', border: 'none', background: 'white' }}>
                                <SandpackCodeEditor
                                    showLineNumbers={true}
                                    showInlineErrors={true}
                                    showTabs={false}
                                    wrapContent={true}
                                    style={{ height: '100%' }}
                                />
                            </SandpackLayout>
                        </div>
                    </SandpackProvider>
                </div>
            </div>
        </div>
    );
}
