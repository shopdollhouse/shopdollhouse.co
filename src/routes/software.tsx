import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import archMark from "@/assets/arch-mark.svg";

export const Route = createFileRoute("/software")({ component: SoftwarePage });

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_SCRIPT = "'Allura', cursive";
const FONT_LUXE = "'Jost', sans-serif";

/* ─── Nav ─────────────────────────────────────────────── */
function Nav() {
  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between px-6 md:px-12 py-5 bg-[var(--cream)]/80 backdrop-blur-md border-b border-[var(--gold)]/15">
      <Link to="/" className="flex flex-col items-start leading-tight no-underline">
        <span
          className="text-[var(--ink)]/55 font-normal not-italic"
          style={{ fontFamily: FONT_SCRIPT, fontSize: "18px", letterSpacing: "1px", textTransform: "lowercase", lineHeight: 1 }}
        >
          the
        </span>
        <span
          className="text-[var(--ink)] italic"
          style={{ fontFamily: FONT_DISPLAY, fontSize: "15px", letterSpacing: "4px", textTransform: "uppercase", marginTop: "-4px" }}
        >
          Dollhouse
        </span>
        <span
          className="text-[var(--gold)] not-italic font-semibold"
          style={{ fontFamily: FONT_LUXE, fontSize: "6.5px", letterSpacing: "3px", textTransform: "uppercase", marginTop: "1px" }}
        >
          Brand Studio
        </span>
      </Link>

      <Link
        to="/"
        className="text-[var(--ink)]/70 text-[10px] tracking-[0.2em] uppercase hover:text-[var(--ink)] transition-colors"
        style={{ fontFamily: FONT_LUXE }}
      >
        ← Back to main site
      </Link>
    </nav>
  );
}

/* ─── Tiers ────────────────────────────────────────────── */
const tiers = [
  {
    name: "Basic",
    monthlyPrice: "$97",
    yearlyPrice: "$970",
    yearlyMonthly: "$81",
    tagline: "The perfect starting point.",
    features: [
      "Online appointment booking",
      "Automated booking confirmations",
      "Basic CRM & contact management",
      "1 calendar & 1 user",
      "2-way SMS & email messaging",
      "Mobile app access",
    ],
  },
  {
    name: "Growth",
    monthlyPrice: "$297",
    yearlyPrice: "$2,970",
    yearlyMonthly: "$248",
    tagline: "More automation. More results.",
    featured: true,
    topBadge: "Most Popular",
    features: [
      "Everything in Basic",
      "Reduce no-shows with reminders",
      "Automated lead follow-up sequences",
      "Email & SMS marketing campaigns",
      "Sales pipeline & opportunity tracking",
      "Social media planner",
      "Review & reputation management",
      "Up to 3 users",
    ],
  },
  {
    name: "Elite",
    monthlyPrice: "$497",
    yearlyPrice: "$4,970",
    yearlyMonthly: "$414",
    tagline: "Full AI power. Fully automated.",
    features: [
      "Everything in Growth",
      "Full AI booking system",
      "AI voice + chat agent (24/7)",
      "AI-generated content & captions",
      "Website & funnel builder",
      "Membership & course portal",
      "Advanced reporting dashboard",
      "Unlimited users & contacts",
    ],
  },
];

