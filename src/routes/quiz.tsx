import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import suitePreview from "@/assets/private-strategy-suite.jpg";
import archMark from "@/assets/arch-mark.svg";

export const Route = createFileRoute("/quiz")({ component: QuizPage });

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";
const FONT_SCRIPT = "'Allura', cursive";
const BRAND_KIT_URL = "https://thedollhouse-brand-kit.vercel.app";

type ResultKey = "foundation" | "offer" | "content" | "launch";

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
}> = {
  foundation: {
    type: "The Brand Foundation Builder",
    tagline: "You do not need more random advice. You need one clear place to build from.",
    body: "Your next move is to organize the vision, voice, audience, and identity before you keep posting. The Private Strategy Suite gives you 17 guided rooms so your brand stops living in notes, screenshots, and half-finished ideas.",
    rooms: ["Brand Foundation", "Audience Clarity", "Brand Messaging", "Website & Brand Checklist"],
  },
  offer: {
    type: "The Offer Architect",
    tagline: "Your brand can look beautiful, but it still needs something clear to sell.",
    body: "You are close, but your offer, product plan, and pricing need structure. The Dollhouse walks you through the decisions that make your brand easier to understand, trust, and buy from.",
    rooms: ["Offer & Product Planning", "Pricing Guidance", "Audience Clarity", "Goal Tracking"],
  },
  content: {
    type: "The Visibility Planner",
    tagline: "You need content that follows a strategy, not content that depends on your mood.",
    body: "Your brand needs a repeatable content direction. The Private Strategy Suite helps you plan what to say, what to promote, and how to show up with more confidence before you burn out from guessing.",
    rooms: ["Content Planning", "Marketing Strategy", "Social & Visibility Planning", "Guided Prompts"],
  },
  launch: {
    type: "The Launch Builder",
    tagline: "You are ready to move, but your launch needs a clean roadmap.",
    body: "You need the steps in order: offer, content, messaging, launch plan, and goals. The Dollhouse gives you the private web app structure to build, save, export, and keep moving.",
    rooms: ["Launch Roadmap", "Goal Tracking", "Export & Save Features", "Future Updates"],
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

function QuizPage() {
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
          quiz_recommendation: "The Dollhouse Private Strategy Suite",
          offer: "$97 Brand Kit",
          product_url: BRAND_KIT_URL,
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
          <a href={BRAND_KIT_URL} className="hover:text-[var(--rose)] transition-colors">Private Suite</a>
        </div>
        <a href={BRAND_KIT_URL} className="rounded-full px-4 py-2.5 bg-[var(--ink)] text-[var(--cream)] text-[10px] tracking-[0.16em] uppercase" style={{ fontFamily: FONT_LUXE }}>
          Get Access
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
                <span className="text-[10px] tracking-luxe uppercase font-semibold" style={{ fontFamily: FONT_LUXE }}>Free Brand Readiness Quiz</span>
                <span style={{ fontSize: "0.55rem" }}>✦</span>
              </div>
              <p className="mt-7 text-[var(--gold)] italic leading-none" style={{ fontFamily: FONT_SCRIPT, fontSize: "clamp(2.5rem, 5vw, 3.6rem)" }}>the</p>
              <h1 className="mt-1 text-[var(--rose)] leading-[0.92]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(3.2rem, 8vw, 6.8rem)", fontWeight: 400, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Dollhouse
              </h1>
              <p className="mt-5 max-w-xl mx-auto lg:mx-0 text-[var(--ink)]/72 leading-8" style={{ fontFamily: FONT_BODY, fontSize: "clamp(1rem, 1.7vw, 1.16rem)" }}>
                Find out what your brand needs first: foundation, offer clarity, content direction, or a launch roadmap. Then get matched to the private strategy suite built to help you stop guessing and start building.
              </p>
              <div className="mt-8 grid max-w-xl mx-auto lg:mx-0 grid-cols-2 sm:grid-cols-4 gap-3">
                {["17 guided rooms", "Custom strategy", "Save & export", "Instant access"].map((item) => (
                  <div key={item} className="rounded-2xl px-3 py-4 text-center" style={{ background: "rgba(255,250,246,0.62)", border: "1px solid rgba(200,168,100,0.24)" }}>
                    <img src={archMark} alt="" className="mx-auto mb-2 h-7 w-5 opacity-55" />
                    <p className="text-[9px] tracking-[0.14em] uppercase text-[var(--ink)]/58" style={{ fontFamily: FONT_LUXE }}>{item}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setPhase("q")} className="mt-9 rounded-full px-10 py-4 transition-all hover:-translate-y-0.5" style={{ backgroundColor: "var(--ink)", color: "var(--cream)", fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", boxShadow: "0 18px 38px -16px rgba(30,15,10,0.55)" }}>
                Take the quiz →
              </button>
              <p className="mt-4 text-[var(--ink)]/38 tracking-[0.14em] uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>
                Less than 60 seconds · Results + recommendation sent to your inbox
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 -z-10 rounded-[36px] opacity-55 blur-3xl" style={{ background: "radial-gradient(circle, rgba(201,122,122,0.35), transparent 70%)" }} />
              <div className="overflow-hidden rounded-[32px] border border-white/80 bg-white/45 shadow-[0_35px_80px_-42px_rgba(90,45,35,0.55)]">
                <img src={suitePreview} alt="The Dollhouse Private Strategy Suite preview" className="h-full w-full object-cover" />
              </div>
            </div>
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
            <div className="rounded-[30px] overflow-hidden border border-white/80 bg-white/45 hidden lg:block">
              <img src={suitePreview} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="rounded-[32px] border border-[var(--gold)]/24 bg-[rgba(255,250,246,0.78)] p-7 md:p-10">
              <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>Your result is ready</p>
              <h2 className="mt-4 text-[var(--rose)] leading-tight" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.2rem, 5vw, 3.4rem)", fontWeight: 400 }}>
                Where should we send your brand plan?
              </h2>
              <p className="mt-3 text-[var(--ink)]/56 leading-7" style={{ fontFamily: FONT_BODY }}>
                Get your brand type, your recommended starting room, and the link to the $97 Private Strategy Suite.
              </p>
              <form onSubmit={submitEmail} className="mt-7 grid gap-3">
                <input required placeholder="Your first name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl px-5 py-3.5 focus:outline-none" style={{ fontFamily: FONT_BODY, background: "rgba(255,255,255,0.86)", border: "1px solid color-mix(in oklab, var(--gold) 35%, transparent)" }} />
                <input required type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl px-5 py-3.5 focus:outline-none" style={{ fontFamily: FONT_BODY, background: "rgba(255,255,255,0.86)", border: "1px solid color-mix(in oklab, var(--gold) 35%, transparent)" }} />
                <input placeholder="What kind of brand are you building?" value={business} onChange={(e) => setBusiness(e.target.value)} className="rounded-xl px-5 py-3.5 focus:outline-none" style={{ fontFamily: FONT_BODY, background: "rgba(255,255,255,0.86)", border: "1px solid color-mix(in oklab, var(--gold) 35%, transparent)" }} />
                <input type="tel" placeholder="Phone number (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-xl px-5 py-3.5 focus:outline-none" style={{ fontFamily: FONT_BODY, background: "rgba(255,255,255,0.86)", border: "1px solid color-mix(in oklab, var(--gold) 35%, transparent)" }} />
                <button disabled={submitting} className="mt-2 rounded-full px-6 py-4 transition-all hover:-translate-y-0.5 disabled:opacity-60" style={{ background: "var(--gold)", color: "var(--ink)", fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}>
                  {submitting ? "Preparing your result..." : "Show my brand plan →"}
                </button>
                <p className="text-center text-[rgba(30,15,10,0.36)] tracking-[0.12em] uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "9px" }}>No spam · Results plus suite access link</p>
              </form>
            </div>
          </section>
        )}

        {phase === "result" && (
          <section className="relative mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="rounded-[32px] overflow-hidden border border-white/80 bg-white/45 shadow-[0_30px_70px_-48px_rgba(90,45,35,0.5)]">
              <img src={suitePreview} alt="The Dollhouse Private Strategy Suite preview" className="h-full w-full object-cover" />
            </div>
            <div className="rounded-[32px] bg-[var(--ink)] p-7 text-[var(--cream)] shadow-[0_40px_80px_-28px_rgba(30,15,10,0.58)] md:p-10">
              <p className="text-[var(--gold)] tracking-luxe uppercase" style={{ fontFamily: FONT_LUXE, fontSize: "10px" }}>Your Brand Type</p>
              <h2 className="mt-3 text-[var(--cream)] leading-tight" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: 400 }}>
                {res.type}
              </h2>
              <p className="mt-3 italic text-[var(--gold)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.28rem", lineHeight: 1.45 }}>{res.tagline}</p>
              <p className="mt-5 text-[rgba(250,243,234,0.72)] leading-7" style={{ fontFamily: FONT_BODY }}>{res.body}</p>

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
                </div>
                <a href={BRAND_KIT_URL} className="rounded-full px-7 py-4 text-center transition-all hover:-translate-y-0.5" style={{ background: "var(--gold)", color: "var(--ink)", fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}>
                  Get instant access →
                </a>
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
