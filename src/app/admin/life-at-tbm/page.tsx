/* ************************************************************
   /admin/life-at-tbm — the Life at TBM editor route.
************************************************************ */

import LifeAtTbmInputs from "@/components/admin/life-at-tbm/LifeAtTbmInputs";
import { loadEditorData } from "@/utils/admin-page";
import {
    LIFE_AT_TBM_SLUG,
    lifeAtTbmFallbackData,
    type LifeAtTbmContent,
} from "@/app/life-at-tbm/_config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function LifeAtTbmAdminPage() {
    const data = await loadEditorData<LifeAtTbmContent>(
        LIFE_AT_TBM_SLUG,
        lifeAtTbmFallbackData,
    );

    return (
        <LifeAtTbmInputs
            initialContent={data.content}
            initialTitle={data.title}
            initialDescription={data.description}
            initialMetaTitle={data.metaTitle}
            initialMetaDescription={data.metaDescription}
        />
    );
}
