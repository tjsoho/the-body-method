"use client";

/* ************************************************************
                        NOTES
   The /book editor.

   Every row is "something a visitor might want to do" plus the
   place it sends them, so booking destinations can be changed
   here when the booking system links change.
************************************************************ */

import { useState } from "react";
import {
    AddItemButton,
    CtaField,
    FieldGroup,
    ListItemCard,
    TextAreaInput,
    TextInput,
    Toggle,
} from "@/components/admin/_shared/form-primitives";
import ListControls, {
    moveItem,
    removeAt,
    replaceAt,
} from "@/components/admin/_shared/ListControls";
import { EditorShell } from "@/components/admin/_shared/EditorShell";
import { BandHeroFields } from "@/components/admin/_shared/HeroFields";
import { usePageEditor } from "@/components/admin/_shared/usePageEditor";
import { BOOK_SLUG, type BookContent } from "@/app/book/_config";

type SectionKey = "hero" | "rows";

const SECTIONS: { value: SectionKey; label: string }[] = [
    { value: "hero", label: "1. Hero" },
    { value: "rows", label: "2. Booking rows" },
];

export default function BookInputs({
    initialContent,
    initialTitle,
    initialDescription,
    initialMetaTitle,
    initialMetaDescription,
}: {
    initialContent: BookContent;
    initialTitle: string;
    initialDescription: string;
    initialMetaTitle: string;
    initialMetaDescription: string;
}) {
    const [section, setSection] = useState<SectionKey>("hero");
    const editor = usePageEditor<BookContent>({
        slug: BOOK_SLUG,
        pageTitle: "Book",
        initialContent,
        initialTitle,
        initialDescription,
        initialMetaTitle,
        initialMetaDescription,
    });

    const { content, patch, setField } = editor;
    const rows = content.rows;

    return (
        <EditorShell
            pageTitle="Book"
            urlPath="/book"
            sections={SECTIONS}
            active={section}
            onSectionChange={setSection}
            metaTitle={editor.metaTitle}
            onMetaTitleChange={editor.setMetaTitle}
            metaDescription={editor.metaDescription}
            onMetaDescriptionChange={editor.setMetaDescription}
            onSave={editor.save}
            isSaving={editor.isSaving}
            saveStatus={editor.saveStatus}
        >
            {section === "hero" && (
                <BandHeroFields value={content.hero} onChange={patch("hero")} />
            )}

            {section === "rows" && (
                <FieldGroup
                    title="Booking rows"
                    description="One row per thing a visitor might want to do."
                    toolbar={
                        <AddItemButton
                            onClick={() =>
                                setField("rows", [
                                    ...rows,
                                    {
                                        id: `row-${Date.now()}`,
                                        heading: "",
                                        body: "",
                                        ctaLabel: "",
                                        ctaHref: "",
                                        primary: false,
                                    },
                                ])
                            }
                        >
                            Add row
                        </AddItemButton>
                    }
                >
                    {rows.map((row, index) => (
                        <ListItemCard
                            key={row.id}
                            title={row.heading || `Row ${index + 1}`}
                        >
                            <div className="flex justify-end">
                                <ListControls
                                    index={index}
                                    length={rows.length}
                                    onMove={(delta) =>
                                        setField(
                                            "rows",
                                            moveItem(rows, index, delta),
                                        )
                                    }
                                    onRemove={() =>
                                        setField("rows", removeAt(rows, index))
                                    }
                                />
                            </div>
                            <TextInput
                                label="Heading"
                                value={row.heading}
                                onChange={(heading) =>
                                    setField(
                                        "rows",
                                        replaceAt(rows, index, { heading }),
                                    )
                                }
                            />
                            <TextAreaInput
                                label="Line under the heading"
                                value={row.body}
                                onChange={(body) =>
                                    setField(
                                        "rows",
                                        replaceAt(rows, index, { body }),
                                    )
                                }
                                rows={2}
                                hint="Optional"
                            />
                            <CtaField
                                label="Button"
                                text={row.ctaLabel}
                                action={row.ctaHref}
                                onTextChange={(ctaLabel) =>
                                    setField(
                                        "rows",
                                        replaceAt(rows, index, { ctaLabel }),
                                    )
                                }
                                onActionChange={(ctaHref) =>
                                    setField(
                                        "rows",
                                        replaceAt(rows, index, { ctaHref }),
                                    )
                                }
                            />
                            <Toggle
                                id={`primary-${row.id}`}
                                label="Filled button"
                                checked={row.primary}
                                onChange={(primary) =>
                                    setField(
                                        "rows",
                                        replaceAt(rows, index, { primary }),
                                    )
                                }
                                hint="Use for the row you most want people to take"
                            />
                        </ListItemCard>
                    ))}
                </FieldGroup>
            )}
        </EditorShell>
    );
}
