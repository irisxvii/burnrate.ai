# BurnRateAI

BurnRateAI is an AI spend auditing tool for startups and engineering teams juggling way too many AI subscriptions.

The product helps teams understand:
- where AI spend is overlapping
- which tools are redundant
- where optimization opportunities exist
- how much money could potentially be saved

It generates:
- savings estimates
- optimization recommendations
- shareable audit reports

A team might end up paying separately for:
- Cursor for devs
- ChatGPT Team for general usage
- Copilot because one team prefers it
- Gemini because someone wanted to try it

None of those purchases feel expensive individually.
But together, they quietly turn into a surprisingly large operational cost.

BurnRateAI is designed for teams that adopted AI tools organically and now want a clearer picture of what they’re actually paying for.





# Demo & Screenshots

https://github.com/user-attachments/assets/5365f4c6-735d-4252-8605-7ba2e3466853



<img width="1123" height="483" alt="image" src="https://github.com/user-attachments/assets/b264d069-871f-48ec-a95c-30e88343ea66" />
*link preview in discord*

<img width="1731" height="921" alt="image" src="https://github.com/user-attachments/assets/acabc2c7-6589-4802-b191-51efc21f02d2" />
*email sent*

<img width="1847" height="933" alt="image" src="https://github.com/user-attachments/assets/ea14c858-890d-41ef-9e68-ccd46fec864b" />
*step 1 of 3*

<img width="1848" height="938" alt="image" src="https://github.com/user-attachments/assets/0b5c43c3-d046-4768-accb-8c9646c0b480" />
*results page* <br/>
added only few screenshots as ive added a seperate demo video



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
burnrateai.dev
```
