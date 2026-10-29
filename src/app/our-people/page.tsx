/* ************************************************************
   /our-people — The teachers.

   Faithful conversion of design/our-people.html.
   Server component. Motion via Reveal (cascading hero copy)
   and Stagger (teacher list wave).
************************************************************ */

import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
    title: "Our People | The Body Method",
    description:
        "The people behind the way you move. Meet the teachers who make The Body Method.",
};

/* ------------------------------------------------------------
   Teacher data. Each field is label + optional blocks (paragraphs
   or unordered lists). Keeps the long teacher list legible.
   ------------------------------------------------------------ */

type TeacherFieldBlock =
    | { type: "p"; text: string }
    | { type: "ul"; items: string[] };

type TeacherField = {
    label?: string;
    blocks?: TeacherFieldBlock[];
};

type Teacher = {
    name: string;
    image: string;
    imageAlt: string;
    cta?: { href: string; label: string };
    fields: TeacherField[];
};

const teachers: Teacher[] = [
    {
        name: "Mel Kitchen",
        image: "/images/tbm-placeholders/teacher-1.jpg",
        imageAlt: "A teacher's hands guiding a student's hips",
        cta: { href: "#momence-teacher", label: "FIND A CLASS WITH MEL" },
        fields: [
            { label: "Discipline / qualifications" },
            { label: "Short teaching philosophy" },
            { label: "What they want people to experience" },
            { label: "Personal detail" },
            { label: "Studio + classes" },
        ],
    },
    {
        name: "Susie Tagarro",
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

/* ------------------------------------------------------------
   Small renderer for a teacher field's label + body blocks.
   ------------------------------------------------------------ */

function FieldBlocks({ blocks }: { blocks?: TeacherFieldBlock[] }) {
    if (!blocks) return null;
    return (
        <>
            {blocks.map((b, i) =>
                b.type === "p" ? (
                    <p
                        key={i}
                        style={{
                            margin: 0,
                            fontSize: 16,
                            lineHeight: 1.8,
                            color: "var(--tbm-text-body)",
                        }}
                    >
                        {b.text}
                    </p>
                ) : (
                    <ul
                        key={i}
                        style={{
                            listStyle: "none",
                            margin: 0,
                            padding: 0,
                            fontSize: 16,
                            lineHeight: 1.8,
                            color: "var(--tbm-text-body)",
                        }}
                    >
                        {b.items.map((it, j) => (
                            <li key={j}>{it}</li>
                        ))}
                    </ul>
                ),
            )}
        </>
    );
}

export default function OurPeoplePage() {
    return (
        <div
            style={{
                background: "var(--tbm-cream)",
                color: "var(--tbm-ink)",
                fontFamily: "var(--font-lora)",
            }}
        >
            {/* ============ HERO ============ */}
            <section
                style={{
                    position: "relative",
                    minHeight: 760,
                    marginTop: -85,
                    paddingTop: 85,
                    color: "#f4f2ed",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/tbm-placeholders/hero-people.jpg"
                    alt="A small group walking along a beach path carrying yoga mats"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center 55%",
                    }}
                />
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(90deg, rgba(0,0,0,.62) 0%, rgba(0,0,0,.34) 45%, rgba(0,0,0,0) 78%), linear-gradient(180deg, rgba(0,0,0,.32) 0%, rgba(0,0,0,.08) 30%, rgba(0,0,0,.5) 62%, rgba(0,0,0,.85) 100%)",
                    }}
                />
                <div
                    className="tbm-wrap tbm-g12"
                    style={{
                        position: "relative",
                        marginTop: "auto",
                        paddingBottom: 75,
                    }}
                >
                    <div
                        className="tbm-c-l7"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 24,
                        }}
                    >
                        <Reveal amount={0.3}>
                            <h1
                                style={{
                                    textShadow: "0 1px 24px rgba(0,0,0,.25)",
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: "clamp(42px, 5.4vw, 80px)",
                                    lineHeight: 1.04,
                                    letterSpacing: "-.015em",
                                    textWrap: "balance",
                                }}
                            >
                                The people behind the way you move.
                            </h1>
                        </Reveal>
                        <Reveal delay={0.15} amount={0.3}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 17,
                                    lineHeight: 1.6,
                                    maxWidth: "34em",
                                    color: "#ece9e2",
                                }}
                            >
                                Technique and experience matters, but great teaching also requires something harder to put on a certificate:{" "}
                                <strong style={{ fontWeight: 500, color: "#f4f2ed" }}>
                                    the ability to see the person in front of you.
                                </strong>
                            </p>
                        </Reveal>
                        <Reveal delay={0.3} amount={0.3}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 17,
                                    lineHeight: 1.6,
                                    maxWidth: "34em",
                                    color: "#ece9e2",
                                }}
                            >
                                That&apos;s what we look for in our people.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ SARAH - OWNER + DIRECTOR ============ */}
            <section style={{ paddingTop: 75, paddingBottom: 75 }}>
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48, alignItems: "start" }}
                >
                    <Reveal
                        amount={0.2}
                        className="tbm-c-l5"
                        style={{ position: "relative" }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/tbm-placeholders/portrait-sarah.jpg"
                            alt="Sarah standing beside a timber Reformer, hand on the footbar"
                            style={{
                                width: "100%",
                                aspectRatio: "4 / 5",
                                objectFit: "cover",
                            }}
                        />
                    </Reveal>
                    <div
                        className="tbm-c-r"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 18,
                        }}
                    >
                        <Reveal amount={0.3}>
                            <h2
                                style={{
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: "clamp(36px, 4vw, 56px)",
                                    lineHeight: 1.1,
                                    letterSpacing: "-.01em",
                                }}
                            >
                                SARAH - OWNER + DIRECTOR
                            </h2>
                        </Reveal>
                        <Reveal delay={0.15} amount={0.2}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 18,
                                }}
                            >
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 18,
                                        lineHeight: 1.7,
                                        color: "var(--tbm-text-body)",
                                    }}
                                >
                                    For Sarah, movement has always been personal. Having lived with chronic pain since childhood, discovering Pilates changed not only how she moved and felt in her own body, but ultimately the direction of her life.
                                </p>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 18,
                                        lineHeight: 1.7,
                                        color: "var(--tbm-text-body)",
                                    }}
                                >
                                    What began as a way to manage pain became a lifelong fascination with the human body, its extraordinary capacity to adapt, and the connection between physical movement and emotional wellbeing. More than 17 years of teaching, studying and working with people of all ages and abilities has shaped her approach to movement and the way she leads The Body Method today.
                                </p>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 18,
                                        lineHeight: 1.7,
                                        color: "var(--tbm-text-body)",
                                    }}
                                >
                                    Since taking ownership of The Body Method, Sarah has continued to grow and evolve the business with an unwavering commitment to exceptional teaching, the highest calibre of instructors and a philosophy that guides everything she does:{" "}
                                    <strong style={{ fontWeight: 500, color: "var(--tbm-ink)" }}>
                                        great movement starts with genuinely caring for the person in front of you.
                                    </strong>
                                </p>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 18,
                                        lineHeight: 1.7,
                                        color: "var(--tbm-text-body)",
                                    }}
                                >
                                    That commitment shapes the experience at The Body Method. From the expertise and intuition of its teachers to the personal attention given in every class, Sarah believes that truly understanding the individual is what makes great teaching extraordinary. Whether someone is navigating pain, rebuilding confidence or developing strength, her goal is for every person to feel understood, supported and empowered to discover what their body is capable of.
                                </p>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 18,
                                        lineHeight: 1.7,
                                        color: "var(--tbm-text-body)",
                                    }}
                                >
                                    But her <em>why</em> goes much further than what happens inside the studio.
                                </p>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 18,
                                        lineHeight: 1.7,
                                        color: "var(--tbm-text-body)",
                                    }}
                                >
                                    Sarah believes that when you help someone move better, become stronger and improve their physical, mental or emotional wellbeing, you&apos;re also changing what&apos;s possible in the rest of their life. They have more capacity to care for themselves, show up for the people they love and contribute to the communities around them.
                                </p>
                            </div>
                        </Reveal>
                        <Reveal delay={0.3} amount={0.3}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 24,
                                    lineHeight: 1.4,
                                    fontStyle: "italic",
                                    color: "var(--tbm-green-accent)",
                                    borderTop: "1px solid var(--tbm-rule)",
                                    borderBottom: "1px solid var(--tbm-rule)",
                                    padding: "24px 0",
                                }}
                            >
                                That ripple effect is what drives Sarah&apos;s vision for The Body Method. A place where exceptional teaching meets genuine care, where movement makes everyday life better, and where the benefits extend far beyond the studio walls.
                            </p>
                        </Reveal>
                        <Reveal delay={0.45} amount={0.3}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-body)",
                                }}
                            >
                                For Sarah, leading The Body Method is about much more than running two movement studios. It&apos;s about making a meaningful contribution to the community, one person at a time.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ MEET OUR TEACHERS ============ */}
            <section
                style={{
                    background: "var(--tbm-sand)",
                    paddingTop: 75,
                    paddingBottom: 75,
                }}
            >
                <div className="tbm-wrap tbm-g12" style={{ rowGap: 48 }}>
                    <Reveal amount={0.4} className="tbm-c-all">
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 400,
                                fontSize: "clamp(36px, 4vw, 56px)",
                                lineHeight: 1.1,
                                letterSpacing: "-.01em",
                            }}
                        >
                            MEET OUR TEACHERS
                        </h2>
                    </Reveal>

                    <Stagger
                        className="tbm-c-all"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0,
                        }}
                        stagger={0.32}
                    >
                        {teachers.map((t) => (
                            <StaggerItem key={t.name}>
                                <article
                                    className="tbm-g12"
                                    style={{
                                        rowGap: 32,
                                        borderTop: "1px solid var(--tbm-rule)",
                                        paddingTop: 64,
                                        paddingBottom: 24,
                                        alignItems: "start",
                                    }}
                                >
                                    <div
                                        className="tbm-c-t"
                                        style={{ position: "relative" }}
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={t.image}
                                            alt={t.imageAlt}
                                            style={{
                                                width: "100%",
                                                aspectRatio: "4 / 5",
                                                objectFit: "cover",
                                                objectPosition: "center",
                                            }}
                                        />
                                    </div>
                                    <div
                                        style={{
                                            gridColumn: "6 / 13",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 32,
                                        }}
                                    >
                                        <h3
                                            style={{
                                                margin: 0,
                                                fontWeight: 400,
                                                fontSize: "clamp(30px, 3vw, 40px)",
                                                lineHeight: 1.1,
                                            }}
                                        >
                                            {t.name}
                                        </h3>
                                        <div
                                            style={{
                                                columns: "2 300px",
                                                columnGap: 56,
                                                maxWidth: 840,
                                            }}
                                        >
                                            {t.fields.map((f, i) => (
                                                <div
                                                    key={i}
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: 10,
                                                        breakInside: "avoid",
                                                        paddingBottom: 32,
                                                    }}
                                                >
                                                    {f.label ? (
                                                        <h4
                                                            className="tbm-lbl"
                                                            style={{
                                                                margin: 0,
                                                                color: "var(--tbm-bronze-label)",
                                                            }}
                                                        >
                                                            {f.label}
                                                        </h4>
                                                    ) : null}
                                                    <FieldBlocks blocks={f.blocks} />
                                                </div>
                                            ))}
                                        </div>
                                        {t.cta ? (
                                            <div style={{ paddingTop: 4 }}>
                                                <a
                                                    className="tbm-btn"
                                                    href={t.cta.href}
                                                    style={{
                                                        background: "var(--tbm-ink)",
                                                        color: "var(--tbm-cream)",
                                                    }}
                                                >
                                                    {t.cta.label}
                                                </a>
                                            </div>
                                        ) : null}
                                    </div>
                                </article>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>
        </div>
    );
}
