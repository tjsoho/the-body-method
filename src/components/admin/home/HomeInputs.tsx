"use client";

/* ************************************************************
                        NOTES
   The home page editor.

   One form per section, in page order, picked from the sidebar.
   Every string, photo, crop, button label and destination that
   the home page renders is reachable here. If a field exists in
   HomePageContent, it has an input on this page.

   Two rows are written on save:

     "home"     this page's own content
     "teachers" the roster, shared with /our-people

   The roster is separate on purpose. Both carousels read the
   same list, so a name or a photo is only ever changed once. A
   teacher's long-form bio rides along untouched, which is what
   the Our People editor will pick up later.

   Meta title and description are written to the `seo_metadata`
   table through the same action /admin/seo uses, so the two
   screens never disagree about the home page's metadata.
************************************************************ */

/* ************************************************************
                        IMPORTS
************************************************************ */
import { useState } from "react";
import toast from "react-hot-toast";
import { SaveBanner } from "@/components/core/save-banner";
import {
    AddItemButton,
    AdminPageShell,
    CtaField,
    FieldGroup,
    ImageFocusInput,
    ImageInput,
    ListItemCard,
    PageMetaPanel,
    ParagraphListInput,
    SectionSidebar,
    SubtleButton,
    TextAreaInput,
    TextInput,
    Toggle,
} from "@/components/admin/_shared/form-primitives";
import useUpdatePage from "@/utils/hooks/useUpdatePage";
import { upsertSeoEntryAction } from "@/server-actions/seo";
import type {
    BelongContent,
    FinalCtaContent,
    GreatTeachingContent,
    HeroContent,
    HomePageContent,
    LifeAtTbmContent,
    PrivatePilatesContent,
    StudioCard,
    TwentyOneDayContent,
    TwoStudiosContent,
    WhyPeopleStayContent,
} from "@/app/_config";

/* ************************************************************
                        TYPES
************************************************************ */
type SectionKey =
    | "hero"
    | "belong"
    | "twoStudios"
    | "twentyOneDay"
    | "whyPeopleStay"
    | "greatTeaching"
    | "privatePilates"
    | "lifeAtTbm"
    | "finalCta";

const SECTIONS: { value: SectionKey; label: string }[] = [
    { value: "hero", label: "1. Hero" },
    { value: "belong", label: "2. A place to belong" },
    { value: "twoStudios", label: "3. Two studios" },
    { value: "twentyOneDay", label: "4. First 21 days" },
    { value: "whyPeopleStay", label: "5. Why people stay" },
    { value: "greatTeaching", label: "6. Great teaching" },
    { value: "privatePilates", label: "7. Private Pilates" },
    { value: "lifeAtTbm", label: "8. Life at TBM" },
    { value: "finalCta", label: "9. Closing banner" },
];

export type HomeInputsProps = {
    initialContent: HomePageContent;
    initialTitle: string;
    initialDescription: string;
    initialMetaTitle: string;
    initialMetaDescription: string;
};

/* ************************************************************
                        HELPERS
************************************************************ */
/** Replace one item of a list, leaving the rest alone. */
function replaceAt<T>(list: T[], index: number, patch: Partial<T>): T[] {
    return list.map((item, i) => (i === index ? { ...item, ...patch } : item));
}

function moveItem<T>(list: T[], index: number, delta: number): T[] {
    const target = index + delta;
    if (target < 0 || target >= list.length) return list;
    const next = [...list];
    [next[index], next[target]] = [next[target], next[index]];
    return next;
}

/** Up / Down / Remove, so every list in here reorders the same way. */
function ListControls({
    index,
    length,
    onMove,
    onRemove,
    minimum = 1,
}: {
    index: number;
    length: number;
    onMove: (delta: number) => void;
    onRemove: () => void;
    minimum?: number;
}) {
    return (
        <div className="flex items-center gap-1">
            <SubtleButton
                variant="ghost"
                onClick={() => onMove(-1)}
                disabled={index === 0}
                title="Move up"
            >
                Up
            </SubtleButton>
            <SubtleButton
                variant="ghost"
                onClick={() => onMove(1)}
                disabled={index === length - 1}
                title="Move down"
            >
                Down
            </SubtleButton>
            <SubtleButton
                variant="danger"
                onClick={onRemove}
                disabled={length <= minimum}
                title="Remove"
            >
                Remove
            </SubtleButton>
        </div>
    );
}

