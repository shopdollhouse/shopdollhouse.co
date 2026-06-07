import { useState } from "react";
import archMark from "@/assets/arch-mark.svg";
import brandKitImage from "@/assets/product-brand-kit.jpg";
import workbookImage from "@/assets/product-workbook.jpg";
import promptKitImage from "@/assets/product-ai-prompt-kit.jpg";

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";
const FONT_SCRIPT = "'Allura', cursive";

export type ThankYouProductKey = "brand-kit" | "workbook" | "ai-kit" | "full-suite";

type AccessItem = {
  name: string;
  buttonLabel: string;
  href: string;
  password?: string;
};

type ThankYouProduct = {
  name: string;
  shortName: string;
  price: string;
  eyebrow: string;
  message: string;
  images: { src: string; alt: string }[];
  access: AccessItem[];
};

const BRAND_KIT_ACCESS: AccessItem = {
  name: "Brand Kit Blueprint",
  buttonLabel: "Enter the Brand Kit",
  href: "https://thedollhouse-brand-kit.vercel.app/",
  password: "ENTERTHEROOM",
};

const WORKBOOK_ACCESS: AccessItem = {
  name: "Brand Workbook",
  buttonLabel: "Enter the Brand Workbook",
  href: "https://thedollhouse-workbook.vercel.app/",
  password: "KEYHOLDER",
};

const PROMPT_KIT_ACCESS: AccessItem = {
  name: "AI Prompt Kit",
  buttonLabel: "Enter the AI Prompt Kit",
  href: "https://ai-prompt-kit.vercel.app/",
};

const PRODUCTS: Record<ThankYouProductKey, ThankYouProduct> = {
  "brand-kit": {
    name: "The Dollhouse Brand Kit Blueprint",
    shortName: "Brand Kit Blueprint",
    price: "$97",
    eyebrow: "Your Private Strategy Suite",
    message: "Your complete brand-building workspace is ready. Start with your foundation, then move through your audience, offer, content, and launch rooms in order.",
    images: [{ src: brandKitImage, alt: "The Dollhouse Brand Kit Blueprint workspace and resources" }],
    access: [BRAND_KIT_ACCESS],
  },
  workbook: {
    name: "The Dollhouse Brand Workbook",
    shortName: "Brand Workbook",
    price: "$47",
    eyebrow: "Your Guided Foundation",
    message: "Your guided workbook is ready. Work through one prompt at a time and turn the ideas in your head into a clear audience, offer, message, and next-step plan.",
    images: [{ src: workbookImage, alt: "The Dollhouse Brand Workbook shown across digital devices" }],
    access: [WORKBOOK_ACCESS],
  },
  "ai-kit": {
    name: "The Dollhouse AI Prompt Kit",
    shortName: "AI Prompt Kit",
    price: "$17",
    eyebrow: "Your Content Shortcut",
    message: "Your prompt library is ready. Choose a room, add your brand details, and turn your ideas into stronger captions, hooks, emails, offers, and launch copy.",
    images: [{ src: promptKitImage, alt: "The Dollhouse AI Prompt Kit and ready-to-use prompt library" }],
    access: [PROMPT_KIT_ACCESS],
  },
  "full-suite": {
    name: "The Complete Dollhouse Suite",
    shortName: "Full Suite",
    price: "$127",
    eyebrow: "Everything You Need",
    message: "You now have the complete path from business idea to brand strategy to ready-to-publish words. Begin with the Workbook, build the full system in the Brand Kit, then use the AI Prompt Kit to create faster.",
    images: [
      { src: brandKitImage, alt: "The Dollhouse Brand Kit Blueprint" },
      { src: workbookImage, alt: "The Dollhouse Brand Workbook" },
      { src: promptKitImage, alt: "The Dollhouse AI Prompt Kit" },
    ],
    access: [WORKBOOK_ACCESS, BRAND_KIT_ACCESS, PROMPT_KIT_ACCESS],
  },
};

export function normalizeThankYouProduct(value: unknown): ThankYouProductKey | null {
  if (value === "prompt-kit") return "ai-kit";
  if (value === "brand-kit" || value === "workbook" || value === "ai-kit" || value === "full-suite") return value;
  return null;
}

