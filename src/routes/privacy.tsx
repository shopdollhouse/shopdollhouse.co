import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({ component: PrivacyPage });

function PrivacyPage() {
  const updated = "June 2026";

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mt-10">
      <h2
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "var(--ink)", fontWeight: 400 }}
      >
        {title}
      </h2>
      <div
        className="mt-3 text-[var(--ink)]/70 leading-relaxed space-y-3"
        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem" }}
      >
        {children}
      </div>
    </div>
  );

  return (
    <main
      className="min-h-screen px-6 py-20"
      style={{ background: "var(--blush)", color: "var(--ink)" }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-70 transition-opacity mb-12"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase" }}
        >
          ← Back to home
        </Link>

        {/* Header */}
        <p
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)" }}
        >
          The Dollhouse Brand Studio
        </p>
        <h1
          className="mt-3"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, color: "var(--ink)" }}
        >
          Privacy Policy
        </h1>
        <p
          className="mt-2 text-[var(--ink)]/45"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem" }}
        >
          Last updated: {updated}
        </p>

        <div
          className="mt-4 h-px w-16"
          style={{ background: "color-mix(in oklab, var(--gold) 50%, transparent)" }}
        />

        <Section title="Information We Collect">
          <p>
            We collect information you provide directly, including your name, email address, and phone number when you interact with our website, chat widget, forms, or quiz. We may also collect business information you share with us (such as your business name, industry, and website), payment information processed securely through our third-party payment provider, and technical information such as your IP address, browser type, and pages viewed.
          </p>
        </Section>

        <Section title="How We Use Information">
          <p>
            We use the information we collect to provide and improve our services, respond to inquiries, provide customer support, process payments, send appointment reminders and lead follow-ups, and — where you have opted in — share promotional offers and updates. We may also use it to personalize your experience and comply with legal obligations.
          </p>
        </Section>

        <Section title="SMS & Communications">
          <p>
            By providing your phone number and opting in, you consent to receive text messages (SMS) from The Dollhouse Brand Studio, including automated, transactional, customer support, and promotional messages. Message frequency varies. Message and data rates may apply. Consent to receive SMS is not a condition of any purchase.
          </p>
          <p>
            You may opt out at any time by replying STOP to any message. After you reply STOP, we will send one confirmation message and stop sending you SMS messages. For help, reply HELP or email{" "}
            <a href="mailto:hello@shopdollhouse.co" style={{ color: "var(--rose)", textDecoration: "underline" }}>
              hello@shopdollhouse.co
            </a>
            .
          </p>
        </Section>

        <Section title="Data Sharing Policy">
          <p>
            We do not sell your personal information. We may share information only with trusted third-party service providers who help us operate our business (such as our CRM, communications, and payment processors), and only to the extent necessary to provide our services.
          </p>
          <p>
            <strong>No mobile information will be shared with third parties or affiliates for marketing/promotional purposes.</strong> SMS opt-in consent and phone numbers collected for SMS purposes are never shared with any third party or affiliate for their marketing or promotional use.
          </p>
        </Section>

        <Section title="Cookies & Tracking">
          <p>
            We use cookies and similar technologies to operate the website, remember your preferences, analyze traffic, and improve performance. You can control or disable cookies through your browser settings, though some features may not function properly without them. We may also use analytics and advertising tools to understand how visitors interact with our website.
          </p>
        </Section>

        <Section title="Data Security">
          <p>
            We implement reasonable administrative, technical, and physical safeguards designed to protect your information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.
          </p>
        </Section>

        <Section title="Third-Party Services">
          <p>
            We use trusted third-party platforms to deliver our services, including GoHighLevel, which acts as a data processor for our CRM, SMS and communications, forms, and marketing automation. We also use a third-party payment processor to securely handle transactions, and analytics and advertising platforms (such as Meta and Google) to measure and improve our marketing. These providers process information on our behalf and are expected to maintain appropriate safeguards.
          </p>
        </Section>

        <Section title="Your Rights">
          <p>
            Depending on your location, you may have the right to access, correct, or delete the personal information we hold about you, withdraw consent, or opt out of marketing and SMS communications. To exercise any of these rights, contact us at{" "}
            <a href="mailto:hello@shopdollhouse.co" style={{ color: "var(--rose)", textDecoration: "underline" }}>
              hello@shopdollhouse.co
            </a>
            . We will respond in accordance with applicable law.
          </p>
        </Section>

        <Section title="Contact Information">
          <p>The Dollhouse Brand Studio</p>
          <p>Markham, ON, Canada</p>
          <p>
            <a href="mailto:hello@shopdollhouse.co" style={{ color: "var(--rose)", textDecoration: "underline" }}>
              hello@shopdollhouse.co
            </a>
          </p>
          <p>
            <a href="tel:+12893014567" style={{ color: "var(--rose)", textDecoration: "underline" }}>
              (289) 301-4567
            </a>
          </p>
          <p>
            <a href="https://shopdollhouse.co" target="_blank" rel="noopener noreferrer" style={{ color: "var(--rose)", textDecoration: "underline" }}>
              shopdollhouse.co
            </a>
          </p>
        </Section>

        {/* Back to home */}
        <div className="mt-16 pt-10 border-t border-[var(--gold)]/15 text-center">
          <Link to="/" className="btn-ghost">
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
