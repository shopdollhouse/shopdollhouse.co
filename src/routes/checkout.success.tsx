import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";

type ProductKey = "brand-kit" | "workbook" | "prompt-kit";

const ACCESS_DETAILS: Record<ProductKey, {
  buttonLabel: string;
  href: string;
  password?: string;
}> = {
  "brand-kit": {
    buttonLabel: "Enter the Brand Kit →",
    href: "https://thedollhouse-brand-kit.vercel.app/",
    password: "ENTERTHEROOM",
  },
  workbook: {
    buttonLabel: "Enter the Brand Workbook →",
    href: "https://thedollhouse-workbook.vercel.app/",
    password: "KEYHOLDER",
  },
  "prompt-kit": {
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
    <main className="min-h-screen px-5 py-20 text-[var(--ink)]" style={{ background: "linear-gradient(135deg, var(--blush), var(--cream))" }}>
      <section className="mx-auto max-w-2xl text-center">
        <p className="text-[var(--gold)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Purchase Complete
        </p>
        <h1 className="mt-4 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.7rem, 8vw, 4.5rem)", fontWeight: 400, lineHeight: 1 }}>
          Thank you.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-[var(--ink)]/65" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.7 }}>
          Your purchase was successful. Your private workspace details are below.
        </p>
      </section>

      {details && <AccessDetails details={details} />}
    </main>
  );
}

function AccessDetails({ details }: { details: (typeof ACCESS_DETAILS)[ProductKey] }) {
  const [copied, setCopied] = useState(false);

  async function copyPassword() {
    if (!details.password) return;
    await navigator.clipboard.writeText(details.password);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section
      className="mx-auto mt-10 max-w-[480px] rounded-2xl p-6 text-left"
      style={{
        background: "var(--cream)",
        border: "1px solid rgba(200, 164, 100, 0.3)",
        boxShadow: "0 24px 60px -44px rgba(40, 19, 15, 0.55)",
      }}
    >
      <h2 className="text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.6rem", fontWeight: 500, lineHeight: 1.1 }}>
        Your Access Details
      </h2>
      <p className="mt-4 text-[var(--ink)]/70" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem", lineHeight: 1.6 }}>
        Click the link below to enter your workspace:
      </p>
      <a
        href={details.href}
        className="mt-5 block w-full rounded-full px-6 py-4 text-center"
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
        <div className="mt-6">
          <p className="text-[var(--ink)]/70" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem" }}>
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
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-75"
              style={{ border: "1px solid rgba(200, 164, 100, 0.4)", color: "var(--ink)" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <rect x="9" y="9" width="11" height="11" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
          </div>
          <p className="mt-3 text-[var(--ink)]/50" style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", lineHeight: 1.5 }}>
            {copied ? "Copied." : "Save this — you'll need it every time you log in."}
          </p>
        </div>
      )}
    </section>
  );
}