/** Image path, alt text and crop, which every photo field needs. */
function PhotoFields({
    label,
    image,
    imageAlt,
    imageFocus,
    usage,
    onImageChange,
    onAltChange,
    onFocusChange,
}: {
    label: string;
    image: string;
    imageAlt: string;
    imageFocus?: string;
    usage?: string;
    onImageChange: (v: string) => void;
    onAltChange: (v: string) => void;
    onFocusChange?: (v: string) => void;
}) {
    return (
        <div className="space-y-4">
            <ImageInput
                label={label}
                value={image}
                onChange={onImageChange}
                altValue={imageAlt}
                onAltChange={onAltChange}
                usage={usage}
                hint="Click the thumbnail to open the media library"
            />
            <TextInput
                label="Image path"
                value={image}
                onChange={onImageChange}
                placeholder="/images/tbm-placeholders/example.jpg"
                hint="Set by the picker. Paste a path here if you prefer."
            />
            {onFocusChange && imageFocus !== undefined && (
                <ImageFocusInput
                    value={imageFocus}
                    onChange={onFocusChange}
                />
            )}
        </div>
    );
}

/* ************************************************************
                        SECTION FORMS
************************************************************ */
function HeroForm({
    value,
    onChange,
}: {
    value: HeroContent;
    onChange: (patch: Partial<HeroContent>) => void;
}) {
    return (
        <>
            <FieldGroup
                title="Headline and copy"
                description="The first thing anyone reads. Three blocks, top to bottom."
            >
                <TextAreaInput
                    label="Heading"
                    value={value.heading}
                    onChange={(heading) => onChange({ heading })}
                    rows={2}
                />
                <TextAreaInput
                    label="Italic subheading"
                    value={value.italicSubheading}
                    onChange={(italicSubheading) =>
                        onChange({ italicSubheading })
                    }
                    rows={2}
                />
                <TextAreaInput
                    label="Body"
                    value={value.body}
                    onChange={(body) => onChange({ body })}
                    rows={3}
                />
            </FieldGroup>

            <FieldGroup title="Buttons">
                <CtaField
                    label="Primary button"
                    text={value.primaryCta.label}
                    action={value.primaryCta.href}
                    onTextChange={(label) =>
                        onChange({ primaryCta: { ...value.primaryCta, label } })
                    }
                    onActionChange={(href) =>
                        onChange({ primaryCta: { ...value.primaryCta, href } })
                    }
                />
                <CtaField
                    label="Secondary button"
                    text={value.secondaryCta.label}
                    action={value.secondaryCta.href}
                    onTextChange={(label) =>
                        onChange({
                            secondaryCta: { ...value.secondaryCta, label },
                        })
                    }
                    onActionChange={(href) =>
                        onChange({
                            secondaryCta: { ...value.secondaryCta, href },
                        })
                    }
                />
            </FieldGroup>

            <FieldGroup
                title="Backdrop photo"
                description="Shown on its own, and used as the holding frame while a film loads."
            >
                <PhotoFields
                    label="Hero photo"
                    image={value.fallbackImage}
                    imageAlt={value.fallbackImageAlt}
                    imageFocus={value.imageFocus}
                    usage="Home hero"
                    onImageChange={(fallbackImage) =>
                        onChange({ fallbackImage })
                    }
                    onAltChange={(fallbackImageAlt) =>
                        onChange({ fallbackImageAlt })
                    }
                    onFocusChange={(imageFocus) => onChange({ imageFocus })}
                />
            </FieldGroup>

            <FieldGroup
                title="Hero film"
                description="Leave both empty and the photo shows with a slow pan. Fill one in and that film plays at that screen size, muted and looping."
            >
                <TextInput
                    label="Desktop film URL"
                    value={value.videoDesktopUrl}
                    onChange={(videoDesktopUrl) =>
                        onChange({ videoDesktopUrl })
                    }
                    placeholder="16:9 file, e.g. /videos/hero-desktop.mp4"
                />
                <TextInput
                    label="Mobile film URL"
                    value={value.videoMobileUrl}
                    onChange={(videoMobileUrl) => onChange({ videoMobileUrl })}
                    placeholder="9:16 file, e.g. /videos/hero-mobile.mp4"
                />
            </FieldGroup>
        </>
    );
}

