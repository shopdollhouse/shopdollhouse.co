import Navbar from "@/components/Navbar";
import Eyebrow from "@/components/Eyebrow";
import DollhouseArch from "@/components/DollhouseArch";
import HeartDivider from "@/components/HeartDivider";
import CornerFrame from "@/components/CornerFrame";
import LegalModal, { useLegalModal } from "@/components/LegalModal";
import useScrollReveal from "@/hooks/useScrollReveal";

// ─── Kit items ─────────────────────────────────────────────────────────────────
const kitItems = [
  {
    tag:      "The Foundation",
    name:     "The Dollhouse Brand Kit",
    price:    "$97",
    desc:     "The guided system that builds your entire brand from scratch — name, voice, visuals, positioning, and pricing, all decided in one process.",
    features: [
      "12-room brand-building framework",
      "Name, voice & visual identity",
      "Positioning, pricing & platform decided",
      "90-day action plan included",
      "5 colour theme options",
    ],
    link:     "https://stan.store/shopdollhouse/p/the-dollhouse--brand-starter-system-bet2kjnl",
    featured: true,
    badge:    "Start Here",
  },
  {
    tag:      "The Deep Dive",
    name:     "Brand Workbook",
    price:    "$47",
    desc:     "A structured 8-room workbook that walks you through every foundational brand decision — interactive, in your browser, with exercises and prompts.",
    features: [
      "8-room structured framework",
      "Interactive exercises in browser",
      "Messaging & positioning suite",
      "Offer workroom & growth strategy",
      "Bonus PDF workbook included",
    ],
    link:     "https://stan.store/shopdollhouse/p/-build-a-real-brand-from-scratch",
    featured: false,
    badge:    "Bonus PDF",
  },
  {
    tag:      "The Content Engine",
    name:     "AI Prompt Kit",
    price:    "$17",
    desc:     "50+ fill-in-the-blank AI prompts organized by room — captions, listings, emails, and content, all ready to customize and use.",
    features: [
      "50+ prompts across 8 categories",
      "Instagram captions & hooks",
      "Product listing templates",
      "Email marketing sequences",
      "Content calendar starters",
    ],
    link:     "https://stan.store/shopdollhouse/p/the-dollhouse-prompt-kit",
    featured: false,
    badge:    null,
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function LocalBusiness() {
  useScrollReveal();
  const { activeModal, openModal, closeModal } = useLegalModal();

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ─── HERO ─── */}
      <CornerFrame className="min-h-[82vh] flex items-center justify-center text-center px-10 py-16">
        <div className="flex flex-col items-center max-w-[600px] animate-rise-in">
          <div className="animate-float-arch mb-6">
            <DollhouseArch />
          </div>

          <Eyebrow text="The Starter Kit — 3 Tools, One Complete System" className="mb-6" />

          <div className="font-display italic font-normal text-dollhouse-text-light text-[17px] tracking-[6px] mt-6 mb-[2px]">
            the
          </div>
          <h1 className="font-display italic font-normal text-dollhouse-ink text-[clamp(44px,7vw,72px)] tracking-[8px] leading-none uppercase">
            Dollhouse
          </h1>
          <p className="font-accent text-[9px] tracking-[5px] uppercase text-dollhouse-gold font-semibold mt-1 mb-0">
            Brand Studio
          </p>

          <HeartDivider className="my-6" />

          <h2 className="font-display italic text-dollhouse-ink text-[clamp(22px,3.5vw,36px)] font-normal mb-5 leading-tight max-w-[500px]">
            Build Your Brand Before You Hand It Over.
          </h2>

          <p className="font-display italic text-dollhouse-text-mid text-[clamp(14px,2vw,17px)] tracking-[1px] leading-relaxed max-w-[420px]">
            Not ready for a done-for-you retainer yet? Start here — everything you need to build a solid brand foundation, on your own.
          </p>

          {/* Not a PDF callout */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-pill bg-dollhouse-p3/10 border border-dollhouse-p3/25">
            <span className="text-[14px]">✦</span>
            <span className="font-display italic text-[11px] tracking-wide text-dollhouse-text-mid">
              Not PDFs sitting in your inbox — live, interactive web apps
            </span>
          </div>

          <div className="w-px h-10 bg-dollhouse-p3 opacity-40 my-6" />

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#the-kit"
              className="inline-flex items-center gap-2.5 px-11 py-[14px] bg-dollhouse-ink text-card rounded-pill font-accent text-[10px] tracking-[3px] uppercase font-medium transition-all duration-300 hover:shadow-lg hover:shadow-dollhouse-ink/10 hover:-translate-y-0.5 no-underline"
            >
              See What's Inside ↓
            </a>
            <a
              href="/"
              className="font-display italic text-[13px] text-dollhouse-text-mid font-light tracking-wide no-underline border-b border-dollhouse-p3/40 pb-px hover:text-dollhouse-ink hover:border-dollhouse-ink transition-colors duration-200"
            >
              View Agency Services →
            </a>
          </div>

          {/* Value callout */}
          <div className="inline-flex items-center gap-3 mt-7 px-5 py-2.5 rounded-pill bg-dollhouse-p3/10 border border-dollhouse-p3/20">
            <span className="text-[14px] text-dollhouse-p3">✦</span>
            <span className="font-display italic text-[12px] text-dollhouse-text-mid">
              Brand Kit + Workbook + Prompt Kit — <strong className="font-normal text-dollhouse-ink">$161 total</strong>, no overlap, zero fluff
            </span>
          </div>
        </div>
      </CornerFrame>

      {/* ─── HOW IT WORKS STRIP ─── */}
      <section className="border-y border-dollhouse-p2/40 bg-dollhouse-p1/50 py-8 px-6">
        <div className="max-w-[900px] mx-auto">
          <p className="font-accent text-[9px] tracking-[3px] uppercase text-dollhouse-text-light text-center mb-8">The Recommended Order</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { step: "01", name: "Brand Kit",     desc: "Start here. Build your complete brand identity — name, voice, visuals, and positioning all decided." },
              { step: "02", name: "Brand Workbook", desc: "Go deeper. Structured exercises for messaging, offers, growth strategy, and client experience." },
              { step: "03", name: "AI Prompt Kit",  desc: "Put it to work. 50+ prompts to turn your brand into captions, listings, emails, and content daily." },
            ].map(item => (
              <div key={item.step} className="flex flex-col items-center">
                <span className="font-display italic text-[44px] text-dollhouse-p3 leading-none mb-2">{item.step}</span>
                <p className="font-accent text-[9px] tracking-[3px] uppercase text-dollhouse-ink mb-2">{item.name}</p>
                <p className="text-[13px] text-dollhouse-text-light font-light leading-relaxed max-w-[220px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GOLD LINE ─── */}
      <div className="gold-line h-px max-w-[200px] mx-auto my-8" />

      {/* ─── THE KIT ─── */}
      <section id="the-kit" className="px-6 py-10 max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <Eyebrow text="What's Included" className="mb-4" />
          <h2 className="font-display italic font-normal text-dollhouse-ink text-[clamp(28px,4vw,48px)]">
            Three Tools.<br />One Complete System.
          </h2>
          <p className="text-[13px] text-dollhouse-text-light font-light mt-3 max-w-[420px] mx-auto leading-relaxed">
            Pair them together for the fastest path from idea to a brand that's ready to hand to an agency — or run yourself.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {kitItems.map((item, i) => (
            <div
              key={item.name}
              className={`dh-reveal d${i + 1} luxury-card rounded-2xl p-9 flex flex-col relative border
                ${item.featured
                  ? "bg-card border-dollhouse-gold/50 shadow-[0_24px_70px_-20px_hsl(36_60%_58%_/0.18)] md:-translate-y-4"
                  : "bg-card border-dollhouse-p2/50"
                }`}
            >
              {item.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className={`font-accent text-[8px] tracking-[2.5px] uppercase px-4 py-1.5 rounded-pill font-bold whitespace-nowrap
                    ${item.featured ? "bg-dollhouse-gold text-dollhouse-ink" : "bg-dollhouse-p3 text-dollhouse-ink"}`}>
                    {item.badge.toUpperCase()}
                  </span>
                </div>
              )}

              <p className="font-accent text-[9px] tracking-[3px] uppercase text-dollhouse-gold mb-2">{item.tag}</p>
              <h3 className="font-display italic font-normal text-dollhouse-ink text-[clamp(20px,2.5vw,28px)] leading-tight mb-2">
                {item.name}
              </h3>
              <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-pill bg-dollhouse-p3/10 border border-dollhouse-p3/20">
                <span className="text-dollhouse-p3 text-[9px]">✦</span>
                <span className="font-accent text-[7px] tracking-[2px] uppercase text-dollhouse-text-mid">Interactive Web App</span>
              </div>
              <div className="mb-4 leading-none">
                <span className="font-display italic text-[48px] font-normal text-dollhouse-ink tracking-tight">{item.price}</span>
                <span className="text-[13px] font-light text-dollhouse-text-light ml-1">USD</span>
              </div>

              <p className="text-[13.5px] text-dollhouse-text-mid font-light leading-relaxed mb-5">{item.desc}</p>

              <HeartDivider className="mb-5 opacity-50" />

              <ul className="flex flex-col gap-3 flex-1 mb-8 list-none p-0">
                {item.features.map(f => (
                  <li key={f} className="flex gap-3 items-start text-[13px] leading-snug">
                    <span className="text-dollhouse-gold text-[10px] mt-0.5 flex-shrink-0">✦</span>
                    <span className="text-dollhouse-text-mid">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center font-accent text-[9px] tracking-[2px] uppercase py-3.5 rounded-pill transition-all no-underline hover:opacity-85
                  ${item.featured ? "bg-dollhouse-ink text-card" : "border border-dollhouse-ink text-dollhouse-ink hover:bg-dollhouse-ink hover:text-card"}`}
              >
                Get {item.name.includes("Brand Kit") ? "the Brand Kit" : item.name.includes("Workbook") ? "the Workbook" : "the Prompt Kit"} →
              </a>
            </div>
          ))}
        </div>

        {/* Value row */}
        <div className="dh-reveal mt-12 border border-dollhouse-p2/50 rounded-2xl bg-card px-8 py-7 flex flex-wrap gap-6 items-center justify-between">
          <div>
            <Eyebrow text="All Three Together" className="mb-3" />
            <h3 className="font-display italic font-normal text-dollhouse-ink text-[clamp(18px,2.5vw,28px)] leading-tight">
              Brand Kit + Workbook + AI Prompt Kit
            </h3>
            <p className="text-[13px] text-dollhouse-text-light font-light mt-2 max-w-[420px] leading-relaxed">
              Everything you need to launch a brand that's ready to hand to an agency — or run yourself.
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-accent text-[9px] tracking-[2px] uppercase text-dollhouse-text-light mb-1">Total value</p>
            <p className="font-display italic text-[44px] text-dollhouse-ink leading-none">$161</p>
            <p className="font-accent text-[9px] tracking-[2px] uppercase text-dollhouse-text-light mt-1">purchased individually</p>
          </div>
        </div>
      </section>

      {/* ─── GOLD LINE ─── */}
      <div className="gold-line h-px max-w-[200px] mx-auto my-5" />

      {/* ─── AGENCY CALLOUT ─── */}
      <section className="bg-dollhouse-ink px-6 py-16 text-center">
        <div className="max-w-[560px] mx-auto">
          <div className="animate-float-arch mb-6">
            <DollhouseArch className="mx-auto opacity-30" />
          </div>

          <Eyebrow text="Ready for More?" className="mb-6 !border-dollhouse-p3/20 !bg-transparent !text-card/60" />

          <h2 className="font-display italic font-normal text-card text-[clamp(28px,4vw,48px)] mb-4">
            When You're Ready to<br />Hand It Over to Us
          </h2>
          <p className="text-[13px] text-card/50 font-light leading-relaxed mb-8 max-w-[440px] mx-auto">
            Once your brand is built, The Dollhouse agency handles everything — content, scheduling, ads, email, and growth. Starting at $1,000/month USD.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2.5 px-11 py-[14px] bg-dollhouse-gold text-dollhouse-ink rounded-pill font-accent text-[10px] tracking-[3px] uppercase font-bold transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 no-underline"
          >
            View Agency Services →
          </a>
          <p className="mt-4 font-accent text-[8px] tracking-[2px] uppercase text-card/25">
            Done-for-you · Starting at $1,000/mo
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-12 text-center border-t border-dollhouse-p3/15">
        <HeartDivider className="mb-8" />
        <div className="font-display italic text-dollhouse-text-light text-[15px] tracking-[6px] mb-[2px]">
          the
        </div>
        <p className="font-display italic text-dollhouse-ink text-2xl tracking-[6px] uppercase mb-1">
          Dollhouse
        </p>
        <p className="font-accent text-[8px] tracking-[4px] uppercase text-dollhouse-gold font-semibold mb-4">
          Brand Studio
        </p>
        <p className="text-[12px] text-dollhouse-text-light font-light mb-6">
          Starter kits for new brands · Done-for-you agency for growing businesses
        </p>

        <div className="flex justify-center gap-5 mb-5 flex-wrap">
          {[
            { label: "Privacy Policy", key: "privacy" },
            { label: "Terms of Use",   key: "terms" },
            { label: "Refund Policy",  key: "refund" },
            { label: "Contact",        key: "contact" },
          ].map(l => (
            <button
              key={l.key}
              onClick={() => openModal(l.key)}
              className="font-accent text-[8px] tracking-[2px] uppercase text-dollhouse-text-light bg-transparent border-none cursor-pointer hover:text-dollhouse-ink transition-colors p-0"
            >
              {l.label}
            </button>
          ))}
        </div>

        <p className="font-accent text-[8px] tracking-[3px] uppercase text-dollhouse-p3 mb-6">
          © {new Date().getFullYear()} The Dollhouse · All Rights Reserved
        </p>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-transparent border border-dollhouse-p3/30 rounded-pill px-5 py-2 cursor-pointer font-accent text-[8px] tracking-[3px] uppercase text-dollhouse-text-light hover:text-dollhouse-ink transition-colors"
        >
          ↑ Back to Top
        </button>
      </footer>

      <LegalModal activeModal={activeModal} onClose={closeModal} />
    </div>
  );
}
