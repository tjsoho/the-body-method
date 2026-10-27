"use client";

/* ************************************************************
   Reveal — a single-element entry animation.

   Use for headlines, paragraphs, images and buttons that should
   float in on scroll without needing a Stagger parent. The look
   matches StaggerItem exactly (same spring, same travel) so a
   Reveal + Stagger row read as one choreography.

   Pass `delay` directly to sequence multiple Reveals by hand
   (e.g. headline delay 0, body delay 0.15, image delay 0.3) when
   you want a mini-stagger without a parent container.
************************************************************ */

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const EASE = [0.22, 0.61, 0.36, 1] as const;
const DURATION = 1.1;

type Props = {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    /** Seconds to wait before firing. */
    delay?: number;
    /** Rise distance in px. Default 40. */
    y?: number;
    /** Horizontal drift in px. Default -4. */
    x?: number;
    /** Fraction of the element that must be in view (0–1). */
    amount?: number;
    /** Only fire once. Defaults true. */
    once?: boolean;
};

export default function Reveal({
    children,
    className,
    style,
    delay = 0,
    y = 40,
    x = -4,
    amount = 0.3,
    once = true,
}: Props) {
    const prefersReduced = useReducedMotion();

    if (prefersReduced) {
        return (
            <div className={className} style={style}>
                {children}
            </div>
        );
    }

    return (
        <motion.div
            className={className}
            style={style}
            initial={{
                opacity: 0,
                y,
                x,
                filter: "blur(6px)",
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                x: 0,
                filter: "blur(0px)",
                transition: {
                    duration: DURATION,
                    ease: EASE,
                    delay,
                },
            }}
            viewport={{ once, amount }}
        >
            {children}
        </motion.div>
    );
}
