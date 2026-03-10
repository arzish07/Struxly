import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const TEMPLATE_MAP = {
    "the-maison": "MaisonPreview.js",
    "nexus-flow": "NexusFlowPreview.js",
    "canvas-co": "CanvasCoPreview.js",
    "the-estate": "EstatePreview.js",
    "pure-skin": "PureSkinPreview.js",
    "the-artisan": "ArtisanPreview.js",
    "studio-26": "Studio26Preview.js",
    "forge-iron": "ForgeIronPreview.js",
};

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const fileName = TEMPLATE_MAP[slug];

        if (!fileName) {
            return NextResponse.json({ error: "Template not found" }, { status: 404 });
        }

        const filePath = path.join(
            process.cwd(),
            "src",
            "app",
            "preview",
            "[slug]",
            "templates",
            fileName
        );

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: "Template file not found" }, { status: 404 });
        }

        const code = fs.readFileSync(filePath, "utf-8");

        return NextResponse.json({ code });
    } catch (error) {
        console.error("Template Fetch Error:", error);
        return NextResponse.json({ error: "Failed to fetch template source" }, { status: 500 });
    }
}
