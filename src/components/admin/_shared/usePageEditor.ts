"use client";

/* ************************************************************
                        NOTES
   The shared spine of every page editor.

   Each admin page keeps the same three jobs: hold the content
   being edited, write it to its `pages` row, and keep the meta
   title and description in step with the SEO table. Rather than
   repeat that in a dozen files, every editor calls this hook and
   is left with nothing but its own form.

   `patch` is the bit that matters at the call sites. Sections
   are objects on the content, so patch("hero")({ heading }) is
   the whole update, with the rest of the section untouched.
************************************************************ */

import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import useUpdatePage from "@/utils/hooks/useUpdatePage";
import { upsertSeoEntryAction } from "@/server-actions/seo";

export type SaveStatus = "idle" | "success" | "error";

export type PageEditorOptions<TContent> = {
    /** The `pages` row this editor owns. */
    slug: string;
    /** Shown in the save banner and the toast. */
    pageTitle: string;
    initialContent: TContent;
    initialTitle: string;
    initialDescription: string;
    initialMetaTitle: string;
    initialMetaDescription: string;
    /** Runs after the row saves, for editors that write a second row. */
    onSaveExtra?: () => Promise<void>;
};

export function usePageEditor<TContent extends object>({
    slug,
    pageTitle,
    initialContent,
    initialTitle,
    initialDescription,
    initialMetaTitle,
    initialMetaDescription,
    onSaveExtra,
}: PageEditorOptions<TContent>) {
    const [content, setContent] = useState<TContent>(initialContent);
    const [metaTitle, setMetaTitle] = useState(initialMetaTitle);
    const [metaDescription, setMetaDescription] = useState(
        initialMetaDescription,
    );
    const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

    const { isSaving, updatePage } = useUpdatePage<TContent>(slug);

    /** patch("hero")({ heading }) updates one field of one section. */
    const patch = useMemo(
        () =>
            <K extends keyof TContent>(key: K) =>
            (value: Partial<TContent[K]>) =>
                setContent((previous) => ({
                    ...previous,
                    [key]: { ...previous[key], ...value },
                })),
        [],
    );

    /** For sections that are a plain value rather than an object. */
    const setField = useCallback(
        <K extends keyof TContent>(key: K, value: TContent[K]) =>
            setContent((previous) => ({ ...previous, [key]: value })),
        [],
    );

    const save = useCallback(async () => {
        setSaveStatus("idle");
        try {
            await updatePage({
                slug,
                title: initialTitle,
                description: initialDescription,
                content,
            });

            if (onSaveExtra) await onSaveExtra();

            const seo = await upsertSeoEntryAction({
                slug,
                metaTitle,
                metaDescription,
            });
            if (!seo?.success) {
                throw new Error(
                    "The page content saved, but the meta did not.",
                );
            }

            setSaveStatus("success");
            toast.success(`${pageTitle} saved. The live site is updated.`);
        } catch (error) {
            console.error(`Saving ${slug} failed:`, error);
            setSaveStatus("error");
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Could not save. Check you are still signed in.",
            );
        }
    }, [
        content,
        initialDescription,
        initialTitle,
        metaDescription,
        metaTitle,
        onSaveExtra,
        pageTitle,
        slug,
        updatePage,
    ]);

    return {
        content,
        setContent,
        patch,
        setField,
        metaTitle,
        setMetaTitle,
        metaDescription,
        setMetaDescription,
        save,
        isSaving,
        saveStatus,
    };
}
