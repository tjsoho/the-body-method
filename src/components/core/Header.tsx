"use client";

/* ************************************************************
   TBM sticky header.

   Mirrors the approved V3 design: a 84px bar with a translucent forest
   background (`rgba(27,37,24,.62)` + 14px blur), the wordmark on the
   left, the seven nav links in Hanken Grotesk uppercase in the centre
   and the BOOK button on the right. Below 900px the nav collapses to a
   hamburger that opens an overlay panel.

   The nav items come from the CMS (admin/navigation page) so Sarah can
   reorder/rename them without a code change. The BOOK button is a
   dedicated slot — it is always visible and always points at the
   configured booking URL (Momence, when confirmed).
************************************************************ */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink, defaultNavLinks } from "@/data/navigation";

interface HeaderProps {
    navItems?: NavLink[];
    bookingUrl: string;
}

export default function Header({ navItems, bookingUrl }: HeaderProps) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    // Admin pages render their own chrome, no public header.
    if (pathname?.startsWith("/admin")) return null;

    const links: NavLink[] =
        navItems && navItems.length > 0 ? navItems : defaultNavLinks;

    // Lock body scroll while the mobile overlay is open.
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    // Escape key closes the menu.
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    // Auto-close when the viewport grows past the hamburger breakpoint,
    // so the stale overlay doesn't sit on top of the full desktop nav
    // after a window resize.                                           */
    useEffect(() => {
        if (!open) return;
        const mql = window.matchMedia("(min-width: 1241px)");
        const onChange = () => {
            if (mql.matches) setOpen(false);
        };
        onChange();
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, [open]);

    // Close whenever the route changes (e.g. clicking a nav link).
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const Wordmark = (
        <Link
            href="/"
            aria-label="The Body Method home"
            className="tbm-wordmark"
            style={{
                color: "#f4f2ed",
                textDecoration: "none",
                border: "1px solid rgba(244,242,237,.85)",
                whiteSpace: "nowrap",
                fontFamily: "var(--font-lora)",
            }}
        >
            <em>the</em>.body.method
        </Link>
    );

    return (
        <>
            <header
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 50,
                    background: "rgba(27,37,24,.62)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    color: "#f4f2ed",
                    borderBottom: "1px solid rgba(244,242,237,.14)",
                }}
            >
                <div
                    className="tbm-wrap"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 24,
                        height: 84,
                    }}
                >
                    {Wordmark}

                    {/* Desktop nav */}
                    <nav
                        aria-label="Main"
                        className="tbm-lbl tbm-nav-desktop"
                        style={{
                            display: "flex",
                            gap: "clamp(16px, 2vw, 28px)",
                            fontSize: 12,
                            letterSpacing: ".14em",
                        }}
                    >
                        {links.map((item) => (
                            <Link
                                key={item.id}
                                href={item.pageSlug}
                                style={{ color: "#f4f2ed", textDecoration: "none" }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div
                        style={{
                            display: "flex",
                            gap: 10,
                            alignItems: "center",
                        }}
                    >
                        {/* Luxurious MENU button — cream outline (matches
                            wordmark), same 44px height as BOOK, lives next
                            to BOOK whenever the nav is overflowing. The
                            text swaps to CLOSE when the overlay is open. */}
                        <button
                            type="button"
                            aria-label={open ? "Close menu" : "Open menu"}
                            aria-expanded={open}
                            onClick={() => setOpen((o) => !o)}
                            className="tbm-btn tbm-btn-menu tbm-nav-mobile-btn"
                            style={{
                                background: "transparent",
                                color: "#f4f2ed",
                                border: "1px solid rgba(244,242,237,.85)",
                                minHeight: 44,
                                cursor: "pointer",
                                gap: 10,
                                fontFamily: "var(--font-hanken)",
                            }}
                        >
                            <span
                                aria-hidden="true"
                                style={{
                                    display: "inline-flex",
                                    flexDirection: "column",
                                    gap: 4,
                                    width: 16,
                                }}
                            >
                                {open ? (
                                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" style={{ display: "block" }}>
                                        <line x1="1.5" y1="1.5" x2="14.5" y2="10.5" />
                                        <line x1="1.5" y1="10.5" x2="14.5" y2="1.5" />
                                    </svg>
                                ) : (
                                    <>
                                        <span style={{ height: 1, background: "currentColor", display: "block" }} />
                                        <span style={{ height: 1, background: "currentColor", display: "block" }} />
                                    </>
                                )}
                            </span>
                            <span className="tbm-menu-label">
                                {open ? "CLOSE" : "MENU"}
                            </span>
                        </button>

                        <a
                            href={bookingUrl}
                            className="tbm-btn tbm-btn-book"
                            style={{
                                background: "#f4f2ed",
                                color: "#1b2518",
                                minHeight: 44,
                            }}
                            {...(bookingUrl.startsWith("http")
                                ? { target: "_blank", rel: "noopener noreferrer" }
                                : {})}
                        >
                            BOOK
                        </a>
                    </div>
                </div>
            </header>

            {/* Menu overlay — forest field, oversized Hanken Grotesk labels
                with hairline rules between them. Generous side padding so
                the links breathe at every width.                        */}
            {open && (
                <div
                    role="dialog"
                    aria-label="Menu"
                    style={{
                        position: "fixed",
                        inset: "84px 0 0 0",
                        background: "#1b2518",
                        color: "#f4f2ed",
                        zIndex: 49,
                        padding: "clamp(32px, 7vh, 72px) clamp(20px, 5vw, 72px) 48px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 0,
                        overflowY: "auto",
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            maxWidth: 1200,
                            margin: "0 auto",
                            display: "flex",
                            flexDirection: "column",
                            gap: 0,
                        }}
                    >
                        {links.map((item, i) => (
                            <Link
                                key={item.id}
                                href={item.pageSlug}
                                onClick={() => setOpen(false)}
                                style={{
                                    color: "#f4f2ed",
                                    textDecoration: "none",
                                    fontFamily: "var(--font-hanken)",
                                    fontSize: "clamp(20px, 4vw, 34px)",
                                    fontWeight: 400,
                                    letterSpacing: ".12em",
                                    textTransform: "uppercase",
                                    padding: "clamp(18px, 3vh, 28px) 0",
                                    borderTop:
                                        i === 0
                                            ? "1px solid rgba(244,242,237,.14)"
                                            : "none",
                                    borderBottom:
                                        "1px solid rgba(244,242,237,.14)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 20,
                                    lineHeight: 1,
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: "var(--font-lora)",
                                        fontStyle: "italic",
                                        fontSize: "0.5em",
                                        letterSpacing: 0,
                                        color: "#a9bfae",
                                        minWidth: "2.4em",
                                        textTransform: "lowercase",
                                    }}
                                >
                                    0{i + 1}.
                                </span>
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

        </>
    );
}
