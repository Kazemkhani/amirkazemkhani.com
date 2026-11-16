# Portfolio design direction

Updated 16 November 2026 for Amir's explicit immersive, light-mode redesign request. This replaces the previous dark-only restraint contract.

## Experience

A warm porcelain canvas with mineral teal, cornflower blue and clay coral. Instrument Serif provides the editorial display voice; Inter and JetBrains Mono carry UI and supporting copy. Fonts remain self-hosted.

The home page progresses through identity, three interactive product worlds, public presentations, writing and contact. Existing articles, contact, privacy, terms and the separate `/work` collection remain available.

## Real work

Bayyina, Marsad and HADHRA use real captured product interfaces. Preview buttons open the actual demo in a focus-trapped dialog. Films are original project films and load only on request. No synthetic product statistics are authored by this portfolio.

The Blender sculpture is decorative, not a technical model. Its editable source is in `scripts/artwork/portals.blend`; `scripts/build-portal.py` regenerates it. The GLB uses Three.js for pointer parallax and lighting. A rendered WebP remains visible when WebGL is unavailable. Remotion provides the project-specific motion rings.

## Interaction

Native page scrolling. Portal transitions are short and lead to the real project destination. The native cursor stays visible, with local pointer feedback only. Keyboard activation, modifier clicks and reduced-motion users retain direct link behaviour. Browser Back clears the transition.

All continuous animation respects the global motion button and OS reduced-motion preference. Three.js stops rendering offscreen or in background tabs. Remotion players pause offscreen. Each iframe/video is removed on close; close restores focus to its trigger. No automatic audio.

## Evidence and language

Use British English. Treat exhibitions, presentations, shortlisting and production adoption as distinct facts. Names in the NSTI context describe event attendance, not individual endorsement. Bayyina remains a synthetic-data research prototype, HADHRA an untested-at-sea concept, and Marsad a synthetic-data hackathon prototype. The Bayyina seal proves an output is unchanged, not that it was right.

Source and QA records are in `docs/PORTFOLIO-RELEASE.md`. Before deployment run the production build, inspect the dependency audit, and run `python3 scripts/portfolio-qa.py` against the preview. Open screenshots at 1280x720 and 390x844; also check narrow phones, tablet orientations, reduced motion, real film playback, actual embedded product loading, navigation and retained routes.
