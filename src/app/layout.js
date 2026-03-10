import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata = {
    title: "Struxly.ai — No More Drag. Just Dialogue.",
    description:
        "Build stunning websites through conversation. Struxly.ai is a dialogue-driven website builder with Shopify integration, visual inspector, and one-click deploy.",
    keywords: ["website builder", "AI", "Shopify", "no-code", "dialogue", "struxly"],
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={inter.variable} suppressHydrationWarning>
            <head>
                <link rel="icon" type="image/png" href="/favicon.png" />
                <link rel="apple-touch-icon" href="/favicon.png" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            try {
                                const theme = localStorage.getItem('struxly_theme') || 'light';
                                if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                                    document.documentElement.classList.add('dark');
                                } else {
                                    document.documentElement.classList.remove('dark');
                                }
                            } catch (e) {}
                        `,
                    }}
                />
            </head>
            <body
                className={`${inter.className} antialiased bg-slate-50 min-h-screen text-slate-900`}
                suppressHydrationWarning
            >
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}

