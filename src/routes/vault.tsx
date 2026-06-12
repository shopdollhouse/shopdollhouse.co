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

function ComingSoonTool({ name }: { name: string }) {
  return (
    <div className="text-center">
      <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", fontStyle: "italic", color: ROSE_HEX, lineHeight: 1.2 }}>{name}</p>
      <p className="mt-3" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", lineHeight: 1.6, color: "rgba(29,15,11,0.6)" }}>
        Your exclusive tool is being styled with love — opening very soon. 🩷
      </p>
    </div>
  );
}

function renderTool(room: Room) {
  if (room.n === 6) return <MoodCheckIn />;
  return <ComingSoonTool name={room.tool} />;
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
