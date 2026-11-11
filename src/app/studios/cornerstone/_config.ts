/* ************************************************************
   /studios/cornerstone content shape and fallback copy.
************************************************************ */

import type { PhotoHeroContent } from "@/components/core/PageHero";
import type { FaqEntry } from "@/components/admin/_shared/form-primitives";

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

const ph = (file: string) => `/images/tbm-placeholders/${file}`;

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
            image: ph("hero-corner.jpg"),
            imageAlt:
                "An upstairs studio with windows full of tree canopy and people folded forward on mats",
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
            image: ph("portrait-cs-intro.jpg"),
            imageAlt: "A teacher's hand on a student's back in a seated pose",
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
                    image: ph("portrait-cs-mat.jpg"),
                    imageAlt: "Side-lying leg lift on a sage mat",
                },
                {
                    id: "yoga",
                    image: ph("portrait-cs-yoga.jpg"),
                    imageAlt:
                        "A low lunge with arms raised in front of tall windows",
                },
                {
                    id: "barre",
                    image: ph("portrait-cs-barre.jpg"),
                    imageAlt: "A hand on a timber barre and legs in a plie",
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
            image: ph("landscape-cs-community.jpg"),
            imageAlt: "People chatting while rolling up mats after class",
            imageFocus: "center",
        },
        grid: {
            teacher: {
                name: "Susie Tagarro",
                href: "/our-people",
                role: "Vinyasa / flow yoga.",
                time: "Cornerstone, Wednesday 4.15pm",
                image: ph("portrait-t9.jpg"),
                imageAlt: "Hands holding a singing bowl in a lap",
            },
            story: {
                label: "“Why I stay.”",
                quote: "Short quote",
                caption: "Member name · Member since XXXX",
                image: ph("member-1-downdog.jpg"),
                imageAlt: "Downward facing dog on a sage mat",
            },
            timetable: {
                body: "Classes run throughout the week. Check the live timetable and book your spot before you arrive.",
                cta: {
                    label: "VIEW CORNERSTONE TIMETABLE",
                    href: "#momence-timetable-cornerstone",
                },
                image: ph("landscape-yoga.jpg"),
                imageAlt:
                    "People in warrior two facing tall windows full of trees",
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
                    answer: "Yes you can! Welcome! [PRICING IS HERE ↗](#momence-pricing) If you’re completely new to TBM, however, we’d recommend looking at the 21-Day Immersion first - it gives you the opportunity to experience both studios rather than judging us on one class.",
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
