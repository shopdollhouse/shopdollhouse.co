import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, ImageIcon, Images, Lock, ShieldCheck, Sparkles, Star } from "lucide-react";
import archMark from "@/assets/arch-mark.svg";
import bgImage from "@/assets/password-bg.jpg";
import { usePageMeta } from "@/lib/use-page-meta";
import {
  CHECKOUT_BASE_URL,
  checkoutHref,
  GUARANTEE_DAYS,
  LAUNCH_PLANS,
  ORDER_LINKS,
  SUPPORT_EMAIL,
  type LaunchPlanId,
} from "@/lib/launch-offer";

const DISPLAY = "'Cormorant Garamond', serif";
const BODY = "'DM Sans', sans-serif";
const LUXE = "'Jost', sans-serif";

export const Route = createFileRoute("/get-started")({
  validateSearch: (search: Record<string, unknown>): { plan: LaunchPlanId } => ({
    plan: search.plan === "carousel" ? "carousel" : "single",
  }),
  component: GetStartedPage,
});

const PLAN_COPY: Record<LaunchPlanId, { short: string; name: string; blurb: string; points: string[] }> = {
  single: {
    short: "Single images",
    name: "Single Image Plan",
    blurb: "One clear message in every post, so your business stays visible.",
    points: ["30 single-image posts every month", "Captions written for your business", "Instagram and Facebook publishing after approval"],
  },
  carousel: {
    short: "Carousel Slide Posts",
    name: "Carousel + Single Image Plan",
    blurb: "More room for stories and step-by-step explanations.",
    points: ["15 carousel slide posts + 15 single-image posts every month", "Captions written for your business", "Instagram and Facebook publishing after approval"],
  },
};

const TILES = [
  "30 posts a month for Instagram and Facebook",
  "Website quote calculator or quiz",
  "Automatic replies and follow-up",
  "Online appointment booking",
];

