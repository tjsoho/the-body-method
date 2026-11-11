"use client";

/* ************************************************************
                        NOTES
   The /life-at-tbm editor.

   This is the page that turns over most, so events, workshops,
   member stories and partners are all lists that can be added
   to and cleared out.
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
    LIFE_AT_TBM_SLUG,
    type EventCard,
    type LifeAtTbmContent,
} from "@/app/life-at-tbm/_config";

type SectionKey =
    | "hero"
    | "lede"
    | "happening"
    | "community"
    | "workshops"
    | "partners";

const SECTIONS: { value: SectionKey; label: string }[] = [
    { value: "hero", label: "1. Hero" },
    { value: "lede", label: "2. Intro line" },
    { value: "happening", label: "3. What's happening" },
    { value: "community", label: "4. Our community" },
    { value: "workshops", label: "5. Workshops" },
    { value: "partners", label: "6. Friends of TBM" },
];

/** Shared by the events list and the workshops list. */
function EventCardsField({
    title,
    description,
    cards,
    onChange,
    usagePrefix,
}: {
    title: string;
    description: string;
    cards: EventCard[];
    onChange: (next: EventCard[]) => void;
    usagePrefix: string;
}) {
    return (
        <FieldGroup
            title={title}
            description={description}
            toolbar={
                <AddItemButton
                    onClick={() =>
                        onChange([
                            ...cards,
                            {
                                id: `card-${Date.now()}`,
                                meta: "",
                                title: "",
                                body: "",
                                linkLabel: "",
                                linkHref: "",
                                image: "",
                                imageAlt: "",
                            },
                        ])
                    }
                >
                    Add card
                </AddItemButton>
            }
        >
            {cards.map((card, index) => (
                <ListItemCard
                    key={card.id}
                    title={card.title || `Card ${index + 1}`}
                >
                    <div className="flex justify-end">
                        <ListControls
                            index={index}
                            length={cards.length}
                            onMove={(delta) =>
                                onChange(moveItem(cards, index, delta))
                            }
                            onRemove={() => onChange(removeAt(cards, index))}
                            minimum={0}
                        />
                    </div>
                    <TextInput
                        label="Date and place line"
                        value={card.meta}
                        onChange={(meta) =>
                            onChange(replaceAt(cards, index, { meta }))
                        }
                        hint="Printed small in bronze above the title"
                    />
                    <TextInput
                        label="Title"
                        value={card.title}
                        onChange={(title) =>
                            onChange(replaceAt(cards, index, { title }))
                        }
                    />
                    <TextAreaInput
                        label="Description"
                        value={card.body}
                        onChange={(body) =>
                            onChange(replaceAt(cards, index, { body }))
                        }
                        rows={4}
                    />
                    <CtaField
                        label="Link under the card"
                        text={card.linkLabel}
                        action={card.linkHref}
                        onTextChange={(linkLabel) =>
                            onChange(replaceAt(cards, index, { linkLabel }))
                        }
                        onActionChange={(linkHref) =>
                            onChange(replaceAt(cards, index, { linkHref }))
                        }
                        textPlaceholder="Leave empty to hide the link"
                    />
                    <PhotoFields
                        label="Photo"
                        image={card.image}
                        imageAlt={card.imageAlt}
                        usage={`${usagePrefix} ${index + 1}`}
                        onImageChange={(image) =>
                            onChange(replaceAt(cards, index, { image }))
                        }
                        onAltChange={(imageAlt) =>
                            onChange(replaceAt(cards, index, { imageAlt }))
                        }
                    />
                </ListItemCard>
            ))}
        </FieldGroup>
    );
}

