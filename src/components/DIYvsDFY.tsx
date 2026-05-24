const DIYvsDFY = () => (
  <div className="dh-reveal max-w-[700px] mx-auto mt-12 bg-card border border-dollhouse-p3/20 rounded-2xl overflow-hidden">
    <div className="grid grid-cols-2">
      <div className="p-7 border-r border-dollhouse-p3/15">
        <p className="font-accent text-[9px] tracking-[3px] uppercase text-dollhouse-p3 mb-3 font-medium">DIY Kits</p>
        {["You want to be hands-on", "Budget under $100", "You have time to work through it", "You want to learn the process"].map((t) => (
          <div key={t} className="flex items-start gap-2.5 mb-2.5">
            <span className="text-dollhouse-p3 text-[13px] flex-shrink-0 mt-px">•</span>
            <p className="font-display text-[12.5px] text-dollhouse-text-mid font-light leading-snug m-0">{t}</p>
          </div>
        ))}
      </div>
      <div className="p-7 bg-dollhouse-p1/60">
        <p className="font-accent text-[9px] tracking-[3px] uppercase text-dollhouse-ink mb-3 font-medium">Done-For-You</p>
        {["You want it handled completely", "You value your time over budget", "You need it fast and right", "You want a pro's eye on everything"].map((t) => (
          <div key={t} className="flex items-start gap-2.5 mb-2.5">
            <span className="text-dollhouse-ink text-[13px] flex-shrink-0 mt-px">•</span>
            <p className="font-display text-[12.5px] text-dollhouse-text-mid font-light leading-snug m-0">{t}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default DIYvsDFY;
