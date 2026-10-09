import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { usePageMeta } from "@/lib/use-page-meta";
import { SiteFooter } from "@/components/SiteFooter";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import {
  LaunchNav,
  LaunchHero,
  LaunchHowItWorks,
  LaunchWhatsIncluded,
  LaunchExamples,
  LaunchPlans,
  LaunchAfterPurchase,
  LaunchFounder,
  LaunchFaq,
  LaunchFinalCta,
  LaunchStickyBar,
} from "@/components/LaunchSections";

export const Route = createFileRoute("/")({ component: Index });

/* ─── Shared bits used by the contact form ────────────── */
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p
    className="gold-grad text-[11px] tracking-luxe uppercase font-semibold"
    style={{ fontFamily: "'Jost', sans-serif" }}
  >
    {children}
  </p>
);

const Divider = () => (
  <div className="flex items-center justify-center gap-2 text-[var(--gold)] my-4">
    <span className="h-px w-16 bg-current opacity-50" />
    <svg viewBox="0 0 12 10" className="w-2.5 h-2.5 fill-current">
      <path d="M6 9 L0.5 3.5 a2.2 2.2 0 0 1 3.1 -3.1 L6 2.8 l2.4 -2.4 a2.2 2.2 0 0 1 3.1 3.1 Z" />
    </svg>
    <span className="h-px w-16 bg-current opacity-50" />
  </div>
);

