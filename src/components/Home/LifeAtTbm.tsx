/* ************************************************************
   TBM Home — Life at TBM (editorial grid, dark charcoal).

   Split headline where the italic second half reads over a soft
   sage, body paragraph in the right column, then an editorial
   gallery: an 8/4 pair on the first row and a full-width image
   underneath. Each tile is a dark window the real photography
   fills — grid cells are 480px / 480px / 400px tall per the V3.
************************************************************ */

import Link from "next/link";
import type { LifeAtTbmContent } from "@/app/_config";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import Reveal from "@/components/motion/Reveal";

export type LifeTile = {
    id: string;
    image: string;
    imageAlt: string;
    size: "wide-8" | "narrow-4" | "wide-all";
};

type Props = {
    content: LifeAtTbmContent;
    tiles: LifeTile[];
};

const TILE_HEIGHT: Record<LifeTile["size"], number> = {
    "wide-8": 480,
    "narrow-4": 480,
    "wide-all": 400,
};

const TILE_SPAN_CLASS: Record<LifeTile["size"], string> = {
    "wide-8": "tbm-c-8",
    "narrow-4": "tbm-c-4",
    "wide-all": "tbm-c-all",
};

export default function LifeAtTbm({ content, tiles }: Props) {
    return (
        <section
            id="life-at-tbm"
            style={{
                background: "var(--tbm-charcoal)",
                color: "var(--tbm-cream)",
                paddingTop: 75,
                paddingBottom: 75,
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
                        <em style={{ color: "var(--tbm-on-dark-sage-soft)" }}>
                            {content.headingItalic}
                        </em>
                    </h2>
                </Reveal>
                <Reveal
                    delay={0.08}
                    amount={0.3}
                    className="tbm-c-r"
                    style={{ paddingTop: 8 }}
                >
                    <p
                        style={{
                            margin: 0,
                            fontSize: 18,
                            lineHeight: 1.7,
                            color: "var(--tbm-on-dark-body)",
                            maxWidth: "34em",
                        }}
                    >
                        {content.body}
                    </p>
                </Reveal>

                <Stagger
                    className="tbm-c-all tbm-g12"
                    style={{ rowGap: 24 }}
                    stagger={0.22}
                >
                    {tiles.map((tile) => (
                        <StaggerItem
                            key={tile.id}
                            className={TILE_SPAN_CLASS[tile.size]}
                            style={{
                                position: "relative",
                                height: TILE_HEIGHT[tile.size],
                                overflow: "hidden",
                            }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={tile.image}
                                alt={tile.imageAlt}
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition:
                                        tile.size === "wide-all"
                                            ? "center 60%"
                                            : "center",
                                }}
                            />
                        </StaggerItem>
                    ))}
                </Stagger>

                <div className="tbm-c-all">
                    <Link
                        href={content.cta.href}
                        className="tbm-lnk"
                        style={{ color: "var(--tbm-cream)" }}
                    >
                        {content.cta.label} <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
