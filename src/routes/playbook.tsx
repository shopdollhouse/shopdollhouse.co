import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/playbook")({ component: PlaybookPage });

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";
const FONT_SCRIPT = "'Allura', cursive";

/* ─── Types ───────────────────────────────────────────── */
type Tab = "workflow" | "monthly" | "prompts" | "outreach" | "growth" | "newhire" | "deals";

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
      <SectionHeader label="Client Lifecycle" title="From lead to live — step by step." sub="Every phase you need to execute when a new client signs. Check items off as you go." />

      <Phase day="Lead Stage" title="Before They Sign" items={[
        { text: "Discovery call booked via contact form or DM", sub: "Use the call to understand their goals, platforms, budget, and current content situation." },
        { text: "Send proposal within 24 hours of the call", sub: "Include the plan tier, what's covered, ad spend note (minimum $500/mo paid directly to Meta), and contract link." },
        { text: "Follow up if no response in 48 hours", sub: "One follow-up email or DM — keep it warm, not pushy." },
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
        { text: "Request all brand assets", sub: "Logo files (PNG + SVG), brand colors (hex codes), fonts, any existing photos or video." },
        { text: "Get social media logins or request admin access", sub: "Facebook Business Manager, Instagram, TikTok, Google Business if applicable." },
        { text: "Set up client in CRM", sub: "Create contact, pipeline stage, add tags, assign to the correct workflow/automation. Every client must be in the CRM before any work starts." },
        { text: "Verify Meta ad account access + pixel is installed", sub: "If no pixel — walk them through installing it or do it via GTM." },
        { text: "Ask the 4 client interview questions — document the answers:", sub: "1) How did you find out about us?  2) What tools were you using before?  3) What results do you most want to see?  4) How will you know this is working for your business? — These answers shape your strategy and become your case study later." },
      ]} />

      <Phase day="Day 3–5" title="Account Setup" items={[
        { text: "Audit their existing social profiles", sub: "Bio, profile photo, link in bio, pinned posts, highlight covers if applicable." },
        { text: "Update or optimize profiles where needed" },
        { text: "Set up and verify Meta Pixel on their website", sub: "Install via Events Manager → connect to their website domain. Confirm it's firing using Meta Pixel Helper (Chrome extension). Pixel must be live before any ads run." },
        { text: "Set up the Brand Board in the platform", sub: "Add client's exact colors (hex codes), fonts, logo, and visual aesthetic. The platform's AI will pull from this when generating content — so everything looks custom, not generic." },
        { text: "Define their 4–5 content pillars", sub: "Education / Behind the Scenes / Social Proof / Promotion / Personality" },
        { text: "Build their brand voice guide (use the Brand Voice prompt below)" },
        { text: "Set up their content calendar template for Month 1" },
        { text: "Confirm posting schedule with client — how many posts/week, what platforms" },
      ]} />

      <Phase day="Day 6–10" title="Content Creation" items={[
        { text: "Write all captions for Month 1", sub: "Use the Caption Writing prompt. Batch all posts at once — never write one at a time." },
        { text: "Design graphics or pull/edit photos", sub: "Match their brand colors, fonts, and aesthetic. Use Canva or provided templates." },
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
      <SectionHeader label="Monthly Rhythm" title="Your repeating weekly schedule." sub="This is how you structure every week to serve multiple clients without burning out." />

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
            { text: "Batch write all captions for the week — use prompts, don't freelance it" },
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
        <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: "var(--ink)", fontStyle: "italic" }}>Carousels are outperforming Reels right now. Prioritize carousel posts (3–7 slides) for education and social proof. Use Reels for reach and discovery. Both in the mix is ideal.</p>
        <p className="mt-2" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(30,15,10,0.55)" }}>Carousel structure that works: Hook slide → Value/Education → Testimonial or proof → CTA slide. Use the Carousel prompt to generate these in the platform's AI.</p>
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
- Visual direction (colors, layout style, image type)
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
- Visual direction (color, image type, background — keep it simple)
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

Brand colors: [HEX CODES]
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
- Bold typography, gold or rose accent colors — match The Dollhouse brand
- Clean minimal layouts — one big idea per slide
- Branded: include The Dollhouse Brand Studio logo on slide 1 and 7

Make it look professional, eye-catching, and ready to post.

