# The Body Method — Admin Panel Hand-off

## Purpose

This document explains, in enough detail to replicate, how the **Movement Assembly** website (at `/Users/tobyj/Develop/movement-assembly/`) makes every page's content editable through a `/admin` panel backed by Supabase. Your job is to apply the same pattern to **The Body Method** at `/Users/tobyj/Develop/the-body-method/` so a non-technical admin can edit every piece of visible content, swap images, and manage SEO, without touching code.

Read the whole doc top to bottom first. Then follow the worked example in section 10 to wire one page end to end. After that, the other pages are repetitions of the same recipe.

All file paths below are inside the Movement Assembly repo unless otherwise noted. Treat them as the canonical reference implementation.

---

## 1. High-level architecture

### 1.1 Stack

- **Next.js 15 App Router**, TypeScript, Tailwind. Public pages are server components under `src/app/*/page.tsx`. Admin pages live under `src/app/admin/*/page.tsx`.
- **Supabase** stores everything: content in Postgres tables, images in a Storage bucket called `site-images`, and auth in `auth.users`.
- **Auth**: an admin logs in with email + password at `/admin/login`. A Supabase SSR session cookie is set and `middleware.ts` guards every `/admin/*` route.
- **Content read path**: public server components call `getPage<T>(slug, fallback)` which reads a single row from `public.pages` by `slug` and shallow-merges its `content` JSONB on top of a static fallback. Missing fields fall back to defaults, so a fresh install never breaks.
- **Content write path**: admin edit pages use a client hook `useUpdatePage(slug)` that upserts the `pages` row and then calls the `revalidateAllPages()` server action so the live site shows the change immediately.
- **No per-page redeploy needed**. Pages are marked `export const dynamic = "force-dynamic"` (and typically `revalidate = 0`) so every request reads the latest Supabase row.

### 1.2 Env vars

Only two are required for the admin to work. Both live in `.env.local` at the repo root:

```
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
```

Optional:

- `NEXT_PUBLIC_BASE_URL` — used by `buildPageMetadata()` for canonical URLs and og:url.
- `TURNSTILE_SECRET_KEY` — used by the Career form handler if you turn on Cloudflare Turnstile.

### 1.3 Supabase clients

Three thin wrappers around the official SDK. Pick the one that matches the environment you are running in.

| File | Purpose |
|------|---------|
| `src/utils/supabase.ts` | Plain anon client, module-scoped. Used from server components that just need to **read** public rows. No cookies, so RLS sees the request as anonymous. |
| `src/utils/server.ts` | `createClient()` — Supabase SSR client wired to Next's `cookies()`. Use this in server actions and middleware when you need the admin's auth session (so RLS passes on writes). |
| `src/utils/client.ts` | `createClient()` — browser client. Used from admin forms for upserts and from the storage helpers to upload images. |

```ts
// src/utils/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );
}
```

### 1.4 Middleware auth gate

`src/middleware.ts` gates every `/admin/*` route except `/admin/login`. If there is no Supabase session, it redirects to the login page.

```ts
// src/middleware.ts
"use server";
import { NextResponse, NextRequest } from "next/server";
import { createClient } from "./utils/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/login") return NextResponse.next();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/admin/login", request.url));
  return NextResponse.next();
}

export const config = { matcher: ["/admin", "/admin/:path*"] };
```

### 1.5 Login

`src/server-actions/admin.ts` exports a `login(email, password)` server action that calls `signInWithPassword`, writes `sb-access-token` and `sb-refresh-token` cookies, then `redirect("/admin")`. The form is in `src/components/admin/login-form.tsx` and the route is `src/app/admin/login/page.tsx`.

You create the admin user manually in the Supabase dashboard: Authentication, Users, Add user. There is no public sign-up.

### 1.6 Caching + revalidation

- Every public page sets `export const dynamic = "force-dynamic"`. Many also set `export const revalidate = 0`. The reason: an admin edit should show up on the next request without a redeploy.
- After a save, the admin-side hook calls `revalidateAllPages()` (defined in `src/server-actions/revalidate.ts`), which iterates `revalidatePath()` over the known routes.
- Server actions that write single rows (nav, service pages) call `revalidatePath()` for just the pages they touched. Both approaches are safe to combine.

### 1.7 Read fallback helper

Every page uses the same reader. It is the single most important primitive in the system.

```ts
// src/server-actions/page.ts
import { supabase } from "@/utils/supabase";

export default async function getPage<
  TContent extends { content?: unknown } = { content?: unknown },
>(slug: string, fallbackData: TContent): Promise<TContent> {
  const response = await supabase
    .from("pages").select("*").eq("slug", slug).single();
  if (response.error || !response.data) return fallbackData;

  const db = response.data as Record<string, unknown>;
  const fb = fallbackData as unknown as Record<string, unknown>;
  const fbContent = (fb.content ?? {}) as Record<string, unknown>;
  const dbContent = (db.content ?? {}) as Record<string, unknown>;

  // Shallow-merge content so any new field we add to the TS schema
  // gracefully falls back without having to re-save every row.
  return { ...fb, ...db, content: { ...fbContent, ...dbContent } } as TContent;
}
```

### 1.8 Write hook

```ts
// src/utils/hooks/useUpdatePage.ts
"use client";
import { BasePage } from "@/app/types";
import { createClient } from "@/utils/client";
import { useState } from "react";
import { revalidateAllPages } from "@/server-actions/revalidate";

export default function useUpdatePage<TContent>(slug: string) {
  const [isSaving, setIsSaving] = useState(false);
  const updatePage = async (page: BasePage<TContent>) => {
    const supabase = createClient();
    setIsSaving(true);
    const { data: existing } = await supabase
      .from("pages").select("*").eq("slug", slug).single();
    const { error } = await supabase.from("pages").upsert(
      { id: existing?.id, ...page, slug, updated_at: new Date().toISOString() },
      { onConflict: "slug" }
    );
    if (error) { setIsSaving(false); throw error; }
    try { await revalidateAllPages(); } catch {}
    setIsSaving(false);
  };
  return { isSaving, updatePage };
}
```

The `BasePage<TContent>` type is the row shape:

