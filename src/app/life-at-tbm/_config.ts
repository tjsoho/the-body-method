/* ************************************************************
   /life-at-tbm content shape and fallback copy.

   Events, workshops and partners all change, which is most of
   why this page exists. They are lists so they can be added to
   and cleared out without a code change.
************************************************************ */

import type { PhotoHeroContent } from "@/components/core/PageHero";
import type { MemberStory } from "@/components/carousel/StoryCarousel";

export type Cta = { label: string; href: string };

export type EventCard = {
    id: string;
    /** Small bronze line above the title, e.g. the date and studio. */
    meta: string;
    title: string;
    body: string;
    /** Optional link under the card. */
    linkLabel: string;
    linkHref: string;
    image: string;
    imageAlt: string;
};

export type Partner = {
    id: string;
    name: string;
    href: string;
    logo: string;
};

export type LifeAtTbmContent = {
    hero: PhotoHeroContent;
    lede: { body: string };
    happening: {
        label: string;
        heading: string;
        body: string;
        cards: EventCard[];
    };
    community: {
        label: string;
        heading: string;
        body: string;
        cardLabel: string;
        memberSinceLabel: string;
        stories: MemberStory[];
    };
    workshops: {
        label: string;
        heading: string;
        body: string;
        cards: EventCard[];
        cta: Cta;
    };
    partners: {
        label: string;
        heading: string;
        body: string[];
        items: Partner[];
    };
};

export type LifeAtTbmPageProps = {
    slug: string;
    title: string;
    description: string;
    content: LifeAtTbmContent;
};

export const LIFE_AT_TBM_SLUG = "life-at-tbm";

const ph = (file: string) => `/images/tbm-placeholders/${file}`;

export const lifeAtTbmFallbackData: LifeAtTbmPageProps = {
    slug: LIFE_AT_TBM_SLUG,
    title: "Life at The Body Method",
    description:
        "More than the hour you spend on the mat. Workshops, events, friendships and the people who make The Body Method.",
    content: {
        hero: {
            heading: "More than the hour you spend on the mat.",
            lines: [
                "Movement brings us together, but some of the best things happen around it.",
            ],
            image: ph("hero-life.jpg"),
            imageAlt:
                "Hands holding coffee cups around a timber table near a sunny window",
            imageFocus: "center 50%",
        },
        lede: {
            body: "Life at TBM is a little window into everything that makes The Body Method more than a place to exercise. The people, the friendships, the learning, the experiences and the connections that grow beyond the weekly timetable.",
        },
        happening: {
            label: "WHAT'S HAPPENING",
            heading: "Good things are always worth coming together for.",
            body: "From workshops and special events to movement experiences and opportunities to learn something new, here's what's happening in and around our studios.",
            cards: [
                {
                    id: "event-1",
                    meta: "[Day, date · time · studio]",
                    title: "[Event name]",
                    body: "[One or two lines about the event]",
                    linkLabel: "",
                    linkHref: "",
                    image: ph("landscape-life-walk.jpg"),
                    imageAlt: "Women walking along the water at sunrise",
                },
                {
                    id: "event-2",
                    meta: "[Day, date · time · studio]",
                    title: "[Event name]",
                    body: "[One or two lines about the event]",
                    linkLabel: "",
                    linkHref: "",
                    image: ph("landscape-life-retreat.jpg"),
                    imageAlt: "Mats laid out on a timber deck among trees",
                },
            ],
        },
        community: {
            label: "OUR COMMUNITY",
            heading: "The people make the place.",
            body: "Meet some of the wonderful humans who bring The Body Method to life. The familiar faces, personal stories, shared moments and little things that make our studios feel like somewhere you belong.",
            cardLabel: "\u201cWhy I stay.\u201d",
            memberSinceLabel: "Member since",
            stories: [
                {
                    id: "story-1",
                    quote: "Short quote",
                    name: "Member name",
                    memberSince: "XXXX",
                    favouriteClassTeacher: "Favourite class / teacher",
                    image: ph("member-1-downdog.jpg"),
                    imageAlt: "Downward facing dog on a sage mat",
                },
                {
                    id: "story-2",
                    quote: "Short quote",
                    name: "Member name",
                    memberSince: "XXXX",
                    favouriteClassTeacher: "Favourite class / teacher",
                    image: ph("member-2-reformer-arms.jpg"),
                    imageAlt: "Kneeling arm work with straps on a Reformer",
                },
                {
                    id: "story-3",
                    quote: "Short quote",
                    name: "Member name",
                    memberSince: "XXXX",
                    favouriteClassTeacher: "Favourite class / teacher",
                    image: ph("member-3-childs-pose.jpg"),
                    imageAlt: "Child’s pose in soft window light",
                },
            ],
        },
        workshops: {
            label: "WORKSHOPS + LEARNING",
            heading: "Curiosity looks good on everybody.",
            body: "We love creating opportunities to explore movement a little further. From Pilates and barre training to specialist workshops and new ways of understanding your body, there's always something worth learning.",
            cards: [
                {
                    id: "ballet",
                    meta: "[Date · time] · Cornerstone",
                    title: "Intro to Ballet Workshops",
                    body: "Creating a welcoming space for adults to reconnect with dance, explore ballet fundamentals and experience the joy of movement, regardless of their previous dance experience.",
                    linkLabel: "",
                    linkHref: "",
                    image: ph("landscape-life-workshop.jpg"),
                    imageAlt:
                        "A small group on mats watching a teacher demonstrate with a spine model",
                },
                {
                    id: "barre-body",
                    meta: "[Date · time] · [Studio]",
                    title: "Barre Body Teacher Training",
                    body: "[One or two lines about the training]",
                    linkLabel: "https://barrebody.com.au",
                    linkHref: "https://barrebody.com.au",
                    image: ph("landscape-life-training.jpg"),
                    imageAlt: "Legs at a timber barre during a training session",
                },
            ],
            cta: { label: "SEE WHAT'S COMING UP", href: "#whats-on" },
        },
        partners: {
            label: "FRIENDS OF TBM",
            heading: "Good people doing good things.",
            body: [
                "We're lucky to be surrounded by talented practitioners, thoughtful businesses and people who share our belief in taking good care of others.",
                "These are some of the people and brands we're proud to work alongside.",
            ],
            items: [
                {
                    id: "tugun-osteopathy",
                    name: "Tugun Osteopathy",
                    href: "https://www.tugunosteopathy.com/",
                    logo: "/images/tbm-partners/tugun-osteopathy.webp",
                },
                {
                    id: "the-upside",
                    name: "The Upside",
                    href: "https://www.theupside.com.au/",
                    logo: "/images/tbm-partners/the-upside.svg",
                },
                {
                    id: "barre-body",
                    name: "Barre Body Teacher Training",
                    href: "https://barrebody.com.au",
                    logo: "/images/tbm-partners/barre-body.svg",
                },
            ],
        },
    },
};
