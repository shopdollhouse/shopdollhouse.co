import { useState, type FormEvent } from "react";
import Eyebrow from "@/components/Eyebrow";
import { Globe, Image, Mail, Megaphone, Palette, PenTool, ShoppingBag, SquarePen } from "lucide-react";

const CONTACT_EMAIL = "hello@shopdollhouse.co";
const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/mwvrvrzj";

const packages = [
  {
    title: "Standard",
    price: "$1,500/mo",
    badge: "First Month · No Commitment",
    description: "For established businesses ready to build a professional social presence from scratch.",
    included: [
      "Profile setup + branding",
      { text: "12 posts/month", tags: ["static", "carousel"] },
      "Captions + hashtags written by us",
      "Scheduling + publishing",
      "1 promotional email graphic/month",
      "Monthly performance report",
      "Organic content only",
    ],
    platforms: "Platforms — choose up to 3: Instagram, Facebook, Threads",
    timeline: [
      "Week 1–2 — Profile setup + branding complete",
      "Week 3 — First content batch ready for your approval",
      "Week 4 — Publishing begins",
      "Note: Timeline depends on client providing assets + approvals promptly",
    ],
    note: "First month — no commitment · 3-month minimum from month 2 · Organic content only",
  },
  {
    title: "Pro",
    price: "$2,500/mo",
    badge: "Most Popular",
    description: "Full content suite with reels, video editing, and TikTok for businesses ready to grow fast.",
    included: [
      "Everything in Standard",
      { text: "16 posts/month", tags: ["static", "carousel", "reels"] },
      "Short-form video content + editing (Instagram/Facebook: 15–30 sec · TikTok: 30–60 sec)",
      "2 promotional email graphics/month",
      "Custom ad creatives designed by us",
      {
        text: "Meta ads management optional add-on (+$600/mo)",
        note: "Recommended after 60 days of consistent organic content. We will advise when your account is ready.",
      },
      "Monthly performance report",
    ],
    platforms: "Platforms — choose any 3: Instagram, Facebook, Threads, TikTok",
    timeline: [
      "Week 1–2 — Setup, branding + content strategy complete",
      "Week 3–4 — First posts + reels ready for your approval",
      "Week 5 — Publishing begins",
      "Month 2 — Meta ads launched (if add-on selected)",
      "Note: Timeline depends on client providing assets + approvals promptly",
    ],
    note: "3-month minimum · Ad spend billed separately",
    featured: true,
  },
  {
    title: "Premium",
    price: "$5,000/mo",
    description: "Your own creative team. Maximum content, full ads management, merch design, and complete brand support.",
    included: [
      "Everything in Pro",
      { text: "30 posts/month", tags: ["static", "carousel", "reels"] },
      "Extended video editing + reels (Instagram/Facebook: 15–30 sec · TikTok: 30–60 sec)",
      {
        text: "Full Meta ads management included",
        note: "Ads are launched in month 2 once your organic content foundation is established.",
      },
      "4 promotional email graphics/month",
      "1 merch design concept/month",
      "Detailed monthly analytics report",
      "Priority email support",
    ],
    platforms: "Platforms — all included: Instagram, Facebook, Threads, TikTok",
    timeline: [
      "Week 1–2 — Full onboarding, brand audit + strategy complete",
      "Week 3–4 — First content batch ready for your approval",
      "Week 5–6 — Publishing begins across all platforms",
      "Month 2 — Ads live + merch design kicked off",
      "Note: Timeline depends on client providing assets + approvals promptly",
    ],
    note: "3-month minimum · Ad spend billed separately by client",
  },
];

const isFor = [
  "You have an established business but little to no social media presence",
  "You've been meaning to get on social media but never had the time",
  "You want professional, consistent content without hiring a full in-house team",
  "You're ready to stop being invisible online while your competitors grow",
  "You want everything handled for you — no meetings, no calls, just results delivered to your inbox",
];

const notFor = [
  "You're a brand new startup still figuring out your business",
  "You want to be hands-on and manage your own content",
  "You're looking for guaranteed overnight results",
  "You're not ready to commit to at least one month",
];

