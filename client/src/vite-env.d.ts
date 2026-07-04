/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Plausible domain — analytics script is injected ONLY when set. */
  readonly VITE_PLAUSIBLE_DOMAIN?: string;
  /** Cal.com (or similar) booking URL — booking button renders ONLY when set. */
  readonly VITE_CAL_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
