from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "stanstore-assets"
OUT.mkdir(parents=True, exist_ok=True)

W, H = 1080, 4200
CREAM = "#fff8f3"
SOFT = "#fbefe9"
BLUSH = "#f4d6cf"
ROSE = "#bd6f70"
RED = "#bf3142"
INK = "#1f0f0b"
COCOA = "#5c4b45"
GOLD = "#c5a36a"
GOLD2 = "#e5cfaa"
WHITE = "#fffdf9"

FONT_DIR = Path("/System/Library/Fonts/Supplemental")
SERIF = str(FONT_DIR / "Georgia.ttf")
SERIF_I = str(FONT_DIR / "Georgia Italic.ttf")
SANS = str(FONT_DIR / "Arial.ttf")
SANS_B = str(FONT_DIR / "Arial Bold.ttf")


def font(path, size):
    return ImageFont.truetype(path, size)


def center(draw, text, y, fnt, fill, tracking=0):
    if tracking:
        total = sum(draw.textlength(ch, font=fnt) for ch in text) + tracking * (len(text) - 1)
        x = (W - total) / 2
        for ch in text:
            draw.text((x, y), ch, font=fnt, fill=fill)
            x += draw.textlength(ch, font=fnt) + tracking
        return
    box = draw.textbbox((0, 0), text, font=fnt)
    draw.text(((W - (box[2] - box[0])) / 2, y), text, font=fnt, fill=fill)


def center_at(draw, x, y, text, fnt, fill, tracking=0):
    if tracking:
        total = sum(draw.textlength(ch, font=fnt) for ch in text) + tracking * (len(text) - 1)
        xx = x - total / 2
        for ch in text:
            draw.text((xx, y), ch, font=fnt, fill=fill)
            xx += draw.textlength(ch, font=fnt) + tracking
        return
    box = draw.textbbox((0, 0), text, font=fnt)
    draw.text((x - (box[2] - box[0]) / 2, y), text, font=fnt, fill=fill)


def center_in_box(draw, text, box, fnt, fill, tracking=0):
    x1, y1, x2, y2 = box
    y = y1 + ((y2 - y1) - fnt.size) / 2 - 3
    center_at(draw, (x1 + x2) / 2, y, text, fnt, fill, tracking)


def text_box(draw, text, x, y, width, fnt, fill, line=1.26, align="left"):
    words, lines, current = text.split(), [], ""
    for word in words:
        test = f"{current} {word}".strip()
        if draw.textlength(test, font=fnt) > width and current:
            lines.append(current)
            current = word
        else:
            current = test
    if current:
        lines.append(current)
    lh = int(fnt.size * line)
    for i, line_text in enumerate(lines):
        if align == "center":
            line_width = draw.textlength(line_text, font=fnt)
            xx = x + (width - line_width) / 2
        else:
            xx = x
        draw.text((xx, y + i * lh), line_text, font=fnt, fill=fill)
    return y + len(lines) * lh


def rounded(img, size, radius):
    fitted = ImageOps.fit(img, size, Image.Resampling.LANCZOS)
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, *size), radius=radius, fill=255)
    out = Image.new("RGBA", size, (0, 0, 0, 0))
    out.paste(fitted, (0, 0), mask)
    return out


def arch(draw, x, y, scale=1.0, color=GOLD, width=5):
    w, h = int(66 * scale), int(86 * scale)
    draw.arc((x, y, x + w, y + h), 180, 360, fill=color, width=width)
    draw.line((x, y + h / 2, x, y + h), fill=color, width=width)
    draw.line((x + w, y + h / 2, x + w, y + h), fill=color, width=width)
    draw.rounded_rectangle((x + w * .34, y + h * .43, x + w * .66, y + h), radius=2, outline=color, width=max(2, width - 2))


def check_icon(draw, x, y, color=RED):
    draw.ellipse((x, y, x + 42, y + 42), outline=color, width=3)
    draw.line((x + 12, y + 22, x + 19, y + 29, x + 31, y + 14), fill=color, width=3)


