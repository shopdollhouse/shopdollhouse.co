interface FreeProductCardProps {
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  badge?: string;
  highlights?: string[];
}

const Pill = ({ text }: { text: string }) => (
  <span className="inline-block px-2.5 py-1 rounded-pill bg-dollhouse-p3/12 text-dollhouse-p3 font-accent text-[7px] tracking-[2px] uppercase">
    {text}
  </span>
);

const FreeProductCard = ({ title, description, image, ctaText, ctaLink, badge, highlights }: FreeProductCardProps) => {
  return (
    <div className="luxury-card bg-card rounded-2xl overflow-hidden max-w-[320px] w-full flex flex-col border border-dollhouse-p3/25 relative">
      {badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-pill bg-dollhouse-p3 text-card font-accent text-[8px] tracking-[3px] uppercase font-medium">
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
        {highlights && highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {highlights.map((h) => <Pill key={h} text={h} />)}
          </div>
        )}

        <h3 className="font-display italic text-[20px] text-dollhouse-ink mb-2 font-normal">{title}</h3>
        <p className="text-[12.5px] text-dollhouse-text-light font-light leading-relaxed mb-5">{description}</p>

        <div>
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full px-5 py-3 bg-transparent text-dollhouse-ink border border-dollhouse-ink rounded-pill font-accent text-[9px] tracking-[3px] uppercase font-medium no-underline transition-all duration-300 hover:bg-dollhouse-ink hover:text-card"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default FreeProductCard;
