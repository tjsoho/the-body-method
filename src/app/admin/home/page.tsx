/* ************************************************************
                        NOTES
   /admin/home — the home page editor route.

   Reads the two rows the home page is built from, plus the
   stored SEO entry, and hands them to the client form. Dynamic
   so opening the editor always shows what is live rather than a
   build-time snapshot.
************************************************************ */

import getPage from "@/server-actions/page";
import { fetchSeoEntry } from "@/data/seo";
import { seoPages } from "@/config/seo-pages";
import {
    homePageFallbackData,
    type HomePageProps,
} from "@/app/_config";
import HomeInputs from "@/components/admin/home/HomeInputs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomeAdminPage() {
    const [homePage, seoEntry] = await Promise.all([
        getPage<HomePageProps>("home", homePageFallbackData),
        fetchSeoEntry("home"),
    ]);

    const seoDefaults = seoPages.find((page) => page.slug === "home");

    return (
        <HomeInputs
            initialContent={homePage.content}
            initialTitle={homePage.title}
            initialDescription={homePage.description}
            initialMetaTitle={
                seoEntry?.meta_title ||
                seoDefaults?.defaultTitle ||
                homePage.title ||
                ""
            }
            initialMetaDescription={
                seoEntry?.meta_description ||
                seoDefaults?.defaultDescription ||
                homePage.description ||
                ""
            }
        />
    );
}
