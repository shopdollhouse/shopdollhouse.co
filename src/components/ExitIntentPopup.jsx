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
          from {
            opacity: 0;
            transform: translate(-50%, calc(-50% + 20px));
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>

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

      <div
        ref={popupRef}
        role="dialog"
        aria-modal="true"
        aria-label="Brand quiz offer"
        onClick={(event) => event.stopPropagation()}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          width: "90vw",
          maxWidth: "520px",
          padding: "40px 36px",
          background: "linear-gradient(135deg, var(--cream) 0%, var(--blush) 100%)",
          border: "1px solid rgba(200, 164, 100, 0.3)",
          borderRadius: "28px",
          boxShadow: "0 40px 100px -30px rgba(30, 15, 11, 0.45)",
          animation: "dollhousePopupEnter 0.4s ease-out both",
        }}
      >
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
            width: "32px",
            height: "32px",
            alignItems: "center",
            justifyContent: "center",
            border: 0,
            background: "transparent",
            color: "var(--ink)",
            opacity: 0.4,
            cursor: "pointer",
            transition: "opacity 160ms ease",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.opacity = "1";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.opacity = "0.4";
          }}
        >
          <svg
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          >
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>

        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "9px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--gold)",
              margin: 0,
            }}
          >
            ✦ FREE BRAND QUIZ ✦
          </p>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              color: "var(--rose)",
              lineHeight: 1.05,
              margin: "16px 0 0",
              fontWeight: 400,
            }}
          >
            What does your brand actually need right now?
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.98rem",
              lineHeight: 1.7,
              color: "rgba(30,15,11,0.7)",
              margin: "18px 0 0",
            }}
          >
            4 honest questions. One clear result. The exact next step for where you are right now — no fluff, no generic advice.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "8px",
              marginTop: "22px",
            }}
          >
            {["4 Questions", "Your Brand Type", "Product Match", "Free"].map((pill) => (
              <span
                key={pill}
                style={{
                  background: "rgba(255,255,255,0.65)",
                  border: "1px solid rgba(200,164,100,0.25)",
                  borderRadius: "999px",
                  padding: "5px 14px",
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "8.5px",
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "rgba(30,15,11,0.6)",
                }}
              >
                {pill}
              </span>
            ))}
          </div>

          <div
            aria-hidden="true"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              margin: "26px 0",
              color: "rgba(200,164,100,0.4)",
            }}
          >
            <span style={{ flex: 1, height: "1px", background: "currentColor" }} />
            <span style={{ fontSize: "13px", lineHeight: 1 }}>◆</span>
            <span style={{ flex: 1, height: "1px", background: "currentColor" }} />
          </div>

          <button
            type="button"
            onClick={takeQuiz}
            style={{
              width: "100%",
              padding: "16px 32px",
              border: 0,
              borderRadius: "999px",
              background: "var(--rose)",
              color: "white",
              fontFamily: "'Jost', sans-serif",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              fontWeight: 700,
              cursor: "pointer",
              transition: "filter 160ms ease, transform 160ms ease",
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.filter = "brightness(0.93)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.filter = "none";
            }}
          >
            Take the Free Quiz →
          </button>

          <button
            type="button"
            onClick={closePopup}
            style={{
              marginTop: "16px",
              border: 0,
              background: "transparent",
              color: "rgba(30,15,11,0.4)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              cursor: "pointer",
              padding: 0,
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.textDecoration = "underline";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.textDecoration = "none";
            }}
          >
            No thanks, I already know my brand type.
          </button>
        </div>
      </div>
    </>
  );
}
