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

function SuiteFeatureIcon({ id }: { id: "rooms" | "strategy" | "export" | "access" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.45, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const symbols: Record<"rooms" | "strategy" | "export" | "access", ReactNode> = {
    rooms: (
      <>
        <path {...common} d="M5 19V7.5L12 4l7 3.5V19" />
        <path {...common} d="M9 19v-6.2h6V19M8.5 9.5h.01M12 9.5h.01M15.5 9.5h.01" />
      </>
    ),
    strategy: (
      <>
        <path {...common} d="M4.5 17.5c3.4-5.8 7.3-8.9 11.8-9.4" />
        <path {...common} d="M13.5 5.6h4.8v4.8M6 18.5h12M6.8 13.2l2.1 2.1M10.8 9.7l2 2" />
      </>
    ),
    export: (
      <>
        <path {...common} d="M12 4v10.4M8.5 10.8 12 14.4l3.5-3.6" />
        <path {...common} d="M5.5 15.5v3.2A1.8 1.8 0 0 0 7.3 20.5h9.4a1.8 1.8 0 0 0 1.8-1.8v-3.2" />
      </>
    ),
    access: (
      <>
        <rect {...common} x="6.2" y="10.2" width="11.6" height="9.5" rx="2" />
        <path {...common} d="M8.8 10.2V8a3.2 3.2 0 0 1 6.4 0v2.2M12 14.1v2.2" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden className="mx-auto mb-2 h-7 w-7 text-[var(--gold)] opacity-80">
      {symbols[id]}
    </svg>
  );
}

const QUESTIONS: {
  q: string;
  helper: string;
  options: { label: string; type: ResultKey }[];
}[] = [
  {
    q: "When you sit down to work on your brand, what usually happens?",
    helper: "Pick the one that's most honest — not the polished version.",
    options: [
      { label: "I open Canva, hate everything I make, and close my laptop.", type: "foundation" },
      { label: "I write out a new idea for what to sell — then talk myself out of it.", type: "offer" },
      { label: "I scroll for inspiration and never actually post anything.", type: "content" },
      { label: "I add more things to my launch checklist. The list keeps growing.", type: "launch" },
    ],
  },
  {
    q: "Which of these sounds like something you've actually said to yourself?",
    helper: "Choose the one that hits a little too close.",
    options: [
      { label: "\"I want to look more professional but I don't know where to start.\"", type: "foundation" },
      { label: "\"I don't know how to explain what I do in a way that makes people want it.\"", type: "offer" },
      { label: "\"I know I need to show up more — but I always run out of things to say.\"", type: "content" },
      { label: "\"I've been almost ready to launch for months now.\"", type: "launch" },
    ],
  },
  {
    q: "What feels most unfinished about your brand right now?",
    helper: "Be honest — this is where your clearest next step comes from.",
    options: [
      { label: "My visuals. I don't have a consistent look, colour palette, or vibe I love.", type: "foundation" },
      { label: "My offer. I'm not fully sure what I'm selling, who it's for, or what to charge.", type: "offer" },
      { label: "My content. I have no system. I post when I feel like it and disappear when I don't.", type: "content" },
      { label: "My plan. Everything is in my head. I just can't seem to make it real.", type: "launch" },
    ],
  },
  {
    q: "If your brand was exactly where you wanted it to be, what would that look like?",
    helper: "Pick the outcome that would feel the best to finally have.",
    options: [
      { label: "People would recognize my brand instantly. My aesthetic would feel like me.", type: "foundation" },
      { label: "I'd have one clear offer that people immediately understood — and wanted to buy.", type: "offer" },
      { label: "I'd have content ideas ready, and people would actually stop and read what I post.", type: "content" },
      { label: "I'd have a launch date on the calendar and a step-by-step plan to hit it.", type: "launch" },
    ],
  },
];

const RESULTS: Record<ResultKey, {
  type: string;
  tagline: string;
  body: string;
  diagnosis: string;
  focus: string;
  quickWins: string[];
  productName: string;
  price: string;
  ctaLabel: string;
  ctaUrl: string;
}> = {
  foundation: {
    type: "The Brand Foundation Builder",
    tagline: "Your vibe is there. It just needs a home.",
    body: "You know what you like. You have an aesthetic — somewhere in your head, your saved folders, your Pinterest board. But your brand doesn't look like you yet. And when things don't look consistent, people scroll past. Not because your offer is bad. Because their brain can't process what you do fast enough to stop. The Brand Kit Blueprint walks you through your colours, fonts, visual identity, and brand direction from scratch. One purchase. One place. A brand that finally looks as good on the outside as it feels on the inside.",
    diagnosis: "Your audience may not understand your brand fast enough yet.",
    focus: "Build the visual foundation before you try to sell harder.",
    quickWins: ["Choose your colour story", "Lock in your font direction", "Create one clear brand look"],
    productName: "The Brand Kit Blueprint",
    price: "$97",
    ctaLabel: "Get the Brand Kit — $97 →",
    ctaUrl: BRAND_KIT_URL,
  },
  offer: {
    type: "The Offer Architect",
    tagline: "You're not confused. You just haven't written it down yet.",
    body: "You have something real to offer. You know it. But when someone asks what you do, the words come out wrong. The price doesn't feel right. The audience feels fuzzy. That's not a talent problem. That's a clarity problem — and it's fixable. The Brand Workbook walks you through your audience, your offer, your messaging, and your content plan in one place. So your brand stops being a beautiful secret and starts making sales.",
    diagnosis: "Your offer needs clearer words, clearer pricing, and a clearer buyer.",
    focus: "Turn the idea in your head into a simple offer people can understand.",
    quickWins: ["Name who it is for", "Write the promise in plain English", "Map what they buy next"],
    productName: "The Brand Workbook",
    price: "$47",
    ctaLabel: "Get the Brand Workbook — $47 →",
    ctaUrl: WORKBOOK_URL,
  },
  content: {
    type: "The Visibility Planner",
    tagline: "You have more to say than you think.",
    body: "You're not out of ideas. You're out of a system. The blank caption box is killing your momentum because you're starting from nothing every single time. That's not a creativity problem. That's a process problem. The AI Prompt Kit gives you 200+ prompts written specifically for women building brands online. Stop waiting to feel inspired. Start posting with a plan that actually points to something.",
    diagnosis: "Your content problem is not a lack of ideas. It is a lack of repeatable prompts.",
    focus: "Create a content system so every post points back to the offer.",
    quickWins: ["Pick your content pillars", "Use hooks that start conversations", "Turn one idea into multiple posts"],
    productName: "The AI Prompt Kit",
    price: "$17",
    ctaLabel: "Get the AI Prompt Kit — $17 →",
    ctaUrl: AI_KIT_URL,
  },
  launch: {
    type: "The Ready-to-Launch",
    tagline: "You're not behind. You're one clear plan away.",
    body: "You have the idea. You have the drive. What you're missing is a private space where your brand, offer, content, and launch steps all live together — so you can stop holding it in your head and start moving. The Dollhouse Brand Room is a private strategy suite with 17 guided rooms built for women who are ready to stop preparing forever and start selling for real.",
    diagnosis: "You are carrying too many loose pieces instead of following one clean roadmap.",
    focus: "Organize your brand, offer, content, and launch steps in one place.",
    quickWins: ["Choose the first room to complete", "Set your launch direction", "Stop rebuilding the plan every week"],
    productName: "The Dollhouse Brand Room",
    price: "$97",
    ctaLabel: "Enter the Brand Room →",
    ctaUrl: "/brand-room",
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
  const features: { label: string; icon: "rooms" | "strategy" | "export" | "access" }[] = [
    { label: "17 guided rooms", icon: "rooms" },
    { label: "Custom strategy", icon: "strategy" },
    { label: "Save & export", icon: "export" },
    { label: "Private access", icon: "access" },
  ];

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-[rgba(255,250,246,0.72)] p-6 shadow-[0_35px_80px_-42px_rgba(90,45,35,0.55)]">
      <div aria-hidden className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-[rgba(201,122,122,0.16)] blur-3xl" />
      <div aria-hidden className="absolute -right-16 bottom-8 h-44 w-44 rounded-full bg-[rgba(200,168,100,0.13)] blur-3xl" />
      <div className="relative text-center">
        <img src={archMark} alt="" className="mx-auto h-12 w-9 opacity-55" />
        <p className="mt-4 text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "9px" }}>Private Strategy Suite</p>
        <p className="mt-2 italic text-[var(--gold)] leading-none" style={{ fontFamily: FONT_SCRIPT, fontSize: compact ? "1.85rem" : "2.25rem" }}>the</p>
        <h2 className="mx-auto mt-1 max-w-[92%] text-[var(--rose)] leading-[0.92]" style={{ fontFamily: FONT_DISPLAY, fontSize: compact ? "2.45rem" : "clamp(2.8rem, 5.6vw, 4.7rem)", fontWeight: 400, letterSpacing: "0.04em", textTransform: "uppercase" }}>
          Dollhouse
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[var(--ink)]/68 leading-7" style={{ fontFamily: FONT_BODY, fontSize: compact ? "0.9rem" : "1rem" }}>
          Your complete brand strategy, product plan, and launch roadmap built inside a private web app.
        </p>
      </div>

      <div className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {features.map((item) => (
          <div key={item.label} className="rounded-2xl px-3 py-4 text-center" style={{ background: "rgba(255,255,255,0.58)", border: "1px solid rgba(200,168,100,0.22)" }}>
            <SuiteFeatureIcon id={item.icon} />
            <p className="text-[8px] tracking-[0.14em] uppercase text-[var(--ink)]/58" style={{ fontFamily: FONT_LUXE }}>{item.label}</p>
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

  function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const nextResult = getResultType(answers);
    setResult(nextResult);

    const trimmedName = name.trim();
    const firstSpace = trimmedName.indexOf(" ");
    const firstName = firstSpace === -1 ? trimmedName : trimmedName.slice(0, firstSpace);
    const lastName = firstSpace === -1 ? "" : trimmedName.slice(firstSpace + 1).trim();

    const payload = {
      email,
      firstName,
      lastName,
      business,
      quizResult: nextResult,
      source: "Brand Quiz",
    };

    console.log("Submitting quiz lead:", payload);

    fetch(
      "https://services.leadconnectorhq.com/hooks/ElOoFIfV3BYE54LNg3Yw/webhook-trigger/L1o1245Pw0wy3tl4STcq",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    ).catch((err) => {
      console.warn("Quiz webhook failed:", err);
    });

    setSubmitting(false);
    setPhase("result");
  }

  function restart() {
    setPhase("intro");
    setQIndex(0);
    setAnswers([]);
    setName("");
    setEmail("");
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
          <Link to="/services" className="hover:text-[var(--rose)] transition-colors">Social Media Marketing</Link>
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
                <span className="text-[10px] tracking-luxe uppercase font-semibold" style={{ fontFamily: FONT_LUXE }}>The Dollhouse Brand Quiz</span>
                <span style={{ fontSize: "0.55rem" }}>✦</span>
              </div>
              <h1 className="mt-6 text-[var(--rose)] leading-[1.02] italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.6rem, 6vw, 4.6rem)", fontWeight: 400 }}>
                What Does Your Brand Actually Need Right Now?
              </h1>
              <p className="mt-5 max-w-xl mx-auto lg:mx-0 text-[var(--ink)]/72 leading-8" style={{ fontFamily: FONT_BODY, fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)" }}>
                4 questions. One honest result. Your clearest next step.
              </p>
              <div className="mt-8 grid max-w-xl mx-auto lg:mx-0 grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "4 questions", icon: "type" as const },
                  { label: "Brutally honest", icon: "mistakes" as const },
                  { label: "Your brand type", icon: "plan" as const },
                  { label: "Exact next step", icon: "offer" as const },
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
                Less than 60 seconds · Your result shows instantly on this page
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
              <h2 className="mt-4 text-[var(--rose)] leading-tight italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.2rem, 5vw, 3.4rem)", fontWeight: 400 }}>
                See your brand type.
              </h2>
              <p className="mt-3 text-[var(--ink)]/56 leading-7" style={{ fontFamily: FONT_BODY }}>
                Enter your name and email to see your brand type — plus the exact next step made for where you are right now.
              </p>
              <form onSubmit={submitEmail} className="mt-7 grid gap-3">
                <input required placeholder="Your first name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl px-5 py-3.5 focus:outline-none" style={{ fontFamily: FONT_BODY, background: "rgba(255,255,255,0.86)", border: "1px solid color-mix(in oklab, var(--gold) 35%, transparent)" }} />
                <input required type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl px-5 py-3.5 focus:outline-none" style={{ fontFamily: FONT_BODY, background: "rgba(255,255,255,0.86)", border: "1px solid color-mix(in oklab, var(--gold) 35%, transparent)" }} />
                <input placeholder="What kind of brand are you building? (optional)" value={business} onChange={(e) => setBusiness(e.target.value)} className="rounded-xl px-5 py-3.5 focus:outline-none" style={{ fontFamily: FONT_BODY, background: "rgba(255,255,255,0.86)", border: "1px solid color-mix(in oklab, var(--gold) 35%, transparent)" }} />
                <button disabled={submitting} className="mt-2 rounded-full px-6 py-4 transition-all hover:-translate-y-0.5 disabled:opacity-60" style={{ background: "var(--gold)", color: "var(--ink)", fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}>
                  {submitting ? "Preparing your result..." : "Show me my result →"}
                </button>
                <p className="text-center text-[rgba(30,15,10,0.36)] tracking-[0.12em] uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "9px" }}>No spam · Just your result + one honest recommendation</p>
              </form>
            </div>
          </section>
        )}

        {phase === "result" && (
          <section className="relative mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-[34px]" style={{ background: "linear-gradient(135deg, rgba(255,250,246,0.9), rgba(246,220,214,0.9))", border: "1px solid rgba(200,168,100,0.35)", boxShadow: "0 40px 90px -48px rgba(90,45,35,0.55), inset 0 1px 0 rgba(255,255,255,0.75)" }}>
              <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
                <aside className="relative min-h-full border-b border-[var(--gold)]/20 bg-[rgba(255,250,246,0.58)] p-6 lg:border-b-0 lg:border-r lg:p-8">
                  <div aria-hidden className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(circle at 18% 12%, rgba(201,122,122,0.18), transparent 34%), radial-gradient(circle at 85% 78%, rgba(200,168,100,0.14), transparent 30%)" }} />
                  <div className="relative">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>Your result report</p>
                        <p className="mt-1 text-[var(--ink)]/45" style={{ fontFamily: FONT_BODY, fontSize: "0.84rem" }}>Based on your quiz answers</p>
                      </div>
                      <ResultTypeSymbol result={result} />
                    </div>

                    <div className="mt-7 overflow-hidden rounded-[26px] border border-[var(--gold)]/22 bg-white/68 p-3 shadow-[0_28px_70px_-48px_rgba(90,45,35,0.55)]">
                      <img
                        src={productBrandKit}
                        alt="The Dollhouse product preview"
                        className="aspect-[4/3] w-full rounded-[20px] object-cover"
                        style={{ objectPosition: "center", filter: "saturate(0.9) contrast(1.02)" }}
                      />
                    </div>

                    <div className="mt-5 rounded-[22px] border border-[var(--gold)]/24 bg-white/58 p-5 text-left">
                      <p className="text-[var(--gold)] tracking-[0.18em] uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "9px", fontWeight: 700 }}>What this means</p>
                      <p className="mt-2 text-[var(--ink)]/72" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem", lineHeight: 1.65 }}>{res.diagnosis}</p>
                    </div>

                    <div className="mt-4 rounded-[22px] border border-[var(--gold)]/24 bg-white/58 p-5 text-left">
                      <p className="text-[var(--gold)] tracking-[0.18em] uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "9px", fontWeight: 700 }}>Fix first</p>
                      <p className="mt-2 text-[var(--ink)]/72" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem", lineHeight: 1.65 }}>{res.focus}</p>
                    </div>
                  </div>
                </aside>

                <div className="p-7 text-center md:p-10 lg:p-12">
                  <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>Your Result</p>
                  <h2 className="mt-3 text-[var(--rose)] leading-tight italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.4rem, 5vw, 4.4rem)", fontWeight: 400 }}>
                    {res.type}
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl italic text-[var(--ink)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.35rem, 2.5vw, 1.8rem)", lineHeight: 1.35 }}>{res.tagline}</p>
                  <p className="mx-auto mt-6 max-w-xl text-[var(--ink)]/70" style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.85 }}>{res.body}</p>

                  <div className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
                    {res.quickWins.map((win, index) => (
                      <div key={win} className="rounded-2xl border border-[var(--gold)]/24 bg-white/55 px-4 py-4">
                        <p className="text-[var(--gold)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.2rem", fontStyle: "italic" }}>0{index + 1}</p>
                        <p className="mt-1 text-[var(--ink)]/68" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", lineHeight: 1.45 }}>{win}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mx-auto mt-9 max-w-xl rounded-[28px] p-6" style={{ background: "rgba(255,250,246,0.78)", border: "1px solid rgba(200,168,100,0.3)", boxShadow: "0 24px 60px -46px rgba(90,45,35,0.55)" }}>
                    <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>Your best next step</p>
                    <p className="mt-2 italic text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.8rem", lineHeight: 1.2 }}>{res.productName}</p>
                    <a href={res.ctaUrl} className="mt-5 flex w-full items-center justify-center rounded-full px-7 py-4 transition-all hover:-translate-y-0.5" style={{ background: "var(--ink)", color: "var(--cream)", fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700, boxShadow: "0 18px 38px -16px rgba(30,15,10,0.55)" }}>
                      {res.ctaLabel}
                    </a>
                    <p className="mt-3 text-[var(--ink)]/46" style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", lineHeight: 1.5 }}>This is the cleanest next step for where your brand is right now.</p>
                  </div>

                  <div className="mx-auto mt-5 max-w-xl rounded-[24px] p-5" style={{ background: "rgba(30,15,10,0.88)", border: "1px solid rgba(200,168,100,0.24)" }}>
                    <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>Already have a business?</p>
                    <p className="mt-2 text-[var(--cream)]/72 leading-7" style={{ fontFamily: FONT_BODY, fontSize: "0.92rem" }}>
                      If your offer is already live, we can handle the content, AI clone videos, ads, automations, and lead follow-up for you.
                    </p>
                    <Link to="/#contact" className="mt-4 inline-flex rounded-full px-6 py-3 transition-all hover:-translate-y-0.5" style={{ background: "var(--rose)", color: "white", fontFamily: FONT_LUXE, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                      Get a free proposal →
                    </Link>
                  </div>

                  <button onClick={restart} className="mt-8 text-[var(--ink)]/40 hover:text-[var(--rose)] transition-colors" style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase" }}>
                    Retake the quiz
                  </button>
                </div>
              </div>
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
