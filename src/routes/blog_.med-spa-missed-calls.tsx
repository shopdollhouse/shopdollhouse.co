import { createFileRoute } from "@tanstack/react-router";
import { BlogPost, H2, P } from "@/components/BlogPost";

export const Route = createFileRoute("/blog_/med-spa-missed-calls")({
  component: Post,
});

const link = { color: "var(--rose)", textDecoration: "underline", textUnderlineOffset: "3px" } as const;

function Post() {
  return (
    <BlogPost
      title="Why Your Med Spa Is Losing Patients to Missed Calls (And How to Fix It)"
      eyebrow="Med Spa Marketing · Lead Follow-Up · Canada"
      description="Missed and slow-answered calls quietly cost med spas thousands every month. Here's why speed-to-lead matters and how an AI caller books every new patient in 60 seconds."
      slug="/blog/med-spa-missed-calls"
      published="2026-06-23"
      dateLabel="June 2026"
    >
      <P>
        Most med spa owners think their growth problem is "not enough leads." It usually isn't. The real leak is missed and
        slow-answered calls — and it's costing clinics thousands of dollars in lost patients every month, quietly, without
        anyone noticing. Here's why it happens and exactly how to fix it.
      </P>

      <H2>The hidden leak in every med spa</H2>
      <P>
        Between a packed front desk, after-hours inquiries, and staff who are with patients all day, the average clinic
        misses 30–40% of inbound calls. Each of those is a potential new-patient consultation. You can spend a fortune on
        Facebook and Instagram ads, but if the leads those ads generate don't get answered fast, the money walks straight
        back out the door.
      </P>

      <H2>Why speed-to-lead is everything</H2>
      <P>
        The data on speed-to-lead is unforgiving: respond within the first minute and your chance of booking the patient is
        dramatically higher than waiting even five minutes. Patients researching a treatment are reaching out to several
        clinics at once — whoever responds first usually wins the booking. In a med spa, where one patient can be worth
        hundreds or thousands, a single slow callback is real money lost.
      </P>

      <H2>Why a human front desk can't keep up</H2>
      <P>
        It's not your team's fault. Humans can't answer every call within 60 seconds while also checking in patients,
        running treatments, and going home at night. Hiring more front-desk staff is expensive and still leaves nights and
        weekends uncovered — the exact times patients browse and reach out.
      </P>

      <H2>The fix: an AI caller that never misses</H2>
      <P>
        The clinics solving this use an AI caller. The moment a lead comes in, it phones them within about 60 seconds,
        sounds completely human, answers questions, qualifies the patient, and books the consultation straight into the
        calendar — 24/7, even at 2 a.m. No missed calls, no cold leads, no lost patients. It's the single highest-ROI fix
        most med spas can make. (For more on the AI side, see{" "}
        <a href="/blog/best-ai-receptionist-med-spa" style={link}>the best AI receptionist for med spas</a>.)
      </P>

      <H2>Stop the leak</H2>
      <P>
        If you're already running ads — or about to — plug this leak first, or you'll keep paying for leads you never book.
        We build the ads <em>and</em> the AI caller as one done-for-you system. See how it works and book a free strategy
        call at{" "}
        <a href="https://clinic.shopdollhouse.co" target="_blank" rel="noopener noreferrer" style={link}>clinic.shopdollhouse.co</a>,
        or start with the full guide on{" "}
        <a href="/blog/how-to-get-more-med-spa-patients" style={link}>how to get more med spa patients</a>.
      </P>
    </BlogPost>
  );
}
