const DollhouseArch = ({ className = "" }: { className?: string }) => (
  <svg
    width="70"
    height="96"
    viewBox="0 -10 56 90"
    fill="none"
    className={className}
  >
    {/* Outer arch */}
    <path
      d="M8 78 L8 30 Q8 3 28 3 Q48 3 48 30 L48 78"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="none"
      className="text-dollhouse-p3"
    />
    {/* Inner arch */}
    <path
      d="M16 78 L16 33 Q16 14 28 14 Q40 14 40 33 L40 78"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
      opacity="0.5"
      className="text-dollhouse-p3"
    />
    {/* Heart filled - same shape as HeartDivider, scaled & centered */}
    <g transform="translate(21.5, -1) scale(1.45)">
      <path
        d="M5 1 L4.4 0.3 C4 -0.1 3.3 -0.1 2.9 0.3 C2.5 0.7 2.5 1.4 2.9 1.8 L5 4 L7.1 1.8 C7.5 1.4 7.5 0.7 7.1 0.3 C6.7 -0.1 6 -0.1 5.6 0.3 Z"
        fill="hsl(15, 30%, 35%)"
        opacity="1"
        className="text-dollhouse-p3"
      />
    </g>
  </svg>
);

export default DollhouseArch;
