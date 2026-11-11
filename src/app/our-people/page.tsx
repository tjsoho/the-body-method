/* ************************************************************
   /our-people — the people behind the studios.

   Hero, Sarah's story, then the teaching roster as a carousel
   with a profile popup.

   The roster is the shared `teachers` row, the same list the
   home page reads, and is edited from the Home editor. This
   page's own copy is editable at /admin/our-people.
************************************************************ */

import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import RichText from "@/components/core/RichText";
import { PhotoHero } from "@/components/core/PageHero";
import TeacherCarousel from "@/components/carousel/TeacherCarousel";
import getPage from "@/server-actions/page";
import { buildPageMetadata } from "@/utils/seo";
import {
    TEACHERS_SLUG,
    teachersPageFallbackData,
    type TeachersContent,
} from "@/data/teachers";
import {
    OUR_PEOPLE_SLUG,
    ourPeopleFallbackData,
    type OurPeoplePageProps,
} from "./_config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata(OUR_PEOPLE_SLUG);
}

export default async function OurPeoplePage() {
    const [page, teachersPage] = await Promise.all([
        getPage<OurPeoplePageProps>(OUR_PEOPLE_SLUG, ourPeopleFallbackData),
        getPage<{ content: TeachersContent }>(
            TEACHERS_SLUG,
            teachersPageFallbackData,
        ),
    ]);
    const { hero, owner, roster } = page.content;
    const teachers = teachersPage.content.teachers;

    return (
        <div
            style={{
                background: "var(--tbm-cream)",
                color: "var(--tbm-ink)",
                fontFamily: "var(--font-lora)",
            }}
        >
            <PhotoHero content={hero} />

            {/* ============ SARAH - OWNER + DIRECTOR ============ */}
            <section style={{ paddingTop: 75, paddingBottom: 75 }}>
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48, alignItems: "start" }}
                >
                    <Reveal
                        amount={0.2}
                        className="tbm-c-l5"
                        style={{ position: "relative" }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={owner.image}
                            alt={owner.imageAlt}
                            style={{
                                width: "100%",
                                aspectRatio: "4 / 5",
                                objectFit: "cover",
                            }}
                        />
                    </Reveal>
                    <div
                        className="tbm-c-r"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 18,
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
                                {owner.heading}
                            </h2>
                        </Reveal>
                        <Reveal delay={0.08} amount={0.2}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 18,
                                }}
                            >
                                {owner.body.map((para, i) => (
                                    <RichText
                                        key={i}
                                        className="tbm-rich"
                                        value={para}
                                        style={{
                                            fontSize: 18,
                                            lineHeight: 1.7,
                                            color: "var(--tbm-text-body)",
                                        }}
                                    />
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ MEET OUR TEACHERS ============ */}
            <section
                style={{
                    background: "var(--tbm-sand)",
                    paddingTop: 75,
                    paddingBottom: 75,
                }}
            >
                <div className="tbm-wrap tbm-g12" style={{ rowGap: 48 }}>
                    <Reveal amount={0.4} className="tbm-c-all">
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 400,
                                fontSize: "clamp(36px, 4vw, 56px)",
                                lineHeight: 1.1,
                                letterSpacing: "-.01em",
                            }}
                        >
                            {roster.heading}
                        </h2>
                    </Reveal>

                    <TeacherCarousel teachers={teachers} />
                </div>
            </section>
        </div>
    );
}
