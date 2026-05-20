# OCTETERS WEBSITE — COMPLETE DESIGN BRIEF FOR CLAUDE CODE

> **INSTRUCTIONS TO CLAUDE CODE:** This file contains EVERYTHING you need to build the Octeters website. Read it fully before writing any code. Reference it throughout the build. Do not deviate from these specifications unless the user explicitly asks for changes. Build section by section — start with the foundation (design system, layout, routing), then homepage sections in order, then inner pages.

---

## TABLE OF CONTENTS
1. [Project Overview](#1-project-overview)
2. [Tech Stack & Project Setup](#2-tech-stack--project-setup)
3. [Design System — The Rules](#3-design-system--the-rules)
4. [Reference Sites Analysis — What to Steal](#4-reference-sites-analysis--what-to-steal)
5. [Site Architecture & Navigation](#5-site-architecture--navigation)
6. [Homepage — Section by Section](#6-homepage--section-by-section)
7. [Animated Graphics Specifications](#7-animated-graphics-specifications)
8. [Inner Pages — Content & Layout](#8-inner-pages--content--layout)
9. [Contact Page — Conversion Form](#9-contact-page--conversion-form)
10. [Animation & Interaction Rules](#10-animation--interaction-rules)
11. [Responsive Breakpoints](#11-responsive-breakpoints)
12. [Quality Checklist](#12-quality-checklist)

---

## 1. PROJECT OVERVIEW

### What is Octeters?
Octeters builds AI-enabled software platforms for operations, commerce, and marketplaces.

### What this site must do (in order of priority):
1. **Create trust in 10 seconds** — visitor sees proof, premium design, clear positioning
2. **Explain what we do in 30 seconds** — 3 verticals, 6 services, clear language
3. **Convert in 60 seconds** — Book a call or request an estimate
4. **Success metric:** Qualified leads, not page views

### The one message repeated everywhere:
> "Octeters builds AI-enabled software platforms for operations, commerce, and marketplaces."

### Supporting points (short, proof-led):
- MVP to enterprise delivery
- Cloud + DevOps + QA built in
- Long-term support after launch

### CTAs:
- **Primary (everywhere):** Book a Call
- **Secondary:** View Case Studies / Get an Estimate

### Target buyer:
Decision-makers with **budget and urgency**. Not browsers. Not developers looking for docs. Business leaders who need software built NOW and want to trust the vendor quickly.

---

## 2. TECH STACK & PROJECT SETUP

```
Framework:     React 18 + TypeScript
Build tool:    Vite
Styling:       Tailwind CSS v4
Routing:       React Router v6 (BrowserRouter)
Icons:         Lucide React
Animations:    CSS keyframes + Intersection Observer (vanilla JS)
               Framer Motion for complex interactions (optional)
Fonts:         Rethink Sans (Google Fonts) — load weights 400, 500, 600, 700 + italic 400, 700
Deploy:        Static build (npm run build → dist folder)
```

### Routes to create:
```
/                          → Homepage
/services                  → Services overview
/services/:serviceId       → Service detail (6 pages)
/solutions                 → Solutions overview (optional, can redirect to home)
/solutions/:solutionId     → Solution landing page (5 pages)
/case-studies              → Case studies hub
/case-studies/:caseId      → Case study detail (3 pages)
/contact                   → Contact / conversion page
/company                   → About / company page
/resources                 → Resources / blog (placeholder)
```

---

## 3. DESIGN SYSTEM — THE RULES

### Color Palette (Dark Theme)

```css
/* Backgrounds */
--bg-primary:     #060810;    /* Main page background — near-black with deep blue undertone */
--bg-secondary:   #0A0E1A;    /* Alternate section background — slightly lighter */
--bg-card:        #0D1525;    /* Card backgrounds */
--bg-card-hover:  #122040;    /* Card hover state */
--bg-elevated:    #162848;    /* Modals, dropdowns, elevated surfaces */

/* Accent — electric blue palette */
--accent:         #1A6FFF;    /* Primary electric blue */
--accent-light:   #4D94FF;    /* Light blue for labels, tags */
--accent-dark:    #0050CC;    /* Darker blue for active states */
--accent-glow:    rgba(26, 111, 255, 0.18);  /* Glow/shadow color */
--violet:         #00B4D8;    /* Teal-cyan secondary accent */
--purple:         #48CAE4;    /* Light teal tertiary accent */

/* Text */
--text-primary:   #F0F4FF;    /* Main text — cool near-white */
--text-secondary: #8BA3C4;    /* Descriptions, body copy */
--text-muted:     #4D6A8A;    /* Least important text */

/* Borders */
--border-default: rgba(26, 111, 255, 0.12);   /* Default borders */
--border-hover:   rgba(26, 111, 255, 0.25);   /* Hover state borders */
--border-accent:  rgba(26, 111, 255, 0.4);    /* Accent borders */

/* Status colors (for animated mockups) */
--green:          #10B981;    /* Success, completed */
--amber:          #F59E0B;    /* Processing, in progress */
--red:            #EF4444;    /* Error, alert */
--blue:           #1A6FFF;    /* Info, building */
```

### Typography Scale

```
Display (hero headlines):        56px desktop / 36px mobile  — font-weight: 700 — line-height: 1.1
H1 (page titles):               48px desktop / 32px mobile  — font-weight: 700 — line-height: 1.15
H2 (section headings):          40px desktop / 28px mobile  — font-weight: 600 — line-height: 1.2
H3 (card titles):               24px desktop / 20px mobile  — font-weight: 600 — line-height: 1.3
H4 (small headings):            20px desktop / 18px mobile  — font-weight: 600 — line-height: 1.4
Body large:                     18px — font-weight: 400 — line-height: 1.7 — color: var(--text-secondary)
Body:                           16px — font-weight: 400 — line-height: 1.7 — color: var(--text-secondary)
Body small:                     14px — font-weight: 400 — line-height: 1.6 — color: var(--text-muted)
Section label:                  12px — font-weight: 600 — uppercase — letter-spacing: 0.2em — color: var(--accent-light)
```

All headings: `color: var(--text-primary)`. All body text: `color: var(--text-secondary)`.
Font family: `'Rethink Sans', system-ui, -apple-system, sans-serif`

**Rethink Sans note:** This is the same font cradle.bio uses. Slightly rounder and friendlier than Inter at large sizes. Use tighter letter-spacing on display headings (`letter-spacing: -0.02em`) and stat numbers (`letter-spacing: -0.03em`) to make them feel premium and dense. Load italic 400 for testimonial quotes.

```html
<!-- In index.html <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,700&display=swap" rel="stylesheet">
```

### Spacing System

```
Section vertical padding:   py-24 (96px) on mobile → py-32 (128px) on tablet → py-40 (160px) on desktop
Content max-width:          max-w-7xl (1280px), centered with mx-auto
Content horizontal padding: px-5 (20px) mobile → px-8 (32px) tablet → px-12 (48px) desktop
Between section label and heading: mb-4 (16px)
Between heading and description: mb-6 (24px)
Between description and content: mb-12 to mb-16 (48-64px)
Card grid gap:              gap-6 (24px) mobile → gap-8 (32px) desktop
Card internal padding:      p-6 (24px) mobile → p-8 (32px) desktop
```

**CRITICAL RULE:** The spacing must be **generous** — like cradle.bio and viteplus.dev. When in doubt, add MORE space, not less. The site should breathe. White space (dark space in our case) is a feature, not a bug.

### Button Styles

**Primary Button:**
```css
/* Gradient background, glow shadow, slight lift on hover */
background: linear-gradient(135deg, #1A6FFF 0%, #00B4D8 100%);
color: white;
font-weight: 600;
font-size: 14px;
padding: 14px 28px;
border-radius: 12px;
box-shadow: 0 0 20px rgba(26, 111, 255, 0.35), 0 4px 12px rgba(0, 0, 0, 0.3);
transition: all 0.3s ease;

/* Hover: */
box-shadow: 0 0 35px rgba(26, 111, 255, 0.55), 0 6px 20px rgba(0, 0, 0, 0.4);
transform: translateY(-1px);
```

**Secondary Button:**
```css
/* Ghost/outline style */
background: rgba(255, 255, 255, 0.03);
color: var(--text-primary);
font-weight: 600;
font-size: 14px;
padding: 14px 28px;
border-radius: 12px;
border: 1px solid var(--border-hover);
transition: all 0.3s ease;

/* Hover: */
border-color: var(--accent);
background: rgba(26, 111, 255, 0.08);
transform: translateY(-1px);
```

### Card Styles

```css
background: var(--bg-card);
border: 1px solid var(--border-default);
border-radius: 16px;
padding: 24px; /* or 32px for larger cards */
transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);

/* Hover: */
border-color: var(--border-hover);
background: var(--bg-card-hover);
box-shadow: 0 0 40px rgba(26, 111, 255, 0.06);
transform: translateY(-2px);
```

### Chip/Tag Styles
```css
background: rgba(26, 111, 255, 0.12);
color: var(--accent-light);
font-size: 12px;
font-weight: 500;
padding: 4px 12px;
border-radius: 9999px;
border: 1px solid rgba(26, 111, 255, 0.2);
```

### Gradient Text
```css
background: linear-gradient(135deg, #1A6FFF, #00B4D8);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

### Section Label Pattern
Every section follows this pattern (inspired by cradle.bio):
```
SECTION LABEL    ← 12px, uppercase, indigo, tracking-wide
Main Heading     ← 40px, white, bold
Description      ← 18px, gray, 1-2 lines max
                 ← generous gap
[Content]        ← cards, graphics, etc.
```

---

## 4. REFERENCE SITES ANALYSIS — WHAT TO STEAL

### From doss.com (PRIMARY structural reference):
- **Dark theme** with near-black backgrounds and crisp white text
- **Sticky header** with clean nav + high-contrast CTA button always visible
- **DOSS-style product UI mockups** — they show animated versions of their actual platform (dashboards, data tables, workflows) that look like you're watching a live product demo. THIS IS THE KEY VISUAL APPROACH FOR OCTETERS
- **Modular card layout** with hover states
- **Social proof early** — logos, customer quotes with real names/titles, stat callouts
- **Numbered steps** for process sections ("01, 02, 03")
- **Repeated CTAs** — "Book a demo" appears 4+ times, never annoying
- **Animated workflow status indicators** — "Processing", "Reviewed", "Done" badges

### From cradle.bio (CLIENT'S FAVORITE — gold standard for feel):
- **The most generous spacing of any reference** — massive vertical padding, nothing crowded
- **Soft scroll-triggered animations** — subtle fade-in + slide-up, not flashy
- **Section structure** — small label → large heading → subtext → visual/cards
- **Step-by-step numbered process** with visual flow
- **Trust badges as feature cards** (SOC 2, Privacy-first, etc.)
- **Warm final CTA** — "You made it. Nice. Now, let's talk?" — conversational, not corporate
- **The readability is the design** — content is effortless to scan and absorb

### From spade.com:
- **Animated data visualizations** — live dashboards, transaction flows
- **Use-case tabs** — clickable tabs that change content below
- **Case study carousel** with stats and "Read case study" links
- **Strong stat blocks** — bold numbers with context

### From valentincheval.design:
- **Credibility system** — awards, experience metrics, client logos above the fold
- **Deep testimonials** with names, titles, context (not generic 1-liners)
- **Portfolio as proof** — visual case study cards

### From conductorai.com:
- **Animated workflow diagrams** — files moving through processing stages with status badges
- **Terminal/code-like aesthetics** — monospace fonts, progress logs
- **Numbered case study cards** with descriptions
- **Status indicators** — colored chips showing state changes

### From viteplus.dev:
- **Crystal clear readability** — perfect font sizes, weights, line heights
- **Tabbed content sections** where content changes per tab
- **Terminal/code output blocks** — styled command output
- **Mixed light/dark section backgrounds** for visual rhythm
- **Stats with logos** — "123m+ Weekly npm downloads"

### From lightdash.com:
- **Clean light-on-dark hero** with large serif-adjacent display text
- **Product screenshot mockup in hero** — browser-frame style preview showing the actual product
- **Logo strip** below hero for social proof (Kraken, Adobe, Workday, etc.)
- **Testimonial carousel** with real photos, names, companies
- **"Happiness Curve" timeline** — creative visualization of the onboarding journey
- **Alternating testimonial + feature sections** — quote → feature block → quote → feature block

### From obsidianos.com:
- **Ultra-clean minimal design** — fewer elements, more impact
- **Product feature tabs** — "Independent firms" / "Consolidators" as toggleable views
- **Feature preview panels** — showing actual product UI inside cards with labels
- **Trust/compliance badges** — "FCA authorisation", "SOC2 audit", "Zero data leakage"
- **Very restrained color** — mostly monochrome with one accent color
- **Compact information density** — gets the message across without lengthy paragraphs

---

## 5. SITE ARCHITECTURE & NAVIGATION

### Header (Sticky):
```
[Octeters Logo]   Services ▾   Solutions ▾   Case Studies   Company   Resources   |   [Book a Call] (primary btn)
```
- Sticky on scroll with glass-morphism effect (frosted dark background, blur)
- Logo: text "Octeters" or a simple mark — clean, no fuss
- "Book a Call" button is ALWAYS visible — it's the conversion anchor
- Mobile: hamburger menu, "Book a Call" stays visible
- On scroll down: header gets a subtle border-bottom and slightly darker bg

### Footer:
```
Column 1: Octeters logo + 1-line positioning + social links
Column 2: Services (6 links)
Column 3: Solutions (5 links)
Column 4: Company (About, Careers, Contact)
Column 5: Resources (Blog, Case Studies)

Bottom bar: © 2024 Octeters. All rights reserved.  |  Privacy  |  Terms
```
Dark background (--bg-secondary), generous padding, subtle top border.

---

## 6. HOMEPAGE — SECTION BY SECTION

Build these in order. Each section should be a separate React component.

---

### SECTION 1: Hero
**Component name:** `HeroSection`
**Purpose:** Trust in 10 seconds + primary CTA

**Layout:** Two columns on desktop (60/40). Stack on mobile (text first, graphic below).

**Left column (text):**
- Section label: `AI-ENABLED SOFTWARE`
- Headline: `We Build AI-Enabled Software Platforms`
  - "AI-Enabled" should use the gradient-text effect
  - Size: 56px desktop, 36px mobile
- Subheadline: `For operations, commerce, and marketplaces — from MVP to enterprise scale.`
  - Size: 18px, color: var(--text-secondary)
- Gap: 32px
- Two buttons side by side:
  - `Book a Call` (primary button)
  - `View Case Studies` (secondary button)
- Below buttons (24px gap): Trust line
  - `Trusted by teams building next-gen platforms`
  - Small text (14px, muted) with 3-4 placeholder logo marks (gray rectangles or simple text logos)

**Right column (animated graphic):**
- **DOSS-style animated dashboard mockup** (see Section 7 for full spec)
- A realistic-looking software dashboard built entirely with HTML/CSS
- Dark UI card with rounded corners, subtle shadow
- Contains animated elements: data table rows appearing, status badges, chart drawing, notification toast

**Background:**
- Faint grid pattern (thin lines at 3% opacity, pulsing slowly 4s loop)
- Two gradient orbs: indigo top-right (300px, blur 100px, 12% opacity, floating), violet bottom-left (250px, blur 80px, 10% opacity, floating)

---

### SECTION 2: Proof / Metrics Strip
**Component name:** `MetricsSection`
**Purpose:** Kill doubt with numbers

**4 stat cards in a row** (2×2 on mobile):

| Number | Label |
|--------|-------|
| 50+ | Platforms Delivered |
| AI-First | Since 2022 |
| 3 | Continents Served |
| 24/7 | Post-Launch Support |

**Each card:**
- Large number (48px, bold, white) with animated counter (counts from 0 on scroll-in) and subtle pulsing indigo text-glow
- Label below (14px, --text-secondary)
- Small SVG sparkline (~60px wide) showing upward trend, draws itself on scroll-in
- Card uses glass styling (frosted bg, subtle border)
- Pulse ring effect: a circle expands from behind the number and fades out, looping every 2.5s

**Section background:** --bg-secondary for contrast with hero

---

### SECTION 3: What We Build (3 Verticals)
**Component name:** `VerticalsSection`
**Purpose:** Visitor self-selects into their problem

- Section label: `WHAT WE BUILD`
- Heading: `Software for the industries that matter`
- Subheading: `We lead with three lanes where we have the deepest proof.`

**3 large cards side by side** (stack on mobile):

**Card 1 — B2B Operations Software**
- Animated mini CRM dashboard mockup at top (~280×200px) — see Section 7
- Title: "B2B Operations Software"
- Description: "Accounting platforms, professional services tools, client ops systems."
- Proof link: "See MintCRM case study →" (links to /case-studies/mintcrm)
- Tags: `SaaS` `Automation` `Workflows`

**Card 2 — E-Commerce + Subscription**
- Animated mini storefront mockup at top — see Section 7
- Title: "E-Commerce + Subscription Commerce"
- Description: "Headless storefronts, subscription engines, payment integrations."
- Proof link: "High-ROI builds with ongoing optimization"
- Tags: `Commerce` `Payments` `Headless`

**Card 3 — Marketplaces & PropTech**
- Animated mini search platform mockup at top — see Section 7
- Title: "Marketplaces & PropTech Platforms"
- Description: "Data-rich platforms, search portals, investor tools."
- Proof link: "See buy.ca case study →" (links to /case-studies/buyca)
- Tags: `Marketplace` `PropTech` `Search`

**Below cards:** Small muted text: `Building something different? We work across verticals. →` (links to /contact)

---

### SECTION 4: Services (6-Card Grid)
**Component name:** `ServicesSection`
**Purpose:** Show technical depth without overwhelm

- Section label: `OUR CAPABILITIES`
- Heading: `End-to-end engineering, not just code`

**6 cards in 3×2 grid** (2×3 on tablet, 1 column on mobile):

| # | Title | Short Title | Icon (Lucide) | Description | Mini-mockup |
|---|-------|-------------|---------------|-------------|-------------|
| 1 | Product Engineering | MVP + Scale | Rocket | From idea to production in weeks, not months. | Code editor with lines typing in |
| 2 | Custom Software + Web Platforms | SaaS & Portals | Layers | SaaS, portals, APIs, modernization — platforms that last. | Multi-panel layout with modal |
| 3 | Generative AI | LLM + RAG + Agents | Brain | Production AI — not demos. LLMs, RAG, agents with guardrails. | Chat interface with AI responding |
| 4 | Cloud + DevOps | CI/CD & Infra | Cloud | Infrastructure as code, CI/CD, Kubernetes, observability. | Terminal showing deploy output |
| 5 | E-Commerce | Headless & Subscription | ShoppingCart | Headless commerce, subscriptions, payments, conversions. | Mini checkout flow |
| 6 | QA + Managed Support | Testing & AMS | Shield | Automated testing, security audits, post-launch support. | Test runner "24/24 passed" |

**Each card has:**
1. Animated mini-mockup at top (~120×80px) — loops infinitely (see Section 7)
2. Lucide icon (24px, indigo)
3. Title (H3, 20px)
4. 1-line description (14px, muted)
5. "See full capabilities →" link (small, indigo, links to /services/[id])

**Animation:** Cards fade-in with staggered delay (0.1s each) on scroll.

---

### SECTION 5: How We Work (4-Step Process)
**Component name:** `ProcessSection`
**Purpose:** Reduce anxiety about working with a new vendor

- Section label: `HOW WE WORK`
- Heading: `From first call to live product`

**DOSS-style animated workflow pipeline** (center of section — see Section 7 for full spec):
- A "file card" travels through 4 stages, changing status badges at each
- Connected by animated dashed lines with flowing dots
- Two files staggered for continuous flow feel

**4 step cards below the animation** (horizontal on desktop, vertical stack on mobile):

| Step | Title | Description |
|------|-------|-------------|
| 01 | Discovery & Scope | We learn your business, define outcomes, estimate honestly. |
| 02 | Design & Architecture | UI/UX design, system architecture, tech stack decision. |
| 03 | Build & Ship | Agile sprints, weekly demos, CI/CD from day one. |
| 04 | Launch & Support | Go live with confidence. Long-term support after launch. |

Each step card: step number in large indigo text, title (H4), description (body small).
When the animated file reaches a step, that card's border briefly glows indigo.

---

### SECTION 6: Case Studies (Proof)
**Component name:** `CaseStudiesSection`
**Purpose:** Show real outcomes

- Section label: `PROOF`
- Heading: `What we've built`

**3 case study cards** (horizontal scroll on mobile):

**Card: buy.ca**
- Product mockup at top (property listing UI — see Section 7)
- What: "PropTech platform with AI-powered search and investor tools"
- Outcome: "Data-rich listings platform serving Canadian real estate investors"
- Tags: `Marketplace` `AI` `PropTech`
- Link: "Read case study →"

**Card: MintCRM**
- Product mockup at top (CRM dashboard — see Section 7)
- What: "Vertical SaaS for accounting firm operations"
- Outcome: "Workflow automation for deadlines, clients, and team management"
- Tags: `SaaS` `B2B Operations` `Automation`
- Link: "Read case study →"

**Card: Agent 360**
- Product mockup at top (AI agent interface — see Section 7)
- What: "AI-powered agent platform for intelligent automation"
- Outcome: "Autonomous agents handling complex business processes"
- Tags: `AI` `Agents` `Platform`
- Link: "Read case study →"

**Below cards:** `View all case studies →` button (secondary)

---

### SECTION 7: Testimonial
**Component name:** `TestimonialSection`
**Purpose:** Human proof

- Full-width section with --bg-secondary background
- Large decorative quotation mark `"` behind text (gradient, 8% opacity, slowly shifting colors 6s loop)
- Quote text: large (24px), italic feel, white
- Below quote: name, title, company, small avatar placeholder
- Quote example: *"Octeters didn't just build our platform — they understood our business. The team shipped our MVP in 10 weeks and has been iterating with us ever since."*
- Attribution: *— Alex Rivera, CTO, [Company]*

---

### SECTION 8: Why Octeters (Differentiators)
**Component name:** `WhySection`
**Purpose:** Handle objections

- Section label: `WHY OCTETERS`
- Heading: `Built different`

**3 cards side by side:**

| Title | Description | Animated graphic |
|-------|-------------|-----------------|
| MVP to Enterprise | We start lean and scale with you. No throwaway prototypes. | Scaling visualization: 1 server → 3 → 6 grid |
| Cloud + DevOps + QA Built In | Not bolted on. Infrastructure, testing, and ops are part of every build. | CI/CD pipeline: Build → Test → Deploy with checkmark |
| Long-term Support | We don't disappear after launch. Managed support, monitoring, continuous improvement. | Uptime monitor: 99.9% + heartbeat line |

---

### SECTION 9: Final CTA Block
**Component name:** `FinalCTASection`
**Purpose:** Close the deal

- Background: --bg-secondary with faint grid pattern + large blurred gradient orb (indigo, centered, pulsing)
- Heading: `Ready to build?` (H2, gradient-text)
- Subheading: `Book a 30-minute call. No pitch deck. Just your problem and our honest take.`
- Two buttons: `Book a Call` (primary) + `Get an Estimate` (secondary)
- Below buttons: reassurance line (14px, muted):
  `Reply within 24 hours · NDA-friendly · Weekly demos and clear milestones`
- CTA button has a pulsing glow halo (2s loop)
- Tone should feel like cradle.bio's warm close — confident but approachable

---

## 7. ANIMATED GRAPHICS SPECIFICATIONS

All graphics are built with **HTML/CSS only** (styled divs, borders, backgrounds — no images). Animations use **CSS keyframes** that loop infinitely. This is the DOSS approach — showing realistic-looking product UI that feels alive.

### Global Animated Backgrounds

**Grid pattern:**
```css
background-image:
  linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
background-size: 60px 60px;
/* Pulse opacity 3%→8%→3% on 4s loop */
```

**Gradient orbs:**
- Large blurred circles (200-400px), `border-radius: 50%`, `filter: blur(80-100px)`
- Indigo and violet, 10-15% opacity
- Floating up/down (20px range, 6-8s loop)
- Place behind hero, CTA blocks, and contact page

---

### Hero Dashboard Mockup (~550×380px)

Build a realistic dark-themed dashboard using HTML divs:

```
┌─────────────────────────────────────────────────┐
│ ● ● ●    [Search bar ▋]              [Avatar ●] │  ← Header bar
├──────┬──────────────────────────────────────────┤
│ ■ Nav│  ┌──────────────────┐ ┌────────────────┐ │
│ ■ Nav│  │ Revenue    $124K │ │ Active    847  │ │  ← Stat cards
│ ■ Nav│  └──────────────────┘ └────────────────┘ │
│ ■ Nav│  ┌──────────────────────────────────────┐ │
│ ■ Nav│  │ ■ Task 1        ● Completed          │ │  ← Data table rows
│      │  │ ■ Task 2        ◐ Processing...      │ │     (fade in staggered)
│      │  │ ■ Task 3        ○ Pending            │ │
│      │  │ ■ Task 4        ● Completed          │ │
│      │  └──────────────────────────────────────┘ │
│      │  ┌──────────────────┐                     │
│      │  │ 📈 [chart line]  │  [Toast notification]│  ← Chart draws itself
│      │  └──────────────────┘  slides in/out       │
└──────┴──────────────────────────────────────────┘
```

**Animations (all infinite loops):**
- Sidebar active indicator moves to next item every 3s
- Data table rows fade in one by one (0.5s stagger), then reset after 4s
- Status badges: "Completed" = green dot, "Processing" = amber pulsing dot, "Pending" = gray
- Chart: area line draws left→right over 3s, then area fills with gradient. Resets every 6s
- Toast notification slides in from top-right, shows "3 tasks completed", stays 2s, slides out. Loops every 8s
- Search bar has blinking cursor
- Avatar has green "online" dot pulsing

**Styling:** bg: #1a1f2e, rounded-2xl border, subtle shadow. Text is small (10-12px) gray monospace for realism. Indigo accents for active states.

---

### Vertical Card 1 — B2B Operations Mockup (~280×200px)

```
┌────────────────────────────────────┐
│ ☰ Clients │ ☐ Review Q3 report   ✓│
│   Deadlines│ ☐ Send proposal      ✓│  ← Checkboxes fill + strikethrough
│   Workflows│ ☐ Update forecast     │     one by one, 4s loop
│   Reports  │                       │
│            │ ▓▓▓▓▓▓▓▓░░ 72%       │  ← Progress bar fills to 100%
│─────────────────────────────────────
│ Activity: J.Smith viewed invoice   │  ← Feed items slide in
│           M.Chen completed task    │
└────────────────────────────────────┘
```

### Vertical Card 2 — E-Commerce Mockup (~280×200px)

```
┌────────────────────────────────────┐
│ ┌──────┐ ┌──────┐                  │
│ │ $49  │ │ $79  │  SALE badge fades│  ← 2×2 product grid
│ └──────┘ └──────┘  in on one       │
│ ┌──────┐ ┌──────┐                  │
│ │ $129 │ │ $199 │                  │
│ └──────┘ └──────┘                  │
│ ●───●───●───◐  Order tracking     │  ← Highlight moves dot-to-dot
│ Revenue: $12,847 ↑                 │  ← Counter ticks up slowly
│ [✓ Payment confirmed]             │  ← Slides in, holds, slides out
└────────────────────────────────────┘
```

### Vertical Card 3 — Marketplace Mockup (~280×200px)

```
┌────────────────────────────────────┐
│ 🔍 [Toronto condos▋]              │  ← Text types itself
│ ┌──────────────────┐  ┌──┐        │
│ │ 123 Queen St     │  │📍│        │  ← Listing cards slide in
│ │ $489,000         │  │📍│ map    │     staggered
│ ├──────────────────┤  │📍│pins    │  ← Pins drop in one by one
│ │ 456 King West    │  │  │drop    │
│ │ $675,000         │  └──┘in      │
│ └──────────────────┘              │
│ [$500K-1M] [2+ bed] [Downtown]   │  ← Filter tags slide in
└────────────────────────────────────┘
```

### Service Mini-Mockups (~120×80px each)

**Product Engineering — Code Editor:**
```
┌──────────────────┐
│ 1 │ const app =  │  ← Lines type in one by one
│ 2 │   buildMVP() │     cursor blinks at end
│ 3 │ app.deploy() │     4s loop
│   │         ▋    │
└──────────────────┘
```
Monospace font (12px). Syntax-colored lines (blue, green, white).

**Custom Software — Multi-panel:**
```
┌──────────────────┐
│ ┌─┐ ┌──────────┐ │
│ │S│ │ [Modal]   │ │  ← Modal slides up, shows form fields,
│ │i│ │  Name: ▋  │ │     fields fill in, modal closes
│ │d│ │  Email:   │ │     5s loop
│ │e│ │  [Submit] │ │
│ └─┘ └──────────┘ │
└──────────────────┘
```

**Generative AI — Chat Interface:**
```
┌──────────────────┐
│ You: Analyze Q3  │  ← User message appears
│                  │
│ AI: ●●●          │  ← Typing dots then response
│ AI: Revenue is   │     streams in character by char
│     up 23%...    │     6s loop
└──────────────────┘
```

**Cloud + DevOps — Terminal:**
```
┌──────────────────┐
│ $ deploying...   │  ← Text types in
│ ▓▓▓▓▓▓▓▓░░ 80%  │  ← Progress bar fills
│ ✓ Deploy complete│  ← Checkmark appears green
│                  │     4s loop
└──────────────────┘
```
Green text on dark bg. Monospace font.

**E-Commerce — Checkout Flow:**
```
┌──────────────────┐
│ [Product] → 🛒+1 │  ← Product highlights, cart badge pops
│ ─────────────────│
│ [💳 Pay $49.00]  │  ← Payment bar slides in
│ ✓ Order placed   │  ← Confirmation appears
└──────────────────┘     5s loop
```

**QA + Support — Test Runner:**
```
┌──────────────────┐
│ Running tests... │  ← Text types in
│ ▓▓▓▓▓▓▓▓▓▓ 100% │  ← Progress bar fills
│ 24/24 passed ✓   │  ← Green text + checkmark
│ Coverage: 94%    │  ← Number counts up
└──────────────────┘     4s loop
```

---

### Process Pipeline Animation

```
[FILE CARD] ──→ Step 1 ──→ Step 2 ──→ Step 3 ──→ Step 4
  "New" (gray)   "In Review"    "Building"     "Delivered"
                  (amber ◐)    (blue ▓▓░)     (green ✓)
```

- A small card (120×40px) with file icon + "project_brief.pdf" text
- Card slides right through 4 positions over 12s
- At each position, status badge changes color + text
- Dashed connection lines between positions with small dots flowing along them
- Two file cards staggered (second starts 6s after first) for continuous flow
- When file reaches a step, the step card below briefly glows (border → indigo for 1s)

---

### Case Study Product Mockups (card-width × 160px)

**buy.ca:** Property listing interface — search bar + 2 listing cards + map area with dropping pins
**MintCRM:** CRM dashboard — client list + activity timeline, new items sliding in
**Agent 360:** AI chat interface — conversation bubbles + "Agent Status: Active" pulsing

---

### Differentiator Card Graphics (~80×60px each)

**Scaling:** 1 server box → 3 boxes → 6 boxes appearing one by one (5s loop)
**CI/CD Pipeline:** 3 connected circles "B→T→D", green checkmark travels between (4s loop)
**Uptime:** "99.9%" text + SVG heartbeat line drawing underneath (3s loop)

---

## 8. INNER PAGES — CONTENT & LAYOUT

### Services Overview Page (`/services`)

- Hero: Section label + heading "Our Services" + description
- 6 service cards (same as homepage but with longer descriptions — 2-3 lines each)
- Each card links to its detail page
- CTA block at bottom

### Service Detail Page Template (`/services/:serviceId`)

```
Hero: Service title + short description + icon
─────────────────────────────────
"What's Included" section: capability list (6 items, checkmark + text)
─────────────────────────────────
"Technologies We Use" section: tech logo/name chips in a row
─────────────────────────────────
"Related Case Study" section: 1 case study card
─────────────────────────────────
CTA Block: "Ready to start? Book a call"
```

### Solution Landing Pages (5 pages, same template)

Each solution page follows this exact layout (per the client brief):

```
Hero: Solution title + subtitle
─────────────────────────────────
Problem: 2 lines max, bold, white text
─────────────────────────────────
Outcomes: 3 bullet points with checkmark icons
─────────────────────────────────
What We Deliver: max 6 bullet items, clean list
─────────────────────────────────
How We Work: 4 step cards (reuse step component from homepage)
─────────────────────────────────
Related Case Study: 1 card
─────────────────────────────────
CTA Block
```

**Solution content:**

**MVP Launch** (`/solutions/mvp-launch`):
- Problem: "You have a validated idea but need a production-ready platform — fast."
- Outcomes: Ship in 8-12 weeks | Production-grade from day one | Scale-ready architecture
- Deliverables: Discovery workshop, UX/UI design, Full-stack build, CI/CD, Launch support, Post-launch iteration

**Legacy Modernization** (`/solutions/legacy-modernization`):
- Problem: "Your current system can't keep up with your business."
- Outcomes: Reduced tech debt | Modern stack | Zero downtime migration
- Deliverables: System audit, Migration roadmap, Incremental rebuild, Data migration, QA, Team training

**AI Enablement** (`/solutions/ai-enablement`):
- Problem: "You want to use AI but need it safe, compliant, and integrated — not a toy demo."
- Outcomes: Production LLM integration | RAG pipelines | AI agents with guardrails
- Deliverables: AI readiness assessment, Model selection, RAG architecture, Guardrails, Integration, Monitoring

**Commerce Growth** (`/solutions/commerce-growth`):
- Problem: "Your online store is leaving money on the table."
- Outcomes: Higher conversion | Subscription revenue | Seamless checkout
- Deliverables: Headless architecture, Subscription engine, Payment integration, Performance optimization, Analytics, A/B testing

**Marketplace / Portal Build** (`/solutions/marketplace-portal`):
- Problem: "You need a platform where buyers and sellers connect at scale."
- Outcomes: Data-rich listings | Advanced search | Scalable architecture
- Deliverables: Marketplace architecture, Search engine, User portals, Transaction flows, Admin tools, Performance optimization

### Case Studies Hub (`/case-studies`)
- Heading + description
- 3 case study cards in a grid (same cards as homepage)
- Filterable by tags (optional stretch goal)

### Case Study Detail Pages (3 pages)

Each follows this layout:
```
Hero: Project name + 1-line description + tags
─────────────────────────────────
Product mockup screenshot (large, animated)
─────────────────────────────────
"The Challenge": 2-3 paragraphs
─────────────────────────────────
"Our Approach": 2-3 paragraphs + tech stack chips
─────────────────────────────────
"The Outcome": 3 stat/metric cards + description
─────────────────────────────────
Testimonial quote (if available)
─────────────────────────────────
CTA Block
```

**buy.ca:**
- PropTech platform with AI-powered search and investor tools
- Challenge: Canadian real estate investors needed a data-rich platform for property discovery with visual search, market analytics, and investment calculators
- Approach: Built on Next.js + Python, Elasticsearch for property search, AI-powered image recognition for property matching, interactive maps
- Outcome: Platform launched serving investors across Canada, processing 100K+ listings

**MintCRM (mintcrm.ai):**
- Vertical SaaS for accounting firm operations
- Challenge: Accounting firms managing client deadlines, workflows, and requests across disconnected tools
- Approach: Built workflow engine, deadline tracking, client portal, team assignment system. React + Node.js + PostgreSQL
- Outcome: Firms reduced missed deadlines by 80%, automated 60% of routine client communications

**Agent 360:**
- AI-powered agent platform for intelligent automation
- Challenge: Businesses needed AI agents that could handle complex, multi-step processes autonomously while maintaining human oversight
- Approach: Built multi-agent orchestration framework with LLM integration, RAG for knowledge grounding, guardrails for safety
- Outcome: Agents handling 70% of routine processes, with human escalation for edge cases

### Company Page (`/company`)
```
Hero: "We're Octeters" + mission statement
─────────────────────────────────
"What We Believe" section: 3-4 value cards
─────────────────────────────────
Team section (can be placeholder or minimal)
─────────────────────────────────
CTA Block
```

Values: "Ship fast, support forever" | "Engineering excellence, not shortcuts" | "Your success is our success"

### Resources Page (`/resources`)
- Placeholder page with heading "Resources & Insights"
- "Coming soon" state with email capture field
- CTA to book a call in the meantime

---

## 9. CONTACT PAGE — CONVERSION FORM

**Component name:** `ContactPage`
**Layout:** Two columns (60/40). Form left, reassurance right. Stack on mobile.

### Left Column — Form

**Heading:** `Let's build something together`
**Subheading:** `Tell us about your project and we'll get back within 24 hours.`

**Form fields:**
1. **Name** — text input
2. **Email** — email input
3. **Company** — text input
4. **Project Type** — dropdown select:
   - MVP / New Product
   - Legacy Modernization
   - AI Integration
   - Commerce / E-Commerce
   - Marketplace / Portal
   - Other
5. **Engagement Model** — dropdown select:
   - Fixed Scope Project
   - Dedicated Team
   - Consulting / Advisory
6. **Timeline** — dropdown select:
   - ASAP
   - 1–3 months
   - 3–6 months
   - Just exploring
7. **Tell us about your project** — textarea (4 rows)

**Two submit buttons:**
- `Book a Call` (primary button) — links to Calendly or similar (placeholder href)
- `Get an Estimate` (secondary button) — submits form

**Form styling:** Dark inputs (--bg-card background), subtle border, focus ring in indigo. Labels in --text-secondary above each field. Generous spacing between fields (24px).

### Right Column — Reassurance Sidebar

Card with --bg-card background:

**Heading:** `What to expect`

**4 reassurance items** (each with a checkmark icon in green):
- **Reply within 24 hours** — "We review every inquiry personally."
- **NDA-friendly** — "Ask and we'll send one before the call."
- **Weekly demos** — "See progress every week, not just at the end."
- **Transparent pricing** — "No surprise invoices. Clear milestones."

**Below the card:**
- "Or email us directly: hello@octeters.com"
- "Or call: +1 (555) 000-0000" (placeholder)

---

## 10. ANIMATION & INTERACTION RULES

### Scroll-Triggered Fade-In
- Every section and card should fade in on scroll using Intersection Observer
- Start state: `opacity: 0; transform: translateY(30px);`
- End state: `opacity: 1; transform: translateY(0);`
- Transition: `0.8s cubic-bezier(0.16, 1, 0.3, 1)`
- Stagger cards by 0.1s delay each
- Trigger once (don't re-animate on scroll back up)

### Looping Animations (Product Mockups)
- All mockup animations run infinitely with CSS keyframes
- Use only `transform` and `opacity` for performance (GPU-accelerated)
- Add `will-change: transform` to animated elements
- Keep animation durations between 3-8 seconds for natural feel
- Stagger different elements at different loop durations so nothing feels synchronized/robotic

### Hover States
- All cards: lift 2px + border brightens + faint glow
- All buttons: lift 1px + shadow intensifies
- All links: color shifts from --text-secondary to --accent-light
- Transitions: 0.3s ease on everything

### Scroll Parallax Effects

Multiple layers move at different scroll speeds to create depth:

**Background layers (slow):**
- Gradient orbs: `data-parallax-speed="0.3"` (scroll 70% slower than content)
- Grid patterns: `data-parallax-speed="0.1"` (barely moves)
- Floating particles: `data-parallax-speed="0.5"` (medium depth)

**Hero mockup 3D rise:**
- Start: `perspective(1000px) rotateX(5deg) translateY(40px)`
- Settles to `rotateX(0) translateY(0)` as user scrolls first 300px
- Creates a "laptop tilting toward you" effect

**Staggered card assembly (Verticals, Services):**
- Card frame appears first (0ms)
- Title fades in (200ms delay)
- Animated mockup starts (400ms delay)
- Tags/links appear (600ms delay)
- Each card in a grid staggers by 150ms after the previous card

**Scroll-driven pipeline (How We Work):**
- The pipeline animation ties to scroll position, NOT time
- Connection line draws as user scrolls through the section
- File card advances to next stage based on scroll progress
- User "controls" the speed by scrolling — like cradle.bio
- Falls back to time-based loop on mobile

**Section divider sweep:**
- Between every major section: a 1px gradient line (indigo → violet → transparent)
- Sweeps left-to-right (scaleX 0→1) when the boundary enters viewport
- `transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)`

**Scroll-linked metric counters:**
- Numbers count up based on scroll progress (not timer)
- Slow scroll = slow count. Fast scroll = snap to value.
- Use Intersection Observer with multiple thresholds: `[0, 0.25, 0.5, 0.75, 1]`

**Testimonial quote float:**
- Decorative `"` mark scrolls at 0.4x speed — drifts slowly behind text

**CTA convergence:**
- Gradient orb behind CTA scales 1x → 1.1x tied to scroll
- Button glow intensifies as section reaches viewport center

**Implementation (no heavy libraries):**
```javascript
// Simple scroll parallax — add to a useParallax hook
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('[data-parallax-speed]').forEach(el => {
    const speed = parseFloat(el.dataset.parallaxSpeed);
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
}, { passive: true });
```

**Case study card 3D tilt on hover:**
```javascript
// Mouse-position-based 3D card tilt
const x = (e.clientX - rect.left) / rect.width - 0.5;
const y = (e.clientY - rect.top) / rect.height - 0.5;
card.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
```

### Accessibility
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
All parallax effects must also be disabled when `prefers-reduced-motion` is set.

### Performance Rules
- No JavaScript animation libraries for simple animations — use CSS keyframes
- Intersection Observer for scroll triggers (vanilla JS, ~15 lines)
- No heavy images — all graphics are HTML/CSS rendered
- Lazy-load any images that are added later
- Aim for < 200KB total JS bundle

---

## 11. RESPONSIVE BREAKPOINTS

```
Mobile:    < 640px   — 1 column, stacked layout, smaller type
Tablet:    640-1024px — 2 columns where appropriate, medium type
Desktop:   > 1024px  — full layout, full type scale, side-by-side sections
```

**Key responsive rules:**
- Hero: 2 columns desktop → stacked mobile (text first, mockup below, mockup scales to ~300px wide)
- Card grids: 3 columns desktop → 2 tablet → 1 mobile
- Vertical cards: 3 columns desktop → stacked mobile
- Process steps: horizontal desktop → vertical mobile
- Contact form: 2 columns desktop → stacked mobile (form first, reassurance below)
- Navigation: full nav desktop → hamburger mobile (keep "Book a Call" visible always)
- Section padding: reduces from py-40 → py-32 → py-24
- Headings: scale down per typography table above

---

## 12. QUALITY CHECKLIST

Before considering ANY section done, verify:

- [ ] Spacing matches the design system (generous, like cradle.bio)
- [ ] Colors use CSS variables from the palette (no hardcoded one-off colors)
- [ ] Typography follows the scale (display, H1-H4, body, label — exact sizes)
- [ ] All animated mockups loop smoothly with no jank
- [ ] Cards have proper hover states (lift + border + glow)
- [ ] Buttons have hover states (lift + shadow)
- [ ] Section follows the label → heading → description → content pattern
- [ ] Scroll-triggered fade-in works on the section
- [ ] Mobile layout is clean (no overflow, no tiny text, proper stacking)
- [ ] "Book a Call" is accessible from every section (via header or inline CTA)
- [ ] Links/buttons have proper cursor and focus states
- [ ] No horizontal scrollbar on any viewport size
- [ ] Animations respect prefers-reduced-motion

---

## FINAL NOTE TO CLAUDE CODE

This website should feel like a **premium product company** — not a cheap agency template. Think cradle.bio's readability + DOSS's product visualizations + Lightdash's clean layout + ObsidianOS's minimal confidence. Every pixel should communicate: "These people build serious software."

The animated product mockups are the hero feature. They replace traditional hero images or abstract illustrations. When a visitor lands on this site, they should feel like they're looking at live software — not a static brochure. That's the DOSS effect and that's what sells.

Build section by section. Make each section excellent before moving to the next.
