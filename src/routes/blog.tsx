import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { usePageMeta } from "@/lib/use-page-meta";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/blog")({ component: BlogIndex });

const POSTS: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tint: [string, string];
}[] = [
  {
    slug: "/blog/how-to-get-more-med-spa-patients",
    title: "How to Get More Med Spa Patients in 2026 (Without Chasing Leads)",
    excerpt: "The 2026 med spa marketing playbook — AI Facebook & Instagram ads plus an AI caller that books consultations in 60 seconds.",
    date: "Jun 23, 2026",
    category: "Med Spa Growth",
    tint: ["#f8e7e2", "#f1d3cf"],
  },
  {
    slug: "/blog/med-spa-missed-calls",
    title: "Why Your Med Spa Is Losing Patients to Missed Calls",
    excerpt: "Missed and slow-answered calls quietly cost med spas thousands a month — and how an AI caller books every patient in 60 seconds.",
    date: "Jun 23, 2026",
    category: "Med Spa Growth",
    tint: ["#f6ded8", "#f1d3cf"],
  },
  {
    slug: "/blog/med-spa-facebook-ads",
    title: "Med Spa Facebook & Instagram Ads: What Actually Works in 2026",
    excerpt: "Why Meta beats Google for clinics, the ad creative that converts, and how to turn ad clicks into booked consultations.",
    date: "Jun 23, 2026",
    category: "Med Spa Growth",
    tint: ["#f8e9e5", "#f4dcdc"],
  },
  {
    slug: "/blog/best-ai-receptionist-med-spa",
    title: "The Best AI Receptionist for Med Spas & Clinics in 2026",
    excerpt: "What an AI receptionist does for a med spa, why it books more than a human front desk, and how to set one up in Canada.",
    date: "Jun 23, 2026",
    category: "Med Spa Growth",
    tint: ["#f3e6ef", "#e9d6e8"],
  },
  {
    slug: "/blog/social-media-marketing-agency-toronto",
    title: "How to Choose a Social Media Marketing Agency in Toronto",
    excerpt: "The questions to ask, the red flags to avoid, and what a true done-for-you Toronto agency should actually include.",
    date: "Jun 18, 2026",
    category: "Agency Tips",
    tint: ["#f4dcdc", "#f1d3cf"],
  },
  {
    slug: "/blog/social-media-marketing-cost-toronto",
    title: "How Much Does Social Media Marketing Cost in Toronto & the GTA?",
    excerpt: "A clear 2026 breakdown — DIY vs. freelancer vs. done-for-you agency — and what you actually get at each price.",
    date: "Jun 18, 2026",
    category: "Pricing",
    tint: ["#faf6f1", "#f0e2cf"],
  },
  {
    slug: "/blog/ai-video-marketing-toronto",
    title: "AI Video Marketing for Toronto Businesses: The 2026 Advantage",
    excerpt: "How GTA businesses post daily video without ever filming — what an AI clone is, why it works, and how to start.",
    date: "Jun 18, 2026",
    category: "AI Video",
    tint: ["#f3e6ef", "#e9d6e8"],
  },
  {
    slug: "/blog/social-media-marketing-york-region",
    title: "Social Media Marketing for Service Businesses in York Region & the GTA",
    excerpt: "What to post, what most owners get wrong, and how done-for-you systems turn attention into real, booked leads.",
    date: "Jun 18, 2026",
    category: "Local Marketing",
    tint: ["#f7e6dc", "#f4dcdc"],
  },
];

const CATEGORIES = ["All Posts", "Med Spa Growth", "Agency Tips", "Pricing", "AI Video", "Local Marketing"];

function BlogIndex() {
  usePageMeta(
    "Insights & Updates — Social Media Marketing Tips for GTA Businesses | The Dollhouse Brand Studio",
    "Practical social media marketing tips for service businesses in York Region, Toronto, and the GTA — content, automation, AI, and lead generation.",
  );

  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All Posts");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.filter(
      (p) =>
        (cat === "All Posts" || p.category === cat) &&
        (q === "" || (p.title + " " + p.excerpt + " " + p.category).toLowerCase().includes(q)),
    );
  }, [query, cat]);

  return (
    <main className="min-h-screen" style={{ background: "var(--blush)", color: "var(--ink)" }}>
      {/* Hero banner */}
      <section className="px-6 pt-12 pb-20 text-center" style={{ background: "linear-gradient(160deg, var(--rose) 0%, #a96264 100%)", color: "var(--cream)" }}>
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 opacity-80 hover:opacity-100 transition-opacity" style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--cream)" }}>
            ← Back to home
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(255,255,255,0.16)", fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            <span style={{ color: "var(--gold)" }}>✦</span> Fresh perspectives on business growth
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.6rem, 7vw, 4.4rem)", fontWeight: 400, lineHeight: 1.02 }}>
            Insights &amp; Updates
          </h1>
          <p className="mt-5 mx-auto max-w-xl opacity-90 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.02rem" }}>
            The latest tips, trends, and insights on social media marketing, AI content, and growing service businesses
            across York Region, Toronto, and the GTA.
          </p>
        </div>
      </section>

      {/* Controls + grid */}
      <section className="px-6 -mt-10 pb-24">
        <div className="max-w-5xl mx-auto">
          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 rounded-2xl px-5 py-3.5" style={{ background: "#fff", border: "1px solid color-mix(in oklab, var(--gold) 22%, transparent)", boxShadow: "0 6px 20px rgba(189,116,118,0.10)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles by title or topic…"
                className="w-full bg-transparent outline-none"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "var(--ink)" }}
              />
            </div>
          </div>

          {/* Category chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {CATEGORIES.map((c) => {
              const active = c === cat;
              return (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className="rounded-full px-4 py-1.5 transition-all"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    background: active ? "var(--rose)" : "rgba(255,255,255,0.7)",
                    color: active ? "#fff" : "rgba(30,15,10,0.6)",
                    border: active ? "1px solid var(--rose)" : "1px solid color-mix(in oklab, var(--gold) 22%, transparent)",
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Count */}
          <p className="mt-6 text-center text-[var(--ink)]/45" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem" }}>
            <span className="font-semibold text-[var(--ink)]/70">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "article" : "articles"} available
          </p>

          {/* Cards */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                to={post.slug}
                className="group flex flex-col overflow-hidden rounded-2xl transition-all hover:-translate-y-1"
                style={{ background: "#fff", border: "1px solid color-mix(in oklab, var(--gold) 18%, transparent)", boxShadow: "0 4px 14px rgba(189,116,118,0.07)" }}
              >
                {/* Image area (branded gradient) */}
                <div className="relative h-40" style={{ background: `linear-gradient(135deg, ${post.tint[0]}, ${post.tint[1]})` }}>
                  <span className="absolute top-3 left-3 rounded-full px-3 py-1" style={{ background: "rgba(255,255,255,0.85)", fontFamily: "'Jost', sans-serif", fontSize: "9.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rose)" }}>
                    {post.category}
                  </span>
                  <span className="absolute bottom-3 right-4" style={{ fontFamily: "'Allura', cursive", fontSize: "1.6rem", color: "rgba(189,116,118,0.45)" }}>
                    the dollhouse
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[var(--ink)]/40" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem" }}>
                    {post.date} · The Dollhouse Studio
                  </p>
                  <h2 className="mt-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1.2 }}>
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-[var(--ink)]/60" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", lineHeight: 1.45 }}>
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[var(--rose)] group-hover:gap-2.5 transition-all" style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-[var(--ink)]/45" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              No articles match your search yet — try a different term.
            </p>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
