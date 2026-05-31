import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, extname, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const outDir = join(root, "public", "stanstore-assets");
mkdirSync(outDir, { recursive: true });

const W = 1080;
const H = 3600;

const colors = {
  cream: "#fff8f3",
  blush: "#f6d8d1",
  blush2: "#f1c3bd",
  rose: "#bd6f70",
  red: "#bf3142",
  ink: "#1f0f0b",
  cocoa: "#4f403b",
  gold: "#c5a36a",
  gold2: "#e3cfa8",
  soft: "#fbefe9",
  white: "#fffdf9",
};

const products = [
  {
    slug: "brand-kit",
    file: "product-brand-kit.jpg",
    eyebrow: "Private Strategy Suite",
    title: "The Dollhouse Brand Kit",
    subtitle: "Your complete brand strategy, product plan, and launch roadmap built for you.",
    price: "$97",
    compare: "$145",
    value: "$497 value",
    cta: "Join The Dollhouse Today",
    badge: "Best place to start",
    pain: "Tired of overthinking your brand, second guessing every move, and posting without seeing results?",
    promise: "The Brand Kit gives you one guided private web app to build the plan before you invest in content, ads, or a full marketing team.",
    stats: ["17 guided rooms", "custom strategy plan", "save and export", "private access"],
    inside: [
      ["Brand Foundation", "Define your mission, voice, values, identity, and business direction."],
      ["Audience Clarity", "Get clear on who you serve, what they want, and why they should trust you."],
      ["Offer Planning", "Shape your products, pricing, positioning, and value so people understand what to buy."],
      ["Marketing Roadmap", "Plan content, visibility, launch steps, website details, and next moves."],
      ["Export Tools", "Save your strategy so it is not scattered across notes, screenshots, and random ideas."],
    ],
    perfect: ["new business owners", "beauty brands", "boutiques", "coaches", "creators", "digital product sellers"],
    after: "Finish the Brand Kit, then apply for The Dollhouse managed marketing service when you are ready for done-for-you content, AI clone videos, automations, and lead follow-up.",
  },
  {
    slug: "workbook",
    file: "product-workbook.jpg",
    eyebrow: "Interactive Brand Workbook",
    title: "The Dollhouse Workbook",
    subtitle: "Build your brand from the ground up with guided prompts, worksheets, and clarity.",
    price: "$47",
    compare: "$261",
    value: "bonus PDF included",
    cta: "Get the Workbook",
    badge: "Beginner friendly",
    pain: "You know what you want to build, but you do not know where to start or how to organize your ideas.",
    promise: "The Workbook turns scattered thoughts into a usable brand foundation: audience, offer, value, voice, content pillars, and launch direction.",
    stats: ["brand foundation", "audience clarity", "offer planning", "bonus PDF"],
    inside: [
      ["Foundation Prompts", "Clarify your mission, story, values, and the direction behind your brand."],
      ["Audience Mapping", "Understand who you serve, what they need, and how your brand should be positioned."],
      ["Offer Clarity", "Map your product, service, transformation, pricing thoughts, and buyer value."],
      ["Content Pillars", "Turn your brand direction into themes you can actually post from."],
      ["Launch Readiness", "See what needs to be built before you promote, sell, or hire help."],
    ],
    perfect: ["brand new founders", "creators", "service providers", "boutiques", "coaches", "side hustlers"],
    after: "Use this as your first step. When your answers are clear, move into the Brand Kit or apply for managed marketing if your business is ready to sell consistently.",
  },
  {
    slug: "ai-prompt-kit",
    file: "product-ai-prompt-kit.jpg",
    eyebrow: "AI Prompt Kit",
    title: "The Dollhouse AI Prompt Kit",
    subtitle: "50+ ready-to-use prompts for captions, hooks, emails, offer copy, and launches.",
    price: "$17",
    compare: "",
    value: "instant access",
    cta: "Get the Prompts",
    badge: "Fastest win",
    pain: "You have ideas, but the blank page keeps slowing you down when it is time to write, launch, or post.",
    promise: "The Prompt Kit helps you use AI with better instructions, so your captions, emails, hooks, and offer copy start with strategy instead of random generic output.",
    stats: ["50+ prompts", "8 prompt rooms", "captions and hooks", "launch copy"],
    inside: [
      ["Caption Prompts", "Create content ideas, hooks, captions, carousel angles, and short-form video direction."],
      ["Offer Copy", "Generate product descriptions, value statements, sales angles, and buyer-focused messaging."],
      ["Email and SMS", "Draft nurture messages, launch notes, reminders, and follow-up sequences."],
      ["Brand Voice", "Shape your tone and direction so your AI output sounds more aligned."],
      ["Launch Prompts", "Plan launch content, promo angles, urgency moments, and selling posts."],
    ],
    perfect: ["content creators", "online brands", "coaches", "product sellers", "service providers", "busy founders"],
    after: "Pair it with the Workbook or Brand Kit for stronger outputs. If your offer is live, The Dollhouse can take over the marketing system for you.",
  },
];

