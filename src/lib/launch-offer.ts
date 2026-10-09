/**
 * Dollhouse Launch: one place for prices, links and plan copy.
 * Change a number here and the whole site updates.
 */

export type LaunchPlanId = "single" | "carousel";

/**
 * Hosted payment links, one per plan (recurring monthly).
 * Paste each link here and the /get-started checkout page embeds it.
 * While a link is empty, that plan shows an "email to order" fallback.
 */
export const ORDER_LINKS: Record<LaunchPlanId, string> = {
  single: "",
  carousel: "",
};

/** Every "Get started" button on the site goes to the on-site checkout page. */
export const CHECKOUT_PATH = "/get-started";

export function checkoutHref(plan: LaunchPlanId = "single"): string {
  return `${CHECKOUT_PATH}?plan=${plan}`;
}

export const SUPPORT_EMAIL = "hello@shopdollhouse.co";

/** Optional "see how it works" walkthrough video. Paste an embed URL (YouTube/Vimeo/etc.) to show it under the hero. */
export const HERO_VIDEO_EMBED_URL =
  "https://player.vimeo.com/video/860958837?title=0&byline=0&portrait=0&badge=0&autopause=0&dnt=1&playsinline=1&loop=1&end_screen=0";

export const PRICE_SINGLE = 297;
export const PRICE_CAROUSEL = 497;
export const GUARANTEE_DAYS = 14;
export const FIRST_POSTS_DAYS = 5;
export const POSTS_PER_MONTH = 30;

export const LAUNCH_PLANS: {
  id: LaunchPlanId;
  name: string;
  price: number;
  badge: string;
  mix: string;
  blurb: string;
}[] = [
  {
    id: "single",
    name: "Single-image posts",
    price: PRICE_SINGLE,
    badge: "Best starting point",
    mix: "30 single-image posts each month",
    blurb: "One clear message in every post.",
  },
  {
    id: "carousel",
    name: "Carousel Slide Posts + Single-Image Posts",
    price: PRICE_CAROUSEL,
    badge: "Most complete",
    mix: "15 carousel slide posts + 15 single-image posts each month",
    blurb: "More room for stories and step-by-step explanations.",
  },
];

export const INCLUDED_IN_BOTH = [
  "Posts created and published to Instagram and Facebook after approval",
  "Website quote calculator or quiz",
  "Automatic comment replies and follow-up",
  "Online appointment scheduling",
  "Reasonable revisions included",
  "Ongoing management and improvements",
];

/** Add-on: each extra platform (LinkedIn and other supported platforms). */
export const ADDON_PLATFORM_PRICE = 50;
/** AI usage we cover each month before anything is billed (needs your approval beyond this). */
export const AI_USAGE_COVERED = 10;

/**
 * Optional "launch-month value breakdown" (the "$7,244 value" stack on the
 * reference site). OFF by default: "value" figures imply a normal selling price,
 * and these are not prices you actually charge anywhere. Turn on only if you can
 * stand behind each number.
 */
export const SHOW_VALUE_STACK = false;
export const VALUE_STACK: { label: string; value: string }[] = [
  { label: "30 Social Media Posts Every Month", value: "$1,500/mo" },
  { label: "Website Quote Calculator or Quiz", value: "$1,500" },
  { label: "Automatic Comment and Message Replies", value: "$750" },
  { label: "Automatic Text and Email Follow-Up", value: "$1,200/mo" },
  { label: "Online Appointment Scheduling", value: "$750" },
  { label: "We Manage and Improve Everything", value: "$750/mo" },
];
export const VALUE_STACK_BONUSES = "Plus the Dollhouse CRM account ($497/month value) and kickoff call ($297 value).";
export const VALUE_STACK_TOTAL = "$7,244";
