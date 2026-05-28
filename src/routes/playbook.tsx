import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/playbook")({ component: PlaybookPage });

const FONT_DISPLAY = "'Cormorant Garamond', serif";
const FONT_BODY = "'DM Sans', sans-serif";
const FONT_LUXE = "'Jost', sans-serif";
const FONT_SCRIPT = "'Allura', cursive";

/* ─── Types ───────────────────────────────────────────── */
type Tab = "workflow" | "monthly" | "prompts" | "outreach" | "newhire";

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

      <Phase day="Day 1–2" title="Onboarding" items={[
        { text: "Send welcome email with onboarding questionnaire", sub: "Brand voice, target audience, competitors they love, content pillars, posting goals." },
        { text: "Request all brand assets", sub: "Logo files (PNG + SVG), brand colors (hex codes), fonts, any existing photos or video." },
        { text: "Get social media logins or request admin access", sub: "Facebook Business Manager, Instagram, TikTok, Google Business if applicable." },
        { text: "Set up client in the platform", sub: "Create contact, pipeline stage, add tags, set up automations." },
        { text: "Verify Meta ad account access + pixel is installed", sub: "If no pixel — walk them through installing it or do it via GTM." },
      ]} />

      <Phase day="Day 3–5" title="Account Setup" items={[
        { text: "Audit their existing social profiles", sub: "Bio, profile photo, link in bio, pinned posts, highlight covers if applicable." },
        { text: "Update or optimize profiles where needed" },
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
        { text: "Launch any ad campaigns — confirm budget, audience, creative" },
        { text: "Send client a 'You're live!' message with what to expect this month" },
        { text: "Set up Comment-to-DM automation in the platform", sub: "Trigger: Instagram comment on any post → AI agent auto-replies in comments + sends a DM. This turns every comment into a conversation and signals the algorithm to push content further." },
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
      ]} />
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
  ];

  return (
    <div className="space-y-6">
      <SectionHeader label="Prompt Library" title="Copy. Paste. Customize. Done." sub="Every prompt you need to create client work. Replace bracketed placeholders with client details. Never start from scratch." />
      <div className="space-y-4">
        {prompts.map((p) => <PromptCard key={p.title} {...p} />)}
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
      <SectionHeader label="Outreach Scripts" title="How to get clients." sub="Scripts for cold email, DMs, calls, and follow-ups. Customize the bracketed fields for each prospect. Always be specific — never send a generic message." />
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

/* ─── Page ─────────────────────────────────────────────── */
function PlaybookPage() {
  const [tab, setTab] = useState<Tab>("workflow");

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "workflow", label: "Client Workflow", icon: "📋" },
    { id: "monthly", label: "Monthly Process", icon: "📅" },
    { id: "prompts", label: "Content Prompts", icon: "✍️" },
    { id: "outreach", label: "Outreach Scripts", icon: "📞" },
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
