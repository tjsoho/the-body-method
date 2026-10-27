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
            {/* Each section runs its own interior motion — the headline
                lifts in, then the body, then the row of cards cascades
                one by one. No outer wrapper fade here; it was firing in
                parallel and masking the wave inside. */}
            <Belong content={content.belong} />
            <TwoStudios content={content.twoStudios} />
            <TwentyOneDay content={content.twentyOneDay} />
            <WhyPeopleStay content={content.whyPeopleStay} stories={memberStories} />
            <GreatTeaching content={content.greatTeaching} teachers={teachers} />
            <PrivatePilates content={content.privatePilates} />
            <LifeAtTbm content={content.lifeAtTbm} tiles={lifeAtTbmTiles} />
            <FinalCta content={content.finalCta} />
        </>
    );
}
