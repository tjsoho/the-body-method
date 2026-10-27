"use client";

/* ************************************************************
   FadeUp — the single motion primitive used across the home page.

   Mirrors the editorial reveal pattern you see on luxury sites
   (Aesop, &Daughter, Sanzpont, Oliveri): a 24px rise with a 700ms
   cubic-bezier ease, opacity 0 → 1. Triggered on the element
   entering the viewport (once).

   Props:
     delay   — stagger offset in seconds, defaults to 0
     y       — rise distance in px, defaults to 24
     amount  — intersection ratio before firing, defaults to 0.2
     once    — only fire once per scroll, defaults to true

   Respects prefers-reduced-motion automatically via framer-motion.
************************************************************ */

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
    delay?: number;
    y?: number;
    amount?: number;
    once?: boolean;
    children?: ReactNode;
    className?: string;
};

const EASE = [0.22, 0.61, 0.36, 1] as const;

export default function FadeUp({
    delay = 0,
    y = 24,
    amount = 0.2,
    once = true,
    children,
    className,
}: Props) {
    const prefersReduced = useReducedMotion();

    if (prefersReduced) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once, amount }}
            transition={{ duration: 0.9, ease: EASE, delay }}
        >
            {children}
        </motion.div>
    );
}
