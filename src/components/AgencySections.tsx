/* Shared agency marketing sections — used on /services and the homepage. */

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";

const INK = "var(--ink)";
const ROSE = "var(--rose)";
const CREAM = "var(--cream)";
const BLUSH = "var(--blush)";
const CHARCOAL = "#1a1a1a";

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

function ctaLinkProps(newTab: boolean) {
  return newTab ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

export const PULSE_STYLE = `@keyframes plan-pulse{0%,100%{box-shadow:0 0 0 2px rgba(189,116,118,0.2),0 18px 48px -28px rgba(189,116,118,0.4);transform:translateY(0)}45%{box-shadow:0 0 0 7px rgba(189,116,118,0.42),0 24px 54px -24px rgba(189,116,118,0.62);transform:translateY(-3px)}}.plan-pulse{animation:plan-pulse 1.6s ease-in-out 3}`;

export function pulsePlan(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.remove("plan-pulse");
  void el.offsetWidth; // restart the animation
  el.classList.add("plan-pulse");
  window.setTimeout(() => el.classList.remove("plan-pulse"), 5000);
}

/* ── Plan finder ─────────────────────────────────────── */
export function PlanFinderSection() {
  const options: [string, string][] = [
    ["I need a website and a lead system — no social media yet", "foundation"],
    ["I want consistent social content without doing it myself", "starter"],
    ["I want my whole social media managed with an AI Clone", "starter"],
    ["I want everything — content, AI, ads, and full automation", "growth"],
  ];
  return (
    <section className="px-6 py-16 md:py-20" style={{ background: CREAM }}>
      <style>{PULSE_STYLE}</style>
      <div className="mx-auto max-w-[720px] text-center">
        <Eyebrow>Not Sure Which Plan Is Right?</Eyebrow>
        <h2 className="mt-4" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: INK, fontSize: "clamp(28px, 4vw, 36px)" }}>Answer one question.</h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {options.map(([label, target]) => (
            <button
              key={label}
              type="button"
              onClick={() => pulsePlan(target)}
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
  );
}

/* ── Focused setup (Appointment Booking) ─────────────── */
export function FocusedSetupSection({ proposalHref, newTab = false }: { proposalHref: string; newTab?: boolean }) {
  return (
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
          <a href={proposalHref} {...ctaLinkProps(newTab)} className="mt-6 flex min-h-12 items-center justify-center rounded-full px-6 py-3.5 text-center transition-opacity hover:opacity-90" style={{ background: ROSE, color: "#fff", fontFamily: FONT_BODY, fontWeight: 600 }}>
            Get the Booking Setup
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Comparison table ────────────────────────────────── */
export function PlanComparisonSection() {
  const rows: [string, string, string, string][] = [
    ["Professional website", "y", "-", "-"],
    ["AI Clone or brand mascot", "-", "y", "y"],
    ["Platform managed", "-", "1 platform", "3 platforms"],
    ["Posts per month", "-", "16", "24"],
    ["Comment-to-DM automation", "-", "y", "y"],
    ["Voice AI receptionist", "y", "-", "y"],
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

/* ── Results / stats strip ───────────────────────────── */
export function ResultsStatsSection() {
  return (
    <section className="px-6 py-20" style={{ background: BLUSH }}>
      <div className="mx-auto max-w-[820px] text-center">
        <Eyebrow>What Clients Are Saying</Eyebrow>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {[
            ["24/7", "Voice AI answering your missed calls"],
            ["Done for you", "Content planned, created, and managed for your business"],
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
  );
}

/* ── FAQ ─────────────────────────────────────────────── */
export function AgencyFaqSection() {
  const items: [string, string][] = [
    ["What is included in the setup fee?", "Your one-time setup fee covers your full onboarding, system buildout, automation setup, CRM configuration, calendar integration, and launch prep. It is $1,000 for Foundation and $500 for Starter and Growth, required upfront before your build begins. Monthly billing starts after your free 14-day trial."],
    ["What is the +$300/mo platform access fee?", "This covers your dedicated CRM platform, content tools, and the AI systems powering your automations and AI Clone. It is separate from your management fee and billed monthly alongside it."],
    ["Is ad spend included?", "No. Ad spend is never included in any package. It is paid directly by you to Meta. We recommend starting at $1,000–$2,000/mo for best results. Your package cost and ad budget are always separate."],
    ["What is the AI Clone and when is it built?", "The AI Clone is a digital version of you — built during onboarding and trained to your look, voice, and energy. It creates content that looks and sounds like you, posted to your platforms every month. Included in Starter and Growth."],
    ["What is the difference between Starter and Growth?", "Starter is one platform — fully managed with an AI Clone, 16 posts per month, and a complete automation system. Growth is all three platforms — Facebook, Instagram, and TikTok — plus paid Meta ads, dedicated strategy, and monthly strategy calls. If Starter is the launchpad, Growth is the full system."],
    ["Can I upgrade my plan later?", "Yes. Many clients start with Foundation or Starter and move into Growth when the timing is right. We will recommend the upgrade when your results support it."],
    ["Do I have to sign a contract?", "Yes. All clients sign a service agreement before work begins. You can choose a 6-month or 12-month term — whichever works best for you. Clients who commit to 12 months get one month free (you pay for 11, we work all 12). The contract outlines your deliverables, payment terms, and everything we’ve agreed to. It’s written in plain language — no legalese."],
    ["When do I pay?", "Your one-time setup fee is due when you sign ($1,000 for Foundation, $500 for Starter and Growth). Your first monthly retainer payment starts on Day 15 — after your 14-day onboarding period. After that, you’re billed every 30 days on the same date."],
    ["What if I want to cancel before my term is up?", "We require 30 days written notice to cancel. If you cancel before your term is complete, an early termination fee equal to 2 months of your retainer is due. The setup fee is non-refundable. We’re upfront about this from day one so there are no surprises."],
    ["What happens after my term ends?", "Your agreement automatically moves to month-to-month. You can cancel anytime with 30 days notice — no new long-term commitment required."],
  ];

  return (
    <section id="faq" className="scroll-mt-32 px-6 py-20" style={{ background: CREAM }}>
      <div className="mx-auto max-w-[700px]">
        <h2 className="text-center" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: INK, fontSize: "clamp(32px, 5vw, 42px)" }}>Good to know.</h2>
        <div className="mt-8 space-y-3">
          {items.map(([q, a]) => (
            <details key={q} className="dh-faq rounded-2xl p-5" style={{ background: "#fff", border: "1px solid rgba(200,164,100,0.25)" }}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: INK }}>
                <span>{q}</span>
                <svg className="dh-faq-chevron shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
              </summary>
              <p className="mt-3" style={{ fontFamily: FONT_BODY, fontSize: "15px", lineHeight: 1.65, color: "rgba(29,15,11,0.7)" }}>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Final CTA ───────────────────────────────────────── */
export function FinalCtaSection({ proposalHref, newTab = false }: { proposalHref: string; newTab?: boolean }) {
  return (
    <section className="px-6 py-28 text-center" style={{ background: CHARCOAL }}>
      <div className="mx-auto max-w-2xl">
        <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: "#fff", fontSize: "clamp(38px, 7vw, 54px)", lineHeight: 1.05 }}>Ready to hand it over?</h2>
        <p className="mx-auto mt-5 max-w-lg" style={{ fontFamily: FONT_BODY, fontSize: "17px", lineHeight: 1.7, color: "rgba(255,255,255,0.7)" }}>
          Every plan starts with a free proposal. We look at your business, recommend the right plan, and show you exactly what we will build — before you commit to anything.
        </p>
        <a href={proposalHref} {...ctaLinkProps(newTab)} className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full px-12 py-5 transition-opacity hover:opacity-90" style={{ background: ROSE, color: "#fff", fontFamily: FONT_LUXE, fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Get a Free Proposal
        </a>
        <p className="mt-5" style={{ fontFamily: FONT_BODY, fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
          First 14 days free · Setup fee due upfront · 6-month agreement
        </p>
      </div>
    </section>
  );
}

/* ── Legal footer notes ──────────────────────────────── */
export function AgencyFooterNotes() {
  return (
    <section
      className="px-6"
      style={{
        background: CREAM,
        borderTop: "1px solid rgba(29,15,11,0.08)",
        borderBottom: "1px solid rgba(29,15,11,0.08)",
        paddingTop: "28px",
        paddingBottom: "28px",
      }}
    >
      <p className="mx-auto max-w-2xl text-center" style={{ fontFamily: FONT_BODY, fontSize: "11px", lineHeight: 1.8, color: "rgba(29,15,11,0.42)" }}>
        One-time setup fee required upfront on every plan — $1,000 for Foundation, $500 for Starter and Growth · First 14 days of monthly management free on Starter and Growth plans · Ad spend is not included in any package and is paid directly by you to Meta · Minimum $1,000–$2,000/mo ad spend recommended
      </p>
    </section>
  );
}
