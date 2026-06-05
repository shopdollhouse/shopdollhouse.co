import { createFileRoute } from "@tanstack/react-router";
import { StanStoreProductPage } from "@/components/StanStoreProductPage";
import { aiPromptKitProduct } from "@/lib/brand-products";

export const Route = createFileRoute("/stanstore_/ai-prompt-kit")({ component: StanStoreAiPromptKitPage });

function StanStoreAiPromptKitPage() {
  return <StanStoreProductPage product={aiPromptKitProduct} showCheckout />;
}
