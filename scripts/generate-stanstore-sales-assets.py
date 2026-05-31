from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import textwrap

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "stanstore-assets"
OUT.mkdir(parents=True, exist_ok=True)

W, H = 1080, 3600
CREAM = "#fff8f3"
SOFT = "#fbefe9"
BLUSH = "#f3d2cb"
ROSE = "#bd6f70"
RED = "#bf3142"
INK = "#1f0f0b"
COCOA = "#594944"
GOLD = "#c5a36a"
GOLD2 = "#e7d2ad"
WHITE = "#fffdf9"

FONT_DIR = Path("/System/Library/Fonts/Supplemental")
SERIF = str(FONT_DIR / "Georgia.ttf")
SERIF_I = str(FONT_DIR / "Georgia Italic.ttf")
SANS = str(FONT_DIR / "Arial.ttf")
SANS_B = str(FONT_DIR / "Arial Bold.ttf")


def font(path, size):
    return ImageFont.truetype(path, size)


F = {
    "eyebrow": font(SANS_B, 22),
    "script": font(SERIF_I, 70),
    "hero": font(SERIF, 82),
    "brand": font(SANS_B, 22),
    "body": font(SANS, 30),
    "body_b": font(SANS_B, 30),
    "small": font(SANS, 21),
    "small_b": font(SANS_B, 21),
    "section": font(SERIF, 43),
    "card": font(SERIF, 25),
    "price": font(SERIF, 92),
    "price_small": font(SANS, 34),
    "cta": font(SANS_B, 20),
}


PRODUCTS = [
    {
        "slug": "brand-kit",
        "file": "product-brand-kit.jpg",
        "eyebrow": "Private Strategy Suite",
        "title": "Brand Kit",
        "subtitle": "Your complete brand strategy, product plan, and launch roadmap built for you.",
        "price": "$97",
        "compare": "$145",
        "value": "$497 value",
        "cta": "Join The Dollhouse Today",
        "pain": "Tired of overthinking your brand, second guessing every move, and posting without seeing results?",
        "promise": "The Brand Kit gives you one guided private web app to build the plan before you invest in content, ads, or a full marketing team.",
        "stats": ["17 guided rooms", "custom strategy plan", "save and export", "private access"],
        "inside": [
            ("Brand Foundation", "Define your mission, voice, values, identity, and business direction."),
            ("Audience Clarity", "Get clear on who you serve, what they want, and why they should trust you."),
            ("Offer Planning", "Shape products, pricing, positioning, and value so people understand what to buy."),
            ("Marketing Roadmap", "Plan content, visibility, launch steps, website details, and next moves."),
            ("Export Tools", "Save your strategy so it is not scattered across notes and screenshots."),
        ],
        "perfect": ["new business owners", "beauty brands", "boutiques", "coaches", "creators", "digital product sellers"],
        "after": "Finish the Brand Kit, then apply for The Dollhouse managed marketing service when you are ready for done-for-you content, AI clone videos, automations, and lead follow-up.",
    },
    {
        "slug": "workbook",
        "file": "product-workbook.jpg",
        "eyebrow": "Interactive Brand Workbook",
        "title": "Workbook",
        "subtitle": "Build your brand from the ground up with guided prompts, worksheets, and clarity.",
        "price": "$47",
        "compare": "$261",
        "value": "bonus PDF included",
        "cta": "Get the Workbook",
        "pain": "You know what you want to build, but you do not know where to start or how to organize your ideas.",
        "promise": "The Workbook turns scattered thoughts into a usable brand foundation: audience, offer, value, voice, content pillars, and launch direction.",
        "stats": ["brand foundation", "audience clarity", "offer planning", "bonus PDF"],
        "inside": [
            ("Foundation Prompts", "Clarify your mission, story, values, and the direction behind your brand."),
            ("Audience Mapping", "Understand who you serve, what they need, and how your brand should be positioned."),
            ("Offer Clarity", "Map your product, service, transformation, pricing thoughts, and buyer value."),
            ("Content Pillars", "Turn your brand direction into themes you can actually post from."),
            ("Launch Readiness", "See what needs to be built before you promote, sell, or hire help."),
        ],
        "perfect": ["brand new founders", "creators", "service providers", "boutiques", "coaches", "side hustlers"],
        "after": "Use this as your first step. When your answers are clear, move into the Brand Kit or apply for managed marketing if your business is ready to sell consistently.",
    },
    {
        "slug": "ai-prompt-kit",
        "file": "product-ai-prompt-kit.jpg",
        "eyebrow": "AI Prompt Kit",
        "title": "AI Prompt Kit",
        "subtitle": "50+ ready-to-use prompts for captions, hooks, emails, offer copy, and launches.",
        "price": "$17",
        "compare": "",
        "value": "instant access",
        "cta": "Get the Prompts",
        "pain": "You have ideas, but the blank page keeps slowing you down when it is time to write, launch, or post.",
        "promise": "The Prompt Kit helps you use AI with better instructions, so your captions, emails, hooks, and offer copy start with strategy instead of random generic output.",
        "stats": ["50+ prompts", "8 prompt rooms", "captions and hooks", "launch copy"],
        "inside": [
            ("Caption Prompts", "Create content ideas, hooks, captions, carousel angles, and short-form video direction."),
            ("Offer Copy", "Generate product descriptions, value statements, sales angles, and buyer-focused messaging."),
            ("Email and SMS", "Draft nurture messages, launch notes, reminders, and follow-up sequences."),
            ("Brand Voice", "Shape your tone so your AI output sounds more aligned."),
            ("Launch Prompts", "Plan launch content, promo angles, urgency moments, and selling posts."),
        ],
        "perfect": ["content creators", "online brands", "coaches", "product sellers", "service providers", "busy founders"],
        "after": "Pair it with the Workbook or Brand Kit for stronger outputs. If your offer is live, The Dollhouse can take over the marketing system for you.",
    },
]


