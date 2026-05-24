interface EyebrowProps {
  text: string;
  className?: string;
}

const Eyebrow = ({ text, className = "" }: EyebrowProps) => (
  <div className={`inline-flex items-center gap-2.5 px-5 py-[7px] bg-card/85 border border-dollhouse-p2/35 rounded-pill font-accent text-[9px] tracking-[4px] uppercase text-dollhouse-text-mid font-medium backdrop-blur-sm ${className}`}>
    <span className="w-3.5 h-px bg-dollhouse-p3 opacity-60" />
    {text}
    <span className="w-3.5 h-px bg-dollhouse-p3 opacity-60" />
  </div>
);

export default Eyebrow;
