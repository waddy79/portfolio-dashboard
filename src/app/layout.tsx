import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

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
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-200">
        <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">
              📊 Portfolio Dashboard
            </h1>
            <div className="flex gap-6">
              <Link
                href="/"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Stocks
              </Link>
              <Link
                href="/crypto"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Crypto
              </Link>
              <Link
                href="/watchlist"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Watchlist
              </Link>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
        <footer className="text-center text-xs text-slate-600 py-6">
          Prices from Yahoo Finance &amp; CoinGecko &middot; Updated on load
          &middot; No financial advice
        </footer>
      </body>
    </html>
  );
}
