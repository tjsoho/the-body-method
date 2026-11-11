"use client";

/* ************************************************************
                        NOTES
   The /studios/cornerstone editor.
************************************************************ */

import { useState } from "react";
import {
    AddItemButton,
    CtaField,
    FaqGroupsInput,
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
    CORNERSTONE_SLUG,
    type CornerstoneContent,
} from "@/app/studios/cornerstone/_config";

type SectionKey =
    | "hero"
    | "intro"
    | "moveDifferently"
    | "community"
    | "grid"
    | "faq";

const SECTIONS: { value: SectionKey; label: string }[] = [
    { value: "hero", label: "1. Hero" },
    { value: "intro", label: "2. Intro and practices" },
    { value: "moveDifferently", label: "3. Move differently" },
    { value: "community", label: "4. Community" },
    { value: "grid", label: "5. Cards and location" },
    { value: "faq", label: "6. FAQ" },
];

export default function CornerstoneInputs({
    initialContent,
    initialTitle,
    initialDescription,
    initialMetaTitle,
    initialMetaDescription,
}: {
    initialContent: CornerstoneContent;
    initialTitle: string;
    initialDescription: string;
    initialMetaTitle: string;
    initialMetaDescription: string;
}) {
    const [section, setSection] = useState<SectionKey>("hero");
    const editor = usePageEditor<CornerstoneContent>({
        slug: CORNERSTONE_SLUG,
        pageTitle: "Cornerstone",
        initialContent,
        initialTitle,
        initialDescription,
        initialMetaTitle,
        initialMetaDescription,
    });

    const { content, patch } = editor;
    const setIntro = patch("intro");
    const setMove = patch("moveDifferently");
    const setCommunity = patch("community");
    const setGrid = patch("grid");
    const setFaq = patch("faq");
    const { grid } = content;

    return (
        <EditorShell
            pageTitle="Cornerstone"
            urlPath="/studios/cornerstone"
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
                    usage="Cornerstone hero"
                />
            )}

            {section === "intro" && (
                <>
                    <FieldGroup title="Copy">
                        <TextAreaInput
                            label="Opening line"
                            value={content.intro.lede}
                            onChange={(lede) => setIntro({ lede })}
                            rows={3}
                        />
                        <ParagraphListInput
                            label="Practices"
                            values={content.intro.modalities}
                            onChange={(modalities) => setIntro({ modalities })}
                            addLabel="Add practice"
                            rows={1}
                        />
                        <TextAreaInput
                            label="Closing line, italic"
                            value={content.intro.closer}
                            onChange={(closer) => setIntro({ closer })}
                            rows={2}
                        />
                    </FieldGroup>
                    <FieldGroup title="Photo">
                        <PhotoFields
                            label="Section photo"
                            image={content.intro.image}
                            imageAlt={content.intro.imageAlt}
                            usage="Cornerstone: intro"
                            onImageChange={(image) => setIntro({ image })}
                            onAltChange={(imageAlt) => setIntro({ imageAlt })}
                        />
                    </FieldGroup>
                </>
            )}

            {section === "moveDifferently" && (
                <>
                    <FieldGroup title="Heading and copy">
                        <TextAreaInput
                            label="Heading"
                            value={content.moveDifferently.heading}
                            onChange={(heading) => setMove({ heading })}
                            rows={2}
                        />
                        <ParagraphListInput
                            label="Lines"
                            values={content.moveDifferently.body}
                            onChange={(body) => setMove({ body })}
                            addLabel="Add line"
                            rows={2}
                        />
                        <TextAreaInput
                            label="Closing line, italic"
                            value={content.moveDifferently.closer}
                            onChange={(closer) => setMove({ closer })}
                            rows={3}
                        />
                        <CtaField
                            label="Button"
                            text={content.moveDifferently.cta.label}
                            action={content.moveDifferently.cta.href}
                            onTextChange={(label) =>
                                setMove({
                                    cta: {
                                        ...content.moveDifferently.cta,
                                        label,
                                    },
                                })
                            }
                            onActionChange={(href) =>
                                setMove({
                                    cta: {
                                        ...content.moveDifferently.cta,
                                        href,
                                    },
                                })
                            }
                        />
                    </FieldGroup>
                    <FieldGroup
                        title="Class tiles"
                        description="Three photographs across the page."
                        toolbar={
                            <AddItemButton
                                onClick={() =>
                                    setMove({
                                        cards: [
                                            ...content.moveDifferently.cards,
                                            {
                                                id: `card-${Date.now()}`,
                                                image: "",
                                                imageAlt: "",
                                            },
                                        ],
                                    })
                                }
                            >
                                Add tile
                            </AddItemButton>
                        }
                    >
                        {content.moveDifferently.cards.map((card, index) => (
                            <ListItemCard key={card.id} title={`Tile ${index + 1}`}>
                                <div className="flex justify-end">
                                    <ListControls
                                        index={index}
                                        length={
                                            content.moveDifferently.cards.length
                                        }
                                        onMove={(delta) =>
                                            setMove({
                                                cards: moveItem(
                                                    content.moveDifferently
                                                        .cards,
                                                    index,
                                                    delta,
                                                ),
                                            })
                                        }
                                        onRemove={() =>
                                            setMove({
                                                cards: removeAt(
                                                    content.moveDifferently
                                                        .cards,
                                                    index,
                                                ),
                                            })
                                        }
                                    />
                                </div>
                                <PhotoFields
                                    label="Photo"
                                    image={card.image}
                                    imageAlt={card.imageAlt}
                                    usage={`Cornerstone tile ${index + 1}`}
                                    onImageChange={(image) =>
                                        setMove({
                                            cards: replaceAt(
                                                content.moveDifferently.cards,
                                                index,
                                                { image },
                                            ),
                                        })
                                    }
                                    onAltChange={(imageAlt) =>
                                        setMove({
                                            cards: replaceAt(
                                                content.moveDifferently.cards,
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

            {section === "community" && (
                <>
                    <FieldGroup title="Heading and copy">
                        <TextAreaInput
                            label="Heading"
                            value={content.community.heading}
                            onChange={(heading) => setCommunity({ heading })}
                            rows={2}
                        />
                        <ParagraphListInput
                            label="Paragraphs"
                            values={content.community.body}
                            onChange={(body) => setCommunity({ body })}
                        />
                        <CtaField
                            label="Link"
                            text={content.community.link.label}
                            action={content.community.link.href}
                            onTextChange={(label) =>
                                setCommunity({
                                    link: { ...content.community.link, label },
                                })
                            }
                            onActionChange={(href) =>
                                setCommunity({
                                    link: { ...content.community.link, href },
                                })
                            }
                        />
                    </FieldGroup>
                    <FieldGroup title="Photo">
                        <PhotoFields
                            label="Section photo"
                            image={content.community.image}
                            imageAlt={content.community.imageAlt}
                            imageFocus={content.community.imageFocus}
                            usage="Cornerstone: community"
                            onImageChange={(image) => setCommunity({ image })}
                            onAltChange={(imageAlt) =>
                                setCommunity({ imageAlt })
                            }
                            onFocusChange={(imageFocus) =>
                                setCommunity({ imageFocus })
                            }
                        />
                    </FieldGroup>
                </>
            )}

            {section === "grid" && (
                <>
                    <FieldGroup title="Teacher card">
                        <TextInput
                            label="Name"
                            value={grid.teacher.name}
                            onChange={(name) =>
                                setGrid({
                                    teacher: { ...grid.teacher, name },
                                })
                            }
                        />
                        <TextInput
                            label="Name links to"
                            value={grid.teacher.href}
                            onChange={(href) =>
                                setGrid({
                                    teacher: { ...grid.teacher, href },
                                })
                            }
                        />
                        <TextInput
                            label="Discipline"
                            value={grid.teacher.role}
                            onChange={(role) =>
                                setGrid({
                                    teacher: { ...grid.teacher, role },
                                })
                            }
                        />
                        <TextInput
                            label="Class and time"
                            value={grid.teacher.time}
                            onChange={(time) =>
                                setGrid({
                                    teacher: { ...grid.teacher, time },
                                })
                            }
                        />
                        <PhotoFields
                            label="Photo"
                            image={grid.teacher.image}
                            imageAlt={grid.teacher.imageAlt}
                            usage="Cornerstone: teacher card"
                            onImageChange={(image) =>
                                setGrid({
                                    teacher: { ...grid.teacher, image },
                                })
                            }
                            onAltChange={(imageAlt) =>
                                setGrid({
                                    teacher: { ...grid.teacher, imageAlt },
                                })
                            }
                        />
                    </FieldGroup>

                    <FieldGroup title="Member story card">
                        <TextInput
                            label="Label above the quote"
                            value={grid.story.label}
                            onChange={(label) =>
                                setGrid({ story: { ...grid.story, label } })
                            }
                        />
                        <TextAreaInput
                            label="Quote"
                            value={grid.story.quote}
                            onChange={(quote) =>
                                setGrid({ story: { ...grid.story, quote } })
                            }
                            rows={3}
                        />
                        <TextInput
                            label="Caption"
                            value={grid.story.caption}
                            onChange={(caption) =>
                                setGrid({ story: { ...grid.story, caption } })
                            }
                        />
                        <PhotoFields
                            label="Photo"
                            image={grid.story.image}
                            imageAlt={grid.story.imageAlt}
                            usage="Cornerstone: member story"
                            onImageChange={(image) =>
                                setGrid({ story: { ...grid.story, image } })
                            }
                            onAltChange={(imageAlt) =>
                                setGrid({ story: { ...grid.story, imageAlt } })
                            }
                        />
                    </FieldGroup>

                    <FieldGroup title="Timetable card">
                        <TextAreaInput
                            label="Copy"
                            value={grid.timetable.body}
                            onChange={(body) =>
                                setGrid({
                                    timetable: { ...grid.timetable, body },
                                })
                            }
                            rows={3}
                        />
                        <CtaField
                            label="Button"
                            text={grid.timetable.cta.label}
                            action={grid.timetable.cta.href}
                            onTextChange={(label) =>
                                setGrid({
                                    timetable: {
                                        ...grid.timetable,
                                        cta: { ...grid.timetable.cta, label },
                                    },
                                })
                            }
                            onActionChange={(href) =>
                                setGrid({
                                    timetable: {
                                        ...grid.timetable,
                                        cta: { ...grid.timetable.cta, href },
                                    },
                                })
                            }
                        />
                        <PhotoFields
                            label="Photo"
                            image={grid.timetable.image}
                            imageAlt={grid.timetable.imageAlt}
                            usage="Cornerstone: timetable card"
                            onImageChange={(image) =>
                                setGrid({
                                    timetable: { ...grid.timetable, image },
                                })
                            }
                            onAltChange={(imageAlt) =>
                                setGrid({
                                    timetable: { ...grid.timetable, imageAlt },
                                })
                            }
                        />
                    </FieldGroup>

                    <FieldGroup
                        title="Location card"
                        description="The map is still a placeholder panel until a real embed is added."
                    >
                        <TextAreaInput
                            label="Address"
                            value={grid.location.address}
                            onChange={(address) =>
                                setGrid({
                                    location: { ...grid.location, address },
                                })
                            }
                            rows={2}
                        />
                        <TextInput
                            label="Map description for screen readers"
                            value={grid.location.mapLabel}
                            onChange={(mapLabel) =>
                                setGrid({
                                    location: { ...grid.location, mapLabel },
                                })
                            }
                        />
                        <CtaField
                            label="Directions button"
                            text={grid.location.cta.label}
                            action={grid.location.cta.href}
                            onTextChange={(label) =>
                                setGrid({
                                    location: {
                                        ...grid.location,
                                        cta: { ...grid.location.cta, label },
                                    },
                                })
                            }
                            onActionChange={(href) =>
                                setGrid({
                                    location: {
                                        ...grid.location,
                                        cta: { ...grid.location.cta, href },
                                    },
                                })
                            }
                        />
                    </FieldGroup>

                    <FieldGroup title="Button under the grid">
                        <CtaField
                            label="Button"
                            text={grid.cta.label}
                            action={grid.cta.href}
                            onTextChange={(label) =>
                                setGrid({ cta: { ...grid.cta, label } })
                            }
                            onActionChange={(href) =>
                                setGrid({ cta: { ...grid.cta, href } })
                            }
                        />
                    </FieldGroup>
                </>
            )}

            {section === "faq" && (
                <>
                    <FieldGroup title="Section heading">
                        <TextInput
                            label="Heading"
                            value={content.faq.heading}
                            onChange={(heading) => setFaq({ heading })}
                        />
                    </FieldGroup>
                    <FaqGroupsInput
                        grouped={false}
                        groups={[{ label: "", items: content.faq.items }]}
                        onChange={(groups) =>
                            setFaq({ items: groups[0]?.items ?? [] })
                        }
                    />
                </>
            )}
        </EditorShell>
    );
}
