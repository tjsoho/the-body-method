"use client";

/* ************************************************************
                        NOTES
   The /studios editor.

   The comparison is a table in two directions: studios across,
   rows down. Each row carries one value per studio, so adding a
   studio adds a value box to every row rather than leaving the
   page with a gap.
************************************************************ */

import { useState } from "react";
import {
    AddItemButton,
    CtaField,
    FieldGroup,
    ListItemCard,
    TextAreaInput,
    TextInput,
} from "@/components/admin/_shared/form-primitives";
import ListControls, {
    moveItem,
    removeAt,
    replaceAt,
} from "@/components/admin/_shared/ListControls";
import { EditorShell } from "@/components/admin/_shared/EditorShell";
import {
    PhotoFields,
    PhotoHeroFields,
} from "@/components/admin/_shared/HeroFields";
import { usePageEditor } from "@/components/admin/_shared/usePageEditor";
import { STUDIOS_SLUG, type StudiosContent } from "@/app/studios/_config";

type SectionKey = "hero" | "difference" | "wantBoth";

const SECTIONS: { value: SectionKey; label: string }[] = [
    { value: "hero", label: "1. Hero" },
    { value: "difference", label: "2. The difference" },
    { value: "wantBoth", label: "3. Want both band" },
];

export default function StudiosInputs({
    initialContent,
    initialTitle,
    initialDescription,
    initialMetaTitle,
    initialMetaDescription,
}: {
    initialContent: StudiosContent;
    initialTitle: string;
    initialDescription: string;
    initialMetaTitle: string;
    initialMetaDescription: string;
}) {
    const [section, setSection] = useState<SectionKey>("hero");
    const editor = usePageEditor<StudiosContent>({
        slug: STUDIOS_SLUG,
        pageTitle: "Studios",
        initialContent,
        initialTitle,
        initialDescription,
        initialMetaTitle,
        initialMetaDescription,
    });

    const { content, patch } = editor;
    const setDifference = patch("difference");
    const setWantBoth = patch("wantBoth");
    const { studios, rows } = content.difference;

    /** Adding or removing a studio keeps every row's values in step. */
    const addStudio = () =>
        setDifference({
            studios: [
                ...studios,
                {
                    id: `studio-${Date.now()}`,
                    name: "",
                    href: "",
                    image: "",
                    imageAlt: "",
                    imageFocus: "center",
                },
            ],
            rows: rows.map((row) => ({ ...row, values: [...row.values, ""] })),
        });

    const removeStudio = (index: number) =>
        setDifference({
            studios: removeAt(studios, index),
            rows: rows.map((row) => ({
                ...row,
                values: removeAt(row.values, index),
            })),
        });

    const moveStudio = (index: number, delta: number) =>
        setDifference({
            studios: moveItem(studios, index, delta),
            rows: rows.map((row) => ({
                ...row,
                values: moveItem(row.values, index, delta),
            })),
        });

    return (
        <EditorShell
            pageTitle="Studios"
            urlPath="/studios"
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
                <PhotoHeroFields
                    value={content.hero}
                    onChange={patch("hero")}
                    usage="Studios hero"
                />
            )}

            {section === "difference" && (
                <>
                    <FieldGroup title="Section label">
                        <TextInput
                            label="Label on the forest chip"
                            value={content.difference.label}
                            onChange={(label) => setDifference({ label })}
                        />
                    </FieldGroup>

                    <FieldGroup
                        title="Studios"
                        description="One card each, left to right. Adding one adds a value box to every comparison row."
                        toolbar={
                            <AddItemButton onClick={addStudio}>
                                Add studio
                            </AddItemButton>
                        }
                    >
                        {studios.map((studio, index) => (
                            <ListItemCard
                                key={studio.id}
                                title={studio.name || `Studio ${index + 1}`}
                            >
                                <div className="flex justify-end">
                                    <ListControls
                                        index={index}
                                        length={studios.length}
                                        onMove={(delta) =>
                                            moveStudio(index, delta)
                                        }
                                        onRemove={() => removeStudio(index)}
                                    />
                                </div>
                                <TextInput
                                    label="Name"
                                    value={studio.name}
                                    onChange={(name) =>
                                        setDifference({
                                            studios: replaceAt(
                                                studios,
                                                index,
                                                { name },
                                            ),
                                        })
                                    }
                                />
                                <TextInput
                                    label="Card links to"
                                    value={studio.href}
                                    onChange={(href) =>
                                        setDifference({
                                            studios: replaceAt(
                                                studios,
                                                index,
                                                { href },
                                            ),
                                        })
                                    }
                                    placeholder="/studios/tugun-beach"
                                />
                                <PhotoFields
                                    label="Card photo"
                                    image={studio.image}
                                    imageAlt={studio.imageAlt}
                                    imageFocus={studio.imageFocus}
                                    usage={`Studios: ${studio.name}`}
                                    onImageChange={(image) =>
                                        setDifference({
                                            studios: replaceAt(
                                                studios,
                                                index,
                                                { image },
                                            ),
                                        })
                                    }
                                    onAltChange={(imageAlt) =>
                                        setDifference({
                                            studios: replaceAt(
                                                studios,
                                                index,
                                                { imageAlt },
                                            ),
                                        })
                                    }
                                    onFocusChange={(imageFocus) =>
                                        setDifference({
                                            studios: replaceAt(
                                                studios,
                                                index,
                                                { imageFocus },
                                            ),
                                        })
                                    }
                                />
                            </ListItemCard>
                        ))}
                    </FieldGroup>

                    <FieldGroup
                        title="Comparison rows"
                        description="One row per line of the table, with a value for each studio."
                        toolbar={
                            <AddItemButton
                                onClick={() =>
                                    setDifference({
                                        rows: [
                                            ...rows,
                                            {
                                                id: `row-${Date.now()}`,
                                                label: "",
                                                values: studios.map(() => ""),
                                            },
                                        ],
                                    })
                                }
                            >
                                Add row
                            </AddItemButton>
                        }
                    >
                        {rows.map((row, index) => (
                            <ListItemCard
                                key={row.id}
                                title={row.label || `Row ${index + 1}`}
                            >
                                <div className="flex justify-end">
                                    <ListControls
                                        index={index}
                                        length={rows.length}
                                        onMove={(delta) =>
                                            setDifference({
                                                rows: moveItem(
                                                    rows,
                                                    index,
                                                    delta,
                                                ),
                                            })
                                        }
                                        onRemove={() =>
                                            setDifference({
                                                rows: removeAt(rows, index),
                                            })
                                        }
                                    />
                                </div>
                                <TextInput
                                    label="Row label"
                                    value={row.label}
                                    onChange={(label) =>
                                        setDifference({
                                            rows: replaceAt(rows, index, {
                                                label,
                                            }),
                                        })
                                    }
                                />
                                {studios.map((studio, studioIndex) => (
                                    <TextAreaInput
                                        key={studio.id}
                                        label={studio.name || `Studio ${studioIndex + 1}`}
                                        value={row.values[studioIndex] ?? ""}
                                        onChange={(value) =>
                                            setDifference({
                                                rows: replaceAt(rows, index, {
                                                    values: row.values.map(
                                                        (v, i) =>
                                                            i === studioIndex
                                                                ? value
                                                                : v,
                                                    ),
                                                }),
                                            })
                                        }
                                        rows={2}
                                    />
                                ))}
                            </ListItemCard>
                        ))}
                    </FieldGroup>
                </>
            )}

            {section === "wantBoth" && (
                <FieldGroup
                    title="Want both band"
                    description="The forest band at the foot of the page."
                >
                    <TextInput
                        label="Heading"
                        value={content.wantBoth.heading}
                        onChange={(heading) => setWantBoth({ heading })}
                    />
                    <TextAreaInput
                        label="Italic line"
                        value={content.wantBoth.body}
                        onChange={(body) => setWantBoth({ body })}
                        rows={3}
                    />
                    <CtaField
                        label="Button"
                        text={content.wantBoth.cta.label}
                        action={content.wantBoth.cta.href}
                        onTextChange={(label) =>
                            setWantBoth({
                                cta: { ...content.wantBoth.cta, label },
                            })
                        }
                        onActionChange={(href) =>
                            setWantBoth({
                                cta: { ...content.wantBoth.cta, href },
                            })
                        }
                    />
                </FieldGroup>
            )}
        </EditorShell>
    );
}
