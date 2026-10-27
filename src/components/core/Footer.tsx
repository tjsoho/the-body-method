"use client";

/* ************************************************************
   TBM footer.

   Mirrors the approved V3: forest background, wordmark top-left,
   two nav columns (approved footer link set + secondary links). The
   "Careers / Teach With Us" link opens the careers popup — stub for
   now, built in a follow-up turn.

   Content is static here because Sarah signed off the exact link labels
   and destinations. Any change should go through her, not an untracked
   admin edit — so this stays source-controlled rather than CMS.
************************************************************ */

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();
    if (pathname?.startsWith("/admin")) return null;

    return (
        <footer
            style={{
                background: "#1b2518",
                color: "#dfdede",
                paddingTop: 75,
                paddingBottom: 75,
                fontFamily: "var(--font-lora)",
            }}
        >
            <div
                className="tbm-wrap tbm-g12"
                style={{ rowGap: 48, alignItems: "start" }}
            >
                <div className="tbm-c-l5">
                    <Link
                        href="/"
                        aria-label="The Body Method home"
                        style={{
                            display: "inline-block",
                            color: "#f4f2ed",
                            textDecoration: "none",
                            border: "1px solid rgba(244,242,237,.7)",
                            padding: "8px 14px 10px",
                            fontSize: 17,
                            letterSpacing: ".3em",
                            whiteSpace: "nowrap",
                        }}
                    >
                        <em>the</em>.body.method
                    </Link>
                </div>

                <nav
                    className="tbm-c-f3"
                    aria-label="Footer"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                        fontSize: 15,
                        lineHeight: 1.4,
                    }}
                >
                    <span style={{ color: "#dfdede" }}>Gift cards: TBC with Momence</span>
                    <a
                        href="https://www.thebodymethod.com.au/terms-policies"
                        style={{ color: "#dfdede" }}
                    >
                        Membership Terms
                    </a>
                    <a
                        href="https://www.thebodymethod.com.au/terms-policies#attendance-cancellations"
                        style={{ color: "#dfdede" }}
                    >
                        Cancellation Policy
                    </a>
                    <a
                        href="https://www.thebodymethod.com.au/privacy-copyright"
                        style={{ color: "#dfdede" }}
                    >
                        Privacy Policy
                    </a>
                </nav>

                <nav
                    className="tbm-c-f4"
                    aria-label="Secondary"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                        fontSize: 15,
                        lineHeight: 1.4,
                    }}
                >
                    <Link href="/our-story" style={{ color: "#dfdede" }}>Our Story</Link>
                    <Link href="/faq" style={{ color: "#dfdede" }}>FAQ</Link>
                    <Link href="/contact" style={{ color: "#dfdede" }}>Contact + Locations</Link>
                    <Link href="/member-login" style={{ color: "#dfdede" }}>Member Login</Link>
                    <Link href="/terms" style={{ color: "#dfdede" }}>Terms</Link>
                    <Link href="/accessibility" style={{ color: "#dfdede" }}>Accessibility</Link>
                    {/* TODO: wire the Careers popup in a follow-up turn */}
                    <Link
                        href="/careers"
                        aria-haspopup="dialog"
                        style={{
                            color: "#f4f2ed",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        Careers / Teach With Us
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                            <rect x="1" y="3" width="8" height="8" />
                            <path d="M5 1h6v6M11 1L6 6" />
                        </svg>
                    </Link>
                </nav>
            </div>
        </footer>
    );
}
