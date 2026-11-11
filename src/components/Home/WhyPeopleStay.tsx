/* ************************************************************
   TBM Home — Why people stay.

   Member story cards on cream. Each card is portrait image
   (aspect 4:5), bronze "Why I stay." label, italic quote,
   caption with name + member since + favourite class/teacher.

   The cards ride a carousel: still a 3-up editorial row on
   desktop, driven by the arrow pair beside the heading, and one
   card with a peek of the next on a phone rather than three tall
   testimonials stacked end to end. Every story the CMS holds is
   reachable, not just the first three.
************************************************************ */

import type { WhyPeopleStayContent } from "@/app/_config";
import Reveal from "@/components/motion/Reveal";
import StoryCarousel from "@/components/carousel/StoryCarousel";
import type { MemberStory } from "@/components/carousel/StoryCarousel";

// Re-exported so @/app/_config keeps importing the story shape from
// the section that renders it.
export type { MemberStory };

type Props = {
    content: WhyPeopleStayContent;
};

export default function WhyPeopleStay({ content }: Props) {
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
                    <Reveal delay={0.08} amount={0.3}>
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
                <StoryCarousel
                    stories={content.stories}
                    cardLabel={content.cardLabel}
                    memberSinceLabel={content.memberSinceLabel}
                />
            </div>
        </section>
    );
}
