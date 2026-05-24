import { useState } from "react";

const policies: Record<string, { title: string; content: string }> = {
  privacy: {
    title: "Privacy Policy",
    content: `The Dollhouse ("we", "us", or "our") respects your privacy. This policy explains how we collect, use, and protect your information.

Information We Collect
We may collect your name, email address, and payment information when you make a purchase or sign up for our mailing list. We also collect usage data through cookies and analytics tools to improve your experience.

How We Use Your Information
• To process and deliver your purchases
• To send you updates, if you've opted in
• To improve our products and website experience
• To respond to your inquiries

Third-Party Services
We use Stan Store for payment processing. Your payment data is handled securely by their platform. We do not store your credit card information.

Cookies
Our site uses cookies to improve your browsing experience. You can disable cookies in your browser settings at any time.

Your Rights
You may request access to, correction of, or deletion of your personal data at any time by emailing us.

Contact
For privacy-related questions, email hello@shopdollhouse.co.`,
  },
  terms: {
    title: "Terms of Use",
    content: `By accessing and using The Dollhouse website and purchasing our products, you agree to the following terms.

Products & Delivery
All digital products are delivered electronically. Interactive web apps are accessed via a link provided after purchase. Downloadable products are delivered as PDF files.

Intellectual Property
All content, designs, templates, and materials provided by The Dollhouse are protected by copyright. You may use purchased products for your own personal or business branding. You may not resell, redistribute, or share purchased products.

Done-For-You Services
Custom brand identity services are delivered within the stated timeframe (10–14 business days). One round of revisions is included. Additional revisions may incur extra fees.

Social Media Management Services
Social media management services may include Instagram and Facebook setup and branding, designed posts, carousels, reels, captions, hashtags, scheduling, publishing, promotional email graphics, email reports, Threads support, TikTok support, Meta ads management, custom ad creatives, merch design concepts, analytics, and optional add-ons based on the selected package. Advertising spend is billed separately by Meta, paid by the client through their own Meta account or approved ad payment method, and is not included in service fees. We do not guarantee specific revenue, reach, leads, sales, engagement, or platform approval outcomes.

Local Business Monthly Services
Local business packages are monthly content creation and social media management packages. Standard begins with a no-commitment first month; if the client continues, the 3-month minimum begins from month 2. Pro and Premium require a 3-month minimum commitment from the first month. Services may include Instagram and Facebook setup and branding, designed posts, carousels, reels, captions, hashtags, scheduling, publishing, promotional email graphics, monthly reports, Threads support, TikTok support, Meta ads management, custom ad creatives, merch design concepts, detailed analytics, and strategy recommendations based on the selected package and add-ons. All client communication is handled by email only. Calls, extra meetings, rush work, additional revisions, and services outside the selected package are not included unless approved in writing and may require an additional fee. Merch design, website refreshes, website builds, logo refreshes, and social post design services are optional one-time add-ons or standalone services and are scoped separately. Standalone services must be reviewed, scoped, and quoted before payment. Scope, deliverables, payment schedule, revision terms, payment link details, and renewal details are confirmed before the contract begins. Clients complete the agreement first, then The Dollhouse Brand Studio manually sends the applicable payment link. Package fees are service fees only and do not include Meta advertising spend. Clients pay all Meta ad spend separately through their own Meta account or approved ad payment method. Work does not begin until the agreement is accepted and the required payment is received. Payments for local business services are final and non-refundable unless otherwise required by law. Late or failed payments may pause work. Domain registration, hosting, paid tools, printing, and advertising spend are billed separately unless otherwise stated in writing. This agreement is governed by the laws of Ontario, Canada, and eligible claims may be brought in Ontario Small Claims Court or another Ontario court with jurisdiction.

Limitation of Liability
The Dollhouse Brand Studio provides branding, marketing, and business support tools and services. We are not liable for any business decisions made based on our products or services. Results may vary.

Changes to Terms
We reserve the right to update these terms at any time. Continued use of our website constitutes acceptance of any changes.

Contact
For questions about these terms, email hello@shopdollhouse.co.`,
  },
  refund: {
    title: "Refund Policy",
    content: `All sales are final. No refunds.

Due to the digital nature of our products and the instant access provided upon purchase, we do not offer refunds or exchanges on any products or services.

This includes:
• Digital products (Brand Kit, Brand Workbook, AI Prompt Kit)
• Free downloads (Brand Starter Checklist, Niche Finder)
• Done-for-you services (Starter Suite, Full House, Social Media Management, Local Business Monthly Services)

We encourage you to review all product details, descriptions, and features carefully before making a purchase.

Done-For-You Services
One round of revisions is included with brand identity packages. Social media ads services and local business monthly services include work within the agreed scope and contract term. We work closely with you to ensure satisfaction within the scope of the purchased service.

Questions?
If you have any concerns before purchasing, please reach out to hello@shopdollhouse.co and we'll be happy to help.`,
  },
  contact: {
    title: "Contact",
    content: `We'd love to hear from you.

Email
hello@shopdollhouse.co

Social Media
• Instagram: @mandyxdoll
• Threads: @mandyxdoll
• TikTok: @mandyxdoll

Done-For-You Inquiries
For questions about our brand identity services, social media ads setup, local business monthly packages, or to join the waitlist, email hello@shopdollhouse.co with the subject line "DFY Inquiry."

Response Time
We typically respond within 24–48 business hours.`,
  },
};

interface LegalModalProps {
  activeModal: string | null;
  onClose: () => void;
}

const LegalModal = ({ activeModal, onClose }: LegalModalProps) => {
  if (!activeModal || !policies[activeModal]) return null;

  const policy = policies[activeModal];

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-6 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-dollhouse-ink/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-card border border-dollhouse-p3/25 rounded-2xl max-w-[600px] w-full max-h-[80vh] overflow-hidden shadow-xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-dollhouse-p3/15">
          <h3 className="font-display italic text-[22px] text-dollhouse-ink font-normal">
            {policy.title}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-dollhouse-p3/30 bg-transparent cursor-pointer text-dollhouse-text-light hover:text-dollhouse-ink hover:border-dollhouse-ink transition-colors text-[16px]"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          {policy.content.split("\n\n").map((paragraph, i) => {
            // Check if it's a heading-like line (short, no period)
            const isHeading = paragraph.length < 40 && !paragraph.includes(".") && !paragraph.startsWith("•");
            const isBulletList = paragraph.startsWith("•");

            if (isHeading) {
              return (
                <h4 key={i} className="font-display italic text-[16px] text-dollhouse-ink mt-6 mb-2 font-normal">
                  {paragraph}
                </h4>
              );
            }

            if (isBulletList) {
              return (
                <div key={i} className="mb-4">
                  {paragraph.split("\n").map((line, j) => (
                    <p key={j} className="text-[13px] text-dollhouse-text-mid font-light leading-relaxed pl-4">
                      {line}
                    </p>
                  ))}
                </div>
              );
            }

            return (
              <p key={i} className="text-[13px] text-dollhouse-text-mid font-light leading-relaxed mb-4">
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const useLegalModal = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  return { activeModal, openModal: setActiveModal, closeModal: () => setActiveModal(null) };
};

export default LegalModal;
