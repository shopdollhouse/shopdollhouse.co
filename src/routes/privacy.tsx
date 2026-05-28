import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({ component: PrivacyPage });

function PrivacyPage() {
  const updated = "May 28, 2026";

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

        <Section title="Who we are">
          <p>
            The Dollhouse Brand Studio ("we", "us", or "our") is a social media marketing agency operated by Amanda Fortune, based in the Greater Toronto Area, Ontario, Canada. We provide done-for-you social media management, AI content creation, and business automation services.
          </p>
          <p>
            For privacy inquiries, contact us at:{" "}
            <a
              href="mailto:hello@shopdollhouse.co"
              style={{ color: "var(--rose)", textDecoration: "underline" }}
            >
              hello@shopdollhouse.co
            </a>
          </p>
        </Section>

        <Section title="Information we collect">
          <p>When you submit a proposal request or contact us through our website, we collect:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your name, email address, and phone number</li>
            <li>Your business name and website (if provided)</li>
            <li>The service plan and add-ons you are interested in</li>
            <li>Any additional information you include in your message</li>
          </ul>
          <p>We do not collect payment information through our website. We do not use cookies beyond what is strictly necessary for the site to function.</p>
        </Section>

        <Section title="How we use your information">
          <p>We use the information you provide solely to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Respond to your proposal request or inquiry</li>
            <li>Prepare a custom quote for your business</li>
            <li>Follow up about the services you expressed interest in</li>
            <li>Communicate with you as an active or prospective client</li>
          </ul>
          <p>We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
        </Section>

        <Section title="Third-party services">
          <p>
            Our contact form is processed by{" "}
            <a href="https://formspree.io" target="_blank" rel="noopener noreferrer" style={{ color: "var(--rose)", textDecoration: "underline" }}>
              Formspree
            </a>
            , which securely receives and forwards your submission to us. Formspree's privacy policy is available at formspree.io/legal/privacy-policy.
          </p>
          <p>
            Our website is hosted on Vercel. Standard server logs (IP address, browser type, pages visited) may be recorded by Vercel as part of normal hosting operations.
          </p>
        </Section>

        <Section title="Canadian Anti-Spam Law (CASL)">
          <p>
            By submitting a proposal request, you are providing express consent for The Dollhouse Brand Studio to contact you regarding our services. You may withdraw this consent at any time by emailing us at hello@shopdollhouse.co with "Unsubscribe" in the subject line.
          </p>
        </Section>

        <Section title="Data retention">
          <p>
            We retain your contact information for as long as necessary to fulfill the purpose for which it was collected, or as required by applicable law. If you would like your information removed from our records, please email us and we will action your request within 30 days.
          </p>
        </Section>

        <Section title="Your rights">
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Request access to the personal information we hold about you</li>
            <li>Request that we correct inaccurate information</li>
            <li>Request that we delete your personal information</li>
            <li>Withdraw consent to be contacted at any time</li>
          </ul>
          <p>To exercise any of these rights, contact us at hello@shopdollhouse.co.</p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            We may update this Privacy Policy from time to time. When we do, we will update the "last updated" date at the top of this page. Continued use of our website after any changes constitutes your acceptance of the updated policy.
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
