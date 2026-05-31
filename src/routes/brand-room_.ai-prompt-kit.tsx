import { createFileRoute } from "@tanstack/react-router";
import { StanStoreProductPage } from "@/components/StanStoreProductPage";
import { aiPromptKitProduct } from "@/lib/brand-products";

export const Route = createFileRoute("/brand-room_/ai-prompt-kit")({ component: AiPromptKitPage });

function AiPromptKitPage() {
  return <StanStoreProductPage product={aiPromptKitProduct} showCheckout />;
}
