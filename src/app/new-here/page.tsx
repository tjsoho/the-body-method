/* ************************************************************
   TBM — New Here? / 21-Day Immersion.

   Built from design/new-here.html. Hero, two teaching sections,
   the two-studio compare band, a dark three-weeks band, the first
   class CTA and a five-item FAQ. Copy is the client-approved
   master and must not be rewritten.
************************************************************ */

import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
    title: "New here? / 21-Day Immersion",
    description:
        "21 days to find your kind of movement. For $99, spend three weeks across both of our Tugun studios and discover the way of moving that fits your life.",
};

export default function NewHerePage() {
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
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/tbm-placeholders/hero-new-here.jpg"
                    alt="A woman carrying a rolled mat into a light-filled studio"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center 45%",
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
                        className="tbm-c-l7"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 24,
                        }}
                    >
                        <Reveal amount={0.2}>
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
                                21 days to find your kind of movement.
                            </h1>
                        </Reveal>
                        <Reveal amount={0.2} delay={0.08}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 21,
                                    lineHeight: 1.5,
                                    maxWidth: "34em",
                                    fontStyle: "italic",
                                    color: "#f4f2ed",
                                }}
                            >
                                Come as you are and find the movement that fits your life.
                            </p>
                        </Reveal>
                        <Reveal amount={0.2} delay={0.16}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 17,
                                    lineHeight: 1.6,
                                    maxWidth: "34em",
                                    color: "#ece9e2",
                                }}
                            >
                                For $99, spend 21 days exploring The Body Method across
                                both of our Tugun studios.
                            </p>
                        </Reveal>
                        <Reveal amount={0.2} delay={0.24}>
                            <div style={{ paddingTop: 8 }}>
                                <a
                                    className="tbm-btn"
                                    href="#momence-21-days"
                                    style={{
                                        background: "#f4f2ed",
                                        color: "#1b2518",
                                    }}
                                >
                                    START MY 21 DAYS - $99
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ WHAT ARE THE 21 DAYS FOR ============ */}
            <section
                style={{
                    paddingTop: 75,
                    paddingBottom: 75,
                    background: "var(--tbm-cream)",
                    color: "var(--tbm-ink)",
                }}
            >
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48, alignItems: "center" }}
                >
                    <div
                        className="tbm-c-l"
                        style={{
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
                                What are the 21 days for?
                            </h2>
                        </Reveal>
                        <Reveal amount={0.2} delay={0.08}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-body)",
                                }}
                            >
                                To explore. Try Reformer Pilates at Tugun Beach, then mat
                                Pilates, yoga, yin, meditation or barre at Cornerstone.
                                Move with different teachers. Try a morning class, then an
                                evening one.
                            </p>
                        </Reveal>
                        <Reveal amount={0.2} delay={0.16}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-body)",
                                }}
                            >
                                It&rsquo;s your chance to discover what your body responds
                                to, what you genuinely enjoy and what actually fits into
                                your life.
                            </p>
                        </Reveal>
                        <Reveal amount={0.2} delay={0.24}>
                            <div
                                style={{
                                    borderTop: "1px solid var(--tbm-rule)",
                                    marginTop: 16,
                                    paddingTop: 32,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 12,
                                }}
                            >
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 24,
                                        lineHeight: 1.4,
                                        color: "var(--tbm-ink)",
                                    }}
                                >
                                    Because the goal isn&rsquo;t to move every day for 21
                                    days.
                                </p>
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: 24,
                                        lineHeight: 1.4,
                                        fontStyle: "italic",
                                        color: "var(--tbm-green-accent)",
                                    }}
                                >
                                    It&rsquo;s to find a way of moving you&rsquo;ll want
                                    to keep coming back to long after they&rsquo;re over.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                    <Reveal
                        amount={0.2}
                        delay={0.08}
                        className="tbm-c-r5"
                        style={{ position: "relative" }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/tbm-placeholders/portrait-new-here-springs.jpg"
                            alt="A hand adjusting the springs on a timber Pilates tower"
                            style={{
                                width: "100%",
                                aspectRatio: "4 / 5",
                                objectFit: "cover",
                            }}
                        />
                    </Reveal>
                </div>
            </section>

            {/* ============ YOU DON'T NEED TO BE READY ============ */}
            <section
                style={{
                    background: "var(--tbm-sand)",
                    paddingTop: 75,
                    paddingBottom: 75,
                    color: "var(--tbm-ink)",
                }}
            >
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48, alignItems: "center" }}
                >
                    <Reveal
                        amount={0.2}
                        className="tbm-c-l5"
                        style={{ position: "relative" }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/tbm-placeholders/portrait-new-here-guide.jpg"
                            alt="A teacher's hand gently guiding a kneeling beginner"
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
                                You don&rsquo;t need to be &ldquo;ready&rdquo;.
                            </h2>
                        </Reveal>
                        <Reveal amount={0.2} delay={0.08}>
                            <ul
                                style={{
                                    listStyle: "none",
                                    margin: 0,
                                    padding: 0,
                                    fontSize: 18,
                                    lineHeight: 1.6,
                                    color: "var(--tbm-text-body)",
                                }}
                            >
                                <li
                                    style={{
                                        borderTop: "1px solid var(--tbm-rule)",
                                        padding: "18px 0",
                                    }}
                                >
                                    Never done Reformer or Mat Pilates? Great, that is no
                                    problem.
                                </li>
                                <li
                                    style={{
                                        borderTop: "1px solid var(--tbm-rule)",
                                        padding: "18px 0",
                                    }}
                                >
                                    Haven&rsquo;t moved much lately? Well then,
                                    you&rsquo;re so welcome to be here.
                                </li>
                                <li
                                    style={{
                                        borderTop: "1px solid var(--tbm-rule)",
                                        padding: "18px 0",
                                    }}
                                >
                                    Already experienced and looking for somewhere new?
                                    Come right on in.
                                </li>
                                <li
                                    style={{
                                        borderTop: "1px solid var(--tbm-rule)",
                                        borderBottom: "1px solid var(--tbm-rule)",
                                        padding: "18px 0",
                                    }}
                                >
                                    You don&apos;t need to be flexible, coordinated or
                                    &ldquo;fit enough&rdquo; before you arrive.
                                </li>
                            </ul>
                        </Reveal>
                        <Reveal amount={0.2} delay={0.16}>
                            <p
                                style={{
                                    margin: 0,
                                    paddingTop: 16,
                                    fontSize: 24,
                                    lineHeight: 1.4,
                                    fontStyle: "italic",
                                    color: "var(--tbm-green-accent)",
                                }}
                            >
                                You start where you are - we teach from there.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ TWO STUDIOS ============ */}
            <section
                style={{
                    paddingTop: 75,
                    paddingBottom: 75,
                    background: "var(--tbm-cream)",
                    color: "var(--tbm-ink)",
                }}
            >
                <div className="tbm-wrap" style={{ paddingBottom: 56 }}>
                    <Reveal amount={0.3}>
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 400,
                                fontSize: "clamp(36px, 4vw, 56px)",
                                lineHeight: 1.1,
                                textAlign: "center",
                            }}
                        >
                            Two studios -{" "}
                            <em style={{ color: "var(--tbm-green-accent)" }}>
                                your 21 days include both.
                            </em>
                        </h2>
                    </Reveal>
                </div>
                <Stagger
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 48 }}
                    stagger={0.22}
                >
                    <StaggerItem
                        className="tbm-c-l"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 20,
                            paddingRight: "clamp(0px, 2vw, 24px)",
                        }}
                    >
                        <article
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 20,
                            }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/tbm-placeholders/studio-tugun-reformer.jpg"
                                alt="Feet pressing the footbar of a timber Reformer"
                                style={{
                                    width: "100%",
                                    aspectRatio: "3 / 2",
                                    objectFit: "cover",
                                    objectPosition: "center 45%",
                                }}
                            />
                            <h3
                                style={{
                                    margin: "8px 0 0",
                                    fontWeight: 400,
                                    fontSize: "clamp(30px, 3vw, 40px)",
                                    lineHeight: 1.1,
                                }}
                            >
                                Tugun Beach
                            </h3>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.6,
                                    color: "var(--tbm-text-muted)",
                                    maxWidth: "32em",
                                }}
                            >
                                Six-person Reformer Pilates with personalised teaching and
                                close attention.
                            </p>
                        </article>
                    </StaggerItem>
                    <StaggerItem
                        className="tbm-c-r"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 20,
                            boxShadow: "inset 1px 0 0 var(--tbm-rule)",
                            paddingLeft: "clamp(0px, 2vw, 24px)",
                        }}
                    >
                        <article
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 20,
                            }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/tbm-placeholders/studio-cornerstone-meditation.jpg"
                                alt="Seated meditation facing windows full of trees"
                                style={{
                                    width: "100%",
                                    aspectRatio: "3 / 2",
                                    objectFit: "cover",
                                }}
                            />
                            <h3
                                style={{
                                    margin: "8px 0 0",
                                    fontWeight: 400,
                                    fontSize: "clamp(30px, 3vw, 40px)",
                                    lineHeight: 1.1,
                                }}
                            >
                                Cornerstone
                            </h3>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.6,
                                    color: "var(--tbm-text-muted)",
                                    maxWidth: "32em",
                                }}
                            >
                                Pilates, yoga, barre and more in our larger, light-filled
                                community studio.
                            </p>
                        </article>
                    </StaggerItem>
                </Stagger>
                <div
                    className="tbm-wrap"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: 32,
                    }}
                >
                    <Reveal amount={0.3}>
                        <Link
                            className="tbm-btn"
                            href="/studios"
                            style={{
                                background: "var(--tbm-ink)",
                                color: "var(--tbm-cream)",
                            }}
                        >
                            COMPARE THE STUDIOS
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* ============ YOUR THREE WEEKS + AFTER ============ */}
            <section
                style={{
                    background: "var(--tbm-forest)",
                    color: "#f4f2ed",
                    paddingBottom: 75,
                }}
            >
                <Reveal amount={0.2}>
                    <div
                        style={{
                            position: "relative",
                            height: 420,
                            overflow: "hidden",
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/tbm-placeholders/landscape-tugun-studio-morning.jpg"
                            alt="An empty Reformer studio in early morning light"
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "center 55%",
                            }}
                        />
                    </div>
                </Reveal>
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 64, paddingTop: 75 }}
                >
                    <Reveal amount={0.3} className="tbm-c-all">
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 400,
                                fontSize: "clamp(40px, 4.6vw, 64px)",
                                lineHeight: 1.05,
                                letterSpacing: "-.01em",
                            }}
                        >
                            Your three weeks:
                        </h2>
                    </Reveal>

                    <Stagger
                        className="tbm-c-all tbm-g12"
                        style={{ rowGap: 40 }}
                        stagger={0.17}
                    >
                        <StaggerItem
                            className="tbm-c-t"
                            style={{
                                borderTop: "1px solid rgba(175,177,161,.35)",
                                paddingTop: 32,
                                paddingRight: 24,
                                display: "flex",
                                flexDirection: "column",
                                gap: 12,
                            }}
                        >
                            <h3
                                style={{
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: 28,
                                    lineHeight: 1.25,
                                }}
                            >
                                <span
                                    className="tbm-lbl"
                                    style={{
                                        display: "block",
                                        color: "var(--tbm-on-dark-sage)",
                                        fontSize: 13,
                                        paddingBottom: 12,
                                    }}
                                >
                                    Week 1 -
                                </span>
                                Explore
                            </h3>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.6,
                                    color: "var(--tbm-on-dark-body)",
                                }}
                            >
                                Try both spaces. Meet teachers. Experience different
                                classes.
                            </p>
                        </StaggerItem>
                        <StaggerItem
                            className="tbm-c-t"
                            style={{
                                borderTop: "1px solid rgba(175,177,161,.35)",
                                paddingTop: 32,
                                paddingRight: 24,
                                display: "flex",
                                flexDirection: "column",
                                gap: 12,
                            }}
                        >
                            <h3
                                style={{
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: 28,
                                    lineHeight: 1.25,
                                }}
                            >
                                <span
                                    className="tbm-lbl"
                                    style={{
                                        display: "block",
                                        color: "var(--tbm-on-dark-sage)",
                                        fontSize: 13,
                                        paddingBottom: 12,
                                    }}
                                >
                                    Week 2 -
                                </span>
                                Find Your Rhythm
                            </h3>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.6,
                                    color: "var(--tbm-on-dark-body)",
                                }}
                            >
                                Notice what you enjoy, when you like to move and what
                                works in your week.
                            </p>
                        </StaggerItem>
                        <StaggerItem
                            className="tbm-c-t"
                            style={{
                                borderTop: "1px solid rgba(175,177,161,.35)",
                                paddingTop: 32,
                                paddingRight: 24,
                                display: "flex",
                                flexDirection: "column",
                                gap: 12,
                            }}
                        >
                            <h3
                                style={{
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: 28,
                                    lineHeight: 1.25,
                                }}
                            >
                                <span
                                    className="tbm-lbl"
                                    style={{
                                        display: "block",
                                        color: "var(--tbm-on-dark-sage)",
                                        fontSize: 13,
                                        paddingBottom: 12,
                                    }}
                                >
                                    Week 3 -
                                </span>
                                Build Your Routine
                            </h3>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.6,
                                    color: "var(--tbm-on-dark-body)",
                                }}
                            >
                                Start turning those choices into a sustainable practice.
                            </p>
                        </StaggerItem>
                    </Stagger>

                    <div
                        className="tbm-c-all tbm-g12"
                        style={{
                            rowGap: 32,
                            borderTop: "1px solid #a88d66",
                            paddingTop: 48,
                        }}
                    >
                        <Reveal amount={0.3} className="tbm-c-l5">
                            <h3
                                style={{
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: "clamp(32px, 3.4vw, 44px)",
                                    lineHeight: 1.1,
                                    fontStyle: "italic",
                                }}
                            >
                                After 21 days?
                            </h3>
                        </Reveal>
                        <Reveal
                            amount={0.2}
                            delay={0.08}
                            className="tbm-c-r"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 16,
                                fontSize: 18,
                                lineHeight: 1.7,
                                color: "var(--tbm-on-dark-body)",
                            }}
                        >
                            <p style={{ margin: 0, color: "#f4f2ed" }}>
                                We&apos;ll help you choose what makes sense next -
                                Cornerstone, Tugun Beach, both, or another way of moving
                                with us.
                            </p>
                            <p style={{ margin: 0 }}>
                                No mystery and no hard sell. Just movement that works for
                                your life and where you are right now.
                            </p>
                            <p style={{ margin: 0 }}>
                                When your 21 days are up, you can simply choose the
                                membership that feels right - or, if you&rsquo;re not
                                quite ready to commit, keep moving with us through class
                                packs.
                            </p>
                            <p style={{ margin: 0 }}>
                                And if you&rsquo;re not sure which way to go, we&rsquo;re
                                always happy to help.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ YOUR FIRST CLASS ============ */}
            <section
                style={{
                    paddingTop: 75,
                    paddingBottom: 75,
                    background: "var(--tbm-cream)",
                    color: "var(--tbm-ink)",
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
                            src="/images/tbm-placeholders/landscape-first-class-door.jpg"
                            alt="Shoes lined up on a timber bench at the studio door"
                            style={{
                                width: "100%",
                                aspectRatio: "3 / 2",
                                objectFit: "cover",
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
                                Your first class
                            </h2>
                        </Reveal>
                        <Reveal amount={0.2} delay={0.08}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-body)",
                                }}
                            >
                                Book and then arrive a little early. Tell us anything we
                                should know about your body or experience.
                            </p>
                        </Reveal>
                        <Reveal amount={0.2} delay={0.16}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 21,
                                    lineHeight: 1.5,
                                    fontStyle: "italic",
                                    color: "var(--tbm-ink)",
                                }}
                            >
                                Then let us take care of the rest.
                            </p>
                        </Reveal>
                        <Reveal amount={0.2} delay={0.24}>
                            <div style={{ paddingTop: 8 }}>
                                <a
                                    className="tbm-btn"
                                    href="#momence-sign-up"
                                    style={{
                                        background: "var(--tbm-ink)",
                                        color: "#f4f2ed",
                                    }}
                                >
                                    START MY 21 DAYS
                                </a>
                            </div>
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
                    color: "var(--tbm-ink)",
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
                            }}
                        >
                            FAQ
                        </h2>
                    </Reveal>
                    <div
                        className="tbm-c-r tbm-faq"
                        style={{ borderTop: "1px solid var(--tbm-rule)" }}
                    >
                        <Stagger stagger={0.1}>
                            <StaggerItem>
                                <details
                                    open
                                    style={{
                                        borderBottom: "1px solid var(--tbm-rule)",
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
                                        Is The Body Method suitable for beginners?
                                        <PlusIcon />
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
                                        Yes, absolutely. You don&apos;t need previous
                                        Pilates or yoga experience to start. Let your
                                        teacher know you&apos;re new and they&apos;ll
                                        help you from there.
                                    </p>
                                </details>
                            </StaggerItem>
                            <StaggerItem>
                                <details
                                    style={{
                                        borderBottom: "1px solid var(--tbm-rule)",
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
                                        Which studio should I start with?
                                        <PlusIcon />
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
                                        Your 21-Day Immersion includes both, so you
                                        don&apos;t need to decide upfront. Tugun Beach
                                        offers small-group Reformer Pilates; Cornerstone
                                        gives you a broader mix of Pilates, yoga, barre
                                        and movement.
                                    </p>
                                </details>
                            </StaggerItem>
                            <StaggerItem>
                                <details
                                    style={{
                                        borderBottom: "1px solid var(--tbm-rule)",
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
                                        Do I have to attend every day?
                                        <PlusIcon />
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
                                        Not at all. For some people, 3-4 times a week
                                        feels great; for you, it might be two, or it
                                        might be five. The idea is to use your 21 days
                                        to find a rhythm you genuinely enjoy and can
                                        keep up - along with the classes, teachers and
                                        times that suit you best.
                                    </p>
                                </details>
                            </StaggerItem>
                            <StaggerItem>
                                <details
                                    style={{
                                        borderBottom: "1px solid var(--tbm-rule)",
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
                                        What should I bring?
                                        <PlusIcon />
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
                                        Comfy clothes to move in, a water bottle and a
                                        small towel if you like. Then come ready to
                                        move, stretch, slow down, meditate or fire
                                        things up with a high-intensity mat Pilates
                                        class. You get to choose your own adventure.
                                    </p>
                                </details>
                            </StaggerItem>
                            <StaggerItem>
                                <details
                                    style={{
                                        borderBottom: "1px solid var(--tbm-rule)",
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
                                        Can I start if I have an injury or I&apos;m
                                        pregnant?
                                        <PlusIcon />
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
                                        In many cases, yes - but please have a chat
                                        with us before you book your first class. Every
                                        body, injury and pregnancy is different, so we
                                        want to understand where you&rsquo;re at and
                                        make sure we&rsquo;re recommending the right
                                        class and level of support for you. Depending
                                        on your circumstances, we may suggest starting
                                        with a Private Pilates session or checking in
                                        with your healthcare professional first.
                                    </p>
                                </details>
                            </StaggerItem>
                        </Stagger>
                        <Reveal amount={0.3}>
                            <div style={{ paddingTop: 40 }}>
                                <a
                                    className="tbm-btn"
                                    href="#momence-pricing"
                                    style={{
                                        background: "var(--tbm-ink)",
                                        color: "#f4f2ed",
                                    }}
                                >
                                    START MY 21 DAYS - $99
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </>
    );
}

/* Shared plus icon that rotates to a cross when the parent <details>
   is open. The rotation is driven by the global .tbm-faq rule in
   globals.css so no React state is needed and the markup stays
   crawlable for SEO.                                                 */
function PlusIcon() {
    return (
        <svg
            className="tbm-faq-ic"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            aria-hidden="true"
        >
            <path d="M8 1v14M1 8h14" />
        </svg>
    );
}
