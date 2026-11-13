/* ************************************************************
   /studios/cornerstone — the larger movement studio.

   Hero, intro with the list of practices, "move differently"
   with three class tiles, the community feature, a grid of four
   cards (teacher, member story, timetable, location) and an FAQ.

   The FAQ now uses the shared accordion. It previously carried a
   `faq` class that is not defined anywhere, so its summaries had
   no styling and the plus icon never rotated.

   Editable at /admin/studios-cornerstone. Fallback in ./_config.
************************************************************ */

import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PhotoHero } from "@/components/core/PageHero";
import FaqList from "@/components/core/FaqList";
import getPage from "@/server-actions/page";
import { buildPageMetadata } from "@/utils/seo";
import {
    CORNERSTONE_SLUG,
    cornerstoneFallbackData,
    type CornerstonePageProps,
} from "./_config";
import { externalLinkProps } from "@/utils/links";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata(CORNERSTONE_SLUG);
}

const CARD_COLUMN = {
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: 16,
};

export default async function CornerstonePage() {
    const page = await getPage<CornerstonePageProps>(
        CORNERSTONE_SLUG,
        cornerstoneFallbackData,
    );
    const { hero, intro, moveDifferently, community, grid, faq } =
        page.content;

    return (
        <>
            <PhotoHero content={hero} />

            {/* ============ INTRO — portrait L + practice list R ============ */}
            <section style={{ paddingTop: 75, paddingBottom: 75 }}>
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48, alignItems: "center" }}
                >
                    <Reveal
                        amount={0.2}
                        className="tbm-c-l5"
                        style={{ position: "relative" }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={intro.image}
                            alt={intro.imageAlt}
                            style={{
                                width: "100%",
                                aspectRatio: "4 / 5",
                                objectFit: "cover",
                            }}
                        />
                    </Reveal>
                    <div
                        className="tbm-c-r"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 28,
                        }}
                    >
                        <Reveal amount={0.3}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "clamp(22px, 2vw, 28px)",
                                    lineHeight: 1.4,
                                    color: "var(--tbm-ink)",
                                }}
                            >
                                {intro.lede}
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.08}>
                            <ul
                                style={{
                                    listStyle: "none",
                                    margin: 0,
                                    padding: 0,
                                    borderBottom: "1px solid var(--tbm-rule)",
                                    display: "grid",
                                    gridTemplateColumns:
                                        "repeat(2, minmax(0, 1fr))",
                                    columnGap: 24,
                                }}
                            >
                                {intro.modalities.map((modality) => (
                                    <li
                                        key={modality}
                                        style={{
                                            borderTop:
                                                "1px solid var(--tbm-rule)",
                                            padding: "10px 0",
                                            fontSize:
                                                "clamp(28px, 2.8vw, 40px)",
                                            lineHeight: 1.15,
                                            color: "var(--tbm-ink)",
                                        }}
                                    >
                                        {modality}
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.16}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 24,
                                    lineHeight: 1.4,
                                    fontStyle: "italic",
                                    color: "var(--tbm-green-accent)",
                                }}
                            >
                                {intro.closer}
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ MOVE DIFFERENTLY — sand ============ */}
            <section
                style={{
                    background: "var(--tbm-sand)",
                    paddingTop: 75,
                    paddingBottom: 75,
                }}
            >
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48, alignItems: "start" }}
                >
                    <Reveal amount={0.3} className="tbm-c-l5">
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 400,
                                fontSize: "clamp(36px, 4vw, 56px)",
                                lineHeight: 1.1,
                                letterSpacing: "-.01em",
                            }}
                        >
                            {moveDifferently.heading}
                        </h2>
                    </Reveal>
                    <Reveal
                        amount={0.3}
                        delay={0.08}
                        className="tbm-c-r"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 12,
                        }}
                    >
                        {moveDifferently.body.map((para, i) => (
                            <p
                                key={i}
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-body)",
                                }}
                            >
                                {para}
                            </p>
                        ))}
                        <p
                            style={{
                                margin: 0,
                                fontSize: 24,
                                lineHeight: 1.4,
                                fontStyle: "italic",
                                color: "var(--tbm-green-accent)",
                                paddingTop: 12,
                            }}
                        >
                            {moveDifferently.closer}
                        </p>
                    </Reveal>

                    {/* Class tiles stagger left to right. */}
                    <Stagger
                        className="tbm-c-all tbm-g12"
                        style={{ rowGap: 24 }}
                        stagger={0.22}
                    >
                        {moveDifferently.cards.map((card) => (
                            <StaggerItem
                                key={card.id}
                                className="tbm-c-t"
                                style={{ position: "relative" }}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={card.image}
                                    alt={card.imageAlt}
                                    style={{
                                        width: "100%",
                                        aspectRatio: "4 / 5",
                                        objectFit: "cover",
                                        objectPosition: "center",
                                    }}
                                />
                            </StaggerItem>
                        ))}
                    </Stagger>

                    <div className="tbm-c-all">
                        <Reveal amount={0.5}>
                            <Link
                                className="tbm-btn"
                                href={moveDifferently.cta.href}
                                {...externalLinkProps(moveDifferently.cta.href)}
                                style={{
                                    background: "var(--tbm-ink)",
                                    color: "var(--tbm-cream)",
                                }}
                            >
                                {moveDifferently.cta.label}
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ COMMUNITY FEATURE — landscape L, text R ============ */}
            <section style={{ paddingTop: 75, paddingBottom: 75 }}>
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48, alignItems: "center" }}
                >
                    <Reveal
                        amount={0.2}
                        className="tbm-c-l"
                        style={{
                            position: "relative",
                            paddingRight: "clamp(0px, 2vw, 24px)",
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={community.image}
                            alt={community.imageAlt}
                            style={{
                                width: "100%",
                                aspectRatio: "3 / 2",
                                objectFit: "cover",
                                objectPosition: community.imageFocus,
                            }}
                        />
                    </Reveal>
                    <div
                        className="tbm-c-r"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 20,
                            paddingLeft: "clamp(0px, 3vw, 48px)",
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
                                {community.heading}
                            </h2>
                        </Reveal>
                        {community.body.map((para, i) => (
                            <Reveal key={i} amount={0.3} delay={0.08 + i * 0.08}>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 18,
                                        lineHeight: 1.7,
                                        color: "var(--tbm-text-body)",
                                    }}
                                >
                                    {para}
                                </p>
                            </Reveal>
                        ))}
                        <Reveal amount={0.3} delay={0.24}>
                            <div style={{ paddingTop: 8 }}>
                                <Link
                                    className="tbm-lnk"
                                    href={community.link.href}
                                    {...externalLinkProps(community.link.href)}
                                    style={{ color: "var(--tbm-forest)" }}
                                >
                                    {community.link.label}{" "}
                                    <span aria-hidden="true">&rarr;</span>
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ GRID + CTA — sand ============ */}
            <section
                style={{
                    background: "var(--tbm-sand)",
                    paddingTop: 75,
                    paddingBottom: 75,
                }}
            >
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 64, alignItems: "start" }}
                >
                    {/* Teacher */}
                    <Reveal
                        amount={0.2}
                        className="tbm-c-l"
                        style={{
                            ...CARD_COLUMN,
                            paddingRight: "clamp(0px, 2vw, 24px)",
                        }}
                    >
                        <div style={{ position: "relative" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={grid.teacher.image}
                                alt={grid.teacher.imageAlt}
                                style={{
                                    width: "100%",
                                    aspectRatio: "3 / 2",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                }}
                            />
                        </div>
                        <h3
                            style={{
                                margin: "8px 0 0",
                                fontWeight: 400,
                                fontSize: "clamp(30px, 3vw, 40px)",
                                lineHeight: 1.1,
                            }}
                        >
                            <Link
                                href={grid.teacher.href}
                                {...externalLinkProps(grid.teacher.href)}
                                style={{
                                    color: "var(--tbm-ink)",
                                    textDecoration: "none",
                                }}
                            >
                                {grid.teacher.name}
                            </Link>
                        </h3>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-muted)",
                            }}
                        >
                            {grid.teacher.role}
                        </p>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-muted)",
                            }}
                        >
                            {grid.teacher.time}
                        </p>
                    </Reveal>

                    {/* Member story */}
                    <Reveal
                        amount={0.2}
                        delay={0.05}
                        className="tbm-c-r"
                        style={{
                            ...CARD_COLUMN,
                            paddingLeft: "clamp(0px, 2vw, 24px)",
                        }}
                    >
                        <div style={{ position: "relative" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={grid.story.image}
                                alt={grid.story.imageAlt}
                                style={{
                                    width: "100%",
                                    aspectRatio: "3 / 2",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                }}
                            />
                        </div>
                        <div
                            className="tbm-lbl"
                            style={{
                                color: "var(--tbm-bronze-label)",
                                marginTop: 8,
                            }}
                        >
                            {grid.story.label}
                        </div>
                        <blockquote
                            style={{
                                margin: 0,
                                fontSize: 26,
                                lineHeight: 1.35,
                                fontStyle: "italic",
                            }}
                        >
                            {grid.story.quote}
                        </blockquote>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-muted)",
                            }}
                        >
                            {grid.story.caption}
                        </p>
                    </Reveal>

                    {/* Timetable */}
                    <Reveal
                        amount={0.2}
                        className="tbm-c-l"
                        style={{
                            ...CARD_COLUMN,
                            paddingRight: "clamp(0px, 2vw, 24px)",
                        }}
                    >
                        <div style={{ position: "relative" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={grid.timetable.image}
                                alt={grid.timetable.imageAlt}
                                style={{
                                    width: "100%",
                                    aspectRatio: "3 / 2",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                }}
                            />
                        </div>
                        <p
                            style={{
                                margin: "8px 0 0",
                                fontSize: 18,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-body)",
                            }}
                        >
                            {grid.timetable.body}
                        </p>
                        <div>
                            <a
                                className="tbm-btn"
                                href={grid.timetable.cta.href}
                                {...externalLinkProps(grid.timetable.cta.href)}
                                style={{
                                    background: "var(--tbm-ink)",
                                    color: "var(--tbm-cream)",
                                }}
                            >
                                {grid.timetable.cta.label}
                            </a>
                        </div>
                    </Reveal>

                    {/* Location. Styled map placeholder until the real
                        embed goes in, plus the address and directions. */}
                    <Reveal
                        amount={0.2}
                        delay={0.05}
                        className="tbm-c-r"
                        style={{
                            ...CARD_COLUMN,
                            paddingLeft: "clamp(0px, 2vw, 24px)",
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                aspectRatio: "3 / 2",
                                background: "#1b2518",
                            }}
                            role="img"
                            aria-label={grid.location.mapLabel}
                        />
                        <p
                            style={{
                                margin: "8px 0 0",
                                fontSize: 20,
                                lineHeight: 1.45,
                                fontWeight: 500,
                            }}
                        >
                            {grid.location.address}
                        </p>
                        <div>
                            <a
                                className="tbm-btn"
                                href={grid.location.cta.href}
                                {...externalLinkProps(grid.location.cta.href)}
                                style={{
                                    color: "var(--tbm-ink)",
                                    border: "1px solid var(--tbm-ink)",
                                }}
                            >
                                {grid.location.cta.label}
                            </a>
                        </div>
                    </Reveal>

                    <div
                        className="tbm-c-all"
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <Reveal amount={0.5}>
                            <Link
                                className="tbm-btn"
                                href={grid.cta.href}
                                {...externalLinkProps(grid.cta.href)}
                                style={{
                                    background: "var(--tbm-ink)",
                                    color: "var(--tbm-cream)",
                                }}
                            >
                                {grid.cta.label}
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ FAQ ============ */}
            <section style={{ paddingTop: 75, paddingBottom: 75 }}>
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48, alignItems: "start" }}
                >
                    <Reveal amount={0.3} className="tbm-c-l5">
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 400,
                                fontSize: "clamp(36px, 4vw, 56px)",
                                lineHeight: 1.1,
                                letterSpacing: "-.01em",
                            }}
                        >
                            {faq.heading}
                        </h2>
                    </Reveal>
                    <div className="tbm-c-r">
                        <div
                            className="tbm-faq"
                            style={{ borderTop: "1px solid var(--tbm-rule)" }}
                        >
                            <FaqList items={faq.items} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
