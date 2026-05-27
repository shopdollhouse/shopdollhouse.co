import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import bgImage from "@/assets/password-bg.jpg";
import roseAccent from "@/assets/rose-accent.png";
import archMark from "@/assets/arch-mark.svg";

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
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
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
              style={{ fontFamily: "'Allura', cursive", fontSize: "18px", letterSpacing: "1px", textTransform: "lowercase" }}
            >
              the
            </span>
            <span
              className="text-[var(--ink)] italic"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", letterSpacing: "4px", textTransform: "uppercase" }}
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
            Book a Call
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
            Book a Call
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
      {/* Soft vignette to lift text contrast */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(247,228,223,0.35) 75%, rgba(247,228,223,0.6) 100%)",
        }}
      />
      {/* Decorative arches */}
      <DoorIcon className="hidden lg:block absolute top-[18%] left-[6%] w-14 h-20 text-[var(--gold)]/35 reveal-soft" />
      <DoorIcon className="hidden lg:block absolute bottom-[14%] right-[7%] w-20 h-28 text-[var(--gold)]/45 reveal-soft" />

      <div className="relative z-10 w-full max-w-[680px] text-center">
        {/* Soft white blur halo behind logo + header for readability */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none"
          style={{
            width: "min(120%, 780px)",
            height: "110%",
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.6) 35%, rgba(255,255,255,0.25) 60%, rgba(255,255,255,0) 80%)",
            filter: "blur(28px)",
          }}
        />
        <div
          className="reveal inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/55 bg-white/40 backdrop-blur-md px-5 py-2 text-[var(--gold)]"
          style={{ animationDelay: "0.05s" }}
        >
          <LockIcon className="w-3 h-3" />
          <span
            className="text-[10px] tracking-luxe uppercase font-medium"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Done-For-You Social Media
          </span>
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
          className="reveal mt-4 text-[var(--gold)] text-[11px] tracking-luxe uppercase"
          style={{ fontFamily: "'Jost', sans-serif", animationDelay: "0.4s" }}
        >
          brand studio
        </p>

        <div className="reveal" style={{ animationDelay: "0.5s" }}>
          <Divider />
        </div>

        <p
          className="reveal mt-2 text-[var(--ink)]/80 leading-relaxed max-w-md mx-auto"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "1rem",
            animationDelay: "0.55s",
          }}
        >
          Your business, everywhere online. AI-powered social media content,
          scheduling, and analytics — done for you, every single day.
        </p>

        <div
          className="reveal mt-9 flex flex-col items-center justify-center gap-4"
          style={{ animationDelay: "0.65s" }}
        >
          <a href="#pricing" className="btn-ink">
            Book a Discovery Call <span aria-hidden>→</span>
          </a>
          <div
            className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/40 bg-white/40 backdrop-blur-sm px-4 py-1.5 text-[var(--gold)]"
          >
            <span style={{ fontSize: "0.65rem" }}>★</span>
            <span
              className="text-[10px] tracking-luxe uppercase font-medium"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              14-day free trial
            </span>
          </div>
          <a href="#services" className="btn-ghost">
            See how it works <span aria-hidden>↓</span>
          </a>
        </div>

        <p
          className="reveal mt-7 text-[var(--ink)]/55 italic text-sm"
          style={{ fontFamily: "'Cormorant Garamond', serif", animationDelay: "0.75s" }}
        >
          3-month minimum · All communication by email
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
  const logos = ["Meta", "OpenAI", "TikTok", "Google", "Stripe"];
  return (
    <section className="py-14 px-6 bg-[var(--cream)]/60 backdrop-blur-sm border-y border-[var(--gold)]/15">
      <p
        className="text-center text-[10px] tracking-luxe uppercase text-[var(--gold)]"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        Powered by the same infrastructure trusted by 500,000+ businesses
      </p>
      <div className="mt-7 flex flex-wrap justify-center items-center gap-x-14 gap-y-4 text-[var(--ink)]/60">
        {logos.map((l) => (
          <span
            key={l}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem" }}
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
  ];
  return (
    <section id="services" className="py-24 md:py-32 px-6">
      <SectionTitle
        eyebrow="What's Inside"
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
      tagline: "Get visible. Get consistent.",
      trial: "14-day free trial",
      cta: "Get Started →",
      features: [
        "1 Account",
        "AI automation",
        "1 AI Agent",
        "Social media management (1 platform)",
        "Content creation & scheduling",
        "Branded posts published for you",
        "Caption & hashtag writing",
        "Monthly analytics report",
      ],
    },
    {
      name: "Elite",
      price: "$5,000+",
      tagline: "Full-service. Everything handled.",
      featured: true,
      topBadge: { label: "Most Popular", tone: "gold" as const },
      cta: "Apply for Elite →",
      features: [
        "5 Accounts",
        "AI automation",
        "Complete AI Agents",
        "Facebook & Instagram ad management",
        "Social media management (all platforms)",
        "Google ad campaigns",
        "Review & reputation management",
        "Email & SMS marketing campaigns",
        "Website or landing page funnel",
        "Bi-weekly strategy calls",
        "Weekly performance reports",
      ],
    },
    {
      name: "Growth",
      price: "$2,500",
      tagline: "More reach. More leads. More revenue.",
      cta: "Book a Call →",
      features: [
        "3 Accounts",
        "AI automation",
        "2 AI Agents",
        "Social media management (all platforms)",
        "Social media ad creation & management",
        "Email marketing automations",
        "Content calendar & strategy",
        "Advanced analytics dashboard",
        "Monthly strategy session",
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
        eyebrow="Style Packages"
        title="Choose your plan"
        italic="Done-for-you monthly retainer. 3-month minimum."
      />
      <div className="mt-20 max-w-7xl mx-auto grid md:grid-cols-3 gap-8 lg:gap-10">
        {tiers.map((t) => {
          const isFilled = !!t.featured;
          return (
            <div key={t.name} className="relative pt-8">
              {t.topBadge && (
                <span
                  className="absolute -top-1 left-1/2 -translate-x-1/2 z-10 px-6 py-2 rounded-full text-[10px] tracking-luxe uppercase whitespace-nowrap"
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
                className="h-full rounded-[28px] p-10 flex flex-col items-center text-center"
                style={{
                  background:
                    "linear-gradient(180deg, #fbf3ee 0%, #f6e8e1 100%)",
                  border:
                    isFilled
                      ? "1.5px solid rgba(201,122,122,0.45)"
                      : "1px solid color-mix(in oklab, var(--gold) 35%, transparent)",
                  boxShadow: isFilled
                    ? "0 30px 60px -30px rgba(201,122,122,0.35), inset 0 1px 0 rgba(255,255,255,0.6)"
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
                  className="mt-3 italic text-[var(--ink)]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.75rem, 2.2vw, 2.25rem)",
                    lineHeight: 1.1,
                  }}
                >
                  {t.name}
                </h3>

                {/* Pill */}
                <div
                  className="mt-5 inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10.5px] tracking-luxe uppercase"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    color: "var(--ink)",
                    border:
                      "1px solid color-mix(in oklab, var(--gold) 40%, transparent)",
                    backgroundColor: "rgba(255,255,255,0.5)",
                  }}
                >
                  <span style={{ color: "var(--gold)" }}>✦</span> Monthly Retainer
                </div>

                {/* 14-Day Free Trial badge */}
                <div
                  className="mt-4 w-full rounded-xl px-5 py-3 text-center"
                  style={{
                    backgroundColor: "var(--gold)",
                    boxShadow: "0 8px 24px -10px rgba(160,110,60,0.45)",
                    minWidth: "200px",
                  }}
                >
                  <p
                    className="text-[var(--ink)] font-bold leading-tight"
                    style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.95rem" }}
                  >
                    14-Day Free Trial
                  </p>
                  <p
                    className="text-[var(--ink)]/75 mt-0.5"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem" }}
                  >
                    No obligations, no contracts, cancel at any time
                  </p>
                </div>

                {/* Price */}
                <div className="mt-7 flex items-baseline gap-2">
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(2.5rem, 3.8vw, 3.25rem)",
                      lineHeight: 1,
                      fontStyle: "italic",
                    }}
                  >
                    {t.price}
                  </span>
                  <span
                    className="text-[var(--ink)]/55"
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.8rem",
                      letterSpacing: "0.15em",
                    }}
                  >
                    USD/MO
                  </span>
                </div>

                {/* Tagline */}
                <p
                  className="mt-6 text-[var(--ink)]/75"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.05rem",
                    lineHeight: 1.55,
                  }}
                >
                  {t.tagline}
                </p>

                {/* Divider w/ heart */}
                <div className="mt-7 flex items-center gap-3">
                  <span
                    className="flex-1 h-px"
                    style={{
                      background:
                        isFilled
                          ? "linear-gradient(90deg, transparent, rgba(201,122,122,0.5), transparent)"
                          : "linear-gradient(90deg, transparent, color-mix(in oklab, var(--gold) 50%, transparent), transparent)",
                    }}
                  />
                  <span style={{ color: isFilled ? "#c97a7a" : "var(--gold)", fontSize: "0.7rem" }}>♥</span>
                  <span
                    className="flex-1 h-px"
                    style={{
                      background:
                        isFilled
                          ? "linear-gradient(90deg, transparent, rgba(201,122,122,0.5), transparent)"
                          : "linear-gradient(90deg, transparent, color-mix(in oklab, var(--gold) 50%, transparent), transparent)",
                    }}
                  />
                </div>

                {/* Features */}
                <ul className="mt-7 space-y-3.5 flex-1">
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 text-[var(--ink)]/85"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "0.92rem",
                      }}
                    >
                      <span
                        className="mt-1 shrink-0"
                        style={{ color: isFilled ? "#c97a7a" : "var(--gold)", fontSize: "0.7rem" }}
                      >
                        ✦
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className="mt-10 block text-center rounded-full text-[11px] tracking-luxe uppercase px-8 py-4 transition hover:opacity-90"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    ...(isFilled
                      ? {
                          backgroundColor: "var(--ink)",
                          color: "var(--cream)",
                        }
                      : {
                          backgroundColor: "transparent",
                          color: "var(--ink)",
                          border: "1.5px solid var(--ink)",
                        }),
                  }}
                >
                  {t.cta}
                </a>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ─── FAQ ─────────────────────────────────────────────── */
