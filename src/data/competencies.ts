// Scrum/Agile competency cards for the "Expertise" matrix. `icon` is a key mapped to a
// lucide-react component inside the Skills section; `accent` toggles the highlight color.

export interface Competency {
  icon: "servant" | "facilitate" | "backlog" | "metrics" | "improve" | "done";
  category: string;
  description: string;
  accent: "emerald" | "cyan";
}

export const competencies: Competency[] = [
  {
    icon: "servant",
    category: "Servant Leadership & Coaching",
    description:
      "Lead as a servant-leader: I've coached five-member leadership teams in a delivery-orchestration capacity, clearing blockers so people can do their best work.",
    accent: "emerald",
  },
  {
    icon: "facilitate",
    category: "Facilitation & Ceremonies",
    description:
      "Facilitate the cadence that keeps work flowing — stand-ups, planning, reviews, retrospectives, and PI Planning — built on a decade of running cross-functional teams and 20+ complex events end to end.",
    accent: "cyan",
  },
  {
    icon: "backlog",
    category: "Backlog Refinement & Prioritization",
    description:
      "Refine and prioritize backlogs against value and readiness. I manage a 50+ account book and 30+ prospect pipeline and decompose work vision → initiative → epic → story.",
    accent: "emerald",
  },
  {
    icon: "metrics",
    category: "Agile Metrics & Flow",
    description:
      "Make progress transparent with velocity, burn-down/up, and cumulative-flow metrics in JIRA / Azure DevOps. I've built balanced KPI systems from scratch and inspected performance against them.",
    accent: "cyan",
  },
  {
    icon: "improve",
    category: "Continuous Improvement & Retros",
    description:
      "Run retrospectives that surface actionable improvements and track them to done. I introduced recurring review cycles and a first-of-its-kind performance-review process that lifted results ~20%.",
    accent: "emerald",
  },
  {
    icon: "done",
    category: "Lean Process & Definition of Done",
    description:
      "Champion Lean principles with clear acceptance criteria and a documented Definition of Done. I authored the core process and DoD standards adhered to across an entire operation.",
    accent: "cyan",
  },
];
