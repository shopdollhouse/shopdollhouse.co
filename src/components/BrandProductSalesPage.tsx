import { Link } from "@tanstack/react-router";
import archMark from "@/assets/arch-mark.svg";
import bgImage from "@/assets/password-bg.jpg";

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_SCRIPT = "'Allura', cursive";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";

export type BrandProduct = {
  eyebrow: string;
  name: string;
  shortName: string;
  price: string;
  value?: string;
  regular?: string;
  checkoutUrl: string;
  tagline: string;
  intro: string;
  painHeadline: string;
  painBody: string;
  imageTitle: string;
  imageSubtitle: string;
  imageItems: string[];
  insideTitle: string;
  inside: { title: string; body: string }[];
  outcomes: string[];
  perfectFor: string[];
  bonuses?: string[];
  faqs: { q: string; a: string }[];
  finalCta: string;
  accent: "brand" | "workbook" | "ai";
  productImage?: string;
};

const productColors = {
  brand: {
    rose: "#bd7476",
    deep: "#28130f",
    tint: "#f7ded8",
  },
  workbook: {
    rose: "#b97362",
    deep: "#2f1711",
    tint: "#f1ddd2",
  },
  ai: {
    rose: "#c65e64",
    deep: "#26110f",
    tint: "#f8e4df",
  },
};

function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-40 border-b border-[var(--gold)]/12 bg-[rgba(255,250,246,0.78)] px-6 py-4 backdrop-blur-md md:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link to="/" className="flex flex-col items-start leading-tight no-underline">
          <span style={{ fontFamily: FONT_SCRIPT, fontSize: "18px", letterSpacing: "1px", textTransform: "lowercase", lineHeight: 1, color: "color-mix(in oklab, var(--ink) 55%, transparent)" }}>
            the
          </span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: "15px", letterSpacing: "4px", textTransform: "uppercase", marginTop: "-4px", color: "var(--ink)", fontStyle: "italic" }}>
            Dollhouse
          </span>
          <span style={{ fontFamily: FONT_LUXE, fontSize: "6.5px", letterSpacing: "3px", textTransform: "uppercase", marginTop: "1px", color: "var(--gold)", fontWeight: 600 }}>
            Brand Studio
          </span>
        </Link>
        <div className="hidden items-center gap-8 md:flex" style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(30,15,10,0.56)" }}>
          <Link to="/brand-room" className="hover:text-[var(--rose)]">Brand Room</Link>
          <Link to="/quiz" className="hover:text-[var(--rose)]">Quiz</Link>
          <a href="/#contact" className="hover:text-[var(--rose)]">Marketing</a>
        </div>
        <Link to="/brand-room" className="rounded-full bg-[var(--ink)] px-4 py-2.5 text-[var(--cream)] transition-opacity hover:opacity-90" style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase" }}>
          Back
        </Link>
      </div>
    </nav>
  );
}

function Divider() {
  return (
    <div className="my-4 flex items-center justify-center gap-2 text-[var(--gold)]">
      <span className="h-px w-16 bg-current opacity-50" />
      <svg viewBox="0 0 12 10" className="h-2.5 w-2.5 fill-current">
        <path d="M6 9 L0.5 3.5 a2.2 2.2 0 0 1 3.1 -3.1 L6 2.8 l2.4 -2.4 a2.2 2.2 0 0 1 3.1 3.1 Z" />
      </svg>
      <span className="h-px w-16 bg-current opacity-50" />
    </div>
  );
}

