import { createFileRoute } from "@tanstack/react-router";
import { BrandProductSalesPage, type BrandProduct } from "@/components/BrandProductSalesPage";
import productImage from "@/assets/product-brand-kit.jpg";

export const Route = createFileRoute("/brand-room_/brand-kit")({ component: BrandKitPage });

const product: BrandProduct = {
  eyebrow: "Private Strategy Suite",
  name: "The Dollhouse Brand Kit",
  shortName: "Brand Kit",
  price: "$97",
  regular: "$145",
  value: "$497 value · instant access after purchase",
  checkoutUrl: "https://thedollhouse-brand-kit.vercel.app",
  tagline: "The interactive brand strategy web app designed to help you build, launch, and grow your dream brand even if you are starting from scratch.",
  intro: "This is your private place to organize the brand foundation, offer, content direction, launch roadmap, and business vision you keep trying to piece together from random advice.",
  painHeadline: "Most brands fail because they do not have a clear plan.",
  painBody: "If you are tired of overthinking your brand, second guessing every move, buying random templates, and posting without seeing results, The Dollhouse gives you one guided system to follow. No fluff, no confusing jargon, no guessing.",
  imageTitle: "Brand Kit",
  imageSubtitle: "Your complete brand strategy, product plan, and launch roadmap built for you inside a private web app.",
  imageItems: ["17 guided rooms", "Custom strategy plan", "Save & export", "Private access"],
  insideTitle: "17 guided strategy rooms for building the full brand foundation.",
  inside: [
    { title: "Brand Foundation", body: "Define your mission, values, voice, identity, and the direction your brand should be known for." },
    { title: "Offer & Product Planning", body: "Create offers, products, pricing, and positioning that make your brand easier to understand and buy from." },
    { title: "Launch Roadmap", body: "Turn the foundation into a clear launch plan with goals, content direction, and next steps." },
    { title: "Audience Clarity", body: "Get clear on who you serve, what they want, what they need, and why they should trust you." },
    { title: "Marketing Strategy", body: "Plan your content, visibility, social direction, website checklist, and brand messaging in one place." },
    { title: "Export & Save Tools", body: "Keep your strategy organized and save your plan so it is not scattered across notes and screenshots." },
  ],
  outcomes: [
    "Build your brand with a guided step-by-step strategy roadmap.",
    "Create offers, content, and launch plans without feeling overwhelmed.",
    "Organize your ideas, goals, and business vision all in one place.",
    "Build a luxury-looking brand with clarity and confidence.",
  ],
  perfectFor: [
    "New business owners who need direction before they invest in monthly marketing.",
    "Beauty brands, boutiques, coaches, creators, influencers, and digital product sellers.",
    "Women building online brands who want a beautiful strategy system that feels simple.",
    "Founders who want to finish the foundation before hiring The Dollhouse for done-for-you growth.",
  ],
  bonuses: [
    "Content planning support",
    "Guided prompts",
    "Brand strategy worksheets",
    "Launch planning sections",
    "Goal tracking areas",
    "Future updates",
  ],
  faqs: [
    { q: "Is this a mobile app?", a: "No. The Dollhouse is a private interactive web app designed to work beautifully through your browser, especially on laptop and tablet." },
    { q: "Is this beginner friendly?", a: "Yes. Everything is guided, simple, aesthetic, and made for founders who are starting from scratch." },
    { q: "How do I access it?", a: "You receive instant private access after purchase through the product link." },
    { q: "Can I hire The Dollhouse after I finish it?", a: "Yes. Once your foundation is clear, you can apply for managed marketing support for content, automations, AI clone videos, and lead follow-up." },
    { q: "Are there refunds?", a: "Due to the digital nature of this product and instant access delivery, all sales are final." },
  ],
  finalCta: "Join The Dollhouse Today",
  accent: "brand",
  productImage,
};

function BrandKitPage() {
  return <BrandProductSalesPage product={product} />;
}