function ProductVisual({ product }: { product: ThankYouProduct }) {
  if (product.images.length === 1) {
    const image = product.images[0];
    return (
      <div className="overflow-hidden rounded-[26px] border border-[var(--gold)]/25 bg-white shadow-[0_30px_70px_-48px_rgba(62,31,25,0.65)]">
        <img src={image.src} alt={image.alt} className="aspect-[3/2] w-full object-cover" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 rounded-[26px] border border-[var(--gold)]/25 bg-white/72 p-3 shadow-[0_30px_70px_-48px_rgba(62,31,25,0.65)]">
      {product.images.map((image, index) => (
        <div key={image.src} className={`overflow-hidden rounded-[18px] ${index === 0 ? "col-span-2" : ""}`}>
          <img src={image.src} alt={image.alt} className={`w-full object-cover ${index === 0 ? "aspect-[2.25/1]" : "aspect-[1.25/1]"}`} />
        </div>
      ))}
    </div>
  );
}

function AccessCard({ item, index, total }: { item: AccessItem; index: number; total: number }) {
  const [copied, setCopied] = useState(false);

  async function copyPassword() {
    if (!item.password) return;
    try {
      await navigator.clipboard.writeText(item.password);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // The password remains selectable if clipboard access is unavailable.
    }
  }

  return (
    <article className="rounded-[22px] border border-[var(--gold)]/25 bg-white/76 p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            Workspace {index + 1} of {total}
          </p>
          <h3 className="mt-2 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.65rem", fontWeight: 500, lineHeight: 1.05 }}>
            {item.name}
          </h3>
        </div>
        <img src={archMark} alt="" className="h-10 w-7 opacity-45" />
      </div>

      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 py-4 text-[var(--cream)] transition-all hover:-translate-y-0.5 hover:opacity-90"
        style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase" }}
      >
        {item.buttonLabel} <span aria-hidden>→</span>
      </a>

      {item.password ? (
        <div className="mt-5 border-t border-[var(--gold)]/20 pt-5">
          <p className="text-[var(--ink)]/58" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem" }}>Your private password</p>
          <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[var(--gold)]/25 bg-[var(--cream)] px-4 py-3">
            <strong className="min-w-0 flex-1 break-all text-[var(--ink)]" style={{ fontFamily: FONT_LUXE, fontSize: "1.05rem", fontWeight: 700, letterSpacing: "0.1em" }}>
              {item.password}
            </strong>
            <button
              type="button"
              onClick={copyPassword}
              className="shrink-0 rounded-full border border-[var(--gold)]/35 px-3 py-2 text-[var(--ink)] transition-colors hover:bg-white"
              aria-label={`Copy ${item.name} password`}
              style={{ fontFamily: FONT_LUXE, fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="mt-2 text-[var(--ink)]/42" style={{ fontFamily: FONT_BODY, fontSize: "0.75rem" }}>Save this somewhere private. You will need it when you return.</p>
        </div>
      ) : (
        <p className="mt-4 text-center text-[var(--ink)]/46" style={{ fontFamily: FONT_BODY, fontSize: "0.78rem" }}>No password is required for this workspace.</p>
      )}
    </article>
  );
}

function MissingProduct() {
  return (
    <section className="mx-auto flex min-h-screen max-w-xl items-center px-5 py-16 text-center">
      <div className="w-full rounded-[28px] border border-[var(--gold)]/25 bg-white/70 p-8">
        <img src={archMark} alt="" className="mx-auto h-12 w-9 opacity-55" />
        <h1 className="mt-5 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.5rem, 8vw, 4rem)", fontWeight: 400 }}>Your order is complete.</h1>
        <p className="mx-auto mt-4 max-w-md text-[var(--ink)]/62" style={{ fontFamily: FONT_BODY, lineHeight: 1.7 }}>
          We could not identify the product from this link. Please use the access link provided with your order or contact us for help.
        </p>
        <a href="mailto:hello@shopdollhouse.co" className="mt-6 inline-flex rounded-full bg-[var(--ink)] px-7 py-4 text-[var(--cream)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase" }}>
          Get Access Help
        </a>
      </div>
    </section>
  );
}

