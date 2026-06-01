import { createFileRoute } from "@tanstack/react-router";
import { BrandProductSalesPage, type BrandProduct } from "@/components/BrandProductSalesPage";
import productImage from "@/assets/product-ai-prompt-kit.jpg";

export const Route = createFileRoute("/brand-room_/ai-prompt-kit")({ component: AiPromptKitPage });

const product: BrandProduct = {
  eyebrow: "AI Prompt Kit",
  name: "The Dollhouse AI Prompt Kit",
  shortName: "AI Kit",
  price: "$17",
  value: "50+ ready-to-use prompts · instant access",
  checkoutUrl: "",
  tagline: "Get the words instantly with 50+ zero-blank-page prompts for captions, hooks, emails, offers, ads, launch content, and brand messaging.",
  intro: "This is the quick-start kit for founders who already have an idea or brand direction and need help turning it into polished content, faster. Copy the prompt, customize the details, and let AI help you get unstuck.",
  painHeadline: "Stop staring at the blank page.",
  painBody: "You do not need more generic AI prompts. You need prompts that help you think through your brand, offers, content, launch, and marketing in a way that actually sounds like you.",
  imageTitle: "Prompt Kit",
  imageSubtitle: "50+ ready-to-use prompts across brand, content, offer, email, and launch planning.",
  imageItems: ["50+ prompts", "8 prompt rooms", "Captions + hooks", "Launch copy"],
  insideTitle: "A prompt library built for brand-building, not random content.",
  inside: [
    { title: "Caption & Hook Prompts", body: "Create post ideas, hooks, captions, carousel angles, and short-form video directions with less overthinking." },
    { title: "Offer Copy Prompts", body: "Generate product descriptions, value statements, sales angles, and offer messaging that connect to the buyer." },
    { title: "Email & SMS Prompts", body: "Draft nurture emails, launch announcements, reminders, and follow-up messages without starting from scratch." },
    { title: "Brand Voice Prompts", body: "Shape your tone, messaging, and content language so your AI output sounds more aligned." },
    { title: "Launch Prompts", body: "Plan launch content, promo sequences, urgency angles, and selling moments with structure." },
    { title: "AI Workflow Support", body: "Use prompts in ChatGPT or your preferred AI tool to move faster while keeping the strategy grounded." },
  ],
  outcomes: [
    "Create content faster without losing your brand direction.",
    "Turn your ideas into captions, hooks, emails, and sales copy.",
    "Use AI with better instructions instead of vague one-line prompts.",
    "Pair it with the Workbook or Brand Kit so your prompts are based on a real foundation.",
  ],
  perfectFor: [
    "Creators and founders who know what they want to say but freeze when it is time to write.",
    "Business owners who need captions, hooks, emails, and offer copy without hiring a copywriter yet.",
    "Anyone using ChatGPT who wants better outputs from clearer prompt structure.",
    "Brand Room buyers who want faster content after finishing their foundation.",
  ],
  bonuses: [
    "Caption prompts",
    "Hook prompts",
    "Email prompts",
    "Offer copy prompts",
    "Launch planning prompts",
    "Brand voice prompts",
  ],
  faqs: [
    { q: "Do I need paid ChatGPT?", a: "No. You can use these prompts with the free version of ChatGPT or your preferred AI writing tool." },
    { q: "Is this generic AI content?", a: "No. The prompts are designed to help you add your audience, offer, tone, and brand details so the output becomes more specific." },
    { q: "Does this replace the Workbook or Brand Kit?", a: "No. It pairs best with them. The stronger your foundation is, the stronger your AI outputs will be." },
    { q: "Can I use this for my business if I already have one?", a: "Yes. It is useful for active businesses that need content ideas, launch copy, and message support quickly." },
    { q: "Are there refunds?", a: "Because this is a digital product with instant access, all sales are final." },
  ],
  finalCta: "Get the Prompts",
  accent: "ai",
  productImage,
};

function AiPromptKitPage() {
  return <BrandProductSalesPage product={product} />;
}
