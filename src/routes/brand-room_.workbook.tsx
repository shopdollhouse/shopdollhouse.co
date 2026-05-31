import { createFileRoute } from "@tanstack/react-router";
import { BrandProductSalesPage } from "@/components/BrandProductSalesPage";
import { workbookProduct } from "@/lib/brand-products";

export const Route = createFileRoute("/brand-room_/workbook")({ component: WorkbookPage });

function WorkbookPage() {
  return <BrandProductSalesPage product={workbookProduct} />;
}
