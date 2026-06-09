import { CheckCircle } from "lucide-react";
import { roleFit } from "@/data/roleFit";

export default function RoleFit() {
  return (
    <section id="rolefit" style={{ padding: "100px 0", borderTop: "1px solid var(--border-subtle)" }}>
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
          // 02. ROLE FIT
        </span>
        <h2 style={{ fontSize: "2.5rem", color: "#fff", marginTop: "8px" }}>Mapped to the Role</h2>
        <p style={{ color: "var(--fg-subtle)", marginTop: "10px", fontSize: "1rem", maxWidth: "640px", margin: "10px auto 0" }}>
          Every responsibility in the Scrum Master role description, matched to where I&apos;ve
          already done the work.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "20px",
        }}
      >
        {roleFit.map((item, index) => (
          <div
            key={index}
            className="glass-panel"
            style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <span style={{ flexShrink: 0, marginTop: "2px" }}>
                <CheckCircle size={18} color="var(--accent-emerald)" />
              </span>
              <h3 style={{ fontSize: "1rem", color: "#fff", fontWeight: "600", lineHeight: "1.4" }}>
                {item.responsibility}
              </h3>
            </div>
            <p
              style={{
                fontSize: "0.9rem",
                lineHeight: "1.6",
                color: "var(--fg-muted)",
                paddingLeft: "28px",
                borderLeft: "1px solid var(--border-accent)",
                marginLeft: "8px",
              }}
            >
              {item.evidence}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
