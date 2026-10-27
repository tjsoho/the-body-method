/* ************************************************************
   TBM Home — Why people stay.

   Three member story cards on cream. Each card is portrait image
   (aspect 4:5), bronze "Why I stay." label, italic quote,
   caption with name + member since + favourite class/teacher.

   The prev/next arrow buttons on the right are the control slot
   for a future carousel — the admin can add more than three
   stories via the CMS and the carousel takes over. For now the
   first three render inline as a 3-up editorial grid.
************************************************************ */

import type { WhyPeopleStayContent } from "@/app/_config";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import Reveal from "@/components/motion/Reveal";

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
    content: WhyPeopleStayContent;
    stories: MemberStory[];
};

export default function WhyPeopleStay({ content, stories }: Props) {
    return (
        <section
            style={{
                paddingTop: 75,
                paddingBottom: 75,
                background: "var(--tbm-cream)",
                color: "var(--tbm-ink)",
                fontFamily: "var(--font-lora)",
            }}
        >
            <div className="tbm-wrap tbm-g12" style={{ rowGap: 64 }}>
                <div
                    className="tbm-c-l"
                    style={{ display: "flex", flexDirection: "column", gap: 24 }}
                >
                    <Reveal amount={0.4}>
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
                    </Reveal>
                    <Reveal delay={0.15} amount={0.3}>
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
                    </Reveal>
                </div>
                <div
                    className="tbm-c-r tbm-hide-sm"
                    style={{
                        display: "flex",
                        gap: 12,
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                    }}
                >
                    <button
                        type="button"
                        aria-label="Previous member"
                        style={{
                            width: 52,
                            height: 52,
                            borderRadius: "50%",
                            border: "1px solid var(--tbm-ink)",
                            background: "transparent",
                            color: "var(--tbm-ink)",
                            cursor: "pointer",
                            fontSize: 18,
                        }}
                    >
                        ←
                    </button>
                    <button
                        type="button"
                        aria-label="Next member"
                        style={{
                            width: 52,
                            height: 52,
                            borderRadius: "50%",
                            border: "1px solid var(--tbm-ink)",
                            background: "var(--tbm-ink)",
                            color: "var(--tbm-cream)",
                            cursor: "pointer",
                            fontSize: 18,
                        }}
                    >
                        →
                    </button>
                </div>

                <Stagger
                    className="tbm-c-all tbm-g12"
                    style={{ rowGap: 56 }}
                    stagger={0.38}
                >
                    {stories.slice(0, 3).map((story) => (
                        <StaggerItem
                            key={story.id}
                            className="tbm-c-t"
                            style={{
                                margin: 0,
                                display: "flex",
                                flexDirection: "column",
                                gap: 20,
                            }}
                        >
                            <div style={{ position: "relative" }}>
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
                                “Why I stay.”
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
                                }}
                            >
                                <span style={{ fontSize: 16 }}>{story.name}</span>
                                <span
                                    style={{
                                        fontSize: 14,
                                        color: "var(--tbm-text-subtle)",
                                    }}
                                >
                                    Member since {story.memberSince}
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
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>
        </section>
    );
}
