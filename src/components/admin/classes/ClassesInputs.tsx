"use client";

/* ************************************************************
                        NOTES
   The /classes editor.

   Class types are a list, so they can be added, renamed,
   reordered and removed. Which side of the grid each one lands
   on is worked out from its position when the page renders, so
   nothing here can leave the layout with a hole in it.
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
import { CLASSES_SLUG, type ClassesContent } from "@/app/classes/_config";

type SectionKey = "hero" | "cards" | "ctaCard";

const SECTIONS: { value: SectionKey; label: string }[] = [
    { value: "hero", label: "1. Hero" },
    { value: "cards", label: "2. Class types" },
    { value: "ctaCard", label: "3. Timetable card" },
];

export default function ClassesInputs({
    initialContent,
    initialTitle,
    initialDescription,
    initialMetaTitle,
    initialMetaDescription,
}: {
    initialContent: ClassesContent;
    initialTitle: string;
    initialDescription: string;
    initialMetaTitle: string;
    initialMetaDescription: string;
}) {
    const [section, setSection] = useState<SectionKey>("hero");
    const editor = usePageEditor<ClassesContent>({
        slug: CLASSES_SLUG,
        pageTitle: "Classes",
        initialContent,
        initialTitle,
        initialDescription,
        initialMetaTitle,
        initialMetaDescription,
    });

    const { content, patch } = editor;
    const setHero = patch("hero");
    const setCards = patch("cards");
    const setCtaCard = patch("ctaCard");
    const items = content.cards.items;

    return (
        <EditorShell
            pageTitle="Classes"
            urlPath="/classes"
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
                    usage="Classes hero"
                />
            )}

            {section === "cards" && (
                <>
                    <FieldGroup
                        title="The link under every card"
                        description="One label and one destination, shared by all of the cards."
                    >
                        <CtaField
                            label="Link"
                            text={content.cards.linkLabel}
                            action={content.cards.linkHref}
                            onTextChange={(linkLabel) => setCards({ linkLabel })}
                            onActionChange={(linkHref) => setCards({ linkHref })}
                        />
                    </FieldGroup>

                    <FieldGroup
                        title="Class types"
                        description="They alternate left and right down the page in this order."
                        toolbar={
                            <AddItemButton
                                onClick={() =>
                                    setCards({
                                        items: [
                                            ...items,
                                            {
                                                id: `class-${Date.now()}`,
                                                image: "",
                                                imageAlt: "",
                                                imageFocus: "center 45%",
                                                title: "",
                                                body: "",
                                            },
                                        ],
                                    })
                                }
                            >
                                Add class type
                            </AddItemButton>
                        }
                    >
                        {items.map((card, index) => (
                            <ListItemCard
                                key={card.id}
                                title={card.title || `Class ${index + 1}`}
                            >
                                <div className="flex justify-end">
                                    <ListControls
                                        index={index}
                                        length={items.length}
                                        onMove={(delta) =>
                                            setCards({
                                                items: moveItem(
                                                    items,
                                                    index,
                                                    delta,
                                                ),
                                            })
                                        }
                                        onRemove={() =>
                                            setCards({
                                                items: removeAt(items, index),
                                            })
                                        }
                                    />
                                </div>
                                <TextInput
                                    label="Class name"
                                    value={card.title}
                                    onChange={(title) =>
                                        setCards({
                                            items: replaceAt(items, index, {
                                                title,
                                            }),
                                        })
                                    }
                                />
                                <TextAreaInput
                                    label="Description"
                                    value={card.body}
                                    onChange={(body) =>
                                        setCards({
                                            items: replaceAt(items, index, {
                                                body,
                                            }),
                                        })
                                    }
                                    rows={4}
                                />
                                <PhotoFields
                                    label="Card photo"
                                    image={card.image}
                                    imageAlt={card.imageAlt}
                                    imageFocus={card.imageFocus}
                                    usage={`Class: ${card.title || index + 1}`}
                                    onImageChange={(image) =>
                                        setCards({
                                            items: replaceAt(items, index, {
                                                image,
                                            }),
                                        })
                                    }
                                    onAltChange={(imageAlt) =>
                                        setCards({
                                            items: replaceAt(items, index, {
                                                imageAlt,
                                            }),
                                        })
                                    }
                                    onFocusChange={(imageFocus) =>
                                        setCards({
                                            items: replaceAt(items, index, {
                                                imageFocus,
                                            }),
                                        })
                                    }
                                />
                            </ListItemCard>
                        ))}
                    </FieldGroup>
                </>
            )}

            {section === "ctaCard" && (
                <>
                    <FieldGroup
                        title="Photo"
                        description="The last card in the grid, which carries the two buttons."
                    >
                        <PhotoFields
                            label="Card photo"
                            image={content.ctaCard.image}
                            imageAlt={content.ctaCard.imageAlt}
                            imageFocus={content.ctaCard.imageFocus}
                            usage="Classes timetable card"
                            onImageChange={(image) => setCtaCard({ image })}
                            onAltChange={(imageAlt) => setCtaCard({ imageAlt })}
                            onFocusChange={(imageFocus) =>
                                setCtaCard({ imageFocus })
                            }
                        />
                    </FieldGroup>
                    <FieldGroup title="Buttons">
                        <CtaField
                            label="Primary button"
                            text={content.ctaCard.primaryCta.label}
                            action={content.ctaCard.primaryCta.href}
                            onTextChange={(label) =>
                                setCtaCard({
                                    primaryCta: {
                                        ...content.ctaCard.primaryCta,
                                        label,
                                    },
                                })
                            }
                            onActionChange={(href) =>
                                setCtaCard({
                                    primaryCta: {
                                        ...content.ctaCard.primaryCta,
                                        href,
                                    },
                                })
                            }
                        />
                        <CtaField
                            label="Secondary button"
                            text={content.ctaCard.secondaryCta.label}
                            action={content.ctaCard.secondaryCta.href}
                            onTextChange={(label) =>
                                setCtaCard({
                                    secondaryCta: {
                                        ...content.ctaCard.secondaryCta,
                                        label,
                                    },
                                })
                            }
                            onActionChange={(href) =>
                                setCtaCard({
                                    secondaryCta: {
                                        ...content.ctaCard.secondaryCta,
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
