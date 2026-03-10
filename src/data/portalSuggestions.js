"use client";

/**
 * Generates contextually relevant action chips for the user's dashboard
 * based on their project history and state.
 * 
 * @param {Array} projects - Array of user's projects
 * @param {Object} recentProject - The most recently edited project 
 * @returns {Array} - Array of suggestion strings (max 4-5)
 */
export function getPortalSuggestions(projects = [], recentProject = null) {
    const suggestions = [];

    // State 1: New User (No Projects)
    if (projects.length === 0) {
        return [
            "Build a landing page",
            "Create a portfolio",
            "Start an ecommerce store",
            "Design a dashboard",
            "Generate a blog"
        ];
    }

    // State 2: Returning User
    // Always suggest continuing their latest work if they have one
    if (recentProject) {
        suggestions.push(`Continue editing ${recentProject.title || recentProject.name || "your project"}`);
    }

    // Add generic prompts to create new things
    suggestions.push("Create a new project", "Explore templates");

    // Suggest publishing if they have projects but none are published
    // (Assuming projects might have a 'published' or 'url' flag in the future)
    const hasPublished = projects.some(p => p.isPublished || p.url);
    if (!hasPublished && projects.length > 0) {
        suggestions.push("Publish your first site");
    }

    // Suggest connecting domains if they have many projects
    if (projects.length >= 3) {
        suggestions.push("Connect a custom domain");
    }

    // Pad with inspiring generic ideas if we don't have many structural suggestions
    const extraIdeas = [
        "Design a SaaS dashboard",
        "Build a waiting list landing page",
        "Create a creative agency portfolio",
        "Generate a real estate listing site",
        "Design a modern dark-mode blog",
        "Build a web3 landing page"
    ];

    for (const idea of extraIdeas) {
        if (!suggestions.includes(idea)) {
            suggestions.push(idea);
        }
    }

    // Deduplicate and return up to 8
    return [...new Set(suggestions)].slice(0, 8);
}
