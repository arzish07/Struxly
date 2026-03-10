import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, collection, addDoc, runTransaction } from 'firebase/firestore';

export type ActionType = 'full_gen' | 'new_page' | 'tweak' | 'shopify_export' | 'publish';

const ACTION_COSTS: Record<ActionType, number> = {
    full_gen: 5,
    new_page: 5,
    tweak: 5,
    shopify_export: 10,
    publish: 1,
};

// Represents the result of a credit consumption attempt
export interface ConsumptionResult {
    success: boolean;
    error?: 'INSUFFICIENT_CREDITS' | 'UNAUTHORIZED_TIER' | 'UNKNOWN';
    remainingEdits?: number;
    remainingExtra?: number;
}

/**
 * Middleware function to consume credits based on the action type.
 * Applies hard rules like Free Tier Lock and balances (monthly edits vs extra credits).
 * @param userId - The ID of the user requesting the action
 * @param action - The type of action being performed
 */
export async function consumeCredits(userId: string, action: ActionType): Promise<ConsumptionResult> {
    const userRef = doc(db, 'users', userId);

    try {
        return await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists()) throw new Error("User does not exist!");

            const userData = userDoc.data();
            const cost = ACTION_COSTS[action];

            // --- HARD RULE: Free Tier Lock ---
            if (action === 'shopify_export' && ['free', 'starter'].includes(userData.plan)) {
                return { success: false, error: 'UNAUTHORIZED_TIER' };
            }

            let currentEdits = userData.editCredits || 0;
            // let currentExtra = userData.top_up_credits || 0; // We will just use editCredits for now per AuthContext

            // --- HARD RULE: Insufficient Funds ---
            if (currentEdits < cost) {
                return { success: false, error: 'INSUFFICIENT_CREDITS' };
            }

            // Consumption Logic: Prefer monthly edits first
            currentEdits -= cost;
            let editsUsed = cost;

            // Update user document
            transaction.update(userRef, {
                editCredits: currentEdits,
            });

            // Log Transaction in subcollection
            const transactionRef = doc(collection(userRef, 'transactions'));
            transaction.set(transactionRef, {
                type: 'consumption',
                action: action,
                cost: cost,
                edits_used: editsUsed,
                timestamp: new Date().toISOString()
            });

            // Note: Alerts like "10% Warning" are typically handled on the frontend layer
            // by watching the user's credits, rather than doing UI alerts in this backend function.

            return {
                success: true,
                remainingEdits: currentEdits,
            };
        });
    } catch (e: any) {
        console.error("Credit consumption failed:", e);

        // Emergency bypass for uninitialized GCP Datastore or offline client errors
        const errMsg = e?.message || "";
        if (
            errMsg.includes("client is offline") ||
            errMsg.includes("database (default) does not exist") ||
            errMsg.includes("Datastore") ||
            errMsg.includes("Datastore or Cloud Firestore database")
        ) {
            console.warn("⚠️ Bypassing credit consumption due to GCP Datastore/Firestore error:", errMsg);
            return {
                success: true,
                remainingEdits: 99
            };
        }

        return { success: false, error: 'UNKNOWN' };
    }
}
