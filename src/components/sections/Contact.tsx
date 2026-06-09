import { Mail, Linkedin } from "lucide-react";
import { SITE } from "@/data/site";
import ContactForm from "@/components/ContactForm/ContactForm";

export default function Contact() {
  return (
    <section
      id="contact"
      style={{ padding: "100px 0", borderTop: "1px solid var(--border-subtle)", marginBottom: "60px" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "50px",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--accent-cyan)",
              fontSize: "0.85rem",
              letterSpacing: "0.15em",
              fontWeight: "600",
            }}
          >
            // 05. CONTACT
          </span>
          <h2 style={{ fontSize: "2.5rem", color: "#fff", marginTop: "8px", marginBottom: "20px" }}>
            Let&apos;s Talk Delivery
          </h2>
          <p style={{ fontSize: "1.05rem", marginBottom: "32px" }}>
            Hiring for a Scrum Master or Agile delivery role — or want to compare notes on
            team leadership and delivery flow? Reach out directly or send a message and I&apos;ll
            reply quickly.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <a
              href={`mailto:${SITE.email}`}
              className="glass-panel"
              style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: "16px" }}
            >
              <div style={{ color: "var(--accent-emerald)" }}>
                <Mail size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: "0.85rem", color: "var(--fg-subtle)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>Email</h4>
                <p style={{ fontSize: "1rem", color: "#fff", fontWeight: "500" }}>{SITE.email}</p>
              </div>
            </a>

            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel"
              style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: "16px" }}
            >
              <div style={{ color: "var(--accent-cyan)" }}>
                <Linkedin size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: "0.85rem", color: "var(--fg-subtle)", textTransform: "uppercase", fontFamily: "var(--font-mono)" }}>LinkedIn</h4>
                <p style={{ fontSize: "1rem", color: "#fff", fontWeight: "500" }}>{SITE.linkedinHandle}</p>
              </div>
            </a>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
