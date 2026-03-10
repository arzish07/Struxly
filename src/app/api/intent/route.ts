import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const SYSTEM_INSTRUCTION = `
You are an expert AI Project Manager for Struxly.
Your job is to analyze a user's prompt to determine if it is ambiguous or complex enough to require clarifying questions before a developer can build it.

You MUST respond in a valid JSON object format ONLY.

IF THE PROMPT NEEDS CLARIFICATION (e.g., "Build an ecommerce store", "Create a CRM", "Make a travel agency site"):
{
  "requiresQuestions": true,
  "intent": {
    "title": "A short, descriptive title for the project (e.g., 'E-commerce Setup')",
    "questions": [
      {
        "id": "short_unique_id",
        "title": "The multiple choice question to ask",
        "subtitle": "Select one answer",
        "type": "radio",
        "options": [
          { "id": "opt1", "label": "Option 1 Label", "description": "Short explanation" },
          { "id": "opt2", "label": "Option 2 Label", "description": "Short explanation" }
        ]
      }
    ],
    "buildSteps": [
      "Step 1 to show in the UI progress tracker",
      "Step 2 to show in the UI progress tracker",
      "Step 3 to show in the UI progress tracker"
    ]
  }
}

IF THE PROMPT IS SIMPLE AND SPECIFIC (e.g., "Make the button red", "Add a footer", "Change the title to Hello"):
{
  "requiresQuestions": false,
  "intent": null
}

CRITICAL RULES:
1. ONLY return valid JSON. Do not include markdown blocks (\`\`\`json).
2. If returning questions, provide 1 to 3 questions max. They must be highly relevant multiple-choice questions that dictate the architecture/features of what they are asking for.
3. If returning questions, provide 3-5 logical \`buildSteps\` that represent how the app will be built structurally.
`;

export async function POST(req: NextRequest) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-5.3-chat-latest",
      messages: [
        { role: "system", content: SYSTEM_INSTRUCTION },
        { role: "user", content: `USER PROMPT: ${prompt}` }
      ],
      response_format: { type: "json_object" }
    });

    let text = response.choices[0].message.content || "";

    // Clean up markdown block if present
    if (text.startsWith("```")) {
      const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (match) {
        text = match[1];
      }
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse OpenAI intent JSON:", text);
      return NextResponse.json({ requiresQuestions: false, intent: null });
    }

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error("Intent API Error:", error);
    // Fallback to building directly if the AI check fails
    return NextResponse.json({ requiresQuestions: false, intent: null });
  }
}
