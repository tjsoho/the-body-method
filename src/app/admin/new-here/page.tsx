/* ************************************************************
   /admin/new-here — the New Here editor route.
************************************************************ */

import NewHereInputs from "@/components/admin/new-here/NewHereInputs";
import { loadEditorData } from "@/utils/admin-page";
import {
    NEW_HERE_SLUG,
    newHereFallbackData,
    type NewHereContent,
} from "@/app/new-here/_config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NewHereAdminPage() {
    const data = await loadEditorData<NewHereContent>(
        NEW_HERE_SLUG,
        newHereFallbackData,
    );

    return (
        <NewHereInputs
            initialContent={data.content}
            initialTitle={data.title}
            initialDescription={data.description}
            initialMetaTitle={data.metaTitle}
            initialMetaDescription={data.metaDescription}
        />
    );
}
