/**
 * Hand-drawn style line illustrations for the How It Works cards.
 * Pink, cream and gold only, so they sit in the Dollhouse palette.
 */
const ROSE = "#c08079";
const GOLD = "#c6b282";
const INK = "#1f110b";
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
            <stop offset="0" stopColor="#2e1a12" />
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
    <svg {...svgProps} aria-label="A calendar with an appointment booked, plus after-hours moon">
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
        <text x="212" y="63" textAnchor="middle" fontFamily="Jost, sans-serif" fontSize="8" letterSpacing="3" fill="#ffffff">YOUR APPOINTMENT</text>
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
        <text x="160" y="234.4" fontFamily="Jost, sans-serif" fontSize="7.5" letterSpacing="1.6" fill={CREAM}>APPOINTMENT BOOKED</text>
      </g>
      <Sparkle x={356} y={60} s={0.9} className="launch-float-slow" />
    </svg>
  );
}

export function IllustrationCheckout() {
  return (
    <svg {...svgProps} aria-label="An order confirmation and a kickoff call time picker">
      <ellipse cx="200" cy="232" rx="125" ry="9" fill={ROSE} opacity="0.12" />
      <g>
        <rect x="70" y="30" width="170" height="182" rx="14" fill="#ffffff" stroke={ROSE} strokeWidth="1.6" />
        <path d="M70 44 a14 14 0 0 1 14 -14 h142 a14 14 0 0 1 14 14 v8 h-170z" fill={BLUSH} />
        <circle cx="155" cy="86" r="22" fill={GOLD} />
        <path d="M144 86.5 l8 8 l15 -16" fill="none" stroke="#ffffff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        <text x="155" y="130" textAnchor="middle" fontFamily="Jost, sans-serif" fontSize="8" letterSpacing="2.6" fill={INK}>ORDER CONFIRMED</text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx="92" cy={152 + i * 17} r="3" fill={i === 0 ? GOLD : BLUSH} stroke={GOLD} strokeWidth="1" />
            <rect x="104" y={149.5 + i * 17} width={[90, 74, 58][i]} height="5" rx="2.5" fill={INK} opacity={0.3 - i * 0.05} />
          </g>
        ))}
        <rect x="180" y="148" width="40" height="5" rx="2.5" fill={GOLD} opacity="0.8" />
      </g>
      <g className="launch-float-slow">
        <rect x="226" y="108" width="140" height="108" rx="12" fill="#ffffff" stroke={GOLD} strokeWidth="1.5" />
        <text x="296" y="130" textAnchor="middle" fontFamily="Jost, sans-serif" fontSize="7.5" letterSpacing="2.2" fill={ROSE}>KICKOFF CALL</text>
        {["Tue 10:00", "Wed 2:30", "Fri 11:00"].map((t, i) => (
          <g key={t}>
            <rect x="240" y={140 + i * 24} width="112" height="19" rx="9.5" fill={i === 1 ? INK : "#fbf1ed"} stroke={GOLD} strokeWidth="1" strokeOpacity="0.55" />
            <text x="296" y={153 + i * 24} textAnchor="middle" fontFamily="Jost, sans-serif" fontSize="8" letterSpacing="1.4" fill={i === 1 ? CREAM : INK} opacity={i === 1 ? 1 : 0.6}>{t}</text>
          </g>
        ))}
      </g>
      <Sparkle x={46} y={60} s={1.1} className="launch-float" />
      <Sparkle x={274} y={44} s={0.9} className="launch-float-slow" />
      <Sparkle x={376} y={82} s={0.7} className="launch-float" />
      <circle cx="262" cy="70" r="3" fill={ROSE} opacity="0.5" />
      <circle cx="40" cy="150" r="3" fill={GOLD} opacity="0.7" />
      <circle cx="372" cy="150" r="2.4" fill={ROSE} opacity="0.5" />
    </svg>
  );
}

