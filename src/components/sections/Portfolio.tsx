import { ChevronRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";

export default function Portfolio() {
  return (
    <section id="portfolio" style={{ padding: "100px 0", borderTop: "1px solid var(--border-subtle)" }}>
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
          // 05. PORTFOLIO
        </span>
        <h2 style={{ fontSize: "2.5rem", color: "#fff", marginTop: "8px" }}>Work &amp; Credentials</h2>
        <p style={{ color: "var(--fg-subtle)", marginTop: "10px", fontSize: "1rem" }}>
          Hands-on software study, this build, and certifications in progress.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
        }}
      >
        {projects.map((port, index) => (
          <div
            key={index}
            className="glass-panel"
            style={{
              padding: "36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "280px",
              border: port.isPlaceholder ? "1px dashed var(--border-accent)" : undefined,
              opacity: port.isPlaceholder ? 0.85 : 1,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {port.num}
                </span>
                <span
                  className="edgy-badge"
                  style={{
                    fontSize: "0.65rem",
                    background: "rgba(6, 182, 212, 0.1)",
                    borderColor: "rgba(6, 182, 212, 0.3)",
                    color: "var(--accent-cyan)",
                  }}
                >
                  {port.status}
                </span>
              </div>
              <h3 style={{ fontSize: "1.3rem", color: "#fff", marginBottom: "12px" }}>{port.title}</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--fg-muted)" }}>{port.description}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "18px" }}>
                {port.tags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      color: "var(--fg-subtle)",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "4px",
                      padding: "3px 8px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "24px" }}>
              {port.href ? (
                <a
                  href={port.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--accent-emerald)", fontSize: "0.85rem", fontWeight: "600", fontFamily: "var(--font-mono)" }}
                >
                  VISIT <ExternalLink size={14} />
                </a>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--fg-subtle)", fontSize: "0.85rem", fontWeight: "600", fontFamily: "var(--font-mono)" }}>
                  {port.isPlaceholder ? "TO BE ADDED" : "IN PROGRESS"} <ChevronRight size={14} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
