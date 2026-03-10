"use client";

import { use } from "react";
import { templates } from "@/data/templates";

// Template page components
import MaisonPreview from "./templates/MaisonPreview";
import NexusFlowPreview from "./templates/NexusFlowPreview";
import CanvasCoPreview from "./templates/CanvasCoPreview";
import EstatePreview from "./templates/EstatePreview";
import PureSkinPreview from "./templates/PureSkinPreview";
import ArtisanPreview from "./templates/ArtisanPreview";
import Studio26Preview from "./templates/Studio26Preview";
import ForgeIronPreview from "./templates/ForgeIronPreview";

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

export default function PreviewPage({ params }) {
    const resolvedParams = use(params);
    const slug = resolvedParams.slug;
    const template = templates.find(t => t.slug === slug);
    const TemplateComponent = templateComponents[slug];

    if (!template || !TemplateComponent) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Template not found</h1>
                    <p className="text-gray-500">The requested template preview does not exist.</p>
                </div>
            </div>
        );
    }

    return <TemplateComponent template={template} />;
}
