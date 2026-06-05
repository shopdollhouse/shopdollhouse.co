import { createFileRoute } from "@tanstack/react-router";
import { StanStoreProductPage } from "@/components/StanStoreProductPage";
import { workbookProduct } from "@/lib/brand-products";

export const Route = createFileRoute("/brand-room_/brand-workbook")({ component: BrandWorkbookPage });

function BrandWorkbookPage() {
  return <StanStoreProductPage product={workbookProduct} showCheckout />;
}
