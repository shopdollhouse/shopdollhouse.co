import { useEffect, type ReactNode } from "react";
import { Mail, MessageSquare, Phone } from "lucide-react";
import Eyebrow from "@/components/Eyebrow";
import MinimalHeader from "@/components/MinimalHeader";
import OnboardingAssetForm from "@/components/OnboardingAssetForm";

const CONTACT_EMAIL = "hello@shopdollhouse.co";
const CONTACT_PHONE = "(416) 799-6930";
const CONTACT_PHONE_TEL = "+14167996930";

const sectionClass = "mx-auto max-w-[720px] border-t border-dollhouse-p3/15 px-6 py-20";

const timeline = [
  {
    week: "Week 1 — Onboarding",
    body: "I review your submitted assets, set up your profiles, and build your content calendar. You may receive follow up questions by email.",
  },
  {
    week: "Week 2 — Content Creation",
    body: "I begin designing your first batch of posts, carousels, and any reels included in your package. Everything is created from scratch and tailored to your brand.",
  },
  {
    week: "Week 3 — Your Approval",
    body: "You will receive your first content batch by email for review. Please reply with any feedback within 3 business days so we can stay on schedule. Nothing gets posted without your approval.",
  },
  {
    week: "Week 4 — We Go Live",
    body: "Your content is scheduled and published across your chosen platforms. Welcome to social media.",
  },
];

const approvalItems = [
  "You will receive your content batch by email before anything is posted",
  "Review each post and reply with either approval or feedback",
  "Each package includes 1 round of revisions per content batch",
  "Additional revisions are available as an add-on",
  "Please send all feedback in one email — not multiple separate messages",
  "Approvals must be received within 3 business days to stay on schedule",
  "If no response is received within 3 business days content will be scheduled as submitted",
];

const reminders = [
  "Ad spend is paid directly by you to Meta — it is not included in your package fee",
  "Your package fee covers content creation, design, strategy, and management only",
  "Results take time — most clients see meaningful growth between month 3 and 6",
  "The more feedback and assets you provide upfront the better your content will be",
  "All approvals and major decisions must be confirmed by email",
  "If you need to pause or cancel please notify me by email with at least 7 days notice",
];

const SectionHeading = ({ eyebrow, title }: { eyebrow?: string; title: string }) => (
  <div className="mb-8 text-center">
    {eyebrow && <Eyebrow text={eyebrow} className="mb-4" />}
    <h2 className="font-display italic text-[clamp(26px,4vw,38px)] font-normal leading-tight text-dollhouse-ink">
      {title}
    </h2>
  </div>
);

const AccentBulletList = ({ items }: { items: string[] }) => (
  <ul className="list-none space-y-3 p-0">
    {items.map((item) => (
      <li key={item} className="relative pl-6 text-[14px] font-light leading-[1.7] text-dollhouse-text-mid">
        <span aria-hidden="true" className="absolute left-0 top-[0.2em] text-[11px] text-[#C9A0A0]">
          ♡
        </span>
        {item}
      </li>
    ))}
  </ul>
);

const CommunicationCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Mail;
  title: string;
  children: ReactNode;
}) => (
  <article className="flex gap-4 rounded-2xl border border-dollhouse-p3/25 bg-card p-6">
    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#d0b6a9]/30 text-dollhouse-ink ring-1 ring-dollhouse-p3/25">
      <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
    </div>
    <div>
      <h3 className="font-display text-[18px] italic text-dollhouse-ink">{title}</h3>
      <p className="mt-2 text-[13px] font-light leading-[1.7] text-dollhouse-text-mid">{children}</p>
    </div>
  </article>
);

