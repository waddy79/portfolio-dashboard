import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Portfolio Dashboard",
  description: "Live portfolio tracking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body
        style={{
          minHeight: "100vh",
          background: "#0F172A",
          color: "#ffffff",
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        }}
      >
        <nav
          style={{
            background: "#080D1A",
            borderBottom: "1px solid #111827",
            padding: "10px 24px",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div
            style={{
              maxWidth: 1600,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 16 }}>📈</span>
              <span
                style={{
                  color: "#ffffff",
                  fontWeight: 800,
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                PORTFOLIO
              </span>
            </div>
            <div style={{ display: "flex", gap: 2 }}>
              {[
                { href: "/", label: "Stocks" },
                { href: "/crypto", label: "Crypto" },
                { href: "/watchlist", label: "Watchlist" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    color: "#64748b",
                    fontSize: 12,
                    fontWeight: 600,
                    padding: "5px 12px",
                    borderRadius: 6,
                    textDecoration: "none",
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.04em",
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <main
          style={{
            maxWidth: 1600,
            margin: "0 auto",
            padding: "20px 24px",
          }}
        >
          {children}
        </main>

        <footer
          style={{
            textAlign: "center",
            fontSize: 11,
            color: "#1e2433",
            padding: "20px",
            borderTop: "1px solid #0f172a",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Yahoo Finance · CoinGecko · Updated on load · Not financial advice
        </footer>
      </body>
    </html>
  );
}
