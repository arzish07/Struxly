"use client";

import { use, useEffect, useState } from "react";
import { templates } from "@/data/templates";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { LivePreview } from "@/components/dashboard/LivePreview";
import { Loader2 } from "lucide-react";
import MaisonPreview from "@/app/preview/[slug]/templates/MaisonPreview";
import NexusFlowPreview from "@/app/preview/[slug]/templates/NexusFlowPreview";
import CanvasCoPreview from "@/app/preview/[slug]/templates/CanvasCoPreview";
import EstatePreview from "@/app/preview/[slug]/templates/EstatePreview";
import PureSkinPreview from "@/app/preview/[slug]/templates/PureSkinPreview";
import ArtisanPreview from "@/app/preview/[slug]/templates/ArtisanPreview";
import Studio26Preview from "@/app/preview/[slug]/templates/Studio26Preview";
import ForgeIronPreview from "@/app/preview/[slug]/templates/ForgeIronPreview";

const templateComponents = {
    "the-maison": MaisonPreview,
    "nexus-flow": NexusFlowPreview,
    "canvas-co": CanvasCoPreview,
    "the-estate": EstatePreview,
    "pure-skin": PureSkinPreview,
    "the-artisan": ArtisanPreview,
    "studio-26": Studio26Preview,
    "forge-iron": ForgeIronPreview,
};

export default function PublishedSitePage({ params }) {
    const resolvedParams = use(params);
    const slug = resolvedParams.slug;

    const [siteData, setSiteData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchSite() {
            try {
                const siteRef = doc(db, 'publishedSites', slug);
                const snapshot = await getDoc(siteRef);
                if (snapshot.exists()) {
                    setSiteData(snapshot.data());
                }
            } catch (err) {
                console.error("Failed to fetch published site:", err);
            } finally {
                setIsLoading(false);
            }
        }

        if (slug) fetchSite();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    // 1. If we have custom generated code from the user, render it via Sandpack
    if (siteData && siteData.code) {
        return (
            <div className="w-screen h-screen m-0 p-0 overflow-hidden">
                <LivePreview code={siteData.code} inspectorActive={false} />
            </div>
        );
    }

    // 2. Try to find a matching template by slug
    // In production, this would look up the project's template from a database
    // For now, we match the project slug against template slugs
    const template = templates.find(t => t.slug === slug);
    const TemplateComponent = template ? templateComponents[template.slug] : null;

    // If we found a matching template, render it as a published site
    if (template && TemplateComponent) {
        return <TemplateComponent template={template} />;
    }

    // 3. Fallback: For user-created projects that haven't been published yet
    // In production this would be a server-side database lookup
    return (
        <div style={{ margin: 0, padding: 0, fontFamily: "'Inter', system-ui, sans-serif", backgroundColor: "#fafafa", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center", maxWidth: "480px", padding: "40px" }}>
                {/* Struxly Badge */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: "99px", padding: "6px 14px", marginBottom: "24px" }}>
                    <div style={{ width: "16px", height: "16px", borderRadius: "4px", background: "linear-gradient(135deg, #6366f1, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: "#fff", fontSize: "8px", fontWeight: 800 }}>S</span>
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "#6b7280" }}>Published with Struxly</span>
                </div>

                <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#111827", marginBottom: "12px", letterSpacing: "-0.02em" }}>
                    {slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                </h1>
                <p style={{ fontSize: "15px", color: "#9ca3af", lineHeight: 1.6, marginBottom: "32px" }}>
                    This site was built with Struxly — the AI-powered website builder. It&apos;s currently being set up by its creator.
                </p>

                <a
                    href="/"
                    style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", background: "#111827", color: "#fff", borderRadius: "10px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}
                >
                    Build yours with Struxly →
                </a>

                {/* Footer watermark */}
                <p style={{ fontSize: "11px", color: "#d1d5db", marginTop: "48px" }}>
                    struxly.app · The AI website builder
                </p>
            </div>
        </div>
    );
}
