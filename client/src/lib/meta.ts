import { useEffect } from "react";

/**
 * Per-route document.title + meta description.
 * SPA-wide meta was the audit's #5 issue — every route shared the homepage
 * snippet. Call this once per page component.
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    const prevDescription = meta?.getAttribute("content") ?? null;
    if (description && meta) meta.setAttribute("content", description);

    return () => {
      document.title = prevTitle;
      if (meta && prevDescription !== null)
        meta.setAttribute("content", prevDescription);
    };
  }, [title, description]);
}

export const SITE_TITLE =
  "Amir Hossein Kazemkhani — Voice AI Founder · NOVA Labs · Featured on Falcons of Majlis";

export const SITE_DESCRIPTION =
  "Voice AI engineer building NOVA Labs in Dubai. Featured on Falcons of Majlis (India Today × Aaj Tak). In conversation with Jensen Huang at NVIDIA.";
