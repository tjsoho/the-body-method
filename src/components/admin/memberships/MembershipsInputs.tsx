"use client";

/* ************************************************************
                        NOTES
   The /memberships editor.

   Prices live here, so this is the page the studio will come
   back to most. Every tier, price row, button and photo on the
   public page has a field below.
************************************************************ */

import { useState } from "react";
import {
    AddItemButton,
    CtaField,
    FieldGroup,
    ListItemCard,
    ParagraphListInput,
    RichTextInput,
    SelectInput,
    TextAreaInput,
    TextInput,
} from "@/components/admin/_shared/form-primitives";
import ListControls, {
    moveItem,
    removeAt,
    replaceAt,
} from "@/components/admin/_shared/ListControls";
import { EditorShell } from "@/components/admin/_shared/EditorShell";
import { PhotoHeroFields } from "@/components/admin/_shared/HeroFields";
import { usePageEditor } from "@/components/admin/_shared/usePageEditor";
import {
    MEMBERSHIPS_SLUG,
    type MembershipsContent,
    type PriceColumn,
} from "@/app/memberships/_config";

type SectionKey =
    | "hero"
    | "tiers"
    | "privatePilates"
    | "classPacks"
    | "casual";

const SECTIONS: { value: SectionKey; label: string }[] = [
    { value: "hero", label: "1. Hero" },
    { value: "tiers", label: "2. Membership tiers" },
    { value: "privatePilates", label: "3. Private Pilates" },
    { value: "classPacks", label: "4. Class packs" },
    { value: "casual", label: "5. Casual options" },
];

/* ------------------------------------------------------------
   A price column: title, optional note, and its rows.
   Used by both Private Pilates and Class packs.
   ------------------------------------------------------------ */
function PriceColumnsField({
    columns,
    onChange,
    addLabel,
}: {
    columns: PriceColumn[];
    onChange: (next: PriceColumn[]) => void;
    addLabel: string;
}) {
    return (
        <FieldGroup
            title="Price columns"
            description="Each column is a heading and a list of price lines."
            toolbar={
                <AddItemButton
                    onClick={() =>
                        onChange([
                            ...columns,
                            {
                                id: `column-${Date.now()}`,
                                title: "",
                                note: "",
                                rows: [""],
                            },
                        ])
                    }
                >
                    {addLabel}
                </AddItemButton>
            }
        >
            {columns.map((column, index) => (
                <ListItemCard
                    key={column.id}
                    title={column.title || `Column ${index + 1}`}
                >
                    <div className="flex justify-end">
                        <ListControls
                            index={index}
                            length={columns.length}
                            onMove={(delta) =>
                                onChange(moveItem(columns, index, delta))
                            }
                            onRemove={() => onChange(removeAt(columns, index))}
                        />
                    </div>
                    <TextInput
                        label="Column heading"
                        value={column.title}
                        onChange={(title) =>
                            onChange(replaceAt(columns, index, { title }))
                        }
                    />
                    <TextInput
                        label="Note under the heading"
                        value={column.note}
                        onChange={(note) =>
                            onChange(replaceAt(columns, index, { note }))
                        }
                        placeholder="Optional"
                    />
                    <ParagraphListInput
                        label="Price lines"
                        values={column.rows}
                        onChange={(rows) =>
                            onChange(replaceAt(columns, index, { rows }))
                        }
                        addLabel="Add price line"
                        rows={1}
                    />
                </ListItemCard>
            ))}
        </FieldGroup>
    );
}

/* ------------------------------------------------------------
   Page
   ------------------------------------------------------------ */
