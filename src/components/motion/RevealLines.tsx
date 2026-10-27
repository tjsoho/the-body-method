"use client";

/* ************************************************************
   RevealLines — the display-headline mask reveal.

   Wraps a block of text inside an overflow:hidden mask and slides
   the text up from behind it (y: 110% → 0%) with a 1.2s cubic ease.
   Looks like a line being drawn from above, not a fade.

   Use this on section display headings where the eye lands first.
   For body copy, prefer a FadeUp or let the Stagger parent handle
   the reveal — words sliding behind a mask on paragraphs reads as
   technical, not luxe.
************************************************************ */

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const EASE = [0.22, 0.61, 0.36, 1] as const;

type Props = {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    /** Seconds to wait before the slide starts. */
    delay?: number;
    /** How much of the mask must be visible to trigger (0–1). */
    amount?: number;
    /** Reveal duration in seconds. Keep slow for display headlines. */
    duration?: number;
};

export default function RevealLines({
    children,
    className,
    style,
    delay = 0,
    amount = 0.5,
    duration = 1.2,
}: Props) {
    const prefersReduced = useReducedMotion();

    if (prefersReduced) {
        return (
            <span className={className} style={style}>
                {children}
            </span>
        );
    }

    return (
        <span
            className={className}
            style={{ display: "block", overflow: "hidden", ...style }}
        >
            <motion.span
                style={{ display: "block" }}
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, amount }}
                transition={{ duration, ease: EASE, delay }}
            >
                {children}
            </motion.span>
        </span>
    );
}
