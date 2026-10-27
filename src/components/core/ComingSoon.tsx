/* ************************************************************
   Shared "Coming soon" placeholder for the TBM nav routes that
   are stubbed out while the home page is in build. Takes the
   same colour tokens as the live sections so the holding page
   doesn't look foreign while the real content is in progress.
************************************************************ */

import Link from "next/link";

type Props = {
    label: string;
    title: string;
    body: string;
};

export default function ComingSoon({ label, title, body }: Props) {
    return (
        <section
            style={{
                minHeight: "70vh",
                paddingTop: 160,
                paddingBottom: 160,
                background: "var(--tbm-cream)",
                color: "var(--tbm-ink)",
                fontFamily: "var(--font-lora)",
                display: "flex",
                alignItems: "center",
            }}
        >
            <div
                className="tbm-wrap"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 32,
                    maxWidth: 760,
                }}
            >
                <span
                    className="tbm-lbl"
                    style={{ color: "var(--tbm-bronze-label)" }}
                >
                    {label} — coming soon
                </span>
                <h1
                    style={{
                        margin: 0,
                        fontWeight: 400,
                        fontSize: "clamp(36px, 4.6vw, 64px)",
                        lineHeight: 1.1,
                        letterSpacing: "-.01em",
                    }}
                >
                    {title}
                </h1>
                <p
                    style={{
                        margin: 0,
                        fontSize: 18,
                        lineHeight: 1.7,
                        color: "var(--tbm-text-body)",
                    }}
                >
                    {body}
                </p>
                <Link
                    href="/"
                    className="tbm-lnk"
                    style={{ color: "var(--tbm-forest)" }}
                >
                    BACK TO HOME <span aria-hidden="true">→</span>
                </Link>
            </div>
        </section>
    );
}