/* ─── FormSelect ───────────────────────────────────────── */
function FormSelect({
  value, onChange, options,
}: { value: string; onChange: (v: string) => void; options: string[] }) {
  const [open, setOpen] = useState(false);
  const ROSE = "#bd7476";
  const ic = "w-full rounded-xl bg-white/72 border px-5 py-3.5 text-[var(--ink)] focus:outline-none transition";
  return (
    <div className="relative">
      {/* Invisible overlay to close on outside click */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`${ic} flex items-center justify-between gap-2`}
        style={{
          borderColor: open ? ROSE : "rgba(200,168,100,0.3)",
          boxShadow: open ? `0 0 0 2px rgba(189,116,118,0.18)` : "none",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1rem",
        }}
      >
        <span style={{ color: ROSE }}>{value}</span>
        <svg
          viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"
          style={{ width: "13px", height: "13px", color: ROSE, flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
        >
          <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div
          className="absolute z-50 w-full mt-1 rounded-xl overflow-hidden"
          style={{
            background: "rgba(255,252,249,0.98)",
            border: `1px solid rgba(189,116,118,0.35)`,
            boxShadow: "0 16px 40px -16px rgba(120,60,55,0.35)",
            backdropFilter: "blur(12px)",
          }}
        >
          {options.map((opt) => {
            const selected = opt === value;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => { onChange(opt); setOpen(false); }}
                className="w-full px-5 py-3 text-left transition-colors"
                style={{
                  background: selected ? ROSE : "transparent",
                  color: selected ? "#fff" : "var(--ink)",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1rem",
                  borderBottom: "1px solid rgba(200,168,100,0.12)",
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Contact ─────────────────────────────────────────── */
function RadioGroup({ value, onSelect, options }: { value: string; onSelect: (v: string) => void; options: string[] }) {
  return (
    <div className="grid gap-2">
      {options.map(opt => {
        const selected = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            className="flex items-center gap-2.5 rounded-2xl px-4 py-3 text-left transition-all hover:-translate-y-0.5"
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.84rem", lineHeight: 1.3,
              background: selected ? "#bd7476" : "rgba(255,255,255,0.62)",
              color: selected ? "#fff" : "var(--ink)",
              border: selected ? "1px solid #bd7476" : "1px solid rgba(200,168,100,0.26)",
              boxShadow: selected ? "0 4px 14px -6px rgba(189,116,118,0.45)" : "0 8px 20px -18px rgba(90,45,35,0.5)",
            }}
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: selected ? "rgba(255,255,255,0.7)" : "var(--rose)" }} aria-hidden />
            <span className="flex-1">{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

function Contact() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [step, setStep] = useState(0);

  // Load the GoHighLevel booking-widget script once (auto-resizes the embedded calendar).
  useEffect(() => {
    const SRC = "https://link.msgsndr.com/js/form_embed.js";
    if (document.querySelector(`script[src="${SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = SRC; s.async = true;
    document.body.appendChild(s);
  }, []);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const TOTAL_STEPS = 6;

  const [fd, setFd] = useState({
    full_name: "", business_name: "", website: "", email: "",
    business_type: "", decision_maker: "", revenue: "", budget: "", timeline: "",
    goal: "", challenge: "",
    marketing_now: [] as string[],
    lead_source: "", capacity: "", win_90: "", anything_else: "",
  });

  const set =
    (k: "full_name" | "business_name" | "website" | "email" | "challenge" | "lead_source" | "win_90" | "anything_else") =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setFd(prev => ({ ...prev, [k]: e.target.value }));

  const toggleMarketing = (opt: string) =>
    setFd(prev => ({
      ...prev,
      marketing_now: prev.marketing_now.includes(opt)
        ? prev.marketing_now.filter(x => x !== opt)
        : [...prev.marketing_now, opt],
    }));

  const redirect =
    fd.business_type === "Med spa or aesthetic clinic"
      ? { url: "https://dollhousebrandstudio.com/apply", label: "Continue to the med spa application", msg: "We run a dedicated done-for-you program just for med spas and clinics. You'll get the right application and offer over there." }
      : fd.decision_maker === "No, I am researching for someone else"
      ? { url: "https://room.shopdollhouse.co", label: "Explore the Brand Room", msg: "Since you're researching for someone else, the Brand Room and our digital products are the best place to start." }
      : null;

  function handleSubmit() {
    setStatus("sending");
    const fitTag = fd.revenue === "Under $10,000" ? "Yellow" : fd.timeline === "Just exploring for now" ? "Nurture" : "Green";
    const payload = {
      fullName: fd.full_name,
      businessName: fd.business_name, website: fd.website,
      email: fd.email,
      businessType: fd.business_type, decisionMaker: fd.decision_maker,
      monthlyRevenue: fd.revenue, marketingBudget: fd.budget, timeline: fd.timeline,
      mainGoal: fd.goal, biggestChallenge: fd.challenge,
      currentMarketing: fd.marketing_now.join(", "), leadSource: fd.lead_source,
      capacity: fd.capacity, win90Days: fd.win_90, anythingElse: fd.anything_else,
      fitTag,
      source: "Proposal Form",
    };
    fetch("https://services.leadconnectorhq.com/hooks/ElOoFIfV3BYE54LNg3Yw/webhook-trigger/00b38935-1381-43b0-99c7-c0c33be9f456", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
    }).catch((err) => console.warn("Proposal webhook failed:", err));
    fetch("https://formspree.io/f/mwvrvrzj", {
      method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(payload),
    }).catch(() => {});
    setStatus("done");
  }

  const ic = "w-full rounded-xl bg-white/72 border border-[var(--gold)]/30 px-5 py-3.5 text-[var(--ink)] placeholder:text-[var(--ink)]/35 focus:outline-none focus:border-[var(--rose)] focus:bg-white/90 transition";
  const is = { fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" } as React.CSSProperties;
  const lc = "block text-[0.95rem] text-[var(--ink)] mb-2.5";
  const ls = { fontFamily: "'DM Sans', sans-serif", fontWeight: 600 } as React.CSSProperties;

  const stepTitles = ["Your details", "Your business", "Your numbers", "Your goals", "Your marketing", "Almost done"];
  const stepHeadings = ["Let's start with you", "Tell us about your business", "Where you're at right now", "What you're looking for", "Your marketing today", "Almost done"];

  return (
    <section id="contact" className="scroll-mt-32 py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.88fr_1.12fr] gap-8 lg:gap-12 items-stretch">
        {/* ── LEFT COLUMN (unchanged) ── */}
        <div className="lg:sticky lg:top-36">
          <Eyebrow>Questions first? Talk to us</Eyebrow>
          <h2
            className="mt-4 text-[var(--rose)] leading-[0.98]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 6vw, 5.8rem)", fontWeight: 400 }}
          >
            Not ready to order? Talk to Mandy.
          </h2>
          <p className="mt-6 max-w-lg text-[var(--ink)]/62 leading-8" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}>
            Have a question, want something custom, or just want to talk it through first? Tell us about your business or book a free call. You can also order any time from the plans above.
          </p>
          <div className="mt-8 grid gap-3">
            {[
              ["1", "We look at your business, your services and how customers find you today."],
              ["2", "You get an honest recommendation on whether this system is the right fit, and which plan."],
              ["3", "If it is a fit, we map out your setup and launch timeline together."],
            ].map(([n, copy]) => (
              <div key={n} className="flex gap-4 rounded-2xl px-5 py-4" style={{ background: "rgba(255,250,246,0.62)", border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)" }}>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(200,168,100,0.14)", color: "var(--gold)", fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", letterSpacing: "0.12em" }}>{n}</span>
                <p className="m-0 text-sm leading-6 text-[var(--ink)]/64" style={{ fontFamily: "'DM Sans', sans-serif" }}>{copy}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="flex flex-col gap-4 items-stretch h-full">
        <div className="flex-1 rounded-[28px] bg-white/76 backdrop-blur-md border border-white/85 shadow-[0_30px_70px_-35px_rgba(120,70,60,0.42)] p-6 md:p-9 flex flex-col">

          {/* ── CALENDAR VIEW ── */}
          {showCalendar ? (
            <div className="space-y-5">
              <button
                type="button"
                onClick={() => setShowCalendar(false)}
                className="flex items-center gap-2 text-[11px] tracking-luxe uppercase transition-colors hover:text-[var(--rose)]"
                style={{ fontFamily: "'Jost', sans-serif", color: "var(--ink)" }}
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: "13px", height: "13px" }}><path d="M10 3 5 8l5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Back to the Proposal
              </button>
              <div>
                <p className="text-[10px] tracking-luxe uppercase font-semibold" style={{ fontFamily: "'Jost', sans-serif", color: "#bd7476" }}>Book a free discovery call</p>
                <h3 className="mt-2 italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.45rem)", lineHeight: 1.05, color: "var(--ink)" }}>Pick a time that works for you.</h3>
                <p className="mt-2 text-[var(--ink)]/58 leading-6" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem" }}>45 minutes with Mandy. No pitch, no pressure, just clarity on what's possible for your business.</p>
              </div>
              <div className="overflow-hidden rounded-2xl p-1.5" style={{ background: "#FCF4EE", border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)" }}>
                <iframe
                  src="https://api.leadconnectorhq.com/widget/booking/9mOtVmE8ihxgAX2AMzge"
                  title="Book a free discovery call"
                  scrolling="yes"
                  id="9mOtVmE8ihxgAX2AMzge_1718000000000"
                  style={{ width: "100%", border: "none", minHeight: "1050px", display: "block", borderRadius: "12px" }}
                />
              </div>
            </div>

          ) : status === "done" ? (
            /* ── THANK YOU ── */
            <div className="flex flex-col items-center justify-center gap-5 py-12 text-center">
              <span style={{ fontSize: "2rem" }}>✦</span>
              <h3 className="italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", lineHeight: 1.1, color: "var(--rose)" }}>You're in.</h3>
              <p className="max-w-sm text-[var(--ink)]/62 leading-7" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Expect a private reply within 24 hours.
              </p>
            </div>

          ) : step === 0 ? (
            /* ── PATH SELECTOR ── */
            <div className="flex flex-col flex-1 space-y-5">
              {/* Intro */}
              <div className="pb-5 border-b border-[var(--gold)]/18">
                <p className="text-[10px] tracking-luxe uppercase font-semibold" style={{ fontFamily: "'Jost', sans-serif", color: "#bd7476" }}>
                  Ready to work together?
                </p>
                <h3
                  className="mt-3 italic text-[var(--ink)] leading-[1.05]"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}
                >
                  Let's build something that actually works.
                </h3>
                <p className="mt-2.5 text-[var(--ink)]/55 leading-6" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem" }}>
                  Choose how you'd like to connect and we'll take it from there.
                </p>
              </div>

              {/* Cards */}
              <div className="grid sm:grid-cols-2 gap-4 items-stretch flex-1">
                {/* Option A — Proposal Form */}
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="group text-left rounded-[20px] p-6 flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(145deg, rgba(189,116,118,0.08) 0%, rgba(255,248,246,0.92) 100%)",
                    border: "1.5px solid rgba(189,116,118,0.28)",
                    boxShadow: "0 10px 32px -16px rgba(189,116,118,0.25)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#bd7476";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 22px 48px -18px rgba(189,116,118,0.45)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(189,116,118,0.28)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 32px -16px rgba(189,116,118,0.25)";
                  }}
                >
                  <div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full mb-4" style={{ background: "rgba(189,116,118,0.14)" }}>
                      <svg viewBox="0 0 18 18" fill="none" stroke="#bd7476" strokeWidth="1.5" style={{ width: "17px", height: "17px" }}><path d="M3 5h12M3 9h8M3 13h6" strokeLinecap="round" /></svg>
                    </span>
                    <p className="text-[10px] tracking-luxe uppercase mb-2" style={{ fontFamily: "'Jost', sans-serif", color: "#bd7476", fontWeight: 600 }}>Proposal Request</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.35rem, 2.2vw, 1.65rem)", color: "var(--ink)", lineHeight: 1.15, fontWeight: 400 }}>
                      Tell us about your business
                    </p>
                    <p className="mt-3 text-[var(--ink)]/55 leading-[1.65]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem" }}>
                      Answer a few questions and receive a private plan recommendation, pricing, and setup timeline within 24 hours.
                    </p>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[10px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif", color: "#bd7476" }}>Get started</span>
                    <span style={{ color: "#bd7476", fontSize: "1.1rem", lineHeight: 1 }}>→</span>
                  </div>
                </button>

                {/* Option B — Discovery Call */}
                <button
                  type="button"
                  onClick={() => setShowCalendar(true)}
                  className="group text-left rounded-[20px] p-6 flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(145deg, rgba(200,168,100,0.09) 0%, rgba(255,252,244,0.92) 100%)",
                    border: "1.5px solid rgba(200,168,100,0.3)",
                    boxShadow: "0 10px 32px -16px rgba(160,120,60,0.2)",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#bd7476";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 22px 48px -18px rgba(189,116,118,0.38)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(200,168,100,0.3)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 32px -16px rgba(160,120,60,0.2)";
                  }}
                >
                  <div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full mb-4" style={{ background: "rgba(200,168,100,0.14)" }}>
                      <svg viewBox="0 0 18 18" fill="none" stroke="var(--gold)" strokeWidth="1.5" style={{ width: "17px", height: "17px" }}><rect x="2" y="3" width="14" height="12" rx="2" /><path d="M6 1.5v3M12 1.5v3M2 8h14" strokeLinecap="round" /></svg>
                    </span>
                    <p className="text-[10px] tracking-luxe uppercase mb-2" style={{ fontFamily: "'Jost', sans-serif", color: "var(--gold)", fontWeight: 600 }}>Discovery Call</p>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.35rem, 2.2vw, 1.65rem)", color: "var(--ink)", lineHeight: 1.15, fontWeight: 400 }}>
                      Book a Free Discovery Call
                    </p>
                    <p className="mt-3 text-[var(--ink)]/55 leading-[1.65]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem" }}>
                      Skip the form and jump straight into a free 45-minute call with Mandy. No pressure, just clarity.
                    </p>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[10px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif", color: "var(--gold)" }}>Book now</span>
                    <span style={{ color: "#bd7476", fontSize: "1.1rem", lineHeight: 1 }}>→</span>
                  </div>
                </button>
              </div>
            </div>

          ) : (
            /* ── MULTI-STEP FORM ── */
            <div className="space-y-6">
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex gap-1.5">
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <div
                      key={i}
                      className="h-1.5 flex-1 rounded-full transition-all duration-300"
                      style={{ background: i < step ? "#bd7476" : "rgba(200,168,100,0.2)" }}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[0.82rem] tracking-[0.08em] uppercase font-semibold text-[var(--ink)]" style={{ fontFamily: "'Jost', sans-serif" }}>
                    Step {step} of {TOTAL_STEPS}: {stepTitles[step - 1]}
                  </p>
                  <p className="text-[0.82rem] font-semibold" style={{ fontFamily: "'Jost', sans-serif", color: "#bd7476" }}>
                    {Math.round((step / TOTAL_STEPS) * 100)}%
                  </p>
                </div>
              </div>

              {/* Step heading */}
              <div className="border-b border-[var(--gold)]/18 pb-5">
                <h3 className="italic text-[var(--ink)]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.45rem)", lineHeight: 1.05 }}>
                  {stepHeadings[step - 1]}
                </h3>
              </div>

              {/* ── STEP 1 — Your details ── */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className={lc} style={ls}>Your full name *</label>
                    <input type="text" value={fd.full_name} onChange={set("full_name")} placeholder="Jane Doe" required className={ic} style={is} />
                  </div>
                  <div>
                    <label className={lc} style={ls}>Business name *</label>
                    <input type="text" value={fd.business_name} onChange={set("business_name")} placeholder="Your Business" required className={ic} style={is} />
                  </div>
                  <div>
                    <label className={lc} style={ls}>Website or Instagram link *</label>
                    <input type="text" value={fd.website} onChange={set("website")} placeholder="yourbusiness.com or @yourbusiness" required className={ic} style={is} />
                  </div>
                  <div>
                    <label className={lc} style={ls}>Best email *</label>
                    <input type="email" value={fd.email} onChange={set("email")} placeholder="you@business.com" required className={ic} style={is} />
                  </div>
                </div>
              )}

              {/* ── STEP 2 — Your business ── */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className={lc} style={ls}>What type of business do you run? *</label>
                    <RadioGroup
                      value={fd.business_type}
                      onSelect={v => setFd(prev => ({ ...prev, business_type: v }))}
                      options={["Home service or contractor (roofing, HVAC, renovations, etc.)", "Real estate broker or agent", "Other service business", "Product or e-commerce business", "Just starting, no business yet", "Med spa or aesthetic clinic"]}
                    />
                  </div>
                  <div>
                    <label className={lc} style={ls}>Are you the owner or decision-maker? *</label>
                    <RadioGroup
                      value={fd.decision_maker}
                      onSelect={v => setFd(prev => ({ ...prev, decision_maker: v }))}
                      options={["Yes, it is my business", "I am part of the decision (co-owner or manager)", "No, I am researching for someone else"]}
                    />
                  </div>
                </div>
              )}

              {/* ── STEP 3 — Your numbers ── */}
              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <label className={lc} style={ls}>Current monthly revenue (roughly)? *</label>
                    <RadioGroup
                      value={fd.revenue}
                      onSelect={v => setFd(prev => ({ ...prev, revenue: v }))}
                      options={["Under $10,000", "$10,000 to $30,000", "$30,000 to $75,000", "$75,000 or more"]}
                    />
                  </div>
                  <div>
                    <label className={lc} style={ls}>What can you comfortably invest in marketing each month? *</label>
                    <RadioGroup
                      value={fd.budget}
                      onSelect={v => setFd(prev => ({ ...prev, budget: v }))}
                      options={["Under $300", "$300 to $1,000", "$1,000 to $2,500", "$2,500 or more", "Not sure yet"]}
                    />
                  </div>
                  <div>
                    <label className={lc} style={ls}>How soon are you looking to get started? *</label>
                    <RadioGroup
                      value={fd.timeline}
                      onSelect={v => setFd(prev => ({ ...prev, timeline: v }))}
                      options={["Right away or this month", "In the next 1 to 3 months", "Just exploring for now"]}
                    />
                  </div>
                </div>
              )}

              {/* ── STEP 4 — Your goals ── */}
              {step === 4 && (
                <div className="space-y-5">
                  <div>
                    <label className={lc} style={ls}>What is your number one goal right now? *</label>
                    <RadioGroup
                      value={fd.goal}
                      onSelect={v => setFd(prev => ({ ...prev, goal: v }))}
                      options={["More booked appointments and new clients", "A website and lead system that converts", "Stop missing calls and leads", "Build my brand and content", "Scale past my current ceiling"]}
                    />
                  </div>
                  <div>
                    <label className={lc} style={ls}>What is your biggest marketing challenge right now? *</label>
                    <textarea value={fd.challenge} onChange={set("challenge")} rows={4} placeholder="Be as specific as you can. This helps us prepare for your call." className={`${ic} resize-none`} style={is} />
                  </div>
                </div>
              )}

              {/* ── STEP 5 — Your marketing ── */}
              {step === 5 && (
                <div className="space-y-5">
                  <div>
                    <label className={lc} style={ls}>What are you currently doing for marketing? (select all) *</label>
                    <div className="grid gap-2">
                      {["Nothing or word of mouth only", "Posting on social media myself", "Running paid ads (Meta or Google)", "I have an agency or freelancer", "Other"].map(opt => {
                        const selected = fd.marketing_now.includes(opt);
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => toggleMarketing(opt)}
                            className="flex items-center gap-2.5 rounded-2xl px-4 py-3 text-left transition-all hover:-translate-y-0.5"
                            style={{
                              fontFamily: "'DM Sans', sans-serif", fontSize: "0.84rem", lineHeight: 1.3,
                              background: selected ? "#bd7476" : "rgba(255,255,255,0.62)",
                              color: selected ? "#fff" : "var(--ink)",
                              border: selected ? "1px solid #bd7476" : "1px solid rgba(200,168,100,0.26)",
                              boxShadow: selected ? "0 4px 14px -6px rgba(189,116,118,0.45)" : "0 8px 20px -18px rgba(90,45,35,0.5)",
                            }}
                          >
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded text-[10px]" style={{ border: selected ? "1px solid #fff" : "1px solid rgba(189,116,118,0.5)", background: selected ? "rgba(255,255,255,0.2)" : "transparent", color: "#fff" }} aria-hidden>{selected ? "✓" : ""}</span>
                            <span className="flex-1">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className={lc} style={ls}>How do most new clients find you now, and roughly how many per month? *</label>
                    <input type="text" value={fd.lead_source} onChange={set("lead_source")} placeholder="e.g. Google, referrals, Instagram (about 5 per month)" className={ic} style={is} />
                  </div>
                  <div>
                    <label className={lc} style={ls}>Could you handle more clients right now if they came in? *</label>
                    <RadioGroup
                      value={fd.capacity}
                      onSelect={v => setFd(prev => ({ ...prev, capacity: v }))}
                      options={["Yes, I have capacity", "Yes but I would need to hire", "I am near full"]}
                    />
                  </div>
                </div>
              )}

              {/* ── STEP 6 — Almost done ── */}
              {step === 6 && (
                <div className="space-y-5">
                  <div>
                    <label className={lc} style={ls}>What would make this a clear win in the next 90 days? *</label>
                    <input type="text" value={fd.win_90} onChange={set("win_90")} placeholder="e.g. 10 new clients, consistent content, a website that books" className={ic} style={is} />
                  </div>
                  <div>
                    <label className={lc} style={ls}>Anything else I should know before we talk? <span className="normal-case opacity-60">(optional)</span></label>
                    <textarea value={fd.anything_else} onChange={set("anything_else")} rows={3} placeholder="Totally optional, but anything you share helps." className={`${ic} resize-none`} style={is} />
                  </div>
                </div>
              )}

              {/* Non-fit redirect banner */}
              {redirect && (
                <div className="rounded-2xl px-5 py-4" style={{ background: "rgba(189,116,118,0.08)", border: "1px solid rgba(189,116,118,0.35)" }}>
                  <p className="m-0 text-[var(--ink)]/70 leading-6" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem" }}>{redirect.msg}</p>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="space-y-3 pt-0">
                {redirect ? (
                  <a
                    href={redirect.url}
                    className="w-full flex items-center justify-center rounded-2xl py-4 text-[11px] tracking-luxe uppercase hover:-translate-y-0.5 hover:opacity-90 transition no-underline"
                    style={{ fontFamily: "'Jost', sans-serif", background: "#bd7476", color: "#fff", boxShadow: "0 18px 36px -22px rgba(189,116,118,0.55)" }}
                  >
                    {redirect.label} →
                  </a>
                ) : step < TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={() => setStep(s => s + 1)}
                    className="w-full rounded-2xl py-4 text-[11px] tracking-luxe uppercase hover:-translate-y-0.5 hover:opacity-90 transition"
                    style={{ fontFamily: "'Jost', sans-serif", background: "#bd7476", color: "#fff", boxShadow: "0 18px 36px -22px rgba(189,116,118,0.55)" }}
                  >
                    Next →
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={status === "sending"}
                      className="w-full rounded-2xl py-4 text-[11px] tracking-luxe uppercase hover:-translate-y-0.5 hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ fontFamily: "'Jost', sans-serif", background: "#bd7476", color: "#fff", boxShadow: "0 18px 36px -22px rgba(189,116,118,0.55)" }}
                    >
                      {status === "sending" ? "Sending..." : "Send My Application →"}
                    </button>
                  </>
                )}
                {step >= 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(s => s - 1)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-[11px] tracking-luxe uppercase transition-opacity hover:opacity-80"
                    style={{ fontFamily: "'Jost', sans-serif", color: "#bd7476", border: "1px solid rgba(189,116,118,0.35)" }}
                  >
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ width: "12px", height: "12px" }}><path d="M10 3 5 8l5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Back
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        {/* Decorative closer */}
        <p className="text-center" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(189,116,118,0.55)", lineHeight: 1.8 }}>
          ✦ Private reply within 24 hours · No commitment required · Built for your business specifically
        </p>
        </div>
      </div>
    </section>
  );
}


/* ─── Back to top ─────────────────────────────────────── */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-40 right-5 md:bottom-8 md:right-8 z-40 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500"
      style={{
        background: "var(--ink)",
        boxShadow: "0 8px 24px -8px rgba(30,15,10,0.5)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="var(--gold)" strokeWidth="1.5" className="w-4 h-4">
        <path d="M3 10.5L8 5.5L13 10.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function Index() {
  usePageMeta(
    "Done-For-You Social Media for Local Businesses from $297/mo | The Dollhouse Brand Studio",
    "We create your social media posts, collect new inquiries with a quote calculator or quiz, reply automatically, and book appointments. For local business owners. $297/month, no contract, 14-day money-back guarantee.",
  );

  // Scroll-reveal: sections gently rise + fade in as they enter the viewport.
  useScrollReveal();

  return (
    <main className="bg-[var(--blush)] text-[var(--ink)]">
      <LaunchNav />
      <LaunchHero />
      <LaunchHowItWorks />
      <LaunchWhatsIncluded />
      <LaunchExamples />
      <LaunchPlans />
      <LaunchAfterPurchase />
      <LaunchFounder />
      <LaunchFaq />
      <Contact />
      <LaunchFinalCta />
      <SiteFooter />
      <BackToTop />
      <LaunchStickyBar />
    </main>
  );
}