def small_icon(draw, kind, x, y, color=RED):
    draw.ellipse((x, y, x + 82, y + 82), fill=SOFT, outline=GOLD2, width=2)
    cx, cy = x + 41, y + 41
    if kind == "arch":
        arch(draw, x + 24, y + 20, .46, color, 3)
    elif kind == "spark":
        pts = [(cx, cy - 24), (cx + 8, cy - 8), (cx + 24, cy), (cx + 8, cy + 8), (cx, cy + 24), (cx - 8, cy + 8), (cx - 24, cy), (cx - 8, cy - 8)]
        draw.line(pts + [pts[0]], fill=color, width=4, joint="curve")
    elif kind == "page":
        draw.rounded_rectangle((cx - 18, cy - 24, cx + 18, cy + 24), radius=4, outline=color, width=4)
        draw.line((cx - 9, cy - 6, cx + 10, cy - 6), fill=color, width=3)
        draw.line((cx - 9, cy + 8, cx + 10, cy + 8), fill=color, width=3)
    else:
        draw.arc((cx - 22, cy - 22, cx + 22, cy + 22), 35, 315, fill=color, width=4)
        draw.line((cx + 16, cy + 16, cx + 26, cy + 23), fill=color, width=4)


def pill(draw, text, box, fill=WHITE, outline=GOLD2, color=INK):
    draw.rounded_rectangle(box, radius=25, fill=fill, outline=outline, width=2)
    x1, y1, x2, y2 = box
    fnt = font(SANS_B, 16 if len(text) < 18 else 14)
    tw = draw.textlength(text.upper(), font=fnt)
    draw.text((x1 + (x2 - x1 - tw) / 2, y1 + 16), text.upper(), font=fnt, fill=color)


PRODUCTS = [
    {
        "slug": "brand-kit",
        "image": "product-brand-kit.jpg",
        "eyebrow": "PRIVATE STRATEGY SUITE",
        "title": "The Dollhouse Brand Kit",
        "line": "Your complete brand strategy, product plan, and launch roadmap.",
        "price": "$97",
        "regular": "$145",
        "value": "$497 value",
        "pain_head": "Stop guessing. Start building.",
        "pain": "If you are tired of overthinking your brand, second guessing every move, and buying random templates that still do not give you a real plan, this gives you one private place to build the foundation.",
        "inside_title": "17 guided strategy rooms",
        "inside": [
            ("Brand Foundation", "Mission, values, identity, voice, and direction."),
            ("Audience Clarity", "Who you serve, what they want, and why they buy."),
            ("Offer Planning", "Products, pricing, positioning, and buyer value."),
            ("Content Direction", "Messaging, visibility, social content, and launch notes."),
            ("Save + Export", "Keep your strategy organized and ready to use."),
        ],
        "perfect": ["new business owners", "beauty brands", "boutiques", "coaches", "creators", "digital product sellers"],
        "next": "Once your foundation is clear, The Dollhouse can help you move into managed marketing: content, AI clone videos, automation, and lead follow-up handled for you.",
        "cta": "JOIN THE DOLLHOUSE TODAY",
    },
    {
        "slug": "workbook",
        "image": "product-workbook.jpg",
        "eyebrow": "INTERACTIVE BRAND WORKBOOK",
        "title": "The Dollhouse Workbook",
        "line": "Build your brand from the ground up with guided prompts and clarity.",
        "price": "$47",
        "regular": "$261",
        "value": "bonus PDF included",
        "pain_head": "You know what you want to build.",
        "pain": "You just do not know where to start. This workbook helps you turn scattered ideas into a clear audience, offer, value, voice, content direction, and launch foundation.",
        "inside_title": "A guided path to brand clarity",
        "inside": [
            ("Foundation Prompts", "Clarify your mission, story, values, and direction."),
            ("Audience Mapping", "Understand who you serve and what they need."),
            ("Offer Clarity", "Map your product, transformation, pricing, and value."),
            ("Content Pillars", "Create themes you can actually post from."),
            ("Launch Readiness", "See what needs to be built before you promote."),
        ],
        "perfect": ["brand new founders", "creators", "service providers", "boutiques", "coaches", "side hustlers"],
        "next": "Use this as your first step. When your answers are clear, move into the Brand Kit or apply for managed marketing if your business is ready to sell consistently.",
        "cta": "GET THE WORKBOOK",
    },
    {
        "slug": "ai-prompt-kit",
        "image": "product-ai-prompt-kit.jpg",
        "eyebrow": "AI PROMPT KIT",
        "title": "The Dollhouse AI Prompt Kit",
        "line": "50+ prompts for captions, hooks, emails, offer copy, and launches.",
        "price": "$17",
        "regular": "",
        "value": "instant access",
        "pain_head": "Stop staring at the blank page.",
        "pain": "You do not need generic AI prompts. You need prompts that help you create content, emails, hooks, offer copy, and launch messages around a real brand strategy.",
        "inside_title": "50+ zero-blank-page prompts",
        "inside": [
            ("Captions + Hooks", "Post ideas, hooks, captions, and short-form angles."),
            ("Offer Copy", "Sales angles, product descriptions, and buyer value."),
            ("Email + SMS", "Launch notes, nurture messages, and reminders."),
            ("Brand Voice", "Tone prompts so AI sounds more like your brand."),
            ("Launch Content", "Promo moments, urgency, and selling posts."),
        ],
        "perfect": ["content creators", "online brands", "coaches", "product sellers", "service providers", "busy founders"],
        "next": "Pair it with the Workbook or Brand Kit for stronger outputs. If your offer is already live, The Dollhouse can take over the marketing system for you.",
        "cta": "GET THE PROMPTS",
    },
]