export function IllustrationAccess() {
  return (
    <svg {...svgProps} aria-label="A dashboard with a key, your account is ready immediately">
      <ellipse cx="200" cy="232" rx="125" ry="9" fill={ROSE} opacity="0.12" />
      <g>
        <rect x="84" y="36" width="232" height="148" rx="12" fill="#ffffff" stroke={ROSE} strokeWidth="1.6" />
        <path d="M84 48 a12 12 0 0 1 12 -12 h208 a12 12 0 0 1 12 12 v10 h-232z" fill={BLUSH} />
        {[98, 110, 122].map((x, i) => (
          <circle key={x} cx={x} cy="47" r="3" fill={i === 0 ? ROSE : i === 1 ? GOLD : "#e6cfc9"} />
        ))}
        <rect x="84" y="58" width="42" height="126" fill="#fbf1ed" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="94" y={72 + i * 18} width="22" height="5" rx="2.5" fill={i === 0 ? ROSE : INK} opacity={i === 0 ? 0.8 : 0.22} />
        ))}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx="146" cy={80 + i * 28} r="8" fill={BLUSH} stroke={GOLD} strokeWidth="1" />
            <rect x="162" y={74 + i * 28} width="62" height="5" rx="2.5" fill={INK} opacity="0.55" />
            <rect x="162" y={84 + i * 28} width="42" height="4" rx="2" fill={INK} opacity="0.2" />
          </g>
        ))}
        <rect x="236" y="70" width="68" height="100" rx="8" fill="#fffaf6" stroke={GOLD} strokeWidth="1.1" />
        <text x="270" y="86" textAnchor="middle" fontFamily="Jost, sans-serif" fontSize="6.5" letterSpacing="1.6" fill={ROSE}>SETUP CHECKLIST</text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="244" y={98 + i * 22} width="11" height="11" rx="3" fill={i < 2 ? GOLD : "none"} stroke={GOLD} strokeWidth="1.2" />
            {i < 2 && <path d={`M246.5 ${103.5 + i * 22} l2.4 2.4 l4 -4.6`} fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
            <rect x="260" y={101 + i * 22} width="36" height="4" rx="2" fill={INK} opacity="0.3" />
          </g>
        ))}
      </g>
      <path d="M60 190 h280 l-14 14 h-252z" fill="#e9d6d0" stroke={ROSE} strokeWidth="1.2" strokeLinejoin="round" />
      <g className="launch-float">
        <circle cx="330" cy="62" r="26" fill={GOLD} />
        <circle cx="330" cy="62" r="20" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
        <circle cx="321" cy="62" r="6.5" fill="none" stroke="#ffffff" strokeWidth="3" />
        <path d="M327 62 h22 M342 62 v8 M349 62 v6" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g>
        <rect x="132" y="216" width="136" height="24" rx="12" fill={INK} />
        <circle cx="150" cy="228" r="5.5" fill={GOLD} />
        <path d="M147.4 228 l2.2 2.2 l3.8 -4.4" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="164" y="231" fontFamily="Jost, sans-serif" fontSize="7.5" letterSpacing="2" fill={CREAM}>ACCOUNT READY</text>
      </g>
      <Sparkle x={52} y={70} s={1} className="launch-float-slow" />
      <Sparkle x={366} y={140} s={0.8} className="launch-float" />
      <Sparkle x={40} y={150} s={0.6} className="launch-float" />
    </svg>
  );
}

