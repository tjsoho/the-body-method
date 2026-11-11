/* ************************************************************
   /admin/book — the Book editor route.
************************************************************ */

import BookInputs from "@/components/admin/book/BookInputs";
import { loadEditorData } from "@/utils/admin-page";
import {
    BOOK_SLUG,
    bookFallbackData,
    type BookContent,
} from "@/app/book/_config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BookAdminPage() {
    const data = await loadEditorData<BookContent>(BOOK_SLUG, bookFallbackData);

    return (
        <BookInputs
            initialContent={data.content}
            initialTitle={data.title}
            initialDescription={data.description}
            initialMetaTitle={data.metaTitle}
            initialMetaDescription={data.metaDescription}
        />
    );
}
