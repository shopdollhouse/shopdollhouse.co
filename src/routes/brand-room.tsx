import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import bgImage from "@/assets/password-bg.jpg";
import archMark from "@/assets/arch-mark.svg";

export const Route = createFileRoute("/brand-room")({ component: BrandRoomPage });

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_SCRIPT = "'Allura', cursive";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";

/* ─── Shared ──────────────────────────────────────────── */
const Divider = () => (
  <div className="flex items-center justify-center gap-2 text-[var(--gold)] my-4">
    <span className="h-px w-16 bg-current opacity-50" />
    <svg viewBox="0 0 12 10" className="w-2.5 h-2.5 fill-current">
      <path d="M6 9 L0.5 3.5 a2.2 2.2 0 0 1 3.1 -3.1 L6 2.8 l2.4 -2.4 a2.2 2.2 0 0 1 3.1 3.1 Z" />
    </svg>
    <span className="h-px w-16 bg-current opacity-50" />
  </div>
);

/* ─── Nav ─────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}
      style={{
        backgroundColor: scrolled ? "color-mix(in oklab, var(--cream) 80%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid color-mix(in oklab, var(--gold) 15%, transparent)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex flex-col items-start leading-tight no-underline">
          <span style={{ fontFamily: FONT_SCRIPT, fontSize: "18px", letterSpacing: "1px", textTransform: "lowercase", lineHeight: 1, color: "color-mix(in oklab, var(--ink) 55%, transparent)" }}>
            the
          </span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: "15px", letterSpacing: "4px", textTransform: "uppercase", marginTop: "-4px", color: "var(--ink)", fontStyle: "italic" }}>
            Dollhouse
          </span>
          <span style={{ fontFamily: FONT_LUXE, fontSize: "6.5px", letterSpacing: "3px", textTransform: "uppercase", marginTop: "1px", color: "var(--gold)", fontWeight: 600 }}>
            Brand Studio
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-9 text-[10px] tracking-[0.18em] uppercase text-[var(--ink)]/70" style={{ fontFamily: FONT_LUXE }}>
          <a href="/#services" className="hover:text-[var(--rose)] transition-colors">Services</a>
          <a href="/#pricing" className="hover:text-[var(--rose)] transition-colors">Pricing</a>
          <Link to="/brand-room" className="text-[var(--rose)]">The Brand Room</Link>
          <a href="/#faq" className="hover:text-[var(--rose)] transition-colors">FAQ</a>
        </div>

        <Link
          to="/quiz"
          className="inline-flex rounded-full bg-[var(--ink)] text-[var(--cream)] text-[10px] tracking-[0.18em] uppercase px-4 py-2 md:px-5 md:py-2.5 hover:opacity-90 transition"
          style={{ fontFamily: FONT_LUXE }}
        >
          Take a Free Quiz
        </Link>
      </div>
    </nav>
  );
}

/* ─── Hero ────────────────────────────────────────────── */
function Hero() {
  return (
    <header
      className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-24 overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Overlays */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "rgba(247,228,223,0.32)" }} />
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(230,200,195,0.45) 70%, rgba(210,175,168,0.7) 100%)" }} />

      <div className="relative z-10 w-full max-w-[680px] text-center">
        {/* White halo */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none"
          style={{ width: "min(120%, 780px)", height: "110%", background: "radial-gradient(ellipse at center, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.65) 40%, rgba(255,255,255,0.2) 65%, rgba(255,255,255,0) 85%)", filter: "blur(32px)" }}
        />

        <div className="reveal inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/55 bg-white/40 backdrop-blur-md px-5 py-2 text-[var(--gold)]" style={{ animationDelay: "0.05s" }}>
          <span className="text-[10px] tracking-luxe uppercase font-medium" style={{ fontFamily: FONT_LUXE }}>One-Time · Build Your Brand</span>
        </div>

        <div className="reveal mt-8 flex justify-center text-[var(--gold)]" style={{ animationDelay: "0.15s" }}>
          <img src={archMark} alt="" className="w-16 h-24 opacity-60" style={{ filter: "sepia(0.4) saturate(1.5)" }} />
        </div>

        <p className="reveal text-[var(--gold)] italic mt-2 leading-none" style={{ fontFamily: FONT_SCRIPT, fontSize: "clamp(2.5rem, 5vw, 3.5rem)", textTransform: "lowercase", animationDelay: "0.2s" }}>
          the
        </p>
        <h1
          className="reveal text-[var(--rose)] font-normal leading-[0.95] mt-1"
          style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(3.5rem, 9vw, 6rem)", letterSpacing: "0.04em", animationDelay: "0.3s" }}
        >
          THE BRAND ROOM
        </h1>
        <p className="reveal mt-4 text-[var(--gold)] text-[11px] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, animationDelay: "0.4s" }}>
          brand studio
        </p>

        <div className="reveal" style={{ animationDelay: "0.5s" }}>
          <Divider />
        </div>

        <h2 className="reveal mt-2 text-[var(--rose)] leading-snug max-w-xl mx-auto" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.8rem, 3.8vw, 2.8rem)", fontWeight: 400, fontStyle: "italic", animationDelay: "0.52s" }}>
          Build a Brand That Looks Like You Hired an Agency.
        </h2>

        <p className="reveal mt-4 text-[var(--ink)]/65 leading-relaxed max-w-lg mx-auto" style={{ fontFamily: FONT_BODY, fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", animationDelay: "0.58s" }}>
          Start with the Blueprint — or grab all three and save.
        </p>

        <div className="reveal mt-9 flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: "0.65s" }}>
          <a href="#blueprint" className="btn-ink">
            Get the Blueprint <span aria-hidden>→</span>
          </a>
          <a href="#bundle" className="btn-ghost">
            See the Full Bundle <span aria-hidden>↓</span>
          </a>
        </div>

        <p className="reveal mt-7 text-[var(--ink)]/55 italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1rem, 2vw, 1.2rem)", animationDelay: "0.75s" }}>
          One-time payment · Lifetime access
        </p>
      </div>
    </header>
  );
}

