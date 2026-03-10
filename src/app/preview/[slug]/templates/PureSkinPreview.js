"use client";

export default function PureSkinPreview({ template }) {
    return (
        <div style={{ margin: 0, padding: 0, fontFamily: "'Inter', system-ui, sans-serif", backgroundColor: "#faf7f4", color: "#3d3027", minHeight: "100vh" }}>
            {/* Navigation */}
            <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 48px", background: "#fff" }}>
                <h1 style={{ fontSize: "20px", fontWeight: 300, letterSpacing: "0.15em", color: "#8b6f5c" }}>PURE SKIN</h1>
                <div style={{ display: "flex", gap: "28px", fontSize: "13px", color: "#999", fontWeight: 400 }}>
                    <span style={{ cursor: "pointer" }}>Shop</span>
                    <span style={{ cursor: "pointer" }}>Ingredients</span>
                    <span style={{ cursor: "pointer" }}>Routines</span>
                    <span style={{ cursor: "pointer" }}>About</span>
                </div>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <span style={{ fontSize: "13px", color: "#8b6f5c", cursor: "pointer" }}>🔍</span>
                    <span style={{ fontSize: "13px", color: "#8b6f5c", cursor: "pointer" }}>🛒</span>
                </div>
            </nav>

            {/* Hero */}
            <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "560px" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 48px 80px 48px" }}>
                    <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c4a882", marginBottom: "20px", fontWeight: 500 }}>Natural · Organic · Sustainable</p>
                    <h2 style={{ fontSize: "48px", fontWeight: 300, lineHeight: 1.15, marginBottom: "24px", letterSpacing: "-0.01em" }}>
                        Radiance From<br />
                        <span style={{ fontWeight: 500, color: "#8b6f5c" }}>Within</span>
                    </h2>
                    <p style={{ fontSize: "15px", color: "#999", lineHeight: 1.8, maxWidth: "420px", marginBottom: "36px" }}>
                        Clean beauty essentials crafted with botanical ingredients. Because your skin deserves only the purest care.
                    </p>
                    <button style={{ padding: "14px 32px", background: "#8b6f5c", color: "#fff", border: "none", borderRadius: "99px", fontSize: "12px", fontWeight: 600, cursor: "pointer", width: "fit-content", letterSpacing: "0.05em" }}>Shop the Collection</button>
                </div>
                <div style={{ background: "linear-gradient(135deg, #e8ddd0, #d4c5a9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "200px", height: "280px", background: "rgba(255,255,255,0.4)", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.6)" }} />
                </div>
            </section>

            {/* Products */}
            <section style={{ padding: "80px 48px" }}>
                <h3 style={{ fontSize: "28px", fontWeight: 300, marginBottom: "8px", textAlign: "center" }}>Bestsellers</h3>
                <p style={{ fontSize: "14px", color: "#999", textAlign: "center", marginBottom: "48px" }}>Our most loved products, chosen by you</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
                    {[
                        { name: "Hydrating Serum", price: "$48", cat: "Serum", color: "#e8ddd0" },
                        { name: "Rose Facial Oil", price: "$62", cat: "Oil", color: "#f0e6d9" },
                        { name: "Clay Mask", price: "$34", cat: "Mask", color: "#d4c5a9" },
                        { name: "Eye Cream", price: "$55", cat: "Eye Care", color: "#e0d4c3" },
                    ].map((p, i) => (
                        <div key={i} style={{ cursor: "pointer" }}>
                            <div style={{ aspectRatio: "3/4", background: p.color, borderRadius: "16px", marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <div style={{ width: "60px", height: "100px", background: "rgba(255,255,255,0.5)", borderRadius: "30px", border: "1px solid rgba(255,255,255,0.7)" }} />
                            </div>
                            <p style={{ fontSize: "11px", color: "#c4a882", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>{p.cat}</p>
                            <h4 style={{ fontSize: "15px", fontWeight: 500, marginBottom: "4px" }}>{p.name}</h4>
                            <span style={{ fontSize: "14px", color: "#8b6f5c", fontWeight: 600 }}>{p.price}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Ingredients Banner */}
            <section style={{ padding: "80px 48px", background: "#f0ece4", textAlign: "center" }}>
                <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c4a882", marginBottom: "16px" }}>Our Promise</p>
                <h3 style={{ fontSize: "32px", fontWeight: 300, marginBottom: "20px" }}>100% Natural Ingredients</h3>
                <p style={{ fontSize: "15px", color: "#888", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
                    Every product is formulated with plant-based, sustainably sourced ingredients. No parabens, no sulfates, no compromises.
                </p>
            </section>

            {/* Footer */}
            <footer style={{ padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #e8e2d9" }}>
                <span style={{ fontSize: "14px", fontWeight: 300, letterSpacing: "0.1em", color: "#8b6f5c" }}>PURE SKIN</span>
                <span style={{ fontSize: "11px", color: "#bbb" }}>© 2025 Pure Skin Co. All rights reserved.</span>
            </footer>
        </div>
    );
}
