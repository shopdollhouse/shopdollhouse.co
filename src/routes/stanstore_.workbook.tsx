import { createFileRoute } from "@tanstack/react-router";
import { StanStoreProductPage } from "@/components/StanStoreProductPage";
import { workbookProduct } from "@/lib/brand-products";

export const Route = createFileRoute("/stanstore_/workbook")({ component: StanStoreWorkbookPage });

function StanStoreWorkbookPage() {
  return <StanStoreProductPage product={workbookProduct} showCheckout />;
}
