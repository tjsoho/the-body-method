"use client";

/* ************************************************************
                        NOTES
   MEET OUR TEACHERS — carousel + profile popup.

   Ten full profiles stacked vertically made /our-people an
   endless scroll. Instead the roster rides a carousel (three up
   on desktop, one card and a peek of the next on a phone) that
   advances itself every three seconds, and tapping a card opens
   that teacher's full profile in a modal.

   Every profile stays in the DOM inside the dialog — inactive
   ones carry the `hidden` attribute rather than being unmounted —
   so all ten bios ship in the HTML and a
   /our-people#teacher-name link opens straight onto one.

   The whole card is the click target (photo, name and the READ
   PROFILE link all open the same profile) via a stretched
   pseudo-element on the button: one real control, one accessible
   name, no nested interactive elements.
************************************************************ */

/* ************************************************************
                        IMPORTS
************************************************************ */
import { useCallback, useEffect, useRef, useState } from "react";
import {
    TbmCarousel,
    TbmCarouselPager,
    TbmCarouselSlide,
    TbmCarouselViewport,
} from "@/components/carousel/TbmCarousel";
import { externalLinkProps } from "@/utils/links";
import type { Teacher, TeacherFieldBlock } from "@/data/teachers";

/* How long each card holds before the track steps on. */
const AUTOPLAY_MS = 3000;

/* ************************************************************
                        Components
************************************************************ */

/** A field's body: paragraphs and plain lists. */
function FieldBlocks({ blocks }: { blocks?: TeacherFieldBlock[] }) {
    if (!blocks) return null;
    return (
        <>
            {blocks.map((b, i) =>
                b.type === "p" ? (
                    <p
                        key={i}
                        style={{
                            margin: 0,
                            fontSize: 16,
                            lineHeight: 1.8,
                            color: "var(--tbm-text-body)",
                        }}
                    >
                        {b.text}
                    </p>
                ) : (
                    <ul
                        key={i}
                        style={{
                            listStyle: "none",
                            margin: 0,
                            padding: 0,
                            fontSize: 16,
                            lineHeight: 1.8,
                            color: "var(--tbm-text-body)",
                        }}
                    >
                        {b.items.map((it, j) => (
                            <li key={j}>{it}</li>
                        ))}
                    </ul>
                ),
            )}
        </>
    );
}

/** The opened profile: portrait, name, every field, class CTA. */
function TeacherProfile({ teacher }: { teacher: Teacher }) {
    return (
        <article className="tbm-modal-grid">
            <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={teacher.image}
                    alt={teacher.imageAlt}
                    style={{
                        width: "100%",
                        aspectRatio: "4 / 5",
                        objectFit: "cover",
                        objectPosition: "center",
                    }}
                />
            </div>
            <div
                style={{ display: "flex", flexDirection: "column", gap: 28 }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                    }}
                >
                    <h3
                        id={`profile-${teacher.slug}`}
                        style={{
                            margin: 0,
                            fontWeight: 400,
                            fontSize: "clamp(30px, 3vw, 44px)",
                            lineHeight: 1.1,
                        }}
                    >
                        {teacher.name}
                    </h3>
                    {teacher.role ? (
                        <p
                            className="tbm-lbl"
                            style={{
                                margin: 0,
                                color: "var(--tbm-bronze-label)",
                            }}
                        >
                            {teacher.role}
                        </p>
                    ) : null}
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 28,
                        borderTop: "1px solid var(--tbm-rule)",
                        paddingTop: 28,
                    }}
                >
                    {teacher.fields.map((f, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 10,
                            }}
                        >
                            {f.label ? (
                                <h4
                                    className="tbm-lbl"
                                    style={{
                                        margin: 0,
                                        color: "var(--tbm-bronze-label)",
                                    }}
                                >
                                    {f.label}
                                </h4>
                            ) : null}
                            <FieldBlocks blocks={f.blocks} />
                        </div>
                    ))}
                </div>
                {teacher.cta ? (
                    <div>
                        <a
                            className="tbm-btn"
                            href={teacher.cta.href}
                            {...externalLinkProps(teacher.cta.href)}
                            style={{
                                background: "var(--tbm-ink)",
                                color: "var(--tbm-cream)",
                            }}
                        >
                            {teacher.cta.label}
                        </a>
                    </div>
                ) : null}
            </div>
        </article>
    );
}

