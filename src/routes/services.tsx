import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { usePageMeta } from "@/lib/use-page-meta";
import { PLANS, PlanCard, type Billing } from "@/components/AgencyPlans";
import {
  PlanComparisonSection,
  ResultsStatsSection,
  AgencyFaqSection,
  FinalCtaSection,
  AgencyFooterNotes,
  PULSE_STYLE,
} from "@/components/AgencySections";

export const Route = createFileRoute("/services")({ component: ServicesPage });

/* ── Tokens ──────────────────────────────────────────── */
const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";

const INK = "var(--ink)";
const ROSE = "var(--rose)";
const CREAM = "var(--cream)";
const BLUSH = "var(--blush)";

// Single source of truth — swap for a dedicated proposal URL if you have one.
const PROPOSAL_URL = "/#contact";

function Eyebrow({ children, color = ROSE }: { children: React.ReactNode; color?: string }) {
  return (
    <p style={{ fontFamily: FONT_LUXE, fontSize: "11px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color }}>
      {children}
    </p>
  );
}

function ServicesPage() {
  usePageMeta(
    "Pricing & Plans | The Dollhouse Brand Studio",
    "Done-for-you social media, AI Clone content, automation, and lead systems for service businesses. Plans from $297/mo. Get a free proposal.",
  );

  const [billing, setBilling] = useState<Billing>("6");
  const [pulseId, setPulseId] = useState<string | null>(null);

  function goToPlan(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setPulseId(null);
    window.requestAnimationFrame(() => {
      setPulseId(id);
      window.setTimeout(() => setPulseId(null), 5000);
    });
  }

  return (
    <main className="overflow-x-hidden text-[var(--ink)]" style={{ background: CREAM }}>
      <style>{PULSE_STYLE}</style>

      {/* ── 1 · STICKY MOBILE TOP BAR ─────────────────── */}
      <a href="#plans" className="fixed inset-x-0 top-0 z-50 block px-4 py-2.5 text-center md:hidden" style={{ background: INK, color: "#fff", fontFamily: FONT_BODY, fontSize: "0.78rem" }}>
        Done-for-you social media & lead systems — starting at $297/mo
      </a>

      {/* ── 2 · HOOK ──────────────────────────────────── */}
      <section className="px-6 pb-20 pt-24 md:pt-28" style={{ background: BLUSH }}>
        <div className="mx-auto max-w-[680px] text-center">
          <Eyebrow>Done-For-You Social Media &amp; Lead Systems</Eyebrow>
          <h1 className="mt-5" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: INK, fontSize: "clamp(38px, 7vw, 54px)", lineHeight: 1.06 }}>
            Your business should be everywhere online. Without you doing all of it.
          </h1>
          <div className="mx-auto mt-7 max-w-[560px] space-y-4" style={{ fontFamily: FONT_BODY, fontSize: "18px", lineHeight: 1.7, color: INK }}>
            <p style={{ color: "rgba(29,15,11,0.78)" }}>
              You are great at what you do. But showing up on social media every day, following up with every lead, managing your reviews, and running ads — on top of actually running your business — is too much for one person.
            </p>
            <p className="italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.6rem", color: ROSE }}>That is what Dollhouse is for.</p>
            <p style={{ color: "rgba(29,15,11,0.78)" }}>
              We build and manage the full system — content, AI Clone, automation, and ads — so your business runs and grows while you do the work you actually love.
            </p>
          </div>
          <div className="mx-auto mt-9 flex max-w-md flex-wrap items-center justify-center gap-x-3 gap-y-1" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: INK }}>
            <span>Done for you, every day</span>
            <span style={{ color: ROSE }}>·</span>
            <span>Setup fee due upfront</span>
            <span style={{ color: ROSE }}>·</span>
            <span>6-month agreement</span>
          </div>
        </div>
      </section>

      {/* ── 3 · PLAN FINDER ───────────────────────────── */}
      <section className="px-6 py-16 md:py-20" style={{ background: CREAM }}>
        <div className="mx-auto max-w-[720px] text-center">
          <Eyebrow>Not Sure Which Plan Is Right?</Eyebrow>
          <h2 className="mt-4" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: INK, fontSize: "clamp(28px, 4vw, 36px)" }}>Answer one question.</h2>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {[
              ["I need a website and a lead system — no social media yet", "foundation"],
              ["I want consistent social content without doing it myself", "starter"],
              ["I want my whole social media managed with an AI Clone", "starter"],
              ["I want everything — content, AI, ads, and full automation", "growth"],
            ].map(([label, target]) => (
              <button
                key={label}
                type="button"
                onClick={() => goToPlan(target)}
                className="min-h-12 rounded-2xl px-6 py-4 text-left transition-opacity hover:opacity-90"
                style={{ background: INK, color: "#fff", fontFamily: FONT_BODY, fontSize: "16px", lineHeight: 1.4 }}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="mt-6" style={{ fontFamily: FONT_BODY, fontSize: "13px", color: "rgba(29,15,11,0.55)" }}>Or scroll to compare all plans below ↓</p>
        </div>
      </section>

      {/* ── 4 · BILLING TOGGLE ────────────────────────── */}
      <section id="plans" className="scroll-mt-20 px-6 pt-16 md:pt-20" style={{ background: BLUSH }}>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Monthly Plans</Eyebrow>
          <h2 className="mt-4" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: INK, fontSize: "clamp(34px, 5vw, 46px)" }}>Choose your plan.</h2>
          <p className="mx-auto mt-4 max-w-[560px]" style={{ fontFamily: FONT_BODY, fontSize: "16px", lineHeight: 1.6, color: "rgba(29,15,11,0.6)" }}>
            Start with the foundation. Scale into full managed growth when you are ready.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full p-1.5" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(200,164,100,0.3)" }}>
            <button
              type="button"
              onClick={() => setBilling("6")}
              className="rounded-full px-6 py-2.5 transition-colors"
              style={{ background: billing === "6" ? INK : "transparent", color: billing === "6" ? "#fff" : INK, fontFamily: FONT_LUXE, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              6 Months
            </button>
            <button
              type="button"
              onClick={() => setBilling("12")}
              className="flex items-center gap-2 rounded-full px-6 py-2.5 transition-colors"
              style={{ background: billing === "12" ? INK : "transparent", color: billing === "12" ? "#fff" : INK, fontFamily: FONT_LUXE, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              12 Months
              <span className="rounded-full px-2 py-0.5" style={{ background: ROSE, color: "#fff", fontSize: "0.55rem", letterSpacing: "0.08em" }}>1 Month Free</span>
            </button>
          </div>
          <p className="mt-4" style={{ fontFamily: FONT_BODY, fontSize: "13px", color: "rgba(29,15,11,0.6)" }}>
            6-month start · Setup fee due upfront
          </p>
        </div>
      </section>

      {/* ── 5 · PLAN CARDS ────────────────────────────── */}
      <section id="plans-grid" className="px-6 pb-20 pt-10 md:pb-28" style={{ background: BLUSH }}>
        <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-3">
          {PLANS.map((p) => (
            <PlanCard key={p.id} plan={p} billing={billing} pulse={pulseId === p.id} ctaHref={PROPOSAL_URL} ctaNewTab />
          ))}
        </div>
      </section>

      {/* ── 6–10 · shared sections ────────────────────── */}
      <AgencyFooterNotes />
      <PlanComparisonSection />
      <ResultsStatsSection />
      <AgencyFaqSection />
      <FinalCtaSection proposalHref={PROPOSAL_URL} newTab />
    </main>
  );
}
