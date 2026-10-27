import type { Metadata } from "next";
import { seoPages } from "@/config/seo-pages";
import { fetchSeoEntry } from "@/data/seo";
import { siteConfig, siteConfigReady } from "@/config/site";

/**
 * Per-page meta builder.
 *
 * The builder is a strict opt-in: it emits a <title>, description, OG and
 * Twitter card, canonical and robots directive ONLY when the site has
 * been configured (NEXT_PUBLIC_SITE_NAME + NEXT_PUBLIC_BASE_URL set) AND
 * the route has a title (either stored in `seo_metadata` or declared in
 * seo-pages.ts as a fallback). Everything else returns `{}` so a
 * pre-launch deploy never leaks "Your Site" to Google or an LLM.
 */

const ROBOTS_INDEX = {
  index: true,
  follow: true,
  "max-video-preview": -1,
  "max-image-preview": "large",
  "max-snippet": -1,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
} as const;

export async function buildPageMetadata(
  slug: string,
  overrides?: Partial<Metadata>,
): Promise<Metadata> {
  const pageConfig = seoPages.find((page) => page.slug === slug);
  const storedEntry = await fetchSeoEntry(slug);

  const title = storedEntry?.meta_title || pageConfig?.defaultTitle || "";
  const description =
    storedEntry?.meta_description || pageConfig?.defaultDescription || "";
  const keywordsRaw =
    storedEntry?.keywords || pageConfig?.defaultKeywords || "";

  // No branded content yet — emit nothing. Google and LLM crawlers see a
  // bare page rather than a confident "Your Site" placeholder.
  if (!siteConfigReady() || !title) return overrides ?? {};

  const baseUrl = siteConfig.url;
  const canonicalPath = pageConfig?.path ?? "/";
  const canonicalUrl = `${baseUrl}${canonicalPath}`.replace(/\/$/, "") || baseUrl;
  const keywords = keywordsRaw
    ? keywordsRaw.split(",").map((k) => k.trim()).filter(Boolean)
    : undefined;

  return {
    title,
    description: description || undefined,
    keywords,
    robots: ROBOTS_INDEX,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description: description || undefined,
      url: canonicalUrl,
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: siteConfig.ogImage ? [siteConfig.ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || undefined,
      images: siteConfig.ogImage ? [siteConfig.ogImage] : undefined,
    },
    ...overrides,
  };
}

/**
 * Build metadata for a blog post. Uses stored SEO fields with fallbacks
 * to the post's own title/excerpt. Same opt-in gate as buildPageMetadata
 * so an unconfigured deploy stays silent.
 */
export function buildPostMetadata(
  post: {
    title: string;
    excerpt?: string;
    meta_title?: string;
    meta_description?: string;
    keywords?: string;
    slug: string;
    cover_image?: string;
    author?: string;
  },
  basePath: string,
  overrides?: Partial<Metadata>,
): Metadata {
  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt || "";

  if (!siteConfigReady() || !title) return overrides ?? {};

  const baseUrl = siteConfig.url;
  const canonicalUrl = `${baseUrl}${basePath}/${post.slug}`;
  const keywords = post.keywords
    ? post.keywords.split(",").map((k) => k.trim()).filter(Boolean)
    : undefined;
  const image = post.cover_image || siteConfig.ogImage || undefined;

  return {
    title,
    description: description || undefined,
    keywords,
    authors: post.author ? [{ name: post.author }] : undefined,
    robots: ROBOTS_INDEX,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description: description || undefined,
      url: canonicalUrl,
      type: "article",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description || undefined,
      images: image ? [image] : undefined,
    },
    ...overrides,
  };
}



