/* ************************************************************
   /new-here content shape and fallback copy.

   The 21-Day Immersion page. Copy is the client-approved master,
   so the fallback below is verbatim.
************************************************************ */

import type { PhotoHeroContent } from "@/components/core/PageHero";
import type { FaqEntry } from "@/components/admin/_shared/form-primitives";
import { BOOKING_URL } from "@/config/booking";

export type Cta = { label: string; href: string };

export type StudioTile = {
    id: string;
    name: string;
    body: string;
    image: string;
    imageAlt: string;
    imageFocus: string;
};

export type WeekStep = { id: string; week: string; title: string; body: string };

export type NewHereContent = {
    hero: PhotoHeroContent & { cta: Cta };
    purpose: {
        heading: string;
        body: string[];
        /** The pair of larger lines under the rule. */
        closerPlain: string;
        closerItalic: string;
        image: string;
        imageAlt: string;
    };
    ready: {
        heading: string;
        /** Rule-separated rows, one line each. */
        items: string[];
        closer: string;
        image: string;
        imageAlt: string;
    };
    studios: {
        headingLead: string;
        headingItalic: string;
        items: StudioTile[];
        cta: Cta;
    };
    weeks: {
        bandImage: string;
        bandImageAlt: string;
        bandImageFocus: string;
        heading: string;
        steps: WeekStep[];
        afterHeading: string;
        /** First paragraph, set brighter than the rest. */
        afterLead: string;
        afterBody: string[];
    };
    firstClass: {
        heading: string;
        body: string[];
        italicLine: string;
        image: string;
        imageAlt: string;
        cta: Cta;
    };
    faq: {
        heading: string;
        items: FaqEntry[];
        cta: Cta;
    };
};

export type NewHerePageProps = {
    slug: string;
    title: string;
    description: string;
    content: NewHereContent;
};

export const NEW_HERE_SLUG = "new-here";

const ph = (file: string) => `/images/tbm-placeholders/${file}`;

