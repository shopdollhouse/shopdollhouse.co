import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useState } from "react";
import { Check } from "lucide-react";
import { getSystemService, managedServiceLinks, systemServices } from "@/lib/system-services";
import { usePageMeta } from "@/lib/use-page-meta";

export const Route = createFileRoute("/systems_/$service")({
  component: SystemServicePage,
});

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_SCRIPT = "'Allura', cursive";
const FONT_LUXE = "'Jost', sans-serif";
const FONT_BODY = "'DM Sans', sans-serif";

const serviceProof: Record<string, { headline: string; points: string[]; cards: { label: string; value: string; note: string }[] }> = {
  "functional-website": {
    headline: "Built to turn website visitors into text conversations.",
    points: [
      "Quote forms can send instant confirmations to both you and the customer.",
      "Clickable phone numbers, chat, and booking prompts reduce back-and-forth.",
      "The website is shaped around leads, not just pretty pages.",
    ],
    cards: [
      { label: "Visitor", value: "Clicks quote", note: "They choose the easiest next step." },
      { label: "System", value: "Sends SMS", note: "The lead gets a fast confirmation." },
      { label: "Owner", value: "Gets alert", note: "You can reply before the lead cools down." },
    ],
  },
  "missed-call-text-back": {
    headline: "A missed call can still become a booked appointment.",
    points: [
      "If you are with a client, driving, sleeping, or closed, the caller still gets an instant text.",
      "The message can include a booking link, quote link, or simple reply prompt.",
      "You wake up or finish the job with conversations already started.",
    ],
    cards: [
      { label: "Call", value: "Missed", note: "The lead does not wait in silence." },
      { label: "Reply", value: "Instant text", note: "They can answer while they are interested." },
      { label: "Result", value: "Booked", note: "More calls get a real chance to convert." },
    ],
  },
  "merch-design": {
    headline: "Turn your brand into products people can actually picture.",
    points: [
      "Mockups help customers see the product before it is made.",
      "Design direction keeps merch from looking random or disconnected from the brand.",
      "Launch graphics make the offer easier to post, explain, and sell.",
    ],
    cards: [
      { label: "Look", value: "Mockup", note: "Show the product in a polished way." },
      { label: "Brand", value: "Design", note: "Keep colors, type, and style consistent." },
      { label: "Sales", value: "Launch", note: "Give people a clear reason to buy." },
    ],
  },
  "all-in-one-inbox": {
    headline: "Put calls, forms, chats, and messages in one cleaner place.",
    points: [
      "Leads are easier to manage when they are not spread across email, DMs, voicemail, and forms.",
      "The owner can see what came in and what needs a reply.",
      "A cleaner inbox means fewer leads get forgotten.",
    ],
    cards: [
      { label: "Forms", value: "Captured", note: "Website inquiries go into one flow." },
      { label: "Texts", value: "Tracked", note: "Conversations are easier to follow." },
      { label: "Calls", value: "Logged", note: "Missed calls can become follow-ups." },
    ],
  },
  "business-phone": {
    headline: "Keep business calls clear and separate from personal life.",
    points: [
      "Customers get a professional number to call or text.",
      "The owner can keep business communication organized.",
      "The phone system can connect with missed-call text back, reminders, and lead follow-up.",
    ],
    cards: [
      { label: "Number", value: "Business", note: "A cleaner line for customer contact." },
      { label: "Message", value: "Text-ready", note: "Customers can reply the easy way." },
      { label: "Owner", value: "Organized", note: "Less mixing business with personal calls." },
    ],
  },
  "review-funnel": {
    headline: "Happy clients go public. Concerns go private first.",
    points: [
      "A 5-star click can send customers straight to your Google review page.",
      "Lower ratings can open a private feedback form for the owner.",
      "QR codes and past-client prompts give more people an easy way to review.",
    ],
    cards: [
      { label: "5 stars", value: "Google", note: "Positive reviews build public trust." },
      { label: "1-4 stars", value: "Private form", note: "Concerns go to the owner first." },
      { label: "Past clients", value: "Prompt list", note: "Old happy customers can be invited back." },
    ],
  },
  "automated-lead-follow-up": {
    headline: "New inquiries keep moving even when you are busy.",
    points: [
      "Leads get an instant reply after forms, calls, chats, or DMs.",
      "Follow-up texts keep the conversation alive without you chasing everyone manually.",
      "Warm leads are nudged toward booking, estimates, or a call.",
    ],
    cards: [
      { label: "Inquiry", value: "Captured", note: "Form, call, chat, or DM enters the system." },
      { label: "Follow-up", value: "Text flow", note: "The lead gets clear next steps." },
      { label: "Next step", value: "Booked", note: "They are moved toward your calendar." },
    ],
  },
  "local-seo": {
    headline: "Make it easier for local customers and Google to understand you.",
    points: [
      "Service pages, keywords, alt tags, schema, and speed all support discoverability.",
      "Your website becomes clearer for people searching nearby.",
      "SEO works best with a site that also captures and follows up with leads.",
    ],
    cards: [
      { label: "Search", value: "Service + city", note: "Customers look for help nearby." },
      { label: "Page", value: "Clear offer", note: "Google and visitors understand the service." },
      { label: "Action", value: "Call or quote", note: "The page points people to contact you." },
    ],
  },
  "one-click-marketing-campaigns": {
    headline: "Bring past customers back without rebuilding a campaign every time.",
    points: [
      "Referral and return-customer campaigns can be prepared ahead of time.",
      "Owners can send offers without writing from scratch every week.",
      "The system makes repeat business feel easier and more professional.",
    ],
    cards: [
      { label: "Offer", value: "Ready", note: "The message is already built." },
      { label: "Send", value: "One click", note: "The owner can launch it fast." },
      { label: "Result", value: "Referrals", note: "Past customers remember the business." },
    ],
  },
};

