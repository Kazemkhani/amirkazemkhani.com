/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HUBSPOT_PORTAL_ID?: string;
  readonly VITE_HUBSPOT_DISCOVERY_FORM_ID?: string;
  readonly VITE_HUBSPOT_NEWSLETTER_FORM_ID?: string;
  readonly VITE_CAL_URL?: string;
  readonly VITE_LINKEDIN_PARTNER_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
