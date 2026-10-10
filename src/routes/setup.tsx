import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, Check, ClipboardList, KeyRound } from "lucide-react";
import { usePageMeta } from "@/lib/use-page-meta";
import { ACCOUNT_LOGIN_URL, SUPPORT_EMAIL } from "@/lib/launch-offer";
import { BODY, FLOW_KEYS, FlowShell, LUXE, LeftTitle, Pill, RightHeading, store, useLead, useNoindex } from "@/components/LaunchFlow";

export const Route = createFileRoute("/setup")({ component: SetupPage });

function SetupPage() {
  usePageMeta("Setup Checklist | Dollhouse Launch", "Finish your Dollhouse Launch setup: kickoff call, onboarding form and account login.");
  useNoindex();
  const lead = useLead();
  const [done, setDone] = useState({ kickoff: false, form: false, account: false });
  useEffect(() => {
    setDone({ kickoff: !!store.get(FLOW_KEYS.kickoff), form: !!store.get(FLOW_KEYS.form), account: !!store.get(FLOW_KEYS.account) });
  }, []);
  const count = Object.values(done).filter(Boolean).length;

  const items = [
    { key: "kickoff", icon: CalendarCheck, title: "Book your kickoff call", text: "Choose a convenient time for your private 30-minute strategy session.", href: "/kickoff", cta: done.kickoff ? "View kickoff call" : "Book now", external: false },
    { key: "form", icon: ClipboardList, title: "Complete your onboarding form", text: "Share the details we need to shape your content, brand voice and lead strategy. About 5 minutes.", href: "/setup/form", cta: done.form ? "Edit my answers" : "Start the form", external: false },
    {
      key: "account",
      icon: KeyRound,
      title: "Finish your account setup",
      text: ACCOUNT_LOGIN_URL ? "Log in to your DOLLHOUSE account and connect the social pages you want us to manage." : "We will email your DOLLHOUSE login. Then you connect the social pages you want us to manage.",
      href: ACCOUNT_LOGIN_URL || `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Dollhouse Launch account login")}`,
      cta: ACCOUNT_LOGIN_URL ? "Log in" : "Ask for my login",
      external: !!ACCOUNT_LOGIN_URL,
    },
  ] as const;

  return (
    <FlowShell
      current={2}
      footer="Dollhouse Launch · Setup checklist · Built for local businesses"
      left={
        <>
          <Pill>Step 3 of 3</Pill>
          <LeftTitle italic="almost there." caps="Your setup checklist." sub="Three quick steps and we can start building your posts. Your first batch arrives within 5 days once everything is in." />
          {lead && (
            <div className="mt-9 rounded-2xl px-5 py-4" style={{ background: "rgba(255,255,255,0.72)", border: "1px solid rgba(168,134,74,0.35)" }}>
              <p className="text-[10px] tracking-luxe uppercase" style={{ fontFamily: LUXE, fontWeight: 700, color: "var(--gold)" }}>Completing as</p>
              <p className="mt-2" style={{ fontFamily: LUXE, fontWeight: 600 }}>{lead.firstName} {lead.lastName}</p>
              <p className="mt-1 break-all" style={{ fontFamily: BODY, fontSize: "0.82rem", color: "rgba(31,17,11,0.6)" }}>{lead.email}</p>
            </div>
          )}
        </>
      }
      right={
        <>
          <RightHeading eyebrow={`${count} of 3 done`} title="Finish your setup" sub="Do these in any order. Your progress is saved on this device." />
          <ul className="mt-6 grid gap-3">
            {items.map(({ key, icon: Icon, title, text, href, cta, external }) => {
              const isDone = done[key as keyof typeof done];
              return (
                <li key={key} className="flex flex-col gap-3 rounded-2xl p-4" style={{ background: "#fffaf6", border: `1px solid ${isDone ? "rgba(198,178,130,0.8)" : "rgba(198,178,130,0.35)"}` }}>
                  <span className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ background: isDone ? "var(--gold)" : "var(--ink)", color: isDone ? "var(--ink)" : "var(--gold)" }}>
                      {isDone ? <Check className="h-5 w-5" strokeWidth={3} /> : <Icon className="h-5 w-5" />}
                    </span>
                    <span className="flex-1">
                      <span className="block" style={{ fontFamily: LUXE, fontWeight: 700, fontSize: "0.95rem" }}>{title}</span>
                      <span className="mt-1 block leading-6" style={{ fontFamily: BODY, fontSize: "0.84rem", color: "rgba(31,17,11,0.62)" }}>{text}</span>
                    </span>
                  </span>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={() => key === "account" && store.set(FLOW_KEYS.account, "1")}
                    className="inline-flex items-center justify-center gap-1.5 self-start rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[0.16em]"
                    style={{ fontFamily: LUXE, fontWeight: 700, background: "var(--ink)", color: "var(--cream)" }}
                  >
                    {cta} <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-center leading-6" style={{ fontFamily: BODY, fontSize: "0.82rem", color: "rgba(31,17,11,0.55)" }}>
            Need help? Email <a href={`mailto:${SUPPORT_EMAIL}`} className="underline underline-offset-4" style={{ color: "var(--rose)" }}>{SUPPORT_EMAIL}</a>.
          </p>
        </>
      }
    />
  );
}
