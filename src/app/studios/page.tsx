/* ************************************************************
   /studios — the studios hub.

   Hero + The Difference + "Want both?" band.

   The Difference is one set of cells that reflows: on desktop
   each comparison row puts the studios side by side; on a phone
   the same cells become one complete card per studio, each
   carrying its own name and its own rows. Nothing is duplicated,
   so a value lives in exactly one place in the DOM and no row
   can end up orphaned from its studio.

   The cells are emitted row by row, studio within row, which is
   what the odd/even reflow in globals.css relies on. That holds
   for any number of rows, so a row can be added in the panel.

   Editable at /admin/studios. Fallback copy in ./_config.
************************************************************ */

import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { PhotoHero } from "@/components/core/PageHero";
import getPage from "@/server-actions/page";
import { buildPageMetadata } from "@/utils/seo";
import {
    STUDIOS_SLUG,
    studiosFallbackData,
    type StudioSummary,
    type StudiosPageProps,
} from "./_config";
import { externalLinkProps } from "@/utils/links";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata(STUDIOS_SLUG);
}

function StudioCard({ studio }: { studio: StudioSummary }) {
    return (
        <Link
            href={studio.href}
            {...externalLinkProps(studio.href)}
            style={{
                background: "#ebe8e0",
                display: "flex",
                flexDirection: "column",
                gap: 24,
                padding: "12px 12px 8px",
                color: "var(--tbm-ink)",
                textDecoration: "none",
            }}
        >
            <div className="tbm-media-zoom">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={studio.image}
                    alt={studio.imageAlt}
                    style={{
                        width: "100%",
                        aspectRatio: "3 / 2",
                        objectFit: "cover",
                        objectPosition: studio.imageFocus,
                    }}
                />
            </div>
            <span
                style={{
                    display: "block",
                    padding: "0 20px",
                    fontSize: "clamp(26px, 3.4vw, 48px)",
                    lineHeight: 1.05,
                    letterSpacing: "-.01em",
                }}
            >
                {studio.name}
            </span>
        </Link>
    );
}

function ComparisonCell({
    label,
    value,
    studio,
    isLast,
}: {
    label: string;
    value: string;
    studio: string;
    isLast: boolean;
}) {
    return (
        <div
            className={`tbm-cmp-cell${isLast ? " tbm-cmp-cell-last" : ""}`}
            role="group"
            aria-label={`${studio}: ${label}`}
        >
            <div className="tbm-cmp-row">
                <span
                    className="tbm-lbl"
                    style={{ color: "var(--tbm-bronze-label)" }}
                >
                    {label}
                </span>
                <span
                    style={{
                        fontSize: 18,
                        lineHeight: 1.5,
                        color: "var(--tbm-ink)",
                    }}
                >
                    {value}
                </span>
            </div>
        </div>
    );
}

export default async function StudiosPage() {
    const page = await getPage<StudiosPageProps>(
        STUDIOS_SLUG,
        studiosFallbackData,
    );
    const { hero, difference, wantBoth } = page.content;
    const { studios, rows } = difference;

    return (
        <>
            <PhotoHero content={hero} />

            {/* ============ THE DIFFERENCE ============ */}
            <section style={{ paddingTop: 75, paddingBottom: 75 }}>
                <div className="tbm-wrap">
                    <div className="tbm-g12" style={{ rowGap: 0 }}>
                        <Reveal amount={0.5} className="tbm-c-all">
                            <h2
                                className="tbm-lbl"
                                style={{
                                    margin: "0 auto 32px",
                                    background: "var(--tbm-forest)",
                                    color: "var(--tbm-cream)",
                                    fontSize: 13,
                                    padding: "10px 20px",
                                    display: "inline-block",
                                }}
                            >
                                {difference.label}
                            </h2>
                        </Reveal>

                        {/* Cells go out row by row, studio within row. The
                            mobile reflow groups them back into one card per
                            studio from that order. */}
                        <div
                            className="tbm-c-all tbm-cmp"
                            style={{
                                gridTemplateColumns: `repeat(${studios.length}, minmax(0, 1fr))`,
                            }}
                        >
                            {studios.map((studio, i) => (
                                <Reveal
                                    key={studio.id}
                                    amount={0.2}
                                    delay={i * 0.14}
                                >
                                    <StudioCard studio={studio} />
                                </Reveal>
                            ))}

                            {rows.map((row, rowIndex) =>
                                studios.map((studio, studioIndex) => (
                                    <ComparisonCell
                                        key={`${row.id}-${studio.id}`}
                                        label={row.label}
                                        value={row.values[studioIndex] ?? ""}
                                        studio={studio.name}
                                        isLast={rowIndex === rows.length - 1}
                                    />
                                )),
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ WANT BOTH? forest band ============ */}
            <section
                style={{
                    color: "var(--tbm-cream)",
                    background: "var(--tbm-forest)",
                    paddingTop: 75,
                    paddingBottom: 75,
                }}
            >
                <div
                    className="tbm-wrap"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        gap: 20,
                    }}
                >
                    <Reveal amount={0.3}>
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 400,
                                fontSize: "clamp(36px, 4vw, 56px)",
                                lineHeight: 1.1,
                                letterSpacing: "-.01em",
                            }}
                        >
                            {wantBoth.heading}
                        </h2>
                    </Reveal>
                    <Reveal amount={0.3} delay={0.08}>
                        <p
                            style={{
                                margin: 0,
                                fontSize: "clamp(24px, 2.4vw, 32px)",
                                lineHeight: 1.35,
                                fontStyle: "italic",
                                color: "var(--tbm-cream)",
                                maxWidth: "24em",
                            }}
                        >
                            {wantBoth.body}
                        </p>
                    </Reveal>
                    <Reveal amount={0.3} delay={0.16} style={{ marginTop: 12 }}>
                        <Link
                            className="tbm-btn"
                            href={wantBoth.cta.href}
                            {...externalLinkProps(wantBoth.cta.href)}
                            style={{
                                background: "var(--tbm-cream)",
                                color: "var(--tbm-forest)",
                            }}
                        >
                            {wantBoth.cta.label}
                        </Link>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
