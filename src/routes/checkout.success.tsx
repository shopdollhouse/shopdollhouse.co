import { createFileRoute } from "@tanstack/react-router";
import ProductThankYouPage, { normalizeThankYouProduct } from "@/components/ProductThankYouPage";

export const Route = createFileRoute("/checkout/success")({
  component: CheckoutSuccessPage,
});

function CheckoutSuccessPage() {
  const search = Route.useSearch() as { product?: string };
  return <ProductThankYouPage productKey={normalizeThankYouProduct(search.product)} />;
}