function BelongForm({
    value,
    onChange,
}: {
    value: BelongContent;
    onChange: (patch: Partial<BelongContent>) => void;
}) {
    return (
        <>
            <FieldGroup
                title="Heading"
                description="The heading is split so the second half can be set in italics."
            >
                <TextInput
                    label="Heading, upright part"
                    value={value.headingLead}
                    onChange={(headingLead) => onChange({ headingLead })}
                    hint="Keep the trailing space if the italic part follows on the same line"
                />
                <TextInput
                    label="Heading, italic part"
                    value={value.headingItalic}
                    onChange={(headingItalic) => onChange({ headingItalic })}
                />
                <TextAreaInput
                    label="Italic question above the copy"
                    value={value.italicLine}
                    onChange={(italicLine) => onChange({ italicLine })}
                    rows={2}
                />
            </FieldGroup>

            <FieldGroup title="Body copy">
                <ParagraphListInput
                    label="Paragraphs"
                    values={value.body}
                    onChange={(body) => onChange({ body })}
                />
            </FieldGroup>

            <FieldGroup title="Photo">
                <PhotoFields
                    label="Section photo"
                    image={value.image}
                    imageAlt={value.imageAlt}
                    imageFocus={value.imageFocus}
                    usage="Home belong"
                    onImageChange={(image) => onChange({ image })}
                    onAltChange={(imageAlt) => onChange({ imageAlt })}
                    onFocusChange={(imageFocus) => onChange({ imageFocus })}
                />
            </FieldGroup>

            <FieldGroup
                title="Pillars"
                description="The four short promises underneath. Add or remove as many as you like."
                toolbar={
                    <AddItemButton
                        onClick={() =>
                            onChange({
                                pillars: [
                                    ...value.pillars,
                                    { title: "", body: "" },
                                ],
                            })
                        }
                    >
                        Add pillar
                    </AddItemButton>
                }
            >
                {value.pillars.map((pillar, index) => (
                    <ListItemCard key={index} title={`Pillar ${index + 1}`}>
                        <div className="flex justify-end">
                            <ListControls
                                index={index}
                                length={value.pillars.length}
                                onMove={(delta) =>
                                    onChange({
                                        pillars: moveItem(
                                            value.pillars,
                                            index,
                                            delta,
                                        ),
                                    })
                                }
                                onRemove={() =>
                                    onChange({
                                        pillars: value.pillars.filter(
                                            (_, i) => i !== index,
                                        ),
                                    })
                                }
                            />
                        </div>
                        <TextInput
                            label="Title"
                            value={pillar.title}
                            onChange={(title) =>
                                onChange({
                                    pillars: replaceAt(value.pillars, index, {
                                        title,
                                    }),
                                })
                            }
                        />
                        <TextAreaInput
                            label="Body"
                            value={pillar.body}
                            onChange={(body) =>
                                onChange({
                                    pillars: replaceAt(value.pillars, index, {
                                        body,
                                    }),
                                })
                            }
                            rows={2}
                        />
                    </ListItemCard>
                ))}
            </FieldGroup>
        </>
    );
}

function StudioCardFields({
    heading,
    card,
    usage,
    onChange,
}: {
    heading: string;
    card: StudioCard;
    usage: string;
    onChange: (patch: Partial<StudioCard>) => void;
}) {
    return (
        <FieldGroup title={heading}>
            <TextInput
                label="Studio name"
                value={card.name}
                onChange={(name) => onChange({ name })}
            />
            <TextAreaInput
                label="Italic line"
                value={card.italicLine}
                onChange={(italicLine) => onChange({ italicLine })}
                rows={2}
            />
            <TextAreaInput
                label="Body"
                value={card.body}
                onChange={(body) => onChange({ body })}
                rows={4}
            />
            <PhotoFields
                label="Studio photo"
                image={card.image}
                imageAlt={card.imageAlt}
                imageFocus={card.imageFocus}
                usage={usage}
                onImageChange={(image) => onChange({ image })}
                onAltChange={(imageAlt) => onChange({ imageAlt })}
                onFocusChange={(imageFocus) => onChange({ imageFocus })}
            />
            <CtaField
                label="Card link"
                text={card.ctaLabel}
                action={card.ctaHref}
                onTextChange={(ctaLabel) => onChange({ ctaLabel })}
                onActionChange={(ctaHref) => onChange({ ctaHref })}
            />
        </FieldGroup>
    );
}

