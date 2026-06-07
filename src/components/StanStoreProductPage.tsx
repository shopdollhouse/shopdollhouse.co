import type { BrandProduct } from "@/components/BrandProductSalesPage";
import archMark from "@/assets/arch-mark.svg";
import { useState } from "react";

type StanStoreSalesDetails = {
  hook: string;
  subhook: string;
  valueStack: string[];
  shift: { before: string; after: string }[];
  objection: string;
  close: string;
};

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_SCRIPT = "'Allura', cursive";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";

function Divider() {
  return (
    <div className="my-5 flex items-center justify-center gap-3 text-[var(--gold)]">
      <span className="h-px w-20 bg-current opacity-45" />
      <span style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", lineHeight: 1 }}>+</span>
      <span className="h-px w-20 bg-current opacity-45" />
    </div>
  );
}

function MobileSalesPageStyles() {
  return (
    <style>{`
      @media (max-width: 640px) {
        .stan-sales-page section {
          padding-left: 12px !important;
          padding-right: 12px !important;
          padding-top: 42px !important;
          padding-bottom: 42px !important;
        }

        .stan-sales-page section:first-of-type {
          padding-top: 26px !important;
          padding-bottom: 44px !important;
        }

        .stan-sales-page .stan-shell,
        .stan-sales-page .stan-card,
        .stan-sales-page aside,
        .stan-sales-page article,
        .stan-sales-page details {
          border-radius: 18px !important;
        }

        .stan-sales-page .stan-card,
        .stan-sales-page aside,
        .stan-sales-page article,
        .stan-sales-page details {
          padding: 18px !important;
        }

        .stan-sales-page .stan-product-image {
          width: calc(100vw - 24px) !important;
          max-width: none !important;
          margin-left: 50% !important;
          transform: translateX(-50%) !important;
          border-radius: 18px !important;
        }

        .stan-sales-page .stan-arch {
          height: 58px !important;
          width: 44px !important;
        }

        .stan-sales-page .stan-eyebrow {
          font-size: 0.78rem !important;
          letter-spacing: 0.2em !important;
        }

        .stan-sales-page .stan-script {
          margin-top: 22px !important;
          font-size: 4.25rem !important;
        }

        .stan-sales-page .stan-hero-title {
          font-size: clamp(4rem, 18vw, 5.6rem) !important;
          line-height: 0.82 !important;
          letter-spacing: 0.025em !important;
        }

        .stan-sales-page .stan-hero-copy {
          margin-top: 24px !important;
          font-size: 1.24rem !important;
          line-height: 1.42 !important;
        }

        .stan-sales-page .stan-subcopy,
        .stan-sales-page .stan-body-copy,
        .stan-sales-page .stan-faq-copy,
        .stan-sales-page .stan-final-copy {
          font-size: 1.08rem !important;
          line-height: 1.58 !important;
        }

        .stan-sales-page .stan-pill,
        .stan-sales-page .stan-value-pill,
        .stan-sales-page .stan-button,
        .stan-sales-page .stan-bonus-pill {
          width: 100% !important;
          justify-content: center !important;
          border-radius: 16px !important;
          font-size: 0.82rem !important;
          letter-spacing: 0.13em !important;
          padding: 14px 16px !important;
        }

        .stan-sales-page .stan-section-label {
          font-size: 0.8rem !important;
          letter-spacing: 0.2em !important;
        }

        .stan-sales-page .stan-section-title {
          font-size: clamp(2.75rem, 14vw, 4rem) !important;
          line-height: 0.94 !important;
        }

        .stan-sales-page .stan-card-title {
          font-size: 1.85rem !important;
          line-height: 1.02 !important;
        }

        .stan-sales-page .stan-large-note {
          font-size: clamp(2.1rem, 11vw, 3.2rem) !important;
          line-height: 1.04 !important;
        }

        .stan-sales-page .stan-grid-tight {
          gap: 10px !important;
        }

        .stan-sales-page .stan-feature-icon {
          height: 4.25rem !important;
          width: 4.25rem !important;
        }

        .stan-sales-page .stan-inside-icon {
          height: 5rem !important;
          width: 5rem !important;
        }

        .stan-sales-page .stan-check-text {
          font-size: 1.05rem !important;
          line-height: 1.5 !important;
        }

        .stan-sales-page summary {
          font-size: 1.55rem !important;
          line-height: 1.05 !important;
        }
      }
    `}</style>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--rose)] text-[var(--rose)]">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
          <path d="M3 8.5 6.4 12 13 4.5" />
        </svg>
      </span>
      <span className="stan-check-text text-[var(--ink)]/68" style={{ fontFamily: FONT_BODY, fontSize: "0.98rem", lineHeight: 1.6 }}>{children}</span>
    </li>
  );
}

