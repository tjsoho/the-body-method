import type { Metadata } from "next";
import getPage from "@/server-actions/page";
import { HomePageProps, homePageFallbackData } from "./_config";
import Hero from "@/components/Home/Hero";
import Belong from "@/components/Home/Belong";
import { buildPageMetadata } from "@/utils/seo";

// Force dynamic so admin edits in the CMS show on next request without
// a redeploy. Revalidation is sub-second against the Supabase free tier.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
    return buildPageMetadata("home");
}

export default async function Home() {
    const homePage = await getPage<HomePageProps>(
        "home",
        homePageFallbackData,
    );
    const content = homePage.content;

    return (
        <>
            <Hero content={content.hero} />
            <Belong content={content.belong} />
            {/* Phase 2 (next turn):
                <TwoStudios />, <TwentyOneDay />, <WhyPeopleStay />,
                <GreatTeaching />, <PrivatePilates />, <LifeAtTbm />, <FinalCta />
            */}
        </>
    );
}
