import { Fragment } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { usePageMeta } from "@/lib/use-page-meta";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/careers")({ component: CareersPage });

const RESUME = "mailto:hello@shopdollhouse.co?subject=Resume%20%E2%80%94%20The%20Dollhouse%20Brand%20Studio";

const VALUES: { icon: string; title: string; body: string }[] = [
  { icon: "⚡", title: "Move Fast", body: "We ship quickly and improve from real feedback. Done beats perfect." },
  { icon: "💛", title: "Client Obsessed", body: "Every decision starts with one question: does this help our clients grow?" },
  { icon: "✨", title: "Think Big", body: "We're building the future of done-for-you marketing. Dream big, execute bigger." },
  { icon: "🤍", title: "Care Deeply", body: "About our clients, our craft, and each other. We win as a team." },
];

const PERKS: { icon: string; title: string; body: string }[] = [
  { icon: "🏡", title: "Remote First", body: "Work from anywhere in Canada. We believe in flexibility and trust." },
  { icon: "🕐", title: "Flexible Schedule", body: "Manage your own time. We care about the work, not hours logged." },
  { icon: "🚀", title: "Real Impact", body: "Join early and directly shape how the studio grows from day one." },
  { icon: "📚", title: "Learning & Growth", body: "Sharpen your skills with new tools and challenges every week." },
  { icon: "🤖", title: "AI-Powered Work", body: "Work hands-on with cutting-edge AI content and automation tools." },
  { icon: "🎨", title: "Creative Freedom", body: "Bring your ideas. Beautiful, original work is the whole point." },
];

