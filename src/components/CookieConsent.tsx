import { useState, useEffect } from "react";

const CookieConsent = () => {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) setDismissed(false);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="bg-dollhouse-ink/5 border-t border-dollhouse-p3/15 px-6 py-4 flex flex-wrap items-center justify-center gap-3 text-center">
      <p className="font-display text-[12px] text-dollhouse-text-light font-light m-0 max-w-[500px]">
        This site uses cookies to improve your experience. By continuing, you agree to our Privacy Policy.
      </p>
      <div className="flex gap-2.5 flex-shrink-0">
        <button
          onClick={handleAccept}
          className="font-accent text-[9px] tracking-[3px] uppercase px-6 py-2 bg-dollhouse-ink text-card rounded-pill border-none cursor-pointer font-medium"
        >
          Accept
        </button>
        <button
          onClick={handleAccept}
          className="font-accent text-[9px] tracking-[3px] uppercase px-6 py-2 bg-transparent text-dollhouse-text-light rounded-pill border border-dollhouse-p3/30 cursor-pointer"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
