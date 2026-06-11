import { useEffect, useState, type ReactNode } from "react";
import archMark from "@/assets/arch-mark.svg";
import brandKitImage from "@/assets/product-brand-kit.jpg";
import workbookImage from "@/assets/product-workbook.jpg";
import promptKitImage from "@/assets/product-ai-prompt-kit.jpg";
import leadSystemImage from "@/assets/path-lead-system.jpg";
import managedGrowthImage from "@/assets/path-managed-growth.jpg";

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";
const FONT_SCRIPT = "'Allura', cursive";

const BOOKING_URL = "https://link.shopdollhouse.co/widget/booking/kSfB3lStgR2Cq6N4rIqH";

export type ThankYouProductKey =
  | "brand-kit"
  | "workbook"
  | "ai-kit"
  | "full-suite"
  | "website-essentials"
  | "foundation"
  | "foundation-lsa"
  | "starter"
  | "growth";

type AccessItem = {
  name: string;
  buttonLabel: string;
  href: string;
  password?: string;
};

type NextStep = { title: string; body: string };

type ThankYouProduct = {
  kind: "digital" | "service";
  name: string;
  shortName: string;
  price: string;
  priceLabel?: string;
  eyebrow: string;
  message: string;
  images: { src: string; alt: string }[];
  access?: AccessItem[];
  nextSteps?: NextStep[];
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

function serviceSteps(termOptions: string): NextStep[] {
  return [
    { title: "Your setup fee is confirmed", body: `Your payment came through and your spot is officially secured. To complete your enrollment, we'll send you an invoice for the plan term you choose — ${termOptions}.` },
    { title: "Watch for your welcome email", body: "Within 24 hours you'll get a welcome email with your onboarding details and the few things we need from you to begin." },
    { title: "Book your kickoff call", body: "Pick a time below so we can kick things off, learn about your business, and map out your build." },
    { title: "We build it for you", body: "Your monthly plan begins as soon as you complete your plan invoice. From there, we get to work and your system goes live and running for you." },
  ];
}

const WEBSITE_PLAN_STEPS = serviceSteps("3, 6, or 12 months");
const MANAGED_PLAN_STEPS = serviceSteps("6 or 12 months");

const PRODUCTS: Record<ThankYouProductKey, ThankYouProduct> = {
  "brand-kit": {
    kind: "digital",
    name: "The Dollhouse Brand Kit Blueprint",
    shortName: "Brand Kit Blueprint",
    price: "$97",
    eyebrow: "Your Private Strategy Suite",
    message: "Your complete brand-building workspace is ready. Start with your foundation, then move through your audience, offer, content, and launch rooms in order.",
    images: [{ src: brandKitImage, alt: "The Dollhouse Brand Kit Blueprint workspace and resources" }],
    access: [BRAND_KIT_ACCESS],
  },
  workbook: {
    kind: "digital",
    name: "The Dollhouse Brand Workbook",
    shortName: "Brand Workbook",
    price: "$47",
    eyebrow: "Your Guided Foundation",
    message: "Your guided workbook is ready. Work through one prompt at a time and turn the ideas in your head into a clear audience, offer, message, and next-step plan.",
    images: [{ src: workbookImage, alt: "The Dollhouse Brand Workbook shown across digital devices" }],
    access: [WORKBOOK_ACCESS],
  },
  "ai-kit": {
    kind: "digital",
    name: "The Dollhouse AI Prompt Kit",
    shortName: "AI Prompt Kit",
    price: "$17",
    eyebrow: "Your Content Shortcut",
    message: "Your prompt library is ready. Choose a room, add your brand details, and turn your ideas into stronger captions, hooks, emails, offers, and launch copy.",
    images: [{ src: promptKitImage, alt: "The Dollhouse AI Prompt Kit and ready-to-use prompt library" }],
    access: [PROMPT_KIT_ACCESS],
  },
  "full-suite": {
    kind: "digital",
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
  "website-essentials": {
    kind: "service",
    name: "Website Essentials",
    shortName: "Website Essentials",
    price: "$497",
    priceLabel: "Setup fee paid",
    eyebrow: "Your Website Is On Its Way",
    message: "Your one-time setup fee is in and your spot is secured. Next, we'll gather what we need and start building your website, booking calendar, and chat widget — hosted and handled for you.",
    images: [{ src: leadSystemImage, alt: "A professional website and booking system" }],
    nextSteps: WEBSITE_PLAN_STEPS,
  },
  foundation: {
    kind: "service",
    name: "The Foundation",
    shortName: "The Foundation",
    price: "$997",
    priceLabel: "Setup fee paid",
    eyebrow: "Your Lead System Starts Now",
    message: "Your one-time setup fee is in and your spot is secured. Next, we'll build your website and full lead system so every call, click, and inquiry turns into a booked client.",
    images: [{ src: leadSystemImage, alt: "A website connected to an automated lead system" }],
    nextSteps: WEBSITE_PLAN_STEPS,
  },
  "foundation-lsa": {
    kind: "service",
    name: "Foundation + Google LSA",
    shortName: "Foundation + LSA",
    price: "$997",
    priceLabel: "Setup fee paid",
    eyebrow: "Your Lead System + Google Ads",
    message: "Your one-time setup fee is in and your spot is secured. Next, we'll build your full Foundation system and set up your Google Local Service Ads so you show up first and pay per result.",
    images: [{ src: leadSystemImage, alt: "A website with Google Local Service Ads" }],
    nextSteps: WEBSITE_PLAN_STEPS,
  },
  starter: {
    kind: "service",
    name: "The Starter",
    shortName: "The Starter",
    price: "$500",
    priceLabel: "Setup fee paid",
    eyebrow: "Your Platform, Fully Managed",
    message: "Your one-time setup fee is in and your spot is secured. Next, we'll build your AI Clone, set up your content system and automations, and get your platform fully managed for you.",
    images: [{ src: managedGrowthImage, alt: "A fully managed social media platform" }],
    nextSteps: MANAGED_PLAN_STEPS,
  },
  growth: {
    kind: "service",
    name: "The Growth",
    shortName: "The Growth",
    price: "$500",
    priceLabel: "Setup fee paid",
    eyebrow: "Your Full Growth System",
    message: "Your one-time setup fee is in and your spot is secured. Next, we'll build your AI Clone across all three platforms, set up your ads and automations, and get your complete growth system running.",
    images: [{ src: managedGrowthImage, alt: "A full social media and ads growth system" }],
    nextSteps: MANAGED_PLAN_STEPS,
  },
};

export function normalizeThankYouProduct(value: unknown): ThankYouProductKey | null {
  if (value === "prompt-kit") return "ai-kit";
  const valid: ThankYouProductKey[] = [
    "brand-kit", "workbook", "ai-kit", "full-suite",
    "website-essentials", "foundation", "foundation-lsa", "starter", "growth",
  ];
  return valid.includes(value as ThankYouProductKey) ? (value as ThankYouProductKey) : null;
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

function OnboardingForm() {
  useEffect(() => {
    const SRC = "https://link.shopdollhouse.co/js/form_embed.js";
    if (document.querySelector(`script[src="${SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = SRC;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  return (
    <div className="overflow-hidden rounded-[22px] border border-[var(--gold)]/25 bg-white/76 p-2 md:p-3">
      <iframe
        src="https://link.shopdollhouse.co/widget/form/19McEhld3zciiZ48sQvc"
        id="inline-19McEhld3zciiZ48sQvc"
        title="New Client Onboarding Form / Questionnaire"
        data-form-id="19McEhld3zciiZ48sQvc"
        data-layout-iframe-id="inline-19McEhld3zciiZ48sQvc"
        data-height="4453"
        scrolling="no"
        style={{ width: "100%", minHeight: "1100px", border: "none", borderRadius: "12px", display: "block" }}
      />
    </div>
  );
}

function StepCard({ step, index, total }: { step: NextStep; index: number; total: number }) {
  return (
    <article className="rounded-[22px] border border-[var(--gold)]/25 bg-white/76 p-5 md:p-6">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--cream)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.2rem", fontWeight: 500 }}>
          {index + 1}
        </span>
        <div>
          <p className="text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.56rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            Step {index + 1} of {total}
          </p>
          <h3 className="mt-1 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.45rem", fontWeight: 500, lineHeight: 1.1 }}>{step.title}</h3>
        </div>
      </div>
      <p className="mt-3 text-[var(--ink)]/70" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", lineHeight: 1.6 }}>{step.body}</p>
    </article>
  );
}

function LaptopIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-[var(--gold)]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="5" width="16" height="11" rx="2" />
      <path d="M2.8 19h18.4" />
      <path d="M9 16h6" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-[var(--gold)]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 4.5h10a1.5 1.5 0 0 1 1.5 1.5v14l-6.5-3.6L5.5 20V6A1.5 1.5 0 0 1 7 4.5Z" />
      <path d="m10 9 1.2 1.1L14 7.4" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-[var(--gold)]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.2" />
      <path d="m5 8 7 5 7-5" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-[var(--gold)]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 11.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M15.5 12a2.6 2.6 0 1 0 0-5.2" />
      <path d="M3.5 19c.8-3.2 2.8-4.8 5-4.8s4.2 1.6 5 4.8" />
      <path d="M14 15c2.6.2 4.6 1.6 5.4 4" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-[var(--gold)]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5 13.7 9l5.3 1.8-5.3 1.8L12 18l-1.7-5.4L5 10.8 10.3 9 12 3.5Z" />
      <path d="M19 16.5 19.8 19l2.2.8-2.2.8L19 23l-.8-2.4-2.2-.8 2.2-.8.8-2.5Z" />
    </svg>
  );
}

function DeviceNote() {
  return (
    <div className="mx-auto flex max-w-[520px] items-center gap-3 rounded-full border border-[var(--gold)]/30 bg-[var(--cream)] px-5 py-3 shadow-[0_18px_45px_-38px_rgba(62,31,25,0.7)]">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/70">
        <LaptopIcon />
      </span>
      <p className="text-[var(--ink)]/68" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", lineHeight: 1.45 }}>
        Best viewed on laptop, desktop, or iPad. Your product isn't optimised for phone or mobile screens.
      </p>
    </div>
  );
}

function NoticeCard({
  eyebrow,
  title,
  icon,
  children,
  button,
  note,
}: {
  eyebrow?: string;
  title: string;
  icon: ReactNode;
  children: ReactNode;
  button?: { label: string; href: string; external?: boolean; variant?: "primary" | "accent" };
  note?: string;
}) {
  const isAccent = button?.variant === "accent";

  return (
    <article className="mx-auto max-w-[520px] rounded-[24px] border border-[rgba(200,164,100,0.3)] bg-[var(--cream)] p-6 shadow-[0_22px_60px_-48px_rgba(62,31,25,0.78)]">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--gold)]/20 bg-white/72">
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          {eyebrow ? (
            <p className="text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
              {eyebrow}
            </p>
          ) : null}
          <h3 className={eyebrow ? "mt-1 text-[var(--rose)]" : "text-[var(--rose)]"} style={{ fontFamily: FONT_DISPLAY, fontSize: "1.6rem", fontWeight: 500, lineHeight: 1.08 }}>
            {title}
          </h3>
        </div>
      </div>
      <div className="mt-4 space-y-3 text-[var(--ink)]/70" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", lineHeight: 1.65 }}>
        {children}
      </div>
      {button ? (
        <a
          href={button.href}
          target={button.external ? "_blank" : undefined}
          rel={button.external ? "noopener noreferrer" : undefined}
          className={`mt-5 flex w-full items-center justify-center rounded-full px-5 py-3.5 text-center transition-all hover:-translate-y-0.5 hover:opacity-90 ${isAccent ? "bg-[var(--rose)] text-white" : "bg-[var(--ink)] text-[var(--cream)]"}`}
          style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}
        >
          {button.label}
        </a>
      ) : null}
      {note ? (
        <p className="mt-3 text-center text-[var(--ink)]/50" style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", lineHeight: 1.55 }}>
          {note}
        </p>
      ) : null}
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
  const isService = product.kind === "service";
  const steps = product.nextSteps ?? [];
  const access = product.access ?? [];

  return (
    <main className="min-h-screen text-[var(--ink)]" style={{ background: "linear-gradient(145deg, #f7dfdb 0%, var(--cream) 52%, #f3d5cf 100%)" }}>
      <section className="px-5 pb-12 pt-12 md:px-8 md:pb-16 md:pt-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={archMark} alt="" className="h-11 w-8 opacity-55" />
              <p className="text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase" }}>{isService ? "Payment Confirmed" : "Purchase Complete"}</p>
            </div>
            <p className="mt-7 text-[var(--gold)]" style={{ fontFamily: FONT_SCRIPT, fontSize: "2.4rem", lineHeight: 0.8 }}>welcome to</p>
            <h1 className="mt-3 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(3rem, 7vw, 5.7rem)", fontWeight: 400, lineHeight: 0.88 }}>
              {product.shortName}
            </h1>
            <p className="mt-5 text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>{product.eyebrow}</p>
            <p className="mt-5 max-w-xl text-[var(--ink)]/68" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.75 }}>{product.message}</p>
            <div className="mt-7 inline-flex items-baseline gap-2 rounded-full border border-[var(--gold)]/25 bg-white/55 px-5 py-3">
              <span className="text-[var(--ink)]/48" style={{ fontFamily: FONT_LUXE, fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>{product.priceLabel ?? "Order total"}</span>
              <strong className="text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.8rem", fontWeight: 500 }}>{product.price}</strong>
              <span className="text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em" }}>USD</span>
            </div>
          </div>
          <ProductVisual product={product} />
        </div>
      </section>

      <section className="border-y border-[var(--gold)]/15 bg-white/42 px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-5xl">
          {isService ? (
            <>
              <div className="text-center">
                <p className="text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase" }}>What Happens Next</p>
                <h2 className="mt-3 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.35rem, 6vw, 4rem)", fontWeight: 400, lineHeight: 1 }}>You're officially in.</h2>
                <p className="mx-auto mt-3 max-w-xl text-[var(--ink)]/58" style={{ fontFamily: FONT_BODY, fontSize: "0.92rem", lineHeight: 1.65 }}>
                  Your setup is paid and your spot is secured. Here's exactly what happens from here.
                </p>
              </div>
              <div className="mx-auto mt-8 grid max-w-3xl gap-4">
                {steps.map((step, index) => <StepCard key={step.title} step={step} index={index} total={steps.length} />)}
              </div>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto mt-8 flex max-w-md items-center justify-center rounded-full bg-[var(--rose)] px-6 py-4 text-center text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
                style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase" }}
              >
                Book Your Kickoff Call →
              </a>

              <div className="mx-auto mt-12 max-w-3xl">
                <div className="text-center">
                  <p className="text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase" }}>One Quick Thing</p>
                  <h3 className="mt-3 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, lineHeight: 1.05 }}>Fill out your onboarding questionnaire.</h3>
                  <p className="mx-auto mt-3 max-w-xl text-[var(--ink)]/62" style={{ fontFamily: FONT_BODY, fontSize: "0.92rem", lineHeight: 1.65 }}>
                    Please complete every section as fully as you can. The more detail you give us, the better and faster your results — this is what we build everything from.
                  </p>
                </div>

                <div className="mx-auto mt-6 max-w-xl rounded-[22px] border border-[var(--gold)]/25 bg-white/76 p-6 text-left">
                  <p className="text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.35rem", fontWeight: 500 }}>Before you begin, have these ready</p>
                  <ul className="mt-4 space-y-2.5 text-[var(--ink)]/72" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", lineHeight: 1.5 }}>
                    {[
                      "Your logo and any brand files you already have",
                      "Your brand colours and fonts (if you have them)",
                      "A few photos of you, your team, and your work or products",
                      "Login details for the social platforms you want managed",
                      "Your website or domain login (if you already have a site)",
                      "Your main services, offers, and pricing",
                      "Your business hours, address, and contact details",
                      "A couple of brands or accounts whose style you love",
                    ].map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span className="mt-0.5 inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full" style={{ background: "#bd7476" }}>
                          <svg viewBox="0 0 16 16" width="9" height="9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5 6.2 11.5 13 4.5" /></svg>
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 border-t border-[var(--gold)]/20 pt-4 text-[var(--ink)]/62" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", lineHeight: 1.6 }}>
                    ⏱ Set aside about <strong className="text-[var(--rose)]">20–30 minutes</strong> to complete it in one sitting. Gathering the items above first makes it quick and easy — and the more complete it is, the sooner we can launch.
                  </p>
                </div>

                <div className="mt-6">
                  <OnboardingForm />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <p className="text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase" }}>Start Here</p>
                <h2 className="mt-3 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.35rem, 6vw, 4rem)", fontWeight: 400, lineHeight: 1 }}>Your access is ready.</h2>
                <p className="mx-auto mt-3 max-w-xl text-[var(--ink)]/58" style={{ fontFamily: FONT_BODY, fontSize: "0.92rem", lineHeight: 1.65 }}>
                  Open your workspace below. Save any password shown before you leave this page.
                </p>
              </div>
              <div className={`mt-8 grid gap-4 ${access.length > 1 ? "md:grid-cols-3" : "mx-auto max-w-xl"}`}>
                {access.map((item, index) => <AccessCard key={item.name} item={item} index={index} total={access.length} />)}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-5xl">
          {!isService && <DeviceNote />}

          <div className={`${isService ? "" : "mt-5"} space-y-4`}>
            {isService && (
              <NoticeCard eyebrow="A Warm Welcome" title="Welcome to The Dollhouse" icon={<SparkleIcon />}>
                <p>
                  I'm so happy you're here. You've just done what most business owners put off for years — and from here, we handle the heavy lifting so you can focus on running your business.
                </p>
                <p>
                  Complete your onboarding questionnaire above, book your kickoff call, and keep an eye on your inbox. We'll take it from here and start building your system right away.
                </p>
              </NoticeCard>
            )}

            {!isService && (
              <NoticeCard title="Save this page" icon={<BookmarkIcon />}>
                <p>
                  Bookmark this page or add it to your favourites now. It's your private home for your access link and password — so you can come back any time and never lose access, even if you misplace the email.
                </p>
              </NoticeCard>
            )}

            <NoticeCard title="Check your inbox" icon={<EnvelopeIcon />}>
              {isService ? (
                <>
                  <p>
                    We've emailed your receipt and onboarding details — keep an eye out so we can get started without delay.
                  </p>
                  <p>
                    Important: if it's not in your inbox within a few minutes, check your spam or junk folder. If you find it there, open it and mark it as 'Not spam' / 'Safe' so you never miss future emails from The Dollhouse.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    We've also emailed your access details to you — your website link and password (if your product needs one) are saved inside, so you'll always have them.
                  </p>
                  <p>
                    Important: if it's not in your inbox within a few minutes, check your spam or junk folder. If you find it there, open it and mark it as 'Not spam' / 'Safe' so you never miss future emails from The Dollhouse — including updates, bonuses, and account info.
                  </p>
                </>
              )}
            </NoticeCard>

            {!isService && (
              <NoticeCard
                eyebrow="The Insider Privilege"
                title="Join The Dollhouse Society"
                icon={<PeopleIcon />}
                button={{
                  label: "Request Entry Here →",
                  href: "https://www.facebook.com/groups/dollhousesociety/",
                  external: true,
                  variant: "accent",
                }}
                note="Please provide your purchase email in the entry questions so we can verify your membership."
              >
                <p>
                  As a Dollhouse customer, you're invited to join our private inner circle: The Dollhouse Society (Members Only).
                </p>
                <p>
                  We're currently building the foundation for our upcoming physical product launches. Join now to secure your spot as a founding member and get first access to our luxury collections.
                </p>
              </NoticeCard>
            )}

            {!isService && (
              <NoticeCard
                eyebrow="When you're ready for more"
                title="Want it all done for you?"
                icon={<SparkleIcon />}
                button={{
                  label: "Explore Done-For-You Marketing →",
                  href: "/services",
                }}
              >
                <p>
                  Once your brand foundation is set — or if you already have a business up and running — The Dollhouse can take it from here. Done-for-you content, AI Clone videos, ads, automations, and lead follow-up, all handled for you.
                </p>
              </NoticeCard>
            )}
          </div>

          <div className="mx-auto mt-7 max-w-[520px] text-center text-[var(--ink)]/55" style={{ fontFamily: FONT_BODY, fontSize: "0.86rem", lineHeight: 1.7 }}>
            {isService ? (
              <p>We're so excited to build this for you. You'll hear from us within 24 hours.</p>
            ) : (
              <p>Your access is yours forever. I'm so excited for you to see what's inside.</p>
            )}
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[var(--gold)]/20 pt-7 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-[var(--ink)]/62" style={{ fontFamily: FONT_BODY, fontSize: "0.86rem" }}>Questions about your {isService ? "order" : "access"}?</p>
              <a href="mailto:hello@shopdollhouse.co" className="text-[var(--rose)] underline underline-offset-4" style={{ fontFamily: FONT_BODY, fontSize: "0.86rem" }}>hello@shopdollhouse.co</a>
            </div>
            <a href={isService ? "/" : "/brand-room"} className="rounded-full border border-[var(--gold)]/35 bg-white/35 px-6 py-3 text-[var(--ink)] transition-colors hover:bg-white/65" style={{ fontFamily: FONT_LUXE, fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase" }}>
              {isService ? "Return to Home" : "Return to Brand Room"}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
