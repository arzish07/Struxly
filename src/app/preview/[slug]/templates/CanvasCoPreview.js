"use client";

export default function CanvasCoPreview({ template }) {
    return (
        <div style={{ margin: 0, padding: 0, fontFamily: "'Inter', system-ui, sans-serif", backgroundColor: "#fefdfb", color: "#1a1a1a", minHeight: "100vh" }}>
            {/* Navigation */}
            <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 48px", borderBottom: "1px solid #f0ece4" }}>
                <h1 style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.03em" }}>Canvas & Co.</h1>
                <div style={{ display: "flex", gap: "28px", fontSize: "13px", color: "#666", fontWeight: 500 }}>
                    <span style={{ cursor: "pointer" }}>Work</span>
                    <span style={{ cursor: "pointer" }}>Services</span>
                    <span style={{ cursor: "pointer" }}>About</span>
                    <span style={{ cursor: "pointer" }}>Contact</span>
                </div>
                <button style={{ padding: "10px 24px", background: "#1a1a1a", color: "#fff", borderRadius: "99px", border: "none", fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>Start a project</button>
            </nav>

            {/* Hero */}
            <section style={{ padding: "100px 48px 80px", maxWidth: "900px" }}>
                <p style={{ fontSize: "13px", color: "#999", fontWeight: 500, marginBottom: "20px" }}>Creative Studio — Est. 2019</p>
                <h2 style={{ fontSize: "56px", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "28px" }}>
                    We design brands that<br />
                    <span style={{ color: "#c9a96e" }}>feel alive.</span>
                </h2>
                <p style={{ fontSize: "17px", color: "#666", lineHeight: 1.7, maxWidth: "560px" }}>
                    A boutique creative studio specializing in brand identity, web design, and visual storytelling for forward-thinking companies.
                </p>
            </section>

            {/* Selected Work Grid */}
            <section style={{ padding: "40px 48px 80px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
                    <h3 style={{ fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#999" }}>Selected Work</h3>
                    <span style={{ fontSize: "13px", color: "#c9a96e", fontWeight: 500, cursor: "pointer" }}>View all →</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                    {[
                        { title: "Bloom Botanics", cat: "Brand Identity", bg: "linear-gradient(135deg, #2d5a3d, #4a7c5c)" },
                        { title: "Volta Motors", cat: "Web Design", bg: "linear-gradient(135deg, #1a1a2e, #2d2d44)" },
                        { title: "Solstice Cafe", cat: "Packaging", bg: "linear-gradient(135deg, #c49a6c, #e0c097)" },
                        { title: "Alto Audio", cat: "Digital Campaign", bg: "linear-gradient(135deg, #4a1942, #6b2d5b)" },
                    ].map((work, i) => (
                        <div key={i} style={{ borderRadius: "16px", overflow: "hidden", cursor: "pointer", transition: "transform 0.3s" }}>
                            <div style={{ aspectRatio: "16/10", background: work.bg, display: "flex", alignItems: "flex-end", padding: "28px" }}>
                                <div>
                                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>{work.cat}</p>
                                    <h4 style={{ fontSize: "20px", fontWeight: 600, color: "#fff" }}>{work.title}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services */}
            <section style={{ padding: "80px 48px", background: "#f8f5ef" }}>
                <h3 style={{ fontSize: "32px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "48px" }}>What we do</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
                    {[
                        { title: "Brand Strategy", desc: "We define your brand's DNA — positioning, voice, and visual direction." },
                        { title: "Web Design", desc: "Beautiful, conversion-focused websites that reflect your brand essence." },
                        { title: "Visual Identity", desc: "Logo systems, typography, and color palettes that make you unforgettable." },
                    ].map((s, i) => (
                        <div key={i} style={{ background: "#fff", borderRadius: "16px", padding: "32px" }}>
                            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#f0ece4", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                                {["🎯", "🖥️", "🎨"][i]}
                            </div>
                            <h4 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "10px" }}>{s.title}</h4>
                            <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.6 }}>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: "48px", borderTop: "1px solid #f0ece4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", fontWeight: 600 }}>Canvas & Co.</span>
                <span style={{ fontSize: "12px", color: "#999" }}>© 2025. All rights reserved.</span>
            </footer>
        </div>
    );
}
