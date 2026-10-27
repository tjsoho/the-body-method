"use client";

/* ************************************************************
   Stagger — the wave reveal.

   Each child is wrapped in a StaggerItem that observes its own
   viewport entry and animates with a per-child delay = index × stagger.
   Bypasses framer-motion's parent-variant cascade (which doesn't
   fire reliably when nested inside another motion wrapper).

     damping 26  → heavy, no bounce
     stiffness 70 → slow, settling
     mass 0.9    → feels substantial
     y 56        → a real travel
     blur 10→0   → focus-in finish

   Usage:
     <Stagger>
       <StaggerItem>{card}</StaggerItem>
       <StaggerItem>{card}</StaggerItem>
     </Stagger>

   Stagger is a plain div that just hands index → child via context.
   StaggerItem reads the index and derives its delay.
************************************************************ */

import {
    createContext,
    useContext,
    Children,
    isValidElement,
    cloneElement,
} from "react";
import type { CSSProperties, ReactElement, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* Explicit tween, not a spring. Springs settle fast and can be hard
   to perceive; a 1.6s cubic ease over a 100px travel + 20px blur
   is what reads as a wave rolling across the row. */
const EASE = [0.22, 0.61, 0.36, 1] as const;
const DURATION = 1.6;

const StaggerContext = createContext<{ stagger: number; baseDelay: number }>({
    stagger: 0.35,
    baseDelay: 0.1,
});

type StaggerProps = {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    /** Seconds between each child's start. House default 350ms. */
    stagger?: number;
    /** Seconds before the first child starts. */
    delay?: number;
};

export function Stagger({
    children,
    className,
    style,
    stagger = 0.35,
    delay = 0.1,
}: StaggerProps) {
    // Walk the children and inject a per-item index so each
    // StaggerItem can derive its own delay. This keeps the API
    // simple at the call site (no `index` prop needed).
    const items = Children.toArray(children);
    let staggerIndex = 0;
    const wrapped = items.map((c) => {
        if (
            isValidElement(c) &&
            (c.type as { __stagger?: boolean })?.__stagger === true
        ) {
            const i = staggerIndex++;
            return cloneElement(c as ReactElement<{ _index?: number }>, {
                _index: i,
            });
        }
        return c;
    });

    return (
        <StaggerContext.Provider value={{ stagger, baseDelay: delay }}>
            <div className={className} style={style}>
                {wrapped}
            </div>
        </StaggerContext.Provider>
    );
}

type ItemProps = {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    /** Rise distance in px. Default 100 — a real editorial travel. */
    y?: number;
    /** Horizontal drift in px. Default -14 — slight left-to-right drift. */
    x?: number;
    /** Injected by Stagger — do not pass directly. */
    _index?: number;
};

export function StaggerItem({
    children,
    className,
    style,
    y = 100,
    x = -14,
    _index = 0,
}: ItemProps) {
    const prefersReduced = useReducedMotion();
    const { stagger, baseDelay } = useContext(StaggerContext);

    if (prefersReduced) {
        return (
            <div className={className} style={style}>
                {children}
            </div>
        );
    }

    const delay = baseDelay + _index * stagger;

    return (
        <motion.div
            className={className}
            style={style}
            initial={{
                opacity: 0,
                y,
                x,
                filter: "blur(20px)",
                scale: 0.94,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                x: 0,
                filter: "blur(0px)",
                scale: 1,
                transition: { duration: DURATION, ease: EASE, delay },
            }}
            viewport={{ once: true, amount: 0.25 }}
        >
            {children}
        </motion.div>
    );
}

// Marker so Stagger can identify its children in the tree walk.
(StaggerItem as unknown as { __stagger: boolean }).__stagger = true;
