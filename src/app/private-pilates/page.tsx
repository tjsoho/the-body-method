/* ************************************************************
   /private-pilates — one-to-one and duet sessions.

   Hero, a centred intro, the "useful when" list, the first
   session panel, a forest band with the progression chain, and
   pricing.

   Editable at /admin/private-pilates. Fallback in ./_config.
************************************************************ */

import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import RichText from "@/components/core/RichText";
import { PhotoHero } from "@/components/core/PageHero";
import getPage from "@/server-actions/page";
import { buildPageMetadata } from "@/utils/seo";
import {
    PRIVATE_PILATES_SLUG,
    privatePilatesFallbackData,
    type PriceColumn,
    type PrivatePilatesPageProps,
} from "./_config";
import { externalLinkProps } from "@/utils/links";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata(PRIVATE_PILATES_SLUG);
}

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

export default async function PrivatePilatesPage() {
    const page = await getPage<PrivatePilatesPageProps>(
        PRIVATE_PILATES_SLUG,
        privatePilatesFallbackData,
    );
    const { hero, intro, useCases, firstSession, progression, pricing } =
        page.content;

    return (
        <>
            <PhotoHero content={hero} />

            {/* ============ Centered intro ============ */}
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
                    className="tbm-wrap"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                    }}
                >
                    <Reveal amount={0.3}>
                        <p
                            style={{
                                margin: 0,
                                fontSize: "clamp(26px, 2.6vw, 36px)",
                                lineHeight: 1.35,
                                maxWidth: "26em",
                                color: "var(--tbm-ink)",
                            }}
                        >
                            {intro.body}
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ============ Useful when ============ */}
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
                    style={{ rowGap: 40, alignItems: "start" }}
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
                            {useCases.heading}
                        </h2>
                    </Reveal>
                    <Reveal amount={0.2} delay={0.08} className="tbm-c-r">
                        <ul
                            style={{
                                listStyle: "none",
                                margin: 0,
                                padding: 0,
                                borderBottom: "1px solid var(--tbm-rule)",
                                display: "grid",
                                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                                columnGap: 24,
                            }}
                        >
                            {useCases.items.map((item) => (
                                <li
                                    key={item}
                                    style={{
                                        borderTop: "1px solid var(--tbm-rule)",
                                        padding: "16px 0",
                                        fontSize: 18,
                                        lineHeight: 1.5,
                                        color: "var(--tbm-text-body)",
                                    }}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </section>

            {/* ============ First session panel ============ */}
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
                    style={{ rowGap: 0, alignItems: "stretch" }}
                >
                    <Reveal
                        amount={0.2}
                        className="tbm-c-l5"
                        style={{ position: "relative" }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={firstSession.image}
                            alt={firstSession.imageAlt}
                            style={{
                                width: "100%",
                                aspectRatio: "4 / 5",
                                objectFit: "cover",
                            }}
                        />
                    </Reveal>
                    <Reveal
                        amount={0.2}
                        delay={0.08}
                        className="tbm-c-panel"
                        style={{
                            marginLeft: -24,
                            background: "var(--tbm-sand)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            gap: 48,
                            padding: "clamp(32px, 4vw, 64px)",
                        }}
                    >
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 400,
                                fontSize: "clamp(36px, 4vw, 56px)",
                                lineHeight: 1.1,
                                letterSpacing: "-.01em",
                                maxWidth: "12em",
                            }}
                        >
                            {firstSession.heading}
                        </h2>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 24,
                                borderTop: "1px solid var(--tbm-rule)",
                                paddingTop: 32,
                            }}
                        >
                            {firstSession.body.map((para, i) => (
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
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ============ Forest: progression ============ */}
            <section
                style={{
                    color: "var(--tbm-cream)",
                    background: "var(--tbm-forest)",
                    paddingTop: 75,
                    paddingBottom: 75,
                    fontFamily: "var(--font-lora)",
                }}
            >
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48, alignItems: "center" }}
                >
                    <Reveal
                        amount={0.2}
                        className="tbm-c-l"
                        style={{ paddingRight: "clamp(0px, 2vw, 24px)" }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={progression.image}
                            alt={progression.imageAlt}
                            style={{
                                width: "100%",
                                aspectRatio: "3 / 2",
                                objectFit: "cover",
                                objectPosition: progression.imageFocus,
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
                                {progression.heading}
                            </h2>
                        </Reveal>
                        {progression.bodyBefore.map((para, i) => (
                            <Reveal key={i} amount={0.3} delay={0.08 + i * 0.08}>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 18,
                                        lineHeight: 1.7,
                                        color: "var(--tbm-on-dark-body)",
                                    }}
                                >
                                    {para}
                                </p>
                            </Reveal>
                        ))}
                        <Reveal
                            amount={0.3}
                            delay={0.08 + progression.bodyBefore.length * 0.08}
                        >
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-on-dark-body)",
                                }}
                            >
                                {progression.chainLead}
                                <strong
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        alignItems: "baseline",
                                        paddingTop: 12,
                                        fontWeight: 400,
                                        fontSize: "clamp(24px, 2.4vw, 32px)",
                                        lineHeight: 1.3,
                                        color: "var(--tbm-cream)",
                                    }}
                                >
                                    {progression.chain.map((step, i) => (
                                        <span
                                            key={step}
                                            style={{ display: "contents" }}
                                        >
                                            {i > 0 && (
                                                <span
                                                    aria-hidden="true"
                                                    style={{
                                                        color: "var(--tbm-on-dark-bronze)",
                                                        padding: "0 14px",
                                                    }}
                                                >
                                                    &rarr;
                                                </span>
                                            )}
                                            <span>{step}</span>
                                        </span>
                                    ))}
                                </strong>
                            </p>
                        </Reveal>
                        {progression.bodyAfter.map((para, i) => (
                            <Reveal
                                key={i}
                                amount={0.3}
                                delay={
                                    0.16 +
                                    (progression.bodyBefore.length + i) * 0.08
                                }
                            >
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 18,
                                        lineHeight: 1.7,
                                        color: "var(--tbm-on-dark-body)",
                                    }}
                                >
                                    {para}
                                </p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ Pricing ============ */}
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
                            {pricing.heading}
                        </h2>
                    </Reveal>
                    <div
                        className="tbm-c-r tbm-g12"
                        style={{
                            rowGap: 40,
                            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        }}
                    >
                        {pricing.columns.map((column, i) => (
                            <Reveal key={column.id} amount={0.2} delay={i * 0.08}>
                                <PriceList column={column} />
                            </Reveal>
                        ))}
                        <Reveal
                            amount={0.2}
                            delay={0.16}
                            style={{
                                gridColumn: "1 / -1",
                                display: "flex",
                                gap: 24,
                                flexWrap: "wrap",
                                alignItems: "center",
                            }}
                        >
                            <a
                                className="tbm-btn"
                                href={pricing.cta.href}
                                {...externalLinkProps(pricing.cta.href)}
                                style={{
                                    background: "var(--tbm-ink)",
                                    color: "var(--tbm-cream)",
                                }}
                            >
                                {pricing.cta.label}
                            </a>
                            <Link
                                className="tbm-lnk"
                                href={pricing.link.href}
                                {...externalLinkProps(pricing.link.href)}
                                style={{ color: "var(--tbm-forest)" }}
                            >
                                {pricing.link.label}{" "}
                                <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>
        </>
    );
}
