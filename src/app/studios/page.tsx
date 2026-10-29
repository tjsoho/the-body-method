/* ************************************************************
   TBM — Studios hub.

   Hero + The Difference comparison table (two studio cards side
   by side, six comparison rows) + "Want both?" band. Mirrors
   design/studios.html from the v2 handoff.
************************************************************ */

import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
    title: "Studios | The Body Method",
    description:
        "Two studios in Tugun — Tugun Beach Reformer Pilates and Cornerstone for Pilates, yoga, barre, yin, meditation and movement.",
};

/* Each comparison row: label + Tugun value + Cornerstone value. */
const COMPARISON_ROWS = [
    {
        label: "Feeling",
        tugun: "Intimate + personal",
        cornerstone: "Expansive + community focused",
    },
    { label: "Size", tugun: "Max 6", cornerstone: "Max 18" },
    {
        label: "Movement",
        tugun: "Reformer Pilates",
        cornerstone:
            "Pilates, yoga, barre, yin, meditation, stretch + movement",
    },
    {
        label: "Best for",
        tugun: "Attention, technique, confidence, core strength workout",
        cornerstone:
            "Variety, routine, energy, core strength + bodyweight training",
    },
    { label: "Privates", tugun: "Yes", cornerstone: "—" },
    {
        label: "Community/events",
        tugun: "Some",
        cornerstone: "Main community hub",
    },
] as const;

export default function StudiosPage() {
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
                    src="/images/tbm-placeholders/hero-studios.jpg"
                    alt="A calm studio room with tall windows onto trees"
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
                        style={{
                            gridColumn: "1 / 8",
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
                                Two studios - One Body Method.
                            </h1>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ THE DIFFERENCE — two studio cards + comparison rows ============ */}
            <section style={{ paddingTop: 75, paddingBottom: 75 }}>
                <div className="tbm-wrap">
                    <div className="tbm-g12" style={{ rowGap: 0 }}>
                        <Reveal amount={0.5} className="tbm-c-all">
                            <h2
                                className="tbm-lbl"
                                style={{
                                    margin: "0 auto 32px",
                                    background: "var(--tbm-forest)",
                                    color: "var(--tbm-cream)",
                                    fontSize: 13,
                                    padding: "10px 20px",
                                    display: "inline-block",
                                }}
                            >
                                The Difference
                            </h2>
                        </Reveal>

                        {/* Two studio cards side by side — Stagger so the
                            Cornerstone card lifts just behind Tugun. */}
                        <Stagger
                            className="tbm-c-all tbm-g12"
                            stagger={0.14}
                            style={{ rowGap: 0 }}
                        >
                            <StaggerItem className="tbm-c-l">
                                <Link
                                    href="/studios/tugun-beach"
                                    style={{
                                        background: "#ebe8e0",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 24,
                                        padding: "12px 12px 8px",
                                        color: "var(--tbm-ink)",
                                        textDecoration: "none",
                                    }}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/images/tbm-placeholders/studio-tugun-reformer.jpg"
                                        alt="Feet pressing the footbar of a timber Reformer"
                                        style={{
                                            width: "100%",
                                            aspectRatio: "3 / 2",
                                            objectFit: "cover",
                                            objectPosition: "center 45%",
                                        }}
                                    />
                                    <span
                                        className="cmp-name"
                                        style={{
                                            display: "block",
                                            padding: "0 20px",
                                            fontSize: "clamp(26px, 3.4vw, 48px)",
                                            lineHeight: 1.05,
                                            letterSpacing: "-.01em",
                                        }}
                                    >
                                        Tugun Beach
                                    </span>
                                </Link>
                            </StaggerItem>
                            <StaggerItem className="tbm-c-r">
                                <Link
                                    href="/studios/cornerstone"
                                    style={{
                                        background: "#ebe8e0",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 24,
                                        padding: "12px 12px 8px",
                                        color: "var(--tbm-ink)",
                                        textDecoration: "none",
                                    }}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/images/tbm-placeholders/studio-cornerstone-meditation.jpg"
                                        alt="Seated meditation facing windows full of trees"
                                        style={{
                                            width: "100%",
                                            aspectRatio: "3 / 2",
                                            objectFit: "cover",
                                            objectPosition: "center",
                                        }}
                                    />
                                    <span
                                        className="cmp-name"
                                        style={{
                                            display: "block",
                                            padding: "0 20px",
                                            fontSize: "clamp(26px, 3.4vw, 48px)",
                                            lineHeight: 1.05,
                                            letterSpacing: "-.01em",
                                        }}
                                    >
                                        Cornerstone
                                    </span>
                                </Link>
                            </StaggerItem>
                        </Stagger>

                        {/* Comparison rows — each row has two paired cells.
                            Keep the sand background flowing from the cards. */}
                        {COMPARISON_ROWS.map((row, i) => {
                            const isLast = i === COMPARISON_ROWS.length - 1;
                            const cellStyle = {
                                background: "#ebe8e0",
                                padding: isLast ? "0 32px 32px" : "0 32px",
                            } as const;
                            const innerStyle = {
                                borderTop: "1px solid #d6d1c3",
                                padding: "18px 0",
                                display: "grid",
                                gridTemplateColumns:
                                    "minmax(0, 176px) minmax(0, 1fr)",
                                columnGap: 16,
                                alignItems: "baseline",
                            } as const;
                            return (
                                <div
                                    key={row.label}
                                    role="group"
                                    aria-label={row.label}
                                    className="tbm-c-all tbm-g12 cmp-row"
                                    style={{ rowGap: 0 }}
                                >
                                    <div className="tbm-c-l" style={cellStyle}>
                                        <div style={innerStyle}>
                                            <span
                                                className="tbm-lbl"
                                                style={{
                                                    color: "var(--tbm-bronze-label)",
                                                }}
                                            >
                                                {row.label}
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: 18,
                                                    lineHeight: 1.5,
                                                    color: "var(--tbm-ink)",
                                                }}
                                            >
                                                {row.tugun}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="tbm-c-r" style={cellStyle}>
                                        <div style={innerStyle}>
                                            <span
                                                className="tbm-lbl"
                                                style={{
                                                    color: "var(--tbm-bronze-label)",
                                                }}
                                            >
                                                {row.label}
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: 18,
                                                    lineHeight: 1.5,
                                                    color: "var(--tbm-ink)",
                                                }}
                                            >
                                                {row.cornerstone}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ============ WANT BOTH? forest band ============ */}
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
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        gap: 20,
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
                            Want both?
                        </h2>
                    </Reveal>
                    <Reveal amount={0.3} delay={0.08}>
                        <p
                            style={{
                                margin: 0,
                                fontSize: "clamp(24px, 2.4vw, 32px)",
                                lineHeight: 1.35,
                                fontStyle: "italic",
                                color: "var(--tbm-cream)",
                                maxWidth: "24em",
                            }}
                        >
                            Introducing the Dual Membership across both The Body Method Studios.
                        </p>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
