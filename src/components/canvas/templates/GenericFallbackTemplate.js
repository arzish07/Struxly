import React from "react";

export default function GenericFallbackTemplate({
    templateData,
    getElementClasses,
    handleElementClick,
    handleMouseEnter,
    handleMouseLeave
}) {
    return (
        <div className="min-h-full bg-white text-gray-900 font-sans">
            {/* Top Navigation */}
            <nav
                data-struxly-id="generic-nav"
                data-struxly-label="Navigation"
                className={`w-full py-5 px-8 flex items-center justify-between border-b border-gray-100 ${getElementClasses("generic-nav")}`}
                onClick={(e) => handleElementClick(e, "generic-nav", "Navigation")}
                onMouseEnter={() => handleMouseEnter("generic-nav")}
                onMouseLeave={handleMouseLeave}
            >
                <div className="text-xl font-bold tracking-tight">
                    {templateData?.title || "Brand."}
                </div>
                <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-gray-500">
                    <span className="hover:text-black cursor-pointer transition-colors">Features</span>
                    <span className="hover:text-black cursor-pointer transition-colors">Solutions</span>
                    <span className="hover:text-black cursor-pointer transition-colors">Pricing</span>
                </div>
                <button className="bg-black text-white px-5 py-2 text-[13px] font-medium rounded-full cursor-pointer hover:bg-gray-800 transition-colors">
                    Get Started
                </button>
            </nav>

            {/* Hero Section */}
            <section
                data-struxly-id="generic-hero"
                data-struxly-label="Hero Section"
                className={`relative py-32 px-6 flex flex-col items-center justify-center text-center ${getElementClasses("generic-hero")}`}
                onClick={(e) => handleElementClick(e, "generic-hero", "Hero Section")}
                onMouseEnter={() => handleMouseEnter("generic-hero")}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    data-struxly-id="generic-badge"
                    data-struxly-label="Hero Badge"
                    className={`inline-flex items-center gap-2 border border-gray-200 bg-gray-50 rounded-full px-4 py-1.5 mb-8 ${getElementClasses("generic-badge")}`}
                    onClick={(e) => handleElementClick(e, "generic-badge", "Hero Badge")}
                    onMouseEnter={() => handleMouseEnter("generic-badge")}
                    onMouseLeave={handleMouseLeave}
                >
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-[11px] font-medium text-gray-600">{templateData?.category || "Category"} Template</span>
                </div>

                <h1
                    data-struxly-id="generic-title"
                    data-struxly-label="Hero Title"
                    className={`text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto ${getElementClasses("generic-title")}`}
                    onClick={(e) => handleElementClick(e, "generic-title", "Hero Title")}
                    onMouseEnter={() => handleMouseEnter("generic-title")}
                    onMouseLeave={handleMouseLeave}
                >
                    {templateData?.fullTitle || "Build something amazing."}
                </h1>

                <p
                    data-struxly-id="generic-subtitle"
                    data-struxly-label="Hero Subtitle"
                    className={`text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 ${getElementClasses("generic-subtitle")}`}
                    onClick={(e) => handleElementClick(e, "generic-subtitle", "Hero Subtitle")}
                    onMouseEnter={() => handleMouseEnter("generic-subtitle")}
                    onMouseLeave={handleMouseLeave}
                >
                    {templateData?.fullDescription || "This layout dynamically maps the specific text from your selected template into a live, interactive preview."}
                </p>

                <div className="flex items-center gap-4">
                    <button
                        data-struxly-id="generic-cta-primary"
                        data-struxly-label="Primary CTA Button"
                        className={`bg-blue-600 text-white px-8 py-3.5 rounded-full font-medium hover:bg-blue-700 transition-colors ${getElementClasses("generic-cta-primary")}`}
                        onClick={(e) => handleElementClick(e, "generic-cta-primary", "Primary CTA Button")}
                        onMouseEnter={() => handleMouseEnter("generic-cta-primary")}
                        onMouseLeave={handleMouseLeave}
                    >
                        Start Building
                    </button>
                    <button
                        data-struxly-id="generic-cta-secondary"
                        data-struxly-label="Secondary CTA Button"
                        className={`bg-gray-100 text-gray-900 px-8 py-3.5 rounded-full font-medium hover:bg-gray-200 transition-colors ${getElementClasses("generic-cta-secondary")}`}
                        onClick={(e) => handleElementClick(e, "generic-cta-secondary", "Secondary CTA Button")}
                        onMouseEnter={() => handleMouseEnter("generic-cta-secondary")}
                        onMouseLeave={handleMouseLeave}
                    >
                        Learn More
                    </button>
                </div>
            </section>

            {/* Features Grid */}
            <section
                data-struxly-id="generic-features"
                data-struxly-label="Features Grid"
                className={`py-24 px-8 bg-gray-50 ${getElementClasses("generic-features")}`}
                onClick={(e) => handleElementClick(e, "generic-features", "Features Grid")}
                onMouseEnter={() => handleMouseEnter("generic-features")}
                onMouseLeave={handleMouseLeave}
            >
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold mb-4">Core Capabilities</h2>
                        <p className="text-gray-500">{templateData?.aboutText || "Everything you need to succeed."}</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {(templateData?.features || ["Feature 1", "Feature 2", "Feature 3", "Feature 4"]).map((feature, idx) => (
                            <div
                                key={idx}
                                data-struxly-id={`generic-feature-${idx}`}
                                data-struxly-label={`Feature Card ${idx + 1}`}
                                className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm ${getElementClasses(`generic-feature-${idx}`)}`}
                                onClick={(e) => handleElementClick(e, `generic-feature-${idx}`, `Feature Card ${idx + 1}`)}
                                onMouseEnter={() => handleMouseEnter(`generic-feature-${idx}`)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                                    ★
                                </div>
                                <h3 className="font-semibold text-lg mb-2">{feature}</h3>
                                <p className="text-[13px] text-gray-500">Leverage powerful tools designed specifically for your brand's unique needs.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
