"use client";

import { AuthProvider } from "@/context/AuthContext";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import PortalSidebar from "@/components/portal/PortalSidebar";

export default function PortalLayout({ children }) {
    return (
        <div className="flex h-screen bg-white overflow-hidden">
            <PortalSidebar />
            <main className="flex-1 overflow-hidden">
                {children}
            </main>
        </div>
    );
}
