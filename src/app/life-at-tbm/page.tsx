/* ************************************************************
   /life-at-tbm — More than the hour on the mat.

   Faithful conversion of design/life-at-tbm.html. Server component
   with Reveal + Stagger motion primitives.
************************************************************ */

import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
    title: "Life at The Body Method",
    description:
        "More than the hour you spend on the mat. Workshops, events, friendships and the people who make The Body Method.",
};

/* Member story cards (placeholder content until CMS lands). */
const memberStories = [
    {
        image: "/images/tbm-placeholders/member-1-downdog.jpg",
        imageAlt: "Downward facing dog on a sage mat",
    },
    {
        image: "/images/tbm-placeholders/member-2-reformer-arms.jpg",
        imageAlt: "Kneeling arm work with straps on a Reformer",
    },
    {
        image: "/images/tbm-placeholders/member-3-childs-pose.jpg",
        imageAlt: "Child’s pose in soft window light",
    },
];

/* Friends of TBM (partners). */
const partners = [
    {
        name: "Tugun Osteopathy",
        href: "https://www.tugunosteopathy.com/",
    },
    {
        name: "The Upside",
        href: "https://www.theupside.com.au/",
    },
    {
        name: "Barre Body Teacher Training",
        href: "https://barrebody.com.au",
    },
];

