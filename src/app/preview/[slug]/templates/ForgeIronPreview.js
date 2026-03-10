"use client";

export default function ForgeIronPreview({ template }) {
    return (
        <div style={{ margin: 0, padding: 0, fontFamily: "'Inter', system-ui, sans-serif", backgroundColor: "#1a1a1a", color: "#e5e5e5", minHeight: "100vh" }}>
            {/* Navigation */}
            <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 48px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "6px", background: "linear-gradient(135deg, #f59e0b, #d97706)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 800, color: "#1a1a1a" }}>F</div>
                    <span style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>Forge & Iron</span>
                </div>
                <div style={{ display: "flex", gap: "28px", fontSize: "13px", color: "rgba(229,229,229,0.4)", fontWeight: 500 }}>
                    <span style={{ cursor: "pointer" }}>Products</span>
                    <span style={{ cursor: "pointer" }}>Collections</span>
                    <span style={{ cursor: "pointer" }}>Workshop</span>
                    <span style={{ cursor: "pointer" }}>About</span>
                </div>
                <button style={{ padding: "10px 24px", background: "#f59e0b", color: "#1a1a1a", border: "none", borderRadius: "6px", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>Shop Now</button>
            </nav>

            {/* Hero */}
            <section style={{ padding: "120px 48px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
                <div>
                    <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#f59e0b", marginBottom: "20px", fontWeight: 600 }}>Handcrafted Excellence</p>
                    <h2 style={{ fontSize: "52px", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "24px" }}>
                        Built to Last.<br />
                        <span style={{ color: "#f59e0b" }}>Made to Matter.</span>
                    </h2>
                    <p style={{ fontSize: "16px", color: "rgba(229,229,229,0.45)", lineHeight: 1.8, maxWidth: "460px", marginBottom: "40px" }}>
                        Premium handforged tools and hardware. Every piece carries generations of blacksmithing tradition, built for professionals who demand the best.
                    </p>
                    <div style={{ display: "flex", gap: "16px" }}>
                        <button style={{ padding: "14px 32px", background: "#f59e0b", color: "#1a1a1a", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>Explore Products</button>
                        <button style={{ padding: "14px 32px", background: "transparent", color: "#e5e5e5", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Our Story</button>
                    </div>
                </div>
                <div style={{ aspectRatio: "1", background: "linear-gradient(135deg, #2d2319, #3d2b1f)", borderRadius: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontSize: "80px", opacity: 0.3 }}>⚒️</div>
                </div>
            </section>

            {/* Products */}
            <section style={{ padding: "80px 48px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
                    <h3 style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.02em" }}>Featured Products</h3>
                    <span style={{ fontSize: "13px", color: "#f59e0b", cursor: "pointer", fontWeight: 500 }}>View catalog →</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
                    {[
                        { name: "Damascus Chef Knife", price: "$285", cat: "Kitchen" },
                        { name: "Fire Poker Set", price: "$165", cat: "Fireplace" },
                        { name: "Blacksmith Hammer", price: "$120", cat: "Workshop" },
                        { name: "Iron Candelabra", price: "$195", cat: "Decor" },
                    ].map((p, i) => (
                        <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", overflow: "hidden", cursor: "pointer" }}>
                            <div style={{ aspectRatio: "1", background: `linear-gradient(135deg, ${["#2d2319, #1a1510", "#1a1a2e, #16213e", "#2d2319, #3d2b1f", "#1a1510, #2d2319"][i]})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <div style={{ fontSize: "32px", opacity: 0.4 }}>{["🔪", "🔥", "🔨", "🕯️"][i]}</div>
                            </div>
                            <div style={{ padding: "20px" }}>
                                <p style={{ fontSize: "10px", color: "#f59e0b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px", fontWeight: 600 }}>{p.cat}</p>
                                <h4 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>{p.name}</h4>
                                <span style={{ fontSize: "15px", color: "#f59e0b", fontWeight: 700 }}>{p.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: "80px 48px", background: "linear-gradient(135deg, #2d2319, #1a1510)", textAlign: "center" }}>
                <p style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#f59e0b", textTransform: "uppercase", marginBottom: "16px", fontWeight: 600 }}>Custom Orders</p>
                <h3 style={{ fontSize: "36px", fontWeight: 700, marginBottom: "16px" }}>Commission a Piece</h3>
                <p style={{ fontSize: "15px", color: "rgba(229,229,229,0.4)", marginBottom: "32px", maxWidth: "480px", margin: "0 auto 32px" }}>Work directly with our master blacksmiths to create a bespoke piece tailored to your vision.</p>
                <button style={{ padding: "14px 40px", background: "#f59e0b", color: "#1a1a1a", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>Contact Workshop</button>
            </section>

            {/* Footer */}
            <footer style={{ padding: "40px 48px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", fontWeight: 700 }}>FORGE & IRON</span>
                <span style={{ fontSize: "11px", color: "rgba(229,229,229,0.3)" }}>© 2025 Forge & Iron Blacksmithing Co.</span>
            </footer>
        </div>
    );
}
