/* ************************************************************
   /admin/our-people — the Our People editor route.

   Loads this page's content and the shared teaching roster,
   which is edited here and read by the home page too.
************************************************************ */

import OurPeopleInputs from "@/components/admin/our-people/OurPeopleInputs";
import { loadEditorData } from "@/utils/admin-page";
import getPage from "@/server-actions/page";
import {
    TEACHERS_SLUG,
    teachersPageFallbackData,
    type TeachersContent,
} from "@/data/teachers";
import {
    OUR_PEOPLE_SLUG,
    ourPeopleFallbackData,
    type OurPeopleContent,
} from "@/app/our-people/_config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function OurPeopleAdminPage() {
    const [data, teachersPage] = await Promise.all([
        loadEditorData<OurPeopleContent>(
            OUR_PEOPLE_SLUG,
            ourPeopleFallbackData,
        ),
        getPage<{ content: TeachersContent }>(
            TEACHERS_SLUG,
            teachersPageFallbackData,
        ),
    ]);

    return (
        <OurPeopleInputs
            initialContent={data.content}
            initialTitle={data.title}
            initialDescription={data.description}
            initialMetaTitle={data.metaTitle}
            initialMetaDescription={data.metaDescription}
            initialTeachers={teachersPage.content.teachers}
        />
    );
}
