import { createFileRoute } from "@tanstack/react-router";
import { useState, FormEvent, useRef, useEffect } from "react";

export const Route = createFileRoute("/onboarding")({ component: OnboardingForm });

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_LUXE    = "'Jost', sans-serif";
const FONT_BODY    = "'DM Sans', sans-serif";

const STEPS = [
  "Your Details",
  "Your Business",
  "Your Audience",
  "Brand & Aesthetic",
  "Content Preferences",
  "Your Goals",
  "AI Clone & Final",
  "Brand Story & Strategy",
];

type F = Record<string, string>;

const INITIAL: F = {
  businessName: "", email: "", phone: "", website: "", socialHandles: "", city: "", industry: "",
  businessDescription: "", topServices: "", differentiator: "", pricePoint: "", businessAge: "",
  audienceAge: "", audienceGender: "", audienceIncome: "", audiencePlatforms: "", audienceProblem: "", whyChooseYou: "", idealClientDesc: "",
  brandColors: "", hasBrandGuidelines: "", instagramInspiration: "", websitesLike: "", brandsAdmire: "", neverFeel: "",
  textOnImages: "", hasAssets: "", avoidImagery: "", emojiPreference: "", captionLength: "", extraContentNotes: "",
  primaryGoal: "", successIn90Days: "", currentFollowers: "", runningAds: "", adBudget: "",
  onCamera: "", cloneType: "", displayName: "", alwaysUse: "", neverUse: "", upcomingPromos: "", anythingElse: "",
  brandOrigin: "", clientTransformation: "", topFAQs: "", competitors: "", preferredCTA: "", peakMonths: "", slowMonths: "", credentials: "", existingTestimonials: "", teamMembers: "", avoidServices: "", serviceArea: "",
};

const BRAND_VIBES = ["Luxury", "Warm & Inviting", "Clinical & Professional", "Bold & Edgy", "Playful & Fun", "Minimal & Clean", "Elegant & Editorial", "Natural & Earthy", "High Fashion", "Approachable & Friendly"];
const CONTENT_TYPES = ["Educational Tips", "Behind the Scenes", "Before & After", "Client Testimonials", "Promotional Offers", "Inspirational Quotes", "Trending / Entertainment", "Product/Service Spotlight", "Founder Story", "FAQ / Myth Busting"];

/* ── Shared styles ───────────────────────────────────────────────────────── */
const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.65)",
  border: "1px solid rgba(200,168,100,0.3)",
  borderRadius: "14px",
  padding: "13px 18px",
  fontFamily: FONT_BODY,
  fontSize: "0.92rem",
  color: "#1e0f0a",
  outline: "none",
  width: "100%",
  boxSizing: "border-box" as const,
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  fontFamily: FONT_LUXE,
  fontSize: "0.63rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  color: "rgba(30,15,10,0.45)",
  display: "block",
  marginBottom: "7px",
};

/* ── Sub-components ──────────────────────────────────────────────────────── */
const Field = ({ label, name, value, onChange, type = "text", placeholder = "", required = false }: {
  label: string; name: string; value: string; onChange: (n: string, v: string) => void;
  type?: string; placeholder?: string; required?: boolean;
}) => (
  <div style={{ marginBottom: "22px" }}>
    <label style={labelStyle}>{label}{required && <span style={{ color: "#b87a7a", marginLeft: 3 }}>*</span>}</label>
    <input type={type} value={value} placeholder={placeholder} required={required}
      onChange={e => onChange(name, e.target.value)} style={inputStyle} />
  </div>
);

const TextArea = ({ label, name, value, onChange, placeholder = "", rows = 3, required = false }: {
  label: string; name: string; value: string; onChange: (n: string, v: string) => void;
  placeholder?: string; rows?: number; required?: boolean;
}) => (
  <div style={{ marginBottom: "22px" }}>
    <label style={labelStyle}>{label}{required && <span style={{ color: "#b87a7a", marginLeft: 3 }}>*</span>}</label>
    <textarea value={value} placeholder={placeholder} required={required} rows={rows}
      onChange={e => onChange(name, e.target.value)}
      style={{ ...inputStyle, resize: "vertical", lineHeight: 1.65 }} />
  </div>
);

