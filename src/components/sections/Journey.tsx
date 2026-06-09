import { Calendar, MapPin } from "lucide-react";
import { experiences } from "@/data/experiences";

export default function Journey() {
  return (
    <section id="journey" style={{ padding: "100px 0", borderTop: "1px solid var(--border-subtle)" }}>
      <div style={{ marginBottom: "60px", textAlign: "center" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--accent-cyan)",
            fontSize: "0.85rem",
            letterSpacing: "0.15em",
            fontWeight: "600",
          }}
        >
          // 03. CAREER HISTORY
        </span>
        <h2 style={{ fontSize: "2.5rem", color: "#fff", marginTop: "8px" }}>The Delivery Journey</h2>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
        {/* Vertical timeline line */}
        <div
          style={{
            position: "absolute",
            left: "20px",
            top: "10px",
            bottom: "10px",
            width: "1px",
            background: "linear-gradient(to bottom, var(--accent-emerald), var(--accent-cyan), transparent)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          {experiences.map((exp, index) => (
            <div key={index} style={{ display: "flex", gap: "24px", position: "relative" }}>
              {/* Timeline node */}
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "var(--bg-surface)",
                  border: `2px solid ${exp.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "700",
                  fontFamily: "var(--font-mono)",
                  color: exp.color,
                  zIndex: 2,
                  boxShadow: `0 0 10px ${exp.color}33`,
                  flexShrink: 0,
                }}
              >
                {exp.logoLetter}
              </div>

              <div className="glass-panel" style={{ padding: "28px", width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "1.35rem", color: "#fff" }}>{exp.role}</h3>
                    <h4 style={{ fontSize: "1rem", color: exp.color, fontWeight: "500", marginTop: "2px" }}>
                      {exp.company}
                    </h4>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--fg-muted)",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      <Calendar size={14} /> {exp.period}
                    </span>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--fg-subtle)",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <MapPin size={14} /> {exp.location}
                    </span>
                  </div>
                </div>

                <ul style={{ paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {exp.highlights.map((bullet, idx) => (
                    <li key={idx} style={{ color: "var(--fg-muted)", fontSize: "0.95rem" }}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
