import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useState } from "react";
import archMark from "@/assets/arch-mark.svg";
import productBrandKit from "@/assets/product-brand-kit.jpg";
import { usePageMeta } from "@/lib/use-page-meta";

export const Route = createFileRoute("/quiz")({ component: QuizPage });

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";
const FONT_SCRIPT = "'Allura', cursive";
const BRAND_KIT_URL = "/brand-room/brand-kit";
const WORKBOOK_URL = "/brand-room/workbook";
const AI_KIT_URL = "/brand-room/ai-prompt-kit";

type ResultKey = "foundation" | "offer" | "content" | "launch";

function LeadMagnetIcon({ id }: { id: "type" | "mistakes" | "plan" | "offer" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.45, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths = {
    type: (
      <>
        <path {...common} d="M8 3.2h8l4 4v13.6H8z" />
        <path {...common} d="M16 3.2v4h4M11 11.5h6M11 15h7M11 18.5h4" />
      </>
    ),
    mistakes: (
      <>
        <circle {...common} cx="12" cy="12" r="8.6" />
        <path {...common} d="M9.3 9.3l5.4 5.4M14.7 9.3l-5.4 5.4" />
      </>
    ),
    plan: (
      <>
        <rect {...common} x="6" y="4" width="14" height="17" rx="2" />
        <path {...common} d="M10 2.8v4M16 2.8v4M9 10.2h7M9 14h7M9 17.8h4" />
      </>
    ),
    offer: (
      <>
        <path {...common} d="M5 12.3V6.6A2.6 2.6 0 0 1 7.6 4h8.8A2.6 2.6 0 0 1 19 6.6v5.7" />
        <path {...common} d="M4.5 12.4h15l-1.2 7.2H5.7zM9 8h6M10 15.7h4" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden className="mx-auto mb-3 h-8 w-8 text-[var(--gold)]">
      {paths[id]}
    </svg>
  );
}

function ResultTypeSymbol({ result }: { result: ResultKey }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const symbols: Record<ResultKey, ReactNode> = {
    foundation: (
      <>
        <path {...common} d="M5 19h14M7 19V9.8L12 5l5 4.8V19" />
        <path {...common} d="M10 19v-5h4v5M8.6 11.5h.01M15.4 11.5h.01" />
      </>
    ),
    offer: (
      <>
        <path {...common} d="M6 7.5h12v13H6zM8.5 7.5V5.8A2.8 2.8 0 0 1 11.3 3h1.4a2.8 2.8 0 0 1 2.8 2.8v1.7" />
        <path {...common} d="M9.5 12h7M9.5 15h5" />
      </>
    ),
    content: (
      <>
        <rect {...common} x="5" y="5" width="14" height="14" rx="3" />
        <path {...common} d="M8.5 10h7M8.5 13h5M8.5 16h6.5M16 5l2.2-2.2" />
      </>
    ),
    launch: (
      <>
        <path {...common} d="M12 3.5c3.2 1.5 5.2 4.1 5.9 7.8l-4 1.2-2.4 2.4-1.2 4c-3.7-.7-6.3-2.7-7.8-5.9l4-1.2 2.4-2.4z" />
        <path {...common} d="M13.8 7.2h.01M6.7 16.7l-2.5 2.5M8.8 18.8l-1 2.2M5.2 14.6l-2.2 1" />
      </>
    ),
  };

  return (
    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: "rgba(200,168,100,0.12)", border: "1px solid rgba(200,168,100,0.28)", color: "var(--gold)" }}>
      <svg viewBox="0 0 24 24" aria-hidden className="h-9 w-9">
        {symbols[result]}
      </svg>
    </div>
  );
}

