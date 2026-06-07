import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import archMark from "@/assets/arch-mark.svg";
import { usePageMeta } from "@/lib/use-page-meta";

export const Route = createFileRoute("/thank-you")({ component: ThankYouPage });

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";
const FONT_SCRIPT = "'Allura', cursive";

const INK = "var(--ink)";
const ROSE = "var(--rose)";
const GOLD = "var(--gold)";
const CREAM = "var(--cream)";
const BLUSH = "var(--blush)";

type ProductKey = "brand-kit" | "workbook" | "ai-kit";

const ACCESS: Record<ProductKey, { name: string; url: string; password?: string }> = {
  "brand-kit": { name: "The Brand Kit Blueprint", url: "https://thedollhouse-brand-kit.vercel.app", password: "ENTERTHEROOM" },
  workbook: { name: "The Brand Workbook", url: "https://thedollhouse-workbook.vercel.app", password: "KEYHOLDER" },
  "ai-kit": { name: "The AI Prompt Kit", url: "https://ai-prompt-kit.vercel.app" },
};

function productsFor(param: string | undefined): ProductKey[] | null {
  if (param === "brand-kit" || param === "workbook" || param === "ai-kit") return [param];
  if (param === "full-suite") return ["brand-kit", "workbook", "ai-kit"];
  return null;
}

function ThankYouPage() {
  usePageMeta(
    "You're In | The Dollhouse Brand Studio",
    "Your purchase is confirmed — your private access details are inside.",
  );

  // Keep this post-payment page out of search engines.
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  const search = Route.useSearch() as { product?: string };
  const keys = productsFor(search.product);

  return (
    <main className="min-h-screen px-5 py-16 text-[var(--ink)] md:py-24" style={{ background: BLUSH }}>
      {/* ── SECTION 1 · HERO ─────────────────────────── */}
      <section className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full" style={{ background: "rgba(200,164,100,0.14)", border: "1px solid rgba(200,164,100,0.4)" }}>
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <div className="mt-5 flex justify-center" style={{ color: GOLD }}>
          <img src={archMark} alt="" className="h-8 w-5" />
        </div>
        <p className="mt-1 leading-none" style={{ fontFamily: FONT_SCRIPT, fontStyle: "italic", color: GOLD, fontSize: "1.8rem", textTransform: "lowercase" }}>the</p>

        <p className="mt-3" style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: GOLD }}>You're In</p>
        <h1 className="mt-3" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: ROSE, fontSize: "clamp(2.6rem, 7vw, 4.2rem)", lineHeight: 1.04 }}>
          Welcome to the Dollhouse.
        </h1>
        <p className="mx-auto mt-5 max-w-md" style={{ fontFamily: FONT_BODY, fontSize: "1.02rem", lineHeight: 1.7, color: "rgba(29,15,11,0.66)" }}>
          Your order is confirmed. Everything you need to get started is right here.
        </p>
      </section>

      {keys ? (
        <>
          {/* ── SECTION 2 · ACCESS CARDS ─────────────── */}
          <section className="mx-auto mt-10 grid max-w-[520px] gap-5">
            {keys.map((key) => (
              <AccessCard key={key} product={ACCESS[key]} />
            ))}
          </section>

          {/* ── SECTION 3 · EMAIL NOTICE ─────────────── */}
          <section className="mx-auto mt-6 max-w-[520px]">
            <div className="flex gap-4 rounded-2xl p-5" style={{ background: CREAM, border: "1px solid rgba(200,164,100,0.3)" }}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(200,164,100,0.14)" }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              <p style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", lineHeight: 1.6, color: "rgba(29,15,11,0.7)" }}>
                A delivery email is on its way to your inbox. If you don't see it within a few minutes, please check your spam or junk folder and mark it as not spam. The email will contain your access link and password.
              </p>
            </div>
          </section>
        </>
      ) : (
        /* ── FALLBACK ───────────────────────────────── */
        <section className="mx-auto mt-10 max-w-[520px]">
          <div className="rounded-3xl p-7 text-center" style={{ background: CREAM, border: "1px solid rgba(200,164,100,0.3)" }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.7, color: "rgba(29,15,11,0.72)" }}>
              We couldn't find your order details. Please check your email for your access link, or contact us at{" "}
              <a href="mailto:hello@shopdollhouse.co" className="underline underline-offset-2" style={{ color: ROSE }}>hello@shopdollhouse.co</a>.
            </p>
          </div>
        </section>
      )}

      {/* ── SECTION 4 · CTA ──────────────────────────── */}
      <section className="mx-auto mt-10 max-w-[520px] text-center">
        <a href="/brand-room" className="inline-flex min-h-12 items-center justify-center rounded-full px-9 py-4 transition-opacity hover:opacity-90" style={{ background: INK, color: CREAM, fontFamily: FONT_LUXE, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" }}>
          Back to the Brand Room →
        </a>
        <p className="mt-5" style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(29,15,11,0.55)" }}>
          Questions? Email us at{" "}
          <a href="mailto:hello@shopdollhouse.co" className="underline underline-offset-2" style={{ color: ROSE }}>hello@shopdollhouse.co</a>
        </p>
      </section>
    </main>
  );
}

