import Eyebrow from "./Eyebrow";

const items = [
  "You have a product idea but no idea where to start with branding",
  "You've been stuck in research mode for months and need to just decide",
  "You want a brand that looks polished — without paying agency prices",
  "You're rebranding and need a clear, structured process to follow",
  "You've tried Canva templates and they never quite feel like you",
  "You're ready to launch but your brand isn't ready yet",
];

const WhoThisIsFor = () => (
  <section className="dh-reveal px-6 py-12 max-w-[900px] mx-auto text-center">
    <Eyebrow text="Made For You If..." className="mb-4" />
    <h2 className="font-display italic font-normal text-dollhouse-ink text-[clamp(26px,3.5vw,40px)] mb-10">
      This Is For You If...
    </h2>
    <div className="flex flex-wrap justify-center gap-5">
      {items.map((text, i) => (
        <div
          key={i}
          className={`dh-reveal d${(i % 3) + 1} bg-card border border-dollhouse-p3/20 rounded-[14px] p-5 max-w-[260px] text-left flex items-start gap-3`}
        >
          <span className="text-dollhouse-p3 text-[12px] mt-0.5 flex-shrink-0">✦</span>
          <p className="font-display text-[13.5px] text-dollhouse-text-mid font-light leading-relaxed m-0">
            {text}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default WhoThisIsFor;
