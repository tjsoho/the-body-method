/* ************************************************************
                        NOTES
   What every admin edit route needs to load.

   The row being edited, plus the stored SEO entry with the
   route's defaults behind it. One call so the routes stay a few
   lines each and none of them can forget the meta.
************************************************************ */

import getPage from "@/server-actions/page";
import { fetchSeoEntry } from "@/data/seo";
import { seoPages } from "@/config/seo-pages";

export type EditorData<TContent> = {
    content: TContent;
    title: string;
    description: string;
    metaTitle: string;
    metaDescription: string;
};

export async function loadEditorData<TContent>(
    slug: string,
    fallback: {
        slug: string;
        title: string;
        description: string;
        content: TContent;
    },
): Promise<EditorData<TContent>> {
    const [page, seoEntry] = await Promise.all([
        getPage<typeof fallback>(slug, fallback),
        fetchSeoEntry(slug),
    ]);

    const defaults = seoPages.find((entry) => entry.slug === slug);

    return {
        content: page.content,
        title: page.title,
        description: page.description,
        metaTitle:
            seoEntry?.meta_title || defaults?.defaultTitle || page.title || "",
        metaDescription:
            seoEntry?.meta_description ||
            defaults?.defaultDescription ||
            page.description ||
            "",
    };
}
