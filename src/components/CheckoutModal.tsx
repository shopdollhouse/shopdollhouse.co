import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { LAUNCH_PLANS, LEAD_WEBHOOK_URL, GUARANTEE_DAYS, checkoutHref, type LaunchPlanId } from "@/lib/launch-offer";

/**
 * "Create your account" step shown when anyone hits a Get Started button.
 * The plan whose button was clicked comes pre-selected. On continue, the
 * details are kept for the checkout page (session only) and, if a webhook
 * is configured in launch-offer.ts, sent there so abandoned checkouts are
 * not lost. Nothing is sent anywhere until that webhook is set.
 */
const DISPLAY = "'Cormorant Garamond', serif";
const BODY = "'DM Sans', sans-serif";
const LUXE = "'Jost', sans-serif";

type Ctx = { open: (plan?: LaunchPlanId) => void };
const CheckoutContext = createContext<Ctx>({
  open: (plan = "single") => {
    window.location.href = checkoutHref(plan);
  },
});

export const useCheckout = () => useContext(CheckoutContext);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ open: boolean; plan: LaunchPlanId }>({ open: false, plan: "single" });
  const open = useCallback((plan: LaunchPlanId = "single") => setState({ open: true, plan }), []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);
  return (
    <CheckoutContext.Provider value={{ open }}>
      {children}
      {state.open && <CheckoutModal initialPlan={state.plan} onClose={close} />}
    </CheckoutContext.Provider>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

function CheckoutModal({ initialPlan, onClose }: { initialPlan: LaunchPlanId; onClose: () => void }) {
  const [plan, setPlan] = useState<LaunchPlanId>(initialPlan);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tried, setTried] = useState(false);
  const [busy, setBusy] = useState(false);

  const selected = LAUNCH_PLANS.find((p) => p.id === plan) ?? LAUNCH_PLANS[0];
  const bad = {
    first: !first.trim(),
    last: !last.trim(),
    email: !EMAIL_RE.test(email.trim()),
    phone: phone.replace(/\D/g, "").length < 10,
  };
  const valid = !bad.first && !bad.last && !bad.email && !bad.phone;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  // Keep the chat bubble from sitting on top of the form while it is open.
  useEffect(() => {
    const root = document.querySelector("chat-widget")?.shadowRoot;
    if (!root) return;
    const style = document.createElement("style");
    style.textContent = "#lc_text-widget, #lc_text-widget--btn { display: none !important; }";
    root.appendChild(style);
    return () => style.remove();
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (!valid || busy) return;
    setBusy(true);
    const payload = {
      firstName: first.trim(),
      lastName: last.trim(),
      email: email.trim(),
      phone: `+1 ${phone}`,
      plan: selected.id,
      planName: selected.name,
      price: selected.price,
      source: "dollhouse-launch-checkout",
      page: window.location.pathname,
      submittedAt: new Date().toISOString(),
    };
    try {
      sessionStorage.setItem("launch-lead", JSON.stringify(payload));
    } catch {
      /* storage can be blocked; checkout still works */
    }
    if (LEAD_WEBHOOK_URL) {
      fetch(LEAD_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), keepalive: true }).catch(() => {
        /* never block checkout on a failed lead save */
      });
    }
    window.location.assign(checkoutHref(selected.id));
  };

  const label = { fontFamily: LUXE, fontSize: "0.7rem", letterSpacing: "0.16em", fontWeight: 600, color: "#2a1a13" } as const;
  const field = (invalid: boolean) =>
    ({
      width: "100%",
      fontFamily: BODY,
      fontSize: "1rem",
      color: "#1f110b",
      background: "#fff",
      border: `1.5px solid ${tried && invalid ? "#d4574f" : "#e4ddd5"}`,
      borderRadius: 12,
      padding: "14px 16px",
      outline: "none",
    }) as const;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-5" style={{ background: "rgba(16,8,5,0.72)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-labelledby="checkout-title" className="relative my-auto w-full max-w-[580px] rounded-t-[18px] bg-white p-6 sm:rounded-[14px] sm:p-9" style={{ boxShadow: "0 50px 100px -30px rgba(0,0,0,0.6)", border: "1px solid rgba(198,178,130,0.35)" }}>
        <button type="button" aria-label="Close" onClick={onClose} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border text-[#1f110b] transition-colors hover:bg-[#f6f1ea]" style={{ borderColor: "#e4ddd5" }}>
          <X className="h-5 w-5" />
        </button>

        <p className="inline-block rounded-full px-4 py-1.5" style={{ fontFamily: LUXE, fontSize: "0.68rem", letterSpacing: "0.2em", fontWeight: 700, background: "#f6f0e1", color: "#7a6a3a" }}>
          ONE QUICK STEP · ALMOST THERE
        </p>
        <h2 id="checkout-title" className="mt-4 pr-10" style={{ fontFamily: DISPLAY, fontSize: "clamp(1.7rem, 4.6vw, 2.3rem)", fontWeight: 600, color: "#1f110b", lineHeight: 1.1 }}>
          Create Your Dollhouse Launch Account
        </h2>
        <p className="mt-2" style={{ fontFamily: BODY, fontSize: "0.98rem", color: "#5f554d", lineHeight: 1.6 }}>
          Choose your plan, add your details, then continue straight to secure payment.
        </p>

        <div className="mt-6 flex items-end justify-between gap-3">
          <div>
            <p style={{ ...label, color: "#7a6a3a" }}>CHOOSE YOUR MONTHLY PLAN</p>
            <p className="mt-1" style={{ fontFamily: BODY, fontSize: "0.9rem", color: "#5f554d" }}>Start with the format that best fits your business.</p>
          </div>
          <p className="hidden sm:block" style={{ fontFamily: LUXE, fontSize: "0.66rem", letterSpacing: "0.18em", fontWeight: 600, color: "#9a8f7e" }}>CANCEL ANYTIME</p>
        </div>

        <div role="radiogroup" aria-label="Monthly plan" className="mt-3 grid gap-3 sm:grid-cols-2">
          {LAUNCH_PLANS.map((p) => {
            const on = p.id === plan;
            return (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setPlan(p.id)}
                className="relative rounded-[14px] p-4 text-left transition-all duration-200"
                style={{ border: `2px solid ${on ? "#c6b282" : "#e4ddd5"}`, background: on ? "#fbf7ee" : "#fff", boxShadow: on ? "0 14px 34px -18px rgba(198,178,130,0.9)" : "none" }}
              >
                <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full" style={{ border: `2px solid ${on ? "#c6b282" : "#d8d0c6"}`, background: on ? "#c6b282" : "#fff", color: "#1f110b" }}>
                  {on && <Check className="h-3.5 w-3.5" strokeWidth={3.5} />}
                </span>
                <p className="pr-8" style={{ fontFamily: LUXE, fontSize: "0.92rem", fontWeight: 600, color: "#1f110b", lineHeight: 1.25 }}>{p.name}</p>
                <p className="mt-1.5" style={{ fontFamily: DISPLAY, fontSize: "2.1rem", fontWeight: 600, color: "#1f110b", lineHeight: 1 }}>
                  ${p.price}
                  <span style={{ fontFamily: BODY, fontSize: "0.85rem", fontWeight: 400, color: "#7a6f66" }}> /month</span>
                </p>
                <p className="mt-2" style={{ fontFamily: BODY, fontSize: "0.82rem", color: "#5f554d", lineHeight: 1.45 }}>{p.mix}.</p>
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex items-center gap-2.5 rounded-xl px-4 py-3" style={{ background: "#faf6ec", color: "#7a6a3a", fontFamily: BODY, fontSize: "0.88rem", fontWeight: 600 }}>
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ border: "1.5px solid #c6b282" }}><Check className="h-3 w-3" strokeWidth={3} /></span>
          Both plans include a FREE DOLLHOUSE CRM account + a private kickoff call
        </div>

        <form onSubmit={submit} noValidate className="mt-5 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5">
              <span style={label}>FIRST NAME*</span>
              <input autoFocus autoComplete="given-name" value={first} onChange={(e) => setFirst(e.target.value)} placeholder="First name" aria-invalid={tried && bad.first} style={field(bad.first)} />
            </label>
            <label className="grid gap-1.5">
              <span style={label}>LAST NAME*</span>
              <input autoComplete="family-name" value={last} onChange={(e) => setLast(e.target.value)} placeholder="Last name" aria-invalid={tried && bad.last} style={field(bad.last)} />
            </label>
          </div>
          <label className="grid gap-1.5">
            <span style={label}>EMAIL*</span>
            <input type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" aria-invalid={tried && bad.email} style={field(bad.email)} />
          </label>
          <label className="grid gap-1.5">
            <span style={label}>PHONE NUMBER*</span>
            <span className="flex overflow-hidden rounded-xl" style={{ border: `1.5px solid ${tried && bad.phone ? "#d4574f" : "#e4ddd5"}`, background: "#fff" }}>
              <span className="flex items-center px-4" style={{ background: "#f7f3ee", borderRight: "1.5px solid #e4ddd5", fontFamily: BODY, fontWeight: 700, color: "#1f110b" }}>+1</span>
              <input type="tel" inputMode="tel" autoComplete="tel-national" value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} placeholder="(555) 123-4567" aria-invalid={tried && bad.phone} className="w-full" style={{ fontFamily: BODY, fontSize: "1rem", color: "#1f110b", padding: "14px 16px", outline: "none", background: "transparent" }} />
            </span>
          </label>

          <button
            type="submit"
            disabled={!valid || busy}
            className="mt-1 flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-4 transition-colors duration-300"
            style={{ fontFamily: LUXE, fontSize: "0.82rem", letterSpacing: "0.22em", fontWeight: 700, textTransform: "uppercase", background: valid ? "#1f110b" : "#ece6dc", color: valid ? "#f5efe6" : "#a0968a", border: `1px solid ${valid ? "#c6b282" : "transparent"}`, cursor: valid && !busy ? "pointer" : "not-allowed" }}
          >
            Continue with ${selected.price} plan <ArrowRight className="h-4 w-4" />
          </button>
          {tried && !valid && (
            <p role="alert" style={{ fontFamily: BODY, fontSize: "0.82rem", color: "#c0443c" }}>
              Please fill in every field with a valid email and phone number.
            </p>
          )}
        </form>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {["SSL SECURED", `${GUARANTEE_DAYS}-DAY MONEY-BACK`, "CANCEL ANYTIME"].map((t) => (
            <span key={t} className="flex items-center gap-1.5" style={{ fontFamily: LUXE, fontSize: "0.66rem", letterSpacing: "0.16em", fontWeight: 600, color: "#9a8f7e" }}>
              <span className="flex h-4 w-4 items-center justify-center rounded-full" style={{ border: "1.5px solid #c6b282", color: "#7a6a3a" }}><Check className="h-2.5 w-2.5" strokeWidth={3.5} /></span>
              {t}
            </span>
          ))}
        </div>
        <p className="mt-4 text-center" style={{ fontFamily: BODY, fontSize: "0.72rem", color: "#9a8f7e", lineHeight: 1.5 }}>
          By continuing you agree to our <a href="/terms" className="underline">Terms</a> and <a href="/privacy" className="underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