```ts
// src/app/types/index.ts
export type BasePage<TContent> = {
  id?: string;
  title: string;         // used as <title> and meta title
  description: string;   // used as meta description
  slug: string;          // primary key by uniqueness
  content: TContent;     // page-specific JSONB blob
  created_at?: string;
  updated_at?: string;
};
```

---

## 2. Per-page inventory

Movement Assembly has 20 admin routes plus login and dashboard. Each one maps to a public page or page-group.

| Admin route | Public route(s) it edits | DB slug | Fallback / type file | Inputs component |
|---|---|---|---|---|
| `/admin` | n/a — dashboard | n/a | `src/components/admin/AdminTiles.tsx` | `AdminDashboard.tsx` |
| `/admin/login` | n/a | n/a | `src/components/admin/login-form.tsx` | `LoginForm` |
| `/admin/home` | `/` | `home` | `src/app/_config.ts` → `HomePageProps` | `home-inputs.tsx` |
| `/admin/about-us` | `/about` | `about-us` | `src/app/about/_config.ts` | `about-us-inputs.tsx` |
| `/admin/who-we-help` | `/who-we-help` | `who-we-help` | `src/app/who-we-help/_config.ts` | `who-we-help-inputs.tsx` |
| `/admin/commercial-property-wellness` | `/commercial-property-wellness` | `commercial-property-wellness` | matching `_config.ts` | `commercial-property-wellness-inputs.tsx` |
| `/admin/corporate-teams` | `/corporate-teams` | `corporate-teams` | matching `_config.ts` | `corporate-teams-inputs.tsx` |
| `/admin/services` | `/services` | `services` | matching `_config.ts` | `services-inputs.tsx` |
| `/admin/contact` | `/contact` | `contact` | `src/app/_config.ts` → `ContactPageProps` | `contact-inputs.tsx` |
| `/admin/corporate-wellness-faq` | `/corporate-wellness-faq` | `faq` | matching `_config.ts` | `corporate-wellness-faq-inputs.tsx` |
| `/admin/career` | `/career` | `career` | `src/app/_config.ts` → `CareerPageProps` | `career-inputs.tsx` |
| `/admin/career/submissions` | n/a — form inbox | reads `career_submissions` table | n/a | `career-submissions.tsx` |
| `/admin/blog` | `/blog/[slug]` collection | `blogs` table | `src/app/types/blog.ts` | `BlogForm.tsx` + `BlogList.tsx` |
| `/admin/blog-page` | `/blog` (the hub) | `blog` | `src/app/blog/_config.ts` | `blog-page-inputs.tsx` |
| `/admin/service-pages` | `/[slug]` collection | `pages` rows where `content.kind === 'service'` | `src/app/[slug]/_config.ts` | `service-pages-index.tsx` |
| `/admin/service-pages/new` | create entry UX | writes a `pages` row | n/a | `new-service-page-form.tsx` |
| `/admin/service-pages/[slug]` | `/[slug]` edit | `pages.slug` | same as above | `service-page-inputs.tsx` |
| `/admin/locations` | n/a — list card view | n/a | n/a | inline `page.tsx` |
| `/admin/locations/[slug]` | `/locations/[slug]` | `brisbane`, `sydney`, `melbourne` rows | `src/app/locations/[slug]/_config.ts` | `location-inputs.tsx` |
| `/admin/navigation` | header on every page | `__navigation` row | `src/data/navigation.ts` | `navigation-inputs.tsx` |
| `/admin/footer` | footer on every page | `footer` | `src/app/_config.ts` → `FooterProps` | `footer-inputs.tsx` |
| `/admin/site-logo` | logo + favicon | `footer` row (same row, `logoImage`, `siteLogo`, `favicon`) | ditto | `site-logo-inputs.tsx` |
| `/admin/team` | `/team` page | `team` for the page, plus `team` table for members | `src/app/team/_config.ts` + `src/app/types/team.ts` | `team-inputs.tsx` |
| `/admin/privacy-policy` | `/privacy-policy` | `privacy-policy` | `src/app/privacy-policy/_config.ts` | `privacy-policy-inputs.tsx` |
| `/admin/terms-and-conditions` | `/terms-and-conditions` | `terms-and-conditions` | matching `_config.ts` | `terms-and-conditions-inputs.tsx` |
| `/admin/terms-of-use` | `/terms-of-use` | `terms-of-use` | matching `_config.ts` | `terms-of-use-inputs.tsx` |

Everything under **Page Content** follows the same page recipe (sections 2.1 to 2.14 below). Dynamic collections are covered in section 8.

### 2.1 Home — `/admin/home`

Edits the `home` row in `pages`. The `HomePageContent` type in `src/app/_config.ts` defines every field: hero image, title (with `heroTitleBold` boolean), paragraph, two CTA buttons, a scroll-indicator colour, a 9-slide hero carousel, then sections 2 to 9 each with a subtitle, title, paragraph, optional background image, and a repeating card collection (`section2JourneyCards`, `section3cards`, `section4services`, `section5approachCards`, `section8stats`, `section8clientLogos`, `section8testimonials`, `section9locations`). Section 6 is a 4-slot FAQ with inline `additionalSection6Faqs` for extras. Sections can be dragged to re-order (`sectionsOrder: string[]`) and hidden with eye toggles (`sectionXVisible: boolean`). The public page renders them in that order.

### 2.2 About — `/admin/about-us`

Content stored under slug `about-us` but the URL is `/about`. The admin `PageMetaPanel` shows the URL as read-only. SEO canonical is pinned in `src/utils/seo.ts` via the `canonicalPath: "/about"` option. Same section-order + visibility pattern as home.

### 2.3 Who We Help, Property Managers, Corporate Teams, Services

Each one is a dedicated inputs file reading its own `_config.ts` type and saving to its own slug. All follow the sidebar + sections structure.

### 2.4 Contact — `/admin/contact`

Edits every string on the contact page, including every form field label and placeholder, success and error messages, privacy note, office hours, quick links, and the final CTA. Also stores `web3formsAccessKey` so the admin can wire up form delivery without redeploying.

### 2.5 FAQ — `/admin/corporate-wellness-faq`

Page row `faq`. Edits the page's hero, intro and CTA sections, plus an array of FAQs. The bottom-of-page FAQ sections elsewhere in the site use the same primitives (see `page-faqs-data.ts`).

### 2.6 Career — `/admin/career`

