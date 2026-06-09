import type { Metadata } from "next";
import { Inter, Outfit, Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joe Rinaldi | Operations → Agile Delivery",
  description:
    "Joe Rinaldi — operations and team leader transitioning into Agile delivery. A decade of servant leadership, facilitation, impediment removal, and metrics-driven continuous improvement, now applied to a Scrum Master role and SAFe® SSM certification.",
  keywords: [
    "Joe Rinaldi",
    "Joseph Rinaldi",
    "Scrum Master",
    "Agile delivery",
    "SAFe",
    "servant leadership",
    "Agile coach",
    "continuous improvement",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${spaceMono.variable}`}>
      <body className="antialiased">
        <header
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 100,
            height: "70px",
            borderBottom: "1px solid var(--border-subtle)",
            background: "rgba(5, 7, 10, 0.7)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 24px",
            }}
          >
            <a
              href="#"
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: "700",
                fontSize: "1.1rem",
                letterSpacing: "0.15em",
                color: "#fff",
              }}
            >
              JR <span style={{ color: "var(--accent-emerald)" }}>//</span> SCRUM
            </a>

            <nav aria-label="Primary" style={{ display: "flex", gap: "28px", alignItems: "center" }}>
              <a href="#about" style={{ fontSize: "0.9rem", color: "var(--fg-muted)", fontWeight: "500" }}>
                About
              </a>
              <a href="#portfolio" style={{ fontSize: "0.9rem", color: "var(--fg-muted)", fontWeight: "500" }}>
                Work
              </a>
              <a href="#rolefit" style={{ fontSize: "0.9rem", color: "var(--fg-muted)", fontWeight: "500" }}>
                Role Fit
              </a>
              <a href="#journey" style={{ fontSize: "0.9rem", color: "var(--fg-muted)", fontWeight: "500" }}>
                Journey
              </a>
              <a
                href="#contact"
                className="edgy-badge"
                style={{
                  textTransform: "none",
                  letterSpacing: "normal",
                  fontSize: "0.85rem",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontWeight: "600",
                }}
              >
                Let&apos;s Connect
              </a>
            </nav>
          </div>
        </header>

        <main style={{ paddingTop: "70px", minHeight: "calc(100vh - 120px)" }}>
          {children}
        </main>

        <footer
          style={{
            borderTop: "1px solid var(--border-subtle)",
            background: "rgba(5, 7, 10, 0.95)",
            padding: "40px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--fg-subtle)" }}>
              © {new Date().getFullYear()} JOE RINALDI // OPERATIONS → AGILE DELIVERY
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
