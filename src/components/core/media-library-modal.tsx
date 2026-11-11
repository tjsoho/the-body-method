"use client";

/* ************************************************************
                        NOTES
   The media library as a modal, for picking an image from
   inside a form field.

   All the grid, search, upload and delete behaviour lives in
   MediaLibraryBrowser so the standalone library at /admin/media
   and this picker never drift apart. This file is the dialog
   around it: a backdrop, a close button, and Escape to leave.
************************************************************ */

import { useEffect } from "react";
import { X } from "lucide-react";
import MediaLibraryBrowser, {
    type ImageUsage,
} from "@/components/admin/media/MediaLibraryBrowser";

interface MediaLibraryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (url: string) => void;
    currentUsage?: ImageUsage[];
}

export default function MediaLibraryModal({
    isOpen,
    onClose,
    onSelect,
    currentUsage = [],
}: MediaLibraryModalProps) {
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-brand-black/60 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Media library"
        >
            <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[rgba(18,23,23,0.12)] bg-white shadow-2xl">
                <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[rgba(18,23,23,0.10)] px-5 py-4">
                    <div>
                        <h2 className="text-base font-semibold text-brand-black">
                            Media library
                        </h2>
                        <p className="text-xs text-brand-black/55">
                            Pick an image, or upload a new one.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close media library"
                        className="rounded-lg p-2 text-brand-black/60 transition-colors hover:bg-[#f5f5f3] hover:text-brand-black"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <MediaLibraryBrowser
                    onSelect={onSelect}
                    currentUsage={currentUsage}
                />
            </div>
        </div>
    );
}
