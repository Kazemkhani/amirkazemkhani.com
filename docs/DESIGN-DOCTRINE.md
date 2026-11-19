# Portfolio design direction

Updated 16 November 2026 for Amir's explicit immersive, light-mode redesign request. This replaces the previous dark-only restraint contract.

## Experience

A bright ivory canvas with mint, cornflower, peach, lilac, rose, lime and champagne product environments. Instrument Serif provides the editorial display voice; Inter and JetBrains Mono carry UI and supporting copy. Fonts remain self-hosted.

The home page opens with a draggable spatial gallery, then nine full product chapters, six additional projects, public presentations, writing and contact. Existing articles, contact, privacy, terms and the separate `/work` collection remain available.

Lead with Amir's founder and CTO role, the Kenchi funding, Samt programme grant and separate Dubai Police HQ hackathon win. Each selected project and chapter foregrounds its actual role, institution or programme and relevant evidence. Official logos identify a clearly labelled exhibition, hackathon, shortlisting or programme relationship. They are not an unlabelled client wall. HADHRA leads with ATRC and NSTI; Samt leads with Expo City Dubai's Changemakers Academy. Sources and the relationship boundaries live in `docs/CREDIBILITY-SOURCES.md`.

## Real work

Nine product worlds: Bayyina, Marsad, HADHRA, NOVA Labs, RUYA, Samt Health, The Morning Club, Gold Hedge and CyberLife. Additional work: Keel, Kenchi, MIZAN, TANZEEM, ArenaAI and Huscribe. The authoritative content is `client/src/data/worlds.ts`.

Real product footage plays inside the first three scenes. Take control loads the actual Bayyina, Marsad, HADHRA or RUYA website into its scene. NOVA Labs and Samt Health disallow framing, so they use genuine public captures and external links. Films are original project films, loaded on request. Morning Club uses its official App Store images. Gold Hedge is private and offers a walkthrough without exposing private screens or customer data.

Three.js renders the spatial gallery with real product textures, depth, lighting and pointer response. A product image remains if WebGL is unavailable. Remotion supplies colour-matched motion graphics. The original Blender gold still life is decorative; `scripts/build-gold.py` regenerates `scripts/artwork/gold.blend` and its rendered image. It does not depict product data.

## Interaction

Native page scrolling. Clicking a product preview or its entry button breaks its actual image into fragments and travels through an animated tunnel to the real destination. Transitions last 1.4 seconds and can be cancelled with Escape or Stay here. The native cursor stays visible, with local pointer feedback only. Keyboard activation, modifier clicks and reduced-motion users retain direct link behaviour. Browser Back clears the transition.

All continuous animation respects the global motion button and OS reduced-motion preference. Three.js stops rendering offscreen or in background tabs. Remotion players pause offscreen. Demo iframes unload when closed or offscreen; close returns focus to the control. The demo toolbar receives focus on opening and offers close and external links. A second keyboard exit follows the iframe. Escape works when focus is in the portfolio; cross-origin documents own their keyboard events. Film dialogs trap focus and restore it on close. No automatic audio.

## Evidence and language

Use British English. Treat exhibitions, presentations, shortlisting and production adoption as distinct facts. Names in the NSTI context describe event attendance, not individual endorsement. Bayyina remains a synthetic-data research prototype, HADHRA an untested-at-sea concept, and Marsad a synthetic-data hackathon prototype. The Bayyina seal proves an output is unchanged, not that it was right.

Source and QA records are in `docs/PORTFOLIO-RELEASE.md`. Before deployment run the production build, inspect the dependency audit, and run `python3 scripts/portfolio-qa.py` against the preview. Open screenshots at 1280x720 and 390x844; also check narrow phones, tablet orientations, reduced motion, real film playback, actual embedded product loading, navigation and retained routes.
