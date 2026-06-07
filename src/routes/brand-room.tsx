import { createFileRoute } from "@tanstack/react-router";
import archMark from "@/assets/arch-mark.svg";
import heroBg from "@/assets/password-bg.jpg";
import productImage from "@/assets/product-brand-kit.jpg";
import workbookImage from "@/assets/product-workbook.jpg";
import promptKitImage from "@/assets/product-ai-prompt-kit.jpg";
import { usePageMeta } from "@/lib/use-page-meta";

export const Route = createFileRoute("/brand-room")({ component: BrandRoomPage });

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";
const FONT_SCRIPT = "'Allura', cursive";

const CHECKOUT = {
  ai: "https://link.fastpaydirect.com/payment-link/6a22a43471a0aa761e46326a",
  workbook: "https://link.fastpaydirect.com/payment-link/6a22a3fe03b17c94f5714ba9",
  brandKit: "https://link.fastpaydirect.com/payment-link/6a22a22903b17c94f5714ba7",
  suite: "https://link.fastpaydirect.com/payment-link/6a23413403b17c94f5714d42",
};

// Soft "Learn more" links route to the full sales pages (more detail +
// embedded checkout). Hard "Get the..." buttons go straight to checkout.
const SALES_PAGES = {
  ai: "/brand-room/ai-prompt-kit",
  workbook: "/brand-room/workbook",
  brandKit: "/brand-room/brand-kit",
};

const products = [
  {
    number: "01",
    name: "Brand Kit Blueprint",
    price: "$97 USD",
    regular: "$145",
    label: "Build the visual brand",
    tagline: "For the woman who needs her brand to look like it means business.",
    body: "Your colours, fonts, and visual identity — decided, locked in, done. Interactive web app. Access forever.",
    bullets: ["Colour palette built for your brand", "Font pairings chosen and explained", "Visual identity direction locked in", "Access forever, no expiry"],
    href: SALES_PAGES.brandKit,
    image: productImage,
    imageAlt: "The Dollhouse Brand Kit Blueprint shown across desktop and tablet",
  },
  {
    number: "02",
    name: "Brand Workbook",
    price: "$47 USD",
    regular: "$261",
    label: "Clarify the business",
    tagline: "For the woman who needs to get clear on what she's actually building.",
    body: "Your offer, audience, messaging, and content plan — all figured out in one sitting. Bonus PDF included.",
    bullets: ["Niche and audience clarity", "Offer and pricing direction", "Brand messaging in plain English", "Content plan built in", "Bonus PDF version included"],
    href: SALES_PAGES.workbook,
    image: workbookImage,
    imageAlt: "The Dollhouse Brand Workbook shown across digital devices",
  },
  {
    number: "03",
    name: "AI Prompt Kit",
    price: "$17 USD",
    regular: "$37",
    label: "Create the content",
    tagline: "For the woman who knows what to post but can't find the words.",
    body: "200+ prompts across 8 brand rooms — written for women building brands online. No more blank captions.",
    bullets: ["200+ prompts organised by content type", "Social posts, emails, DMs, brand story", "Built for the Dollhouse content pillars", "Works with any AI tool", "Start using it today"],
    href: SALES_PAGES.ai,
    image: promptKitImage,
    imageAlt: "The Dollhouse AI Prompt Kit and content prompt library",
  },
];

const faq = [
  ["Do I get instant access?", "Yes. The moment you purchase, your access link and password arrive in your inbox. It takes less than 5 minutes to get started."],
  ["Are these apps or PDFs?", "The Brand Kit and Workbook are interactive web apps — you fill them out right in your browser, no downloads needed. The AI Prompt Kit is a digital file you can start using immediately."],
  ["What if I buy one now and want the others later?", "No problem. Each tool is sold separately so you can come back for the next one when you're ready."],
  ["Do you offer refunds?", "All sales are final. These are digital products with instant access — please review everything before purchasing. If you have a question before buying, use the chat on this page."],
  ["I'm not tech-savvy. Will I be able to use these?", "Yes. Everything is built for women who are just starting out. If you can use Instagram, you can use the Brand Room."],
];

