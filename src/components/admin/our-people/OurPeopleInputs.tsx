"use client";

/* ************************************************************
                        NOTES
   The /our-people editor.

   The teaching roster lives here, because this is the page the
   profiles are read on. The home page shows the same list as a
   strip, so a change here reaches both. Two rows are written on
   save: this page's own content, and the shared roster.
************************************************************ */

import { useCallback, useState } from "react";
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
import TeacherRosterField from "@/components/admin/_shared/TeacherRosterField";
import { usePageEditor } from "@/components/admin/_shared/usePageEditor";
import useUpdatePage from "@/utils/hooks/useUpdatePage";
import { TEACHERS_SLUG, type Teacher } from "@/data/teachers";
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
    initialTeachers,
}: {
    initialContent: OurPeopleContent;
    initialTitle: string;
    initialDescription: string;
    initialMetaTitle: string;
    initialMetaDescription: string;
    initialTeachers: Teacher[];
}) {
    const [section, setSection] = useState<SectionKey>("hero");
    const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
    const roster = useUpdatePage<{ teachers: Teacher[] }>(TEACHERS_SLUG);

    // The roster is its own row, written alongside this page's.
    const saveRoster = useCallback(async () => {
        await roster.updatePage({
            slug: TEACHERS_SLUG,
            title: "Our teachers",
            description:
                "The teaching roster, shared by the home page and /our-people.",
            content: { teachers },
        });
    }, [roster, teachers]);

    const editor = usePageEditor<OurPeopleContent>({
        slug: OUR_PEOPLE_SLUG,
        pageTitle: "Our People",
        initialContent,
        initialTitle,
        initialDescription,
        initialMetaTitle,
        initialMetaDescription,
        onSaveExtra: saveRoster,
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
            isSaving={editor.isSaving || roster.isSaving}
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
                <>
                    <FieldGroup title="Section heading">
                        <TextInput
                            label="Heading above the carousel"
                            value={content.roster.heading}
                            onChange={(heading) => patch("roster")({ heading })}
                        />
                    </FieldGroup>
                    <TeacherRosterField
                        teachers={teachers}
                        onChange={setTeachers}
                    />
                </>
            )}
        </EditorShell>
    );
}
