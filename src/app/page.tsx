import type { Metadata } from "next";
import getPage from "@/server-actions/page";
import { HomePageProps, homePageFallbackData } from "./_config";
import Hero from "@/components/Home/Hero";
import Belong from "@/components/Home/Belong";
import TwoStudios from "@/components/Home/TwoStudios";
import TwentyOneDay from "@/components/Home/TwentyOneDay";
import WhyPeopleStay from "@/components/Home/WhyPeopleStay";
import GreatTeaching from "@/components/Home/GreatTeaching";
import PrivatePilates from "@/components/Home/PrivatePilates";
import LifeAtTbm from "@/components/Home/LifeAtTbm";
import FinalCta from "@/components/Home/FinalCta";
import {
    TEACHERS_SLUG,
    teachersPageFallbackData,
    type TeachersContent,
} from "@/data/teachers";
import { buildPageMetadata } from "@/utils/seo";

// Force dynamic so admin edits in the CMS show on next request without
// a redeploy. Revalidation is sub-second against the Supabase free tier.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata("home");
}

export default async function Home() {
    // Two rows: this page's own content, and the teaching roster it
    // shares with /our-people. Both are editable at /admin/home.
    const [homePage, teachersPage] = await Promise.all([
        getPage<HomePageProps>("home", homePageFallbackData),
        getPage<{ content: TeachersContent }>(
            TEACHERS_SLUG,
            teachersPageFallbackData,
        ),
    ]);
    const content = homePage.content;
    // Only the card fields cross into the strip, so the bios stay out
    // of this page's payload.
    const teachers = teachersPage.content.teachers.map(
        ({ slug, name, role, teaser, image, imageAlt }) => ({
            slug,
            name,
            role,
            teaser,
            image,
            imageAlt,
        }),
    );

    return (
        <>
            <Hero content={content.hero} />
            {/* Each section runs its own interior motion — the headline
                lifts in, then the body, then the row of cards cascades
                one by one. No outer wrapper fade here; it was firing in
                parallel and masking the wave inside. */}
            <Belong content={content.belong} />
            <TwoStudios content={content.twoStudios} />
            <TwentyOneDay content={content.twentyOneDay} />
            <WhyPeopleStay content={content.whyPeopleStay} />
            <GreatTeaching content={content.greatTeaching} teachers={teachers} />
            <PrivatePilates content={content.privatePilates} />
            <LifeAtTbm content={content.lifeAtTbm} />
            <FinalCta content={content.finalCta} />
        </>
    );
}