const quickFacts = [
  { key: "instant", title: "Instant access", body: "The moment you purchase, your link and password arrive in your inbox. Takes less than 5 minutes to get started." },
  { key: "desktop", title: "Built for laptop & desktop", body: "These are interactive web apps you fill out right in your browser on a laptop or desktop — no downloads, no PDFs to print." },
  { key: "easy", title: "No experience needed", body: "If you can fill out a form online, you can use the Brand Room. Built for women who are just starting out." },
];

/* ─── Brand atoms (matching the main site) ─────────────── */
function Eyebrow({ children, gold = false }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <p
      style={{
        fontFamily: FONT_LUXE,
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: gold ? "var(--gold)" : "var(--rose)",
      }}
    >
      {children}
    </p>
  );
}

function Divider() {
  return (
    <div className="my-5 flex items-center justify-center gap-2" style={{ color: "var(--gold)" }}>
      <span className="h-px w-16 bg-current opacity-50" />
      <svg viewBox="0 0 12 10" className="h-2.5 w-2.5 fill-current">
        <path d="M6 9 L0.5 3.5 a2.2 2.2 0 0 1 3.1 -3.1 L6 2.8 l2.4 -2.4 a2.2 2.2 0 0 1 3.1 3.1 Z" />
      </svg>
      <span className="h-px w-16 bg-current opacity-50" />
    </div>
  );
}

function CheckIcon({ color = "var(--gold)" }: { color?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
      <path d="M3 8.5 6.2 11.5 13 4.5" />
    </svg>
  );
}

function CrossIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" className="mt-0.5 shrink-0">
      <path d="M4 4 12 12 M12 4 4 12" />
    </svg>
  );
}

function FactIcon({ name }: { name: string }) {
  const common = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "var(--gold)", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "instant") return <svg {...common}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></svg>;
  if (name === "desktop") return <svg {...common}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>;
  return <svg {...common}><path d="M12 3l2.5 5.2 5.7.8-4.1 4 1 5.7L12 21.2 6.9 18.7l1-5.7-4.1-4 5.7-.8L12 3Z" /></svg>;
}

function Price({ value }: { value: string }) {
  const [amount, currency] = value.split(" ");
  return (
    <>
      {amount}
      {currency && (
        <span style={{ fontFamily: FONT_LUXE, fontSize: "0.3em", fontStyle: "normal", fontWeight: 600, letterSpacing: "0.14em", marginLeft: "0.4rem", verticalAlign: "baseline" }}>
          {currency}
        </span>
      )}
    </>
  );
}

