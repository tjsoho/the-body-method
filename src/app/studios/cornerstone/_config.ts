/* ************************************************************
   /studios/cornerstone content shape and fallback copy.
************************************************************ */

import type { PhotoHeroContent } from "@/components/core/PageHero";
import type { FaqEntry } from "@/components/admin/_shared/form-primitives";
import { BOOKING_URL } from "@/config/booking";
import {
    HERO_VIDEO_DESKTOP,
    HERO_VIDEO_MOBILE,
} from "@/config/hero-video";

export type Cta = { label: string; href: string };
export type Tile = { id: string; image: string; imageAlt: string };

export type CornerstoneContent = {
    hero: PhotoHeroContent;
    intro: {
        lede: string;
        /** The large two-column list of practices. */
        modalities: string[];
        closer: string;
        image: string;
        imageAlt: string;
    };
    moveDifferently: {
        heading: string;
        body: string[];
        closer: string;
        cards: Tile[];
        cta: Cta;
    };
    community: {
        heading: string;
        body: string[];
        link: Cta;
        image: string;
        imageAlt: string;
        imageFocus: string;
    };
    grid: {
        teacher: {
            name: string;
            href: string;
            role: string;
            time: string;
            image: string;
            imageAlt: string;
        };
        story: {
            label: string;
            quote: string;
            caption: string;
            image: string;
            imageAlt: string;
        };
        timetable: {
            body: string;
            cta: Cta;
            image: string;
            imageAlt: string;
        };
        location: {
            address: string;
            mapLabel: string;
            cta: Cta;
        };
        cta: Cta;
    };
    faq: {
        heading: string;
        items: FaqEntry[];
    };
};

export type CornerstonePageProps = {
    slug: string;
    title: string;
    description: string;
    content: CornerstoneContent;
};

export const CORNERSTONE_SLUG = "studios-cornerstone";

/** The Nov 2026 shoot. Real photography, beside the placeholders. */
const tbm = (file: string) => `/images/tbm/${file}`;

