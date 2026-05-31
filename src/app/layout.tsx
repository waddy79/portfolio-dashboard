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
        <nav className="bg-slate-900 border-b border-slate-800/80 px-6 py-3 sticky top-0 z-10 backdrop-blur-sm">
          <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-slate-500 text-lg">📈</span>
              <h1 className="text-sm font-bold text-white tracking-wide uppercase">
                Portfolio
              </h1>
              <span className="text-slate-700 text-xs hidden sm:block">
                • Live market data
              </span>
            </div>
            <div className="flex gap-1">
              <Link
                href="/"
                className="text-xs px-3 py-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors font-medium"
              >
                Stocks
              </Link>
              <Link
                href="/crypto"
                className="text-xs px-3 py-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors font-medium"
              >
                Crypto
              </Link>
              <Link
                href="/watchlist"
                className="text-xs px-3 py-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors font-medium"
              >
                Watchlist
              </Link>
            </div>
          </div>
        </nav>
        <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-6">
          {children}
        </main>
        <footer className="text-center text-xs text-slate-700 py-6 border-t border-slate-900">
          Yahoo Finance · CoinGecko · Updated on load · Not financial advice
        </footer>
      </body>
    </html>
  );
}
