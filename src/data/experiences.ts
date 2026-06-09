// Career history, reframed in Agile/delivery language but kept faithful to the résumé
// (Joe_Rinaldi_Resume_ScrumMaster.docx). The résumé is authoritative on dates/locations;
// the older LinkedIn export differs (Sysco "Boston, MA", Seoul Kitchen ending Jan 2024) and
// is not used where it conflicts.

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  logoLetter: string;
  color: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    role: "Sales Consultant",
    company: "Sysco",
    period: "Jan 2024 – Present",
    location: "Plympton, MA",
    logoLetter: "S",
    color: "var(--accent-emerald)",
    highlights: [
      "Coordinate across supply chain, logistics, and operations teams to clear delivery and fulfillment impediments — reducing errors across a high-volume client base and keeping work flowing.",
      "Manage 50+ active accounts and a 30+ prospect pipeline, continuously prioritizing and refining a backlog of opportunities against client value and readiness.",
      "Analyze client purchasing data to surface trends and translate them into actionable, prioritized recommendations.",
      "Grew the territory to $2.3M in annual sales (60k cases/year) through sustained, transparent performance tracking.",
    ],
  },
  {
    role: "General Manager",
    company: "Seoul Kitchen",
    period: "Mar 2020 – Nov 2023",
    location: "Westford, MA",
    logoLetter: "S",
    color: "var(--accent-cyan)",
    highlights: [
      "Authored, organized, and implemented all core operating processes — establishing clear standards and “definition of done” criteria adhered to across the operation.",
      "Built and maintained a balanced metrics system, communicating clear expectations and continuously inspecting performance against them.",
      "Coached a five-member leadership team in an Integrator (delivery-orchestration) capacity, removing blockers so the team could execute.",
      "Led the COVID-era pivot to a new takeout process and marketing campaign, lifting revenue from $2.8M to $3.6M and growing takeaway orders 300%.",
    ],
  },
  {
    role: "Director, Food & Beverage",
    company: "Groton Publick House",
    period: "May 2018 – Jan 2020",
    location: "Groton, MA",
    logoLetter: "G",
    color: "var(--fg-subtle)",
    highlights: [
      "Built a KPI-driven metrics system from the ground up for a brand-new operation, with close attention to cost management and resource allocation.",
      "Recruited, trained, and mentored a 15-person team, uniting them behind a single concept and vision — driving $1M+ in first-year revenue.",
      "Facilitated 20+ complex custom events end to end, coordinating stakeholders and requirements to deliver $200K+ in additional revenue.",
      "Implemented recurring monthly and quarterly review cycles to surface improvements and develop the team.",
    ],
  },
];
