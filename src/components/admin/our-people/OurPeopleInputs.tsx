"use client";

/* ************************************************************
                        NOTES
   The /our-people editor.

   The teaching roster is deliberately not here. It is shared
   with the home page, so it is edited in one place, on the Home
   editor, and this page only owns its own copy.
************************************************************ */

import { useState } from "react";
import {
    FieldGroup,
    RichTextInput,
    TextAreaInput,
    TextInput,
} from "@/components/admin/_shared/form-primitives";
import { EditorShell } from "@/components/admin/_shared/EditorShell";
import {
    PhotoFields,
    PhotoHeroFields,
} from "@/components/admin/_shared/HeroFields";
import { usePageEditor } from "@/components/admin/_shared/usePageEditor";
import {
    OUR_PEOPLE_SLUG,
    type OurPeopleContent,
} from "@/app/our-people/_config";

type SectionKey = "hero" | "owner" | "roster";

const SECTIONS: { value: SectionKey; label: string }[] = [
    { value: "hero", label: "1. Hero" },
    { value: "owner", label: "2. Sarah" },
    { value: "roster", label: "3. Teachers" },
];

export default function OurPeopleInputs({
    initialContent,
    initialTitle,
    initialDescription,
    initialMetaTitle,
    initialMetaDescription,
}: {
    initialContent: OurPeopleContent;
    initialTitle: string;
    initialDescription: string;
    initialMetaTitle: string;
    initialMetaDescription: string;
}) {
    const [section, setSection] = useState<SectionKey>("hero");
    const editor = usePageEditor<OurPeopleContent>({
        slug: OUR_PEOPLE_SLUG,
        pageTitle: "Our People",
        initialContent,
        initialTitle,
        initialDescription,
        initialMetaTitle,
        initialMetaDescription,
    });

    const { content, patch } = editor;
    const setOwner = patch("owner");

    const replaceParagraph = (index: number, text: string) =>
        setOwner({
            body: content.owner.body.map((p, i) => (i === index ? text : p)),
        });

    return (
        <EditorShell
            pageTitle="Our People"
            urlPath="/our-people"
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
                    usage="Our People hero"
                />
            )}

            {section === "owner" && (
                <>
                    <FieldGroup title="Heading">
                        <TextAreaInput
                            label="Heading"
                            value={content.owner.heading}
                            onChange={(heading) => setOwner({ heading })}
                            rows={2}
                        />
                    </FieldGroup>
                    <FieldGroup
                        title="Story"
                        description="One box per paragraph, in order."
                        toolbar={null}
                    >
                        {content.owner.body.map((para, index) => (
                            <RichTextInput
                                key={index}
                                label={`Paragraph ${index + 1}`}
                                value={para}
                                onChange={(text) =>
                                    replaceParagraph(index, text)
                                }
                                rows={5}
                            />
                        ))}
                    </FieldGroup>
                    <FieldGroup title="Photo">
                        <PhotoFields
                            label="Portrait"
                            image={content.owner.image}
                            imageAlt={content.owner.imageAlt}
                            usage="Our People: owner"
                            onImageChange={(image) => setOwner({ image })}
                            onAltChange={(imageAlt) => setOwner({ imageAlt })}
                        />
                    </FieldGroup>
                </>
            )}

            {section === "roster" && (
                <FieldGroup
                    title="Teachers section"
                    description="Only the heading lives here. The teachers themselves are shared with the home page, so they are edited under Teaching roster on the Home editor."
                >
                    <TextInput
                        label="Heading"
                        value={content.roster.heading}
                        onChange={(heading) =>
                            patch("roster")({ heading })
                        }
                    />
                </FieldGroup>
            )}
        </EditorShell>
    );
}
