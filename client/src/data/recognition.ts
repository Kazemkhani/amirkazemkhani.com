// USD equivalents use the CBUAE's AED 3.6725 per USD reference rate.
// Original AED values and source links are retained in docs/CREDIBILITY-SOURCES.md.
export const AED_PER_USD = 3.6725;
export const usdEquivalent = (aed: number) =>
  `≈ US$${Math.round(aed / AED_PER_USD).toLocaleString("en-US")}`;

export const additionalCredentials = [
  {
    id: "dfhq",
    credential: {
      label: "Selected for",
      name: "Dubai Founders HQ",
      logo: "/credentials/dubai-founders-hq.png",
      detail: "NOVA · Antler × Dubai Founders HQ",
      href: "https://www.dubaifoundershq.com/en",
    },
  },
  {
    id: "ifza",
    credential: {
      label: "1st place · Internship awarded",
      name: "IFZA",
      logo: "/credentials/ifza.png",
      detail: "Dubai’s free-zone business community",
      href: "https://ifza.com/en/",
    },
  },
  {
    id: "us-mission",
    credential: {
      label: "Hackathon partner",
      name: "U.S. Mission to the UAE",
      logo: "/credentials/us-mission.png",
      detail: "RUYA AI Hackathon · American University in Dubai",
      href: "https://www.aud.edu/all-news/aud-hosts-leading-ai-engineers-for-ruya-ai-hackathon-focused-on-self-improving-systems/",
    },
  },
  {
    id: "mediclinic",
    credential: {
      label: "Proof-of-concept contract offered",
      name: "Mediclinic",
      logo: "/credentials/mediclinic.svg",
      detail: "CyberLife · Digital Innovation Director",
      href: "https://www.mediclinic.ae/en/corporate/home.html",
    },
  },
  {
    id: "mbrif",
    credential: {
      label: "Incubator programme",
      name: "Mohammed Bin Rashid Innovation Fund",
      logo: "/credentials/mbrif.svg",
      detail: "CyberLife · MBRIF",
      href: "https://mbrif.ae/",
    },
  },
  {
    id: "university",
    credential: {
      label: "UEP award",
      name: "University of Birmingham Dubai",
      logo: "/credentials/birmingham.svg",
      detail: "CyberLife · University recognition",
      href: "https://www.birmingham.ac.uk/dubai",
    },
  },
];