/* ─── Pricing section ──────────────────────────────────── */
function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="py-24 px-6" style={{ background: "linear-gradient(135deg, #f4dcdc 0%, #f7e6dc 45%, #f1d3cf 100%)" }}>
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-[var(--gold)] text-[11px] tracking-[0.28em] uppercase" style={{ fontFamily: FONT_LUXE }}>
          White-Label Platform
        </p>
        <h2
          className="mt-3 italic text-[var(--ink)]"
          style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.2rem, 4vw, 3rem)", lineHeight: 1.1 }}
        >
          Choose your plan
        </h2>
        <p className="mt-4 text-[var(--ink)]/65" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.05rem", fontStyle: "italic" }}>
          Powered by our branded platform. Cancel anytime.
        </p>

        {/* Monthly / Yearly toggle */}
        <div className="mt-8 inline-flex items-center gap-3 rounded-full px-2 py-2 bg-white/60 backdrop-blur-sm border border-[var(--gold)]/25">
          <button
            onClick={() => setYearly(false)}
            className="px-5 py-2 rounded-full text-[11px] tracking-[0.18em] uppercase transition-all"
            style={{
              fontFamily: FONT_LUXE,
              background: !yearly ? "var(--ink)" : "transparent",
              color: !yearly ? "var(--cream)" : "var(--ink)",
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setYearly(true)}
            className="px-5 py-2 rounded-full text-[11px] tracking-[0.18em] uppercase transition-all"
            style={{
              fontFamily: FONT_LUXE,
              background: yearly ? "var(--ink)" : "transparent",
              color: yearly ? "var(--cream)" : "var(--ink)",
            }}
          >
            Yearly
            <span
              className="ml-2 px-2 py-0.5 rounded-full text-[9px]"
              style={{ background: "var(--gold)", color: "var(--ink)", letterSpacing: "0.1em" }}
            >
              2 MO FREE
            </span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-16 max-w-6xl mx-auto grid md:grid-cols-3 gap-8 lg:gap-10">
        {tiers.map((t) => {
          const isFilled = !!t.featured;
          return (
            <div key={t.name} className={`relative pt-8 ${isFilled ? "md:-mt-4 md:z-10" : ""}`}>
              {t.topBadge && (
                <span
                  className="absolute -top-1 left-1/2 -translate-x-1/2 z-10 px-6 py-2 rounded-full text-[10px] tracking-[0.28em] uppercase whitespace-nowrap"
                  style={{ fontFamily: FONT_LUXE, backgroundColor: "var(--gold)", color: "var(--ink)" }}
                >
                  {t.topBadge}
                </span>
              )}

              <article
                className={`h-full rounded-[28px] p-10 flex flex-col items-center text-center ${isFilled ? "md:py-14" : ""}`}
                style={{
                  background: isFilled ? "var(--ink)" : "linear-gradient(180deg, #fbf3ee 0%, #f6e8e1 100%)",
                  border: isFilled ? "1.5px solid rgba(255,255,255,0.08)" : "1px solid color-mix(in oklab, var(--gold) 35%, transparent)",
                  boxShadow: isFilled
                    ? "0 40px 80px -20px rgba(30,15,10,0.55), 0 0 0 1px rgba(200,168,100,0.15)"
                    : "0 30px 60px -30px rgba(160,110,95,0.35), inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
              >
                {/* Eyebrow */}
                <p className="text-[var(--gold)] text-[11px] tracking-[0.28em] uppercase" style={{ fontFamily: FONT_LUXE }}>
                  The {t.name}
                </p>

                {/* Title */}
                <h3
                  className="mt-3 italic"
                  style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.75rem, 2.2vw, 2.25rem)", lineHeight: 1.1, color: isFilled ? "var(--cream)" : "var(--ink)" }}
                >
                  {t.name}
                </h3>

                {/* Pill */}
                <div
                  className="mt-5 inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10.5px] tracking-[0.28em] uppercase"
                  style={{
                    fontFamily: FONT_LUXE,
                    color: isFilled ? "rgba(250,243,234,0.85)" : "var(--ink)",
                    border: isFilled ? "1px solid rgba(200,168,100,0.35)" : "1px solid color-mix(in oklab, var(--gold) 40%, transparent)",
                    backgroundColor: isFilled ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.5)",
                  }}
                >
                  <span style={{ color: "var(--gold)" }}>✦</span> Software Access
                </div>

                {/* Price */}
                <div className="mt-7 flex flex-col items-center">
                  <span
                    style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.5rem, 3.8vw, 3.25rem)", lineHeight: 1, fontStyle: "italic", color: "var(--gold)" }}
                  >
                    {yearly ? t.yearlyMonthly : t.monthlyPrice}
                  </span>
                  <span
                    style={{ fontFamily: FONT_LUXE, fontSize: "0.7rem", letterSpacing: "0.2em", color: isFilled ? "rgba(255,255,255,0.45)" : "rgba(30,15,10,0.45)", marginTop: "4px" }}
                  >
                    {yearly ? "USD/MO · BILLED YEARLY" : "USD/MO"}
                  </span>
                  {yearly && (
                    <span
                      className="mt-2 text-[10px] tracking-[0.1em] uppercase"
                      style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}
                    >
                      {t.yearlyPrice}/yr
                    </span>
                  )}
                </div>

                {/* Tagline */}
                <p
                  className="mt-6"
                  style={{ fontFamily: FONT_DISPLAY, fontSize: "1.05rem", lineHeight: 1.55, color: isFilled ? "rgba(250,243,234,0.7)" : "rgba(30,15,10,0.75)", fontStyle: "italic" }}
                >
                  {t.tagline}
                </p>

                {/* Divider */}
                <div className="mt-7 flex items-center gap-3 w-full">
                  <span className="flex-1 h-px" style={{ background: isFilled ? "linear-gradient(90deg, transparent, rgba(201,122,122,0.5), transparent)" : "linear-gradient(90deg, transparent, color-mix(in oklab, var(--gold) 50%, transparent), transparent)" }} />
                  <span style={{ color: isFilled ? "#c97a7a" : "var(--gold)", fontSize: "0.7rem" }}>♥</span>
                  <span className="flex-1 h-px" style={{ background: isFilled ? "linear-gradient(90deg, transparent, rgba(201,122,122,0.5), transparent)" : "linear-gradient(90deg, transparent, color-mix(in oklab, var(--gold) 50%, transparent), transparent)" }} />
                </div>

                {/* Features */}
                <ul className="mt-7 space-y-3.5 flex-1 w-full text-left">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3" style={{ fontFamily: FONT_LUXE, fontSize: "0.92rem", color: isFilled ? "rgba(250,243,234,0.85)" : "rgba(30,15,10,0.85)" }}>
                      <span className="mt-1 shrink-0" style={{ color: isFilled ? "#c97a7a" : "var(--gold)", fontSize: "0.7rem" }}>✦</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* 14-Day Free Trial CTA */}
                <a
                  href="#"
                  className="mt-10 w-full block rounded-2xl px-5 py-4 text-center transition-all hover:-translate-y-0.5 hover:opacity-90"
                  style={{ backgroundColor: "var(--gold)", boxShadow: "0 12px 28px -10px rgba(160,110,60,0.5)" }}
                >
                  <p className="text-[var(--ink)] leading-tight" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem", fontStyle: "italic", fontWeight: 700 }}>
                    14-Day Free Trial
                  </p>
                  <p className="text-[var(--ink)]/60 mt-0.5" style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    No obligations · cancel anytime
                  </p>
                </a>
              </article>
            </div>
          );
        })}
      </div>

      <p className="text-center mt-12 text-[var(--ink)]/45 italic text-sm" style={{ fontFamily: FONT_DISPLAY }}>
        All plans include a 3-month minimum · Fully managed, nothing to learn
      </p>
    </section>
  );
}