function WebpagePreviewScreen({ product, compact = false }: { product: BrandProduct; compact?: boolean }) {
  const colors = productColors[product.accent];
  const navItems = product.imageItems.slice(0, 3);
  const cards = product.inside.slice(0, compact ? 2 : 4);

  return (
    <div className="h-full w-full overflow-hidden rounded-[inherit]" style={{ background: "linear-gradient(135deg, #fff8f4 0%, #f5ded8 100%)" }}>
      <div className="flex items-center justify-between border-b border-[rgba(200,168,100,0.18)] bg-white/62 px-4 py-3">
        <div className="flex flex-col leading-none">
          <span style={{ fontFamily: FONT_SCRIPT, fontSize: compact ? "12px" : "16px", color: "rgba(30,15,10,0.48)", lineHeight: 0.8 }}>the</span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: compact ? "10px" : "13px", letterSpacing: "0.18em", color: "var(--ink)", textTransform: "uppercase" }}>Dollhouse</span>
        </div>
        <div className={`${compact ? "hidden" : "hidden gap-2 sm:flex"}`}>
          {navItems.map((item) => (
            <span key={item} className="rounded-full bg-[rgba(255,255,255,0.72)] px-2 py-1 text-[5px] uppercase tracking-[0.12em] text-[var(--ink)]/42" style={{ fontFamily: FONT_LUXE }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className={`grid h-[calc(100%-42px)] min-w-0 gap-3 p-4 ${compact ? "" : "sm:grid-cols-[0.7fr_1fr]"}`}>
        <div className="flex flex-col justify-center text-center sm:text-left">
          <img src={archMark} alt="" className="mx-auto mb-2 h-7 w-5 opacity-50 sm:mx-0" />
          <p className="uppercase tracking-luxe" style={{ fontFamily: FONT_LUXE, fontSize: compact ? "5px" : "7px", color: "var(--gold)" }}>{product.eyebrow}</p>
          <h3 className="mt-2 leading-[0.95]" style={{ fontFamily: FONT_DISPLAY, fontSize: compact ? "1.45rem" : "clamp(1.8rem, 4vw, 3rem)", color: colors.rose, fontWeight: 400, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            {product.imageTitle}
          </h3>
          {!compact && (
            <p className="mt-3 max-w-[14rem] text-[var(--ink)]/52" style={{ fontFamily: FONT_BODY, fontSize: "0.65rem", lineHeight: 1.55 }}>
              {product.imageSubtitle}
            </p>
          )}
        </div>

        <div className="grid min-w-0 content-center gap-2">
          {cards.map((card, index) => (
            <div key={card.title} className="rounded-xl bg-white/62 p-3" style={{ border: "1px solid rgba(200,168,100,0.18)" }}>
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[7px] italic" style={{ fontFamily: FONT_DISPLAY, background: `${colors.rose}18`, color: colors.rose }}>
                  {index + 1}
                </span>
                <p className="min-w-0 truncate text-[var(--ink)]/72" style={{ fontFamily: FONT_DISPLAY, fontSize: compact ? "0.72rem" : "0.9rem" }}>{card.title}</p>
              </div>
              {!compact && <div className="mt-2 h-1.5 w-full rounded-full bg-[rgba(200,168,100,0.14)]" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DeviceShowcase({ product }: { product: BrandProduct }) {
  return (
    <div className="mt-8">
      <p className="text-center uppercase tracking-[0.18em] text-[var(--ink)]/42" style={{ fontFamily: FONT_LUXE, fontSize: "8px" }}>
        Desktop · Laptop · Tablet Preview
      </p>

      <div className="mt-4 rounded-[24px] bg-[var(--ink)] p-3 shadow-[0_22px_46px_-30px_rgba(30,15,10,0.8)]">
        <div className="aspect-[16/9] overflow-hidden rounded-[16px] bg-white">
          <WebpagePreviewScreen product={product} />
        </div>
      </div>
      <div className="mx-auto h-6 w-20 rounded-b-[12px] bg-[var(--ink)]/90" />
      <div className="mx-auto h-2 w-44 rounded-full bg-[rgba(40,19,15,0.18)]" />

      <div className="mt-5 grid grid-cols-[1.25fr_0.72fr] items-end gap-3">
        <div className="min-w-0">
          <div className="rounded-[18px] bg-[var(--ink)] p-2 shadow-[0_18px_38px_-28px_rgba(30,15,10,0.75)]">
            <div className="aspect-[16/10] overflow-hidden rounded-[12px] bg-white">
              <WebpagePreviewScreen product={product} compact />
            </div>
          </div>
          <div className="mx-auto h-2 w-[92%] rounded-b-full bg-[rgba(40,19,15,0.78)]" />
        </div>

        <div className="min-w-0 rounded-[22px] bg-[var(--ink)] p-2 shadow-[0_18px_38px_-28px_rgba(30,15,10,0.75)]">
          <div className="aspect-[4/5] overflow-hidden rounded-[16px] bg-white">
            <WebpagePreviewScreen product={product} compact />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductMockup({ product }: { product: BrandProduct }) {
  const colors = productColors[product.accent];

  if (product.productImage) {
    return (
      <figure className="relative min-w-0 overflow-hidden rounded-[34px] border border-white/80 bg-[rgba(255,250,246,0.72)] p-3 shadow-[0_38px_90px_-48px_rgba(90,45,35,0.65)] md:p-4">
        <div aria-hidden className="absolute -left-20 top-8 h-56 w-56 rounded-full blur-3xl" style={{ background: `${colors.rose}2b` }} />
        <div aria-hidden className="absolute -right-12 bottom-10 h-52 w-52 rounded-full blur-3xl" style={{ background: "rgba(200,168,100,0.22)" }} />
        <img
          src={product.productImage}
          alt={`${product.name} product preview on desktop, laptop, and tablet`}
          className="relative aspect-[3/2] w-full rounded-[26px] object-cover shadow-[0_24px_60px_-34px_rgba(30,15,10,0.72)]"
        />
      </figure>
    );
  }

  return (
    <figure className="relative min-w-0 overflow-hidden rounded-[34px] border border-white/80 bg-[rgba(255,250,246,0.72)] p-5 shadow-[0_38px_90px_-48px_rgba(90,45,35,0.65)] md:p-7">
      <img src={bgImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-18" />
      <div className="absolute inset-0 bg-[rgba(255,250,246,0.54)]" />
      <div aria-hidden className="absolute -left-20 top-8 h-56 w-56 rounded-full blur-3xl" style={{ background: `${colors.rose}2b` }} />
      <div aria-hidden className="absolute -right-12 bottom-10 h-52 w-52 rounded-full blur-3xl" style={{ background: "rgba(200,168,100,0.22)" }} />
      <div className="relative min-w-0 rounded-[28px] border border-[rgba(200,168,100,0.26)] bg-[rgba(255,250,246,0.76)] p-6 text-center md:p-7">
        <img src={archMark} alt="" className="mx-auto h-16 w-12 opacity-65" />
        <p className="mt-6 tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px", color: "var(--gold)" }}>{product.eyebrow}</p>
        <p className="mt-3 italic leading-none" style={{ fontFamily: FONT_SCRIPT, fontSize: "2.6rem", color: "var(--gold)" }}>the</p>
        <h2 className="mt-1 leading-[0.94]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.7rem, 5vw, 4.35rem)", fontWeight: 400, letterSpacing: "0.035em", color: colors.rose, textTransform: "uppercase", overflowWrap: "anywhere" }}>
          {product.imageTitle}
        </h2>
        <Divider />
        <p className="mx-auto max-w-md leading-7 text-[var(--ink)]/68" style={{ fontFamily: FONT_BODY, fontSize: "0.98rem" }}>{product.imageSubtitle}</p>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {product.imageItems.map((item) => (
            <div key={item} className="rounded-2xl bg-white/60 px-3 py-4 text-center" style={{ border: "1px solid rgba(200,168,100,0.22)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke={colors.rose} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 h-6 w-6">
                <path d="M12 3.5 19.5 8v8L12 20.5 4.5 16V8L12 3.5Z" />
                <path d="M12 12 19.5 8M12 12 4.5 8M12 12v8.5" />
              </svg>
              <p className="text-[8px] uppercase tracking-[0.14em] text-[var(--ink)]/58" style={{ fontFamily: FONT_LUXE }}>{item}</p>
            </div>
          ))}
        </div>

        <DeviceShowcase product={product} />
      </div>
    </figure>
  );
}

function PricePanel({ product }: { product: BrandProduct }) {
  return (
    <aside className="rounded-[28px] bg-[var(--ink)] p-7 text-[var(--cream)] shadow-[0_34px_80px_-42px_rgba(30,15,10,0.8)] md:p-8">
      <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>Instant Access</p>
      <div className="mt-5 flex items-baseline gap-3">
        <span className="italic text-[var(--gold)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(3rem, 6vw, 4.4rem)", lineHeight: 1 }}>{product.price}</span>
        {product.regular && <span className="line-through text-[var(--cream)]/30" style={{ fontFamily: FONT_BODY, fontSize: "1.05rem" }}>{product.regular}</span>}
      </div>
      {product.value && (
        <p className="mt-1 text-[var(--cream)]/42" style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>{product.value}</p>
      )}
      <a href={product.checkoutUrl} className="mt-7 block rounded-full px-6 py-4 text-center transition-all hover:-translate-y-0.5" style={{ background: "var(--gold)", color: "var(--ink)", fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}>
        Get Instant Access →
      </a>
      <p className="mt-4 text-center text-[var(--cream)]/38" style={{ fontFamily: FONT_BODY, fontSize: "0.78rem" }}>Private browser access · Digital product · All sales final</p>
      <div className="mt-7 border-t border-[rgba(200,168,100,0.18)] pt-6">
        <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "9px" }}>Best next step</p>
        <p className="mt-2 leading-6 text-[var(--cream)]/68" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem" }}>
          After your foundation is clear, apply for The Dollhouse managed marketing service so your content, automations, and lead follow-up can run for you.
        </p>
        <Link to="/#contact" className="mt-4 inline-flex text-[var(--gold)] underline decoration-[var(--gold)]/35 underline-offset-4" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.05rem", fontStyle: "italic" }}>
          Apply for marketing support →
        </Link>
      </div>
    </aside>
  );
}

export function BrandProductSalesPage({ product }: { product: BrandProduct }) {
  return (
    <main className="min-h-screen bg-[var(--blush)] text-[var(--ink)]">
      <Nav />

      <section className="relative overflow-hidden px-5 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">
        <div aria-hidden className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(ellipse at 50% 8%, rgba(255,255,255,0.92), transparent 58%), linear-gradient(135deg, #f4dcdc 0%, #fbf1ed 48%, #ead0c9 100%)" }} />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/45 bg-white/45 px-5 py-2 text-[var(--gold)]">
              <span style={{ fontSize: "0.55rem" }}>✦</span>
              <span className="text-[10px] font-semibold uppercase tracking-luxe" style={{ fontFamily: FONT_LUXE }}>{product.eyebrow}</span>
              <span style={{ fontSize: "0.55rem" }}>✦</span>
            </div>
            <h1 className="mt-7 text-[var(--rose)] leading-[0.96]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(3rem, 7.2vw, 6.2rem)", fontWeight: 400, letterSpacing: "0.035em", textTransform: "uppercase" }}>
              {product.name}
            </h1>
            <p className="mt-5 max-w-2xl text-[var(--ink)]/72 leading-8 lg:mx-0" style={{ fontFamily: FONT_BODY, fontSize: "clamp(1rem, 1.7vw, 1.16rem)" }}>
              {product.tagline}
            </p>
            <p className="mt-4 max-w-2xl text-[var(--ink)]/58 leading-7" style={{ fontFamily: FONT_BODY, fontSize: "0.98rem" }}>
              {product.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a href={product.checkoutUrl} className="btn-ink text-center">
                {product.finalCta} <span aria-hidden>→</span>
              </a>
              <a href="#inside" className="btn-ghost text-center">
                See What’s Inside <span aria-hidden>↓</span>
              </a>
            </div>
          </div>
          <ProductMockup product={product} />
        </div>
      </section>

      <section className="bg-[var(--cream)] px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.42fr]">
          <div className="rounded-[32px] p-8 md:p-12" style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.76), rgba(251,240,235,0.7))", border: "1px solid color-mix(in oklab, var(--gold) 26%, transparent)" }}>
            <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>Why this works</p>
            <h2 className="mt-4 text-[var(--rose)] leading-tight" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: 400 }}>
              {product.painHeadline}
            </h2>
            <p className="mt-5 max-w-3xl text-[var(--ink)]/68 leading-8" style={{ fontFamily: FONT_BODY, fontSize: "1rem" }}>
              {product.painBody}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {product.outcomes.map((item) => (
                <div key={item} className="rounded-2xl bg-white/60 p-5" style={{ border: "1px solid color-mix(in oklab, var(--gold) 24%, transparent)" }}>
                  <p className="text-[var(--ink)]/72" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem", lineHeight: 1.6 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <PricePanel product={product} />
        </div>
      </section>

      <section id="inside" className="px-6 py-24" style={{ background: "linear-gradient(135deg, #f4dcdc 0%, #f7e6dc 45%, #f1d3cf 100%)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>What’s Inside</p>
            <h2 className="mt-4 text-[var(--rose)] leading-tight" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 400 }}>
              {product.insideTitle}
            </h2>
            <Divider />
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {product.inside.map((item) => (
              <article key={item.title} className="rounded-[24px] bg-[rgba(255,250,246,0.64)] p-6" style={{ border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)", boxShadow: "0 20px 46px -34px rgba(120,70,60,0.45)" }}>
                <img src={archMark} alt="" className="h-9 w-7 opacity-45" />
                <h3 className="mt-5 text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.45rem", lineHeight: 1.12 }}>{item.title}</h3>
                <p className="mt-3 text-[var(--ink)]/62 leading-relaxed" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem" }}>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <div>
            <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>Perfect For</p>
            <h2 className="mt-4 text-[var(--rose)] leading-tight" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 4vw, 3.4rem)", fontWeight: 400 }}>
              Founders who want clarity before they spend more.
            </h2>
          </div>
          <div className="grid gap-3">
            {product.perfectFor.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/58 p-4" style={{ border: "1px solid color-mix(in oklab, var(--gold) 24%, transparent)" }}>
                <svg viewBox="0 0 16 16" fill="none" stroke="var(--gold)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 h-4 w-4 shrink-0"><path d="M2.5 8.5L6 12L13.5 4.5" /></svg>
                <p className="text-[var(--ink)]/68" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem", lineHeight: 1.6 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {product.bonuses && (
        <section className="px-6 py-20" style={{ background: "var(--ink)" }}>
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>Bonuses Included</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {product.bonuses.map((bonus) => (
                <div key={bonus} className="rounded-2xl border border-[rgba(200,168,100,0.2)] bg-white/[0.055] px-5 py-4 text-[var(--cream)]/72" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem" }}>
                  {bonus}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[var(--cream)] px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>Questions</p>
            <h2 className="mt-4 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400 }}>
              Good to know
            </h2>
            <Divider />
          </div>
          <div className="mt-10 space-y-3">
            {product.faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl bg-white/64 px-6 py-5 [&_summary::-webkit-details-marker]:hidden" style={{ border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)" }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.18rem" }}>
                  {faq.q}
                  <span className="shrink-0 text-2xl text-[var(--rose)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[var(--ink)]/65 leading-relaxed" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem" }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 text-center" style={{ background: "linear-gradient(135deg, #f4dcdc 0%, #fbf1ed 48%, #ead0c9 100%)" }}>
        <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>Stop guessing. Start building.</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-[var(--rose)] leading-tight" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 400 }}>
          Your dream brand starts here.
        </h2>
        <a href={product.checkoutUrl} className="btn-ink mt-8 inline-flex">
          {product.finalCta} <span aria-hidden>→</span>
        </a>
        <p className="mt-5 text-[var(--ink)]/42" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem" }}>All sales final due to instant digital access.</p>
      </section>
    </main>
  );
}
