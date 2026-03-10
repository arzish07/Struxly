"use client";

import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white">
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-[1200px] mx-auto px-6 h-[60px] flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3"><img src="/logo-symbol.png" alt="" className="w-5 h-5" /><img src="/logo-word.png" alt="Struxly" className="h-[18px] w-auto" /></Link>
                    <div className="flex items-center gap-3">
                        <Link href="/login" className="px-4 py-2 text-[13px] font-medium text-gray-700">Log in</Link>
                        <Link href="/login" className="px-4 py-2 text-[13px] font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800">Get started</Link>
                    </div>
                </div>
            </nav>

            <article className="max-w-[700px] mx-auto px-6 py-20">
                <h1 className="text-[36px] font-bold text-gray-900 mb-2">Privacy Policy</h1>
                <p className="text-[13px] text-gray-400 mb-10">Last updated: March 1, 2026</p>

                <div className="prose prose-sm prose-gray max-w-none space-y-6">
                    <section>
                        <h2 className="text-[18px] font-bold text-gray-900 mb-3">1. Information We Collect</h2>
                        <p className="text-[14px] text-gray-600 leading-relaxed">We collect information you provide directly, such as your name, email address, and Google account details when you sign in. We also collect usage data including pages visited, features used, and AI prompt history to improve our service.</p>
                    </section>
                    <section>
                        <h2 className="text-[18px] font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
                        <p className="text-[14px] text-gray-600 leading-relaxed">We use your information to provide and improve Struxly services, manage your account, process subscriptions, send important updates, and analyze usage patterns. We do not sell your personal data to third parties.</p>
                    </section>
                    <section>
                        <h2 className="text-[18px] font-bold text-gray-900 mb-3">3. Data Storage & Security</h2>
                        <p className="text-[14px] text-gray-600 leading-relaxed">Your data is stored securely using Google Firebase infrastructure with encryption at rest and in transit. We implement industry-standard security measures to protect your information.</p>
                    </section>
                    <section>
                        <h2 className="text-[18px] font-bold text-gray-900 mb-3">4. Your Rights</h2>
                        <p className="text-[14px] text-gray-600 leading-relaxed">You can request access to, correction of, or deletion of your personal data at any time by contacting us at privacy@struxly.ai. You can also export your project data from within the platform.</p>
                    </section>
                    <section>
                        <h2 className="text-[18px] font-bold text-gray-900 mb-3">5. Contact Us</h2>
                        <p className="text-[14px] text-gray-600 leading-relaxed">For privacy-related inquiries, please contact us at privacy@struxly.ai. Our headquarters are located in Guwahati, India.</p>
                    </section>
                </div>
            </article>

            <footer className="border-t border-gray-100 py-8 px-6">
                <div className="max-w-[1200px] mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2"><img src="/logo-symbol.png" alt="" className="w-5 h-5" /><span className="text-[13px] font-semibold text-gray-900">Struxly</span></Link>
                    <p className="text-[11px] text-gray-300">HQ: Guwahati</p>
                </div>
            </footer>
        </div>
    );
}
