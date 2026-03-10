"use client";

import { SandpackLayout, SandpackProvider, SandpackCodeEditor } from "@codesandbox/sandpack-react";
import { useCanvas } from "@/context/CanvasContext";

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
    const { generatedCode } = useCanvas();

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-[#1e1e1e]">
            <div className="h-10 bg-[#252526] border-b border-[#333] flex items-center px-4 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-[#1e1e1e] border-t border-t-indigo-500 text-gray-200 text-[12px] font-medium rounded-t-sm">
                        App.tsx
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <SandpackProvider
                    template="react-ts"
                    theme="dark"
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
                            "sp-wrapper": "h-full",
                            "sp-layout": "h-full border-none",
                            "sp-editor": "h-full",
                        }
                    }}
                >
                    <SandpackLayout style={{ height: '100%', border: 'none' }}>
                        <SandpackCodeEditor
                            showLineNumbers={true}
                            showInlineErrors={true}
                            showTabs={false}
                            wrapContent={true}
                            style={{ height: '100%' }}
                        />
                    </SandpackLayout>
                </SandpackProvider>
            </div>

            <div className="h-8 bg-[#007acc] flex items-center px-4 justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <span className="text-white text-[11px] font-medium flex items-center gap-1">
                        <span className="opacity-70">Project:</span> Struxly Vibe
                    </span>
                    <span className="text-white text-[11px] font-medium flex items-center gap-1">
                        <span className="opacity-70">Mode:</span> Read Only
                    </span>
                </div>
                <div className="text-white text-[11px] opacity-70">
                    UTF-8
                </div>
            </div>
        </div>
    );
}
