/* ************************************************************
   /life-at-tbm — everything around the hour on the mat.

   Hero, a centred lede, what's happening, the member stories,
   workshops and learning, then the partner row on forest.

   Events, workshops and partners are lists, because they are
   the parts of this page that turn over. Partner logos are shown
   as white silhouettes so the row reads with one tonal weight
   whatever palette the source file uses.

   Editable at /admin/life-at-tbm. Fallback copy in ./_config.
************************************************************ */

import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PhotoHero } from "@/components/core/PageHero";
import StoryCarousel from "@/components/carousel/StoryCarousel";
import getPage from "@/server-actions/page";
import { buildPageMetadata } from "@/utils/seo";
import {
    LIFE_AT_TBM_SLUG,
    lifeAtTbmFallbackData,
    type EventCard,
    type LifeAtTbmPageProps,
} from "./_config";
import { externalLinkProps } from "@/utils/links";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata(LIFE_AT_TBM_SLUG);
}

function SectionHeader({
    label,
    heading,
    body,
}: {
    label: string;
    heading: string;
    body: string | string[];
}) {
    const paragraphs = Array.isArray(body) ? body : [body];
    return (
        <>
            <Reveal amount={0.4} className="tbm-c-l5">
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 400,
                        fontSize: "clamp(36px, 4vw, 56px)",
                        lineHeight: 1.1,
                        letterSpacing: "-.01em",
                    }}
                >
                    {label}
                </h2>
            </Reveal>
            <Reveal
                amount={0.3}
                delay={0.08}
                className="tbm-c-r"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                }}
            >
                <p
                    style={{
                        margin: 0,
                        fontSize: 24,
                        lineHeight: 1.4,
                        fontStyle: "italic",
                        color: "var(--tbm-green-accent)",
                    }}
                >
                    {heading}
                </p>
                {paragraphs.map((para, i) => (
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
            </Reveal>
        </>
    );
}

function EventTile({ card, side }: { card: EventCard; side: "l" | "r" }) {
    return (
        <StaggerItem
            className={side === "l" ? "tbm-c-l" : "tbm-c-r"}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                paddingRight: side === "l" ? "clamp(0px, 2vw, 24px)" : undefined,
                paddingLeft: side === "r" ? "clamp(0px, 2vw, 24px)" : undefined,
            }}
        >
            <div style={{ position: "relative" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={card.image}
                    alt={card.imageAlt}
                    style={{
                        width: "100%",
                        aspectRatio: "3 / 2",
                        objectFit: "cover",
                        objectPosition: "center",
                    }}
                />
            </div>
            <p
                className="tbm-lbl"
                style={{ margin: "8px 0 0", color: "var(--tbm-bronze-label)" }}
            >
                {card.meta}
            </p>
            <h3
                style={{
                    margin: 0,
                    fontWeight: 400,
                    fontSize: "clamp(30px, 3vw, 40px)",
                    lineHeight: 1.1,
                }}
            >
                {card.title}
            </h3>
            <p
                style={{
                    margin: 0,
                    fontSize: 16,
                    lineHeight: 1.7,
                    color: "var(--tbm-text-muted)",
                    maxWidth: "34em",
                }}
            >
                {card.body}
            </p>
            {card.linkLabel && (
                <div style={{ paddingTop: 4 }}>
                    <a
                        className="tbm-lnk"
                        href={card.linkHref}
                        {...externalLinkProps(card.linkHref)}
                        style={{ color: "var(--tbm-forest)" }}
                    >
                        {card.linkLabel} <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            )}
        </StaggerItem>
    );
}

export default async function LifeAtTbmPage() {
    const page = await getPage<LifeAtTbmPageProps>(
        LIFE_AT_TBM_SLUG,
        lifeAtTbmFallbackData,
    );
    const { hero, lede, happening, community, workshops, partners } =
        page.content;

    return (
        <div
            style={{
                background: "var(--tbm-cream)",
                color: "var(--tbm-ink)",
                fontFamily: "var(--font-lora)",
            }}
        >
            <PhotoHero content={hero} />

            {/* ============ INTRO LEDE ============ */}
            <section style={{ paddingTop: 75, paddingBottom: 75 }}>
                <div
                    className="tbm-wrap"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                    }}
                >
                    <Reveal amount={0.4}>
                        <p
                            style={{
                                margin: 0,
                                fontSize: "clamp(26px, 2.6vw, 36px)",
                                lineHeight: 1.35,
                                maxWidth: "26em",
                                color: "var(--tbm-ink)",
                            }}
                        >
                            {lede.body}
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ============ WHAT'S HAPPENING ============ */}
            <section
                style={{
                    paddingTop: 75,
                    paddingBottom: 75,
                    borderTop: "1px solid var(--tbm-rule)",
                }}
            >
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48, alignItems: "start" }}
                >
                    <SectionHeader
                        label={happening.label}
                        heading={happening.heading}
                        body={happening.body}
                    />
                    <Stagger
                        className="tbm-c-all tbm-g12"
                        style={{ rowGap: 48 }}
                        stagger={0.22}
                    >
                        {happening.cards.map((card, i) => (
                            <EventTile
                                key={card.id}
                                card={card}
                                side={i % 2 === 0 ? "l" : "r"}
                            />
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* ============ OUR COMMUNITY ============ */}
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
                    <SectionHeader
                        label={community.label}
                        heading={community.heading}
                        body={community.body}
                    />
                    <StoryCarousel
                        stories={community.stories}
                        cardLabel={community.cardLabel}
                        memberSinceLabel={community.memberSinceLabel}
                        arrowSlot="above"
                    />
                </div>
            </section>

            {/* ============ WORKSHOPS + LEARNING ============ */}
            <section style={{ paddingTop: 75, paddingBottom: 75 }}>
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48, alignItems: "start" }}
                >
                    <SectionHeader
                        label={workshops.label}
                        heading={workshops.heading}
                        body={workshops.body}
                    />
                    <Stagger
                        className="tbm-c-all tbm-g12"
                        style={{ rowGap: 48 }}
                        stagger={0.22}
                    >
                        {workshops.cards.map((card, i) => (
                            <EventTile
                                key={card.id}
                                card={card}
                                side={i % 2 === 0 ? "l" : "r"}
                            />
                        ))}
                    </Stagger>

                    <div className="tbm-c-all">
                        <Reveal amount={0.4}>
                            <a
                                className="tbm-btn"
                                href={workshops.cta.href}
                                {...externalLinkProps(workshops.cta.href)}
                                style={{
                                    background: "var(--tbm-ink)",
                                    color: "var(--tbm-cream)",
                                }}
                            >
                                {workshops.cta.label}
                            </a>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ FRIENDS OF TBM ============ */}
            <section
                style={{
                    color: "#f4f2ed",
                    background: "var(--tbm-forest)",
                    paddingTop: 75,
                    paddingBottom: 75,
                }}
            >
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48, alignItems: "start" }}
                >
                    <Reveal amount={0.4} className="tbm-c-l5">
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 400,
                                fontSize: "clamp(36px, 4vw, 56px)",
                                lineHeight: 1.1,
                                letterSpacing: "-.01em",
                            }}
                        >
                            {partners.label}
                        </h2>
                    </Reveal>
                    <Reveal
                        amount={0.3}
                        delay={0.08}
                        className="tbm-c-r"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontSize: 24,
                                lineHeight: 1.4,
                                fontStyle: "italic",
                                color: "var(--tbm-on-dark-sage-soft)",
                            }}
                        >
                            {partners.heading}
                        </p>
                        {partners.body.map((para, i) => (
                            <p
                                key={i}
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-on-dark-body)",
                                }}
                            >
                                {para}
                            </p>
                        ))}
                    </Reveal>

                    <Stagger
                        className="tbm-c-all tbm-g12"
                        style={{ rowGap: 32 }}
                        stagger={0.2}
                    >
                        {partners.items.map((partner) => (
                            <StaggerItem
                                key={partner.id}
                                className="tbm-c-t"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 14,
                                }}
                            >
                                <a
                                    href={partner.href}
                                    target="_blank"
                                    rel="noopener"
                                    aria-label={`Visit ${partner.name}`}
                                    style={{
                                        position: "relative",
                                        width: "100%",
                                        aspectRatio: "3 / 2",
                                        border: "1px solid rgba(175,177,161,.35)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        overflow: "hidden",
                                    }}
                                >
                                    {/* Capped to one visual height with a
                                        contain fit, then flattened to white,
                                        so every logo reads at the same weight
                                        whatever its own palette is. */}
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={partner.logo}
                                        alt={`${partner.name} logo`}
                                        style={{
                                            width: "auto",
                                            height: 72,
                                            maxWidth: "70%",
                                            objectFit: "contain",
                                            filter: "brightness(0) invert(1)",
                                            opacity: 0.9,
                                        }}
                                    />
                                </a>
                                <h3
                                    style={{
                                        margin: 0,
                                        fontWeight: 400,
                                        fontSize: 24,
                                        lineHeight: 1.3,
                                    }}
                                >
                                    <a
                                        href={partner.href}
                                        target="_blank"
                                        rel="noopener"
                                        style={{
                                            color: "#f4f2ed",
                                            textDecoration: "none",
                                        }}
                                    >
                                        {partner.name}
                                    </a>
                                </h3>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>
        </div>
    );
}
