/* ************************************************************
   TBM — Cornerstone studio page.

   Hero + intro with modality list + "Move differently through
   your week" sand section with three class cards + community
   feature band + four-up grid (teacher, member story, timetable,
   location) + CTA + FAQ. Mirrors design/cornerstone.html from
   the v2 handoff.
************************************************************ */

import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
    title: "Mat Pilates, Yoga, Yin & Barre Tugun | The Body Method Cornerstone",
    description:
        "Pilates, yoga, barre, yin, meditation and movement at The Body Method Cornerstone - our main community home in Tugun.",
};

const MODALITIES = [
    "Pilates.",
    "Yoga.",
    "Barre.",
    "Yin.",
    "Meditation.",
    "Movement.",
] as const;

const CLASS_CARDS = [
    {
        src: "/images/tbm-placeholders/portrait-cs-mat.jpg",
        alt: "Side-lying leg lift on a sage mat",
    },
    {
        src: "/images/tbm-placeholders/portrait-cs-yoga.jpg",
        alt: "A low lunge with arms raised in front of tall windows",
    },
    {
        src: "/images/tbm-placeholders/portrait-cs-barre.jpg",
        alt: "A hand on a timber barre and legs in a plie",
    },
] as const;

type Faq = { q: React.ReactNode; a: React.ReactNode; open?: boolean };

const FAQS: Faq[] = [
    {
        q: "Where is The Body Method Cornerstone?",
        a: (
            <>
                <p
                    style={{
                        margin: "8px 0 8px",
                        fontSize: 16,
                        lineHeight: 1.7,
                        color: "var(--tbm-text-muted)",
                        paddingRight: 40,
                    }}
                >
                    Our Cornerstone studio is located{" "}
                    <a
                        href="https://share.google/jL3QdCMThbnkGKE1b"
                        style={{ color: "var(--tbm-forest)" }}
                    >
                        Upstairs at Level 1, shop 8/570 Gold Coast Hwy, Tugun QLD 4224
                    </a>{" "}
                    - inside Cornerstone Stores.
                </p>
                <p
                    style={{
                        margin: "8px 0 8px",
                        fontSize: 16,
                        lineHeight: 1.7,
                        color: "var(--tbm-text-muted)",
                        paddingRight: 40,
                    }}
                >
                    This is our larger movement studio and home to Pilates, yoga, barre, yin, meditation, workshops and much of our wider TBM community.
                </p>
            </>
        ),
        open: true,
    },
    {
        q: "Where do I park for Cornerstone?",
        a: "There is street parking along the Gold Coast highway and surrounding streets, as well as limited parking in the Cornerstone carpark. Please make sure you allow 10-15 minutes for parking times during peak periods on weekends etc.",
    },
    {
        q: "What should I bring to class at The Body Method?",
        a: "Mostly, just yourself. Wear something comfortable and you can move in - oh and don’t forget to bring a water bottle. You’re welcome to bring a small towel and your own mat, but we have mats and everything else you’ll need waiting for you. We keep our studio spaces phone-free, so we ask that phones stay with your shoes at the front door - a little time to switch off, move and be present.",
    },
    {
        q: "Can I come casually without becoming a member?",
        a: (
            <>
                Yes you can! Welcome!{" "}
                <a
                    className="tbm-lnk"
                    href="#momence-pricing"
                    target="_blank"
                    rel="noopener"
                    style={{ color: "var(--tbm-forest)", minHeight: 0 }}
                >
                    PRICING IS HERE <span aria-hidden="true">↗</span>
                </a>{" "}
                If you&rsquo;re completely new to TBM, however, we&rsquo;d recommend looking at the 21-Day Immersion first - it gives you the opportunity to experience both studios rather than judging us on one class.
            </>
        ),
    },
    {
        q: "Do I need to be fit or flexible to do Yoga or Mat Pilates?",
        a: "Absolutely not. You don’t need to be fit, flexible or experienced to belong here. Come exactly as you are, wherever you’re starting from. Our teachers will meet you there, help you feel comfortable and supported, and guide you as you build strength, confidence and mobility in your own time. Pro Tip - Mat Pilates and Barre is more advanced in intensity and Power Pilates is pretty spicy so if you’re looking for an intense workout - you have found it!",
    },
];

