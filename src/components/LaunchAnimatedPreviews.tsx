import { useEffect, useRef, useState } from "react";
import { CalendarCheck, Check, Moon } from "lucide-react";

/**
 * Animated device mock-ups for the "What is included" cards.
 * Dark devices with gold accents, each looping through a short story.
 * They only run while on screen, and show the finished state for
 * people who prefer reduced motion.
 */
const HEAD = "'Jost', sans-serif";
const BODY = "'DM Sans', sans-serif";
const DISPLAY = "'Cormorant Garamond', serif";
const GOLD = "#c6b282";
const CREAM = "#f5efe6";
const BG = "#0b0604";

function useStory(loopMs: number, marks: number[]) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      setElapsed(loopMs - 800);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [loopMs]);

  useEffect(() => {
    if (still || !visible) return;
    const start = performance.now();
    setElapsed(0);
    const id = window.setInterval(() => setElapsed((performance.now() - start) % loopMs), 100);
    return () => window.clearInterval(id);
  }, [visible, still, loopMs]);

  const step = marks.filter((t) => elapsed >= t).length;
  return { ref, step, elapsed };
}

function typed(text: string, from: number, perChar: number, elapsed: number) {
  const n = Math.max(0, Math.min(text.length, Math.floor((elapsed - from) / perChar)));
  return text.slice(0, n);
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[9px] uppercase tracking-[0.24em]" style={{ fontFamily: HEAD, color: "rgba(255,255,255,0.82)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}>
      <span style={{ color: GOLD }}>✦</span> {children}
    </span>
  );
}

function Typing() {
  return (
    <div className="phone-pop flex w-[58px] items-center gap-1.5 rounded-[14px] px-3.5 py-3" style={{ background: "rgba(198,178,130,0.12)", border: "1px solid rgba(198,178,130,0.3)" }}>
      {[0, 1, 2].map((i) => (
        <span key={i} className="phone-dot h-1.5 w-1.5 rounded-full" style={{ background: GOLD, animationDelay: `${i * 0.18}s` }} />
      ))}
    </div>
  );
}

function Msg({ mine, label, children }: { mine?: boolean; label: string; children: React.ReactNode }) {
  return (
    <div
      className={`phone-pop max-w-[88%] rounded-[14px] px-3 py-2 ${mine ? "" : "ml-auto"}`}
      style={mine ? { background: "rgba(198,178,130,0.12)", border: "1px solid rgba(198,178,130,0.3)" } : { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
    >
      <p className="text-[7px] uppercase tracking-[0.24em]" style={{ fontFamily: HEAD, color: mine ? "rgba(198,178,130,0.95)" : "rgba(255,255,255,0.45)" }}>{label}</p>
      <p className="mt-0.5 leading-snug" style={{ fontFamily: BODY, fontSize: "0.72rem", color: CREAM }}>{children}</p>
    </div>
  );
}

/** Compact iPhone frame (titanium edge, bezel, island, glare). */
function MiniPhone({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[236px]">
      <span className="absolute -left-[2px] top-[70px] h-5 w-[3px] rounded-l-sm" style={{ background: "#4a453d" }} />
      <span className="absolute -left-[2px] top-[108px] h-9 w-[3px] rounded-l-sm" style={{ background: "#4a453d" }} />
      <span className="absolute -right-[2px] top-[120px] h-14 w-[3px] rounded-r-sm" style={{ background: "#4a453d" }} />
      <div className="rounded-[44px] p-[3px]" style={{ background: "linear-gradient(145deg, #a39b8d 0%, #3d3934 22%, #14120f 50%, #4d483f 78%, #aaa294 100%)", boxShadow: "0 40px 70px -30px rgba(31,17,11,0.8)" }}>
        <div className="rounded-[41px] p-[7px]" style={{ background: "#020202" }}>
          <div className="relative flex flex-col overflow-hidden rounded-[34px]" style={{ background: `linear-gradient(180deg, #100a07 0%, ${BG} 100%)`, height: 421 }}>
            <div aria-hidden className="pointer-events-none absolute inset-0 z-30" style={{ background: "linear-gradient(118deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 28%, transparent 40%)" }} />
            <div className="absolute left-1/2 top-[9px] z-20 h-[20px] w-[72px] -translate-x-1/2 rounded-full bg-black" />
            <span aria-hidden className="absolute bottom-1.5 left-1/2 z-20 h-[3px] w-[84px] -translate-x-1/2 rounded-full" style={{ background: "rgba(255,255,255,0.65)" }} />
            <div className="flex min-h-0 flex-1 flex-col pt-[40px]">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DarkCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex h-[430px] w-full max-w-[400px] flex-col overflow-hidden rounded-[32px] p-6" style={{ background: BG, border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 40px 70px -30px rgba(31,17,11,0.8), inset 0 0 0 1px rgba(198,178,130,0.07)" }}>
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full" style={{ background: "radial-gradient(circle, rgba(198,178,130,0.16), transparent 70%)" }} />
      {children}
    </div>
  );
}