function TwoStudiosForm({
    value,
    onChange,
}: {
    value: TwoStudiosContent;
    onChange: (patch: Partial<TwoStudiosContent>) => void;
}) {
    return (
        <>
            <FieldGroup title="Heading">
                <TextInput
                    label="Heading, upright part"
                    value={value.headingLead}
                    onChange={(headingLead) => onChange({ headingLead })}
                />
                <TextInput
                    label="Heading, italic part"
                    value={value.headingItalic}
                    onChange={(headingItalic) => onChange({ headingItalic })}
                />
            </FieldGroup>

            <StudioCardFields
                heading="Left card"
                card={value.tugunBeach}
                usage="Home two studios, left"
                onChange={(patch) =>
                    onChange({
                        tugunBeach: { ...value.tugunBeach, ...patch },
                    })
                }
            />

            <StudioCardFields
                heading="Right card"
                card={value.cornerstone}
                usage="Home two studios, right"
                onChange={(patch) =>
                    onChange({
                        cornerstone: { ...value.cornerstone, ...patch },
                    })
                }
            />

            <FieldGroup
                title="Dual membership band"
                description="The strip below the two cards."
            >
                <TextInput
                    label="Heading"
                    value={value.dualHeading}
                    onChange={(dualHeading) => onChange({ dualHeading })}
                />
                <TextAreaInput
                    label="Body"
                    value={value.dualBody}
                    onChange={(dualBody) => onChange({ dualBody })}
                    rows={3}
                />
                <CtaField
                    label="Button"
                    text={value.dualCta.label}
                    action={value.dualCta.href}
                    onTextChange={(label) =>
                        onChange({ dualCta: { ...value.dualCta, label } })
                    }
                    onActionChange={(href) =>
                        onChange({ dualCta: { ...value.dualCta, href } })
                    }
                />
            </FieldGroup>
        </>
    );
}

