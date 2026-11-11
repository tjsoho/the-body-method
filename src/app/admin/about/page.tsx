/* ************************************************************
   /admin/about — the About editor route.
************************************************************ */

import AboutInputs from "@/components/admin/about/AboutInputs";
import { loadEditorData } from "@/utils/admin-page";
import {
    ABOUT_SLUG,
    aboutFallbackData,
    type AboutContent,
} from "@/app/about/_config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AboutAdminPage() {
    const data = await loadEditorData<AboutContent>(
        ABOUT_SLUG,
        aboutFallbackData,
    );

    return (
        <AboutInputs
            initialContent={data.content}
            initialTitle={data.title}
            initialDescription={data.description}
            initialMetaTitle={data.metaTitle}
            initialMetaDescription={data.metaDescription}
        />
    );
}
