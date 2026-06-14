import { ImageResponse } from "next/og";

// Branded social-share card (Open Graph). Rendered to a 1200x630 PNG by next/og at build
// time. No custom font is loaded, so it uses next/og's default font — keep glyphs to a safe
// set. Palette mirrors globals.css (--bg-base, --accent-emerald/cyan, --fg-*).
export const alt =
  "Joe Rinaldi — Operations to Agile Delivery. Scrum Master / SAFe SSM.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const EMERALD = "#10b981";
const CYAN = "#06b6d4";
const FG = "#f8fafc";
const MUTED = "#cbd5e1";
const SUBTLE = "#7c8ba1";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#05070a",
          backgroundImage:
            "radial-gradient(circle at 12% 16%, rgba(16,185,129,0.20) 0%, transparent 42%), radial-gradient(circle at 88% 84%, rgba(6,182,212,0.16) 0%, transparent 46%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* left accent stripe */}
        <div
          style={{
            width: 16,
            height: "100%",
            display: "flex",
            backgroundImage: `linear-gradient(180deg, ${EMERALD} 0%, ${CYAN} 100%)`,
          }}
        />

        {/* content column */}
        <div
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 80px",
          }}
        >
          {/* header row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: 30,
                fontWeight: 700,
                color: FG,
              }}
            >
              <span>JR</span>
              <span style={{ color: EMERALD, marginLeft: 10, marginRight: 10 }}>
                //
              </span>
              <span>SCRUM</span>
            </div>
            <div style={{ display: "flex", fontSize: 22, color: SUBTLE, letterSpacing: 4 }}>
              PORTFOLIO
            </div>
          </div>

          {/* center block */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 118,
                fontWeight: 800,
                color: FG,
                lineHeight: 1.05,
              }}
            >
              Joe Rinaldi
            </div>
            <div style={{ display: "flex", alignItems: "center", marginTop: 20, fontSize: 50, fontWeight: 700 }}>
              <span style={{ color: MUTED }}>Operations</span>
              <span style={{ color: EMERALD, marginLeft: 20, marginRight: 20 }}>&#8594;</span>
              <span style={{ color: EMERALD }}>Agile Delivery</span>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 27,
                color: MUTED,
                maxWidth: 860,
                lineHeight: 1.5,
              }}
            >
              A decade of team leadership, facilitation, and metrics-driven continuous
              improvement &mdash; now applied as a Scrum Master.
            </div>
          </div>

          {/* footer row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", fontSize: 27, fontWeight: 700, color: CYAN }}>
              joe-rinaldi.com
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                letterSpacing: 2,
                color: EMERALD,
                border: `1px solid rgba(16,185,129,0.45)`,
                borderRadius: 8,
                padding: "10px 18px",
              }}
            >
              SCRUM MASTER &middot; SAFe&reg; SSM
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
