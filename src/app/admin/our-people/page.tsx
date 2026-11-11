/* ************************************************************
   /admin/our-people — the Our People editor route.
************************************************************ */

import OurPeopleInputs from "@/components/admin/our-people/OurPeopleInputs";
import { loadEditorData } from "@/utils/admin-page";
import {
    OUR_PEOPLE_SLUG,
    ourPeopleFallbackData,
    type OurPeopleContent,
} from "@/app/our-people/_config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function OurPeopleAdminPage() {
    const data = await loadEditorData<OurPeopleContent>(
        OUR_PEOPLE_SLUG,
        ourPeopleFallbackData,
    );

    return (
        <OurPeopleInputs
            initialContent={data.content}
            initialTitle={data.title}
            initialDescription={data.description}
            initialMetaTitle={data.metaTitle}
            initialMetaDescription={data.metaDescription}
        />
    );
}
