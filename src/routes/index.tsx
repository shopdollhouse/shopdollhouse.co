import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  BarChart3,
  Bot,
  Check,
  ClipboardClock,
  Inbox,
  MessageSquare,
  PhoneCall,
  Play,
  Printer,
  Search,
  ShieldCheck,
  Sparkles,
  SquareMousePointer,
  Star,
  Video,
} from "lucide-react";
import bgImage from "@/assets/password-bg.jpg";
import signatureBrandingBg from "@/assets/signature-branding-bg.jpg";
import archMark from "@/assets/arch-mark.svg";
import mandyPhoto from "@/assets/mandy-photo.jpg";
import mandyAIClonePreview from "@/assets/mandy-ai-clone-preview.jpg";
import { managedServiceLinks, systemServices } from "@/lib/system-services";

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

const systemIconMap = {
  website: SquareMousePointer,
  phone: PhoneCall,
  print: Printer,
  inbox: Inbox,
  bot: Bot,
  search: Search,
  star: Star,
  campaign: ClipboardClock,
  message: MessageSquare,
};

const PlanFeatureIcon = ({ index, filled }: { index: number; filled: boolean }) => {
  const color = filled ? "#c97a7a" : "var(--gold)";
  const bg = filled ? "rgba(201,122,122,0.13)" : "rgba(200,168,100,0.13)";
  const icons = [
    <path key="spark" d="M8 1.8l1.45 4.25L13.7 7.5 9.45 8.95 8 13.2 6.55 8.95 2.3 7.5l4.25-1.45L8 1.8Z" />,
    <path key="play" d="M5.2 3.4v9.2l7.4-4.6-7.4-4.6Z" />,
    <path key="chat" d="M3 4.2h10v6.3H8.2L5 13.1v-2.6H3V4.2Z" />,
    <path key="calendar" d="M3 4.4h10v8.2H3V4.4Zm0 2.4h10M5.4 2.9v2.4M10.6 2.9v2.4" />,
    <path key="chart" d="M3 12.3h10M4.5 10.6V8.2M8 10.6V5.4M11.5 10.6V3.7" />,
    <path key="phone" d="M5.1 2.9l1.2 2.5-1.1 1.1c.9 1.8 2.4 3.2 4.2 4.2l1.1-1.1 2.5 1.2-.7 2.2c-.2.5-.7.8-1.2.7C6 13 2.9 9.9 2.3 4.9c-.1-.5.2-1 .7-1.2l2.1-.8Z" />,
  ];

  return (
    <span
      className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
      style={{ background: bg, color }}
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" style={{ width: "14px", height: "14px" }}>
        {icons[index % icons.length]}
      </svg>
    </span>
  );
};

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
  const [systemsOpen, setSystemsOpen] = useState(false);

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
          Founding client offer — try us free for 14 days
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
            <div
              className="relative"
              onMouseEnter={() => setSystemsOpen(true)}
              onMouseLeave={() => setSystemsOpen(false)}
            >
              <button
                type="button"
                aria-expanded={systemsOpen}
                onClick={() => setSystemsOpen((value) => !value)}
                className="nav-link hover:text-[var(--rose)] transition-colors inline-flex items-center gap-1.5 bg-transparent border-0 p-0 uppercase cursor-pointer"
              >
                Systems
                <span className="text-[var(--gold)] text-[9px]">⌄</span>
              </button>
              <div
                className={`absolute left-1/2 top-full z-50 mt-0 w-[860px] -translate-x-1/2 rounded-[26px] p-5 pt-10 transition-all duration-200 ${
                  systemsOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
                style={{
                  background: "color-mix(in oklab, var(--cream) 96%, white)",
                  border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)",
                  boxShadow: "0 34px 80px -40px rgba(70,35,25,0.42)",
                }}
              >
                <div className="flex items-center justify-between border-b border-[var(--gold)]/18 pb-4 mb-4">
                  <p className="text-[var(--ink)] text-[13px] normal-case tracking-normal" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 700 }}>
                    Services & Systems
                  </p>
                  <a href="#services" className="text-[var(--gold)] text-[9px] tracking-luxe uppercase hover:text-[var(--rose)]">
                    Main services
                  </a>
                </div>
                <div className="mb-5">
                  <p className="mb-2 text-[var(--gold)] text-[9px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
                    Managed Growth Services
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {managedServiceLinks.map((service) => (
                      <a
                        key={service.href}
                        href={service.href}
                        className="rounded-2xl px-3 py-2.5 hover:bg-white/70 transition-colors"
                      >
                        <span className="block text-[var(--ink)] normal-case tracking-normal leading-tight" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.76rem", fontWeight: 700 }}>
                          {service.title}
                        </span>
                        <span className="mt-1 block text-[var(--ink)]/48 normal-case tracking-normal leading-snug" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.66rem" }}>
                          {service.short}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
                <p className="mb-2 text-[var(--gold)] text-[9px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
                  Systems & Automation Pages
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {systemServices.map((service) => {
                    const Icon = systemIconMap[service.icon as keyof typeof systemIconMap];
                    return (
                      <a
                        key={service.slug}
                        href={`/systems/${service.slug}`}
                        className="group/item rounded-2xl p-3 flex gap-3 hover:bg-white/70 transition-colors"
                      >
                        <span
                          className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            background: "rgba(200,168,100,0.1)",
                            border: "1px solid rgba(200,168,100,0.18)",
                            color: "var(--ink)",
                          }}
                        >
                          <Icon size={18} strokeWidth={1.8} />
                        </span>
                        <span>
                          <span className="block text-[var(--ink)] normal-case tracking-normal leading-tight" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.78rem", fontWeight: 700 }}>
                            {service.title}
                          </span>
                          <span className="mt-1 block text-[var(--ink)]/48 normal-case tracking-normal leading-snug" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem" }}>
                            {service.short}
                          </span>
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
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
          <div className="pt-2 border-t border-[var(--gold)]/20">
            <p className="block mb-3">
              Systems
            </p>
            <p className="mb-2 text-[var(--gold)] text-[9px] tracking-luxe uppercase">
              Managed Services
            </p>
            <div className="grid gap-2 normal-case tracking-normal mb-4">
              {managedServiceLinks.map((service) => (
                <a
                  key={service.href}
                  href={service.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-white/50 border border-[var(--gold)]/15 px-3 py-2 text-[var(--ink)]/70"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem" }}
                >
                  {service.title}
                </a>
              ))}
            </div>
            <p className="mb-2 text-[var(--gold)] text-[9px] tracking-luxe uppercase">
              Systems Pages
            </p>
            <div className="grid gap-2 normal-case tracking-normal">
              {systemServices.map((service) => (
                <a
                  key={service.slug}
                  href={`/systems/${service.slug}`}
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-white/50 border border-[var(--gold)]/15 px-3 py-2 text-[var(--ink)]/70"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem" }}
                >
                  {service.title}
                </a>
              ))}
            </div>
          </div>
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
            fontWeight: 400,
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
              Custom proposal in 48 hours
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
          14-day free trial for founding clients · Then continue only if it feels like a fit
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
function PlatformSymbol({ name }: { name: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.35,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "Meta") {
    return (
      <svg viewBox="0 0 48 32" aria-hidden className="h-8 w-12">
        <path {...common} d="M6 23c4.2-12.4 8.4-18 13-18 3.3 0 6.4 4.5 9.8 9.6C32.8 20.6 36.5 26 41 26c3.6 0 5.8-3 5.8-7.1 0-6-4.6-13.9-10.4-13.9-4.5 0-8.9 5.9-12.4 12.1C20.4 23.5 17.4 26 13.6 26 9 26 5.2 22 5.2 17.8c0-3.6 2.4-6.5 5.6-6.5 2.8 0 5.5 2.1 8.5 6.4" />
      </svg>
    );
  }

  if (name === "Google") {
    return (
      <svg viewBox="0 0 40 40" aria-hidden className="h-8 w-8">
        <circle {...common} cx="18" cy="18" r="10" />
        <path {...common} d="M25 25l7 7M18 13v10M13 18h10" />
      </svg>
    );
  }

  if (name === "TikTok") {
    return (
      <svg viewBox="0 0 36 40" aria-hidden className="h-8 w-8">
        <path {...common} d="M20 6v22.5a7 7 0 1 1-7-7" />
        <path {...common} d="M20 8c2 5.4 5.4 8.2 10 8.6" />
      </svg>
    );
  }

  if (name === "Instagram") {
    return (
      <svg viewBox="0 0 40 40" aria-hidden className="h-8 w-8">
        <rect {...common} x="8" y="8" width="24" height="24" rx="8" />
        <circle {...common} cx="20" cy="20" r="6" />
        <circle cx="27" cy="13" r="1.6" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 40 40" aria-hidden className="h-8 w-8">
      <rect {...common} x="9" y="12" width="22" height="20" rx="3" />
      <path {...common} d="M15 12V9.5A2.5 2.5 0 0 1 17.5 7h5A2.5 2.5 0 0 1 25 9.5V12M15 18v8M20 18v8M25 18v8" />
      <circle cx="15" cy="15" r="1.3" fill="currentColor" />
    </svg>
  );
}

function TrustBar() {
  const logos = ["Meta", "Instagram", "TikTok"];
  return (
    <section className="py-14 px-6 bg-[var(--cream)]/60 backdrop-blur-sm border-y border-[var(--gold)]/15">
      <p
        className="text-center text-[10px] tracking-luxe uppercase text-[var(--gold)]"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        Built for the 3 platforms your clients already use
      </p>
      <div className="mt-7 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-[var(--ink)]/60">
        {logos.map((l) => (
          <div
            key={l}
            className="group flex min-w-24 flex-col items-center gap-3 transition-colors hover:text-[var(--rose)]"
          >
            <span
              className="flex h-14 w-14 items-center justify-center rounded-full border bg-white/45 text-[var(--gold)] transition-transform group-hover:-translate-y-0.5"
              style={{
                borderColor: "color-mix(in oklab, var(--gold) 34%, transparent)",
                boxShadow: "0 16px 34px -28px rgba(90,45,35,0.55)",
              }}
            >
              <PlatformSymbol name={l} />
            </span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.35rem",
              }}
            >
              {l}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── How It Works ───────────────────────────────────── */
function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Apply for a private proposal",
      body: "Tell us what you sell, where leads are getting stuck, and which level of support feels right. We review the business before recommending a plan.",
    },
    {
      num: "02",
      title: "We map the growth system",
      body: "We turn your offer into a content, ads, AI clone, and follow-up plan with clear deliverables, setup timeline, and add-ons where they make sense.",
    },
    {
      num: "03",
      title: "We launch, manage, and improve",
      body: "Your content goes live, automations respond, reports show what is working, and each month is adjusted around the strongest path to more bookings.",
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6" style={{ background: "linear-gradient(180deg, var(--cream) 0%, #f8e9e5 100%)" }}>
      <SectionTitle
        eyebrow="The Process"
        title="How we take it off your plate"
        italic="A simple handoff, then a managed system."
      />
      <div className="mt-16 max-w-5xl mx-auto grid md:grid-cols-3 gap-5 relative">
        {/* Connector line between steps */}
        <div
          aria-hidden
          className="hidden md:block absolute top-12 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(200,168,100,0.4) 20%, rgba(200,168,100,0.4) 80%, transparent)" }}
        />
        {steps.map((step) => (
          <div
            key={step.num}
            className="flex flex-col items-center text-center rounded-[28px] px-6 py-8 relative z-10"
            style={{
              background: "rgba(255,250,246,0.72)",
              border: "1px solid color-mix(in oklab, var(--gold) 24%, transparent)",
              boxShadow: "0 24px 58px -42px rgba(90,45,35,0.38)",
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center relative z-10"
              style={{
                background: "linear-gradient(160deg, rgba(255,255,255,0.95), rgba(251,240,235,0.9))",
                border: "1px solid color-mix(in oklab, var(--gold) 40%, transparent)",
                boxShadow: "0 10px 30px -12px rgba(200,168,100,0.4)",
              }}
            >
              <span
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontStyle: "italic", color: "var(--gold)" }}
              >
                {step.num}
              </span>
            </div>
            <h3
              className="mt-6 text-[var(--ink)]"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.45rem", lineHeight: 1.2 }}
            >
              {step.title}
            </h3>
            <p
              className="mt-3 text-[var(--ink)]/60 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}
            >
              {step.body}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-12 max-w-3xl mx-auto rounded-2xl px-6 py-5 text-center" style={{ background: "rgba(255,250,246,0.58)", border: "1px solid color-mix(in oklab, var(--gold) 22%, transparent)" }}>
        <p className="text-[var(--ink)]/58 leading-7" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem" }}>
          You are not buying another dashboard to manage. You are handing us the system so your brand can show up, respond, follow up, and convert consistently.
        </p>
      </div>
      <div className="mt-10 text-center">
        <a href="#contact" className="btn-ink">
          Get my free proposal <span aria-hidden>→</span>
        </a>
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
        <img
          src={signatureBrandingBg}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.16] mix-blend-multiply"
          style={{ objectPosition: "left bottom" }}
        />
        <div
          className="relative px-7 pt-6 pb-5"
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

        <div className="relative px-7 pb-7">
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
              { image: mandyAIClonePreview, label: "Reel" },
              { image: signatureBrandingBg, label: "Story" },
              { image: mandyPhoto, label: "Post" },
            ].map((p, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-lg relative overflow-hidden"
                style={{ background: "rgba(255,250,246,0.8)" }}
              >
                <img
                  src={p.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ filter: "saturate(0.9) contrast(0.98)", opacity: 0.82 }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(30,15,10,0.04), rgba(30,15,10,0.42))",
                  }}
                />
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
        <img
          src={signatureBrandingBg}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12] mix-blend-multiply"
          style={{ objectPosition: "left bottom" }}
        />
        <div
          className="relative px-7 pt-6 pb-6"
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

        <div className="relative px-7 pb-7">
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
        <div className="relative px-5 pt-5 pb-2 border-b border-[var(--gold)]/15 flex items-center gap-3">
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
        <div className="relative p-5 space-y-3">
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
        <div className="relative px-6 pt-5 pb-4 border-b border-[var(--gold)]/15">
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>Automated Reminders</p>
          <p className="mt-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "var(--ink)" }}>Appointment: Thursday 10:00am</p>
        </div>
        <div className="relative p-5 space-y-4">
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
        <div className="relative px-6 pt-5 pb-4 border-b border-[var(--gold)]/15 flex items-center justify-between">
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
        <div className="relative p-5 space-y-3.5">
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
      id: "service-content-social-media-management",
      tag: "Content & Social Media Management",
      title: "Branded content, created and published for you — every day.",
      sub: "Show up consistently without lifting a finger.",
      body: "We handle the strategy, writing, design, and scheduling. Branded posts go live across your platforms on time, every time — captions, hashtags, and visuals all done. You stay focused on running your business.",
      visual: <ContentCalendarCard />,
    },
    {
      id: "service-paid-social-search-advertising",
      tag: "Paid Social & Search Advertising",
      title: "Facebook, Instagram, and Google ads that bring in real leads.",
      sub: "More reach. More bookings. Less guesswork.",
      body: "We build and manage your ad campaigns from scratch — audience targeting, ad creative, budget allocation, and daily optimisation. Every dollar is tracked and working toward your growth.",
      visual: <AnalyticsCard />,
    },
    {
      id: "service-strategy-analytics-reporting",
      tag: "Strategy, Analytics & Reporting",
      title: "Always know what's working — and a plan to scale it.",
      sub: "Clear data. Smarter decisions. Every month.",
      body: "Detailed performance reports and a dedicated monthly strategy session keep you in the loop. We track what's growing your business and build the next month's plan around what's working.",
      visual: <CaptionCard />,
    },
    {
      id: "service-ai-voice-chat-automation",
      tag: "AI Voice & Chat Automation",
      title: "Never miss a lead — calls, texts, and DMs answered instantly, 24/7.",
      sub: "Your business never sleeps.",
      body: "Our AI answers every call, text, and message the moment it comes in. It qualifies the lead, answers questions, and books the appointment — so no opportunity ever slips through the cracks, even at 2am.",
      visual: <AIChatCard />,
    },
    {
      id: "service-automated-appointment-reminders",
      tag: "Automated Appointment Reminders",
      title: "Reduce no-shows before they happen.",
      sub: "Keep your calendar full and your clients showing up.",
      body: "Automated text and email reminders go out 48 hours, 24 hours, and 2 hours before every appointment. Less no-shows, less chasing, and a more professional experience for your clients — all on autopilot.",
      visual: <ReminderCard />,
    },
    {
      id: "service-review-reputation-management",
      tag: "Review & Reputation Management",
      title: "Build your 5-star presence — automatically.",
      sub: "More reviews. More trust. More new clients.",
      body: "After every appointment, we send a review request to your client. We track your reputation across Google, respond to feedback, and keep your star rating climbing — building social proof that brings in new business on its own.",
      visual: <ReviewCard />,
    },
  ];
  return (
    <section id="services" className="scroll-mt-32 py-24 md:py-32 px-6">
      <SectionTitle
        eyebrow="What We Do"
        title={<>Everything you need to<br />dominate social media.</>}
      />
      <div className="mt-20 max-w-6xl mx-auto space-y-24">
        {items.map((it, i) => (
          <div
            key={it.tag}
            id={it.id}
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
function AICloneSection() {
  const before = [
    "Filming takes hours and you still run out of ideas",
    "You post once, disappear, then feel behind again",
    "Your best offers never get enough visibility",
    "Being on camera slows your whole content system down",
  ];
  const after = [
    "Your face and voice show up without filming every week",
    "Your signature offer gets packaged into repeatable content",
    "Your profile looks consistent, polished, and conversion-ready",
    "We build the strategy, clone assets, posts, and automation for you",
  ];
  const included = [
    { icon: Video, title: "AI Clone Video Setup", desc: "We create your avatar direction, clone workflow, hooks, scripts, and launch-ready video system." },
    { icon: Sparkles, title: "3 Signature Videos", desc: "Three high-impact AI clone videos designed to introduce, educate, and sell your offer." },
    { icon: BarChart3, title: "12 Monthly Posts", desc: "Reels, carousels, and static posts planned around authority, proof, education, and conversion." },
    { icon: MessageSquare, title: "Comment-to-DM Flow", desc: "People who engage can get an instant private message that moves them toward the next step." },
    { icon: ShieldCheck, title: "Approval Before Posting", desc: "You review the content before anything goes live, so the brand still feels like you." },
    { icon: Bot, title: "Monthly Performance Snapshot", desc: "Clear reporting on reach, content, engagement, and what we are improving next." },
  ];
  const bonuses = [
    { icon: BarChart3, title: "Free Social Media Audit", desc: "A practical review of what's working, what's missing, and what we will clean up first." },
    { icon: PhoneCall, title: "Custom Voice AI Agent", desc: "A simple lead-response agent for missed calls, common questions, and booking support." },
    { icon: MessageSquare, title: "Nurture Automations", desc: "Follow-up flows that keep warm leads moving after they comment, message, or inquire." },
  ];

  return (
    <section
      className="relative py-24 md:py-32 px-5 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 70% 48% at 50% 18%, rgba(255,255,255,0.88), transparent 64%), radial-gradient(ellipse 54% 42% at 86% 8%, rgba(210,150,140,0.2), transparent 70%), linear-gradient(135deg, #f3d6d0 0%, #fbf1ed 48%, #ead0c9 100%)",
      }}
    >
      <img
        src={signatureBrandingBg}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.22] mix-blend-multiply"
        style={{ objectPosition: "left top" }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 68% 50% at 50% 22%, rgba(255,250,246,0.94), rgba(255,250,246,0.76) 58%, rgba(255,250,246,0.28) 82%), linear-gradient(90deg, rgba(251,241,237,0.42) 0%, rgba(251,241,237,0.84) 68%, rgba(251,241,237,0.92) 100%)",
        }}
      />
      <DoorIcon className="pointer-events-none absolute right-10 top-1/2 hidden h-32 w-20 opacity-25 md:block" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div
            className="inline-flex items-center gap-3 rounded-full px-7 py-3 mb-9 text-[10px] tracking-luxe uppercase font-semibold"
            style={{
              fontFamily: "'Jost', sans-serif",
              color: "var(--gold)",
              background: "rgba(255,250,246,0.58)",
              border: "1px solid color-mix(in oklab, var(--gold) 45%, transparent)",
              boxShadow: "0 18px 50px -32px rgba(90,45,35,0.45)",
            }}
          >
            <span>✦</span>
            Signature Offer - Starter Plan
            <span>✦</span>
          </div>
          <DoorIcon className="mx-auto mb-7 h-14 w-10 opacity-50" />
          <p
            className="mb-1 italic"
            style={{
              fontFamily: "'Allura', cursive",
              color: "var(--gold)",
              fontSize: "clamp(2.6rem, 5vw, 4rem)",
              lineHeight: 0.9,
            }}
          >
            your own
          </p>
          <h2
            className="reveal mx-auto max-w-4xl"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3.7rem, 8.2vw, 7.6rem)",
              fontWeight: 400,
              color: "var(--rose)",
              lineHeight: 0.9,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              marginBottom: 26,
            }}
          >
            AI Clone
          </h2>
          <Divider />
          <h3
            className="mx-auto mt-8 max-w-4xl italic"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4.2vw, 4rem)",
              color: "var(--rose)",
              lineHeight: 1.1,
            }}
          >
            Built Completely Done For You.
          </h3>
          <p
            className="reveal max-w-2xl mx-auto mt-8"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(1rem, 1.8vw, 1.18rem)",
              color: "rgba(30,15,10,0.62)",
              lineHeight: 1.8,
            }}
          >
            We turn your face, voice, expertise, and offer into a polished content system that keeps showing up online while you run the business.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-8 lg:gap-10 items-center mb-16 md:mb-20">
          <div
            className="relative rounded-[30px] p-4 sm:p-5"
            style={{
              background: "rgba(255,250,246,0.75)",
              border: "1px solid color-mix(in oklab, var(--gold) 38%, transparent)",
              boxShadow: "0 34px 90px -48px rgba(90,45,35,0.55), inset 0 1px 0 rgba(255,255,255,0.72)",
            }}
          >
            <div
              className="aspect-[16/11] rounded-[24px] relative overflow-hidden flex items-end justify-center"
              style={{
                background:
                  "linear-gradient(180deg, rgba(30,15,10,0.06) 0%, rgba(30,15,10,0.45) 100%)",
              }}
            >
              <div className="absolute top-4 left-4 right-4 z-10 grid grid-cols-2 gap-3">
                <span
                  className="rounded-full px-3 py-2 text-center font-semibold"
                  style={{
                    background: "rgba(255,250,246,0.96)",
                    color: "var(--ink)",
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.64rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    boxShadow: "0 10px 22px -14px rgba(30,15,10,0.55)",
                  }}
                >
                  Real Photo
                </span>
                <span
                  className="rounded-full px-3 py-2 text-center font-semibold"
                  style={{
                    background: "rgba(255,250,246,0.96)",
                    color: "var(--gold)",
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.64rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    boxShadow: "0 10px 22px -14px rgba(30,15,10,0.55)",
                  }}
                >
                  AI Clone
                </span>
              </div>
              <div className="absolute inset-0 grid grid-cols-2">
                <div className="relative overflow-hidden" style={{ background: "rgba(255,250,246,0.68)" }}>
                  <img src={mandyPhoto} alt="Real portrait reference" className="h-full w-full object-cover" style={{ filter: "saturate(0.96) contrast(1.02)", objectPosition: "center 18%" }} />
                </div>
                <div className="relative overflow-hidden" style={{ background: "rgba(255,250,246,0.68)" }}>
                  <img src={mandyAIClonePreview} alt="AI clone example portrait preview" className="h-full w-full object-cover" style={{ filter: "saturate(0.98) contrast(1.02)", objectPosition: "center 14%" }} />
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 top-0 z-[1] w-px -translate-x-1/2 bg-[rgba(255,250,246,0.72)]" />
              <button type="button" aria-label="Play AI clone preview" className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-105" style={{ background: "var(--ink)", color: "var(--cream)", boxShadow: "0 20px 42px -16px rgba(30,15,10,0.75)" }}>
                <Play size={25} fill="currentColor" strokeWidth={0} className="ml-1" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl p-5" style={{ background: "rgba(255,250,246,0.72)", border: "1px solid rgba(201,122,122,0.25)" }}>
                <p className="text-[10px] tracking-[0.16em] uppercase mb-4 font-bold" style={{ fontFamily: "'Jost', sans-serif", color: "var(--rose)" }}>Without an AI clone</p>
                <div className="space-y-3">
                  {before.map((t) => (
                    <div key={t} className="flex gap-3 items-start">
                      <span className="mt-1 h-4 w-4 rounded-full flex items-center justify-center text-[10px] font-black shrink-0" style={{ background: "rgba(201,122,122,0.12)", color: "var(--rose)" }}>x</span>
                      <p className="m-0 text-sm leading-6" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(30,15,10,0.68)" }}>{t}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-5" style={{ background: "rgba(255,250,246,0.72)", border: "1px solid color-mix(in oklab, var(--gold) 42%, transparent)" }}>
                <p className="text-[10px] tracking-[0.16em] uppercase mb-4 font-bold" style={{ fontFamily: "'Jost', sans-serif", color: "var(--gold)" }}>With your Dollhouse clone</p>
                <div className="space-y-3">
                  {after.map((t) => (
                    <div key={t} className="flex gap-3 items-start">
                      <span className="mt-1 h-4 w-4 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(200,168,100,0.14)", color: "var(--gold)" }}><Check size={11} strokeWidth={3} /></span>
                      <p className="m-0 text-sm leading-6" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(30,15,10,0.68)" }}>{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-5 sm:p-6" style={{ background: "rgba(255,250,246,0.78)", border: "1px solid color-mix(in oklab, var(--gold) 38%, transparent)", boxShadow: "0 22px 60px -42px rgba(90,45,35,0.55)" }}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-[10px] tracking-[0.16em] uppercase mb-2 font-bold" style={{ fontFamily: "'Jost', sans-serif", color: "var(--gold)" }}>Starter Plan</p>
                  <p className="m-0 italic text-4xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--rose)" }}>$1,000/mo</p>
                  <p className="m-0 mt-1 text-sm" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(30,15,10,0.52)" }}>plus $500 one-time setup</p>
                </div>
                <div className="rounded-2xl px-5 py-4 text-left sm:text-right" style={{ background: "rgba(255,255,255,0.5)", color: "var(--ink)", border: "1px solid rgba(200,168,100,0.24)" }}>
                  <p className="m-0 text-[10px] tracking-[0.16em] uppercase font-bold" style={{ fontFamily: "'Jost', sans-serif" }}>Launch Timeline</p>
                  <p className="m-0 mt-1 text-xl italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--rose)" }}>Built in week 1</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <p className="text-center text-[10px] tracking-luxe uppercase mb-3 font-semibold" style={{ fontFamily: "'Jost', sans-serif", color: "var(--gold)" }}>Here's a breakdown of what you get</p>
          <h3 className="text-center mb-8 italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(2rem, 4vw, 3.4rem)", color: "var(--rose)" }}>A content engine with your clone at the center</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {included.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-5" style={{ background: "rgba(255,250,246,0.75)", border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)", boxShadow: "0 18px 48px -38px rgba(90,45,35,0.55)" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(200,168,100,0.12)", color: "var(--gold)" }}><Icon size={18} strokeWidth={1.8} /></div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontStyle: "italic", color: "var(--ink)", marginBottom: 8, lineHeight: 1.25 }}>{title}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: "rgba(30,15,10,0.56)", lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-12 md:mb-16">
          <p className="text-center text-[10px] tracking-luxe uppercase mb-3 font-semibold" style={{ fontFamily: "'Jost', sans-serif", color: "var(--gold)" }}>Included implementation assets</p>
          <h3 className="text-center mb-8 italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "clamp(1.9rem, 3.8vw, 3.2rem)", color: "var(--rose)" }}>Everything we need to make your content system convert</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {bonuses.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-5" style={{ background: "rgba(255,250,246,0.72)", border: "1px solid color-mix(in oklab, var(--gold) 32%, transparent)" }}>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="px-3 py-1 rounded-full text-[9px] tracking-[0.16em] uppercase font-bold" style={{ fontFamily: "'Jost', sans-serif", background: "rgba(200,168,100,0.12)", color: "var(--gold)" }}>Included</div>
                  <Icon size={20} color="var(--gold)" strokeWidth={1.8} />
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontStyle: "italic", color: "var(--ink)", marginBottom: 8 }}>{title}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: "rgba(30,15,10,0.56)", lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <a href="#contact" className="inline-flex items-center justify-center transition-transform hover:-translate-y-0.5" style={{ padding: "18px 38px", borderRadius: 999, background: "var(--ink)", color: "var(--cream)", fontFamily: "'Jost', sans-serif", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", fontWeight: 700, boxShadow: "0 22px 44px -18px rgba(30,15,10,0.65)" }}>
            Get my free proposal →
          </a>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: "rgba(30,15,10,0.52)", marginTop: 18 }}>
            One proposal covers your plan, AI clone setup, automations, add-ons, and launch timeline.
          </p>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [contractTerm, setContractTerm] = useState<"3" | "6" | "12">("3");
  const fullPlanBonus = contractTerm === "3" ? "No bonus month on 3-month starts" : "Growth plan bonus: last month free";
  const displayPrice = (monthlyPrice: number) => `$${monthlyPrice.toLocaleString()}`;

  const tiers = [
    {
      name: "Foundation",
      price: "$297",
      monthlyPrice: 297,
      software: "Website + CRM",
      fit: "Best for getting the lead system in place",
      outcome: "A functional website and follow-up system that turns inquiries into text conversations.",
      tagline: "For service businesses that need the website, missed-call, review, and follow-up foundation before full marketing management.",
      setupLabel: "+ $500 setup fee",
      trialAvailable: false,
      badgeLabel: "Lead automation included",
      supportNote: "no AI clone or social posting included",
      cta: "Ask About Foundation →",
      features: [
        "Functional 10-20 page website built to create text conversations",
        "Website chat, quote forms, SMS confirmations, and clickable phone numbers",
        "Automated lead follow-up so new inquiries get an instant text response",
        "Missed call text-back so warm leads hear from you right away",
        "5-star review funnel with private feedback step before public reviews",
        "One-click referral and return-customer campaigns",
        "On-site SEO basics — keywords, alt tags, schema, image optimization, and page-speed cleanup",
      ],
    },
    {
      name: "Content Lite",
      price: "$500",
      monthlyPrice: 500,
      software: "1 platform",
      fit: "Best for a polished starting point",
      outcome: "One platform with consistent static posts and carousels.",
      tagline: "Light content support for businesses that are not ready for the full AI clone or automation system yet.",
      setupLabel: "+ $500 setup fee",
      trialAvailable: false,
      badgeLabel: "Simple content package",
      supportNote: "no AI clone or automation included",
      cta: "Ask About Content Lite →",
      features: [
        "1 platform of your choice — Facebook, Instagram or TikTok",
        "3 posts per week — static posts and carousels only",
        "Offer-led content direction so posts support what you sell",
        "On-brand captions written for clarity, trust, and simple calls to action",
        "Content approval before posting — you review before anything goes live",
        "Monthly performance snapshot — what posted, what worked, and what to improve next",
      ],
    },
    {
      name: "Starter",
      price: "$1,000",
      monthlyPrice: 1000,
      software: "$300/mo",
      fit: "Best for focused launches",
      outcome: "One platform, one clear offer, one polished content system.",
      tagline: "Social media management + a full back-end conversion system — done for you, every day.",
      setupLabel: "+ $500 setup fee",
      cta: "Get Started →",
      features: [
        "1 platform of your choice — Facebook, Instagram or TikTok — fully managed, nothing to post",
        "AI clone or custom brand mascot — trained to your face, voice & energy in week 1",
        "3 AI clone videos pinned at the top — your signature content, always front and centre",
        "12 posts/month — 4 Reels · 4 Carousels · 4 Static posts, all on-brand",
        "Content approval before posting — you see and approve everything before it goes live",
        "Starter content strategy — offer angle, content pillars, caption direction & posting rhythm",
        "Comment-to-DM automation — anyone who comments gets an instant private message turning them into a lead",
        "Basic lead follow-up setup — CRM pipeline, booking link, and nurture flow connected during setup",
        "Monthly performance snapshot — follower growth, reach, top posts & next steps in plain English",
      ],
    },
    {
      name: "Growth",
      price: "$2,500",
      monthlyPrice: 2500,
      software: "$300/mo",
      fit: "Best for consistent lead flow",
      outcome: "All 3 social platforms, paid Meta ads, voice AI, and follow-up automation.",
      tagline: "Facebook, Instagram, and TikTok fully managed — more content, paid ads, and strategy built in.",
      featured: true,
      topBadge: { label: "Best for Lead Flow", tone: "pink" as "gold" | "pink" },
      setupLabel: "+ $500 setup fee",
      cta: "Get a Free Proposal →",
      features: [
        "3 platforms fully managed — Facebook, Instagram & TikTok — nothing to post, nothing to think about",
        "AI clone or custom brand mascot/character across all 3 platforms",
        "6 AI clone videos/month — 2 pinned per platform, always your best content front and centre",
        "24 posts/month — 8 per platform across all 3 (Reels · Carousels · Static), all on-brand",
        "Content approval before posting — you see and approve everything before it goes live",
        "Dedicated content strategy — hashtag research, caption writing & optimal posting times",
        "Paid Meta ads management — Facebook & Instagram campaigns built, managed & optimised",
        "Comment-to-DM automation + text follow-up AI bot across Facebook, Instagram & TikTok",
        "Voice AI receptionist — answers missed calls & books appointments 24/7",
        "Missed call text-back — anyone who calls gets an automatic text reply instantly",
        "Automated appointment reminders — text & email sent before every booking",
        "Monthly strategy call + monthly performance report — clear results in plain English",
        "Review management — automated review requests after every appointment",
      ],
    },
  ];
  const appointmentBooking = {
    name: "Appointment Booking",
    price: "$500",
    summary:
      "A focused setup for businesses that need leads to book faster: calendar connection, booking flow, confirmations, and appointment reminders.",
    features: ["Booking calendar setup", "Confirmation text/email flow", "Reminder sequence", "Simple lead handoff"],
  };

  return (
    <section
      id="pricing"
      className="scroll-mt-32 py-24 md:py-32 px-6"
      style={{
        background:
          "linear-gradient(135deg, #f4dcdc 0%, #f7e6dc 45%, #f1d3cf 100%)",
      }}
    >
      <SectionTitle
        eyebrow="Monthly Plans"
        title="Choose your plan"
        italic="Start with the foundation, then scale into the managed growth system when you are ready."
      />

      <div className="mt-8 flex flex-col items-center gap-3">
        <div
          className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full px-3 py-3"
          style={{
            background: "rgba(255,250,246,0.6)",
            border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)",
            boxShadow: "0 18px 42px -34px rgba(120,70,55,0.45)",
          }}
        >
          {[
            { value: "3", label: "3 Months", note: "Start here" },
            { value: "6", label: "6 Months", note: "Last month free on Growth" },
            { value: "12", label: "12 Months", note: "Last month free on Growth" },
          ].map((option) => {
            const active = contractTerm === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setContractTerm(option.value as "3" | "6" | "12")}
                className="rounded-full px-5 py-2.5 transition-all"
                style={{
                  background: active ? "var(--ink)" : "rgba(255,255,255,0.42)",
                  border: active ? "1px solid var(--ink)" : "1px solid rgba(200,168,100,0.22)",
                  color: active ? "var(--cream)" : "rgba(30,15,10,0.62)",
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        <p
          className="text-center"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "0.68rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: contractTerm === "3" ? "rgba(30,15,10,0.45)" : "var(--rose)",
            fontWeight: 600,
          }}
        >
          {fullPlanBonus}
        </p>
      </div>

      <div
        className="mt-12 max-w-5xl mx-auto grid gap-3 md:grid-cols-3 rounded-[28px] p-3"
        style={{
          background: "rgba(255,250,246,0.5)",
          border: "1px solid color-mix(in oklab, var(--gold) 22%, transparent)",
        }}
      >
        {[
          ["Start At $297", "Build the website, follow-up, missed-call, review, and SEO foundation first."],
          ["Every Plan", "All monthly plans include a $500 setup fee for onboarding, buildout, and launch prep."],
          ["Full Plan Bonus", "On 6-month or 12-month Growth contracts, the last month is free."],
        ].map(([title, copy]) => (
          <div key={title} className="rounded-2xl px-5 py-4 text-center" style={{ background: "rgba(255,255,255,0.5)" }}>
            <p className="text-[var(--gold)] text-[10px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>{title}</p>
            <p className="mt-2 text-[var(--ink)]/58 leading-6" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.84rem" }}>{copy}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-7">
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
                <p
                  className="mt-3 text-[10px] tracking-[0.18em] uppercase"
                  style={{ fontFamily: "'Jost', sans-serif", color: isFilled ? "rgba(200,168,100,0.86)" : "var(--gold)" }}
                >
                  {t.fit}
                </p>

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
                  </svg> {contractTerm}-Month Agreement
                </div>
                {t.trialAvailable === false ? (
                  <div
                    className="mt-3 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2"
                    style={{
                      background: isFilled ? "rgba(200,168,100,0.14)" : "rgba(200,168,100,0.12)",
                      border: "1px solid rgba(200,168,100,0.3)",
                      color: "var(--gold)",
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.62rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                    }}
                  >
                    <Sparkles size={12} strokeWidth={1.8} />
                    {t.badgeLabel ?? "Entry package"}
                  </div>
                ) : (
                  <div
                    className="mt-3 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2"
                    style={{
                      background: isFilled ? "rgba(201,122,122,0.16)" : "rgba(201,122,122,0.1)",
                      border: "1px solid rgba(201,122,122,0.28)",
                      color: isFilled ? "rgba(250,243,234,0.9)" : "var(--rose)",
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.62rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                    }}
                  >
                    <Sparkles size={12} strokeWidth={1.8} />
                    14-day free trial available
                  </div>
                )}
                <p
                  className="mt-1.5 text-center"
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: isFilled ? "rgba(250,243,234,0.4)" : "rgba(30,15,10,0.35)" }}
                >
                  {contractTerm === "3" ? "3-month option available for now" : contractTerm === "6" ? "6-month contract option" : "12-month contract option"}
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
                    {displayPrice(t.monthlyPrice)}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.5rem",
                      letterSpacing: "0.2em",
                      color: isFilled ? "rgba(255,255,255,0.45)" : "rgba(30,15,10,0.45)",
                      marginTop: "4px",
                    }}
                  >
                    /MO
                  </span>
                  {t.featured && contractTerm !== "3" && (
                    <span
                      className="mt-2 rounded-full px-3 py-1"
                      style={{
                        background: "rgba(201,122,122,0.1)",
                        color: "var(--rose)",
                        border: "1px solid rgba(201,122,122,0.22)",
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "0.56rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                      }}
                    >
                      last month free
                    </span>
                  )}
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
                    {t.setupLabel ?? "+ $500 setup fee"}
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

                <div
                  className="mt-5 w-full rounded-2xl px-5 py-4"
                  style={{
                    background: isFilled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.48)",
                    border: isFilled ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(200,168,100,0.22)",
                  }}
                >
                  <p className="text-[9px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif", color: "var(--gold)" }}>
                    Designed to create
                  </p>
                  <p
                    className="mt-2 leading-6"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.86rem",
                      color: isFilled ? "rgba(250,243,234,0.72)" : "rgba(30,15,10,0.62)",
                    }}
                  >
                    {t.outcome}
                  </p>
                </div>

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
                    Includes platform access — {t.software}
                  </span>
                </div>

                {/* Features */}
                <ul className="mt-7 space-y-3.5 flex-1 w-full text-left">
                  {t.features.map((f, idx) => (
                    <li
                      key={f}
                      className="flex items-start gap-3"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "0.92rem",
                        color: isFilled ? "rgba(250,243,234,0.85)" : "rgba(30,15,10,0.85)",
                      }}
                    >
                      <PlanFeatureIcon index={idx} filled={isFilled} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Proposal badge */}
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
                        Custom launch plan included
                      </span>
                      <span style={{ color: "var(--gold)", fontSize: "0.6rem" }}>★</span>
                    </div>
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

      <div
        className="mt-10 max-w-5xl mx-auto rounded-[28px] p-6 md:p-7 grid lg:grid-cols-[0.72fr_1fr] gap-6 items-center"
        style={{
          background: "rgba(255,250,246,0.62)",
          border: "1px solid color-mix(in oklab, var(--gold) 30%, transparent)",
          boxShadow: "0 26px 70px -48px rgba(120,70,55,0.45)",
        }}
      >
        <div>
          <p className="text-[var(--gold)] text-[10px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
            Focused Setup
          </p>
          <h3
            className="mt-2 italic text-[var(--ink)]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.85rem, 3vw, 2.7rem)", lineHeight: 1.05 }}
          >
            {appointmentBooking.name}
          </h3>
          <div className="mt-3 flex items-end gap-2">
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.7rem", fontStyle: "italic", color: "var(--gold)", lineHeight: 1 }}>
              {appointmentBooking.price}
            </span>
            <span className="mb-1 text-[var(--ink)]/42 text-[10px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
              setup
            </span>
          </div>
          <p className="mt-4 text-[var(--ink)]/62 leading-7" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.94rem" }}>
            {appointmentBooking.summary}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {appointmentBooking.features.map((feature, index) => (
            <div
              key={feature}
              className="rounded-2xl px-4 py-3 flex items-center gap-3"
              style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(200,168,100,0.18)" }}
            >
              <PlanFeatureIcon index={index} filled={false} />
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.82rem", color: "rgba(30,15,10,0.72)" }}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing footnote */}
      <p className="text-center mt-6 mb-2" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(30,15,10,0.4)" }}>
        Foundation starts at $297/mo &nbsp;·&nbsp; $500 setup fee on every monthly plan &nbsp;·&nbsp; 3, 6, and 12-month options available
      </p>

      {/* Setup fee + ad spend notes */}
      <div className="mt-12 max-w-2xl mx-auto rounded-2xl px-8 py-6 text-center space-y-4"
        style={{ background: "rgba(200,168,100,0.07)", border: "1px solid rgba(200,168,100,0.22)" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "var(--ink)", opacity: 0.75, fontStyle: "italic", lineHeight: 1.6 }}>
          <span style={{ color: "var(--gold)", fontStyle: "normal", fontWeight: 600 }}>$500 setup fee on every plan</span> — required upfront for onboarding, system buildout, launch prep, calendar integration, automation sequences, and CRM setup.
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "rgba(30,15,10,0.52)", lineHeight: 1.6 }}>
          Choose a 3-month start, or commit to 6 or 12 months. Growth clients on 6-month or 12-month contracts receive their last month free.
        </p>
        <div style={{ height: "1px", background: "rgba(200,168,100,0.2)" }} />
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "var(--ink)", opacity: 0.7, fontStyle: "italic", lineHeight: 1.6 }}>
          <span style={{ color: "var(--rose)", fontStyle: "normal", fontWeight: 600 }}>* Ad spend is not included in any package</span> — paid directly by you to Meta. Minimum $1,000/mo · We recommend starting at $1,000–$2,000/mo for best results · Never included in your package.
        </p>
      </div>

    </section>
  );
}

/* ─── FAQ ─────────────────────────────────────────────── */
/* ─── About ────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="scroll-mt-32 py-24 md:py-32 px-6 bg-[var(--cream)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Eyebrow>The Person Behind the Brand</Eyebrow>
          <h2
            className="mt-4 italic text-[var(--ink)]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.6rem, 5vw, 4.4rem)", lineHeight: 1.05 }}
          >
            Hi, I'm Mandy.
          </h2>
          <Divider />
        </div>

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] items-center gap-10 lg:gap-16">
          {/* Photo */}
          <div className="mx-auto w-full max-w-sm">
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: "30px",
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
            <div className="mt-4 rounded-2xl px-5 py-4 text-center" style={{ background: "rgba(255,250,246,0.68)", border: "1px solid color-mix(in oklab, var(--gold) 24%, transparent)" }}>
              <p className="text-[var(--gold)] text-[10px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
                Founder-Led Systems
              </p>
              <p className="mt-2 text-[var(--ink)]/62 leading-6" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem" }}>
                Every client system is shaped by brand strategy, not templates.
              </p>
            </div>
          </div>

          {/* Copy */}
          <div className="text-center lg:text-left">
            <p className="text-[var(--gold)] text-[11px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
              Hi, I'm Mandy
            </p>
            <p
              className="mt-4 text-[var(--ink)]/75 leading-8"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}
            >
              I'm a social media strategist and brand designer from the Greater Toronto Area — with 11+ years in graphic and product design, building brands for companies, creators, and entrepreneurs. My work has been recognized by <strong>BuzzFeed</strong> and <strong>HuffPost</strong>.
            </p>
            <p
              className="mt-4 text-[var(--ink)]/75 leading-8"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}
            >
              I built The Dollhouse because I kept seeing the same problem — talented business owners with incredible products, invisible online. Not because they weren't good enough, but because they were too busy running their business to show up consistently.
            </p>
            <p
              className="mt-4 text-[var(--ink)]/75 leading-8"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}
            >
              So I built the studio around a simple promise: your online presence should look beautiful, sound like you, follow up fast, and help the right people book.
            </p>

            {/* Divider */}
            <div className="mt-7 flex items-center gap-3 justify-center lg:justify-start">
              <span className="h-px w-10 bg-[var(--gold)] opacity-40" />
              <span style={{ color: "var(--gold)", fontSize: "0.6rem" }}>♥</span>
              <span className="h-px w-10 bg-[var(--gold)] opacity-40" />
            </div>

            {/* As seen in */}
            <div className="mt-5 flex flex-wrap items-center gap-4 justify-center lg:justify-start">
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
            <div className="mt-7 grid sm:grid-cols-3 gap-3">
              {[
                ["11 Years", "Brand & Design"],
                ["15+", "Web Apps Built"],
                ["100%", "Done For You"],
              ].map(([value, label]) => (
                <div key={value} className="rounded-2xl px-5 py-4" style={{ background: "rgba(255,250,246,0.62)", border: "1px solid color-mix(in oklab, var(--gold) 22%, transparent)" }}>
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
    { feature: "Content, posting & short-form video", dh: true, agency: true, diy: false },
    { feature: "AI clone or custom brand character", dh: true, agency: false, diy: false },
    { feature: "Brand voice strategy", dh: true, agency: false, diy: false },
    { feature: "CRM, booking & follow-up automation", dh: true, agency: false, diy: false },
    { feature: "AI voice agent available", dh: true, agency: false, diy: false },
    { feature: "Transparent pricing & flexible terms", dh: true, agency: false, diy: true },
  ];

  const CompareMark = ({ val }: { val: boolean }) =>
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
    <section className="py-24 md:py-32 px-6" style={{ background: "linear-gradient(180deg, var(--blush) 0%, var(--cream) 100%)" }}>
      <SectionTitle
        eyebrow="Why The Dollhouse"
        title="Not just content. A whole client-getting system."
        italic="Most agencies stop at posting. We build the follow-through."
      />

      <div className="mt-14 max-w-6xl mx-auto grid lg:grid-cols-[0.78fr_1.22fr] gap-8 items-start">
        <div className="rounded-[28px] p-7" style={{ background: "rgba(255,250,246,0.62)", border: "1px solid color-mix(in oklab, var(--gold) 22%, transparent)" }}>
          <p className="text-[var(--gold)] text-[10px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
            What makes it different
          </p>
          <h3 className="mt-3 text-[var(--ink)] italic leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.9rem, 3vw, 2.6rem)" }}>
            Designed for owners who cannot afford slow follow-up.
          </h3>
          <div className="mt-6 space-y-4">
            {[
              "Your brand looks consistent before the ads ever run.",
              "Your content leads somewhere: DMs, bookings, reviews, and follow-up.",
              "Your AI systems are built around your offer instead of a generic template.",
            ].map((item) => (
              <div key={item} className="flex gap-3">
                <span className="mt-1 h-5 w-5 shrink-0 rounded-full flex items-center justify-center" style={{ background: "rgba(200,168,100,0.14)", color: "var(--gold)" }}>
                  <Check size={12} strokeWidth={3} />
                </span>
                <p className="m-0 text-[var(--ink)]/62 leading-7" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem" }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] p-4 sm:p-5" style={{ background: "rgba(255,250,246,0.66)", border: "1px solid color-mix(in oklab, var(--gold) 22%, transparent)", boxShadow: "0 28px 70px -48px rgba(90,45,35,0.42)" }}>
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr>
                <th className="w-[42%] pb-4 text-left" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(30,15,10,0.4)", fontWeight: 500 }}>
                  Feature
                </th>
                {[
                  { label: "Dollhouse", featured: true },
                  { label: "Agencies", featured: false },
                  { label: "DIY", featured: false },
                ].map(({ label, featured }) => (
                  <th
                    key={label}
                    className={`${featured ? "w-[28%]" : "w-[15%]"} pb-4 text-center`}
                    style={{ fontFamily: featured ? "'Cormorant Garamond', serif" : "'Jost', sans-serif", fontSize: featured ? "0.9rem" : "0.62rem", fontStyle: "normal", letterSpacing: featured ? "0.18em" : "0.14em", textTransform: "uppercase", color: featured ? "var(--ink)" : "rgba(30,15,10,0.4)", fontWeight: featured ? 500 : 500 }}
                  >
                    {featured ? (
                      <span className="inline-flex flex-col items-center leading-none">
                        <span style={{ fontFamily: "'Allura', cursive", fontSize: "0.86rem", letterSpacing: "0.04em", textTransform: "lowercase", color: "rgba(30,15,10,0.48)" }}>the</span>
                        <span>{label}</span>
                      </span>
                    ) : label}
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
                    className="py-2.5 pr-3 sm:py-3 sm:pr-5"
                    style={{ fontFamily: "'Jost', sans-serif", fontSize: "clamp(0.68rem, 1.4vw, 0.82rem)", color: "rgba(30,15,10,0.7)", lineHeight: 1.35 }}
                  >
                    {row.feature}
                  </td>
                  <td
                    className="py-2.5 text-center sm:py-3"
                    style={{
                      background: i === 0
                        ? "linear-gradient(180deg, rgba(200,168,100,0.08) 0%, rgba(200,168,100,0.08) 100%)"
                        : "rgba(200,168,100,0.08)",
                    }}
                  >
                    <CompareMark val={row.dh} />
                  </td>
                  <td className="py-2.5 text-center sm:py-3"><CompareMark val={row.agency} /></td>
                  <td className="py-2.5 text-center sm:py-3"><CompareMark val={row.diy} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:col-span-2 text-center">
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
    ["What does 'done-for-you' actually mean?", "We do the setup and the monthly work for you. Depending on your plan, that can include your website, content, posting, ads, AI clone, booking links, CRM, text follow-up, missed-call text-back, reminders, and reporting."],
    ["Which plan should I start with?", "Foundation is for your website and lead follow-up system. Content Lite is for simple weekly content. Starter is for one managed platform with AI clone support. Growth is the most complete option for content, ads, AI voice/chat, reviews, booking, and follow-up working together."],
    ["What is the AI clone or brand character?", "We create either an AI version of you or a custom brand character for your business. It helps your brand show up with polished content without you having to film every week."],
    ["How does the 14-day trial work?", "Eligible managed plans can begin with a founding client trial. The $500 setup fee is still due upfront because we are building your audit, strategy, sample direction, and system map before the monthly retainer begins."],
    ["What's included in the $500 setup fee?", "Every monthly plan has a $500 setup fee. It covers onboarding, system buildout, launch prep, calendar or booking setup, CRM setup, automation mapping, and the assets needed to start the plan cleanly."],
    ["What contract options do you offer?", "For now, you can choose 3 months, 6 months, or 12 months. Growth clients who choose a 6-month or 12-month agreement receive the last month free."],
    ["What is the $500 Appointment Booking setup?", "It is a focused setup for businesses that mainly need a cleaner way for leads to book. It can include the calendar connection, booking flow, confirmation messages, reminders, and simple lead handoff."],
    ["What kinds of businesses do you work with?", "Local service businesses, beauty and wellness brands, clinics, consultants, coaches, boutiques, and online brands that want stronger content, lead follow-up, and booking systems without managing it themselves."],
    ["What is your refund policy?", "All sales are final once setup or monthly work begins because strategy, buildout, and implementation time are reserved for your business. If there is a concern, reach out and we will work through the next best step."],
  ];
  return (
    <section id="faq" className="scroll-mt-32 py-24 md:py-32 px-6" style={{ background: "linear-gradient(180deg, var(--cream) 0%, var(--blush) 100%)" }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.75fr_1.25fr] gap-10 items-start">
        <div className="lg:sticky lg:top-36">
          <Eyebrow>Common Questions</Eyebrow>
          <h2 className="mt-4 text-[var(--rose)] leading-[1.02]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 400 }}>
            Clear answers before you apply.
          </h2>
          <p className="mt-5 text-[var(--ink)]/60 leading-8" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.98rem" }}>
            The proposal will map the exact recommendation for your business, but these are the details most people ask before taking the next step.
          </p>
          <a href="#contact" className="btn-ink mt-8 inline-flex">
            Ask for a proposal <span aria-hidden>→</span>
          </a>
        </div>

        <div className="space-y-3">
          {faqs.map(([q, a]) => (
            <details
              key={q}
              className="group rounded-2xl bg-white/68 backdrop-blur-sm border border-white/85 overflow-hidden shadow-[0_18px_42px_-34px_rgba(90,45,35,0.42)]"
            >
              <summary className="cursor-pointer list-none px-6 py-5 flex justify-between items-center gap-6">
                <span
                  className="text-[var(--ink)]"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.18rem", lineHeight: 1.25 }}
                >
                  {q}
                </span>
                <span className="shrink-0 text-[var(--rose)] text-2xl transition-transform group-open:rotate-45">+</span>
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
      </div>
    </section>
  );
}

/* ─── Contact ─────────────────────────────────────────── */
function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    // Convert FormData to JSON for more reliable delivery
    const payload: Record<string, string | string[]> = {};
    const addons: string[] = [];
    data.forEach((value, key) => {
      if (key === "addons") {
        addons.push(value as string);
      } else {
        payload[key] = value as string;
      }
    });
    if (addons.length > 0) payload["addons"] = addons.join(", ");
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

  const inputClass = "w-full rounded-xl bg-white/72 border border-[var(--gold)]/30 px-5 py-3.5 text-[var(--ink)] placeholder:text-[var(--ink)]/35 focus:outline-none focus:border-[var(--rose)] focus:bg-white/90 transition";
  const inputStyle = { fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" };
  const labelClass = "block text-[10px] tracking-luxe uppercase text-[var(--gold)] mb-2";
  const labelStyle = { fontFamily: "'Jost', sans-serif" };

  return (
    <section id="contact" className="scroll-mt-32 py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.88fr_1.12fr] gap-8 lg:gap-12 items-start">
        <div className="lg:sticky lg:top-36">
          <Eyebrow>Private Proposal Request</Eyebrow>
          <h2
            className="mt-4 text-[var(--rose)] leading-[0.98]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 6vw, 5.8rem)",
              fontWeight: 400,
            }}
          >
            Apply for your private growth plan.
          </h2>
          <p
            className="mt-6 max-w-lg text-[var(--ink)]/62 leading-8"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}
          >
            Share what you sell, what is getting stuck, and which level of support feels realistic. We will recommend the right plan, contract term, setup path, and add-ons before you commit.
          </p>
          <div className="mt-8 grid gap-3">
            {[
              ["1", "We review your business, offer, current online presence, and lead flow."],
              ["2", "You receive a private recommendation for the plan, term, setup fee, and add-ons."],
              ["3", "If it is a fit, we book your strategy call and map the build timeline."],
            ].map(([step, copy]) => (
              <div
                key={step}
                className="flex gap-4 rounded-2xl px-5 py-4"
                style={{
                  background: "rgba(255,250,246,0.62)",
                  border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)",
                }}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "rgba(200,168,100,0.14)", color: "var(--gold)", fontFamily: "'Jost', sans-serif", fontSize: "0.7rem", letterSpacing: "0.12em" }}
                >
                  {step}
                </span>
                <p className="m-0 text-sm leading-6 text-[var(--ink)]/64" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {copy}
                </p>
              </div>
            ))}
          </div>
          <div
            className="mt-8 rounded-2xl p-6"
            style={{
              background: "linear-gradient(135deg, rgba(30,15,10,0.96), rgba(48,24,18,0.92))",
              boxShadow: "0 28px 58px -34px rgba(30,15,10,0.75)",
            }}
          >
            <p className="text-[var(--gold)] text-[10px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
              Best fit for
            </p>
            <p className="mt-3 text-[var(--cream)]/82 leading-7" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", fontStyle: "italic" }}>
              Service businesses, clinics, beauty brands, consultants, and online brands ready to invest in content, booking, and lead follow-up that feels managed.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[28px] bg-white/76 backdrop-blur-md border border-white/85 shadow-[0_30px_70px_-35px_rgba(120,70,60,0.42)] p-6 md:p-9 space-y-5"
        >
        <div className="flex flex-col gap-3 border-b border-[var(--gold)]/18 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] tracking-luxe uppercase text-[var(--gold)]" style={{ fontFamily: "'Jost', sans-serif" }}>
              Application Details
            </p>
            <h3 className="mt-2 text-[var(--ink)] italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.45rem)", lineHeight: 1.05 }}>
              Tell us what you need built.
            </h3>
          </div>
          <p className="text-[var(--ink)]/45 text-sm md:text-right" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Private reply within 24 hours.
          </p>
        </div>
        {/* First / Last */}
        <div className="grid sm:grid-cols-2 gap-4">
          {([["First Name", "first_name", "Jane"], ["Last Name", "last_name", "Doe"]] as const).map(([label, name, ph]) => (
            <div key={name}>
              <label className={labelClass} style={labelStyle}>{label} *</label>
              <input type="text" name={name} placeholder={ph} required className={inputClass} style={inputStyle} />
            </div>
          ))}
        </div>

        {/* Phone / Email */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} style={labelStyle}>Phone *</label>
            <input type="tel" name="phone" placeholder="(555) 000-0000" required className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Email *</label>
            <input type="email" name="email" placeholder="you@brand.co" required className={inputClass} style={inputStyle} />
          </div>
        </div>

        {/* Business / Industry / Website */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} style={labelStyle}>Business Name</label>
            <input type="text" name="business_name" placeholder="Bloom Med Spa" className={inputClass} style={inputStyle} />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Industry / Niche</label>
            <input type="text" name="industry" placeholder="e.g. Medical Aesthetics" className={inputClass} style={inputStyle} />
          </div>
        </div>
        <div>
          <label className={labelClass} style={labelStyle}>Website <span className="normal-case opacity-60">(optional)</span></label>
          <input type="url" name="website" placeholder="e.g. yourbusiness.com" className={inputClass} style={inputStyle} />
        </div>

        {/* Plan */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} style={labelStyle}>Which plan interests you?</label>
            <select name="plan" className={inputClass} style={inputStyle}>
              <option>Foundation — $297/mo</option>
              <option>Content Lite — $500/mo</option>
              <option>Starter — $1,000/mo</option>
              <option>Growth — $2,500/mo</option>
              <option>Appointment Booking — $500 setup</option>
              <option>Not sure yet</option>
            </select>
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Preferred commitment</label>
            <select name="contract_term" className={inputClass} style={inputStyle}>
              <option>3 months</option>
              <option>6 months — interested in last month free on Growth</option>
              <option>12 months — interested in last month free on Growth</option>
              <option>Not sure yet</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass} style={labelStyle}>Setup readiness</label>
            <select name="setup_readiness" className={inputClass} style={inputStyle}>
              <option>I understand there is a $500 setup fee</option>
              <option>I have questions about the setup fee</option>
              <option>I am only browsing right now</option>
            </select>
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Main goal</label>
            <select name="main_goal" className={inputClass} style={inputStyle}>
              <option>Get more booked leads</option>
              <option>Improve my website and follow-up</option>
              <option>Post more consistently</option>
              <option>Run ads and scale lead flow</option>
              <option>Build an AI clone or brand character</option>
              <option>Not sure yet</option>
            </select>
          </div>
        </div>

        {/* Add-ons */}
        <div>
          <label className={labelClass} style={labelStyle}>
            Any add-ons? <span className="normal-case opacity-60">(optional)</span>
          </label>
          <p className="text-[9px] uppercase text-[var(--ink)]/38 mb-2" style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.16em" }}>Monthly</p>
          <div className="grid sm:grid-cols-2 gap-1.5 mb-3">
            {[
              "Extra AI Clone Videos",
              "AI Voice Agent",
              "Appointment Booking Setup",
              "Review Management",
              "Email & SMS Marketing",
              "Additional Content Volume",
              "Google Business Profile",
              "Google Ads Management",
            ].map((addon) => (
              <label
                key={addon}
                className="flex items-center gap-3 px-3.5 py-3 rounded-xl cursor-pointer transition-all hover:bg-white/70"
                style={{ background: "rgba(255,255,255,0.54)", border: "1px solid color-mix(in oklab, var(--gold) 25%, transparent)" }}
              >
                <input type="checkbox" name="addons" value={addon} className="accent-[var(--gold)] w-3.5 h-3.5 shrink-0" />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", fontWeight: 500, letterSpacing: "0", color: "rgba(30,15,10,0.78)", lineHeight: 1.35 }}>{addon}</span>
              </label>
            ))}
          </div>
          <p className="text-[9px] uppercase text-[var(--ink)]/38 mb-2" style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.16em" }}>One-Time</p>
          <div className="grid sm:grid-cols-2 gap-1.5">
            {[
              "Website Design",
              "AI Revenue Audit",
              "Digital Product Build",
              "Merch & Brand Design",
            ].map((addon) => (
              <label
                key={addon}
                className="flex items-center gap-3 px-3.5 py-3 rounded-xl cursor-pointer transition-all hover:bg-white/70"
                style={{ background: "rgba(255,255,255,0.54)", border: "1px solid color-mix(in oklab, var(--gold) 25%, transparent)" }}
              >
                <input type="checkbox" name="addons" value={addon} className="accent-[var(--gold)] w-3.5 h-3.5 shrink-0" />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", fontWeight: 500, letterSpacing: "0", color: "rgba(30,15,10,0.78)", lineHeight: 1.35 }}>{addon}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className={labelClass} style={labelStyle}>What would make this a win?</label>
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us what you sell, where leads are getting stuck, and what you want your monthly system to handle..."
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
          className="w-full rounded-2xl bg-[var(--ink)] text-[var(--cream)] py-4 text-[11px] tracking-luxe uppercase hover:-translate-y-0.5 hover:opacity-95 transition disabled:opacity-60 disabled:hover:translate-y-0"
          style={{ fontFamily: "'Jost', sans-serif", boxShadow: "0 18px 36px -22px rgba(30,15,10,0.7)" }}
        >
          {status === "sending" ? "Sending..." : "Send my free proposal request →"}
        </button>

        <div className="flex items-center gap-3 my-1">
          <span className="flex-1 h-px bg-[var(--gold)]/20" />
          <span className="text-[var(--ink)]/30 text-[10px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>or</span>
          <span className="flex-1 h-px bg-[var(--gold)]/20" />
        </div>

        <a
          href="https://api.leadconnectorhq.com/widget/booking/9mOtVmE8ihxgAX2AMzge"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-[11px] tracking-luxe uppercase transition-all hover:border-[var(--ink)]/40 hover:text-[var(--ink)]"
          style={{
            fontFamily: "'Jost', sans-serif",
            color: "var(--ink)",
            border: "1px solid color-mix(in oklab, var(--ink) 22%, transparent)",
          }}
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: "13px", height: "13px" }}>
            <rect x="2" y="3" width="12" height="11" rx="1.5" />
            <path d="M5 1.5v3M11 1.5v3M2 7h12" strokeLinecap="round" />
          </svg>
          Book a free discovery call
        </a>
      </form>
      </div>
    </section>
  );
}

/* ─── Final CTA ────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="py-20 px-6 text-center" style={{ background: "linear-gradient(135deg, #f4dcdc 0%, #f7e6dc 45%, #f1d3cf 100%)" }}>
      <p
        className="text-[var(--gold)] text-[11px] tracking-luxe uppercase"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        Not ready for monthly management yet?
      </p>
      <h2
        className="mt-4 italic text-[var(--ink)]"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1 }}
      >
        Build your business from the ground up.
      </h2>
      <p
        className="mt-4 text-[var(--ink)]/65 max-w-md mx-auto"
        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", lineHeight: 1.6 }}
      >
        The Brand Room helps new founders shape their offer, brand, content direction, and web app foundation before they move into a full growth retainer.
      </p>
      <Link
        to="/brand-room"
        className="mt-8 inline-flex items-center gap-2 rounded-2xl px-8 py-4 hover:-translate-y-0.5 transition-all"
        style={{ backgroundColor: "var(--ink)", color: "var(--cream)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontStyle: "italic", fontWeight: 700 }}
      >
        Start in The Brand Room →
      </Link>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-[var(--gold)]/15 px-6 py-14" style={{ background: "linear-gradient(180deg, #f4dcdc 0%, #f8ebe7 100%)" }}>
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-[1.1fr_0.9fr_0.9fr] items-start">
        <div>
          <div className="inline-flex flex-col items-start" style={{ gap: "1px" }}>
            <span className="text-[var(--ink)]/50 font-normal" style={{ fontFamily: "'Allura', cursive", fontSize: "22px", letterSpacing: "1px", textTransform: "lowercase", lineHeight: 1 }}>the</span>
            <span className="text-[var(--ink)] italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", letterSpacing: "5px", textTransform: "uppercase", lineHeight: 1 }}>Dollhouse</span>
            <p className="text-[var(--gold)] font-semibold" style={{ fontFamily: "'Jost', sans-serif", fontSize: "8px", letterSpacing: "3px", textTransform: "uppercase", marginTop: "4px" }}>Brand Studio</p>
          </div>
          <p className="mt-5 max-w-sm text-[var(--ink)]/58 leading-7" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem" }}>
            Done-for-you content, ads, AI clone, and follow-up systems for founders who want the work handled beautifully.
          </p>
        </div>

        <div>
          <p className="text-[var(--gold)] text-[10px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>Explore</p>
          <div className="mt-4 grid gap-2">
            {[
              ["Services", "#services"],
              ["Pricing", "#pricing"],
              ["FAQ", "#faq"],
              ["Proposal", "#contact"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="text-[var(--ink)]/58 hover:text-[var(--rose)] transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[var(--gold)] text-[10px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>Contact</p>
          <a href="mailto:hello@shopdollhouse.co" className="mt-4 block text-[var(--ink)]/68 hover:text-[var(--rose)] transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.78rem", letterSpacing: "0.12em" }}>
            hello@shopdollhouse.co
          </a>
          <a href="#contact" className="mt-5 inline-flex rounded-full px-5 py-3 text-[var(--cream)] bg-[var(--ink)] hover:opacity-90 transition-opacity" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            Get a proposal →
          </a>
        </div>
      </div>

      <div className="mt-12 max-w-6xl mx-auto flex flex-col gap-4 border-t border-[var(--gold)]/18 pt-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <p className="text-xs text-[var(--ink)]/35" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          © {new Date().getFullYear()} The Dollhouse Brand Studio. All rights reserved.
        </p>
        <div className="flex items-center justify-center gap-5">
          <Link to="/privacy" className="text-[var(--ink)]/35 hover:text-[var(--ink)]/58 transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Privacy Policy
          </Link>
          <Link to="/playbook" className="text-[var(--ink)]/45 hover:text-[var(--ink)]/70 transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Admin
          </Link>
        </div>
      </div>
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
      <AICloneSection />
      <About />
      <HowItWorks />
      <Pricing />
      <ComparisonTable />
      <FAQ />
      <Contact />
      <FinalCTA />
      <Footer />
      <BackToTop />
    </main>
  );
}
