/* ************************************************************
   TBM Home — Great teaching.

   Sand background. Split headline with italic green-accent second
   half, side paragraph, italic closer. Underneath, a four-up row
   of teacher cards (portrait photo + name + short intro), then a
   "MEET OUR PEOPLE" link.
************************************************************ */

import Link from "next/link";
import type { GreatTeachingContent } from "@/app/_config";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import Reveal from "@/components/motion/Reveal";

export type Teacher = {
    id: string;
    name: string;
    intro: string;
    image: string;
    imageAlt: string;
};

type Props = {
    content: GreatTeachingContent;
    teachers: Teacher[];
};

export default function GreatTeaching({ content, teachers }: Props) {
    return (
        <section
            style={{
                background: "var(--tbm-sand)",
                paddingTop: 75,
                paddingBottom: 75,
                color: "var(--tbm-ink)",
                fontFamily: "var(--font-lora)",
            }}
        >
            <div
                className="tbm-wrap tbm-g12"
                style={{ rowGap: 64, alignItems: "start" }}
            >
                <Reveal className="tbm-c-l" style={{ paddingRight: 24 }} amount={0.3}>
                    <h2
                        style={{
                            margin: 0,
                            fontWeight: 400,
                            fontSize: "clamp(36px, 4vw, 56px)",
                            lineHeight: 1.1,
                        }}
                    >
                        {content.headingLead}
                        <em style={{ color: "var(--tbm-green-accent)" }}>
                            {content.headingItalic}
                        </em>
                    </h2>
                </Reveal>
                <Reveal
                    delay={0.08}
                    amount={0.25}
                    className="tbm-c-r"
                    style={{ paddingTop: 8 }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 16,
                            fontSize: 18,
                            lineHeight: 1.7,
                            color: "var(--tbm-text-body)",
                        }}
                    >
                        {content.body.map((para, i) => (
                            <p key={i} style={{ margin: 0 }}>
                                {para}
                            </p>
                        ))}
                        <p
                            style={{
                                margin: 0,
                                fontStyle: "italic",
                                fontSize: 21,
                                lineHeight: 1.5,
                                color: "var(--tbm-ink)",
                            }}
                        >
                            {content.italicCloser}
                        </p>
                    </div>
                </Reveal>

                <Stagger
                    className="tbm-c-all tbm-g12"
                    style={{ rowGap: 48 }}
                    stagger={0.1}
                >
                    {teachers.slice(0, 4).map((t) => (
                        <StaggerItem
                            key={t.id}
                            className="tbm-c-q"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 16,
                            }}
                        >
                            <div style={{ position: "relative" }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={t.image}
                                    alt={t.imageAlt}
                                    style={{
                                        width: "100%",
                                        aspectRatio: "4 / 5",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>
                            <h3
                                style={{
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: 22,
                                    lineHeight: 1.3,
                                }}
                            >
                                {t.name}
                            </h3>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.6,
                                    color: "var(--tbm-text-muted)",
                                }}
                            >
                                {t.intro}
                            </p>
                        </StaggerItem>
                    ))}
                </Stagger>

                <div className="tbm-c-all">
                    <Link
                        href={content.cta.href}
                        className="tbm-lnk"
                        style={{ color: "var(--tbm-forest)" }}
                    >
                        {content.cta.label} <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
