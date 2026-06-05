import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import archMark from "@/assets/arch-mark.svg";

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";
const FONT_SCRIPT = "'Allura', cursive";

type ProductKey = "brand-kit" | "workbook" | "prompt-kit";

const ACCESS_DETAILS: Record<ProductKey, {
  name: string;
  buttonLabel: string;
  href: string;
  password?: string;
}> = {
  "brand-kit": {
    name: "Brand Kit",
    buttonLabel: "Enter the Brand Kit →",
    href: "https://thedollhouse-brand-kit.vercel.app/",
    password: "ENTERTHEROOM",
  },
  workbook: {
    name: "Brand Workbook",
    buttonLabel: "Enter the Brand Workbook →",
    href: "https://thedollhouse-workbook.vercel.app/",
    password: "KEYHOLDER",
  },
  "prompt-kit": {
    name: "AI Prompt Kit",
    buttonLabel: "Enter the AI Prompt Kit →",
    href: "https://ai-prompt-kit.vercel.app/",
  },
};

function normalizeProduct(value: unknown): ProductKey | null {
  if (value === "brand-kit" || value === "workbook" || value === "prompt-kit") return value;
  return null;
}

export const Route = createFileRoute("/checkout/success")({
  component: CheckoutSuccessPage,
});

function CheckoutSuccessPage() {
  const search = Route.useSearch() as { product?: string };
  const productKey = normalizeProduct(search.product);
  const details = productKey ? ACCESS_DETAILS[productKey] : null;

  return (
    <main className="min-h-screen px-5 py-16 text-[var(--ink)] md:py-24" style={{ background: "linear-gradient(160deg, var(--blush) 0%, var(--cream) 55%)" }}>
      <section className="mx-auto max-w-2xl text-center">
        {/* Success seal */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full" style={{ background: "rgba(200,164,100,0.14)", border: "1px solid rgba(200,164,100,0.4)" }}>
          <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="var(--gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        <div className="mt-5 flex justify-center" style={{ color: "var(--gold)" }}>
          <img src={archMark} alt="" className="h-8 w-5" />
        </div>
        <p className="mt-1 leading-none" style={{ fontFamily: FONT_SCRIPT, fontStyle: "italic", color: "var(--gold)", fontSize: "1.8rem", textTransform: "lowercase" }}>
          the dollhouse
        </p>

        <p className="mt-3 text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.7rem", letterSpacing: "0.24em", textTransform: "uppercase" }}>
          Purchase Complete
        </p>
        <h1 className="mt-3 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.7rem, 8vw, 4.5rem)", fontWeight: 400, lineHeight: 1 }}>
          Thank you.
        </h1>

        {/* Heart divider */}
        <div className="my-6 flex items-center justify-center gap-2" style={{ color: "var(--gold)" }}>
          <span className="h-px w-14 bg-current opacity-50" />
          <svg viewBox="0 0 12 10" className="h-2.5 w-2.5 fill-current"><path d="M6 9 L0.5 3.5 a2.2 2.2 0 0 1 3.1 -3.1 L6 2.8 l2.4 -2.4 a2.2 2.2 0 0 1 3.1 3.1 Z" /></svg>
          <span className="h-px w-14 bg-current opacity-50" />
        </div>

        <p className="mx-auto max-w-lg text-[var(--ink)]/65" style={{ fontFamily: FONT_BODY, fontSize: "1.02rem", lineHeight: 1.7 }}>
          Your purchase{details ? <> of the <strong className="text-[var(--ink)]/80" style={{ fontWeight: 600 }}>{details.name}</strong></> : ""} was successful. A copy of your access details has also been sent to your email — your private workspace is ready below.
        </p>
      </section>

      {details ? <AccessDetails details={details} /> : <NoProductFallback />}

      {/* Next steps / cross-links */}
      <section className="mx-auto mt-12 max-w-[480px] text-center">
        <p className="text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>While you're here</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <a href="/brand-room#pricing" className="rounded-2xl px-5 py-4 text-left transition-opacity hover:opacity-80" style={{ background: "var(--cream)", border: "1px solid rgba(200,164,100,0.3)" }}>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem", color: "var(--rose)" }}>Complete your suite</p>
            <p className="mt-1" style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", lineHeight: 1.45, color: "rgba(29,15,11,0.6)" }}>Add the other Brand Room tools →</p>
          </a>
          <a href="/quiz" className="rounded-2xl px-5 py-4 text-left transition-opacity hover:opacity-80" style={{ background: "var(--cream)", border: "1px solid rgba(200,164,100,0.3)" }}>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem", color: "var(--rose)" }}>Not sure what's next?</p>
            <p className="mt-1" style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", lineHeight: 1.45, color: "rgba(29,15,11,0.6)" }}>Take the free Brand Quiz →</p>
          </a>
        </div>
        <p className="mt-6 text-[var(--ink)]/50" style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", lineHeight: 1.6 }}>
          Need help getting in? Email{" "}
          <a href="mailto:hello@shopdollhouse.co" className="underline underline-offset-2 text-[var(--rose)]">hello@shopdollhouse.co</a>
          {" "}and we'll sort it out.
        </p>
      </section>
    </main>
  );
}

