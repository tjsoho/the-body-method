"use client";

/* ************************************************************
                        NOTES
   The /new-here editor. Seven sections, in page order.
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
import { NEW_HERE_SLUG, type NewHereContent } from "@/app/new-here/_config";

type SectionKey =
    | "hero"
    | "purpose"
    | "ready"
    | "studios"
    | "weeks"
    | "firstClass"
    | "faq";

const SECTIONS: { value: SectionKey; label: string }[] = [
    { value: "hero", label: "1. Hero" },
    { value: "purpose", label: "2. What the 21 days are for" },
    { value: "ready", label: "3. You don't need to be ready" },
    { value: "studios", label: "4. Two studios" },
    { value: "weeks", label: "5. Your three weeks" },
    { value: "firstClass", label: "6. Your first class" },
    { value: "faq", label: "7. FAQ" },
];

export default function NewHereInputs({
    initialContent,
    initialTitle,
    initialDescription,
    initialMetaTitle,
    initialMetaDescription,
}: {
    initialContent: NewHereContent;
    initialTitle: string;
    initialDescription: string;
    initialMetaTitle: string;
    initialMetaDescription: string;
}) {
    const [section, setSection] = useState<SectionKey>("hero");
    const editor = usePageEditor<NewHereContent>({
        slug: NEW_HERE_SLUG,
        pageTitle: "New Here",
        initialContent,
        initialTitle,
        initialDescription,
        initialMetaTitle,
        initialMetaDescription,
    });

    const { content, patch } = editor;
    const setHero = patch("hero");
    const setPurpose = patch("purpose");
    const setReady = patch("ready");
    const setStudios = patch("studios");
    const setWeeks = patch("weeks");
    const setFirstClass = patch("firstClass");
    const setFaq = patch("faq");

    return (
        <EditorShell
            pageTitle="New Here"
            urlPath="/new-here"
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
                <>
                    <PhotoHeroFields
                        value={content.hero}
                        onChange={setHero}
                        usage="New Here hero"
                    />
                    <FieldGroup title="Button">
                        <CtaField
                            label="Button"
                            text={content.hero.cta.label}
                            action={content.hero.cta.href}
                            onTextChange={(label) =>
                                setHero({
                                    cta: { ...content.hero.cta, label },
                                })
                            }
                            onActionChange={(href) =>
                                setHero({ cta: { ...content.hero.cta, href } })
                            }
                        />
                    </FieldGroup>
                </>
            )}

            {section === "purpose" && (
                <>
                    <FieldGroup title="Heading and copy">
                        <TextAreaInput
                            label="Heading"
                            value={content.purpose.heading}
                            onChange={(heading) => setPurpose({ heading })}
                            rows={2}
                        />
                        <ParagraphListInput
                            label="Paragraphs"
                            values={content.purpose.body}
                            onChange={(body) => setPurpose({ body })}
                        />
                    </FieldGroup>
                    <FieldGroup
                        title="The two lines under the rule"
                        description="Set larger. The second is italic and green."
                    >
                        <TextAreaInput
                            label="First line"
                            value={content.purpose.closerPlain}
                            onChange={(closerPlain) =>
                                setPurpose({ closerPlain })
                            }
                            rows={2}
                        />
                        <TextAreaInput
                            label="Second line, italic"
                            value={content.purpose.closerItalic}
                            onChange={(closerItalic) =>
                                setPurpose({ closerItalic })
                            }
                            rows={2}
                        />
                    </FieldGroup>
                    <FieldGroup title="Photo">
                        <PhotoFields
                            label="Section photo"
                            image={content.purpose.image}
                            imageAlt={content.purpose.imageAlt}
                            usage="New Here: 21 days for"
                            onImageChange={(image) => setPurpose({ image })}
                            onAltChange={(imageAlt) => setPurpose({ imageAlt })}
                        />
                    </FieldGroup>
                </>
            )}

            {section === "ready" && (
                <>
                    <FieldGroup title="Heading and rows">
                        <TextAreaInput
                            label="Heading"
                            value={content.ready.heading}
                            onChange={(heading) => setReady({ heading })}
                            rows={2}
                        />
                        <ParagraphListInput
                            label="Rows"
                            values={content.ready.items}
                            onChange={(items) => setReady({ items })}
                            addLabel="Add row"
                            rows={2}
                        />
                        <TextAreaInput
                            label="Closing line, italic"
                            value={content.ready.closer}
                            onChange={(closer) => setReady({ closer })}
                            rows={2}
                        />
                    </FieldGroup>
                    <FieldGroup title="Photo">
                        <PhotoFields
                            label="Section photo"
                            image={content.ready.image}
                            imageAlt={content.ready.imageAlt}
                            usage="New Here: ready"
                            onImageChange={(image) => setReady({ image })}
                            onAltChange={(imageAlt) => setReady({ imageAlt })}
                        />
                    </FieldGroup>
                </>
            )}

            {section === "studios" && (
                <>
                    <FieldGroup title="Heading">
                        <TextInput
                            label="Heading, upright part"
                            value={content.studios.headingLead}
                            onChange={(headingLead) =>
                                setStudios({ headingLead })
                            }
                        />
                        <TextInput
                            label="Heading, italic part"
                            value={content.studios.headingItalic}
                            onChange={(headingItalic) =>
                                setStudios({ headingItalic })
                            }
                        />
                    </FieldGroup>
                    <FieldGroup
                        title="Studio tiles"
                        toolbar={
                            <AddItemButton
                                onClick={() =>
                                    setStudios({
                                        items: [
                                            ...content.studios.items,
                                            {
                                                id: `studio-${Date.now()}`,
                                                name: "",
                                                body: "",
                                                image: "",
                                                imageAlt: "",
                                                imageFocus: "center",
                                            },
                                        ],
                                    })
                                }
                            >
                                Add studio
                            </AddItemButton>
                        }
                    >
                        {content.studios.items.map((studio, index) => (
                            <ListItemCard
                                key={studio.id}
                                title={studio.name || `Studio ${index + 1}`}
                            >
                                <div className="flex justify-end">
                                    <ListControls
                                        index={index}
                                        length={content.studios.items.length}
                                        onMove={(delta) =>
                                            setStudios({
                                                items: moveItem(
                                                    content.studios.items,
                                                    index,
                                                    delta,
                                                ),
                                            })
                                        }
                                        onRemove={() =>
                                            setStudios({
                                                items: removeAt(
                                                    content.studios.items,
                                                    index,
                                                ),
                                            })
                                        }
                                    />
                                </div>
                                <TextInput
                                    label="Name"
                                    value={studio.name}
                                    onChange={(name) =>
                                        setStudios({
                                            items: replaceAt(
                                                content.studios.items,
                                                index,
                                                { name },
                                            ),
                                        })
                                    }
                                />
                                <TextAreaInput
                                    label="Description"
                                    value={studio.body}
                                    onChange={(body) =>
                                        setStudios({
                                            items: replaceAt(
                                                content.studios.items,
                                                index,
                                                { body },
                                            ),
                                        })
                                    }
                                    rows={3}
                                />
                                <PhotoFields
                                    label="Photo"
                                    image={studio.image}
                                    imageAlt={studio.imageAlt}
                                    imageFocus={studio.imageFocus}
                                    usage={`New Here: ${studio.name}`}
                                    onImageChange={(image) =>
                                        setStudios({
                                            items: replaceAt(
                                                content.studios.items,
                                                index,
                                                { image },
                                            ),
                                        })
                                    }
                                    onAltChange={(imageAlt) =>
                                        setStudios({
                                            items: replaceAt(
                                                content.studios.items,
                                                index,
                                                { imageAlt },
                                            ),
                                        })
                                    }
                                    onFocusChange={(imageFocus) =>
                                        setStudios({
                                            items: replaceAt(
                                                content.studios.items,
                                                index,
                                                { imageFocus },
                                            ),
                                        })
                                    }
                                />
                            </ListItemCard>
                        ))}
                    </FieldGroup>
                    <FieldGroup title="Button">
                        <CtaField
                            label="Button"
                            text={content.studios.cta.label}
                            action={content.studios.cta.href}
                            onTextChange={(label) =>
                                setStudios({
                                    cta: { ...content.studios.cta, label },
                                })
                            }
                            onActionChange={(href) =>
                                setStudios({
                                    cta: { ...content.studios.cta, href },
                                })
                            }
                        />
                    </FieldGroup>
                </>
            )}

            {section === "weeks" && (
                <>
                    <FieldGroup title="Photo band above the section">
                        <PhotoFields
                            label="Band photo"
                            image={content.weeks.bandImage}
                            imageAlt={content.weeks.bandImageAlt}
                            imageFocus={content.weeks.bandImageFocus}
                            usage="New Here: weeks band"
                            onImageChange={(bandImage) =>
                                setWeeks({ bandImage })
                            }
                            onAltChange={(bandImageAlt) =>
                                setWeeks({ bandImageAlt })
                            }
                            onFocusChange={(bandImageFocus) =>
                                setWeeks({ bandImageFocus })
                            }
                        />
                    </FieldGroup>
                    <FieldGroup
                        title="The weeks"
                        toolbar={
                            <AddItemButton
                                onClick={() =>
                                    setWeeks({
                                        steps: [
                                            ...content.weeks.steps,
                                            {
                                                id: `week-${Date.now()}`,
                                                week: "",
                                                title: "",
                                                body: "",
                                            },
                                        ],
                                    })
                                }
                            >
                                Add week
                            </AddItemButton>
                        }
                    >
                        <TextInput
                            label="Section heading"
                            value={content.weeks.heading}
                            onChange={(heading) => setWeeks({ heading })}
                        />
                        {content.weeks.steps.map((step, index) => (
                            <ListItemCard
                                key={step.id}
                                title={step.title || `Step ${index + 1}`}
                            >
                                <div className="flex justify-end">
                                    <ListControls
                                        index={index}
                                        length={content.weeks.steps.length}
                                        onMove={(delta) =>
                                            setWeeks({
                                                steps: moveItem(
                                                    content.weeks.steps,
                                                    index,
                                                    delta,
                                                ),
                                            })
                                        }
                                        onRemove={() =>
                                            setWeeks({
                                                steps: removeAt(
                                                    content.weeks.steps,
                                                    index,
                                                ),
                                            })
                                        }
                                    />
                                </div>
                                <TextInput
                                    label="Stage label"
                                    value={step.week}
                                    onChange={(week) =>
                                        setWeeks({
                                            steps: replaceAt(
                                                content.weeks.steps,
                                                index,
                                                { week },
                                            ),
                                        })
                                    }
                                    placeholder="Week 1 -"
                                />
                                <TextInput
                                    label="Title"
                                    value={step.title}
                                    onChange={(title) =>
                                        setWeeks({
                                            steps: replaceAt(
                                                content.weeks.steps,
                                                index,
                                                { title },
                                            ),
                                        })
                                    }
                                />
                                <TextAreaInput
                                    label="Body"
                                    value={step.body}
                                    onChange={(body) =>
                                        setWeeks({
                                            steps: replaceAt(
                                                content.weeks.steps,
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
                    <FieldGroup title="After 21 days">
                        <TextInput
                            label="Heading"
                            value={content.weeks.afterHeading}
                            onChange={(afterHeading) =>
                                setWeeks({ afterHeading })
                            }
                        />
                        <TextAreaInput
                            label="First paragraph"
                            value={content.weeks.afterLead}
                            onChange={(afterLead) => setWeeks({ afterLead })}
                            rows={3}
                            hint="Set brighter than the rest"
                        />
                        <ParagraphListInput
                            label="Remaining paragraphs"
                            values={content.weeks.afterBody}
                            onChange={(afterBody) => setWeeks({ afterBody })}
                        />
                    </FieldGroup>
                </>
            )}

            {section === "firstClass" && (
                <>
                    <FieldGroup title="Heading and copy">
                        <TextInput
                            label="Heading"
                            value={content.firstClass.heading}
                            onChange={(heading) => setFirstClass({ heading })}
                        />
                        <ParagraphListInput
                            label="Paragraphs"
                            values={content.firstClass.body}
                            onChange={(body) => setFirstClass({ body })}
                        />
                        <TextAreaInput
                            label="Italic line"
                            value={content.firstClass.italicLine}
                            onChange={(italicLine) =>
                                setFirstClass({ italicLine })
                            }
                            rows={2}
                        />
                    </FieldGroup>
                    <FieldGroup title="Photo">
                        <PhotoFields
                            label="Section photo"
                            image={content.firstClass.image}
                            imageAlt={content.firstClass.imageAlt}
                            usage="New Here: first class"
                            onImageChange={(image) => setFirstClass({ image })}
                            onAltChange={(imageAlt) =>
                                setFirstClass({ imageAlt })
                            }
                        />
                    </FieldGroup>
                    <FieldGroup title="Button">
                        <CtaField
                            label="Button"
                            text={content.firstClass.cta.label}
                            action={content.firstClass.cta.href}
                            onTextChange={(label) =>
                                setFirstClass({
                                    cta: { ...content.firstClass.cta, label },
                                })
                            }
                            onActionChange={(href) =>
                                setFirstClass({
                                    cta: { ...content.firstClass.cta, href },
                                })
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
                        description="The short FAQ at the foot of this page."
                    />
                    <FieldGroup title="Button">
                        <CtaField
                            label="Button"
                            text={content.faq.cta.label}
                            action={content.faq.cta.href}
                            onTextChange={(label) =>
                                setFaq({ cta: { ...content.faq.cta, label } })
                            }
                            onActionChange={(href) =>
                                setFaq({ cta: { ...content.faq.cta, href } })
                            }
                        />
                    </FieldGroup>
                </>
            )}
        </EditorShell>
    );
}