Extends the contact page shape with `disclaimer` and `turnstileSiteKey`. Submissions land in a separate `career_submissions` table viewed at `/admin/career/submissions` (the row list is rendered read-only, with an export action).

### 2.7 Blog — `/admin/blog` and `/admin/blog-page`

Two things to know:
- The hub page at `/blog` is edited at `/admin/blog-page` (hero, intro, CTA) and stored on the `blog` slug in `pages`.
- Individual posts are stored in their own `blogs` table and edited at `/admin/blog`. List + edit views live inside one route using local view state. New posts live under the same route via a `view === "new"` branch.

### 2.8 Service Pages — `/admin/service-pages`

A full dynamic collection. Every row in `pages` whose `content.kind === 'service'` is a service page. See section 8 for the whole lifecycle (new, edit, rename, delete, seed).

### 2.9 Locations — `/admin/locations` and `/admin/locations/[slug]`

Fixed set of three cities (`brisbane`, `sydney`, `melbourne`), stored as three rows in `pages`. The index page renders three cards; each card links to `/admin/locations/<slug>`. Public URL is `/locations/<slug>` so the SEO helper pins the canonical.

### 2.10 Navigation — `/admin/navigation`

Edits the `__navigation` row in `pages`. Tree of `NavLink` with any depth. Drag-and-drop reorder within a sibling list. Also manages the header CTA text + href, which is stored on the `footer` row under `headerCtaText` and `headerCtaHref`.

### 2.11 Footer — `/admin/footer`

Edits the `footer` row. One input group per block: logo + favicon + social-share image, tagline, contact strip (phone, email, service areas), legal fields (ABN, ACN, copyright), link columns (editable collection), socials (icon + URL per platform), section titles.

### 2.12 Site Logo — `/admin/site-logo`

A thin page that edits three fields on the `footer` row: `logoImage`, `siteLogo`, `favicon`. The favicon flows out through the `src/app/api/favicon/route.ts` dynamic endpoint so Google and the browser tab pick up changes.

### 2.13 Team — `/admin/team`

Edits both the `team` page row (hero + intro) and the `team` table (one row per member with title, excerpt, markdown content, cover image, slug).

### 2.14 Legal pages — `/admin/privacy-policy`, `/admin/terms-and-conditions`, `/admin/terms-of-use`

Each has its own `pages` row plus dedicated tables (`privacy_policy`, `terms_and_conditions`, `terms_of_use`) for the long-form rich-text body. The inputs file uses the `RichTextEditor` primitive for the body and the standard `PageMetaPanel` for SEO.

---

## 3. Admin UI primitives

All in one file: `src/components/admin/_shared/form-primitives.tsx`. Every admin page imports from here. Copy this file wholesale to the body-method repo, then swap the brand tokens (hard-coded `#121717`, `#92d645`, `#fafaf7`) for the body-method palette.

### 3.1 AdminPageShell

Wraps every edit page. Two-column layout when a `sidebar` prop is given, single-column fallback otherwise.

```tsx
<AdminPageShell sidebar={<SectionSidebar ... />}>
  <section className={active === "hero" ? "space-y-4" : "hidden"}>...</section>
</AdminPageShell>
```

### 3.2 SaveBanner

Sticky top bar used on every edit page. Not in `form-primitives.tsx`; lives at `src/components/core/save-banner.tsx`. Takes `pageTitle`, `onSave`, `isSaving`.

```tsx
<SaveBanner pageTitle="Home" onSave={handleSave} isSaving={isSaving} />
```

### 3.3 TextInput

Short single-line text. Controlled: `value` + `onChange(next)`.

```tsx
<TextInput label="Hero Title" value={heroTitle} onChange={setHeroTitle}
           placeholder="Enter title" />
```

### 3.4 TextAreaInput

Multi-line. `rows={4}` by default.

### 3.5 BoldToggle / BoldableText

Pattern for inline bold toggles. Every editable heading or paragraph has a sibling `*Bold` boolean. `BoldableText` combines a label, textarea or input, and a tiny Bold checkbox. Rendered on the public page as `<span className={bold ? "font-bold" : ""}>`.

```tsx
<BoldableText id="hero-title" label="Title" as="textarea" rows={2}
  value={heroTitle} onChange={setHeroTitle}
  bold={heroTitleBold} onBoldChange={setHeroTitleBold} />
```

### 3.6 ImageInput

Click a thumbnail, pick an image from the media library (or upload a new one). The underlying picker is the global `ImageLibraryContext`; wrap every admin page in `<ImageLibraryProvider>` to enable it. Supports an optional `altValue` + `onAltChange` to let the admin edit alt text next to the image.

```tsx
<ImageInput label="Background image" value={heroImage}
            onChange={setHeroImage} usage="home-hero" aspect="wide" />
```

`usage` is a free-form tag stored in `image_library.usage_data` so the media library can show where each image is referenced.

### 3.7 IconField

Toggle + ImageInput paired for optional icons. When toggled off, the icon is hidden on the public page but the URL is preserved.

### 3.8 ButtonHrefField

The canonical button editor. Combines button text with a link-type picker: "No link", "Internal page", "External URL". When Internal is selected and `availablePages` is passed, it renders a grouped `<select>` of every page in the site (Core, Service, Legal). Internal pages are collected server-side by `getAvailablePages()`.

```tsx
<ButtonHrefField
  label="CTA Button"
  text={heroButton1Text} href={heroButton1Href}
  onTextChange={setHeroButton1Text} onHrefChange={setHeroButton1Href}
  availablePages={props.availablePages}
/>
```

### 3.9 CtaField

Simpler text + destination combo, no page picker. Kept for backwards-compat; prefer `ButtonHrefField` on new pages.

### 3.10 SelectInput and HeroScrollColorSelect

Generic dropdown and a brand-specific one for the scroll-indicator colour.

### 3.11 ColorInput

Hex picker + text field.

### 3.12 Toggle

iOS-style switch. Used for section visibility, form submit toggles, etc.

### 3.13 FieldGroup

Card wrapper with optional title, description, toolbar slot. Wraps groups of related inputs.

### 3.14 SectionTitleHeader

Inline-renameable heading. The section label can be edited in place and persists to state (local labels only; most pages keep labels local).

### 3.15 SectionSidebar

