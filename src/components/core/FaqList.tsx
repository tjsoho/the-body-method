/* ************************************************************
                        NOTES
   The question accordion.

   Four pages carry one: the FAQ page itself, New Here, and both
   studio pages. They were four copies of the same <details>
   markup, which is now here so a change to how a question looks
   reaches all of them.

   Answers are rich text, so a question can carry a link without
   anybody touching a page file. The plus icon rotates to a cross
   via the global .tbm-faq rule, so no state is needed and the
   whole list stays in the HTML for crawlers.
************************************************************ */

import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import RichText from "@/components/core/RichText";
import type { FaqEntry } from "@/components/admin/_shared/form-primitives";

export function PlusIcon() {
    return (
        <svg
            className="tbm-faq-ic"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            aria-hidden="true"
        >
            <path d="M8 1v14M1 8h14" />
        </svg>
    );
}

export default function FaqList({
    items,
    /** Opens the first question, the way the design shows it. */
    openFirst = true,
    keyPrefix = "faq",
}: {
    items: FaqEntry[];
    openFirst?: boolean;
    keyPrefix?: string;
}) {
    return (
        <Stagger stagger={0.1}>
            {items.map((item, i) => (
                <StaggerItem key={`${keyPrefix}-${i}`}>
                    <details
                        open={openFirst && i === 0}
                        style={{
                            borderBottom: "1px solid var(--tbm-rule)",
                            padding: "16px 0",
                        }}
                    >
                        <summary
                            style={{
                                fontSize: 20,
                                lineHeight: 1.4,
                                color: "var(--tbm-ink)",
                            }}
                        >
                            {item.question}
                            <PlusIcon />
                        </summary>
                        <div
                            style={{
                                paddingTop: 8,
                                paddingBottom: 8,
                                display: "flex",
                                flexDirection: "column",
                                gap: 16,
                            }}
                        >
                            <RichText
                                className="tbm-rich"
                                value={item.answer}
                                style={{
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-muted)",
                                    paddingRight: 40,
                                }}
                            />
                        </div>
                    </details>
                </StaggerItem>
            ))}
        </Stagger>
    );
}
