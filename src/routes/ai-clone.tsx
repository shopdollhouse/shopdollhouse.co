import { createFileRoute } from "@tanstack/react-router";
import { usePageMeta } from "@/lib/use-page-meta";

export const Route = createFileRoute("/ai-clone")({ component: AIClonePage });

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_LUXE    = "'Jost', sans-serif";
const FONT_BODY    = "'DM Sans', sans-serif";

const gold  = "var(--gold)";
const rose  = "var(--rose)";
const ink   = "var(--ink)";
const cream = "var(--cream)";

function AIClonePage() {
  usePageMeta(
    "AI Clone Content System | The Dollhouse Brand Studio",
    "Get an AI clone or custom brand character built for your content system, with done-for-you strategy, posts, automations, and lead follow-up.",
  );

  return (
    <div style={{ fontFamily: FONT_BODY, color: ink, overflowX: "hidden" }}>

      {/* ── NAV ───────────────────────────────────────────── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(248,237,232,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(200,168,100,0.15)", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: rose, fontStyle: "italic", margin: 0, lineHeight: 1 }}>the Dollhouse</p>
          <p style={{ fontFamily: FONT_LUXE, fontSize: "0.55rem", letterSpacing: "0.22em", textTransform: "uppercase", color: gold, margin: 0 }}>Brand Studio</p>
        </a>
        <a href="#get-started" style={{ padding: "10px 28px", borderRadius: 999, background: ink, color: gold, fontFamily: FONT_LUXE, fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none", fontWeight: 600 }}>
          Get Your Clone →
        </a>
      </nav>

      {/* ── HERO ──────────────────────────────────────────── */}
      <section style={{ background: "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(232,180,180,0.3), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 90%, rgba(200,168,100,0.15), transparent 60%), linear-gradient(160deg, #f8ede8 0%, #faf3ea 50%, #fdf6ee 100%)", padding: "80px 24px 72px", textAlign: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: gold, marginBottom: 16 }}>✦ The Dollhouse Brand Studio ✦</p>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.6rem, 6vw, 4.2rem)", color: rose, fontStyle: "italic", lineHeight: 1.1, marginBottom: 20 }}>
            Get Your Own AI Clone<br />Built Completely Done For You
          </h1>
          <p style={{ fontFamily: FONT_BODY, fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(30,15,10,0.6)", lineHeight: 1.7, maxWidth: 580, margin: "0 auto 36px" }}>
            We build a digital version of you — your face, your voice, your energy — that creates video content and posts every single day without you ever filming again.
          </p>
          <a href="#get-started" style={{ display: "inline-block", padding: "18px 48px", borderRadius: 999, background: ink, color: gold, fontFamily: FONT_LUXE, fontSize: "0.8rem", letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none", fontWeight: 600, boxShadow: "0 20px 60px -12px rgba(30,15,10,0.25)" }}>
            Get My AI Clone →
          </a>
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(30,15,10,0.35)", marginTop: 16 }}>Starts at $1,000/mo · 6-month minimum · $500 one-time setup</p>
        </div>

        {/* Avatar grid */}
        <div style={{ marginTop: 56, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          {["Medical Spa", "Realtor", "Dentist", "Fitness Coach", "Lawyer", "Restaurant"].map((label, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, ${["#f0d5c8","#e8c9c0","#f5ddd4","#eac9bf","#f2d9cc","#e6c5bb"][i]}, ${["#d4a090","#c89088","#d8a898","#cc9080","#d6a490","#c88878"][i]})`, border: "2px solid rgba(200,168,100,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(200,168,100,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <p style={{ fontFamily: FONT_LUXE, fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(30,15,10,0.4)" }}>{label}</p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(30,15,10,0.4)", marginTop: 16 }}>Built for business owners across every industry</p>
      </section>

      {/* ── PROBLEM ───────────────────────────────────────── */}
      <section style={{ background: ink, padding: "72px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: gold, marginBottom: 16 }}>The Reality</p>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 4vw, 3rem)", color: cream, fontStyle: "italic", marginBottom: 40, lineHeight: 1.2 }}>Creating Video Content Is Exhausting</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 700, margin: "0 auto" }}>
            {[
              ["Without AI Clone", ["Filming takes hours every week", "You run out of ideas constantly", "You hate watching yourself on camera", "You post once and go silent for weeks", "Your competitors look better online"], "rgba(180,80,80,0.2)", "#d46060", "✕"],
              ["With Your AI Clone", ["Content posts every day — automatically", "Your face and voice, without filming", "Consistent, on-brand, professional", "Your business grows while you sleep", "You look like the #1 brand in your city"], "rgba(100,180,120,0.15)", "#5a9970", "✓"],
            ].map(([title, items, bg, color, icon]) => (
              <div key={title as string} style={{ background: bg as string, borderRadius: 20, padding: "28px 24px", border: `1px solid ${color}44`, textAlign: "left" }}>
                <p style={{ fontFamily: FONT_LUXE, fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", color: color as string, marginBottom: 16 }}>{title as string}</p>
                {(items as string[]).map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                    <span style={{ color: color as string, flexShrink: 0, fontWeight: 700, fontSize: "0.9rem" }}>{icon as string}</span>
                    <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(245,232,224,0.8)", lineHeight: 1.5, margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ──────────────────────────────────── */}
      <section style={{ background: "#faf3ea", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: gold, marginBottom: 12 }}>What's Included</p>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 4vw, 3rem)", color: rose, fontStyle: "italic", lineHeight: 1.2 }}>Here's A Breakdown Of What You Get</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              ["Your AI Clone Video Avatar", "We record you once for 20–30 minutes. From that recording, we train a digital version of you that can create unlimited video content — your face, your voice, your energy — forever."],
              ["3 AI Clone Videos / Month", "Three high-quality AI clone videos posted to the top of your profile every month. Always pinned. Always your best content front and centre."],
              ["Professional Short-Form Content", "Reels, carousels, and static posts filling your content calendar — all on-brand, all created for you. 12 posts per month on your chosen platform."],
              ["Done-For-You Setup", "We handle everything. Training your clone, setting up your content calendar, building your brand room, and activating your automations. You just approve."],
              ["Comment-to-DM Automation", "Anyone who comments on your posts gets an instant private message turning them into a lead — automatically, 24/7."],
              ["Monthly Performance Snapshot", "Every month you get a clear report — follower growth, reach, top posts — in plain English. No dashboards, no confusion."],
            ].map(([title, desc]) => (
              <div key={title as string} style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(200,168,100,0.2)", borderRadius: 20, padding: "28px 24px" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(200,168,100,0.12)", border: "1px solid rgba(200,168,100,0.3)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke={gold} strokeWidth="1.2"/><polyline points="6,10 9,13 14,7" stroke={gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem", color: ink, marginBottom: 8, lineHeight: 1.3 }}>{title as string}</p>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(30,15,10,0.55)", lineHeight: 1.6 }}>{desc as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT HELPS ──────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg, #f8ede8, #faf3ea)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: gold, marginBottom: 12 }}>The Impact</p>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 4vw, 3rem)", color: rose, fontStyle: "italic", lineHeight: 1.2 }}>How Will Your AI Clone Help You?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              ["Scale Daily Content", "Post every day across every platform — without filming, writing, or scheduling anything yourself."],
              ["Build Real Trust Fast", "Your face and voice showing up consistently builds the kind of trust that turns followers into paying clients."],
              ["Never Run Out of Ideas", "We write the scripts, create the content, and keep your calendar full — every single month."],
              ["Look Like a Top Brand", "Even as a one-person business, your online presence looks like you have a full creative team behind you."],
              ["Free Up Your Time", "Stop spending hours on content. Your AI clone works while you focus on serving your clients and growing your business."],
              ["Blog Content", "Your AI clone content can be repurposed into blog posts, email content, and more — one recording, unlimited uses."],
            ].map(([title, desc]) => (
              <div key={title as string} style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(200,168,100,0.18)", borderRadius: 16, padding: "22px 20px", textAlign: "center" }}>
                <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: rose, marginBottom: 8, fontStyle: "italic" }}>{title as string}</p>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(30,15,10,0.55)", lineHeight: 1.55 }}>{desc as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BONUSES ───────────────────────────────────────── */}
      <section style={{ background: ink, padding: "80px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <p style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: gold, marginBottom: 8 }}>Sign Up Today And Get</p>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 4vw, 3rem)", color: cream, fontStyle: "italic", lineHeight: 1.2, marginBottom: 8 }}>3 Free Bonuses</h2>
            <p style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: "rgba(245,232,224,0.5)", marginBottom: 44 }}>Included with every AI Clone package — no extra charge.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {[
              ["Free Social Media Audit", "We review your current social media presence and tell you exactly what's working, what's not, and what we'll fix for you. Normally $297 — yours free.", "Audit"],
              ["Custom Voice AI Agent", "A voice AI receptionist that answers missed calls for your business, handles inquiries, and books appointments 24/7 — set up and ready on day one.", "Voice AI"],
              ["Custom Nurture Automations", "We build and activate your comment-to-DM automation and lead follow-up sequences before your content even goes live.", "Automations"],
            ].map(([title, desc, tag]) => (
              <div key={title as string} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(200,168,100,0.2)", borderRadius: 20, padding: "28px 24px" }}>
                <div style={{ display: "inline-block", padding: "3px 12px", borderRadius: 99, background: "rgba(200,168,100,0.15)", border: "1px solid rgba(200,168,100,0.3)", fontFamily: FONT_LUXE, fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: gold, marginBottom: 14 }}>
                  Bonus — {tag as string}
                </div>
                <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.2rem", color: cream, marginBottom: 10, lineHeight: 1.3 }}>{title as string}</p>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(245,232,224,0.55)", lineHeight: 1.6 }}>{desc as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <section style={{ background: "#faf3ea", padding: "80px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: gold, marginBottom: 12 }}>The Process</p>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 4vw, 3rem)", color: rose, fontStyle: "italic", lineHeight: 1.2 }}>How We Build Your AI Clone</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              ["01", "You record once — 20 minutes", "Hop on a video call with us and just talk. Tell us about your business, your story, your clients. No script needed. That's literally all you do."],
              ["02", "We train your AI model", "Our team takes your recording and builds a digital version of you — trained on your face, voice, and energy. Takes about one week."],
              ["03", "We create your content strategy", "We research your market, build your brand room, write your scripts, and prepare your first month of content — all in one batch."],
              ["04", "You approve — then we go live", "You see everything before it goes live. Once you give the green light, your content starts posting automatically. Every. Single. Day."],
            ].map(([n, title, desc], i, arr) => (
              <div key={n as string} style={{ display: "flex", gap: 24, position: "relative" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: rose, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: cream, fontWeight: 500 }}>{n as string}</span>
                  </div>
                  {i < arr.length - 1 && <div style={{ width: 1, flex: 1, background: "rgba(200,168,100,0.25)", margin: "8px 0" }} />}
                </div>
                <div style={{ paddingBottom: 36 }}>
                  <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: ink, marginBottom: 6, lineHeight: 1.3 }}>{title as string}</p>
                  <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.55)", lineHeight: 1.65 }}>{desc as string}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section id="get-started" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(232,180,180,0.3), transparent 70%), linear-gradient(135deg, #f8ede8, #faf3ea)", padding: "80px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <p style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: gold, marginBottom: 16 }}>✦ Ready To Clone Yourself? ✦</p>
          <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: rose, fontStyle: "italic", lineHeight: 1.15, marginBottom: 20 }}>
            Your Brand.<br />On Autopilot. Every Day.
          </h2>
          <div style={{ width: 40, height: 1, background: gold, margin: "0 auto 24px" }} />
          <p style={{ fontFamily: FONT_BODY, fontSize: "1rem", color: "rgba(30,15,10,0.58)", lineHeight: 1.75, marginBottom: 36 }}>
            Get a free proposal and we'll show you exactly what your AI clone looks like — built specifically for your business, your voice, and your brand.
          </p>
          <a href="/#contact" style={{ display: "inline-block", padding: "18px 52px", borderRadius: 999, background: ink, color: gold, fontFamily: FONT_LUXE, fontSize: "0.8rem", letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none", fontWeight: 600, boxShadow: "0 20px 60px -12px rgba(30,15,10,0.25)", marginBottom: 16 }}>
            Get My AI Clone →
          </a>
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(30,15,10,0.35)" }}>Starts at $1,000/mo · $500 one-time setup · 6-month minimum</p>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section style={{ background: ink, padding: "72px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: gold, marginBottom: 12 }}>Common Questions</p>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 4vw, 2.8rem)", color: cream, fontStyle: "italic" }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {[
              ["Do I have to film myself?", "Only once — for 20–30 minutes on a video call with us. That's it. After that, your AI clone handles all the video content. You never pick up a camera again."],
              ["What if I don't like being on camera?", "That's exactly who this is built for. We also offer a brand mascot or character option — so your business has a face and voice online without it being literally you."],
              ["How long does setup take?", "Your AI clone is trained within one week of your recording session. Your first content goes out for approval in week 1–1.5. Everything goes live once you approve."],
              ["Can I see and approve content before it posts?", "Yes — always. You see and approve every single piece of content before anything goes live. You're always in control."],
              ["What platforms do you post on?", "The Starter plan covers 1 platform of your choice — Facebook, Instagram, or TikTok. The Growth and Elite plans cover all 3."],
              ["Is the $500 setup fee a monthly charge?", "No — it's a one-time fee, charged only when you sign up. It covers building your AI clone, your brand room, your automations, and your content system. Never charged again."],
              ["What's included in the free bonuses?", "Every client gets a free social media audit, a custom voice AI agent that answers missed calls, and custom nurture automations — all activated before your content even goes live."],
            ].map(([q, a], i) => (
              <details key={i} style={{ borderTop: "1px solid rgba(200,168,100,0.12)", padding: "18px 0" }}>
                <summary style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: cream, cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {q as string}
                  <span style={{ color: gold, fontSize: "1.2rem", flexShrink: 0, marginLeft: 12 }}>+</span>
                </summary>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(245,232,224,0.6)", lineHeight: 1.7, marginTop: 12, paddingRight: 24 }}>{a as string}</p>
              </details>
            ))}
            <div style={{ borderTop: "1px solid rgba(200,168,100,0.12)" }} />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section style={{ background: rose, padding: "64px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(245,232,224,0.6)", marginBottom: 16 }}>✦ The Dollhouse Brand Studio ✦</p>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(2rem, 4vw, 3rem)", color: cream, fontStyle: "italic", lineHeight: 1.15, marginBottom: 28 }}>Ready To Clone Yourself?</h2>
        <a href="/#contact" style={{ display: "inline-block", padding: "16px 48px", borderRadius: 999, background: cream, color: rose, fontFamily: FONT_LUXE, fontSize: "0.78rem", letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none", fontWeight: 700 }}>
          Get My AI Clone →
        </a>
        <p style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "rgba(245,232,224,0.5)", marginTop: 16 }}>hello@shopdollhouse.co · shopdollhouse.co</p>
      </section>

    </div>
  );
}
