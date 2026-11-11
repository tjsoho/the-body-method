"use client";

/* ************************************************************
                        NOTES
   Life at TBM — the editorial gallery as a carousel.

   The V3 grid stacked three large tiles (480 / 480 / 400 tall)
   one under the other, which on the home page is a long way to
   scroll for three photographs. The same tiles now run sideways
   at full editorial height, with a peek of the next frame so the
   row reads as a gallery you can pull through rather than a
   block that has been cropped.

   Dark section, so the controls are cream on charcoal.
************************************************************ */

/* ************************************************************
                        IMPORTS
************************************************************ */
import {
    TbmCarousel,
    TbmCarouselArrows,
    TbmCarouselDots,
    TbmCarouselSlide,
    TbmCarouselViewport,
} from "@/components/carousel/TbmCarousel";

/* ************************************************************
                        TYPES
************************************************************ */
export type GalleryTile = {
    id: string;
    image: string;
    imageAlt: string;
    /** Where to hold the crop — "center 60%" for a wide landscape. */
    objectPosition?: string;
};

type Props = {
    tiles: GalleryTile[];
};

/* ************************************************************
                        RENDER
************************************************************ */
export default function GalleryCarousel({ tiles }: Props) {
    return (
        <TbmCarousel>
            <TbmCarouselArrows
                className="tbm-c-all tbm-hide-sm"
                style={{ justifyContent: "flex-end" }}
                colour="var(--tbm-cream)"
                contrast="var(--tbm-charcoal)"
                labelPrev="Previous photograph"
                labelNext="Next photograph"
            />

            <TbmCarouselViewport
                className="tbm-c-all"
                label="Life at The Body Method"
                basis="62%"
                basisMobile="88%"
            >
                {tiles.map((tile, i) => (
                    <TbmCarouselSlide
                        key={tile.id}
                        position={i + 1}
                        total={tiles.length}
                    >
                        <div
                            className="tbm-gallery-tile"
                            style={{ position: "relative", overflow: "hidden" }}
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
                                        tile.objectPosition ?? "center",
                                }}
                            />
                        </div>
                    </TbmCarouselSlide>
                ))}
            </TbmCarouselViewport>

            <div
                className="tbm-c-all tbm-hide-lg"
                style={{ display: "flex", justifyContent: "center" }}
            >
                <TbmCarouselDots colour="var(--tbm-cream)" />
            </div>
        </TbmCarousel>
    );
}