const QUESTIONS: {
  q: string;
  helper: string;
  options: { label: string; type: ResultKey }[];
}[] = [
  {
    q: "Where are you getting stuck with your brand?",
    helper: "Choose the answer that sounds most like what happens when you sit down to build.",
    options: [
      { label: "I have ideas everywhere, but no clear foundation or direction.", type: "foundation" },
      { label: "I am not sure what to sell, how to price it, or how to package it.", type: "offer" },
      { label: "I want to post, but I never know what to say or what content matters.", type: "content" },
      { label: "I am ready to launch, but I need a clear plan before I move.", type: "launch" },
    ],
  },
  {
    q: "What would make you feel more confident this month?",
    helper: "This helps us match you to the room inside The Dollhouse you need first.",
    options: [
      { label: "A guided roadmap that tells me what to decide first, second, and third.", type: "foundation" },
      { label: "A stronger offer, audience, and pricing plan before I start promoting.", type: "offer" },
      { label: "Content pillars, prompts, and visibility ideas I can actually follow.", type: "content" },
      { label: "A launch checklist so I can stop preparing forever and finally sell.", type: "launch" },
    ],
  },
  {
    q: "What have you already tried?",
    helper: "Be honest. The quiz works best when you do not answer like the polished version of yourself.",
    options: [
      { label: "Saved random advice, templates, and TikToks, but never turned it into a system.", type: "foundation" },
      { label: "Changed my offer more than once because I was not sure what people would buy.", type: "offer" },
      { label: "Posted inconsistently, then felt discouraged when it did not lead to sales.", type: "content" },
      { label: "Planned a launch in my head, but did not have the steps organized.", type: "launch" },
    ],
  },
  {
    q: "If you had one private strategy suite, what would you want it to do?",
    helper: "Pick the outcome that would create the most relief.",
    options: [
      { label: "Organize my vision, brand identity, audience, and business direction in one place.", type: "foundation" },
      { label: "Help me create offers, products, pricing, and a brand people understand.", type: "offer" },
      { label: "Give me prompts, content planning, and visibility strategy without overwhelm.", type: "content" },
      { label: "Turn my brand, content, and product plan into a real launch roadmap.", type: "launch" },
    ],
  },
];

