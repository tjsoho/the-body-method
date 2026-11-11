/* ************************************************************
   /admin/classes — the classes editor route.
************************************************************ */

import ClassesInputs from "@/components/admin/classes/ClassesInputs";
import { loadEditorData } from "@/utils/admin-page";
import {
    CLASSES_SLUG,
    classesFallbackData,
    type ClassesContent,
} from "@/app/classes/_config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ClassesAdminPage() {
    const data = await loadEditorData<ClassesContent>(
        CLASSES_SLUG,
        classesFallbackData,
    );

    return (
        <ClassesInputs
            initialContent={data.content}
            initialTitle={data.title}
            initialDescription={data.description}
            initialMetaTitle={data.metaTitle}
            initialMetaDescription={data.metaDescription}
        />
    );
}
