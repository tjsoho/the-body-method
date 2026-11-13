/* ************************************************************
   /memberships — the "pricing page" the copy refers to.

   Hero + three price-tier cards (Cornerstone, Tugun Beach, Dual
   on dark), a Private Pilates split, and a Class Packs vs Casual
   two-column section.

   On a phone each tier card keeps its price, its one-line summary
   and its button in view and folds the detail behind a "WHAT'S
   INCLUDED" disclosure, so the three cards can be compared without
   scrolling past three full descriptions. Above 900px the panels
   are held open by CSS and the page is unchanged.

   Every string, photo and price on this page is editable at
   /admin/memberships. The fallback copy lives in ./_config.
************************************************************ */

import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import Expandable from "@/components/core/Expandable";
import RichText from "@/components/core/RichText";
import { PhotoHero } from "@/components/core/PageHero";
import getPage from "@/server-actions/page";
import { buildPageMetadata } from "@/utils/seo";
import {
    MEMBERSHIPS_SLUG,
    membershipsFallbackData,
    type MembershipTier,
    type MembershipsPageProps,
    type PriceColumn,
} from "./_config";
import { externalLinkProps } from "@/utils/links";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata(MEMBERSHIPS_SLUG);
}

/* ------------------------------------------------------------
   Parts
   ------------------------------------------------------------ */

const ROW_STYLE = {
    borderTop: "1px solid var(--tbm-rule)",
    padding: "12px 0",
    fontSize: 17,
    lineHeight: 1.5,
    color: "var(--tbm-text-body)",
} as const;

