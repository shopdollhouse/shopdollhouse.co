import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Home } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";
import brandKitImg from "@/assets/product-brand-kit.webp";
import workbookImg from "@/assets/product-brand-workbook.webp";
import starterSuiteImg from "@/assets/product-brand-suite.webp";
import promptKitImg from "@/assets/product-prompt-kit.webp";
import fullHouseImg from "@/assets/product-full-house.webp";
import plannerImg from "@/assets/product-planner.webp";

type View = "landing" | "q1" | "q2" | "q3" | "loading" | "result";
type Letter = "A" | "B" | "C";
type ResultType = "blank" | "almost" | "gem";

const SCORE_MAP: Record<string, Partial<Record<ResultType, number>>> = {
  "1A": { blank: 2 }, "1B": { almost: 2 }, "1C": { gem: 1 },
  "2A": { blank: 2 }, "2B": { almost: 2 }, "2C": { gem: 2 },
  "3A": { blank: 2 }, "3B": { almost: 2 }, "3C": { gem: 2 },
  "4A": { gem: 2 }, "4B": { almost: 2 }, "4C": { blank: 2 },
  "5A": { blank: 2 }, "5B": { almost: 2 }, "5C": { gem: 2 },
  "6A": { blank: 2 }, "6B": { almost: 1, blank: 1 }, "6C": { gem: 2 },
  "7A": { blank: 2 }, "7B": { almost: 2 }, "7C": { gem: 2 },
  "8A": { blank: 2 }, "8B": { almost: 2 }, "8C": { gem: 2 },
};

function calcResult(answers: Record<number, Letter>): ResultType {
  const scores = { blank: 0, almost: 0, gem: 0 };
  for (let q = 1; q <= 8; q++) {
    const pts = SCORE_MAP[`${q}${answers[q]}`] || {};
    Object.entries(pts).forEach(([type, val]) => {
      scores[type as ResultType] += val as number;
    });
  }
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0] as ResultType;
}

const EMOJIS = ["🏠", "🎨", "✨", "💡", "🪄", "💖", "🚀", "🌟"];

const QUESTIONS: { q: number; emoji: string; text: string; answers: { letter: Letter; text: string; emoji: string }[] }[] = [
  {
    q: 1, emoji: "🏠", text: "If your brand were a house right now, what would it look like?",
    answers: [
      { letter: "A", emoji: "🏗️", text: "An empty plot — I haven't started building yet" },
      { letter: "B", emoji: "🧱", text: "Half-built — walls are up but it's missing a roof" },
      { letter: "C", emoji: "🏡", text: "Fully furnished — just nobody's knocked on the door yet" },
    ],
  },
  {
    q: 2, emoji: "🎨", text: "How do you feel about designing your brand look — logos, colours, fonts?",
    answers: [
      { letter: "A", emoji: "😰", text: "Terrified — I don't even know where to start" },
      { letter: "B", emoji: "🤷‍♀️", text: "I've tried a few things but nothing feels right" },
      { letter: "C", emoji: "💅", text: "I've got something but it needs a professional polish" },
    ],
  },
  {
    q: 3, emoji: "✨", text: "When you imagine your dream brand, what excites you most?",
    answers: [
      { letter: "A", emoji: "🌱", text: "Finally having something real I can point people to" },
      { letter: "B", emoji: "🧩", text: "Everything matching and looking like it belongs together" },
      { letter: "C", emoji: "📣", text: "Getting noticed and making sales consistently" },
    ],
  },
  {
    q: 4, emoji: "💡", text: "Be honest — could you explain what you sell in one sentence right now?",
    answers: [
      { letter: "A", emoji: "✅", text: "Yes! I've got my elevator pitch down" },
      { letter: "B", emoji: "😅", text: "Sort of… it changes depending on who I'm talking to" },
      { letter: "C", emoji: "🫠", text: "Not really — I'm still figuring out what I actually offer" },
    ],
  },
  {
    q: 5, emoji: "🪄", text: "What does your content creation process look like?",
    answers: [
      { letter: "A", emoji: "🦗", text: "What content? I haven't started posting yet" },
      { letter: "B", emoji: "🎲", text: "Random — I post when inspiration strikes" },
      { letter: "C", emoji: "📅", text: "I show up regularly but my content doesn't convert" },
    ],
  },
  {
    q: 6, emoji: "💖", text: "How much time do you want to spend building your brand?",
    answers: [
      { letter: "A", emoji: "⏰", text: "As little as possible — just give me a done-for-me system" },
      { letter: "B", emoji: "🛠️", text: "I want to learn but I need step-by-step guidance" },
      { letter: "C", emoji: "🔥", text: "I'm ready to put in the work, just point me in the right direction" },
    ],
  },
  {
    q: 7, emoji: "🚀", text: "What's the #1 thing stopping you from making your first (or next) sale?",
    answers: [
      { letter: "A", emoji: "🤔", text: "I don't have a product or offer figured out yet" },
      { letter: "B", emoji: "🙈", text: "My brand doesn't look professional enough to charge for" },
      { letter: "C", emoji: "👻", text: "Nobody knows I exist — I need more visibility" },
    ],
  },
  {
    q: 8, emoji: "🌟", text: "If you could wave a magic wand, what would your brand look like tomorrow?",
    answers: [
      { letter: "A", emoji: "🏠", text: "Built from scratch — a real brand that I'm proud of" },
      { letter: "B", emoji: "💎", text: "Polished and cohesive — everything finally matches" },
      { letter: "C", emoji: "💰", text: "Making sales on autopilot while I focus on creating" },
    ],
  },
];

