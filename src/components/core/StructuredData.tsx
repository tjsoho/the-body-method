/**
 * JSON-LD <script> injector. Pass one schema object or an array of them.
 * `null`/`undefined` entries are dropped so callers can conditionally
 * build schemas without extra guards at the render site.
 *
 * `</script>` inside a JSON string would break out of the script element,
 * so forward slashes are escaped — standard precaution for JSON-LD.
 */
type JsonLd = Record<string, unknown>;

type Props = { data: JsonLd | null | undefined | Array<JsonLd | null | undefined> };

export default function StructuredData({ data }: Props) {
    const list = (Array.isArray(data) ? data : [data]).filter(
        (d): d is JsonLd => Boolean(d),
    );
    if (!list.length) return null;

    const payload = list.length === 1 ? list[0] : list;
    const json = JSON.stringify(payload).replace(/</g, "\\u003c");

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: json }}
        />
    );
}
