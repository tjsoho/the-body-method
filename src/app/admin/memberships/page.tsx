/* ************************************************************
   /admin/memberships — the memberships editor route.
************************************************************ */

import MembershipsInputs from "@/components/admin/memberships/MembershipsInputs";
import { loadEditorData } from "@/utils/admin-page";
import {
    MEMBERSHIPS_SLUG,
    membershipsFallbackData,
    type MembershipsContent,
} from "@/app/memberships/_config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MembershipsAdminPage() {
    const data = await loadEditorData<MembershipsContent>(
        MEMBERSHIPS_SLUG,
        membershipsFallbackData,
    );

    return (
        <MembershipsInputs
            initialContent={data.content}
            initialTitle={data.title}
            initialDescription={data.description}
            initialMetaTitle={data.metaTitle}
            initialMetaDescription={data.metaDescription}
        />
    );
}
