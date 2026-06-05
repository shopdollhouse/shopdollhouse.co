import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

const checkoutLinks: Record<string, string> = {
  "ai-prompt-kit": "https://link.fastpaydirect.com/payment-link/6a22a43471a0aa761e46326a",
  "brand-workbook": "https://link.fastpaydirect.com/payment-link/6a22a3fe03b17c94f5714ba9",
  "brand-kit": "https://link.fastpaydirect.com/payment-link/6a22a22903b17c94f5714ba7",
  "brand-room-suite": "mailto:hello@shopdollhouse.co?subject=Brand%20Room%20Suite%20Checkout",
};

export const Route = createFileRoute("/checkout_/$product")({
  component: CheckoutRedirectPage,
});

function CheckoutRedirectPage() {
  const { product } = Route.useParams();
  const checkoutUrl = checkoutLinks[product] ?? "/brand-room#pricing";

  useEffect(() => {
    window.location.replace(checkoutUrl);
  }, [checkoutUrl]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--blush)] px-6 text-center text-[var(--ink)]">
      <div className="max-w-md">
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--rose)" }}>
          Opening checkout
        </p>
        <h1 className="mt-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.6rem", lineHeight: 1 }}>
          Taking you to the secure payment page.
        </h1>
        <a href={checkoutUrl} className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--ink)] px-8 py-4 text-white" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
          Continue to Checkout →
        </a>
      </div>
    </main>
  );
}
