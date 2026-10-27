/**
 * JSON-LD builders for Schema.org types we emit site-wide.
 *
 * None of these builders inject anything on their own — they return plain
 * objects which `<StructuredData />` serialises. That keeps the data
 * tree-shakeable per route (a blog post page emits Article; a FAQ page
 * emits FAQPage; nothing else is paid for).
 *
 * Every optional field is omitted when empty so the DOM never carries
 * `"image": ""` or `"description": null`, which both Google and LLM
 * crawlers treat as noise or (worse) low quality.
 */

import { siteConfig } from "@/config/site";

type JsonLd = Record<string, unknown>;

function compact<T extends JsonLd>(obj: T): T {
    const out: JsonLd = {};
    for (const [k, v] of Object.entries(obj)) {
        if (v === undefined || v === null || v === "") continue;
        if (Array.isArray(v) && v.length === 0) continue;
        out[k] = v;
    }
    return out as T;
}

/** schema.org/Organization — identifies the publisher behind the site. */
export function organizationSchema(): JsonLd | null {
    if (!siteConfig.name || !siteConfig.url) return null;
    return compact({
        "@context": "https://schema.org",
        "@type": siteConfig.organizationType,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: siteConfig.logo || undefined,
        sameAs: siteConfig.sameAs.length ? siteConfig.sameAs : undefined,
    });
}

/** schema.org/WebSite — identifies the site itself and advertises a search
 *  endpoint if one exists at /search?q=... */
export function websiteSchema(): JsonLd | null {
    if (!siteConfig.name || !siteConfig.url) return null;
    return compact({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description || undefined,
        inLanguage: siteConfig.locale,
    });
}

/** schema.org/Article — one per blog post. Pass dates as ISO strings. */
export function articleSchema(input: {
    title: string;
    description?: string;
    url: string;
    image?: string;
    author?: string;
    datePublished?: string;
    dateModified?: string;
}): JsonLd {
    const publisher = organizationSchema();
    return compact({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: input.title,
        description: input.description,
        url: input.url,
        image: input.image || undefined,
        author: input.author
            ? { "@type": "Person", name: input.author }
            : undefined,
        publisher: publisher
            ? {
                  "@type": publisher["@type"],
                  name: publisher.name,
                  logo: publisher.logo
                      ? { "@type": "ImageObject", url: publisher.logo }
                      : undefined,
              }
            : undefined,
        datePublished: input.datePublished,
        dateModified: input.dateModified || input.datePublished,
        mainEntityOfPage: input.url,
    });
}

/** schema.org/FAQPage — emit for routes rendering FAQ accordions. */
export function faqSchema(items: Array<{ question: string; answer: string }>): JsonLd | null {
    if (!items.length) return null;
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
    };
}

/** schema.org/BreadcrumbList — emit for every nested route. */
export function breadcrumbSchema(items: Array<{ name: string; url: string }>): JsonLd | null {
    if (!items.length) return null;
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: item.url,
        })),
    };
}
