'use client';

import { useAuth } from '@/context/AuthContext';
import { User, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function SettingsPage() {
    const { user, profile: userData } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    if (!user) return <div className="p-12 text-center text-gray-500">Please log in to view your settings.</div>;

    return (
        <div className="max-w-4xl mx-auto p-8 lg:p-12">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
                <p className="text-gray-500">Manage your profile and subscription preferences.</p>
            </header>

            <section className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm mb-8">
                <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold">
                            {user.displayName?.charAt(0) || <User className="w-8 h-8" />}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">{user.displayName}</h2>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors flex items-center gap-2"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>

                <div className="p-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Plan</h3>

                    <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-gray-900 text-lg capitalize">{userData?.tier || 'Free'} Plan</span>
                                {userData?.is_subscriber && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">Active</span>}
                            </div>
                            <p className="text-sm text-gray-500">
                                {userData?.edit_credits || 0} AI Edits remaining this month.
                            </p>
                        </div>
                        <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm shadow-indigo-200">
                            Upgrade Plan
                        </button>
                    </div>
                </div>
            </section>

            {/* Top-Up section is handled globally or can be added here later */}

        </div>
    );
}
