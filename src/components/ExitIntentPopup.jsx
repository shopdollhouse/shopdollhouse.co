import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";

const STORAGE_KEY = "dollhouse_popup_seen";
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

function getStoredPopupState() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (!value) return null;
    const parsed = JSON.parse(value);
    if (parsed === true) return { seen: true, timestamp: Date.now() };
    if (parsed?.seen && typeof parsed.timestamp === "number") return parsed;
    if (value === "true") return { seen: true, timestamp: Date.now() };
  } catch (_) {
    return null;
  }
  return null;
}

function hasSeenRecently() {
  const stored = getStoredPopupState();
  if (!stored?.seen) return false;
  return Date.now() - stored.timestamp < SEVEN_DAYS;
}

function saveSeenState() {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ seen: true, timestamp: Date.now() }),
    );
  } catch (_) {}
}

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);
  const closeButtonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isQuizRoute = location.pathname.startsWith("/quiz");

  const closePopup = () => {
    saveSeenState();
    setOpen(false);
  };

  const takeQuiz = () => {
    closePopup();
    navigate({ to: "/quiz" });
  };

  useEffect(() => {
    if (isQuizRoute || hasSeenRecently()) return undefined;

    let enabled = false;
    let desktopTimer;
    let mobileTimer;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const shouldSkip = () => isQuizRoute || hasSeenRecently();

    const showPopup = () => {
      if (!shouldSkip()) setOpen(true);
    };

    const handleMouseLeave = (event) => {
      if (!enabled || shouldSkip()) return;
      if (event.clientY <= 20) showPopup();
    };

    if (isMobile) {
      mobileTimer = window.setTimeout(() => {
        if (shouldSkip()) return;
        const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollable > 0 ? scrollTop / scrollable : 0;
        if (scrollProgress < 0.8) showPopup();
      }, 40000);
    } else {
      desktopTimer = window.setTimeout(() => {
        enabled = true;
        document.addEventListener("mouseleave", handleMouseLeave);
      }, 3000);
    }

    return () => {
      window.clearTimeout(desktopTimer);
      window.clearTimeout(mobileTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isQuizRoute, location.pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const focusableSelector = [
      "button",
      "[href]",
      "input",
      "select",
      "textarea",
      '[tabindex]:not([tabindex="-1"])',
    ].join(",");

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closePopup();
        return;
      }

      if (event.key !== "Tab" || !popupRef.current) return;
      const focusable = Array.from(
        popupRef.current.querySelectorAll(focusableSelector),
      ).filter((element) => !element.disabled && element.offsetParent !== null);

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  if (!open || isQuizRoute) return null;

  return (
    <>
      <style>{`
        @keyframes dollhousePopupEnter {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 16px)); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
      `}</style>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closePopup}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          background: "rgba(30,15,11,0.45)",
        }}
      />

      {/* Popup */}
      <div
        ref={popupRef}
        role="dialog"
        aria-modal="true"
        aria-label="Brand quiz offer"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          width: "min(92vw, 460px)",
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#FCF4EE",
          borderRadius: "22px",
          borderTop: "4px solid #bd7476",
          boxShadow: "0 32px 80px -24px rgba(30,15,11,0.40)",
          animation: "dollhousePopupEnter 0.35s ease-out both",
          padding: "56px 36px 40px",
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close popup"
          onClick={closePopup}
          style={{
            position: "absolute",
            top: "18px",
            right: "18px",
            display: "inline-flex",
            width: "44px",
            height: "44px",
            alignItems: "center",
            justifyContent: "center",
            border: "1.5px solid rgba(189,116,118,0.5)",
            borderRadius: "50%",
            background: "rgba(189,116,118,0.1)",
            color: "#bd7476",
            cursor: "pointer",
            transition: "background 160ms ease, color 160ms ease",
            zIndex: 2,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#bd7476";
            e.currentTarget.style.color = "#FCF4EE";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(189,116,118,0.1)";
            e.currentTarget.style.color = "#bd7476";
          }}
        >
          <svg viewBox="0 0 16 16" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>

        {/* Label */}
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#bd7476",
          margin: "0 0 16px",
        }}>
          Free Brand Clarity Quiz
        </p>

        {/* Heading */}
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(2.2rem, 8vw, 3rem)",
          lineHeight: 1.05,
          color: "#bd7476",
          margin: "0 0 24px",
        }}>
          Find your next brand move.
        </h2>

        {/* Bullets */}
        <ul style={{
          listStyle: "none",
          margin: "0 0 32px",
          padding: 0,
          textAlign: "left",
        }}>
          {[
            "Answer 4 honest questions",
            "Get matched to your clearest next step",
            "Takes under 60 seconds",
          ].map((point) => (
            <li key={point} style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.5,
              color: "rgba(30,15,11,0.7)",
              marginBottom: "12px",
            }}>
              <span style={{ color: "#bd7476", flexShrink: 0, fontSize: "0.8rem", marginTop: "3px" }}>♥</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          type="button"
          onClick={takeQuiz}
          style={{
            display: "block",
            width: "100%",
            padding: "20px 24px",
            border: 0,
            borderRadius: "12px",
            background: "var(--ink)",
            color: "#FCF4EE",
            fontFamily: "'Jost', sans-serif",
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            cursor: "pointer",
            transition: "filter 160ms ease, transform 160ms ease",
            boxShadow: "0 12px 32px -12px rgba(30,15,11,0.45)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = "brightness(0.9)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = "none";
            e.currentTarget.style.transform = "none";
          }}
        >
          Take the free quiz →
        </button>

        {/* Dismiss */}
        <button
          type="button"
          onClick={closePopup}
          style={{
            marginTop: "20px",
            border: 0,
            background: "transparent",
            color: "rgba(30,15,11,0.62)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.88rem",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
            cursor: "pointer",
            padding: "6px 0",
            display: "block",
            width: "100%",
            textAlign: "center",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(30,15,11,0.85)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(30,15,11,0.62)"; }}
        >
          No thanks, I already know my next step.
        </button>
      </div>
    </>
  );
}
