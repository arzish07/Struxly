"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Lock, Server, Eye } from "lucide-react";

export default function SecurityPage() {
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
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-[36px] font-bold text-gray-900 mb-2">Security</h1>
                    <p className="text-[13px] text-gray-400 mb-10">Last updated: March 1, 2026</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {[
                        { icon: Shield, title: "Enterprise-grade Protection", desc: "Your data is protected with industry-leading security measures and regular audits." },
                        { icon: Lock, title: "Encryption", desc: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3) across our platform." },
                        { icon: Server, title: "Secure Infrastructure", desc: "Built on Google Cloud Platform with SOC 2 compliant infrastructure and 99.9% uptime." },
                        { icon: Eye, title: "Privacy by Design", desc: "We follow privacy-by-design principles and never sell your personal data to third parties." },
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.08 }}
                            className="border border-gray-200 rounded-2xl p-6"
                        >
                            <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
                                <item.icon className="w-5 h-5 text-gray-600" />
                            </div>
                            <h3 className="text-[15px] font-bold text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-[13px] text-gray-500 leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-[18px] font-bold text-gray-900 mb-3">1. Data Encryption</h2>
                        <p className="text-[14px] text-gray-600 leading-relaxed">All data stored on Struxly is encrypted using AES-256 encryption at rest. Data in transit between your browser and our servers is protected with TLS 1.3. We use Firebase Authentication for secure identity management with OAuth 2.0 and OpenID Connect protocols.</p>
                    </section>
                    <section>
                        <h2 className="text-[18px] font-bold text-gray-900 mb-3">2. Authentication & Access Control</h2>
                        <p className="text-[14px] text-gray-600 leading-relaxed">We support authentication via Google and GitHub OAuth. Session tokens are rotated regularly and stored securely. Role-based access control ensures team members only access resources they're authorized to use.</p>
                    </section>
                    <section>
                        <h2 className="text-[18px] font-bold text-gray-900 mb-3">3. Infrastructure Security</h2>
                        <p className="text-[14px] text-gray-600 leading-relaxed">Struxly is built on Google Cloud Platform, leveraging their SOC 2 Type II certified infrastructure. We employ Web Application Firewalls (WAF), DDoS protection, and automated vulnerability scanning. All production deployments go through our CI/CD pipeline with security checks.</p>
                    </section>
                    <section>
                        <h2 className="text-[18px] font-bold text-gray-900 mb-3">4. Data Retention & Deletion</h2>
                        <p className="text-[14px] text-gray-600 leading-relaxed">You can delete your account and all associated data at any time from your account settings. Upon account deletion, all your project data, assets, and personal information are permanently removed within 30 days. Backups are purged within 90 days.</p>
                    </section>
                    <section>
                        <h2 className="text-[18px] font-bold text-gray-900 mb-3">5. Responsible Disclosure</h2>
                        <p className="text-[14px] text-gray-600 leading-relaxed">If you discover a security vulnerability, please report it responsibly to security@struxly.ai. We take all reports seriously and will respond within 48 hours. We do not pursue legal action against researchers who follow responsible disclosure practices.</p>
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
