import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/playbook")({ component: PlaybookPage });

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";
const FONT_SCRIPT = "'Allura', cursive";

/* ─── Types ───────────────────────────────────────────── */
type Tab = "workflow" | "monthly" | "prompts" | "outreach" | "growth" | "newhire" | "deals" | "content";

/* ─── Prompt Card ─────────────────────────────────────── */
function PromptCard({ title, tag, prompt }: { title: string; tag: string; prompt: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.6)" }}>
      <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(200,168,100,0.15)", background: "rgba(200,168,100,0.06)" }}>
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded-full text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "rgba(200,168,100,0.18)", color: "#9a7a3a" }}>{tag}</span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: "1.05rem", color: "#1e0f0a" }}>{title}</span>
        </div>
        <button onClick={copy} className="text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-lg transition-all" style={{ fontFamily: FONT_LUXE, background: copied ? "#4a7a4a" : "var(--ink)", color: "var(--cream)" }}>
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <pre className="px-5 py-4 text-sm leading-relaxed whitespace-pre-wrap" style={{ fontFamily: FONT_BODY, color: "rgba(30,15,10,0.75)", margin: 0 }}>{prompt}</pre>
    </div>
  );
}

/* ─── Check Item ──────────────────────────────────────── */
function CheckItem({ text, sub }: { text: string; sub?: string }) {
  const [done, setDone] = useState(false);
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <button
        onClick={() => setDone(!done)}
        className="mt-0.5 w-5 h-5 rounded-md shrink-0 flex items-center justify-center transition-all border"
        style={{ background: done ? "var(--gold)" : "transparent", borderColor: done ? "var(--gold)" : "rgba(200,168,100,0.5)" }}
      >
        {done && <svg viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M2.5 8.5L6 12L13.5 4.5" /></svg>}
      </button>
      <div>
        <p className="leading-snug" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: done ? "rgba(30,15,10,0.35)" : "rgba(30,15,10,0.85)", textDecoration: done ? "line-through" : "none" }}>{text}</p>
        {sub && <p className="mt-0.5" style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(30,15,10,0.4)" }}>{sub}</p>}
      </div>
    </label>
  );
}

/* ─── Section Header ──────────────────────────────────── */
function SectionHeader({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <div className="mb-8">
      <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>{label}</p>
      <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "var(--rose)", fontWeight: 400, lineHeight: 1.1 }}>{title}</h2>
      {sub && <p className="mt-2" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: "rgba(30,15,10,0.55)" }}>{sub}</p>}
    </div>
  );
}

/* ─── Phase Block ─────────────────────────────────────── */
function Phase({ day, title, items }: { day: string; title: string; items: { text: string; sub?: string }[] }) {
  return (
    <div className="rounded-2xl p-6 md:p-8" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
      <div className="flex items-center gap-3 mb-5">
        <span className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "var(--ink)", color: "var(--gold)" }}>{day}</span>
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.25rem", color: "var(--ink)" }}>{title}</h3>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => <CheckItem key={i} {...item} />)}
      </div>
    </div>
  );
}

