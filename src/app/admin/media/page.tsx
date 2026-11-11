/* ************************************************************
                        NOTES
   /admin/media — the library on its own page.

   The same grid that appears when picking an image for a field,
   but browsable on its own so photography can be uploaded and
   tidied up before anyone starts editing a page.
************************************************************ */

import Link from "next/link";
import { ExternalLink, LayoutGrid } from "lucide-react";
import MediaLibraryBrowser from "@/components/admin/media/MediaLibraryBrowser";

export const dynamic = "force-dynamic";

export default function MediaAdminPage() {
    return (
        <div className="flex min-h-screen flex-col bg-[#fafaf7]">
            <div className="sticky top-0 z-40 border-b border-[rgba(18,23,23,0.10)] bg-white/95 backdrop-blur-sm">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 lg:px-6">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-black/50">
                            Site settings
                        </p>
                        <h1 className="text-base font-semibold text-brand-black">
                            Media library
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href="/admin"
                            className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(18,23,23,0.12)] bg-white px-3 py-1.5 text-xs font-semibold text-brand-black/75 transition-colors hover:bg-[#f5f5f3] hover:text-brand-black"
                        >
                            <LayoutGrid className="h-3.5 w-3.5" />
                            Dashboard
                        </Link>
                        <Link
                            href="/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(18,23,23,0.12)] bg-white px-3 py-1.5 text-xs font-semibold text-brand-black/75 transition-colors hover:bg-[#f5f5f3] hover:text-brand-black"
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            View site
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-6 lg:px-6">
                <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-[rgba(18,23,23,0.10)] bg-white">
                    <MediaLibraryBrowser />
                </div>
            </div>
        </div>
    );
}
