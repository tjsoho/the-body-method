/* ************************************************************
   TBM — FAQ.

   Grouped <details> accordions with the first question open. Every
   answer stays inline for SEO, and the FAQPage JSON-LD below mirrors
   each on-page question + answer so Google sees the same text it
   can rank. Copy is the client-approved master; the duplicate
   "What's the best way to start at The Body Method?" is intentional
   (UPDATED-PAGES.md item 4).
************************************************************ */

import type { Metadata } from "next";
import { isValidElement, type ReactNode } from "react";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import StructuredData from "@/components/core/StructuredData";
import { faqSchema } from "@/utils/schema";

export const metadata: Metadata = {
    title:
        "The Body Method FAQs | Reformer Pilates, Mat Pilates, Barre, Yin, Meditation & Yoga Tugun, Gold Coast",
    description:
        "Answers to the questions new and returning members ask about The Body Method — our two Tugun studios, the 21-Day Immersion, memberships, class etiquette, injuries and pregnancy.",
};

/* The on-page answer (JSX, can contain links and emphasis) and the
   schema answer (plain text) travel together so the two sources
   never drift. Keep both in sync any time copy changes.           */
type FaqItem = {
    question: string;
    /** Rendered on the page, can contain links and emphasis. */
    answer: ReactNode;
    /** Flat text for the FAQPage schema. */
    plain: string;
};

type FaqGroup = { label: string; items: FaqItem[] };

