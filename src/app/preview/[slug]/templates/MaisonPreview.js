"use client";

export default function MaisonPreview({ template }) {
    return (
        <div style={{ margin: 0, padding: 0, fontFamily: "'Playfair Display', 'Georgia', serif", backgroundColor: "#0a0a0a", color: "#f5f0eb", minHeight: "100vh" }}>
            {/* Navigation */}
            <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 48px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", gap: "32px", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,240,235,0.5)" }}>
                    <span style={{ cursor: "pointer" }}>Collection</span>
                    <span style={{ cursor: "pointer" }}>Archive</span>
                    <span style={{ cursor: "pointer" }}>Editorial</span>
                </div>
                <h1 style={{ fontSize: "22px", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 400, color: "#f5f0eb" }}>
                    AETERNA
                </h1>
                <div style={{ display: "flex", gap: "20px", alignItems: "center", color: "rgba(245,240,235,0.5)" }}>
                    <span style={{ cursor: "pointer", fontSize: "14px" }}>🔍</span>
                    <span style={{ cursor: "pointer", fontSize: "14px", position: "relative" }}>
                        🛒
                        <span style={{ position: "absolute", top: "-6px", right: "-8px", background: "#4ade80", color: "#000", fontSize: "9px", borderRadius: "50%", width: "14px", height: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", fontWeight: 700 }}>0</span>
                    </span>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={{ textAlign: "center", padding: "120px 48px 100px", position: "relative" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "999px", padding: "8px 20px", marginBottom: "48px", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,235,0.6)" }}>
                    <span style={{ color: "#f59e0b" }}>✦</span> NEW FALL COLLECTION
                </div>

                <h2 style={{ fontSize: "min(8vw, 96px)", lineHeight: 0.95, fontWeight: 400, marginBottom: "32px", fontStyle: "normal" }}>
                    <span style={{ display: "block", fontFamily: "'Playfair Display', Georgia, serif" }}>THE ART OF</span>
                    <span style={{ display: "block", fontFamily: "'Playfair Display', Georgia, serif" }}>ENDURING</span>
                    <span style={{ display: "block", fontStyle: "italic", fontFamily: "'Playfair Display', Georgia, serif" }}>STYLE</span>
                </h2>

                <p style={{ fontSize: "14px", color: "rgba(245,240,235,0.45)", maxWidth: "600px", margin: "0 auto 48px", lineHeight: 1.8, fontFamily: "system-ui, sans-serif" }}>
                    Crafted for the modern connoisseur. Experience a curation of timeless silhouettes draped in the finest textiles.
                </p>

                <button style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "16px 40px", border: "1px solid rgba(245,240,235,0.2)", borderRadius: "0", background: "transparent", color: "#f5f0eb", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", fontFamily: "system-ui, sans-serif", transition: "all 0.3s" }}>
                    DISCOVER COLLECTION <span>→</span>
                </button>
            </section>

            {/* Featured Products Grid */}
            <section style={{ padding: "80px 48px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
                    {["Midnight Overcoat", "Silk Drape Blouse", "Tailored Trousers"].map((name, i) => (
                        <div key={i} style={{ position: "relative", aspectRatio: "3/4", background: `linear-gradient(135deg, ${["#1a1a2e, #16213e", "#2d2d44, #1a1a2e", "#16213e, #0f3460"][i]})`, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "32px", cursor: "pointer" }}>
                            <p style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,240,235,0.4)", marginBottom: "8px", fontFamily: "system-ui, sans-serif" }}>Fall '25</p>
                            <h3 style={{ fontSize: "18px", fontWeight: 400, letterSpacing: "0.05em" }}>{name}</h3>
                            <p style={{ fontSize: "14px", color: "rgba(245,240,235,0.5)", marginTop: "4px", fontFamily: "system-ui, sans-serif" }}>$1,{(i + 2) * 100 + 50}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* About Section */}
            <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", padding: "100px 48px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div>
                    <p style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,235,0.4)", marginBottom: "24px", fontFamily: "system-ui, sans-serif" }}>Our Philosophy</p>
                    <h3 style={{ fontSize: "36px", lineHeight: 1.2, fontWeight: 400, marginBottom: "24px" }}>
                        Where Heritage Meets<br /><span style={{ fontStyle: "italic" }}>Modern Elegance</span>
                    </h3>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <p style={{ fontSize: "15px", lineHeight: 1.9, color: "rgba(245,240,235,0.5)", fontFamily: "system-ui, sans-serif" }}>
                        Born from a reverence for craftsmanship, AETERNA represents the convergence of artisanal tradition and contemporary design. Each piece is a meditation on form, texture, and the enduring power of understated luxury.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(245,240,235,0.3)", fontFamily: "system-ui, sans-serif" }}>© 2025 AETERNA</span>
                <div style={{ display: "flex", gap: "24px", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,240,235,0.3)", fontFamily: "system-ui, sans-serif" }}>
                    <span style={{ cursor: "pointer" }}>Instagram</span>
                    <span style={{ cursor: "pointer" }}>Pinterest</span>
                    <span style={{ cursor: "pointer" }}>Newsletter</span>
                </div>
            </footer>
        </div>
    );
}
