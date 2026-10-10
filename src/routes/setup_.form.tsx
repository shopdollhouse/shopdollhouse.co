import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ClipboardList, Lock } from "lucide-react";
import { usePageMeta } from "@/lib/use-page-meta";
import { ONBOARDING_WEBHOOK_URL, SUPPORT_EMAIL } from "@/lib/launch-offer";
import { styleImg } from "@/components/LaunchAnimatedPreviews";
import { BODY, DISPLAY, FLOW_KEYS, FlowShell, LUXE, LeftTitle, Pill, store, useLead, useNoindex } from "@/components/LaunchFlow";

export const Route = createFileRoute("/setup_/form")({ component: OnboardingFormPage });

const STEP_TITLES = ["Your business", "Content preferences", "Your visual style"];
const FAV_KEY = "launch-style-favorites";
const DRAFT_KEY = "launch-onboarding-draft";

const STYLES = [
  { name: "Expert desk notes", img: "desk-single" },
  { name: "Creative collage", img: "collage-single" },
  { name: "Bold brand graphics", img: "bold-single" },
  { name: "Photo caption stories", img: "story-single" },
  { name: "Animated character", img: "character-single" },
  { name: "Whiteboard lessons", img: "board-single" },
  { name: "Minimal text", img: "minimal-single" },
  { name: "Before & after posts", img: "ba-single" },
  { name: "Everyday object posts", img: "object-single" },
  { name: "Chat-style posts", img: "chat-single" },
  { name: "Simple feed-style posts", img: "feed-single" },
  { name: "Reel cover posts", img: "reel-single" },
];

type Answers = {
  businessName: string;
  website: string;
  businessDescription: string;
  topicsInclude: string;
  topicsExclude: string;
  usePhotos: string;
  reviewPosts: string;
  primaryAction: string;
  leadMagnet: string;
  styles: string[];
  customStyle: string;
  inspirationLinks: string;
  notes: string;
};

const EMPTY: Answers = { businessName: "", website: "", businessDescription: "", topicsInclude: "", topicsExclude: "", usePhotos: "", reviewPosts: "", primaryAction: "", leadMagnet: "", styles: [], customStyle: "", inspirationLinks: "", notes: "" };

const input = "mt-2 block w-full rounded-xl border bg-white px-4 py-3 text-[0.95rem] outline-none transition focus:ring-4";
const inputStyle = { fontFamily: BODY, borderColor: "rgba(31,17,11,0.15)", color: "var(--ink)" } as const;
const labelStyle = { fontFamily: LUXE, fontWeight: 600, fontSize: "0.86rem", color: "var(--ink)" } as const;

