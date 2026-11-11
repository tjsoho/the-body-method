/* ************************************************************
   /admin/studios-cornerstone — the Cornerstone editor route.
************************************************************ */

import CornerstoneInputs from "@/components/admin/studios-cornerstone/CornerstoneInputs";
import { loadEditorData } from "@/utils/admin-page";
import {
    CORNERSTONE_SLUG,
    cornerstoneFallbackData,
    type CornerstoneContent,
} from "@/app/studios/cornerstone/_config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CornerstoneAdminPage() {
    const data = await loadEditorData<CornerstoneContent>(
        CORNERSTONE_SLUG,
        cornerstoneFallbackData,
    );

    return (
        <CornerstoneInputs
            initialContent={data.content}
            initialTitle={data.title}
            initialDescription={data.description}
            initialMetaTitle={data.metaTitle}
            initialMetaDescription={data.metaDescription}
        />
    );
}
