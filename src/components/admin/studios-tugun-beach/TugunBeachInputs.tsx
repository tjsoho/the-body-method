"use client";

/* ************************************************************
                        NOTES
   The /studios/tugun-beach editor.
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
    TUGUN_BEACH_SLUG,
    type TugunBeachContent,
} from "@/app/studios/tugun-beach/_config";

type SectionKey =
    | "hero"
    | "intro"
    | "sixPeople"
    | "reformer"
    | "privateBand"
    | "teachers"
    | "faq"
    | "closing";

const SECTIONS: { value: SectionKey; label: string }[] = [
    { value: "hero", label: "1. Hero" },
    { value: "intro", label: "2. Intro lines" },
    { value: "sixPeople", label: "3. Six people" },
    { value: "reformer", label: "4. Reformer at TBM" },
    { value: "privateBand", label: "5. Private Pilates band" },
    { value: "teachers", label: "6. Teacher tiles" },
    { value: "faq", label: "7. FAQ" },
    { value: "closing", label: "8. Closing buttons" },
];

export default function TugunBeachInputs({
    initialContent,
    initialTitle,
    initialDescription,
    initialMetaTitle,
    initialMetaDescription,
}: {
    initialContent: TugunBeachContent;
    initialTitle: string;
    initialDescription: string;
    initialMetaTitle: string;
    initialMetaDescription: string;
}) {
    const [section, setSection] = useState<SectionKey>("hero");
    const editor = usePageEditor<TugunBeachContent>({
        slug: TUGUN_BEACH_SLUG,
        pageTitle: "Tugun Beach",
        initialContent,
        initialTitle,
        initialDescription,
        initialMetaTitle,
        initialMetaDescription,
    });

    const { content, patch } = editor;
    const setIntro = patch("intro");
    const setSix = patch("sixPeople");
    const setReformer = patch("reformer");
    const setBand = patch("privateBand");
    const setTeachers = patch("teachers");
    const setFaq = patch("faq");
    const setClosing = patch("closing");

    return (
        <EditorShell
            pageTitle="Tugun Beach"
            urlPath="/studios/tugun-beach"
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
                    usage="Tugun Beach hero"
                />
            )}

            {section === "intro" && (
                <FieldGroup
                    title="Centred lines"
                    description="The two lines under the hero."
                >
                    <TextAreaInput
                        label="Opening line, set large"
                        value={content.intro.lede}
                        onChange={(lede) => setIntro({ lede })}
                        rows={3}
                    />
                    <TextAreaInput
                        label="Second line, italic"
                        value={content.intro.closer}
                        onChange={(closer) => setIntro({ closer })}
                        rows={3}
                    />
                </FieldGroup>
            )}

            {section === "sixPeople" && (
                <>
                    <FieldGroup title="Heading and copy">
                        <TextAreaInput
                            label="Heading"
                            value={content.sixPeople.heading}
                            onChange={(heading) => setSix({ heading })}
                            rows={2}
                        />
                        <ParagraphListInput
                            label="Paragraphs"
                            values={content.sixPeople.body}
                            onChange={(body) => setSix({ body })}
                        />
                        <TextAreaInput
                            label="Closing line, italic"
                            value={content.sixPeople.closer}
                            onChange={(closer) => setSix({ closer })}
                            rows={3}
                        />
                    </FieldGroup>
                    <FieldGroup title="Photo">
                        <PhotoFields
                            label="Section photo"
                            image={content.sixPeople.image}
                            imageAlt={content.sixPeople.imageAlt}
                            usage="Tugun Beach: six people"
                            onImageChange={(image) => setSix({ image })}
                            onAltChange={(imageAlt) => setSix({ imageAlt })}
                        />
                    </FieldGroup>
                </>
            )}

            {section === "reformer" && (
                <>
                    <FieldGroup title="Heading and copy">
                        <TextInput
                            label="Heading"
                            value={content.reformer.heading}
                            onChange={(heading) => setReformer({ heading })}
                        />
                        <TextAreaInput
                            label="Body"
                            value={content.reformer.body}
                            onChange={(body) => setReformer({ body })}
                            rows={3}
                        />
                        <TextInput
                            label="Bold lead-in"
                            value={content.reformer.bestForLabel}
                            onChange={(bestForLabel) =>
                                setReformer({ bestForLabel })
                            }
                            placeholder="Best for:"
                        />
                        <TextAreaInput
                            label="Text after the lead-in"
                            value={content.reformer.bestFor}
                            onChange={(bestFor) => setReformer({ bestFor })}
                            rows={4}
                        />
                        <CtaField
                            label="Button"
                            text={content.reformer.cta.label}
                            action={content.reformer.cta.href}
                            onTextChange={(label) =>
                                setReformer({
                                    cta: { ...content.reformer.cta, label },
                                })
                            }
                            onActionChange={(href) =>
                                setReformer({
                                    cta: { ...content.reformer.cta, href },
                                })
                            }
                        />
                    </FieldGroup>
                    <FieldGroup title="Photo">
                        <PhotoFields
                            label="Section photo"
                            image={content.reformer.image}
                            imageAlt={content.reformer.imageAlt}
                            usage="Tugun Beach: reformer"
                            onImageChange={(image) => setReformer({ image })}
                            onAltChange={(imageAlt) =>
                                setReformer({ imageAlt })
                            }
                        />
                    </FieldGroup>
                </>
            )}

            {section === "privateBand" && (
                <>
                    <FieldGroup title="Heading and copy">
                        <TextAreaInput
                            label="Heading"
                            value={content.privateBand.heading}
                            onChange={(heading) => setBand({ heading })}
                            rows={2}
                        />
                        <TextAreaInput
                            label="Body"
                            value={content.privateBand.body}
                            onChange={(body) => setBand({ body })}
                            rows={5}
                        />
                        <CtaField
                            label="Button"
                            text={content.privateBand.cta.label}
                            action={content.privateBand.cta.href}
                            onTextChange={(label) =>
                                setBand({
                                    cta: { ...content.privateBand.cta, label },
                                })
                            }
                            onActionChange={(href) =>
                                setBand({
                                    cta: { ...content.privateBand.cta, href },
                                })
                            }
                        />
                    </FieldGroup>
                    <FieldGroup title="Photo">
                        <PhotoFields
                            label="Section photo"
                            image={content.privateBand.image}
                            imageAlt={content.privateBand.imageAlt}
                            imageFocus={content.privateBand.imageFocus}
                            usage="Tugun Beach: private band"
                            onImageChange={(image) => setBand({ image })}
                            onAltChange={(imageAlt) => setBand({ imageAlt })}
                            onFocusChange={(imageFocus) =>
                                setBand({ imageFocus })
                            }
                        />
                    </FieldGroup>
                </>
            )}

            {section === "teachers" && (
                <FieldGroup
                    title="Teacher tiles"
                    description="Photographs only. Names and bios live in the roster on the Home editor."
                    toolbar={
                        <AddItemButton
                            onClick={() =>
                                setTeachers({
                                    tiles: [
                                        ...content.teachers.tiles,
                                        {
                                            id: `tile-${Date.now()}`,
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
                    <TextAreaInput
                        label="Section heading"
                        value={content.teachers.heading}
                        onChange={(heading) => setTeachers({ heading })}
                        rows={2}
                    />
                    {content.teachers.tiles.map((tile, index) => (
                        <ListItemCard key={tile.id} title={`Tile ${index + 1}`}>
                            <div className="flex justify-end">
                                <ListControls
                                    index={index}
                                    length={content.teachers.tiles.length}
                                    onMove={(delta) =>
                                        setTeachers({
                                            tiles: moveItem(
                                                content.teachers.tiles,
                                                index,
                                                delta,
                                            ),
                                        })
                                    }
                                    onRemove={() =>
                                        setTeachers({
                                            tiles: removeAt(
                                                content.teachers.tiles,
                                                index,
                                            ),
                                        })
                                    }
                                />
                            </div>
                            <PhotoFields
                                label="Photo"
                                image={tile.image}
                                imageAlt={tile.imageAlt}
                                usage={`Tugun Beach tile ${index + 1}`}
                                onImageChange={(image) =>
                                    setTeachers({
                                        tiles: replaceAt(
                                            content.teachers.tiles,
                                            index,
                                            { image },
                                        ),
                                    })
                                }
                                onAltChange={(imageAlt) =>
                                    setTeachers({
                                        tiles: replaceAt(
                                            content.teachers.tiles,
                                            index,
                                            { imageAlt },
                                        ),
                                    })
                                }
                            />
                        </ListItemCard>
                    ))}
                </FieldGroup>
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

            {section === "closing" && (
                <FieldGroup
                    title="Closing band"
                    description="Two buttons on forest at the foot of the page."
                >
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
            )}
        </EditorShell>
    );
}
