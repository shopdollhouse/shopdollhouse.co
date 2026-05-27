import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/quiz")({ component: QuizPage });

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";
const FONT_SCRIPT = "'Allura', cursive";

/* ─── Quiz data ───────────────────────────────────────── */
const QUESTIONS = [
  {
    q: "Where are you in your brand journey?",
    options: [
      { label: "Starting from scratch — I have a vision but no brand yet", type: "A" },
      { label: "I have something, but it feels scattered and inconsistent", type: "B" },
      { label: "My brand looks okay — I just can't nail the content side", type: "C" },
      { label: "I want it all handled for me — content, ads, automation", type: "D" },
    ],
  },
  {
    q: "What's your biggest challenge right now?",
    options: [
      { label: "Colors, fonts, logo, voice — I don't even know where to begin", type: "A" },
      { label: "My brand doesn't feel like me and I'm not attracting the right clients", type: "B" },
      { label: "I spend hours writing captions and still hate what comes out", type: "C" },
      { label: "I'm too busy running my business to think about any of this", type: "D" },
    ],
  },
  {
    q: "How do you want to fix it?",
    options: [
      { label: "A step-by-step system that walks me through every decision", type: "A" },
      { label: "A guided workbook to get clear on my positioning and direction", type: "B" },
      { label: "Ready-to-use prompts I can customize and post instantly", type: "C" },
      { label: "A team that handles everything while I focus on my clients", type: "D" },
    ],
  },
];

const RESULTS = {
  A: {
    type: "The Architect",
    tagline: "You need a brand foundation — built right from the start.",
    body: "You're ready to build something real, but you need a clear system to guide every decision. The Brand Kit Blueprint walks you through every brand decision step by step — colors, fonts, voice, visual identity. Nothing left to guesswork.",
    product: "The Dollhouse Brand Kit Blueprint",
    price: "$97",
    originalPrice: "$145",
    cta: "Get the Blueprint →",
    mailto: "mailto:hello@shopdollhouse.co?subject=Brand%20Kit%20Blueprint",
    alt: "Or grab everything in The Brand Room for $127 →",
    altHref: "/brand-room#bundle",
  },
  B: {
    type: "The Strategist",
    tagline: "You need clarity — on your brand, your audience, and your offer.",
    body: "You have something to work with, but the foundation isn't solid yet. The Brand Workbook gets you crystal clear on your positioning, audience, offers, and voice — so your brand actually starts attracting the right people.",
    product: "Brand Workbook",
    price: "$47",
    originalPrice: "$261",
    cta: "Get the Workbook →",
    mailto: "mailto:hello@shopdollhouse.co?subject=Brand%20Workbook",
    alt: "Or grab everything in The Brand Room for $127 →",
    altHref: "/brand-room#bundle",
  },
  C: {
    type: "The Creator",
    tagline: "You need content that sounds like you — ready to go.",
    body: "Your brand is in decent shape — you just need the words. The AI Prompt Kit gives you 50+ prompts across 8 categories: captions, hooks, emails, ad copy, and more. Customize and post instantly. No more blank screens.",
    product: "AI Prompt Kit",
    price: "$17",
    originalPrice: null,
    cta: "Get the Prompt Kit →",
    mailto: "mailto:hello@shopdollhouse.co?subject=AI%20Prompt%20Kit",
    alt: "Or grab everything in The Brand Room for $127 →",
    altHref: "/brand-room#bundle",
  },
  D: {
    type: "The Visionary",
    tagline: "You're ready for the full system — and someone to run it.",
    body: "You know exactly what you want. You just need someone to build it and run it. Start with The Brand Room full bundle, or book a discovery call to talk about handing everything over to us completely.",
    product: "The Full Bundle",
    price: "$127",
    originalPrice: "$161",
    cta: "Get the Full Bundle →",
    mailto: "mailto:hello@shopdollhouse.co?subject=Full%20Bundle",
    alt: "Or apply for a full retainer →",
    altHref: "/#contact",
  },
};

function getResultType(answers: string[]): keyof typeof RESULTS {
  const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((a) => { counts[a]++; });
  if (counts.D >= 2) return "D";
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted[0][0] as keyof typeof RESULTS;
}

