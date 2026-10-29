/* ************************************************************
   TBM — Tugun Beach studio page.

   Hero + centred intro + two feature portrait sections +
   Private Pilates forest band + teacher row + FAQ + CTA band.
   Mirrors design/tugun-beach.html from the v2 handoff.
************************************************************ */

import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
    title: "Reformer Pilates Tugun | The Body Method - Tugun Beach Studio",
    description:
        "Boutique Reformer Pilates in Tugun. Maximum six people per class so our teachers can really teach, with Private Pilates available too.",
};

/* Each teacher card is a CMS placeholder — three card portraits with
   skeleton name + line beneath. Keep the exact image + alt mapping. */
const TEACHERS = [
    {
        src: "/images/tbm-placeholders/teacher-1.jpg",
        alt: "A teacher's hands guiding a student's hips",
    },
    {
        src: "/images/tbm-placeholders/teacher-2.jpg",
        alt: "Plank on the Reformer carriage",
    },
    {
        src: "/images/tbm-placeholders/teacher-4.jpg",
        alt: "Legs in Reformer straps",
    },
] as const;

type Faq = { q: string; a: React.ReactNode; open?: boolean };

const FAQS: Faq[] = [
    {
        q: "Is Reformer Pilates suitable for beginners?",
        a: "Absolutely. Reformer Pilates is suitable for all experience and fitness levels, including complete beginners. Our instructors will guide you through the movements, help you get comfortable with the Reformer and offer modifications so you can work at a pace that feels right for your body.",
        open: true,
    },
    {
        q: "Do I need to be fit or really flexible to do Reformer Pilates?",
        a: "Not at all. Everyone is welcome here. You come to move - you don't need to prove you can move before you arrive. Our teachers will meet you where you are and help you build from there.",
    },
    {
        q: "I'm pregnant - can I do Reformer Pilates at The Body Method?",
        a: "Yes. Reformer Pilates can be a wonderful way to stay strong and supported throughout a healthy pregnancy. At The Body Method, our instructors can modify movements as your body changes, so you can continue moving safely and comfortably. Please let your instructor know that you're pregnant before class, including how far along you are, and speak with your doctor, midwife or healthcare provider before starting or continuing exercise during pregnancy. Every pregnancy is different, so the focus is always on listening to your body and moving in a way that feels right for you.",
    },
    {
        q: "I'm a little nervous about coming for the first time. Is that normal?",
        a: "Very. Walking into any new studio can feel a little daunting when you don't know the room, the teacher or what you're doing yet. Come a little early, introduce yourself and we'll take care of the rest. You'll know your way around in no time.",
    },
    {
        q: "What should I bring to class?",
        a: "Wear something comfortable that you can move easily in and bring a water bottle, a small towel if you wish - we have everything else you need already supplied. Mostly, just bring yourself. We'll let you know if there's anything particular you need for the class you've booked. We ask that everyone leave their phones with their shoes at the front door and not bring them to their mat.",
    },
    {
        q: "Do I need grip socks?",
        a: "For Reformer Pilates at Tugun Beach, yes please. Grip socks help you move safely and comfortably on the equipment. If you've forgotten yours, we have some clean ones you can borrow and also some available for purchase too if needed.",
    },
    {
        q: "I have an injury or something going on with my body, can I still come?",
        a: "Most likely, but please let your teacher know before the class begins. We need to understand what's going on so we can determine whether the class is appropriate and make adjustments where we can safely. Depending on the injury or condition, we may recommend speaking with your healthcare professional first or beginning with a Private Pilates session so we can give you more individual attention.",
    },
    {
        q: "Where is Tugun Beach studio?",
        a: (
            <>
                Our Tugun Beach Reformer Pilates studio is located at{" "}
                <a
                    href="https://share.google/yIpCcBOu7JsYTNe5q"
                    style={{ color: "var(--tbm-forest)" }}
                >
                    3/5 Toolona St, Tugun QLD 4224
                </a>
                , close to Tugun Beach on the southern Gold Coast.
            </>
        ),
    },
    {
        q: "Where do I park for Tugun Beach?",
        a: "There is street parking all along the front of the studio, there is also a beach parking area at the end of the street. Please make sure you allow 10-15 minutes for parking at peak periods on weekends etc.",
    },
];

