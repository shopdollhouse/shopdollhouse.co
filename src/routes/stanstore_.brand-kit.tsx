import { createFileRoute } from "@tanstack/react-router";
import { StanStoreProductPage } from "@/components/StanStoreProductPage";
import { brandKitProduct } from "@/lib/brand-products";

export const Route = createFileRoute("/stanstore_/brand-kit")({ component: StanStoreBrandKitPage });

function StanStoreBrandKitPage() {
  return <StanStoreProductPage product={brandKitProduct} showCheckout />;
}
