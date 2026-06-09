"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, MessageSquare, X } from "lucide-react";
import { chatGreeting, chatSuggestions } from "@/data/chat";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const ERROR_DISMISS_MS = 8000;

export default function DigitalTwinChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: chatGreeting }]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, errorMsg]);

  // Auto-dismiss transient errors so they don't clutter the thread (kept out of `messages`
  // entirely, so they never get POSTed back as context).
  useEffect(() => {
    if (!errorMsg) return;
    const t = setTimeout(() => setErrorMsg(null), ERROR_DISMISS_MS);
    return () => clearTimeout(t);
  }, [errorMsg]);

  const sendChat = async (text: string) => {
    if (!text.trim() || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setErrorMsg(null);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to reach the AI service.");
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to get a response from the AI.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      {isOpen && (
        <div
          className="glass-panel"
          style={{
            width: "360px",
            height: "500px",
            maxHeight: "80vh",
            background: "rgba(10, 14, 23, 0.95)",
            border: "2px solid rgba(16, 185, 129, 0.3)",
            borderRadius: "16px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.6), 0 0 20px rgba(16, 185, 129, 0.15)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            marginBottom: "16px",
            transformOrigin: "bottom right",
          }}
        >
          {/* Header */}
          <div style={{ padding: "16px", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(5, 7, 10, 0.7)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="led-green" />
              <div>
                <h3 style={{ fontSize: "0.95rem", color: "#fff", fontFamily: "var(--font-heading)" }}>JR // TWIN</h3>
                <p style={{ fontSize: "0.65rem", color: "var(--fg-subtle)", fontFamily: "var(--font-mono)" }}>ACTIVE // DEEPSEEK</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close AI chat"
              style={{ background: "none", border: "none", color: "var(--fg-muted)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: "4px" }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Feed */}
          <div aria-live="polite" style={{ flexGrow: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.role === "user" ? "chat-bubble-user" : "chat-bubble-assistant"}
                style={{ padding: "10px 14px", maxWidth: "80%", fontSize: "0.85rem", lineHeight: "1.4", wordBreak: "break-word" }}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className="chat-bubble-assistant" style={{ padding: "10px 14px", width: "60px", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                <span className="screen-flash-text" style={{ fontSize: "1.2rem", lineHeight: "1", color: "var(--accent-emerald)" }}>•</span>
                <span className="screen-flash-text" style={{ fontSize: "1.2rem", lineHeight: "1", color: "var(--accent-emerald)", animationDelay: "0.2s" }}>•</span>
                <span className="screen-flash-text" style={{ fontSize: "1.2rem", lineHeight: "1", color: "var(--accent-emerald)", animationDelay: "0.4s" }}>•</span>
              </div>
            )}

            {errorMsg && (
              <div
                role="alert"
                style={{ fontSize: "0.75rem", color: "#f87171", fontFamily: "var(--font-mono)", background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.2)", padding: "8px 12px", borderRadius: "6px", alignSelf: "center", maxWidth: "100%" }}
              >
                {errorMsg}
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && !loading && (
            <div style={{ padding: "0 16px 8px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {chatSuggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => sendChat(sug)}
                  style={{ textAlign: "left", fontSize: "0.75rem", color: "var(--accent-cyan)", background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.2)", borderRadius: "8px", padding: "8px 12px", cursor: "pointer", width: "100%", transition: "all var(--transition-fast)" }}
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendChat(input);
            }}
            style={{ padding: "12px", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: "8px", background: "rgba(5, 7, 10, 0.7)" }}
          >
            <input
              type="text"
              placeholder="Ask a question..."
              aria-label="Ask the AI a question"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              style={{ flexGrow: 1, padding: "10px", background: "rgba(5,7,10,0.5)", border: "1px solid var(--border-subtle)", borderRadius: "8px", color: "#fff", fontSize: "0.85rem", outline: "none" }}
            />
            <button type="submit" disabled={loading} aria-label="Send message" className="edgy-btn edgy-btn-primary" style={{ padding: "10px 14px", borderRadius: "8px", height: "100%" }}>
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
        aria-expanded={isOpen}
        className="edgy-btn edgy-btn-primary"
        style={{ width: "60px", height: "60px", borderRadius: "50%", boxShadow: "0 10px 25px rgba(16, 185, 129, 0.4), 0 0 15px rgba(16, 185, 129, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