const Select = ({ label, name, value, onChange, options, required = false }: {
  label: string; name: string; value: string; onChange: (n: string, v: string) => void;
  options: string[]; required?: boolean;
}) => (
  <div style={{ marginBottom: "22px" }}>
    <label style={labelStyle}>{label}{required && <span style={{ color: "#b87a7a", marginLeft: 3 }}>*</span>}</label>
    <select value={value} required={required} onChange={e => onChange(name, e.target.value)}
      style={{ ...inputStyle, cursor: "pointer" }}>
      <option value="">Select one…</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const SearchableSelect = ({ label, name, value, onChange, options, required = false }: {
  label: string; name: string; value: string; onChange: (n: string, v: string) => void;
  options: string[]; required?: boolean;
}) => {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const filtered = options.filter(o => o.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const select = (o: string) => { onChange(name, o); setQuery(o); setOpen(false); };

  return (
    <div style={{ marginBottom: "22px", position: "relative" }} ref={ref}>
      <label style={labelStyle}>{label}{required && <span style={{ color: "#b87a7a", marginLeft: 3 }}>*</span>}</label>
      <div style={{ position: "relative" }}>
        <input value={query} onChange={e => { setQuery(e.target.value); onChange(name, ""); setOpen(true); }}
          onFocus={() => setOpen(true)} placeholder="Type to search…"
          style={{ ...inputStyle, paddingRight: 36 }} />
        <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "var(--gold)", fontSize: "0.7rem", pointerEvents: "none" }}>▾</span>
      </div>
      {open && filtered.length > 0 && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 100, background: "rgba(252,244,238,0.98)", border: "1px solid rgba(200,168,100,0.3)", borderRadius: 14, boxShadow: "0 12px 40px rgba(30,15,10,0.12)", maxHeight: 220, overflowY: "auto", backdropFilter: "blur(12px)" }}>
          {filtered.map(o => (
            <button key={o} type="button" onClick={() => select(o)}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 16px", border: "none", background: o === value ? "rgba(200,168,100,0.1)" : "transparent", fontFamily: FONT_BODY, fontSize: "0.88rem", color: o === value ? "#a06e30" : "#1e0f0a", cursor: "pointer", fontWeight: o === value ? 600 : 400, borderBottom: "1px solid rgba(200,168,100,0.08)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(200,168,100,0.08)")}
              onMouseLeave={e => (e.currentTarget.style.background = o === value ? "rgba(200,168,100,0.1)" : "transparent")}
            >{o}</button>
          ))}
        </div>
      )}
      {required && <input type="text" value={value} required readOnly style={{ position: "absolute", opacity: 0, height: 0, pointerEvents: "none" }} />}
    </div>
  );
};

