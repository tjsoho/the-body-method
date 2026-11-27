"use client";

/* ************************************************************
                        NOTES
   The thing behind a hero: the client's film where there is one,
   the photograph where there is not.

   The film comes in two cuts, 16:9 and 9:16, and only one of them
   should ever be fetched. Rendering both and hiding one with CSS
   is what the home hero used to do, and it cost every phone a
   5MB download it then painted over. So the breakpoint is read
   here instead and a single <video> is rendered.

   Before hydration, and for anyone without JavaScript, this is
   the photograph. That is also the poster, so the swap is to the
   same frame the visitor is already looking at.
************************************************************ */

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

const MOBILE = "(max-width: 900px)";

export default function HeroBackdrop({
    desktopVideo,
    mobileVideo,
    poster,
    alt,
    style,
}: {
    desktopVideo?: string;
    mobileVideo?: string;
    poster: string;
    alt: string;
    style: CSSProperties;
}) {
    // null until we know, so the server and the first client paint agree.
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const mq = window.matchMedia(MOBILE);
        const read = () => setIsMobile(mq.matches);
        read();
        mq.addEventListener("change", read);
        return () => mq.removeEventListener("change", read);
    }, []);

    const src =
        isMobile === null
            ? ""
            : (isMobile ? mobileVideo : desktopVideo)?.trim() ||
              // One cut only? Use it at both sizes rather than nothing.
              (desktopVideo || mobileVideo || "").trim();

    if (!src) {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={poster} alt={alt} style={style} />;
    }

    return (
        <video
            key={src}
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            aria-label={alt}
            style={style}
        />
    );
}
