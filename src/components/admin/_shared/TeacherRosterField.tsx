"use client";

/* ************************************************************
                        NOTES
   The teaching roster editor.

   One list, used by the home strip and by the Our People
   carousel, so a name or a photograph is only ever changed in
   one place.

   A teacher has two layers. The card fields (photo, name,
   discipline, the one-line teaser) are what the carousels show.
   The profile sections are the long-form bio behind the popup:
   each section is a heading plus a stack of blocks, and a block
   is either a paragraph or a bullet list. That shape comes
   straight from how the profiles render, so what is edited here
   is what appears there.
************************************************************ */

import {
    AddItemButton,
    CtaField,
    FieldGroup,
    ListItemCard,
    ParagraphListInput,
    SelectInput,
    SubtleButton,
    TextAreaInput,
    TextInput,
} from "@/components/admin/_shared/form-primitives";
import ListControls, {
    moveItem,
    removeAt,
    replaceAt,
} from "@/components/admin/_shared/ListControls";
import { PhotoFields } from "@/components/admin/_shared/HeroFields";
import type {
    Teacher,
    TeacherField,
    TeacherFieldBlock,
} from "@/data/teachers";

const slugify = (value: string) =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

/* ------------------------------------------------------------
   One block: a paragraph or a bullet list.
   ------------------------------------------------------------ */
function BlockField({
    block,
    index,
    length,
    onChange,
    onMove,
    onRemove,
}: {
    block: TeacherFieldBlock;
    index: number;
    length: number;
    onChange: (next: TeacherFieldBlock) => void;
    onMove: (delta: number) => void;
    onRemove: () => void;
}) {
    return (
        <div className="rounded-lg border border-[rgba(18,23,23,0.10)] bg-white p-3 space-y-3">
            <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-black/45">
                    {block.type === "ul" ? "Bullet list" : "Paragraph"}
                </span>
                <ListControls
                    index={index}
                    length={length}
                    onMove={onMove}
                    onRemove={onRemove}
                    minimum={1}
                />
            </div>

            <SelectInput
                label="Block type"
                value={block.type}
                onChange={(type) =>
                    onChange(
                        type === "ul"
                            ? {
                                  type: "ul",
                                  items:
                                      block.type === "p" && block.text
                                          ? [block.text]
                                          : [""],
                              }
                            : {
                                  type: "p",
                                  text:
                                      block.type === "ul"
                                          ? block.items.join(" ")
                                          : "",
                              },
                    )
                }
                options={[
                    { value: "p", label: "Paragraph" },
                    { value: "ul", label: "Bullet list" },
                ]}
            />

            {block.type === "p" ? (
                <TextAreaInput
                    label="Text"
                    value={block.text}
                    onChange={(text) => onChange({ type: "p", text })}
                    rows={5}
                />
            ) : (
                <ParagraphListInput
                    label="Bullets"
                    values={block.items}
                    onChange={(items) => onChange({ type: "ul", items })}
                    addLabel="Add bullet"
                    rows={2}
                />
            )}
        </div>
    );
}

/* ------------------------------------------------------------
   One profile section: a heading plus its blocks.
   ------------------------------------------------------------ */
