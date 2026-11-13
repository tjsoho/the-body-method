/* ************************************************************
   /contact — Contact + Locations.

   Hero + two studio cards side by side, each with a map slot and
   all the practical info, then a general enquiries form on sand.

   A studio's practical info is a list of labelled blocks rather
   than four fixed ones, so a studio can gain a "What to bring"
   or lose a "Parking" from the admin panel alone.

   NOTE: the map slot is still a styled placeholder that links out
   to Google Maps. A real embed goes in once the client confirms
   the addresses. The form POSTs to whatever is set as its action,
   which is "#" until an endpoint is confirmed.

   Editable at /admin/contact. Fallback copy in ./_config.
************************************************************ */

import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import RichText from "@/components/core/RichText";
import { PhotoHero } from "@/components/core/PageHero";
import getPage from "@/server-actions/page";
import { buildPageMetadata } from "@/utils/seo";
import {
    CONTACT_SLUG,
    contactFallbackData,
    type ContactPageProps,
    type StudioCard,
} from "./_config";
import { externalLinkProps } from "@/utils/links";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata(CONTACT_SLUG);
}

const FIELD_STYLE = {
    fontFamily: "var(--font-lora)",
    fontSize: 17,
    lineHeight: 1.4,
    padding: "14px 16px",
    border: "1px solid var(--tbm-rule)",
    background: "var(--tbm-cream)",
    color: "var(--tbm-ink)",
    borderRadius: 0,
} as const;

const LABEL_STYLE = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
} as const;

function StudioColumn({
    studio,
    side,
}: {
    studio: StudioCard;
    side: "l" | "r";
}) {
    return (
        <article
            className={side === "l" ? "tbm-c-l" : "tbm-c-r card-div"}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                paddingRight: side === "l" ? "clamp(0px, 2vw, 24px)" : undefined,
                paddingLeft: side === "r" ? "clamp(0px, 2vw, 24px)" : undefined,
                boxShadow:
                    side === "r" ? "inset 1px 0 0 var(--tbm-rule)" : undefined,
            }}
        >
            <Reveal amount={0.2}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={studio.image}
                    alt={studio.imageAlt}
                    style={{
                        width: "100%",
                        aspectRatio: "3 / 2",
                        objectFit: "cover",
                        objectPosition: studio.imageFocus,
                    }}
                />
            </Reveal>
            <Reveal amount={0.3} delay={0.05}>
                <h2
                    style={{
                        margin: 0,
                        fontWeight: 400,
                        fontSize: "clamp(36px, 4vw, 56px)",
                        lineHeight: 1.1,
                        letterSpacing: "-.01em",
                        marginTop: 8,
                    }}
                >
                    {studio.name}
                </h2>
            </Reveal>
            <Reveal amount={0.3} delay={0.11}>
                <p
                    style={{
                        margin: 0,
                        fontSize: 20,
                        lineHeight: 1.45,
                        fontWeight: 500,
                    }}
                >
                    {studio.address}
                </p>
            </Reveal>
            <Reveal amount={0.3} delay={0.16}>
                <p
                    style={{
                        margin: 0,
                        fontSize: 18,
                        lineHeight: 1.7,
                        color: "var(--tbm-text-body)",
                    }}
                >
                    {studio.intro}
                </p>
            </Reveal>

            {/* Map slot. Styled placeholder that keeps the 3:2 ratio and
                still opens Google Maps. */}
            <a
                href={studio.mapHref}
                {...externalLinkProps(studio.mapHref)}
                aria-label={`Open ${studio.address} in Google Maps`}
                style={{
                    position: "relative",
                    display: "block",
                    border: "1px solid var(--tbm-rule)",
                    color: "var(--tbm-forest)",
                    width: "100%",
                    aspectRatio: "3 / 2",
                    background: "#1b2518",
                }}
            />

            {studio.blocks.map((block) => (
                <div
                    key={block.id}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                        borderTop: "1px solid var(--tbm-rule)",
                        paddingTop: 20,
                    }}
                >
                    <h3
                        className="tbm-lbl"
                        style={{ margin: 0, color: "var(--tbm-bronze-label)" }}
                    >
                        {block.label}
                    </h3>
                    {block.body && (
                        <RichText
                            className="tbm-rich"
                            value={block.body}
                            style={{
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-muted)",
                            }}
                        />
                    )}
                    {block.ctaLabel && (
                        <div
                            style={{
                                paddingTop: block.body ? 8 : 0,
                            }}
                        >
                            <a
                                className="tbm-btn"
                                href={block.ctaHref}
                                {...externalLinkProps(block.ctaHref)}
                                style={
                                    block.ctaTheme === "solid"
                                        ? {
                                              background: "var(--tbm-ink)",
                                              color: "var(--tbm-cream)",
                                          }
                                        : {
                                              color: "var(--tbm-ink)",
                                              border: "1px solid var(--tbm-ink)",
                                          }
                                }
                            >
                                {block.ctaLabel}
                            </a>
                        </div>
                    )}
                </div>
            ))}
        </article>
    );
}

