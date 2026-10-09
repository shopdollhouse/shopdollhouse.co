/**
 * Hand-drawn style line illustrations for the How It Works cards.
 * Pink, cream and gold only, so they sit in the Dollhouse palette.
 */
const ROSE = "#c08079";
const GOLD = "#c8a464";
const INK = "#2a1d1a";
const CREAM = "#fffaf6";
const BLUSH = "#f4d9d3";

function Sparkle({ x, y, s = 1, className = "" }: { x: number; y: number; s?: number; className?: string }) {
  return (
    <g className={className} transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -9 C1 -3 3 -1 9 0 C3 1 1 3 0 9 C-1 3 -3 1 -9 0 C-3 -1 -1 -3 0 -9Z" fill={GOLD} opacity="0.9" />
    </g>
  );
}

const svgProps = { viewBox: "0 0 400 250", className: "h-full w-full", role: "img" as const, preserveAspectRatio: "xMidYMid slice" as const };

export function IllustrationPosts() {
  return (
    <svg {...svgProps} aria-label="A fan of social media post cards">
      <ellipse cx="200" cy="228" rx="120" ry="10" fill={ROSE} opacity="0.12" />
      {/* back cards */}
      <g transform="rotate(-9 100 135)">
        <rect x="52" y="72" width="104" height="128" rx="10" fill={CREAM} stroke={GOLD} strokeWidth="1.4" />
        <rect x="64" y="86" width="80" height="58" rx="6" fill={BLUSH} />
        <rect x="64" y="154" width="64" height="5" rx="2.5" fill={ROSE} opacity="0.35" />
        <rect x="64" y="166" width="44" height="5" rx="2.5" fill={ROSE} opacity="0.25" />
      </g>
      <g transform="rotate(9 300 135)">
        <rect x="244" y="72" width="104" height="128" rx="10" fill={CREAM} stroke={GOLD} strokeWidth="1.4" />
        <rect x="256" y="86" width="80" height="58" rx="6" fill="#f1d3cf" />
        <rect x="256" y="154" width="64" height="5" rx="2.5" fill={ROSE} opacity="0.35" />
        <rect x="256" y="166" width="44" height="5" rx="2.5" fill={ROSE} opacity="0.25" />
      </g>
      {/* centre card */}
      <g className="launch-float-slow">
        <rect x="136" y="38" width="128" height="162" rx="14" fill="#ffffff" stroke={ROSE} strokeWidth="1.6" />
        <circle cx="158" cy="62" r="8" fill={BLUSH} stroke={GOLD} strokeWidth="1.2" />
        <rect x="172" y="56" width="52" height="5" rx="2.5" fill={INK} opacity="0.55" />
        <rect x="172" y="66" width="34" height="4" rx="2" fill={INK} opacity="0.25" />
        <rect x="148" y="82" width="104" height="70" rx="8" fill="url(#postGrad)" />
        <defs>
          <linearGradient id="postGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fbe9e4" />
            <stop offset="1" stopColor="#efc9c3" />
          </linearGradient>
        </defs>
        <path d="M200 100 C202 110 206 114 216 117 C206 120 202 124 200 134 C198 124 194 120 184 117 C194 114 198 110 200 100Z" fill={GOLD} />
        <path d="M156 172 c-4 -5 -11 -1 -7 5 l7 7 l7 -7 c4 -6 -3 -10 -7 -5z" fill={ROSE} />
        <path d="M184 170 h14 a5 5 0 0 1 5 5 v6 a5 5 0 0 1 -5 5 h-9 l-5 5 v-5 a5 5 0 0 1 -5 -5 v-6 a5 5 0 0 1 5 -5z" fill="none" stroke={INK} strokeWidth="1.2" opacity="0.5" />
        <rect x="224" y="174" width="28" height="4" rx="2" fill={ROSE} opacity="0.35" />
      </g>
      {/* month of posts */}
      <g>
        {Array.from({ length: 10 }).map((_, i) => (
          <circle key={i} cx={156 + i * 10} cy="224" r="3" fill={i < 7 ? GOLD : "none"} stroke={GOLD} strokeWidth="1" opacity={i < 7 ? 0.95 : 0.6} />
        ))}
      </g>
      <Sparkle x={64} y={50} s={1.1} className="launch-float" />
      <Sparkle x={338} y={46} s={0.8} className="launch-float-slow" />
      <Sparkle x={362} y={176} s={1} className="launch-float" />
      <Sparkle x={38} y={178} s={0.7} className="launch-float-slow" />
    </svg>
  );
}

