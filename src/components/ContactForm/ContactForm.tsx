"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const inputStyle: React.CSSProperties = {
  padding: "12px",
  background: "rgba(5, 7, 10, 0.5)",
  border: "1px solid var(--border-subtle)",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "0.95rem",
  outline: "none",
  transition: "border-color var(--transition-fast)",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "var(--fg-muted)",
  fontWeight: 500,
  fontFamily: "var(--font-mono)",
};

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "var(--accent-emerald)";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "var(--border-subtle)";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    if (!ACCESS_KEY) {
      setStatus("error");
      setErrorMsg(
        "The contact form isn't configured yet (missing NEXT_PUBLIC_WEB3FORMS_KEY). Please email me directly in the meantime.",
      );
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: formData.subject || "New message from your portfolio site",
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Something went wrong sending your message. Please try email instead.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error — your message didn't send. Please try email instead.");
    }
  };

  return (
    <div className="glass-panel" style={{ padding: "40px" }}>
      <h3 style={{ fontSize: "1.4rem", color: "#fff", marginBottom: "24px" }}>Send a Message</h3>

      {/* Status is announced to screen readers */}
      <div aria-live="polite" style={{ position: status === "success" ? "static" : "absolute", clip: status === "success" ? "auto" : "rect(0 0 0 0)" }}>
        {status === "success" && (
          <div
            style={{
              padding: "20px",
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid var(--accent-emerald)",
              borderRadius: "8px",
              color: "var(--accent-emerald)",
              textAlign: "center",
            }}
          >
            <p style={{ fontWeight: 700, marginBottom: "4px" }}>Message sent.</p>
            <p style={{ fontSize: "0.9rem", color: "var(--fg-muted)" }}>
              Thanks — I&apos;ll get back to you shortly.
            </p>
          </div>
        )}
      </div>

      {status !== "success" && (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label htmlFor="name" style={labelStyle}>NAME</label>
            <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={inputStyle} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label htmlFor="email" style={labelStyle}>EMAIL ADDRESS</label>
            <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={inputStyle} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label htmlFor="subject" style={labelStyle}>SUBJECT</label>
            <input type="text" id="subject" name="subject" required value={formData.subject} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={inputStyle} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label htmlFor="message" style={labelStyle}>MESSAGE</label>
            <textarea id="message" name="message" required rows={4} value={formData.message} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={{ ...inputStyle, resize: "vertical", fontFamily: "var(--font-sans)" }} />
          </div>

          {status === "error" && (
            <p aria-live="assertive" style={{ fontSize: "0.85rem", color: "#f87171", fontFamily: "var(--font-mono)" }}>
              {errorMsg}
            </p>
          )}

          <button type="submit" disabled={status === "submitting"} className="edgy-btn edgy-btn-primary" style={{ width: "100%", marginTop: "10px", opacity: status === "submitting" ? 0.7 : 1 }}>
            {status === "submitting" ? "Sending…" : (<>Send Message <Send size={16} /></>)}
          </button>
        </form>
      )}
    </div>
  );
}