const MultiCheck = ({ label, name, selected, onChange, options }: {
  label: string; name: string; selected: string[]; onChange: (n: string, v: string[]) => void; options: string[];
}) => {
  const toggle = (o: string) => onChange(name, selected.includes(o) ? selected.filter(x => x !== o) : [...selected, o]);
  return (
    <div style={{ marginBottom: "26px" }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))", gap: "8px", marginTop: "6px" }}>
        {options.map(o => {
          const active = selected.includes(o);
          return (
            <button key={o} type="button" onClick={() => toggle(o)}
              style={{ padding: "10px 14px", borderRadius: "12px", border: active ? "1.5px solid var(--gold)" : "1px solid rgba(200,168,100,0.22)", background: active ? "rgba(200,168,100,0.1)" : "rgba(255,255,255,0.55)", fontFamily: FONT_BODY, fontSize: "0.82rem", color: active ? "#8a5e20" : "rgba(30,15,10,0.6)", cursor: "pointer", textAlign: "left", transition: "all 0.15s", fontWeight: active ? 600 : 400 }}>
              {active ? "✦ " : ""}{o}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const StepHeader = ({ title, sub }: { title: string; sub: string }) => (
  <div style={{ marginBottom: 32 }}>
    <p style={{ fontFamily: FONT_LUXE, fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>✦ The Dollhouse Brand Studio</p>
    <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.7rem, 4vw, 2.3rem)", color: "var(--rose)", fontStyle: "italic", lineHeight: 1.2, marginBottom: 10, margin: "0 0 10px" }}>{title}</h2>
    <p style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: "rgba(30,15,10,0.5)", lineHeight: 1.65 }}>{sub}</p>
    <div style={{ height: 1, background: "linear-gradient(90deg, rgba(200,168,100,0.4), transparent)", marginTop: 20 }} />
  </div>
);

/* ── Main Component ───────────────────────────────────────────────────────── */
export default function OnboardingForm() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<F>(INITIAL);
  const [vibes, setVibes] = useState<string[]>([]);
  const [contentTypes, setContentTypes] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (name: string, value: string) => setForm(f => ({ ...f, [name]: value }));
  const next = () => { window.scrollTo({ top: 0, behavior: "smooth" }); setStep(s => Math.min(s + 1, STEPS.length - 1)); };
  const back = () => { window.scrollTo({ top: 0, behavior: "smooth" }); setStep(s => Math.max(s - 1, 0)); };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/xaqkkopk", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, brandVibes: vibes.join(", "), contentTypes: contentTypes.join(", "), _subject: `🎀 New Client Onboarding — ${form.businessName}` }),
      });
      if (res.ok) { setSubmitted(true); window.scrollTo({ top: 0, behavior: "smooth" }); }
      else setError("Something went wrong. Please try again or email hello@dollhousebrandstudio.com");
    } catch { setError("Network error. Please check your connection and try again."); }
    finally { setSubmitting(false); }
  };

  const pct = Math.round(((step + 1) / STEPS.length) * 100);

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(232,180,180,0.25), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 90%, rgba(200,168,100,0.12), transparent 60%), linear-gradient(160deg, #f8ede8 0%, #faf3ea 50%, #fdf6ee 100%)",
  };

  /* ── Thank You ─────────────────────────────────────────────────────────── */
  if (submitted) return (
    <div style={pageStyle}>
      <Nav />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh", padding: "40px 20px" }}>
        <div style={{ textAlign: "center", maxWidth: 560 }}>
          <p style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>✦ &nbsp; Received &nbsp; ✦</p>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.4rem, 6vw, 3.4rem)", color: "var(--rose)", fontStyle: "italic", lineHeight: 1.15, marginBottom: 20 }}>
            You're officially<br />in the studio.
          </h1>
          <div style={{ width: 40, height: 1, background: "var(--gold)", margin: "0 auto 24px" }} />
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.95rem", color: "rgba(30,15,10,0.6)", lineHeight: 1.75, marginBottom: 36 }}>
            Thank you for completing your onboarding questionnaire. We've received everything and Mandy will be in touch within 24 hours to confirm your next steps and send your media folder link.
          </p>
          <p style={{ fontFamily: FONT_LUXE, fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(30,15,10,0.3)" }}>
            The Dollhouse Brand Studio &nbsp;·&nbsp; hello@dollhousebrandstudio.com
          </p>
        </div>
      </div>
    </div>
  );

  /* ── Intro / Landing Screen ────────────────────────────────────────────── */
  if (!started) return (
    <div style={pageStyle}>
      <Nav />
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "60px 24px 80px" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontFamily: FONT_LUXE, fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>✦ &nbsp; Client Onboarding &nbsp; ✦</p>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.6rem, 6vw, 3.8rem)", color: "var(--rose)", fontStyle: "italic", lineHeight: 1.15, marginBottom: 16 }}>
            Let's build your<br />brand room.
          </h1>
          <div style={{ width: 40, height: 1, background: "var(--gold)", margin: "0 auto 20px" }} />
          <p style={{ fontFamily: FONT_BODY, fontSize: "1rem", color: "rgba(30,15,10,0.58)", lineHeight: 1.75, maxWidth: 480, margin: "0 auto" }}>
            This questionnaire gives us everything we need to build your content strategy, brand aesthetic, and AI clone from scratch — tailored entirely to your business.
          </p>
        </div>

        {/* Info cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 36 }}>
          <div style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(200,168,100,0.2)", borderRadius: 20, padding: "24px 22px" }}>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: "2.2rem", color: "var(--gold)", fontStyle: "italic", marginBottom: 4 }}>15–20</p>
            <p style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(30,15,10,0.45)" }}>Minutes to complete</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(200,168,100,0.2)", borderRadius: 20, padding: "24px 22px" }}>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: "2.2rem", color: "var(--gold)", fontStyle: "italic", marginBottom: 4 }}>8</p>
            <p style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(30,15,10,0.45)" }}>Sections to complete</p>
          </div>
        </div>

        {/* Complete all notice */}
        <div style={{ background: "rgba(200,168,100,0.08)", border: "1px solid rgba(200,168,100,0.25)", borderRadius: 16, padding: "18px 22px", marginBottom: 32, display: "flex", gap: 14, alignItems: "flex-start" }}>
          <span style={{ fontSize: "1.1rem", marginTop: 1 }}>✦</span>
          <div>
            <p style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a5e20", marginBottom: 4 }}>Complete every section for best results</p>
            <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.55)", lineHeight: 1.6 }}>
              The more detail you give us, the more your content will feel like you — and the better your results will be. Skipping sections means we'll have to make assumptions. Take your time and be as specific as possible.
            </p>
          </div>
        </div>

        {/* What to have ready */}
        <div style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(200,168,100,0.18)", borderRadius: 20, padding: "28px 28px", marginBottom: 40 }}>
          <p style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>Before you begin — have these ready</p>
          {([
            [<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>, "Your logo file", "PNG or SVG preferred"],
            [<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>, "Brand photos or images", "Of your space, team, products, or yourself"],
            [<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z"/></svg>, "Your brand colours", "Hex codes if you have them — or a description (e.g. 'blush, gold, cream')"],
            [<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/></svg>, "2–3 Instagram accounts you love", "For aesthetic inspiration — any industry"],
            [<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, "Websites you love the feel of", "Note the URL and what you love about them"],
            [<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>, "Your top 3 services or products", "With a short description of each"],
            [<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>, "Any existing client reviews", "Google reviews, DMs, or written testimonials you can share"],
          ] as [React.ReactNode, string, string][]).map(([icon, title, desc]) => (
            <div key={title} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ flexShrink: 0, marginTop: 2, width: 22, height: 22 }}>{icon}</div>
              <div>
                <p style={{ fontFamily: FONT_LUXE, fontSize: "0.78rem", color: "var(--ink)", fontWeight: 600, marginBottom: 2 }}>{title}</p>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(30,15,10,0.45)", lineHeight: 1.5 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => { setStarted(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{ padding: "16px 48px", borderRadius: "999px", border: "none", background: "var(--ink)", fontFamily: FONT_LUXE, fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", cursor: "pointer", fontWeight: 600 }}
          >
            Begin Questionnaire →
          </button>
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(30,15,10,0.35)", marginTop: 14 }}>Takes approximately 15–20 minutes · 8 sections</p>
        </div>
      </div>
    </div>
  );

  /* ── Multi-step Form ───────────────────────────────────────────────────── */
  return (
    <div style={pageStyle}>
      {/* Sticky header */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(248,237,232,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(200,168,100,0.15)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <a href="https://www.dollhousebrandstudio.com" style={{ textDecoration: "none" }}>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.2rem", color: "var(--rose)", fontStyle: "italic", margin: 0 }}>the Dollhouse</p>
            <p style={{ fontFamily: FONT_LUXE, fontSize: "0.55rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", margin: 0 }}>Brand Studio</p>
          </a>
          <div style={{ textAlign: "right", flex: 1, maxWidth: 220 }}>
            <p style={{ fontFamily: FONT_LUXE, fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(30,15,10,0.38)", margin: "0 0 5px" }}>
              {step + 1} of {STEPS.length} — {STEPS[step]}
            </p>
            <div style={{ height: 2, background: "rgba(200,168,100,0.18)", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ width: `${pct}%`, height: "100%", background: "linear-gradient(90deg, var(--rose), var(--gold))", borderRadius: 99, transition: "width 0.4s ease" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Form body */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 100px" }}>
        <form onSubmit={step === STEPS.length - 1 ? handleSubmit : e => { e.preventDefault(); next(); }}>
          <div style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(16px)", border: "1px solid rgba(200,168,100,0.18)", borderRadius: 24, padding: "36px 32px" }}>

            {/* Step 1 */}
            {step === 0 && (<>
              <StepHeader title="Let's start with your business." sub="Tell us the basics so we know exactly who we're building for." />
              <Field label="Business Name" name="businessName" value={form.businessName} onChange={set} required placeholder="North Medical Spa" />
              <Field label="Email Address" name="email" value={form.email} onChange={set} required type="email" placeholder="hello@yourbusiness.com" />
              <Field label="Phone Number" name="phone" value={form.phone} onChange={set} placeholder="+1 (416) 000-0000" />
              <Field label="Website URL" name="website" value={form.website} onChange={set} placeholder="https://yourbusiness.com" />
              <Field label="Social Media Handles" name="socialHandles" value={form.socialHandles} onChange={set} placeholder="@yourbusiness on Instagram, TikTok, etc." />
              <Field label="City / Location" name="city" value={form.city} onChange={set} required placeholder="Toronto, ON" />
              <SearchableSelect label="Industry / Niche" name="industry" value={form.industry} onChange={set} required options={[
                "Med Spa / Aesthetic Clinic","Beauty & Skincare","Hair Salon & Barbershop","Nail Salon","Tattoo & Piercing","Wellness & Holistic Health","Massage Therapy","Chiropractic & Physiotherapy","Naturopath & Functional Medicine","Dental / Orthodontics","Optometry","Mental Health & Therapy","Personal Training & Gym","Yoga & Pilates Studio","Dance Studio","Martial Arts & Boxing",
                "Landscaping & Lawn Care","Home Renovation & Contracting","Interior Design & Staging","Architecture","Painting & Flooring","Plumbing & HVAC","Electrical","Roofing & Windows","Cleaning Services","Moving & Storage","Pool & Spa Services","Snow Removal",
                "Restaurant & Café","Bakery & Desserts","Bar & Nightclub","Catering & Event Food","Food Truck","Meal Prep & Delivery",
                "Real Estate Agent / Broker","Mortgage & Lending","Property Management","Home Inspection",
                "Coaching & Consulting","Marketing Agency","Graphic Design & Creative","Photography & Videography","Web Design & Tech","Accounting & Tax","Financial Planning","Insurance","Legal Services","HR & Recruiting",
                "Clothing & Fashion","Jewelry & Accessories","Florist","Gift & Lifestyle","Boutique Retail","E-commerce / Online Store",
                "Childcare & Education","Tutoring","Pet Care & Grooming","Veterinary","Animal Training",
                "Auto Repair & Detailing","Car Dealership","Transportation & Logistics",
                "Event Planning & Weddings","Entertainment & Music","Podcast & Media","Travel & Tourism","Hotel & Hospitality","Nonprofit & Charity","Other",
              ]} />
            </>)}

            {/* Step 2 */}
            {step === 1 && (<>
              <StepHeader title="Tell us about your business." sub="The more detail you give us, the more your content will speak directly to your dream clients." />
              <TextArea label="Describe what you offer and who it's for" name="businessDescription" value={form.businessDescription} onChange={set} required rows={4} placeholder="We offer luxury facial treatments and body contouring for women in the GTA who want to look and feel their best…" />
              <TextArea label="What are your top 3 services or products?" name="topServices" value={form.topServices} onChange={set} required rows={3} placeholder="1. Botox & Fillers  2. HydraFacial  3. Laser Hair Removal" />
              <TextArea label="What makes you different from your competitors?" name="differentiator" value={form.differentiator} onChange={set} required rows={3} placeholder="We use the latest technology, 10+ years experience, and every client gets a personalized treatment plan…" />
              <Select label="Average price point per client / transaction" name="pricePoint" value={form.pricePoint} onChange={set} options={["Under $100","$100 – $300","$300 – $500","$500 – $1,000","$1,000 – $3,000","$3,000+"]} />
              <Select label="How long have you been in business?" name="businessAge" value={form.businessAge} onChange={set} options={["Less than 1 year","1 – 2 years","2 – 5 years","5 – 10 years","10+ years"]} />
            </>)}

            {/* Step 3 */}
            {step === 2 && (<>
              <StepHeader title="Who are you talking to?" sub="Every post we create is written for one specific person. Help us picture them clearly." />
              <Select label="Ideal client age range" name="audienceAge" value={form.audienceAge} onChange={set} options={["18 – 24","25 – 34","35 – 44","45 – 54","55 – 64","65+","Multiple age groups"]} />
              <Select label="Ideal client gender" name="audienceGender" value={form.audienceGender} onChange={set} options={["Primarily women","Primarily men","Primarily non-binary / gender neutral","Mixed / all genders"]} />
              <Select label="Ideal client income level" name="audienceIncome" value={form.audienceIncome} onChange={set} options={["Budget-conscious ($30k – $60k/yr)","Middle income ($60k – $100k/yr)","Upper-middle ($100k – $150k/yr)","High income ($150k+/yr)","Varies widely"]} />
              <Field label="Where does your ideal client spend time online?" name="audiencePlatforms" value={form.audiencePlatforms} onChange={set} placeholder="Instagram, TikTok, Facebook, Pinterest…" />
              <TextArea label="What problem do you solve for them?" name="audienceProblem" value={form.audienceProblem} onChange={set} rows={3} placeholder="They're tired of feeling self-conscious about their skin and want a trusted expert who truly listens…" />
              <TextArea label="What makes them choose YOU over a competitor?" name="whyChooseYou" value={form.whyChooseYou} onChange={set} rows={3} placeholder="Our warm, judgment-free environment and personalized results. Clients feel heard, not rushed…" />
              <TextArea label="Describe your ideal client in one sentence" name="idealClientDesc" value={form.idealClientDesc} onChange={set} rows={2} placeholder="A busy professional woman, 30–45, who invests in herself and values quality over price…" />
            </>)}

            {/* Step 4 */}
            {step === 3 && (<>
              <StepHeader title="Your brand aesthetic." sub="Your content should feel completely, unmistakably like you. Let's build your brand room." />
              <MultiCheck label="Which words describe your brand vibe? (select all that apply)" name="vibes" selected={vibes} onChange={(_, v) => setVibes(v)} options={BRAND_VIBES} />
              <Field label="Your brand colours (hex codes or descriptions)" name="brandColors" value={form.brandColors} onChange={set} placeholder="#F5D5C5, #C8A864 — or 'blush pink, gold, cream'" />
              <Select label="Do you have existing brand guidelines or a logo?" name="hasBrandGuidelines" value={form.hasBrandGuidelines} onChange={set} options={["Yes — I have a full brand kit","Yes — just a logo","Partial — some colours and fonts","No — starting from scratch"]} />
              <TextArea label="List 3–5 Instagram accounts whose aesthetic you love" name="instagramInspiration" value={form.instagramInspiration} onChange={set} rows={3} placeholder="@drbarbarasturm, @tatacosmetica, @glossier — I love the clean, aspirational feel…" />
              <TextArea label="List any websites you love the look and feel of" name="websitesLike" value={form.websitesLike} onChange={set} rows={3} placeholder="https://tatacosmetica.com, https://goop.com — I love the editorial, luxury feel…" />
              <TextArea label="3 brands you admire (any industry) and why" name="brandsAdmire" value={form.brandsAdmire} onChange={set} rows={3} placeholder="Chanel — timeless elegance. Four Seasons — effortless luxury. Apple — minimal and premium…" />
              <TextArea label="What should your brand NEVER feel like?" name="neverFeel" value={form.neverFeel} onChange={set} rows={2} placeholder="Cheap, cluttered, loud, aggressive, overly casual, too corporate…" />
            </>)}

            {/* Step 5 */}
            {step === 4 && (<>
              <StepHeader title="Your content preferences." sub="Tell us exactly what your content should look and feel like so every post hits the mark." />
              <MultiCheck label="What types of content do you want? (select all that apply)" name="contentTypes" selected={contentTypes} onChange={(_, v) => setContentTypes(v)} options={CONTENT_TYPES} />
              <Select label="Text on images — what's your preference?" name="textOnImages" value={form.textOnImages} onChange={set} options={["Minimal text — let the visuals speak","Bold text overlays","Mix of both","No preference"]} />
              <Select label="Do you have photos, videos, or brand assets to share?" name="hasAssets" value={form.hasAssets} onChange={set} options={["Yes — professional photos and videos","Yes — some casual photos","Minimal — mostly stock would be needed","No — create everything from scratch"]} />
              <TextArea label="Any specific imagery or themes to AVOID?" name="avoidImagery" value={form.avoidImagery} onChange={set} rows={2} placeholder="No graphic before/afters, no competitors' products, avoid overly clinical imagery…" />
              <Select label="Emojis in captions?" name="emojiPreference" value={form.emojiPreference} onChange={set} options={["Yes — love them 🖤","A few here and there","No — keep it clean","No preference"]} />
              <Select label="Caption length preference" name="captionLength" value={form.captionLength} onChange={set} options={["Short & punchy (1–3 lines)","Medium (3–6 lines)","Detailed storytelling (6+ lines)","Mix it up"]} />
              <TextArea label="Anything else about your content style we should know?" name="extraContentNotes" value={form.extraContentNotes} onChange={set} rows={2} placeholder="I love a warm, editorial feel. Think luxury magazine meets approachable expert…" />
            </>)}

            {/* Step 6 */}
            {step === 5 && (<>
              <StepHeader title="What are we building toward?" sub="Clear goals mean better content. Tell us exactly what winning looks like for your business." />
              <Select label="What is your #1 primary goal for social media?" name="primaryGoal" value={form.primaryGoal} onChange={set} required options={["Book more appointments / clients","Generate more inbound leads","Build brand awareness in my city","Grow my following and reach","Increase online sales","Build authority as an expert","Re-engage existing clients","All of the above"]} />
              <TextArea label="What does success look like for you in 90 days?" name="successIn90Days" value={form.successIn90Days} onChange={set} required rows={3} placeholder="I want to be consistently booked, have at least 5 new clients from social media, and feel confident my brand looks premium online…" />
              <TextArea label="Current social media following (rough numbers per platform)" name="currentFollowers" value={form.currentFollowers} onChange={set} rows={2} placeholder="Instagram: 420 followers, TikTok: 0, Facebook: 150…" />
              <Select label="Are you currently running any paid ads?" name="runningAds" value={form.runningAds} onChange={set} options={["Yes — Facebook / Instagram","Yes — Google","Yes — TikTok","Yes — multiple platforms","No — not yet","Tried it but stopped"]} />
              <Select label="Monthly ad spend budget (if any)" name="adBudget" value={form.adBudget} onChange={set} options={["$0 — no ad budget right now","$50 – $150/mo","$150 – $500/mo","$500 – $1,000/mo","$1,000+/mo"]} />
            </>)}

            {/* Step 7 */}
            {step === 6 && (<>
              <StepHeader title="Almost done — your AI clone." sub="This is what makes your content completely unique. Help us build your digital presence." />
              <Select label="Are you comfortable appearing on camera?" name="onCamera" value={form.onCamera} onChange={set} options={["Yes — I love being on camera","Somewhat — I'll do it but I'm not super comfortable","No — I prefer not to appear on camera","I want a brand character / mascot instead of me"]} />
              <Select label="AI Clone preference" name="cloneType" value={form.cloneType} onChange={set} options={["AI clone of me — my face, my voice, my energy","A brand character / mascot built around my business","Both — clone + a mascot character","Not sure yet — let's discuss"]} />
              <Field label="Your name as it should appear on content" name="displayName" value={form.displayName} onChange={set} placeholder="Dr. Sarah / Mandy / The Dollhouse Team" />
              <TextArea label="Phrases or language you ALWAYS use in your business" name="alwaysUse" value={form.alwaysUse} onChange={set} rows={2} placeholder="'You deserve to feel confident in your skin' / always say 'investment' not 'cost'…" />
              <TextArea label="Words, claims, or phrases to NEVER use" name="neverUse" value={form.neverUse} onChange={set} rows={2} placeholder="Never say 'cheap', never promise results in X days, avoid overly medical jargon…" />
              <TextArea label="Any upcoming promotions, events, or launches in the next 3 months?" name="upcomingPromos" value={form.upcomingPromos} onChange={set} rows={3} placeholder="Summer skin prep promo in June ($50 off HydraFacials), new body contouring package in July…" />
              <TextArea label="Anything else you want us to know before we start?" name="anythingElse" value={form.anythingElse} onChange={set} rows={4} placeholder="I had a bad experience with a previous agency. I care about transparency and communication…" />
            </>)}

            {/* Step 8 */}
            {step === 7 && (<>
              <StepHeader title="Your story & strategy." sub="This is where great content comes from. The more you share, the more powerful your brand will be." />
              <TextArea label="Why did you start this business? What's your origin story?" name="brandOrigin" value={form.brandOrigin} onChange={set} required rows={4} placeholder="I started after struggling myself with [problem]. I couldn't find anyone who really understood what I needed, so I trained and built my own practice…" />
              <TextArea label="Share a client transformation story you're proud of" name="clientTransformation" value={form.clientTransformation} onChange={set} rows={4} placeholder="A client came to us feeling completely invisible online. Within 60 days their DMs were full and they had to turn clients away…" />
              <TextArea label="What are the top 5 questions clients always ask you?" name="topFAQs" value={form.topFAQs} onChange={set} required rows={5} placeholder="1. How long does it take to see results?  2. Does it hurt?  3. How much does it cost?  4. What's the difference between X and Y?  5. How do I book?" />
              <TextArea label="Who are your top 2–3 local competitors?" name="competitors" value={form.competitors} onChange={set} rows={2} placeholder="@northmedicalspa, Glow Clinic Toronto — they post a lot of before/afters and promotions" />
              <Select label="What do you want people to DO after seeing your content?" name="preferredCTA" value={form.preferredCTA} onChange={set} required options={["DM us to book","Click the link in bio to book online","Call us directly","Visit us in-store / in-clinic","Fill out a contact form","Follow us and stay tuned","All of the above"]} />
              <Field label="Your busiest / peak months" name="peakMonths" value={form.peakMonths} onChange={set} placeholder="March – May, September – November" />
              <Field label="Your slowest months (we'll drive traffic here)" name="slowMonths" value={form.slowMonths} onChange={set} placeholder="January, July — we need content that drives bookings during these periods" />
              <TextArea label="Credentials, certifications, awards, or years of experience" name="credentials" value={form.credentials} onChange={set} rows={3} placeholder="10+ years experience, certified by [Association], voted Best Med Spa in Toronto 2023…" />
              <TextArea label="Do you have existing client reviews or testimonials we can use?" name="existingTestimonials" value={form.existingTestimonials} onChange={set} rows={3} placeholder="Yes — Google reviews. 'Best experience I've ever had.' I also have some video testimonials on file." />
              <TextArea label="Are there team members to feature in content?" name="teamMembers" value={form.teamMembers} onChange={set} rows={2} placeholder="Just me / Yes — Dr. Sarah (lead injector), Jess (aesthetician), Mia (client care)" />
              <TextArea label="Any services or topics to avoid promoting?" name="avoidServices" value={form.avoidServices} onChange={set} rows={2} placeholder="We're fully booked for lip fillers right now. Avoid anything related to extreme weight loss." />
              <Field label="Your service area" name="serviceArea" value={form.serviceArea} onChange={set} placeholder="Toronto, Yorkville, Forest Hill, North York — serving the GTA" />

              {error && (
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "#c0392b", padding: "12px 16px", background: "rgba(192,57,43,0.06)", borderRadius: 10, border: "1px solid rgba(192,57,43,0.15)", marginBottom: 8 }}>{error}</p>
              )}
            </>)}

          </div>

          {/* Navigation */}
          <div style={{ display: "flex", gap: 12, marginTop: 20, justifyContent: "space-between", alignItems: "center" }}>
            {step > 0
              ? <button type="button" onClick={back}
                  style={{ padding: "13px 28px", borderRadius: "999px", border: "1px solid rgba(200,168,100,0.35)", background: "transparent", fontFamily: FONT_LUXE, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(30,15,10,0.45)", cursor: "pointer" }}>
                  ← Back
                </button>
              : <div />
            }
            <button type="submit" disabled={submitting}
              style={{ padding: "14px 36px", borderRadius: "999px", border: "none", background: "var(--ink)", fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.7 : 1, fontWeight: 600 }}>
              {submitting ? "Sending…" : step === STEPS.length - 1 ? "Submit Questionnaire ✦" : `Next — ${STEPS[step + 1]} →`}
            </button>
          </div>

          {/* Step dots */}
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 24 }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{ width: i === step ? 20 : 6, height: 6, borderRadius: 99, background: i === step ? "var(--gold)" : i < step ? "rgba(200,168,100,0.4)" : "rgba(200,168,100,0.15)", transition: "all 0.3s" }} />
            ))}
          </div>
        </form>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "20px 24px", borderTop: "1px solid rgba(200,168,100,0.1)" }}>
        <p style={{ fontFamily: FONT_LUXE, fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(30,15,10,0.28)" }}>
          The Dollhouse Brand Studio &nbsp;·&nbsp; hello@dollhousebrandstudio.com &nbsp;·&nbsp; shopdollhouse.co
        </p>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <header style={{ background: "rgba(248,237,232,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(200,168,100,0.12)", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <a href="https://www.dollhousebrandstudio.com" style={{ textDecoration: "none" }}>
        <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.25rem", color: "var(--rose)", fontStyle: "italic", margin: 0 }}>the Dollhouse</p>
        <p style={{ fontFamily: FONT_LUXE, fontSize: "0.55rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", margin: 0 }}>Brand Studio</p>
      </a>
      <p style={{ fontFamily: FONT_LUXE, fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(30,15,10,0.35)", margin: 0 }}>Client Onboarding</p>
    </header>
  );
}
