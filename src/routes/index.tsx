import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import bgImage from "@/assets/password-bg.jpg";
import roseAccent from "@/assets/rose-accent.png";
import archMark from "@/assets/arch-mark.svg";
import mandyPhoto from "@/assets/mandy-photo.jpg";

export const Route = createFileRoute("/")({ component: Index });

/* ─── Icons ───────────────────────────────────────────── */
const LockIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 1 1 8 0v3" />
  </svg>
);
const DoorIcon = ({ className = "" }: { className?: string }) => (
  <img src={archMark} alt="" className={className} />
);

/* ─── Shared ──────────────────────────────────────────── */
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p
    className="text-[var(--gold)] text-[11px] tracking-luxe uppercase font-medium"
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

const SectionTitle = ({
  eyebrow,
  title,
  italic,
}: {
  eyebrow: string;
  title: React.ReactNode;
  italic?: string;
}) => (
  <div className="text-center max-w-3xl mx-auto">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2
      className="text-[var(--rose)] mt-4 leading-[1.05]"
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 400,
        fontSize: "clamp(2.5rem, 5vw, 4rem)",
        letterSpacing: "0.01em",
      }}
    >
      {title}
    </h2>
    {italic && (
      <p
        className="text-[var(--rose)] italic mt-2"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem" }}
      >
        {italic}
      </p>
    )}
    <Divider />
  </div>
);