function assetDataUri(fileName) {
  const filePath = join(root, "src", "assets", fileName);
  const ext = extname(fileName).slice(1).replace("jpg", "jpeg");
  return `data:image/${ext};base64,${readFileSync(filePath).toString("base64")}`;
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function wrap(text, maxChars) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (test.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function textBlock(text, x, y, maxChars, size, fill = colors.cocoa, opts = {}) {
  const lines = wrap(text, maxChars);
  const lineHeight = opts.lineHeight ?? size * 1.32;
  const weight = opts.weight ? `font-weight="${opts.weight}"` : "";
  const family = opts.serif ? "Georgia, 'Times New Roman', serif" : "Arial, Helvetica, sans-serif";
  const style = opts.italic ? "font-style=\"italic\"" : "";
  return `<text x="${x}" y="${y}" fill="${fill}" font-size="${size}" font-family="${family}" ${weight} ${style}>${lines
    .map((line, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : lineHeight}">${esc(line)}</tspan>`)
    .join("")}</text>`;
}

function pill(text, x, y, w, dark = false) {
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="54" rx="27" fill="${dark ? colors.ink : "transparent"}" stroke="${dark ? colors.ink : colors.gold}" stroke-width="2"/>
    <text x="${x + w / 2}" y="${y + 35}" text-anchor="middle" fill="${dark ? colors.white : colors.gold}" font-size="15" letter-spacing="5" font-family="Arial, Helvetica, sans-serif" font-weight="700">${esc(text.toUpperCase())}</text>
  </g>`;
}