/* ─── Tab: Workflow ───────────────────────────────────── */
function WorkflowTab() {
  return (
    <div className="space-y-6">
      <SectionHeader label="Client Lifecycle" title="From lead to live — step by step." sub="Every step you need to do when a new client signs on. Check items off as you go." />

      <Phase day="Lead Stage" title="Before They Sign" items={[
        { text: "Discovery call booked via contact form or DM", sub: "Use the call to learn about their goals, platforms, budget, and how they're doing content now." },
        { text: "Send proposal within 24 hours of the call", sub: "Include the plan tier, what's covered, ad spend note (minimum $500/mo paid directly to Meta), and contract link." },
        { text: "Follow up if no response in 48 hours", sub: "One follow-up email or DM. Keep it warm, not pushy." },
        { text: "Contract signed + first invoice paid before any work begins" },
      ]} />

      <Phase day="Day 1" title="1-on-1 Kickoff Call" items={[
        { text: "Welcome them and set the tone — make them feel like they made the right decision" },
        { text: "Clarify what problems they want to solve", sub: "Ask: 'What's your biggest problem right now? Missed calls? Not enough leads? No time for content?' Get them talking — the more they say, the better you can tailor the work." },
        { text: "Walk them through the key features of their system", sub: "Show them what's running: content scheduling, automations, missed call text back, comment-to-DM. Make it feel like their business just got a team." },
        { text: "Set expectations for next steps — when content goes live, what they'll see in the app" },
        { text: "Make sure the account is set up A–Z before you hang up:", sub: "✓ Log in together (confirm access works) ✓ Connect their business email/domain ✓ Add their business phone number ✓ Load their calendar or booking link ✓ Import their contact list ✓ Trigger a test workflow (send test SMS so they see it work) ✓ Customize their first message template to sound like their brand ✓ Walk them through the conversations tab" },
      ]} />

      <Phase day="Day 1–2" title="Onboarding" items={[
        { text: "Send welcome email with onboarding questionnaire", sub: "Brand voice, target audience, competitors they love, content pillars, posting goals." },
        { text: "Request all brand assets", sub: "Logo files (PNG + SVG), brand colours (hex codes), fonts, any existing photos or video." },
        { text: "Get social media logins or request admin access", sub: "Facebook Business Manager, Instagram, TikTok, Google Business if applicable." },
        { text: "Set up client in CRM", sub: "Create contact, pipeline stage, add tags, assign to the correct workflow/automation. Every client must be in the CRM before any work starts." },
        { text: "Verify Meta ad account access + pixel is installed", sub: "If no pixel — walk them through installing it or do it via GTM." },
        { text: "Ask the 4 client interview questions — document the answers:", sub: "1) How did you find out about us?  2) What tools were you using before?  3) What results do you most want to see?  4) How will you know this is working for your business? — These answers shape your strategy and become your case study later." },
      ]} />

      <Phase day="Day 3–5" title="Account Setup" items={[
        { text: "Audit their existing social profiles", sub: "Bio, profile photo, link in bio, pinned posts, highlight covers if applicable." },
        { text: "Update or optimize profiles where needed" },
        { text: "Set up and verify Meta Pixel on their website", sub: "Install via Events Manager → connect to their website domain. Confirm it's firing using Meta Pixel Helper (Chrome extension). Pixel must be live before any ads run." },
        { text: "Set up the Brand Board in the platform", sub: "Add client's exact colours (hex codes), fonts, logo, and visual style. The platform's AI pulls from this when making content — so everything looks custom, not generic." },
        { text: "Define their 4–5 content pillars", sub: "Education / Behind the Scenes / Social Proof / Promotion / Personality" },
        { text: "Build their brand voice guide (use the Brand Voice prompt below)" },
        { text: "Set up their content calendar template for Month 1" },
        { text: "Confirm posting schedule with client — how many posts/week, what platforms" },
      ]} />

      <Phase day="Day 6–10" title="Content Creation" items={[
        { text: "Write all captions for Month 1", sub: "Use the Caption Writing prompt. Batch all posts at once — never write one at a time." },
        { text: "Design graphics or pull/edit photos", sub: "Match their brand colours, fonts, and style. Use Canva or provided templates." },
        { text: "Create any Reel scripts or video hooks if video is included" },
        { text: "Build 2–4 ad creatives if ads are in their plan", sub: "One image ad, one video/carousel. Use the Ad Copy prompt." },
        { text: "Internal review — does everything sound like them? Is it on-brand?" },
      ]} />

      <Phase day="Day 11–12" title="Client Approval" items={[
        { text: "Send content calendar + all posts to client for review", sub: "Use a shared Google Drive folder or your platform's content approval feature." },
        { text: "Give them a 48-hour window to request changes" },
        { text: "Make revisions — limit to one round of revisions per month" },
        { text: "Get written approval before scheduling anything" },
      ]} />

      <Phase day="Day 13–14" title="Schedule & Launch" items={[
        { text: "Schedule all approved posts through the platform" },
        { text: "Set ads to launch at 12:00am the next day", sub: "Never launch ads mid-day. Starting at midnight gives you a full 24-hour data window from day one — cleaner results and easier to compare day-over-day performance." },
        { text: "Confirm ad campaign settings — budget, audience, placement, creative, pixel event" },
        { text: "Send client a 'You're live!' message with what to expect this month" },
        { text: "Set up keyword-triggered comment automation", sub: "Put a keyword CTA on the last slide of each carousel — e.g. 'Comment GLOW for a free guide.' In the platform, build a workflow: Trigger = comment contains keyword → AI agent DMs them the lead magnet and starts a conversation. No human needed." },
        { text: "Build their AI lead magnet using the platform's AI Studio", sub: "One prompt generates the whole thing: cover page with their branding, tips/value content, and a CTA to book. Deliver it as a PDF or link in the auto-DM. Use the Lead Magnet prompt in the Prompts tab." },
        { text: "Set up missed call text back", sub: "In the platform: any missed call → auto-SMS fires immediately: 'Hey, sorry we missed your call! How can we help?' This alone saves leads the client would have lost. Takes 5 minutes to set up, runs forever." },
        { text: "Set up Comment-to-DM automation (general engagement)", sub: "Separate from the keyword trigger — this fires on any comment. AI agent sends a warm DM, tags the contact in CRM, and creates a task if no reply in 24 hours." },
        { text: "Confirm the DM message is on-brand and points to the right next step", sub: "e.g. 'Hey [name], thanks for engaging! Here's [free resource / booking link / offer].' Customize per client." },
        { text: "Set a reminder for 2-week check-in call" },
      ]} />

      <Phase day="Ongoing" title="Monthly Retention Loop" items={[
        { text: "Mid-month check-in — how are posts performing? Any feedback?" },
        { text: "Pull end-of-month analytics report", sub: "Reach, engagement rate, follower growth, ad results (CTR, cost per result, ROAS)." },
        { text: "Send report to client with a short summary of wins + next month focus" },
        { text: "Begin next month's content creation in the last week of the current month", sub: "Never let them see a gap. Always be 2 weeks ahead." },
        { text: "Invoice sent on the same day each month (set up recurring in platform)" },
        { text: "Quarterly review call — bigger picture strategy, upsell opportunities" },
        { text: "At 3 months: pitch the annual deal", sub: `Say: "Hey, do you want to unlock some savings for the next year? I can give you 10–20% off what you're paying right now if you lock in an annual plan." This improves your cash flow and locks in retention at the same time.` },
        { text: "After 3–6 months: offer a software upgrade if they're not already on it", sub: "Show the results first (saved X hours, booked X jobs). Then: 'Do you want to continue with the full system for $[PRICE]/month?' — Never pitch the upgrade before they've felt the win." },
      ]} />

      {/* Customer Journey Map */}
      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <p className="text-[10px] tracking-widest uppercase mb-3" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Reference — Customer Journey Map</p>
        <p className="italic mb-5" style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: "var(--ink)" }}>Every client's automation system should handle all three stages. Set this up during onboarding.</p>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: "Trigger", color: "var(--ink)", items: ["Form Fill", "Inbound Call", "Missed Call"] },
            { label: "What Happens Next", color: "var(--gold)", items: ["SMS", "Email", "AI Chatbot", "Booking Link"] },
            { label: "Where It Ends", color: "var(--rose)", items: ["Appointment Booked", "Google Review", "Paid Invoice"] },
          ].map(({ label, color, items }) => (
            <div key={label}>
              <p className="text-[9px] tracking-widest uppercase mb-2 font-semibold" style={{ fontFamily: FONT_LUXE, color }}>{label}</p>
              <div className="space-y-1.5">
                {items.map((item) => (
                  <div key={item} className="px-2 py-1.5 rounded-lg text-center" style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                    <span style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(30,15,10,0.8)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Tab: Monthly ────────────────────────────────────── */
function MonthlyTab() {
  return (
    <div className="space-y-6">
      <SectionHeader label="Monthly Rhythm" title="Your weekly schedule — every week." sub="This is how you run each week so you can serve multiple clients without burning out." />

      {[
        {
          day: "Monday",
          title: "Strategy & Planning Day",
          items: [
            { text: "Review all client analytics from prior week" },
            { text: "Check in on any running ads — adjust budgets or creative if needed" },
            { text: "Update content calendars for any clients needing next-week content" },
            { text: "Reply to all client messages or questions" },
          ],
        },
        {
          day: "Tuesday–Wednesday",
          title: "Content Creation Days",
          items: [
            { text: "Batch write all captions for the week — use the prompts, don't write from scratch" },
            { text: "Design all graphics, edit photos, prep video content" },
            { text: "Create ad creatives if any campaigns are launching" },
            { text: "No client calls on these days — protect this time" },
          ],
        },
        {
          day: "Thursday",
          title: "Approval & Scheduling Day",
          items: [
            { text: "Send content to any clients awaiting approval" },
            { text: "Schedule all approved content through the platform" },
            { text: "Set up any new ad sets launching next week" },
            { text: "Pin the 3 best posts to the top of each client's profile", sub: "Pinned posts are the first thing anyone sees when they visit the page. Keep the 3 strongest pieces — AI videos or top-performing carousels — pinned at all times. Refresh monthly." },
            { text: "Boost the 3 pinned posts ($50–$100 each)", sub: "Take posts already performing organically and put a small budget behind them. No complex targeting — just amplify what's already working. This turns 'nice-looking social' into real leads." },
            { text: "Follow up with clients who haven't approved yet" },
          ],
        },
        {
          day: "Friday",
          title: "Admin, Outreach & Growth",
          items: [
            { text: "Send any monthly reports due this week" },
            { text: "Do outreach — cold emails, DMs, or follow-ups to prospects" },
            { text: "Invoice any clients billed weekly or on the 1st" },
            { text: "Review your own business metrics — revenue, churn risk, pipeline" },
          ],
        },
      ].map((phase) => (
        <Phase key={phase.day} day={phase.day} title={phase.title} items={phase.items} />
      ))}

      <div className="rounded-2xl p-5 mb-2" style={{ background: "rgba(200,168,100,0.1)", border: "1px solid rgba(200,168,100,0.25)" }}>
        <p className="text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>📊 2026 Content Insight</p>
        <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: "var(--ink)", fontStyle: "italic" }}>Carousels are getting more reach than Reels right now. Focus on carousels (3–7 slides) for education and social proof. Use Reels for reach and new followers. Both in the mix is ideal.</p>
        <p className="mt-2" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(30,15,10,0.55)" }}>Carousel structure that works: Hook slide → Value or Education → Testimonial or proof → CTA slide. Use the Carousel prompt to build these in the platform's AI.</p>
      </div>

      <div className="rounded-2xl p-6" style={{ background: "var(--ink)" }}>
        <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Mandy's Rule</p>
        <p className="italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "var(--cream)", lineHeight: 1.4 }}>
          "Never create content for one client at a time. Always batch by task — write all captions Monday, design all graphics Tuesday. It saves 40% of your time."
        </p>
      </div>
    </div>
  );
}

/* ─── Tab: Prompts ────────────────────────────────────── */
function PromptsTab() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const prompts = [
    {
      title: "AI Graphics — Single Posts (Platform Ask AI)",
      tag: "Platform AI",
      prompt: `Use this prompt inside our platform's Ask AI to create single-image social posts.

Type into Ask AI:

"Act as an elite social media marketer and create 12 Instagram graphics for [BUSINESS NAME]. Do some research to create compelling graphics that will capture attention and are trendy right now. Their website is [WEBSITE URL]. Focus on [1–2 content goals, e.g. lead generation + trust building].

Include a mix of:
- Service spotlight posts
- Free estimate or offer post
- Tip of the week
- Seasonal or timely content
- Customer testimonial graphic
- Behind-the-scenes or brand story

For each graphic, also provide:
- The caption (with hashtags)
- What content strategy goal it serves (lead gen / trust / education / social proof)"

---
💡 Tip: Start with 3–5 posts to review the style. If designs aren't right, respond with: "Act as an elite designer and enhance all the designs to feel more premium and on-brand."`,
    },
    {
      title: "AI Graphics — Carousel Posts (Platform Ask AI)",
      tag: "Platform AI",
      prompt: `Use this prompt inside our platform's Ask AI to create carousel posts.

Type into Ask AI:

"Create a [5 / 7]-slide carousel for [BUSINESS NAME] on the topic: [TOPIC].

Slide structure:
- Slide 1: Hook — grab attention immediately (before/after, bold statement, or curiosity gap)
- Slide 2: Core value or service overview
- Slide 3: Educational or shareable content (tips, reasons, how-to)
- Slide 4: Social proof — customer result or testimonial
- Slide 5: CTA — drive them to [book / DM / visit site / follow]

For each slide include:
- Visual direction (colours, layout style, image type)
- Headline text (under 10 words)
- Supporting copy (1–2 sentences)
- Caption for the full carousel post with hashtags"

---
💡 2026 tip: Carousels are outperforming Reels in engagement right now. Prioritize these for education and social proof content.`,
    },
    {
      title: "Auto-Schedule via Platform AI",
      tag: "Platform AI",
      prompt: `After creating graphics and captions in the platform's Ask AI, use this prompt to schedule everything automatically.

Once the content is approved, type into Ask AI:

"Schedule all of these posts. You choose the best dates and times based on current best practices for [PLATFORM — Instagram / Facebook / TikTok]. Space them out evenly across [X] weeks."

The AI will:
- Pull the graphics already created in the conversation
- Match each graphic with its caption and hashtags
- Select optimal posting times
- Push directly to the Social Planner — scheduled and ready

No downloading. No uploading. No switching tabs.

---
⚠️ Make sure the client's social accounts are connected in Social Planner → Settings before running this step.`,
    },
    {
      title: "Comment-to-DM Automation Setup",
      tag: "Platform AI",
      prompt: `Set up this workflow once per client inside our platform. It runs automatically from then on.

Workflow name: "Comment to DM — [CLIENT NAME]"

Step 1 — Trigger:
Instagram Comments (any published post by this account)

Step 2 — AI Agent Action:
- Response channel: Instagram DM
- Also reply in comments: Yes (short, warm reply — "Thanks! Check your DMs 👋")
- Tag the contact in the CRM
- Create a task if no reply within 24 hours

DM message template (customize per client):
"Hey [first name]! Thanks so much for engaging with our post 😊 We noticed you're interested in [topic/service] — we'd love to help. [Insert offer / free resource / booking link here]. Let us know if you have any questions!"

---
Why this works:
1. Fast replies signal Instagram's algorithm → more reach
2. Every comment becomes a DM conversation → more leads
3. The client doesn't lift a finger — it's all automated
4. You can pitch this as a standalone value-add in your service`,
    },
    {
      title: "Brand Voice Extraction",
      tag: "Onboarding",
      prompt: `You are a brand strategist. Based on the information below, create a brand voice guide for a client.

Client Info:
- Business name: [NAME]
- Industry: [INDUSTRY]
- Target audience: [WHO THEY SERVE — age, gender, lifestyle, problems they have]
- 3 brands they admire: [BRAND 1], [BRAND 2], [BRAND 3]
- Words they'd use to describe their brand: [ADJECTIVES]
- Words they never want associated with their brand: [ANTI-WORDS]

Create:
1. Brand Voice in 3 words
2. Brand Personality Description (3–4 sentences — how they speak, how they come across)
3. Do's and Don'ts (5 of each)
4. Sample sentence in their voice: "We help [audience] do [thing]."
5. Caption tone guide — formal, casual, playful, educational, or inspirational?`,
    },
    {
      title: "Monthly Content Calendar",
      tag: "Planning",
      prompt: `You are a social media strategist. Create a 30-day content calendar for the following client.

Client:
- Business: [NAME + WHAT THEY DO]
- Target audience: [WHO THEY SERVE]
- Content pillars: Education, Behind the Scenes, Social Proof, Promotion, Personality
- Posting schedule: [X] posts per week on [PLATFORMS]
- Current offer or promotion this month: [OFFER/PROMO]
- Brand voice: [PASTE THEIR VOICE GUIDE OR DESCRIBE IT]

For each post include:
1. Day + platform
2. Content pillar
3. Post concept (1 sentence)
4. Caption hook (first line only)
5. Recommended format: static image / carousel / Reel / Story

Prioritize variety — no two consecutive posts should be the same format or pillar.`,
    },
    {
      title: "Instagram Caption Writer",
      tag: "Captions",
      prompt: `Write 5 Instagram captions for [CLIENT NAME], a [BUSINESS TYPE] that serves [TARGET AUDIENCE].

Brand voice: [DESCRIBE — e.g., warm, direct, elevated but approachable]
This week's content pillar: [EDUCATION / PROMOTION / SOCIAL PROOF / BTS / PERSONALITY]
Topic or offer to highlight: [SPECIFIC TOPIC]

For each caption:
- Start with a scroll-stopping first line (the hook)
- 3–5 sentences of body copy
- A clear call to action (comment, DM, click link in bio, save this post)
- 5 relevant hashtags

Format: warm, conversational, no corporate-speak. Write as if the business owner is speaking directly to one person.`,
    },
    {
      title: "Reel Hook Generator",
      tag: "Video",
      prompt: `Generate 10 Reel opening hooks for [CLIENT NAME], a [BUSINESS TYPE].

Target audience: [WHO THEY SERVE]
Topic: [REEL TOPIC]
Goal: [Get saves / Drive DMs / Build trust / Promote offer]

Rules:
- Each hook must be under 8 words
- Should create curiosity, urgency, or immediate relatability
- Should work spoken aloud as the first line of a video
- No clickbait — must be something they can actually deliver on in the video

Format:
1. [Hook]
(Why it works: one sentence)`,
    },
    {
      title: "Facebook / Meta Ad Copy",
      tag: "Ads",
      prompt: `Write 3 versions of Facebook/Instagram ad copy for [CLIENT NAME].

Product/Service being advertised: [WHAT THEY'RE SELLING]
Target audience: [WHO SEES THIS AD — be specific]
Pain point the ad addresses: [THEIR PROBLEM]
Offer or hook: [WHAT MAKES THIS WORTH CLICKING]
Call to action: [LEARN MORE / SHOP NOW / BOOK NOW / DM US]
Budget/price point (if relevant): [PRICE OR DEAL]

For each version write:
- Primary Text (2–4 sentences, conversational)
- Headline (under 7 words, punchy)
- Description (1 sentence supporting the headline)

Version 1: Pain-aware (lead with the problem)
Version 2: Desire-based (lead with the transformation/result)
Version 3: Social proof angle (lead with a result or testimonial hook)`,
    },
    {
      title: "Email Newsletter",
      tag: "Email",
      prompt: `Write a marketing email for [CLIENT NAME] to send to their email list.

Topic / purpose: [WHAT THIS EMAIL IS ABOUT]
Offer included (if any): [OFFER + LINK]
Audience: [WHO IS ON THIS LIST]
Brand voice: [DESCRIBE]
Desired action: [WHAT YOU WANT THEM TO DO]

Email structure:
1. Subject line (write 3 options — one curiosity, one benefit, one direct)
2. Preview text (under 90 characters)
3. Opening (1–2 sentences — personal, warm, not salesy)
4. Body (3–4 short paragraphs — value first, offer second)
5. CTA button text
6. Sign-off (in brand voice)

Keep it under 250 words. Write like a human, not a marketing department.`,
    },
    {
      title: "Story Content Script",
      tag: "Stories",
      prompt: `Create a 5-slide Instagram Story sequence for [CLIENT NAME].

Goal of this story: [EDUCATE / PROMOTE / BUILD TRUST / DRIVE DMs]
Topic: [SPECIFIC TOPIC OR OFFER]
Brand voice: [DESCRIBE]

For each slide:
- Slide number
- Main text (under 15 words — Stories are read fast)
- Visual direction (colour, image type, background — keep it simple)
- Any interactive element: poll / question box / swipe up / link sticker

End with a clear CTA slide. Make it feel like a conversation, not an ad.`,
    },
    {
      title: "Hashtag Strategy",
      tag: "Strategy",
      prompt: `Create a hashtag strategy for [CLIENT NAME], a [BUSINESS TYPE] based in [LOCATION IF LOCAL].

Target audience: [DESCRIBE]
Niche: [THEIR INDUSTRY / NICHE]
Platforms: Instagram / TikTok (specify)

Generate:
- 5 broad hashtags (1M+ posts) — for reach
- 10 mid-size hashtags (100K–1M posts) — for discovery
- 10 niche hashtags (under 100K posts) — for targeted reach
- 5 community hashtags — groups or movements their audience follows
- 3 branded hashtag suggestions they can own

Also recommend: how many hashtags to use per post and whether to put them in caption or first comment.`,
    },
    {
      title: "AI Lead Magnet Creator",
      tag: "Platform AI",
      prompt: `Use this prompt inside the platform's AI Studio to create a branded lead magnet for a client in one shot.

Type into AI Studio:

"Create a lead magnet for [BUSINESS NAME], a [BUSINESS TYPE] serving [TARGET AUDIENCE].

The lead magnet is called: [TITLE — e.g. 'The Summer Glow Guide' / '5 Things to Ask Before Booking a Cleaner' / 'Local Restaurant's Free Date Night Menu']

Include:
1. Cover page — [BUSINESS NAME] logo/branding, lead magnet title, tagline
2. Introduction — 2–3 sentences on why this guide matters to the reader
3. [3–5 tip sections or checklist items relevant to the business]
4. Each section: title + 2–3 sentences of value
5. Final page — CTA to book, call, or visit: [BOOKING LINK / PHONE / WEBSITE]

Brand colours: [HEX CODES]
Tone: [WARM / PROFESSIONAL / FUN — match brand voice]"

---
How it gets delivered:
→ When someone comments the keyword on the carousel post (e.g. "GLOW")
→ The keyword automation triggers
→ AI agent DMs them the lead magnet link automatically
→ No human involvement required`,
    },
    {
      title: "Keyword CTA — Carousel Last Slide",
      tag: "Platform AI",
      prompt: `Use this to write the CTA that goes on the last slide of a keyword-trigger carousel.

Business: [CLIENT NAME]
Offer / lead magnet: [WHAT THEY'RE GETTING — e.g. "free skincare guide," "free estimate," "discount code"]
Keyword: [WHAT THEY SHOULD COMMENT — keep it short, relevant, and memorable: GLOW / QUOTE / MENU / BOOK]

Write 3 options for the last slide text:

Option 1: Direct ask
"Comment [KEYWORD] and we'll send you [OFFER] right to your DMs 👇"

Option 2: Value-first
"Want [BENEFIT]? Drop [KEYWORD] in the comments — we'll send you [OFFER] instantly."

Option 3: Curiosity
"There's a free [OFFER] waiting for you. Just comment [KEYWORD] below 👇"

---
Platform setup reminder:
After posting, go to the platform → Workflows → Create trigger:
Trigger: Instagram comment contains "[KEYWORD]"
Action: AI Agent sends DM with lead magnet link + starts conversation
Tag contact in CRM → create follow-up task`,
    },
    {
      title: "SEO Blog Post Writer",
      tag: "Blogging",
      prompt: `Write a detailed SEO blog post for The Dollhouse Brand Studio targeting the following keyword.

Target keyword: [KEYWORD — e.g. "social media marketing for med spas"]
Target audience: [WHO THIS POST IS FOR — e.g. med spa owners]
Goal: Drive inbound leads from business owners searching this topic

Blog post structure:
1. Title (include the exact keyword, under 65 characters)
2. Meta description (under 155 characters — include keyword, compelling hook)
3. Introduction (2–3 paragraphs — open with a pain point or question, introduce The Dollhouse Brand Studio as the solution, state what the post will cover)
4. 5–7 H2 sections covering: common problems, what good social media looks like for this niche, content ideas, how to measure results, what to look for in an agency
5. Conclusion with CTA (invite them to book a discovery call or visit shopdollhouse.co)

Then I will:
- Add real client examples and results
- Add our own images and screenshots
- Publish to the blog and repurpose as a LinkedIn article

Write in a confident, helpful, expert tone. Not salesy. Genuinely useful first.`,
    },
    {
      title: "Pitch Deck Builder",
      tag: "Sales",
      prompt: `Build a 7-slide sales pitch deck for The Dollhouse Brand Studio for a specific prospect.

Prospect info:
- Business name: [BUSINESS NAME]
- Niche: [NICHE]
- City: [CITY]
- Pain points they mentioned on the call: [THEIR EXACT WORDS / PROBLEMS]
- Package they're interested in: [LOW / MID / HIGH TIER — or describe package]
- Monthly price: $[AMOUNT]
- Any setup fee: $[AMOUNT or "none"]

Build 7 slides:

Slide 1 — Introduction
Who we are: The Dollhouse Brand Studio. What we do: done-for-you social media, ads, and automation for [NICHE] businesses. Why we do it: [MANDY'S SHORT WHY — e.g. "We believe every small business deserves to look and run like a big one."]

Slide 2 — Their Problem
Restate [BUSINESS NAME]'s pain points in their own words. Make them feel understood, not sold to.

Slide 3 — Our Solution
Software + service working together. Platform handles the automations, CRM, and scheduling. We handle the content, ads, and strategy. They handle their business.

Slide 4 — Proof
[INSERT CASE STUDY OR TESTIMONIAL] — if no case study yet, use: "We set up a system like this for a [SIMILAR NICHE] business and they [RESULT] in [TIMEFRAME]."

Slide 5 — Their Package
Exactly what's included, listed clearly. Also list 1–2 things NOT included so there are no surprises.

Slide 6 — Investment
Monthly: $[AMOUNT]. Setup (one-time): $[AMOUNT or "none"]. Payment terms: [MONTHLY / UPFRONT / etc.]

Slide 7 — Next Steps
Step 1: Sign the agreement
Step 2: Complete onboarding form (sent same day)
Step 3: Kickoff call within 48 hours — your system goes live

---
Format this as presentation slide content. Keep each slide to 50 words or less. No filler — every word earns its place.`,
    },
    {
      title: "GEO Brand Audit Prompt",
      tag: "GEO",
      prompt: `Run a GEO (Generative Engine Optimization) audit for The Dollhouse Brand Studio.

Our niche: Done-for-you social media marketing for small businesses
Location: [CITY / REGION]
Website: shopdollhouse.co

Check and score us on the following (rate each 1–5, 5 = strong):

1. Brand name consistency — does "The Dollhouse Brand Studio" appear the same way across website, Google Business Profile, Instagram, Facebook, and directories?
2. Niche clarity — is it immediately clear from our online presence exactly who we serve and what we do?
3. Case studies and proof — do we have publicly visible results with specific numbers (follower growth, leads, engagement)?
4. Third-party mentions — are we being mentioned, linked to, or cited by other websites?
5. Review count and quality — how many Google reviews do we have, and do they include specific service details?
6. Content consistency — are we posting regularly across Instagram, Facebook, LinkedIn?
7. AI search visibility — if someone asks ChatGPT or Gemini "best social media agency for [niche]," would we appear?

For each category:
- Current score (1–5)
- What's missing or weak
- Specific action to fix it this month`,
    },
    {
      title: "Monthly Analytics Report Summary",
      tag: "Reporting",
      prompt: `Write a monthly social media report summary to send to a client.

Client: [NAME]
Month: [MONTH]
Platforms: [PLATFORMS]

Data to include (fill in actual numbers):
- Total reach: [X]
- Impressions: [X]
- Engagement rate: [X%]
- New followers: [+X]
- Top performing post: [DESCRIPTION + why it worked]
- Ad results (if applicable): spend $[X], reach [X], clicks [X], cost per result $[X]

Write:
1. Opening sentence (positive, confident — lead with a win)
2. Highlights (3 bullet points — the best results)
3. What we learned this month (1–2 sentences on what content worked best)
4. Focus for next month (2–3 sentences on strategy shift or continuation)
5. Closing (warm, professional)

Tone: confident advisor, not defensive. Never apologize for numbers — contextualize them.`,
    },
    {
      title: "Lead Gen Research — Find Prospects by Niche + City",
      tag: "Lead Gen",
      prompt: `Act as a B2B Lead Generation Specialist and Market Researcher.

I need to identify 25 small [NICHE — e.g. dental practices / med spas / personal injury law firms / restaurants] in [CITY] who are currently running Google Ads.

Task:
Use Google Search and the Google Ads Transparency Center to confirm which businesses in this area and niche are active advertisers.

For each of the 25 businesses, provide the following in a clean markdown table:
- Practice/Business Name
- Website URL
- Phone Number (publicly listed)
- Email Address (search for 'contact@', 'info@', or listed owner emails — check the Contact and About Us pages if not on homepage)
- Ad Evidence (briefly note if you saw their ad on Search, Maps, or the Ads Transparency Center)

Constraints:
- Only include small to medium-sized independently owned businesses
- Avoid national chains or franchises (e.g. Aspen Dental, Heartland, corporate gyms, etc.)
- All 25 must be unique leads
- Only include verified information — no guesses

---
Swap [NICHE] and [CITY] for each outreach campaign.
These become your cold outreach list.`,
    },
    {
      title: "Lead Gen → CRM Pipeline Setup",
      tag: "Lead Gen",
      prompt: `Act as a B2B Lead Generation Specialist and Market Researcher.

Step 1 — Research:
Identify 25 small [NICHE] businesses in [CITY] who are currently running Google Ads.

Use Google Search and the Google Ads Transparency Center to confirm active advertisers. For each business provide:
- Business Name
- Website URL
- Phone Number
- Email Address
- Ad Evidence (where you saw their ad)

Only include small/independent businesses. Avoid national chains. All 25 must be unique.

Step 2 — CRM Setup:
Once the list is complete:
1. Create a new contact in the CRM for each business using the name, email, phone, and website found above
2. Create a new pipeline called "[NICHE] Cold Outreach — [CITY] [MONTH/YEAR]"
3. Add all 25 contacts to the first stage of the pipeline: "New Lead"
4. Tag each contact with: [NICHE], [CITY], Cold Outreach, Google Ads Advertiser

---
This gives you a ready-to-work pipeline from a single prompt.`,
    },
    {
      title: "Cold Email — AI Clone Video Pitch",
      tag: "Outreach",
      prompt: `Subject: quick question about your practice, [FIRST NAME]

Hi {{first_name}},

I noticed {{business_name}} is actively running Google Ads in [CITY] — smart move in such a competitive market.

I have one quick question: would you be open to seeing an AI clone of yourself that promotes your practice 24/7 — without you ever recording a single video or piece of content?

Patient FAQs, social content, appointment reminders — all delivered in your voice, your face, your style. You stay focused on your patients. The AI handles the rest.

A handful of [CITY] [NICHE] businesses are already using this to attract new clients while spending zero time in front of a camera.

Worth a 10-minute look?

(Reply here or grab a time: [CALENDAR LINK])

— Mandy Fortune
The Dollhouse Brand Studio
shopdollhouse.co

---
Notes:
• {{first_name}} and {{business_name}} are merge tags — use your platform's personalization fields
• Swap [CITY], [NICHE], and [CALENDAR LINK] before sending
• This email works best as a follow-up to seeing their Google Ad — reference it in the first line`,
    },
    {
      title: "Cold DM — After Email (Follow-Up)",
      tag: "Outreach",
      prompt: `Use this as a voice note script or typed DM — send 2–3 days after the cold email.

---

"Hey [NAME] — I reached out by email a few days ago. I'm the one who creates AI video clones of business owners for their social media.

I'd love to make one of you for free just to show you what it looks like — would you be open to seeing it?"

---
Notes:
• Keep it casual and short — this works best as a voice note on Instagram DM
• The free video offer removes all risk for them
• If they say yes → create a quick AI video using their photo → send it back
• That video becomes your close`,
    },
    {
      title: "DM — After Sending Free AI Video",
      tag: "Outreach",
      prompt: `Send this after you've created and delivered the free AI video to the prospect.

---

"Hey [NAME] — I made this AI video of you for your [BUSINESS TYPE]. Want to see it?

[ATTACH OR LINK THE VIDEO]

This is what we create for our clients every week — they never have to film anything. The AI speaks in their voice, with their face, on their brand.

If you wanted this running for [BUSINESS NAME] on a weekly basis, I'd love to show you how it works. Totally low-key — just a quick 10-minute call.

Worth it?"

---
Notes:
• The video does the selling — your job is just to deliver it and ask one question
• Don't over-explain. Let them react first.
• If they ask "how much?" — that's a buying signal. Move to the call.`,
    },
    {
      title: "Cold Email — The Compliment Approach",
      tag: "Outreach",
      prompt: `Subject: compliments to your [team / chef / staff]

Hi [FIRST NAME],

Just wanted to shoot you a quick email to give my compliments to [YOUR TEAM / YOUR CHEF / YOUR STAFF]! I [stopped by / ordered / came in] last week and [SPECIFIC GENUINE COMPLIMENT].

I wanted to share your business on social media — but when I looked, I noticed you guys aren't doing much with Facebook or Instagram ads. Any reason?

I think more people need to hear about [BUSINESS NAME]. Would love to help get the word out.

Also — where can I leave you a review? Happy to do that too.

Thanks!
— Mandy Fortune
The Dollhouse Brand Studio

---

[FOLLOW-UP EMAIL — send 2 days later if they respond positively]

Hey [NAME]! Thanks for the response. Just left you [an awesome review / a 5-star review].

Also for the social media stuff — I'd love to help you out. A lot of other [NICHE — e.g. "sushi restaurants / salons / dental practices"] in the area are using social media to get more customers. I think we could easily do the same for [BUSINESS NAME].

Let me know! Would love to help.

— Mandy

---
Why this works:
• Starts with a real compliment — completely disarms them
• Opens a door naturally (you noticed something they're missing)
• Low-pressure: asking where to leave a review makes you feel like a fan, not a salesperson
• The follow-up does the close`,
    },
    {
      title: "Cold DM — Free Trial Pitch",
      tag: "Outreach",
      prompt: `Use this when reaching out to a business owner for the first time via DM.

---

"Hey [NAME], I just built a new AI system for [NICHE — e.g. 'landscapers' / 'dentists' / 'salons']. It helps [SPECIFIC OUTCOME — e.g. 'book more jobs automatically' / 'never miss a lead again' / 'fill your calendar without ad spend'].

I'm looking for a few businesses to test it out. Would you want a free trial?"

---
Notes:
• Keep it under 3 sentences
• "Free trial" is the lowest-friction offer — they don't have to decide anything yet
• After they say yes → get them on a quick call → run the kickoff call checklist
• The trial sells itself — once they see results, the close is easy`,
    },
    {
      title: "AI Video — Multi-Scene Script (Talking Head + Action)",
      tag: "AI Video",
      prompt: `Use this structure to write AI video prompts for tools like Kling, Pika, Veo, or Runway.
Upload a clear headshot or photo of the business owner as your reference image.

---

Scene 1 — [LOCATION: office / storefront / clinic / outdoor]
Reference character: [UPLOAD CLIENT PHOTO]
Vertical cinematic realism. Show [CLIENT DESCRIPTION — e.g. "a sharp personal injury attorney in a navy suit"] standing in [SETTING DESCRIPTION]. Medium shot. Looks directly into camera and speaks with calm confidence. Natural hand gestures, realistic facial movement, clean professional lighting, believable lip sync.
Dialogue: "[OPENING LINE — hook, question, or bold statement]"

Scene 2 — Action Sequence
Reference character: [UPLOAD CLIENT PHOTO]
Vertical cinematic realism. [SETTING]. Show a fast multi-shot sequence:
1. [ACTION SHOT 1 — e.g. client next to a damaged car]
2. [ACTION SHOT 2 — close-up of relevant object]
3. [ACTION SHOT 3 — wide establishing shot]
Smooth camera motion, realistic action, documentary feel.
Dialogue: "[EDUCATIONAL TIP OR KEY POINT]"

Scene 3 — [SETTING]
Reference character: [UPLOAD CLIENT PHOTO]
Vertical cinematic realism. [DESCRIBE SCENE]. Natural body movement, serious but helpful tone, realistic facial sync, clean cinematic motion.
Dialogue: "[WARNING, PROOF POINT, OR NEXT STEP]"

Scene 4 — Close / CTA
Reference character: [UPLOAD CLIENT PHOTO]
Vertical cinematic realism. Back in [ORIGINAL SETTING]. Medium close-up. Client looks directly into camera with a warm, authoritative expression. Subtle hand gesture, professional lighting.
Dialogue: "[CTA — book, follow, call, DM]"

---
Tips:
• Keep each scene's dialogue under 15 seconds — AI video stays sharp at short clips
• Stitch scenes together in CapCut or your editing tool
• Add captions — 85% of social video is watched on mute`,
    },
    {
      title: "AI Video — Single Prompt (Quick Version)",
      tag: "AI Video",
      prompt: `Use this single prompt for a fast one-shot AI video. Best for simple talking head clips.

Paste into your AI video tool with the client's reference photo uploaded.

---

"[CLIENT DESCRIPTION — e.g. 'A sharp personal injury attorney in a navy suit and tie'] standing in [SETTING — e.g. 'a modern law office with bookshelves and framed diplomas behind them']. They look into camera and speak clearly. Show action shots of them [RELEVANT SCENE — e.g. 'on scene at a car accident, photographing damage'].

Dialogue (must match timing, approx [X] seconds):
'[FULL SCRIPT HERE — write in their voice, short and punchy]'

Ensure the audio matches what is being shown. Vertical cinematic realism. Smooth, realistic facial sync. Professional lighting."

---
Example script structure for a [BUSINESS TYPE]:
• Hook (2–3 sec): "If you [SITUATION], here's the first thing you do:"
• Tips (5–8 sec): 2–3 fast action items
• Warning (2 sec): "Whatever you do, don't [COMMON MISTAKE]"
• Close (2 sec): Warm, memorable line or CTA`,
    },
    {
      title: "Carousel — Agency / Results Focused",
      tag: "Platform AI",
      prompt: `Create a stunning Instagram carousel post (1080×1080, 7 slides).

Topic: [YOUR RESULT OR OFFER — e.g. "How to Grow Your Business on Social Media in 2026"]

Slide structure:
- Slide 1 (Hook): "[BOLD RESULT OR CLAIM — e.g. 'Our clients see real leads in 30 days — here's the system we use']"
- Slide 2: Why [TOPIC] is the biggest opportunity right now
- Slide 3: Step 1 — [KEY STRATEGY OR INSIGHT]
- Slide 4: Step 2 — [TOOLS OR PROCESS]
- Slide 5: Step 3 — How to get your first result / first client
- Slide 6: The system — how it all connects (automation + content + ads)
- Slide 7 (CTA): "Follow for more" + "[YOUR OFFER — free quiz / free call / DM us]"

Design direction:
- Dark premium background (deep navy, black, or charcoal)
- Bold typography, gold or rose accent colours — match The Dollhouse brand
- Clean minimal layouts — one big idea per slide
- Branded: include The Dollhouse Brand Studio logo on slide 1 and 7

Make it look professional, eye-catching, and ready to post.

---
Swap in your actual results once you have them. Specific numbers always outperform vague claims.`,
    },

    // ─── Content Sizes ───────────────────────────────────
    {
      title: "Size Cheat Sheet — All Platforms Quick Reference",
      tag: "Sizes",
      prompt: `Use this as your go-to reference before creating any content. Always build at these sizes so nothing gets cropped or distorted when posted.

═══════════════════════════════════
INSTAGRAM
═══════════════════════════════════
Static Post (Square)       1080 × 1080 px  (1:1)
Static Post (Portrait)     1080 × 1350 px  (4:5) ← best for feed reach
Static Post (Landscape)    1080 × 566 px   (1.91:1)
Reel / Video               1080 × 1920 px  (9:16 vertical)
Carousel Slides            1080 × 1080 px  (square) or 1080 × 1350 px (portrait)
Story                      1080 × 1920 px  (9:16 vertical)
Profile Photo              320 × 320 px    (displays at 110px)

═══════════════════════════════════
FACEBOOK
═══════════════════════════════════
Feed Post (Square)         1080 × 1080 px
Feed Post (Landscape)      1200 × 630 px
Reel / Video               1080 × 1920 px  (9:16 vertical)
Story                      1080 × 1920 px  (9:16 vertical)
Cover Photo                820 × 312 px
Profile Photo              170 × 170 px

═══════════════════════════════════
TIKTOK
═══════════════════════════════════
Video                      1080 × 1920 px  (9:16 vertical)
Photo Carousel             1080 × 1920 px  per slide (or 1080 × 1080 square)
Profile Photo              200 × 200 px

═══════════════════════════════════
GOOGLE BUSINESS PROFILE
═══════════════════════════════════
Post Photo                 1200 × 900 px   (4:3 landscape) ← recommended
Logo                       250 × 250 px
Cover Photo                1080 × 608 px
Product Photo              1200 × 900 px

═══════════════════════════════════
LINKEDIN
═══════════════════════════════════
Feed Post (Landscape)      1200 × 627 px
Feed Post (Square)         1200 × 1200 px
Document / Carousel        1080 × 1080 px  per slide
Video                      1080 × 1920 px  (vertical) or 1920 × 1080 (horizontal)
Profile Photo              400 × 400 px
Banner                     1584 × 396 px

═══════════════════════════════════
DESIGN TIPS
═══════════════════════════════════
• Safe zone: keep text and logos 150px from all edges on Stories/Reels
• Portrait (4:5) takes up more feed space than square — use it for static posts
• Export all graphics at 72 DPI, sRGB colour, JPG or PNG
• Keep file sizes under 8MB for fast loading`,
    },
    {
      title: "Instagram Static Post — Design Brief Prompt",
      tag: "Sizes",
      prompt: `Use this prompt to brief an AI image tool, designer, or Canva to create a static Instagram post for a client.

Canvas: 1080 × 1350 px (portrait, 4:5) — this size gets the most feed real estate.
If square is needed: 1080 × 1080 px.
Export: PNG or JPG, max 8MB, sRGB.

---

Paste this into ChatGPT or your AI tool:

"Create a detailed design brief for a static Instagram post for [BUSINESS NAME].

Business type: [e.g., med spa / restaurant / real estate agent]
Post goal: [e.g., promote a service / share a tip / announce a sale / build trust]
Canvas size: 1080 × 1350 px

Include:
- Headline text (under 6 words, big and bold)
- Subheadline or supporting copy (1–2 lines)
- Call to action text (e.g., 'Book Now' / 'Link in Bio' / 'DM us')
- Colour palette direction (pull from their brand colours if known: [BRAND COLOURS])
- Image or background direction (photo, gradient, solid colour, texture)
- Font style direction (bold/modern, script/elegant, clean/minimal)
- Mood/vibe: [e.g., luxury, approachable, clinical, warm, bold]

Give me the layout as: what's at the top, middle, and bottom of the graphic."

---
Once you have the brief — build it in Canva, Adobe Express, or your design tool at the correct canvas size above.`,
    },
    {
      title: "Instagram Reel — Script & Spec Prompt",
      tag: "Sizes",
      prompt: `Use this prompt to generate a full Reel script with the correct video specs for Instagram.

Video Specs:
Canvas: 1080 × 1920 px (9:16 vertical — full screen)
Length: 15–60 seconds ideal (up to 90 sec allowed)
Safe zone for text/graphics: keep all elements 250px from top and bottom edges (UI overlays)
Captions: Always add — 85% of Reels are watched on mute
Export: MP4, H.264, max 4GB

---

Paste this into ChatGPT:

"Write a complete Instagram Reel script for [BUSINESS NAME].

Business type: [e.g., chiropractor / clothing boutique / personal trainer]
Reel goal: [e.g., get viewers to book / educate about a service / show a transformation / drive DMs]
Target length: [15 / 30 / 45 / 60] seconds
Tone: [e.g., fun and energetic / calm and professional / bold and direct]
Hook style: [e.g., question / bold statement / surprising fact / 'Did you know...']

Write it in this format:
- 0:00–0:03 HOOK — [what to say or show to stop the scroll]
- 0:03–0:10 SETUP — [the problem or context]
- 0:10–0:35 VALUE — [tips, transformation, story, or proof]
- 0:35–0:45 CTA — [exactly what to say at the end: DM us / book / follow / comment]

Also include:
- 3 on-screen text overlay suggestions (what to put on the screen at key moments)
- 2 trending audio vibes that would fit this Reel (describe the type, not a specific song)
- Caption for the post (under 150 characters + 5 hashtags)"`,
    },
    {
      title: "Instagram Carousel — 5 Slides (Client Content)",
      tag: "Sizes",
      prompt: `Use this prompt to generate a complete 5-slide carousel for any client. Max 5 slides — clean, scannable, and converts.

Canvas: 1080 × 1080 px (square) or 1080 × 1350 px (portrait)
Each slide is its own graphic — same size for all slides
File: PNG or JPG per slide, export in order (Slide 1, 2, 3, 4, 5)
Max slides: 5 — keep it tight. People swipe less as carousels get longer.

---

Paste this into ChatGPT:

"Create a complete 5-slide Instagram carousel for [BUSINESS NAME].

Business type: [e.g., salon / law firm / fitness coach]
Carousel topic: [e.g., '5 signs you need [SERVICE]' / '3 things to know before [PURCHASE]' / 'Why [BUSINESS NAME] is different']
Canvas size per slide: 1080 × 1080 px
Brand colours: [LIST COLOURS or 'use professional defaults']
Tone: [e.g., educational / motivational / luxury / friendly]

For each of the 5 slides, give me:
• Slide number and type (Hook / Content / Content / Proof / CTA)
• Headline text (under 7 words — big, bold)
• Body copy (1–3 short lines max per slide)
• Visual direction (what image, icon, or background works on this slide)
• Design note (what makes this slide stand out visually)

Slide structure:
- Slide 1 (Hook): Bold claim, question, or result that makes them swipe
- Slide 2: First point / tip / reason
- Slide 3: Second point / tip / reason
- Slide 4: Third point — OR a testimonial / proof / stat
- Slide 5 (CTA): Direct ask — 'Book now' / 'DM us [WORD]' / 'Follow for more'

End with: suggested caption for the post (under 200 characters + 5–8 hashtags)"`,
    },
    {
      title: "Facebook Feed Post — Design Brief Prompt",
      tag: "Sizes",
      prompt: `Use this prompt to generate a Facebook static post brief for any client.

Canvas:
- Square: 1080 × 1080 px (shows well on both desktop and mobile)
- Landscape: 1200 × 630 px (better for link previews and boosted posts)
- Portrait: 1080 × 1350 px (4:5 — max height Facebook allows in feed)

Recommended: 1080 × 1080 px square for most posts.
Export: JPG or PNG, under 8MB, sRGB.

---

Paste this into ChatGPT:

"Create a Facebook static post design brief for [BUSINESS NAME].

Business type: [TYPE]
Post goal: [promote a service / share a testimonial / announce an offer / holiday post]
Canvas: 1080 × 1080 px

Include:
- Primary headline (6 words or fewer, large and bold)
- Supporting copy (2–3 short lines)
- CTA text (e.g., 'Call Now' / 'Get a Free Quote' / 'Book Online')
- Phone number or website to include: [PHONE / URL]
- Visual direction: [photo of the business, before/after, product shot, or text-only]
- Colour palette: [BRAND COLOURS or describe the vibe]
- Mood: [e.g., trustworthy and local / bold and promotional / clean and modern]

Also write the Facebook caption for this post:
- 2–4 sentences max
- Include a CTA at the end
- Add 3–5 relevant hashtags"`,
    },
    {
      title: "TikTok Video — Script & Spec Prompt",
      tag: "Sizes",
      prompt: `Use this prompt to generate a TikTok-specific video script with correct specs.

Video Specs:
Canvas: 1080 × 1920 px (9:16 vertical — ALWAYS vertical for TikTok)
Length: 7–60 seconds for most reach; 3–5 min for educational content
Safe zone: keep text 150px from all 4 edges (TikTok overlays UI on top and bottom)
Captions: essential — add them in CapCut or TikTok's auto-caption tool
Export: MP4, H.264, max 287.6MB

---

Paste this into ChatGPT:

"Write a TikTok script for [BUSINESS NAME] designed to get views and followers.

Business type: [TYPE — e.g., nail tech / HVAC company / life coach]
Goal: [get bookings / go viral / educate / show a before/after / trend participation]
Length: [15 / 30 / 60] seconds
Tone: [real and relatable / professional but approachable / fun and trendy]

TikTok script format:
- 0:00–0:03: HOOK — [the first words. Must be a scroll-stopper. Often a question or bold statement]
- 0:03–0:08: PROMISE — [what they'll learn or see if they keep watching]
- 0:08–0:45: CONTENT — [the actual value, story, or transformation]
- 0:45–0:60: CTA — [follow us / comment / book / DM the word [WORD]]

Also include:
- 2 on-screen text overlays (what words appear on screen at key moments)
- Audio direction (describe the vibe: hype beat, calm background music, trending sound style)
- Caption for TikTok (1–2 punchy lines + 5 hashtags mixing popular and niche)
- Thumbnail text (the 3–5 words shown before they play the video)"`,
    },
    {
      title: "TikTok Carousel / Photo Slideshow — 5 Slides",
      tag: "Sizes",
      prompt: `Use this prompt to generate a TikTok photo carousel (slideshow post). TikTok photo carousels are getting massive organic reach right now.

Canvas: 1080 × 1920 px per slide (9:16 vertical) — TikTok shows them full-screen
OR: 1080 × 1080 px square (also works, shows with black bars)
Max slides: Up to 35 — but 3–7 slides performs best for engagement
File: JPG or PNG per slide

---

Paste this into ChatGPT:

"Create a 5-slide TikTok photo carousel for [BUSINESS NAME].

Business type: [TYPE]
Topic: [e.g., '5 things your [SERVICE PROVIDER] isn't telling you' / '[NUMBER] mistakes to avoid' / 'how we do [PROCESS] step by step']
Canvas: 1080 × 1920 px per slide
Tone: [educational / motivational / behind-the-scenes / trendy list format]

For each of the 5 slides:
• Slide number + type
• Big bold text overlay (under 8 words — this is the main message on screen)
• Brief visual direction (what photo or background works here)

Slide structure:
- Slide 1 (Hook): Bold statement or question — makes them tap to swipe
- Slides 2–4: The content, tips, facts, or steps
- Slide 5 (CTA): 'Follow for more' or 'Comment [WORD] for [OFFER]'

Also write:
- The TikTok caption (1–2 lines + 5 hashtags)
- On-screen text style direction (e.g., big white bold on dark, split layout, minimal)"`,
    },
    {
      title: "Google Business Post — Design & Copy Prompt",
      tag: "Sizes",
      prompt: `Use this prompt to generate a Google Business Profile post for any client. These posts show up in Google Maps and Google Search — very high visibility for local businesses.

Image Specs:
Recommended: 1200 × 900 px (4:3 landscape) — shows best in the GMB interface
Minimum: 400 × 300 px
Max file size: 10MB
Format: JPG or PNG
Post character limit: 1,500 characters (but 150–300 is the sweet spot — most people don't read long GMB posts)

Post types available in Google Business:
• What's New — general update or offer
• Event — for classes, sales, pop-ups (requires start/end date)
• Offer — for promotions with a redemption code or link
• Product — for specific service or product highlights

---

Paste this into ChatGPT:

"Write a Google Business Profile post for [BUSINESS NAME].

Business type: [TYPE — e.g., plumber / dentist / bakery]
Post type: [What's New / Offer / Event / Product]
Goal: [get more calls / promote a service / share a seasonal offer / get more reviews]
Image size for this post: 1200 × 900 px

Write:
1. The post copy (150–300 characters — short, local, conversational. Include the city/neighborhood name.)
2. A call to action suggestion (Book / Call / Learn More / Get Offer)
3. Brief image direction: what photo would work best for this post (interior shot, product, team, before/after, etc.)
4. 3 keywords to naturally include in the post for local SEO

Also suggest: best day/time to post this for a [TYPE] business."`,
    },

    // ─── Platform Automations ────────────────────────────
    {
      title: "Missed Call Text-Back — Automation Setup",
      tag: "Automations",
      prompt: `This is the #1 automation to build for every single client. Set it up during onboarding — every client gets this regardless of package.

WHAT IT DOES:
When a customer calls [CLIENT BUSINESS] and no one answers, the system automatically sends them a text within 60 seconds — so you never lose a lead to a missed call.

HOW TO BUILD IT IN THE PLATFORM:
Trigger: "Call Status = Missed / No Answer"
Action 1: Wait — 1 minute
Action 2: Send SMS from [CLIENT PHONE NUMBER]
Action 3 (optional): Add tag "Missed Call — Needs Follow-Up" to contact
Action 4 (optional): Add to pipeline stage "New Lead"

---

Paste this into ChatGPT to write the SMS message for your client:

"Write a missed call text-back message for [BUSINESS NAME].

Business type: [TYPE — e.g., dental office / law firm / plumbing company]
Tone: [professional / warm and friendly / urgent]

Requirements:
- Under 160 characters (one SMS credit)
- Acknowledge the missed call
- Include a way to respond or book (link, reply to text, or call back option)
- Sound human — NOT automated

Write 3 versions: one warm/friendly, one direct/professional, one with a light urgency."

---

After the message is written — paste it into the SMS field in the workflow.
Test it by calling the client's number from a separate phone before going live.`,
    },
    {
      title: "New Lead Welcome Sequence — Email + SMS",
      tag: "Automations",
      prompt: `Build this automation the moment a new lead comes in through any form, funnel, or ad. This sequence warms them up before you ever talk to them.

WHAT IT DOES:
When someone submits a form or fills out a lead capture — they immediately receive a welcome message, then a follow-up sequence over the next 4 days to move them toward booking.

HOW TO BUILD IT IN THE PLATFORM:
Trigger: "Form Submitted" (or "Contact Created" from ad / funnel)
Action 1: Send SMS — immediately (welcome message)
Action 2: Send Email — immediately (welcome email)
Action 3: Wait — 1 day
Action 4: Send Email — follow-up #1 (value + social proof)
Action 5: Wait — 2 days
Action 6: Send SMS — follow-up nudge
Action 7: Wait — 1 day
Action 8: Send Email — follow-up #2 (urgency / CTA to book)
Action 9: Add tag "Lead Sequence Complete"

---

Paste this into ChatGPT to write all the messages:

"Write a 4-touch lead welcome sequence for [BUSINESS NAME].

Business type: [TYPE]
Lead source: [e.g., Facebook ad / website contact form / free trial sign-up]
Offer they responded to: [e.g., free consultation / 14-day trial / discount]
Tone: [warm and personal / professional / energetic]

Write all of the following:

1. WELCOME SMS (immediately after opt-in) — under 160 characters. Warm, personal, confirms they're in the right place.

2. WELCOME EMAIL (immediately after opt-in)
   Subject line + full body. Thank them, remind them what they signed up for, tell them exactly what happens next, include a CTA to book or call.

3. FOLLOW-UP EMAIL — Day 2
   Subject line + body. Share one piece of value (tip, stat, or mini case study). Soft CTA at the end.

4. FOLLOW-UP SMS — Day 3
   Under 160 characters. Casual check-in. Ask if they have questions or are ready to schedule.

5. FINAL EMAIL — Day 4
   Subject line + body. Light urgency (spots filling, offer ending, etc.). Clear CTA: 'Book your call here: [LINK]'

Make every message sound like it's coming from a real person named Mandy, not a company."`,
    },
    {
      title: "Review Request Automation — Post-Service",
      tag: "Automations",
      prompt: `Build this automation for every client immediately after a client onboarding or first service completion. Google reviews are the fastest way to build credibility for local businesses.

WHAT IT DOES:
After a client marks a job complete or an appointment status updates to "Completed" — the system automatically sends a review request via SMS and email.

HOW TO BUILD IT IN THE PLATFORM:
Trigger: "Appointment Status Changed → Completed" (or "Pipeline Stage = Completed / Job Done")
Action 1: Wait — 2 hours (let them get home and settle)
Action 2: Send SMS (review request)
Action 3: Wait — 1 day
Action 4: If no review link clicked → Send Email (review follow-up)
Action 5: Add tag "Review Requested"

---

Paste this into ChatGPT to write the messages:

"Write a review request sequence for [BUSINESS NAME].

Business type: [TYPE]
Google Review Link: [PASTE CLIENT'S GOOGLE REVIEW LINK HERE]
Tone: [warm / professional / genuine — not salesy]

Write:

1. REVIEW REQUEST SMS (sent 2 hours after service)
Under 160 characters. Personal. Ask how the experience was. Include the Google review link. Do NOT use the word 'automated' or 'system.'

2. REVIEW REQUEST EMAIL (sent next day if no click)
Subject line + full body. Thank them by name for choosing [BUSINESS NAME]. Share the Google review link clearly. Make it feel like a personal note from [OWNER NAME], not a corporate email.

Both messages should feel like they were typed personally, not mass-sent."

---

Note: Always get the client's Google Review shortlink before building this. To find it: Google 'your business name' → click 'Write a Review' → copy that URL → shorten with bit.ly if needed.`,
    },
    {
      title: "Appointment Reminder Sequence",
      tag: "Automations",
      prompt: `Build this for every client who has appointment-based bookings. Reduces no-shows by up to 80%.

WHAT IT DOES:
After an appointment is booked in the system — the contact automatically receives reminders at 24 hours, 2 hours, and 15 minutes before their appointment.

HOW TO BUILD IT IN THE PLATFORM:
Trigger: "Appointment Booked" (calendar event created)

Reminder 1:
Action: Wait until [24 hours before appointment start time]
Action: Send SMS (24-hour reminder)
Action: Send Email (24-hour reminder)

Reminder 2:
Action: Wait until [2 hours before appointment start time]
Action: Send SMS (2-hour reminder)

Reminder 3:
Action: Wait until [15 minutes before appointment start time]
Action: Send SMS (15-minute reminder)

---

Paste this into ChatGPT to write the messages:

"Write an appointment reminder sequence for [BUSINESS NAME].

Business type: [TYPE — e.g., chiropractor / salon / financial advisor]
Appointment type: [e.g., consultation / adjustment / haircut / onboarding call]
Tone: [warm / professional]
Business address: [ADDRESS] (include in reminders)
Cancellation/reschedule instructions: [e.g., 'Reply CANCEL to cancel' or 'Call us at [PHONE]']

Write:

1. 24-HOUR REMINDER SMS — under 160 characters. Confirm the appointment time and date. Include address or Zoom link. Include how to reschedule.

2. 24-HOUR REMINDER EMAIL — Subject line + body. Friendly tone. Recap what to bring / prepare if applicable. Confirm time, date, address/link.

3. 2-HOUR REMINDER SMS — under 160 characters. Quick reminder. Keep it warm and short.

4. 15-MINUTE REMINDER SMS — under 160 characters. 'We're ready for you!' style. Very short."`,
    },
    {
      title: "Instagram Comment → Auto-DM Trigger",
      tag: "Automations",
      prompt: `This is one of the highest-converting automations for social media. When someone comments a specific keyword on a client's post — they instantly get a DM with the offer or lead magnet. Turns every viral post into a lead generator.

WHAT IT DOES:
Someone comments a trigger word on a post (e.g., "INFO" or "PRICE" or "YES") → they instantly receive a DM with the resource, link, or offer → their contact is created in the CRM automatically.

HOW TO BUILD IT IN THE PLATFORM:
Trigger: "Instagram Comment Received" — containing keyword [TRIGGER WORD]
Action 1: Send Instagram DM (automated — instant)
Action 2: Create Contact (if not already exists)
Action 3: Add tag "[TRIGGER WORD] — Requested"
Action 4: Add to Pipeline stage "New Lead"

---

Paste this into ChatGPT to write the messages and set up the post:

"Write an Instagram comment-trigger campaign for [BUSINESS NAME].

Business type: [TYPE]
The offer / lead magnet: [e.g., free price guide / free consultation / free checklist / discount code]
Trigger word: [choose one easy word — e.g., GUIDE / INFO / YES / FREE / PRICE]
Tone: [warm / fun / professional]

Write:

1. THE POST CAPTION (for the original Instagram post)
- Hook line that tells them to comment [TRIGGER WORD] to get the thing
- 2–3 lines of value about why the offer matters
- Clear CTA: 'Comment [TRIGGER WORD] below and I'll DM you instantly!'
- 5–8 hashtags

2. THE AUTO-DM (sent instantly when they comment)
Under 300 characters. Personal, warm, instant. Include the link or resource. Ask a soft qualifying question at the end (e.g., 'Are you located in [CITY]?' or 'Have you tried [SERVICE] before?')

3. A FOLLOW-UP DM (send 24 hours later if they don't respond to the first DM)
Short and casual — checking in, still offering the resource."

---

Test this thoroughly before going live: make a test comment on the post from a personal account and confirm the DM fires correctly.`,
    },
    {
      title: "New Client Onboarding Sequence",
      tag: "Automations",
      prompt: `Build this automation the moment a new client pays their invoice or signs their contract. It sets the tone for the entire relationship and makes you look like a premium operation from day one.

WHAT IT DOES:
When a new client signs or pays → they receive a welcome sequence over the first week that introduces them to how the service works, sets expectations, and collects what you need to get started.

HOW TO BUILD IT IN THE PLATFORM:
Trigger: "Invoice Paid" OR "Contract Signed" OR "Tag Added: New Client"

Action 1: Send SMS — immediately (welcome)
Action 2: Send Email — immediately (welcome + next steps)
Action 3: Create Task — "Send onboarding questionnaire to [CLIENT NAME]" (assign to yourself)
Action 4: Wait — 1 day
Action 5: Send Email — Day 2 (what to expect this week)
Action 6: Wait — 3 days
Action 7: Send Email — Day 5 (check-in + content kickoff)
Action 8: Create Task — "First content draft ready for review" (set due date 7 days)
Action 9: Add tag "Onboarding — Week 1"

---

Paste this into ChatGPT to write the messages:

"Write a new client onboarding sequence for The Dollhouse Brand Studio.

New client name: [NAME]
Business name: [BUSINESS NAME]
Package they signed up for: [Starter / Growth / Elite]
Platform they're on: [Instagram / Facebook / TikTok / etc.]

Write:

1. WELCOME SMS (sent immediately after payment/signing)
Under 160 characters. Exciting, warm, personal. Make them feel like they made the right decision.

2. WELCOME EMAIL (sent immediately)
Subject line + full body. Thank them for joining. Outline exactly what happens in the next 7 days step by step (Day 1, Day 3, Day 7). Include what they need to send you: login access, brand kit, photos, logo. Make them feel taken care of.

3. DAY 2 EMAIL — 'What to Expect This Week'
Subject line + body. Set expectations for content review process, posting schedule, how to give feedback. Keep it simple and reassuring. Light tone.

4. DAY 5 EMAIL — 'We're Getting Started!'
Subject line + body. Let them know content creation has begun. Give them a sneak peek or first deliverable update. Ask if they have any questions or anything they want to make sure we include."`,
    },
    {
      title: "7-Day Lead Nurture Drip Sequence",
      tag: "Automations",
      prompt: `Build this for leads who showed interest but didn't book. This automated sequence keeps you top of mind over 7 days and converts cold leads into warm ones.

WHAT IT DOES:
A lead comes in and doesn't book right away → they enter this 7-day sequence → by day 7 they've received 5 touches and are far more likely to say yes when you follow up manually.

HOW TO BUILD IT IN THE PLATFORM:
Trigger: "Tag Added: Nurture Sequence" (add this tag manually or from a pipeline stage)

Day 0: SMS — immediate (entered sequence)
Day 1: Email — value content
Day 2: SMS — soft check-in
Day 3: Email — case study or social proof
Day 5: Email — objection-handling
Day 7: SMS + Email — final offer / urgency close
End: Add tag "Nurture Complete" → Create Task "Manual Follow-Up Call"

---

Paste this into ChatGPT to write all messages:

"Write a 7-day lead nurture drip sequence for The Dollhouse Brand Studio targeting [TYPE OF BUSINESS OWNER — e.g., local service businesses / e-commerce brands / restaurant owners].

The lead didn't book after the initial outreach. They're warm but haven't committed. Goal: build trust, show proof, handle objections, and get them to book a call or start the free trial.

Our packages: Starter $1,000/mo, Growth $2,500/mo, Elite $5,000+/mo. All with a $500 one-time setup and 14-day free trial option.

Write:
1. Day 0 SMS — immediate. Short and warm. 'We've got some good stuff coming your way.'
2. Day 1 Email — Subject + body. Share one valuable tip about social media for [THEIR INDUSTRY]. No pitch. Pure value.
3. Day 2 SMS — Check-in. Casual. 'Quick question — what's your biggest frustration with social media right now?'
4. Day 3 Email — Subject + body. Mini case study or proof point. What results a similar business got. Keep it short and real.
5. Day 5 Email — Subject + body. Handle the 3 most common objections: price, timing, 'I tried this before.' Warm and conversational tone.
6. Day 7 SMS — Short urgency nudge. Mention the free trial.
7. Day 7 Email — Subject + body. The final touch. Make the case one more time. Clear CTA: 'Book a 15-minute call' or 'Start your 14-day free trial.' After this — personal follow-up from Mandy."`,
    },
    {
      title: "Re-engagement Campaign — Dormant Contacts",
      tag: "Automations",
      prompt: `Use this automation to re-engage leads who went cold — haven't responded in 30+ days. Run it once a month on any contact with the tag "Cold Lead" or "No Response."

WHAT IT DOES:
Contacts who went dark get a 3-touch re-engagement sequence over 5 days. If they respond — remove from sequence and book them. If no response — tag as "Inactive" and move on.

HOW TO BUILD IT IN THE PLATFORM:
Trigger: "Tag Added: Re-Engagement" (add manually each month to cold contacts)

Action 1: Send SMS — Day 0 (the pattern interrupt)
Action 2: Wait — 2 days
Action 3: Send Email — Day 2 (the value-add reachout)
Action 4: Wait — 3 days
Action 5: Send SMS — Day 5 (the final nudge)
Action 6: Add tag "Re-Engagement Sent"
Action 7: If no reply within 7 days → Add tag "Inactive — Archive"

---

Paste this into ChatGPT to write the messages:

"Write a 3-touch re-engagement campaign for The Dollhouse Brand Studio targeting leads who went silent 30+ days ago.

Lead type: [local business owners / e-commerce brand owners]
Last touchpoint: [they saw our pricing / had a call / requested info / tried the free trial]
Tone: warm and honest — not desperate, not salesy

Write:

1. RE-ENGAGEMENT SMS — Day 0
Under 160 characters. A pattern interrupt — say something real, honest, and human. Not a generic 'just checking in.' Something like acknowledging time has passed and asking a direct question.

2. RE-ENGAGEMENT EMAIL — Day 2
Subject: something that stands out in an inbox (creative, not a boring 'follow up')
Body: short. Acknowledge you haven't spoken in a while. Share something genuinely new or valuable — a tip, a result, a new offer. Soft CTA.

3. FINAL SMS — Day 5
The breakup text. Short, kind, and honest. Tell them this is the last message. Leave the door open for when timing is better."`,
    },

    // ─── Proposals ───────────────────────────────────────
    {
      title: "Client Proposal — Starter Package ($1,000/mo)",
      tag: "Proposals",
      prompt: `Use this prompt to generate a full professional proposal for any prospective client on the Starter package. Customize all bracketed fields before sending.

Paste this into ChatGPT:

"Write a professional social media management proposal for [CLIENT/BUSINESS NAME] from The Dollhouse Brand Studio.

Discovery call notes:
- Business type: [TYPE — e.g., dental office / boutique salon / landscaping company]
- Their biggest pain point: [what they told you on the call]
- Their goal: [e.g., more leads / more bookings / more brand awareness]
- Platforms they want: [e.g., Instagram + Facebook]
- Their current social situation: [e.g., posting inconsistently / no presence at all / had someone before but unhappy]

Package: Starter — $1,000/mo + $500 one-time setup fee
Includes:
- 1 platform fully managed (content creation, captions, scheduling)
- AI brand clone — content in their voice without filming
- 12 posts/month (mix of reels, carousels, and static posts)
- Comment keyword trigger + auto-DM automation
- Missed call text-back
- Online booking integration
- Monthly performance report
- 14-day free trial option ($500 setup required, first 2 weeks free)

Format the proposal with these sections:
1. Introduction — personalized, reference their business specifically
2. The Problem We Solve — restate their pain points in their own words
3. Our Solution — describe the Starter package as it applies to THEIR business
4. What's Included — formatted list of deliverables
5. Pricing — $1,000/mo + $500 setup. Mention 14-day free trial option.
6. Next Steps — Step 1 / Step 2 / Step 3 (sign, pay setup, onboarding call)
7. About The Dollhouse Brand Studio — 2–3 sentences on who we are

Tone: professional but warm. Confident, not pushy. Make it feel custom — not like a template.
Length: 400–600 words. Clean, scannable formatting. No fluff."`,
    },
    {
      title: "Client Proposal — Growth Package ($2,500/mo)",
      tag: "Proposals",
      prompt: `Use this prompt to generate a full proposal for the Growth package. Best for clients who want multiple platforms, paid ads, and faster growth.

Paste this into ChatGPT:

"Write a professional social media management proposal for [CLIENT/BUSINESS NAME] from The Dollhouse Brand Studio.

Discovery call notes:
- Business type: [TYPE]
- Their biggest pain point: [what they told you]
- Their goal: [e.g., scale lead volume / run ads effectively / expand to multiple platforms]
- Platforms they want: [e.g., Instagram + TikTok + Facebook]
- Current situation: [e.g., have one platform but want more / running ads but no results / need full system]

Package: Growth — $2,500/mo + $500 one-time setup fee
Includes:
- Everything in Starter — now across 3 platforms (Instagram, TikTok, Facebook)
- Paid ad management — Facebook & Instagram ads included
- Email + SMS automation sequences for lead follow-up
- 18 posts/month across platforms
- Full CRM pipeline setup and lead management
- Monthly strategy call + performance report
- 14-day free trial option ($500 setup required)

Format the proposal with these sections:
1. Introduction — personal, reference their discovery call
2. The Problem We Solve — restate their pain points (use their exact words if possible)
3. Our Solution — describe Growth package as it applies to their specific business and goals
4. What's Included — clean formatted deliverable list
5. Pricing — $2,500/mo + $500 setup. Mention free trial option.
6. Results You Can Expect — be honest, set realistic expectations for first 30/60/90 days
7. Next Steps — Step 1 / Step 2 / Step 3
8. About The Dollhouse Brand Studio — 2–3 sentences

Tone: premium and results-focused. This client is investing more — the proposal should match that seriousness.
Length: 500–700 words. Scannable, professional, no fluff."`,
    },
    {
      title: "Client Proposal — Elite Package ($5,000+/mo)",
      tag: "Proposals",
      prompt: `Use this prompt for high-ticket prospects. The Elite proposal should feel like it came from a real agency — premium, thorough, and specific to their business.

Paste this into ChatGPT:

"Write a high-end social media and digital marketing proposal for [CLIENT/BUSINESS NAME] from The Dollhouse Brand Studio.

Discovery call notes:
- Business type: [TYPE — e.g., med spa chain / law firm / e-commerce brand scaling to $1M+]
- Their biggest challenge: [what they told you]
- Their goals: [e.g., dominate local market / build a content machine / scale with ads]
- Platforms: [e.g., all 5: Instagram, TikTok, Facebook, YouTube, LinkedIn or Google Business]
- Budget appetite: [$5,000–$10,000/mo]
- Current operation: [e.g., has marketing person internally / running ads already / large team]

Package: Elite — Starting at $5,000/mo + $500 one-time setup fee
Includes:
- Full-service management across 5 platforms
- AI brand clone + AI voice agent for inbound inquiries
- Full paid ad management (Meta + Google)
- Email + SMS campaigns + advanced automation workflows
- Weekly content production (20–30 pieces/month)
- Dedicated account manager (Mandy personally involved)
- Monthly strategy meeting + detailed reporting dashboard
- Priority support and same-day response SLA

Format this proposal with:
1. Executive Summary — 1 powerful paragraph on the opportunity and what we'll build together
2. Situation Analysis — their current position and what's being left on the table
3. Our Strategy — a high-level content + paid ads + automation game plan specific to their business
4. Full Scope of Work — detailed deliverable list by category
5. Investment — $5,000/mo starting rate (note: final quote based on scope) + $500 setup
6. Timeline — what happens in weeks 1, 2, 3, 4 after they start
7. Why The Dollhouse Brand Studio — 3–4 sentences. Confident. Why us, not anyone else.
8. Next Steps — exactly how to move forward today

Tone: premium agency tone. Polished, data-aware, strategic. This is a high-ticket close — every word should earn trust.
Length: 700–1,000 words. Well-formatted sections, clean and professional."`,
    },
    {
      title: "Custom Proposal Builder — Any Client, Any Package",
      tag: "Proposals",
      prompt: `Use this when you need a proposal built fast for a client who doesn't fit neatly into one package, or when you want to customize pricing for a specific situation.

Paste this into ChatGPT:

"Build a custom social media management proposal for [CLIENT/BUSINESS NAME] from The Dollhouse Brand Studio.

Here's everything from the discovery call:
[PASTE YOUR NOTES FROM THE CALL — be as detailed as possible: what they said, what they need, their budget reaction, what got them excited, what concerned them]

Based on my notes above, do the following:

1. Recommend the best package for this client (Starter $1k, Growth $2.5k, or Elite $5k+) and explain why in 2–3 sentences. If they should start on one and upgrade, note that.

2. Write a complete custom proposal with these sections:
   - Personal intro referencing something specific from our call
   - Their problem, in their own words
   - Our custom solution (tailor the deliverables to what they actually need — not just the standard list)
   - Pricing and what's included
   - 14-day free trial mention if applicable
   - Exact next steps to sign and start
   - A closing line that feels personal, not template-y

3. Suggest: should I mention the free trial in this proposal based on what you know about this client? Why or why not?

Tone: match their energy from the call. If they were formal — be polished. If they were casual — be warm and conversational. This proposal should feel like it was written specifically for them."`,
    },

    // ─── Contracts ───────────────────────────────────────
    {
      title: "Month-to-Month Service Agreement — Template",
      tag: "Contracts",
      prompt: `Use this prompt to generate a clean, professional month-to-month service agreement. Have a lawyer review before using for clients over $2,000/mo.

Paste this into ChatGPT:

"Draft a month-to-month social media management service agreement for The Dollhouse Brand Studio.

Details to include:
- Service Provider: The Dollhouse Brand Studio (Mandy Fortune, Owner)
- Client: [CLIENT FULL NAME or BUSINESS LEGAL NAME]
- Service Start Date: [DATE]
- Services Provided: [LIST — e.g., social media management for Instagram, content creation, scheduling, monthly reporting]
- Package: [Starter / Growth / Elite]
- Monthly Fee: $[AMOUNT]/month
- One-Time Setup Fee: $500 (due before work begins)
- Billing Date: [e.g., 1st of each month / same date as signup]
- Payment Method: [e.g., credit card on file / ACH / invoice]

Write a complete agreement with these sections:
1. Services — what The Dollhouse Brand Studio will provide
2. Term — month-to-month, either party can cancel with [14 / 30] days written notice
3. Fees & Payment — monthly fee, setup fee, late payment policy (add 10% after 7 days late)
4. Client Responsibilities — what the client must provide (logins, photos, feedback within 48 hrs)
5. Intellectual Property — content created belongs to the client after payment
6. Confidentiality — both parties agree not to share proprietary information
7. Limitation of Liability — The Dollhouse Brand Studio is not liable for platform algorithm changes, ad performance fluctuations, or results beyond our direct control
8. Termination — either party may cancel with [14/30] days notice in writing
9. Governing Law — [YOUR STATE]
10. Signatures — Client signature, date / The Dollhouse Brand Studio signature, date

Tone: professional and clear. Plain English where possible — not overly legalese. Client should be able to read and understand it in under 5 minutes."`,
    },
    {
      title: "14-Day Free Trial Agreement",
      tag: "Contracts",
      prompt: `Use this prompt to generate a simple free trial agreement. This is a lighter document — not a full contract — but it protects you and sets expectations before the client converts to monthly billing.

Paste this into ChatGPT:

"Write a 14-day free trial agreement for The Dollhouse Brand Studio.

Details:
- Service Provider: The Dollhouse Brand Studio (Mandy Fortune)
- Client: [NAME / BUSINESS NAME]
- Trial Start Date: [DATE]
- Trial End Date: [DATE + 14 days]
- Setup Fee (collected upfront, non-refundable): $500
- Platform Managed During Trial: [e.g., Instagram]
- Monthly Fee After Trial (if they continue): $[AMOUNT]/month
- Billing Starts: Automatically on Day 15 unless client cancels in writing before trial end

Write this agreement with:
1. Trial Description — what's included during the 14 days (full Starter service, or subset — specify)
2. Setup Fee — $500 is collected before work begins. Non-refundable. Covers AI clone build, content system setup, and automation configuration.
3. Trial Period — 14 days of service at no additional charge
4. Conversion to Monthly — unless client cancels in writing [48 hours] before trial end, monthly billing of $[AMOUNT] begins automatically
5. Cancellation During Trial — client may cancel at end of trial with no obligation beyond the $500 setup fee
6. Client Responsibilities — provide logins, brand assets, and feedback promptly
7. Signatures — Client / The Dollhouse Brand Studio / Date

Tone: friendly and clear. This should feel like a simple, honest agreement — not intimidating. Client should sign this in under 2 minutes."`,
    },
    {
      title: "Client Intake / Onboarding Form — Questions",
      tag: "Contracts",
      prompt: `Use this prompt to create the onboarding intake form that every new client fills out. Build this as a form in the platform or send as a fillable PDF/Google Form.

Paste this into ChatGPT:

"Create a detailed new client onboarding intake form for The Dollhouse Brand Studio.

This form is filled out by new clients after they sign and pay. It collects everything we need to start creating their content and setting up their automations.

Write a complete form with the following sections:

SECTION 1 — Business Basics
- Business legal name
- Business type / industry
- Website URL
- Location(s) — city/state
- Business phone number
- Primary contact name and email
- Who should we contact for content approvals?

SECTION 2 — Social Media Accounts
- List all platforms and usernames
- Who currently manages their accounts?
- Do we have login access? (Yes / Need to share)
- Which platform is most important to them right now?

SECTION 3 — Brand Identity
- Do you have a brand kit? (Yes — attach / No — we'll build one)
- Primary colours (hex codes if available)
- Fonts used (if known)
- Tagline or brand statement
- Tone of voice: check all that apply [Professional / Friendly / Bold / Luxurious / Fun / Educational / Authoritative]

SECTION 4 — Content Preferences
- What topics should we post about? (List 3–5)
- What topics should we NEVER post about?
- Do you have existing photos/videos we can use? (Yes — please submit / No)
- Do you want to be in the content? (Yes / Sometimes / No — use stock/AI)
- Competitors you admire (if any):

SECTION 5 — Goals & Strategy
- What does success look like in the first 30 days?
- What's the #1 action you want followers to take? (Book / Call / Buy / DM / Follow)
- Any upcoming events, promotions, or launches we should plan content around?

SECTION 6 — Access & Logins
(Remind client to use the secure password-sharing method — never send passwords in email)
- Social media account access method: [Creator Studio / Direct login / Two-factor via their phone]
- Any other tools or apps we'll need access to?

Format as a clean intake form with clear section headers, short answer fields, and multiple choice where appropriate. Tone: professional, warm, easy to fill out."`,
    },

    // ─── 4x4 Video Strategy ──────────────────────────────
    {
      title: "4x4 Method — Overview & Framework Reference",
      tag: "4x4 Method",
      prompt: `This is the content strategy framework hardcoded into every video we create for clients. Read this before using any other 4x4 prompt.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THE GOAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is not just a formula — it walks the viewer through five steps.
Curiosity → Recognition → Trust → Belief → Action.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BEFORE YOU SCRIPT: SET YOUR INTENTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Start with a STRONG topic — not a weak one.

Weak: "Why you need discipline"       → Generic. No one reacts.
Strong: "Why your low self-esteem is disguised as waiting for motivation" → Exposes a pattern. Everyone reacts.

A strong topic:
✓ Calls out a specific behaviour
✓ Challenges the viewer's identity
✓ Interrupts a delusion they're holding
✓ Makes the ideal client say "this is for ME"
✓ Nobody is confused about who it's speaking to

Define your psychological target before scripting:
— Who is this for?
— What identities does this confront in them?
— What pain or frustration am I bringing to light?
— What transformation am I offering?
— Why does this matter to them? Why does it matter to me to say it?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THE 4x4 STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 1 — HOOK (First 4 seconds)
The hook is an INTERRUPTION. The brain decides in 1–3 seconds: is this about me?
First two sentences must DISRUPT, ACCUSE, REVEAL, or EXPOSE.

Why two sentences?
→ Sentence 1 = pattern interruption (shock)
→ Sentence 2 = personal relevance (clarity)
Shock without clarity → they leave. Clarity without shock → they scroll. You need BOTH.

On-screen title + subtitle:
→ Title anchors the theme — does NOT repeat the hook
→ Subtitle adds context (include in caption)
Example: Hook: "You don't have a content problem — you have a courage problem."
Title on screen: "The Psychology of Inconsistent Creators"
Subtitle in caption: "How low self-esteem sabotages visibility"

STEP 2 — PROOF (External validation, early in the video)
Back up the hook immediately. Nobody cares until you prove it.
→ A stat or study
→ A testimonial or case study
→ Your own real personal results

STEP 3 — VALUE / PROBLEM (The mirror and the story)
People don't connect to information — they connect to mirrors.
Hold a mirror up to expose their patterns (not to shame — to make them aware).

Use a personal story. Stories do three things:
1. Build trust
2. Build emotional connection
3. Lower resistance

Teach from your scars, not just from theory.

Emotional triggers that work (NOT shame — pattern exposure):
→ Shame exposure: "You say you want wealth but avoid responsibility."
→ Hope: "You're closer than you think."
→ Identity challenge: "You don't lack a skill — you lack a belief system."
→ Fear of regret: "You're wasting your potential."
→ Aspiration/exposure: Showing what's possible through your lifestyle or results.

KEY RULE: Don't shame people. Expose their patterns. That is authority.

STEP 4 — CALL TO ACTION (Last 4 seconds)
End every video with a clear CTA. This boosts engagement and feeds the algorithm.
→ "Comment [WORD] and I'll DM you [RESOURCE]"
→ "Follow for [OUTCOME] content"
→ "Share this with someone who [SITUATION]"
→ "Book a free call — link in bio"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUICK REFERENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hook     → First 4 seconds  → Interrupt, expose, make it personal
Proof    → Right after hook → Stat / testimonial / personal results
Value    → Middle           → Mirror, story, pain points, takeaways
CTA      → Last 4 seconds   → Drive engagement, feed the algorithm`,
    },
    {
      title: "Strong Topic Generator — 20 Topics for Any Niche",
      tag: "4x4 Method",
      prompt: `Use this before scripting any video. Paste into ChatGPT to generate 20 strong, pattern-exposing topics that will stop the scroll for your client's ideal audience.

Paste this into ChatGPT:

"You are a viral content strategist trained in psychology-based video scripting. I need 20 STRONG video topics for [BUSINESS NAME / NICHE].

Business type: [e.g., life coach / med spa / personal trainer / restaurant / real estate agent]
Ideal client: [DESCRIBE — e.g., 'women 30–45 who want to lose weight but keep starting over' / 'small business owners who are invisible online']
Content goal: [e.g., get DMs / build trust / sell a service / grow followers / go viral]

STRONG topic criteria:
✓ Calls out a specific behaviour or pattern
✓ Challenges the viewer's identity
✓ Interrupts a delusion they're holding
✓ Speaks directly to the ideal client — no one else is confused
✓ Exposes something the viewer already knows but hasn't admitted

WEAK → STRONG examples:
❌ 'Why you need to work harder'
✓ 'The reason you call yourself 'disciplined' but your results say otherwise'

❌ 'How to get more clients'
✓ 'The type of clients you're attracting is a direct reflection of how much you charge yourself'

❌ 'Social media tips for small businesses'
✓ 'You're not posting consistently because deep down you don't believe your business is worth the attention'

For EACH of the 20 topics, give me:
1. The STRONG topic (specific, pattern-exposing, identity-confronting)
2. The WEAK version it replaces (what everyone else would say)
3. The identity it confronts in the viewer
4. The transformation it points to
5. Pain activation score 1–10 (how hard will this hit for the ideal client)

Sort by pain activation score, highest first. Do NOT make these generic. They should feel like they were written specifically for [BUSINESS TYPE] and their audience."`,
    },
    {
      title: "Hook Writer — First 4 Seconds + Title & Subtitle",
      tag: "4x4 Method",
      prompt: `Use this to write the opening hook for any video — plus the on-screen title and caption subtitle. The hook is everything. Get this wrong and no one watches. Get it right and they can't look away.

Paste this into ChatGPT:

"You are a viral content strategist trained in the 4x4 Method for psychology-based video content.

I need 10 hook variations for this video topic: [PASTE THE STRONG TOPIC]

Context:
Business type: [TYPE]
Ideal client: [DESCRIBE — be specific]
Tone of the video: [e.g., bold and confrontational / warm and vulnerable / educational / raw and honest]

Hook formula — two sentences only:
→ Sentence 1: Pattern interruption. This is the SHOCK. It disrupts, accuses, reveals, or exposes. The viewer's brain should say 'wait, what?'
→ Sentence 2: Personal relevance. This is the CLARITY. It tells them exactly who this is for. The viewer should say 'this is about me.'

Without both: they leave or scroll. With both: they're hooked.

Write 10 hook options. Each one should feel DIFFERENT in approach:
- 2 hooks that START with an accusation
- 2 hooks that START with a question
- 2 hooks that START with a statistic or bold claim
- 2 hooks that START with 'If you...'
- 2 hooks that are vulnerable and personal

For EACH hook, also write:
→ ON-SCREEN TITLE (3–7 words, anchors the theme of the video — does NOT repeat the hook)
→ SUBTITLE for caption (one punchy line that adds specificity or context)

Example of the format I want:
Hook: 'You don't have a content problem — you have a courage problem. And if you've been posting inconsistently, you already know what I'm talking about.'
Title: The Psychology of Inconsistent Creators
Subtitle: How low self-esteem sabotages visibility

After all 10 hooks, tell me which 3 you'd recommend and why."`,
    },
    {
      title: "Full 4x4 Script — Master Template (Any Business)",
      tag: "4x4 Method",
      prompt: `Use this to write a complete video script for any client using the full 4x4 Method. This is the master prompt — it applies to any niche, any platform.

Paste this into ChatGPT:

"You are a viral content strategist and scriptwriter trained in the 4x4 Method — a psychology-based nervous system sequencing approach to video content that guides viewers through: Curiosity → Recognition → Regulation → Belief → Action.

Write a complete short-form video script for [BUSINESS NAME].

Business type: [TYPE]
Ideal client: [DESCRIBE — be specific about who they are, what they want, what's stopping them]
Video topic (STRONG — not generic): [PASTE THE STRONG TOPIC]
Platform: [Instagram Reel / TikTok / Facebook Reel]
Target length: [30 / 45 / 60 seconds]
Tone: [bold and confrontational / warm and vulnerable / educational / raw and real]

Deliver the script in the exact 4x4 structure below:

━━ STEP 1: HOOK — First 4 seconds ━━
Two sentences maximum.
Sentence 1: Pattern interruption — shock, disrupt, accuse, reveal, or expose.
Sentence 2: Personal relevance — narrow to the exact viewer this is for.
The viewer must think 'this is about ME' or they scroll.

ON-SCREEN TEXT:
Title (anchors the theme — does not repeat the hook):
Subtitle (1 line, goes in the caption):

━━ STEP 2: PROOF — Right after the hook ━━
Immediately validate the hook with proof. This earns the right to be heard.
Use ONE of: a real statistic / a testimonial / personal results / a case study.
Keep it short — 1–3 sentences. The viewer is still deciding if they trust you.

━━ STEP 3: VALUE — The mirror and the story ━━
This is the body of the video. Hold a mirror up to expose their pattern without shaming them.

Use a story from real life (client story, personal experience, a scenario they'll recognize).
Stories build trust, build emotional connection, and lower resistance.
Teach from scars, not theory.

Then deliver the actual value — the insight, strategy, or truth that moves them.
Include at least ONE emotional trigger:
→ Shame exposure (expose the pattern, not the person)
→ Hope ('you're closer than you think')
→ Identity challenge ('you don't lack a skill — you lack a belief system')
→ Fear of regret ('you're wasting your potential')
→ Aspiration exposure (what's possible when they change)

━━ STEP 4: CALL TO ACTION — Last 4 seconds ━━
One clear action. Make it feel like the natural next step, not a sales pitch.
Options: Comment [WORD] / Follow for [OUTCOME] / Book a call / Share with someone who [SITUATION]

━━ AFTER THE SCRIPT ━━
Also give me:
1. The full CAPTION for this post (2–4 sentences + CTA + 5–8 hashtags)
2. 3 on-screen text overlays to show during the video (beyond the title — key phrases to flash on screen)
3. Audio direction (what vibe/style of background music fits this video)
4. One suggestion for what to show visually while talking (b-roll, environment, action shot)"`,
    },
    {
      title: "4x4 Script — Local Service Business",
      tag: "4x4 Method",
      prompt: `Use this to write a 4x4 video script specifically for local service businesses — salons, dentists, chiropractors, HVAC, plumbers, landscapers, gyms, med spas, restaurants, etc.

These clients aren't personal brands — but the 4x4 method still applies. The business owner becomes the face, and the content exposes patterns in how their customers behave.

Paste this into ChatGPT:

"You are a viral content strategist trained in the 4x4 Method. Write a complete short-form video script for a local [BUSINESS TYPE] called [BUSINESS NAME] located in [CITY].

Ideal customer: [DESCRIBE — e.g., 'homeowners 35–65 who keep ignoring their HVAC until it breaks' / 'women who want to feel confident but keep postponing self-care']
Video goal: [get more bookings / build local trust / get more DMs / go viral in the community]
Topic (STRONG — expose a pattern): [PASTE STRONG TOPIC — or ask AI to suggest one first]
Platform: [Instagram Reel / TikTok / Facebook Reel]
Length: [30 / 45 / 60 seconds]
Tone: [warm and local / bold and direct / educational]
Owner's name (if they'll be on camera): [NAME]

Use the full 4x4 structure:

HOOK (First 4 sec):
→ Sentence 1: Expose or interrupt — call out the behaviour their customers have
→ Sentence 2: Make it personal to their specific audience (locals who need this service)

Example hook for a dentist:
'You've been putting off that appointment for three years. Not because you can't afford it — because you're scared of what they'll find.'

PROOF:
→ A local stat, a before/after, a number of years in business, or a real customer result
→ Something that builds instant local credibility

VALUE (The mirror + story):
→ Expose the pattern the ideal customer has (e.g., DIY-ing something until it becomes a bigger problem / avoiding the dentist until the pain is unbearable)
→ Tell a real story: a customer who waited and what happened vs. one who acted early
→ Give them 1–3 actionable tips or the one truth they need to hear
→ Use an emotional trigger: hope, identity challenge, fear of regret, or aspiration

CTA (Last 4 sec):
→ 'Comment [WORD] and I'll DM you [our special offer]'
→ 'Book your appointment — link in bio'
→ 'Call us at [NUMBER]'
→ 'Tag someone who needs to hear this'

After the script:
1. Caption for the post (local, conversational, include city name, 5 hashtags — mix of local and niche)
2. On-screen text overlays (2–3 key phrases to flash on screen)
3. What visual to show while talking (clinic/shop interior, the service being performed, before/after, team at work)"`,
    },
    {
      title: "4x4 Script — Personal Brand / Coach / Creator",
      tag: "4x4 Method",
      prompt: `Use this for personal brand clients — coaches, consultants, course creators, thought leaders, or for building Mandy's own brand content. This is where the 4x4 method is most powerful — because the content IS the person.

Paste this into ChatGPT:

"You are a viral content strategist trained in the 4x4 Method — a psychology-based nervous system sequencing approach to video content.

Write a complete short-form video script for [NAME], a [THEIR IDENTITY — e.g., 'business coach for first-generation entrepreneurs' / 'social media strategist for women-owned small businesses' / 'life coach who teaches high-achievers to stop self-sabotaging'].

Ideal viewer: [DESCRIBE — be deeply specific: their age range, what they want, what's stopping them, what they secretly believe about themselves]
Topic (STRONG — must expose a pattern the ideal viewer has): [PASTE STRONG TOPIC]
Platform: [Instagram Reel / TikTok]
Length: [30 / 45 / 60 seconds]
Tone: [raw and real / bold and confrontational / warm and mentoring / vulnerable and honest]
Key personal story or credential to weave in: [e.g., 'I used to post from a shelter with $11 in my account' / 'I hit six figures before I dealt with my imposter syndrome']

The FULL 4x4 structure:

HOOK (First 4 sec):
→ Sentence 1: A bold pattern interrupt — accuse, expose, reveal something they know but haven't admitted. This is a confrontation, not a conversation.
→ Sentence 2: Personal relevance — narrow it to exactly who this is for. They should feel caught.

The hook should feel like [NAME] is talking directly to one specific person, not a crowd.

ON-SCREEN:
Title (anchors the video theme — does not repeat the hook):
Subtitle (in the caption — adds more context):

PROOF (Right after hook — earn the right to be heard):
→ Personal result, a transformation they went through, or a client's result
→ Something specific and real — not vague. Numbers, timelines, before/after.

VALUE (The mirror + story + emotional trigger):
→ Hold the mirror up. Expose the pattern — gently but honestly. Don't shame, expose.
→ Tell the real story: something from your own journey or a client's journey that the viewer will recognize themselves in
→ This is where you teach from your SCARS, not just your strategy
→ Choose and use one emotional trigger:
   • Shame exposure: call out the gap between what they say they want and what they do
   • Hope: show them the light — 'you are closer than you think'
   • Identity challenge: 'you don't lack a skill — you lack a belief system'
   • Fear of regret: 'you are wasting your potential and somewhere deep down you know it'
   • Aspiration/Exposure: show what's possible when someone makes the shift

CTA (Last 4 sec):
→ Be direct. One ask. Should feel like the natural next step from the video's transformation.
→ Options: 'Comment [WORD]' / 'Follow for more of this' / 'Share with someone who needs this' / 'DM me [WORD] and I'll send you [RESOURCE]'

After the script give me:
1. Caption (3–5 punchy lines, sounds like them talking, not marketing. CTA at the end. 5–8 hashtags.)
2. 3 on-screen text overlays (the phrases that need to LAND on screen visually)
3. The one piece of advice on how to DELIVER this video — what energy, what body language, what does their face need to say"`,
    },
    {
      title: "4x4 Script — E-Commerce / Product Brand",
      tag: "4x4 Method",
      prompt: `Use this for product-based brands — e-commerce, clothing, beauty, food, lifestyle products, etc. The 4x4 method works for product content by tying the product to an identity shift or emotional truth — not just showing the product.

Paste this into ChatGPT:

"You are a viral content strategist trained in the 4x4 Method. Write a short-form video script for [BRAND NAME], an e-commerce brand that sells [PRODUCT TYPE].

Ideal customer: [DESCRIBE — e.g., 'women 20–35 who want to feel premium and put-together but are on a budget' / 'men who care about their appearance but don't want to look like they're trying too hard']
Product being featured: [SPECIFIC PRODUCT]
Video goal: [drive sales / build brand identity / go viral / grow following]
Topic (STRONG — tie it to an identity or pattern, not just the product): [PASTE STRONG TOPIC or describe what the product represents emotionally]
Platform: [TikTok / Instagram Reel]
Length: [15 / 30 / 45 seconds]
Tone: [aspirational and luxury / fun and relatable / raw and honest / lifestyle-focused]

Important: Do NOT make this a product demo. Make it a MIRROR that the ideal customer holds up and sees themselves — with the product as the vehicle for their transformation.

THE FULL 4x4 STRUCTURE:

HOOK (First 4 sec):
→ Sentence 1: Expose the pattern or identity the viewer has around the type of person who uses this product
→ Sentence 2: Make it personal — tie it directly to who they are or who they want to be
→ Example for a luxury skin care brand: 'You keep buying cheap skincare and wondering why you don't feel like a priority. You already know what the real problem is.'

PROOF:
→ A before/after, a number (% of customers who see X result), a viral moment, a testimonial
→ Or a lifestyle exposure that makes the product feel aspirational and attainable at the same time

VALUE (The mirror + emotional trigger):
→ Connect the product to a transformation — not just a feature
→ Use ASPIRATION EXPOSURE: show what this product represents for someone who has the life they want
→ Or use IDENTITY CHALLENGE: 'you don't buy cheap because you can't afford better — you buy cheap because you don't think you deserve better'
→ Tell a short real story: a customer's experience, or your own relationship to the product

CTA (Last 4 sec):
→ 'Shop now — link in bio'
→ 'Comment [WORD] and I'll DM you a discount code'
→ 'Tag someone who needs this'
→ 'Follow — we drop new [PRODUCT] every [DAY]'

After the script:
1. Caption (2–3 lines, sounds human, includes CTA, 5–8 hashtags — niche + product-specific)
2. Visual direction: what to show on screen? Product close-up, lifestyle shot, unboxing, before/after, luxury styling?
3. On-screen text overlays (2–3 phrases that land visually)
4. Hook-to-product ratio advice: how much time showing product vs. talking to the viewer?"`,
    },
    {
      title: "Emotional Trigger Map — Choose the Right One",
      tag: "4x4 Method",
      prompt: `Use this before scripting any video to identify WHICH emotional trigger will work best for your client's specific audience. Different triggers work for different people. Choose the wrong one and the content falls flat. Choose the right one and it goes viral.

Paste this into ChatGPT:

"You are a content psychologist and viral video strategist. I need you to identify the best emotional triggers to use in a video for [BUSINESS NAME / CREATOR NAME].

Their ideal viewer: [DESCRIBE in detail — age, situation, what they want, what's stopping them, what they secretly believe]
Video topic: [PASTE THE STRONG TOPIC]
Tone: [bold / warm / vulnerable / educational]

Here are the 6 core emotional triggers used in viral video content:

1. SHAME EXPOSURE — Expose the gap between what they say and what they do. Not to shame them — to help them see their own pattern. Example: 'You say you want wealth but you avoid every conversation about money.'

2. HOPE — You are closer than you think. This activates people who are tired and about to give up. Example: 'Most people quit 3 feet from the gold.'

3. IDENTITY CHALLENGE — Challenge who they believe they are. Example: 'You don't lack a skill — you lack a belief system.' This is powerful for high-achievers in a rut.

4. FEAR OF REGRET — Activate the fear that they are wasting their potential, their time, or their chance. Example: 'The version of you that started five years ago would be disappointed in where you are standing right now.'

5. ASPIRATION / EXPOSURE — Show what is possible. Expose the life or result that's available to them. This is powerful with lifestyle content — showing the house, the body, the business, the freedom — and letting them feel the gap between where they are and where they could be.

6. BELONGING / RECOGNITION — Make them feel seen and understood in a way that nobody else has. They feel 'finally someone who gets it.' This is powerful for communities and niche audiences.

Based on the ideal viewer I described:
1. Rank all 6 triggers from most effective to least effective for THIS audience and explain why
2. Give me an example of how each of the top 3 triggers would sound as a HOOK sentence for this specific video topic
3. Tell me which one trigger you would bet on for this video and why
4. Warn me about any trigger that could backfire or feel manipulative with this particular audience

After your analysis, use the #1 trigger to write 3 hook options for this video."`,
    },
    {
      title: "Story-to-Script Converter — Turn Any Story Into a 4x4 Video",
      tag: "4x4 Method",
      prompt: `The most powerful content comes from real stories. Use this to turn ANY personal story — yours or a client's — into a complete 4x4 video script. Stories lower resistance, build trust, and make content that people save and share.

Paste this into ChatGPT:

"You are a viral content strategist trained in the 4x4 Method. I need you to turn a real story into a complete short-form video script.

THE STORY:
[Paste the real story here — it doesn't have to be perfect or polished. Write it raw. Include: the situation, the emotional low point, what changed, and the result or lesson. The messier and more honest, the better material it gives us.]

Example of the kind of detail that makes great content:
'I was posting three times a day from a homeless shelter. I had $11 in my bank account. Every time I looked at my phone and saw zero comments, I wanted to quit. But I kept posting because I had nothing else. Three months later those videos brought in my first $5,000 client.'

Context:
Creator / Business: [NAME]
Ideal viewer: [DESCRIBE — who needs to hear this story to feel less alone?]
Platform: [Instagram Reel / TikTok]
Length: [30 / 45 / 60 seconds]
Tone: [vulnerable and raw / hopeful / direct]

WHAT I NEED YOU TO DO:

1. FIND THE HOOK
What is the single most pattern-interrupting line in this story?
Write Sentence 1 (the shock / the exposure) and Sentence 2 (who this is for).
The hook should make the ideal viewer think 'this is about ME.'

2. FIND THE PROOF
What part of this story provides the external validation that makes the hook believable?
Pull it out and sharpen it (make any numbers or timelines specific).

3. FIND THE MIRROR
What pattern in the viewer's life does this story expose?
Write the transition from the story into the VALUE — the universal truth that the viewer can apply to themselves.

4. WRITE THE CTA
Based on where the video ends emotionally — what is the most natural next step to ask them to take?

Then write the FULL COMPLETE SCRIPT with all 4 sections labeled and timed.

Also give me:
— The on-screen TITLE and SUBTITLE
— The full CAPTION (3–4 lines + CTA + hashtags)
— One note on how to DELIVER this video — what energy, pacing, or emotion to bring"`,
    },
    {
      title: "30-Day 4x4 Content Calendar — Monthly Video Plan",
      tag: "4x4 Method",
      prompt: `Use this to plan a full month of short-form video content for any client using the 4x4 Method. Every video in the calendar follows the psychology-based structure — strong topics, pattern-exposing hooks, emotional triggers, and clear CTAs.

Paste this into ChatGPT:

"You are a viral content strategist trained in the 4x4 Method. Build a 30-day short-form video content calendar for [BUSINESS NAME / CREATOR NAME].

Business type / niche: [TYPE]
Ideal viewer: [DESCRIBE specifically]
Primary platform: [Instagram Reels / TikTok / both]
Posting frequency: [3x per week / 5x per week / daily]
Content goals this month: [e.g., grow following / get DMs / drive bookings / sell a product / build authority]
Any upcoming promotions or events: [LIST — or write 'none']
Tone of the account: [bold / warm and educational / raw and personal / luxury lifestyle]

Create a 30-day calendar where each video entry includes:

▸ Date / Day #
▸ Strong Topic (specific, pattern-exposing — NOT generic)
▸ Hook (2 sentences: pattern interrupt + personal relevance)
▸ On-Screen Title
▸ Caption Subtitle
▸ Emotional Trigger Used (shame exposure / hope / identity challenge / fear of regret / aspiration)
▸ Proof Element (what to use as validation — stat, testimonial, personal result)
▸ CTA for this video

Organize the 30 days with intentional variation:
— Week 1: Establish authority (educational + credibility content)
— Week 2: Build emotional connection (story-based + vulnerable content)
— Week 3: Handle objections + build desire (identity challenge content)
— Week 4: Drive action (aspiration + direct CTA content)

At the end, give me:
1. The 3 videos from this calendar you think have the highest viral potential — and why
2. The 3 videos most likely to drive DMs or bookings — and why
3. One piece of advice on how to batch-film all 30 of these efficiently"`,
    },
    {
      title: "Caption + CTA Writer — 4x4 Aligned",
      tag: "4x4 Method",
      prompt: `The caption is the second hook. After someone watches the video — the caption either deepens their connection or loses them. Use this to write a 4x4-aligned caption and CTA for any video.

Paste this into ChatGPT:

"You are a social media copywriter trained in the 4x4 Method for psychology-based content.

Write the full caption + CTA package for this video:

Video topic: [PASTE THE STRONG TOPIC]
Hook used in the video: [PASTE THE TWO-SENTENCE HOOK]
On-screen title: [PASTE]
Subtitle (to go in caption): [PASTE]
Business / Creator: [NAME and TYPE]
Platform: [Instagram / TikTok / Facebook]
Primary CTA for this video: [e.g., comment / DM / follow / book / share]
Emotional trigger used in the video: [which one?]

Write the caption in 3 parts:

PART 1 — SUBTITLE LINE (first line of caption, appears before 'more' cutoff)
This is ONE line that deepens the hook without repeating it.
It should feel like a direct extension — the viewer reads it right after the video ends and it lands harder.
Examples:
'How low self-esteem sabotages visibility.'
'The pattern you keep calling strategy.'
'Your consistency problem is not a schedule problem.'

PART 2 — CAPTION BODY (3–5 lines max)
Conversational. No fluff. No generic motivational filler.
Continue the pattern exposure from the video — give them one more thing to sit with.
Should feel like a continuation of the conversation, not a sales pitch.
Include ONE specific line they'll want to screenshot or save.

PART 3 — CALL TO ACTION
One clear ask. Direct and natural — not desperate.
Match the CTA to the emotional state the video left them in.
Options:
→ 'Comment [WORD] and I'll DM you [SPECIFIC RESOURCE]'
→ 'Follow for more content like this'
→ 'Share this with someone who needs to hear it'
→ 'Book a free call — link in bio'
→ 'Tag someone who's been saying this about themselves'

HASHTAGS:
Give me 8 hashtags — a mix of:
- 2 large popular tags (1M+ posts)
- 3 medium niche tags (100K–1M posts)
- 3 small specific tags (under 100K — high signal for the right audience)

After everything — give me one note on WHY this caption works for this specific audience and video topic."`,
    },
  ];

  const GROUPS = [
    { label: "Platform AI", icon: "🤖", tags: ["Platform AI"] },
    { label: "4x4 Video Strategy", icon: "🧠", tags: ["4x4 Method"] },
    { label: "Content Creation", icon: "✍️", tags: ["Captions", "Video", "Stories", "Planning"] },
    { label: "Content Sizes", icon: "📐", tags: ["Sizes"] },
    { label: "Ads & Email", icon: "📣", tags: ["Ads", "Email"] },
    { label: "Strategy & Reporting", icon: "📊", tags: ["Strategy", "Reporting", "Onboarding"] },
    { label: "AI Video", icon: "🎬", tags: ["AI Video"] },
    { label: "Platform Automations", icon: "⚡", tags: ["Automations"] },
    { label: "Outreach Scripts", icon: "📤", tags: ["Outreach"] },
    { label: "Lead Generation", icon: "🎯", tags: ["Lead Gen"] },
    { label: "Proposals & Contracts", icon: "📄", tags: ["Proposals", "Contracts"] },
    { label: "Sales", icon: "💼", tags: ["Sales"] },
    { label: "SEO & Blogging", icon: "🌐", tags: ["Blogging", "GEO"] },
  ];

  const q = search.toLowerCase().trim();

  // Pool of prompts after category filter
  const catPrompts = activeCategory
    ? prompts.filter(p => { const g = GROUPS.find(g => g.label === activeCategory); return g ? g.tags.includes(p.tag) : true; })
    : prompts;

  // Further filter by search
  const searchFiltered = q
    ? catPrompts.filter(p => p.title.toLowerCase().includes(q) || p.tag.toLowerCase().includes(q) || p.prompt.toLowerCase().includes(q))
    : null;

  // Groups to render in browse mode
  const visibleGroups = activeCategory ? GROUPS.filter(g => g.label === activeCategory) : GROUPS;

  return (
    <div className="space-y-5">
      <SectionHeader label="Prompt Library" title="Copy. Paste. Fill in the blanks. Done." sub="Every prompt you need to create client work. Swap out the bracketed parts with client details. Never write from scratch." />

      {/* Category nav */}
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-2 min-w-max">
          <button
            onClick={() => setActiveCategory(null)}
            className="px-4 py-2 rounded-xl text-[10px] tracking-wider uppercase transition-all"
            style={{ fontFamily: FONT_LUXE, background: !activeCategory ? "var(--ink)" : "rgba(255,255,255,0.65)", color: !activeCategory ? "var(--gold)" : "rgba(30,15,10,0.5)", border: !activeCategory ? "1px solid var(--ink)" : "1px solid rgba(200,168,100,0.2)" }}
          >
            All Prompts
          </button>
          {GROUPS.map(g => {
            const count = prompts.filter(p => g.tags.includes(p.tag)).length;
            const active = activeCategory === g.label;
            return (
              <button
                key={g.label}
                onClick={() => { setActiveCategory(active ? null : g.label); setSearch(""); }}
                className="px-4 py-2 rounded-xl text-[10px] tracking-wider uppercase transition-all whitespace-nowrap flex items-center gap-1.5"
                style={{ fontFamily: FONT_LUXE, background: active ? "var(--ink)" : "rgba(255,255,255,0.65)", color: active ? "var(--gold)" : "rgba(30,15,10,0.5)", border: active ? "1px solid var(--ink)" : "1px solid rgba(200,168,100,0.2)" }}
              >
                <span>{g.icon}</span>
                <span>{g.label}</span>
                <span className="opacity-50">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder={activeCategory ? `Search in ${activeCategory}...` : "Search all prompts by title, tag, or keyword..."}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-xl px-5 py-3 focus:outline-none text-sm"
          style={{ fontFamily: FONT_BODY, color: "var(--ink)", background: "rgba(255,255,255,0.88)", border: "1px solid rgba(200,168,100,0.3)", paddingLeft: "2.75rem" }}
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ fontSize: "0.95rem", opacity: 0.45 }}>🔍</span>
        {search && (
          <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-60 transition-opacity" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(30,15,10,0.4)" }}>Clear</button>
        )}
      </div>

      {searchFiltered ? (
        <div>
          <p className="mb-4" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(30,15,10,0.4)" }}>
            {searchFiltered.length} result{searchFiltered.length !== 1 ? "s" : ""}{activeCategory ? ` in ${activeCategory}` : ""} for &ldquo;{search}&rdquo;
          </p>
          {searchFiltered.length === 0 ? (
            <div className="text-center py-14 rounded-2xl" style={{ background: "rgba(255,255,255,0.5)", border: "1px dashed rgba(200,168,100,0.3)" }}>
              <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "rgba(30,15,10,0.35)", fontStyle: "italic" }}>No prompts found.</p>
              <p className="mt-1" style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(30,15,10,0.3)" }}>Try a different keyword or clear the search.</p>
            </div>
          ) : (
            <div className="space-y-4">{searchFiltered.map(p => <PromptCard key={p.title} {...p} />)}</div>
          )}
        </div>
      ) : (
        <div className="space-y-12">
          {visibleGroups.map(g => {
            const gp = prompts.filter(p => g.tags.includes(p.tag));
            if (!gp.length) return null;
            return (
              <div key={g.label}>
                <div className="flex items-center gap-3 mb-5 pb-3" style={{ borderBottom: "1px solid rgba(200,168,100,0.2)" }}>
                  <span style={{ fontSize: "1.2rem" }}>{g.icon}</span>
                  <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--rose)", fontWeight: 400 }}>{g.label}</h3>
                  <span className="px-2 py-0.5 rounded-full" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.12em", background: "rgba(200,168,100,0.12)", color: "var(--gold)" }}>{gp.length} prompt{gp.length !== 1 ? "s" : ""}</span>
                </div>
                <div className="space-y-4">
                  {gp.map(p => <PromptCard key={p.title} {...p} />)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Service Tiers ───────────────────────────────────── */
function ServiceTiers() {
  const tiers = [
    {
      label: "Starter",
      price: "$1,000/mo",
      setup: "$500 one-time setup",
      tag: "Start here",
      tagColor: "var(--gold)",
      items: [
        "1 platform fully managed — nothing to post, nothing to schedule",
        "AI clone or custom brand character — content that sounds like you, without filming",
        "Reels, carousels & static posts — 3x per week (12 posts/mo)",
        "Comment keyword triggers — auto-DM lead magnet when they comment a word",
        "DM automation — every inquiry gets an instant reply that guides them to book or buy",
        "Online booking system — clients book directly from the page",
        "Lead funnels & automations that turn followers into booked appointments",
        "Missed call text back — auto-texts anyone who calls and doesn't get answered",
      ],
      note: "Best starting point. Gets the client online, consistent, and converting. Build trust here, then upgrade.",
    },
    {
      label: "Growth",
      price: "$2,500/mo",
      setup: "$500 one-time setup",
      tag: "Most popular",
      tagColor: "var(--rose)",
      items: [
        "Everything in Starter — AI clone content now running across 3 platforms: Instagram, TikTok & Facebook",
        "Paid ads — Facebook & Instagram ad management included",
        "Email & SMS automations that follow up with every lead while you sleep",
        "Automated appointment reminders — reduce no-shows before they happen",
        "Reputation & review management — 5-star presence built on autopilot",
        "More content, more reach — 3–5x per week (up to 20 posts/mo)",
        "Monthly strategy call to double down on what's working",
      ],
      note: "Best for clients who want to scale. The ads + AI clone content combo is what drives real consistent inbound.",
    },
    {
      label: "Elite",
      price: "$5,000+/mo",
      setup: "$500 one-time setup",
      tag: "Full system",
      tagColor: "#4a7a4a",
      items: [
        "Everything in Growth — expanded to 5 platforms: Instagram, TikTok, Facebook, LinkedIn & Threads",
        "AI voice agent — answers calls, handles inquiries & books appointments 24/7",
        "Full AI booking system — chat, reminders, follow-up & review collection automated",
        "AI website design & build — a complete conversion-ready site done for you",
        "Google, Facebook, Instagram & TikTok ad management — all platforms, fully managed",
        "Daily content — 5–7x per week (up to 28 posts/mo) across every platform",
        "Monthly email newsletter — written, designed & sent for you",
        "Bi-weekly strategy calls & weekly performance reports",
      ],
      note: "For high-LTV clients who want their entire online presence fully managed. Goal: 5 Elite clients = $25,000+/mo.",
    },
  ];

  return (
    <div className="space-y-5 mb-10">
      <div>
        <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Service Packages</p>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "var(--rose)", fontWeight: 400, lineHeight: 1.1 }}>What We Offer</h2>
        <p className="mt-2" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: "rgba(30,15,10,0.55)" }}>Three plans — same as the main website. Every plan starts at $1,000/mo and includes the AI clone. All plans have a $500 one-time setup fee. Use the 14-day free trial to close clients who are on the fence.</p>
      </div>

      {/* Free Trial Banner */}
      <div className="rounded-2xl p-5 flex items-start gap-4" style={{ background: "linear-gradient(135deg, var(--ink) 0%, #2a1a10 100%)", border: "1px solid rgba(200,168,100,0.3)" }}>
        <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>🎁</span>
        <div>
          <p style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "4px" }}>Lead Closer</p>
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.2rem", color: "var(--cream)", fontWeight: 400 }}>14-Day Free Trial — available on any plan</p>
          <p className="mt-1" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(250,243,234,0.65)", lineHeight: 1.65 }}>
            When someone is unsure, offer the 14-day free trial. Full service, no monthly commitment yet. The $500 setup fee is still paid upfront — this protects our time and shows they're serious. After 14 days they move to the monthly plan automatically.
          </p>
        </div>
      </div>

      {tiers.map((t) => (
        <div key={t.label} className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
          <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3" style={{ borderBottom: "1px solid rgba(200,168,100,0.15)", background: "rgba(200,168,100,0.06)" }}>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: t.tagColor, color: "#fff" }}>{t.tag}</span>
              <span style={{ fontFamily: FONT_DISPLAY, fontSize: "1.15rem", color: "var(--ink)" }}>{t.label}</span>
            </div>
            <div className="text-right">
              <span className="italic block" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "var(--gold)" }}>{t.price}</span>
              <span style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(30,15,10,0.4)" }}>{t.setup}</span>
            </div>
          </div>
          <div className="px-6 py-5">
            <ul className="space-y-2 mb-4">
              {t.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" style={{ width: "12px", height: "12px", color: "var(--gold)" }}><path d="M2.5 8.5L6 12L13.5 4.5" /></svg>
                  <span style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.8)" }}>{item}</span>
                </li>
              ))}
            </ul>
            <p className="italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "0.95rem", color: "rgba(30,15,10,0.5)" }}>{t.note}</p>
          </div>
        </div>
      ))}

      <div className="rounded-2xl p-5" style={{ background: "var(--ink)" }}>
        <p className="text-[10px] tracking-widest uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Upgrade Path</p>
        <p style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(250,243,234,0.75)", lineHeight: 1.7 }}>
          Start most clients on Starter. Once they see real results — usually 30–60 days — bring up Growth or Elite. Never push an upgrade before they've seen the win. The AI clone and content system sells itself once it's running.
        </p>
      </div>
    </div>
  );
}

