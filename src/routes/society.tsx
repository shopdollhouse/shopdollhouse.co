import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { usePageMeta } from "@/lib/use-page-meta";
import { useScrollReveal } from "@/lib/use-scroll-reveal";

export const Route = createFileRoute("/society")({ component: SocietyWaitlistPage });

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

// Waitlist signups POST here. Tagged "dollhouse-box-waitlist" so they live in
// their own GoHighLevel list, separate from all other contacts.
// TODO: replace with the dedicated GHL "Dollhouse Box Waitlist" webhook once created.
const WAITLIST_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/ElOoFIfV3BYE54LNg3Yw/webhook-trigger/REPLACE_WITH_WAITLIST_WEBHOOK";

const PREVIEW = [
  "12 themed rooms — a new one every month",
  "Collectible keys to complete your Dollhouse",
  "Exclusive merch + little luxury surprises",
  "A cute digital tool unlocked with each key",
  "Founding-member pricing, locked in forever",
];

function SocietyWaitlistPage() {
  usePageMeta(
    "The Dollhouse Society — Join the Waitlist | The Dollhouse",
    "A monthly luxury subscription box launching Fall 2026. Join the waitlist for founding-member access and first dibs before doors open.",
  );

  useScrollReveal();

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  function join() {
    if (!email.trim()) return;
    setStatus("sending");
    const payload = {
      firstName,
      email,
      tag: "dollhouse-box-waitlist",
      source: "Dollhouse Box Waitlist - Fall 2026",
    };
    fetch(WAITLIST_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch((err) => console.warn("Waitlist webhook failed:", err));
    // Backup so a signup is never lost before the GHL webhook is wired.
    fetch("https://formspree.io/f/mwvrvrzj", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
    setStatus("done");
  }

  return (
    <main className="min-h-screen overflow-x-hidden text-[var(--ink)]" style={{ background: CREAM }}>
      <section className="px-6 pb-24 pt-24 md:pt-28">
        <div className="mx-auto max-w-[620px] text-center">
          <span className="inline-block rounded-full px-4 py-1.5" style={{ background: "rgba(200,168,100,0.14)", border: `1px solid ${GOLD}`, fontFamily: FONT_LUXE, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD }}>
            ✦ Launching Fall 2026 · Founding Spots Limited
          </span>

          <p className="mt-7" style={{ fontFamily: FONT_LUXE, fontSize: "11px", fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: ROSE }}>
            The Dollhouse Society
          </p>
          <h1 className="mt-3" style={{ fontFamily: FONT_DISPLAY, fontWeight: 400, color: INK, fontSize: "clamp(42px, 8vw, 62px)", lineHeight: 1.02 }}>
            The box is coming.
          </h1>
          <p className="mx-auto mt-6 max-w-[500px]" style={{ fontFamily: FONT_BODY, fontSize: "17px", lineHeight: 1.7, color: "rgba(29,15,11,0.7)" }}>
            A curated luxury box delivered to your door every month — themed rooms, collectible keys, exclusive merch, and little surprises. Join the waitlist for founding-member access and first dibs before doors open. 🩷
          </p>

          {/* Preview */}
          <ul className="mx-auto mt-8 max-w-[420px] space-y-2.5 text-left">
            {PREVIEW.map((p) => (
              <li key={p} className="flex items-start gap-2.5" style={{ fontFamily: FONT_BODY, fontSize: "14px", lineHeight: 1.5, color: INK }}>
                <span className="mt-0.5 inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full" style={{ background: ROSE_HEX }}>
                  <svg viewBox="0 0 16 16" width="9" height="9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8.5 6.2 11.5 13 4.5" /></svg>
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>

          {/* Form / success */}
          <div className="mx-auto mt-10 max-w-[420px]">
            {status === "done" ? (
              <div className="rounded-[22px] p-7" style={{ background: BLUSH, border: `1px solid ${ROSE_HEX}` }}>
                <p style={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: "1.8rem", color: ROSE_HEX, lineHeight: 1.1 }}>You're on the list! 🩷</p>
                <p className="mt-3" style={{ fontFamily: FONT_BODY, fontSize: "0.95rem", lineHeight: 1.6, color: "rgba(29,15,11,0.7)" }}>
                  Watch your inbox — founding spots open Fall 2026, and you'll be the first to know.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Your first name"
                  className="w-full rounded-xl px-5 py-3.5 text-center focus:outline-none"
                  style={{ fontFamily: FONT_BODY, fontSize: "1rem", background: "#fff", border: "1px solid rgba(200,168,100,0.35)", color: INK }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") join(); }}
                  placeholder="Your email address"
                  className="w-full rounded-xl px-5 py-3.5 text-center focus:outline-none"
                  style={{ fontFamily: FONT_BODY, fontSize: "1rem", background: "#fff", border: "1px solid rgba(200,168,100,0.35)", color: INK }}
                />
                <button
                  type="button"
                  onClick={join}
                  disabled={!email.trim() || status === "sending"}
                  className="w-full rounded-full py-4 transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ background: ROSE_HEX, color: "#fff", fontFamily: FONT_LUXE, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}
                >
                  {status === "sending" ? "Saving your spot…" : "Join the Waitlist 🩷"}
                </button>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(29,15,11,0.5)" }}>
                  No spam — just your spot saved and a heads-up when we open.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
