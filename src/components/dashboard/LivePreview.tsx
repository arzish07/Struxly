"use client";

import { SandpackProvider, SandpackPreview, SandpackLayout } from "@codesandbox/sandpack-react";
import { useEffect, useState } from "react";

interface LivePreviewProps {
    code: string;
    inspectorActive?: boolean;
    onElementSelect?: (element: { id: string; label: string; selector?: string }) => void;
}

const tailwindCSS = `
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  height: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}

body {
  min-height: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  font-family: 'Inter', system-ui, sans-serif;
  background-color: transparent !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
}

body::-webkit-scrollbar {
  width: 6px;
}
body::-webkit-scrollbar-track {
  background: transparent;
}
body::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.15);
  border-radius: 3px;
}
body::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.25);
}

#root {
  min-height: 100% !important;
}
`;

const inspectorScript = `
window.addEventListener('click', (e) => {
    if (!window.__INSPECTOR_ACTIVE__) return;
    e.preventDefault();
    e.stopPropagation();

    const el = e.target;
    const label = el.innerText?.slice(0, 20) || el.tagName;

    window.parent.postMessage({
        type: 'ELEMENT_SELECTED',
        label: label,
        id: el.id || 'el-' + Math.random().toString(36).substr(2, 9)
    }, '*');
}, true);

window.addEventListener('mouseover', (e) => {
    if (!window.__INSPECTOR_ACTIVE__) return;
    e.target.style.outline = '2px solid #6366f1';
    e.target.style.cursor = 'pointer';
});

window.addEventListener('mouseout', (e) => {
    if (!window.__INSPECTOR_ACTIVE__) return;
    e.target.style.outline = '';
});
`;

export function LivePreview({ code, inspectorActive, onElementSelect }: LivePreviewProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'ELEMENT_SELECTED' && onElementSelect) {
                onElementSelect(event.data);
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [onElementSelect]);

    if (!mounted) return null;

    // We inject the inspector state into the code via a simple variable
    const finalCode = `
      ${code}
// @ts-ignore
window.__INSPECTOR_ACTIVE__ = ${!!inspectorActive};
      ${inspectorScript}
`;

    return (
        <div className="absolute inset-0 flex flex-col overflow-hidden">
            <style dangerouslySetInnerHTML={{
                __html: `
                .sp-wrapper, .sp-layout, .sp-stack, .sp-preview-container, .sp-preview-iframe {
                    height: 100% !important;
                    min-height: 100% !important;
                    flex: 1 !important;
                }
                .sp-preview {
                    height: 100% !important;
                    display: flex !important;
                    flex-direction: column !important;
                }
            `}} />
            <SandpackProvider
                template="react-ts"
                theme="light"
                files={{
                    "/App.tsx": {
                        code: finalCode,
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
                    externalResources: [
                        "https://cdn.tailwindcss.com"
                    ],
                    classes: {
                        "sp-wrapper": "h-full flex flex-col min-h-0",
                        "sp-layout": "h-full border-none flex flex-col min-h-0",
                        "sp-preview": "h-full flex-1",
                        "sp-stack": "h-full flex flex-col flex-1",
                    }
                }}
            >
                <SandpackLayout style={{ border: 'none', background: 'transparent', height: '100%', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <SandpackPreview
                        style={{ flex: 1, height: "100%", width: "100%", background: 'transparent' }}
                        showNavigator={false}
                        showRefreshButton={false}
                        showOpenInCodeSandbox={false}
                        showRestartButton={false}
                    />
                </SandpackLayout>
            </SandpackProvider>
        </div>
    );
}
