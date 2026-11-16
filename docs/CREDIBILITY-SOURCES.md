# Portfolio credibility record

Updated 16 November 2026 following Amir's explicit request to promote existing achievements, use institutional identities with relationship labels, focus HADHRA on ATRC/NSTI, and deploy the changes.

## Personal claims already published

The existing `client/public/work/index.html` records AED 2M raised at Kenchi, the AED 25,000 Samt grant, Antler programme selection, the Dubai Police HQ hackathon win, and the wider project results. These remain Amir's published first-person claims. This change promotes those facts; it does not independently certify fundraising or grant receipt.

- Kenchi: AED 2M raised, with Amir as co-founder. No Y Combinator funding or backing is implied.
- Samt: AED 25,000 grant through Expo City Dubai's Changemakers programme. The user requested the Changemakers Academy name and programme-backed wording. The [official programme announcement](https://www.expocitydubai.com/en/media-centre/problem-solving-for-the-future-expo-city-dubai-foundation-launches/) establishes programme context, not Samt's individual grant award. Other cohorts' grant amounts are not used.
- Dubai Police HQ hackathon: first place, linked to the separate existing `/articles/dubai-police-hackathon` account. This is not presented as a Bayyina award.
- Bayyina: Amir supplied the booth and presentations to officials. [World Police Summit's Forensic Science Forum](https://worldpolicesummit.com/side-events/forensic-science-forum/) confirms the event, organiser, venue and dates. No police adoption or client relationship is claimed.
- Marsad: Amir supplied the Dubai Airports hackathon and presentation to its CEO. The corporate logo identifies the hackathon setting; it is not a client or procurement claim.
- HADHRA: Amir supplied shortlisting and presentation. The [ATRC Advanced Technology Pioneers challenge](https://challengeon.atrc.ae/en/challenges/atp2026) establishes the programme and NSTI demo context. The public portfolio leads with ATRC and NSTI; the existing demo URL is retained. Festival attendees remain separate from personal endorsements.
- NOVA: founder and CTO, Antler programme selection and national television appearance are retained from the existing portfolio.

## Official identity assets

Downloaded from the organisations' own public sites, without generating or imitating logos:

| Local file | Official source | Relationship shown |
| --- | --- | --- |
| `world-police-summit.svg` | https://worldpolicesummit.com/wp-content/uploads/2026/09/WPS-logo.svg | Exhibiting at Dubai Police / World Police Summit, Forensic Science Forum |
| `dubai-airports.svg` | https://www.dubaiairports.ae/images/corporatelibraries/logos/logo-da.svg?sfvrsn=4455a5d1_6 | Built for the hackathon at Dubai Airports |
| `atrc.svg` | https://www.atrc.gov.ae/themes/custom/atrc_ae/logo.svg | Shortlisted and presented, ATRC / NSTI Festival |
| `expo-city-dubai.png` | https://www.expocitydubai.com/_nuxt/img/logo-en@2x.05ed9b9.png | Programme-backed by Expo City Dubai, Changemakers Academy |
| `antler.svg` | Inline official logo from https://www.antler.co/ | Selected for Antler x Dubai Founders HQ programme |

The summit SVG already contains the Dubai Police identity. ATRC's white source mark receives a dark CSS filter for the light page. The shared `ProjectCredential` component provides visible relationship labels, meaningful image alt text and a source link. No rights to institutional marks are granted by this repository.

## Verification

`python3 scripts/credibility-qa.py` checks six screen sizes, all 15 projects, above-fold founder metrics, all eight project credentials, official image decoding, role and evidence visibility, removal of ENEC from rendered copy, horizontal overflow and chapter footer overlap. Desktop and phone screenshots are opened separately for visual inspection.

Read-only council run `20261116-154317`: `qwen SHIP`. It checked the scoped claims against existing portfolio records and found no conflation of Bayyina with the separate hackathon win. This is a content review, not independent verification of the personal claims.

## Awards, brand navigation and motion revision

Added 16 November 2026 at Amir's request:

- IFZA Scale360: first place and an awarded internship are Amir's first-person claims, also published in his [LinkedIn account](https://www.linkedin.com/posts/amir-hossein-kazemkhani_you-basically-have-a-phd-in-hackathons-at-activity-7438795947536560128-Rw_6). [IFZA](https://ifza.com/en/) supplies the institutional description. The internship is not represented as an employment history.
- RUYA AI Hackathon: Amir supplied the US$12,800 award and five-hour build. The [official event listing](https://luma.com/li841jkv) itemises the first-place package as US$10,000 cash, US$1,000 AWS credits and US$1,800 ElevenLabs subscriptions. His message says “2st”; his published account says first. Placement is omitted pending clarification. The package is not described as all cash. Five hours describes the team's build, not the entire event schedule. The [American University in Dubai report](https://www.aud.edu/all-news/aud-hosts-leading-ai-engineers-for-ruya-ai-hackathon-focused-on-self-improving-systems/) establishes partnership with the U.S. Mission to the UAE. This is an event relationship, not government backing for the portfolio's separate RUYA enterprise product.
- Marsad: AED 30,000 hackathon prize and presentation to the Dubai Airports CEO are supplied by Amir. Converted to approximately US$8,169.
- Samt: Amir supplied official registration at Expo City Dubai and an Expo-sponsored AED 18,000 business licence. The licence is shown separately from the previously published AED 25,000 grant, as approximately US$4,901 and US$6,807 respectively. The licence sponsorship is not counted as cash funding. AED is inferred from the grant and licence context and was stated to Amir.
- CyberLife: Amir supplied the proof-of-concept contract offer from Mediclinic's Digital Innovation Director, the University of Birmingham UEP award and participation in the Mohammed Bin Rashid Innovation Fund incubator. The wording is “offered”, not signed, deployed or used by Mediclinic. FutureHack first place is retained from the existing portfolio.
- USD equivalents use AED 3.6725 per US dollar, from the [CBUAE exchange-rate reference](https://centralbank.ae/en/forex-eibor/exchange-rates/). The deterministic conversion lives in `client/src/data/recognition.ts`. Approximate equivalents are marked and the conversion is explained on the page.

### Additional identity sources

| Local credential asset | Source |
| --- | --- |
| `ifza.png` | https://ifza.com/en/wp-content/uploads/2023/03/logo.png |
| `mediclinic.svg` | https://edge.sitecorecloud.io/mediclinicma888-mediclinicb5e1-prod1ddf-fa20/media/Project/Mediclinic/MCME/navigation/logo---blue.svg |
| `mbrif.svg` | https://mbrif.ae/wp-content/uploads/2020/01/mbrif_logo-1.svg |
| `birmingham.svg` | https://www.birmingham.ac.uk/Images/logos/uob/uob-dubai-logo-light.svg |
| `us-mission.png` | Official event partner artwork from https://hackathon.ruya.ai, https://framerusercontent.com/images/UgmHixrzRHyKg8EVNR3xhw5lF8.png |
| `dubai-founders-hq.png` | https://www.visitdubai.com/-/media/det-sme-cr-release-1-new-media-files/dubai-sme/dfhq-icons/dubai-founders-logo.png |

Product identities use existing application assets: Bayyina's actual mark from its web application; Marsad's film lockup with dark lettering for light backgrounds; HADHRA's `/landing/icon.svg`; NOVA's inline site navigation mark; Samt's `/assets/brand/samt-wordmark-en.svg`; Morning Club's marketing-site sunrise favicon; RUYA's two-colour wordmark and Gold's existing hexagon identity rendered in code. These are not generated institutional marks.

### NOVA video and audience claim

The embedded source is [Falcons of Majlis official press-launch footage](https://www.youtube.com/watch?v=t8sjQKTm5m4&t=3562s), from the official Falcons Of Majlis - NKN Media channel. The excerpt starts at 59:22 and runs for 90 seconds. Browser inspection showed the host inviting Amir onto the stage and actual video playback. This is labelled as press-launch footage, not a complete broadcast episode.

YouTube metadata reported 799 views for this upload on 16 November 2026. Searches of the official channel and YouTube did not establish one million viewers for NOVA's appearance. No one-million claim is published. The India Today and Aaj Tak appearance context is retained from Amir's existing account; upload views are not a substitute for television audience measurement.

### Artwork status

Requested replacement Gold Hedge and Morning Club artwork remains pending. Image generation through the authorised SIEMENS RUYA Google Cloud project returned HTTP 403, `PERMISSION_DENIED`, with “Request rejected in accordance with our terms of use and policies.” No image was produced. Permission to use the built-in image provider instead was requested and has not yet been received. Existing imagery is retained until that choice is resolved.

## Opening correction, 16 November 2026

Amir requested the original AED figures again. This supersedes the USD-conversion decision above: Kenchi shows AED 2M, Marsad AED 30,000, Samt AED 25,000 grant and AED 18,000 licence. The RUYA award remains in its original US$12,800 currency and is still labelled a prize package, not cash. Removed the approximate-dollar helper and conversion footnote.

The opening now directly shows the IFZA logo, first place and internship award, plus the U.S. Mission event artwork and RUYA prize package. The full supporting awards section remains below. All eight selected-project links now render their actual product identity, with accessible project names, matching the logo navigation.

Read-only GCP investigation confirmed the SIEMENS RUYA project is ACTIVE and billingEnabled is true. The scoped Vertex error-log query returned no entries. This does not resolve the earlier HTTP 403 terms/policies rejection or establish its cause. No image request was routed through a different project, model or provider. Replacement images remain blocked.