function NoProductFallback() {
  return (
    <section className="mx-auto mt-10 max-w-[480px] rounded-3xl p-7 text-center" style={{ background: "var(--cream)", border: "1px solid rgba(200,164,100,0.3)" }}>
      <p className="text-[var(--ink)]/70" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem", lineHeight: 1.7 }}>
        Your access details are on their way to your inbox. If you don't see them within a few minutes, check your spam folder or email{" "}
        <a href="mailto:hello@shopdollhouse.co" className="underline underline-offset-2 text-[var(--rose)]">hello@shopdollhouse.co</a>.
      </p>
    </section>
  );
}

function AccessDetails({ details }: { details: (typeof ACCESS_DETAILS)[ProductKey] }) {
  const [copied, setCopied] = useState(false);

  async function copyPassword() {
    if (!details.password) return;
    try {
      await navigator.clipboard.writeText(details.password);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — user can copy manually */
    }
  }

  return (
    <section
      className="mx-auto mt-10 max-w-[480px] rounded-3xl p-7 text-left"
      style={{
        background: "var(--cream)",
        border: "1px solid rgba(200, 164, 100, 0.3)",
        boxShadow: "0 28px 70px -46px rgba(40, 19, 15, 0.55)",
      }}
    >
      <p className="text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Step 1 of {details.password ? "2" : "1"}</p>
      <h2 className="mt-2 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.7rem", fontWeight: 500, lineHeight: 1.1 }}>
        Your Access Details
      </h2>
      <p className="mt-3 text-[var(--ink)]/70" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem", lineHeight: 1.6 }}>
        Click the link below to enter your workspace:
      </p>
      <a
        href={details.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 block w-full rounded-full px-6 py-4 text-center transition-opacity hover:opacity-90"
        style={{
          background: "var(--ink)",
          color: "var(--cream)",
          fontFamily: FONT_LUXE,
          fontSize: "0.78rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        {details.buttonLabel}
      </a>

      {details.password && (
        <div className="mt-6 border-t pt-6" style={{ borderColor: "rgba(200,164,100,0.22)" }}>
          <p className="text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Step 2 of 2</p>
          <p className="mt-2 text-[var(--ink)]/70" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem" }}>
            Your password is:
          </p>
          <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white px-4 py-3" style={{ border: "1px solid rgba(200, 164, 100, 0.24)" }}>
            <strong className="min-w-0 flex-1 break-all text-[var(--ink)]" style={{ fontFamily: FONT_LUXE, fontSize: "1.4rem", fontWeight: 700, letterSpacing: "0.1em" }}>
              {details.password}
            </strong>
            <button
              type="button"
              onClick={copyPassword}
              aria-label="Copy password"
              className="flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full px-3 transition-opacity hover:opacity-75"
              style={{ border: "1px solid rgba(200, 164, 100, 0.4)", color: copied ? "var(--gold)" : "var(--ink)", fontFamily: FONT_LUXE, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}
            >
              {copied ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M20 6 9 17l-5-5" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
              )}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="mt-3 text-[var(--ink)]/50" style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", lineHeight: 1.5 }}>
            Save this — you'll need it every time you log in.
          </p>
        </div>
      )}
    </section>
  );
}