The vertical sidebar on every edit page. Supports drag-to-reorder and eye-toggle visibility. Hook up `visibility` + `onVisibilityChange` to show hide-toggles.

```tsx
<SectionSidebar
  tabs={[{ value: "hero", label: "Hero" }, ...sectionsOrder.map(k => ({value: k, label: titles[k]}))]}
  active={active} onChange={setActive}
  onReorder={next => setSectionsOrder(next.filter(v => v !== "hero"))}
  visibility={{ section2: section2Visible, ... }}
  onVisibilityChange={(key, visible) => { if (key === "section2") setSection2Visible(visible); }}
/>
```

### 3.16 PageMetaPanel

The URL + Meta Title + Meta Description + optional og:image editor. Stored on `pages.title`, `pages.description`, and `content.ogImage`. Shown in the sidebar underneath `SectionSidebar`.

### 3.17 ListItemCard + AddItemButton + nextId

For every repeater (cards, logos, testimonials, FAQs, etc.). Pattern:

```tsx
<FieldGroup title="Journey cards" toolbar={
  <AddItemButton onClick={() => setCards([...cards, { id: nextId(cards), title: "", ... }])}>
    Add card
  </AddItemButton>
}>
  {cards.map((card, i) => (
    <ListItemCard key={card.id} title={`Card ${i+1}`} onRemove={() => setCards(cards.filter(c => c.id !== card.id))}>
      <ImageInput label="Image" value={card.image} onChange={v => updateIn(cards, card.id, {image: v}, setCards)} />
      ...
    </ListItemCard>
  ))}
</FieldGroup>
```

### 3.18 RichTextEditor

Tiptap-based rich-text editor at `src/components/core/RichTextEditor.tsx`. Used in blog posts, team bios, legal pages. Integrates with the image library through the same `ImageLibraryContext`. Returns HTML.

```tsx
<RichTextEditor content={content} onChange={setContent} />
```

### 3.19 Saving style

Admin forms do **not** auto-save. Every page keeps local state and persists only when the admin clicks the Save button in `SaveBanner`. Toast errors are shown via `react-hot-toast` (set up in `src/app/admin/layout.tsx`).

---

## 4. Save / publish flow

For a plain `pages`-row page (home, contact, footer, etc.):

1. Admin clicks Save in `SaveBanner`.
2. The page's inputs file calls `useUpdatePage<TContent>(slug)`'s `updatePage({ ...page, content: {...} })`.
3. The hook looks up the existing row by `slug` to get its `id`, then upserts the full row.
4. On success, it calls `revalidateAllPages()` server action.
5. Any browser visiting `/<page>` next renders the fresh data via `getPage()` because the page is `force-dynamic`.
6. Errors surface as a toast and as a console log. The `SaveBanner` button shows a red "Error — retry" state if `saveStatus` is set to "error".

For dynamic collections (service pages, blog posts, etc.):

1. Admin edits in a dedicated form.
2. The form calls a server action in `src/server-actions/*` (e.g. `updateServicePage`, `updateBlogPost`).
3. The action uses the **cookies-aware** client (`createClient()` from `utils/server.ts`) so RLS sees the request as authenticated.
4. The action calls `revalidatePath()` for exactly the routes it touched.
5. The form navigates back to the list.

---

## 5. Image + media handling

### 5.1 Supabase Storage bucket

Name: **`site-images`**. Create it manually in the Supabase dashboard **before** running `setup-database.sql`.

Settings:
- Public: yes (so public URLs work without signing).
- File size limit: 50 MB (the client enforces 5 MB too — see `MAX_FILE_SIZE` in `src/utils/storage.ts`).
- No MIME restrictions at the bucket level; the admin only uploads images.

Policies: the setup script creates public read / insert / update / delete policies on `storage.objects` scoped to `bucket_id = 'site-images'`. You can tighten these to `auth.role() = 'authenticated'` on writes if you want to lock uploads to signed-in admins. The current project leaves them public because the admin route itself is already auth-gated.

### 5.2 Upload flow

`src/utils/storage.ts` exposes:

- `getAllImages(): Promise<string[]>` — lists everything in the bucket as public URLs.
- `uploadImage(file: File): Promise<{ url, error }>` — enforces 5 MB, prefixes filename with `Date.now()`, uploads, returns the public URL.
- `deleteImage(url): Promise<{ error }>` — splits the URL to filename and removes.

### 5.3 Image library

`src/contexts/ImageLibraryContext.tsx` holds a React context that any `ImageInput` consumes. Call `openImageLibrary(onSelect, usage)` and the picker modal (`src/components/core/media-library-modal.tsx`) opens. Selecting an image fires `onSelect(url)` and records usage in the `image_library` table so admins can see where images are used.

Wrap every admin page in `<ImageLibraryProvider>`. Example:

```tsx
return (
  <ImageLibraryProvider>
    <HomeAdminInputs {...} />
  </ImageLibraryProvider>
);
```

### 5.4 next.config.ts

Add the Supabase host to `images.remotePatterns` so `<Image>` can load uploaded images. The Movement Assembly config reads the Supabase host from env and whitelists `https://<host>/storage/v1/object/public/**`.

```ts
const supabaseHost = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!).hostname;
images: {
  remotePatterns: [
    { protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/**" },
    // + unsplash, cdn.shopify.com if needed
  ],
}
```

### 5.5 Favicon

Dynamic favicon lives at `src/app/api/favicon/route.ts`. It reads `pages.footer.content.favicon`, redirects `/favicon.ico` to `/api/favicon` via `next.config.ts` redirects, and streams the bytes back. This is how an admin-uploaded favicon shows up in Google search.

The `generateMetadata()` in `src/app/layout.tsx` also sets `icons: { icon, shortcut, apple }` from the same field so the `<link>` tag in every page's head stays in sync.

---

## 6. Navigation + footer + global site data

### 6.1 Header navigation

Admin route: `/admin/navigation`. Data: `pages` row with slug `__navigation` and content shape `{ kind: "navigation", items: NavLink[] }`.

```ts
// src/data/navigation.ts
export type NavLink = {
  id: number;
  label: string;
  pageSlug: string;     // empty string = section header in mega-menu
  children: NavLink[];  // any depth
};
```

