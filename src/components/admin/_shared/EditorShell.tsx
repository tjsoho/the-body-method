"use client";

/* ************************************************************
                        NOTES
   The frame every page editor sits in.

   Save banner across the top, section list and page meta down
   the left, the active section's form on the right. Each editor
   supplies its sections and its forms and gets the rest for
   free, so every page in the admin behaves the same way.
************************************************************ */

import type { ReactNode } from "react";
import { SaveBanner } from "@/components/core/save-banner";
import {
    AdminPageShell,
    PageMetaPanel,
    SectionSidebar,
} from "@/components/admin/_shared/form-primitives";
import type { SaveStatus } from "@/components/admin/_shared/usePageEditor";

export type EditorSection<T extends string> = { value: T; label: string };

export function EditorShell<T extends string>({
    pageTitle,
    urlPath,
    sections,
    active,
    onSectionChange,
    metaTitle,
    onMetaTitleChange,
    metaDescription,
    onMetaDescriptionChange,
    onSave,
    isSaving,
    saveStatus,
    children,
}: {
    pageTitle: string;
    /** Shown read-only in the meta panel, e.g. "/memberships". */
    urlPath: string;
    sections: EditorSection<T>[];
    active: T;
    onSectionChange: (next: T) => void;
    metaTitle: string;
    onMetaTitleChange: (v: string) => void;
    metaDescription: string;
    onMetaDescriptionChange: (v: string) => void;
    onSave: () => void;
    isSaving: boolean;
    saveStatus: SaveStatus;
    children: ReactNode;
}) {
    return (
        <>
            <SaveBanner
                pageTitle={pageTitle}
                onSave={onSave}
                isSaving={isSaving}
                saveStatus={saveStatus}
            />
            <AdminPageShell
                sidebar={
                    <div className="space-y-4">
                        <SectionSidebar
                            tabs={sections}
                            active={active}
                            onChange={onSectionChange}
                        />
                        <PageMetaPanel
                            url={urlPath}
                            urlLockedReason="Changing a page's address is a code change, so it is not editable here."
                            metaTitle={metaTitle}
                            onMetaTitleChange={onMetaTitleChange}
                            metaDescription={metaDescription}
                            onMetaDescriptionChange={onMetaDescriptionChange}
                        />
                    </div>
                }
            >
                {children}
            </AdminPageShell>
        </>
    );
}
