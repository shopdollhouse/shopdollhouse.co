import { useEffect, useState } from "react";
import { Check, Lock } from "lucide-react";
import archMark from "@/assets/arch-mark.svg";
import bgImage from "@/assets/password-bg.jpg";

export const DISPLAY = "'Cormorant Garamond', serif";
export const BODY = "'DM Sans', sans-serif";
export const LUXE = "'Jost', sans-serif";

/** Safe localStorage wrapper (storage can be blocked). */
export const store = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  },
};

export const FLOW_KEYS = { kickoff: "launch-kickoff-done", form: "launch-onboarding-done", account: "launch-account-done" };

export function useNoindex() {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    window.scrollTo(0, 0);
    return () => meta.remove();
  }, []);
}

export function useLead() {
  const [lead, setLead] = useState<{ firstName: string; lastName: string; email: string; phone?: string } | null>(null);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("launch-lead");
      if (raw) setLead(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);
  return lead;
}

const STEPS = ["Purchase complete", "Kickoff scheduled", "Setup checklist"];

function Stepper({ current }: { current: 0 | 1 | 2 }) {
  return (
    <ol className="mx-auto flex max-w-2xl items-center justify-center gap-2 sm:gap-4" aria-label="Setup progress">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex items-center gap-2 sm:gap-4">
            <span className="flex items-center gap-2.5">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold"
                style={{
                  fontFamily: LUXE,
                  background: done || active ? "var(--gold)" : "transparent",
                  color: done || active ? "var(--ink)" : "rgba(31,17,11,0.5)",
                  border: done || active ? "none" : "1.5px solid rgba(31,17,11,0.25)",
                  boxShadow: active ? "0 0 0 4px rgba(198,178,130,0.28)" : "none",
                }}
              >
                {done ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
              </span>
              <span className="hidden text-[12px] sm:inline" style={{ fontFamily: LUXE, fontWeight: active ? 600 : 400, color: done || active ? "var(--ink)" : "rgba(31,17,11,0.5)" }}>{label}</span>
            </span>
            {i < STEPS.length - 1 && <span className="h-px w-6 sm:w-14" style={{ background: "rgba(198,178,130,0.45)" }} />}
          </li>
        );
      })}
    </ol>
  );
}

/** Dark page with header, progress bar and a two-panel card: dark intro on the left, light content on the right. */
export function FlowShell({ current, left, right, footer }: { current: 0 | 1 | 2; left: React.ReactNode; right: React.ReactNode; footer: string }) {
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
          <Lock className="h-3.5 w-3.5 text-[var(--gold)]" /> Secure setup
        </span>
      </header>

      <Stepper current={current} />

      <div className="mx-auto mt-8 grid max-w-6xl overflow-hidden rounded-[32px] lg:grid-cols-2" style={{ border: "1px solid rgba(198,178,130,0.3)", boxShadow: "0 60px 120px -50px rgba(0,0,0,0.8)" }}>
        <section className="p-8 sm:p-12" style={{ background: "rgba(255,250,246,0.6)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>{left}</section>
        <section className="p-4 sm:p-8" style={{ background: "linear-gradient(160deg, #fff7f3 0%, #f7e3dd 100%)", color: "var(--ink)" }}>
          <div className="rounded-[26px] p-5 sm:p-8" style={{ background: "rgba(255,255,255,0.78)", boxShadow: "0 24px 60px -36px rgba(80,40,30,0.4)" }}>{right}</div>
        </section>
      </div>

      <p className="mx-auto mt-8 max-w-6xl text-center text-[10px] tracking-[0.22em] uppercase" style={{ fontFamily: LUXE, color: "rgba(31,17,11,0.5)" }}>{footer}</p>
    </main>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE, fontWeight: 600, color: "var(--gold-deep)", border: "1px solid rgba(168,134,74,0.5)", background: "rgba(255,255,255,0.55)" }}>
      {children}
    </span>
  );
}

export function LeftTitle({ italic, caps, sub }: { italic: string; caps: string; sub: string }) {
  return (
    <>
      <h1 className="mt-7" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: "clamp(2.2rem, 4.6vw, 3.3rem)", lineHeight: 1.04, color: "var(--ink)" }}>
        <span className="italic" style={{ color: "var(--gold-deep)" }}>{italic}</span>
        <br />
        <span style={{ letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--rose)" }}>{caps}</span>
      </h1>
      <p className="mt-6 max-w-md leading-8" style={{ fontFamily: BODY, color: "rgba(31,17,11,0.7)" }}>{sub}</p>
    </>
  );
}

export function RightHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <>
      <p className="text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE, fontWeight: 700, color: "var(--gold-deep)" }}>{eyebrow}</p>
      <h2 className="mt-2" style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(1.9rem, 3.6vw, 2.5rem)", lineHeight: 1.05 }}>{title}</h2>
      {sub && <p className="mt-2 leading-7" style={{ fontFamily: BODY, fontSize: "0.92rem", color: "rgba(31,17,11,0.62)" }}>{sub}</p>}
    </>
  );
}

export const btnDark = "inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-[12px] uppercase tracking-[0.18em] transition-opacity hover:opacity-90";
export const btnDarkStyle = { fontFamily: LUXE, fontWeight: 700, background: "var(--ink)", color: "var(--cream)", border: "1px solid var(--gold)" } as const;