export default function CornerstonePage() {
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
                    src="/images/tbm-placeholders/hero-corner.jpg"
                    alt="An upstairs studio with windows full of tree canopy and people folded forward on mats"
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
                                More ways to move and more reasons to stay.
                            </h1>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.15}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 17,
                                    lineHeight: 1.6,
                                    maxWidth: "34em",
                                    color: "#ece9e2",
                                }}
                            >
                                Light pouring through the windows, trees outside through the windows, and people you know inside.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ INTRO — portrait L + modality list R ============ */}
            <section style={{ paddingTop: 75, paddingBottom: 75 }}>
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
                            src="/images/tbm-placeholders/portrait-cs-intro.jpg"
                            alt="A teacher's hand on a student's back in a seated pose"
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
                            gap: 28,
                        }}
                    >
                        <Reveal amount={0.3}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "clamp(22px, 2vw, 28px)",
                                    lineHeight: 1.4,
                                    color: "var(--tbm-ink)",
                                }}
                            >
                                Cornerstone gives you room to explore different ways of moving and a community to experience them with.
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.15}>
                            <ul
                                style={{
                                    listStyle: "none",
                                    margin: 0,
                                    padding: 0,
                                    borderBottom:
                                        "1px solid var(--tbm-rule)",
                                    display: "grid",
                                    gridTemplateColumns:
                                        "repeat(2, minmax(0, 1fr))",
                                    columnGap: 24,
                                }}
                            >
                                {MODALITIES.map((m) => (
                                    <li
                                        key={m}
                                        style={{
                                            borderTop:
                                                "1px solid var(--tbm-rule)",
                                            padding: "10px 0",
                                            fontSize: "clamp(28px, 2.8vw, 40px)",
                                            lineHeight: 1.15,
                                            color: "var(--tbm-ink)",
                                        }}
                                    >
                                        {m}
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.3}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 24,
                                    lineHeight: 1.4,
                                    fontStyle: "italic",
                                    color: "var(--tbm-green-accent)",
                                }}
                            >
                                Different practices, with one place to make them part of your life.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ MOVE DIFFERENTLY — sand ============ */}
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
                            Move differently through your week.
                        </h2>
                    </Reveal>
                    <Reveal
                        amount={0.3}
                        delay={0.15}
                        className="tbm-c-r"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 12,
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
                            Some days you want strength.
                        </p>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 18,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-body)",
                            }}
                        >
                            Some days you need to slow down.
                        </p>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 18,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-body)",
                            }}
                        >
                            Sometimes you want the energy of a room moving together.
                        </p>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 24,
                                lineHeight: 1.4,
                                fontStyle: "italic",
                                color: "var(--tbm-green-accent)",
                                paddingTop: 12,
                            }}
                        >
                            Cornerstone gives you the variety to build a practice around what life is asking of you today.
                        </p>
                    </Reveal>

                    {/* Three class cards — tiles stagger left to right. */}
                    <Stagger
                        className="tbm-c-all tbm-g12"
                        style={{ rowGap: 24 }}
                        stagger={0.4}
                    >
                        {CLASS_CARDS.map((c) => (
                            <StaggerItem
                                key={c.src}
                                className="tbm-c-t"
                                style={{ position: "relative" }}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={c.src}
                                    alt={c.alt}
                                    style={{
                                        width: "100%",
                                        aspectRatio: "4 / 5",
                                        objectFit: "cover",
                                        objectPosition: "center",
                                    }}
                                />
                            </StaggerItem>
                        ))}
                    </Stagger>

                    <div className="tbm-c-all">
                        <Reveal amount={0.5}>
                            <Link
                                className="tbm-btn"
                                href="/classes"
                                style={{
                                    background: "var(--tbm-ink)",
                                    color: "var(--tbm-cream)",
                                }}
                            >
                                EXPLORE CLASSES
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ COMMUNITY FEATURE — landscape L, text R ============ */}
            <section style={{ paddingTop: 75, paddingBottom: 75 }}>
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
                            src="/images/tbm-placeholders/landscape-cs-community.jpg"
                            alt="People chatting while rolling up mats after class"
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
                                The hour matters and so does what happens around it.
                            </h2>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.15}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-body)",
                                }}
                            >
                                Cornerstone is our main community home - classes, conversations, workshops, events and all the little moments in between.
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.3}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 24,
                                    lineHeight: 1.4,
                                    fontStyle: "italic",
                                    color: "var(--tbm-green-accent)",
                                }}
                            >
                                Come for your class - don&rsquo;t be surprised if you stay for a chat.
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.45}>
                            <div style={{ paddingTop: 8 }}>
                                <Link
                                    className="tbm-lnk"
                                    href="/life-at-tbm"
                                    style={{ color: "var(--tbm-forest)" }}
                                >
                                    LIFE AT TBM{" "}
                                    <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ 2x2 GRID + CTA — sand ============ */}
            <section
                style={{
                    background: "var(--tbm-sand)",
                    paddingTop: 75,
                    paddingBottom: 75,
                }}
            >
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 64, alignItems: "start" }}
                >
                    {/* Teacher — Susie */}
                    <Reveal
                        amount={0.2}
                        className="tbm-c-l"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                            paddingRight: "clamp(0px, 2vw, 24px)",
                        }}
                    >
                        <div style={{ position: "relative" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/tbm-placeholders/portrait-t9.jpg"
                                alt="Hands holding a singing bowl in a lap"
                                style={{
                                    width: "100%",
                                    aspectRatio: "3 / 2",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                }}
                            />
                        </div>
                        <h3
                            style={{
                                margin: "8px 0 0",
                                fontWeight: 400,
                                fontSize: "clamp(30px, 3vw, 40px)",
                                lineHeight: 1.1,
                            }}
                        >
                            <Link
                                href="/our-people"
                                style={{
                                    color: "var(--tbm-ink)",
                                    textDecoration: "none",
                                }}
                            >
                                Susie Tagarro
                            </Link>
                        </h3>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-muted)",
                            }}
                        >
                            Vinyasa / flow yoga.
                        </p>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-muted)",
                            }}
                        >
                            Cornerstone, Wednesday 4.15pm
                        </p>
                    </Reveal>

                    {/* Member story */}
                    <Reveal
                        amount={0.2}
                        delay={0.1}
                        className="tbm-c-r"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                            paddingLeft: "clamp(0px, 2vw, 24px)",
                        }}
                    >
                        <div style={{ position: "relative" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/tbm-placeholders/member-1-downdog.jpg"
                                alt="Downward facing dog on a sage mat"
                                style={{
                                    width: "100%",
                                    aspectRatio: "3 / 2",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                }}
                            />
                        </div>
                        <div
                            className="tbm-lbl"
                            style={{
                                color: "var(--tbm-bronze-label)",
                                marginTop: 8,
                            }}
                        >
                            &ldquo;Why I stay.&rdquo;
                        </div>
                        <blockquote
                            style={{
                                margin: 0,
                                fontSize: 26,
                                lineHeight: 1.35,
                                fontStyle: "italic",
                            }}
                        >
                            Short quote
                        </blockquote>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-muted)",
                            }}
                        >
                            Member name &middot; Member since XXXX
                        </p>
                    </Reveal>

                    {/* Timetable */}
                    <Reveal
                        amount={0.2}
                        className="tbm-c-l"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                            paddingRight: "clamp(0px, 2vw, 24px)",
                        }}
                    >
                        <div style={{ position: "relative" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/tbm-placeholders/landscape-yoga.jpg"
                                alt="People in warrior two facing tall windows full of trees"
                                style={{
                                    width: "100%",
                                    aspectRatio: "3 / 2",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                }}
                            />
                        </div>
                        <p
                            style={{
                                margin: "8px 0 0",
                                fontSize: 18,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-body)",
                            }}
                        >
                            Classes run throughout the week. Check the live timetable and book your spot before you arrive.
                        </p>
                        <div>
                            <a
                                className="tbm-btn"
                                href="#momence-timetable-cornerstone"
                                style={{
                                    background: "var(--tbm-ink)",
                                    color: "var(--tbm-cream)",
                                }}
                            >
                                VIEW CORNERSTONE TIMETABLE
                            </a>
                        </div>
                    </Reveal>

                    {/* Location — 3:2 map slot (styled empty forest div
                        until the real Google Maps iframe is embedded)
                        plus the address and GET DIRECTIONS button. */}
                    <Reveal
                        amount={0.2}
                        delay={0.1}
                        className="tbm-c-r"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                            paddingLeft: "clamp(0px, 2vw, 24px)",
                        }}
                    >
                        {/* TODO: embed real Google Maps iframe once addresses confirmed */}
                        <div
                            style={{
                                width: "100%",
                                aspectRatio: "3 / 2",
                                background: "#1b2518",
                            }}
                            role="img"
                            aria-label="Map of Cornerstone studio location"
                        />
                        <p
                            style={{
                                margin: "8px 0 0",
                                fontSize: 20,
                                lineHeight: 1.45,
                                fontWeight: 500,
                            }}
                        >
                            Upstairs, Level 1, Cornerstone Stores, Shop 8, 570 Gold Coast Highway, Tugun QLD 4224
                        </p>
                        <div>
                            <a
                                className="tbm-btn"
                                href="https://maps.app.goo.gl/QuJycWP9bWruvas76"
                                style={{
                                    color: "var(--tbm-ink)",
                                    border: "1px solid var(--tbm-ink)",
                                }}
                            >
                                GET DIRECTIONS
                            </a>
                        </div>
                    </Reveal>

                    <div
                        className="tbm-c-all"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Reveal amount={0.5}>
                            <Link
                                className="tbm-btn"
                                href="/new-here"
                                style={{
                                    background: "var(--tbm-ink)",
                                    color: "var(--tbm-cream)",
                                }}
                            >
                                START WITH 21 DAYS
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ FAQ ============ */}
            <section style={{ paddingTop: 75, paddingBottom: 75 }}>
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
                            CORNERSTONE FAQ:
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
                                    {typeof f.a === "string" ? (
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
                                    ) : i === 0 ? (
                                        f.a
                                    ) : (
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
                                    )}
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
