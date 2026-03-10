"use client";

export default function NexusFlowPreview({ template }) {
    return (
        <div style={{ margin: 0, padding: 0, fontFamily: "'Inter', system-ui, sans-serif", backgroundColor: "#0b0e17", color: "#e2e8f0", minHeight: "100vh" }}>
            {/* Top Bar */}
            <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 32px", borderBottom: "1px solid rgba(99,102,241,0.1)", backdropFilter: "blur(12px)", background: "rgba(11,14,23,0.8)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#fff" }}>N</div>
                    <span style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-0.02em" }}>Nexus Flow</span>
                    <span style={{ fontSize: "10px", background: "rgba(99,102,241,0.15)", color: "#818cf8", padding: "2px 8px", borderRadius: "4px", fontWeight: 600 }}>PRO</span>
                </div>
                <div style={{ display: "flex", gap: "24px", fontSize: "13px", color: "rgba(226,232,240,0.5)" }}>
                    <span style={{ cursor: "pointer" }}>Dashboard</span>
                    <span style={{ cursor: "pointer" }}>Analytics</span>
                    <span style={{ cursor: "pointer" }}>Settings</span>
                </div>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700 }}>JD</div>
                </div>
            </nav>

            {/* Dashboard Content */}
            <div style={{ padding: "32px", maxWidth: "1200px", margin: "0 auto" }}>
                {/* Stats Row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
                    {[
                        { label: "Total Revenue", value: "$24,563", change: "+12.5%", color: "#4ade80" },
                        { label: "Active Users", value: "1,847", change: "+8.2%", color: "#4ade80" },
                        { label: "Conversion Rate", value: "3.24%", change: "+2.1%", color: "#4ade80" },
                        { label: "Avg. Session", value: "4m 32s", change: "-0.8%", color: "#f87171" },
                    ].map((stat, i) => (
                        <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,102,241,0.1)", borderRadius: "16px", padding: "24px", backdropFilter: "blur(8px)" }}>
                            <p style={{ fontSize: "12px", color: "rgba(226,232,240,0.4)", marginBottom: "8px", fontWeight: 500 }}>{stat.label}</p>
                            <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                                <span style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.02em" }}>{stat.value}</span>
                                <span style={{ fontSize: "12px", fontWeight: 600, color: stat.color }}>{stat.change}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Area */}
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px", marginBottom: "32px" }}>
                    {/* Main Chart */}
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,102,241,0.1)", borderRadius: "16px", padding: "24px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                            <h3 style={{ fontSize: "15px", fontWeight: 600 }}>Revenue Overview</h3>
                            <div style={{ display: "flex", gap: "8px" }}>
                                {["7D", "1M", "3M", "1Y"].map((p, i) => (
                                    <button key={i} style={{ padding: "4px 12px", borderRadius: "6px", border: "none", background: i === 1 ? "rgba(99,102,241,0.2)" : "transparent", color: i === 1 ? "#818cf8" : "rgba(226,232,240,0.4)", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>{p}</button>
                                ))}
                            </div>
                        </div>
                        {/* Fake chart bars */}
                        <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "180px", padding: "0 8px" }}>
                            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                                <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "4px 4px 0 0", background: `linear-gradient(to top, rgba(99,102,241,0.3), rgba(139,92,246,${0.3 + h / 200}))`, transition: "all 0.3s" }} />
                            ))}
                        </div>
                    </div>

                    {/* Side Panel */}
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,102,241,0.1)", borderRadius: "16px", padding: "24px" }}>
                        <h3 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "20px" }}>Top Pages</h3>
                        {[
                            { name: "/dashboard", views: "2.4k", pct: 85 },
                            { name: "/analytics", views: "1.8k", pct: 65 },
                            { name: "/settings", views: "932", pct: 40 },
                            { name: "/billing", views: "621", pct: 25 },
                        ].map((page, i) => (
                            <div key={i} style={{ marginBottom: "16px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px" }}>
                                    <span style={{ color: "rgba(226,232,240,0.6)" }}>{page.name}</span>
                                    <span style={{ color: "rgba(226,232,240,0.4)" }}>{page.views}</span>
                                </div>
                                <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "99px", overflow: "hidden" }}>
                                    <div style={{ height: "100%", width: `${page.pct}%`, background: "linear-gradient(90deg, #6366f1, #8b5cf6)", borderRadius: "99px" }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity Table */}
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,102,241,0.1)", borderRadius: "16px", padding: "24px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "20px" }}>Recent Activity</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "0", fontSize: "12px" }}>
                        {["Event", "Status", "Time", "Value"].map((h, i) => (
                            <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid rgba(99,102,241,0.08)", color: "rgba(226,232,240,0.3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "10px" }}>{h}</div>
                        ))}
                        {[
                            { event: "New subscription", status: "Completed", time: "2 min ago", value: "$29/mo", statusColor: "#4ade80" },
                            { event: "Payment received", status: "Completed", time: "15 min ago", value: "$149", statusColor: "#4ade80" },
                            { event: "User signup", status: "Pending", time: "1 hr ago", value: "—", statusColor: "#facc15" },
                            { event: "Invoice sent", status: "Processing", time: "3 hr ago", value: "$520", statusColor: "#818cf8" },
                        ].map((row, i) => (
                            [row.event, row.status, row.time, row.value].map((cell, j) => (
                                <div key={`${i}-${j}`} style={{ padding: "14px 0", borderBottom: "1px solid rgba(99,102,241,0.05)", color: j === 1 ? row.statusColor : "rgba(226,232,240,0.6)" }}>
                                    {j === 1 ? <span style={{ background: `${row.statusColor}15`, color: row.statusColor, padding: "3px 10px", borderRadius: "99px", fontSize: "11px", fontWeight: 600 }}>{cell}</span> : cell}
                                </div>
                            ))
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