/* ─── Page ─────────────────────────────────────────────── */
function QuizPage() {
  const [phase, setPhase] = useState<"intro" | "q" | "email" | "result">("intro");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<keyof typeof RESULTS>("A");

  function pickAnswer(type: string) {
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
    const r = getResultType(answers);
    setResult(r);
    try {
      await fetch("https://formspree.io/f/mwvrvrzj", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          source: "Brand Room Quiz",
          quiz_result: RESULTS[r].type,
          quiz_recommendation: RESULTS[r].product,
        }),
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
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
  }

  const progressPct =
    phase === "q" ? (qIndex / QUESTIONS.length) * 100 :
    phase === "email" ? 90 : 100;

  const res = RESULTS[result];

  return (
    <main className="min-h-screen bg-[var(--blush)] text-[var(--ink)] flex flex-col">

      {/* Nav */}
      <nav className="py-5 px-6 md:px-12 flex items-center justify-between border-b border-[var(--gold)]/12">
        <Link to="/" className="flex flex-col items-start leading-tight no-underline">
          <span style={{ fontFamily: FONT_SCRIPT, fontSize: "18px", letterSpacing: "1px", textTransform: "lowercase", lineHeight: 1, color: "color-mix(in oklab, var(--ink) 55%, transparent)" }}>the</span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: "15px", letterSpacing: "4px", textTransform: "uppercase", marginTop: "-4px", color: "var(--ink)", fontStyle: "italic" }}>Dollhouse</span>
          <span style={{ fontFamily: FONT_LUXE, fontSize: "6.5px", letterSpacing: "3px", textTransform: "uppercase", marginTop: "1px", color: "var(--gold)", fontWeight: 600 }}>Brand Studio</span>
        </Link>
        <Link to="/brand-room" className="hover:opacity-60 transition-opacity shrink-0" style={{ fontFamily: FONT_LUXE, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)" }}>
          ← Brand Room
        </Link>
      </nav>

      {/* Progress bar */}
      {(phase === "q" || phase === "email") && (
        <div className="h-0.5" style={{ background: "rgba(200,168,100,0.15)" }}>
          <div className="h-full transition-all duration-500" style={{ width: `${progressPct}%`, background: "var(--gold)" }} />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex items-start md:items-center justify-center px-6 py-10 md:py-16">
        <div className="w-full max-w-2xl">

          {/* ── INTRO ── */}
          {phase === "intro" && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/45 px-5 py-2 mb-8" style={{ background: "rgba(200,168,100,0.08)" }}>
                <span style={{ color: "var(--gold)", fontSize: "0.55rem" }}>✦</span>
                <span style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>Free Brand Quiz</span>
                <span style={{ color: "var(--gold)", fontSize: "0.55rem" }}>✦</span>
              </div>

              <h1 className="text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 400, lineHeight: 1.05 }}>
                What does your brand actually need?
              </h1>
              <p className="mt-5 max-w-lg mx-auto leading-relaxed" style={{ fontFamily: FONT_BODY, fontSize: "1rem", color: "rgba(30,15,10,0.6)" }}>
                3 quick questions. We'll tell you exactly where to start — and what will move the needle fastest for your business.
              </p>

              <button
                onClick={() => setPhase("q")}
                className="mt-10 rounded-2xl px-10 py-4 hover:-translate-y-0.5 transition-all"
                style={{ backgroundColor: "var(--ink)", color: "var(--cream)", fontFamily: FONT_DISPLAY, fontSize: "1.15rem", fontStyle: "italic", fontWeight: 700, boxShadow: "0 12px 28px -10px rgba(30,15,10,0.4)" }}
              >
                Take the Quiz →
              </button>
              <p className="mt-4" style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(30,15,10,0.3)" }}>
                Takes less than 60 seconds
              </p>
            </div>
          )}

          {/* ── QUESTION ── */}
          {phase === "q" && (
            <div>
              <p style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>
                Question {qIndex + 1} of {QUESTIONS.length}
              </p>
              <h2 className="mt-5" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", lineHeight: 1.15, color: "var(--ink)" }}>
                {QUESTIONS[qIndex].q}
              </h2>
              <div className="mt-8 space-y-3">
                {QUESTIONS[qIndex].options.map((opt) => (
                  <button
                    key={opt.type}
                    onClick={() => pickAnswer(opt.type)}
                    className="w-full text-left rounded-2xl px-6 py-5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    style={{
                      background: "linear-gradient(160deg, rgba(255,255,255,0.85) 0%, rgba(251,240,235,0.75) 100%)",
                      border: "1px solid color-mix(in oklab, var(--gold) 28%, transparent)",
                      boxShadow: "0 4px 16px -8px rgba(160,110,95,0.15)",
                    }}
                  >
                    <span style={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem", color: "var(--ink)", lineHeight: 1.4 }}>
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── EMAIL ── */}
          {phase === "email" && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-7 text-[var(--gold)]">
                <span className="h-px w-10" style={{ background: "rgba(200,168,100,0.4)" }} />
                <svg viewBox="0 0 24 22" fill="currentColor" style={{ width: "12px", height: "12px" }}>
                  <path d="M12 21.6C6.3 16.1 1 11.3 1 7.2 1 3.4 4.1 2 6.3 2c1.3 0 4.2.5 5.7 4.5C13.6 2.5 16.5 2 17.7 2 20.3 2 23 3.6 23 7.2c0 4.1-5.1 8.9-11 14.4z" />
                </svg>
                <span className="h-px w-10" style={{ background: "rgba(200,168,100,0.4)" }} />
              </div>

              <h2 className="text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, lineHeight: 1.1 }}>
                Almost there — where should we send your results?
              </h2>
              <p className="mt-3" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem", color: "rgba(30,15,10,0.55)" }}>
                We'll send your brand type + a personalized recommendation straight to your inbox.
              </p>

              <form onSubmit={submitEmail} className="mt-8 space-y-3 max-w-sm mx-auto text-left">
                <input
                  type="text"
                  placeholder="Your first name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl px-5 py-3.5 placeholder:text-[var(--ink)]/35 focus:outline-none transition"
                  style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: "var(--ink)", background: "rgba(255,255,255,0.8)", border: "1px solid color-mix(in oklab, var(--gold) 35%, transparent)" }}
                />
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl px-5 py-3.5 placeholder:text-[var(--ink)]/35 focus:outline-none transition"
                  style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: "var(--ink)", background: "rgba(255,255,255,0.8)", border: "1px solid color-mix(in oklab, var(--gold) 35%, transparent)" }}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-2xl py-4 transition-all hover:-translate-y-0.5 disabled:opacity-60"
                  style={{ backgroundColor: "var(--gold)", fontFamily: FONT_DISPLAY, fontSize: "1.1rem", fontStyle: "italic", fontWeight: 700, color: "var(--ink)", boxShadow: "0 12px 28px -10px rgba(160,110,60,0.45)" }}
                >
                  {submitting ? "Getting your results..." : "Show me my results →"}
                </button>
                <p className="text-center pt-1" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(30,15,10,0.3)" }}>
                  No spam · Unsubscribe anytime
                </p>
              </form>
            </div>
          )}

          {/* ── RESULT ── */}
          {phase === "result" && (
            <div>
              <div className="text-center mb-10">
                <p style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>
                  Your Brand Type
                </p>
                <h2 className="mt-3 text-[var(--rose)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 400, lineHeight: 1 }}>
                  {res.type}
                </h2>
                <p className="mt-4 italic max-w-lg mx-auto" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.25rem", lineHeight: 1.5, color: "var(--ink)" }}>
                  {res.tagline}
                </p>
              </div>

              <div className="rounded-[28px] p-8 md:p-12" style={{ background: "var(--ink)", boxShadow: "0 40px 80px -20px rgba(30,15,10,0.5), 0 0 0 1px rgba(200,168,100,0.2)" }}>
                <div className="inline-flex mb-4 px-3 py-1 rounded-full" style={{ background: "rgba(200,168,100,0.18)", border: "1px solid rgba(200,168,100,0.4)" }}>
                  <span style={{ fontFamily: FONT_LUXE, fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>Recommended for you</span>
                </div>

                <h3 className="text-[var(--cream)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.6rem, 3vw, 2.25rem)", lineHeight: 1.2 }}>
                  {res.product}
                </h3>

                <div className="flex items-baseline gap-3 mt-3">
                  <span className="italic text-[var(--gold)]" style={{ fontFamily: FONT_DISPLAY, fontSize: "2.5rem", lineHeight: 1 }}>{res.price}</span>
                  {res.originalPrice && (
                    <span className="line-through" style={{ fontFamily: FONT_BODY, fontSize: "1rem", color: "rgba(250,243,234,0.28)" }}>{res.originalPrice}</span>
                  )}
                </div>

                <p className="mt-5 leading-relaxed" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem", color: "rgba(250,243,234,0.72)" }}>
                  {res.body}
                </p>

                <a
                  href={res.mailto}
                  className="mt-8 w-full block rounded-2xl px-5 py-4 text-center transition-all hover:-translate-y-0.5 hover:opacity-90"
                  style={{ backgroundColor: "var(--gold)", boxShadow: "0 12px 28px -10px rgba(160,110,60,0.5)" }}
                >
                  <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", fontStyle: "italic", fontWeight: 700, color: "var(--ink)" }}>
                    {res.cta}
                  </p>
                </a>

                <a
                  href={res.altHref}
                  className="mt-4 block text-center hover:opacity-70 transition-opacity"
                  style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(250,243,234,0.38)" }}
                >
                  {res.alt}
                </a>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={restart}
                  className="hover:opacity-60 transition-opacity"
                  style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(30,15,10,0.32)" }}
                >
                  Retake the quiz
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t border-[var(--gold)]/10">
        <p style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "rgba(30,15,10,0.3)" }}>
          © {new Date().getFullYear()} The Dollhouse Brand Studio
        </p>
      </footer>

    </main>
  );
}
