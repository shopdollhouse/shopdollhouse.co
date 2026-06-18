import { createFileRoute, Link } from "@tanstack/react-router";
import { usePageMeta } from "@/lib/use-page-meta";

export const Route = createFileRoute("/blog")({ component: BlogIndex });

const POSTS: { slug: string; title: string; excerpt: string; date: string; tag: string }[] = [
  {
    slug: "/blog/social-media-marketing-agency-toronto",
    title: "How to Choose a Social Media Marketing Agency in Toronto",
    excerpt:
      "The questions to ask, the red flags to avoid, and what a true done-for-you Toronto agency should actually include.",
    date: "June 2026",
    tag: "Toronto · GTA",
  },
  {
    slug: "/blog/social-media-marketing-cost-toronto",
    title: "How Much Does Social Media Marketing Cost in Toronto & the GTA?",
    excerpt:
      "A clear 2026 breakdown — DIY vs. freelancer vs. done-for-you agency — and what you actually get at each price.",
    date: "June 2026",
    tag: "Toronto · Pricing",
  },
  {
    slug: "/blog/ai-video-marketing-toronto",
    title: "AI Video Marketing for Toronto Businesses: The 2026 Advantage",
    excerpt:
      "How GTA businesses post daily video without ever filming — what an AI clone is, why it works, and how to start.",
    date: "June 2026",
    tag: "Toronto · AI",
  },
  {
    slug: "/blog/social-media-marketing-york-region",
    title: "Social Media Marketing for Service Businesses in York Region & the GTA",
    excerpt:
      "What to post, what most owners get wrong, and how done-for-you systems turn attention into real, booked leads.",
    date: "June 2026",
    tag: "York Region · GTA",
  },
];

function BlogIndex() {
  usePageMeta(
    "Blog — Social Media Marketing Tips for GTA Businesses | The Dollhouse Brand Studio",
    "Practical social media marketing tips for service businesses in York Region, Toronto, and the GTA — content, automation, AI, and lead generation.",
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

        <p
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)" }}
        >
          The Dollhouse Brand Studio
        </p>
        <h1
          className="mt-3"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, color: "var(--ink)" }}
        >
          The Blog
        </h1>
        <p className="mt-2 text-[var(--ink)]/55" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem" }}>
          Social media marketing tips for service businesses across York Region, Toronto & the GTA.
        </p>
        <div className="mt-4 h-px w-16" style={{ background: "color-mix(in oklab, var(--gold) 50%, transparent)" }} />

        <div className="mt-10 space-y-6">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              to={post.slug}
              className="block rounded-2xl p-6 transition-all hover:opacity-90"
              style={{ border: "1px solid color-mix(in oklab, var(--gold) 25%, transparent)", background: "rgba(255,255,255,0.55)" }}
            >
              <p
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}
              >
                {post.tag} · {post.date}
              </p>
              <h2
                className="mt-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1.2 }}
              >
                {post.title}
              </h2>
              <p className="mt-2 text-[var(--ink)]/65" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem" }}>
                {post.excerpt}
              </p>
              <span
                className="inline-block mt-3 text-[var(--rose)]"
                style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
