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
  // Step 1
  businessName: "", email: "", phone: "", website: "", socialHandles: "", city: "", industry: "",
  // Step 2
  businessDescription: "", topServices: "", differentiator: "", pricePoint: "", businessAge: "",
  // Step 3
  audienceAge: "", audienceGender: "", audienceIncome: "", audiencePlatforms: "", audienceProblem: "", whyChooseYou: "", idealClientDesc: "",
  // Step 4
  brandColors: "", hasBrandGuidelines: "", instagramInspiration: "", websitesLike: "", brandsAdmire: "", neverFeel: "",
  // Step 5
  textOnImages: "", hasAssets: "", avoidImagery: "", emojiPreference: "", captionLength: "", extraContentNotes: "",
  // Step 6
  primaryGoal: "", successIn90Days: "", currentFollowers: "", runningAds: "", adBudget: "",
  // Step 7
  onCamera: "", cloneType: "", displayName: "", alwaysUse: "", neverUse: "", upcomingPromos: "", anythingElse: "",
  // Step 8
  brandOrigin: "", clientTransformation: "", topFAQs: "", competitors: "", preferredCTA: "", peakMonths: "", slowMonths: "", credentials: "", existingTestimonials: "", teamMembers: "", avoidServices: "", serviceArea: "",
};

const BRAND_VIBES = ["Luxury", "Warm & Inviting", "Clinical & Professional", "Bold & Edgy", "Playful & Fun", "Minimal & Clean", "Elegant & Editorial", "Natural & Earthy", "High Fashion", "Approachable & Friendly"];
const CONTENT_TYPES = ["Educational Tips", "Behind the Scenes", "Before & After", "Client Testimonials", "Promotional Offers", "Inspirational Quotes", "Trending / Entertainment", "Product/Service Spotlight", "Founder Story", "FAQ / Myth Busting"];

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.7)",
  border: "1px solid rgba(200,168,100,0.3)",
  borderRadius: "12px",
  padding: "12px 16px",
  fontFamily: FONT_BODY,
  fontSize: "0.9rem",
  color: "#1e0f0a",
  outline: "none",
  width: "100%",
  boxSizing: "border-box" as const,
};

const labelStyle: React.CSSProperties = {
  fontFamily: FONT_LUXE,
  fontSize: "0.68rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "rgba(30,15,10,0.5)",
  display: "block",
  marginBottom: "6px",
};

const Field = ({ label, name, value, onChange, type = "text", placeholder = "", required = false }: {
  label: string; name: string; value: string; onChange: (n: string, v: string) => void;
  type?: string; placeholder?: string; required?: boolean;
}) => (
  <div style={{ marginBottom: "20px" }}>
    <label style={labelStyle}>{label}{required && <span style={{ color: "var(--rose)", marginLeft: 2 }}>*</span>}</label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={e => onChange(name, e.target.value)}
      style={inputStyle}
    />
  </div>
);

const TextArea = ({ label, name, value, onChange, placeholder = "", rows = 3, required = false }: {
  label: string; name: string; value: string; onChange: (n: string, v: string) => void;
  placeholder?: string; rows?: number; required?: boolean;
}) => (
  <div style={{ marginBottom: "20px" }}>
    <label style={labelStyle}>{label}{required && <span style={{ color: "var(--rose)", marginLeft: 2 }}>*</span>}</label>
    <textarea
      value={value}
      placeholder={placeholder}
      required={required}
      rows={rows}
      onChange={e => onChange(name, e.target.value)}
      style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
    />
  </div>
);

