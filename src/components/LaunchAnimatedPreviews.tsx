import { useEffect, useRef, useState } from "react";
import { Check, ChevronLeft, Heart, Lock, MessageCircle, Send } from "lucide-react";
import archMark from "@/assets/arch-mark.svg";

/**
 * Animated, realistic app screens inside iPhones for the "What is included" cards.
 * Each one loops through a short story, only runs while on screen, and shows
 * the finished state for people who prefer reduced motion.
 */
const SANS = "-apple-system, 'SF Pro Text', 'Inter', 'DM Sans', system-ui, sans-serif";
const BODY = "'DM Sans', sans-serif";
const DISPLAY = "'Cormorant Garamond', serif";
const GOLD = "#c6b282";
const CHOC = "#1f110b";
const IOS_BLUE = "#0a84ff";
const IOS_GRAY = "#e9e9eb";

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

function StatusBar({ dark = false }: { dark?: boolean }) {
  const c = dark ? "#fff" : "#111";
  return (
    <div className="flex items-center justify-between px-6 pt-[13px]" style={{ fontFamily: SANS, fontSize: "0.7rem", fontWeight: 600, color: c }}>
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <svg width="15" height="10" viewBox="0 0 16 10" fill="currentColor"><rect x="0" y="6" width="2.6" height="4" rx="0.6" /><rect x="4.4" y="4" width="2.6" height="6" rx="0.6" /><rect x="8.8" y="2" width="2.6" height="8" rx="0.6" /><rect x="13.2" y="0" width="2.6" height="10" rx="0.6" /></svg>
        <svg width="20" height="10" viewBox="0 0 20 10" fill="none"><rect x="0.5" y="0.5" width="16" height="9" rx="2.4" stroke="currentColor" opacity="0.45" /><rect x="2" y="2" width="13" height="6" rx="1.4" fill="currentColor" /><rect x="17.5" y="3.2" width="1.6" height="3.6" rx="0.8" fill="currentColor" opacity="0.45" /></svg>
      </span>
    </div>
  );
}

