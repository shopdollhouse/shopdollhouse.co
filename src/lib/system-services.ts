export type SystemService = {
  slug: string;
  icon: string;
  title: string;
  short: string;
  plain: string;
  helps: string[];
  steps: { title: string; body: string }[];
  visualTitle: string;
  visualItems: string[];
  result: string;
};

export const systemServices: SystemService[] = [
  {
    slug: "functional-website",
    icon: "website",
    title: "Functional Website",
    short: "A lead-generating 10-20 page website built to turn visits into text conversations.",
    plain: "This is a website that helps people contact you fast. It gives visitors clear buttons, forms, chat, and phone links. When someone asks for help, the system can send a text so the conversation starts right away.",
    helps: ["People know what you offer.", "Leads can ask for a quote.", "You get messages by text, not lost email.", "Your site feels clear and professional."],
    steps: [
      { title: "Visitor lands on your site", body: "They see what you do and how to contact you." },
      { title: "They click, chat, or fill a form", body: "The website makes the next step simple." },
      { title: "A text conversation starts", body: "You and the lead can talk quickly." },
    ],
    visualTitle: "Website lead flow",
    visualItems: ["Visit", "Quote Form", "SMS Reply", "Booked Lead"],
    result: "Your website becomes a place that starts real conversations.",
  },
  {
    slug: "missed-call-text-back",
    icon: "phone",
    title: "Missed Call Text Back",
    short: "Automatically text missed callers so warm leads get a fast response.",
    plain: "When someone calls and you miss it, they get a text back right away. This helps them feel seen. It also keeps them from calling another business.",
    helps: ["Leads get a fast reply.", "You look more professional.", "People can text instead of waiting.", "Fewer warm leads go cold."],
    steps: [
      { title: "A lead calls you", body: "You may be busy, with a client, or closed." },
      { title: "The call is missed", body: "The system sees the missed call." },
      { title: "They get a text", body: "The text invites them to reply or book." },
    ],
    visualTitle: "Missed call rescue",
    visualItems: ["Call", "Missed", "Auto Text", "Conversation"],
    result: "Missed calls become text conversations.",
  },
  {
    slug: "merch-design",
    icon: "print",
    title: "Merch Design",
    short: "Design polished merch and brand pieces that make your business feel memorable.",
    plain: "Merch design helps your brand show up in real life. This can be shirts, bags, stickers, cards, inserts, packaging, or event pieces that look like they belong to your brand.",
    helps: ["Your brand looks put together.", "Customers remember you.", "Your online and offline look match.", "You have designs for events, shops, packages, and launches."],
    steps: [
      { title: "Choose what you need", body: "Pick the merch or brand pieces that fit your business." },
      { title: "We match your brand", body: "The colors, fonts, and style stay consistent." },
      { title: "You use them in real life", body: "Wear them, sell them, place them in orders, or use them at events." },
    ],
    visualTitle: "Merch design flow",
    visualItems: ["Idea", "Mockup", "Design", "Launch"],
    result: "Your business gets brand pieces people can see, use, and remember.",
  },
  {
    slug: "all-in-one-inbox",
    icon: "inbox",
    title: "All-In-One Inbox",
    short: "Keep messages from your website, forms, calls, and campaigns in one place.",
    plain: "This inbox puts your messages in one place. You do not need to check many apps to find leads. It helps you reply faster and stay organized.",
    helps: ["Messages are easier to find.", "Leads are less likely to be missed.", "Your team can see conversations.", "You can follow up from one place."],
    steps: [
      { title: "Messages come in", body: "Website chats, forms, calls, and texts arrive." },
      { title: "They collect in one inbox", body: "You can see the lead history." },
      { title: "You reply or follow up", body: "The conversation keeps moving." },
    ],
    visualTitle: "One inbox view",
    visualItems: ["Chat", "Text", "Form", "Call"],
    result: "You stop losing leads across different apps.",
  },
  {
    slug: "business-phone",
    icon: "bot",
    title: "Business Phone",
    short: "Separate business and personal while keeping calls and texts easy to manage.",
    plain: "A business phone gives your company its own number. People can call or text the business without using your personal number. It keeps work messages cleaner.",
    helps: ["Your personal number stays private.", "Customers get a clear business contact.", "Calls and texts are easier to track.", "Your brand feels more official."],
    steps: [
      { title: "Business number is set up", body: "Clients use one clear number for your business." },
      { title: "Calls and texts arrive", body: "You can keep them separate from personal messages." },
      { title: "Follow-up is easier", body: "Your team knows who needs a reply." },
    ],
    visualTitle: "Business line",
    visualItems: ["Number", "Call", "Text", "Reply"],
    result: "Your business communication feels cleaner and more professional.",
  },
  {
    slug: "local-seo",
    icon: "search",
    title: "Local SEO",
    short: "Help your business get found on Google with optimized pages and local signals.",
    plain: "Local SEO helps nearby people find you online. We make your website easier for Google to understand. This helps people find your services when they search.",
    helps: ["Google can understand your pages.", "Local customers can find you.", "Your site uses better keywords.", "Images and pages load cleaner."],
    steps: [
      { title: "Find search words", body: "We look for words customers already type." },
      { title: "Clean up your pages", body: "We add helpful headings, text, image tags, and structure." },
      { title: "Help Google read it", body: "Your site becomes easier to understand." },
    ],
    visualTitle: "Local search path",
    visualItems: ["Search", "Find", "Click", "Contact"],
    result: "More local people can discover your business.",
  },
  {
    slug: "review-funnel",
    icon: "star",
    title: "5-Star Magic Review Funnel",
    short: "Get more 5-star reviews and route private feedback before it becomes public.",
    plain: "This system asks happy customers for reviews. If someone is unhappy, they can share feedback privately first. This helps protect your public reputation.",
    helps: ["Happy clients leave reviews.", "Private feedback comes to you first.", "Your 5-star proof grows.", "New customers trust you faster."],
    steps: [
      { title: "Customer finishes service", body: "The best time to ask is after a good experience." },
      { title: "They get a review request", body: "The message makes leaving a review easy." },
      { title: "Good reviews go public", body: "Private concerns can be handled first." },
    ],
    visualTitle: "Review path",
    visualItems: ["Client", "Request", "5 Stars", "Trust"],
    result: "Your best customers help new customers trust you.",
  },
  {
    slug: "one-click-marketing-campaigns",
    icon: "campaign",
    title: "One-Click Marketing Campaigns",
    short: "Send simple referral, promo, and reactivation campaigns without starting from scratch.",
    plain: "These are ready-to-send campaigns for past customers and warm leads. You can send a special offer, referral ask, or reminder without building a new campaign every time.",
    helps: ["Past customers remember you.", "Referrals are easier to ask for.", "Promos can go out fast.", "You do not start from a blank page."],
    steps: [
      { title: "Campaign is prepared", body: "The message and offer are already built." },
      { title: "You approve it", body: "You check the details before it goes out." },
      { title: "Customers hear from you", body: "They can book, buy, or refer a friend." },
    ],
    visualTitle: "Campaign flow",
    visualItems: ["Offer", "Click", "Send", "Bookings"],
    result: "You stay in front of people who already know you.",
  },
  {
    slug: "automated-lead-follow-up",
    icon: "message",
    title: "Automated Lead Follow-Up",
    short: "Follow up with leads by text so inquiries turn into conversations faster.",
    plain: "This system sends helpful texts after someone contacts you. It keeps checking in so the lead does not forget. You look fast, friendly, and organized.",
    helps: ["New leads hear from you quickly.", "Warm leads get reminders.", "Booking feels easier.", "You spend less time chasing people."],
    steps: [
      { title: "Lead asks for info", body: "They fill a form, call, or message you." },
      { title: "Texts go out", body: "The system sends a quick reply and reminders." },
      { title: "Lead takes the next step", body: "They can reply, book, or ask a question." },
    ],
    visualTitle: "Follow-up ladder",
    visualItems: ["New Lead", "Text", "Reminder", "Booked"],
    result: "More leads get a real chance to become customers.",
  },
];

export const getSystemService = (slug: string) =>
  systemServices.find((service) => service.slug === slug);
