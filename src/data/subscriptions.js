export const PLANS = {
    free: {
        id: "free",
        name: "Free",
        price: 0,
        interval: "month",
        maxSites: 1,
        maxEdits: 50,
        features: [
            "1 website",
            "50 AI edits / month",
            "Community templates",
            "Struxly subdomain",
        ],
        gated: ["shopifyExport", "customDomains", "teamWorkspace", "advancedTemplates"],
    },
    starter: {
        id: "starter",
        name: "Starter",
        price: 19,
        interval: "month",
        maxSites: 3,
        maxEdits: 300,
        features: [
            "3 websites",
            "300 AI edits / month",
            "Template Library",
            "Struxly subdomain",
            "Priority support",
        ],
        gated: ["shopifyExport", "customDomains", "teamWorkspace"],
    },
    pro: {
        id: "pro",
        name: "Pro",
        price: 49,
        interval: "month",
        popular: true,
        maxSites: 10,
        maxEdits: 1200,
        features: [
            "10 websites",
            "1,200 AI edits / month",
            "Advanced Templates",
            "Shopify Export",
            "Custom Domains",
            "Analytics Dashboard",
        ],
        gated: ["teamWorkspace"],
    },
    studio: {
        id: "studio",
        name: "Studio",
        price: 99,
        interval: "month",
        maxSites: Infinity,
        maxEdits: 4000,
        features: [
            "Unlimited websites",
            "4,000 AI edits / month",
            "Team Workspace",
            "White-label Export",
            "Dedicated Support",
            "All Pro features",
        ],
        gated: [],
    },
};

export const TOPUP_OPTIONS = [
    { credits: 100, price: 5, label: "100 credits", popular: false },
    { credits: 500, price: 10, label: "500 credits", popular: true },
    { credits: 1500, price: 25, label: "1,500 credits", popular: false },
];

export function getPlan(planId) {
    return PLANS[planId] || PLANS.free;
}

export function isFeatureGated(planId, feature) {
    const plan = getPlan(planId);
    return plan.gated.includes(feature);
}
