const STAN_STORE = "https://stan.store/shopdollhouse";

const StickyMobileCTA = () => (
  <div
    className="sticky-mobile-cta hidden fixed bottom-0 left-0 right-0 z-[100] bg-card border-t border-dollhouse-p3/20 px-4 py-3 items-center justify-between gap-2"
    style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}
  >
    <div className="min-w-0">
      <p className="font-display italic text-[13px] text-dollhouse-ink m-0 truncate">Ready to build?</p>
      <p className="font-accent text-[8px] tracking-[2px] uppercase text-dollhouse-text-light m-0">Free quiz · Products from $17</p>
    </div>
    <div className="flex items-center gap-2 shrink-0">
      <a
        href="/quiz"
        className="font-accent text-[8px] tracking-[2.5px] uppercase px-4 py-2.5 border border-dollhouse-ink text-dollhouse-ink rounded-pill no-underline font-medium whitespace-nowrap hover:bg-dollhouse-ink hover:text-card transition-all"
      >
        Free Quiz
      </a>
      <a
        href={STAN_STORE}
        target="_blank"
        rel="noopener noreferrer"
        className="font-accent text-[8px] tracking-[2.5px] uppercase px-4 py-2.5 bg-dollhouse-ink text-card rounded-pill no-underline font-medium whitespace-nowrap"
      >
        Shop →
      </a>
    </div>
  </div>
);

export default StickyMobileCTA;
