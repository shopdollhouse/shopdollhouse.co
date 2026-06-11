import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { usePageMeta } from "@/lib/use-page-meta";

type Billing = "6" | "12";

export const Route = createFileRoute("/foundation")({ component: FoundationLandingPage });

/* ── Tokens ──────────────────────────────────────────── */
const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";

const INK = "var(--ink)";
const ROSE = "var(--rose)";
const CREAM = "var(--cream)";
const BLUSH = "var(--blush)";
const ROSE_HEX = "#bd7476";

// TODO: replace with the live $97/mo + $497 setup payment link once created in GoHighLevel.
const ESSENTIALS_PAYMENT_URL = "https://link.shopdollhouse.co/payment-link/REPLACE_WITH_97_ESSENTIALS_LINK";
const FOUNDATION_PAYMENT_URL = "https://link.shopdollhouse.co/payment-link/6a2a88f671a0aa761e46432b";
const FOUNDATION_LSA_PAYMENT_URL = "https://link.shopdollhouse.co/payment-link/6a2a89a303b17c94f5715c0d";
const BOOKING_URL = "https://link.shopdollhouse.co/widget/booking/9mOtVmE8ihxgAX2AMzge";

interface FoundationOption {
  id: string;
  badge: string | null;
  name: string;
  tagline: string;
  monthly: number;
  setup: number;
  features: string[];
  cta: string;
  paymentUrl: string;
  featured?: boolean;
}

const OPTIONS: FoundationOption[] = [
  {
    id: "essentials",
    badge: null,
    name: "Website Essentials",
    tagline: "Get online fast — a clean website, a booking calendar, and a chat widget, hosted and handled for you.",
    monthly: 97,
    setup: 497,
    features: [
      "Professional website — designed, built, and hosted for you",
      "Online booking calendar so clients can book themselves",
      "Website chat widget — visitors message you right from your site",
      "Mobile-friendly and on-brand to your business",
      "Hosting, updates, and uptime all included",
    ],
    cta: "Get Website Essentials",
    paymentUrl: ESSENTIALS_PAYMENT_URL,
  },
  {
    id: "foundation",
    badge: "Most Popular",
    name: "The Foundation",
    tagline: "Everything a local business needs to stop missing leads — website plus a full follow-up system.",
    monthly: 297,
    setup: 997,
    featured: true,
    features: [
      "Lead-generating website, built and hosted for you",
      "Missed-call text-back — every missed call gets an instant text",
      "Instant lead follow-up — new inquiries get an automatic reply",
      "Voice AI receptionist — answers and books 24/7",
      "5-star review funnel to grow your reputation",
      "Online booking calendar and website chat widget",
      "Full CRM setup — every lead organized in one place",
    ],
    cta: "Get Foundation",
    paymentUrl: FOUNDATION_PAYMENT_URL,
  },
  {
    id: "foundation-lsa",
    badge: null,
    name: "Foundation + Google LSA",
    tagline: "Everything in Foundation, plus Google Local Service Ads — show up first on Google and pay per result.",
    monthly: 497,
    setup: 997,
    features: [
      "Everything in The Foundation plan",
      "Google Local Service Ads management",
      "Your business shows as a sponsored, top-rated Google result",
      "Pay per result, not per click",
      "Ad spend paid directly to Google (kept separate and transparent)",
    ],
    cta: "Get Foundation + LSA",
    paymentUrl: FOUNDATION_LSA_PAYMENT_URL,
  },
];

const fmt = (n: number) => n.toLocaleString("en-US");

