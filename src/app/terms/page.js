"use client";

import Link from "next/link";

export default function TermsPage() {
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
                <h1 className="text-[36px] font-bold text-gray-900 mb-2">Terms of Service</h1>
                <p className="text-[13px] text-gray-400 mb-10">Last updated: March 1, 2026</p>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-[18px] font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                        <p className="text-[14px] text-gray-600 leading-relaxed">By accessing or using Struxly, you agree to be bound by these Terms of Service. If you do not agree, you may not use the service.</p>
                    </section>
                    <section>
                        <h2 className="text-[18px] font-bold text-gray-900 mb-3">2. Account Registration</h2>
                        <p className="text-[14px] text-gray-600 leading-relaxed">You must provide accurate information when creating an account. You are responsible for maintaining the security of your account credentials.</p>
                    </section>
                    <section>
                        <h2 className="text-[18px] font-bold text-gray-900 mb-3">3. Subscription & Billing</h2>
                        <p className="text-[14px] text-gray-600 leading-relaxed">Paid plans are billed monthly or annually. You can cancel at any time, and your subscription will remain active until the end of the current billing period. Refunds are available within 14 days of purchase.</p>
                    </section>
                    <section>
                        <h2 className="text-[18px] font-bold text-gray-900 mb-3">4. Content Ownership</h2>
                        <p className="text-[14px] text-gray-600 leading-relaxed">You retain ownership of all content you create using Struxly. We do not claim any rights to your websites, designs, or code generated through our platform.</p>
                    </section>
                    <section>
                        <h2 className="text-[18px] font-bold text-gray-900 mb-3">5. Acceptable Use</h2>
                        <p className="text-[14px] text-gray-600 leading-relaxed">You may not use Struxly for illegal activities, spam, malware distribution, or any purpose that violates applicable laws. We reserve the right to suspend accounts that violate these terms.</p>
                    </section>
                    <section>
                        <h2 className="text-[18px] font-bold text-gray-900 mb-3">6. Limitation of Liability</h2>
                        <p className="text-[14px] text-gray-600 leading-relaxed">Struxly is provided "as is" without warranty. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.</p>
                    </section>
                    <section>
                        <h2 className="text-[18px] font-bold text-gray-900 mb-3">7. Contact</h2>
                        <p className="text-[14px] text-gray-600 leading-relaxed">For questions about these terms, contact legal@struxly.ai.</p>
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
