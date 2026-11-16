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
