/* ************************************************************
   /about — Our Story.

   Faithful conversion of design/about.html. Server component with
   Reveal (hero cascade + feature portraits) and the four Belief
   pillars staggered as a row.
************************************************************ */

import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
    title: "About The Body Method | Tugun, Gold Coast",
    description:
        "A different idea of strength. The story behind The Body Method and the philosophy that shapes our Tugun studios.",
};

const beliefs = [
    {
        title: "Exceptional Teaching",
        body: "Technical, intuitive and adaptive.",
    },
    {
        title: "Care You Can Feel",
        body: "Where you are known and supported.",
    },
    {
        title: "Strength for Life",
        body: "Movement that supports how you move, work, play and live.",
    },
    {
        title: "Community That Holds You",
        body: "A place you actually want to come back to.",
    },
];

export default function AboutPage() {
    return (
        <div
            style={{
                background: "var(--tbm-cream)",
                color: "var(--tbm-ink)",
                fontFamily: "var(--font-lora)",
            }}
        >
            {/* ============ HERO ============ */}
            <section
                style={{
                    position: "relative",
                    minHeight: 760,
                    marginTop: -85,
                    paddingTop: 85,
                    color: "#f4f2ed",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/tbm-placeholders/hero-about.jpg"
                    alt="A woman holding a side plank in front of tall windows"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center 45%",
                    }}
                />
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(90deg, rgba(0,0,0,.62) 0%, rgba(0,0,0,.34) 45%, rgba(0,0,0,0) 78%), linear-gradient(180deg, rgba(0,0,0,.32) 0%, rgba(0,0,0,.08) 30%, rgba(0,0,0,.5) 62%, rgba(0,0,0,.85) 100%)",
                    }}
                />
                <div
                    className="tbm-wrap tbm-g12"
                    style={{
                        position: "relative",
                        marginTop: "auto",
                        paddingBottom: 75,
                    }}
                >
                    <div
                        className="tbm-c-l7"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 24,
                        }}
                    >
                        <Reveal amount={0.3}>
                            <h1
                                style={{
                                    textShadow: "0 1px 24px rgba(0,0,0,.25)",
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: "clamp(42px, 5.4vw, 80px)",
                                    lineHeight: 1.04,
                                    letterSpacing: "-.015em",
                                    textWrap: "balance",
                                }}
                            >
                                A different idea of strength.
                            </h1>
                        </Reveal>
                        <Reveal delay={0.08} amount={0.3}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 17,
                                    lineHeight: 1.6,
                                    maxWidth: "34em",
                                    color: "#ece9e2",
                                }}
                            >
                                Strength isn&apos;t only what happens when something gets heavier.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

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
                                It&apos;s confidence in your body - the capacity to keep doing the things you love.
                            </p>
                        </Reveal>
                        <Reveal delay={0.08} amount={0.3}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-body)",
                                }}
                            >
                                Knowing when to push and when to listen. Showing up for yourself and having people around you who notice when you do. That&apos;s the kind of strength we&apos;re interested in.
                            </p>
                        </Reveal>
                    </div>
                    <Reveal
                        amount={0.2}
                        delay={0.05}
                        style={{ gridColumn: "8 / 13", position: "relative" }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/tbm-placeholders/portrait-about.jpg"
                            alt="A linen bolster, blanket and blocks on a mat by a sunny window"
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
                            src="/images/tbm-placeholders/belong-tree-pose.jpg"
                            alt="Hands at heart in tree pose on a sage mat"
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
                                We actually genuinely care.
                            </h2>
                        </Reveal>
                        <Reveal delay={0.08} amount={0.3}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-body)",
                                }}
                            >
                                About the quality of the teaching, about the people who walk through our doors. About remembering your name and understanding your body and about creating somewhere people feel better for having spent time.
                            </p>
                        </Reveal>
                        <Reveal delay={0.16} amount={0.3}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 24,
                                    lineHeight: 1.4,
                                    fontStyle: "italic",
                                    color: "var(--tbm-green-accent)",
                                }}
                            >
                                That philosophy has shaped The Body Method from the beginning.
                            </p>
                        </Reveal>
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
                            What We Believe:
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
                        {beliefs.map((b) => (
                            <StaggerItem
                                key={b.title}
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
                                    {b.title}
                                </h3>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 16,
                                        lineHeight: 1.6,
                                        color: "var(--tbm-text-muted)",
                                    }}
                                >
                                    {b.body}
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
                            Built in Tugun and built around people.
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
                        <Reveal amount={0.3}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-on-dark-body)",
                                }}
                            >
                                Today, The Body Method lives across two Tugun studios with different personalities and one shared philosophy.
                            </p>
                        </Reveal>
                        <Reveal delay={0.08} amount={0.3}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-on-dark-body)",
                                }}
                            >
                                And we&apos;re still building, not toward being the biggest.
                            </p>
                        </Reveal>
                        <Reveal delay={0.16} amount={0.3}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 24,
                                    lineHeight: 1.4,
                                    fontStyle: "italic",
                                    color: "#f4f2ed",
                                }}
                            >
                                Toward being one of the places that matters most to the people who choose it.
                            </p>
                        </Reveal>
                        <Reveal delay={0.24} amount={0.3}>
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
                                    href="/our-people"
                                    style={{
                                        background: "var(--tbm-cream)",
                                        color: "var(--tbm-forest)",
                                    }}
                                >
                                    MEET OUR PEOPLE
                                </Link>
                                <Link
                                    className="tbm-btn tbm-hero-cta"
                                    href="/studios"
                                    style={{
                                        color: "#f4f2ed",
                                        border: "1px solid rgba(244,242,237,.7)",
                                    }}
                                >
                                    EXPLORE THE STUDIOS
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </div>
    );
}
