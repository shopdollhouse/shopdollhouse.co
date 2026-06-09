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
            We collect information you provide directly, including your name, email address, and phone number when you interact with our website, chat widget, forms, or quiz.
          </p>
        </Section>

        <Section title="How We Use Your Information">
          <p>
            We use your information to respond to inquiries, send appointment reminders, provide customer support, and share promotional offers and updates about our services.
          </p>
        </Section>

        <Section title="SMS & Text Message Consent">
          <p>
            By providing your phone number and opting in, you consent to receive text messages from The Dollhouse Brand Studio, including automated, promotional, and customer support messages. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase.
          </p>
        </Section>

        <Section title="Opting Out">
          <p>
            You may opt out of SMS messages at any time by replying STOP. For help, reply HELP or email{" "}
            <a href="mailto:hello@shopdollhouse.co" style={{ color: "var(--rose)", textDecoration: "underline" }}>
              hello@shopdollhouse.co
            </a>
            .
          </p>
        </Section>

        <Section title="Data Sharing">
          <p>
            We do not sell, trade, or share your personal information with third parties for marketing purposes.
          </p>
        </Section>

        <Section title="Contact Us">
          <p>The Dollhouse Brand Studio</p>
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
            <a href="https://www.shopdollhouse.co" target="_blank" rel="noopener noreferrer" style={{ color: "var(--rose)", textDecoration: "underline" }}>
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