/** iPhone 15 style device: titanium edge, thin bezel, island, light screen. */
function Phone({ children, bg = "#ffffff" }: { children: React.ReactNode; bg?: string }) {
  const edge = "linear-gradient(145deg, #b4ad9f 0%, #4a453d 20%, #1b1915 50%, #5a554c 78%, #bab3a4 100%)";
  return (
    <div className="relative mx-auto w-[252px]">
      <span className="absolute -left-[2px] top-[72px] h-5 w-[3px] rounded-l-sm" style={{ background: "#5a554c" }} />
      <span className="absolute -left-[2px] top-[112px] h-9 w-[3px] rounded-l-sm" style={{ background: "#5a554c" }} />
      <span className="absolute -left-[2px] top-[156px] h-9 w-[3px] rounded-l-sm" style={{ background: "#5a554c" }} />
      <span className="absolute -right-[2px] top-[124px] h-14 w-[3px] rounded-r-sm" style={{ background: "#5a554c" }} />
      <div className="rounded-[46px] p-[3px]" style={{ background: edge, boxShadow: "0 50px 80px -34px rgba(31,17,11,0.75), 0 18px 34px -18px rgba(0,0,0,0.5)" }}>
        <div className="rounded-[43px] p-[6px]" style={{ background: "#050505" }}>
          <div className="relative flex flex-col overflow-hidden rounded-[37px]" style={{ background: bg, height: 456, fontFamily: SANS }}>
            <div className="absolute left-1/2 top-[8px] z-30 h-[21px] w-[74px] -translate-x-1/2 rounded-full bg-black" />
            <div aria-hidden className="pointer-events-none absolute inset-0 z-40" style={{ background: "linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 22%, transparent 36%)" }} />
            <span aria-hidden className="absolute bottom-1.5 left-1/2 z-30 h-[4px] w-[88px] -translate-x-1/2 rounded-full" style={{ background: "#111", opacity: 0.85 }} />
            <StatusBar />
            <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── 1. Instagram profile: thirty posts fill the grid ───────── */
const GRID = [
  { t: "The one thing I check before every appointment.", a: "#2a1a13", b: "#1a0f0a", fg: "#f5efe6" },
  { t: "Why this customer came back three times.", a: "#f4dcdc", b: "#e7c2c0", fg: CHOC },
  { t: "Three questions to ask before you hire anyone.", a: "#c6b282", b: "#a8946a", fg: CHOC },
  { t: "What goes into a fair quote.", a: "#fffaf6", b: "#efe1d9", fg: CHOC },
  { t: "Small things show how something is cared for.", a: "#3a2418", b: "#24140d", fg: "#f5efe6" },
  { t: "Know what it costs. Know who to call.", a: "#efc9c3", b: "#e0aca5", fg: CHOC },
  { t: "Booked out this week? Here is how.", a: "#e8d9c4", b: "#cdb894", fg: CHOC },
  { t: "Questions we hear every week.", a: "#d9a9a3", b: "#c58a85", fg: CHOC },
  { t: "How the process works, step by step.", a: "#fffaf6", b: "#f1e3dc", fg: CHOC },
];
const PROFILE_MARKS = [600, 1100, 1600, 2100, 2600, 3100, 3600, 4100, 4600, 7000];

export function PostStudioPreview() {
  const { ref, step, elapsed } = useStory(12000, PROFILE_MARKS);
  const count = step >= 10 ? 30 : Math.min(30, Math.round((elapsed / 5200) * 30));
  const scheduled = step >= 10;
  return (
    <div ref={ref} aria-hidden>
      <Phone>
        <div className="flex items-center justify-between px-4 pb-2 pt-3" style={{ color: "#111" }}>
          <span className="flex items-center gap-1" style={{ fontSize: "0.82rem", fontWeight: 700 }}><Lock className="h-3 w-3" strokeWidth={2.5} /> yourbusiness</span>
          <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>≡</span>
        </div>
        <div className="flex items-center gap-4 px-4">
          <span className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full p-[2px]" style={{ background: `linear-gradient(135deg, #e6dcc0, ${GOLD}, #a8946a)` }}>
            <span className="flex h-full w-full items-center justify-center rounded-full bg-white"><img src={archMark} alt="" className="h-6 w-auto" /></span>
          </span>
          <div className="grid flex-1 grid-cols-3 text-center" style={{ color: "#111" }}>
            {[[String(count), "Posts"], ["2", "Platforms"], ["Daily", "Posting"]].map(([n, l]) => (
              <div key={l}>
                <p style={{ fontSize: "0.9rem", fontWeight: 700, lineHeight: 1.1 }}>{n}</p>
                <p style={{ fontSize: "0.6rem", color: "#666" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 px-4" style={{ color: "#111" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700 }}>Your Business</p>
          <p style={{ fontSize: "0.66rem", color: "#555", lineHeight: 1.3 }}>Local services · Your town<br />Book online below ↓</p>
        </div>
        <div className="mt-2.5 flex gap-1.5 px-4">
          {["Book now", "Message"].map((l, i) => (
            <span key={l} className="flex-1 rounded-lg py-1.5 text-center" style={{ fontSize: "0.66rem", fontWeight: 600, background: i === 0 ? CHOC : "#efefef", color: i === 0 ? "#fff" : "#111" }}>{l}</span>
          ))}
        </div>
        <div className="mt-2.5 flex border-t" style={{ borderColor: "#e4e4e4" }}>
          <span className="flex-1 border-b-2 py-1.5 text-center" style={{ borderColor: "#111", fontSize: "0.7rem" }}>▦</span>
          <span className="flex-1 py-1.5 text-center" style={{ fontSize: "0.7rem", color: "#999" }}>▷</span>
          <span className="flex-1 py-1.5 text-center" style={{ fontSize: "0.7rem", color: "#999" }}>☺</span>
        </div>
        <div className="grid grid-cols-3 gap-[2px]">
          {GRID.map((g, i) => (
            <div key={g.t} className="aspect-square">
              {step > i ? (
                <div className="phone-pop flex h-full items-center justify-center p-1.5 text-center" style={{ background: `linear-gradient(160deg, ${g.a}, ${g.b})` }}>
                  <p className="italic leading-tight" style={{ fontFamily: DISPLAY, fontSize: "0.6rem", color: g.fg }}>{g.t}</p>
                </div>
              ) : (
                <div className="h-full" style={{ background: "#f1f1f1" }} />
              )}
            </div>
          ))}
        </div>
        {scheduled && (
          <div className="phone-pop absolute inset-x-3 bottom-5 z-20 flex items-center gap-2.5 rounded-2xl px-3 py-2.5" style={{ background: "rgba(25,25,25,0.94)", boxShadow: "0 12px 30px -10px rgba(0,0,0,0.5)" }}>
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: GOLD, color: CHOC }}><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
            <p style={{ fontSize: "0.66rem", color: "#fff", lineHeight: 1.25 }}><b>30 posts scheduled</b><br /><span style={{ color: "rgba(255,255,255,0.65)" }}>Publishing daily after your approval</span></p>
          </div>
        )}
      </Phone>
    </div>
  );
}

/* ───────── 2. Safari: the quote quiz on the business's website ───────── */
const QUIZ_MARKS = [800, 2200, 3200, 4400, 5600, 6800, 8000];
export function QuizPhonePreview() {
  const { ref, step, elapsed } = useStory(12000, QUIZ_MARKS);
  const screen = step < 2 ? 1 : step < 4 ? 2 : step < 6 ? 3 : 4;
  const opts1 = ["Service one", "Service two", "Not sure yet"];
  const opts2 = ["This week", "This month", "Just exploring"];
  const option = (label: string, on: boolean) => (
    <div key={label} className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 transition-all duration-500" style={{ border: `1.5px solid ${on ? CHOC : "#dcdcdc"}`, background: on ? "#faf6f0" : "#fff" }}>
      <span className="flex h-4 w-4 items-center justify-center rounded-full" style={{ border: `1.5px solid ${on ? CHOC : "#bbb"}` }}>{on && <span className="h-2 w-2 rounded-full" style={{ background: CHOC }} />}</span>
      <span style={{ fontSize: "0.74rem", color: "#111", fontWeight: on ? 600 : 400 }}>{label}</span>
    </div>
  );
  return (
    <div ref={ref} aria-hidden>
      <Phone>
        <div className="px-3 pt-2">
          <div className="flex items-center justify-center gap-1.5 rounded-xl py-1.5" style={{ background: "#efefef", fontSize: "0.66rem", color: "#333" }}>
            <Lock className="h-2.5 w-2.5" /> yourbusiness.com/quote
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 px-4">
          <img src={archMark} alt="" className="h-5 w-auto" />
          <span style={{ fontFamily: DISPLAY, fontSize: "0.95rem", color: CHOC, fontWeight: 600 }}>Your Business</span>
        </div>
        <div className="mt-3 px-4">
          <p style={{ fontSize: "0.6rem", color: "#888", letterSpacing: "0.04em" }}>{screen === 4 ? "DONE" : `STEP ${screen} OF 3`}</p>
          <div className="mt-1 flex gap-1">
            {[1, 2, 3].map((n) => (
              <span key={n} className="h-1 flex-1 rounded-full transition-colors duration-500" style={{ background: n <= (screen === 4 ? 3 : screen) ? CHOC : "#e3e3e3" }} />
            ))}
          </div>
        </div>
        <div key={screen} className="phone-pop mt-4 flex-1 px-4">
          {screen === 1 && (
            <>
              <p style={{ fontFamily: DISPLAY, fontSize: "1.25rem", color: "#111", lineHeight: 1.1, fontWeight: 600 }}>What do you need help with?</p>
              <div className="mt-3 grid gap-2">{opts1.map((o, i) => option(o, step >= 1 && i === 1))}</div>
            </>
          )}
          {screen === 2 && (
            <>
              <p style={{ fontFamily: DISPLAY, fontSize: "1.25rem", color: "#111", lineHeight: 1.1, fontWeight: 600 }}>When would you like to start?</p>
              <div className="mt-3 grid gap-2">{opts2.map((o, i) => option(o, step >= 3 && i === 0))}</div>
            </>
          )}
          {screen === 3 && (
            <>
              <p style={{ fontFamily: DISPLAY, fontSize: "1.25rem", color: "#111", lineHeight: 1.1, fontWeight: 600 }}>Where should we send your results?</p>
              <div className="mt-3 grid gap-2">
                {[["Full name", typed("Alex Morgan", 4400, 110, elapsed)], ["Phone number", typed("(555) 123-4567", 5000, 70, elapsed)]].map(([l, v]) => (
                  <div key={l} className="rounded-xl px-3 py-1.5" style={{ border: "1.5px solid #dcdcdc" }}>
                    <p style={{ fontSize: "0.56rem", color: "#888" }}>{l}</p>
                    <p className="h-4" style={{ fontSize: "0.76rem", color: "#111" }}>{v}<span className="phone-dot ml-px inline-block h-3 w-px align-middle" style={{ background: IOS_BLUE }} /></p>
                  </div>
                ))}
              </div>
            </>
          )}
          {screen === 4 && (
            <div className="flex flex-col items-center pt-4 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: CHOC, color: GOLD }}><Check className="h-6 w-6" strokeWidth={3} /></span>
              <p className="mt-3" style={{ fontFamily: DISPLAY, fontSize: "1.3rem", color: "#111", fontWeight: 600 }}>Your results are ready</p>
              <p className="mt-1" style={{ fontSize: "0.7rem", color: "#666" }}>Personalized to your answers.</p>
            </div>
          )}
        </div>
        <div className="px-4 pb-7">
          <div className="rounded-xl py-2.5 text-center" style={{ background: CHOC, color: "#fff", fontSize: "0.74rem", fontWeight: 600 }}>
            {screen === 4 ? "View my results" : screen === 3 ? "Get my results" : "Continue"}
          </div>
        </div>
        {step >= 7 && (
          <div className="phone-pop absolute inset-x-3 top-[40px] z-20 flex items-center gap-2.5 rounded-2xl px-3 py-2.5" style={{ background: "rgba(255,255,255,0.97)", boxShadow: "0 14px 34px -10px rgba(0,0,0,0.35)", border: "1px solid #ececec" }}>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ background: CHOC }}><img src={archMark} alt="" className="h-4 w-auto" /></span>
            <p style={{ fontSize: "0.64rem", color: "#111", lineHeight: 1.25 }}><b>New inquiry saved</b><br /><span style={{ color: "#666" }}>Alex Morgan · Service two · This week</span></p>
          </div>
        )}
      </Phone>
    </div>
  );
}

/* ───────── 3. Instagram: comment, push notification, private reply ───────── */
const REPLY_MARKS = [1700, 2900, 4400, 5400, 6400, 7500, 8800];
export function RepliesPreview() {
  const { ref, step, elapsed } = useStory(12500, REPLY_MARKS);
  const comment = typed("QUOTE", 300, 190, elapsed);
  const dm = step >= 3;
  const avatar = (c: string) => <span className="h-6 w-6 shrink-0 rounded-full" style={{ background: c }} />;
  return (
    <div ref={ref} aria-hidden>
      <Phone>
        {!dm ? (
          <>
            <div className="flex items-center justify-center border-b pb-2 pt-3" style={{ borderColor: "#eee", fontSize: "0.78rem", fontWeight: 700, color: "#111" }}>Comments</div>
            <div className="flex-1 overflow-hidden px-3.5 pt-3">
              <div className="flex gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white" style={{ border: `1.5px solid ${GOLD}` }}><img src={archMark} alt="" className="h-3.5 w-auto" /></span>
                <p style={{ fontSize: "0.7rem", color: "#111", lineHeight: 1.35 }}><b>yourbusiness</b> Comment <b>QUOTE</b> and we will send you a free quote today.</p>
              </div>
              {step >= 1 && (
                <div className="phone-pop mt-3 flex gap-2.5">
                  {avatar("linear-gradient(135deg,#d9a9a3,#c58a85)")}
                  <div className="flex-1">
                    <p style={{ fontSize: "0.7rem", color: "#111" }}><b>you</b> QUOTE</p>
                    <p style={{ fontSize: "0.6rem", color: "#888" }}>now · Reply</p>
                  </div>
                  <Heart className="h-3.5 w-3.5" style={{ color: "#999" }} />
                </div>
              )}
              {[["sarah.m", "Love this! 😍"], ["jamie_k", "Do you cover my area?"]].map(([u, t], i) => (
                <div key={u} className="mt-3 flex gap-2.5">
                  {avatar(i ? "linear-gradient(135deg,#e8d9c4,#cdb894)" : "linear-gradient(135deg,#bfc9d4,#9aa8b8)")}
                  <div className="flex-1">
                    <p style={{ fontSize: "0.7rem", color: "#111" }}><b>{u}</b> {t}</p>
                    <p style={{ fontSize: "0.6rem", color: "#888" }}>{i ? "2h" : "5h"} · Reply</p>
                  </div>
                  <Heart className="h-3.5 w-3.5" style={{ color: "#999" }} />
                </div>
              ))}
            </div>
            <div className="mx-3 mb-6 flex items-center gap-2 rounded-full border px-3 py-2" style={{ borderColor: "#ddd" }}>
              <span className="h-5 w-5 rounded-full" style={{ background: "linear-gradient(135deg,#d9a9a3,#c58a85)" }} />
              <p className="flex-1" style={{ fontSize: "0.7rem", color: step >= 1 ? "#aaa" : "#111" }}>
                {step >= 1 ? "Add a comment..." : comment || "Add a comment..."}
                {step < 1 && comment && <span className="phone-dot ml-px inline-block h-3 w-px align-middle" style={{ background: IOS_BLUE }} />}
              </p>
              <span style={{ fontSize: "0.7rem", color: IOS_BLUE, fontWeight: 700, opacity: step < 1 && comment.length === 5 ? 1 : 0.35 }}>Post</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 border-b px-3 pb-2 pt-3" style={{ borderColor: "#eee" }}>
              <ChevronLeft className="h-4 w-4" style={{ color: "#111" }} />
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white" style={{ border: `1.5px solid ${GOLD}` }}><img src={archMark} alt="" className="h-3.5 w-auto" /></span>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#111", lineHeight: 1.15 }}>yourbusiness<br /><span style={{ fontWeight: 400, color: "#888", fontSize: "0.6rem" }}>Active now</span></p>
            </div>
            <div className="flex flex-1 flex-col justify-end gap-1.5 overflow-hidden px-3 pb-3">
              <p className="mb-1 text-center" style={{ fontSize: "0.58rem", color: "#999" }}>Today 9:41 PM</p>
              <div className="phone-pop max-w-[82%] rounded-[16px] px-3 py-2" style={{ background: IOS_GRAY, fontSize: "0.7rem", color: "#111", lineHeight: 1.3 }}>Hi! Thanks for asking. Which service are you looking for?</div>
              {step >= 4 && <div className="phone-pop ml-auto max-w-[70%] rounded-[16px] px-3 py-2" style={{ background: "linear-gradient(135deg,#7a5cff,#a14bff)", fontSize: "0.7rem", color: "#fff" }}>Service two, please.</div>}
              {step === 5 && (
                <div className="phone-pop flex w-[52px] items-center gap-1 rounded-[16px] px-3 py-3" style={{ background: IOS_GRAY }}>
                  {[0, 1, 2].map((i) => <span key={i} className="phone-dot h-1.5 w-1.5 rounded-full" style={{ background: "#999", animationDelay: `${i * 0.18}s` }} />)}
                </div>
              )}
              {step >= 6 && (
                <div className="phone-pop max-w-[82%] rounded-[16px] p-2" style={{ background: IOS_GRAY }}>
                  <p className="px-1 pb-1.5" style={{ fontSize: "0.7rem", color: "#111", lineHeight: 1.3 }}>Perfect. Here is the link to book a time that suits you.</p>
                  <div className="flex items-center gap-2 rounded-xl bg-white p-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: CHOC }}><img src={archMark} alt="" className="h-4 w-auto" /></span>
                    <p style={{ fontSize: "0.62rem", color: "#111", lineHeight: 1.2 }}><b>Book your appointment</b><br /><span style={{ color: "#888" }}>yourbusiness.com/book</span></p>
                  </div>
                </div>
              )}
              {step >= 7 && (
                <p className="phone-pop mt-1 flex items-center justify-center gap-1" style={{ fontSize: "0.6rem", color: "#7a6a3a", fontWeight: 600 }}><Check className="h-3 w-3" /> Contact saved for follow-up</p>
              )}
              <div className="mt-1 flex items-center gap-2 rounded-full border px-3 py-1.5" style={{ borderColor: "#ddd" }}>
                <p className="flex-1" style={{ fontSize: "0.68rem", color: "#aaa" }}>Message...</p>
                <Send className="h-3.5 w-3.5" style={{ color: "#999" }} />
              </div>
            </div>
          </>
        )}
        {step >= 2 && step < 3 && (
          <div className="phone-pop absolute inset-x-2.5 top-[36px] z-20 flex items-start gap-2.5 rounded-[18px] px-3 py-2.5" style={{ background: "rgba(248,248,248,0.97)", boxShadow: "0 14px 34px -10px rgba(0,0,0,0.4)", border: "1px solid #e8e8e8" }}>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg,#f9a03f,#e1306c,#833ab4)" }}><MessageCircle className="h-4 w-4 text-white" /></span>
            <p style={{ fontSize: "0.64rem", color: "#111", lineHeight: 1.25 }}><b>yourbusiness</b> <span style={{ color: "#888" }}>· now</span><br />Hi! Thanks for asking. Which service are you looking for?</p>
          </div>
        )}
      </Phone>
    </div>
  );
}

/* ───────── 4. iMessage: after-hours follow-up that books the appointment ───────── */
const BOOK_MARKS = [800, 2000, 3200, 4400, 5800, 7200, 8600];
export function BookingPhonePreview() {
  const { ref, step } = useStory(12500, BOOK_MARKS);
  const slots = ["Tue 10:00", "Wed 2:30", "Fri 11:00"];
  const Typing = () => (
    <div className="phone-pop flex w-[52px] items-center gap-1 rounded-[16px] px-3 py-3" style={{ background: IOS_GRAY }}>
      {[0, 1, 2].map((i) => <span key={i} className="phone-dot h-1.5 w-1.5 rounded-full" style={{ background: "#999", animationDelay: `${i * 0.18}s` }} />)}
    </div>
  );
  return (
    <div ref={ref} aria-hidden>
      <Phone>
        <div className="flex flex-col items-center border-b pb-2 pt-2" style={{ borderColor: "#eee" }}>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white" style={{ border: `1.5px solid ${GOLD}` }}><img src={archMark} alt="" className="h-4 w-auto" /></span>
          <p className="mt-1" style={{ fontSize: "0.66rem", color: "#111", fontWeight: 600 }}>Your Business</p>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-1.5 overflow-hidden px-3 pb-8">
          <p className="mb-1 text-center" style={{ fontSize: "0.58rem", color: "#999" }}>Today 10:42 PM</p>
          {step >= 1 && <div className="phone-pop ml-auto max-w-[78%] rounded-[16px] px-3 py-2" style={{ background: IOS_BLUE, color: "#fff", fontSize: "0.7rem", lineHeight: 1.3 }}>Hi, do you have any availability this week?</div>}
          {step === 2 && <Typing />}
          {step >= 3 && <div className="phone-pop max-w-[80%] rounded-[16px] px-3 py-2" style={{ background: IOS_GRAY, color: "#111", fontSize: "0.7rem", lineHeight: 1.3 }}>Thanks for reaching out! Here are a few times that work. Pick one and you are booked.</div>}
          {step >= 4 && (
            <div className="phone-pop grid max-w-[88%] grid-cols-3 gap-1.5 rounded-[16px] p-2" style={{ background: IOS_GRAY }}>
              {slots.map((s, i) => {
                const on = step >= 5 && i === 1;
                return <span key={s} className="rounded-lg py-1.5 text-center transition-colors duration-500" style={{ fontSize: "0.6rem", background: on ? IOS_BLUE : "#fff", color: on ? "#fff" : "#111", fontWeight: on ? 600 : 500 }}>{s}</span>;
              })}
            </div>
          )}
          {step >= 5 && <div className="phone-pop ml-auto max-w-[70%] rounded-[16px] px-3 py-2" style={{ background: IOS_BLUE, color: "#fff", fontSize: "0.7rem" }}>Wednesday at 2:30 works!</div>}
          {step >= 6 && (
            <div className="phone-pop flex max-w-[88%] items-center gap-2.5 rounded-[16px] p-2.5" style={{ background: IOS_GRAY }}>
              <span className="flex h-10 w-10 shrink-0 flex-col items-center overflow-hidden rounded-lg bg-white text-center" style={{ border: "1px solid #ddd" }}>
                <span className="w-full py-px" style={{ background: "#ff3b30", color: "#fff", fontSize: "0.4rem", fontWeight: 700 }}>WED</span>
                <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111", lineHeight: 1.3 }}>14</span>
              </span>
              <p style={{ fontSize: "0.66rem", color: "#111", lineHeight: 1.25 }}><b>Appointment booked</b><br /><span style={{ color: "#666" }}>Wed 2:30 PM · Your Business</span></p>
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: "#34c759", color: "#fff" }}><Check className="h-3 w-3" strokeWidth={3} /></span>
            </div>
          )}
          {step >= 7 && <p className="phone-pop text-right" style={{ fontSize: "0.56rem", color: "#999" }}>Delivered</p>}
        </div>
      </Phone>
    </div>
  );
}
