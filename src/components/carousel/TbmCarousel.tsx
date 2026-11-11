"use client";

/* ************************************************************
                        NOTES
   TbmCarousel — the house horizontal carousel.

   One Embla instance published through context so a section can
   put its arrows wherever the layout wants them (beside the
   heading, under the track) and still drive the same slides.

   Sizing is CSS-variable driven (see .tbm-car-* in globals.css):
   --tbm-car-basis sets the slide width above 900px and
   --tbm-car-basis-sm below it, so one piece of markup renders
   three-up on desktop and one-card-plus-a-peek on a phone. No
   duplicated cards, so every card has one place in the DOM.
************************************************************ */

/* ************************************************************
                        IMPORTS
************************************************************ */
import useEmblaCarousel from "embla-carousel-react";
import { useReducedMotion } from "framer-motion";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import type { CSSProperties, ReactNode } from "react";

/* ************************************************************
                        Hooks
************************************************************ */
type CarouselCtx = {
    emblaRef: ReturnType<typeof useEmblaCarousel>[0];
    scrollPrev: () => void;
    scrollNext: () => void;
    scrollTo: (index: number) => void;
    canScrollPrev: boolean;
    canScrollNext: boolean;
    selectedIndex: number;
    snapCount: number;
    /** Milliseconds between automatic slides, 0 when it does not advance. */
    autoplayMs: number;
    /** True while hovered, focused or held by the parent. */
    paused: boolean;
    setHovered: (v: boolean) => void;
};

const Ctx = createContext<CarouselCtx | null>(null);

function useTbmCarousel(): CarouselCtx {
    const ctx = useContext(Ctx);
    if (!ctx) {
        throw new Error("TbmCarousel parts must sit inside <TbmCarousel>");
    }
    return ctx;
}

/* ************************************************************
                        Components
************************************************************ */

type RootProps = {
    children: ReactNode;
    /** Jump to this slide index when it changes (deep links, card taps). */
    activeIndex?: number;
    /**
     * Milliseconds between automatic slides. Omit for a track that only
     * moves when someone moves it. Autoplay loops, so the row never
     * stalls on the last card.
     */
    autoplay?: number;
    /** Hold autoplay from outside — a modal is open over the track. */
    autoplayPaused?: boolean;
};

/** Provider only — renders no DOM, so it can wrap a whole grid. */
export function TbmCarousel({
    children,
    activeIndex,
    autoplay = 0,
    autoplayPaused = false,
}: RootProps) {
    const prefersReduced = useReducedMotion();
    // Reduced motion means no automatic movement at all, so the track
    // also stops looping and goes back to hard ends with disabled arrows.
    const autoplayMs = prefersReduced ? 0 : autoplay;
    const loop = autoplayMs > 0;
    const [emblaRef, embla] = useEmblaCarousel({
        align: "start",
        containScroll: loop ? undefined : "trimSnaps",
        loop,
        duration: prefersReduced ? 0 : 28,
    });

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [snapCount, setSnapCount] = useState(0);
    const [hovered, setHovered] = useState(false);
    const paused = hovered || autoplayPaused;

    const sync = useCallback(() => {
        if (!embla) return;
        setCanScrollPrev(embla.canScrollPrev());
        setCanScrollNext(embla.canScrollNext());
        setSelectedIndex(embla.selectedScrollSnap());
        setSnapCount(embla.scrollSnapList().length);
    }, [embla]);

    useEffect(() => {
        if (!embla) return;
        sync();
        embla.on("select", sync);
        embla.on("reInit", sync);
        return () => {
            embla.off("select", sync);
            embla.off("reInit", sync);
        };
    }, [embla, sync]);

    // Autoplay. selectedIndex is in the deps on purpose: every slide
    // change restarts the clock, so moving by hand or by arrow gives
    // you a full interval before the next automatic step, and the
    // progress dash below stays in step with it.
    useEffect(() => {
        if (!embla || autoplayMs <= 0 || paused) return;
        const timer = window.setInterval(() => {
            // Browsers throttle background tabs; without this the track
            // would jump several slides the moment you came back.
            if (document.hidden) return;
            embla.scrollNext();
        }, autoplayMs);
        return () => window.clearInterval(timer);
    }, [embla, autoplayMs, paused, selectedIndex]);

    // Let a parent drive the track (a teacher card opening its profile,
    // or a #hash landing on a specific slide).
    useEffect(() => {
        if (!embla || activeIndex === undefined) return;
        embla.scrollTo(activeIndex);
    }, [embla, activeIndex]);

    const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);
    const scrollTo = useCallback(
        (index: number) => embla?.scrollTo(index),
        [embla],
    );

    return (
        <Ctx.Provider
            value={{
                emblaRef,
                scrollPrev,
                scrollNext,
                scrollTo,
                canScrollPrev,
                canScrollNext,
                selectedIndex,
                snapCount,
                autoplayMs,
                paused,
                setHovered,
            }}
        >
            {children}
        </Ctx.Provider>
    );
}

type ViewportProps = {
    children: ReactNode;
    /** Accessible name for the carousel region, e.g. "Our teachers". */
    label: string;
    /** Slide width above 900px. */
    basis: string;
    /** Slide width at 900px and below — leave a peek of the next card. */
    basisMobile: string;
    gap?: number;
    gapMobile?: number;
    className?: string;
    style?: CSSProperties;
};

