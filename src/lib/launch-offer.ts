/**
 * The Dollhouse launch offer: one place for prices, links and plan copy.
 * Change a number here and the whole homepage updates.
 */

export type LaunchPlanId = "single" | "carousel";

/**
 * Checkout links for each plan. Leave a link empty until the payment link
 * exists: the button then sends people to the questions / application form
 * instead of a dead link.
 */
export const ORDER_LINKS: Record<LaunchPlanId, string> = {
  single: "",
  carousel: "",
};

export const FALLBACK_HREF = "#contact";

export function orderHref(plan: LaunchPlanId): string {
  return ORDER_LINKS[plan] || FALLBACK_HREF;
}

/** Optional explainer video. Paste an embed URL (YouTube/Vimeo/etc.) to show it in the hero. */
export const HERO_VIDEO_EMBED_URL = "";

export const PRICE_SINGLE = 297;
export const PRICE_CAROUSEL = 497;
export const GUARANTEE_DAYS = 14;
export const FIRST_POSTS_DAYS = 5;

export const LAUNCH_PLANS: {
  id: LaunchPlanId;
  name: string;
  price: number;
  mix: string;
  blurb: string;
  cta: string;
}[] = [
  {
    id: "single",
    name: "Single-Image Posts",
    price: PRICE_SINGLE,
    mix: "30 single-image posts each month",
    blurb: "One clear message in every post.",
    cta: "Choose single-image posts",
  },
  {
    id: "carousel",
    name: "Carousel + Single-Image Posts",
    price: PRICE_CAROUSEL,
    mix: "15 carousel posts + 15 single-image posts each month",
    blurb: "More room for stories, before-and-afters and step-by-step explanations.",
    cta: "Choose carousel posts",
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
