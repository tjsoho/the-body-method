"use client";

/* ************************************************************
                        NOTES
   "Why I stay." — member stories as a carousel.

   Three up on desktop (so a full set still reads as the editorial
   three-up row it was designed as) and one card with a peek of
   the next on a phone, instead of three tall testimonials
   stacked end to end.

   Shared by the home page and /life-at-tbm so a member story
   looks the same wherever it appears.
************************************************************ */

/* ************************************************************
                        IMPORTS
************************************************************ */
import {
    TbmCarousel,
    TbmCarouselArrows,
    TbmCarouselDots,
    TbmCarouselSlide,
    TbmCarouselViewport,
} from "@/components/carousel/TbmCarousel";

/* ************************************************************
                        TYPES
************************************************************ */
export type MemberStory = {
    id: string;
    quote: string;
    name: string;
    memberSince: string;
    favouriteClassTeacher: string;
    image: string;
    imageAlt: string;
};

type Props = {
    stories: MemberStory[];
    /** The bronze label above each quote, e.g. "Why I stay." */
    cardLabel: string;
    /** Words before the year in the caption, e.g. "Member since". */
    memberSinceLabel: string;
    /**
     * "header" drops the arrows into the right half of the heading row;
     * "above" gives them their own full-width row over the track, for
     * sections whose heading row is already full.
     */
    arrowSlot?: "header" | "above";
};

/* ************************************************************
                        RENDER
************************************************************ */
export default function StoryCarousel({
    stories,
    cardLabel,
    memberSinceLabel,
    arrowSlot = "header",
}: Props) {
    return (
        <TbmCarousel>
            <TbmCarouselArrows
                className={
                    arrowSlot === "header"
                        ? "tbm-c-r tbm-hide-sm"
                        : "tbm-c-all tbm-hide-sm"
                }
                style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
                colour="var(--tbm-ink)"
                contrast="var(--tbm-cream)"
                labelPrev="Previous member story"
                labelNext="Next member story"
            />

            <TbmCarouselViewport
                className="tbm-c-all"
                label="Why members stay"
                basis="33.3333%"
                basisMobile="84%"
            >
                {stories.map((story, i) => (
                    <TbmCarouselSlide
                        key={story.id}
                        position={i + 1}
                        total={stories.length}
                    >
                        <figure
                            style={{
                                margin: 0,
                                display: "flex",
                                flexDirection: "column",
                                gap: 20,
                                height: "100%",
                            }}
                        >
                            <div className="tbm-media-zoom">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={story.image}
                                    alt={story.imageAlt}
                                    style={{
                                        width: "100%",
                                        aspectRatio: "4 / 5",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>
                            <div
                                className="tbm-lbl"
                                style={{ color: "var(--tbm-bronze-label)" }}
                            >
                                {cardLabel}
                            </div>
                            <blockquote
                                style={{
                                    margin: 0,
                                    fontSize: 22,
                                    lineHeight: 1.4,
                                    fontStyle: "italic",
                                }}
                            >
                                {story.quote}
                            </blockquote>
                            <figcaption
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 4,
                                    borderTop: "1px solid var(--tbm-rule)",
                                    paddingTop: 16,
                                    marginTop: "auto",
                                }}
                            >
                                <span style={{ fontSize: 16 }}>
                                    {story.name}
                                </span>
                                <span
                                    style={{
                                        fontSize: 14,
                                        color: "var(--tbm-text-subtle)",
                                    }}
                                >
                                    {memberSinceLabel} {story.memberSince}
                                </span>
                                <span
                                    style={{
                                        fontSize: 14,
                                        color: "var(--tbm-text-subtle)",
                                    }}
                                >
                                    {story.favouriteClassTeacher}
                                </span>
                            </figcaption>
                        </figure>
                    </TbmCarouselSlide>
                ))}
            </TbmCarouselViewport>

            <div
                className="tbm-c-all tbm-hide-lg"
                style={{ display: "flex", justifyContent: "center" }}
            >
                <TbmCarouselDots colour="var(--tbm-ink)" />
            </div>
        </TbmCarousel>
    );
}
