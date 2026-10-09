import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Check, Lock, ShieldCheck } from "lucide-react";
import archMark from "@/assets/arch-mark.svg";
import { usePageMeta } from "@/lib/use-page-meta";
import {
  FIRST_POSTS_DAYS,
  GUARANTEE_DAYS,
  INCLUDED_IN_BOTH,
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

const card = {
  background: "rgba(255,250,246,0.9)",
  border: "1px solid color-mix(in oklab, var(--gold) 30%, transparent)",
  boxShadow: "0 30px 70px -40px rgba(120,70,60,0.42)",
} as const;

function GetStartedPage() {
  usePageMeta(
    "Get Started | Dollhouse Launch",
    "Choose your Dollhouse Launch plan and check out securely. Done-for-you social media and lead generation, no contract, 14-day money-back guarantee.",
  );

  const { plan } = Route.useSearch();
  const navigate = Route.useNavigate();
  const selected = LAUNCH_PLANS.find((p) => p.id === plan) ?? LAUNCH_PLANS[0];
  const link = ORDER_LINKS[selected.id];

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
    <main className="lux min-h-screen" style={{ background: "linear-gradient(160deg, var(--blush) 0%, var(--cream) 60%)", color: "var(--ink)" }}>
      {/* Minimal header: no distractions */}
      <header className="border-b" style={{ borderColor: "color-mix(in oklab, var(--gold) 24%, transparent)" }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-2.5 no-underline">
            <img src={archMark} alt="" className="h-9 w-auto" />
            <span className="flex flex-col items-start leading-none">
              <span style={{ fontFamily: "'Allura', cursive", color: "var(--gold)", fontSize: "18px", textTransform: "lowercase", lineHeight: 1 }}>the</span>
              <span style={{ fontFamily: DISPLAY, color: "var(--rose)", fontSize: "17px", fontWeight: 500, letterSpacing: "5px", textTransform: "uppercase", lineHeight: 1, marginTop: "-1px" }}>Dollhouse</span>
              <span className="font-semibold" style={{ fontFamily: LUXE, color: "var(--gold)", fontSize: "6.5px", letterSpacing: "6px", textTransform: "uppercase", marginTop: "2px" }}>Launch</span>
            </span>
          </a>
          <span className="inline-flex items-center gap-2 text-[10px] tracking-luxe uppercase text-[var(--ink)]/60" style={{ fontFamily: LUXE }}>
            <Lock className="h-3.5 w-3.5 text-[var(--gold)]" /> Secure checkout
          </span>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        {/* Left: choose + summary */}
        <div>
          <a href="/#plans" className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-70 transition-opacity" style={{ fontFamily: LUXE, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            <ArrowLeft className="h-3.5 w-3.5" /> Back to plans
          </a>

          <p className="gold-grad mt-8 text-[11px] tracking-luxe uppercase font-semibold" style={{ fontFamily: LUXE }}>Dollhouse Launch</p>
          <h1 className="mt-3 text-[var(--ink)]" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: "clamp(2.4rem, 5vw, 3.6rem)", lineHeight: 1.04 }}>
            You are one step from <span className="italic text-[var(--rose)]">launch.</span>
          </h1>
          <p className="mt-4 max-w-md text-[var(--ink)]/65 leading-8" style={{ fontFamily: BODY }}>
            Pick your plan, check out securely, and get instant account access. Your first posts arrive within {FIRST_POSTS_DAYS} days.
          </p>

          {/* Plan selector */}
          <div className="mt-8 grid gap-3" role="radiogroup" aria-label="Choose your plan">
            {LAUNCH_PLANS.map((p) => {
              const active = p.id === selected.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => navigate({ search: { plan: p.id }, replace: true })}
                  className="flex items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left transition-all"
                  style={{
                    background: active ? "var(--ink)" : "rgba(255,250,246,0.8)",
                    border: active ? "1.5px solid var(--gold)" : "1.5px solid color-mix(in oklab, var(--gold) 28%, transparent)",
                    boxShadow: active ? "0 24px 50px -26px rgba(38,14,8,0.7)" : "none",
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{ border: `1.5px solid ${active ? "var(--gold)" : "color-mix(in oklab, var(--ink) 30%, transparent)"}`, background: active ? "var(--gold)" : "transparent" }}
                    >
                      {active && <Check className="h-3 w-3 text-[var(--ink)]" strokeWidth={3.5} />}
                    </span>
                    <span>
                      <span className="block" style={{ fontFamily: DISPLAY, fontSize: "1.2rem", fontWeight: 500, color: active ? "var(--cream)" : "var(--ink)" }}>{p.name}</span>
                      <span className="block" style={{ fontFamily: BODY, fontSize: "0.8rem", color: active ? "rgba(255,250,246,0.6)" : "rgba(43,23,16,0.55)" }}>{p.mix}</span>
                    </span>
                  </span>
                  <span style={{ fontFamily: DISPLAY, fontSize: "1.7rem", color: active ? "var(--gold)" : "var(--rose)", whiteSpace: "nowrap" }}>
                    ${p.price}<span style={{ fontFamily: BODY, fontSize: "0.75rem", opacity: 0.7 }}>/mo</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* What you get */}
          <div className="mt-8 rounded-[24px] p-6" style={card}>
            <p className="text-[var(--gold)] text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE }}>What you get</p>
            <ul className="mt-4 grid gap-3">
              {INCLUDED_IN_BOTH.map((t) => (
                <li key={t} className="flex gap-3 text-[var(--ink)]/78 leading-6" style={{ fontFamily: BODY, fontSize: "0.9rem" }}>
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full" style={{ background: "color-mix(in oklab, var(--gold) 22%, transparent)", color: "var(--gold)" }}>
                    <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                  </span>
                  {t}
                </li>
              ))}
              <li className="flex gap-3 text-[var(--ink)]/78 leading-6" style={{ fontFamily: BODY, fontSize: "0.9rem" }}>
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full" style={{ background: "color-mix(in oklab, var(--gold) 22%, transparent)", color: "var(--gold)" }}>
                  <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                </span>
                Bonus: your Dollhouse CRM account and a private onboarding kickoff
              </li>
            </ul>
          </div>

          <div className="mt-6 flex items-start gap-4 rounded-[24px] p-5" style={{ background: "color-mix(in oklab, var(--gold) 13%, transparent)", border: "1px solid color-mix(in oklab, var(--gold) 36%, transparent)" }}>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full" style={{ background: "var(--ink)", color: "var(--gold)" }}>
              <ShieldCheck className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <div>
              <p className="italic text-[var(--ink)]" style={{ fontFamily: DISPLAY, fontSize: "1.3rem" }}>{GUARANTEE_DAYS}-day money-back guarantee</p>
              <p className="mt-1 text-[var(--ink)]/62 leading-6" style={{ fontFamily: BODY, fontSize: "0.85rem" }}>
                Not satisfied? Contact us within {GUARANTEE_DAYS} days for a full refund. No contract, cancel anytime.{" "}
                <a href="/refund-policy" className="text-[var(--rose)] underline underline-offset-4">Refund policy</a>
              </p>
            </div>
          </div>
        </div>

        {/* Right: checkout */}
        <div>
          <div className="overflow-hidden rounded-[28px]" style={{ ...card, boxShadow: "0 40px 90px -44px rgba(70,35,25,0.5)" }}>
            <div className="flex items-center justify-between gap-4 px-6 py-5" style={{ background: "var(--ink)" }}>
              <div>
                <p className="text-[9px] tracking-luxe uppercase" style={{ fontFamily: LUXE, color: "var(--gold)" }}>Your order</p>
                <p className="mt-1" style={{ fontFamily: DISPLAY, fontSize: "1.35rem", color: "var(--cream)" }}>{selected.name}</p>
              </div>
              <p style={{ fontFamily: DISPLAY, fontSize: "2rem", color: "var(--gold)", lineHeight: 1 }}>
                ${selected.price}<span style={{ fontFamily: BODY, fontSize: "0.8rem", color: "rgba(255,250,246,0.55)" }}>/mo USD</span>
              </p>
            </div>

            {link ? (
              <iframe
                key={selected.id}
                src={link}
                title={`Checkout for ${selected.name}`}
                allow="payment"
                className="block w-full border-0"
                style={{ height: "820px", background: "transparent" }}
              />
            ) : (
              <div className="px-8 py-16 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "color-mix(in oklab, var(--gold) 18%, transparent)", color: "var(--gold)" }}>
                  <Lock className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h2 className="mt-5 italic text-[var(--ink)]" style={{ fontFamily: DISPLAY, fontSize: "1.9rem", lineHeight: 1.1 }}>
                  Secure checkout is being connected
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-[var(--ink)]/62 leading-7" style={{ fontFamily: BODY, fontSize: "0.95rem" }}>
                  Email us your plan choice and we will send your secure payment link right away.
                </p>
                <a
                  href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`Dollhouse Launch: ${selected.name} ($${selected.price}/mo)`)}`}
                  className="btn-ink mt-7 justify-center"
                >
                  Email to order
                </a>
              </div>
            )}
          </div>

          {link && (
            <p className="mt-4 text-center text-[var(--ink)]/50" style={{ fontFamily: BODY, fontSize: "0.82rem" }}>
              Trouble loading? <a href={link} target="_blank" rel="noopener noreferrer" className="text-[var(--rose)] underline underline-offset-4">Open secure checkout in a new tab</a>
            </p>
          )}

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] tracking-[0.16em] uppercase text-[var(--ink)]/55" style={{ fontFamily: LUXE }}>
            {["Secure payment", "No contract", `${GUARANTEE_DAYS}-day guarantee`, "Instant access"].map((t) => (
              <li key={t} className="flex items-center gap-1.5"><span style={{ color: "var(--gold)" }}>✦</span> {t}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
