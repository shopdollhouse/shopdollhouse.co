import { useEffect, useState } from "react";
import {
  ArrowRight,
  Tag,
  ShoppingBag,
  ListChecks,
  HelpCircle,
  Calculator,
  CalendarCheck,
  CreditCard,
  Images,
  KeyRound,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Menu,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import archMark from "@/assets/arch-mark.svg";
import { IllustrationCarouselPlan, IllustrationSinglePlan, IllustrationAccess, IllustrationBook, IllustrationCheckout, IllustrationFirstPosts, IllustrationPosts, IllustrationQuote, IllustrationReply } from "@/components/LaunchIllustrations";
import bgImage from "@/assets/password-bg.jpg";
import mandyPhoto from "@/assets/mandy-photo.jpg";
import {
  ADDON_PLATFORM_PRICE,
  AI_USAGE_COVERED,
  FIRST_POSTS_DAYS,
  GUARANTEE_DAYS,
  HERO_VIDEO_EMBED_URL,
  INCLUDED_IN_BOTH,
  LAUNCH_PLANS,
  POSTS_PER_MONTH,
  PRICE_SINGLE,
  SHOW_VALUE_STACK,
  VALUE_STACK,
  VALUE_STACK_BONUSES,
  VALUE_STACK_TOTAL,
  checkoutHref,
  type LaunchPlanId,
} from "@/lib/launch-offer";

const DISPLAY = "'Cormorant Garamond', serif";
const BODY = "'DM Sans', sans-serif";
const LUXE = "'Jost', sans-serif";
const HEAD = "'Jost', sans-serif";

/* ─── Shared pieces ───────────────────────────────────── */
function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`${light ? "" : "gold-grad"} inline-flex items-center gap-3 text-[10.5px] tracking-[0.34em] uppercase font-medium`}
      style={{ fontFamily: LUXE, ...(light ? { color: "var(--gold)" } : {}) }}
    >
      <span aria-hidden className="h-px w-8 bg-[var(--gold)] opacity-60" />
      {children}
      <span aria-hidden className="h-px w-8 bg-[var(--gold)] opacity-60" />
    </p>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-2 text-[var(--gold)] my-4">
      <span className="h-px w-16 bg-current opacity-50" />
      <svg viewBox="0 0 12 10" className="w-2.5 h-2.5 fill-current">
        <path d="M6 9 L0.5 3.5 a2.2 2.2 0 0 1 3.1 -3.1 L6 2.8 l2.4 -2.4 a2.2 2.2 0 0 1 3.1 3.1 Z" />
      </svg>
      <span className="h-px w-16 bg-current opacity-50" />
    </div>
  );
}

function SectionHead({ eyebrow, title, sub, dark = false }: { eyebrow: string; title: React.ReactNode; sub?: string; dark?: boolean }) {
  return (
    <div className="text-center max-w-4xl mx-auto">
      <Eyebrow light={dark}>{eyebrow}</Eyebrow>
      <h2
        className={`${dark ? "text-[var(--cream)]" : "text-[var(--ink)]"} mt-6 uppercase`}
        style={{ fontFamily: HEAD, fontWeight: 300, fontSize: "clamp(2rem, 4.6vw, 3.5rem)", letterSpacing: "-0.01em", lineHeight: 1.06 }}
      >
        {title}
      </h2>
      <Divider />
      {sub && (
        <p className={`mx-auto max-w-2xl leading-8 ${dark ? "text-[var(--cream)]/62" : "text-[var(--ink)]/62"}`} style={{ fontFamily: BODY, fontSize: "1.02rem", fontWeight: 300 }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function CheckDot() {
  return (
    <span
      className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
      style={{ background: "color-mix(in oklab, var(--gold) 20%, transparent)", color: "var(--gold)" }}
    >
      <Check className="h-3 w-3" strokeWidth={3} />
    </span>
  );
}

const card = {
  background: "rgba(255,251,248,0.88)",
  border: "1px solid color-mix(in oklab, var(--gold) 38%, transparent)",
  boxShadow: "0 40px 80px -48px rgba(110,60,50,0.45)",
} as const;

/** Primary conversion button: always goes straight to checkout. */
function GetStarted({
  plan = "single",
  label = "Get Started",
  className = "",
}: {
  plan?: LaunchPlanId;
  label?: string;
  className?: string;
}) {
  return (
    <a href={checkoutHref(plan)} className={`btn-ink ${className}`}>
      {label}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

/* ─── Nav ─────────────────────────────────────────────── */
const NAV_LINKS = [
  { href: "#whats-included", label: "What's Included" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#plans", label: "Plans & Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function LaunchNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
        style={{
          backgroundColor: scrolled ? "color-mix(in oklab, var(--cream) 94%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
          borderBottom: scrolled ? "1px solid color-mix(in oklab, var(--gold) 22%, transparent)" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10">
          <a href="/" className="flex items-center gap-2.5 shrink-0 no-underline">
            <img src={archMark} alt="" className="h-10 w-auto" />
            <span className="flex flex-col items-start leading-none">
              <span style={{ fontFamily: "'Allura', cursive", color: "var(--gold)", fontSize: "20px", letterSpacing: "0.5px", textTransform: "lowercase", lineHeight: 1 }}>the</span>
              <span style={{ fontFamily: DISPLAY, color: "var(--rose)", fontSize: "19px", fontWeight: 500, letterSpacing: "5px", textTransform: "uppercase", lineHeight: 1, marginTop: "-1px" }}>Dollhouse</span>
              <span className="font-semibold" style={{ fontFamily: LUXE, color: "var(--gold)", fontSize: "7px", letterSpacing: "6px", textTransform: "uppercase", marginTop: "2px" }}>Launch</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-9 text-[10px] tracking-luxe uppercase text-[var(--ink)]/80" style={{ fontFamily: LUXE }}>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link hover:text-[var(--rose)] transition-colors">
                {l.label}
              </a>
            ))}
            <GetStarted label="Get Started Now" className="!py-2.5 !px-5 !text-[10px]" />
          </div>

          <button type="button" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)} className="lg:hidden p-2 text-[var(--ink)]">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div
            className="lg:hidden px-6 pb-6 pt-4 flex flex-col gap-4 text-[11px] tracking-luxe uppercase text-[var(--ink)]/80"
            style={{ fontFamily: LUXE, background: "color-mix(in oklab, var(--cream) 97%, transparent)", borderBottom: "1px solid color-mix(in oklab, var(--gold) 22%, transparent)" }}
          >
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="hover:text-[var(--rose)]">
                {l.label}
              </a>
            ))}
            <GetStarted label="Get Started Now" className="justify-center mt-1" />
          </div>
        )}
      </nav>
    </>
  );
}

/* ─── Hero ────────────────────────────────────────────── */
/* Animated story: timer ticks, messages arrive, appointment gets booked, loop. */
const STORY_EVENTS = [700, 2000, 3300, 5200, 6200, 7500, 9300, 10600]; // step 1..8
const STORY_LOOP_MS = 15500;

function usePhoneStory() {
  const [elapsed, setElapsed] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      setElapsed(11000);
      return;
    }
    const start = performance.now();
    const id = window.setInterval(() => setElapsed((performance.now() - start) % STORY_LOOP_MS), 100);
    return () => window.clearInterval(id);
  }, []);

  const step = STORY_EVENTS.filter((t) => elapsed >= t).length;
  const secs = still ? 14 : Math.floor(elapsed / 1000);
  return { step, secs };
}

