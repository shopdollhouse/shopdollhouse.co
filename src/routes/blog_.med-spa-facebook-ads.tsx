import { createFileRoute } from "@tanstack/react-router";
import { BlogPost, H2, P } from "@/components/BlogPost";

export const Route = createFileRoute("/blog_/med-spa-facebook-ads")({
  component: Post,
});

const link = { color: "var(--rose)", textDecoration: "underline", textUnderlineOffset: "3px" } as const;

function Post() {
  return (
    <BlogPost
      title="Med Spa Facebook & Instagram Ads: What Actually Works in 2026"
      eyebrow="Med Spa Marketing · Paid Ads · Canada"
      description="A 2026 guide to med spa Facebook and Instagram ads — why Meta beats Google for clinics, the ad creative that converts, and how to turn ad clicks into booked consultations."
      slug="/blog/med-spa-facebook-ads"
      published="2026-06-23"
      dateLabel="June 2026"
    >
      <P>
        Facebook and Instagram ads are still the fastest, cheapest way to get new patients into a med spa in 2026 — when
        they're done right. The problem is most clinics run the wrong kind of ad, to the wrong audience, and then drop the
        ball on follow-up. Here's what actually works for med spa Facebook and Instagram ads this year.
      </P>

      <H2>Why Meta beats Google for med spas</H2>
      <P>
        Google Ads only reach people already searching for a treatment. Meta ads (Facebook and Instagram) put your med spa
        in front of the right local audience <em>before</em> they've decided — which is exactly where most aesthetic
        patients are. For the cost per booked consultation, Facebook and Instagram ads consistently win for med spas,
        especially for visual, trust-based treatments.
      </P>

      <H2>The ad creative that converts</H2>
      <P>
        Polished graphics and generic before-and-afters don't perform anymore. What works is short, human-feeling video —
        one-to-two minutes that educate the patient and build trust before they ever reach you. Video that looks like a
        real person talking outperforms studio ads almost every time, and it gives you room to explain your treatment,
        which warms patients up so they show up ready to book.
      </P>

      <H2>Targeting and testing</H2>
      <P>
        Keep targeting local and let Meta's algorithm optimize for booked leads. The real edge is volume of testing — the
        clinics that win run dozens of hooks and angles, kill the losers fast, and pour budget into the winners. Treat
        your med spa ads like a science experiment, not a one-and-done post.
      </P>

      <H2>The piece almost everyone misses</H2>
      <P>
        Here's the part that quietly wastes ad budgets: great ads generate leads, but if no one follows up fast, those
        leads go cold. Med spas lose a huge share of paid leads simply because nobody calls them back quickly — more on
        that in{" "}
        <a href="/blog/med-spa-missed-calls" style={link}>why your med spa is losing patients to missed calls</a>. The
        clinics getting the best return pair their ads with an AI caller that books every lead in about 60 seconds.
      </P>

      <H2>Put it together</H2>
      <P>
        Med spa Facebook and Instagram ads work best as one half of a system: ads that bring the right patients, and
        instant follow-up that books them. That's exactly the done-for-you setup we build for clinics — see how it works
        and book a free strategy call at{" "}
        <a href="https://clinic.shopdollhouse.co" target="_blank" rel="noopener noreferrer" style={link}>clinic.shopdollhouse.co</a>,
        or read the full playbook on{" "}
        <a href="/blog/how-to-get-more-med-spa-patients" style={link}>how to get more med spa patients in 2026</a>.
      </P>
    </BlogPost>
  );
}
