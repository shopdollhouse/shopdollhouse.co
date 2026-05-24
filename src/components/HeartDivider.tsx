const HeartDivider = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3.5 w-[220px] mx-auto ${className}`}>
    <span className="flex-1 h-px bg-gradient-to-r from-transparent to-dollhouse-p3" />
    <svg width="10" height="9" viewBox="0 0 10 9" fill="none" className="flex-shrink-0">
      <path
        d="M5 1 L4.4 0.3 C4 -0.1 3.3 -0.1 2.9 0.3 C2.5 0.7 2.5 1.4 2.9 1.8 L5 4 L7.1 1.8 C7.5 1.4 7.5 0.7 7.1 0.3 C6.7 -0.1 6 -0.1 5.6 0.3 Z"
        fill="currentColor"
        className="text-dollhouse-p3"
      />
    </svg>
    <span className="flex-1 h-px bg-gradient-to-l from-transparent to-dollhouse-p3" />
  </div>
);

export default HeartDivider;
