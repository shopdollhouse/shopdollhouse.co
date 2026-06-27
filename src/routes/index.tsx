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
import managedGrowthImage from "@/assets/path-managed-growth.jpg";
import leadSystemImage from "@/assets/path-lead-system.jpg";
import brandRoomImage from "@/assets/path-brand-room.jpg";
import { managedServiceLinks, systemServices } from "@/lib/system-services";
import { usePageMeta } from "@/lib/use-page-meta";
import { SiteFooter } from "@/components/SiteFooter";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import { PLANS, PlanCard } from "@/components/AgencyPlans";
import { AgencyFaqSection, FinalCtaSection, AgencyFooterNotes, pulsePlan } from "@/components/AgencySections";

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
        className="bar-shimmer fixed top-0 inset-x-0 z-50 h-9 flex items-center justify-center gap-3 px-4 hover:opacity-90 transition-opacity"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <span style={{ color: "var(--gold)", fontSize: "0.55rem" }}>✦</span>
        <span
          className="text-[var(--cream)] text-[10px] tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          Founding client offer — limited spots available
        </span>
        <span style={{ color: "var(--gold)", fontSize: "0.55rem" }}>✦</span>
      </a>

      <nav
        className={`fixed top-9 inset-x-0 z-40 transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
        style={{
          backgroundColor: scrolled
            ? "color-mix(in oklab, var(--cream) 94%, transparent)"
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
            className="flex items-center gap-2.5 shrink-0 no-underline"
          >
            <DoorIcon className="h-10 w-auto" />
            <span className="flex flex-col items-start leading-none">
              <span
                className="not-italic"
                style={{ fontFamily: "'Allura', cursive", color: "var(--gold)", fontSize: "20px", letterSpacing: "0.5px", textTransform: "lowercase", lineHeight: 1 }}
              >
                the
              </span>
              <span
                className="not-italic"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--rose)", fontSize: "19px", fontWeight: 500, letterSpacing: "5px", textTransform: "uppercase", lineHeight: 1, marginTop: "-1px" }}
              >
                Dollhouse
              </span>
              <span
                className="not-italic font-semibold"
                style={{ fontFamily: "'Jost', sans-serif", color: "var(--gold)", fontSize: "6.5px", letterSpacing: "3.5px", textTransform: "uppercase", marginTop: "2px" }}
              >
                Brand Studio
              </span>
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
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--gold)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ transition: "transform 0.2s", transform: systemsOpen ? "rotate(180deg)" : "none" }}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
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
                        className="group/svc flex cursor-pointer items-center justify-between gap-2 rounded-2xl border border-[var(--gold)]/15 bg-white/40 px-3 py-2.5 transition-colors hover:border-[var(--gold)]/40 hover:bg-white/80"
                      >
                        <span>
                          <span className="block text-[var(--ink)] normal-case tracking-normal leading-tight" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.76rem", fontWeight: 700 }}>
                            {service.title}
                          </span>
                          <span className="mt-1 block text-[var(--ink)]/48 normal-case tracking-normal leading-snug" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.66rem" }}>
                            {service.short}
                          </span>
                        </span>
                        <span aria-hidden className="shrink-0 text-[var(--gold)] opacity-0 transition-opacity group-hover/svc:opacity-100">→</span>
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
                        className="group/item flex cursor-pointer gap-3 rounded-2xl border border-[var(--gold)]/15 bg-white/40 p-3 transition-colors hover:border-[var(--gold)]/40 hover:bg-white/80"
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
                        <span aria-hidden className="ml-auto self-center shrink-0 text-[var(--gold)] opacity-0 transition-opacity group-hover/item:opacity-100">→</span>
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

          <a href="#contact" className="!hidden md:!inline-flex btn-ink !py-2.5 !px-5 !text-[10px]">
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
      className="relative min-h-[calc(100svh-36px)] flex items-start justify-center px-4 pt-32 pb-16 overflow-hidden md:pt-40"
    >
      {/* Animated background — slow cinematic zoom */}
      <div
        aria-hidden
        className="bg-kenburns absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Aurora — living light drifting over the photo */}
      <div aria-hidden className="aurora absolute inset-0 pointer-events-none" />
      {/* Floating gold sparkles */}
      <span aria-hidden className="sparkle-drift" style={{ top: "18%", left: "12%", fontSize: "16px" }}>✦</span>
      <span aria-hidden className="sparkle-drift" style={{ top: "30%", right: "14%", fontSize: "12px", animationDelay: "1.6s" }}>✦</span>
      <span aria-hidden className="sparkle-drift" style={{ bottom: "22%", left: "20%", fontSize: "11px", animationDelay: "3s" }}>✦</span>
      <span aria-hidden className="sparkle-drift" style={{ bottom: "30%", right: "22%", fontSize: "15px", animationDelay: "2.2s" }}>✦</span>
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
          className="reveal mt-4 flex justify-center text-[var(--gold)]"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="float-slow inline-flex">
            <DoorIcon className="w-7 h-10" />
          </span>
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
            fontSize: "clamp(3.5rem, 8vw, 5.4rem)",
            fontWeight: 400,
            animationDelay: "0.3s",
          }}
        >
          DOLLHOUSE
        </h1>
        <p
          className="reveal mt-3 text-[var(--gold)] text-[15px] tracking-luxe uppercase"
          style={{ fontFamily: "'Jost', sans-serif", animationDelay: "0.4s" }}
        >
          brand studio
        </p>

        <div className="reveal" style={{ animationDelay: "0.5s" }}>
          <Divider />
        </div>

        <h2
          className="reveal mt-1 text-[var(--rose)] leading-snug max-w-xl mx-auto"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.75rem, 3.4vw, 2.45rem)",
            fontWeight: 400,
            fontStyle: "italic",
            animationDelay: "0.52s",
          }}
        >
          More Leads. More Booked Clients. Zero Content Work.
        </h2>

        <p
          className="reveal mt-3 text-[var(--ink)]/65 leading-relaxed max-w-lg mx-auto"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            animationDelay: "0.58s",
          }}
        >
          For local service businesses that want more booked calls without managing content, ads, missed calls, reviews, or follow-up themselves.
        </p>

        <div
          className="reveal mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap"
          style={{ animationDelay: "0.65s" }}
        >
          <a href="#contact" className="btn-ink">
            Get a Free Proposal <span aria-hidden>→</span>
          </a>
          <a href="#pricing" className="btn-ghost">
            View Plans From $297 <span aria-hidden>↓</span>
          </a>
          <div
            className="basis-full inline-flex items-center justify-center gap-2 rounded-full text-[var(--gold)]"
          >
            <span style={{ fontSize: "0.65rem" }}>★</span>
            <span
              className="text-[10px] tracking-luxe uppercase font-medium"
              style={{ fontFamily: "'Jost', sans-serif" }}
            >
              Custom proposal in 48 hours
            </span>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="reveal mt-5 w-full grid grid-cols-3 rounded-2xl py-4 px-2"
          style={{
            animationDelay: "0.75s",
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(200,168,100,0.2)",
          }}
        >
          {[
            { stat: "$297", label: "Plans Start" },
            { stat: "Day 1", label: "We Start" },
            { stat: "24/7", label: "Lead Response" },
          ].map(({ stat, label }, i) => (
            <div key={label} className={`flex flex-col items-center gap-1 px-2 ${i < 2 ? "border-r border-[var(--gold)]/25" : ""}`}>
                <span
                  className="text-[var(--rose)]"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontStyle: "italic", lineHeight: 1 }}
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
          ))}
        </div>

        <p
          className="reveal mt-3 text-[var(--ink)]/60 italic"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1rem, 2vw, 1.2rem)", animationDelay: "0.85s" }}
        >
          Done for you, every day · We start building the moment you join · Built around your business
        </p>
      </div>

    </header>
  );
}

function ChooseYourPath() {
  const paths = [
    {
      eyebrow: "Med Spas & Clinics",
      calloutSub: "We Specialize",
      title: "I want more booked clients.",
      body: "We run the ads and our AI Caller books the patients — while you focus on your work.",
      href: "https://medspa.dollhousebrandstudio.com",
      cta: "See How It Works",
      targetPlan: null,
      image: managedGrowthImage,
      imageAlt: "A booked client calendar and business growth dashboard",
      featured: true,
    },
    {
      eyebrow: "Service Businesses",
      title: "I need a website and lead system first.",
      body: "A site that captures every lead — missed-call text-back, reviews, and follow-up built in.",
      href: "#pricing",
      cta: "See Website Plans",
      targetPlan: "foundation",
      image: leadSystemImage,
      imageAlt: "A website connected to an automated lead follow-up and booking system",
      featured: false,
    },
    {
      eyebrow: "New Brands",
      title: "I need to build my brand first.",
      body: "Clarify your offer, visuals, and content in the Brand Room before you market.",
      href: "https://room.shopdollhouse.co",
      cta: "Enter The Brand Room",
      targetPlan: null,
      image: brandRoomImage,
      imageAlt: "A brand strategy workspace with a workbook, moodboard, and planning tools",
      featured: false,
    },
  ];

  return (
    <section className="px-6 py-16 md:py-20" style={{ background: "linear-gradient(180deg, #fff8f3 0%, var(--cream) 100%)" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="gold-grad text-[17px] tracking-luxe uppercase font-semibold" style={{ fontFamily: "'Jost', sans-serif" }}>Start Here</p>
          <h2 className="mt-3 text-[var(--ink)]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.3rem, 5vw, 3.8rem)", fontWeight: 400, lineHeight: 1 }}>
            Which one sounds like you?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--ink)]/60" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.98rem", lineHeight: 1.7 }}>
            Pick the path that fits where you are right now — you don't need everything at once.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {paths.map(({ eyebrow, calloutSub, title, body, href, cta, targetPlan, image, imageAlt, featured }) => (
            <a
              key={title}
              href={href}
              onClick={(event) => {
                if (!targetPlan) return;
                event.preventDefault();
                pulsePlan(targetPlan);
              }}
              className="group flex min-h-[410px] flex-col overflow-hidden rounded-[20px] transition-transform hover:-translate-y-1"
              style={{
                background: featured ? "var(--ink)" : "rgba(255,255,255,0.72)",
                border: featured ? "1px solid rgba(200,168,100,0.32)" : "1px solid rgba(200,168,100,0.26)",
                boxShadow: "0 28px 70px -52px rgba(80,38,28,0.45)",
              }}
            >
              <div className="relative aspect-[16/8] w-full overflow-hidden bg-[var(--blush)]">
                <img
                  src={image}
                  alt={imageAlt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-col">
                  <p className="gold-grad inline-flex w-fit items-center gap-1.5 text-[14px] uppercase" style={{ fontFamily: "'Jost', sans-serif", fontWeight: 800, letterSpacing: "0.14em", filter: "drop-shadow(0 0 10px rgba(200,164,100,0.6))" }}>
                    ♥ {eyebrow}
                  </p>
                  {calloutSub && (
                    <span className="uppercase" style={{ fontFamily: "'Jost', sans-serif", color: featured ? "rgba(200,164,100,0.9)" : "var(--gold)", fontSize: "9px", fontWeight: 600, letterSpacing: "0.22em", marginTop: "3px" }}>
                      {calloutSub}
                    </span>
                  )}
                </div>
                <h3 className="mt-2.5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.65rem", lineHeight: 1.05, color: featured ? "var(--cream)" : "var(--ink)" }}>
                  {title}
                </h3>
                <p className="mt-3 leading-6" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: featured ? "rgba(253,246,240,0.66)" : "rgba(30,15,10,0.58)" }}>
                  {body}
                </p>
                <span className="mt-auto pt-5 text-[9px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif", color: featured ? "var(--gold)" : "var(--rose)", fontWeight: 700 }}>
                  {cta} <span aria-hidden>→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
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

/* ─── Marquee strip — scrolling brand ticker ──────────── */
function MarqueeStrip() {
  const items = ["AI Clone", "Content", "Websites", "Ads", "Automation", "Lead Follow-Up", "Reviews", "Booking"];
  const row = items.map((t) => (
    <span key={t} className="inline-flex items-center">
      <span
        className="italic"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1rem, 2vw, 1.5rem)", color: "var(--rose)", padding: "0 1.2rem" }}
      >
        {t}
      </span>
      <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>✦</span>
    </span>
  ));
  return (
    <section aria-hidden className="overflow-hidden py-5" style={{ background: "var(--cream)", borderTop: "1px solid rgba(200,168,100,0.22)", borderBottom: "1px solid rgba(200,168,100,0.22)" }}>
      <div className="marquee-track">
        <div className="inline-flex items-center">{row}</div>
        <div className="inline-flex items-center">{row}</div>
      </div>
    </section>
  );
}

function TrustBar() {
  const touchpoints = [
    { icon: Video, title: "Content", body: "Show up consistently" },
    { icon: MessageSquare, title: "Follow-Up", body: "Reply while leads are warm" },
    { icon: ClipboardClock, title: "Booking", body: "Move inquiries to a calendar" },
    { icon: Star, title: "Reviews", body: "Build local trust on Google" },
  ];
  return (
    <section className="py-12 px-6 bg-[var(--cream)]/60 backdrop-blur-sm border-y border-[var(--gold)]/15">
      <p
        className="text-center text-[10px] tracking-luxe uppercase text-[var(--gold)]"
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        One connected path from visibility to booked client
      </p>
      <div className="mx-auto mt-7 grid max-w-4xl grid-cols-2 gap-5 text-[var(--ink)]/60 md:grid-cols-4">
        {touchpoints.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="group flex flex-col items-center gap-2 text-center transition-colors hover:text-[var(--rose)]"
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full border bg-white/45 text-[var(--gold)] transition-transform group-hover:-translate-y-0.5"
              style={{
                borderColor: "color-mix(in oklab, var(--gold) 34%, transparent)",
                boxShadow: "0 16px 34px -28px rgba(90,45,35,0.55)",
              }}
            >
              <Icon size={20} strokeWidth={1.6} />
            </span>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.25rem",
                color: "var(--ink)",
              }}
            >
              {title}
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.76rem", color: "rgba(30,15,10,0.5)" }}>{body}</span>
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
      <div className="mt-16 max-w-5xl mx-auto grid md:grid-cols-3 gap-5 relative" data-stagger>
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

function ServiceImageCard({
  image,
  tag,
  title,
  points,
  icon,
}: {
  image: string;
  tag: string;
  title: string;
  points: string[];
  icon: "content" | "ads" | "reporting" | "voice" | "reminders" | "reviews";
}) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.55, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const symbols = {
    content: (
      <>
        <rect {...common} x="5" y="5" width="14" height="14" rx="3" />
        <path {...common} d="M8.5 10h7M8.5 13h5M8.5 16h6.5M16 5l2.2-2.2" />
      </>
    ),
    ads: (
      <>
        <path {...common} d="M4.5 17.5c3.4-5.8 7.3-8.9 11.8-9.4" />
        <path {...common} d="M13.5 5.6h4.8v4.8M6 18.5h12M6.8 13.2l2.1 2.1M10.8 9.7l2 2" />
      </>
    ),
    reporting: (
      <>
        <path {...common} d="M5 19h14M7 16v-5M12 16V7M17 16v-8" />
        <path {...common} d="M6.5 7.5l3 2.8 3.2-4 4.2 2.2" />
      </>
    ),
    voice: (
      <>
        <path {...common} d="M7.5 8.5a4.5 4.5 0 0 1 9 0v3a4.5 4.5 0 0 1-9 0z" />
        <path {...common} d="M5 11.5a7 7 0 0 0 14 0M12 18.8V21M9 21h6" />
      </>
    ),
    reminders: (
      <>
        <rect {...common} x="5" y="4.5" width="14" height="15" rx="2.5" />
        <path {...common} d="M8.5 3v4M15.5 3v4M5 9h14M8.5 13.2h4.8M8.5 16.2h3" />
      </>
    ),
    reviews: (
      <>
        <path {...common} d="m12 4.2 2.1 4.2 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7z" />
        <path {...common} d="M7 20h10" />
      </>
    ),
  };

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-5 -z-10 rounded-[34px] opacity-70 blur-2xl"
        style={{ background: "radial-gradient(60% 60% at 50% 45%, rgba(201,122,122,0.2), transparent 72%)" }}
      />
      <div
        className="relative overflow-hidden rounded-[30px] border border-white/85 p-3 shadow-[0_34px_78px_-42px_rgba(90,45,35,0.52)]"
        style={{ background: "linear-gradient(155deg, rgba(255,250,246,0.88), rgba(246,224,218,0.7))" }}
      >
        <div className="relative overflow-hidden rounded-[24px]">
          <img
            src={image}
            alt={`${tag} visual preview`}
            className="aspect-[4/3] w-full object-cover"
            style={{ objectPosition: "center", filter: "saturate(0.95) contrast(1.02)" }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(30,15,10,0.02) 30%, rgba(30,15,10,0.52) 100%)" }}
          />
          <div className="absolute left-4 top-4 flex h-14 w-14 items-center justify-center rounded-2xl text-[var(--gold)]" style={{ background: "rgba(255,250,246,0.82)", border: "1px solid rgba(200,168,100,0.32)", backdropFilter: "blur(10px)" }}>
            <svg viewBox="0 0 24 24" aria-hidden className="h-8 w-8">
              {symbols[icon]}
            </svg>
          </div>
          <div className="absolute inset-x-4 bottom-4 rounded-2xl px-4 py-3" style={{ background: "rgba(255,250,246,0.84)", border: "1px solid rgba(255,255,255,0.7)", backdropFilter: "blur(12px)" }}>
            <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.56rem", fontWeight: 700 }}>
              {tag}
            </p>
            <p className="mt-1 text-[var(--ink)]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.28rem", lineHeight: 1.1 }}>
              {title}
            </p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {points.map((point) => (
            <div key={point} className="rounded-2xl px-3 py-3 text-center" style={{ background: "rgba(255,255,255,0.56)", border: "1px solid rgba(200,168,100,0.22)" }}>
              <p className="text-[var(--ink)]/58 tracking-[0.12em] uppercase" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.48rem", lineHeight: 1.45 }}>
                {point}
              </p>
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
      visual: <ServiceImageCard image="/system-assets/one-click-marketing-campaigns.jpg" tag="Content System" title="Posts planned, designed, and scheduled" points={["Branded posts", "Captions done", "3 platforms"]} icon="content" />,
    },
    {
      id: "service-paid-social-search-advertising",
      tag: "Paid Social & Search Advertising",
      title: "Facebook, Instagram, and Google ads that bring in real leads.",
      sub: "More reach. More bookings. Less guesswork.",
      body: "We build and manage your ad campaigns from scratch — audience targeting, ad creative, budget allocation, and daily optimisation. Every dollar is tracked and working toward your growth.",
      visual: <ServiceImageCard image="/system-assets/local-seo.jpg" tag="Lead Growth" title="Ads and search built to capture demand" points={["Meta ads", "Google intent", "Lead tracking"]} icon="ads" />,
    },
    {
      id: "service-strategy-analytics-reporting",
      tag: "Strategy, Analytics & Reporting",
      title: "Always know what's working — and a plan to scale it.",
      sub: "Clear data. Smarter decisions. Every month.",
      body: "Detailed performance reports and a dedicated monthly strategy session keep you in the loop. We track what's growing your business and build the next month's plan around what's working.",
      visual: <ServiceImageCard image="/system-assets/all-in-one-inbox.jpg" tag="Monthly Clarity" title="Reports you can actually understand" points={["Plain English", "Next steps", "Wins tracked"]} icon="reporting" />,
    },
    {
      id: "service-ai-voice-chat-automation",
      tag: "AI Voice & Chat Automation",
      title: "Never miss a lead — calls, texts, and DMs answered instantly, 24/7.",
      sub: "Your business never sleeps.",
      body: "Our AI answers every call, text, and message the moment it comes in. It qualifies the lead, answers questions, and books the appointment — so no opportunity ever slips through the cracks, even at 2am.",
      visual: <ServiceImageCard image="/system-assets/business-phone.jpg" tag="Voice + Chat" title="Calls and website chat answered fast" points={["AI voice", "Live handoff", "24/7 replies"]} icon="voice" />,
    },
    {
      id: "service-automated-appointment-reminders",
      tag: "Automated Appointment Reminders",
      title: "Reduce no-shows before they happen.",
      sub: "Keep your calendar full and your clients showing up.",
      body: "Automated text and email reminders go out 48 hours, 24 hours, and 2 hours before every appointment. Less no-shows, less chasing, and a more professional experience for your clients — all on autopilot.",
      visual: <ServiceImageCard image="/system-assets/automated-lead-follow-up.jpg" tag="Booking Flow" title="Reminders keep appointments protected" points={["SMS reminders", "Email prompts", "Less no-shows"]} icon="reminders" />,
    },
    {
      id: "service-review-reputation-management",
      tag: "Review & Reputation Management",
      title: "Build your 5-star presence — automatically.",
      sub: "More reviews. More trust. More new clients.",
      body: "After every appointment, happy clients are guided to your Google review link, while lower ratings go to a private feedback form first. We can also create QR codes and review prompts for past customers so your public rating has more chances to grow.",
      visual: <ServiceImageCard image="/system-assets/review-funnel.jpg" tag="Review Funnel" title="More public trust, less public damage" points={["5-star link", "Private feedback", "QR ready"]} icon="reviews" />,
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

function ProofSection() {
  const flow = [
    { icon: Search, label: "Find", body: "A local customer searches, sees your content, ad, or website, and clicks through." },
    { icon: MessageSquare, label: "Ask", body: "They fill a quote form, open chat, comment, DM, or call after hours." },
    { icon: PhoneCall, label: "Respond", body: "Text-back, chat, voice, and follow-up automations answer fast while the lead is warm." },
    { icon: ClipboardClock, label: "Book", body: "The lead gets moved toward a calendar, estimate flow, phone call, or private proposal." },
    { icon: Star, label: "Review", body: "Happy customers are guided to Google. Lower ratings go to a private feedback form first." },
  ];
  const proofCards = [
    {
      title: "Review funnel example",
      body: "5-star clicks go straight to your Google review link. Lower ratings open a private form so the owner can fix the issue before it becomes public.",
      stats: ["QR code ready", "Past client list prompts", "Private feedback route"],
    },
    {
      title: "Missed-call rescue",
      body: "If a customer calls while you are busy or closed, they immediately get a text. Instead of waking up to missed calls, you can wake up to booked appointments.",
      stats: ["Instant SMS", "Booking link", "Conversation history"],
    },
    {
      title: "Estimate-to-booking path",
      body: "For contractors, we can build estimate calculators and quote forms that turn curious visitors into warm leads inside a booking or survey flow.",
      stats: ["Quote form", "Lead survey", "Owner text alert"],
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6" style={{ background: "linear-gradient(180deg, var(--cream) 0%, #f8e7e2 100%)" }}>
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="Proof Preview"
          title="What the system is built to do"
          italic="Not just prettier content. More chances to capture, follow up, book, and review."
        />

        <div className="mt-14 rounded-[34px] p-5 md:p-8" style={{ background: "rgba(255,250,246,0.68)", border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)", boxShadow: "0 34px 80px -54px rgba(90,45,35,0.45)" }}>
          <div className="grid gap-4 md:grid-cols-5" data-stagger>
            {flow.map(({ icon: Icon, label, body }, index) => (
              <div key={label} className="relative rounded-2xl p-5 text-center" style={{ background: index === 4 ? "var(--ink)" : "rgba(255,255,255,0.58)", border: "1px solid rgba(200,168,100,0.2)" }}>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full" style={{ background: index === 4 ? "rgba(200,168,100,0.14)" : "rgba(200,168,100,0.12)", color: "var(--gold)" }}>
                  <Icon size={22} strokeWidth={1.7} />
                </div>
                <p className="mt-4 text-[10px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif", color: index === 4 ? "var(--gold)" : "var(--rose)", fontWeight: 700 }}>
                  0{index + 1} · {label}
                </p>
                <p className="mt-2 leading-6" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.84rem", color: index === 4 ? "rgba(250,243,234,0.72)" : "rgba(30,15,10,0.62)" }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-5">
          {proofCards.map((card) => (
            <article key={card.title} className="rounded-[28px] p-6" style={{ background: "rgba(255,250,246,0.72)", border: "1px solid color-mix(in oklab, var(--gold) 24%, transparent)" }}>
              <p className="text-[var(--gold)] text-[10px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>System example</p>
              <h3 className="mt-3 italic text-[var(--ink)]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.7rem", lineHeight: 1.1 }}>
                {card.title}
              </h3>
              <p className="mt-3 text-[var(--ink)]/64 leading-7" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem" }}>
                {card.body}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {card.stats.map((stat) => (
                  <span key={stat} className="rounded-full px-3 py-2 text-[9px] tracking-[0.14em] uppercase" style={{ fontFamily: "'Jost', sans-serif", background: "rgba(200,168,100,0.11)", border: "1px solid rgba(200,168,100,0.24)", color: "var(--gold)" }}>
                    {stat}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="#contact" className="btn-ink">
            Build my lead flow <span aria-hidden>→</span>
          </a>
        </div>
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
            className="reveal text-shimmer mx-auto max-w-4xl"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3.7rem, 8.2vw, 7.6rem)",
              fontWeight: 400,
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
                  className="ai-badge-pulse rounded-full px-3 py-2 text-center font-semibold"
                  style={{
                    background: "rgba(255,250,246,0.96)",
                    color: "var(--gold)",
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "0.64rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  ✦ AI Clone
                </span>
              </div>
              <div className="absolute inset-0 grid grid-cols-2">
                <div className="relative overflow-hidden" style={{ background: "rgba(255,250,246,0.68)" }}>
                  <img src={mandyPhoto} alt="Real portrait reference" className="h-full w-full object-cover" style={{ filter: "saturate(0.96) contrast(1.02)", objectPosition: "center 18%" }} />
                </div>
                <div className="relative overflow-hidden" style={{ background: "rgba(255,250,246,0.68)" }}>
                  <img src={mandyAIClonePreview} alt="AI clone example portrait preview" className="ai-kenburns h-full w-full object-cover" style={{ filter: "saturate(0.98) contrast(1.02)", objectPosition: "center 14%" }} />
                  <span aria-hidden className="ai-scan" />
                  <span aria-hidden className="ai-shimmer" />
                  <span aria-hidden className="ai-sparkle" style={{ top: "16%", right: "12%", fontSize: "17px" }}>✦</span>
                  <span aria-hidden className="ai-sparkle" style={{ top: "58%", right: "26%", fontSize: "11px", animationDelay: "1.4s" }}>✦</span>
                  <span aria-hidden className="ai-sparkle" style={{ top: "36%", left: "12%", fontSize: "10px", animationDelay: "0.8s" }}>✦</span>
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
                  <p className="m-0 mt-1 text-sm" style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(30,15,10,0.52)" }}>plus $997 one-time setup</p>
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
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4" data-stagger>
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
          <div className="grid sm:grid-cols-3 gap-4" data-stagger>
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
  const [contractTerm, setContractTerm] = useState<"6" | "12">("6");
  const contractMonths = Number(contractTerm);
  const setupFee = 997;
  const fullPlanBonus = contractTerm === "12" ? "Annual bonus: 1 month free on every plan" : "Choose annual to unlock 1 month free";
  const displayPrice = (monthlyPrice: number) => `$${monthlyPrice.toLocaleString()}`;

  const tiers = [
    {
      name: "Foundation",
      price: "$297",
      monthlyPrice: 297,
      platformFee: 0,
      fit: "Best for getting the lead system in place",
      outcome: "A website and automation system that turns every inquiry, missed call, and appointment into a managed conversation.",
      tagline: "For service businesses that need a website and full lead system before anything else.",
      setupLabel: "+ $997 one-time setup",
      cta: "Build My Foundation →",
      features: [
        "10–20 page professional website built for lead generation",
        "Website chat widget — visitors text you directly from your site",
        "Quote forms, SMS confirmations, and clickable phone numbers",
        "Automated lead follow-up — new inquiries get an instant text response",
        "Missed call text-back — anyone who calls gets a text immediately",
        "Voice AI receptionist — answers missed calls and books appointments 24/7",
        "5-star review funnel with private feedback step before the public request",
        "One-click referral campaign — happy clients send referrals automatically",
        "Return customer campaigns — bring past clients back on autopilot",
        "Automated appointment reminders — text and email before every booking",
        "Full CRM setup and contact pipeline",
        "On-site SEO basics — keywords, alt tags, schema, image optimisation, page speed",
      ],
    },
    {
      name: "Starter",
      price: "$1,000",
      monthlyPrice: 1000,
      platformFee: 300,
      fit: "Best for focused launches",
      outcome: "One platform, one polished content system, and a full automation stack turning followers into booked clients.",
      tagline: "For businesses and personal brands ready to be fully active on one platform with a lead system behind every post.",
      topBadge: { label: "Best Starting Point", tone: "pink" as "gold" | "pink" },
      setupLabel: "+ $997 one-time setup",
      cta: "Launch My Brand →",
      features: [
        "1 platform fully managed — Facebook, Instagram, or TikTok — nothing to post",
        "AI Clone or custom brand mascot — built during onboarding to your look, voice & energy",
        "3 AI Clone videos pinned — your signature content always front and centre",
        "16 posts/month — Reels, Carousels & Static — all on-brand, all approved by you",
        "Content approval — nothing goes live without your sign-off",
        "Starter content strategy — offer angle, pillars, caption direction & posting rhythm",
        "Comment-to-DM automation — every comment becomes a private lead conversation",
        "Missed call text-back — warm leads hear from you within seconds",
        "Voice AI receptionist — answers missed calls and books appointments 24/7",
        "Automated appointment reminders — text and email before every booking",
        "CRM pipeline and booking link setup",
        "Monthly performance report — reach, growth, top posts & next steps in plain English",
      ],
    },
    {
      name: "Growth",
      price: "$2,497",
      monthlyPrice: 2497,
      platformFee: 300,
      fit: "Featured for steady booked leads",
      outcome: "Three platforms running, an AI Clone posting for you, leads followed up automatically, and ads bringing in new clients — while you focus on the work.",
      tagline: "For service businesses ready for all 3 platforms, full automation, and paid Meta ads working together every day.",
      featured: true,
      topBadge: { label: "Most Popular", tone: "gold" as "gold" | "pink" },
      setupLabel: "+ $997 one-time setup",
      cta: "Scale With Everything →",
      features: [
        "3 platforms fully managed — Facebook, Instagram & TikTok — nothing to post, nothing to manage",
        "AI Clone or custom brand mascot — built during onboarding, active across all 3 platforms",
        "Your AI Clone shows up consistently on all three platforms on your behalf, so your audience sees you every day without you ever picking up a camera",
        "24 posts/month — 8 per platform, Reels, Carousels & Static — all on-brand",
        "Content approval — you see and approve everything before it goes live",
        "Dedicated content strategy — pillars, hashtags, caption writing & optimal posting times",
        "Paid Meta ads — Facebook & Instagram campaigns built, managed & optimised for leads and bookings",
        "Comment-to-DM + text follow-up AI bot across all 3 platforms",
        "Voice AI receptionist — answers missed calls and books appointments 24/7",
        "Missed call text-back — instant reply to anyone who calls",
        "Automated appointment reminders — text and email before every booking",
        "5-star review requests — sent automatically after every appointment",
        "Full CRM and automation stack built during setup",
        "Monthly strategy call — 30 minutes, real numbers, clear next steps",
        "Monthly performance report across all 3 platforms",
      ],
    },
  ];
  const getPlanMath = (tier: (typeof tiers)[number]) => {
    const regularTotal = tier.monthlyPrice * contractMonths + setupFee;
    const bonusMonths = contractTerm === "12" ? 1 : 0;
    const paidMonths = contractMonths - bonusMonths;
    const total = tier.monthlyPrice * paidMonths + setupFee;
    const savings = regularTotal - total;
    return { bonusMonths, paidMonths, regularTotal, savings, total };
  };

  return (
    <section
      id="pricing"
      className="scroll-mt-32 py-24 md:py-32 px-6"
      style={{
        background:
          "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.9), transparent 36%), radial-gradient(circle at 50% 58%, rgba(201,122,122,0.16), transparent 42%), linear-gradient(180deg, #fbf1ed 0%, #f5ddd7 52%, #fff8f3 100%)",
      }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <Eyebrow>Monthly Plans</Eyebrow>
        <h2
          className="mt-4 leading-[0.96]"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            fontWeight: 400,
            color: "var(--ink)",
          }}
        >
          Choose your plan
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-[var(--ink)]/58 leading-7" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Start with the foundation, then scale into the managed growth system when you are ready.
        </p>

      </div>

      <div className="mt-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-8 lg:gap-7 items-start" data-stagger>
        {/* Foundation — has its own independent 3/6-month toggle inside the card */}
        <div id={`plan-${PLANS[0].id}`} className="scroll-mt-32">
          <PlanCard plan={PLANS[0]} billing="6" ctaHref="#contact" />
        </div>

        {/* Starter + Growth — controlled by the shared 6/12-month toggle below */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* 6-Month / 12-Month toggle — applies to Starter & Growth only */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="grid w-full max-w-[430px] grid-cols-2 gap-1 rounded-full p-1"
              style={{
                background: "rgba(255,250,246,0.72)",
                border: "1px solid rgba(200,168,100,0.28)",
                boxShadow: "0 18px 40px -28px rgba(120,70,55,0.42), inset 0 1px 0 rgba(255,255,255,0.68)",
              }}
            >
              {[
                { value: "6", label: "6 Months", badge: "" },
                { value: "12", label: "12 Months", badge: "1 Month Free" },
              ].map((option) => {
                const active = contractTerm === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-label={option.badge ? `${option.label}, ${option.badge}` : option.label}
                    onClick={() => setContractTerm(option.value as "6" | "12")}
                    className="flex min-h-[34px] items-center justify-center gap-1 rounded-full px-2 py-2 transition-all sm:min-h-[38px] sm:gap-1.5 sm:px-2.5"
                    style={{
                      background: active ? "var(--ink)" : "transparent",
                      color: active ? "var(--cream)" : "rgba(30,15,10,0.58)",
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "clamp(0.5rem, 0.9vw, 0.58rem)",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      fontWeight: 800,
                      boxShadow: active ? "0 10px 22px -14px rgba(30,15,10,0.55)" : "none",
                    }}
                  >
                    <span>{option.label}</span>
                    {option.badge && (
                      <span
                        aria-hidden="true"
                        className="rounded-full px-1.5 py-0.5 sm:px-2"
                        style={{
                          background: "var(--gold)",
                          color: "var(--ink)",
                          fontFamily: "'Jost', sans-serif",
                          fontSize: "clamp(0.38rem, 0.7vw, 0.46rem)",
                          letterSpacing: "0.07em",
                          textTransform: "uppercase",
                          whiteSpace: "nowrap",
                          fontWeight: 800,
                        }}
                      >
                        {option.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-center text-[var(--ink)]/48" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}>
              {contractTerm === "6" ? "6-month start · Setup fee due upfront" : "12-month plan · 1 month free · Setup fee due upfront"}
            </p>
          </div>

          {/* Starter & Growth side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-7 items-start">
            {PLANS.slice(1).map((p) => (
              <div key={p.id} id={`plan-${p.id}`} className="scroll-mt-32">
                <PlanCard plan={p} billing={contractTerm} ctaHref="#contact" />
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* [LSA upsell removed — now integrated into Foundation card] */}
      <div className="mt-10 max-w-5xl mx-auto hidden">
        <div className="text-center mb-6">
          <p className="text-[var(--gold)] text-[10px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
            Foundation Plan Add-On
          </p>
          <h3
            className="mt-2 italic text-[var(--ink)]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.75rem, 3vw, 2.4rem)", lineHeight: 1.05 }}
          >
            Google Local Service Ads
          </h3>
          <p
            className="mt-3 text-[var(--ink)]/60 leading-7 max-w-xl mx-auto"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontStyle: "italic" }}
          >
            Your business shows as sponsored with a top rating on Google. You only pay per result, not per click.
          </p>
          <div className="mt-4 flex items-center gap-3 max-w-xs mx-auto">
            <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--gold) 45%, transparent), transparent)" }} />
            <span style={{ color: "var(--gold)", fontSize: "0.7rem" }}>♥</span>
            <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--gold) 45%, transparent), transparent)" }} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1 — Basic $297 */}
          <article
            className="rounded-[28px] p-8 flex flex-col"
            style={{
              background: "linear-gradient(180deg, #fbf3ee 0%, #f6e8e1 100%)",
              border: "1px solid color-mix(in oklab, var(--gold) 35%, transparent)",
              boxShadow: "0 30px 60px -30px rgba(160,110,95,0.35), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            <p className="text-[var(--gold)] text-[10px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
              Google LSA · Basic Management
            </p>
            <h4 className="mt-3 italic text-[var(--ink)]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.55rem, 2.2vw, 2rem)", lineHeight: 1.1 }}>
              Basic Management
            </h4>
            <div className="mt-5 flex items-end gap-1.5">
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 3.8vw, 3.25rem)", fontStyle: "italic", color: "var(--gold)", lineHeight: 1 }}>$297</span>
              <span className="mb-1.5" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(30,15,10,0.45)" }}>/mo</span>
            </div>
            <div className="my-5 flex items-center gap-3">
              <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--gold) 40%, transparent), transparent)" }} />
              <span style={{ color: "var(--gold)", fontSize: "0.6rem" }}>✦</span>
              <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--gold) 40%, transparent), transparent)" }} />
            </div>
            <ul className="space-y-3 flex-1">
              {["Your business listed as a Google Sponsored result", "Top-rated badge displayed on your listing", "Pay per lead — not per click", "Ad setup, optimization, and monthly management", "Budget monitoring and performance reporting"].map((f, i) => (
                <li key={i} className="flex items-start gap-3" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.88rem", color: "rgba(30,15,10,0.82)" }}>
                  <PlanFeatureIcon index={i} filled={false} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: "rgba(200,168,100,0.1)", border: "1px solid rgba(200,168,100,0.3)" }}>
              <span style={{ color: "var(--gold)", fontSize: "0.75rem", flexShrink: 0 }}>✦</span>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.78rem", color: "var(--ink)", opacity: 0.75 }}>Pay 3 months upfront — your 4th month is free.</p>
            </div>
            <a href="#contact" className="mt-5 w-full block rounded-2xl px-5 py-4 text-center transition-all hover:-translate-y-0.5 hover:opacity-90" style={{ backgroundColor: "var(--gold)", boxShadow: "0 12px 28px -10px rgba(160,110,60,0.5)" }}>
              <p className="text-[var(--ink)] leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", fontWeight: 700 }}>Ask About Google LSA →</p>
            </a>
          </article>

          {/* Card 2 — With AI Conversations $497 */}
          <article
            className="rounded-[28px] p-8 flex flex-col relative"
            style={{
              background: "linear-gradient(180deg, #fbf3ee 0%, #f6e8e1 100%)",
              border: "2px solid color-mix(in oklab, var(--gold) 55%, transparent)",
              boxShadow: "0 40px 80px -24px rgba(160,90,80,0.4), 0 0 0 1px rgba(200,168,100,0.2), inset 0 1px 0 rgba(255,255,255,0.7)",
            }}
          >
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-[10px] tracking-luxe uppercase whitespace-nowrap" style={{ fontFamily: "'Jost', sans-serif", backgroundColor: "var(--gold)", color: "var(--ink)", fontWeight: 700, boxShadow: "0 8px 20px -10px rgba(120,80,60,0.5)" }}>
              Most Popular
            </span>
            <p className="text-[var(--gold)] text-[10px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
              Google LSA · With AI Conversations
            </p>
            <h4 className="mt-3 italic text-[var(--ink)]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.55rem, 2.2vw, 2rem)", lineHeight: 1.1 }}>
              Google LSA + AI Conversations
            </h4>
            <div className="mt-5 flex items-end gap-1.5">
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 3.8vw, 3.25rem)", fontStyle: "italic", color: "var(--gold)", lineHeight: 1 }}>$497</span>
              <span className="mb-1.5" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(30,15,10,0.45)" }}>/mo</span>
            </div>
            <div className="my-5 flex items-center gap-3">
              <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--gold) 40%, transparent), transparent)" }} />
              <span style={{ color: "var(--gold)", fontSize: "0.6rem" }}>✦</span>
              <span className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--gold) 40%, transparent), transparent)" }} />
            </div>
            <ul className="space-y-3 flex-1">
              {["Everything in the Basic plan", "AI-powered conversations that respond to every lead instantly", "Automatic lead follow-up so no inquiry goes unanswered", "Smart qualification — AI captures name, need, and contact details", "Seamlessly hands off hot leads to your team or booking system"].map((f, i) => (
                <li key={i} className="flex items-start gap-3" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.88rem", color: "rgba(30,15,10,0.82)" }}>
                  <PlanFeatureIcon index={i} filled={false} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: "rgba(200,168,100,0.1)", border: "1px solid rgba(200,168,100,0.3)" }}>
              <span style={{ color: "var(--gold)", fontSize: "0.75rem", flexShrink: 0 }}>✦</span>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.78rem", color: "var(--ink)", opacity: 0.75 }}>Pay 3 months upfront — your 4th month is free.</p>
            </div>
            <a href="#contact" className="mt-5 w-full block rounded-2xl px-5 py-4 text-center transition-all hover:-translate-y-0.5 hover:opacity-90" style={{ backgroundColor: "var(--gold)", boxShadow: "0 12px 28px -10px rgba(160,110,60,0.5)" }}>
              <p className="text-[var(--ink)] leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", fontWeight: 700 }}>Ask About Google LSA + AI →</p>
            </a>
          </article>
        </div>
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
      ? { url: "https://medspa.dollhousebrandstudio.com/apply", label: "Continue to the med spa application", msg: "We run a dedicated done-for-you program just for med spas and clinics — you'll get the right application and offer over there." }
      : fd.decision_maker === "No, I am researching for someone else"
      ? { url: "https://room.shopdollhouse.co", label: "Explore the Brand Room", msg: "Since you're researching for someone else, the Brand Room and our digital products are the best place to start." }
      : fd.budget === "Under $300"
      ? { url: "https://room.shopdollhouse.co", label: "Explore the Brand Room & products", msg: "For budgets under $300/mo, the Brand Room and our digital products are the best fit — build your foundation first, then graduate into a managed plan." }
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
          <Eyebrow>Private Proposal Request</Eyebrow>
          <h2
            className="mt-4 text-[var(--rose)] leading-[0.98]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 6vw, 5.8rem)", fontWeight: 400 }}
          >
            Apply for your private growth plan.
          </h2>
          <p className="mt-6 max-w-lg text-[var(--ink)]/62 leading-8" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}>
            Share what you sell, what is getting stuck, and which level of support feels realistic. We will recommend the right plan, contract term, setup path, add-ons, and free-trial timeline before you commit.
          </p>
          <div className="mt-8 grid gap-3">
            {[
              ["1", "We review your business, offer, current online presence, and lead flow."],
              ["2", "You receive a private recommendation for the plan, term, setup fee, free-trial window, and add-ons."],
              ["3", "If it is a fit, we book your strategy call and map the build timeline."],
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
                <p className="mt-2 text-[var(--ink)]/58 leading-6" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem" }}>45 minutes with Mandy. No pitch, no pressure — just clarity on what's possible for your business.</p>
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
                  Choose how you'd like to connect — we'll take it from there.
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
                      Send a Private Proposal Request
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
                      Skip the form and jump straight into a free 45-minute call with Mandy — no pressure, just clarity.
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
                    Step {step} of {TOTAL_STEPS} — {stepTitles[step - 1]}
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
                      options={["Home service or contractor (roofing, HVAC, renovations, etc.)", "Real estate broker or agent", "Other service business", "Product or e-commerce business", "Just starting — no business yet", "Med spa or aesthetic clinic"]}
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
                    <textarea value={fd.challenge} onChange={set("challenge")} rows={4} placeholder="Be as specific as you can — this helps us prepare for your call." className={`${ic} resize-none`} style={is} />
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
                    <input type="text" value={fd.lead_source} onChange={set("lead_source")} placeholder="e.g. Google, referrals, Instagram — about 5 per month" className={ic} style={is} />
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
                    <textarea value={fd.anything_else} onChange={set("anything_else")} rows={3} placeholder="Totally optional — but anything you share helps." className={`${ic} resize-none`} style={is} />
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
        The Brand Room helps beginners shape their offer, brand, content direction, and web app foundation before they move into a full growth retainer.
      </p>
      <a
        href="https://room.shopdollhouse.co"
        className="mt-8 inline-flex items-center gap-2 rounded-2xl px-8 py-4 hover:-translate-y-0.5 transition-all"
        style={{ backgroundColor: "var(--ink)", color: "var(--cream)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontStyle: "italic", fontWeight: 700 }}
      >
        Start in The Brand Room →
      </a>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────── */
function Footer() {
  return <SiteFooter />;
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
  usePageMeta(
    "Done-For-You Social Media Marketing in York Region & the GTA | The Dollhouse Brand Studio",
    "Done-for-you social media marketing for service businesses in York Region, Toronto, and the GTA. Daily content, AI video, paid ads, review automation, and lead-converting websites — all handled for you.",
  );

  // Scroll-reveal: sections gently rise + fade in as they enter the viewport.
  useScrollReveal();

  return (
    <main className="bg-[var(--blush)] text-[var(--ink)]">
      <Nav />
      <Hero />
      <ChooseYourPath />
      <TrustBar />
      <Services />
      <ProofSection />
      <AICloneSection />
      <About />
      <HowItWorks />
      <Pricing />
      <AgencyFooterNotes />
      <AgencyFaqSection />
      <FinalCtaSection proposalHref="#contact" />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}
