# BurnRateAI

BurnRate.ai is an AI spend auditing tool designed for startups and engineering teams using multiple AI subscriptions across their workflow. The platform analyzes overlapping tooling, identifies optimization opportunities, estimates potential savings, and generates shareable audit reports.

The product is designed for fast-growing teams that have adopted AI tools organically and want better visibility into tooling spend before costs spiral further.


# Screenshots / Demo

# Quick Start

## 1. Clone Repository

```bash
git clone https://github.com/irisxvii/burnrate.ai
cd burnrate.ai
```

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create:

```txt
.env.local
```

Add:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GEMINI_API_KEY=
RESEND_API_KEY=
```


## 4. Run Locally

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```


# Run Tests

```bash
npm test
```

# Decisions

## 1. Dynamic Open Graph Images Instead Of Static Previews

I decided to generate report previews dynamically using `next/og` instead of shipping one generic social image.

The main reason was that audit reports are naturally shareable, and personalized preview cards make those links feel much more real when dropped into Slack, X, or Discord.

Trade-off:
- slightly more rendering complexity
- extra server work for image generation

Worth it because the reports themselves are part of the distribution loop.

## 2. Multi-Step Flow Instead of One Giant Form

The onboarding flow is split across multiple smaller screens instead of dumping everything into a single form.

Trade-off:
- more routing/state management internally

But the UX feels way less intimidating.


## 3. Readable Slugs Instead Of UUID URLs

Public reports use URLs like:

```txt
/report/credex-5152
```

instead of exposing raw UUIDs.

Readable slugs:

- look cleaner
- are easier to paste into chats

Trade-off:

slightly more slug-generation logic need to handle collisions safely

## 4. Zustand Instead Of Context-Based State Management

I used Zustand for onboarding state because the audit flow spans multiple pages and the data shape grows pretty quickly.

Context would have worked, but Zustand kept things simpler:

- less boilerplate
- cleaner updates between screens

Trade-off:

- adds another dependency

But for this size of app, it felt like the right amount of structure.

## 5. Honeypot Protection Instead Of CAPTCHA

For the MVP, I intentionally avoided CAPTCHA and used a simple honeypot field instead.

Main reason:
CAPTCHAs are annoying, especially in onboarding flows where users are already entering a bunch of information.

Trade-off:
- weaker bot protection
- not enough for large-scale abuse prevention

# Deployed URL

```txt
burnrateai.vercel.app
```