// Roles are ordered by hiring priority. `phaseStart` marks the first role of each phase.
const ROLES: {
  icon: string;
  title: string;
  summary: string;
  duties: string[];
  phaseStart?: { label: string; title: string; blurb: string };
}[] = [
  {
    icon: "🤝",
    title: "Executive & Personal Assistant",
    phaseStart: {
      label: "The Studio",
      title: "Content & Creative",
      blurb: "The creative engine of the studio — the people who produce and publish our clients' content every day.",
    },
    summary:
      "Our Assistant is the founder's trusted right hand — keeping both the studio and day-to-day life organized so the big things get done. A calm, reliable presence across business and personal tasks.",
    duties: [
      "Managing calendars, scheduling, and reminders",
      "Organizing email and handling inbox triage",
      "Booking travel, appointments, and reservations",
      "Coordinating personal and business errands",
      "Preparing documents, notes, and simple reports",
      "Researching and gathering information",
      "Following up on tasks and to-dos",
      "Keeping the founder's day running smoothly",
    ],
  },
  {
    icon: "🎞️",
    title: "Video Editor",
    summary:
      "Great video is what wins on social, and our Video Editor makes it shine. You'll cut, polish, and caption short-form video that keeps people watching to the very end.",
    duties: [
      "Editing short-form video for Reels, TikTok, and Shorts",
      "Adding captions, music, and on-brand effects",
      "Cutting long-form content into clips",
      "Polishing AI clone and talking-head videos",
      "Cleaning up color, audio, and pacing",
      "Keeping a consistent style for each client",
      "Hitting fast turnaround on edits",
      "Organizing footage and final files",
    ],
  },
  {
    icon: "🎬",
    title: "Content & AI Video Specialist",
    summary:
      "This is where the brand comes to life. You'll create the graphics, carousels, reels, and AI clone videos that stop the scroll and make our clients look incredible every single day.",
    duties: [
      "Creating branded graphics, carousels, and reels",
      "Producing AI avatar and clone video content",
      "Editing short-form video for every platform",
      "Maintaining a consistent on-brand look",
      "Scheduling content in our platform's planner",
      "Jumping on trends and formats that perform",
      "Collaborating with copy and design teams",
      "Building a library of reusable content",
    ],
  },
  {
    icon: "📱",
    title: "Social Media Manager",
    summary:
      "Our Social Media Managers keep every client's presence alive and growing. You'll schedule and publish content, manage the community, and turn comments and DMs into real lead conversations.",
    duties: [
      "Scheduling and publishing content across platforms",
      "Managing community engagement and DMs",
      "Running comment-to-DM lead conversations",
      "Monitoring trends and optimal posting times",
      "Responding to comments and messages promptly",
      "Tracking engagement and growth metrics",
      "Coordinating content approvals with clients",
      "Keeping every account active and on brand",
    ],
  },
  {
    icon: "📣",
    title: "Sales Development Representative",
    phaseStart: {
      label: "Growth & Brand",
      title: "Clients & Creative",
      blurb: "The team that brings new clients in, welcomes them, and shapes how every brand looks and sounds.",
    },
    summary:
      "As a Sales Development Representative, you'll grow our pipeline by engaging new and potential clients — booking discovery calls, sharing AI video samples, and following up until the deal is set.",
    duties: [
      "Reaching out to and qualifying potential clients",
      "Booking discovery calls with warm and cold leads",
      "Presenting AI video samples during outreach",
      "Educating prospects about our done-for-you model",
      "Keeping the pipeline organized and up to date",
      "Following up consistently across touchpoints",
      "Hitting weekly outreach and meeting goals",
      "Sharing market feedback with the team",
    ],
  },
  {
    icon: "🚪",
    title: "Client Onboarding Specialist",
    summary:
      "First impressions set the tone for the whole relationship. You'll get every new client set up smoothly — collecting what we need, building their workspace, and handing off a fully ready account to the team.",
    duties: [
      "Sending and managing onboarding questionnaires",
      "Collecting brand assets, logins, and access",
      "Setting up client sub-accounts and workspaces",
      "Connecting social accounts and booking tools",
      "Running smooth kickoff and onboarding calls",
      "Gathering AI clone photo and voice samples",
      "Setting clear expectations and timelines",
      "Handing off ready clients to the content team",
    ],
  },
  {
    icon: "✍️",
    title: "Copywriter",
    summary:
      "Words do the selling. Our Copywriter crafts the captions, hooks, ad copy, blogs, and email/SMS that give each client a distinct voice and turn attention into action.",
    duties: [
      "Writing captions, hooks, and post copy",
      "Writing blog posts and SEO page content",
      "Crafting ad copy and offers",
      "Writing email and SMS marketing sequences",
      "Developing a distinct brand voice per client",
      "Scripting AI clone and video content",
      "Researching each niche's language and questions",
      "Editing and proofreading all copy",
    ],
  },
  {
    icon: "🎨",
    title: "Brand & Graphic Designer",
    summary:
      "Our Brand & Graphic Designers shape how every client looks and feels. From full brand identities to our Brand Room digital products, you'll build a polished, consistent visual system across everything we create.",
    duties: [
      "Designing logos, palettes, and brand identities",
      "Building branded templates and social graphics",
      "Designing the Brand Room digital products",
      "Creating carousels, ads, and marketing assets",
      "Maintaining a consistent visual system",
      "Designing print and digital collateral",
      "Collaborating with content and web teams",
      "Keeping brand assets organized and on standard",
    ],
  },
  {
    icon: "📈",
    title: "Paid Ads Specialist",
    phaseStart: {
      label: "Strategy & Systems",
      title: "Specialists & Leadership",
      blurb: "The specialists and leaders who scale results — ads, SEO, websites, automation, and the people who keep it all on track.",
    },
    summary:
      "Paid ads turn great content into real reach. You'll build, manage, and optimize paid social campaigns — making analytical thinking and adaptability essential to getting clients more leads for less.",
    duties: [
      "Building and managing paid social campaigns",
      "Boosting top-performing organic posts strategically",
      "Conducting audience research and targeting",
      "Managing budgets and tracking ROI",
      "Analyzing and reporting on ad performance",
      "Running simple retargeting campaigns",
      "Testing creative, copy, and offers",
      "Optimizing campaigns for leads and bookings",
    ],
  },
  {
    icon: "🔍",
    title: "SEO Specialist",
    summary:
      "Our SEO Specialists handle the day-to-day work that gets clients found. You'll run on-page and local SEO, optimize Google Business Profiles, and drive organic traffic with strategies that compound over time.",
    duties: [
      "Running on-page and local SEO optimization",
      "Performing keyword research and mapping",
      "Implementing technical SEO (schema, alt tags, speed)",
      "Building and maintaining sitemaps",
      "Optimizing Google Business Profiles for clients",
      "Writing and optimizing blog and page content",
      "Tracking rankings and search traffic",
      "Sharing clear, plain-English reporting",
    ],
  },
  {
    icon: "🖥️",
    title: "Web Designer",
    summary:
      "Our Web Designers craft fast, beautiful, conversion-focused websites. You'll bring each client's digital presence to life — modern, mobile-first, and wired up to capture and convert leads.",
    duties: [
      "Designing and building booking and landing pages",
      "Creating mobile-first, conversion-focused layouts",
      "Implementing brand identity across every page",
      "Ensuring fast, polished, and accessible sites",
      "Wiring up forms, calendars, and automations",
      "Collaborating with SEO and content teams",
      "Troubleshooting and fixing website issues",
      "Keeping every site on-brand and up to date",
    ],
  },
  {
    icon: "⚙️",
    title: "Automation & Systems Specialist",
    summary:
      "The systems behind the scenes are what make 'done-for-you' actually work. You'll build the pipelines, missed-call text-back, review funnels, and follow-up flows that keep every lead moving.",
    duties: [
      "Building CRM pipelines and automations",
      "Setting up missed-call text-back",
      "Building 5-star review funnels",
      "Creating lead follow-up and nurture flows",
      "Configuring booking calendars and forms",
      "Setting up the conversations inbox and reporting",
      "Building reusable client onboarding snapshots",
      "Testing and maintaining all automations",
    ],
  },
  {
    icon: "💼",
    title: "Account Manager",
    summary:
      "Our Account Managers are the dedicated partner behind every client. You'll build real relationships, understand each client's goals, and make sure the work we deliver actually moves their business forward.",
    duties: [
      "Building strong relationships with clients as their dedicated partner",
      "Understanding each client's goals and translating them into strategy",
      "Leading monthly strategy and reporting calls",
      "Reviewing content and reports before they reach the client",
      "Managing day-to-day client communication",
      "Advocating for client needs and ensuring satisfaction",
      "Identifying upsell and retention opportunities",
      "Keeping every account on track and on brand",
    ],
  },
  {
    icon: "📋",
    title: "Operations & Project Manager",
    summary:
      "Our Operations & Project Manager keeps the studio running. You'll coordinate every team, manage deadlines and budgets, and make sure each client project is delivered on time and to a high standard.",
    duties: [
      "Managing projects from start to finish",
      "Coordinating content, design, web, and account teams",
      "Setting and tracking deadlines and deliverables",
      "Managing client expectations and communication",
      "Identifying risks and resourcing accordingly",
      "Keeping budgets and timelines on track",
      "Running the monthly review-plan-create-invoice cycle",
      "Driving efficiency and quality across the studio",
    ],
  },
];

