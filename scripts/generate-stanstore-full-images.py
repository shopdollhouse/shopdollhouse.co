from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "stanstore-assets"
W, H = 1080, 1350

FONT_DIR = Path("/System/Library/Fonts/Supplemental")
SERIF = str(FONT_DIR / "Georgia.ttf")
SERIF_I = str(FONT_DIR / "Georgia Italic.ttf")
SANS = str(FONT_DIR / "Arial.ttf")
SANS_B = str(FONT_DIR / "Arial Bold.ttf")

INK = "#1f0f0b"
WHITE = "#fffaf6"
ROSE = "#bd6f70"
RED = "#bf3142"
GOLD = "#c5a36a"


def font(path, size):
    return ImageFont.truetype(path, size)


def center(draw, y, text, fnt, fill, tracking=0):
    if tracking:
        total = sum(draw.textlength(c, font=fnt) for c in text) + tracking * (len(text) - 1)
        x = (W - total) / 2
        for char in text:
            draw.text((x, y), char, font=fnt, fill=fill)
            x += draw.textlength(char, font=fnt) + tracking
        return
    box = draw.textbbox((0, 0), text, font=fnt)
    draw.text(((W - (box[2] - box[0])) / 2, y), text, font=fnt, fill=fill)


def wrap(draw, text, x, y, max_width, fnt, fill, line_height=1.22, align="center"):
    words = text.split()
    lines, current = [], ""
    for word in words:
        test = f"{current} {word}".strip()
        if draw.textlength(test, font=fnt) > max_width and current:
            lines.append(current)
            current = word
        else:
            current = test
    if current:
        lines.append(current)
    for i, line in enumerate(lines):
        yy = y + i * int(fnt.size * line_height)
        if align == "center":
            box = draw.textbbox((0, 0), line, font=fnt)
            xx = x + (max_width - (box[2] - box[0])) / 2
        else:
            xx = x
        draw.text((xx, yy), line, font=fnt, fill=fill)


def text_in_box(draw, box, text, fnt, fill, tracking=0):
    x1, y1, x2, _ = box
    if tracking:
        total = sum(draw.textlength(c, font=fnt) for c in text) + tracking * (len(text) - 1)
        x = x1 + ((x2 - x1) - total) / 2
        for char in text:
            draw.text((x, y1), char, font=fnt, fill=fill)
            x += draw.textlength(char, font=fnt) + tracking
        return
    text_width = draw.textlength(text, font=fnt)
    draw.text((x1 + ((x2 - x1) - text_width) / 2, y1), text, font=fnt, fill=fill)


def arch(draw, x, y, scale=1, color=GOLD):
    w, h = int(54 * scale), int(70 * scale)
    draw.arc((x, y, x + w, y + h), 180, 360, fill=color, width=max(3, int(4 * scale)))
    draw.line((x, y + h / 2, x, y + h), fill=color, width=max(3, int(4 * scale)))
    draw.line((x + w, y + h / 2, x + w, y + h), fill=color, width=max(3, int(4 * scale)))
    draw.rounded_rectangle((x + w * .35, y + h * .44, x + w * .65, y + h), radius=2, outline=color, width=max(2, int(3 * scale)))


def gradient_overlay(img):
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    pix = overlay.load()
    for y in range(H):
        top_alpha = max(0, int(252 * (1 - y / 620))) if y < 620 else 0
        bottom_alpha = max(0, int(210 * ((y - 850) / 500))) if y > 850 else 0
        alpha = max(top_alpha, bottom_alpha)
        for x in range(W):
            pix[x, y] = (255, 248, 243, alpha)
    return Image.alpha_composite(img.convert("RGBA"), overlay)


PRODUCTS = [
    {
        "slug": "brand-kit",
        "base": "../../src/assets/product-brand-kit.jpg",
        "eyebrow": "PRIVATE STRATEGY SUITE",
        "title": "Brand Kit",
        "subtitle": "Your complete brand strategy, product plan, and launch roadmap.",
        "price": "$97",
        "chips": ["17 guided rooms", "private access", "save + export"],
    },
    {
        "slug": "workbook",
        "base": "../../src/assets/product-workbook.jpg",
        "eyebrow": "INTERACTIVE BRAND WORKBOOK",
        "title": "Workbook",
        "subtitle": "Build your brand from the ground up with guided prompts and clarity.",
        "price": "$47",
        "chips": ["brand foundation", "bonus PDF", "beginner friendly"],
    },
    {
        "slug": "ai-prompt-kit",
        "base": "../../src/assets/product-ai-prompt-kit.jpg",
        "eyebrow": "AI PROMPT KIT",
        "title": "AI Prompt Kit",
        "subtitle": "50+ prompts for captions, hooks, emails, offers, and launches.",
        "price": "$17",
        "chips": ["50+ prompts", "8 rooms", "instant access"],
    },
]


def make(product):
    src = Image.open((OUT / product["base"]).resolve()).convert("RGB")
    img = ImageOps.fit(src, (W, H), Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    img = gradient_overlay(img)
    draw = ImageDraw.Draw(img)

    arch(draw, 508, 34, 1.0)
    center(draw, 118, product["eyebrow"], font(SANS_B, 21), RED, 7)

    panel = Image.new("RGBA", (900, 245), (31, 15, 11, 238))
    mask = Image.new("L", (900, 210), 0)
    mask = Image.new("L", (900, 245), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, 900, 245), radius=38, fill=255)
    img.paste(panel, (90, 1082), mask)
    draw = ImageDraw.Draw(img)
    draw.text((145, 1128), product["title"], font=font(SERIF, 39), fill=WHITE)
    wrap(draw, product["subtitle"], 145, 1178, 390, font(SANS, 19), "#efdcd5", line_height=1.2, align="left")
    draw.text((145, 1240), product["price"], font=font(SERIF, 55), fill=WHITE)

    wrap(draw, " / ".join(product["chips"]).upper(), 535, 1132, 380, font(SANS_B, 18), "#efdcd5", line_height=1.32, align="center")

    draw.rounded_rectangle((520, 1220, 930, 1282), radius=31, fill=WHITE)
    text_in_box(draw, (520, 1238, 930, 1282), "GET INSTANT ACCESS", font(SANS_B, 18), INK, 3)

    out = OUT / f"{product['slug']}-stanstore-sales-page.jpg"
    img.convert("RGB").save(out, "JPEG", quality=95, optimize=True)

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
  <image href="./{product['slug']}-stanstore-sales-page.jpg" width="{W}" height="{H}" preserveAspectRatio="xMidYMid slice"/>
</svg>
'''
    (OUT / f"{product['slug']}-stanstore-sales-page.svg").write_text(svg)
    print(out)


for p in PRODUCTS:
    make(p)
