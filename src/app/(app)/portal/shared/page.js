"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Folder } from "lucide-react";

export default function SharedWithMePage() {
    return (
        <div className="h-full overflow-y-auto flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-[400px] px-6"
            >
                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
                    <Folder className="w-7 h-7 text-gray-400" />
                </div>
                <h2 className="text-[20px] font-bold text-gray-900 mb-2 leading-snug">
                    Projects you are invited to will appear here
                </h2>
                <div className="mt-6">
                    <Link
                        href="/portal"
                        className="inline-flex items-center px-5 py-2.5 text-[13px] font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Start building
                    </Link>
                </div>

                {/* Decorative illustration */}
                <div className="mt-10 relative w-[280px] h-[180px] mx-auto">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[200px] h-[130px] rounded-2xl bg-gradient-to-br from-violet-200 via-purple-100 to-amber-100 transform rotate-[-8deg] shadow-lg" />
                        <div className="w-[200px] h-[130px] rounded-2xl bg-gradient-to-br from-emerald-100 via-cyan-100 to-violet-200 transform rotate-[5deg] shadow-lg absolute" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
