/* ************************************************************
   /about — the story and the philosophy.

   Hero, then two alternating feature blocks, the four beliefs,
   and a forest band with the two onward links.

   Editable at /admin/about. Fallback copy in ./_config.
************************************************************ */

import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PhotoHero } from "@/components/core/PageHero";
import getPage from "@/server-actions/page";
import { buildPageMetadata } from "@/utils/seo";
import { ABOUT_SLUG, aboutFallbackData, type AboutPageProps } from "./_config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata(ABOUT_SLUG);
}

export default async function AboutPage() {
    const page = await getPage<AboutPageProps>(ABOUT_SLUG, aboutFallbackData);
    const { hero, strength, care, beliefs, closing } = page.content;

    return (
        <div
            style={{
                background: "var(--tbm-cream)",
                color: "var(--tbm-ink)",
                fontFamily: "var(--font-lora)",
            }}
        >
            <PhotoHero content={hero} />

            {/* ============ FEATURE 1 — text left, portrait right ============ */}
            <section style={{ paddingTop: 75, paddingBottom: 75 }}>
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48, alignItems: "center" }}
                >
                    <div
                        className="tbm-c-l"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 24,
                        }}
                    >
                        <Reveal amount={0.3}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "clamp(26px, 2.6vw, 36px)",
                                    lineHeight: 1.35,
                                    color: "var(--tbm-ink)",
                                }}
                            >
                                {strength.lede}
                            </p>
                        </Reveal>
                        {strength.body.map((para, i) => (
                            <Reveal key={i} delay={0.08 + i * 0.08} amount={0.3}>
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
                    <Reveal
                        delay={0.08}
                        amount={0.2}
                        className="tbm-c-r5"
                        style={{ position: "relative" }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={strength.image}
                            alt={strength.imageAlt}
                            style={{
                                width: "100%",
                                aspectRatio: "4 / 5",
                                objectFit: "cover",
                            }}
                        />
                    </Reveal>
                </div>
            </section>

            {/* ============ FEATURE 2 — portrait left, text right ============ */}
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
                            src={care.image}
                            alt={care.imageAlt}
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
                            gap: 24,
                        }}
                    >
                        <Reveal delay={0.08} amount={0.3}>
                            <h2
                                style={{
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: "clamp(36px, 4vw, 56px)",
                                    lineHeight: 1.1,
                                    letterSpacing: "-.01em",
                                }}
                            >
                                {care.heading}
                            </h2>
                        </Reveal>
                        {care.body.map((para, i) => (
                            <Reveal key={i} delay={0.16 + i * 0.08} amount={0.3}>
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
                </div>
            </section>

            {/* ============ WHAT WE BELIEVE ============ */}
            <section style={{ paddingTop: 75, paddingBottom: 75 }}>
                <div className="tbm-wrap tbm-g12" style={{ rowGap: 48 }}>
                    <Reveal amount={0.4} className="tbm-c-all">
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 400,
                                fontSize: "clamp(36px, 4vw, 56px)",
                                lineHeight: 1.1,
                                letterSpacing: "-.01em",
                            }}
                        >
                            {beliefs.heading}
                        </h2>
                    </Reveal>
                    <Stagger
                        className="tbm-c-all tbm-g12"
                        style={{
                            paddingTop: 40,
                            borderTop: "1px solid var(--tbm-rule)",
                            rowGap: 40,
                        }}
                        stagger={0.2}
                    >
                        {beliefs.items.map((belief) => (
                            <StaggerItem
                                key={belief.id}
                                className="tbm-c-q"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 12,
                                    paddingRight: 16,
                                }}
                            >
                                <h3
                                    style={{
                                        margin: 0,
                                        fontWeight: 500,
                                        fontSize: 22,
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {belief.title}
                                </h3>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 16,
                                        lineHeight: 1.6,
                                        color: "var(--tbm-text-muted)",
                                    }}
                                >
                                    {belief.body}
                                </p>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* ============ BUILT IN TUGUN (forest CTA) ============ */}
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
                            {closing.heading}
                        </h2>
                    </Reveal>
                    <div
                        className="tbm-c-r"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                        }}
                    >
                        {closing.body.map((para, i) => (
                            <Reveal key={i} delay={i * 0.08} amount={0.3}>
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
                            delay={closing.body.length * 0.08}
                            amount={0.3}
                        >
                            <div
                                className="tbm-hero-ctas"
                                style={{
                                    display: "flex",
                                    gap: 16,
                                    flexWrap: "wrap",
                                    paddingTop: 16,
                                }}
                            >
                                <Link
                                    className="tbm-btn tbm-hero-cta"
                                    href={closing.primaryCta.href}
                                    style={{
                                        background: "var(--tbm-cream)",
                                        color: "var(--tbm-forest)",
                                    }}
                                >
                                    {closing.primaryCta.label}
                                </Link>
                                <Link
                                    className="tbm-btn tbm-hero-cta"
                                    href={closing.secondaryCta.href}
                                    style={{
                                        color: "#f4f2ed",
                                        border: "1px solid rgba(244,242,237,.7)",
                                    }}
                                >
                                    {closing.secondaryCta.label}
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </div>
    );
}
