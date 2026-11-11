/* ************************************************************
   /book content shape and fallback copy.
************************************************************ */

import type { BandHeroContent } from "@/components/core/PageHero";

export type BookRow = {
    id: string;
    heading: string;
    /** Optional. An empty line keeps the row's spacing on desktop. */
    body: string;
    ctaLabel: string;
    ctaHref: string;
    /** The filled button rather than the outlined one. */
    primary: boolean;
};

export type BookContent = {
    hero: BandHeroContent;
    rows: BookRow[];
};

export type BookPageProps = {
    slug: string;
    title: string;
    description: string;
    content: BookContent;
};

export const BOOK_SLUG = "book";

export const bookFallbackData: BookPageProps = {
    slug: BOOK_SLUG,
    title: "Book | The Body Method",
    description:
        "Book Reformer Pilates, mat Pilates, yoga, barre or Private Pilates at The Body Method. Start the 21-Day Immersion, view the timetable or sign in as a member.",
    content: {
        hero: {
            heading: "What would you like to do?",
            lines: [],
            emphasisLine: "",
        },
        rows: [
            {
                id: "new",
                heading: "I'M NEW",
                body: "Start with 21 days across both studios for $99.",
                ctaLabel: "START MY 21 DAYS",
                ctaHref: "#momence-21-days",
                primary: true,
            },
            {
                id: "class",
                heading: "I WANT TO BOOK A CLASS",
                body: "See what's on and find a time that works.",
                ctaLabel: "VIEW TIMETABLE",
                ctaHref: "#momence-timetable",
                primary: false,
            },
            {
                id: "private",
                heading: "I WANT PRIVATE PILATES",
                body: "One-to-one movement built around you.",
                ctaLabel: "EXPLORE PRIVATE PILATES",
                ctaHref: "#momence-private",
                primary: false,
            },
            {
                id: "semi-private",
                heading: "I WANT SEMI-PRIVATE PILATES",
                body: "",
                ctaLabel: "ENQUIRE",
                ctaHref: "#momence-semi-private",
                primary: false,
            },
            {
                id: "member",
                heading: "I'M ALREADY A MEMBER",
                body: "Hello again.",
                ctaLabel: "BOOK / MEMBER LOGIN",
                ctaHref: "#momence-login",
                primary: false,
            },
        ],
    },
};