def rounded_image(img, size, radius):
    cropped = ImageOps.fit(img, size, Image.Resampling.LANCZOS)
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    out = Image.new("RGBA", size, (0, 0, 0, 0))
    out.paste(cropped, (0, 0), mask)
    return out


from PIL import ImageOps


def text_center(draw, xy, text, fnt, fill, spacing=0):
    x, y = xy
    if spacing:
        total = sum(draw.textlength(ch, font=fnt) for ch in text) + spacing * (len(text) - 1)
        start = x - total / 2
        for ch in text:
            draw.text((start, y), ch, font=fnt, fill=fill)
            start += draw.textlength(ch, font=fnt) + spacing
    else:
        box = draw.textbbox((0, 0), text, font=fnt)
        draw.text((x - (box[2] - box[0]) / 2, y), text, font=fnt, fill=fill)


def wrap_draw(draw, text, xy, fnt, fill, width, line=1.28, bold=False):
    x, y = xy
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
    for i, item in enumerate(lines):
        draw.text((x, y + i * int(fnt.size * line)), item, font=fnt, fill=fill)
    return y + len(lines) * int(fnt.size * line)


def draw_arch(draw, x, y, scale=1.0, color=GOLD, width=5):
    w, h = int(72 * scale), int(92 * scale)
    draw.arc((x, y, x + w, y + h), 180, 360, fill=color, width=width)
    draw.line((x, y + h / 2, x, y + h), fill=color, width=width)
    draw.line((x + w, y + h / 2, x + w, y + h), fill=color, width=width)
    draw.rounded_rectangle((x + w * .33, y + h * .42, x + w * .67, y + h), radius=3, outline=color, width=width - 2)


def draw_icon(draw, kind, x, y, color=RED):
    draw.ellipse((x, y, x + 104, y + 104), outline=GOLD2, width=2, fill=SOFT)
    cx, cy = x + 52, y + 52
    if kind == "arch":
        draw_arch(draw, x + 27, y + 23, .7, color, 4)
    elif kind == "clipboard":
        draw.rounded_rectangle((cx - 22, cy - 28, cx + 22, cy + 30), radius=5, outline=color, width=5)
        draw.line((cx - 13, cy - 8, cx + 13, cy - 8), fill=color, width=4)
        draw.line((cx - 13, cy + 9, cx + 13, cy + 9), fill=color, width=4)
    elif kind == "spark":
        pts = [(cx, cy - 32), (cx + 10, cy - 10), (cx + 32, cy), (cx + 10, cy + 10), (cx, cy + 32), (cx - 10, cy + 10), (cx - 32, cy), (cx - 10, cy - 10)]
        draw.line(pts + [pts[0]], fill=color, width=5, joint="curve")
    else:
        draw.arc((cx - 28, cy - 28, cx + 28, cy + 28), 40, 320, fill=color, width=5)
        draw.line((cx + 18, cy + 18, cx + 32, cy + 27), fill=color, width=5)


def draw_pill(draw, box, label, fill=None, outline=GOLD2, color=COCOA):
    draw.rounded_rectangle(box, radius=28, fill=fill or (255, 255, 255, 0), outline=outline, width=2)
    x1, y1, x2, y2 = box
    label_font = font(SANS_B, 18 if len(label) < 18 else 15)
    text_center(draw, ((x1 + x2) / 2, y1 + 17), label.upper(), label_font, color, 1)


