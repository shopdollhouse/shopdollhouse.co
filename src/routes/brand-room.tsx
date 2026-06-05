import { createFileRoute } from "@tanstack/react-router";
import archMark from "@/assets/arch-mark.svg";
import heroBg from "@/assets/password-bg.jpg";
import productImage from "@/assets/product-brand-kit.jpg";
import { usePageMeta } from "@/lib/use-page-meta";

export const Route = createFileRoute("/brand-room")({ component: BrandRoomPage });

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";
const FONT_SCRIPT = "'Allura', cursive";

const CHECKOUT = {
  ai: "/checkout/ai-prompt-kit",
  workbook: "/checkout/brand-workbook",
  brandKit: "/checkout/brand-kit",
  suite: "/checkout/brand-room-suite",
};

const products = [
  {
    name: "Brand Kit Blueprint",
    price: "$97 USD",
    regular: "$145",
    tagline: "For the woman who needs her brand to look like it means business.",
    body: "Your colours, fonts, and visual identity — decided, locked in, done. Interactive web app. Access forever.",
    bullets: ["Colour palette built for your brand", "Font pairings chosen and explained", "Visual identity direction locked in", "Access forever, no expiry"],
    href: "/brand-room/brand-kit",
  },
  {
    name: "Brand Workbook",
    price: "$47 USD",
    regular: "$261",
    tagline: "For the woman who needs to get clear on what she's actually building.",
    body: "Your offer, audience, messaging, and content plan — all figured out in one sitting. Bonus PDF included.",
    bullets: ["Niche and audience clarity", "Offer and pricing direction", "Brand messaging in plain English", "Content plan built in", "Bonus PDF version included"],
    href: "/brand-room/brand-workbook",
  },
  {
    name: "AI Prompt Kit",
    price: "$17 USD",
    regular: "$37",
    tagline: "For the woman who knows what to post but can't find the words.",
    body: "200+ prompts across 8 brand rooms — written for women building brands online. No more blank captions.",
    bullets: ["200+ prompts organised by content type", "Social posts, emails, DMs, brand story", "Built for the Dollhouse content pillars", "Works with any AI tool", "Start using it today"],
    href: "/brand-room/ai-prompt-kit",
  },
];

