/* ************************************************************
   /private-pilates — Private Pilates.

   Hero + centered pullquote + "useful when" list + first-session
   panel + forest "Private → Semi-private → Small Group" split +
   pricing.
************************************************************ */

import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
    title: "Private Pilates Tugun Gold Coast | The Body Method",
    description:
        "Dedicated time with an experienced teacher to understand your body, work toward something specific and move at the pace that’s right for you.",
};

const useCases = [
    "Returning to movement after injury",
    "Are a professional athlete wanting personalised training",
    "New to Pilates and wanting confidence first",
    "Working on technique",
    "Pregnant or postpartum",
    "Managing specific movement needs",
    "Wanting individual attention",
    "Building toward group classes",
];

export default function PrivatePilatesPage() {
    return (
        <>
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
                    src="/images/tbm-placeholders/hero-private.jpg"
                    alt="A teacher's hands supporting a client's leg in a Reformer strap"
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
                        style={{ display: "flex", flexDirection: "column", gap: 24 }}
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
                                Movement built around you.
                            </h1>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.08}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 17,
                                    lineHeight: 1.6,
                                    maxWidth: "34em",
                                    color: "#ece9e2",
                                }}
                            >
                                Sometimes a group class is exactly what you need.
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.16}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 17,
                                    lineHeight: 1.6,
                                    maxWidth: "34em",
                                    color: "#ece9e2",
                                }}
                            >
                                Sometimes it isn&apos;t.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

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
                    style={{ display: "flex", justifyContent: "center", textAlign: "center" }}
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
                            Private Pilates gives you dedicated time with an experienced teacher to understand your body, work toward something specific and move at the pace that&apos;s right for you.
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
                            Private Pilates can be particularly useful when you&apos;re:
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
                            {useCases.map((u) => (
                                <li
                                    key={u}
                                    style={{
                                        borderTop: "1px solid var(--tbm-rule)",
                                        padding: "16px 0",
                                        fontSize: 18,
                                        lineHeight: 1.5,
                                        color: "var(--tbm-text-body)",
                                    }}
                                >
                                    {u}
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
                            src="/images/tbm-placeholders/portrait-priv-first.jpg"
                            alt="A teacher and client talking on a Reformer before a session"
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
                        style={{
                            gridColumn: "6 / 13",
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
                            Your first session starts with you:
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
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "clamp(20px, 1.8vw, 24px)",
                                    lineHeight: 1.5,
                                    color: "var(--tbm-ink)",
                                }}
                            >
                                Not a predetermined workout. We begin with where you are, what you&apos;re experiencing and what you&apos;d like movement to help you do.
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
                                From there, your teacher builds the session around you.
                            </p>
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
                            src="/images/tbm-placeholders/landscape-priv-semi.jpg"
                            alt="Three Reformers side by side in a small group session"
                            style={{
                                width: "100%",
                                aspectRatio: "3 / 2",
                                objectFit: "cover",
                                objectPosition: "center",
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
                                Private doesn&rsquo;t have to mean forever.
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
                                For some people, private Pilates is their preferred way to move.
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.16}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-on-dark-body)",
                                }}
                            >
                                For others, it&apos;s the beginning:
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
                                    <span>Private</span>
                                    <span aria-hidden="true" style={{ color: "var(--tbm-on-dark-bronze)", padding: "0 14px" }}>&rarr;</span>
                                    <span>Semi-private</span>
                                    <span aria-hidden="true" style={{ color: "var(--tbm-on-dark-bronze)", padding: "0 14px" }}>&rarr;</span>
                                    <span>Small Group</span>
                                </strong>
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.24}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-on-dark-body)",
                                }}
                            >
                                When you&apos;re ready, we can help you find the next environment that works for you.
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.32}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-on-dark-strong)",
                                    fontStyle: "italic",
                                }}
                            >
                                Perfect if you&rsquo;re new to Pilates, working with an injury, pregnant or postnatal, or simply prefer a more personalised approach.
                            </p>
                        </Reveal>
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
                            Pricing:
                        </h2>
                    </Reveal>
                    <div
                        className="tbm-c-r tbm-g12"
                        style={{
                            rowGap: 40,
                            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        }}
                    >
                        <Reveal amount={0.2}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                <h3 style={{ margin: 0, fontWeight: 500, fontSize: 21, lineHeight: 1.3 }}>
                                    1:1 Private Pilates
                                </h3>
                                <ul
                                    style={{
                                        listStyle: "none",
                                        margin: 0,
                                        padding: 0,
                                        borderBottom: "1px solid var(--tbm-rule)",
                                    }}
                                >
                                    <li style={{ borderTop: "1px solid var(--tbm-rule)", padding: "12px 0", fontSize: 17, lineHeight: 1.5, color: "var(--tbm-text-body)" }}>Single session &mdash; $100</li>
                                    <li style={{ borderTop: "1px solid var(--tbm-rule)", padding: "12px 0", fontSize: 17, lineHeight: 1.5, color: "var(--tbm-text-body)" }}>5 sessions &mdash; $480</li>
                                    <li style={{ borderTop: "1px solid var(--tbm-rule)", padding: "12px 0", fontSize: 17, lineHeight: 1.5, color: "var(--tbm-text-body)" }}>10 sessions &mdash; $940</li>
                                </ul>
                            </div>
                        </Reveal>
                        <Reveal amount={0.2} delay={0.08}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                <h3 style={{ margin: 0, fontWeight: 500, fontSize: 21, lineHeight: 1.3 }}>
                                    1:2 Private Pilates
                                </h3>
                                <p style={{ margin: "0 0 6px", fontSize: 14, color: "var(--tbm-text-body)" }}>
                                    Come with a friend, partner or family member.
                                </p>
                                <ul
                                    style={{
                                        listStyle: "none",
                                        margin: 0,
                                        padding: 0,
                                        borderBottom: "1px solid var(--tbm-rule)",
                                    }}
                                >
                                    <li style={{ borderTop: "1px solid var(--tbm-rule)", padding: "12px 0", fontSize: 17, lineHeight: 1.5, color: "var(--tbm-text-body)" }}>Single session &mdash; $70 per person</li>
                                    <li style={{ borderTop: "1px solid var(--tbm-rule)", padding: "12px 0", fontSize: 17, lineHeight: 1.5, color: "var(--tbm-text-body)" }}>5 sessions &mdash; $330 per person</li>
                                    <li style={{ borderTop: "1px solid var(--tbm-rule)", padding: "12px 0", fontSize: 17, lineHeight: 1.5, color: "var(--tbm-text-body)" }}>10 sessions &mdash; $600 per person</li>
                                </ul>
                            </div>
                        </Reveal>
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
                                href="#momence-private"
                                style={{ background: "var(--tbm-ink)", color: "var(--tbm-cream)" }}
                            >
                                BOOK A PRIVATE
                            </a>
                            <Link
                                className="tbm-lnk"
                                href="/contact"
                                style={{ color: "var(--tbm-forest)" }}
                            >
                                TALK TO US ABOUT PRIVATE PILATES <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>
        </>
    );
}
