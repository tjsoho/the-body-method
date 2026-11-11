"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import React from "react";
import {
    BookOpen,
    CalendarDays,
    Dumbbell,
    Heart,
    Home,
    Images,
    Info,
    Mail,
    Menu,
    MessageCircleQuestion,
    Search,
    Sparkles,
    Tag,
    Users,
    type LucideIcon,
} from "lucide-react";

interface AdminTile {
    href: string;
    icon: LucideIcon;
    title: string;
    description: string;
}

interface AdminTileSection {
    title: string;
    description: string;
    tiles: AdminTile[];
}

const sections: AdminTileSection[] = [
    {
        title: "Page Content",
        description:
            "Every public page. Copy, photographs, buttons and prices.",
        tiles: [
            {
                href: "/admin/home",
                icon: Home,
                title: "Home",
                description:
                    "Every section: copy, photographs, buttons and links.",
            },
            {
                href: "/admin/new-here",
                icon: Sparkles,
                title: "New Here",
                description: "The 21-Day Immersion page, start to finish.",
            },
            {
                href: "/admin/classes",
                icon: Dumbbell,
                title: "Classes",
                description: "Every class type, its photo and its description.",
            },
            {
                href: "/admin/memberships",
                icon: Tag,
                title: "Memberships",
                description: "Tiers, prices, class packs and casual rates.",
            },
            {
                href: "/admin/studios",
                icon: CalendarDays,
                title: "Studios",
                description: "The hub page and the comparison table.",
            },
            {
                href: "/admin/studios-tugun-beach",
                icon: CalendarDays,
                title: "Studios: Tugun Beach",
                description: "The Reformer studio page and its FAQ.",
            },
            {
                href: "/admin/studios-cornerstone",
                icon: CalendarDays,
                title: "Studios: Cornerstone",
                description: "The Cornerstone page, its cards and its FAQ.",
            },
            {
                href: "/admin/private-pilates",
                icon: Heart,
                title: "Private Pilates",
                description: "One-to-one and duet sessions, and their prices.",
            },
            {
                href: "/admin/our-people",
                icon: Users,
                title: "Our People",
                description:
                    "Sarah's story, and every teacher's photo and profile.",
            },
            {
                href: "/admin/life-at-tbm",
                icon: Sparkles,
                title: "Life at TBM",
                description: "Events, workshops, member stories and partners.",
            },
            {
                href: "/admin/about",
                icon: Info,
                title: "About",
                description: "The story and the four things you believe.",
            },
            {
                href: "/admin/faq",
                icon: MessageCircleQuestion,
                title: "FAQ",
                description: "Every question, grouped. Also feeds Google.",
            },
            {
                href: "/admin/contact",
                icon: Mail,
                title: "Contact",
                description: "Addresses, parking, opening times and the form.",
            },
            {
                href: "/admin/book",
                icon: BookOpen,
                title: "Book",
                description: "The booking rows and where each one sends people.",
            },
        ],
    },
    {
        title: "Site Settings",
        description: "Navigation and shared site metadata.",
        tiles: [
            {
                href: "/admin/navigation",
                icon: Menu,
                title: "Header Navigation",
                description:
                    "Top menu links — add, reorder, and nest dropdowns.",
            },
            {
                href: "/admin/media",
                icon: Images,
                title: "Media Library",
                description:
                    "Every photo on the site, plus anything you upload.",
            },
            {
                href: "/admin/seo",
                icon: Search,
                title: "SEO",
                description: "Per-page metadata and search visibility.",
            },
        ],
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.04, delayChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
    },
};

const TileCard = ({ tile }: { tile: AdminTile }) => {
    const Icon = tile.icon;
    return (
        <motion.div variants={itemVariants}>
            <Link
                href={tile.href}
                className="group flex h-full items-start gap-4 rounded-2xl border border-[rgba(18,23,23,0.10)] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-green/60 hover:shadow-lg hover:shadow-brand-green/10"
            >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-cream text-brand-green transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-brand-black truncate">
                        {tile.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-brand-black/55 line-clamp-2">
                        {tile.description}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};

const AdminTiles = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { amount: 0.05, once: true });

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="space-y-12"
        >
            {sections.map((section) => (
                <section key={section.title}>
                    <div className="mb-5">
                        <h2 className="text-xl font-semibold text-brand-black">
                            {section.title}
                        </h2>
                        <p className="mt-1 text-sm text-brand-black/55">
                            {section.description}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {section.tiles.map((tile) => (
                            <TileCard key={tile.href} tile={tile} />
                        ))}
                    </div>
                </section>
            ))}
        </motion.div>
    );
};

export default AdminTiles;