/* 1. Post studio: thirty posts get made, approved and scheduled */
const POST_TILES = [
  { t: "The one thing I check before every appointment.", a: "#2a1a13", b: "#1a0f0a", fg: CREAM },
  { t: "Why this customer came back three times.", a: "#f4dcdc", b: "#e7c2c0", fg: "#1f110b" },
  { t: "Three questions to ask before you hire anyone.", a: "#c6b282", b: "#a8946a", fg: "#1f110b" },
  { t: "What actually goes into a fair quote.", a: "#fffaf6", b: "#f1e3dc", fg: "#1f110b" },
  { t: "Small things show how something is cared for.", a: "#3a2418", b: "#24140d", fg: CREAM },
  { t: "Know what it costs. Know who to call.", a: "#efc9c3", b: "#e0aca5", fg: "#1f110b" },
];
const STUDIO_MARKS = [500, 1250, 2000, 2750, 3500, 4250, 6600, 8000];

export function PostStudioPreview() {
  const { ref, step, elapsed } = useStory(11500, STUDIO_MARKS);
  const progress = Math.min(1, elapsed / 6500);
  const count = step >= 7 ? 30 : Math.round(progress * 30);
  return (
    <div ref={ref} aria-hidden>
      <DarkCard>
        <div className="flex items-center justify-between">
          <Pill>Post studio</Pill>
          <span className="text-[9px] uppercase tracking-[0.2em]" style={{ fontFamily: HEAD, color: "rgba(255,255,255,0.45)" }}>This month</span>
        </div>
        <div className="mt-5 flex items-end justify-between">
          <p className="text-[9px] uppercase tracking-[0.24em]" style={{ fontFamily: HEAD, color: "rgba(255,255,255,0.5)" }}>Posts ready</p>
          <p style={{ fontFamily: DISPLAY, fontSize: "1.5rem", color: CREAM, lineHeight: 1 }}>
            {count}<span style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.45)" }}> / 30</span>
          </p>
        </div>
        <div className="mt-2 h-[5px] w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
          <div className="h-full rounded-full" style={{ width: `${(step >= 7 ? 1 : progress) * 100}%`, background: GOLD, transition: "width 0.1s linear" }} />
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2.5">
          {POST_TILES.map((p, i) => (
            <div key={p.t} className="aspect-square">
              {step > i && (
                <div className="phone-pop flex h-full items-center justify-center rounded-xl p-2 text-center" style={{ background: `linear-gradient(160deg, ${p.a}, ${p.b})`, border: "1px solid rgba(198,178,130,0.3)" }}>
                  <p className="italic leading-tight" style={{ fontFamily: DISPLAY, fontSize: "0.72rem", color: p.fg }}>{p.t}</p>
                </div>
              )}
              {step <= i && <div className="h-full rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.12)" }} />}
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-center gap-2 py-3 text-[9.5px] uppercase tracking-[0.24em]" style={{ fontFamily: HEAD, fontWeight: 600, border: `1px solid ${GOLD}`, borderRadius: 2, background: step >= 7 ? GOLD : "transparent", color: step >= 7 ? "#1f110b" : "rgba(198,178,130,0.9)", transition: "all 0.5s" }}>
            {step >= 8 ? <><Check className="h-3.5 w-3.5" /> Publishing daily</> : step >= 7 ? <><Check className="h-3.5 w-3.5" /> Approved by you</> : "Waiting for your approval"}
          </div>
          <p className="mt-3 text-center text-[8px] uppercase tracking-[0.24em]" style={{ fontFamily: HEAD, color: "rgba(198,178,130,0.8)" }}>Instagram + Facebook</p>
        </div>
      </DarkCard>
    </div>
  );
}

