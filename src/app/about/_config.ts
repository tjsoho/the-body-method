/* ************************************************************
   /about content shape and fallback copy.
************************************************************ */

import type { PhotoHeroContent } from "@/components/core/PageHero";

export type Cta = { label: string; href: string };

export type Belief = { id: string; title: string; body: string };

export type AboutContent = {
    hero: PhotoHeroContent;
    strength: {
        /** The large opening line. */
        lede: string;
        body: string[];
        image: string;
        imageAlt: string;
    };
    care: {
        heading: string;
        body: string[];
        image: string;
        imageAlt: string;
    };
    beliefs: {
        heading: string;
        items: Belief[];
    };
    closing: {
        heading: string;
        body: string[];
        primaryCta: Cta;
        secondaryCta: Cta;
    };
};

export type AboutPageProps = {
    slug: string;
    title: string;
    description: string;
    content: AboutContent;
};

export const ABOUT_SLUG = "about";

/** The Nov 2026 shoot. Real photography, beside the placeholders. */
const tbm = (file: string) => `/images/tbm/${file}`;

export const aboutFallbackData: AboutPageProps = {
    slug: ABOUT_SLUG,
    title: "About The Body Method | Tugun, Gold Coast",
    description:
        "A different idea of strength. The story behind The Body Method and the philosophy that shapes our Tugun studios.",
    content: {
        hero: {
            heading: "A different idea of strength.",
            lines: [
                "Strength isn't only what happens when something gets heavier.",
            ],
            image: tbm("hero-about.jpg"),
            imageAlt:
                "A member standing at the barre looking out to the greenery",
            imageFocus: "center 45%",
        },
        strength: {
            lede: "It's confidence in your body - the capacity to keep doing the things you love.",
            body: [
                "Knowing when to push and when to listen. Showing up for yourself and having people around you who notice when you do. That's the kind of strength we're interested in.",
            ],
            image: tbm("about-strength.jpg"),
            imageAlt:
                "A mat and massage ball laid out by the studio window",
        },
        care: {
            heading: "We actually genuinely care.",
            body: [
                "About the quality of the teaching, about the people who walk through our doors. About remembering your name and understanding your body and about creating somewhere people feel better for having spent time.",
                "That philosophy has shaped The Body Method from the beginning.",
            ],
            image: tbm("about-care.jpg"),
            imageAlt: "A teacher's hands supporting a client's head and shoulder",
        },
        beliefs: {
            heading: "What We Believe:",
            items: [
                {
                    id: "teaching",
                    title: "Exceptional Teaching",
                    body: "Technical, intuitive and adaptive.",
                },
                {
                    id: "care",
                    title: "Care You Can Feel",
                    body: "Where you are known and supported.",
                },
                {
                    id: "strength",
                    title: "Strength for Life",
                    body: "Movement that supports how you move, work, play and live.",
                },
                {
                    id: "community",
                    title: "Community That Holds You",
                    body: "A place you actually want to come back to.",
                },
            ],
        },
        closing: {
            heading: "Built in Tugun and built around people.",
            body: [
                "Today, The Body Method lives across two Tugun studios with different personalities and one shared philosophy.",
                "And we're still building, not toward being the biggest.",
                "Toward being one of the places that matters most to the people who choose it.",
            ],
            primaryCta: { label: "MEET OUR PEOPLE", href: "/our-people" },
            secondaryCta: { label: "EXPLORE THE STUDIOS", href: "/studios" },
        },
    },
};