const groups: FaqGroup[] = [
    {
        label: "NEW TO THE BODY METHOD?",
        items: [
            {
                question:
                    "I'm completely new to Pilates or yoga. Can I still come?",
                plain:
                    "Absolutely. You don't need any Pilates or yoga experience before you start at The Body Method. Let your teacher know you're new when you arrive and we'll help you from there. Everyone starts somewhere, and making you feel comfortable is part of our job.",
                answer: (
                    <>
                        Absolutely. You don&apos;t need any Pilates or yoga experience
                        before you start at The Body Method. Let your teacher know
                        you&apos;re new when you arrive and we&apos;ll help you from
                        there. Everyone starts somewhere, and making you feel
                        comfortable is part of our job.
                    </>
                ),
            },
            {
                question: "What's the best way to start at The Body Method?",
                plain:
                    "Our 21-Day Immersion is designed specifically for this. You'll have 21 days to explore both of our Tugun studios, meet different teachers and experience Reformer Pilates, Pilates, yoga, barre, yin, meditation and other ways of moving before deciding what you'd like your regular routine to look like.",
                answer: (
                    <>
                        Our 21-Day Immersion is designed specifically for this.
                        You&apos;ll have 21 days to explore both of our Tugun studios,
                        meet different teachers and experience Reformer Pilates,
                        Pilates, yoga, barre, yin, meditation and other ways of moving
                        before deciding what you&apos;d like your regular routine to
                        look like.
                    </>
                ),
            },
            {
                question: "Do I need to be fit or flexible?",
                plain:
                    "Not at all. Everyone is welcome here. You come to move - you don't need to prove you can move before you arrive. Our teachers will meet you where you are and help you build from there.",
                answer: (
                    <>
                        Not at all. Everyone is welcome here. You come to move - you
                        don&apos;t need to prove you can move before you arrive. Our
                        teachers will meet you where you are and help you build from
                        there.
                    </>
                ),
            },
            {
                question:
                    "I'm a little nervous about coming for the first time. Is that normal?",
                plain:
                    "Very. Walking into any new studio can feel a little daunting when you don't know the room, the teacher or what you're doing yet. Come a little early, introduce yourself and we'll take care of the rest. You'll know your way around in no time.",
                answer: (
                    <>
                        Very. Walking into any new studio can feel a little daunting
                        when you don&apos;t know the room, the teacher or what
                        you&apos;re doing yet. Come a little early, introduce yourself
                        and we&apos;ll take care of the rest. You&apos;ll know your way
                        around in no time.
                    </>
                ),
            },
            {
                /* Yes, this appears twice in the master doc with different
                   answers. UPDATED-PAGES.md keeps both as written.          */
                question: "What's the best way to start at The Body Method?",
                plain:
                    "Our 21-Day Immersion is designed specifically for this. You'll have 21 days to explore both studios, meet different teachers and try different ways of moving before deciding what you'd like your regular routine to look like.",
                answer: (
                    <>
                        Our{" "}
                        <Link href="/new-here" style={{ color: "#1b2518" }}>
                            <strong style={{ fontWeight: 500 }}>
                                21-Day Immersion
                            </strong>
                        </Link>{" "}
                        is designed specifically for this. You&apos;ll have 21 days to
                        explore both studios, meet different teachers and try different
                        ways of moving before deciding what you&apos;d like your regular
                        routine to look like.
                    </>
                ),
            },
        ],
    },
    {
        label: "CHOOSING A STUDIO?",
        items: [
            {
                question:
                    "What's the difference between The Body Method's two Tugun studios?",
                plain:
                    "Our two studios offer different ways to move, both grounded in the same approach to exceptional teaching and personal care. Tugun Beach is our intimate Reformer Pilates studio, with a maximum of six people in each class. It's personal and precise, with plenty of opportunity for individual attention. Cornerstone is our larger, light-filled movement studio offering Pilates, yoga, barre, yin, meditation and more. And if you love both, that's exactly what our Dual Membership is for.",
                answer: (
                    <>
                        Our two studios offer different ways to move, both grounded in
                        the same approach to exceptional teaching and personal care.
                        Tugun Beach is our intimate Reformer Pilates studio, with a
                        maximum of six people in each class. It&apos;s personal and
                        precise, with plenty of opportunity for individual attention.
                        Cornerstone is our larger, light-filled movement studio
                        offering Pilates, yoga, barre, yin, meditation and more. And if
                        you love both, that&apos;s exactly what our{" "}
                        <Link href="/memberships" style={{ color: "#1b2518" }}>
                            Dual Membership
                        </Link>{" "}
                        is for.
                    </>
                ),
            },
            {
                question: "Where is The Body Method located on the Gold Coast?",
                plain:
                    "You'll find both of our studios in Tugun on the southern Gold Coast - Tugun Beach and Cornerstone. They're close geographically, but intentionally offer two different movement experiences. Need directions? Tugun Beach Pilates Studio. Cornerstone Stores Studio - Upstairs Level 1 Cornerstone Stores.",
                answer: (
                    <>
                        <p
                            style={{
                                margin: "0 0 8px",
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-muted)",
                                paddingRight: 40,
                            }}
                        >
                            You&apos;ll find both of our studios in Tugun on the
                            southern Gold Coast - Tugun Beach and Cornerstone.
                            They&apos;re close geographically, but intentionally offer
                            two different movement experiences.
                        </p>
                        <p
                            style={{
                                margin: "8px 0 0",
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-muted)",
                                paddingRight: 40,
                            }}
                        >
                            <Link href="/contact" style={{ color: "#1b2518" }}>
                                Need directions?
                            </Link>
                            <br />
                            <a
                                href="https://share.google/yIpCcBOu7JsYTNe5q"
                                style={{ color: "#1b2518" }}
                            >
                                Tugun Beach Pilates Studio
                            </a>
                            <br />
                            <a
                                href="https://share.google/jL3QdCMThbnkGKE1b"
                                style={{ color: "#1b2518" }}
                            >
                                Cornerstone Stores Studio - Upstairs Level 1 Cornerstone
                                Stores
                            </a>
                        </p>
                    </>
                ),
            },
        ],
    },
    {
        label: "YOUR 21-DAY IMMERSION",
        items: [
            {
                question:
                    "Can I try Pilates, yoga and other classes during my 21 days?",
                plain:
                    "Yes, that's the idea. Your 21-Day Immersion gives you the opportunity to explore the wider Body Method experience across both Tugun studios. Try Reformer Pilates at Tugun Beach, then explore Pilates, yoga, barre, yin, meditation and other movement at Cornerstone. Meet different teachers, try different times and discover what genuinely works for you.",
                answer: (
                    <>
                        Yes, that&apos;s the idea. Your 21-Day Immersion gives you the
                        opportunity to explore the wider Body Method experience across
                        both Tugun studios. Try Reformer Pilates at Tugun Beach, then
                        explore Pilates, yoga, barre, yin, meditation and other movement
                        at Cornerstone. Meet different teachers, try different times
                        and discover what genuinely works for you.
                    </>
                ),
            },
            {
                question: "Do I need to come every day?",
                plain:
                    "Definitely not. This isn't a 21-day challenge or a competition to squeeze in as many classes as humanly possible. We'd much rather help you discover a rhythm you can realistically continue once your 21 days are over.",
                answer: (
                    <>
                        Definitely not. This isn&apos;t a 21-day challenge or a
                        competition to squeeze in as many classes as humanly possible.
                        We&apos;d much rather help you discover a rhythm you can
                        realistically continue once your 21 days are over.
                    </>
                ),
            },
            {
                question: "What happens after my 21 days?",
                plain:
                    "Hopefully, by then you'll have a much better sense of what you love and how movement fits into your week. From there, you can choose the membership or class option that suits you best - Cornerstone, Tugun Beach, both studios through Dual Membership, or another option that works for you.",
                answer: (
                    <>
                        Hopefully, by then you&apos;ll have a much better sense of what
                        you love and how movement fits into your week. From there, you
                        can choose the membership or class option that suits you best -
                        Cornerstone, Tugun Beach, both studios through Dual Membership,
                        or another option that works for you.
                    </>
                ),
            },
            {
                question:
                    "I've never done Pilates or yoga before. Is the 21-Day Immersion still for me?",
                plain:
                    "Absolutely - you don't need to arrive knowing which class, teacher or type of movement is right for you. Your 21 days are there to help you figure that out.",
                answer: (
                    <>
                        Absolutely - you don&apos;t need to arrive knowing which class,
                        teacher or type of movement is right for you. Your 21 days are
                        there to help you figure that out.
                    </>
                ),
            },
        ],
    },
    {
        label: "CLASSES + MOVEMENT",
        items: [
            {
                question: "What types of classes does The Body Method offer?",
                plain:
                    "Across our two Tugun studios, The Body Method offers Reformer Pilates, Pilates mat, yoga, barre, yin, meditation and other movement practices. Tugun Beach is home to our small-group Reformer Pilates Studio, while Cornerstone is our mat studio that offers a broader timetable and more ways to move throughout your week.",
                answer: (
                    <>
                        <p
                            style={{
                                margin: "0 0 8px",
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-muted)",
                                paddingRight: 40,
                            }}
                        >
                            Across our two Tugun studios, The Body Method offers
                            Reformer Pilates, Pilates mat, yoga, barre, yin, meditation
                            and other movement practices. Tugun Beach is home to our
                            small-group Reformer Pilates Studio, while Cornerstone is
                            our mat studio that offers a broader timetable and more
                            ways to move throughout your week.
                        </p>
                        <p
                            style={{
                                margin: "8px 0 0",
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-muted)",
                                paddingRight: 40,
                            }}
                        >
                            <Link
                                className="tbm-lnk"
                                href="/classes"
                                style={{ color: "#1b2518" }}
                            >
                                EXPLORE OUR CLASSES{" "}
                                <span aria-hidden="true">→</span>
                            </Link>
                        </p>
                    </>
                ),
            },
            {
                question: "Do I have to choose one type of movement?",
                plain:
                    "Not at all. In fact, we think there's something pretty lovely about not asking your body to want the same thing every day. Some days you might want the strength and precision of Mat Pilates or Reformer. Other days, yoga, yin or meditation might be exactly what you need. The Body Method is designed to give you different ways to move through different days.",
                answer: (
                    <>
                        Not at all. In fact, we think there&apos;s something pretty
                        lovely about not asking your body to want the same thing every
                        day. Some days you might want the strength and precision of Mat
                        Pilates or Reformer. Other days, yoga, yin or meditation might
                        be exactly what you need. The Body Method is designed to give
                        you different ways to move through different days.
                    </>
                ),
            },
        ],
    },
    {
        label: "MEMBERSHIPS",
        items: [
            {
                question: "Can I freeze my membership?",
                plain:
                    "Yes, memberships can be paused in certain circumstances and within the terms of your membership. If you would like to suspend your weekly direct debit /auto-payment membership payments, please submit your request in writing via email to hello@thebodymethod.com.au. The suspension may be for a minimum of one week and a maximum of four weeks for any single suspension period. Holders must provide 5 business days of notice for any suspensions and are only permitted to suspend their debit memberships for a maximum of four weeks per year. Suspensions will not be accepted via Facebook, Instagram, telephone, text message, in person or any medium other than via email. Please note that we cannot back date the suspension request, or process your request on the same day. Your suspension request will be processed within five business days, and confirmation will be sent via email.",
                answer: (
                    <>
                        <p
                            style={{
                                margin: "0 0 8px",
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-muted)",
                                paddingRight: 40,
                            }}
                        >
                            Yes, memberships can be paused in certain circumstances and
                            within the terms of your membership.
                        </p>
                        <p
                            style={{
                                margin: "8px 0 0",
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-muted)",
                                paddingRight: 40,
                            }}
                        >
                            If you would like to suspend your weekly direct debit
                            /auto-payment membership payments, please submit your
                            request in writing via email to{" "}
                            <a
                                href="mailto:hello@thebodymethod.com.au"
                                style={{ color: "#1b2518" }}
                            >
                                hello@thebodymethod.com.au
                            </a>
                            . The suspension may be for a minimum of one week and a
                            maximum of four weeks for any single suspension period.
                            Holders must provide 5 business days of notice for any
                            suspensions and are only permitted to suspend their debit
                            memberships for a maximum of four weeks per year.
                            Suspensions will not be accepted via Facebook, Instagram,
                            telephone, text message, in person or any medium other than
                            via email. Please note that we cannot back date the
                            suspension request, or process your request on the same
                            day. Your suspension request will be processed within five
                            business days, and confirmation will be sent via email.
                        </p>
                    </>
                ),
            },
            {
                question: "What if I'm not ready for a membership?",
                plain:
                    "That's absolutely okay. We have drop in class passes or packs of 5, 10, and 20 at CS, and 5, 10, 20, and 50 packs at Tugun Beach. You can find all the options HERE. We'd rather help you find an option that works for your life than into a membership you won't use.",
                answer: (
                    <>
                        That&apos;s absolutely okay. We have drop in class passes or
                        packs of 5, 10, and 20 at CS, and 5, 10, 20, and 50 packs at
                        Tugun Beach. You can find all the options{" "}
                        <a href="#momence-pricing" style={{ color: "#1b2518" }}>
                            HERE
                        </a>
                        . We&apos;d rather help you find an option that works for your
                        life than into a membership you won&apos;t use.
                    </>
                ),
            },
            {
                question: "Can I move between Tugun Beach and Cornerstone?",
                plain:
                    "Your access depends on your membership. If you'd like both studios to be part of your week, our Dual Membership is designed specifically for that. See details HERE",
                answer: (
                    <>
                        Your access depends on your membership. If you&apos;d like both
                        studios to be part of your week, our Dual Membership is
                        designed specifically for that. See details{" "}
                        <Link href="/memberships" style={{ color: "#1b2518" }}>
                            HERE
                        </Link>
                    </>
                ),
            },
        ],
    },
    {
        label: "CASUAL VISITS",
        items: [
            {
                question: "Can I come casually without becoming a member?",
                plain:
                    "Yes you can! Welcome! Our drop in rate at Tugun Reformer Studio for group classes is $39, for our Mat Studio at Cornerstone is $28. If you're completely new to TBM, however, we'd recommend looking at the 21-Day Immersion first - it gives you the opportunity to experience both studios rather than judging us on one class.",
                answer: (
                    <>
                        Yes you can! Welcome! Our drop in rate at Tugun Reformer Studio
                        for group classes is $39, for our Mat Studio at Cornerstone is
                        $28. If you&apos;re completely new to TBM, however, we&apos;d
                        recommend looking at the 21-Day Immersion first - it gives you
                        the opportunity to experience both studios rather than judging
                        us on one class.
                    </>
                ),
            },
        ],
    },
    {
        label: "PRIVATE PILATES",
        items: [
            {
                question: "Does The Body Method offer Private Pilates in Tugun?",
                plain:
                    "Yes. Private Pilates is available at our Tugun Beach studio and gives you dedicated one-to-one time with an experienced teacher. We also offer duet private sessions in groups of two should you wish to bring a friend. You don't need an injury to book privately. It can be useful if you're returning to movement, new to Pilates, wanting to improve technique, building confidence, navigating specific needs or simply prefer more individual attention.",
                answer: (
                    <>
                        Yes. Private Pilates is available at our Tugun Beach studio and
                        gives you dedicated one-to-one time with an experienced
                        teacher. We also offer duet private sessions in groups of two
                        should you wish to bring a friend. You don&apos;t need an
                        injury to book privately. It can be useful if you&apos;re
                        returning to movement, new to Pilates, wanting to improve
                        technique, building confidence, navigating specific needs or
                        simply prefer more individual attention.
                    </>
                ),
            },
            {
                question:
                    "I've been away from movement for a long time. Would Private Pilates be a good place to start?",
                plain:
                    "It certainly can be. A private session gives you time to talk through where you're at, move at your own pace and build confidence without worrying about keeping up with a group. Your teacher can also help you decide what might be a good next step from there.",
                answer: (
                    <>
                        It certainly can be. A private session gives you time to talk
                        through where you&apos;re at, move at your own pace and build
                        confidence without worrying about keeping up with a group. Your
                        teacher can also help you decide what might be a good next step
                        from there.
                    </>
                ),
            },
        ],
    },
    {
        label: "LOCATION + PARKING",
        items: [
            {
                question: "Where is Tugun Beach studio?",
                plain:
                    "Our Tugun Beach Reformer Pilates studio is located at 3/5 Toolona St, Tugun QLD 4224, close to Tugun Beach on the southern Gold Coast.",
                answer: (
                    <>
                        Our Tugun Beach Reformer Pilates studio is located at{" "}
                        <a
                            href="https://share.google/yIpCcBOu7JsYTNe5q"
                            style={{ color: "#1b2518" }}
                        >
                            3/5 Toolona St, Tugun QLD 4224
                        </a>
                        , close to Tugun Beach on the southern Gold Coast.
                    </>
                ),
            },
            {
                question: "Where do I park for Tugun Beach?",
                plain:
                    "There is street parking all along the front of the studio, there is also a beach parking area at the end of the street. Please make sure you allow 10-15 minutes for parking at peak periods on weekends etc.",
                answer: (
                    <>
                        There is street parking all along the front of the studio,
                        there is also a beach parking area at the end of the street.
                        Please make sure you allow 10-15 minutes for parking at peak
                        periods on weekends etc.
                    </>
                ),
            },
            {
                question: "Where is The Body Method Cornerstone?",
                plain:
                    "Our Cornerstone studio is located Upstairs at Level 1, shop 8/570 Gold Coast Hwy, Tugun QLD 4224 - inside Cornerstone Stores. This is our larger movement studio and home to Pilates mat, yoga, barre, yin, meditation, workshops and much of our wider TBM community.",
                answer: (
                    <>
                        Our Cornerstone studio is located{" "}
                        <a
                            href="https://share.google/jL3QdCMThbnkGKE1b"
                            style={{ color: "#1b2518" }}
                        >
                            Upstairs at Level 1, shop 8/570 Gold Coast Hwy, Tugun QLD
                            4224
                        </a>{" "}
                        - inside Cornerstone Stores. This is our larger movement studio
                        and home to Pilates mat, yoga, barre, yin, meditation,
                        workshops and much of our wider TBM community.
                    </>
                ),
            },
            {
                question: "Where do I park for Cornerstone?",
                plain:
                    "There is street parking along the Gold Coast highway and surrounding streets and also limited parking in the Cornerstone carpark. Please make sure you allow 10-15 minutes for parking times during peak periods on weekends etc.",
                answer: (
                    <>
                        There is street parking along the Gold Coast highway and
                        surrounding streets and also limited parking in the Cornerstone
                        carpark. Please make sure you allow 10-15 minutes for parking
                        times during peak periods on weekends etc.
                    </>
                ),
            },
        ],
    },
    {
        label: "WHAT TO BRING",
        items: [
            {
                question: "What should I bring to class?",
                plain:
                    "Wear something comfortable that you can move easily in and bring a water bottle, a small towel if you wish and you can also bring your own mat - but we have one for everyone already supplied. Mostly, just bring yourself. We'll let you know if there's anything particular you need for the class you've booked. We ask that everyone leave their phones with their shoes at the front door and not bring them to their mat.",
                answer: (
                    <>
                        Wear something comfortable that you can move easily in and
                        bring a water bottle, a small towel if you wish and you can
                        also bring your own mat - but we have one for everyone already
                        supplied. Mostly, just bring yourself. We&apos;ll let you know
                        if there&apos;s anything particular you need for the class
                        you&apos;ve booked. We ask that everyone leave their phones
                        with their shoes at the front door and not bring them to their
                        mat.
                    </>
                ),
            },
            {
                question: "Do I need grip socks?",
                plain:
                    "For Reformer Pilates at Tugun Beach, yes please. Grip socks help you move safely and comfortably on the equipment. If you've forgotten yours, we have some clean ones you can borrow and also some available for purchase.",
                answer: (
                    <>
                        For Reformer Pilates at Tugun Beach, yes please. Grip socks
                        help you move safely and comfortably on the equipment. If
                        you&apos;ve forgotten yours, we have some clean ones you can
                        borrow and also some available for purchase.
                    </>
                ),
            },
        ],
    },
    {
        label: "WAITLISTS",
        items: [
            {
                question: "The class I want is full. Should I join the waitlist?",
                plain:
                    "Absolutely! Plans change all the time, so it's always worth putting your name down. If a spot opens up, our booking system automatically adds people from the waitlist in order, up until one hour before class. Within an hour of class starting, things work a little differently. Everyone still on the waitlist receives a text if a spot becomes available, and the first person to reply and confirm gets the place. So keep an eye on your messages - you might just get lucky! And if you know you can no longer make it, please remove yourself from the waitlist so we don't offer you a spot you're unable to take.",
                answer: (
                    <>
                        Absolutely! Plans change all the time, so it&apos;s always
                        worth putting your name down. If a spot opens up, our booking
                        system automatically adds people from the waitlist in order, up
                        until one hour before class. Within an hour of class starting,
                        things work a little differently. Everyone still on the
                        waitlist receives a text if a spot becomes available, and the
                        first person to reply and confirm gets the place. So keep an
                        eye on your messages - you might just get lucky! And if you
                        know you can no longer make it, please remove yourself from the
                        waitlist so we don&apos;t offer you a spot you&apos;re unable
                        to take.
                    </>
                ),
            },
        ],
    },
    {
        label: "PREGNANCY + POSTPARTUM",
        items: [
            {
                question: "Can I attend classes while pregnant?",
                plain:
                    "We'd love you to talk to us first. Every pregnancy and every body is different, so please let us know how far along you are, whether you've been moving with us previously and anything your healthcare provider has advised. We'll help you work out which classes or private sessions are most appropriate for you.",
                answer: (
                    <>
                        We&apos;d love you to talk to us first. Every pregnancy and
                        every body is different, so please let us know how far along
                        you are, whether you&apos;ve been moving with us previously and
                        anything your healthcare provider has advised. We&apos;ll help
                        you work out which classes or private sessions are most
                        appropriate for you.
                    </>
                ),
            },
            {
                question: "Can I return after having a baby?",
                plain:
                    "Yes, we would love that - but there's no prize for rushing back and we recommend that post natal don't come back until 8 weeks post birth. Please make sure you've received the appropriate medical clearance and let us know where you're at before your first session. Depending on your circumstances, we may suggest starting privately before returning to group classes.",
                answer: (
                    <>
                        Yes, we would love that - but there&apos;s no prize for rushing
                        back and we recommend that post natal don&rsquo;t come back
                        until 8 weeks post birth. Please make sure you&apos;ve received
                        the appropriate medical clearance and let us know where
                        you&apos;re at before your first session. Depending on your
                        circumstances, we may suggest starting privately before
                        returning to group classes.
                    </>
                ),
            },
        ],
    },
    {
        label: "INJURIES + YOUR BODY",
        items: [
            {
                question:
                    "I have an injury or something going on with my body. Can I still come?",
                plain:
                    "Possibly, but please let your teacher know before the class begins. We need to understand what's going on so we can determine whether the class is appropriate and make adjustments where we safely can. Depending on the injury or condition, we may recommend speaking with your healthcare professional first or beginning with a Private Pilates session so we can give you more individual attention.",
                answer: (
                    <>
                        <p
                            style={{
                                margin: "0 0 8px",
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-muted)",
                                paddingRight: 40,
                            }}
                        >
                            Possibly, but please let your teacher know before the class
                            begins. We need to understand what&apos;s going on so we
                            can determine whether the class is appropriate and make
                            adjustments where we safely can.
                        </p>
                        <p
                            style={{
                                margin: "8px 0 0",
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-muted)",
                                paddingRight: 40,
                            }}
                        >
                            Depending on the injury or condition, we may recommend
                            speaking with your healthcare professional first or
                            beginning with a Private Pilates session so we can give you
                            more individual attention.
                        </p>
                    </>
                ),
            },
            {
                question:
                    "Should I tell my teacher about an old injury even if it isn't currently painful?",
                plain:
                    "Yes please. You know your body best, and the more relevant information our teachers have, the better they can support you. A quick conversation before class is all that's needed.",
                answer: (
                    <>
                        Yes please. You know your body best, and the more relevant
                        information our teachers have, the better they can support you.
                        A quick conversation before class is all that&apos;s needed.
                    </>
                ),
            },
        ],
    },
    {
        label: "BOOKING + CANCELLATIONS",
        items: [
            {
                question: "How do I book a class?",
                plain:
                    "You can view the live timetable HERE and book online through our booking system. Once you've created your account, you'll also be able to manage your upcoming classes from there.",
                answer: (
                    <>
                        You can view the live timetable{" "}
                        <a href="#momence-timetable" style={{ color: "#1b2518" }}>
                            HERE
                        </a>{" "}
                        and book online through our booking system. Once you&apos;ve
                        created your account, you&apos;ll also be able to manage your
                        upcoming classes from there.
                    </>
                ),
            },
            {
                question: "What if I need to cancel a class?",
                plain:
                    "Life happens, and we get it! We have a 6-hour cancellation window, giving you a little flexibility when plans change while making sure someone else has the chance to take your spot. If you cancel less than 6 hours before class, you'll lose that session from your class pack, or incur a $10 late cancellation fee if you're on an unlimited membership. Our classes are intentionally small, and spots are often in high demand. This little policy helps us keep things fair for everyone while giving you as much flexibility as we can.",
                answer: (
                    <>
                        <p
                            style={{
                                margin: "0 0 8px",
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-muted)",
                                paddingRight: 40,
                            }}
                        >
                            Life happens, and we get it! We have a{" "}
                            <strong style={{ fontWeight: 500, color: "#191b1f" }}>
                                6-hour cancellation window
                            </strong>
                            , giving you a little flexibility when plans change while
                            making sure someone else has the chance to take your spot.
                        </p>
                        <p
                            style={{
                                margin: "8px 0 0",
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-muted)",
                                paddingRight: 40,
                            }}
                        >
                            If you cancel less than 6 hours before class, you&apos;ll
                            lose that session from your class pack, or incur a $10 late
                            cancellation fee if you&apos;re on an unlimited membership.
                            Our classes are intentionally small, and spots are often in
                            high demand. This little policy helps us keep things fair
                            for everyone while giving you as much flexibility as we
                            can.
                        </p>
                    </>
                ),
            },
            {
                question: "What happens if a class is full?",
                plain:
                    "Join the waitlist. Spots do open up, particularly as the class gets closer, and our booking system will let you know if you've made it in.",
                answer: (
                    <>
                        Join the waitlist. Spots do open up, particularly as the class
                        gets closer, and our booking system will let you know if
                        you&apos;ve made it in.
                    </>
                ),
            },
        ],
    },
    {
        label: "AGE REQUIREMENTS",
        items: [
            {
                question: "Is there a minimum age to attend classes?",
                plain:
                    "We welcome young movers! Anyone aged 14–17 can attend classes independently, provided a parent or guardian has signed our consent waiver. For children under 14, attending a mat class may be possible with a parent or guardian, depending on the class and teacher's discretion. Reformer Pilates is a little different. Our equipment needs to fit your body safely, so younger children may not be suitable for group Reformer classes due to their height and size. Not sure what's appropriate? Have a chat with us first and we'll help you find the right fit.",
                answer: (
                    <>
                        <p
                            style={{
                                margin: "0 0 8px",
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-muted)",
                                paddingRight: 40,
                            }}
                        >
                            We welcome young movers! Anyone aged{" "}
                            <strong style={{ fontWeight: 500, color: "#191b1f" }}>
                                14–17 can attend classes independently
                            </strong>
                            , provided a parent or guardian has signed our consent
                            waiver.
                        </p>
                        <p
                            style={{
                                margin: "8px 0 8px",
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-muted)",
                                paddingRight: 40,
                            }}
                        >
                            For children under 14, attending a mat class may be
                            possible with a parent or guardian, depending on the class
                            and teacher&apos;s discretion.
                        </p>
                        <p
                            style={{
                                margin: "8px 0 0",
                                fontSize: 16,
                                lineHeight: 1.7,
                                color: "var(--tbm-text-muted)",
                                paddingRight: 40,
                            }}
                        >
                            Reformer Pilates is a little different. Our equipment needs
                            to fit your body safely, so younger children may not be
                            suitable for group Reformer classes due to their height and
                            size. Not sure what&apos;s appropriate? Have a chat with us
                            first and we&apos;ll help you find the right fit.
                        </p>
                    </>
                ),
            },
        ],
    },
];

