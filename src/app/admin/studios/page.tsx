/* ************************************************************
   /admin/studios — the Studios hub editor route.
************************************************************ */

import StudiosInputs from "@/components/admin/studios/StudiosInputs";
import { loadEditorData } from "@/utils/admin-page";
import {
    STUDIOS_SLUG,
    studiosFallbackData,
    type StudiosContent,
} from "@/app/studios/_config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StudiosAdminPage() {
    const data = await loadEditorData<StudiosContent>(
        STUDIOS_SLUG,
        studiosFallbackData,
    );

    return (
        <StudiosInputs
            initialContent={data.content}
            initialTitle={data.title}
            initialDescription={data.description}
            initialMetaTitle={data.metaTitle}
            initialMetaDescription={data.metaDescription}
        />
    );
}