function PriceList({ column }: { column: PriceColumn }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <h3
                style={{
                    margin: 0,
                    fontWeight: 500,
                    fontSize: 21,
                    lineHeight: 1.3,
                }}
            >
                {column.title}
            </h3>
            {column.note && (
                <p
                    style={{
                        margin: "0 0 6px",
                        fontSize: 14,
                        color: "var(--tbm-text-body)",
                    }}
                >
                    {column.note}
                </p>
            )}
            <ul
                style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    borderBottom: "1px solid var(--tbm-rule)",
                }}
            >
                {column.rows.map((row, i) => (
                    <li key={i} style={ROW_STYLE}>
                        <RichText className="tbm-rich" value={row} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

function TierCard({ tier }: { tier: MembershipTier }) {
    const isForest = tier.theme === "forest";

    return (
        <StaggerItem
            className="tbm-c-t"
            style={{
                background: isForest ? "var(--tbm-forest)" : "var(--tbm-cream)",
                color: isForest ? "var(--tbm-cream)" : "var(--tbm-ink)",
                border: isForest ? undefined : "1px solid var(--tbm-rule)",
                padding: "clamp(28px, 3vw, 44px)",
                display: "flex",
                flexDirection: "column",
                gap: 18,
            }}
        >
            <h2
                className="tbm-lbl"
                style={{
                    margin: 0,
                    color: isForest
                        ? "var(--tbm-on-dark-label)"
                        : "var(--tbm-bronze-label)",
                    fontSize: 13,
                }}
            >
                {tier.label}
            </h2>

            {tier.italicLine && (
                <p
                    style={{
                        margin: 0,
                        fontSize: 19,
                        lineHeight: 1.45,
                        fontStyle: "italic",
                        color: "var(--tbm-cream)",
                    }}
                >
                    {tier.italicLine}
                </p>
            )}

            <p
                style={{
                    margin: 0,
                    fontSize: "clamp(40px, 4vw, 56px)",
                    lineHeight: 1,
                    letterSpacing: "-.01em",
                }}
            >
                {tier.price}
            </p>

            {tier.summary && (
                <p
                    style={{
                        margin: 0,
                        fontSize: 16,
                        lineHeight: 1.7,
                        color: "var(--tbm-text-muted)",
                    }}
                >
                    {tier.summary}
                </p>
            )}

            <Expandable
                label={tier.disclosureLabel}
                colour={
                    isForest
                        ? "var(--tbm-on-dark-sage)"
                        : "var(--tbm-bronze-label)"
                }
                rule={
                    isForest ? "rgba(244, 242, 237, 0.25)" : "var(--tbm-rule)"
                }
            >
                <RichText
                    className={isForest ? "tbm-rich-on-dark" : "tbm-rich"}
                    value={tier.detail}
                    style={{
                        fontSize: 16,
                        lineHeight: 1.7,
                        color: isForest
                            ? "var(--tbm-on-dark-body)"
                            : "var(--tbm-text-muted)",
                        marginBottom: 18,
                    }}
                />
            </Expandable>

            <div style={{ marginTop: "auto", paddingTop: 12 }}>
                <a
                    className="tbm-btn"
                    href={tier.ctaHref}
                    {...externalLinkProps(tier.ctaHref)}
                    style={{
                        background: isForest
                            ? "var(--tbm-cream)"
                            : "var(--tbm-ink)",
                        color: isForest
                            ? "var(--tbm-forest)"
                            : "var(--tbm-cream)",
                    }}
                >
                    {tier.ctaLabel}
                </a>
            </div>
        </StaggerItem>
    );
}

/* ------------------------------------------------------------
   Page
   ------------------------------------------------------------ */

export default async function MembershipsPage() {
    const page = await getPage<MembershipsPageProps>(
        MEMBERSHIPS_SLUG,
        membershipsFallbackData,
    );
    const { hero, tiers, privatePilates, classPacks, casual } = page.content;

    return (
        <>
            <PhotoHero content={hero} />

            {/* ============ PRICE TIERS ============ */}
            <section
                style={{
                    paddingTop: 75,
                    paddingBottom: 75,
                    background: "var(--tbm-cream)",
                    color: "var(--tbm-ink)",
                    fontFamily: "var(--font-lora)",
                }}
            >
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 56, alignItems: "stretch" }}
                >
                    <Reveal amount={0.3} className="tbm-c-all">
                        <p
                            style={{
                                margin: "0 auto",
                                textAlign: "center",
                                fontSize: "clamp(26px, 2.6vw, 36px)",
                                lineHeight: 1.35,
                                maxWidth: "26em",
                                color: "var(--tbm-ink)",
                            }}
                        >
                            {tiers.intro}
                        </p>
                    </Reveal>

                    <Stagger
                        className="tbm-c-all tbm-g12"
                        style={{ rowGap: 24, alignItems: "stretch" }}
                        stagger={0.2}
                    >
                        {tiers.items.map((tier) => (
                            <TierCard key={tier.id} tier={tier} />
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* ============ PRIVATE PILATES split ============ */}
            <section
                style={{
                    background: "var(--tbm-sand)",
                    paddingTop: 75,
                    paddingBottom: 75,
                    color: "var(--tbm-ink)",
                    fontFamily: "var(--font-lora)",
                }}
            >
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48, alignItems: "start" }}
                >
                    <div
                        className="tbm-c-l5"
                        style={{ display: "flex", flexDirection: "column", gap: 24 }}
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
                                {privatePilates.heading}
                            </h2>
                        </Reveal>
                        {privatePilates.body.map((para, i) => (
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
                    </div>
                    <div
                        className="tbm-c-r tbm-g12"
                        style={{
                            rowGap: 40,
                            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        }}
                    >
                        {privatePilates.columns.map((column, i) => (
                            <Reveal key={column.id} amount={0.2} delay={i * 0.08}>
                                <PriceList column={column} />
                            </Reveal>
                        ))}
                        <Reveal
                            amount={0.2}
                            delay={0.16}
                            style={{ gridColumn: "1 / -1" }}
                        >
                            <a
                                className="tbm-btn"
                                href={privatePilates.ctaHref}
                                {...externalLinkProps(privatePilates.ctaHref)}
                                style={{
                                    background: "var(--tbm-ink)",
                                    color: "var(--tbm-cream)",
                                }}
                            >
                                {privatePilates.ctaLabel}
                            </a>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ CLASS PACKS & CASUAL ============ */}
            <section
                style={{
                    paddingTop: 75,
                    paddingBottom: 75,
                    background: "var(--tbm-cream)",
                    color: "var(--tbm-ink)",
                    fontFamily: "var(--font-lora)",
                }}
            >
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 56, alignItems: "start" }}
                >
                    <div
                        className="tbm-c-l"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 24,
                            paddingRight: "clamp(0px, 3vw, 48px)",
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
                                {classPacks.heading}
                            </h2>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.08}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-body)",
                                }}
                            >
                                {classPacks.body}
                            </p>
                        </Reveal>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                                gap: 24,
                            }}
                        >
                            {classPacks.columns.map((column, i) => (
                                <Reveal
                                    key={column.id}
                                    amount={0.2}
                                    delay={i * 0.08}
                                >
                                    <PriceList column={column} />
                                </Reveal>
                            ))}
                        </div>
                        <Reveal amount={0.2} delay={0.16}>
                            <a
                                className="tbm-btn"
                                href={classPacks.ctaHref}
                                {...externalLinkProps(classPacks.ctaHref)}
                                style={{
                                    background: "var(--tbm-ink)",
                                    color: "var(--tbm-cream)",
                                }}
                            >
                                {classPacks.ctaLabel}
                            </a>
                        </Reveal>
                    </div>

                    <div
                        className="tbm-c-r card-div"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 24,
                            boxShadow: "inset 1px 0 0 var(--tbm-rule)",
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
                                {casual.heading}
                            </h2>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.08}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 21,
                                    lineHeight: 1.5,
                                    fontStyle: "italic",
                                    color: "var(--tbm-ink)",
                                }}
                            >
                                {casual.italicLine}
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.16}>
                            <ul
                                style={{
                                    listStyle: "none",
                                    margin: 0,
                                    padding: 0,
                                    borderBottom: "1px solid var(--tbm-rule)",
                                }}
                            >
                                {casual.rows.map((row, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            borderTop:
                                                "1px solid var(--tbm-rule)",
                                            padding: "14px 0",
                                            fontSize: 19,
                                            fontWeight: 500,
                                        }}
                                    >
                                        <RichText
                                            className="tbm-rich"
                                            value={row}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.24}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-body)",
                                }}
                            >
                                {casual.body}
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.32}>
                            <Link
                                className="tbm-btn"
                                href={casual.ctaHref}
                                {...externalLinkProps(casual.ctaHref)}
                                style={{
                                    background: "var(--tbm-ink)",
                                    color: "var(--tbm-cream)",
                                }}
                            >
                                {casual.ctaLabel}
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>
        </>
    );
}
