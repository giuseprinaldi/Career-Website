// The "Role Fit" section: each BAE Scrum Master responsibility paired with concrete evidence
// from Joe's résumé. This maps the job description 1:1 so a reviewer can see the fit at a glance.

export interface RoleFitItem {
  responsibility: string; // from the BAE Systems job description
  evidence: string; // from the résumé
}

export const roleFit: RoleFitItem[] = [
  {
    responsibility: "Champion Lean and Agile principles that guide the team to deliver maximum value.",
    evidence:
      "A decade of Lean operations leadership — cutting labor cost 3% while holding 85%+ satisfaction and lifting onboarding efficiency 50% — always optimizing flow toward measurable value.",
  },
  {
    responsibility: "Facilitate core Scrum events (stand-up, planning, review, retro) and support PI Planning.",
    evidence:
      "Ran high-pressure, cross-functional teams and facilitated 20+ complex custom events end to end, coordinating every stakeholder and requirement through to delivery.",
  },
  {
    responsibility: "Clear impediments so the team's flow of value continuously improves.",
    evidence:
      "Coordinate across supply chain, logistics, and operations to clear delivery impediments and reduce errors; coached teams by removing blockers so they could execute.",
  },
  {
    responsibility: "Keep the backlog refined, prioritized, and ready with the Product Owner.",
    evidence:
      "Manage a 50+ account book and a 30+ prospect pipeline, continuously prioritizing and refining a backlog against client value and readiness.",
  },
  {
    responsibility: "Ensure clear acceptance criteria and a documented Definition of Done before work is marked “Done.”",
    evidence:
      "Authored and implemented all core operating processes, establishing clear standards and “definition of done” criteria adhered to across the operation.",
  },
  {
    responsibility: "Maintain transparent Agile metrics (velocity, burn-up/down, CFD) in JIRA / Azure DevOps.",
    evidence:
      "Built and maintained balanced, KPI-driven metrics systems from the ground up, communicating clear expectations and continuously inspecting performance against them.",
  },
  {
    responsibility: "Translate high-level epics into well-sized, ready-to-build stories.",
    evidence:
      "Self-directed study in software-project frameworks — scoping work vision → initiative → epic → story — applied hands-on to designing and building this site.",
  },
  {
    responsibility: "Lead retrospectives that surface actionable improvements and track them to outcomes.",
    evidence:
      "Implemented recurring monthly/quarterly review cycles and the operation's first performance-review process, driving a ~20% increase in per-guest sales.",
  },
  {
    responsibility: "Support internal and external audits with documentation of process adherence.",
    evidence:
      "Documentation-first operator: I authored the process libraries, standards, and metrics that made adherence repeatable and auditable.",
  },
  {
    responsibility: "Pursue SAFe Scrum Master (SSM) or equivalent certification within 12 months.",
    evidence:
      "Already in motion — actively pursuing Scrum Master fundamentals ahead of SSM/PSM certification, alongside ongoing hands-on software study.",
  },
];
