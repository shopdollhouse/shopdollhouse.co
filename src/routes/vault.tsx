import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { usePageMeta } from "@/lib/use-page-meta";

export const Route = createFileRoute("/vault")({ component: VaultPage });

/* ── Tokens ──────────────────────────────────────────── */
const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";

const INK = "var(--ink)";
const ROSE = "var(--rose)";
const CREAM = "var(--cream)";
const ROSE_HEX = "#bd7476";
const GOLD = "#C8A864";
const BLUSH = "#FBEDE9";

const STORAGE_KEY = "dh-vault-unlocked";

interface Room {
  n: number;
  name: string;
  tool: string;
  code: string;
}

const ROOMS: Room[] = [
  { n: 1, name: "Entry Hall", tool: "Word of the Year spinner", code: "ENTRY-001" },
  { n: 2, name: "Content Room", tool: "What should I post today?", code: "CONTENT-002" },
  { n: 3, name: "Revenue Room", tool: "Money mantra generator", code: "REVENUE-003" },
  { n: 4, name: "Brand Room", tool: "Brand colour mood picker", code: "BRAND-004" },
  { n: 5, name: "CEO Suite", tool: "Aesthetic focus timer", code: "CEO-005" },
  { n: 6, name: "Soft Life Suite", tool: "How are you feeling?", code: "SOFT-006" },
  { n: 7, name: "Vision Room", tool: "Manifest button", code: "VISION-007" },
  { n: 8, name: "Penthouse Lounge", tool: "Rich girl affirmations", code: "PENT-008" },
  { n: 9, name: "Self-Made Room", tool: "Did you show up today?", code: "SELF-009" },
  { n: 10, name: "Million Dollar Room", tool: "Win jar", code: "MILLION-010" },
  { n: 11, name: "Gratitude Room", tool: "Gratitude jar", code: "GRATITUDE-011" },
  { n: 12, name: "Founder's Penthouse", tool: "The Vault — all 12 tools", code: "VAULT-012" },
];

const pad = (n: number) => String(n).padStart(2, "0");

/* ── Working tool: Soft Life "How are you feeling?" ──── */
const MOODS: { label: string; msg: string }[] = [
  { label: "Amazing", msg: "Yes!! Ride this wave today, gorgeous. Bottle this feeling — you earned it. 🩷" },
  { label: "Good", msg: "Love that for you. Protect your peace and keep it gently rolling. ✨" },
  { label: "Meh", msg: "Meh days are allowed. Be soft with yourself and pick just one tiny win today." },
  { label: "Tired", msg: "Rest is productive too. Close the laptop for 10, breathe, hydrate. You're allowed. 🛋️" },
  { label: "Overwhelmed", msg: "Pause. Brain-dump everything, then circle ONE thing. You don't have to do it all at once. 🩷" },
  { label: "Anxious", msg: "You're safe. Breathe in for 4, hold for 4, out for 6. Again. You've got this. 🤍" },
];

