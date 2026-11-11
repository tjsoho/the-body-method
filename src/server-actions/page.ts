import { supabase } from "@/utils/supabase";

/* ************************************************************
                        NOTES
   The read side of the CMS.

   A page's content is a JSONB column that the admin panel
   overwrites wholesale, but an older row saved before a field
   existed would otherwise render that field as `undefined` and
   crash the section. So the stored content is deep-merged over
   the static fallback: a missing key falls back, a present key
   wins.

   Arrays are replaced rather than merged. That is deliberate.
   Removing the third member story in the admin panel has to
   actually remove it, not leave the fallback's third item
   showing through.
************************************************************ */

type Dict = Record<string, unknown>;

const isPlainObject = (v: unknown): v is Dict =>
    typeof v === "object" && v !== null && !Array.isArray(v);

function deepMerge<T>(fallback: T, stored: unknown): T {
    if (stored === undefined || stored === null) return fallback;
    if (!isPlainObject(fallback) || !isPlainObject(stored)) return stored as T;

    const out: Dict = { ...fallback };
    for (const key of Object.keys(stored)) {
        out[key] = deepMerge(
            (fallback as Dict)[key],
            (stored as Dict)[key],
        );
    }
    return out as T;
}

export default async function getPage<TContent>(
    slug: string,
    fallbackData: TContent,
): Promise<TContent> {
    const response = await supabase
        .from("pages")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

    if (response.error) {
        console.error(`getPage("${slug}") failed:`, response.error.message);
        return fallbackData;
    }

    if (!response.data) return fallbackData;

    return deepMerge(fallbackData, response.data);
}
