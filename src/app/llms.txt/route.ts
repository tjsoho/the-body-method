import { supabase } from "@/utils/supabase";
import { siteConfig } from "@/config/site";

/**
 * /llms.txt — the discovery file proposed by https://llmstxt.org for giving
 * LLM crawlers (ChatGPT, Claude, Perplexity, Gemini) a structured, Markdown
 * summary of the site. Generated dynamically from the admin content so it
 * stays in sync without a redeploy.
 *
 * Format: title line, optional blockquote description, then sections of
 * links. The spec treats everything after `## Optional` as lower priority
 * so LLMs can skip it when context is tight.
 */

export const revalidate = 3600;

type ListRow = { slug: string | null; title?: string | null; description?: string | null; excerpt?: string | null };

function line(label: string, href: string, description?: string | null): string {
    const base = `- [${label}](${href})`;
    return description ? `${base}: ${description}` : base;
}

export async function GET() {
    const baseUrl = siteConfig.url || "https://example.com";
    const parts: string[] = [];

    const title = siteConfig.name || "Site";
    parts.push(`# ${title}`);

    if (siteConfig.description) {
        parts.push("");
        parts.push(`> ${siteConfig.description}`);
    }

    // Admin-managed pages.
    let pages: ListRow[] = [];
    try {
        const { data } = await supabase
            .from("pages")
            .select("slug, title, description");
        pages = (data as ListRow[] | null) ?? [];
    } catch (err) {
        console.error("llms.txt: failed to load pages", err);
    }

    const visiblePages = pages.filter(
        (p) => p.slug && p.slug !== "footer" && p.slug !== "home",
    );

    if (visiblePages.length) {
        parts.push("");
        parts.push("## Pages");
        parts.push("");
        for (const p of visiblePages) {
            parts.push(
                line(p.title || p.slug!, `${baseUrl}/${p.slug}`, p.description),
            );
        }
    }

    // Blog posts.
    let posts: ListRow[] = [];
    try {
        const { data } = await supabase
            .from("blogs")
            .select("slug, title, excerpt")
            .order("created_at", { ascending: false })
            .limit(50);
        posts = (data as ListRow[] | null) ?? [];
    } catch (err) {
        console.error("llms.txt: failed to load blog posts", err);
    }

    if (posts.length) {
        parts.push("");
        parts.push("## Blog");
        parts.push("");
        for (const p of posts) {
            if (!p.slug) continue;
            parts.push(
                line(
                    p.title || p.slug,
                    `${baseUrl}/blog/${p.slug}`,
                    p.excerpt,
                ),
            );
        }
    }

    parts.push("");
    parts.push("## Optional");
    parts.push("");
    parts.push(line("Sitemap", `${baseUrl}/sitemap.xml`));
    parts.push(line("Robots", `${baseUrl}/robots.txt`));

    const body = parts.join("\n") + "\n";

    return new Response(body, {
        headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
        },
    });
}
