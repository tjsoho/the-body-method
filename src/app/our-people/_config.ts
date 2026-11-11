/* ************************************************************
   /our-people content shape and fallback copy.

   The teaching roster itself is not here. It lives in its own
   `teachers` row, shared with the home page, and is edited from
   the Home editor so a name or photograph is only changed once.
************************************************************ */

import type { PhotoHeroContent } from "@/components/core/PageHero";

export type OurPeopleContent = {
    hero: PhotoHeroContent;
    owner: {
        heading: string;
        /** Rich text, so a sentence can carry emphasis. */
        body: string[];
        image: string;
        imageAlt: string;
    };
    roster: {
        heading: string;
    };
};

export type OurPeoplePageProps = {
    slug: string;
    title: string;
    description: string;
    content: OurPeopleContent;
};

export const OUR_PEOPLE_SLUG = "our-people";

const ph = (file: string) => `/images/tbm-placeholders/${file}`;

export const ourPeopleFallbackData: OurPeoplePageProps = {
    slug: OUR_PEOPLE_SLUG,
    title: "Our People | The Body Method",
    description:
        "The people behind the way you move. Meet the teachers who make The Body Method.",
    content: {
        hero: {
            heading: "The people behind the way you move.",
            lines: [
                "Technique and experience matters, but great teaching also requires something harder to put on a certificate: **the ability to see the person in front of you.**",
                "That's what we look for in our people.",
            ],
            image: ph("hero-people.jpg"),
            imageAlt:
                "A small group walking along a beach path carrying yoga mats",
            imageFocus: "center 55%",
        },
        owner: {
            heading: "SARAH - OWNER + DIRECTOR",
            body: [
                "For Sarah, movement has always been personal. Having lived with chronic pain since childhood, discovering Pilates changed not only how she moved and felt in her own body, but ultimately the direction of her life.",
                "What began as a way to manage pain became a lifelong fascination with the human body, its extraordinary capacity to adapt, and the connection between physical movement and emotional wellbeing. More than 17 years of teaching, studying and working with people of all ages and abilities has shaped her approach to movement and the way she leads The Body Method today.",
                "Since taking ownership of The Body Method, Sarah has continued to grow and evolve the business with an unwavering commitment to exceptional teaching, the highest calibre of instructors and a philosophy that guides everything she does: **great movement starts with genuinely caring for the person in front of you.**",
                "That commitment shapes the experience at The Body Method. From the expertise and intuition of its teachers to the personal attention given in every class, Sarah believes that truly understanding the individual is what makes great teaching extraordinary. Whether someone is navigating pain, rebuilding confidence or developing strength, her goal is for every person to feel understood, supported and empowered to discover what their body is capable of.",
                "But her *why* goes much further than what happens inside the studio.",
                "Sarah believes that when you help someone move better, become stronger and improve their physical, mental or emotional wellbeing, you're also changing what's possible in the rest of their life. They have more capacity to care for themselves, show up for the people they love and contribute to the communities around them.",
                "That ripple effect is what drives Sarah's vision for The Body Method. A place where exceptional teaching meets genuine care, where movement makes everyday life better, and where the benefits extend far beyond the studio walls.",
                "For Sarah, leading The Body Method is about much more than running two movement studios. It's about making a meaningful contribution to the community, one person at a time.",
            ],
            image: ph("portrait-sarah.jpg"),
            imageAlt:
                "Sarah standing beside a timber Reformer, hand on the footbar",
        },
        roster: {
            heading: "MEET OUR TEACHERS",
        },
    },
};
