import { createFileRoute } from "@tanstack/react-router";
import { StanStoreProductPage } from "@/components/StanStoreProductPage";
import { brandKitProduct } from "@/lib/brand-products";

export const Route = createFileRoute("/brand-room_/brand-kit")({ component: BrandKitPage });

function BrandKitPage() {
  return <StanStoreProductPage product={brandKitProduct} showCheckout />;
}
