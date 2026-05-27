import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import bgImage from "@/assets/password-bg.jpg";
import roseAccent from "@/assets/rose-accent.png";
import archMark from "@/assets/arch-mark.svg";

export const Route = createFileRoute("/starter-kit")({ component: StarterKitPage });

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_SCRIPT = "'Allura', cursive";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";

/* ─── Nav ─────────────────────────────────────────────── */
function Nav() {
  return (
    <nav className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-6 md:px-12 py-6">
      <Link to="/" className="flex flex-col items-start leading-tight no-underline">
        <span
          className="text-[var(--ink)]/55 font-normal not-italic"
          style={{ fontFamily: FONT_SCRIPT, fontSize: "18px", letterSpacing: "1px", textTransform: "lowercase" }}
        >
          the
        </span>
        <span
          className="text-[var(--ink)] italic"
          style={{ fontFamily: FONT_DISPLAY, fontSize: "15px", letterSpacing: "4px", textTransform: "uppercase" }}
        >
          Dollhouse
        </span>
        <span
          className="text-[var(--gold)] not-italic font-semibold"
          style={{ fontFamily: FONT_LUXE, fontSize: "6.5px", letterSpacing: "3px", textTransform: "uppercase", marginTop: "1px" }}
        >
          Brand Studio
        </span>
      </Link>
      <div
        className="hidden md:flex items-center gap-9 text-[10px] tracking-luxe uppercase text-[var(--ink)]/75"
        style={{ fontFamily: FONT_LUXE }}
      >
        <Link to="/" hash="services" className="hover:text-[var(--rose)] transition">Services</Link>
        <Link to="/" hash="pricing" className="hover:text-[var(--rose)] transition">Pricing</Link>
        <Link to="/starter-kit" className="text-[var(--rose)]">Starter Kit</Link>
        <Link to="/" hash="faq" className="hover:text-[var(--rose)] transition">FAQ</Link>
        <Link to="/" hash="contact" className="hover:text-[var(--rose)] transition">Contact</Link>
      </div>
      <Link
        to="/"
        hash="contact"
        className="rounded-full bg-[var(--ink)] text-[var(--cream)] text-[10px] tracking-luxe uppercase px-5 py-2.5 hover:opacity-90 transition"
        style={{ fontFamily: FONT_LUXE }}
      >
        Book a Call
      </Link>
    </nav>
  );
}

/* ─── Hero ────────────────────────────────────────────── */
function Hero() {
  return (
    <header
      className="relative min-h-[80vh] flex items-center justify-center px-4 pt-32 pb-20"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[var(--cream)]/60" />
      <img
        src={roseAccent}
        alt=""
        loading="lazy"
        className="absolute -bottom-10 -left-10 w-72 opacity-30 pointer-events-none"
      />
      <div className="relative z-10 max-w-3xl text-center">
        <p
          className="text-[var(--gold)] text-[11px] tracking-luxe uppercase"
          style={{ fontFamily: FONT_LUXE }}
        >
          One-Time · Done-With-You
        </p>
        <h1
          className="mt-5 text-[var(--ink)] leading-[0.95]"
          style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(3rem, 8vw, 6rem)" }}
        >
          The{" "}
          <span className="italic text-[var(--rose)]" style={{ fontFamily: FONT_SCRIPT, textTransform: "lowercase" }}>
            Starter
          </span>{" "}
          Kit
        </h1>
        <p
          className="mt-6 text-[var(--ink)]/70 max-w-xl mx-auto leading-relaxed"
          style={{ fontFamily: FONT_BODY, fontSize: "1.05rem" }}
        >
          Brand Kit, AI Prompt Kit, and Brand Workbook — everything you need to
          launch a polished, on-brand business in a single weekend.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#checkout"
            className="rounded-full bg-[var(--ink)] text-[var(--cream)] text-[11px] tracking-luxe uppercase px-8 py-4 hover:opacity-90 transition"
            style={{ fontFamily: FONT_LUXE }}
          >
            Get the Kit — $297
          </a>
          <a
            href="#whats-inside"
            className="rounded-full border border-[var(--ink)]/30 text-[var(--ink)] text-[11px] tracking-luxe uppercase px-8 py-4 hover:bg-[var(--ink)] hover:text-[var(--cream)] transition"
            style={{ fontFamily: FONT_LUXE }}
          >
            What's Inside
          </a>
        </div>
      </div>
    </header>
  );
}

