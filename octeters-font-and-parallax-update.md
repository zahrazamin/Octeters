# Octeters — Font Update (Rethink Sans) + Scroll Parallax Effects

---

## FONT: Rethink Sans

### Why Rethink Sans works for Octeters
Rethink Sans is what cradle.bio uses. It's a clean, geometric sans-serif — similar to Inter but with slightly more character. It has rounder letter shapes that make headings feel warmer and more approachable, while still looking technical and credible. Perfect for a B2B SaaS site targeting decision-makers.

### Available weights (use all of these):
- **400 Regular** — Body text, descriptions, form labels
- **500 Medium** — Tags, chips, nav links, small labels
- **600 SemiBold** — Section headings (H2, H3, H4), button text
- **700 Bold** — Display headings (hero), page titles (H1), stat numbers
- **Italic variants** — Available for all weights (use sparingly for testimonial quotes)

### How to load it:
```html
<!-- In index.html <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,700&display=swap" rel="stylesheet">
```

### CSS setup:
```css
font-family: 'Rethink Sans', system-ui, -apple-system, sans-serif;
```

### Updated typography pairings:
| Use | Size | Weight | Style |
|-----|------|--------|-------|
| Hero headline | 56-64px | 700 Bold | Normal — slightly tighter letter-spacing (-0.02em) |
| Page title (H1) | 48px | 700 Bold | Normal |
| Section heading (H2) | 40px | 600 SemiBold | Normal |
| Card title (H3) | 24px | 600 SemiBold | Normal |
| Small heading (H4) | 20px | 600 SemiBold | Normal |
| Section label | 12px | 600 SemiBold | Uppercase, tracking 0.2em |
| Body large | 18px | 400 Regular | line-height 1.7 |
| Body | 16px | 400 Regular | line-height 1.7 |
| Body small | 14px | 400 Regular | line-height 1.6 |
| Nav links | 15px | 500 Medium | Normal |
| Button text | 14px | 600 SemiBold | Normal |
| Testimonial quote | 24px | 400 Regular | Italic |
| Stat numbers | 48px | 700 Bold | letter-spacing -0.03em (tight) |

**Key difference from Inter:** Rethink Sans looks slightly more friendly and modern at large sizes. The `a`, `e`, and `g` are more open. Use tighter letter-spacing (-0.02em) on display headings to make them feel premium and dense — like cradle.bio does.

---

## SCROLL PARALLAX EFFECTS

### What is scroll parallax?
Elements move at different speeds as you scroll — some elements scroll faster, some slower, some stay pinned while content scrolls past. It creates a sense of depth and makes the site feel layered and premium.

### How to implement (no heavy libraries):
```javascript
// Simple scroll-speed parallax — different elements move at different rates
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  
  // Elements with data-parallax-speed attribute
  document.querySelectorAll('[data-parallax-speed]').forEach(el => {
    const speed = parseFloat(el.dataset.parallaxSpeed);
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
});
```

Or with CSS-only approach (simpler, GPU-accelerated):
```css
.parallax-container {
  perspective: 1px;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
}
.parallax-slow {
  transform: translateZ(-1px) scale(2); /* moves slower */
}
.parallax-fast {
  transform: translateZ(0); /* moves at normal speed */
}
```

**Recommended:** Use Intersection Observer + a small scroll listener. No heavy libraries like GSAP or Locomotive needed for the effects below.

---

### Parallax Effect 1: "Floating Background Elements" (Hero + Dark Sections)

**Where:** Hero section, CTA blocks, dark transition sections

**What happens:** As you scroll down, gradient orbs and grid patterns move at a slower speed than the content — they lag behind, creating depth.

**Implementation:**
```
Content (foreground):    speed = 1x (normal scroll)
Gradient orbs:           speed = 0.3x (scroll 70% slower — feels like they're far away)
Grid pattern:            speed = 0.1x (barely moves — feels like deep background)
Floating particles:      speed = 0.5x (medium depth)
```

**Visual result:** As you scroll, the dark background feels layered — orbs drift slowly behind the text, particles float in the mid-ground, and content scrolls at full speed on top. Like looking through a window with different layers of depth.

---

### Parallax Effect 2: "Product Mockup Rise" (Hero)

**Where:** Hero section dashboard mockup