/* ─── What's Inside ───────────────────────────────────── */
const PIECES = [
  {
    num: "01",
    price: "$97",
    originalPrice: "$145",
    name: "The Dollhouse Brand Kit Blueprint",
    tagline: "Interactive web app — build your brand from scratch",
    detail: "No guesswork. No blank pages. Every brand decision walked through step by step — your colors, fonts, logo direction, voice, and visual identity all locked in.",
  },
  {
    num: "02",
    price: "$47",
    originalPrice: "$261",
    name: "Brand Workbook",
    tagline: "Every foundational business decision, made",
    detail: "An interactive web app that walks you through positioning, audience, offers, and brand voice. Includes a bonus PDF workbook to help you hit the ground running.",
  },
  {
    num: "03",
    price: "$17",
    originalPrice: null,
    name: "AI Prompt Kit",
    tagline: "50+ prompts across 8 rooms — ready to use",
    detail: "Copy, content, strategy — all pre-built. Captions, hooks, emails, ad copy and more. Customize and use instantly. No staring at a blank screen.",
  },
];

function WhatsInside() {
  return (
    <section id="whats-inside" className="py-24 md:py-32 px-6" style={{ background: "linear-gradient(135deg, #f4dcdc 0%, #f7e6dc 45%, #f1d3cf 100%)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[var(--gold)] text-[11px] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE }}>What's Inside</p>
          <h2 className="mt-4 text-[var(--rose)] leading-[1.05]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400 }}>
            Three pieces
          </h2>
          <p className="mt-2 italic text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem" }}>
            One foundation.
          </p>
          <Divider />
        </div>

        {/* Featured Blueprint */}
        <div id="blueprint" className="mt-16 rounded-[32px] p-10 md:p-14 relative overflow-hidden" style={{ background: "var(--ink)", boxShadow: "0 40px 80px -20px rgba(30,15,10,0.5), 0 0 0 1px rgba(200,168,100,0.2)" }}>
          <div className="absolute top-5 right-6 px-3 py-1 rounded-full" style={{ background: "rgba(200,168,100,0.2)", border: "1px solid rgba(200,168,100,0.4)" }}>
            <span style={{ fontFamily: FONT_LUXE, fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>Featured Product</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <span className="italic text-[var(--gold)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "2.5rem", lineHeight: 1 }}>01</span>
              <h3 className="mt-4 text-[var(--cream)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", lineHeight: 1.15 }}>{PIECES[0].name}</h3>
              <p className="mt-2 italic text-[var(--gold)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem" }}>{PIECES[0].tagline}</p>
              <p className="mt-4 leading-relaxed" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem", color: "rgba(250,243,234,0.7)" }}>{PIECES[0].detail}</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-4 shrink-0">
              <div className="flex items-baseline gap-3">
                <span className="italic text-[var(--gold)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(3rem, 5vw, 4rem)", lineHeight: 1 }}>{PIECES[0].price}</span>
                <span className="line-through" style={{ fontFamily: FONT_BODY, fontSize: "1.1rem", color: "rgba(250,243,234,0.3)" }}>{PIECES[0].originalPrice}</span>
              </div>
              <a href="mailto:hello@shopdollhouse.co?subject=Brand%20Kit%20Blueprint" className="w-full md:w-auto rounded-2xl px-8 py-4 text-center transition-all hover:-translate-y-0.5 hover:opacity-90" style={{ backgroundColor: "var(--gold)", boxShadow: "0 12px 28px -10px rgba(160,110,60,0.5)" }}>
                <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", fontStyle: "italic", fontWeight: 700, color: "var(--ink)" }}>Get the Blueprint →</p>
              </a>
              <p style={{ fontFamily: FONT_LUXE, fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(250,243,234,0.4)" }}>One-time · Instant access</p>
            </div>
          </div>
        </div>

        {/* Other two products */}
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          {PIECES.slice(1).map((p) => (
            <article key={p.name} className="rounded-[28px] p-10 flex flex-col" style={{ background: "linear-gradient(180deg, #fbf3ee 0%, #f6e8e1 100%)", border: "1px solid color-mix(in oklab, var(--gold) 35%, transparent)", boxShadow: "0 30px 60px -30px rgba(160,110,95,0.35), inset 0 1px 0 rgba(255,255,255,0.6)" }}>
              <div className="flex items-center justify-between">
                <span className="text-[var(--gold)] italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "2.5rem", lineHeight: 1 }}>{p.num}</span>
                <div className="flex items-baseline gap-2">
                  <span className="italic text-[var(--gold)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.6rem", lineHeight: 1 }}>{p.price}</span>
                  {p.originalPrice && (
                    <span className="line-through" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: "rgba(30,15,10,0.3)" }}>{p.originalPrice}</span>
                  )}
                </div>
              </div>
              <h3 className="mt-5 text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.6rem", lineHeight: 1.2 }}>{p.name}</h3>
              <p className="mt-1 italic text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem" }}>{p.tagline}</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--gold) 50%, transparent), transparent)" }} />
                <svg viewBox="0 0 24 22" fill="currentColor" style={{ width: "13px", height: "13px", color: "var(--gold)", flexShrink: 0 }}><path d="M12 21.6C6.3 16.1 1 11.3 1 7.2 1 3.4 4.1 2 6.3 2c1.3 0 4.2.5 5.7 4.5C13.6 2.5 16.5 2 17.7 2 20.3 2 23 3.6 23 7.2c0 4.1-5.1 8.9-11 14.4z"/></svg>
                <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--gold) 50%, transparent), transparent)" }} />
              </div>
              <p className="mt-4 text-[var(--ink)]/70 leading-relaxed text-sm flex-1" style={{ fontFamily: FONT_BODY }}>{p.detail}</p>
              <a href={`mailto:hello@shopdollhouse.co?subject=${encodeURIComponent(p.name)}`} className="mt-6 w-full block rounded-xl px-5 py-3 text-center transition-all hover:opacity-80" style={{ border: "1px solid color-mix(in oklab, var(--gold) 50%, transparent)", color: "var(--gold)" }}>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", fontStyle: "italic", fontWeight: 600 }}>Get it →</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Includes Checklist ──────────────────────────────── */
