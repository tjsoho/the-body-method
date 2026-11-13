/* ************************************************************
   /private-pilates content shape and fallback copy.

   Note: the prices here are also on /memberships. They are two
   separate rows in the panel, so a price change has to be made
   in both places.
************************************************************ */

import type { PhotoHeroContent } from "@/components/core/PageHero";
import { BOOKING_URL } from "@/config/booking";

export type Cta = { label: string; href: string };

export type PriceColumn = {
    id: string;
    title: string;
    note: string;
    /** One row per line. Rich text, so **$130** reads as bold. */
    rows: string[];
};

export type PrivatePilatesContent = {
    hero: PhotoHeroContent;
    intro: { body: string };
    useCases: { heading: string; items: string[] };
    firstSession: {
        heading: string;
        body: string[];
        image: string;
        imageAlt: string;
    };
    progression: {
        heading: string;
        bodyBefore: string[];
        /** Sits immediately above the chain, in the same paragraph. */
        chainLead: string;
        /** The Private to Semi-private to Small Group chain. */
        chain: string[];
        bodyAfter: string[];
        image: string;
        imageAlt: string;
        imageFocus: string;
    };
    pricing: {
        heading: string;
        columns: PriceColumn[];
        cta: Cta;
        link: Cta;
    };
};

export type PrivatePilatesPageProps = {
    slug: string;
    title: string;
    description: string;
    content: PrivatePilatesContent;
};

export const PRIVATE_PILATES_SLUG = "private-pilates";

const ph = (file: string) => `/images/tbm-placeholders/${file}`;

export const privatePilatesFallbackData: PrivatePilatesPageProps = {
    slug: PRIVATE_PILATES_SLUG,
    title: "Private Pilates Tugun Gold Coast | The Body Method",
    description:
        "Dedicated time with an experienced teacher to understand your body, work toward something specific and move at the pace that’s right for you.",
    content: {
        hero: {
            heading: "Movement built around you.",
            lines: [
                "Sometimes a group class is exactly what you need.",
                "Sometimes it isn't.",
            ],
            image: ph("hero-private.jpg"),
            imageAlt:
                "A teacher's hands supporting a client's leg in a Reformer strap",
            imageFocus: "center 45%",
        },
        intro: {
            body: "Private Pilates gives you dedicated time with an experienced teacher to understand your body, work toward something specific and move at the pace that's right for you.",
        },
        useCases: {
            heading: "Private Pilates can be particularly useful when you're:",
            items: [
                "Returning to movement after injury",
                "Are a professional athlete wanting personalised training",
                "New to Pilates and wanting confidence first",
                "Working on technique",
                "Pregnant or postpartum",
                "Managing specific movement needs",
                "Wanting individual attention",
                "Building toward group classes",
            ],
        },
        firstSession: {
            heading: "Your first session starts with you:",
            body: [
                "Not a predetermined workout. We begin with where you are, what you're experiencing and what you'd like movement to help you do.",
                "From there, your teacher builds the session around you.",
            ],
            image: ph("portrait-priv-first.jpg"),
            imageAlt:
                "A teacher and client talking on a Reformer before a session",
        },
        progression: {
            heading: "Private doesn’t have to mean forever.",
            bodyBefore: [
                "For some people, private Pilates is their preferred way to move.",
            ],
            chainLead: "For others, it's the beginning:",
            chain: ["Private", "Semi-private", "Small Group"],
            bodyAfter: [
                "When you're ready, we can help you find the next environment that works for you.",
                "Perfect if you’re new to Pilates, working with an injury, pregnant or postnatal, or simply prefer a more personalised approach.",
            ],
            image: ph("landscape-priv-semi.jpg"),
            imageAlt: "Three Reformers side by side in a small group session",
            imageFocus: "center",
        },
        pricing: {
            heading: "Pricing:",
            columns: [
                {
                    id: "one-to-one",
                    title: "1:1 Private Pilates",
                    note: "",
                    rows: [
                        "Single session - $100",
                        "5 sessions - $480",
                        "10 sessions - $940",
                    ],
                },
                {
                    id: "duets",
                    title: "1:2 Private Pilates",
                    note: "Come with a friend, partner or family member.",
                    rows: [
                        "Single session - $70 per person",
                        "5 sessions - $330 per person",
                        "10 sessions - $600 per person",
                    ],
                },
            ],
            cta: { label: "BOOK A PRIVATE", href: BOOKING_URL },
            link: {
                label: "TALK TO US ABOUT PRIVATE PILATES",
                href: "/contact",
            },
        },
    },
};
