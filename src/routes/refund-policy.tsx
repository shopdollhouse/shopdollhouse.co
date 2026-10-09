import { createFileRoute, Link } from "@tanstack/react-router";
import { GUARANTEE_DAYS } from "@/lib/launch-offer";

export const Route = createFileRoute("/refund-policy")({ component: RefundPolicyPage });

function RefundPolicyPage() {
  const updated = "October 2026";

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mt-10">
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "var(--ink)", fontWeight: 400 }}>{title}</h2>
      <div className="mt-3 text-[var(--ink)]/70 leading-relaxed space-y-3" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem" }}>
        {children}
      </div>
    </div>
  );

  return (
    <main className="lux min-h-screen px-6 py-20" style={{ background: "var(--blush)", color: "var(--ink)" }}>
      <div className="max-w-2xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-70 transition-opacity mb-12"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase" }}
        >
          ← Back to home
        </Link>

        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)" }}>
          The Dollhouse Brand Studio
        </p>
        <h1 className="mt-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, color: "var(--ink)" }}>
          Refund Policy
        </h1>
        <p className="mt-2 text-[var(--ink)]/45" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem" }}>
          Last updated: {updated}
        </p>
        <div className="mt-4 h-px w-16" style={{ background: "color-mix(in oklab, var(--gold) 50%, transparent)" }} />

        <Section title={`${GUARANTEE_DAYS}-day money-back guarantee`}>
          <p>
            If you are not satisfied with your monthly social media plan, contact us within your first {GUARANTEE_DAYS} days and we will refund your payment in full. You do not need to give a reason.
          </p>
        </Section>

        <Section title="How to request a refund">
          <p>
            Email <a href="mailto:hello@shopdollhouse.co" className="text-[var(--rose)] underline">hello@shopdollhouse.co</a> from the address you used to order, within {GUARANTEE_DAYS} days of your first payment. We will confirm your request and process the refund to your original payment method. Your bank may take several business days to show it.
          </p>
        </Section>

        <Section title="Cancelling">
          <p>
            There is no long-term contract. You can cancel your plan anytime and it will not renew. Cancelling after the {GUARANTEE_DAYS}-day window stops future billing but does not refund payments already made for a month that has started.
          </p>
        </Section>

        <Section title="What is not covered">
          <p>
            The guarantee applies to your first payment for your plan. Optional add-ons you approve separately, and any third-party costs you incur directly, are outside it.
          </p>
        </Section>

        <Section title="Questions">
          <p>
            Write to <a href="mailto:hello@shopdollhouse.co" className="text-[var(--rose)] underline">hello@shopdollhouse.co</a> and we will get back to you.
          </p>
        </Section>
      </div>
    </main>
  );
}