export function IllustrationFirstPosts() {
  const tiles = [
    { x: 52, g1: "#fbe9e4", g2: "#efc9c3" },
    { x: 158, g1: "#f6e3d6", g2: "#e6c9a4" },
    { x: 264, g1: "#f4dcdc", g2: "#e7c2c0" },
  ];
  return (
    <svg {...svgProps} aria-label="Your first posts ready to review, with a five day publishing plan">
      <ellipse cx="200" cy="232" rx="125" ry="9" fill={ROSE} opacity="0.12" />
      {tiles.map((t, i) => (
        <g key={t.x} className={i === 1 ? "launch-float-slow" : ""}>
          <defs>
            <linearGradient id={`ft${i}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={t.g1} />
              <stop offset="1" stopColor={t.g2} />
            </linearGradient>
          </defs>
          <rect x={t.x} y="44" width="84" height="108" rx="10" fill="#ffffff" stroke={i === 0 ? GOLD : ROSE} strokeWidth="1.5" />
          <rect x={t.x + 8} y="52" width="68" height="62" rx="6" fill={`url(#ft${i})`} />
          <path d={`M${t.x + 42} 70 C${t.x + 43.5} 78 ${t.x + 47} 81 ${t.x + 55} 83 C${t.x + 47} 85 ${t.x + 43.5} 88 ${t.x + 42} 96 C${t.x + 40.5} 88 ${t.x + 37} 85 ${t.x + 29} 83 C${t.x + 37} 81 ${t.x + 40.5} 78 ${t.x + 42} 70Z`} fill={GOLD} opacity="0.9" />
          <rect x={t.x + 8} y="122" width="56" height="5" rx="2.5" fill={INK} opacity="0.45" />
          <rect x={t.x + 8} y="133" width="38" height="4" rx="2" fill={INK} opacity="0.2" />
        </g>
      ))}
      <g>
        <circle cx="136" cy="48" r="13" fill={GOLD} />
        <path d="M130 48.5 l4.2 4.2 l8 -8.6" fill="none" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* five-day plan */}
      <line x1="76" y1="186" x2="324" y2="186" stroke={GOLD} strokeWidth="1.4" strokeDasharray="3 5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <circle cx={76 + i * 62} cy="186" r={i === 4 ? 10 : 6} fill={i === 4 ? GOLD : "#ffffff"} stroke={GOLD} strokeWidth="1.4" />
          {i === 4 && <path d="M319 186.4 l3.2 3.2 l5.6 -6.2" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
          <text x={76 + i * 62} y="208" textAnchor="middle" fontFamily="Jost, sans-serif" fontSize="7" letterSpacing="1.6" fill={INK} opacity="0.5">{`DAY ${i + 1}`}</text>
        </g>
      ))}
      <rect x="132" y="218" width="136" height="24" rx="12" fill={INK} />
      <text x="200" y="233.4" textAnchor="middle" fontFamily="Jost, sans-serif" fontSize="7.5" letterSpacing="2" fill={CREAM}>REVIEW &amp; APPROVE</text>
      <Sparkle x={40} y={60} s={1} className="launch-float" />
      <Sparkle x={366} y={52} s={0.8} className="launch-float-slow" />
      <Sparkle x={372} y={150} s={0.6} className="launch-float" />
    </svg>
  );
}

export function IllustrationSinglePlan() {
  const tiles = [
    [36, 54], [66, 54], [36, 84], [66, 84], [36, 114], [66, 114],
    [298, 54], [328, 54], [298, 84], [328, 84], [298, 114], [328, 114],
  ];
  return (
    <svg {...svgProps} preserveAspectRatio="xMidYMid meet" aria-label="Thirty single-image posts every month">
      <ellipse cx="200" cy="232" rx="125" ry="9" fill={ROSE} opacity="0.12" />
      {tiles.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="26" height="26" rx="5" fill={i % 3 === 0 ? BLUSH : "#fffaf6"} stroke={GOLD} strokeWidth="1" strokeOpacity="0.7" />
      ))}
      <g className="launch-float-slow">
        <rect x="136" y="30" width="128" height="152" rx="14" fill="#ffffff" stroke={ROSE} strokeWidth="1.6" />
        <circle cx="158" cy="54" r="8" fill={BLUSH} stroke={GOLD} strokeWidth="1.2" />
        <rect x="172" y="48" width="52" height="5" rx="2.5" fill={INK} opacity="0.55" />
        <rect x="172" y="58" width="34" height="4" rx="2" fill={INK} opacity="0.25" />
        <rect x="148" y="74" width="104" height="78" rx="8" fill="url(#spGrad)" />
        <defs>
          <linearGradient id="spGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fbe9e4" />
            <stop offset="1" stopColor="#efc9c3" />
          </linearGradient>
        </defs>
        <path d="M200 92 C202 104 207 109 219 112 C207 115 202 120 200 132 C198 120 193 115 181 112 C193 109 198 104 200 92Z" fill={GOLD} />
        <rect x="148" y="162" width="64" height="5" rx="2.5" fill={ROSE} opacity="0.35" />
      </g>
      <text x="200" y="214" textAnchor="middle" fontFamily="Jost, sans-serif" fontSize="9" letterSpacing="3.4" fill={INK} opacity="0.55">30 POSTS A MONTH</text>
      <Sparkle x={52} y={34} s={0.9} className="launch-float" />
      <Sparkle x={348} y={36} s={1} className="launch-float-slow" />
      <Sparkle x={366} y={172} s={0.7} className="launch-float" />
      <Sparkle x={34} y={176} s={0.7} className="launch-float-slow" />
    </svg>
  );
}

