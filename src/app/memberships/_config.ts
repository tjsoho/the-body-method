/* ************************************************************
   /memberships content shape and fallback copy.

   Copy comes verbatim from the built page. Admin edits via the
   CMS override these per field; this file is only the fallback
   on an un-edited database.

   Detail blocks and price rows are stored as the small Markdown
   subset RichText understands, so **bold** and *italic* survive
   the trip through the database.
************************************************************ */

import type { PhotoHeroContent } from "@/components/core/PageHero";
import { BOOKING_URL } from "@/config/booking";

export type MembershipTier = {
    id: string;
    /** Bronze label at the top of the card. */
    label: string;
    /** Italic line above the price. Only the dual card uses one. */
    italicLine: string;
    price: string;
    /** One-liner under the price. */
    summary: string;
    /** What sits behind the disclosure. Rich text. */
    detail: string;
    disclosureLabel: string;
    ctaLabel: string;
    ctaHref: string;
    /** "forest" is the dark card. */
    theme: "light" | "forest";
};

export type PriceColumn = {
    id: string;
    title: string;
    /** Optional line under the column title. */
    note: string;
    /** One row per line. Rich text, so **$130** reads as bold. */
    rows: string[];
};

export type MembershipsContent = {
    hero: PhotoHeroContent;
    tiers: {
        intro: string;
        items: MembershipTier[];
    };
    privatePilates: {
        heading: string;
        body: string[];
        columns: PriceColumn[];
        ctaLabel: string;
        ctaHref: string;
    };
    classPacks: {
        heading: string;
        body: string;
        columns: PriceColumn[];
        ctaLabel: string;
        ctaHref: string;
    };
    casual: {
        heading: string;
        italicLine: string;
        rows: string[];
        body: string;
        ctaLabel: string;
        ctaHref: string;
    };
};

export type MembershipsPageProps = {
    slug: string;
    title: string;
    description: string;
    content: MembershipsContent;
};

export const MEMBERSHIPS_SLUG = "memberships";

export const membershipsFallbackData: MembershipsPageProps = {
    slug: MEMBERSHIPS_SLUG,
    title: "Pilates & Yoga Memberships Tugun and Cornerstone Stores - The Body Method",
    description:
        "Find the studio, membership or class pack that works with your life and makes it easier to keep showing up at The Body Method.",
    content: {
        hero: {
            heading: "Find your rhythm:",
            lines: [
                "The best membership isn't the one with the most classes.",
                "It's the one that helps movement become part of your life.",
            ],
            image: "/images/tbm-placeholders/hero-members.jpg",
            imageAlt:
                "A rolled mat, linen towel and water bottle on a sunny bench",
            imageFocus: "center 55%",
        },
        tiers: {
            intro: "Find the studio, membership or class pack that works with your life and makes it easier to keep showing up.",
            items: [
                {
                    id: "cornerstone",
                    label: "CORNERSTONE UNLIMITED MEMBERSHIP",
                    italicLine: "",
                    price: "$49/week",
                    summary:
                        "For people who love variety and the energy of our larger community studio.",
                    detail: "Enjoy **unlimited access** to our Cornerstone group timetable, including Mat Pilates, Barre, Yoga, Yin, Power Pilates, Stretch + Release, Meditation and more.\n\n**12-week minimum commitment.**",
                    disclosureLabel: "WHAT'S INCLUDED",
                    ctaLabel: "CHOOSE CORNERSTONE",
                    ctaHref: BOOKING_URL,
                    theme: "light",
                },
                {
                    id: "tugun-beach",
                    label: "TUGUN BEACH UNLIMITED MEMBERSHIP",
                    italicLine: "",
                    price: "$75/week",
                    summary:
                        "For people who love Reformer Pilates and the support of a smaller, more personalised studio experience.",
                    detail: "Enjoy **unlimited Reformer** at Tugun Beach, with classes capped at just six people so there's more space for individual attention, guidance and connection.\n\n**12-week minimum commitment and booking window is 21 days in advance.**",
                    disclosureLabel: "WHAT'S INCLUDED",
                    ctaLabel: "CHOOSE TUGUN BEACH",
                    ctaHref: BOOKING_URL,
                    theme: "light",
                },
                {
                    id: "dual",
                    label: "DUAL MEMBERSHIP - BOTH STUDIOS",
                    italicLine:
                        "The best of both Body Method worlds, brought together in one membership.",
                    price: "$69/week",
                    summary: "",
                    detail: "Enjoy **5 classes a week at Cornerstone + 2 classes a week at Tugun Beach** - giving you the personalised Reformer experience of our smaller studio alongside the variety of Pilates, Yoga, Barre, Meditation and more at Cornerstone.\n\nMore classes, more variety and more ways to build a movement routine that works for you.\n\n**12-week minimum commitment and booking window is 21 days in advance.**",
                    disclosureLabel: "WHAT'S INCLUDED",
                    ctaLabel: "CHOOSE DUAL",
                    ctaHref: BOOKING_URL,
                    theme: "forest",
                },
            ],
        },
        privatePilates: {
            heading: "PRIVATE PILATES",
            body: [
                "Want a little more individual attention? Private Pilates gives you dedicated time with a senior instructor and a session shaped around your body, your goals and what you need that day.",
                "Perfect if you're new to Pilates, working with an injury, pregnant or postnatal, or simply prefer a more personalised approach.",
            ],
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
                    title: "1:2 Duets Pilates",
                    note: "Come with a friend, partner or family member.",
                    rows: [
                        "Single session - $70 per person",
                        "5 sessions - $330 per person",
                        "10 sessions - $600 per person",
                    ],
                },
            ],
            ctaLabel: "BOOK A PRIVATE",
            ctaHref: BOOKING_URL,
        },
        classPacks: {
            heading: "CLASS PACKS",
            body: "Prefer a little more flexibility? Purchase a class pack and use your sessions when they work for you. All 5, 10 and 20 class packs are valid for six months.",
            columns: [
                {
                    id: "cornerstone-packs",
                    title: "Cornerstone",
                    note: "",
                    rows: [
                        "5 classes - **$130**",
                        "10 classes - **$240**",
                        "20 classes - **$440**",
                    ],
                },
                {
                    id: "tugun-packs",
                    title: "Tugun Beach Reformer",
                    note: "",
                    rows: [
                        "5 classes - **$180**",
                        "10 classes - **$340**",
                        "20 classes - **$640**",
                        "50 classes - **$1,500** *(valid for 12 months)*",
                    ],
                },
            ],
            ctaLabel: "CHOOSE A CLASS PACK",
            ctaHref: BOOKING_URL,
        },
        casual: {
            heading: "CASUAL OPTIONS",
            italicLine: "Just want to drop in? You're always welcome.",
            rows: [
                "Cornerstone - $28 per class",
                "Tugun Beach Reformer - $39 per class",
            ],
            body: "Choose your class, book your spot and come move with us.",
            ctaLabel: "BOOK A CLASS",
            ctaHref: "/book",
        },
    },
};