function TwentyOneDayForm({
    value,
    onChange,
}: {
    value: TwentyOneDayContent;
    onChange: (patch: Partial<TwentyOneDayContent>) => void;
}) {
    return (
        <>
            <FieldGroup title="Heading and copy">
                <TextInput
                    label="Small label above the heading"
                    value={value.label}
                    onChange={(label) => onChange({ label })}
                />
                <TextInput
                    label="Heading, upright part"
                    value={value.headingLead}
                    onChange={(headingLead) => onChange({ headingLead })}
                />
                <TextInput
                    label="Heading, italic part"
                    value={value.headingItalic}
                    onChange={(headingItalic) => onChange({ headingItalic })}
                />
                <TextAreaInput
                    label="Italic line"
                    value={value.italicLine}
                    onChange={(italicLine) => onChange({ italicLine })}
                    rows={2}
                />
                <TextAreaInput
                    label="Body"
                    value={value.body}
                    onChange={(body) => onChange({ body })}
                    rows={3}
                />
                <TextInput
                    label="Price line"
                    value={value.priceLine}
                    onChange={(priceLine) => onChange({ priceLine })}
                />
            </FieldGroup>

            <FieldGroup
                title="Week by week"
                description="The steps down the right hand side."
                toolbar={
                    <AddItemButton
                        onClick={() =>
                            onChange({
                                steps: [
                                    ...value.steps,
                                    { week: "", title: "", body: "" },
                                ],
                            })
                        }
                    >
                        Add step
                    </AddItemButton>
                }
            >
                {value.steps.map((step, index) => (
                    <ListItemCard key={index} title={`Step ${index + 1}`}>
                        <div className="flex justify-end">
                            <ListControls
                                index={index}
                                length={value.steps.length}
                                onMove={(delta) =>
                                    onChange({
                                        steps: moveItem(
                                            value.steps,
                                            index,
                                            delta,
                                        ),
                                    })
                                }
                                onRemove={() =>
                                    onChange({
                                        steps: value.steps.filter(
                                            (_, i) => i !== index,
                                        ),
                                    })
                                }
                            />
                        </div>
                        <TextInput
                            label="Stage"
                            value={step.week}
                            onChange={(week) =>
                                onChange({
                                    steps: replaceAt(value.steps, index, {
                                        week,
                                    }),
                                })
                            }
                            placeholder="WEEK 1 -"
                        />
                        <TextInput
                            label="Title"
                            value={step.title}
                            onChange={(title) =>
                                onChange({
                                    steps: replaceAt(value.steps, index, {
                                        title,
                                    }),
                                })
                            }
                        />
                        <TextAreaInput
                            label="Body"
                            value={step.body}
                            onChange={(body) =>
                                onChange({
                                    steps: replaceAt(value.steps, index, {
                                        body,
                                    }),
                                })
                            }
                            rows={2}
                        />
                        <Toggle
                            id={`step-italic-${index}`}
                            label="Set this step in italics"
                            checked={Boolean(step.italic)}
                            onChange={(italic) =>
                                onChange({
                                    steps: replaceAt(value.steps, index, {
                                        italic,
                                    }),
                                })
                            }
                        />
                    </ListItemCard>
                ))}
            </FieldGroup>

            <FieldGroup title="Button">
                <CtaField
                    label="Button"
                    text={value.cta.label}
                    action={value.cta.href}
                    onTextChange={(label) =>
                        onChange({ cta: { ...value.cta, label } })
                    }
                    onActionChange={(href) =>
                        onChange({ cta: { ...value.cta, href } })
                    }
                />
            </FieldGroup>
        </>
    );
}

