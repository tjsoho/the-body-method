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
            {/* Each section manages its own interior stagger wave; here we
                add only the lightest section-level lift so the whole block
                arrives gently without competing with the cards' cascade. */}
            <FadeUp y={28}><Belong content={content.belong} /></FadeUp>
            <FadeUp y={28}><TwoStudios content={content.twoStudios} /></FadeUp>
            <FadeUp y={28}><TwentyOneDay content={content.twentyOneDay} /></FadeUp>
            <FadeUp y={28}><WhyPeopleStay content={content.whyPeopleStay} stories={memberStories} /></FadeUp>
            <FadeUp y={28}><GreatTeaching content={content.greatTeaching} teachers={teachers} /></FadeUp>
            <FadeUp y={28}><PrivatePilates content={content.privatePilates} /></FadeUp>
            <FadeUp y={28}><LifeAtTbm content={content.lifeAtTbm} tiles={lifeAtTbmTiles} /></FadeUp>
            <FadeUp y={28}><FinalCta content={content.finalCta} /></FadeUp>
        </>
    );
}
