import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { usePageMeta } from "@/lib/use-page-meta";

export const Route = createFileRoute("/blog_/social-media-marketing-york-region")({
  component: Post,
});

const TITLE = "Social Media Marketing for Service Businesses in York Region & the GTA";
const DESCRIPTION =
  "A practical guide to social media marketing for service businesses in York Region, Toronto, and the GTA — what to post, what most owners get wrong, and how done-for-you systems bring in real leads.";
const SLUG = "https://www.shopdollhouse.co/blog/social-media-marketing-york-region";
const PUBLISHED = "2026-06-18";

function Post() {
  usePageMeta(`${TITLE} | The Dollhouse Brand Studio`, DESCRIPTION);

  useEffect(() => {
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: TITLE,
      description: DESCRIPTION,
      datePublished: PUBLISHED,
      dateModified: PUBLISHED,
      mainEntityOfPage: SLUG,
      author: { "@type": "Organization", name: "The Dollhouse Brand Studio" },
      publisher: {
        "@type": "Organization",
        name: "The Dollhouse Brand Studio",
        logo: { "@type": "ImageObject", url: "https://www.shopdollhouse.co/apple-touch-icon.png" },
      },
      about: ["Social media marketing", "York Region", "Greater Toronto Area", "Service businesses"],
    });
    document.head.appendChild(ld);
    return () => {
      document.head.removeChild(ld);
    };
  }, []);

  const H2 = ({ children }: { children: React.ReactNode }) => (
    <h2
      className="mt-10 mb-3"
      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "var(--ink)", fontWeight: 400 }}
    >
      {children}
    </h2>
  );
  const P = ({ children }: { children: React.ReactNode }) => (
    <p className="mb-4 text-[var(--ink)]/75 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}>
      {children}
    </p>
  );

  return (
    <main className="min-h-screen px-6 py-20" style={{ background: "var(--blush)", color: "var(--ink)" }}>
      <article className="max-w-2xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-70 transition-opacity mb-12"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase" }}
        >
          ← Back to the blog
        </Link>

        <p
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)" }}
        >
          York Region · Toronto · GTA
        </p>
        <h1
          className="mt-3"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, color: "var(--ink)", lineHeight: 1.1 }}
        >
          {TITLE}
        </h1>
        <p className="mt-3 text-[var(--ink)]/45" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem" }}>
          The Dollhouse Brand Studio · June 2026
        </p>
        <div className="mt-4 h-px w-16" style={{ background: "color-mix(in oklab, var(--gold) 50%, transparent)" }} />

        <div className="mt-8">
          <P>
            If you run a service business in York Region or anywhere across the Greater Toronto Area — a clinic, a salon, a
            home-service company, a studio — you are probably excellent at the work itself. The problem is that the people
            who need you can't find you. Your competitors show up daily on Instagram, Facebook, and TikTok, and you're
            posting once a month, if that. This is the single biggest gap we see with local businesses, and it's completely
            fixable.
          </P>

          <H2>Why social media matters for local service businesses</H2>
          <P>
            When someone in Markham, Vaughan, Richmond Hill, or downtown Toronto needs a service, they do two things: they
            search, and they check your social media. An empty or inactive profile quietly tells them you're not busy, not
            current, or not in business anymore. A consistent, professional feed does the opposite — it builds trust before
            you ever speak to them, and it keeps you top of mind until they're ready to book.
          </P>

          <H2>The 3 things most GTA businesses get wrong</H2>
          <P>
            <strong>1. They post inconsistently.</strong> A burst of five posts, then silence for six weeks. The algorithm
            rewards consistency — when you post regularly, platforms show your content to more people.
          </P>
          <P>
            <strong>2. They talk about themselves instead of their customer.</strong> "We've been in business 12 years" means
            far less than "3 signs it's time to replace your roof" or "how to keep your lawn green through an Ontario summer."
            Content built around your customer's questions is what actually gets saved, shared, and found in search.
          </P>
          <P>
            <strong>3. They have no system behind the post.</strong> A like is not a lead. Without missed-call text-back,
            automated follow-up, and an easy way to book, the attention you earn just evaporates.
          </P>

          <H2>What done-for-you social media actually includes</H2>
          <P>
            "Done-for-you" should mean you do nothing. For our York Region and GTA clients, that means daily branded content
            created and posted for them, light paid ads to boost the best posts, missed-call text-back so no lead is ever
            lost, automated 5-star review requests, and a booking website that turns visitors into appointments — all running
            in the background while they focus on the actual work.
          </P>

          <H2>How AI changes the game</H2>
          <P>
            The newest advantage is AI. We can build an AI clone of a business owner — a video version that looks and sounds
            like them — so they can "show up" on camera every day without ever filming. Combined with AI-generated graphics
            and carousels, it lets a local business produce the volume of content that used to require a full team, at a
            fraction of the cost and time.
          </P>

          <H2>Getting started</H2>
          <P>
            You don't need to figure all of this out yourself. The fastest path is to hand it to a team that builds the
            content, the automation, and the lead systems for you.{" "}
            <Link to="/services" style={{ color: "var(--rose)", textDecoration: "underline" }}>
              See our done-for-you plans
            </Link>{" "}
            — built for service businesses across York Region, Toronto, and the wider GTA.
          </P>
        </div>

        <div className="mt-14 pt-10 border-t border-[var(--gold)]/15 text-center">
          <Link to="/services" className="btn-ghost">
            View plans & get a free proposal →
          </Link>
        </div>
      </article>
    </main>
  );
}
