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

    // Soft rose-gold glow that follows the cursor.
    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    glow.setAttribute("aria-hidden", "true");
    document.body.appendChild(glow);

    let raf = 0;
    let mx = 0;
    let my = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      glow.style.opacity = "1";
      if (!raf) {
        raf = window.requestAnimationFrame(() => {
          glow.style.transform = `translate(${mx}px, ${my}px)`;
          raf = 0;
        });
      }
    };
    const onLeave = () => { glow.style.opacity = "0"; };

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
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mousemove", onTilt, { passive: true });
    document.addEventListener("mouseout", onTiltOut, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mousemove", onTilt);
      document.removeEventListener("mouseout", onTiltOut);
      if (raf) window.cancelAnimationFrame(raf);
      glow.remove();
    };
  }, []);
}