/* ─── Nav ─────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      {/* Urgency banner */}
      <a
        href="#contact"
        className="fixed top-0 inset-x-0 z-50 h-9 flex items-center justify-center gap-3 px-4 hover:opacity-90 transition-opacity"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <span style={{ color: "var(--gold)", fontSize: "0.55rem" }}>✦</span>
        <span
          className="text-[var(--cream)] text-[10px] tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          Limited spots available — now booking new clients
        </span>
        <span style={{ color: "var(--gold)", fontSize: "0.55rem" }}>✦</span>
      </a>

      <nav
        className={`fixed top-9 inset-x-0 z-40 transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
        style={{
          backgroundColor: scrolled
            ? "color-mix(in oklab, var(--cream) 80%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
          borderBottom: scrolled
            ? "1px solid color-mix(in oklab, var(--gold) 22%, transparent)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10">
          <a
            href="/"
            className="flex flex-col items-start leading-tight shrink-0 no-underline"
          >
            <span
              className="text-[var(--ink)]/55 font-normal not-italic"
              style={{ fontFamily: "'Allura', cursive", fontSize: "18px", letterSpacing: "1px", textTransform: "lowercase", lineHeight: 1 }}
            >
              the
            </span>
            <span
              className="text-[var(--ink)] italic"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", letterSpacing: "4px", textTransform: "uppercase", marginTop: "-4px" }}
            >
              Dollhouse
            </span>
            <span
              className="text-[var(--gold)] not-italic font-semibold"
              style={{ fontFamily: "'Jost', sans-serif", fontSize: "6.5px", letterSpacing: "3px", textTransform: "uppercase", marginTop: "1px" }}
            >
              Brand Studio
            </span>
          </a>

          <div
            className="hidden md:flex items-center gap-10 text-[10px] tracking-luxe uppercase text-[var(--ink)]/80"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} className="nav-link hover:text-[var(--rose)] transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <a href="#contact" className="hidden md:inline-flex btn-ink !py-2.5 !px-5 !text-[10px]">
            Get a Free Proposal
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col gap-1.5 p-2 text-[var(--ink)]"
          >
            <span
              className={`block h-px w-6 bg-current transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-current transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-px w-6 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`md:hidden fixed inset-x-0 top-[60px] z-30 transition-all duration-500 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div
          className="mx-4 rounded-2xl p-6 flex flex-col gap-5 text-[12px] tracking-luxe uppercase text-[var(--ink)]"
          style={{
            fontFamily: "'Jost', sans-serif",
            background: "color-mix(in oklab, var(--cream) 95%, transparent)",
            backdropFilter: "blur(18px)",
            border: "1px solid color-mix(in oklab, var(--gold) 30%, transparent)",
            boxShadow: "0 30px 60px -25px rgba(120,80,60,0.35)",
          }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="hover:text-[var(--rose)]">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="btn-ink justify-center mt-2">
            Get a Free Proposal
          </a>
        </div>
      </div>
    </>
  );
}

/* ─── Hero ────────────────────────────────────────────── */
function Hero() {
  return (
    <header
      className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-24 overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Base wash — tones down the photo */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(247,228,223,0.32)" }}
      />
      {/* Vignette — darkens edges, lifts center contrast */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(230,200,195,0.45) 70%, rgba(210,175,168,0.7) 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[680px] text-center">
        {/* Soft white blur halo behind logo + header for readability */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none"
          style={{
            width: "min(120%, 780px)",
            height: "110%",
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.65) 40%, rgba(255,255,255,0.2) 65%, rgba(255,255,255,0) 85%)",
            filter: "blur(32px)",
          }}
        />
        <div
          className="reveal inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/55 bg-white/40 backdrop-blur-md px-5 py-2 text-[var(--gold)]"
          style={{ animationDelay: "0.05s" }}
        >
          <span style={{ fontSize: "0.55rem" }}>✦</span>
          <span
            className="text-[10px] tracking-luxe uppercase font-medium"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Social Media Marketing Agency
          </span>
          <span style={{ fontSize: "0.55rem" }}>✦</span>
        </div>
        <div
          className="reveal mt-10 flex justify-center text-[var(--gold)]"
          style={{ animationDelay: "0.15s" }}
        >
          <DoorIcon className="w-7 h-10" />
        </div>

        <p
          className="reveal text-[var(--gold)] italic mt-2 leading-none"
          style={{
            fontFamily: "'Allura', cursive",
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            textTransform: "lowercase",
            animationDelay: "0.2s",
          }}
        >
          the
        </p>
        <h1
          className="reveal text-[var(--rose)] font-normal tracking-[0.04em] leading-[0.95] mt-1"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3.5rem, 9vw, 6rem)",
            animationDelay: "0.3s",
          }}
        >
          DOLLHOUSE
        </h1>
        <p
          className="reveal mt-4 text-[var(--gold)] text-[15px] tracking-luxe uppercase"
          style={{ fontFamily: "'Jost', sans-serif", animationDelay: "0.4s" }}
        >
          brand studio
        </p>

        <div className="reveal" style={{ animationDelay: "0.5s" }}>
          <Divider />
        </div>

        <h2
          className="reveal mt-2 text-[var(--rose)] leading-snug max-w-xl mx-auto"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.8rem, 3.8vw, 2.8rem)",
            fontWeight: 400,
            fontStyle: "italic",
            animationDelay: "0.52s",
          }}
        >
          More Leads. More Booked Clients. Zero Content Work.
        </h2>

        <p
          className="reveal mt-4 text-[var(--ink)]/65 leading-relaxed max-w-lg mx-auto"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            animationDelay: "0.58s",
          }}
        >
          We create your content, run your ads, and automate your follow-up — so you can focus on running your business.
        </p>

        <div
          className="reveal mt-9 flex flex-col items-center justify-center gap-4"
          style={{ animationDelay: "0.65s" }}
        >
          <a href="#contact" className="btn-ink">
            Get a Free Proposal <span aria-hidden>→</span>

          </a>
          <div
            className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-white/40 backdrop-blur-sm px-4 py-1.5 text-[var(--gold)]"
          >
            <span style={{ fontSize: "0.65rem" }}>★</span>
            <span
              className="text-[10px] tracking-luxe uppercase font-medium"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Try free for 14 days
            </span>
          </div>
          <a href="#services" className="btn-ghost">
            See how it works <span aria-hidden>↓</span>
          </a>
        </div>

        {/* Stats row */}
        <div
          className="reveal mt-10 w-full flex items-center justify-center gap-0 flex-wrap rounded-2xl py-6 px-4"
          style={{
            animationDelay: "0.75s",
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(200,168,100,0.2)",
          }}
        >
          {[
            { stat: "100%", label: "Done For You" },
            { stat: "24/7", label: "AI Automation" },
            { stat: "90 Days", label: "To See Results" },
          ].map(({ stat, label }, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center gap-1 px-8">
                <span
                  className="text-[var(--rose)]"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 2.75rem)", fontStyle: "italic", lineHeight: 1 }}
                >
                  {stat}
                </span>
                <span
                  className="text-[var(--ink)]/60 tracking-[0.2em] uppercase"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem" }}
                >
                  {label}
                </span>
              </div>
              {i < 2 && (
                <span className="h-8 w-px bg-[var(--gold)]/25" />
              )}
            </div>
          ))}
        </div>

        <p
          className="reveal mt-5 text-[var(--ink)]/60 italic"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1rem, 2vw, 1.2rem)", animationDelay: "0.85s" }}
        >
          3 months to build momentum, then month-to-month · Fully managed, nothing to learn
        </p>
      </div>

      {/* Scroll hint */}
      <a
        href="#services"
        aria-label="Scroll to services"
        className="reveal-soft hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[var(--ink)]/45 hover:text-[var(--rose)] transition-colors"
        style={{ animationDelay: "1s" }}
      >
        <span
          className="text-[9px] tracking-luxe uppercase"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          Scroll
        </span>
        <span className="block w-px h-10 bg-current" />
      </a>
    </header>
  );
}

/* ─── Trust bar ───────────────────────────────────────── */
function TrustBar() {
  const logos = ["BuzzFeed", "HuffPost", "Meta", "TikTok", "Instagram"];
  return (
    <section className="py-14 px-6 bg-[var(--cream)]/60 backdrop-blur-sm border-y border-[var(--gold)]/15">
      <p
        className="text-center text-[10px] tracking-luxe uppercase text-[var(--gold)]"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        As seen in · Built on the world's top platforms
      </p>
      <div className="mt-7 flex flex-wrap justify-center items-center gap-x-14 gap-y-4 text-[var(--ink)]/60">
        {logos.map((l) => (
          <span
            key={l}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontStyle: l === "BuzzFeed" || l === "HuffPost" ? "italic" : "normal", fontWeight: l === "HuffPost" ? 700 : 400 }}
          >
            {l}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─── Services ────────────────────────────────────────── */
function ContentCalendarCard() {
  const days = [
    { d: "Mon", t: "IG", c: "#E1306C" },
    { d: "Tue", t: "", c: "" },
    { d: "Wed", t: "TK", c: "#111" },
    { d: "Thu", t: "FB", c: "#1877F2" },
    { d: "Fri", t: "IG", c: "#E1306C" },
    { d: "Sat", t: "G", c: "#EA4335" },
    { d: "Sun", t: "TK", c: "#111" },
  ];
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[36px] opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(60% 60% at 30% 20%, rgba(232,180,180,0.55), transparent 70%), radial-gradient(50% 50% at 80% 80%, rgba(214,176,140,0.45), transparent 70%)",
        }}
      />
      <div
        className="relative rounded-[28px] overflow-hidden border border-white/90 shadow-[0_35px_70px_-30px_rgba(160,100,100,0.45)]"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(252,236,232,0.88) 100%)",
          backdropFilter: "blur(14px)",
        }}
      >
        <div
          className="px-7 pt-6 pb-5"
          style={{
            background:
              "linear-gradient(120deg, rgba(232,180,180,0.35), rgba(214,176,140,0.25) 60%, transparent)",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span
                className="inline-flex w-7 h-7 rounded-full items-center justify-center text-[var(--cream)]"
                style={{ background: "linear-gradient(135deg, var(--rose), var(--gold))" }}
              >
                <span className="text-[11px]">✦</span>
              </span>
              <p
                className="text-[var(--ink)]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem" }}
              >
                June 2026
              </p>
            </div>
            <span
              className="text-[9px] tracking-luxe uppercase text-[var(--gold)] px-2.5 py-1 rounded-full border border-[var(--gold)]/40 bg-white/60"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              12 posts queued
            </span>
          </div>
        </div>

        <div className="px-7 pb-7">
          <div className="grid grid-cols-7 gap-2 mt-2">
            {days.map((d, i) => {
              const isToday = i === 4;
              return (
                <div
                  key={d.d}
                  className="relative aspect-square rounded-xl flex flex-col items-center justify-center overflow-hidden"
                  style={{
                    background: isToday
                      ? "linear-gradient(160deg, var(--rose), #d6a07a)"
                      : "rgba(247,228,223,0.7)",
                    boxShadow: isToday
                      ? "0 10px 22px -10px rgba(201,122,122,0.55)"
                      : "inset 0 0 0 1px rgba(214,176,140,0.18)",
                  }}
                >
                  <span
                    className="text-[9px] uppercase"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      color: isToday ? "rgba(255,255,255,0.85)" : "rgba(60,40,40,0.55)",
                    }}
                  >
                    {d.d}
                  </span>
                  {d.t && (
                    <span
                      className="mt-1 text-[9px] font-semibold px-1.5 py-[1px] rounded-full"
                      style={{
                        backgroundColor: "#fff",
                        color: d.c,
                      }}
                    >
                      {d.t}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {[
              { bg: "linear-gradient(135deg,#f6c6c0,#e8a6a0)", label: "Reel" },
              { bg: "linear-gradient(135deg,#efd9c2,#d6a07a)", label: "Story" },
              { bg: "linear-gradient(135deg,#f3d4d4,#c97a7a)", label: "Post" },
            ].map((p, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-lg relative overflow-hidden"
                style={{ background: p.bg }}
              >
                <span className="absolute bottom-1.5 left-2 text-[8px] tracking-luxe uppercase text-white/95"
                  style={{ fontFamily: "'Jost', sans-serif" }}>
                  {p.label}
                </span>
                <span className="absolute top-1.5 right-2 text-[10px] text-white/90">✦</span>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-2.5">
            {[
              ["Instagram", "5 posts", "#E1306C"],
              ["TikTok", "4 posts", "#111111"],
              ["Facebook", "2 posts", "#1877F2"],
              ["Google", "1 post", "#EA4335"],
            ].map(([p, c, dot]) => (
              <div
                key={p}
                className="flex justify-between items-center text-sm border-b border-[var(--gold)]/15 pb-2 last:border-0"
              >
                <span className="flex items-center gap-2 text-[var(--ink)]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dot }} />
                  {p}
                </span>
                <span className="text-[var(--ink)]/55 text-xs"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsCard() {
  const stats: [string, string, string][] = [
    ["Reach", "14.2K", "+38%"],
    ["Engagements", "1,840", "+52%"],
    ["New Followers", "312", "+29%"],
    ["Profile Visits", "2.1K", "+44%"],
  ];
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[36px] opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(60% 60% at 70% 20%, rgba(214,176,140,0.5), transparent 70%), radial-gradient(50% 50% at 20% 80%, rgba(232,180,180,0.5), transparent 70%)",
        }}
      />
      <div
        className="relative rounded-[28px] overflow-hidden border border-white/90 shadow-[0_35px_70px_-30px_rgba(160,100,100,0.45)]"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.94) 0%, rgba(250,234,228,0.9) 100%)",
          backdropFilter: "blur(14px)",
        }}
      >
        <div
          className="px-7 pt-6 pb-6"
          style={{
            background:
              "linear-gradient(135deg, rgba(201,122,122,0.18), rgba(214,176,140,0.18) 60%, transparent)",
          }}
        >
          <div className="flex items-center justify-between">
            <Eyebrow>This Month</Eyebrow>
            <span className="text-[9px] tracking-luxe uppercase text-[var(--gold)] flex items-center gap-1"
              style={{ fontFamily: "'Jost', sans-serif" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
              Live
            </span>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-luxe text-[var(--ink)]/55"
                style={{ fontFamily: "'Jost', sans-serif" }}>
                Total Reach
              </p>
              <p className="text-[var(--ink)] leading-none mt-1"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.75rem" }}>
                14,238
              </p>
              <p className="text-[11px] text-[var(--rose)] mt-1"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                ▲ 38% vs last month
              </p>
            </div>
            <svg viewBox="0 0 120 50" className="w-28 h-12 -mb-1">
              <defs>
                <linearGradient id="spark" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#c97a7a" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#c97a7a" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 38 L20 30 L40 34 L60 22 L80 18 L100 10 L120 4 L120 50 L0 50 Z"
                fill="url(#spark)" />
              <path d="M0 38 L20 30 L40 34 L60 22 L80 18 L100 10 L120 4"
                fill="none" stroke="#c97a7a" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div className="px-7 pb-7">
          <div className="grid grid-cols-2 gap-3 mt-4">
            {stats.map(([l, v, c]) => (
              <div key={l} className="rounded-xl p-4 relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,0.85), rgba(247,228,223,0.7))",
                  boxShadow: "inset 0 0 0 1px rgba(214,176,140,0.18)",
                }}>
                <p className="text-[9px] uppercase tracking-wider text-[var(--ink)]/55"
                  style={{ fontFamily: "'Jost', sans-serif" }}>
                  {l}
                </p>
                <p className="text-[var(--ink)] mt-1"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.85rem" }}>
                  {v}
                </p>
                <p className="text-[10px] text-[var(--rose)] mt-0.5 flex items-center gap-1">
                  <span>▲</span>{c}
                </p>
              </div>
            ))}
          </div>

          <p className="text-[9px] uppercase tracking-luxe text-[var(--ink)]/55 mt-5"
            style={{ fontFamily: "'Jost', sans-serif" }}>
            Weekly reach
          </p>
          <div className="mt-2 flex items-end gap-1.5 h-16">
            {[40, 55, 35, 70, 60, 85, 95].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md relative overflow-hidden"
                style={{
                  height: `${h}%`,
                  background: "linear-gradient(180deg, var(--rose), #d6a07a)",
                  boxShadow: "0 6px 14px -8px rgba(201,122,122,0.5)",
                }}>
                <div className="absolute inset-x-0 top-0 h-1/3"
                  style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.35), transparent)" }} />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[8px] uppercase tracking-wider text-[var(--ink)]/40"
            style={{ fontFamily: "'Jost', sans-serif" }}>
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <span key={i} className="flex-1 text-center">{d}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CaptionCard() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[36px] opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(50% 50% at 30% 30%, rgba(214,176,140,0.5), transparent 70%), radial-gradient(60% 60% at 70% 80%, rgba(201,122,122,0.45), transparent 70%)",
        }}
      />
      <div
        className="relative rounded-[28px] overflow-hidden text-[var(--cream)] shadow-[0_35px_70px_-25px_rgba(40,20,20,0.55)] border border-white/10"
        style={{
          background:
            "linear-gradient(160deg, #2a1f1d 0%, #1a1413 55%, #241a18 100%)",
        }}
      >
        <div
          aria-hidden
          className="absolute -top-20 -right-16 w-56 h-56 rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle, #d6b08c, transparent 70%)" }}
        />

        <div className="relative p-7">
          <div className="flex items-center justify-between">
            <p className="text-[10px] tracking-luxe uppercase text-[var(--gold)] flex items-center gap-1.5"
              style={{ fontFamily: "'Jost', sans-serif" }}>
              <span className="inline-flex w-5 h-5 rounded-full items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--gold), #f0d3a8)" }}>
                <span className="text-[9px] text-[var(--ink)]">✦</span>
              </span>
              AI Content Studio
            </p>
            <span className="text-[9px] tracking-luxe uppercase text-[var(--cream)]/40 flex items-center gap-1"
              style={{ fontFamily: "'Jost', sans-serif" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
              Generating
            </span>
          </div>

          <div className="mt-6">
            <p className="text-[9px] tracking-luxe uppercase text-[var(--cream)]/45"
              style={{ fontFamily: "'Jost', sans-serif" }}>
              Prompt
            </p>
            <p className="italic mt-2 text-[var(--cream)]/90"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}>
              Behind the scenes at our salon this Saturday 🌸
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {["Instagram", "TikTok", "Facebook"].map((p) => (
              <span key={p}
                className="text-[9px] tracking-luxe uppercase px-2 py-1 rounded-full border border-[var(--cream)]/15 text-[var(--cream)]/70"
                style={{ fontFamily: "'Jost', sans-serif" }}>
                {p}
              </span>
            ))}
          </div>

          <div className="mt-5 border-t border-[var(--cream)]/10 pt-5">
            <div className="flex items-center justify-between">
              <p className="text-[9px] tracking-luxe uppercase text-[var(--cream)]/45"
                style={{ fontFamily: "'Jost', sans-serif" }}>
                Generated Caption
              </p>
              <p className="text-[9px] text-[var(--cream)]/35"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                184 / 220
              </p>
            </div>
            <p className="mt-2 leading-relaxed text-[var(--cream)]/95"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}>
              Saturday magic is in the making ✨ Swipe to see how we prep for our busiest day of the week — from first coffee to last client. Slide into our DMs to book your spot. 🌿
              <span className="inline-block w-[2px] h-[1.05rem] align-middle ml-0.5 bg-[var(--gold)] animate-pulse" />
            </p>
            <p className="mt-3 text-xs text-[var(--gold)]/90"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              #localsalon #socialmedia #behindthescenes #salonlife
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-[var(--cream)]/10 flex items-center justify-between">
            <div className="flex gap-2">
              {["Regenerate", "Edit"].map((b) => (
                <span key={b}
                  className="text-[9px] tracking-luxe uppercase px-2.5 py-1.5 rounded-full border border-[var(--cream)]/15 text-[var(--cream)]/70"
                  style={{ fontFamily: "'Jost', sans-serif" }}>
                  {b}
                </span>
              ))}
            </div>
            <span className="text-[9px] tracking-luxe uppercase px-3 py-1.5 rounded-full text-[var(--ink)]"
              style={{
                fontFamily: "'Jost', sans-serif",
                background: "linear-gradient(135deg, var(--gold), #f0d3a8)",
              }}>
              Schedule →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AIChatCard() {
  const msgs = [
    { from: "lead", text: "Hi! Do you have availability this week?" },
    { from: "ai", text: "Hey! Yes — we have openings Tuesday at 2pm and Thursday at 10am. Which works for you? 😊" },
    { from: "lead", text: "Thursday works!" },
    { from: "ai", text: "Perfect! I've booked you for Thursday at 10am. You'll get a confirmation text shortly ✅" },
  ];
  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-6 -z-10 rounded-[36px] opacity-60 blur-2xl"
        style={{ background: "radial-gradient(60% 60% at 30% 30%, rgba(200,168,100,0.4), transparent 70%), radial-gradient(50% 50% at 80% 70%, rgba(232,180,180,0.35), transparent 70%)" }} />
      <div className="relative rounded-[28px] overflow-hidden border border-white/90 shadow-[0_35px_70px_-30px_rgba(160,100,100,0.35)]"
        style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.94) 0%, rgba(252,246,238,0.9) 100%)", backdropFilter: "blur(14px)" }}>
        <div className="px-5 pt-5 pb-2 border-b border-[var(--gold)]/15 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--gold), #f0d3a8)" }}>
            <span className="text-[var(--ink)] text-[11px]">✦</span>
          </div>
          <div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink)" }}>AI Assistant</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "rgba(30,15,10,0.4)" }}>Responds instantly · 24/7</p>
          </div>
          <span className="ml-auto flex items-center gap-1.5" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#22c55e" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Online
          </span>
        </div>
        <div className="p-5 space-y-3">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.from === "ai" ? "justify-start" : "justify-end"}`}>
              <div className="max-w-[80%] rounded-2xl px-4 py-2.5"
                style={{
                  background: m.from === "ai" ? "linear-gradient(135deg, var(--gold), #f0d3a8)" : "rgba(30,15,10,0.07)",
                  color: m.from === "ai" ? "var(--ink)" : "rgba(30,15,10,0.75)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.8rem",
                  lineHeight: 1.45,
                }}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReminderCard() {
  const reminders = [
    { time: "48 hrs before", msg: "Hi Sarah! Just a reminder — your appointment is on Thursday at 10am. Reply CONFIRM to lock it in 👋", sent: true },
    { time: "24 hrs before", msg: "See you tomorrow at 10am! Let us know if anything changes.", sent: true },
    { time: "2 hrs before", msg: "You're up soon! Your appointment is at 10am today. We're ready for you ✨", sent: false },
  ];
  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-6 -z-10 rounded-[36px] opacity-60 blur-2xl"
        style={{ background: "radial-gradient(60% 60% at 70% 30%, rgba(232,180,180,0.45), transparent 70%), radial-gradient(50% 50% at 20% 80%, rgba(200,168,100,0.35), transparent 70%)" }} />
      <div className="relative rounded-[28px] overflow-hidden border border-white/90 shadow-[0_35px_70px_-30px_rgba(160,100,100,0.35)]"
        style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.94) 0%, rgba(252,240,240,0.9) 100%)", backdropFilter: "blur(14px)" }}>
        <div className="px-6 pt-5 pb-4 border-b border-[var(--gold)]/15">
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>Automated Reminders</p>
          <p className="mt-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "var(--ink)" }}>Appointment: Thursday 10:00am</p>
        </div>
        <div className="p-5 space-y-4">
          {reminders.map((r, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                style={{ background: r.sent ? "rgba(200,168,100,0.2)" : "rgba(30,15,10,0.06)", border: `1px solid ${r.sent ? "rgba(200,168,100,0.5)" : "rgba(30,15,10,0.1)"}` }}>
                {r.sent && <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "9px", height: "9px", color: "var(--gold)" }}><path d="M2.5 8.5L6 12L13.5 4.5" /></svg>}
              </div>
              <div className="flex-1">
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: r.sent ? "var(--gold)" : "rgba(30,15,10,0.35)" }}>{r.time}</p>
                <p className="mt-1 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: r.sent ? "rgba(30,15,10,0.7)" : "rgba(30,15,10,0.35)" }}>{r.msg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewCard() {
  const reviews = [
    { name: "Jessica M.", stars: 5, text: "Absolutely incredible service. My brand has never looked better — I'm getting DMs every single day now.", time: "2 days ago" },
    { name: "Tara L.", stars: 5, text: "I went from zero engagement to booked out in 6 weeks. The content they create is *chef's kiss*.", time: "1 week ago" },
    { name: "Marcus D.", stars: 5, text: "Best investment I've made for my business. Hands down.", time: "2 weeks ago" },
  ];
  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-6 -z-10 rounded-[36px] opacity-60 blur-2xl"
        style={{ background: "radial-gradient(55% 55% at 50% 50%, rgba(200,168,100,0.4), transparent 70%)" }} />
      <div className="relative rounded-[28px] overflow-hidden border border-white/90 shadow-[0_35px_70px_-30px_rgba(160,100,100,0.35)]"
        style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.94) 0%, rgba(255,251,240,0.9) 100%)", backdropFilter: "blur(14px)" }}>
        <div className="px-6 pt-5 pb-4 border-b border-[var(--gold)]/15 flex items-center justify-between">
          <div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>Google Reviews</p>
            <div className="flex items-center gap-2 mt-1">
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 600, color: "var(--ink)", lineHeight: 1 }}>5.0</span>
              <div>
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <span key={i} style={{ color: "#f59e0b", fontSize: "0.75rem" }}>★</span>)}</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: "rgba(30,15,10,0.45)" }}>47 reviews</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(30,15,10,0.4)" }}>New this month</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 600, color: "var(--gold)" }}>+12</p>
          </div>
        </div>
        <div className="p-5 space-y-3.5">
          {reviews.map((r, i) => (
            <div key={i} className="pb-3.5 border-b border-[var(--gold)]/10 last:border-0 last:pb-0">
              <div className="flex items-center justify-between">
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.72rem", letterSpacing: "0.06em", color: "var(--ink)", fontWeight: 500 }}>{r.name}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", color: "rgba(30,15,10,0.35)" }}>{r.time}</p>
              </div>
              <div className="flex gap-0.5 mt-1">{[...Array(r.stars)].map((_, j) => <span key={j} style={{ color: "#f59e0b", fontSize: "0.65rem" }}>★</span>)}</div>
              <p className="mt-1.5 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(30,15,10,0.65)" }}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Services() {
  const items = [
    {
      tag: "Content & Social Media Management",
      title: "Branded content, created and published for you — every day.",
      sub: "Show up consistently without lifting a finger.",
      body: "We handle the strategy, writing, design, and scheduling. Branded posts go live across your platforms on time, every time — captions, hashtags, and visuals all done. You stay focused on running your business.",
      visual: <ContentCalendarCard />,
    },
    {
      tag: "Paid Social & Search Advertising",
      title: "Facebook, Instagram, and Google ads that bring in real leads.",
      sub: "More reach. More bookings. Less guesswork.",
      body: "We build and manage your ad campaigns from scratch — audience targeting, ad creative, budget allocation, and daily optimisation. Every dollar is tracked and working toward your growth.",
      visual: <AnalyticsCard />,
    },
    {
      tag: "Strategy, Analytics & Reporting",
      title: "Always know what's working — and a plan to scale it.",
      sub: "Clear data. Smarter decisions. Every month.",
      body: "Detailed performance reports and a dedicated monthly strategy session keep you in the loop. We track what's growing your business and build the next month's plan around what's working.",
      visual: <CaptionCard />,
    },
    {
      tag: "AI Voice & Chat Automation",
      title: "Never miss a lead — calls, texts, and DMs answered instantly, 24/7.",
      sub: "Your business never sleeps.",
      body: "Our AI answers every call, text, and message the moment it comes in. It qualifies the lead, answers questions, and books the appointment — so no opportunity ever slips through the cracks, even at 2am.",
      visual: <AIChatCard />,
    },
    {
      tag: "Automated Appointment Reminders",
      title: "Reduce no-shows before they happen.",
      sub: "Keep your calendar full and your clients showing up.",
      body: "Automated text and email reminders go out 48 hours, 24 hours, and 2 hours before every appointment. Less no-shows, less chasing, and a more professional experience for your clients — all on autopilot.",
      visual: <ReminderCard />,
    },
    {
      tag: "Review & Reputation Management",
      title: "Build your 5-star presence — automatically.",
      sub: "More reviews. More trust. More new clients.",
      body: "After every appointment, we send a review request to your client. We track your reputation across Google, respond to feedback, and keep your star rating climbing — building social proof that brings in new business on its own.",
      visual: <ReviewCard />,
    },
  ];
  return (
    <section id="services" className="py-24 md:py-32 px-6">
      <SectionTitle
        eyebrow="What We Do"
        title={<>Everything you need to<br />dominate social media.</>}
      />
      <div className="mt-20 max-w-6xl mx-auto space-y-24">
        {items.map((it, i) => (
          <div
            key={it.tag}
            className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
          >
            <div className="[direction:ltr]">
              <Eyebrow>{it.tag}</Eyebrow>
              <h3
                className="text-[var(--ink)] mt-4 leading-tight"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.85rem, 3.2vw, 2.6rem)",
                }}
              >
                {it.title}
              </h3>
              <p
                className="italic text-[var(--rose)] mt-3"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}
              >
                {it.sub}
              </p>
              <p
                className="mt-5 text-[var(--ink)]/70 leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {it.body}
              </p>
            </div>
            <div className="[direction:ltr]">{it.visual}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Pricing ─────────────────────────────────────────── */
function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: "$1,000",
      software: "$97/mo",
      tagline: "Everything you need to get online, get consistent, and start converting.",
      cta: "Get Started →",
      features: [
        "1 platform fully managed for you — nothing to post, nothing to schedule",
        "Online booking system — clients can book appointments directly from your page",
        "Lead funnels & automations that turn your followers into booked appointments",
        "Comment word triggers — someone drops a keyword on your post, they're instantly sent to your landing page",
        "DM automation — every inquiry gets an instant reply that guides them straight to book or buy",
        "AI clone or custom brand character — content that sounds and feels like you, without you filming",
        "Custom content creation matched to your brand voice & identity",
        "Reels, carousels & static posts — 3x per week (12/mo)",
      ],
    },
    {
      name: "Elite",
      price: "$5,000+",
      software: "$497/mo",
      tagline: "Your entire online business — run, managed, and scaled completely for you.",
      featured: true,
      topBadge: { label: "Featured", tone: "gold" as const },
      cta: "Apply for Elite →",
      features: [
        "Everything in Growth — expanded to 5 platforms: Instagram, TikTok, Facebook, LinkedIn & Threads",
        "AI voice agent — answers calls, handles inquiries & books appointments 24/7",
        "Full AI booking system — automated chat, reminders, follow-up & review collection",
        "AI website design & build — a complete, conversion-ready site done for you",
        "Google, Facebook, Instagram & TikTok ad management — all platforms, fully managed",
        "Daily content — 5–7x per week (up to 28 posts/mo) across every platform",
        "Monthly email newsletter — written, designed & sent for you",
        "Priority 48-hour content revisions",
        "Quarterly brand strategy audit & content refresh",
        "Bi-weekly strategy calls & weekly performance reports",
      ],
    },
    {
      name: "Growth",
      price: "$2,500",
      software: "$297/mo",
      tagline: "Your AI clone content, amplified — more platforms, paid ads behind it, and automation closing the loop.",
      cta: "Get a Free Proposal →",
      features: [
        "Everything in Starter — your AI clone content now running across 3 platforms: Instagram, TikTok & Facebook",
        "Automated appointment reminders — reduce no-shows with text & email reminders sent before every booking",
        "Paid ads put money behind your best content — Facebook & Instagram ad management included",
        "Email & SMS automations that follow up with every lead while you sleep",
        "Reputation & review management — 5-star presence built on autopilot",
        "More content, more reach — reels, carousels & static posts 3–5x per week (up to 20/mo)",
        "Monthly strategy call to double down on what's working",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="py-24 md:py-32 px-6"
      style={{
        background:
          "linear-gradient(135deg, #f4dcdc 0%, #f7e6dc 45%, #f1d3cf 100%)",
      }}
    >
      <SectionTitle
        eyebrow="Monthly Plans"
        title="Choose your plan"
        italic="Done-for-you monthly retainer — includes your AI clone or brand character."
      />
      <div className="mt-20 max-w-7xl mx-auto grid md:grid-cols-3 gap-8 lg:gap-10">
        {tiers.map((t) => {
          const isFilled = !!t.featured;
          return (
            <div key={t.name} className={`relative pt-8 ${isFilled ? "md:-mt-4 md:z-10" : ""}`}>
              {t.topBadge && (
                <span
                  className="absolute top-5 left-1/2 -translate-x-1/2 z-10 px-6 py-2 rounded-full text-[10px] tracking-luxe uppercase whitespace-nowrap"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    backgroundColor:
                      t.topBadge.tone === "pink"
                        ? "#c97a7a"
                        : "var(--gold)",
                    color: "var(--ink)",
                    boxShadow:
                      t.topBadge.tone === "pink"
                        ? "0 8px 20px -10px rgba(201,122,122,0.45)"
                        : "0 8px 20px -10px rgba(120,80,60,0.35)",
                  }}
                >
                  {t.topBadge.label}
                </span>
              )}

              <article
                className={`h-full rounded-[28px] p-10 flex flex-col items-center text-center ${isFilled ? "md:py-14" : ""}`}
                style={{
                  background: isFilled
                    ? "var(--ink)"
                    : "linear-gradient(180deg, #fbf3ee 0%, #f6e8e1 100%)",
                  border: isFilled
                    ? "1.5px solid rgba(255,255,255,0.08)"
                    : "1px solid color-mix(in oklab, var(--gold) 35%, transparent)",
                  boxShadow: isFilled
                    ? "0 40px 80px -20px rgba(30,15,10,0.55), 0 0 0 1px rgba(200,168,100,0.15)"
                    : "0 30px 60px -30px rgba(160,110,95,0.35), inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
              >
                {/* Eyebrow */}
                <p
                  className="text-[var(--gold)] text-[11px] tracking-luxe uppercase"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  The {t.name}
                </p>

                {/* Title */}
                <h3
                  className="mt-3 italic"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.75rem, 2.2vw, 2.25rem)",
                    lineHeight: 1.1,
                    color: isFilled ? "var(--cream)" : "var(--ink)",
                  }}
                >
                  {t.name}
                </h3>

                {/* Pill */}
                <div
                  className="mt-5 inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10.5px] tracking-luxe uppercase"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    color: isFilled ? "rgba(250,243,234,0.85)" : "var(--ink)",
                    border: isFilled
                      ? "1px solid rgba(200,168,100,0.35)"
                      : "1px solid color-mix(in oklab, var(--gold) 40%, transparent)",
                    backgroundColor: isFilled
                      ? "rgba(255,255,255,0.07)"
                      : "rgba(255,255,255,0.5)",
                  }}
                >
                  <svg viewBox="0 0 24 22" fill="currentColor" style={{ width: "13px", height: "13px", color: "var(--gold)" }}>
                    <path d="M12 21.6C6.3 16.1 1 11.3 1 7.2 1 3.4 4.1 2 6.3 2c1.3 0 4.2.5 5.7 4.5C13.6 2.5 16.5 2 17.7 2 20.3 2 23 3.6 23 7.2c0 4.1-5.1 8.9-11 14.4z"/>
                  </svg> Monthly Retainer
                </div>
                <p
                  className="mt-1.5 text-center"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: isFilled ? "rgba(250,243,234,0.4)" : "rgba(30,15,10,0.35)" }}
                >
                  3-month minimum if you sign on
                </p>

                {/* Price */}
                <div className="mt-7 flex flex-col items-center">
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(2.5rem, 3.8vw, 3.25rem)",
                      lineHeight: 1,
                      fontStyle: "italic",
                      color: "var(--gold)",
                    }}
                  >
                    {t.price}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.7rem",
                      letterSpacing: "0.2em",
                      color: isFilled ? "rgba(255,255,255,0.45)" : "rgba(30,15,10,0.45)",
                      marginTop: "4px",
                    }}
                  >
                    USD/MO
                  </span>
                </div>

                {/* One-time setup fee */}
                <div
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg"
                  style={{
                    background: isFilled ? "rgba(255,255,255,0.05)" : "rgba(30,15,10,0.04)",
                    border: `1px dashed ${isFilled ? "rgba(255,255,255,0.15)" : "rgba(30,15,10,0.18)"}`,
                  }}
                >
                  <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: isFilled ? "rgba(250,243,234,0.6)" : "rgba(30,15,10,0.5)" }}>
                    + $500 one-time setup fee
                  </span>
                </div>

                {/* Tagline */}
                <p
                  className="mt-5"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.05rem",
                    lineHeight: 1.55,
                    color: isFilled ? "rgba(250,243,234,0.7)" : "rgba(30,15,10,0.75)",
                  }}
                >
                  {t.tagline}
                </p>

                {/* Platform access highlight */}
                <div
                  className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl"
                  style={{
                    background: isFilled ? "rgba(200,168,100,0.12)" : "rgba(200,168,100,0.1)",
                    border: "1px solid rgba(200,168,100,0.35)",
                  }}
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "13px", height: "13px", color: "var(--gold)", flexShrink: 0 }}><path d="M2.5 8.5L6 12L13.5 4.5" /></svg>
                  <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.72rem", color: "var(--gold)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                    Includes platform access — {t.software} value
                  </span>
                </div>

                {/* Features */}
                <ul className="mt-7 space-y-3.5 flex-1 w-full text-left">
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "0.92rem",
                        color: isFilled ? "rgba(250,243,234,0.85)" : "rgba(30,15,10,0.85)",
                      }}
                    >
                      <span
                        className="mt-0.5 shrink-0"
                        style={{ color: isFilled ? "#c97a7a" : "var(--gold)" }}
                      >
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "13px", height: "13px" }}>
                          <path d="M2.5 8.5L6 12L13.5 4.5" />
                        </svg>
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* 14-Day Free Trial badge */}
                <div className="mt-10 w-full text-center">
                  <div
                    className="w-full flex flex-col items-center justify-center gap-1.5 px-4 py-3 rounded-xl"
                    style={{
                      background: isFilled ? "rgba(200,168,100,0.12)" : "rgba(200,168,100,0.1)",
                      border: "1px solid rgba(200,168,100,0.35)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span style={{ color: "var(--gold)", fontSize: "0.6rem" }}>★</span>
                      <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.72rem", color: "var(--gold)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                        Try Free for 14 Days
                      </span>
                      <span style={{ color: "var(--gold)", fontSize: "0.6rem" }}>★</span>
                    </div>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: isFilled ? "rgba(250,243,234,0.45)" : "rgba(30,15,10,0.38)" }}>
                      No obligations · cancel anytime
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className="mt-4 w-full block rounded-2xl px-5 py-4 text-center transition-all hover:-translate-y-0.5 hover:opacity-90"
                  style={{
                    backgroundColor: "var(--gold)",
                    boxShadow: "0 12px 28px -10px rgba(160,110,60,0.5)",
                  }}
                >
                  <p
                    className="text-[var(--ink)] leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontStyle: "italic", fontWeight: 700 }}
                  >
                    Get a Free Proposal
                  </p>
                </a>
              </article>
            </div>
          );
        })}
      </div>

      {/* Setup fee + ad spend notes */}
      <div className="mt-12 max-w-2xl mx-auto rounded-2xl px-8 py-6 text-center space-y-4"
        style={{ background: "rgba(200,168,100,0.07)", border: "1px solid rgba(200,168,100,0.22)" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "var(--ink)", opacity: 0.75, fontStyle: "italic", lineHeight: 1.6 }}>
          <span style={{ color: "var(--gold)", fontStyle: "normal", fontWeight: 600 }}>$500 one-time setup fee</span> — includes complete system buildout, landing pages, calendar integration, automation sequences & CRM setup.
        </p>
        <div style={{ height: "1px", background: "rgba(200,168,100,0.2)" }} />
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "var(--ink)", opacity: 0.7, fontStyle: "italic", lineHeight: 1.6 }}>
          <span style={{ color: "var(--rose)", fontStyle: "normal", fontWeight: 600 }}>* Ad spend is separate</span> — paid directly to Meta. We recommend a minimum of $500/mo for real results.
        </p>
      </div>

      {/* Add-on Services */}
      <div className="mt-20 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[var(--gold)] text-[11px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
            Available on any plan
          </p>
          <h3
            className="mt-3 italic text-[var(--ink)]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}
          >
            Power up your plan
          </h3>
          <p className="mt-3 text-[var(--ink)]/55 italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}>
            Add exactly what your business needs — priced into your custom quote.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: "AI Voice Agent", desc: "Never miss a call. Your AI answers 24/7, qualifies leads, and books appointments — in your brand voice." },
            { title: "Review & Reputation Management", desc: "Automatically request reviews, respond to feedback, and build your 5-star presence on Google and beyond." },
            { title: "Email & SMS Marketing", desc: "Done-for-you campaigns, broadcasts, and nurture sequences that keep your audience warm and ready to buy." },
            { title: "Additional Content Creation", desc: "Need more posts or platforms? Extra content created and scheduled for you — same quality, more volume." },
            { title: "Website & Landing Page Design", desc: "A conversion-ready website or landing page — designed for your brand and built to turn visitors into clients." },
            { title: "Merch & Brand Design", desc: "On-brand merch, apparel, and print-ready assets designed to match your business identity." },
          ].map((addon) => (
            <div
              key={addon.title}
              className="rounded-2xl px-7 py-6 flex gap-4 items-start"
              style={{
                background: "linear-gradient(160deg, rgba(255,255,255,0.7) 0%, rgba(251,240,235,0.6) 100%)",
                border: "1px solid color-mix(in oklab, var(--gold) 30%, transparent)",
                boxShadow: "0 8px 24px -12px rgba(160,110,95,0.2)",
                backdropFilter: "blur(8px)",
              }}
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "14px", height: "14px", color: "var(--gold)", marginTop: "4px", flexShrink: 0 }}>
                <path d="M2.5 8.5L6 12L13.5 4.5" />
              </svg>
              <div>
                <p className="font-medium" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontStyle: "italic", color: "var(--ink)" }}>
                  {addon.title}
                </p>
                <p className="mt-1" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.82rem", color: "rgba(30,15,10,0.62)", lineHeight: 1.55 }}>
                  {addon.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center mt-8 text-[var(--ink)]/45 text-[11px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
          Add-on pricing included in your custom quote · mention it when you apply
        </p>
      </div>
    </section>
  );
}

