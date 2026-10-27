import type { MemberStory } from "@/components/Home/WhyPeopleStay";
import type { Teacher } from "@/components/Home/GreatTeaching";
import type { LifeTile } from "@/components/Home/LifeAtTbm";

/**
 * The Body Method — Home page content shape and fallback copy.
 *
 * Every string here comes verbatim from Sarah's approved
 * `DRAFT homepage copy.pdf`. Do NOT paraphrase. Admin edits via the CMS
 * override these per-field; this file is only the fallback on an
 * un-edited DB.
 *
 * Sections are listed in page order. Each one carries both its own copy
 * and any links/images it owns. Lists that grow over time (member
 * stories, teachers, Life at TBM gallery) live in their own tables, not
 * here.
 */

export type Cta = { label: string; href: string };

export type HeroContent = {
    heading: string;
    italicSubheading: string;
    body: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    videoDesktopUrl: string;
    videoMobileUrl: string;
    fallbackImage: string;
    fallbackImageAlt: string;
};

export type Pillar = { title: string; body: string };
export type BelongContent = {
    headingLead: string;
    headingItalic: string;
    italicLine: string;
    body: string[];
    image: string;
    imageAlt: string;
    pillars: Pillar[];
};

export type StudioCard = {
    name: string;
    italicLine: string;
    body: string;
    image: string;
    imageAlt: string;
    ctaLabel: string;
    ctaHref: string;
};
export type TwoStudiosContent = {
    headingLead: string;
    headingItalic: string;
    tugunBeach: StudioCard;
    cornerstone: StudioCard;
    dualHeading: string;
    dualBody: string;
    dualCta: Cta;
};

export type TwentyOneDayStep = { week: string; title: string; body: string; italic?: boolean };
export type TwentyOneDayContent = {
    label: string;
    headingLead: string;
    headingItalic: string;
    italicLine: string;
    body: string;
    priceLine: string;
    steps: TwentyOneDayStep[];
    cta: Cta;
};

export type WhyPeopleStayContent = {
    heading: string;
    italicLine: string;
};

export type GreatTeachingContent = {
    headingLead: string;
    headingItalic: string;
    body: string[];
    italicCloser: string;
    cta: Cta;
};

export type PrivatePilatesContent = {
    heading: string;
    italicLine: string;
    body: string[];
    image: string;
    imageAlt: string;
    cta: Cta;
};

export type LifeAtTbmContent = {
    headingLead: string;
    headingItalic: string;
    body: string;
    cta: Cta;
};

export type FinalCtaContent = {
    headingLead: string;
    headingItalic: string;
    body: string;
    cta: Cta;
    backgroundImage: string;
    backgroundImageAlt: string;
};

export type HomePageContent = {
    hero: HeroContent;
    belong: BelongContent;
    twoStudios: TwoStudiosContent;
    twentyOneDay: TwentyOneDayContent;
    whyPeopleStay: WhyPeopleStayContent;
    greatTeaching: GreatTeachingContent;
    privatePilates: PrivatePilatesContent;
    lifeAtTbm: LifeAtTbmContent;
    finalCta: FinalCtaContent;
};

export type HomePageProps = {
    slug: string;
    title: string;
    description: string;
    content: HomePageContent;
};

/** Placeholder image path shortcut. */
const ph = (file: string) => `/images/tbm-placeholders/${file}`;

