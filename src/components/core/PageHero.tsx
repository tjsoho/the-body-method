/* ************************************************************
                        NOTES
   The two hero treatments the site uses.

   PhotoHero is the tall one: a full-bleed photograph under a
   double gradient, with the headline sitting at the bottom of
   the left seven columns. The gradient is what keeps the copy
   readable over any photograph, so it stays fixed rather than
   becoming editable.

   BandHero is the short forest band used where a page has no
   photograph of its own.

   Both were copied into every page file. They live here now so
   a hero behaves the same everywhere, and so each page's editor
   only has to offer the same handful of fields.
************************************************************ */

import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import RichText from "@/components/core/RichText";

/* ************************************************************
                        TYPES
************************************************************ */
export type PhotoHeroContent = {
    heading: string;
    /** Paragraphs under the headline, in order. */
    lines: string[];
    image: string;
    imageAlt: string;
    imageFocus: string;
};

export type BandHeroContent = {
    heading: string;
    lines: string[];
    /** Closing line, set larger and italic. Optional. */
    emphasisLine: string;
};

const OVERLAY =
    "linear-gradient(90deg, rgba(0,0,0,.62) 0%, rgba(0,0,0,.34) 45%, rgba(0,0,0,0) 78%), linear-gradient(180deg, rgba(0,0,0,.32) 0%, rgba(0,0,0,.08) 30%, rgba(0,0,0,.5) 62%, rgba(0,0,0,.85) 100%)";

/* ************************************************************
                        PHOTO HERO
************************************************************ */
export function PhotoHero({
    content,
    minHeight = 760,
    children,
}: {
    content: PhotoHeroContent;
    minHeight?: number;
    /** Buttons or anything else under the copy. */
    children?: ReactNode;
}) {
    return (
        <section
            style={{
                position: "relative",
                minHeight,
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
                src={content.image}
                alt={content.imageAlt}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: content.imageFocus,
                }}
            />
            <div
                aria-hidden="true"
                style={{ position: "absolute", inset: 0, background: OVERLAY }}
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
                            {content.heading}
                        </h1>
                    </Reveal>
                    {content.lines.map((line, i) => (
                        <Reveal key={i} amount={0.3} delay={0.08 + i * 0.08}>
                            <RichText
                                className="tbm-rich-on-dark"
                                value={line}
                                style={{
                                    fontSize: 17,
                                    lineHeight: 1.6,
                                    maxWidth: "34em",
                                    color: "#ece9e2",
                                }}
                            />
                        </Reveal>
                    ))}
                    {children}
                </div>
            </div>
        </section>
    );
}

/* ************************************************************
                        BAND HERO
************************************************************ */
export function BandHero({ content }: { content: BandHeroContent }) {
    const emphasisDelay = 0.08 + content.lines.length * 0.08;

    return (
        <section
            style={{
                background: "var(--tbm-forest)",
                color: "#f4f2ed",
                marginTop: -85,
                paddingTop: "calc(85px + 96px)",
                paddingBottom: 75,
            }}
        >
            <div className="tbm-wrap tbm-g12">
                <div
                    className="tbm-c-l7"
                    style={{ display: "flex", flexDirection: "column", gap: 24 }}
                >
                    <Reveal amount={0.3}>
                        <h1
                            style={{
                                margin: 0,
                                fontWeight: 400,
                                fontSize: "clamp(42px, 5.4vw, 80px)",
                                lineHeight: 1.04,
                                letterSpacing: "-.015em",
                                textWrap: "balance",
                            }}
                        >
                            {content.heading}
                        </h1>
                    </Reveal>
                    {content.lines.map((line, i) => (
                        <Reveal key={i} amount={0.2} delay={0.08 + i * 0.08}>
                            <RichText
                                className="tbm-rich-on-dark"
                                value={line}
                                style={{
                                    fontSize: 17,
                                    lineHeight: 1.6,
                                    maxWidth: "34em",
                                    color: "var(--tbm-on-dark-strong)",
                                }}
                            />
                        </Reveal>
                    ))}
                    {content.emphasisLine && (
                        <Reveal amount={0.2} delay={emphasisDelay}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 17,
                                    lineHeight: 1.6,
                                    maxWidth: "34em",
                                    color: "var(--tbm-on-dark-strong)",
                                }}
                            >
                                <strong
                                    style={{
                                        fontWeight: 500,
                                        fontSize: 21,
                                        fontStyle: "italic",
                                        color: "#f4f2ed",
                                    }}
                                >
                                    {content.emphasisLine}
                                </strong>
                            </p>
                        </Reveal>
                    )}
                </div>
            </div>
        </section>
    );
}
