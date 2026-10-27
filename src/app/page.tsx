import type { Metadata } from "next";
import getPage from "@/server-actions/page";
import {
    HomePageProps,
    homePageFallbackData,
    memberStoriesFallback,
    teachersFallback,
    lifeAtTbmTilesFallback,
} from "./_config";
import Hero from "@/components/Home/Hero";
import Belong from "@/components/Home/Belong";
import TwoStudios from "@/components/Home/TwoStudios";
import TwentyOneDay from "@/components/Home/TwentyOneDay";
import WhyPeopleStay from "@/components/Home/WhyPeopleStay";
import GreatTeaching from "@/components/Home/GreatTeaching";
import PrivatePilates from "@/components/Home/PrivatePilates";
import LifeAtTbm from "@/components/Home/LifeAtTbm";
import FinalCta from "@/components/Home/FinalCta";
import FadeUp from "@/components/motion/FadeUp";
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

    // Lists are still inline until their admin tables land. Shape stays
    // the same so swapping the source for a Supabase query is one line.
    const memberStories = memberStoriesFallback;
    const teachers = teachersFallback;
    const lifeAtTbmTiles = lifeAtTbmTilesFallback;

    return (
        <>
            <Hero content={content.hero} />
            <FadeUp><Belong content={content.belong} /></FadeUp>
            <FadeUp><TwoStudios content={content.twoStudios} /></FadeUp>
            <FadeUp><TwentyOneDay content={content.twentyOneDay} /></FadeUp>
            <FadeUp><WhyPeopleStay content={content.whyPeopleStay} stories={memberStories} /></FadeUp>
            <FadeUp><GreatTeaching content={content.greatTeaching} teachers={teachers} /></FadeUp>
            <FadeUp><PrivatePilates content={content.privatePilates} /></FadeUp>
            <FadeUp><LifeAtTbm content={content.lifeAtTbm} tiles={lifeAtTbmTiles} /></FadeUp>
            <FadeUp><FinalCta content={content.finalCta} /></FadeUp>
        </>
    );
}
