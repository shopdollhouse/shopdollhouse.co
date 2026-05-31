import { createFileRoute } from "@tanstack/react-router";
import { BrandProductSalesPage } from "@/components/BrandProductSalesPage";
import { brandKitProduct } from "@/lib/brand-products";

export const Route = createFileRoute("/brand-room_/brand-kit")({ component: BrandKitPage });

function BrandKitPage() {
  return <BrandProductSalesPage product={brandKitProduct} />;
}
