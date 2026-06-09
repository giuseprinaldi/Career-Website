import { Cpu, ArrowRight, Download } from "lucide-react";
import { RESUME_PDF_PATH } from "@/data/site";

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "85vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "80px 0",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "820px" }}>
        <div>
          <span className="edgy-badge">
            <Cpu size={14} /> AVAILABLE // SCRUM MASTER TRACK
          </span>
        </div>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            lineHeight: "1.1",
            fontWeight: "800",
            color: "#fff",
          }}
        >
          FACILITATE. UNBLOCK. <br />
          <span className="text-gradient glow-text">DELIVER.</span>
        </h1>

        <h2
          style={{
            fontSize: "clamp(1.25rem, 3vw, 1.8rem)",
            fontWeight: "600",
            color: "var(--fg-muted)",
            fontFamily: "var(--font-heading)",
          }}
        >
          Joe Rinaldi — Operations Leader bringing a decade of team leadership to Agile delivery
        </h2>

        <p style={{ fontSize: "1.1rem", lineHeight: "1.7", color: "var(--fg-muted)" }}>
          A decade of facilitating high-pressure, cross-functional teams toward measurable
          outcomes — building the processes, metrics, and momentum that help teams continuously
          improve. I clear impediments, keep work flowing, and unite people behind a shared
          vision. Now applying those strengths to Agile delivery and pursuing SAFe® Scrum Master
          (SSM) certification.
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "16px" }}>
          <a href="#rolefit" className="edgy-btn edgy-btn-primary">
            See role fit <ArrowRight size={16} />
          </a>
          <a
            href={RESUME_PDF_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="edgy-btn edgy-btn-secondary"
          >
            <Download size={16} /> Download résumé
          </a>
          <a href="#contact" className="edgy-btn edgy-btn-secondary">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
