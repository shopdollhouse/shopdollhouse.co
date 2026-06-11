import { useState } from "react";

/* ── Tokens ──────────────────────────────────────────── */
const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";

const INK = "var(--ink)";
const ROSE = "var(--rose)";
const CREAM = "var(--cream)";

export type Billing = "6" | "12";

export interface PricingTier {
  label: string;
  monthly: number;
  description: string;
  features?: string[];
  paymentUrl?: string;
}

export interface Plan {
  id: string;
  accent: string;
  badge: { text: string; bg: string; color: string } | null;
  eyebrow: string;
  name: string;
  subtitle: string;
  monthly: number;
  setup: number;
  platform: number;
  freeTrial: boolean;
  description: string;
  designedToCreate: string;
  features: string[];
  cta: string;
  paymentUrl?: string;
  pricingTiers?: PricingTier[];
}

const ROSE_HEX = "#c97a7a";
const GROWTH = INK;

export const PLANS: Plan[] = [
  {
    id: "foundation",
    accent: INK,
    badge: null,
    eyebrow: "Website & Lead System",
    name: "The Foundation",
    subtitle: "For service businesses that need a website and full lead system before anything else.",
    monthly: 297,
    setup: 997,
    platform: 0,
    freeTrial: false,
    description: "A website and automation system that turns every inquiry, missed call, and appointment into a managed conversation.",
    designedToCreate: "A website and automation system that turns every inquiry, missed call, and appointment into a managed conversation.",
    features: [
      "Professional website built for lead generation",
      "Missed call text-back — anyone who calls gets a text immediately",
      "Instant lead follow-up — new inquiries get an automatic text response",
      "5-star review funnel with private feedback step before the public request",
    ],
    cta: "Build My Foundation",
    paymentUrl: "https://link.shopdollhouse.co/payment-link/6a2a88f671a0aa761e46432b",
    pricingTiers: [
      {
        label: "Foundation",
        monthly: 297,
        paymentUrl: "https://link.shopdollhouse.co/payment-link/6a2a88f671a0aa761e46432b",
        description: "Everything in the Foundation plan — website, follow-up, missed-call, reviews, and SEO.",
        features: [
          "Professional website built for lead generation",
          "Missed call text-back — anyone who calls gets a text immediately",
          "Instant lead follow-up — new inquiries get an automatic text response",
          "5-star review funnel with private feedback step before the public request",
        ],
      },
      {
        label: "Foundation + Google LSA",
        monthly: 497,
        paymentUrl: "https://link.shopdollhouse.co/payment-link/6a2a89a303b17c94f5715c0d",
        description: "Everything in Foundation, plus your business shows as sponsored with a top rating on Google. You only pay per result, not per click.",
        features: [
          "Professional website built for lead generation",
          "Missed call text-back — anyone who calls gets a text immediately",
          "Instant lead follow-up — new inquiries get an automatic text response",
          "5-star review funnel with private feedback step before the public request",
          "Google Local Service Ads management — your business shows as sponsored with a top rating on Google, pay per result not per click",
        ],
      },
    ],
  },
  {
    id: "starter",
    accent: ROSE_HEX,
    badge: { text: "Best Starting Point", bg: ROSE_HEX, color: "#fff" },
    eyebrow: "One Platform, Fully Managed",
    name: "The Starter",
    subtitle: "For businesses and personal brands ready to be fully active on one platform with a lead system behind every post.",
    monthly: 1000,
    setup: 500,
    platform: 300,
    freeTrial: false,
    description: "One platform, one polished content system, and a full automation stack turning followers into booked clients.",
    designedToCreate: "One platform, one polished content system, and a full automation stack turning followers into booked clients.",
    features: [
      "1 platform fully managed — Facebook, Instagram, or TikTok — nothing to post",
      "AI Clone or custom brand mascot — built during onboarding to your look, voice & energy",
      "3 AI Clone videos built at launch, pinned to the top of your profile as signature content, refreshed whenever your offer or season changes",
      "16 posts/month — Reels, Carousels & Static — all on-brand, all approved by you",
      "Content approval — nothing goes live without your sign-off",
      "Starter content strategy — offer angle, pillars, caption direction & posting rhythm",
      "Comment-to-DM automation — every comment becomes a private lead conversation",
      "Missed call text-back — warm leads hear from you within seconds",
      "Automated appointment reminders — text and email before every booking",
      "CRM pipeline and booking link setup",
      "Monthly performance report — reach, growth, top posts & next steps in plain English",
    ],
    cta: "Launch My Brand",
    paymentUrl: "https://link.shopdollhouse.co/payment-link/6a2a89f703b17c94f5715c0e",
  },
  {
    id: "growth",
    accent: GROWTH,
    badge: { text: "Most Popular", bg: INK, color: "#fff" },
    eyebrow: "Three Platforms + Paid Ads",
    name: "The Growth",
    subtitle: "For service businesses ready for all 3 platforms, full automation, and paid Meta ads working together every day.",
    monthly: 2497,
    setup: 500,
    platform: 300,
    freeTrial: false,
    description: "Three platforms running, an AI Clone posting for you, leads followed up automatically, and ads bringing in new clients — while you focus on the work.",
    designedToCreate: "Three platforms running, an AI Clone posting for you, leads followed up automatically, and ads bringing in new clients — while you focus on the work.",
    features: [
      "3 platforms fully managed — Facebook, Instagram & TikTok — nothing to post, nothing to manage",
      "AI Clone or custom brand mascot — built during onboarding, active across all 3 platforms",
      "Your AI Clone shows up consistently on all three platforms on your behalf, so your audience sees you every day without you ever picking up a camera",
      "24 posts/month — 8 per platform, Reels, Carousels & Static — all on-brand",
      "Content approval — you see and approve everything before it goes live",
      "Dedicated content strategy — pillars, hashtags, caption writing & optimal posting times",
      "Paid Meta ads — Facebook & Instagram campaigns built, managed & optimised for leads and bookings",
      "Comment-to-DM + text follow-up AI bot across all 3 platforms",
      "Voice AI receptionist — answers missed calls and books appointments 24/7",
      "Missed call text-back — instant reply to anyone who calls",
      "Automated appointment reminders — text and email before every booking",
      "5-star review requests — sent automatically after every appointment",
      "Full CRM and automation stack built during setup",
      "Monthly strategy call — 30 minutes, real numbers, clear next steps",
      "Monthly performance report across all 3 platforms",
    ],
    cta: "Scale With Everything",
    paymentUrl: "https://link.shopdollhouse.co/payment-link/6a2a8a2471a0aa761e464331",
  },
];

