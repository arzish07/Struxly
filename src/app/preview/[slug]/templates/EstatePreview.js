"use client";

export default function EstatePreview({ template }) {
    return (
        <div style={{ margin: 0, padding: 0, fontFamily: "'Playfair Display', Georgia, serif", backgroundColor: "#f7f5f0", color: "#2c2c2c", minHeight: "100vh" }}>
            {/* Navigation */}
            <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 48px", background: "#fff", boxShadow: "0 1px 0 rgba(0,0,0,0.05)" }}>
                <h1 style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "0.08em" }}>THE ESTATE</h1>
                <div style={{ display: "flex", gap: "28px", fontSize: "12px", color: "#888", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "system-ui, sans-serif", fontWeight: 500 }}>
                    <span style={{ cursor: "pointer" }}>Properties</span>
                    <span style={{ cursor: "pointer" }}>About</span>
                    <span style={{ cursor: "pointer" }}>Services</span>
                    <span style={{ cursor: "pointer" }}>Contact</span>
                </div>
                <button style={{ padding: "10px 24px", background: "#2c2c2c", color: "#f7f5f0", border: "none", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "system-ui, sans-serif", fontWeight: 600 }}>Book a Viewing</button>
            </nav>

            {/* Hero */}
            <section style={{ position: "relative", height: "600px", background: "linear-gradient(135deg, #d4c5a9, #a89279)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)" }} />
                <div style={{ position: "relative", zIndex: 1, color: "#fff" }}>
                    <p style={{ fontSize: "12px", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "24px", fontFamily: "system-ui, sans-serif", opacity: 0.7 }}>Exceptional Properties</p>
                    <h2 style={{ fontSize: "58px", fontWeight: 400, lineHeight: 1.1, marginBottom: "20px" }}>
                        Where Luxury<br /><span style={{ fontStyle: "italic" }}>Meets Living</span>
                    </h2>
                    <p style={{ fontSize: "15px", opacity: 0.8, maxWidth: "480px", margin: "0 auto 40px", fontFamily: "system-ui, sans-serif", lineHeight: 1.7 }}>
                        Curated real estate for discerning buyers. Discover homes that redefine elegance.
                    </p>
                    <button style={{ padding: "14px 36px", border: "1px solid rgba(255,255,255,0.4)", background: "transparent", color: "#fff", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontFamily: "system-ui, sans-serif" }}>Explore Properties</button>
                </div>
            </section>

            {/* Featured Listings */}
            <section style={{ padding: "80px 48px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
                    <h3 style={{ fontSize: "28px", fontWeight: 400 }}>Featured Listings</h3>
                    <span style={{ fontSize: "12px", color: "#a89279", cursor: "pointer", fontFamily: "system-ui, sans-serif", fontWeight: 500 }}>View all →</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
                    {[
                        { name: "Villa Serenata", location: "Malibu, CA", price: "$12.8M", beds: 6, baths: 8, sqft: "8,200", bg: "#c4a882" },
                        { name: "The Penthouse Collection", location: "Manhattan, NY", price: "$24.5M", beds: 4, baths: 5, sqft: "5,600", bg: "#8b9eb5" },
                        { name: "Coastal Retreat", location: "Montauk, NY", price: "$8.2M", beds: 5, baths: 6, sqft: "6,400", bg: "#6b8f71" },
                    ].map((p, i) => (
                        <div key={i} style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.04)", cursor: "pointer" }}>
                            <div style={{ height: "220px", background: p.bg }} />
                            <div style={{ padding: "24px" }}>
                                <h4 style={{ fontSize: "18px", fontWeight: 500, marginBottom: "4px" }}>{p.name}</h4>
                                <p style={{ fontSize: "12px", color: "#999", marginBottom: "16px", fontFamily: "system-ui, sans-serif" }}>{p.location}</p>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ fontSize: "20px", fontWeight: 600, color: "#a89279" }}>{p.price}</span>
                                    <span style={{ fontSize: "11px", color: "#888", fontFamily: "system-ui, sans-serif" }}>{p.beds} BD · {p.baths} BA · {p.sqft} SF</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer style={{ borderTop: "1px solid #e8e2d9", padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "system-ui, sans-serif" }}>
                <span style={{ fontSize: "14px", letterSpacing: "0.08em" }}>THE ESTATE</span>
                <span style={{ fontSize: "11px", color: "#999" }}>© 2025 The Estate Group. All rights reserved.</span>
            </footer>
        </div>
    );
}
