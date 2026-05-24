interface ValueStackItem {
  item: string;
  value: string;
}

interface ProductCardProps {
  title: string;
  subtitle?: string;
  description: string;
  price: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  badge?: string;
  features?: string[];
  featured?: boolean;
  valueStack?: ValueStackItem[];
  crossedTotal?: string;
  showGuarantee?: boolean;
  priceNote?: string;
  checkoutNote?: string;
}

const ProductCard = ({ title, subtitle, description, price, image, ctaText, ctaLink, badge, features, featured, valueStack, crossedTotal, showGuarantee, priceNote = "One-time", checkoutNote = "Secure checkout via Stan.store" }: ProductCardProps) => {
  const isPageAnchor = ctaLink.startsWith("#");

  return (
    <div className={`luxury-card bg-card rounded-2xl overflow-hidden max-w-[320px] w-full flex flex-col relative ${featured ? 'border border-dollhouse-p3' : 'border border-dollhouse-p3/25'}`}>
      {badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className={`inline-flex items-center px-4 py-2 rounded-pill font-accent text-[9px] tracking-[3px] uppercase font-semibold shadow-lg ${
            featured
              ? "bg-dollhouse-ink text-card shadow-dollhouse-ink/20 ring-2 ring-card"
              : "bg-[#d0b6a9] text-dollhouse-ink shadow-dollhouse-ink/10 ring-2 ring-card"
          }`}>
            {badge}
          </span>
        </div>
      )}

      <div className="relative overflow-hidden group">
        <img
          src={image}
          alt={title}
          className="w-full h-[200px] object-cover transition-all duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dollhouse-ink/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-6">
        {subtitle && (
          <p className="font-accent text-[8px] tracking-[3px] uppercase text-dollhouse-p3 mb-1.5">{subtitle}</p>
        )}
        <h3 className="font-display italic text-[22px] text-dollhouse-ink mb-2 font-normal">{title}</h3>
        <p className="text-[12.5px] text-dollhouse-text-light font-light leading-relaxed mb-4">{description}</p>

        {valueStack && valueStack.length > 0 ? (
          <div className="mb-5">
            {valueStack.map((v) => (
              <div key={v.item} className="flex items-baseline justify-between py-1 border-b border-dollhouse-p3/10 last:border-b-0">
                <span className="text-[11px] text-dollhouse-text-mid font-light">{v.item}</span>
                <span className="text-[10px] text-dollhouse-text-light font-accent tracking-wide ml-2 shrink-0">{v.value}</span>
              </div>
            ))}
            {crossedTotal && (
              <div className="flex items-baseline justify-between pt-2 mt-1">
                <span className="font-accent text-[9px] tracking-[2px] uppercase text-dollhouse-text-light">Total Value</span>
                <span className="text-[13px] text-dollhouse-text-light line-through">{crossedTotal}</span>
              </div>
            )}
          </div>
        ) : features && features.length > 0 ? (
          <ul className="list-none mb-5 p-0">
            {features.map((f) => (
              <li key={f} className="text-[12px] text-dollhouse-text-mid font-light leading-relaxed pl-[18px] relative flex items-baseline gap-1.5">
                <span className="absolute left-0 text-dollhouse-p3 text-[14px] leading-relaxed">•</span>
                {f}
              </li>
            ))}
          </ul>
        ) : null}

        <div>
          <div className="flex items-baseline justify-between mb-4">
            <span className="font-display italic text-[28px] text-dollhouse-ink">{price}</span>
            <span className="font-accent text-[8px] tracking-[3px] uppercase text-dollhouse-text-light">{priceNote}</span>
          </div>

          <a
            href={ctaLink}
            target={isPageAnchor ? undefined : "_blank"}
            rel={isPageAnchor ? undefined : "noopener noreferrer"}
            className={`flex items-center justify-center w-full px-5 py-3 rounded-pill font-accent text-[9px] tracking-[3px] uppercase font-medium no-underline transition-all duration-300 ${
              featured
                ? 'bg-dollhouse-ink text-card hover:opacity-90'
                : 'bg-transparent text-dollhouse-ink border border-dollhouse-ink hover:bg-dollhouse-ink hover:text-card'
            }`}
          >
            {ctaText}
          </a>

          <p className="text-center mt-2.5 font-accent text-[8px] tracking-[2px] uppercase text-dollhouse-text-light opacity-70">
            {checkoutNote}
          </p>

          {showGuarantee && (
            <p className="text-center mt-1.5 text-[10px] text-dollhouse-text-light font-light italic leading-snug">
              Your satisfaction matters — I'll work with you until it's right.
              <br />
              <span className="text-[9px] opacity-70">All sales are final. No refunds on digital products.</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
