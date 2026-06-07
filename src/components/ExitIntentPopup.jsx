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
          width: "min(92vw, 680px)",
          maxHeight: "90vh",
          overflow: "auto",
          padding: 0,
          background: "linear-gradient(135deg, var(--cream) 0%, #f8e6e1 100%)",
          border: "1px solid rgba(200, 164, 100, 0.3)",
          borderRadius: "30px",
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
            zIndex: 2,
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

        <div>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 16% 18%, rgba(201,122,122,0.18), transparent 28%), radial-gradient(circle at 88% 72%, rgba(200,164,100,0.14), transparent 32%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
              gap: 0,
            }}
            className="dollhouse-popup-grid"
          >
            <div
              style={{
                minHeight: "100%",
                background: "rgba(30,15,11,0.94)",
                padding: "34px 28px",
                color: "var(--cream)",
              }}
              className="dollhouse-popup-side"
            >
              <div
                style={{
                  width: "54px",
                  height: "54px",
                  borderRadius: "20px",
                  border: "1px solid rgba(200,164,100,0.32)",
                  background: "rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--gold)",
                }}
              >
                <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 20V8.6L12 4l5 4.6V20" />
                  <path d="M10 20v-6h4v6" />
                  <path d="M9 10.5h.01M15 10.5h.01" />
                </svg>
              </div>

              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  margin: "28px 0 0",
                  fontWeight: 700,
                }}
              >
                Free Brand Clarity Quiz
              </p>

              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(2.15rem, 5vw, 3rem)",
                  color: "var(--cream)",
                  lineHeight: 0.98,
                  margin: "14px 0 0",
                  fontWeight: 400,
                }}
              >
                Find your next best brand move.
              </h2>

              <div
                style={{
                  marginTop: "26px",
                  display: "grid",
                  gap: "10px",
                }}
              >
                {[
                  ["01", "Your brand type"],
                  ["02", "The block slowing you down"],
                  ["03", "The product that fits next"],
                ].map(([number, label]) => (
                  <div
                    key={number}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      border: "1px solid rgba(200,164,100,0.22)",
                      borderRadius: "16px",
                      padding: "10px 12px",
                      background: "rgba(255,255,255,0.045)",
                    }}
                  >
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--gold)", fontStyle: "italic", fontSize: "1.2rem" }}>{number}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(253,246,240,0.74)", fontSize: "0.82rem" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: "42px 34px 34px",
                textAlign: "center",
                position: "relative",
              }}
              className="dollhouse-popup-main"
            >
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  margin: 0,
                  fontWeight: 700,
                }}
              >
                Less than 60 seconds
              </p>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(1.9rem, 4.5vw, 2.75rem)",
                  color: "var(--rose)",
                  lineHeight: 1.03,
                  margin: "14px 0 0",
                  fontWeight: 400,
                }}
              >
                Stop guessing what your brand needs first.
              </h3>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.94rem",
                  lineHeight: 1.65,
                  color: "rgba(30,15,11,0.68)",
                  margin: "16px 0 0",
                }}
              >
                Answer 4 honest questions and get matched to the clearest next step: foundation, offer, content, or launch.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "10px",
                  marginTop: "22px",
                }}
              >
                {[
                  ["Brand type", "See where you are"],
                  ["3 quick wins", "Know what to fix"],
                  ["Product match", "Choose the right tool"],
                  ["No fluff", "Plain next step"],
                ].map(([title, body]) => (
                  <div
                    key={title}
                    style={{
                      background: "rgba(255,255,255,0.62)",
                      border: "1px solid rgba(200,164,100,0.24)",
                      borderRadius: "17px",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--gold)", margin: 0, fontWeight: 700 }}>{title}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.76rem", color: "rgba(30,15,11,0.58)", margin: "5px 0 0", lineHeight: 1.35 }}>{body}</p>
                  </div>
                ))}
              </div>

              <div
                aria-hidden="true"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  margin: "24px 0",
                  color: "rgba(200,164,100,0.42)",
                }}
              >
                <span style={{ flex: 1, height: "1px", background: "currentColor" }} />
                <span style={{ fontSize: "11px", lineHeight: 1 }}>◆</span>
                <span style={{ flex: 1, height: "1px", background: "currentColor" }} />
              </div>

              <button
                type="button"
                onClick={takeQuiz}
                style={{
                  width: "100%",
                  padding: "16px 28px",
                  border: 0,
                  borderRadius: "999px",
                  background: "var(--ink)",
                  color: "var(--cream)",
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "filter 160ms ease, transform 160ms ease",
                  boxShadow: "0 18px 38px -18px rgba(30,15,11,0.55)",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.filter = "brightness(0.93)";
                  event.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.filter = "none";
                  event.currentTarget.style.transform = "none";
                }}
              >
                Take the free quiz →
              </button>

              <button
                type="button"
                onClick={closePopup}
                style={{
                  marginTop: "15px",
                  border: 0,
                  background: "transparent",
                  color: "rgba(30,15,11,0.42)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.78rem",
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
                No thanks, I already know my next step.
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 720px) {
            .dollhouse-popup-grid {
              grid-template-columns: 1fr !important;
            }
            .dollhouse-popup-side {
              padding: 28px 24px !important;
            }
            .dollhouse-popup-main {
              padding: 30px 24px 28px !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}
