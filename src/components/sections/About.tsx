import { CheckCircle } from "lucide-react";
import { competencies } from "@/data/competencies";

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  color: "var(--accent-cyan)",
  fontSize: "0.85rem",
  letterSpacing: "0.15em",
  fontWeight: 600,
};

export default function About() {
  return (
    <section id="about" style={{ padding: "100px 0", borderTop: "1px solid var(--border-subtle)" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "40px",
          alignItems: "start",
        }}
      >
        <div>
          <span style={eyebrow}>// 01. THE TRANSITION</span>
          <h2 style={{ fontSize: "2.2rem", color: "#fff", marginTop: "8px", marginBottom: "20px" }}>
            The Same Job, Different Vocabulary
          </h2>
          <p style={{ marginBottom: "20px", fontSize: "1.05rem" }}>
            For a decade I&apos;ve led as a servant-leader under other titles — authoring
            processes and <strong>Definition-of-Done</strong> standards, building metrics
            systems, refining backlogs of work against value, removing impediments, and running
            regular improvement cycles. Scrum simply gives that instinct a shared framework and a
            name.
          </p>
          <p style={{ fontSize: "1rem" }}>
            As I move into Agile delivery, I&apos;m pairing that operations foundation with
            hands-on software study — I designed and built this site — and pursuing{" "}
            <strong>SAFe® Scrum Master (SSM)</strong> certification. The goal: help a team find
            its flow and keep value moving in a high-impact environment.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="glass-panel" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
              <CheckCircle size={18} color="var(--accent-emerald)" /> Servant Leadership
            </h3>
            <p style={{ fontSize: "0.95rem" }}>
              I lead by clearing the path — coaching teams, removing blockers, and keeping people
              aligned to a shared goal so they can deliver their best work.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
              <CheckCircle size={18} color="var(--accent-cyan)" /> Transparent Delivery
            </h3>
            <p style={{ fontSize: "0.95rem" }}>
              I make work visible — KPI/metrics systems, clear acceptance criteria, and a
              documented Definition of Done so &ldquo;done&rdquo; actually means done.
            </p>
          </div>
        </div>
      </div>

      {/* Compact toolkit strip (collapsed from the old standalone Capabilities section). */}
      <div style={{ marginTop: "48px" }}>
        <span style={eyebrow}>// TOOLKIT</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "14px" }}>
          {competencies.map((c, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "var(--fg-muted)",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "6px",
                padding: "6px 12px",
              }}
            >
              {c.category}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
