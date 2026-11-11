"use client";

/* ************************************************************
                        NOTES
   Expandable — a phone-only disclosure.

   Below 900px the panel folds away behind a small uppercase
   trigger. At 901px and up the trigger is hidden and the panel
   is forced open by CSS (see .tbm-exp-* in globals.css), so the
   desktop layout is untouched and there is no hydration flash:
   the server HTML is already correct at both widths.

   The copy always stays in the DOM, so nothing is hidden from
   search engines or from anyone reading with JS off.
************************************************************ */

/* ************************************************************
                        IMPORTS
************************************************************ */
import { useId, useState } from "react";
import type { ReactNode } from "react";

/* ************************************************************
                        Components
************************************************************ */
type Props = {
    children: ReactNode;
    /** Trigger copy when the panel is closed, e.g. "WHAT'S INCLUDED". */
    label: string;
    /** Trigger copy when open. Defaults to the closed label. */
    labelOpen?: string;
    /** Trigger colour — bronze on light cards, sage on the dark one. */
    colour: string;
    /** Hairline above the trigger. Pass null for no rule. */
    rule?: string | null;
};

export default function Expandable({
    children,
    label,
    labelOpen,
    colour,
    rule = null,
}: Props) {
    const [open, setOpen] = useState(false);
    const panelId = useId();

    return (
        <div>
            <button
                type="button"
                className="tbm-exp-btn tbm-lbl"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((v) => !v)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    width: "100%",
                    minHeight: 44,
                    padding: "10px 0",
                    background: "transparent",
                    border: 0,
                    borderTop: rule ? `1px solid ${rule}` : undefined,
                    color: colour,
                    cursor: "pointer",
                    textAlign: "left",
                }}
            >
                {open ? (labelOpen ?? label) : label}
                <span
                    aria-hidden="true"
                    className="tbm-faq-ic"
                    style={{
                        display: "inline-block",
                        fontSize: 18,
                        lineHeight: 1,
                        transform: open ? "rotate(45deg)" : "none",
                    }}
                >
                    +
                </span>
            </button>
            <div id={panelId} className="tbm-exp-panel" data-open={open}>
                {children}
            </div>
        </div>
    );
}
