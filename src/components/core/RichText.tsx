/* ************************************************************
                        NOTES
   Rich text for CMS copy.

   Several answers and body blocks need a link, a bit of emphasis
   or a bullet list. Those used to be written as JSX inside the
   page files, which cannot survive a trip through a database, so
   editable copy is stored as a small, familiar subset of
   Markdown instead:

       **bold**        *italic*
       [text](/where)  a link, internal or external
       - a bullet      lines starting with "- " become a list
       blank line      starts a new paragraph

   Nothing is turned into raw HTML on the way out. The parser
   builds React elements directly, so a stray angle bracket in
   someone's copy is just an angle bracket, and there is no
   dangerouslySetInnerHTML anywhere in the path.
************************************************************ */

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

/* ************************************************************
                        INLINE PARSING
************************************************************ */

/** Matches a link, bold or italic run, whichever comes first. */
const INLINE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/;

/** A line that is exactly one link and nothing else. */
const ONLY_LINK = /^\[([^\]]+)\]\([^)\s]+\)$/;

/**
 * A link that is a whole paragraph on its own and written in capitals
 * is the site's standalone link style, the one with the arrow after it.
 * One mid-sentence is just a link. Deciding by shape rather than by a
 * special syntax keeps the Markdown an admin types ordinary.
 */
function isStandaloneLinkStyle(text: string): boolean {
    const letters = text.replace(/[^A-Za-z]/g, "");
    return letters.length > 1 && letters === letters.toUpperCase();
}

function parseInline(
    text: string,
    keyPrefix: string,
    linkClassName?: string,
): ReactNode[] {
    const out: ReactNode[] = [];
    let rest = text;
    let index = 0;

    while (rest.length > 0) {
        const match = INLINE.exec(rest);
        if (!match || match.index === undefined) {
            out.push(rest);
            break;
        }

        if (match.index > 0) out.push(rest.slice(0, match.index));

        const [whole, linkText, href, bold, italic] = match;
        const key = `${keyPrefix}-${index++}`;

        if (linkText && href) {
            const isExternal = /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
            const inner = parseInline(linkText, `${key}-t`);
            out.push(
                isExternal ? (
                    <a
                        key={key}
                        className={linkClassName}
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={
                            href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                        }
                    >
                        {inner}
                    </a>
                ) : (
                    <Link key={key} className={linkClassName} href={href}>
                        {inner}
                    </Link>
                ),
            );
        } else if (bold) {
            out.push(<strong key={key}>{bold}</strong>);
        } else if (italic) {
            out.push(<em key={key}>{italic}</em>);
        }

        rest = rest.slice(match.index + whole.length);
    }

    return out;
}

/* ************************************************************
                        BLOCK PARSING
************************************************************ */

type Block =
    | { kind: "p"; lines: string[] }
    | { kind: "ul"; items: string[] };

/** Splits copy into paragraphs and bullet lists. */
function parseBlocks(source: string): Block[] {
    const blocks: Block[] = [];

    for (const chunk of (source ?? "").split(/\n{2,}/)) {
        const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
        if (lines.length === 0) continue;

        // A chunk is a list when every line in it is a bullet. Mixed
        // chunks stay paragraphs, so a stray hyphen never eats the copy.
        if (lines.every((line) => line.startsWith("- "))) {
            blocks.push({
                kind: "ul",
                items: lines.map((line) => line.slice(2).trim()),
            });
            continue;
        }

        blocks.push({ kind: "p", lines });
    }

    return blocks;
}

/* ************************************************************
                        RENDER
************************************************************ */

export default function RichText({
    value,
    style,
    listStyle,
    className,
}: {
    value: string;
    /** Applied to every paragraph, so callers keep their type scale. */
    style?: CSSProperties;
    listStyle?: CSSProperties;
    className?: string;
}) {
    const blocks = parseBlocks(value);
    if (blocks.length === 0) return null;

    return (
        <>
            {blocks.map((block, blockIndex) =>
                block.kind === "ul" ? (
                    <ul
                        key={blockIndex}
                        className={className}
                        style={{
                            margin: 0,
                            paddingLeft: "1.2em",
                            display: "flex",
                            flexDirection: "column",
                            gap: 8,
                            ...style,
                            ...listStyle,
                        }}
                    >
                        {block.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                                {parseInline(item, `${blockIndex}-${itemIndex}`)}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p key={blockIndex} className={className} style={{ margin: 0, ...style }}>
                        {block.lines.map((line, lineIndex) => {
                            const whole = ONLY_LINK.exec(line.trim());
                            const linkClass =
                                whole && isStandaloneLinkStyle(whole[1])
                                    ? "tbm-lnk"
                                    : undefined;
                            return (
                                <span key={lineIndex}>
                                    {lineIndex > 0 && <br />}
                                    {parseInline(
                                        line,
                                        `${blockIndex}-${lineIndex}`,
                                        linkClass,
                                    )}
                                </span>
                            );
                        })}
                    </p>
                ),
            )}
        </>
    );
}

/* ************************************************************
                        PLAIN TEXT
************************************************************ */

/**
 * The same copy with the markup taken out, for places that need
 * flat text: FAQ schema, meta descriptions, alt text.
 *
 * Deriving it means the structured data can no longer drift away
 * from what the page actually says.
 */
export function richTextToPlain(value: string): string {
    return (value ?? "")
        .replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/\*([^*]+)\*/g, "$1")
        .replace(/^[ \t]*-[ \t]+/gm, "")
        .split(/\n{2,}/)
        .map((chunk) => chunk.split("\n").map((l) => l.trim()).filter(Boolean).join(" "))
        .filter(Boolean)
        .join(" ")
        .trim();
}
