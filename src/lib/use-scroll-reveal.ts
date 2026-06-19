import { useEffect } from "react";

/**
 * Site-wide scroll reveal. Sections (and anything tagged with `.sr`,
 * `.sr-left`, `.sr-right`, `.sr-scale`, or `[data-stagger]`) gently
 * animate in as they enter the viewport. Content already on screen at
 * load is left untouched, and the whole system is disabled for
 * prefers-reduced-motion.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = new Set<Element>();
    document.querySelectorAll("main > section, main > header").forEach((el) => targets.add(el));
    document.querySelectorAll(".sr, .sr-left, .sr-right, .sr-scale, [data-stagger]").forEach((el) => targets.add(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sr-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Anything visible at load stays visible — only below-the-fold animates.
      if (rect.top < window.innerHeight * 0.92) {
        el.classList.add("sr-in");
        return;
      }
      if (!el.classList.contains("sr-left") && !el.classList.contains("sr-right") && !el.classList.contains("sr-scale") && !el.hasAttribute("data-stagger")) {
        el.classList.add("sr");
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Futuristic motion layer: cursor glow + 3D card tilt (desktop pointers only).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    // Subtle sparkle trail that drifts behind the cursor.
    let lastSpawn = 0;
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawn < 70) return; // throttle so it stays subtle
      lastSpawn = now;
      const s = document.createElement("span");
      s.className = "cursor-sparkle";
      s.setAttribute("aria-hidden", "true");
      s.textContent = "✦";
      s.style.left = `${e.clientX + (Math.random() - 0.5) * 10}px`;
      s.style.top = `${e.clientY + (Math.random() - 0.5) * 10}px`;
      s.style.fontSize = `${7 + Math.random() * 5}px`;
      s.style.color = Math.random() < 0.5 ? "var(--gold)" : "var(--rose)";
      document.body.appendChild(s);
      window.setTimeout(() => s.remove(), 800);
    };

    // Gentle 3D tilt on cards as the cursor moves over them.
    const MAX_TILT = 4;
    const onTilt = (e: MouseEvent) => {
      const card = (e.target as Element | null)?.closest?.("main article") as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-py * MAX_TILT).toFixed(2)}deg) rotateY(${(px * MAX_TILT).toFixed(2)}deg) translateY(-5px)`;
    };
    const onTiltOut = (e: MouseEvent) => {
      const card = (e.target as Element | null)?.closest?.("main article") as HTMLElement | null;
      if (!card) return;
      const to = e.relatedTarget as Element | null;
      if (to && card.contains(to)) return;
      card.style.transform = "";
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mousemove", onTilt, { passive: true });
    document.addEventListener("mouseout", onTiltOut, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousemove", onTilt);
      document.removeEventListener("mouseout", onTiltOut);
      document.querySelectorAll(".cursor-sparkle").forEach((el) => el.remove());
    };
  }, []);
}
