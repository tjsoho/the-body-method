/* ************************************************************
   /admin/contact — the contact editor route.
************************************************************ */

import ContactInputs from "@/components/admin/contact/ContactInputs";
import { loadEditorData } from "@/utils/admin-page";
import {
    CONTACT_SLUG,
    contactFallbackData,
    type ContactContent,
} from "@/app/contact/_config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ContactAdminPage() {
    const data = await loadEditorData<ContactContent>(
        CONTACT_SLUG,
        contactFallbackData,
    );

    return (
        <ContactInputs
            initialContent={data.content}
            initialTitle={data.title}
            initialDescription={data.description}
            initialMetaTitle={data.metaTitle}
            initialMetaDescription={data.metaDescription}
        />
    );
}