Default tree in `defaultNavLinks` in the same file. When the row doesn't exist, the header renders the default so a fresh install never has an empty menu.

Server actions in `src/server-actions/navigation.ts`:

- `getNavigation(): Promise<NavLink[]>` — reads the `__navigation` row, falls back to defaults.
- `saveNavigation(items)` — upserts the row, calls `revalidatePath("/", "layout")` so the header everywhere re-renders.
- `getAvailablePages()` — enumerates every page the admin can link to: the hard-coded `STATIC_PAGES` list plus every service-page row. Used by `ButtonHrefField`.
- `saveHeaderCta(text, href)` — writes the big green CTA button in the header to the footer row (`headerCtaText` and `headerCtaHref`), merging into existing footer content.

Important: `src/server-actions/navigation.ts` is `"use server"` so Next forbids non-async-function exports from it. Types and defaults therefore live in `src/data/navigation.ts`.

### 6.2 Footer

Admin route: `/admin/footer`. Data: `pages` row with slug `footer`. Shape in `FooterContent` in `src/app/_config.ts`:

- `logoImage`, `siteLogo`, `favicon`, `ogImage`
- `tagline`, `phone`, `email`, `serviceAreas`, `abn`, `acn`, `copyright` (each with a `*Bold` sibling)
- `linkColumns: FooterLinkColumn[]` — admin-managed columns of links
- `socials: SocialLink[]` — admin-managed platform + URL
- `headerCtaText`, `headerCtaHref` — used by the header, edited inside `/admin/navigation`
- `sectionTitles` — for footer section labels

`FooterWrapper` reads the row and passes it to the `Footer` component. The header reads the same row for the CTA button and the socials, so a single save flows into both.

### 6.3 Global SEO defaults

`src/utils/seo.ts` has two helpers:

