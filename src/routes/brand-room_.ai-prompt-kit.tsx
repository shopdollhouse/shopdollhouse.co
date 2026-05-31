import { createFileRoute } from "@tanstack/react-router";
import { BrandProductSalesPage } from "@/components/BrandProductSalesPage";
import { aiPromptKitProduct } from "@/lib/brand-products";

export const Route = createFileRoute("/brand-room_/ai-prompt-kit")({ component: AiPromptKitPage });

function AiPromptKitPage() {
  return <BrandProductSalesPage product={aiPromptKitProduct} />;
}
