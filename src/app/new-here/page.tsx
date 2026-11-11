/* ************************************************************
   /new-here — the 21-Day Immersion page.

   Hero, what the 21 days are for, a reassurance list, both
   studios, the three weeks on forest, the first class, and a
   short FAQ. Copy is the client-approved master.

   Editable at /admin/new-here. Fallback copy in ./_config.
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
    NEW_HERE_SLUG,
    newHereFallbackData,
    type NewHerePageProps,
} from "./_config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata(NEW_HERE_SLUG);
}

export default async function NewHerePage() {
    const page = await getPage<NewHerePageProps>(
        NEW_HERE_SLUG,
        newHereFallbackData,
    );
    const { hero, purpose, ready, studios, weeks, firstClass, faq } =
        page.content;

    return (
        <>
            <PhotoHero content={hero}>
                <Reveal amount={0.2} delay={0.24}>
                    <div style={{ paddingTop: 8 }}>
                        <a
                            className="tbm-btn"
                            href={hero.cta.href}
                            style={{ background: "#f4f2ed", color: "#1b2518" }}
                        >
                            {hero.cta.label}
                        </a>
                    </div>
                </Reveal>
            </PhotoHero>

            {/* ============ WHAT ARE THE 21 DAYS FOR ============ */}
            <section
                style={{
                    paddingTop: 75,
                    paddingBottom: 75,
                    background: "var(--tbm-cream)",
                    color: "var(--tbm-ink)",
                }}
            >
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
                                {purpose.heading}
                            </h2>
                        </Reveal>
                        {purpose.body.map((para, i) => (
                            <Reveal key={i} amount={0.2} delay={0.08 + i * 0.08}>
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
                            amount={0.2}
                            delay={0.08 + purpose.body.length * 0.08}
                        >
                            <div
                                style={{
                                    borderTop: "1px solid var(--tbm-rule)",
                                    marginTop: 16,
                                    paddingTop: 32,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 12,
                                }}
                            >
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 24,
                                        lineHeight: 1.4,
                                        color: "var(--tbm-ink)",
                                    }}
                                >
                                    {purpose.closerPlain}
                                </p>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 24,
                                        lineHeight: 1.4,
                                        fontStyle: "italic",
                                        color: "var(--tbm-green-accent)",
                                    }}
                                >
                                    {purpose.closerItalic}
                                </p>
                            </div>
                        </Reveal>
                    </div>
                    <Reveal
                        amount={0.2}
                        delay={0.08}
                        className="tbm-c-r5"
                        style={{ position: "relative" }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={purpose.image}
                            alt={purpose.imageAlt}
                            style={{
                                width: "100%",
                                aspectRatio: "4 / 5",
                                objectFit: "cover",
                            }}
                        />
                    </Reveal>
                </div>
            </section>

            {/* ============ YOU DON'T NEED TO BE READY ============ */}
            <section
                style={{
                    background: "var(--tbm-sand)",
                    paddingTop: 75,
                    paddingBottom: 75,
                    color: "var(--tbm-ink)",
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
                            src={ready.image}
                            alt={ready.imageAlt}
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
                                {ready.heading}
                            </h2>
                        </Reveal>
                        <Reveal amount={0.2} delay={0.08}>
                            <ul
                                style={{
                                    listStyle: "none",
                                    margin: 0,
                                    padding: 0,
                                    fontSize: 18,
                                    lineHeight: 1.6,
                                    color: "var(--tbm-text-body)",
                                }}
                            >
                                {ready.items.map((item, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            borderTop:
                                                "1px solid var(--tbm-rule)",
                                            borderBottom:
                                                i === ready.items.length - 1
                                                    ? "1px solid var(--tbm-rule)"
                                                    : undefined,
                                            padding: "18px 0",
                                        }}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                        <Reveal amount={0.2} delay={0.16}>
                            <p
                                style={{
                                    margin: 0,
                                    paddingTop: 16,
                                    fontSize: 24,
                                    lineHeight: 1.4,
                                    fontStyle: "italic",
                                    color: "var(--tbm-green-accent)",
                                }}
                            >
                                {ready.closer}
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ TWO STUDIOS ============ */}
            <section
                style={{
                    paddingTop: 75,
                    paddingBottom: 75,
                    background: "var(--tbm-cream)",
                    color: "var(--tbm-ink)",
                }}
            >
                <div className="tbm-wrap" style={{ paddingBottom: 56 }}>
                    <Reveal amount={0.3}>
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 400,
                                fontSize: "clamp(36px, 4vw, 56px)",
                                lineHeight: 1.1,
                                textAlign: "center",
                            }}
                        >
                            {studios.headingLead}
                            <em style={{ color: "var(--tbm-green-accent)" }}>
                                {studios.headingItalic}
                            </em>
                        </h2>
                    </Reveal>
                </div>
                <Stagger
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48 }}
                    stagger={0.22}
                >
                    {studios.items.map((studio, i) => (
                        <StaggerItem
                            key={studio.id}
                            className={i % 2 === 0 ? "tbm-c-l" : "tbm-c-r"}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 20,
                                paddingRight:
                                    i % 2 === 0
                                        ? "clamp(0px, 2vw, 24px)"
                                        : undefined,
                                paddingLeft:
                                    i % 2 === 0
                                        ? undefined
                                        : "clamp(0px, 2vw, 24px)",
                                boxShadow:
                                    i % 2 === 0
                                        ? undefined
                                        : "inset 1px 0 0 var(--tbm-rule)",
                            }}
                        >
                            <article
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 20,
                                }}
                            >
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
                                <h3
                                    style={{
                                        margin: "8px 0 0",
                                        fontWeight: 400,
                                        fontSize: "clamp(30px, 3vw, 40px)",
                                        lineHeight: 1.1,
                                    }}
                                >
                                    {studio.name}
                                </h3>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 18,
                                        lineHeight: 1.6,
                                        color: "var(--tbm-text-muted)",
                                        maxWidth: "32em",
                                    }}
                                >
                                    {studio.body}
                                </p>
                            </article>
                        </StaggerItem>
                    ))}
                </Stagger>
                <div
                    className="tbm-wrap"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: 56,
                    }}
                >
                    <Reveal amount={0.3}>
                        <Link
                            className="tbm-btn"
                            href={studios.cta.href}
                            style={{
                                color: "var(--tbm-ink)",
                                border: "1px solid var(--tbm-ink)",
                            }}
                        >
                            {studios.cta.label}
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* ============ YOUR THREE WEEKS + AFTER ============ */}
            <section
                style={{
                    background: "var(--tbm-forest)",
                    color: "#f4f2ed",
                    paddingBottom: 75,
                }}
            >
                <Reveal amount={0.2}>
                    <div
                        style={{
                            position: "relative",
                            height: 420,
                            overflow: "hidden",
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={weeks.bandImage}
                            alt={weeks.bandImageAlt}
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: weeks.bandImageFocus,
                            }}
                        />
                    </div>
                </Reveal>
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 64, paddingTop: 75 }}
                >
                    <Reveal amount={0.3} className="tbm-c-all">
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 400,
                                fontSize: "clamp(40px, 4.6vw, 64px)",
                                lineHeight: 1.05,
                                letterSpacing: "-.01em",
                            }}
                        >
                            {weeks.heading}
                        </h2>
                    </Reveal>

                    <Stagger
                        className="tbm-c-all tbm-g12"
                        style={{ rowGap: 40 }}
                        stagger={0.17}
                    >
                        {weeks.steps.map((step) => (
                            <StaggerItem
                                key={step.id}
                                className="tbm-c-t"
                                style={{
                                    borderTop:
                                        "1px solid rgba(175,177,161,.35)",
                                    paddingTop: 32,
                                    paddingRight: 24,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 12,
                                }}
                            >
                                <h3
                                    style={{
                                        margin: 0,
                                        fontWeight: 400,
                                        fontSize: 28,
                                        lineHeight: 1.25,
                                    }}
                                >
                                    <span
                                        className="tbm-lbl"
                                        style={{
                                            display: "block",
                                            color: "var(--tbm-on-dark-sage)",
                                            fontSize: 13,
                                            paddingBottom: 12,
                                        }}
                                    >
                                        {step.week}
                                    </span>
                                    {step.title}
                                </h3>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 16,
                                        lineHeight: 1.6,
                                        color: "var(--tbm-on-dark-body)",
                                    }}
                                >
                                    {step.body}
                                </p>
                            </StaggerItem>
                        ))}
                    </Stagger>

                    <div
                        className="tbm-c-all tbm-g12"
                        style={{
                            rowGap: 32,
                            borderTop: "1px solid #a88d66",
                            paddingTop: 48,
                        }}
                    >
                        <Reveal amount={0.3} className="tbm-c-l5">
                            <h3
                                style={{
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: "clamp(32px, 3.4vw, 44px)",
                                    lineHeight: 1.1,
                                    fontStyle: "italic",
                                }}
                            >
                                {weeks.afterHeading}
                            </h3>
                        </Reveal>
                        <Reveal
                            amount={0.2}
                            delay={0.08}
                            className="tbm-c-r"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 16,
                                fontSize: 18,
                                lineHeight: 1.7,
                                color: "var(--tbm-on-dark-body)",
                            }}
                        >
                            <p style={{ margin: 0, color: "#f4f2ed" }}>
                                {weeks.afterLead}
                            </p>
                            {weeks.afterBody.map((para, i) => (
                                <p key={i} style={{ margin: 0 }}>
                                    {para}
                                </p>
                            ))}
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ YOUR FIRST CLASS ============ */}
            <section
                style={{
                    paddingTop: 75,
                    paddingBottom: 75,
                    background: "var(--tbm-cream)",
                    color: "var(--tbm-ink)",
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
                            src={firstClass.image}
                            alt={firstClass.imageAlt}
                            style={{
                                width: "100%",
                                aspectRatio: "3 / 2",
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
                                {firstClass.heading}
                            </h2>
                        </Reveal>
                        {firstClass.body.map((para, i) => (
                            <Reveal key={i} amount={0.2} delay={0.08 + i * 0.08}>
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
                        <Reveal amount={0.2} delay={0.16}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 21,
                                    lineHeight: 1.5,
                                    fontStyle: "italic",
                                    color: "var(--tbm-ink)",
                                }}
                            >
                                {firstClass.italicLine}
                            </p>
                        </Reveal>
                        <Reveal amount={0.2} delay={0.24}>
                            <div style={{ paddingTop: 8 }}>
                                <a
                                    className="tbm-btn"
                                    href={firstClass.cta.href}
                                    style={{
                                        background: "var(--tbm-ink)",
                                        color: "#f4f2ed",
                                    }}
                                >
                                    {firstClass.cta.label}
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ FAQ ============ */}
            <section
                style={{
                    background: "var(--tbm-sand)",
                    paddingTop: 75,
                    paddingBottom: 75,
                    color: "var(--tbm-ink)",
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
                            }}
                        >
                            {faq.heading}
                        </h2>
                    </Reveal>
                    <div
                        className="tbm-c-r tbm-faq"
                        style={{ borderTop: "1px solid var(--tbm-rule)" }}
                    >
                        <FaqList items={faq.items} />
                        <Reveal amount={0.3}>
                            <div style={{ paddingTop: 40 }}>
                                <a
                                    className="tbm-btn"
                                    href={faq.cta.href}
                                    style={{
                                        background: "var(--tbm-ink)",
                                        color: "#f4f2ed",
                                    }}
                                >
                                    {faq.cta.label}
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </>
    );
}