function OnboardingFormPage() {
  usePageMeta("Onboarding Form | Dollhouse Launch", "Tell us about your business so we can build posts that sound like you.");
  useNoindex();
  const lead = useLead();
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>(EMPTY);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [who, setWho] = useState({ firstName: "", email: "", phone: "" });
  const heading = useRef<HTMLHeadingElement>(null);

  // Restore a saved draft, and pre-select styles favorited on the homepage.
  useEffect(() => {
    let draft: Partial<Answers> = {};
    try {
      const raw = store.get(DRAFT_KEY);
      if (raw) draft = JSON.parse(raw);
    } catch {
      /* ignore */
    }
    let favs: string[] = [];
    try {
      const raw = store.get(FAV_KEY);
      if (raw) favs = JSON.parse(raw);
    } catch {
      /* ignore */
    }
    try {
      const rawWho = store.get(DRAFT_KEY + "-who");
      if (rawWho) setWho(JSON.parse(rawWho));
    } catch {
      /* ignore */
    }
    setA({ ...EMPTY, ...draft, styles: draft.styles?.length ? draft.styles : favs.filter((f) => STYLES.some((s) => s.name === f)) });
  }, []);

  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => setA((prev) => {
    const next = { ...prev, [k]: v };
    store.set(DRAFT_KEY, JSON.stringify(next));
    return next;
  });
  const toggleStyle = (n: string) => set("styles", a.styles.includes(n) ? a.styles.filter((x) => x !== n) : [...a.styles, n]);

  const goTo = (n: number) => {
    setStep(n);
    setError("");
    window.setTimeout(() => heading.current?.focus(), 0);
  };

  const validate = (s: number) => {
    if (s === 0 && !lead && (!who.firstName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(who.email.trim()))) return "Please add your first name and the email you used at checkout, so we can match your answers to your order.";
    if (s === 0 && (!a.businessName.trim() || !a.businessDescription.trim())) return "Please add your business name and a short description before continuing.";
    if (s === 1 && (!a.usePhotos || !a.reviewPosts || !a.primaryAction || !a.leadMagnet)) return "Please answer the required preference questions before continuing.";
    return "";
  };

  const next = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = validate(step);
    if (msg) return setError(msg);
    if (step < 2) return goTo(step + 1);
    void submit();
  };

  const submit = async () => {
    for (const s of [0, 1]) {
      const msg = validate(s);
      if (msg) {
        setError(msg);
        return goTo(s);
      }
    }
    setSaving(true);
    const payload = { ...a, styles: a.styles.length ? a.styles : ["Please recommend a mix"], contact: lead ?? { firstName: who.firstName.trim(), lastName: "", email: who.email.trim(), phone: who.phone.trim(), plan: "" }, source: "dollhouse-launch-onboarding", submittedAt: new Date().toISOString() };
    if (ONBOARDING_WEBHOOK_URL) {
      try {
        const res = await fetch(ONBOARDING_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error("bad response");
      } catch {
        setSaving(false);
        return setError("We could not save your onboarding form. Please try again.");
      }
    } else {
      // No webhook connected yet: open a pre-filled email so the answers still reach us.
      const body = [
        `Business: ${a.businessName}`,
        `Website: ${a.website || "-"}`,
        `About: ${a.businessDescription}`,
        `Topics to cover: ${a.topicsInclude || "-"}`,
        `Topics to avoid: ${a.topicsExclude || "-"}`,
        `Use my face and photos: ${a.usePhotos}`,
        `Review before publishing: ${a.reviewPosts}`,
        `Main action for my audience: ${a.primaryAction}`,
        `Free resource: ${a.leadMagnet}`,
        `Styles I like: ${payload.styles.join(", ")}`,
        `Look I have in mind: ${a.customStyle || "-"}`,
        `Links I like: ${a.inspirationLinks || "-"}`,
        `Notes: ${a.notes || "-"}`,
        lead ? `Contact: ${lead.firstName} ${lead.lastName}, ${lead.email}` : `Contact: ${who.firstName}, ${who.email}, ${who.phone}`,
      ].join("\n");
      window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Dollhouse Launch onboarding form")}&body=${encodeURIComponent(body)}`;
    }
    store.set(FLOW_KEYS.form, "1");
    window.setTimeout(() => window.location.assign("/setup"), ONBOARDING_WEBHOOK_URL ? 0 : 900);
  };

  const field = (label: string, node: React.ReactNode) => (
    <label className="block" style={labelStyle}>{label}{node}</label>
  );
  const select = (key: "usePhotos" | "reviewPosts" | "primaryAction" | "leadMagnet", opts: string[]) => (
    <select className={input} style={inputStyle} value={a[key]} onChange={(e) => set(key, e.target.value)}>
      <option value="">Select an option</option>
      {opts.map((o) => <option key={o}>{o}</option>)}
    </select>
  );

  return (
    <FlowShell
      current={2}
      footer="Dollhouse Launch · Onboarding · Built for local businesses"
      left={
        <>
          <Pill><ClipboardList className="h-3.5 w-3.5" /> Step 1</Pill>
          <LeftTitle italic="complete your" caps="Onboarding form." sub="Give our team the context we need to build content that sounds like you and supports your growth goals." />
          <ul className="mt-9 grid gap-3">
            {["We match your answers to your order by email", "No social-media passwords are requested", "Your answers go straight to our team", "Next: log in and connect your social pages"].map((t) => (
              <li key={t} className="flex items-start gap-3" style={{ fontFamily: BODY, fontSize: "0.92rem", color: "rgba(31,17,11,0.85)" }}>
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ border: "1.5px solid var(--gold)", color: "var(--gold)" }}><Check className="h-3 w-3" strokeWidth={3} /></span>
                {t}
              </li>
            ))}
          </ul>
          {lead && (
            <div className="mt-9 rounded-2xl px-5 py-4" style={{ background: "rgba(255,255,255,0.72)", border: "1px solid rgba(168,134,74,0.35)" }}>
              <p className="text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE, fontWeight: 700, color: "var(--gold)" }}>Completing as</p>
              <p className="mt-2" style={{ fontFamily: LUXE, fontWeight: 600 }}>{lead.firstName} {lead.lastName}</p>
              <p className="mt-1 break-all" style={{ fontFamily: BODY, fontSize: "0.82rem", color: "rgba(31,17,11,0.6)" }}>{lead.email}</p>
            </div>
          )}
        </>
      }
      right={
        <>
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ background: "var(--ink)", color: "var(--gold)" }}><ClipboardList className="h-6 w-6" /></span>
            <div>
              <p className="text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE, fontWeight: 700, color: "var(--gold-deep)" }}>Part {step + 1} of 3 · About 5 minutes total</p>
              <h2 ref={heading} tabIndex={-1} className="mt-1 outline-none" style={{ fontFamily: DISPLAY, fontWeight: 500, fontSize: "clamp(1.8rem, 3.4vw, 2.3rem)", lineHeight: 1.05 }}>{STEP_TITLES[step]}</h2>
              <p className="mt-1 leading-6" style={{ fontFamily: BODY, fontSize: "0.88rem", color: "rgba(31,17,11,0.62)" }}>
                {step === 2 ? "Choose a look you like, or let us help. Style selections are optional." : "Required questions are marked with an asterisk. Your answers stay here as you move between steps."}
              </p>
            </div>
          </div>

          <ol className="mt-6 grid grid-cols-3 gap-2" aria-label="Form progress">
            {STEP_TITLES.map((t, i) => (
              <li key={t} aria-current={i === step ? "step" : undefined} className="rounded-xl border px-2 py-3 text-center text-[11px] leading-4" style={{ fontFamily: LUXE, fontWeight: 600, borderColor: i === step ? "var(--gold)" : "rgba(31,17,11,0.12)", background: i === step ? "color-mix(in oklab, var(--gold) 20%, white)" : "transparent", color: i > step ? "rgba(31,17,11,0.45)" : "var(--ink)" }}>
                <span className="mb-1 block text-sm">{i < step ? "✓" : i + 1}</span>{t}
              </li>
            ))}
          </ol>

          <form className="mt-6 space-y-5" onSubmit={next} noValidate>
            {step === 0 && (
              <>
                {!lead && (
                  <div className="rounded-2xl p-4" style={{ background: "#fffaf6", border: "1px solid rgba(198,178,130,0.4)" }}>
                    <p className="text-xs leading-5" style={{ fontFamily: BODY, color: "rgba(31,17,11,0.65)" }}>So we can match your answers to your order, tell us who you are. Use the same email you used at checkout.</p>
                    <div className="mt-3 grid gap-4 sm:grid-cols-2">
                      {field("Your first name *", <input className={input} style={inputStyle} value={who.firstName} onChange={(e) => { const w = { ...who, firstName: e.target.value }; setWho(w); store.set(DRAFT_KEY + "-who", JSON.stringify(w)); }} placeholder="First name" autoComplete="given-name" />)}
                      {field("Email used at checkout *", <input className={input} style={inputStyle} type="email" value={who.email} onChange={(e) => { const w = { ...who, email: e.target.value }; setWho(w); store.set(DRAFT_KEY + "-who", JSON.stringify(w)); }} placeholder="you@example.com" autoComplete="email" />)}
                    </div>
                  </div>
                )}
                {field("Business name *", <input className={input} style={inputStyle} value={a.businessName} onChange={(e) => set("businessName", e.target.value)} placeholder="Your business name" />)}
                {field("Website", <input className={input} style={inputStyle} type="url" value={a.website} onChange={(e) => set("website", e.target.value)} placeholder="https://yourbusiness.com" />)}
                {field("Briefly describe your business *", <textarea className={`${input} min-h-[120px] resize-y`} style={inputStyle} value={a.businessDescription} onChange={(e) => set("businessDescription", e.target.value)} placeholder="Services, ideal customers, location, specialties, and what makes you different." />)}
              </>
            )}
            {step === 1 && (
              <>
                <div className="grid gap-5 md:grid-cols-2">
                  {field("Topics you want us to cover", <textarea className={`${input} min-h-[110px] resize-y`} style={inputStyle} value={a.topicsInclude} onChange={(e) => set("topicsInclude", e.target.value)} placeholder="Your services, seasonal offers, common questions..." />)}
                  {field("Topics we should avoid", <textarea className={`${input} min-h-[110px] resize-y`} style={inputStyle} value={a.topicsExclude} onChange={(e) => set("topicsExclude", e.target.value)} placeholder="Anything off-brand, restricted, or outside your scope." />)}
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  {field("May we include your face and photos? *", select("usePhotos", ["Yes", "No", "Ask me first"]))}
                  {field("Review content before publishing? *", select("reviewPosts", ["Yes, send all content for review", "No, publish after onboarding approval", "Review the first content batch only"]))}
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  {field("Primary action for your audience *", select("primaryAction", ["Book an appointment", "Call us", "Complete a quote form", "Send a direct message", "Visit in person"]))}
                  {field("Helpful free resource for your audience *", select("leadMagnet", ["Quote calculator", "Interactive qualification quiz", "Checklist or guide", "Not sure, recommend one"]))}
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <fieldset className="rounded-2xl p-4 sm:p-5" style={{ background: "#fffaf6", border: "1px solid rgba(198,178,130,0.4)" }}>
                  <legend className="px-2" style={{ fontFamily: LUXE, fontWeight: 700, fontSize: "0.95rem" }}>What styles do you like?</legend>
                  <p className="leading-6" style={{ fontFamily: BODY, fontSize: "0.84rem", color: "rgba(31,17,11,0.62)" }}>Choose any examples you like, mix styles, or leave this blank and we will recommend a mix. These are not your only options, and we can work from your own examples too.</p>
                  <p className="mt-2 text-xs" style={{ fontFamily: BODY, color: "var(--gold-deep)", fontWeight: 600 }}>Favorites saved on the homepage are already selected on this browser.</p>
                  <a href="/#examples" target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-xs underline underline-offset-4" style={{ fontFamily: LUXE, fontWeight: 600, color: "var(--rose)" }}>See full-size style examples in a new tab</a>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {STYLES.map((s) => {
                      const on = a.styles.includes(s.name);
                      return (
                        <label key={s.name} className="relative flex cursor-pointer flex-col overflow-hidden rounded-xl border-2 bg-white transition focus-within:ring-4" style={{ borderColor: on ? "var(--gold)" : "rgba(31,17,11,0.12)", boxShadow: on ? "0 10px 24px -14px rgba(120,80,30,0.6)" : "none" }}>
                          <img src={styleImg(s.img)} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover" />
                          <span className="flex items-start gap-2 p-2.5 text-xs leading-5" style={{ fontFamily: LUXE, fontWeight: 600 }}>
                            <input type="checkbox" checked={on} onChange={() => toggleStyle(s.name)} className="mt-0.5 h-4 w-4 shrink-0" style={{ accentColor: "#b0505a" }} />
                            {s.name}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  <p aria-live="polite" className="mt-3 text-xs font-semibold" style={{ fontFamily: BODY, color: "var(--gold-deep)" }}>{a.styles.length ? `${a.styles.length} style${a.styles.length === 1 ? "" : "s"} selected` : "No preference yet? We will help you choose."}</p>
                </fieldset>
                {field("Describe the look you have in mind", <textarea className={`${input} min-h-[90px] resize-y`} style={inputStyle} value={a.customStyle} onChange={(e) => set("customStyle", e.target.value)} placeholder="Colors, mood, fonts, anything that feels like you." />)}
                {field("Links to content you like", <textarea className={`${input} min-h-[80px] resize-y`} style={inputStyle} value={a.inspirationLinks} onChange={(e) => set("inspirationLinks", e.target.value)} placeholder="Instagram posts, accounts or websites you love." />)}
                {field("Anything else we should know?", <textarea className={`${input} min-h-[80px] resize-y`} style={inputStyle} value={a.notes} onChange={(e) => set("notes", e.target.value)} />)}
              </>
            )}

            {error && <p role="alert" className="rounded-xl px-4 py-3 text-sm" style={{ fontFamily: BODY, background: "#fdecec", color: "#9b2c2c" }}>{error}</p>}

            <div className="flex items-center gap-3">
              {step > 0 && (
                <button type="button" onClick={() => goTo(step - 1)} className="inline-flex items-center gap-2 rounded-xl px-5 py-4 text-[11px] uppercase tracking-[0.16em]" style={{ fontFamily: LUXE, fontWeight: 700, border: "1.5px solid var(--ink)" }}>
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              )}
              <button type="submit" disabled={saving} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-4 text-[12px] uppercase tracking-[0.16em] disabled:opacity-60" style={{ fontFamily: LUXE, fontWeight: 700, background: "var(--ink)", color: "var(--cream)", border: "1px solid var(--gold)" }}>
                {saving ? "Saving your answers..." : step === 0 ? "Continue to content preferences" : step === 1 ? "Continue to visual style" : "Submit and finish"}
                {!saving && <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
            <p className="flex items-center justify-center gap-2 text-center text-xs" style={{ fontFamily: BODY, color: "rgba(31,17,11,0.5)" }}>
              <Lock className="h-3 w-3" /> Nothing is submitted until the final step.
            </p>
            <p className="text-center">
              <a href="/setup" className="underline underline-offset-4" style={{ fontFamily: LUXE, fontSize: "0.82rem", fontWeight: 600 }}>Return to checklist</a>
            </p>
          </form>
        </>
      }
    />
  );
}
