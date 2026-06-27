import { Link } from "@tanstack/react-router";

const exploreLinks: [string, string][] = [
  ["Services", "/#services"],
  ["Pricing", "/#pricing"],
  ["FAQ", "/#faq"],
  ["Proposal", "/#contact"],
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--gold)]/15 px-6 py-14" style={{ background: "linear-gradient(180deg, #f4dcdc 0%, #f8ebe7 100%)" }}>
      <div className="max-w-6xl mx-auto grid gap-10 md:grid-cols-[1.1fr_0.9fr_0.9fr] items-start">
        <div>
          <div className="inline-flex flex-col items-start" style={{ gap: "1px" }}>
            <span className="text-[var(--ink)]/50 font-normal" style={{ fontFamily: "'Allura', cursive", fontSize: "22px", letterSpacing: "1px", textTransform: "lowercase", lineHeight: 1 }}>the</span>
            <span className="text-[var(--ink)] italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", letterSpacing: "5px", textTransform: "uppercase", lineHeight: 1 }}>Dollhouse</span>
            <p className="text-[var(--gold)] font-semibold" style={{ fontFamily: "'Jost', sans-serif", fontSize: "8px", letterSpacing: "3px", textTransform: "uppercase", marginTop: "4px" }}>Brand Studio</p>
          </div>
          <p className="mt-5 max-w-sm text-[var(--ink)]/58 leading-7" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem" }}>
            Done-for-you content, ads, AI clone, and follow-up systems for business owners who want the work handled beautifully.
          </p>
        </div>

        <div>
          <p className="text-[var(--gold)] text-[10px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>Explore</p>
          <div className="mt-4 grid gap-2">
            {exploreLinks.map(([label, href]) => (
              <a key={href} href={href} className="text-[var(--ink)]/58 hover:text-[var(--rose)] transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {label}
              </a>
            ))}
            <a href="https://shopdollhouse-clone.vibepreview.com/blog" className="text-[var(--ink)]/58 hover:text-[var(--rose)] transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Blog
            </a>
            <Link to="/careers" className="text-[var(--ink)]/58 hover:text-[var(--rose)] transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Careers
            </Link>
          </div>
        </div>

        <div>
          <p className="text-[var(--gold)] text-[10px] tracking-luxe uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>Contact</p>
          <a href="mailto:hello@shopdollhouse.co" className="mt-4 block text-[var(--ink)]/68 hover:text-[var(--rose)] transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.78rem", letterSpacing: "0.12em" }}>
            hello@shopdollhouse.co
          </a>
          <a href="tel:+12893014567" className="mt-2 block text-[var(--ink)]/68 hover:text-[var(--rose)] transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.78rem", letterSpacing: "0.12em" }}>
            +1 (289) 301-4567
          </a>
          <a href="/#contact" className="mt-5 inline-flex rounded-full px-5 py-3 text-[var(--cream)] bg-[var(--ink)] hover:opacity-90 transition-opacity" style={{ fontFamily: "'Jost', sans-serif", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            Get a proposal →
          </a>
        </div>
      </div>

      <div className="mt-12 max-w-6xl mx-auto flex items-center justify-center gap-6">
        <a href="https://www.instagram.com/thedollhousestudio/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[var(--ink)]/40 hover:text-[var(--rose)] transition-colors">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.6" cy="6.4" r="1" fill="currentColor" stroke="none" /></svg>
        </a>
        <a href="https://www.facebook.com/shopdollhouseco" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[var(--ink)]/40 hover:text-[var(--rose)] transition-colors">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" /></svg>
        </a>
        <a href="https://www.linkedin.com/company/the-dollhouse-brand-studio" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[var(--ink)]/40 hover:text-[var(--rose)] transition-colors">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.65h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9z" /></svg>
        </a>
      </div>

      <div className="mt-6 max-w-6xl mx-auto flex flex-col gap-3 border-t border-[var(--gold)]/18 pt-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <p className="text-xs text-[var(--ink)]/35" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          © {new Date().getFullYear()} The Dollhouse Brand Studio. All rights reserved. · Made in 🇨🇦 w/{" "}
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-label="love"
            style={{ display: "inline-block", verticalAlign: "-1px", color: "var(--rose)", opacity: 0.5 }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </p>
        <div className="flex items-center justify-center gap-5">
          <Link to="/privacy" className="text-[var(--ink)]/35 hover:text-[var(--ink)]/58 transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-[var(--ink)]/35 hover:text-[var(--ink)]/58 transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Terms of Service
          </Link>
          <Link to="/playbook" className="text-[var(--ink)]/45 hover:text-[var(--ink)]/70 transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
