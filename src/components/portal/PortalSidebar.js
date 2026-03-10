"use client";

import { useState, useRef, useEffect, memo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    Search,
    BookOpen,
    Settings,
    Grid,
    Star,
    User,
    Users,
    Moon,
    HelpCircle,
    FileText,
    LogOut,
    PanelLeftClose,
    PanelLeftOpen,
    Plus,
    Globe,
    ChevronDown,
    ChevronRight,
    LayoutGrid,
    Gift,
    QrCode,
    Zap,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { useProjects } from "@/context/ProjectContext";
import SearchModal from "@/components/portal/SearchModal";
import ShareModal from "@/components/portal/ShareModal";
import InviteMembersModal from "@/components/portal/InviteMembersModal";
import CreateWorkspaceModal from "@/components/portal/CreateWorkspaceModal";

const WorkspaceDropdown = memo(function WorkspaceDropdown({ user, collapsed }) {
    const [open, setOpen] = useState(false);
    const [showInvite, setShowInvite] = useState(false);
    const [showCreateWorkspace, setShowCreateWorkspace] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const { profile: userData, setProfile } = useAuth();
    const displayName = user?.displayName || "User";

    const router = useRouter();

    return (
        <div ref={ref} className="relative w-full">
            <button
                onClick={() => setOpen(!open)}
                className={`flex items-center w-full rounded-lg hover:bg-gray-100 transition-colors text-left ${collapsed ? 'justify-center p-2' : 'gap-2 px-2 py-1.5'}`}
                title={collapsed ? `${displayName}'s Struxly` : undefined}
            >
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                    {displayName[0]?.toUpperCase() || "S"}
                </div>
                {!collapsed && (
                    <>
                        <span className="text-[13px] font-semibold text-gray-900 truncate flex-1">
                            {displayName}&apos;s Struxly
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
                    </>
                )}
            </button>

            <AnimatePresence>
                {open && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, x: collapsed ? -4 : 0, y: collapsed ? 0 : -4 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0, x: collapsed ? -4 : 0, y: collapsed ? 0 : -4 }}
                            transition={{ duration: 0.12 }}
                            className={`absolute z-50 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden min-w-[260px] ${collapsed ? 'top-0 left-full ml-3' : 'top-full left-0 right-0 mt-1'}`}
                        >
                            {/* Workspace Info */}
                            <div className="px-4 py-3 border-b border-gray-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-5 h-5 rounded bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-[8px] font-bold">
                                        {displayName[0]?.toUpperCase()}
                                    </div>
                                    <span className="text-[13px] font-semibold text-gray-900">{displayName}&apos;s Struxly</span>
                                </div>
                                <p className="text-[11px] text-gray-400">Free Plan · 1 member</p>
                            </div>

                            {/* Quick Links */}
                            <div className="py-1">
                                <Link href="/portal/settings" onClick={() => setOpen(false)} className="flex items-center gap-2.5 px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors">
                                    <Settings className="w-3.5 h-3.5 text-gray-400" /> Settings
                                </Link>
                                <button
                                    onClick={() => { setOpen(false); setShowInvite(true); }}
                                    className="flex items-center gap-2.5 px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors w-full text-left"
                                >
                                    <Users className="w-3.5 h-3.5 text-gray-400" /> Invite members
                                </button>
                            </div>

                            {/* Credits */}
                            <div className="border-t border-gray-100 px-4 py-3">
                                <div className="flex items-center gap-1.5 mb-2">
                                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                                    <span className="text-[12px] font-semibold text-gray-700">Turn Pro</span>
                                    <Link href="/portal/settings/plans" onClick={() => setOpen(false)} className="ml-auto text-[11px] font-bold bg-orange-500 text-white px-2.5 py-0.5 rounded-md hover:bg-orange-600 transition-colors pointer-events-auto">
                                        Upgrade
                                    </Link>
                                </div>

                                {/* Clickable Credits Area */}
                                {/* Clickable Credits Area */}
                                {(() => {
                                    const credits = userData?.editCredits || 0;
                                    const percentage = Math.min(100, Math.max(0, (credits / 50) * 100));
                                    const bgColor = credits < 10 ? 'bg-red-500' : credits < 25 ? 'bg-amber-500' : 'bg-blue-500';
                                    const groupHoverBgColor = credits < 10 ? 'group-hover:bg-red-600' : credits < 25 ? 'group-hover:bg-amber-600' : 'group-hover:bg-blue-600';

                                    return (
                                        <div
                                            onClick={() => {
                                                setOpen(false);
                                                router.push("/portal/settings/plans");
                                            }}
                                            className="cursor-pointer group hover:bg-gray-50 -mx-2 px-2 py-1.5 rounded-lg transition-colors"
                                        >
                                            <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1.5 group-hover:text-gray-900 transition-colors">
                                                <span>Credits</span>
                                                <span className="font-medium">{credits} left <ChevronRight className="w-3 h-3 inline" /></span>
                                            </div>
                                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-500 ease-out ${bgColor} ${groupHoverBgColor}`}
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                            <p className="text-[10px] text-gray-400 mt-1.5">● Credits renew automatically every month</p>
                                        </div>
                                    );
                                })()}
                            </div>

                            {/* All Workspaces */}
                            <div className="border-t border-gray-100 py-2">
                                <p className="px-4 text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">All workspaces</p>
                                <button className="flex items-center gap-2.5 px-4 py-2 w-full text-left hover:bg-gray-50 transition-colors">
                                    <div className="w-5 h-5 rounded bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-[8px] font-bold">
                                        {displayName[0]?.toUpperCase()}
                                    </div>
                                    <span className="text-[12px] font-medium text-gray-700">{displayName}&apos;s Struxly</span>
                                    <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-medium">FREE</span>
                                    <span className="ml-auto text-green-500 text-xs">✓</span>
                                </button>
                                <button
                                    onClick={() => { setOpen(false); setShowCreateWorkspace(true); }}
                                    className="flex items-center gap-2.5 px-4 py-2 w-full text-left text-[12px] text-gray-500 hover:bg-gray-50 transition-colors"
                                >
                                    <Plus className="w-3.5 h-3.5" /> Create new workspace
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Modals */}
            {showInvite && <InviteMembersModal onClose={() => setShowInvite(false)} />}
            {showCreateWorkspace && <CreateWorkspaceModal onClose={() => setShowCreateWorkspace(false)} />}
        </div>
    );
});

const UserMenu = memo(function UserMenu({ user, onSignOut, collapsed }) {
    const [open, setOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const [theme, setTheme] = useState("light");
    const ref = useRef(null);

    useEffect(() => {
        const saved = localStorage.getItem("struxly_theme") || "light";
        setTheme(saved);
        applyTheme(saved);
    }, []);

    const applyTheme = (mode) => {
        const root = document.documentElement;
        if (mode === "system") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            root.classList.toggle("dark", prefersDark);
        } else {
            root.classList.toggle("dark", mode === "dark");
        }
    };

    const changeTheme = (mode) => {
        setTheme(mode);
        localStorage.setItem("struxly_theme", mode);
        applyTheme(mode);
    };

    useEffect(() => {
        if (theme !== "system") return;
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e) => {
            document.documentElement.classList.toggle("dark", e.matches);
        };
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, [theme]);

    useEffect(() => {
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
                setActiveSubmenu(null);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const SubmenuHeader = ({ title, onBack }) => (
        <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 mb-1">
            <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 rotate-180" />
            </button>
            <span className="text-[12px] font-semibold text-gray-900">{title}</span>
        </div>
    );

    const menuVariants = {
        initial: { opacity: 0, x: collapsed ? -4 : 0, y: collapsed ? 0 : 4, scale: 0.98 },
        animate: { opacity: 1, x: 0, y: 0, scale: 1 },
        exit: { opacity: 0, x: collapsed ? -4 : 0, y: collapsed ? 0 : 4, scale: 0.98 }
    };

    return (
        <div ref={ref} className="relative w-full">
            <button
                onClick={() => { setOpen(!open); setActiveSubmenu(null); }}
                className={`flex items-center w-full rounded-lg hover:bg-gray-100 transition-colors text-left ${collapsed ? 'justify-center p-2' : 'gap-2 px-2 py-1.5'}`}
                title={collapsed ? user?.displayName || "User" : undefined}
            >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-[9px] font-bold overflow-hidden shrink-0">
                    {user?.photoURL ? (
                        <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
                    ) : (
                        (user?.displayName?.[0] || "U").toUpperCase()
                    )}
                </div>
                {!collapsed && (
                    <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-medium text-gray-700 truncate leading-tight">{user?.displayName || "User"}</p>
                        <p className="text-[10px] text-gray-400 truncate leading-tight">{user?.email || "user@example.com"}</p>
                    </div>
                )}
            </button>

            <AnimatePresence>
                {open && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => { setOpen(false); setActiveSubmenu(null); }} />
                        <motion.div
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            variants={menuVariants}
                            transition={{ duration: 0.12 }}
                            className={`absolute z-50 bg-white rounded-xl border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-1 overflow-hidden min-w-[240px] ${collapsed ? 'bottom-0 left-full ml-3' : 'bottom-full left-0 right-0 mb-1'}`}
                        >
                            <AnimatePresence mode="wait">
                                {!activeSubmenu ? (
                                    <motion.div
                                        key="main"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        transition={{ duration: 0.1 }}
                                    >
                                        <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-[11px] font-bold overflow-hidden shrink-0">
                                                {user?.photoURL ? <img src={user.photoURL} alt="" /> : (user?.displayName?.[0] || "U").toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[13px] font-semibold text-gray-900 truncate leading-tight">{user?.displayName || "User"}</p>
                                                <p className="text-[11px] text-gray-400 truncate leading-tight">{user?.email || "user@example.com"}</p>
                                            </div>
                                        </div>

                                        <div className="py-1">
                                            <Link href="/portal/settings" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors">
                                                <User className="w-4 h-4 text-gray-400" /> Profile
                                            </Link>
                                            <Link href="/portal/settings" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors">
                                                <Settings className="w-4 h-4 text-gray-400" /> Settings
                                                <span className="ml-auto text-[10px] text-gray-300 font-mono">Ctrl+.</span>
                                            </Link>
                                        </div>

                                        <div className="border-t border-gray-100 py-1">
                                            <button onClick={() => setActiveSubmenu('appearance')} className="flex items-center gap-3 px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors w-full text-left">
                                                <Moon className="w-4 h-4 text-gray-400" /> Appearance
                                                <ChevronRight className="w-3.5 h-3.5 text-gray-300 ml-auto" />
                                            </button>
                                            <button onClick={() => setActiveSubmenu('support')} className="flex items-center gap-3 px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors w-full text-left">
                                                <HelpCircle className="w-4 h-4 text-gray-400" /> Support
                                                <ChevronRight className="w-3.5 h-3.5 text-gray-300 ml-auto" />
                                            </button>
                                            <button onClick={() => setActiveSubmenu('documentation')} className="flex items-center gap-3 px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors w-full text-left">
                                                <BookOpen className="w-4 h-4 text-gray-400" /> Documentation
                                                <ChevronRight className="w-3.5 h-3.5 text-gray-300 ml-auto" />
                                            </button>
                                        </div>

                                        <div className="border-t border-gray-100 py-1">
                                            <Link href="/community" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors">
                                                <Globe className="w-4 h-4 text-gray-400" /> Community
                                            </Link>
                                            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors">
                                                <Home className="w-4 h-4 text-gray-400" /> Homepage
                                            </Link>
                                        </div>

                                        <div className="border-t border-gray-100 py-1">
                                            <button
                                                onClick={() => { onSignOut(); setOpen(false); }}
                                                className="flex items-center gap-3 px-4 py-2 text-[13px] text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                                            >
                                                <LogOut className="w-4 h-4" /> Sign out
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : activeSubmenu === 'appearance' ? (
                                    <motion.div
                                        key="appearance"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ duration: 0.1 }}
                                    >
                                        <SubmenuHeader title="Appearance" onBack={() => setActiveSubmenu(null)} />
                                        <div className="p-2 space-y-1">
                                            <div className="flex gap-2 p-1 mb-2">
                                                <button onClick={() => changeTheme('light')} className={`flex-1 aspect-[4/3] rounded-md bg-white overflow-hidden flex flex-col cursor-pointer transition-all ${theme === 'light' ? 'border-2 border-indigo-500 shadow-sm' : 'border border-gray-200 hover:border-gray-300'}`}>
                                                    <div className="h-6 bg-indigo-500/5 border-b border-indigo-500/10" />
                                                    <div className="flex-1 flex gap-1 p-1">
                                                        <div className="w-3 bg-indigo-500/5 rounded" />
                                                        <div className="flex-1 bg-white rounded border border-indigo-500/10" />
                                                    </div>
                                                </button>
                                                <button onClick={() => changeTheme('dark')} className={`flex-1 aspect-[4/3] rounded-md bg-[#020817] overflow-hidden flex flex-col cursor-pointer transition-all ${theme === 'dark' ? 'border-2 border-indigo-500 shadow-sm' : 'border border-gray-700 hover:border-gray-500'}`}>
                                                    <div className="h-6 bg-gray-900 border-b border-gray-800" />
                                                    <div className="flex-1 flex gap-1 p-1">
                                                        <div className="w-3 bg-gray-900 rounded" />
                                                        <div className="flex-1 bg-gray-950 rounded border border-gray-800" />
                                                    </div>
                                                </button>
                                                <button onClick={() => changeTheme('system')} className={`flex-1 aspect-[4/3] rounded-md bg-gray-100 overflow-hidden flex flex-col cursor-pointer transition-all ${theme === 'system' ? 'border-2 border-indigo-500 shadow-sm' : 'border border-gray-200 hover:border-gray-300 opacity-60 hover:opacity-80'}`}>
                                                    <div className="h-6 bg-gray-200 border-b border-gray-300" />
                                                    <div className="flex-1 flex gap-1 p-1">
                                                        <div className="w-3 bg-gray-200 rounded" />
                                                        <div className="flex-1 bg-gray-50 rounded border border-gray-300" />
                                                    </div>
                                                </button>
                                            </div>
                                            <button onClick={() => changeTheme('light')} className={`w-full flex items-center justify-between px-3 py-1.5 text-[13px] rounded-md font-medium transition-colors ${theme === 'light' ? 'text-indigo-600 bg-indigo-50/50' : 'text-gray-600 hover:bg-gray-50'}`}>
                                                Light {theme === 'light' && <span className="text-indigo-400">✓</span>}
                                            </button>
                                            <button onClick={() => changeTheme('dark')} className={`w-full flex items-center justify-between px-3 py-1.5 text-[13px] rounded-md font-medium transition-colors ${theme === 'dark' ? 'text-indigo-600 bg-indigo-50/50' : 'text-gray-600 hover:bg-gray-50'}`}>
                                                Dark {theme === 'dark' && <span className="text-indigo-400">✓</span>}
                                            </button>
                                            <button onClick={() => changeTheme('system')} className={`w-full flex items-center justify-between px-3 py-1.5 text-[13px] rounded-md font-medium transition-colors ${theme === 'system' ? 'text-indigo-600 bg-indigo-50/50' : 'text-gray-600 hover:bg-gray-50'}`}>
                                                System {theme === 'system' && <span className="text-indigo-400">✓</span>}
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : activeSubmenu === 'support' ? (
                                    <motion.div
                                        key="support"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ duration: 0.1 }}
                                    >
                                        <SubmenuHeader title="Support" onBack={() => setActiveSubmenu(null)} />
                                        <div className="py-1">
                                            <Link href="/support" onClick={() => { setOpen(false); setActiveSubmenu(null); }} className="block w-full text-left px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors">Help center</Link>
                                            <button className="w-full text-left px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors">Report abuse</button>
                                            <button className="w-full text-left px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors">Status</button>
                                        </div>
                                    </motion.div>
                                ) : activeSubmenu === 'documentation' ? (
                                    <motion.div
                                        key="docs"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ duration: 0.1 }}
                                    >
                                        <SubmenuHeader title="Documentation" onBack={() => setActiveSubmenu(null)} />
                                        <div className="py-1">
                                            <Link href="/docs" onClick={() => { setOpen(false); setActiveSubmenu(null); }} className="w-full text-left px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2.5">
                                                <FileText className="w-3.5 h-3.5 text-gray-400" /> Documentation
                                            </Link>
                                            <Link href="/terms" onClick={() => { setOpen(false); setActiveSubmenu(null); }} className="block w-full text-left px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors">Terms & privacy</Link>
                                            <Link href="/changelog" onClick={() => { setOpen(false); setActiveSubmenu(null); }} className="block w-full text-left px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors">Changelog</Link>
                                            <Link href="/security" onClick={() => { setOpen(false); setActiveSubmenu(null); }} className="block w-full text-left px-4 py-2 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors">Security</Link>
                                        </div>
                                    </motion.div>
                                ) : null}
                            </AnimatePresence>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
});

export default function PortalSidebar() {
    const pathname = usePathname();
    const { user, signOut } = useAuth();
    const { currentPlan } = useSubscription();
    const { projects } = useProjects();
    const [projectsOpen, setProjectsOpen] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("struxly_sidebar_open");
        if (saved !== null) {
            setSidebarOpen(saved === "true");
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("struxly_sidebar_open", sidebarOpen);
        }
    }, [sidebarOpen, mounted]);

    // Ctrl+K shortcut for search
    useEffect(() => {
        function handleKeyDown(e) {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setSearchOpen(prev => !prev);
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const isActive = (path) => pathname === path;

    const navLinkClass = (path) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${isActive(path)
            ? "bg-gray-100 text-gray-900"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`;

    if (!mounted) return <aside className="w-[248px] h-screen bg-white border-r border-gray-200 flex-shrink-0" />;

    const recentProjects = (projects || []).slice(0, 5);

    const textClass = `transition-all overflow-hidden whitespace-nowrap ${sidebarOpen ? 'opacity-100 ml-3 duration-300 delay-100' : 'w-0 opacity-0 m-0 duration-150'}`;

    return (
        <>
            <motion.aside
                initial={false}
                animate={{ width: sidebarOpen ? 248 : 60 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-screen flex flex-col bg-[#fcfcf9] border-r border-[#ecece9] flex-shrink-0 z-50"
            >
                <div className={`flex items-center pt-3 pb-2 transition-all duration-300 ${sidebarOpen ? 'justify-between px-3' : 'justify-center'}`}>
                    {sidebarOpen && (
                        <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
                            <img src="/logo-symbol.png" alt="Struxly" className="w-[20px] h-[20px] object-contain ml-1" />
                        </Link>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className={`relative flex items-center justify-center rounded-md hover:bg-black/5 text-gray-400 hover:text-gray-900 transition-colors group ${sidebarOpen ? 'p-1.5' : 'w-8 h-8'}`}
                        title={sidebarOpen ? "Close sidebar (Ctrl+B)" : "Open sidebar (Ctrl+B)"}
                    >
                        {sidebarOpen ? (
                            <PanelLeftClose className="w-4 h-4" />
                        ) : (
                            <>
                                <img src="/logo-symbol.png" alt="Struxly" className="w-[20px] h-[20px] object-contain absolute transition-opacity duration-200 group-hover:opacity-0" />
                                <PanelLeftOpen className="w-[18px] h-[18px] stroke-[2] absolute opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                            </>
                        )}
                    </button>
                </div>

                {/* Workspace Dropdown */}
                <div className={`py-2 transition-all ${sidebarOpen ? 'px-3' : 'px-1'}`}>
                    <WorkspaceDropdown user={user} collapsed={!sidebarOpen} />
                </div>

                {/* Navigation */}
                <nav className={`flex-1 overflow-y-auto py-2 space-y-0.5 transition-all ${sidebarOpen ? 'px-3 cursor-default' : 'px-2 overflow-x-hidden scrollbar-hide'}`}>
                    <Link href="/portal" className={navLinkClass("/portal")} title={!sidebarOpen ? "Home" : undefined}>
                        <Home className="w-4 h-4 shrink-0" />
                        <span className={textClass}>Home</span>
                    </Link>
                    <button onClick={() => setSearchOpen(true)} className={navLinkClass("")} title={!sidebarOpen ? "Search" : undefined}>
                        <Search className="w-4 h-4 shrink-0" />
                        <span className={textClass}>Search</span>
                    </button>
                    <Link href="/portal/resources" className={navLinkClass("/portal/resources")} title={!sidebarOpen ? "Resources" : undefined}>
                        <BookOpen className="w-4 h-4 shrink-0" />
                        <span className={textClass}>Resources</span>
                    </Link>

                    {/* Projects section */}
                    <div className="pt-3">
                        {sidebarOpen ? (
                            <button
                                onClick={() => setProjectsOpen(!projectsOpen)}
                                className="flex items-center justify-between w-full px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600 transition-colors"
                            >
                                <span className={textClass}>Projects</span>
                                <ChevronDown className={`w-3 h-3 transition-transform ${projectsOpen ? "" : "-rotate-90"}`} />
                            </button>
                        ) : (
                            <div className="w-full text-center py-1">
                                <div className="h-[1px] w-6 bg-gray-200 mx-auto" />
                            </div>
                        )}

                        {(projectsOpen || !sidebarOpen) && (
                            <div className="space-y-0.5 mt-0.5">
                                <Link href="/portal/projects" className={navLinkClass("/portal/projects")} title={!sidebarOpen ? "All projects" : undefined}>
                                    <LayoutGrid className="w-4 h-4 shrink-0" />
                                    <span className={textClass}>All projects</span>
                                </Link>
                                <Link href="/portal/starred" className={navLinkClass("/portal/starred")} title={!sidebarOpen ? "Starred" : undefined}>
                                    <Star className="w-4 h-4 shrink-0" />
                                    <span className={textClass}>Starred</span>
                                </Link>
                                <Link href="/portal/created" className={navLinkClass("/portal/created")} title={!sidebarOpen ? "Created by me" : undefined}>
                                    <User className="w-4 h-4 shrink-0" />
                                    <span className={textClass}>Created by me</span>
                                </Link>
                                <Link href="/portal/shared" className={navLinkClass("/portal/shared")} title={!sidebarOpen ? "Shared with me" : undefined}>
                                    <Users className="w-4 h-4 shrink-0" />
                                    <span className={textClass}>Shared with me</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Recents */}
                    <div className="pt-3">
                        {sidebarOpen ? (
                            <p className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                                <span className={textClass}>Recents</span>
                            </p>
                        ) : (
                            <div className="w-full text-center py-1">
                                <div className="h-[1px] w-6 bg-gray-200 mx-auto" />
                            </div>
                        )}

                        <div className="space-y-0.5 mt-0.5">
                            {recentProjects.length > 0 ? (
                                recentProjects.map((p) => (
                                    <Link
                                        key={p.id}
                                        href={`/canvas?projectId=${p.id}&project=${encodeURIComponent(p.title)}&template=${p.templateSlug || "nexus-flow"}`}
                                        className={navLinkClass(`/canvas?project=${encodeURIComponent(p.title)}`)}
                                        title={!sidebarOpen ? p.title : undefined}
                                    >
                                        <FileText className="w-4 h-4 shrink-0" />
                                        <span className={textClass}>{p.title}</span>
                                    </Link>
                                ))
                            ) : (
                                <button className={navLinkClass("")} title={!sidebarOpen ? "My First Site" : undefined}>
                                    <FileText className="w-4 h-4 shrink-0" />
                                    <span className={textClass}>My First Site</span>
                                </button>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Bottom Section */}
                <div className={`border-t border-gray-100 transition-all ${sidebarOpen ? 'p-3 space-y-1.5' : 'p-1 space-y-1'}`}>
                    {/* Share Struxly */}
                    <button
                        onClick={() => setShareOpen(true)}
                        className={`flex items-center rounded-lg hover:bg-gray-50 transition-colors ${sidebarOpen ? 'w-full px-3 py-2 justify-between' : 'justify-center p-2 w-full mx-auto'}`}
                        title={!sidebarOpen ? "Share Struxly" : undefined}
                    >
                        <div className="flex items-center">
                            <Gift className="w-4 h-4 text-gray-500 shrink-0" />
                            <div className={textClass}>
                                <p className="text-[13px] font-semibold text-gray-800 text-left">Share Struxly</p>
                                <p className="text-[10px] text-gray-400 text-left">100 credits per paid referral</p>
                            </div>
                        </div>
                        {sidebarOpen && <QrCode className="w-4 h-4 text-gray-300 shrink-0" />}
                    </button>

                    {/* Upgrade to Pro */}
                    <Link
                        href="/portal/settings/plans"
                        className={`flex items-center rounded-lg hover:bg-gray-50 transition-colors ${sidebarOpen ? 'w-full px-3 py-2 justify-between' : 'justify-center p-2 w-full mx-auto'}`}
                        title={!sidebarOpen ? "Upgrade to Pro" : undefined}
                    >
                        <div className="flex items-center">
                            <Zap className="w-4 h-4 text-green-500 shrink-0" />
                            <div className={textClass}>
                                <p className="text-[13px] font-semibold text-gray-800 text-left">Upgrade to Pro</p>
                                <p className="text-[10px] text-gray-400 text-left">Unlock more benefits</p>
                            </div>
                        </div>
                        {sidebarOpen && <Zap className="w-4 h-4 text-green-400 shrink-0" />}
                    </Link>

                    {/* User Menu at bottom */}
                    <div className={`pt-1 ${sidebarOpen ? 'border-t border-gray-100' : ''}`}>
                        <UserMenu user={user} onSignOut={signOut} collapsed={!sidebarOpen} />
                    </div>
                </div>
            </motion.aside>

            {/* Modals */}
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
            <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} />
        </>
    );
}
