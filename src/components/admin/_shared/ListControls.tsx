"use client";

/* ************************************************************
                        NOTES
   Up / Down / Remove for a row in any editable list, plus the
   array helpers the editors use to act on them. Every list in
   the admin reorders the same way because they all come here.
************************************************************ */

import { Trash2 } from "lucide-react";
import { SubtleButton } from "@/components/admin/_shared/form-primitives";

/** Replace one item of a list, leaving the rest alone. */
export function replaceAt<T>(list: T[], index: number, patch: Partial<T>): T[] {
    return list.map((item, i) => (i === index ? { ...item, ...patch } : item));
}

/** Swap an item with its neighbour. Out of range is a no-op. */
export function moveItem<T>(list: T[], index: number, delta: number): T[] {
    const target = index + delta;
    if (target < 0 || target >= list.length) return list;
    const next = [...list];
    [next[index], next[target]] = [next[target], next[index]];
    return next;
}

export function removeAt<T>(list: T[], index: number): T[] {
    return list.filter((_, i) => i !== index);
}

export default function ListControls({
    index,
    length,
    onMove,
    onRemove,
    minimum = 1,
}: {
    index: number;
    length: number;
    onMove: (delta: number) => void;
    onRemove: () => void;
    /** How few items the list is allowed to get down to. */
    minimum?: number;
}) {
    return (
        <div className="flex items-center gap-1">
            <SubtleButton
                variant="ghost"
                onClick={() => onMove(-1)}
                disabled={index === 0}
                title="Move up"
            >
                Up
            </SubtleButton>
            <SubtleButton
                variant="ghost"
                onClick={() => onMove(1)}
                disabled={index === length - 1}
                title="Move down"
            >
                Down
            </SubtleButton>
            <SubtleButton
                variant="danger"
                onClick={onRemove}
                disabled={length <= minimum}
                title="Remove"
            >
                <Trash2 className="h-3 w-3" />
            </SubtleButton>
        </div>
    );
}
