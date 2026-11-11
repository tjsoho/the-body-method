/* ************************************************************
                        NOTES
   The teaching roster.

   Lifted out of /our-people so the home carousel and the Our
   People carousel read from one list: one photo, one spelling of
   a name, one bio. Destined for the `team` Supabase table once
   the admin form lands, which is why the shape is already flat.

   `slug` is the anchor each card links to (/our-people#mel-kitchen)
   and the key the Our People carousel opens a profile from.
   `role` and `teaser` are the condensed card copy, taken from
   that teacher's own words in `fields` below.
************************************************************ */

/* ************************************************************
                        TYPES
************************************************************ */
export type TeacherFieldBlock =
    | { type: "p"; text: string }
    | { type: "ul"; items: string[] };

export type TeacherField = {
    label?: string;
    blocks?: TeacherFieldBlock[];
};

export type Teacher = {
    name: string;
    /** Anchor id, e.g. "mel-kitchen". */
    slug: string;
    /** One-line discipline summary for the carousel card. */
    role?: string;
    /** One sentence from this teacher's own copy, for the card. */
    teaser?: string;
    image: string;
    imageAlt: string;
    cta?: { href: string; label: string };
    fields: TeacherField[];
};

/* ************************************************************
                        DATA
************************************************************ */
export const teachers: Teacher[] = [
    {
        // PLACEHOLDER. Lorem ipsum stands in until Mel's real copy
        // arrives — swap the strings, leave the shape alone.
        name: "Mel Kitchen",
        slug: "mel-kitchen",
        role: "Lorem ipsum dolor sit amet",
        teaser:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        image: "/images/tbm-placeholders/teacher-1.jpg",
        imageAlt: "A teacher's hands guiding a student's hips",
        cta: { href: "#momence-teacher", label: "FIND A CLASS WITH MEL" },
        fields: [
            {
                label: "Discipline / qualifications",
                blocks: [
                    {
                        type: "ul",
                        items: [
                            "Lorem ipsum dolor sit amet",
                            "Consectetur adipiscing elit",
                            "Sed do eiusmod tempor incididunt",
                        ],
                    },
                ],
            },
            {
                label: "Short teaching philosophy",
                blocks: [
                    {
                        type: "p",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    },
                ],
            },
            {
                label: "What they want people to experience",
                blocks: [
                    {
                        type: "p",
                        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    },
                ],
            },
            {
                label: "Personal detail",
                blocks: [
                    {
                        type: "p",
                        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
                    },
                ],
            },
            {
                label: "Studio + classes",
                blocks: [
                    { type: "p", text: "Lorem ipsum studio" },
                    {
                        type: "ul",
                        items: [
                            "Lorem ipsum, 6am - Dolor sit amet",
                            "Consectetur, 9.15am - Adipiscing elit",
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: "Susie Tagarro",
        slug: "susie-tagarro",
        role: "Vinyasa / flow yoga",
        teaser:
            "Students describe her classes as “healing sessions for the soul”.",
        image: "/images/tbm-placeholders/portrait-t9.jpg",
        imageAlt: "Hands holding a singing bowl in a lap",
        fields: [
            {
                label: "Discipline:",
                blocks: [{ type: "p", text: "Vinyasa / flow yoga." }],
            },
            {
                label: "Qualifications:",
                blocks: [
                    {
                        type: "p",
                        text: "yoga, Pilates, barre, yin, yoga philosophy, myofascial roll & release, pranayama & meditation.",
                    },
                ],
            },
            {
                blocks: [
                    {
                        type: "p",
                        text: "With a focus on meditation, breath, and energy, Susie teaches intentional, slow, vinyasa-style sequences that will guide you out of your head and into your body. You’ll leave her classes feeling relaxed, refreshed, rejuvenated, and deeply present. Students describe her classes as “healing sessions for the soul”.",
                    },
                ],
            },
            {
                label: "Classes:",
                blocks: [{ type: "p", text: "Cornerstone, Wednesday 4.15pm" }],
            },
            {
                label: "Pre/post natal:",
                blocks: [{ type: "p", text: "no special cert" }],
            },
        ],
    },
    {
        name: "Valeria Naimey",
        slug: "valeria-naimey",
        role: "Yin, Meditation + Yoga",
        teaser:
            "I want students to leave my classes feeling grounded, relaxed and more connected to themselves.",
        image: "/images/tbm-placeholders/portrait-t5.jpg",
        imageAlt: "A teacher seated cross-legged with hands in her lap",
        fields: [
            {
                label: "Discipline / qualifications",
                blocks: [
                    { type: "p", text: "I completed:" },
                    {
                        type: "ul",
                        items: [
                            "Yoga Course 200h - Guatemala",
                            "300 YTT - Bali",
                            "Certificate IV of Purna Yoga (800h) - Byron Bay",
                            "Meditation Biyome (55h) - Brisbane",
                            "Yin teacher training 50h",
                        ],
                    },
                    { type: "p", text: "And over 10 years of my own practice." },
                ],
            },
            {
                label: "Short teaching philosophy",
                blocks: [
                    {
                        type: "p",
                        text: "My teaching is rooted in the belief that yoga is an invitation to slow down, reconnect with ourselves and find balance in a fast paced world. I love creating intentional, nurturing spaces where movement becomes a form of self-care, stillness becomes a practice of listening and we learn to meet ourselves with kindness.",
                    },
                ],
            },
            {
                label: "What I want people to experience",
                blocks: [
                    {
                        type: "p",
                        text: "I want students to leave my classes feeling grounded, relaxed and more connected to themselves. My intention is to create a safe and welcoming space where they can release tension, quiet the mind, soften into the present moment and reconnect with their natural rhythm. Through Traditional Yoga, Yin Yoga and Meditation, I invite students to embrace stillness, cultivate self-love and discover the beauty of simply being.",
                    },
                ],
            },
            {
                label: "Personal detail",
                blocks: [
                    {
                        type: "p",
                        text: "Originally from Spain, I feel most at home in nature, especially by the ocean. I’m passionate about conscious living, photography, holistic wellbeing and the little moments that remind us to slow down and appreciate life. My own practice has taught me the importance of finding space to pause, listen and reconnect and I love bringing that same intention into the spaces I create for others.",
                    },
                ],
            },
            {
                label: "Studio + classes",
                blocks: [
                    {
                        type: "p",
                        text: "The Body Method - Yin & Meditation, with a focus on mindful stillness, gentle stretching, nervous system relaxation and inner connection, often complemented by sound healing and aromatherapy.",
                    },
                ],
            },
            {
                label: "Pre/postnatal certification",
                blocks: [
                    {
                        type: "p",
                        text: "I do not currently hold a specific pre/postnatal certification. However, pregnancy and prenatal yoga were covered as part of my Certificate IV in Yoga, as well as during my 200-hour and 300-hour yoga teacher training, giving me a foundation in adapting yoga practices to support students during pregnancy.",
                    },
                ],
            },
        ],
    },
    {
        name: "Tallis Jarrah",
        slug: "tallis-jarrah",
        role: "Mat Pilates, Barre + Reformer",
        teaser:
            "Creative flows, functional strength and plenty of variety, finding the balance between challenge and ease.",
        image: "/images/tbm-placeholders/portrait-t10.jpg",
        imageAlt: "A woman carrying a surfboard down a beach at sunrise",
        fields: [
            {
                label: "Qualifications:",
                blocks: [
                    { type: "p", text: "Certified in Mat Pilates, Barre and Reformer." },
                ],
            },
            {
                label: "Teaching Philosophy:",
                blocks: [
                    {
                        type: "p",
                        text: "My teaching style is always evolving with new inspirations and changing seasons, but I believe in moving with purpose, honouring what your body needs and appreciating the process, not just the progress.",
                    },
                ],
            },
            {
                label: "What to Expect:",
                blocks: [
                    {
                        type: "p",
                        text: "Creative flows, functional strength and plenty of variety, finding the balance between challenge and ease.",
                    },
                ],
            },
            {
                label: "A Little About Me:",
                blocks: [
                    {
                        type: "p",
                        text: "Happiest little Vegemite by the ocean, soaking up the sunshine or making a questionable mess in the kitchen. Exploring my yoga practice and wondering if teacher training is next, or if I’ll keep that magic just for me.",
                    },
                ],
            },
            {
                label: "Classes:",
                blocks: [
                    { type: "p", text: "Cornerstone on Mondays at 4:15 pm, Mat Express." },
                ],
            },
            {
                label: "Pre/post natal:",
                blocks: [{ type: "p", text: "no specific cert" }],
            },
        ],
    },
    {
        name: "Iveta Harris",
        slug: "iveta-harris",
        role: "Vinyasa, Barre, Power Pilates + Yin",
        teaser:
            "My teaching brings together movement, breath and an understanding of the mind and nervous system.",
        image: "/images/tbm-placeholders/portrait-t7.jpg",
        imageAlt:
            "A teacher standing at the front of a calm studio facing the windows",
        fields: [
            {
                label: "Discipline / qualifications",
                blocks: [
                    {
                        type: "p",
                        text: "E-RYT® 500 with 10 years of teaching experience, Diploma in Sport and Recreation, Pilates & Barre training, Currently completing a PhD in Cognitive Neuroscience at Bond University.",
                    },
                ],
            },
            {
                label: "Short teaching philosophy",
                blocks: [
                    {
                        type: "p",
                        text: "My teaching brings together movement, breath and an understanding of the mind and nervous system. I encourage people to practise with curiosity, listening and cultivating awareness.",
                    },
                ],
            },
            {
                label: "What do you want people to experience",
                blocks: [
                    {
                        type: "p",
                        text: "My aim is to create a safe space where people can celebrate their uniqueness and work on areas they find challenging, leaving each class feeling stronger, calmer and more grounded.",
                    },
                ],
            },
            {
                label: "Personal detail",
                blocks: [
                    {
                        type: "p",
                        text: "Outside teaching and research, I love surfing and spending time with my family.",
                    },
                ],
            },
            {
                label: "Studio + classes",
                blocks: [
                    {
                        type: "p",
                        text: "Cornerstone - vinyasa, slow flow, barre, power pilates, breathwork, yin and meditation",
                    },
                ],
            },
        ],
    },
    {
        name: "Miki Takumiya",
        slug: "miki-takumiya",
        role: "Reformer Pilates",
        teaser:
            "I want clients to leave each session feeling stronger, lighter, and more connected to themselves.",
        image: "/images/tbm-placeholders/teacher-2.jpg",
        imageAlt: "Plank on the Reformer carriage",
        fields: [
            {
                label: "Discipline / Qualifications",
                blocks: [
                    {
                        type: "ul",
                        items: [
                            "Balanced Body Comprehensive Certified",
                            "Scoliosis Pilates",
                            "Pre Postnatal Pilates",
                        ],
                    },
                ],
            },
            {
                label: "Short Teaching Philosophy",
                blocks: [
                    {
                        type: "p",
                        text: "My teaching focuses on mindful, natural movement that builds strength, mobility, and body awareness. I believe Pilates is not about pushing your body to its limits, but about understanding your body, moving with greater ease, and finding balance through movement and breath. I aim to provide individualized guidance that supports each client's needs and abilities.",
                    },
                ],
            },
            {
                label: "What You Want People to Experience",
                blocks: [
                    {
                        type: "p",
                        text: "I want clients to leave each session feeling stronger, lighter, and more connected to themselves, both physically and mentally. My goal is to create a supportive space where people can move with confidence, feel comfortable in their bodies, and develop sustainable strength that carries into everyday life.",
                    },
                ],
            },
            {
                label: "Personal Detail",
                blocks: [
                    {
                        type: "p",
                        text: "With a background in swimming and water skiing, I first discovered Pilates in Japan. Living with scoliosis myself, I have experienced how Pilates can help improve body awareness, balance, and the way we move through daily life. My own journey has shaped my passion for helping others find movement that feels supportive, natural, and right for their bodies.",
                    },
                    {
                        type: "p",
                        text: "Outside the studio, you'll often find me surfing, spending time by the ocean, or enjoying nature.",
                    },
                ],
            },
            {
                label: "Studio + Classes",
                blocks: [
                    { type: "p", text: "Tugun Studio Reformer Classes" },
                    {
                        type: "ul",
                        items: [
                            "Fridays 3pm Group class",
                            "Saturdays 6:45, 8:00, 9:15am Group classes, 10:30am Semi private class",
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: "Chanel Korhonen",
        slug: "chanel-korhonen",
        role: "Mat + Reformer Pilates, Yoga, Breathwork",
        teaser:
            "I want people to leave class feeling stronger, more present and a little more at home in their bodies.",
        image: "/images/tbm-placeholders/portrait-t6.jpg",
        imageAlt: "A teacher's hands holding a Reformer strap",
        fields: [
            {
                label: "Discipline / qualifications",
                blocks: [
                    {
                        type: "p",
                        text: "Mat Pilates, Reformer Pilates, yoga teacher, certified breathwork practitioner, sound healer and Zen Thai Shiatsu Level 1 practitioner.",
                    },
                ],
            },
            {
                label: "Short teaching philosophy",
                blocks: [
                    {
                        type: "p",
                        text: "After spending much of my early career in the corporate legal world, I came to understand how easy it is to become disconnected from ourselves when we spend so much time in our heads. Movement became a way back to myself, and that experience continues to shape how I teach.",
                    },
                    {
                        type: "p",
                        text: "I believe movement is about more than what our bodies can do. It’s an opportunity to slow down, develop a deeper awareness of ourselves and reconnect with how we feel, rather than how much we can achieve. My approach blends intelligent, intentional sequencing with somatic awareness, breath and nervous system regulation, creating practices that make space for both strength and softness, on and off the mat.",
                    },
                ],
            },
            {
                label: "What I want people to experience",
                blocks: [
                    {
                        type: "p",
                        text: "I want people to leave class feeling stronger, more present and a little more at home in their bodies. I hope to create an environment where people feel comfortable meeting themselves where they are, exploring what they’re capable of, with curiosity over judgment and discovering that movement can be both challenging and deeply restorative.",
                    },
                ],
            },
            {
                label: "Personal detail",
                blocks: [
                    {
                        type: "p",
                        text: "Outside the studio, I’m usually chasing a sunrise, rolling out my yoga mat, searching for my next waterfall hike or getting lost in a good book. I’m endlessly curious about the ways we move through the world, both physically and emotionally, and love sharing that curiosity through my classes and by mentoring emerging instructors as they find their own voice in the industry.",
                    },
                ],
            },
            {
                label: "Pre/post natal cert:",
                blocks: [{ type: "p", text: "no specific cert" }],
            },
        ],
    },
    {
        name: "Victoria Richter",
        slug: "victoria-richter",
        role: "Pilates, Barre, Stretch + Breathwork",
        teaser:
            "I want people to leave my classes feeling more connected to themselves, stronger in their bodies and calmer in their minds.",
        image: "/images/tbm-placeholders/portrait-t8.jpg",
        imageAlt: "Legs in a releve beside a timber barre",
        fields: [
            {
                label: "Discipline / Qualifications",
                blocks: [
                    {
                        type: "p",
                        text: "Pilates, Barre, Stretch & Breathwork Facilitator, with a dance background.",
                    },
                ],
            },
            {
                label: "Short Teaching Philosophy",
                blocks: [
                    {
                        type: "p",
                        text: "I believe movement is about learning to listen to your body and discovering what it needs in each moment. Sometimes that means slowing down, finding stillness and grounding yourself; other times, it means building strength, challenging your limits and getting your energy flowing. My classes create space for both — from powerful Pilates and Barre to slow, mindful movement and deep release.",
                    },
                ],
            },
            {
                label: "What I Want People to Experience",
                blocks: [
                    {
                        type: "p",
                        text: "I want people to leave my classes feeling more connected to themselves, stronger in their bodies and calmer in their minds. Whether they come to sweat, release tension or simply take a moment for themselves, I hope they leave feeling good in their own skin.",
                    },
                ],
            },
            {
                label: "Personal Detail",
                blocks: [
                    {
                        type: "p",
                        text: "Originally from Germany, I followed my love for movement and a more intentional way of living to the Australian coast. Alongside teaching, I founded SYSTR, an activewear brand born from my own experience as a movement teacher and my desire to feel comfortable, confident and supported in everything I do. I create timeless, long-lasting pieces designed to move with you, with colours and designs inspired by the ocean, nature and my new home on the Australian coast.",
                    },
                    {
                        type: "p",
                        text: "You’ll usually find me in the ocean, surfing. On my free weekends, I love heading out camping, disconnecting from my phone and reception, chasing good waves and spending quality time with friends. I’m happiest outdoors, surrounded by nature and the simple things in life.",
                    },
                ],
            },
            {
                label: "Studio + Classes",
                blocks: [
                    {
                        type: "p",
                        text: "I currently teach at the Cornerstone studio, offering Mat Pilates, Power Pilates, Barre and Stretch classes. My sessions range from energising, strength-focused workouts to slower, grounding practices that invite you to reconnect with your body and breath. I also started teaching Intro to Ballet Workshops, creating a welcoming space for adults to reconnect with dance, explore ballet fundamentals and experience the joy of movement, regardless of their previous dance experience.",
                    },
                ],
            },
        ],
    },
    {
        name: "Phoebe Paton",
        slug: "phoebe-paton",
        role: "Mat Pilates + Yoga",
        teaser:
            "The mat is a place where you can arrive and can give back to yourself in a positive and loving way.",
        image: "/images/tbm-placeholders/teacher-3.jpg",
        imageAlt: "Garland squat on a sage mat by the windows",
        fields: [
            {
                label: "Discipline / qualifications",
                blocks: [
                    {
                        type: "ul",
                        items: ["100hr Mat Pilates", "200hr Yoga Teacher Training"],
                    },
                ],
            },
            {
                label: "Short teaching philosophy",
                blocks: [
                    {
                        type: "p",
                        text: "To help guide people through movement as a way to feel empowered, more connected and at home in their body and energy. The mat is a place where you can arrive and can give back to yourself in a positive and loving way.",
                    },
                ],
            },
            {
                label: "What you want people to experience",
                blocks: [
                    {
                        type: "p",
                        text: "I want people to experience Yoga and Pilates as a mindful practice that allows them to step out of the rush of everyday life and give themselves the time to focus on feeling into our bodies, move with the breath and create space to be present with ourselves. People will feel challenged yet empowered by what they’re capable of and leave the mat feeling grounded yet energised!",
                    },
                ],
            },
            {
                label: "Personal detail",
                blocks: [
                    {
                        type: "p",
                        text: "Outside of teaching I enjoy spending time in nature, walks along the beach with a coffee, studying Kinesiology and getting into my own practice when I can!",
                    },
                ],
            },
            {
                label: "Studio + classes",
                blocks: [
                    { type: "p", text: "Cornerstone" },
                    {
                        type: "ul",
                        items: [
                            "Tuesday",
                            "5am - Barre",
                            "6am - Power Pilates",
                            "7am - Slow Flow Yoga",
                        ],
                    },
                    { type: "ul", items: ["Sunday", "4:30pm - Yin Yoga"] },
                ],
            },
        ],
    },
    {
        name: "Kassie Redmond",
        slug: "kassie-redmond",
        role: "STOTT Pilates: Mat, Barre + Reformer",
        teaser:
            "My philosophy is centered around moving with intention, precision and control.",
        image: "/images/tbm-placeholders/teacher-4.jpg",
        imageAlt: "Legs in Reformer straps",
        fields: [
            {
                label: "Discipline / qualifications",
                blocks: [
                    {
                        type: "p",
                        text: "STOTT Pilates Mat, Barre, Reformer, Cadillac Chair & Barrels, Injuries and Special Populations. I've also completed numerous workshops on athletic conditioning, jumpboard, rotational discs etc",
                    },
                ],
            },
            {
                label: "Teaching Philosophy",
                blocks: [
                    {
                        type: "p",
                        text: "My philosophy is centered around moving with intention, precision and control. I believe the bigger movements aren't always better. Sometimes, the smallest movements are the ones that create the greatest impact. Every movement has a purpose and focusing on the deeper muscle groups, proper technique to build a strong foundation are just as important as the bigger movements. My goal is for every client to leave feeling stronger, more confident, and accomplished, while building a deeper understanding of their body and how it moves.",
                    },
                ],
            },
            {
                label: "What you want people to experience",
                blocks: [
                    {
                        type: "p",
                        text: "My goal is for every client to leave feeling stronger, more confident, and accomplished, while building a deeper understanding of their body and how it moves. I want every session to be challenging, rewarding, and most importantly enjoyable.",
                    },
                ],
            },
            {
                label: "Personal Detail",
                blocks: [
                    {
                        type: "p",
                        text: "I grew up dancing and first discovered Pilates as a way to complement my dance training, little did I know I would fall in love with the movement and make it my career. After travelling overseas performing, I found my way back to Pilates and feel so lucky that I get to share my passion with others every day.",
                    },
                    {
                        type: "p",
                        text: "Outside the studio, I'm a mum of two busy, sporty kids. If I'm not teaching pilates, you'll normally find us enjoying the beach or me in the car driving them from one activity to the next.",
                    },
                ],
            },
            {
                label: "Studio + Classes",
                blocks: [
                    { type: "p", text: "Tugun Tues, Thurs & Friday mornings." },
                ],
            },
        ],
    },
];

/* ************************************************************
                        CMS PAGE ROW
   The roster is shared by the home strip and /our-people, so it
   lives in its own `pages` row under the slug below rather than
   inside either page's content. One row, one source of truth, no
   drift between the two carousels.

   The home editor writes the card-facing fields (photo, name,
   role, teaser, link). A teacher's long-form `fields` ride along
   on save untouched, so they are ready for the Our People editor
   to pick up without a migration.
************************************************************ */

export const TEACHERS_SLUG = "teachers";

export type TeachersContent = { teachers: Teacher[] };

export const teachersPageFallbackData = {
    slug: TEACHERS_SLUG,
    title: "Our teachers",
    description: "The teaching roster, shared by the home page and /our-people.",
    content: { teachers },
};
