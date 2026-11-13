/* ************************************************************
   /studios/tugun-beach content shape and fallback copy.
************************************************************ */

import type { PhotoHeroContent } from "@/components/core/PageHero";
import type { FaqEntry } from "@/components/admin/_shared/form-primitives";
import { BOOKING_URL } from "@/config/booking";

export type Cta = { label: string; href: string };
export type Tile = { id: string; image: string; imageAlt: string };

export type TugunBeachContent = {
    hero: PhotoHeroContent;
    intro: { lede: string; closer: string };
    sixPeople: {
        heading: string;
        body: string[];
        /** Italic green line that closes the section. */
        closer: string;
        image: string;
        imageAlt: string;
    };
    reformer: {
        heading: string;
        body: string;
        bestForLabel: string;
        bestFor: string;
        cta: Cta;
        image: string;
        imageAlt: string;
    };
    privateBand: {
        heading: string;
        body: string;
        cta: Cta;
        image: string;
        imageAlt: string;
        imageFocus: string;
    };
    teachers: {
        heading: string;
        tiles: Tile[];
    };
    faq: {
        heading: string;
        items: FaqEntry[];
    };
    closing: {
        primaryCta: Cta;
        secondaryCta: Cta;
    };
};

export type TugunBeachPageProps = {
    slug: string;
    title: string;
    description: string;
    content: TugunBeachContent;
};

export const TUGUN_BEACH_SLUG = "studios-tugun-beach";

const ph = (file: string) => `/images/tbm-placeholders/${file}`;

