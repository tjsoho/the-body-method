/* ************************************************************
   TBM Home — Private Pilates.

   Two-column split on cream. Left (columns 1-5): heading, italic
   subhead, two body paragraphs, link out. Right (columns 7-12):
   portrait image. Image height mirrors the V3 exactly so the
   bottom of the image aligns with the end of the left column copy.
************************************************************ */

import Link from "next/link";
import type { PrivatePilatesContent } from "@/app/_config";

export default function PrivatePilates({ content }: { content: PrivatePilatesContent }) {
    return (
        <section
            id="private-pilates"
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
                style={{ rowGap: 48, alignItems: "flex-start" }}
            >
                <div
                    className="tbm-c-l5"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 24,
                    }}
                >
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 400,
                            fontSize: "clamp(36px, 4vw, 56px)",
                            lineHeight: 1.1,
                        }}
                    >
                        {content.heading}
                    </h2>
                    <p
                        style={{
                            margin: 0,
                            fontSize: 21,
                            lineHeight: 1.5,
                            fontStyle: "italic",
                            color: "var(--tbm-green-accent)",
                        }}
                    >
                        {content.italicLine}
                    </p>
                    {content.body.map((para, i) => (
                        <p
                            key={i}
                            style={{
                                margin: 0,
                                fontSize: 18,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-body)",
                            }}
                        >
                            {para}
                        </p>
                    ))}
                    <div style={{ paddingTop: 8 }}>
                        <Link
                            href={content.cta.href}
                            className="tbm-lnk"
                            style={{ color: "var(--tbm-forest)" }}
                        >
                            {content.cta.label} <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>

                <div
                    className="tbm-c-r"
                    style={{ position: "relative", height: 524 }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={content.image}
                        alt={content.imageAlt}
                        style={{
                            width: "100%",
                            aspectRatio: "4 / 5",
                            objectFit: "cover",
                            height: 529,
                            objectPosition: "50% 0%",
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