export const cornerstoneFallbackData: CornerstonePageProps = {
    slug: CORNERSTONE_SLUG,
    title: "Mat Pilates, Yoga, Yin & Barre Tugun | The Body Method Cornerstone",
    description:
        "Pilates, yoga, barre, yin, meditation and movement at The Body Method Cornerstone - our main community home in Tugun.",
    content: {
        hero: {
            heading: "More ways to move and more reasons to stay.",
            lines: [
                "Light pouring through the windows, trees outside through the windows, and people you know inside.",
            ],
            image: tbm("hero-cornerstone.jpg"),
            videoDesktopUrl: HERO_VIDEO_DESKTOP,
            videoMobileUrl: HERO_VIDEO_MOBILE,
            imageAlt:
                "The entrance to the Cornerstone building through the gardens",
            imageFocus: "center 50%",
        },
        intro: {
            lede: "Cornerstone gives you room to explore different ways of moving and a community to experience them with.",
            modalities: [
                "Pilates.",
                "Yoga.",
                "Barre.",
                "Yin.",
                "Meditation.",
                "Movement.",
            ],
            closer: "Different practices, with one place to make them part of your life.",
            image: tbm("cornerstone-intro.jpg"),
            imageAlt: "A mat and massage ball waiting by the window at Cornerstone",
        },
        moveDifferently: {
            heading: "Move differently through your week.",
            body: [
                "Some days you want strength.",
                "Some days you need to slow down.",
                "Sometimes you want the energy of a room moving together.",
            ],
            closer: "Cornerstone gives you the variety to build a practice around what life is asking of you today.",
            cards: [
                {
                    id: "mat",
                    image: tbm("classes-mat.jpg"),
                    imageAlt: "A mat class stretching in low light beside the studio windows",
                },
                {
                    id: "yoga",
                    image: tbm("classes-yoga.jpg"),
                    imageAlt:
                        "A yoga class reaching both arms overhead",
                },
                {
                    id: "barre",
                    image: tbm("classes-barre.jpg"),
                    imageAlt: "A barre class holding a lunge at the timber barre",
                },
            ],
            cta: { label: "EXPLORE CLASSES", href: "/classes" },
        },
        community: {
            heading: "The hour matters and so does what happens around it.",
            body: [
                "Cornerstone is our main community home - classes, conversations, workshops, events and all the little moments in between.",
                "Come for your class - don’t be surprised if you stay for a chat.",
            ],
            link: { label: "LIFE AT TBM", href: "/life-at-tbm" },
            image: tbm("cornerstone-community.jpg"),
            imageAlt: "The street outside the studio, with people at the cafe tables",
            imageFocus: "center",
        },
        grid: {
            teacher: {
                name: "Susie Tagarro",
                href: "/our-people",
                role: "Vinyasa / flow yoga.",
                time: "Cornerstone, Wednesday 4.15pm",
                image: tbm("teacher-susie-tagarro.jpg"),
                imageAlt: "Portrait of Susie Tagarro",
            },
            story: {
                label: "“Why I stay.”",
                quote: "Short quote",
                caption: "Anna · Member since XXXX",
                image: tbm("home-story-anna.jpg"),
                imageAlt: "Anna talking with two other members in the studio",
            },
            timetable: {
                body: "Classes run throughout the week. Check the live timetable and book your spot before you arrive.",
                cta: {
                    label: "VIEW CORNERSTONE TIMETABLE",
                    href: BOOKING_URL,
                },
                image: tbm("cornerstone-timetable.jpg"),
                imageAlt: "Members resting on their mats at the end of a class",
            },
            location: {
                address:
                    "Upstairs, Level 1, Cornerstone Stores, Shop 8, 570 Gold Coast Highway, Tugun QLD 4224",
                mapLabel: "Map of Cornerstone studio location",
                cta: {
                    label: "GET DIRECTIONS",
                    href: "https://maps.app.goo.gl/QuJycWP9bWruvas76",
                },
            },
            cta: { label: "START WITH 21 DAYS", href: "/new-here" },
        },
        faq: {
            heading: "CORNERSTONE FAQ:",
            items: [
                {
                    question: "Where is The Body Method Cornerstone?",
                    answer: "Our Cornerstone studio is located [Upstairs at Level 1, shop 8/570 Gold Coast Hwy, Tugun QLD 4224](https://share.google/jL3QdCMThbnkGKE1b) - inside Cornerstone Stores.\n\nThis is our larger movement studio and home to Pilates, yoga, barre, yin, meditation, workshops and much of our wider TBM community.",
                },
                {
                    question: "Where do I park for Cornerstone?",
                    answer: "There is street parking along the Gold Coast highway and surrounding streets, as well as limited parking in the Cornerstone carpark. Please make sure you allow 10-15 minutes for parking times during peak periods on weekends etc.",
                },
                {
                    question: "What should I bring to class at The Body Method?",
                    answer: "Mostly, just yourself. Wear something comfortable and you can move in - oh and don’t forget to bring a water bottle. You’re welcome to bring a small towel and your own mat, but we have mats and everything else you’ll need waiting for you. We keep our studio spaces phone-free, so we ask that phones stay with your shoes at the front door - a little time to switch off, move and be present.",
                },
                {
                    question: "Can I come casually without becoming a member?",
                    answer: "Yes you can! Welcome! [PRICING IS HERE ↗](https://momence.com/u/the-body-method-QJrwuU) If you’re completely new to TBM, however, we’d recommend looking at the 21-Day Immersion first - it gives you the opportunity to experience both studios rather than judging us on one class.",
                },
                {
                    question:
                        "Do I need to be fit or flexible to do Yoga or Mat Pilates?",
                    answer: "Absolutely not. You don’t need to be fit, flexible or experienced to belong here. Come exactly as you are, wherever you’re starting from. Our teachers will meet you there, help you feel comfortable and supported, and guide you as you build strength, confidence and mobility in your own time. Pro Tip - Mat Pilates and Barre is more advanced in intensity and Power Pilates is pretty spicy so if you’re looking for an intense workout - you have found it!",
                },
            ],
        },
    },
};
