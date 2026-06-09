// Portfolio / Work section. The first entry is this site itself (the headline build artifact).
// Entries flagged `isPlaceholder` are clearly-marked slots for Joe to fill with real repo
// links, project blurbs, and certification details (see plan: "What I still need from Joe").

export interface Project {
  num: string;
  title: string;
  status: string;
  description: string;
  tags: string[];
  href?: string;
  isPlaceholder?: boolean;
}

export const projects: Project[] = [
  {
    num: "01",
    title: "This Site — AI “Digital Twin” Portfolio",
    status: "LIVE BUILD",
    description:
      "Designed and built end to end as part of my self-directed software study: a Next.js 16 / React 19 / TypeScript app with a server-rendered portfolio and a DeepSeek-powered AI chat that answers questions about my background. Scoped vision → epic → story, just like a delivery backlog.",
    tags: ["Next.js 16", "React 19", "TypeScript", "DeepSeek AI", "Vercel"],
    // href is filled with the production URL once deployed.
  },
  {
    num: "02",
    title: "SAFe® Scrum Master (SSM)",
    status: "IN PROGRESS",
    description:
      "Pursuing SSM/PSM certification within my first year. [Add provider, course link, and target completion date.]",
    tags: ["Scrum", "SAFe", "Agile"],
    isPlaceholder: true,
  },
  {
    num: "03",
    title: "[Your project or repo]",
    status: "ADD LINK",
    description:
      "Placeholder — send me a title, a one-line description, a link, and a few tags, and I'll drop the real project in here.",
    tags: ["—"],
    isPlaceholder: true,
  },
];
