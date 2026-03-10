"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "./AuthContext";
import { useNotifications } from "./NotificationContext";
import { getPlan, isFeatureGated } from "@/data/subscriptions";

const SubscriptionContext = createContext(null);

export function SubscriptionProvider({ children }) {
    const { user, profile } = useAuth();

    const currentPlan = getPlan(profile?.plan || "free");
    const editCredits = profile?.editCredits ?? 50;
    const maxCredits = profile?.maxEditCredits ?? 50;
    const sites = profile?.sites ?? 0;
    const maxSites = currentPlan.maxSites;

    // Derived values for notifications and UI feedback
    const creditPercentage = maxCredits > 0 ? Math.round((editCredits / maxCredits) * 100) : 0;
    const isLowCredits = editCredits > 0 && editCredits <= (maxCredits * 0.1); // 10% or less
    const isCriticalCredits = editCredits > 0 && editCredits <= 3; // 3 credits or less

    const { addNotification } = useNotifications();

    // Auto-trigger notifications
    useEffect(() => {
        if (!user) return;

        if (isCriticalCredits) {
            addNotification({
                type: "warning",
                title: "Critical: Almost out of credits",
                message: `You only have ${editCredits} credits left. Upgrade your plan to keep building without interruption.`,
                link: "/portal/settings/plans"
            });
        } else if (isLowCredits) {
            addNotification({
                type: "info",
                title: "Credits running low",
                message: `You are down to ${editCredits} credits (${creditPercentage}%). Consider unlocking unlimited generations.`,
                link: "/portal/settings/plans"
            });
        }
    }, [isLowCredits, isCriticalCredits, editCredits, user, addNotification, creditPercentage]);

    const decrementCredits = useCallback(async () => {
        if (!user || editCredits <= 0) return false;
        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { editCredits: increment(-1) });
            return true;
        } catch (err) {
            console.warn("⚠️ Failed to decrement credits:", err.message);
            return false;
        }
    }, [user, editCredits]);

    const topUpCredits = useCallback(
        async (amount) => {
            if (!user) return false;
            try {
                const userRef = doc(db, "users", user.uid);
                await updateDoc(userRef, {
                    editCredits: increment(amount),
                    maxEditCredits: increment(amount),
                });
                return true;
            } catch (err) {
                console.warn("⚠️ Failed to top up credits:", err.message);
                return false;
            }
        },
        [user]
    );

    const canExportShopify = !isFeatureGated(profile?.plan || "free", "shopifyExport");
    const canAddCustomDomain = !isFeatureGated(profile?.plan || "free", "customDomains");
    const canAccessTeamWorkspace = !isFeatureGated(profile?.plan || "free", "teamWorkspace");
    const hasCreditsRemaining = editCredits > 0;

    const value = {
        currentPlan,
        editCredits,
        maxCredits,
        sites,
        maxSites,
        creditPercentage,
        isLowCredits,
        isCriticalCredits,
        decrementCredits,
        topUpCredits,
        canExportShopify,
        canAddCustomDomain,
        canAccessTeamWorkspace,
        hasCreditsRemaining,
    };

    return (
        <SubscriptionContext.Provider value={value}>
            {children}
        </SubscriptionContext.Provider>
    );
}

export function useSubscription() {
    const context = useContext(SubscriptionContext);
    if (!context)
        throw new Error("useSubscription must be used within SubscriptionProvider");
    return context;
}