const pricing = [
  { name: "AI Prompt Kit", price: "$17 USD", regular: "$37", label: "Best place to start", line: "200+ prompts for content that converts", href: CHECKOUT.ai, button: "Get the Prompt Kit" },
  { name: "Brand Workbook", price: "$47 USD", regular: "$261", label: "", line: "Clarity on your offer, audience & message", href: CHECKOUT.workbook, button: "Get the Workbook" },
  { name: "Brand Kit Blueprint", price: "$97 USD", regular: "$145", label: "", line: "Your full visual identity, built from scratch", href: CHECKOUT.brandKit, button: "Get the Brand Kit" },
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
  { key: "mobile", title: "Built for mobile", body: "These are interactive web apps. Open them on your phone, tablet, or laptop — no downloads, no PDFs to print." },
  { key: "easy", title: "No experience needed", body: "If you can use your phone, you can use the Brand Room. Built for women who are just starting out." },
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
  if (name === "mobile") return <svg {...common}><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>;
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
        className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-5 pb-24 pt-32 text-center"
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

          <div className="mt-9 flex flex-col items-center gap-4">
            <Button href="#pricing">Enter the Brand Room — From $17</Button>
            <a href="#inside" className="btn-ghost">See what's inside ↓</a>
          </div>
        </div>
      </header>

      {/* ── MARQUEE BAR ──────────────────────────────────── */}
      <section className="px-6 py-4 text-center" style={{ background: "var(--rose)", color: "var(--cream)" }}>
        <p style={{ fontFamily: FONT_LUXE, fontSize: "0.74rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" }}>
          200+ women building their brand
          <span className="mx-3" style={{ color: "var(--gold)" }}>✦</span>
          Instant digital access
          <span className="mx-3" style={{ color: "var(--gold)" }}>✦</span>
          As seen on BuzzFeed
        </p>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────── */}
      <section className="px-6 py-20 md:py-28" style={{ background: "linear-gradient(180deg, var(--cream) 0%, #f8e9e5 100%)" }}>
        <div className="mx-auto max-w-[620px] text-center" style={{ color: "rgba(29,15,11,0.78)", fontFamily: FONT_BODY, fontSize: "18px", lineHeight: 1.75 }}>
          <p className="mb-6">You have the idea. You know you want to build something.</p>
          <p className="mb-6">But every time you sit down to work on it — you freeze.</p>
          <p className="mb-6 italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: "var(--rose)" }}>"What do I name it? What do I post? What do I even sell?"</p>
          <p className="mb-6">You've been Googling for months. Saving posts you never go back to. Starting things you never finish.</p>
          <p className="mb-6">It's not because you're not ready.</p>
          <p className="mb-8">It's because nobody gave you a clear starting point.</p>
          <Divider />
          <p className="mt-2 italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.9rem", color: "var(--rose)" }}>That's what the Brand Room is for.</p>
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
              The Strategy Suite
            </h2>
            <Divider />
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {products.map((product) => (
              <article key={product.name} className="rounded-3xl p-8" style={{ border: "1px solid rgba(200,168,100,0.28)", background: "rgba(255,255,255,0.03)" }}>
                <p className="flex items-baseline gap-2" style={{ fontFamily: FONT_LUXE, fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", color: "var(--gold)" }}>
                  <span>{product.price}</span>
                  {product.regular && <span className="line-through" style={{ color: "rgba(253,246,240,0.4)", fontWeight: 500 }}>{product.regular}</span>}
                </p>
                <h3 className="mt-4" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.9rem", lineHeight: 1.1, color: "var(--cream)" }}>{product.name}</h3>
                <p className="mt-3 italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.2rem", lineHeight: 1.3, color: "var(--rose)" }}>{product.tagline}</p>
                <p className="mt-4" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem", lineHeight: 1.65, color: "rgba(253,246,240,0.74)" }}>{product.body}</p>
                <ul className="mt-5 space-y-2.5">
                  {product.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", lineHeight: 1.5, color: "rgba(253,246,240,0.8)" }}>
                      <CheckIcon />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <a href={product.href} className="mt-6 inline-block underline underline-offset-4" style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)" }}>
                  Learn more →
                </a>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="#pricing" rose>Choose My Tool</Button>
          </div>
        </div>
      </section>

      {/* ── THIS IS FOR YOU IF ───────────────────────────── */}
      <section className="px-6 py-20 md:py-28" style={{ background: "linear-gradient(180deg, var(--cream) 0%, #f8e7e2 100%)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Eyebrow gold>Is this you?</Eyebrow>
            <h2 className="mt-4" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: "var(--rose)", fontSize: "clamp(2.2rem, 4vw, 3rem)", lineHeight: 1.08 }}>
              This is for you if...
            </h2>
            <Divider />
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl p-8" style={{ background: "var(--cream)", border: "1px solid rgba(200,168,100,0.3)" }}>
              <Eyebrow>Yes, if:</Eyebrow>
              {["You're starting your business and have no idea where to begin", "You've been working on your brand for months with nothing to show for it", "Your content feels random and you don't know what to post", "You want a professional brand without hiring a designer", "You're ready to stop planning and start building"].map((item) => (
                <p key={item} className="mt-4 flex gap-3" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.55, color: "rgba(29,15,11,0.74)" }}><CheckIcon />{item}</p>
              ))}
            </div>
            <div className="rounded-3xl p-8" style={{ background: "var(--ink)", color: "var(--cream)" }}>
              <Eyebrow gold>Not for you if:</Eyebrow>
              {["You want someone to do everything for you", "You're not ready to show up and do the work", "You're looking for done-for-you marketing management"].map((item) => (
                <p key={item} className="mt-4 flex gap-3" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.55, color: "rgba(253,246,240,0.8)" }}><CrossIcon color="var(--rose)" />{item}</p>
              ))}
              <a href="/services" className="mt-6 inline-block italic underline underline-offset-4" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: "var(--cream)" }}>
                Looking for done-for-you? See our agency plans →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────── */}
      <section id="pricing" className="px-6 py-20 md:py-28" style={{ background: "linear-gradient(180deg, var(--blush) 0%, var(--cream) 100%)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Eyebrow gold>The Investment</Eyebrow>
            <h2 className="mt-4" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: "var(--rose)", fontSize: "clamp(2.4rem, 5vw, 3.4rem)", lineHeight: 1.05 }}>
              Start with one. Own them all.
            </h2>
            <Divider />
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {pricing.map((item) => (
              <article key={item.name} className="rounded-3xl p-7" style={{ background: "var(--cream)", border: "1px solid rgba(200,168,100,0.3)", boxShadow: "0 22px 60px -48px rgba(90,45,35,0.4)" }}>
                {item.label && <p style={{ fontFamily: FONT_LUXE, fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)" }}>{item.label}</p>}
                <h3 className="mt-3" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.7rem", lineHeight: 1.1, color: "var(--ink)" }}>{item.name}</h3>
                <div className="mt-5 flex items-baseline gap-2.5">
                  <p style={{ fontFamily: FONT_DISPLAY, fontSize: "2.7rem", lineHeight: 1, color: "var(--rose)" }}><Price value={item.price} /></p>
                  {item.regular && <span className="line-through" style={{ fontFamily: FONT_BODY, fontSize: "1.05rem", color: "rgba(29,15,11,0.4)" }}>{item.regular}</span>}
                </div>
                <p className="mt-4 min-h-[52px]" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.6, color: "rgba(29,15,11,0.65)" }}>{item.line}</p>
                <a href={item.href} className="mt-6 flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-center transition-opacity hover:opacity-90" style={{ border: "1px solid var(--ink)", color: "var(--ink)", fontFamily: FONT_LUXE, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  {item.button}
                </a>
              </article>
            ))}
            <article className="relative rounded-3xl p-7" style={{ background: "var(--ink)", color: "var(--cream)", boxShadow: "0 26px 70px -44px rgba(29,15,11,0.75)" }}>
              <span className="inline-block rounded-full px-4 py-1" style={{ background: "var(--rose)", color: "var(--cream)", fontFamily: FONT_LUXE, fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" }}>Best Value</span>
              <h3 className="mt-5" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.9rem", lineHeight: 1.05 }}>The Full Suite</h3>
              <p className="mt-4 line-through" style={{ fontFamily: FONT_BODY, color: "rgba(253,246,240,0.45)" }}>$161</p>
              <p className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontSize: "3rem", lineHeight: 1, color: "var(--gold)" }}><Price value="$127 USD" /></p>
              <p className="mt-2" style={{ fontFamily: FONT_LUXE, fontSize: "0.74rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--rose)" }}>Save $34</p>
              <p className="mt-4 min-h-[52px]" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.6, color: "rgba(253,246,240,0.74)" }}>All three tools. Everything you need.</p>
              <a href={CHECKOUT.suite} className="mt-6 flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-center transition-opacity hover:opacity-90" style={{ background: "var(--rose)", color: "var(--cream)", fontFamily: FONT_LUXE, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Get Everything — $127
              </a>
            </article>
          </div>
          <div className="mx-auto mt-10 max-w-2xl rounded-3xl p-8 text-center" style={{ background: "var(--cream)", border: "1px solid rgba(200,168,100,0.3)" }}>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "2rem", color: "var(--rose)" }}>Not sure where to start?</h3>
            <p className="mx-auto mt-3 max-w-lg" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.6, color: "rgba(29,15,11,0.65)" }}>Take the free Brand Quiz — 4 questions and you'll know exactly which tool your brand needs first.</p>
            <div className="mt-6">
              <Button href="/quiz" rose>Take the Free Quiz →</Button>
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
            {faq.map(([question, answer]) => (
              <details key={question} className="rounded-2xl p-5" style={{ background: "var(--cream)", border: "1px solid rgba(200,168,100,0.28)" }}>
                <summary className="cursor-pointer list-none" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "var(--ink)" }}>{question}</summary>
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
          <p className="mt-2 leading-none" style={{ fontFamily: FONT_SCRIPT, fontStyle: "italic", color: "var(--gold)", fontSize: "clamp(2rem, 4vw, 2.6rem)", textTransform: "lowercase" }}>ready?</p>
          <h2 className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: "var(--rose)", fontSize: "clamp(2.4rem, 6vw, 3.4rem)", lineHeight: 1.05 }}>
            Build something real.
          </h2>
          <p className="mx-auto mt-5 max-w-lg" style={{ fontFamily: FONT_BODY, fontSize: "17px", lineHeight: 1.7, color: "rgba(29,15,11,0.65)" }}>
            Join the women who are done guessing. Your brand starts today.
          </p>
          <div className="mt-8">
            <Button href="#pricing">Enter the Brand Room</Button>
          </div>
          <p className="mt-5" style={{ fontFamily: FONT_LUXE, fontSize: "0.66rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(29,15,11,0.5)" }}>
            Starting at $17 · Instant access · No experience needed
          </p>
        </div>
      </section>
    </main>
  );
}
