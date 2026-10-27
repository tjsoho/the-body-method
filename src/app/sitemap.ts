import { MetadataRoute } from "next";
import { supabase } from "@/utils/supabase";
import { siteConfig } from "@/config/site";

/**
 * Dynamic sitemap. Revalidates every hour so admin edits in Supabase
 * (new pages, new blog posts) surface to Google without a redeploy,
 * without hammering the DB on every request.
 */
export const revalidate = 3600;

/** Top-level static routes known at build time. Add entries here when a
 *  new file-system route (not a Supabase-driven one) is added. */
const STATIC_ROUTES: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
}> = [{ path: "/", changeFrequency: "weekly", priority: 1.0 }];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = siteConfig.url || "https://example.com";
    const now = new Date();

    const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
        url: `${baseUrl}${r.path}`,
        lastModified: now,
        changeFrequency: r.changeFrequency,
        priority: r.priority,
    }));

    // Admin-managed pages (hero/about/etc. living in the `pages` table).
    try {
        const { data: pages } = await supabase
            .from("pages")
            .select("slug, updated_at");
        for (const row of pages ?? []) {
            if (!row.slug || row.slug === "home" || row.slug === "footer")
                continue;
            entries.push({
                url: `${baseUrl}/${row.slug}`,
                lastModified: row.updated_at ? new Date(row.updated_at) : now,
                changeFrequency: "monthly",
                priority: 0.7,
            });
        }
    } catch (err) {
        console.error("sitemap: failed to load pages", err);
    }

    // Blog posts.
    try {
        const { data: posts } = await supabase
            .from("blogs")
            .select("slug, updated_at, created_at");
        for (const row of posts ?? []) {
            if (!row.slug) continue;
            const modified = row.updated_at || row.created_at;
            entries.push({
                url: `${baseUrl}/blog/${row.slug}`,
                lastModified: modified ? new Date(modified) : now,
                changeFrequency: "monthly",
                priority: 0.6,
            });
        }
    } catch (err) {
        console.error("sitemap: failed to load blog posts", err);
    }

    return entries;
}