const RESULTS: Record<ResultKey, {
  type: string;
  tagline: string;
  body: string;
  rooms: string[];
  blocker: string;
  mistakes: string[];
  plan: string[];
  recommendation: string;
}> = {
  foundation: {
    type: "The Brand Foundation Builder",
    tagline: "You do not need more random advice. You need one clear place to build from.",
    body: "Your next move is to organize the vision, voice, audience, and identity before you keep posting. The Private Strategy Suite gives you 17 guided rooms so your brand stops living in notes, screenshots, and half-finished ideas.",
    rooms: ["Brand Foundation", "Audience Clarity", "Brand Messaging", "Website & Brand Checklist"],
    blocker: "Your ideas are not the problem. The missing piece is order: what your brand stands for, who it helps, and what decision comes first.",
    mistakes: ["Collecting advice instead of choosing a direction", "Trying to design before the message is clear", "Starting content before the brand foundation is written down"],
    plan: ["Write your one-sentence brand promise.", "Choose the audience you want to help first.", "List the top 3 problems your brand solves.", "Pick 3 words your brand should feel like.", "Choose your core colors, fonts, and mood direction.", "Write your short about section.", "Decide which room you need to build next."],
    recommendation: "Start with the Brand Kit Blueprint, then use the Workbook to organize your audience, offer, and next steps.",
  },
  offer: {
    type: "The Offer Architect",
    tagline: "Your brand can look beautiful, but it still needs something clear to sell.",
    body: "You are close, but your offer, product plan, and pricing need structure. The Dollhouse walks you through the decisions that make your brand easier to understand, trust, and buy from.",
    rooms: ["Offer & Product Planning", "Pricing Guidance", "Audience Clarity", "Goal Tracking"],
    blocker: "People cannot buy confidently if the offer feels unclear. Your next move is to make the promise, price, and transformation easy to understand.",
    mistakes: ["Changing your offer before testing one clear version", "Pricing from fear instead of value", "Explaining the features but not the outcome"],
    plan: ["Name your main offer in plain language.", "Write who it is for and who it is not for.", "List what is included.", "Write the before and after transformation.", "Choose one price or price range to test.", "Write 3 reasons someone would want it now.", "Create one simple sales post for the offer."],
    recommendation: "Start with the Workbook if your offer still feels messy, then use the Brand Kit Blueprint to make it look polished.",
  },
  content: {
    type: "The Visibility Planner",
    tagline: "You need content that follows a strategy, not content that depends on your mood.",
    body: "Your brand needs a repeatable content direction. The Private Strategy Suite helps you plan what to say, what to promote, and how to show up with more confidence before you burn out from guessing.",
    rooms: ["Content Planning", "Marketing Strategy", "Social & Visibility Planning", "Guided Prompts"],
    blocker: "You are not out of ideas. You are missing a repeatable content system that tells you what to post and why it matters.",
    mistakes: ["Posting random content that does not point to an offer", "Waiting to feel inspired before showing up", "Using prompts without matching them to your brand voice"],
    plan: ["Choose 3 content pillars.", "Write 5 hooks for your audience's biggest problem.", "Create one proof or story post.", "Create one educational post.", "Create one offer post.", "Batch 3 captions from the same idea.", "Pick your next 7 posts before opening the app."],
    recommendation: "Start with the AI Prompt Kit if content is the bottleneck. Add the Brand Kit Blueprint if your visuals and voice still feel inconsistent.",
  },
  launch: {
    type: "The Launch Builder",
    tagline: "You are ready to move, but your launch needs a clean roadmap.",
    body: "You need the steps in order: offer, content, messaging, launch plan, and goals. The Dollhouse gives you the private web app structure to build, save, export, and keep moving.",
    rooms: ["Launch Roadmap", "Goal Tracking", "Export & Save Features", "Future Updates"],
    blocker: "You are close to launching, but the steps need to be placed in order so you stop preparing forever and start selling.",
    mistakes: ["Waiting until everything is perfect", "Launching without a simple sales message", "Skipping the follow-up plan after people show interest"],
    plan: ["Choose the exact thing you are launching.", "Write your launch goal.", "Pick your launch date or soft launch week.", "Write your simple sales message.", "Plan 3 pre-launch posts.", "Plan 2 launch posts.", "Write the follow-up message for people who show interest."],
    recommendation: "Start with the full Brand Room path so your offer, content, and launch roadmap stay connected.",
  },
};

function getResultType(answers: ResultKey[]): ResultKey {
  const counts: Record<ResultKey, number> = { foundation: 0, offer: 0, content: 0, launch: 0 };
  answers.forEach((answer) => {
    counts[answer]++;
  });
  return (Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as ResultKey) || "foundation";
}

function BrandMark() {
  return (
    <Link to="/" className="flex flex-col items-start leading-tight no-underline">
      <span style={{ fontFamily: FONT_SCRIPT, fontSize: "18px", letterSpacing: "1px", textTransform: "lowercase", lineHeight: 1, color: "color-mix(in oklab, var(--ink) 55%, transparent)" }}>the</span>
      <span style={{ fontFamily: FONT_DISPLAY, fontSize: "15px", letterSpacing: "4px", textTransform: "uppercase", marginTop: "-4px", color: "var(--ink)", fontStyle: "italic" }}>Dollhouse</span>
      <span style={{ fontFamily: FONT_LUXE, fontSize: "6.5px", letterSpacing: "3px", textTransform: "uppercase", marginTop: "1px", color: "var(--gold)", fontWeight: 600 }}>Brand Studio</span>
    </Link>
  );
}

function SuiteMockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-[rgba(255,250,246,0.72)] p-6 shadow-[0_35px_80px_-42px_rgba(90,45,35,0.55)]">
      <div aria-hidden className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[rgba(201,122,122,0.16)] blur-3xl" />
      <div aria-hidden className="absolute -right-16 bottom-8 h-44 w-44 rounded-full bg-[rgba(200,168,100,0.13)] blur-3xl" />
      <div className="relative text-center">
        <img src={archMark} alt="" className="mx-auto h-14 w-10 opacity-60" />
        <p className="mt-5 text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>Private Strategy Suite</p>
        <p className="mt-2 italic text-[var(--gold)] leading-none" style={{ fontFamily: FONT_SCRIPT, fontSize: compact ? "2rem" : "2.6rem" }}>the</p>
        <h2 className="mt-1 text-[var(--rose)] leading-[0.92]" style={{ fontFamily: FONT_DISPLAY, fontSize: compact ? "3rem" : "clamp(3.6rem, 7vw, 6rem)", fontWeight: 400, letterSpacing: "0.04em", textTransform: "uppercase" }}>
          Dollhouse
        </h2>
        <p className="mx-auto mt-5 max-w-md text-[var(--ink)]/68 leading-7" style={{ fontFamily: FONT_BODY, fontSize: compact ? "0.9rem" : "1rem" }}>
          Your complete brand strategy, product plan, and launch roadmap built inside a private web app.
        </p>
      </div>

      <div className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {["17 guided rooms", "Custom strategy", "Save & export", "Private access"].map((item) => (
          <div key={item} className="rounded-2xl px-3 py-4 text-center" style={{ background: "rgba(255,255,255,0.58)", border: "1px solid rgba(200,168,100,0.22)" }}>
            <img src={archMark} alt="" className="mx-auto mb-2 h-7 w-5 opacity-45" />
            <p className="text-[8px] tracking-[0.14em] uppercase text-[var(--ink)]/58" style={{ fontFamily: FONT_LUXE }}>{item}</p>
          </div>
        ))}
      </div>

      {!compact && (
        <>
          <div className="relative mt-8 overflow-hidden rounded-[24px] bg-[rgba(255,255,255,0.62)] p-3" style={{ border: "1px solid rgba(200,168,100,0.2)", boxShadow: "0 28px 70px -44px rgba(90,45,35,0.55)" }}>
            <img
              src={productBrandKit}
              alt="The Dollhouse Brand Kit product preview"
              className="aspect-[4/3] w-full rounded-[19px] object-cover"
              style={{ objectPosition: "center", filter: "saturate(0.96) contrast(1.02)" }}
            />
            <div className="absolute inset-x-6 bottom-6 rounded-2xl px-4 py-3 text-center" style={{ background: "rgba(255,250,246,0.82)", border: "1px solid rgba(200,168,100,0.24)", backdropFilter: "blur(10px)" }}>
              <p className="text-[var(--gold)] tracking-[0.18em] uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "8px" }}>Instant on-screen roadmap</p>
              <p className="mt-1 italic text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.25rem", lineHeight: 1.1 }}>Quiz → Plan → Product Match</p>
            </div>
          </div>
          <p className="relative mt-6 text-center tracking-[0.16em] uppercase text-[var(--ink)]/55" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>
            Stop guessing. Start building.
          </p>
        </>
      )}
    </div>
  );
}