export const homePageFallbackData: HomePageProps = {
    slug: "home",
    title: "The Body Method | Pilates, Yoga & Movement in Tugun, Gold Coast",
    description:
        "The Body Method is a movement community in Tugun on the Gold Coast, offering Reformer Pilates, Pilates, yoga, barre, private Pilates and more across two studios.",
    content: {
        hero: {
            heading: "Movement that makes a difference far beyond the studio.",
            italicSubheading:
                "Building strength, confidence and capacity for everything life asks of you.",
            body: "Two beautiful Tugun studios with exceptional teachers, personalised movement and a community that genuinely knows your name.",
            primaryCta: { label: "START WITH 21 DAYS FOR $99", href: "/memberships" },
            secondaryCta: { label: "EXPLORE BOTH STUDIOS", href: "/studios" },
            videoDesktopUrl: "",
            videoMobileUrl: "",
            fallbackImage: ph("hero-cornerstone-group.jpg"),
            fallbackImageAlt:
                "A group in warrior pose silhouetted against tall tree-filled windows",
        },
        belong: {
            headingLead: "More than a place to move - ",
            headingItalic: "a place to belong.",
            italicLine: "What makes movement become part of your life?",
            body: [
                "We think it’s great teaching. Being noticed and finding movement that works for your body and people you genuinely look forward to seeing.",
                "That’s what we’ve built The Body Method around.",
            ],
            image: ph("belong-tree-pose.jpg"),
            imageAlt: "Hands at heart in tree pose on a sage mat",
            pillars: [
                {
                    title: "Exceptional Teaching",
                    body: "Technical, intuitive and adaptive.",
                },
                {
                    title: "Care You Can Feel",
                    body: "Where you are known and supported.",
                },
                {
                    title: "Strength for Life",
                    body: "Movement that supports how you move, work, play and live.",
                },
                {
                    title: "Community That Holds You",
                    body: "A place you actually want to come back to.",
                },
            ],
        },
        twoStudios: {
            headingLead: "Two Studios. ",
            headingItalic: "Two ways to move.",
            tugunBeach: {
                name: "Tugun Beach",
                italicLine:
                    "Reformer Pilates that is personal, precise and intimate.",
                body: "Reformer Pilates with a maximum of six people, giving our teachers the space to watch, adapt, correct and teach the person in front of them.",
                image: ph("studio-tugun-reformer.jpg"),
                imageAlt: "Feet pressing the footbar of a timber Reformer",
                ctaLabel: "SEE TUGUN BEACH PILATES",
                ctaHref: "/studios",
            },
            cornerstone: {
                name: "Cornerstone",
                italicLine:
                    "Light filled yoga, mat pilates and movement with variety, genuine energy and a great community.",
                body: "Pilates, yoga, barre, yin, meditation and movement in our beautiful Cornerstone studio - where natural light pours in and the trees feel like part of the room - with more ways to move and more people to move alongside.",
                image: ph("studio-cornerstone-meditation.jpg"),
                imageAlt: "Seated meditation facing windows full of trees",
                ctaLabel: "SEE CORNERSTONE",
                ctaHref: "/studios",
            },
            dualHeading: "Can’t choose? You don’t have to.",
            dualBody:
                "Our Dual Membership combines the personal attention of Tugun Beach with the variety and community of Cornerstone. It is the fullest TBM experience.",
            dualCta: {
                label: "EXPLORE THE DUAL MEMBERSHIP",
                href: "/memberships",
            },
        },
        twentyOneDay: {
            label: "New to TBM?",
            headingLead: "Your first 21 days at ",
            headingItalic: "The Body Method.",
            italicLine:
                "Not just unlimited classes - time to find what works for you.",
            body: "Explore both studios. Try different teachers and ways of moving. Learn what you enjoy and start building a routine that fits your actual life.",
            priceLine: "21 days + 2 studios = $99.",
            steps: [
                { week: "WEEK 1 -", title: "Explore", body: "Meet us. Try things. Get comfortable." },
                { week: "WEEK 2 -", title: "Find Your Rhythm", body: "Discover the classes, teachers and times that work for you." },
                { week: "WEEK 3 -", title: "Build Your Routine", body: "Turn what feels good into something you can keep doing." },
                { week: "THEN -", title: "Choose What’s Next", body: "Find the membership that fits the way you want to move.", italic: true },
            ],
            cta: { label: "START YOUR 21 DAYS", href: "/memberships" },
        },
        whyPeopleStay: {
            heading: "Why people stay.",
            italicLine:
                "You can tell people what makes a place special - or you can ask the people who keep coming back.",
        },
        greatTeaching: {
            headingLead: "Great movement starts with ",
            headingItalic: "great teaching.",
            body: [
                "Our teachers don’t simply deliver classes.",
                "They watch, adapt, gently correct and encourage. They remember what you told them last week. They also know when to challenge you - and when your body needs something different.",
            ],
            italicCloser:
                "Because the quality of the movement depends on the quality of the person teaching it.",
            cta: { label: "MEET OUR PEOPLE", href: "/our-people" },
        },
        privatePilates: {
            heading: "Private Pilates",
            italicLine: "Sometimes you need more than a group class.",
            body: [
                "Private Pilates gives you the space to work one-to-one with an experienced teacher and build movement around your body, your history and what you want to achieve.",
                "Private Pilates for people who want individual attention - whether you're returning from injury, building confidence, navigating pregnancy/postpartum, improving technique or simply want movement built around your body.",
            ],
            image: ph("private-pilates.jpg"),
            imageAlt: "A teacher guiding a client's leg in Reformer straps",
            cta: { label: "EXPLORE PRIVATE PILATES", href: "/private-pilates" },
        },
        lifeAtTbm: {
            headingLead: "Movement is where it starts. ",
            headingItalic: "But some of the best things happen around it.",
            body: "Events, workshops, retreats, walks, coffee, learning, conversations and time spent together - more ways to connect, grow and be part of something.",
            cta: { label: "SEE LIFE AT TBM", href: "/life-at-tbm" },
        },
        finalCta: {
            headingLead: "Come and see ",
            headingItalic: "how it feels.",
            body: "21 days + 2 studios and unlimited classes = $99.",
            cta: { label: "START YOUR 21 DAYS", href: "/memberships" },
            backgroundImage: ph("final-cta-rest.jpg"),
            backgroundImageAlt: "Resting on a mat in late afternoon light",
        },
    },
};

