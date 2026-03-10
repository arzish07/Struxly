"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import {
    ChevronLeft,
    Settings,
    Globe,
    BookOpen,
    Users,
    CreditCard,
    Cloud,
    Shield,
    User,
    FlaskConical,
    Link2,
    Github,
} from "lucide-react";

function SettingsSidebar() {
    const pathname = usePathname();
    const isActive = (path) => pathname === path;

    const linkClass = (path) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all w-full ${isActive(path) ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`;

    return (
        <aside className="w-[220px] h-full border-r border-gray-200 flex flex-col bg-white py-6 px-3 flex-shrink-0">
            <Link href="/portal" className="flex items-center gap-2 text-[13px] text-gray-500 hover:text-gray-700 transition-colors mb-6 px-3">
                <ChevronLeft className="w-3.5 h-3.5" /> Go back
            </Link>

            <div className="space-y-6 flex-1">
                <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Project</p>
                    <div className="space-y-0.5">
                        <Link href="/portal/settings" className={linkClass("/portal/settings")}>
                            <Settings className="w-4 h-4" /> Project settings
                        </Link>
                        <Link href="/portal/settings/domains" className={linkClass("/portal/settings/domains")}>
                            <Globe className="w-4 h-4" /> Domains
                        </Link>
                        <Link href="/portal/settings/knowledge" className={linkClass("/portal/settings/knowledge")}>
                            <BookOpen className="w-4 h-4" /> Knowledge
                        </Link>
                    </div>
                </div>

                <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Workspace</p>
                    <div className="space-y-0.5">
                        <Link href="/portal/settings/workspace" className={linkClass("/portal/settings/workspace")}>
                            <User className="w-4 h-4" /> Struxly Workspace
                        </Link>
                        <Link href="/portal/settings/people" className={linkClass("/portal/settings/people")}>
                            <Users className="w-4 h-4" /> People
                        </Link>
                        <Link href="/portal/settings/plans" className={linkClass("/portal/settings/plans")}>
                            <CreditCard className="w-4 h-4" /> Plans & credits
                        </Link>
                        <Link href="/portal/settings/cloud" className={linkClass("/portal/settings/cloud")}>
                            <Cloud className="w-4 h-4" /> Cloud & AI balance
                        </Link>
                        <Link href="/portal/settings/security" className={linkClass("/portal/settings/security")}>
                            <Shield className="w-4 h-4" /> Privacy & security
                        </Link>
                    </div>
                </div>

                <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Account</p>
                    <div className="space-y-0.5">
                        <Link href="/portal/settings/profile" className={linkClass("/portal/settings/profile")}>
                            <User className="w-4 h-4" /> Profile
                        </Link>
                        <Link href="/portal/settings/labs" className={linkClass("/portal/settings/labs")}>
                            <FlaskConical className="w-4 h-4" /> Labs
                        </Link>
                    </div>
                </div>

                <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Connectors</p>
                    <div className="space-y-0.5">
                        <Link href="/portal/settings/connectors" className={linkClass("/portal/settings/connectors")}>
                            <Link2 className="w-4 h-4" /> Connectors
                        </Link>
                        <Link href="/portal/settings/github" className={linkClass("/portal/settings/github")}>
                            <Github className="w-4 h-4" /> GitHub
                        </Link>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default function SettingsLayout({ children }) {
    return (
        <SubscriptionProvider>
            <div className="flex h-screen bg-white overflow-hidden">
                <SettingsSidebar />
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </SubscriptionProvider>
    );
}
