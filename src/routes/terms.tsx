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

        <Section title="1. Acceptance">
          <p>
            By accessing shopdollhouse.co or purchasing any product or service, you agree to these Terms of Service.
          </p>
        </Section>

        <Section title="2. Services">
          <p>
            The Dollhouse Brand Studio offers done-for-you social media marketing, AI-powered content creation, lead generation systems, and digital brand products. Service details, pricing, and deliverables are outlined in your service agreement or product description.
          </p>
        </Section>

        <Section title="3. Digital Products">
          <p>
            All digital product sales are final. No refunds are issued after purchase and access has been granted. Products are for personal use only and may not be resold or redistributed.
          </p>
        </Section>

        <Section title="4. Service Agreements">
          <p>
            Managed marketing services require a signed agreement. Terms, payment schedules, and cancellation policies are outlined in that agreement.
          </p>
        </Section>

        <Section title="5. Communications">
          <p>
            By providing your contact information, you consent to receive communications from The Dollhouse Brand Studio related to your inquiry, purchase, or service. You may opt out at any time.
          </p>
        </Section>

        <Section title="6. Intellectual Property">
          <p>
            All content, branding, and materials created by The Dollhouse Brand Studio remain our intellectual property unless otherwise agreed in writing.
          </p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>
            Results may vary. We do not guarantee specific follower counts, leads, or revenue outcomes.
          </p>
        </Section>

        <Section title="8. Contact">
          <p>
            <a href="mailto:hello@shopdollhouse.co" style={{ color: "var(--rose)", textDecoration: "underline" }}>hello@shopdollhouse.co</a>
            {"  |  "}
            <a href="tel:+12893014567" style={{ color: "var(--rose)", textDecoration: "underline" }}>(289) 301-4567</a>
            {"  |  "}
            <a href="https://www.shopdollhouse.co" target="_blank" rel="noopener noreferrer" style={{ color: "var(--rose)", textDecoration: "underline" }}>shopdollhouse.co</a>
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
