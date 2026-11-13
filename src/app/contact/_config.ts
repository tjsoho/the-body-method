/* ************************************************************
   /contact content shape and fallback copy.

   Each studio card is a photo, an address, a line of intro, a
   map link and then a stack of labelled blocks. Keeping the
   blocks as a list means a studio can gain a "What to bring" or
   lose a "Parking" without a code change.
************************************************************ */

import type { PhotoHeroContent } from "@/components/core/PageHero";
import { BOOKING_URL } from "@/config/booking";

export type StudioInfoBlock = {
    id: string;
    label: string;
    /** Rich text, so a phone number can be a tel: link. */
    body: string;
    ctaLabel: string;
    ctaHref: string;
    /** "solid" is the filled button, "outline" the bordered one. */
    ctaTheme: "solid" | "outline";
};

export type StudioCard = {
    id: string;
    name: string;
    image: string;
    imageAlt: string;
    imageFocus: string;
    address: string;
    intro: string;
    mapHref: string;
    blocks: StudioInfoBlock[];
};

export type ContactContent = {
    hero: PhotoHeroContent;
    studios: StudioCard[];
    form: {
        heading: string;
        nameLabel: string;
        emailLabel: string;
        messageLabel: string;
        submitLabel: string;
        /** Where the form posts. "#" until an endpoint is wired up. */
        action: string;
    };
};

export type ContactPageProps = {
    slug: string;
    title: string;
    description: string;
    content: ContactContent;
};

export const CONTACT_SLUG = "contact";

const TUGUN_MAP = "https://maps.app.goo.gl/XCPQRxX47xJREu1P8";
const CORNERSTONE_MAP = "https://maps.app.goo.gl/QuJycWP9bWruvas76";
const PHONE_BLOCK =
    "[0410 899 580](tel:0410899580) - 9am-5pm\n[hello@thebodymethod.com.au](mailto:hello@thebodymethod.com.au)";

export const contactFallbackData: ContactPageProps = {
    slug: CONTACT_SLUG,
    title: "Contact + Locations | The Body Method",
    description:
        "Get in touch with The Body Method and find our Tugun Beach and Cornerstone studios on the Gold Coast.",
    content: {
        hero: {
            heading: "Contact + Locations",
            lines: [],
            image: "/images/tbm-placeholders/landscape-life-walk.jpg",
            imageAlt:
                "Women walking along the water at sunrise on a wide quiet beach",
            imageFocus: "center 55%",
        },
        studios: [
            {
                id: "tugun-beach",
                name: "TUGUN BEACH",
                image: "/images/tbm-placeholders/studio-tugun-reformer.jpg",
                imageAlt: "Feet pressing the footbar of a timber Reformer",
                imageFocus: "center 45%",
                address: "3/5 Toolona Street, Tugun QLD 4224",
                intro: "Our Reformer Pilates studio, just moments from the beach.",
                mapHref: TUGUN_MAP,
                blocks: [
                    {
                        id: "getting-here",
                        label: "Getting here",
                        body: "",
                        ctaLabel: "GET DIRECTIONS",
                        ctaHref: TUGUN_MAP,
                        ctaTheme: "outline",
                    },
                    {
                        id: "parking",
                        label: "Parking",
                        body: "There is street parking all along the front of the studio, there is also a beach parking area at the end of the street. Please make sure you allow 10-15 minutes for parking at peak periods on weekends etc.",
                        ctaLabel: "",
                        ctaHref: "",
                        ctaTheme: "outline",
                    },
                    {
                        id: "opening",
                        label: "Opening + bookings",
                        body: "Classes run throughout the week. As class times vary, check the live timetable and book your spot before you arrive. If it’s your first visit, we recommend arriving 10-15 minutes early so we can show you around and get you settled.",
                        ctaLabel: "",
                        ctaHref: "",
                        ctaTheme: "outline",
                    },
                    {
                        id: "contact",
                        label: "Contact:",
                        body: PHONE_BLOCK,
                        ctaLabel: "",
                        ctaHref: "",
                        ctaTheme: "outline",
                    },
                ],
            },
            {
                id: "cornerstone",
                name: "CORNERSTONE",
                image: "/images/tbm-placeholders/studio-cornerstone-meditation.jpg",
                imageAlt: "Seated meditation facing windows full of trees",
                imageFocus: "center",
                address:
                    "Upstairs, Level 1, Cornerstone Stores, Shop 8, 570 Gold Coast Highway, Tugun QLD 4224",
                intro: "Our light-filled home for Mat Pilates, Barre, Yoga, Yin, Meditation and more.",
                mapHref: CORNERSTONE_MAP,
                blocks: [
                    {
                        id: "getting-here",
                        label: "Getting here",
                        body: "",
                        ctaLabel: "GET DIRECTIONS",
                        ctaHref: CORNERSTONE_MAP,
                        ctaTheme: "outline",
                    },
                    {
                        id: "parking",
                        label: "Parking",
                        body: "There is street parking along the Gold Coast highway and surrounding streets and also limited parking in the Cornerstone carpark. Please make sure you allow 10-15 minutes for parking times during peak periods on weekends etc.",
                        ctaLabel: "",
                        ctaHref: "",
                        ctaTheme: "outline",
                    },
                    {
                        id: "opening",
                        label: "Opening + bookings",
                        body: "Classes run throughout the week. Check the live timetable and book your spot before you arrive. If it’s your first visit, come 10 minutes early so you have plenty of time to settle in before class.",
                        ctaLabel: "VIEW CORNERSTONE TIMETABLE",
                        ctaHref: BOOKING_URL,
                        ctaTheme: "solid",
                    },
                    {
                        id: "contact",
                        label: "Contact",
                        body: PHONE_BLOCK,
                        ctaLabel: "",
                        ctaHref: "",
                        ctaTheme: "outline",
                    },
                ],
            },
        ],
        form: {
            heading: "General enquiries",
            nameLabel: "Name",
            emailLabel: "Email",
            messageLabel: "Message",
            submitLabel: "SEND MESSAGE",
            action: "#",
        },
    },
};
