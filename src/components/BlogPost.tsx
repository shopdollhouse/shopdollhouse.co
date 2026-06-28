import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { usePageMeta } from "@/lib/use-page-meta";
import { SiteFooter } from "@/components/SiteFooter";

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-12 mb-3 flex items-baseline gap-2.5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "var(--ink)", fontWeight: 400, lineHeight: 1.2 }}>
      <span style={{ color: "var(--gold)", fontSize: "0.85rem" }}>✦</span>
      <span>{children}</span>
    </h2>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.06rem", lineHeight: 1.85, color: "rgba(30,15,10,0.8)" }}>
      {children}
    </p>
  );
}

function ShareRow({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const e = encodeURIComponent;
  const links = [
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${e(url)}`, icon: <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" /> },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${e(url)}`, icon: <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.65h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9z" /> },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${e(url)}&text=${e(title)}`, icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" /> },
  ];
  const copy = () => {
    navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="mt-14 pt-8 border-t border-[var(--gold)]/15 text-center">
      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)" }}>
        Share this article
      </p>
      <div className="mt-4 flex items-center justify-center gap-3">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${l.label}`}
            className="inline-flex items-center justify-center rounded-full transition-all hover:-translate-y-0.5"
            style={{ width: 42, height: 42, border: "1px solid color-mix(in oklab, var(--gold) 35%, transparent)", color: "var(--rose)", background: "rgba(255,255,255,0.6)" }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">{l.icon}</svg>
          </a>
        ))}
        <button
          onClick={copy}
          aria-label="Copy link"
          className="inline-flex items-center justify-center rounded-full transition-all hover:-translate-y-0.5"
          style={{ width: 42, height: 42, border: "1px solid color-mix(in oklab, var(--gold) 35%, transparent)", color: copied ? "#4a7a4a" : "var(--rose)", background: "rgba(255,255,255,0.6)" }}
        >
          {copied ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5 9 17.5 20 6.5" /></svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
          )}
        </button>
      </div>
      {copied && (
        <p className="mt-2 text-[var(--ink)]/45" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem" }}>Link copied!</p>
      )}
    </div>
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
  const url = `https://shopdollhouse.co${slug}`;

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
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "The Dollhouse Brand Studio" },
      publisher: {
        "@type": "Organization",
        name: "The Dollhouse Brand Studio",
        logo: { "@type": "ImageObject", url: "https://shopdollhouse.co/apple-touch-icon.png" },
      },
      about: ["Social media marketing", "Toronto", "York Region", "Greater Toronto Area"],
    });
    document.head.appendChild(ld);
    return () => {
      document.head.removeChild(ld);
    };
  }, [title, description, url, published]);

  return (
    <main className="min-h-screen" style={{ background: "var(--blush)", color: "var(--ink)" }}>
      <article className="max-w-2xl mx-auto px-6 pt-16 pb-4">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-70 transition-opacity mb-12"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase" }}
        >
          ← Back to the blog
        </Link>

        {/* Header */}
        <div className="text-center">
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--gold)" }}>
            {eyebrow}
          </p>
          <h1
            className="mt-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.1rem, 5.5vw, 3.2rem)", fontWeight: 400, color: "var(--ink)", lineHeight: 1.12 }}
          >
            {title}
          </h1>
          <div className="mt-5 flex items-center justify-center gap-3 text-[var(--ink)]/45" style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            <span>The Dollhouse Studio</span>
            <span style={{ color: "var(--gold)" }}>✦</span>
            <span>{dateLabel}</span>
          </div>
          <div className="mt-6 h-px w-20 mx-auto" style={{ background: "color-mix(in oklab, var(--gold) 50%, transparent)" }} />
        </div>

        {/* Body */}
        <div className="dh-article mt-10">{children}</div>

        <ShareRow url={url} title={title} />

        <div className="mt-12 text-center">
          <Link to="/services" className="btn-ghost">
            View plans & get a free proposal →
          </Link>
        </div>
      </article>

      <div className="mt-16">
        <SiteFooter />
      </div>
    </main>
  );
}