export default function FaqPage() {
    const schema = faqSchema(
        groups.flatMap((g) =>
            g.items.map((it) => ({ question: it.question, answer: it.plain })),
        ),
    );

    /* Open the first question on the page. Native <details open>
       keeps everything crawlable without a React state hook.      */
    let seenFirst = false;

    return (
        <>
            <StructuredData data={schema} />

            {/* ============ HERO (short forest band, no photo) ============ */}
            <section
                style={{
                    background: "var(--tbm-forest)",
                    color: "#f4f2ed",
                    marginTop: -85,
                    paddingTop: "calc(85px + 96px)",
                    paddingBottom: 75,
                }}
            >
                <div className="tbm-wrap tbm-g12">
                    <div
                        className="tbm-c-l7"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 24,
                        }}
                    >
                        <Reveal amount={0.3}>
                            <h1
                                style={{
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: "clamp(42px, 5.4vw, 80px)",
                                    lineHeight: 1.04,
                                    letterSpacing: "-.015em",
                                    textWrap: "balance",
                                }}
                            >
                                Questions? Start here.
                            </h1>
                        </Reveal>
                        <Reveal amount={0.2} delay={0.08}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 17,
                                    lineHeight: 1.6,
                                    maxWidth: "34em",
                                    color: "var(--tbm-on-dark-strong)",
                                }}
                            >
                                New to TBM, choosing between studios, or wondering what
                                on earth you&apos;re meant to bring to your first Yoga
                                or Pilates class?
                            </p>
                        </Reveal>
                        <Reveal amount={0.2} delay={0.16}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 17,
                                    lineHeight: 1.6,
                                    maxWidth: "34em",
                                    color: "var(--tbm-on-dark-strong)",
                                }}
                            >
                                <strong
                                    style={{
                                        fontWeight: 500,
                                        fontSize: 21,
                                        fontStyle: "italic",
                                        color: "#f4f2ed",
                                    }}
                                >
                                    We&apos;ve probably been asked about it before.
                                </strong>
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ FAQ GROUPS ============ */}
            <section
                style={{
                    paddingTop: 75,
                    paddingBottom: 75,
                    background: "var(--tbm-cream)",
                    color: "var(--tbm-ink)",
                }}
            >
                <div className="tbm-wrap tbm-g12">
                    {groups.map((group, gi) => (
                        <div
                            key={group.label}
                            className="tbm-c-all tbm-g12"
                            style={{
                                rowGap: 24,
                                alignItems: "start",
                                paddingTop: gi === 0 ? 0 : 56,
                            }}
                        >
                            <Reveal amount={0.3} className="tbm-c-l5">
                                <h2
                                    className="tbm-lbl"
                                    style={{
                                        margin: 0,
                                        paddingTop: 22,
                                        color: "var(--tbm-bronze-label)",
                                        fontSize: 13,
                                    }}
                                >
                                    {group.label}
                                </h2>
                            </Reveal>
                            <div className="tbm-c-r">
                                <div
                                    className="tbm-faq"
                                    style={{
                                        borderTop: "1px solid var(--tbm-rule)",
                                    }}
                                >
                                    <Stagger stagger={0.1}>
                                        {group.items.map((item, i) => {
                                            const isFirst = !seenFirst;
                                            if (isFirst) seenFirst = true;
                                            return (
                                                <StaggerItem key={`${group.label}-${i}`}>
                                                    <details
                                                        open={isFirst}
                                                        style={{
                                                            borderBottom:
                                                                "1px solid var(--tbm-rule)",
                                                            padding: "16px 0",
                                                        }}
                                                    >
                                                        <summary
                                                            style={{
                                                                fontSize: 20,
                                                                lineHeight: 1.4,
                                                                color: "var(--tbm-ink)",
                                                            }}
                                                        >
                                                            {item.question}
                                                            <PlusIcon />
                                                        </summary>
                                                        {typeof item.answer ===
                                                            "string" ||
                                                        isSimpleAnswer(item.answer) ? (
                                                            <p
                                                                style={{
                                                                    margin: "8px 0 8px",
                                                                    fontSize: 16,
                                                                    lineHeight: 1.7,
                                                                    color:
                                                                        "var(--tbm-text-muted)",
                                                                    paddingRight: 40,
                                                                }}
                                                            >
                                                                {item.answer}
                                                            </p>
                                                        ) : (
                                                            <div
                                                                style={{
                                                                    paddingTop: 8,
                                                                }}
                                                            >
                                                                {item.answer}
                                                            </div>
                                                        )}
                                                    </details>
                                                </StaggerItem>
                                            );
                                        })}
                                    </Stagger>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ============ STILL NOT SURE ============ */}
            <section
                style={{
                    background: "var(--tbm-sand)",
                    paddingTop: 75,
                    paddingBottom: 75,
                    color: "var(--tbm-ink)",
                }}
            >
                <div
                    className="tbm-wrap"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        gap: 20,
                    }}
                >
                    <Reveal amount={0.3}>
                        <h2
                            style={{
                                margin: 0,
                                fontWeight: 400,
                                fontSize: "clamp(36px, 4vw, 56px)",
                                lineHeight: 1.1,
                                letterSpacing: "-.01em",
                            }}
                        >
                            STILL NOT SURE? Can&apos;t find your answer?
                        </h2>
                    </Reveal>
                    <Reveal amount={0.3} delay={0.08}>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 21,
                                lineHeight: 1.5,
                                fontStyle: "italic",
                                color: "var(--tbm-ink)",
                                maxWidth: "34em",
                            }}
                        >
                            That&apos;s what humans are for. Send us a note{" "}
                            <Link href="/contact" style={{ color: "#1b2518" }}>
                                HERE
                            </Link>{" "}
                            and we&apos;ll help you work it out.
                        </p>
                    </Reveal>
                </div>
            </section>
        </>
    );
}

