"use client";

/* ************************************************************
                        NOTES
   The /faq editor.

   Groups hold questions, questions hold answers, and all three
   can be added, reordered and removed. The structured data the
   page emits is derived from the same answers, so there is
   nothing extra to keep in step here.
************************************************************ */

import { useState } from "react";
import {
    FaqGroupsInput,
    FieldGroup,
    RichTextInput,
    TextInput,
} from "@/components/admin/_shared/form-primitives";
import { EditorShell } from "@/components/admin/_shared/EditorShell";
import { BandHeroFields } from "@/components/admin/_shared/HeroFields";
import { usePageEditor } from "@/components/admin/_shared/usePageEditor";
import { FAQ_SLUG, type FaqContent } from "@/app/faq/_config";

type SectionKey = "hero" | "groups" | "closing";

const SECTIONS: { value: SectionKey; label: string }[] = [
    { value: "hero", label: "1. Hero" },
    { value: "groups", label: "2. Questions" },
    { value: "closing", label: "3. Closing band" },
];

export default function FaqInputs({
    initialContent,
    initialTitle,
    initialDescription,
    initialMetaTitle,
    initialMetaDescription,
}: {
    initialContent: FaqContent;
    initialTitle: string;
    initialDescription: string;
    initialMetaTitle: string;
    initialMetaDescription: string;
}) {
    const [section, setSection] = useState<SectionKey>("hero");
    const editor = usePageEditor<FaqContent>({
        slug: FAQ_SLUG,
        pageTitle: "FAQ",
        initialContent,
        initialTitle,
        initialDescription,
        initialMetaTitle,
        initialMetaDescription,
    });

    const { content, patch, setField } = editor;

    const questionCount = content.groups.reduce(
        (sum, group) => sum + group.items.length,
        0,
    );

    return (
        <EditorShell
            pageTitle="FAQ"
            urlPath="/faq"
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
                <BandHeroFields value={content.hero} onChange={patch("hero")} />
            )}

            {section === "groups" && (
                <FaqGroupsInput
                    groups={content.groups}
                    onChange={(groups) => setField("groups", groups)}
                    description={`${questionCount} questions across ${content.groups.length} groups. Google reads these as structured data, so clear questions are worth the effort.`}
                />
            )}

            {section === "closing" && (
                <FieldGroup
                    title="Closing band"
                    description="The sand band at the foot of the page."
                >
                    <TextInput
                        label="Heading"
                        value={content.closing.heading}
                        onChange={(heading) => patch("closing")({ heading })}
                    />
                    <RichTextInput
                        label="Copy"
                        value={content.closing.body}
                        onChange={(body) => patch("closing")({ body })}
                        rows={3}
                    />
                </FieldGroup>
            )}
        </EditorShell>
    );
}