/* 2. Quote quiz on a phone */
const QUIZ_MARKS = [800, 2200, 3200, 4400, 5600, 6800, 8000];
export function QuizPhonePreview() {
  const { ref, step, elapsed } = useStory(12000, QUIZ_MARKS);
  const screen = step < 2 ? 1 : step < 4 ? 2 : step < 6 ? 3 : 4;
  const progress = screen === 1 ? 0.33 : screen === 2 ? 0.66 : 1;
  const opts1 = ["Service one", "Service two", "Not sure yet"];
  const opts2 = ["This week", "This month", "Just exploring"];
  const row = (label: string, on: boolean) => (
    <div key={label} className="flex items-center gap-2 rounded-xl px-3 py-2 transition-colors duration-500" style={{ background: on ? GOLD : "rgba(255,255,255,0.05)", border: `1px solid ${on ? GOLD : "rgba(255,255,255,0.1)"}` }}>
      <span className="h-3 w-3 rounded-full" style={{ border: `1.5px solid ${on ? "#1f110b" : "rgba(255,255,255,0.4)"}`, background: on ? "#1f110b" : "transparent" }} />
      <span style={{ fontFamily: BODY, fontSize: "0.72rem", color: on ? "#1f110b" : CREAM, fontWeight: on ? 600 : 400 }}>{label}</span>
    </div>
  );
  return (
    <div ref={ref} aria-hidden>
      <MiniPhone>
        <div className="px-4">
          <div className="flex justify-center"><Pill>Free quote</Pill></div>
          <div className="mt-3 h-[4px] w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div className="h-full rounded-full" style={{ width: `${progress * 100}%`, background: GOLD, transition: "width 0.6s ease" }} />
          </div>
        </div>
        <div key={screen} className="phone-pop mt-4 flex-1 px-4">
          {screen === 1 && (
            <>
              <p style={{ fontFamily: DISPLAY, fontSize: "1.1rem", color: CREAM, lineHeight: 1.15 }}>What do you need help with?</p>
              <div className="mt-3 grid gap-2">{opts1.map((o, i) => row(o, step >= 1 && i === 1))}</div>
            </>
          )}
          {screen === 2 && (
            <>
              <p style={{ fontFamily: DISPLAY, fontSize: "1.1rem", color: CREAM, lineHeight: 1.15 }}>When would you like to start?</p>
              <div className="mt-3 grid gap-2">{opts2.map((o, i) => row(o, step >= 3 && i === 0))}</div>
            </>
          )}
          {screen === 3 && (
            <>
              <p style={{ fontFamily: DISPLAY, fontSize: "1.1rem", color: CREAM, lineHeight: 1.15 }}>Where should we send your results?</p>
              <div className="mt-3 grid gap-2">
                {[["NAME", typed("Alex Morgan", 4400, 110, elapsed)], ["PHONE", typed("(555) 123-4567", 5000, 70, elapsed)]].map(([l, v]) => (
                  <div key={l} className="rounded-xl px-3 py-2" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <p className="text-[7px] uppercase tracking-[0.24em]" style={{ fontFamily: HEAD, color: "rgba(255,255,255,0.4)" }}>{l}</p>
                    <p className="mt-0.5 h-4" style={{ fontFamily: BODY, fontSize: "0.74rem", color: CREAM }}>{v}<span className="phone-dot ml-px inline-block h-3 w-px align-middle" style={{ background: GOLD }} /></p>
                  </div>
                ))}
              </div>
            </>
          )}
          {screen === 4 && (
            <div className="flex flex-col items-center pt-3 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: GOLD, color: "#1f110b" }}><Check className="h-6 w-6" strokeWidth={3} /></span>
              <p className="mt-3" style={{ fontFamily: DISPLAY, fontSize: "1.2rem", color: CREAM }}>Your results are ready</p>
              <p className="mt-1" style={{ fontFamily: BODY, fontSize: "0.7rem", color: "rgba(255,255,255,0.55)" }}>Personalized to your answers.</p>
            </div>
          )}
        </div>
        <div className="px-4 pb-5">
          {step >= 7 ? (
            <div className="phone-pop flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[8.5px] uppercase tracking-[0.2em]" style={{ fontFamily: HEAD, fontWeight: 600, background: "rgba(198,178,130,0.14)", border: `1px solid ${GOLD}`, color: GOLD }}>
              <Check className="h-3 w-3" /> New inquiry saved
            </div>
          ) : (
            <div className="py-2.5 text-center text-[8.5px] uppercase tracking-[0.22em]" style={{ fontFamily: HEAD, fontWeight: 600, background: GOLD, color: "#1f110b", borderRadius: 2 }}>
              {screen === 4 ? "Results ready" : "Continue"}
            </div>
          )}
        </div>
      </MiniPhone>
    </div>
  );
}