/* Decide how to render the answer. Simple answers (plain text and
   inline elements like <Link>, <strong>, <br>) go inside a single
   <p> so paragraph styling applies. Compound answers (multi-<p> or
   list markup) already carry their own block structure and must
   render bare to avoid an invalid <p>-inside-<p> nesting.          */
const BLOCK_TAGS = new Set([
    "p",
    "ul",
    "ol",
    "div",
    "section",
    "blockquote",
    "table",
]);

function isSimpleAnswer(node: ReactNode): boolean {
    if (node == null) return true;
    if (typeof node === "string" || typeof node === "number") return true;
    if (Array.isArray(node)) {
        return !node.some((c) => isBlockElement(c));
    }
    if (isValidElement(node)) {
        const type = (node as { type?: unknown }).type;
        // A React fragment: inspect its children for block elements.
        if (typeof type === "symbol") {
            const children = (
                node as { props?: { children?: ReactNode } }
            ).props?.children;
            if (children == null) return true;
            const list = Array.isArray(children) ? children : [children];
            return !list.some((c) => isBlockElement(c));
        }
        // Single HTML element: block or inline.
        return !isBlockElement(node);
    }
    return true;
}

function isBlockElement(node: ReactNode): boolean {
    if (!isValidElement(node)) return false;
    const t = (node as { type?: unknown }).type;
    return typeof t === "string" && BLOCK_TAGS.has(t);
}

/* Shared plus icon that rotates to a cross when the parent <details>
   is open. The rotation is driven by the global .tbm-faq rule in
   globals.css so no React state is needed.                           */
function PlusIcon() {
    return (
        <svg
            className="tbm-faq-ic"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            aria-hidden="true"
        >
            <path d="M8 1v14M1 8h14" />
        </svg>
    );
}
