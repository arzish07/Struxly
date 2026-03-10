"use client";

export default function Studio26Preview({ template }) {
    return (
        <div style={{ margin: 0, padding: 0, fontFamily: "'Inter', system-ui, sans-serif", backgroundColor: "#111", color: "#fff", minHeight: "100vh" }}>
            {/* Navigation */}
            <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 48px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <h1 style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "-0.03em" }}>STUDIO <span style={{ color: "#ef4444" }}>26</span></h1>
                <div style={{ display: "flex", gap: "28px", fontSize: "13px", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
                    <span style={{ cursor: "pointer" }}>Portfolio</span>
                    <span style={{ cursor: "pointer" }}>Services</span>
                    <span style={{ cursor: "pointer" }}>Team</span>
                    <span style={{ cursor: "pointer" }}>Blog</span>
                </div>
                <button style={{ padding: "10px 24px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "8px", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>Hire Us</button>
            </nav>

            {/* Hero */}
            <section style={{ padding: "120px 48px 80px" }}>
                <div style={{ maxWidth: "800px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "99px", padding: "6px 16px", marginBottom: "32px" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444" }} />
                        <span style={{ fontSize: "11px", color: "#ef4444", fontWeight: 600, letterSpacing: "0.05em" }}>AVAILABLE FOR PROJECTS</span>
                    </div>
                    <h2 style={{ fontSize: "64px", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "24px" }}>
                        We build digital<br />
                        products that<br />
                        <span style={{ background: "linear-gradient(135deg, #ef4444, #f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>drive growth.</span>
                    </h2>
                    <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: "520px", marginBottom: "40px" }}>
                        A digital agency obsessed with performance. We combine strategy, design, and engineering to create products people love.
                    </p>
                    <div style={{ display: "flex", gap: "16px" }}>
                        <button style={{ padding: "14px 32px", background: "#fff", color: "#111", border: "none", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>View Our Work</button>
                        <button style={{ padding: "14px 32px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Book a Call</button>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section style={{ padding: "60px 48px", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px" }}>
                    {[
                        { value: "120+", label: "Projects Shipped" },
                        { value: "98%", label: "Client Satisfaction" },
                        { value: "45", label: "Team Members" },
                        { value: "8", label: "Years in Business" },
                    ].map((s, i) => (
                        <div key={i} style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "42px", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "6px", background: "linear-gradient(135deg, #fff, rgba(255,255,255,0.6))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</p>
                            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Recent Work */}
            <section style={{ padding: "80px 48px" }}>
                <h3 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "40px", letterSpacing: "-0.02em" }}>Recent Work</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
                    {[
                        { name: "Fintech App", cat: "Mobile", bg: "linear-gradient(135deg, #1e3a5f, #264f78)" },
                        { name: "E-commerce Platform", cat: "Web", bg: "linear-gradient(135deg, #3b1d5e, #5b2d8e)" },
                        { name: "Health Dashboard", cat: "SaaS", bg: "linear-gradient(135deg, #1d3b2a, #2d5f3e)" },
                    ].map((w, i) => (
                        <div key={i} style={{ borderRadius: "16px", overflow: "hidden", cursor: "pointer" }}>
                            <div style={{ aspectRatio: "16/10", background: w.bg, display: "flex", alignItems: "flex-end", padding: "24px" }}>
                                <div>
                                    <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>{w.cat}</p>
                                    <h4 style={{ fontSize: "18px", fontWeight: 700 }}>{w.name}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: "48px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", fontWeight: 800 }}>STUDIO <span style={{ color: "#ef4444" }}>26</span></span>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>© 2025 Studio 26. All rights reserved.</span>
            </footer>
        </div>
    );
}
