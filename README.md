# Joe Rinaldi — Scrum Master Portfolio

A personal portfolio site presenting Joe Rinaldi's transition from operations leadership into
Agile delivery / Scrum Master work. Built with **Next.js 16 (App Router)**, **React 19**, and
**TypeScript**, with a retro arcade-gate intro and a DeepSeek-powered "Digital Twin" AI chat.

## Highlights

- **Role Fit** section mapping the Scrum Master job description 1:1 to real experience.
- **Arcade gate** intro — drag the coin into the slot **or press the spacebar** to enter
  (keyboard-accessible; respects `prefers-reduced-motion`).
- **Digital Twin chat** — `/api/chat` proxies to DeepSeek with a first-person persona;
  validated, origin-locked, and capped.
- **Working contact form** via Web3Forms (no backend secret required).

## Stack

Next.js 16 · React 19 · TypeScript 5 · lucide-react · DeepSeek API · Web3Forms · Vercel.

## Project structure

```
src/
  app/
    page.tsx             # server component; composes the sections inside <SiteShell>
    layout.tsx           # header / nav / footer / metadata
    globals.css          # design tokens, utilities, animations (+ reduced-motion guard)
    api/chat/route.ts    # DeepSeek proxy (validation + origin allow-list)
  components/
    SiteShell.tsx        # client: gate state + content fade + chat
    ArcadeGate/          # client island: coin gate, drag + spacebar, audio synth
    DigitalTwinChat/     # client island: AI chat widget
    ContactForm/         # client island: Web3Forms submit
    sections/            # Hero, About, RoleFit, Journey, Skills, Portfolio, Contact
  data/                  # experiences, competencies, roleFit, projects, chat, site
```

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in the keys
npm run dev                  # http://localhost:3000
```

### Environment variables

| Variable | Required | Notes |
|---|---|---|
| `DEEPSEEK_API_KEY` | yes (for chat) | Server-side only. Powers `/api/chat`. |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | yes (for contact form) | Public by design; from web3forms.com. |
| `NEXT_PUBLIC_SITE_URL` | recommended in prod | Your production origin, for the chat origin allow-list. |

## Build & deploy

```bash
npm run build && npm start
```

Deploys to **Vercel**: import the repo, set the three env vars in the Vercel project settings,
and deploy. Set `NEXT_PUBLIC_SITE_URL` to the production URL once known.

## To finish

- Export the résumé to `public/Joe_Rinaldi_Resume_ScrumMaster.pdf` (the "Download résumé" button links here).
- Fill the placeholder cards in `src/data/projects.ts` with real project links / certification details.
