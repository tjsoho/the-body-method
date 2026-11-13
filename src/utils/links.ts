/* ************************************************************
                        NOTES
   How a link behaves depends on where it goes.

   Booking lives on Momence, a different site. Sending someone
   there in the same tab means they lose The Body Method and
   have to find their way back. Anything off-site opens in a new
   tab instead, with rel="noopener" so the new tab cannot reach
   back into this one.

   Internal links are left alone, so they keep Next's client
   navigation.

   This decides by the URL rather than by the button, so a link
   an admin pastes into the panel behaves correctly without
   anyone having to think about it.
************************************************************ */

export function externalLinkProps(href: string) {
    return /^https?:\/\//i.test(href ?? "")
        ? { target: "_blank" as const, rel: "noopener noreferrer" }
        : {};
}
