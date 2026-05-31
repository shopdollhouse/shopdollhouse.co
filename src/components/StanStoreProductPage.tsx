import type { BrandProduct } from "@/components/BrandProductSalesPage";
import archMark from "@/assets/arch-mark.svg";

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

function Button({ product, label = "Get Instant Access" }: { product: BrandProduct; label?: string }) {
  return (
    <a
      href={product.checkoutUrl}
      className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--ink)] px-7 py-3.5 text-center text-[var(--cream)] shadow-[0_16px_34px_-26px_rgba(30,15,10,0.88)] transition-all hover:-translate-y-0.5 hover:opacity-90"
      style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}
    >
      {label} <span aria-hidden className="ml-2">→</span>
    </a>
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
      <span className="text-[var(--ink)]/68" style={{ fontFamily: FONT_BODY, fontSize: "0.98rem", lineHeight: 1.6 }}>{children}</span>
    </li>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>{eyebrow}</p>
      <h2 className="mt-3 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.1rem, 6vw, 4rem)", fontWeight: 400, lineHeight: 1 }}>
        {title}
      </h2>
      <Divider />
    </div>
  );
}

export function StanStoreProductPage({ product }: { product: BrandProduct }) {
  const allSalesFinal = product.faqs.find((faq) => faq.q.toLowerCase().includes("refund"))?.a ?? "Because this is a digital product with instant access, all sales are final.";

  return (
    <main className="min-h-screen bg-[var(--blush)] text-[var(--ink)]">
      <section className="relative overflow-hidden px-5 pb-16 pt-10 md:px-8 md:pb-24 md:pt-14">
        <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(circle at 14% 2%, rgba(219,150,144,0.28), transparent 22%), radial-gradient(circle at 92% 12%, rgba(219,150,144,0.24), transparent 20%), linear-gradient(180deg, #fff8f3 0%, #f8e5df 100%)" }} />
        <div className="relative mx-auto max-w-5xl text-center">
          <img src={archMark} alt="" className="mx-auto h-16 w-12 opacity-65" />
          <p className="mt-6 text-[var(--rose)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.76rem", letterSpacing: "0.24em", textTransform: "uppercase", fontWeight: 700 }}>{product.eyebrow}</p>
          <p className="mt-8 italic leading-none text-[var(--rose)]" style={{ fontFamily: FONT_SCRIPT, fontSize: "clamp(3rem, 8vw, 5rem)" }}>the</p>
          <h1 className="mt-1 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(3.2rem, 11vw, 7.2rem)", lineHeight: 0.88, fontWeight: 400, letterSpacing: "0.035em", textTransform: "uppercase" }}>
            {product.name.replace("The Dollhouse ", "")}
          </h1>
          <p className="mt-6 text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.78rem", letterSpacing: "0.35em", textTransform: "uppercase", fontWeight: 700 }}>The Dollhouse</p>
          <p className="mx-auto mt-8 max-w-3xl text-[var(--ink)]/76" style={{ fontFamily: FONT_BODY, fontSize: "clamp(1.05rem, 2.5vw, 1.35rem)", lineHeight: 1.65 }}>
            {product.tagline}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button product={product} label={product.finalCta} />
            <a href="#details" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--ink)]/35 px-7 py-3.5 text-center text-[var(--ink)] transition-all hover:bg-white/40" style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>
              See Details ↓
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-5 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          {product.productImage && (
            <img
              src={product.productImage}
              alt={`${product.name} product preview`}
              className="aspect-[3/2] w-full rounded-[28px] border border-white/80 object-cover shadow-[0_32px_80px_-48px_rgba(90,45,35,0.72)]"
            />
          )}
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {product.imageItems.map((item) => (
              <div key={item} className="rounded-[20px] bg-[var(--blush)]/60 px-5 py-5 text-center" style={{ border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)" }}>
                <img src={archMark} alt="" className="mx-auto mb-3 h-8 w-6 opacity-45" />
                <p className="text-[var(--ink)]/68" style={{ fontFamily: FONT_LUXE, fontSize: "0.66rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="details" className="px-5 py-16 md:px-8 md:py-24" style={{ background: "linear-gradient(180deg, #f8e5df 0%, #fff8f3 100%)" }}>
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.42fr]">
          <div className="rounded-[30px] bg-white/58 p-7 md:p-10" style={{ border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)" }}>
            <p className="text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>Why You Need This</p>
            <h2 className="mt-4 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 5vw, 3.6rem)", lineHeight: 1, fontWeight: 400 }}>{product.painHeadline}</h2>
            <p className="mt-5 text-[var(--ink)]/68" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.75 }}>{product.painBody}</p>
            <p className="mt-4 text-[var(--ink)]/58" style={{ fontFamily: FONT_BODY, fontSize: "0.96rem", lineHeight: 1.7 }}>{product.intro}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {product.outcomes.map((item) => <CheckItem key={item}>{item}</CheckItem>)}
            </ul>
          </div>

          <aside className="rounded-[30px] bg-[var(--ink)] p-7 text-[var(--cream)] lg:sticky lg:top-6 lg:self-start">
            <p className="text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>Instant Access</p>
            <div className="mt-5 flex items-baseline gap-3">
              <span className="italic text-[var(--gold)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "4.4rem", lineHeight: 1 }}>{product.price}</span>
              {product.regular && <span className="text-[var(--cream)]/34 line-through" style={{ fontFamily: FONT_BODY, fontSize: "1.05rem" }}>{product.regular}</span>}
            </div>
            {product.value && <p className="text-[var(--cream)]/45" style={{ fontFamily: FONT_LUXE, fontSize: "0.7rem", letterSpacing: "0.13em", textTransform: "uppercase" }}>{product.value}</p>}
            <a href={product.checkoutUrl} className="mt-7 block rounded-full bg-[var(--gold)] px-6 py-4 text-center text-[var(--ink)] transition-all hover:-translate-y-0.5" style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}>
              Get Instant Access →
            </a>
            <p className="mt-4 text-center text-[var(--cream)]/42" style={{ fontFamily: FONT_BODY, fontSize: "0.78rem" }}>Private digital access after purchase.</p>
          </aside>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader eyebrow="What's Inside" title={product.insideTitle} />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {product.inside.map((item) => (
              <article key={item.title} className="rounded-[24px] bg-white/64 p-6" style={{ border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)" }}>
                <img src={archMark} alt="" className="h-9 w-7 opacity-45" />
                <h3 className="mt-5 text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.45rem", lineHeight: 1.1 }}>{item.title}</h3>
                <p className="mt-3 text-[var(--ink)]/62" style={{ fontFamily: FONT_BODY, fontSize: "0.92rem", lineHeight: 1.65 }}>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24" style={{ background: "var(--ink)" }}>
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <p className="text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>Perfect For</p>
            <h2 className="mt-4 text-[var(--cream)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1, fontWeight: 400 }}>Built for founders who want clarity before they spend more.</h2>
            {product.bonuses && (
              <>
                <p className="mt-8 text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>Included</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.bonuses.map((bonus) => (
                    <span key={bonus} className="rounded-full border border-[var(--gold)]/30 px-4 py-2 text-[var(--cream)]/72" style={{ fontFamily: FONT_BODY, fontSize: "0.86rem" }}>{bonus}</span>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="grid gap-3">
            {product.perfectFor.map((item) => (
              <div key={item} className="rounded-2xl bg-white/[0.06] p-5 text-[var(--cream)]/72" style={{ border: "1px solid rgba(200,168,100,0.18)", fontFamily: FONT_BODY, fontSize: "0.95rem", lineHeight: 1.65 }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-4xl">
          <SectionHeader eyebrow="Good To Know" title="Common Questions" />
          <div className="mt-8 grid gap-3">
            {product.faqs.map((faq) => (
              <details key={faq.q} className="group rounded-2xl bg-white/70 px-6 py-5 [&_summary::-webkit-details-marker]:hidden" style={{ border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)" }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.2rem" }}>
                  {faq.q}
                  <span className="text-2xl text-[var(--rose)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[var(--ink)]/65" style={{ fontFamily: FONT_BODY, fontSize: "0.92rem", lineHeight: 1.65 }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 text-center md:px-8 md:py-24" style={{ background: "linear-gradient(180deg, #f8e5df 0%, #f1d2cc 100%)" }}>
        <div className="mx-auto max-w-4xl">
          <p className="text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>After You Build The Foundation</p>
          <h2 className="mt-4 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.2rem, 6vw, 4.2rem)", lineHeight: 1, fontWeight: 400 }}>Ready for done-for-you growth?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-[var(--ink)]/64" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.75 }}>
            Once your offer and direction are clear, The Dollhouse can help with managed marketing: content, AI clone videos, automation, and lead follow-up handled for you.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button product={product} label={product.finalCta} />
            <a href="/#contact" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--ink)]/35 px-7 py-3.5 text-[var(--ink)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>
              Apply For Marketing →
            </a>
          </div>
          <p className="mx-auto mt-6 max-w-xl text-[var(--ink)]/42" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", lineHeight: 1.6 }}>
            {allSalesFinal}
          </p>
        </div>
      </section>
    </main>
  );
}