const INCLUDES = [
  "Brand Kit Blueprint — interactive web app ($145 value)",
  "Brand Workbook — interactive web app + bonus PDF workbook ($261 value)",
  "AI Prompt Kit — 50+ prompts across 8 rooms ($17 value)",
  "Copy, content & strategy prompts ready to customize",
  "Every foundational brand decision walked through step by step",
  "Color, font, voice & visual identity all locked in",
  "30-day content starter calendar",
  "Lifetime access & free updates",
  "Private community of founders",
];

function Includes() {
  return (
    <section className="py-24 px-6 bg-[var(--cream)]">
      <div
        className="max-w-4xl mx-auto rounded-[32px] p-12 md:p-16 relative overflow-hidden"
        style={{
          background: "var(--ink)",
          boxShadow: "0 40px 80px -20px rgba(30,15,10,0.5)",
        }}
      >
        <img src={archMark} alt="" className="absolute -right-12 -bottom-12 w-72 opacity-8 pointer-events-none" />
        <p className="text-[var(--gold)] text-[11px] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE }}>Everything You Get</p>
        <h2 className="mt-4 italic text-[var(--cream)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}>
          A complete brand, delivered today.
        </h2>
        <div className="mt-3 flex items-center gap-3">
          <span className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, rgba(201,122,122,0.5), transparent)" }} />
          <svg viewBox="0 0 24 22" fill="currentColor" style={{ width: "13px", height: "13px", color: "#c97a7a", flexShrink: 0 }}><path d="M12 21.6C6.3 16.1 1 11.3 1 7.2 1 3.4 4.1 2 6.3 2c1.3 0 4.2.5 5.7 4.5C13.6 2.5 16.5 2 17.7 2 20.3 2 23 3.6 23 7.2c0 4.1-5.1 8.9-11 14.4z"/></svg>
          <span className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, rgba(201,122,122,0.5), transparent)" }} />
        </div>
        <ul className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-4 relative z-10">
          {INCLUDES.map((item) => (
            <li key={item} className="flex items-start gap-3" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: "rgba(250,243,234,0.85)" }}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" style={{ width: "13px", height: "13px", color: "var(--gold)" }}><path d="M2.5 8.5L6 12L13.5 4.5" /></svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── Bundle ──────────────────────────────────────────── */
function Bundle() {
  return (
    <section id="bundle" className="py-24 md:py-32 px-6" style={{ background: "linear-gradient(135deg, #f4dcdc 0%, #f7e6dc 45%, #f1d3cf 100%)" }}>
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[var(--gold)] text-[11px] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE }}>Best Value</p>
        <h2 className="mt-4 text-[var(--rose)] leading-[1.05]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.25rem, 4vw, 3.5rem)", fontWeight: 400 }}>
          Get everything together
        </h2>
        <Divider />

        <div
          className="mt-12 rounded-[32px] p-10 md:p-14 relative overflow-hidden"
          style={{
            background: "var(--ink)",
            boxShadow: "0 40px 80px -20px rgba(30,15,10,0.55), 0 0 0 1px rgba(200,168,100,0.2)",
          }}
        >
          {/* Best Value badge */}
          <div className="absolute top-5 right-6 px-3 py-1 rounded-full" style={{ background: "rgba(200,168,100,0.2)", border: "1px solid rgba(200,168,100,0.4)" }}>
            <span style={{ fontFamily: FONT_LUXE, fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>Best Value</span>
          </div>

          <p className="text-[var(--gold)] text-[11px] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE }}>The Full Starter Kit Bundle</p>

          {/* Line items */}
          <div className="mt-8 space-y-3 text-left">
            {PIECES.map((p) => (
              <div key={p.name} className="flex items-center justify-between gap-4 py-2" style={{ borderBottom: "1px solid rgba(200,168,100,0.12)" }}>
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "12px", height: "12px", color: "var(--gold)", flexShrink: 0 }}><path d="M2.5 8.5L6 12L13.5 4.5" /></svg>
                  <span style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: "rgba(250,243,234,0.8)" }}>{p.name}</span>
                </div>
                <span className="shrink-0 italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: "rgba(250,243,234,0.45)" }}>{p.originalPrice ?? p.price}</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2">
              <span style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(250,243,234,0.35)" }}>Regular total</span>
              <span className="line-through" style={{ fontFamily: FONT_BODY, color: "rgba(250,243,234,0.3)", fontSize: "0.95rem" }}>$423</span>
            </div>
          </div>

          {/* Bundle price */}
          <div className="mt-8 flex items-baseline justify-center gap-4">
            <span className="italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(3rem, 6vw, 4.5rem)", lineHeight: 1, color: "var(--gold)" }}>
              $127
            </span>
            <div className="flex flex-col items-start gap-1">
              <span className="px-2 py-0.5 rounded-full text-[var(--ink)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", background: "var(--gold)" }}>Save $296</span>
            </div>
          </div>
          <p className="mt-3" style={{ fontFamily: FONT_LUXE, fontSize: "0.7rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
            One-time · Lifetime access · 14-day guarantee
          </p>

          <div className="mt-6 flex items-center gap-3 justify-center">
            <span className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, rgba(201,122,122,0.5), transparent)" }} />
            <svg viewBox="0 0 24 22" fill="currentColor" style={{ width: "13px", height: "13px", color: "#c97a7a", flexShrink: 0 }}><path d="M12 21.6C6.3 16.1 1 11.3 1 7.2 1 3.4 4.1 2 6.3 2c1.3 0 4.2.5 5.7 4.5C13.6 2.5 16.5 2 17.7 2 20.3 2 23 3.6 23 7.2c0 4.1-5.1 8.9-11 14.4z"/></svg>
            <span className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, rgba(201,122,122,0.5), transparent)" }} />
          </div>

          <a
            href="mailto:hello@shopdollhouse.co?subject=Starter%20Kit%20Bundle"
            className="mt-8 w-full block rounded-2xl px-5 py-4 text-center transition-all hover:-translate-y-0.5 hover:opacity-90"
            style={{ backgroundColor: "var(--gold)", boxShadow: "0 12px 28px -10px rgba(160,110,60,0.5)" }}
          >
            <p className="text-[var(--ink)] leading-tight" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem", fontStyle: "italic", fontWeight: 700 }}>
              Get the Full Bundle →
            </p>
            <p className="text-[var(--ink)]/60 mt-0.5" style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              All three · Delivered instantly to your inbox
            </p>
          </a>

          <p className="mt-6 text-[var(--cream)]/40 text-xs" style={{ fontFamily: FONT_BODY }}>
            Just want one piece?{" "}
            <a href="#blueprint" className="underline hover:text-[var(--gold)] transition-colors text-[var(--cream)]/50">
              Start with the $97 Blueprint
            </a>
            {" "}or buy the Workbook &amp; Prompts individually above.
          </p>
        </div>

        <p className="mt-10 italic text-[var(--rose)]/70" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem" }}>
          Want it all done for you instead?{" "}
          <Link to="/" className="underline hover:text-[var(--rose)] transition-colors">
            See our retainers →
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ─── FAQ ─────────────────────────────────────────────── */
const FAQS: [string, string][] = [
  ["Who is The Brand Room for?", "Founders, creators, and small business owners who want a polished brand and a content engine without hiring an agency."],
  ["Can I buy just one product?", "Yes — each piece is available individually. Start with the $97 Blueprint, grab the $47 Brand Workbook, or pick up the $17 AI Prompt Kit on its own. Or save $34 and grab all three for $127."],
  ["How is this delivered?", "Instantly. After checkout you'll receive an email with access to your Brand Kit Blueprint, Brand Workbook, and AI Prompt Kit."],
  ["Do I need design experience?", "Nope. Everything is templated and editable in Canva. The workbook walks you through every decision step by step."],
  ["Can I upgrade to a done-for-you retainer later?", "Yes — your Brand Room investment is credited toward your first month on any monthly plan."],
];

