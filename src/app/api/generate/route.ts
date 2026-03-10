import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_INSTRUCTION = `
You are Struxly's AI Web Developer — an elite fullstack engineer.

RESPONSE FORMAT (strict JSON, no markdown blocks):
{
  "message": "Conversational summary of what you did. Be descriptive!",
  "code": "Full React component code or null",
  "suggestions": ["2-6 word actionable next steps"],
  "codeAnalysis": {
    "hasNavbar": false, "hasHero": false, "hasFooter": false,
    "hasCTA": false, "hasContactForm": false, "hasPricing": false,
    "hasTestimonials": false, "hasImages": false, "isMobileResponsive": false,
    "hasAnimations": false, "hasDarkMode": false, "pageCount": 1
  }
}

INTELLIGENCE RULES:
1. ANALYZE the current code deeply. What sections exist? What's missing?
2. Suggestions MUST be based on what's MISSING, not random ideas.
   - No hero? → "Add a hero section"
   - No footer? → "Add a site footer"
   - No mobile? → "Make it responsive"
   - Has everything? → "Add scroll animations", "Optimize performance"
3. Return the FULL component when changing code. Use Tailwind + Lucide React.
4. Make every design feel PREMIUM — use gradients, shadows, subtle animations.
5. Never use alert() or window.alert(). Use href="#" or smooth scroll.
6. Code must be production-quality: semantic HTML, accessibility, proper heading hierarchy.
7. If no code change needed, set "code" to null.
8. The "codeAnalysis" object tells the frontend what the current code contains — always fill it accurately.
`;

const PLAN_INSTRUCTION = `
You are an expert Software Architect for Struxly.

RESPONSE FORMAT (strict JSON, no markdown blocks):
{
  "message": "A detailed architectural plan in Markdown format. Explain the approach, components needed, and any state/props changes.",
  "code": null
}

CRITICAL RULES:
1. You are in PLAN mode. DO NOT output any React code inside the "code" block. ALWAYS set "code" to null.
2. Provide a thorough, easy to read, bulleted plan inside the "message" block.
`;

function sanitizeCode(code: string | null) {
  if (!code) return null;
  let clean = code;
  if (clean.includes('use client')) {
    clean = clean.replace(/^.*?use client.*?$/m, '"use client";');
  }
  return clean;
}

export async function POST(req: NextRequest) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { prompt, currentCode, selectedElement, projectId, historyContext, isPlanMode, attachedImages, attachedImage, userId } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ error: "UserId is required for authorization and credits." }, { status: 401 });
    }

    // Determine the main instruction based on mode
    const systemInstruction = isPlanMode ? PLAN_INSTRUCTION : SYSTEM_INSTRUCTION;

    // Compose the user message
    let userPromptText = `User Prompt: """\n${prompt}\n"""`;

    if (currentCode) {
      userPromptText += `\n\n--- CURRENT REACT COMPONENT CODE ---\n\`\`\`jsx\n${currentCode}\n\`\`\``;
    } else {
      userPromptText += `\n\n--- CURRENT STATE ---\nNo code exists yet. Provide a complete, fully functional React component from scratch. Make sure to include "use client"; at the top if using hooks or interactivity.`;
    }

    if (historyContext) {
      userPromptText += `\n\n${historyContext}`;
    }

    if (selectedElement) {
      userPromptText += `\n\nThe user has selected the element labeled "${selectedElement.label}". Focus your changes primarily on or around this element if applicable.`;
    }

    const messages: any[] = [
      { role: "system", content: systemInstruction },
      { role: "user", content: userPromptText }
    ];

    // Handle image attachments (Vision) — supports both array (new) and single string (legacy)
    const allImages: string[] = [];
    if (attachedImages && Array.isArray(attachedImages) && attachedImages.length > 0) {
      allImages.push(...attachedImages);
    } else if (attachedImage && typeof attachedImage === 'string') {
      allImages.push(attachedImage);
    }

    if (allImages.length > 0) {
      const imageContentParts: any[] = [
        { type: "text", text: `Here ${allImages.length === 1 ? 'is an image' : `are ${allImages.length} images`} attached by the user as visual reference:` },
      ];
      for (const imgUrl of allImages) {
        imageContentParts.push({ type: "image_url", image_url: { url: imgUrl } });
      }
      messages.push({ role: "user", content: imageContentParts });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-5.3-chat-latest",
      messages: messages,
      response_format: { type: "json_object" }
    });

    let text = response.choices[0].message.content || "";

    // Clean up potential markdown blocks the model might incorrectly include
    if (text.startsWith("\`\`\`")) {
      const match = text.match(/\`\`\`(?:json)?\s*([\s\S]*?)\s*\`\`\`/);
      if (match) {
        text = match[1];
      }
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse OpenAI JSON:", text, parseError);
      return NextResponse.json(
        { message: "Received an invalid response format from the AI.", code: null, suggestions: [] },
        { status: 500 }
      );
    }

    // Clean up code output
    if (parsedResponse.code) {
      let cleanCode = parsedResponse.code;
      if (cleanCode.startsWith('\`\`\`')) {
        const match = cleanCode.match(/\`\`\`(?:jsx|tsx|javascript|typescript)?\s*([\s\S]*?)\s*\`\`\`/);
        if (match) cleanCode = match[1];
      }
      parsedResponse.code = sanitizeCode(cleanCode);
    }

    return NextResponse.json(parsedResponse);
  } catch (error: any) {
    console.error("Generation API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response. Please try again.", details: error.message },
      { status: 500 }
    );
  }
}
