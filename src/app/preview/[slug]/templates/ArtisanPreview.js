"use client";

export default function ArtisanPreview({ template }) {
    return (
        <div style={{ margin: 0, padding: 0, fontFamily: "'Georgia', serif", backgroundColor: "#faf8f5", color: "#2c2418", minHeight: "100vh" }}>
            {/* Navigation */}
            <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 48px", borderBottom: "1px solid #ede8e0" }}>
                <h1 style={{ fontSize: "22px", fontWeight: 400, letterSpacing: "0.02em" }}>The Artisan</h1>
                <div style={{ display: "flex", gap: "28px", fontSize: "13px", color: "#8a7e6e", fontFamily: "system-ui, sans-serif", fontWeight: 500 }}>
                    <span style={{ cursor: "pointer" }}>Menu</span>
                    <span style={{ cursor: "pointer" }}>Our Story</span>
                    <span style={{ cursor: "pointer" }}>Events</span>
                    <span style={{ cursor: "pointer" }}>Reserve</span>
                </div>
                <button style={{ padding: "10px 24px", border: "1px solid #2c2418", background: "transparent", fontSize: "12px", fontWeight: 500, cursor: "pointer", fontFamily: "system-ui, sans-serif", letterSpacing: "0.05em" }}>Book a Table</button>
            </nav>

            {/* Hero */}
            <section style={{ position: "relative", height: "600px", background: "linear-gradient(135deg, #3d2b1f, #5c3d2e)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)" }} />
                <div style={{ position: "relative", zIndex: 1, color: "#f5f0e8" }}>
                    <p style={{ fontSize: "12px", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "24px", fontFamily: "system-ui, sans-serif", opacity: 0.6 }}>Farm-to-Table Dining</p>
                    <h2 style={{ fontSize: "56px", fontWeight: 400, lineHeight: 1.1, marginBottom: "20px" }}>
                        Where Every Dish<br /><span style={{ fontStyle: "italic" }}>Tells a Story</span>
                    </h2>
                    <p style={{ fontSize: "15px", opacity: 0.7, maxWidth: "460px", margin: "0 auto 40px", fontFamily: "system-ui, sans-serif", lineHeight: 1.7 }}>
                        Seasonal ingredients, artisanal techniques, and a passion for flavor that defines every plate we create.
                    </p>
                    <button style={{ padding: "14px 36px", border: "1px solid rgba(245,240,232,0.3)", background: "transparent", color: "#f5f0e8", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontFamily: "system-ui, sans-serif" }}>View Our Menu</button>
                </div>
            </section>

            {/* Menu Highlights */}
            <section style={{ padding: "80px 48px" }}>
                <div style={{ textAlign: "center", marginBottom: "48px" }}>
                    <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#a89279", marginBottom: "12px", fontFamily: "system-ui, sans-serif" }}>Our Kitchen</p>
                    <h3 style={{ fontSize: "32px", fontWeight: 400 }}>Seasonal Highlights</h3>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
                    {[
                        { name: "Seared Wagyu", desc: "A5 wagyu with truffle jus, roasted root vegetables, and micro herbs", price: "$68" },
                        { name: "Lobster Risotto", desc: "Maine lobster, saffron arborio, aged parmesan, and chive oil", price: "$54" },
                        { name: "Chocolate Soufflé", desc: "Valrhona dark chocolate, crème anglaise, and candied hazelnuts", price: "$28" },
                    ].map((dish, i) => (
                        <div key={i} style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                            <div style={{ height: "200px", background: ["#5c4033", "#847562", "#3d2b1f"][i] }} />
                            <div style={{ padding: "24px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                    <h4 style={{ fontSize: "18px", fontWeight: 500 }}>{dish.name}</h4>
                                    <span style={{ fontSize: "16px", fontWeight: 600, color: "#a89279" }}>{dish.price}</span>
                                </div>
                                <p style={{ fontSize: "13px", color: "#999", lineHeight: 1.6, fontFamily: "system-ui, sans-serif" }}>{dish.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Reservation CTA */}
            <section style={{ padding: "80px 48px", background: "#2c2418", textAlign: "center", color: "#f5f0e8" }}>
                <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.5, marginBottom: "16px", fontFamily: "system-ui, sans-serif" }}>Join Us</p>
                <h3 style={{ fontSize: "36px", fontWeight: 400, marginBottom: "16px" }}>Make a Reservation</h3>
                <p style={{ fontSize: "14px", opacity: 0.5, marginBottom: "32px", fontFamily: "system-ui, sans-serif" }}>Experience the art of fine dining</p>
                <button style={{ padding: "14px 36px", background: "#a89279", color: "#fff", border: "none", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "system-ui, sans-serif", fontWeight: 600, borderRadius: "4px" }}>Reserve Now</button>
            </section>

            {/* Footer */}
            <footer style={{ padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #ede8e0" }}>
                <span style={{ fontSize: "14px" }}>The Artisan</span>
                <span style={{ fontSize: "11px", color: "#aaa", fontFamily: "system-ui, sans-serif" }}>© 2025 The Artisan Restaurant</span>
            </footer>
        </div>
    );
}
