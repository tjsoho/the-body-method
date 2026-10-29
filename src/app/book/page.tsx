/* ************************************************************
   TBM — Book.

   Utility page. Short forest band hero (no photo) then five
   "what would you like to do?" rows wired to Momence placeholders.
   Built from design/book.html; copy is the client-approved master
   and must not be rewritten.
************************************************************ */

import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export const metadata: Metadata = {
    title: "Book | The Body Method",
    description:
        "Book Reformer Pilates, mat Pilates, yoga, barre or Private Pilates at The Body Method. Start the 21-Day Immersion, view the timetable or sign in as a member.",
};

type BookRow = {
    heading: string;
    body?: string;
    cta: string;
    href: string;
    primary?: boolean;
};

const rows: BookRow[] = [
    {
        heading: "I'M NEW",
        body: "Start with 21 days across both studios for $99.",
        cta: "START MY 21 DAYS",
        href: "#momence-21-days",
        primary: true,
    },
    {
        heading: "I WANT TO BOOK A CLASS",
        body: "See what's on and find a time that works.",
        cta: "VIEW TIMETABLE",
        href: "#momence-timetable",
    },
    {
        heading: "I WANT PRIVATE PILATES",
        body: "One-to-one movement built around you.",
        cta: "EXPLORE PRIVATE PILATES",
        href: "#momence-private",
    },
    {
        heading: "I WANT SEMI-PRIVATE PILATES",
        cta: "ENQUIRE",
        href: "#momence-semi-private",
    },
    {
        heading: "I'M ALREADY A MEMBER",
        body: "Hello again.",
        cta: "BOOK / MEMBER LOGIN",
        href: "#momence-login",
    },
];

export default function BookPage() {
    return (
        <>
            {/* ============ HERO (short forest band, no photo) ============ */}
            <section
                style={{
                    background: "var(--tbm-forest)",
                    color: "#f4f2ed",
                    marginTop: -85,
                    paddingTop: "calc(85px + 96px)",
                    paddingBottom: 75,
                }}
            >
                <div className="tbm-wrap tbm-g12">
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
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: "clamp(42px, 5.4vw, 80px)",
                                    lineHeight: 1.04,
                                    letterSpacing: "-.015em",
                                    textWrap: "balance",
                                }}
                            >
                                What would you like to do?
                            </h1>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ ROUTING ROWS ============ */}
            <section
                style={{
                    paddingTop: 75,
                    paddingBottom: 75,
                    background: "var(--tbm-cream)",
                    color: "var(--tbm-ink)",
                }}
            >
                <Stagger
                    className="tbm-wrap tbm-g12"
                    style={{
                        listStyle: "none",
                        margin: "0 auto",
                        borderBottom: "1px solid var(--tbm-rule)",
                        paddingTop: 0,
                        paddingBottom: 0,
                    }}
                    stagger={0.18}
                >
                    {rows.map((row) => (
                        <StaggerItem
                            key={row.heading}
                            className="tbm-c-all tbm-g12"
                            style={{
                                rowGap: 16,
                                alignItems: "center",
                                borderTop: "1px solid var(--tbm-rule)",
                                padding: "32px 0",
                            }}
                        >
                            <h2
                                className="tbm-book-h"
                                style={{
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: "clamp(26px, 2.4vw, 34px)",
                                    lineHeight: 1.2,
                                }}
                            >
                                {row.heading}
                            </h2>
                            {row.body ? (
                                <p
                                    className="tbm-book-d"
                                    style={{
                                        margin: 0,
                                        fontSize: 18,
                                        lineHeight: 1.6,
                                        color: "var(--tbm-text-body)",
                                    }}
                                >
                                    {row.body}
                                </p>
                            ) : (
                                <div
                                    className="tbm-book-d tbm-hide-sm"
                                    aria-hidden="true"
                                />
                            )}
                            <div className="tbm-book-b">
                                <a
                                    className="tbm-btn"
                                    href={row.href}
                                    style={
                                        row.primary
                                            ? {
                                                  background: "var(--tbm-ink)",
                                                  color: "#f4f2ed",
                                                  width: "100%",
                                              }
                                            : {
                                                  color: "var(--tbm-ink)",
                                                  border: "1px solid var(--tbm-ink)",
                                                  width: "100%",
                                              }
                                    }
                                >
                                    {row.cta}
                                </a>
                            </div>
                        </StaggerItem>
                    ))}
                </Stagger>
            </section>
        </>
    );
}
