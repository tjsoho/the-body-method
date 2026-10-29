/* ************************************************************
   /memberships — the "pricing page" the copy refers to.

   Hero + three price-tier cards (Cornerstone, Tugun Beach, Dual
   on dark), a Private Pilates split, and a Class Packs vs Casual
   two-column section.
************************************************************ */

import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
    title: "Pilates & Yoga Memberships Tugun and Cornerstone Stores - The Body Method",
    description:
        "Find the studio, membership or class pack that works with your life and makes it easier to keep showing up at The Body Method.",
};

export default function MembershipsPage() {
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
                    src="/images/tbm-placeholders/hero-members.jpg"
                    alt="A rolled mat, linen towel and water bottle on a sunny bench"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center 55%",
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
                                Find your rhythm:
                            </h1>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.15}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 17,
                                    lineHeight: 1.6,
                                    maxWidth: "34em",
                                    color: "#ece9e2",
                                }}
                            >
                                The best membership isn&apos;t the one with the most classes.
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.3}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 17,
                                    lineHeight: 1.6,
                                    maxWidth: "34em",
                                    color: "#ece9e2",
                                }}
                            >
                                It&apos;s the one that helps movement become part of your life.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

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
                            Find the studio, membership or class pack that works with your life and makes it easier to keep showing up.
                        </p>
                    </Reveal>

                    <Stagger
                        className="tbm-c-all tbm-g12"
                        style={{ rowGap: 24, alignItems: "stretch" }}
                        stagger={0.35}
                    >
                        {/* Cornerstone Unlimited */}
                        <StaggerItem
                            className="tbm-c-t"
                            style={{
                                background: "var(--tbm-cream)",
                                color: "var(--tbm-ink)",
                                border: "1px solid var(--tbm-rule)",
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
                                    color: "var(--tbm-bronze-label)",
                                    fontSize: 13,
                                }}
                            >
                                CORNERSTONE UNLIMITED MEMBERSHIP
                            </h2>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "clamp(40px, 4vw, 56px)",
                                    lineHeight: 1,
                                    letterSpacing: "-.01em",
                                }}
                            >
                                $49/week
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-muted)",
                                }}
                            >
                                For people who love variety and the energy of our larger community studio.
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-muted)",
                                }}
                            >
                                Enjoy{" "}
                                <strong style={{ fontWeight: 500, color: "var(--tbm-ink)" }}>
                                    unlimited access
                                </strong>{" "}
                                to our Cornerstone group timetable, including Mat Pilates, Barre, Yoga, Yin, Power Pilates, Stretch + Release, Meditation and more.
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-muted)",
                                }}
                            >
                                <strong style={{ fontWeight: 500, color: "var(--tbm-ink)" }}>
                                    12-week minimum commitment.
                                </strong>
                            </p>
                            <div style={{ marginTop: "auto", paddingTop: 12 }}>
                                <a
                                    className="tbm-btn"
                                    href="#momence-membership"
                                    style={{ background: "var(--tbm-ink)", color: "var(--tbm-cream)" }}
                                >
                                    CHOOSE CORNERSTONE
                                </a>
                            </div>
                        </StaggerItem>

                        {/* Tugun Beach Unlimited */}
                        <StaggerItem
                            className="tbm-c-t"
                            style={{
                                background: "var(--tbm-cream)",
                                color: "var(--tbm-ink)",
                                border: "1px solid var(--tbm-rule)",
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
                                    color: "var(--tbm-bronze-label)",
                                    fontSize: 13,
                                }}
                            >
                                TUGUN BEACH UNLIMITED MEMBERSHIP
                            </h2>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "clamp(40px, 4vw, 56px)",
                                    lineHeight: 1,
                                    letterSpacing: "-.01em",
                                }}
                            >
                                $75/week
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-muted)",
                                }}
                            >
                                For people who love Reformer Pilates and the support of a smaller, more personalised studio experience.
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-muted)",
                                }}
                            >
                                Enjoy{" "}
                                <strong style={{ fontWeight: 500, color: "var(--tbm-ink)" }}>
                                    unlimited Reformer
                                </strong>{" "}
                                at Tugun Beach, with classes capped at just six people so there&rsquo;s more space for individual attention, guidance and connection.
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-muted)",
                                }}
                            >
                                <strong style={{ fontWeight: 500, color: "var(--tbm-ink)" }}>
                                    12-week minimum commitment and booking window is 21 days in advance.
                                </strong>
                            </p>
                            <div style={{ marginTop: "auto", paddingTop: 12 }}>
                                <a
                                    className="tbm-btn"
                                    href="#momence-membership"
                                    style={{ background: "var(--tbm-ink)", color: "var(--tbm-cream)" }}
                                >
                                    CHOOSE TUGUN BEACH
                                </a>
                            </div>
                        </StaggerItem>

                        {/* Dual — forest */}
                        <StaggerItem
                            className="tbm-c-t"
                            style={{
                                background: "var(--tbm-forest)",
                                color: "var(--tbm-cream)",
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
                                    color: "var(--tbm-on-dark-label)",
                                    fontSize: 13,
                                }}
                            >
                                DUAL MEMBERSHIP - BOTH STUDIOS
                            </h2>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 19,
                                    lineHeight: 1.45,
                                    fontStyle: "italic",
                                    color: "var(--tbm-cream)",
                                }}
                            >
                                The best of both Body Method worlds, brought together in one membership.
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "clamp(40px, 4vw, 56px)",
                                    lineHeight: 1,
                                    letterSpacing: "-.01em",
                                }}
                            >
                                $69/week
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-on-dark-body)",
                                }}
                            >
                                Enjoy{" "}
                                <strong style={{ fontWeight: 500, color: "var(--tbm-cream)" }}>
                                    5 classes a week at Cornerstone + 2 classes a week at Tugun Beach
                                </strong>{" "}
                                - giving you the personalised Reformer experience of our smaller studio alongside the variety of Pilates, Yoga, Barre, Meditation and more at Cornerstone.
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-on-dark-body)",
                                }}
                            >
                                More classes, more variety and more ways to build a movement routine that works for you.
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-on-dark-body)",
                                }}
                            >
                                <strong style={{ fontWeight: 500, color: "var(--tbm-cream)" }}>
                                    12-week minimum commitment and booking window is 21 days in advance.
                                </strong>
                            </p>
                            <div style={{ marginTop: "auto", paddingTop: 12 }}>
                                <a
                                    className="tbm-btn"
                                    href="#momence-membership"
                                    style={{ background: "var(--tbm-cream)", color: "var(--tbm-forest)" }}
                                >
                                    CHOOSE DUAL
                                </a>
                            </div>
                        </StaggerItem>
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
                                PRIVATE PILATES
                            </h2>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.15}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-body)",
                                }}
                            >
                                Want a little more individual attention? Private Pilates gives you dedicated time with a senior instructor and a session shaped around your body, your goals and what you need that day.
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.3}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-body)",
                                }}
                            >
                                Perfect if you&rsquo;re new to Pilates, working with an injury, pregnant or postnatal, or simply prefer a more personalised approach.
                            </p>
                        </Reveal>
                    </div>
                    <div
                        className="tbm-c-r tbm-g12"
                        style={{
                            rowGap: 40,
                            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        }}
                    >
                        <Reveal amount={0.2}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                <h3
                                    style={{
                                        margin: 0,
                                        fontWeight: 500,
                                        fontSize: 21,
                                        lineHeight: 1.3,
                                    }}
                                >
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
                        <Reveal amount={0.2} delay={0.15}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                <h3
                                    style={{
                                        margin: 0,
                                        fontWeight: 500,
                                        fontSize: 21,
                                        lineHeight: 1.3,
                                    }}
                                >
                                    1:2 Duets Pilates
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
                        <Reveal amount={0.2} delay={0.3} style={{ gridColumn: "1 / -1" }}>
                            <a
                                className="tbm-btn"
                                href="#momence-private"
                                style={{ background: "var(--tbm-ink)", color: "var(--tbm-cream)" }}
                            >
                                BOOK A PRIVATE
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
                                CLASS PACKS
                            </h2>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.15}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-body)",
                                }}
                            >
                                Prefer a little more flexibility? Purchase a class pack and use your sessions when they work for you. All 5, 10 and 20 class packs are valid for six months.
                            </p>
                        </Reveal>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                                gap: 24,
                            }}
                        >
                            <Reveal amount={0.2}>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    <h3 style={{ margin: 0, fontWeight: 500, fontSize: 21, lineHeight: 1.3 }}>
                                        Cornerstone
                                    </h3>
                                    <ul
                                        style={{
                                            listStyle: "none",
                                            margin: 0,
                                            padding: 0,
                                            borderBottom: "1px solid var(--tbm-rule)",
                                        }}
                                    >
                                        <li style={{ borderTop: "1px solid var(--tbm-rule)", padding: "12px 0", fontSize: 17, lineHeight: 1.5, color: "var(--tbm-text-body)" }}>5 classes &mdash; <strong style={{ fontWeight: 500 }}>$130</strong></li>
                                        <li style={{ borderTop: "1px solid var(--tbm-rule)", padding: "12px 0", fontSize: 17, lineHeight: 1.5, color: "var(--tbm-text-body)" }}>10 classes &mdash; <strong style={{ fontWeight: 500 }}>$240</strong></li>
                                        <li style={{ borderTop: "1px solid var(--tbm-rule)", padding: "12px 0", fontSize: 17, lineHeight: 1.5, color: "var(--tbm-text-body)" }}>20 classes &mdash; <strong style={{ fontWeight: 500 }}>$440</strong></li>
                                    </ul>
                                </div>
                            </Reveal>
                            <Reveal amount={0.2} delay={0.15}>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    <h3 style={{ margin: 0, fontWeight: 500, fontSize: 21, lineHeight: 1.3 }}>
                                        Tugun Beach Reformer
                                    </h3>
                                    <ul
                                        style={{
                                            listStyle: "none",
                                            margin: 0,
                                            padding: 0,
                                            borderBottom: "1px solid var(--tbm-rule)",
                                        }}
                                    >
                                        <li style={{ borderTop: "1px solid var(--tbm-rule)", padding: "12px 0", fontSize: 17, lineHeight: 1.5, color: "var(--tbm-text-body)" }}>5 classes &mdash; <strong style={{ fontWeight: 500 }}>$180</strong></li>
                                        <li style={{ borderTop: "1px solid var(--tbm-rule)", padding: "12px 0", fontSize: 17, lineHeight: 1.5, color: "var(--tbm-text-body)" }}>10 classes &mdash; <strong style={{ fontWeight: 500 }}>$340</strong></li>
                                        <li style={{ borderTop: "1px solid var(--tbm-rule)", padding: "12px 0", fontSize: 17, lineHeight: 1.5, color: "var(--tbm-text-body)" }}>20 classes &mdash; <strong style={{ fontWeight: 500 }}>$640</strong></li>
                                        <li style={{ borderTop: "1px solid var(--tbm-rule)", padding: "12px 0", fontSize: 17, lineHeight: 1.5, color: "var(--tbm-text-body)" }}>50 classes &mdash; <strong style={{ fontWeight: 500 }}>$1,500</strong> <em>(valid for 12 months)</em></li>
                                    </ul>
                                </div>
                            </Reveal>
                        </div>
                        <Reveal amount={0.2} delay={0.3}>
                            <a
                                className="tbm-btn"
                                href="#momence-packs"
                                style={{ background: "var(--tbm-ink)", color: "var(--tbm-cream)" }}
                            >
                                CHOOSE A CLASS PACK
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
                                CASUAL OPTIONS
                            </h2>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.15}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 21,
                                    lineHeight: 1.5,
                                    fontStyle: "italic",
                                    color: "var(--tbm-ink)",
                                }}
                            >
                                Just want to drop in? You&rsquo;re always welcome.
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.3}>
                            <ul
                                style={{
                                    listStyle: "none",
                                    margin: 0,
                                    padding: 0,
                                    borderBottom: "1px solid var(--tbm-rule)",
                                }}
                            >
                                <li style={{ borderTop: "1px solid var(--tbm-rule)", padding: "14px 0", fontSize: 19, fontWeight: 500 }}>
                                    Cornerstone - $28 per class
                                </li>
                                <li style={{ borderTop: "1px solid var(--tbm-rule)", padding: "14px 0", fontSize: 19, fontWeight: 500 }}>
                                    Tugun Beach Reformer - $39 per class
                                </li>
                            </ul>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.45}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-body)",
                                }}
                            >
                                Choose your class, book your spot and come move with us.
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.6}>
                            <Link
                                className="tbm-btn"
                                href="/book"
                                style={{ background: "var(--tbm-ink)", color: "var(--tbm-cream)" }}
                            >
                                BOOK A CLASS
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>
        </>
    );
}