def bg():
    image = Image.new("RGBA", (W, H), CREAM)
    draw = ImageDraw.Draw(image)
    for y in range(H):
        r = int(255 - y / H * 8)
        g = int(248 - y / H * 21)
        b = int(243 - y / H * 25)
        draw.line((0, y, W, y), fill=(r, g, b, 255))
    draw.ellipse((-170, -120, 280, 340), fill=(244, 205, 198, 70))
    draw.ellipse((870, 240, 1230, 620), fill=(244, 205, 198, 50))
    draw.ellipse((-200, 3520, 420, 4250), fill=(244, 205, 198, 48))
    return image


def draw_header(draw, product, y=44):
    arch(draw, 507, y, .92, GOLD, 5)
    center(draw, product["eyebrow"], y + 98, font(SANS_B, 20), RED, 6)
    center(draw, "the", y + 166, font(SERIF_I, 60), ROSE)
    center(draw, product["title"].replace("The Dollhouse ", ""), y + 250, font(SERIF, 74), ROSE)
    center(draw, "THE DOLLHOUSE", y + 348, font(SANS_B, 20), GOLD, 6)
    text_box(draw, product["line"], 140, y + 424, 800, font(SANS_B, 28), INK, align="center")


def section_label(draw, y, text, color=INK):
    center(draw, text, y, font(SERIF, 45), color)
    draw.line((250, y + 58, 500, y + 58), fill=GOLD2, width=2)
    draw.line((580, y + 58, 830, y + 58), fill=GOLD2, width=2)
    center(draw, "+", y + 42, font(SERIF, 34), GOLD)