function FAQ() {
  const faqs: [string, string][] = [
    ["What does 'done-for-you' actually mean?", "We handle everything — strategy, writing, design, scheduling, ad management, and reporting. You approve, we execute. No tools to learn, no calendars to manage."],
    ["What platforms do you manage?", "Instagram, TikTok, Facebook, and Google. Email and SMS marketing are included on Growth and Elite plans."],
    ["How do you learn my brand voice?", "We start with a kickoff questionnaire and onboarding session, then refine your voice with every approved post. Within 30 days it sounds like you wrote it yourself."],
    ["Do I have to approve content before it goes live?", "Yes. Every post is queued in your private content calendar for approval before scheduling — but we keep it lightweight so it never becomes a bottleneck."],
    ["Is there a minimum commitment?", "All retainers have a 3-month minimum. After that, month-to-month."],
    ["Is pricing in USD?", "Yes, all pricing is listed in USD."],
    ["What kinds of businesses do you work with?", "Local service businesses, boutique brands, and creator-led companies that want to show up online without doing it themselves."],
    ["What's included in the Elite funnel or website build?", "A custom landing page or single-page funnel designed to convert your ad traffic — copy, design, and tracking included."],
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

/* ─── Starter Kit CTA ─────────────────────────────────── */
function StarterKitCTA() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-4xl mx-auto bg-[var(--ink)] text-[var(--cream)] rounded-2xl p-12 md:p-16 text-center relative overflow-hidden">
        <img
          src={roseAccent}
          alt=""
          loading="lazy"
          className="absolute -top-10 -right-10 w-56 opacity-25 pointer-events-none"
        />
        <Eyebrow>Just Starting Out?</Eyebrow>
        <h2
          className="text-[var(--cream)] mt-3"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.25rem, 4vw, 3.25rem)" }}
        >
          Build your brand first
        </h2>
        <p
          className="text-[var(--cream)]/75 mt-5 max-w-xl mx-auto leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Not ready for a retainer yet? The Starter Kit gives you the Brand Kit,
          AI Prompt Kit, and Brand Workbook — everything you need to build a
          solid brand foundation.
        </p>
        <Link
          to="/starter-kit"
          className="mt-8 inline-block rounded-full bg-[var(--cream)] text-[var(--ink)] text-[11px] tracking-luxe uppercase px-8 py-4 hover:opacity-90 transition"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          See the Starter Kit →
        </Link>
      </div>
    </section>
  );
}

