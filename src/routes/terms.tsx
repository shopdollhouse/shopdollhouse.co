import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({ component: TermsPage });

function TermsPage() {
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
          Terms of Service
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

        <Section title="1. Agreement to Terms">
          <p>
            By accessing shopdollhouse.co, purchasing any product, or using our services, you confirm you are at least 18 years old and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our website or services.
          </p>
        </Section>

        <Section title="2. Description of Services">
          <p>
            The Dollhouse Brand Studio offers done-for-you social media management, AI Clone content creation, marketing automation, lead generation systems, website design, paid advertising management, and digital products (the Brand Room). Service details, pricing, and deliverables are outlined in your individual proposal, service agreement, or product description.
          </p>
        </Section>

        <Section title="3. SMS Messaging Terms">
          <p>
            By opting in to receive text messages from The Dollhouse Brand Studio, you agree to the following:
          </p>
          <p>
            <strong>Message Types:</strong> You may receive appointment reminders, lead and customer follow-ups, onboarding and account notifications, customer support messages, and promotional or marketing messages.
          </p>
          <p>
            <strong>Opt-Out:</strong> You can opt out at any time by replying STOP to any message. After replying STOP, you will receive one confirmation message and no further SMS messages.
          </p>
          <p>
            <strong>Help:</strong> For assistance, reply HELP to any message or email{" "}
            <a href="mailto:hello@shopdollhouse.co" style={{ color: "var(--rose)", textDecoration: "underline" }}>hello@shopdollhouse.co</a>.
          </p>
          <p>
            <strong>Carrier Liability:</strong> Carriers are not liable for delayed or undelivered messages.
          </p>
          <p>
            <strong>Message &amp; Data Rates:</strong> Message and data rates may apply, depending on your mobile plan.
          </p>
          <p>
            <strong>Message Frequency:</strong> Message frequency varies based on your interactions with us.
          </p>
          <p>
            Your information is handled in accordance with our{" "}
            <Link to="/privacy" style={{ color: "var(--rose)", textDecoration: "underline" }}>Privacy Policy</Link>. Consent to receive SMS messages is not a condition of purchasing any goods or services.
          </p>
        </Section>

        <Section title="4. User Responsibilities">
          <p>
            You agree to provide accurate and complete information, keep your account information secure, and use our services only for lawful purposes. You are responsible for any activity that occurs through your use of our services.
          </p>
        </Section>

        <Section title="5. Acceptable Use">
          <p>
            You agree not to use our website or services for any unlawful, harmful, or fraudulent purpose; attempt to gain unauthorized access to our systems; copy, resell, or redistribute our content, tools, or digital products without authorization; or submit false information or impersonate any person or entity.
          </p>
        </Section>

        <Section title="6. Payments & Refunds">
          <p>
            All purchases, setup fees, and digital products are final and non-refundable. Managed plans operate on the term agreement (3, 6, or 12 months) confirmed at enrollment and cannot be cancelled partway through the agreed term. The one-time $500 setup fee is required upfront and is non-refundable. Digital products are for personal or business use only and may not be resold or redistributed.
          </p>
        </Section>

        <Section title="7. Intellectual Property">
          <p>
            All content, branding, designs, tools, and materials created by The Dollhouse Brand Studio remain our intellectual property unless otherwise agreed in writing. Digital products are licensed to you for your own use only.
          </p>
        </Section>

        <Section title="8. Disclaimers">
          <p>
            Our services and products are provided "as is" and "as available," without warranties of any kind. We do not guarantee specific results, revenue, leads, follower counts, or outcomes from the use of our services. Any results referenced are illustrative and not a promise of future performance.
          </p>
        </Section>

        <Section title="9. Limitation of Liability">
          <p>
            To the fullest extent permitted by law, The Dollhouse Brand Studio shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenue, arising from your use of our website or services. Our total liability for any claim shall not exceed the amount you paid to us for the service giving rise to the claim.
          </p>
        </Section>

        <Section title="10. Governing Law">
          <p>
            These Terms are governed by and construed in accordance with the laws of the Province of Ontario, Canada, without regard to its conflict of law principles. Any disputes shall be subject to the exclusive jurisdiction of the courts located in Ontario, Canada.
          </p>
        </Section>

        <Section title="11. Contact Information">
          <p>The Dollhouse Brand Studio · Markham, ON, Canada</p>
          <p>
            <a href="mailto:hello@shopdollhouse.co" style={{ color: "var(--rose)", textDecoration: "underline" }}>hello@shopdollhouse.co</a>
            {"  |  "}
            <a href="tel:+12893014567" style={{ color: "var(--rose)", textDecoration: "underline" }}>(289) 301-4567</a>
            {"  |  "}
            <a href="https://www.dollhousebrandstudio.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--rose)", textDecoration: "underline" }}>shopdollhouse.co</a>
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
