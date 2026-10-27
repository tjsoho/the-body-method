/* ************************************************************
   TBM Home — Belong.

   The brand-difference section. Headline split with an italic second
   half in green-accent, a side image on the right, and the four
   pillars in a row underneath separated by a top rule.
************************************************************ */

import type { BelongContent } from "@/app/_config";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export default function Belong({ content }: { content: BelongContent }) {
    return (
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
                style={{ rowGap: 64, alignItems: "start" }}
            >
                <div
                    className="tbm-c-l5"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 32,
                    }}
                >
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 400,
                            fontSize: "clamp(36px, 4vw, 56px)",
                            lineHeight: 1.1,
                            letterSpacing: "-.01em",
                            textWrap: "balance",
                        }}
                    >
                        {content.headingLead}
                        <em style={{ color: "var(--tbm-green-accent)" }}>
                            {content.headingItalic}
                        </em>
                    </h2>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                            fontSize: 18,
                            lineHeight: 1.7,
                            color: "var(--tbm-text-body)",
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontStyle: "italic",
                                fontSize: 21,
                                lineHeight: 1.5,
                                color: "var(--tbm-ink)",
                            }}
                        >
                            {content.italicLine}
                        </p>
                        {content.body.map((para, i) => (
                            <p key={i} style={{ margin: 0 }}>
                                {para}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="tbm-c-r" style={{ position: "relative" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={content.image}
                        alt={content.imageAlt}
                        style={{
                            width: "100%",
                            aspectRatio: "4 / 3",
                            objectFit: "cover",
                            objectPosition: "center 35%",
                        }}
                    />
                </div>

                {/* Four pillars — wave in left to right once the row
                    enters the viewport. 160ms between pillars gives a
                    slow, flowing cadence (not a snap).                  */}
                <Stagger
                    className="tbm-c-all tbm-g12"
                    style={{
                        rowGap: 40,
                        borderTop: "1px solid var(--tbm-rule)",
                        paddingTop: 40,
                    }}
                    stagger={0.16}
                >
                    {content.pillars.map((p, i) => (
                        <StaggerItem
                            key={i}
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
                                {p.title}
                            </h3>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.6,
                                    color: "var(--tbm-text-muted)",
                                }}
                            >
                                {p.body}
                            </p>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