/* ──────────────────────────────────────────────────────────────────────
   Lists that grow over time.

   These three arrays mirror the V3 placeholder content exactly. They
   live separately from HomePageContent because they are destined for
   their own Supabase tables (`member_stories`, `team`, `life_at_tbm`)
   once the admin forms land. For now the home sections render straight
   from these fallbacks.
   ────────────────────────────────────────────────────────────────────── */

export const memberStoriesFallback: MemberStory[] = [
    {
        id: "placeholder-1",
        quote: "Short quote",
        name: "Member name",
        memberSince: "XXXX",
        favouriteClassTeacher: "Favourite class / teacher",
        image: ph("member-1-downdog.jpg"),
        imageAlt: "Downward facing dog on a sage mat",
    },
    {
        id: "placeholder-2",
        quote: "Short quote",
        name: "Member name",
        memberSince: "XXXX",
        favouriteClassTeacher: "Favourite class / teacher",
        image: ph("member-2-reformer-arms.jpg"),
        imageAlt: "Kneeling arm work with straps on a Reformer",
    },
    {
        id: "placeholder-3",
        quote: "Short quote",
        name: "Member name",
        memberSince: "XXXX",
        favouriteClassTeacher: "Favourite class / teacher",
        image: ph("member-3-childs-pose.jpg"),
        imageAlt: "Child's pose in soft window light",
    },
];

export const teachersFallback: Teacher[] = [
    {
        id: "placeholder-1",
        name: "Name",
        intro: "Short intro",
        image: ph("teacher-1.jpg"),
        imageAlt: "A teacher's hands guiding a student's hips",
    },
    {
        id: "placeholder-2",
        name: "Name",
        intro: "Short intro",
        image: ph("teacher-2.jpg"),
        imageAlt: "Plank on the Reformer carriage",
    },
    {
        id: "placeholder-3",
        name: "Name",
        intro: "Short intro",
        image: ph("teacher-3.jpg"),
        imageAlt: "Garland squat on a sage mat by the windows",
    },
    {
        id: "placeholder-4",
        name: "Name",
        intro: "Short intro",
        image: ph("teacher-4.jpg"),
        imageAlt: "Legs in Reformer straps",
    },
];

export const lifeAtTbmTilesFallback: LifeTile[] = [
    {
        id: "placeholder-1",
        image: ph("life-group.jpg"),
        imageAlt: "A row of members in a seated stretch facing the windows",
        size: "wide-8",
    },
    {
        id: "placeholder-2",
        image: ph("life-meditation.jpg"),
        imageAlt: "Seated meditation in linen",
        size: "narrow-4",
    },
    {
        id: "placeholder-3",
        image: ph("life-beach.jpg"),
        imageAlt: "Yoga on the sand at sunrise",
        size: "wide-all",
    },
];
