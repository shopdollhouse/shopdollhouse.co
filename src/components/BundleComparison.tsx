import Eyebrow from "./Eyebrow";

const features = [
  { name: "Primary Logo", suite: "1 + 1 Variation", full: "1 + 3 Variations" },
  { name: "Submark, Monogram & Favicon", suite: "—", full: "✓" },
  { name: "Colour Palette", suite: "Standard", full: "Extended" },
  { name: "Font Pairing", suite: "With Examples", full: "Full Type Samples" },
  { name: "Illustrated Brand Mark", suite: "—", full: "✓" },
  { name: "Brand Cheat Sheet", suite: "—", full: "✓" },
  { name: "Platform Banners", suite: "1", full: "3" },
  { name: "Canva Templates", suite: "3", full: "6 Social" },
  { name: "Product Listing Templates", suite: "—", full: "9" },
  { name: "Delivery Time", suite: "10 days", full: "14 days" },
  { name: "Price", suite: "$497", full: "$997" },
];

const BundleComparison = () => (
  <div className="max-w-[700px] mx-auto mt-12 mb-4">
    <div className="text-center mb-8">
      <Eyebrow text="Compare" className="mb-3" />
      <h3 className="font-display italic font-normal text-dollhouse-ink text-[clamp(22px,3vw,32px)]">
        Suite vs. Full House
      </h3>
    </div>

    <div className="border border-dollhouse-p3/20 rounded-2xl overflow-hidden bg-card">
      {/* Header */}
      <div className="grid grid-cols-3 border-b border-dollhouse-p3/20">
        <div className="p-4" />
        <div className="p-4 text-center border-l border-dollhouse-p3/15">
          <p className="font-accent text-[9px] tracking-[3px] uppercase text-dollhouse-text-mid font-medium">Starter Suite</p>
        </div>
        <div className="p-4 text-center border-l border-dollhouse-p3/15 bg-dollhouse-p1/60">
          <p className="font-accent text-[9px] tracking-[3px] uppercase text-dollhouse-ink font-medium">Full House</p>
        </div>
      </div>

      {/* Rows */}
      {features.map((f, i) => (
        <div key={f.name} className={`grid grid-cols-3 ${i < features.length - 1 ? 'border-b border-dollhouse-p3/10' : ''}`}>
          <div className="p-3 px-4">
            <span className="text-[11px] text-dollhouse-text-mid font-light">{f.name}</span>
          </div>
          <div className="p-3 text-center border-l border-dollhouse-p3/10">
            <span className={`text-[11px] font-light ${f.suite === '—' ? 'text-dollhouse-text-light/40' : 'text-dollhouse-text-mid'}`}>{f.suite}</span>
          </div>
          <div className="p-3 text-center border-l border-dollhouse-p3/10 bg-dollhouse-p1/40">
            <span className="text-[11px] text-dollhouse-ink font-light">{f.full}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default BundleComparison;