function Check() {
  return (
    <span
      className="mt-0.5 shrink-0 inline-flex items-center justify-center rounded-full"
      style={{ width: 18, height: 18, background: "var(--rose)" }}
    >
      <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8.5 6.2 11.5 13 4.5" />
      </svg>
    </span>
  );
}

function CtaButton({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={RESUME}
      className="inline-block rounded-full px-8 py-3 transition-all hover:opacity-90"
      style={{ background: "var(--rose)", color: "#fff", fontFamily: "'Jost', sans-serif", fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase" }}
    >
      {children}
    </a>
  );
}

function CareersPage() {
  usePageMeta(
    "Careers at The Dollhouse Brand Studio | Join Our Team",
    "Join The Dollhouse Brand Studio — an AI-powered, done-for-you social media marketing studio serving York Region, Toronto & the GTA. See open roles and join the waitlist.",
  );

  const eyebrow: React.CSSProperties = { fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)" };

  return (
    <main className="min-h-screen" style={{ background: "var(--blush)", color: "var(--ink)" }}>
      {/* Back to home */}
      <div className="px-6 pt-10 max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[var(--gold)] hover:opacity-70 transition-opacity"
          style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase" }}
        >
          ← Back to home
        </Link>
      </div>

      {/* Hero */}
      <section className="px-6 pt-10 pb-16 text-center">
        <div className="max-w-2xl mx-auto">
          <p style={eyebrow}>Careers</p>
          <h1
            className="mt-3"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem, 6vw, 4rem)", fontWeight: 400, color: "var(--rose)", lineHeight: 1.05 }}
          >
            With The Dollhouse Brand Studio
          </h1>
          <p className="mt-4" style={{ fontFamily: "'Allura', cursive", fontSize: "1.5rem", color: "var(--gold)" }}>
            Passion. Excellence. Growth.
          </p>
          <p className="mt-6 text-[var(--ink)]/70 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}>
            We take pride in building a team of dedicated, like-minded individuals committed to growing our clients — and
            each other. We hand-select who joins us, and we love to build incredible companies together. Interested in
            growing with us?
          </p>
          <div className="mt-8">
            <CtaButton>Send Your Resume</CtaButton>
          </div>
        </div>
      </section>

      {/* What Drives You */}
      <section className="px-6 py-14" style={{ background: "var(--cream)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>
            What Drives You?
          </h2>
          <div className="mt-3 h-px w-16 mx-auto" style={{ background: "color-mix(in oklab, var(--gold) 50%, transparent)" }} />
          <div className="mt-6 space-y-4 text-[var(--ink)]/70 leading-relaxed text-left" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.98rem" }}>
            <p>
              The Dollhouse Brand Studio is an AI-powered, done-for-you social media and marketing studio for service
              businesses. We create daily content, AI video, paid ads, review automation, and lead systems — so our clients
              can focus on the work they love while we handle their growth.
            </p>
            <p>
              We're always keeping an eye out for talented people who care about doing great work. Below are the kinds of
              roles we build our team around. If you don't see a perfect fit but feel you belong here, join the waitlist and
              tell us your story.
            </p>
          </div>
          <p className="mt-8 font-medium text-[var(--ink)]" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem" }}>
            As a boutique, full-service studio, we specialize in developing custom, AI-powered marketing strategies for our
            clients across York Region, Toronto, and the GTA.
          </p>
        </div>
      </section>

      {/* No open positions */}
      <section className="px-6 py-12">
        <div className="max-w-2xl mx-auto rounded-2xl p-8 md:p-10 text-center" style={{ background: "#fff", border: "1px solid color-mix(in oklab, var(--gold) 22%, transparent)", boxShadow: "0 8px 30px rgba(189,116,118,0.08)" }}>
          <div style={{ fontSize: "1.8rem" }}>🤍</div>
          <h2 className="mt-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 400, color: "var(--ink)" }}>
            No Open Positions Right Now
          </h2>
          <p className="mt-3 mx-auto max-w-lg text-[var(--ink)]/65 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem" }}>
            We're brand new and don't have specific roles open just yet — but we're always looking for exceptional,
            like-minded talent. If you think you'd be a great fit for the team as we grow, we'd love to hear from you.
          </p>
          <div className="mt-6 rounded-xl p-6" style={{ background: "var(--blush)", border: "1px solid color-mix(in oklab, var(--gold) 18%, transparent)" }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)" }}>Send us your resume</p>
            <p className="mt-2 text-[var(--ink)]/65" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}>
              Drop us a line with your resume and tell us why you're excited about The Dollhouse. We'll keep you in mind for
              future opportunities.
            </p>
            <div className="mt-4">
              <CtaButton>Send Your Resume</CtaButton>
            </div>
          </div>
        </div>
      </section>

      {/* What We Value */}
      <section className="px-6 py-14" style={{ background: "var(--cream)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p style={eyebrow}>Our Culture</p>
          <h2 className="mt-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>What We Value</h2>
          <p className="mt-2 text-[var(--ink)]/55" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem" }}>The principles that guide how we work, build, and grow together.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl p-6 text-center" style={{ background: "#fff", border: "1px solid color-mix(in oklab, var(--gold) 20%, transparent)" }}>
                <div className="mx-auto inline-flex items-center justify-center rounded-full" style={{ width: 44, height: 44, background: "color-mix(in oklab, var(--gold) 14%, transparent)", fontSize: "1.3rem" }}>{v.icon}</div>
                <h3 className="mt-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", fontWeight: 400, color: "var(--ink)" }}>{v.title}</h3>
                <p className="mt-2 text-[var(--ink)]/60" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", lineHeight: 1.5 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why You'll Love Working Here */}
      <section className="px-6 py-14">
        <div className="max-w-4xl mx-auto text-center">
          <p style={eyebrow}>Why Join</p>
          <h2 className="mt-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 400, color: "var(--ink)" }}>Why You'll Love Working Here</h2>
          <p className="mt-2 text-[var(--ink)]/55" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem" }}>We take care of our team so they can do their best work.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-left">
            {PERKS.map((p) => (
              <div key={p.title} className="rounded-2xl p-6" style={{ background: "#fff", border: "1px solid color-mix(in oklab, var(--gold) 20%, transparent)" }}>
                <div className="inline-flex items-center justify-center rounded-full" style={{ width: 40, height: 40, background: "color-mix(in oklab, var(--rose) 12%, transparent)", fontSize: "1.2rem" }}>{p.icon}</div>
                <h3 className="mt-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 400, color: "var(--ink)" }}>{p.title}</h3>
                <p className="mt-1.5 text-[var(--ink)]/60" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", lineHeight: 1.5 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-center mb-10 text-[var(--ink)]/45" style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            The roles we'll build our team around as we grow
          </p>
          <div className="space-y-6">
            {ROLES.map((role, i) => (
              <Fragment key={role.title}>
              {role.phaseStart && (
                <div className={i === 0 ? "text-center" : "text-center pt-8"}>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--gold)" }}>
                    {role.phaseStart.label}
                  </p>
                  <h3 className="mt-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.9rem", fontWeight: 400, color: "var(--rose)" }}>
                    {role.phaseStart.title}
                  </h3>
                  <p className="mt-1 mx-auto max-w-md text-[var(--ink)]/55" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem" }}>
                    {role.phaseStart.blurb}
                  </p>
                  <div className="mt-4 mb-1 h-px w-12 mx-auto" style={{ background: "color-mix(in oklab, var(--gold) 50%, transparent)" }} />
                </div>
              )}
              <div className="rounded-2xl p-7" style={{ background: "#fff", border: "1px solid color-mix(in oklab, var(--gold) 22%, transparent)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: "1.4rem" }}>{role.icon}</span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink)" }}>
                    {role.title}
                  </h3>
                </div>
                <p className="mt-3 text-[var(--ink)]/65 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem" }}>
                  {role.summary}
                </p>
                <p className="mt-5 mb-3" style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>
                  Your Duties Will Include:
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {role.duties.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-[var(--ink)]/72" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", lineHeight: 1.4 }}>
                      <Check />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-24 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-[var(--ink)]/75 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}>
            Think you'd be a great fit? Even if there's no open role right now, we're always excited to meet talented people who share our vision. Send your resume and let's start a conversation.
          </p>
          <div className="mt-6">
            <CtaButton>Send Your Resume</CtaButton>
          </div>
          <div className="mt-10">
            <Link to="/" className="btn-ghost">
              ← Back to home
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
