import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bot,
  Check,
  ClipboardClock,
  Inbox,
  MessageSquare,
  PhoneCall,
  Printer,
  Search,
  SquareMousePointer,
  Star,
} from "lucide-react";
import archMark from "@/assets/arch-mark.svg";
import { getSystemService, managedServiceLinks, systemServices } from "@/lib/system-services";

export const Route = createFileRoute("/systems_/$service")({
  component: SystemServicePage,
});

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_SCRIPT = "'Allura', cursive";
const FONT_LUXE = "'Jost', sans-serif";
const FONT_BODY = "'DM Sans', sans-serif";

const iconMap = {
  website: SquareMousePointer,
  phone: PhoneCall,
  print: Printer,
  inbox: Inbox,
  bot: Bot,
  search: Search,
  star: Star,
  campaign: ClipboardClock,
  message: MessageSquare,
};

function Nav() {
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
        <div className="relative group">
          <a href="/#services" className="hover:text-[var(--rose)] transition-colors inline-flex items-center gap-1.5">
            Systems
            <span className="text-[var(--gold)] text-[9px]">⌄</span>
          </a>
          <div
            className="absolute left-1/2 top-full z-50 mt-5 w-[860px] -translate-x-1/2 rounded-[26px] p-5 opacity-0 translate-y-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
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
              {systemServices.map((item) => {
                const ItemIcon = iconMap[item.icon as keyof typeof iconMap];
                return (
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
                      <ItemIcon size={18} strokeWidth={1.8} />
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
                );
              })}
            </div>
          </div>
        </div>
        <Link to="/" hash="pricing" className="hover:text-[var(--rose)] transition-colors">Pricing</Link>
        <Link to="/" hash="contact" className="rounded-full bg-[var(--ink)] text-[var(--cream)] px-5 py-2.5 hover:opacity-85 transition-opacity">Get a proposal</Link>
      </div>
    </nav>
  );
}

function VisualFlow({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map((item, index) => (
        <div key={item} className="relative rounded-2xl p-4 text-center bg-white/62 border border-[var(--gold)]/20">
          <div className="mx-auto mb-3 h-10 w-10 rounded-full flex items-center justify-center bg-[var(--gold)]/12 text-[var(--gold)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", fontStyle: "italic" }}>
            {index + 1}
          </div>
          <p className="text-[var(--ink)] leading-tight" style={{ fontFamily: FONT_LUXE, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 }}>
            {item}
          </p>
        </div>
      ))}
    </div>
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

function SystemServicePage() {
  const { service } = Route.useParams();
  const current = getSystemService(service) ?? systemServices[0];
  const Icon = iconMap[current.icon as keyof typeof iconMap];

  return (
    <main className="min-h-screen bg-[var(--blush)] text-[var(--ink)]">
      <Nav />

      <section className="px-6 py-20 md:py-28" style={{ background: "linear-gradient(135deg, #fff8f3 0%, #f7e3dd 48%, #f2d4cf 100%)" }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
          <div>
            <Link to="/" hash="systems" className="text-[var(--gold)] text-[10px] tracking-[0.2em] uppercase hover:text-[var(--rose)]" style={{ fontFamily: FONT_LUXE }}>
              ← All systems
            </Link>
            <div className="mt-8 h-20 w-20 rounded-[24px] flex items-center justify-center bg-white/58 border border-[var(--gold)]/24">
              <Icon size={38} strokeWidth={1.55} color="var(--ink)" />
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

          <div className="rounded-[34px] p-6 md:p-8 bg-white/54 border border-[var(--gold)]/22 shadow-2xl shadow-[rgba(120,70,55,0.12)]">
            <div className="flex items-center justify-between gap-4 border-b border-[var(--gold)]/18 pb-5">
              <div>
                <p className="text-[var(--gold)] text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: FONT_LUXE }}>Simple picture</p>
                <h2 className="mt-2 text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "2rem", fontStyle: "italic" }}>{current.visualTitle}</h2>
              </div>
              <img src={archMark} alt="" className="h-12 w-12 opacity-60" />
            </div>
            <div className="mt-6">
              <VisualFlow items={current.visualItems} />
            </div>
          </div>
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
                  <span className="mt-0.5 h-6 w-6 rounded-full bg-[var(--gold)]/14 text-[var(--gold)] flex items-center justify-center shrink-0">
                    <Check size={14} strokeWidth={2} />
                  </span>
                  <p className="text-[var(--ink)]/70 leading-6" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem" }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <SimpleChart title="Visual learner chart" result={current.result} />
        </div>
      </section>

      <section className="px-6 py-18 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-[var(--gold)] text-[11px] tracking-[0.24em] uppercase text-center" style={{ fontFamily: FONT_LUXE }}>How it works</p>
          <h2 className="mt-3 text-center text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.05 }}>
            Three easy steps.
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {current.steps.map((step, index) => (
              <div key={step.title} className="rounded-[26px] p-6 bg-white/58 border border-[var(--gold)]/20">
                <p className="text-[var(--gold)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "2.4rem", fontStyle: "italic", lineHeight: 1 }}>
                  0{index + 1}
                </p>
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
                  <p className="text-[var(--ink)]" style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 }}>
                    {item.title}
                  </p>
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
