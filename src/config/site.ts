/**
 * Central site identity. One source of truth for name, URL, logo, locale and
 * social profiles. Everything else (sitemap, robots, llms.txt, JSON-LD,
 * OG/Twitter cards, canonical URLs) reads from here.
 *
 * Values come from env vars so the site can go from blank slate to published
 * by setting a handful of NEXT_PUBLIC_* keys in .env.local or Vercel. Any
 * value left empty is skipped at render time so nothing like "Your Site"
 * ever leaks to Google or an LLM crawler.
 */

function readList(value: string | undefined): string[] {
    if (!value) return [];
    return value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
}

export const siteConfig = {
    name: process.env.NEXT_PUBLIC_SITE_NAME || "",
    url: (process.env.NEXT_PUBLIC_BASE_URL || "").replace(/\/$/, ""),
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "",
    locale: process.env.NEXT_PUBLIC_SITE_LOCALE || "en-AU",
    logo: process.env.NEXT_PUBLIC_SITE_LOGO || "",
    ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || "",
    sameAs: readList(process.env.NEXT_PUBLIC_SITE_SAME_AS),
    organizationType: process.env.NEXT_PUBLIC_ORG_TYPE || "Organization",
} as const;

export type SiteConfig = typeof siteConfig;

/** True once the admin has set at least a name and URL. Used to gate
 *  schemas and OG tags so nothing branded leaks pre-publish. */
export function siteConfigReady(): boolean {
    return Boolean(siteConfig.name && siteConfig.url);
}