export default async function ContactPage() {
    const page = await getPage<ContactPageProps>(
        CONTACT_SLUG,
        contactFallbackData,
    );
    const { hero, studios, form } = page.content;

    return (
        <>
            <PhotoHero content={hero} />

            {/* ============ STUDIO CARDS ============ */}
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
                    {studios.map((studio, index) => (
                        <StudioColumn
                            key={studio.id}
                            studio={studio}
                            side={index % 2 === 0 ? "l" : "r"}
                        />
                    ))}
                </div>
            </section>

            {/* ============ GENERAL ENQUIRIES FORM ============ */}
            <section
                style={{
                    background: "var(--tbm-sand)",
                    paddingTop: 75,
                    paddingBottom: 75,
                    color: "var(--tbm-ink)",
                    fontFamily: "var(--font-lora)",
                }}
            >
                <div className="tbm-wrap tbm-g12">
                    <div className="tbm-c-all">
                        <Reveal amount={0.3}>
                            <h2
                                style={{
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: "clamp(32px, 3.4vw, 48px)",
                                    lineHeight: 1.1,
                                    letterSpacing: "-.01em",
                                    marginBottom: 32,
                                }}
                            >
                                {form.heading}
                            </h2>
                        </Reveal>
                        <Reveal amount={0.2} delay={0.08}>
                            <form
                                action={form.action}
                                method="post"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 20,
                                    maxWidth: 640,
                                }}
                            >
                                <label style={LABEL_STYLE}>
                                    <span
                                        className="tbm-lbl"
                                        style={{
                                            color: "var(--tbm-bronze-label)",
                                        }}
                                    >
                                        {form.nameLabel}
                                    </span>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        autoComplete="name"
                                        style={{ ...FIELD_STYLE, minHeight: 48 }}
                                    />
                                </label>
                                <label style={LABEL_STYLE}>
                                    <span
                                        className="tbm-lbl"
                                        style={{
                                            color: "var(--tbm-bronze-label)",
                                        }}
                                    >
                                        {form.emailLabel}
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        autoComplete="email"
                                        style={{ ...FIELD_STYLE, minHeight: 48 }}
                                    />
                                </label>
                                <label style={LABEL_STYLE}>
                                    <span
                                        className="tbm-lbl"
                                        style={{
                                            color: "var(--tbm-bronze-label)",
                                        }}
                                    >
                                        {form.messageLabel}
                                    </span>
                                    <textarea
                                        name="message"
                                        required
                                        rows={6}
                                        style={{
                                            ...FIELD_STYLE,
                                            lineHeight: 1.5,
                                            resize: "vertical",
                                        }}
                                    />
                                </label>
                                <div>
                                    <button
                                        type="submit"
                                        className="tbm-btn"
                                        style={{
                                            background: "var(--tbm-ink)",
                                            color: "var(--tbm-cream)",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {form.submitLabel}
                                    </button>
                                </div>
                            </form>
                        </Reveal>
                    </div>
                </div>
            </section>
        </>
    );
}