export default function LifeAtTbmInputs({
    initialContent,
    initialTitle,
    initialDescription,
    initialMetaTitle,
    initialMetaDescription,
}: {
    initialContent: LifeAtTbmContent;
    initialTitle: string;
    initialDescription: string;
    initialMetaTitle: string;
    initialMetaDescription: string;
}) {
    const [section, setSection] = useState<SectionKey>("hero");
    const editor = usePageEditor<LifeAtTbmContent>({
        slug: LIFE_AT_TBM_SLUG,
        pageTitle: "Life at TBM",
        initialContent,
        initialTitle,
        initialDescription,
        initialMetaTitle,
        initialMetaDescription,
    });

    const { content, patch } = editor;
    const setHappening = patch("happening");
    const setCommunity = patch("community");
    const setWorkshops = patch("workshops");
    const setPartners = patch("partners");

    return (
        <EditorShell
            pageTitle="Life at TBM"
            urlPath="/life-at-tbm"
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
                    usage="Life at TBM hero"
                />
            )}

            {section === "lede" && (
                <FieldGroup
                    title="Intro line"
                    description="The centred line under the hero."
                >
                    <TextAreaInput
                        label="Copy"
                        value={content.lede.body}
                        onChange={(body) => patch("lede")({ body })}
                        rows={5}
                    />
                </FieldGroup>
            )}

            {section === "happening" && (
                <>
                    <FieldGroup title="Section header">
                        <TextInput
                            label="Heading"
                            value={content.happening.label}
                            onChange={(label) => setHappening({ label })}
                        />
                        <TextAreaInput
                            label="Italic line"
                            value={content.happening.heading}
                            onChange={(heading) => setHappening({ heading })}
                            rows={2}
                        />
                        <TextAreaInput
                            label="Body"
                            value={content.happening.body}
                            onChange={(body) => setHappening({ body })}
                            rows={3}
                        />
                    </FieldGroup>
                    <EventCardsField
                        title="Events"
                        description="They alternate left and right down the page."
                        cards={content.happening.cards}
                        onChange={(cards) => setHappening({ cards })}
                        usagePrefix="Life at TBM event"
                    />
                </>
            )}

            {section === "community" && (
                <>
                    <FieldGroup title="Section header">
                        <TextInput
                            label="Heading"
                            value={content.community.label}
                            onChange={(label) => setCommunity({ label })}
                        />
                        <TextAreaInput
                            label="Italic line"
                            value={content.community.heading}
                            onChange={(heading) => setCommunity({ heading })}
                            rows={2}
                        />
                        <TextAreaInput
                            label="Body"
                            value={content.community.body}
                            onChange={(body) => setCommunity({ body })}
                            rows={3}
                        />
                    </FieldGroup>
                    <FieldGroup
                        title="Member stories"
                        description="This page keeps its own stories. The home page has a separate set."
                        toolbar={
                            <AddItemButton
                                onClick={() =>
                                    setCommunity({
                                        stories: [
                                            ...content.community.stories,
                                            {
                                                id: `story-${Date.now()}`,
                                                quote: "",
                                                name: "",
                                                memberSince: "",
                                                favouriteClassTeacher: "",
                                                image: "",
                                                imageAlt: "",
                                            },
                                        ],
                                    })
                                }
                            >
                                Add story
                            </AddItemButton>
                        }
                    >
                        <TextInput
                            label="Label above every quote"
                            value={content.community.cardLabel}
                            onChange={(cardLabel) =>
                                setCommunity({ cardLabel })
                            }
                        />
                        <TextInput
                            label="Words before the year"
                            value={content.community.memberSinceLabel}
                            onChange={(memberSinceLabel) =>
                                setCommunity({ memberSinceLabel })
                            }
                            size="sm"
                        />
                        {content.community.stories.map((story, index) => (
                            <ListItemCard
                                key={story.id}
                                title={story.name || `Story ${index + 1}`}
                            >
                                <div className="flex justify-end">
                                    <ListControls
                                        index={index}
                                        length={content.community.stories.length}
                                        onMove={(delta) =>
                                            setCommunity({
                                                stories: moveItem(
                                                    content.community.stories,
                                                    index,
                                                    delta,
                                                ),
                                            })
                                        }
                                        onRemove={() =>
                                            setCommunity({
                                                stories: removeAt(
                                                    content.community.stories,
                                                    index,
                                                ),
                                            })
                                        }
                                    />
                                </div>
                                <TextAreaInput
                                    label="Quote"
                                    value={story.quote}
                                    onChange={(quote) =>
                                        setCommunity({
                                            stories: replaceAt(
                                                content.community.stories,
                                                index,
                                                { quote },
                                            ),
                                        })
                                    }
                                    rows={3}
                                />
                                <TextInput
                                    label="Member name"
                                    value={story.name}
                                    onChange={(name) =>
                                        setCommunity({
                                            stories: replaceAt(
                                                content.community.stories,
                                                index,
                                                { name },
                                            ),
                                        })
                                    }
                                />
                                <TextInput
                                    label="Member since"
                                    value={story.memberSince}
                                    onChange={(memberSince) =>
                                        setCommunity({
                                            stories: replaceAt(
                                                content.community.stories,
                                                index,
                                                { memberSince },
                                            ),
                                        })
                                    }
                                    size="sm"
                                />
                                <TextInput
                                    label="Favourite class or teacher"
                                    value={story.favouriteClassTeacher}
                                    onChange={(favouriteClassTeacher) =>
                                        setCommunity({
                                            stories: replaceAt(
                                                content.community.stories,
                                                index,
                                                { favouriteClassTeacher },
                                            ),
                                        })
                                    }
                                />
                                <PhotoFields
                                    label="Photo"
                                    image={story.image}
                                    imageAlt={story.imageAlt}
                                    usage={`Life at TBM story ${index + 1}`}
                                    onImageChange={(image) =>
                                        setCommunity({
                                            stories: replaceAt(
                                                content.community.stories,
                                                index,
                                                { image },
                                            ),
                                        })
                                    }
                                    onAltChange={(imageAlt) =>
                                        setCommunity({
                                            stories: replaceAt(
                                                content.community.stories,
                                                index,
                                                { imageAlt },
                                            ),
                                        })
                                    }
                                />
                            </ListItemCard>
                        ))}
                    </FieldGroup>
                </>
            )}

            {section === "workshops" && (
                <>
                    <FieldGroup title="Section header">
                        <TextInput
                            label="Heading"
                            value={content.workshops.label}
                            onChange={(label) => setWorkshops({ label })}
                        />
                        <TextAreaInput
                            label="Italic line"
                            value={content.workshops.heading}
                            onChange={(heading) => setWorkshops({ heading })}
                            rows={2}
                        />
                        <TextAreaInput
                            label="Body"
                            value={content.workshops.body}
                            onChange={(body) => setWorkshops({ body })}
                            rows={3}
                        />
                    </FieldGroup>
                    <EventCardsField
                        title="Workshops"
                        description="They alternate left and right down the page."
                        cards={content.workshops.cards}
                        onChange={(cards) => setWorkshops({ cards })}
                        usagePrefix="Life at TBM workshop"
                    />
                    <FieldGroup title="Button">
                        <CtaField
                            label="Button"
                            text={content.workshops.cta.label}
                            action={content.workshops.cta.href}
                            onTextChange={(label) =>
                                setWorkshops({
                                    cta: { ...content.workshops.cta, label },
                                })
                            }
                            onActionChange={(href) =>
                                setWorkshops({
                                    cta: { ...content.workshops.cta, href },
                                })
                            }
                        />
                    </FieldGroup>
                </>
            )}

            {section === "partners" && (
                <>
                    <FieldGroup title="Section header">
                        <TextInput
                            label="Heading"
                            value={content.partners.label}
                            onChange={(label) => setPartners({ label })}
                        />
                        <TextAreaInput
                            label="Italic line"
                            value={content.partners.heading}
                            onChange={(heading) => setPartners({ heading })}
                            rows={2}
                        />
                        <ParagraphListInput
                            label="Paragraphs"
                            values={content.partners.body}
                            onChange={(body) => setPartners({ body })}
                        />
                    </FieldGroup>
                    <FieldGroup
                        title="Partners"
                        description="Logos are flattened to white, so any colour or format works."
                        toolbar={
                            <AddItemButton
                                onClick={() =>
                                    setPartners({
                                        items: [
                                            ...content.partners.items,
                                            {
                                                id: `partner-${Date.now()}`,
                                                name: "",
                                                href: "",
                                                logo: "",
                                            },
                                        ],
                                    })
                                }
                            >
                                Add partner
                            </AddItemButton>
                        }
                    >
                        {content.partners.items.map((partner, index) => (
                            <ListItemCard
                                key={partner.id}
                                title={partner.name || `Partner ${index + 1}`}
                            >
                                <div className="flex justify-end">
                                    <ListControls
                                        index={index}
                                        length={content.partners.items.length}
                                        onMove={(delta) =>
                                            setPartners({
                                                items: moveItem(
                                                    content.partners.items,
                                                    index,
                                                    delta,
                                                ),
                                            })
                                        }
                                        onRemove={() =>
                                            setPartners({
                                                items: removeAt(
                                                    content.partners.items,
                                                    index,
                                                ),
                                            })
                                        }
                                    />
                                </div>
                                <TextInput
                                    label="Name"
                                    value={partner.name}
                                    onChange={(name) =>
                                        setPartners({
                                            items: replaceAt(
                                                content.partners.items,
                                                index,
                                                { name },
                                            ),
                                        })
                                    }
                                />
                                <TextInput
                                    label="Website"
                                    value={partner.href}
                                    onChange={(href) =>
                                        setPartners({
                                            items: replaceAt(
                                                content.partners.items,
                                                index,
                                                { href },
                                            ),
                                        })
                                    }
                                    placeholder="https://"
                                />
                                <PhotoFields
                                    label="Logo"
                                    image={partner.logo}
                                    imageAlt={partner.name}
                                    usage={`Partner ${partner.name || index + 1}`}
                                    onImageChange={(logo) =>
                                        setPartners({
                                            items: replaceAt(
                                                content.partners.items,
                                                index,
                                                { logo },
                                            ),
                                        })
                                    }
                                    onAltChange={(name) =>
                                        setPartners({
                                            items: replaceAt(
                                                content.partners.items,
                                                index,
                                                { name },
                                            ),
                                        })
                                    }
                                />
                            </ListItemCard>
                        ))}
                    </FieldGroup>
                </>
            )}
        </EditorShell>
    );
}