function QuizPage() {
  usePageMeta(
    "Free Brand Readiness Quiz + 7-Day Brand Fix Plan | The Dollhouse Brand Studio",
    "Take The Dollhouse quiz to get your brand type, what is blocking you, and a personalized 7-day plan for your next brand steps.",
  );

  const [phase, setPhase] = useState<"intro" | "q" | "email" | "result">("intro");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<ResultKey[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ResultKey>("foundation");

  function pickAnswer(type: ResultKey) {
    const next = [...answers, type];
    setAnswers(next);
    if (qIndex < QUESTIONS.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      setPhase("email");
    }
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const nextResult = getResultType(answers);
    setResult(nextResult);
    try {
      await fetch("https://formspree.io/f/mwvrvrzj", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone,
          business,
          source: "Private Strategy Suite Quiz",
          quiz_result: RESULTS[nextResult].type,
          quiz_blocker: RESULTS[nextResult].blocker,
          quiz_7_day_plan: RESULTS[nextResult].plan.map((step, index) => `Day ${index + 1}: ${step}`).join(" | "),
          quiz_recommendation: "The Dollhouse Private Strategy Suite",
          offer: "$97 Brand Kit",
          product_url: BRAND_KIT_URL,
          workbook_url: WORKBOOK_URL,
          ai_kit_url: AI_KIT_URL,
        }),
        headers: { Accept: "application/json", "Content-Type": "application/json" },
      });
    } catch (_) {}
    setSubmitting(false);
    setPhase("result");
  }

  function restart() {
    setPhase("intro");
    setQIndex(0);
    setAnswers([]);
    setName("");
    setEmail("");
    setPhone("");
    setBusiness("");
    setResult("foundation");
  }

  const progressPct = phase === "q" ? ((qIndex + 1) / QUESTIONS.length) * 76 : phase === "email" ? 92 : 100;
  const current = QUESTIONS[qIndex];
  const res = RESULTS[result];

  return (
    <main className="min-h-screen bg-[var(--blush)] text-[var(--ink)] flex flex-col">
      <nav className="py-5 px-6 md:px-12 flex items-center justify-between border-b border-[var(--gold)]/12 bg-[rgba(255,250,246,0.58)] backdrop-blur-md">
        <BrandMark />
        <div className="hidden md:flex items-center gap-8" style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(30,15,10,0.52)" }}>
          <Link to="/brand-room" className="hover:text-[var(--rose)] transition-colors">Brand Room</Link>
          <a href={BRAND_KIT_URL} className="hover:text-[var(--rose)] transition-colors">Brand Kit</a>
        </div>
        <a href={BRAND_KIT_URL} className="rounded-full px-4 py-2.5 bg-[var(--ink)] text-[var(--cream)] text-[10px] tracking-[0.16em] uppercase" style={{ fontFamily: FONT_LUXE }}>
          View Brand Kit
        </a>
      </nav>

      {(phase === "q" || phase === "email") && (
        <div className="h-1 bg-[rgba(200,168,100,0.12)]">
          <div className="h-full transition-all duration-500" style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, var(--rose), var(--gold))" }} />
        </div>
      )}

      <div className="relative flex-1 px-5 py-10 md:py-14 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-45" style={{ background: "radial-gradient(ellipse at 50% 10%, rgba(255,255,255,0.92), transparent 58%), linear-gradient(135deg, #f4dcdc 0%, #fbf1ed 48%, #ead0c9 100%)" }} />

        {phase === "intro" && (
          <section className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/45 bg-white/45 px-5 py-2 text-[var(--gold)]">
                <span style={{ fontSize: "0.55rem" }}>✦</span>
                <span className="text-[10px] tracking-luxe uppercase font-semibold" style={{ fontFamily: FONT_LUXE }}>Free Brand Readiness Quiz + 7-Day Plan</span>
                <span style={{ fontSize: "0.55rem" }}>✦</span>
              </div>
              <p className="mt-7 text-[var(--gold)] italic leading-none" style={{ fontFamily: FONT_SCRIPT, fontSize: "clamp(2.5rem, 5vw, 3.6rem)" }}>the</p>
              <h1 className="mt-1 text-[var(--rose)] leading-[0.92]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(3.2rem, 8vw, 6.8rem)", fontWeight: 400, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Dollhouse
              </h1>
              <p className="mt-5 max-w-xl mx-auto lg:mx-0 text-[var(--ink)]/72 leading-8" style={{ fontFamily: FONT_BODY, fontSize: "clamp(1rem, 1.7vw, 1.16rem)" }}>
                Find out what your brand needs first, what is blocking you, and exactly what to fix over the next 7 days. Then get matched to the digital product or managed marketing path that makes the most sense.
              </p>
              <div className="mt-8 grid max-w-xl mx-auto lg:mx-0 grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Brand type", icon: "type" as const },
                  { label: "3 mistakes", icon: "mistakes" as const },
                  { label: "7-day fix plan", icon: "plan" as const },
                  { label: "Next best offer", icon: "offer" as const },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl px-3 py-4 text-center" style={{ background: "rgba(255,250,246,0.62)", border: "1px solid rgba(200,168,100,0.24)" }}>
                    <LeadMagnetIcon id={item.icon} />
                    <p className="text-[9px] tracking-[0.14em] uppercase text-[var(--ink)]/58" style={{ fontFamily: FONT_LUXE }}>{item.label}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setPhase("q")} className="mt-9 rounded-full px-10 py-4 transition-all hover:-translate-y-0.5" style={{ backgroundColor: "var(--ink)", color: "var(--cream)", fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", boxShadow: "0 18px 38px -16px rgba(30,15,10,0.55)" }}>
                Take the quiz →
              </button>
              <p className="mt-4 text-[var(--ink)]/38 tracking-[0.14em] uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>
                Less than 60 seconds · Your plan shows instantly on this page
              </p>
            </div>

            <SuiteMockup />
          </section>
        )}

        {phase === "q" && (
          <section className="relative mx-auto max-w-3xl">
            <div className="rounded-[32px] border border-[var(--gold)]/24 bg-[rgba(255,250,246,0.72)] p-7 shadow-[0_30px_70px_-48px_rgba(90,45,35,0.5)] md:p-10">
              <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>Question {qIndex + 1} of {QUESTIONS.length}</p>
              <h2 className="mt-4 text-[var(--rose)] leading-tight" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.1rem, 5vw, 3.5rem)", fontWeight: 400 }}>
                {current.q}
              </h2>
              <p className="mt-3 text-[var(--ink)]/55 leading-7" style={{ fontFamily: FONT_BODY }}>{current.helper}</p>
              <div className="mt-8 grid gap-3">
                {current.options.map((opt, idx) => (
                  <button key={opt.label} onClick={() => pickAnswer(opt.type)} className="group w-full rounded-2xl px-5 py-5 text-left transition-all hover:-translate-y-0.5" style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.86), rgba(251,240,235,0.72))", border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)", boxShadow: "0 4px 16px -10px rgba(160,110,95,0.22)" }}>
                    <span className="flex items-start gap-4">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(200,168,100,0.12)] text-[var(--gold)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.05rem", fontStyle: "italic" }}>{idx + 1}</span>
                      <span style={{ fontFamily: FONT_DISPLAY, fontSize: "1.22rem", color: "var(--ink)", lineHeight: 1.35 }}>{opt.label}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {phase === "email" && (
          <section className="relative mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="hidden lg:block">
              <SuiteMockup compact />
            </div>
            <div className="rounded-[32px] border border-[var(--gold)]/24 bg-[rgba(255,250,246,0.78)] p-7 md:p-10">
              <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>Your result is ready</p>
              <h2 className="mt-4 text-[var(--rose)] leading-tight" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.2rem, 5vw, 3.4rem)", fontWeight: 400 }}>
                Unlock your instant brand plan.
              </h2>
              <p className="mt-3 text-[var(--ink)]/56 leading-7" style={{ fontFamily: FONT_BODY }}>
                Enter your email to see your brand type, mistake pattern, personalized 7-day Brand Fix Plan, and right next step on this page.
              </p>
              <form onSubmit={submitEmail} className="mt-7 grid gap-3">
                <input required placeholder="Your first name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl px-5 py-3.5 focus:outline-none" style={{ fontFamily: FONT_BODY, background: "rgba(255,255,255,0.86)", border: "1px solid color-mix(in oklab, var(--gold) 35%, transparent)" }} />
                <input required type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl px-5 py-3.5 focus:outline-none" style={{ fontFamily: FONT_BODY, background: "rgba(255,255,255,0.86)", border: "1px solid color-mix(in oklab, var(--gold) 35%, transparent)" }} />
                <input placeholder="What kind of brand are you building?" value={business} onChange={(e) => setBusiness(e.target.value)} className="rounded-xl px-5 py-3.5 focus:outline-none" style={{ fontFamily: FONT_BODY, background: "rgba(255,255,255,0.86)", border: "1px solid color-mix(in oklab, var(--gold) 35%, transparent)" }} />
                <input type="tel" placeholder="Phone number (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-xl px-5 py-3.5 focus:outline-none" style={{ fontFamily: FONT_BODY, background: "rgba(255,255,255,0.86)", border: "1px solid color-mix(in oklab, var(--gold) 35%, transparent)" }} />
                <button disabled={submitting} className="mt-2 rounded-full px-6 py-4 transition-all hover:-translate-y-0.5 disabled:opacity-60" style={{ background: "var(--gold)", color: "var(--ink)", fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}>
                  {submitting ? "Preparing your result..." : "Show my brand plan →"}
                </button>
                <p className="text-center text-[rgba(30,15,10,0.36)] tracking-[0.12em] uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "9px" }}>No spam · Brand plan plus best next step</p>
              </form>
            </div>
          </section>
        )}

        {phase === "result" && (
          <section className="relative mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-[rgba(255,250,246,0.76)] p-5 shadow-[0_35px_80px_-42px_rgba(90,45,35,0.55)]">
              <img
                src={productBrandKit}
                alt="The Dollhouse Brand Kit product preview"
                className="aspect-[4/5] w-full rounded-[24px] object-cover"
                style={{ objectPosition: "center", filter: "saturate(0.95) contrast(1.02)" }}
              />
              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  { label: "Brand type", icon: "type" as const },
                  { label: "Fix plan", icon: "plan" as const },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl px-4 py-4 text-center" style={{ background: "rgba(255,255,255,0.56)", border: "1px solid rgba(200,168,100,0.22)" }}>
                    <LeadMagnetIcon id={item.icon} />
                    <p className="text-[8px] tracking-[0.14em] uppercase text-[var(--ink)]/55" style={{ fontFamily: FONT_LUXE }}>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[32px] bg-[var(--ink)] p-7 text-[var(--cream)] shadow-[0_40px_80px_-28px_rgba(30,15,10,0.58)] md:p-10">
              <ResultTypeSymbol result={result} />
              <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>Your Brand Type</p>
              <h2 className="mt-3 text-[var(--cream)] leading-tight" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: 400 }}>
                {res.type}
              </h2>
              <p className="mt-3 italic text-[var(--gold)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.28rem", lineHeight: 1.45 }}>{res.tagline}</p>
              <p className="mt-5 text-[rgba(250,243,234,0.72)] leading-7" style={{ fontFamily: FONT_BODY }}>{res.body}</p>

              <div className="mt-7 rounded-2xl border border-[rgba(200,168,100,0.24)] bg-[rgba(255,255,255,0.06)] p-5">
                <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>What is blocking you</p>
                <p className="mt-3 text-[rgba(250,243,234,0.76)] leading-7" style={{ fontFamily: FONT_BODY }}>
                  {res.blocker}
                </p>
              </div>

              <div className="mt-4 rounded-2xl border border-[rgba(201,122,122,0.24)] bg-[rgba(201,122,122,0.1)] p-5">
                <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>3 mistakes to stop making</p>
                <div className="mt-4 grid gap-2">
                  {res.mistakes.map((mistake, index) => (
                    <div key={mistake} className="flex gap-3 rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold" style={{ background: "rgba(201,122,122,0.16)", color: "var(--gold)", fontFamily: FONT_LUXE }}>
                        {index + 1}
                      </span>
                      <p className="m-0 text-[rgba(250,243,234,0.76)] leading-6" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem" }}>
                        {mistake}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-[rgba(200,168,100,0.26)] bg-[rgba(200,168,100,0.1)] p-5">
                <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>Your 7-day brand fix plan</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {res.plan.map((step, index) => (
                    <div key={step} className="rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <p className="text-[var(--gold)] tracking-[0.14em] uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "8px" }}>Day {index + 1}</p>
                      <p className="mt-1 text-[rgba(250,243,234,0.82)] leading-6" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem" }}>
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-[rgba(200,168,100,0.24)] bg-[rgba(255,255,255,0.06)] p-5">
                <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>Recommended starting rooms</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {res.rooms.map((room) => (
                    <div key={room} className="rounded-xl px-4 py-3 text-[rgba(250,243,234,0.82)]" style={{ fontFamily: FONT_BODY, background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      {room}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-4 rounded-2xl bg-[rgba(200,168,100,0.12)] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>Private Strategy Suite</p>
                  <p className="mt-1" style={{ fontFamily: FONT_DISPLAY, fontSize: "2.2rem", fontStyle: "italic", color: "var(--gold)", lineHeight: 1 }}>$97 <span className="text-[rgba(250,243,234,0.34)] line-through" style={{ fontFamily: FONT_BODY, fontSize: "1rem", fontStyle: "normal" }}>$145</span></p>
                  <p className="mt-2 max-w-md text-[rgba(250,243,234,0.66)] leading-6" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem" }}>
                    {res.recommendation}
                  </p>
                </div>
                <a href={BRAND_KIT_URL} className="rounded-full px-7 py-4 text-center transition-all hover:-translate-y-0.5" style={{ background: "var(--gold)", color: "var(--ink)", fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}>
                  View the Brand Kit →
                </a>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <a href={WORKBOOK_URL} className="rounded-2xl px-5 py-4 transition-all hover:-translate-y-0.5" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(200,168,100,0.2)", color: "rgba(250,243,234,0.82)" }}>
                  <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "9px" }}>Need the workbook?</p>
                  <p className="mt-1 italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem" }}>Open Brand Workbook →</p>
                </a>
                <a href={AI_KIT_URL} className="rounded-2xl px-5 py-4 transition-all hover:-translate-y-0.5" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(200,168,100,0.2)", color: "rgba(250,243,234,0.82)" }}>
                  <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "9px" }}>Need content prompts?</p>
                  <p className="mt-1 italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem" }}>Open AI Prompt Kit →</p>
                </a>
              </div>

              <div className="mt-4 rounded-2xl p-5" style={{ background: "rgba(201,122,122,0.12)", border: "1px solid rgba(201,122,122,0.26)" }}>
                <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>Already have a business?</p>
                <p className="mt-2 text-[rgba(250,243,234,0.72)] leading-7" style={{ fontFamily: FONT_BODY }}>
                  If your offer is live, or once you finish the Brand Kit, the next step is our managed marketing service: content, AI clone videos, automations, and lead follow-up handled for you.
                </p>
                <Link to="/#contact" className="mt-4 inline-flex rounded-full px-6 py-3 transition-all hover:-translate-y-0.5" style={{ background: "var(--cream)", color: "var(--ink)", fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  Apply for marketing support →
                </Link>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 text-[rgba(250,243,234,0.48)]" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                <span>17 guided rooms</span>
                <span>·</span>
                <span>Save & export</span>
                <span>·</span>
                <span>All sales final</span>
              </div>

              <button onClick={restart} className="mt-8 text-[rgba(250,243,234,0.36)] hover:text-[var(--gold)] transition-colors" style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                Retake the quiz
              </button>
            </div>
          </section>
        )}
      </div>

      <footer className="border-t border-[var(--gold)]/10 px-6 py-8 text-center bg-[rgba(255,250,246,0.42)]">
        <p style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "rgba(30,15,10,0.34)" }}>
          © {new Date().getFullYear()} The Dollhouse Brand Studio · Private Strategy Suite
        </p>
      </footer>
    </main>
  );
}
