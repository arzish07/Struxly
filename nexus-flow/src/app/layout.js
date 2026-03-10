import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata = {
  title: "Nexus Flow | Intelligent Cloud Control",
  description: "A Cyber-SaaS Glassmorphic Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-[#020617] text-slate-200 antialiased`}>
        {/* Cyber Background Grids */}
        <div className="cyber-grid" />
        <div className="glow-orb-primary" />
        <div className="glow-orb-secondary" />

        {children}
      </body>
    </html>
  );
}
