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

  // Motion layer: 3D card tilt (desktop pointers only). The cursor sparkle trail was removed on purpose.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    // Gentle 3D tilt on cards as the cursor moves over them.
    const MAX_TILT = 4;
    const onTilt = (e: MouseEvent) => {
      const card = (e.target as Element | null)?.closest?.("main:not(.lux) article") as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-py * MAX_TILT).toFixed(2)}deg) rotateY(${(px * MAX_TILT).toFixed(2)}deg) translateY(-5px)`;
    };
    const onTiltOut = (e: MouseEvent) => {
      const card = (e.target as Element | null)?.closest?.("main:not(.lux) article") as HTMLElement | null;
      if (!card) return;
      const to = e.relatedTarget as Element | null;
      if (to && card.contains(to)) return;
      card.style.transform = "";
    };

    document.addEventListener("mousemove", onTilt, { passive: true });
    document.addEventListener("mouseout", onTiltOut, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onTilt);
      document.removeEventListener("mouseout", onTiltOut);
    };
  }, []);
}
