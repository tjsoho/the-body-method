"use client";

/* ************************************************************
                        NOTES
   The media library.

   Two sources, one grid:

   1. "Site images" are the photographs and logos shipped in
      public/images. They are baked into src/data/site-images.ts
      at build time, so they are always there, need no network
      call and cannot be deleted by accident.
   2. "Uploads" are whatever has been added through this panel.
      They live in the Supabase `site-images` bucket and can be
      uploaded and deleted here.

   The same component is the picker inside an image field and the
   browsable library at /admin/media. `onSelect` is what tells
   them apart: with it, every tile offers Select; without it,
   every tile offers Copy path instead.
************************************************************ */

/* ************************************************************
                        IMPORTS
************************************************************ */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, Copy, Trash2, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { siteImages } from "@/data/site-images";
import { inputClass } from "@/components/admin/_shared/form-primitives";

/* ************************************************************
                        TYPES
************************************************************ */
export type ImageUsage = {
    url: string;
    usedIn: { mobile?: boolean; desktop?: boolean; other?: string[] };
};

type Source = "uploads" | "site";

type Tile = {
    /** Storage object name. Only uploads have one, so only they delete. */
    name?: string;
    url: string;
    label: string;
    group: string;
};

type Props = {
    /** Supplied in picker mode. Receives the chosen public URL. */
    onSelect?: (url: string) => void;
    /** Highlights images already placed somewhere on the site. */
    currentUsage?: ImageUsage[];
};

/* ************************************************************
                        HELPERS
************************************************************ */
const SITE_TILES: Tile[] = siteImages.map((image) => ({
    url: image.url,
    label: image.label,
    group: image.group,
}));

/** "1763-hero-shot.jpg" reads better as "Hero shot". */
function labelFromFileName(name: string) {
    const stem = name.replace(/\.[^.]+$/, "").replace(/^\d+-[a-z0-9]{4,8}-?/i, "");
    const words = (stem || name).replace(/[-_]+/g, " ").trim();
    return words.charAt(0).toUpperCase() + words.slice(1);
}

