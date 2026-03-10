"use client";

import { SandpackProvider, SandpackPreview, SandpackLayout } from "@codesandbox/sandpack-react";
import { useEffect, useState, memo } from "react";

const tailwindCSS = `
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  background: white;
  font-family: 'Inter', system-ui, sans-serif;
}
`;

const ProjectPreview = memo(function ProjectPreview({ code }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !code) return (
        <div className="w-full h-full bg-gray-50 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-indigo-100 border-t-indigo-500 rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="w-full h-full pointer-events-none select-none relative group-hover:scale-[1.02] transition-transform duration-500">
            <style dangerouslySetInnerHTML={{
                __html: `
                .sp-wrapper, .sp-layout, .sp-stack, .sp-preview-container, .sp-preview-iframe {
                    height: 100% !important;
                    min-height: 100% !important;
                    flex: 1 !important;
                    border: none !important;
                }
                .sp-preview {
                    height: 100% !important;
                    display: flex !important;
                    flex-direction: column !important;
                    background: transparent !important;
                }
                iframe {
                    pointer-events: none !important;
                }
            `}} />
            <SandpackProvider
                template="react-ts"
                theme="light"
                files={{
                    "/App.tsx": {
                        code: code,
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
                }}
            >
                <SandpackLayout style={{ border: 'none', background: 'transparent', height: '100%' }}>
                    <SandpackPreview
                        style={{ height: '100%', background: 'transparent' }}
                        showNavigator={false}
                        showRefreshButton={false}
                        showOpenInCodeSandbox={false}
                        showRestartButton={false}
                    />
                </SandpackLayout>
            </SandpackProvider>

            {/* Overlay to ensure no clicks hit the iframe and to provide a nice fade */}
            <div className="absolute inset-0 bg-transparent z-10" />
        </div>
    );
});

export default ProjectPreview;
