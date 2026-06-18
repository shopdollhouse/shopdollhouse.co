import { createFileRoute } from "@tanstack/react-router";
import { usePageMeta } from "@/lib/use-page-meta";

export const Route = createFileRoute("/careers")({ component: CareersPage });

const WAITLIST = "mailto:hello@shopdollhouse.co?subject=Careers%20%E2%80%94%20Join%20the%20Waitlist";

const ROLES: { icon: string; title: string; duties: string[] }[] = [
  {
    icon: "🗂️",
    title: "Account Coordinator",
    duties: [
      "Helping plan and execute each client's overall content strategy",
      "Being a main point of contact for client communication",
      "Performing keyword and hashtag research",
      "Tracking trends across platforms",
      "Building content calendars and lists",
      "Drafting monthly performance reports",
      "Coordinating reviews and approvals with clients",
      "Keeping projects on schedule and on brand",
    ],
  },
  {
    icon: "💼",
    title: "Account Manager",
    duties: [
      "Building strong relationships with clients as their dedicated partner",
      "Understanding each client's goals and translating them into strategy",
      "Collaborating with the content team to align deliverables",
      "Advocating for client needs and ensuring satisfaction",
      "Leading monthly strategy and reporting calls",
      "Reviewing content and reports before they reach the client",
      "Managing day-to-day client communication",
      "Identifying upsell and retention opportunities",
    ],
  },
  {
    icon: "📈",
    title: "Paid Ads Specialist",
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
    icon: "🎬",
    title: "Content & AI Video Specialist",
    duties: [
      "Creating branded graphics, carousels, and reels",
      "Producing AI avatar and clone video content",
      "Scripting content around each niche's questions",
      "Editing short-form video for every platform",
      "Maintaining a consistent on-brand look",
      "Scheduling content in our platform's planner",
      "Jumping on trends and formats that perform",
      "Building a library of reusable content",
    ],
  },
  {
    icon: "🖥️",
    title: "Web Designer",
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
    icon: "📣",
    title: "Sales Development Representative",
    duties: [
      "Reaching out to and qualifying potential clients",
      "Booking discovery calls with warm and cold leads",
      "Presenting AI video samples during outreach",
      "Educating prospects about our done-for-you model",
      "Keeping the pipeline organized and up to date",
      "Following up consistently across touchpoints",
      "Hitting weekly outreach and meeting goals",
      "Sharing feedback from the market with the team",
    ],
  },
  {
    icon: "📋",
    title: "Project Coordinator / Project Manager",
    duties: [
      "Managing multiple client projects from start to finish",
      "Coordinating between content, design, and account teams",
      "Setting and tracking deadlines and deliverables",
      "Managing client expectations and clear communication",
      "Identifying risks and developing mitigation plans",
      "Keeping budgets and resources on track",
      "Ensuring each project is delivered on time",
      "Driving efficiency and quality across the studio",
    ],
  },
];

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="var(--rose)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 shrink-0">
      <path d="M3 8.5 6.2 11.5 13 4.5" />
    </svg>
  );
}

function CtaButton({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={WAITLIST}
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
      {/* Hero */}
      <section className="px-6 pt-24 pb-16 text-center">
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
            <CtaButton>Join the Waitlist</CtaButton>
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

      {/* Roles */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto space-y-6">
          {ROLES.map((role) => (
            <div key={role.title} className="rounded-2xl p-7" style={{ background: "#fff", border: "1px solid color-mix(in oklab, var(--gold) 22%, transparent)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-3">
                <span style={{ fontSize: "1.4rem" }}>{role.icon}</span>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink)" }}>
                  {role.title}
                </h3>
              </div>
              <p className="mt-4 mb-3" style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>
                Your Duties Will Include:
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                {role.duties.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-[var(--ink)]/72" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", lineHeight: 1.4 }}>
                    <Check />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-24 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-[var(--ink)]/75 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}>
            If any of these roles sound like the right fit for you, join the waitlist below and let's get in touch.
          </p>
          <div className="mt-6">
            <CtaButton>Join the Waitlist</CtaButton>
          </div>
        </div>
      </section>
    </main>
  );
}