export function IllustrationQuote() {
  return (
    <svg {...svgProps} aria-label="A quote calculator on a website">
      <ellipse cx="200" cy="232" rx="125" ry="9" fill={ROSE} opacity="0.12" />
      <g>
        <rect x="68" y="28" width="264" height="188" rx="12" fill="#ffffff" stroke={ROSE} strokeWidth="1.6" />
        <path d="M68 40 a12 12 0 0 1 12 -12 h240 a12 12 0 0 1 12 12 v18 h-264z" fill={BLUSH} />
        {[84, 98, 112].map((x, i) => (
          <circle key={x} cx={x} cy="43" r="3.4" fill={i === 0 ? ROSE : i === 1 ? GOLD : "#e6cfc9"} />
        ))}
        <rect x="150" y="38" width="130" height="10" rx="5" fill="#ffffff" opacity="0.8" />
        <rect x="92" y="72" width="128" height="9" rx="4.5" fill={INK} opacity="0.7" />
        <rect x="92" y="90" width="216" height="5" rx="2.5" fill="#eadcd6" />
        <rect x="92" y="90" width="92" height="5" rx="2.5" fill={GOLD} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="92" y={106 + i * 27} width="216" height="21" rx="10.5" fill={i === 1 ? INK : "#fbf1ed"} stroke={GOLD} strokeWidth="1" strokeOpacity="0.5" />
            <circle cx="106" cy={116.5 + i * 27} r="5" fill={i === 1 ? GOLD : "none"} stroke={i === 1 ? GOLD : ROSE} strokeWidth="1.3" />
            <rect x="120" y={113.5 + i * 27} width={[84, 100, 64][i]} height="6" rx="3" fill={i === 1 ? CREAM : INK} opacity={i === 1 ? 0.85 : 0.35} />
          </g>
        ))}
        <rect x="136" y="192" width="128" height="19" rx="9.5" fill={ROSE} />
        <text x="200" y="204.5" textAnchor="middle" fontFamily="Jost, sans-serif" fontSize="7.5" letterSpacing="1.8" fill="#ffffff">SEE MY RESULTS</text>
      </g>
      <g className="launch-float-slow">
        <rect x="262" y="176" width="104" height="38" rx="10" fill="#ffffff" stroke={GOLD} strokeWidth="1.4" />
        <circle cx="282" cy="195" r="9" fill={GOLD} />
        <path d="M277.5 195.5 l3.2 3.2 l6 -6.4" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="297" y="187" width="54" height="5" rx="2.5" fill={INK} opacity="0.6" />
        <rect x="297" y="197" width="36" height="4" rx="2" fill={INK} opacity="0.25" />
      </g>
      <Sparkle x={44} y={72} s={1} className="launch-float" />
      <Sparkle x={360} y={52} s={0.8} className="launch-float-slow" />
      <Sparkle x={52} y={190} s={0.7} className="launch-float-slow" />
    </svg>
  );
}

export function IllustrationReply() {
  return (
    <svg {...svgProps} aria-label="A comment turning into an instant private reply">
      <ellipse cx="200" cy="232" rx="125" ry="9" fill={ROSE} opacity="0.12" />
      {/* comment */}
      <g>
        <rect x="36" y="52" width="140" height="48" rx="14" fill="#ffffff" stroke={ROSE} strokeWidth="1.6" />
        <path d="M62 100 l-8 14 l20 -14z" fill="#ffffff" stroke={ROSE} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M60 99 h16" stroke="#ffffff" strokeWidth="3" />
        <circle cx="58" cy="76" r="10" fill={BLUSH} stroke={GOLD} strokeWidth="1.2" />
        <text x="78" y="73" fontFamily="Jost, sans-serif" fontSize="7" letterSpacing="1.4" fill={INK} opacity="0.45">YOUR CUSTOMER</text>
        <text x="78" y="87" fontFamily="Jost, sans-serif" fontSize="11" letterSpacing="2.2" fontWeight="500" fill={INK}>QUOTE</text>
      </g>
      <path className="launch-float" d="M174 44 c-5 -7 -15 -1 -9 7 l9 9 l9 -9 c6 -8 -4 -14 -9 -7z" fill={ROSE} />
      {/* arrow */}
      <path d="M112 124 C118 168 160 176 206 164" fill="none" stroke={GOLD} strokeWidth="1.8" strokeDasharray="4 5" strokeLinecap="round" />
      <path d="M198 156 l12 8 l-13 6" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* instant reply */}
      <g className="launch-float-slow">
        <rect x="204" y="126" width="164" height="78" rx="16" fill="url(#dmGrad)" />
        <defs>
          <linearGradient id="dmGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3a2a25" />
            <stop offset="1" stopColor={INK} />
          </linearGradient>
        </defs>
        <path d="M340 204 l10 14 l-24 -14z" fill={INK} />
        <text x="222" y="148" fontFamily="Jost, sans-serif" fontSize="7" letterSpacing="1.8" fill={GOLD}>PRIVATE REPLY · INSTANT</text>
        <rect x="222" y="158" width="124" height="5" rx="2.5" fill={CREAM} opacity="0.7" />
        <rect x="222" y="170" width="96" height="5" rx="2.5" fill={CREAM} opacity="0.45" />
        <rect x="222" y="182" width="60" height="5" rx="2.5" fill={CREAM} opacity="0.3" />
        <circle cx="364" cy="128" r="12" fill={GOLD} />
        <path d="M358 128.5 l4 4 l7.5 -8" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <Sparkle x={40} y={150} s={0.9} className="launch-float" />
      <Sparkle x={236} y={60} s={0.8} className="launch-float-slow" />
      <Sparkle x={380} y={88} s={0.7} className="launch-float" />
    </svg>
  );
}

