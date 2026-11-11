"use client";

/* ************************************************************
                        NOTES
   The /about editor.
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
import { ABOUT_SLUG, type AboutContent } from "@/app/about/_config";

type SectionKey = "hero" | "strength" | "care" | "beliefs" | "closing";

const SECTIONS: { value: SectionKey; label: string }[] = [
    { value: "hero", label: "1. Hero" },
    { value: "strength", label: "2. A different strength" },
    { value: "care", label: "3. We genuinely care" },
    { value: "beliefs", label: "4. What we believe" },
    { value: "closing", label: "5. Closing band" },
];

export default function AboutInputs({
    initialContent,
    initialTitle,
    initialDescription,
    initialMetaTitle,
    initialMetaDescription,
}: {
    initialContent: AboutContent;
    initialTitle: string;
    initialDescription: string;
    initialMetaTitle: string;
    initialMetaDescription: string;
}) {
    const [section, setSection] = useState<SectionKey>("hero");
    const editor = usePageEditor<AboutContent>({
        slug: ABOUT_SLUG,
        pageTitle: "About",
        initialContent,
        initialTitle,
        initialDescription,
        initialMetaTitle,
        initialMetaDescription,
    });

    const { content, patch } = editor;
    const setStrength = patch("strength");
    const setCare = patch("care");
    const setBeliefs = patch("beliefs");
    const setClosing = patch("closing");

    return (
        <EditorShell
            pageTitle="About"
            urlPath="/about"
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
                    usage="About hero"
                />
            )}

            {section === "strength" && (
                <>
                    <FieldGroup title="Copy">
                        <TextAreaInput
                            label="Opening line, set large"
                            value={content.strength.lede}
                            onChange={(lede) => setStrength({ lede })}
                            rows={3}
                        />
                        <ParagraphListInput
                            label="Paragraphs"
                            values={content.strength.body}
                            onChange={(body) => setStrength({ body })}
                        />
                    </FieldGroup>
                    <FieldGroup title="Photo">
                        <PhotoFields
                            label="Section photo"
                            image={content.strength.image}
                            imageAlt={content.strength.imageAlt}
                            usage="About: strength"
                            onImageChange={(image) => setStrength({ image })}
                            onAltChange={(imageAlt) => setStrength({ imageAlt })}
                        />
                    </FieldGroup>
                </>
            )}

            {section === "care" && (
                <>
                    <FieldGroup title="Heading and copy">
                        <TextAreaInput
                            label="Heading"
                            value={content.care.heading}
                            onChange={(heading) => setCare({ heading })}
                            rows={2}
                        />
                        <ParagraphListInput
                            label="Paragraphs"
                            values={content.care.body}
                            onChange={(body) => setCare({ body })}
                        />
                    </FieldGroup>
                    <FieldGroup title="Photo">
                        <PhotoFields
                            label="Section photo"
                            image={content.care.image}
                            imageAlt={content.care.imageAlt}
                            usage="About: care"
                            onImageChange={(image) => setCare({ image })}
                            onAltChange={(imageAlt) => setCare({ imageAlt })}
                        />
                    </FieldGroup>
                </>
            )}

            {section === "beliefs" && (
                <FieldGroup
                    title="What we believe"
                    description="They sit in one row across the page."
                    toolbar={
                        <AddItemButton
                            onClick={() =>
                                setBeliefs({
                                    items: [
                                        ...content.beliefs.items,
                                        {
                                            id: `belief-${Date.now()}`,
                                            title: "",
                                            body: "",
                                        },
                                    ],
                                })
                            }
                        >
                            Add belief
                        </AddItemButton>
                    }
                >
                    <TextInput
                        label="Section heading"
                        value={content.beliefs.heading}
                        onChange={(heading) => setBeliefs({ heading })}
                    />
                    {content.beliefs.items.map((belief, index) => (
                        <ListItemCard
                            key={belief.id}
                            title={belief.title || `Belief ${index + 1}`}
                        >
                            <div className="flex justify-end">
                                <ListControls
                                    index={index}
                                    length={content.beliefs.items.length}
                                    onMove={(delta) =>
                                        setBeliefs({
                                            items: moveItem(
                                                content.beliefs.items,
                                                index,
                                                delta,
                                            ),
                                        })
                                    }
                                    onRemove={() =>
                                        setBeliefs({
                                            items: removeAt(
                                                content.beliefs.items,
                                                index,
                                            ),
                                        })
                                    }
                                />
                            </div>
                            <TextInput
                                label="Title"
                                value={belief.title}
                                onChange={(title) =>
                                    setBeliefs({
                                        items: replaceAt(
                                            content.beliefs.items,
                                            index,
                                            { title },
                                        ),
                                    })
                                }
                            />
                            <TextAreaInput
                                label="Body"
                                value={belief.body}
                                onChange={(body) =>
                                    setBeliefs({
                                        items: replaceAt(
                                            content.beliefs.items,
                                            index,
                                            { body },
                                        ),
                                    })
                                }
                                rows={2}
                            />
                        </ListItemCard>
                    ))}
                </FieldGroup>
            )}

            {section === "closing" && (
                <>
                    <FieldGroup title="Heading and copy">
                        <TextAreaInput
                            label="Heading"
                            value={content.closing.heading}
                            onChange={(heading) => setClosing({ heading })}
                            rows={2}
                        />
                        <ParagraphListInput
                            label="Paragraphs"
                            values={content.closing.body}
                            onChange={(body) => setClosing({ body })}
                        />
                    </FieldGroup>
                    <FieldGroup title="Buttons">
                        <CtaField
                            label="Primary button"
                            text={content.closing.primaryCta.label}
                            action={content.closing.primaryCta.href}
                            onTextChange={(label) =>
                                setClosing({
                                    primaryCta: {
                                        ...content.closing.primaryCta,
                                        label,
                                    },
                                })
                            }
                            onActionChange={(href) =>
                                setClosing({
                                    primaryCta: {
                                        ...content.closing.primaryCta,
                                        href,
                                    },
                                })
                            }
                        />
                        <CtaField
                            label="Secondary button"
                            text={content.closing.secondaryCta.label}
                            action={content.closing.secondaryCta.href}
                            onTextChange={(label) =>
                                setClosing({
                                    secondaryCta: {
                                        ...content.closing.secondaryCta,
                                        label,
                                    },
                                })
                            }
                            onActionChange={(href) =>
                                setClosing({
                                    secondaryCta: {
                                        ...content.closing.secondaryCta,
                                        href,
                                    },
                                })
                            }
                        />
                    </FieldGroup>
                </>
            )}
        </EditorShell>
    );
}
