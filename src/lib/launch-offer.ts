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
    name: "Single-Image Posts",
    price: PRICE_SINGLE,
    badge: "Best starting point",
    mix: "30 single-image posts each month",
    blurb: "One clear message in every post. The simplest way to show up every day.",
  },
  {
    id: "carousel",
    name: "Carousel + Single-Image Posts",
    price: PRICE_CAROUSEL,
    badge: "Most complete",
    mix: "15 carousel posts + 15 single-image posts each month",
    blurb: "More room for stories, before-and-afters and step-by-step explanations.",
  },
];

export const INCLUDED_IN_BOTH = [
  "Posts created and published to Instagram and Facebook after your approval",
  "A quote calculator or quiz that collects new inquiries",
  "Automatic replies to comments and messages",
  "Automatic follow-up and online appointment booking",
  "Reasonable revisions included",
  "Ongoing management and improvements",
];
