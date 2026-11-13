/* ************************************************************
   /faq content shape and fallback copy.

   Answers used to be written twice: once as JSX for the page and
   once as flat text for the FAQPage schema, with a comment asking
   whoever edited one to remember the other. They are stored once
   now, as the Markdown subset RichText renders, and the schema is
   derived from the same string. The two can no longer disagree.
************************************************************ */

import type { BandHeroContent } from "@/components/core/PageHero";
import type { FaqGroupValue } from "@/components/admin/_shared/form-primitives";

export type FaqContent = {
    hero: BandHeroContent;
    groups: FaqGroupValue[];
    closing: {
        heading: string;
        /** Rich text, so the "send us a note" link lives in the copy. */
        body: string;
    };
};

export type FaqPageProps = {
    slug: string;
    title: string;
    description: string;
    content: FaqContent;
};

export const FAQ_SLUG = "faq";

export const faqFallbackData: FaqPageProps = {
    slug: FAQ_SLUG,
    title: "The Body Method FAQs | Reformer Pilates, Mat Pilates, Barre, Yin, Meditation & Yoga Tugun, Gold Coast",
    description:
        "Answers to the questions new and returning members ask about The Body Method. Our two Tugun studios, the 21-Day Immersion, memberships, class etiquette, injuries and pregnancy.",
    content: {
        hero: {
            heading: "Questions? Start here.",
            lines: [
                "New to TBM, choosing between studios, or wondering what on earth you\u2019re meant to bring to your first Yoga or Pilates class?",
            ],
            emphasisLine: "We\u2019ve probably been asked about it before.",
        },
        groups: [
            {
                label: "NEW TO THE BODY METHOD?",
                items: [
                    {
                        question: "I'm completely new to Pilates or yoga. Can I still come?",
                        answer: "Absolutely. You don't need any Pilates or yoga experience before you start at The Body Method. Let your teacher know you're new when you arrive and we'll help you from there. Everyone starts somewhere, and making you feel comfortable is part of our job.",
                    },
                    {
                        question: "What's the best way to start at The Body Method?",
                        answer: "Our 21-Day Immersion is designed specifically for this. You'll have 21 days to explore both of our Tugun studios, meet different teachers and experience Reformer Pilates, Pilates, yoga, barre, yin, meditation and other ways of moving before deciding what you'd like your regular routine to look like.",
                    },
                    {
                        question: "Do I need to be fit or flexible?",
                        answer: "Not at all. Everyone is welcome here. You come to move - you don't need to prove you can move before you arrive. Our teachers will meet you where you are and help you build from there.",
                    },
                    {
                        question: "I'm a little nervous about coming for the first time. Is that normal?",
                        answer: "Very. Walking into any new studio can feel a little daunting when you don't know the room, the teacher or what you're doing yet. Come a little early, introduce yourself and we'll take care of the rest. You'll know your way around in no time.",
                    },
                    {
                        question: "What's the best way to start at The Body Method?",
                        answer: "Our [**21-Day Immersion**](/new-here) is designed specifically for this. You'll have 21 days to explore both studios, meet different teachers and try different ways of moving before deciding what you'd like your regular routine to look like.",
                    },
                ],
            },
            {
                label: "CHOOSING A STUDIO?",
                items: [
                    {
                        question: "What's the difference between The Body Method's two Tugun studios?",
                        answer: "Our two studios offer different ways to move, both grounded in the same approach to exceptional teaching and personal care. Tugun Beach is our intimate Reformer Pilates studio, with a maximum of six people in each class. It's personal and precise, with plenty of opportunity for individual attention. Cornerstone is our larger, light-filled movement studio offering Pilates, yoga, barre, yin, meditation and more. And if you love both, that's exactly what our [Dual Membership](/memberships) is for.",
                    },
                    {
                        question: "Where is The Body Method located on the Gold Coast?",
                        answer: "You'll find both of our studios in Tugun on the southern Gold Coast - Tugun Beach and Cornerstone. They're close geographically, but intentionally offer two different movement experiences.\n\n[Need directions?](/contact)\n[Tugun Beach Pilates Studio](https://share.google/yIpCcBOu7JsYTNe5q)\n[Cornerstone Stores Studio - Upstairs Level 1 Cornerstone Stores](https://share.google/jL3QdCMThbnkGKE1b)",
                    },
                ],
            },
            {
                label: "YOUR 21-DAY IMMERSION",
                items: [
                    {
                        question: "Can I try Pilates, yoga and other classes during my 21 days?",
                        answer: "Yes, that's the idea. Your 21-Day Immersion gives you the opportunity to explore the wider Body Method experience across both Tugun studios. Try Reformer Pilates at Tugun Beach, then explore Pilates, yoga, barre, yin, meditation and other movement at Cornerstone. Meet different teachers, try different times and discover what genuinely works for you.",
                    },
                    {
                        question: "Do I need to come every day?",
                        answer: "Definitely not. This isn't a 21-day challenge or a competition to squeeze in as many classes as humanly possible. We'd much rather help you discover a rhythm you can realistically continue once your 21 days are over.",
                    },
                    {
                        question: "What happens after my 21 days?",
                        answer: "Hopefully, by then you'll have a much better sense of what you love and how movement fits into your week. From there, you can choose the membership or class option that suits you best - Cornerstone, Tugun Beach, both studios through Dual Membership, or another option that works for you.",
                    },
                    {
                        question: "I've never done Pilates or yoga before. Is the 21-Day Immersion still for me?",
                        answer: "Absolutely - you don't need to arrive knowing which class, teacher or type of movement is right for you. Your 21 days are there to help you figure that out.",
                    },
                ],
            },
            {
                label: "CLASSES + MOVEMENT",
                items: [
                    {
                        question: "What types of classes does The Body Method offer?",
                        answer: "Across our two Tugun studios, The Body Method offers Reformer Pilates, Pilates mat, yoga, barre, yin, meditation and other movement practices. Tugun Beach is home to our small-group Reformer Pilates Studio, while Cornerstone is our mat studio that offers a broader timetable and more ways to move throughout your week.\n\n[EXPLORE OUR CLASSES →](/classes)",
                    },
                    {
                        question: "Do I have to choose one type of movement?",
                        answer: "Not at all. In fact, we think there's something pretty lovely about not asking your body to want the same thing every day. Some days you might want the strength and precision of Mat Pilates or Reformer. Other days, yoga, yin or meditation might be exactly what you need. The Body Method is designed to give you different ways to move through different days.",
                    },
                ],
            },
            {
                label: "MEMBERSHIPS",
                items: [
                    {
                        question: "Can I freeze my membership?",
                        answer: "Yes, memberships can be paused in certain circumstances and within the terms of your membership. If you would like to suspend your weekly direct debit /auto-payment membership payments, please submit your request in writing via email to hello@thebodymethod.com.au. The suspension may be for a minimum of one week and a maximum of four weeks for any single suspension period. Holders must provide 5 business days of notice for any suspensions and are only permitted to suspend their debit memberships for a maximum of four weeks per year. Suspensions will not be accepted via Facebook, Instagram, telephone, text message, in person or any medium other than via email. Please note that we cannot back date the suspension request, or process your request on the same day. Your suspension request will be processed within five business days, and confirmation will be sent via email.",
                    },
                    {
                        question: "What if I'm not ready for a membership?",
                        answer: "That's absolutely okay. We have drop in class passes or packs of 5, 10, and 20 at CS, and 5, 10, 20, and 50 packs at Tugun Beach. You can find all the options [HERE](https://momence.com/u/the-body-method-QJrwuU). We'd rather help you find an option that works for your life than into a membership you won't use.",
                    },
                    {
                        question: "Can I move between Tugun Beach and Cornerstone?",
                        answer: "Your access depends on your membership. If you'd like both studios to be part of your week, our Dual Membership is designed specifically for that. See details [HERE](/memberships)",
                    },
                ],
            },
            {
                label: "CASUAL VISITS",
                items: [
                    {
                        question: "Can I come casually without becoming a member?",
                        answer: "Yes you can! Welcome! Our drop in rate at Tugun Reformer Studio for group classes is $39, for our Mat Studio at Cornerstone is $28. If you're completely new to TBM, however, we'd recommend looking at the 21-Day Immersion first - it gives you the opportunity to experience both studios rather than judging us on one class.",
                    },
                ],
            },
            {
                label: "PRIVATE PILATES",
                items: [
                    {
                        question: "Does The Body Method offer Private Pilates in Tugun?",
                        answer: "Yes. Private Pilates is available at our Tugun Beach studio and gives you dedicated one-to-one time with an experienced teacher. We also offer duet private sessions in groups of two should you wish to bring a friend. You don't need an injury to book privately. It can be useful if you're returning to movement, new to Pilates, wanting to improve technique, building confidence, navigating specific needs or simply prefer more individual attention.",
                    },
                    {
                        question: "I've been away from movement for a long time. Would Private Pilates be a good place to start?",
                        answer: "It certainly can be. A private session gives you time to talk through where you're at, move at your own pace and build confidence without worrying about keeping up with a group. Your teacher can also help you decide what might be a good next step from there.",
                    },
                ],
            },
            {
                label: "LOCATION + PARKING",
                items: [
                    {
                        question: "Where is Tugun Beach studio?",
                        answer: "Our Tugun Beach Reformer Pilates studio is located at 3/5 Toolona St, Tugun QLD 4224, close to Tugun Beach on the southern Gold Coast.",
                    },
                    {
                        question: "Where do I park for Tugun Beach?",
                        answer: "There is street parking all along the front of the studio, there is also a beach parking area at the end of the street. Please make sure you allow 10-15 minutes for parking at peak periods on weekends etc.",
                    },
                    {
                        question: "Where is The Body Method Cornerstone?",
                        answer: "Our Cornerstone studio is located Upstairs at Level 1, shop 8/570 Gold Coast Hwy, Tugun QLD 4224 - inside Cornerstone Stores. This is our larger movement studio and home to Pilates mat, yoga, barre, yin, meditation, workshops and much of our wider TBM community.",
                    },
                    {
                        question: "Where do I park for Cornerstone?",
                        answer: "There is street parking along the Gold Coast highway and surrounding streets and also limited parking in the Cornerstone carpark. Please make sure you allow 10-15 minutes for parking times during peak periods on weekends etc.",
                    },
                ],
            },
            {
                label: "WHAT TO BRING",
                items: [
                    {
                        question: "What should I bring to class?",
                        answer: "Wear something comfortable that you can move easily in and bring a water bottle, a small towel if you wish and you can also bring your own mat - but we have one for everyone already supplied. Mostly, just bring yourself. We'll let you know if there's anything particular you need for the class you've booked. We ask that everyone leave their phones with their shoes at the front door and not bring them to their mat.",
                    },
                    {
                        question: "Do I need grip socks?",
                        answer: "For Reformer Pilates at Tugun Beach, yes please. Grip socks help you move safely and comfortably on the equipment. If you've forgotten yours, we have some clean ones you can borrow and also some available for purchase.",
                    },
                ],
            },
            {
                label: "WAITLISTS",
                items: [
                    {
                        question: "The class I want is full. Should I join the waitlist?",
                        answer: "Absolutely! Plans change all the time, so it's always worth putting your name down. If a spot opens up, our booking system automatically adds people from the waitlist in order, up until one hour before class. Within an hour of class starting, things work a little differently. Everyone still on the waitlist receives a text if a spot becomes available, and the first person to reply and confirm gets the place. So keep an eye on your messages - you might just get lucky! And if you know you can no longer make it, please remove yourself from the waitlist so we don't offer you a spot you're unable to take.",
                    },
                ],
            },
            {
                label: "PREGNANCY + POSTPARTUM",
                items: [
                    {
                        question: "Can I attend classes while pregnant?",
                        answer: "We'd love you to talk to us first. Every pregnancy and every body is different, so please let us know how far along you are, whether you've been moving with us previously and anything your healthcare provider has advised. We'll help you work out which classes or private sessions are most appropriate for you.",
                    },
                    {
                        question: "Can I return after having a baby?",
                        answer: "Yes, we would love that - but there's no prize for rushing back and we recommend that post natal don't come back until 8 weeks post birth. Please make sure you've received the appropriate medical clearance and let us know where you're at before your first session. Depending on your circumstances, we may suggest starting privately before returning to group classes.",
                    },
                ],
            },
            {
                label: "INJURIES + YOUR BODY",
                items: [
                    {
                        question: "I have an injury or something going on with my body. Can I still come?",
                        answer: "Possibly, but please let your teacher know before the class begins. We need to understand what's going on so we can determine whether the class is appropriate and make adjustments where we safely can. Depending on the injury or condition, we may recommend speaking with your healthcare professional first or beginning with a Private Pilates session so we can give you more individual attention.",
                    },
                    {
                        question: "Should I tell my teacher about an old injury even if it isn't currently painful?",
                        answer: "Yes please. You know your body best, and the more relevant information our teachers have, the better they can support you. A quick conversation before class is all that's needed.",
                    },
                ],
            },
            {
                label: "BOOKING + CANCELLATIONS",
                items: [
                    {
                        question: "How do I book a class?",
                        answer: "You can view the live timetable [HERE](https://momence.com/u/the-body-method-QJrwuU) and book online through our booking system. Once you've created your account, you'll also be able to manage your upcoming classes from there.",
                    },
                    {
                        question: "What if I need to cancel a class?",
                        answer: "Life happens, and we get it! We have a **6-hour cancellation window**, giving you a little flexibility when plans change while making sure someone else has the chance to take your spot.\n\nIf you cancel less than 6 hours before class, you'll lose that session from your class pack, or incur a $10 late cancellation fee if you're on an unlimited membership. Our classes are intentionally small, and spots are often in high demand. This little policy helps us keep things fair for everyone while giving you as much flexibility as we can.",
                    },
                    {
                        question: "What happens if a class is full?",
                        answer: "Join the waitlist. Spots do open up, particularly as the class gets closer, and our booking system will let you know if you've made it in.",
                    },
                ],
            },
            {
                label: "AGE REQUIREMENTS",
                items: [
                    {
                        question: "Is there a minimum age to attend classes?",
                        answer: "We welcome young movers! Anyone aged **14-17 can attend classes independently**, provided a parent or guardian has signed our consent waiver.\n\nFor children under 14, attending a mat class may be possible with a parent or guardian, depending on the class and teacher's discretion.\n\nReformer Pilates is a little different. Our equipment needs to fit your body safely, so younger children may not be suitable for group Reformer classes due to their height and size. Not sure what's appropriate? Have a chat with us first and we'll help you find the right fit.",
                    },
                ],
            },
        ],
        closing: {
            heading: "STILL NOT SURE? Can\u2019t find your answer?",
            body: "That\u2019s what humans are for. Send us a note [HERE](/contact) and we\u2019ll help you work it out.",
        },
    },
};
