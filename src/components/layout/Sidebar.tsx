'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Image as ImageIcon, BarChart3, Settings, CreditCard } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function Sidebar() {
    const pathname = usePathname();
    const { profile: userData, loading } = useAuth();

    const links = [
        { name: 'Projects', href: '/dashboard', icon: LayoutDashboard },
        { name: '8 Industry Templates', href: '/templates', icon: Users },
        { name: 'Assets', href: '/assets', icon: ImageIcon },
        { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    ];

    return (
        <div className="fixed left-0 top-0 h-full w-64 bg-white/60 backdrop-blur-xl border-r border-gray-200/50 flex flex-col justify-between py-6 px-4 z-50">
            <div>
                <div className="px-2 mb-8">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <span className="font-bold text-2xl tracking-tighter text-gray-900">Struxly</span>
                        <span className="bg-gray-900 text-white text-[10px] px-1.5 py-0.5 rounded font-medium">BETA</span>
                    </Link>
                </div>

                <nav className="space-y-1">
                    {links.map((link) => {
                        const isActive = pathname.startsWith(link.href);
                        const Icon = link.icon;

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-gray-900/5 text-gray-900'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-gray-900' : 'text-gray-400'}`} />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100">
                {!loading && userData && (
                    <div className="px-3 py-3 bg-gradient-to-br from-indigo-50 to-blue-50/50 rounded-xl mb-4 border border-indigo-100/50">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-indigo-900/70 uppercase tracking-wider">Credits</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">
                                {userData.tier}
                            </span>
                        </div>
                        <div className="flex items-end gap-1">
                            <span className="text-2xl font-bold text-indigo-950 leading-none">
                                {userData.credit_balance}
                            </span>
                            <span className="text-xs text-indigo-900/60 font-medium mb-0.5">left</span>
                        </div>
                        {userData.credit_balance <= (userData.monthly_credits * 0.1) && (
                            <div className="mt-2 text-[10px] text-red-600 font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                Low Balance
                            </div>
                        )}
                    </div>
                )}

                <Link
                    href="/settings/billing"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    Billing & Usage
                </Link>
                <Link
                    href="/settings"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                    <Settings className="w-4 h-4 text-gray-400" />
                    Settings
                </Link>
                <Link
                    href="/brand"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                    <LayoutDashboard className="w-4 h-4 text-gray-400" />
                    Brand Assets
                </Link>
            </div>
        </div>
    );
}
