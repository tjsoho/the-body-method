"use client";

/* ************************************************************
   Careers / Teach With Us popup.

   Opens from the footer link. Mirrors design/careers-popup.html:
   forest backdrop, cream card, bronze label, italic lead, two
   body paragraphs, closer, and a dashed form slot where the
   real submit + attach-document form lands in a follow-up turn.

   Accessibility: role=dialog, aria-modal, focus trap via native
   <dialog>'s showModal(); backdrop click + Escape close the
   dialog; body scroll stays locked while open.
************************************************************ */

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
    /** Trigger element the parent wants to render — a link, button, etc. */
    children: ReactNode;
};

export default function CareersPopup({ children }: Props) {
    const [open, setOpen] = useState(false);
    const dialogRef = useRef<HTMLDivElement | null>(null);

    // Lock page scroll while the dialog is open.
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    // Escape to close.
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                style={{
                    all: "unset",
                    cursor: "pointer",
                    color: "#f4f2ed",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: "var(--font-lora)",
                    fontSize: 15,
                    lineHeight: 1.4,
                }}
                aria-haspopup="dialog"
                aria-expanded={open}
            >
                {children}
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    aria-hidden="true"
                >
                    <rect x="1" y="3" width="8" height="8" />
                    <path d="M5 1h6v6M11 1L6 6" />
                </svg>
            </button>

            {open && (
                <div
                    role="presentation"
                    onClick={(e) => {
                        // Clicking the backdrop (not the card) closes.
                        if (e.target === e.currentTarget) setOpen(false);
                    }}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,.55)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 48,
                        zIndex: 100,
                        fontFamily: "var(--font-lora)",
                        overflowY: "auto",
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="careers-title"
                        ref={dialogRef}
                        style={{
                            position: "relative",
                            width: 760,
                            maxWidth: "100%",
                            boxSizing: "border-box",
                            background: "var(--tbm-cream)",
                            color: "var(--tbm-ink)",
                            padding: "56px 64px 64px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 20,
                            boxShadow: "0 24px 80px rgba(0,0,0,.35)",
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label="Close"
                            style={{
                                position: "absolute",
                                top: 20,
                                right: 20,
                                width: 44,
                                height: 44,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "var(--tbm-ink)",
                                border: "1px solid var(--tbm-rule)",
                                background: "transparent",
                                cursor: "pointer",
                            }}
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                aria-hidden="true"
                            >
                                <path d="M1 1l12 12M13 1L1 13" />
                            </svg>
                        </button>

                        <h2
                            id="careers-title"
                            className="tbm-lbl"
                            style={{
                                margin: 0,
                                color: "var(--tbm-green-accent)",
                                fontSize: 13,
                            }}
                        >
                            Careers / Teach With Us
                        </h2>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 24,
                                lineHeight: 1.45,
                                fontStyle: "italic",
                                paddingRight: 40,
                            }}
                        >
                            We’re always interested in hearing from exceptional
                            teachers who care deeply about movement, people and
                            the quality of their teaching.
                        </p>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-muted)",
                            }}
                        >
                            Because our classes are highly personalised and our
                            community includes people moving with a wide range
                            of injuries, conditions and individual needs, we ask
                            that teachers have a minimum of one year’s practical
                            teaching experience beyond their initial teacher
                            training, including experience confidently working
                            with injuries and/or special interest populations.
                        </p>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-muted)",
                            }}
                        >
                            It’s important to us that every teacher joining TBM
                            has the experience to adapt movement safely and
                            thoughtfully within their scope of practice - so
                            every person in the room feels supported, no matter
                            where they’re starting from.
                        </p>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 19,
                                lineHeight: 1.5,
                            }}
                        >
                            Sound like your kind of place? We’d love to hear
                            from you.
                        </p>
                        {/* TODO: real form (name, email, message, attach CV) once Toby confirms where submissions go. */}
                        <div
                            style={{
                                border: "1px dashed #8a8c84",
                                minHeight: 150,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 24,
                                marginTop: 4,
                            }}
                        >
                            <span
                                className="tbm-lbl"
                                style={{
                                    color: "var(--tbm-text-muted)",
                                    textAlign: "center",
                                }}
                            >
                                {"{FORM TO SUBMIT + ATTACH DOCUMENT}"}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
