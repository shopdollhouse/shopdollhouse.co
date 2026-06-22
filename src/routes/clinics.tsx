import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { usePageMeta } from "@/lib/use-page-meta";
import { useScrollReveal } from "@/lib/use-scroll-reveal";

export const Route = createFileRoute("/clinics")({ component: ClinicsPage });

/* Real GHL booking widget — swap if you use a different calendar */
const BOOKING_URL = "https://link.shopdollhouse.co/widget/booking/9mOtVmE8ihxgAX2AMzge";

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_LUXE = "'Jost', sans-serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_SCRIPT = "'Allura', cursive";

function Cta({ children = "Book a Strategy Call", light = false }: { children?: React.ReactNode; light?: boolean }) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-12 items-center justify-center rounded-full px-8 py-4 transition-all hover:-translate-y-0.5"
      style={{
        background: light ? "var(--cream)" : "#bd7476",
        color: light ? "#1a0e0c" : "#fff",
        fontFamily: FONT_LUXE,
        fontSize: "0.74rem",
        fontWeight: 700,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        boxShadow: light ? "0 18px 44px -20px rgba(0,0,0,0.4)" : "0 18px 44px -16px rgba(189,116,118,0.75)",
      }}
    >
      {children}
    </a>
  );
}

function Eyebrow({ children, color = "var(--gold)" }: { children: React.ReactNode; color?: string }) {
  const isGold = color === "var(--gold)";
  return (
    <p className={isGold ? "gold-grad" : undefined} style={{ fontFamily: FONT_LUXE, fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", color: isGold ? undefined : color }}>
      {children}
    </p>
  );
}

const METHOD = [
  { n: "01", title: "Foundation & Setup", body: "We build your booking system, lead pipeline, and tracking so every inquiry is captured and nothing slips. Done for you in your first week." },
  { n: "02", title: "AI Patient-Acquisition Ads", body: "AI-built Facebook & Instagram campaigns put your treatments in front of the right local patients — managed and optimised daily." },
  { n: "03", title: "The AI Caller", body: "The moment a lead comes in, our AI voice agent calls within 60 seconds, qualifies them, answers questions, and books the consultation — 24/7." },
  { n: "04", title: "Booking & Retention", body: "Automated reminders, instant follow-up, and a five-star review engine keep your calendar full and your reputation glowing." },
];

const TREATMENTS = [
  { name: "Botox & Fillers", note: "High-frequency, high-loyalty patients." },
  { name: "Facials & Skin", note: "Memberships and repeat visits." },
  { name: "Laser", note: "Premium packages, multi-session." },
  { name: "Body Contouring", note: "High-ticket transformation cases." },
  { name: "IV & NAD+", note: "Wellness regulars and add-ons." },
  { name: "Weight Loss & HRT", note: "Recurring, membership-ready." },
  { name: "Peptide Therapy", note: "Education-led, high-intent patients." },
  { name: "Stem Cell & Exosome", note: "Premium, consultation-first." },
];

const TIMELINE = [
  { week: "Week 1", title: "Build & Setup", body: "Booking system, pipeline, tracking and brand assets configured." },
  { week: "Week 2", title: "Funnel & AI Training", body: "Ad funnel built, AI Caller trained on your clinic and treatments." },
  { week: "Week 3", title: "Ads Go Live", body: "Campaigns launch. Every new lead is called and booked in under a minute." },
  { week: "Week 4+", title: "Optimise & Grow", body: "We refine the ads, fill your calendar, and scale what's working." },
];

const FAQ = [
  { q: "How do you get me new patients?", a: "We run AI-managed Facebook & Instagram ads to the right local audience, then our AI Caller phones every lead within 60 seconds to qualify and book a consultation straight into your calendar." },
  { q: "What does the AI Caller actually do?", a: "It answers and calls leads 24/7, asks your qualifying questions, handles common questions, and books the consultation — so no high-value lead ever goes cold while you're with a patient." },
  { q: "Is this compliant in Canada?", a: "Yes. We follow Canadian privacy law (PIPEDA), keep email and SMS consent-based (CASL), and contact opted-in inbound leads only. All ad copy is education- and consultation-focused — never a treatment claim." },
  { q: "Do I need to film content or post?", a: "No. The system is done-for-you. You focus on treating patients; we handle the ads, the calls, the bookings, and the follow-up." },
  { q: "You're a new agency — why should I trust you?", a: "That's exactly why our founding clients get our full attention, a founding-client rate, and a real guarantee: we don't stop until your calendar is filling. You also keep ownership of everything we build." },
  { q: "How fast can we launch?", a: "Most clinics are fully set up and live within about 30 days — build in week one, ads live by week three." },
];

function ClinicsPage() {
  usePageMeta({
    title: "Patient Acquisition for Canadian Clinics — The Dollhouse Brand Studio",
    description: "AI-run ads + an AI Caller that books your consultations 24/7. Done-for-you patient acquisition for Canadian med spas, stem cell, and peptide clinics.",
  });
  useScrollReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main style={{ fontFamily: FONT_BODY, color: "var(--ink)", overflowX: "hidden" }}>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="relative px-6 pt-24 pb-28 text-center"
        style={{ background: "radial-gradient(120% 90% at 50% -10%, #2a1a10 0%, #1a0e0c 55%, #140a07 100%)" }}
      >
        {/* pink glow aura */}
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2" style={{ width: 620, height: 620, background: "radial-gradient(circle, rgba(189,116,118,0.55) 0%, rgba(189,116,118,0) 68%)", filter: "blur(30px)" }} />
        <div className="relative mx-auto max-w-4xl">
          <span className="reveal inline-flex items-center gap-2 rounded-full px-5 py-2" style={{ border: "1px solid rgba(200,164,100,0.5)", background: "rgba(255,255,255,0.04)" }}>
            <span style={{ color: "var(--gold)" }}>✦</span>
            <span style={{ fontFamily: FONT_LUXE, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)" }}>Now Accepting Founding Clients</span>
          </span>
          <p className="reveal gold-grad mt-6" style={{ fontFamily: FONT_SCRIPT, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 0.9 }}>a fully booked</p>
          <h1 className="reveal text-shimmer mx-auto mt-1 max-w-3xl" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, fontSize: "clamp(2.9rem, 7vw, 5.6rem)", lineHeight: 0.98, letterSpacing: "0.01em" }}>
            Patient Acquisition,<br />Done For You
          </h1>
          <p className="reveal mx-auto mt-7 max-w-2xl" style={{ fontFamily: FONT_BODY, fontSize: "1.05rem", lineHeight: 1.65, color: "rgba(250,243,234,0.72)" }}>
            AI-run Facebook & Instagram ads bring in the right local patients — and our <strong style={{ color: "var(--cream)" }}>AI Caller</strong> books them into your calendar within 60 seconds. For Canadian med spas, stem cell, and peptide clinics.
          </p>
          <div className="reveal mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Cta />
            <span style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(250,243,234,0.5)" }}>No card · No commitment · 30-minute working session</span>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS INTRO ───────────────────────────── */}
      <section className="px-6 py-20 text-center" style={{ background: "var(--cream)" }}>
        <div className="mx-auto max-w-3xl">
          <Eyebrow color="var(--rose)">How It Works</Eyebrow>
          <h2 className="reveal mx-auto mt-3 max-w-2xl" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, fontSize: "clamp(2rem, 4.5vw, 3.2rem)", lineHeight: 1.05 }}>
            Your leads called and booked — before they go cold.
          </h2>
          <p className="reveal mx-auto mt-5 max-w-xl" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.7, color: "rgba(30,15,10,0.62)" }}>
            Most clinics lose patients in the gap between an ad click and a phone call. We close that gap completely — beautiful ads, instant AI calls, and a calendar that fills itself.
          </p>
        </div>
      </section>

      {/* ── THE METHOD ───────────────────────────────────── */}
      <section className="px-6 py-24" style={{ background: "var(--blush)" }}>
        <div className="mx-auto max-w-5xl text-center">
          <Eyebrow>The System</Eyebrow>
          <h2 className="reveal mt-3" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, fontSize: "clamp(2rem, 4.5vw, 3.2rem)", lineHeight: 1.05 }}>Four systems, one clinic</h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          {METHOD.map((m) => (
            <div key={m.n} className="reveal rounded-2xl p-8" style={{ background: "#fff", border: "1px solid rgba(200,164,100,0.25)", boxShadow: "0 24px 60px -40px rgba(90,45,35,0.4)" }}>
              <p className="gold-grad" style={{ fontFamily: FONT_DISPLAY, fontSize: "2.4rem", lineHeight: 1 }}>{m.n}</p>
              <h3 className="mt-3" style={{ fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: "1.5rem", color: "var(--ink)" }}>{m.title}</h3>
              <p className="mt-2.5" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem", lineHeight: 1.65, color: "rgba(30,15,10,0.62)" }}>{m.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TREATMENTS ───────────────────────────────────── */}
      <section className="px-6 py-24 text-center" style={{ background: "var(--cream)" }}>
        <div className="mx-auto max-w-5xl">
          <Eyebrow color="var(--rose)">Who We Work With</Eyebrow>
          <h2 className="reveal mt-3" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, fontSize: "clamp(2rem, 4.5vw, 3.2rem)", lineHeight: 1.05 }}>Built for every kind of clinic</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TREATMENTS.map((t) => (
              <div key={t.name} className="reveal rounded-2xl p-6 text-left" style={{ background: "var(--blush)", border: "1px solid rgba(200,164,100,0.22)" }}>
                <span style={{ color: "var(--rose)", fontSize: "0.8rem" }}>✦</span>
                <h3 className="mt-2" style={{ fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: "1.2rem", color: "var(--ink)" }}>{t.name}</h3>
                <p className="mt-1" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", lineHeight: 1.5, color: "rgba(30,15,10,0.55)" }}>{t.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI CALLER DEEP DIVE ──────────────────────────── */}
      <section className="relative px-6 py-28" style={{ background: "radial-gradient(120% 90% at 50% 0%, #2a1a10 0%, #1a0e0c 60%)" }}>
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: 560, height: 560, background: "radial-gradient(circle, rgba(189,116,118,0.4) 0%, rgba(189,116,118,0) 70%)", filter: "blur(36px)" }} />
        <div className="relative mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>The AI Caller</Eyebrow>
            <h2 className="reveal mt-3" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, fontSize: "clamp(2rem, 4.5vw, 3.2rem)", lineHeight: 1.05, color: "var(--cream)" }}>
              The front desk that never sleeps
            </h2>
            <ul className="mt-7 space-y-4">
              {["Calls every new lead within 60 seconds", "Qualifies patients and answers common questions", "Books the consultation straight into your calendar", "Works 24/7 — every lead, every time"].map((f) => (
                <li key={f} className="flex gap-3" style={{ fontFamily: FONT_BODY, fontSize: "1rem", color: "rgba(250,243,234,0.82)" }}>
                  <span style={{ color: "var(--gold)" }}>✦</span>{f}
                </li>
              ))}
            </ul>
            <div className="mt-9"><Cta light>See It Live</Cta></div>
          </div>
          {/* sample transcript card */}
          <div className="reveal rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,164,100,0.3)", boxShadow: "0 0 60px -20px rgba(189,116,118,0.5)" }}>
            <p style={{ fontFamily: FONT_LUXE, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>Live Call · 0:08</p>
            <div className="mt-4 space-y-3" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", lineHeight: 1.5 }}>
              <p style={{ color: "rgba(250,243,234,0.6)" }}><b style={{ color: "var(--rose)" }}>AI:</b> Hi, this is the team at [Clinic]! You just reached out about a consultation — I can get you booked right now. Mornings or afternoons?</p>
              <p style={{ color: "rgba(250,243,234,0.6)" }}><b style={{ color: "var(--cream)" }}>Lead:</b> Afternoons work better.</p>
              <p style={{ color: "rgba(250,243,234,0.6)" }}><b style={{ color: "var(--rose)" }}>AI:</b> Perfect — I have Thursday at 2:00. You're booked. You'll get a text confirmation now. 💗</p>
            </div>
            <p className="mt-4 rounded-lg px-3 py-2 text-center" style={{ background: "rgba(189,116,118,0.18)", color: "var(--cream)", fontFamily: FONT_LUXE, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>✓ Consultation booked</p>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────── */}
      <section className="px-6 py-24" style={{ background: "var(--cream)" }}>
        <div className="mx-auto max-w-5xl text-center">
          <Eyebrow color="var(--rose)">The Rollout</Eyebrow>
          <h2 className="reveal mt-3" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, fontSize: "clamp(2rem, 4.5vw, 3.2rem)", lineHeight: 1.05 }}>Thirty days to a fuller calendar</h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-4">
          {TIMELINE.map((t) => (
            <div key={t.week} className="reveal rounded-2xl p-6" style={{ background: "var(--blush)", border: "1px solid rgba(200,164,100,0.22)" }}>
              <p style={{ fontFamily: FONT_LUXE, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--rose)" }}>{t.week}</p>
              <h3 className="mt-2" style={{ fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: "1.25rem", color: "var(--ink)" }}>{t.title}</h3>
              <p className="mt-2" style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", lineHeight: 1.55, color: "rgba(30,15,10,0.58)" }}>{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROGRAMS (no pricing) ────────────────────────── */}
      <section className="px-6 py-24" style={{ background: "var(--blush)" }}>
        <div className="mx-auto max-w-5xl text-center">
          <Eyebrow>Two Ways In</Eyebrow>
          <h2 className="reveal mt-3" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, fontSize: "clamp(2rem, 4.5vw, 3.2rem)", lineHeight: 1.05 }}>One destination — a full calendar</h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {[
            { tag: "Launch", featured: false, sub: "For new clinics getting started.", items: ["Full booking & lead system built for you", "AI ad funnel + AI Caller set up", "Brand-ready website included", "Founding-client onboarding"] },
            { tag: "Scale", featured: true, sub: "For established clinics ready for more patients.", items: ["Everything in Launch", "Aggressive AI ad management", "AI Caller booking around the clock", "Dedicated account management & optimisation"] },
          ].map((p) => (
            <div key={p.tag} className={`reveal rounded-2xl p-8 ${p.featured ? "featured-glow" : ""}`} style={{ background: p.featured ? "var(--ink)" : "#fff", border: p.featured ? "1px solid rgba(200,164,100,0.4)" : "1px solid rgba(200,164,100,0.25)" }}>
              {p.featured && <span className="inline-block rounded-full px-3 py-1" style={{ background: "var(--rose)", color: "#fff", fontFamily: FONT_LUXE, fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Most Popular</span>}
              <h3 className="mt-3" style={{ fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: "2rem", color: p.featured ? "var(--cream)" : "var(--ink)" }}>{p.tag}</h3>
              <p className="mt-1" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: p.featured ? "rgba(250,243,234,0.65)" : "rgba(30,15,10,0.58)" }}>{p.sub}</p>
              <ul className="mt-6 space-y-3">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-2.5" style={{ fontFamily: FONT_BODY, fontSize: "0.92rem", color: p.featured ? "rgba(250,243,234,0.85)" : "var(--ink)" }}>
                    <span style={{ color: "var(--gold)" }}>✦</span>{it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="reveal mx-auto mt-8 max-w-2xl rounded-2xl px-6 py-4 text-center" style={{ background: "rgba(189,116,118,0.12)", border: "1px solid rgba(189,116,118,0.3)", fontFamily: FONT_LUXE, fontSize: "0.74rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink)" }}>
          ♥ Founding clients who sign today get a free website
        </p>
        <div className="mt-9 text-center"><Cta /></div>
      </section>

      {/* ── WHY DOLLHOUSE + PROMISE ──────────────────────── */}
      <section className="px-6 py-24 text-center" style={{ background: "var(--cream)" }}>
        <div className="mx-auto max-w-3xl">
          <Eyebrow color="var(--rose)">Why The Dollhouse</Eyebrow>
          <h2 className="reveal mt-3" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, fontSize: "clamp(2rem, 4.5vw, 3.2rem)", lineHeight: 1.05 }}>Our promise to you</h2>
          <p className="reveal mx-auto mt-6 max-w-2xl" style={{ fontFamily: FONT_BODY, fontSize: "1.05rem", lineHeight: 1.75, color: "rgba(30,15,10,0.66)" }}>
            We're an AI-first studio built to do one thing beautifully: fill your calendar with qualified patients. As a founding client, you get our full attention, a founding-client rate, and a simple commitment — <strong>we don't stop until your calendar is filling.</strong> You own everything we build, every step of the way.
          </p>
          <div className="mt-9"><Cta /></div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="px-6 py-24" style={{ background: "var(--blush)" }}>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="reveal mt-3" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, fontSize: "clamp(2rem, 4.5vw, 3.2rem)", lineHeight: 1.05 }}>What clinic owners ask first</h2>
          </div>
          <div className="mt-10 space-y-3">
            {FAQ.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="overflow-hidden rounded-2xl" style={{ background: "#fff", border: "1px solid rgba(200,164,100,0.25)" }}>
                  <button type="button" onClick={() => setOpenFaq(open ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                    <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 500, fontSize: "1.2rem", color: "var(--ink)" }}>{f.q}</span>
                    <span style={{ color: "var(--rose)", fontSize: "1.2rem", transform: open ? "rotate(45deg)" : "none", transition: "transform 0.3s" }}>+</span>
                  </button>
                  <div style={{ maxHeight: open ? 320 : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
                    <p className="px-6 pb-5" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem", lineHeight: 1.65, color: "rgba(30,15,10,0.62)" }}>{f.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="relative px-6 py-28 text-center" style={{ background: "radial-gradient(120% 90% at 50% 120%, #2a1a10 0%, #1a0e0c 60%)" }}>
        <div aria-hidden className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2" style={{ width: 560, height: 420, background: "radial-gradient(circle, rgba(189,116,118,0.45) 0%, rgba(189,116,118,0) 70%)", filter: "blur(36px)" }} />
        <div className="relative mx-auto max-w-2xl">
          <p className="reveal gold-grad" style={{ fontFamily: FONT_SCRIPT, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 0.9 }}>let's fill your calendar</p>
          <h2 className="reveal text-shimmer mt-1" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, fontSize: "clamp(2.4rem, 5.5vw, 4rem)", lineHeight: 1 }}>
            A conversation worth your time
          </h2>
          <p className="reveal mx-auto mt-6 max-w-xl" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.7, color: "rgba(250,243,234,0.7)" }}>
            A 30-minute working session — not a sales call. We'll map exactly how to fill your calendar, and you'll leave with a plan whether or not we work together.
          </p>
          <div className="reveal mt-9"><Cta /></div>
          <p className="reveal mt-4" style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(250,243,234,0.5)" }}>Live availability this week · No card · No commitment</p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="px-6 py-12 text-center" style={{ background: "#140a07" }}>
        <p className="gold-grad" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem" }}>The Dollhouse Brand Studio</p>
        <p className="mt-2" style={{ fontFamily: FONT_LUXE, fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(250,243,234,0.5)" }}>Patient acquisition for Canadian clinics</p>
        <p className="mx-auto mt-6 max-w-xl" style={{ fontFamily: FONT_BODY, fontSize: "0.7rem", lineHeight: 1.6, color: "rgba(250,243,234,0.35)" }}>
          Results vary by clinic, market, and effort; nothing here is a guarantee of specific outcomes. Marketing services only — we do not provide medical advice or make treatment claims. Canadian privacy compliant (PIPEDA).
        </p>
      </footer>
    </main>
  );
}