export default function LifeAtTbmPage() {
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
                    src="/images/tbm-placeholders/hero-life.jpg"
                    alt="Hands holding coffee cups around a timber table near a sunny window"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center 50%",
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
                                More than the hour you spend on the mat.
                            </h1>
                        </Reveal>
                        <Reveal delay={0.08} amount={0.3}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 17,
                                    lineHeight: 1.6,
                                    maxWidth: "34em",
                                    color: "#ece9e2",
                                }}
                            >
                                Movement brings us together, but some of the best things happen around it.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ INTRO LEDE ============ */}
            <section style={{ paddingTop: 75, paddingBottom: 75 }}>
                <div
                    className="tbm-wrap"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        textAlign: "center",
                    }}
                >
                    <Reveal amount={0.4}>
                        <p
                            style={{
                                margin: 0,
                                fontSize: "clamp(26px, 2.6vw, 36px)",
                                lineHeight: 1.35,
                                maxWidth: "26em",
                                color: "var(--tbm-ink)",
                            }}
                        >
                            Life at TBM is a little window into everything that makes The Body Method more than a place to exercise. The people, the friendships, the learning, the experiences and the connections that grow beyond the weekly timetable.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ============ WHAT'S HAPPENING ============ */}
            <section
                style={{
                    paddingTop: 75,
                    paddingBottom: 75,
                    borderTop: "1px solid var(--tbm-rule)",
                }}
            >
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48, alignItems: "start" }}
                >
                    <Reveal amount={0.4} className="tbm-c-l5">
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 400,
                                fontSize: "clamp(36px, 4vw, 56px)",
                                lineHeight: 1.1,
                                letterSpacing: "-.01em",
                            }}
                        >
                            WHAT&apos;S HAPPENING
                        </h2>
                    </Reveal>
                    <Reveal
                        amount={0.3}
                        delay={0.08}
                        className="tbm-c-r"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontSize: 24,
                                lineHeight: 1.4,
                                fontStyle: "italic",
                                color: "var(--tbm-green-accent)",
                            }}
                        >
                            Good things are always worth coming together for.
                        </p>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 18,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-body)",
                            }}
                        >
                            From workshops and special events to movement experiences and opportunities to learn something new, here&apos;s what&apos;s happening in and around our studios.
                        </p>
                    </Reveal>

                    <Stagger
                        className="tbm-c-all tbm-g12"
                        style={{ rowGap: 48 }}
                        stagger={0.22}
                    >
                        <StaggerItem
                            className="tbm-c-l"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 14,
                                paddingRight: "clamp(0px, 2vw, 24px)",
                            }}
                        >
                            <div style={{ position: "relative" }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/images/tbm-placeholders/landscape-life-walk.jpg"
                                    alt="Women walking along the water at sunrise"
                                    style={{
                                        width: "100%",
                                        aspectRatio: "3 / 2",
                                        objectFit: "cover",
                                        objectPosition: "center",
                                    }}
                                />
                            </div>
                            <p
                                className="tbm-lbl"
                                style={{
                                    margin: "8px 0 0",
                                    color: "var(--tbm-bronze-label)",
                                }}
                            >
                                [Day, date · time · studio]
                            </p>
                            <h3
                                style={{
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: "clamp(30px, 3vw, 40px)",
                                    lineHeight: 1.1,
                                }}
                            >
                                [Event name]
                            </h3>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-muted)",
                                    maxWidth: "34em",
                                }}
                            >
                                [One or two lines about the event]
                            </p>
                        </StaggerItem>

                        <StaggerItem
                            className="tbm-c-r"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 14,
                                paddingLeft: "clamp(0px, 2vw, 24px)",
                            }}
                        >
                            <div style={{ position: "relative" }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/images/tbm-placeholders/landscape-life-retreat.jpg"
                                    alt="Mats laid out on a timber deck among trees"
                                    style={{
                                        width: "100%",
                                        aspectRatio: "3 / 2",
                                        objectFit: "cover",
                                        objectPosition: "center",
                                    }}
                                />
                            </div>
                            <p
                                className="tbm-lbl"
                                style={{
                                    margin: "8px 0 0",
                                    color: "var(--tbm-bronze-label)",
                                }}
                            >
                                [Day, date · time · studio]
                            </p>
                            <h3
                                style={{
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: "clamp(30px, 3vw, 40px)",
                                    lineHeight: 1.1,
                                }}
                            >
                                [Event name]
                            </h3>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-muted)",
                                    maxWidth: "34em",
                                }}
                            >
                                [One or two lines about the event]
                            </p>
                        </StaggerItem>
                    </Stagger>
                </div>
            </section>

            {/* ============ OUR COMMUNITY ============ */}
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
                    <Reveal amount={0.4} className="tbm-c-l5">
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 400,
                                fontSize: "clamp(36px, 4vw, 56px)",
                                lineHeight: 1.1,
                                letterSpacing: "-.01em",
                            }}
                        >
                            OUR COMMUNITY
                        </h2>
                    </Reveal>
                    <Reveal
                        amount={0.3}
                        delay={0.08}
                        className="tbm-c-r"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontSize: 24,
                                lineHeight: 1.4,
                                fontStyle: "italic",
                                color: "var(--tbm-green-accent)",
                            }}
                        >
                            The people make the place.
                        </p>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 18,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-body)",
                            }}
                        >
                            Meet some of the wonderful humans who bring The Body Method to life. The familiar faces, personal stories, shared moments and little things that make our studios feel like somewhere you belong.
                        </p>
                    </Reveal>

                    <Stagger
                        className="tbm-c-all tbm-g12"
                        style={{ rowGap: 24 }}
                        stagger={0.2}
                    >
                        {memberStories.map((m, i) => (
                            <StaggerItem
                                key={i}
                                className="tbm-c-t"
                                style={{
                                    margin: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 16,
                                }}
                            >
                                <div style={{ position: "relative" }}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={m.image}
                                        alt={m.imageAlt}
                                        style={{
                                            width: "100%",
                                            aspectRatio: "4 / 5",
                                            objectFit: "cover",
                                            objectPosition: "center",
                                        }}
                                    />
                                </div>
                                <div
                                    className="tbm-lbl"
                                    style={{
                                        color: "var(--tbm-bronze-label)",
                                        paddingTop: 4,
                                    }}
                                >
                                    &ldquo;Why I stay.&rdquo;
                                </div>
                                <blockquote
                                    style={{
                                        margin: 0,
                                        fontSize: 24,
                                        lineHeight: 1.35,
                                        fontStyle: "italic",
                                    }}
                                >
                                    Short quote
                                </blockquote>
                                <figcaption
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 4,
                                        borderTop: "1px solid var(--tbm-rule)",
                                        paddingTop: 14,
                                    }}
                                >
                                    <span style={{ fontSize: 16 }}>Member name</span>
                                    <span
                                        style={{
                                            fontSize: 14,
                                            color: "var(--tbm-text-subtle)",
                                        }}
                                    >
                                        Member since XXXX
                                    </span>
                                    <span
                                        style={{
                                            fontSize: 14,
                                            color: "var(--tbm-text-subtle)",
                                        }}
                                    >
                                        Favourite class / teacher
                                    </span>
                                </figcaption>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            {/* ============ WORKSHOPS + LEARNING ============ */}
            <section style={{ paddingTop: 75, paddingBottom: 75 }}>
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48, alignItems: "start" }}
                >
                    <Reveal amount={0.4} className="tbm-c-l5">
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 400,
                                fontSize: "clamp(36px, 4vw, 56px)",
                                lineHeight: 1.1,
                                letterSpacing: "-.01em",
                            }}
                        >
                            WORKSHOPS + LEARNING
                        </h2>
                    </Reveal>
                    <Reveal
                        amount={0.3}
                        delay={0.08}
                        className="tbm-c-r"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontSize: 24,
                                lineHeight: 1.4,
                                fontStyle: "italic",
                                color: "var(--tbm-green-accent)",
                            }}
                        >
                            Curiosity looks good on everybody.
                        </p>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 18,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-body)",
                            }}
                        >
                            We love creating opportunities to explore movement a little further. From Pilates and barre training to specialist workshops and new ways of understanding your body, there&apos;s always something worth learning.
                        </p>
                    </Reveal>

                    <Stagger
                        className="tbm-c-all tbm-g12"
                        style={{ rowGap: 48 }}
                        stagger={0.22}
                    >
                        <StaggerItem
                            className="tbm-c-l"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 14,
                                paddingRight: "clamp(0px, 2vw, 24px)",
                            }}
                        >
                            <div style={{ position: "relative" }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/images/tbm-placeholders/landscape-life-workshop.jpg"
                                    alt="A small group on mats watching a teacher demonstrate with a spine model"
                                    style={{
                                        width: "100%",
                                        aspectRatio: "3 / 2",
                                        objectFit: "cover",
                                        objectPosition: "center",
                                    }}
                                />
                            </div>
                            <p
                                className="tbm-lbl"
                                style={{
                                    margin: "8px 0 0",
                                    color: "var(--tbm-bronze-label)",
                                }}
                            >
                                [Date · time] · Cornerstone
                            </p>
                            <h3
                                style={{
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: "clamp(30px, 3vw, 40px)",
                                    lineHeight: 1.1,
                                }}
                            >
                                Intro to Ballet Workshops
                            </h3>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-muted)",
                                    maxWidth: "34em",
                                }}
                            >
                                Creating a welcoming space for adults to reconnect with dance, explore ballet fundamentals and experience the joy of movement, regardless of their previous dance experience.
                            </p>
                        </StaggerItem>

                        <StaggerItem
                            className="tbm-c-r"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 14,
                                paddingLeft: "clamp(0px, 2vw, 24px)",
                            }}
                        >
                            <div style={{ position: "relative" }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/images/tbm-placeholders/landscape-life-training.jpg"
                                    alt="Legs at a timber barre during a training session"
                                    style={{
                                        width: "100%",
                                        aspectRatio: "3 / 2",
                                        objectFit: "cover",
                                        objectPosition: "center",
                                    }}
                                />
                            </div>
                            <p
                                className="tbm-lbl"
                                style={{
                                    margin: "8px 0 0",
                                    color: "var(--tbm-bronze-label)",
                                }}
                            >
                                [Date · time] · [Studio]
                            </p>
                            <h3
                                style={{
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: "clamp(30px, 3vw, 40px)",
                                    lineHeight: 1.1,
                                }}
                            >
                                Barre Body Teacher Training
                            </h3>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-muted)",
                                    maxWidth: "34em",
                                }}
                            >
                                [One or two lines about the training]
                            </p>
                            <div style={{ paddingTop: 4 }}>
                                <a
                                    className="tbm-lnk"
                                    href="https://barrebody.com.au"
                                    style={{ color: "var(--tbm-forest)" }}
                                >
                                    https://barrebody.com.au{" "}
                                    <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </StaggerItem>
                    </Stagger>

                    <div className="tbm-c-all">
                        <Reveal amount={0.4}>
                            <a
                                className="tbm-btn"
                                href="#whats-on"
                                style={{
                                    background: "var(--tbm-ink)",
                                    color: "var(--tbm-cream)",
                                }}
                            >
                                SEE WHAT&apos;S COMING UP
                            </a>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ FRIENDS OF TBM ============ */}
            <section
                style={{
                    color: "#f4f2ed",
                    background: "var(--tbm-forest)",
                    paddingTop: 75,
                    paddingBottom: 75,
                }}
            >
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48, alignItems: "start" }}
                >
                    <Reveal amount={0.4} className="tbm-c-l5">
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 400,
                                fontSize: "clamp(36px, 4vw, 56px)",
                                lineHeight: 1.1,
                                letterSpacing: "-.01em",
                            }}
                        >
                            FRIENDS OF TBM
                        </h2>
                    </Reveal>
                    <Reveal
                        amount={0.3}
                        delay={0.08}
                        className="tbm-c-r"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontSize: 24,
                                lineHeight: 1.4,
                                fontStyle: "italic",
                                color: "#f4f2ed",
                            }}
                        >
                            Good people doing good things.
                        </p>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 18,
                                lineHeight: 1.7,
                                color: "var(--tbm-on-dark-body)",
                            }}
                        >
                            We&apos;re lucky to be surrounded by talented practitioners, thoughtful businesses and people who share our belief in taking good care of others.
                        </p>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 18,
                                lineHeight: 1.7,
                                color: "var(--tbm-on-dark-body)",
                            }}
                        >
                            These are some of the people and brands we&apos;re proud to work alongside.
                        </p>
                    </Reveal>

                    <Stagger
                        className="tbm-c-all tbm-g12"
                        style={{ rowGap: 32 }}
                        stagger={0.2}
                    >
                        {partners.map((p) => (
                            <StaggerItem
                                key={p.name}
                                className="tbm-c-t"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 14,
                                }}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        aspectRatio: "3 / 2",
                                        border: "1px solid rgba(175,177,161,.35)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                />
                                <h3
                                    style={{
                                        margin: 0,
                                        fontWeight: 400,
                                        fontSize: 24,
                                        lineHeight: 1.3,
                                    }}
                                >
                                    <a
                                        href={p.href}
                                        style={{
                                            color: "#f4f2ed",
                                            textDecoration: "none",
                                        }}
                                    >
                                        {p.name}
                                    </a>
                                </h3>
                                <a
                                    href={p.href}
                                    style={{
                                        fontSize: 15,
                                        color: "var(--tbm-on-dark-body)",
                                    }}
                                >
                                    {p.href}
                                </a>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>
        </div>
    );
}