export function TbmCarouselViewport({
    children,
    label,
    basis,
    basisMobile,
    gap = 24,
    gapMobile = 16,
    className,
    style,
}: ViewportProps) {
    const { emblaRef, scrollPrev, scrollNext, setHovered } =
        useTbmCarousel();

    return (
        <div
            className={className}
            style={style}
            role="region"
            aria-roledescription="carousel"
            aria-label={label}
            tabIndex={0}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            onFocusCapture={() => setHovered(true)}
            onBlurCapture={() => setHovered(false)}
            onKeyDown={(e) => {
                if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    scrollPrev();
                } else if (e.key === "ArrowRight") {
                    e.preventDefault();
                    scrollNext();
                }
            }}
        >
            <div
                className="tbm-car-vp"
                ref={emblaRef}
                style={
                    {
                        "--tbm-car-basis": basis,
                        "--tbm-car-basis-sm": basisMobile,
                        "--tbm-car-gap": `${gap}px`,
                        "--tbm-car-gap-sm": `${gapMobile}px`,
                    } as CSSProperties
                }
            >
                <div className="tbm-car-track">{children}</div>
            </div>
        </div>
    );
}

type SlideProps = {
    children: ReactNode;
    /** 1-based position, announced to screen readers. */
    position: number;
    total: number;
    className?: string;
    style?: CSSProperties;
};

export function TbmCarouselSlide({
    children,
    position,
    total,
    className,
    style,
}: SlideProps) {
    return (
        <div
            className={`tbm-car-slide${className ? ` ${className}` : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${position} of ${total}`}
            style={style}
        >
            {children}
        </div>
    );
}

type ArrowProps = {
    /** Ink on light sections, cream on charcoal and forest. */
    colour: string;
    /** Background the filled "next" button sits on. */
    contrast: string;
    labelPrev?: string;
    labelNext?: string;
    className?: string;
    style?: CSSProperties;
};

/** One circle. Filled for "next", outlined for "previous". */
function Arrow({
    direction,
    colour,
    contrast,
    label,
    className,
}: {
    direction: "prev" | "next";
    colour: string;
    contrast: string;
    label: string;
    className?: string;
}) {
    const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
        useTbmCarousel();
    const isNext = direction === "next";

    return (
        <button
            type="button"
            className={`tbm-car-btn${className ? ` ${className}` : ""}`}
            aria-label={label}
            disabled={isNext ? !canScrollNext : !canScrollPrev}
            onClick={isNext ? scrollNext : scrollPrev}
            style={{
                border: `1px solid ${colour}`,
                background: isNext ? colour : "transparent",
                color: isNext ? contrast : colour,
            }}
        >
            <span aria-hidden="true">{isNext ? "\u2192" : "\u2190"}</span>
        </button>
    );
}

export function TbmCarouselArrows({
    colour,
    contrast,
    labelPrev = "Previous",
    labelNext = "Next",
    className,
    style,
}: ArrowProps) {
    const { snapCount } = useTbmCarousel();

    // Nothing to scroll (every slide already fits, or Embla has not
    // initialised yet) — no point showing a dead pair of circles.
    if (snapCount < 2) return null;

    return (
        <div
            className={className}
            style={{ display: "flex", gap: 12, ...style }}
        >
            <Arrow
                direction="prev"
                colour={colour}
                contrast={contrast}
                label={labelPrev}
            />
            <Arrow
                direction="next"
                colour={colour}
                contrast={contrast}
                label={labelNext}
            />
        </div>
    );
}

type DotsProps = {
    colour: string;
    className?: string;
    style?: CSSProperties;
};

export function TbmCarouselDots({ colour, className, style }: DotsProps) {
    const { snapCount, selectedIndex, scrollTo, autoplayMs, paused } =
        useTbmCarousel();

    if (snapCount < 2) return null;

    return (
        <div
            className={`tbm-car-dots${className ? ` ${className}` : ""}`}
            data-autoplay={autoplayMs > 0}
            data-paused={paused}
            style={
                {
                    color: colour,
                    "--tbm-dot-dur": `${autoplayMs}ms`,
                    ...style,
                } as CSSProperties
            }
        >
            {Array.from({ length: snapCount }).map((_, i) => (
                <button
                    key={i}
                    type="button"
                    className="tbm-car-dot"
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === selectedIndex}
                    onClick={() => scrollTo(i)}
                >
                    {/* Keyed on the selected slide so the fill animation
                        restarts cleanly every time the track moves. */}
                    <span
                        key={selectedIndex}
                        className="tbm-car-dot-fill"
                        aria-hidden="true"
                    />
                </button>
            ))}
        </div>
    );
}

/**
 * The control row under a track: the position dashes centred, the
 * arrow pair together at the right. Three grid columns rather than a
 * flex row, so the dashes stay on the centre line of the section
 * whether or not the arrows are there — on a phone they step aside
 * and the track is swiped instead.
 */
export function TbmCarouselPager({
    colour,
    contrast,
    labelPrev = "Previous",
    labelNext = "Next",
    className,
    style,
}: ArrowProps) {
    const { snapCount } = useTbmCarousel();

    if (snapCount < 2) return null;

    return (
        <div
            className={className}
            style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                alignItems: "center",
                gap: 16,
                ...style,
            }}
        >
            <span aria-hidden="true" />
            <TbmCarouselDots colour={colour} />
            <div
                className="tbm-hide-sm"
                style={{ display: "flex", gap: 12, justifySelf: "end" }}
            >
                <Arrow
                    direction="prev"
                    colour={colour}
                    contrast={contrast}
                    label={labelPrev}
                />
                <Arrow
                    direction="next"
                    colour={colour}
                    contrast={contrast}
                    label={labelNext}
                />
            </div>
        </div>
    );
}
