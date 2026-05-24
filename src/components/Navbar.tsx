import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const STAN_STORE = "https://stan.store/shopdollhouse";
const ETSY_SHOP = "https://www.etsy.com/ca/shop/herDOLLHOUSE";
const CONTACT_EMAIL = "hello@shopdollhouse.co";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError("Enter your name"); return; }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Enter a valid email"); return; }
    const entry = { name: name.trim(), email: email.trim(), date: new Date().toISOString(), result: null, source: "navbar" };
    const existing = JSON.parse(localStorage.getItem("dh_quiz_leads") || "[]");
    existing.push(entry);
    localStorage.setItem("dh_quiz_leads", JSON.stringify(existing));
    const oldLeads = JSON.parse(localStorage.getItem("quizLeads") || "[]");
    oldLeads.push({ email: email.trim(), name: name.trim(), source: "navbar", timestamp: new Date().toISOString() });
    localStorage.setItem("quizLeads", JSON.stringify(oldLeads));
    localStorage.setItem("dh_homepage_lead", JSON.stringify({ name: name.trim(), email: email.trim() }));
    setShowQuizForm(false);
    navigate("/quiz");
  };

  const links: [string, string][] = [
    ["The Rooms", "/#the-rooms"],
    ["Done-For-You", "/#dfy"],
    ["Local Business", "/local-business"],
    ["About", "/#about"],
    ["FAQ", "/#faq"],
  ];

  return (
    <>
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

            <button
              onClick={() => setShowQuizForm(!showQuizForm)}
              className="hidden sm:inline-flex items-center gap-1.5 font-accent text-[8px] tracking-[3px] uppercase px-4 py-2 rounded-pill border border-dollhouse-gold/40 text-dollhouse-gold bg-transparent cursor-pointer hover:bg-dollhouse-gold/10 transition-all"
            >
              <span className="text-[10px]">✦</span> Free Quiz
            </button>

            <div className="hidden md:flex items-center gap-2">
              <a
                href={STAN_STORE}
                target="_blank"
                rel="noopener noreferrer"
                className="font-accent text-[8px] tracking-[3px] uppercase px-4 py-2 bg-dollhouse-ink text-card rounded-pill no-underline hover:opacity-90 transition-opacity"
              >
                Stan Store →
              </a>
              <a
                href={ETSY_SHOP}
                target="_blank"
                rel="noopener noreferrer"
                className="font-accent text-[8px] tracking-[3px] uppercase px-4 py-2 bg-dollhouse-p3 text-dollhouse-ink rounded-pill no-underline hover:opacity-90 transition-opacity"
              >
                Etsy →
              </a>
            </div>

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
            <div className="flex flex-col gap-2 mt-2">
              <a
                href={STAN_STORE}
                target="_blank"
                rel="noopener noreferrer"
                className="font-accent text-[10px] tracking-[3px] uppercase text-dollhouse-ink no-underline"
              >
                Stan Store →
              </a>
              <a
                href={ETSY_SHOP}
                target="_blank"
                rel="noopener noreferrer"
                className="font-accent text-[10px] tracking-[3px] uppercase text-dollhouse-p3 no-underline"
              >
                Etsy →
              </a>
            </div>
            <button
              onClick={() => { setMenuOpen(false); setShowQuizForm(true); }}
              className="font-accent text-[10px] tracking-[3px] uppercase text-dollhouse-gold no-underline flex items-center gap-1.5 bg-transparent border-none cursor-pointer p-0 text-left mt-2"
            >
              <span>✦</span> Free Brand Quiz
            </button>
          </div>
        )}
      </nav>

      {showQuizForm && (
        <div className="bg-dollhouse-p1 border-b border-dollhouse-p2 py-4 px-6 z-40">
          <form onSubmit={handleQuizSubmit} className="max-w-[500px] mx-auto flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              placeholder="First name"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
              className="px-3 py-2 rounded-md text-[11px] font-display text-dollhouse-ink bg-card border border-dollhouse-p2 outline-none w-full sm:w-[130px]"
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              className="px-3 py-2 rounded-md text-[11px] font-display text-dollhouse-ink bg-card border border-dollhouse-p2 outline-none w-full sm:w-[180px]"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-dollhouse-gold text-dollhouse-ink font-accent text-[8px] tracking-[2px] uppercase font-bold border-none cursor-pointer hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Start Quiz →
            </button>
            {error && <span className="text-[10px] text-red-500">{error}</span>}
          </form>
        </div>
      )}
    </>
  );
};

export default Navbar;
