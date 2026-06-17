import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import archMark from "@/assets/arch-mark.svg";

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";
const FONT_SCRIPT = "'Allura', cursive";

const checkoutLinks: Record<string, string> = {
  "ai-prompt-kit": "https://link.fastpaydirect.com/payment-link/6a22a43471a0aa761e46326a",
  "brand-workbook": "https://link.fastpaydirect.com/payment-link/6a22a3fe03b17c94f5714ba9",
  "brand-kit": "https://link.fastpaydirect.com/payment-link/6a22a22903b17c94f5714ba7",
  "brand-room-suite": "mailto:hello@shopdollhouse.co?subject=Brand%20Room%20Suite%20Checkout",
};

const products: Record<string, { name: string; price: string; regular?: string; tagline: string }> = {
  "ai-prompt-kit": { name: "AI Prompt Kit", price: "$17", regular: "$37", tagline: "50+ prompts for content that converts." },
  "brand-workbook": { name: "Brand Workbook", price: "$47", regular: "$261", tagline: "Clarity on your offer, audience & message." },
  "brand-kit": { name: "Brand Kit Blueprint", price: "$97", regular: "$145", tagline: "Your full visual identity, built from scratch." },
  "brand-room-suite": { name: "The Full Suite", price: "$127", regular: "$161", tagline: "All three tools. Everything you need." },
};

export const Route = createFileRoute("/checkout_/$product")({
  component: CheckoutRedirectPage,
});

function CheckoutRedirectPage() {
  const { product } = Route.useParams();
  const known = Boolean(checkoutLinks[product]);
  const checkoutUrl = checkoutLinks[product] ?? "/brand-room#pricing";
  const info = products[product];
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Brief branded moment, then hand off to the secure payment page.
    const t = window.setTimeout(() => {
      setReady(true);
      window.location.replace(checkoutUrl);
    }, 1500);
    return () => window.clearTimeout(t);
  }, [checkoutUrl]);

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16 text-center text-[var(--ink)]" style={{ background: "linear-gradient(160deg, var(--blush) 0%, var(--cream) 60%)" }}>
      <div
        className="w-full max-w-[440px] rounded-[28px] px-8 py-12"
        style={{ background: "var(--cream)", border: "1px solid rgba(200,164,100,0.3)", boxShadow: "0 34px 90px -52px rgba(40,19,15,0.5)" }}
      >
        <div className="flex justify-center" style={{ color: "var(--gold)" }}>
          <img src={archMark} alt="" className="h-9 w-6" />
        </div>
        <p className="mt-2 leading-none" style={{ fontFamily: FONT_SCRIPT, fontStyle: "italic", color: "var(--gold)", fontSize: "1.9rem", textTransform: "lowercase" }}>
          the dollhouse
        </p>
        <p className="mt-3" style={{ fontFamily: FONT_LUXE, fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--rose)" }}>
          Secure Checkout
        </p>

        <h1 className="mt-4 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "2.3rem", lineHeight: 1.05, fontWeight: 400 }}>
          {known ? "Taking you to the secure payment page" : "Let's find your tool"}
        </h1>

        {info && (
          <div className="mx-auto mt-6 flex items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left" style={{ background: "var(--blush)", border: "1px solid rgba(200,164,100,0.28)" }}>
            <div>
              <p style={{ fontFamily: FONT_LUXE, fontSize: "0.62rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)" }}>You're getting</p>
              <p className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", lineHeight: 1.1, color: "var(--ink)" }}>{info.name}</p>
              <p className="mt-1" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", lineHeight: 1.4, color: "rgba(29,15,11,0.6)" }}>{info.tagline}</p>
            </div>
            <div className="text-right">
              <p style={{ fontFamily: FONT_DISPLAY, fontSize: "2rem", lineHeight: 1, color: "var(--rose)" }}>
                {info.price}
                <span style={{ fontFamily: FONT_LUXE, fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.12em", marginLeft: "0.25rem", verticalAlign: "super", color: "var(--gold)" }}>USD</span>
              </p>
              {info.regular && <p className="mt-0.5 line-through" style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(29,15,11,0.4)" }}>{info.regular}</p>}
            </div>
          </div>
        )}

        {known ? (
          <>
            <div className="mt-7 flex items-center justify-center gap-2" aria-hidden>
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-2 w-2 animate-pulse rounded-full" style={{ background: "var(--rose)", animationDelay: `${i * 0.18}s` }} />
              ))}
            </div>
            <p className="mt-4" style={{ fontFamily: FONT_BODY, fontSize: "0.86rem", lineHeight: 1.6, color: "rgba(29,15,11,0.6)" }}>
              Redirecting you to our secure payment partner. This only takes a second.
            </p>
            <a
              href={checkoutUrl}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full px-8 py-4 transition-opacity hover:opacity-90"
              style={{ background: "var(--ink)", color: "var(--cream)", fontFamily: FONT_LUXE, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" }}
            >
              {ready ? "Continue to Checkout →" : "Continue Now →"}
            </a>
          </>
        ) : (
          <a
            href="/brand-room#pricing"
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-full px-8 py-4 transition-opacity hover:opacity-90"
            style={{ background: "var(--ink)", color: "var(--cream)", fontFamily: FONT_LUXE, fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" }}
          >
            Back to the Brand Room →
          </a>
        )}

        {/* Trust row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2" style={{ color: "rgba(29,15,11,0.55)" }}>
          <span className="inline-flex items-center gap-1.5" style={{ fontFamily: FONT_BODY, fontSize: "0.72rem" }}>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
            Secure payment
          </span>
          <span className="inline-flex items-center gap-1.5" style={{ fontFamily: FONT_BODY, fontSize: "0.72rem" }}>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></svg>
            Instant access
          </span>
          <span className="inline-flex items-center gap-1.5" style={{ fontFamily: FONT_BODY, fontSize: "0.72rem" }}>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
            No subscription
          </span>
        </div>
      </div>
    </main>
  );
}
