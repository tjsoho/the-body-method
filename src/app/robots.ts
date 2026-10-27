import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * robots.txt — welcomes every major search engine and AI crawler by name,
 * blocks the admin and API surface, points to the sitemap and the llms.txt
 * discovery file. Named user-agents are listed explicitly so operators who
 * disallow by default (ClaudeBot, GPTBot, Google-Extended, Applebot-Extended,
 * etc.) see an explicit allow and know the site is opt-in for AI indexing.
 */

const DISALLOW = ["/api/", "/admin/", "/private/"];

const SEARCH_BOTS = [
    "Googlebot",
    "Googlebot-Image",
    "Googlebot-News",
    "Googlebot-Video",
    "Bingbot",
    "Slurp",
    "DuckDuckBot",
    "Baiduspider",
    "YandexBot",
];

const AI_BOTS = [
    // OpenAI
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    // Anthropic
    "ClaudeBot",
    "Claude-Web",
    "Claude-SearchBot",
    "anthropic-ai",
    // Google Gemini (separate opt-in from Googlebot)
    "Google-Extended",
    // Perplexity
    "PerplexityBot",
    "Perplexity-User",
    // Apple Intelligence
    "Applebot",
    "Applebot-Extended",
    // Meta
    "Meta-ExternalAgent",
    "FacebookBot",
    // Others
    "Amazonbot",
    "cohere-ai",
    "CCBot",
    "Bytespider",
    "Diffbot",
    "YouBot",
    "DuckAssistBot",
];

const SOCIAL_BOTS = [
    "facebookexternalhit",
    "Twitterbot",
    "LinkedInBot",
    "WhatsApp",
    "TelegramBot",
    "Slackbot",
    "Discordbot",
    "Pinterestbot",
];

export default function robots(): MetadataRoute.Robots {
    const baseUrl = siteConfig.url || "https://example.com";

    return {
        rules: [
            // Fallback for anything not listed below.
            { userAgent: "*", allow: "/", disallow: DISALLOW },
            // Explicit opt-in for the named search + AI + social crawlers.
            {
                userAgent: [...SEARCH_BOTS, ...AI_BOTS, ...SOCIAL_BOTS],
                allow: "/",
                disallow: DISALLOW,
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
