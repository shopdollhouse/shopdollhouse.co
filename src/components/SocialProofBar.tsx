import DollhouseArch from "./DollhouseArch";

const stats = [
  { value: "500+", label: "Brand Builders Helped", href: null },
  { value: "BuzzFeed", label: "Recognized", href: "https://www.buzzfeed.com/sarahrohoman/black-owned-stores-etsy-canada" },
];

const statsRight = [
  { value: "HuffPost", label: "Featured", href: "https://www.huffpost.com/entry/get-out-and-vote-merch-election-2020_l_5f344d83c5b6960c066fef03" },
  { value: "10+", label: "Years Brand & Design", href: null },
];

const StatItem = ({ item }: { item: { value: string; label: string; href: string | null } }) => (
  <div className="text-center px-5 sm:px-9">
    {item.href ? (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-display italic text-[clamp(22px,3vw,30px)] text-dollhouse-ink leading-none mb-1.5 block no-underline hover:text-dollhouse-p3 transition-colors">
        {item.value}
      </a>
    ) : (
      <div className="font-display italic text-[clamp(22px,3vw,30px)] text-dollhouse-ink leading-none mb-1.5">
        {item.value}
      </div>
    )}
    <div className="font-accent text-[9px] tracking-[3px] uppercase text-dollhouse-text-light font-medium">
      {item.label}
    </div>
    {item.href && (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="font-accent text-[7px] tracking-[1px] text-dollhouse-p3 no-underline hover:underline mt-1 inline-block">
        Click here to see more →
      </a>
    )}
  </div>
);

const Divider = ({ className = "" }: { className?: string }) => (
  <div className={`hidden sm:flex flex-col items-center gap-1 opacity-50 ${className}`}>
    <div className="w-px h-3 bg-dollhouse-p3" />
    <span className="text-dollhouse-p3 text-[8px]">✦</span>
    <div className="w-px h-3 bg-dollhouse-p3" />
  </div>
);

const SocialProofBar = () => (
  <div className="bg-card border-t border-b border-dollhouse-p3/15 py-7 px-6 sm:px-10">
    <div className="flex justify-center items-center flex-wrap gap-6 sm:gap-0">
      {/* Mobile: 2x2 grid, Desktop: inline row */}
      <div className="grid grid-cols-2 sm:flex sm:items-center gap-6 sm:gap-0 w-full sm:w-auto">
        {stats.map((item) => (
          <StatItem key={item.value} item={item} />
        ))}
      </div>

      <div className="hidden sm:flex items-center">
        <Divider />
        <div className="px-7">
          <DollhouseArch className="w-[44px]" />
        </div>
        <Divider />
      </div>

      {/* Mobile arch */}
      <div className="sm:hidden">
        <DollhouseArch className="w-[36px] mx-auto" />
      </div>

      <div className="grid grid-cols-2 sm:flex sm:items-center gap-6 sm:gap-0 w-full sm:w-auto">
        {statsRight.map((item) => (
          <StatItem key={item.value} item={item} />
        ))}
      </div>
    </div>
  </div>
);

export default SocialProofBar;
