/* ************************************************************
   /studios content shape and fallback copy.

   The comparison is one list of rows, each carrying a value per
   studio. Keeping it that way means a row can be added or a
   studio renamed without touching the page, and the mobile
   reflow still pairs the right value with the right studio.
************************************************************ */

import type { PhotoHeroContent } from "@/components/core/PageHero";

export type Cta = { label: string; href: string };

export type StudioSummary = {
    id: string;
    name: string;
    href: string;
    image: string;
    imageAlt: string;
    imageFocus: string;
};

export type ComparisonRow = {
    id: string;
    label: string;
    /** One value per studio, in the same order as `studios`. */
    values: string[];
};

export type StudiosContent = {
    hero: PhotoHeroContent;
    difference: {
        label: string;
        studios: StudioSummary[];
        rows: ComparisonRow[];
    };
    wantBoth: {
        heading: string;
        body: string;
        cta: Cta;
    };
};

export type StudiosPageProps = {
    slug: string;
    title: string;
    description: string;
    content: StudiosContent;
};

export const STUDIOS_SLUG = "studios";

const ph = (file: string) => `/images/tbm-placeholders/${file}`;

export const studiosFallbackData: StudiosPageProps = {
    slug: STUDIOS_SLUG,
    title: "Studios | The Body Method",
    description:
        "Two studios in Tugun. Tugun Beach for Reformer Pilates, and Cornerstone for Pilates, yoga, barre, yin, meditation and movement.",
    content: {
        hero: {
            heading: "Two studios - One Body Method.",
            lines: [],
            image: ph("hero-studios.jpg"),
            imageAlt: "A calm studio room with tall windows onto trees",
            imageFocus: "center 45%",
        },
        difference: {
            label: "The Difference",
            studios: [
                {
                    id: "tugun-beach",
                    name: "Tugun Beach",
                    href: "/studios/tugun-beach",
                    image: ph("studio-tugun-reformer.jpg"),
                    imageAlt:
                        "Feet pressing the footbar of a timber Reformer",
                    imageFocus: "center 45%",
                },
                {
                    id: "cornerstone",
                    name: "Cornerstone",
                    href: "/studios/cornerstone",
                    image: ph("studio-cornerstone-meditation.jpg"),
                    imageAlt:
                        "Seated meditation facing windows full of trees",
                    imageFocus: "center",
                },
            ],
            rows: [
                {
                    id: "feeling",
                    label: "Feeling",
                    values: [
                        "Intimate + personal",
                        "Expansive + community focused",
                    ],
                },
                { id: "size", label: "Size", values: ["Max 6", "Max 18"] },
                {
                    id: "movement",
                    label: "Movement",
                    values: [
                        "Reformer Pilates",
                        "Pilates, yoga, barre, yin, meditation, stretch + movement",
                    ],
                },
                {
                    id: "best-for",
                    label: "Best for",
                    values: [
                        "Attention, technique, confidence, core strength workout",
                        "Variety, routine, energy, core strength + bodyweight training",
                    ],
                },
                { id: "privates", label: "Privates", values: ["Yes", "-"] },
                {
                    id: "community",
                    label: "Community/events",
                    values: ["Some", "Main community hub"],
                },
            ],
        },
        wantBoth: {
            heading: "Want both?",
            body: "Introducing the Dual Membership across both The Body Method Studios.",
            cta: {
                label: "EXPLORE THE DUAL MEMBERSHIP",
                href: "/memberships",
            },
        },
    },
};