/* ************************************************************
                        RENDER
************************************************************ */
export default function MediaLibraryBrowser({
    onSelect,
    currentUsage = [],
}: Props) {
    const [source, setSource] = useState<Source>("uploads");
    const [query, setQuery] = useState("");
    const [uploads, setUploads] = useState<Tile[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const hasChosenTab = useRef(false);

    /* ---------- the Supabase bucket ---------- */
    const loadUploads = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const limit = 100;
            let offset = 0;
            const files: { name: string }[] = [];

            // The bucket list is paged, so keep asking until it runs dry.
            for (;;) {
                const { data, error: listError } = await supabase.storage
                    .from("site-images")
                    .list("", {
                        limit,
                        offset,
                        sortBy: { column: "created_at", order: "desc" },
                    });

                if (listError) throw listError;
                if (!data || data.length === 0) break;

                files.push(...data);
                if (data.length < limit) break;
                offset += limit;
            }

            setUploads(
                files.map((file) => ({
                    name: file.name,
                    url: supabase.storage
                        .from("site-images")
                        .getPublicUrl(file.name).data.publicUrl,
                    label: labelFromFileName(file.name),
                    group: "Uploads",
                })),
            );

            // Nothing uploaded yet, so open on the photography that is
            // already here rather than on an empty grid.
            if (files.length === 0 && !hasChosenTab.current) setSource("site");
        } catch (caught) {
            console.error("Media library could not read the bucket:", caught);
            setError(
                "Could not reach the upload bucket. The site images below are still available.",
            );
            if (!hasChosenTab.current) setSource("site");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUploads();
    }, [loadUploads]);

    /* ---------- actions ---------- */
    const chooseSource = (next: Source) => {
        hasChosenTab.current = true;
        setSource(next);
    };

    const handleUpload = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        setError(null);

        try {
            const added = await Promise.all(
                Array.from(files).map(async (file) => {
                    const ext = file.name.split(".").pop() ?? "jpg";
                    const stem = file.name
                        .replace(/\.[^.]+$/, "")
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-+|-+$/g, "")
                        .slice(0, 48);
                    const objectName = `${Date.now()}-${stem || "image"}.${ext}`;

                    const { error: uploadError } = await supabase.storage
                        .from("site-images")
                        .upload(objectName, file, {
                            cacheControl: "3600",
                            upsert: true,
                        });

                    if (uploadError) throw uploadError;

                    return {
                        name: objectName,
                        url: supabase.storage
                            .from("site-images")
                            .getPublicUrl(objectName).data.publicUrl,
                        label: labelFromFileName(objectName),
                        group: "Uploads",
                    } satisfies Tile;
                }),
            );

            setUploads((prev) => [...added, ...prev]);
            chooseSource("uploads");
        } catch (caught) {
            console.error("Upload failed:", caught);
            setError("One or more files did not upload. Try again.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleDelete = async (tile: Tile) => {
        if (!tile.name) return;
        if (
            !window.confirm(
                `Delete ${tile.label}? Any page still using it will show a broken image.`,
            )
        ) {
            return;
        }

        setError(null);
        const { error: removeError } = await supabase.storage
            .from("site-images")
            .remove([tile.name]);

        if (removeError) {
            console.error("Delete failed:", removeError);
            setError("Could not delete that image.");
            return;
        }

        setUploads((prev) => prev.filter((item) => item.name !== tile.name));
    };

    const handleCopy = async (url: string) => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(url);
            window.setTimeout(() => setCopied(null), 1600);
        } catch {
            setError("Could not copy to the clipboard.");
        }
    };

    /* ---------- the grid ---------- */
    const tiles = source === "uploads" ? uploads : SITE_TILES;

    const groups = useMemo(() => {
        const needle = query.trim().toLowerCase();
        const matching = needle
            ? tiles.filter(
                  (tile) =>
                      tile.label.toLowerCase().includes(needle) ||
                      tile.url.toLowerCase().includes(needle),
              )
            : tiles;

        const byGroup = new Map<string, Tile[]>();
        for (const tile of matching) {
            const bucket = byGroup.get(tile.group);
            if (bucket) bucket.push(tile);
            else byGroup.set(tile.group, [tile]);
        }
        return [...byGroup.entries()];
    }, [tiles, query]);

    const total = groups.reduce((sum, [, items]) => sum + items.length, 0);

    return (
        <div className="flex flex-col min-h-0 flex-1">
            {/* Source + search */}
            <div className="shrink-0 border-b border-[rgba(18,23,23,0.10)] bg-white px-4 py-3 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                    <div className="rounded-xl border border-[rgba(18,23,23,0.10)] bg-[#fafaf7] p-1 flex gap-1">
                        <SourceTab
                            label="Uploads"
                            count={uploads.length}
                            isActive={source === "uploads"}
                            onClick={() => chooseSource("uploads")}
                        />
                        <SourceTab
                            label="Site images"
                            count={SITE_TILES.length}
                            isActive={source === "site"}
                            onClick={() => chooseSource("site")}
                        />
                    </div>

                    <div className="flex-1 min-w-[180px]">
                        <input
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search by name"
                            className={inputClass}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="inline-flex items-center gap-1.5 rounded-full border border-brand-green bg-brand-green px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-green/90 disabled:opacity-60"
                    >
                        <Upload className="w-3.5 h-3.5" />
                        {isUploading ? "Uploading" : "Upload"}
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleUpload}
                        className="hidden"
                    />
                </div>

                <p className="text-[11px] text-brand-black/50">
                    {source === "site"
                        ? "Photography shipped with the site. These cannot be deleted here."
                        : "Images added through this panel. Uploads appear on every page you place them on."}
                    {" "}
                    {total} shown.
                </p>

                {error && (
                    <p className="text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5">
                        {error}
                    </p>
                )}
            </div>

            {/* Tiles */}
            <div className="flex-1 min-h-0 overflow-y-auto bg-[#fafaf7] px-4 py-4 space-y-6">
                {isLoading && source === "uploads" ? (
                    <p className="text-sm text-brand-black/50 py-10 text-center">
                        Loading uploads
                    </p>
                ) : total === 0 ? (
                    <div className="py-16 text-center">
                        <p className="text-sm font-semibold text-brand-black">
                            Nothing here yet
                        </p>
                        <p className="mt-1 text-xs text-brand-black/55">
                            {query
                                ? "No image matches that search."
                                : "Upload an image, or switch to Site images."}
                        </p>
                    </div>
                ) : (
                    groups.map(([group, items]) => (
                        <section key={group}>
                            <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-black/50">
                                {group}
                                <span className="ml-2 font-normal tracking-normal normal-case text-brand-black/35">
                                    {items.length}
                                </span>
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                {items.map((tile) => (
                                    <MediaTile
                                        key={tile.url}
                                        tile={tile}
                                        inUse={currentUsage.some(
                                            (usage) => usage.url === tile.url,
                                        )}
                                        isCopied={copied === tile.url}
                                        onSelect={onSelect}
                                        onCopy={handleCopy}
                                        onDelete={
                                            tile.name
                                                ? () => handleDelete(tile)
                                                : undefined
                                        }
                                    />
                                ))}
                            </div>
                        </section>
                    ))
                )}
            </div>
        </div>
    );
}

