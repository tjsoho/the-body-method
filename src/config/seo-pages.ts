export type SeoPageConfig = {
  slug: string;
  path: string;
  label: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords?: string;
  revalidatePaths?: string[];
};

/**
 * Per-route SEO defaults, and the list /admin/seo shows.
 *
 * Every public page has an entry. The defaults are the metadata the
 * page shipped with, so a route keeps its title until someone edits
 * it; a stored row in `seo_metadata` then wins over the default.
 *
 * Add an entry here whenever you add a page, or it will have no
 * metadata and will not appear in the SEO editor.
 */
export const seoPages: SeoPageConfig[] = [
  {
    slug: "home",
    path: "/",
    label: "Home",
    defaultTitle:
      "The Body Method | Pilates, Yoga & Movement in Tugun, Gold Coast",
    defaultDescription:
      "The Body Method is a movement community in Tugun on the Gold Coast, offering Reformer Pilates, Pilates, yoga, barre, private Pilates and more across two studios.",
  },
  {
    slug: "new-here",
    path: "/new-here",
    label: "New Here",
    defaultTitle: "New here? / 21-Day Immersion",
    defaultDescription:
      "21 days to find your kind of movement. For $99, spend three weeks across both of our Tugun studios and discover the way of moving that fits your life.",
  },
  {
    slug: "classes",
    path: "/classes",
    label: "Classes",
    defaultTitle:
      "Pilates, Reformer, Yoga, Yin, Meditation & Barre Classes Tugun Beach and Cornerstone Tugun.",
    defaultDescription:
      "Explore the ways you can move at The Body Method - Reformer, Mat Pilates, Yoga, Barre, Yin, Restorative Yoga and Meditation at Tugun Beach and Cornerstone.",
  },
  {
    slug: "memberships",
    path: "/memberships",
    label: "Memberships",
    defaultTitle:
      "Pilates & Yoga Memberships Tugun and Cornerstone Stores - The Body Method",
    defaultDescription:
      "Find the studio, membership or class pack that works with your life and makes it easier to keep showing up at The Body Method.",
  },
  {
    slug: "studios",
    path: "/studios",
    label: "Studios",
    defaultTitle: "Studios | The Body Method",
    defaultDescription:
      "Two studios in Tugun. Tugun Beach for Reformer Pilates, and Cornerstone for Pilates, yoga, barre, yin, meditation and movement.",
  },
  {
    slug: "studios-tugun-beach",
    path: "/studios/tugun-beach",
    label: "Studios: Tugun Beach",
    defaultTitle:
      "Reformer Pilates Tugun | The Body Method - Tugun Beach Studio",
    defaultDescription:
      "Boutique Reformer Pilates in Tugun. Maximum six people per class so our teachers can really teach, with Private Pilates available too.",
  },
  {
    slug: "studios-cornerstone",
    path: "/studios/cornerstone",
    label: "Studios: Cornerstone",
    defaultTitle:
      "Mat Pilates, Yoga, Yin & Barre Tugun | The Body Method Cornerstone",
    defaultDescription:
      "Pilates, yoga, barre, yin, meditation and movement at The Body Method Cornerstone - our main community home in Tugun.",
  },
  {
    slug: "private-pilates",
    path: "/private-pilates",
    label: "Private Pilates",
    defaultTitle: "Private Pilates Tugun Gold Coast | The Body Method",
    defaultDescription:
      "Dedicated time with an experienced teacher to understand your body, work toward something specific and move at the pace that’s right for you.",
  },
  {
    slug: "our-people",
    path: "/our-people",
    label: "Our People",
    defaultTitle: "Our People | The Body Method",
    defaultDescription:
      "The people behind the way you move. Meet the teachers who make The Body Method.",
  },
  {
    slug: "life-at-tbm",
    path: "/life-at-tbm",
    label: "Life at TBM",
    defaultTitle: "Life at The Body Method",
    defaultDescription:
      "More than the hour you spend on the mat. Workshops, events, friendships and the people who make The Body Method.",
  },
  {
    slug: "about",
    path: "/about",
    label: "About",
    defaultTitle: "About The Body Method | Tugun, Gold Coast",
    defaultDescription:
      "A different idea of strength. The story behind The Body Method and the philosophy that shapes our Tugun studios.",
  },
  {
    slug: "faq",
    path: "/faq",
    label: "FAQ",
    defaultTitle:
      "The Body Method FAQs | Reformer Pilates, Mat Pilates, Barre, Yin, Meditation & Yoga Tugun, Gold Coast",
    defaultDescription:
      "Answers to the questions new and returning members ask about The Body Method. Our two Tugun studios, the 21-Day Immersion, memberships, class etiquette, injuries and pregnancy.",
  },
  {
    slug: "contact",
    path: "/contact",
    label: "Contact",
    defaultTitle: "Contact + Locations | The Body Method",
    defaultDescription:
      "Get in touch with The Body Method and find our Tugun Beach and Cornerstone studios on the Gold Coast.",
  },
  {
    slug: "book",
    path: "/book",
    label: "Book",
    defaultTitle: "Book | The Body Method",
    defaultDescription:
      "Book Reformer Pilates, mat Pilates, yoga, barre or Private Pilates at The Body Method. Start the 21-Day Immersion, view the timetable or sign in as a member.",
  },
];