const Select = ({ label, name, value, onChange, options, required = false }: {
  label: string; name: string; value: string; onChange: (n: string, v: string) => void;
  options: string[]; required?: boolean;
}) => (
  <div style={{ marginBottom: "20px" }}>
    <label style={labelStyle}>{label}{required && <span style={{ color: "var(--rose)", marginLeft: 2 }}>*</span>}</label>
    <select
      value={value}
      required={required}
      onChange={e => onChange(name, e.target.value)}
      style={{ ...inputStyle, cursor: "pointer" }}
    >
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
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = (o: string) => { onChange(name, o); setQuery(o); setOpen(false); };

  return (
    <div style={{ marginBottom: "20px", position: "relative" }} ref={ref}>
      <label style={labelStyle}>{label}{required && <span style={{ color: "var(--rose)", marginLeft: 2 }}>*</span>}</label>
      <div style={{ position: "relative" }}>
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); onChange(name, ""); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Type to search your industry…"
          style={{ ...inputStyle, paddingRight: 36 }}
        />
        <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "var(--gold)", fontSize: "0.7rem", pointerEvents: "none" }}>▾</span>
      </div>
      {open && filtered.length > 0 && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 100,
          background: "#fff", border: "1px solid rgba(200,168,100,0.3)", borderRadius: 12,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)", maxHeight: 220, overflowY: "auto",
        }}>
          {filtered.map(o => (
            <button
              key={o} type="button" onClick={() => select(o)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "10px 16px", border: "none", background: o === value ? "rgba(200,168,100,0.1)" : "transparent",
                fontFamily: FONT_BODY, fontSize: "0.88rem", color: o === value ? "#a06e30" : "#1e0f0a",
                cursor: "pointer", fontWeight: o === value ? 600 : 400,
                borderBottom: "1px solid rgba(200,168,100,0.08)",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(200,168,100,0.08)")}
              onMouseLeave={e => (e.currentTarget.style.background = o === value ? "rgba(200,168,100,0.1)" : "transparent")}
            >
              {o}
            </button>
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
  const toggle = (o: string) => {
    onChange(name, selected.includes(o) ? selected.filter(x => x !== o) : [...selected, o]);
  };
  return (
    <div style={{ marginBottom: "24px" }}>
      <label style={labelStyle}>{label}</label>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "8px", marginTop: "4px" }}>
        {options.map(o => {
          const active = selected.includes(o);
          return (
            <button
              key={o}
              type="button"
              onClick={() => toggle(o)}
              style={{
                padding: "10px 14px",
                borderRadius: "10px",
                border: active ? "1.5px solid var(--gold)" : "1px solid rgba(200,168,100,0.25)",
                background: active ? "rgba(200,168,100,0.12)" : "rgba(255,255,255,0.6)",
                fontFamily: FONT_BODY,
                fontSize: "0.82rem",
                color: active ? "#a06e30" : "rgba(30,15,10,0.65)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
                fontWeight: active ? 600 : 400,
              }}
            >
              {active ? "✦ " : ""}{o}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default function OnboardingForm() {
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

    const payload = {
      ...form,
      brandVibes: vibes.join(", "),
      contentTypes: contentTypes.join(", "),
      _subject: `🎀 New Client Onboarding — ${form.businessName || form.clientName}`,
    };

    try {
      const res = await fetch("https://formspree.io/f/xaqkkopk", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError("Something went wrong. Please try again or email us at hello@shopdollhouse.co");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Thank You ────────────────────────────────────────────────────────── */
  if (submitted) return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8ede8 0%, #faf3ea 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ textAlign: "center", maxWidth: 520 }}>
        <p style={{ fontFamily: FONT_LUXE, fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>✦ Received ✦</p>
        <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.5rem, 6vw, 3.5rem)", color: "var(--rose)", fontStyle: "italic", lineHeight: 1.2, marginBottom: 16 }}>
          You're officially in the studio.
        </h1>
        <p style={{ fontFamily: FONT_BODY, fontSize: "1rem", color: "rgba(30,15,10,0.65)", lineHeight: 1.7, marginBottom: 32 }}>
          Thank you for completing your onboarding questionnaire. We've received everything and Mandy will be in touch within 24 hours to confirm next steps and send your media folder link.
        </p>
        <p style={{ fontFamily: FONT_LUXE, fontSize: "0.75rem", letterSpacing: "0.12em", color: "rgba(30,15,10,0.4)", textTransform: "uppercase" }}>
          The Dollhouse Brand Studio · hello@shopdollhouse.co
        </p>
      </div>
    </div>
  );

  const pct = Math.round(((step + 1) / STEPS.length) * 100);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8ede8 0%, #faf3ea 60%, #fdf6ee 100%)" }}>
      {/* Header */}
      <div style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(200,168,100,0.15)", padding: "16px 24px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "var(--rose)", fontStyle: "italic", margin: 0 }}>the Dollhouse</p>
            <p style={{ fontFamily: FONT_LUXE, fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", margin: 0 }}>Client Onboarding</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(30,15,10,0.4)", margin: "0 0 6px" }}>
              Step {step + 1} of {STEPS.length} — {STEPS[step]}
            </p>
            <div style={{ width: 160, height: 3, background: "rgba(200,168,100,0.2)", borderRadius: 99 }}>
              <div style={{ width: `${pct}%`, height: "100%", background: "var(--gold)", borderRadius: 99, transition: "width 0.4s ease" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>
        <form onSubmit={step === STEPS.length - 1 ? handleSubmit : e => { e.preventDefault(); next(); }}>

          {/* ── Step 1: Your Details ─────────────────────────────── */}
          {step === 0 && (
            <div>
              <StepHeader title="Let's start with you." sub="Tell us about your business so we know exactly who we're building for." />
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
                "Event Planning & Weddings","Entertainment & Music","Podcast & Media","Travel & Tourism","Hotel & Hospitality","Nonprofit & Charity",
                "Other"
              ]} />
            </div>
          )}

          {/* ── Step 2: Your Business ────────────────────────────── */}
          {step === 1 && (
            <div>
              <StepHeader title="Tell us about your business." sub="The more detail you give us, the more your content will speak directly to your dream clients." />
              <TextArea label="Describe what you offer and who it's for" name="businessDescription" value={form.businessDescription} onChange={set} required rows={4} placeholder="We offer luxury facial treatments and body contouring for women in the GTA who want to look and feel their best…" />
              <TextArea label="What are your top 3 services or products?" name="topServices" value={form.topServices} onChange={set} required rows={3} placeholder="1. Botox & Fillers  2. HydraFacial  3. Laser Hair Removal" />
              <TextArea label="What makes you different from your competitors?" name="differentiator" value={form.differentiator} onChange={set} required rows={3} placeholder="We use the latest technology, have 10+ years of experience, and every client gets a personalized treatment plan…" />
              <Select label="Average price point per client / transaction" name="pricePoint" value={form.pricePoint} onChange={set} options={["Under $100","$100 – $300","$300 – $500","$500 – $1,000","$1,000 – $3,000","$3,000+"]} />
              <Select label="How long have you been in business?" name="businessAge" value={form.businessAge} onChange={set} options={["Less than 1 year","1 – 2 years","2 – 5 years","5 – 10 years","10+ years"]} />
            </div>
          )}

          {/* ── Step 3: Your Audience ────────────────────────────── */}
          {step === 2 && (
            <div>
              <StepHeader title="Who are you talking to?" sub="Every post we create is written for one specific person. Help us picture them clearly." />
              <Select label="Ideal client age range" name="audienceAge" value={form.audienceAge} onChange={set} options={["18 – 24","25 – 34","35 – 44","45 – 54","55 – 64","65+","Multiple age groups"]} />
              <Select label="Ideal client gender" name="audienceGender" value={form.audienceGender} onChange={set} options={["Primarily women","Primarily men","Primarily non-binary / gender neutral","Mixed / all genders"]} />
              <Select label="Ideal client income level" name="audienceIncome" value={form.audienceIncome} onChange={set} options={["Budget-conscious ($30k – $60k/yr)","Middle income ($60k – $100k/yr)","Upper-middle ($100k – $150k/yr)","High income ($150k+/yr)","Varies widely"]} />
              <Field label="Where does your ideal client spend time online?" name="audiencePlatforms" value={form.audiencePlatforms} onChange={set} placeholder="Instagram, TikTok, Facebook, Pinterest…" />
              <TextArea label="What problem do you solve for them?" name="audienceProblem" value={form.audienceProblem} onChange={set} rows={3} placeholder="They're tired of feeling self-conscious about their skin and want a trusted expert to help them look as confident as they feel inside…" />
              <TextArea label="What makes them choose YOU over a competitor?" name="whyChooseYou" value={form.whyChooseYou} onChange={set} rows={3} placeholder="Our warm, judgment-free environment and personalized results. Clients feel heard, not rushed…" />
              <TextArea label="Describe your ideal client in one sentence" name="idealClientDesc" value={form.idealClientDesc} onChange={set} rows={2} placeholder="A busy professional woman, 30-45, who invests in herself and values quality over price…" />
            </div>
          )}

          {/* ── Step 4: Brand & Aesthetic ────────────────────────── */}
          {step === 3 && (
            <div>
              <StepHeader title="Your brand aesthetic." sub="Your content should feel completely, unmistakably like you. Let's build your brand room." />
              <MultiCheck label="Which words describe your brand vibe? (select all that apply)" name="vibes" selected={vibes} onChange={(_, v) => setVibes(v)} options={BRAND_VIBES} />
              <Field label="Your brand colours (hex codes or descriptions)" name="brandColors" value={form.brandColors} onChange={set} placeholder="#F5D5C5, #C8A864 — or 'blush pink, gold, cream'" />
              <Select label="Do you have existing brand guidelines or a logo?" name="hasBrandGuidelines" value={form.hasBrandGuidelines} onChange={set} options={["Yes — I have a full brand kit","Yes — just a logo","Partial — some colours and fonts","No — starting from scratch"]} />
              <TextArea label="List 3–5 Instagram accounts whose aesthetic you love" name="instagramInspiration" value={form.instagramInspiration} onChange={set} rows={3} placeholder="@drbarbarasturm, @tatacosmetica, @glossier — I love the clean, aspirational feel…" />
              <TextArea label="List any websites you love the look and feel of" name="websitesLike" value={form.websitesLike} onChange={set} rows={3} placeholder="https://tatacosmetica.com, https://goop.com — I love the clean, editorial, luxury feel…" />
              <TextArea label="3 brands you admire (any industry) and why" name="brandsAdmire" value={form.brandsAdmire} onChange={set} rows={3} placeholder="Chanel — timeless elegance. Four Seasons — effortless luxury. Apple — minimal and premium…" />
              <TextArea label="What should your brand NEVER feel like?" name="neverFeel" value={form.neverFeel} onChange={set} rows={2} placeholder="Cheap, cluttered, loud, aggressive, overly casual, too corporate…" />
            </div>
          )}

          {/* ── Step 5: Content Preferences ─────────────────────── */}
          {step === 4 && (
            <div>
              <StepHeader title="Your content preferences." sub="Tell us exactly what your content should look and feel like so every post hits the mark." />
              <MultiCheck label="What types of content do you want? (select all that apply)" name="contentTypes" selected={contentTypes} onChange={(_, v) => setContentTypes(v)} options={CONTENT_TYPES} />
              <Select label="Text on images — what's your preference?" name="textOnImages" value={form.textOnImages} onChange={set} options={["Minimal text — let the visuals speak","Bold text overlays","Mix of both","No preference"]} />
              <Select label="Do you have photos, videos, or brand assets to share?" name="hasAssets" value={form.hasAssets} onChange={set} options={["Yes — I have professional photos and videos","Yes — I have some casual photos","Minimal — mostly stock would be needed","No — you'll need to create everything"]} />
              <TextArea label="Any specific imagery or themes to AVOID?" name="avoidImagery" value={form.avoidImagery} onChange={set} rows={2} placeholder="No graphic before/afters, no competitors' products, avoid overly clinical imagery…" />
              <Select label="Emojis in captions?" name="emojiPreference" value={form.emojiPreference} onChange={set} options={["Yes — love them 🖤","A few here and there","No — keep it clean","No preference"]} />
              <Select label="Caption length preference" name="captionLength" value={form.captionLength} onChange={set} options={["Short & punchy (1–3 lines)","Medium (3–6 lines)","Detailed storytelling (6+ lines)","Mix it up"]} />
              <TextArea label="Anything else about your content style we should know?" name="extraContentNotes" value={form.extraContentNotes} onChange={set} rows={2} placeholder="I love a warm, editorial feel. Think luxury magazine meets approachable expert…" />
            </div>
          )}

          {/* ── Step 6: Your Goals ───────────────────────────────── */}
          {step === 5 && (
            <div>
              <StepHeader title="What are we building toward?" sub="Clear goals mean better content. Tell us exactly what winning looks like for your business." />
              <Select label="What is your #1 primary goal for social media?" name="primaryGoal" value={form.primaryGoal} onChange={set} required options={["Book more appointments / clients","Generate more inbound leads","Build brand awareness in my city","Grow my following and reach","Increase online sales","Build authority as an expert","Re-engage existing clients","All of the above"]} />
              <TextArea label="What does success look like for you in 90 days?" name="successIn90Days" value={form.successIn90Days} onChange={set} required rows={3} placeholder="I want to be consistently booked, have at least 5 new clients from social media, and feel confident my brand looks premium online…" />
              <TextArea label="Current social media following (rough numbers per platform)" name="currentFollowers" value={form.currentFollowers} onChange={set} rows={2} placeholder="Instagram: 420 followers, TikTok: 0, Facebook: 150…" />
              <Select label="Are you currently running any paid ads?" name="runningAds" value={form.runningAds} onChange={set} options={["Yes — Facebook / Instagram","Yes — Google","Yes — TikTok","Yes — multiple platforms","No — not yet","Tried it but stopped"]} />
              <Select label="Monthly ad spend budget (if any)" name="adBudget" value={form.adBudget} onChange={set} options={["$0 — no ad budget right now","$50 – $150/mo","$150 – $500/mo","$500 – $1,000/mo","$1,000+/mo"]} />
            </div>
          )}

          {/* ── Step 7: AI Clone & Final ─────────────────────────── */}
          {step === 6 && (
            <div>
              <StepHeader title="Almost done — your AI clone." sub="This is what makes your content completely unique. Help us build your digital presence from the inside out." />
              <Select label="Are you comfortable appearing on camera?" name="onCamera" value={form.onCamera} onChange={set} options={["Yes — I love being on camera","Somewhat — I'll do it but I'm not super comfortable","No — I prefer not to appear on camera","I want a brand character / mascot instead of me"]} />
              <Select label="AI Clone preference" name="cloneType" value={form.cloneType} onChange={set} options={["AI clone of me — my face, my voice, my energy","A brand character / mascot built around my business","Both — clone + a mascot character","Not sure yet — let's discuss"]} />
              <Field label="Your name as it should appear on content" name="displayName" value={form.displayName} onChange={set} placeholder="Dr. Sarah / Mandy / The Dollhouse Team" />
              <TextArea label="Phrases or language you ALWAYS use in your business" name="alwaysUse" value={form.alwaysUse} onChange={set} rows={2} placeholder="'You deserve to feel confident in your skin' / 'Results you can see and feel' / always say 'investment' not 'cost'…" />
              <TextArea label="Words, claims, or phrases to NEVER use" name="neverUse" value={form.neverUse} onChange={set} rows={2} placeholder="Never say 'cheap', never promise specific results in X days, avoid overly medical jargon…" />
              <TextArea label="Any upcoming promotions, events, or launches in the next 3 months?" name="upcomingPromos" value={form.upcomingPromos} onChange={set} rows={3} placeholder="Summer skin prep promo in June ($50 off HydraFacials), launching a new body contouring package in July…" />
              <TextArea label="Anything else you want us to know before we start?" name="anythingElse" value={form.anythingElse} onChange={set} rows={4} placeholder="I had a bad experience with another agency who never communicated. I care a lot about transparency. I also have a really loyal client base who I want to feel seen in the content…" />
            </div>
          )}

          {/* ── Step 8: Brand Story & Strategy ──────────────────── */}
          {step === 7 && (
            <div>
              <StepHeader title="Your story & strategy." sub="This is where great content comes from. The more you share, the more powerful your content will be." />
              <TextArea label="Why did you start this business? What's your origin story?" name="brandOrigin" value={form.brandOrigin} onChange={set} required rows={4} placeholder="I started after struggling myself with [problem]. I couldn't find anyone who really understood what I needed, so I trained, built my own practice, and made it my mission to make sure no one else feels that way…" />
              <TextArea label="Share a client transformation story you're proud of" name="clientTransformation" value={form.clientTransformation} onChange={set} rows={4} placeholder="A client came to us feeling completely invisible online. Within 60 days their DMs were full and they had to turn clients away. They called me crying — that's why I do this…" />
              <TextArea label="What are the top 5 questions clients always ask you?" name="topFAQs" value={form.topFAQs} onChange={set} required rows={5} placeholder="1. How long does it take to see results?  2. Does it hurt?  3. How much does it cost?  4. What's the difference between X and Y?  5. How do I book?" />
              <TextArea label="Who are your top 2–3 local competitors? (business names or Instagram handles)" name="competitors" value={form.competitors} onChange={set} rows={2} placeholder="@northmedicalspa, Glow Clinic Toronto, The Skin Bar — they post a lot of before/afters and promotions" />
              <Select label="What do you want people to DO after seeing your content?" name="preferredCTA" value={form.preferredCTA} onChange={set} required options={["DM us to book","Click the link in bio to book online","Call us directly","Visit us in-store / in-clinic","Fill out a contact form","Follow us and stay tuned","All of the above"]} />
              <Field label="Your busiest / peak months" name="peakMonths" value={form.peakMonths} onChange={set} placeholder="March – May (spring), September – November (fall)" />
              <Field label="Your slowest months (we'll drive traffic here)" name="slowMonths" value={form.slowMonths} onChange={set} placeholder="January, July — we need content that drives bookings during these periods" />
              <TextArea label="Credentials, certifications, awards, or years of experience" name="credentials" value={form.credentials} onChange={set} rows={3} placeholder="10+ years experience, certified by [Association], voted Best Med Spa in Toronto 2023, trained in [Technique]…" />
              <TextArea label="Do you have existing client reviews or testimonials we can use in content?" name="existingTestimonials" value={form.existingTestimonials} onChange={set} rows={3} placeholder="Yes — I have Google reviews. 'Best experience I've ever had — completely transformed my skin.' — Sarah M. I also have some video testimonials on file." />
              <TextArea label="Are there team members to feature in content? (names & roles)" name="teamMembers" value={form.teamMembers} onChange={set} rows={2} placeholder="Just me for now / Yes — Dr. Sarah (lead injector), Jess (aesthetician), Mia (front desk & client care)" />
              <TextArea label="Any services or topics to avoid promoting?" name="avoidServices" value={form.avoidServices} onChange={set} rows={2} placeholder="We're fully booked for lip fillers right now — don't promote that. Avoid anything related to extreme weight loss." />
              <Field label="Your service area (city, neighbourhoods, or radius)" name="serviceArea" value={form.serviceArea} onChange={set} placeholder="Toronto, Yorkville, Forest Hill, North York — serving the GTA" />

              {error && (
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "#c0392b", marginBottom: 16, padding: "12px 16px", background: "rgba(192,57,43,0.06)", borderRadius: 10, border: "1px solid rgba(192,57,43,0.2)" }}>
                  {error}
                </p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: "flex", gap: 12, marginTop: 8, justifyContent: "space-between" }}>
            {step > 0 && (
              <button
                type="button"
                onClick={back}
                style={{ padding: "14px 28px", borderRadius: "999px", border: "1px solid rgba(200,168,100,0.4)", background: "transparent", fontFamily: FONT_LUXE, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(30,15,10,0.5)", cursor: "pointer" }}
              >
                ← Back
              </button>
            )}
            <button
              type="submit"
              disabled={submitting}
              style={{ marginLeft: "auto", padding: "14px 36px", borderRadius: "999px", border: "none", background: "var(--gold)", fontFamily: FONT_LUXE, fontSize: "0.75rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff", cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.7 : 1, fontWeight: 600 }}
            >
              {submitting ? "Sending…" : step === STEPS.length - 1 ? "Submit Questionnaire →" : `Next — ${STEPS[step + 1]} →`}
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "24px", borderTop: "1px solid rgba(200,168,100,0.1)" }}>
        <p style={{ fontFamily: FONT_LUXE, fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(30,15,10,0.3)" }}>
          The Dollhouse Brand Studio · hello@shopdollhouse.co · shopdollhouse.co
        </p>
      </div>
    </div>
  );
}

function StepHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <p style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>✦ The Dollhouse Brand Studio</p>
      <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.8rem, 4vw, 2.4rem)", color: "var(--rose)", fontStyle: "italic", lineHeight: 1.2, marginBottom: 10 }}>{title}</h2>
      <p style={{ fontFamily: FONT_BODY, fontSize: "0.95rem", color: "rgba(30,15,10,0.55)", lineHeight: 1.6 }}>{sub}</p>
      <div style={{ height: 1, background: "rgba(200,168,100,0.2)", marginTop: 24 }} />
    </div>
  );
}
