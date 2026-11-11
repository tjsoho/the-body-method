/* ************************************************************
   /admin/private-pilates — the Private Pilates editor route.
************************************************************ */

import PrivatePilatesInputs from "@/components/admin/private-pilates/PrivatePilatesInputs";
import { loadEditorData } from "@/utils/admin-page";
import {
    PRIVATE_PILATES_SLUG,
    privatePilatesFallbackData,
    type PrivatePilatesContent,
} from "@/app/private-pilates/_config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PrivatePilatesAdminPage() {
    const data = await loadEditorData<PrivatePilatesContent>(
        PRIVATE_PILATES_SLUG,
        privatePilatesFallbackData,
    );

    return (
        <PrivatePilatesInputs
            initialContent={data.content}
            initialTitle={data.title}
            initialDescription={data.description}
            initialMetaTitle={data.metaTitle}
            initialMetaDescription={data.metaDescription}
        />
    );
}
