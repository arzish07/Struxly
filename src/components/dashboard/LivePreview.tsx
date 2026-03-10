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

// Inspector script lives in its own Sandpack file so it executes properly inside the iframe
function getInspectorScript(active: boolean) {
    return `
// Inspector state — toggled by the parent
window.__INSPECTOR_ACTIVE__ = ${active};

(function() {
    if (window.__INSPECTOR_BOUND__) return;
    window.__INSPECTOR_BOUND__ = true;

    let lastHighlighted = null;

    function getSelector(el) {
        if (el.id) return '#' + el.id;
        const tag = el.tagName.toLowerCase();
        const cls = Array.from(el.classList || []).slice(0, 2).join('.');
        return cls ? tag + '.' + cls : tag;
    }

    function getLabel(el) {
        // Use aria-label, alt, innerText (truncated), or tagName
        if (el.getAttribute('aria-label')) return el.getAttribute('aria-label').slice(0, 30);
        if (el.alt) return el.alt.slice(0, 30);
        const text = (el.innerText || '').trim();
        if (text && text.length <= 30) return text;
        if (text) return text.slice(0, 27) + '...';
        return '<' + el.tagName.toLowerCase() + '>';
    }

    document.addEventListener('click', function(e) {
        if (!window.__INSPECTOR_ACTIVE__) return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        var el = e.target;
        window.parent.postMessage({
            type: 'ELEMENT_SELECTED',
            label: getLabel(el),
            id: el.id || 'el-' + Math.random().toString(36).substr(2, 9),
            tagName: el.tagName.toLowerCase(),
            selector: getSelector(el)
        }, '*');
    }, true);

    document.addEventListener('mouseover', function(e) {
        if (!window.__INSPECTOR_ACTIVE__) return;
        var el = e.target;
        if (lastHighlighted && lastHighlighted !== el) {
            lastHighlighted.style.outline = '';
            lastHighlighted.style.outlineOffset = '';
            lastHighlighted.style.boxShadow = '';
            lastHighlighted.style.cursor = '';
        }
        el.style.outline = '2px solid #6366f1';
        el.style.outlineOffset = '2px';
        el.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.15)';
        el.style.cursor = 'crosshair';
        lastHighlighted = el;
    }, true);

    document.addEventListener('mouseout', function(e) {
        if (!window.__INSPECTOR_ACTIVE__) return;
        var el = e.target;
        el.style.outline = '';
        el.style.outlineOffset = '';
        el.style.boxShadow = '';
        el.style.cursor = '';
        if (lastHighlighted === el) lastHighlighted = null;
    }, true);
})();
`;
}

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

    // Keep user code clean — inspector runs from its own file
    const finalCode = `import './inspector';\n${code}`;
    const inspectorCode = getInspectorScript(!!inspectorActive);

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
                    "/inspector.js": {
                        code: inspectorCode,
                        hidden: true,
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