function Bubble({ who, label, children }: { who: "them" | "us"; label: string; children: React.ReactNode }) {
  const us = who === "us";
  return (
    <div
      className={`phone-pop max-w-[88%] rounded-[16px] px-3.5 py-2.5 ${us ? "" : "ml-auto"}`}
      style={us ? { background: "rgba(198,178,130,0.12)", border: "1px solid rgba(198,178,130,0.3)" } : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
    >
      <p className="text-[7.5px] tracking-[0.26em] uppercase" style={{ fontFamily: LUXE, color: us ? "rgba(198,178,130,0.95)" : "rgba(255,255,255,0.45)" }}>{label}</p>
      <p className="mt-1 leading-snug" style={{ fontFamily: BODY, fontSize: "0.78rem", color: "#f5efe6" }}>{children}</p>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="phone-pop flex w-[62px] items-center gap-1.5 rounded-[16px] px-4 py-3.5" style={{ background: "rgba(198,178,130,0.12)", border: "1px solid rgba(198,178,130,0.3)" }}>
      {[0, 1, 2].map((i) => (
        <span key={i} className="phone-dot h-1.5 w-1.5 rounded-full" style={{ background: "#c6b282", animationDelay: `${i * 0.18}s` }} />
      ))}
    </div>
  );
}

function HeroVisual() {
  const { step, secs } = usePhoneStory();
  const typing = step === 2 || step === 5;
  const booked = step >= 8;
  const mm = String(Math.floor(secs / 60));
  const ss = String(secs % 60).padStart(2, "0");
  const metal = "linear-gradient(180deg, #6f6a62 0%, #2b2925 50%, #55514a 100%)";

  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[310px]" aria-hidden>
      <div className="absolute -inset-12 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(198,178,130,0.3), transparent 62%)" }} />

      <div className="relative">
        {/* side buttons */}
        <span className="absolute -left-[3px] top-[96px] h-7 w-[4px] rounded-l-sm" style={{ background: metal }} />
        <span className="absolute -left-[3px] top-[150px] h-12 w-[4px] rounded-l-sm" style={{ background: metal }} />
        <span className="absolute -left-[3px] top-[210px] h-12 w-[4px] rounded-l-sm" style={{ background: metal }} />
        <span className="absolute -right-[3px] top-[170px] h-20 w-[4px] rounded-r-sm" style={{ background: metal }} />

        {/* titanium frame */}
        <div
          className="relative rounded-[58px] p-[3px]"
          style={{ background: "linear-gradient(145deg, #a39b8d 0%, #3d3934 20%, #14120f 50%, #4d483f 78%, #aaa294 100%)", boxShadow: "0 70px 110px -40px rgba(24,10,6,0.85), 0 30px 60px -30px rgba(0,0,0,0.6)" }}
        >
          {/* bezel */}
          <div className="rounded-[55px] p-[9px]" style={{ background: "#020202" }}>
            {/* screen */}
            <div className="relative flex flex-col overflow-hidden rounded-[46px]" style={{ background: "linear-gradient(180deg, #0d0c0b 0%, #070706 100%)", aspectRatio: "9 / 19" }}>
              {/* glare */}
              <div aria-hidden className="pointer-events-none absolute inset-0 z-30" style={{ background: "linear-gradient(118deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.02) 28%, transparent 40%)" }} />

              {/* dynamic island + status bar */}
              <div className="absolute left-1/2 top-[11px] z-20 flex h-[26px] w-[92px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-3">
                <span className="h-2 w-2 rounded-full" style={{ background: "radial-gradient(circle at 35% 35%, #26304a, #0a0d16)" }} />
              </div>
              <div className="absolute inset-x-0 top-[14px] z-10 flex items-center justify-between px-8" style={{ fontFamily: BODY, fontSize: "0.7rem", fontWeight: 600, color: "#f5efe6" }}>
                <span>9:41</span>
                <span className="flex items-center gap-1.5">
                  <svg width="15" height="10" viewBox="0 0 16 10" fill="currentColor"><rect x="0" y="6" width="2.6" height="4" rx="0.6" /><rect x="4.4" y="4" width="2.6" height="6" rx="0.6" /><rect x="8.8" y="2" width="2.6" height="8" rx="0.6" /><rect x="13.2" y="0" width="2.6" height="10" rx="0.6" /></svg>
                  <svg width="20" height="10" viewBox="0 0 20 10" fill="none"><rect x="0.5" y="0.5" width="16" height="9" rx="2.4" stroke="currentColor" opacity="0.5" /><rect x="2" y="2" width="13" height="6" rx="1.4" fill="currentColor" /><rect x="17.5" y="3.2" width="1.6" height="3.6" rx="0.8" fill="currentColor" opacity="0.5" /></svg>
                </span>
              </div>

              {/* caller */}
              <div className="flex flex-col items-center px-6 pt-[64px]">
                <span className="relative flex h-[58px] w-[58px] items-center justify-center rounded-full" style={{ background: "radial-gradient(circle at 35% 30%, #3a332a, #151210)", border: "1px solid rgba(198,178,130,0.5)", color: "#f5efe6", fontFamily: HEAD, fontSize: "1.45rem", fontWeight: 300 }}>
                  <span className="launch-ping absolute inset-0 rounded-full" style={{ background: "rgba(198,178,130,0.25)" }} />
                  <span className="relative">D</span>
                </span>
                <p className="mt-3" style={{ fontFamily: HEAD, fontWeight: 400, fontSize: "1.2rem", color: "#f5efe6" }}>The Dollhouse AI</p>
                <p className="mt-1.5 text-[9px] tracking-[0.3em] uppercase" style={{ fontFamily: LUXE, color: "#c6b282" }}>{booked ? "Booked" : "Replying now"}</p>
                <p className="mt-2 flex items-center gap-2 text-[11px]" style={{ fontFamily: BODY, color: "rgba(198,178,130,0.85)", letterSpacing: "0.12em" }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#c6b282" }} /> {mm}:{ss}
                </p>
              </div>

              <div className="mt-4 h-px w-full" style={{ background: "rgba(255,255,255,0.08)" }} />

              {/* conversation (newest at the bottom, older ones slide up) */}
              <div
                className="flex min-h-0 flex-1 flex-col justify-end gap-2.5 overflow-hidden px-4 pb-3 pt-3"
                style={{ WebkitMaskImage: "linear-gradient(to bottom, transparent 0, #000 22px)", maskImage: "linear-gradient(to bottom, transparent 0, #000 22px)" }}
              >
                {step >= 1 && <Bubble who="them" label="Customer">Hi, I saw your post. Are you taking new customers?</Bubble>}
                {step >= 3 && <Bubble who="us" label="Your business · Auto reply">Yes, we are! What service are you looking for, and when would you like to come in?</Bubble>}
                {step >= 4 && <Bubble who="them" label="Customer">Something this week, if possible.</Bubble>}
                {step >= 6 && <Bubble who="us" label="Your business · Auto reply">Great. I have Tuesday at 10:00 or Thursday at 2:30. Which works best?</Bubble>}
                {step >= 7 && <Bubble who="them" label="Customer">Thursday at 2:30.</Bubble>}
                {typing && <TypingDots />}
                {booked && <Bubble who="us" label="Your business · Auto reply">You are booked for Thursday at 2:30. See you then.</Bubble>}
              </div>

              {/* action */}
              <div className="px-5 pb-7">
                <div
                  className="py-3 text-center text-[9.5px] tracking-[0.26em] uppercase transition-colors duration-500"
                  style={{ fontFamily: LUXE, fontWeight: 600, background: booked ? "transparent" : "#c6b282", color: booked ? "#c6b282" : "#0a0a0a", border: "1px solid #c6b282", borderRadius: "2px" }}
                >
                  {booked ? "✓ Appointment booked" : "Book my appointment"}
                </div>
              </div>

              {/* home indicator */}
              <span aria-hidden className="absolute bottom-2 left-1/2 z-20 h-[4px] w-[108px] -translate-x-1/2 rounded-full" style={{ background: "rgba(255,255,255,0.7)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* floating messages, timed to the story */}
      <div
        className="launch-float absolute -left-6 top-[26%] z-30 flex items-center gap-2.5 rounded-2xl px-4 py-3 transition-all duration-700 sm:-left-24 lg:-left-28"
        style={{ opacity: step >= 3 ? 1 : 0.0, transform: step >= 3 ? "scale(1)" : "scale(0.9)", background: "rgba(255,250,246,0.95)", border: "1px solid color-mix(in oklab, var(--gold) 34%, transparent)", boxShadow: "0 24px 50px -24px rgba(90,40,30,0.5)" }}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: "color-mix(in oklab, var(--rose) 16%, transparent)", color: "var(--rose)" }}>
          <MessageSquare className="h-4 w-4" />
        </span>
        <span className="leading-tight">
          <span className="block text-[var(--ink)]" style={{ fontFamily: BODY, fontSize: "0.74rem", fontWeight: 600 }}>Auto-reply sent</span>
          <span className="block text-[var(--ink)]/50" style={{ fontFamily: BODY, fontSize: "0.65rem" }}>Comment to private message</span>
        </span>
      </div>

      <div
        className="launch-float-slow absolute -right-4 top-[11%] z-30 flex items-center gap-2.5 rounded-2xl px-4 py-3 transition-all duration-700 sm:-right-20 lg:-right-24"
        style={{ opacity: booked ? 1 : 0, transform: booked ? "scale(1)" : "scale(0.9)", background: "rgba(255,250,246,0.95)", border: "1px solid color-mix(in oklab, var(--gold) 34%, transparent)", boxShadow: "0 24px 50px -24px rgba(90,40,30,0.5)" }}
      >
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full" style={{ background: "color-mix(in oklab, var(--gold) 22%, transparent)", color: "var(--gold)" }}>
          <span className="launch-ping absolute inset-0 rounded-full" style={{ background: "color-mix(in oklab, var(--gold) 45%, transparent)" }} />
          <CalendarCheck className="relative h-4 w-4" />
        </span>
        <span className="leading-tight">
          <span className="block text-[var(--ink)]" style={{ fontFamily: BODY, fontSize: "0.74rem", fontWeight: 600 }}>Appointment booked</span>
          <span className="block text-[var(--ink)]/50" style={{ fontFamily: BODY, fontSize: "0.65rem" }}>Added to your calendar</span>
        </span>
      </div>

      <p className="mt-6 text-center text-[var(--ink)]/40 text-[9px] tracking-luxe uppercase" style={{ fontFamily: LUXE }}>
        Illustrative example
      </p>
    </div>
  );
}

export function LaunchHeroBlock() {
  return (
    <>
      <LaunchHero />
      <HeroVideo />
    </>
  );
}

