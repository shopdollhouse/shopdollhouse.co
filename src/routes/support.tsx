import { createFileRoute, Link } from "@tanstack/react-router";
import { GUARANTEE_DAYS, SUPPORT_EMAIL } from "@/lib/launch-offer";

export const Route = createFileRoute("/support")({ component: SupportPage });

function SupportPage() {
  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mt-10">
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "var(--ink)", fontWeight: 400 }}>{title}</h2>
      <div className="mt-3 text-[var(--ink)]/70 leading-relaxed space-y-3" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem" }}>
        {children}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen px-6 py-20" style={{ background: "var(--blush)", color: "var(--ink)" }}>
      <div className="max-w-2xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-70 transition-opacity mb-12"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase" }}
        >
          ← Back to home
        </Link>

        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)" }}>
          Dollhouse Launch
        </p>
        <h1 className="mt-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, color: "var(--ink)" }}>
          Support
        </h1>
        <div className="mt-4 h-px w-16" style={{ background: "color-mix(in oklab, var(--gold) 50%, transparent)" }} />

        <Section title="Contact us">
          <p>
            Questions about your order, your posts, your account or your plan? Email{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[var(--rose)] underline">{SUPPORT_EMAIL}</a>{" "}
            and we will get back to you.
          </p>
        </Section>

        <Section title="Refunds and cancelling">
          <p>
            Your plan is covered by a {GUARANTEE_DAYS}-day money-back guarantee, and there is no long-term contract. See the{" "}
            <Link to="/refund-policy" className="text-[var(--rose)] underline">refund policy</Link> for details.
          </p>
        </Section>

        <Section title="Privacy requests">
          <p>
            To change how we contact you or to request access to or deletion of your information, see{" "}
            <a href="/privacy#your-privacy-choices" className="text-[var(--rose)] underline">Your Privacy Choices</a>.
          </p>
        </Section>
      </div>
    </main>
  );
}