export function IllustrationBook() {
  const cols = 7;
  return (
    <svg {...svgProps} aria-label="A calendar with an estimate booked, plus after-hours moon">
      <ellipse cx="200" cy="232" rx="120" ry="9" fill={ROSE} opacity="0.12" />
      {/* moon, after hours */}
      <g className="launch-float-slow">
        <path d="M58 52 a24 24 0 1 0 22 34 a19 19 0 0 1 -22 -34z" fill={BLUSH} stroke={GOLD} strokeWidth="1.4" />
      </g>
      <Sparkle x={92} y={46} s={0.8} className="launch-float" />
      <Sparkle x={36} y={104} s={0.6} className="launch-float-slow" />
      {/* calendar */}
      <g>
        <rect x="112" y="40" width="200" height="170" rx="12" fill="#ffffff" stroke={ROSE} strokeWidth="1.6" />
        <path d="M112 52 a12 12 0 0 1 12 -12 h176 a12 12 0 0 1 12 12 v24 h-200z" fill={ROSE} />
        <rect x="146" y="32" width="6" height="16" rx="3" fill={INK} />
        <rect x="272" y="32" width="6" height="16" rx="3" fill={INK} />
        <text x="212" y="63" textAnchor="middle" fontFamily="Jost, sans-serif" fontSize="8" letterSpacing="3" fill="#ffffff">YOUR ESTIMATE</text>
        {Array.from({ length: 28 }).map((_, n) => {
          const c = n % cols;
          const r = Math.floor(n / cols);
          const cx = 132 + c * 26;
          const cy = 94 + r * 25;
          const hit = r === 2 && c === 3;
          return hit ? (
            <g key={n}>
              <circle cx={cx} cy={cy} r="10" fill={GOLD} />
              <path d={`M${cx - 4.5} ${cy + 0.5} l3.4 3.4 l6 -7`} fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          ) : (
            <circle key={n} cx={cx} cy={cy} r="3.4" fill={INK} opacity={[2, 9, 17, 24].includes(n) ? 0.35 : 0.14} />
          );
        })}
      </g>
      {/* clock */}
      <g className="launch-float">
        <circle cx="318" cy="186" r="30" fill="#ffffff" stroke={GOLD} strokeWidth="1.8" />
        <circle cx="318" cy="186" r="24" fill="none" stroke={BLUSH} strokeWidth="1.2" />
        <path d="M318 186 V170 M318 186 L330 192" stroke={ROSE} strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="318" cy="186" r="2.6" fill={INK} />
      </g>
      {/* confirmation */}
      <g>
        <rect x="128" y="218" width="158" height="26" rx="13" fill={INK} />
        <circle cx="146" cy="231" r="6" fill={GOLD} />
        <path d="M143 231 l2.4 2.4 l4.4 -4.8" fill="none" stroke={INK} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <text x="160" y="234.4" fontFamily="Jost, sans-serif" fontSize="8" letterSpacing="2" fill={CREAM}>ESTIMATE BOOKED</text>
      </g>
      <Sparkle x={356} y={60} s={0.9} className="launch-float-slow" />
    </svg>
  );
}