export const tugunBeachFallbackData: TugunBeachPageProps = {
    slug: TUGUN_BEACH_SLUG,
    title: "Reformer Pilates Tugun | The Body Method - Tugun Beach Studio",
    description:
        "Boutique Reformer Pilates in Tugun. Maximum six people per class so our teachers can really teach, with Private Pilates available too.",
    content: {
        hero: {
            heading: "Boutique classes and movement made personal.",
            lines: [
                "With just six Reformers, Tugun Beach gives our teachers something valuable: the space to really teach.",
            ],
            image: ph("hero-tugun.jpg"),
            imageAlt:
                "Hands gripping the footbar of a timber Reformer while a teacher guides the knee",
            imageFocus: "center 40%",
        },
        intro: {
            lede: "To watch how you move. Make adjustments, and help your body to refine your technique and then challenge you appropriately.",
            closer:
                "Because personalised movement doesn’t have to have a private session every time (but we do offer that too).",
        },
        sixPeople: {
            heading: "Six people changes the experience.",
            body: [
                "You’re not one of twenty bodies following instructions from the front of a room.",
            ],
            closer:
                "With a maximum of six, there is room for individual teaching within every class.",
            image: ph("portrait-tugun-six.jpg"),
            imageAlt:
                "A small Reformer studio with one person lying on the carriage",
        },
        reformer: {
            heading: "Reformer Pilates at The Body Method",
            body: "Strength, control, mobility and intelligent progression using the Reformer - taught with the individual attention our small classes allow.",
            bestForLabel: "Best for:",
            bestFor:
                "All ages and fitness levels, including pregnancy and postpartum, those returning from injury, or anyone looking for a strong, effective workout that builds core strength and stability.",
            cta: { label: "VIEW REFORMER TIMES", href: BOOKING_URL },
            image: ph("portrait-tugun-socks.jpg"),
            imageAlt:
                "Feet in grip socks on the carriage of a timber Reformer",
        },
        privateBand: {
            heading: "Movement that is all about you.",
            body: "Private Pilates gives you the dedicated attention of your own teacher, with movement tailored entirely to your body, goals and needs. Whether you’re working on something specific, returning to movement or simply wanting to deepen your practice, it’s your time to focus on you.",
            cta: {
                label: "EXPLORE PRIVATE PILATES",
                href: "/private-pilates",
            },
            image: ph("landscape-tugun-private.jpg"),
            imageAlt:
                "A teacher's hands supporting a client's ankle on a Reformer",
            imageFocus: "center",
        },
        teachers: {
            heading: "Meet some of the people teaching you:",
            tiles: [
                {
                    id: "teacher-1",
                    image: ph("teacher-1.jpg"),
                    imageAlt: "A teacher's hands guiding a student's hips",
                },
                {
                    id: "teacher-2",
                    image: ph("teacher-2.jpg"),
                    imageAlt: "Plank on the Reformer carriage",
                },
                {
                    id: "teacher-4",
                    image: ph("teacher-4.jpg"),
                    imageAlt: "Legs in Reformer straps",
                },
            ],
        },
        faq: {
            heading: "TUGUN BEACH FAQ",
            items: [
                {
                    question: "Is Reformer Pilates suitable for beginners?",
                    answer: "Absolutely. Reformer Pilates is suitable for all experience and fitness levels, including complete beginners. Our instructors will guide you through the movements, help you get comfortable with the Reformer and offer modifications so you can work at a pace that feels right for your body.",
                },
                {
                    question:
                        "Do I need to be fit or really flexible to do Reformer Pilates?",
                    answer: "Not at all. Everyone is welcome here. You come to move - you don't need to prove you can move before you arrive. Our teachers will meet you where you are and help you build from there.",
                },
                {
                    question:
                        "I'm pregnant - can I do Reformer Pilates at The Body Method?",
                    answer: "Yes. Reformer Pilates can be a wonderful way to stay strong and supported throughout a healthy pregnancy. At The Body Method, our instructors can modify movements as your body changes, so you can continue moving safely and comfortably. Please let your instructor know that you're pregnant before class, including how far along you are, and speak with your doctor, midwife or healthcare provider before starting or continuing exercise during pregnancy. Every pregnancy is different, so the focus is always on listening to your body and moving in a way that feels right for you.",
                },
                {
                    question:
                        "I'm a little nervous about coming for the first time. Is that normal?",
                    answer: "Very. Walking into any new studio can feel a little daunting when you don't know the room, the teacher or what you're doing yet. Come a little early, introduce yourself and we'll take care of the rest. You'll know your way around in no time.",
                },
                {
                    question: "What should I bring to class?",
                    answer: "Wear something comfortable that you can move easily in and bring a water bottle, a small towel if you wish - we have everything else you need already supplied. Mostly, just bring yourself. We'll let you know if there's anything particular you need for the class you've booked. We ask that everyone leave their phones with their shoes at the front door and not bring them to their mat.",
                },
                {
                    question: "Do I need grip socks?",
                    answer: "For Reformer Pilates at Tugun Beach, yes please. Grip socks help you move safely and comfortably on the equipment. If you've forgotten yours, we have some clean ones you can borrow and also some available for purchase too if needed.",
                },
                {
                    question:
                        "I have an injury or something going on with my body, can I still come?",
                    answer: "Most likely, but please let your teacher know before the class begins. We need to understand what's going on so we can determine whether the class is appropriate and make adjustments where we can safely. Depending on the injury or condition, we may recommend speaking with your healthcare professional first or beginning with a Private Pilates session so we can give you more individual attention.",
                },
                {
                    question: "Where is Tugun Beach studio?",
                    answer: "Our Tugun Beach Reformer Pilates studio is located at [3/5 Toolona St, Tugun QLD 4224](https://share.google/yIpCcBOu7JsYTNe5q), close to Tugun Beach on the southern Gold Coast.",
                },
                {
                    question: "Where do I park for Tugun Beach?",
                    answer: "There is street parking all along the front of the studio, there is also a beach parking area at the end of the street. Please make sure you allow 10-15 minutes for parking at peak periods on weekends etc.",
                },
            ],
        },
        closing: {
            primaryCta: { label: "START WITH 21 DAYS", href: "/new-here" },
            secondaryCta: {
                label: "BOOK A REFORMER CLASS",
                href: BOOKING_URL,
            },
        },
    },
};
