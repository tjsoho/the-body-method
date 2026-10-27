/* ************************************************************
   TBM Home — Your first 21 days.

   Dark forest section. Left column: "New to TBM?" label, H2 with
   italic "The Body Method." close, and the italic subhead. Right
   column: body paragraph and the big price line with a top rule.
   Below both columns: a four-up list (3 "weeks" + 1 "then") where
   the final step uses bronze accents instead of sage. CTA at the
   bottom.
************************************************************ */

import Link from "next/link";
import type { TwentyOneDayContent } from "@/app/_config";

export default function TwentyOneDay({ content }: { content: TwentyOneDayContent }) {
    return (
        <section
            id="new-here"
            style={{
                background: "var(--tbm-forest)",
                color: "var(--tbm-cream)",
                paddingTop: 75,
                paddingBottom: 75,
                fontFamily: "var(--font-lora)",
            }}
        >
            <div className="tbm-wrap tbm-g12" style={{ rowGap: 64, alignItems: "flex-start" }}>
                <div
                    className="tbm-c-l"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 24,
                        paddingRight: 24,
                    }}
                >
                    <div
                        className="tbm-lbl"
                        style={{ color: "var(--tbm-on-dark-label)", fontSize: 13 }}
                    >
                        {content.label}
                    </div>
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 400,
                            fontSize: "clamp(40px, 4.6vw, 64px)",
                            lineHeight: 1.05,
                            letterSpacing: "-.01em",
                        }}
                    >
                        {content.headingLead}
                        <em>{content.headingItalic}</em>
                    </h2>
                    <p
                        style={{
                            margin: 0,
                            fontSize: 21,
                            lineHeight: 1.5,
                            fontStyle: "italic",
                            color: "var(--tbm-on-dark-strong)",
                        }}
                    >
                        {content.italicLine}
                    </p>
                </div>

                <div
                    className="tbm-c-r"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 32,
                        paddingTop: 42,
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            fontSize: 18,
                            lineHeight: 1.7,
                            color: "var(--tbm-on-dark-body)",
                            maxWidth: "34em",
                        }}
                    >
                        {content.body}
                    </p>
                    <p
                        style={{
                            margin: 0,
                            borderTop: "1px solid rgba(175,177,161,.35)",
                            paddingTop: 32,
                            fontSize: "clamp(34px, 3.6vw, 52px)",
                            lineHeight: 1.1,
                        }}
                    >
                        {content.priceLine}
                    </p>
                </div>

                <ol
                    className="tbm-c-all tbm-g12"
                    style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        rowGap: 40,
                    }}
                >
                    {content.steps.map((step, i) => {
                        const isLast = i === content.steps.length - 1;
                        const borderColor = isLast
                            ? "#a88d66"
                            : "rgba(175,177,161,.35)";
                        const labelColor = isLast
                            ? "#a88d66"
                            : "var(--tbm-on-dark-sage)";
                        return (
                            <li
                                key={i}
                                className="tbm-c-q"
                                style={{
                                    borderTop: `1px solid ${borderColor}`,
                                    paddingTop: 32,
                                    paddingRight: 16,
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
                                        fontStyle: step.italic ? "italic" : "normal",
                                    }}
                                >
                                    <span
                                        className="tbm-lbl"
                                        style={{
                                            display: "block",
                                            color: labelColor,
                                            fontSize: 13,
                                            paddingBottom: 12,
                                            fontStyle: "normal",
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
                            </li>
                        );
                    })}
                </ol>

                <div className="tbm-c-all">
                    <Link
                        href={content.cta.href}
                        className="tbm-btn"
                        style={{
                            background: "var(--tbm-cream)",
                            color: "var(--tbm-forest)",
                            minHeight: 56,
                            padding: "0 36px",
                        }}
                    >
                        {content.cta.label}
                    </Link>
                </div>
            </div>
        </section>
    );
}