- `buildPageMetadata(slug, fallback?, overrides?, options?)` — returns Next's Metadata object. Reads `pages.title`, `pages.description`, `content.ogImage` for the given slug. Falls back to the site-wide og image on the footer row. Uses `NEXT_PUBLIC_BASE_URL` for canonicals. Call from every public page's `generateMetadata()`.
- `buildPostMetadata(post, basePath, overrides?)` — same shape but driven by a blog-post record (uses the row's own `meta_title`, `meta_description`, `keywords`, `cover_image`).

Pass `options.canonicalPath` when the DB slug doesn't match the URL (e.g. the About page is stored as `about-us` but lives at `/about`).

---

## 7. SEO per page

Every admin edit page shows a `PageMetaPanel` in its sidebar. It controls three fields:

1. `pages.title` — becomes the `<title>` and og:title.
2. `pages.description` — becomes `<meta name="description">` and og:description.
3. `content.ogImage` — optional per-page override; falls back to the footer `ogImage` and then to a bundled asset.

The URL in the panel is read-only for static pages (the folder name owns the route) and editable for dynamic ones (service pages — triggers a slug rename, see `renameServicePage` in `server-actions/service-pages.ts`).

The optional `seo_metadata` table in `setup-database.sql` is **not currently used** by Movement Assembly — SEO is driven entirely by the `pages` row's own `title` + `description`. Leave the table in the schema in case a future enhancement wants per-route keyword overrides.

No JSON-LD structured data is wired up today. If body-method needs it, write a helper that reads from the same `pages` row and emits a `<script type="application/ld+json">` tag in each page.

---

## 8. Dynamic entity collections

### 8.1 Service pages

The pattern. Every row in `pages` where `content.kind === 'service'` is a service page.

Files:
- Index: `src/app/admin/service-pages/page.tsx` + `service-pages-index.tsx` (grid of cards with edit / delete).
- New: `src/app/admin/service-pages/new/page.tsx` + `new-service-page-form.tsx` (name + slug form).
- Edit: `src/app/admin/service-pages/[slug]/page.tsx` + `service-page-inputs.tsx`.
- Seed: `src/app/admin/service-pages/seed/page.tsx` (idempotent one-click seeder for admin to bootstrap all services at once).
- Public: `src/app/[slug]/page.tsx` — loads the row, bails with `notFound()` if `content.kind !== 'service'` or the slug is reserved.
- Server actions: `src/server-actions/service-pages.ts` — `getServicePages`, `createServicePage`, `seedServicePageFromDefaults`, `updateServicePage` (with optional slug rename), `renameServicePage`, `deleteServicePage`.

Slug guards in `src/data/reserved-slugs.ts`. When creating a new service page, we validate against that list so admins can't create `/about` or `/admin`.

### 8.2 Blog posts

Collection stored in its own `blogs` table (not `pages`). Richer field set: title, slug, author, cover image, excerpt, Tiptap HTML content, SEO fields (`meta_title`, `meta_description`, `keywords`), `sort_order`.

Files:
- Admin index + edit in one route: `src/app/admin/blog/page.tsx` toggles between list and form via local view state.
- Form: `src/components/admin/BlogForm.tsx` — uses `react-hook-form`, auto-slugs from the title, unlocks slug once edited, Tiptap for body.
- Actions: `src/server-actions/blog-mutations.ts` — `createBlogPost`, `updateBlogPost`, `deleteBlogPost`, `listBlogPostsAdmin`.
- Public collection: `src/app/blog/page.tsx` (hub) renders `BlogPageClient` with the posts.
- Public detail: `src/app/blog/[slug]/page.tsx` uses `buildPostMetadata` for SEO and renders the Tiptap HTML.

### 8.3 Locations

A **fixed** collection (three cities) rather than open-ended. The index at `/admin/locations` is just three card links. Each card edits one slug from the `LOCATION_SLUGS` constant. Public URL is `/locations/<slug>`.

### 8.4 Team members

Open-ended collection in its own `team` table. The `/admin/team` page edits both the hub-page copy and the member list.

---

## 9. Database schema

Run `setup-database.sql` at the repo root against the body-method Supabase project **after** you have created the `site-images` storage bucket in the dashboard.

What it creates:

- `pages` — the dynamic-content table. Primary key `id uuid`, unique `slug text`, nullable `title`, `description`, `content jsonb`. RLS on: anyone can read, only `auth.role() = 'authenticated'` can write.
- `blogs` — blog posts. Title, cover_image, excerpt, author, content (HTML), unique slug, SEO fields, timestamps. RLS same as pages.
- `image_library` — ledger of uploaded images with `usage_data jsonb`. RLS: public read, authenticated writes.
- `seo_metadata` — optional per-slug SEO overrides (not currently used, but keep it).
- `faq_categories` and `faqs` — for page-wide FAQ bank; used by `page-faqs-data.ts`. RLS off.
- `team` — team member cards.
- `privacy_policy`, `terms_and_conditions`, `terms_of_use` — single-row content tables (primary key is a fixed string like `'privacy-policy-1'`). Each has its own RLS.
- Storage policies on `site-images` bucket: public read + insert + update + delete.
- Triggers `trigger_set_timestamp()` and `update_updated_at_column()` keep `updated_at` current.

Full SQL, abbreviated for readability. Transcribe from `setup-database.sql` verbatim when you run it; the snippet below is the main structure.

```sql
-- Pages (content-driven pages)
create table if not exists public.pages (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  title text,
  description text,
  content jsonb,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);
alter table public.pages enable row level security;
create policy "Enable read access for all users" on public.pages for select using (true);
create policy "Enable insert for authenticated users only" on public.pages
  for insert with check (auth.role() = 'authenticated');
create policy "Enable update for authenticated users only" on public.pages
  for update using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
create policy "Enable delete for authenticated users only" on public.pages
  for delete using (auth.role() = 'authenticated');

-- Blog posts
create table if not exists public.blogs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  cover_image text,
  excerpt text,
  author text not null,
  content text,
  slug text not null unique,
  meta_title text,
  meta_description text,
  keywords text,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Image library ledger
create table if not exists public.image_library (
  id uuid default gen_random_uuid() primary key,
  file_name text not null,
  url text not null,
  usage_data jsonb default '{}'::jsonb,
  created_at timestamptz default timezone('utc'::text, now()) not null,
  updated_at timestamptz default timezone('utc'::text, now()) not null
);

-- Storage policies (bucket must be created in dashboard first)
create policy "Public read access for site-images"
  on storage.objects for select
  using (bucket_id = 'site-images');
create policy "Public insert for site-images"
  on storage.objects for insert
  with check (bucket_id = 'site-images');
```

Also include the `team`, `privacy_policy`, `terms_and_conditions`, `terms_of_use`, `faqs`, `faq_categories` and `seo_metadata` tables from the file. The `faqs` table has a General-category guard (prevents deletion, auto-reassigns orphan FAQs) you should keep.

After the SQL runs, create the admin user: Supabase Dashboard, Authentication, Users, Add user. Use the credentials to log in at `/admin/login`.

---

## 10. Worked example: making one body-method page editable

Target: take the body-method `/private-pilates` page and make it fully editable from `/admin/private-pilates`.

Assume the page exists at `src/app/private-pilates/page.tsx` today as a static component with hard-coded strings and images.

### Step 1 — Describe the content shape

Create `src/app/private-pilates/_config.ts`.

```ts
import { BasePage } from "../types";

export type PrivatePilatesContent = {
  ogImage?: string;
  heroImage: string;
  heroTitle: string;
  heroTitleBold: boolean;
  heroParagraph: string;
  heroParagraphBold: boolean;
  heroButton1Text: string;
  heroButton1Href?: string;
  // One section 2, benefits grid:
  section2Subtitle: string;
  section2Title: string;
  section2TitleBold: boolean;
  section2Paragraph: string;
  section2Cards: { id: number; title: string; titleBold: boolean; description: string; descriptionBold: boolean; icon?: string; showIcon?: boolean }[];
  // CTA at the bottom:
  ctaTitle: string;
  ctaTitleBold: boolean;
  ctaButtonText: string;
  ctaButtonHref?: string;
  ctaBackgroundImage: string;
};

export type PrivatePilatesProps = BasePage<PrivatePilatesContent>;

export const privatePilatesFallbackData: PrivatePilatesProps = {
  title: "Private Pilates",
  description: "One-on-one Pilates sessions tailored to your body.",
  slug: "private-pilates",
  content: {
    heroImage: "/images/private-pilates-hero.webp",
    heroTitle: "Private Pilates",
    heroTitleBold: false,
    heroParagraph: "One-on-one sessions tailored to your body.",
    heroParagraphBold: false,
    heroButton1Text: "Book a session",
    heroButton1Href: "/contact",
    section2Subtitle: "- Benefits -",
    section2Title: "Why private?",
    section2TitleBold: false,
    section2Paragraph: "Short description of the benefits.",
    section2Cards: [
      { id: 1, title: "Tailored", titleBold: false, description: "...", descriptionBold: false },
      { id: 2, title: "Focused", titleBold: false, description: "...", descriptionBold: false },
    ],
    ctaTitle: "Start today",
    ctaTitleBold: false,
    ctaButtonText: "Book now",
    ctaButtonHref: "/contact",
    ctaBackgroundImage: "/images/cta-background.webp",
  },
};
```

### Step 2 — Rewrite the public page to read from Supabase

`src/app/private-pilates/page.tsx`:

```tsx
import type { Metadata } from "next";
import { buildPageMetadata } from "@/utils/seo";
import getPage from "@/server-actions/page";
import { privatePilatesFallbackData, PrivatePilatesProps } from "./_config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("private-pilates", privatePilatesFallbackData);
}

export default async function PrivatePilatesPage() {
  const page = await getPage<PrivatePilatesProps>("private-pilates", privatePilatesFallbackData);
  const c = page.content;
  return (
    <main>
      {/* render c.heroTitle, c.heroImage, c.section2Cards, etc. */}
    </main>
  );
}
```

### Step 3 — Create the admin route

`src/app/admin/private-pilates/page.tsx`:

```tsx
import getPage from "@/server-actions/page";
import { getAvailablePages } from "@/server-actions/navigation";
import { ImageLibraryProvider } from "@/contexts/ImageLibraryContext";
import PrivatePilatesInputs from "@/components/admin/private-pilates-inputs";
import { privatePilatesFallbackData, PrivatePilatesProps } from "@/app/private-pilates/_config";

export const dynamic = "force-dynamic";

export default async function PrivatePilatesAdmin() {
  const [page, availablePages] = await Promise.all([
    getPage<PrivatePilatesProps>("private-pilates", privatePilatesFallbackData),
    getAvailablePages(),
  ]);
  return (
    <ImageLibraryProvider>
      <PrivatePilatesInputs
        title={page.title} description={page.description}
        slug={page.slug} content={page.content}
        availablePages={availablePages}
      />
    </ImageLibraryProvider>
  );
}
```

### Step 4 — Build the inputs component

`src/components/admin/private-pilates-inputs.tsx`. Use the primitives from `_shared/form-primitives.tsx`:

```tsx
"use client";
import { useState } from "react";
import { SaveBanner } from "@/components/core/save-banner";
import useUpdatePage from "@/utils/hooks/useUpdatePage";
import {
  AdminPageShell, SectionSidebar, PageMetaPanel,
  FieldGroup, BoldableText, ImageInput, ButtonHrefField,
  TextInput, TextAreaInput, AddItemButton, ListItemCard, nextId,
} from "@/components/admin/_shared/form-primitives";
import { PrivatePilatesContent, PrivatePilatesProps } from "@/app/private-pilates/_config";
import { AvailablePage } from "@/data/navigation";

interface Props extends PrivatePilatesProps { availablePages?: AvailablePage[]; }

export default function PrivatePilatesInputs(props: Props) {
  const c = props.content;
  const [metaTitle, setMetaTitle] = useState(props.title || "");
  const [metaDescription, setMetaDescription] = useState(props.description || "");
  const [ogImage, setOgImage] = useState(c.ogImage || "");

  const [heroImage, setHeroImage] = useState(c.heroImage || "");
  const [heroTitle, setHeroTitle] = useState(c.heroTitle || "");
  const [heroTitleBold, setHeroTitleBold] = useState(!!c.heroTitleBold);
  // ... every other field ...
  const [cards, setCards] = useState(c.section2Cards || []);

  const [active, setActive] = useState<"hero" | "section2" | "cta">("hero");

  const { isSaving, updatePage } = useUpdatePage<PrivatePilatesContent>("private-pilates");

  const handleSave = () => {
    const { availablePages: _ap, ...row } = props;
    void _ap;
    return updatePage({
      ...row,
      title: metaTitle || props.title,
      description: metaDescription || props.description,
      content: {
        ogImage, heroImage, heroTitle, heroTitleBold,
        // ... every other field, section2Cards: cards ...
      },
    });
  };

  return (
    <>
      <SaveBanner pageTitle="Private Pilates" onSave={handleSave} isSaving={isSaving} />
      <AdminPageShell sidebar={
        <div className="flex flex-col gap-3">
          <SectionSidebar
            tabs={[
              { value: "hero", label: "Hero" },
              { value: "section2", label: "Benefits" },
              { value: "cta", label: "CTA" },
            ]}
            active={active} onChange={setActive}
          />
          <PageMetaPanel
            url="/private-pilates"
            urlLockedReason="URL is fixed by the page's folder route."
            metaTitle={metaTitle} onMetaTitleChange={setMetaTitle}
            metaDescription={metaDescription} onMetaDescriptionChange={setMetaDescription}
            ogImage={ogImage} onOgImageChange={setOgImage}
          />
        </div>
      }>
        <section className={active === "hero" ? "space-y-4" : "hidden"}>
          <FieldGroup title="Hero Image">
            <ImageInput label="Background" value={heroImage} onChange={setHeroImage} usage="private-pilates-hero" />
          </FieldGroup>
          <FieldGroup title="Hero Copy">
            <BoldableText id="pp-hero-title" label="Title" as="textarea" rows={2}
              value={heroTitle} onChange={setHeroTitle}
              bold={heroTitleBold} onBoldChange={setHeroTitleBold} />
            {/* heroParagraph similarly */}
          </FieldGroup>
          <FieldGroup title="Hero Button">
            <ButtonHrefField label="CTA" text={/*...*/""} href={/*...*/""}
              onTextChange={()=>{}} onHrefChange={()=>{}}
              availablePages={props.availablePages} />
          </FieldGroup>
        </section>

        <section className={active === "section2" ? "space-y-4" : "hidden"}>
          <FieldGroup title="Benefit cards" toolbar={
            <AddItemButton onClick={() => setCards([...cards, { id: nextId(cards), title: "", titleBold: false, description: "", descriptionBold: false }])}>
              Add card
            </AddItemButton>
          }>
            {cards.map((card, i) => (
              <ListItemCard key={card.id} title={`Card ${i+1}`}
                onRemove={() => setCards(cards.filter(x => x.id !== card.id))}>
                <TextInput label="Title" value={card.title}
                  onChange={v => setCards(cards.map(x => x.id === card.id ? { ...x, title: v } : x))} />
                <TextAreaInput label="Description" value={card.description}
                  onChange={v => setCards(cards.map(x => x.id === card.id ? { ...x, description: v } : x))} />
              </ListItemCard>
            ))}
          </FieldGroup>
        </section>

        <section className={active === "cta" ? "space-y-4" : "hidden"}>
          {/* ctaTitle, ctaButton*, ctaBackgroundImage */}
        </section>
      </AdminPageShell>
    </>
  );
}
```

### Step 5 — Add the tile to the dashboard

Edit `src/components/admin/AdminTiles.tsx` and add an entry under **Page Content**:

```ts
{ href: "/admin/private-pilates", icon: Dumbbell, title: "Private Pilates",
  description: "Hero, benefits and CTA." },
```

### Step 6 — Wire SEO and the page picker

- Add `{ path: "/private-pilates", label: "Private Pilates", group: "Core" }` to `STATIC_PAGES` in `src/data/navigation.ts` so other pages can link to it from `ButtonHrefField`.
- Add `"private-pilates"` to `RESERVED_SLUGS` in `src/data/reserved-slugs.ts` so no one can create a service page with that slug.

### Step 7 — Add any new paths to `revalidateAllPages`

Open `src/server-actions/revalidate.ts` and push `"/private-pilates"` into the list. Optional on a `force-dynamic` page, but tidy.

### Step 8 — Smoke test

1. `npm run dev`.
2. Hit `/private-pilates` — you see the fallback content.
3. Log in to `/admin/login`, go to `/admin/private-pilates`, change the hero title, click Save.
4. Open a new tab at `/private-pilates` — the change is live.
5. Open Supabase dashboard and confirm the `pages` row with slug `private-pilates` now exists with your new content JSON.

That is the whole recipe. Every page in the Movement Assembly admin follows this exact shape; dynamic collections add a layer of CRUD actions in `src/server-actions/`.

---

## 11. Gotchas and non-obvious patterns

### 11.1 "use server" forbids non-async-function exports

`src/server-actions/navigation.ts` only exports server actions. Types and defaults (`NavLink`, `defaultNavLinks`, `STATIC_PAGES`) therefore live in `src/data/navigation.ts`. Do the same split for any new server-action file: types and constants in `src/data/`, actions in `src/server-actions/`.

### 11.2 Fallback must live outside the server-action file

Same rule: if a fallback is used by both the public page (for the first-render fallback) and the admin editor (to synthesise an editor shape when the row is missing), export it from the `_config.ts` module in `src/app/.../`. Never from a `"use server"` file.

### 11.3 Admin layout skips the global header + footer

`src/app/admin/layout.tsx` renders only the Toaster and its children. It intentionally does not include `<HeaderWrapper />` or `<FooterWrapper />` — the admin UI has its own identity. When you copy the layout to body-method, keep it minimal.

### 11.4 `getPage` must shallow-merge content

A row saved before you added a new field to the TS schema would otherwise return `undefined` for the new field. The `getPage` function in `src/server-actions/page.ts` merges `content: { ...fbContent, ...dbContent }` for exactly this reason. Keep that shape or you will spend hours debugging missing fields.

### 11.5 availablePages prop is client-only

When the admin page component passes `availablePages` into its inputs component, strip it from the payload before upserting. Every inputs file does this:

```ts
const { availablePages: _ap, ...row } = props;
void _ap;
return updatePage({ ...row, content: { ... } });
```

Otherwise you will store `availablePages` on the `pages` row and corrupt it.

### 11.6 Canonical URLs when slug != path

About, Blog, Locations, and others store their rows under one slug but live at a different URL. Always pass `options.canonicalPath` to `buildPageMetadata()` or Google will index a non-existent URL.

### 11.7 force-dynamic + revalidate = 0

Both are set on live pages. `force-dynamic` guarantees no static generation; `revalidate = 0` ensures no ISR caching. Without both, admin edits can take minutes or a redeploy to show up.

### 11.8 Dashboard tile fetches the logo

The dashboard page fetches the `footer` row only to get the site logo. Do the same in body-method so the admin UI brands itself from Supabase instead of a hard-coded asset.

### 11.9 The `site-images` bucket must exist before `setup-database.sql` runs

The SQL script creates **policies** against the bucket. The bucket itself must be created manually in the Supabase dashboard first or those policies error. Also set it to public.

### 11.10 Server-side vs anon client for mutations

For writes from an admin route (server action, or form submission that calls one), always use `createClient()` from `src/utils/server.ts`. The anon client in `src/utils/supabase.ts` does not forward cookies, so RLS rejects the insert / update. The blog mutations file documents this at the top: *"Kept separate from `blog.ts` because that file gets pulled into client bundles via BlogPageClient."*

### 11.11 Reserved slugs

Any route under `src/app/` that is a folder is a **reserved slug**. Add it to `src/data/reserved-slugs.ts` the moment you create the folder, or an admin could later try to make a dynamic page with that slug and silently get a 404 because Next prefers the folder route.

### 11.12 Image usage tagging is optional but useful

Every `ImageInput` takes an optional `usage="..."` prop. Tagging images (e.g. `"home-hero"`, `"about-team-photo"`) lets the media library show where each image is referenced. Not required for the system to work, but worth setting on every `ImageInput` from day one.

### 11.13 Toast setup

`react-hot-toast` is wired up in `src/app/admin/layout.tsx` with a dark style. Use `toast.success(...)` / `toast.error(...)` from any admin form; no extra config needed.

### 11.14 Brand tokens

`form-primitives.tsx` hard-codes `#121717` (ink), `#92d645` (brand green), and `#fafaf7` (cream surface) in a few places. Before copying the file, grep for those three values and swap them to body-method's palette; otherwise the admin UI will look like Movement Assembly.

### 11.15 The `faqs` General-category trigger

The SQL installs triggers that move FAQs to a "General" category when their parent category is deleted, and refuse to let the General category itself be deleted. Preserve this when you run the schema; the FAQ editor assumes it.

### 11.16 Section order + visibility

The home and about pages persist a `sectionsOrder: string[]` plus per-section `sectionNVisible: boolean` flags. The public page iterates the order array and skips invisible sections. When you add a new page with reorderable sections, follow the home page as the reference pattern: keep hero fixed, strip hero from the order array before saving, and render in order with `return null` for hidden sections.

---

## 12. Checklist for the first body-method page

Use this as a minimal starting checklist before touching individual pages.

- [ ] Create a Supabase project. Note down the URL and anon key.
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`.
- [ ] Create the `site-images` Storage bucket in the Supabase dashboard, public.
- [ ] Run `setup-database.sql` against the project.
- [ ] Create the admin user in the Supabase dashboard (Authentication, Users, Add user).
- [ ] Copy over the client / server / storage utils from `src/utils/`.
- [ ] Copy `src/middleware.ts`.
- [ ] Copy `src/server-actions/page.ts`, `admin.ts`, `revalidate.ts`.
- [ ] Copy `src/utils/hooks/useUpdatePage.ts`.
- [ ] Copy `src/contexts/ImageLibraryContext.tsx` + `src/components/core/media-library-modal.tsx`.
- [ ] Copy `src/components/admin/_shared/form-primitives.tsx` and swap brand tokens.
- [ ] Copy `src/components/core/save-banner.tsx`.
- [ ] Copy `src/components/admin/AdminDashboard.tsx` and `AdminTiles.tsx`, prune the tiles.
- [ ] Copy `src/components/admin/login-form.tsx` + the login route.
- [ ] Copy `src/app/admin/layout.tsx` and `src/app/admin/page.tsx`.
- [ ] Add Supabase host to `next.config.ts` `images.remotePatterns`.
- [ ] Wire `buildPageMetadata` + `generateMetadata` on each public page.
- [ ] Follow section 10 to wire one page fully, then repeat for the rest.

Once that is working, every other page is a repetition of the recipe in section 10.
