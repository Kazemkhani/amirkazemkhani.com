# DESIGN DOCTRINE — amirkazemkhani.com

> The restraint contract for this site. Every future change is measured against this
> document. If a change violates a law here, the change is wrong — not the law.
> Reference class: rauno.me, paco.me, emilkowal.ski, leerob.com, rauchg.com.

## North star

**Restraint signals seniority. The person is the proof. One signature device, executed
perfectly.** This site's job is to make Amir credible; credibility flows downhill to
NOVA Labs. It is an identity anchor, never a landing page.

---

## 1. Story arc — exactly five sections

| # | Section | Job | One rule |
|---|---------|-----|----------|
| 1 | **Hero** (`#hero`) | Identity: one declarative first-person sentence + one human line + the Now prose block | No buzzword kickers ("at the intersection of…" is banned). NOVA appears as a plain inline prose link. |
| 2 | **Work** (`#work`) | Present work: one NOVA Labs card + 2–3 real projects | Every card must link somewhere real (live product, article, or repo). A card with no link gets cut. |
| 3 | **Proof** (`#proof`) | Artifacts: the Falcons episode embed (centerpiece), one photo, the competition record, two quotes | Proof through artifacts, not adjectives. Claims without a clickable/playable artifact don't ship. |
| 4 | **Writing** (`#writing`) | Depth: 4 curated pieces with hand-written hooks | Curated beats exhaustive. Link to `/articles` for the rest. |
| 5 | **Invitation** (`#contact`) | Low-key close: engagement types in prose, mailto CTA | First person, matter-of-fact. No urgency theater. |

Adding a sixth section requires deleting one first.

## 2. One-signature-device law

The **gold VerticalRail** is the site's single memorable device. It is scroll-linked
(`useScroll` + `useSpring`, stiffness 90 / damping 25), with discrete notch states per
section anchor. It carries ~80% of the site's motion identity.

Everything else competing for that slot is dead and stays dead: loading screens, custom
cursors, magnetic buttons, scroll-progress bars, per-section flourish dividers.
**Whitespace is the divider.** The hero SVG path draw-in survives as a hero-only accent
(it draws once and goes quiet) — it is an accent, not a second device.

## 3. Typeface system — two faces, self-hosted

- **Inter Variable** — everything: body, headings, UI. Self-hosted latin woff2, preloaded, `font-display: swap`.
- **JetBrains Mono Variable** — kickers, section labels, dates, figures. The mono eyebrow is the accent.
- Pull-quotes use **Georgia italic** (system serif — zero bytes). A third webfont is not
  justified by five italic quotes. If that ever changes, it is ONE face, h1/pull-quotes
  only, and something else gets deleted.
- No `fonts.googleapis.com`. Ever.

**Scale restraint:** body 16px mobile / 18px desktop, line-height 1.6, measure 60–70ch.
h1 `clamp(2.25rem, 5vw, 3.5rem)`, line-height 1.1, letter-spacing −0.02em.
Mono labels 12–13px uppercase, tracking **0.14em** (never the 0.3em template tell).
`tabular-nums` on all dates and figures. `text-wrap: balance` on headings.
Prose is left-aligned; centered long-form text is banned.

## 4. Motion budget

Total budget: **one scroll-linked element** (the rail) **+ entrance fades. Nothing else.**

- **Entrances:** `whileInView`, `viewport={{ once: true, margin: "-10%" }}`,
  opacity 0→1 + y 10→0, **200–250ms**, ease-out, stagger 40–60ms. Never re-animate on
  scroll-up. Never word-by-word outside the article template.
- **Hovers:** CSS-only, 150ms ease-out, `transform` / `opacity` /
  `text-decoration-color` exclusively. Interruptible by definition. No framer-motion for hovers.
- **Keyboard & route nav: zero animation.** Page transitions are instant. High-frequency
  interactions must not animate.