function MoodCheckIn() {
  const [picked, setPicked] = useState<number | null>(null);

  if (picked !== null) {
    return (
      <div className="text-center">
        <p style={{ fontFamily: FONT_LUXE, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD }}>
          Feeling {MOODS[picked].label.toLowerCase()}
        </p>
        <p className="mt-3" style={{ fontFamily: FONT_BODY, fontSize: "0.92rem", lineHeight: 1.65, color: "rgba(29,15,11,0.78)" }}>
          {MOODS[picked].msg}
        </p>
        <button
          type="button"
          onClick={() => setPicked(null)}
          className="mt-4 rounded-full px-5 py-2 transition-opacity hover:opacity-80"
          style={{ background: "rgba(189,116,118,0.12)", color: ROSE_HEX, fontFamily: FONT_LUXE, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}
        >
          Check in again
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", fontStyle: "italic", color: ROSE_HEX, lineHeight: 1.2 }}>
        How are you feeling today?
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {MOODS.map((m, i) => (
          <button
            key={m.label}
            type="button"
            onClick={() => setPicked(i)}
            className="rounded-xl px-3 py-2.5 transition-all hover:-translate-y-0.5"
            style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(189,116,118,0.3)", color: INK, fontFamily: FONT_BODY, fontSize: "0.82rem" }}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Shared styles ───────────────────────────────────── */
const promptStyle = { fontFamily: FONT_DISPLAY, fontSize: "1.4rem", fontStyle: "italic" as const, color: ROSE_HEX, lineHeight: 1.25 };
const drawBtn = "mt-4 w-full rounded-full py-3 transition-opacity hover:opacity-90";
const drawBtnStyle = { background: ROSE_HEX, color: "#fff", fontFamily: FONT_LUXE, fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const };

/* ── Phrase-draw tools (word, post idea, mantra, affirmations) ── */
const WORDS = ["Abundance", "Bold", "Soft", "Unstoppable", "Magnetic", "Aligned", "Limitless", "Radiant", "Fearless", "Overflow", "Iconic", "Ease", "Devoted", "Rich", "Brave"];
const POSTS = ["Share a behind-the-scenes of your day", "Post a before & after", "Tell the story of why you started", "Share your #1 tip in your niche", "Show your workspace", "Answer a question clients always ask", "Share a win — big or small", "Do a 'day in the life'", "Myth vs truth in your industry", "Share your favourite tool or resource", "Introduce yourself to new followers", "Show your process start to finish"];
const MANTRAS = ["Money flows to me easily and often.", "I am a magnet for abundance.", "Every day, in every way, I'm getting richer.", "I deserve to be paid well for my gifts.", "My income grows even while I rest.", "Wealth is my natural state."];
const RICH = ["I am that girl.", "Main character energy, always.", "I move like the woman I'm becoming.", "Luxury is my baseline, not my reward.", "I am magnetic, soft, and unstoppable.", "I don't chase — I attract."];

function PhraseDraw({ prompt, cta, phrases }: { prompt: string; cta: string; phrases: string[] }) {
  const [shown, setShown] = useState<string | null>(null);
  const draw = () => { let p = phrases[Math.floor(Math.random() * phrases.length)]; while (p === shown && phrases.length > 1) p = phrases[Math.floor(Math.random() * phrases.length)]; setShown(p); };
  return (
    <div className="text-center">
      <p style={promptStyle}>{prompt}</p>
      <div className="mt-3 flex min-h-[58px] items-center justify-center">
        {shown ? (
          <p style={{ fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.5, color: "rgba(29,15,11,0.82)", fontWeight: 500 }}>{shown}</p>
        ) : (
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.84rem", color: "rgba(29,15,11,0.45)" }}>Tap below 🩷</p>
        )}
      </div>
      <button type="button" onClick={draw} className={drawBtn} style={drawBtnStyle}>{cta}</button>
    </div>
  );
}

/* ── Brand colour mood picker ────────────────────────── */
const PALETTES = [
  { name: "Soft & Romantic", colors: ["#FCF4EE", "#F7E4DF", "#BD7476", "#C8A864"] },
  { name: "Bold & Magnetic", colors: ["#1D0F0B", "#BD7476", "#C8A864", "#FCF4EE"] },
  { name: "Clean & Editorial", colors: ["#FFFFFF", "#EDE7DF", "#1D0F0B", "#C8A864"] },
  { name: "Warm & Cozy", colors: ["#F2E3D5", "#D9A77C", "#9E5A5C", "#5A3B2E"] },
];
function ColorMood() {
  const [pick, setPick] = useState<number | null>(null);
  if (pick !== null) {
    const p = PALETTES[pick];
    return (
      <div className="text-center">
        <p style={{ fontFamily: FONT_LUXE, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD }}>Your brand vibe</p>
        <p className="mt-1" style={promptStyle}>{p.name}</p>
        <div className="mt-4 flex justify-center gap-2">
          {p.colors.map((c) => <span key={c} className="h-12 w-12 rounded-full" style={{ background: c, border: "1px solid rgba(29,15,11,0.12)" }} />)}
        </div>
        <button type="button" onClick={() => setPick(null)} className="mt-5 rounded-full px-5 py-2" style={{ background: "rgba(189,116,118,0.12)", color: ROSE_HEX, fontFamily: FONT_LUXE, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Try another</button>
      </div>
    );
  }
  return (
    <div className="text-center">
      <p style={promptStyle}>What's your brand mood today?</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {PALETTES.map((p, i) => (
          <button key={p.name} type="button" onClick={() => setPick(i)} className="rounded-xl px-3 py-2.5 transition-all hover:-translate-y-0.5" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(189,116,118,0.3)", color: INK, fontFamily: FONT_BODY, fontSize: "0.78rem" }}>{p.name}</button>
        ))}
      </div>
    </div>
  );
}

/* ── Aesthetic focus timer ───────────────────────────── */
function FocusTimer() {
  const [secs, setSecs] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => window.clearInterval(id);
  }, [running]);
  useEffect(() => { if (secs === 0) setRunning(false); }, [secs]);
  const preset = (m: number) => { setRunning(false); setSecs(m * 60); };
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  return (
    <div className="text-center">
      <p style={{ fontFamily: FONT_DISPLAY, fontSize: "3rem", lineHeight: 1, color: ROSE_HEX, fontWeight: 500 }}>{mm}:{ss}</p>
      <div className="mt-3 flex justify-center gap-2">
        {[5, 15, 25].map((m) => <button key={m} type="button" onClick={() => preset(m)} className="rounded-full px-3 py-1.5" style={{ background: "rgba(189,116,118,0.1)", color: ROSE_HEX, fontFamily: FONT_LUXE, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{m} min</button>)}
      </div>
      <button type="button" onClick={() => setRunning((r) => !r)} className={drawBtn} style={drawBtnStyle}>{running ? "Pause" : "Start Focus"}</button>
    </div>
  );
}

/* ── Manifest button ─────────────────────────────────── */
const MANIFEST_LINES = ["It's already yours. Stay open. 🩷", "The universe heard you — trust the timing.", "You're a magnet for exactly this.", "Done is the energy. Act like it's already coming.", "What's meant for you is finding its way."];
function Manifest() {
  const [wish, setWish] = useState("");
  const [done, setDone] = useState<string | null>(null);
  const send = () => { if (!wish.trim()) return; setDone(MANIFEST_LINES[Math.floor(Math.random() * MANIFEST_LINES.length)]); };
  if (done) {
    return (
      <div className="text-center">
        <p style={promptStyle}>Manifesting…</p>
        <p className="mt-2" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem", color: "rgba(29,15,11,0.82)", fontWeight: 500 }}>"{wish}"</p>
        <p className="mt-3" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", lineHeight: 1.6, color: ROSE_HEX }}>{done}</p>
        <button type="button" onClick={() => { setDone(null); setWish(""); }} className="mt-4 rounded-full px-5 py-2" style={{ background: "rgba(189,116,118,0.12)", color: ROSE_HEX, fontFamily: FONT_LUXE, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Manifest again</button>
      </div>
    );
  }
  return (
    <div className="text-center">
      <p style={promptStyle}>What are you calling in?</p>
      <input type="text" value={wish} onChange={(e) => setWish(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") send(); }} placeholder="I am manifesting…" className="mt-4 w-full rounded-xl px-4 py-3 text-center focus:outline-none" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", background: BLUSH, border: "1px solid rgba(200,168,100,0.35)", color: INK }} />
      <button type="button" onClick={send} className={drawBtn} style={drawBtnStyle}>Manifest It ✦</button>
    </div>
  );
}

/* ── Did you show up today? ──────────────────────────── */
function ShowUp() {
  const KEY = "dh-showup";
  const [data, setData] = useState<{ count: number; last: string }>({ count: 0, last: "" });
  useEffect(() => { try { const r = window.localStorage.getItem(KEY); if (r) setData(JSON.parse(r)); } catch (_) { /* ignore */ } }, []);
  const today = new Date().toDateString();
  const doneToday = data.last === today;
  const yes = () => { if (doneToday) return; const next = { count: data.count + 1, last: today }; setData(next); try { window.localStorage.setItem(KEY, JSON.stringify(next)); } catch (_) { /* ignore */ } };
  return (
    <div className="text-center">
      <p style={promptStyle}>Did you show up today?</p>
      {doneToday ? (
        <p className="mt-4" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem", lineHeight: 1.6, color: "rgba(29,15,11,0.78)" }}>You showed up today 🔥 That's <strong style={{ color: ROSE_HEX }}>{data.count}</strong> times you've chosen yourself. Proud of you. 🩷</p>
      ) : (
        <>
          <p className="mt-2" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(29,15,11,0.5)" }}>Total: {data.count}</p>
          <button type="button" onClick={yes} className={drawBtn} style={drawBtnStyle}>Yes, I showed up ✦</button>
        </>
      )}
    </div>
  );
}

/* ── Win jar / gratitude jar ─────────────────────────── */
function Jar({ storageKey, prompt, placeholder, cta }: { storageKey: string; prompt: string; placeholder: string; cta: string }) {
  const [items, setItems] = useState<string[]>([]);
  const [value, setValue] = useState("");
  useEffect(() => { try { const r = window.localStorage.getItem(storageKey); if (r) setItems(JSON.parse(r)); } catch (_) { /* ignore */ } }, [storageKey]);
  const add = () => { const v = value.trim(); if (!v) return; const next = [v, ...items].slice(0, 100); setItems(next); try { window.localStorage.setItem(storageKey, JSON.stringify(next)); } catch (_) { /* ignore */ } setValue(""); };
  return (
    <div className="text-center">
      <p style={promptStyle}>{prompt}</p>
      <p className="mt-1" style={{ fontFamily: FONT_LUXE, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD }}>{items.length} in your jar</p>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") add(); }} placeholder={placeholder} className="mt-3 w-full rounded-xl px-4 py-3 text-center focus:outline-none" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", background: BLUSH, border: "1px solid rgba(200,168,100,0.35)", color: INK }} />
      <button type="button" onClick={add} className={drawBtn} style={drawBtnStyle}>{cta}</button>
      {items.length > 0 && (
        <div className="mt-4 space-y-1.5 text-left">
          {items.slice(0, 3).map((it, i) => (
            <p key={i} className="rounded-lg px-3 py-2" style={{ background: "rgba(189,116,118,0.07)", fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(29,15,11,0.72)" }}>🩷 {it}</p>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── The Vault (Month 12 finale) ─────────────────────── */
function TheVault() {
  return (
    <div className="text-center">
      <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.6rem", fontStyle: "italic", color: ROSE_HEX, lineHeight: 1.2 }}>You did it. 🏆</p>
      <p className="mt-3" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", lineHeight: 1.6, color: "rgba(29,15,11,0.72)" }}>
        You've collected all 12 keys and completed your Dollhouse. You're officially a Founding Member — every tool is yours, forever. 🩷
      </p>
    </div>
  );
}

function ComingSoonTool({ name }: { name: string }) {
  return (
    <div className="text-center">
      <p style={promptStyle}>{name}</p>
      <p className="mt-3" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", lineHeight: 1.6, color: "rgba(29,15,11,0.6)" }}>Your exclusive tool is being styled with love — opening very soon. 🩷</p>
    </div>
  );
}

function renderTool(room: Room) {
  switch (room.n) {
    case 1: return <PhraseDraw prompt="Your word of the year is…" cta="Spin My Word ✦" phrases={WORDS} />;
    case 2: return <PhraseDraw prompt="Today, post this…" cta="Give Me An Idea ✦" phrases={POSTS} />;
    case 3: return <PhraseDraw prompt="Your money mantra…" cta="New Mantra ✦" phrases={MANTRAS} />;
    case 4: return <ColorMood />;
    case 5: return <FocusTimer />;
    case 6: return <MoodCheckIn />;
    case 7: return <Manifest />;
    case 8: return <PhraseDraw prompt="Say it with me…" cta="Affirm Me ✦" phrases={RICH} />;
    case 9: return <ShowUp />;
    case 10: return <Jar storageKey="dh-winjar" prompt="Drop in a win 🩷" placeholder="Today I…" cta="Add To My Jar ✦" />;
    case 11: return <Jar storageKey="dh-gratitudejar" prompt="What are you grateful for?" placeholder="I'm grateful for…" cta="Add To My Jar ✦" />;
    case 12: return <TheVault />;
    default: return <ComingSoonTool name={room.tool} />;
  }
}

/* ── Room card with code gate ────────────────────────── */
function RoomCard({ room, unlocked, onUnlock }: { room: Room; unlocked: boolean; onUnlock: (n: number) => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function tryUnlock() {
    if (value.trim().toUpperCase() === room.code.toUpperCase()) {
      setError(false);
      onUnlock(room.n);
    } else {
      setError(true);
    }
  }

  return (
    <article
      className="flex min-h-[300px] flex-col rounded-2xl p-6"
      style={{ background: unlocked ? "rgba(189,116,118,0.07)" : "#fff", border: unlocked ? `1.5px solid ${ROSE_HEX}` : "1px solid rgba(200,168,100,0.28)" }}
    >
      <div className="flex items-center justify-between">
        <p style={{ fontFamily: FONT_LUXE, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD }}>
          Month {pad(room.n)}
        </p>
        <p style={{ fontFamily: FONT_LUXE, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: unlocked ? ROSE_HEX : "rgba(29,15,11,0.35)" }}>
          Key {pad(room.n)}
        </p>
      </div>

      <h3 className="mt-2" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, fontSize: "1.75rem", lineHeight: 1.05, color: INK }}>
        {room.name}
      </h3>

      <div className="mt-5 flex flex-1 flex-col justify-center">
        {unlocked ? (
          renderTool(room)
        ) : (
          <div className="text-center">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={ROSE_HEX} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="mx-auto opacity-70">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            <p className="mt-3" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(29,15,11,0.55)" }}>
              Enter the key code from your box to unlock this room.
            </p>
            <input
              type="text"
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(false); }}
              onKeyDown={(e) => { if (e.key === "Enter") tryUnlock(); }}
              placeholder="Your key code"
              className="mt-4 w-full rounded-xl px-4 py-3 text-center focus:outline-none"
              style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", letterSpacing: "0.08em", background: BLUSH, border: error ? `1px solid ${ROSE_HEX}` : "1px solid rgba(200,168,100,0.35)", color: INK }}
            />
            {error && (
              <p className="mt-2" style={{ fontFamily: FONT_BODY, fontSize: "0.74rem", color: ROSE_HEX }}>
                That key doesn't fit this room — check your card. 🩷
              </p>
            )}
            <button
              type="button"
              onClick={tryUnlock}
              className="mt-3 w-full rounded-full py-3 transition-opacity hover:opacity-90"
              style={{ background: ROSE_HEX, color: "#fff", fontFamily: FONT_LUXE, fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}
            >
              Unlock Room →
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

function VaultPage() {
  usePageMeta(
    "The Dollhouse Vault | The Dollhouse Society",
    "Unlock your exclusive monthly tool with the key from your Dollhouse box. Collect all 12 keys to complete your Dollhouse.",
  );

  const [unlocked, setUnlocked] = useState<number[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUnlocked(JSON.parse(raw));
    } catch (_) { /* ignore */ }
  }, []);

  function handleUnlock(n: number) {
    setUnlocked((prev) => {
      if (prev.includes(n)) return prev;
      const next = [...prev, n];
      try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (_) { /* ignore */ }
      return next;
    });
  }

  return (
    <main className="overflow-x-hidden text-[var(--ink)]" style={{ background: CREAM }}>
      {/* Hero */}
      <section className="px-6 pb-12 pt-24 md:pt-28 text-center" style={{ background: BLUSH }}>
        <p style={{ fontFamily: FONT_LUXE, fontSize: "11px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: ROSE }}>The Dollhouse Society</p>
        <h1 className="mt-4" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: INK, fontSize: "clamp(40px, 7vw, 58px)", lineHeight: 1.04 }}>
          The Vault
        </h1>
        <p className="mx-auto mt-5 max-w-[540px]" style={{ fontFamily: FONT_BODY, fontSize: "17px", lineHeight: 1.7, color: "rgba(29,15,11,0.7)" }}>
          Each month your box comes with a key. Enter your key code below to unlock that room's exclusive little tool — and collect all 12 to complete your Dollhouse. 🩷
        </p>
        <p className="mt-5 inline-block rounded-full px-5 py-2" style={{ background: "rgba(189,116,118,0.1)", border: "1px solid rgba(189,116,118,0.3)", fontFamily: FONT_LUXE, fontSize: "0.66rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: ROSE_HEX }}>
          {unlocked.length} / 12 keys unlocked
        </p>
      </section>

      {/* Rooms grid */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ROOMS.map((room) => (
            <RoomCard key={room.n} room={room} unlocked={unlocked.includes(room.n)} onUnlock={handleUnlock} />
          ))}
        </div>
      </section>
    </main>
  );
}