export default function TugunBeachPage() {
    return (
        <>
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
                    src="/images/tbm-placeholders/hero-tugun.jpg"
                    alt="Hands gripping the footbar of a timber Reformer while a teacher guides the knee"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center 40%",
                    }}
                />
                <div
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
                        style={{
                            gridColumn: "1 / 8",
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
                                Boutique classes and movement made personal.
                            </h1>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.08}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 17,
                                    lineHeight: 1.6,
                                    maxWidth: "34em",
                                    color: "#ece9e2",
                                }}
                            >
                                With just six Reformers, Tugun Beach gives our teachers something valuable: the space to really teach.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ CENTRED INTRO ============ */}
            <section style={{ paddingTop: 75, paddingBottom: 75 }}>
                <div
                    className="tbm-wrap"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        gap: 24,
                    }}
                >
                    <Reveal amount={0.3}>
                        <p
                            style={{
                                margin: 0,
                                fontSize: "clamp(26px, 2.6vw, 36px)",
                                lineHeight: 1.35,
                                maxWidth: "26em",
                                color: "var(--tbm-ink)",
                            }}
                        >
                            To watch how you move. Make adjustments, and help your body to refine your technique and then challenge you appropriately.
                        </p>
                    </Reveal>
                    <Reveal amount={0.3} delay={0.08}>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 21,
                                lineHeight: 1.5,
                                fontStyle: "italic",
                                color: "var(--tbm-green-accent)",
                                maxWidth: "34em",
                            }}
                        >
                            Because personalised movement doesn&rsquo;t have to have a private session every time (but we do offer that too).
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ============ SIX PEOPLE — portrait L, text R ============ */}
            <section
                style={{
                    background: "var(--tbm-sand)",
                    paddingTop: 75,
                    paddingBottom: 75,
                }}
            >
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48, alignItems: "center" }}
                >
                    <Reveal
                        amount={0.2}
                        style={{ gridColumn: "1 / 6", position: "relative" }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/tbm-placeholders/portrait-tugun-six.jpg"
                            alt="A small Reformer studio with one person lying on the carriage"
                            style={{
                                width: "100%",
                                aspectRatio: "4 / 5",
                                objectFit: "cover",
                            }}
                        />
                    </Reveal>
                    <div
                        style={{
                            gridColumn: "7 / 13",
                            display: "flex",
                            flexDirection: "column",
                            gap: 24,
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
                                Six people changes the experience.
                            </h2>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.08}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-body)",
                                }}
                            >
                                You&rsquo;re not one of twenty bodies following instructions from the front of a room.
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.16}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 24,
                                    lineHeight: 1.4,
                                    fontStyle: "italic",
                                    color: "var(--tbm-green-accent)",
                                }}
                            >
                                With a maximum of six, there is room for individual teaching within every class.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ REFORMER AT TBM — text L, portrait R ============ */}
            <section style={{ paddingTop: 75, paddingBottom: 75 }}>
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48, alignItems: "center" }}
                >
                    <div
                        style={{
                            gridColumn: "1 / 7",
                            display: "flex",
                            flexDirection: "column",
                            gap: 24,
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
                                Reformer Pilates at The Body Method
                            </h2>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.08}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-body)",
                                }}
                            >
                                Strength, control, mobility and intelligent progression using the Reformer - taught with the individual attention our small classes allow.
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.16}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-body)",
                                    borderTop: "1px solid var(--tbm-rule)",
                                    paddingTop: 24,
                                }}
                            >
                                <strong
                                    style={{
                                        fontWeight: 500,
                                        color: "var(--tbm-ink)",
                                    }}
                                >
                                    Best for:
                                </strong>{" "}
                                All ages and fitness levels, including pregnancy and postpartum, those returning from injury, or anyone looking for a strong, effective workout that builds core strength and stability.
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.24}>
                            <div style={{ paddingTop: 8 }}>
                                <Link
                                    className="tbm-btn"
                                    href="/classes"
                                    style={{
                                        background: "var(--tbm-ink)",
                                        color: "var(--tbm-cream)",
                                    }}
                                >
                                    VIEW REFORMER TIMES
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                    <Reveal
                        amount={0.2}
                        delay={0.05}
                        style={{ gridColumn: "8 / 13", position: "relative" }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/tbm-placeholders/portrait-tugun-socks.jpg"
                            alt="Feet in grip socks on the carriage of a timber Reformer"
                            style={{
                                width: "100%",
                                aspectRatio: "4 / 5",
                                objectFit: "cover",
                            }}
                        />
                    </Reveal>
                </div>
            </section>

            {/* ============ PRIVATE PILATES — forest band, landscape L, text R ============ */}
            <section
                style={{
                    color: "var(--tbm-cream)",
                    background: "var(--tbm-forest)",
                    paddingTop: 75,
                    paddingBottom: 75,
                }}
            >
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48, alignItems: "center" }}
                >
                    <Reveal
                        amount={0.2}
                        className="tbm-c-l"
                        style={{
                            position: "relative",
                            paddingRight: "clamp(0px, 2vw, 24px)",
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/tbm-placeholders/landscape-tugun-private.jpg"
                            alt="A teacher's hands supporting a client's ankle on a Reformer"
                            style={{
                                width: "100%",
                                aspectRatio: "3 / 2",
                                objectFit: "cover",
                                objectPosition: "center",
                            }}
                        />
                    </Reveal>
                    <div
                        className="tbm-c-r"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 24,
                            paddingLeft: "clamp(0px, 3vw, 48px)",
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
                                Movement that is all about you.
                            </h2>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.08}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-on-dark-body)",
                                }}
                            >
                                Private Pilates gives you the dedicated attention of your own teacher, with movement tailored entirely to your body, goals and needs. Whether you&rsquo;re working on something specific, returning to movement or simply wanting to deepen your practice, it&rsquo;s your time to focus on you.
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.16}>
                            <div style={{ paddingTop: 8 }}>
                                <Link
                                    className="tbm-btn"
                                    href="/private-pilates"
                                    style={{
                                        background: "var(--tbm-cream)",
                                        color: "var(--tbm-forest)",
                                    }}
                                >
                                    EXPLORE PRIVATE PILATES
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ MEET SOME OF THE PEOPLE TEACHING YOU ============ */}
            <section style={{ paddingTop: 75, paddingBottom: 75 }}>
                <div className="tbm-wrap tbm-g12" style={{ rowGap: 48 }}>
                    <Reveal amount={0.3} className="tbm-c-all">
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 400,
                                fontSize: "clamp(36px, 4vw, 56px)",
                                lineHeight: 1.1,
                                letterSpacing: "-.01em",
                            }}
                        >
                            Meet some of the people teaching you:
                        </h2>
                    </Reveal>

                    <Stagger
                        className="tbm-c-all tbm-g12"
                        style={{ rowGap: 48 }}
                        stagger={0.1}
                    >
                        {TEACHERS.map((t) => (
                            <StaggerItem
                                key={t.src}
                                className="tbm-c-t"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 16,
                                }}
                            >
                                <div style={{ position: "relative" }}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={t.src}
                                        alt={t.alt}
                                        style={{
                                            width: "100%",
                                            aspectRatio: "4 / 5",
                                            objectFit: "cover",
                                            objectPosition: "center",
                                        }}
                                    />
                                </div>
                                {/* Teacher name + line will come from CMS */}
                                <span
                                    aria-hidden="true"
                                    style={{
                                        display: "block",
                                        width: "45%",
                                        height: 14,
                                        background: "var(--tbm-rule)",
                                    }}
                                />
                                <span
                                    aria-hidden="true"
                                    style={{
                                        display: "block",
                                        width: "80%",
                                        height: 10,
                                        background: "#d6d3c9",
                                    }}
                                />
                            </StaggerItem>
                        ))}
                    </Stagger>

                    <div className="tbm-c-all">
                        <Reveal amount={0.5}>
                            <Link
                                className="tbm-lnk"
                                href="/our-people"
                                style={{ color: "var(--tbm-forest)" }}
                            >
                                MEET ALL OUR PEOPLE{" "}
                                <span aria-hidden="true">→</span>
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ FAQ ============ */}
            <section
                style={{
                    background: "var(--tbm-sand)",
                    paddingTop: 75,
                    paddingBottom: 75,
                }}
            >
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48, alignItems: "start" }}
                >
                    <Reveal amount={0.3} className="tbm-c-l5">
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 400,
                                fontSize: "clamp(36px, 4vw, 56px)",
                                lineHeight: 1.1,
                                letterSpacing: "-.01em",
                            }}
                        >
                            TUGUN BEACH FAQ
                        </h2>
                    </Reveal>
                    <div className="tbm-c-r">
                        <div
                            className="faq"
                            style={{ borderTop: "1px solid var(--tbm-rule)" }}
                        >
                            {FAQS.map((f, i) => (
                                <details
                                    key={i}
                                    open={f.open}
                                    style={{
                                        borderBottom:
                                            "1px solid var(--tbm-rule)",
                                        padding: "16px 0",
                                    }}
                                >
                                    <summary
                                        style={{
                                            fontSize: 20,
                                            lineHeight: 1.4,
                                            color: "var(--tbm-ink)",
                                        }}
                                    >
                                        {f.q}
                                        <svg
                                            className="ic"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.4"
                                            aria-hidden="true"
                                        >
                                            <path d="M8 1v14M1 8h14"></path>
                                        </svg>
                                    </summary>
                                    <p
                                        style={{
                                            margin: "8px 0 8px",
                                            fontSize: 16,
                                            lineHeight: 1.7,
                                            color: "var(--tbm-text-muted)",
                                            paddingRight: 40,
                                        }}
                                    >
                                        {f.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ CTA BAND ============ */}
            <section
                style={{
                    color: "var(--tbm-cream)",
                    background: "var(--tbm-forest)",
                    paddingTop: 75,
                    paddingBottom: 75,
                }}
            >
                <div
                    className="tbm-wrap"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 16,
                        flexWrap: "wrap",
                    }}
                >
                    <Reveal amount={0.5}>
                        <Link
                            className="tbm-btn"
                            href="/new-here"
                            style={{
                                background: "var(--tbm-cream)",
                                color: "var(--tbm-forest)",
                            }}
                        >
                            START WITH 21 DAYS
                        </Link>
                    </Reveal>
                    <Reveal amount={0.5} delay={0.08}>
                        <a
                            className="tbm-btn"
                            href="#momence-reformer"
                            style={{
                                color: "var(--tbm-cream)",
                                border: "1px solid rgba(244,242,237,.7)",
                            }}
                        >
                            BOOK A REFORMER CLASS
                        </a>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
