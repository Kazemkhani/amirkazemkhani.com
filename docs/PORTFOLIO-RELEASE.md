# Immersive portfolio release, 16 November 2026

## Scope

Rebuild the homepage as a bright spatial gallery and eight immersive product chapters, with all seven additional projects restored directly on the homepage. The portfolio includes Bayyina, Marsad, HADHRA, NOVA Labs, RUYA, Samt Health, The Morning Club, Gold Hedge, Keel, Kenchi, CyberLife, MIZAN, TANZEEM, ArenaAI and Huscribe. Preserve articles, contact, policy pages and the separate `/work` and `/keel` collections. Deployment to the existing Vercel project was explicitly authorised by Amir.

## Claims and sources

- Amir supplied his booth/presentation history, ENEC-track shortlisting and presentation to the Dubai Airports CEO. These are first-person portfolio claims, not independently verified institutional endorsements.
- [World Police Summit Forensic Science Forum](https://worldpolicesummit.com/side-events/forensic-science-forum/) confirms 16–18 November 2026, alongside the summit at DWTC. The release date is the 16th, so copy says exhibiting and does not claim the three-day event has concluded.
- [ATRC challenge](https://challengeon.atrc.ae/en/challenges/atp2026) describes the ENEC marine challenge and NSTI demonstration context.
- [Ministry opening report](https://moe.gov.ae/en/mediacenter/news/Pages/Under-the-patronage-of-HH-Sheikh-Hazza-bin-Zayed-Al-Nahyan-the-8th-NSTI-Festival-launches-with-the-participation-of-615-stu.aspx) identifies Sarah bint Yousef Al Amiri, Dr Sultan Al Neyadi and Eng Mohammed Al Qasim as attendees.
- [WAM closing report](https://www.wam.ae/en/article/c38h498-8th-national-science-technology-and-innovation) confirms 10–13 November at ADNEC Centre Al Ain and Dr Mohamed Alkhemairi's participation. WAM uses two English transliterations for the same official. The portfolio uses Mohamed Alkhemairi.
- Amir explicitly asked to name all four as attendees, without claiming a personal presentation to each.

## Assets

- Bayyina: original `Bayyina-60-EN.mp4` from `~/dev/bayyina-film/film/out/`, remuxed for progressive web playback without changing the encoded audio or video. It plays for 66.3 seconds including the end card.
- Marsad: original `Marsad-Final-2min.mp4` from `~/dev/marsad-film/remotion/out/`, 119.9 seconds. Remuxed for progressive web playback without re-encoding.
- HADHRA: existing public `/film/HADHRA-comic-film-105s-v3.mp4` on enec.amirkazemkhani.com, 105 seconds. Hosted by its authoritative project.
- Product captures are of the public demos. HADHRA embeds its `/sims` interactive illustration. Marsad uses `/replay/` because its live organiser feed is unavailable. No new technical results are invented.
- NOVA Labs, RUYA and Samt Health imagery comes from their actual public sites. NOVA and Samt block iframe embedding; use normal external navigation.
- Samt Health: original `~/samt-film/out/review/samt_en_v3_phone.mp4`, re-encoded as a 1280px web film.
- Morning Club: three official screenshots from [its App Store listing](https://apps.apple.com/ae/app/the-morning-club/id6761857556), published under Amir Hossein Kazemkhani.
- Gold Hedge: original Blender still life, with editable source and generator. Decorative, not a private product screen or a price chart.
- Existing descriptions for the wider portfolio come from the existing `/work` collection. No new performance or financial metrics have been added.

## Verification

Run `npm run build`, `npm audit`, and `python3 scripts/portfolio-qa.py [base-url]`. Test records and opened screenshots are stored outside the source tree under `/tmp/portfolio-v2-final-qa` during this session. Final deployment status and output are recorded below once verified.

## Release checks

Final command output is saved in `docs/qa/portfolio-checks.txt`. The browser gate checks all 15 projects, six viewport/motion combinations, real film playback, real embedded products, the cancellable portal and destination navigation, paused rendering, WebGL fallback and retained routes. Desktop and phone screenshots are opened for visual inspection.

The repository's GitHub Actions account is blocked by a billing issue. The previous run reported: “The job was not started because your account is locked due to a billing issue.” No billing settings were changed. Local build/browser gates and Vercel's separate production build provide the release evidence.

## Verified release checks

- Production TypeScript/Vite build passes. The separate Three.js chunk retains Vite's size advisory.
- Dependency audit: `found 0 vulnerabilities`.
- Full browser gate: `ALL PORTFOLIO CHECKS PASS`. All 15 projects at 1280x720, 390x844, 768x1024, 1024x768, 320x568 and 390x844 with reduced motion. No overlapping chapter footers, horizontal overflow, missing local assets or page errors.
- All four original films played at desktop and phone sizes: Bayyina 66.3s, Marsad 119.9s, HADHRA 105.0s and Samt Health 68.5s. Closing restores focus.
- All four real embedded products loaded and closed at both sizes. HADHRA uses its `/sims` marine illustration. The dedicated demo toolbar was also checked independently for placement and initial/return focus.
- Actual portal destination navigation, browser Back reset, cancellation, global pause/resume, WebGL fallback, larger text, retained routes and archive document links pass.
- Read-only council run `20261116-144134`: `qwen SHIP`. Its earlier pause and keyboard-exit findings were addressed. Cross-origin Escape is not promised; the portfolio provides a visible exit toolbar and external full-screen link.
- The temporary external connection outage recovered before the final browser gate. Publication uses the existing GitHub-to-Vercel production integration; production status and asset parity are checked after pushing the release.

The production phone check identified slow startup with the two original MP4 files whose metadata was at the end. Their metadata is now at the front (`faststart`). Encoded video and audio stream SHA-256 hashes match before and after remuxing.