const monthlyAddons = [
  {
    title: "Meta Ads Management",
    price: "+$600/mo",
    availability: "Available for Pro package only. Recommended after 60 days of consistent organic content.",
    includes: ["Campaign setup + management", "Custom ad creatives", "Ad spend billed separately"],
    icon: Megaphone,
  },
  {
    title: "Extra Email Graphic",
    price: "+$300/mo",
    includes: ["Fully designed email banner", "Branded to your business", "Ready to send"],
    icon: Mail,
  },
  {
    title: "Extra Content",
    price: "+$400/mo",
    includes: ["4 extra posts", "Static or carousel", "Captions included"],
    icon: PenTool,
  },
];

const projectAddons = [
  {
    title: "Merch Design",
    price: "$1,000",
    desc: "3-5 merch concepts, 1 selected design direction, mockups + print-ready files.",
    icon: ShoppingBag,
  },
  {
    title: "Website Refresh",
    price: "$1,500+",
    desc: "Small updates to make an existing site clearer before going live.",
    icon: SquarePen,
  },
  {
    title: "Website Build",
    price: "$3,000+",
    desc: "Simple campaign-ready website for businesses that need an online home.",
    icon: Globe,
  },
  {
    title: "Logo Refresh",
    price: "$800+",
    desc: "Cleaner logo direction for businesses that want to look more current and credible.",
    icon: Palette,
  },
  {
    title: "Social Post Design",
    price: "$400+",
    desc: "Branded post graphics for Instagram, Facebook, or both.",
    icon: Image,
  },
];

const packageFaqs = [
  {
    q: "Do I need to provide photos or content?",
    a: "Not necessarily. As a graphic designer I can create everything from scratch — branded graphics, carousels, reels, and promotional visuals. If you have photos of your business, products, or team you'd like included, you're welcome to send them and I'll incorporate them into your content. Either way, everything will look professional and on brand.",
  },
  {
    q: "How do I give feedback on posts?",
    a: "Everything is handled by email. Before anything goes live, you'll receive your content batch for review and approval. Simply reply with any feedback and I'll make adjustments. Nothing gets posted without your approval first.",
  },
  {
    q: "What happens after I fill out the agreement?",
    a: "Once your agreement is submitted I'll review it and send you a payment link within 1–2 business days. Work begins after payment is received. You'll then receive an onboarding email with everything I need from you to get started.",
  },
  {
    q: "When do I pay?",
    a: "Payment is due before each service month begins. For the Standard package your first month is due upfront with no long-term commitment. For Pro and Premium the first month payment locks in your 3-month minimum.",
  },
  {
    q: "What if I want to cancel?",
    a: "All packages require a 3-month minimum commitment — Standard from month 2 onward, Pro and Premium from day one. After the minimum period is complete either party can end the agreement in writing with no penalty. Payments already made are non-refundable as outlined in the agreement.",
  },
  {
    q: "Do you guarantee results?",
    a: "No — and any agency that does is not being honest with you. Social media growth depends on many factors including your industry, offer, audience, and how long you've been active. What I do guarantee is professional quality content delivered on time, every month, with a clear strategy behind it. Most businesses in their first 3–6 months focus on building a foundation — consistent branding, growing a following, and getting in front of the right audience. Meaningful engagement typically develops over time as your presence becomes established. By month 6 most of my clients are seeing consistent reach, growing followers, and real interest from new customers. By month 9–12 the results tend to compound — content that's been building for months starts working together and the growth becomes much more noticeable. Social media is a long game. The businesses that commit and stay consistent are the ones that win. That's exactly why my packages require a minimum commitment — not to lock you in, but because I know from experience that the real results come to those who stick with it.",
  },
  {
    q: "When should I start running ads?",
    a: "We recommend waiting at least 60 days before running any paid ads. This gives your profile time to build credibility — consistent content, a growing following, and an established brand presence. When someone clicks an ad and lands on a new empty profile they leave immediately. Ads work best when there is already something worth seeing. We will monitor your account and let you know exactly when you are ready to start getting the most out of your ad spend.",
  },
  {
    q: "How does the first month trial work for Standard?",
    a: "The Standard package offers a no-commitment first month — you pay $1,500, I set up your profiles, create your first content batch, and begin publishing. At the end of month 1 you decide if you'd like to continue. If you do, a 3-month minimum begins from month 2. If not, we part ways with no hard feelings.",
  },
  {
    q: "Who pays for the ad spend?",
    a: "You do — directly to Meta. My fee covers the strategy, creative, and management of your ads. Your ad budget goes straight from your account to Meta so you stay in full control of your spending. I'll recommend a budget based on your goals but the final decision is always yours.",
  },
];

