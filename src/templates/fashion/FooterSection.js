"use client";

export default function FooterSection({ brandName }) {
    return (
        <footer
            data-struxly-id="fashion-footer"
            data-struxly-label="Footer Section"
            className="glass rounded-2xl p-8"
        >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h3 className="text-sm font-bold text-white">
                        {brandName || "FASHION HOUSE"}
                    </h3>
                    <p className="text-[10px] text-slate-500 mt-1">
                        Redefining modern elegance since 2024
                    </p>
                </div>
                <div className="flex items-center gap-6">
                    {["Instagram", "TikTok", "Pinterest", "Twitter"].map((social) => (
                        <a
                            key={social}
                            href="#"
                            className="text-[10px] text-slate-500 hover:text-white transition-colors uppercase tracking-wider"
                        >
                            {social}
                        </a>
                    ))}
                </div>
                <p className="text-[10px] text-slate-600">
                    © 2026 {brandName || "Fashion House"}. Built with{" "}
                    <span className="gradient-text font-medium">Struxly.ai</span>
                </p>
            </div>
        </footer>
    );
}
