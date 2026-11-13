/* ************************************************************
   TBM Home — Life at TBM (editorial gallery, dark charcoal).

   Split headline where the italic second half reads over a soft
   sage, body paragraph in the right column, then the editorial
   gallery. The V3 stacked three tall tiles (480 / 480 / 400); the
   same photography now runs sideways as a carousel at full
   editorial height, with the "SEE LIFE AT TBM" link underneath.
   Same vision, a third of the scroll.

   `size` is kept on the tile so the crop a wide frame was shot
   for still holds when it comes round in the carousel.
************************************************************ */

import Link from "next/link";
import type { LifeAtTbmContent } from "@/app/_config";
import GalleryCarousel from "@/components/carousel/GalleryCarousel";
import Reveal from "@/components/motion/Reveal";
import { externalLinkProps } from "@/utils/links";

export type LifeTile = {
    id: string;
    image: string;
    imageAlt: string;
    /** Where to hold the crop, so a swapped photo can be re-framed. */
    objectPosition: string;
};

type Props = {
    content: LifeAtTbmContent;
};

export default function LifeAtTbm({ content }: Props) {
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

                <GalleryCarousel tiles={content.tiles} />

                <div className="tbm-c-all">
                    <Link
                        href={content.cta.href}
                        {...externalLinkProps(content.cta.href)}
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