export default function MembershipsInputs({
    initialContent,
    initialTitle,
    initialDescription,
    initialMetaTitle,
    initialMetaDescription,
}: {
    initialContent: MembershipsContent;
    initialTitle: string;
    initialDescription: string;
    initialMetaTitle: string;
    initialMetaDescription: string;
}) {
    const [section, setSection] = useState<SectionKey>("hero");
    const editor = usePageEditor<MembershipsContent>({
        slug: MEMBERSHIPS_SLUG,
        pageTitle: "Memberships",
        initialContent,
        initialTitle,
        initialDescription,
        initialMetaTitle,
        initialMetaDescription,
    });

    const { content, patch } = editor;
    const setHero = patch("hero");
    const setTiers = patch("tiers");
    const setPrivate = patch("privatePilates");
    const setPacks = patch("classPacks");
    const setCasual = patch("casual");

    return (
        <EditorShell
            pageTitle="Memberships"
            urlPath="/memberships"
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
                    onChange={setHero}
                    usage="Memberships hero"
                />
            )}

            {section === "tiers" && (
                <>
                    <FieldGroup title="Intro line">
                        <TextAreaInput
                            label="Centred line above the cards"
                            value={content.tiers.intro}
                            onChange={(intro) => setTiers({ intro })}
                            rows={3}
                        />
                    </FieldGroup>

                    <FieldGroup
                        title="Tiers"
                        description="One card each. The dark card is the one set to the forest theme."
                        toolbar={
                            <AddItemButton
                                onClick={() =>
                                    setTiers({
                                        items: [
                                            ...content.tiers.items,
                                            {
                                                id: `tier-${Date.now()}`,
                                                label: "",
                                                italicLine: "",
                                                price: "",
                                                summary: "",
                                                detail: "",
                                                disclosureLabel:
                                                    "WHAT'S INCLUDED",
                                                ctaLabel: "",
                                                ctaHref: "",
                                                theme: "light",
                                            },
                                        ],
                                    })
                                }
                            >
                                Add tier
                            </AddItemButton>
                        }
                    >
                        {content.tiers.items.map((tier, index) => (
                            <ListItemCard
                                key={tier.id}
                                title={tier.label || `Tier ${index + 1}`}
                            >
                                <div className="flex justify-end">
                                    <ListControls
                                        index={index}
                                        length={content.tiers.items.length}
                                        onMove={(delta) =>
                                            setTiers({
                                                items: moveItem(
                                                    content.tiers.items,
                                                    index,
                                                    delta,
                                                ),
                                            })
                                        }
                                        onRemove={() =>
                                            setTiers({
                                                items: removeAt(
                                                    content.tiers.items,
                                                    index,
                                                ),
                                            })
                                        }
                                    />
                                </div>
                                <TextInput
                                    label="Card label"
                                    value={tier.label}
                                    onChange={(label) =>
                                        setTiers({
                                            items: replaceAt(
                                                content.tiers.items,
                                                index,
                                                { label },
                                            ),
                                        })
                                    }
                                />
                                <TextInput
                                    label="Price"
                                    value={tier.price}
                                    onChange={(price) =>
                                        setTiers({
                                            items: replaceAt(
                                                content.tiers.items,
                                                index,
                                                { price },
                                            ),
                                        })
                                    }
                                    placeholder="$49/week"
                                    size="sm"
                                />
                                <TextAreaInput
                                    label="Italic line above the price"
                                    value={tier.italicLine}
                                    onChange={(italicLine) =>
                                        setTiers({
                                            items: replaceAt(
                                                content.tiers.items,
                                                index,
                                                { italicLine },
                                            ),
                                        })
                                    }
                                    rows={2}
                                    hint="Leave empty to hide"
                                />
                                <TextAreaInput
                                    label="Summary under the price"
                                    value={tier.summary}
                                    onChange={(summary) =>
                                        setTiers({
                                            items: replaceAt(
                                                content.tiers.items,
                                                index,
                                                { summary },
                                            ),
                                        })
                                    }
                                    rows={2}
                                    hint="Leave empty to hide"
                                />
                                <TextInput
                                    label="Disclosure label"
                                    value={tier.disclosureLabel}
                                    onChange={(disclosureLabel) =>
                                        setTiers({
                                            items: replaceAt(
                                                content.tiers.items,
                                                index,
                                                { disclosureLabel },
                                            ),
                                        })
                                    }
                                    hint="The button that opens the detail on a phone"
                                />
                                <RichTextInput
                                    label="Detail behind the disclosure"
                                    value={tier.detail}
                                    onChange={(detail) =>
                                        setTiers({
                                            items: replaceAt(
                                                content.tiers.items,
                                                index,
                                                { detail },
                                            ),
                                        })
                                    }
                                    rows={7}
                                />
                                <SelectInput
                                    label="Card colour"
                                    value={tier.theme}
                                    onChange={(theme) =>
                                        setTiers({
                                            items: replaceAt(
                                                content.tiers.items,
                                                index,
                                                { theme },
                                            ),
                                        })
                                    }
                                    options={[
                                        { value: "light", label: "Cream" },
                                        { value: "forest", label: "Forest" },
                                    ]}
                                />
                                <CtaField
                                    label="Button"
                                    text={tier.ctaLabel}
                                    action={tier.ctaHref}
                                    onTextChange={(ctaLabel) =>
                                        setTiers({
                                            items: replaceAt(
                                                content.tiers.items,
                                                index,
                                                { ctaLabel },
                                            ),
                                        })
                                    }
                                    onActionChange={(ctaHref) =>
                                        setTiers({
                                            items: replaceAt(
                                                content.tiers.items,
                                                index,
                                                { ctaHref },
                                            ),
                                        })
                                    }
                                />
                            </ListItemCard>
                        ))}
                    </FieldGroup>
                </>
            )}

            {section === "privatePilates" && (
                <>
                    <FieldGroup title="Heading and copy">
                        <TextInput
                            label="Heading"
                            value={content.privatePilates.heading}
                            onChange={(heading) => setPrivate({ heading })}
                        />
                        <ParagraphListInput
                            label="Paragraphs"
                            values={content.privatePilates.body}
                            onChange={(body) => setPrivate({ body })}
                        />
                    </FieldGroup>
                    <PriceColumnsField
                        columns={content.privatePilates.columns}
                        onChange={(columns) => setPrivate({ columns })}
                        addLabel="Add column"
                    />
                    <FieldGroup title="Button">
                        <CtaField
                            label="Button"
                            text={content.privatePilates.ctaLabel}
                            action={content.privatePilates.ctaHref}
                            onTextChange={(ctaLabel) =>
                                setPrivate({ ctaLabel })
                            }
                            onActionChange={(ctaHref) =>
                                setPrivate({ ctaHref })
                            }
                        />
                    </FieldGroup>
                </>
            )}

            {section === "classPacks" && (
                <>
                    <FieldGroup title="Heading and copy">
                        <TextInput
                            label="Heading"
                            value={content.classPacks.heading}
                            onChange={(heading) => setPacks({ heading })}
                        />
                        <TextAreaInput
                            label="Body"
                            value={content.classPacks.body}
                            onChange={(body) => setPacks({ body })}
                            rows={3}
                        />
                    </FieldGroup>
                    <PriceColumnsField
                        columns={content.classPacks.columns}
                        onChange={(columns) => setPacks({ columns })}
                        addLabel="Add column"
                    />
                    <FieldGroup title="Button">
                        <CtaField
                            label="Button"
                            text={content.classPacks.ctaLabel}
                            action={content.classPacks.ctaHref}
                            onTextChange={(ctaLabel) => setPacks({ ctaLabel })}
                            onActionChange={(ctaHref) => setPacks({ ctaHref })}
                        />
                    </FieldGroup>
                </>
            )}

            {section === "casual" && (
                <>
                    <FieldGroup title="Heading and copy">
                        <TextInput
                            label="Heading"
                            value={content.casual.heading}
                            onChange={(heading) => setCasual({ heading })}
                        />
                        <TextAreaInput
                            label="Italic line"
                            value={content.casual.italicLine}
                            onChange={(italicLine) => setCasual({ italicLine })}
                            rows={2}
                        />
                        <ParagraphListInput
                            label="Price lines"
                            values={content.casual.rows}
                            onChange={(rows) => setCasual({ rows })}
                            addLabel="Add price line"
                            rows={1}
                        />
                        <TextAreaInput
                            label="Line under the prices"
                            value={content.casual.body}
                            onChange={(body) => setCasual({ body })}
                            rows={2}
                        />
                    </FieldGroup>
                    <FieldGroup title="Button">
                        <CtaField
                            label="Button"
                            text={content.casual.ctaLabel}
                            action={content.casual.ctaHref}
                            onTextChange={(ctaLabel) => setCasual({ ctaLabel })}
                            onActionChange={(ctaHref) => setCasual({ ctaHref })}
                        />
                    </FieldGroup>
                </>
            )}
        </EditorShell>
    );
}
