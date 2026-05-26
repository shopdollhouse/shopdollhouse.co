import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links: [string, string][] = [
    ["Services",    "/#services"],
    ["Pricing",     "/#pricing"],
    ["Starter Kit", "/starter-kit"],
    ["FAQ",         "/#faq"],
  ];

  return (
    <nav
      aria-label="Main navigation"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-dollhouse-p0/97 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      } ${scrolled ? "py-2.5" : "py-4"}`}
    >
      <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between">
        <a href="/" className="font-display italic text-dollhouse-ink no-underline flex flex-col items-start leading-tight">
          <span className="text-[9px] tracking-[4px] text-dollhouse-text-light font-normal">the</span>
          <span className="text-[15px] tracking-[4px] uppercase">Dollhouse</span>
          <span className="font-accent not-italic text-[6.5px] tracking-[3px] uppercase text-dollhouse-gold font-semibold mt-[1px]">Brand Studio</span>
        </a>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-7">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="font-accent text-[8px] tracking-[3px] uppercase text-dollhouse-text-light no-underline hover:text-dollhouse-ink transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          <a
            href="/#contact"
            className="hidden md:inline-flex font-accent text-[8px] tracking-[3px] uppercase px-5 py-2.5 bg-dollhouse-ink text-card rounded-pill no-underline hover:opacity-90 transition-opacity"
          >
            Book a Call →
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-transparent border-none cursor-pointer p-1 flex flex-col gap-1 md:hidden"
          >
            <span className={`block w-5 h-[1.5px] bg-dollhouse-ink transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-dollhouse-ink transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-dollhouse-ink transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-dollhouse-p3/15 px-6 py-5 flex flex-col gap-4 md:hidden">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="font-accent text-[10px] tracking-[3px] uppercase text-dollhouse-text-light no-underline"
            >
              {label}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="font-accent text-[10px] tracking-[3px] uppercase text-dollhouse-ink no-underline mt-2"
          >
            Book a Call →
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