function FeatureIllustration({ label }: { label: string }) {
  const normalized = label.toLowerCase();
  const commonProps = {
    className: "stan-feature-icon mx-auto mb-3 h-12 w-12 text-[var(--rose)]",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 64 64",
  };

  if (normalized.includes("50") || normalized.includes("prompt")) {
    return (
      <svg {...commonProps}>
        <rect x="14" y="10" width="36" height="44" rx="6" />
        <path d="M23 22h18M23 31h18M23 40h12" />
        <path d="M44 47l5 5M49 47l-5 5" />
      </svg>
    );
  }

  if (normalized.includes("room") || normalized.includes("guided") || normalized.includes("foundation")) {
    return (
      <svg {...commonProps}>
        <path d="M18 52V27c0-8 6-15 14-15s14 7 14 15v25" />
        <path d="M26 52V30c0-4 3-7 6-7s6 3 6 7v22" />
        <path d="M14 52h36" />
      </svg>
    );
  }

  if (normalized.includes("caption") || normalized.includes("hook") || normalized.includes("content")) {
    return (
      <svg {...commonProps}>
        <path d="M15 17h34a5 5 0 0 1 5 5v18a5 5 0 0 1-5 5H30l-11 8v-8h-4a5 5 0 0 1-5-5V22a5 5 0 0 1 5-5Z" />
        <path d="M22 28h20M22 36h14" />
      </svg>
    );
  }

  if (normalized.includes("launch") || normalized.includes("copy")) {
    return (
      <svg {...commonProps}>
        <path d="M36 9c9 4 14 13 13 24L31 51 13 33c11 1 20-4 23-24Z" />
        <path d="M20 44l-7 7M29 53l-4 4M11 35l-4 4" />
        <circle cx="38" cy="24" r="4" />
      </svg>
    );
  }

  if (normalized.includes("save") || normalized.includes("export")) {
    return (
      <svg {...commonProps}>
        <path d="M18 12h28l6 7v33H18z" />
        <path d="M25 12v14h16V12M25 52V38h14v14" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M32 8l6 17 18 7-18 7-6 17-6-17-18-7 18-7z" />
    </svg>
  );
}

function InsideIllustration({ label }: { label: string }) {
  const normalized = label.toLowerCase();
  const commonProps = {
    className: "stan-inside-icon h-14 w-14 text-[var(--rose)]",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.55",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 72 72",
  };

  if (normalized.includes("audience") || normalized.includes("position")) {
    return (
      <svg {...commonProps}>
        <circle cx="25" cy="25" r="8" />
        <circle cx="48" cy="25" r="8" />
        <path d="M13 56c2-11 10-17 22-17s20 6 24 17" />
        <path d="M36 14v9M31 18h10" />
      </svg>
    );
  }

  if (normalized.includes("offer") || normalized.includes("product") || normalized.includes("pricing")) {
    return (
      <svg {...commonProps}>
        <path d="M18 24h36v34H18z" />
        <path d="M26 24c0-7 4-11 10-11s10 4 10 11" />
        <path d="M26 38h20M26 47h14" />
        <path d="M50 38l5 5-5 5" />
      </svg>
    );
  }

  if (normalized.includes("launch")) {
    return (
      <svg {...commonProps}>
        <path d="M41 10c10 5 16 16 14 29L34 60 13 39c13 2 24-5 28-29Z" />
        <circle cx="42" cy="29" r="5" />
        <path d="M24 52l-9 9M34 62l-5 5M14 42l-6 6" />
      </svg>
    );
  }

  if (normalized.includes("content") || normalized.includes("caption") || normalized.includes("marketing")) {
    return (
      <svg {...commonProps}>
        <rect x="13" y="14" width="46" height="42" rx="7" />
        <path d="M22 27h28M22 37h20M22 47h12" />
        <path d="M48 47l8 8M56 47l-8 8" />
      </svg>
    );
  }

  if (normalized.includes("save") || normalized.includes("export") || normalized.includes("worksheet")) {
    return (
      <svg {...commonProps}>
        <path d="M20 12h27l9 9v39H20z" />
        <path d="M47 12v10h9" />
        <path d="M29 41l7 7 12-16" />
      </svg>
    );
  }

  if (normalized.includes("voice") || normalized.includes("email") || normalized.includes("sms")) {
    return (
      <svg {...commonProps}>
        <path d="M14 21h44v30H14z" />
        <path d="m14 23 22 17 22-17" />
        <path d="M24 56h24" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M36 10l7 20 20 6-20 7-7 19-7-19-20-7 20-6z" />
      <path d="M29 36h14" />
    </svg>
  );
}

function VisualLearningPanel({ label, description }: { label: string; description: string }) {
  return (
    <article className="stan-card rounded-[26px] bg-white/62 p-5 text-center" style={{ border: "1px solid color-mix(in oklab, var(--gold) 24%, transparent)" }}>
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--blush)]/60">
        <FeatureIllustration label={label} />
      </div>
      <h3 className="stan-card-title mt-4 text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.55rem", lineHeight: 1.05 }}>{label}</h3>
      <p className="stan-body-copy mt-3 text-[var(--ink)]/60" style={{ fontFamily: FONT_BODY, fontSize: "0.92rem", lineHeight: 1.6 }}>{description}</p>
    </article>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="stan-section-label text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>{eyebrow}</p>
      <h2 className="stan-section-title mt-3 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.1rem, 6vw, 4rem)", fontWeight: 400, lineHeight: 1 }}>
        {title}
      </h2>
      <Divider />
    </div>
  );
}