export default function ProductThankYouPage({ productKey }: { productKey: ThankYouProductKey | null }) {
  const product = productKey ? PRODUCTS[productKey] : null;
  if (!product) return <main style={{ background: "linear-gradient(145deg, #f7dfdb 0%, var(--cream) 60%, #f3d5cf 100%)" }}><MissingProduct /></main>;

  return (
    <main className="min-h-screen text-[var(--ink)]" style={{ background: "linear-gradient(145deg, #f7dfdb 0%, var(--cream) 52%, #f3d5cf 100%)" }}>
      <section className="px-5 pb-12 pt-12 md:px-8 md:pb-16 md:pt-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={archMark} alt="" className="h-11 w-8 opacity-55" />
              <p className="text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase" }}>Purchase Complete</p>
            </div>
            <p className="mt-7 text-[var(--gold)]" style={{ fontFamily: FONT_SCRIPT, fontSize: "2.4rem", lineHeight: 0.8 }}>welcome to</p>
            <h1 className="mt-3 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(3rem, 7vw, 5.7rem)", fontWeight: 400, lineHeight: 0.88 }}>
              {product.shortName}
            </h1>
            <p className="mt-5 text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>{product.eyebrow}</p>
            <p className="mt-5 max-w-xl text-[var(--ink)]/68" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.75 }}>{product.message}</p>
            <div className="mt-7 inline-flex items-baseline gap-2 rounded-full border border-[var(--gold)]/25 bg-white/55 px-5 py-3">
              <span className="text-[var(--ink)]/48" style={{ fontFamily: FONT_LUXE, fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>Order total</span>
              <strong className="text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.8rem", fontWeight: 500 }}>{product.price}</strong>
              <span className="text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em" }}>USD</span>
            </div>
          </div>
          <ProductVisual product={product} />
        </div>
      </section>

      <section className="border-y border-[var(--gold)]/15 bg-white/42 px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase" }}>Start Here</p>
            <h2 className="mt-3 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.35rem, 6vw, 4rem)", fontWeight: 400, lineHeight: 1 }}>Your access is ready.</h2>
            <p className="mx-auto mt-3 max-w-xl text-[var(--ink)]/58" style={{ fontFamily: FONT_BODY, fontSize: "0.92rem", lineHeight: 1.65 }}>
              Open your workspace below. Save any password shown before you leave this page.
            </p>
          </div>
          <div className={`mt-8 grid gap-4 ${product.access.length > 1 ? "md:grid-cols-3" : "mx-auto max-w-xl"}`}>
            {product.access.map((item, index) => <AccessCard key={item.name} item={item} index={index} total={product.access.length} />)}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ["01", "Save this page", "Bookmark this page or save your passwords somewhere private."],
              ["02", "Begin at the start", productKey === "full-suite" ? "Workbook first, Brand Kit second, AI Prompt Kit third." : "Follow the guided order inside your workspace for the clearest result."],
              ["03", "Need support?", "Email us if you have trouble opening your workspace or using your access details."],
            ].map(([number, title, copy]) => (
              <article key={number} className="rounded-[20px] border border-[var(--gold)]/20 bg-white/45 p-5">
                <p className="text-[var(--gold)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.35rem", fontStyle: "italic" }}>{number}</p>
                <h3 className="mt-2 text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", fontWeight: 500 }}>{title}</h3>
                <p className="mt-2 text-[var(--ink)]/55" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", lineHeight: 1.6 }}>{copy}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[var(--gold)]/20 pt-7 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-[var(--ink)]/62" style={{ fontFamily: FONT_BODY, fontSize: "0.86rem" }}>Questions about your access?</p>
              <a href="mailto:hello@shopdollhouse.co" className="text-[var(--rose)] underline underline-offset-4" style={{ fontFamily: FONT_BODY, fontSize: "0.86rem" }}>hello@shopdollhouse.co</a>
            </div>
            <a href="/brand-room" className="rounded-full border border-[var(--gold)]/35 bg-white/35 px-6 py-3 text-[var(--ink)] transition-colors hover:bg-white/65" style={{ fontFamily: FONT_LUXE, fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase" }}>
              Return to Brand Room
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