/* ─── FAQ ─────────────────────────────────────────────── */
/* ─── About ────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-[var(--cream)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <Eyebrow>The Person Behind the Brand</Eyebrow>
          <h2
            className="mt-4 italic text-[var(--ink)]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 4vw, 3rem)", lineHeight: 1.1 }}
          >
            Hi, I'm Mandy
          </h2>
          <Divider />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Photo */}
          <div className="shrink-0 mx-auto">
            <div
              className="w-56 md:w-72 overflow-hidden"
              style={{
                borderRadius: "28px",
                border: "2px solid color-mix(in oklab, var(--gold) 40%, transparent)",
                boxShadow: "0 20px 50px -15px rgba(160,110,95,0.35)",
                aspectRatio: "3/4",
              }}
            >
              <img
                src={mandyPhoto}
                alt="Mandy Fortune — founder of The Dollhouse Brand Studio"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center top" }}
              />
            </div>
          </div>

          {/* Copy */}
          <div className="flex-1 text-center md:text-left">
            <p
              className="text-[var(--ink)]/75 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}
            >
              I'm a social media strategist and brand designer from the Greater Toronto Area — with 11+ years in graphic and product design, building brands for companies, creators, and entrepreneurs. My work has been recognized by <strong>BuzzFeed</strong> and <strong>HuffPost</strong>.
            </p>
            <p
              className="mt-4 text-[var(--ink)]/75 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}
            >
              I built The Dollhouse because I kept seeing the same problem — talented business owners with incredible products, invisible online. Not because they weren't good enough, but because they were too busy running their business to show up consistently.
            </p>
            <p
              className="mt-4 text-[var(--ink)]/75 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}
            >
              So I built a system that does it for them. AI-powered, done-for-you, and built to convert.
            </p>

            {/* Divider */}
            <div className="mt-7 flex items-center gap-3 justify-center md:justify-start">
              <span className="h-px w-10 bg-[var(--gold)] opacity-40" />
              <span style={{ color: "var(--gold)", fontSize: "0.6rem" }}>♥</span>
              <span className="h-px w-10 bg-[var(--gold)] opacity-40" />
            </div>

            {/* As seen in */}
            <div className="mt-5 flex flex-wrap items-center gap-4 justify-center md:justify-start">
              <span
                className="text-[var(--ink)]/40 text-[9px] tracking-[0.2em] uppercase"
                style={{ fontFamily: "'Jost', sans-serif" }}
              >
                As seen in
              </span>
              <a
                href="https://www.buzzfeed.com/sarahrohoman/black-owned-stores-etsy-canada"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontStyle: "italic", color: "var(--gold)", borderBottom: "1px solid color-mix(in oklab, var(--gold) 40%, transparent)", paddingBottom: "1px" }}
              >
                BuzzFeed
              </a>
              <a
                href="https://www.huffpost.com/entry/get-out-and-vote-merch-election-2020_l_5f344d83c5b6960c066fef03"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:opacity-70 transition-opacity"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", color: "var(--ink)", borderBottom: "1px solid color-mix(in oklab, var(--ink) 25%, transparent)", paddingBottom: "1px" }}
              >
                HuffPost
              </a>
            </div>

            {/* Stats */}
            <div className="mt-7 flex gap-10 justify-center md:justify-start">
              {[["11 Years", "Brand & Design"], ["500+", "Brands Helped"]].map(([value, label]) => (
                <div key={value}>
                  <p
                    className="italic text-[var(--rose)]"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", lineHeight: 1 }}
                  >
                    {value}
                  </p>
                  <p
                    className="mt-1 text-[var(--ink)]/45 text-[9px] tracking-[0.2em] uppercase"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Comparison Table ─────────────────────────────────── */
function ComparisonTable() {
  const rows = [
    { feature: "Done-for-you content & posting",       dh: true,  agency: true,  diy: false },
    { feature: "AI clone or custom brand character",   dh: true,  agency: false, diy: false },
    { feature: "Custom content matched to brand voice",  dh: true,  agency: false, diy: false },
    { feature: "Short-form video production",          dh: true,  agency: false, diy: false },
    { feature: "Automation & CRM included",            dh: true,  agency: false, diy: false },
    { feature: "Lead & booking automation",            dh: true,  agency: false, diy: false },
    { feature: "AI voice agent available",             dh: true,  agency: false, diy: false },
    { feature: "Transparent pricing",                  dh: true,  agency: false, diy: false },
    { feature: "Month-to-month after 3 months",        dh: true,  agency: false, diy: true  },
  ];

  const Check = ({ val }: { val: boolean }) =>
    val ? (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "15px", height: "15px", color: "var(--gold)", display: "inline-block" }}>
        <path d="M2.5 8.5L6 12L13.5 4.5" />
      </svg>
    ) : (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: "13px", height: "13px", color: "rgba(30,15,10,0.2)", display: "inline-block" }}>
        <path d="M4 4L12 12M12 4L4 12" />
      </svg>
    );

  return (
    <section className="py-24 px-6" style={{ background: "linear-gradient(180deg, var(--blush) 0%, var(--cream) 100%)" }}>
      <SectionTitle
        eyebrow="Why The Dollhouse"
        title="How we compare"
        italic="Not all agencies are built the same."
      />

      <div className="mt-16 max-w-4xl mx-auto overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="pb-6 text-left w-1/2" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(30,15,10,0.4)", fontWeight: 500 }}>
                Feature
              </th>
              {[
                { label: "The Dollhouse", featured: true },
                { label: "Other Agencies", featured: false },
                { label: "DIY", featured: false },
              ].map(({ label, featured }) => (
                <th
                  key={label}
                  className="pb-6 text-center"
                  style={{ fontFamily: featured ? "'Cormorant Garamond', serif" : "'Jost', sans-serif", fontSize: featured ? "1.1rem" : "0.7rem", fontStyle: featured ? "italic" : "normal", letterSpacing: featured ? "0.02em" : "0.18em", textTransform: "uppercase", color: featured ? "var(--ink)" : "rgba(30,15,10,0.4)", fontWeight: featured ? 600 : 500 }}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.feature}
                style={{ borderTop: "1px solid color-mix(in oklab, var(--gold) 18%, transparent)" }}
              >
                <td
                  className="py-4 pr-6"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.85rem", color: "rgba(30,15,10,0.7)" }}
                >
                  {row.feature}
                </td>
                <td
                  className="py-4 text-center"
                  style={{
                    background: i === 0
                      ? "linear-gradient(180deg, rgba(200,168,100,0.07) 0%, rgba(200,168,100,0.07) 100%)"
                      : "rgba(200,168,100,0.07)",
                  }}
                >
                  <Check val={row.dh} />
                </td>
                <td className="py-4 text-center"><Check val={row.agency} /></td>
                <td className="py-4 text-center"><Check val={row.diy} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-10 text-center">
          <a
            href="#contact"
            className="btn-ink"
          >
            Get a Free Proposal <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs: [string, string][] = [
    ["What does 'done-for-you' actually mean?", "Everything — content creation, posting, scheduling, automation setup, ad management, and reporting. You get a full system running in the background while you focus on your business. No tools to learn, no content to make, nothing to manage."],
    ["What is the AI clone or brand character?", "We create either an AI version of you (your face, your voice, your energy — generating content without you filming) or a custom brand mascot/character designed specifically for your business. Both are used to post consistently and promote your brand on autopilot."],
    ["What's included in the $500 setup fee?", "A complete system buildout — landing pages, calendar integration, automated follow-up sequences, CRM setup, and everything configured and ready before your first month begins. This is a one-time fee."],
    ["How does the system turn traffic into leads and booked appointments?", "We build automated funnels that capture visitors, follow up instantly via SMS and email, and book them directly into your calendar — without you lifting a finger. Most leads are contacted within minutes of opting in."],
    ["What platforms do you manage?", "It depends on your plan. Starter covers 1 platform of your choice. Growth covers Instagram, TikTok & Facebook. Elite covers Instagram, TikTok, Facebook, LinkedIn & Threads — fully managed across all five. We post where your audience is."],
    ["Is there a minimum commitment?", "Yes — we start with 3 months to build momentum, train the AI to your brand voice, and start seeing real results. After that it's month-to-month with no long-term contract required."],
    ["Do I have to approve content before it goes live?", "Yes. Every post goes into your content calendar for approval before it's scheduled. We keep it simple so it takes minutes, not hours."],
    ["What kinds of businesses do you work with?", "Local service businesses, boutique brands, coaches, creatives, and anyone who wants to show up online consistently without doing it themselves."],
    ["What are the add-on services?", "AI voice agents (handles your calls 24/7), review and reputation management, email and SMS marketing, additional content, website design, and merch design. Ask about pricing when you get your quote."],
    ["Is pricing in USD?", "Yes, all pricing is in USD. Plans start at $1,000/mo with a $500 one-time setup fee."],
    ["What is your refund policy?", "All sales are final — we do not offer refunds. Once your system is built and your plan is active, the work has begun. If you have concerns at any point, reach out and we'll work through it together."],
  ];
  return (
    <section id="faq" className="py-24 md:py-32 px-6">
      <SectionTitle eyebrow="Common Questions" title="FAQ" />
      <div className="mt-12 max-w-3xl mx-auto space-y-3">
        {faqs.map(([q, a]) => (
          <details
            key={q}
            className="group rounded-xl bg-white/65 backdrop-blur-sm border border-white/80 overflow-hidden"
          >
            <summary className="cursor-pointer list-none px-6 py-5 flex justify-between items-center">
              <span
                className="text-[var(--ink)]"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem" }}
              >
                {q}
              </span>
              <span className="text-[var(--rose)] text-2xl transition-transform group-open:rotate-45">+</span>
            </summary>
            <p
              className="px-6 pb-6 text-[var(--ink)]/70 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem" }}
            >
              {a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ─── Contact ─────────────────────────────────────────── */
function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [hasWebsite, setHasWebsite] = useState("Yes");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    // Convert FormData to JSON for more reliable delivery
    const payload: Record<string, string> = {};
    data.forEach((value, key) => { payload[key] = value as string; });
    try {
      const res = await fetch("https://formspree.io/f/mwvrvrzj", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
      });
      if (res.ok) {
        setStatus("done");
        form.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        console.error("Formspree error:", json);
        setStatus("error");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setStatus("error");
    }
  }

  const inputClass = "w-full rounded-xl bg-white/60 border border-[var(--gold)]/30 px-5 py-3.5 text-[var(--ink)] placeholder:text-[var(--ink)]/35 focus:outline-none focus:border-[var(--rose)] transition";
  const inputStyle = { fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" };
  const labelClass = "block text-[10px] tracking-luxe uppercase text-[var(--gold)] mb-2";
  const labelStyle = { fontFamily: "'Jost', sans-serif" };

  return (
    <section id="contact" className="py-24 md:py-32 px-6">
      <SectionTitle
        eyebrow="Get Started"
        title={<>Ready to grow<br />your business?</>}
        italic="Tell us about your business and we'll reach out within 24 hours."
      />

      <form
        onSubmit={handleSubmit}
        className="mt-12 max-w-xl mx-auto rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_25px_50px_-25px_rgba(180,120,120,0.3)] p-8 md:p-10 space-y-5"
      >
        {/* First / Last */}
        <div className="grid grid-cols-2 gap-4">
          {([["First Name", "first_name", "Jane"], ["Last Name", "last_name", "Doe"]] as const).map(([label, name, ph]) => (
            <div key={name}>
              <label className={labelClass} style={labelStyle}>{label} *</label>
              <input type="text" name={name} placeholder={ph} required className={inputClass} style={inputStyle} />
            </div>
          ))}
        </div>

        {/* Phone / Email */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass} style={labelStyle}>Phone *</label>
            <input type="tel" name="phone" placeholder="(555) 000-0000" required className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Email *</label>
            <input type="email" name="email" placeholder="you@brand.co" required className={inputClass} style={inputStyle} />
          </div>
        </div>

        {/* Plan */}
        <div>
          <label className={labelClass} style={labelStyle}>Which plan interests you?</label>
          <select name="plan" className={inputClass} style={inputStyle}>
            <option>Starter — $1,000/mo</option>
            <option>Growth — $2,500/mo</option>
            <option>Elite — $5,000+/mo</option>
            <option>Not sure yet</option>
          </select>
        </div>

        {/* Website? */}
        <div>
          <label className={labelClass} style={labelStyle}>Do you have a website?</label>
          <select
            name="has_website"
            value={hasWebsite}
            onChange={(e) => setHasWebsite(e.target.value)}
            className={inputClass}
            style={inputStyle}
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        {/* Website URL — shown only if Yes */}
        {hasWebsite === "Yes" && (
          <div>
            <label className={labelClass} style={labelStyle}>Website URL</label>
            <input type="url" name="website" placeholder="https://yourbrand.com" className={inputClass} style={inputStyle} />
          </div>
        )}

        {/* Message */}
        <div>
          <label className={labelClass} style={labelStyle}>Your Message</label>
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us about your business and what you're looking to achieve..."
            className={`${inputClass} resize-none`}
            style={inputStyle}
          />
        </div>

        {status === "error" && (
          <div className="rounded-xl px-5 py-4 text-center" style={{ background: "rgba(180,60,60,0.08)", border: "1px solid rgba(180,60,60,0.25)" }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", color: "#b43c3c", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Something went wrong — please email us directly at{" "}
              <a href="mailto:hello@shopdollhouse.co" style={{ textDecoration: "underline", color: "#b43c3c" }}>
                hello@shopdollhouse.co
              </a>
            </p>
          </div>
        )}

        {status === "done" && (
          <div className="rounded-xl px-5 py-4 text-center" style={{ background: "rgba(200,168,100,0.1)", border: "1px solid rgba(200,168,100,0.3)" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", color: "var(--ink)", opacity: 0.8 }}>
              Thank you — we'll be in touch within 24 hours ♡
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "sending" || status === "done"}
          className="w-full rounded-xl bg-[var(--ink)] text-[var(--cream)] py-4 text-[11px] tracking-luxe uppercase hover:opacity-90 transition disabled:opacity-60"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          {status === "sending" ? "Sending..." : "Send my free proposal request →"}
        </button>
      </form>
    </section>
  );
}

/* ─── Starter Kit Banner ───────────────────────────────── */
function StarterKitBanner() {
  return (
    <section className="py-20 px-6 text-center" style={{ background: "linear-gradient(135deg, #f4dcdc 0%, #f7e6dc 45%, #f1d3cf 100%)" }}>
      <p
        className="text-[var(--gold)] text-[11px] tracking-luxe uppercase"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        Not ready for a full retainer?
      </p>
      <h2
        className="mt-4 italic text-[var(--ink)]"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1 }}
      >
        Start with the Starter Kit
      </h2>
      <p
        className="mt-4 text-[var(--ink)]/65 max-w-md mx-auto"
        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", lineHeight: 1.6 }}
      >
        The Blueprint, Brand Workbook & AI Prompt Kit — build your brand foundation. Start from $17, or get all three for $127.
      </p>
      <Link
        to="/starter-kit"
        className="mt-8 inline-flex items-center gap-2 rounded-2xl px-8 py-4 hover:-translate-y-0.5 transition-all"
        style={{ backgroundColor: "var(--ink)", color: "var(--cream)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontStyle: "italic", fontWeight: 700 }}
      >
        Explore the Starter Kit →
      </Link>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-[var(--gold)]/15 py-12 px-6 text-center">
      <span
        className="text-[var(--ink)]/50 font-normal block"
        style={{ fontFamily: "'Allura', cursive", fontSize: "18px", letterSpacing: "1px", textTransform: "lowercase", lineHeight: 1 }}
      >
        the
      </span>
      <span
        className="text-[var(--ink)] italic inline-block"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", letterSpacing: "4px", textTransform: "uppercase", marginTop: "-4px" }}
      >
        Dollhouse
      </span>
      <p
        className="text-[var(--gold)] font-semibold mt-1"
        style={{ fontFamily: "'Jost', sans-serif", fontSize: "6.5px", letterSpacing: "3px", textTransform: "uppercase" }}
      >
        Brand Studio
      </p>
      <div className="mt-6 flex items-center justify-center gap-2">
        <span className="h-px w-8 bg-[var(--gold)]/30" />
        <span className="text-[var(--gold)]/50 text-[0.5rem]">♥</span>
        <span className="h-px w-8 bg-[var(--gold)]/30" />
      </div>
      <Link
        to="/starter-kit"
        className="mt-4 inline-block text-[var(--gold)] text-[10px] tracking-[0.2em] uppercase hover:opacity-70 transition-opacity"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        Start with the Starter Kit →
      </Link>
      <p
        className="text-xs text-[var(--ink)]/35 mt-8"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        © {new Date().getFullYear()} The Dollhouse Brand Studio. All rights reserved.
      </p>
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
  return (
    <main className="bg-[var(--blush)] text-[var(--ink)]">
      <Nav />
      <Hero />
      <TrustBar />
      <Services />
      <About />
      <Pricing />
      <ComparisonTable />
      <FAQ />
      <Contact />
      <StarterKitBanner />
      <Footer />
      <BackToTop />
    </main>
  );
}