def create(product):
    page = bg()
    draw = ImageDraw.Draw(page)

    draw_header(draw, product)

    hero = Image.open(ROOT / "src" / "assets" / product["image"]).convert("RGB")
    shadow = Image.new("RGBA", (950, 660), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle((20, 20, 930, 640), radius=52, fill=(60, 30, 22, 58))
    shadow = shadow.filter(ImageFilter.GaussianBlur(26))
    page.alpha_composite(shadow, (65, 610))
    page.alpha_composite(rounded(hero, (910, 620), 48), (85, 625))
    draw.rounded_rectangle((85, 625, 995, 1245), radius=48, outline=GOLD2, width=3)

    stat_y = 1298
    for i, stat in enumerate(product["inside"][:4]):
        x = 100 + i * 245
        small_icon(draw, ["arch", "page", "spark", "arrow"][i], x + 36, stat_y, RED)
        first = stat[0].split()[0]
        rest = " ".join(stat[0].split()[1:])
        center_at(draw, x + 77, stat_y + 98, first, font(SANS_B, 20), INK)
        center_at(draw, x + 77, stat_y + 128, rest.upper(), font(SANS_B, 15), INK, 1)

    draw.rounded_rectangle((80, 1535, 1000, 1885), radius=40, fill=INK)
    center(draw, product["pain_head"].upper(), 1605, font(SANS_B, 39), WHITE, 4)
    text_box(draw, product["pain"], 145, 1684, 790, font(SANS, 28), "#eadfd8", align="center")

    section_label(draw, 2010, "What Is Inside")
    cards_y = 2110
    for i, (title, body) in enumerate(product["inside"]):
        x = 80 + (i % 2) * 470
        y = cards_y + (i // 2) * 190
        draw.rounded_rectangle((x, y, x + 445, y + 162), radius=28, fill=WHITE, outline=GOLD2, width=2)
        check_icon(draw, x + 24, y + 42)
        draw.text((x + 88, y + 32), title, font=font(SERIF, 24), fill=INK)
        text_box(draw, body, x + 88, y + 76, 310, font(SANS, 17), COCOA)

    draw.rounded_rectangle((80, 2720, 1000, 3120), radius=42, fill=WHITE, outline=GOLD2, width=2)
    section_label(draw, 2780, "Perfect For")
    for i, item in enumerate(product["perfect"]):
        x = 132 + (i % 3) * 272
        y = 2870 + (i // 3) * 76
        pill(draw, item, (x, y, x + 238, y + 54))

    draw.rounded_rectangle((80, 3200, 1000, 3495), radius=38, fill=SOFT, outline=GOLD2, width=2)
    center(draw, "After You Finish", 3260, font(SERIF, 38), INK)
    text_box(draw, product["next"], 150, 3330, 780, font(SANS_B, 23), COCOA, align="center")

    draw.rounded_rectangle((80, 3575, 1000, 4070), radius=44, fill=ROSE)
    draw.text((140, 3650), "Instant access after purchase", font=font(SANS_B, 30), fill=WHITE)
    draw.text((140, 3715), product["price"], font=font(SERIF, 96), fill=WHITE)
    if product["regular"]:
        draw.text((350, 3742), product["regular"], font=font(SANS, 34), fill="#eadbd5")
        draw.line((347, 3762, 445, 3762), fill="#eadbd5", width=3)
    draw.text((145, 3830), product["value"].upper(), font=font(SANS_B, 18), fill="#f8e5dd")
    draw.rounded_rectangle((560, 3714, 930, 3792), radius=39, fill=INK)
    center_in_box(draw, product["cta"], (560, 3714, 930, 3792), font(SANS_B, 17), WHITE, 2)
    center(draw, "ALL SALES FINAL DUE TO DIGITAL ACCESS", 3955, font(SANS, 18), "#f8e8e1", 3)
    center(draw, "Your brand. Built by you. Finished by The Dollhouse.", 4118, font(SERIF, 29), INK)

    out = OUT / f"{product['slug']}-stanstore-sales-page.jpg"
    page.convert("RGB").save(out, "JPEG", quality=95, optimize=True)
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
  <image href="./{product['slug']}-stanstore-sales-page.jpg" width="{W}" height="{H}" preserveAspectRatio="xMidYMid slice"/>
</svg>
'''
    (OUT / f"{product['slug']}-stanstore-sales-page.svg").write_text(svg)
    print(out)


for item in PRODUCTS:
    create(item)
