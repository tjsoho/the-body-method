/* ************************************************************
   /classes — Classes hub.

   Hero + a column of class-type cards laid out as a 2-column
   grid at desktop (alternating c-l / c-r), each with a 3:2
   landscape, h2, intro and VIEW TIMES link. The final slot in
   the grid is a CTA card with a landscape image and two buttons.
************************************************************ */

import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
    title: "Pilates, Reformer, Yoga, Yin, Meditation & Barre Classes Tugun Beach and Cornerstone Tugun.",
    description:
        "Explore the ways you can move at The Body Method - Reformer, Mat Pilates, Yoga, Barre, Yin, Restorative Yoga and Meditation at Tugun Beach and Cornerstone.",
};

type ClassCard = {
    image: string;
    alt: string;
    title: string;
    body: string;
    side: "l" | "r";
};

const classes: ClassCard[] = [
    {
        image: "/images/tbm-placeholders/studio-tugun-reformer.jpg",
        alt: "Feet pressing the footbar of a timber Reformer",
        title: "Reformer Pilates",
        body: "Small-group Reformer at Tugun Beach with a maximum of six in a class, and personalised teacher attention.",
        side: "l",
    },
    {
        image: "/images/tbm-placeholders/landscape-mat.jpg",
        alt: "A row of people in a hundred pose on sage mats",
        title: "Mat Pilates",
        body: "Strength, control and intelligent movement using your own body and props.",
        side: "r",
    },
    {
        image: "/images/tbm-placeholders/landscape-yoga.jpg",
        alt: "People in warrior two facing tall windows full of trees",
        title: "Yoga",
        body: "Move, breathe and reconnect. Our yoga classes combine mindful movement, mobility, strength and breathwork to help you feel more grounded, open and connected to your body.",
        side: "l",
    },
    {
        image: "/images/tbm-placeholders/landscape-barre.jpg",
        alt: "Legs in grip socks in a plie at a timber barre",
        title: "Barre Pilates",
        body: "A dynamic, low-impact workout blending Pilates principles with barre-inspired movement. Expect controlled, targeted sequences designed to build strength, stability and that satisfying full-body burn.",
        side: "r",
    },
    {
        image: "/images/tbm-placeholders/landscape-yin.jpg",
        alt: "Supported butterfly pose over a bolster",
        title: "Yin Yoga",
        body: "Slow down and find space. Yin uses longer-held, mostly floor-based poses to gently work into the deeper connective tissues, improve flexibility and mobility, and give your body and mind time to unwind.",
        side: "l",
    },
    {
        image: "/images/tbm-placeholders/landscape-restore.jpg",
        alt: "Legs up the wall with bolsters and a linen blanket",
        title: "Restorative Yoga",
        body: "Rest, reset and recharge. Restorative Yoga uses gentle, fully supported poses, props and stillness to encourage deep relaxation, release tension and help your nervous system settle. Less about stretching, more about giving your body permission to truly rest.",
        side: "r",
    },
    {
        image: "/images/tbm-placeholders/landscape-med.jpg",
        alt: "Rolling a massage ball under a foot on a sage mat",
        title: "Meditation / Roll and Release + other movement",
        body: "Movement isn’t always about working harder. From guided meditation to Roll & Release and specialty movement sessions, these classes give you space to restore, release tension, explore your body differently and support your overall wellbeing.",
        side: "l",
    },
];

export default function ClassesPage() {
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
                    src="/images/tbm-placeholders/hero-classes.jpg"
                    alt="A mat Pilates class with legs raised in tabletop"
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
                        className="tbm-c-l7"
                        style={{ display: "flex", flexDirection: "column", gap: 24 }}
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
                                Find the way you want to move today.
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
                                Strength, control, mobility, stretching, energy and stillness - different days ask different things of us.
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.16}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 17,
                                    lineHeight: 1.6,
                                    maxWidth: "34em",
                                    color: "#ece9e2",
                                }}
                            >
                                Explore the ways you can move across The Body Method.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ CLASS CARDS ============ */}
            <section
                style={{
                    paddingTop: 75,
                    paddingBottom: 75,
                    background: "var(--tbm-cream)",
                    color: "var(--tbm-ink)",
                    fontFamily: "var(--font-lora)",
                }}
            >
                <Stagger
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 75 }}
                    stagger={0.2}
                >
                    {classes.map((c) => (
                        <StaggerItem
                            key={c.title}
                            className={c.side === "l" ? "tbm-c-l" : "tbm-c-r"}
                            style={{
                                paddingRight: c.side === "l" ? "clamp(0px, 2vw, 24px)" : undefined,
                                paddingLeft: c.side === "r" ? "clamp(0px, 2vw, 24px)" : undefined,
                                display: "flex",
                                flexDirection: "column",
                                gap: 20,
                            }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={c.image}
                                alt={c.alt}
                                style={{
                                    width: "100%",
                                    aspectRatio: "3 / 2",
                                    objectFit: "cover",
                                    objectPosition: "center 45%",
                                }}
                            />
                            <h2
                                style={{
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: "clamp(30px, 3vw, 40px)",
                                    lineHeight: 1.1,
                                    marginTop: 8,
                                }}
                            >
                                {c.title}
                            </h2>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-muted)",
                                    maxWidth: "34em",
                                }}
                            >
                                {c.body}
                            </p>
                            <div style={{ marginTop: "auto", paddingTop: 4 }}>
                                <a
                                    className="tbm-lnk"
                                    href="#momence-timetable"
                                    style={{ color: "var(--tbm-forest)" }}
                                >
                                    VIEW TIMES <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </StaggerItem>
                    ))}

                    {/* Final slot — CTA card. Lives in the same 2-col grid so it
                       sits beside the last class card. */}
                    <StaggerItem
                        className="tbm-c-r"
                        style={{
                            paddingLeft: "clamp(0px, 2vw, 24px)",
                            display: "flex",
                            flexDirection: "column",
                            gap: 20,
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/tbm-placeholders/landscape-tugun-studio-morning.jpg"
                            alt="An empty Reformer studio in early morning light"
                            style={{
                                width: "100%",
                                aspectRatio: "3 / 2",
                                objectFit: "cover",
                                objectPosition: "center",
                            }}
                        />
                        <div
                            style={{
                                display: "flex",
                                gap: 16,
                                flexWrap: "wrap",
                                paddingTop: 8,
                            }}
                        >
                            <a
                                className="tbm-btn"
                                href="#momence-timetable"
                                style={{ background: "var(--tbm-ink)", color: "var(--tbm-cream)" }}
                            >
                                VIEW FULL TIMETABLE
                            </a>
                            <a
                                className="tbm-btn"
                                href="/book"
                                style={{
                                    color: "var(--tbm-ink)",
                                    border: "1px solid var(--tbm-ink)",
                                }}
                            >
                                BOOK A CLASS
                            </a>
                        </div>
                    </StaggerItem>
                </Stagger>
            </section>
        </>
    );
}
