import { useState, type FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Eyebrow from "@/components/Eyebrow";
import DollhouseArch from "@/components/DollhouseArch";
import HeartDivider from "@/components/HeartDivider";
import CornerFrame from "@/components/CornerFrame";
import LegalModal, { useLegalModal } from "@/components/LegalModal";
import useScrollReveal from "@/hooks/useScrollReveal";
import heroRoseBg from "@/assets/hero-rose-bg.jpg";

const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/mwvrvrzj";

// ─── Mockup palette ────────────────────────────────────────────────────────────
const M = {
  cream:    "#faf3ea",
  blush:    "#f3dccd",
  champ:    "#c8a877",
  champDk:  "#a3854e",
  espresso: "#1f140d",
  espMid:   "#6b5240",
  espLt:    "#a3897a",
  soft:     "rgba(200,168,119,0.18)",
};
const mFont = { display: "'Cormorant Garamond', serif", body: "'Outfit','Inter',sans-serif" };

// ─── Content data ──────────────────────────────────────────────────────────────
const features = [
  {
    eyebrow: "Content & Social Media Management",
    title:   "Branded content, created and published for you — every day.",
    sub:     "Show up consistently without lifting a finger.",
    body:    "We handle the strategy, writing, design, and scheduling. Branded posts go live across your platforms on time, every time — captions, hashtags, and visuals all done. You stay focused on running your business.",
    mockup:  "schedule",
  },
  {
    eyebrow: "Paid Social & Search Advertising",
    title:   "Facebook, Instagram, and Google ads that bring in real leads.",
    sub:     "More reach. More bookings. Less guesswork.",
    body:    "We build and manage your ad campaigns from scratch — audience targeting, ad creative, budget allocation, and daily optimisation. Every dollar is tracked and working toward your growth.",
    mockup:  "ai",
  },
  {
    eyebrow: "Strategy, Analytics & Reporting",
    title:   "Always know what's working — and a plan to scale it.",
    sub:     "Clear data. Smarter decisions. Every month.",
    body:    "Detailed performance reports and a dedicated monthly strategy session keep you in the loop. We track what's growing your business and build the next month's plan around what's working.",
    mockup:  "analytics",
  },
];

const plans = [
  {
    name:    "Starter",
    price:   "$1,000",
    tagline: "Get visible. Get consistent.",
    items: [
      "Social media management (1 platform)",
      "Content creation & scheduling",
      "Branded posts published for you",
      "Caption & hashtag writing",
      "Monthly analytics report",
    ],
    featured: false,
    dark: false,
  },
  {
    name:    "Growth",
    price:   "$2,500",
    tagline: "More reach. More leads. More revenue.",
    items: [
      "Social media management (all platforms)",
      "Social media ad creation & management",
      "Email marketing automations",
      "Content calendar & strategy",
      "Advanced analytics dashboard",
      "Monthly strategy session",
    ],
    featured: true,
    dark: false,
  },
  {
    name:    "Elite",
    price:   "$5,000+",
    tagline: "Full-service. Everything handled.",
    items: [
      "Facebook & Instagram ad management",
      "Social media management (all platforms)",
      "Google ad campaigns",
      "Review automation & reputation management",
      "Email & SMS marketing campaigns",
      "Website or landing page funnel",
      "Bi-weekly strategy calls",
      "Weekly performance reports",
    ],
    featured: false,
    dark: true,
  },
];

const faqs = [
  { q: "What does 'done-for-you' actually mean?", a: "It means we handle everything — strategy, content creation, scheduling, ad management, email campaigns, and reporting. You review and approve, we execute. No learning curves, no software to figure out." },
  { q: "What platforms do you manage?", a: "Instagram, TikTok, Facebook, Google Business, and email. The Starter plan covers one platform. Growth and Elite cover all of them working together as one system." },
  { q: "How do you learn my brand voice?", a: "We start with a deep-dive onboarding session — your tone, audience, goals, and what makes your business different. Everything we create from day one sounds like you, not a template." },
  { q: "Do I have to approve content before it goes live?", a: "Yes, always. We send you a content calendar each month. You can request edits, swap ideas, or approve as-is — you stay in full control of what goes out." },
  { q: "Is there a minimum commitment?", a: "We ask for a 3-month minimum on all plans. Real results from social media and ads take time to build — we're not interested in one-month relationships." },
  { q: "Is pricing in USD?", a: "Yes, all pricing is in USD. Most clients see a return within the first 60–90 days from new leads, bookings, and inquiries generated through their marketing." },
  { q: "What kinds of businesses do you work with?", a: "Established local businesses ready to invest in real growth — salons, clinics, restaurants, fitness studios, contractors, retail, and service businesses across North America." },
  { q: "What's included in the Elite funnel or website build?", a: "A conversion-optimised landing page or full website built to capture leads and turn visitors into clients — copywriting, design, and technical setup all included." },
];

// ─── Mockup UI components ──────────────────────────────────────────────────────
function AIMockup() {
  return (
    <div style={{ background: "#fff", borderRadius: "20px", boxShadow: "0 18px 55px -16px rgba(31,20,13,0.12), 0 4px 18px -4px rgba(200,168,119,0.10)", border: `1px solid ${M.soft}`, padding: "22px", maxWidth: "320px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", paddingBottom: "14px", borderBottom: `1px solid ${M.soft}` }}>
        <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: `linear-gradient(135deg,${M.champ},${M.champDk})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: M.cream, fontSize: "14px" }}>✦</span>
        </div>
        <div>
          <div style={{ fontFamily: mFont.body, fontWeight: 600, fontSize: "13px", color: M.espresso }}>AI Content Studio</div>
          <div style={{ fontFamily: mFont.body, fontSize: "10px", color: M.espLt }}>Generating caption…</div>
        </div>
      </div>
      <div style={{ background: "rgba(200,168,119,0.07)", borderRadius: "12px", padding: "14px", marginBottom: "12px", border: `1px solid ${M.soft}` }}>
        <div style={{ fontFamily: mFont.body, fontSize: "10px", color: M.champDk, fontWeight: 600, letterSpacing: "2px", marginBottom: "8px" }}>PROMPT</div>
        <div style={{ fontFamily: mFont.body, fontSize: "13px", color: M.espMid, lineHeight: 1.5 }}>Behind the scenes at our salon this Saturday 🌸</div>
      </div>
      <div style={{ background: M.cream, borderRadius: "12px", padding: "14px", border: `1px solid ${M.soft}` }}>
        <div style={{ fontFamily: mFont.body, fontSize: "10px", color: M.champDk, fontWeight: 600, letterSpacing: "2px", marginBottom: "8px" }}>GENERATED CAPTION</div>
        <p style={{ fontFamily: mFont.body, fontSize: "12.5px", color: M.espresso, lineHeight: 1.65, margin: "0 0 10px" }}>
          Saturday magic is in the making ✨ Swipe to see how we prep for our busiest day of the week — from first coffee to last client. Slide into our DMs to book your spot. 🌿
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {["#localsalon", "#socialmedia", "#behindthescenes", "#salonlife"].map(tag => (
            <span key={tag} style={{ background: "rgba(200,168,119,0.15)", borderRadius: "9999px", padding: "2px 8px", fontSize: "10px", color: M.champDk, fontFamily: mFont.body }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScheduleMockup() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const posts: Record<string, { platform: string; color: string }[]> = {
    Mon: [{ platform: "IG", color: "#E1306C" }],
    Wed: [{ platform: "TK", color: "#000" }, { platform: "FB", color: "#1877F2" }],
    Fri: [{ platform: "IG", color: "#E1306C" }, { platform: "G", color: "#4285F4" }],
    Sat: [{ platform: "TK", color: "#000" }],
  };
  return (
    <div style={{ background: "#fff", borderRadius: "20px", boxShadow: "0 18px 55px -16px rgba(31,20,13,0.12)", border: `1px solid ${M.soft}`, padding: "22px", maxWidth: "320px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span style={{ fontFamily: mFont.display, fontStyle: "italic", fontSize: "18px", color: M.espresso }}>June 2025</span>
        <div style={{ background: "rgba(200,168,119,0.15)", borderRadius: "9999px", padding: "4px 12px", fontFamily: mFont.body, fontSize: "10px", color: M.champDk, fontWeight: 600 }}>12 posts queued</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "6px" }}>
        {days.map(d => (
          <div key={d} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: mFont.body, fontSize: "9px", color: M.espLt, fontWeight: 600, marginBottom: "6px" }}>{d}</div>
            <div style={{ minHeight: "40px", borderRadius: "8px", background: "rgba(200,168,119,0.06)", border: `1px solid ${M.soft}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "3px", padding: "3px" }}>
              {(posts[d] || []).map(p => (
                <div key={p.platform} style={{ width: "20px", height: "20px", borderRadius: "5px", background: p.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "8px", fontWeight: 800, fontFamily: mFont.body }}>{p.platform}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "14px", borderTop: `1px solid ${M.soft}`, paddingTop: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
        {[{ label: "Instagram", color: "#E1306C", n: 5 }, { label: "TikTok", color: "#000", n: 4 }, { label: "Facebook", color: "#1877F2", n: 2 }, { label: "Google", color: "#4285F4", n: 1 }].map(p => (
          <div key={p.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.color, flexShrink: 0 }} />
            <span style={{ fontFamily: mFont.body, fontSize: "11px", color: M.espMid, flex: 1 }}>{p.label}</span>
            <span style={{ fontFamily: mFont.body, fontSize: "11px", color: M.champDk, fontWeight: 600 }}>{p.n} posts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsMockup() {
  return (
    <div style={{ background: "#fff", borderRadius: "20px", boxShadow: "0 18px 55px -16px rgba(31,20,13,0.12)", border: `1px solid ${M.soft}`, padding: "22px", maxWidth: "320px", margin: "0 auto" }}>
      <div style={{ fontFamily: mFont.display, fontStyle: "italic", fontSize: "18px", color: M.espresso, marginBottom: "16px" }}>This Month</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
        {[{ label: "Reach", value: "14.2K", delta: "+38%" }, { label: "Engagements", value: "1,840", delta: "+52%" }, { label: "New Followers", value: "312", delta: "+29%" }, { label: "Profile Visits", value: "2.1K", delta: "+44%" }].map(s => (
          <div key={s.label} style={{ background: M.cream, borderRadius: "12px", padding: "12px", border: `1px solid ${M.soft}` }}>
            <div style={{ fontFamily: mFont.body, fontSize: "10px", color: M.espLt, marginBottom: "4px" }}>{s.label}</div>
            <div style={{ fontFamily: mFont.display, fontStyle: "italic", fontSize: "22px", color: M.espresso, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontFamily: mFont.body, fontSize: "10px", color: "#22c55e", fontWeight: 600, marginTop: "4px" }}>{s.delta} vs last month</div>
          </div>
        ))}
      </div>
      <div style={{ background: M.cream, borderRadius: "12px", padding: "12px", border: `1px solid ${M.soft}` }}>
        <div style={{ fontFamily: mFont.body, fontSize: "10px", color: M.espLt, marginBottom: "8px" }}>Weekly reach</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "5px", height: "40px" }}>
          {[45, 60, 38, 72, 55, 88, 70].map((h, i) => (
            <div key={i} style={{ flex: 1, borderRadius: "4px 4px 0 0", background: i === 5 ? `linear-gradient(to top,${M.champDk},${M.champ})` : "rgba(200,168,119,0.2)", height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Index() {
  useScrollReveal();
  const { activeModal, openModal, closeModal } = useLegalModal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [name, setName]       = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus]   = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ _subject: `Discovery Call — ${business || name}`, fullName: name, businessName: business, email, message }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) { setName(""); setBusiness(""); setEmail(""); setMessage(""); }
    } catch { setStatus("error"); }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ─── HERO ─── */}
      <CornerFrame className="relative min-h-[88vh] flex items-center justify-center text-center px-10 py-16 overflow-hidden">
        {/* Rose illustrations */}
        <div className="absolute left-0 bottom-0 h-[72%] w-[22%] max-w-[240px] overflow-hidden pointer-events-none select-none opacity-50"
          style={{ maskImage: "linear-gradient(to right, black 50%, transparent 100%)" }}>
          <img src={heroRoseBg} aria-hidden="true" className="w-full h-full object-cover object-center" />
        </div>
        <div className="absolute right-0 bottom-0 h-[72%] w-[22%] max-w-[240px] overflow-hidden pointer-events-none select-none opacity-50"
          style={{ maskImage: "linear-gradient(to left, black 50%, transparent 100%)" }}>
          <img src={heroRoseBg} aria-hidden="true" className="w-full h-full object-cover object-center scale-x-[-1]" />
        </div>
        <div className="relative z-10 flex flex-col items-center max-w-[640px] animate-rise-in">
          <div className="animate-float-arch mb-6">
            <DollhouseArch />
          </div>

          <Eyebrow text="Done-For-You Social Media Management" className="mb-6" />

          <div className="font-display italic font-normal text-dollhouse-text-light text-[17px] tracking-[6px] mt-6 mb-[2px]">
            the
          </div>
          <h1 className="font-display italic font-normal text-dollhouse-ink text-[clamp(44px,7vw,72px)] tracking-[8px] leading-none uppercase">
            Dollhouse
          </h1>
          <p className="font-accent text-[9px] tracking-[5px] uppercase text-dollhouse-gold font-semibold mt-1 mb-0">
            Brand Studio
          </p>

          <HeartDivider className="my-6" />

          <h2 className="font-display italic text-dollhouse-ink text-[clamp(22px,3.5vw,38px)] font-normal mb-5 leading-tight max-w-[540px]">
            Your Business, Everywhere Online.
          </h2>

          <p className="font-display italic text-dollhouse-text-mid text-[clamp(14px,2vw,18px)] tracking-[1px] leading-relaxed max-w-[420px]">
            AI-powered social media content, scheduling, and analytics — done for you, every single day.
          </p>

          <div className="w-px h-10 bg-dollhouse-p3 opacity-40 my-6" />

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2.5 px-11 py-[14px] bg-dollhouse-ink text-card rounded-pill font-accent text-[10px] tracking-[3px] uppercase font-medium transition-all duration-300 hover:shadow-lg hover:shadow-dollhouse-ink/10 hover:-translate-y-0.5 no-underline"
            >
              Book a Discovery Call →
            </a>
            <a
              href="#services"
              className="font-display italic text-[13px] text-dollhouse-text-mid font-light tracking-wide no-underline border-b border-dollhouse-p3/40 pb-px hover:text-dollhouse-ink hover:border-dollhouse-ink transition-colors duration-200"
            >
              See how it works ↓
            </a>
          </div>

          <p className="mt-7 font-accent text-[8px] tracking-[3px] uppercase text-dollhouse-text-light">
            3-month minimum · All communication by email
          </p>
        </div>
      </CornerFrame>

      {/* ─── SOCIAL PROOF STRIP ─── */}
      <section className="border-y border-dollhouse-p2/40 bg-dollhouse-p1/50 py-6 px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <p className="font-display italic text-dollhouse-text-mid text-[15px] mb-5 leading-relaxed">
            Powered by the same infrastructure trusted by{" "}
            <span className="text-dollhouse-ink not-italic font-normal">500,000+</span> businesses worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-35">
            {["Meta", "OpenAI", "TikTok", "Google", "Stripe"].map(n => (
              <span key={n} className="font-accent text-[11px] tracking-[4px] uppercase text-dollhouse-ink">{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GOLD LINE ─── */}
      <div className="gold-line h-px max-w-[200px] mx-auto my-8" />

      {/* ─── SERVICES ─── */}
      <section id="services" className="px-6 py-10 max-w-[1100px] mx-auto">
        <div className="text-center mb-16">
          <Eyebrow text="What's Inside" className="mb-4" />
          <h2 className="font-display italic font-normal text-dollhouse-ink text-[clamp(28px,4vw,48px)]">
            Everything You Need to<br />Dominate Social Media.
          </h2>
        </div>

        {features.map((f, i) => (
          <div
            key={f.eyebrow}
            className={`dh-reveal d${(i % 3) + 1} flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-14 mb-24 last:mb-0`}
          >
            <div className="flex-1 w-full max-w-[340px] mx-auto md:mx-0">
              {f.mockup === "ai"        && <AIMockup />}
              {f.mockup === "schedule"  && <ScheduleMockup />}
              {f.mockup === "analytics" && <AnalyticsMockup />}
            </div>
            <div className="flex-1">
              <p className="font-accent text-[9px] tracking-[3px] uppercase text-dollhouse-gold mb-3">{f.eyebrow}</p>
              <h3 className="font-display italic font-normal text-dollhouse-ink text-[clamp(24px,3.5vw,40px)] leading-tight mb-3">
                {f.title}
              </h3>
              <p className="font-accent text-[10px] tracking-[2px] uppercase text-dollhouse-text-mid mb-4">{f.sub}</p>
              <p className="text-[15px] text-dollhouse-text-mid font-light leading-relaxed">{f.body}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ─── GOLD LINE ─── */}
      <div className="gold-line h-px max-w-[200px] mx-auto my-5" />

      {/* ─── PRICING ─── */}
      <section id="pricing" className="px-6 py-16 max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <Eyebrow text="Pricing" className="mb-4" />
          <h2 className="font-display italic font-normal text-dollhouse-ink text-[clamp(28px,4vw,48px)]">
            Choose Your Plan
          </h2>
          <p className="text-[13px] text-dollhouse-text-light font-light mt-3 max-w-[400px] mx-auto leading-relaxed">
            Done-for-you monthly retainer. 3-month minimum. Book a call to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`dh-reveal d${i + 1} luxury-card rounded-2xl p-10 flex flex-col relative
                ${plan.dark
                  ? "bg-dollhouse-ink border border-dollhouse-ink"
                  : plan.featured
                  ? "bg-card border border-dollhouse-gold/50 shadow-[0_24px_70px_-20px_hsl(36_60%_58%_/0.22)] md:-translate-y-4"
                  : "bg-card border border-dollhouse-p2/50"
                }`}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="font-accent text-[8px] tracking-[2.5px] uppercase bg-dollhouse-gold text-dollhouse-ink px-4 py-1.5 rounded-pill font-bold whitespace-nowrap">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <p className={`font-accent text-[9px] tracking-[3px] uppercase mb-2 ${plan.dark ? "text-dollhouse-gold" : "text-dollhouse-gold"}`}>
                {plan.name}
              </p>
              <div className="mb-1 leading-none">
                <span className={`font-display italic text-[52px] font-normal tracking-tight ${plan.dark ? "text-card" : "text-dollhouse-ink"}`}>
                  {plan.price}
                </span>
                <span className={`text-[13px] font-light ml-1 ${plan.dark ? "text-card/50" : "text-dollhouse-text-light"}`}>/mo USD</span>
              </div>
              <p className={`text-[13px] mb-6 font-light leading-snug ${plan.dark ? "text-card/55" : "text-dollhouse-text-light"}`}>
                {plan.tagline}
              </p>

              <HeartDivider className={`mb-6 ${plan.dark ? "opacity-20" : "opacity-60"}`} />

              <ul className="flex flex-col gap-3 flex-1 mb-8 list-none p-0">
                {plan.items.map(item => (
                  <li key={item} className="flex gap-3 items-start text-[13.5px] leading-snug">
                    <span className="text-dollhouse-gold text-[10px] mt-0.5 flex-shrink-0">✦</span>
                    <span className={plan.dark ? "text-card/80" : "text-dollhouse-text-mid"}>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block text-center font-accent text-[9px] tracking-[2px] uppercase py-3.5 rounded-pill transition-all no-underline hover:opacity-85
                  ${plan.dark
                    ? "bg-dollhouse-gold text-dollhouse-ink"
                    : "bg-dollhouse-ink text-card"
                  }`}
              >
                Book a Discovery Call →
              </a>
              <p className={`text-center text-[10px] mt-2.5 font-light ${plan.dark ? "text-card/30" : "text-dollhouse-text-light"}`}>
                3-month minimum · all communication by email
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="bg-dollhouse-p1/50 border-t border-dollhouse-p2/30 py-16 px-6">
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-12">
            <Eyebrow text="Common Questions" className="mb-4" />
            <h2 className="font-display italic font-normal text-dollhouse-ink text-[clamp(28px,4vw,44px)]">
              FAQ
            </h2>
          </div>
          <div className="border-t border-dollhouse-p3/20">
            {faqs.map((faq, i) => (
              <div key={faq.q} className="border-b border-dollhouse-p3/20">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center py-5 bg-transparent border-none cursor-pointer text-left gap-4"
                >
                  <span className="font-display italic text-[17px] text-dollhouse-ink font-normal leading-snug">{faq.q}</span>
                  <span className={`text-dollhouse-p3 text-xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {openFaq === i && (
                  <p className="text-[14px] text-dollhouse-text-mid font-light leading-relaxed pb-5 mt-0">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STARTER KIT CALLOUT ─── */}
      <section className="px-6 py-14 max-w-[640px] mx-auto text-center">
        <Eyebrow text="Just Starting Out?" className="mb-4" />
        <h2 className="font-display italic font-normal text-dollhouse-ink text-[clamp(24px,3vw,38px)] mb-4">
          Build Your Brand First
        </h2>
        <p className="text-[13px] text-dollhouse-text-mid font-light leading-relaxed mb-7 max-w-[480px] mx-auto">
          Not ready for a retainer yet? The Starter Kit gives you the Brand Kit, AI Prompt Kit, and Brand Workbook — everything you need to build a solid brand foundation.
        </p>
        <a
          href="/starter-kit"
          className="inline-flex items-center gap-2.5 px-9 py-[12px] border border-dollhouse-p3/50 text-dollhouse-ink rounded-pill font-accent text-[9px] tracking-[3px] uppercase font-medium transition-all hover:border-dollhouse-ink hover:shadow-sm no-underline"
        >
          See the Starter Kit →
        </a>
      </section>

      {/* ─── GOLD LINE ─── */}
      <div className="gold-line h-px max-w-[200px] mx-auto my-5" />

      {/* ─── CONTACT ─── */}
      <section id="contact" className="bg-dollhouse-ink px-6 py-16">
        <div className="max-w-[520px] mx-auto text-center">
          <div className="mb-6">
            <DollhouseArch className="mx-auto opacity-30" />
          </div>

          <Eyebrow text="Get Started" className="mb-6 !border-dollhouse-p3/20 !bg-transparent !text-card/60" />

          <h2 className="font-display italic font-normal text-card text-[clamp(28px,4vw,48px)] mb-4">
            Ready to Grow<br />Your Business?
          </h2>
          <p className="text-[13px] text-card/50 font-light leading-relaxed mb-10">
            Tell us about your business and we'll reach out within 24 hours to book your discovery call.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
            {[
              { label: "Your Name",     val: name,     set: setName,     type: "text" },
              { label: "Business Name", val: business, set: setBusiness, type: "text" },
              { label: "Email Address", val: email,    set: setEmail,    type: "email" },
            ].map(({ label, val, set, type }) => (
              <div key={label}>
                <label className="font-accent text-[9px] tracking-[2px] uppercase text-card/40 block mb-2">
                  {label}
                </label>
                <input
                  required
                  type={type}
                  value={val}
                  onChange={e => set(e.target.value)}
                  className="w-full bg-card/8 border border-dollhouse-p3/20 rounded-xl px-4 py-3.5 text-card font-light text-[15px] outline-none box-border"
                />
              </div>
            ))}
            <div>
              <label className="font-accent text-[9px] tracking-[2px] uppercase text-card/40 block mb-2">
                Which Plan Interests You?
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Starter ($1,000/mo), Growth ($2,500/mo), Elite ($5,000+/mo) — or tell us what you're working toward"
                className="w-full bg-card/8 border border-dollhouse-p3/20 rounded-xl px-4 py-3.5 text-card font-light text-[15px] outline-none resize-none box-border placeholder:text-card/25"
              />
            </div>

            {status === "success" && (
              <div className="bg-dollhouse-gold/12 border border-dollhouse-gold/30 rounded-xl p-4 text-dollhouse-gold text-[14px] font-light leading-relaxed">
                ✦ We'll reach out within 24 hours. Welcome to The Dollhouse.
              </div>
            )}
            {status === "error" && (
              <div className="bg-red-500/10 border border-red-400/25 rounded-xl p-4 text-red-300 text-[14px]">
                Something went wrong. Email us at hello@shopdollhouse.co
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-dollhouse-gold text-dollhouse-ink font-accent text-[10px] tracking-[2px] uppercase py-4 rounded-pill border-none cursor-pointer font-bold transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-wait"
            >
              {status === "sending" ? "Sending…" : "Book My Discovery Call →"}
            </button>
            <p className="text-center font-accent text-[8px] tracking-[2px] uppercase text-card/25">
              We'll reach out within 24 hours · All communication by email
            </p>
          </form>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-12 text-center border-t border-dollhouse-p3/15">
        <HeartDivider className="mb-8" />
        <div className="font-display italic text-dollhouse-text-light text-[15px] tracking-[6px] mb-[2px]">
          the
        </div>
        <p className="font-display italic text-dollhouse-ink text-2xl tracking-[6px] uppercase mb-1">
          Dollhouse
        </p>
        <p className="font-accent text-[8px] tracking-[4px] uppercase text-dollhouse-gold font-semibold mb-4">
          Brand Studio
        </p>
        <p className="text-[12px] text-dollhouse-text-light font-light mb-6">
          Done-for-you social media management · Starter kits for new brands
        </p>

        <div className="flex justify-center gap-4 mb-7 flex-wrap">
          {[
            { label: "Instagram", url: "https://www.instagram.com/mandyxdoll" },
            { label: "Threads",   url: "https://www.threads.com/@mandyxdoll" },
            { label: "TikTok",    url: "https://www.tiktok.com/@mandyxdoll" },
          ].map(s => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-accent text-[10px] tracking-[3px] uppercase px-5 py-2.5 border border-dollhouse-p3/30 rounded-pill text-dollhouse-text-mid no-underline transition-all duration-200 hover:bg-dollhouse-ink hover:text-card hover:border-dollhouse-ink"
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="flex justify-center gap-5 mb-5 flex-wrap">
          {[
            { label: "Privacy Policy", key: "privacy" },
            { label: "Terms of Use",   key: "terms" },
            { label: "Refund Policy",  key: "refund" },
            { label: "Contact",        key: "contact" },
          ].map(l => (
            <button
              key={l.key}
              onClick={() => openModal(l.key)}
              className="font-accent text-[8px] tracking-[2px] uppercase text-dollhouse-text-light bg-transparent border-none cursor-pointer hover:text-dollhouse-ink transition-colors p-0"
            >
              {l.label}
            </button>
          ))}
        </div>

        <p className="font-accent text-[8px] tracking-[3px] uppercase text-dollhouse-p3 mb-6">
          © {new Date().getFullYear()} The Dollhouse · All Rights Reserved
        </p>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-transparent border border-dollhouse-p3/30 rounded-pill px-5 py-2 cursor-pointer font-accent text-[8px] tracking-[3px] uppercase text-dollhouse-text-light hover:text-dollhouse-ink transition-colors"
        >
          ↑ Back to Top
        </button>
      </footer>

      <LegalModal activeModal={activeModal} onClose={closeModal} />
    </div>
  );
}
