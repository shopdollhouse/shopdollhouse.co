import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { usePageMeta } from "@/lib/use-page-meta";
import { PLANS, PlanCard, type Billing } from "@/components/AgencyPlans";

export const Route = createFileRoute("/services")({ component: ServicesPage });

/* ── Tokens ──────────────────────────────────────────── */
const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";

const INK = "var(--ink)";
const ROSE = "var(--rose)";
const CREAM = "var(--cream)";
const BLUSH = "var(--blush)";
const CHARCOAL = "#1a1a1a";

// Single source of truth — swap for a dedicated proposal URL if you have one.
const PROPOSAL_URL = "/#contact";

/* ── Atoms ───────────────────────────────────────────── */
function Eyebrow({ children, color = ROSE }: { children: React.ReactNode; color?: string }) {
  return (
    <p style={{ fontFamily: FONT_LUXE, fontSize: "11px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color }}>
      {children}
    </p>
  );
}

function Check({ color = ROSE }: { color?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 shrink-0">
      <path d="M3 8.5 6.2 11.5 13 4.5" />
    </svg>
  );
}

/* ── Page ────────────────────────────────────────────── */
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
      window.setTimeout(() => setPulseId(null), 1500);
    });
  }

  return (
    <main className="overflow-x-hidden text-[var(--ink)]" style={{ background: CREAM }}>
      <style>{`@keyframes plan-pulse{0%{box-shadow:0 0 0 0 rgba(189,116,118,0)}30%{box-shadow:0 0 0 5px rgba(189,116,118,0.55)}100%{box-shadow:0 0 0 0 rgba(189,116,118,0)}}.plan-pulse{animation:plan-pulse 1.5s ease-out}`}</style>

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
            <span>First 14 days free</span>
            <span style={{ color: ROSE }}>·</span>
            <span>$500 setup due upfront</span>
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
            6-month start · 14-day free trial · $500 setup due upfront
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

      {/* ── 6 · FOCUSED SETUP ─────────────────────────── */}
      <section className="px-6 py-20" style={{ background: CHARCOAL }}>
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3 md:items-center">
          <div>
            <Eyebrow>Focused Setup</Eyebrow>
            <h2 className="mt-3" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: "#fff", fontSize: "clamp(30px, 4vw, 40px)", lineHeight: 1.1 }}>Appointment Booking Setup</h2>
            <p className="mt-4" style={{ fontFamily: FONT_DISPLAY, color: "#fff", fontSize: "52px", lineHeight: 1 }}>$500<span style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", marginLeft: "0.4rem" }}>one-time</span></p>
          </div>
          <p style={{ fontFamily: FONT_BODY, fontSize: "16px", lineHeight: 1.7, color: "rgba(255,255,255,0.7)" }}>
            For businesses that just need leads to book faster. Calendar connection, confirmation flow, reminders, and lead handoff — done in one focused build.
          </p>
          <div>
            <ul className="space-y-2.5">
              {["Booking calendar setup", "Confirmation text and email flow", "Reminder sequence", "Simple lead handoff"].map((f) => (
                <li key={f} className="flex gap-2.5" style={{ fontFamily: FONT_BODY, fontSize: "14px", color: "#fff" }}>
                  <Check />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a href={PROPOSAL_URL} target="_blank" rel="noopener noreferrer" className="mt-6 flex min-h-12 items-center justify-center rounded-full px-6 py-3.5 text-center transition-opacity hover:opacity-90" style={{ background: ROSE, color: "#fff", fontFamily: FONT_BODY, fontWeight: 600 }}>
              Get the Booking Setup
            </a>
          </div>
        </div>
      </section>

      {/* ── 7 · COMPARISON TABLE ──────────────────────── */}
      <ComparisonTable />

      {/* ── 8 · SOCIAL PROOF (stats) ──────────────────── */}
      <section className="px-6 py-20" style={{ background: BLUSH }}>
        <div className="mx-auto max-w-[820px] text-center">
          <Eyebrow>What Clients Are Saying</Eyebrow>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {[
              ["24/7", "Voice AI answering your missed calls"],
              ["14 days", "Until your first content goes live"],
              ["3 platforms", "Fully managed — nothing to post"],
            ].map(([n, l]) => (
              <div key={l}>
                <p style={{ fontFamily: FONT_DISPLAY, fontSize: "52px", lineHeight: 1, color: ROSE }}>{n}</p>
                <p className="mx-auto mt-2 max-w-[200px]" style={{ fontFamily: FONT_BODY, fontSize: "14px", lineHeight: 1.5, color: INK }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9 · FAQ ───────────────────────────────────── */}
      <FAQ />

      {/* ── 10 · FINAL CTA ────────────────────────────── */}
      <section className="px-6 py-28 text-center" style={{ background: CHARCOAL }}>
        <div className="mx-auto max-w-2xl">
          <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: "#fff", fontSize: "clamp(38px, 7vw, 54px)", lineHeight: 1.05 }}>Ready to hand it over?</h2>
          <p className="mx-auto mt-5 max-w-lg" style={{ fontFamily: FONT_BODY, fontSize: "17px", lineHeight: 1.7, color: "rgba(255,255,255,0.7)" }}>
            Every plan starts with a free proposal. We look at your business, recommend the right plan, and show you exactly what we will build — before you commit to anything.
          </p>
          <a href={PROPOSAL_URL} target="_blank" rel="noopener noreferrer" className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full px-12 py-5 transition-opacity hover:opacity-90" style={{ background: ROSE, color: "#fff", fontFamily: FONT_LUXE, fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Get a Free Proposal
          </a>
          <p className="mt-5" style={{ fontFamily: FONT_BODY, fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
            First 14 days free · $500 setup due upfront · 6-month agreement
          </p>
        </div>
      </section>

      {/* ── FOOTER NOTES ──────────────────────────────── */}
      <section className="px-6 py-10" style={{ background: CREAM }}>
        <p className="mx-auto max-w-3xl text-center" style={{ fontFamily: FONT_BODY, fontSize: "12px", lineHeight: 1.7, color: "rgba(29,15,11,0.5)" }}>
          $500 one-time setup fee required upfront on every plan · First 14 days of monthly management free on Starter and Growth · Ad spend is not included in any package — paid directly by you to Meta · Minimum $1,000/mo ad spend recommended
        </p>
      </section>
    </main>
  );
}

/* ── Comparison table ────────────────────────────────── */
function ComparisonTable() {
  const rows: [string, string, string, string][] = [
    ["Professional website", "y", "-", "-"],
    ["AI Clone or brand mascot", "-", "y", "y"],
    ["Platform managed", "-", "1 platform", "3 platforms"],
    ["Posts per month", "-", "16", "24"],
    ["Comment-to-DM automation", "-", "y", "y"],
    ["Voice AI receptionist", "y", "y", "y"],
    ["Missed call text-back", "y", "y", "y"],
    ["Appointment reminders", "y", "y", "y"],
    ["Review management", "y", "-", "y"],
    ["Paid Meta ads", "-", "-", "y"],
    ["Monthly strategy call", "-", "-", "y"],
    ["Monthly performance report", "-", "y", "y"],
    ["CRM setup", "y", "y", "y"],
  ];

  const cell = (v: string) => {
    if (v === "y") return <Check />;
    if (v === "-") return <span style={{ color: "rgba(29,15,11,0.3)" }}>—</span>;
    return <span style={{ fontFamily: FONT_BODY, fontSize: "13px", color: INK }}>{v}</span>;
  };

  return (
    <section className="px-6 py-20" style={{ background: CREAM }}>
      <div className="mx-auto max-w-[900px]">
        <h2 className="text-center" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: INK, fontSize: "clamp(28px, 4vw, 36px)" }}>Everything side by side.</h2>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse" style={{ minWidth: 560 }}>
            <thead>
              <tr>
                <th className="sticky left-0 z-10 px-3 py-3 text-left" style={{ background: CREAM, fontFamily: FONT_LUXE, fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(29,15,11,0.5)" }}>Feature</th>
                {["Foundation", "Starter", "Growth"].map((h) => (
                  <th key={h} className="px-3 py-3 text-center" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.2rem", color: ROSE }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([feature, f, s, g], i) => (
                <tr key={feature} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.5)" : "transparent" }}>
                  <td className="sticky left-0 z-10 px-3 py-3" style={{ background: i % 2 === 0 ? "#fcf8f3" : CREAM, fontFamily: FONT_BODY, fontSize: "13px", color: INK }}>{feature}</td>
                  <td className="px-3 py-3"><div className="flex justify-center">{cell(f)}</div></td>
                  <td className="px-3 py-3"><div className="flex justify-center">{cell(s)}</div></td>
                  <td className="px-3 py-3"><div className="flex justify-center">{cell(g)}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ─────────────────────────────────────────────── */
function FAQ() {
  const items: [string, string][] = [
    ["What is included in the $500 setup fee?", "The $500 covers your full onboarding, system buildout, automation setup, CRM configuration, calendar integration, and launch prep. It is a one-time fee required upfront before your build begins. Monthly billing starts after your free 14-day trial."],
    ["What is the +$300/mo platform access fee?", "This covers your dedicated CRM platform, content tools, and the AI systems powering your automations and AI Clone. It is separate from your management fee and billed monthly alongside it."],
    ["Is ad spend included?", "No. Ad spend is never included in any package. It is paid directly by you to Meta. We recommend starting at $1,000–$2,000/mo for best results. Your package cost and ad budget are always separate."],
    ["What is the AI Clone and when is it built?", "The AI Clone is a digital version of you — built during onboarding and trained to your look, voice, and energy. It creates content that looks and sounds like you, posted to your platforms every month. Included in Starter and Growth."],
    ["What is the difference between Starter and Growth?", "Starter is one platform — fully managed with an AI Clone, 16 posts per month, and a complete automation system. Growth is all three platforms — Facebook, Instagram, and TikTok — plus paid Meta ads, dedicated strategy, and monthly strategy calls. If Starter is the launchpad, Growth is the full system."],
    ["Can I upgrade my plan later?", "Yes. Many clients start with Foundation or Starter and move into Growth when the timing is right. We will recommend the upgrade when your results support it."],
    ["What happens after the 14-day free trial?", "Monthly billing begins automatically. You are on a 6-month agreement from that point. Annual clients receive their 12th month completely free."],
    ["How do I get started?", "Click “Get a Free Proposal” on any plan. We review your business, recommend the right plan, and send a full proposal before you commit anything. No pressure, no obligation."],
  ];

  return (
    <section className="px-6 py-20" style={{ background: CREAM }}>
      <div className="mx-auto max-w-[700px]">
        <h2 className="text-center" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: INK, fontSize: "clamp(32px, 5vw, 42px)" }}>Good to know.</h2>
        <div className="mt-8 space-y-3">
          {items.map(([q, a]) => (
            <details key={q} className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid rgba(200,164,100,0.25)" }}>
              <summary className="cursor-pointer list-none" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: INK }}>{q}</summary>
              <p className="mt-3" style={{ fontFamily: FONT_BODY, fontSize: "15px", lineHeight: 1.65, color: "rgba(29,15,11,0.7)" }}>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