function Stepper() {
  const steps: [string, "done" | "active" | "todo"][] = [["Your details", "done"], ["Secure payment", "active"], ["Onboarding", "todo"]];
  return (
    <ol className="mx-auto flex max-w-xl items-center justify-center gap-2 sm:gap-4" aria-label="Checkout progress">
      {steps.map(([label, state], i) => (
        <li key={label} className="flex items-center gap-2 sm:gap-4">
          <span className="flex items-center gap-2.5">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold"
              style={{
                fontFamily: LUXE,
                background: state === "todo" ? "transparent" : "var(--gold)",
                color: state === "todo" ? "rgba(31,17,11,0.5)" : "var(--ink)",
                border: state === "todo" ? "1.5px solid rgba(31,17,11,0.25)" : "none",
              }}
            >
              {state === "done" ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
            </span>
            <span className="hidden text-[12px] sm:inline" style={{ fontFamily: LUXE, fontWeight: state === "active" ? 600 : 400, color: state === "todo" ? "rgba(31,17,11,0.5)" : "var(--ink)" }}>{label}</span>
          </span>
          {i < steps.length - 1 && <span className="h-px w-6 sm:w-16" style={{ background: "rgba(198,178,130,0.45)" }} />}
        </li>
      ))}
    </ol>
  );
}

function GetStartedPage() {
  usePageMeta(
    "Complete Your Order | Dollhouse Launch",
    "Complete your Dollhouse Launch order. Done-for-you social media and lead generation, no contract, 14-day money-back guarantee.",
  );

  const { plan } = Route.useSearch();
  const navigate = Route.useNavigate();
  const selected = LAUNCH_PLANS.find((p) => p.id === plan) ?? LAUNCH_PLANS[0];
  const copy = PLAN_COPY[selected.id];
  const link = ORDER_LINKS[selected.id];

  // Old links and bookmarks: forward to the hosted checkout when one is connected.
  useEffect(() => {
    if (CHECKOUT_BASE_URL) window.location.replace(checkoutHref(selected.id));
  }, [selected.id]);

  // Details from the sign-up step (kept for this visit only, never put in the URL).
  const [lead, setLead] = useState<{ firstName: string; lastName: string; email: string } | null>(null);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("launch-lead");
      if (raw) setLead(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  // Checkout pages should not show up in search results.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    window.scrollTo(0, 0);
    return () => meta.remove();
  }, []);

  return (
    <main className="lux min-h-screen px-4 pb-10 pt-8 sm:px-6" style={{ backgroundColor: "#f7e4df", backgroundImage: `linear-gradient(rgba(247,228,223,0.55), rgba(247,228,223,0.55)), radial-gradient(ellipse at center, rgba(247,228,223,0) 0%, rgba(230,200,195,0.45) 75%, rgba(210,175,168,0.7) 100%), url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", color: "var(--ink)" }}>
      <header className="mx-auto flex max-w-6xl items-center justify-between pb-8">
        <a href="/" className="flex items-center gap-2.5 no-underline" aria-label="Dollhouse Launch home">
          <img src={archMark} alt="" className="h-9 w-auto"  />
          <span className="flex flex-col items-start leading-none">
            <span style={{ fontFamily: "'Allura', cursive", color: "var(--gold)", fontSize: "18px", textTransform: "lowercase", lineHeight: 1 }}>the</span>
            <span style={{ fontFamily: DISPLAY, color: "var(--rose)", fontSize: "17px", fontWeight: 500, letterSpacing: "5px", textTransform: "uppercase", lineHeight: 1, marginTop: "-1px" }}>Dollhouse</span>
            <span className="font-semibold" style={{ fontFamily: LUXE, color: "var(--gold)", fontSize: "6.5px", letterSpacing: "6px", textTransform: "uppercase", marginTop: "2px" }}>Launch</span>
          </span>
        </a>
        <span className="inline-flex items-center gap-2 text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE, color: "rgba(31,17,11,0.6)" }}>
          <Lock className="h-3.5 w-3.5 text-[var(--gold)]" /> Secure checkout
        </span>
      </header>

      <Stepper />

      <div className="mx-auto mt-8 grid max-w-6xl overflow-hidden rounded-[32px] lg:grid-cols-2" style={{ border: "1px solid rgba(198,178,130,0.3)", boxShadow: "0 60px 120px -50px rgba(0,0,0,0.8)" }}>
        {/* Left: the offer */}
        <section className="p-8 sm:p-12" style={{ background: "rgba(255,250,246,0.6)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE, fontWeight: 600, color: "var(--gold-deep)", border: "1px solid rgba(168,134,74,0.5)", background: "rgba(255,255,255,0.55)" }}>
            <Sparkles className="h-3.5 w-3.5" /> Everything your business needs
          </span>
          <h1 className="mt-7" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: "clamp(2.2rem, 4.6vw, 3.3rem)", lineHeight: 1.04, color: "var(--ink)" }}>
            <span className="italic" style={{ color: "var(--gold-deep)" }}>turn your social media into</span>
            <br />
            <span style={{ letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--rose)" }}>Booked appointments.</span>
          </h1>
          <p className="mt-6 max-w-md leading-8" style={{ fontFamily: BODY, color: "rgba(31,17,11,0.7)" }}>
            Choose the content format that fits your business. We handle the strategy, creative, publishing and follow-up, so you can stay focused on your customers.
          </p>

          <ul className="mt-9 grid gap-3 sm:grid-cols-2">
            {TILES.map((t) => (
              <li key={t} className="flex items-start gap-3 rounded-2xl px-4 py-4" style={{ background: "rgba(255,255,255,0.72)", border: "1px solid rgba(168,134,74,0.35)" }}>
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ border: "1.5px solid var(--gold)", color: "var(--gold)" }}><Check className="h-3 w-3" strokeWidth={3} /></span>
                <span className="leading-6" style={{ fontFamily: BODY, fontSize: "0.92rem", color: "rgba(31,17,11,0.85)" }}>{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-6 text-[12px]" style={{ borderColor: "rgba(198,178,130,0.22)", fontFamily: LUXE, color: "rgba(31,17,11,0.6)" }}>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[var(--gold)]" /> {GUARANTEE_DAYS}-day guarantee</span>
            <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[var(--gold)]" /> Private kickoff call</span>
            <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[var(--gold)]" /> Cancel anytime</span>
          </div>
        </section>

        {/* Right: order */}
        <section className="p-4 sm:p-8" style={{ background: "linear-gradient(160deg, #fff7f3 0%, #f7e3dd 100%)", color: "var(--ink)" }}>
          <div className="rounded-[26px] p-5 sm:p-8" style={{ background: "rgba(255,255,255,0.78)", boxShadow: "0 24px 60px -36px rgba(80,40,30,0.4)" }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE, fontWeight: 700, color: "var(--gold-deep)" }}>Step 2 of 2 · Secure payment</p>
                <h2 className="mt-2" style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(1.9rem, 3.6vw, 2.5rem)", lineHeight: 1.05 }}>Complete your order</h2>
                <p className="mt-2 leading-7" style={{ fontFamily: BODY, fontSize: "0.92rem", color: "rgba(31,17,11,0.62)" }}>Review your selected plan and enter your payment details below.</p>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: "var(--ink)", color: "var(--gold)" }}><Lock className="h-5 w-5" /></span>
            </div>

            {/* Plan choice */}
            <div className="mt-6 grid grid-cols-2 gap-3" role="radiogroup" aria-label="Choose your plan">
              {LAUNCH_PLANS.map((pl) => {
                const active = pl.id === selected.id;
                const c = PLAN_COPY[pl.id];
                const Icon = pl.id === "single" ? ImageIcon : Images;
                return (
                  <button
                    key={pl.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => navigate({ search: { plan: pl.id }, replace: true })}
                    className="relative rounded-2xl p-4 text-left transition-all"
                    style={{
                      background: active ? "var(--ink)" : "#fff",
                      border: active ? "1.5px solid var(--gold)" : "1.5px solid rgba(31,17,11,0.12)",
                      boxShadow: active ? "0 20px 40px -22px rgba(24,10,6,0.7)" : "none",
                    }}
                  >
                    {pl.id === "carousel" && (
                      <span className="absolute -top-2.5 right-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[8px] tracking-luxe uppercase" style={{ fontFamily: LUXE, fontWeight: 700, background: "var(--gold)", color: "var(--ink)" }}>
                        <Star className="h-2.5 w-2.5" fill="currentColor" /> Upgrade
                      </span>
                    )}
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: active ? "rgba(198,178,130,0.2)" : "rgba(31,17,11,0.06)", color: active ? "var(--gold)" : "var(--ink)" }}><Icon className="h-4 w-4" /></span>
                    <span className="mt-3 block" style={{ fontFamily: LUXE, fontSize: "0.82rem", fontWeight: 600, color: active ? "var(--cream)" : "var(--ink)" }}>{c.short}</span>
                    <span className="mt-1 flex items-end justify-between">
                      <span style={{ fontFamily: DISPLAY, fontSize: "1.9rem", lineHeight: 1, fontWeight: 600, color: active ? "var(--gold)" : "var(--rose)" }}>
                        ${pl.price}<span style={{ fontFamily: BODY, fontSize: "0.72rem", fontWeight: 400, opacity: 0.7 }}>/month</span>
                      </span>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ border: `1.5px solid ${active ? "var(--gold)" : "rgba(31,17,11,0.25)"}`, background: active ? "var(--gold)" : "transparent" }}>
                        {active && <Check className="h-3 w-3 text-[var(--ink)]" strokeWidth={3.5} />}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Plan summary */}
            <div className="mt-5 rounded-2xl p-5" style={{ background: "#fffaf6", border: "1px solid rgba(198,178,130,0.35)" }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p style={{ fontFamily: LUXE, fontWeight: 700, fontSize: "0.95rem" }}>{copy.name}</p>
                  <p className="mt-1 leading-6" style={{ fontFamily: BODY, fontSize: "0.82rem", color: "rgba(31,17,11,0.6)" }}>{copy.blurb}</p>
                </div>
                <p className="shrink-0 text-right" style={{ fontFamily: DISPLAY, fontSize: "1.9rem", lineHeight: 1, fontWeight: 600, color: "var(--rose)" }}>
                  ${selected.price}<span className="block" style={{ fontFamily: LUXE, fontSize: "0.58rem", letterSpacing: "0.14em", fontWeight: 400, color: "rgba(31,17,11,0.5)" }}>PER MONTH</span>
                </p>
              </div>
              <ul className="mt-4 grid gap-2">
                {copy.points.map((t) => (
                  <li key={t} className="flex items-start gap-2.5" style={{ fontFamily: BODY, fontSize: "0.86rem", color: "rgba(31,17,11,0.8)" }}>
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--gold-deep)" }} strokeWidth={2.5} /> {t}
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-full px-4 py-2.5 text-[0.82rem] font-semibold" style={{ fontFamily: BODY, background: "color-mix(in oklab, var(--gold) 30%, white)", color: "var(--ink)" }}>
                Bonus: your DOLLHOUSE account + private 1-on-1 kickoff call
              </p>
            </div>

            {/* Payment */}
            <div className="mt-5 overflow-hidden rounded-2xl" style={{ background: "#fff", border: "1px solid rgba(31,17,11,0.1)", boxShadow: "0 18px 40px -28px rgba(80,40,30,0.5)" }}>
              <div className="flex items-start justify-between gap-3 px-5 py-4" style={{ background: "#fffaf6", borderBottom: "1px solid rgba(31,17,11,0.08)" }}>
                <div>
                  <p className="text-[9px] tracking-luxe uppercase" style={{ fontFamily: LUXE, fontWeight: 700, color: "var(--gold-deep)" }}>Secure payment</p>
                  <p className="mt-1" style={{ fontFamily: LUXE, fontWeight: 600, fontSize: "0.95rem" }}>{copy.name} · ${selected.price}/month</p>
                  {lead && <p className="mt-0.5" style={{ fontFamily: BODY, fontSize: "0.8rem", color: "rgba(31,17,11,0.55)" }}>Paying as {lead.email}</p>}
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[8.5px] tracking-luxe uppercase" style={{ fontFamily: LUXE, fontWeight: 700, color: "var(--gold-deep)", border: "1px solid rgba(198,178,130,0.5)" }}>
                  <Lock className="h-3 w-3" /> Encrypted
                </span>
              </div>

              {link ? (
                <iframe key={selected.id} src={link} title={`Checkout for ${copy.name}`} allow="payment" className="block w-full border-0" style={{ height: "780px", background: "transparent" }} />
              ) : (
                <div className="px-6 py-10 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "color-mix(in oklab, var(--gold) 20%, transparent)", color: "var(--gold-deep)" }}><Lock className="h-5 w-5" strokeWidth={1.6} /></span>
                  <h3 className="mt-4 italic" style={{ fontFamily: DISPLAY, fontSize: "1.6rem", lineHeight: 1.1 }}>Secure checkout is being connected</h3>
                  <p className="mx-auto mt-2 max-w-xs leading-7" style={{ fontFamily: BODY, fontSize: "0.9rem", color: "rgba(31,17,11,0.62)" }}>
                    Email us your plan choice and we will send your secure payment link right away.
                  </p>
                  <a href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`Dollhouse Launch: ${copy.name} ($${selected.price}/mo)`)}`} className="btn-ink mt-6 justify-center">
                    Email to order
                  </a>
                </div>
              )}
            </div>

            {link && (
              <p className="mt-3 text-center" style={{ fontFamily: BODY, fontSize: "0.8rem", color: "rgba(31,17,11,0.5)" }}>
                Trouble loading? <a href={link} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4" style={{ color: "var(--rose)" }}>Open secure checkout in a new tab</a>
              </p>
            )}

            <p className="mt-5 text-center">
              <a href="/#plans" className="underline underline-offset-4" style={{ fontFamily: LUXE, fontSize: "0.85rem", fontWeight: 600 }}>Edit details or choose another plan</a>
            </p>
            <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[9.5px] tracking-[0.16em] uppercase" style={{ fontFamily: LUXE, color: "rgba(31,17,11,0.5)" }}>
              {["SSL secured", `${GUARANTEE_DAYS}-day refund`, "Cancel anytime"].map((t) => (
                <li key={t} className="flex items-center gap-1.5"><span style={{ color: "var(--gold-deep)" }}>✦</span> {t}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <p className="mx-auto mt-8 max-w-6xl text-center text-[10px] tracking-[0.22em] uppercase" style={{ fontFamily: LUXE, color: "rgba(31,17,11,0.5)" }}>
        Dollhouse Launch · Secure monthly subscription · Built for local businesses
      </p>
    </main>
  );
}
