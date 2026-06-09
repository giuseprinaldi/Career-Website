import { NextRequest, NextResponse } from "next/server";

// --- Guardrails: this endpoint forwards to DeepSeek on Joe's API key, so cap and validate
// everything before it leaves the server. ---
const MAX_MESSAGES = 30;
const MAX_CONTENT_CHARS = 4000;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Only accept browser requests from our own origin(s). Same-origin fetches may omit the
// Origin header entirely, so a missing Origin is allowed; a present-but-foreign one is not.
function isAllowedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;

  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }

  const allowed = new Set<string>(["localhost:3000"]);
  const host = req.headers.get("host");
  if (host) allowed.add(host);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    try {
      allowed.add(new URL(siteUrl).host);
    } catch {
      /* ignore malformed env value */
    }
  }
  return allowed.has(originHost);
}

function validateMessages(input: unknown): { ok: true; value: ChatMessage[] } | { ok: false; error: string } {
  if (!Array.isArray(input)) return { ok: false, error: "Invalid messages array" };
  if (input.length === 0) return { ok: false, error: "No messages provided" };
  if (input.length > MAX_MESSAGES) return { ok: false, error: "Too many messages in one request" };

  for (const m of input) {
    if (!m || typeof m !== "object") return { ok: false, error: "Malformed message" };
    const role = (m as Record<string, unknown>).role;
    const content = (m as Record<string, unknown>).content;
    if (role !== "user" && role !== "assistant") return { ok: false, error: "Invalid message role" };
    if (typeof content !== "string" || content.trim().length === 0) return { ok: false, error: "Empty message content" };
    if (content.length > MAX_CONTENT_CHARS) return { ok: false, error: "A message exceeds the length limit" };
  }

  return { ok: true, value: input as ChatMessage[] };
}

export async function POST(req: NextRequest) {
  try {
    if (!isAllowedOrigin(req)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json().catch(() => null);
    const validation = validateMessages(body?.messages);
    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const messages = validation.value;

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      console.error("Missing DEEPSEEK_API_KEY in environment variables.");
      return NextResponse.json(
        { error: "API configuration error. Please verify the environment variables." },
        { status: 500 },
      );
    }

    // Digital-twin persona: Joe Rinaldi, operations leader moving into a Scrum Master role.
    const systemPrompt = {
      role: "system",
      content: `You are the digital twin of Joe Rinaldi (full name Joseph Rinaldi) — an operations and team leader transitioning into Agile delivery as a Scrum Master.

Speak in the first person ("I", "my", "me"). Be professional, warm, and concise (generally 2-4 sentences). Be concrete and avoid generic AI filler ("Sure!", "I'd be happy to help!"). When relevant, connect my experience to Scrum Master responsibilities: facilitation, removing impediments, backlog refinement, acceptance criteria and Definition of Done, Agile metrics, continuous improvement, and team leadership.

PROFESSIONAL DOSSIER

Current focus:
- Pursuing a Scrum Master role and SAFe® Scrum Master (SSM) / PSM certification. Self-directed study in software-project frameworks (scoping work vision → initiative → epic → story) and agentic AI development — I designed and built this portfolio site (Next.js, React, TypeScript, with this AI chat).

Experience:
1. Sales Consultant, Sysco — Plympton, MA (Jan 2024 – Present)
   - Coordinate across supply chain, logistics, and operations to clear delivery/fulfillment impediments and reduce errors.
   - Manage 50+ active accounts and a 30+ prospect pipeline, prioritizing and refining a backlog against value and readiness.
   - Grew the territory to $2.3M in annual sales (60k cases/year) with transparent performance tracking.
2. General Manager, Seoul Kitchen — Westford, MA (Mar 2020 – Nov 2023)
   - Authored and implemented all core operating processes, including clear standards and "definition of done" criteria.
   - Built a balanced metrics system and continuously inspected performance against it.
   - Coached a five-member leadership team in a delivery-orchestration (Integrator) capacity, removing blockers.
   - Improved onboarding efficiency 50%, cut time-to-competency by a week, reduced turnover 15%, and introduced the first performance-review process (~20% higher per-guest sales).
   - Led the COVID-era takeout pivot, lifting revenue $2.8M → $3.6M and growing takeaway orders 300%.
3. Director of Food & Beverage, Groton Publick House — Groton, MA (May 2018 – Jan 2020)
   - Built a KPI-driven metrics system from scratch for a new operation.
   - Recruited, trained, and mentored a 15-person team behind one vision, driving $1M+ first-year revenue.
   - Facilitated 20+ complex custom events end to end ($200K+ additional revenue).
   - Cut labor cost 3% while holding 85%+ satisfaction; ran recurring monthly/quarterly review cycles.

Core strengths: team leadership & coaching; facilitation; backlog refinement & prioritization; Agile metrics & flow (JIRA / Azure DevOps); continuous improvement & retrospectives; Lean process, acceptance criteria & Definition of Done; impediment removal; stakeholder communication.

Education: B.A., English — University of Massachusetts, Amherst (2007–2011).

Boundaries:
- For personal topics (family, politics, hobbies) or anything outside this dossier, politely steer back: "As Joe's professional digital twin, I focus on my move into Agile delivery — facilitation, team coaching, metrics, and continuous improvement. Happy to talk through my experience or how it maps to a Scrum Master role."
- If asked for contact details, share my email giusep.rinaldi@gmail.com and LinkedIn www.linkedin.com/in/joseph-rinaldi-integrator.`,
    };

    const payloadMessages = [systemPrompt, ...messages];

    // Fallback model list: try the fast/economical model first, then the higher-capability
    // one if it is rate-limited (429) or overloaded.
    const models = ["deepseek-v4-flash", "deepseek-v4-pro"];

    let lastErrorText = "Too Many Requests";
    let lastStatus = 429;
    let assistantMessage = "";
    let success = false;

    for (const model of models) {
      try {
        console.log(`Attempting chat completion with model: ${model}`);
        const response = await fetch("https://api.deepseek.com/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: model,
            messages: payloadMessages,
            temperature: 0.7,
            max_tokens: 500,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          assistantMessage = data.choices?.[0]?.message?.content || "";
          if (assistantMessage) {
            success = true;
            console.log(`Success with model: ${model}`);
            break;
          }
        } else {
          lastStatus = response.status;
          lastErrorText = await response.text();
          console.warn(`Model ${model} failed with status ${response.status}. Trying fallback...`);
        }
      } catch (err) {
        console.error(`Network or fetch error for model ${model}:`, err);
        lastErrorText = err instanceof Error ? err.message : "Network error";
        lastStatus = 500;
      }
    }

    if (!success) {
      console.error("All DeepSeek models failed.");
      try {
        const parsed = JSON.parse(lastErrorText);
        const readableError = parsed.error?.message || parsed.error || lastErrorText;
        return NextResponse.json({ error: readableError }, { status: lastStatus });
      } catch {
        return NextResponse.json({ error: `API request failed: ${lastErrorText}` }, { status: lastStatus });
      }
    }

    return NextResponse.json({ message: assistantMessage });
  } catch (err) {
    console.error("Route handler error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
