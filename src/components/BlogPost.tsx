import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { usePageMeta } from "@/lib/use-page-meta";

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="mt-10 mb-3"
      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "var(--ink)", fontWeight: 400 }}
    >
      {children}
    </h2>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-[var(--ink)]/75 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}>
      {children}
    </p>
  );
}

export function BlogPost({
  title,
  eyebrow,
  description,
  slug,
  published,
  dateLabel,
  children,
}: {
  title: string;
  eyebrow: string;
  description: string;
  slug: string;
  published: string;
  dateLabel: string;
  children: React.ReactNode;
}) {
  usePageMeta(`${title} | The Dollhouse Brand Studio`, description);

  useEffect(() => {
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      datePublished: published,
      dateModified: published,
      mainEntityOfPage: `https://www.shopdollhouse.co${slug}`,
      author: { "@type": "Organization", name: "The Dollhouse Brand Studio" },
      publisher: {
        "@type": "Organization",
        name: "The Dollhouse Brand Studio",
        logo: { "@type": "ImageObject", url: "https://www.shopdollhouse.co/apple-touch-icon.png" },
      },
      about: ["Social media marketing", "Toronto", "York Region", "Greater Toronto Area"],
    });
    document.head.appendChild(ld);
    return () => {
      document.head.removeChild(ld);
    };
  }, [title, description, slug, published]);

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

        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)" }}>
          {eyebrow}
        </p>
        <h1
          className="mt-3"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, color: "var(--ink)", lineHeight: 1.1 }}
        >
          {title}
        </h1>
        <p className="mt-3 text-[var(--ink)]/45" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem" }}>
          The Dollhouse Brand Studio · {dateLabel}
        </p>
        <div className="mt-4 h-px w-16" style={{ background: "color-mix(in oklab, var(--gold) 50%, transparent)" }} />

        <div className="mt-8">{children}</div>

        <div className="mt-14 pt-10 border-t border-[var(--gold)]/15 text-center">
          <Link to="/services" className="btn-ghost">
            View plans & get a free proposal →
          </Link>
        </div>
      </article>
    </main>
  );
}
