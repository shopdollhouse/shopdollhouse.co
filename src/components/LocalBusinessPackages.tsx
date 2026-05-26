import { useState, type FormEvent } from "react";
import Eyebrow from "@/components/Eyebrow";
import { ChevronDown, ChevronUp, Globe, Image, Mail, Megaphone, Palette, PenTool, ShoppingBag, SquarePen } from "lucide-react";

const CONTACT_EMAIL = "hello@shopdollhouse.co";
const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/mwvrvrzj";

const packages = [
  {
    title: "AI Social Starter",
    price: "$800/mo",
    priceValue: "Upgrade to AI Clone Content for video content",
    badge: "First Month · No Commitment",
    description: "The perfect entry point. Build trust, generate leads, and get your business showing up online.",
    included: [
      "5 branded AI generated posts per week",
      "Automated comment to DM lead generation",
      "AI built lead magnet",
      "Missed call text back system",
      "Lead connector app access",
      "Content scheduled and published for you",
      "Monthly analytics report",
    ],
    platforms: "Best for: Businesses with no social media presence who want to start strong without a big commitment",
    timeline: [
      "Week 1 — Setup and lead magnet creation",
      "Week 2 — AI content generation begins",
      "Week 3 — Automation systems go live",
      "Week 4 — Full system operational",
    ],
    note: "First month — no commitment · 3-month minimum from month 2",
  },
  {
    title: "AI Clone Content",
    price: "$1,500/mo",
    priceValue: "Upgrade to The Full System for complete growth engine",
    badge: "Most Popular",
    description: "Your face. Your voice. Showing up online every single day without you lifting a finger.",
    included: [
      "AI video clone built from your likeness",
      "3 AI clone video posts per week",
      "Branded graphics and captions",
      "Content scheduled and published for you",
      "Automated comment to DM lead generation",
      "Monthly analytics report",
    ],
    platforms: "Best for: Business owners who want to build a personal brand and connect with their audience through video without being on camera every day",
    timeline: [
      "Week 1 — AI clone recording and setup",
      "Week 2 — Clone training and content strategy",
      "Week 3 — First AI clone videos ready",
      "Week 4 — Publishing begins",
    ],
    note: "3-month minimum",
    featured: true,
  },
  {
    title: "The Full System",
    price: "$2,500/mo",
    priceValue: "Complete done-for-you growth engine with ads and lead generation",
    description: "The complete done-for-you growth engine. Content, automation, ads, and lead generation all working together every single day.",
    included: [
      "Daily content — AI generated carousels and graphics 5 days a week",
      "AI clone video content — 3 high impact videos per week showcasing the business owner",
      "Comment to DM automation",
      "AI built lead magnet",
      "Missed call text back system",
      "Lead connector app access",
      "3 pinned AI generated high impact posts with boosted ad spend applied",
      "Boosted posts driving real traffic and bookings",
      "Full analytics dashboard and monthly report",
      "Brand colors, fonts, and assets pulled and applied automatically",
    ],
    platforms: "Best for: Established businesses ready to turn their social media into a full lead generation machine",
    timeline: [
      "Week 1 — Full system setup and AI clone recording",
      "Week 2 — Content strategy and lead magnet creation",
      "Week 3–4 — First content batch and automation go live",
      "Month 2 — Ads launched and optimization begins",
    ],
    note: "3-month minimum · Ad spend billed separately — minimum $250/mo recommended",
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
    title: "Extra AI Video Posts",
    price: "+$200/mo",
    includes: ["2 additional videos per week", "AI clone content", "Branded and scheduled"],
    icon: Megaphone,
  },
  {
    title: "Extra Platforms",
    price: "+$150/mo",
    includes: ["Per additional platform", "Beyond what's included", "Full content and automation"],
    icon: Globe,
  },
  {
    title: "Email Marketing Automation",
    price: "+$300/mo",
    includes: ["Automated email sequences", "Connected to your lead magnet", "Nurture leads automatically"],
    icon: Mail,
  },
  {
    title: "Reputation Management",
    price: "+$200/mo",
    includes: ["Automated review requests", "Sent after every appointment", "Build 5-star reputation"],
    icon: PenTool,
  },
];

const projectAddons = [
  {
    title: "AI Clone Setup",
    price: "$500",
    desc: "Standalone AI video clone creation without a monthly package.",
    icon: Megaphone,
  },
  {
    title: "Full GHL Funnel Build",
    price: "$1,500",
    desc: "Complete lead generation funnel with landing page, automation, and email sequence.",
    icon: Globe,
  },
  {
    title: "Lead Magnet Design and Copy",
    price: "$400",
    desc: "Professionally designed PDF lead magnet built for your business.",
    icon: PenTool,
  },
  {
    title: "GoHighLevel Account Setup",
    price: "$750",
    desc: "Complete GHL account setup, automation build, and platform connections done for you.",
    icon: Mail,
  },
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
    title: "Custom Web App",
    price: "$800+",
    desc: "Custom web application built for your specific business needs.",
    icon: Image,
  },
];

