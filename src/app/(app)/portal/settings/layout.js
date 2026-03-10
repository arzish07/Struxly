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
                        <button className={`${linkClass("")}`}>
                            <BookOpen className="w-4 h-4" /> Knowledge
                        </button>
                    </div>
                </div>

                <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Workspace</p>
                    <div className="space-y-0.5">
                        <button className={`${linkClass("")}`}>
                            <User className="w-4 h-4" /> Struxly Workspace
                        </button>
                        <button className={`${linkClass("")}`}>
                            <Users className="w-4 h-4" /> People
                        </button>
                        <Link href="/portal/settings/plans" className={linkClass("/portal/settings/plans")}>
                            <CreditCard className="w-4 h-4" /> Plans & credits
                        </Link>
                        <Link href="/portal/settings/cloud" className={linkClass("/portal/settings/cloud")}>
                            <Cloud className="w-4 h-4" /> Cloud & AI balance
                        </Link>
                        <button className={`${linkClass("")}`}>
                            <Shield className="w-4 h-4" /> Privacy & security
                        </button>
                    </div>
                </div>

                <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Account</p>
                    <div className="space-y-0.5">
                        <button className={`${linkClass("")}`}>
                            <User className="w-4 h-4" /> Profile
                        </button>
                        <button className={`${linkClass("")}`}>
                            <FlaskConical className="w-4 h-4" /> Labs
                        </button>
                    </div>
                </div>

                <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Connectors</p>
                    <div className="space-y-0.5">
                        <button className={`${linkClass("")}`}>
                            <Link2 className="w-4 h-4" /> Connectors
                        </button>
                        <button className={`${linkClass("")}`}>
                            <Github className="w-4 h-4" /> GitHub
                        </button>
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
