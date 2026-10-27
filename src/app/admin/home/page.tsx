/* ************************************************************
   Home-page content editor — placeholder.

   The TBM home page content shape (hero, belong, two studios,
   21-day block, member stories, teaching, private pilates, life
   at TBM, final CTA) is defined in src/app/_config.ts. The admin
   forms for each section are built in follow-up phases; this
   placeholder keeps the admin dashboard navigable while that work
   is in flight.
************************************************************ */

import Link from "next/link";

export default function HomeAdminPage() {
    return (
        <div className="min-h-screen bg-[color:var(--tbm-cream)] text-[color:var(--tbm-ink)] font-serif">
            <div className="tbm-wrap" style={{ paddingTop: 96, paddingBottom: 96, maxWidth: 760 }}>
                <span className="tbm-lbl" style={{ color: "var(--tbm-bronze-label)" }}>
                    Home content — editor pending
                </span>
                <h1
                    style={{
                        margin: "24px 0 16px",
                        fontWeight: 400,
                        fontSize: "clamp(32px, 4vw, 48px)",
                        lineHeight: 1.15,
                        fontFamily: "var(--font-lora)",
                    }}
                >
                    The admin editor for the home sections is being rebuilt.
                </h1>
                <p
                    style={{
                        margin: 0,
                        fontSize: 17,
                        lineHeight: 1.7,
                        color: "var(--tbm-text-body)",
                        fontFamily: "var(--font-lora)",
                    }}
                >
                    While the section components come online, the fallback copy
                    lives in <code>src/app/_config.ts</code>. Editing it there
                    changes the home page content until the admin form for each
                    section is wired in. The nav items editor and SEO editor are
                    still available.
                </p>
                <div style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
                    <Link
                        href="/admin"
                        className="tbm-btn"
                        style={{ background: "#1b2518", color: "#f4f2ed" }}
                    >
                        BACK TO ADMIN
                    </Link>
                    <Link
                        href="/admin/navigation"
                        className="tbm-btn"
                        style={{
                            border: "1px solid var(--tbm-forest)",
                            color: "var(--tbm-forest)",
                        }}
                    >
                        EDIT NAVIGATION
                    </Link>
                    <Link
                        href="/admin/seo"
                        className="tbm-btn"
                        style={{
                            border: "1px solid var(--tbm-forest)",
                            color: "var(--tbm-forest)",
                        }}
                    >
                        EDIT SEO
                    </Link>
                </div>
            </div>
        </div>
    );
}
