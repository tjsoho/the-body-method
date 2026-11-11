/* ************************************************************
   Builds src/data/site-images.ts from everything in public/images.

   The admin media library needs to offer the photography that is
   already shipped with the site, not just whatever has been
   uploaded to Supabase. Reading public/ with fs at request time
   is not safe on a serverless host, because only traced files
   reach the function, so the list is baked into a module instead.

   Runs automatically before every build (see the prebuild script)
   and the result is committed, so `next dev` has it too. Add a
   photo to public/images and run:

       npm run images:manifest
************************************************************ */

import { readdir, writeFile } from "node:fs/promises";
import { join, posix, relative, sep } from "node:path";

const ROOT = process.cwd();
const IMAGES_DIR = join(ROOT, "public", "images");
const OUT = join(ROOT, "src", "data", "site-images.ts");

const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"];

/** Every image under public/images, deepest paths included. */
async function walk(dir) {
    let entries;
    try {
        entries = await readdir(dir, { withFileTypes: true });
    } catch {
        return [];
    }

    const found = [];
    for (const entry of entries) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
            found.push(...(await walk(full)));
            continue;
        }
        const lower = entry.name.toLowerCase();
        if (!EXTENSIONS.some((ext) => lower.endsWith(ext))) continue;
        found.push(full);
    }
    return found;
}

/** "tbm-placeholders/hero-studios.jpg" turns into "Hero studios". */
function labelFor(url) {
    const base = url.split("/").pop() ?? url;
    const stem = base.replace(/\.[^.]+$/, "");
    const words = stem.replace(/[-_]+/g, " ").trim();
    return words.charAt(0).toUpperCase() + words.slice(1);
}

/** "tbm-placeholders" turns into "Tbm placeholders"; root is "Images". */
function groupFor(url) {
    const parts = url.split("/").filter(Boolean);
    const folder = parts.length > 2 ? parts[parts.length - 2] : "images";
    const words = folder.replace(/[-_]+/g, " ").trim();
    return words.charAt(0).toUpperCase() + words.slice(1);
}

const files = await walk(IMAGES_DIR);

const images = files
    .map((full) => "/" + relative(join(ROOT, "public"), full).split(sep).join(posix.sep))
    .sort((a, b) => a.localeCompare(b))
    .map((url) => ({ url, label: labelFor(url), group: groupFor(url) }));

const body = `/* ************************************************************
   GENERATED FILE. Do not edit by hand.

   Written by scripts/build-image-manifest.mjs from the contents
   of public/images. Regenerate with:

       npm run images:manifest
************************************************************ */

export type SiteImage = {
    /** Public path, ready to drop straight into an <img src>. */
    url: string;
    /** Human label shown under the thumbnail in the media library. */
    label: string;
    /** Folder the file sits in, used to group the grid. */
    group: string;
};

export const siteImages: SiteImage[] = ${JSON.stringify(images, null, 4)};
`;

await writeFile(OUT, body, "utf8");
console.log(`site-images.ts: ${images.length} images from public/images`);