const packageFaqs = [
  {
    q: "How does the AI clone work?",
    a: "We record you for about 15 minutes capturing your voice, mannerisms, and expressions. The AI then creates a digital clone that can speak any script we write. You approve every video before it goes live, so you maintain full control over what's being said in your name.",
  },
  {
    q: "What platforms do you support?",
    a: "We primarily work with Instagram and Facebook, where most local business customers are. Additional platforms can be added as a monthly add-on if you need to expand your reach.",
  },
  {
    q: "How does the lead generation automation work?",
    a: "Our system automatically engages with commenters on your posts, moving them from comments to DMs, and capturing their information into your lead connector app. Combined with AI-built lead magnets and missed call text-back, it creates a seamless lead capture system that works 24/7.",
  },
  {
    q: "What happens after I fill out the agreement?",
    a: "Once your agreement is submitted I'll review it and send you a payment link within 1–2 business days. Work begins after payment is received. You'll then receive an onboarding email with everything I need from you to get started.",
  },
  {
    q: "When do I pay?",
    a: "Payment is due before each service month begins. For AI Social Starter your first month is due upfront with no long-term commitment. For AI Clone Content and The Full System the first month payment locks in your 3-month minimum.",
  },
  {
    q: "What if I want to cancel?",
    a: "All packages require a 3-month minimum commitment — AI Social Starter from month 2 onward, AI Clone Content and The Full System from day one. After the minimum period is complete either party can end the agreement in writing with no penalty. Payments already made are non-refundable as outlined in the agreement.",
  },
  {
    q: "Do you guarantee results?",
    a: "No — and any agency that does is not being honest with you. Social media growth depends on many factors including your industry, offer, audience, and how long you've been active. What I do guarantee is professional quality content delivered on time, every month, with a clear strategy behind it. AI-powered systems increase efficiency and consistency, but meaningful engagement and results develop over time as your presence becomes established. The businesses that commit and stay consistent are the ones that win.",
  },
  {
    q: "Who pays for the ad spend?",
    a: "You do — directly to Meta. My fee covers the strategy, creative, and management of your ads. Your ad budget goes straight from your account to Meta so you stay in full control of your spending. I'll recommend a budget based on your goals but the final decision is always yours.",
  },
  {
    q: "What is GoHighLevel?",
    a: "GoHighLevel (GHL) is the CRM and automation platform we use to power your lead generation systems. It handles missed call text-back, lead capture, email automation, and more. If you don't have an account, we can set one up for you as a one-time add-on.",
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
  const [openIncluded, setOpenIncluded] = useState<number | null>(null);
  const [quoteName, setQuoteName] = useState("");
  const [quoteBusiness, setQuoteBusiness] = useState("");
  const [quoteEmail, setQuoteEmail] = useState("");
  const [quoteProject, setQuoteProject] = useState("");
  const [quoteBusinessType, setQuoteBusinessType] = useState("");
  const [quoteWebsite, setQuoteWebsite] = useState("");
  const [quoteTimeline, setQuoteTimeline] = useState("");
  const [quoteBudget, setQuoteBudget] = useState("");
  const [quoteStatus, setQuoteStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [timelineMenuOpen, setTimelineMenuOpen] = useState(false);
  const [budgetMenuOpen, setBudgetMenuOpen] = useState(false);

  const timelineOptions = [
    "As soon as possible",
    "Within the next month",
    "In 1 to 3 months",
    "Just exploring for now",
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
        AI Powered Social Media Automation
      </h2>
      <p className="text-[13.5px] text-dollhouse-text-light font-light mt-4 max-w-[650px] mx-auto leading-relaxed">
        AI powered social media content, automation, and lead generation for established local businesses in the GTA. You focus on running your business — we handle everything else.
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
      {packages.map((pkg, index) => (
        <article
          key={pkg.title}
          className={`relative flex h-full min-h-[720px] flex-col rounded-2xl border bg-card p-9 shadow-[0_18px_55px_rgba(60,45,39,0.06)] ${
            pkg.featured
              ? "border-dollhouse-ink ring-2 ring-[#d0b6a9]/45 lg:-translate-y-3"
              : "border-dollhouse-p3/25"
          }`}
        >
          {pkg.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 max-w-[calc(100%-32px)]">
              <span className={`inline-flex whitespace-nowrap rounded-pill font-accent uppercase ring-2 ring-card ${
                pkg.featured
                  ? "bg-dollhouse-ink text-card px-4 py-1.5 text-[9px] tracking-[2.5px] shadow-md"
                  : "bg-[#ead2d9] text-[#9b5369] px-3 py-1 text-[8px] tracking-[1.5px] shadow-sm"
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
            {pkg.priceValue && <p className="mt-2 text-[11px] font-light italic text-dollhouse-text-light">{pkg.priceValue}</p>}
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

    <p className="mt-8 text-center text-[11.5px] font-light italic leading-relaxed text-dollhouse-text-light">
      Trusted by established local businesses across the GTA.
    </p>

    <div className="dh-reveal mx-auto mt-16 max-w-[900px] rounded-[24px] border border-[#D4C9C0] bg-[#EDE8E3] p-12 shadow-[0_22px_70px_rgba(60,45,39,0.08)]">
      <div className="text-center">
        <p className="font-accent text-[9px] uppercase tracking-[3px] text-dollhouse-p3">Custom Projects</p>
        <h3 className="mt-3 font-display italic text-[clamp(34px,5vw,56px)] font-normal leading-tight text-dollhouse-ink">
          Something Else in Mind?
        </h3>
        <p className="mx-auto mt-4 max-w-[610px] text-[13.5px] font-light leading-relaxed text-dollhouse-text-light">
          Not a package person? Tell me what you need and I'll build something around you. I'll review your request and get back to you within 2 business days — no commitment required.
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
          <span className={quoteLabelClass}>Preferred start date</span>
          <div className="relative mt-2">
            <button
              type="button"
              onClick={() => setTimelineMenuOpen((open) => !open)}
              className="w-full border-0 border-b border-[#C4B5A5] bg-transparent px-0 py-3 text-left text-[14px] text-dollhouse-ink outline-none transition-colors focus:border-dollhouse-ink flex items-center justify-between"
              aria-haspopup="listbox"
              aria-expanded={timelineMenuOpen}
            >
              {quoteTimeline || "Select a timeline"}
              <ChevronDown size={16} className="text-dollhouse-text-light" />
            </button>
            {timelineMenuOpen && (
              <div
                role="listbox"
                className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-2xl border border-dollhouse-p3/20 bg-card shadow-[0_18px_45px_rgba(60,45,39,0.13)]"
              >
                {timelineOptions.map((option) => {
                  const isSelected = quoteTimeline === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setQuoteTimeline(option);
                        setTimelineMenuOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-[14px] transition-colors ${
                        isSelected ? "bg-[#C9A0A0] text-white" : "text-dollhouse-ink hover:bg-[#f7f1ec]"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </label>

        <label className="block">
          <span className={quoteLabelClass}>What is your approximate budget?</span>
          <div className="relative mt-2">
            <button
              type="button"
              onClick={() => setBudgetMenuOpen((open) => !open)}
              className="w-full border-0 border-b border-[#C4B5A5] bg-transparent px-0 py-3 text-left text-[14px] text-dollhouse-ink outline-none transition-colors focus:border-dollhouse-ink flex items-center justify-between"
              aria-haspopup="listbox"
              aria-expanded={budgetMenuOpen}
            >
              {quoteBudget || "Select your budget range"}
              <ChevronDown size={16} className="text-dollhouse-text-light" />
            </button>
            {budgetMenuOpen && (
              <div
                role="listbox"
                className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-2xl border border-dollhouse-p3/20 bg-card shadow-[0_18px_45px_rgba(60,45,39,0.13)]"
              >
                {budgetOptions.map((option) => {
                  const isSelected = quoteBudget === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setQuoteBudget(option);
                        setBudgetMenuOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-[14px] transition-colors ${
                        isSelected ? "bg-[#C9A0A0] text-white" : "text-dollhouse-ink hover:bg-[#f7f1ec]"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
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
        <p className="mt-3 text-center text-[11px] font-light italic text-dollhouse-text-light">
          You'll hear back within 2 business days. All communication is by email only.
        </p>
      </form>
    </div>

    <div className="mt-16 rounded-2xl border border-dollhouse-p3/20 bg-[#f7f1ec] px-6 py-5 text-center">
      <p className="text-[12px] font-light leading-relaxed text-dollhouse-text-mid">
        AI Social Starter: first month no commitment, then 3-month minimum · AI Clone Content + The Full System: 3-month minimum · Ad spend paid directly to Meta by client · All communication via email
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
              <div
                className="grid overflow-hidden transition-all duration-400 ease-out"
                style={{
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="px-3 pb-4 text-[12.5px] font-light leading-[1.7] text-dollhouse-text-light">{faq.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
  );
};

export default LocalBusinessPackages;
