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

const SOFT_SPRING = {
    type: "spring" as const,
    damping: 26,
    stiffness: 70,
    mass: 0.9,
};

const StaggerContext = createContext<{ stagger: number; baseDelay: number }>({
    stagger: 0.14,
    baseDelay: 0.12,
});

type StaggerProps = {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    /** Seconds between each child's start. */
    stagger?: number;
    /** Seconds before the first child starts. */
    delay?: number;
};

export function Stagger({
    children,
    className,
    style,
    stagger = 0.14,
    delay = 0.12,
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
    /** Rise distance in px. Default 56. */
    y?: number;
    /** Injected by Stagger — do not pass directly. */
    _index?: number;
};

export function StaggerItem({
    children,
    className,
    style,
    y = 56,
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
            initial={{ opacity: 0, y, filter: "blur(10px)" }}
            whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { ...SOFT_SPRING, delay },
            }}
            viewport={{ once: true, amount: 0.15 }}
        >
            {children}
        </motion.div>
    );
}

// Marker so Stagger can identify its children in the tree walk.
(StaggerItem as unknown as { __stagger: boolean }).__stagger = true;