**What happens:** The dashboard mockup starts slightly below its final position and rises up as you scroll. It also slightly rotates in 3D (like it's tilting toward you).

**Implementation:**
```css
/* Initial state (before scroll) */
.hero-mockup {
  transform: perspective(1000px) rotateX(5deg) translateY(40px);
  transition: transform 0.1s linear;
}

/* As user scrolls (0-300px scroll range) */
/* JS updates transform based on scroll position */
/* rotateX goes from 5deg → 0deg */
/* translateY goes from 40px → 0px */
```

**Visual result:** The mockup appears to lean back slightly when you first see it, then settles flat as you scroll — like a laptop screen tilting toward you. Subtle but impressive.

---

### Parallax Effect 3: "Staggered Card Reveal" (Verticals, Services)

**Where:** "What We Build" cards, Services cards

**What happens:** As each card scrolls into view, it fades in and slides up — BUT each card is staggered, and the animated mockup inside each card starts slightly later than the card frame.

**Implementation:**
```
Scroll position triggers card entry:
  t=0ms:   Card border/background appears (fade in + slide up 30px)
  t=200ms: Card title and description appear
  t=400ms: Animated mockup inside the card starts playing
  t=600ms: Tags and links appear
```

This creates a "building" effect — the card assembles itself as you scroll to it.

**Parallax layer:** The cards themselves scroll at 1x, but the mockup graphics inside can have a subtle 0.95x speed — so they move slightly slower than the card frame, creating a subtle parallax within the card.

---

### Parallax Effect 4: "Process Timeline Scroll" (How We Work)

**Where:** "How We Work" pipeline section

**What happens:** The pipeline connection line draws itself as you scroll through the section. The file card advances to the next stage tied to scroll position (not time-based).

**Implementation:**
```
Scroll range (let's say the section is 600px tall):
  0-150px:   Connection line draws from Step 1 → Step 2, file card at Step 1
  150-300px: Line extends to Step 3, file moves to Step 2, Step 1 card glows
  300-450px: Line extends to Step 4, file moves to Step 3
  450-600px: Full line visible, file at Step 4 with "Delivered" badge

User controls the animation speed by scrolling.
```

**Why this is powerful:** Instead of a time-based loop, the pipeline animation is tied to scroll. The user "controls" the flow by scrolling. This is exactly what cradle.bio does with their protein engineering flow — the visuals progress as you scroll.

**Bonus:** On mobile, this can fall back to the time-based loop since scroll-linked on mobile feels different.

---

### Parallax Effect 5: "Section Divider Sweep" (Between Sections)

**Where:** Between every major section

**What happens:** A thin gradient line (indigo → violet → transparent) sweeps horizontally across the page as the section boundary crosses the viewport center.

**Implementation:**
```css
.section-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #6366F1, #8B5CF6, transparent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.section-divider.visible {
  transform: scaleX(1);
}
```

**Visual result:** As you scroll between sections, a beautiful thin light sweeps across — like a laser scanner. Gives a sense of transition and progress.

---

### Parallax Effect 6: "Sticky Text + Scrolling Visuals" (Feature Showcase)

**Where:** Could be used for the "What We Build" section or a detailed service showcase

**What happens:** The left column (heading + description) stays pinned/sticky while the right column scrolls through multiple product mockups or feature cards.

**Implementation:**
```css
.sticky-text {
  position: sticky;
  top: 120px; /* below sticky header */
  align-self: start;
}
.scrolling-visuals {
  /* Normal scroll flow — cards scroll past the sticky text */
}
```

**Visual result:** Like cradle.bio's "Compounding results" section — the heading stays in place while product screenshots and feature cards scroll past on the right. Feels premium and editorial.

---

### Parallax Effect 7: "Depth Cards on Hover + Scroll" (Case Studies)

**Where:** Case study cards

**What happens:** Two layers of parallax:
1. **Scroll:** Cards slightly translate on Y-axis at 0.95x speed
2. **Mouse hover:** Card content shifts based on mouse position (3D tilt effect)

**Implementation:**
```javascript
// On mousemove over card:
const rect = card.getBoundingClientRect();
const x = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 to 0.5
const y = (e.clientY - rect.top) / rect.height - 0.5;

card.style.transform = `
  perspective(1000px) 
  rotateY(${x * 5}deg)    /* max 5 degree tilt */
  rotateX(${-y * 5}deg)
  translateZ(10px)
`;
```

**Visual result:** Cards feel like physical objects — they tilt subtly toward your cursor and have depth. Combined with the scroll parallax, they float in 3D space.

---

### Parallax Effect 8: "Counter Reveal" (Metrics Strip)

**Where:** Proof/metrics section

**What happens:** As the metrics section scrolls into the viewport center:
1. Background line sweeps across (like Effect 5)
2. Numbers count up from 0 to final value (tied to scroll progress, not time)
3. Sparkline draws synchronized with the counter
4. Pulse ring fires once when counter reaches final value

**Implementation:** Intersection Observer with `threshold: [0, 0.25, 0.5, 0.75, 1]` — counter value = threshold × final value.

**Visual result:** If you scroll slowly, the numbers count up slowly. Scroll fast, they snap. Feels responsive and interactive.

---

### Parallax Effect 9: "Testimonial Quote Float" (Testimonial)

**Where:** Testimonial section

**What happens:** The large decorative `"` quotation mark in the background scrolls at 0.4x speed — so it drifts very slowly upward as you scroll past the section. The quote text scrolls normally. Creates a subtle depth separation between decoration and content.

---

### Parallax Effect 10: "CTA Convergence" (Final CTA)

**Where:** Final CTA section

**What happens:** As the CTA section enters the viewport:
1. The gradient orb behind the heading slowly scales up (1x → 1.1x) tied to scroll
2. The text fades in and slides up
3. The button glow intensifies as the section reaches viewport center
4. Subtle particles in the background drift inward (toward center) based on scroll position

**Visual result:** Everything converges toward the CTA button as you scroll — drawing your eye to the action. Like a gravitational pull.

---

## SUMMARY: Which Parallax Effects to Prioritize

| Priority | Effect | Where | Difficulty |
|----------|--------|-------|------------|
| **Must have** | Floating background elements (orbs at 0.3x) | Hero, CTAs | Easy |
| **Must have** | Staggered card reveal | All card sections | Easy |
| **Must have** | Section divider sweep | Between sections | Easy |
| **Must have** | Counter reveal on scroll | Metrics strip | Medium |
| **Should have** | Product mockup 3D rise | Hero | Medium |
| **Should have** | Scroll-driven pipeline | How We Work | Medium |
| **Should have** | Sticky text + scrolling visuals | Verticals or Features | Easy |
| **Nice to have** | Depth cards on hover | Case studies | Medium |
| **Nice to have** | Quote float | Testimonial | Easy |
| **Nice to have** | CTA convergence | Final CTA | Medium |

---

## HOW TO TELL CLAUDE CODE

When you're ready to add parallax, use this prompt:

```
Add scroll parallax effects to the site. Here's what I want:

1. BACKGROUND PARALLAX: The gradient orbs in the hero and CTA sections 
   should scroll at 0.3x speed (70% slower than content). Grid patterns 
   at 0.1x. Use a simple scroll event listener with 
   data-parallax-speed attributes.

2. HERO MOCKUP 3D RISE: The dashboard mockup should start with 
   perspective(1000px) rotateX(5deg) translateY(40px) and settle to 
   rotateX(0) translateY(0) as the user scrolls the first 300px.

3. STAGGERED CARD REVEAL: When cards scroll into view, stagger the 
   animation — card frame first (0ms), then title (200ms), then 
   mockup starts (400ms), then tags (600ms).

4. SCROLL-DRIVEN PIPELINE: In "How We Work", tie the pipeline 
   animation to scroll position instead of time. The connection line 
   draws and the file card advances as the user scrolls through 
   the section.

5. SECTION DIVIDERS: Between every major section, add a 1px gradient 
   line (indigo→violet→transparent) that sweeps left-to-right when 
   it enters the viewport.

6. METRIC COUNTERS: The numbers should count up tied to scroll 
   position, not on a timer.

No heavy libraries — use Intersection Observer + a small scroll 
listener. All transforms use GPU-accelerated properties only 
(transform, opacity). Add will-change: transform to parallax elements.
Respect prefers-reduced-motion.
```

---

## UPDATED DESIGN_BRIEF.MD CHANGES

Two things to update in the DESIGN_BRIEF.md:

### 1. Replace all references to "Inter" font with:
```
Font family: 'Rethink Sans', system-ui, -apple-system, sans-serif
Google Fonts import: Rethink+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,700
```

### 2. Add to Section 10 (Animation & Interaction Rules):
```
### Scroll Parallax
- Background gradient orbs: scroll speed 0.3x (data-parallax-speed="0.3")
- Grid patterns: scroll speed 0.1x
- Hero dashboard mockup: 3D perspective tilt that settles on scroll
- Pipeline animation: tied to scroll position, not time
- Metric counters: count up based on scroll progress
- Section dividers: gradient line sweeps on intersection
- All parallax uses transform only (GPU-accelerated)
- Disabled when prefers-reduced-motion is set
```
