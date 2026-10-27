/* ************************************************************
   TBM Home — Final CTA.

   Full-bleed photo with a flat 66% dark overlay (matches V3) so
   the centered headline, price line and CTA pass WCAG AA. H2
   scales to a huge display size at the top end (96px) so this
   section reads as the closing invitation.
************************************************************ */

import Link from "next/link";
import type { FinalCtaContent } from "@/app/_config";

export default function FinalCta({ content }: { content: FinalCtaContent }) {
    return (
        <section
            style={{
                position: "relative",
                minHeight: 720,
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                color: "var(--tbm-cream)",
                fontFamily: "var(--font-lora)",
            }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={content.backgroundImage}
                alt={content.backgroundImageAlt}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,.66)",
                }}
            />
            <div
                className="tbm-wrap"
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 32,
                    paddingTop: 75,
                    paddingBottom: 75,
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 400,
                        fontSize: "clamp(44px, 6vw, 96px)",
                        lineHeight: 1.02,
                        letterSpacing: "-.015em",
                        textShadow: "0 1px 24px rgba(0,0,0,.25)",
                    }}
                >
                    {content.headingLead}
                    <em>{content.headingItalic}</em>
                </h2>
                <p
                    style={{
                        margin: 0,
                        fontSize: 19,
                        lineHeight: 1.5,
                        color: "#ece9e2",
                    }}
                >
                    {content.body}
                </p>
                <Link
                    href={content.cta.href}
                    className="tbm-btn"
                    style={{
                        background: "var(--tbm-cream)",
                        color: "var(--tbm-forest)",
                        minHeight: 56,
                        padding: "0 40px",
                    }}
                >
                    {content.cta.label}
                </Link>
            </div>
        </section>
    );
}
