"use client";

/* ************************************************************
                        NOTES
   The /contact editor.

   Addresses, phone numbers, parking notes and opening times all
   change, so each studio's practical info is an editable list of
   labelled blocks rather than four fixed fields.
************************************************************ */

import { useState } from "react";
import {
    AddItemButton,
    CtaField,
    FieldGroup,
    ListItemCard,
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
import {
    PhotoFields,
    PhotoHeroFields,
} from "@/components/admin/_shared/HeroFields";
import { usePageEditor } from "@/components/admin/_shared/usePageEditor";
import {
    CONTACT_SLUG,
    type ContactContent,
    type StudioCard,
} from "@/app/contact/_config";

type SectionKey = "hero" | "studios" | "form";

const SECTIONS: { value: SectionKey; label: string }[] = [
    { value: "hero", label: "1. Hero" },
    { value: "studios", label: "2. Studio cards" },
    { value: "form", label: "3. Enquiry form" },
];

function StudioFields({
    studio,
    onChange,
}: {
    studio: StudioCard;
    onChange: (patch: Partial<StudioCard>) => void;
}) {
    const blocks = studio.blocks;

    return (
        <>
            <TextInput
                label="Studio name"
                value={studio.name}
                onChange={(name) => onChange({ name })}
            />
            <TextAreaInput
                label="Address"
                value={studio.address}
                onChange={(address) => onChange({ address })}
                rows={2}
            />
            <TextAreaInput
                label="Line under the address"
                value={studio.intro}
                onChange={(intro) => onChange({ intro })}
                rows={2}
            />
            <TextInput
                label="Google Maps link"
                value={studio.mapHref}
                onChange={(mapHref) => onChange({ mapHref })}
                hint="Used by the map panel and its directions button"
            />
            <PhotoFields
                label="Studio photo"
                image={studio.image}
                imageAlt={studio.imageAlt}
                imageFocus={studio.imageFocus}
                usage={`Contact: ${studio.name}`}
                onImageChange={(image) => onChange({ image })}
                onAltChange={(imageAlt) => onChange({ imageAlt })}
                onFocusChange={(imageFocus) => onChange({ imageFocus })}
            />

            <FieldGroup
                title="Practical info"
                description="One block per heading. Each can carry copy, a button, or both."
                tone="tinted"
                toolbar={
                    <AddItemButton
                        onClick={() =>
                            onChange({
                                blocks: [
                                    ...blocks,
                                    {
                                        id: `block-${Date.now()}`,
                                        label: "",
                                        body: "",
                                        ctaLabel: "",
                                        ctaHref: "",
                                        ctaTheme: "outline",
                                    },
                                ],
                            })
                        }
                    >
                        Add block
                    </AddItemButton>
                }
            >
                {blocks.map((block, index) => (
                    <ListItemCard
                        key={block.id}
                        title={block.label || `Block ${index + 1}`}
                    >
                        <div className="flex justify-end">
                            <ListControls
                                index={index}
                                length={blocks.length}
                                onMove={(delta) =>
                                    onChange({
                                        blocks: moveItem(blocks, index, delta),
                                    })
                                }
                                onRemove={() =>
                                    onChange({
                                        blocks: removeAt(blocks, index),
                                    })
                                }
                            />
                        </div>
                        <TextInput
                            label="Heading"
                            value={block.label}
                            onChange={(label) =>
                                onChange({
                                    blocks: replaceAt(blocks, index, { label }),
                                })
                            }
                        />
                        <RichTextInput
                            label="Copy"
                            value={block.body}
                            onChange={(body) =>
                                onChange({
                                    blocks: replaceAt(blocks, index, { body }),
                                })
                            }
                            rows={4}
                            hint="Leave empty for a button-only block"
                        />
                        <CtaField
                            label="Button"
                            text={block.ctaLabel}
                            action={block.ctaHref}
                            onTextChange={(ctaLabel) =>
                                onChange({
                                    blocks: replaceAt(blocks, index, {
                                        ctaLabel,
                                    }),
                                })
                            }
                            onActionChange={(ctaHref) =>
                                onChange({
                                    blocks: replaceAt(blocks, index, {
                                        ctaHref,
                                    }),
                                })
                            }
                            textPlaceholder="Leave empty to hide the button"
                        />
                        <SelectInput
                            label="Button style"
                            value={block.ctaTheme}
                            onChange={(ctaTheme) =>
                                onChange({
                                    blocks: replaceAt(blocks, index, {
                                        ctaTheme,
                                    }),
                                })
                            }
                            options={[
                                { value: "outline", label: "Outlined" },
                                { value: "solid", label: "Filled" },
                            ]}
                        />
                    </ListItemCard>
                ))}
            </FieldGroup>
        </>
    );
}

export default function ContactInputs({
    initialContent,
    initialTitle,
    initialDescription,
    initialMetaTitle,
    initialMetaDescription,
}: {
    initialContent: ContactContent;
    initialTitle: string;
    initialDescription: string;
    initialMetaTitle: string;
    initialMetaDescription: string;
}) {
    const [section, setSection] = useState<SectionKey>("hero");
    const editor = usePageEditor<ContactContent>({
        slug: CONTACT_SLUG,
        pageTitle: "Contact",
        initialContent,
        initialTitle,
        initialDescription,
        initialMetaTitle,
        initialMetaDescription,
    });

    const { content, patch, setField } = editor;
    const setHero = patch("hero");
    const setForm = patch("form");
    const studios = content.studios;

    return (
        <EditorShell
            pageTitle="Contact"
            urlPath="/contact"
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
                    usage="Contact hero"
                />
            )}

            {section === "studios" &&
                studios.map((studio, index) => (
                    <FieldGroup
                        key={studio.id}
                        title={studio.name || `Studio ${index + 1}`}
                        description={
                            index === 0
                                ? "Shown on the left."
                                : "Shown on the right."
                        }
                    >
                        <StudioFields
                            studio={studio}
                            onChange={(studioPatch) =>
                                setField(
                                    "studios",
                                    replaceAt(studios, index, studioPatch),
                                )
                            }
                        />
                    </FieldGroup>
                ))}

            {section === "form" && (
                <>
                    <FieldGroup
                        title="Enquiry form"
                        description="The labels people see. The form itself is unchanged."
                    >
                        <TextInput
                            label="Heading"
                            value={content.form.heading}
                            onChange={(heading) => setForm({ heading })}
                        />
                        <TextInput
                            label="Name field label"
                            value={content.form.nameLabel}
                            onChange={(nameLabel) => setForm({ nameLabel })}
                        />
                        <TextInput
                            label="Email field label"
                            value={content.form.emailLabel}
                            onChange={(emailLabel) => setForm({ emailLabel })}
                        />
                        <TextInput
                            label="Message field label"
                            value={content.form.messageLabel}
                            onChange={(messageLabel) =>
                                setForm({ messageLabel })
                            }
                        />
                        <TextInput
                            label="Button label"
                            value={content.form.submitLabel}
                            onChange={(submitLabel) => setForm({ submitLabel })}
                        />
                    </FieldGroup>
                    <FieldGroup
                        title="Where enquiries go"
                        description="This is still a placeholder. Until a real address is set here, the form does not send anywhere."
                    >
                        <TextInput
                            label="Form destination"
                            value={content.form.action}
                            onChange={(action) => setForm({ action })}
                            placeholder="#"
                        />
                    </FieldGroup>
                </>
            )}
        </EditorShell>
    );
}
