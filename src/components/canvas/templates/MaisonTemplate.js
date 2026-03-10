import React from "react";

export default function MaisonTemplate({
    getElementClasses,
    handleElementClick,
    handleMouseEnter,
    handleMouseLeave
}) {
    return (
        <div className="min-h-full bg-black text-white font-serif">
            {/* Top Navigation Bar */}
            <nav
                data-struxly-id="maison-nav"
                data-struxly-label="Navigation"
                className={`w-full py-6 px-12 top-0 z-50 flex items-center justify-between ${getElementClasses("maison-nav")}`}
                onClick={(e) => handleElementClick(e, "maison-nav", "Navigation")}
                onMouseEnter={() => handleMouseEnter("maison-nav")}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flex items-center gap-8 text-[11px] font-sans tracking-widest text-white/50 uppercase">
                    <span className="cursor-pointer hover:text-white transition-colors">Collection</span>
                    <span className="cursor-pointer hover:text-white transition-colors">Archive</span>
                    <span className="cursor-pointer hover:text-white transition-colors">Editorial</span>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl tracking-[0.2em] font-normal cursor-pointer">
                    AETERNA
                </div>
                <div className="flex items-center gap-6">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/60 hover:text-white cursor-pointer transition-colors"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div className="relative cursor-pointer group">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/60 group-hover:text-white transition-colors"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        <span className="absolute -top-2 -right-3 bg-amber-600 text-[9px] font-sans h-4 min-w-[16px] flex items-center justify-center rounded-full text-white/90">0</span>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section
                data-struxly-id="maison-hero"
                data-struxly-label="Hero Section"
                className={`relative min-h-[500px] flex flex-col items-center justify-center text-center px-4 pt-16 pb-24 ${getElementClasses("maison-hero")}`}
                onClick={(e) => handleElementClick(e, "maison-hero", "Hero Section")}
                onMouseEnter={() => handleMouseEnter("maison-hero")}
                onMouseLeave={handleMouseLeave}
            >
                {/* Subtle soft gradient glowing behind text */}
                <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_50%_40%,_rgba(180,140,80,0.15),_transparent_60%)]"></div>

                <div
                    data-struxly-id="maison-badge"
                    data-struxly-label="Hero Badge"
                    className={`inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-8 ${getElementClasses("maison-badge")}`}
                    onClick={(e) => handleElementClick(e, "maison-badge", "Hero Badge")}
                    onMouseEnter={() => handleMouseEnter("maison-badge")}
                    onMouseLeave={handleMouseLeave}
                >
                    <span className="text-amber-500">✦</span>
                    <span className="text-[9px] font-sans tracking-[0.2em] text-white/50 uppercase">New Fall Collection</span>
                </div>

                <h1
                    data-struxly-id="maison-title"
                    data-struxly-label="Hero Title"
                    className={`text-6xl md:text-7xl lg:text-[5rem] leading-[1.1] font-medium tracking-tight mb-8 max-w-4xl mx-auto ${getElementClasses("maison-title")}`}
                    onClick={(e) => handleElementClick(e, "maison-title", "Hero Title")}
                    onMouseEnter={() => handleMouseEnter("maison-title")}
                    onMouseLeave={handleMouseLeave}
                >
                    THE ART OF <br />ENDURING <br />
                    <span className="italic font-light text-white/80">STYLE</span>
                </h1>

                <p
                    data-struxly-id="maison-subtitle"
                    data-struxly-label="Hero Subtitle"
                    className={`max-w-xl mx-auto text-[13px] font-sans font-light leading-relaxed text-white/40 mb-12 ${getElementClasses("maison-subtitle")}`}
                    onClick={(e) => handleElementClick(e, "maison-subtitle", "Hero Subtitle")}
                    onMouseEnter={() => handleMouseEnter("maison-subtitle")}
                    onMouseLeave={handleMouseLeave}
                >
                    Crafted for the modern connoisseur. Experience a curation of timeless silhouettes draped in the finest textiles.
                </p>

                <button
                    data-struxly-id="maison-cta"
                    data-struxly-label="CTA Button"
                    className={`flex items-center gap-3 border border-white/20 rounded-full px-8 py-3.5 hover:bg-white hover:text-black transition-all ${getElementClasses("maison-cta")}`}
                    onClick={(e) => handleElementClick(e, "maison-cta", "CTA Button")}
                    onMouseEnter={() => handleMouseEnter("maison-cta")}
                    onMouseLeave={handleMouseLeave}
                >
                    <span className="text-[10px] font-sans tracking-[0.2em] uppercase origin-center">Discover Collection</span>
                    <span>→</span>
                </button>
            </section>
        </div>
    );
}