function WhyPeopleStayForm({
    value,
    onChange,
}: {
    value: WhyPeopleStayContent;
    onChange: (patch: Partial<WhyPeopleStayContent>) => void;
}) {
    return (
        <>
            <FieldGroup title="Heading">
                <TextInput
                    label="Heading"
                    value={value.heading}
                    onChange={(heading) => onChange({ heading })}
                />
                <TextAreaInput
                    label="Italic line"
                    value={value.italicLine}
                    onChange={(italicLine) => onChange({ italicLine })}
                    rows={2}
                />
                <TextInput
                    label="Label above every quote"
                    value={value.cardLabel}
                    onChange={(cardLabel) => onChange({ cardLabel })}
                    hint="Printed in bronze on each card"
                />
                <TextInput
                    label="Words before the year"
                    value={value.memberSinceLabel}
                    onChange={(memberSinceLabel) =>
                        onChange({ memberSinceLabel })
                    }
                    placeholder="Member since"
                    size="sm"
                />
            </FieldGroup>

            <FieldGroup
                title="Member stories"
                description="Each one is a card in the carousel. Three show at a time on a desktop."
                toolbar={
                    <AddItemButton
                        onClick={() =>
                            onChange({
                                stories: [
                                    ...value.stories,
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
                {value.stories.map((story, index) => (
                    <ListItemCard
                        key={story.id}
                        title={story.name || `Story ${index + 1}`}
                    >
                        <div className="flex justify-end">
                            <ListControls
                                index={index}
                                length={value.stories.length}
                                onMove={(delta) =>
                                    onChange({
                                        stories: moveItem(
                                            value.stories,
                                            index,
                                            delta,
                                        ),
                                    })
                                }
                                onRemove={() =>
                                    onChange({
                                        stories: value.stories.filter(
                                            (_, i) => i !== index,
                                        ),
                                    })
                                }
                            />
                        </div>
                        <TextAreaInput
                            label="Quote"
                            value={story.quote}
                            onChange={(quote) =>
                                onChange({
                                    stories: replaceAt(value.stories, index, {
                                        quote,
                                    }),
                                })
                            }
                            rows={3}
                        />
                        <TextInput
                            label="Member name"
                            value={story.name}
                            onChange={(name) =>
                                onChange({
                                    stories: replaceAt(value.stories, index, {
                                        name,
                                    }),
                                })
                            }
                        />
                        <TextInput
                            label="Member since"
                            value={story.memberSince}
                            onChange={(memberSince) =>
                                onChange({
                                    stories: replaceAt(value.stories, index, {
                                        memberSince,
                                    }),
                                })
                            }
                            placeholder="2019"
                            size="sm"
                        />
                        <TextInput
                            label="Favourite class or teacher"
                            value={story.favouriteClassTeacher}
                            onChange={(favouriteClassTeacher) =>
                                onChange({
                                    stories: replaceAt(value.stories, index, {
                                        favouriteClassTeacher,
                                    }),
                                })
                            }
                        />
                        <PhotoFields
                            label="Member photo"
                            image={story.image}
                            imageAlt={story.imageAlt}
                            usage={`Member story ${index + 1}`}
                            onImageChange={(image) =>
                                onChange({
                                    stories: replaceAt(value.stories, index, {
                                        image,
                                    }),
                                })
                            }
                            onAltChange={(imageAlt) =>
                                onChange({
                                    stories: replaceAt(value.stories, index, {
                                        imageAlt,
                                    }),
                                })
                            }
                        />
                    </ListItemCard>
                ))}
            </FieldGroup>
        </>
    );
}

function GreatTeachingForm({
    value,
    onChange,
}: {
    value: GreatTeachingContent;
    onChange: (patch: Partial<GreatTeachingContent>) => void;
}) {
    return (
        <>
            <FieldGroup title="Heading and copy">
                <TextInput
                    label="Heading, upright part"
                    value={value.headingLead}
                    onChange={(headingLead) => onChange({ headingLead })}
                />
                <TextInput
                    label="Heading, italic part"
                    value={value.headingItalic}
                    onChange={(headingItalic) => onChange({ headingItalic })}
                />
                <ParagraphListInput
                    label="Paragraphs"
                    values={value.body}
                    onChange={(body) => onChange({ body })}
                />
                <TextAreaInput
                    label="Italic closing line"
                    value={value.italicCloser}
                    onChange={(italicCloser) => onChange({ italicCloser })}
                    rows={2}
                />
            </FieldGroup>

            <FieldGroup
                title="Link under the carousel"
                description="The photographs and names in this section come from the teaching roster, which is edited on the Our People page."
            >
                <CtaField
                    label="Link"
                    text={value.cta.label}
                    action={value.cta.href}
                    onTextChange={(label) =>
                        onChange({ cta: { ...value.cta, label } })
                    }
                    onActionChange={(href) =>
                        onChange({ cta: { ...value.cta, href } })
                    }
                />
            </FieldGroup>
        </>
    );
}

function PrivatePilatesForm({
    value,
    onChange,
}: {
    value: PrivatePilatesContent;
    onChange: (patch: Partial<PrivatePilatesContent>) => void;
}) {
    return (
        <>
            <FieldGroup title="Heading and copy">
                <TextInput
                    label="Heading"
                    value={value.heading}
                    onChange={(heading) => onChange({ heading })}
                />
                <TextAreaInput
                    label="Italic line"
                    value={value.italicLine}
                    onChange={(italicLine) => onChange({ italicLine })}
                    rows={2}
                />
                <ParagraphListInput
                    label="Paragraphs"
                    values={value.body}
                    onChange={(body) => onChange({ body })}
                />
            </FieldGroup>

            <FieldGroup title="Photo">
                <PhotoFields
                    label="Section photo"
                    image={value.image}
                    imageAlt={value.imageAlt}
                    imageFocus={value.imageFocus}
                    usage="Home private Pilates"
                    onImageChange={(image) => onChange({ image })}
                    onAltChange={(imageAlt) => onChange({ imageAlt })}
                    onFocusChange={(imageFocus) => onChange({ imageFocus })}
                />
            </FieldGroup>

            <FieldGroup title="Button">
                <CtaField
                    label="Button"
                    text={value.cta.label}
                    action={value.cta.href}
                    onTextChange={(label) =>
                        onChange({ cta: { ...value.cta, label } })
                    }
                    onActionChange={(href) =>
                        onChange({ cta: { ...value.cta, href } })
                    }
                />
            </FieldGroup>
        </>
    );
}

function LifeAtTbmForm({
    value,
    onChange,
}: {
    value: LifeAtTbmContent;
    onChange: (patch: Partial<LifeAtTbmContent>) => void;
}) {
    return (
        <>
            <FieldGroup title="Heading and copy">
                <TextInput
                    label="Heading, upright part"
                    value={value.headingLead}
                    onChange={(headingLead) => onChange({ headingLead })}
                />
                <TextInput
                    label="Heading, italic part"
                    value={value.headingItalic}
                    onChange={(headingItalic) => onChange({ headingItalic })}
                />
                <TextAreaInput
                    label="Body"
                    value={value.body}
                    onChange={(body) => onChange({ body })}
                    rows={3}
                />
                <CtaField
                    label="Link under the gallery"
                    text={value.cta.label}
                    action={value.cta.href}
                    onTextChange={(label) =>
                        onChange({ cta: { ...value.cta, label } })
                    }
                    onActionChange={(href) =>
                        onChange({ cta: { ...value.cta, href } })
                    }
                />
            </FieldGroup>

            <FieldGroup
                title="Gallery"
                description="The photographs that run sideways in this section."
                toolbar={
                    <AddItemButton
                        onClick={() =>
                            onChange({
                                tiles: [
                                    ...value.tiles,
                                    {
                                        id: `tile-${Date.now()}`,
                                        image: "",
                                        imageAlt: "",
                                        objectPosition: "center",
                                    },
                                ],
                            })
                        }
                    >
                        Add photo
                    </AddItemButton>
                }
            >
                {value.tiles.map((tile, index) => (
                    <ListItemCard key={tile.id} title={`Photo ${index + 1}`}>
                        <div className="flex justify-end">
                            <ListControls
                                index={index}
                                length={value.tiles.length}
                                onMove={(delta) =>
                                    onChange({
                                        tiles: moveItem(
                                            value.tiles,
                                            index,
                                            delta,
                                        ),
                                    })
                                }
                                onRemove={() =>
                                    onChange({
                                        tiles: value.tiles.filter(
                                            (_, i) => i !== index,
                                        ),
                                    })
                                }
                            />
                        </div>
                        <PhotoFields
                            label="Photo"
                            image={tile.image}
                            imageAlt={tile.imageAlt}
                            imageFocus={tile.objectPosition}
                            usage={`Life at TBM ${index + 1}`}
                            onImageChange={(image) =>
                                onChange({
                                    tiles: replaceAt(value.tiles, index, {
                                        image,
                                    }),
                                })
                            }
                            onAltChange={(imageAlt) =>
                                onChange({
                                    tiles: replaceAt(value.tiles, index, {
                                        imageAlt,
                                    }),
                                })
                            }
                            onFocusChange={(objectPosition) =>
                                onChange({
                                    tiles: replaceAt(value.tiles, index, {
                                        objectPosition,
                                    }),
                                })
                            }
                        />
                    </ListItemCard>
                ))}
            </FieldGroup>
        </>
    );
}

function FinalCtaForm({
    value,
    onChange,
}: {
    value: FinalCtaContent;
    onChange: (patch: Partial<FinalCtaContent>) => void;
}) {
    return (
        <>
            <FieldGroup title="Heading and copy">
                <TextInput
                    label="Heading, upright part"
                    value={value.headingLead}
                    onChange={(headingLead) => onChange({ headingLead })}
                />
                <TextInput
                    label="Heading, italic part"
                    value={value.headingItalic}
                    onChange={(headingItalic) => onChange({ headingItalic })}
                />
                <TextAreaInput
                    label="Body"
                    value={value.body}
                    onChange={(body) => onChange({ body })}
                    rows={2}
                />
                <CtaField
                    label="Button"
                    text={value.cta.label}
                    action={value.cta.href}
                    onTextChange={(label) =>
                        onChange({ cta: { ...value.cta, label } })
                    }
                    onActionChange={(href) =>
                        onChange({ cta: { ...value.cta, href } })
                    }
                />
            </FieldGroup>

            <FieldGroup title="Background photo">
                <PhotoFields
                    label="Background photo"
                    image={value.backgroundImage}
                    imageAlt={value.backgroundImageAlt}
                    imageFocus={value.imageFocus}
                    usage="Home closing banner"
                    onImageChange={(backgroundImage) =>
                        onChange({ backgroundImage })
                    }
                    onAltChange={(backgroundImageAlt) =>
                        onChange({ backgroundImageAlt })
                    }
                    onFocusChange={(imageFocus) => onChange({ imageFocus })}
                />
            </FieldGroup>
        </>
    );
}

/* ************************************************************
                        PAGE
************************************************************ */
export default function HomeInputs({
    initialContent,
    initialTitle,
    initialDescription,
    initialMetaTitle,
    initialMetaDescription,
}: HomeInputsProps) {
    const [section, setSection] = useState<SectionKey>("hero");
    const [content, setContent] = useState<HomePageContent>(initialContent);
    const [metaTitle, setMetaTitle] = useState(initialMetaTitle);
    const [metaDescription, setMetaDescription] = useState(
        initialMetaDescription,
    );
    const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
        "idle",
    );

    const home = useUpdatePage<HomePageContent>("home");

    /** One patch helper per section keeps the call sites short. */
    const patch =
        <K extends keyof HomePageContent>(key: K) =>
        (value: Partial<HomePageContent[K]>) =>
            setContent((previous) => ({
                ...previous,
                [key]: { ...previous[key], ...value },
            }));

    const handleSave = async () => {
        setSaveStatus("idle");
        try {
            await home.updatePage({
                slug: "home",
                title: initialTitle,
                description: initialDescription,
                content,
            });

            const seo = await upsertSeoEntryAction({
                slug: "home",
                metaTitle,
                metaDescription,
            });
            if (!seo?.success) {
                throw new Error("The page content saved, but the meta did not.");
            }

            setSaveStatus("success");
            toast.success("Home page saved. The live site is updated.");
        } catch (error) {
            console.error("Saving the home page failed:", error);
            setSaveStatus("error");
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Could not save. Check you are still signed in.",
            );
        }
    };

    const isSaving = home.isSaving;

    return (
        <>
            <SaveBanner
                pageTitle="Home"
                onSave={handleSave}
                isSaving={isSaving}
                saveStatus={saveStatus}
            />
            <AdminPageShell
                sidebar={
                    <div className="space-y-4">
                        <SectionSidebar
                            tabs={SECTIONS}
                            active={section}
                            onChange={setSection}
                        />
                        <PageMetaPanel
                            url="/"
                            urlLockedReason="The home page always lives at the root of the site."
                            metaTitle={metaTitle}
                            onMetaTitleChange={setMetaTitle}
                            metaDescription={metaDescription}
                            onMetaDescriptionChange={setMetaDescription}
                        />
                    </div>
                }
            >
                {section === "hero" && (
                    <HeroForm value={content.hero} onChange={patch("hero")} />
                )}
                {section === "belong" && (
                    <BelongForm
                        value={content.belong}
                        onChange={patch("belong")}
                    />
                )}
                {section === "twoStudios" && (
                    <TwoStudiosForm
                        value={content.twoStudios}
                        onChange={patch("twoStudios")}
                    />
                )}
                {section === "twentyOneDay" && (
                    <TwentyOneDayForm
                        value={content.twentyOneDay}
                        onChange={patch("twentyOneDay")}
                    />
                )}
                {section === "whyPeopleStay" && (
                    <WhyPeopleStayForm
                        value={content.whyPeopleStay}
                        onChange={patch("whyPeopleStay")}
                    />
                )}
                {section === "greatTeaching" && (
                    <GreatTeachingForm
                        value={content.greatTeaching}
                        onChange={patch("greatTeaching")}
                    />
                )}
                {section === "privatePilates" && (
                    <PrivatePilatesForm
                        value={content.privatePilates}
                        onChange={patch("privatePilates")}
                    />
                )}
                {section === "lifeAtTbm" && (
                    <LifeAtTbmForm
                        value={content.lifeAtTbm}
                        onChange={patch("lifeAtTbm")}
                    />
                )}
                {section === "finalCta" && (
                    <FinalCtaForm
                        value={content.finalCta}
                        onChange={patch("finalCta")}
                    />
                )}
            </AdminPageShell>
        </>
    );
}