const VIEW_QUESTIONS: Record<string, number[]> = { q1: [1, 2, 3], q2: [4, 5, 6], q3: [7, 8] };
const PROGRESS: Record<string, number> = { q1: 12, q2: 37, q3: 62 };

const LOADING_LINES = [
  "Building your brand blueprint…",
  "Decorating your results room…",
  "Picking out the perfect recommendations…",
  "Almost there, gorgeous…",
];

interface ResultData {
  title: string;
  sTitle: string;
  tagline: string;
  body: string;
  reasoning: string;
  needs: string[];
  ctaHead: string;
  ctaBody: string;
  ctaBtn: string;
  ctaUrl: string;
  products: { label: string; name: string; price: string; desc: string; url: string; image: string }[];
}

const RESULTS: Record<ResultType, ResultData> = {
  blank: {
    title: "The Blank Canvas",
    sTitle: "The Blank Canvas",
    tagline: "The vision is there. The foundation isn't — yet.",
    body: "You know something is building inside you — a business, a brand, a version of yourself that charges for her work and looks the part doing it. The only thing missing is the starting point. You haven't been lazy. You've been overwhelmed. There's a difference. The Dollhouse is built for exactly where you are.",
    reasoning: "Most of your answers point to a brand that hasn't been fully built yet — and that's not a problem. It's a starting point.",
    needs: ["A brand identity that actually reflects who you are", "The words to explain what you do — clearly and confidently", "A visual system you can use everywhere, consistently"],
    ctaHead: "Start with the system built for exactly this.",
    ctaBody: "The Dollhouse Brand Kit walks you through everything — identity, product, branding, platform, pricing, and plan. The complete foundation in one place. No design skills needed.",
    ctaBtn: "Get the Brand Kit",
    ctaUrl: "https://stan.store/shopdollhouse/p/the-dollhouse--brand-starter-system-bet2kjnl",
    products: [
      { label: "BRAND KIT", name: "The Dollhouse Brand Kit", price: "$97", desc: "The complete starter system — 8 rooms, every decision, one clear path.", url: "https://stan.store/shopdollhouse/p/the-dollhouse--brand-starter-system-bet2kjnl", image: brandKitImg },
      { label: "WORKBOOK", name: "Brand Workbook", price: "$47", desc: "72 pages of guided worksheets to build your foundation room by room.", url: "https://stan.store/shopdollhouse/p/-build-a-real-brand-from-scratch", image: workbookImg },
      { label: "DONE FOR YOU", name: "The Starter Suite", price: "$497", desc: "Hand it over. I build your brand identity from scratch — delivered in 10 days.", url: "https://stan.store/shopdollhouse/p/the-dollhouse-brand-suite", image: starterSuiteImg },
    ],
  },
  almost: {
    title: "The Almost Brand",
    sTitle: "The Almost Brand",
    tagline: "So close. Something just isn't clicking yet.",
    body: "You've done the work. You have a name, maybe a logo, probably a colour palette you've changed three times. But when you look at everything together, it doesn't feel cohesive — and you know it. That gap between what's in your head and what people actually see? That's a brand consistency problem. And it's fixable.",
    reasoning: "Most of your answers point to a brand with real pieces that haven't connected yet. The foundation is there. It just needs structure.",
    needs: ["A brand system where everything speaks the same visual language", "Messaging that sounds like you — not like a template", "Clarity on who you're talking to and what you're offering"],
    ctaHead: "The workbook that makes it click.",
    ctaBody: "The Brand Workbook takes you through every room with guided worksheets and decision locks — so everything finally connects and feels like yours.",
    ctaBtn: "Get the Workbook",
    ctaUrl: "https://stan.store/shopdollhouse/p/-build-a-real-brand-from-scratch",
    products: [
      { label: "WORKBOOK", name: "Brand Workbook", price: "$47", desc: "Build a cohesive brand from every angle — guided worksheets for all 8 rooms.", url: "https://stan.store/shopdollhouse/p/-build-a-real-brand-from-scratch", image: workbookImg },
      { label: "PROMPT KIT", name: "AI Prompt Kit", price: "$17", desc: "50+ prompts to write your listings, captions, bios, and content — fast.", url: "https://stan.store/shopdollhouse/p/the-dollhouse-prompt-kit", image: promptKitImg },
      { label: "DONE FOR YOU", name: "The Full House", price: "$997", desc: "Complete brand identity across every platform. Delivered in 14 days.", url: "https://stan.store/shopdollhouse/p/the-dollhouse-full-house", image: fullHouseImg },
    ],
  },
  gem: {
    title: "The Hidden Gem",
    sTitle: "The Hidden Gem",
    tagline: "Your brand is real. The world just hasn't found it yet.",
    body: "You're not new to this. You've been doing the work, showing up, building something — and it's good. The problem isn't your product or your talent. It's visibility and positioning. The right people aren't finding you, and when they do, your brand isn't quite communicating the value of what you do. That's the only thing standing between you and sales.",
    reasoning: "Most of your answers point to someone who has been doing the work — but the right people haven't found her yet.",
    needs: ["Positioning that makes your value impossible to ignore", "A brand presence that matches the quality of what you offer", "Done-for-you tools to show up more powerfully and consistently"],
    ctaHead: "The tools to show up like you mean it.",
    ctaBody: "The AI Prompt Kit gives you 50+ ready-to-use prompts for listings, content, bios, and sales pages — so your brand finally sounds as good as it looks.",
    ctaBtn: "Get the Prompt Kit",
    ctaUrl: "https://stan.store/shopdollhouse/p/the-dollhouse-prompt-kit",
    products: [
      { label: "PROMPT KIT", name: "AI Prompt Kit", price: "$17", desc: "50+ prompts organised by room. Listings, content, captions — written fast.", url: "https://stan.store/shopdollhouse/p/the-dollhouse-prompt-kit", image: promptKitImg },
      { label: "DONE FOR YOU", name: "The Full House", price: "$997", desc: "Complete brand identity that matches the quality of what you actually offer.", url: "https://stan.store/shopdollhouse/p/the-dollhouse-full-house", image: fullHouseImg },
    ],
  },
};

