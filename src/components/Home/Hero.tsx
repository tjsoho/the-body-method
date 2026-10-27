/* ************************************************************
   TBM Home — Hero.

   Full-width photo (will be replaced with a 16:9 desktop + 9:16 mobile
   video loop once the shoot is finished). Dark double-gradient from the
   left and bottom so the headline + body copy pass WCAG AA on top of
   any photo in the final set. Content comes from `content.hero` (CMS)
   with fallbacks from _config.ts.

   Progress bar and pause button on the right are placeholders for the
   future video controls — kept here so the design is faithful and so
   the slot exists to wire the real controls into later.
************************************************************ */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { HeroContent } from "@/app/_config";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function Hero({ content }: { content: HeroContent }) {
    return (
        <section
            style={{
                position: "relative",
                minHeight: 880,
                marginTop: -85,
                paddingTop: 85,
                color: "#f4f2ed",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            {/* Background image (placeholder — swap for <video> loop later).
                Ambient Ken-Burns pan brings the still to life until the
                real looped footage lands. 24s cycle, scale 1 → 1.08.    */}
            <motion.img
                src={content.fallbackImage}
                alt={content.fallbackImageAlt}
                initial={{ scale: 1.02 }}
                animate={{ scale: 1.08 }}
                transition={{
                    duration: 24,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 40%",
                    transformOrigin: "center center",
                }}
            />
            {/* Double-gradient overlay for WCAG AA on hero text. */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(90deg, rgba(0,0,0,.6) 0%, rgba(0,0,0,.32) 45%, rgba(0,0,0,0) 75%), linear-gradient(180deg, rgba(0,0,0,.32) 0%, rgba(0,0,0,.08) 30%, rgba(0,0,0,.5) 62%, rgba(0,0,0,.85) 100%)",
                }}
            />

            <div
                className="tbm-wrap tbm-g12"
                style={{
                    position: "relative",
                    marginTop: "auto",
                    paddingBottom: 64,
                    alignItems: "end",
                    rowGap: 32,
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
                    <motion.h1
                        initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
                        style={{
                            textShadow: "0 1px 24px rgba(0,0,0,.25)",
                            margin: 0,
                            fontWeight: 400,
                            fontSize: "clamp(42px, 5.4vw, 80px)",
                            lineHeight: 1.04,
                            letterSpacing: "-.015em",
                            textWrap: "balance",
                            fontFamily: "var(--font-lora)",
                        }}
                    >
                        {content.heading}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
                        style={{
                            margin: 0,
                            fontSize: 21,
                            lineHeight: 1.5,
                            maxWidth: "34em",
                            fontStyle: "italic",
                            color: "#f4f2ed",
                            fontFamily: "var(--font-lora)",
                        }}
                    >
                        {content.italicSubheading}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
                        style={{
                            margin: 0,
                            fontSize: 17,
                            lineHeight: 1.6,
                            maxWidth: "34em",
                            color: "#ece9e2",
                            fontFamily: "var(--font-lora)",
                        }}
                    >
                        {content.body}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
                        className="tbm-hero-ctas"
                        style={{
                            display: "flex",
                            gap: 16,
                            flexWrap: "wrap",
                            paddingTop: 8,
                        }}
                    >
                        <Link
                            href={content.primaryCta.href}
                            className="tbm-btn tbm-hero-cta"
                            style={{ background: "#f4f2ed", color: "#1b2518" }}
                        >
                            {content.primaryCta.label}
                        </Link>
                        <Link
                            href={content.secondaryCta.href}
                            className="tbm-btn tbm-hero-cta"
                            style={{
                                color: "#f4f2ed",
                                border: "1px solid rgba(244,242,237,.7)",
                            }}
                        >
                            {content.secondaryCta.label}
                        </Link>
                    </motion.div>
                </div>

                {/* Video progress + pause slot (right column, hidden on mobile). */}
                <div
                    className="tbm-hide-sm"
                    style={{
                        gridColumn: "10 / 13",
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        height: 48,
                    }}
                >
                    <div style={{ display: "flex", gap: 6, flex: 1 }}>
                        <div
                            style={{
                                flex: 1,
                                height: 2,
                                background: "#f4f2ed",
                            }}
                        />
                        <div
                            style={{
                                flex: 1,
                                height: 2,
                                background: "rgba(244,242,237,.3)",
                            }}
                        />
                        <div
                            style={{
                                flex: 1,
                                height: 2,
                                background: "rgba(244,242,237,.3)",
                            }}
                        />
                    </div>
                    <button
                        type="button"
                        aria-label="Pause film"
                        style={{
                            width: 44,
                            height: 44,
                            borderRadius: "50%",
                            border: "1px solid rgba(244,242,237,.6)",
                            background: "transparent",
                            color: "#f4f2ed",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                    >
                        <svg
                            width="12"
                            height="14"
                            viewBox="0 0 12 14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            aria-hidden="true"
                        >
                            <line x1="3" y1="1" x2="3" y2="13" />
                            <line x1="9" y1="1" x2="9" y2="13" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
