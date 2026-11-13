/* ************************************************************
   /classes content shape and fallback copy.
************************************************************ */

import type { PhotoHeroContent } from "@/components/core/PageHero";
import { BOOKING_URL } from "@/config/booking";

export type Cta = { label: string; href: string };

export type ClassCard = {
    id: string;
    image: string;
    imageAlt: string;
    imageFocus: string;
    title: string;
    body: string;
};

export type ClassesContent = {
    hero: PhotoHeroContent;
    cards: {
        /** The link under every card. One label, used by all of them. */
        linkLabel: string;
        linkHref: string;
        items: ClassCard[];
    };
    ctaCard: {
        image: string;
        imageAlt: string;
        imageFocus: string;
        primaryCta: Cta;
        secondaryCta: Cta;
    };
};

export type ClassesPageProps = {
    slug: string;
    title: string;
    description: string;
    content: ClassesContent;
};

export const CLASSES_SLUG = "classes";

const ph = (file: string) => `/images/tbm-placeholders/${file}`;

export const classesFallbackData: ClassesPageProps = {
    slug: CLASSES_SLUG,
    title: "Pilates, Reformer, Yoga, Yin, Meditation & Barre Classes Tugun Beach and Cornerstone Tugun.",
    description:
        "Explore the ways you can move at The Body Method - Reformer, Mat Pilates, Yoga, Barre, Yin, Restorative Yoga and Meditation at Tugun Beach and Cornerstone.",
    content: {
        hero: {
            heading: "Find the way you want to move today.",
            lines: [
                "Strength, control, mobility, stretching, energy and stillness - different days ask different things of us.",
                "Explore the ways you can move across The Body Method.",
            ],
            image: ph("hero-classes.jpg"),
            imageAlt: "A mat Pilates class with legs raised in tabletop",
            imageFocus: "center 50%",
        },
        cards: {
            linkLabel: "VIEW TIMES",
            linkHref: BOOKING_URL,
            items: [
                {
                    id: "reformer",
                    image: ph("studio-tugun-reformer.jpg"),
                    imageAlt: "Feet pressing the footbar of a timber Reformer",
                    imageFocus: "center 45%",
                    title: "Reformer Pilates",
                    body: "Small-group Reformer at Tugun Beach with a maximum of six in a class, and personalised teacher attention.",
                },
                {
                    id: "mat-pilates",
                    image: ph("landscape-mat.jpg"),
                    imageAlt: "A row of people in a hundred pose on sage mats",
                    imageFocus: "center 45%",
                    title: "Mat Pilates",
                    body: "Strength, control and intelligent movement using your own body and props.",
                },
                {
                    id: "yoga",
                    image: ph("landscape-yoga.jpg"),
                    imageAlt:
                        "People in warrior two facing tall windows full of trees",
                    imageFocus: "center 45%",
                    title: "Yoga",
                    body: "Move, breathe and reconnect. Our yoga classes combine mindful movement, mobility, strength and breathwork to help you feel more grounded, open and connected to your body.",
                },
                {
                    id: "barre",
                    image: ph("landscape-barre.jpg"),
                    imageAlt: "Legs in grip socks in a plie at a timber barre",
                    imageFocus: "center 45%",
                    title: "Barre Pilates",
                    body: "A dynamic, low-impact workout blending Pilates principles with barre-inspired movement. Expect controlled, targeted sequences designed to build strength, stability and that satisfying full-body burn.",
                },
                {
                    id: "yin",
                    image: ph("landscape-yin.jpg"),
                    imageAlt: "Supported butterfly pose over a bolster",
                    imageFocus: "center 45%",
                    title: "Yin Yoga",
                    body: "Slow down and find space. Yin uses longer-held, mostly floor-based poses to gently work into the deeper connective tissues, improve flexibility and mobility, and give your body and mind time to unwind.",
                },
                {
                    id: "restorative",
                    image: ph("landscape-restore.jpg"),
                    imageAlt: "Legs up the wall with bolsters and a linen blanket",
                    imageFocus: "center 45%",
                    title: "Restorative Yoga",
                    body: "Rest, reset and recharge. Restorative Yoga uses gentle, fully supported poses, props and stillness to encourage deep relaxation, release tension and help your nervous system settle. Less about stretching, more about giving your body permission to truly rest.",
                },
                {
                    id: "meditation",
                    image: ph("landscape-med.jpg"),
                    imageAlt: "Rolling a massage ball under a foot on a sage mat",
                    imageFocus: "center 45%",
                    title: "Meditation / Roll and Release + other movement",
                    body: "Movement isn’t always about working harder. From guided meditation to Roll & Release and specialty movement sessions, these classes give you space to restore, release tension, explore your body differently and support your overall wellbeing.",
                },
            ],
        },
        ctaCard: {
            image: ph("landscape-tugun-studio-morning.jpg"),
            imageAlt: "An empty Reformer studio in early morning light",
            imageFocus: "center",
            primaryCta: {
                label: "VIEW FULL TIMETABLE",
                href: BOOKING_URL,
            },
            secondaryCta: { label: "BOOK A CLASS", href: "/book" },
        },
    },
};
