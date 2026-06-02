import { createFileRoute } from "@tanstack/react-router";
import { BrandProductSalesPage, type BrandProduct } from "@/components/BrandProductSalesPage";
import productImage from "@/assets/product-workbook.jpg";

export const Route = createFileRoute("/brand-room_/workbook")({ component: WorkbookPage });

const product: BrandProduct = {
  eyebrow: "Interactive Brand Workbook",
  name: "The Dollhouse Workbook",
  shortName: "Workbook",
  price: "$47",
  regular: "$261",
  value: "Interactive workbook · bonus PDF included",
  checkoutUrl: "",
  tagline: "Not a PDF download. A guided live experience that walks you through every brand decision — one clear prompt at a time.",
  intro: "This is for the beginner who already knows what she wants to build, but does not know where to start. Walk through the prompts, organize your answers, and leave with a brand foundation you can actually use.",
  painHeadline: "Stop trying to hold your entire business in your head.",
  painBody: "The workbook helps you stop trying to hold the whole business in your head. It gives you a calm, structured place to define your audience, offer, value, positioning, brand voice, content pillars, and launch direction.",
  imageTitle: "Workbook",
  imageSubtitle: "A guided brand-building experience for turning your ideas into a clear business foundation.",
  imageItems: ["Brand foundation", "Audience clarity", "Offer planning", "Bonus PDF"],
  insideTitle: "A guided path from idea to brand clarity.",
  inside: [
    { title: "Brand Foundation", body: "Clarify the mission, values, story, and direction behind the brand you want to build." },
    { title: "Audience & Positioning", body: "Understand who you serve, what they want, and how your brand should be positioned in their mind." },
    { title: "Offer Clarity", body: "Map your product, service, transformation, pricing thoughts, and the value your audience is buying." },
    { title: "Content Pillars", body: "Turn your brand direction into content themes you can actually post from with confidence." },
    { title: "Launch Readiness", body: "Use the checklist-style guidance to see what still needs to be built before you promote." },
    { title: "Saveable Worksheets", body: "Keep your answers organized in one place with a workbook-style experience plus bonus PDF support." },
  ],
  outcomes: [
    "Know what your brand stands for and who it is really for.",
    "Stop second guessing your offer, content direction, and message.",
    "Walk away with answers, not more questions — and a foundation you can actually build on.",
    "Create the foundation before moving into the Brand Kit or managed marketing.",
  ],
  perfectFor: [
    "Beginners who want a lower-priced entry point before the full Brand Kit.",
    "New business owners with ideas everywhere and no organized plan yet.",
    "Creators, service providers, boutiques, and digital product sellers building their first serious brand.",
    "Anyone who likes guided prompts, worksheets, and a slower strategy-building process.",
  ],
  bonuses: [
    "Bonus PDF workbook",
    "Guided brand prompts",
    "Audience clarity questions",
    "Content pillar planner",
    "Launch readiness checklist",
    "Brand positioning support",
  ],
  faqs: [
    { q: "Is this different from the Brand Kit?", a: "Yes. The workbook focuses on the business foundation and guided planning. The Brand Kit is the fuller private strategy suite with more rooms and web-app structure." },
    { q: "Do I need to print anything?", a: "No. The workbook is designed as an interactive web app, with a bonus PDF if you prefer to think on paper." },
    { q: "Is this good if I am brand new?", a: "Yes. It is especially helpful if you know you want to build something but need structure before choosing visuals or hiring help." },
    { q: "What should I buy after this?", a: "If you want the full strategy experience, move into the Brand Kit. If your business is already live, apply for managed marketing support." },
    { q: "Are there refunds?", a: "Because this is a digital product with private access, all sales are final." },
  ],
  finalCta: "Get the Workbook",
  accent: "workbook",
  productImage,
};

function WorkbookPage() {
  return <BrandProductSalesPage product={product} />;
}