def create(product):
    base = Image.new("RGB", (W, H), CREAM)
    bg = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    bd = ImageDraw.Draw(bg)
    for y in range(H):
        r = int(255 - y / H * 10)
        g = int(248 - y / H * 24)
        b = int(243 - y / H * 30)
        bd.line((0, y, W, y), fill=(r, g, b, 255))
    bd.ellipse((-160, -100, 230, 300), fill=(243, 194, 188, 64))
    bd.ellipse((900, 360, 1240, 720), fill=(243, 194, 188, 56))
    bd.ellipse((-120, 3220, 360, 3690), fill=(243, 194, 188, 58))
    base = Image.alpha_composite(base.convert("RGBA"), bg)
    draw = ImageDraw.Draw(base)

    draw_arch(draw, 507, 44, .9, GOLD, 5)
    text_center(draw, (540, 150), product["eyebrow"].upper(), F["eyebrow"], RED, 7)
    text_center(draw, (540, 235), "the", F["script"], ROSE)
    text_center(draw, (540, 355), product["title"], F["hero"], ROSE)
    text_center(draw, (540, 476), "THE DOLLHOUSE", F["brand"], GOLD, 7)
    wrap_draw(draw, product["subtitle"], (160, 555), F["body_b"], INK, 760)

    hero = Image.open(ROOT / "src" / "assets" / product["file"]).convert("RGB")
    shadow = Image.new("RGBA", (930, 640), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle((15, 15, 915, 625), radius=44, fill=(80, 42, 30, 55))
    shadow = shadow.filter(ImageFilter.GaussianBlur(24))
    base.alpha_composite(shadow, (75, 650))
    base.alpha_composite(rounded_image(hero, (900, 610), 44), (90, 670))
    draw.rounded_rectangle((90, 670, 990, 1280), radius=44, outline=GOLD2, width=3)

    icons = ["arch", "clipboard", "spark", "rocket"]
    for i, item in enumerate(product["stats"]):
        x = 100 + i * 245
        draw_icon(draw, icons[i], x + 35, 1340)
        first, *rest = item.split()
        text_center(draw, (x + 87, 1463), first, F["small_b"], INK)
        text_center(draw, (x + 87, 1496), " ".join(rest).upper(), F["small_b"], INK, 2)

    draw.rounded_rectangle((80, 1570, 1000, 1885), radius=34, fill=INK)
    text_center(draw, (540, 1632), "STOP GUESSING.", font(SANS_B, 43), WHITE, 6)
    y = wrap_draw(draw, product["pain"], (160, 1700), F["body"], "#eadfd8", 760)
    wrap_draw(draw, product["promise"], (160, y + 20), F["small"], "#d8c9c0", 760)

    text_center(draw, (540, 1988), "What You Get", F["section"], INK)
    draw.line((250, 2042, 500, 2042), fill=GOLD2, width=2)
    draw.line((580, 2042, 830, 2042), fill=GOLD2, width=2)
    text_center(draw, (540, 2028), "+", F["section"], GOLD)

    for i, (title, body) in enumerate(product["inside"]):
        col = i % 2
        row = i // 2
        x = 80 + col * 470
        y = 2100 + row * 190
        draw.rounded_rectangle((x, y, x + 445, y + 162), radius=26, fill=WHITE, outline=GOLD2, width=2)
        draw.ellipse((x + 24, y + 43, x + 56, y + 75), outline=RED, width=3)
        draw.line((x + 33, y + 60, x + 40, y + 67, x + 50, y + 52), fill=RED, width=3)
        draw.text((x + 88, y + 34), title, font=F["card"], fill=INK)
        wrap_draw(draw, body, (x + 88, y + 78), font(SANS, 17), COCOA, 315)

    draw.rounded_rectangle((80, 2690, 1000, 3090), radius=34, fill=WHITE, outline=GOLD2, width=2)
    text_center(draw, (540, 2760), "Perfect For", F["section"], INK)
    for i, item in enumerate(product["perfect"]):
        x = 135 + (i % 3) * 270
        y = 2820 + (i // 3) * 76
        draw_pill(draw, (x, y, x + 235, y + 54), item)
    wrap_draw(draw, product["after"], (130, 2988), font(SANS_B, 18), COCOA, 820)

    draw.rounded_rectangle((80, 3145, 1000, 3440), radius=38, fill=ROSE)
    draw.text((145, 3220), "Instant access after purchase", font=F["body_b"], fill=WHITE)
    draw.text((145, 3280), product["price"], font=F["price"], fill=WHITE)
    if product["compare"]:
        draw.text((340, 3295), product["compare"], font=F["price_small"], fill="#eadbd5")
        draw.line((337, 3315, 430, 3315), fill="#eadbd5", width=3)
    draw.text((145, 3392), product["value"].upper(), font=font(SANS_B, 17), fill="#f5dfd6")
    draw.rounded_rectangle((535, 3260, 930, 3330), radius=35, fill=INK)
    text_center(draw, (732, 3283), product["cta"].upper(), F["cta"], WHITE, 3)
    text_center(draw, (540, 3420), "ALL SALES FINAL DUE TO DIGITAL ACCESS", F["small"], "#f8e8e1", 2)
    text_center(draw, (540, 3520), "Your brand. Built by you. Finished by The Dollhouse.", font(SERIF, 30), INK)

    out = OUT / f"{product['slug']}-stanstore-sales-page.jpg"
    base.convert("RGB").save(out, "JPEG", quality=94, optimize=True)
    print(out)


for item in PRODUCTS:
    create(item)