/* ─── Hero ─────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="py-28 px-6 text-center bg-[var(--blush)]">
      <div className="max-w-2xl mx-auto">
        <img src={archMark} alt="" className="w-10 h-14 mx-auto mb-6 opacity-60" style={{ filter: "sepia(0.4) saturate(1.5)" }} />
        <p className="text-[var(--gold)] text-[11px] tracking-[0.28em] uppercase" style={{ fontFamily: FONT_LUXE }}>
          The Dollhouse Platform
        </p>
        <h1
          className="mt-4 italic text-[var(--ink)]"
          style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.5rem, 5vw, 3.75rem)", lineHeight: 1.1 }}
        >
          Your brand's own software
        </h1>
        <p className="mt-5 text-[var(--ink)]/65" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem", fontStyle: "italic", lineHeight: 1.6 }}>
          Book clients, automate follow-ups, manage reviews, and run your whole business — from one branded platform.
        </p>
        <div className="mt-3 flex items-center justify-center gap-2 text-[var(--gold)]">
          <span className="h-px w-12 bg-current opacity-50" />
          <span style={{ fontSize: "0.6rem" }}>♥</span>
          <span className="h-px w-12 bg-current opacity-50" />
        </div>
        <p className="mt-4 text-[var(--ink)]/45 text-[11px] tracking-[0.2em] uppercase" style={{ fontFamily: FONT_LUXE }}>
          Powered by GoHighLevel · White-labeled for The Dollhouse
        </p>
      </div>
    </section>
  );
}

/* ─── Footer ───────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-[var(--gold)]/15 py-10 px-6 text-center bg-[var(--blush)]">
      <p className="text-[var(--ink)]/40 text-xs" style={{ fontFamily: FONT_LUXE, letterSpacing: "0.15em" }}>
        © {new Date().getFullYear()} The Dollhouse Brand Studio · All rights reserved
      </p>
      <Link
        to="/"
        className="mt-3 inline-block text-[var(--gold)] text-[10px] tracking-[0.2em] uppercase hover:opacity-70 transition-opacity"
        style={{ fontFamily: FONT_LUXE }}
      >
        ← Back to main site
      </Link>
    </footer>
  );
}

/* ─── Page ─────────────────────────────────────────────── */
function SoftwarePage() {
  return (
    <main className="bg-[var(--blush)] text-[var(--ink)]">
      <Nav />
      <Hero />
      <Pricing />
      <Footer />
    </main>
  );
}