/* ─── Script Card ─────────────────────────────────────── */
type SLine = { type: "send" | "if_say" | "you_say" | "note" | "subhead" | "warn"; label?: string; text: string };
function ScriptCard({ step, title, tag, lines }: { step?: string; title: string; tag?: string; lines: SLine[] }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
      <div className="px-6 py-4 flex items-center gap-3 flex-wrap" style={{ borderBottom: "1px solid rgba(200,168,100,0.12)", background: "rgba(200,168,100,0.06)" }}>
        {step && <span className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase shrink-0" style={{ fontFamily: FONT_LUXE, background: "var(--ink)", color: "var(--gold)" }}>{step}</span>}
        {tag && <span className="px-2 py-0.5 rounded-full text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "rgba(200,168,100,0.18)", color: "#9a7a3a" }}>{tag}</span>}
        <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.2rem", color: "var(--ink)" }}>{title}</h3>
      </div>
      <div className="px-6 py-5 space-y-3">
        {lines.map((l, i) => {
          if (l.type === "send") return (
            <div key={i} className="rounded-xl p-5" style={{ background: "var(--ink)" }}>
              <p className="mb-2.5" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>{l.label ?? "Send this"}</p>
              <p className="whitespace-pre-line leading-relaxed" style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: "var(--cream)", fontStyle: "italic" }}>{l.text}</p>
            </div>
          );
          if (l.type === "if_say") return (
            <div key={i} className="flex items-baseline gap-2 pt-1 flex-wrap">
              <span className="shrink-0" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--rose)" }}>If they say:</span>
              <span style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.6)", fontStyle: "italic" }}>"{l.text}"</span>
            </div>
          );
          if (l.type === "you_say") return (
            <div key={i} className="rounded-xl p-4 ml-4" style={{ background: "rgba(200,168,100,0.08)", border: "1px solid rgba(200,168,100,0.2)" }}>
              <p className="mb-2" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>You say</p>
              <p className="whitespace-pre-line leading-relaxed" style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: "var(--ink)", fontStyle: "italic" }}>{l.text}</p>
            </div>
          );
          if (l.type === "note") return (
            <p key={i} style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(30,15,10,0.5)", lineHeight: 1.7 }}>{l.text}</p>
          );
          if (l.type === "subhead") return (
            <p key={i} style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", borderTop: "1px solid rgba(200,168,100,0.18)", paddingTop: "12px", marginTop: "8px" }}>{l.text}</p>
          );
          if (l.type === "warn") return (
            <div key={i} className="rounded-xl p-4" style={{ background: "rgba(201,122,122,0.07)", border: "1px solid rgba(201,122,122,0.2)" }}>
              <p style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(150,40,40,0.85)", lineHeight: 1.65 }}>{l.text}</p>
            </div>
          );
          return null;
        })}
      </div>
    </div>
  );
}