const renderFeature = (feature: string | { text: string; tags?: string[]; note?: string }) => (
  typeof feature === "string" ? (
    feature
  ) : (
    <span className="block">
      <span className="flex flex-wrap items-center gap-1.5">
        <span>{feature.text}</span>
        {feature.tags?.map((tag) => (
          <span key={tag} className="rounded-pill bg-[#ead2d9] px-2.5 py-1 font-accent text-[8px] uppercase tracking-[2px] text-[#9b5369]">
            {tag}
          </span>
        ))}
      </span>
      {feature.note && (
        <span className="mt-1 block text-[11.5px] italic leading-relaxed text-dollhouse-text-light">
          {feature.note}
        </span>
      )}
    </span>
  )
);

const LocalBusinessPackages = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [quoteName, setQuoteName] = useState("");
  const [quoteBusiness, setQuoteBusiness] = useState("");
  const [quoteEmail, setQuoteEmail] = useState("");
  const [quoteProject, setQuoteProject] = useState("");
  const [quoteBusinessType, setQuoteBusinessType] = useState("");
  const [quoteWebsite, setQuoteWebsite] = useState("");
  const [quoteTimeline, setQuoteTimeline] = useState("");
  const [quoteBudget, setQuoteBudget] = useState("");
  const [quoteStatus, setQuoteStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const timelineOptions = [
    "As soon as possible",
    "Within 2 weeks",
    "Within 1 month",
    "Within 2 to 3 months",
    "No specific deadline",
  ];

  const budgetOptions = [
    "Under $500",
    "$500 to $1,000",
    "$1,000 to $2,500",
    "$2,500 to $5,000",
    "$5,000 to $10,000",
    "$10,000+",
  ];

  const handleQuoteSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuoteStatus("sending");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _subject: `Custom Quote Request - ${quoteBusiness || quoteName || "Local Business"}`,
          formType: "Custom quote request",
          fullName: quoteName,
          businessName: quoteBusiness,
          email: quoteEmail,
          projectDetails: quoteProject,
          businessType: quoteBusinessType,
          websiteUrl: quoteWebsite || "Not provided",
          projectTimeline: quoteTimeline,
          approximateBudget: quoteBudget,
        }),
      });

      if (!response.ok) {
        setQuoteStatus("error");
        return;
      }

      setQuoteStatus("success");
      setQuoteName("");
      setQuoteBusiness("");
      setQuoteEmail("");
      setQuoteProject("");
      setQuoteBusinessType("");
      setQuoteWebsite("");
      setQuoteTimeline("");
      setQuoteBudget("");
    } catch {
      setQuoteStatus("error");
    }
  };

  const quoteInputClass = "mt-2 w-full border-0 border-b border-[#C4B5A5] bg-transparent px-0 py-3 text-[14px] text-dollhouse-ink outline-none transition-colors focus:border-dollhouse-ink";
  const quoteSelectClass = `${quoteInputClass} [&&]:text-dollhouse-ink [&&]:accent-[#C9A0A0]`;
  const quoteLabelClass = "block font-accent text-[8px] tracking-[2px] uppercase text-dollhouse-text-mid font-medium";

  return (
  <section id="local-business" className="px-6 py-20 max-w-[1320px] mx-auto">
    <div className="text-center mb-14">
      <Eyebrow text="Service Menu" className="mb-4" />
      <h2 className="font-display italic font-normal text-dollhouse-ink text-[clamp(30px,5vw,56px)] leading-tight">
        Done-for-You Content Creation
      </h2>
      <p className="text-[13.5px] text-dollhouse-text-light font-light mt-4 max-w-[650px] mx-auto leading-relaxed">
        Professional social media content for established local businesses starting from zero. You focus on running your business — we handle everything else.
      </p>
    </div>

    <div className="mb-16 grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-dollhouse-p3/25 bg-card p-8">
        <h3 className="font-display italic text-[28px] font-normal text-dollhouse-ink">Who This Is For</h3>
        <p className="mt-2 font-accent text-[9px] uppercase tracking-[3px] text-dollhouse-p3">This is for you if:</p>
        <ul className="list-none p-0 mt-4 space-y-2">
          {isFor.map((item) => (
            <li key={item} className="relative pl-5 text-[12.5px] font-light leading-relaxed text-dollhouse-text-mid">
              <span className="absolute left-0 top-[0.5em] h-1.5 w-1.5 rounded-full bg-[#d0b6a9]" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-dollhouse-p3/25 bg-[#f7f1ec] p-8">
        <h3 className="font-display italic text-[28px] font-normal text-dollhouse-ink">Not the Right Fit If</h3>
        <p className="mt-2 font-accent text-[9px] uppercase tracking-[3px] text-dollhouse-p3">This is not for you if:</p>
        <ul className="list-none p-0 mt-4 space-y-2">
          {notFor.map((item) => (
            <li key={item} className="relative pl-5 text-[12.5px] font-light leading-relaxed text-dollhouse-text-mid">
              <span className="absolute left-0 top-[0.5em] h-1.5 w-1.5 rounded-full bg-dollhouse-p3/50" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="grid gap-10 lg:grid-cols-3 items-stretch">
      {packages.map((pkg) => (
        <article
          key={pkg.title}
          className={`relative flex h-full min-h-[720px] flex-col rounded-2xl border bg-card p-9 shadow-[0_18px_55px_rgba(60,45,39,0.06)] ${
            pkg.featured
              ? "border-dollhouse-ink ring-2 ring-[#d0b6a9]/45 lg:-translate-y-3"
              : "border-dollhouse-p3/25"
          }`}
        >
          {pkg.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className={`inline-flex whitespace-nowrap rounded-pill font-accent uppercase ring-2 ring-card ${
                pkg.featured
                  ? "bg-dollhouse-ink text-card px-4 py-1.5 text-[9px] tracking-[2.5px] shadow-md"
                  : "bg-[#ead2d9] text-[#9b5369] px-2.5 py-0.5 text-[7px] tracking-[1px] shadow-sm"
              }`}>
                {pkg.badge}
              </span>
            </div>
          )}

          <div className="border-b border-dollhouse-p3/15 pb-6">
            <p className="font-accent text-[9px] uppercase tracking-[3px] text-dollhouse-p3">Content Creation</p>
            <h3 className="mt-3 font-display italic text-[35px] font-normal text-dollhouse-ink">{pkg.title}</h3>
            <div className="mt-3 flex items-end gap-2">
              <span className="font-display italic text-[37px] text-dollhouse-ink">{pkg.price}</span>
              <span className="pb-2 font-accent text-[8px] uppercase tracking-[3px] text-dollhouse-text-light">Monthly</span>
            </div>
            <p className="mt-4 text-[12.5px] font-light leading-relaxed text-dollhouse-text-light">{pkg.description}</p>
          </div>

          <div className="mt-5">
            <p className="font-accent text-[9px] uppercase tracking-[3px] text-dollhouse-p3">What's Included</p>
            <ul className="list-none p-0 mt-3 space-y-3">
              {pkg.included.map((feature) => (
                <li key={typeof feature === "string" ? feature : feature.text} className="relative pl-5 text-[12.5px] font-light leading-relaxed text-dollhouse-text-mid">
                  <span className="absolute left-0 top-[0.5em] h-1.5 w-1.5 rounded-full bg-[#d0b6a9]" />
                  {renderFeature(feature)}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-5 rounded-xl bg-[#f7f1ec] px-4 py-3 text-[12px] font-light leading-relaxed text-dollhouse-text-mid">
            {pkg.platforms}
          </p>

          <div className="mt-5">
            <p className="font-accent text-[9px] uppercase tracking-[3px] text-dollhouse-p3">Timeline</p>
            <ul className="list-none p-0 mt-3 space-y-2">
              {pkg.timeline.map((item) => (
                <li key={item} className="text-[11.5px] font-light leading-relaxed text-dollhouse-text-light">{item}</li>
              ))}
            </ul>
          </div>

          <p className="mt-5 border-t border-dollhouse-p3/15 pt-4 text-[11.5px] font-light italic leading-relaxed text-dollhouse-text-light">
            {pkg.note}
          </p>

          <a
            href="#agreement"
            className={`mt-auto flex items-center justify-center rounded-pill px-5 py-3 font-accent text-[9px] uppercase tracking-[3px] no-underline transition-all duration-300 ${
              pkg.featured
                ? "bg-dollhouse-ink text-card hover:opacity-90"
                : "border border-dollhouse-ink text-dollhouse-ink hover:bg-dollhouse-ink hover:text-card"
            }`}
          >
            Get Started →
          </a>
        </article>
      ))}
    </div>

    <div className="dh-reveal mx-auto mt-16 max-w-[900px] rounded-[24px] border border-[#D4C9C0] bg-[#EDE8E3] p-12 shadow-[0_22px_70px_rgba(60,45,39,0.08)]">
      <div className="text-center">
        <p className="font-accent text-[9px] uppercase tracking-[3px] text-dollhouse-p3">Custom Projects</p>
        <h3 className="mt-3 font-display italic text-[clamp(34px,5vw,56px)] font-normal leading-tight text-dollhouse-ink">
          Something Else in Mind?
        </h3>
        <p className="mx-auto mt-4 max-w-[610px] text-[13.5px] font-light leading-relaxed text-dollhouse-text-light">
          Not sure which package is right for you, or need something specific that isn't listed here? Tell me what you're working on and I'll put together a custom quote — no commitment required.
        </p>
      </div>

      <form onSubmit={handleQuoteSubmit} action={FORMSPREE_ENDPOINT} method="POST" className="mx-auto mt-8 grid max-w-[640px] gap-5">
        <label className="block">
          <span className={quoteLabelClass}>Full Name</span>
          <input
            required
            value={quoteName}
            onChange={(event) => setQuoteName(event.target.value)}
            className={quoteInputClass}
          />
        </label>

        <label className="block">
          <span className={quoteLabelClass}>Business Name</span>
          <input
            required
            value={quoteBusiness}
            onChange={(event) => setQuoteBusiness(event.target.value)}
            className={quoteInputClass}
          />
        </label>

        <label className="block">
          <span className={quoteLabelClass}>Email Address</span>
          <input
            required
            type="email"
            value={quoteEmail}
            onChange={(event) => setQuoteEmail(event.target.value)}
            className={quoteInputClass}
          />
        </label>

        <label className="block">
          <span className={quoteLabelClass}>Tell me about your project — what do you need and what are you working toward?</span>
          <textarea
            required
            rows={5}
            value={quoteProject}
            onChange={(event) => setQuoteProject(event.target.value)}
            className={`${quoteInputClass} resize-none`}
          />
        </label>

        <label className="block">
          <span className={quoteLabelClass}>What type of business do you have?</span>
          <input
            required
            type="text"
            placeholder="eg. Restaurant, Salon, Retail, Clinic"
            value={quoteBusinessType}
            onChange={(event) => setQuoteBusinessType(event.target.value)}
            className={quoteInputClass}
          />
        </label>

        <label className="block">
          <span className={quoteLabelClass}>Do you have a website? If so drop the link here</span>
          <input
            type="text"
            placeholder="eg. www.yourbusiness.com"
            value={quoteWebsite}
            onChange={(event) => setQuoteWebsite(event.target.value)}
            className={quoteInputClass}
          />
        </label>

        <label className="block">
          <span className={quoteLabelClass}>When do you need this done by?</span>
          <select
            required
            value={quoteTimeline}
            onChange={(event) => setQuoteTimeline(event.target.value)}
            className={quoteSelectClass}
          >
            <option value="" disabled>Select a timeline</option>
            {timelineOptions.map((option) => (
              <option key={option} value={option} className="bg-[#C9A0A0] text-white">
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className={quoteLabelClass}>What is your approximate budget?</span>
          <select
            required
            value={quoteBudget}
            onChange={(event) => setQuoteBudget(event.target.value)}
            className={quoteSelectClass}
          >
            <option value="" disabled>Select your budget range</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option} className="bg-[#C9A0A0] text-white">
                {option}
              </option>
            ))}
          </select>
        </label>

        {quoteStatus === "success" && (
          <p className="rounded-2xl border border-dollhouse-p3/20 bg-card px-4 py-4 text-[12.5px] font-light leading-relaxed text-dollhouse-text-mid">
            Thank you! I'll review your project details and get back to you within 1 to 2 business days with a custom quote.
          </p>
        )}

        {quoteStatus === "error" && (
          <p className="rounded-2xl border border-[#C9A0A0] bg-card px-4 py-4 text-[12.5px] font-light leading-relaxed text-dollhouse-text-mid">
            Something went wrong. Please try again or email us directly at {CONTACT_EMAIL}
          </p>
        )}

        <button
          type="submit"
          disabled={quoteStatus === "sending"}
          className="mt-1 flex w-full items-center justify-center rounded-pill bg-dollhouse-ink px-5 py-4 font-accent text-[9px] font-medium uppercase tracking-[3px] text-card transition-all duration-300 hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
        >
          {quoteStatus === "sending" ? "Sending Request..." : "Request a Custom Quote →"}
        </button>
      </form>
    </div>

    <div className="mt-16 rounded-2xl border border-dollhouse-p3/20 bg-[#f7f1ec] px-6 py-5 text-center">
      <p className="text-[12px] font-light leading-relaxed text-dollhouse-text-mid">
        Standard: free first month, then 3-month minimum · Pro + Premium: 3-month minimum · Ad spend paid directly to Meta by client · All communication via email
      </p>
    </div>

    <div className="dh-reveal mt-16 border-t border-dollhouse-p3/20 pt-10">
      <p className="mb-4 font-accent text-[9px] uppercase tracking-[3px] text-dollhouse-p3">Monthly Add-Ons</p>

      <div className="grid gap-8 md:grid-cols-3">
        {monthlyAddons.map((addon) => {
          const Icon = addon.icon;

          return (
            <article key={addon.title} className="rounded-2xl border border-dollhouse-p3/25 bg-card p-9">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#d0b6a9]/30 text-dollhouse-ink ring-1 ring-dollhouse-p3/25">
                <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
              </div>
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <h4 className="font-accent text-[10px] uppercase tracking-[3px] text-dollhouse-p3">{addon.title}</h4>
                <p className="font-display italic text-[20px] text-dollhouse-ink whitespace-nowrap">{addon.price}</p>
              </div>
              {addon.availability && (
                <p className="mb-3 rounded-xl bg-[#f7f1ec] px-3 py-2 text-[11.5px] font-light italic leading-relaxed text-dollhouse-text-mid">
                  {addon.availability}
                </p>
              )}
              <ul className="list-none p-0 mt-3 space-y-1">
                {addon.includes.map((item) => (
                  <li key={item} className="relative pl-4 text-[12px] font-light leading-relaxed text-dollhouse-text-light">
                    <span className="absolute left-0 text-dollhouse-p3">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>

    <div className="dh-reveal mt-20 border-t-2 border-[#D4C9C0] pt-12">
      <div className="mb-10 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#C4B5A5]" />
        <p className="font-accent text-[9px] uppercase tracking-[3px] text-dollhouse-p3">One-Time Projects</p>
        <div className="h-px flex-1 bg-[#C4B5A5]" />
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {projectAddons.map((addon) => {
          const Icon = addon.icon;

          return (
            <article key={addon.title} className="rounded-2xl border border-dollhouse-p3/25 bg-card p-9">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#d0b6a9]/30 text-dollhouse-ink ring-1 ring-dollhouse-p3/25">
                <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
              </div>
              <h4 className="font-accent text-[9px] uppercase tracking-[3px] text-dollhouse-p3">{addon.title}</h4>
              <p className="mt-2 font-display italic text-[22px] text-dollhouse-ink">{addon.price}</p>
              <p className="mt-3 text-[12px] font-light leading-relaxed text-dollhouse-text-light">{addon.desc}</p>
            </article>
          );
        })}
      </div>
    </div>

    <div className="dh-reveal mt-20 rounded-2xl border border-dollhouse-p3/25 bg-card p-8">
      <div className="text-center mb-5">
        <Eyebrow text="Questions" className="mb-3" />
        <h3 className="font-display italic font-normal text-dollhouse-ink text-[clamp(24px,3vw,36px)]">Service FAQ</h3>
      </div>
      <div className="divide-y divide-dollhouse-p3/20">
        {packageFaqs.map((faq, index) => {
          const isOpen = openFaq === index;

          return (
            <div key={faq.q} className="border-b border-dollhouse-p3/20 last:border-b-0">
              <button
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 rounded-lg bg-transparent px-3 py-4 text-left transition-colors duration-200 hover:bg-[#F5F0EB]"
                aria-expanded={isOpen}
              >
                <span className="font-display italic text-[19px] font-medium text-dollhouse-ink">{faq.q}</span>
                <span
                  className={`inline-flex h-6 w-6 flex-shrink-0 items-center justify-center text-[18px] text-dollhouse-p3 transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              {isOpen && (
                <p className="px-3 pb-4 text-[12.5px] font-light leading-relaxed text-dollhouse-text-light">{faq.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </section>
  );
};

export default LocalBusinessPackages;