function icon(type, x, y, color = colors.red) {
  if (type === "arch") {
    return `<path d="M${x + 18} ${y + 54}V${y + 26}c0-17 13-30 30-30s30 13 30 30v28M${x + 34} ${y + 54}V${y + 27}c0-8 6-14 14-14s14 6 14 14v27" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round"/>`;
  }
  if (type === "clipboard") {
    return `<path d="M${x + 24} ${y + 13}h48v58H24zM39 ${y + 13}v-8h18v8M37 ${y + 31}h22M37 ${y + 45}h22M37 ${y + 59}h18" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round"/>`;
  }
  if (type === "rocket") {
    return `<path d="M${x + 50} ${y + 8}c17 12 16 39-4 59l-17-17C49 ${y + 30} 38 ${y + 13} 50 ${y + 8}zM${x + 31} ${y + 52}l-14 8 8-14M${x + 54} ${y + 75}l8-14-14 8" fill="none" stroke="${color}" stroke-width="5" stroke-linejoin="round"/>`;
  }
  if (type === "spark") {
    return `<path d="M${x + 48} ${y + 8}l9 26 26 9-26 9-9 26-9-26-26-9 26-9z" fill="none" stroke="${color}" stroke-width="5" stroke-linejoin="round"/>`;
  }
  if (type === "heart") {
    return `<path d="M${x + 48} ${y + 72}S18 ${y + 50}18 ${y + 28}c0-12 16-20 30-4 14-16 30-8 30 4 0 22-30 44-30 44z" fill="none" stroke="${color}" stroke-width="5" stroke-linejoin="round"/>`;
  }
  return `<circle cx="${x + 48}" cy="${y + 42}" r="28" fill="none" stroke="${color}" stroke-width="5"/><path d="M${x + 33} ${y + 42}l10 10 22-24" fill="none" stroke="${color}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function sectionTitle(title, y) {
  return `<text x="540" y="${y}" text-anchor="middle" fill="${colors.ink}" font-size="42" font-family="Georgia, 'Times New Roman', serif">${esc(title)}</text>
  <line x1="260" y1="${y + 28}" x2="500" y2="${y + 28}" stroke="${colors.gold2}" stroke-width="2"/>
  <text x="540" y="${y + 38}" text-anchor="middle" fill="${colors.gold}" font-size="28" font-family="Georgia, 'Times New Roman', serif">♥</text>
  <line x1="580" y1="${y + 28}" x2="820" y2="${y + 28}" stroke="${colors.gold2}" stroke-width="2"/>`;
}

function roseBackground() {
  return `<g opacity="0.22">
    <circle cx="20" cy="30" r="150" fill="${colors.blush2}"/>
    <circle cx="1070" cy="430" r="170" fill="${colors.blush2}"/>
    <circle cx="130" cy="3500" r="180" fill="${colors.blush}"/>
    <path d="M0 820 C130 730 260 840 390 740 S650 610 800 760 960 940 1080 820 V0 H0z" fill="${colors.blush}"/>
    <path d="M0 3320 C210 3180 320 3400 530 3260 S880 3130 1080 3260 V3600 H0z" fill="${colors.blush}"/>
  </g>`;
}

function buildSvg(product) {
  const image = assetDataUri(product.file);
  const iconTypes = ["arch", "clipboard", "spark", "rocket"];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${colors.cream}"/>
      <stop offset="45%" stop-color="${colors.soft}"/>
      <stop offset="100%" stop-color="${colors.blush}"/>
    </linearGradient>
    <clipPath id="heroClip"><rect x="90" y="670" width="900" height="610" rx="44"/></clipPath>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#5a342b" flood-opacity="0.18"/>
    </filter>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${roseBackground()}

  <g transform="translate(492 48) scale(1.05)">${icon("arch", 0, 0, colors.gold)}</g>
  <text x="540" y="185" text-anchor="middle" fill="${colors.red}" font-size="22" letter-spacing="8" font-family="Arial, Helvetica, sans-serif" font-weight="700">${esc(product.eyebrow.toUpperCase())}</text>
  <text x="540" y="315" text-anchor="middle" fill="${colors.rose}" font-size="76" font-family="Georgia, 'Times New Roman', serif" font-style="italic">the</text>
  <text x="540" y="450" text-anchor="middle" fill="${colors.rose}" font-size="88" font-family="Georgia, 'Times New Roman', serif">${esc(product.title.replace("The Dollhouse ", ""))}</text>
  <text x="540" y="524" text-anchor="middle" fill="${colors.gold}" font-size="22" letter-spacing="7" font-family="Arial, Helvetica, sans-serif" font-weight="700">THE DOLLHOUSE</text>
  ${textBlock(product.subtitle, 160, 610, 50, 31, colors.ink, { weight: 600 })}

  <rect x="90" y="670" width="900" height="610" rx="44" fill="${colors.white}" opacity="0.9" filter="url(#shadow)"/>
  <image href="${image}" x="90" y="670" width="900" height="610" preserveAspectRatio="xMidYMid slice" clip-path="url(#heroClip)"/>
  <rect x="90" y="670" width="900" height="610" rx="44" fill="none" stroke="${colors.gold2}" stroke-width="3"/>

  <g transform="translate(95 1330)">
    ${product.stats
      .map((s, i) => {
        const x = i * 245;
        return `<g transform="translate(${x} 0)">
          <circle cx="80" cy="58" r="52" fill="${colors.soft}" stroke="${colors.gold2}" stroke-width="2"/>
          <g transform="translate(31 18) scale(.75)">${icon(iconTypes[i], 0, 0, colors.red)}</g>
          <text x="80" y="145" text-anchor="middle" fill="${colors.ink}" font-size="24" font-family="Arial, Helvetica, sans-serif" font-weight="800">${esc(s.split(" ")[0])}</text>
          <text x="80" y="177" text-anchor="middle" fill="${colors.ink}" font-size="18" letter-spacing="2" font-family="Arial, Helvetica, sans-serif">${esc(s.split(" ").slice(1).join(" ").toUpperCase())}</text>
        </g>`;
      })
      .join("")}
  </g>

  <rect x="80" y="1565" width="920" height="310" rx="34" fill="${colors.ink}"/>
  <text x="540" y="1640" text-anchor="middle" fill="${colors.white}" font-size="43" letter-spacing="4" font-family="Arial, Helvetica, sans-serif" font-weight="900">STOP GUESSING.</text>
  ${textBlock(product.pain, 160, 1705, 58, 31, "#eadfd8", { weight: 500 })}
  ${textBlock(product.promise, 160, 1800, 64, 25, "#cdbfb7", { weight: 500 })}

  ${sectionTitle("What You Get", 1985)}
  <g transform="translate(80 2070)">
  ${product.inside
    .map(([title, body], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = col * 470;
      const y = row * 190;
      return `<g transform="translate(${x} ${y})">
        <rect width="445" height="162" rx="26" fill="${colors.white}" stroke="${colors.gold2}" stroke-width="2"/>
        <g transform="translate(22 22) scale(.56)">${icon(i % 2 ? "spark" : "check", 0, 0, colors.red)}</g>
        <text x="100" y="50" fill="${colors.ink}" font-size="24" font-family="Georgia, 'Times New Roman', serif">${esc(title)}</text>
        ${textBlock(body, 100, 88, 35, 17, colors.cocoa)}
      </g>`;
    })
    .join("")}
  </g>

  <rect x="80" y="2690" width="920" height="315" rx="34" fill="${colors.white}" stroke="${colors.gold2}" stroke-width="2"/>
  <text x="540" y="2765" text-anchor="middle" fill="${colors.ink}" font-size="39" font-family="Georgia, 'Times New Roman', serif">Perfect For</text>
  <g transform="translate(140 2815)">
    ${product.perfect
      .map((item, i) => {
        const x = (i % 3) * 270;
        const y = Math.floor(i / 3) * 76;
        return `${pill(item, x, y, 235)}`;
      })
      .join("")}
  </g>
  ${textBlock(product.after, 130, 2985, 74, 23, colors.cocoa, { weight: 600 })}

  <rect x="80" y="3135" width="920" height="300" rx="38" fill="${colors.rose}"/>
  <text x="150" y="3225" fill="${colors.white}" font-size="32" font-family="Arial, Helvetica, sans-serif" font-weight="800">Instant access after purchase</text>
  <text x="150" y="3290" fill="${colors.white}" font-size="85" font-family="Georgia, 'Times New Roman', serif">${esc(product.price)}</text>
  ${product.compare ? `<text x="340" y="3282" fill="#eadbd5" font-size="34" font-family="Arial, Helvetica, sans-serif" text-decoration="line-through">${esc(product.compare)}</text>` : ""}
  <text x="150" y="3335" fill="#f5dfd6" font-size="20" letter-spacing="4" font-family="Arial, Helvetica, sans-serif">${esc(product.value.toUpperCase())}</text>
  ${pill(product.cta, 515, 3238, 410, true)}
  <text x="540" y="3405" text-anchor="middle" fill="#f8e8e1" font-size="17" letter-spacing="3" font-family="Arial, Helvetica, sans-serif">ALL SALES FINAL DUE TO DIGITAL ACCESS</text>

  <text x="540" y="3522" text-anchor="middle" fill="${colors.ink}" font-size="29" font-family="Georgia, 'Times New Roman', serif">Your brand. Built by you. Finished by The Dollhouse.</text>
  <text x="540" y="3570" text-anchor="middle" fill="${colors.rose}" font-size="18" letter-spacing="5" font-family="Arial, Helvetica, sans-serif" font-weight="700">${esc(product.badge.toUpperCase())}</text>
</svg>`;
}

for (const product of products) {
  const svg = buildSvg(product);
  const filePath = join(outDir, `${product.slug}-stanstore-sales-page.svg`);
  writeFileSync(filePath, svg);
  console.log(`Wrote ${basename(filePath)}`);
}
