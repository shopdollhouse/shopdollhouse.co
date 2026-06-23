import { createFileRoute } from "@tanstack/react-router";
import { BlogPost, H2, P } from "@/components/BlogPost";

export const Route = createFileRoute("/blog_/best-ai-receptionist-med-spa")({
  component: Post,
});

const link = { color: "var(--rose)", textDecoration: "underline", textUnderlineOffset: "3px" } as const;

function Post() {
  return (
    <BlogPost
      title="The Best AI Receptionist for Med Spas & Clinics in 2026"
      eyebrow="Med Spa Marketing · AI · Canada"
      description="What an AI receptionist (AI caller) does for a med spa, why it books more consultations than a human front desk, and how to set one up for your clinic in Canada."
      slug="/blog/best-ai-receptionist-med-spa"
      published="2026-06-23"
      dateLabel="June 2026"
    >
      <P>
        An AI receptionist — sometimes called an AI caller or AI voice agent — is quickly becoming the most valuable tool a
        med spa can have. It answers and calls leads like a human, 24/7, and books consultations straight into your
        calendar. Here's what it does, why it outperforms a traditional front desk for new-patient bookings, and how to get
        one for your clinic.
      </P>

      <H2>What an AI receptionist actually does</H2>
      <P>
        For a med spa, an AI receptionist phones every new lead within about 60 seconds of them reaching out, sounds
        natural and on-brand, answers common questions about your treatments, qualifies the patient, and books the
        consultation into your calendar. If they don't pick up, it follows up several times over the next week at smart
        times. It runs around the clock — nights, weekends, holidays — so no inquiry ever goes unanswered.
      </P>

      <H2>AI receptionist vs. a human front desk</H2>
      <P>
        A great front-desk team is valuable — but they can't answer every call within a minute while also running
        treatments, and they don't work at 2 a.m. An AI receptionist never misses a call, never has an off day, and books
        consistently. It doesn't replace your team's warmth in the clinic; it captures the patients your team can't get to
        in time. For more on that lost revenue, see{" "}
        <a href="/blog/med-spa-missed-calls" style={link}>why your med spa is losing patients to missed calls</a>.
      </P>

      <H2>Is it compliant in Canada?</H2>
      <P>
        Yes, when set up properly. A good AI receptionist for a Canadian clinic contacts opted-in inbound leads only,
        keeps texts and emails consent-based (CASL), follows Canadian privacy law (PIPEDA), and stays focused on booking
        consultations — never making medical claims. Done right, it's both compliant and far more effective than manual
        follow-up.
      </P>

      <H2>How to get one for your clinic</H2>
      <P>
        The best results come when your AI receptionist is paired with the ads that feed it leads — otherwise you have a
        great phone system and nothing to answer. We build both as one done-for-you system: Facebook and Instagram ads
        that bring in patients, and an AI caller that books them. Your AI caller is built for you and yours to keep. See
        how it works and book a free strategy call at{" "}
        <a href="https://clinic.shopdollhouse.co" target="_blank" rel="noopener noreferrer" style={link}>clinic.shopdollhouse.co</a>,
        or read the full guide on{" "}
        <a href="/blog/how-to-get-more-med-spa-patients" style={link}>how to get more med spa patients in 2026</a>.
      </P>
    </BlogPost>
  );
}