/* 3. Comment turns into an instant private reply */
const REPLY_MARKS = [900, 1900, 2800, 4100, 5000, 6300, 7600];
export function RepliesPreview() {
  const { ref, step, elapsed } = useStory(11500, REPLY_MARKS);
  const comment = typed("QUOTE", 400, 160, elapsed);
  return (
    <div ref={ref} aria-hidden>
      <DarkCard>
        <div className="flex items-center justify-between">
          <Pill>Comment to message</Pill>
          <span className="text-[9px] uppercase tracking-[0.2em]" style={{ fontFamily: HEAD, color: GOLD }}>Automatic</span>
        </div>

        <div className="mt-5 rounded-2xl p-3.5" style={{ background: "rgba(255,255,255,0.045)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="flex items-start gap-2.5">
            <span className="h-8 w-8 shrink-0 rounded-full" style={{ background: "linear-gradient(135deg, #3a2418, #24140d)", border: `1px solid ${GOLD}` }} />
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em]" style={{ fontFamily: HEAD, color: "rgba(255,255,255,0.45)" }}>Your customer commented</p>
              <p className="mt-1 h-5" style={{ fontFamily: HEAD, fontSize: "0.95rem", letterSpacing: "0.2em", color: CREAM, fontWeight: 500 }}>
                {comment}<span className="phone-dot ml-0.5 inline-block h-3.5 w-px align-middle" style={{ background: GOLD }} />
              </p>
            </div>
          </div>
        </div>

        <div className="my-2.5 flex items-center justify-center gap-2" style={{ opacity: step >= 1 ? 1 : 0.2, transition: "opacity 0.5s" }}>
          <span className="h-px w-8" style={{ background: GOLD, opacity: 0.6 }} />
          <span className="text-[8px] uppercase tracking-[0.26em]" style={{ fontFamily: HEAD, color: GOLD }}>Instant private reply</span>
          <span className="h-px w-8" style={{ background: GOLD, opacity: 0.6 }} />
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-end gap-2.5 overflow-hidden">
          {step >= 3 && <Msg mine label="Your business · Auto reply">Hi! Thanks for asking. Which service are you looking for?</Msg>}
          {step >= 4 && <Msg label="Customer">Service two, please.</Msg>}
          {step === 2 && <Typing />}
          {step === 5 && <Typing />}
          {step >= 6 && <Msg mine label="Your business · Auto reply">Perfect. Here is the link to book a time that suits you.</Msg>}
        </div>

        <div className="mt-3 flex h-10 items-center justify-center">
          {step >= 7 ? (
            <div className="phone-pop flex w-full items-center justify-center gap-2 py-2.5 text-[9px] uppercase tracking-[0.22em]" style={{ fontFamily: HEAD, fontWeight: 600, border: `1px solid ${GOLD}`, color: GOLD, borderRadius: 2, background: "rgba(198,178,130,0.12)" }}>
              <Check className="h-3.5 w-3.5" /> Contact saved for follow-up
            </div>
          ) : (
            <p className="text-[8px] uppercase tracking-[0.24em]" style={{ fontFamily: HEAD, color: "rgba(255,255,255,0.35)" }}>Replying automatically</p>
          )}
        </div>
      </DarkCard>
    </div>
  );
}

/* 4. After-hours follow-up that books the appointment */
const BOOK_MARKS = [800, 2000, 3200, 4400, 5600, 6800];
export function BookingPhonePreview() {
  const { ref, step } = useStory(11500, BOOK_MARKS);
  const slots = ["Tue 10:00", "Wed 2:30", "Fri 11:00"];
  const booked = step >= 6;
  return (
    <div ref={ref} aria-hidden>
      <MiniPhone>
        <div className="flex items-center justify-between px-4">
          <span className="flex items-center gap-1.5 text-[8px] uppercase tracking-[0.2em]" style={{ fontFamily: HEAD, color: GOLD }}><Moon className="h-3 w-3" /> After hours</span>
          <span style={{ fontFamily: BODY, fontSize: "0.68rem", color: "rgba(255,255,255,0.55)" }}>10:42 PM</span>
        </div>
        <div className="mt-3 flex min-h-0 flex-1 flex-col justify-start gap-2 px-4">
          {step >= 1 && <Msg label="New inquiry">Hi, do you have any availability this week?</Msg>}
          {step === 1 && <Typing />}
          {step >= 2 && <Msg mine label="Your business · Auto reply">Thanks for reaching out! Here are a few times that work. Pick one and you are booked.</Msg>}
          {step >= 3 && (
            <div className="phone-pop grid grid-cols-3 gap-1.5">
              {slots.map((s, i) => {
                const on = step >= 4 && i === 1;
                return (
                  <div key={s} className="rounded-lg py-1.5 text-center transition-colors duration-500" style={{ fontFamily: BODY, fontSize: "0.62rem", background: on ? GOLD : "rgba(255,255,255,0.06)", color: on ? "#1f110b" : CREAM, border: `1px solid ${on ? GOLD : "rgba(255,255,255,0.12)"}`, fontWeight: on ? 600 : 400 }}>{s}</div>
                );
              })}
            </div>
          )}
          {step >= 5 && (
            <div className="phone-pop rounded-xl p-2.5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 14 }).map((_, n) => (
                  <span key={n} className="flex h-4 items-center justify-center rounded-full text-[7px]" style={{ background: n === 9 ? GOLD : "transparent", color: n === 9 ? "#1f110b" : "rgba(255,255,255,0.4)", fontFamily: BODY, fontWeight: n === 9 ? 700 : 400 }}>{n + 6}</span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="px-4 pb-5">
          <div className="flex items-center justify-center gap-1.5 py-2.5 text-[8.5px] uppercase tracking-[0.2em] transition-all duration-500" style={{ fontFamily: HEAD, fontWeight: 600, border: `1px solid ${GOLD}`, borderRadius: 2, background: booked ? GOLD : "transparent", color: booked ? "#1f110b" : "rgba(198,178,130,0.85)" }}>
            {booked ? <><CalendarCheck className="h-3.5 w-3.5" /> Appointment booked</> : "Following up automatically"}
          </div>
        </div>
      </MiniPhone>
    </div>
  );
}
