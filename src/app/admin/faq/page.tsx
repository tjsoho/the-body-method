/* ************************************************************
   /admin/faq — the FAQ editor route.
************************************************************ */

import FaqInputs from "@/components/admin/faq/FaqInputs";
import { loadEditorData } from "@/utils/admin-page";
import { FAQ_SLUG, faqFallbackData, type FaqContent } from "@/app/faq/_config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function FaqAdminPage() {
    const data = await loadEditorData<FaqContent>(FAQ_SLUG, faqFallbackData);

    return (
        <FaqInputs
            initialContent={data.content}
            initialTitle={data.title}
            initialDescription={data.description}
            initialMetaTitle={data.metaTitle}
            initialMetaDescription={data.metaDescription}
        />
    );
}