function Eyebrow({ children, color = ROSE }: { children: React.ReactNode; color?: string }) {
  return (
    <p style={{ fontFamily: FONT_LUXE, fontSize: "11px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color }}>
      {children}
    </p>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke={ROSE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 shrink-0">
      <path d="M3 8.5 6.2 11.5 13 4.5" />
    </svg>
  );
}

function OptionCard({ plan, billing }: { plan: FoundationOption; billing: Billing }) {
  const isPlaceholder = plan.paymentUrl.includes("REPLACE_WITH");
  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm"
      style={{ border: plan.featured ? `2px solid ${ROSE_HEX}` : "1px solid rgba(29,15,11,0.08)" }}
    >
      {plan.badge && (
        <div className="px-4 py-2 text-center" style={{ background: INK, color: "#fff", fontFamily: FONT_LUXE, fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          {plan.badge}
        </div>
      )}
      <div className="flex flex-1 flex-col p-7 md:p-8">
        <h3 style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, fontSize: "30px", lineHeight: 1.05, color: INK }}>{plan.name}</h3>
        <p className="mt-2" style={{ fontFamily: FONT_BODY, fontSize: "13.5px", lineHeight: 1.5, color: "rgba(29,15,11,0.6)" }}>{plan.tagline}</p>

        {/* badges */}
        <div className="mt-5 flex flex-nowrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5" style={{ background: CREAM, color: INK, fontFamily: FONT_LUXE, fontSize: "0.54rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            <svg viewBox="0 0 12 10" width="9" height="8" fill={ROSE}><path d="M6 9 L0.5 3.5 a2.2 2.2 0 0 1 3.1 -3.1 L6 2.8 l2.4 -2.4 a2.2 2.2 0 0 1 3.1 3.1 Z" /></svg>
            {billing === "6" ? "6-Month Agreement" : "12-Month Agreement"}
          </span>
          <span className="whitespace-nowrap rounded-full px-3 py-1.5" style={{ background: ROSE, color: "#fff", fontFamily: FONT_LUXE, fontSize: "0.54rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            ${fmt(plan.setup)} One-Time Setup
          </span>
        </div>

        {/* price */}
        <div className="mt-5">
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: "52px", lineHeight: 1, color: ROSE_HEX }}>
            ${fmt(plan.monthly)}<span style={{ fontFamily: FONT_BODY, fontSize: "0.72rem", fontWeight: 400, letterSpacing: "0.08em", color: "rgba(29,15,11,0.42)", marginLeft: "0.45rem" }}>USD / mo</span>
          </p>
        </div>

        {/* features */}
        <ul className="mt-6 space-y-3">
          {plan.features.map((f) => (
            <li key={f} className="flex gap-2.5" style={{ fontFamily: FONT_BODY, fontSize: "14px", lineHeight: 1.5, color: INK }}>
              <Check />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-auto pt-6">
          <a
            href={plan.paymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 flex-col items-center justify-center rounded-full px-6 py-3 text-center transition-opacity hover:opacity-90"
            style={{ background: ROSE_HEX, color: "#fff", fontFamily: FONT_BODY, textTransform: "uppercase" }}
          >
            <span style={{ fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.06em" }}>{plan.cta}</span>
            <span style={{ fontWeight: 400, fontSize: "0.68rem", letterSpacing: "0.08em", opacity: 0.9, marginTop: "2px" }}>${fmt(plan.setup)} USD setup today</span>
          </a>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="mt-2.5 block text-center transition-opacity hover:opacity-70" style={{ fontFamily: FONT_BODY, fontSize: "12.5px", color: "rgba(29,15,11,0.55)", textDecoration: "underline", textUnderlineOffset: "2px" }}>
            Not ready? Book a free call →
          </a>
          {isPlaceholder && (
            <p className="mt-2 text-center" style={{ fontFamily: FONT_BODY, fontSize: "11px", color: ROSE_HEX }}>
              Payment link coming soon
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

function FoundationLandingPage() {
  usePageMeta(
    "Get Your Business Online | The Dollhouse Brand Studio",
    "A professional website, booking calendar, and lead system for local businesses — built, hosted, and managed for you. Plans from $97/mo.",
  );

  const [billing, setBilling] = useState<Billing>("6");

  return (
    <main className="overflow-x-hidden text-[var(--ink)]" style={{ background: CREAM }}>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="px-6 pb-16 pt-24 md:pt-28" style={{ background: BLUSH }}>
        <div className="mx-auto max-w-[680px] text-center">
          <Eyebrow>Websites &amp; Lead Systems For Local Business</Eyebrow>
          <h1 className="mt-5" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: INK, fontSize: "clamp(38px, 7vw, 54px)", lineHeight: 1.06 }}>
            Get your business online and booking clients.
          </h1>
          <p className="mx-auto mt-6 max-w-[560px]" style={{ fontFamily: FONT_BODY, fontSize: "18px", lineHeight: 1.7, color: "rgba(29,15,11,0.72)" }}>
            A professional website, an online booking calendar, and a system that follows up with every lead — built, hosted, and managed for you. Pick the option that fits where your business is right now.
          </p>
          <div className="mx-auto mt-8 flex max-w-md flex-wrap items-center justify-center gap-x-3 gap-y-1" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: INK }}>
            <span>Built &amp; hosted for you</span>
            <span style={{ color: ROSE }}>·</span>
            <span>Setup fee due upfront</span>
            <span style={{ color: ROSE }}>·</span>
            <span>6-month agreement</span>
          </div>
        </div>
      </section>

      {/* ── OPTIONS ──────────────────────────────────────── */}
      <section className="px-6 py-16 md:py-20" style={{ background: BLUSH }}>
        {/* 6 / 12-month toggle */}
        <div className="mx-auto mb-10 flex max-w-[430px] flex-col items-center gap-3">
          <div
            className="grid w-full grid-cols-2 gap-1 rounded-full p-1.5"
            style={{ background: "rgba(255,250,246,0.72)", border: "1px solid rgba(200,168,100,0.3)", boxShadow: "0 18px 40px -28px rgba(120,70,55,0.42), inset 0 1px 0 rgba(255,255,255,0.68)" }}
          >
            {([
              { value: "6" as Billing, label: "6 Months", badge: "" },
              { value: "12" as Billing, label: "12 Months", badge: "1 Month Free" },
            ]).map((option) => {
              const active = billing === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setBilling(option.value)}
                  className="flex min-h-[38px] items-center justify-center gap-1.5 rounded-full px-3 py-2 transition-all"
                  style={{ background: active ? INK : "transparent", color: active ? CREAM : "rgba(30,15,10,0.58)", fontFamily: FONT_LUXE, fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 800, boxShadow: active ? "0 10px 22px -14px rgba(30,15,10,0.55)" : "none" }}
                >
                  <span>{option.label}</span>
                  {option.badge && (
                    <span className="rounded-full px-2 py-0.5" style={{ background: "var(--gold)", color: INK, fontSize: "0.5rem", letterSpacing: "0.06em" }}>
                      {option.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <p style={{ fontFamily: FONT_BODY, fontSize: "13px", color: "rgba(29,15,11,0.6)" }}>
            Choose 12 months and your last month is on us.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-3">
          {OPTIONS.map((opt) => (
            <OptionCard key={opt.id} plan={opt} billing={billing} />
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center" style={{ fontFamily: FONT_BODY, fontSize: "12px", lineHeight: 1.8, color: "rgba(29,15,11,0.45)" }}>
          You pay only your one-time setup fee today to get started · Your monthly plan begins once your system is built and live · 6-month minimum term · All payments and setup fees are non-refundable.
        </p>
      </section>

      {/* ── CLOSER ───────────────────────────────────────── */}
      <section className="px-6 py-16 text-center" style={{ background: CREAM }}>
        <div className="mx-auto max-w-[560px]">
          <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, fontStyle: "italic", color: ROSE, fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.1 }}>
            Not sure which one fits?
          </h2>
          <p className="mx-auto mt-4 max-w-md" style={{ fontFamily: FONT_BODY, fontSize: "16px", lineHeight: 1.7, color: "rgba(29,15,11,0.66)" }}>
            Book a free call and we'll help you pick the right option for your business — no pressure, no pitch.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full px-9 py-4 text-center transition-opacity hover:opacity-90"
            style={{ background: INK, color: CREAM, fontFamily: FONT_LUXE, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" }}
          >
            Book a Free Call →
          </a>
        </div>
      </section>
    </main>
  );
}