export const newHereFallbackData: NewHerePageProps = {
    slug: NEW_HERE_SLUG,
    title: "New here? / 21-Day Immersion",
    description:
        "21 days to find your kind of movement. For $99, spend three weeks across both of our Tugun studios and discover the way of moving that fits your life.",
    content: {
        hero: {
            heading: "21 days to find your kind of movement.",
            lines: [
                "Come as you are and find the movement that fits your life.",
                "For $99, spend 21 days exploring The Body Method across both of our Tugun studios.",
            ],
            image: ph("hero-new-here.jpg"),
            imageAlt: "A woman carrying a rolled mat into a light-filled studio",
            imageFocus: "center 45%",
            cta: { label: "START MY 21 DAYS - $99", href: BOOKING_URL },
        },
        purpose: {
            heading: "What are the 21 days for?",
            body: [
                "To explore. Try Reformer Pilates at Tugun Beach, then mat Pilates, yoga, yin, meditation or barre at Cornerstone. Move with different teachers. Try a morning class, then an evening one.",
                "It’s your chance to discover what your body responds to, what you genuinely enjoy and what actually fits into your life.",
            ],
            closerPlain: "Because the goal isn’t to move every day for 21 days.",
            closerItalic:
                "It’s to find a way of moving you’ll want to keep coming back to long after they’re over.",
            image: ph("portrait-new-here-springs.jpg"),
            imageAlt: "A hand adjusting the springs on a timber Pilates tower",
        },
        ready: {
            heading: "You don’t need to be “ready”.",
            items: [
                "Never done Reformer or Mat Pilates? Great, that is no problem.",
                "Haven’t moved much lately? Well then, you’re so welcome to be here.",
                "Already experienced and looking for somewhere new? Come right on in.",
                "You don't need to be flexible, coordinated or “fit enough” before you arrive.",
            ],
            closer: "You start where you are - we teach from there.",
            image: ph("portrait-new-here-guide.jpg"),
            imageAlt: "A teacher's hand gently guiding a kneeling beginner",
        },
        studios: {
            headingLead: "Two studios - ",
            headingItalic: "your 21 days include both.",
            items: [
                {
                    id: "tugun-beach",
                    name: "Tugun Beach",
                    body: "Six-person Reformer Pilates with personalised teaching and close attention.",
                    image: ph("studio-tugun-reformer.jpg"),
                    imageAlt: "Feet pressing the footbar of a timber Reformer",
                    imageFocus: "center 45%",
                },
                {
                    id: "cornerstone",
                    name: "Cornerstone",
                    body: "Pilates, yoga, barre and more in our larger, light-filled community studio.",
                    image: ph("studio-cornerstone-meditation.jpg"),
                    imageAlt: "Seated meditation facing windows full of trees",
                    imageFocus: "center",
                },
            ],
            cta: { label: "COMPARE THE STUDIOS", href: "/studios" },
        },
        weeks: {
            bandImage: ph("landscape-tugun-studio-morning.jpg"),
            bandImageAlt: "An empty Reformer studio in early morning light",
            bandImageFocus: "center 55%",
            heading: "Your three weeks:",
            steps: [
                {
                    id: "week-1",
                    week: "Week 1 -",
                    title: "Explore",
                    body: "Try both spaces. Meet teachers. Experience different classes.",
                },
                {
                    id: "week-2",
                    week: "Week 2 -",
                    title: "Find Your Rhythm",
                    body: "Notice what you enjoy, when you like to move and what works in your week.",
                },
                {
                    id: "week-3",
                    week: "Week 3 -",
                    title: "Build Your Routine",
                    body: "Start turning those choices into a sustainable practice.",
                },
            ],
            afterHeading: "After 21 days?",
            afterLead:
                "We'll help you choose what makes sense next - Cornerstone, Tugun Beach, both, or another way of moving with us.",
            afterBody: [
                "No mystery and no hard sell. Just movement that works for your life and where you are right now.",
                "When your 21 days are up, you can simply choose the membership that feels right - or, if you’re not quite ready to commit, keep moving with us through class packs.",
                "And if you’re not sure which way to go, we’re always happy to help.",
            ],
        },
        firstClass: {
            heading: "Your first class",
            body: [
                "Book and then arrive a little early. Tell us anything we should know about your body or experience.",
            ],
            italicLine: "Then let us take care of the rest.",
            image: ph("landscape-first-class-door.jpg"),
            imageAlt: "Shoes lined up on a timber bench at the studio door",
            cta: { label: "START MY 21 DAYS", href: BOOKING_URL },
        },
        faq: {
            heading: "FAQ",
            items: [
                {
                    question: "Is The Body Method suitable for beginners?",
                    answer: "Yes, absolutely. You don't need previous Pilates or yoga experience to start. Let your teacher know you're new and they'll help you from there.",
                },
                {
                    question: "Which studio should I start with?",
                    answer: "Your 21-Day Immersion includes both, so you don't need to decide upfront. Tugun Beach offers small-group Reformer Pilates; Cornerstone gives you a broader mix of Pilates, yoga, barre and movement.",
                },
                {
                    question: "Do I have to attend every day?",
                    answer: "Not at all. For some people, 3-4 times a week feels great; for you, it might be two, or it might be five. The idea is to use your 21 days to find a rhythm you genuinely enjoy and can keep up - along with the classes, teachers and times that suit you best.",
                },
                {
                    question: "What should I bring?",
                    answer: "Comfy clothes to move in, a water bottle and a small towel if you like. Then come ready to move, stretch, slow down, meditate or fire things up with a high-intensity mat Pilates class. You get to choose your own adventure.",
                },
                {
                    question: "Can I start if I have an injury or I'm pregnant?",
                    answer: "In many cases, yes - but please have a chat with us before you book your first class. Every body, injury and pregnancy is different, so we want to understand where you’re at and make sure we’re recommending the right class and level of support for you. Depending on your circumstances, we may suggest starting with a Private Pilates session or checking in with your healthcare professional first.",
                },
            ],
            cta: { label: "START MY 21 DAYS - $99", href: BOOKING_URL },
        },
    },
};