function FAQ() {
  return (
    <section className="py-24 px-6 bg-[var(--cream)]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <p className="text-[var(--gold)] text-[11px] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE }}>Questions</p>
          <h2 className="mt-4 text-[var(--rose)] leading-[1.05]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 400 }}>
            Good to know
          </h2>
          <Divider />
        </div>
        <div className="mt-10 space-y-3">
          {FAQS.map(([q, a]) => (
            <details
              key={q}
              className="group rounded-2xl px-7 py-5 [&_summary::-webkit-details-marker]:hidden"
              style={{
                background: "linear-gradient(160deg, rgba(255,255,255,0.7) 0%, rgba(251,240,235,0.6) 100%)",
                border: "1px solid color-mix(in oklab, var(--gold) 30%, transparent)",
                boxShadow: "0 8px 24px -12px rgba(160,110,95,0.2)",
              }}
            >
              <summary
                className="cursor-pointer list-none flex items-center justify-between text-[var(--ink)] gap-4"
                style={{ fontFamily: FONT_DISPLAY, fontSize: "1.2rem" }}
              >
                {q}
                <span className="text-[var(--rose)] text-2xl transition-transform duration-300 group-open:rotate-45 shrink-0">+</span>
              </summary>
              <p className="mt-3 text-[var(--ink)]/65 leading-relaxed text-sm" style={{ fontFamily: FONT_BODY }}>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-[var(--gold)]/15 py-12 px-6 text-center bg-[var(--blush)]">
      <div className="inline-flex flex-col items-center" style={{ gap: "1px" }}>
        <span className="text-[var(--ink)]/50 font-normal" style={{ fontFamily: FONT_SCRIPT, fontSize: "18px", letterSpacing: "1px", textTransform: "lowercase", lineHeight: 1 }}>the</span>
        <span className="text-[var(--ink)] italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "15px", letterSpacing: "4px", textTransform: "uppercase", lineHeight: 1 }}>Dollhouse</span>
        <p className="text-[var(--gold)] font-semibold" style={{ fontFamily: FONT_LUXE, fontSize: "6.5px", letterSpacing: "3px", textTransform: "uppercase", marginTop: "2px" }}>Brand Studio</p>
      </div>
      <div className="mt-6 flex items-center justify-center gap-2 text-[var(--ink)]/35">
        <span className="h-px w-8 bg-[var(--gold)]/30" />
        <svg viewBox="0 0 24 22" fill="currentColor" style={{ width: "10px", height: "10px", color: "var(--gold)", opacity: 0.5 }}><path d="M12 21.6C6.3 16.1 1 11.3 1 7.2 1 3.4 4.1 2 6.3 2c1.3 0 4.2.5 5.7 4.5C13.6 2.5 16.5 2 17.7 2 20.3 2 23 3.6 23 7.2c0 4.1-5.1 8.9-11 14.4z"/></svg>
        <span className="h-px w-8 bg-[var(--gold)]/30" />
      </div>
      <Link to="/" className="mt-5 inline-block text-[var(--gold)] text-[15px] tracking-[0.2em] uppercase hover:opacity-70 transition-opacity" style={{ fontFamily: FONT_LUXE }}>
        ← Back to main site
      </Link>
      <p className="text-xs text-[var(--ink)]/35 mt-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        © {new Date().getFullYear()} The Dollhouse Brand Studio. All rights reserved.
      </p>
      <Link
        to="/playbook"
        className="mt-3 inline-block hover:opacity-60 transition-opacity"
        style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(30,15,10,0.38)" }}
      >
        Admin
      </Link>
    </footer>
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
      className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500"
      style={{ background: "var(--ink)", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", pointerEvents: visible ? "auto" : "none" }}
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="var(--gold)" strokeWidth="1.5" className="w-4 h-4">
        <path d="M3 10.5L8 5.5L13 10.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

/* ─── Page ─────────────────────────────────────────────── */
function BrandRoomPage() {
  return (
    <main className="bg-[var(--blush)] text-[var(--ink)]">
      <Nav />
      <Hero />
      <WhatsInside />
      <Includes />
      <Bundle />
      <FAQ />
      <Footer />
      <BackToTop />
    </main>
  );
}
