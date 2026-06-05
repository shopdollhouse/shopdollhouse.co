import { createFileRoute } from "@tanstack/react-router";
import archMark from "@/assets/arch-mark.svg";
import roseAccent from "@/assets/rose-accent.png";
import productImage from "@/assets/product-brand-kit.jpg";
import { usePageMeta } from "@/lib/use-page-meta";

export const Route = createFileRoute("/brand-room")({ component: BrandRoomPage });

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";

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
    tagline: "For the woman who needs her brand to look like it means business.",
    body: "Your colours, fonts, and visual identity — decided, locked in, done. Interactive web app. Access forever.",
    bullets: ["Colour palette built for your brand", "Font pairings chosen and explained", "Visual identity direction locked in", "Access forever, no expiry"],
    href: "/brand-room/brand-kit",
  },
  {
    name: "Brand Workbook",
    price: "$47 USD",
    tagline: "For the woman who needs to get clear on what she's actually building.",
    body: "Your offer, audience, messaging, and content plan — all figured out in one sitting. Bonus PDF included.",
    bullets: ["Niche and audience clarity", "Offer and pricing direction", "Brand messaging in plain English", "Content plan built in", "Bonus PDF version included"],
    href: "/brand-room/brand-workbook",
  },
  {
    name: "AI Prompt Kit",
    price: "$17 USD",
    tagline: "For the woman who knows what to post but can't find the words.",
    body: "200+ prompts across 8 brand rooms — written for women building brands online. No more blank captions.",
    bullets: ["200+ prompts organised by content type", "Social posts, emails, DMs, brand story", "Built for the Dollhouse content pillars", "Works with any AI tool", "Start using it today"],
    href: "/brand-room/ai-prompt-kit",
  },
];

const pricing = [
  { name: "AI Prompt Kit", price: "$17 USD", label: "Best place to start", line: "200+ prompts for content that converts", href: CHECKOUT.ai, button: "Get the Prompt Kit" },
  { name: "Brand Workbook", price: "$47 USD", label: "", line: "Clarity on your offer, audience & message", href: CHECKOUT.workbook, button: "Get the Workbook" },
  { name: "Brand Kit Blueprint", price: "$97 USD", label: "", line: "Your full visual identity, built from scratch", href: CHECKOUT.brandKit, button: "Get the Brand Kit" },
];

