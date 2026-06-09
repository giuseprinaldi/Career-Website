import { ExternalLink, Github, Lock } from "lucide-react";
import { projects, type Project } from "@/data/projects";

function Field({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          letterSpacing: "0.15em",
          color: "var(--accent-cyan)",
          fontWeight: 700,
        }}
      >
        {label}
      </span>
      <p style={{ fontSize: "0.92rem", lineHeight: "1.6", color: "var(--fg-muted)", marginTop: "4px" }}>{text}</p>
    </div>
  );
}

function Media({ project }: { project: Project }) {
  const mediaBase: React.CSSProperties = {
    flex: "1 1 380px",
    minWidth: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  if (project.image) {
    return (
      <div style={{ ...mediaBase, background: "#05070a", padding: "20px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          style={{ width: "100%", height: "auto", borderRadius: "8px", border: "1px solid var(--border-subtle)", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", display: "block" }}
        />
      </div>
    );
  }

  // No public deployment to screenshot — show a styled "private build" panel instead.
  return (
    <div
      style={{
        ...mediaBase,
        flexDirection: "column",
        gap: "14px",
        padding: "40px",
        minHeight: "220px",
        background: "linear-gradient(135deg, #0a0e17 0%, #06080e 100%)",
      }}
    >
      <Lock size={26} color="var(--fg-subtle)" />
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.18em", color: "var(--fg-subtle)" }}>
        PRIVATE BUILD
      </span>
      <span className="text-gradient" style={{ fontFamily: "var(--font-heading)", fontSize: "1.6rem", fontWeight: 800, textAlign: "center" }}>
        {project.title.split(" — ")[0]}
      </span>
    </div>
  );
}

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
        <h2 style={{ fontSize: "2.5rem", color: "#fff", marginTop: "8px" }}>Things I&apos;ve Built</h2>
        <p style={{ color: "var(--fg-subtle)", marginTop: "10px", fontSize: "1rem", maxWidth: "640px", margin: "10px auto 0" }}>
          Full-stack apps from my self-directed software study — several with AI woven in. They&apos;re
          how I learned to scope, decompose, and ship real software.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
        {projects.map((project, index) => (
          <article key={index} className="glass-panel" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ display: "flex", flexWrap: "wrap", flexDirection: index % 2 === 1 ? "row-reverse" : "row" }}>
              <Media project={project} />

              <div style={{ flex: "1 1 380px", minWidth: "300px", padding: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--accent-emerald)", letterSpacing: "0.05em" }}>
                    {project.tagline}
                  </span>
                  <span
                    className="edgy-badge"
                    style={{ fontSize: "0.62rem", background: "rgba(6, 182, 212, 0.1)", borderColor: "rgba(6, 182, 212, 0.3)", color: "var(--accent-cyan)" }}
                  >
                    {project.status}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.5rem", color: "#fff" }}>{project.title}</h3>

                <Field label="WHAT IT DOES" text={project.summary} />
                <Field label="PROBLEM IT SOLVES" text={project.problem} />
                <Field label="HOW IT WORKS" text={project.architecture} />

                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--fg-subtle)", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)", borderRadius: "4px", padding: "3px 8px" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {(project.liveUrl || project.repoUrl) && (
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "8px" }}>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="edgy-btn edgy-btn-primary" style={{ fontSize: "0.85rem", padding: "10px 18px" }}>
                        Live demo <ExternalLink size={14} />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="edgy-btn edgy-btn-secondary" style={{ fontSize: "0.85rem", padding: "10px 18px" }}>
                        <Github size={14} /> Code
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
