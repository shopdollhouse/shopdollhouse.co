import Navbar from "@/components/Navbar";
import AnnouncementBar from "@/components/AnnouncementBar";
import TrustStrip from "@/components/TrustStrip";
import ProductCard from "@/components/ProductCard";
import FreeProductCard from "@/components/FreeProductCard";
import DollhouseArch from "@/components/DollhouseArch";
import HeartDivider from "@/components/HeartDivider";
import CornerFrame from "@/components/CornerFrame";
import Eyebrow from "@/components/Eyebrow";
import TestimonialSection from "@/components/TestimonialSection";
import SocialProofBar from "@/components/SocialProofBar";
import FAQSection from "@/components/FAQSection";
import WhoThisIsFor from "@/components/WhoThisIsFor";

import AboutSection from "@/components/AboutSection";
import DIYvsDFY from "@/components/DIYvsDFY";
import BundleComparison from "@/components/BundleComparison";
import CookieConsent from "@/components/CookieConsent";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import EmailCapture from "@/components/EmailCapture";
import useScrollReveal from "@/hooks/useScrollReveal";
import LegalModal, { useLegalModal } from "@/components/LegalModal";

import brandKitImg from "@/assets/product-brand-kit.webp";
import brandWorkbookImg from "@/assets/product-brand-workbook.webp";
import quizFreebieImg from "@/assets/product-quiz-freebie.webp";
import brandSuiteImg from "@/assets/product-brand-suite.webp";
import fullHouseImg from "@/assets/product-full-house.webp";
import promptKitImg from "@/assets/product-prompt-kit.webp";

const STAN_STORE = "https://stan.store/shopdollhouse";

