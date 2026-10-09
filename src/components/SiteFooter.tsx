import archMark from "@/assets/arch-mark.svg";

const links: [string, string][] = [
  ["What's Included", "/#whats-included"],
  ["How It Works", "/#how-it-works"],
  ["Plans & Pricing", "/#plans"],
  ["FAQ", "/#faq"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Your Privacy Choices", "/privacy#your-privacy-choices"],
  ["Refund Policy", "/refund-policy"],
  ["Support", "/support"],
];

export function SiteFooter() {
  return (
    <footer className="px-6 pb-10 pt-4 bg-[var(--cream)]">
      <div className="mx-auto max-w-6xl border-t pt-8" style={{ borderColor: "color-mix(in oklab, var(--gold) 28%, transparent)" }}>
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
          <a href="/" className="flex shrink-0 items-center gap-2.5 no-underline">
            <img src={archMark} alt="" className="h-10 w-auto" />
            <span className="flex flex-col items-start leading-none">
              <span style={{ fontFamily: "'Allura', cursive", color: "var(--gold)", fontSize: "20px", lineHeight: 1 }}>the</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--rose)", fontSize: "19px", fontWeight: 500, letterSpacing: "5px", textTransform: "uppercase", lineHeight: 1, marginTop: "-1px" }}>Dollhouse</span>
              <span className="font-semibold" style={{ fontFamily: "'Jost', sans-serif", color: "var(--gold)", fontSize: "7px", letterSpacing: "6px", textTransform: "uppercase", marginTop: "2px" }}>Launch</span>
            </span>
          </a>
          <p className="max-w-xs text-[var(--ink)]/55 leading-6" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem" }}>
            Done-for-you marketing for local businesses.
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {links.map(([label, href]) => (
              <a key={label} href={href} className="text-[var(--ink)]/55 hover:text-[var(--rose)] transition-colors" style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                {label}
              </a>
            ))}
          </nav>
        </div>
        <p className="mt-6 text-center text-[var(--ink)]/40" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem" }}>
          © {new Date().getFullYear()} The Dollhouse Brand Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
