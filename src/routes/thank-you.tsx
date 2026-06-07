import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import ProductThankYouPage, { normalizeThankYouProduct } from "@/components/ProductThankYouPage";
import { usePageMeta } from "@/lib/use-page-meta";

export const Route = createFileRoute("/thank-you")({
  component: ThankYouPage,
});

function ThankYouPage() {
  usePageMeta(
    "You're In | The Dollhouse Brand Studio",
    "Your purchase is confirmed — your private access details are inside.",
  );

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
  return <ProductThankYouPage productKey={normalizeThankYouProduct(search.product)} />;
}