const fmt = (n: number) => n.toLocaleString("en-US");
export const sixMonth = (p: Plan) => p.monthly * 6 + p.setup;
export const twelveMonth = (p: Plan) => p.monthly * 11 + p.setup; // 12th month free

function Check({ color = ROSE }: { color?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 shrink-0">
      <path d="M3 8.5 6.2 11.5 13 4.5" />
    </svg>
  );
}

export function PlanCard({
  plan,
  billing,
  ctaHref,
  ctaNewTab = false,
  pulse = false,
}: {
  plan: Plan;
  billing: Billing;
  ctaHref: string;
  ctaNewTab?: boolean;
  pulse?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [selectedTierIdx, setSelectedTierIdx] = useState(0);
  // Foundation cards with pricingTiers get their own 3/6-month toggle, defaulting to 3
  const [localMonths, setLocalMonths] = useState<3 | 6>(3);
  const hasTiers = !!plan.pricingTiers;
  const activeTier = plan.pricingTiers?.[selectedTierIdx];
  const activeMonthly = activeTier ? activeTier.monthly : plan.monthly;
  const total = billing === "6" ? activeMonthly * 6 + plan.setup : activeMonthly * 11 + plan.setup;
  const activeFeatures = activeTier?.features ?? plan.features;
  const visible = activeFeatures.slice(0, 5);
  const hidden = activeFeatures.slice(5);
  // Prefer the active tier's payment link, then the plan's, then the passed-in CTA href.
  const checkoutUrl = activeTier?.paymentUrl ?? plan.paymentUrl ?? ctaHref;
  const isPaymentLink = Boolean(activeTier?.paymentUrl ?? plan.paymentUrl);
  const linkProps = isPaymentLink || ctaNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {};
  // e.g. "Get Foundation — just $297/month"
  const shortName = plan.name.replace(/^The\s+/, "");
  const ctaLabel = isPaymentLink ? `Get ${shortName} — just $${fmt(activeMonthly)}/month` : plan.cta;

  return (
    <article id={plan.id} className={`flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl shadow-sm ${pulse ? "plan-pulse" : ""}`} style={{ background: "#fff" }}>
      {plan.badge && (
        <div className="px-4 py-2 text-center" style={{ background: plan.badge.bg, color: plan.badge.color, fontFamily: FONT_LUXE, fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          {plan.badge.text}
        </div>
      )}

      <div className="flex flex-1 flex-col p-8">
        <p style={{ fontFamily: FONT_LUXE, fontSize: "11px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: ROSE }}>{plan.eyebrow}</p>
        <h3 className="mt-2" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, fontSize: "34px", lineHeight: 1.05, color: plan.accent }}>{plan.name}</h3>
        <p className="mt-2" style={{ fontFamily: FONT_BODY, fontSize: "14px", lineHeight: 1.5, color: "rgba(29,15,11,0.6)" }}>{plan.subtitle}</p>

        {/* badges row */}
        <div className="mt-5 flex flex-wrap gap-2">
          {hasTiers ? (
            /* 3-month / 6-month toggle for Foundation */
            <div className="inline-flex rounded-full p-0.5" style={{ background: CREAM, border: "1px solid rgba(29,15,11,0.1)" }}>
              {([3, 6] as const).map((mo) => {
                const active = localMonths === mo;
                return (
                  <button
                    key={mo}
                    type="button"
                    onClick={() => setLocalMonths(mo)}
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 transition-all"
                    style={{
                      fontFamily: FONT_LUXE,
                      fontSize: "0.58rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      background: active ? INK : "transparent",
                      color: active ? "#fff" : "rgba(29,15,11,0.55)",
                      boxShadow: active ? "0 2px 8px -4px rgba(29,15,11,0.5)" : "none",
                    }}
                  >
                    {mo}-Month
                    {mo === 3 && (
                      <span
                        className="rounded-full px-1.5 py-0.5"
                        style={{
                          background: "var(--gold)",
                          color: INK,
                          fontFamily: FONT_LUXE,
                          fontSize: "0.46rem",
                          letterSpacing: "0.07em",
                          textTransform: "uppercase",
                          whiteSpace: "nowrap",
                          fontWeight: 800,
                        }}
                      >
                        4th Month Free
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1" style={{ background: CREAM, color: INK, fontFamily: FONT_LUXE, fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              <svg viewBox="0 0 12 10" width="10" height="9" fill={ROSE}><path d="M6 9 L0.5 3.5 a2.2 2.2 0 0 1 3.1 -3.1 L6 2.8 l2.4 -2.4 a2.2 2.2 0 0 1 3.1 3.1 Z" /></svg>
              {billing === "6" ? "6-Month Agreement" : "12-Month Agreement"}
            </span>
          )}
          <span className="rounded-full px-3 py-1" style={{ background: ROSE, color: "#fff", fontFamily: FONT_LUXE, fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            ${fmt(plan.setup)} One-Time Setup
          </span>
        </div>

        <p className="mt-4" style={{ fontFamily: FONT_BODY, fontSize: "12px", color: "rgba(29,15,11,0.5)" }}>
          {hasTiers ? `$${fmt(plan.setup)} setup due upfront · ${localMonths}-month contract` : `$${fmt(plan.setup)} setup due upfront · ${billing}-month contract`}
        </p>

        {/* Pricing tiers selector — shown only for plans with pricingTiers */}
        {plan.pricingTiers ? (
          <div className="mt-5">
            <div className="grid grid-cols-2 gap-2">
              {plan.pricingTiers.map((tier, idx) => {
                const active = idx === selectedTierIdx;
                const tierTotal = tier.monthly * localMonths + plan.setup;
                return (
                  <button
                    key={tier.label}
                    type="button"
                    onClick={() => setSelectedTierIdx(idx)}
                    className="rounded-xl text-left transition-all flex flex-col overflow-hidden"
                    style={{ border: active ? "2px solid #bd7476" : "2px solid transparent" }}
                  >
                    {/* Price tile — active = pink, inactive = cream */}
                    <div className="p-3" style={{ background: active ? "#bd7476" : CREAM }}>
                      <p style={{ fontFamily: FONT_LUXE, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: active ? "rgba(255,255,255,0.8)" : "rgba(29,15,11,0.5)" }}>
                        {tier.label}
                      </p>
                      <p style={{ fontFamily: FONT_DISPLAY, fontSize: "28px", lineHeight: 1, color: active ? "#fff" : plan.accent, marginTop: "4px" }}>
                        ${fmt(tier.monthly)}<span style={{ fontFamily: FONT_BODY, fontSize: "0.7rem", marginLeft: "2px", color: active ? "rgba(255,255,255,0.7)" : "rgba(29,15,11,0.45)" }}>USD /mo</span>
                      </p>
                    </div>
                    {/* Calculator box directly beneath */}
                    <div className="p-3 flex-1" style={{ background: CREAM, borderTop: "1px solid rgba(29,15,11,0.06)" }}>
                      <p style={{ fontFamily: FONT_LUXE, fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(29,15,11,0.5)" }}>
                        {localMonths}-Month Total
                      </p>
                      <p className="mt-0.5" style={{ fontFamily: FONT_DISPLAY, fontSize: "20px", lineHeight: 1, color: plan.accent, fontWeight: 600 }}>
                        ${fmt(tierTotal)}
                      </p>
                      <p className="mt-0.5" style={{ fontFamily: FONT_BODY, fontSize: "10px", color: "rgba(29,15,11,0.5)", lineHeight: 1.4 }}>
                        ${fmt(tier.monthly)}/mo × {localMonths} + ${fmt(plan.setup)} setup
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="mt-3" style={{ fontFamily: FONT_BODY, fontSize: "13px", lineHeight: 1.55, color: "rgba(29,15,11,0.65)" }}>
              {activeTier?.description}
            </p>
            {/* Promo strip — only applies to the 3-month plan */}
            {localMonths === 3 && (
              <div className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2.5" style={{ background: "rgba(200,168,100,0.1)", border: "1px solid rgba(200,168,100,0.3)" }}>
                <span style={{ color: "var(--gold)", fontSize: "0.7rem", flexShrink: 0 }}>♥</span>
                <p style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.04em", color: INK, opacity: 0.75 }}>
                  Pay 3 months upfront — your 4th month is free.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Default single pricing block */
          <div className="mt-5">
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: "52px", lineHeight: 1, color: plan.accent }}>
              ${fmt(plan.monthly)}<span style={{ fontFamily: FONT_BODY, fontSize: "1rem", color: "rgba(29,15,11,0.5)", marginLeft: "0.3rem" }}>USD /mo</span>
            </p>
            {plan.platform > 0 && (
              <p className="mt-3 inline-block rounded-lg px-3 py-2" style={{ background: CREAM, border: `1px solid ${ROSE}`, fontFamily: FONT_BODY, fontSize: "13px", color: INK }}>
                + ${plan.platform}/mo platform access
              </p>
            )}
            <p className="mt-2 inline-block rounded-lg px-3 py-1.5" style={{ border: "1px dashed rgba(29,15,11,0.3)", fontFamily: FONT_BODY, fontSize: "12px", color: "rgba(29,15,11,0.65)" }}>
              + ${fmt(plan.setup)} one-time setup
            </p>
          </div>
        )}

        {/* total box — only shown for single-price plans */}
        {!plan.pricingTiers && (
          <div className="mt-5 rounded-xl p-4" style={{ background: CREAM }}>
            <p style={{ fontFamily: FONT_LUXE, fontSize: "10px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(29,15,11,0.55)" }}>
              {billing === "6" ? "6-Month Total" : "12-Month Total"}
            </p>
            <p className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontSize: "28px", lineHeight: 1, color: plan.accent, fontWeight: 600 }}>${fmt(total)}</p>
            <p className="mt-1" style={{ fontFamily: FONT_BODY, fontSize: "12px", color: "rgba(29,15,11,0.55)" }}>
              {billing === "6"
                ? `$${fmt(activeMonthly)}/mo × 6 + $${fmt(plan.setup)} setup`
                : `$${fmt(activeMonthly)}/mo × 11 + $${fmt(plan.setup)} setup · 12th month free`}
            </p>
            {billing === "12" && (
              <p className="mt-1.5" style={{ fontFamily: FONT_BODY, fontSize: "13px", fontWeight: 600, color: ROSE }}>You save ${fmt(activeMonthly)}</p>
            )}
          </div>
        )}

        {/* description */}
        <p className="mt-5" style={{ fontFamily: FONT_BODY, fontSize: "15px", lineHeight: 1.6, color: INK }}>{plan.description}</p>

        {/* designed to create */}
        <div className="mt-4 rounded-xl p-4" style={{ background: CREAM }}>
          <p style={{ fontFamily: FONT_LUXE, fontSize: "10px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: ROSE }}>Designed to Create</p>
          <p className="mt-1.5 italic" style={{ fontFamily: FONT_BODY, fontSize: "15px", lineHeight: 1.55, color: INK }}>{plan.designedToCreate}</p>
        </div>

        {/* features */}
        <ul className="mt-6 space-y-3">
          {visible.map((f) => (
            <li key={f} className="flex gap-2.5" style={{ fontFamily: FONT_BODY, fontSize: "14px", lineHeight: 1.5, color: INK }}>
              <Check />
              <span>
                {f}
                {f.startsWith("Paid Meta ads") && (
                  <span style={{ display: "block", marginTop: "2px", fontSize: "12px", color: "rgba(29,15,11,0.5)" }}>
                    Ad spend billed separately to your Meta account
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
        {hidden.length > 0 && (
          <>
            <div style={{ maxHeight: open ? 1200 : 0, overflow: "hidden", transition: "max-height 0.45s ease" }}>
              <ul className="mt-3 space-y-3">
                {hidden.map((f) => (
                  <li key={f} className="flex gap-2.5" style={{ fontFamily: FONT_BODY, fontSize: "14px", lineHeight: 1.5, color: INK }}>
                    <Check />
                    <span>
                      {f}
                      {f.startsWith("Paid Meta ads") && (
                        <span style={{ display: "block", marginTop: "2px", fontSize: "12px", color: "rgba(29,15,11,0.5)" }}>
                          Ad spend billed separately to your Meta account
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <button type="button" onClick={() => setOpen((v) => !v)} className="mt-3 self-start underline underline-offset-2" style={{ fontFamily: FONT_BODY, fontSize: "13px", color: ROSE }}>
              {open ? "Show less ↑" : `See all ${activeFeatures.length} features ↓`}
            </button>
          </>
        )}

        {/* ad spend disclaimer — Growth plan only */}
        {plan.id === "growth" && (
          <div className="mt-4 rounded-xl p-4" style={{ background: "rgba(189,116,118,0.06)", border: "1px solid rgba(189,116,118,0.22)" }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: "12.5px", lineHeight: 1.65, color: "rgba(29,15,11,0.62)" }}>
              The Growth Plan covers full strategy, creative production, audience targeting, optimisation, and day-to-day campaign management. Ad spend is not included in the $2,497/mo service fee and is billed directly to your Meta Ads account. We recommend a minimum of $1,000 to $2,000/mo in ad spend to see meaningful, consistent results. This keeps your budget transparent and fully in your control, while we handle everything that makes it perform.
            </p>
          </div>
        )}

        {/* bottom CTA */}
        <div className="mt-auto pt-6">
          <p className="border-t pt-4 text-center" style={{ borderColor: "rgba(29,15,11,0.1)", fontFamily: FONT_LUXE, fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: INK }}>
            Custom Launch Plan Included
          </p>
          <a href={checkoutUrl} {...linkProps} className="mt-4 flex min-h-12 items-center justify-center rounded-full px-6 py-4 text-center transition-opacity hover:opacity-90" style={{ background: plan.accent, color: "#fff", fontFamily: FONT_BODY, fontWeight: 600 }}>
            {ctaLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