/* ************************************************************
                        PARTS
************************************************************ */
function SourceTab({
    label,
    count,
    isActive,
    onClick,
}: {
    label: string;
    count: number;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={isActive}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                isActive
                    ? "bg-brand-green text-white shadow-sm"
                    : "text-brand-black/65 hover:bg-brand-green/10 hover:text-brand-black"
            }`}
        >
            {label}
            <span
                className={`ml-1.5 font-normal ${isActive ? "text-white/70" : "text-brand-black/40"}`}
            >
                {count}
            </span>
        </button>
    );
}

function MediaTile({
    tile,
    inUse,
    isCopied,
    onSelect,
    onCopy,
    onDelete,
}: {
    tile: Tile;
    inUse: boolean;
    isCopied: boolean;
    onSelect?: (url: string) => void;
    onCopy: (url: string) => void;
    onDelete?: () => void;
}) {
    return (
        <figure
            className={`group relative m-0 overflow-hidden rounded-xl border bg-white transition-colors ${
                inUse
                    ? "border-brand-green"
                    : "border-[rgba(18,23,23,0.10)] hover:border-brand-green/60"
            }`}
        >
            <div className="relative aspect-[4/3] bg-[#f1efe9]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={tile.url}
                    alt={tile.label}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {inUse && (
                    <span className="absolute left-2 top-2 rounded-full bg-brand-green px-2 py-0.5 text-[10px] font-semibold text-white">
                        In use
                    </span>
                )}

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-brand-black/70 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                    {onSelect && (
                        <button
                            type="button"
                            onClick={() => onSelect(tile.url)}
                            className="rounded-full bg-brand-green px-4 py-1.5 text-xs font-bold text-white hover:bg-brand-green/90"
                        >
                            Select
                        </button>
                    )}
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => onCopy(tile.url)}
                            title="Copy image path"
                            className="inline-flex items-center gap-1 rounded-full border border-white/40 px-3 py-1 text-[11px] font-semibold text-white hover:bg-white/15"
                        >
                            {isCopied ? (
                                <Check className="w-3 h-3" />
                            ) : (
                                <Copy className="w-3 h-3" />
                            )}
                            {isCopied ? "Copied" : "Copy path"}
                        </button>
                        {onDelete && (
                            <button
                                type="button"
                                onClick={onDelete}
                                title="Delete from uploads"
                                className="inline-flex items-center gap-1 rounded-full border border-red-300/60 bg-red-600/80 px-3 py-1 text-[11px] font-semibold text-white hover:bg-red-600"
                            >
                                <Trash2 className="w-3 h-3" />
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <figcaption className="px-2.5 py-2">
                <p className="truncate text-[11px] font-semibold text-brand-black">
                    {tile.label}
                </p>
                <p className="truncate font-mono text-[10px] text-brand-black/45">
                    {tile.url}
                </p>
            </figcaption>
        </figure>
    );
}