const Index = () => {
  useScrollReveal();
  const { activeModal, openModal, closeModal } = useLegalModal();

  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Navbar />

      {/* ─── HERO ─── */}
      <CornerFrame className="min-h-[85vh] flex items-center justify-center text-center px-10 py-16">
        <div className="flex flex-col items-center max-w-[640px] animate-rise-in">
          <div className="animate-float-arch mb-6">
            <DollhouseArch />
          </div>

          <Eyebrow text="Build Your Brand. Start Your Business." className="mb-6" />

          <div className="font-display italic font-normal text-dollhouse-text-light text-[17px] tracking-[6px] mt-6 mb-[2px]">
            the
          </div>
          <h1 className="font-display italic font-normal text-dollhouse-ink text-[clamp(44px,7vw,72px)] tracking-[8px] leading-none mb-1.5 uppercase">
            Dollhouse
          </h1>

          <HeartDivider className="my-6" />

          <p className="font-display italic text-dollhouse-text-mid text-[clamp(14px,2vw,19px)] tracking-[3px] leading-relaxed max-w-[420px]">
            Stop guessing. Build a brand that actually sells — in a weekend.
          </p>

          {/* Not a PDF callout */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-pill bg-dollhouse-p3/10 border border-dollhouse-p3/25">
            <span className="text-[14px]">✦</span>
            <span className="font-display italic text-[11px] tracking-wide text-dollhouse-text-mid">
              Not a PDF sitting in your inbox — a live, interactive web app
            </span>
          </div>

          <div className="w-px h-10 bg-dollhouse-p3 opacity-40 my-6" />

          <div className="font-accent text-[9px] tracking-[5px] uppercase text-dollhouse-text-light font-normal mb-1">
            Interactive Apps · Workbooks · AI Prompts · Done-For-You
          </div>
          <p className="text-[12.5px] text-dollhouse-text-light font-light">
            Start, Build &amp; Sell — room by room
          </p>

          <div className="mt-9">
            <a
              href="#the-rooms"
              className="inline-flex items-center gap-2.5 px-11 py-[14px] bg-dollhouse-ink text-card border-none rounded-pill font-accent text-[10px] tracking-[3px] uppercase font-medium transition-all duration-300 hover:shadow-lg hover:shadow-dollhouse-ink/10 hover:-translate-y-0.5"
            >
              Explore the Rooms →
            </a>
          </div>
          <a
            href="/quiz"
            className="mt-3 font-display italic text-[13px] text-dollhouse-text-mid font-light tracking-wide no-underline border-b border-dollhouse-p3/40 pb-px hover:text-dollhouse-ink hover:border-dollhouse-ink transition-colors duration-200"
          >
            Not sure where to start? Take the free quiz &rarr;
          </a>

          <p className="mt-7 font-accent text-[8px] tracking-[3px] uppercase text-dollhouse-text-light">
            ★ Trusted by 500+ brand builders
          </p>
        </div>
      </CornerFrame>

      {/* ─── SOCIAL PROOF BAR ─── */}
      <SocialProofBar />

      {/* ─── TRUST STRIP ─── */}
      <TrustStrip />

      {/* ─── GOLD LINE ─── */}
      <div className="gold-line h-px max-w-[200px] mx-auto my-5" />

      {/* ─── WHO THIS IS FOR ─── */}
      <WhoThisIsFor />

      {/* ─── FLAGSHIP: BRAND KIT ─── */}
      <section id="the-rooms" className="px-6 py-10 max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <Eyebrow text="The Flagship Rooms" className="mb-4" />
          <h2 className="font-display italic font-normal text-dollhouse-ink text-[clamp(28px,4vw,44px)]">
            Build It. Plan It. Own It.
          </h2>
          <p className="text-[13px] text-dollhouse-text-light font-light mt-4 max-w-[520px] mx-auto leading-relaxed">
            Your brand blueprint and your year-round planning system — everything you need to launch and stay on track.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
          <ProductCard
            title="The Dollhouse Brand Kit"
            subtitle="The Complete System"
            description="Everything you need to build your brand from scratch. One guided process. Every decision made."
            price="$97"
            image={brandKitImg}
            ctaText="Get the Brand Kit →"
            ctaLink="https://stan.store/shopdollhouse/p/the-dollhouse--brand-starter-system-bet2kjnl"
            badge="Best Seller"
            featured
            features={[
              "Covers all 12 Dollhouse rooms",
              "Personalised output built for your business",
              "Name, voice & visual identity",
              "Positioning, pricing & platform — decided",
            ]}
            valueStack={[
              { item: "Complete Business Strategy", value: "$49" },
              { item: "12-Room Blueprint", value: "$39" },
              { item: "Brand Voice & Messaging", value: "$29" },
              { item: "90-Day Action Plan", value: "$19" },
              { item: "5 Colour Themes", value: "$9" },
            ]}
            crossedTotal="$145+"
          />

          <ProductCard
            title="AI Prompt Kit"
            subtitle="50+ Plug & Play Prompts"
            description="Never stare at a blank screen again. Room-specific prompts for listings, captions, content, and more. Just fill in the blanks and go."
            price="$17"
            image={promptKitImg}
            ctaText="Get the Prompt Kit →"
            ctaLink="https://stan.store/shopdollhouse/p/the-dollhouse-prompt-kit"
            features={[
              "50+ prompts organized by room",
              "Product listing templates",
              "Instagram caption starters",
              "Content & blog post prompts",
              "Email marketing templates",
            ]}
            valueStack={[
              { item: "50+ AI Prompts Library", value: "$49" },
              { item: "Room-by-Room Organization", value: "$29" },
              { item: "Listing Templates", value: "$19" },
              { item: "Caption Formulas", value: "$19" },
              { item: "Email Sequences", value: "$29" },
              { item: "Content Calendar", value: "$15" },
            ]}
            crossedTotal="$160+"
          />
        </div>

        <p className="text-center mt-6 font-accent text-[9px] tracking-[3px] uppercase text-dollhouse-text-light">
          ✦ Most Brand Kit users finish in under 24 hours
        </p>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="px-6 py-10 max-w-[1100px] mx-auto">
        <div className="text-center mb-10">
          <Eyebrow text="Simple by Design" className="mb-4" />
          <h2 className="font-display italic font-normal text-dollhouse-ink text-[clamp(28px,4vw,44px)]">
            How It Works
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-10 max-w-[800px] mx-auto">
          {[
            { step: "01", title: "Pick Your Path", desc: "Start free, grab a kit, or go done-for-you — choose what fits your stage." },
            { step: "02", title: "Follow the Process", desc: "Answer guided questions. Every decision builds on the last — no guesswork." },
            { step: "03", title: "Launch Your Brand", desc: "Walk away with a complete brand identity, ready to sell everywhere." },
          ].map((item, i) => (
            <div key={item.step} className={`dh-reveal d${i + 1} flex-1 min-w-[200px] max-w-[240px] text-center`}>
              <p className="font-display italic text-dollhouse-p3 text-[clamp(32px,4vw,52px)] leading-none mb-3">
                {item.step}
              </p>
              <h3 className="font-accent text-[10px] tracking-[3px] uppercase text-dollhouse-ink font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-[12.5px] text-dollhouse-text-light font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <TestimonialSection />

      {/* ─── THE ROOMS (PAID) ─── */}
      <section className="px-6 py-10 max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <Eyebrow text="The Brand Rooms" className="mb-4" />
          <h2 className="font-display italic font-normal text-dollhouse-ink text-[clamp(28px,4vw,44px)]">
            The Rooms
          </h2>
          <p className="text-[13px] text-dollhouse-text-light font-light mt-3 max-w-[360px] mx-auto">
            Pair with the Brand Kit or use on their own — each room builds your brand further.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
          <ProductCard
            title="Brand Workbook"
            subtitle="Room-by-Room Branding"
            badge="Bonus PDF Included"
            description="A structured workbook that walks you through every foundational decision your business needs."
            price="$47"
            image={brandWorkbookImg}
            ctaText="Get the Workbook →"
            ctaLink="https://stan.store/shopdollhouse/p/-build-a-real-brand-from-scratch"
            features={[
              "8-room structured framework",
              "Interactive exercises & prompts",
              "Use directly in your browser",
            ]}
            valueStack={[
              { item: "Foundation Room", value: "$49" },
              { item: "Positioning Suite", value: "$49" },
              { item: "Messaging Studio", value: "$49" },
              { item: "Offer Workroom", value: "$49" },
              { item: "Content & Visibility Plan", value: "$49" },
              { item: "Client Experience Room", value: "$49" },
              { item: "Growth Strategy Room", value: "$49" },
              { item: "Brand Identity Suite", value: "$49" },
              { item: "Bonus PDF Workbook", value: "$29" },
            ]}
            crossedTotal="$421+"
          />

          <ProductCard
            title="AI Prompt Kit"
            subtitle="50+ Ready-to-Use Prompts"
            description="Copy, content, strategy — 50+ prompts across 8 rooms, all ready to customize and use instantly."
            price="$17"
            image={promptKitImg}
            ctaText="Get the Prompts →"
            ctaLink="https://stan.store/shopdollhouse/p/the-dollhouse-prompt-kit"
            features={[
              "50+ AI prompts across 8 categories",
              "Copy, content & strategy covered",
              "Companion to the Brand Kit",
            ]}
          />
        </div>
      </section>

      {/* ─── GOLD LINE ─── */}
      <div className="gold-line h-px max-w-[200px] mx-auto my-5" />

      {/* ─── FREE ROOMS ─── */}
      <section id="free-rooms" className="px-6 py-10 max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <Eyebrow text="Start Here — It's Free" className="mb-4" />
          <h2 className="font-display italic font-normal text-dollhouse-ink text-[clamp(28px,4vw,44px)]">
            Free Rooms
          </h2>
          <p className="text-[13px] text-dollhouse-text-light font-light mt-3 max-w-[400px] mx-auto leading-relaxed">
            Answer 8 questions. Find out exactly where your brand is stuck — and what to do about it. No email required.
          </p>
        </div>

        {/* Single centred card */}
        <div className="flex justify-center">
          <div className="luxury-card bg-card overflow-hidden max-w-[480px] w-full flex flex-col border-2 border-dollhouse-ink/30 relative rounded-2xl shadow-[0_8px_40px_-12px_rgba(26,20,16,0.18)]">

            {/* FREE badge — bold & eye-catching */}
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center px-5 py-2 rounded-pill bg-dollhouse-ink text-card font-accent text-[11px] tracking-[4px] uppercase font-bold shadow-lg animate-pulse">
                ✦ FREE
              </span>
            </div>

            {/* Image */}
            <div className="relative overflow-hidden group">
              <img
                src={quizFreebieImg}
                alt="Brand Clarity Quiz — What's holding your brand back?"
                className="w-full h-[280px] object-cover transition-all duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dollhouse-ink/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="p-8">

              {/* Highlight chips */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {["8 Questions", "Personalised Result", "2 Minutes"].map((h) => (
                  <span
                    key={h}
                    className="inline-block px-2.5 py-1 rounded-pill bg-dollhouse-p3/12 text-dollhouse-p3 font-accent text-[7px] tracking-[2px] uppercase"
                  >
                    {h}
                  </span>
                ))}
              </div>

              <h3 className="font-display italic text-[26px] text-dollhouse-ink mb-2 font-normal leading-tight">
                Brand Clarity Quiz
              </h3>

              <p className="text-[13px] text-dollhouse-text-light font-light leading-relaxed mb-2">
                What's holding your brand back?
              </p>

              <p className="text-[12.5px] text-dollhouse-text-light font-light leading-relaxed mb-6">
                Answer 8 honest questions and find out exactly where you're stuck — with a personalised result and the right next step for where you are right now.
              </p>

              {/* Gold shimmer divider */}
              <div className="gold-line h-px mb-6" />

              {/* Three result types teaser */}
              <div className="flex flex-col gap-2 mb-6">
                {[
                  { label: "The Blank Canvas", desc: "Haven't started yet — need the foundation." },
                  { label: "The Almost Brand", desc: "Have pieces — nothing connects yet." },
                  { label: "The Hidden Gem", desc: "Built something — no one's found it yet." },
                ].map((r) => (
                  <div key={r.label} className="flex items-baseline gap-2.5">
                    <span className="text-[hsl(36,60%,58%)] text-[9px] shrink-0">✦</span>
                    <div>
                      <span className="font-display italic text-[14px] text-dollhouse-ink font-normal">{r.label}</span>
                      <span className="text-[12px] text-dollhouse-text-light font-light ml-2">{r.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Email capture inline */}
              <EmailCapture />
            </div>
          </div>
        </div>
      </section>


      {/* ─── DONE FOR YOU ─── */}
      <section id="dfy" className="px-6 py-10 max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <Eyebrow text="Done-For-You Services" className="mb-4" />
          <h2 className="font-display italic font-normal text-dollhouse-ink text-[clamp(28px,4vw,44px)]">
            Brand & Social Media Studio
          </h2>
          <p className="text-[13px] text-dollhouse-text-light font-light mt-3 max-w-[480px] mx-auto leading-relaxed">
            You hand it over. I build the brand foundation, then help you get seen with simple Facebook and Instagram ad systems.
          </p>
          <p className="text-[11px] text-dollhouse-text-light font-light mt-2.5">
            ✦ Limited spots available each month. Once filled, the next opening is the following month.
          </p>
          {/* Spots indicator */}
          <div className="inline-flex items-center gap-1.5 mt-3 px-4 py-1.5 rounded-pill bg-dollhouse-ink/8 border border-dollhouse-ink/20">
            <span className="w-1.5 h-1.5 rounded-full bg-dollhouse-ink inline-block shadow-[0_0_0_3px_rgba(26,20,16,0.15)]" />
            <span className="font-accent text-[9px] tracking-[3px] uppercase text-dollhouse-ink font-medium">
              2 spots left this month
            </span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
          <ProductCard
            title="The Starter Suite"
            subtitle="For new brands launching clean"
            description="Your complete brand identity, done for you. Strategy, visuals, voice — delivered ready to launch."
            price="$497"
            image={brandSuiteImg}
            ctaText="Book the Suite →"
            ctaLink="https://stan.store/shopdollhouse/p/the-dollhouse-brand-suite"
            features={[
              "Primary Logo + 1 Variation",
              "Colour Palette + Usage Guide",
              "Font Pairing with Examples",
              "1 Platform Banner",
              "3 Canva Templates",
              "Delivered within 10 days",
            ]}
            valueStack={[
              { item: "Primary Logo + 1 Variation", value: "$200" },
              { item: "Colour Palette + Usage Guide", value: "$80" },
              { item: "Font Pairing with Examples", value: "$60" },
              { item: "1 Platform Banner", value: "$80" },
              { item: "3 Canva Templates", value: "$120" },
            ]}
            crossedTotal="$540+"
            showGuarantee
          />

          <ProductCard
            title="Social Media Ads Setup"
            subtitle="Facebook + Instagram Ads"
            description="A done-for-you ad setup for business owners who want traffic, leads, or sales without getting lost in Ads Manager."
            price="$297+"
            priceNote="Setup"
            image={promptKitImg}
            ctaText="Inquire About Ads →"
            ctaLink="mailto:hello@shopdollhouse.co?subject=Social Media Ads Setup"
            badge="New Service"
            checkoutNote="Inquiry opens by email"
            features={[
              "Facebook & Instagram campaign setup",
              "Audience, budget & objective recommendations",
              "Ad copy direction and creative checklist",
              "Tracking, launch checks & simple reporting",
              "15-20 minute daily optimization plan",
              "Optional monthly management available",
            ]}
          />

          <ProductCard
            title="The Full House"
            subtitle="Complete brand identity, every platform"
            description="The ultimate done-for-you package — your brand, built for every platform you sell on."
            price="$997"
            image={fullHouseImg}
            ctaText="Book the Full House →"
            ctaLink="https://stan.store/shopdollhouse/p/the-dollhouse-full-house"
            badge="Most Popular"
            featured
            features={[
              "Primary Logo + 3 Variations",
              "Submark, Monogram + Favicon",
              "Extended Colour Palette",
              "Typography + Full Type Samples",
              "Illustrated Brand Mark",
              "Brand Cheat Sheet + Do's & Don'ts",
              "3 Platform Banners",
              "6 Canva Social Templates",
              "9 Product Listing Image Templates",
              "Delivered within 14 days",
            ]}
            valueStack={[
              { item: "Primary Logo + 3 Variations", value: "$350" },
              { item: "Submark, Monogram + Favicon", value: "$150" },
              { item: "Extended Colour Palette", value: "$180" },
              { item: "Typography + Full Type Samples", value: "$180" },
              { item: "Illustrated Brand Mark", value: "$180" },
              { item: "Brand Cheat Sheet + Do's & Don'ts", value: "$180" },
              { item: "3 Platform Banners", value: "$150" },
              { item: "6 Canva Social Templates", value: "$200" },
              { item: "9 Product Listing Image Templates", value: "$200" },
            ]}
            crossedTotal="$1,530+"
            showGuarantee
          />
        </div>

        <div className="dh-reveal max-w-[760px] mx-auto mt-10 border border-dollhouse-p3/20 rounded-2xl bg-card px-6 py-7 text-center">
          <Eyebrow text="How Social Ads Work" className="mb-3" />
          <h3 className="font-display italic font-normal text-dollhouse-ink text-[clamp(22px,3vw,32px)] mb-3">
            Set Up Once. Check Daily. Let the System Run.
          </h3>
          <p className="text-[13px] text-dollhouse-text-light font-light leading-relaxed max-w-[560px] mx-auto">
            Most business owners know they should be using Facebook and Instagram ads, but they do not want to learn campaigns, pixels, audiences, budgets, and daily checks from scratch. This service handles the setup, gives the ads a clear direction, and keeps the ongoing work simple.
          </p>
          <div className="grid gap-4 sm:grid-cols-3 mt-6 text-left">
            {[
              { title: "01 Setup", desc: "Campaigns, audiences, budgets, placements, and tracking are built around the business goal." },
              { title: "02 Launch", desc: "Ads go live with clear copy direction, creative guidance, and a simple testing structure." },
              { title: "03 Optimize", desc: "Daily checks usually take 15-20 minutes once the system is running." },
            ].map((step) => (
              <div key={step.title} className="border-t border-dollhouse-p3/20 pt-3">
                <p className="font-accent text-[9px] tracking-[3px] uppercase text-dollhouse-p3 mb-2">{step.title}</p>
                <p className="text-[12px] text-dollhouse-text-mid font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-[10.5px] text-dollhouse-text-light font-light italic mt-5">
            Ad spend is billed separately by Meta. Results depend on offer, audience, creative, budget, and market conditions.
          </p>
        </div>

        {/* Bundle Comparison */}
        <BundleComparison />

        {/* DIY vs DFY */}
        <DIYvsDFY />

        {/* Waitlist */}
        <div className="dh-reveal text-center mt-8">
          <p className="font-display text-[12px] text-dollhouse-text-light font-light mb-3">Spots full for this month?</p>
          <a
            href="mailto:hello@shopdollhouse.co?subject=DFY Waitlist"
            className="font-accent text-[9px] tracking-[3px] uppercase text-dollhouse-ink no-underline border-b border-dollhouse-ink pb-px font-medium"
          >
            Join the waitlist →
          </a>
        </div>
      </section>

      {/* ─── LOCAL BUSINESS PAGE CTA ─── */}
      <section className="px-6 py-12 max-w-[760px] mx-auto text-center">
        <Eyebrow text="For Local Businesses" className="mb-4" />
        <h2 className="font-display italic font-normal text-dollhouse-ink text-[clamp(28px,4vw,44px)]">
          Facebook & Instagram Ads Support
        </h2>
        <p className="text-[13px] text-dollhouse-text-light font-light mt-3 max-w-[520px] mx-auto leading-relaxed">
          Send local business owners a dedicated page for monthly social media marketing retainers focused on Facebook and Instagram ads, starting at $500/month.
        </p>
        <a
          href="/local-business"
          className="inline-flex items-center justify-center mt-7 px-10 py-3.5 bg-dollhouse-ink text-card rounded-pill font-accent text-[10px] tracking-[3px] uppercase font-medium no-underline transition-all duration-300 hover:shadow-lg hover:shadow-dollhouse-ink/10 hover:-translate-y-0.5"
        >
          View Local Business Packages →
        </a>
      </section>

      {/* ─── FAQ ─── */}
      <FAQSection />

      {/* ─── GOLD LINE ─── */}
      <div className="gold-line h-px max-w-[200px] mx-auto my-5" />

      {/* ─── ABOUT ─── */}
      <AboutSection />

      {/* ─── FINAL CTA ─── */}
      <section className="px-6 py-16 text-center">
        <div className="max-w-[520px] mx-auto">
          <div className="animate-float-arch mb-6">
            <DollhouseArch className="mx-auto" />
          </div>
          <h2 className="font-display italic font-normal text-dollhouse-ink text-[clamp(28px,4vw,44px)] mb-4">
            Ready to Build Your Brand?
          </h2>
          <p className="text-[13px] text-dollhouse-text-mid font-light leading-relaxed mb-8">
            Start with a free room, grab the flagship kit, or let us build it for you.
            Whatever you choose — your brand starts today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#the-rooms"
              className="inline-flex items-center gap-2.5 px-10 py-3.5 bg-dollhouse-ink text-card rounded-pill font-accent text-[10px] tracking-[3px] uppercase font-medium transition-all duration-300 hover:shadow-lg hover:shadow-dollhouse-ink/10 hover:-translate-y-0.5 no-underline"
            >
              Explore the Rooms →
            </a>
            <a
              href={STAN_STORE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-10 py-3.5 border-2 border-dollhouse-ink text-dollhouse-ink rounded-pill font-accent text-[10px] tracking-[3px] uppercase font-medium transition-all duration-300 hover:bg-dollhouse-ink hover:text-card hover:-translate-y-0.5 no-underline"
            >
              Visit the Shop →
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-12 text-center border-t border-dollhouse-p3/15">
        <HeartDivider className="mb-8" />
        <div className="font-display italic text-dollhouse-text-light text-[15px] tracking-[6px] mb-[2px]">
          the
        </div>
        <p className="font-display italic text-dollhouse-ink text-2xl tracking-[6px] uppercase mb-4">
          Dollhouse
        </p>
        <p className="text-[12px] text-dollhouse-text-light font-light mb-6">
          Build your brand. Start your business. Do it this week.
        </p>

        {/* Social links (pill style) */}
        <div className="flex justify-center gap-4 mb-7 flex-wrap">
          {[
            { label: "Instagram", url: "https://www.instagram.com/mandyxdoll" },
            { label: "Threads", url: "https://www.threads.com/@mandyxdoll" },
            { label: "TikTok", url: "https://www.tiktok.com/@mandyxdoll" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-accent text-[10px] tracking-[3px] uppercase px-5 py-2.5 border border-dollhouse-p3/30 rounded-pill text-dollhouse-text-mid no-underline transition-all duration-200 hover:bg-dollhouse-ink hover:text-card hover:border-dollhouse-ink"
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Legal links */}
        <div className="flex justify-center gap-5 mb-5 flex-wrap">
          {[
            { label: "Privacy Policy", key: "privacy" },
            { label: "Terms of Use", key: "terms" },
            { label: "Refund Policy", key: "refund" },
            { label: "Contact", key: "contact" },
          ].map((l) => (
            <button
              key={l.key}
              onClick={() => openModal(l.key)}
              className="font-accent text-[8px] tracking-[2px] uppercase text-dollhouse-text-light bg-transparent border-none cursor-pointer hover:text-dollhouse-ink transition-colors p-0"
            >
              {l.label}
            </button>
          ))}
        </div>

        <p className="font-accent text-[8px] tracking-[3px] uppercase text-dollhouse-p3 mb-6">
          © {new Date().getFullYear()} The Dollhouse · All Rights Reserved
        </p>

        {/* Back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-transparent border border-dollhouse-p3/30 rounded-pill px-5 py-2 cursor-pointer font-accent text-[8px] tracking-[3px] uppercase text-dollhouse-text-light hover:text-dollhouse-ink transition-colors"
        >
          ↑ Back to Top
        </button>
      </footer>

      {/* ─── COOKIE CONSENT (in footer) ─── */}
      <CookieConsent />

      {/* ─── STICKY MOBILE CTA ─── */}
      <StickyMobileCTA />

      {/* ─── LEGAL MODALS ─── */}
      <LegalModal activeModal={activeModal} onClose={closeModal} />
    </div>
  );
};

export default Index;
