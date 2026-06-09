import {
  Users,
  CalendarCheck,
  ListChecks,
  LineChart,
  RefreshCw,
  ClipboardCheck,
} from "lucide-react";
import { competencies, type Competency } from "@/data/competencies";

const ICONS: Record<Competency["icon"], typeof Users> = {
  servant: Users,
  facilitate: CalendarCheck,
  backlog: ListChecks,
  metrics: LineChart,
  improve: RefreshCw,
  done: ClipboardCheck,
};

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "100px 0", borderTop: "1px solid var(--border-subtle)" }}>
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
          // 04. CAPABILITIES
        </span>
        <h2 style={{ fontSize: "2.5rem", color: "#fff", marginTop: "8px" }}>Scrum &amp; Agile Competencies</h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
        }}
      >
        {competencies.map((skill, index) => {
          const Icon = ICONS[skill.icon];
          const color = skill.accent === "emerald" ? "var(--accent-emerald)" : "var(--accent-cyan)";
          return (
            <div
              key={index}
              className="glass-panel"
              style={{
                padding: "30px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    padding: "8px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={20} color={color} />
                </div>
                <h3 style={{ fontSize: "1.2rem", color: "#fff", fontWeight: "600" }}>{skill.category}</h3>
              </div>
              <p style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "var(--fg-muted)" }}>
                {skill.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
