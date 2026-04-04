# Portfolio v4 — React + Vite + Tailwind CSS

## Animation Stack

| Layer | Tool | Used For |
|---|---|---|
| Layout & styles | **Tailwind CSS** | Spacing, colors, typography, responsive design |


## Tech Stack

- **Framework**: React 18 + Vite 5
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v3
- **Contact API**: Vercel serverless + Resend
- **Linting**: ESLint 9 + Prettier
- **Deployment**: Vercel

## Getting Started

```bash
npm install
cp .env .env.local   # add RESEND_API_KEY + CONTACT_EMAIL
npm run dev
```

## Contact Form Setup

1. Sign up at [resend.com](https://resend.com) (free — 3,000 emails/month)
2. Create an API key
3. Add to `.env.local`:

```env
RESEND_API_KEY=re_your_key_here
CONTACT_EMAIL=you@yourdomain.com
```

## Deploy to Vercel

```bash
npx vercel        # first deploy
npx vercel --prod # production
```

Add env vars in Vercel dashboard → Project → Settings → Environment Variables.

## Project Structure

```
portfolio-v2/
├── api/
│   └── contact.ts              # Vercel serverless — validates + sends via Resend
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Reveal.tsx      # GSAP-powered scroll reveal wrapper
│   │   │   ├── Tag.tsx         # Pill tag component
│   │   │   └── SectionLabel.tsx
│   │   ├── Cursor.tsx          # Framer Motion spring cursor (dot + lagging ring)
│   │   ├── Navbar.tsx          # Framer Motion entrance + hover springs
│   │   ├── Hero.tsx            # Framer stagger + GSAP parallax ghost text
│   │   ├── Marquee.tsx         # GSAP infinite ticker with hover slow-down
│   │   ├── About.tsx           # GSAP SplitText headline + staggered reveal
│   │   ├── Services.tsx        # GSAP row stagger + Framer hover springs
│   │   ├── Work.tsx            # GSAP ScrollTrigger per-card reveal + Framer hover
│   │   ├── Contact.tsx         # GSAP SplitText + Framer AnimatePresence form
│   │   └── Footer.tsx
│   ├── data/
│   │   ├── projects.ts         # ← Edit your projects here
│   │   └── services.ts         # ← Edit your services here
│   ├── hooks/
│   │   ├── useCursor.ts        # Framer Motion spring mouse tracking
│   │   ├── useGsapReveal.ts    # GSAP ScrollTrigger reveal with stagger
│   │   ├── useParallax.ts      # GSAP scrub-based parallax
│   │   └── useSplitText.ts     # GSAP word-split headline animation
│   ├── lib/
│   │   ├── gsap.ts             # Central GSAP plugin registration
│   │   └── utils.ts            # cn() Tailwind merge helper
│   ├── types/index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css               # Tailwind directives + custom utilities
├── public/favicon.svg
├── vercel.json
├── tailwind.config.ts          # Design tokens: colors, fonts, animations
├── vite.config.ts
└── tsconfig.json
```

## Customization

| What | Where |
|---|---|
| Projects | `src/data/projects.ts` |
| Services / expertise | `src/data/services.ts` |
| Colors & design tokens | `tailwind.config.ts` |
| Fonts | `index.html` Google Fonts link |
| Contact info & socials | `src/components/Contact.tsx` |
| Animation timing | Each hook in `src/hooks/` |

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | TypeScript check + Vite build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Prettier format all files |
