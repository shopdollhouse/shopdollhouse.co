import { useEffect, useState } from "react";
import {
  ArrowRight,
  Calculator,
  CalendarCheck,
  Check,
  ChevronDown,
  Heart,
  Image as ImageIcon,
  Menu,
  MessageCircle,
  MessageSquare,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import archMark from "@/assets/arch-mark.svg";
import bgImage from "@/assets/password-bg.jpg";
import mandyPhoto from "@/assets/mandy-photo.jpg";
import brandKitImg from "@/assets/product-brand-kit.jpg";
import workbookImg from "@/assets/product-workbook.jpg";
import promptKitImg from "@/assets/product-ai-prompt-kit.jpg";
import {
  FIRST_POSTS_DAYS,
  GUARANTEE_DAYS,
  INCLUDED_IN_BOTH,
  LAUNCH_PLANS,
  POSTS_PER_MONTH,
  PRICE_SINGLE,
  SUPPORT_EMAIL,
  checkoutHref,
  type LaunchPlanId,
} from "@/lib/launch-offer";

const DISPLAY = "'Cormorant Garamond', serif";
const BODY = "'DM Sans', sans-serif";
const LUXE = "'Jost', sans-serif";

/* ─── Shared pieces ───────────────────────────────────── */
function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`${light ? "" : "gold-grad"} text-[11px] tracking-luxe uppercase font-semibold`}
      style={{ fontFamily: LUXE, ...(light ? { color: "var(--gold)" } : {}) }}
    >
      {children}
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

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        className="text-[var(--ink)] mt-4 leading-[1.04]"
        style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: "clamp(2.3rem, 5vw, 3.8rem)", letterSpacing: "0.005em" }}
      >
        {title}
      </h2>
      <Divider />
      {sub && (
        <p className="mx-auto max-w-2xl text-[var(--ink)]/62 leading-8" style={{ fontFamily: BODY, fontSize: "1.02rem" }}>
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
  background: "rgba(255,250,246,0.82)",
  border: "1px solid color-mix(in oklab, var(--gold) 26%, transparent)",
  boxShadow: "0 30px 70px -40px rgba(120,70,60,0.42)",
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
  { href: "#how-it-works", label: "How It Works" },
  { href: "#whats-included", label: "What's Included" },
  { href: "#work", label: "Our Work" },
  { href: "#plans", label: "Pricing" },
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
      <a
        href={checkoutHref("single")}
        className="bar-shimmer fixed top-0 inset-x-0 z-50 h-9 flex items-center justify-center gap-3 px-4 hover:opacity-90 transition-opacity"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <span style={{ color: "var(--gold)", fontSize: "0.55rem" }}>✦</span>
        <span
          className="text-[var(--cream)] text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.2em] uppercase whitespace-nowrap"
          style={{ fontFamily: LUXE }}
        >
          <span className="hidden sm:inline">Dollhouse Launch · Done-for-you social media from ${PRICE_SINGLE}/mo · {GUARANTEE_DAYS}-day money-back guarantee</span>
          <span className="sm:hidden">From ${PRICE_SINGLE}/mo · {GUARANTEE_DAYS}-day money-back guarantee</span>
        </span>
        <span style={{ color: "var(--gold)", fontSize: "0.55rem" }}>✦</span>
      </a>

      <nav
        className={`fixed top-9 inset-x-0 z-40 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
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
            <GetStarted className="!py-2.5 !px-5 !text-[10px]" />
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
            <GetStarted className="justify-center mt-1" />
          </div>
        )}
      </nav>
    </>
  );
}

/* ─── Hero ────────────────────────────────────────────── */
function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[330px] sm:max-w-[360px]" aria-hidden>
      {/* soft glow */}
      <div className="absolute -inset-10 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(200,164,100,0.28), transparent 62%)" }} />

      {/* phone */}
      <div
        className="relative rounded-[46px] p-[10px]"
        style={{ background: "linear-gradient(160deg, #2d1f1b, #170e0c)", boxShadow: "0 50px 90px -40px rgba(60,25,20,0.7), inset 0 0 0 1px rgba(255,255,255,0.08)" }}
      >
        <div className="absolute left-1/2 top-[18px] z-20 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
        <div className="relative overflow-hidden rounded-[37px]" style={{ background: "var(--cream)" }}>
          {/* IG header */}
          <div className="flex items-center gap-2.5 px-4 pb-3 pt-12">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(135deg, #e8d5b0, #c8a464)", padding: "2px" }}
            >
              <span className="flex h-full w-full items-center justify-center rounded-full bg-[var(--cream)]">
                <img src={archMark} alt="" className="h-4 w-auto" />
              </span>
            </span>
            <div className="leading-tight">
              <p className="text-[var(--ink)] font-semibold" style={{ fontFamily: BODY, fontSize: "0.78rem" }}>yourbusiness</p>
              <p className="text-[var(--ink)]/45" style={{ fontFamily: BODY, fontSize: "0.65rem" }}>Your town</p>
            </div>
          </div>

          {/* post */}
          <div
            className="mx-3 flex aspect-square flex-col items-center justify-center rounded-2xl p-6 text-center"
            style={{ background: "linear-gradient(160deg, #fffaf6 0%, #f4dcdc 100%)", border: "1px solid color-mix(in oklab, var(--gold) 26%, transparent)" }}
          >
            <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>✦</span>
            <p className="mt-3 italic text-[var(--ink)] leading-tight" style={{ fontFamily: DISPLAY, fontSize: "1.7rem" }}>
              The one thing I check before every job.
            </p>
            <span className="mt-4 h-px w-10 bg-[var(--gold)] opacity-70" />
            <p className="mt-2 text-[8px] tracking-luxe uppercase text-[var(--rose)]" style={{ fontFamily: LUXE }}>Comment QUOTE for a free estimate</p>
          </div>

          <div className="flex items-center gap-3 px-4 pb-1 pt-3 text-[var(--ink)]/70">
            <Heart className="h-5 w-5" strokeWidth={1.6} />
            <MessageCircle className="h-5 w-5" strokeWidth={1.6} />
            <Send className="h-5 w-5" strokeWidth={1.6} />
          </div>

          {/* auto reply DM */}
          <div className="mx-3 mb-4 mt-2 rounded-2xl p-3" style={{ background: "rgba(244,220,220,0.55)", border: "1px solid color-mix(in oklab, var(--rose) 22%, transparent)" }}>
            <p className="text-[8px] tracking-luxe uppercase text-[var(--rose)]" style={{ fontFamily: LUXE }}>Private reply, sent instantly</p>
            <p className="mt-1 text-[var(--ink)]/78 leading-snug" style={{ fontFamily: BODY, fontSize: "0.74rem" }}>
              Hi! Thanks for asking. Which service are you looking for? I can get you booked in.
            </p>
          </div>
        </div>
      </div>

      {/* floating chips */}
      <div
        className="launch-float absolute -left-6 top-[22%] z-30 flex items-center gap-2.5 rounded-2xl px-4 py-3 sm:-left-14"
        style={{ background: "rgba(255,250,246,0.95)", border: "1px solid color-mix(in oklab, var(--gold) 34%, transparent)", boxShadow: "0 24px 50px -24px rgba(90,40,30,0.5)" }}
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
        className="launch-float-slow absolute -right-4 bottom-[26%] z-30 flex items-center gap-2.5 rounded-2xl px-4 py-3 sm:-right-12"
        style={{ background: "rgba(255,250,246,0.95)", border: "1px solid color-mix(in oklab, var(--gold) 34%, transparent)", boxShadow: "0 24px 50px -24px rgba(90,40,30,0.5)" }}
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

export function LaunchHero() {
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
            <span style={{ color: "var(--gold)" }}>✦</span> Dollhouse Launch
          </p>

          <h1
            className="mt-6 text-[var(--ink)] leading-[0.98]"
            style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: "clamp(2.9rem, 7.4vw, 5.6rem)" }}
          >
            Turn your social media into{" "}
            <span className="italic text-[var(--rose)]">booked appointments.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[var(--ink)]/72 leading-8 lg:mx-0" style={{ fontFamily: BODY, fontSize: "clamp(1rem, 2vw, 1.15rem)" }}>
            The done-for-you social media and lead-generation system for appointment-based and service businesses. We post for you,
            capture new inquiries, reply instantly and book the appointment, from{" "}
            <strong className="text-[var(--ink)]">${PRICE_SINGLE}/month</strong>.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <GetStarted className="!px-10 !py-[18px] !text-[12px]" />
            <a href="#work" className="btn-ghost !px-8 !py-[17px]">
              View Our Work
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] tracking-[0.16em] uppercase text-[var(--ink)]/60 lg:justify-start" style={{ fontFamily: LUXE }}>
            {[`${GUARANTEE_DAYS}-day money-back guarantee`, "No contract", "No ad spend", "Instant account access"].map((t) => (
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

/* ─── Stats strip ─────────────────────────────────────── */
export function LaunchStats() {
  const stats = [
    [`${POSTS_PER_MONTH}`, "posts every month"],
    [`${FIRST_POSTS_DAYS} days`, "to your first posts"],
    ["24/7", "replies and follow-up"],
    [`${GUARANTEE_DAYS} days`, "money-back guarantee"],
  ];
  return (
    <section className="px-6 py-10" style={{ background: "var(--ink)" }}>
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-y-8 md:grid-cols-4">
        {stats.map(([value, label], i) => (
          <div key={label} className={`text-center ${i > 0 ? "md:border-l md:border-white/10" : ""}`}>
            <p className="italic text-[var(--gold)]" style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 4vw, 2.8rem)", lineHeight: 1 }}>
              {value}
            </p>
            <p className="mt-2 text-[var(--cream)]/60 text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE }}>
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Problem ─────────────────────────────────────────── */
export function LaunchProblem() {
  const items = [
    { title: "Posting is a second job", copy: "You post when you have a spare minute, then vanish for weeks. Customers check your page and see nothing new." },
    { title: "Inquiries slip through", copy: "A comment or message sits unanswered for hours, and that customer books with someone who replied faster." },
    { title: "Follow-up never happens", copy: "Between appointments and after hours, nobody is replying. Interested people go cold before you ever see them." },
  ];
  return (
    <section className="py-24 md:py-32 px-6 bg-[var(--cream)]">
      <SectionHead eyebrow="Sound familiar?" title={<>You are great at what you do. <span className="italic text-[var(--rose)]">Marketing keeps losing.</span></>} />
      <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3" data-stagger>
        {items.map((it, i) => (
          <article key={it.title} className="rounded-[28px] p-8" style={card}>
            <span className="italic text-[var(--gold)]" style={{ fontFamily: DISPLAY, fontSize: "2.6rem", lineHeight: 1 }}>0{i + 1}</span>
            <h3 className="mt-4 text-[var(--ink)]" style={{ fontFamily: DISPLAY, fontSize: "1.6rem", fontWeight: 500 }}>{it.title}</h3>
            <p className="mt-3 text-[var(--ink)]/62 leading-7" style={{ fontFamily: BODY, fontSize: "0.95rem" }}>{it.copy}</p>
          </article>
        ))}
      </div>
      <p className="mx-auto mt-12 max-w-2xl text-center italic text-[var(--rose)]" style={{ fontFamily: DISPLAY, fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.2 }}>
        Dollhouse Launch handles all three for one flat monthly price.
      </p>
    </section>
  );
}

/* ─── How it works ────────────────────────────────────── */
const STEPS = [
  { title: "We create your posts", copy: `Receive your first batch of posts for your business within ${FIRST_POSTS_DAYS} days.` },
  { title: "We collect new inquiries", copy: "Visitors use a helpful quote calculator or quiz and share their contact details to get their results." },
  { title: "We reply automatically", copy: "When someone comments or sends a message, they get a helpful private reply right away." },
  { title: "We follow up and book", copy: "New inquiries get follow-up, even after hours, and can book an appointment on your calendar." },
];

export function LaunchHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-32 py-24 md:py-32 px-6"
      style={{ background: "linear-gradient(180deg, var(--cream) 0%, #f8e9e5 100%)" }}
    >
      <SectionHead
        eyebrow="How it works"
        title="Four steps from social media attention to appointments"
        sub="Grow your business through organic social media. We create the posts, capture the inquiries and follow up, so you can book more customers without adding to your workload."
      />
      <div className="relative mx-auto mt-16 max-w-6xl">
        <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px lg:block" style={{ background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--gold) 55%, transparent), transparent)" }} />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
          {STEPS.map((s, i) => (
            <article key={s.title} className="relative text-center">
              <span
                className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full italic text-[var(--rose)]"
                style={{ fontFamily: DISPLAY, fontSize: "1.5rem", background: "var(--cream)", border: "1px solid color-mix(in oklab, var(--gold) 50%, transparent)", boxShadow: "0 12px 26px -14px rgba(160,110,60,0.6)" }}
              >
                {i + 1}
              </span>
              <h3 className="mt-5 text-[var(--ink)] uppercase" style={{ fontFamily: LUXE, fontSize: "0.92rem", letterSpacing: "0.1em", fontWeight: 600 }}>
                {s.title}
              </h3>
              <p className="mx-auto mt-3 max-w-[240px] text-[var(--ink)]/62 leading-7" style={{ fontFamily: BODY, fontSize: "0.92rem" }}>
                {s.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-14 text-center">
        <GetStarted />
      </div>
    </section>
  );
}

/* ─── What's included ─────────────────────────────────── */
const SERVICES = [
  {
    icon: ImageIcon,
    title: "Daily Social Media Posts",
    lead: "Consistent, credible content that turns what you know into trust.",
    points: [
      `${POSTS_PER_MONTH} posts per month, written around your services, your town and your customers`,
      "Published daily to Instagram and Facebook after you approve them",
      "Reasonable revisions included at no additional charge",
      "Your branding, your style, your voice",
    ],
  },
  {
    icon: Calculator,
    title: "Quote Calculator or Quiz",
    lead: "A helpful tool built around your services. Visitors get personalized results and you get their details.",
    points: [
      "Custom built for your business and your services",
      "Lives on a page we host, or on your website if you have one",
      "Works on phones, tablets and computers",
      "Names, contact details and service needs saved automatically",
    ],
  },
  {
    icon: MessageSquare,
    title: "Automatic Replies",
    lead: "When someone comments or asks a question, they get a helpful private message that starts the conversation.",
    points: [
      "Chosen comments get an immediate private reply",
      "A few simple questions find out which service they need",
      "Contact details are saved automatically for follow-up",
      "Replies are written for the services you offer",
    ],
  },
  {
    icon: CalendarCheck,
    title: "Follow-Up and Booking",
    lead: "New inquiries get prompt replies, answers to common questions, and an invitation to book with you.",
    points: [
      "Follow-up starts automatically when someone contacts you",
      "Answers common questions using information you approve",
      "Helps interested people book an appointment on your calendar",
      "Works nights, weekends and busy season without extra staff",
    ],
  },
];

export function LaunchWhatsIncluded() {
  return (
    <section id="whats-included" className="scroll-mt-32 py-24 md:py-32 px-6 bg-[var(--cream)]">
      <SectionHead
        eyebrow="What is included"
        title="Everything we build and manage for your business"
        sub="Here is exactly what we create, manage and improve for you each month."
      />
      <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2" data-stagger>
        {SERVICES.map(({ icon: Icon, title, lead, points }, i) => (
          <article key={title} className="relative flex flex-col rounded-[28px] p-8 md:p-10" style={card}>
            <span className="absolute right-8 top-6 italic text-[var(--gold)]/25" style={{ fontFamily: DISPLAY, fontSize: "4.5rem", lineHeight: 1 }}>0{i + 1}</span>
            <span
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--gold) 26%, transparent), color-mix(in oklab, var(--rose) 14%, transparent))", color: "var(--rose)", border: "1px solid color-mix(in oklab, var(--gold) 34%, transparent)" }}
            >
              <Icon className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <h3 className="mt-6 text-[var(--ink)] leading-tight" style={{ fontFamily: DISPLAY, fontSize: "1.9rem", fontWeight: 500 }}>
              {title}
            </h3>
            <p className="mt-3 text-[var(--ink)]/62 leading-7" style={{ fontFamily: BODY, fontSize: "0.97rem" }}>{lead}</p>
            <ul className="mt-6 grid gap-3">
              {points.map((p) => (
                <li key={p} className="flex gap-3 text-[var(--ink)]/78 leading-6" style={{ fontFamily: BODY, fontSize: "0.92rem" }}>
                  <CheckDot />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─── Our work ────────────────────────────────────────── */
const BUILT = [
  { title: "The Brand Kit", tag: "Interactive web app", copy: "A guided tool that builds a full brand blueprint: moodboard, palette, fonts, core message and a first-sale plan.", img: brandKitImg, href: "https://room.shopdollhouse.co/brand-kit" },
  { title: "The Brand Workbook", tag: "Interactive web app", copy: "An eight-room workbook that walks you through every launch decision and ends in a downloadable business blueprint.", img: workbookImg, href: "https://room.shopdollhouse.co/workbook" },
  { title: "The AI Prompt Kit", tag: "Interactive web app", copy: "50+ fill-in-the-blank prompts organized into eight rooms, so a week of marketing content writes itself.", img: promptKitImg, href: "https://room.shopdollhouse.co/ai-prompt-kit" },
];

const STYLES = [
  { name: "Expert desk notes", sample: "The one thing I check before every job.", tone: "cream" },
  { name: "Photo caption stories", sample: "Why this customer came back three times.", tone: "blush" },
  { name: "Simple feed-style posts", sample: "Three questions to ask before you hire anyone.", tone: "ink" },
  { name: "Whiteboard lessons", sample: "What actually goes into a fair quote.", tone: "cream" },
  { name: "Everyday object posts", sample: "What a coffee mug can teach you about maintenance.", tone: "blush" },
  { name: "Bold brand graphics", sample: "Booked out this week? Here is how.", tone: "ink" },
] as const;

const TONES: Record<string, { bg: string; fg: string; accent: string }> = {
  cream: { bg: "linear-gradient(160deg, #fffaf6 0%, #f7e9e3 100%)", fg: "var(--ink)", accent: "var(--rose)" },
  blush: { bg: "linear-gradient(160deg, #f4dcdc 0%, #f1d3cf 100%)", fg: "var(--ink)", accent: "var(--rose)" },
  ink: { bg: "linear-gradient(160deg, #2a1d1a 0%, #1a100e 100%)", fg: "var(--cream)", accent: "var(--gold)" },
};

export function LaunchWork() {
  return (
    <section
      id="work"
      className="scroll-mt-32 py-24 md:py-32 px-6"
      style={{ background: "linear-gradient(180deg, var(--blush) 0%, var(--cream) 100%)" }}
    >
      <SectionHead
        eyebrow="Our work"
        title="Built by us. Live today."
        sub="We design, build and run our own brand, so you can see what we make before you order. Here is a look at what is live right now."
      />

      {/* Live builds */}
      <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3" data-stagger>
        {BUILT.map((b) => (
          <a key={b.title} href={b.href} target="_blank" rel="noopener noreferrer" className="group block no-underline">
            <article className="overflow-hidden rounded-[28px] transition-all duration-500 group-hover:-translate-y-1" style={card}>
              <div className="overflow-hidden">
                <img src={b.img} alt={`${b.title} preview`} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-7">
                <p className="text-[var(--gold)] text-[9px] tracking-luxe uppercase" style={{ fontFamily: LUXE }}>{b.tag}</p>
                <h3 className="mt-2 text-[var(--ink)]" style={{ fontFamily: DISPLAY, fontSize: "1.55rem", fontWeight: 500 }}>{b.title}</h3>
                <p className="mt-2 text-[var(--ink)]/62 leading-7" style={{ fontFamily: BODY, fontSize: "0.9rem" }}>{b.copy}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[var(--rose)] text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE }}>
                  See it live <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          </a>
        ))}
      </div>

      {/* Live AI receptionist funnel */}
      <a
        href="https://dollhousebrandstudio.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group mx-auto mt-6 block max-w-6xl no-underline"
      >
        <article
          className="relative overflow-hidden rounded-[28px] p-8 md:p-12 transition-transform duration-500 group-hover:-translate-y-1"
          style={{ background: "linear-gradient(135deg, #2a1d1a 0%, #170e0c 100%)", border: "1px solid color-mix(in oklab, var(--gold) 40%, transparent)", boxShadow: "0 40px 80px -44px rgba(40,19,15,0.7)" }}
        >
          <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(200,164,100,0.3), transparent 65%)" }} />
          <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="text-[9px] tracking-luxe uppercase" style={{ fontFamily: LUXE, color: "var(--gold)" }}>Live funnel · Voice AI</p>
              <h3 className="mt-3 italic text-[var(--cream)]" style={{ fontFamily: DISPLAY, fontSize: "clamp(1.9rem, 4vw, 2.7rem)", lineHeight: 1.1 }}>
                Talk to a live AI receptionist
              </h3>
              <p className="mt-3 max-w-xl text-[var(--cream)]/65 leading-7" style={{ fontFamily: BODY, fontSize: "0.95rem" }}>
                Our own funnel for med spas and clinics: a premium landing page, a working voice AI demo you can talk to, and a built-in
                application flow. It is the same follow-up and booking technology behind Dollhouse Launch.
              </p>
            </div>
            <div className="flex md:justify-end">
              <span className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-[11px] tracking-luxe uppercase" style={{ fontFamily: LUXE, background: "var(--gold)", color: "var(--ink)", fontWeight: 600 }}>
                Try the live demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </article>
      </a>

      {/* Recognition */}
      <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <span className="text-[var(--ink)]/45 text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE }}>Our work has been recognized by</span>
        <a href="https://www.buzzfeed.com/sarahrohoman/black-owned-stores-etsy-canada" target="_blank" rel="noopener noreferrer" className="italic text-[var(--gold)] underline decoration-[var(--gold)]/40 underline-offset-4 hover:text-[var(--rose)]" style={{ fontFamily: DISPLAY, fontSize: "1.3rem" }}>BuzzFeed</a>
        <a href="https://www.huffpost.com/entry/get-out-and-vote-merch-election-2020_l_5f344d83c5b6960c066fef03" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--ink)] underline decoration-[var(--ink)]/25 underline-offset-4 hover:text-[var(--rose)]" style={{ fontFamily: LUXE, fontSize: "0.95rem" }}>HuffPost</a>
      </div>

      {/* Sample post styles */}
      <div className="mx-auto mt-20 max-w-6xl">
        <div className="text-center">
          <Eyebrow>The kind of posts we create</Eyebrow>
          <h3 className="mt-3 italic text-[var(--ink)]" style={{ fontFamily: DISPLAY, fontSize: "clamp(1.9rem, 4vw, 2.7rem)", lineHeight: 1.1 }}>
            Content that looks like you, not everyone else
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-[var(--ink)]/55 leading-7" style={{ fontFamily: BODY, fontSize: "0.92rem" }}>
            Sample styles and ideas, not finished posts. Send us a post you love during setup and we will create in a similar style with your own branding.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {STYLES.map((s) => {
            const t = TONES[s.tone];
            return (
              <article key={s.name} className="overflow-hidden rounded-[24px]" style={card}>
                <div className="flex aspect-[5/4] flex-col items-center justify-center p-7 text-center" style={{ background: t.bg }}>
                  <span style={{ color: t.accent, fontSize: "0.8rem" }}>✦</span>
                  <p className="mt-3 italic leading-tight" style={{ fontFamily: DISPLAY, fontSize: "clamp(1.4rem, 2.6vw, 1.8rem)", color: t.fg }}>{s.sample}</p>
                  <span className="mt-4 h-px w-10" style={{ background: t.accent, opacity: 0.6 }} />
                </div>
                <div className="flex items-center justify-between px-6 py-4">
                  <h4 className="text-[var(--ink)] uppercase" style={{ fontFamily: LUXE, fontSize: "0.78rem", letterSpacing: "0.12em", fontWeight: 600 }}>{s.name}</h4>
                  <span className="text-[var(--gold)] text-[8px] tracking-luxe uppercase" style={{ fontFamily: LUXE }}>Sample</span>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <GetStarted label="Get Started Today" />
        </div>
      </div>
    </section>
  );
}

/* ─── Plans ───────────────────────────────────────────── */
export function LaunchPlans() {
  return (
    <section
      id="plans"
      className="scroll-mt-32 py-24 md:py-32 px-6"
      style={{
        background:
          "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.9), transparent 36%), radial-gradient(circle at 50% 58%, rgba(201,122,122,0.16), transparent 42%), linear-gradient(180deg, #fbf1ed 0%, #f5ddd7 52%, #fff8f3 100%)",
      }}
    >
      <div className="mx-auto max-w-4xl text-center">
        <Eyebrow>Simple pricing. Everything handled.</Eyebrow>
        <h2 className="mt-4 leading-[0.98]" style={{ fontFamily: DISPLAY, fontWeight: 400, color: "var(--ink)", fontSize: "clamp(2.8rem, 7vw, 5.2rem)" }}>
          Choose your plan
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[var(--ink)]/62 leading-7" style={{ fontFamily: BODY }}>
          The same complete service in both plans. Pick the type of posts you prefer and check out in about two minutes.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-8 md:grid-cols-2" data-stagger>
        {LAUNCH_PLANS.map((plan, i) => {
          const featured = i === 1;
          return (
            <article
              key={plan.id}
              className="relative flex flex-col rounded-[30px] p-9 text-center"
              style={{
                background: featured ? "linear-gradient(170deg, #2a1d1a 0%, #170e0c 100%)" : card.background,
                border: featured ? "1.5px solid var(--gold)" : "1.5px solid color-mix(in oklab, var(--gold) 50%, transparent)",
                boxShadow: featured ? "0 44px 90px -40px rgba(40,19,15,0.75)" : "0 36px 80px -38px rgba(160,110,60,0.5)",
              }}
            >
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 text-[9px] tracking-luxe uppercase"
                style={{ fontFamily: LUXE, background: featured ? "var(--gold)" : "var(--ink)", color: featured ? "var(--ink)" : "var(--cream)", fontWeight: 600 }}
              >
                {plan.badge}
              </span>
              <h3 style={{ fontFamily: DISPLAY, fontSize: "1.65rem", fontWeight: 500, color: featured ? "var(--cream)" : "var(--rose)" }}>{plan.name}</h3>
              <p className="mt-4" style={{ fontFamily: DISPLAY, fontSize: "4.2rem", lineHeight: 1, color: featured ? "var(--gold)" : "var(--ink)" }}>
                ${plan.price}
                <span className="ml-1" style={{ fontFamily: BODY, fontSize: "1rem", color: featured ? "rgba(255,250,246,0.5)" : "rgba(30,15,10,0.5)" }}>/month</span>
              </p>
              <p className="mt-4 font-medium" style={{ fontFamily: BODY, fontSize: "0.98rem", color: featured ? "var(--cream)" : "var(--ink)" }}>{plan.mix}</p>
              <p className="mt-1" style={{ fontFamily: BODY, fontSize: "0.88rem", color: featured ? "rgba(255,250,246,0.55)" : "rgba(30,15,10,0.55)" }}>{plan.blurb}</p>
              <a
                href={checkoutHref(plan.id)}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full px-8 py-[17px] text-[11px] tracking-luxe uppercase transition-transform hover:-translate-y-0.5"
                style={{
                  fontFamily: LUXE,
                  fontWeight: 600,
                  background: featured ? "var(--gold)" : "var(--ink)",
                  color: featured ? "var(--ink)" : "var(--cream)",
                  boxShadow: "0 22px 44px -18px rgba(30,15,10,0.6)",
                }}
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </a>
              <p className="mt-3 text-[10px] tracking-[0.14em] uppercase" style={{ fontFamily: LUXE, color: featured ? "rgba(255,250,246,0.45)" : "rgba(30,15,10,0.45)" }}>
                No contract · Cancel anytime
              </p>
            </article>
          );
        })}
      </div>

      <div className="mx-auto mt-10 max-w-4xl rounded-[30px] p-8 md:p-10" style={card}>
        <h3 className="text-center text-[var(--ink)] uppercase" style={{ fontFamily: LUXE, fontSize: "0.85rem", letterSpacing: "0.18em", fontWeight: 600 }}>
          Included in both plans
        </h3>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {INCLUDED_IN_BOTH.map((t) => (
            <li key={t} className="flex gap-3 text-[var(--ink)]/78 leading-6" style={{ fontFamily: BODY, fontSize: "0.92rem" }}>
              <CheckDot />
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { title: "Your Dollhouse CRM account", copy: "Keep inquiries, messages, follow-up and appointments organized in one place." },
            { title: "Private onboarding kickoff", copy: "After checkout, a one-on-one session to set up your services, ideal customers and favorite styles." },
          ].map((b) => (
            <div key={b.title} className="rounded-2xl p-6 text-center" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)" }}>
              <p className="text-[var(--gold)] text-[9px] tracking-luxe uppercase" style={{ fontFamily: LUXE }}>Included bonus</p>
              <h4 className="mt-2 italic text-[var(--rose)]" style={{ fontFamily: DISPLAY, fontSize: "1.4rem" }}>{b.title}</h4>
              <p className="mt-2 text-[var(--ink)]/60 leading-6" style={{ fontFamily: BODY, fontSize: "0.88rem" }}>{b.copy}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-[var(--ink)]/45 leading-6" style={{ fontFamily: BODY, fontSize: "0.78rem" }}>
          Your plan is billed monthly until canceled. Optional add-ons are only added with your approval. All prices in USD.
        </p>
      </div>

      {/* Guarantee */}
      <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-5 rounded-[30px] p-8 text-center md:flex-row md:text-left" style={{ background: "color-mix(in oklab, var(--gold) 13%, transparent)", border: "1px solid color-mix(in oklab, var(--gold) 38%, transparent)" }}>
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full" style={{ background: "var(--ink)", color: "var(--gold)" }}>
          <ShieldCheck className="h-7 w-7" strokeWidth={1.5} />
        </span>
        <div>
          <h3 className="italic text-[var(--ink)]" style={{ fontFamily: DISPLAY, fontSize: "1.8rem" }}>Try it risk-free for {GUARANTEE_DAYS} days</h3>
          <p className="mt-1 text-[var(--ink)]/65 leading-7" style={{ fontFamily: BODY, fontSize: "0.95rem" }}>
            If you are not satisfied, contact us within your first {GUARANTEE_DAYS} days for a full refund. No long-term contract, and you can cancel anytime.{" "}
            <a href="/refund-policy" className="text-[var(--rose)] underline underline-offset-4">Read the refund policy</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Who it's for ────────────────────────────────────── */
const WHO = [
  "Hair & beauty salons", "Barbers", "Lash & brow studios", "Spas & wellness", "Clinics & practitioners", "Fitness studios & trainers",
  "Contractors & trades", "Cleaning services", "Photographers", "Realtors", "Tutors & coaches", "Pet services",
];

export function LaunchWhoFor() {
  return (
    <section className="py-24 md:py-28 px-6 bg-[var(--cream)]">
      <SectionHead eyebrow="Who it is for" title="Built for appointment-based and service businesses" sub="If customers find you, message you and book you, this system is for you." />
      <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3" data-stagger>
        {WHO.map((w) => (
          <span key={w} className="rounded-full px-5 py-2.5 text-[var(--ink)]/80" style={{ fontFamily: BODY, fontSize: "0.9rem", background: "rgba(255,250,246,0.9)", border: "1px solid color-mix(in oklab, var(--gold) 34%, transparent)" }}>
            {w}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─── Founder ─────────────────────────────────────────── */
export function LaunchFounder() {
  return (
    <section id="about" className="scroll-mt-32 py-24 md:py-32 px-6" style={{ background: "linear-gradient(180deg, var(--cream) 0%, #f8e9e5 100%)" }}>
      <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="relative overflow-hidden" style={{ borderRadius: "30px", border: "2px solid color-mix(in oklab, var(--gold) 40%, transparent)", boxShadow: "0 20px 50px -15px rgba(160,110,95,0.35)", aspectRatio: "3/4" }}>
            <img src={mandyPhoto} alt="Mandy Fortune, founder of The Dollhouse Brand Studio" loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: "center top" }} />
          </div>
        </div>
        <div className="text-center lg:text-left">
          <Eyebrow>Meet your founder</Eyebrow>
          <h2 className="mt-4 italic text-[var(--ink)]" style={{ fontFamily: DISPLAY, fontSize: "clamp(2.4rem, 5vw, 3.8rem)", lineHeight: 1.05 }}>
            Hi, I'm Mandy.
          </h2>
          <p className="mt-2 text-[var(--gold)] text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE }}>
            Social media strategist · Brand designer · Greater Toronto Area
          </p>
          <p className="mt-5 text-[var(--ink)]/75 leading-8" style={{ fontFamily: BODY }}>
            I have spent 11+ years in graphic and product design, building brands for companies, creators and entrepreneurs. My work has been recognized by BuzzFeed and HuffPost.
          </p>
          <p className="mt-4 text-[var(--ink)]/75 leading-8" style={{ fontFamily: BODY }}>
            I built Dollhouse Launch because I kept seeing talented local business owners who were invisible online. Not because they were not good enough, but because they were too busy doing the work to show up consistently. This system exists so you do not have to choose.
          </p>
          <p className="mt-6 italic text-[var(--rose)]" style={{ fontFamily: DISPLAY, fontSize: "1.7rem" }}>
            You run your business. We'll handle the marketing.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─────────────────────────────────────────────── */
const FAQS = [
  {
    q: "How do I get started?",
    a: `Choose your plan, check out securely (it takes about two minutes), and you get instant access to your account. Your first posts and publishing plan arrive within ${FIRST_POSTS_DAYS} days.`,
  },
  {
    q: "Exactly what content is included each month?",
    a: `Every plan includes ${POSTS_PER_MONTH} posts a month, written around your services and published daily to Instagram and Facebook after you approve them. The Single-Image plan is 30 single-image posts. The Carousel plan is 15 carousel posts and 15 single-image posts.`,
  },
  {
    q: "Is paid advertising included?",
    a: "No. This system is built for organic growth, so there is no ad spend and nothing to manage on an ad account.",
  },
  {
    q: "Who is this built for?",
    a: "Appointment-based and service businesses that serve customers in their area: salons, barbers, lash and brow studios, spas, clinics, fitness studios, contractors, cleaners, photographers, realtors and more. If people find you, message you or book you, this is for you.",
  },
  {
    q: "What do you need from me?",
    a: "After checkout you get a short setup checklist and a private onboarding kickoff. If you have a logo, brand colors and photos, send them. If not, we will work with what you have.",
  },
  {
    q: "How do revisions work?",
    a: "You approve everything before it goes live. If a post is not right, tell us what to change and we will update it. Reasonable revisions are included at no extra charge.",
  },
  {
    q: "Can I choose carousel posts or add other platforms?",
    a: "Yes to carousels: that is the $497 plan. Both plans cover Instagram and Facebook. If you want another platform, email us and we will give you an honest answer about whether we can add it.",
  },
  {
    q: "Does the AI give advice?",
    a: "No. It answers common questions using information you approve, asks a few simple questions to understand what the person needs, and hands the conversation to you for anything else. It does not give medical, legal or financial advice.",
  },
  {
    q: "Do I need to provide content or a website?",
    a: "No. We write and design the posts, and we can host your quote calculator or quiz on a page for you or add it to your site if you already have one. Photos and real examples from your work make the posts even better, and nothing is published until you approve it.",
  },
  {
    q: "Does the follow-up follow messaging rules?",
    a: "Yes. Texts and emails only go to people who have asked to hear from you, and every message includes a way to opt out.",
  },
  {
    q: "Are there any additional software costs?",
    a: "Your Dollhouse CRM account is included in your plan. If something extra is ever needed, we will tell you first and only add it with your approval.",
  },
  {
    q: "Is there a contract or commitment?",
    a: `No. Your plan renews monthly and you can cancel anytime. You are also covered by our ${GUARANTEE_DAYS}-day money-back guarantee.`,
  },
];

export function LaunchFaq() {
  return (
    <section id="faq" className="scroll-mt-32 py-24 md:py-32 px-6 bg-[var(--cream)]">
      <SectionHead eyebrow="FAQ" title="Questions, answered" />
      <div className="mx-auto mt-12 grid max-w-3xl gap-3">
        {FAQS.map((f) => (
          <details key={f.q} className="dh-faq rounded-2xl px-6 py-5" style={card}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[var(--ink)]" style={{ fontFamily: DISPLAY, fontSize: "1.25rem", fontWeight: 500 }}>
              {f.q}
              <ChevronDown className="dh-faq-chevron h-5 w-5 shrink-0 text-[var(--gold)]" />
            </summary>
            <p className="mt-3 text-[var(--ink)]/65 leading-7" style={{ fontFamily: BODY, fontSize: "0.95rem" }}>{f.a}</p>
          </details>
        ))}
      </div>
      <p className="mt-8 text-center text-[var(--ink)]/55" style={{ fontFamily: BODY, fontSize: "0.9rem" }}>
        Still have a question? Email us at{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[var(--rose)] underline underline-offset-4">{SUPPORT_EMAIL}</a>.
      </p>
    </section>
  );
}

/* ─── Final CTA ───────────────────────────────────────── */
export function LaunchFinalCta() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:py-32 text-center" style={{ background: "linear-gradient(135deg, #2a1d1a 0%, #170e0c 100%)" }}>
      <div aria-hidden className="absolute left-1/2 top-0 h-80 w-[40rem] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(circle, rgba(200,164,100,0.25), transparent 65%)" }} />
      <div className="relative">
        <Eyebrow light>Dollhouse Launch</Eyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl text-[var(--cream)]" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: "clamp(2.4rem, 6vw, 4.2rem)", lineHeight: 1.04 }}>
          Ready to turn your social media into{" "}
          <span className="italic text-[var(--gold)]">booked appointments?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[var(--cream)]/60 leading-8" style={{ fontFamily: BODY }}>
          Start today for ${PRICE_SINGLE} a month. No contract, and a full {GUARANTEE_DAYS}-day money-back guarantee.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={checkoutHref("single")}
            className="inline-flex items-center justify-center gap-2 rounded-full px-10 py-[18px] text-[12px] tracking-luxe uppercase transition-transform hover:-translate-y-0.5"
            style={{ fontFamily: LUXE, fontWeight: 600, background: "var(--gold)", color: "var(--ink)", boxShadow: "0 24px 50px -18px rgba(200,164,100,0.55)" }}
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#work"
            className="inline-flex items-center justify-center rounded-full px-8 py-[17px] text-[11px] tracking-luxe uppercase transition-colors hover:bg-white/10"
            style={{ fontFamily: LUXE, color: "var(--cream)", border: "1px solid rgba(255,250,246,0.4)" }}
          >
            View Our Work
          </a>
        </div>
        <p className="mt-6 inline-flex items-center gap-2 text-[var(--cream)]/40 text-[10px] tracking-[0.16em] uppercase" style={{ fontFamily: LUXE }}>
          <Sparkles className="h-3 w-3" /> Secure checkout · Instant account access
        </p>
      </div>
    </section>
  );
}

/* ─── Mobile sticky checkout bar ──────────────────────── */
export function LaunchStickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const plans = document.getElementById("plans");
      const pastHero = window.scrollY > 560;
      const r = plans?.getBoundingClientRect();
      const inPlans = r ? r.top < window.innerHeight * 0.6 && r.bottom > 0 : false;
      setShow(pastHero && !inPlans);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 md:hidden transition-transform duration-500"
      style={{
        transform: show ? "translateY(0)" : "translateY(110%)",
        background: "color-mix(in oklab, var(--cream) 95%, transparent)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderTop: "1px solid color-mix(in oklab, var(--gold) 30%, transparent)",
        paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
      }}
    >
      <div className="flex items-center justify-between gap-3 pl-5 pr-24 pt-3">
        <p className="text-[var(--ink)]/70 leading-tight" style={{ fontFamily: BODY, fontSize: "0.8rem" }}>
          Social media from <strong className="text-[var(--ink)]">${PRICE_SINGLE}/mo</strong>
          <br />
          <span className="text-[var(--ink)]/50">{GUARANTEE_DAYS}-day money-back guarantee</span>
        </p>
        <a href={checkoutHref("single")} className="btn-ink !py-3 !px-5 !text-[10px] shrink-0">
          Get Started
        </a>
      </div>
    </div>
  );
}