- **`useReducedMotion()` gates every framer-motion element.** Reduced-motion users get
  opacity-only or static-drawn states (rail renders fully drawn).
- Animate `transform` and `opacity` only — never height/margin/padding/filter.

## 5. Invisible-craft checklist (the senior-visitor handshake)

- [x] `::selection` — gold at ~25% alpha, foreground unchanged
- [x] `:focus-visible` — 2px gold outline, offset 2px, global; bare `outline: none` is banned
- [x] Skip-to-content link before the header
- [x] Prose links: real underlines, `text-underline-offset: 3px`, 150ms `text-decoration-color` transition
- [x] `color-scheme: dark` in CSS + `<meta name="theme-color">` — native form controls and scrollbars match
- [x] Explicit `width`/`height` on every image (zero CLS); `fetchpriority="high"` on the hero portrait; lazy below the fold
- [x] AVIF/WebP + 2 widths via `scripts/optimize-images.mjs` (sharp)
- [x] Per-route `document.title` + meta description, including per-article
- [x] No pure `#000` behind photos — blacks are lifted (`#0a0a0a` base, `#121212` surfaces)
- [x] Content must be visible without JS-triggered reveals when loaded below the fold

## 6. Kill list (deleted, with rationale — do not resurrect)

| Killed | Why |
|---|---|
| `LoadingScreen` | A 2s artificial gate on a static Vite site is the opposite of the instantness that IS the craft claim. Content mounts immediately. |
| `CustomCursor` | The browser cursor is sacred. Hiding it is an accessibility regression and an awwwards trope. |
| `MagneticButton` | Cursor-follow physics = template smell. Budget went to the rail's spring instead. |
| `ScrollProgress` | Second scroll-linked element; competed with the rail. |
| `SkillsSection` | Nobody in the reference class lists skills. A 40-tag wall is what juniors do without artifacts. Replaced by the first-person Now prose block. |
| `PitchWall` (as a section) | Duplicating the company pitch on the personal site sells the product, not the person. One photo survives inside Proof. |
| `EndorsementsSection` | Two proof sections signal insecurity. The two strongest real quotes fold into Proof. |
| `SectionFlourish` dividers | Ornament in place of rhythm. Whitespace is the divider. |
| `TVBadgeRibbon` (decay logic) | Auto-decayed banner = dead code shipping invisibly. Replaced by a permanent, quiet press hairline in the hero. |
| `Toaster` / `use-toast` | Mounted, never fired. Dead weight. |
| 6× copy-pasted `WordReveal` | Deduped to `components/WordReveal.tsx`; dropped everywhere it was gratuitous. |
| Page-transition fades | Route nav is a keyboard-frequency action. Zero animation. |

## 7. Fact rules

1. **Artifacts only.** Every stat, quote, and project on the page must already exist in
   repo content (`client/src/data/`, prior sections) and must link to something real.
   Copy may be cut and rewritten for craft — never invented.
2. **No metrics without links.** A number that can't be traced to an artifact
   (episode, article, product) doesn't ship. The record is 8 podium finishes,
   $25,800+ in prizes, 35+ hackathons — enumerated in Proof, story-linked.
3. **Amir is in DUBAI.** NOVA Labs is Dubai. "Abu Dhabi" may appear only inside the
   keywords meta (Falcons discoverability). Everything else — meta description, OG,
   Twitter, JSON-LD, footer, copy — says Dubai.
4. **Claim-safe forever:** no "Backed by…", no SOC 2 / SLA / E2EE claims, no invented
   testimonials, no "Featured on" beyond the verified Falcons of Majlis appearance.
5. **NOVA appears exactly three times on the home page:** hero prose link, one Work
   card, footer line. Never landing-page-ify.

## 8. Theme

Dark-only, done fully. Gold `#c9a84c` on near-black `#0a0a0a`. The unused light theme
was removed — one impeccable theme beats two mediocre ones. Gold text on background
must hold WCAG AA at label sizes.