export function IllustrationCarouselPlan() {
  return (
    <svg {...svgProps} preserveAspectRatio="xMidYMid meet" aria-label="Fifteen carousel posts and fifteen single-image posts every month">
      <ellipse cx="200" cy="232" rx="125" ry="9" fill={ROSE} opacity="0.12" />
      {/* swipeable slides */}
      {[0, 1, 2].map((i) => (
        <g key={i} className={i === 2 ? "launch-float-slow" : ""}>
          <defs>
            <linearGradient id={`cs${i}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={["#f6e3d6", "#fbe9e4", "#f4dcdc"][i]} />
              <stop offset="1" stopColor={["#e6c9a4", "#efc9c3", "#e7c2c0"][i]} />
            </linearGradient>
          </defs>
          <rect x={44 + i * 62} y={50 + (2 - i) * 4} width="98" height="124" rx="12" fill="#ffffff" stroke={i === 2 ? ROSE : GOLD} strokeWidth="1.5" />
          <rect x={54 + i * 62} y={60 + (2 - i) * 4} width="78" height="66" rx="7" fill={`url(#cs${i})`} />
          {i === 2 && <path d="M193 80 C195 92 200 97 212 100 C200 103 195 108 193 120 C191 108 186 103 174 100 C186 97 191 92 193 80Z" fill={GOLD} />}
          <rect x={54 + i * 62} y={140 + (2 - i) * 4} width="58" height="5" rx="2.5" fill={INK} opacity="0.4" />
          <rect x={54 + i * 62} y={151 + (2 - i) * 4} width="40" height="4" rx="2" fill={INK} opacity="0.2" />
        </g>
      ))}
      {/* single image */}
      <g>
        <rect x="278" y="64" width="86" height="104" rx="11" fill="#ffffff" stroke={GOLD} strokeWidth="1.4" />
        <rect x="286" y="72" width="70" height="58" rx="6" fill="#f1d3cf" />
        <rect x="286" y="138" width="50" height="5" rx="2.5" fill={INK} opacity="0.4" />
        <rect x="286" y="149" width="34" height="4" rx="2" fill={INK} opacity="0.2" />
      </g>
      {/* swipe controls */}
      <circle cx="82" cy="204" r="11" fill="#ffffff" stroke={GOLD} strokeWidth="1.3" />
      <path d="M85 199 l-5 5 l5 5" fill="none" stroke={ROSE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={118 + i * 15} cy="204" r={i === 2 ? 4 : 3} fill={i === 2 ? GOLD : "none"} stroke={GOLD} strokeWidth="1.1" />
      ))}
      <circle cx="226" cy="204" r="11" fill={GOLD} />
      <path d="M223 199 l5 5 l-5 5" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <text x="136" y="234" textAnchor="middle" fontFamily="Jost, sans-serif" fontSize="8" letterSpacing="2.6" fill={INK} opacity="0.55">15 CAROUSELS</text>
      <text x="321" y="190" textAnchor="middle" fontFamily="Jost, sans-serif" fontSize="8" letterSpacing="2.6" fill={INK} opacity="0.55">+ 15 SINGLE</text>
      <Sparkle x={36} y={38} s={0.9} className="launch-float" />
      <Sparkle x={372} y={42} s={0.8} className="launch-float-slow" />
    </svg>
  );
}