/* ─── Contact ─────────────────────────────────────────── */
function Contact() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="contact" className="py-24 md:py-32 px-6">
      <SectionTitle
        eyebrow="Get Started"
        title={<>Ready to grow<br />your business?</>}
        italic="Tell us about your business and we'll reach out within 24 hours."
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="mt-12 max-w-xl mx-auto rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_25px_50px_-25px_rgba(180,120,120,0.3)] p-8 md:p-10 space-y-5"
      >
        {([
          ["Your Name", "text", "Jane Doe"],
          ["Business Name", "text", "Your Brand"],
          ["Email Address", "email", "you@brand.co"],
        ] as const).map(([label, type, ph]) => (
          <div key={label}>
            <label
              className="block text-[10px] tracking-luxe uppercase text-[var(--gold)] mb-2"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              {label}
            </label>
            <input
              type={type}
              placeholder={ph}
              required
              className="w-full rounded-xl bg-white/60 border border-[var(--gold)]/30 px-5 py-3.5 text-[var(--ink)] placeholder:text-[var(--ink)]/35 focus:outline-none focus:border-[var(--rose)] transition"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}
            />
          </div>
        ))}
        <div>
          <label
            className="block text-[10px] tracking-luxe uppercase text-[var(--gold)] mb-2"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Which plan interests you?
          </label>
          <select
            className="w-full rounded-xl bg-white/60 border border-[var(--gold)]/30 px-5 py-3.5 text-[var(--ink)] focus:outline-none focus:border-[var(--rose)] transition"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}
          >
            <option>Starter — $1,000/mo</option>
            <option>Growth — $2,500/mo</option>
            <option>Elite — $5,000+/mo</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-[var(--ink)] text-[var(--cream)] py-4 text-[11px] tracking-luxe uppercase hover:opacity-90 transition"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          {submitted ? "Thank you — we'll be in touch ♡" : "Book my discovery call →"}
        </button>
      </form>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-[var(--gold)]/15 py-12 px-6 text-center">
      <span
        className="text-[var(--ink)]/50 font-normal block"
        style={{ fontFamily: "'Allura', cursive", fontSize: "18px", letterSpacing: "1px", textTransform: "lowercase" }}
      >
        the
      </span>
      <span
        className="text-[var(--ink)] italic inline-block"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", letterSpacing: "4px", textTransform: "uppercase" }}
      >
        Dollhouse
      </span>
      <p
        className="text-[var(--gold)] font-semibold mt-1"
        style={{ fontFamily: "'Jost', sans-serif", fontSize: "6.5px", letterSpacing: "3px", textTransform: "uppercase" }}
      >
        Brand Studio
      </p>
      <p
        className="text-xs text-[var(--ink)]/45 mt-6"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        © {new Date().getFullYear()} The Dollhouse. All rights reserved.
      </p>
    </footer>
  );
}

function Index() {
  return (
    <main className="bg-[var(--blush)] text-[var(--ink)]">
      <Nav />
      <Hero />
      <TrustBar />
      <Services />
      <Pricing />
      <FAQ />
      <StarterKitCTA />
      <Contact />
      <Footer />
    </main>
  );
}