function Button({ href, children, rose = false, ghost = false }: { href: string; children: React.ReactNode; rose?: boolean; ghost?: boolean }) {
  if (ghost) {
    return (
      <a href={href} className="btn-ghost">
        {children}
      </a>
    );
  }
  return (
    <a
      href={href}
      className="inline-flex min-h-12 items-center justify-center rounded-full px-9 py-4 text-center transition-opacity hover:opacity-90"
      style={{
        background: rose ? "var(--rose)" : "var(--ink)",
        color: "var(--cream)",
        fontFamily: FONT_LUXE,
        fontSize: "0.72rem",
        fontWeight: 600,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </a>
  );
}

function BrandRoomPage() {
  usePageMeta(
    "The Dollhouse Brand Room | The Dollhouse Brand Studio",
    "Three digital tools for women building brands online: AI Prompt Kit, Brand Workbook, Brand Kit Blueprint, and the full Brand Room Suite.",
  );

  return (
    <main className="min-h-screen overflow-x-hidden text-[var(--ink)]" style={{ background: "var(--cream)" }}>
      {/* Mobile sticky CTA */}
      <a href="#pricing" className="fixed inset-x-0 top-0 z-50 block px-4 py-3 text-center md:hidden" style={{ background: "var(--ink)", color: "var(--cream)", fontFamily: FONT_LUXE, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
        Starting at $17 — Enter the Brand Room
      </a>

      {/* ── HERO ─────────────────────────────────────────── */}
      <header
        className="relative flex items-center justify-center overflow-hidden px-5 pb-14 pt-28 text-center"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div aria-hidden className="absolute inset-0" style={{ background: "rgba(247,228,223,0.34)" }} />
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(230,200,195,0.45) 70%, rgba(210,175,168,0.7) 100%)" }} />

        <div className="relative z-10 mx-auto w-full max-w-[680px]">
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ width: "min(120%, 780px)", height: "108%", background: "radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.65) 42%, rgba(255,255,255,0.18) 66%, rgba(255,255,255,0) 86%)", filter: "blur(32px)" }}
          />

          <div className="inline-flex items-center gap-2 rounded-full border px-5 py-2" style={{ borderColor: "rgba(200,168,100,0.55)", background: "rgba(255,255,255,0.4)", backdropFilter: "blur(8px)", color: "var(--gold)" }}>
            <span style={{ fontSize: "0.55rem" }}>✦</span>
            <span style={{ fontFamily: FONT_LUXE, fontSize: "10px", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase" }}>The Private Suite For Building Your Brand</span>
            <span style={{ fontSize: "0.55rem" }}>✦</span>
          </div>

          <div className="mt-9 flex justify-center" style={{ color: "var(--gold)" }}>
            <img src={archMark} alt="" className="h-10 w-7" />
          </div>

          <p className="mt-2 leading-none" style={{ fontFamily: FONT_SCRIPT, fontStyle: "italic", color: "var(--gold)", fontSize: "clamp(2.3rem, 5vw, 3.2rem)", textTransform: "lowercase" }}>
            the
          </p>
          <h1 className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: "var(--rose)", fontSize: "clamp(3rem, 8vw, 5.2rem)", lineHeight: 0.95, letterSpacing: "0.04em" }}>
            BRAND ROOM
          </h1>
          <p className="mt-4" style={{ fontFamily: FONT_LUXE, fontSize: "14px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--gold)" }}>
            by the dollhouse
          </p>

          <Divider />

          <h2 className="mx-auto mt-2 max-w-xl" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, fontStyle: "italic", color: "var(--rose)", fontSize: "clamp(1.7rem, 3.6vw, 2.6rem)", lineHeight: 1.2 }}>
            Everything you need to build a brand that actually makes money.
          </h2>

          <p className="mx-auto mt-4 max-w-lg" style={{ fontFamily: FONT_BODY, color: "rgba(29,15,11,0.66)", fontSize: "clamp(0.95rem, 1.8vw, 1.08rem)", lineHeight: 1.7 }}>
            Three tools. One place. Built for women who are done guessing and ready to build something real.
          </p>

          <div className="mx-auto mt-8 flex max-w-md items-stretch justify-center rounded-2xl px-3 py-4" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(10px)", border: "1px solid rgba(200,168,100,0.25)" }}>
            {[["3", "Guided tools"], ["$17", "Starting point"], ["Instant", "Private access"]].map(([n, l], i) => (
              <div key={l} className="flex-1 px-3" style={i > 0 ? { borderLeft: "1px solid rgba(200,168,100,0.3)" } : undefined}>
                <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.7rem", lineHeight: 1, color: "var(--rose)" }}>{n}</p>
                <p className="mt-1.5" style={{ fontFamily: FONT_LUXE, fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)" }}>{l}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-col items-center gap-4">
            <Button href="#pricing">Enter the Brand Room — From $17</Button>
            <a href="#inside" className="btn-ghost">See what's inside ↓</a>
          </div>
        </div>
      </header>

      {/* ── MARQUEE BAR ──────────────────────────────────── */}
      <section className="px-6 py-4 text-center" style={{ background: "var(--rose)", color: "var(--cream)" }}>
        <p style={{ fontFamily: FONT_LUXE, fontSize: "0.74rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" }}>
          Instant digital access
          <span className="mx-3" style={{ color: "var(--gold)" }}>✦</span>
          Built for beginners
          <span className="mx-3" style={{ color: "var(--gold)" }}>✦</span>
          Yours forever — no subscription
        </p>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 py-20 md:py-28" style={{ background: "linear-gradient(180deg, var(--cream) 0%, #f8e9e5 58%, #f6ded8 100%)" }}>
        <div aria-hidden className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-[var(--rose)]/10 blur-3xl" />
        <div aria-hidden className="absolute -right-24 bottom-8 h-80 w-80 rounded-full bg-[var(--gold)]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <Eyebrow gold>Why this exists</Eyebrow>
            <h2 className="mt-4" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: "var(--rose)", fontSize: "clamp(2.25rem, 5vw, 4rem)", lineHeight: 1.02 }}>
              You are not confused. You are missing the order.
            </h2>
            <p className="mt-5 max-w-xl" style={{ fontFamily: FONT_BODY, color: "rgba(29,15,11,0.7)", fontSize: "1rem", lineHeight: 1.75 }}>
              You have the idea. You know you want to build something. But when it is time to choose the name, offer, visuals, content, and launch plan, everything starts feeling tangled.
            </p>
            <div className="mt-7 rounded-[28px] border border-[var(--gold)]/25 bg-white/55 p-6 shadow-[0_24px_70px_-52px_rgba(90,45,35,0.5)]">
              <p className="italic" style={{ fontFamily: FONT_DISPLAY, color: "var(--rose)", fontSize: "clamp(1.55rem, 3vw, 2.15rem)", lineHeight: 1.18 }}>
                "What do I name it? What do I post? What do I even sell?"
              </p>
              <p className="mt-4" style={{ fontFamily: FONT_BODY, color: "rgba(29,15,11,0.62)", fontSize: "0.94rem", lineHeight: 1.65 }}>
                That is not a motivation problem. It is a missing blueprint problem.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {[
              ["01", "Too many saved posts", "You keep collecting advice, but nothing turns into a finished brand."],
              ["02", "No clear starting point", "Every decision depends on another decision, so you keep circling."],
              ["03", "Content feels random", "You are trying to post before your offer, message, and direction are clear."],
              ["04", "The brand never feels done", "The visuals, voice, products, and launch plan are not living in one place."],
            ].map(([number, title, copy]) => (
              <article key={title} className="group grid gap-4 rounded-[22px] border border-[var(--gold)]/25 bg-white/48 p-5 shadow-[0_18px_55px_-48px_rgba(90,45,35,0.55)] transition-colors hover:bg-white/68 sm:grid-cols-[auto_1fr]">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--cream)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", fontStyle: "italic" }}>{number}</span>
                <div>
                  <h3 style={{ fontFamily: FONT_DISPLAY, color: "var(--ink)", fontSize: "1.45rem", lineHeight: 1.1 }}>{title}</h3>
                  <p className="mt-2" style={{ fontFamily: FONT_BODY, color: "rgba(29,15,11,0.62)", fontSize: "0.9rem", lineHeight: 1.6 }}>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl rounded-[30px] border border-[var(--gold)]/25 bg-[var(--ink)] p-6 text-center shadow-[0_28px_80px_-54px_rgba(29,15,11,0.75)] md:p-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 md:flex-row md:justify-between md:text-left">
            <div>
              <p style={{ fontFamily: FONT_LUXE, color: "var(--gold)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>The fix</p>
              <p className="mt-2 text-[var(--cream)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.65rem, 4vw, 2.45rem)", lineHeight: 1.08 }}>
                A guided room that tells you what to decide first, next, and after that.
              </p>
            </div>
            <a href="#inside" className="shrink-0 rounded-full bg-[var(--rose)] px-7 py-4 text-[var(--cream)] transition-all hover:-translate-y-0.5 hover:opacity-90" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              See the tools <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT IS THE BRAND ROOM ───────────────────────── */}
      <section className="px-6 py-20 md:py-28" style={{ background: "var(--cream)" }}>
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <div className="md:order-2">
            <img src={productImage} alt="The Dollhouse Brand Room workspace preview" loading="lazy" className="aspect-[3/2] w-full rounded-3xl object-cover" style={{ border: "1px solid rgba(200,168,100,0.3)", boxShadow: "0 28px 70px -44px rgba(90,45,35,0.55)" }} />
          </div>
          <div className="md:order-1">
            <Eyebrow gold>What is the Brand Room?</Eyebrow>
            <h2 className="mt-4" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: "var(--rose)", fontSize: "clamp(2.2rem, 4vw, 3rem)", lineHeight: 1.08 }}>
              Your brand. Built from scratch. All in one place.
            </h2>
            <p className="mt-5" style={{ fontFamily: FONT_BODY, color: "rgba(29,15,11,0.7)", fontSize: "16px", lineHeight: 1.75 }}>
              The Brand Room is a private digital suite with three interactive tools — each one designed to take you from "I don't know where to start" to "my brand is done and I'm ready to sell."
            </p>
            <p className="mt-4" style={{ fontFamily: FONT_BODY, color: "rgba(29,15,11,0.7)", fontSize: "16px", lineHeight: 1.75 }}>
              No fluff. No filler. Just the decisions that actually matter, made simple.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE (feature contrast) ─────────────── */}
      <section id="inside" className="px-6 py-20 md:py-28" style={{ background: "var(--ink)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Eyebrow gold>What's Inside</Eyebrow>
            <h2 className="mt-4" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: "var(--cream)", fontSize: "clamp(2.2rem, 4vw, 3rem)", lineHeight: 1.08 }}>
              Three tools. One clear path.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.7, color: "rgba(253,246,240,0.62)" }}>
              Start where you are today, or choose the complete suite and move from business idea to polished brand to ready-to-publish content.
            </p>
            <Divider />
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.name} className="flex flex-col overflow-hidden rounded-[26px] border border-[var(--gold)]/30 bg-[var(--cream)] text-[var(--ink)] shadow-[0_30px_70px_-50px_rgba(0,0,0,0.9)] sm:flex-row lg:flex-col">
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[var(--blush)] sm:aspect-auto sm:min-h-64 sm:w-[42%] lg:aspect-[4/3] lg:min-h-0 lg:w-full">
                  <img src={product.image} alt={product.imageAlt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.025]" />
                  <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-[var(--ink)]/82 text-[var(--cream)] backdrop-blur-sm" style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", fontStyle: "italic" }}>
                    {product.number}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 flex-col p-5 md:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p style={{ fontFamily: FONT_LUXE, fontSize: "0.61rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>
                      {product.label}
                    </p>
                    <p className="flex items-baseline gap-2" style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", color: "var(--rose)" }}>
                      <span>{product.price}</span>
                      {product.regular && <span className="line-through" style={{ color: "rgba(29,15,11,0.3)", fontWeight: 500 }}>{product.regular}</span>}
                    </p>
                  </div>
                  <h3 className="mt-4" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.65rem, 3vw, 2rem)", lineHeight: 1.05, color: "var(--ink)" }}>{product.name}</h3>
                  <p className="mt-3 italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.12rem", lineHeight: 1.35, color: "var(--rose)" }}>{product.tagline}</p>
                  <p className="mt-4" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", lineHeight: 1.65, color: "rgba(29,15,11,0.63)" }}>{product.body}</p>
                  <ul className="mt-5 space-y-2.5">
                    {product.bullets.slice(0, 3).map((bullet) => (
                      <li key={bullet} className="flex gap-2.5" style={{ fontFamily: FONT_BODY, fontSize: "0.84rem", lineHeight: 1.45, color: "rgba(29,15,11,0.72)" }}>
                        <CheckIcon />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={product.href} className="mt-6 flex min-h-12 w-full items-center justify-center rounded-full border border-[var(--ink)] px-5 py-3 text-center transition-colors hover:bg-[var(--ink)] hover:text-[var(--cream)] lg:mt-auto" style={{ fontFamily: FONT_LUXE, fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase" }}>
                    See {product.name} <span className="ml-2" aria-hidden>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 grid overflow-hidden rounded-[26px] border border-[var(--gold)]/35 bg-[#170c08] shadow-[0_30px_80px_-52px_rgba(0,0,0,0.9)] md:grid-cols-[1.35fr_0.65fr]">
            <div className="p-7 md:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[var(--rose)] px-4 py-2 text-[var(--cream)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  Best Value
                </span>
                <span style={{ fontFamily: FONT_LUXE, fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)" }}>Save $34</span>
              </div>
              <h3 className="mt-5 text-[var(--cream)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.15rem, 5vw, 3.35rem)", fontWeight: 400, lineHeight: 1 }}>
                Get the complete Brand Room.
              </h3>
              <p className="mt-4 max-w-2xl" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(253,246,240,0.67)" }}>
                Build the business foundation, create the visual identity, then turn both into content. All three tools work together, and you keep access forever.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Brand Workbook", "Brand Kit Blueprint", "AI Prompt Kit"].map((item) => (
                  <span key={item} className="rounded-full border border-[var(--gold)]/28 px-4 py-2" style={{ fontFamily: FONT_BODY, fontSize: "0.76rem", color: "rgba(253,246,240,0.72)" }}>{item}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center border-t border-[var(--gold)]/20 bg-white/[0.035] p-7 md:border-l md:border-t-0 md:p-10">
              <p className="line-through" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: "rgba(253,246,240,0.35)" }}>$161 USD</p>
              <p className="mt-1 text-[var(--gold)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "3.5rem", lineHeight: 1 }}>$127 <span style={{ fontFamily: FONT_LUXE, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em" }}>USD</span></p>
              <a href={CHECKOUT.suite} target="_blank" rel="noopener noreferrer" className="mt-5 flex min-h-12 items-center justify-center rounded-full bg-[var(--rose)] px-6 py-4 text-center text-[var(--cream)] transition-all hover:-translate-y-0.5 hover:opacity-90" style={{ fontFamily: FONT_LUXE, fontSize: "0.67rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Get the Full Suite <span className="ml-2" aria-hidden>→</span>
              </a>
              <a href="#pricing" className="mt-4 text-center text-[var(--cream)]/55 underline underline-offset-4" style={{ fontFamily: FONT_BODY, fontSize: "0.76rem" }}>
                Compare every option
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── THIS IS FOR YOU IF ───────────────────────────── */}
      <section className="relative overflow-hidden px-6 py-20 md:py-28" style={{ background: "linear-gradient(180deg, var(--cream) 0%, #f8e7e2 100%)" }}>
        <div aria-hidden className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-[var(--rose)]/10 blur-3xl" />
        <div aria-hidden className="absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-[var(--gold)]/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <Eyebrow gold>Is this you?</Eyebrow>
            <h2 className="mt-4" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: "var(--rose)", fontSize: "clamp(2.2rem, 4vw, 3rem)", lineHeight: 1.08 }}>
              The Brand Room is your starting point if...
            </h2>
            <Divider />
            <p className="mx-auto mt-4 max-w-2xl" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.75, color: "rgba(29,15,11,0.62)" }}>
              You have the idea, the taste, and the ambition. What you need now is structure: one place to clarify the brand, shape the offer, and know what to create next.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[30px] p-5 md:p-6" style={{ background: "rgba(255,250,246,0.78)", border: "1px solid rgba(200,168,100,0.32)", boxShadow: "0 28px 80px -60px rgba(90,45,35,0.55)" }}>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Brand new", "You are starting your business and need a clear first step."],
                  ["Stuck in planning", "You have been saving ideas for months, but nothing feels finished."],
                  ["Random content", "You know you should post, but you do not have a message system."],
                  ["Ready to build", "You want a polished brand without hiring a full design team yet."],
                ].map(([title, body]) => (
                  <article key={title} className="rounded-[22px] border border-[var(--gold)]/22 bg-white/58 p-5">
                    <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--gold)]/10 text-[var(--gold)]">
                      <CheckIcon />
                    </span>
                    <h3 style={{ fontFamily: FONT_DISPLAY, color: "var(--ink)", fontSize: "1.45rem", fontWeight: 500, lineHeight: 1 }}>{title}</h3>
                    <p className="mt-2" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", lineHeight: 1.6, color: "rgba(29,15,11,0.62)" }}>{body}</p>
                  </article>
                ))}
              </div>

              <div className="mt-4 rounded-[24px] border border-[var(--rose)]/22 bg-[var(--blush)]/55 p-5 text-center">
                <p style={{ fontFamily: FONT_DISPLAY, color: "var(--rose)", fontSize: "1.55rem", fontStyle: "italic", lineHeight: 1.15 }}>
                  Best for the person who wants guidance, but still wants to build her own foundation.
                </p>
              </div>
            </div>

            <aside className="grid gap-5">
              <div className="overflow-hidden rounded-[30px] border border-[var(--gold)]/26 bg-white/62 p-3 shadow-[0_28px_80px_-62px_rgba(90,45,35,0.55)]">
                <img src={productImage} alt="The Dollhouse Brand Room preview" loading="lazy" className="aspect-[4/3] w-full rounded-[24px] object-cover" style={{ objectPosition: "center", filter: "saturate(0.9) contrast(1.02)" }} />
              </div>

              <div className="rounded-[30px] p-7" style={{ background: "var(--ink)", color: "var(--cream)", boxShadow: "0 28px 80px -58px rgba(0,0,0,0.8)" }}>
                <Eyebrow gold>Choose another path if:</Eyebrow>
                {[
                  "You want someone to do everything for you right now",
                  "You are not ready to make decisions about your brand",
                  "You already need done-for-you marketing management",
                ].map((item) => (
                  <p key={item} className="mt-4 flex gap-3" style={{ fontFamily: FONT_BODY, fontSize: "0.96rem", lineHeight: 1.55, color: "rgba(253,246,240,0.78)" }}><CrossIcon color="var(--rose)" />{item}</p>
                ))}
                <a href="/services" className="mt-6 inline-flex rounded-full border border-[var(--gold)]/35 px-5 py-3 text-center transition-all hover:-translate-y-0.5 hover:bg-white/10" style={{ fontFamily: FONT_LUXE, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "var(--cream)" }}>
                  Explore done-for-you services →
                </a>
              </div>
            </aside>
          </div>

          <div className="mx-auto mt-8 max-w-3xl rounded-[28px] border border-[var(--gold)]/25 bg-white/55 p-6 text-center shadow-[0_24px_70px_-58px_rgba(90,45,35,0.55)]">
            <p style={{ fontFamily: FONT_LUXE, color: "var(--gold)", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>Still not sure?</p>
            <p className="mt-2" style={{ fontFamily: FONT_DISPLAY, color: "var(--rose)", fontSize: "clamp(1.8rem, 4vw, 2.45rem)", fontWeight: 400, lineHeight: 1.05 }}>
              Take the quiz and get matched to the right first step.
            </p>
            <a href="/quiz" className="mt-5 inline-flex rounded-full bg-[var(--ink)] px-7 py-3.5 text-[var(--cream)] transition-all hover:-translate-y-0.5" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Take the free quiz →
            </a>
          </div>
            </div>
      </section>

      {/* ── QUIZ DECISION ───────────────────────────────── */}
      <section id="pricing" className="relative overflow-hidden px-6 py-20 md:py-28" style={{ background: "linear-gradient(180deg, var(--blush) 0%, #fff8f3 52%, var(--cream) 100%)" }}>
        <div aria-hidden className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[var(--rose)]/10 blur-3xl" />
        <div aria-hidden className="absolute -right-20 bottom-16 h-72 w-72 rounded-full bg-[var(--gold)]/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <div className="grid overflow-hidden rounded-[34px] border border-[var(--gold)]/28 bg-white/58 shadow-[0_28px_80px_-56px_rgba(90,45,35,0.55)] lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[320px] overflow-hidden bg-[var(--blush)] lg:min-h-full">
              <img src={productImage} alt="The Dollhouse Brand Room quiz and product match preview" loading="lazy" className="h-full min-h-[320px] w-full object-cover opacity-90" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/55 via-transparent to-white/10" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[24px] border border-white/35 bg-white/76 p-5 backdrop-blur-md">
                <p style={{ fontFamily: FONT_LUXE, color: "var(--gold)", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>Instant match</p>
                <p className="mt-2" style={{ fontFamily: FONT_DISPLAY, color: "var(--rose)", fontSize: "1.65rem", lineHeight: 1.08 }}>Quiz → Plan → Product</p>
              </div>
            </div>

            <div className="p-7 md:p-10 lg:p-12">
              <Eyebrow gold>Not sure where to start?</Eyebrow>
              <h2 className="mt-4" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: "var(--rose)", fontSize: "clamp(2.45rem, 5vw, 4.2rem)", lineHeight: 1.02 }}>
                Take the free Brand Quiz.
              </h2>
              <p className="mt-5 max-w-2xl" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.75, color: "rgba(29,15,11,0.66)" }}>
                Answer a few simple questions and get matched with the first tool your brand needs: clarity, visuals, content prompts, or the complete suite.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  ["Brand type", "See what stage you are really in."],
                  ["3 mistakes", "Spot what is keeping you stuck."],
                  ["7-day fix plan", "Know what to do first this week."],
                  ["Next best offer", "Get matched to the right tool."],
                ].map(([title, copy]) => (
                  <div key={title} className="rounded-[20px] border border-[var(--gold)]/25 bg-[var(--cream)]/70 p-4">
                    <p style={{ fontFamily: FONT_DISPLAY, color: "var(--ink)", fontSize: "1.25rem", lineHeight: 1.1 }}>{title}</p>
                    <p className="mt-2" style={{ fontFamily: FONT_BODY, color: "rgba(29,15,11,0.55)", fontSize: "0.8rem", lineHeight: 1.55 }}>{copy}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/quiz" rose>Take the Free Quiz →</Button>
                <p style={{ fontFamily: FONT_LUXE, color: "rgba(29,15,11,0.42)", fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>Less than 60 seconds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK FACTS ──────────────────────────────────── */}
      <section className="px-6 py-20 md:py-28" style={{ background: "var(--cream)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Eyebrow gold>Before you buy</Eyebrow>
            <h2 className="mt-4" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: "var(--rose)", fontSize: "clamp(2rem, 4vw, 2.8rem)", lineHeight: 1.1 }}>
              Everything you need to know.
            </h2>
            <Divider />
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {quickFacts.map((fact) => (
              <article key={fact.key} className="rounded-3xl p-8 text-center" style={{ background: "var(--cream)", border: "1px solid rgba(200,168,100,0.3)" }}>
                <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "rgba(200,168,100,0.12)", border: "1px solid rgba(200,168,100,0.28)" }}>
                  <FactIcon name={fact.key} />
                </span>
                <h3 className="mt-4" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.6rem", color: "var(--ink)" }}>{fact.title}</h3>
                <p className="mt-3" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.65, color: "rgba(29,15,11,0.65)" }}>{fact.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="px-6 py-20 md:py-28" style={{ background: "linear-gradient(180deg, var(--cream) 0%, var(--blush) 100%)" }}>
        <div className="mx-auto max-w-[700px]">
          <div className="text-center">
            <Eyebrow gold>Questions</Eyebrow>
            <h2 className="mt-4" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: "var(--rose)", fontSize: "clamp(2.2rem, 4vw, 3rem)" }}>Good to know.</h2>
            <Divider />
          </div>
          <div className="mt-6 space-y-3">
            <style>{`.dh-faq-chevron{transition:transform .3s ease}.dh-faq[open] .dh-faq-chevron{transform:rotate(180deg)}`}</style>
            {faq.map(([question, answer]) => (
              <details key={question} className="dh-faq rounded-2xl p-5" style={{ background: "var(--cream)", border: "1px solid rgba(200,168,100,0.28)" }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "var(--ink)" }}>
                  <span>{question}</span>
                  <svg className="dh-faq-chevron shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                </summary>
                <p className="mt-3" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.65, color: "rgba(29,15,11,0.65)" }}>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────── */}
      <section className="px-6 py-24 text-center" style={{ background: "linear-gradient(135deg, #f4dcdc 0%, #f7e6dc 45%, #f1d3cf 100%)" }}>
        <div className="mx-auto max-w-2xl">
          <div className="flex justify-center" style={{ color: "var(--gold)" }}>
            <img src={archMark} alt="" className="h-9 w-6" />
          </div>
          <p className="mt-2 leading-none" style={{ fontFamily: FONT_SCRIPT, fontStyle: "italic", color: "var(--gold)", fontSize: "clamp(2rem, 4vw, 2.6rem)", textTransform: "lowercase" }}>ready to grow?</p>
          <h2 className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: "var(--rose)", fontSize: "clamp(2.4rem, 6vw, 3.4rem)", lineHeight: 1.05 }}>
            Build something real.
          </h2>
          <p className="mx-auto mt-5 max-w-lg" style={{ fontFamily: FONT_BODY, fontSize: "17px", lineHeight: 1.7, color: "rgba(29,15,11,0.65)" }}>
            Once your foundation is set — or if you already have a business — The Dollhouse becomes your full marketing team. Done-for-you content, ads, websites, and lead follow-up that bring you booked clients.
          </p>
          <div className="mt-8">
            <Button href="/">Explore Our Marketing Services →</Button>
          </div>
          <p className="mt-5" style={{ fontFamily: FONT_LUXE, fontSize: "0.66rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(29,15,11,0.5)" }}>
            Managed content · Ads · Websites · Lead follow-up
          </p>
        </div>
      </section>
    </main>
  );
}