/** One card in the track. The whole card opens the profile. */
function TeacherCard({
    teacher,
    onOpen,
}: {
    teacher: Teacher;
    onOpen: () => void;
}) {
    return (
        <article className="tbm-teacher-card">
            <div className="tbm-media-zoom">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={teacher.image}
                    alt={teacher.imageAlt}
                    style={{
                        width: "100%",
                        aspectRatio: "4 / 5",
                        objectFit: "cover",
                        objectPosition: "center",
                    }}
                />
            </div>
            <h3
                className="tbm-teacher-name"
                style={{
                    margin: 0,
                    fontWeight: 400,
                    fontSize: 24,
                    lineHeight: 1.25,
                }}
            >
                {teacher.name}
            </h3>
            {teacher.role ? (
                <p
                    className="tbm-lbl"
                    style={{ margin: 0, color: "var(--tbm-bronze-label)" }}
                >
                    {teacher.role}
                </p>
            ) : null}
            {teacher.teaser ? (
                <p
                    style={{
                        margin: 0,
                        fontSize: 16,
                        lineHeight: 1.6,
                        color: "var(--tbm-text-muted)",
                    }}
                >
                    {teacher.teaser}
                </p>
            ) : null}
            <button
                type="button"
                className="tbm-card-btn tbm-lnk"
                aria-haspopup="dialog"
                aria-label={`Read ${teacher.name}'s profile`}
                onClick={onOpen}
                style={{
                    marginTop: "auto",
                    padding: 0,
                    background: "transparent",
                    border: 0,
                    borderBottom: "1px solid var(--tbm-bronze-label)",
                    color: "var(--tbm-bronze-label)",
                    cursor: "pointer",
                }}
            >
                READ PROFILE <span aria-hidden="true">{"→"}</span>
            </button>
        </article>
    );
}

/* ************************************************************
                        RENDER
************************************************************ */
export default function TeacherCarousel({
    teachers,
}: {
    teachers: Teacher[];
}) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [deepLinkIndex, setDeepLinkIndex] = useState<number | undefined>(
        undefined,
    );
    const dialogRef = useRef<HTMLDialogElement>(null);

    const close = useCallback(() => setOpenIndex(null), []);

    // showModal gives the dialog the top layer, Escape, the backdrop and
    // a scroll lock for free, so all this has to do is keep the element
    // in step with React state.
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (openIndex !== null && !dialog.open) dialog.showModal();
        if (openIndex === null && dialog.open) dialog.close();
    }, [openIndex]);

    // A /our-people#susie-tagarro link opens that profile. The
    // hashchange listener covers arriving at another teacher while
    // already on the page.
    useEffect(() => {
        const openFromHash = () => {
            const slug = window.location.hash.replace("#", "");
            if (!slug) return;
            const i = teachers.findIndex((t) => t.slug === slug);
            if (i < 0) return;
            setOpenIndex(i);
            setDeepLinkIndex(i);
        };
        openFromHash();
        window.addEventListener("hashchange", openFromHash);
        return () => window.removeEventListener("hashchange", openFromHash);
    }, [teachers]);

    const openTeacher = teachers[openIndex ?? -1];

    return (
        <TbmCarousel
            activeIndex={deepLinkIndex}
            autoplay={AUTOPLAY_MS}
            autoplayPaused={openIndex !== null}
        >
            <TbmCarouselViewport
                className="tbm-c-all"
                label="Our teachers"
                basis="33.3333%"
                basisMobile="84%"
            >
                {teachers.map((t, i) => (
                    <TbmCarouselSlide
                        key={t.slug}
                        position={i + 1}
                        total={teachers.length}
                    >
                        <TeacherCard
                            teacher={t}
                            onOpen={() => setOpenIndex(i)}
                        />
                    </TbmCarouselSlide>
                ))}
            </TbmCarouselViewport>

            <TbmCarouselPager
                className="tbm-c-all"
                colour="var(--tbm-ink)"
                contrast="var(--tbm-sand)"
                labelPrev="Previous teachers"
                labelNext="More teachers"
            />

            {/* One dialog holding all ten profiles. Clicking the dialog
                itself (not the panel inside it) is a backdrop click. */}
            <dialog
                ref={dialogRef}
                className="tbm-modal"
                aria-labelledby={
                    openTeacher ? `profile-${openTeacher.slug}` : undefined
                }
                onClose={close}
                onClick={(e) => {
                    if (e.target === dialogRef.current) close();
                }}
            >
                <div className="tbm-modal-panel">
                    <button
                        type="button"
                        className="tbm-modal-close"
                        aria-label="Close profile"
                        autoFocus
                        onClick={close}
                    >
                        <span aria-hidden="true">{"×"}</span>
                    </button>
                    {teachers.map((t, i) => (
                        <div key={t.slug} hidden={i !== openIndex}>
                            <TeacherProfile teacher={t} />
                        </div>
                    ))}
                </div>
            </dialog>
        </TbmCarousel>
    );
}