/* ─── Step Indicator ─── */
const StepIndicator = ({ current, total }: { current: number; total: number }) => (
  <div className="flex items-center gap-1.5 mb-8">
    {Array.from({ length: total }, (_, i) => (
      <div
        key={i}
        className={`h-[3px] rounded-full transition-all duration-500 ${
          i < current ? "bg-dollhouse-ink flex-[2]" : i === current ? "bg-dollhouse-p3 flex-[2]" : "bg-dollhouse-p2 flex-1"
        }`}
      />
    ))}
  </div>
);

/* ─── Answer Option ─── */
const AnswerOption = ({
  letter,
  emoji,
  text,
  selected,
  onPick,
}: {
  letter: Letter;
  emoji: string;
  text: string;
  selected: boolean;
  onPick: () => void;
}) => (
  <button
    onClick={onPick}
    className={`group w-full text-left flex items-start gap-4 rounded-2xl transition-all duration-300 cursor-pointer px-5 py-4 border
      ${selected
        ? "bg-dollhouse-p1 border-dollhouse-ink/30 shadow-[0_2px_12px_-4px_hsl(18_30%_18%/0.12)] scale-[1.01]"
        : "bg-card border-dollhouse-p2/60 hover:border-dollhouse-p3 hover:bg-dollhouse-p1/50 hover:scale-[1.005]"
      }`}
  >
    <span
      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[15px] transition-all duration-300
        ${selected
          ? "bg-dollhouse-ink text-white scale-110"
          : "bg-dollhouse-p1 group-hover:bg-dollhouse-p2"
        }`}
    >
      {selected ? "✓" : emoji}
    </span>
    <span className={`text-[13px] leading-[1.6] pt-[5px] transition-colors duration-200 ${selected ? "text-dollhouse-ink font-medium" : "text-dollhouse-text-mid"}`}>
      {text}
    </span>
  </button>
);

/* ─── Question Block ─── */
const QuestionBlock = ({
  q,
  emoji,
  text,
  answerOptions,
  selectedAnswer,
  onPick,
}: {
  q: number;
  emoji: string;
  text: string;
  answerOptions: { letter: Letter; text: string; emoji: string }[];
  selectedAnswer?: Letter;
  onPick: (q: number, letter: Letter) => void;
}) => (
  <div className="mb-8" data-question={q}>
    <div className="flex items-center gap-3 mb-4">
      <span className="text-[18px]">{emoji}</span>
      <span className="font-accent text-[10px] font-semibold tracking-[0.2em] uppercase text-dollhouse-ink">
        Question {q}
      </span>
      <div className="h-px flex-1 bg-dollhouse-p2/50" />
    </div>
    <p className="font-display text-[22px] sm:text-[26px] font-normal text-dollhouse-ink leading-[1.35] mb-5">
      {text}
    </p>
    <div className="flex flex-col gap-2.5">
      {answerOptions.map((a) => (
        <AnswerOption
          key={a.letter}
          letter={a.letter}
          emoji={a.emoji}
          text={a.text}
          selected={selectedAnswer === a.letter}
          onPick={() => onPick(q, a.letter)}
        />
      ))}
    </div>
  </div>
);

/* ─── Quiz Nav Bar ─── */
const QuizNavbar = () => (
  <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50 px-6 py-4 flex items-center justify-between">
    <Link to="/" className="font-display italic text-foreground no-underline flex flex-col items-start leading-tight">
      <span className="text-[9px] tracking-[4px] text-muted-foreground font-normal">the</span>
      <span className="text-[15px] tracking-[4px] uppercase">Dollhouse</span>
    </Link>
    <Link
      to="/"
      className="font-accent text-[9px] tracking-[3px] uppercase text-muted-foreground hover:text-foreground transition-colors no-underline"
    >
      ← Back to Home
    </Link>
  </nav>
);

/* ─── Fun Fact Banner ─── */
const FunFact = ({ step }: { step: number }) => {
  const facts = [
    "🏠 73% of consumers judge a business by its visual branding before anything else!",
    "💡 Did you know? Consistent branding can increase revenue by up to 23%!",
    "🌟 Almost there! Businesses with a clear brand message grow 3x faster.",
  ];
  return (
    <div className="bg-dollhouse-p1 border border-dollhouse-p2 rounded-xl px-4 py-3 mb-8 text-center">
      <p className="text-[12px] text-dollhouse-text-mid font-light italic leading-relaxed">
        {facts[step - 1] || facts[0]}
      </p>
    </div>
  );
};

/* ─── Main Quiz Component ─── */
const Quiz = () => {
  const [view, setView] = useState<View>("landing");
  const [answers, setAnswers] = useState<Record<number, Letter>>({});
  const [result, setResult] = useState<ResultType | null>(null);
  const [loadingLine, setLoadingLine] = useState(LOADING_LINES[0]);
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // No pre-fill — quiz always starts fresh

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem("dh_quiz_ans", JSON.stringify(answers));
    }
  }, [answers]);

  const changeView = useCallback((next: View) => {
    setAnimating(true);
    setTimeout(() => {
      setView(next);
      setAnimating(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 250);
  }, []);

  const handlePick = useCallback((q: number, letter: Letter) => {
    setAnswers((prev) => ({ ...prev, [q]: letter }));
    setTimeout(() => {
      const viewKey = q <= 3 ? "q1" : q <= 6 ? "q2" : "q3";
      const qNums = VIEW_QUESTIONS[viewKey];
      const nextQ = qNums.find((n) => n !== q && !answers[n] && n > q);
      if (nextQ) {
        const el = document.querySelector(`[data-question="${nextQ}"]`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 320);
  }, [answers]);

  const allAnswered = (viewKey: string) => VIEW_QUESTIONS[viewKey].every((q) => answers[q]);

  const goLoading = () => {
    setLoadingLine(LOADING_LINES[Math.floor(Math.random() * LOADING_LINES.length)]);
    changeView("loading");
    setTimeout(() => {
      const r = calcResult(answers);
      setResult(r);
      try {
        const leads = JSON.parse(localStorage.getItem("dh_quiz_leads") || "[]");
        if (leads.length > 0) {
          leads[leads.length - 1].result = RESULTS[r].sTitle;
          localStorage.setItem("dh_quiz_leads", JSON.stringify(leads));
        }
      } catch {}
      try {
        const w = window as any;
        if (typeof w.gtag !== "undefined") {
          w.gtag("event", "quiz_result", { result_type: r, result_title: RESULTS[r].sTitle });
        }
      } catch {}
      changeView("result");
    }, 2700);
  };

  const handleRetake = () => {
    if (!window.confirm("Start over? Your answers will be cleared.")) return;
    setAnswers({});
    setResult(null);
    localStorage.removeItem("dh_quiz_ans");
    changeView("landing");
  };

  const handleShare = () => {
    if (!result) return;
    const r = RESULTS[result];
    const text = `I just took the Dollhouse Brand Clarity Quiz — my result is "${r.sTitle}". Find yours at shopdollhouse.co`;
    if (navigator.share) {
      navigator.share({ title: "The Dollhouse Quiz", text }).catch(() => {
        navigator.clipboard.writeText(text);
        toast("✨ Copied — share it!");
      });
    } else {
      navigator.clipboard.writeText(text);
      toast("✨ Copied — share it!");
    }
  };

  const res = result ? RESULTS[result] : null;
  const viewStep = view === "q1" ? 1 : view === "q2" ? 2 : view === "q3" ? 3 : 0;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="relative min-h-screen bg-background">
      <QuizNavbar />

      <div className="relative z-10 min-h-[calc(100vh-60px)] flex items-center justify-center" ref={containerRef}>
        <div className="max-w-[620px] mx-auto px-6 py-16 w-full">
          <div
            className={`transition-all ${animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
            style={{ transitionDuration: animating ? "200ms" : "500ms", transitionTimingFunction: animating ? "ease-in" : "cubic-bezier(0.22, 1, 0.36, 1)" }}
          >

            {/* ─── LANDING ─── */}
            {view === "landing" && (
              <div className="text-center animate-rise-in">
                <Eyebrow text="Brand Clarity Quiz" className="mb-8 mx-auto" />

                <h1 className="font-display italic font-normal text-foreground leading-[1.08] mb-6" style={{ fontSize: "clamp(42px, 9vw, 62px)" }}>
                  Let's build your<br />brand <span className="text-dollhouse-p3">together</span> <Home className="inline-block ml-1 text-dollhouse-ink" size={36} />
                </h1>

                <p className="text-[15px] font-light text-muted-foreground leading-[1.8] max-w-[440px] mx-auto mb-10">
                  8 quick questions. Your personalised brand roadmap. Find out exactly what you need — even if you're a complete beginner.
                </p>

                <div className="flex gap-3 justify-center flex-wrap mb-10">
                  {["🕐 2 Minutes", "🎯 Personalised", "🎁 100% Free"].map((c) => (
                    <span key={c} className="font-accent text-[10px] tracking-[0.12em] uppercase text-dollhouse-ink bg-dollhouse-p1 border border-dollhouse-p3/20 px-4 py-1.5 rounded-full">
                      {c}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => changeView("q1")}
                  className="bg-foreground text-background rounded-pill font-accent text-[10px] tracking-[3px] uppercase font-medium px-12 py-4 border-none cursor-pointer transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Let's Go! →
                </button>

                <p className="mt-6 text-[12px] text-muted-foreground font-light italic">
                  Perfect for beginners — no experience needed ✨
                </p>
              </div>
            )}

            {/* ─── QUESTION VIEWS ─── */}
            {(view === "q1" || view === "q2" || view === "q3") && (
              <div className="animate-rise-in">
                <StepIndicator current={viewStep} total={3} />

                <div className="flex items-center justify-between mb-4">
                  <span className="font-accent text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                    Part {viewStep} of 3
                  </span>
                  <span className="font-accent text-[11px] font-semibold text-dollhouse-ink">
                    {PROGRESS[view]}%
                  </span>
                </div>

                <FunFact step={viewStep} />

                {VIEW_QUESTIONS[view].map((qNum) => {
                  const qData = QUESTIONS.find((qq) => qq.q === qNum)!;
                  return (
                    <QuestionBlock
                      key={qNum}
                      q={qNum}
                      emoji={qData.emoji}
                      text={qData.text}
                      answerOptions={qData.answers}
                      selectedAnswer={answers[qNum]}
                      onPick={handlePick}
                    />
                  );
                })}

                <div className="flex justify-between items-center mt-4 pt-6 border-t border-border/50">
                  {view !== "q1" ? (
                    <button
                      onClick={() => changeView(view === "q2" ? "q1" : "q2")}
                      className="font-accent text-[10px] tracking-[0.16em] uppercase text-muted-foreground bg-transparent border-none cursor-pointer py-3 hover:text-foreground transition-colors"
                    >
                      ← Back
                    </button>
                  ) : <div />}

                  <button
                    onClick={() => {
                      if (view === "q1") changeView("q2");
                      else if (view === "q2") changeView("q3");
                      else goLoading();
                    }}
                    disabled={!allAnswered(view)}
                    className={`bg-foreground text-background rounded-2xl font-accent text-[10px] tracking-[3px] uppercase font-medium px-10 py-3.5 border-none cursor-pointer transition-all duration-300
                      ${allAnswered(view) ? "opacity-100 hover:opacity-90 hover:shadow-md" : "opacity-20 pointer-events-none"}`}
                  >
                    {view === "q3" ? "See My Result 🎉" : "Next"} →
                  </button>
                </div>
              </div>
            )}

            {/* ─── LOADING ─── */}
            {view === "loading" && (
              <div className="text-center py-24 animate-rise-in">
                <div className="text-[48px] mb-6 animate-float-arch">🏠</div>
                <div className="w-12 h-12 mx-auto mb-8 rounded-full border-2 border-dollhouse-p2 border-t-dollhouse-ink animate-spin" />
                <p className="font-display text-[22px] font-light italic text-foreground">
                  {loadingLine}
                </p>
                <p className="text-[13px] font-light text-muted-foreground mt-3">
                  Your personalised brand roadmap is almost ready ✨
                </p>
              </div>
            )}

            {/* ─── RESULT ─── */}
            {view === "result" && res && (
              <div className="animate-rise-in space-y-8">
                {/* Result Header */}
                <div>
                  <Eyebrow text="Your Brand Type" className="mb-6" />
                  <h2 className="font-display italic font-light text-foreground leading-[1.08]" style={{ fontSize: "clamp(36px, 8vw, 52px)" }}>
                    {res.title}
                  </h2>
                  <p className="font-display text-[19px] italic text-muted-foreground leading-[1.5] mt-3">
                    {res.tagline}
                  </p>
                </div>

                {/* Reasoning callout */}
                <div className="bg-dollhouse-p1/60 border border-dollhouse-p2/50 rounded-2xl p-5">
                  <p className="text-[13px] font-light text-dollhouse-text-mid leading-[1.75] italic">
                    💡 {res.reasoning}
                  </p>
                </div>

                {/* Body */}
                <p className="text-[14px] font-light text-dollhouse-text-mid leading-[1.9]">
                  {res.body}
                </p>

                {/* Needs */}
                <div>
                  <h3 className="font-accent text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
                    What you need next
                  </h3>
                  <div className="space-y-3">
                    {res.needs.map((n, i) => (
                      <div key={n} className="flex items-start gap-3">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-dollhouse-ink/10 flex items-center justify-center mt-0.5">
                          <span className="text-[10px]">{["✅", "🎯", "🚀"][i]}</span>
                        </span>
                        <span className="text-[13px] font-light text-foreground leading-[1.65]">{n}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary CTA */}
                <div className="bg-foreground rounded-2xl p-8 sm:p-10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-dollhouse-p3/30" />
                  <span className="font-accent text-[9px] tracking-[0.25em] uppercase text-background/30 block mb-3">
                    ✨ Recommended for you
                  </span>
                  <p className="font-display text-[26px] sm:text-[30px] italic font-light text-background leading-[1.2] mb-3">
                    {res.ctaHead}
                  </p>
                  <p className="text-[13px] font-light leading-[1.75] text-background/60 mb-7">
                    {res.ctaBody}
                  </p>
                  <a
                    href={res.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-dollhouse-p3 text-foreground font-accent text-[10px] font-bold tracking-[0.2em] uppercase px-8 py-3.5 rounded-2xl no-underline transition-all duration-300 hover:opacity-90 hover:shadow-lg"
                  >
                    {res.ctaBtn} →
                  </a>
                </div>

                {/* Secondary Products */}
                <div>
                  <h3 className="font-accent text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
                    Also from The Dollhouse
                  </h3>
                  <div className="grid gap-3">
                    {res.products.map((p) => (
                      <a
                        key={p.name}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-card border border-border/60 rounded-2xl overflow-hidden no-underline transition-all duration-200 hover:border-dollhouse-p3 hover:shadow-sm hover:scale-[1.01] flex items-stretch gap-0"
                      >
                        <div className="shrink-0 w-[90px] sm:w-[110px]">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div className="flex-1 min-w-0 p-4 flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2.5 mb-1">
                              <span className="font-accent text-[9px] font-semibold tracking-[0.2em] uppercase text-dollhouse-ink">{p.label}</span>
                            </div>
                            <div className="font-display text-[16px] text-foreground leading-[1.25] mb-1">{p.name}</div>
                            <div className="text-[11px] font-light text-muted-foreground leading-[1.6]">{p.desc}</div>
                          </div>
                          <div className="shrink-0 flex flex-col items-end gap-1">
                            <span className="font-display text-[18px] text-dollhouse-ink">{p.price}</span>
                            <span className="text-[12px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Share Card */}
                <div className="bg-foreground rounded-2xl p-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-dollhouse-p3/30" />
                  <div className="font-accent text-[9px] tracking-[0.3em] uppercase text-background/25 mb-1">The Dollhouse</div>
                  <div className="font-accent text-[8px] tracking-[0.25em] uppercase text-dollhouse-p3 mb-5">Brand Clarity Quiz</div>
                  <div className="font-display text-[32px] italic font-light text-background leading-[1.1] mb-2">{res.title}</div>
                  <div className="font-display text-[13px] italic text-background/50 max-w-[260px] mx-auto leading-[1.5] mb-4">{res.tagline}</div>
                  <div className="h-px w-3/5 mx-auto bg-dollhouse-p3/20 mb-4" />
                  <div className="font-accent text-[9px] tracking-[0.2em] uppercase text-dollhouse-p3">shopdollhouse.co</div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 flex-wrap">
                  <button
                    onClick={handleShare}
                    className="font-accent text-[10px] tracking-[0.15em] uppercase text-foreground bg-dollhouse-p1 border border-border px-6 py-3 rounded-2xl cursor-pointer flex items-center gap-2 transition-all duration-200 hover:bg-dollhouse-p2"
                  >
                    💌 Copy & Share
                  </button>
                  <button
                    onClick={handleRetake}
                    className="font-accent text-[10px] tracking-[0.14em] uppercase text-muted-foreground bg-transparent border-none cursor-pointer underline underline-offset-[3px] hover:text-foreground transition-colors"
                  >
                    ← Retake Quiz
                  </button>
                </div>

                {/* Footer */}
                <div className="text-center pt-8 border-t border-border/50">
                  <Link to="/" className="font-accent text-[9px] tracking-[3px] uppercase text-muted-foreground hover:text-foreground transition-colors no-underline">
                    ← Back to The Dollhouse
                  </Link>
                  <p className="font-accent text-[9px] tracking-[0.2em] uppercase text-muted-foreground mt-4">
                    © The Dollhouse Brand Studio ·{" "}
                    <a href="https://shopdollhouse.co" target="_blank" rel="noopener noreferrer" className="text-dollhouse-p3 no-underline hover:underline">
                      shopdollhouse.co
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
