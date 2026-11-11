/* ************************************************************
   TBM Home — Great teaching.

   Sand background. Split headline with italic green-accent second
   half, side paragraph, italic closer. Underneath, the teaching
   roster rides a carousel — three at a time on desktop, one card
   and a peek of the next on a phone — so the home page stays
   curated rather than growing with every new teacher. Each card
   links through to that teacher's profile on /our-people.
************************************************************ */

import type { GreatTeachingContent } from "@/app/_config";
import Reveal from "@/components/motion/Reveal";
import TeacherStrip from "@/components/carousel/TeacherStrip";
import type { Teacher } from "@/data/teachers";

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

                <TeacherStrip teachers={teachers} cta={content.cta} />
            </div>
        </section>
    );
}
