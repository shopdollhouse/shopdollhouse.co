import { useEffect, useState } from "react";
import { Calculator, CalendarCheck, Check, ChevronDown, Menu, MessageSquare, Image as ImageIcon, X } from "lucide-react";
import archMark from "@/assets/arch-mark.svg";
import bgImage from "@/assets/password-bg.jpg";
import mandyPhoto from "@/assets/mandy-photo.jpg";
import {
  FIRST_POSTS_DAYS,
  GUARANTEE_DAYS,
  HERO_VIDEO_EMBED_URL,
  INCLUDED_IN_BOTH,
  LAUNCH_PLANS,
  PRICE_SINGLE,
  orderHref,
} from "@/lib/launch-offer";

const DISPLAY = "'Cormorant Garamond', serif";
const BODY = "'DM Sans', sans-serif";
const LUXE = "'Jost', sans-serif";

/* ─── Small shared pieces ─────────────────────────────── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="gold-grad text-[11px] tracking-luxe uppercase font-semibold" style={{ fontFamily: LUXE }}>
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

function SectionHead({ eyebrow, title, italic, sub }: { eyebrow: string; title: React.ReactNode; italic?: string; sub?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        className="text-[var(--rose)] mt-4 leading-[1.05]"
        style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: "clamp(2.3rem, 5vw, 3.8rem)", letterSpacing: "0.01em" }}
      >
        {title}
      </h2>
      {italic && (
        <p className="text-[var(--rose)] italic mt-2" style={{ fontFamily: DISPLAY, fontSize: "1.4rem" }}>
          {italic}
        </p>
      )}
      <Divider />
      {sub && (
        <p className="mx-auto max-w-2xl text-[var(--ink)]/62 leading-8" style={{ fontFamily: BODY, fontSize: "1rem" }}>
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
  background: "rgba(255,250,246,0.78)",
  border: "1px solid color-mix(in oklab, var(--gold) 26%, transparent)",
  boxShadow: "0 30px 70px -40px rgba(120,70,60,0.42)",
} as const;

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
      <a
        href="#plans"
        className="bar-shimmer fixed top-0 inset-x-0 z-50 h-9 flex items-center justify-center gap-3 px-4 hover:opacity-90 transition-opacity"
        style={{ backgroundColor: "var(--ink)" }}
      >
        <span style={{ color: "var(--gold)", fontSize: "0.55rem" }}>✦</span>
        <span className="text-[var(--cream)] text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.2em] uppercase whitespace-nowrap" style={{ fontFamily: LUXE }}>
          <span className="hidden sm:inline">Done-for-you social media from ${PRICE_SINGLE}/mo · {GUARANTEE_DAYS}-day money-back guarantee</span>
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
              <span className="font-semibold" style={{ fontFamily: LUXE, color: "var(--gold)", fontSize: "6.5px", letterSpacing: "3.5px", textTransform: "uppercase", marginTop: "2px" }}>Brand Studio</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-9 text-[10px] tracking-luxe uppercase text-[var(--ink)]/80" style={{ fontFamily: LUXE }}>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link hover:text-[var(--rose)] transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#plans" className="btn-ink !py-2.5 !px-5 !text-[10px]">
              Get Started Now
            </a>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 text-[var(--ink)]"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div
            className="md:hidden px-6 pb-6 pt-4 flex flex-col gap-4 text-[11px] tracking-luxe uppercase text-[var(--ink)]/80"
            style={{ fontFamily: LUXE, background: "color-mix(in oklab, var(--cream) 97%, transparent)", borderBottom: "1px solid color-mix(in oklab, var(--gold) 22%, transparent)" }}
          >
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="hover:text-[var(--rose)]">
                {l.label}
              </a>
            ))}
            <a href="#plans" onClick={() => setOpen(false)} className="btn-ink justify-center mt-1">
              Get Started Now
            </a>
          </div>
        )}
      </nav>
    </>
  );
}

/* ─── Hero ────────────────────────────────────────────── */
export function LaunchHero() {
  return (
    <header className="relative min-h-[calc(100svh-36px)] flex items-start justify-center px-4 pt-32 pb-16 overflow-hidden md:pt-40">
      <div
        aria-hidden
        className="bg-kenburns absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div aria-hidden className="aurora absolute inset-0 pointer-events-none" />
      <span aria-hidden className="sparkle-drift" style={{ top: "18%", left: "12%", fontSize: "16px" }}>✦</span>
      <span aria-hidden className="sparkle-drift" style={{ top: "30%", right: "14%", fontSize: "12px", animationDelay: "1.6s" }}>✦</span>
      <span aria-hidden className="sparkle-drift" style={{ bottom: "22%", left: "20%", fontSize: "11px", animationDelay: "3s" }}>✦</span>
      <span aria-hidden className="sparkle-drift" style={{ bottom: "30%", right: "22%", fontSize: "15px", animationDelay: "2.2s" }}>✦</span>
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "rgba(247,228,223,0.32)" }} />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(230,200,195,0.45) 70%, rgba(210,175,168,0.7) 100%)" }}
      />

      <div className="relative z-10 w-full max-w-4xl text-center">
        <p
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-[10px] tracking-luxe uppercase text-[var(--ink)]/75"
          style={{ fontFamily: LUXE, background: "rgba(255,250,246,0.72)", border: "1px solid color-mix(in oklab, var(--gold) 32%, transparent)" }}
        >
          For local business owners
        </p>

        <h1
          className="mt-6 text-[var(--ink)] leading-[0.98]"
          style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: "clamp(2.9rem, 8vw, 6rem)" }}
        >
          Turn social media into{" "}
          <span className="italic text-[var(--rose)]">booked customers.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-[var(--ink)]/72 leading-8" style={{ fontFamily: BODY, fontSize: "clamp(1rem, 2vw, 1.15rem)" }}>
          We create your posts, give interested visitors an easy way to reach you, and automatically follow up and book
          appointments, all for <strong className="text-[var(--ink)]">${PRICE_SINGLE}/month</strong>.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {["Daily social media posts", "Instant quote tool", "AI follow-up & booking"].map((label) => (
            <span
              key={label}
              className="rounded-full px-5 py-2.5 text-[10px] tracking-luxe uppercase text-[var(--ink)]"
              style={{ fontFamily: LUXE, fontWeight: 600, background: "rgba(255,250,246,0.82)", border: "1px solid color-mix(in oklab, var(--gold) 38%, transparent)", boxShadow: "0 14px 30px -22px rgba(120,70,55,0.5)" }}
            >
              {label}
            </span>
          ))}
        </div>

        {HERO_VIDEO_EMBED_URL ? (
          <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-[26px]" style={{ ...card, aspectRatio: "16/9" }}>
            <iframe
              src={HERO_VIDEO_EMBED_URL}
              title="How it works"
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <a href="#how-it-works" className="mt-10 inline-flex flex-col items-center gap-1 text-[var(--ink)]/60 hover:text-[var(--rose)] transition-colors">
            <span className="text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE }}>See how it works</span>
            <ChevronDown className="h-5 w-5" />
          </a>
        )}

        <div className="mt-8">
          <a href="#plans" className="btn-ink">
            Get Started Now
          </a>
          <p className="mt-4 text-[var(--ink)]/70" style={{ fontFamily: BODY, fontSize: "0.95rem" }}>
            Done-for-you social media from <strong>${PRICE_SINGLE}/mo</strong>
          </p>
          <p className="mt-1 text-[var(--ink)]/55 italic" style={{ fontFamily: DISPLAY, fontSize: "1.1rem" }}>
            Built for organic growth. No paid ads or ad spend required.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] tracking-[0.16em] uppercase text-[var(--ink)]/60" style={{ fontFamily: LUXE }}>
          {[
            `${GUARANTEE_DAYS}-day money-back guarantee`,
            "No contract, cancel anytime",
            "Instant account access",
            "Free CRM account included",
            "1-on-1 kickoff call",
          ].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span style={{ color: "var(--gold)" }}>✦</span> {t}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

/* ─── How it works ────────────────────────────────────── */
const STEPS = [
  { title: "We create your posts", copy: `Receive your first batch of posts for your business within ${FIRST_POSTS_DAYS} days.` },
  { title: "We collect new inquiries", copy: "Visitors use a helpful quote calculator or quiz and share their contact details to get their results." },
  { title: "We reply automatically", copy: "When someone comments or sends a message, they get a helpful private reply right away." },
  { title: "We follow up and book", copy: "New inquiries get follow-up, even after hours, and can book an appointment or estimate on your calendar." },
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
        title="Everything you need to turn social media attention into appointments"
        sub="Grow your business through organic social media. We create your posts, capture inquiries, and follow up so you can book more customers without adding to your workload."
      />
      <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4" data-stagger>
        {STEPS.map((s, i) => (
          <article key={s.title} className="rounded-[28px] p-8 text-center" style={card}>
            <span
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-full italic text-[var(--rose)]"
              style={{ fontFamily: DISPLAY, fontSize: "1.5rem", background: "color-mix(in oklab, var(--gold) 16%, transparent)", border: "1px solid color-mix(in oklab, var(--gold) 36%, transparent)" }}
            >
              {i + 1}
            </span>
            <p className="mt-5 text-[var(--gold)] text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE }}>
              Step {i + 1}
            </p>
            <h3 className="mt-2 text-[var(--ink)] uppercase" style={{ fontFamily: LUXE, fontSize: "0.95rem", letterSpacing: "0.1em", fontWeight: 600 }}>
              {s.title}
            </h3>
            <p className="mt-3 text-[var(--ink)]/62 leading-7" style={{ fontFamily: BODY, fontSize: "0.92rem" }}>
              {s.copy}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─── What's included ─────────────────────────────────── */
const SERVICES = [
  {
    icon: ImageIcon,
    title: "Daily Social Media Posts for Your Business",
    lead: "Consistent, credible content that turns what you know into trust.",
    points: [
      "30 posts per month, written around your services, your town and your customers",
      "Published daily to Instagram and Facebook after you approve them",
      "Reasonable revisions included at no additional charge",
      "Your branding, your style, your voice",
      "We manage and improve everything for you",
    ],
  },
  {
    icon: Calculator,
    title: "Quote Calculator or Quiz That Collects New Inquiries",
    lead: "A helpful tool built around your services. Visitors get personalized results and you get their details.",
    points: [
      "A custom quote calculator or quiz for your business",
      "Lives on a page we host for you, or on your website if you have one",
      "Visitors get results based on their answers",
      "Works on phones, tablets and computers",
      "Names, contact details and service needs are saved automatically",
      "Updates to keep it working as your services change",
    ],
  },
  {
    icon: MessageSquare,
    title: "Automatic Replies to Comments and Messages",
    lead: "When someone comments or asks a question, they get a helpful private message that starts the conversation.",
    points: [
      "Chosen comments get an immediate private reply",
      "Helpful responses keep the conversation going",
      "A few simple questions find out which service they need before you step in",
      "Contact details are saved automatically for follow-up",
      "Replies are written for the services you offer",
    ],
  },
  {
    icon: CalendarCheck,
    title: "Automatic Follow-Up and Appointment Booking",
    lead: "New inquiries get prompt replies, answers to common questions, and an invitation to book with you.",
    points: [
      "Follow-up starts automatically when someone contacts your business",
      "Answers common questions using information you approve",
      "Asks a few questions to work out which service they need",
      "Helps interested people book an appointment or estimate on your calendar",
      "Keeps contacts and conversations organized in your included CRM account",
      "Works nights, weekends and your busy season without extra staff",
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
        {SERVICES.map(({ icon: Icon, title, lead, points }) => (
          <article key={title} className="flex flex-col rounded-[28px] p-8 md:p-9" style={card}>
            <div className="flex items-center gap-4">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                style={{ background: "color-mix(in oklab, var(--gold) 16%, transparent)", color: "var(--gold)", border: "1px solid color-mix(in oklab, var(--gold) 34%, transparent)" }}
              >
                <Icon className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <p className="text-[var(--gold)] text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE }}>
                Included service
              </p>
            </div>
            <h3 className="mt-5 text-[var(--rose)] leading-tight" style={{ fontFamily: DISPLAY, fontSize: "1.75rem", fontWeight: 500 }}>
              {title}
            </h3>
            <p className="mt-3 text-[var(--ink)]/62 leading-7" style={{ fontFamily: BODY, fontSize: "0.95rem" }}>
              {lead}
            </p>
            <ul className="mt-5 grid gap-3">
              {points.map((p) => (
                <li key={p} className="flex gap-3 text-[var(--ink)]/78 leading-6" style={{ fontFamily: BODY, fontSize: "0.9rem" }}>
                  <CheckDot />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-14 max-w-3xl text-center">
        <p className="text-[var(--gold)] text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE }}>
          Ready when you are
        </p>
        <h3 className="mt-3 italic text-[var(--ink)]" style={{ fontFamily: DISPLAY, fontSize: "clamp(1.9rem, 4vw, 2.7rem)", lineHeight: 1.1 }}>
          Let us start building your social media and follow-up system
        </h3>
        <p className="mt-3 text-[var(--ink)]/62" style={{ fontFamily: BODY }}>
          Start for ${PRICE_SINGLE} per month with both launch bonuses, no long-term contract and a {GUARANTEE_DAYS}-day guarantee.
        </p>
        <a href="#plans" className="btn-ink mt-7">
          Start my order, ${PRICE_SINGLE}/mo
        </a>
        <p className="mt-4 text-[var(--ink)]/45 text-[10px] tracking-[0.16em] uppercase" style={{ fontFamily: LUXE }}>
          No contract · Cancel anytime · {GUARANTEE_DAYS}-day money-back guarantee
        </p>
      </div>
    </section>
  );
}

/* ─── Content styles ──────────────────────────────────── */
const STYLES = [
  { name: "Expert desk notes", desc: "Practical, handwritten-style advice from you, the person who knows.", sample: "The one thing I check before every job.", tone: "cream" },
  { name: "Photo caption stories", desc: "Casual photos with captions that tell a story and share something useful.", sample: "Why this customer came back three times.", tone: "blush" },
  { name: "Simple feed-style posts", desc: "Plain text posts that feel like a natural part of social media, not an ad.", sample: "Three questions to ask before you hire anyone.", tone: "ink" },
  { name: "Whiteboard lessons", desc: "Clear, teachable explanations that make your service easy to understand.", sample: "What actually goes into a fair quote.", tone: "cream" },
  { name: "Everyday object posts", desc: "Everyday objects used to explain your work in a way people remember.", sample: "What a coffee mug can teach you about maintenance.", tone: "blush" },
  { name: "Bold brand graphics", desc: "Bold headlines and eye-catching graphics that make people stop and read.", sample: "Booked out this week? Here is how.", tone: "ink" },
] as const;

const TONES: Record<string, { bg: string; fg: string; accent: string }> = {
  cream: { bg: "linear-gradient(160deg, #fffaf6 0%, #f7e9e3 100%)", fg: "var(--ink)", accent: "var(--rose)" },
  blush: { bg: "linear-gradient(160deg, #f4dcdc 0%, #f1d3cf 100%)", fg: "var(--ink)", accent: "var(--rose)" },
  ink: { bg: "linear-gradient(160deg, #2a1d1a 0%, #1a100e 100%)", fg: "var(--cream)", accent: "var(--gold)" },
};

export function LaunchExamples() {
  return (
    <section
      id="examples"
      className="scroll-mt-32 py-24 md:py-32 px-6"
      style={{ background: "linear-gradient(180deg, var(--blush) 0%, var(--cream) 100%)" }}
    >
      <SectionHead
        eyebrow="A few examples of what we can create"
        title="Content that looks like you, not everyone else"
        sub="These are example styles and sample ideas, not your only options and not finished posts. Save a favorite, or send us a post you love and we will create in a similar style with your own branding and message."
      />
      <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
        {STYLES.map((s) => {
          const t = TONES[s.tone];
          return (
            <article key={s.name} className="overflow-hidden rounded-[28px]" style={card}>
              <div
                className="flex aspect-square flex-col items-center justify-center p-8 text-center"
                style={{ background: t.bg }}
              >
                <span style={{ color: t.accent, fontSize: "0.8rem" }}>✦</span>
                <p className="mt-4 italic leading-tight" style={{ fontFamily: DISPLAY, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: t.fg }}>
                  {s.sample}
                </p>
                <span className="mt-5 h-px w-12" style={{ background: t.accent, opacity: 0.6 }} />
                <p className="mt-3 text-[9px] tracking-luxe uppercase" style={{ fontFamily: LUXE, color: t.accent }}>
                  Sample idea
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-[var(--ink)] uppercase" style={{ fontFamily: LUXE, fontSize: "0.85rem", letterSpacing: "0.12em", fontWeight: 600 }}>
                  {s.name}
                </h3>
                <p className="mt-2 text-[var(--ink)]/60 leading-6" style={{ fontFamily: BODY, fontSize: "0.88rem" }}>
                  {s.desc}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mx-auto mt-12 max-w-2xl rounded-[28px] p-8 text-center" style={card}>
        <p className="text-[var(--gold)] text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE }}>
          Your content, your direction
        </p>
        <h3 className="mt-3 italic text-[var(--ink)]" style={{ fontFamily: DISPLAY, fontSize: "1.9rem", lineHeight: 1.1 }}>
          Have another style in mind?
        </h3>
        <p className="mt-3 text-[var(--ink)]/62 leading-7" style={{ fontFamily: BODY, fontSize: "0.95rem" }}>
          Share a link or screenshot during setup. We can create posts in the style you like, with your own branding and message.
        </p>
        <a href="#plans" className="btn-ink mt-6">
          Get started, make it yours
        </a>
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
        <Eyebrow>Your plan. Everything handled.</Eyebrow>
        <h2 className="mt-4 leading-[0.98]" style={{ fontFamily: DISPLAY, fontWeight: 400, color: "var(--ink)", fontSize: "clamp(2.8rem, 7vw, 5.2rem)" }}>
          Choose your monthly package
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[var(--ink)]/62 leading-7" style={{ fontFamily: BODY }}>
          The same complete service in both plans. Choose the type of posts you prefer.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-7 md:grid-cols-2" data-stagger>
        {LAUNCH_PLANS.map((plan, i) => (
          <article
            key={plan.id}
            className="relative flex flex-col rounded-[30px] p-8 text-center"
            style={{
              ...card,
              border: i === 0 ? "1.5px solid var(--gold)" : card.border,
              boxShadow: i === 0 ? "0 36px 80px -38px rgba(160,110,60,0.55)" : card.boxShadow,
            }}
          >
            {i === 0 && (
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[9px] tracking-luxe uppercase text-[var(--cream)]"
                style={{ fontFamily: LUXE, background: "var(--ink)" }}
              >
                Best starting point
              </span>
            )}
            <h3 className="text-[var(--rose)]" style={{ fontFamily: DISPLAY, fontSize: "1.7rem", fontWeight: 500 }}>
              {plan.name}
            </h3>
            <p className="mt-4 text-[var(--ink)]" style={{ fontFamily: DISPLAY, fontSize: "4rem", lineHeight: 1 }}>
              ${plan.price}
              <span className="ml-1 text-[var(--ink)]/50" style={{ fontFamily: BODY, fontSize: "1rem" }}>/month</span>
            </p>
            <p className="mt-4 text-[var(--ink)] font-medium" style={{ fontFamily: BODY, fontSize: "0.98rem" }}>
              {plan.mix}
            </p>
            <p className="mt-1 text-[var(--ink)]/55" style={{ fontFamily: BODY, fontSize: "0.88rem" }}>
              {plan.blurb}
            </p>
            <a href={orderHref(plan.id)} className="btn-ink mt-7 justify-center">
              {plan.cta}
            </a>
          </article>
        ))}
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
            { tag: "Included bonus", title: "Your Dollhouse CRM account", copy: "Keep inquiries, messages, follow-up and appointments organized in one place." },
            { tag: "Included bonus", title: "Private 1-on-1 kickoff call", copy: "We talk through your services, ideal customers, favorite styles and setup questions." },
          ].map((b) => (
            <div key={b.title} className="rounded-2xl p-6 text-center" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)" }}>
              <p className="text-[var(--gold)] text-[9px] tracking-luxe uppercase" style={{ fontFamily: LUXE }}>{b.tag}</p>
              <h4 className="mt-2 italic text-[var(--rose)]" style={{ fontFamily: DISPLAY, fontSize: "1.45rem" }}>{b.title}</h4>
              <p className="mt-2 text-[var(--ink)]/60 leading-6" style={{ fontFamily: BODY, fontSize: "0.88rem" }}>{b.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl p-6 text-center" style={{ background: "color-mix(in oklab, var(--gold) 12%, transparent)", border: "1px solid color-mix(in oklab, var(--gold) 34%, transparent)" }}>
          <h4 className="italic text-[var(--ink)]" style={{ fontFamily: DISPLAY, fontSize: "1.6rem" }}>
            Your {GUARANTEE_DAYS}-day money-back guarantee
          </h4>
          <p className="mx-auto mt-2 max-w-xl text-[var(--ink)]/65 leading-7" style={{ fontFamily: BODY, fontSize: "0.92rem" }}>
            If you are not satisfied, contact us within your first {GUARANTEE_DAYS} days for a full refund. No long-term contract, and you can cancel anytime.
          </p>
        </div>
        <p className="mt-5 text-center text-[var(--ink)]/45 leading-6" style={{ fontFamily: BODY, fontSize: "0.78rem" }}>
          Your plan is billed monthly until canceled. Optional add-ons are only added with your approval. All prices in USD.
        </p>
      </div>
    </section>
  );
}

/* ─── After purchase ──────────────────────────────────── */
export function LaunchAfterPurchase() {
  const items = [
    { title: "Today", copy: "Complete your order and choose a time for your private kickoff call." },
    { title: "Immediate account access", copy: "Your CRM account is available right away. Finish your setup checklist after booking your call." },
    { title: "Your first posts", copy: `Review your first posts and your publishing plan within ${FIRST_POSTS_DAYS} days, with your setup details complete.` },
  ];
  return (
    <section id="after-purchase" className="py-24 md:py-28 px-6 bg-[var(--cream)]">
      <SectionHead eyebrow="What happens after purchase" title="From checkout to launch" />
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3" data-stagger>
        {items.map((it, i) => (
          <article key={it.title} className="rounded-[28px] p-8 text-center" style={card}>
            <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full text-[var(--gold)]" style={{ border: "1px solid color-mix(in oklab, var(--gold) 40%, transparent)", fontFamily: LUXE, fontSize: "0.8rem" }}>
              {i + 1}
            </span>
            <h3 className="mt-4 italic text-[var(--rose)]" style={{ fontFamily: DISPLAY, fontSize: "1.6rem" }}>{it.title}</h3>
            <p className="mt-3 text-[var(--ink)]/62 leading-7" style={{ fontFamily: BODY, fontSize: "0.92rem" }}>{it.copy}</p>
          </article>
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
          <div
            className="relative overflow-hidden"
            style={{ borderRadius: "30px", border: "2px solid color-mix(in oklab, var(--gold) 40%, transparent)", boxShadow: "0 20px 50px -15px rgba(160,110,95,0.35)", aspectRatio: "3/4" }}
          >
            <img src={mandyPhoto} alt="Mandy Fortune, founder of The Dollhouse Brand Studio" className="h-full w-full object-cover" style={{ objectPosition: "center top" }} />
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
            I have spent 11+ years in graphic and product design, building brands for companies, creators and entrepreneurs. My work has been recognized by{" "}
            <a href="https://www.buzzfeed.com/sarahrohoman/black-owned-stores-etsy-canada" target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-[var(--gold)]/50 underline-offset-4 hover:text-[var(--rose)]">BuzzFeed</a>{" "}
            and{" "}
            <a href="https://www.huffpost.com/entry/get-out-and-vote-merch-election-2020_l_5f344d83c5b6960c066fef03" target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-[var(--gold)]/50 underline-offset-4 hover:text-[var(--rose)]">HuffPost</a>.
          </p>
          <p className="mt-4 text-[var(--ink)]/75 leading-8" style={{ fontFamily: BODY }}>
            I built this because I kept seeing talented local business owners who were invisible online. Not because they were not good enough, but because they were too busy doing the work to show up consistently. This system exists so you do not have to choose.
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
    q: "Exactly what content is included each month?",
    a: "Every plan includes 30 posts a month, written around your services and published daily to Instagram and Facebook after you approve them. The Single-Image plan is 30 single-image posts. The Carousel plan is 15 carousel posts and 15 single-image posts.",
  },
  {
    q: "Can I choose carousel posts or add other platforms?",
    a: "Yes to carousels: that is the $497 plan. Both plans cover Instagram and Facebook. If you want another platform, tell us on your kickoff call and we will give you an honest answer about whether we can add it.",
  },
  {
    q: "Is paid advertising included?",
    a: "No. This system is built for organic growth, so there is no ad spend and nothing to manage on an ad account.",
  },
  {
    q: "How do revisions work?",
    a: "You approve everything before it goes live. If a post is not right, tell us what to change and we will update it. Reasonable revisions are included at no extra charge.",
  },
  {
    q: "Are there any additional software costs?",
    a: "Your Dollhouse CRM account is included in your plan. If something extra is ever needed, we will tell you first and only add it with your approval.",
  },
  {
    q: "What do you need from me, and how quickly can we launch?",
    a: `After you order, you book a private kickoff call and complete a short setup checklist. If you have a logo, brand colors and photos, send them. If not, we will work with what you have. Your first posts and publishing plan arrive within ${FIRST_POSTS_DAYS} days.`,
  },
  {
    q: "Who is this built for?",
    a: "Local business owners who serve customers in their area: contractors and trades, salons and spas, cleaners, clinics, fitness studios, realtors, restaurants and more. If people find you, call you or book you, this is for you.",
  },
  {
    q: "Does the AI give advice?",
    a: "No. It answers common questions using information you approve, asks a few simple questions to understand what the person needs, and hands the conversation to you for anything else. It does not give medical, legal or financial advice.",
  },
  {
    q: "Do I need to provide content?",
    a: "No. We write and design the posts. Photos, stories and real examples from your work make them even better, and nothing is published until you approve it.",
  },
  {
    q: "Do I need a website?",
    a: "No. We can host your quote calculator or quiz on a page for you, or add it to your website if you already have one.",
  },
  {
    q: "Does the follow-up follow messaging rules?",
    a: "Yes. Texts and emails only go to people who have asked to hear from you, and every message includes a way to opt out.",
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
      <div className="mx-auto mt-12 max-w-3xl grid gap-3">
        {FAQS.map((f) => (
          <details key={f.q} className="dh-faq rounded-2xl px-6 py-5" style={card}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[var(--ink)]" style={{ fontFamily: DISPLAY, fontSize: "1.25rem", fontWeight: 500 }}>
              {f.q}
              <ChevronDown className="dh-faq-chevron h-5 w-5 shrink-0 text-[var(--gold)]" />
            </summary>
            <p className="mt-3 text-[var(--ink)]/65 leading-7" style={{ fontFamily: BODY, fontSize: "0.95rem" }}>
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ─── Final CTA ───────────────────────────────────────── */
export function LaunchFinalCta() {
  return (
    <section className="py-20 px-6 text-center" style={{ background: "linear-gradient(135deg, #f4dcdc 0%, #f7e6dc 45%, #f1d3cf 100%)" }}>
      <h2 className="mx-auto max-w-3xl text-[var(--ink)]" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 1.08 }}>
        Ready to turn your social media into{" "}
        <span className="italic text-[var(--rose)]">booked customers?</span>
      </h2>
      <a href="#plans" className="btn-ink mt-8">
        Get Started Now
      </a>
      <p className="mt-4 text-[var(--ink)]/50 text-[10px] tracking-[0.16em] uppercase" style={{ fontFamily: LUXE }}>
        From ${PRICE_SINGLE}/mo · No contract · {GUARANTEE_DAYS}-day money-back guarantee
      </p>
    </section>
  );
}

/* ─── Mobile sticky order bar ─────────────────────────── */
export function LaunchStickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const plans = document.getElementById("plans");
      const pastHero = window.scrollY > 520;
      const inPlans = plans ? plans.getBoundingClientRect().top < window.innerHeight * 0.6 && plans.getBoundingClientRect().bottom > 0 : false;
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
        background: "color-mix(in oklab, var(--cream) 94%, transparent)",
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
        <a href="#plans" className="btn-ink !py-3 !px-5 !text-[10px] shrink-0">
          Get Started
        </a>
      </div>
    </div>
  );
}