function LaunchHero() {
  return (
    <header className="relative overflow-hidden px-5 pt-32 pb-20 md:pt-40 md:pb-28">
      <div
        aria-hidden
        className="bg-kenburns absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div aria-hidden className="aurora absolute inset-0 pointer-events-none" />
      <span aria-hidden className="sparkle-drift" style={{ top: "18%", left: "6%", fontSize: "16px" }}>✦</span>
      <span aria-hidden className="sparkle-drift" style={{ top: "62%", left: "44%", fontSize: "12px", animationDelay: "1.6s" }}>✦</span>
      <span aria-hidden className="sparkle-drift" style={{ bottom: "14%", left: "12%", fontSize: "11px", animationDelay: "3s" }}>✦</span>
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "rgba(247,228,223,0.4)" }} />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(230,200,195,0.4) 72%, rgba(210,175,168,0.65) 100%)" }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="text-center lg:text-left">
          <p
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-[10px] tracking-luxe uppercase text-[var(--ink)]/75"
            style={{ fontFamily: LUXE, background: "rgba(255,250,246,0.78)", border: "1px solid color-mix(in oklab, var(--gold) 34%, transparent)" }}
          >
            <span style={{ color: "var(--gold)" }}>✦</span> For local business owners
          </p>

          <h1
            className="mt-7 text-[var(--ink)]"
            style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(2.8rem, 7vw, 5.4rem)", lineHeight: 1.0 }}
          >
            Turn your social media into{" "}
            <span className="italic text-[var(--rose)]">booked appointments.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[var(--ink)]/72 leading-8 lg:mx-0" style={{ fontFamily: BODY, fontSize: "clamp(1rem, 2vw, 1.15rem)" }}>
            The done-for-you social media and lead-generation system for appointment-based and service businesses. We post for you,
            capture new inquiries, reply instantly and book the appointment, from{" "}
            <strong className="text-[var(--ink)]">${PRICE_SINGLE}/month</strong>.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
            {["Daily social media posts", "Lead capture tool", "AI follow-up & booking"].map((label) => (
              <span
                key={label}
                className="rounded-full px-4 py-2 text-[10px] tracking-luxe uppercase text-[var(--ink)]"
                style={{ fontFamily: LUXE, fontWeight: 600, background: "rgba(255,250,246,0.85)", border: "1px solid color-mix(in oklab, var(--gold) 38%, transparent)", boxShadow: "0 14px 30px -22px rgba(120,70,55,0.5)" }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <GetStarted label="Get Started Now" className="!px-10 !py-[18px] !text-[12px]" />
            
          </div>

          <p className="mt-7 text-[var(--ink)]/72" style={{ fontFamily: BODY, fontSize: "0.98rem" }}>
            Done-for-you social media from <strong className="text-[var(--ink)]">${PRICE_SINGLE}/mo</strong>
          </p>
          <p className="mt-1 italic text-[var(--ink)]/55" style={{ fontFamily: DISPLAY, fontSize: "1.15rem" }}>
            Built for organic growth. No paid ads or ad spend required.
          </p>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] tracking-[0.16em] uppercase text-[var(--ink)]/60 lg:justify-start" style={{ fontFamily: LUXE }}>
            {[`${GUARANTEE_DAYS}-day money-back guarantee`, "No contract, cancel anytime", "Instant account access", "Free CRM account included", "1-on-1 kickoff call"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <span style={{ color: "var(--gold)" }}>✦</span> {t}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </div>
    </header>
  );
}

/* ─── Walkthrough video (right under the hero) ────────── */
function HeroVideo() {
  if (!HERO_VIDEO_EMBED_URL) return null;
  return (
    <section className="px-5 pb-20 pt-4 md:pb-24" style={{ background: "linear-gradient(180deg, #fbf1ed 0%, var(--cream) 100%)" }}>
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-[var(--ink)] uppercase" style={{ fontFamily: LUXE, fontWeight: 600, letterSpacing: "0.12em", fontSize: "1rem" }}>
          See how it works <span className="text-[var(--rose)]">↓</span>
        </p>
        <div className="mx-auto mt-5 aspect-video overflow-hidden rounded-[8px]" style={{ border: "1px solid color-mix(in oklab, var(--gold) 55%, transparent)", boxShadow: "0 50px 100px -40px rgba(70,30,25,0.55), 0 0 0 8px rgba(255,250,246,0.35)" }}>
          <iframe src={HERO_VIDEO_EMBED_URL} title="Dollhouse Launch video presentation" className="h-full w-full" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
        </div>
      </div>
    </section>
  );
}

/* ─── How it works ────────────────────────────────────── */
const STEPS = [
  {
    title: "We create your posts",
    copy: `Receive your first batch of posts for your business within ${FIRST_POSTS_DAYS} days.`,
    icon: ImageIcon,
    art: IllustrationPosts,
    bullets: [`${POSTS_PER_MONTH} posts every month`, "Written for your services and your area", "Published daily after your approval"],
    foot: `First posts in ${FIRST_POSTS_DAYS} days`,
  },
  {
    title: "We collect new inquiries",
    copy: "Visitors use a helpful quote calculator or quiz and share their contact details to get their results.",
    icon: Calculator,
    art: IllustrationQuote,
    bullets: ["Quote calculator or quiz for your website", "Results based on their answers", "Names and contact details saved automatically"],
    foot: "Inquiries captured for you",
  },
  {
    title: "We reply automatically",
    copy: "When someone comments or sends a message, they get a helpful private reply right away.",
    icon: MessageSquare,
    art: IllustrationReply,
    bullets: ["Comments get an instant private reply", "A few questions find the service they need", "New contacts saved for follow-up"],
    foot: "No more lost messages",
  },
  {
    title: "We follow up and book",
    copy: "New inquiries get follow-up, even after hours, and can book an appointment on your calendar.",
    icon: CalendarCheck,
    art: IllustrationBook,
    bullets: ["Follow-up starts right away, even at night", "Answers common questions you approve", "Books the appointment on your calendar"],
    foot: "Appointments on your calendar",
  },
];

export function LaunchHowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-24 md:py-28 px-6" style={{ background: "linear-gradient(180deg, var(--cream) 0%, #f8e9e5 100%)" }}>
      <SectionHead
        eyebrow="How it works"
        title="Everything you need to turn social media attention into booked appointments"
        sub="Grow your business through organic social media. We create your posts, capture inquiries, and follow up with interested people without requiring paid ads."
      />
      <div className="mx-auto mt-16 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
        {STEPS.map((st, i) => {
          const Icon = st.icon;
          const Art = st.art;
          return (
            <article key={st.title} className="group flex flex-col overflow-hidden rounded-[8px] transition-all duration-500 hover:-translate-y-1.5" style={{ ...card, boxShadow: "0 40px 80px -44px rgba(110,60,50,0.5)" }}>
              <div className="relative h-[220px] overflow-hidden" style={{ background: "linear-gradient(160deg, #fbeee9 0%, #f3d9d3 100%)" }}>
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                  <Art />
                </div>
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-7" style={{ background: "linear-gradient(to top, rgba(255,251,248,0.9), transparent)" }} />
              </div>

              <div className="relative flex flex-1 flex-col px-7 pb-6">
                <span
                  className="relative z-10 -mt-7 flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ background: "var(--cream)", border: "1px solid color-mix(in oklab, var(--gold) 60%, transparent)", color: "var(--rose)", boxShadow: "0 14px 28px -14px rgba(120,70,55,0.55)" }}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>

                <p className="mt-5 text-[9.5px] tracking-[0.3em] uppercase" style={{ fontFamily: LUXE, color: "var(--gold)", fontWeight: 600 }}>
                  Step {i + 1}
                </p>
                <h3 className="mt-2 text-[var(--ink)]" style={{ fontFamily: HEAD, fontSize: "1.3rem", fontWeight: 500, lineHeight: 1.2 }}>{st.title}</h3>
                <p className="mt-3 text-[var(--ink)]/62 leading-7" style={{ fontFamily: BODY, fontSize: "0.9rem", fontWeight: 300 }}>{st.copy}</p>

                <ul className="mt-5 grid gap-2.5">
                  {st.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-[var(--ink)]/75 leading-5" style={{ fontFamily: BODY, fontSize: "0.84rem" }}>
                      <span className="mt-[1px] shrink-0" style={{ color: "var(--gold)" }}>✦</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <div className="h-px w-full" style={{ background: "color-mix(in oklab, var(--gold) 32%, transparent)" }} />
                  <p className="mt-4 flex items-center gap-2.5 text-[9px] tracking-[0.26em] uppercase" style={{ fontFamily: LUXE, color: "color-mix(in oklab, var(--ink) 55%, transparent)" }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--gold)" }} />
                    {st.foot}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ─── What's included ─────────────────────────────────── */
type PreviewKind = "quote" | "replies" | "booking";

function ServicePreview({ kind }: { kind: PreviewKind }) {
  const shell = {
    background: "linear-gradient(160deg, #fffaf6 0%, #f7e9e3 100%)",
    border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)",
    boxShadow: "0 24px 50px -30px rgba(120,70,60,0.45)",
  } as const;

  if (kind === "quote") {
    return (
      <div aria-hidden className="rounded-2xl p-5" style={shell}>
        <p className="text-[8px] tracking-luxe uppercase text-[var(--gold)]" style={{ fontFamily: LUXE }}>Quote calculator · example</p>
        <p className="mt-2 text-[var(--ink)]" style={{ fontFamily: DISPLAY, fontSize: "1.25rem" }}>What do you need help with?</p>
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full" style={{ background: "rgba(31,17,11,0.08)" }}>
          <div className="h-full w-2/5 rounded-full" style={{ background: "var(--gold)" }} />
        </div>
        <div className="mt-4 grid gap-2">
          {["Service one", "Service two", "Not sure yet"].map((o, i) => (
            <div key={o} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5" style={{ background: i === 1 ? "var(--ink)" : "rgba(255,255,255,0.8)", border: "1px solid color-mix(in oklab, var(--gold) 26%, transparent)" }}>
              <span className="h-3.5 w-3.5 rounded-full" style={{ border: `1.5px solid ${i === 1 ? "var(--gold)" : "rgba(31,17,11,0.3)"}`, background: i === 1 ? "var(--gold)" : "transparent" }} />
              <span style={{ fontFamily: BODY, fontSize: "0.78rem", color: i === 1 ? "var(--cream)" : "var(--ink)" }}>{o}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-full py-2.5 text-center text-[9px] tracking-luxe uppercase" style={{ fontFamily: LUXE, background: "var(--ink)", color: "var(--cream)" }}>See my results</div>
      </div>
    );
  }

  if (kind === "replies") {
    return (
      <div aria-hidden className="rounded-2xl p-5" style={shell}>
        <p className="text-[8px] tracking-luxe uppercase text-[var(--gold)]" style={{ fontFamily: LUXE }}>Comment to private reply · example</p>
        <div className="mt-3 flex items-start gap-2.5">
          <span className="mt-0.5 h-7 w-7 shrink-0 rounded-full" style={{ background: "rgba(31,17,11,0.12)" }} />
          <div className="rounded-2xl rounded-tl-sm px-3.5 py-2" style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(31,17,11,0.08)" }}>
            <p className="text-[var(--ink)]" style={{ fontFamily: BODY, fontSize: "0.78rem" }}>QUOTE</p>
          </div>
        </div>
        <div className="mt-3 ml-auto max-w-[88%] rounded-2xl rounded-tr-sm px-3.5 py-2.5" style={{ background: "var(--ink)" }}>
          <p className="text-[var(--cream)]/90 leading-snug" style={{ fontFamily: BODY, fontSize: "0.78rem" }}>Hi! Thanks for asking. Which service are you looking for?</p>
        </div>
        <div className="mt-2 flex items-start gap-2.5">
          <span className="mt-0.5 h-7 w-7 shrink-0 rounded-full" style={{ background: "rgba(31,17,11,0.12)" }} />
          <div className="rounded-2xl rounded-tl-sm px-3.5 py-2" style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(31,17,11,0.08)" }}>
            <p className="text-[var(--ink)]" style={{ fontFamily: BODY, fontSize: "0.78rem" }}>Service two, please.</p>
          </div>
        </div>
        <p className="mt-3 text-center text-[8px] tracking-luxe uppercase text-[var(--rose)]" style={{ fontFamily: LUXE }}>Contact saved for follow-up</p>
      </div>
    );
  }

  return (
    <div aria-hidden className="rounded-2xl p-5" style={shell}>
      <p className="text-[8px] tracking-luxe uppercase text-[var(--gold)]" style={{ fontFamily: LUXE }}>Booking · example</p>
      <div className="mt-3 rounded-2xl rounded-tl-sm px-3.5 py-2.5" style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(31,17,11,0.08)" }}>
        <p className="text-[var(--ink)]/80 leading-snug" style={{ fontFamily: BODY, fontSize: "0.78rem" }}>Thanks for reaching out! Here are a few times that work. Pick one and you are booked.</p>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {["Tue 10:00", "Wed 2:30", "Fri 11:00"].map((t, i) => (
          <div key={t} className="rounded-xl py-2 text-center" style={{ fontFamily: BODY, fontSize: "0.7rem", background: i === 1 ? "var(--gold)" : "rgba(255,255,255,0.85)", color: "var(--ink)", border: "1px solid color-mix(in oklab, var(--gold) 34%, transparent)", fontWeight: i === 1 ? 600 : 400 }}>{t}</div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-2 rounded-xl py-2.5" style={{ background: "color-mix(in oklab, var(--gold) 18%, transparent)" }}>
        <CalendarCheck className="h-4 w-4 text-[var(--rose)]" />
        <span className="text-[var(--ink)]" style={{ fontFamily: BODY, fontSize: "0.76rem", fontWeight: 600 }}>Appointment booked</span>
      </div>
    </div>
  );
}

const SERVICES: {
  icon: typeof ImageIcon;
  title: string;
  lead: string;
  points: string[];
  preview?: PreviewKind;
}[] = [
  {
    icon: ImageIcon,
    title: "Daily Social Media Posts for Your Business",
    lead: "Consistent, credible content that turns your expertise into trust.",
    points: [
      `${POSTS_PER_MONTH} single-image social media posts per month`,
      "Published daily to Instagram and Facebook after approval",
      "Reasonable revisions included at no additional charge",
      "Posts written for your services, your town and your customers",
      "We manage and improve everything for you",
    ],
  },
  {
    icon: Calculator,
    title: "Website Quote Calculator or Quiz That Collects New Inquiries",
    lead: "We build a helpful calculator or quiz for your website. Visitors receive personalized information, and you receive their contact details and the service they need.",
    points: [
      "A custom quote calculator or quiz for your website",
      "Built around the services you offer",
      "Visitors receive results based on their answers",
      "Works on phones, tablets and computers",
      "Names, contact details and service needs are saved automatically",
      "Revisions and updates to keep your calculator or quiz working",
    ],
    preview: "quote",
  },
  {
    icon: MessageSquare,
    title: "Automatic Replies to Comments and Messages",
    lead: "When someone comments or asks a question, they receive a helpful private message that starts the conversation.",
    points: [
      "Certain comments receive an immediate private reply",
      "Helpful responses continue the conversation",
      "A few questions identify the service they need before you take over",
      "Contact information is saved automatically",
      "New contacts are saved for follow-up",
      "Questions and replies are written for the services you offer",
    ],
    preview: "replies",
  },
  {
    icon: CalendarCheck,
    title: "Automatic Follow-Up and Appointment Booking",
    lead: "New inquiries receive prompt replies, answers to common questions, and an invitation to book with you, even outside normal business hours.",
    points: [
      "Follow-up starts automatically when someone contacts you",
      "Answers common service questions you have approved",
      "Asks a few questions to determine which service they need",
      "Helps interested people book an appointment on your calendar",
      "Keeps contacts and conversations organized in your included Dollhouse CRM account",
      "Works during busy season, evenings and weekends without extra staff",
    ],
    preview: "booking",
  },
];

const POST_EXAMPLES = [
  { text: "The one thing I check before every appointment.", tone: "cream" },
  { text: "Why this customer came back three times.", tone: "blush" },
  { text: "Three questions to ask before you hire anyone.", tone: "ink" },
] as const;

export function LaunchWhatsIncluded() {
  return (
    <section id="whats-included" className="scroll-mt-24 py-24 md:py-28 px-6 bg-[var(--cream)]">
      <SectionHead
        eyebrow="What is included"
        title="Everything we build and manage for your business"
        sub="Here is exactly what we create, manage and improve for your business each month."
      />
      <div className="mx-auto mt-14 grid max-w-5xl gap-8">
        {SERVICES.map(({ icon: Icon, title, lead, points, preview }, i) => (
          <article key={title} className="overflow-hidden rounded-[8px]" style={card}>
            <div className="flex items-center gap-4 px-6 py-5 md:px-8" style={{ background: "linear-gradient(135deg, #1f110b 0%, #0f0705 100%)" }}>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[var(--ink)]" style={{ background: "var(--gold)", fontFamily: DISPLAY, fontSize: "1.35rem", fontWeight: 600 }}>{i + 1}</span>
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-[9px] tracking-luxe uppercase" style={{ fontFamily: LUXE, color: "var(--gold)" }}>
                  <Icon className="h-3.5 w-3.5" /> Included service
                </p>
                <h3 className="mt-1 text-[var(--cream)] leading-tight" style={{ fontFamily: DISPLAY, fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 500 }}>{title}</h3>
              </div>
            </div>
            <div className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
              <div>
                <p className="font-semibold text-[var(--ink)] leading-7" style={{ fontFamily: BODY, fontSize: "0.97rem" }}>{lead}</p>
                <ul className="mt-5 grid gap-3">
                  {points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[var(--ink)]/78 leading-6" style={{ fontFamily: BODY, fontSize: "0.92rem" }}>
                      <CheckDot />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                {i === 0 && (
                  <>
                    <p className="text-[var(--gold)] text-[9px] tracking-luxe uppercase" style={{ fontFamily: LUXE }}>Your content, brought to life</p>
                    <p className="mt-1 text-[var(--ink)]/50" style={{ fontFamily: BODY, fontSize: "0.78rem" }}>Post examples</p>
                    <div className="mt-3 grid grid-cols-3 gap-2.5">
                      {POST_EXAMPLES.map((ex) => {
                        const t = TONES[ex.tone];
                        return (
                          <div key={ex.text} className="flex aspect-square items-center justify-center rounded-xl p-2.5 text-center" style={{ background: t.bg, border: "1px solid color-mix(in oklab, var(--gold) 24%, transparent)" }}>
                            <p className="italic leading-tight" style={{ fontFamily: DISPLAY, fontSize: "0.82rem", color: t.fg }}>{ex.text}</p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      {["Your expertise", "Your branding", "Your style"].map((c) => (
                        <span key={c} className="rounded-full px-3.5 py-1.5 text-[var(--ink)]/75" style={{ fontFamily: BODY, fontSize: "0.78rem", background: "rgba(255,255,255,0.75)", border: "1px solid color-mix(in oklab, var(--gold) 34%, transparent)" }}>{c}</span>
                      ))}
                    </div>
                    <p className="mt-3 text-[var(--ink)]/45 italic" style={{ fontFamily: BODY, fontSize: "0.78rem" }}>Examples, not a fixed template library.</p>
                  </>
                )}
                {preview && (
                  <>
                    <ServicePreview kind={preview} />
                    <p className="mt-3 text-center text-[var(--gold)] text-[9px] tracking-luxe uppercase" style={{ fontFamily: LUXE }}>Built and managed for you</p>
                  </>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div
        className="mx-auto mt-8 flex max-w-5xl flex-col items-center gap-3 rounded-[8px] px-8 py-8 text-center md:flex-row md:justify-between md:text-left"
        style={{ background: "linear-gradient(135deg, #1f110b 0%, #0f0705 100%)", border: "1px solid color-mix(in oklab, var(--gold) 40%, transparent)" }}
      >
        <div>
          <p className="text-[9px] tracking-luxe uppercase" style={{ fontFamily: LUXE, color: "var(--gold)" }}>Included across the full system</p>
          <h3 className="mt-2 italic text-[var(--cream)]" style={{ fontFamily: DISPLAY, fontSize: "clamp(1.6rem, 3.4vw, 2.3rem)", lineHeight: 1.1 }}>We manage and improve everything for you</h3>
        </div>
        <span className="rounded-full px-6 py-3 text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE, background: "var(--gold)", color: "var(--ink)", fontWeight: 600 }}>Done for you</span>
      </div>

      <div className="mx-auto mt-14 max-w-3xl text-center">
        <p className="text-[var(--gold)] text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE }}>Ready when you are</p>
        <h3 className="mt-3 italic text-[var(--ink)]" style={{ fontFamily: DISPLAY, fontSize: "clamp(1.9rem, 4vw, 2.7rem)", lineHeight: 1.1 }}>Let us start building your social media and follow-up system</h3>
        <p className="mt-3 text-[var(--ink)]/62" style={{ fontFamily: BODY }}>
          Start for ${PRICE_SINGLE} per month with both launch bonuses, no long-term contract and a {GUARANTEE_DAYS}-day guarantee.
        </p>
        <GetStarted label={`Start my order, $${PRICE_SINGLE}/mo`} className="mt-7" />
        <p className="mt-4 text-[var(--ink)]/45 text-[10px] tracking-[0.16em] uppercase" style={{ fontFamily: LUXE }}>
          No contract · Cancel anytime · {GUARANTEE_DAYS}-day money-back guarantee
        </p>
      </div>
    </section>
  );
}

/* ─── Shared tones ────────────────────────────────────── */
const TONES: Record<string, { bg: string; fg: string; accent: string }> = {
  cream: { bg: "linear-gradient(160deg, #fffaf6 0%, #f7e9e3 100%)", fg: "var(--ink)", accent: "var(--rose)" },
  blush: { bg: "linear-gradient(160deg, #f4dcdc 0%, #f1d3cf 100%)", fg: "var(--ink)", accent: "var(--rose)" },
  ink: { bg: "linear-gradient(160deg, #1f110b 0%, #130a06 100%)", fg: "var(--cream)", accent: "var(--gold)" },
};

/* ─── Content examples ────────────────────────────────── */
type StyleDef = {
  name: string;
  desc: string;
  category: "you" | "graphic";
  tone: keyof typeof TONES;
  hooks: [string, string];
  middle: [string, string, string];
};

const STYLE_DEFS: StyleDef[] = [
  {
    name: "Expert desk notes",
    desc: "Practical, handwritten-style advice shared by you, the professional.",
    category: "you",
    tone: "cream",
    hooks: ["The one thing I check before every appointment.", "The question customers ask us most, answered."],
    middle: ["Most people skip it, and it only takes a couple of minutes.", "Skipping it is how small problems turn into big ones.", "So we check it every single time."],
  },
  {
    name: "Photo caption stories",
    desc: "Casual photos with captions that tell a story and share something useful.",
    category: "you",
    tone: "blush",
    hooks: ["Why this customer came back three times.", "A look behind the scenes at what we do."],
    middle: ["It started with a simple question in the comments.", "We listened, explained the options and kept it honest.", "That is how a first booking becomes a regular."],
  },
  {
    name: "Simple feed-style posts",
    desc: "Plain text posts that look like a natural part of social media, not an advertisement.",
    category: "graphic",
    tone: "ink",
    hooks: ["Three questions to ask before you hire anyone.", "What to know before you book anyone."],
    middle: ["1. Ask what is included.", "2. Ask how long it takes.", "3. Ask what happens if something changes."],
  },
  {
    name: "Whiteboard lessons",
    desc: "Clear, teachable explanations that make your service easy to understand.",
    category: "graphic",
    tone: "cream",
    hooks: ["What actually goes into a fair quote.", "How the process works, step by step."],
    middle: ["Step 1: Tell us what you need.", "Step 2: We explain the options and the price.", "Step 3: You book the time that suits you."],
  },
  {
    name: "Everyday object posts",
    desc: "Everyday objects used to explain your work in a way people remember.",
    category: "graphic",
    tone: "blush",
    hooks: ["What a coffee mug can teach you about maintenance.", "What a calendar can teach you about priorities."],
    middle: ["Small things show you how something is cared for.", "The same goes for the way a business shows up.", "Consistency builds trust, one day at a time."],
  },
  {
    name: "Bold brand graphics",
    desc: "Bold headlines and eye-catching graphics that make people stop and read.",
    category: "graphic",
    tone: "ink",
    hooks: ["Booked out this week? Here is how.", "Questions we hear every week."],
    middle: ["Know what you need.", "Know what it costs.", "Know who to call."],
  },
];

type ExampleItem = { style: StyleDef; hook: string };

function slidesFor(item: ExampleItem): string[] {
  return [item.hook, ...item.style.middle, "Questions? Send us a message and we will help."];
}

function ExampleTile({ item, format, onOpen }: { item: ExampleItem; format: "single" | "carousel"; onOpen: () => void }) {
  const t = TONES[item.style.tone];
  const inner = (
    <>
      <div className="relative flex aspect-[5/4] flex-col items-center justify-center p-7 text-center" style={{ background: t.bg }}>
        {item.style.category === "you" && (
          <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full px-2.5 py-1" style={{ background: "rgba(255,250,246,0.75)", border: "1px solid color-mix(in oklab, var(--gold) 30%, transparent)" }}>
            <span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg,#e6dcc0,#c6b282)" }}>
              <img src={archMark} alt="" className="h-2.5 w-auto" />
            </span>
            <span className="text-[8px] tracking-luxe uppercase text-[var(--ink)]/65" style={{ fontFamily: LUXE }}>You or your team</span>
          </span>
        )}
        <span style={{ color: t.accent, fontSize: "0.8rem" }}>✦</span>
        <p className="mt-3 italic leading-tight" style={{ fontFamily: DISPLAY, fontSize: "clamp(1.4rem, 2.6vw, 1.8rem)", color: t.fg }}>{item.hook}</p>
        <span className="mt-4 h-px w-10" style={{ background: t.accent, opacity: 0.6 }} />
      </div>
      <div className="px-6 py-5">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-[var(--ink)] uppercase" style={{ fontFamily: LUXE, fontSize: "0.78rem", letterSpacing: "0.12em", fontWeight: 600 }}>{item.style.name}</h4>
          <span className="text-[var(--gold)] text-[8px] tracking-luxe uppercase" style={{ fontFamily: LUXE }}>Sample</span>
        </div>
        <p className="mt-2 text-[var(--ink)]/60 leading-6" style={{ fontFamily: BODY, fontSize: "0.86rem" }}>{item.style.desc}</p>
        {format === "carousel" && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[var(--rose)] text-[9px] tracking-luxe uppercase" style={{ fontFamily: LUXE }}>5 slides · tap to view →</span>
            <span className="rounded-full px-3 py-1.5 text-[8px] tracking-luxe uppercase" style={{ fontFamily: LUXE, background: "var(--ink)", color: "var(--cream)" }}>Open 5-slide carousel</span>
          </div>
        )}
      </div>
    </>
  );

  return format === "carousel" ? (
    <button type="button" onClick={onOpen} aria-label={`Open the 5-slide ${item.style.name} carousel`} className="group block w-full overflow-hidden rounded-[8px] text-left transition-transform duration-500 hover:-translate-y-1" style={card}>
      {inner}
    </button>
  ) : (
    <article className="overflow-hidden rounded-[8px]" style={card}>{inner}</article>
  );
}

function CarouselViewer({ item, onClose }: { item: ExampleItem; onClose: () => void }) {
  const slides = slidesFor(item);
  const [i, setI] = useState(0);
  const t = TONES[item.style.tone];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((v) => Math.min(slides.length - 1, v + 1));
      if (e.key === "ArrowLeft") setI((v) => Math.max(0, v - 1));
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, slides.length]);

  return (
    <div role="dialog" aria-modal="true" aria-label={`${item.style.name} carousel example`} className="fixed inset-0 z-[70] flex items-center justify-center p-5" style={{ background: "rgba(23,14,12,0.78)", backdropFilter: "blur(6px)" }} onClick={onClose}>
      <div className="relative w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <button type="button" aria-label="Close" onClick={onClose} className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full text-[var(--cream)] hover:bg-white/10">
          <X className="h-6 w-6" />
        </button>
        <p className="mb-3 text-center text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE, color: "var(--gold)" }}>{item.style.name} · sample carousel</p>
        <div className="flex aspect-square flex-col items-center justify-center rounded-[8px] p-10 text-center" style={{ background: t.bg, border: "1px solid color-mix(in oklab, var(--gold) 40%, transparent)", boxShadow: "0 40px 90px -30px rgba(0,0,0,0.6)" }}>
          <span style={{ color: t.accent, fontSize: "0.9rem" }}>✦</span>
          <p key={i} className="mt-4 italic leading-tight" style={{ fontFamily: DISPLAY, fontSize: i === 0 ? "clamp(1.9rem, 6vw, 2.5rem)" : "clamp(1.6rem, 5vw, 2.1rem)", color: t.fg }}>{slides[i]}</p>
          <span className="mt-6 h-px w-12" style={{ background: t.accent, opacity: 0.6 }} />
        </div>
        <div className="mt-5 flex items-center justify-between">
          <button type="button" aria-label="Previous slide" disabled={i === 0} onClick={() => setI(i - 1)} className="flex h-11 w-11 items-center justify-center rounded-full border text-[var(--cream)] transition-opacity disabled:opacity-30" style={{ borderColor: "rgba(255,250,246,0.4)" }}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2" aria-label={`Slide ${i + 1} of ${slides.length}`}>
            {slides.map((_, n) => (
              <button key={n} type="button" aria-label={`Go to slide ${n + 1}`} onClick={() => setI(n)} className="h-2 rounded-full transition-all" style={{ width: n === i ? 26 : 8, background: n === i ? "var(--gold)" : "rgba(255,250,246,0.35)" }} />
            ))}
          </div>
          <button type="button" aria-label="Next slide" disabled={i === slides.length - 1} onClick={() => setI(i + 1)} className="flex h-11 w-11 items-center justify-center rounded-full border text-[var(--cream)] transition-opacity disabled:opacity-30" style={{ borderColor: "rgba(255,250,246,0.4)" }}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-3 text-center text-[var(--cream)]/45" style={{ fontFamily: BODY, fontSize: "0.78rem" }}>Sample only. Yours would use your own branding and message.</p>
      </div>
    </div>
  );
}

export function LaunchExamples() {
  const [format, setFormat] = useState<"single" | "carousel">("single");
  const [filter, setFilter] = useState<"all" | "you" | "graphic">("all");
  const [more, setMore] = useState(false);
  const [open, setOpen] = useState<ExampleItem | null>(null);

  const base: ExampleItem[] = STYLE_DEFS.map((s) => ({ style: s, hook: s.hooks[0] }));
  const extra: ExampleItem[] = more ? STYLE_DEFS.map((s) => ({ style: s, hook: s.hooks[1] })) : [];
  const items = [...base, ...extra].filter((it) => filter === "all" || it.style.category === filter);

  const pill = (active: boolean) => ({
    fontFamily: LUXE,
    fontWeight: 600,
    background: active ? "var(--ink)" : "rgba(255,250,246,0.85)",
    color: active ? "var(--cream)" : "var(--ink)",
    border: `1px solid ${active ? "var(--ink)" : "color-mix(in oklab, var(--gold) 38%, transparent)"}`,
  });

  return (
    <section id="examples" className="scroll-mt-32 py-24 md:py-32 px-6" style={{ background: "linear-gradient(180deg, var(--cream) 0%, var(--blush) 100%)" }}>
      <SectionHead
        eyebrow="A few examples of what we can create"
        title="Content that looks like you, not everyone else"
        sub="These are just examples, not your only options. Save a favorite, or send us a post you love and we will create a custom look for your business."
      />

      <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Choose example format">
          <button type="button" onClick={() => setFormat("single")} aria-pressed={format === "single"} className="rounded-full px-6 py-3 text-[10px] tracking-luxe uppercase transition-colors" style={pill(format === "single")}>Single-image posts</button>
          <button type="button" onClick={() => setFormat("carousel")} aria-pressed={format === "carousel"} className="rounded-full px-6 py-3 text-[10px] tracking-luxe uppercase transition-colors" style={pill(format === "carousel")}>Carousel slide posts</button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filter content styles">
          {([["all", "All styles"], ["you", "Featuring you or your team"], ["graphic", "Graphics & illustrations"]] as const).map(([id, label]) => (
            <button key={id} type="button" onClick={() => setFilter(id)} aria-pressed={filter === id} className="rounded-full px-4 py-2 text-[9px] tracking-luxe uppercase transition-colors" style={pill(filter === id)}>{label}</button>
          ))}
        </div>
        <p className="text-center text-[var(--ink)]/55" style={{ fontFamily: BODY, fontSize: "0.9rem" }}>
          {format === "carousel"
            ? "Carousel slide posts let people swipe through a story. Explore a complete five-slide example in every style."
            : "Single-image posts put one clear message in front of people at a glance."}
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <ExampleTile key={`${it.style.name}-${it.hook}`} item={it} format={format} onOpen={() => setOpen(it)} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <button type="button" onClick={() => setMore((v) => !v)} className="btn-ghost">
          {more ? "Show fewer examples" : "Explore more examples"}
        </button>
      </div>

      <div className="mx-auto mt-16 max-w-2xl rounded-[8px] p-8 text-center md:p-10" style={card}>
        <p className="text-[var(--gold)] text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE }}>Your content, your direction</p>
        <h3 className="mt-3 italic text-[var(--ink)]" style={{ fontFamily: DISPLAY, fontSize: "1.9rem", lineHeight: 1.1 }}>Have another style in mind?</h3>
        <p className="mt-3 text-[var(--ink)]/62 leading-7" style={{ fontFamily: BODY, fontSize: "0.95rem" }}>
          Share a link or screenshot during setup. We can create posts in the style you like, with your own branding and message. Not sure? We will help you choose.
        </p>
        <GetStarted label="Get started, make it yours" className="mt-6" />
      </div>

      {open && <CarouselViewer item={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

/* ─── Plans ───────────────────────────────────────────── */
function ValueStack() {
  return (
    <details className="dh-faq mt-6 rounded-2xl px-6 py-4" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)" }}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[var(--cream)]" style={{ fontFamily: LUXE, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>
        See the launch-month value breakdown · {VALUE_STACK_TOTAL}
        <ChevronDown className="dh-faq-chevron h-4 w-4 shrink-0 text-[var(--gold)]" />
      </summary>
      <ul className="mt-4 grid gap-2">
        {VALUE_STACK.map((v) => (
          <li key={v.label} className="flex justify-between gap-4 text-[var(--cream)]/75" style={{ fontFamily: BODY, fontSize: "0.9rem" }}>
            <span>{v.label}</span>
            <span className="shrink-0 text-[var(--cream)]">{v.value}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[var(--cream)]/55" style={{ fontFamily: BODY, fontSize: "0.82rem" }}>{VALUE_STACK_BONUSES}</p>
    </details>
  );
}

export function LaunchPlans() {
  const arts = { single: IllustrationSinglePlan, carousel: IllustrationCarouselPlan } as const;
  return (
    <section
      id="plans"
      className="relative scroll-mt-24 overflow-hidden py-24 md:py-32 px-6"
      style={{ background: "linear-gradient(165deg, #1f120c 0%, #130a06 55%, #0a0503 100%)" }}
    >
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[-120px] h-[420px] w-[820px] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(198,178,130,0.22), transparent 66%)" }} />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[520px] rounded-full" style={{ background: "radial-gradient(circle, rgba(192,128,121,0.2), transparent 68%)" }} />
      <span aria-hidden className="sparkle-drift" style={{ top: "12%", left: "8%", fontSize: "14px" }}>✦</span>
      <span aria-hidden className="sparkle-drift" style={{ top: "30%", right: "9%", fontSize: "11px", animationDelay: "1.8s" }}>✦</span>

      <div className="relative">
        <SectionHead dark eyebrow="Your plan. Everything handled." title="Choose your monthly package" sub="The same complete service in both plans. Choose the type of posts you prefer." />

        <div className="mx-auto mt-14 grid max-w-5xl gap-7 md:grid-cols-2" data-stagger>
          {LAUNCH_PLANS.map((plan) => {
            const Art = arts[plan.id];
            const gold = plan.id === "carousel";
            return (
              <article
                key={plan.id}
                className="group flex flex-col overflow-hidden rounded-[8px] transition-all duration-500 hover:-translate-y-1.5"
                style={{ background: "linear-gradient(180deg, #fffaf6 0%, #fbeee9 100%)", border: "1px solid color-mix(in oklab, var(--gold) 70%, transparent)", boxShadow: "0 50px 100px -40px rgba(0,0,0,0.75), 0 0 0 6px rgba(198,178,130,0.07)" }}
              >
                <div className="relative h-[250px] overflow-hidden" style={{ background: "radial-gradient(ellipse at 50% 40%, #fff6f2 0%, #f6dfd9 70%, #f0d1ca 100%)" }}>
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"><Art /></div>
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-3" style={{ background: "linear-gradient(to top, rgba(255,250,246,0.9), transparent)" }} />
                </div>
                <div className="flex flex-1 flex-col px-8 pb-8 text-center">
                  <h3 className="mt-4 text-[var(--ink)] uppercase" style={{ fontFamily: LUXE, fontSize: "1rem", letterSpacing: "0.14em", fontWeight: 600 }}>{plan.name}</h3>
                  <p className="mt-4" style={{ fontFamily: DISPLAY, fontSize: "4.6rem", lineHeight: 0.95, color: "var(--ink)" }}>
                    <span className="align-top text-[1.6rem]" style={{ color: "var(--gold)" }}>$</span>{plan.price}
                    <span className="ml-1.5 uppercase" style={{ fontFamily: LUXE, fontSize: "0.78rem", letterSpacing: "0.16em", color: "rgba(31,17,11,0.5)" }}>/month</span>
                  </p>
                  <span className="mx-auto mt-5 block h-px w-14" style={{ background: "var(--gold)", opacity: 0.7 }} />
                  <p className="mt-5 font-semibold text-[var(--ink)]" style={{ fontFamily: BODY, fontSize: "1rem" }}>{plan.mix}</p>
                  <p className="mt-1.5 text-[var(--ink)]/55" style={{ fontFamily: BODY, fontSize: "0.9rem" }}>{plan.blurb}</p>
                  <a
                    href={checkoutHref(plan.id)}
                    className="mt-auto inline-flex items-center justify-center gap-2 px-8 py-[17px] text-[11px] tracking-[0.26em] uppercase transition-transform hover:-translate-y-0.5"
                    style={{ marginTop: "1.75rem", fontFamily: LUXE, fontWeight: 600, borderRadius: "2px", background: gold ? "var(--gold)" : "#1f110b", color: gold ? "#130a06" : "var(--cream)", border: "1px solid var(--gold)", boxShadow: "0 22px 44px -18px rgba(31,17,11,0.6)" }}
                  >
                    {plan.id === "single" ? "Choose single-image posts" : "Choose carousel slide posts"} <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-8 max-w-5xl rounded-[8px] p-8 md:p-10" style={{ background: "rgba(255,255,255,0.045)", border: "1px solid color-mix(in oklab, var(--gold) 34%, transparent)" }}>
          <h3 className="text-[var(--cream)] uppercase" style={{ fontFamily: LUXE, fontSize: "0.95rem", letterSpacing: "0.18em", fontWeight: 600 }}>Included in both plans</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {INCLUDED_IN_BOTH.map((t) => (
              <li key={t} className="flex gap-3 text-[var(--cream)]/80 leading-6" style={{ fontFamily: BODY, fontSize: "0.92rem" }}>
                <CheckDot />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 grid gap-5 border-t pt-7 sm:grid-cols-2" style={{ borderColor: "color-mix(in oklab, var(--gold) 28%, transparent)" }}>
            {[
              { title: "Your Dollhouse CRM account", copy: "Keep inquiries, messages, follow-up, and appointments organized in one place.", icon: MessageSquare },
              { title: "Private 1-on-1 kickoff call", copy: "Discuss your services, ideal clients, preferred styles, and setup questions.", icon: CalendarCheck },
            ].map((b) => (
              <div key={b.title} className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ border: "1px solid color-mix(in oklab, var(--gold) 60%, transparent)", color: "var(--gold)" }}>
                  <b.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-[var(--gold)] text-[9px] tracking-[0.3em] uppercase" style={{ fontFamily: LUXE }}>Included bonus</p>
                  <h4 className="mt-1 text-[var(--cream)]" style={{ fontFamily: DISPLAY, fontSize: "1.35rem", fontWeight: 500 }}>{b.title}</h4>
                  <p className="mt-1 text-[var(--cream)]/60 leading-6" style={{ fontFamily: BODY, fontSize: "0.88rem" }}>{b.copy}</p>
                </div>
              </div>
            ))}
          </div>
          {SHOW_VALUE_STACK && <ValueStack />}
        </div>

        <div className="mx-auto mt-6 flex max-w-5xl items-center gap-5 rounded-[8px] px-7 py-6" style={{ background: "linear-gradient(135deg, rgba(198,178,130,0.2), rgba(198,178,130,0.08))", border: "1px solid color-mix(in oklab, var(--gold) 55%, transparent)" }}>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full" style={{ background: "var(--gold)", color: "#130a06", fontFamily: DISPLAY, fontSize: "1.7rem", fontWeight: 600 }}>{GUARANTEE_DAYS}</span>
          <div>
            <h3 className="text-[var(--cream)] uppercase" style={{ fontFamily: LUXE, fontSize: "1rem", letterSpacing: "0.12em", fontWeight: 600 }}>Your {GUARANTEE_DAYS}-day money-back guarantee</h3>
            <p className="mt-1 text-[var(--cream)]/70 leading-6" style={{ fontFamily: BODY, fontSize: "0.92rem" }}>
              If you are not satisfied, contact us within your first {GUARANTEE_DAYS} days for a full refund. No long-term contract. Cancel anytime.
            </p>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-[var(--cream)]/45 leading-6" style={{ fontFamily: BODY, fontSize: "0.8rem" }}>
          Your selected plan is billed monthly until canceled. Optional upgrades and additional usage fees require your approval. Cancel before your next renewal to avoid the next monthly charge. All prices in USD.
        </p>
      </div>
    </section>
  );
}

/* ─── After purchase ──────────────────────────────────── */
const AFTER = [
  { title: "Today", copy: "Complete your order and choose a time for your private kickoff call.", icon: CreditCard, art: IllustrationCheckout, foot: "Kickoff call booked" },
  { title: "Immediate account access", copy: "Your Dollhouse CRM account is available immediately. Complete your setup checklist after booking your call.", icon: KeyRound, art: IllustrationAccess, foot: "Setup checklist ready" },
  { title: "Your first posts", copy: `Review your first posts and the publishing plan within ${FIRST_POSTS_DAYS} days, with your setup details and access provided.`, icon: Images, art: IllustrationFirstPosts, foot: `First posts in ${FIRST_POSTS_DAYS} days` },
];

export function LaunchAfterPurchase() {
  return (
    <section id="after-purchase" className="scroll-mt-24 py-24 md:py-28 px-6" style={{ background: "linear-gradient(180deg, #fff8f3 0%, var(--cream) 100%)" }}>
      <SectionHead eyebrow="What happens after purchase" title="From checkout to launch" />
      <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3" data-stagger>
        {AFTER.map((a, i) => {
          const Icon = a.icon;
          const Art = a.art;
          return (
            <article key={a.title} className="group flex flex-col overflow-hidden rounded-[8px] transition-all duration-500 hover:-translate-y-1.5" style={{ ...card, boxShadow: "0 40px 80px -44px rgba(110,60,50,0.5)" }}>
              <div className="relative h-[220px] overflow-hidden" style={{ background: "linear-gradient(160deg, #fbeee9 0%, #f3d9d3 100%)" }}>
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                  <Art />
                </div>
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-7" style={{ background: "linear-gradient(to top, rgba(255,251,248,0.9), transparent)" }} />
              </div>
              <div className="relative flex flex-1 flex-col px-7 pb-6">
                <span className="relative z-10 -mt-7 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "var(--cream)", border: "1px solid color-mix(in oklab, var(--gold) 60%, transparent)", color: "var(--rose)", boxShadow: "0 14px 28px -14px rgba(120,70,55,0.55)" }}>
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <p className="mt-5 text-[9.5px] tracking-[0.3em] uppercase" style={{ fontFamily: LUXE, color: "var(--gold)", fontWeight: 600 }}>Step {i + 1}</p>
                <h3 className="mt-2 text-[var(--ink)]" style={{ fontFamily: HEAD, fontSize: "1.3rem", fontWeight: 500, lineHeight: 1.2 }}>{a.title}</h3>
                <p className="mt-3 text-[var(--ink)]/62 leading-7" style={{ fontFamily: BODY, fontSize: "0.9rem", fontWeight: 300 }}>{a.copy}</p>
                <div className="mt-auto pt-6">
                  <div className="h-px w-full" style={{ background: "color-mix(in oklab, var(--gold) 32%, transparent)" }} />
                  <p className="mt-4 flex items-center gap-2.5 text-[9px] tracking-[0.26em] uppercase" style={{ fontFamily: LUXE, color: "color-mix(in oklab, var(--ink) 55%, transparent)" }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--gold)" }} />
                    {a.foot}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ─── Founder + FAQ ───────────────────────────────────── */
const FAQS = [
  {
    q: "Exactly what content is included each month?",
    a: `Your plan includes ${POSTS_PER_MONTH} social media posts each month for Instagram and Facebook. Once you approve the content, posts are scheduled to publish daily. Delays in approval may delay the publishing schedule.`,
  },
  {
    q: "Can I choose carousel slide posts or add LinkedIn?",
    a: `Yes. The $497 plan includes 15 carousel slide posts and 15 single-image posts every month. That is $200 more per month than the $297 plan. LinkedIn and other supported social media platforms can be added for $${ADDON_PLATFORM_PRICE} per month, per platform.`,
  },
  {
    q: "Is paid advertising included?",
    a: "No paid ads or ad spend are required. Our service is built for organic growth: consistent posts, lead capture, and follow-up with interested people. Audience growth and inquiries build over time, and results vary. Paid advertising is optional; ad management and any advertising budget are separate from your monthly service fee.",
  },
  {
    q: "How do revisions work?",
    a: "Reasonable revisions are included at no additional charge under our fair-use policy. Complete rewrites, repeated major changes, or other extensive requests may take 5 to 7 business days to complete.",
  },
  {
    q: "Are there any additional software or AI costs?",
    a: `Your website tools and Dollhouse CRM account are included. Some AI features have small fees based on how much they are used. We cover the first $${AI_USAGE_COVERED} in AI usage each month, which is enough for most clients. Any additional project or usage fee requires your approval before it is charged.`,
  },
  {
    q: "What do you need from me, and how quickly can we launch?",
    a: "To get started, complete the setup form, connect your social media accounts, and share your business information. Review and approve your posts promptly. We can begin publishing within one week when access, feedback, and approvals are provided on time.",
  },
  {
    q: "What platforms do you manage?",
    a: `The base plan includes Instagram and Facebook. LinkedIn and other supported social media platforms can be added for $${ADDON_PLATFORM_PRICE} per month, per platform.`,
  },
  {
    q: "Who is this system built for?",
    a: "It is for appointment-based and service businesses, such as salons, barbers, lash and brow studios, spas, clinics, fitness studios, contractors, cleaners, photographers and realtors, that want help attracting and following up with potential customers without hiring and coordinating several different companies.",
  },
  {
    q: "Does the AI give professional advice?",
    a: "No. The AI answers common service questions your business has approved, follows up with new inquiries, asks which service they need, and helps interested people book an appointment. Professional advice remains with you and your team.",
  },
  {
    q: "Do I need to provide content?",
    a: "No. During setup, we ask about your services, locations, ideal customers, preferred tone, and any topics or claims you want us to avoid. Your own photos and videos are welcome but not required.",
  },
  {
    q: "What if I already have a CRM account?",
    a: "We can connect to your existing account when practical. An included Dollhouse CRM account is available if you need a new one.",
  },
  {
    q: "Is there a contract or commitment?",
    a: `No long-term contract. Dollhouse Launch is month-to-month, and you can cancel before your next renewal to avoid the next monthly charge. You are also covered by our ${GUARANTEE_DAYS}-day money-back guarantee.`,
  },
];

export function LaunchFaq() {
  return (
    <section id="faq" className="scroll-mt-24 py-24 md:py-28 px-6 bg-[var(--cream)]">
      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div id="about" className="overflow-hidden rounded-[8px]" style={card}>
          <div className="relative aspect-[4/5] w-full overflow-hidden" style={{ background: "linear-gradient(160deg, #3a2018 0%, #1f110b 100%)" }}>
            <img src={mandyPhoto} alt="Mandy Fortune, founder of The Dollhouse Brand Studio" decoding="async" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "center 18%" }} />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: "linear-gradient(to top, rgba(15,7,4,0.85), transparent)" }} />
            <div className="absolute bottom-5 left-6">
              <p className="uppercase text-[var(--cream)]" style={{ fontFamily: HEAD, fontWeight: 300, fontSize: "1.5rem", letterSpacing: "0.08em" }}>Mandy Fortune</p>
              <p className="mt-1 text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: LUXE, color: "var(--gold)" }}>Founder · Brand Designer</p>
            </div>
          </div>
          <div className="p-7">
            <h2 className="uppercase text-[var(--ink)]" style={{ fontFamily: HEAD, fontWeight: 300, fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.1, letterSpacing: "-0.01em" }}>Meet Mandy</h2>
            <p className="mt-3 text-[var(--ink)]/70 leading-7" style={{ fontFamily: BODY, fontSize: "0.93rem", fontWeight: 300 }}>
              I have spent 11+ years in graphic and product design, building brands for companies, creators and entrepreneurs. I built Dollhouse Launch because I kept seeing talented local business owners who were invisible online, not because they were not good enough, but because they were too busy doing the work to show up consistently.
            </p>
            <p className="mt-4 italic text-[var(--rose)]" style={{ fontFamily: DISPLAY, fontSize: "1.4rem" }}>You run your business. We'll handle the marketing.</p>
          </div>
        </div>

        <div>
          <h2 className="uppercase text-[var(--ink)]" style={{ fontFamily: HEAD, fontWeight: 300, fontSize: "clamp(2.2rem, 4.6vw, 3.2rem)", letterSpacing: "-0.01em" }}>FAQ</h2>
          <div className="mt-5 grid gap-3">
            {FAQS.map((f) => (
              <details key={f.q} className="dh-faq rounded-[8px] px-5 py-4" style={card}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[var(--ink)]" style={{ fontFamily: BODY, fontSize: "0.95rem", fontWeight: 600 }}>
                  {f.q}
                  <ChevronDown className="dh-faq-chevron h-4 w-4 shrink-0 text-[var(--gold)]" />
                </summary>
                <p className="mt-3 text-[var(--ink)]/65 leading-7" style={{ fontFamily: BODY, fontSize: "0.92rem" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ───────────────────────────────────────── */
export function LaunchFinalCta() {
  return (
    <section className="px-6 pb-16 bg-[var(--cream)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 rounded-[8px] px-8 py-9 text-center md:flex-row md:text-left" style={{ background: "linear-gradient(135deg, #1f110b 0%, #0f0705 100%)", border: "1px solid color-mix(in oklab, var(--gold) 40%, transparent)" }}>
        <h2 className="max-w-2xl text-[var(--cream)]" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.08 }}>
          Ready to turn your social media into{" "}
          <span className="italic text-[var(--gold)]">booked appointments?</span>
        </h2>
        <a
          href={checkoutHref("single")}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-9 py-[17px] text-[12px] tracking-luxe uppercase transition-transform hover:-translate-y-0.5"
          style={{ fontFamily: LUXE, fontWeight: 600, background: "var(--gold)", color: "var(--ink)" }}
        >
          Get Started Now <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

/* ─── Sticky bottom bar (desktop strip + mobile tab bar) ─ */
const TAB_ITEMS = [
  { id: "whats-included", label: "Included", icon: Sparkles },
  { id: "how-it-works", label: "Steps", icon: ListChecks },
  { id: "plans", label: "Plans", icon: Tag },
  { id: "faq", label: "FAQ", icon: HelpCircle },
] as const;

export function LaunchStickyBar() {
  const [scrolled, setScrolled] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    try {
      if (sessionStorage.getItem("launch-bar-dismissed") === "1") setDismissed(true);
    } catch {
      /* storage can be unavailable; the bar just shows */
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 520);
      const mid = window.innerHeight * 0.4;
      let current = "";
      for (const t of TAB_ITEMS) {
        const el = document.getElementById(t.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) current = t.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("launch-bar-dismissed", "1");
    } catch {
      /* ignore */
    }
  };

  const show = scrolled && !dismissed;
  const gold = "var(--gold)";

  // On phones, lift the chat bubble above the tab bar while the bar is showing.
  useEffect(() => {
    if (!show) return;
    let tries = 0;
    let styleEl: HTMLStyleElement | null = null;
    const attach = () => {
      const root = document.querySelector("chat-widget")?.shadowRoot;
      if (root) {
        styleEl = document.createElement("style");
        styleEl.textContent = "@media (max-width: 767px) { #lc_text-widget, #lc_text-widget--btn { bottom: 96px !important; } }";
        root.appendChild(styleEl);
        return true;
      }
      return false;
    };
    if (attach()) return () => styleEl?.remove();
    const id = window.setInterval(() => {
      tries += 1;
      if (attach() || tries > 40) window.clearInterval(id);
    }, 500);
    return () => {
      window.clearInterval(id);
      styleEl?.remove();
    };
  }, [show]);

  return (
    <>
      {/* Desktop strip */}
      <div
        role="region"
        aria-label="Get started"
        className="fixed bottom-6 left-1/2 z-[60] hidden items-center border transition-all duration-500 md:flex"
        style={{
          transform: `translateX(-50%) translateY(${show ? "0" : "140%"})`,
          opacity: show ? 1 : 0,
          pointerEvents: show ? "auto" : "none",
          background: "rgba(19,10,6,0.96)",
          borderColor: gold,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 20px 44px -12px rgba(0,0,0,0.45)",
        }}
      >
        <span aria-hidden className="mx-5 h-2 w-2 shrink-0" style={{ background: gold }} />
        <p className="py-4 pr-6 text-[10.5px] uppercase tracking-[0.18em] text-[var(--cream)]/90" style={{ fontFamily: LUXE, fontWeight: 500 }}>
          Ready to book more appointments?{" "}
          <a href={checkoutHref("single")} className="font-semibold underline underline-offset-4" style={{ color: gold }}>
            Get started from ${PRICE_SINGLE}/mo.
          </a>
        </p>
        <button type="button" aria-label="Dismiss" onClick={dismiss} className="flex self-stretch items-center border-l px-5 text-[var(--cream)]/60 transition-colors hover:text-[var(--cream)]" style={{ borderColor: "color-mix(in oklab, var(--gold) 35%, transparent)" }}>
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Desktop back to top */}
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-24 z-[60] hidden h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 md:flex"
        style={{
          background: "#130a06",
          borderColor: "color-mix(in oklab, var(--gold) 55%, transparent)",
          boxShadow: "0 14px 30px -12px rgba(0,0,0,0.5)",
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? "translateY(0)" : "translateY(16px)",
          pointerEvents: scrolled ? "auto" : "none",
        }}
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4" style={{ color: gold }}>
          <path d="M3 10.5L8 5.5L13 10.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Mobile tab bar */}
      <nav
        aria-label="Quick navigation"
        className="fixed inset-x-0 bottom-0 z-[60] md:hidden transition-transform duration-500"
        style={{
          transform: show ? "translateY(0)" : "translateY(110%)",
          background: "rgba(19,10,6,0.97)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderTop: "1px solid color-mix(in oklab, var(--gold) 55%, transparent)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <button type="button" aria-label="Dismiss" onClick={dismiss} className="absolute -top-3.5 right-3 flex h-7 w-7 items-center justify-center rounded-full border text-[var(--cream)]/80" style={{ background: "#130a06", borderColor: "color-mix(in oklab, var(--gold) 55%, transparent)" }}>
          <X className="h-3.5 w-3.5" />
        </button>
        <div className="grid grid-cols-5">
          {TAB_ITEMS.map(({ id, label, icon: Icon }) => {
            const on = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                className="flex flex-col items-center gap-1.5 px-1 pb-3 pt-3.5 transition-colors"
                style={{ color: on ? gold : "rgba(255,250,246,0.62)" }}
              >
                <Icon className="h-[22px] w-[22px]" strokeWidth={1.5} />
                <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.1em]" style={{ fontFamily: LUXE, fontWeight: 600 }}>{label}</span>
              </a>
            );
          })}
          <a href={checkoutHref("single")} className="flex flex-col items-center gap-1.5 px-1 pb-3 pt-3.5" style={{ color: gold }}>
            <ShoppingBag className="h-[22px] w-[22px]" strokeWidth={1.5} />
            <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.06em]" style={{ fontFamily: LUXE, fontWeight: 700 }}>Get Started</span>
          </a>
        </div>
      </nav>
    </>
  );
}