/* ─── What's Inside ───────────────────────────────────── */
const PIECES = [
  {
    name: "The Brand Kit",
    tagline: "Logo, palette, type & a 30-page guide",
    detail:
      "A complete visual identity system — primary & secondary logos, color tokens, typography pairings, and a print-ready brand guidelines PDF.",
  },
  {
    name: "The AI Prompt Kit",
    tagline: "200+ on-brand prompts for ChatGPT",
    detail:
      "Captions, hooks, emails, ad copy, sales pages, and product descriptions — every prompt pre-tuned to your tone, audience, and offer.",
  },
  {
    name: "The Brand Workbook",
    tagline: "Find your voice in one weekend",
    detail:
      "A guided 40-page workbook that walks you through positioning, audience, voice, offers, and your first 30 days of content.",
  },
];

function WhatsInside() {
  return (
    <section id="whats-inside" className="py-24 md:py-32 px-6 bg-[var(--cream)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[var(--gold)] text-[11px] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE }}>
            What's Inside
          </p>
          <h2
            className="mt-3 text-[var(--ink)]"
            style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.25rem, 4vw, 3.5rem)" }}
          >
            Three pieces.{" "}
            <span className="italic text-[var(--rose)]" style={{ fontFamily: FONT_SCRIPT, textTransform: "lowercase" }}>
              One foundation.
            </span>
          </h2>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {PIECES.map((p, i) => (
            <div
              key={p.name}
              className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white p-8 shadow-[0_25px_50px_-25px_rgba(180,120,120,0.25)]"
            >
              <div
                className="w-10 h-10 rounded-full bg-[var(--rose)]/15 text-[var(--rose)] flex items-center justify-center"
                style={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3
                className="mt-6 text-[var(--ink)]"
                style={{ fontFamily: FONT_DISPLAY, fontSize: "1.75rem" }}
              >
                {p.name}
              </h3>
              <p
                className="mt-1 text-[var(--rose)] italic"
                style={{ fontFamily: FONT_SCRIPT, fontSize: "1.05rem", textTransform: "lowercase" }}
              >
                {p.tagline}
              </p>
              <p
                className="mt-5 text-[var(--ink)]/70 leading-relaxed text-sm"
                style={{ fontFamily: FONT_BODY }}
              >
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Includes Checklist ──────────────────────────────── */
const INCLUDES = [
  "Primary, secondary & submark logo files (SVG, PNG)",
  "Complete color system with hex, RGB & CMYK",
  "Typography pairings & usage rules",
  "30-page brand guidelines PDF",
  "200+ ChatGPT prompts across 8 categories",
  "Caption, hook & email frameworks",
  "40-page brand workbook (PDF + Notion)",
  "30-day content starter calendar",
  "Lifetime access & free updates",
  "Private community of founders",
];

function Includes() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto rounded-3xl bg-[var(--ink)] text-[var(--cream)] p-12 md:p-16 relative overflow-hidden">
        <img src={archMark} alt="" className="absolute -right-12 -bottom-12 w-72 opacity-10" />
        <p className="text-[var(--gold)] text-[11px] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE }}>
          Everything You Get
        </p>
        <h2
          className="mt-3"
          style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
        >
          A complete brand,{" "}
          <span className="italic text-[var(--rose)]" style={{ fontFamily: FONT_SCRIPT, textTransform: "lowercase" }}>
            delivered today.
          </span>
        </h2>
        <ul className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-3 relative z-10">
          {INCLUDES.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-[var(--cream)]/85 text-sm"
              style={{ fontFamily: FONT_BODY }}
            >
              <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-[var(--gold)] flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── Pricing ─────────────────────────────────────────── */
function Pricing() {
  return (
    <section id="checkout" className="py-24 md:py-32 px-6 bg-[var(--cream)]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[var(--gold)] text-[11px] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE }}>
          One-Time Investment
        </p>
        <h2
          className="mt-3 text-[var(--ink)]"
          style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.25rem, 4vw, 3.5rem)" }}
        >
          Get the{" "}
          <span className="italic text-[var(--rose)]" style={{ fontFamily: FONT_SCRIPT, textTransform: "lowercase" }}>
            Starter Kit
          </span>
        </h2>
        <div className="mt-12 rounded-3xl bg-white border border-[var(--rose)]/20 p-10 md:p-14 shadow-[0_30px_60px_-25px_rgba(180,120,120,0.35)]">
          <div className="flex items-baseline justify-center gap-2">
            <span
              className="text-[var(--ink)]"
              style={{ fontFamily: FONT_DISPLAY, fontSize: "4.5rem", lineHeight: 1 }}
            >
              $297
            </span>
            <span className="text-[var(--ink)]/50 line-through" style={{ fontFamily: FONT_BODY }}>
              $497
            </span>
          </div>
          <p
            className="mt-2 text-[var(--ink)]/60 text-sm"
            style={{ fontFamily: FONT_BODY }}
          >
            One-time payment · Lifetime access · 14-day guarantee
          </p>
          <a
            href="mailto:hello@shopdollhouse.co?subject=Starter%20Kit"
            className="mt-8 inline-block rounded-full bg-[var(--ink)] text-[var(--cream)] text-[11px] tracking-luxe uppercase px-10 py-4 hover:opacity-90 transition"
            style={{ fontFamily: FONT_LUXE }}
          >
            Get Instant Access →
          </a>
          <p
            className="mt-6 text-[var(--ink)]/50 text-xs"
            style={{ fontFamily: FONT_BODY }}
          >
            Want it done for you instead?{" "}
            <Link to="/" hash="pricing" className="underline hover:text-[var(--rose)]">
              See our retainers
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─────────────────────────────────────────────── */
const FAQS = [
  {
    q: "Who is the Starter Kit for?",
    a: "Founders, creators, and small business owners who want a polished brand and a content engine without hiring an agency.",
  },
  {
    q: "How is this delivered?",
    a: "Instantly. After checkout you'll receive an email with access to your Brand Kit files, Prompt Kit, and Workbook (PDF + Notion).",
  },
  {
    q: "Do I need design experience?",
    a: "Nope. Everything is templated and editable in Canva. The workbook walks you through every decision step by step.",
  },
  {
    q: "Can I upgrade to a done-for-you retainer later?",
    a: "Yes — your Starter Kit investment is credited toward your first month on any monthly plan.",
  },
];

function FAQ() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <p className="text-[var(--gold)] text-[11px] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE }}>
            Questions
          </p>
          <h2
            className="mt-3 text-[var(--ink)]"
            style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
          >
            Good to know
          </h2>
        </div>
        <div className="mt-12 space-y-3">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl bg-white/70 border border-white px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary
                className="cursor-pointer list-none flex items-center justify-between text-[var(--ink)]"
                style={{ fontFamily: FONT_DISPLAY, fontSize: "1.25rem" }}
              >
                {f.q}
                <span className="text-[var(--rose)] text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p
                className="mt-3 text-[var(--ink)]/70 leading-relaxed text-sm"
                style={{ fontFamily: FONT_BODY }}
              >
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Newsletter / Footer CTA ─────────────────────────── */
function FooterCTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="py-24 px-6 bg-[var(--cream)]">
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="text-[var(--ink)]"
          style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
        >
          Not ready yet?{" "}
          <span className="italic text-[var(--rose)]" style={{ fontFamily: FONT_SCRIPT, textTransform: "lowercase" }}>
            Stay close.
          </span>
        </h2>
        <p
          className="mt-4 text-[var(--ink)]/65"
          style={{ fontFamily: FONT_BODY }}
        >
          Get a weekly note with brand tips, prompts, and behind-the-scenes from the studio.
        </p>
        {done ? (
          <p className="mt-8 text-[var(--rose)] italic" style={{ fontFamily: FONT_SCRIPT, fontSize: "1.4rem", textTransform: "lowercase" }}>
            You're on the list ♡
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-full bg-white border border-[var(--ink)]/15 px-5 py-3 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--rose)]"
              style={{ fontFamily: FONT_BODY }}
            />
            <button
              type="submit"
              className="rounded-full bg-[var(--ink)] text-[var(--cream)] text-[11px] tracking-luxe uppercase px-6 py-3 hover:opacity-90 transition"
              style={{ fontFamily: FONT_LUXE }}
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function StarterKitPage() {
  return (
    <main className="bg-[var(--cream)] text-[var(--ink)]">
      <Nav />
      <Hero />
      <WhatsInside />
      <Includes />
      <Pricing />
      <FAQ />
      <FooterCTA />
    </main>
  );
}