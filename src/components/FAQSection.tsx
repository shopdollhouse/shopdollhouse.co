import { useState } from "react";
import Eyebrow from "./Eyebrow";

const faqs = [
  {
    q: "Where do I start if I'm completely new?",
    a: "Take the free Brand Clarity Quiz — 8 questions, 2 minutes. You'll get a personalised result showing exactly where you're stuck and what to do next. If you're ready to dive in, The Dollhouse Brand Kit covers everything from scratch in one guided system."
  },
  {
    q: "What exactly is The Dollhouse?",
    a: "The Dollhouse is a brand studio for women building a product-based business from scratch. We offer self-guided digital tools (Brand Kit, Workbook, AI Prompt Kit, and 2026 Digital Planner), a free Brand Clarity Quiz, and done-for-you services for brand identity and social media ads."
  },
  {
    q: "What's the difference between the Brand Kit and the Brand Workbook?",
    a: "The Brand Kit is the complete system — it covers all 12 rooms of your brand from identity and positioning to pricing and platform. The Brand Workbook is a deep-dive companion with guided worksheets room by room. Most people start with the Kit and use the Workbook to go deeper."
  },
  {
    q: "What's the difference between DIY and Done-For-You?",
    a: "The DIY tools (Brand Kit, Workbook, Prompt Kit, Planner) are self-guided — you do the work with our frameworks. The Done-For-You Brand Identity Studio is where you hand everything over — I build your logo, colours, fonts, templates, and brand files and deliver them within 10–14 days."
  },
  {
    q: "Do I need any design experience?",
    a: "None at all. Everything is built for women starting from zero — no design background, no business degree, no idea where to begin. That's exactly who The Dollhouse is for."
  },
  {
    q: "Are these PDFs or apps?",
    a: "Fully interactive web apps — not PDFs. Open them in any browser on any device, and everything saves automatically as you work. No downloads, no software required."
  },
  {
    q: "How does the Brand Identity Studio work?",
    a: "Book your spot, complete a short brand questionnaire (15 minutes), and I handle everything — logo, colours, fonts, platform banners, and Canva templates. Delivered within 10 days (Starter Suite) or 14 days (Full House). Spots are limited each month."
  },
  {
    q: "What is included in social media management?",
    a: "Packages can include profile setup, branding, designed posts, carousels, reels, captions, hashtags, scheduling, publishing, promotional email graphics, monthly reports, Threads support, TikTok support, Meta ads management, custom ad creatives, merch design concepts, and analytics depending on the selected package. Meta ad spend is separate and paid directly to Meta by the client."
  },
  {
    q: "Do you work with local businesses?",
    a: "Yes. Local business content creation packages start at $1,500/month and are built for established businesses with little to no social media presence. Standard begins with a no-commitment first month, then a 3-month minimum from month 2 if the client continues. Pro and Premium require a 3-month minimum from day one. Monthly add-ons include Meta ads management, extra email graphics, and extra content. One-time project add-ons include merch design, website refreshes, website builds, logo refreshes, and social post design."
  },
  {
    q: "Is the Brand Clarity Quiz really free?",
    a: "Yes — completely free. 8 questions, no payment, takes about 2 minutes. You'll get a personalised result and recommendation for what to do next based on where you are right now."
  },
  {
    q: "What if I'm not happy with my order?",
    a: "All digital products are final sale — no refunds. For done-for-you services, revision rounds are included (1 round for Starter Suite, 2 rounds for Full House). Questions before purchasing? DM on Instagram @mandyxdoll."
  },
];

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="px-6 py-10 max-w-[700px] mx-auto">
      <div className="text-center mb-10">
        <Eyebrow text="Questions" className="mb-4" />
        <h2 className="font-display italic font-normal text-dollhouse-ink text-[clamp(28px,4vw,44px)]">
          Frequently Asked
        </h2>
      </div>

      {faqs.map((faq, i) => (
        <div key={i} className="border-b border-dollhouse-p3/20">
          <button
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full bg-transparent border-none py-5 flex justify-between items-center cursor-pointer text-left"
          >
            <span className="font-display italic text-[17px] text-dollhouse-ink font-normal">
              {faq.q}
            </span>
            <span className="text-dollhouse-p3 text-[18px] font-light ml-4 flex-shrink-0">
              {openIdx === i ? "−" : "+"}
            </span>
          </button>
          {openIdx === i && (
            <div className="pb-5">
              <p className="text-[13px] text-dollhouse-text-light font-light leading-relaxed">
                {faq.a}
              </p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default FAQSection;