const fallbackProof = {
  headline: "Built to make the next step easier for your customers.",
  points: [
    "The system removes confusion from the customer journey.",
    "The owner gets cleaner handoff, follow-up, and tracking.",
    "Each service connects back to more leads, better trust, or easier booking.",
  ],
  cards: [
    { label: "Step 1", value: "Capture", note: "Make the lead easy to collect." },
    { label: "Step 2", value: "Follow up", note: "Keep the conversation warm." },
    { label: "Step 3", value: "Convert", note: "Move people toward booking or buying." },
  ],
};

function SystemSymbol({ slug, className = "h-10 w-10" }: { slug: string; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.55, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const symbols: Record<string, ReactNode> = {
    "functional-website": (
      <>
        <rect {...common} x="4" y="6" width="16" height="12" rx="2" />
        <path {...common} d="M4 9h16M8 13h4M8 15.5h7M15.5 12.5l2 2-2 2" />
      </>
    ),
    "missed-call-text-back": (
      <>
        <path {...common} d="M8.2 4.2l1.4 3-1.5 1.4c1 2 2.4 3.5 4.5 4.5l1.4-1.5 3 1.4-.9 3c-.2.6-.8 1-1.4.9-5.9-.9-9.8-4.8-10.6-10.6-.1-.6.3-1.2.9-1.4z" />
        <path {...common} d="M13.5 5.5h5v5M18.5 5.5l-5.2 5.2" />
      </>
    ),
    "merch-design": (
      <>
        <path {...common} d="M8 6l-3 2.2 2 3.2 1.5-.8V19h7V10.6l1.5.8 2-3.2L16 6l-2.2 1.2a3.8 3.8 0 0 1-3.6 0z" />
        <path {...common} d="M10 13h4M10 15.5h3" />
      </>
    ),
    "all-in-one-inbox": (
      <>
        <rect {...common} x="4" y="5" width="16" height="14" rx="2.2" />
        <path {...common} d="M4 13h4l1.6 2.2h4.8L16 13h4M8 8h8M8 10.5h5" />
      </>
    ),
    "business-phone": (
      <>
        <rect {...common} x="8" y="3.5" width="8" height="17" rx="2" />
        <path {...common} d="M10.5 6h5M11.5 17.5h3M18.5 9.5c1 .8 1.5 1.8 1.5 3s-.5 2.2-1.5 3M5.5 9.5C4.5 10.3 4 11.3 4 12.5s.5 2.2 1.5 3" />
      </>
    ),
    "local-seo": (
      <>
        <circle {...common} cx="10.5" cy="10.5" r="5.5" />
        <path {...common} d="M15 15l4.5 4.5M8.5 10.5h4M10.5 8.5v4" />
        <path {...common} d="M5 19h6" />
      </>
    ),
    "review-funnel": (
      <>
        <path {...common} d="M12 4.2l1.8 3.7 4.1.6-3 2.9.7 4.1L12 13.6 8.4 15.5l.7-4.1-3-2.9 4.1-.6z" />
        <path {...common} d="M5 19h14M7.2 16.8c1.5 1 3.1 1.5 4.8 1.5s3.3-.5 4.8-1.5" />
      </>
    ),
    "one-click-marketing-campaigns": (
      <>
        <path {...common} d="M5 14.5V8.8l9-3.2v11.2z" />
        <path {...common} d="M14 9.2l4-1.5v8.8l-4-1.4M7.5 14.8l1.2 4h3l-1.4-4.8" />
      </>
    ),
    "automated-lead-follow-up": (
      <>
        <path {...common} d="M5 5.5h14v9H9l-4 3z" />
        <path {...common} d="M8.5 9h7M8.5 11.5h4M16.5 18.5l2-2 2 2M18.5 16.7v3.6" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      {symbols[slug] ?? symbols["functional-website"]}
    </svg>
  );
}

function ServiceIllustration({ slug, title }: { slug: string; title: string }) {
  const accent: Record<string, string> = {
    "functional-website": "#c97a7a",
    "missed-call-text-back": "#c8a864",
    "merch-design": "#b9857d",
    "all-in-one-inbox": "#9f7469",
    "business-phone": "#c8a864",
    "local-seo": "#8d7564",
    "review-funnel": "#d6a35f",
    "one-click-marketing-campaigns": "#c97a7a",
    "automated-lead-follow-up": "#a98275",
  };
  const color = accent[slug] ?? "#c8a864";

  const labels: Record<string, string[]> = {
    "functional-website": ["Website", "Quote", "SMS"],
    "missed-call-text-back": ["Missed call", "Auto text", "Booked"],
    "merch-design": ["Mockup", "Design", "Launch"],
    "all-in-one-inbox": ["Forms", "Texts", "Calls"],
    "business-phone": ["Business #", "Calls", "Texts"],
    "local-seo": ["Search", "Service page", "Lead"],
    "review-funnel": ["5 stars", "Google", "Trust"],
    "one-click-marketing-campaigns": ["Offer", "Send", "Referral"],
    "automated-lead-follow-up": ["Inquiry", "Reminder", "Reply"],
  };

  return (
    <div className="relative overflow-hidden rounded-[34px] p-4 md:p-5 bg-white/70 border border-[var(--gold)]/22 shadow-2xl shadow-[rgba(120,70,55,0.12)]">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-25 blur-3xl" style={{ background: color }} />
      <div className="absolute -bottom-24 -left-14 h-56 w-56 rounded-full opacity-18 blur-3xl" style={{ background: "var(--gold)" }} />
      <div className="relative overflow-hidden rounded-[28px]">
        <img
          src={`/system-assets/${slug}.jpg`}
          alt={`${title} branded service preview`}
          className="aspect-[1.43/1] w-full object-cover"
          style={{ objectPosition: "center", filter: "saturate(0.96) contrast(1.02)" }}
        />
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-4">
          <div className="rounded-2xl px-4 py-3 backdrop-blur-md" style={{ background: "rgba(255,250,246,0.78)", border: "1px solid rgba(200,168,100,0.24)" }}>
            <p className="text-[var(--gold)] text-[9px] tracking-[0.2em] uppercase" style={{ fontFamily: FONT_LUXE }}>Visual system</p>
            <h2 className="mt-1 text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.25rem, 2.6vw, 1.9rem)", fontStyle: "italic", lineHeight: 1 }}>{title}</h2>
          </div>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl backdrop-blur-md" style={{ background: "rgba(255,250,246,0.78)", border: "1px solid rgba(200,168,100,0.24)", color }}>
            <SystemSymbol slug={slug} className="h-8 w-8" />
          </div>
        </div>
        <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2 rounded-[22px] p-2 backdrop-blur-md" style={{ background: "rgba(255,250,246,0.82)", border: "1px solid rgba(200,168,100,0.22)" }}>
          {(labels[slug] ?? labels["functional-website"]).map((label) => (
            <div key={label} className="rounded-2xl px-2 py-3 text-center" style={{ background: "rgba(255,255,255,0.58)", border: "1px solid rgba(200,168,100,0.14)" }}>
              <p className="text-[var(--ink)]/52 leading-tight" style={{ fontFamily: FONT_LUXE, fontSize: "0.58rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Nav() {
  const [systemsOpen, setSystemsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between px-6 md:px-12 py-5 bg-[var(--cream)]/88 backdrop-blur-md border-b border-[var(--gold)]/15">
      <Link to="/" className="flex flex-col items-start leading-tight no-underline">
        <span className="text-[var(--ink)]/55 font-normal not-italic" style={{ fontFamily: FONT_SCRIPT, fontSize: "18px", letterSpacing: "1px", textTransform: "lowercase", lineHeight: 1 }}>
          the
        </span>
        <span className="text-[var(--ink)] italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "15px", letterSpacing: "4px", textTransform: "uppercase", marginTop: "-4px" }}>
          Dollhouse
        </span>
        <span className="text-[var(--gold)] not-italic font-semibold" style={{ fontFamily: FONT_LUXE, fontSize: "6.5px", letterSpacing: "3px", textTransform: "uppercase", marginTop: "1px" }}>
          Brand Studio
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-7 text-[10px] tracking-[0.2em] uppercase text-[var(--ink)]/70" style={{ fontFamily: FONT_LUXE }}>
        <div
          className="relative"
          onMouseEnter={() => setSystemsOpen(true)}
          onMouseLeave={() => setSystemsOpen(false)}
        >
          <button
            type="button"
            aria-expanded={systemsOpen}
            onClick={() => setSystemsOpen((value) => !value)}
            className="hover:text-[var(--rose)] transition-colors inline-flex items-center gap-1.5 bg-transparent border-0 p-0 uppercase cursor-pointer"
          >
            Systems
            <span className="text-[var(--gold)] text-[9px]">⌄</span>
          </button>
          <div
            className={`absolute left-1/2 top-full z-50 mt-0 w-[860px] -translate-x-1/2 rounded-[26px] p-5 pt-10 transition-all duration-200 ${
              systemsOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-2 pointer-events-none"
            }`}
            style={{
              background: "color-mix(in oklab, var(--cream) 96%, white)",
              border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)",
              boxShadow: "0 34px 80px -40px rgba(70,35,25,0.42)",
            }}
          >
            <div className="flex items-center justify-between border-b border-[var(--gold)]/18 pb-4 mb-4">
              <p className="text-[var(--ink)] text-[13px] normal-case tracking-normal" style={{ fontFamily: FONT_LUXE, fontWeight: 700 }}>
                Services & Systems
              </p>
              <a href="/#services" className="text-[var(--gold)] text-[9px] tracking-[0.2em] uppercase hover:text-[var(--rose)]">
                Main services
              </a>
            </div>
            <div className="mb-5">
              <p className="mb-2 text-[var(--gold)] text-[9px] tracking-[0.2em] uppercase" style={{ fontFamily: FONT_LUXE }}>
                Managed Growth Services
              </p>
              <div className="grid grid-cols-2 gap-2">
                {managedServiceLinks.map((service) => (
                  <a
                    key={service.href}
                    href={service.href}
                    className="rounded-2xl px-3 py-2.5 hover:bg-white/70 transition-colors"
                  >
                    <span className="block text-[var(--ink)] normal-case tracking-normal leading-tight" style={{ fontFamily: FONT_LUXE, fontSize: "0.76rem", fontWeight: 700 }}>
                      {service.title}
                    </span>
                    <span className="mt-1 block text-[var(--ink)]/48 normal-case tracking-normal leading-snug" style={{ fontFamily: FONT_BODY, fontSize: "0.66rem" }}>
                      {service.short}
                    </span>
                  </a>
                ))}
              </div>
            </div>
            <p className="mb-2 text-[var(--gold)] text-[9px] tracking-[0.2em] uppercase" style={{ fontFamily: FONT_LUXE }}>
              Systems & Automation Pages
            </p>
            <div className="grid grid-cols-3 gap-3">
              {systemServices.map((item) => (
                <Link
                  key={item.slug}
                  to="/systems/$service"
                  params={{ service: item.slug }}
                  className="group/item rounded-2xl p-3 flex gap-3 hover:bg-white/70 transition-colors"
                >
                  <span
                    className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(200,168,100,0.1)",
                      border: "1px solid rgba(200,168,100,0.18)",
                      color: "var(--ink)",
                    }}
                  >
                    <SystemSymbol slug={item.slug} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[var(--ink)] normal-case tracking-normal leading-tight" style={{ fontFamily: FONT_LUXE, fontSize: "0.78rem", fontWeight: 700 }}>
                      {item.title}
                    </span>
                    <span className="mt-1 block text-[var(--ink)]/48 normal-case tracking-normal leading-snug" style={{ fontFamily: FONT_BODY, fontSize: "0.68rem" }}>
                      {item.short}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Link to="/" hash="pricing" className="hover:text-[var(--rose)] transition-colors">Pricing</Link>
        <Link to="/" hash="contact" className="rounded-full bg-[var(--ink)] text-[var(--cream)] px-5 py-2.5 hover:opacity-85 transition-opacity">Get a proposal</Link>
      </div>
    </nav>
  );
}

function SimpleChart({ title, result }: { title: string; result: string }) {
  return (
    <div className="rounded-[28px] p-6 md:p-8 bg-[var(--ink)] text-[var(--cream)] shadow-2xl shadow-[rgba(30,15,10,0.16)]">
      <p className="text-[var(--gold)] text-[10px] tracking-[0.22em] uppercase" style={{ fontFamily: FONT_LUXE }}>{title}</p>
      <div className="mt-6 space-y-4">
        {["Before", "During", "After"].map((label, index) => (
          <div key={label}>
            <div className="flex items-center justify-between mb-2">
              <p style={{ fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(250,243,234,0.68)" }}>{label}</p>
              <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(250,243,234,0.48)" }}>{index === 0 ? "low" : index === 1 ? "moving" : "clear"}</p>
            </div>
            <div className="h-3 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${36 + index * 28}%`,
                  background: index === 2 ? "linear-gradient(90deg, var(--gold), #e7cfa4)" : "rgba(201,122,122,0.72)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-7 leading-7" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.35rem", fontStyle: "italic", color: "rgba(250,243,234,0.88)" }}>
        {result}
      </p>
    </div>
  );
}

function OutcomePreview({ slug }: { slug: string }) {
  const proof = serviceProof[slug] ?? fallbackProof;

  return (
    <section className="px-6 py-18 md:py-24" style={{ background: "linear-gradient(180deg, #f8e7e2 0%, var(--cream) 100%)" }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-stretch">
        <div className="rounded-[30px] p-7 md:p-8 bg-[var(--ink)] text-[var(--cream)]">
          <p className="text-[var(--gold)] text-[11px] tracking-[0.24em] uppercase" style={{ fontFamily: FONT_LUXE }}>Client result path</p>
          <h2 className="mt-4 italic leading-tight" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.1rem, 4vw, 3.35rem)" }}>
            {proof.headline}
          </h2>
          <div className="mt-7 space-y-4">
            {proof.points.map((point) => (
              <div key={point} className="flex gap-3">
                <span className="mt-1 h-5 w-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(200,168,100,0.16)", color: "var(--gold)" }}>
                  <Check size={12} strokeWidth={3} />
                </span>
                <p className="m-0 leading-7" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem", color: "rgba(250,243,234,0.72)" }}>
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {proof.cards.map((card, index) => (
            <div key={card.label} className="rounded-[26px] p-6 bg-white/62 border border-[var(--gold)]/22 flex flex-col justify-between">
              <div>
                <p className="italic text-[var(--gold)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "2.2rem", lineHeight: 1 }}>0{index + 1}</p>
                <p className="mt-4 text-[var(--ink)]/42 text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: FONT_LUXE }}>{card.label}</p>
                <h3 className="mt-2 text-[var(--rose)] italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.8rem", lineHeight: 1.05 }}>
                  {card.value}
                </h3>
              </div>
              <p className="mt-8 text-[var(--ink)]/58 leading-6" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem" }}>
                {card.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SystemServicePage() {
  const { service } = Route.useParams();
  const current = getSystemService(service) ?? systemServices[0];
  usePageMeta(
    `${current.title} | The Dollhouse Systems`,
    `${current.short} ${current.result}`,
  );

  return (
    <main className="min-h-screen bg-[var(--blush)] text-[var(--ink)]">
      <Nav />

      <section className="px-6 py-20 md:py-28" style={{ background: "linear-gradient(135deg, #fff8f3 0%, #f7e3dd 48%, #f2d4cf 100%)" }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
          <div>
            <Link to="/" hash="systems" className="text-[var(--gold)] text-[10px] tracking-[0.2em] uppercase hover:text-[var(--rose)]" style={{ fontFamily: FONT_LUXE }}>
              ← All systems
            </Link>
            <div className="mt-8 h-20 w-20 rounded-[24px] flex items-center justify-center bg-white/58 border border-[var(--gold)]/24 text-[var(--ink)]">
              <SystemSymbol slug={current.slug} className="h-11 w-11" />
            </div>
            <h1 className="mt-8 text-[var(--rose)] leading-none" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 400 }}>
              {current.title}
            </h1>
            <p className="mt-6 max-w-xl text-[var(--ink)]/68 leading-8" style={{ fontFamily: FONT_BODY, fontSize: "1.08rem" }}>
              {current.plain}
            </p>
            <Link
              to="/"
              hash="contact"
              className="mt-8 inline-flex rounded-full bg-[var(--ink)] text-[var(--cream)] px-7 py-4 text-[11px] tracking-[0.18em] uppercase"
              style={{ fontFamily: FONT_LUXE }}
            >
              Ask about this system →
            </Link>
          </div>

          <ServiceIllustration slug={current.slug} title={current.visualTitle} />
        </div>
      </section>

      <section className="px-6 py-18 md:py-24 bg-[var(--cream)]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-[var(--gold)] text-[11px] tracking-[0.24em] uppercase" style={{ fontFamily: FONT_LUXE }}>What it helps with</p>
            <h2 className="mt-3 text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.05 }}>
              Why this matters.
            </h2>
            <div className="mt-7 grid sm:grid-cols-2 gap-4">
              {current.helps.map((item) => (
                <div key={item} className="rounded-2xl bg-white/58 border border-[var(--gold)]/18 p-5 flex gap-3">
                  <span className="mt-0.5 h-7 w-7 rounded-full bg-[var(--gold)]/14 text-[var(--gold)] flex items-center justify-center shrink-0">
                    <SystemSymbol slug={current.slug} className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-[var(--ink)]/70 leading-6" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem" }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <SimpleChart title="Visual learner chart" result={current.result} />
        </div>
      </section>

      <OutcomePreview slug={current.slug} />

      <section className="px-6 py-18 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-[var(--gold)] text-[11px] tracking-[0.24em] uppercase text-center" style={{ fontFamily: FONT_LUXE }}>How it works</p>
          <h2 className="mt-3 text-center text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.05 }}>
            Three easy steps.
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {current.steps.map((step, index) => (
              <div key={step.title} className="rounded-[26px] p-6 bg-white/58 border border-[var(--gold)]/20">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-[var(--gold)]" style={{ background: "rgba(200,168,100,0.12)", border: "1px solid rgba(200,168,100,0.2)" }}>
                  {index === 0 ? <SystemSymbol slug={current.slug} className="h-6 w-6" /> : <span style={{ fontFamily: FONT_DISPLAY, fontSize: "1.55rem", fontStyle: "italic" }}>0{index + 1}</span>}
                </div>
                <h3 className="mt-5 text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.55rem", lineHeight: 1.1 }}>
                  {step.title}
                </h3>
                <p className="mt-3 text-[var(--ink)]/58 leading-7" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem" }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-18 md:py-24 bg-[var(--cream)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[var(--gold)]/20 pb-6">
            <div>
              <p className="text-[var(--gold)] text-[11px] tracking-[0.24em] uppercase" style={{ fontFamily: FONT_LUXE }}>More systems</p>
              <h2 className="mt-2 text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 3vw, 2.9rem)" }}>
                Build the full follow-up system.
              </h2>
            </div>
            <Link to="/" hash="contact" className="text-[var(--rose)] text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: FONT_LUXE }}>
              Get a proposal →
            </Link>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {systemServices
              .filter((item) => item.slug !== current.slug)
              .map((item) => (
                <Link key={item.slug} to="/systems/$service" params={{ service: item.slug }} className="rounded-2xl bg-white/58 border border-[var(--gold)]/18 px-5 py-4 hover:border-[var(--gold)]/45 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--gold)]/12 text-[var(--gold)]">
                      <SystemSymbol slug={item.slug} className="h-5 w-5" />
                    </span>
                    <p className="text-[var(--ink)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 }}>
                      {item.title}
                    </p>
                  </div>
                  <p className="mt-2 text-[var(--ink)]/52 leading-6" style={{ fontFamily: FONT_BODY, fontSize: "0.84rem" }}>
                    {item.short}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