const Onboarding = () => {
  useEffect(() => {
    document.title = "Welcome to The Dollhouse";
    return () => {
      document.title = "The Dollhouse — Build Your Brand. Start Your Business.";
    };
  }, []);

  return (
    <div className="min-h-screen [&_p]:leading-[1.7] [&_li]:leading-[1.7]">
      <MinimalHeader />

      <main>
        <section className="mx-auto max-w-[760px] px-6 pb-20 pt-16 text-center">
          <Eyebrow text="Client Onboarding" className="mb-5" />
          <h1 className="font-display italic text-[clamp(34px,5.5vw,56px)] font-normal leading-tight text-dollhouse-ink">
            Welcome to The Dollhouse
          </h1>
        </section>

        <section className={sectionClass}>
          <SectionHeading title="Welcome — I'm So Glad You're Here" />
          <div className="rounded-2xl border border-[#D4C9C0] bg-[#F5F0EB] p-10 text-center">
            <p className="text-[15px] font-light leading-[1.7] text-dollhouse-text-mid">
              Thank you for trusting The Dollhouse Brand Studio with your business. This page has everything you
              need to get us started. Please take a few minutes to read through it and submit your assets below.
              The sooner I have everything I need, the sooner we can get to work.
            </p>
            <p className="mt-6 font-display text-[19px] italic text-[#C9A0A0]">Mandy ♡</p>
          </div>
        </section>

        <section className={sectionClass}>
          <SectionHeading title="How We Work Together" />
          <div className="space-y-5">
            <CommunicationCard icon={Mail} title="Email">
              Primary communication for all content approvals, reports, updates and questions.{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-dollhouse-ink no-underline hover:opacity-80">
                {CONTACT_EMAIL}
              </a>{" "}
              — I respond within 1 to 2 business days.
            </CommunicationCard>

            <CommunicationCard icon={MessageSquare} title="Text">
              Available for quick questions or urgent matters.{" "}
              <a href={`tel:${CONTACT_PHONE_TEL}`} className="text-dollhouse-ink no-underline hover:opacity-80">
                {CONTACT_PHONE}
              </a>
            </CommunicationCard>

            <CommunicationCard icon={Phone} title="Phone or Zoom">
              Available if absolutely necessary. Please request via email or text first so we can schedule a time
              that works.
            </CommunicationCard>
          </div>
          <p className="mt-6 text-center font-display text-[12px] italic leading-[1.7] text-dollhouse-text-light">
            All major decisions, approvals, and agreements must be confirmed by email to keep a clear record for
            both of us.
          </p>
        </section>

        <section className={sectionClass}>
          <SectionHeading title="Your First Month — What to Expect" />
          <div className="space-y-0">
            {timeline.map((item, index) => (
              <div key={item.week} className="relative flex gap-6 pb-12 last:pb-0">
                {index < timeline.length - 1 && (
                  <span
                    className="absolute left-[14px] top-8 h-[calc(100%-20px)] w-px bg-[#E8DDD5]"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10 mt-1 h-[28px] w-[28px] flex-shrink-0 rounded-full bg-[#C9A0A0]" />
                <div>
                  <h3 className="font-display text-[19px] font-medium italic text-dollhouse-ink">{item.week}</h3>
                  <p className="mt-2 text-[13px] font-light leading-[1.7] text-dollhouse-text-mid">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center font-display text-[12px] italic leading-[1.7] text-dollhouse-text-light">
            Timelines depend on receiving your assets and approvals on time. Delays on your end may push the
            schedule forward.
          </p>
        </section>

        <section className={sectionClass}>
          <SectionHeading title="How Content Approvals Work" />
          <div className="rounded-2xl border border-[#D4C9C0] bg-[#F5F0EB] p-10">
            <AccentBulletList items={approvalItems} />
          </div>
        </section>

        <section className={sectionClass}>
          <SectionHeading title="Send Me Your Assets" />
          <p className="mb-8 text-center text-[14px] font-light leading-[1.7] text-dollhouse-text-mid">
            Please upload everything you have below. Don&apos;t worry if you don&apos;t have everything — just send
            what you can and I will work with what we have or create the rest.
          </p>
          <OnboardingAssetForm />
        </section>

        <section className={sectionClass}>
          <SectionHeading title="A Few Important Things to Remember" />
          <div className="rounded-2xl border border-[#D4C9C0]/60 bg-card/50 p-10">
            <AccentBulletList items={reminders} />
          </div>
        </section>

        <section className={sectionClass}>
          <SectionHeading title="Need to Reach Me?" />
          <div className="rounded-2xl border border-dollhouse-p3/25 bg-card p-8 text-center">
            <p className="text-[14px] font-light leading-[1.7] text-dollhouse-text-mid">
              Email:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-dollhouse-ink no-underline hover:opacity-80">
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="mt-3 text-[14px] font-light leading-[1.7] text-dollhouse-text-mid">
              Text:{" "}
              <a href={`tel:${CONTACT_PHONE_TEL}`} className="text-dollhouse-ink no-underline hover:opacity-80">
                {CONTACT_PHONE}
              </a>
            </p>
            <p className="mt-5 font-display text-[12px] italic leading-[1.7] text-dollhouse-text-light">
              For all content approvals, reports, and updates please use email so we have a clear record. Text is
              available for quick questions only.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#D4C9C0] py-14 text-center">
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[12px] font-light leading-[1.7] text-dollhouse-text-mid">
          <span>The Dollhouse Brand Studio</span>
          <span className="text-[#C9A0A0]">♡</span>
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-dollhouse-text-mid no-underline hover:text-dollhouse-ink">
            {CONTACT_EMAIL}
          </a>
          <span className="text-[#C9A0A0]">♡</span>
          <span>shopdollhouse.co</span>
        </p>
        <p className="mt-4 font-accent text-[7px] uppercase tracking-[3px] text-dollhouse-text-light/75">
          © 2026 The Dollhouse. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Onboarding;