/* ─── Tab: Outreach ───────────────────────────────────── */
function OutreachTab() {
  const [section, setSection] = useState<"blueprint"|"aipitch"|"cold"|"salescall"|"objections"|"referral">("blueprint");
  const _scripts = [
    {
      title: "Cold Email — Local Business",
      tag: "Email",
      prompt: `Subject: quick question about [BUSINESS NAME]'s social

Hi [FIRST NAME],

I was looking at [BUSINESS NAME] online and noticed you're doing [SOMETHING POSITIVE — e.g., "great work in the [industry] space"] — but your social media presence doesn't seem to match the quality of what you actually offer.

I run The Dollhouse Brand Studio. We handle done-for-you social media for small businesses — content creation, posting, ads, all of it — so you don't have to think about it.

I'd love to put together a quick look at what we'd do for you specifically. No pitch deck, no pressure — just a 15-minute call to see if it's even a fit.

Would [DAY] or [DAY] this week work for you?

— Mandy
The Dollhouse Brand Studio
shopdollhouse.co`,
    },
    {
      title: "Cold Email — E-Commerce Brand",
      tag: "Email",
      prompt: `Subject: your content could be converting more

Hi [FIRST NAME],

I came across [BRAND NAME] and love what you're selling — but I noticed your social content isn't doing the heavy lifting it could be for a brand at your level.

At The Dollhouse Brand Studio, we specialize in social media and paid ads for product-based businesses. We've helped brands go from inconsistent posting to a full content engine running every day — without the owner touching it.

If you're open to it, I'd love to share what that could look like for [BRAND NAME] specifically. 15 minutes, no obligation.

Here's my calendar: [LINK]

— Mandy Fortune
The Dollhouse Brand Studio`,
    },
    {
      title: "Cold DM — Instagram",
      tag: "DM",
      prompt: `Hey [NAME] 👋

Love what you're doing with [BUSINESS NAME] — [specific genuine compliment about their product/service/brand].

Quick question: are you handling your own social content right now, or do you have someone helping you?

I run a done-for-you social media studio and I had a couple ideas for your page that I think could really perform. Happy to share them — no strings attached.`,
    },
    {
      title: "DM Follow-Up (No Response After 3 Days)",
      tag: "DM",
      prompt: `Hey [NAME] — just wanted to bump this up in case it got buried!

No worries if now isn't the right time. I just genuinely think there's an opportunity here for [BUSINESS NAME] and wanted to make sure you saw it.

If you're curious, I'm happy to do a free quick audit of your current social media and share what I'd change. Totally free, no pitch.

Just reply "audit" and I'll get it to you. 🙂`,
    },
    {
      title: "Cold Call Script",
      tag: "Phone",
      prompt: `[WHEN THEY PICK UP]

"Hi, is this [NAME]? Hey — this is Mandy calling from The Dollhouse Brand Studio. I know this is a bit out of the blue — do you have like 90 seconds?"

[IF YES]

"Perfect. So I was doing some research on [INDUSTRY] businesses in [AREA / NICHE] and came across [BUSINESS NAME]. You're doing [GENUINE COMPLIMENT].

I reach out to businesses like yours specifically because a lot of times the social media side doesn't match the quality of what they're actually doing — and that's leaving money on the table.

We handle everything for you — content, posting, ads — so you can focus on running the business.

Is that something that's on your radar at all, or are you already handled on that front?"

[IF INTERESTED]
"Awesome. I'd love to set up a quick 15-minute call — I can show you exactly what I'd do for your business specifically. What does your schedule look like this week?"

[IF NOT INTERESTED]
"Totally fair. Can I ask — is it a timing thing or is social media just not a priority right now?" [LISTEN — often opens a door]

[IF GOES TO VOICEMAIL]
"Hey [NAME], this is Mandy from The Dollhouse Brand Studio. I had a few ideas specifically for [BUSINESS NAME]'s social media that I think you'd find valuable. I'll send you a quick email too — talk soon."`,
    },
    {
      title: "Follow-Up Email Sequence (After No Response)",
      tag: "Email",
      prompt: `--- EMAIL 2 (3 days after first email) ---

Subject: Re: quick question about [BUSINESS NAME]'s social

Hi [NAME],

Just bumping this up — I know inboxes get busy.

I actually put together a few quick ideas for [BUSINESS NAME] based on what I can see from your current pages. Happy to send them over — no strings, just genuine ideas.

Worth a 15-minute call?

— Mandy

---

EMAIL 3 (5 days after email 2) ---

Subject: last one from me

Hi [NAME],

I don't want to be that person who emails five times — so this is my last one.

If now isn't the right time for [BUSINESS NAME], I completely understand. But if things change and social media / content becomes something you want handled, I'd love to be the first call you make.

Wishing you a great [MONTH] regardless.

— Mandy
The Dollhouse Brand Studio
shopdollhouse.co`,
    },
    {
      title: "Full Service Pitch — What to Say on a Discovery Call",
      tag: "Sales",
      prompt: `Use this as your talking track when a prospect is on the phone or on a call. Customize to their business.

---

"So here's exactly what working with us looks like:

First, we handle all your content — we create the graphics, write every caption, add the hashtags. You don't touch any of it.

Then we schedule everything directly to your Instagram, Facebook, [TikTok / Google Business / wherever they're active]. One month of posts, fully planned and queued up. Done.

But here's the part most social media agencies don't offer: we also set up an automation so that any time someone comments on one of your posts, they automatically get a DM from your account within seconds. So instead of those comments just sitting there, we're turning them into conversations — and conversations into booked appointments.

And every month we send you a report so you can see exactly what's working — reach, engagement, what content your audience loved — so we keep getting smarter about your strategy.

All of this, done for you, every single month.

We charge $[PRICE]/month. There are no long-term contracts — if we're not delivering, you can walk away. But what I can tell you is that the businesses we work with stay because they see it working.

Does that sound like something that would take a load off your plate?"

Pricing — start high, work down only if needed:
- Starter: $1,000/mo + $500 one-time setup (1 platform, AI clone, automations)
- Growth: $2,500/mo + $500 one-time setup (3 platforms, ads, email/SMS automations)
- Elite: $5,000+/mo + $500 one-time setup (5 platforms, AI voice agent, full system)

If they hesitate on price: "We do offer a 14-day free trial. The $500 setup still applies so we can build everything out — but the first two weeks are on us so you can see the results before committing."`,
    },
    {
      title: "Referral Ask (Existing Client)",
      tag: "Retention",
      prompt: `Hey [CLIENT NAME],

Loving working with you on [BUSINESS NAME] — seeing [SPECIFIC WIN, e.g., "that reach spike last month"] was a great moment.

Quick ask: if you know any other business owners who are struggling with their social media or just don't have time for it, I'd love an introduction. I'm selectively taking on a few new clients this month and a referral from you carries a lot of weight.

If you send someone my way who signs, I'll give you [INCENTIVE — e.g., "a free month of reporting" or "$50 credit on your next invoice"].

No pressure at all — just thought I'd ask. 😊

Thanks again for trusting me with [BUSINESS NAME].

— Mandy`,
    },
  ];

  const sections: { id: typeof section; label: string; icon: string; sub: string }[] = [
    { id: "blueprint",  icon: "🗺️",  label: "The Blueprint",      sub: "Strategy, mindset, the numbers game" },
    { id: "aipitch",   icon: "🤖",  label: "AI Clone Pitch",      sub: "Our lead strategy — start here" },
    { id: "cold",      icon: "📨",  label: "Cold Outreach",       sub: "DM, email, and call scripts" },
    { id: "salescall", icon: "📞",  label: "The Sales Call",      sub: "CLOSER, discovery call, pitch deck" },
    { id: "objections",icon: "🛡️",  label: "Objections & Close",  sub: "Handle pushback and close the deal" },
    { id: "referral",  icon: "🤝",  label: "Referrals",           sub: "Turn clients into your best leads" },
  ];

  return (
    <div className="space-y-6">
      <ServiceTiers />
      <SectionHeader label="Outreach Scripts" title="How to get clients." sub="Follow these steps in order. Each section is its own guide. Start with the Blueprint, lead with the AI Clone, and work your way through from there." />

      {/* Sub-navigation */}
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-2 min-w-max">
          {sections.map(s => {
            const active = section === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className="flex flex-col items-start px-4 py-3 rounded-2xl transition-all text-left"
                style={{ background: active ? "var(--ink)" : "rgba(255,255,255,0.65)", border: active ? "1px solid var(--ink)" : "1px solid rgba(200,168,100,0.2)", minWidth: "140px" }}
              >
                <span style={{ fontSize: "1.1rem", lineHeight: 1, marginBottom: "4px" }}>{s.icon}</span>
                <span style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: active ? "var(--gold)" : "var(--ink)", fontWeight: 500 }}>{s.label}</span>
                <span style={{ fontFamily: FONT_BODY, fontSize: "0.68rem", color: active ? "rgba(250,243,234,0.5)" : "rgba(30,15,10,0.38)", marginTop: "2px", lineHeight: 1.3 }}>{s.sub}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Blueprint ─────────────────────────────────── */}
      {section === "blueprint" && <>
      <SectionHeader label="Step 0 — Before You Start" title="The Blueprint." sub="Know the numbers and the mindset before you send a single message." />
      {/* Numbers Game */}
      <div className="rounded-2xl p-6" style={{ background: "var(--ink)" }}>
        <p className="text-[10px] tracking-widest uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>The Blueprint — It's a Numbers Game</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {[
            { num: "400", label: "Potential clients to reach" },
            { num: "4×", label: "Follow-ups per contact" },
            { num: "20", label: "Conversations you'll have" },
            { num: "2", label: "Will become paying clients" },
          ].map(({ num, label }) => (
            <div key={num} className="rounded-xl p-4 text-center" style={{ background: "rgba(200,168,100,0.12)", border: "1px solid rgba(200,168,100,0.2)" }}>
              <p className="italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "2rem", color: "var(--gold)", lineHeight: 1 }}>{num}</p>
              <p className="mt-1" style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "rgba(250,243,234,0.6)" }}>{label}</p>
            </div>
          ))}
        </div>
        <p className="mt-4" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(250,243,234,0.5)" }}>
          Don't overthink it. Even if most businesses don't respond — it's okay. There are a lot of businesses. Volume beats hesitation every time. Use DMs and emails so you can do it fast.
        </p>
      </div>

      </>}

      {/* ── Sales Call ─────────────────────────────────── */}
      {section === "salescall" && <>
      <SectionHeader label="Step 4 — The Sales Call" title="Run the call like a pro." sub="Use the CLOSER method to guide every call. Present your proposal, then ask for the close. In that order, every time." />
      {/* CLOSER Framework */}
      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <p className="text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Sales Call Framework</p>
        <h3 className="mb-5" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: "var(--rose)" }}>The CLOSER Method</h3>
        <div className="space-y-4">
          {[
            { letter: "C", word: "Clarify the Pain", body: `Ask: "What's your biggest problem right now? Missed calls? No-shows? Not enough leads?" Get them talking. The more they share, the better you can tailor what you say.` },
            { letter: "L", word: "Label Them as a Fit", body: `Show them you were listening. Repeat their pain back to them: "So if I'm hearing you right, the main issue is missed calls and you're losing jobs because of it?"` },
            { letter: "O", word: "Outline Your Solution", body: `Connect the dots to what you offer: "That's exactly why we set up a missed-call text-back system. Every time a call is missed, the customer gets a text instantly — you never lose a lead again."` },
            { letter: "S", word: "Share a Case Study", body: `Back it up with a real result. Even one example works: "We set this up for another [NICHE] business and they booked [X] new clients in the first month."` },
            { letter: "E", word: "Explain the Offer", body: `Show them the 3 pricing tiers. Always start with the highest tier first — it anchors the value. Only go down if needed. Never open with the cheapest option.` },
            { letter: "R", word: "Request the Sale", body: `Don't leave the call open. Ask directly: "Do you want to get started today?" Then stop talking. Let them answer. Silence is not yours to fill.` },
          ].map(({ letter, word, body }) => (
            <div key={letter} className="flex gap-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ background: "var(--ink)" }}>
                <span className="italic font-bold" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: "var(--gold)" }}>{letter}</span>
              </div>
              <div>
                <p className="font-medium" style={{ fontFamily: FONT_LUXE, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)" }}>{word}</p>
                <p className="mt-0.5 leading-relaxed" style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.65)" }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 p-4 rounded-xl" style={{ background: "rgba(200,168,100,0.1)", border: "1px solid rgba(200,168,100,0.2)" }}>
          <p className="italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: "var(--ink)" }}>On every call: focus on learning about their business. Understand what they need. Help them see the solution. You're a consultant, not a salesperson.</p>
        </div>
      </div>

      {/* Pricing Spectrum */}
      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <p className="text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Reference</p>
        <h3 className="mb-5" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: "var(--rose)" }}>The Pricing Spectrum</h3>
        <div className="space-y-3">
          {[
            {
              range: "$697–$997+/mo", label: "High-End", color: "#c97a7a",
              items: ["AI voice agents, review automation, email campaigns, call tracking, analytics dashboards", "White-glove onboarding and ongoing support", "Best for high-LTV niches: lawyers, real estate, med spas"],
            },
            {
              range: "$297–$497/mo", label: "Mid-Tier", color: "var(--gold)",
              items: ["AI chatbots, 2-way SMS, advanced automations, CRM pipelines", "Often includes required sales call and structured onboarding", "Best for: dentists, gyms, salons"],
            },
            {
              range: "$97–$197/mo", label: "Low-End / SaaS", color: "rgba(30,15,10,0.5)",
              items: ["Funnels, forms, calendar booking, simple automations", "Good for self-serve or hands-off clients", "Best for: cleaning, landscaping, photography"],
            },
          ].map(({ range, label, color, items }) => (
            <div key={label} className="flex gap-4 rounded-xl p-4" style={{ background: "rgba(200,168,100,0.06)", border: "1px solid rgba(200,168,100,0.15)" }}>
              <div className="shrink-0 w-20 text-center">
                <p className="font-bold" style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color }}>{range}</p>
                <p className="mt-0.5" style={{ fontFamily: FONT_LUXE, fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(30,15,10,0.4)" }}>{label}</p>
              </div>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" style={{ width: "10px", height: "10px", color: "var(--gold)" }}><path d="M2.5 8.5L6 12L13.5 4.5" /></svg>
                    <span style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(30,15,10,0.7)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Pitch Deck Guide */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(200,168,100,0.15)", background: "rgba(200,168,100,0.06)" }}>
          <p className="text-[10px] tracking-widest uppercase mb-0.5" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Step 3 in the Sales Process</p>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--rose)" }}>The Pitch Deck</h3>
        </div>
        <div className="px-6 py-6 space-y-5">
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.7 }}>
            After the discovery call, send a pitch deck before asking for the close. It shows you're professional, takes away hesitation, and gives them something real to look at. Keep it under 15 slides. It should feel like a proposal, not a big formal presentation.
          </p>

          <div>
            <p className="text-[10px] tracking-widest uppercase mb-3" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>What your deck must include</p>
            <div className="space-y-2">
              {[
                { n: "1", title: "Introduction", body: "Who you are, what you do, and why you do it. Keep it personal — 1 slide." },
                { n: "2", title: "Their Problem", body: "Restate their pain points in their own words (from what they told you on the call). This shows you actually listened." },
                { n: "3", title: "Your Solution", body: "Software + service together. Show them it's not just posts — it's a full system running for their business." },
                { n: "4", title: "Case Study or Testimonials", body: "Real results with real numbers. Even one example from an early client or your own brand counts." },
                { n: "5", title: "The Package They Chose", body: "Outline the specific tier — what's included, what's not. Be clear. Vague proposals lose deals." },
                { n: "6", title: "Pricing", body: "Monthly fee, any one-time setup fee, and payment terms. No surprises." },
                { n: "7", title: "Clear Next Steps", body: "Step 1 / Step 2 / Step 3 — what happens after they say yes. Make it easy to move forward." },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-4 rounded-xl p-4" style={{ background: "rgba(200,168,100,0.06)", border: "1px solid rgba(200,168,100,0.12)" }}>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "var(--ink)" }}>
                    <span style={{ fontFamily: FONT_DISPLAY, fontSize: "0.85rem", color: "var(--gold)", fontStyle: "italic" }}>{n}</span>
                  </div>
                  <div>
                    <p className="font-medium" style={{ fontFamily: FONT_LUXE, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)" }}>{title}</p>
                    <p className="mt-0.5" style={{ fontFamily: FONT_BODY, fontSize: "0.83rem", color: "rgba(30,15,10,0.6)" }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl" style={{ background: "var(--ink)" }}>
            <p className="italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: "var(--cream)", lineHeight: 1.5 }}>
              Use the "Pitch Deck Builder" prompt in the Content Prompts tab to generate a complete customized deck for any prospect in minutes.
            </p>
          </div>
        </div>
      </div>

      </>}

      {/* ── AI Clone Pitch ─────────────────────────────── */}
      {section === "aipitch" && <>
      <SectionHeader label="Step 1 — Always Lead With This" title="The AI Clone Pitch." sub="This is our main strategy. Every outreach starts here. Be professionally curious. The goal of each message is to get the next one. Price comes last — always." />

      {/* Mindset card */}
      <div className="rounded-2xl p-7" style={{ background: "var(--ink)" }}>
        <p className="text-[10px] tracking-widest uppercase mb-4" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Before You Reach Out to Anyone — Read This First</p>
        <div className="space-y-3">
          {[
            { n: "1", text: "You are not bothering anyone. You're offering something that could genuinely help their business. Go in with complete confidence." },
            { n: "2", text: "Think of every outreach as professional flirting. Your job is to create curiosity and desire — not to close them on the first message. Pull, don't push." },
            { n: "3", text: "The goal of the first message is to get a reply. The goal of the reply is to get a meeting. The goal of the meeting is to blow their mind. The close comes after that — in that order." },
            { n: "4", text: "Never reveal the price until after they've already fallen in love with what you do. The AI Clone changes everything — let the wow moment do the selling." },
            { n: "5", text: "Research before you message. Know their business name, what they sell, and one specific thing about their current social media before you send a single word." },
          ].map(({ n, text }) => (
            <div key={n} className="flex gap-4">
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(200,168,100,0.15)", border: "1px solid rgba(200,168,100,0.3)" }}>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: "0.9rem", color: "var(--gold)", fontStyle: "italic" }}>{n}</span>
              </div>
              <p className="leading-relaxed" style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(250,243,234,0.75)", lineHeight: 1.7 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>

      <ScriptCard
        step="Primary Strategy — Always Lead With This"
        title="The AI Clone Pitch — Full Funnel"
        tag="DM · Email · Meeting · Proposal · Close"
        lines={[
          { type: "note", text: "This is our #1 lead strategy. The entire funnel is built around one idea: show them something they've never seen before, and let the wow moment close the deal. Never pitch the price until they're already in love. Professional flirting — every touch has one goal: get to the next touch." },
          { type: "subhead", text: "Touch 1 — Create Curiosity (DM or Email)" },
          { type: "note", text: "Research the business first. Find their name, their niche, their city, whether they have a face or a brand character. Then send this. Short, specific, human. No dashes, no brackets, no pitch." },
          { type: "send", label: "DM — Instagram / Facebook / TikTok", text: "Hey [NAME] 👀\n\nWe made an AI version of you for [BUSINESS NAME]. It posts content for your business automatically every week and you never have to film anything.\n\nWould you want to see it?" },
          { type: "note", text: "If they have a mascot or character: swap 'an AI version of you' with 'an AI version of [MASCOT NAME] for [BUSINESS NAME].' Same energy, same message." },
          { type: "send", label: "Email Version", text: "Subject: we made an AI version of you for [BUSINESS NAME]\n\nHi [FIRST NAME],\n\nWe actually built an AI version of you for [BUSINESS NAME]. It posts video content to your social media every week automatically. You never have to film anything or show up on camera.\n\nWould you want to see what it looks like?\n\nMandy\nThe Dollhouse Brand Studio\nshopdollhouse.co" },
          { type: "note", text: "Short, human, direct. Reads like a real person sent it. That's the goal." },
          { type: "subhead", text: "Touch 2 — When They Say Yes (Get the Meeting)" },
          { type: "note", text: "Their reply is the green light. Now your only goal is to get them on a 10 minute call or meet in person. Still no pitch. Still no price." },
          { type: "if_say", text: "Yes! / Wait, what? / How did you do that? / I want to see it!" },
          { type: "you_say", text: "So glad you're curious! It honestly looks way better in person than over text. Can we grab 10 minutes on Zoom? I'll show you exactly what it looks like and you can tell me what you think." },
          { type: "you_say", label: "If they're local", text: "So glad you're curious! Are you in [CITY]? I can swing by for 10 minutes and show you in person. You're going to love it." },
          { type: "warn", text: "Do NOT send the AI Clone video in the DM or email. The reveal happens face to face. That is where the magic lands. Get the meeting first." },
          { type: "if_say", text: "Can you just tell me what it is? / What kind of thing did you make?" },
          { type: "you_say", text: "It's an AI video of you that we created for [BUSINESS NAME]. It honestly won't do it justice over text though. Can we do 10 minutes on Zoom so you can actually see it?" },
          { type: "subhead", text: "Touch 3 — The Meeting (Before They Arrive)" },
          { type: "note", text: "Before the call: Make the AI Clone. Use their best photo or headshot (from their website, social media, or Google). If they have a mascot or character — use that. Build a short 15–30 second AI video using your video tool. Have the proposal ready — customized for their business." },
          { type: "note", text: "Note: Them saying 'yes' to the meeting is their consent to seeing the AI version of them. If they later want to use it, they'll sign the contract which covers image rights. You don't need to ask permission to build it beforehand — you're building it as a demo." },
          { type: "subhead", text: "Touch 3 — The Meeting (What to Say)" },
          { type: "send", label: "How to open — say exactly this", text: "Thanks for making time — I'm going to keep this super short. I just want you to see something first, and then you can tell me what you think. Here it is.\n\n[PLAY THE AI CLONE VIDEO — share your screen or show your phone]" },
          { type: "note", text: "Then stop talking. Let them watch the entire video. Let the reaction happen. Don't fill the silence. Their face will tell you everything." },
          { type: "if_say", text: "Oh wow... / Wait, that's me?! / How did you do that? / This is incredible" },
          { type: "you_say", text: "That's your AI clone — a digital version of you [or your brand character]. We make one of these every week for [BUSINESS NAME]. It posts on your social media, promotes your services, answers FAQs — whatever we script for it. You never have to film anything, plan anything, or think about content again.\n\nI actually put together a proposal for [BUSINESS NAME] specifically. Would you want to take a look?" },
          { type: "note", text: "Show the proposal now. Walk through it page by page. Let them ask questions. Don't rush. This is where they go from 'wow' to 'I want this.'" },
          { type: "subhead", text: "Touch 4 — The Trial Close (Not the Price Close)" },
          { type: "note", text: "After they've seen the clone and the proposal — offer the trial. This is your close. Don't ask them to commit to a year or even a month yet. Just ask: want to try it?" },
          { type: "send", label: "How to introduce the trial", text: "Here's what I'd love to do — rather than asking you to commit right now, I want to offer you a 14-day free trial. We run everything for [BUSINESS NAME] — the AI clone content, the automations, everything you just saw — for two weeks. You see real results before you decide anything.\n\nThe only thing upfront is a one-time $500 setup fee. That covers building everything out for your specific business. The first two weeks are completely on us.\n\nDoes that feel like something worth trying?" },
          { type: "if_say", text: "Yeah, that sounds good / I'd like to try it / Let's do it" },
          { type: "you_say", text: "Amazing — I'm so excited for you to see this running for [BUSINESS NAME]. So the monthly investment going forward is $1,000 a month — and since you're starting with the trial, all you pay today is the $500 setup fee. First two weeks are free. After that, if you love it — and you will — we just continue into monthly. Sound good?\n\n[Send the invoice for $500 and the agreement]" },
          { type: "warn", text: "PRICE ORDER MATTERS: You reveal the monthly price ($1,000) only AFTER they've already agreed to try the trial. They're already emotionally in — the $1k feels reasonable after the wow moment and the free trial. Never lead with price. Ever." },
          { type: "subhead", text: "If They Ask Price Before You're Ready to Tell Them" },
          { type: "if_say", text: "How much is it? / What does it cost? / What's the monthly?" },
          { type: "you_say", text: "I'd rather show you what you're getting first — the price makes a lot more sense after you actually see it. Can we do the 10 minutes on Zoom?" },
          { type: "note", text: "If they absolutely won't meet without knowing: 'Packages start at $1,000/mo — but I'd love to show you what that includes before you make any decisions. The meeting is what sells it, not me telling you.'" },
          { type: "subhead", text: "After They Sign — Getting Them on Monthly Retainer" },
          { type: "note", text: "The trial is 14 days. On day 10–12, send this — before the trial ends. Don't wait for them to bring it up." },
          { type: "send", label: "Day 10–12 of the trial — send this check-in", text: "Hey [NAME] 😊\n\nWe're about halfway through your trial and I just looked at [BUSINESS NAME]'s numbers — [SHARE A SPECIFIC RESULT, e.g., 'your reel hit 2.3k views' or 'we got 4 new inquiries through the automation'].\n\nI'd love to keep this going for you. To continue after the 14 days, it's just $1,000/mo — no long-term contract, month to month, you can cancel anytime.\n\nShould I send over the monthly invoice?" },
          { type: "note", text: "They've been watching it work for 10 days. They don't want to stop. The retainer sell is easy from here — they're already sold." },
        ]}
      />
      </>}

      {/* ── Cold Outreach ──────────────────────────────── */}
      {section === "cold" && <>
      <SectionHeader label="Step 2 — Start the Conversation" title="Cold Outreach Scripts." sub="DM first, email second, call third. Pick what fits. Every script is word for word. Fill in the bracketed parts and send." />

      <ScriptCard
        step="Step 1 — Start Here"
        title="Cold DM Script"
        tag="Instagram / Facebook / TikTok"
        lines={[
          { type: "note", text: "Find a local business or brand. Look at their profile. Find something real and specific to mention. Then send this:" },
          { type: "send", label: "Your first message — send exactly this", text: "Hey [NAME] 👋\n\nLove what you're doing with [BUSINESS NAME] — [one specific genuine compliment, e.g., 'the packaging on your products is so clean' or 'that reel you posted last week was really well done'].\n\nQuick question — are you handling your social media yourself right now, or do you have someone helping you with it?" },
          { type: "note", text: "Then stop. Don't explain yourself. Don't pitch. Just send that and wait. The question is intentional — it starts a conversation." },
          { type: "subhead", text: "When they reply" },
          { type: "if_say", text: "I do it myself" },
          { type: "you_say", text: "Got it — how's that going? Are you finding time to post consistently, or does it kind of fall off when you get busy?" },
          { type: "note", text: "Let them talk. Ask follow-up questions. When they admit it's hard or inconsistent — that's your opening to pitch." },
          { type: "if_say", text: "I have someone / we have a team" },
          { type: "you_say", text: "Oh nice! Are you happy with what they're doing, or is there something you wish was different?" },
          { type: "note", text: "If they're happy, move on. If they have any complaints at all — that's your opening. Listen for it." },
          { type: "if_say", text: "What do you do exactly?" },
          { type: "you_say", text: "We're a done-for-you social media studio — we handle all the content, captions, posting, and ads. You don't touch any of it. We also build an AI version of you so the content actually sounds like your brand, and we set up automations so every comment or message gets responded to automatically.\n\nWould it be worth a quick 15-minute call? I can show you exactly what it would look like for [BUSINESS NAME] specifically." },
          { type: "if_say", text: "How much is it?" },
          { type: "you_say", text: "It depends on what makes sense for your business — packages start at $1,000/mo. We also have a 14-day free trial if you want to see it working before you commit.\n\nWould a quick 15-minute call help? I can walk you through it and figure out what fits." },
          { type: "if_say", text: "Just send me your info / can you send me a link?" },
          { type: "you_say", text: "Of course! Here's our site: shopdollhouse.co\n\nI'll follow up in a couple days too — sometimes a quick 10-minute call makes way more sense than reading through everything. But take a look and let me know what you think!" },
          { type: "warn", text: "Don't just send the link and disappear. Always follow up 2–3 days later if they go quiet. Most people who say 'send me info' forget to look — your follow-up is what actually closes it." },
          { type: "subhead", text: "If they don't reply — follow up after 3 days" },
          { type: "send", label: "Follow-up DM", text: "Hey [NAME] — just wanted to bump this in case it got buried!\n\nNo pressure at all — I just think there's a real opportunity here for [BUSINESS NAME] and didn't want to leave it hanging. Happy to do a free quick audit of your current social media if that's helpful. Totally free, no strings.\n\nJust reply 'audit' and I'll put it together for you. 😊" },
          { type: "note", text: "If still no reply after the follow-up, move on. Two touches is enough for a cold DM. Your time is better spent on the next prospect." },
        ]}
      />

      <ScriptCard
        step="Step 2"
        title="Cold Email — Full 3-Part Sequence"
        tag="Email"
        lines={[
          { type: "note", text: "Use this when you have their email address. Send all 3 emails over about 10 days. Customize the bracketed fields for every single person — never send a generic blast." },
          { type: "subhead", text: "Email 1 — The Opener" },
          { type: "send", label: "Subject line", text: "quick question about [BUSINESS NAME]'s social" },
          { type: "send", label: "Email body", text: "Hi [FIRST NAME],\n\nI was looking at [BUSINESS NAME] online — [one specific genuine observation, e.g., 'really love the quality of your product photography'] — but I noticed your social media presence doesn't quite match the quality of what you're actually offering.\n\nI run The Dollhouse Brand Studio. We handle done-for-you social media for small businesses — content, posting, ads, automations — so you don't have to think about it.\n\nI'd love to put together a quick look at what we'd do for you specifically. No pitch deck, no pressure — just a 15-minute call to see if it's even a fit.\n\nWould [DAY] or [DAY] this week work for you?\n\n— Mandy\nThe Dollhouse Brand Studio\nshopdollhouse.co" },
          { type: "subhead", text: "Email 2 — The Follow-Up (send 3 days after Email 1 if no reply)" },
          { type: "send", label: "Subject line", text: "Re: quick question about [BUSINESS NAME]'s social" },
          { type: "send", label: "Email body", text: "Hi [FIRST NAME],\n\nJust bumping this up — I know inboxes get busy.\n\nI actually had a few quick ideas for [BUSINESS NAME] based on what I can see from your current pages. Happy to share them — no strings, just genuine ideas.\n\nWorth a 15-minute call?\n\n— Mandy" },
          { type: "subhead", text: "Email 3 — The Breakup (send 5 days after Email 2 if still no reply)" },
          { type: "send", label: "Subject line", text: "last one from me" },
          { type: "send", label: "Email body", text: "Hi [FIRST NAME],\n\nI don't want to be that person who emails five times — so this is my last one.\n\nIf now isn't the right time for [BUSINESS NAME], I completely understand. But if things change and social media becomes something you want fully handled, I'd love to be the first call you make.\n\nWishing you a great month regardless. 😊\n\n— Mandy\nThe Dollhouse Brand Studio\nshopdollhouse.co" },
          { type: "note", text: "After the 3-email sequence with no reply — switch channels. Send a DM or make a phone call. Some people just don't respond to email. That doesn't mean they're not interested." },
        ]}
      />

      <ScriptCard
        step="Step 3"
        title="Cold Call Script"
        tag="Phone"
        lines={[
          { type: "note", text: "This feels scary at first. That's completely normal. Read this out loud 5 times before your first call. By call #10, you'll have it memorized and it'll feel natural." },
          { type: "subhead", text: "When they pick up" },
          { type: "send", label: "Your opening — say exactly this", text: "Hi, is this [NAME]? Hey — this is Mandy calling from The Dollhouse Brand Studio. I know this is a bit out of the blue — do you have like 60 seconds?" },
          { type: "if_say", text: "Not right now / I'm in the middle of something" },
          { type: "you_say", text: "Totally understand — I'll be super quick, I promise. I was looking at [BUSINESS NAME] and had a couple of ideas I think you'd genuinely want to hear. Could I get 60 seconds?" },
          { type: "note", text: "If they still say no: 'No problem at all — what's a better time to call back?' Get a specific time. Don't just say 'I'll try again later.'" },
          { type: "if_say", text: "Sure, go ahead / What's this about?" },
          { type: "send", label: "Your pitch — say this naturally, conversationally", text: "I appreciate it. So I was doing some research on [industry] businesses in [area] and came across [BUSINESS NAME]. You're doing [genuine compliment — their product, their service, something real].\n\nI noticed your social media presence doesn't quite match the quality of what you're actually doing — and honestly, that's leaving real money on the table.\n\nWe handle everything for businesses like yours — content, posting, ads, automations — completely done for you so you can focus on running your business.\n\nIs that something that's on your radar at all?" },
          { type: "if_say", text: "Yeah actually / Tell me more / How does that work?" },
          { type: "you_say", text: "I'd love to show you exactly what that would look like for [BUSINESS NAME] specifically. Can we get 15 minutes on the calendar this week? I can do [DAY] or [DAY] — which works better for you?" },
          { type: "note", text: "Give them two specific options. Not 'whenever works for you' — that puts the work on them and people procrastinate. Two days, let them pick one." },
          { type: "if_say", text: "Not interested / We're already handled on that / No thanks" },
          { type: "you_say", text: "Totally fair — can I ask, is it a timing thing, or is social media just not a priority right now?" },
          { type: "note", text: "Listen carefully. 'Not a priority right now' often means 'I don't see the value yet.' 'Timing' means they might be ready in 30–60 days. This one question often opens the door." },
          { type: "subhead", text: "If they don't pick up — voicemail script" },
          { type: "send", label: "Voicemail — under 20 seconds", text: "Hey [NAME], this is Mandy from The Dollhouse Brand Studio. I had a couple of ideas specifically for [BUSINESS NAME]'s social media that I think you'd genuinely find valuable. I'll shoot you a quick email too — talk soon!" },
          { type: "note", text: "Always send an email right after leaving a voicemail — same day. Reference that you just called. It shows you're real and serious, not a robo-dialer." },
        ]}
      />

      </>}

      {/* ── Discovery Call added to salescall section ──── */}
      {section === "salescall" && <>
      <ScriptCard
        step="Step 4"
        title="The Discovery Call — Full Conversation Guide"
        tag="Video Call or Phone"
        lines={[
          { type: "note", text: "This is your most important conversation. Your goal: listen first, pitch second. The more they talk, the better you can tailor exactly what you present. Budget 20–30 minutes." },
          { type: "subhead", text: "Opening — The First 60 Seconds" },
          { type: "send", label: "Start with this", text: "Thanks so much for making time — I know you're busy and I want to make this worth every minute.\n\nBefore I tell you anything about us, I'd love to learn a little about [BUSINESS NAME] first. That way I can show you something that actually makes sense for where you are. Sound good?" },
          { type: "subhead", text: "Questions to Ask — Listen More Than You Talk" },
          { type: "note", text: "Ask these one at a time. Let them answer fully before moving on. Take notes. Their answers become your pitch." },
          { type: "send", label: "Your questions", text: "1. How are you currently handling your social media?\n\n2. Is posting consistently something you struggle with, or do you have a good system?\n\n3. What platforms are you on — Instagram, Facebook, TikTok?\n\n4. Are you running any paid ads right now, or just organic?\n\n5. What's the biggest frustration with social media for your business right now?\n\n6. What would winning look like for you? More leads, more sales, more visibility — what matters most?" },
          { type: "subhead", text: "The Pitch — After You've Listened" },
          { type: "send", label: "Transition into your pitch — say this", text: "Okay, so based on what you just told me — [restate their main pain point in their own words] — here's exactly what I'd do for [BUSINESS NAME]:\n\nFirst, we handle all your content. Every graphic, every caption, every post — done for you. You never have to think about what to post again.\n\nWe schedule everything directly to your [PLATFORMS THEY MENTIONED] — a full month of content, queued up and ready.\n\nWe also build your AI brand clone so the content actually sounds like you, not generic. And we set up automations so anyone who comments or messages your page gets responded to automatically — turning engagement into conversations, and conversations into bookings.\n\nEvery month, you get a report showing what's working — reach, engagement, what your audience responded to — so we keep getting smarter about your strategy.\n\nAll of this, completely done for you." },
          { type: "subhead", text: "Presenting the Packages — Always Start High" },
          { type: "send", label: "How to introduce pricing", text: "So we have three ways to work together, depending on what makes sense right now.\n\nThe most popular for businesses at your stage is our Starter package — $1,000 a month. That gets you one platform fully managed, your AI brand clone built out, all the automations set up, and your monthly performance report. There's a one-time $500 setup fee that covers building everything out for your specific business.\n\nIf you want to scale faster — multiple platforms, paid ads, email and SMS automations — that's our Growth package at $2,500 a month.\n\nAnd for businesses that want the full system — AI voice agent, five platforms, the works — that's Elite, starting at $5,000 a month.\n\nBased on what you told me, I think [RECOMMEND ONE] makes the most sense for where you are right now. What's your gut reaction to that?" },
          { type: "if_say", text: "Which one do you recommend?" },
          { type: "you_say", text: "Honestly — based on everything you told me, especially the [specific pain point they mentioned] — I'd start with [Starter/Growth]. It gets you everything you need without overcomplicating it. You can always add more once you see it working." },
          { type: "subhead", text: "The Close — Ask Directly" },
          { type: "send", label: "Ask for the sale — say exactly this", text: "So — does this feel like the right fit for [BUSINESS NAME]? Are you ready to get started?" },
          { type: "warn", text: "After you ask that closing question, stop talking. Do not fill the silence. Do not say 'I know it's a big decision' or 'no pressure.' Ask, then wait. Let them answer. Whoever speaks next loses the power in that moment — don't let it be you." },
        ]}
      />

      </>}

      {/* ── Objections & Close ─────────────────────────── */}
      {section === "objections" && <>
      <SectionHeader label="Step 5 — Handle Pushback" title="Objections and the Close." sub="Every objection has an answer. Stay calm. Don't drop your price right away. Use the free trial to close when they hesitate." />
      <ScriptCard
        step="Step 5"
        title="Handling Objections — Exact Words"
        lines={[
          { type: "note", text: "Every objection has an answer. The key is to stay calm, don't panic, and never discount immediately. These exact words work." },
          { type: "subhead", text: `"It's too expensive / I can't afford that right now"` },
          { type: "you_say", text: "I totally get it — $1,000/mo is a real investment. Can I ask — if social media was fully handled for you and brought in even one or two new clients a month, would that more than pay for itself?\n\n[Let them answer. Usually the answer is yes.]\n\nWe also have a 14-day free trial. The $500 setup still applies — that's how we build everything out for you — but the first two weeks are completely free so you can see real results before committing to the monthly. Does that change anything?" },
          { type: "subhead", text: `"Let me think about it / I need to talk to my partner"` },
          { type: "you_say", text: "Of course — I want this to be the right decision for you. Can I ask — what's the main thing you're weighing? Is it the price, the timing, or something you're unsure about with the service?" },
          { type: "note", text: "'Let me think about it' almost always means there's a specific concern they haven't said out loud. Your job is to find it." },
          { type: "you_say", label: "After they explain", text: "That makes total sense. How about this — let me schedule a quick follow-up for [specific day], give you time to talk it over, and if it's a yes we can get everything kicked off same day. Does [DAY] at [TIME] work?" },
          { type: "subhead", text: `"I tried social media before and it didn't work"` },
          { type: "you_say", text: "I hear that a lot — and honestly, most agencies drop the ball because they post generic content and call it done.\n\nWhat we do is different. We build your AI brand clone so the content actually sounds like you. We set up automations so leads don't fall through the cracks. And every month you see the actual numbers, not just pretty graphics.\n\nWhat specifically didn't work last time? I want to make sure we address that directly." },
          { type: "subhead", text: `"I already have someone doing my social media"` },
          { type: "you_say", text: "That's great — are you happy with what they're doing? What are the results looking like?\n\n[Let them answer.]\n\nIf they're delivering and you're genuinely happy, I wouldn't change a thing. But if there's something you wish was different — the consistency, the results, the communication — that's usually exactly where we come in." },
          { type: "subhead", text: `"Just send me some info and I'll take a look"` },
          { type: "you_say", text: "Absolutely — I'll send that right over. Can I also grab 10 minutes with you later this week? Most people find a quick call way more useful than reading through a bunch of info — I can answer questions in real time and show you exactly what it would look like for [BUSINESS NAME].\n\nI can do [DAY] or [DAY] — which is better for you?" },
          { type: "subhead", text: `"What if it doesn't work?"` },
          { type: "you_say", text: "That's exactly why we have the 14-day free trial — so you can see it working before you commit to anything monthly.\n\nAnd there are no long-term contracts. If we're not delivering, you can walk away. We stay because we work, not because you're locked in.\n\nHonestly, the only real risk is staying where you are while your competitors keep showing up online every single day." },
        ]}
      />

      <ScriptCard
        title="The Free Trial Close — When and How to Use It"
        lines={[
          { type: "note", text: "The 14-day free trial is your secret weapon for hesitant leads. Use it when someone is interested but nervous about committing, when they want to 'think about it,' or when price is the main concern." },
          { type: "subhead", text: "Exact words to introduce the free trial" },
          { type: "send", label: "Say this", text: "Here's something I can offer you — we have a 14-day free trial.\n\nThe $500 setup fee still applies, because that's how we actually build everything out for your business — your AI brand clone, your content calendar, your automation workflows. That part is real work and it takes real time.\n\nBut the first two weeks of the monthly service are completely free. So you get real content going live on your pages, real automations running, real results — before you pay a single dollar of the monthly fee.\n\nIf you love it, we continue. If not, you paid $500 and walked away with a fully built content system for your brand.\n\nDoes that feel like something worth trying?" },
          { type: "warn", text: "The $500 setup fee is never negotiable and never waived. It covers real work — building the AI brand clone, setting up automations, creating the content system. If they push back on the $500, explain what it covers calmly and firmly. Do not offer to skip it. Ever." },
          { type: "subhead", text: `If they push back: "Can you waive the setup fee?"` },
          { type: "you_say", text: "I wish I could, but the setup fee covers the actual labor of building everything out for your business. Your AI clone, your content templates, your automation workflows — that takes real work, and it's the foundation that everything else runs on. Without it, we'd just be posting generic content, and that's not what we do.\n\nWhat I can do is apply the $500 as a credit toward your second month if you decide to continue after the trial. So it's not gone — it's credit." },
        ]}
      />

      </>}

      {/* ── Referrals ──────────────────────────────────── */}
      {section === "referral" && <>
      <SectionHeader label="Step 6 — Grow Without Cold Outreach" title="Referrals." sub="Your happiest clients are your best salespeople. Ask right after a win — when they're excited. One message can bring in 2 or 3 warm leads who already trust you." />
      <ScriptCard
        title="Referral Ask — For Existing Clients"
        tag="Use right after a win"
        lines={[
          { type: "note", text: "The best time to ask for a referral is right after a client sees a win — a spike in reach, a new booking, a viral post. Strike while they're excited about the results." },
          { type: "send", label: "Text or DM your client", text: "Hey [CLIENT NAME] 😊\n\nI was just looking at [BUSINESS NAME]'s numbers and [specific win — e.g., 'that reel last week hit over 4k views'] — seriously so great to see that working!\n\nQuick ask: if you know any other business owners who struggle with their social media or just don't have time for it, I would love a warm introduction. I'm selectively bringing on a few new clients this month and a referral from you carries a lot of weight.\n\nIf you send someone my way who signs on, I'll take care of you — [INCENTIVE — e.g., 'a free extra month of performance reporting' or '$100 off your next invoice'].\n\nAbsolutely no pressure — just thought I'd ask! And honestly, thank you for trusting me with [BUSINESS NAME]. It means a lot. 🙏" },
          { type: "subhead", text: "Referral incentive ideas" },
          { type: "note", text: "Keep it simple: a free month of reporting, a content bonus (extra posts that month), or a small invoice credit. Pick whatever feels right for your relationship with that specific client. The most important thing is to just ask — most happy clients will refer you if you simply remind them to." },
        ]}
      />
      </>}

    </div>
  );
}

/* ─── Tab: Inbound Growth ────────────────────────────── */
function GrowthTab() {
  return (
    <div className="space-y-8">
      <SectionHeader
        label="Inbound Growth Strategy"
        title="Make clients come to you."
        sub="Cold outreach gets your first clients. This system brings 20+ leads a month to you without paying for ads. The sooner you start, the better it gets."
      />

      {/* Philosophy callout */}
      <div className="rounded-2xl p-6" style={{ background: "var(--ink)" }}>
        <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>The Shift</p>
        <p className="italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.2rem", color: "var(--cream)", lineHeight: 1.5 }}>
          Cold outreach is the fastest way to start from zero. But if you stop reaching out, clients stop coming. Inbound flips that. Build it once and it keeps working.
        </p>
        <p className="mt-3" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(250,243,234,0.5)" }}>
          Use cold outreach to land your first 3–5 clients. Use this system to grow beyond that without spending all your time chasing leads.
        </p>
      </div>

      {/* Strategy 1: GEO */}
      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "var(--ink)", color: "var(--gold)" }}>Strategy 1</span>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--rose)" }}>GEO — Generative Engine Optimization</h3>
        </div>
        <p className="mb-4" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.7 }}>
          People now search for services on ChatGPT, Gemini, and Perplexity — not just Google. When someone asks "who can help me with social media for my restaurant?" an AI gives them an answer. GEO is how you become that answer.
        </p>
        <p className="mb-5" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.7 }}>
          Regular SEO is about keywords and page titles. GEO is about trust. AI tools look at how well-known your brand is, how consistently you show up online, whether you have real results with real numbers, and whether other websites mention you.
        </p>

        <p className="text-[10px] tracking-widest uppercase mb-3" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>What to do</p>
        <div className="space-y-3">
          <CheckItem
            text="Pick a niche — and own it"
            sub='Instead of "social media agency," become "social media for med spas" or "social media for local restaurants." Niche = less competition, faster recommendations, better-fit clients who stay longer.'
          />
          <CheckItem
            text="Make your brand name appear consistently everywhere"
            sub="Website, Google Business Profile, Instagram bio, Facebook page, Yelp, directories — same name, same services, same city. AI models are trained on this data. Consistency = credibility."
          />
          <CheckItem
            text="Add real case studies with specific numbers"
            sub={"Not \"great results\" — actual outcomes. \"Grew follower count by 340% in 60 days.\" \"Generated 47 inbound leads in one month.\" AI platforms cite specific outcomes because that's what searchers want."}
          />
          <CheckItem
            text="Get third-party mentions and backlinks"
            sub="Being mentioned on other websites, featured in articles, or appearing on podcasts signals trust to AI models. This is the signal most people skip — and the one that matters most."
          />
          <CheckItem
            text="Post on social media consistently — it feeds GEO"
            sub="Every post with your business name, services, and location is another brand mention the internet indexes. Social media and GEO work hand-in-hand. Posting consistently is not just for leads — it's for authority."
          />
        </div>
      </div>

      {/* Strategy 2: Organic Social + Boost */}
      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "var(--ink)", color: "var(--gold)" }}>Strategy 2</span>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--rose)" }}>Organic Social Media + the $150 Boost</h3>
        </div>
        <p className="mb-4" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.7 }}>
          Post consistently on Instagram, Facebook, and LinkedIn — content about what you do, who you help, and the results you get. When someone is finally ready to hire a social media agency, you're the first person they think of because they've been seeing your content.
        </p>
        <div className="space-y-3">
          <CheckItem
            text="Post for your own brand every single day — use the platform AI to batch it"
            sub="Use the same AI content creation prompts from the Content Prompts tab. Create a full month of your own content in 15 minutes. If you're selling social media, your own pages need to be proof."
          />
          <CheckItem
            text="The $150/month boost — amplify what's already working"
            sub="Don't run complex ad campaigns for yourself. Take your 2–3 best organic posts each month (the ones already getting engagement) and put $50 behind each to extend their reach. That's it. Proven content, bigger audience."
          />
          <CheckItem
            text="Your content pillars for your own brand"
            sub="1) Client results / case studies  2) Behind the scenes — how you work  3) Education — social media tips for business owners  4) Your story / personality  5) Offers and services. Rotate through all five."
          />
        </div>
      </div>

      {/* Strategy 3: Blogging + LinkedIn */}
      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "var(--ink)", color: "var(--gold)" }}>Strategy 3</span>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--rose)" }}>SEO Blogging + LinkedIn Articles</h3>
        </div>
        <p className="mb-4" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.7 }}>
          A single well-written blog post can drive traffic for years. This is the strategy with the highest long-term ROI — it takes the most time to start working, but once it does, it runs on autopilot.
        </p>
        <div className="space-y-3">
          <CheckItem
            text="Find niche keywords your ideal clients are actually searching"
            sub='Examples if your niche is med spas: "social media marketing for med spas," "how to get more med spa clients from Instagram," "best content ideas for med spas." Low competition, high-intent searchers.'
          />
          <CheckItem
            text="Write one blog post per week that answers a real question"
            sub="Use AI to draft it, then add your own experience, real client examples, and actual results. AI-generated content that's just copy-pasted doesn't rank — originality and first-hand data does."
          />
          <CheckItem
            text="Publish LinkedIn articles using the same blog content"
            sub="LinkedIn is indexed by Google. Articles you publish there show up in search results, get shared by your network, and position you as an authority. Repurpose each blog post into a LinkedIn article — minimal extra effort, double the reach."
          />
          <CheckItem
            text="Include a CTA at the end of every post"
            sub='"Book a free call," "DM us to see what this would look like for your business," or a link to your contact page. Every post should have a next step.'
          />
        </div>
      </div>

      {/* Strategy 4: YouTube */}
      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "var(--ink)", color: "var(--gold)" }}>Strategy 4</span>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--rose)" }}>YouTube / Long-Form Video</h3>
        </div>
        <p className="mb-4" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.7 }}>
          YouTube videos now show up in Google search results and are being cited in AI search results on ChatGPT and Gemini. A video you make today can be driving leads 5 years from now. This is the hardest strategy to stay consistent with — but the payoff is massive if you do.
        </p>
        <div className="p-4 rounded-xl mb-4" style={{ background: "rgba(200,168,100,0.1)", border: "1px solid rgba(200,168,100,0.2)" }}>
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", fontStyle: "italic", color: "var(--ink)" }}>You don't need to post 3× a week. You don't need thousands of subscribers. 10 really good videos that answer the specific questions your ideal clients are asking is enough to start driving strong, qualified inbound leads.</p>
        </div>
        <div className="space-y-3">
          <CheckItem
            text="Pick 10 questions your ideal clients are Googling right now"
            sub='Example niche: salons. Videos: "How to get more salon clients from Instagram," "Social media ideas for hair salons," "Should my salon run Facebook ads?" — these are exact searches your clients make.'
          />
          <CheckItem
            text="Make one video per topic — thorough, real, useful"
            sub="Use AI to write the script. The leads from video are your best leads — they watched you, they trust you, they're already sold before they reach out."
          />
          <CheckItem
            text="Every video trains AI models to associate your brand with that topic"
            sub="Showing up on YouTube + Google + AI search for the same niche topic is compounding authority. It takes time, but it becomes impossible to ignore."
          />
        </div>
      </div>

      {/* Strategy 5: Guest Blogging + Podcasts */}
      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "var(--ink)", color: "var(--gold)" }}>Strategy 5</span>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--rose)" }}>Guest Blogging, Features & Podcasts</h3>
        </div>
        <p className="mb-4" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.7 }}>
          Getting mentioned on other websites is the fastest way to build third-party credibility — which is exactly what AI search engines are looking for. Every feature or backlink is another signal that your brand is real and trustworthy.
        </p>
        <div className="space-y-3">
          <CheckItem
            text="Reach out to industry blogs in your niche and offer a guest post"
            sub='Example: if you serve restaurants, pitch a post to a restaurant industry blog: "5 Social Media Mistakes Restaurants Make (And How to Fix Them)." They get free content. You get a backlink and credibility.'
          />
          <CheckItem
            text="Pitch yourself to podcasts — even small ones count"
            sub="Find podcasts your ideal clients listen to. Pitch a specific topic you can speak on. Podcast appearances get shared, indexed, and cited. Every appearance is a backlink and a brand mention."
          />
          <CheckItem
            text="Track your mentions — set up a Google Alert for your business name"
            sub="Free. Takes 2 minutes. Alerts you any time your name appears online — so you can see your GEO footprint growing and respond to any mentions."
          />
        </div>
      </div>

      {/* GEO Checklist summary */}
      <div className="rounded-2xl p-7" style={{ background: "var(--ink)" }}>
        <p className="text-[10px] tracking-[0.25em] uppercase mb-3" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Your GEO Starter Checklist</p>
        <p className="italic mb-5" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: "var(--cream)", lineHeight: 1.4 }}>Do these once to lay the foundation. Then create content consistently and let it compound.</p>
        <div className="space-y-2">
          {[
            "Pick a clear niche — one industry, one type of business",
            "Claim and fully fill out your Google Business Profile",
            "Make sure your name, services, and city match on every platform (Instagram, Facebook, website, directories)",
            "Write 3 detailed case studies with real numbers — add them to your website",
            "Collect 10+ Google reviews (ask every happy client)",
            "Publish your first blog post targeting a niche keyword",
            "Create a LinkedIn company page and publish your first article",
            "Post on your own social media 5x a week minimum",
            "Reach out to one podcast or blog for a guest feature this month",
            "Set up a Google Alert for your business name",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" style={{ width: "12px", height: "12px", color: "var(--gold)" }}><path d="M2.5 8.5L6 12L13.5 4.5" /></svg>
              <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(250,243,234,0.78)" }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Tab: New Hire ───────────────────────────────────── */
function NewHireTab() {
  return (
    <div className="space-y-8">
      <SectionHeader label="New Hire Guide" title="Welcome to The Dollhouse." sub="Read this before you touch any client account. Everything you need to know is right here." />

      {[
        {
          title: "Who We Are",
          content: `The Dollhouse Brand Studio is a done-for-you social media agency. We handle content creation, scheduling, paid ads, and strategy for small business owners who don't have time to do it themselves.

Our clients pay a monthly fee and trust us to show up for their brand every single day. That means consistent quality, on-brand content, and clear communication — no excuses.

We are a small, close-knit team. Every client gets a premium experience. We do not cut corners.`,
        },
        {
          title: "Our Brand Standards",
          content: `Everything we send to a client must be reviewed against these questions before it goes out:

✓ Does this sound like the client — not like a template?
✓ Is the grammar and spelling perfect? (Use Grammarly — no exceptions.)
✓ Does this match the brand colours, fonts, and visual style?
✓ Would we be proud if a competitor saw this?
✓ Is the CTA clear — does the audience know exactly what to do next?

If the answer to any of those is "no" or "not sure" — fix it before it goes out.`,
        },
        {
          title: "Tools We Use",
          content: `• Our platform — CRM, pipeline, automations, SMS, email marketing. All client communication and task management lives here. Never use personal email or DMs for client work.
• Canva — graphic design for all social posts, ad creatives, story templates.
• Meta Business Suite / Meta Ads Manager — for running and managing Facebook and Instagram ads.
• Google Drive — shared client folders for content approvals, brand assets, reports.
• ChatGPT / Claude — for drafting captions and copy using the prompts in this playbook. Always review and humanize AI output before sending.

Ask for login credentials on Day 1. Do not create your own accounts on behalf of clients.`,
        },
        {
          title: "Client Communication Rules",
          content: `1. Reply to all client messages within 4 business hours — same day, always.
2. Never promise something you can't deliver. If you're not sure, say "Let me check on that and get back to you."
3. Bring problems to Mandy first. Do not try to fix things on active client accounts without approval.
4. Monthly reports go out within the first 3 days of the new month. No exceptions.
5. If a client is unhappy, listen first. Do not get defensive. Tell Mandy right away.
6. Never talk pricing, contracts, or upgrades with a client. That always goes through Mandy.`,
        },
        {
          title: "Content Creation Rules",
          content: `1. Always use the prompts in the Prompt Library. Do not write captions from scratch.
2. All AI-generated copy must be read, edited, and made to sound human before it goes anywhere.
3. Never copy content from other brands — not even as a starting point.
4. Batch your work — never create for one client at a time. Write all captions first, then design, then schedule.
5. Get written client approval before anything is scheduled or posted.
6. You get ONE round of revisions per content batch. Be clear about that upfront.`,
        },
        {
          title: "What Will Get You Let Go",
          content: `• Missing deadlines without giving a heads up first
• Sending content to a client without checking it internally first
• Making changes to a live ad without approval
• Talking negatively about any client — to other clients, online, or anywhere
• Sharing client info, content, or logins outside the team
• Going silent — on a client, on Mandy, or on a deadline

We are a small team. Trust and showing up are non-negotiable.`,
        },
      ].map(({ title, content }) => (
        <div key={title} className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
          <h3 className="mb-4" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--rose)" }}>{title}</h3>
          <p className="leading-relaxed whitespace-pre-line" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.75)" }}>{content}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Tab: 4x4 Content Strategy ─────────────────────── */
function ContentStrategyTab() {
  const [openStep, setOpenStep] = useState<number | null>(null);

  const steps = [
    {
      n: "01",
      label: "Hook",
      timing: "First 4 seconds",
      color: "var(--rose)",
      icon: "⚡",
      tagline: "Interrupt. Disrupt. Make it personal.",
      body: `The hook is not an intro — it is a disruption. In 1–3 seconds, the viewer decides: is this about me? If they're not sure, they scroll. You never get them back.

Your hook is two sentences. Two. Not three. Not a paragraph. Two sentences — and each one has one job.`,
      details: [
        {
          label: "Sentence 1 — The Pattern Interrupt",
          text: `This is the shock. It disrupts, accuses, reveals, or exposes something. The viewer's brain should fire with "wait, what?" It challenges them, calls them out, or says something they weren't expecting. It is confrontational without being mean.

Examples of what works:
"You don't have a content problem — you have a courage problem."
"You've been posting for a year and you still have 300 followers — and you know why."
"The reason you're not booking clients isn't your price. It's your visibility."`,
        },
        {
          label: "Sentence 2 — The Personal Relevance",
          text: `This is the clarity. It tells the viewer exactly who this video is for. It makes them feel seen, heard, and understood. Without this sentence, they leave after the shock. Without sentence 1, they scroll before sentence 2 even registers.

You need both. Together they do this:
Shock without clarity → they leave confused.
Clarity without shock → they scroll before they feel anything.
Both together → they stop, lean in, and watch.

Example of the pair:
S1: "You don't have a content problem — you have a courage problem."
S2: "And if you've been posting inconsistently for months, you already know what I'm talking about."`,
        },
        {
          label: "On-Screen Title + Subtitle",
          text: `After the two-sentence hook, show a title on screen. The title anchors the theme of the video — it does NOT repeat what you just said in the hook. Think of it as a chapter title.

The subtitle adds one more layer of specificity. Put it in the caption.

Example:
Hook: "You don't have a content problem — you have a courage problem. And if you've been posting inconsistently, you already know exactly what I mean."
On-Screen Title: The Psychology of Inconsistent Creators
Caption Subtitle: How low self-esteem sabotages visibility

The hook grabs them. The title grounds them. The subtitle tells them this is educational, worth watching to the end.`,
        },
      ],
      example: {
        label: "Hook Example — For a Business Account",
        hook: "You've been in business for three years and you still don't have a consistent online presence. And the reason isn't time. It's fear.",
        title: "Why Local Businesses Stay Invisible Online",
        subtitle: "And what low visibility is actually costing you every month",
      },
    },
    {
      n: "02",
      label: "Proof",
      timing: "Right after the hook",
      color: "var(--gold)",
      icon: "📊",
      tagline: "Earn the right to be heard.",
      body: `Nobody cares what you say in the hook until you back it up. The hook creates curiosity. The proof creates trust. Without proof, you're just another person online making big claims. With it, you're someone worth listening to.

Proof doesn't have to be complicated. It just has to be real.`,
      details: [
        {
          label: "What counts as proof",
          text: `A relevant stat or study (cited, real, specific — not vague).
A client result (name the niche, name the outcome, name the timeline).
Your own personal results (be specific — not 'I grew a lot,' but 'I went from 300 to 12,000 followers in 4 months while working from a shelter').
A before/after that the viewer can see or feel.
A testimonial — what a real person said after working with you.

The more specific the proof, the more it lands. "Most businesses see results" means nothing. "A dental office in Phoenix went from 0 bookings through social media to 14 a month in 6 weeks" means everything.`,
        },
        {
          label: "How to deliver proof without bragging",
          text: `Don't announce it. Slide it in. Make it feel like a natural part of the story — not a credential flex.

Wrong: "I've helped over 500 businesses and I have 10 years of experience."
Right: "I've watched the same pattern in hundreds of businesses — and it always starts the same way."

The second version carries proof without feeling like a resume. It positions you as someone who has seen enough to recognise patterns — which is real authority.`,
        },
      ],
      example: {
        label: "Proof in Context",
        hook: "Most small businesses that struggle with social media think it's a content problem. It's not.",
        proof: "I've set up content systems for over 40 local businesses in the past year. The ones that grew weren't posting more — they were posting differently. There's a reason for that.",
      },
    },
    {
      n: "03",
      label: "Value",
      timing: "The body — longest section",
      color: "#8a6cb0",
      icon: "🪞",
      tagline: "Hold up the mirror. Tell the story. Expose the pattern.",
      body: `People don't connect to information. They connect to themselves. Your job here is to hold up a mirror so the viewer can see their own patterns and blind spots — without making them feel bad about it.

This is where the video earns saves, shares, and comments. This is where trust is built or lost. Everything before this gets them watching. This section makes them feel something.`,
      details: [
        {
          label: "The Mirror Technique",
          text: `Describe the viewer's experience back to them in a way they've never heard it put before. Name the behaviour. Name the feeling. Name the pattern. When someone hears themselves described — not judged, described — the walls come down.

Example: "You said you wanted to go viral. But when the views came, you got nervous. You second-guessed every caption. You almost deleted the post. Because you weren't actually scared of failure — you were scared of being seen."

That's a mirror. Nobody told them they were scared of being seen. But they know it's true the second they hear it. That recognition is what drives comments. It's what makes them screenshot the caption. It's what makes them share it with someone who needs to hear it.

The rule: do not shame people. Expose their patterns. Exposing a pattern is authority. Shaming is alienation.`,
        },
        {
          label: "Stories — Why They Are Not Optional",
          text: `Stories do three things that no list, stat, or tip can do:
1. Build trust (you lived this — you didn't just read it)
2. Build emotional connection (they feel it with you)
3. Lower resistance (their guard comes down and they actually receive what you say)

Don't teach from theory. Teach from scars that you turned into strategy.

The story doesn't have to be dramatic. It has to be real. The detail that seems embarrassing or too specific to share is often the exact detail that makes someone feel less alone. Your story is the thing that separates you from every other creator in your niche posting the same tips.

Tell it like a scene. Not a summary. "I remember sitting in the parking lot of the shelter, posting from my phone at 10pm, refreshing the page every 5 minutes" hits differently than "I posted while going through a hard time."`,
        },
        {
          label: "Emotional Triggers — Use Intentionally",
          text: `Triggers are not tricks. They are the real reason people take action — or stay stuck. If content doesn't trigger a feeling, people watch it and forget it.

The 6 core triggers to use (never shame — always expose the pattern):

SHAME EXPOSURE — Expose the gap between what they say they want and what they actually do. "You say you want to grow your business, but you haven't posted in 6 weeks."

HOPE — They are closer than they think. This activates people on the edge of quitting. "Most people quit three feet from the gold. You might be there right now."

IDENTITY CHALLENGE — Challenge who they believe they are. "You don't lack a skill. You lack a belief system." This hits high-achievers especially hard.

FEAR OF REGRET — Activate the fear that time is being wasted. "The version of you that started five years ago would be disappointed in where you're still standing."

ASPIRATION / EXPOSURE — Show what is possible. Let them feel the gap between where they are and what's available to them. This is what luxury lifestyle content does — it doesn't shame, it exposes possibility.

BELONGING / RECOGNITION — Make them feel seen in a way nobody else has. "Finally someone who gets it." This is what builds communities.

Pick one. Use it with purpose. Never layer shame on top of a trigger — expose the pattern, not the person. That's the difference between authority and aggression.`,
        },
      ],
      example: {
        label: "Value in Context — Personal Brand",
        hook: "You've been posting for eight months and you still feel invisible.",
        value: "Here's what I see when I look at your content: you're hiding. The posts that got 12 likes are the ones where you shared an opinion. The ones that got 0 are the ones where you played it safe. You already know which version of you people actually respond to. You're just scared to be her consistently. I know this because I spent a year posting content that looked professional and said nothing. Then I posted one video from my car, crying, talking about something real — and it hit 40,000 people in a week. That video cost me nothing but honesty. The polished ones cost me everything and gave me nothing.",
      },
    },
    {
      n: "04",
      label: "Call to Action",
      timing: "Last 4 seconds",
      color: "var(--ink)",
      icon: "🎯",
      tagline: "One ask. Say it directly. Stop talking.",
      body: `The last 4 seconds of every video must have one clear ask. This is not optional. It feeds the algorithm and turns viewers into followers, leads, and clients.

One CTA. Not three. Not "like, comment, share, AND follow, AND DM me, AND check the link in bio." Pick one. The most important one.`,
      details: [
        {
          label: "CTA options — pick the one that fits",
          text: `COMMENT — "Comment [WORD] below and I'll DM you [RESOURCE]."
This is the highest-performing CTA for algorithm reach. Comments signal engagement. The keyword trigger turns comments into automatic DMs, which turns DMs into leads.

FOLLOW — "Follow for more content like this."
Use when the video is specifically designed to grow your audience. Best for broad, viral-targeted content.

SHARE — "Share this with someone who needs to hear it."
Use when the content hits an emotional truth that people recognise in someone they love. This is how videos spread outside your audience.

DM — "DM me the word [WORD] and I'll send you [SPECIFIC THING]."
Lower volume than comment, higher intent. Someone who DMs you is further along than someone who just comments.

SAVE — "Save this — you're going to want to come back to it."
Saves signal to the algorithm that your content has long-term value. Use for educational, instructional, or reference content.

BOOK / BUY — "Book a free call — link in bio." / "Shop — link in bio."
Use when the video has already done the selling. Don't use this if you haven't fully earned it in the previous 3 sections.`,
        },
        {
          label: "How to deliver the CTA",
          text: `Say it like you mean it. Not apologetically. Not in a rushed whisper at the end like you're embarrassed to ask.

Say it directly, with the same energy you brought to the hook. Look into the camera. Pause after you say it. Let it land.

Wrong: "Um, and if you liked this, maybe follow me or whatever, and you can also leave a comment I guess."
Right: "Comment 'GUIDE' below and I'll send you the full framework directly in your DMs. Right now. Let's go."

Urgency is okay. Desperation isn't. The difference is confidence.`,
        },
      ],
      example: {
        label: "CTA in Context",
        cta: "If this hit you — share it with someone in your world who's been playing small. And follow me because we go deeper than this every single week.",
      },
    },
  ];

  const triggers = [
    { name: "Shame Exposure", icon: "🪞", desc: "Expose the gap between what they say they want and what they actually do.", ex: '"You say you want wealth but you avoid every money conversation."', note: "Expose the pattern. Never shame the person." },
    { name: "Hope", icon: "✨", desc: "They are closer than they think. Activates people on the edge of quitting.", ex: '"You are closer than you think. Most people quit three feet from the gold."', note: "Use this when the audience is tired and almost ready to give up." },
    { name: "Identity Challenge", icon: "🔥", desc: "Challenge who they believe they are at a fundamental level.", ex: '"You don\'t lack a skill. You lack a belief system."', note: "Hits hardest for high-achievers in a rut." },
    { name: "Fear of Regret", icon: "⏳", desc: "Activate the fear that they are wasting their potential or their time.", ex: '"The version of you that started five years ago would be disappointed."', note: "Use sparingly — very powerful but can feel heavy if overused." },
    { name: "Aspiration / Exposure", icon: "🏆", desc: "Show what is possible. Let them feel the gap between now and what's available.", ex: "Showing your lifestyle, results, or client wins — and letting the contrast do the work.", note: "This is what luxury creators do. The exposure IS the trigger." },
    { name: "Belonging / Recognition", icon: "💜", desc: "Make them feel seen in a way nobody else has. Finally, someone who gets it.", ex: `"If you've been thinking this for years and didn't know how to say it — this is for you."`, note: "Builds the deepest loyalty. Creates community." },
  ];

  return (
    <div className="space-y-8">
      <SectionHeader
        label="The 4x4 Method"
        title="How to Make Videos People Can't Stop Watching."
        sub="Every video we make follows this exact formula. It walks the viewer through five steps: curiosity → recognition → trust → belief → action. Skip a step and the video won't work."
      />

      {/* Nervous System Flow */}
      <div className="rounded-2xl p-7" style={{ background: "var(--ink)" }}>
        <p className="text-[10px] tracking-widest uppercase mb-5" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>The Viewer's Journey — Every Video Must Hit All 5 Steps</p>
        <div className="flex flex-wrap gap-0">
          {[
            { label: "Curiosity", sub: "Hook lands", dot: true },
            { label: "Recognition", sub: "They see themselves", dot: true },
            { label: "Regulation", sub: "Their guard drops", dot: true },
            { label: "Belief", sub: "They trust you", dot: true },
            { label: "Action", sub: "They move", dot: false },
          ].map(({ label, sub, dot }) => (
            <div key={label} className="flex items-center gap-0">
              <div className="flex flex-col items-center px-3 py-2">
                <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.05rem", color: "var(--gold)", fontStyle: "italic" }}>{label}</p>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.7rem", color: "rgba(250,243,234,0.4)", marginTop: "2px" }}>{sub}</p>
              </div>
              {dot && <span style={{ color: "rgba(200,168,100,0.35)", fontSize: "1.2rem", padding: "0 2px" }}>→</span>}
            </div>
          ))}
        </div>
        <p className="mt-5 pt-4" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(250,243,234,0.45)", lineHeight: 1.7, borderTop: "1px solid rgba(200,168,100,0.12)" }}>If any step is missing, the video won't work. No curiosity = they scroll away. No recognition = they don't see themselves. No trust = they don't believe you. No belief = no action. No action = no clients.</p>
      </div>

      {/* Before You Script */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-6 py-5" style={{ borderBottom: "1px solid rgba(200,168,100,0.12)", background: "rgba(200,168,100,0.06)" }}>
          <p className="text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Before You Script Anything</p>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--ink)" }}>Start With a Strong Topic — Before You Write Anything</h3>
        </div>
        <div className="px-6 py-6 space-y-6">
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.65)", lineHeight: 1.75 }}>Your topic is everything. A weak topic makes a weak video — no matter how good the script is. A strong topic calls out a real pattern. It makes the right viewer think "this is about me." Pick a topic that genuinely frustrates you, or that you know most people are getting wrong.</p>

          {/* Weak vs Strong */}
          <div>
            <p className="text-[10px] tracking-widest uppercase mb-3" style={{ fontFamily: FONT_LUXE, color: "rgba(30,15,10,0.4)" }}>Weak vs. Strong</p>
            <div className="grid gap-3">
              {[
                { weak: "Why you need discipline", strong: "Why your low self-esteem is disguised as waiting for motivation", why: "The weak version is generic advice anyone could give. The strong version exposes a specific, uncomfortable pattern — and names it in a way the viewer recognises immediately." },
                { weak: "How to grow your business on social media", strong: "You're not posting consistently because deep down you don't believe your business is worth the attention", why: "The weak version is a tutorial. The strong version is a confrontation with a belief system. That confrontation is what makes people stop scrolling." },
                { weak: "Why you need to post more content", strong: "The real reason you keep starting over every Monday is that you're performing productivity instead of building a system", why: "The weak version gives advice. The strong version calls out a specific behaviour — 'performing productivity' — that the right audience immediately recognises in themselves." },
              ].map(({ weak, strong, why }) => (
                <div key={weak} className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.15)" }}>
                  <div className="grid sm:grid-cols-2">
                    <div className="p-4" style={{ background: "rgba(201,122,122,0.05)", borderRight: "1px solid rgba(200,168,100,0.1)" }}>
                      <p className="text-[9px] tracking-widest uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "rgba(180,80,80,0.7)" }}>Weak — generic, no one cares</p>
                      <p style={{ fontFamily: FONT_DISPLAY, fontSize: "0.95rem", color: "rgba(30,15,10,0.5)", fontStyle: "italic" }}>{weak}</p>
                    </div>
                    <div className="p-4" style={{ background: "rgba(200,168,100,0.04)" }}>
                      <p className="text-[9px] tracking-widest uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Strong — exposes a pattern</p>
                      <p style={{ fontFamily: FONT_DISPLAY, fontSize: "0.95rem", color: "var(--ink)", fontStyle: "italic" }}>{strong}</p>
                    </div>
                  </div>
                  <div className="px-4 py-3" style={{ background: "rgba(200,168,100,0.04)", borderTop: "1px solid rgba(200,168,100,0.1)" }}>
                    <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(30,15,10,0.5)", lineHeight: 1.6 }}>{why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Psychological target */}
          <div className="rounded-xl p-5" style={{ background: "rgba(200,168,100,0.08)", border: "1px solid rgba(200,168,100,0.2)" }}>
            <p className="text-[10px] tracking-widest uppercase mb-3" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Answer These Questions Before You Write Anything</p>
            <div className="space-y-2">
              {[
                "Who is this video for? Be specific — not 'business owners,' but 'women who started a business 2 years ago and still feel invisible online.'",
                "What belief does this challenge in them? What are they telling themselves that this video is going to shake up?",
                "What pain am I surfacing? Not creating new pain — just bringing up what's already there.",
                "What does their life look like after they watch this? What changes for them?",
                "Why does this matter to ME to say it? Content that comes from real passion is felt. Content that doesn't come from passion is forgotten.",
              ].map((q, i) => (
                <div key={i} className="flex gap-3">
                  <span className="shrink-0 mt-0.5" style={{ fontFamily: FONT_DISPLAY, fontSize: "0.9rem", color: "var(--gold)", fontStyle: "italic" }}>{i + 1}.</span>
                  <p style={{ fontFamily: FONT_BODY, fontSize: "0.83rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.65 }}>{q}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The 4 Steps */}
      <div>
        <p className="text-[10px] tracking-widest uppercase mb-4" style={{ fontFamily: FONT_LUXE, color: "rgba(30,15,10,0.35)" }}>The Four Steps — Tap to expand each one</p>
        <div className="space-y-3">
          {steps.map((s, idx) => {
            const open = openStep === idx;
            return (
              <div key={s.n} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${s.color}22`, background: "rgba(255,255,255,0.65)" }}>
                {/* Header — always visible, clickable */}
                <button
                  onClick={() => setOpenStep(open ? null : idx)}
                  className="w-full px-6 py-5 flex items-center gap-4 text-left"
                  style={{ background: open ? `${s.color}08` : "transparent" }}
                >
                  <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0" style={{ background: "var(--ink)" }}>
                    <span style={{ fontFamily: FONT_BODY, fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", color: `${s.color}`, opacity: 0.7 }}>Step</span>
                    <span style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: s.color, fontStyle: "italic", lineHeight: 1 }}>{s.n}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "var(--ink)" }}>{s.label}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[9px] tracking-wider uppercase" style={{ fontFamily: FONT_LUXE, background: `${s.color}14`, color: s.color }}>{s.timing}</span>
                    </div>
                    <p style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(30,15,10,0.5)", marginTop: "2px" }}>{s.tagline}</p>
                  </div>
                  <span style={{ fontFamily: FONT_LUXE, fontSize: "11px", color: "rgba(30,15,10,0.3)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
                </button>

                {/* Expanded content */}
                {open && (
                  <div className="px-6 pb-7 space-y-5" style={{ borderTop: `1px solid ${s.color}18` }}>
                    {/* Intro paragraph */}
                    <p className="pt-5" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.65)", lineHeight: 1.8 }}>{s.body}</p>

                    {/* Detail blocks */}
                    {s.details.map((d) => (
                      <div key={d.label} className="rounded-xl p-5" style={{ background: `${s.color}07`, border: `1px solid ${s.color}18` }}>
                        <p className="mb-2" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: s.color }}>{d.label}</p>
                        <p className="whitespace-pre-line" style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.75 }}>{d.text}</p>
                      </div>
                    ))}

                    {/* Example */}
                    {"example" in s && s.example && (
                      <div className="rounded-xl p-5" style={{ background: "var(--ink)" }}>
                        <p className="mb-3" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>{s.example.label}</p>
                        {Object.entries(s.example).filter(([k]) => k !== "label").map(([k, v]) => (
                          <div key={k} className="mb-3">
                            <p className="mb-1" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(200,168,100,0.5)" }}>{k}</p>
                            <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: "var(--cream)", fontStyle: "italic", lineHeight: 1.6 }}>{String(v)}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Emotional Triggers Reference */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-6 py-5" style={{ borderBottom: "1px solid rgba(200,168,100,0.12)", background: "rgba(200,168,100,0.06)" }}>
          <p className="text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Step 3 Reference</p>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--ink)" }}>The 6 Emotional Triggers</h3>
          <p className="mt-1" style={{ fontFamily: FONT_BODY, fontSize: "0.83rem", color: "rgba(30,15,10,0.5)" }}>If a video doesn't make the viewer feel something, they forget it. Pick one trigger per video. Never shame — expose the pattern.</p>
        </div>
        <div className="px-6 py-5 space-y-4">
          {triggers.map((t) => (
            <div key={t.name} className="rounded-xl p-5" style={{ background: "rgba(200,168,100,0.05)", border: "1px solid rgba(200,168,100,0.12)" }}>
              <div className="flex items-start gap-3">
                <span style={{ fontSize: "1.3rem", lineHeight: 1 }}>{t.icon}</span>
                <div className="flex-1 min-w-0">
                  <p style={{ fontFamily: FONT_LUXE, fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)" }}>{t.name}</p>
                  <p className="mt-1" style={{ fontFamily: FONT_BODY, fontSize: "0.83rem", color: "rgba(30,15,10,0.65)", lineHeight: 1.65 }}>{t.desc}</p>
                  <div className="mt-2 rounded-lg px-4 py-2.5" style={{ background: "var(--ink)" }}>
                    <p style={{ fontFamily: FONT_DISPLAY, fontSize: "0.9rem", color: "var(--cream)", fontStyle: "italic" }}>{t.ex}</p>
                  </div>
                  <p className="mt-2" style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "rgba(30,15,10,0.4)", lineHeight: 1.5 }}>Note: {t.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story principle */}
      <div className="rounded-2xl p-7" style={{ background: "var(--ink)" }}>
        <p className="text-[10px] tracking-widest uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>The Story Principle — Non-Negotiable</p>
        <p className="italic mb-5" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.35rem", color: "var(--cream)", lineHeight: 1.45 }}>"Teach from the scars you turned into strategy — not just from theory."</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "Stories build trust", body: "You lived it. You didn't just read it or study it. That lived experience is the thing that separates you from every other person saying the same words." },
            { label: "Stories build emotional connection", body: "Data doesn't move people. Emotion moves people. Stories create the emotional bridge between your content and your viewer's life." },
            { label: "Stories lower resistance", body: "When someone hears a real story they recognise — a struggle, a low point, a moment of doubt — their walls come down. They stop judging and start listening." },
          ].map(({ label, body }) => (
            <div key={label} className="rounded-xl p-4" style={{ background: "rgba(200,168,100,0.08)", border: "1px solid rgba(200,168,100,0.15)" }}>
              <p className="mb-2" style={{ fontFamily: FONT_LUXE, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)" }}>{label}</p>
              <p style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(250,243,234,0.65)", lineHeight: 1.65 }}>{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-xl p-4" style={{ background: "rgba(200,168,100,0.06)", border: "1px solid rgba(200,168,100,0.12)" }}>
          <p className="text-[9px] tracking-widest uppercase mb-1.5" style={{ fontFamily: FONT_LUXE, color: "rgba(200,168,100,0.5)" }}>How to tell a story in a short-form video</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: "0.83rem", color: "rgba(250,243,234,0.6)", lineHeight: 1.7 }}>Tell it like a scene, not a summary. "I remember sitting in the parking lot at 10pm, refreshing the page every 5 minutes, with $11 in my account" lands completely differently than "I posted while going through a hard time." The specific detail is the emotional truth. The more specific, the more universal.</p>
        </div>
      </div>

      {/* Quick Reference Card */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.25)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-6 py-4" style={{ background: "var(--ink)", borderBottom: "1px solid rgba(200,168,100,0.15)" }}>
          <p style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>Quick Reference — Print This Out</p>
        </div>
        <div className="grid sm:grid-cols-4">
          {[
            { n: "01", label: "Hook", time: "First 4 sec", color: "var(--rose)", items: ["Pattern interrupt (shock)", "Personal relevance (clarity)", "On-screen title anchors theme", "Subtitle goes in caption"] },
            { n: "02", label: "Proof", time: "Right after hook", color: "var(--gold)", items: ["Stat or study", "Client result (specific)", "Your own results (with numbers)", "Earns the right to be heard"] },
            { n: "03", label: "Value", time: "The body", color: "#8a6cb0", items: ["Hold up the mirror", "Tell a real story", "Expose patterns (not shame)", "Use one emotional trigger"] },
            { n: "04", label: "CTA", time: "Last 4 sec", color: "var(--ink)", items: ["One ask only", "Say it with confidence", "Comment / Follow / Share / DM", "Algorithm rewards engagement"] },
          ].map(({ n, label, time, color, items }, i) => (
            <div key={n} className="p-5" style={{ borderRight: i < 3 ? "1px solid rgba(200,168,100,0.12)" : "none" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: color === "var(--ink)" ? "var(--ink)" : `${color}15`, border: `1px solid ${color}30` }}>
                <span style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: color === "var(--ink)" ? "var(--gold)" : color, fontStyle: "italic" }}>{n}</span>
              </div>
              <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: "var(--ink)" }}>{label}</p>
              <p className="mb-3" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(30,15,10,0.35)", marginTop: "2px" }}>{time}</p>
              <ul className="space-y-1.5">
                {items.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" style={{ width: "9px", height: "9px", color }}><path d="M2.5 8.5L6 12L13.5 4.5" /></svg>
                    <span style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(30,15,10,0.6)", lineHeight: 1.5 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Deal Tracker ───────────────────────────────────── */

type PStage = "new_lead" | "sent" | "responded" | "call_set" | "proposal" | "negotiating" | "won" | "lost";

const STAGE_INFO: Record<PStage, { label: string; color: string; guide: string; nextStage?: PStage; nextLabel?: string }> = {
  new_lead:    { label: "New Lead",        color: "#c8a864", nextStage: "sent",        nextLabel: "✓ Outreach Sent",     guide: "LEAD WITH THE AI CLONE — but do NOT mention price yet. Step 1: send the AI Clone DM or Email. Goal: get them curious enough to say yes to seeing it. Step 2: once they say yes — get a 10-min Zoom or in-person meeting. Step 3: at the meeting, show the clone (build it beforehand), then show the proposal. Step 4: offer the 14-day free trial ($500 setup, first 2 weeks free). Step 5: AFTER they agree to the trial — tell them the monthly is $1,000. Price comes last. The wow moment does the selling." },
  sent:        { label: "Outreach Sent",   color: "#4a90d9", nextStage: "responded",   nextLabel: "✓ They Responded",    guide: "Outreach is out. Wait 2–3 business days. No response? Generate a follow-up — keep it to one sentence. It's all about volume and follow-through." },
  responded:   { label: "They Responded!", color: "#4a9970", nextStage: "call_set",    nextLabel: "✓ Call Booked",       guide: "Reply within 1 hour. Your only goal right now: get them on a 15-minute call. Don't pitch anything yet. Use the generator below to craft your reply." },
  call_set:    { label: "Call Scheduled",  color: "#7b68ee", nextStage: "proposal",    nextLabel: "✓ Proposal Sent",     guide: "Prep using the CLOSER notes below. Listen first, pitch second. Send the proposal within 24 hours of the call ending — while you're still fresh in their mind." },
  proposal:    { label: "Proposal Sent",   color: "#e08030", nextStage: "negotiating", nextLabel: "✓ They're Interested", guide: "Wait 24–48 hours. No reply? Follow up once. Don't resend the deck — just ask if they had a chance to look at it." },
  negotiating: { label: "Negotiating",     color: "#b8860b", nextStage: "won",         nextLabel: "✓ Mark as Won 🎉",   guide: "Price is the most common objection. First offer: the 14-day free trial ($500 setup upfront, first 2 weeks free, then monthly). If they want a longer commitment discount, offer 15% off annual. Don't drop the monthly price — protect your rate and add value instead." },
  won:         { label: "🎉 Won!",         color: "#2a8a50",                                                              guide: "Send the agreement and onboarding form TODAY. Schedule the kickoff call within 48 hours. Strike while they're excited." },
  lost:        { label: "Not Now",         color: "#888",    nextStage: "new_lead",    nextLabel: "↩ Re-Open",           guide: "Send a warm break-up email. Leave the door open. Set a 30-60 day reminder to circle back — people's situations change." },
};

const STAGE_MSGS: Record<PStage, { label: string; key: string }[]> = {
  new_lead:    [{ label: "🤖 AI Clone Email — Curiosity", key: "ai_clone_pitch" }, { label: "🤖 AI Clone DM — Curiosity", key: "ai_clone_dm" }, { label: "🎁 14-Day Free Trial Email", key: "free_trial" }, { label: "Free Trial DM", key: "free_trial_dm" }, { label: "Cold Email", key: "cold_email" }, { label: "Cold DM", key: "cold_dm" }, { label: "Compliment Email", key: "compliment" }],
  sent:        [{ label: "Follow-Up Email", key: "followup_email" }, { label: "Follow-Up DM", key: "followup_dm" }, { label: "Free AI Video Offer", key: "free_video" }],
  responded:   [{ label: "Book the Call", key: "book_call" }, { label: "Reply + Calendar", key: "call_reply" }],
  call_set:    [{ label: "CLOSER Prep Notes", key: "closer_prep" }, { label: "Pitch Deck Outline", key: "pitch_outline" }],
  proposal:    [{ label: "Proposal Follow-Up", key: "proposal_followup" }, { label: "Objection Handling", key: "objections" }],
  negotiating: [{ label: "Annual Deal Offer", key: "annual_deal" }, { label: "Objection Response", key: "obj_response" }],
  won:         [{ label: "Welcome Email", key: "welcome" }, { label: "Kickoff Invite", key: "kickoff" }],
  lost:        [{ label: "Graceful Break-Up", key: "breakup" }, { label: "30-Day Re-Engagement", key: "reengage" }],
};

interface PNote { id: string; text: string; at: string; }
interface PMsg  { id: string; label: string; body: string; at: string; }
interface Prospect {
  id: string; biz: string; contact: string; email: string; phone: string;
  niche: string; city: string; pain: string; source: string;
  stage: PStage; notes: PNote[]; savedMsgs: PMsg[]; created: string;
}

const PKEY = "dh_deals_v1";
const loadProspects = (): Prospect[] => { try { return JSON.parse(localStorage.getItem(PKEY) || "[]"); } catch { return []; } };
const saveAllProspects = (list: Prospect[]) => localStorage.setItem(PKEY, JSON.stringify(list));
const uid = () => Math.random().toString(36).slice(2);
const fmt = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });

function genMessage(key: string, p: Prospect): string {
  const fn  = p.contact ? p.contact.split(" ")[0] : "there";
  const biz  = p.biz  || "your business";
  const niche = p.niche || "local business";
  const city  = p.city  || "your area";
  const pain  = p.pain  || "managing social media and getting more leads";

  const t: Record<string, string> = {
    ai_clone_pitch:
`Subject: we made an AI version of you for ${biz}

Hi ${fn},

We actually built an AI version of you for ${biz}. It posts video content to your social media every week automatically. You never have to film anything or show up on camera.

Would you want to see what it looks like?

Mandy
The Dollhouse Brand Studio
shopdollhouse.co`,

    ai_clone_dm:
`Hey ${fn} 👀

We made an AI version of you for ${biz}. It posts content for your business automatically every week and you never have to film anything.

Would you want to see it?`,

    cold_email:
`Subject: quick question about ${biz}

Hi ${fn},

I came across ${biz} online and I love what you're doing in the ${niche} space. One thing I noticed though is that your social media presence doesn't really match the quality of what you're actually offering.

I run The Dollhouse Brand Studio. We handle done-for-you social media for ${niche} businesses in ${city}. Content, posting, ads, automations, all of it. You never have to think about any of it.

Would you be open to a quick 15 minute call? I'd love to show you what we'd do specifically for ${biz}.

Mandy Fortune
The Dollhouse Brand Studio
shopdollhouse.co`,

    cold_dm:
`Hey ${fn} 👋

Love what you're doing with ${biz}! Quick question, are you handling your own social content right now or does someone help you with it?

I run a done-for-you social media studio and I already have a couple ideas for ${biz} that I think could really perform. Happy to share them for free, no strings at all.`,

    compliment:
`Subject: compliments to your team at ${biz}

Hi ${fn},

Just wanted to shoot you a quick note. I came across ${biz} and was genuinely impressed with what you're doing in the ${niche} space.

I wanted to share you on social media but noticed ${biz} isn't doing much on Instagram or Facebook. Any reason? I really think more people need to hear about you.

Also where can I leave you a review? I'd love to spread the word.

Mandy Fortune
shopdollhouse.co


(Send this follow-up 2 days later if they reply positively)

Hey ${fn}! Thanks for getting back to me, so glad you liked it.

For the social media side I would genuinely love to help. A lot of other ${niche} businesses in ${city} are using it to get more clients right now and I think we could do the same for ${biz} pretty quickly.

Would love to chat for a few minutes if you're open to it!

Mandy`,

    free_trial:
`Subject: something for ${biz}, no strings

Hi ${fn},

We do done-for-you social media for ${niche} businesses. AI clone content, automations, booking systems, all of it. And right now we're offering a 14 day free trial so you can see real results before committing to anything.

Would it be worth a quick 10 minute call to see what that looks like for ${biz}?

Mandy Fortune
The Dollhouse Brand Studio
shopdollhouse.co`,

    free_trial_dm:
`Hey ${fn}! Quick question.

We're offering a 14 day free trial for ${niche} businesses right now. Done-for-you social media, AI clone content, automations, the whole thing. So you can see it actually working before you decide anything.

Worth a 10 minute chat?`,

    followup_email:
`Subject: Re: ${biz}

Hi ${fn},

Just bumping this up in case my last email got buried!

I had a few specific ideas for ${biz} that I think could really move things forward. Happy to run through them on a quick 15 minute call.

Would any time this week work for you?

Mandy`,

    followup_dm:
`Hey ${fn}! Just wanted to bump this in case it got buried.

I genuinely think there's something here for ${biz}. Happy to share a couple of specific ideas for your page, no strings at all.

Just reply yes and I'll send them over 🙂`,

    free_video:
`Hey ${fn}! I reached out a few days ago. I'm the one who builds AI video clones for business owners.

I'd love to make one for ${biz} for free just to show you what it looks like. Would you be open to seeing it?`,

    book_call:
`Hi ${fn},

So glad you replied! I would love to show you exactly what we'd do for ${biz}.

Would you be open to a quick 15 minute call? I can walk you through what we're doing for other ${niche} businesses in ${city} and share a few ideas I already have for your page.

Just let me know what day works best for you this week!

Mandy`,

    call_reply:
`Hi ${fn},

So great to hear from you. I think there's a real opportunity here for ${biz}, especially around ${pain}. I would love to show you what that could look like.

What day works best for you this week for a quick 15 minute call? I'll show you exactly what the results look like for other ${niche} businesses.

Mandy Fortune
The Dollhouse Brand Studio`,

    closer_prep:
`CLOSER PREP — ${biz}
Contact: ${p.contact}   Niche: ${niche}   City: ${city}
Their pain point: ${pain}


CLARIFY THE PAIN
Open with this and really listen: "What's your biggest challenge right now with ${pain}? Walk me through what that actually looks like day to day for ${biz}."

LABEL THEM AS A FIT
Reflect it back so they feel heard: "So if I'm understanding you right, the main issue is [their words] and that's costing ${biz} [leads / time / revenue]?"

OUTLINE YOUR SOLUTION
"That's exactly why we built this for ${niche} businesses. We handle the content, the ads, the automations, all of it. ${biz} doesn't touch any of it. You just run your business."

SHARE A RESULT
"We set this up for another ${niche} in ${city} and they [result — e.g. booked 12 new clients in 30 days]. That's what we're going for here."

EXPLAIN THE OFFER
Present all 3 plans. Always start with Elite or Growth. Walk down to Starter only if needed. Never open with the cheapest option. Every plan includes a $500 one-time setup fee. If they hesitate on price say: "We do offer a 14-day free trial — the $500 setup applies but the first two weeks are completely free so you can see results before committing."

ASK FOR THE SALE
"Based on everything you've told me, I think [TIER] is the right fit for ${biz}. Do you want to get started?" Then stop talking. Let them answer.

Listen first. The more they talk, the better you can close.`,

    pitch_outline:
`PITCH DECK OUTLINE — ${biz}

Slide 1 — Introduction
The Dollhouse Brand Studio. Done-for-you social media, ads, and automation for ${niche} businesses.

Slide 2 — Their Problem
Use ${fn}'s exact words from the call: "${pain}". Make them feel understood, not sold to.

Slide 3 — Our Solution
Software and service working together. We handle the content, the ads, the automations. ${biz} handles their business.

Slide 4 — Proof
[INSERT RESULT] — another ${niche} business we helped in ${city}.

Slide 5 — Their Package
Exactly what's included for ${biz}, listed clearly. Also list 1 or 2 things not included so there are zero surprises.

Slide 6 — Investment
$[PRICE]/month + $500 one-time setup · Payment terms: [MONTHLY / UPFRONT]

Slide 7 — Next Steps
Step 1: Sign the agreement   Step 2: Complete the onboarding form (sent same day)   Step 3: Kickoff call within 48 hours`,

    proposal_followup:
`Subject: Re: ${biz} proposal

Hi ${fn},

Just checking in to see if you had a chance to look over the proposal.

Happy to answer any questions or jump on a quick call if it helps. No rush at all, I just want to make sure you have everything you need.

Mandy`,

    objections:
`OBJECTION GUIDE — ${biz}

"It's too expensive."
→ "What's it worth if we book ${biz} [X] new ${niche} clients this month? Most clients make it back in the first month."
→ Offer annual: "If budget's a concern, I can do 15% off if ${biz} locks in a year — works out to [ANNUAL PRICE]."

"I need to think about it."
→ "Of course — what's the one thing you're not sure about? I'd rather talk through it now."

"I'm already working with someone."
→ "How's that going? Are you seeing the results you want?" [Listen] "That's actually why clients come to us — [what we do differently]."

"I don't have time to deal with this right now."
→ "That's exactly the point — you won't have to. We handle everything. The only thing ${fn} will do is approve content once a month."`,

    annual_deal:
`Hi ${fn},

Quick thought. Would ${biz} want to lock in the rate for the year? I can do 15% off if you pay annually which works out to [ANNUAL PRICE].

Most of our clients who go annual save a few hundred dollars and honestly just love not having to think about the invoice every month.

Let me know and I'll put together the annual agreement today.

Mandy`,

    obj_response:
`Hi ${fn},

Totally get it. [Restate their objection in one short line here.]

Here's what I'd say to that. The businesses we work with who had the same concern typically saw [RESULT] within the first [TIMEFRAME]. And honestly if it's not working for ${biz} in the first 30 days I want to know that too.

What would you need to see to feel good about moving forward?

Mandy`,

    welcome:
`Subject: Welcome to The Dollhouse, ${fn}!

Hi ${fn},

So excited to have ${biz} on board. This is going to be great.

Here's what happens next. I'm sending over the agreement and onboarding form today and just need you to complete it within 24 hours so we can move fast. We'll get your kickoff call scheduled within 48 hours and your first content goes live within 14 days.

So glad you're here!
Mandy Fortune
The Dollhouse Brand Studio
shopdollhouse.co`,

    kickoff:
`Hi ${fn},

Ready to kick things off for ${biz}!

Let's get a 30-minute onboarding call on the calendar. We'll walk through your brand assets and voice, set up your automations together live, confirm your posting schedule and content pillars, and make sure everything is running before we hang up.

Grab a time here: [CALENDAR LINK]

Can't wait to get started. See you soon!
Mandy`,

    breakup:
`Subject: All the best, ${fn}

Hi ${fn},

No worries at all. I know the timing isn't always right.

If things ever change and ${biz} is ready to grow its social presence, I genuinely hope you'll think of us. We'll be here.

Wishing you a great rest of the [MONTH / QUARTER].

Mandy
The Dollhouse Brand Studio`,

    reengage:
`Subject: checking in on ${biz}

Hi ${fn},

It's been a little while since we talked and I wanted to check back in.

A lot has shifted on the social media side recently. [Mention one thing: carousels are outperforming Reels / AI video is changing how ${niche} businesses generate leads / etc.] and ${biz} came to mind right away.

Still happy to put together a quick look at what we'd do. No pressure at all, just wanted to make sure the door was still open.

Mandy`,
  };
  return t[key] ?? "Message template not found.";
}

/* ─── Deal Tracker UI ─────────────────────────────────── */

const EMPTY_FORM = { biz: "", contact: "", email: "", phone: "", niche: "", city: "", pain: "", source: "Cold Email" };

function DealTrackerTab() {
  const [prospects, setProspects] = useState<Prospect[]>(() => loadProspects());
  const [view, setView] = useState<"list" | "detail" | "add">("list");
  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [genKey, setGenKey] = useState<string | null>(null);
  const [genBody, setGenBody] = useState("");
  const [copied, setCopied] = useState(false);
  const [msgSaved, setMsgSaved] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [stageFilter, setStageFilter] = useState<PStage | "all">("all");

  const persist = (list: Prospect[]) => { setProspects(list); saveAllProspects(list); };

  function addProspect() {
    if (!form.biz.trim()) return;
    const np: Prospect = { id: uid(), ...form, stage: "new_lead", notes: [], savedMsgs: [], created: new Date().toISOString() };
    const updated = editingId
      ? prospects.map(p => p.id === editingId ? { ...p, biz: form.biz, contact: form.contact, email: form.email, phone: form.phone, niche: form.niche, city: form.city, pain: form.pain, source: form.source } : p)
      : [np, ...prospects];
    persist(updated);
    setForm({ ...EMPTY_FORM }); setEditingId(null); setView("list");
  }

  function deleteProspect(id: string) {
    if (!confirm("Delete this prospect?")) return;
    persist(prospects.filter(p => p.id !== id));
    if (selected === id) { setView("list"); setSelected(null); }
  }

  function advanceStage(id: string) {
    persist(prospects.map(p => { if (p.id !== id) return p; const ns = STAGE_INFO[p.stage].nextStage; return ns ? { ...p, stage: ns } : p; }));
  }

  function markStage(id: string, stage: PStage) {
    persist(prospects.map(p => p.id === id ? { ...p, stage } : p));
  }

  function generate(key: string, p: Prospect) {
    setGenKey(key);
    setGenBody(genMessage(key, p));
    setCopied(false); setMsgSaved(false);
  }

  function copyGen() { navigator.clipboard.writeText(genBody); setCopied(true); setTimeout(() => setCopied(false), 2000); }

  function saveMsg(pid: string) {
    const lbl = STAGE_MSGS[prospects.find(p => p.id === pid)!.stage].find(m => m.key === genKey)?.label ?? genKey ?? "";
    persist(prospects.map(p => p.id === pid ? { ...p, savedMsgs: [{ id: uid(), label: lbl!, body: genBody, at: new Date().toISOString() }, ...p.savedMsgs] } : p));
    setMsgSaved(true); setTimeout(() => setMsgSaved(false), 2000);
  }

  function addNote(pid: string) {
    if (!noteText.trim()) return;
    persist(prospects.map(p => p.id === pid ? { ...p, notes: [{ id: uid(), text: noteText.trim(), at: new Date().toISOString() }, ...p.notes] } : p));
    setNoteText("");
  }

  function deleteNote(pid: string, nid: string) { persist(prospects.map(p => p.id === pid ? { ...p, notes: p.notes.filter(n => n.id !== nid) } : p)); }
  function deleteMsg(pid: string, mid: string) { persist(prospects.map(p => p.id === pid ? { ...p, savedMsgs: p.savedMsgs.filter(m => m.id !== mid) } : p)); }

  const openEdit = (p: Prospect) => { setForm({ biz: p.biz, contact: p.contact, email: p.email, phone: p.phone, niche: p.niche, city: p.city, pain: p.pain, source: p.source }); setEditingId(p.id); setView("add"); };
  const openDetail = (id: string) => { setSelected(id); setGenKey(null); setGenBody(""); setView("detail"); };

  const prospect = prospects.find(p => p.id === selected);
  const stage = prospect ? STAGE_INFO[prospect.stage] : null;
  const filtered = stageFilter === "all" ? prospects : prospects.filter(p => p.stage === stageFilter);

  const inputCls = "w-full rounded-xl px-4 py-2.5 focus:outline-none text-sm";
  const inputStyle = { fontFamily: FONT_BODY, color: "var(--ink)", background: "rgba(255,255,255,0.85)", border: "1px solid rgba(200,168,100,0.3)" };

  /* ── Add / Edit Form ── */
  if (view === "add") return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => { setView("list"); setEditingId(null); setForm({ ...EMPTY_FORM }); }} className="hover:opacity-60 transition-opacity" style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>← Back</button>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: "var(--rose)" }}>{editingId ? "Edit Prospect" : "Add New Prospect"}</h2>
      </div>
      <div className="rounded-2xl p-7 space-y-4" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <div className="grid sm:grid-cols-2 gap-4">
          {([["biz","Business Name *","text"],["contact","Contact Name","text"],["email","Email Address","email"],["phone","Phone Number","tel"],["niche","Niche / Industry *","text"],["city","City","text"]] as [keyof typeof form, string, string][]).map(([k, ph, t]) => (
            <div key={k}>
              <label className="block mb-1" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>{ph}</label>
              <input type={t} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} placeholder={ph} className={inputCls} style={inputStyle} />
            </div>
          ))}
        </div>
        <div>
          <label className="block mb-1" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>How Did You Find Them</label>
          <select value={form.source} onChange={e => setForm(f => ({ ...f, source: e.target.value }))} className={inputCls} style={inputStyle}>
            {["Cold Email","Cold DM","Cold Call","Referral","Google Ads Research","Walked In","Social Media","Other"].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-1" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>Their Pain Points / Notes</label>
          <textarea value={form.pain} onChange={e => setForm(f => ({ ...f, pain: e.target.value }))} placeholder="What problems do they have? What did they say on the call? The more detail, the better the generated messages." rows={3} className={inputCls} style={{ ...inputStyle, resize: "vertical" as const }} />
        </div>
        <button onClick={addProspect} disabled={!form.biz.trim()} className="w-full rounded-xl py-3 transition-all hover:opacity-90 disabled:opacity-40" style={{ background: "var(--ink)", fontFamily: FONT_DISPLAY, fontSize: "1.05rem", fontStyle: "italic", fontWeight: 700, color: "var(--gold)" }}>
          {editingId ? "Save Changes" : "Add to Pipeline →"}
        </button>
      </div>
    </div>
  );

  /* ── Detail View ── */
  if (view === "detail" && prospect && stage) return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <button onClick={() => { setView("list"); setSelected(null); setGenKey(null); setGenBody(""); }} className="hover:opacity-60 transition-opacity shrink-0" style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>← Pipeline</button>
          <div>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.6rem", color: "var(--rose)", lineHeight: 1 }}>{prospect.biz}</h2>
            {prospect.contact && <p style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(30,15,10,0.5)" }}>{prospect.contact}{prospect.email ? ` · ${prospect.email}` : ""}{prospect.phone ? ` · ${prospect.phone}` : ""}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-medium" style={{ fontFamily: FONT_LUXE, background: `${stage.color}22`, color: stage.color, border: `1px solid ${stage.color}44` }}>{stage.label}</span>
          <button onClick={() => openEdit(prospect)} className="px-3 py-1 rounded-lg hover:opacity-70 transition-opacity" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(30,15,10,0.4)", border: "1px solid rgba(200,168,100,0.2)" }}>Edit</button>
          <button onClick={() => deleteProspect(prospect.id)} className="px-3 py-1 rounded-lg hover:opacity-70 transition-opacity" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c97a7a", border: "1px solid rgba(201,122,122,0.2)" }}>Delete</button>
        </div>
      </div>

      {/* Stage Guide */}
      <div className="rounded-2xl p-6" style={{ background: "var(--ink)", border: `1px solid ${stage.color}33` }}>
        <p className="text-[9px] tracking-[0.25em] uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: stage.color }}>What to do right now</p>
        <p className="mb-4" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(250,243,234,0.8)", lineHeight: 1.7 }}>{stage.guide}</p>
        <div className="flex flex-wrap gap-2">
          {stage.nextStage && (
            <button onClick={() => advanceStage(prospect.id)} className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-90" style={{ background: stage.color, fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff" }}>
              {stage.nextLabel}
            </button>
          )}
          <select onChange={e => markStage(prospect.id, e.target.value as PStage)} value={prospect.stage} className="px-3 py-2 rounded-xl text-xs" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.12em", background: "rgba(255,255,255,0.08)", color: "rgba(250,243,234,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>
            {(Object.keys(STAGE_INFO) as PStage[]).map(s => <option key={s} value={s}>{STAGE_INFO[s].label}</option>)}
          </select>
        </div>
      </div>

      {/* Message Generator */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(200,168,100,0.12)", background: "rgba(200,168,100,0.06)" }}>
          <p className="text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Message Generator</p>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap gap-2 mb-4">
            {STAGE_MSGS[prospect.stage].map(m => (
              <button key={m.key} onClick={() => generate(m.key, prospect)} className="px-4 py-2 rounded-xl transition-all hover:opacity-90" style={{ fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", background: genKey === m.key ? "var(--ink)" : "rgba(200,168,100,0.12)", color: genKey === m.key ? "var(--gold)" : "rgba(30,15,10,0.65)", border: "1px solid rgba(200,168,100,0.25)" }}>
                {m.label}
              </button>
            ))}
          </div>
          {genBody && (
            <div className="space-y-3">
              <textarea value={genBody} onChange={e => setGenBody(e.target.value)} rows={10} className="w-full rounded-xl px-4 py-3 text-sm leading-relaxed focus:outline-none" style={{ fontFamily: FONT_BODY, color: "var(--ink)", background: "rgba(255,255,255,0.9)", border: "1px solid rgba(200,168,100,0.3)", resize: "vertical" as const }} />
              <div className="flex gap-2">
                <button onClick={copyGen} className="flex-1 py-2.5 rounded-xl transition-all hover:opacity-90" style={{ background: copied ? "#4a7a4a" : "var(--ink)", fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: copied ? "#fff" : "var(--gold)" }}>{copied ? "✓ Copied!" : "Copy"}</button>
                <button onClick={() => saveMsg(prospect.id)} className="flex-1 py-2.5 rounded-xl transition-all hover:opacity-90" style={{ background: msgSaved ? "#4a7a4a" : "rgba(200,168,100,0.15)", fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: msgSaved ? "#fff" : "var(--gold)", border: "1px solid rgba(200,168,100,0.3)" }}>{msgSaved ? "✓ Saved!" : "Save to History"}</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
        <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(200,168,100,0.12)", background: "rgba(200,168,100,0.06)" }}>
          <p className="text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Notes</p>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex gap-2">
            <input value={noteText} onChange={e => setNoteText(e.target.value)} onKeyDown={e => e.key === "Enter" && addNote(prospect.id)} placeholder="Add a note — what happened, what they said, next step..." className="flex-1 rounded-xl px-4 py-2.5 text-sm focus:outline-none" style={inputStyle} />
            <button onClick={() => addNote(prospect.id)} disabled={!noteText.trim()} className="px-4 py-2.5 rounded-xl disabled:opacity-40 hover:opacity-90 transition" style={{ background: "var(--ink)", fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)" }}>Add</button>
          </div>
          {prospect.notes.length === 0 && <p style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(30,15,10,0.35)" }}>No notes yet. Log what happened after each touchpoint.</p>}
          {prospect.notes.map(n => (
            <div key={n.id} className="flex items-start justify-between gap-3 rounded-xl px-4 py-3" style={{ background: "rgba(200,168,100,0.06)", border: "1px solid rgba(200,168,100,0.12)" }}>
              <div>
                <p style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(30,15,10,0.8)" }}>{n.text}</p>
                <p style={{ fontFamily: FONT_LUXE, fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(30,15,10,0.3)", marginTop: "2px" }}>{fmt(n.at)}</p>
              </div>
              <button onClick={() => deleteNote(prospect.id, n.id)} className="shrink-0 hover:opacity-50 transition-opacity" style={{ fontFamily: FONT_LUXE, fontSize: "9px", color: "rgba(201,122,122,0.6)" }}>✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Messages */}
      {prospect.savedMsgs.length > 0 && (
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.2)", background: "rgba(255,255,255,0.65)" }}>
          <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(200,168,100,0.12)", background: "rgba(200,168,100,0.06)" }}>
            <p className="text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Saved Messages</p>
          </div>
          <div className="p-5 space-y-3">
            {prospect.savedMsgs.map(m => (
              <div key={m.id} className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(200,168,100,0.15)" }}>
                <div className="px-4 py-2 flex items-center justify-between" style={{ background: "rgba(200,168,100,0.06)", borderBottom: "1px solid rgba(200,168,100,0.1)" }}>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[9px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "rgba(200,168,100,0.18)", color: "#9a7a3a" }}>{m.label}</span>
                    <span style={{ fontFamily: FONT_LUXE, fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(30,15,10,0.3)" }}>{fmt(m.at)}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { navigator.clipboard.writeText(m.body); }} className="hover:opacity-60 transition-opacity" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)" }}>Copy</button>
                    <button onClick={() => deleteMsg(prospect.id, m.id)} className="hover:opacity-50 transition-opacity" style={{ fontFamily: FONT_LUXE, fontSize: "9px", color: "rgba(201,122,122,0.5)" }}>✕</button>
                  </div>
                </div>
                <pre className="px-4 py-3 text-xs leading-relaxed whitespace-pre-wrap" style={{ fontFamily: FONT_BODY, color: "rgba(30,15,10,0.65)", margin: 0 }}>{m.body}</pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  /* ── List View ── */
  const stages = Object.keys(STAGE_INFO) as PStage[];
  const counts = stages.reduce((acc, s) => ({ ...acc, [s]: prospects.filter(p => p.stage === s).length }), {} as Record<PStage, number>);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <SectionHeader label="Deal Pipeline" title="Close your next client." sub="Every prospect in one place. Click to open, generate personalized messages, log notes, and track every deal from first contact to signed." />
        <button onClick={() => { setForm({ ...EMPTY_FORM }); setEditingId(null); setView("add"); }} className="px-5 py-2.5 rounded-xl shrink-0 hover:opacity-90 transition" style={{ background: "var(--ink)", fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)" }}>
          + Add Prospect
        </button>
      </div>

      {/* Lead Strategy Spotlight */}
      <div className="rounded-2xl p-6" style={{ background: "linear-gradient(135deg, var(--ink) 0%, #2a1a10 100%)", border: "1px solid rgba(200,168,100,0.3)" }}>
        <div className="flex items-start gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🤖</span>
              <p className="text-[9px] tracking-[0.25em] uppercase" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Lead Strategy #1 · Featured Offer</p>
            </div>
            <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: "var(--cream)", fontWeight: 400, lineHeight: 1.1 }}>AI Clone / Character Package — <span style={{ color: "var(--gold)" }}>$1,000/mo</span> <span style={{ fontFamily: FONT_LUXE, fontSize: "0.75rem", letterSpacing: "0.1em", color: "rgba(250,243,234,0.45)", fontStyle: "normal" }}>+ $500 one-time setup</span></h3>
            <p className="mt-2 leading-relaxed" style={{ fontFamily: FONT_BODY, fontSize: "0.85rem", color: "rgba(250,243,234,0.7)" }}>
              We build a custom AI avatar of the business owner — a digital twin that looks, sounds, and speaks like them — and use it to post branded video content automatically every week. It's included in every plan starting at $1,000/mo with a $500 one-time setup. Hesitant prospects get the 14-day free trial pitch: $500 setup upfront, first two weeks free, then monthly.
            </p>
            <div className="mt-4 grid sm:grid-cols-2 gap-2">
              {["Custom AI avatar built to look & sound like the owner","Branded video content scripted + produced weekly","Posted to their platforms automatically — nothing for them to do","Comments & DMs handled by AI — no lead goes cold"].map(f => (
                <div key={f} className="flex items-start gap-2">
                  <span style={{ color: "var(--gold)", marginTop: "1px", flexShrink: 0 }}>✓</span>
                  <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(250,243,234,0.65)" }}>{f}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl p-4 text-center shrink-0" style={{ background: "rgba(200,168,100,0.12)", border: "1px solid rgba(200,168,100,0.25)", minWidth: "120px" }}>
            <p style={{ fontFamily: FONT_SCRIPT, fontSize: "1.1rem", color: "var(--gold)" }}>open a prospect</p>
            <p className="mt-1" style={{ fontFamily: FONT_LUXE, fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(250,243,234,0.4)" }}>to generate the</p>
            <p style={{ fontFamily: FONT_LUXE, fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(250,243,234,0.4)" }}>AI clone pitch</p>
          </div>
        </div>
      </div>

      {/* Stage filter */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setStageFilter("all")} className="px-3 py-1.5 rounded-lg text-xs transition-all" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", background: stageFilter === "all" ? "var(--ink)" : "rgba(255,255,255,0.6)", color: stageFilter === "all" ? "var(--gold)" : "rgba(30,15,10,0.5)", border: "1px solid rgba(200,168,100,0.2)" }}>
          All ({prospects.length})
        </button>
        {stages.filter(s => counts[s] > 0).map(s => (
          <button key={s} onClick={() => setStageFilter(s)} className="px-3 py-1.5 rounded-lg text-xs transition-all" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", background: stageFilter === s ? STAGE_INFO[s].color : "rgba(255,255,255,0.6)", color: stageFilter === s ? "#fff" : "rgba(30,15,10,0.5)", border: `1px solid ${STAGE_INFO[s].color}44` }}>
            {STAGE_INFO[s].label} ({counts[s]})
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 rounded-2xl" style={{ background: "rgba(255,255,255,0.5)", border: "1px dashed rgba(200,168,100,0.3)" }}>
          <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "rgba(30,15,10,0.35)", fontStyle: "italic" }}>No prospects yet.</p>
          <p className="mt-2" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(30,15,10,0.3)" }}>Add your first prospect to start the pipeline.</p>
          <button onClick={() => { setForm({ ...EMPTY_FORM }); setEditingId(null); setView("add"); }} className="mt-5 px-6 py-2.5 rounded-xl hover:opacity-90 transition" style={{ background: "var(--ink)", fontFamily: FONT_LUXE, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)" }}>
            + Add First Prospect
          </button>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => {
          const s = STAGE_INFO[p.stage];
          return (
            <button key={p.id} onClick={() => openDetail(p.id)} className="text-left rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(200,168,100,0.2)", boxShadow: "0 4px 16px -8px rgba(160,110,95,0.15)" }}>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] tracking-widest uppercase font-medium" style={{ fontFamily: FONT_LUXE, background: `${s.color}22`, color: s.color, border: `1px solid ${s.color}44` }}>{s.label}</span>
                <span style={{ fontFamily: FONT_LUXE, fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(30,15,10,0.3)" }}>{fmt(p.created)}</span>
              </div>
              <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.2rem", color: "var(--ink)", lineHeight: 1.2 }}>{p.biz}</h3>
              {p.contact && <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(30,15,10,0.5)", marginTop: "2px" }}>{p.contact}</p>}
              {p.niche && <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "rgba(30,15,10,0.45)", marginTop: "1px" }}>{p.niche}{p.city ? ` · ${p.city}` : ""}</p>}
              <div className="flex items-center gap-3 mt-3 pt-3" style={{ borderTop: "1px solid rgba(200,168,100,0.12)" }}>
                <span style={{ fontFamily: FONT_LUXE, fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(30,15,10,0.35)" }}>{p.notes.length} note{p.notes.length !== 1 ? "s" : ""}</span>
                <span style={{ fontFamily: FONT_LUXE, fontSize: "8px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(30,15,10,0.35)" }}>{p.savedMsgs.length} saved msg{p.savedMsgs.length !== 1 ? "s" : ""}</span>
                <span className="ml-auto" style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "var(--gold)" }}>Open →</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────── */
const PW_HASH = "cdc132ff0a47a81b6e95dbc1b9e16b8df2a97e39f580e110ad02359dca43acef";
const ADMIN_EMAIL = "fortuneamanda@hotmail.com";

async function hashString(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function LoginGate({ onAuth }: { onAuth: () => void }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const h = await hashString(pw);
    if (email.toLowerCase().trim() === ADMIN_EMAIL && h === PW_HASH) {
      sessionStorage.setItem("dh_admin", "1");
      onAuth();
    } else {
      setError(true);
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6" style={{ background: "linear-gradient(135deg, #f4dcdc 0%, #f7e6dc 45%, #f1d3cf 100%)" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p style={{ fontFamily: FONT_SCRIPT, fontSize: "1.6rem", color: "rgba(30,15,10,0.4)" }}>the</p>
          <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: "2rem", color: "var(--rose)", fontWeight: 400, letterSpacing: "0.06em", marginTop: "-6px" }}>DOLLHOUSE</h1>
          <p style={{ fontFamily: FONT_LUXE, fontSize: "8px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600 }}>Brand Studio · Admin</p>
        </div>
        <form onSubmit={submit} className="space-y-3 rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(200,168,100,0.25)", backdropFilter: "blur(12px)" }}>
          <input
            type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required
            className="w-full rounded-xl px-4 py-3 focus:outline-none"
            style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: "var(--ink)", background: "rgba(255,255,255,0.85)", border: `1px solid ${error ? "#c97a7a" : "rgba(200,168,100,0.35)"}` }}
          />
          <input
            type="password" placeholder="Password" value={pw} onChange={e => setPw(e.target.value)} required
            className="w-full rounded-xl px-4 py-3 focus:outline-none"
            style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: "var(--ink)", background: "rgba(255,255,255,0.85)", border: `1px solid ${error ? "#c97a7a" : "rgba(200,168,100,0.35)"}` }}
          />
          {error && <p style={{ fontFamily: FONT_BODY, fontSize: "0.78rem", color: "#c97a7a" }}>Incorrect email or password.</p>}
          <button
            type="submit" disabled={loading}
            className="w-full rounded-xl py-3 transition-all hover:opacity-90 disabled:opacity-60 mt-2"
            style={{ background: "var(--ink)", fontFamily: FONT_DISPLAY, fontSize: "1rem", fontStyle: "italic", fontWeight: 700, color: "var(--gold)" }}
          >
            {loading ? "Checking..." : "Enter the Playbook →"}
          </button>
        </form>
      </div>
    </main>
  );
}

function PlaybookPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("dh_admin") === "1");
  const [tab, setTab] = useState<Tab>("workflow");

  if (!authed) return <LoginGate onAuth={() => setAuthed(true)} />;

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "workflow", label: "Client Workflow", icon: "📋" },
    { id: "monthly", label: "Monthly Process", icon: "📅" },
    { id: "prompts", label: "Content Prompts", icon: "✍️" },
    { id: "content", label: "4x4 Strategy", icon: "🧠" },
    { id: "outreach", label: "Outreach Scripts", icon: "📞" },
    { id: "growth", label: "Inbound Growth", icon: "📈" },
    { id: "deals", label: "Deal Pipeline", icon: "🎯" },
    { id: "newhire", label: "New Hire Guide", icon: "👋" },
  ];

  return (
    <main className="min-h-screen text-[var(--ink)]" style={{ background: "linear-gradient(135deg, #f4dcdc 0%, #f7e6dc 45%, #f1d3cf 100%)" }}>

      {/* Header */}
      <header className="px-6 md:px-12 py-8 border-b border-[var(--gold)]/15" style={{ background: "rgba(247,230,220,0.8)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Internal Operations</p>
            <h1 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "var(--rose)", fontWeight: 400, lineHeight: 1 }}>
              The Dollhouse Playbook
            </h1>
            <p style={{ fontFamily: FONT_SCRIPT, fontSize: "1rem", color: "rgba(30,15,10,0.4)", marginTop: "2px" }}>brand studio</p>
          </div>
          <div className="px-4 py-2 rounded-full" style={{ background: "rgba(200,168,100,0.12)", border: "1px solid rgba(200,168,100,0.3)" }}>
            <p className="text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>🔒 Internal Use Only</p>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-0 z-30 px-6 md:px-12 py-3 overflow-x-auto" style={{ background: "rgba(247,230,220,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(200,168,100,0.12)" }}>
        <div className="max-w-6xl mx-auto flex gap-2 min-w-max">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="px-4 py-2 rounded-xl text-[11px] tracking-wider uppercase transition-all whitespace-nowrap"
              style={{
                fontFamily: FONT_LUXE,
                background: tab === t.id ? "var(--ink)" : "rgba(255,255,255,0.5)",
                color: tab === t.id ? "var(--gold)" : "rgba(30,15,10,0.55)",
                border: tab === t.id ? "1px solid var(--ink)" : "1px solid rgba(200,168,100,0.2)",
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        {tab === "workflow" && <WorkflowTab />}
        {tab === "monthly" && <MonthlyTab />}
        {tab === "prompts" && <PromptsTab />}
        {tab === "outreach" && <OutreachTab />}
        {tab === "growth" && <GrowthTab />}
        {tab === "content" && <ContentStrategyTab />}
        {tab === "deals" && <DealTrackerTab />}
        {tab === "newhire" && <NewHireTab />}
      </div>

      <footer className="px-6 py-8 text-center border-t border-[var(--gold)]/10">
        <p style={{ fontFamily: FONT_BODY, fontSize: "0.75rem", color: "rgba(30,15,10,0.3)" }}>
          © {new Date().getFullYear()} The Dollhouse Brand Studio · Internal Operations Playbook
        </p>
      </footer>
    </main>
  );
}
