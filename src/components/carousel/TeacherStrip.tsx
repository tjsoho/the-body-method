"use client";

/* ************************************************************
                        NOTES
   Home — the teaching roster as a carousel.

   Three teachers at a time on desktop, one card and a peek of
   the next on a phone, advancing itself every three seconds with
   a centred pager underneath. Each card links through to that
   teacher's profile on /our-people, so the home page stays
   curated instead of carrying every bio itself.
************************************************************ */

/* ************************************************************
                        IMPORTS
************************************************************ */
import Link from "next/link";
import {
    TbmCarousel,
    TbmCarouselPager,
    TbmCarouselSlide,
    TbmCarouselViewport,
} from "@/components/carousel/TbmCarousel";
import type { Teacher } from "@/data/teachers";

/* ************************************************************
                        RENDER
************************************************************ */
type Props = {
    teachers: Teacher[];
    /** The section's "MEET OUR PEOPLE" link, rendered beside the arrows. */
    cta: { label: string; href: string };
};

const AUTOPLAY_MS = 3000;

export default function TeacherStrip({ teachers, cta }: Props) {
    return (
        <TbmCarousel autoplay={AUTOPLAY_MS}>
            <TbmCarouselViewport
                className="tbm-c-all"
                label="Our teachers"
                basis="33.3333%"
                basisMobile="84%"
            >
                {teachers.map((t, i) => (
                    <TbmCarouselSlide
                        key={t.slug}
                        position={i + 1}
                        total={teachers.length}
                    >
                        <Link
                            href={`/our-people#${t.slug}`}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 16,
                                height: "100%",
                                color: "var(--tbm-ink)",
                                textDecoration: "none",
                            }}
                        >
                            <div className="tbm-media-zoom">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={t.image}
                                    alt={t.imageAlt}
                                    style={{
                                        width: "100%",
                                        aspectRatio: "4 / 5",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>
                            <h3
                                style={{
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: 22,
                                    lineHeight: 1.3,
                                }}
                            >
                                {t.name}
                            </h3>
                            {t.role ? (
                                <p
                                    className="tbm-lbl"
                                    style={{
                                        margin: 0,
                                        color: "var(--tbm-bronze-label)",
                                    }}
                                >
                                    {t.role}
                                </p>
                            ) : null}
                            {t.teaser ? (
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 16,
                                        lineHeight: 1.6,
                                        color: "var(--tbm-text-muted)",
                                    }}
                                >
                                    {t.teaser}
                                </p>
                            ) : null}
                        </Link>
                    </TbmCarouselSlide>
                ))}
            </TbmCarouselViewport>

            <TbmCarouselPager
                className="tbm-c-all"
                colour="var(--tbm-ink)"
                contrast="var(--tbm-sand)"
                labelPrev="Previous teachers"
                labelNext="More teachers"
            />

            <div className="tbm-c-all">
                <Link
                    href={cta.href}
                    className="tbm-lnk"
                    style={{ color: "var(--tbm-forest)" }}
                >
                    {cta.label} <span aria-hidden="true">&#8594;</span>
                </Link>
            </div>
        </TbmCarousel>
    );
}