function FAQAccordion({ faqs }: { faqs: BrandProduct["faqs"] }) {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  return (
    <div className="mt-8 grid gap-3">
      {faqs.map((faq, index) => {
        const isOpen = openQuestion === index;

        return (
          <div
            key={faq.q}
            className="overflow-hidden rounded-2xl bg-white/70 transition-colors"
            style={{ border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)" }}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`product-faq-${index}`}
              className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left text-[var(--ink)] transition-colors hover:bg-[var(--blush)]/25"
              onClick={() => setOpenQuestion(isOpen ? null : index)}
            >
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: "1.2rem", lineHeight: 1.25 }}>{faq.q}</span>
              <span
                aria-hidden
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--gold)]/35 text-[var(--gold)] transition-transform"
                style={{ fontFamily: FONT_LUXE, fontSize: "1.05rem", lineHeight: 1 }}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div id={`product-faq-${index}`} className="border-t border-[var(--gold)]/15 px-6 pb-6 pt-4">
                <p className="stan-faq-copy text-[var(--ink)]/65" style={{ fontFamily: FONT_BODY, fontSize: "0.92rem", lineHeight: 1.65 }}>
                  {faq.a}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const salesDetails: Record<BrandProduct["accent"], StanStoreSalesDetails> = {
  brand: {
    hook: "Build the brand people understand, trust, and buy from.",
    subhook: "For the beginner who is ready to stop changing direction and finally create a real plan for the business she keeps imagining.",
    valueStack: ["17 guided rooms", "Offer + pricing clarity", "Launch roadmap", "Content direction", "Save + export", "Private access"],
    shift: [
      { before: "Ideas scattered across notes", after: "One organized brand strategy" },
      { before: "Posting without a plan", after: "Content tied to your offer" },
      { before: "Unsure what to sell", after: "Clear products and positioning" },
    ],
    objection: "You do not need to be experienced. You just need a guided place to make the right decisions in the right order.",
    close: "If you are serious about building a brand, this is the foundation you finish before you spend more money on logos, templates, content, or ads.",
  },
  workbook: {
    hook: "Turn your brand idea into a clear foundation you can actually use.",
    subhook: "For the beginner who has the vision, but needs guided prompts to organize the audience, offer, message, and next steps.",
    valueStack: ["Interactive workbook", "Bonus PDF", "Audience clarity", "Offer direction", "Content pillars", "Launch checklist"],
    shift: [
      { before: "Overthinking where to start", after: "A simple guided path" },
      { before: "Your offer feels vague", after: "Clear value and direction" },
      { before: "Content feels random", after: "Pillars you can post from" },
    ],
    objection: "You do not need a polished brand yet. This is the first step for getting clear before you design, promote, or hire help.",
    close: "If your ideas are everywhere, start here. This workbook helps you leave with answers you can use on your website, socials, offer, and launch plan.",
  },
  ai: {
    hook: "Never stare at a blank caption, email, or launch post again.",
    subhook: "50+ brand-building prompts that help you turn ideas into captions, hooks, emails, offer copy, launch posts, and sales messaging faster.",
    valueStack: ["50+ prompts", "8 prompt rooms", "Captions + hooks", "Email prompts", "Offer copy", "Launch content"],
    shift: [
      { before: "Blank page stress", after: "Ready-to-customize prompts" },
      { before: "Generic AI output", after: "Brand-specific direction" },
      { before: "Slow content creation", after: "Faster captions, emails, and copy" },
    ],
    objection: "You do not need paid ChatGPT. You just copy a prompt, add your brand details, and use it with your preferred AI writing tool.",
    close: "At $17, this is the fastest way to stop overthinking your content and start getting usable words on the page today.",
  },
};

function CheckoutSection({ product, priceAmount, currency }: { product: BrandProduct; priceAmount: string; currency?: string }) {
  if (!product.checkoutUrl) return null;

  return (
    <section
      id="checkout"
      className="px-5 py-16 md:px-8 md:py-24"
      style={{ background: "linear-gradient(180deg, var(--cream) 0%, #f8e5df 100%)" }}
    >
      <div className="mx-auto max-w-5xl">
        <div
          className="stan-card mb-6 rounded-[26px] px-6 py-6 md:flex md:items-center md:justify-between md:gap-10 md:px-9"
          style={{
            background: "rgba(255,250,246,0.78)",
            border: "1px solid color-mix(in oklab, var(--gold) 30%, transparent)",
            boxShadow: "0 24px 60px -46px rgba(90,45,35,0.55)",
          }}
        >
          <div className="flex items-start gap-4">
            <img src={archMark} alt="" className="mt-1 h-12 w-9 shrink-0 opacity-55" />
            <div>
              <p className="stan-section-label text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.66rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Secure Checkout
              </p>
              <h2 className="stan-section-title mt-2 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.9rem, 4vw, 2.8rem)", lineHeight: 1, fontWeight: 400 }}>
                Complete your order.
              </h2>
              <p className="stan-body-copy mt-3 max-w-xl text-[var(--ink)]/58" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", lineHeight: 1.6 }}>
                Secure one-time payment. Your private access details appear immediately after checkout.
              </p>
            </div>
          </div>
          <div className="mt-5 shrink-0 border-t border-[var(--gold)]/18 pt-5 md:mt-0 md:border-l md:border-t-0 md:pl-8 md:pt-0 md:text-right">
            <div className="flex items-baseline gap-2 md:justify-end">
              <span className="italic text-[var(--gold)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "3.2rem", lineHeight: 1 }}>
                {priceAmount}
              </span>
              {currency && (
                <span className="text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.14em" }}>
                  {currency}
                </span>
              )}
              {product.regular && <span className="text-[var(--ink)]/28 line-through" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem" }}>{product.regular}</span>}
            </div>
            <p className="mt-2 text-[var(--ink)]/42" style={{ fontFamily: FONT_BODY, fontSize: "0.76rem" }}>
              Instant digital access · All sales final
            </p>
          </div>
        </div>

        <div
          className="stan-card overflow-hidden rounded-[28px] bg-white"
          style={{ border: "1px solid color-mix(in oklab, var(--gold) 30%, transparent)", boxShadow: "0 32px 80px -50px rgba(90,45,35,0.62)" }}
        >
          <div className="flex items-center justify-between gap-4 border-b border-[var(--gold)]/20 bg-[var(--blush)]/38 px-5 py-4 md:px-7">
            <p className="stan-section-label text-[var(--ink)]/58" style={{ fontFamily: FONT_LUXE, fontSize: "0.64rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>
              Protected Payment
            </p>
            <div className="flex items-center gap-3 text-[var(--ink)]/42" style={{ fontFamily: FONT_BODY, fontSize: "0.72rem" }}>
              <span>Encrypted</span>
              <span aria-hidden>·</span>
              <span>Secure</span>
            </div>
          </div>
          <iframe
            src={product.checkoutUrl}
            title={`${product.shortName} secure checkout`}
            className="h-[1780px] w-full bg-white sm:h-[1640px] lg:h-[1500px]"
            loading="lazy"
            scrolling="no"
            style={{ border: 0, display: "block" }}
          />
        </div>
        <p className="stan-faq-copy mx-auto mt-5 max-w-2xl text-center text-[var(--ink)]/42" style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", lineHeight: 1.6 }}>
          Trouble viewing the payment form?{" "}
          <a href={product.checkoutUrl} className="text-[var(--rose)] underline underline-offset-4">
            Open the secure checkout in a new page.
          </a>
        </p>
      </div>
    </section>
  );
}

export function StanStoreProductPage({ product, showCheckout = false }: { product: BrandProduct; showCheckout?: boolean }) {
  const allSalesFinal = product.faqs.find((faq) => faq.q.toLowerCase().includes("refund"))?.a ?? "Because this is a digital product with instant access, all sales are final.";
  const details = salesDetails[product.accent];
  const [priceAmount, currency] = product.price.split(" ");

  return (
    <main className="stan-sales-page min-h-screen bg-[var(--blush)] text-[var(--ink)]">
      <MobileSalesPageStyles />
      <section className="relative overflow-hidden px-5 pb-16 pt-10 md:px-8 md:pb-24 md:pt-14">
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(circle at 14% 2%, rgba(219,150,144,0.28), transparent 22%), radial-gradient(circle at 92% 12%, rgba(219,150,144,0.24), transparent 20%), linear-gradient(180deg, #fff8f3 0%, #f8e5df 100%)" }} />
        <div className="relative mx-auto max-w-5xl text-center">
          <img src={archMark} alt="" className="stan-arch mx-auto h-16 w-12 opacity-65" />
          <p className="stan-eyebrow mt-6 text-[var(--rose)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.76rem", letterSpacing: "0.24em", textTransform: "uppercase", fontWeight: 700 }}>{product.eyebrow}</p>
          <p className="stan-script mt-8 italic leading-none text-[var(--rose)]" style={{ fontFamily: FONT_SCRIPT, fontSize: "clamp(3rem, 8vw, 5rem)" }}>the</p>
          <h1 className="stan-hero-title mt-1 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(3.2rem, 11vw, 7.2rem)", lineHeight: 0.88, fontWeight: 400, letterSpacing: "0.035em", textTransform: "uppercase" }}>
            {product.name.replace("The Dollhouse ", "")}
          </h1>
          <p className="stan-section-label mt-6 text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.78rem", letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: 700 }}>The Dollhouse</p>
          <p className="stan-hero-copy mx-auto mt-8 max-w-3xl text-[var(--ink)]/76" style={{ fontFamily: FONT_BODY, fontSize: "clamp(1.05rem, 2.5vw, 1.35rem)", lineHeight: 1.65 }}>
            {details.hook}
          </p>
          <p className="stan-subcopy mx-auto mt-4 max-w-2xl text-[var(--ink)]/58" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.7 }}>
            {details.subhook}
          </p>
          <div className="stan-pill mx-auto mt-8 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-[var(--gold)]/30 bg-white/36 px-5 py-3 text-[var(--ink)]/62" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            <span>
              {priceAmount}
              {currency && <span style={{ fontSize: "0.55rem", fontWeight: 700, marginLeft: "0.25rem" }}>{currency}</span>}
            </span>
            {product.regular && <span className="text-[var(--ink)]/28 line-through">{product.regular}</span>}
            <span>{product.value ?? "Instant access"}</span>
          </div>
          {showCheckout && (
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#checkout" className="stan-button rounded-full bg-[var(--ink)] px-7 py-4 text-[var(--cream)] transition-all hover:-translate-y-0.5 hover:opacity-90" style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}>
                {product.finalCta} <span aria-hidden>→</span>
              </a>
              <a href="/brand-room" className="stan-button rounded-full border border-[var(--gold)]/40 bg-white/26 px-7 py-4 text-[var(--ink)]/62 transition-all hover:-translate-y-0.5" style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}>
                Back to Brand Room
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[var(--cream)] px-5 py-10 md:px-8 md:py-14">
        <div className="stan-shell stan-card mx-auto max-w-6xl rounded-[28px] bg-white/62 p-5 md:p-7" style={{ border: "1px solid color-mix(in oklab, var(--gold) 24%, transparent)" }}>
          <p className="stan-section-label text-center text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>What You Receive</p>
          <div className="stan-grid-tight mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {details.valueStack.map((item) => (
              <div key={item} className="stan-value-pill rounded-2xl bg-[var(--blush)]/50 px-4 py-4 text-center text-[var(--ink)]/72" style={{ border: "1px solid color-mix(in oklab, var(--gold) 22%, transparent)", fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.13em", textTransform: "uppercase" }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-5 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          {product.productImage && (
            <img
              src={product.productImage}
              alt={`${product.name} product preview`}
              className="stan-product-image aspect-[3/2] w-full rounded-[28px] border border-white/80 object-cover shadow-[0_32px_80px_-48px_rgba(90,45,35,0.72)]"
            />
          )}
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {product.imageItems.map((item) => (
              <div key={item} className="stan-card rounded-[20px] bg-[var(--blush)]/60 px-5 py-5 text-center" style={{ border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)" }}>
                <FeatureIllustration label={item} />
                <p className="stan-section-label text-[var(--ink)]/68" style={{ fontFamily: FONT_LUXE, fontSize: "0.66rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <VisualLearningPanel label="See The Steps" description="Each product is laid out visually so you can understand what to do next without feeling buried in text." />
            <VisualLearningPanel label="Fill In The Blanks" description="Use prompts, rooms, and guided sections to make decisions one piece at a time." />
            <VisualLearningPanel label="Build With Clarity" description="Leave with organized answers you can use for your brand, content, launch, or next offer." />
          </div>
        </div>
      </section>

      <section id="details" className="px-5 py-16 md:px-8 md:py-24" style={{ background: "linear-gradient(180deg, #f8e5df 0%, #fff8f3 100%)" }}>
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.42fr]">
          <div className="stan-card rounded-[30px] bg-white/58 p-7 md:p-10" style={{ border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)" }}>
            <p className="stan-section-label text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>Why You Need This</p>
            <h2 className="stan-section-title mt-4 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 5vw, 3.6rem)", lineHeight: 1, fontWeight: 400 }}>{product.painHeadline}</h2>
            <p className="stan-body-copy mt-5 text-[var(--ink)]/68" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.75 }}>{product.painBody}</p>
            <p className="stan-body-copy mt-4 text-[var(--ink)]/58" style={{ fontFamily: FONT_BODY, fontSize: "0.96rem", lineHeight: 1.7 }}>{product.intro}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {product.outcomes.map((item) => <CheckItem key={item}>{item}</CheckItem>)}
            </ul>
          </div>

          <aside className="rounded-[30px] bg-[var(--ink)] p-7 text-[var(--cream)] lg:sticky lg:top-6 lg:self-start">
            <p className="stan-section-label text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>Instant Access</p>
            <div className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-2 pb-2">
              <span className="block italic text-[var(--gold)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(3.65rem, 5vw, 4.4rem)", lineHeight: 0.82 }}>
                {priceAmount}
              </span>
              {currency && (
                <span className="mb-1 text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.16em" }}>
                  {currency}
                </span>
              )}
              {product.regular && <span className="mb-1 text-[var(--cream)]/34 line-through" style={{ fontFamily: FONT_BODY, fontSize: "1.05rem" }}>{product.regular}</span>}
            </div>
            {product.value && <p className="stan-section-label mt-3 text-[var(--cream)]/45" style={{ fontFamily: FONT_LUXE, fontSize: "0.7rem", lineHeight: 1.65, letterSpacing: "0.13em", textTransform: "uppercase" }}>{product.value}</p>}
            {showCheckout ? (
              <a href="#checkout" className="stan-button mt-7 block rounded-full px-6 py-4 text-center transition-all hover:-translate-y-0.5" style={{ background: "var(--gold)", color: "var(--ink)", fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}>
                Get Instant Access →
              </a>
            ) : (
              <p className="stan-body-copy mt-4 text-center text-[var(--cream)]/42" style={{ fontFamily: FONT_BODY, fontSize: "0.78rem" }}>Private digital access after purchase.</p>
            )}
            {showCheckout && <p className="stan-body-copy mt-4 text-center text-[var(--cream)]/42" style={{ fontFamily: FONT_BODY, fontSize: "0.78rem" }}>Private digital access after purchase.</p>}
          </aside>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader eyebrow="The Transformation" title="Before vs. After" />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {details.shift.map((item) => (
              <article key={item.before} className="stan-card overflow-hidden rounded-[26px] bg-white/68" style={{ border: "1px solid color-mix(in oklab, var(--gold) 26%, transparent)" }}>
                <div className="stan-body-copy bg-[var(--ink)] px-5 py-4 text-[var(--cream)]/74" style={{ fontFamily: FONT_BODY, fontSize: "0.92rem" }}>
                  Before: {item.before}
                </div>
                <div className="px-5 py-5">
                  <p className="stan-card-title text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.55rem", lineHeight: 1.1 }}>After: {item.after}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24" style={{ background: "linear-gradient(180deg, #fff8f3 0%, #f8e5df 100%)" }}>
        <div className="mx-auto max-w-6xl">
          <SectionHeader eyebrow="What's Inside" title={product.insideTitle} />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {product.inside.map((item) => (
              <article key={item.title} className="stan-card rounded-[24px] bg-white/64 p-6" style={{ border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)" }}>
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--blush)]/58">
                  <InsideIllustration label={item.title} />
                </div>
                <h3 className="stan-card-title mt-5 text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.45rem", lineHeight: 1.1 }}>{item.title}</h3>
                <p className="stan-body-copy mt-3 text-[var(--ink)]/62" style={{ fontFamily: FONT_BODY, fontSize: "0.92rem", lineHeight: 1.65 }}>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-5 py-14 md:px-8 md:py-18">
        <div className="stan-card mx-auto max-w-4xl rounded-[30px] bg-[var(--ink)] p-7 text-center text-[var(--cream)] md:p-10">
          <p className="stan-section-label text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>Read This First</p>
          <p className="stan-large-note mx-auto mt-4 max-w-2xl text-[var(--cream)]/78" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.7rem, 4vw, 2.6rem)", lineHeight: 1.18 }}>
            {details.objection}
          </p>
        </div>
      </section>

      {showCheckout && <CheckoutSection product={product} priceAmount={priceAmount} currency={currency} />}

      <section className="px-5 py-16 md:px-8 md:py-24" style={{ background: "var(--ink)" }}>
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <p className="stan-section-label text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>Perfect For</p>
            <h2 className="stan-section-title mt-4 text-[var(--cream)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1, fontWeight: 400 }}>Built for beginners who want clarity before they spend more.</h2>
            {product.bonuses && (
              <>
                <p className="stan-section-label mt-8 text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>Included</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.bonuses.map((bonus) => (
                    <span key={bonus} className="stan-bonus-pill rounded-full border border-[var(--gold)]/30 px-4 py-2 text-[var(--cream)]/72" style={{ fontFamily: FONT_BODY, fontSize: "0.86rem" }}>{bonus}</span>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="grid gap-3">
            {product.perfectFor.map((item) => (
              <div key={item} className="stan-card stan-body-copy rounded-2xl bg-white/[0.06] p-5 text-[var(--cream)]/72" style={{ border: "1px solid rgba(200,168,100,0.18)", fontFamily: FONT_BODY, fontSize: "0.95rem", lineHeight: 1.65 }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <SectionHeader eyebrow="Good To Know" title="Common Questions" />
          <FAQAccordion faqs={product.faqs} />
        </div>
      </section>

      <section className="px-5 py-16 text-center md:px-8 md:py-24" style={{ background: "linear-gradient(180deg, #f8e5df 0%, #f1d2cc 100%)" }}>
        <div className="mx-auto max-w-4xl">
          <p className="stan-section-label text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>After You Build The Foundation</p>
          <h2 className="stan-section-title mt-4 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.2rem, 6vw, 4.2rem)", lineHeight: 1, fontWeight: 400 }}>Ready for done-for-you growth?</h2>
          <p className="stan-final-copy mx-auto mt-5 max-w-2xl text-[var(--ink)]/64" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.75 }}>
            Once your offer and direction are clear, The Dollhouse can help with managed marketing: content, AI clone videos, automation, and lead follow-up handled for you.
          </p>
          <p className="stan-large-note mx-auto mt-6 max-w-2xl text-[var(--ink)]/72" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.5rem, 4vw, 2.25rem)", lineHeight: 1.18 }}>
            {details.close}
          </p>
          {showCheckout ? (
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#checkout" className="stan-button rounded-full bg-[var(--ink)] px-8 py-4 text-[var(--cream)] transition-all hover:-translate-y-0.5 hover:opacity-90" style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}>
                {product.finalCta} <span aria-hidden>→</span>
              </a>
              <a href="/#contact" className="stan-button rounded-full border border-[var(--gold)]/40 bg-white/30 px-8 py-4 text-[var(--ink)]/62 transition-all hover:-translate-y-0.5" style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}>
                Apply for Marketing
              </a>
            </div>
          ) : (
            <div className="stan-card mx-auto mt-8 grid max-w-2xl gap-3 rounded-[26px] bg-white/42 p-5 text-[var(--ink)]/64 sm:grid-cols-2" style={{ border: "1px solid color-mix(in oklab, var(--gold) 24%, transparent)" }}>
              <p className="stan-section-label" style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>Product: {product.price}</p>
              <p className="stan-section-label" style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>Marketing: Apply when ready</p>
            </div>
          )}
          <p className="stan-faq-copy mx-auto mt-6 max-w-xl text-[var(--ink)]/42" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", lineHeight: 1.6 }}>
            {allSalesFinal}
          </p>
        </div>
      </section>
    </main>
  );
}
