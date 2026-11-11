/* ************************************************************
   /faq — the question list.

   Forest band hero, then every question grouped under a bronze
   heading, then a closing band. Each answer is a <details>, with
   the first one on the page open so the pattern is obvious.

   The answers are also emitted as FAQPage structured data. The
   schema text is derived from the same stored copy the page
   renders, so the two cannot drift apart.

   Editable at /admin/faq. Fallback copy in ./_config.
************************************************************ */

import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import RichText, { richTextToPlain } from "@/components/core/RichText";
import FaqList from "@/components/core/FaqList";
import { BandHero } from "@/components/core/PageHero";
import getPage from "@/server-actions/page";
import { buildPageMetadata } from "@/utils/seo";
import { FAQ_SLUG, faqFallbackData, type FaqPageProps } from "./_config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata(FAQ_SLUG);
}

export default async function FaqPage() {
    const page = await getPage<FaqPageProps>(FAQ_SLUG, faqFallbackData);
    const { hero, groups, closing } = page.content;

    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: groups.flatMap((group) =>
            group.items.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: richTextToPlain(item.answer),
                },
            })),
        ),
    };

    return (
        <>
            <script
                type="application/ld+json"
                // Derived from the stored copy, not hand-written, so it
                // cannot disagree with what the page says.
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <BandHero content={hero} />

            {/* ============ FAQ GROUPS ============ */}
            <section
                style={{
                    paddingTop: 75,
                    paddingBottom: 75,
                    background: "var(--tbm-cream)",
                    color: "var(--tbm-ink)",
                }}
            >
                <div className="tbm-wrap tbm-g12">
                    {groups.map((group, gi) => (
                        <div
                            key={group.label}
                            className="tbm-c-all tbm-g12"
                            style={{
                                rowGap: 24,
                                alignItems: "start",
                                paddingTop: gi === 0 ? 0 : 56,
                            }}
                        >
                            <Reveal amount={0.3} className="tbm-c-l5">
                                <h2
                                    className="tbm-lbl"
                                    style={{
                                        margin: 0,
                                        paddingTop: 22,
                                        color: "var(--tbm-bronze-label)",
                                        fontSize: 13,
                                    }}
                                >
                                    {group.label}
                                </h2>
                            </Reveal>
                            <div className="tbm-c-r">
                                <div
                                    className="tbm-faq"
                                    style={{
                                        borderTop: "1px solid var(--tbm-rule)",
                                    }}
                                >
                                    <FaqList
                                        items={group.items}
                                        openFirst={gi === 0}
                                        keyPrefix={group.label}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ============ STILL NOT SURE ============ */}
            <section
                style={{
                    background: "var(--tbm-sand)",
                    paddingTop: 75,
                    paddingBottom: 75,
                    color: "var(--tbm-ink)",
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
                            {closing.heading}
                        </h2>
                    </Reveal>
                    <Reveal amount={0.3} delay={0.08}>
                        <RichText
                            className="tbm-rich"
                            value={closing.body}
                            style={{
                                fontSize: 21,
                                lineHeight: 1.5,
                                fontStyle: "italic",
                                color: "var(--tbm-ink)",
                                maxWidth: "34em",
                            }}
                        />
                    </Reveal>
                </div>
            </section>
        </>
    );
}
