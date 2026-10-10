import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, Check, Clock } from "lucide-react";
import { usePageMeta } from "@/lib/use-page-meta";
import { KICKOFF_CALENDAR_URL, SUPPORT_EMAIL } from "@/lib/launch-offer";
import { BODY, FLOW_KEYS, FlowShell, LUXE, LeftTitle, Pill, RightHeading, btnDark, btnDarkStyle, store, useLead, useNoindex } from "@/components/LaunchFlow";

export const Route = createFileRoute("/kickoff")({ component: KickoffPage });

function KickoffPage() {
  usePageMeta("Book Your Kickoff Call | Dollhouse Launch", "Choose a time for your private 30-minute Dollhouse Launch kickoff call.");
  useNoindex();
  const lead = useLead();

  return (
    <FlowShell
      current={1}
      footer="Dollhouse Launch · Kickoff call · Built for local businesses"
      left={
        <>
          <Pill><Clock className="h-3.5 w-3.5" /> 30-minute call</Pill>
          <LeftTitle italic="book your private" caps="Kickoff call." sub="A focused 30-minute one-on-one to align on strategy and launch your content engine." />
          <p className="mt-9 text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE, fontWeight: 700, color: "var(--gold)" }}>What to expect</p>
          <ul className="mt-4 grid gap-3">
            {[
              "A focused conversation about your business, your goals and your content direction.",
              "Have your brand assets and calendar handy.",
              "Choose a time that works for you.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 rounded-2xl px-4 py-4" style={{ background: "rgba(255,250,246,0.05)", border: "1px solid rgba(198,178,130,0.22)" }}>
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ border: "1.5px solid var(--gold)", color: "var(--gold)" }}><Check className="h-3 w-3" strokeWidth={3} /></span>
                <span className="leading-6" style={{ fontFamily: BODY, fontSize: "0.92rem", color: "rgba(255,250,246,0.9)" }}>{t}</span>
              </li>
            ))}
          </ul>
        </>
      }
      right={
        <>
          <RightHeading eyebrow="Step 2 of 3 · Kickoff call" title="Choose your time" sub="Pick a convenient time for your private 30-minute strategy session." />
          <div className="mt-6 overflow-hidden rounded-2xl" style={{ background: "#fff", border: "1px solid rgba(31,17,11,0.1)" }}>
            {KICKOFF_CALENDAR_URL ? (
              <iframe src={KICKOFF_CALENDAR_URL} title="Book your kickoff call" className="block w-full border-0" style={{ height: "640px" }} />
            ) : (
              <div className="px-6 py-12 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "color-mix(in oklab, var(--gold) 20%, transparent)", color: "var(--gold-deep)" }}><CalendarCheck className="h-5 w-5" strokeWidth={1.6} /></span>
                <h3 className="mt-4 italic" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", lineHeight: 1.1 }}>Request your kickoff time</h3>
                <p className="mx-auto mt-2 max-w-xs leading-7" style={{ fontFamily: BODY, fontSize: "0.9rem", color: "rgba(31,17,11,0.62)" }}>
                  Email us and we will send you available times for your private 30-minute call.
                </p>
                <a
                  href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Dollhouse Launch kickoff call")}&body=${encodeURIComponent(`Hi, I just signed up${lead ? ` (${lead.firstName} ${lead.lastName}, ${lead.email})` : ""}. Please send me times for my kickoff call.`)}`}
                  className="btn-ink mt-6 justify-center"
                >
                  Email to schedule
                </a>
              </div>
            )}
          </div>
          <a href="/setup" onClick={() => store.set(FLOW_KEYS.kickoff, "1")} className={`${btnDark} mt-5`} style={btnDarkStyle}>I booked my call, continue <ArrowRight className="h-4 w-4" /></a>
          <p className="mt-4 text-center">
            <a href="/welcome" className="underline underline-offset-4" style={{ fontFamily: LUXE, fontSize: "0.85rem", fontWeight: 600 }}>Back to payment confirmation</a>
          </p>
        </>
      }
    />
  );
}
