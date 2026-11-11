/* ************************************************************
   /studios/tugun-beach — the six-Reformer studio.

   Hero, a centred intro, the "six people" split, Reformer at
   TBM, a forest Private Pilates band, teacher tiles, the FAQ and
   a closing CTA band.

   The FAQ now uses the shared accordion. It previously carried a
   `faq` class that is not defined anywhere, so its summaries had
   no styling and the plus icon never rotated.

   Editable at /admin/studios-tugun-beach. Fallback in ./_config.
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
    TUGUN_BEACH_SLUG,
    tugunBeachFallbackData,
    type TugunBeachPageProps,
} from "./_config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata(TUGUN_BEACH_SLUG);
}

export default async function TugunBeachPage() {
    const page = await getPage<TugunBeachPageProps>(
        TUGUN_BEACH_SLUG,
        tugunBeachFallbackData,
    );
    const {
        hero,
        intro,
        sixPeople,
        reformer,
        privateBand,
        teachers,
        faq,
        closing,
    } = page.content;

    return (
        <>
            <PhotoHero content={hero} />

            {/* ============ CENTRED INTRO ============ */}
            <section style={{ paddingTop: 75, paddingBottom: 75 }}>
                <div
                    className="tbm-wrap"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        gap: 24,
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
                            {intro.lede}
                        </p>
                    </Reveal>
                    <Reveal amount={0.3} delay={0.08}>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 21,
                                lineHeight: 1.5,
                                fontStyle: "italic",
                                color: "var(--tbm-green-accent)",
                                maxWidth: "34em",
                            }}
                        >
                            {intro.closer}
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ============ SIX PEOPLE — portrait L, text R ============ */}
            <section
                style={{
                    background: "var(--tbm-sand)",
                    paddingTop: 75,
                    paddingBottom: 75,
                }}
            >
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
                            src={sixPeople.image}
                            alt={sixPeople.imageAlt}
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
                                {sixPeople.heading}
                            </h2>
                        </Reveal>
                        {sixPeople.body.map((para, i) => (
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
                        <Reveal
                            amount={0.3}
                            delay={0.08 + sixPeople.body.length * 0.08}
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
                                {sixPeople.closer}
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ REFORMER AT TBM — text L, portrait R ============ */}
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
                            <h2
                                style={{
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: "clamp(36px, 4vw, 56px)",
                                    lineHeight: 1.1,
                                    letterSpacing: "-.01em",
                                }}
                            >
                                {reformer.heading}
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
                                {reformer.body}
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.16}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-body)",
                                }}
                            >
                                <strong
                                    style={{
                                        fontWeight: 500,
                                        color: "var(--tbm-ink)",
                                    }}
                                >
                                    {reformer.bestForLabel}
                                </strong>{" "}
                                {reformer.bestFor}
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.24}>
                            <div style={{ paddingTop: 8 }}>
                                <Link
                                    className="tbm-btn"
                                    href={reformer.cta.href}
                                    style={{
                                        background: "var(--tbm-ink)",
                                        color: "var(--tbm-cream)",
                                    }}
                                >
                                    {reformer.cta.label}
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                    <Reveal
                        amount={0.2}
                        delay={0.05}
                        className="tbm-c-r5"
                        style={{ position: "relative" }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={reformer.image}
                            alt={reformer.imageAlt}
                            style={{
                                width: "100%",
                                aspectRatio: "4 / 5",
                                objectFit: "cover",
                            }}
                        />
                    </Reveal>
                </div>
            </section>

            {/* ============ PRIVATE PILATES — forest band ============ */}
            <section
                style={{
                    color: "var(--tbm-cream)",
                    background: "var(--tbm-forest)",
                    paddingTop: 75,
                    paddingBottom: 75,
                }}
            >
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
                            src={privateBand.image}
                            alt={privateBand.imageAlt}
                            style={{
                                width: "100%",
                                aspectRatio: "3 / 2",
                                objectFit: "cover",
                                objectPosition: privateBand.imageFocus,
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
                                {privateBand.heading}
                            </h2>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.08}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-on-dark-body)",
                                }}
                            >
                                {privateBand.body}
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.16}>
                            <div style={{ paddingTop: 8 }}>
                                <Link
                                    className="tbm-btn"
                                    href={privateBand.cta.href}
                                    style={{
                                        background: "var(--tbm-cream)",
                                        color: "var(--tbm-forest)",
                                    }}
                                >
                                    {privateBand.cta.label}
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ MEET SOME OF THE PEOPLE TEACHING YOU ============ */}
            <section style={{ paddingTop: 75, paddingBottom: 75 }}>
                <div className="tbm-wrap tbm-g12" style={{ rowGap: 48 }}>
                    <Reveal amount={0.3} className="tbm-c-all">
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 400,
                                fontSize: "clamp(36px, 4vw, 56px)",
                                lineHeight: 1.1,
                                letterSpacing: "-.01em",
                            }}
                        >
                            {teachers.heading}
                        </h2>
                    </Reveal>

                    <Stagger
                        className="tbm-c-all tbm-g12"
                        style={{ rowGap: 48 }}
                        stagger={0.1}
                    >
                        {teachers.tiles.map((tile) => (
                            <StaggerItem
                                key={tile.id}
                                className="tbm-c-t"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 16,
                                }}
                            >
                                <div style={{ position: "relative" }}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={tile.image}
                                        alt={tile.imageAlt}
                                        style={{
                                            width: "100%",
                                            aspectRatio: "4 / 5",
                                            objectFit: "cover",
                                            objectPosition: "center",
                                        }}
                                    />
                                </div>
                            </StaggerItem>
                        ))}
                    </Stagger>
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

            {/* ============ CTA BAND ============ */}
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
                        justifyContent: "center",
                        gap: 16,
                        flexWrap: "wrap",
                    }}
                >
                    <Reveal amount={0.5}>
                        <Link
                            className="tbm-btn"
                            href={closing.primaryCta.href}
                            style={{
                                background: "var(--tbm-cream)",
                                color: "var(--tbm-forest)",
                            }}
                        >
                            {closing.primaryCta.label}
                        </Link>
                    </Reveal>
                    <Reveal amount={0.5} delay={0.08}>
                        <a
                            className="tbm-btn"
                            href={closing.secondaryCta.href}
                            style={{
                                color: "var(--tbm-cream)",
                                border: "1px solid rgba(244,242,237,.7)",
                            }}
                        >
                            {closing.secondaryCta.label}
                        </a>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
