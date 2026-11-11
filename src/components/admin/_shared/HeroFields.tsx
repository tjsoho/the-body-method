"use client";

/* ************************************************************
                        NOTES
   The hero form every page editor uses, so the fields sit in
   the same order and read the same way on all of them.
************************************************************ */

import {
    FieldGroup,
    ImageFocusInput,
    ImageInput,
    ParagraphListInput,
    TextAreaInput,
    TextInput,
} from "@/components/admin/_shared/form-primitives";
import type {
    BandHeroContent,
    PhotoHeroContent,
} from "@/components/core/PageHero";

export function PhotoHeroFields({
    value,
    onChange,
    usage,
}: {
    value: PhotoHeroContent;
    onChange: (patch: Partial<PhotoHeroContent>) => void;
    usage: string;
}) {
    return (
        <>
            <FieldGroup
                title="Headline and copy"
                description="The headline sits over the photo, with each line underneath it."
            >
                <TextAreaInput
                    label="Heading"
                    value={value.heading}
                    onChange={(heading) => onChange({ heading })}
                    rows={2}
                />
                <ParagraphListInput
                    label="Lines under the heading"
                    values={value.lines}
                    onChange={(lines) => onChange({ lines })}
                    addLabel="Add line"
                    rows={2}
                />
            </FieldGroup>

            <FieldGroup title="Hero photo">
                <ImageInput
                    label="Photo"
                    value={value.image}
                    onChange={(image) => onChange({ image })}
                    altValue={value.imageAlt}
                    onAltChange={(imageAlt) => onChange({ imageAlt })}
                    usage={usage}
                    hint="Click the thumbnail to open the media library"
                />
                <TextInput
                    label="Image path"
                    value={value.image}
                    onChange={(image) => onChange({ image })}
                    placeholder="/images/tbm-placeholders/example.jpg"
                />
                <ImageFocusInput
                    value={value.imageFocus}
                    onChange={(imageFocus) => onChange({ imageFocus })}
                />
            </FieldGroup>
        </>
    );
}

export function BandHeroFields({
    value,
    onChange,
}: {
    value: BandHeroContent;
    onChange: (patch: Partial<BandHeroContent>) => void;
}) {
    return (
        <FieldGroup
            title="Headline and copy"
            description="This page opens on a forest band rather than a photograph."
        >
            <TextAreaInput
                label="Heading"
                value={value.heading}
                onChange={(heading) => onChange({ heading })}
                rows={2}
            />
            <ParagraphListInput
                label="Lines under the heading"
                values={value.lines}
                onChange={(lines) => onChange({ lines })}
                addLabel="Add line"
                rows={2}
            />
            <TextAreaInput
                label="Closing line"
                value={value.emphasisLine}
                onChange={(emphasisLine) => onChange({ emphasisLine })}
                rows={2}
                hint="Set larger and italic. Leave empty to hide."
            />
        </FieldGroup>
    );
}

/* ************************************************************
   PhotoFields

   Any photo that is not the hero: thumbnail picker, the path as
   text for anyone who would rather paste one, alt text, and the
   crop slider when the image is one the layout crops.
************************************************************ */
export function PhotoFields({
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
                <ImageFocusInput value={imageFocus} onChange={onFocusChange} />
            )}
        </div>
    );
}