const faq = [
  ["Do I get instant access?", "Yes. The moment you purchase, your access link and password arrive in your inbox. It takes less than 5 minutes to get started."],
  ["Are these apps or PDFs?", "The Brand Kit and Workbook are interactive web apps — you fill them out right in your browser, no downloads needed. The AI Prompt Kit is a digital file you can start using immediately."],
  ["What if I buy one now and want the others later?", "No problem. Each tool is sold separately so you can come back for the next one when you're ready."],
  ["Do you offer refunds?", "All sales are final. These are digital products with instant access — please review everything before purchasing. If you have a question before buying, use the chat on this page."],
  ["I'm not tech-savvy. Will I be able to use these?", "Yes. Everything is built for women who are just starting out. If you can use Instagram, you can use the Brand Room."],
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={light ? "text-[var(--rose)]" : "text-[var(--rose)]"}
      style={{ fontFamily: FONT_LUXE, fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" }}
    >
      {children}
    </p>
  );
}

function Button({ href, children, rose = false }: { href: string; children: React.ReactNode; rose?: boolean }) {
  return (
    <a
      href={href}
      className="inline-flex min-h-12 items-center justify-center rounded-full px-8 py-4 text-center transition-opacity hover:opacity-90"
      style={{
        background: rose ? "var(--rose)" : "var(--ink)",
        color: "white",
        fontFamily: FONT_BODY,
        fontSize: "1rem",
        fontWeight: 600,
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
    <main className="min-h-screen overflow-x-hidden bg-[#f9f0ef] text-[var(--ink)]">
      <a href="#pricing" className="fixed inset-x-0 top-0 z-50 block bg-[var(--ink)] px-4 py-3 text-center text-sm font-medium text-white md:hidden" style={{ fontFamily: FONT_BODY }}>
        Starting at $17 — Enter the Brand Room
      </a>

      <section className="relative overflow-hidden px-6 py-16 pt-24 text-center md:py-24" style={{ background: "#f9f0ef" }}>
        <img src={roseAccent} alt="" className="pointer-events-none absolute -right-12 top-14 w-48 opacity-10 md:w-72" />
        <img src={archMark} alt="" className="pointer-events-none absolute right-6 top-10 w-24 opacity-10 md:w-36" />
        <div className="mx-auto max-w-3xl">
          <Eyebrow>THE PRIVATE SUITE FOR WOMEN BUILDING THEIR BRAND</Eyebrow>
          <h1 className="mx-auto mt-6 max-w-3xl text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(38px, 7vw, 52px)", lineHeight: 1.02, fontWeight: 500 }}>
            Everything you need to build a brand that actually makes money.
          </h1>
          <p className="mx-auto mt-6 max-w-[540px] text-[var(--ink)]/65" style={{ fontFamily: FONT_BODY, fontSize: "17px", lineHeight: 1.7 }}>
            Three tools. One place. Built for women who are done guessing and ready to build something real.
          </p>
          <div className="mt-8">
            <Button href="#pricing">Enter the Brand Room — Starting at $17</Button>
          </div>
          <a href="#inside" className="mt-5 inline-block text-[var(--rose)] underline underline-offset-4" style={{ fontFamily: FONT_BODY, fontSize: "0.92rem" }}>
            See what's inside ↓
          </a>
        </div>
      </section>

      <section className="bg-[var(--rose)] px-6 py-4 text-center text-white">
        <p style={{ fontFamily: FONT_BODY, fontSize: "0.86rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          200+ women building their brand 🎀 Instant digital access 🎀 As seen on BuzzFeed
        </p>
      </section>

      <section className="px-6 py-16 md:py-24" style={{ background: "#faf6f1" }}>
        <div className="mx-auto max-w-[600px] text-[var(--ink)]/78" style={{ fontFamily: FONT_BODY, fontSize: "18px", lineHeight: 1.75 }}>
          <p className="mb-6">You have the idea. You know you want to build something.</p>
          <p className="mb-6">But every time you sit down to work on it — you freeze.</p>
          <p className="mb-6 italic">"What do I name it? What do I post? What do I even sell?"</p>
          <p className="mb-6">You've been Googling for months. Saving posts you never go back to. Starting things you never finish.</p>
          <p className="mb-6">It's not because you're not ready.</p>
          <p className="mb-8">It's because nobody gave you a clear starting point.</p>
          <p className="text-[var(--rose)] italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "24px" }}>That's what the Brand Room is for.</p>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24" style={{ background: "#f9f0ef" }}>
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div className="md:order-2">
            <img src={productImage} alt="The Dollhouse Brand Room workspace preview" loading="lazy" className="aspect-[3/2] w-full rounded-2xl object-cover shadow-[0_28px_70px_-48px_rgba(90,45,35,0.62)]" />
          </div>
          <div className="md:order-1">
            <Eyebrow>WHAT IS THE BRAND ROOM?</Eyebrow>
            <h2 className="mt-4 text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "40px", lineHeight: 1.05, fontWeight: 500 }}>
              Your brand. Built from scratch. All in one place.
            </h2>
            <p className="mt-5 text-[var(--ink)]/68" style={{ fontFamily: FONT_BODY, fontSize: "16px", lineHeight: 1.75 }}>
              The Brand Room is a private digital suite with three interactive tools — each one designed to take you from "I don't know where to start" to "my brand is done and I'm ready to sell."
            </p>
            <p className="mt-4 text-[var(--ink)]/68" style={{ fontFamily: FONT_BODY, fontSize: "16px", lineHeight: 1.75 }}>
              No fluff. No filler. Just the decisions that actually matter, made simple.
            </p>
          </div>
        </div>
      </section>

      <section id="inside" className="px-6 py-16 md:py-24" style={{ background: "#1a1a1a" }}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Eyebrow light>WHAT'S INSIDE</Eyebrow>
            <h2 className="mt-4 text-white" style={{ fontFamily: FONT_DISPLAY, fontSize: "40px", lineHeight: 1.05, fontWeight: 500 }}>
              The Strategy Suite
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {products.map((product) => (
              <article key={product.name} className="rounded-2xl border border-white/10 p-8 text-white">
                <p className="text-[var(--rose)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.8rem", fontWeight: 700 }}>{product.price}</p>
                <h3 className="mt-4" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.8rem", lineHeight: 1.1 }}>{product.name}</h3>
                <p className="mt-3 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem", fontStyle: "italic", lineHeight: 1.25 }}>{product.tagline}</p>
                <p className="mt-4 text-white/72" style={{ fontFamily: FONT_BODY, fontSize: "0.96rem", lineHeight: 1.65 }}>{product.body}</p>
                <ul className="mt-5 space-y-2">
                  {product.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-white/78" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", lineHeight: 1.5 }}>
                      <span className="text-[var(--rose)]">✓</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <a href={product.href} className="mt-6 inline-block text-[var(--rose)] underline underline-offset-4" style={{ fontFamily: FONT_BODY, fontWeight: 700 }}>
                  Learn more →
                </a>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="#pricing" rose>Choose my tool</Button>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24" style={{ background: "#f9f0ef" }}>
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "40px", lineHeight: 1.05, fontWeight: 500 }}>
            This is for you if...
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl p-8" style={{ background: "#faf6f1" }}>
              <Eyebrow>YES, IF:</Eyebrow>
              {["You're starting your business and have no idea where to begin", "You've been working on your brand for months with nothing to show for it", "Your content feels random and you don't know what to post", "You want a professional brand without hiring a designer", "You're ready to stop planning and start building"].map((item) => (
                <p key={item} className="mt-4 flex gap-3 text-[var(--ink)]/72" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.55 }}><span className="text-[var(--rose)]">✓</span>{item}</p>
              ))}
            </div>
            <div className="rounded-2xl bg-[var(--ink)] p-8 text-white">
              <Eyebrow>NOT FOR YOU IF:</Eyebrow>
              {["You want someone to do everything for you", "You're not ready to show up and do the work", "You're looking for done-for-you marketing management"].map((item) => (
                <p key={item} className="mt-4 flex gap-3 text-white/78" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.55 }}><span>✗</span>{item}</p>
              ))}
              <a href="/services" className="mt-6 inline-block text-sm italic text-white underline underline-offset-4" style={{ fontFamily: FONT_BODY }}>
                Looking for done-for-you? See our agency plans →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="px-6 py-16 md:py-24" style={{ background: "#faf6f1" }}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Eyebrow>THE INVESTMENT</Eyebrow>
            <h2 className="mt-4 text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "44px", lineHeight: 1.05, fontWeight: 500 }}>
              Start with one. Own them all.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {pricing.map((item) => (
              <article key={item.name} className="rounded-2xl bg-white p-7" style={{ border: "1px solid rgba(29,15,11,0.1)" }}>
                {item.label && <p className="text-[var(--rose)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>{item.label}</p>}
                <h3 className="mt-3 text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.7rem", lineHeight: 1.1 }}>{item.name}</h3>
                <p className="mt-5 text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "2.7rem", lineHeight: 1 }}>{item.price}</p>
                <p className="mt-4 min-h-[52px] text-[var(--ink)]/65" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.6 }}>{item.line}</p>
                <a href={item.href} className="mt-6 flex min-h-12 items-center justify-center rounded-full border border-[var(--ink)] px-5 py-3 text-center text-[var(--ink)]" style={{ fontFamily: FONT_BODY, fontWeight: 700 }}>
                  {item.button}
                </a>
              </article>
            ))}
            <article className="relative rounded-2xl bg-[var(--ink)] p-7 text-white" style={{ boxShadow: "0 26px 70px -44px rgba(29,15,11,0.75)" }}>
              <span className="rounded-full bg-[var(--rose)] px-4 py-1 text-white" style={{ fontFamily: FONT_LUXE, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em" }}>BEST VALUE</span>
              <h3 className="mt-5" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.9rem", lineHeight: 1.05 }}>The Full Suite</h3>
              <p className="mt-4 text-white/45 line-through" style={{ fontFamily: FONT_BODY }}>$161</p>
              <p className="mt-1 text-white" style={{ fontFamily: FONT_DISPLAY, fontSize: "3rem", lineHeight: 1 }}>$127 USD</p>
              <p className="mt-2 text-[var(--rose)]" style={{ fontFamily: FONT_BODY, fontWeight: 700 }}>Save $34</p>
              <p className="mt-4 min-h-[52px] text-white/72" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.6 }}>All three tools. Everything you need.</p>
              <a href={CHECKOUT.suite} className="mt-6 flex min-h-12 items-center justify-center rounded-full bg-[var(--rose)] px-5 py-3 text-center text-white" style={{ fontFamily: FONT_BODY, fontWeight: 700 }}>
                Get Everything — $127
              </a>
            </article>
          </div>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-[#f9f0ef] p-8 text-center">
            <h3 className="text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "2rem" }}>Not sure where to start?</h3>
            <p className="mx-auto mt-3 max-w-lg text-[var(--ink)]/65" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.6 }}>Take the free Brand Quiz — 4 questions and you'll know exactly which tool your brand needs first.</p>
            <div className="mt-6">
              <Button href="/quiz" rose>Take the Free Quiz →</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 text-white md:py-24" style={{ background: "#1a1a1a" }}>
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center" style={{ fontFamily: FONT_DISPLAY, fontSize: "36px", lineHeight: 1.1 }}>Everything you need to know before you buy.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ["⚡", "Instant access", "The moment you purchase, your link and password arrive in your inbox. Takes less than 5 minutes to get started."],
              ["📱", "Built for mobile", "These are interactive web apps. Open them on your phone, tablet, or laptop — no downloads, no PDFs to print."],
              ["🎀", "No experience needed", "If you can use your phone, you can use the Brand Room. Built for women who are just starting out."],
            ].map(([icon, title, body]) => (
              <article key={title} className="rounded-2xl border border-white/10 p-8 text-center">
                <p className="text-3xl">{icon}</p>
                <h3 className="mt-4" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.6rem" }}>{title}</h3>
                <p className="mt-3 text-white/70" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.65 }}>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24" style={{ background: "#f9f0ef" }}>
        <div className="mx-auto max-w-[700px]">
          <h2 className="text-center text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "40px" }}>Good to know.</h2>
          <div className="mt-8 space-y-3">
            {faq.map(([question, answer]) => (
              <details key={question} className="rounded-2xl bg-white/70 p-5">
                <summary className="cursor-pointer list-none text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem" }}>{question}</summary>
                <p className="mt-3 text-[var(--ink)]/65" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.65 }}>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 text-center text-white" style={{ background: "#1a1a1a" }}>
        <h2 className="mx-auto max-w-2xl" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(40px, 7vw, 52px)", lineHeight: 1.05 }}>Ready to build something real?</h2>
        <p className="mx-auto mt-5 max-w-lg text-white/70" style={{ fontFamily: FONT_BODY, fontSize: "17px", lineHeight: 1.7 }}>Join the women who are done guessing. Your brand starts today.</p>
        <div className="mt-8">
          <Button href="#pricing" rose>Enter the Brand Room</Button>
        </div>
        <p className="mt-5 text-white/60" style={{ fontFamily: FONT_BODY, fontSize: "13px" }}>Starting at $17 · Instant access · No experience needed</p>
      </section>
    </main>
  );
}