function AccessCard({ product }: { product: { name: string; url: string; password?: string } }) {
  const [copied, setCopied] = useState(false);

  async function copyPassword() {
    if (!product.password) return;
    try {
      await navigator.clipboard.writeText(product.password);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — user can copy manually */
    }
  }

  return (
    <article className="rounded-3xl p-7 text-left" style={{ background: CREAM, border: "1px solid rgba(200,164,100,0.3)", boxShadow: "0 28px 70px -46px rgba(40,19,15,0.55)" }}>
      <p style={{ fontFamily: FONT_LUXE, fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD }}>Your Access</p>
      <h2 className="mt-2" style={{ fontFamily: FONT_DISPLAY, fontWeight: 500, color: ROSE, fontSize: "1.7rem", lineHeight: 1.1 }}>{product.name}</h2>

      {/* Access URL */}
      <p className="mt-5" style={{ fontFamily: FONT_LUXE, fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(29,15,11,0.5)" }}>Access URL</p>
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 block w-full rounded-full px-6 py-4 text-center transition-opacity hover:opacity-90"
        style={{ background: INK, color: CREAM, fontFamily: FONT_LUXE, fontSize: "0.74rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}
      >
        Open {product.name} →
      </a>

      {/* Password */}
      {product.password ? (
        <div className="mt-5 border-t pt-5" style={{ borderColor: "rgba(200,164,100,0.22)" }}>
          <p style={{ fontFamily: FONT_LUXE, fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(29,15,11,0.5)" }}>Password</p>
          <div className="mt-2 flex items-center gap-3 rounded-2xl bg-white px-4 py-3" style={{ border: "1px solid rgba(200,164,100,0.24)" }}>
            <strong className="min-w-0 flex-1 break-all" style={{ fontFamily: FONT_LUXE, fontSize: "1.2rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: INK }}>
              {product.password}
            </strong>
            <button
              type="button"
              onClick={copyPassword}
              aria-label="Copy password"
              className="flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full px-3 transition-opacity hover:opacity-75"
              style={{ border: "1px solid rgba(200,164,100,0.4)", color: copied ? GOLD : INK, fontFamily: FONT_LUXE, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}
            >
              {copied ? (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
              )}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="mt-3" style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", lineHeight: 1.5, color: "rgba(29,15,11,0.5)" }}>
            Save this — you'll need it every time you log in.
          </p>
        </div>
      ) : (
        <p className="mt-5" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", lineHeight: 1.6, color: "rgba(29,15,11,0.62)" }}>
          No password required — just click the link above.
        </p>
      )}
    </article>
  );
}
