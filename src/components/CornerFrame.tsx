const CornerFrame = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative ${className}`}>
    {/* Border frames */}
    <div className="absolute inset-6 border border-dollhouse-p3/30 rounded-md pointer-events-none z-[1]" />
    <div className="absolute inset-8 border border-dollhouse-p3/15 rounded pointer-events-none z-[1]" />
    {/* Corner dots */}
    <div className="absolute top-9 left-9 w-[7px] h-[7px] rounded-full bg-dollhouse-p3 opacity-50 z-[2]" />
    <div className="absolute top-9 right-9 w-[7px] h-[7px] rounded-full bg-dollhouse-p3 opacity-50 z-[2]" />
    <div className="absolute bottom-9 left-9 w-[7px] h-[7px] rounded-full bg-dollhouse-p3 opacity-50 z-[2]" />
    <div className="absolute bottom-9 right-9 w-[7px] h-[7px] rounded-full bg-dollhouse-p3 opacity-50 z-[2]" />
    {/* Content */}
    <div className="relative z-[2]">
      {children}
    </div>
  </div>
);

export default CornerFrame;
