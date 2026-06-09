// Portfolio / Work section. Writeups are based on direct analysis of each repo (June 2026).
// Screenshots live in /public/screenshots and are only included for apps with a public live
// deployment (or this site itself); private apps are presented as described builds.

export interface Project {
  title: string;
  tagline: string;
  status: string;
  summary: string; // what it does
  problem: string; // problem it solves
  architecture: string; // how it works
  tags: string[];
  image?: string; // single screenshot path under /public
  images?: { src: string; label: string }[]; // multiple screenshots -> rendered as a gallery
  liveUrl?: string; // public demo
  repoUrl?: string; // only when the repo is public
}

export const projects: Project[] = [
  {
    title: "FinAlly — AI Trading Copilot",
    tagline: "An AI-powered simulated trading desk",
    status: "PRIVATE BUILD",
    summary:
      "A Bloomberg-style trading simulator where you manage a $10k virtual portfolio against live-streaming prices, with an LLM copilot that analyzes your holdings and executes trades from plain-English requests.",
    problem:
      "It lets people practice trading and portfolio management with zero risk — no real money or brokerage account — while demonstrating how an LLM can act as an agentic copilot that turns instructions like “trim my tech exposure” into validated, executed trades.",
    architecture:
      "A single FastAPI service serves both the JSON/SSE API and a Next.js front end. A Geometric Brownian Motion simulator (or the Polygon API) streams prices to the browser over Server-Sent Events, with state in SQLite. The AI layer uses LiteLLM with Pydantic-typed structured outputs, and any trade it proposes runs through the same server-side validation as a manual one — the model proposes, the code enforces. Containerized with Docker.",
    tags: ["Python", "FastAPI", "SSE", "SQLite", "Next.js", "LiteLLM", "Structured Outputs", "Docker"],
    image: "/screenshots/finally.png",
  },
  {
    title: "Mise — AI Staff Scheduling",
    tagline: "Every shift in its place.",
    status: "LIVE DEMO",
    summary:
      "An AI-assisted scheduling app for restaurants: define roles, employees, skills, and availability, then generate, edit, and publish staff schedules in minutes — with time-off requests, shift swaps, templates, and clock-in/out attendance.",
    problem:
      "Building restaurant rosters by hand is slow and error-prone — juggling who's qualified, who's available, approved time off, overtime, and coverage. Mise drafts a compliant schedule from those constraints in seconds and lets managers adjust and publish to staff.",
    architecture:
      "A monorepo: a FastAPI backend (SQLAlchemy + PostgreSQL, JWT auth) and a Next.js 16 / React 19 / TypeScript front end. The scheduler assembles a structured context of shifts, roles, and availability and asks an LLM (DeepSeek) for assignments — then deterministically validates every one server-side (role, availability, time-off, no double-booking) before saving. The AI only drafts; the validator decides what actually ships.",
    tags: ["Next.js 16", "FastAPI", "PostgreSQL", "JWT", "DeepSeek", "TypeScript", "Docker"],
    image: "/screenshots/mise.png",
    liveUrl: "https://mise-frontend-eight.vercel.app",
  },
  {
    title: "Family-Hub — Household OS",
    tagline: "One place for chores, calendar, and meals",
    status: "PRIVATE BUILD",
    summary:
      "A private household organizer that unifies a family's chores and tasks, a shared calendar with two-way Google Calendar sync, an AI “Chef” that plans the week's meals from your recipe catalog, and an auto-generated grocery list.",
    problem:
      "Families juggle chores, calendars, meals, and shopping across disconnected apps and separate Google calendars. Family-Hub centralizes it for one household, keeps both parents' calendars in sync with a single shared view, and offloads weekly meal planning to an AI agent that respects the recipes you actually cook and your busy nights.",
    architecture:
      "A single Next.js 16 app (App Router, React 19, Server Actions) with no separate API — mutations flow through a service layer the AI tools reuse, so business logic lives once. Data is in Neon Postgres via Drizzle ORM; auth is Auth.js (NextAuth v5) with Google, requesting Calendar scope so sign-in also authorizes sync (refresh tokens encrypted at rest). A Vercel Cron job runs incremental two-way calendar sync every 15 minutes, and the meal planner is a tool-calling agent on the Vercel AI SDK (DeepSeek).",
    tags: ["Next.js 16", "Server Actions", "Drizzle ORM", "Neon Postgres", "Auth.js", "Google Calendar API", "Vercel AI SDK"],
    images: [
      { src: "/screenshots/family-hub.png", label: "Dashboard" },
      { src: "/screenshots/family-hub-meals.png", label: "Chef Agent" },
      { src: "/screenshots/family-hub-tasks.png", label: "Tasks" },
    ],
  },
  {
    title: "Leo List — Kids' Chore & Reward App",
    tagline: "Sync chores & star rewards",
    status: "LIVE PWA",
    summary:
      "A jungle-themed chore-and-reward app for families. Kids check off daily chores to earn stars and trade them for parent-defined rewards, with an optional “Jungle Math” mini-game for bonus stars. One Expo codebase ships to Android and a hosted web PWA.",
    problem:
      "It gives families a simple, gamified way to track chores and motivate young kids with a visible star economy, synced across phones via one shared family login. The hosted PWA means iPhone users can add it to their home screen without the App Store, and a parent PIN keeps kids from approving their own rewards.",
    architecture:
      "Expo SDK 54 / React Native 0.81 with expo-router, shipping native Android and a static web build via react-native-web. State is React Context; Firebase provides email/password auth and Firestore, with data namespaced per family (families/{uid}/…) and enforced by Firestore security rules. Star balances update in real time via Firestore snapshot listeners, and persistence is platform-aware (IndexedDB on web, AsyncStorage on native).",
    tags: ["Expo", "React Native", "expo-router", "Firebase", "Firestore", "react-native-web", "PWA"],
    image: "/screenshots/leo-list.png",
    liveUrl: "https://leo-list.web.app",
  },
  {
    title: "This Site — AI “Digital Twin” Portfolio",
    tagline: "The site you're reading",
    status: "LIVE BUILD",
    summary:
      "Built end to end as part of my self-directed software study: a server-rendered portfolio with a retro arcade intro and a “Digital Twin” AI chat that answers questions about my background in my own voice.",
    problem:
      "A résumé is static. This turns it into an interactive experience that maps my operations record to the Scrum Master role and demonstrates hands-on technical ability — scoped vision → epic → story like a real delivery backlog.",
    architecture:
      "Next.js 16 (App Router, React 19, TypeScript): static content is server-rendered, with the arcade gate, AI chat, and contact form as isolated client islands. An /api/chat route proxies to DeepSeek with input validation and an origin allow-list, and Web3Forms handles the contact form. Deployed on Vercel.",
    tags: ["Next.js 16", "React 19", "TypeScript", "DeepSeek", "Web3Forms", "Vercel"],
    image: "/screenshots/career-website.png",
    repoUrl: "https://github.com/giuseprinaldi/Career-Website",
  },
];
