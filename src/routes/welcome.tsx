import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, ClipboardList, KeyRound, ShieldCheck } from "lucide-react";
import { usePageMeta } from "@/lib/use-page-meta";
import { BODY, DISPLAY, FlowShell, LUXE, LeftTitle, Pill, RightHeading, btnDark, btnDarkStyle, useNoindex } from "@/components/LaunchFlow";

export const Route = createFileRoute("/welcome")({ component: WelcomePage });

const NEXT = [
  { icon: CalendarCheck, title: "Book your kickoff call", text: "Choose a convenient time for your private 30-minute strategy session." },
  { icon: ClipboardList, title: "Complete your onboarding form", text: "Share the details we need to shape your content, brand voice and lead strategy." },
  { icon: KeyRound, title: "Finish your account setup", text: "Log in to your DOLLHOUSE account and connect the social pages you want us to manage." },
];

function WelcomePage() {
  usePageMeta("Welcome | Dollhouse Launch", "Payment confirmed. Book your kickoff call and finish your Dollhouse Launch setup.");
  useNoindex();

  const [left, setLeft] = useState(12);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    if (left <= 0) {
      window.location.assign("/kickoff");
      return;
    }
    const id = window.setTimeout(() => setLeft((n) => n - 1), 1000);
    return () => window.clearTimeout(id);
  }, [left, paused]);

  return (
    <FlowShell
      current={0}
      footer="Dollhouse Launch · Payment confirmed · Built for local businesses"
      left={
        <>
          <Pill><ShieldCheck className="h-3.5 w-3.5" /> Payment successful</Pill>
          <LeftTitle italic="you're officially in." caps="Welcome to Launch." sub="Your subscription is active. We are excited to build your content engine. First, reserve your kickoff call. Then we will guide you through a short setup checklist." />
          <p className="mt-10 inline-flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase" style={{ fontFamily: LUXE, color: "rgba(255,250,246,0.5)" }}>
            <ShieldCheck className="h-4 w-4 text-[var(--gold)]" /> Your account is secured
          </p>
        </>
      }
      right={
        <>
          <RightHeading eyebrow="Payment confirmed" title="Your next three steps" />
          <ol className="mt-6 grid gap-3">
            {NEXT.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="flex items-start gap-4 rounded-2xl p-4" style={{ background: "#fffaf6", border: "1px solid rgba(198,178,130,0.35)" }}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: "var(--ink)", color: "var(--gold)" }}><Icon className="h-5 w-5" /></span>
                <span>
                  <span className="block" style={{ fontFamily: LUXE, fontWeight: 700, fontSize: "0.95rem" }}>{i + 1}. {title}</span>
                  <span className="mt-1 block leading-6" style={{ fontFamily: BODY, fontSize: "0.85rem", color: "rgba(31,17,11,0.62)" }}>{text}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-center" style={{ fontFamily: BODY, fontSize: "0.85rem", color: "rgba(31,17,11,0.55)" }}>
            {paused ? "Auto-continue paused." : <>Continuing to kickoff scheduling in <strong style={{ fontFamily: DISPLAY, fontSize: "1.1rem" }}>{left}</strong></>}
          </p>
          <a href="/kickoff" className={`${btnDark} mt-4`} style={btnDarkStyle}>Book my kickoff call <ArrowRight className="h-4 w-4" /></a>
          <p className="mt-3 text-center leading-6" style={{ fontFamily: BODY, fontSize: "0.8rem", color: "rgba(31,17,11,0.5)" }}>After booking, you will continue to a simple checklist. Your contact details stay with you throughout this setup session.</p>
          <p className="mt-3 text-center">
            <a href="/setup" onClick={() => setPaused(true)} className="underline underline-offset-4" style={{ fontFamily: LUXE, fontSize: "0.85rem", fontWeight: 600 }}>I will complete this later</a>
          </p>
        </>
      }
    />
  );
}
