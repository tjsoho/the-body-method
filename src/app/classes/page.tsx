/* ************************************************************
   /classes — Classes hub.

   Hero + a column of class-type cards laid out as a 2-column
   grid at desktop, each with a 3:2 landscape, h2, intro and a
   VIEW TIMES link. The final slot in the grid is a CTA card
   with a landscape image and two buttons.

   Which side a card falls on comes from its position rather
   than a stored flag, so adding, removing or reordering cards
   in the admin can never break the alternation.

   Editable at /admin/classes. Fallback copy in ./_config.
************************************************************ */

import type { Metadata } from "next";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { PhotoHero } from "@/components/core/PageHero";
import getPage from "@/server-actions/page";
import { buildPageMetadata } from "@/utils/seo";
import {
    CLASSES_SLUG,
    classesFallbackData,
    type ClassesPageProps,
} from "./_config";
import { externalLinkProps } from "@/utils/links";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata(CLASSES_SLUG);
}

/** Even positions sit in the left column, odd in the right. */
const columnFor = (index: number) => (index % 2 === 0 ? "l" : "r");

const columnStyle = (side: "l" | "r") => ({
    paddingRight: side === "l" ? "clamp(0px, 2vw, 24px)" : undefined,
    paddingLeft: side === "r" ? "clamp(0px, 2vw, 24px)" : undefined,
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: 20,
});

export default async function ClassesPage() {
    const page = await getPage<ClassesPageProps>(
        CLASSES_SLUG,
        classesFallbackData,
    );
    const { hero, cards, ctaCard } = page.content;
    const ctaSide = columnFor(cards.items.length);

    return (
        <>
            <PhotoHero content={hero} />

            {/* ============ CLASS CARDS ============ */}
            <section
                style={{
                    paddingTop: 75,
                    paddingBottom: 75,
                    background: "var(--tbm-cream)",
                    color: "var(--tbm-ink)",
                    fontFamily: "var(--font-lora)",
                }}
            >
                <Stagger
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 75 }}
                    stagger={0.2}
                >
                    {cards.items.map((card, index) => {
                        const side = columnFor(index);
                        return (
                            <StaggerItem
                                key={card.id}
                                className={side === "l" ? "tbm-c-l" : "tbm-c-r"}
                                style={columnStyle(side)}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={card.image}
                                    alt={card.imageAlt}
                                    style={{
                                        width: "100%",
                                        aspectRatio: "3 / 2",
                                        objectFit: "cover",
                                        objectPosition: card.imageFocus,
                                    }}
                                />
                                <h2
                                    style={{
                                        margin: 0,
                                        fontWeight: 400,
                                        fontSize: "clamp(30px, 3vw, 40px)",
                                        lineHeight: 1.1,
                                        marginTop: 8,
                                    }}
                                >
                                    {card.title}
                                </h2>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 16,
                                        lineHeight: 1.7,
                                        color: "var(--tbm-text-muted)",
                                        maxWidth: "34em",
                                    }}
                                >
                                    {card.body}
                                </p>
                                <div style={{ marginTop: "auto", paddingTop: 4 }}>
                                    <a
                                        className="tbm-lnk"
                                        href={cards.linkHref}
                                        {...externalLinkProps(cards.linkHref)}
                                        style={{ color: "var(--tbm-forest)" }}
                                    >
                                        {cards.linkLabel}{" "}
                                        <span aria-hidden="true">&#8594;</span>
                                    </a>
                                </div>
                            </StaggerItem>
                        );
                    })}

                    {/* Final slot, a CTA card. It takes whichever column the
                        list leaves free, so the grid never gains a hole. */}
                    <StaggerItem
                        className={ctaSide === "l" ? "tbm-c-l" : "tbm-c-r"}
                        style={columnStyle(ctaSide)}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={ctaCard.image}
                            alt={ctaCard.imageAlt}
                            style={{
                                width: "100%",
                                aspectRatio: "3 / 2",
                                objectFit: "cover",
                                objectPosition: ctaCard.imageFocus,
                            }}
                        />
                        <div
                            style={{
                                display: "flex",
                                gap: 16,
                                flexWrap: "wrap",
                                paddingTop: 8,
                            }}
                        >
                            <a
                                className="tbm-btn"
                                href={ctaCard.primaryCta.href}
                                {...externalLinkProps(ctaCard.primaryCta.href)}
                                style={{
                                    background: "var(--tbm-ink)",
                                    color: "var(--tbm-cream)",
                                }}
                            >
                                {ctaCard.primaryCta.label}
                            </a>
                            <a
                                className="tbm-btn"
                                href={ctaCard.secondaryCta.href}
                                {...externalLinkProps(ctaCard.secondaryCta.href)}
                                style={{
                                    color: "var(--tbm-ink)",
                                    border: "1px solid var(--tbm-ink)",
                                }}
                            >
                                {ctaCard.secondaryCta.label}
                            </a>
                        </div>
                    </StaggerItem>
                </Stagger>
            </section>
        </>
    );
}
