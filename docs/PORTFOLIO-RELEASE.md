# Immersive portfolio release, 16 November 2026

## Scope

Replace the dark homepage with a light interactive portfolio for Bayyina, Marsad and HADHRA. Preserve existing routes and the newer `/work` collection from upstream `9b2eb22`. Deploy to the existing Vercel project for amirkazemkhani.com, explicitly authorised by Amir in this session.

## Claims and sources

- Amir supplied his booth/presentation history, ENEC-track shortlisting and presentation to the Dubai Airports CEO. These are first-person portfolio claims, not independently verified institutional endorsements.
- [World Police Summit Forensic Science Forum](https://worldpolicesummit.com/side-events/forensic-science-forum/) confirms 16–18 November 2026, alongside the summit at DWTC. The release date is the 16th, so copy says exhibiting and does not claim the three-day event has concluded.
- [ATRC challenge](https://challengeon.atrc.ae/en/challenges/atp2026) describes the ENEC marine challenge and NSTI demonstration context.
- [Ministry opening report](https://moe.gov.ae/en/mediacenter/news/Pages/Under-the-patronage-of-HH-Sheikh-Hazza-bin-Zayed-Al-Nahyan-the-8th-NSTI-Festival-launches-with-the-participation-of-615-stu.aspx) identifies Sarah bint Yousef Al Amiri, Dr Sultan Al Neyadi and Eng Mohammed Al Qasim as attendees.
- [WAM closing report](https://www.wam.ae/en/article/c38h498-8th-national-science-technology-and-innovation) confirms 10–13 November at ADNEC Centre Al Ain and Dr Mohamed Alkhemairi's participation. WAM uses two English transliterations for the same official. The portfolio uses Mohamed Alkhemairi.
- Amir explicitly asked to name all four as attendees, without claiming a personal presentation to each.

## Assets

- Bayyina: original `Bayyina-60-EN.mp4` from `~/dev/bayyina-film/film/out/`, copied to the portfolio. It plays for 66.3 seconds including the end card.
- Marsad: original `Marsad-Final-2min.mp4` from `~/dev/marsad-film/remotion/out/`, 119.9 seconds.
- HADHRA: existing public `/film/HADHRA-comic-film-105s-v3.mp4` on enec.amirkazemkhani.com, 105 seconds. Hosted by its authoritative project.
- Product captures are of the public demos. Marsad uses `/replay/` because its live organiser feed is unavailable. No new technical results are invented.
- Blender sculpture is original decorative artwork, exported as GLB; WebP fallback. No generated likenesses or institutional marks.

## Verification

Run `npm run build`, `npm audit`, and `python3 scripts/portfolio-qa.py [base-url]`. Test records and opened screenshots are stored outside the source tree under `/tmp/portfolio-qa` during this session. Final deployment status and output are recorded below once verified.

## Verified before publication

- Production TypeScript/Vite build passes. Three.js remains in its own dynamically imported chunk; Vite reports its size warning, not a build failure.
- `npm audit`: `found 0 vulnerabilities`. Updated compatible packages and scoped the typography plugin's pinned selector parser to a patched version.
- `python3 scripts/portfolio-qa.py`: `ALL PORTFOLIO CHECKS PASS`. 1280x720, 390x844, 768x1024, 1024x768, 320x568 and 390x844 reduced motion. Every project film played and each actual embedded product loaded at desktop and phone sizes. Portal navigation and Back reset pass. No page errors or horizontal overflow.
- Additional checks: `ALL ADDITIONAL CHECKS PASS`. Pausing holds the rendered canvas frame; resuming changes it. Escape closes the demo and restores focus. Cancelling the portal prevents navigation. Larger text fits the phone. Disabling WebGL retains the rendered sculpture.
- Existing writing, article, contact, privacy, terms and `/work/` routes checked at desktop and phone sizes. Article light-theme contrast corrected.
- Read-only council review: `qwen SHIP`, run `20261116-133726`. Its portal escape and pause-reload suggestions were addressed. Its external-asset uncertainty was resolved through actual browser playback/loading.
- Opened screenshots: `docs/qa/portfolio-desktop.png` and `docs/qa/portfolio-phone.png`. Full command output is stored beside them.
