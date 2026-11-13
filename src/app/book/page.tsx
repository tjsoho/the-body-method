/* ************************************************************
   /book — the routing page.

   Short forest band hero, then a row per thing someone might
   want to do, each wired to a booking destination.

   Editable at /admin/book. Fallback copy in ./_config.
************************************************************ */

import type { Metadata } from "next";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { BandHero } from "@/components/core/PageHero";
import getPage from "@/server-actions/page";
import { externalLinkProps } from "@/utils/links";
import { buildPageMetadata } from "@/utils/seo";
import { BOOK_SLUG, bookFallbackData, type BookPageProps } from "./_config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata(BOOK_SLUG);
}

export default async function BookPage() {
    const page = await getPage<BookPageProps>(BOOK_SLUG, bookFallbackData);
    const { hero, rows } = page.content;

    return (
        <>
            <BandHero content={hero} />

            {/* ============ ROUTING ROWS ============ */}
            <section
                style={{
                    paddingTop: 75,
                    paddingBottom: 75,
                    background: "var(--tbm-cream)",
                    color: "var(--tbm-ink)",
                }}
            >
                <Stagger
                    className="tbm-wrap tbm-g12"
                    style={{
                        listStyle: "none",
                        margin: "0 auto",
                        borderBottom: "1px solid var(--tbm-rule)",
                        paddingTop: 0,
                        paddingBottom: 0,
                    }}
                    stagger={0.1}
                >
                    {rows.map((row) => (
                        <StaggerItem
                            key={row.id}
                            className="tbm-c-all tbm-g12"
                            style={{
                                rowGap: 16,
                                alignItems: "center",
                                borderTop: "1px solid var(--tbm-rule)",
                                padding: "32px 0",
                            }}
                        >
                            <h2
                                className="tbm-book-h"
                                style={{
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: "clamp(26px, 2.4vw, 34px)",
                                    lineHeight: 1.2,
                                }}
                            >
                                {row.heading}
                            </h2>
                            {row.body ? (
                                <p
                                    className="tbm-book-d"
                                    style={{
                                        margin: 0,
                                        fontSize: 18,
                                        lineHeight: 1.6,
                                        color: "var(--tbm-text-body)",
                                    }}
                                >
                                    {row.body}
                                </p>
                            ) : (
                                <div
                                    className="tbm-book-d tbm-hide-sm"
                                    aria-hidden="true"
                                />
                            )}
                            <div className="tbm-book-b">
                                <a
                                    className="tbm-btn"
                                    href={row.ctaHref}
                                    {...externalLinkProps(row.ctaHref)}
                                    style={
                                        row.primary
                                            ? {
                                                  background: "var(--tbm-ink)",
                                                  color: "#f4f2ed",
                                                  width: "100%",
                                              }
                                            : {
                                                  color: "var(--tbm-ink)",
                                                  border: "1px solid var(--tbm-ink)",
                                                  width: "100%",
                                              }
                                    }
                                >
                                    {row.ctaLabel}
                                </a>
                            </div>
                        </StaggerItem>
                    ))}
                </Stagger>
            </section>
        </>
    );
}
