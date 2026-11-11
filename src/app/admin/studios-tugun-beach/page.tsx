/* ************************************************************
   /admin/studios-tugun-beach — the Tugun Beach editor route.
************************************************************ */

import TugunBeachInputs from "@/components/admin/studios-tugun-beach/TugunBeachInputs";
import { loadEditorData } from "@/utils/admin-page";
import {
    TUGUN_BEACH_SLUG,
    tugunBeachFallbackData,
    type TugunBeachContent,
} from "@/app/studios/tugun-beach/_config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function TugunBeachAdminPage() {
    const data = await loadEditorData<TugunBeachContent>(
        TUGUN_BEACH_SLUG,
        tugunBeachFallbackData,
    );

    return (
        <TugunBeachInputs
            initialContent={data.content}
            initialTitle={data.title}
            initialDescription={data.description}
            initialMetaTitle={data.metaTitle}
            initialMetaDescription={data.metaDescription}
        />
    );
}
