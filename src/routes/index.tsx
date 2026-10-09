import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePageMeta } from "@/lib/use-page-meta";
import { SiteFooter } from "@/components/SiteFooter";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import {
  LaunchNav,
  LaunchHero,
  LaunchStats,
  LaunchProblem,
  LaunchHowItWorks,
  LaunchWhatsIncluded,
  LaunchWork,
  LaunchExamples,
  LaunchPlans,
  LaunchAfterPurchase,
  LaunchVideo,
  LaunchWhoFor,
  LaunchFounder,
  LaunchFaq,
  LaunchFinalCta,
  LaunchStickyBar,
} from "@/components/LaunchSections";

export const Route = createFileRoute("/")({ component: Index });

/* ─── Back to top ─────────────────────────────────────── */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-40 right-5 md:bottom-8 md:right-8 z-40 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500"
      style={{
        background: "var(--ink)",
        boxShadow: "0 8px 24px -8px rgba(30,15,10,0.5)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="var(--gold)" strokeWidth="1.5" className="w-4 h-4">
        <path d="M3 10.5L8 5.5L13 10.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function Index() {
  usePageMeta(
    "Dollhouse Launch | Done-For-You Social Media & Lead Generation from $297/mo",
    "Dollhouse Launch is the done-for-you social media and lead-generation system for home service businesses. We post for you, capture inquiries, reply instantly and book estimates. $297/month, no contract, 14-day money-back guarantee.",
  );

  // Scroll-reveal: sections gently rise + fade in as they enter the viewport.
  useScrollReveal();

  return (
    <main className="bg-[var(--blush)] text-[var(--ink)]">
      <LaunchNav />
      <LaunchHero />
      <LaunchVideo />
      <LaunchStats />
      <LaunchProblem />
      <LaunchHowItWorks />
      <LaunchWhatsIncluded />
      <LaunchWork />
      <LaunchExamples />
      <LaunchPlans />
      <LaunchAfterPurchase />
      <LaunchWhoFor />
      <LaunchFounder />
      <LaunchFaq />
      <LaunchFinalCta />
      <SiteFooter />
      <BackToTop />
      <LaunchStickyBar />
    </main>
  );
}
