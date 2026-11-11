"use client";

/* ************************************************************
                        NOTES
   The /private-pilates editor.

   The prices in the last section also appear on /memberships.
   Changing one does not change the other, which the pricing
   section says on screen so nobody is caught out.
************************************************************ */

import { useState } from "react";
import {
    AddItemButton,
    CtaField,
    FieldGroup,
    ListItemCard,
    ParagraphListInput,
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
import {
    PRIVATE_PILATES_SLUG,
    type PrivatePilatesContent,
} from "@/app/private-pilates/_config";

type SectionKey =
    | "hero"
    | "intro"
    | "useCases"
    | "firstSession"
    | "progression"
    | "pricing";

const SECTIONS: { value: SectionKey; label: string }[] = [
    { value: "hero", label: "1. Hero" },
    { value: "intro", label: "2. Intro line" },
    { value: "useCases", label: "3. Useful when" },
    { value: "firstSession", label: "4. Your first session" },
    { value: "progression", label: "5. Not forever" },
    { value: "pricing", label: "6. Pricing" },
];

export default function PrivatePilatesInputs({
    initialContent,
    initialTitle,
    initialDescription,
    initialMetaTitle,
    initialMetaDescription,
}: {
    initialContent: PrivatePilatesContent;
    initialTitle: string;
    initialDescription: string;
    initialMetaTitle: string;
    initialMetaDescription: string;
}) {
    const [section, setSection] = useState<SectionKey>("hero");
    const editor = usePageEditor<PrivatePilatesContent>({
        slug: PRIVATE_PILATES_SLUG,
        pageTitle: "Private Pilates",
        initialContent,
        initialTitle,
        initialDescription,
        initialMetaTitle,
        initialMetaDescription,
    });

    const { content, patch } = editor;
    const setUseCases = patch("useCases");
    const setFirst = patch("firstSession");
    const setProgression = patch("progression");
    const setPricing = patch("pricing");

    return (
        <EditorShell
            pageTitle="Private Pilates"
            urlPath="/private-pilates"
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
                    usage="Private Pilates hero"
                />
            )}

            {section === "intro" && (
                <FieldGroup
                    title="Intro line"
                    description="The centred line under the hero."
                >
                    <TextAreaInput
                        label="Copy"
                        value={content.intro.body}
                        onChange={(body) => patch("intro")({ body })}
                        rows={4}
                    />
                </FieldGroup>
            )}

            {section === "useCases" && (
                <FieldGroup
                    title="Useful when"
                    description="They run down the page in two columns."
                >
                    <TextAreaInput
                        label="Heading"
                        value={content.useCases.heading}
                        onChange={(heading) => setUseCases({ heading })}
                        rows={2}
                    />
                    <ParagraphListInput
                        label="Rows"
                        values={content.useCases.items}
                        onChange={(items) => setUseCases({ items })}
                        addLabel="Add row"
                        rows={1}
                    />
                </FieldGroup>
            )}

            {section === "firstSession" && (
                <>
                    <FieldGroup title="Heading and copy">
                        <TextAreaInput
                            label="Heading"
                            value={content.firstSession.heading}
                            onChange={(heading) => setFirst({ heading })}
                            rows={2}
                        />
                        <ParagraphListInput
                            label="Paragraphs"
                            values={content.firstSession.body}
                            onChange={(body) => setFirst({ body })}
                        />
                    </FieldGroup>
                    <FieldGroup title="Photo">
                        <PhotoFields
                            label="Section photo"
                            image={content.firstSession.image}
                            imageAlt={content.firstSession.imageAlt}
                            usage="Private Pilates: first session"
                            onImageChange={(image) => setFirst({ image })}
                            onAltChange={(imageAlt) => setFirst({ imageAlt })}
                        />
                    </FieldGroup>
                </>
            )}

            {section === "progression" && (
                <>
                    <FieldGroup title="Heading and copy">
                        <TextAreaInput
                            label="Heading"
                            value={content.progression.heading}
                            onChange={(heading) => setProgression({ heading })}
                            rows={2}
                        />
                        <ParagraphListInput
                            label="Paragraphs before the chain"
                            values={content.progression.bodyBefore}
                            onChange={(bodyBefore) =>
                                setProgression({ bodyBefore })
                            }
                        />
                        <TextAreaInput
                            label="Line directly above the chain"
                            value={content.progression.chainLead}
                            onChange={(chainLead) =>
                                setProgression({ chainLead })
                            }
                            rows={2}
                        />
                        <ParagraphListInput
                            label="Chain steps"
                            values={content.progression.chain}
                            onChange={(chain) => setProgression({ chain })}
                            addLabel="Add step"
                            rows={1}
                        />
                        <ParagraphListInput
                            label="Paragraphs after the chain"
                            values={content.progression.bodyAfter}
                            onChange={(bodyAfter) =>
                                setProgression({ bodyAfter })
                            }
                        />
                    </FieldGroup>
                    <FieldGroup title="Photo">
                        <PhotoFields
                            label="Section photo"
                            image={content.progression.image}
                            imageAlt={content.progression.imageAlt}
                            imageFocus={content.progression.imageFocus}
                            usage="Private Pilates: progression"
                            onImageChange={(image) => setProgression({ image })}
                            onAltChange={(imageAlt) =>
                                setProgression({ imageAlt })
                            }
                            onFocusChange={(imageFocus) =>
                                setProgression({ imageFocus })
                            }
                        />
                    </FieldGroup>
                </>
            )}

            {section === "pricing" && (
                <>
                    <FieldGroup
                        title="Pricing"
                        description="These prices also appear on the Memberships page. Changing them here does not change them there."
                        toolbar={
                            <AddItemButton
                                onClick={() =>
                                    setPricing({
                                        columns: [
                                            ...content.pricing.columns,
                                            {
                                                id: `column-${Date.now()}`,
                                                title: "",
                                                note: "",
                                                rows: [""],
                                            },
                                        ],
                                    })
                                }
                            >
                                Add column
                            </AddItemButton>
                        }
                    >
                        <TextInput
                            label="Section heading"
                            value={content.pricing.heading}
                            onChange={(heading) => setPricing({ heading })}
                        />
                        {content.pricing.columns.map((column, index) => (
                            <ListItemCard
                                key={column.id}
                                title={column.title || `Column ${index + 1}`}
                            >
                                <div className="flex justify-end">
                                    <ListControls
                                        index={index}
                                        length={content.pricing.columns.length}
                                        onMove={(delta) =>
                                            setPricing({
                                                columns: moveItem(
                                                    content.pricing.columns,
                                                    index,
                                                    delta,
                                                ),
                                            })
                                        }
                                        onRemove={() =>
                                            setPricing({
                                                columns: removeAt(
                                                    content.pricing.columns,
                                                    index,
                                                ),
                                            })
                                        }
                                    />
                                </div>
                                <TextInput
                                    label="Column heading"
                                    value={column.title}
                                    onChange={(title) =>
                                        setPricing({
                                            columns: replaceAt(
                                                content.pricing.columns,
                                                index,
                                                { title },
                                            ),
                                        })
                                    }
                                />
                                <TextInput
                                    label="Note under the heading"
                                    value={column.note}
                                    onChange={(note) =>
                                        setPricing({
                                            columns: replaceAt(
                                                content.pricing.columns,
                                                index,
                                                { note },
                                            ),
                                        })
                                    }
                                    placeholder="Optional"
                                />
                                <ParagraphListInput
                                    label="Price lines"
                                    values={column.rows}
                                    onChange={(rows) =>
                                        setPricing({
                                            columns: replaceAt(
                                                content.pricing.columns,
                                                index,
                                                { rows },
                                            ),
                                        })
                                    }
                                    addLabel="Add price line"
                                    rows={1}
                                />
                            </ListItemCard>
                        ))}
                    </FieldGroup>
                    <FieldGroup title="Button and link">
                        <CtaField
                            label="Button"
                            text={content.pricing.cta.label}
                            action={content.pricing.cta.href}
                            onTextChange={(label) =>
                                setPricing({
                                    cta: { ...content.pricing.cta, label },
                                })
                            }
                            onActionChange={(href) =>
                                setPricing({
                                    cta: { ...content.pricing.cta, href },
                                })
                            }
                        />
                        <CtaField
                            label="Link beside the button"
                            text={content.pricing.link.label}
                            action={content.pricing.link.href}
                            onTextChange={(label) =>
                                setPricing({
                                    link: { ...content.pricing.link, label },
                                })
                            }
                            onActionChange={(href) =>
                                setPricing({
                                    link: { ...content.pricing.link, href },
                                })
                            }
                        />
                    </FieldGroup>
                </>
            )}
        </EditorShell>
    );
}
