import { createFileRoute } from "@tanstack/react-router";
import { usePageMeta } from "@/lib/use-page-meta";
import { SiteFooter } from "@/components/SiteFooter";
import { useScrollReveal } from "@/lib/use-scroll-reveal";
import {
  LaunchNav,
  LaunchHeroBlock,
  LaunchHowItWorks,
  LaunchWhatsIncluded,
  LaunchExamples,
  LaunchPlans,
  LaunchAfterPurchase,
  LaunchFaq,
  LaunchFinalCta,
} from "@/components/LaunchSections";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  usePageMeta(
    "Dollhouse Launch | Done-For-You Social Media & Lead Generation from $297/mo",
    "Dollhouse Launch is the done-for-you social media and lead-generation system for home service businesses. We post for you, capture inquiries, reply instantly and book estimates. $297/month, no contract, 14-day money-back guarantee.",
  );

  // Scroll-reveal: sections gently rise + fade in as they enter the viewport.
  useScrollReveal();

  return (
    <main className="lux bg-[var(--blush)] text-[var(--ink)]">
      <LaunchNav />
      <LaunchHeroBlock />
      <LaunchHowItWorks />
      <LaunchWhatsIncluded />
      <LaunchExamples />
      <LaunchPlans />
      <LaunchAfterPurchase />
      <LaunchFaq />
      <LaunchFinalCta />
      <SiteFooter />
    </main>
  );
}
