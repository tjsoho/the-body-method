/**
 * Navigation types + TBM defaults.
 *
 * Lives outside the "use server" actions file because Next forbids
 * non-async-function exports from server-action modules. Both server and
 * client code import from here.
 */

export type NavLink = {
    /** Stable id used as the dnd-kit sortable key and to track items across drags. */
    id: number;
    /** Display text shown in the header. */
    label: string;
    /** Path the link points to (e.g. "/studios", "/classes", "/"). */
    pageSlug: string;
    /** Up to one level of children — renders as a hover dropdown. */
    children: NavLink[];
};

export type NavigationContent = {
    kind: "navigation";
    items: NavLink[];
};

export type AvailablePage = {
    path: string;
    label: string;
    group: "Core" | "Service" | "Legal";
};

/**
 * Default header nav — exactly the seven items on the approved V3 design.
 * "NEW HERE?" anchors to the 21-day block on the home page; everything
 * else is its own folder route under src/app/.
 */
export const defaultNavLinks: NavLink[] = [
    { id: 1, label: "NEW HERE?", pageSlug: "/new-here", children: [] },
    {
        id: 2,
        label: "STUDIOS",
        pageSlug: "/studios",
        children: [
            { id: 21, label: "TUGUN BEACH", pageSlug: "/studios/tugun-beach", children: [] },
            { id: 22, label: "CORNERSTONE", pageSlug: "/studios/cornerstone", children: [] },
        ],
    },
    { id: 3, label: "CLASSES", pageSlug: "/classes", children: [] },
    { id: 4, label: "MEMBERSHIPS", pageSlug: "/memberships", children: [] },
    { id: 5, label: "PRIVATE PILATES", pageSlug: "/private-pilates", children: [] },
    { id: 6, label: "LIFE AT TBM", pageSlug: "/life-at-tbm", children: [] },
    { id: 7, label: "OUR PEOPLE", pageSlug: "/our-people", children: [] },
];

/**
 * Static (folder-route) pages — the routes that always exist as folder
 * routes under src/app/. Shown in the admin page-picker.
 */
export const STATIC_PAGES: AvailablePage[] = [
    { path: "/", label: "Home", group: "Core" },
    { path: "/new-here", label: "New here? (21-Day Immersion)", group: "Core" },
    { path: "/studios", label: "Studios", group: "Core" },
    { path: "/studios/tugun-beach", label: "Tugun Beach studio", group: "Core" },
    { path: "/studios/cornerstone", label: "Cornerstone studio", group: "Core" },
    { path: "/classes", label: "Classes", group: "Core" },
    { path: "/memberships", label: "Memberships", group: "Core" },
    { path: "/private-pilates", label: "Private Pilates", group: "Service" },
    { path: "/our-people", label: "Our People", group: "Core" },
    { path: "/life-at-tbm", label: "Life at TBM", group: "Core" },
    { path: "/about", label: "About / Our Story", group: "Core" },
    { path: "/book", label: "Book", group: "Core" },
    { path: "/faq", label: "FAQ", group: "Core" },
    { path: "/contact", label: "Contact + Locations", group: "Core" },
];