function ProfileSectionField({
    field,
    index,
    length,
    onChange,
    onMove,
    onRemove,
}: {
    field: TeacherField;
    index: number;
    length: number;
    onChange: (next: TeacherField) => void;
    onMove: (delta: number) => void;
    onRemove: () => void;
}) {
    const blocks = field.blocks ?? [];

    return (
        <div className="rounded-lg border border-[rgba(18,23,23,0.10)] bg-[#fafbf7] p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-black/45">
                    Section {index + 1}
                </span>
                <ListControls
                    index={index}
                    length={length}
                    onMove={onMove}
                    onRemove={onRemove}
                    minimum={0}
                />
            </div>

            <TextInput
                label="Section heading"
                value={field.label ?? ""}
                onChange={(label) => onChange({ ...field, label })}
                placeholder="Short teaching philosophy"
            />

            <div className="space-y-3">
                {blocks.map((block, blockIndex) => (
                    <BlockField
                        key={blockIndex}
                        block={block}
                        index={blockIndex}
                        length={blocks.length}
                        onChange={(next) =>
                            onChange({
                                ...field,
                                blocks: blocks.map((b, i) =>
                                    i === blockIndex ? next : b,
                                ),
                            })
                        }
                        onMove={(delta) =>
                            onChange({
                                ...field,
                                blocks: moveItem(blocks, blockIndex, delta),
                            })
                        }
                        onRemove={() =>
                            onChange({
                                ...field,
                                blocks: removeAt(blocks, blockIndex),
                            })
                        }
                    />
                ))}

                <div className="flex flex-wrap gap-2">
                    <SubtleButton
                        variant="primary"
                        onClick={() =>
                            onChange({
                                ...field,
                                blocks: [...blocks, { type: "p", text: "" }],
                            })
                        }
                    >
                        Add paragraph
                    </SubtleButton>
                    <SubtleButton
                        variant="primary"
                        onClick={() =>
                            onChange({
                                ...field,
                                blocks: [...blocks, { type: "ul", items: [""] }],
                            })
                        }
                    >
                        Add bullet list
                    </SubtleButton>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------
   The roster
   ------------------------------------------------------------ */
export default function TeacherRosterField({
    teachers,
    onChange,
}: {
    teachers: Teacher[];
    onChange: (next: Teacher[]) => void;
}) {
    const sectionCount = teachers.reduce(
        (sum, t) => sum + (t.fields?.length ?? 0),
        0,
    );

    return (
        <FieldGroup
            title="Teachers"
            description={`${teachers.length} teachers, ${sectionCount} profile sections. This list is shared with the home page, so a change here shows in both carousels.`}
            toolbar={
                <AddItemButton
                    onClick={() =>
                        onChange([
                            ...teachers,
                            {
                                name: "",
                                slug: `teacher-${Date.now()}`,
                                role: "",
                                teaser: "",
                                image: "",
                                imageAlt: "",
                                fields: [],
                            },
                        ])
                    }
                >
                    Add teacher
                </AddItemButton>
            }
        >
            {teachers.map((teacher, index) => {
                const fields = teacher.fields ?? [];
                const patch = (changes: Partial<Teacher>) =>
                    onChange(replaceAt(teachers, index, changes));

                return (
                    <ListItemCard
                        key={teacher.slug}
                        title={teacher.name || `Teacher ${index + 1}`}
                    >
                        <div className="flex justify-end">
                            <ListControls
                                index={index}
                                length={teachers.length}
                                onMove={(delta) =>
                                    onChange(moveItem(teachers, index, delta))
                                }
                                onRemove={() =>
                                    onChange(removeAt(teachers, index))
                                }
                            />
                        </div>

                        <TextInput
                            label="Name"
                            value={teacher.name}
                            onChange={(name) =>
                                patch({
                                    name,
                                    slug: /^teacher-\d+$/.test(teacher.slug)
                                        ? slugify(name) || teacher.slug
                                        : teacher.slug,
                                })
                            }
                        />
                        <TextInput
                            label="Profile anchor"
                            value={teacher.slug}
                            onChange={(slug) => patch({ slug: slugify(slug) })}
                            hint="Used in the link /our-people#this-value"
                        />
                        <TextInput
                            label="Discipline line"
                            value={teacher.role ?? ""}
                            onChange={(role) => patch({ role })}
                            placeholder="Reformer Pilates"
                        />
                        <TextAreaInput
                            label="Card sentence"
                            value={teacher.teaser ?? ""}
                            onChange={(teaser) => patch({ teaser })}
                            rows={3}
                            hint="One sentence, shown on the carousel card"
                        />
                        <PhotoFields
                            label="Portrait"
                            image={teacher.image}
                            imageAlt={teacher.imageAlt}
                            usage={`Teacher ${teacher.name || index + 1}`}
                            onImageChange={(image) => patch({ image })}
                            onAltChange={(imageAlt) => patch({ imageAlt })}
                        />
                        <CtaField
                            label="Button on the profile"
                            text={teacher.cta?.label ?? ""}
                            action={teacher.cta?.href ?? ""}
                            onTextChange={(label) =>
                                patch({
                                    cta: {
                                        href: teacher.cta?.href ?? "",
                                        label,
                                    },
                                })
                            }
                            onActionChange={(href) =>
                                patch({
                                    cta: {
                                        label: teacher.cta?.label ?? "",
                                        href,
                                    },
                                })
                            }
                            textPlaceholder="Leave empty to hide the button"
                        />

                        <FieldGroup
                            title="Profile"
                            description="What people read when they open this teacher's card."
                            tone="tinted"
                            toolbar={
                                <AddItemButton
                                    onClick={() =>
                                        patch({
                                            fields: [
                                                ...fields,
                                                {
                                                    label: "",
                                                    blocks: [
                                                        { type: "p", text: "" },
                                                    ],
                                                },
                                            ],
                                        })
                                    }
                                >
                                    Add section
                                </AddItemButton>
                            }
                        >
                            {fields.length === 0 && (
                                <p className="text-[11px] text-brand-black/45">
                                    No profile sections yet. Add one and it
                                    appears when someone opens this card.
                                </p>
                            )}
                            {fields.map((field, fieldIndex) => (
                                <ProfileSectionField
                                    key={fieldIndex}
                                    field={field}
                                    index={fieldIndex}
                                    length={fields.length}
                                    onChange={(next) =>
                                        patch({
                                            fields: fields.map((f, i) =>
                                                i === fieldIndex ? next : f,
                                            ),
                                        })
                                    }
                                    onMove={(delta) =>
                                        patch({
                                            fields: moveItem(
                                                fields,
                                                fieldIndex,
                                                delta,
                                            ),
                                        })
                                    }
                                    onRemove={() =>
                                        patch({
                                            fields: removeAt(
                                                fields,
                                                fieldIndex,
                                            ),
                                        })
                                    }
                                />
                            ))}
                        </FieldGroup>
                    </ListItemCard>
                );
            })}
        </FieldGroup>
    );
}
