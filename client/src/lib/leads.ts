/**
 * Lead capture — direct submission to HubSpot Forms API.
 *
 * Why HubSpot Forms API and not a backend endpoint:
 *   - amirkazemkhani.com is a static Vite + Vercel deploy. No server.
 *   - HubSpot's public Forms API accepts CORS-enabled POSTs from any origin.
 *   - First-touch UTM attribution is pulled from localStorage on submit, so we
 *     can answer "which post drove this demo?" inside HubSpot directly.
 *
 * Env vars (paste into Vercel project settings):
 *   VITE_HUBSPOT_PORTAL_ID            — numeric, from Settings → Account Setup
 *   VITE_HUBSPOT_DISCOVERY_FORM_ID    — UUID of "Discovery Call Lead" form
 *   VITE_HUBSPOT_NEWSLETTER_FORM_ID   — UUID of "NOVA Signal Newsletter" form
 *
 * Until env vars are set, submit functions throw a clear error so we don't
 * silently lose leads.
 */

import { readFirstTouch } from "./utm";

const PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID as string | undefined;
const DISCOVERY_FORM_ID = import.meta.env.VITE_HUBSPOT_DISCOVERY_FORM_ID as
  | string
  | undefined;
const NEWSLETTER_FORM_ID = import.meta.env.VITE_HUBSPOT_NEWSLETTER_FORM_ID as
  | string
  | undefined;

const HUBSPOT_API = "https://api.hsforms.com/submissions/v3/integration/submit";

type HubSpotField = { name: string; value: string };

async function submitToHubSpot(formId: string, fields: HubSpotField[]) {
  if (!PORTAL_ID) {
    throw new Error(
      "VITE_HUBSPOT_PORTAL_ID not set — lead capture disabled. See CONVERSION_INFRA_STACK.md.",
    );
  }
  const firstTouch = readFirstTouch();
  const allFields: HubSpotField[] = [...fields];
  if (firstTouch) {
    if (firstTouch.utm_source)
      allFields.push({
        name: "hs_analytics_source",
        value: firstTouch.utm_source,
      });
    if (firstTouch.utm_campaign)
      allFields.push({ name: "utm_campaign", value: firstTouch.utm_campaign });
    if (firstTouch.utm_medium)
      allFields.push({ name: "utm_medium", value: firstTouch.utm_medium });
    if (firstTouch.utm_content)
      allFields.push({ name: "utm_content", value: firstTouch.utm_content });
  }
  const res = await fetch(`${HUBSPOT_API}/${PORTAL_ID}/${formId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: allFields,
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `HubSpot submit failed (${res.status}): ${body.slice(0, 200)}`,
    );
  }
  return res.json();
}

export async function submitDiscoveryLead(input: {
  name: string;
  email: string;
  company?: string;
  role?: string;
  problem?: string;
}) {
  if (!DISCOVERY_FORM_ID) {
    throw new Error("VITE_HUBSPOT_DISCOVERY_FORM_ID not set.");
  }
  return submitToHubSpot(DISCOVERY_FORM_ID, [
    { name: "firstname", value: input.name },
    { name: "email", value: input.email },
    ...(input.company ? [{ name: "company", value: input.company }] : []),
    ...(input.role ? [{ name: "jobtitle", value: input.role }] : []),
    ...(input.problem ? [{ name: "message", value: input.problem }] : []),
  ]);
}

export async function submitNewsletterLead(input: {
  name?: string;
  email: string;
}) {
  if (!NEWSLETTER_FORM_ID) {
    throw new Error("VITE_HUBSPOT_NEWSLETTER_FORM_ID not set.");
  }
  return submitToHubSpot(NEWSLETTER_FORM_ID, [
    ...(input.name ? [{ name: "firstname", value: input.name }] : []),
    { name: "email", value: input.email },
  ]);
}