---
Swap in your actual results once you have them. Specific numbers always outperform vague claims.`,
    },
  ];

  const GROUPS = [
    { label: "Platform AI", icon: "🤖", tags: ["Platform AI"] },
    { label: "Content Creation", icon: "✍️", tags: ["Captions", "Video", "Stories", "Planning"] },
    { label: "Ads & Email", icon: "📣", tags: ["Ads", "Email"] },
    { label: "Strategy & Reporting", icon: "📊", tags: ["Strategy", "Reporting", "Onboarding"] },
    { label: "AI Video", icon: "🎬", tags: ["AI Video"] },
    { label: "Outreach Scripts", icon: "📤", tags: ["Outreach"] },
    { label: "Lead Generation", icon: "🎯", tags: ["Lead Gen"] },
    { label: "Sales", icon: "💼", tags: ["Sales"] },
    { label: "SEO & Blogging", icon: "🌐", tags: ["Blogging", "GEO"] },
  ];

  const q = search.toLowerCase().trim();
  const filtered = q ? prompts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.tag.toLowerCase().includes(q) ||
    p.prompt.toLowerCase().includes(q)
  ) : null;

  return (
    <div className="space-y-6">
      <SectionHeader label="Prompt Library" title="Copy. Paste. Customize. Done." sub="Every prompt you need to create client work. Replace bracketed placeholders with client details. Never start from scratch." />

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search prompts by title, tag, or keyword..."
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

      {filtered ? (
        <div>
          <p className="mb-4" style={{ fontFamily: FONT_LUXE, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(30,15,10,0.4)" }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
          </p>
          {filtered.length === 0 ? (
            <div className="text-center py-14 rounded-2xl" style={{ background: "rgba(255,255,255,0.5)", border: "1px dashed rgba(200,168,100,0.3)" }}>
              <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.3rem", color: "rgba(30,15,10,0.35)", fontStyle: "italic" }}>No prompts found.</p>
              <p className="mt-1" style={{ fontFamily: FONT_BODY, fontSize: "0.8rem", color: "rgba(30,15,10,0.3)" }}>Try a different keyword or clear the search.</p>
            </div>
          ) : (
            <div className="space-y-4">{filtered.map(p => <PromptCard key={p.title} {...p} />)}</div>
          )}
        </div>
      ) : (
        <div className="space-y-12">
          {GROUPS.map(g => {
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
      label: "Offer 1 — Door Opener",
      price: "$500/mo",
      setup: "$500 one-time setup",
      tag: "Best to start with",
      tagColor: "var(--gold)",
      items: [
        "AI-generated branded content — 5 posts/week (carousels + graphics)",
        "Comment keyword automation → AI sends DM + lead magnet automatically",
        "AI-built lead magnet (1 per client — guide, checklist, or offer)",
        "Missed call text back — auto-texts anyone who calls and doesn't get answered",
        "Platform mobile app access so client sees everything in real time",
      ],
      note: "Gets the client online, looking professional, and generating their first leads. Build trust here, then upgrade.",
    },
    {
      label: "Offer 2 — Wow Factor",
      price: "$1,000/mo",
      setup: "$500 one-time setup",
      tag: "High perceived value",
      tagColor: "var(--rose)",
      items: [
        "Everything in Offer 1",
        "AI clone / character of the business owner — they never have to be on camera",
        "3 AI-generated videos per week (branded, viral-style)",
        "Time-lapse / transformation / before-after video formats",
        "Videos pinned to top of profile as signature content",
      ],
      note: "Lead with this when you want to stand out immediately. Most local businesses have never seen AI video — it's an instant 'I've never seen anything like this.'",
    },
    {
      label: "Offer 3 — Full System",
      price: "$750/mo + $250 ad budget",
      setup: "$500 one-time setup",
      tag: "Best results",
      tagColor: "#4a7a4a",
      items: [
        "Daily content — 5 posts/week (carousels + graphics)",
        "Comment keyword automation + AI DM + lead magnet",
        "Missed call text back",
        "3 high-impact AI videos per month — pinned at top of profile",
        "Boosted posts — $250/mo ad budget behind the 3 pinned videos",
        "Monthly analytics report",
      ],
      note: "Most beginner-friendly to sell. The boosted posts are what turns 'nice-looking social media' into real phone calls and booked appointments. Goal: 10 clients = $7,500/mo.",
    },
  ];

  return (
    <div className="space-y-5 mb-10">
      <div>
        <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Service Menu</p>
        <h2 style={{ fontFamily: FONT_DISPLAY, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "var(--rose)", fontWeight: 400, lineHeight: 1.1 }}>The 3-Offer Stack</h2>
        <p className="mt-2" style={{ fontFamily: FONT_BODY, fontSize: "0.9rem", color: "rgba(30,15,10,0.55)" }}>You don't have to offer all three right away. Pick the one you're most comfortable delivering, get your first clients, then layer on the others. The goal is to get moving.</p>
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
          Start every client on Offer 1. Once they see their social media looking professional and leads starting to come in — usually 30–60 days — introduce Offer 2 or upgrade them to the Full System. Never pitch the upgrade before they've felt the win from Offer 1.
        </p>
      </div>
    </div>
  );
}

/* ─── Tab: Outreach ───────────────────────────────────── */
function OutreachTab() {
  const scripts = [
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

---
Price anchoring options:
- Entry: $500/mo (content + scheduling)
- Standard: $750/mo (+ comment-to-DM automation)
- Full: $1,000/mo (+ ads management + monthly report call)`,
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

  return (
    <div className="space-y-6">
      <ServiceTiers />
      <SectionHeader label="Outreach Scripts" title="How to get clients." sub="Scripts for cold email, DMs, calls, and follow-ups. Customize the bracketed fields for each prospect. Always be specific — never send a generic message." />
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

      {/* CLOSER Framework */}
      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <p className="text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>Sales Call Framework</p>
        <h3 className="mb-5" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.5rem", color: "var(--rose)" }}>The CLOSER Method</h3>
        <div className="space-y-4">
          {[
            { letter: "C", word: "Clarify the Pain", body: `Ask: "What's your biggest problem right now? Missed calls? No-shows? Not enough leads?" Get them talking. The more they say, the more you can tailor your pitch.` },
            { letter: "L", word: "Label Them as a Fit", body: `Show them you understand their business. Repeat their pain points back: "So if I'm hearing you right, the main issue is your team is missing calls and you're losing jobs because of it?"` },
            { letter: "O", word: "Outline Your Solution", body: `Connect the dots to your service: "That's exactly why we set up a missed-call text-back system. Every time a call is missed, the customer gets a text instantly — you never lose a lead again."` },
            { letter: "S", word: "Share a Case Study", body: `Back it up with proof. Even one result from an early client or your own business works: "We set this up for another [NICHE] business and they booked [X] new clients in the first month."` },
            { letter: "E", word: "Explain the Offer", body: `Present your 3-tier pricing. Always start with the highest tier to anchor the value — then work down if needed. Never lead with the cheapest option.` },
            { letter: "R", word: "Request the Sale", body: `Don't leave the call open-ended. Ask directly: "Do you want to get started today?" Then stop talking. Let them answer. Silence is not your job to fill.` },
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
          <p className="italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1rem", color: "var(--ink)" }}>During the call: focus on learning about their business, knowing their pain points, and helping them reach their goals. You're a consultant, not a salesperson.</p>
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
            After you've had the discovery call and run the CLOSER framework, send a pitch deck before asking for the close. It makes you look like a real agency, removes hesitation, and gives them something concrete to look at. Keep it under 15 slides. It should feel like a proposal, not a presentation.
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

      <div className="rounded-2xl p-5" style={{ background: "rgba(200,168,100,0.1)", border: "1px solid rgba(200,168,100,0.25)" }}>
        <p className="text-[11px] tracking-widest uppercase mb-1" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>The Golden Rule</p>
        <p style={{ fontFamily: FONT_DISPLAY, fontSize: "1.1rem", color: "var(--ink)", fontStyle: "italic" }}>Research before you reach out. One specific detail (their product, a post they made, their location) outperforms 100 generic messages every time.</p>
      </div>
      <div className="space-y-4">
        {scripts.map((s) => <PromptCard key={s.title} {...s} />)}
      </div>
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
        sub="Cold outreach gets your first clients. This system gets you to 20+ inbound leads a month without spending on ads. It compounds over time — the earlier you start, the bigger the payoff."
      />

      {/* Philosophy callout */}
      <div className="rounded-2xl p-6" style={{ background: "var(--ink)" }}>
        <p className="text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontFamily: FONT_LUXE, color: "var(--gold)" }}>The Shift</p>
        <p className="italic" style={{ fontFamily: FONT_DISPLAY, fontSize: "1.2rem", color: "var(--cream)", lineHeight: 1.5 }}>
          Cold outreach is the fastest method when you're starting from zero. But it doesn't scale — if you stop calling, clients stop coming. Inbound flips that. You build once, it works forever.
        </p>
        <p className="mt-3" style={{ fontFamily: FONT_BODY, fontSize: "0.82rem", color: "rgba(250,243,234,0.5)" }}>
          Use cold outreach to get your first 3–5 clients. Use this system to grow past that without trading your time for every single lead.
        </p>
      </div>

      {/* Strategy 1: GEO */}
      <div className="rounded-2xl p-7" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(200,168,100,0.2)" }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-[10px] tracking-widest uppercase" style={{ fontFamily: FONT_LUXE, background: "var(--ink)", color: "var(--gold)" }}>Strategy 1</span>
          <h3 style={{ fontFamily: FONT_DISPLAY, fontSize: "1.4rem", color: "var(--rose)" }}>GEO — Generative Engine Optimization</h3>
        </div>
        <p className="mb-4" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.7 }}>
          People are now searching for services on ChatGPT, Gemini, and Perplexity — not just Google. When someone asks "who can help me with social media for my restaurant?" an AI answers. GEO is how you become the answer.
        </p>
        <p className="mb-5" style={{ fontFamily: FONT_BODY, fontSize: "0.88rem", color: "rgba(30,15,10,0.7)", lineHeight: 1.7 }}>
          Traditional SEO works at the page level (keywords, meta titles). GEO works at the <em>fact level</em> — AI models are looking at your brand's authority, how consistently you show up across the internet, whether you have real case studies with measurable outcomes, and whether credible third-party sources mention you.
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
      <SectionHeader label="New Hire Guide" title="Welcome to The Dollhouse." sub="Everything you need to know before you touch a single client account." />

      {[
        {
          title: "Who We Are",
          content: `The Dollhouse Brand Studio is a done-for-you social media agency. We handle content creation, scheduling, paid ads, and strategy for small business owners who don't have time to do it themselves.

Our clients pay a monthly retainer and trust us to show up for their brand every single day. That means consistent quality, on-brand content, and proactive communication — no excuses.

We are a boutique operation. Every client gets a premium experience. We do not cut corners.`,
        },
        {
          title: "Our Brand Standards",
          content: `Everything we send to a client must be reviewed against these questions before it goes out:

✓ Does this sound like the client — not like a template?
✓ Is the grammar and spelling perfect? (Use Grammarly — no exceptions.)
✓ Does this match the brand colors, fonts, and visual style?
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
          content: `1. Respond to all client messages within 4 business hours — same day, always.
2. Never promise something you can't deliver. If you're unsure, say "Let me confirm that and get back to you."
3. Bring problems to Mandy first — do not freestyle solutions on active client accounts.
4. Monthly reports go out within the first 3 days of the new month. No exceptions.
5. If a client is unhappy, listen first. Do not get defensive. Escalate to Mandy immediately.
6. Never discuss pricing, contracts, or upgrades with a client — that goes through Mandy.`,
        },
        {
          title: "Content Creation Rules",
          content: `1. Always use the prompts in the Prompt Library. Do not write captions from scratch.
2. All AI-generated copy must be reviewed, edited, and made to sound human before it's used.
3. Never copy content from competitors or other brands — even as inspiration.
4. Batch content creation — never create for one client at a time. Write all captions first, then design, then schedule.
5. Get written client approval before anything is scheduled or published.
6. You are allowed ONE round of revisions per content batch. Communicate this clearly.`,
        },
        {
          title: "What Will Get You Let Go",
          content: `• Missing deadlines without communicating in advance
• Sending content to a client without internal review first
• Making changes to a live ad campaign without approval
• Speaking negatively about any client (to other clients, online, anywhere)
• Sharing client information, content, or logins outside the team
• Ghosting — on a client, on Mandy, or on a deadline

We are a small team. Trust and reliability are non-negotiable.`,
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

/* ─── Deal Tracker ───────────────────────────────────── */

type PStage = "new_lead" | "sent" | "responded" | "call_set" | "proposal" | "negotiating" | "won" | "lost";

const STAGE_INFO: Record<PStage, { label: string; color: string; guide: string; nextStage?: PStage; nextLabel?: string }> = {
  new_lead:    { label: "New Lead",        color: "#c8a864", nextStage: "sent",        nextLabel: "✓ Outreach Sent",     guide: "LEAD WITH THE AI CLONE. Our #1 opening offer is the AI Character Package ($1k) — a digital twin of the business owner that posts video content for them automatically. Research this business first — check their social pages, reviews, and whether they're on video at all. Then generate the AI Clone Pitch below and send it. It hooks people because it's personal and completely different from what they've heard before." },
  sent:        { label: "Outreach Sent",   color: "#4a90d9", nextStage: "responded",   nextLabel: "✓ They Responded",    guide: "Outreach is out. Wait 2–3 business days. No response? Generate a follow-up — keep it to one sentence. It's all about volume and follow-through." },
  responded:   { label: "They Responded!", color: "#4a9970", nextStage: "call_set",    nextLabel: "✓ Call Booked",       guide: "Reply within 1 hour. Your only goal right now: get them on a 15-minute call. Don't pitch anything yet. Use the generator below to craft your reply." },
  call_set:    { label: "Call Scheduled",  color: "#7b68ee", nextStage: "proposal",    nextLabel: "✓ Proposal Sent",     guide: "Prep using the CLOSER notes below. Listen first, pitch second. Send the proposal within 24 hours of the call ending — while you're still fresh in their mind." },
  proposal:    { label: "Proposal Sent",   color: "#e08030", nextStage: "negotiating", nextLabel: "✓ They're Interested", guide: "Wait 24–48 hours. No reply? Follow up once. Don't resend the deck — just ask if they had a chance to look at it." },
  negotiating: { label: "Negotiating",     color: "#b8860b", nextStage: "won",         nextLabel: "✓ Mark as Won 🎉",   guide: "Price is the most common objection. Don't discount — offer the annual deal (10–20% off) or add value. Address their specific concern directly." },
  won:         { label: "🎉 Won!",         color: "#2a8a50",                                                              guide: "Send the agreement and onboarding form TODAY. Schedule the kickoff call within 48 hours. Strike while they're excited." },
  lost:        { label: "Not Now",         color: "#888",    nextStage: "new_lead",    nextLabel: "↩ Re-Open",           guide: "Send a warm break-up email. Leave the door open. Set a 30-60 day reminder to circle back — people's situations change." },
};

const STAGE_MSGS: Record<PStage, { label: string; key: string }[]> = {
  new_lead:    [{ label: "🤖 AI Clone Pitch — $1k", key: "ai_clone_pitch" }, { label: "AI Clone DM", key: "ai_clone_dm" }, { label: "Cold Email", key: "cold_email" }, { label: "Cold DM", key: "cold_dm" }, { label: "Compliment Email", key: "compliment" }, { label: "Free Trial DM", key: "free_trial" }],
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
`Subject: quick idea for ${biz} you haven't seen before

Hi ${fn},

I came across ${biz} and had an idea I think you're going to love.

We build an AI version of you — a digital character that looks and sounds like you — and use it to post branded video content for ${biz} every single week. You never film anything. You never script anything. Your AI twin just shows up online and does all of it for you.

For ${niche} businesses in ${city} this is a huge edge right now because almost nobody in your market is doing video content. We'd change that overnight.

It's $1,000 a month and there's a one-time $500 setup where we build your AI character. After that you just approve what goes out and watch the results come in.

I'd love to show you what it actually looks like. Do you have 15 minutes this week? No pressure, I just want you to see it before someone else in ${city} does.

Mandy Fortune
The Dollhouse Brand Studio
shopdollhouse.co`,

    ai_clone_dm:
`Hey ${fn}! Quick question for you.

Does ${biz} do any video content right now?

I ask because we just built something for ${niche} businesses that I've never seen anyone else offer. We create an AI version of you that posts video content for ${biz} every week. You never have to be on camera, never have to film anything. It looks incredibly real.

It's $1,000 a month to run it. Would you want to see a quick demo? I think it'd genuinely blow your mind.`,

    cold_email:
`Subject: quick question about ${biz}'s social media

Hi ${fn},

I came across ${biz} online and you're clearly doing great work in the ${niche} space. The one thing I noticed is that your social presence doesn't quite match the quality of what you're actually offering.

I run The Dollhouse Brand Studio and we handle done-for-you social media for ${niche} businesses in ${city}. Content, posting, ads, automations, all of it. You don't have to think about any of it.

I'd love to put together a quick look at what we'd specifically do for ${biz}. Not a pitch, just a 15-minute call to see if it makes sense.

Would any time this week work?

Mandy Fortune
The Dollhouse Brand Studio
shopdollhouse.co`,

    cold_dm:
`Hey ${fn} 👋

Love what you're doing with ${biz}. Quick question: are you handling your own social content right now, or does someone help you?

I run a done-for-you social media studio and I had a couple ideas for ${biz} that I think could really perform. Happy to share them — no strings.`,

    compliment:
`Subject: compliments to your team at ${biz}

Hi ${fn},

Just wanted to shoot you a quick email. I came across ${biz} and was genuinely impressed with what you're doing in the ${niche} space.

I wanted to share you on social media but noticed ${biz} isn't doing much with Facebook or Instagram. Any reason? I think more people need to hear about you.

Also where can I leave you a review? Happy to spread the word.

Mandy Fortune
shopdollhouse.co


(Send this follow-up 2 days later if they reply positively)

Hey ${fn}! Thanks for getting back to me and so glad you liked it.

For the social media side I'd genuinely love to help. A lot of other ${niche} businesses in ${city} are using it to get more clients right now and I think we could do the same for ${biz} pretty quickly.

Would love to chat for a few minutes if you're open to it. Mandy`,

    free_trial:
`Hey ${fn}, I just built a new AI system for ${niche} businesses. It helps [outcome — e.g. book more jobs automatically / never miss a lead / fill the calendar without ad spend].

I'm looking for a few businesses to test it out — would ${biz} want a free trial?`,

    followup_email:
`Subject: Re: ${biz}

Hi ${fn},

Just bumping this in case my last email got buried!

I had a few specific ideas for ${biz} that I think could really move the needle — happy to share them on a quick 15-minute call.

Would any time this week work for you?

— Mandy`,

    followup_dm:
`Hey ${fn} — just wanted to bump this up in case it got buried!

I genuinely think there's an opportunity for ${biz} here. Happy to share some specific ideas for your page — no strings.

Reply "yes" and I'll send them over 🙂`,

    free_video:
`Hey ${fn} — I reached out a few days ago. I'm the one who creates AI video clones of business owners for their social media.

I'd love to make one for ${biz} for free just to show you what it looks like. Would you be open to seeing it?`,

    book_call:
`Hi ${fn},

So glad you replied! I'd love to show you exactly what we'd do for ${biz}.

Would you be open to a quick 15-minute call? I can walk you through what we're doing for other ${niche} businesses in ${city} and share a few specific ideas I already have for your page.

Here's my calendar: [CALENDAR LINK]

Looking forward to connecting!
Mandy`,

    call_reply:
`Hi ${fn},

So great to hear from you. I think there's a real opportunity for ${biz} especially around ${pain} and I'd love to show you what that could look like.

Would [DAY] or [DAY] this week work for a quick 15-minute call? I'll show you exactly what we'd do and what the results look like for other ${niche} businesses.

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
Present all 3 tiers. Start with Offer 2 or 3 first. Walk down if needed. Never open with the cheapest option. Every package includes a $500 one-time setup.

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
              We build a custom AI avatar of the business owner — a digital twin that looks, sounds, and speaks like them — and use it to post branded video content automatically every week. They never film anything. They never script anything. Their AI character does it for them.
            </p>
            <div className="mt-4 grid sm:grid-cols-2 gap-2">
              {["Custom AI avatar built to look & sound like the owner","Branded video content scripted + produced weekly","Posted across Facebook, Instagram & TikTok automatically","Comments & DMs handled by AI — no lead goes cold"].map(f => (
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
const PW_HASH = "aa15f6cd8c0cb47ab513439d925bc35b9352f1f43718ce566613643804770458";

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
    if (email.toLowerCase().trim() === "hello@shopdollhouse.co" && h === PW_HASH) {
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
