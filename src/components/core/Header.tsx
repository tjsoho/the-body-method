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
                            gap: 8,
                            alignItems: "center",
                        }}
                    >
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
                        <button
                            type="button"
                            aria-label={open ? "Close menu" : "Open menu"}
                            onClick={() => setOpen((o) => !o)}
                            className="tbm-nav-mobile-btn"
                            style={{
                                width: 44,
                                height: 44,
                                border: "1px solid rgba(244,242,237,.6)",
                                background: "transparent",
                                color: "#f4f2ed",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                            }}
                        >
                            {open ? (
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                                    <line x1="2" y1="2" x2="16" y2="16" />
                                    <line x1="2" y1="16" x2="16" y2="2" />
                                </svg>
                            ) : (
                                <svg width="20" height="12" viewBox="0 0 20 12" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                                    <line x1="0" y1="1" x2="20" y2="1" />
                                    <line x1="0" y1="11" x2="20" y2="11" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile overlay */}
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
                        padding: "32px clamp(20px, 5vw, 72px)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 20,
                        overflowY: "auto",
                    }}
                >
                    {links.map((item) => (
                        <Link
                            key={item.id}
                            href={item.pageSlug}
                            onClick={() => setOpen(false)}
                            className="tbm-lbl"
                            style={{
                                color: "#f4f2ed",
                                textDecoration: "none",
                                fontSize: 16,
                                letterSpacing: ".14em",
                                paddingBottom: 16,
                                borderBottom: "1px solid rgba(244,242,237,.14)",
                            }}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}

        </>
    );
}
