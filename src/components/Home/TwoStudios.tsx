/* ************************************************************
   TBM Home — Two Studios.

   Centred H2 ("Two Studios. Two ways to move.") sitting on the cream
   section, then a full-bleed two-up card row with a 1px vertical rule
   between them (and a 1px top rule on the Cornerstone side on narrow
   layouts). The Dual Membership block sits centred underneath on the
   same cream background.

   Grid uses the exact auto-fit minmax formula from the V3 design so
   the cards wrap to a single column at ≤520px without a media query.
************************************************************ */

import Link from "next/link";
import type { TwoStudiosContent, StudioCard } from "@/app/_config";

function StudioArticle({
    card,
    withLeftBorder,
    linkColor,
}: {
    card: StudioCard;
    withLeftBorder: boolean;
    linkColor: string;
}) {
    return (
        <article
            style={{
                display: "flex",
                flexDirection: "column",
                background: "#f4f2ed",
                color: "#191b1f",
                borderLeft: withLeftBorder ? "1px solid #c9c7bd" : undefined,
            }}
        >
            <div style={{ position: "relative", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={card.image}
                    alt={card.imageAlt}
                    style={{
                        width: "100%",
                        aspectRatio: "4 / 4.4",
                        objectFit: "cover",
                        objectPosition: "center 45%",
                    }}
                />
            </div>
            <div
                style={{
                    padding: "clamp(32px, 4vw, 64px)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 22,
                    flex: 1,
                    background: "#f4f2ed",
                }}
            >
                <h3
                    style={{
                        margin: 0,
                        fontWeight: 400,
                        fontSize: "clamp(34px, 3.4vw, 48px)",
                        lineHeight: 1.05,
                        color: "var(--tbm-ink)",
                        fontFamily: "var(--font-lora)",
                    }}
                >
                    {card.name}
                </h3>
                <p
                    style={{
                        margin: 0,
                        fontSize: 21,
                        lineHeight: 1.45,
                        fontStyle: "italic",
                        color: "var(--tbm-ink)",
                        fontFamily: "var(--font-lora)",
                    }}
                >
                    {card.italicLine}
                </p>
                <p
                    style={{
                        margin: 0,
                        fontSize: 16,
                        lineHeight: 1.7,
                        color: "var(--tbm-text-muted)",
                        maxWidth: 520,
                        fontFamily: "var(--font-lora)",
                    }}
                >
                    {card.body}
                </p>
                <div style={{ paddingTop: 8, marginTop: "auto" }}>
                    <Link
                        className="tbm-lnk"
                        href={card.ctaHref}
                        style={{ color: linkColor }}
                    >
                        {card.ctaLabel} <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </article>
    );
}

export default function TwoStudios({ content }: { content: TwoStudiosContent }) {
    return (
        <section
            id="studios"
            style={{
                paddingTop: 75,
                paddingBottom: 0,
                background: "var(--tbm-cream)",
                color: "var(--tbm-ink)",
                fontFamily: "var(--font-lora)",
            }}
        >
            <div className="tbm-wrap" style={{ paddingBottom: 75 }}>
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 400,
                        fontSize: "clamp(36px, 4vw, 58px)",
                        lineHeight: 1.1,
                        textAlign: "center",
                    }}
                >
                    {content.headingLead}
                    <br />
                    <em style={{ color: "var(--tbm-green-accent)" }}>
                        {content.headingItalic}
                    </em>
                </h2>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(min(520px, 100%), 1fr))",
                    gap: 0,
                }}
            >
                <StudioArticle
                    card={content.tugunBeach}
                    withLeftBorder={false}
                    linkColor="var(--tbm-forest)"
                />
                <StudioArticle
                    card={content.cornerstone}
                    withLeftBorder={true}
                    linkColor="var(--tbm-ink)"
                />
            </div>

            {/* Dual Membership block — centred under the cards on cream. */}
            <div style={{ background: "var(--tbm-cream)", color: "var(--tbm-ink)" }}>
                <div
                    className="tbm-wrap"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        gap: 24,
                        paddingTop: 75,
                        paddingBottom: 75,
                    }}
                >
                    <h3
                        style={{
                            margin: 0,
                            fontWeight: 400,
                            fontSize: 32,
                            lineHeight: 1.2,
                            fontStyle: "italic",
                        }}
                    >
                        {content.dualHeading}
                    </h3>
                    <p
                        style={{
                            margin: 0,
                            fontSize: 17,
                            lineHeight: 1.6,
                            maxWidth: 600,
                            color: "var(--tbm-text-muted)",
                        }}
                    >
                        {content.dualBody}
                    </p>
                    <Link
                        href={content.dualCta.href}
                        className="tbm-btn"
                        style={{
                            background: "var(--tbm-ink)",
                            color: "var(--tbm-cream)",
                            marginTop: 8,
                        }}
                    >
                        {content.dualCta.label}
                    </Link>
                </div>
            </div>
        </section>
    );
}
