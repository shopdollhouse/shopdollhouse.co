import { useState, useEffect, useRef, useCallback } from "react";

// ─── ROBUST JSON PARSER ──────────────────────────────────────────────────────
function safeParseJSON(raw) {
  const matchingCloser = (char) => (char === "{" ? "}" : "]");

  const extractJsonCandidate = (input) => {
    const cleanedInput = input.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
    const start = cleanedInput.search(/[\[{]/);
    if (start === -1) throw new Error("No JSON object found in response");

    const stack = [];
    let inString = false;
    let isEscaped = false;
    let end = -1;

    for (let i = start; i < cleanedInput.length; i++) {
      const char = cleanedInput[i];

      if (inString) {
        if (isEscaped) {
          isEscaped = false;
          continue;
        }
        if (char === "\\") {
          isEscaped = true;
          continue;
        }
        if (char === '"') inString = false;
        continue;
      }

      if (char === '"') {
        inString = true;
        continue;
      }

      if (char === "{" || char === "[") {
        stack.push(char);
        continue;
      }

      if (char === "}" || char === "]") {
        if (stack.length && matchingCloser(stack[stack.length - 1]) === char) {
          stack.pop();
          if (stack.length === 0) {
            end = i;
            break;
          }
        }
      }
    }

    let candidate = end === -1 ? cleanedInput.slice(start) : cleanedInput.slice(start, end + 1);

    if (end === -1) {
      if (inString && !isEscaped) candidate += '"';
      candidate = candidate
        .replace(/,\s*"[^"]*"?\s*:?\s*[^,}\]]*$/, "")
        .replace(/:\s*$/, "")
        .replace(/,\s*$/, "");
      while (stack.length) candidate += matchingCloser(stack.pop());
    }

    return candidate;
  };

  const repairMalformedJsonStrings = (input) => {
    let output = "";
    let inString = false;

    for (let i = 0; i < input.length; i++) {
      const char = input[i];

      if (!inString) {
        if (char === '"') inString = true;
        output += /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(char) ? "" : char;
        continue;
      }

      if (char === '"') {
        let backslashes = 0;
        for (let j = i - 1; j >= 0 && input[j] === "\\"; j--) backslashes++;
        if (backslashes % 2 === 0) inString = false;
        output += char;
        continue;
      }

      if (char === "\\") {
        const next = input[i + 1];

        if (!next) {
          output += "\\\\";
          continue;
        }

        if (next === "u") {
          const unicode = input.slice(i + 2, i + 6);
          if (/^[0-9a-fA-F]{4}$/.test(unicode)) {
            output += `\\u${unicode}`;
            i += 5;
          } else {
            output += "\\\\u";
            i += 1;
          }
          continue;
        }

        if (/["\\/bfnrt]/.test(next)) {
          output += `\\${next}`;
          i += 1;
          continue;
        }

        output += `\\\\${next}`;
        i += 1;
        continue;
      }

      if (char === "\n") {
        output += "\\n";
        continue;
      }
      if (char === "\r") {
        output += "\\r";
        continue;
      }
      if (char === "\t") {
        output += "\\t";
        continue;
      }
      if (/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(char)) continue;

      output += char;
    }

    if (inString) output += '"';
    return output;
  };

  let cleaned = extractJsonCandidate(raw)
    .replace(/,\s*}/g, "}")
    .replace(/,\s*]/g, "]");

  try {
    return JSON.parse(cleaned);
  } catch {
    cleaned = repairMalformedJsonStrings(cleaned)
      .replace(/,\s*}/g, "}")
      .replace(/,\s*]/g, "]");
    return JSON.parse(cleaned);
  }
}

function cleanStyleAScriptText(text = "") {
  return String(text)
    .replace(/Today,\s*we\s+will\s+fix\s+that\.?/gi, "Today, I am going to show you the first simple steps to start your own product shop.")
    .replace(/Today,\s*we\s+fix\s+that\.?/gi, "Today, I am going to show you the first simple steps to start your own product shop.")
    .replace(/I\s+will\s+show\s+you\s+how\s+to\s+start\s+your\s+own\s+easy\s+product\s+shop\.?/gi, "I will show you the first simple steps to start your own product shop.")
    .replace(/So\s+simple,\s*a\s+10-year-old\s+could\s+do\s+it\.?/gi, "Simple enough to follow even if you are brand new.")
    .replace(/It'?s\s+a\s+payment\s+to\s+yourself\.\s*For\s+your\s+own\s+freedom\.?/gi, "It is a small step toward your own shop and your own plan.")
    .replace(/It'?s\s+a\s+payment\s+to\s+yourself\.?/gi, "It is a small step toward your own shop and your own plan.")
    .replace(/For\s+your\s+own\s+freedom\.?/gi, "For your own shop and your own plan.")
    .replace(/This\s+is\s+your\s+moment\.?/gi, "This can be your first step.")
    .replace(/It'?s\s+magic!?/gi, "That is why I love it for beginners.");
}

function cleanStyleALiveData(value) {
  if (typeof value === "string") return cleanStyleAScriptText(value);
  if (Array.isArray(value)) return value.map(cleanStyleALiveData);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cleanStyleALiveData(entry)]));
  }
  return value;
}

// ─── FONTS ───────────────────────────────────────────────────────────────────
const FONT_URL = "https://fonts.googleapis.com/css2?family=Cormorant+SC:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500&family=Jost:wght@300;400;500&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap";

function useFonts() {
  useEffect(() => {
    if (!document.getElementById("dh-fonts")) {
      const l = document.createElement("link");
      l.id = "dh-fonts"; l.rel = "stylesheet"; l.href = FONT_URL;
      document.head.appendChild(l);
    }
    if (!document.getElementById("dh-global")) {
      const s = document.createElement("style");
      s.id = "dh-global";
      s.textContent = `
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-track{background:rgba(0,0,0,0.03)}
        ::-webkit-scrollbar-thumb{background:var(--dh-scrollbar,rgba(156,123,110,0.25));border-radius:2px}
        @keyframes riseIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}
        @keyframes popIn{from{transform:scale(0.7);opacity:0}to{transform:scale(1);opacity:1}}
        @media(max-width:800px){.dh-sidebar{transform:translateX(-100%);transition:transform 0.25s ease}.dh-sidebar.open{transform:translateX(0)!important}.dh-main{margin-left:0!important;padding-left:0!important}.dh-hamburger{display:flex!important}}
      `;
      document.head.appendChild(s);
    }
  }, []);
}

function useScrollbarTheme(T) {
  useEffect(() => {
    document.documentElement.style.setProperty("--dh-scrollbar", T.p3 + "66");
    document.documentElement.style.background = T.bg;
  }, [T]);
}

// ─── THEMES ──────────────────────────────────────────────────────────────────
const THEMES = {
  latte: {
    name: "Latte", symbol: "◈",
    bg: "#faf3ee", surface: "#fff8f3", card: "#ffffff",
    border: "rgba(201,176,166,0.2)", borderMid: "rgba(201,176,166,0.38)",
    ink: "#3E2723", mid: "#5d4037", light: "#a1887f",
    p3: "#c9b0a6", p4: "#a1887f", p5: "#795548",
    accent: "#c9b0a6", gold: "#b8916a", sidebar: "#f5ece4",
    sidebarBorder: "rgba(201,176,166,0.22)",
    navActive: "rgba(201,176,166,0.15)", navActiveBorder: "rgba(201,176,166,0.4)",
    navActiveText: "#795548",
    statBg: "#ffffff",
  },
  rose: {
    name: "Rosé", symbol: "◇",
    bg: "#fdf0f0", surface: "#fff5f5", card: "#ffffff",
    border: "rgba(211,179,179,0.22)", borderMid: "rgba(211,179,179,0.4)",
    ink: "#3c1f1f", mid: "#6d4c4c", light: "#b08888",
    p3: "#d3b3b3", p4: "#b08888", p5: "#8c6060",
    accent: "#d3b3b3", gold: "#c49090", sidebar: "#f8e8e8",
    sidebarBorder: "rgba(211,179,179,0.24)",
    navActive: "rgba(211,179,179,0.16)", navActiveBorder: "rgba(211,179,179,0.42)",
    navActiveText: "#8c6060",
    statBg: "#ffffff",
  },
  taupe: {
    name: "Taupe", symbol: "◑",
    bg: "#f5ede6", surface: "#faf4ee", card: "#fffaf6",
    border: "rgba(184,168,152,0.22)", borderMid: "rgba(184,168,152,0.4)",
    ink: "#3a3028", mid: "#5c4e42", light: "#9a8a7a",
    p3: "#b8a898", p4: "#9a8a7a", p5: "#706050",
    accent: "#b8a898", gold: "#a08860", sidebar: "#eee4da",
    sidebarBorder: "rgba(184,168,152,0.22)",
    navActive: "rgba(184,168,152,0.16)", navActiveBorder: "rgba(184,168,152,0.42)",
    navActiveText: "#706050",
    statBg: "#fffaf6",
  },
  mocha: {
    name: "Mocha", symbol: "◉",
    bg: "#150a00", surface: "#1e1208", card: "#261a0e",
    border: "rgba(250,245,238,0.08)", borderMid: "rgba(250,245,238,0.16)",
    ink: "#faf5ee", mid: "#c4b8a8", light: "#7a6e60",
    p3: "#c9b0a6", p4: "#e0ccc0", p5: "#faf5ee",
    accent: "#c9b0a6", gold: "#b8916a", sidebar: "#0e0600",
    sidebarBorder: "rgba(250,245,238,0.06)",
    navActive: "rgba(201,176,166,0.1)", navActiveBorder: "rgba(201,176,166,0.2)",
    navActiveText: "#e0ccc0",
    statBg: "#261a0e",
  },
};

// ─── STORAGE (IndexedDB for large data like images) ──────────────────────────
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("dh_storage", 1);
    req.onupgradeneeded = () => req.result.createObjectStore("kv");
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function storageGet(key) {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction("kv", "readonly");
      const req = tx.objectStore("kv").get(key);
      req.onsuccess = () => resolve(req.result !== undefined ? req.result : null);
      req.onerror = () => resolve(null);
    });
  } catch { return null; }
}
async function storageSet(key, val) {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction("kv", "readwrite");
      tx.objectStore("kv").put(val, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch {}
}

function usePersist(key, def) {
  const [val, setVal] = useState(def);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    storageGet(key).then(v => { if (v !== null) setVal(v); setLoaded(true); });
  }, [key]);
  const update = useCallback((v) => {
    setVal(prev => {
      const next = typeof v === "function" ? v(prev) : v;
      storageSet(key, next);
      return next;
    });
  }, [key]);
  return [val, update, loaded];
}

// ─── PIN LOCK ─────────────────────────────────────────────────────────────────
const DEFAULT_PIN = "8805";

function PinLock({ onUnlock, savedPin, themeKey }) {
  const PT = THEMES[themeKey] || THEMES.blush;
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [mode, setMode] = useState("lock");
  const [newPin, setNewPin] = useState("");
  const [newPin2, setNewPin2] = useState("");
  const [pinErr, setPinErr] = useState("");
  const [step, setStep] = useState(1);
  const pin = savedPin || DEFAULT_PIN;

  function press(d) {
    if (mode === "lock") {
      const next = input + d;
      setInput(next);
      if (next.length === 4) {
        if (next === pin) { onUnlock(); }
        else { setShake(true); setTimeout(() => { setShake(false); setInput(""); }, 600); }
      }
    } else {
      if (step === 1) {
        const next = newPin + d; setNewPin(next);
        if (next.length === 4) setStep(2);
      } else {
        const next = newPin2 + d; setNewPin2(next);
        if (next.length === 4) {
          if (next === newPin) { storageSet("dh_pin", next); setMode("lock"); setInput(""); setNewPin(""); setNewPin2(""); setStep(1); setPinErr(""); }
          else { setPinErr("PINs don't match. Try again."); setNewPin(""); setNewPin2(""); setStep(1); }
        }
      }
    }
  }
  function del() {
    if (mode === "lock") setInput(i => i.slice(0,-1));
    else if (step === 1) setNewPin(p => p.slice(0,-1));
    else setNewPin2(p => p.slice(0,-1));
  }
  const dots = mode === "lock" ? input : step === 1 ? newPin : newPin2;

  return (
    <div style={{ minHeight:"100vh", background:PT.bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ textAlign:"center", animation:"riseIn 0.4s ease both" }}>
        <Logo size={52} color={PT.p3} />
        <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:22, color:PT.ink, fontStyle:"italic", marginTop:16, marginBottom:4, letterSpacing:1 }}>The Dollhouse</div>
        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:4, textTransform:"uppercase", color:PT.light, marginBottom:32 }}>
          {mode==="lock" ? "Private Studio · Enter PIN" : step===1 ? "Set New PIN" : "Confirm New PIN"}
        </div>
        {pinErr && <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#cc4444", marginBottom:16 }}>{pinErr}</div>}
        <div style={{ display:"flex", gap:14, justifyContent:"center", marginBottom:36, animation:shake?"shake 0.5s ease":"none" }}>
          {[0,1,2,3].map(i=>(
            <div key={i} style={{ width:14, height:14, borderRadius:"50%", background:dots.length>i?PT.p3:PT.border, border:`1.5px solid ${PT.borderMid}`, transition:"background 0.15s" }} />
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,68px)", gap:10, justifyContent:"center", marginBottom:20 }}>
          {[1,2,3,4,5,6,7,8,9].map(d=>(
            <button key={d} onClick={()=>press(String(d))}
              style={{ height:68, borderRadius:14, background:PT.card, border:`1px solid ${PT.borderMid}`, fontFamily:"'Cormorant SC',serif", fontSize:24, color:PT.ink, cursor:"pointer", boxShadow:"0 2px 8px rgba(0,0,0,0.04)", transition:"all 0.12s", fontStyle:"italic" }}
              onMouseEnter={e=>e.currentTarget.style.background="#fdf0ee"}
              onMouseLeave={e=>e.currentTarget.style.background="#fff"}>{d}</button>
          ))}
          <div />
          <button onClick={()=>press("0")} style={{ height:68, borderRadius:14, background:PT.card, border:`1px solid ${PT.borderMid}`, fontFamily:"'Cormorant SC',serif", fontSize:24, color:PT.ink, cursor:"pointer", boxShadow:"0 2px 8px rgba(0,0,0,0.04)", transition:"all 0.12s", fontStyle:"italic" }}
            onMouseEnter={e=>e.currentTarget.style.background=PT.bg}
            onMouseLeave={e=>e.currentTarget.style.background=PT.card}>0</button>
          <button onClick={del} style={{ height:68, borderRadius:14, background:"transparent", border:`1px solid ${PT.border}`, fontFamily:"'DM Sans',sans-serif", fontSize:18, color:PT.light, cursor:"pointer" }}>⌫</button>
        </div>
        {mode==="lock"
          ? <button onClick={()=>{setMode("set");setNewPin("");setNewPin2("");setStep(1);setPinErr("");}} style={{ background:"none",border:"none",fontFamily:"'Jost',sans-serif",fontSize:8,letterSpacing:3,textTransform:"uppercase",color:PT.light,cursor:"pointer",marginTop:8 }}>Change PIN</button>
          : <button onClick={()=>{setMode("lock");setNewPin("");setNewPin2("");setStep(1);setPinErr("");}} style={{ background:"none",border:"none",fontFamily:"'Jost',sans-serif",fontSize:8,letterSpacing:3,textTransform:"uppercase",color:PT.light,cursor:"pointer",marginTop:8 }}>Cancel</button>
        }
        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, color:PT.light, opacity:0.35, marginTop:20, textTransform:"uppercase" }}>Default PIN: 8805 · Change it above</div>
      </div>
    </div>
  );
}

// ─── BRANDS ──────────────────────────────────────────────────────────────────
const DEFAULT_BRANDS = [
  { id:"dollhouse", name:"The Dollhouse", handle:"@shopdollhouse", color:"#c4a89a", type:"main", platforms:["tiktok","instagram","threads","youtube","pinterest"], goal:"Personal brand — Sell the Dollhouse Brand Starter System. Reach $100k then $1M." },
  { id:"girllisten", name:"Girl, Listen", handle:"@girllisten", color:"#d4879a", type:"faceless", platforms:["tiktok","instagram"], goal:"Faceless brand — content scheduled via Buffer on TikTok & Instagram." },
  { id:"shegets", name:"She Gets It", handle:"@shegets", color:"#8aaa8c", type:"faceless", platforms:["tiktok","instagram"], goal:"Faceless brand — content scheduled via Buffer on TikTok & Instagram." },
];
const PLATFORM_ICONS  = { tiktok:"♪", instagram:"◉", threads:"⊕", youtube:"▶", pinterest:"✦" };
const PLATFORM_COLORS = { tiktok:"#ff2d55", instagram:"#e1306c", threads:"#9c7b6e", youtube:"#ff0000", pinterest:"#e60023" };
const CONTENT_TYPES   = ["TikTok Video","TikTok Live","Instagram Reel","Instagram Post","Instagram Story","Threads Post","YouTube Video","YouTube Short","Pinterest Pin"];
const STAN_LINK = "https://stan.store/shopdollhouse/p/the-dollhouse--brand-starter-system-bet2kjnl";
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MONTH_FULL = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// ─── NAV ─────────────────────────────────────────────────────────────────────
const NAV = [
  { id:"dashboard",  label:"Dashboard",    icon:"⌂" },
  { id:"calendar",   label:"Calendar",     icon:"◫" },
  { id:"scripts",    label:"Scripts",      icon:"✎" },
  { id:"live",       label:"Live Studio",  icon:"⏺" },
  { id:"finance",    label:"Money",        icon:"◈" },
  { id:"growth",     label:"Growth",       icon:"↗" },
  { id:"insights",   label:"Insights",     icon:"✵" },
  { id:"notes",      label:"Notes",        icon:"✦" },
  { id:"brands",     label:"Brands",       icon:"◉" },
  { id:"vision",     label:"Vision Board", icon:"◈" },
  { id:"goals",      label:"Goals",        icon:"◆" },
];

// ─── LOGO ─────────────────────────────────────────────────────────────────────
function Logo({ size=32, color }) {
  const T = useTheme();
  const c = color || T.p4;
  return (
    <svg width={size*0.78} height={size} viewBox="0 0 78 100" fill="none" style={{display:"block",flexShrink:0}}>
      <path d="M8 100 L8 46 Q8 8 39 8 Q70 8 70 46 L70 100" stroke={c} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      <path d="M18 100 L18 50 Q18 22 39 22 Q60 22 60 50 L60 100" stroke={c} strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.45"/>
      <path d="M39 6 C39 6 30 -1 30 5.5 C30 9.5 34 12 39 16 C44 12 48 9.5 48 5.5 C48 -1 39 6 39 6Z" fill={c} opacity="0.9"/>
    </svg>
  );
}

// ─── THEME CONTEXT ────────────────────────────────────────────────────────────
import { createContext, useContext } from "react";
const ThemeCtx = createContext(THEMES.latte);
const useTheme = () => useContext(ThemeCtx);

// ─── SHARED UI ────────────────────────────────────────────────────────────────
function Card({ children, style={}, onClick, hover=true }) {
  const T = useTheme();
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => hover && onClick && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background:T.card, border:`1px solid ${hov?T.borderMid:T.border}`, borderRadius:14, transition:"border-color 0.18s, box-shadow 0.18s", boxShadow: hov ? `0 4px 20px rgba(0,0,0,0.06)` : "0 1px 4px rgba(0,0,0,0.04)", cursor: onClick ? "pointer" : "default", ...style }}>
      {children}
    </div>
  );
}

function Btn({ children, onClick, variant="primary", style={}, disabled=false, as="button", href, small=false }) {
  const T = useTheme();
  const [hov, setHov] = useState(false);
  const pad = small ? "7px 16px" : "10px 22px";
  const fs = small ? 9 : 10;
  const base = {
    display:"inline-flex", alignItems:"center", gap:7, padding:pad,
    borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:fs, letterSpacing:3,
    textTransform:"uppercase", fontWeight:500, cursor:disabled?"not-allowed":"pointer",
    opacity:disabled?0.4:1, transition:"all 0.18s", border:"none", textDecoration:"none",
    ...(variant==="primary" ? { background: hov ? T.p4 : T.p3, color:"#fff", transform: hov&&!disabled?"translateY(-1px)":"none", boxShadow: hov&&!disabled?`0 4px 16px rgba(0,0,0,0.12)`:"none" } :
        variant==="ghost"   ? { background:"transparent", color: hov?T.p4:T.p3, border:`1px solid ${T.borderMid}` } :
        variant==="soft"    ? { background: hov?`rgba(0,0,0,0.06)`:`rgba(0,0,0,0.04)`, color:T.mid, border:`1px solid ${T.border}` } :
        variant==="danger"  ? { background:hov?"rgba(220,60,60,0.12)":"rgba(220,60,60,0.07)", color:"#cc4444", border:"1px solid rgba(220,60,60,0.2)" } : {}),
    ...style,
  };
  if (as==="a") return <a href={href} target="_blank" rel="noopener noreferrer" style={base}>{children}</a>;
  return <button onClick={onClick} disabled={disabled} style={base}
    onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{children}</button>;
}

function Input({ label, value, onChange, placeholder, type="text", style={} }) {
  const T = useTheme();
  const [foc, setFoc] = useState(false);
  return (
    <div style={{ marginBottom:14 }}>
      {label && <Label>{label}</Label>}
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        style={{ width:"100%", padding:"10px 13px", background:`rgba(0,0,0,0.02)`, border:`1px solid ${foc?T.p3:T.border}`, borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.ink, outline:"none", transition:"border-color 0.2s", ...style }}
        onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)} />
    </div>
  );
}

function Textarea({ label, value, onChange, placeholder, rows=4, style={} }) {
  const T = useTheme();
  const [foc, setFoc] = useState(false);
  return (
    <div style={{ marginBottom:14 }}>
      {label && <Label>{label}</Label>}
      <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows}
        style={{ width:"100%", padding:"10px 13px", background:`rgba(0,0,0,0.02)`, border:`1px solid ${foc?T.p3:T.border}`, borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.ink, outline:"none", resize:"vertical", lineHeight:1.7, transition:"border-color 0.2s", ...style }}
        onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)} />
    </div>
  );
}

function Sel({ label, value, onChange, options, style={} }) {
  const T = useTheme();
  return (
    <div style={{ marginBottom:14 }}>
      {label && <Label>{label}</Label>}
      <select value={value} onChange={e=>onChange(e.target.value)}
        style={{ width:"100%", padding:"10px 13px", background:T.surface, border:`1px solid ${T.border}`, borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.ink, outline:"none", appearance:"none", cursor:"pointer", ...style }}>
        {options.map(o=><option key={o.value||o} value={o.value||o}>{o.label||o}</option>)}
      </select>
    </div>
  );
}

function Label({ children }) {
  const T = useTheme();
  return <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:3, textTransform:"uppercase", color:T.p4, marginBottom:6 }}>{children}</div>;
}

function Eyebrow({ children }) {
  const T = useTheme();
  return <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:4, textTransform:"uppercase", color:T.p4, marginBottom:6 }}>{children}</div>;
}

function Divider() {
  const T = useTheme();
  return <div style={{ height:1, background:T.border, margin:"16px 0" }} />;
}

function Modal({ open, onClose, title, children, width=520 }) {
  const T = useTheme();
  if (!open) return null;
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(50,30,25,0.3)", zIndex:500, display:"flex", alignItems:"center", justifyContent:"center", padding:20, backdropFilter:"blur(6px)" }}
      onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div style={{ background:T.surface, border:`1px solid ${T.borderMid}`, borderRadius:18, padding:"32px 36px", width:"100%", maxWidth:width, maxHeight:"90vh", overflowY:"auto", animation:"riseIn 0.28s ease both", boxShadow:"0 20px 60px rgba(0,0,0,0.12)" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22 }}>
          <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:20, color:T.ink, fontStyle:"italic" }}>{title}</div>
          <button onClick={onClose} style={{ background:"none", border:"none", color:T.light, fontSize:18, cursor:"pointer", padding:"4px 8px", borderRadius:6, lineHeight:1 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Page({ title, sub, children, action, onMenuClick }) {
  const T = useTheme();
  return (
    <div style={{ padding:"36px 36px 80px", animation:"riseIn 0.35s ease both", minHeight:"100vh", background:T.bg }}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:14 }}>
        <div>
          <Eyebrow>The Dollhouse · Content Studio</Eyebrow>
          <h1 style={{ fontFamily:"'Cormorant SC',serif", fontSize:"clamp(22px,2.8vw,32px)", color:T.ink, fontStyle:"italic", fontWeight:400, letterSpacing:1 }}>{title}</h1>
          {sub && <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:T.mid, fontStyle:"italic", marginTop:3 }}>{sub}</div>}
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  );
}

function MiniStat({ label, value, T }) {
  return (
    <div style={{ padding:"10px 12px", background:`rgba(0,0,0,0.03)`, borderRadius:8 }}>
      <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:3, textTransform:"uppercase", color:T.light, marginBottom:3 }}>{label}</div>
      <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:18, color:T.p4, fontStyle:"italic" }}>{value}</div>
    </div>
  );
}

function StatCard({ label, value, sub, color, onClick }) {
  const T = useTheme();
  return (
    <Card onClick={onClick} style={{ padding:"22px 20px" }} hover={!!onClick}>
      <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:3, textTransform:"uppercase", color:T.light, marginBottom:6 }}>{label}</div>
      <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:36, color:color||T.p4, fontStyle:"italic", lineHeight:1, marginBottom:3 }}>{value}</div>
      {sub && <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:T.light }}>{sub}</div>}
    </Card>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({ active, onNav, theme, setTheme, onLock, isOpen, onClose }) {
  const T = useTheme();
  const [themeOpen, setThemeOpen] = useState(false);
  return (
    <div className={`dh-sidebar${isOpen?" open":""}`} style={{ width:210, minHeight:"100vh", background:T.sidebar, borderRight:`1px solid ${T.sidebarBorder}`, display:"flex", flexDirection:"column", position:"fixed", left:0, top:0, bottom:0, zIndex:100, boxShadow:"2px 0 12px rgba(0,0,0,0.04)" }}>
      {/* Header */}
      <div style={{ padding:"24px 20px 20px", borderBottom:`1px solid ${T.sidebarBorder}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:2 }}>
          <Logo size={32} />
          <div>
            <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:12, color:T.ink, letterSpacing:1, fontStyle:"italic" }}>The Dollhouse</div>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:3, textTransform:"uppercase", color:T.light, marginTop:1 }}>Content Studio</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex:1, padding:"12px 10px", overflowY:"auto" }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => onNav(n.id)}
            style={{ display:"flex", alignItems:"center", gap:10, width:"100%", padding:"10px 12px", marginBottom:2, background:active===n.id?T.navActive:"transparent", border:`1px solid ${active===n.id?T.navActiveBorder:"transparent"}`, borderRadius:9, fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:2, textTransform:"uppercase", color:active===n.id?T.navActiveText:T.light, cursor:"pointer", textAlign:"left", transition:"all 0.15s" }}>
            <span style={{ fontSize:13, width:14, textAlign:"center" }}>{n.icon}</span>
            {n.label}
          </button>
        ))}
      </nav>

      {/* Theme switcher */}
      <div style={{ padding:"10px 10px 0", borderTop:`1px solid ${T.sidebarBorder}` }}>
        <button onClick={() => setThemeOpen(o=>!o)}
          style={{ display:"flex", alignItems:"center", gap:8, width:"100%", padding:"9px 12px", background:"transparent", border:`1px solid ${T.border}`, borderRadius:9, fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:T.light, cursor:"pointer" }}>
          <span>{THEMES[theme].symbol}</span> Theme
          <span style={{ marginLeft:"auto", fontSize:10 }}>{themeOpen?"▲":"▼"}</span>
        </button>
        {themeOpen && (
          <div style={{ display:"flex", flexDirection:"column", gap:4, padding:"8px 0" }}>
            {Object.entries(THEMES).map(([k,t]) => (
              <button key={k} onClick={() => { setTheme(k); setThemeOpen(false); }}
                style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 12px", background:theme===k?T.navActive:"transparent", border:`1px solid ${theme===k?T.navActiveBorder:"transparent"}`, borderRadius:8, fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:theme===k?T.navActiveText:T.light, cursor:"pointer" }}>
                <span>{t.symbol}</span>{t.name}
                {theme===k && <span style={{ marginLeft:"auto", color:T.p3 }}>✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding:"10px 10px 16px" }} />
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ posts, scripts, brands, finances, growth, notes, onNav }) {
  const T = useTheme();
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const thisMonth = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}`;

  const todayPosts = posts.filter(p=>p.date===todayStr);
  const weekPosts = posts.filter(p=>{ const d=new Date(p.date), diff=(d-today)/86400000; return diff>=-0.1&&diff<7; });
  const thisMonthFinance = finances.find(f=>f.month===thisMonth)||{ income:0, expenses:0 };
  const totalRevenue = finances.reduce((s,f)=>s+(f.income||0),0);
  const liveScripts = scripts.filter(s=>s.isLive||s.type==="TikTok Live");

  // Goal progress
  const goal1=100000, goal2=1000000;
  const pct1 = Math.min(100,(totalRevenue/goal1)*100);
  const pct2 = Math.min(100,(totalRevenue/goal2)*100);
  const atMillion = totalRevenue >= goal1;

  // Up next scripts: scripts not yet used/linked to a posted post
  const linkedScriptIds = posts.filter(p=>p.scriptId&&p.status==="posted").map(p=>p.scriptId);
  const readyScripts = scripts ? scripts.filter(s=>s.status!=="used"&&!linkedScriptIds.includes(s.id)).slice(0,3) : [];
  // This week unposted
  const weekUnposted = weekPosts.filter(p=>p.status!=="posted"&&p.status!=="skipped");
  // Buffer queue
  const bufferQueue = posts.filter(p=>p.bufferSent&&p.status!=="posted");

  return (
    <Page title="Dashboard" sub={`${today.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}`}>
      {/* TODAY'S FOCUS BLOCK */}
      <Card style={{ padding:"24px 28px", marginBottom:20, background:`linear-gradient(135deg, ${T.card} 0%, ${T.surface} 100%)`, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${T.p3}, ${T.p4}, ${T.p3})` }} />
        <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:13, color:T.p3, fontStyle:"italic", letterSpacing:2, marginBottom:16, textTransform:"uppercase", fontSize:9, fontFamily:"'Jost',sans-serif", letterSpacing:4 }}>Today's Focus</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
          {/* Posts today */}
          <div>
            <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:15, color:T.ink, fontStyle:"italic", marginBottom:10 }}>Post Today</div>
            {todayPosts.length === 0
              ? <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:13, color:T.light, fontStyle:"italic" }}>Nothing scheduled yet</div>
              : todayPosts.map(p=>(
                <div key={p.id} style={{ display:"flex", alignItems:"center", gap:7, padding:"6px 0", borderBottom:`1px solid ${T.border}` }}>
                  <span style={{ color:PLATFORM_COLORS[p.platform], fontSize:12 }}>{PLATFORM_ICONS[p.platform]}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:p.status==="posted"?T.light:T.ink, textDecoration:p.status==="posted"?"line-through":"none", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.title}</div>
                  </div>
                  <div style={{ width:7, height:7, borderRadius:"50%", background:p.status==="posted"?"#6aaa6c":p.bufferSent?"#7ab0d4":T.borderMid, flexShrink:0 }} title={p.status} />
                </div>
              ))
            }
            <div style={{ marginTop:10 }}><Btn small variant="ghost" onClick={()=>onNav("calendar")}>Open Calendar →</Btn></div>
          </div>
          {/* Scripts ready */}
          <div>
            <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:15, color:T.ink, fontStyle:"italic", marginBottom:10 }}>Scripts Ready</div>
            {readyScripts.length === 0
              ? <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:13, color:T.light, fontStyle:"italic" }}>All scripts used — generate more</div>
              : readyScripts.map(s=>(
                <div key={s.id} style={{ padding:"6px 0", borderBottom:`1px solid ${T.border}` }}>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:T.ink, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{s.title||s.topic}</div>
                  {s.fourx4?.hook_line_1 && <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:11, color:T.p4, fontStyle:"italic", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>"{s.fourx4.hook_line_1}"</div>}
                </div>
              ))
            }
            <div style={{ marginTop:10 }}><Btn small variant="ghost" onClick={()=>onNav("scripts")}>Open Scripts →</Btn></div>
          </div>
          {/* Buffer queue */}
          <div>
            <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:15, color:T.ink, fontStyle:"italic", marginBottom:10 }}>Buffer Queue</div>
            {bufferQueue.length === 0
              ? <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:13, color:T.light, fontStyle:"italic" }}>No posts queued</div>
              : bufferQueue.slice(0,3).map(p=>(
                <div key={p.id} style={{ display:"flex", alignItems:"center", gap:7, padding:"6px 0", borderBottom:`1px solid ${T.border}` }}>
                  <span style={{ color:PLATFORM_COLORS[p.platform], fontSize:12 }}>{PLATFORM_ICONS[p.platform]}</span>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:T.ink, flex:1, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.title}</div>
                  <span style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:1, color:"#6aaa6c" }}>↗</span>
                </div>
              ))
            }
            {bufferQueue.length > 0 && <div style={{ marginTop:10 }}><a href="https://buffer.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, color:T.p3, textDecoration:"none", textTransform:"uppercase" }}>Open Buffer ↗</a></div>}
          </div>
        </div>
      </Card>
      {/* Goal bar */}
      <Card style={{ padding:"24px 28px", marginBottom:20, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, ${T.p3}, ${T.p4})` }} />
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:10 }}>
          <div>
            <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:18, color:T.ink, fontStyle:"italic" }}>Revenue Goal</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:T.mid, fontStyle:"italic" }}>Total earned to date</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:32, color:T.p4, fontStyle:"italic" }}>${totalRevenue.toLocaleString()}</div>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, color:T.light, textTransform:"uppercase" }}>of ${atMillion ? "1,000,000" : "100,000"}</div>
          </div>
        </div>
        {/* Progress track */}
        <div style={{ position:"relative" }}>
          <div style={{ height:10, background:`rgba(0,0,0,0.06)`, borderRadius:99, overflow:"hidden", marginBottom:8 }}>
            <div style={{ height:"100%", width:`${atMillion?pct2:pct1}%`, background:`linear-gradient(90deg, ${T.p3}, ${T.p4})`, borderRadius:99, transition:"width 1s ease" }} />
          </div>
          <div style={{ display:"flex", justifyContent:"space-between" }}>
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, color:T.light, textTransform:"uppercase" }}>$0</span>
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, color: pct1>=100?T.p3:T.light, textTransform:"uppercase" }}>$100k {pct1>=100&&"✓"}</span>
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, color: pct2>=100?T.p3:T.light, textTransform:"uppercase" }}>$1M {pct2>=100&&"✓"}</span>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:12, marginBottom:20 }}>
        <StatCard label="Today's Posts" value={todayPosts.length} sub="scheduled" onClick={()=>onNav("calendar")} />
        <StatCard label="This Week" value={weekPosts.length} sub="upcoming" color={T.gold} onClick={()=>onNav("calendar")} />
        <StatCard label="This Month" value={`$${(thisMonthFinance.income||0).toLocaleString()}`} sub="revenue" color="#6aaa6c" onClick={()=>onNav("finance")} />
        <StatCard label="Net Profit" value={`$${((thisMonthFinance.income||0)-(thisMonthFinance.expenses||0)).toLocaleString()}`} sub="this month" color={T.p4} onClick={()=>onNav("finance")} />
        <StatCard label="Live Scripts" value={liveScripts.length} sub="ready" onClick={()=>onNav("live")} />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
        {/* This week */}
        <Card style={{ padding:"22px" }}>
          <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:16, color:T.ink, fontStyle:"italic", marginBottom:4 }}>This Week</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:T.light, fontStyle:"italic", marginBottom:12 }}>{weekUnposted.length} post{weekUnposted.length!==1?"s":""} to go</div>
          {weekUnposted.length===0
            ? <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:T.light, fontStyle:"italic" }}>All caught up — schedule more →</div>
            : weekUnposted.slice(0,6).map(p=>{
                const d = new Date(p.date+"T12:00:00");
                return (
                  <div key={p.id} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 0", borderBottom:`1px solid ${T.border}` }}>
                    <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:10, color:T.light, fontStyle:"italic", width:28, flexShrink:0 }}>{d.toLocaleDateString("en-US",{weekday:"short"})}</div>
                    <span style={{ color:PLATFORM_COLORS[p.platform], fontSize:12 }}>{PLATFORM_ICONS[p.platform]}</span>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:T.ink, flex:1, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.title}</div>
                    {p.scriptId && <span style={{ fontSize:9, color:T.p3 }}>✎</span>}
                    {p.bufferSent && <span style={{ fontSize:9, color:"#6aaa6c" }}>↗</span>}
                  </div>
                );
              })
          }
          <div style={{ marginTop:12 }}><Btn small variant="ghost" onClick={()=>onNav("calendar")}>Full Calendar →</Btn></div>
        </Card>

        {/* Performance snapshot */}
        <Card style={{ padding:"22px" }}>
          <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:16, color:T.ink, fontStyle:"italic", marginBottom:4 }}>Performance</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:T.light, fontStyle:"italic", marginBottom:12 }}>Posts with logged stats this month</div>
          {(() => {
            const thisMonthStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}`;
            const tracked = posts.filter(p=>p.status==="posted"&&p.date?.startsWith(thisMonthStr)&&p.views);
            if (!tracked.length) return <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:T.light, fontStyle:"italic" }}>No performance data yet — mark posts as posted and log their stats</div>;
            const totalViews = tracked.reduce((s,p)=>s+(parseInt(p.views)||0),0);
            const totalSaves = tracked.reduce((s,p)=>s+(parseInt(p.saves)||0),0);
            const totalShares = tracked.reduce((s,p)=>s+(parseInt(p.shares)||0),0);
            const avgEng = tracked.length ? Math.round(((totalSaves+totalShares)/Math.max(totalViews,1))*1000)/10 : 0;
            return (<>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
                <MiniStat label="Total Views" value={totalViews.toLocaleString()} T={T} />
                <MiniStat label="Total Saves" value={totalSaves.toLocaleString()} T={T} />
                <MiniStat label="Total Shares" value={totalShares.toLocaleString()} T={T} />
                <MiniStat label="Avg Engagement" value={`${avgEng}%`} T={T} />
              </div>
              {tracked.slice(0,3).map(p=>(
                <div key={p.id} style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 0", borderBottom:`1px solid ${T.border}` }}>
                  <span style={{ color:PLATFORM_COLORS[p.platform], fontSize:11 }}>{PLATFORM_ICONS[p.platform]}</span>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:T.mid, flex:1, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.title}</div>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:1, color:T.p4 }}>{parseInt(p.views||0).toLocaleString()} views</div>
                </div>
              ))}
            </>);
          })()}
          <div style={{ marginTop:12 }}><Btn small variant="ghost" onClick={()=>onNav("insights")}>Open Insights →</Btn></div>
        </Card>
      </div>
    </Page>
  );
}

// ─── CALENDAR ─────────────────────────────────────────────────────────────────
function Calendar({ posts, setPosts, brands, scripts }) {
  const T = useTheme();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ title:"", type:"TikTok Video", platform:"tiktok", brand:"dollhouse", date:"", status:"scheduled", notes:"" });
  const [filterBrand, setFilterBrand] = useState("all");

  const daysInMonth = new Date(year,month+1,0).getDate();
  const firstDay = new Date(year,month,1).getDay();

  function openNew(ds) { setEdit(null); setForm({ title:"",type:"TikTok Video",platform:"tiktok",brand:"dollhouse",date:ds||"",status:"scheduled",notes:"",scriptId:"",bufferSent:false,views:"",saves:"",shares:"",reach:"" }); setModal(true); }
  function openEdit(p) { setEdit(p); setForm({ scriptId:"",bufferSent:false,views:"",saves:"",shares:"",reach:"", ...p }); setModal(true); }
  function save() {
    if(!form.title.trim()||!form.date)return;
    if(edit){ setPosts(ps=>ps.map(p=>p.id===edit.id?{...form,id:edit.id}:p)); }
    else { setPosts(ps=>[...ps,{...form,id:Date.now().toString()}]); }
    setModal(false);
  }
  function del(id){ setPosts(ps=>ps.filter(p=>p.id!==id)); setModal(false); }

  const filtered = filterBrand==="all" ? posts : posts.filter(p=>p.brand===filterBrand);

  return (
    <Page title="Content Calendar" sub="Plan and track every post across all brands" action={<Btn onClick={()=>openNew("")}>+ Schedule Post</Btn>}>
      <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
        {[{id:"all",name:"All Brands"},...brands].map(b=>(
          <button key={b.id} onClick={()=>setFilterBrand(b.id)}
            style={{ padding:"5px 14px", border:`1px solid ${filterBrand===b.id?T.p3:T.border}`, borderRadius:999, background:filterBrand===b.id?`${T.p3}18`:"transparent", fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:filterBrand===b.id?T.p4:T.light, cursor:"pointer" }}>
            {b.name}
          </button>
        ))}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
        <button onClick={()=>{if(month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1);}} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:8, padding:"6px 12px", color:T.mid, cursor:"pointer" }}>‹</button>
        <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:20, color:T.ink, fontStyle:"italic" }}>{MONTH_FULL[month]} {year}</div>
        <button onClick={()=>{if(month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1);}} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:8, padding:"6px 12px", color:T.mid, cursor:"pointer" }}>›</button>
      </div>
      <Card style={{ overflow:"hidden" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", borderBottom:`1px solid ${T.border}` }}>
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>(
            <div key={d} style={{ padding:"10px 0", textAlign:"center", fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:3, textTransform:"uppercase", color:T.light }}>{d}</div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)" }}>
          {Array.from({length:firstDay}).map((_,i)=><div key={"e"+i} style={{ minHeight:80, borderRight:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`, background:`rgba(0,0,0,0.01)` }}/>)}
          {Array.from({length:daysInMonth}).map((_,i)=>{
            const day=i+1;
            const ds=`${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
            const dp=filtered.filter(p=>p.date===ds);
            const isT=ds===today.toISOString().split("T")[0];
            return (
              <div key={day} onClick={()=>openNew(ds)}
                style={{ minHeight:80, borderRight:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`, padding:"7px 5px", cursor:"pointer", transition:"background 0.12s", background:isT?`${T.p3}10`:"transparent" }}
                onMouseEnter={e=>e.currentTarget.style.background=isT?`${T.p3}18`:`${T.p3}08`}
                onMouseLeave={e=>e.currentTarget.style.background=isT?`${T.p3}10`:"transparent"}>
                <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:12, color:isT?"#fff":T.mid, marginBottom:3, fontStyle:"italic", display:"flex", alignItems:"center", gap:3 }}>
                  {isT ? <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:20, height:20, borderRadius:"50%", background:T.p4, color:"#fff", fontFamily:"'Cormorant SC',serif", fontSize:11, fontStyle:"italic" }}>{day}</span> : day}
                </div>
                {dp.map(p=>(
                  <div key={p.id} onClick={e=>{e.stopPropagation();openEdit(p);}}
                    style={{ fontSize:9, background:p.status==="posted"?"rgba(100,180,100,0.1)":`${T.p3}15`, border:`1px solid ${p.status==="posted"?"rgba(100,180,100,0.2)":T.border}`, borderRadius:4, padding:"2px 5px", marginBottom:2, color:p.status==="posted"?"#5a9a5a":T.ink, fontFamily:"'DM Sans',sans-serif", overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis", display:"flex", alignItems:"center", gap:3 }}>
                    <span style={{ color:PLATFORM_COLORS[p.platform] }}>{PLATFORM_ICONS[p.platform]}</span>{p.title}
                    {p.scriptId && <span style={{ marginLeft:"auto", color:T.p3, flexShrink:0, fontSize:8 }}>✎</span>}
                    {p.bufferSent && <span style={{ color:"#6aaa6c", flexShrink:0, fontSize:8 }}>↗</span>}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </Card>

      <Modal open={modal} onClose={()=>setModal(false)} title={edit?"Edit Post":"Schedule Post"}>
        <Input label="Title / Topic" value={form.title} onChange={v=>setForm(f=>({...f,title:v}))} placeholder="What is this post about?" />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <Sel label="Brand" value={form.brand} onChange={v=>setForm(f=>({...f,brand:v}))} options={brands.map(b=>({value:b.id,label:b.name}))} />
          <Sel label="Platform" value={form.platform} onChange={v=>setForm(f=>({...f,platform:v}))} options={Object.keys(PLATFORM_ICONS).map(p=>({value:p,label:p.charAt(0).toUpperCase()+p.slice(1)}))} />
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <Sel label="Content Type" value={form.type} onChange={v=>setForm(f=>({...f,type:v}))} options={CONTENT_TYPES} />
          <Input label="Date" value={form.date} onChange={v=>setForm(f=>({...f,date:v}))} type="date" />
        </div>
        <Sel label="Status" value={form.status} onChange={v=>setForm(f=>({...f,status:v}))} options={["scheduled","draft","posted","skipped","sent to buffer"]} />
        {/* Script link */}
        <div>
          <Label>Link a Script <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:T.light, fontStyle:"italic", fontWeight:300 }}>(optional)</span></Label>
          <select value={form.scriptId||""} onChange={e=>setForm(f=>({...f,scriptId:e.target.value}))}
            style={{ width:"100%", padding:"9px 12px", background:T.surface, border:`1px solid ${T.border}`, borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.ink, outline:"none" }}>
            <option value="">— No script —</option>
            {(scripts||[]).map(s=><option key={s.id} value={s.id}>{s.title||s.topic}</option>)}
          </select>
          {form.scriptId && <div style={{ marginTop:6, padding:"8px 10px", background:`${T.p3}0c`, borderRadius:6, fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:T.p4, fontStyle:"italic" }}>
            ✎ "{(scripts||[]).find(s=>s.id===form.scriptId)?.fourx4?.hook_line_1 || (scripts||[]).find(s=>s.id===form.scriptId)?.topic || "Script linked"}"
          </div>}
        </div>
        {/* Buffer sent toggle */}
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <button onClick={()=>setForm(f=>({...f,bufferSent:!f.bufferSent}))}
            style={{ width:36, height:20, borderRadius:10, background:form.bufferSent?T.p3:`rgba(0,0,0,0.1)`, border:"none", cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0 }}>
            <div style={{ width:16, height:16, borderRadius:"50%", background:"#fff", position:"absolute", top:2, left:form.bufferSent?18:2, transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }}/>
          </button>
          <span style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:T.mid }}>Sent to Buffer</span>
          {form.bufferSent && <a href="https://buffer.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:1, color:T.p3, textDecoration:"none", marginLeft:"auto" }}>Open Buffer ↗</a>}
        </div>
        <Textarea label="Notes / Caption" value={form.notes} onChange={v=>setForm(f=>({...f,notes:v}))} placeholder="Caption ideas, hashtags..." rows={3} />
        {/* Post-performance (show when posted) */}
        {(form.status==="posted") && (
          <div>
            <Label>Performance <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:T.light, fontStyle:"italic" }}>(log after posting)</span></Label>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              <Input label="Views" value={form.views||""} onChange={v=>setForm(f=>({...f,views:v}))} placeholder="0" type="number" />
              <Input label="Saves" value={form.saves||""} onChange={v=>setForm(f=>({...f,saves:v}))} placeholder="0" type="number" />
              <Input label="Shares" value={form.shares||""} onChange={v=>setForm(f=>({...f,shares:v}))} placeholder="0" type="number" />
              <Input label="Reach" value={form.reach||""} onChange={v=>setForm(f=>({...f,reach:v}))} placeholder="0" type="number" />
            </div>
          </div>
        )}
        <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:8 }}>
          {edit&&<Btn variant="danger" onClick={()=>del(edit.id)}>Delete</Btn>}
          <Btn variant="ghost" onClick={()=>setModal(false)}>Cancel</Btn>
          <Btn onClick={save} disabled={!form.title.trim()||!form.date}>Save</Btn>
        </div>
      </Modal>
    </Page>
  );
}

// ─── 4x4 SCRIPT GENERATOR ────────────────────────────────────────────────────
const FOUR_X_FOUR_PROMPT = (topic, brandName, brandGoal) => `You are a video director writing a shot-by-shot action plan for ${brandName}. Goal: ${brandGoal || "help women build digital businesses through personal story and strategy"}.

The creator talks straight to camera. No cuts. Just her, her phone, her words. She needs to know EXACTLY what to say and EXACTLY what to do physically. Do NOT explain the framework — give her directions.

Topic: "${topic}"

Use the 4x4 method (hook → proof → value/mirror → CTA). Emotionally precise. Pattern-exposing. Warm but confrontational. Teach from scars not theory.

Respond ONLY in this exact JSON (no markdown, no preamble):
{
  "strong_topic": "the sharpened pattern-exposing version of the topic (one line)",
  "who_this_hits": "one sentence — exactly who will stop scrolling and why",
  "emotional_trigger": "the single trigger being used: hope / identity challenge / fear of regret / exposure",
  "on_screen_title": "main title text to overlay during the hook — anchors the theme, NOT a repeat of the hook",
  "on_screen_subtitle": "subtitle that goes in caption area — adds specificity",
  "shots": [
    {
      "id": "hook",
      "label": "Hook",
      "timing": "0–4 sec",
      "say_this": "word-for-word — exactly 2 sentences. Sentence 1 interrupts. Sentence 2 makes it personal.",
      "do_this": "physical direction: where to look, expression, energy, body language",
      "on_screen_text": "text overlay for this moment — or null",
      "why_hidden": "one sentence on why this hook works psychologically"
    },
    {
      "id": "proof",
      "label": "Proof",
      "timing": "4–10 sec",
      "say_this": "word-for-word — one strong proof line: personal result, stat, or lived truth",
      "do_this": "physical direction",
      "on_screen_text": null,
      "why_hidden": "why this builds credibility right now"
    },
    {
      "id": "value1",
      "label": "Point 1",
      "timing": "10–30 sec",
      "say_this": "word-for-word — first mirror point. expose a pattern without shame.",
      "do_this": "physical direction",
      "on_screen_text": "short text overlay — or null",
      "why_hidden": "why this point lands emotionally"
    },
    {
      "id": "value2",
      "label": "Point 2",
      "timing": "30–50 sec",
      "say_this": "word-for-word — go deeper. use a story beat if possible.",
      "do_this": "physical direction",
      "on_screen_text": null,
      "why_hidden": "why this deepens trust"
    },
    {
      "id": "value3",
      "label": "Point 3",
      "timing": "50–65 sec",
      "say_this": "word-for-word — the transformation. what shifts for them.",
      "do_this": "physical direction",
      "on_screen_text": null,
      "why_hidden": "why this is the emotional peak"
    },
    {
      "id": "cta",
      "label": "CTA",
      "timing": "last 4 sec",
      "say_this": "word-for-word — one clear call to action",
      "do_this": "look directly into lens. strong, warm, certain energy.",
      "on_screen_text": "CTA text overlay — or null",
      "why_hidden": "why this CTA works for the algorithm"
    }
  ],
  "caption": "full ready-to-post caption. starts with the hook line. speaks directly to viewer. ends with CTA. includes hashtags."
}`;

// Shot type config
const SHOT_CONFIG = {
  hook:   { color:"#ff2d55", bg:"rgba(255,45,85,0.06)",   border:"rgba(255,45,85,0.18)",  icon:"⚡", timing_color:"rgba(255,45,85,0.7)" },
  proof:  { color:"#7a8fa6", bg:"rgba(122,143,166,0.06)", border:"rgba(122,143,166,0.18)", icon:"✦", timing_color:"rgba(122,143,166,0.7)" },
  value1: { color:"#c4a89a", bg:"rgba(196,168,154,0.05)", border:"rgba(196,168,154,0.2)",  icon:"1",  timing_color:"rgba(196,168,154,0.6)" },
  value2: { color:"#c4a89a", bg:"rgba(196,168,154,0.05)", border:"rgba(196,168,154,0.2)",  icon:"2",  timing_color:"rgba(196,168,154,0.6)" },
  value3: { color:"#c4a89a", bg:"rgba(196,168,154,0.05)", border:"rgba(196,168,154,0.2)",  icon:"3",  timing_color:"rgba(196,168,154,0.6)" },
  cta:    { color:"#5a9a5a", bg:"rgba(100,170,100,0.05)", border:"rgba(100,170,100,0.18)", icon:"→", timing_color:"rgba(100,170,100,0.7)" },
};

function ShotCard({ shot, T, copied, onCopy }) {
  const [showWhy, setShowWhy] = useState(false);
  const cfg = SHOT_CONFIG[shot.id] || SHOT_CONFIG.value1;

  return (
    <div style={{ border:`1px solid ${cfg.border}`, borderRadius:14, overflow:"hidden", marginBottom:14, background:cfg.bg }}>

      {/* Shot header */}
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 18px", borderBottom:`1px solid ${cfg.border}` }}>
        <div style={{ width:28, height:28, borderRadius:"50%", background:`${cfg.color}18`, border:`1px solid ${cfg.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Cormorant SC',serif", fontSize:13, color:cfg.color, fontStyle:"italic", flexShrink:0 }}>
          {cfg.icon}
        </div>
        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:3, textTransform:"uppercase", color:cfg.color }}>{shot.label}</div>
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ padding:"3px 10px", background:`${cfg.color}14`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:cfg.timing_color }}>{shot.timing}</div>
        </div>
      </div>

      <div style={{ padding:"18px" }}>

        {/* SAY THIS */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:3, textTransform:"uppercase", color:cfg.color, marginBottom:8, opacity:0.8 }}>◎ Say This</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, color:"#2a1a14", lineHeight:1.85, fontStyle:"italic", marginBottom:8 }}>
            "{shot.say_this}"
          </div>
          <button onClick={()=>onCopy(shot.say_this, `say_${shot.id}`)}
            style={{ padding:"4px 12px", background:copied===`say_${shot.id}`?"rgba(100,170,100,0.12)":"transparent", border:`1px solid ${copied===`say_${shot.id}`?"rgba(100,170,100,0.35)":"rgba(0,0,0,0.1)"}`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:copied===`say_${shot.id}`?"#5a9a5a":"rgba(0,0,0,0.35)", cursor:"pointer" }}>
            {copied===`say_${shot.id}` ? "✓ Copied" : "Copy"}
          </button>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>

          {/* DO THIS */}
          <div style={{ padding:"12px 14px", background:"rgba(255,255,255,0.55)", border:"1px solid rgba(0,0,0,0.07)", borderRadius:10 }}>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:3, textTransform:"uppercase", color:"rgba(0,0,0,0.35)", marginBottom:6 }}>◻ Do This</div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#3a2820", lineHeight:1.7 }}>{shot.do_this}</div>
          </div>

          {/* ON SCREEN */}
          <div style={{ padding:"12px 14px", background:"rgba(255,255,255,0.55)", border:"1px solid rgba(0,0,0,0.07)", borderRadius:10 }}>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:3, textTransform:"uppercase", color:"rgba(0,0,0,0.35)", marginBottom:6 }}>▣ On Screen</div>
            {shot.on_screen_text
              ? <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:13, color:"#3a2820", fontStyle:"italic", lineHeight:1.5 }}>{shot.on_screen_text}</div>
              : <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"rgba(0,0,0,0.25)", fontStyle:"italic" }}>Nothing — just you talking</div>
            }
          </div>
        </div>

        {/* WHY — collapsed by default */}
        <div style={{ marginTop:10 }}>
          <button onClick={()=>setShowWhy(w=>!w)}
            style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 0", background:"transparent", border:"none", cursor:"pointer", fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:"rgba(0,0,0,0.25)" }}>
            <span style={{ fontSize:9, transform:showWhy?"rotate(90deg)":"rotate(0deg)", transition:"transform 0.15s", display:"inline-block" }}>▶</span>
            {showWhy ? "Hide why this works" : "Why does this work?"}
          </button>
          {showWhy && (
            <div style={{ marginTop:6, padding:"10px 14px", background:"rgba(0,0,0,0.03)", border:"1px solid rgba(0,0,0,0.06)", borderRadius:8, fontFamily:"'Cormorant Garamond',serif", fontSize:13, color:"rgba(0,0,0,0.5)", fontStyle:"italic", lineHeight:1.7 }}>
              {shot.why_hidden}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function FourX4Generator({ brands, onSaveScript }) {
  const T = useTheme();
  const [topic, setTopic] = useState("");
  const [brand, setBrand] = useState("dollhouse");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const [showMeta, setShowMeta] = useState(false);

  async function generate() {
    if (!topic.trim()) return;
    setGenerating(true); setResult(null); setError("");
    const b = brands.find(x=>x.id===brand)||brands[0];
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, {
        method:"POST", headers:{"Content-Type":"application/json","Authorization":`Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`},
        body: JSON.stringify({ messages:[{role:"user",content:FOUR_X_FOUR_PROMPT(topic,b.name,b.goal)}], max_tokens:2500 })
      });
      if (!res.ok) {
        const errData = await res.json().catch(()=>({}));
        throw new Error(errData?.error?.message || `API error ${res.status}`);
      }
      const data = await res.json();
      if (!data.content || !data.content.length) throw new Error("Empty response from API");
      const raw = data.content.map(c=>c.text||"").join("");
       setResult(safeParseJSON(raw));
    } catch(e) { setError(`Generation failed: ${e.message}. Try again.`); }
    setGenerating(false);
  }

  function copy(text, key) {
    navigator.clipboard.writeText(text).then(()=>{ setCopied(key); setTimeout(()=>setCopied(""),1800); });
  }

  function buildFullScript() {
    if (!result?.shots) return "";
    return result.shots.map(s=>`[${s.label.toUpperCase()} — ${s.timing}]\n${s.say_this}`).join("\n\n");
  }

  function saveToLibrary() {
    if (!result) return;
    onSaveScript({
      id: Date.now().toString(),
      title: result.strong_topic || topic,
      brand, type:"TikTok Video", topic,
      body: buildFullScript(),
      status:"draft", isLive:false,
      fourx4: result,
    });
  }

  return (
    <div>
      {/* Input */}
      <Card style={{ padding:"28px", marginBottom:20, borderTop:`2px solid ${T.p3}` }}>
        <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:18, color:T.ink, fontStyle:"italic", marginBottom:4 }}>✦ 4x4 Video Builder</div>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:T.mid, fontStyle:"italic", marginBottom:20 }}>
          Give it a raw topic. It tells you exactly what to say, what to do on camera, and what to put on screen — shot by shot.
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:12, alignItems:"flex-end", marginBottom:14 }}>
          <div>
            <Label>Your topic — raw, doesn't need to be perfect</Label>
            <input value={topic} onChange={e=>setTopic(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&!generating&&topic.trim()&&generate()}
              placeholder="e.g. why I can't stay consistent, low self esteem, scared to post..."
              style={{ width:"100%", padding:"12px 14px", background:`rgba(0,0,0,0.02)`, border:`1px solid ${T.border}`, borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:14, color:T.ink, outline:"none" }} />
          </div>
          <Sel label="Brand" value={brand} onChange={setBrand} options={brands.map(b=>({value:b.id,label:b.name}))} />
        </div>
        <Btn onClick={generate} disabled={generating||!topic.trim()} style={{width:"100%"}}>
          {generating ? "✦ Building your video..." : "✦ Build This Video"}
        </Btn>
        {generating && <div style={{ marginTop:12, fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:T.mid, fontStyle:"italic", animation:"pulse 1.5s ease infinite" }}>Writing your shots, your words, your directions...</div>}
        {error && <div style={{ marginTop:10, fontSize:12, color:"#cc4444" }}>{error}</div>}
      </Card>

      {result && !generating && (
        <div style={{ animation:"riseIn 0.4s ease both" }}>

          {/* Video identity + always-visible on-screen text */}
          <Card style={{ padding:"22px", marginBottom:16, borderTop:`2px solid ${T.p3}` }}>
            <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:18, color:T.ink, fontStyle:"italic", marginBottom:4 }}>{result.strong_topic}</div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.mid, marginBottom:18 }}>{result.who_this_hits}</div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
              {result.on_screen_title && (
                <div style={{ padding:"14px 16px", background:`rgba(0,0,0,0.03)`, border:`2px solid ${T.p3}`, borderRadius:10 }}>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:3, textTransform:"uppercase", color:T.p4, marginBottom:8 }}>On-Screen Title</div>
                  <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:17, color:T.ink, fontStyle:"italic", marginBottom:10 }}>{result.on_screen_title}</div>
                  <button onClick={()=>copy(result.on_screen_title,"title")} style={{ padding:"3px 10px", background:copied==="title"?"rgba(100,170,100,0.1)":"transparent", border:`1px solid ${copied==="title"?"rgba(100,170,100,0.3)":T.border}`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:copied==="title"?"#5a9a5a":T.light, cursor:"pointer" }}>{copied==="title"?"Copied":"Copy"}</button>
                </div>
              )}
              {result.on_screen_subtitle && (
                <div style={{ padding:"14px 16px", background:`rgba(0,0,0,0.02)`, border:`1px solid ${T.border}`, borderRadius:10 }}>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:3, textTransform:"uppercase", color:T.p4, marginBottom:8 }}>On-Screen Subtitle</div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.mid, marginBottom:10 }}>{result.on_screen_subtitle}</div>
                  <button onClick={()=>copy(result.on_screen_subtitle,"sub")} style={{ padding:"3px 10px", background:copied==="sub"?"rgba(100,170,100,0.1)":"transparent", border:`1px solid ${copied==="sub"?"rgba(100,170,100,0.3)":T.border}`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:copied==="sub"?"#5a9a5a":T.light, cursor:"pointer" }}>{copied==="sub"?"Copied":"Copy"}</button>
                </div>
              )}
            </div>

            {result.emotional_trigger && (
              <div style={{ display:"inline-flex", padding:"4px 12px", background:`${T.p3}12`, border:`1px solid ${T.p3}35`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:T.p4 }}>
                Trigger: {result.emotional_trigger}
              </div>
            )}
          </Card>

          {/* 4x4 step labels */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:16 }}>
            {[["1","Hook","0-4 sec","#ff2d55"],["2","Proof","4-10 sec","#7a8fa6"],["3","Value","10-65 sec","#c4a89a"],["4","CTA","Last 4 sec","#5a9a5a"]].map(([n,lbl,t,c])=>(
              <div key={n} style={{ padding:"10px 12px", background:`${c}0c`, border:`1px solid ${c}25`, borderRadius:10, textAlign:"center" }}>
                <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:22, color:c, fontStyle:"italic", marginBottom:2 }}>{n}</div>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:c, marginBottom:2 }}>{lbl}</div>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:1, color:`${c}99` }}>{t}</div>
              </div>
            ))}
          </div>

          {/* Shot cards */}
          <div style={{ marginBottom:6 }}>
            {(result.shots||[]).map(shot=>(
              <ShotCard key={shot.id} shot={shot} T={T} copied={copied} onCopy={copy} />
            ))}
          </div>

                    {/* Caption */}
          <Card style={{ padding:"22px", marginBottom:20 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:3, textTransform:"uppercase", color:T.p4 }}>Ready-to-Post Caption</div>
              <button onClick={()=>copy(result.caption, "caption")}
                style={{ padding:"4px 14px", background:copied==="caption"?"rgba(100,170,100,0.12)":"transparent", border:`1px solid ${copied==="caption"?"rgba(100,170,100,0.35)":T.border}`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:copied==="caption"?"#5a9a5a":T.light, cursor:"pointer" }}>
                {copied==="caption"?"✓ Copied":"Copy Caption"}
              </button>
            </div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.mid, lineHeight:1.85, whiteSpace:"pre-wrap" }}>{result.caption}</div>
          </Card>

          {/* Actions */}
          <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
            <Btn onClick={saveToLibrary}>Save to Script Library →</Btn>
            <button onClick={()=>copy(buildFullScript(), "fullscript")}
              style={{ padding:"9px 18px", background:"transparent", border:`1px solid ${T.border}`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:T.light, cursor:"pointer" }}>
              {copied==="fullscript"?"✓ Copied":"Copy Full Script"}
            </button>
            <button onClick={()=>{ setResult(null); setTopic(""); }}
              style={{ padding:"9px 18px", background:"transparent", border:`1px solid ${T.border}`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:T.light, cursor:"pointer" }}>
              New Video
            </button>
          </div>

        </div>
      )}
    </div>
  );
}


// ─── SCRIPTS ──────────────────────────────────────────────────────────────────
function Scripts({ scripts, setScripts, brands }) {
  const T = useTheme();
  const [tab, setTab] = useState("generator"); // generator | library
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ title:"", brand:"dollhouse", type:"TikTok Video", topic:"", body:"", status:"draft", isLive:false });

  const filtered = filter==="all"?scripts:filter==="live"?scripts.filter(s=>s.isLive):scripts.filter(s=>!s.isLive);

  function openNew(){ setEdit(null); setForm({ title:"",brand:"dollhouse",type:"TikTok Video",topic:"",body:"",status:"draft",isLive:false }); setModal(true); }
  function openEdit(s){ setEdit(s); setForm({...s}); setModal(true); }
  function save(){ if(!form.title.trim())return; if(edit){setScripts(ss=>ss.map(s=>s.id===edit.id?{...form,id:edit.id}:s));}else{setScripts(ss=>[...ss,{...form,id:Date.now().toString()}]);} setModal(false); }
  function del(id){ setScripts(ss=>ss.filter(s=>s.id!==id)); setModal(false); }

  function saveFromGenerator(script) {
    setScripts(ss=>[script,...ss]);
    setTab("library");
  }

  return (
    <Page title="Scripts" sub="4x4 generator + your full script library">
      {/* Tab switcher */}
      <div style={{ display:"flex", gap:8, marginBottom:24 }}>
        {[{id:"generator",label:"✦ 4x4 Generator"},{id:"library",label:"◫ Script Library"}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{ padding:"9px 20px", border:`1px solid ${tab===t.id?T.p3:T.border}`, borderRadius:999, background:tab===t.id?`${T.p3}18`:"transparent", fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:3, textTransform:"uppercase", color:tab===t.id?T.p4:T.light, cursor:"pointer", transition:"all 0.15s" }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab==="generator" && (
        <FourX4Generator brands={brands} onSaveScript={saveFromGenerator} />
      )}

      {tab==="library" && (
        <>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14, flexWrap:"wrap", gap:8 }}>
            <div style={{ display:"flex", gap:8 }}>
              {[{id:"all",label:"All"},{id:"video",label:"Videos"},{id:"live",label:"Lives"}].map(t=>(
                <button key={t.id} onClick={()=>setFilter(t.id)}
                  style={{ padding:"5px 14px", border:`1px solid ${filter===t.id?T.p3:T.border}`, borderRadius:999, background:filter===t.id?`${T.p3}18`:"transparent", fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:filter===t.id?T.p4:T.light, cursor:"pointer" }}>
                  {t.label}
                </button>
              ))}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              {filtered.length>0 && <ScriptPDFButton scripts={filtered} T={T} />}
              <Btn small onClick={openNew}>+ Manual Script</Btn>
            </div>
          </div>

          {filtered.length===0
            ? <Card style={{ padding:"48px", textAlign:"center" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, color:T.light, fontStyle:"italic", marginBottom:8 }}>No scripts yet.</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.light, marginBottom:20 }}>Use the 4x4 Generator to create your first script.</div>
                <Btn onClick={()=>setTab("generator")}>→ Open Generator</Btn>
              </Card>
            : <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
                {filtered.map(s=>(
                  <Card key={s.id} onClick={()=>openEdit(s)} style={{ padding:"20px" }}>
                    <div style={{ display:"flex", gap:6, marginBottom:10, flexWrap:"wrap" }}>
                      {s.isLive&&<span style={{ padding:"2px 7px", background:"rgba(255,45,85,0.08)", border:"1px solid rgba(255,45,85,0.2)", borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:"#cc3355" }}>⏺ Live</span>}
                      {s.fourx4&&<span style={{ padding:"2px 7px", background:`${T.p3}15`, border:`1px solid ${T.p3}40`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:T.p4 }}>✦ 4x4</span>}
                      <span style={{ padding:"2px 7px", background:`${T.p3}10`, border:`1px solid ${T.border}`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:T.light }}>{s.type}</span>
                      <span style={{ marginLeft:"auto", padding:"2px 7px", background:s.status==="draft"?`rgba(0,0,0,0.04)`:"rgba(100,170,100,0.1)", border:`1px solid ${s.status==="draft"?T.border:"rgba(100,170,100,0.25)"}`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:s.status==="draft"?T.light:"#5a9a5a" }}>{s.status}</span>
                    </div>
                    <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:15, color:T.ink, fontStyle:"italic", marginBottom:5 }}>{s.title}</div>
                    {s.fourx4?.hook_line_1 && <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:T.p4, fontStyle:"italic", marginBottom:5 }}>"{s.fourx4.hook_line_1}"</div>}
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.light, lineHeight:1.6, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{s.body?.substring(0,100)||s.topic}</div>
                  </Card>
                ))}
              </div>
          }

          <Modal open={modal} onClose={()=>setModal(false)} title={edit?"Edit Script":"Manual Script"} width={660}>
            <Input label="Title" value={form.title} onChange={v=>setForm(f=>({...f,title:v}))} placeholder="e.g. Why I built The Dollhouse" />
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <Sel label="Brand" value={form.brand} onChange={v=>setForm(f=>({...f,brand:v}))} options={brands.map(b=>({value:b.id,label:b.name}))} />
              <Sel label="Type" value={form.type} onChange={v=>setForm(f=>({...f,type:v,isLive:v==="TikTok Live"}))} options={["TikTok Video","TikTok Live","Instagram Reel","YouTube Short","YouTube Video"]} />
            </div>
            <Textarea label="Script Body" value={form.body} onChange={v=>setForm(f=>({...f,body:v}))} placeholder="Script goes here..." rows={10} />
            <Sel label="Status" value={form.status} onChange={v=>setForm(f=>({...f,status:v}))} options={["draft","ready","used"]} />
            <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:8 }}>
              {edit&&<Btn variant="danger" onClick={()=>del(edit.id)}>Delete</Btn>}
              <Btn variant="ghost" onClick={()=>setModal(false)}>Cancel</Btn>
              <Btn onClick={save} disabled={!form.title.trim()}>Save Script</Btn>
            </div>
          </Modal>
        </>
      )}
    </Page>
  );
}

// ─── LIVE STUDIO ──────────────────────────────────────────────────────────────

const LIVE_PROMPT = (topic, brandName, brandGoal, productName, opts = {}) => {
  const isBrandKit = /brand\s*kit/i.test(productName || "");
  const style = opts.style || "A"; // A=9-5 Story, B=Watch Me Build, C=Brand Audit
  const durationMin = Math.max(10, Math.min(60, opts.durationMin || 10));
  const codeSync = !!opts.codeSync;
  const isExpanded = durationMin >= 25;
  const isStyleA = style === "A";

  if (isStyleA) {
    return `You write the Style A live script for ${brandName}.

STYLE A ONLY — QUIT YOUR 9-5 / EASY WORDS / BEGINNER JOB ESCAPE MASTERCLASS
Write a 60-minute masterclass script for a beginner who wants to leave a job and make money from her own physical product shop.
This is not a random live. This is a class.
The host should teach, guide, recap, and give clear next steps.

HARD READING LEVEL RULE
• Grade 3 to 5 only.
• Use short words.
• Use short lines.
• Use warm, plain talk.
• Sound like a kind big sister.
• No fancy words.
• No business school words.
• No tech words.
• No design words.
• No long, heavy sentences.
• If it does not sound like a simple, warm Grade 3 to 5 sentence, rewrite it.

VOCABULARY WEIGHTS
Use these words a lot:
job, boss, rent, bills, tired, stuck, money, pay, home, kids, family, time, free, freedom, start, today, simple, easy, idea, product, shop, item, package, ship, customer, sell, link, checkout, online, app, help, plan, step, answer, questions, launch, Etsy, Shopify, Facebook Marketplace, print on demand, t-shirts, stickers, Cricut, $97, $198.

Use these phrases a lot:
"You do not need to be techy."
"You do not need a big budget."
"You can start today."
"You just need a simple first step."
"This helps you look ready to sell."
"Your job pays bills, but it does not give you your life back."
"You can keep waiting, or you can start now."

Do NOT use fancy business words, tech words, or design words. If the word sounds like it belongs in a boardroom, a code class, or a design class, do not use it.

MAIN MESSAGE
• The viewer is tired from work.
• She wants more time and more money.
• She wants to stop feeling stuck.
• She is scared because starting online looks hard.
• The answer is a simple app that helps her set up her first physical product shop fast.
• She answers 19 easy questions.
• The app helps her product idea look ready to sell in 5 minutes.
• The goal is not to sound smart.
• The goal is to help her start.

HOST STORY + PROOF POINTS
Work these into the masterclass in simple words:
• Mandy started selling physical products at 16.
• Her first product path was airbrushed t-shirts.
• She sold airbrushed t-shirts from her car.
• She sold airbrushed t-shirts at events.
• Use this exact proof line in the story: "I did not start with a fancy store. I started with shirts, my car, and events."
• She then started doing vendor events.
• She sold at the CNE.
• After that, she moved into print-on-demand.
• She used Etsy for print-on-demand.
• She used Shopify for print-on-demand.
• Later, she tried stickers and other print-on-demand products.
• Facebook Marketplace can be named as a place to test or sell locally.
• She has tried real product paths, not just talked about them.
• Do not make fake income claims. Say "I have done this" and "I know how scary the first product can feel."
• Keep the story order correct: airbrushed t-shirts at 16 → from car and events → vendor events → CNE → print-on-demand on Etsy and Shopify → stickers and other POD products.

MASTERCLASS FEEL
• Open by saying this is a free masterclass.
• Tell viewers to stay until the end because they will leave with a simple shop plan.
• Tell viewers to get a notebook.
• Do not promise that today will fix their whole life.
• Do not say "Today, we fix that," "Today, we will fix that," "Today, you start your own shop," or "I will show you how to start your own easy product shop."
• Use grounded class framing instead: "Today, I am going to show you the first simple steps to start your own shop."
• Add "Class Note" moments.
• Add "Pause and write this down" moments.
• Every "Class Note" MUST include an exact sentence in quotes for the viewer to write down.
• Every "Write this down" MUST include an exact sentence in quotes for the viewer to write down.
• Never say only "write this down" without giving the words to write.
• Use this format: Class Note: Write this down: "Your first product is a starter product, not your forever product."
• Add "Quick recap" moments every 10 minutes.
• Teach one clear lesson at a time.
• Use call-and-response: "Type CLASS if you are taking notes."
• End with a simple action plan for today.
• The sale should feel like the next step after the class, not a random pitch.

WORKBOOK METHOD TO USE
Base the teaching on The Dollhouse Brand Starter System workbook.
Use simple room language from the workbook:
• Front Door: decide you are building for real.
• Foundation Room: choose one starter product.
• One Product Test: pick a product you can explain in one line, make or source without stress, afford, and fit into your time.
• Business Model Choice: choose print-on-demand, handmade, or hybrid.
• First Sale Goal: aim for a first sale in 7, 14, or 30 days.
• Production Room: make a simple product flow you can keep up with.
• Marketplace Room: choose one place to sell first.
• Money Room: price your product without guilt.
• Marketing Bedroom: show up in a simple way without begging or burning out.
• Decision Lock: stop changing the plan every five minutes. Pick the next step and stay with it.

SPECIFIC PRODUCT PATHS TO TEACH
Do not stay broad. Give real examples.
Use these paths in the script:
• Airbrushed t-shirts as Mandy's first real product path.
• Selling from a car as a scrappy first sales path.
• Vendor events as a way to get in front of buyers.
• The CNE as a real event story beat.
• Etsy for print-on-demand, handmade items, stickers, shirts, and simple starter products.
• Print-on-demand for t-shirts, mugs, totes, hoodies, and items you do not want to pack yourself.
• Cricut for stickers, labels, decals, small gifts, and handmade starter products.
• Facebook Marketplace for fast local sales and testing what people want.
• Shopify for building your own shop when you are ready to have your own home online.
Explain each path in easy words. Say what it is good for. Say why a beginner might pick it.

STRUCTURE RULES
• Runtime is exactly 60 minutes.
• Make exactly 9 sections.
• Use three clear phases: 00-15, 15-40, and 40-60.
• The presenter stays on camera inside the preview box.
• Do not depend on slides. The app is not ready for slides yet.
• The presenter must be able to talk for one full hour with only the teleprompter.
• Use talk cues like [TALK CUE: Tell the tired morning story].
• The cue field should tell the host what kind of value to give next, not what slide to show.
• Do not tell the host to show the app screen.
• Do not add app walk-through steps.
• Do not add hard tool talk.
• Keep the script word-for-word and easy to read out loud.
• Each section must include one clear lesson.
• Each section must include one student action: write, comment, choose, or decide.
• Each section must include enough examples, stories, and plain teaching to fill its full time.
• Add a "new people just joining" reset every 10 minutes so the host can keep talking without drying up.

HOST ACTION CUES
Add these exact cues during the offer and close:
• [ACTION: Click 'Copy Pinned Comment' & Paste to Live Chat]
• [ACTION: Manually click 'Decrease Stock (-1)' on your sidebar now]
• [READING CUE: Look straight into the lens, slow down your pace for emphasis]
Also tell the host to call out the countdown timer, lower the stock number on the dashboard, and paste the easy checkout link into the live chat.

LIVE VISIBILITY RULE
The host may not be able to see comments, names, likes, or viewers.
Never pretend the host can see the room.
Do NOT claim the host sees any viewer action.
Do NOT claim the host sees comments.
Do NOT claim the host sees people reacting.
Do NOT claim the host sees people asking for help.
Use invitation lines instead:
• "If this is you, type START."
• "If you can hear me, type CLASS."
• "If you want the link, type LINK."
• "If you are watching quietly, this is still for you."
• "Even if you do not type, listen to this part."

SELLER PSYCHOLOGY FOR THE HOST
This part is for helping the host close sales to ${productName||"The Dollhouse Brand Kit"}.
Keep it Grade 3 to 5. No fancy words.
Build trust before asking for the sale:
• Tell them who this is for: beginners who want to start a product shop but feel lost.
• Tell them who this is not for: people who want to keep waiting and changing their mind.
• Name the fear: "I know you may be scared to spend money when bills are due."
• Answer the fear: "$97 is smaller than staying stuck for another year."
• Name the doubt: "You may be thinking, what if I do not know what to sell?"
• Answer the doubt: "That is why the 19 questions are there. They help you get clear."
• Name the time fear: "You may think you do not have time."
• Answer the time fear: "That is why this gives you one product, one place to sell, and one next step."
• Make the price feel easy: "$97 is one time. No monthly bill."
• Make the choice clear: "Stay stuck and keep guessing, or start with a plan today."
• Use soft command lines: "Go tap the link now." "Do not wait." "Get yours while the timer is still on."
• Repeat the offer every 5 minutes in Phase 3.
• After every offer line, tell the host to pause and let the words land.
• Add trust without fake claims: "If you are typing START, this part is for you." "If you want the link, type LINK." "If you are watching quietly, this is still for you."
• Make the close feel caring, not pushy: "I am not rushing you. I am telling you the truth. Waiting is what has kept you stuck."
• Do not use hype lines like "change your life today," "get your freedom back," "this is the key to your freedom," or "this is magic."
• Use grounded hope instead: "This can be your first step toward more income, more choice, and more time."
• When talking about stock, do not say "Remember that low stock number I just lowered? That's real."
• Say: "You will see the live stock counter on the screen. When the live offer spots are gone, this price is gone too."
• Mention the live stock counter only once in Section 9 and only once in the final closing script.
• Do not say "It is a payment to yourself," "for your own freedom," or "this is your moment."
• Say: "It is a small step toward your own shop and your own plan."
• Make urgency feel warm and honest, not scary.

PHASE 1 — 00:00-15:00 · THE 9-5 STRESS & MY STORY
Section 1: The Easy-to-Understand Hook (00-05)
Start with how hard it feels to be stuck in a 9-5 job. Talk about tired mornings. Talk about rent. Talk about bills. Talk about having no free time for yourself or your family. Make the viewer feel seen and safe. Then frame the live as a masterclass with this exact opening line: "Today, I am going to show you the first simple steps to start your own product shop." Also say: "By the end of this class, you will know the first simple steps to start a physical product shop." Never say "Today, we will fix that."

Section 2: The Turning Point (05-10)
Share how you saw that working for a boss will never give you real freedom. A job can help pay bills, but it still owns your time. Say that the way out is to sell your own physical product online. Include Mandy's story in the correct order: she started selling airbrushed t-shirts at 16, sold from her car and at events, moved into vendor events, sold at the CNE, then moved to print-on-demand on Etsy and Shopify, then tried stickers and other POD products. Include this exact story sentence: "I did not start with a fancy store. I started with shirts, my car, and events." But most regular people stop before they start because setting up a shop looks scary and hard. Teach the Front Door lesson: before you know it all, you decide you are building for real.

Section 3: The Simple Answer (10-15)
Explain that you found a way to make a simple, clean app that helps anyone start a physical product shop right now. No degree. No tech skills. No big budget. No months of stress. Say it helps them walk room by room, like the workbook: pick the product, pick the shop path, pick the selling place, set the price, and start. Add a 10-minute quick recap before moving into Phase 2.

PHASE 2 — 15:00-40:00 · HOW TO BUILD TOWARD MORE INCOME WITHOUT THE TECH HEADACHES
Section 4: Step 1 — Stopping the Brain Freeze (15-23)
Tell them beginners get stuck because they think they need months to build a hard website, find the perfect product, or learn hard tools. Say the truth: moving fast and starting today matters most. Small starts count. Teach the masterclass lesson: "Your first product is a starter product, not your forever product." Give clear starter examples: one sticker pack, one t-shirt, one tote bag, one mug, one decal, one small handmade gift, or one print-on-demand product.

Section 5: Step 2 — The Only 3 Things You Need (23-31)
Teach the three simple things:
1. A good idea to sell.
2. A shop setup that looks real and makes people trust you.
3. A checkout page so people can pay you.
Say this over and over in plain words. No extra steps. Add the One Product Test in easy words: Can I say what this is in one line? Can I make it or source it without stress? Can I afford it? Can it fit my time? Would I buy it myself? Then teach where they can sell: Etsy, Facebook Marketplace, Shopify, or a print-on-demand shop path. Add a 30-minute class recap before the next lesson.

Section 6: Step 3 — The 19-Question Cheat Code (31-40)
Explain how the app does the hard setup work. Instead of wasting weeks trying to make the product, shop, and words look real, they answer 19 simple questions. Then the engine builds their whole shop look and product plan in 5 minutes flat. Keep this simple. Do not say "It's magic." Say: "That is why I love it for beginners." Tie this back to the workbook rooms: one product, one path, one place to sell, one price, one simple plan. Teach Decision Lock: pick the next step and stop changing the plan.

PHASE 3 — 40:00-60:00 · STARTING CHEAP TODAY & THE LIVE SPECIAL OFFER
Section 7: The Choice (40-48)
Move into the offer with this exact line: "You can keep waiting and stay stuck in that tired 9-5 job, or you can use this engine as your first step toward your own product shop today."
Make the choice feel kind, clear, and urgent. This is where the class turns into the action step. Add seller psychology for the host: name the fear, answer the fear, name the doubt, answer the doubt, then tell them to tap Link in Bio.

Section 8: The Big Discount (48-55)
Show them The Dollhouse Brand Kit offer. Say it usually costs $198. Because they are watching live right now, they can get it for $97. Say this helps them start on a budget. Say it is one payment. No monthly bill. Say the class gave them the map, and the Brand Kit helps them do it today. Handle simple buyer doubts: "I do not know what to sell," "I do not have time," "I am scared to start," and "I do not want another hard thing."

Section 9: Urgency Triggers (55-60)
Tell the presenter to call out the countdown timer on the screen. Tell the presenter to lower the stock number counter on the dashboard. Tell the presenter to copy and paste the easy checkout link right into the live stream chat box. Mention the live stock counter only one time in this section. Use this exact stock line once: "You will see the live stock counter on the screen. When the live offer spots are gone, this price is gone too." Keep saying Link in Bio and $97. End with a final masterclass recap: one product, one path, one place to sell, one price, one simple plan. Use direct but warm close lines: "Go now." "Tap the link." "Type 97 when you get yours." "Do not close this live and go back to guessing."

CONTENT RULES
• Add at least four "Write this down" lines.
• Add at least six "Class Note" lines.
• Every note line must give the exact words to write in quotes.
• Good examples:
  Class Note: Write this down: "One simple product is enough to start."
  Pause and write this down: "My first sale is proof that I can move."
  Class Note: Write this down: "I do not need the perfect shop. I need the next step."
  Write this down: "Pick one product, one path, and one place to sell."
• Add at least three "Quick recap" blocks.
• Add comment prompts often: FREEDOM, ESCAPE, 97, START, BILLS, READY, LINK.
• Add "Type CLASS if you are taking notes" in Phase 1.
• Add "Type NOTES if this is helping" in Phase 2.
• Use tiny stories from a beginner's life. Keep them real and simple.
• Do not claim proof or results you do not have.
• Do not make income guarantees or life-change guarantees.
• Avoid hard hype phrases: "Today, we will fix that," "change your life today," "get your freedom back," "key to your freedom," "this will fix everything," "it's magic," "payment to yourself," "for your own freedom," and "this is your moment."
• Use grounded outcome phrases: "first step," "more choice," "more time," "more income," "start with a plan," and "build from one simple product."
• Do not say "So simple, a 10-year-old could do it."
• Say: "Simple enough to follow even if you are brand new."
• Move from pain, to hope, to simple action.
• The output should feel easy to read for one full hour.
• Teach "simple beats everything" in plain words.
• Say "your first product is a starter product, not your forever product."
• Say "your first sale is proof that moving creates clarity."
• Say "you do not need to be everywhere; choose one place to sell first."
• Say "you do not need to beg; just tell people what you sell and why it helps."
• Add at least six simple objection answers for the host to read out loud.
• Add at least six direct close lines for the host to say in Phase 3.
• Add buyer prompts: "Type 97 if you want in," "Type LINK if you need help," "Type GOT MINE when you get yours."
• Mention Etsy at least 4 times.
• Mention print-on-demand at least 4 times.
• Mention t-shirts at least 3 times.
• Mention stickers and Cricut at least 3 times.
• Mention Facebook Marketplace at least 2 times.
• Mention Shopify at least 2 times.
• Include at least three real-life story beats from Mandy's selling path.
• Do not rely on visuals. Explain every idea out loud.
• Add "If you just joined..." resets at 10, 20, 30, 40, and 50 minutes.
• Add at least 10 extra talking points the host can use if the chat is quiet.
• Add simple mini stories for Etsy, print-on-demand, Cricut stickers, Facebook Marketplace, Shopify, and t-shirts.

PRODUCT
Product to sell: "${productName||"The Dollhouse Brand Kit"}"
Say it helps a beginner turn a plain product idea into a shop setup that looks ready to sell.
Say it helps them answer 19 questions and get clear fast.
Say it follows the workbook idea: one room, one choice, one next step.
Say it helps them choose a starter product, pick a shop path, choose where to sell, set a price, and start today.
Say it can help them think through paths like Etsy, print-on-demand, Cricut stickers, Facebook Marketplace, Shopify, t-shirts, totes, mugs, and other simple physical products.

PRICE
• Normal price: $198
• Live price: $97
• One payment.
• No monthly bill.
• Link in Bio is the main call.
• Mention the countdown timer.
• Mention the stock number going down.
• Tell the host to make the price feel low-risk and clear.
• Tell the host to say why buying now is better than waiting.

TALK CUES TO USE
[TALK CUE: Tell the tired morning story]
[TALK CUE: Explain rent, bills, and no time]
[TALK CUE: Tell Mandy's selling since 16 story]
[TALK CUE: Teach why one starter product is enough]
[TALK CUE: Give Etsy examples]
[TALK CUE: Give print-on-demand examples]
[TALK CUE: Give Cricut sticker examples]
[TALK CUE: Give Facebook Marketplace examples]
[TALK CUE: Give Shopify examples]
[TALK CUE: Do a quick recap for new people]
[TALK CUE: Ask the chat what they want to sell]
[TALK CUE: Handle the fear of starting]
[TALK CUE: Explain the $97 live offer]
[TALK CUE: Tell them to tap Link in Bio]

JSON OUTPUT CONTRACT
Respond ONLY in valid JSON. No markdown. No preamble.
Return this exact shape:
{
  "title": "60-minute easy job escape masterclass title",
  "hook_statement": "first 10 seconds, Grade 3-5 hook about being tired, broke, busy, and stuck in a 9-5",
  "sections": [
    {
      "id": "phase1_hook",
      "phase": 1,
      "type": "easy_hook",
      "label": "00:00 - Phase 1: The 9-5 Stress",
      "duration_min": 5,
      "color": "#D4AF37",
      "cue": "[CAMERA: Stay centered in preview box] [TALK CUE: Tell the tired morning story]",
      "script": "long word-for-word Grade 3-5 masterclass script with short, warm, easy lines, class notes, recaps, and student action prompts",
      "engagement_prompt": "comment prompt for this phase",
      "reminder": "[READING CUE: Look straight into the lens, slow down your pace for emphasis]",
      "laptop_show": ["[TALK CUE: Tell the tired morning story]"],
      "laptop_when": "No slides. No app demo. Keep the presenter camera fixed in the preview box and keep talking from the teleprompter.",
      "laptop_hide": "Never hide the camera feed.",
      "laptop_refer": "Do not refer to slides. Explain the point out loud."
    }
  ],
  "engagement_bank": [
    "Comment ESCAPE if you want out of your job.",
    "Comment FREEDOM if you want more time back.",
    "Comment START if you want to start today.",
    "Comment 97 if you want the live price.",
    "Comment LINK if you need the checkout link."
  ],
  "product_mention": "easy mid-masterclass product mention that says the app helps beginners answer 19 questions, make their product shop look ready to sell, and start for $97",
  "closing_script": "final 5-minute easy masterclass close with Link in Bio, countdown timer, stock counter, $198 down to $97, and exact action cues",
  "if_nervous_card": "short private card reminding presenter to breathe, teach one lesson at a time, use easy words, say $97, and point to Link in Bio"
}

SECTION COUNT REQUIREMENT
Generate exactly 9 sections:
Phase 1: hook (5), turning_point (5), simple_answer (5)
Phase 2: brain_freeze (8), three_things (8), nineteen_questions (9)
Phase 3: choice (8), big_discount (7), urgency (5)
Total: 60 minutes.

Each section's "script" must be long, word-for-word, Grade 3-5, and ready to read live. The presenter should never dry up.`;
  }

  const STYLE_BLOCK = ({
    A: `LIVE STYLE — A · "Quit Your 9-5" Story (Emotional / Hook-heavy).
Lead with feeling, identity, and the 9-5 escape narrative. Heavy storytelling, lighter demo. The Brand Kit is framed as the ENGINE that makes leaving possible. Demo is short and emotional, not technical.`,
    B: `LIVE STYLE — B · "Watch Me Build" (Pure Technical Demo).
Lead with the laptop. The 19-question engine, the localStorage save, the Zero-Server generation, and the Custom Blueprint reveal are the STARS. Story is trimmed; demo is expanded. Heavy use of [ACTION: SHOW LAPTOP SCREEN].`,
    C: `LIVE STYLE — C · "Brand Audit" (Interactive Q&A).
Lead by auditing viewers' brands live. Pull viewer comments ("drop your brand name + niche") and answer 3–5 of them out loud BEFORE demoing the kit. Demo is framed as: "Let me show you what I'd do for YOUR brand using my own engine." Heavy engagement loops.`,
  })[style];

  const EXPANDED_BLOCK = isExpanded ? `
═══════════════════════════════════════════════
EXPANDED RUNSHEET (${durationMin} MIN) — MANDATORY STRUCTURE
═══════════════════════════════════════════════
This is a LONG-FORM live (${durationMin} minutes). You MUST produce an "Expanded Runsheet" with these mandatory mechanics:

1. CYCLICAL HOOKS — every 5 minutes, insert a dedicated "scroll_stopper" section (type:"hook") that re-hooks new viewers entering the live. Each scroll_stopper restates WHO this live is for in one punchy sentence + one new pattern-interrupt question. Provide AT LEAST ${Math.floor(durationMin/5)} scroll_stoppers spread evenly across the runsheet.

2. ENGAGEMENT BANK — produce AT LEAST 10 "drop a comment" prompts in engagement_bank, each tied to a SPECIFIC Brand Kit feature (the 19-question engine, localStorage save, Zero-Server generation, Champagne Gold styling, Playfair typography, the Blueprint reveal, the offer ladder, the brand voice output, the audience output, the export). Format: "Comment '<KEYWORD>' if <feature-tied question>".

3. TIERED URGENCY — the closing_script MUST contain a 3-stage countdown for the $97 Live-Only price vs $145 standard:
   • Stage 1 (mid-live, ~halfway): "We're halfway. The $97 price is still live for everyone watching."
   • Stage 2 (~10 min before end): "10 minutes left at $97. After that it goes back to $145."
   • Stage 3 (final 60 seconds): "60 seconds. When I tap End, $97 dies and it's $145 forever."
   Embed Stage 1 and Stage 2 as their own sections (type:"urgency") in the runsheet and Stage 3 in the closing_script.
` : "";

  const CODE_SYNC_BLOCK = codeSync ? `
═══════════════════════════════════════════════
CODE-SYNC MODE — ENFORCED (word-for-word per click)
═══════════════════════════════════════════════
Every laptop_show step MUST reference a REAL interactive element from the Brand Kit React app and pair it with the EXACT spoken sentence said one beat before the click. Use these real element names verbatim in laptop_show entries:
  • "Start Quiz" CTA on the landing page
  • <Question> component card (renders one of 19 questions at a time)
  • Progress bar showing "Question N of 19"
  • Text input for Q1 ("First, what's your name?")
  • Multiple-choice option buttons (Q5, Q7, etc.)
  • "Next" navigation button
  • "Generate Blueprint" button on Q19
  • <Results> page rendering the Custom Blueprint
  • Champagne Gold (#D4AF37) headers + Playfair Display serif
  • Browser refresh → blueprint persists from localStorage key "dollhouse_brand_kit"

Format every laptop_show entry as: "<verbatim spoken cue>" → CLICK <real element name>. Never invent UI that isn't in the repo.
` : "";

  return `You are a TikTok Live coach writing for ${brandName}. Goal: ${brandGoal||"help women build digital businesses"}.

═══════════════════════════════════════════════
AUDIENCE: PROBLEM-UNAWARE — GRADE 3–5 READING LEVEL (HARD RULE)
═══════════════════════════════════════════════
Most viewers DO NOT know they have a problem yet. They are tired, scrolling, half-asleep, on break at a job they hate. Many speak English as a second language. WRITE LIKE YOU ARE TALKING TO A FRIEND IN A NAIL SHOP.
• Use only short, basic words (Grade 3–5). Short sentences. No big words. No corporate talk. No tech talk. If it does not sound simple and warm, REWRITE IT.
• NEVER say "professionalize", "engine", "monetize", "leverage", "ecosystem", "blueprint" without explaining it like a kid ("a plan that tells you what to do next"), "DNA", "intake", "framework". Replace with: "plan", "the thing that does it for you", "make money", "use", "world", "your real brand", "questions", "step-by-step".
• NEVER say Mandy is new or nervous. Mandy is the CONFIDENT EXPERT. She has done this. She knows. Remove all "first ever live" and "brand new launch" and "humble" framing — burn it out of every section. She is the big sister who already escaped.

═══════════════════════════════════════════════
CORE CONVERSION PHILOSOPHY — BUYER MIND + EMOTIONAL STORY
═══════════════════════════════════════════════
To convert viewers, get inside the buyer's mind. Do NOT sound like a company. Sound like a real woman who knows exactly what the viewer is tired of, scared of, craving, and secretly wishing for.
• Every section MUST make the viewer feel something before it teaches or sells. Lead with the emotional truth first, then the product.
• Use high-level branding and emotional storytelling. Make the live feel luxury, aspirational, feminine, and expensive — because aspiration sells.
• Clearly state the problem: she feels stuck, broke, unseen, replaceable, and tired of depending on jobs or people who do not value her.
• Clearly show the solution: the digital product gives her the plan, words, look, and next steps so she can start building her own brand without guessing.
• Clearly sell the outcome: more freedom, more options, more self-respect, more control, a softer life, her own money, and the confidence to stop settling.
• Every product mention MUST follow this bridge: "Here is the pain you feel" → "Here is why it happens" → "Here is how this digital product fixes it" → "Here is the life you get on the other side."
• Make them care. Make them understand why they need this in their life TODAY. Do not only list features. Tie every feature to a feeling, a problem solved, and a lifestyle upgrade.

═══════════════════════════════════════════════
THE "WAKE UP" CALL — RAW EMOTIONAL TRIGGERS (MANDATORY THROUGHLINE)
═══════════════════════════════════════════════
This live is a WAKE UP CALL for women who don't know they're trapped yet. Weave these RAW truths through every part of the script — opening, hooks, demo, closing:

1. WEALTH CONDITIONING: The 9-5 is a system built to keep women clocking in. It was NOT built to make us rich. It was built to keep us showing up. Say it plain.
2. THE SAFETY NET (this is the heart of the live): We need our OWN money so we never have to:
   • stay one more night with a man who hits us,
   • settle for a dusty dude just because he pays the light bill,
   • cringe through a date with a sugar daddy with no teeth just to cover rent,
   • or smile at a boss who disrespects us because we need the check.
   Use this language RAW. Do not soften it. Say "dusty dude." Say "sugar daddy with no teeth." Say "abusive partner." Say "safety net." This is the emotional core.
3. THE ESCAPE: Living paycheck to paycheck is a TRAP. Barely surviving is not living. This business is the WAY OUT of every uncomfortable situation you're in right now.
4. RECLAIM YOUR TIME: Your time is your life. A 9-5 is buying your life cheap. We're taking it back.

MANTRAS (use VERBATIM at least 3 times across the live, as transitions between sections):
• "Action takers are the money makers."
• "Let's run up this bag, girls."
• "Someone watching right now has been waiting for a sign. This is it. This is your sign to take action." ← MUST appear at least ONCE, word-for-word, in either the opening or the first cyclical hook.

${STYLE_BLOCK}
${EXPANDED_BLOCK}
${CODE_SYNC_BLOCK}

The creator (Mandy) reads everything off screen — every word, every transition, every engagement prompt is fully scripted. She is the CONFIDENT expert. Do NOT mention she is new, nervous, or that this is a first launch. She has been doing this. She knows.

Live topic: "${topic}"
${productName ? `\nProduct to sell (ONLY this one — weave it naturally): "${productName}"\nSell this product softly throughout the live. Don't hard-sell. Story-tell why it matters.` : ""}

═══════════════════════════════════════════════
MANDATORY SCRIPT — "THE ESCAPE HATCH" (verbatim, word-for-word)
═══════════════════════════════════════════════
The live MUST follow "THE ESCAPE HATCH SCRIPT" — five timed blocks, read WORD-FOR-WORD in this exact order. Do NOT paraphrase. Do NOT shorten. Do NOT replace any line. Each block sits at a fixed minute mark.

[STRICT RULE: RESET THE LOOP EVERY 10 MINUTES — at 10:00, 20:00, 30:00, etc. Mandy welcomes new joiners, restates the 9-5 pain, and shows the screen. The 10:00 reset block below is mandatory; for any live longer than 25 min, repeat the same RESET LOOP beats every additional 10 minutes.]

--- BLOCK 1 · 00:00 — THE HOOK (THE "WAKE UP" CALL) (section label:"00:00 - The Hook", duration_min:5, [ACTION: SHOW FACE]) ---
"Welcome in, girls. Tap that screen. We are getting to 10k likes because someone in here is tired of being a 'good worker' for a boss that doesn't care about them. I looked for a job for 2 years. I got ghosted. I got rejected. So I took my last bit of money and built my own exit. I stopped begging for a job and built my own house. If you want to stop trading your soul for a check, stay right here."

After Block 1, engagement_prompt MUST be exactly: "Tap the screen and get us to 10k likes. Type WAKE UP if this is you."

--- BLOCK 2 · 05:00 — THE ICE BREAKER (EMOTIONAL CONNECTION) (section label:"05:00 - Ice Breaker", duration_min:5, [ACTION: SHOW FACE]) ---
"Quick question for the chat: Have you ever sat in your car and cried before walking into your shift? Put a 'YES' in the chat if that's been you. I'm not here to inspire you; I'm here to give you a Safety Net. Your own brand is your insurance. It means you never have to stay with a dusty dude or a bad boss just to pay bills."

After Block 2, engagement_prompt MUST be exactly: "Put YES in the chat if you've ever cried in your car before a shift."

--- BLOCK 3 · 10:00 — RESET THE LOOP (RED FLASH) (section label:"10:00 - RESET THE LOOP", duration_min:5, cue:"🔴 RED FLASH — RESET THE LOOP", [ACTION: SHOW MACBOOK SCREEN]) ---
"🔴 RESET THE LOOP — if you just joined, welcome in. Quick Wins recap so you don't feel behind: ① We are building your ESCAPE PLAN from the 9-5. ② Your own brand is your INSURANCE POLICY against bad bosses, dusty dudes, and toxic situations. ③ I'm about to show you the 19-question engine that builds it for you. You are NOT behind. You are right on time. Look at the screen — this is The Dollhouse Brand Kit. You answer 19 easy questions and it builds your professional brand for you. The look, the plan, the exit."

This block MUST be marked in the section as is_loop_reset:true. The cue field MUST start with "🔴 RED FLASH — RESET THE LOOP". The script field MUST open with the literal "Quick Wins recap" mini-summary above so new joiners are caught up. For ANY additional 10-minute reset (20:00, 30:00, 40:00, 50:00) you MUST repeat the same Quick Wins recap pattern, updating ③ with what we just covered in the previous block.

--- BLOCK 4 · 15:00 — THE "SUCCESS LOVES SPEED" TUTORIAL (section label:"15:00 - Success Loves Speed", duration_min:5, [ACTION: SHOW MACBOOK SCREEN]) ---
"Watch how fast this is. I'm opening Printify. I take the colors my Brand Kit gave me. I put them on this product. Done. I have a business ready to sell on Etsy or TikTok Shop in minutes. You don't need a warehouse. You need a professional brand foundation. You need to look like a boss to get paid like one."

--- BLOCK 5 · 20:00 — THE CLOSE (HIGH STAKES) (section label:"20:00 - The Close", duration_min:5, [ACTION: SHOW FACE], use VERBATIM inside closing_script) ---
"Action takers are the money makers. You've been watching me for weeks waiting for a sign. This is it. Stop being a 'good girl' for a company that would replace you in a week. Click the link in my bio. Get the Dollhouse Brand Kit. When you get yours, come back and type 'GOT MINE' so I can shout you out! We are running up the bag today."

The closing_script field MUST contain Block 5 verbatim as its opening lines (then layer the urgency countdown after it). Do not omit a single line.

--- BLOCK 6 · FINAL · THE CLOSING CEREMONY (~3 min) (section label:"FINAL — The Closing Ceremony", duration_min:3, type:"closing", [ACTION: SHOW FACE], MANDATORY LAST SECTION) ---
"[ACTION: SHOW FACE] I'm headed out to support the new owners. If you just got yours, check your email — your freedom starts today. If you're on the fence, remember: most people consume all day while a few monetize. Action takers are the money makers. The $97 price stays up for 60 minutes, then it goes back to $145. I'll see you in the shop. Go run up that bag. I'm out. Bye!"
[ACTION: END LIVE]

This Closing Ceremony block MUST be the very LAST section in the sections array, read VERBATIM, with the [ACTION: END LIVE] marker as its final line. The closing_script field MUST also end with this block verbatim (after the urgency countdown).

═══════════════════════════════════════════════
MASTERCLASS CUES (mandatory, sprinkled throughout)
═══════════════════════════════════════════════
Mandy is teaching a MASTERCLASS, not just selling. Every 5 minutes (00:00, 05:00, 10:00, 15:00, 20:00, and every 5-min mark for longer lives), she MUST drop a "Stop & Write" cue inside that section's "script" field — minimum ONE per block, no exceptions. Format inline as a stand-alone paragraph:
  [STOP & WRITE] "Get your pens out, this is the part most people skip. Write this down — this is the difference between a worker and a boss. <one-line lesson>."
The lesson MUST be a real, tactical line she'd want a viewer to literally write in a notebook (e.g. "A brand is your insurance policy, not a logo." / "Your time is the only thing you can't earn back." / "Action takers are the money makers — speed beats perfection.").

═══════════════════════════════════════════════
SALES PSYCHOLOGY — INSURANCE FRAMING (HARD RULE)
═══════════════════════════════════════════════
NEVER frame the offer as "buying a kit," "purchasing a product," or "getting a download." ALWAYS frame it as "securing your INSURANCE POLICY" against being trapped in a bad job, a bad relationship, or a paycheck-to-paycheck life. Use these phrasings (rotate across the live, minimum 3 uses):
  • "This is your insurance policy against ever needing a bad boss again."
  • "You're not buying a kit — you're locking in your safety net."
  • "Securing your exit costs $97. Staying stuck costs your whole life."
The transition from teaching → offer MUST feel like the natural solution to the pain she just named. Never pivot abruptly into "okay so the price is…". Always bridge with: "<pain restated> → that's exactly why I built this insurance policy → here's how to secure yours."

═══════════════════════════════════════════════
PSYCHOLOGICAL "YES" LADDER (every 5 minutes)
═══════════════════════════════════════════════
Every 5 minutes she MUST ask the room a "Psychological Yes" question — a question almost everyone watching will silently agree with, then type. These are commitment micro-conversions that warm the room for the close. Add at LEAST one to engagement_bank for every 5-min mark and ALSO inline inside that section's script. Use this style (rotate, do not repeat):
  • "Type YES if you are done building someone else's dream."
  • "Type 97 if you're ready to learn sales psychology."
  • "Type SAFETY NET if you want your own money so you never have to settle again."
  • "Type INSURANCE if you're ready to stop being one paycheck from disaster."
  • "Type GOT MINE the second you secure your policy."
${isBrandKit ? `\nImmediately after Block 3, transition straight into the LIVE LAPTOP DEMO of The Dollhouse Brand Kit on the MacBook Pro and continue the demo through Block 4.` : ""}

${isBrandKit ? `═══════════════════════════════════════════════
LAPTOP DEMO — FACE-TO-MACBOOK (mapped to the REAL Brand Kit app)
═══════════════════════════════════════════════
The Dollhouse Brand Kit is NOT a template gallery and NOT a set of "attribute cards." It is an interactive, Zero-Server React engine (data lives in localStorage on the user's device only — no signup, no backend, instant save) that walks the user through a 19-question intake to generate a fully custom Business Blueprint. The walkthrough MUST mirror this REAL workflow, in this order:

Step 1 — START THE QUESTIONS. Open the Brand Kit and land on question 1. She MUST say verbatim, in plain words: "This is not a template. You answer 19 easy questions and it builds your business plan for you. Press this button to start. See that bar at the top? That's question 1 of 19. Easy."

Step 2 — THE DEEP DIVE (answer 3 questions LIVE, using the REAL verbatim questions from the engine). She MUST read each question on screen WORD-FOR-WORD before answering. Use these three (in this order):
  • Question 1 — "First, what's your name?" (she types her real first name live: "Mandy")
  • Question 5 — "Who is your ideal customer?" (multiple choice — she picks one out loud, e.g. "Young women building their first brand")
  • Question 7 — "What's the feeling you want your brand to give off?" (multiple choice — she picks one out loud, e.g. "Soft & feminine" or "Bold & editorial")
Narrate each answer as she selects/types so viewers see the engine pulling out her DNA in real time. Mid-demo, after answering Q7, she MUST point at the progress bar and call it out: "Look — we're already on question 7 of 19 and it's pulling out things I've never said out loud before." This momentum beat is mandatory.

Step 3 — HIT THE BUTTON. Skip to the final question. She MUST read it verbatim: "Last one — question 19 of 19: Do you want to hold physical stock or sell without it?" She picks "Sell without stock" out loud. Then she presses the big button and viewers watch it load. She MUST say in plain words: "Watch this. No website. No log-in. No waiting. It builds your plan right here on your screen in seconds."

Step 4 — YOUR PLAN, IN YOUR HAND. Reveal the final Business Plan, custom-built from her 19 answers (not a template — her real brand: who she sells to, what she sounds like, what she sells, in what order). Scroll through the plan slowly so viewers see what THEIRS will look like. Use the simple word "plan" — never "blueprint" without explaining it.

Step 5 — IT LOOKS EXPENSIVE. Show how the plan is already styled in soft gold and a pretty fancy font — say in plain words: "Look at it. It already looks expensive. You did not pay a designer. You did not pay a tech person. It just did it for you." Then refresh the tab to prove it stayed: "No log-in. No password. It just lives on your phone. You can come back anytime."

Split this into TWO laptop-demo sections:
- Demo Part 1 ("The 19 Easy Questions"): Steps 1–2 (Press start → Q1 → answer 2–3 questions live → progress callout).
- Demo Part 2 ("Your Plan, In Your Hand"): Steps 3–5 (Q19 → press the button → plan appears → looks expensive → stays saved on your phone).

CRITICAL FORMATTING — every section's "script" field MUST use these literal stage-direction markers inline so she knows exactly when to face camera vs. show the laptop:
  [ACTION: SHOW FACE]   — when she should be on face cam
  [ACTION: SHOW LAPTOP SCREEN]   — when she should tilt / share the MacBook screen
Opening + 9-5 hook + engagement = [ACTION: SHOW FACE]. Both demo parts = [ACTION: SHOW LAPTOP SCREEN] for every on-screen click (questionnaire, typing answers, hitting generate, scrolling the blueprint). Product mention, pricing reveal, and closing = [ACTION: SHOW FACE]. Switch markers mid-script whenever the camera angle changes — she should NEVER be told to click something the script didn't already cue with [ACTION: SHOW LAPTOP SCREEN].

CLICK-BY-CLICK SYNC RULE (mandatory): Inside the demo sections, the spoken "script" field MUST interleave each on-screen click with the line spoken IMMEDIATELY before it, in this exact pattern:
  [ACTION: SHOW LAPTOP SCREEN] "Spoken sentence that sets up the click." → (click happens) → "Spoken sentence reacting to what's on screen." → (next click) → ...
NEVER batch multiple clicks with no spoken line between them. NEVER instruct a click that hasn't been cued in the spoken line one beat earlier. The reader must be able to read top-to-bottom and have her hands and her mouth always in sync.

For the laptop_show cues, use Grade 3–5 EASY-CLICK language — "Press this button," "Type your name here," "Tap this answer." Each click maps 1-to-1 with the spoken line:
- Demo Part 1 (5 clicks, easy-click words):
  1. "Press this button to start" → opens the Brand Kit.
  2. "Look up here — that bar says question 1 of 19" → point at progress bar.
  3. "Type your name here" → types "Mandy" into Q1 ("First, what's your name?").
  4. "Tap Next. Now this question — who do you want to sell to? I'll tap 'Young women building their first brand'." → Q5.
  5. "Tap Next. How do you want your brand to feel? I'll tap 'Soft & feminine.' Look — already on question 7 of 19. Easy." → Q7.
- Demo Part 2 (5 clicks, easy-click words):
  1. "Last one — question 19. I'll tap 'Sell without stock.'" → Q19.
  2. "Press this big button right here." → Generate.
  3. "Watch — no website, no log-in. It's done." → in-browser processing finishes.
  4. "Look at your plan. It tells you who to sell to, what to say, what to sell first." → scroll the plan.
  5. "I'm going to refresh — see, still there. It saved on your phone for free." → refresh the tab.

═══════════════════════════════════════════════
STANSTORE CHECKOUT WALK-THROUGH (MANDATORY DEDICATED [ACTION: LAPTOP DEMO])
═══════════════════════════════════════════════
After Demo Part 2, add a dedicated section type:"laptop" labeled "How To Get It — Step By Step (StanStore)". Mandy tilts the laptop and walks viewers through the checkout so there is ZERO confusion. Easy-click language only:
  1. "I'm tapping on my profile picture at the top of TikTok. See my name? Right under it, the link. Tap it."
  2. "This is my StanStore. The Brand Kit is right here. Tap it."
  3. "Tap the gold button that says Buy Now."
  4. "Type your email here. Type your card here. That's it."
  5. "Tap Pay $97. You're going to get an email in one minute with your link. Open it on your phone, press the link, and you're inside. That easy."
She MUST say: "If you get stuck, type STUCK in the comments and I will walk you through it live right now. Nobody gets left behind."
` : ""}
═══════════════════════════════════════════════
LIVE-ONLY PRICING (must appear in product_mention AND closing)
═══════════════════════════════════════════════
${isBrandKit ? `The Dollhouse Brand Kit is $145 normally. Right now, for everyone watching, it is $97 LIFETIME ACCESS — you pay one time and it's yours forever. State it plain the first time: "Normal price is $145. Right now, one time, $97 — and it's yours forever. That's lifetime. No monthly. No subscription. Pay once, keep it." Then say: "If you are ready for freedom, type 97 in the comments right now." Restate in the closing with urgency: "When I end this live, $97 is gone. It goes back to $145. Type 97 if you want in." Use the mantras here: "Action takers are the money makers." "Let's run up this bag, girls."` : `If a price is mentioned, frame any discount as live-audience-only and state the original and discounted price clearly.`}

═══════════════════════════════════════════════
ON-SCREEN / LAPTOP DEMO CUES (per section)
═══════════════════════════════════════════════
For each section, include laptop / screen-demo cues (no whiteboard, no markers, no physical writing):
- "laptop_show": short numbered list of EXACTLY what to click / show on the MacBook screen this section (e.g. "1. Open brandkit.app  2. Type brand name  3. Click 'Generate Logo'"). 2-5 steps MAX. Use [] for sections with no on-screen action.
- "laptop_when": the exact spoken cue to switch to / click each item (e.g. "Right after you say 'watch this', tilt the laptop and click Generate.")
- "laptop_hide": when to angle the laptop away / cut back to face cam (e.g. "Cut back to face cam before the engagement prompt").
- "laptop_refer": when to point back at the screen verbally (e.g. "Glance back at the palette and say 'Champagne Gold — that's the whole vibe'").

═══════════════════════════════════════════════
ENGAGEMENT (raw, simple, repeated)
═══════════════════════════════════════════════
Use "Type 97 if you're ready for freedom" as the main re-engagement anchor — at least 4 times across the live. Use "Type SAFETY if you need a safety net" as the second anchor. When viewers reply, invite them in: "I see you. You typed 97. That means you're done settling. Let me show you exactly what to do."

CYCLICAL HOOKS (every 5 minutes for expanded runs) MUST rotate between these three raw themes — one per hook, in order, then loop:
  1. PAYCHECK STRESS: "If you just opened your bank app and your stomach dropped, this is for you."
  2. THE SAFETY NET: "If you're still with him because you can't afford to leave, this is for you. We are building your way out right now."
  3. RECLAIM YOUR TIME: "If you are watching this on your break, in a bathroom stall, hiding from your boss — this is for you. Your time is your life. We are taking it back."

Write a complete, structured TikTok Live runsheet. Warm, real, direct, conversational. Not corporate. Big-sister-who's-been-through-it energy.

Respond ONLY in this exact JSON (no markdown, no preamble):
{
  "title": "the live title to show on screen / announce",
  "hook_statement": "the very first thing she says within the first 10 seconds — must lead with 'Signs you aren't meant for a 9-5' framing",
  "sections": [
    {
      "id": "s1",
      "type": "opening",
      "label": "Opening — The Wake Up Call",
      "duration_min": 2,
      "color": "#c4a89a",
      "cue": "Look dead into camera. Slow. Calm. Confident. No smile yet.",
      "script": "the word-for-word wake-up opening — must include 'safety net', 'dusty dude', 'sugar daddy with no teeth', and the 'This is your sign to take action' line verbatim",
      "engagement_prompt": "If this just woke you up, type SAFETY. If you're ready to run up this bag, type 97.",
      "reminder": "one calm breathing / energy reminder",
      "laptop_show": [],
      "laptop_when": "Stay on face cam — no laptop yet.",
      "laptop_hide": "Keep face cam.",
      "laptop_refer": ""
    }
  ],
  "engagement_bank": [
    "Type 97 if you're ready for freedom",
    "Type SAFETY if you need your own safety net",
    "Type 🏠 if you're ready to leave your 9-5",
    "Type KIT if you want the link",
    "Type STUCK if you need me to walk you through checkout",
    "Type ME if you've ever stayed somewhere just for the money",
    "Type FREE if you want your time back",
    "Type GOLD if your plan should look this expensive",
    "Type EASY if 19 questions sounds easy",
    "Type NOW if today is the day"
  ],
  "product_mention": "the natural mention of ${productName||"the product"} mid-live — MUST include $145 → $97 LIFETIME ACCESS (one-time, no subscription) and the 'Type 97' call",
  "closing_script": "exact word-for-word HIGH-URGENCY closing — restate $145 → $97 LIFETIME, that $97 dies when the stream ends, single CTA (tap link in bio → StanStore → Pay $97), use both mantras ('Action takers are the money makers' + 'Let's run up this bag, girls'), and end with 'This was your sign. You took it. I'll see you on the inside.' Confident expert tone — never apologetic, never humble.",
  "if_nervous_card": "a short private pep-talk card she can read if she freezes — reminding her she is the EXPERT, not the beginner"
}

Total target runtime: ${durationMin} minutes. Scale section durations to fit. Each section needs full word-for-word script. She literally never has to think — just read, click, and breathe.${isExpanded ? ` Interleave scroll_stopper hook sections every 5 minutes and the two urgency sections at their tiered moments.` : ""}`;
};

// ─── TELEPROMPTER MODAL ───────────────────────────────────────────────────────
// Clean, large-text teleprompter view for reading the full launch script live
// while holding a laptop. Highlights [ACTION: SHOW FACE] vs [ACTION: SHOW LAPTOP SCREEN].
function TeleprompterModal({ result, fontSize, setFontSize, onClose, champagne }) {
  // Color palette — each block kind gets its own accent so Mandy can navigate visually
  const KIND_COLORS = {
    hook:    { accent:"#ff6b9d", soft:"rgba(255,107,157,0.12)", border:"rgba(255,107,157,0.45)", text:"#ffd6e5" }, // hot pink
    section: { accent:"#c4a89a", soft:"rgba(196,168,154,0.10)", border:"rgba(196,168,154,0.35)", text:"#f5ead4" }, // taupe (default)
    demo:    { accent:"#7ec0ec", soft:"rgba(126,192,236,0.12)", border:"rgba(126,192,236,0.45)", text:"#dceefc" }, // laptop blue
    engage:  { accent:"#a78bfa", soft:"rgba(167,139,250,0.12)", border:"rgba(167,139,250,0.45)", text:"#e3d8ff" }, // violet
    product: { accent:champagne,  soft:"rgba(212,175,55,0.14)",  border:"rgba(212,175,55,0.55)",  text:"#fdf1c8" }, // champagne gold
    close:   { accent:"#ff7a59", soft:"rgba(255,122,89,0.14)",  border:"rgba(255,122,89,0.55)",  text:"#ffd9c8" }, // urgent coral
  };

  // Assemble the entire runsheet into one readable stream
  const blocks = [];
  if (result.hook_statement) blocks.push({ kind:"hook", label:"FIRST 10 SECONDS · MANDY OPENS", text:result.hook_statement });
  (result.sections||[]).forEach(s => {
    const isDemo = /demo|laptop|brand kit|engine|blueprint|question/i.test(s.label||"");
    const isEngage = /engagement|q&a|comments|interaction/i.test(s.label||"");
    const kind = isDemo ? "demo" : isEngage ? "engage" : "section";
    blocks.push({ kind, label:s.label||"Section", text:s.script||"", engagement:s.engagement_prompt, laptop:s.laptop_show, cue:s.cue });
  });
  if (result.product_mention) blocks.push({ kind:"product", label:"PRODUCT MENTION · $145 → $97", text:result.product_mention });
  if (result.closing_script) blocks.push({ kind:"close", label:"CLOSING — HIGH URGENCY", text:result.closing_script });

  // Render text with [ACTION: ...] markers as visual chips
  function renderScript(text) {
    if (!text) return null;
    const parts = text.split(/(\[ACTION:[^\]]+\])/g);
    return parts.map((p, i) => {
      const m = p.match(/^\[ACTION:\s*(.+?)\]$/);
      if (m) {
        const isFace = /face/i.test(m[1]);
        return (
          <div key={i} style={{
            display:"inline-block", margin:"18px 0", padding:"10px 18px",
            background: isFace ? "rgba(255,107,157,0.18)" : "rgba(126,192,236,0.22)",
            border: `2px solid ${isFace ? "#ff6b9d" : "#7ec0ec"}`,
            borderRadius:8, color: isFace ? "#ff6b9d" : "#7ec0ec",
            fontFamily:"'Jost',sans-serif", fontSize: Math.max(11, fontSize*0.35),
            letterSpacing:3, textTransform:"uppercase", fontWeight:500,
          }}>
            {isFace ? "🎥 SHOW FACE" : "💻 SHOW LAPTOP SCREEN"}
          </div>
        );
      }
      return <span key={i}>{p}</span>;
    });
  }

  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(10,8,6,0.97)", zIndex:9999,
      display:"flex", flexDirection:"column", animation:"fadeIn 0.2s ease",
    }}>
      {/* Top bar */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 22px", borderBottom:`1px solid ${champagne}33`, background:"rgba(0,0,0,0.4)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <span style={{ display:"inline-block", width:10, height:10, borderRadius:999, background:champagne, boxShadow:`0 0 14px ${champagne}` }} />
          <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, letterSpacing:3, textTransform:"uppercase", color:champagne, fontWeight:500 }}>Teleprompter · Mandy's Launch Script</div>
          {/* Color legend */}
          <div style={{ display:"flex", gap:10, marginLeft:18 }}>
            {[
              { c:"#ff6b9d", l:"Hook" },
              { c:"#c4a89a", l:"Section" },
              { c:"#7ec0ec", l:"Demo" },
              { c:"#a78bfa", l:"Engage" },
              { c:champagne, l:"$97" },
              { c:"#ff7a59", l:"Close" },
            ].map(x => (
              <div key={x.l} style={{ display:"flex", alignItems:"center", gap:5, fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:"#d4c5a8" }}>
                <span style={{ width:8, height:8, borderRadius:999, background:x.c, display:"inline-block" }} />
                {x.l}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <button onClick={()=>setFontSize(Math.max(20, fontSize-4))} style={{ width:36, height:36, borderRadius:8, background:"transparent", border:`1px solid ${champagne}55`, color:champagne, fontSize:18, cursor:"pointer" }}>−</button>
          <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#d4c5a8", minWidth:40, textAlign:"center" }}>{fontSize}px</span>
          <button onClick={()=>setFontSize(Math.min(80, fontSize+4))} style={{ width:36, height:36, borderRadius:8, background:"transparent", border:`1px solid ${champagne}55`, color:champagne, fontSize:18, cursor:"pointer" }}>+</button>
          <button onClick={onClose} style={{ marginLeft:14, padding:"8px 18px", borderRadius:8, background:"transparent", border:`1px solid ${champagne}`, color:champagne, fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:3, textTransform:"uppercase", cursor:"pointer", fontWeight:500 }}>Close</button>
        </div>
      </div>

      {/* Scrollable script */}
      <div style={{ flex:1, overflowY:"auto", padding:"40px max(40px, 8vw) 200px", color:"#f5ead4" }}>
        {blocks.map((b, i) => {
          const C = KIND_COLORS[b.kind] || KIND_COLORS.section;
          return (
            <div key={i} style={{
              marginBottom:48, maxWidth:1100, marginLeft:"auto", marginRight:"auto",
              padding:"28px 32px", borderRadius:14,
              background:C.soft, border:`1px solid ${C.border}`,
              borderLeft:`6px solid ${C.accent}`,
            }}>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, letterSpacing:4, textTransform:"uppercase", color:C.accent, marginBottom:18, paddingBottom:10, borderBottom:`1px solid ${C.border}`, fontWeight:500 }}>
                {b.label}
              </div>
              {b.cue && (
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:Math.max(13, fontSize*0.4), color:C.accent, opacity:0.85, marginBottom:14 }}>
                  ↳ {b.cue}
                </div>
              )}
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:fontSize, lineHeight:1.55, color:C.text, whiteSpace:"pre-wrap", wordBreak:"break-word", fontWeight:400 }}>
                {renderScript(b.text)}
              </div>
              {b.engagement && (
                <div style={{ marginTop:22, padding:"14px 20px", background:KIND_COLORS.engage.soft, border:`1px solid ${KIND_COLORS.engage.border}`, borderRadius:10, fontFamily:"'DM Sans',sans-serif", fontSize:Math.max(15, fontSize*0.5), color:KIND_COLORS.engage.text }}>
                  ◎ Ask: {b.engagement}
                </div>
              )}
              {b.laptop && b.laptop.length > 0 && (
                <div style={{ marginTop:18, padding:"14px 20px", background:KIND_COLORS.demo.soft, border:`1px solid ${KIND_COLORS.demo.border}`, borderRadius:10 }}>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:3, textTransform:"uppercase", color:KIND_COLORS.demo.accent, marginBottom:8, fontWeight:500 }}>Cue Panel:</div>
                  {b.laptop.map((step, si) => (
                    <div key={si} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:Math.max(13, fontSize*0.45), color:KIND_COLORS.demo.text, padding:"3px 0" }}>{step}</div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <div style={{ textAlign:"center", padding:"40px 0 80px", color:`${champagne}88`, fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:3, textTransform:"uppercase" }}>
          — End of Launch Script · You did it. —
        </div>
      </div>
    </div>
  );
}

function LiveScriptBuilder({ brands, scripts, setScripts, onGoLive }) {
  const T = useTheme();
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [showTeleprompter, setShowTeleprompter] = useState(false);
  const [teleFontSize, setTeleFontSize] = useState(38);

  // PRODUCT LAUNCH ENGINE — style, duration, code-sync
  const [liveStyle, setLiveStyle] = useState("A"); // A | B | C
  const [durationMin, setDurationMin] = useState(10);
  const [codeSync, setCodeSync] = useState(false);

  // LAUNCH MODE — hard-locked to The Dollhouse Brand Kit
  const brand = "dollhouse";
  const LAUNCH_PRODUCT = "The Dollhouse Brand Kit";
  const CHAMPAGNE = "#D4AF37";

  async function generate() {
    if (!topic.trim()) return;
    setGenerating(true); setResult(null); setError("");
    const b = brands.find(x=>x.id===brand)||brands[0];
    const requestDurationMin = liveStyle === "A" ? 60 : durationMin;
    const maxTokens = liveStyle === "A" ? 18000 : requestDurationMin >= 25 ? 8000 : 5000;
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, {
        method:"POST", headers:{"Content-Type":"application/json","Authorization":`Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`},
        body: JSON.stringify({ messages:[{role:"user",content:LIVE_PROMPT(topic,b.name,b.goal,LAUNCH_PRODUCT,{ style:liveStyle, durationMin:requestDurationMin, codeSync: liveStyle === "A" ? false : codeSync })}], max_tokens: maxTokens })
      });
      if (!res.ok) { const e = await res.json().catch(()=>({})); throw new Error(e?.error?.message||`API error ${res.status}`); }
      const data = await res.json();
      if (!data.content?.length) throw new Error("Empty response");
      const raw = data.content.map(c=>c.text||"").join("");
      const parsed = safeParseJSON(raw);
      setResult(liveStyle === "A" ? cleanStyleALiveData(parsed) : parsed);
    } catch(e) { setError(`Generation failed: ${e.message}. Try again.`); }
    setGenerating(false);
  }

  function saveAndGoLive() {
    if (!result) return;
    const script = {
      id: Date.now().toString(),
      title: result.title || topic,
      brand, type:"TikTok Live", topic,
      body: result.sections?.map(s=>`[${s.label}]\n${s.script}`).join("\n\n") || "",
      status:"draft", isLive:true,
      liveData: result,
    };
    setScripts(ss=>[script,...ss]);
    // Auto-pin newly built lives to Starred Lives (LocalStorage) so they're ready for 8 AM
    try {
      const raw = localStorage.getItem("dh_starred_lives_v1");
      const starred = raw ? JSON.parse(raw) : [];
      if (Array.isArray(starred) && !starred.includes(script.id)) {
        localStorage.setItem("dh_starred_lives_v1", JSON.stringify([...starred, script.id]));
      }
    } catch {}
    setSaved(true);
    setTimeout(()=>{ onGoLive(script.id); }, 400);
  }

  const SECTION_COLORS = { opening:"#c4a89a", value:"#8aaa8c", engagement:"#7a8fa6", product:"#b8916a", qa:"#d4879a", closing:"#9c7b6e" };

  return (
    <div>
      <Card style={{ padding:"32px", marginBottom:20, borderTop:`2px solid ${CHAMPAGNE}`, background:`linear-gradient(180deg, rgba(212,175,55,0.04), transparent 60%)` }}>
        {/* Launch Mode header */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
          <span style={{ display:"inline-block", width:8, height:8, borderRadius:999, background:CHAMPAGNE, boxShadow:`0 0 12px ${CHAMPAGNE}` }} />
          <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:4, textTransform:"uppercase", color:CHAMPAGNE }}>Launch Mode · Live</div>
        </div>
        <div style={{ fontFamily:"'Playfair Display','Cormorant SC',serif", fontSize:28, color:T.ink, fontStyle:"italic", lineHeight:1.15, marginBottom:6 }}>
          Official Launch Control Room
        </div>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, color:T.mid, fontStyle:"italic", marginBottom:18 }}>
          The Dollhouse Brand Kit · One topic. One button. Full luxury runsheet.
        </div>

        {/* Locked-in chips so she can see what's pre-baked */}
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:22 }}>
          {[
            "9-5 Escape Hook",
            "19-Question Engine Demo",
            "Custom Blueprint Reveal",
            "$145 → $97 Live Only",
            "Champagne Gold · Playfair",
          ].map(chip => (
            <span key={chip} style={{ padding:"5px 11px", border:`1px solid ${CHAMPAGNE}55`, background:`${CHAMPAGNE}10`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:T.ink }}>
              ✓ {chip}
            </span>
          ))}
        </div>

        {/* 📦 PRODUCT LAUNCH ENGINE */}
        <div style={{ padding:"18px", marginBottom:18, border:`1px solid ${CHAMPAGNE}40`, background:`${CHAMPAGNE}08`, borderRadius:12 }}>
          <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:4, textTransform:"uppercase", color:CHAMPAGNE, marginBottom:10 }}>📦 Product Launch Engine</div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:13, color:T.mid, fontStyle:"italic", marginBottom:14 }}>
            Pick a Live Style. Style A is a locked 60-minute slide-deck sales presentation; Styles B/C can use shorter demo/Q&A pacing.
          </div>

          {/* Style picker */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:14 }}>
            {[
              { id:"A", title:"Quit Your 9-5", sub:"Emotional · Hook-heavy" },
              { id:"B", title:"Watch Me Build", sub:"Pure Technical Demo" },
              { id:"C", title:"Brand Audit", sub:"Interactive Q&A" },
            ].map(s => {
              const active = liveStyle === s.id;
              return (
                <button key={s.id} onClick={()=>{ setLiveStyle(s.id); if (s.id === "A") { setDurationMin(60); setCodeSync(false); } }} style={{
                  textAlign:"left", padding:"12px 14px", borderRadius:10, cursor:"pointer",
                  background: active ? `${CHAMPAGNE}18` : "rgba(0,0,0,0.02)",
                  border: active ? `1.5px solid ${CHAMPAGNE}` : `1px solid ${T.border}`,
                  fontFamily:"'Cormorant Garamond',serif",
                }}>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, textTransform:"uppercase", color: active ? CHAMPAGNE : T.light, marginBottom:4 }}>Style {s.id}</div>
                  <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:14, color:T.ink, fontStyle:"italic" }}>{s.title}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:T.light, fontStyle:"italic" }}>{s.sub}</div>
                </button>
              );
            })}
          </div>

          {/* Duration */}
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, textTransform:"uppercase", color:T.light, minWidth:90 }}>Length</div>
            <input type="range" min={10} max={60} step={5} value={durationMin} disabled={liveStyle==="A"} onChange={e=>setDurationMin(Number(e.target.value))} style={{ flex:1, accentColor:CHAMPAGNE, opacity:liveStyle==="A"?0.45:1 }} />
            <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:15, color:T.ink, fontStyle:"italic", minWidth:112, textAlign:"right" }}>{liveStyle==="A" ? "60 min · deck" : `${durationMin} min${durationMin>=25 ? " · expanded" : ""}`}</div>
          </div>

          {/* Code-Sync toggle */}
          <label style={{ display:"flex", alignItems:"center", gap:10, cursor:liveStyle==="A"?"not-allowed":"pointer", padding:"10px 12px", borderRadius:8, background: codeSync && liveStyle!=="A" ? `${CHAMPAGNE}12` : "transparent", border:`1px solid ${codeSync && liveStyle!=="A" ? CHAMPAGNE+"55" : T.border}`, opacity:liveStyle==="A"?0.55:1 }}>
            <input type="checkbox" checked={liveStyle==="A" ? false : codeSync} disabled={liveStyle==="A"} onChange={e=>setCodeSync(e.target.checked)} style={{ accentColor:CHAMPAGNE, width:16, height:16 }} />
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:14, color:T.ink, fontStyle:"italic" }}>Enforce Code-Sync Mode</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:T.light, fontStyle:"italic" }}>{liveStyle==="A" ? "Disabled for Style A because the presenter stays on camera while the slideshow background advances." : "Teleprompter cues every click against the real Brand Kit React components (Question card, Progress bar, Generate Blueprint, localStorage refresh)."}</div>
            </div>
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color: codeSync && liveStyle!=="A" ? CHAMPAGNE : T.light }}>{codeSync && liveStyle!=="A" ? "On" : "Off"}</span>
          </label>
        </div>

        <Label>What is this live about?</Label>
        <input value={topic} onChange={e=>setTopic(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&!generating&&topic.trim()&&generate()}
          placeholder="e.g. How I built my first digital product from scratch..."
          style={{ width:"100%", padding:"14px 16px", background:`rgba(0,0,0,0.02)`, border:`1px solid ${T.border}`, borderRadius:10, fontFamily:"'DM Sans',sans-serif", fontSize:15, color:T.ink, outline:"none", marginBottom:14 }} />

        <Btn onClick={generate} disabled={generating||!topic.trim()} style={{ width:"100%", background:CHAMPAGNE, borderColor:CHAMPAGNE, color:"#1a1410", fontFamily:"'Jost',sans-serif", letterSpacing:2, textTransform:"uppercase", fontSize:11, padding:"14px" }}>
          {generating ? "Writing your launch script..." : "⏺  Generate Full Live Script"}
        </Btn>
        <div style={{ marginTop:10, fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:T.light, fontStyle:"italic", textAlign:"center" }}>
          Zero-server · Saved locally on this device only
        </div>
        {generating && <div style={{ marginTop:12, fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:T.mid, fontStyle:"italic", animation:"pulse 1.5s ease infinite", textAlign:"center" }}>Building your hook, demo, pricing & closing — every word ready to read...</div>}
        {error && <div style={{ marginTop:10, fontSize:12, color:"#cc4444", textAlign:"center" }}>{error}</div>}
      </Card>

      {result && !generating && (
        <div style={{ animation:"riseIn 0.4s ease both" }}>
          {/* Header */}
          <div style={{ padding:"20px 24px", background:"rgba(255,45,85,0.06)", border:"1px solid rgba(255,45,85,0.15)", borderRadius:14, marginBottom:16 }}>
            <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:20, color:T.ink, fontStyle:"italic", marginBottom:8 }}>{result.title}</div>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:3, textTransform:"uppercase", color:"#ff2d55", marginBottom:4 }}>First 10 Seconds — Say This First</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, color:T.ink, fontStyle:"italic", lineHeight:1.7 }}>"{result.hook_statement}"</div>
          </div>

          {/* Sections */}
          {(result.sections||[]).map((sec,i)=>(
            <Card key={sec.id||i} style={{ padding:"22px", marginBottom:12, borderLeft:`3px solid ${SECTION_COLORS[sec.type]||T.p3}` }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12, flexWrap:"wrap" }}>
                <span style={{ padding:"3px 10px", background:`${SECTION_COLORS[sec.type]||T.p3}20`, border:`1px solid ${SECTION_COLORS[sec.type]||T.p3}50`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, textTransform:"uppercase", color:SECTION_COLORS[sec.type]||T.p4 }}>{sec.label}</span>
                <span style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, color:T.light, textTransform:"uppercase" }}>~{sec.duration_min} min</span>
                {sec.cue && <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:T.light, fontStyle:"italic" }}>◦ {sec.cue}</span>}
              </div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:T.ink, lineHeight:1.95, whiteSpace:"pre-wrap", marginBottom:12 }}>{sec.script}</div>

              {/* LAPTOP / SCREEN-DEMO INSTRUCTIONS */}
              {(sec.laptop_show?.length > 0 || sec.laptop_when || sec.laptop_hide || sec.laptop_refer) && (
                <div style={{ padding:"14px 16px", background:"rgba(60,100,140,0.06)", border:"1px solid rgba(60,100,140,0.15)", borderRadius:10, marginBottom:12 }}>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:3, textTransform:"uppercase", color:"#3c648c", marginBottom:10 }}>💻 Laptop / Screen Demo</div>
                  {sec.laptop_show?.length > 0 && (
                    <div style={{ marginBottom:8 }}>
                      <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:"rgba(60,100,140,0.6)", marginBottom:4 }}>Slide / Action Cue:</div>
                      {sec.laptop_show.map((item,wi) => (
                        <div key={wi} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.ink, padding:"3px 0", fontWeight:500 }}>{item}</div>
                      ))}
                    </div>
                  )}
                  {sec.laptop_when && (
                    <div style={{ marginBottom:6 }}>
                      <span style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:"rgba(60,100,140,0.6)" }}>When: </span>
                      <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.mid }}>{sec.laptop_when}</span>
                    </div>
                  )}
                  {sec.laptop_hide && (
                    <div style={{ marginBottom:6 }}>
                      <span style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:"rgba(200,80,60,0.6)" }}>Cut Back: </span>
                      <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.mid }}>{sec.laptop_hide}</span>
                    </div>
                  )}
                  {sec.laptop_refer && (
                    <div>
                      <span style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:"rgba(100,160,100,0.7)" }}>Refer Back: </span>
                      <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.mid }}>{sec.laptop_refer}</span>
                    </div>
                  )}
                </div>
              )}

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {sec.engagement_prompt && (
                  <div style={{ padding:"10px 12px", background:"rgba(122,143,166,0.08)", border:"1px solid rgba(122,143,166,0.2)", borderRadius:8 }}>
                    <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, color:"#7a8fa6", textTransform:"uppercase", marginBottom:4 }}>◎ Ask the Room</div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.mid }}>{sec.engagement_prompt}</div>
                  </div>
                )}
                {sec.reminder && (
                  <div style={{ padding:"10px 12px", background:"rgba(196,168,154,0.08)", border:`1px solid ${T.border}`, borderRadius:8 }}>
                    <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, color:T.p4, textTransform:"uppercase", marginBottom:4 }}>✦ Breathe</div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.mid, fontStyle:"italic" }}>{sec.reminder}</div>
                  </div>
                )}
              </div>
            </Card>
          ))}

          {/* Engagement bank + closing + pep talk */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
            <Card style={{ padding:"22px" }}>
              <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:15, color:T.ink, fontStyle:"italic", marginBottom:12 }}>◎ Engagement Bank</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:T.light, marginBottom:10 }}>Drop these any time the energy dips or you need a moment.</div>
              {(result.engagement_bank||[]).map((q,i)=>(
                <div key={i} style={{ padding:"8px 10px", background:`rgba(0,0,0,0.02)`, border:`1px solid ${T.border}`, borderRadius:7, marginBottom:6, fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.mid }}>{q}</div>
              ))}
            </Card>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {result.product_mention && (
                <Card style={{ padding:"18px", borderTop:`2px solid ${T.gold}` }}>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:3, textTransform:"uppercase", color:T.gold, marginBottom:8 }}>◈ Product Mention</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:T.ink, fontStyle:"italic", lineHeight:1.75 }}>{result.product_mention}</div>
                </Card>
              )}
              {result.if_nervous_card && (
                <Card style={{ padding:"18px", background:"rgba(196,168,154,0.06)", borderTop:`2px solid ${T.p3}` }}>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:3, textTransform:"uppercase", color:T.p4, marginBottom:8 }}>✦ If You Freeze — Read This</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:T.ink, fontStyle:"italic", lineHeight:1.8 }}>{result.if_nervous_card}</div>
                </Card>
              )}
            </div>
          </div>
          {result.closing_script && (
            <Card style={{ padding:"22px", marginBottom:20, borderTop:`2px solid #ff2d55` }}>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:3, textTransform:"uppercase", color:"#ff2d55", marginBottom:8 }}>Closing</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:T.ink, lineHeight:1.95, whiteSpace:"pre-wrap" }}>{result.closing_script}</div>
            </Card>
          )}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <Btn onClick={()=>setShowTeleprompter(true)} style={{width:"100%", padding:"14px", background:"#1a1410", borderColor:CHAMPAGNE, color:CHAMPAGNE, fontFamily:"'Jost',sans-serif", letterSpacing:2, textTransform:"uppercase", fontSize:11}}>
              📺  Open Teleprompter
            </Btn>
            <Btn onClick={saveAndGoLive} style={{width:"100%", padding:"14px"}}>
              {saved ? "✓ Saved — Opening Live Mode..." : "⏺ Save & Open Live Mode →"}
            </Btn>
          </div>

          {showTeleprompter && (
            <TeleprompterModal
              result={result}
              fontSize={teleFontSize}
              setFontSize={setTeleFontSize}
              onClose={()=>setShowTeleprompter(false)}
              champagne={CHAMPAGNE}
            />
          )}
        </div>
      )}
    </div>
  );
}

function LiveStudio({ scripts, setScripts, brands }) {
  const T = useTheme();
  const liveScripts = scripts.filter(s=>s.isLive||s.type==="TikTok Live");
  const [view, setView] = useState("home"); // home | build | cuecard | teleprompter
  const [sel, setSel] = useState(null);
  const [fontSize, setFontSize] = useState(42);
  const [speed, setSpeed] = useState(28);
  const [scrolling, setScrolling] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [showNervous, setShowNervous] = useState(false);
  const [dimUI, setDimUI] = useState(false);
  const [starred, setStarred] = usePersist("dh_starred_lives_v1", []);
  const [showLoopFlash, setShowLoopFlash] = useState(false);
  const [statsOpen, setStatsOpen] = useState(true);
  const [likeGoal, setLikeGoal] = usePersist("dh_live_likegoal_v1", 5000);
  const [currentLikes, setCurrentLikes] = useState(0);
  const [viewerCount, setViewerCount] = useState(0);
  const [gotMineLog, setGotMineLog] = useState([]);
  const [newGotMine, setNewGotMine] = useState("");
  const [copiedLiveScript, setCopiedLiveScript] = useState(false);
  function toggleStar(id){ setStarred(s => s.includes(id) ? s.filter(x=>x!==id) : [...s, id]); }
  const isStarred = (id) => starred.includes(id);
  const scrollRef = useRef(null);
  const ivRef = useRef(null);
  const timerRef = useRef(null);
  const selScript = liveScripts.find(s=>s.id===sel);
  const liveData = selScript?.liveData;

  function startScroll(){ setScrolling(true); ivRef.current=setInterval(()=>{ if(scrollRef.current) scrollRef.current.scrollTop+=speed/60; },16); }
  function stopScroll(){ setScrolling(false); clearInterval(ivRef.current); }
  function resetScroll(){ stopScroll(); if(scrollRef.current) scrollRef.current.scrollTop=0; }

  function startTimer(){ setTimerRunning(true); timerRef.current=setInterval(()=>setElapsed(e=>e+1),1000); }
  function stopTimer(){ setTimerRunning(false); clearInterval(timerRef.current); }
  function resetTimer(){ stopTimer(); setElapsed(0); }
  function fmtTime(s){ return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`; }
  function buildFullLiveScript() {
    if (!selScript) return "";
    const data = selScript.liveData || {};
    const lines = [selScript.title || data.title || "Live Script"];
    if (data.hook_statement) lines.push(`\n[SAY THIS FIRST]\n${cleanStyleAScriptText(data.hook_statement)}`);
    (data.sections || []).forEach((sec, i) => {
      lines.push(`\n[${sec.label || `Section ${i + 1}`}]`);
      if (sec.cue) lines.push(`Cue: ${sec.cue}`);
      if (sec.script) lines.push(cleanStyleAScriptText(sec.script));
      if (sec.engagement_prompt) lines.push(`\nAsk the room: ${sec.engagement_prompt}`);
      if (sec.reminder) lines.push(`Reminder: ${sec.reminder}`);
    });
    if (data.product_mention) lines.push(`\n[PRODUCT MENTION]\n${cleanStyleAScriptText(data.product_mention)}`);
    if (data.closing_script) lines.push(`\n[CLOSING]\n${cleanStyleAScriptText(data.closing_script)}`);
    return lines.join("\n\n").trim();
  }
  function copyFullLiveScript() {
    navigator.clipboard.writeText(buildFullLiveScript()).then(() => {
      setCopiedLiveScript(true);
      setTimeout(() => setCopiedLiveScript(false), 1800);
    });
  }

  useEffect(()=>()=>{ clearInterval(ivRef.current); clearInterval(timerRef.current); },[]);

  // ── Loop Timer: every 10 min, flash "RESET THE LOOP" ──
  useEffect(() => {
    if (elapsed > 0 && elapsed % 600 === 0) {
      setShowLoopFlash(true);
      const t = setTimeout(() => setShowLoopFlash(false), 8000);
      return () => clearTimeout(t);
    }
  }, [elapsed]);

  // Keyboard controls in teleprompter
  useEffect(()=>{
    if(view!=="teleprompter") return;
    function k(e){
      if(e.key===" "||e.key==="Enter"){ scrolling?stopScroll():startScroll(); e.preventDefault(); }
      if(e.key==="Escape"){ stopScroll(); setView("cuecard"); }
      if(e.key==="ArrowUp") setSpeed(s=>Math.max(5,s-3));
      if(e.key==="ArrowDown") setSpeed(s=>Math.min(100,s+3));
      if(e.key==="t"||e.key==="T"){ timerRunning?stopTimer():startTimer(); }
      if(e.key==="n"||e.key==="N"){ setShowNervous(v=>!v); }
      if(e.key==="d"||e.key==="D"){ setDimUI(v=>!v); }
    }
    window.addEventListener("keydown",k); return()=>window.removeEventListener("keydown",k);
  },[view,scrolling,timerRunning]);

  function openLive(id) {
    setSel(id); setElapsed(0); setTimerRunning(false); setActiveSectionIdx(0);
    setView("cuecard");
  }

  // ── TELEPROMPTER VIEW (Modern Redesign) ──
  if(view==="teleprompter" && selScript){
    const sections = liveData?.sections||[];
    const GOLD = "#d4af6a";
    const GOLD_GLOW = "rgba(212,175,106,0.4)";
    return (
      <div style={{ position:"fixed", inset:0, background:"radial-gradient(ellipse at top, #0a0a0f 0%, #050507 60%, #000000 100%)", zIndex:999, display:"flex", flexDirection:"column", fontFamily:"'Inter','DM Sans',sans-serif" }}>

        {/* Ambient glow effect */}
        <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"60%", height:"40%", background:`radial-gradient(ellipse, ${GOLD_GLOW} 0%, transparent 70%)`, opacity:0.08, pointerEvents:"none", zIndex:1 }} />

        {/* Top floating progress bar */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"rgba(255,255,255,0.04)", zIndex:11 }}>
          <div id="dh-progress-bar" style={{ height:"100%", width:"0%", background:`linear-gradient(90deg, ${GOLD}, #f5d896, ${GOLD})`, boxShadow:`0 0 12px ${GOLD_GLOW}`, transition:"width 0.2s linear" }} />
        </div>

        {/* Top glassmorphic control bar */}
        {!dimUI && (
          <div style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 32px", background:"rgba(10,10,15,0.7)", backdropFilter:"blur(20px) saturate(180%)", WebkitBackdropFilter:"blur(20px) saturate(180%)", borderBottom:"1px solid rgba(255,255,255,0.06)", flexShrink:0, flexWrap:"wrap", zIndex:12, position:"relative" }}>
            {/* Title + Live indicator */}
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ position:"relative", width:10, height:10 }}>
                <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:scrolling?"#ff4466":"rgba(255,255,255,0.25)", boxShadow:scrolling?"0 0 16px rgba(255,68,102,0.8)":"none", animation:scrolling?"pulse 1.4s ease infinite":"none" }} />
              </div>
              <span style={{ fontFamily:"'Inter',sans-serif", fontSize:14, color:"rgba(255,255,255,0.92)", fontWeight:600, letterSpacing:"-0.01em" }}>{selScript.title}</span>
            </div>

            {/* Right side controls */}
            <div style={{ display:"flex", alignItems:"center", gap:10, marginLeft:"auto" }}>
              {/* Timer */}
              <button onClick={timerRunning?stopTimer:startTimer}
                style={{ padding:"7px 16px", background:timerRunning?"linear-gradient(135deg, rgba(255,68,102,0.18), rgba(255,68,102,0.08))":"rgba(255,255,255,0.05)", border:`1px solid ${timerRunning?"rgba(255,68,102,0.35)":"rgba(255,255,255,0.08)"}`, borderRadius:10, color:timerRunning?"#ff7788":"rgba(255,255,255,0.7)", fontFamily:"'JetBrains Mono',monospace", fontSize:14, cursor:"pointer", letterSpacing:1, fontWeight:600, transition:"all 0.2s", boxShadow:timerRunning?"0 0 20px rgba(255,68,102,0.2)":"none" }}>
                {fmtTime(elapsed)}
              </button>

              {/* Size & Speed sliders */}
              {[["A",fontSize,()=>setFontSize(s=>Math.max(22,s-4)),()=>setFontSize(s=>Math.min(80,s+4))],["⊳",speed,()=>setSpeed(s=>Math.max(5,s-3)),()=>setSpeed(s=>Math.min(100,s+3))]].map(([lbl,val,dec,inc])=>(
                <div key={lbl} style={{ display:"flex", alignItems:"center", gap:2, background:"rgba(255,255,255,0.04)", borderRadius:10, padding:"3px", border:"1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontFamily:"'Inter',sans-serif", fontSize:11, color:"rgba(255,255,255,0.4)", padding:"0 8px", fontWeight:600 }}>{lbl}</span>
                  <button onClick={dec} style={{ background:"rgba(255,255,255,0.06)", border:"none", color:"rgba(255,255,255,0.7)", borderRadius:7, width:24, height:24, cursor:"pointer", fontSize:14, fontWeight:500, transition:"all 0.15s", display:"flex", alignItems:"center", justifyContent:"center" }} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.12)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"}>−</button>
                  <span style={{ fontSize:11, color:"rgba(255,255,255,0.6)", minWidth:24, textAlign:"center", fontFamily:"'JetBrains Mono',monospace", fontWeight:500 }}>{val}</span>
                  <button onClick={inc} style={{ background:"rgba(255,255,255,0.06)", border:"none", color:"rgba(255,255,255,0.7)", borderRadius:7, width:24, height:24, cursor:"pointer", fontSize:14, fontWeight:500, transition:"all 0.15s", display:"flex", alignItems:"center", justifyContent:"center" }} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.12)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"}>+</button>
                </div>
              ))}

              {/* Copy Script */}
              <button onClick={copyFullLiveScript}
                style={{ padding:"7px 14px", background:copiedLiveScript?"linear-gradient(135deg, rgba(120,200,140,0.2), rgba(120,200,140,0.08))":"rgba(212,175,106,0.08)", border:`1px solid ${copiedLiveScript?"rgba(120,200,140,0.4)":"rgba(212,175,106,0.2)"}`, borderRadius:10, color:copiedLiveScript?"#9ed09e":GOLD, fontFamily:"'Inter',sans-serif", fontSize:11, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.2s", letterSpacing:"0.02em" }}
                title="Copy the full live script">
                {copiedLiveScript ? "✓ Copied" : "Copy"}
              </button>

              {/* Dim toggle */}
              <button onClick={()=>setDimUI(v=>!v)} style={{ padding:"7px 12px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, color:"rgba(255,255,255,0.5)", fontSize:11, cursor:"pointer", fontWeight:500, transition:"all 0.2s" }} title="D — Hide controls">◐</button>

              {/* Cue cards exit */}
              <button onClick={()=>{ stopScroll(); stopTimer(); setView("cuecard"); }} style={{ padding:"7px 14px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, color:"rgba(255,255,255,0.55)", fontSize:11, cursor:"pointer", fontWeight:500, transition:"all 0.2s" }}>← Cue Cards</button>
            </div>
          </div>
        )}
        {dimUI && (
          <button onClick={()=>setDimUI(false)} style={{ position:"fixed", top:12, right:16, zIndex:1001, background:"rgba(255,255,255,0.04)", backdropFilter:"blur(10px)", border:"1px solid rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.4)", fontSize:11, cursor:"pointer", borderRadius:8, padding:"6px 12px", fontWeight:500 }}>show controls</button>
        )}

        {/* Top fade gradient */}
        <div style={{ position:"absolute", top:dimUI?0:60, left:0, right:0, height:120, background:"linear-gradient(180deg, rgba(0,0,0,0.95) 0%, transparent 100%)", pointerEvents:"none", zIndex:5 }} />

        {/* Reading focus line — modern glowing */}
        <div style={{ position:"absolute", top:"42%", left:"5%", right:"5%", height:"1px", background:`linear-gradient(90deg, transparent, ${GOLD_GLOW}, transparent)`, pointerEvents:"none", zIndex:10, boxShadow:`0 0 24px ${GOLD_GLOW}` }} />
        <div style={{ position:"absolute", top:"42%", left:"50%", transform:"translate(-50%, -50%)", width:"32px", height:"32px", border:`1px solid ${GOLD_GLOW}`, borderRadius:"50%", pointerEvents:"none", zIndex:10, opacity:0.4 }} />

        {/* Script scroll area */}
        <div ref={scrollRef} 
          onScroll={(e)=>{ const el=e.target; const pct=(el.scrollTop/(el.scrollHeight-el.clientHeight))*100; const bar=document.getElementById("dh-progress-bar"); if(bar) bar.style.width=`${pct}%`; }}
          style={{ flex:1, overflowY:"auto", padding:`140px ${Math.max(6,14-(fontSize/8))}vw 200px`, scrollbarWidth:"none", position:"relative", zIndex:3 }}>
          {liveData?.hook_statement && (
            <div style={{ marginBottom:64, padding:"28px 36px", background:"linear-gradient(135deg, rgba(255,68,102,0.08), rgba(255,68,102,0.02))", border:"1px solid rgba(255,68,102,0.15)", borderRadius:20, backdropFilter:"blur(10px)", boxShadow:"0 8px 32px rgba(255,68,102,0.08)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:"#ff4466", boxShadow:"0 0 12px #ff4466" }} />
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:11, letterSpacing:"0.15em", color:"rgba(255,68,102,0.85)", textTransform:"uppercase", fontWeight:700 }}>Say This First</div>
              </div>
              <div style={{ fontFamily:"'Inter','DM Sans',sans-serif", fontSize:fontSize, color:"rgba(255,255,255,0.96)", lineHeight:1.5, fontWeight:500, letterSpacing:"-0.015em" }}>{liveData.hook_statement}</div>
            </div>
          )}
          {sections.map((sec,i)=>(
            <div key={sec.id||i} style={{ marginBottom:80 }}>
              {/* Section header — modern gradient pill */}
              <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:32 }}>
                <div style={{ height:1, flex:1, background:`linear-gradient(90deg, transparent, ${GOLD_GLOW})` }}/>
                <div style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 20px", background:"linear-gradient(135deg, rgba(212,175,106,0.12), rgba(212,175,106,0.04))", border:`1px solid ${GOLD_GLOW}`, borderRadius:999, boxShadow:`0 4px 24px rgba(212,175,106,0.1)` }}>
                  <span style={{ width:5, height:5, borderRadius:"50%", background:GOLD, boxShadow:`0 0 8px ${GOLD}` }} />
                  <span style={{ fontFamily:"'Inter',sans-serif", fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase", color:GOLD, fontWeight:700 }}>{sec.label}</span>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"rgba(212,175,106,0.6)", fontWeight:500 }}>~{sec.duration_min}m</span>
                </div>
                <div style={{ height:1, flex:1, background:`linear-gradient(90deg, ${GOLD_GLOW}, transparent)` }}/>
              </div>
              {sec.cue && <div style={{ fontFamily:"'Inter',sans-serif", fontSize:11, letterSpacing:"0.1em", color:"rgba(212,175,106,0.55)", textTransform:"uppercase", marginBottom:24, fontWeight:600, paddingLeft:4 }}>◦ {sec.cue}</div>}
              <div style={{ fontFamily:"'Inter','DM Sans',sans-serif", fontSize:fontSize, color:"rgba(255,255,255,0.94)", lineHeight:1.62, whiteSpace:"pre-wrap", letterSpacing:"-0.011em", fontWeight:400 }}>{sec.script}</div>
              {sec.engagement_prompt && (
                <div style={{ margin:"40px 0", padding:"22px 28px", background:"linear-gradient(135deg, rgba(122,143,200,0.1), rgba(122,143,200,0.02))", border:"1px solid rgba(122,143,200,0.18)", borderRadius:16, backdropFilter:"blur(10px)" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                    <span style={{ width:5, height:5, borderRadius:"50%", background:"#8aa0d4" }} />
                    <div style={{ fontFamily:"'Inter',sans-serif", fontSize:10, letterSpacing:"0.15em", color:"rgba(138,160,212,0.9)", textTransform:"uppercase", fontWeight:700 }}>Ask the Room</div>
                  </div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:fontSize*0.72, color:"rgba(255,255,255,0.88)", lineHeight:1.5, fontWeight:500, letterSpacing:"-0.01em" }}>{sec.engagement_prompt}</div>
                </div>
              )}
              {sec.reminder && (
                <div style={{ margin:"20px 0", padding:"14px 22px", background:"rgba(212,175,106,0.04)", border:"1px solid rgba(212,175,106,0.12)", borderRadius:12, borderLeft:`3px solid ${GOLD_GLOW}` }}>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:fontSize*0.55, color:"rgba(212,175,106,0.75)", lineHeight:1.5, fontWeight:500, fontStyle:"italic" }}>{sec.reminder}</div>
                </div>
              )}
            </div>
          ))}
          {liveData?.product_mention && (
            <div style={{ marginBottom:64, padding:"28px 36px", background:"linear-gradient(135deg, rgba(212,175,106,0.1), rgba(212,175,106,0.02))", border:`1px solid ${GOLD_GLOW}`, borderRadius:20, backdropFilter:"blur(10px)", boxShadow:`0 8px 32px rgba(212,175,106,0.08)` }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:GOLD, boxShadow:`0 0 12px ${GOLD}` }} />
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:11, letterSpacing:"0.15em", color:GOLD, textTransform:"uppercase", fontWeight:700 }}>Product Mention</div>
              </div>
              <div style={{ fontFamily:"'Inter','DM Sans',sans-serif", fontSize:fontSize, color:"rgba(255,255,255,0.94)", lineHeight:1.62, fontWeight:400, letterSpacing:"-0.011em" }}>{liveData.product_mention}</div>
            </div>
          )}
          {liveData?.closing_script && (
            <div style={{ marginBottom:64, padding:"28px 36px", background:"linear-gradient(135deg, rgba(255,68,102,0.08), rgba(255,68,102,0.02))", border:"1px solid rgba(255,68,102,0.15)", borderRadius:20, backdropFilter:"blur(10px)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:"#ff4466", boxShadow:"0 0 12px #ff4466" }} />
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:11, letterSpacing:"0.15em", color:"rgba(255,68,102,0.85)", textTransform:"uppercase", fontWeight:700 }}>Closing</div>
              </div>
              <div style={{ fontFamily:"'Inter','DM Sans',sans-serif", fontSize:fontSize, color:"rgba(255,255,255,0.94)", lineHeight:1.62, whiteSpace:"pre-wrap", fontWeight:400, letterSpacing:"-0.011em" }}>{liveData.closing_script}</div>
            </div>
          )}
          <div style={{height:"70vh"}}/>
        </div>

        {/* Bottom fade gradient */}
        <div style={{ position:"absolute", bottom:dimUI?0:80, left:0, right:0, height:140, background:"linear-gradient(0deg, rgba(0,0,0,0.95) 0%, transparent 100%)", pointerEvents:"none", zIndex:5 }} />

        {/* Nervous card overlay */}
        {showNervous && liveData?.if_nervous_card && (
          <div style={{ position:"fixed", inset:0, zIndex:1002, background:"rgba(5,5,7,0.92)", backdropFilter:"blur(40px)", WebkitBackdropFilter:"blur(40px)", display:"flex", alignItems:"center", justifyContent:"center", padding:40 }}>
            <div style={{ maxWidth:640, textAlign:"center", animation:"riseIn 0.5s ease" }}>
              <div style={{ width:48, height:48, borderRadius:"50%", background:`linear-gradient(135deg, ${GOLD_GLOW}, transparent)`, border:`1px solid ${GOLD_GLOW}`, margin:"0 auto 28px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, color:GOLD }}>✦</div>
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(212,175,106,0.7)", marginBottom:24, fontWeight:600 }}>You're okay. Keep going.</div>
              <div style={{ fontFamily:"'Inter','DM Sans',sans-serif", fontSize:26, color:"rgba(255,255,255,0.96)", lineHeight:1.5, marginBottom:40, fontWeight:500, letterSpacing:"-0.015em" }}>{liveData.if_nervous_card}</div>
              <button onClick={()=>setShowNervous(false)} style={{ padding:"14px 36px", background:`linear-gradient(135deg, rgba(212,175,106,0.15), rgba(212,175,106,0.05))`, border:`1px solid ${GOLD_GLOW}`, borderRadius:999, fontFamily:"'Inter',sans-serif", fontSize:12, letterSpacing:"0.08em", textTransform:"uppercase", color:GOLD, cursor:"pointer", fontWeight:600, boxShadow:`0 4px 24px rgba(212,175,106,0.15)`, transition:"all 0.2s" }}>I'm ready. Back to script.</button>
            </div>
          </div>
        )}

        {/* Bottom glassmorphic control bar */}
        {!dimUI && (
          <div style={{ padding:"16px 32px", background:"rgba(10,10,15,0.7)", backdropFilter:"blur(20px) saturate(180%)", WebkitBackdropFilter:"blur(20px) saturate(180%)", borderTop:"1px solid rgba(255,255,255,0.06)", display:"flex", gap:14, alignItems:"center", flexShrink:0, flexWrap:"wrap", zIndex:12, position:"relative" }}>
            {/* Main play button */}
            <button onClick={()=>scrolling?stopScroll():startScroll()}
              style={{ padding:"10px 28px", background:scrolling?"linear-gradient(135deg, rgba(255,68,102,0.2), rgba(255,68,102,0.08))":`linear-gradient(135deg, ${GOLD}, #b88f48)`, border:`1px solid ${scrolling?"rgba(255,68,102,0.4)":GOLD}`, borderRadius:999, fontFamily:"'Inter',sans-serif", fontSize:12, letterSpacing:"0.08em", textTransform:"uppercase", color:scrolling?"#ff7788":"#1a1410", cursor:"pointer", fontWeight:700, boxShadow:scrolling?"0 0 24px rgba(255,68,102,0.3)":"0 4px 24px rgba(212,175,106,0.4)", transition:"all 0.25s", display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:14 }}>{scrolling?"⏸":"▶"}</span>
              <span>{scrolling?"Pause":"Play"}</span>
            </button>
            <button onClick={resetScroll} style={{ padding:"10px 18px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:999, fontFamily:"'Inter',sans-serif", fontSize:11, letterSpacing:"0.05em", color:"rgba(255,255,255,0.6)", cursor:"pointer", fontWeight:600, transition:"all 0.2s" }}>↑ Reset</button>
            <div style={{ width:1, height:24, background:"rgba(255,255,255,0.08)" }} />
            {/* Keyboard shortcuts — modern chips */}
            {[["Space","Play"],["↑↓","Speed"],["D","Dim"],["N","Calm"],["T","Timer"],["Esc","Exit"]].map(([k,d])=>(
              <div key={k} style={{ display:"flex", gap:6, alignItems:"center" }}>
                <kbd style={{ padding:"3px 8px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:6, fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.55)", fontWeight:600 }}>{k}</kbd>
                <span style={{ fontFamily:"'Inter',sans-serif", fontSize:10, color:"rgba(255,255,255,0.35)", fontWeight:500 }}>{d}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── CUE CARD VIEW ──
  if(view==="cuecard" && selScript){
    const sections = liveData?.sections||[];
    const activeSection = sections[activeSectionIdx];
    const totalSections = sections.length;

    return (
      <div style={{ position:"fixed", inset:0, background:"#100a08", zIndex:999, display:"flex", flexDirection:"column" }}>
        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 24px", background:"rgba(0,0,0,0.4)", borderBottom:"1px solid rgba(255,255,255,0.05)", flexShrink:0, flexWrap:"wrap" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:8,height:8,borderRadius:"50%",background:"#ff3355"}}/>
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"rgba(255,255,255,0.62)", fontWeight:600 }}>{selScript.title}</span>
          </div>
          <div style={{ marginLeft:"auto", display:"flex", gap:10, alignItems:"center" }}>
            <button onClick={timerRunning?stopTimer:startTimer}
              style={{ padding:"5px 14px", background:timerRunning?"rgba(255,45,85,0.15)":"rgba(255,255,255,0.06)", border:`1px solid ${timerRunning?"rgba(255,45,85,0.3)":"rgba(255,255,255,0.1)"}`, borderRadius:6, color:timerRunning?"#ff7788":"rgba(255,255,255,0.5)", fontFamily:"monospace", fontSize:15, cursor:"pointer", letterSpacing:2 }}>
              {fmtTime(elapsed)} {timerRunning?"⏸":"▶"}
            </button>
            <button onClick={()=>{ stopScroll(); stopTimer(); setView("teleprompter"); }}
              style={{ padding:"7px 18px", background:"rgba(196,168,154,0.1)", border:"1px solid rgba(196,168,154,0.2)", borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, textTransform:"uppercase", color:"rgba(196,168,154,0.8)", cursor:"pointer" }}>
              ▤ Teleprompter
            </button>
            <button onClick={()=>setShowNervous(v=>!v)} style={{ padding:"7px 12px", background:"rgba(196,168,154,0.06)", border:"1px solid rgba(196,168,154,0.12)", borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:9, color:"rgba(196,168,154,0.55)", cursor:"pointer" }}>✦</button>
            <button onClick={()=>{ stopScroll(); stopTimer(); setView("home"); }} style={{ padding:"7px 14px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:999, color:"rgba(255,255,255,0.25)", fontSize:10, cursor:"pointer" }}>✕ Exit</button>
          </div>
        </div>

        {/* Section progress pills */}
        <div style={{ display:"flex", gap:6, padding:"10px 24px", background:"rgba(0,0,0,0.2)", overflowX:"auto", flexShrink:0 }}>
          {sections.map((sec,i)=>(
            <button key={i} onClick={()=>setActiveSectionIdx(i)}
              style={{ padding:"5px 14px", borderRadius:999, border:`1px solid ${i===activeSectionIdx?"rgba(196,168,154,0.4)":"rgba(255,255,255,0.06)"}`, background:i===activeSectionIdx?"rgba(196,168,154,0.12)":"transparent", fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:i===activeSectionIdx?"rgba(196,168,154,0.9)":i<activeSectionIdx?"rgba(100,170,100,0.5)":"rgba(255,255,255,0.25)", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0, transition:"all 0.15s" }}>
              {i<activeSectionIdx?"✓ ":""}{sec.label}
            </button>
          ))}
        </div>

        {/* Active cue card */}
        <div style={{ flex:1, overflowY:"auto", padding:"28px 32px" }}>
          {activeSection ? (
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20, flexWrap:"wrap" }}>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:3, textTransform:"uppercase", color:"rgba(196,168,154,0.5)" }}>Section {activeSectionIdx+1} of {totalSections}</div>
                <div style={{ padding:"4px 12px", background:"rgba(196,168,154,0.08)", border:"1px solid rgba(196,168,154,0.15)", borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, textTransform:"uppercase", color:"rgba(196,168,154,0.7)" }}>{activeSection.label}</div>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, color:"rgba(255,255,255,0.2)", textTransform:"uppercase" }}>~{activeSection.duration_min} min</div>
              </div>
              {activeSection.cue && (
                <div style={{ marginBottom:18, fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:"rgba(196,168,154,0.4)" }}>◦ {activeSection.cue}</div>
              )}
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:20, color:"rgba(255,255,255,0.9)", lineHeight:1.58, whiteSpace:"pre-wrap", marginBottom:28, fontWeight:400 }}>{activeSection.script}</div>

              {/* Laptop / screen-demo instructions in cue card */}
              {(activeSection.laptop_show?.length > 0 || activeSection.laptop_when || activeSection.laptop_hide || activeSection.laptop_refer) && (
                <div style={{ padding:"16px 20px", background:"rgba(60,100,140,0.1)", border:"1px solid rgba(60,100,140,0.2)", borderRadius:10, marginBottom:14 }}>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:3, textTransform:"uppercase", color:"rgba(100,170,220,0.8)", marginBottom:12 }}>💻 Laptop / Screen Demo</div>
                  {activeSection.laptop_show?.length > 0 && (
                    <div style={{ marginBottom:10 }}>
                      <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, textTransform:"uppercase", color:"rgba(100,170,220,0.5)", marginBottom:6 }}>Slide / Action Cue:</div>
                      {activeSection.laptop_show.map((item,wi) => (
                        <div key={wi} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:16, color:"rgba(255,255,255,0.85)", padding:"4px 0", fontWeight:500 }}>{item}</div>
                      ))}
                    </div>
                  )}
                  {activeSection.laptop_when && (
                    <div style={{ marginBottom:6, fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(255,255,255,0.6)" }}>
                      <span style={{ color:"rgba(100,170,220,0.7)", fontWeight:500 }}>When: </span>{activeSection.laptop_when}
                    </div>
                  )}
                  {activeSection.laptop_hide && (
                    <div style={{ marginBottom:6, fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(255,255,255,0.6)" }}>
                      <span style={{ color:"rgba(255,140,100,0.7)", fontWeight:500 }}>Cut Back: </span>{activeSection.laptop_hide}
                    </div>
                  )}
                  {activeSection.laptop_refer && (
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(255,255,255,0.6)" }}>
                      <span style={{ color:"rgba(140,200,140,0.7)", fontWeight:500 }}>Refer Back: </span>{activeSection.laptop_refer}
                    </div>
                  )}
                </div>
              )}

              {activeSection.engagement_prompt && (
                <div style={{ padding:"16px 20px", background:"rgba(122,143,166,0.08)", border:"1px solid rgba(122,143,166,0.15)", borderRadius:10, marginBottom:14 }}>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:3, color:"rgba(122,143,166,0.7)", textTransform:"uppercase", marginBottom:8 }}>◎ Ask the room</div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:16, color:"rgba(255,255,255,0.76)", lineHeight:1.55, fontWeight:500 }}>{activeSection.engagement_prompt}</div>
                </div>
              )}
              {activeSection.reminder && (
                <div style={{ padding:"12px 18px", background:"rgba(196,168,154,0.05)", border:"1px solid rgba(196,168,154,0.1)", borderRadius:8 }}>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"rgba(196,168,154,0.6)", lineHeight:1.45 }}>✦ {activeSection.reminder}</div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign:"center", paddingTop:60 }}>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:20, color:"rgba(255,255,255,0.55)", fontWeight:600 }}>You've made it through every section. ✦</div>
              <div style={{ marginTop:16, fontFamily:"'DM Sans',sans-serif", fontSize:16, color:"rgba(255,255,255,0.34)" }}>Go to closing — you've got this.</div>
            </div>
          )}
        </div>

        {/* Engagement bank drawer */}
        {liveData?.engagement_bank?.length>0 && (
          <div style={{ padding:"10px 24px 14px", background:"rgba(0,0,0,0.3)", borderTop:"1px solid rgba(255,255,255,0.04)", flexShrink:0 }}>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:3, textTransform:"uppercase", color:"rgba(122,143,166,0.5)", marginBottom:8 }}>◎ Quick Engagement Drop</div>
            <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4 }}>
              {liveData.engagement_bank.map((q,i)=>(
                <div key={i} style={{ padding:"7px 14px", background:"rgba(122,143,166,0.08)", border:"1px solid rgba(122,143,166,0.12)", borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"rgba(255,255,255,0.5)", whiteSpace:"nowrap", flexShrink:0 }}>{q}</div>
              ))}
            </div>
          </div>
        )}

        {/* Nav: prev / next */}
        <div style={{ display:"flex", gap:10, padding:"12px 24px", background:"rgba(0,0,0,0.4)", borderTop:"1px solid rgba(255,255,255,0.04)", flexShrink:0 }}>
          <button onClick={()=>setActiveSectionIdx(i=>Math.max(0,i-1))} disabled={activeSectionIdx===0}
            style={{ flex:1, padding:"10px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, color:"rgba(255,255,255,0.3)", fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", cursor:activeSectionIdx===0?"not-allowed":"pointer", opacity:activeSectionIdx===0?0.3:1 }}>
            ← Previous
          </button>
          <button onClick={()=>setActiveSectionIdx(i=>Math.min(totalSections-1,i+1))} disabled={activeSectionIdx===totalSections-1}
            style={{ flex:1, padding:"10px", background:activeSectionIdx<totalSections-1?"rgba(196,168,154,0.1)":"rgba(255,255,255,0.03)", border:`1px solid ${activeSectionIdx<totalSections-1?"rgba(196,168,154,0.2)":"rgba(255,255,255,0.06)"}`, borderRadius:10, color:activeSectionIdx<totalSections-1?"rgba(196,168,154,0.8)":"rgba(255,255,255,0.2)", fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", cursor:activeSectionIdx===totalSections-1?"not-allowed":"pointer", opacity:activeSectionIdx===totalSections-1?0.3:1 }}>
            Next Section →
          </button>
        </div>

        {/* Nervous card overlay */}
        {showNervous && liveData?.if_nervous_card && (
          <div style={{ position:"fixed", inset:0, zIndex:1002, background:"rgba(10,6,4,0.97)", display:"flex", alignItems:"center", justifyContent:"center", padding:40 }}>
            <div style={{ maxWidth:600, textAlign:"center" }}>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:4, textTransform:"uppercase", color:"rgba(196,168,154,0.4)", marginBottom:24 }}>✦ You're okay. Keep going.</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:24, color:"rgba(255,255,255,0.9)", lineHeight:1.55, marginBottom:32, fontWeight:500 }}>{liveData.if_nervous_card}</div>
              <button onClick={()=>setShowNervous(false)} style={{ padding:"12px 32px", background:"rgba(196,168,154,0.1)", border:"1px solid rgba(196,168,154,0.25)", borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:3, textTransform:"uppercase", color:"rgba(196,168,154,0.8)", cursor:"pointer" }}>I'm ready. Back to live.</button>
            </div>
          </div>
        )}

        {/* RESET THE LOOP flash */}
        {showLoopFlash && (
          <div onClick={()=>setShowLoopFlash(false)} style={{ position:"fixed", inset:0, zIndex:1003, background:"rgba(255,45,85,0.92)", display:"flex", alignItems:"center", justifyContent:"center", animation:"pulse 0.8s ease infinite", cursor:"pointer" }}>
            <div style={{ textAlign:"center", color:"#fff" }}>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:14, letterSpacing:6, marginBottom:18 }}>⏱ 10 MINUTE MARK</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:64, fontStyle:"italic", marginBottom:14 }}>RESET THE LOOP</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:18, opacity:0.9, maxWidth:560, margin:"0 auto", lineHeight:1.6 }}>Welcome the new joiners. Restate who you are. Repeat the offer + the link. Tap to dismiss.</div>
            </div>
          </div>
        )}

        {/* Live Stats Sidebar */}
        <div style={{ position:"fixed", top:80, right:statsOpen?0:-300, width:300, bottom:120, background:"rgba(10,6,4,0.95)", borderLeft:"1px solid rgba(196,168,154,0.15)", padding:"20px 18px", overflowY:"auto", transition:"right 0.25s ease", zIndex:1001 }}>
          <button onClick={()=>setStatsOpen(o=>!o)} style={{ position:"absolute", left:-36, top:14, width:36, height:36, background:"rgba(196,168,154,0.1)", border:"1px solid rgba(196,168,154,0.2)", borderRight:"none", borderRadius:"8px 0 0 8px", color:"rgba(196,168,154,0.9)", cursor:"pointer", fontSize:14 }}>{statsOpen?"›":"‹"}</button>
          <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:4, textTransform:"uppercase", color:"#c9a84c", marginBottom:18 }}>◈ Live Stats Checklist</div>

          {/* Like goal */}
          <div style={{ marginBottom:20 }}>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, textTransform:"uppercase", color:"rgba(255,255,255,0.5)", marginBottom:6 }}>Like / Share Goal</div>
            <div style={{ display:"flex", gap:6, alignItems:"center", marginBottom:8 }}>
              <input type="number" value={currentLikes} onChange={e=>setCurrentLikes(+e.target.value||0)} style={{ flex:1, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:6, padding:"6px 10px", color:"#fff", fontFamily:"'DM Sans',sans-serif", fontSize:13 }}/>
              <span style={{ color:"rgba(255,255,255,0.4)" }}>/</span>
              <input type="number" value={likeGoal} onChange={e=>setLikeGoal(+e.target.value||0)} style={{ width:80, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:6, padding:"6px 10px", color:"#fff", fontFamily:"'DM Sans',sans-serif", fontSize:13 }}/>
            </div>
            <div style={{ height:6, background:"rgba(255,255,255,0.06)", borderRadius:999, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${Math.min(100,(currentLikes/Math.max(1,likeGoal))*100)}%`, background:"linear-gradient(90deg,#e8a4b8,#c9a84c)", transition:"width 0.3s" }}/>
            </div>
          </div>

          {/* Viewer count */}
          <div style={{ marginBottom:20 }}>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, textTransform:"uppercase", color:"rgba(255,255,255,0.5)", marginBottom:6 }}>Current Viewers</div>
            <div style={{ display:"flex", gap:6, alignItems:"center" }}>
              <button onClick={()=>setViewerCount(v=>Math.max(0,v-10))} style={{ width:28, height:28, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:6, color:"#fff", cursor:"pointer" }}>−</button>
              <input type="number" value={viewerCount} onChange={e=>setViewerCount(+e.target.value||0)} style={{ flex:1, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:6, padding:"6px 10px", color:"#fff", fontFamily:"'DM Sans',sans-serif", fontSize:18, textAlign:"center", fontWeight:600 }}/>
              <button onClick={()=>setViewerCount(v=>v+10)} style={{ width:28, height:28, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:6, color:"#fff", cursor:"pointer" }}>+</button>
            </div>
          </div>

          {/* Got Mine log */}
          <div>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, textTransform:"uppercase", color:"rgba(255,255,255,0.5)", marginBottom:6 }}>★ Got Mine Shoutouts ({gotMineLog.length})</div>
            <form onSubmit={(e)=>{ e.preventDefault(); if(newGotMine.trim()){ setGotMineLog(l=>[{name:newGotMine.trim(),at:Date.now()},...l]); setNewGotMine(""); } }} style={{ display:"flex", gap:6, marginBottom:10 }}>
              <input value={newGotMine} onChange={e=>setNewGotMine(e.target.value)} placeholder="@username" style={{ flex:1, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:6, padding:"6px 10px", color:"#fff", fontFamily:"'DM Sans',sans-serif", fontSize:12 }}/>
              <button type="submit" style={{ padding:"6px 12px", background:"rgba(201,168,76,0.15)", border:"1px solid rgba(201,168,76,0.3)", borderRadius:6, color:"#c9a84c", cursor:"pointer", fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase" }}>+ Add</button>
            </form>
            <div style={{ display:"flex", flexDirection:"column", gap:6, maxHeight:240, overflowY:"auto" }}>
              {gotMineLog.length===0 && <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:13, fontStyle:"italic", color:"rgba(255,255,255,0.3)" }}>Drop @usernames here as people say "Got Mine"</div>}
              {gotMineLog.map((g,i)=>(
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 10px", background:"rgba(201,168,76,0.06)", border:"1px solid rgba(201,168,76,0.12)", borderRadius:6 }}>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#fff" }}>{g.name}</span>
                  <button onClick={()=>setGotMineLog(l=>l.filter((_,j)=>j!==i))} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.3)", cursor:"pointer", fontSize:14, lineHeight:1 }}>×</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── HOME VIEW ──
  return (
    <Page title="Live Studio" sub="Full live control room — script, cue cards, teleprompter, everything">
      <div style={{ display:"flex", gap:8, marginBottom:22 }}>
        {[{id:"home",label:"⏺ My Lives"},{id:"build",label:"✦ Build New Live"}].map(t=>(
          <button key={t.id} onClick={()=>setView(t.id)}
            style={{ padding:"8px 18px", border:`1px solid ${view===t.id?"rgba(255,45,85,0.4)":T.border}`, borderRadius:999, background:view===t.id?"rgba(255,45,85,0.07)":"transparent", fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:view===t.id?"#ff2d55":T.light, cursor:"pointer" }}>
            {t.label}
          </button>
        ))}
      </div>

      {view==="build" && (
        <LiveScriptBuilder brands={brands} scripts={scripts} setScripts={setScripts} onGoLive={openLive} />
      )}

      {view==="home" && (<>
        {liveScripts.length===0 ? (
          <Card style={{ padding:"56px", textAlign:"center" }}>
            <div style={{ fontSize:32, marginBottom:16 }}>⏺</div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19, color:T.light, fontStyle:"italic", marginBottom:8 }}>No live scripts yet.</div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.light, marginBottom:24 }}>Build your first live — every section, every word, every cue card. You'll never freeze again.</div>
            <Btn onClick={()=>setView("build")}>✦ Build My First Live</Btn>
          </Card>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:16 }}>
            {[...liveScripts].sort((a,b)=>{
              const aS = isStarred(a.id)?1:0, bS = isStarred(b.id)?1:0;
              return bS - aS;
            }).map(s=>{
              const sections = s.liveData?.sections||[];
              return (
                <Card key={s.id} style={{ padding:"24px", borderTop:"2px solid rgba(255,45,85,0.3)", position:"relative" }}>
                  <button
                    onClick={(e)=>{ e.stopPropagation(); toggleStar(s.id); }}
                    title={isStarred(s.id)?"Unpin from dashboard":"Pin to dashboard"}
                    style={{ position:"absolute", top:8, right:40, width:24, height:24, display:"flex", alignItems:"center", justifyContent:"center", background:"transparent", border:`1px solid ${isStarred(s.id)?"#c9a84c":T.border}`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:12, color:isStarred(s.id)?"#c9a84c":T.light, cursor:"pointer", lineHeight:1 }}
                  >★</button>
                  <button
                    onClick={(e)=>{ e.stopPropagation(); if(confirm(`Delete "${s.title}"? This can't be undone.`)){ setScripts(prev=>prev.filter(x=>x.id!==s.id)); if(sel===s.id) setSel(null); } }}
                    title="Delete live script"
                    style={{ position:"absolute", top:8, right:8, width:24, height:24, display:"flex", alignItems:"center", justifyContent:"center", background:"transparent", border:`1px solid ${T.border}`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:12, color:T.light, cursor:"pointer", lineHeight:1 }}
                  >×</button>
                  <div style={{ display:"flex", gap:6, marginBottom:10, flexWrap:"wrap" }}>
                    <span style={{ padding:"2px 8px", background:"rgba(255,45,85,0.08)", border:"1px solid rgba(255,45,85,0.18)", borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, color:"#cc3355" }}>⏺ LIVE</span>
                    {isStarred(s.id) && <span style={{ padding:"2px 8px", background:"rgba(201,168,76,0.1)", border:"1px solid rgba(201,168,76,0.3)", borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, color:"#c9a84c" }}>★ STARRED</span>}
                    {sections.length>0 && <span style={{ padding:"2px 8px", background:`${T.p3}10`, border:`1px solid ${T.border}`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:T.light }}>{sections.length} sections</span>}
                  </div>
                  <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:17, color:T.ink, fontStyle:"italic", marginBottom:6 }}>{s.title}</div>
                  {s.liveData?.hook_statement && (
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:13, color:T.p4, fontStyle:"italic", marginBottom:14, lineHeight:1.6 }}>"{s.liveData.hook_statement.substring(0,90)}..."</div>
                  )}
                  {sections.length>0 && (
                    <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:16 }}>
                      {sections.map((sec,i)=>(
                        <span key={i} style={{ padding:"2px 8px", background:`rgba(0,0,0,0.03)`, border:`1px solid ${T.border}`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:1, textTransform:"uppercase", color:T.light }}>{sec.label}</span>
                      ))}
                    </div>
                  )}
                  <div style={{ display:"flex", gap:8 }}>
                    <Btn onClick={()=>openLive(s.id)} style={{flex:1}}>⏺ Go Live</Btn>
                    <button onClick={()=>{ setSel(s.id); setView("teleprompter"); }}
                      style={{ padding:"9px 14px", background:"transparent", border:`1px solid ${T.border}`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, textTransform:"uppercase", color:T.light, cursor:"pointer" }}>▤</button>
                  </div>
                </Card>
              );
            })}
            <Card onClick={()=>setView("build")} style={{ padding:"24px", border:`2px dashed ${T.border}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:180, cursor:"pointer" }} hover>
              <div style={{ fontSize:24, marginBottom:10, opacity:0.4 }}>⏺</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:3, textTransform:"uppercase", color:T.light }}>New Live Script</div>
            </Card>
          </div>
        )}
      </>)}
    </Page>
  );
}

// ─── FINANCE ──────────────────────────────────────────────────────────────────

const MILESTONES = [
  { amount:1,      symbol:"◌", label:"First Dollar",           reward:"Screenshot it. Frame it. This is day one.",           color:"#c8a87a" },
  { amount:5,      symbol:"◍", label:"$5 Club",                reward:"Treat yourself to a fancy coffee — you earned it.",    color:"#c8a87a" },
  { amount:10,     symbol:"◎", label:"First $10",              reward:"Get a new journal to write your vision in.",           color:"#c8a87a" },
  { amount:25,     symbol:"○", label:"$25 Milestone",          reward:"Buy yourself a beautiful candle or bath treat.",       color:"#c4a89a" },
  { amount:50,     symbol:"◈", label:"$50 Club",               reward:"Get your nails done. You're building something real.", color:"#c4a89a" },
  { amount:100,    symbol:"◇", label:"First $100",             reward:"New outfit piece that makes you feel like a CEO.",     color:"#b8916a" },
  { amount:250,    symbol:"◆", label:"$250 Milestone",         reward:"Dinner out at a restaurant you love, just you.",       color:"#b8916a" },
  { amount:500,    symbol:"▲", label:"$500 Club",              reward:"Invest in a course or tool that levels you up.",       color:"#a88558" },
  { amount:1000,   symbol:"△", label:"$1,000 — First K",       reward:"Book a spa day. You just made your first thousand.",   color:"#9c7b6e" },
  { amount:5000,   symbol:"✦", label:"$5,000 — Lift Off",      reward:"Weekend trip somewhere you've wanted to go.",          color:"#7a8fa6" },
  { amount:10000,  symbol:"✧", label:"$10,000 — Five Figures", reward:"Hire your first help — VA, editor, anything.",         color:"#7a6a9a" },
  { amount:100000, symbol:"◉", label:"$100,000 — The Dream",   reward:"Pick one big thing you've always wanted. Buy it.",     color:"#b87040" },
  { amount:1000000,symbol:"⊕", label:"$1,000,000 — The Vision",reward:"You already know. You planned this from the start.",   color:"#c4a040" },
];

function MilestoneLadder({ totalRevenue, rewardsClaimed, setRewardsClaimed }) {
  const T = useTheme();
  const [celebratingIdx, setCelebratingIdx] = useState(null);

  function claimReward(idx) {
    setRewardsClaimed(r => { const next = {...r, [idx]: true }; return next; });
    setCelebratingIdx(idx);
    setTimeout(() => setCelebratingIdx(null), 2800);
  }

  const nextIdx = MILESTONES.findIndex(m => totalRevenue < m.amount);
  const currentMilestone = nextIdx === -1 ? MILESTONES[MILESTONES.length-1] : MILESTONES[Math.max(0, nextIdx-1)];
  const nextMilestone = nextIdx === -1 ? null : MILESTONES[nextIdx];
  const pct = nextMilestone ? Math.min(100, (totalRevenue / nextMilestone.amount) * 100) : 100;

  return (
    <Card style={{ padding:"28px", marginBottom:16 }}>
      {/* Header + next goal bar */}
      <div style={{ marginBottom:22 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
          <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:18, color:T.ink, fontStyle:"italic" }}>Your Money Journey</div>
          {nextMilestone && (
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:3, textTransform:"uppercase", color:T.p4 }}>
              Next: {nextMilestone.symbol} {nextMilestone.label}
            </div>
          )}
        </div>
        {nextMilestone ? (
          <>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.mid }}>${totalRevenue.toLocaleString()} earned</span>
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.light }}>${(nextMilestone.amount - totalRevenue).toLocaleString()} to go</span>
            </div>
            <div style={{ height:8, background:`rgba(0,0,0,0.06)`, borderRadius:999, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg, ${T.p3}, ${T.p4})`, borderRadius:999, transition:"width 1s ease" }} />
            </div>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, color:T.light, marginTop:5, textTransform:"uppercase" }}>{pct.toFixed(1)}% of the way to {nextMilestone.symbol} {nextMilestone.label}</div>
          </>
        ) : (
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:T.p4, fontStyle:"italic" }}>✦ You've hit every milestone. You are the vision.</div>
        )}
      </div>

      <Divider />
      <Label>All Milestones</Label>

      <div style={{ display:"flex", flexDirection:"column", gap:8, marginTop:10 }}>
        {MILESTONES.map((m, idx) => {
          const hit = totalRevenue >= m.amount;
          const isCurrent = nextIdx !== -1 && idx === nextIdx;
          const claimed = rewardsClaimed?.[idx];
          const celebrating = celebratingIdx === idx;
          return (
            <div key={idx} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", borderRadius:10, border:`1px solid ${hit ? `${m.color}40` : T.border}`, background: hit ? `${m.color}08` : celebrating ? `${T.p3}10` : "transparent", transition:"all 0.4s", position:"relative", overflow:"hidden" }}>
              {celebrating && (
                <div style={{ position:"absolute", inset:0, background:`linear-gradient(90deg, transparent, ${T.p3}18, transparent)`, animation:"shimmer 1.2s ease forwards", backgroundSize:"200% 100%" }} />
              )}
              {/* Emoji + check */}
              <div style={{ fontSize:18, width:28, textAlign:"center", filter:hit?"none":"grayscale(1) opacity(0.4)", flexShrink:0 }}>{hit ? m.symbol : "○"}</div>
              {/* Info */}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
                  <span style={{ fontFamily:"'Cormorant SC',serif", fontSize:14, color:hit?T.ink:T.light, fontStyle:"italic" }}>{m.label}</span>
                  {isCurrent && <span style={{ padding:"1px 7px", background:`${T.p3}20`, border:`1px solid ${T.p3}50`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:T.p4 }}>Next Up</span>}
                </div>
                {hit && (
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:T.mid, fontStyle:"italic", marginTop:2 }}>✦ {m.reward}</div>
                )}
              </div>
              {/* Amount */}
              <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:15, color:hit?m.color:T.light, fontStyle:"italic", flexShrink:0 }}>${m.amount.toLocaleString()}</div>
              {/* Claim button */}
              {hit && !claimed && (
                <button onClick={()=>claimReward(idx)}
                  style={{ padding:"5px 12px", background:`${m.color}18`, border:`1px solid ${m.color}60`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:m.color, cursor:"pointer", flexShrink:0, whiteSpace:"nowrap" }}>
                  Claim ✓
                </button>
              )}
              {claimed && (
                <span style={{ padding:"5px 12px", background:"rgba(100,170,100,0.1)", border:"1px solid rgba(100,170,100,0.3)", borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:"#5a9a5a", flexShrink:0 }}>Claimed ✓</span>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function Finance({ finances, setFinances }) {
  const T = useTheme();
  const today = new Date();
  const [selMonth, setSelMonth] = useState(`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}`);
  const [expModal, setExpModal] = useState(false);
  const [expForm, setExpForm] = useState({ description:"", amount:"", category:"Tools & Software" });
  const [rewardsClaimed, setRewardsClaimed, _rLoaded] = usePersist("dh_rewards_v1", {});
  const [tab, setTab] = useState("milestones");

  const EXP_CATS = ["Tools & Software","Ads","Design","Equipment","Subscriptions","Education","Other"];

  function getMonthData(m) { return finances.find(f=>f.month===m)||{ month:m, income:0, sales:[], expenses:[], expenseItems:[] }; }

  function addSale() {
    const md = getMonthData(selMonth);
    const newSale = { id:Date.now().toString(), amount:0, source:"Stan Store", date:today.toISOString().split("T")[0], note:"" };
    setFinances(fs => { const existing = fs.find(f=>f.month===selMonth); if(existing){ return fs.map(f=>f.month===selMonth?{...f,sales:[...(f.sales||[]),newSale]}:f); } return [...fs,{...md,sales:[newSale]}]; });
  }

  function updateSale(saleId, field, val) {
    setFinances(fs=>fs.map(f=>{ if(f.month!==selMonth)return f; return {...f, income: field==="amount" ? (f.sales||[]).reduce((s,sale)=>s+(sale.id===saleId?parseFloat(val)||0:parseFloat(sale.amount)||0),0) : f.income, sales:(f.sales||[]).map(s=>s.id===saleId?{...s,[field]:val}:s) }; }));
  }

  function deleteSale(saleId) {
    setFinances(fs=>fs.map(f=>{ if(f.month!==selMonth)return f; const sales=(f.sales||[]).filter(s=>s.id!==saleId); return {...f, income:sales.reduce((s,sale)=>s+(parseFloat(sale.amount)||0),0), sales }; }));
  }

  function addExpense() {
    if(!expForm.description||!expForm.amount)return;
    const item = { id:Date.now().toString(), ...expForm, amount:parseFloat(expForm.amount)||0 };
    setFinances(fs=>{ const existing=fs.find(f=>f.month===selMonth); if(existing){ return fs.map(f=>f.month===selMonth?{...f,expenseItems:[...(f.expenseItems||[]),item],expenses:(f.expenses||0)+(item.amount)}:f); } return [...fs,{...getMonthData(selMonth),expenseItems:[item],expenses:item.amount}]; });
    setExpForm({ description:"", amount:"", category:"Tools & Software" });
    setExpModal(false);
  }

  function deleteExpense(eid) {
    setFinances(fs=>fs.map(f=>{ if(f.month!==selMonth)return f; const items=(f.expenseItems||[]).filter(e=>e.id!==eid); return {...f,expenseItems:items,expenses:items.reduce((s,e)=>s+(e.amount||0),0)}; }));
  }

  const md = getMonthData(selMonth);
  const income = md.income||0;
  const expenses = md.expenses||0;
  const profit = income - expenses;
  const totalRevenue = finances.reduce((s,f)=>s+(f.income||0),0);
  const totalExpenses = finances.reduce((s,f)=>s+(f.expenses||0),0);
  const totalProfit = totalRevenue - totalExpenses;

  // Next milestone info for stat card
  const nextMilestoneIdx = MILESTONES.findIndex(m => totalRevenue < m.amount);
  const nextMilestone = nextMilestoneIdx === -1 ? null : MILESTONES[nextMilestoneIdx];
  const milestonesHit = MILESTONES.filter(m => totalRevenue >= m.amount).length;

  // Build last 6 months for chart
  const last6 = Array.from({length:6}).map((_,i)=>{ const d=new Date(today.getFullYear(),today.getMonth()-5+i,1); const m=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`; const fd=finances.find(f=>f.month===m)||{income:0,expenses:0}; const inc=fd.income||0; const exp=fd.expenses||0; return { label:MONTHS[d.getMonth()], month:m, income:inc, exp, profit:inc-exp }; });
  const maxBar = Math.max(...last6.map(m=>Math.max(m.income,m.exp,Math.abs(m.profit))),1);

  // Build last 12 months for profit overview
  const last12 = Array.from({length:12}).map((_,i)=>{ const d=new Date(today.getFullYear(),today.getMonth()-11+i,1); const m=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`; const fd=finances.find(f=>f.month===m)||{income:0,expenses:0}; const inc=fd.income||0; const exp=fd.expenses||0; return { label:MONTHS[d.getMonth()], fullLabel:`${MONTH_FULL[d.getMonth()]} ${d.getFullYear()}`, month:m, income:inc, exp, profit:inc-exp }; });

  // Month picker
  const months6 = Array.from({length:12}).map((_,i)=>{ const d=new Date(today.getFullYear(),today.getMonth()-11+i,1); return { value:`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`, label:`${MONTH_FULL[d.getMonth()]} ${d.getFullYear()}` }; }).reverse();

  return (
    <Page title="Money Tracker" sub="Sales, expenses, milestones & rewards — your path to $1M">
      {/* Totals */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:12, marginBottom:20 }}>
        <StatCard label="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} sub="all time" color="#6aaa6c" />
        <StatCard label="Total Expenses" value={`$${totalExpenses.toLocaleString()}`} sub="all time" color="#cc7766" />
        <StatCard label="Total Profit" value={`$${totalProfit.toLocaleString()}`} sub="all time" color={T.p4} />
        <StatCard label="Milestones Hit" value={`${milestonesHit} / ${MILESTONES.length}`} sub={nextMilestone ? `Next: ${nextMilestone.symbol} $${nextMilestone.amount.toLocaleString()}` : "All complete ⊕"} color={T.gold} />
      </div>

      {/* Tab nav */}
      <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
        {[{id:"milestones",label:"✦ Milestones & Rewards"},{id:"tracker",label:"◈ Sales & Expenses"},{id:"profit",label:"◆ Monthly Profit"},{id:"chart",label:"↗ 6-Month Chart"}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{ padding:"7px 16px", border:`1px solid ${tab===t.id?T.p3:T.border}`, borderRadius:999, background:tab===t.id?`${T.p3}18`:"transparent", fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:tab===t.id?T.p4:T.light, cursor:"pointer" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── MILESTONES TAB ── */}
      {tab==="milestones" && (
        <MilestoneLadder totalRevenue={totalRevenue} rewardsClaimed={rewardsClaimed} setRewardsClaimed={setRewardsClaimed} />
      )}

      {/* ── TRACKER TAB ── */}
      {tab==="tracker" && (<>
        {/* Month selector */}
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20, flexWrap:"wrap" }}>
          <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:18, color:T.ink, fontStyle:"italic" }}>Viewing:</div>
          <select value={selMonth} onChange={e=>setSelMonth(e.target.value)}
            style={{ padding:"8px 14px", background:T.card, border:`1px solid ${T.border}`, borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.ink, outline:"none", appearance:"none", cursor:"pointer" }}>
            {months6.map(m=><option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
          {/* This month stats + sales */}
          <Card style={{ padding:"24px" }}>
            <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:16, color:T.ink, fontStyle:"italic", marginBottom:16 }}>{months6.find(m=>m.value===selMonth)?.label||selMonth}</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:20 }}>
              {[["Revenue",`$${income.toLocaleString()}`,"#6aaa6c"],["Expenses",`$${expenses.toLocaleString()}`,"#cc7766"],["Profit",`$${profit.toLocaleString()}`,profit>=0?T.p4:"#cc4444"]].map(([l,v,c])=>(
                <div key={l} style={{ textAlign:"center", padding:"12px 8px", background:`rgba(0,0,0,0.02)`, borderRadius:10, border:`1px solid ${T.border}` }}>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:3, textTransform:"uppercase", color:T.light, marginBottom:4 }}>{l}</div>
                  <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:20, color:c, fontStyle:"italic" }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <Label>Sales</Label>
              <Btn small variant="ghost" onClick={addSale}>+ Add Sale</Btn>
            </div>
            {(md.sales||[]).length===0
              ? <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:T.light, fontStyle:"italic", padding:"8px 0" }}>No sales yet this month.</div>
              : (md.sales||[]).map(s=>(
                <div key={s.id} style={{ display:"grid", gridTemplateColumns:"auto 1fr 80px auto", gap:6, alignItems:"center", padding:"6px 0", borderBottom:`1px solid ${T.border}` }}>
                  <input type="date" value={s.date||""} onChange={e=>updateSale(s.id,"date",e.target.value)}
                    style={{ padding:"4px 6px", background:`rgba(0,0,0,0.03)`, border:`1px solid ${T.border}`, borderRadius:6, fontFamily:"'DM Sans',sans-serif", fontSize:11, color:T.ink, outline:"none", width:130 }}/>
                  <input type="text" value={s.note||""} onChange={e=>updateSale(s.id,"note",e.target.value)} placeholder="Description (e.g. Blueprint sale)"
                    style={{ padding:"4px 8px", background:`rgba(0,0,0,0.03)`, border:`1px solid ${T.border}`, borderRadius:6, fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.ink, outline:"none" }}/>
                  <input type="number" value={s.amount||""} onChange={e=>updateSale(s.id,"amount",e.target.value)} placeholder="$0"
                    style={{ padding:"4px 8px", background:`rgba(0,0,0,0.03)`, border:`1px solid ${T.border}`, borderRadius:6, fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#5a9a5a", outline:"none", textAlign:"right" }}/>
                  <button onClick={()=>deleteSale(s.id)} style={{ background:"none", border:"none", color:T.light, cursor:"pointer", fontSize:14, padding:"0 4px" }}>✕</button>
                </div>
              ))
            }
          </Card>

          {/* Expenses */}
          <Card style={{ padding:"24px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
              <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:16, color:T.ink, fontStyle:"italic" }}>Expenses</div>
              <Btn small variant="ghost" onClick={()=>setExpModal(true)}>+ Add Expense</Btn>
            </div>
            {(md.expenseItems||[]).length===0
              ? <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:T.light, fontStyle:"italic" }}>No expenses logged.</div>
              : (md.expenseItems||[]).map(e=>(
                <div key={e.id} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 0", borderBottom:`1px solid ${T.border}` }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.ink }}>{e.description}</div>
                    <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, textTransform:"uppercase", color:T.light }}>{e.category}</div>
                  </div>
                  <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:16, color:"#cc7766", fontStyle:"italic" }}>−${(e.amount||0).toLocaleString()}</div>
                  <button onClick={()=>deleteExpense(e.id)} style={{ background:"none", border:"none", color:T.light, cursor:"pointer", fontSize:13 }}>✕</button>
                </div>
              ))
            }
          </Card>
        </div>
      </>)}

      {/* ── PROFIT TAB ── */}
      {tab==="profit" && (
        <Card style={{ padding:"24px" }}>
          <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:16, color:T.ink, fontStyle:"italic", marginBottom:6 }}>Monthly Profit Breakdown</div>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.light, marginBottom:20 }}>Revenue minus expenses for each month</div>

          {/* Profit summary cards */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:10, marginBottom:24 }}>
            {last12.filter(m=>m.income>0||m.exp>0).reverse().map(m=>(
              <div key={m.month} style={{ padding:"14px 12px", background:m.profit>=0?`rgba(106,170,108,0.06)`:`rgba(204,68,68,0.06)`, border:`1px solid ${m.profit>=0?"rgba(106,170,108,0.2)":"rgba(204,68,68,0.2)"}`, borderRadius:12, textAlign:"center" }}>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:3, textTransform:"uppercase", color:T.light, marginBottom:6 }}>{m.fullLabel}</div>
                <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:22, color:m.profit>=0?"#6aaa6c":"#cc4444", fontStyle:"italic", marginBottom:4 }}>
                  {m.profit>=0?"+":"−"}${Math.abs(m.profit).toLocaleString()}
                </div>
                <div style={{ display:"flex", justifyContent:"center", gap:12, marginTop:6 }}>
                  <span style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:1, color:"#6aaa6c" }}>↑ ${m.income.toLocaleString()}</span>
                  <span style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:1, color:"#cc7766" }}>↓ ${m.exp.toLocaleString()}</span>
                </div>
                {m.income>0 && <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:1, color:T.light, marginTop:4 }}>
                  {Math.round((m.profit/m.income)*100)}% margin
                </div>}
              </div>
            ))}
            {last12.filter(m=>m.income>0||m.exp>0).length===0 && (
              <div style={{ gridColumn:"1/-1", fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:T.light, fontStyle:"italic", padding:"20px 0", textAlign:"center" }}>No financial data yet. Add sales & expenses to see your profit breakdown.</div>
            )}
          </div>

          {/* Profit bar chart — last 6 months */}
          <Divider />
          <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:14, color:T.ink, fontStyle:"italic", marginBottom:16 }}>6-Month Profit Trend</div>
          <div style={{ display:"flex", gap:10, alignItems:"center", height:120 }}>
            {last6.map((m,i)=>{
              const maxP = Math.max(...last6.map(x=>Math.abs(x.profit)),1);
              const barH = Math.abs(m.profit)/maxP * 80;
              const isPos = m.profit >= 0;
              return (
                <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                  <div style={{ height:90, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", position:"relative" }}>
                    {m.profit!==0 && <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, color:isPos?"#6aaa6c":"#cc4444", marginBottom:isPos?0:4, marginTop:isPos?4:0, order:isPos?1:-1 }}>
                      {isPos?"+":"−"}${Math.abs(m.profit).toLocaleString()}
                    </div>}
                    <div style={{ width:"70%", height:barH||2, background:isPos?"rgba(106,170,108,0.5)":"rgba(204,100,80,0.5)", borderRadius:4, transition:"height 0.6s ease" }}/>
                  </div>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, color:T.light, textTransform:"uppercase" }}>{m.label}</div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* ── CHART TAB ── */}
      {tab==="chart" && (
        <Card style={{ padding:"24px" }}>
          <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:16, color:T.ink, fontStyle:"italic", marginBottom:20 }}>6-Month Revenue Overview</div>
          <div style={{ display:"flex", gap:10, alignItems:"flex-end", height:140 }}>
            {last6.map((m,i)=>(
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                <div style={{ width:"100%", display:"flex", gap:3, alignItems:"flex-end", height:110 }}>
                  <div style={{ flex:1, background:`${T.p3}60`, borderRadius:"4px 4px 0 0", height:`${(m.income/maxBar)*110}px`, minHeight:m.income>0?4:0, transition:"height 0.6s ease", position:"relative" }}>
                    {m.income>0&&<div style={{ position:"absolute", top:-18, left:"50%", transform:"translateX(-50%)", fontFamily:"'Jost',sans-serif", fontSize:7, color:T.p4, whiteSpace:"nowrap" }}>${m.income.toLocaleString()}</div>}
                  </div>
                  <div style={{ flex:1, background:"rgba(220,100,80,0.35)", borderRadius:"4px 4px 0 0", height:`${(m.exp/maxBar)*110}px`, minHeight:m.exp>0?4:0, transition:"height 0.6s ease" }} />
                </div>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, color:T.light, textTransform:"uppercase" }}>{m.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:16, marginTop:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ width:10, height:10, background:`${T.p3}60`, borderRadius:2 }}/><span style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, color:T.light, textTransform:"uppercase" }}>Revenue</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ width:10, height:10, background:"rgba(220,100,80,0.35)", borderRadius:2 }}/><span style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, color:T.light, textTransform:"uppercase" }}>Expenses</span>
            </div>
          </div>

          {/* Milestone progress line */}
          <Divider />
          <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:14, color:T.ink, fontStyle:"italic", marginBottom:12 }}>Revenue vs. Milestones</div>
          <div style={{ position:"relative", height:24, background:`rgba(0,0,0,0.04)`, borderRadius:999, overflow:"hidden" }}>
            <div style={{ position:"absolute", left:0, top:0, bottom:0, width:`${Math.min(100,(totalRevenue/1000000)*100)}%`, background:`linear-gradient(90deg,${T.p3},${T.p4})`, borderRadius:999, transition:"width 1.2s ease" }}/>
            {MILESTONES.map((m,i)=>{
              const pos = Math.min(99, (m.amount/1000000)*100);
              return <div key={i} style={{ position:"absolute", left:`${pos}%`, top:0, bottom:0, width:1, background:`rgba(255,255,255,0.5)` }} title={m.label}/>;
            })}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:4 }}>
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:1, color:T.light }}>$0</span>
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:1, color:T.p4 }}>${totalRevenue.toLocaleString()} earned</span>
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:1, color:T.light }}>$1M</span>
          </div>
        </Card>
      )}

      <Modal open={expModal} onClose={()=>setExpModal(false)} title="Add Expense">
        <Input label="Description" value={expForm.description} onChange={v=>setExpForm(f=>({...f,description:v}))} placeholder="e.g. Canva subscription" />
        <Input label="Amount ($)" value={expForm.amount} onChange={v=>setExpForm(f=>({...f,amount:v}))} placeholder="0.00" type="number" />
        <Sel label="Category" value={expForm.category} onChange={v=>setExpForm(f=>({...f,category:v}))} options={EXP_CATS} />
        <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:8 }}>
          <Btn variant="ghost" onClick={()=>setExpModal(false)}>Cancel</Btn>
          <Btn onClick={addExpense} disabled={!expForm.description||!expForm.amount}>Add Expense</Btn>
        </div>
      </Modal>
    </Page>
  );
}

// ─── GROWTH ───────────────────────────────────────────────────────────────────
const BUFFER_URL = "https://buffer.com";

function GrowthSparkline({ data, color, T }) {
  if (data.length < 2) return <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:T.light, fontStyle:"italic" }}>Log more updates to see trend</div>;
  const vals = data.map(d => d.followers);
  const max = Math.max(...vals);
  const min = Math.min(...vals);
  const range = max - min || 1;
  const W = 180, H = 44;
  const pts = vals.map((v, i) => `${(i/(vals.length-1))*W},${H - ((v-min)/range)*(H-6)+3}`).join(" ");
  const lastDiff = vals[vals.length-1] - vals[vals.length-2];
  return (
    <div>
      <svg width={W} height={H} style={{ display:"block", overflow:"visible" }}>
        <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
        {vals.map((v,i) => (
          <circle key={i} cx={(i/(vals.length-1))*W} cy={H - ((v-min)/range)*(H-6)+3} r="2.5" fill={color} opacity={i===vals.length-1?1:0.4} />
        ))}
      </svg>
      <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:1, color:lastDiff>0?"#6aaa6c":lastDiff<0?"#cc4444":T.light, marginTop:3 }}>
        {lastDiff>0?"+":""}{lastDiff.toLocaleString()} since last update
      </div>
    </div>
  );
}

function Growth({ growth, setGrowth, brands }) {
  const T = useTheme();
  const today = new Date();
  const [modal, setModal] = useState(false);
  const [selBrand, setSelBrand] = useState("all");
  const [form, setForm] = useState({ brand:"dollhouse", platform:"tiktok", date:today.toISOString().split("T")[0], followers:0, views:0, note:"" });

  function save() {
    setGrowth(gs=>[...gs,{...form,id:Date.now().toString(),followers:parseInt(form.followers)||0,views:parseInt(form.views)||0}]);
    setModal(false);
    setForm(f=>({...f,followers:0,views:0,note:""}));
  }
  function del(id){ setGrowth(gs=>gs.filter(g=>g.id!==id)); }

  function latestFollowers(brandId, platform) {
    const entries = growth.filter(g=>g.brand===brandId&&g.platform===platform).sort((a,b)=>b.date.localeCompare(a.date));
    return entries[0]?.followers||0;
  }
  function growthHistory(brandId, platform) {
    return growth.filter(g=>g.brand===brandId&&g.platform===platform).sort((a,b)=>a.date.localeCompare(b.date)).slice(-8);
  }

  const totalFollowers = brands.reduce((s,b)=>s+b.platforms.reduce((ps,p)=>ps+latestFollowers(b.id,p),0),0);
  const filteredBrands = selBrand==="all" ? brands : brands.filter(b=>b.id===selBrand);

  // Weekly gain: followers gained in last 7 days
  function weeklyGain(brandId, platform) {
    const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate()-7);
    const weekAgoStr = weekAgo.toISOString().split("T")[0];
    const sorted = growth.filter(g=>g.brand===brandId&&g.platform===platform).sort((a,b)=>a.date.localeCompare(b.date));
    if (!sorted.length) return 0;
    const latest = sorted[sorted.length-1].followers;
    const beforeWeek = [...sorted].reverse().find(g=>g.date<=weekAgoStr);
    return latest - (beforeWeek?.followers||0);
  }

  const totalWeeklyGain = brands.reduce((s,b)=>s+b.platforms.reduce((ps,p)=>ps+weeklyGain(b.id,p),0),0);

  return (
    <Page title="Social Growth" sub="Track followers across all brands — log manually or after checking Buffer" action={
      <div style={{ display:"flex", gap:8 }}>
        <Btn as="a" href={BUFFER_URL} variant="ghost">↗ Open Buffer</Btn>
        <Btn onClick={()=>setModal(true)}>+ Log Update</Btn>
      </div>
    }>

      {/* Buffer tip */}
      <div style={{ padding:"12px 16px", background:`${T.p3}0d`, border:`1px solid ${T.border}`, borderRadius:10, marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
        <span style={{ fontSize:16 }}>◎</span>
        <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.mid }}>
          <strong>Buffer tip:</strong> After checking your Buffer analytics, log your current follower counts here to track growth over time. Buffer handles scheduling — this tracks the numbers.
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:12, marginBottom:20 }}>
        <StatCard label="Total Followers" value={totalFollowers.toLocaleString()} sub="across all brands" />
        <StatCard label="Weekly Gain" value={totalWeeklyGain>0?`+${totalWeeklyGain.toLocaleString()}`:totalWeeklyGain.toLocaleString()} sub="last 7 days" color={totalWeeklyGain>0?"#6aaa6c":T.p4} />
        <StatCard label="Brands Tracked" value={brands.length} sub={`${brands.flatMap(b=>b.platforms).length} accounts total`} />
        <StatCard label="Updates Logged" value={growth.length} sub="all time entries" />
      </div>

      {/* Brand filter */}
      <div style={{ display:"flex", gap:8, marginBottom:18, flexWrap:"wrap" }}>
        {[{id:"all",name:"All Brands"},...brands].map(b=>(
          <button key={b.id} onClick={()=>setSelBrand(b.id)}
            style={{ padding:"5px 14px", border:`1px solid ${selBrand===b.id?T.p3:T.border}`, borderRadius:999, background:selBrand===b.id?`${T.p3}18`:"transparent", fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:selBrand===b.id?T.p4:T.light, cursor:"pointer" }}>
            {b.name}
          </button>
        ))}
      </div>

      {/* Per brand breakdown */}
      {filteredBrands.map(b=>(
        <Card key={b.id} style={{ padding:"22px", marginBottom:14, borderTop:`2px solid ${b.color}` }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:8 }}>
            <div>
              <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:17, color:T.ink, fontStyle:"italic" }}>{b.name}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, textTransform:"uppercase", color:T.light }}>{b.handle} · {b.type}</div>
            </div>
            {b.type==="faceless" && (
              <span style={{ padding:"3px 10px", background:`rgba(0,0,0,0.03)`, border:`1px solid ${T.border}`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:T.light }}>
                ◫ Buffer Scheduled
              </span>
            )}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:12 }}>
            {b.platforms.map(p=>{
              const count = latestFollowers(b.id,p);
              const history = growthHistory(b.id,p);
              const wGain = weeklyGain(b.id,p);
              return (
                <div key={p} style={{ padding:"14px 16px", background:`rgba(0,0,0,0.02)`, border:`1px solid ${T.border}`, borderRadius:10 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
                    <span style={{ color:PLATFORM_COLORS[p], fontSize:16 }}>{PLATFORM_ICONS[p]}</span>
                    <span style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, textTransform:"uppercase", color:T.light }}>{p}</span>
                    {wGain!==0&&<span style={{ marginLeft:"auto", fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:1, color:wGain>0?"#6aaa6c":"#cc4444" }}>{wGain>0?"+":""}{wGain.toLocaleString()} this week</span>}
                  </div>
                  <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:28, color:T.ink, fontStyle:"italic", marginBottom:10 }}>{count.toLocaleString()}</div>
                  <GrowthSparkline data={history} color={b.color} T={T} />
                </div>
              );
            })}
          </div>
        </Card>
      ))}

      {/* Recent log */}
      {growth.length>0&&(
        <Card style={{ padding:"22px" }}>
          <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:16, color:T.ink, fontStyle:"italic", marginBottom:14 }}>Recent Updates</div>
          {[...growth].reverse().slice(0,15).map(g=>(
            <div key={g.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:`1px solid ${T.border}` }}>
              <span style={{ color:PLATFORM_COLORS[g.platform], fontSize:14 }}>{PLATFORM_ICONS[g.platform]}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.ink }}>{brands.find(b=>b.id===g.brand)?.name||g.brand} · {g.platform}</div>
                {g.note&&<div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:T.light }}>{g.note}</div>}
              </div>
              <input type="number" defaultValue={g.followers||0}
                onBlur={e=>{ const v=parseInt(e.target.value)||0; if(v!==g.followers) setGrowth(gs=>gs.map(x=>x.id===g.id?{...x,followers:v}:x)); }}
                style={{ width:80, padding:"3px 6px", background:`rgba(0,0,0,0.03)`, border:`1px solid ${T.border}`, borderRadius:6, fontFamily:"'Cormorant SC',serif", fontSize:14, color:T.p4, outline:"none", textAlign:"right", fontStyle:"italic" }} />
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:1, color:T.light }}>{g.date}</div>
              <button onClick={()=>del(g.id)} style={{ background:"none", border:"none", color:T.light, cursor:"pointer", fontSize:13 }}>✕</button>
            </div>
          ))}
        </Card>
      )}

      {growth.length===0&&(
        <Card style={{ padding:"48px", textAlign:"center" }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, color:T.light, fontStyle:"italic", marginBottom:8 }}>No growth data yet.</div>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.light, marginBottom:20 }}>Log your follower counts for each account after checking Buffer. Even logging once a week builds a clear picture.</div>
          <Btn onClick={()=>setModal(true)}>+ Log First Update</Btn>
        </Card>
      )}

      <Modal open={modal} onClose={()=>setModal(false)} title="Log Follower Update">
        <div style={{ padding:"10px 12px", background:`${T.p3}0d`, border:`1px solid ${T.border}`, borderRadius:8, marginBottom:14 }}>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.mid }}>Open Buffer → Analytics → note follower count → paste it here. Takes 30 seconds.</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <Sel label="Brand" value={form.brand} onChange={v=>setForm(f=>({...f,brand:v}))} options={brands.map(b=>({value:b.id,label:b.name}))} />
          <Sel label="Platform" value={form.platform} onChange={v=>setForm(f=>({...f,platform:v}))} options={Object.keys(PLATFORM_ICONS).map(p=>({value:p,label:p.charAt(0).toUpperCase()+p.slice(1)}))} />
        </div>
        <Input label="Date" value={form.date} onChange={v=>setForm(f=>({...f,date:v}))} type="date" />
        <Input label="Current Followers" value={form.followers} onChange={v=>setForm(f=>({...f,followers:v}))} placeholder="e.g. 1240" type="number" />
        <Input label="Total Views (optional)" value={form.views} onChange={v=>setForm(f=>({...f,views:v}))} placeholder="0" type="number" />
        <Textarea label="Note (optional)" value={form.note} onChange={v=>setForm(f=>({...f,note:v}))} placeholder="e.g. Reel went viral, gained 200 this week" rows={2} />
        <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:8 }}>
          <Btn variant="ghost" onClick={()=>setModal(false)}>Cancel</Btn>
          <Btn onClick={save}>Save Update</Btn>
        </div>
      </Modal>
    </Page>
  );
}

// ─── NOTES ────────────────────────────────────────────────────────────────────
function Notes({ notes, setNotes }) {
  const T = useTheme();
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ title:"", body:"", category:"Ideas", pinned:false });
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const CATS = ["Ideas","Brain Dump","Goals","Strategy","Wins","To-Do","Other"];
  const CAT_COLORS = { Ideas:T.p3, "Brain Dump":T.p4, Goals:"#6aaa6c", Strategy:"#7a8fa6", Wins:"#d4a96a", "To-Do":"#cc7766", Other:T.light };

  function openNew(cat=""){ setEdit(null); setForm({ title:"", body:"", category:cat||"Ideas", pinned:false }); setModal(true); }
  function openEdit(n){ setEdit(n); setForm({...n}); setModal(true); }
  function save(){ if(!form.title.trim())return; if(edit){setNotes(ns=>ns.map(n=>n.id===edit.id?{...form,id:edit.id,updatedAt:Date.now()}:n));}else{setNotes(ns=>[{...form,id:Date.now().toString(),createdAt:Date.now(),updatedAt:Date.now()},...ns]);} setModal(false); }
  function del(id){ setNotes(ns=>ns.filter(n=>n.id!==id)); setModal(false); }
  function togglePin(id){ setNotes(ns=>ns.map(n=>n.id===id?{...n,pinned:!n.pinned}:n)); }

  const q = search.toLowerCase();
  const filtered = notes.filter(n=>(catFilter==="All"||n.category===catFilter)&&(!q||(n.title+n.body).toLowerCase().includes(q)));
  const pinned = filtered.filter(n=>n.pinned);
  const unpinned = filtered.filter(n=>!n.pinned);

  return (
    <Page title="Notes & Ideas" sub="Your brain dump — every thought saved forever" action={<Btn onClick={()=>openNew()}>+ New Note</Btn>}>
      {/* Search bar */}
      <div style={{ display:"flex", gap:10, marginBottom:14, flexWrap:"wrap", alignItems:"center" }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search notes..."
          style={{ flex:1, minWidth:180, padding:"9px 13px", background:`rgba(0,0,0,0.03)`, border:`1px solid ${T.border}`, borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.ink, outline:"none" }} />
        {search && <button onClick={()=>setSearch("")} style={{ background:"none", border:"none", color:T.light, cursor:"pointer", fontSize:14, padding:"0 4px" }}>✕</button>}
      </div>
      {/* Category filter */}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16 }}>
        {["All",...CATS].map(c=>(
          <button key={c} onClick={()=>setCatFilter(c)}
            style={{ padding:"4px 12px", border:`1px solid ${catFilter===c?T.p3:T.border}`, borderRadius:999, background:catFilter===c?`${T.p3}18`:"transparent", fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, textTransform:"uppercase", color:catFilter===c?T.p4:CAT_COLORS[c]||T.light, cursor:"pointer" }}>
            {c}
          </button>
        ))}
      </div>
      {/* Quick new note buttons */}
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:20 }}>
        {CATS.map(cat=>(
          <button key={cat} onClick={()=>openNew(cat)}
            style={{ padding:"5px 14px", border:`1px solid ${T.border}`, borderRadius:999, background:"transparent", fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:CAT_COLORS[cat]||T.light, cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>
            + {cat}
          </button>
        ))}
      </div>

      {notes.length===0&&(
        <Card style={{ padding:"48px", textAlign:"center" }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, color:T.light, fontStyle:"italic", marginBottom:16 }}>No notes yet. Dump your brain here.</div>
          <Btn onClick={()=>openNew()}>+ First Note</Btn>
        </Card>
      )}

      {pinned.length>0&&(
        <>
          <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:4, textTransform:"uppercase", color:T.p4, marginBottom:10 }}>◈ Pinned</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:12, marginBottom:20 }}>
            {pinned.map(n=>(<NoteCard key={n.id} n={n} T={T} CAT_COLORS={CAT_COLORS} onEdit={openEdit} onPin={togglePin}/>))}
          </div>
        </>
      )}

      {unpinned.length>0&&(
        <>
          {pinned.length>0&&<div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:4, textTransform:"uppercase", color:T.light, marginBottom:10 }}>All Notes</div>}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:12 }}>
            {unpinned.map(n=>(<NoteCard key={n.id} n={n} T={T} CAT_COLORS={CAT_COLORS} onEdit={openEdit} onPin={togglePin}/>))}
          </div>
        </>
      )}

      <Modal open={modal} onClose={()=>setModal(false)} title={edit?"Edit Note":"New Note"} width={600}>
        <Input label="Title" value={form.title} onChange={v=>setForm(f=>({...f,title:v}))} placeholder="e.g. Ideas for this week's TikToks" />
        <Sel label="Category" value={form.category} onChange={v=>setForm(f=>({...f,category:v}))} options={CATS} />
        <Textarea label="Note" value={form.body} onChange={v=>setForm(f=>({...f,body:v}))} placeholder="Write anything..." rows={10} />
        <div style={{ display:"flex", gap:8, justifyContent:"space-between", marginTop:8, flexWrap:"wrap" }}>
          <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:T.mid }}>
            <input type="checkbox" checked={form.pinned} onChange={e=>setForm(f=>({...f,pinned:e.target.checked}))} style={{ accentColor:T.p3 }} /> Pin this note
          </label>
          <div style={{ display:"flex", gap:8 }}>
            {edit&&<Btn variant="danger" onClick={()=>del(edit.id)}>Delete</Btn>}
            <Btn variant="ghost" onClick={()=>setModal(false)}>Cancel</Btn>
            <Btn onClick={save} disabled={!form.title.trim()}>Save Note</Btn>
          </div>
        </div>
      </Modal>
    </Page>
  );
}

function NoteCard({ n, T, CAT_COLORS, onEdit, onPin }) {
  return (
    <Card onClick={()=>onEdit(n)} style={{ padding:"18px", position:"relative" }}>
      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
        <span style={{ padding:"2px 8px", background:`${CAT_COLORS[n.category]||T.light}18`, border:`1px solid ${CAT_COLORS[n.category]||T.light}30`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:CAT_COLORS[n.category]||T.light }}>{n.category}</span>
        <button onClick={e=>{e.stopPropagation();onPin(n.id);}} style={{ marginLeft:"auto", background:"none", border:"none", fontSize:12, cursor:"pointer", opacity:n.pinned?1:0.35, padding:"2px" }}>◈</button>
      </div>
      <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:15, color:T.ink, fontStyle:"italic", marginBottom:6 }}>{n.title}</div>
      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.light, lineHeight:1.65, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical" }}>{n.body}</div>
      {n.updatedAt&&<div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:1, color:T.light, marginTop:10, textTransform:"uppercase" }}>{new Date(n.updatedAt).toLocaleDateString()}</div>}
    </Card>
  );
}

// ─── BRANDS ───────────────────────────────────────────────────────────────────
function Brands({ brands, setBrands }) {
  const T = useTheme();
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ name:"", handle:"", color:"#c4a89a", type:"faceless", platforms:[], goal:"" });
  function openNew(){ setEdit(null); setForm({ name:"",handle:"",color:"#c4a89a",type:"faceless",platforms:[],goal:"" }); setModal(true); }
  function openEdit(b){ setEdit(b); setForm({...b}); setModal(true); }
  function save(){ if(!form.name.trim())return; if(edit){setBrands(bs=>bs.map(b=>b.id===edit.id?{...form,id:edit.id}:b));}else{setBrands(bs=>[...bs,{...form,id:Date.now().toString()}]);} setModal(false); }
  function del(id){ setBrands(bs=>bs.filter(b=>b.id!==id)); setModal(false); }
  function togPlat(p){ setForm(f=>({...f,platforms:f.platforms.includes(p)?f.platforms.filter(x=>x!==p):[...f.platforms,p]})); }

  const STRAT = [
    { p:"tiktok", icon:"♪", color:"#ff2d55", s:"Daily. Show your face. Tell why you built this. Demo Niche Finder. CTA: link in bio to Stan Store." },
    { p:"instagram", icon:"◉", color:"#e1306c", s:"Daily Reels (same TikTok) + Stories with polls, questions, link sticker." },
    { p:"threads", icon:"⊕", color:T.p4, s:"3–5x daily. Short takes on brand building, niche, hot opinions. Build community." },
    { p:"youtube", icon:"▶", color:"#ff0000", s:"Weekly. Walkthroughs, deep dives, 'I built this from 0' series." },
    { p:"pinterest", icon:"✦", color:"#e60023", s:"10+ pins/day via scheduler. Niche Finder, tips, aesthetic boards. SEO traffic." },
  ];

  return (
    <Page title="Brands" sub="Manage all your brands and their platform strategies" action={<Btn onClick={openNew}>+ Add Brand</Btn>}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))", gap:18 }}>
        {brands.map(b=>(
          <Card key={b.id} style={{ padding:"24px", borderTop:`2px solid ${b.color}` }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:3 }}>
                  <div style={{ width:9, height:9, borderRadius:"50%", background:b.color }} />
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:3, textTransform:"uppercase", color:T.light }}>{b.type}</div>
                </div>
                <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:18, color:T.ink, fontStyle:"italic" }}>{b.name}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.light }}>{b.handle}</div>
              </div>
              <Btn small variant="ghost" onClick={()=>openEdit(b)}>Edit</Btn>
            </div>
            {b.goal&&<div style={{ padding:"10px 12px", background:`rgba(0,0,0,0.02)`, border:`1px solid ${T.border}`, borderRadius:8, marginBottom:14 }}>
              <Label>Goal</Label>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:T.mid, fontStyle:"italic" }}>{b.goal}</div>
            </div>}
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
              {b.platforms.map(p=><span key={p} style={{ display:"flex", alignItems:"center", gap:4, padding:"4px 10px", background:`rgba(0,0,0,0.02)`, border:`1px solid ${T.border}`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, textTransform:"uppercase", color:T.light }}><span style={{ color:PLATFORM_COLORS[p] }}>{PLATFORM_ICONS[p]}</span>{p}</span>)}
            </div>
            {b.type==="main"&&<div>
              <Label>Platform Strategy</Label>
              {STRAT.map(s=>(
                <div key={s.p} style={{ display:"flex", gap:8, padding:"8px 0", borderBottom:`1px solid ${T.border}` }}>
                  <span style={{ color:s.color, fontSize:14, minWidth:18 }}>{s.icon}</span>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.mid, lineHeight:1.55 }}>{s.s}</div>
                </div>
              ))}
            </div>}
          </Card>
        ))}
      </div>

      <Modal open={modal} onClose={()=>setModal(false)} title={edit?"Edit Brand":"New Brand"}>
        <Input label="Brand Name" value={form.name} onChange={v=>setForm(f=>({...f,name:v}))} placeholder="e.g. The Dollhouse" />
        <Input label="Handle" value={form.handle} onChange={v=>setForm(f=>({...f,handle:v}))} placeholder="@handle" />
        <Sel label="Type" value={form.type} onChange={v=>setForm(f=>({...f,type:v}))} options={["main","faceless","personal"]} />
        <Textarea label="Brand Goal" value={form.goal} onChange={v=>setForm(f=>({...f,goal:v}))} placeholder="What is this brand trying to achieve?" rows={2} />
        <div style={{ marginBottom:14 }}>
          <Label>Platforms</Label>
          <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
            {Object.keys(PLATFORM_ICONS).map(p=>(
              <button key={p} onClick={()=>togPlat(p)}
                style={{ padding:"6px 13px", border:`1px solid ${form.platforms.includes(p)?T.p3:T.border}`, borderRadius:999, background:form.platforms.includes(p)?`${T.p3}18`:"transparent", fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, textTransform:"uppercase", color:form.platforms.includes(p)?T.p4:T.light, cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>
                <span style={{ color:PLATFORM_COLORS[p] }}>{PLATFORM_ICONS[p]}</span>{p}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom:14 }}>
          <Label>Brand Colour</Label>
          <input type="color" value={form.color} onChange={e=>setForm(f=>({...f,color:e.target.value}))}
            style={{ width:"100%", height:40, border:`1px solid ${T.border}`, borderRadius:8, background:"transparent", cursor:"pointer" }} />
        </div>
        <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
          {edit&&edit.id!=="dollhouse"&&<Btn variant="danger" onClick={()=>del(edit.id)}>Delete</Btn>}
          <Btn variant="ghost" onClick={()=>setModal(false)}>Cancel</Btn>
          <Btn onClick={save} disabled={!form.name.trim()}>Save</Btn>
        </div>
      </Modal>
    </Page>
  );
}

// ─── CONTENT INTELLIGENCE ────────────────────────────────────────────────────
const INSIGHT_PLATFORMS = ["tiktok","instagram","threads"];
const INSIGHT_MONTHS_OPTS = MONTH_FULL.map((m,i)=>({ value:String(i), label:m }));

function ContentIntelligence({ brands }) {
  const T = useTheme();
  const today = new Date();
  const [reviews, setReviews, _] = usePersist("dh_insights_v1", []);
  const [tab, setTab] = useState("review"); // review | generate | patterns
  const [selMonth, setSelMonth] = useState(String(today.getMonth()));
  const [selYear, setSelYear] = useState(String(today.getFullYear()));
  const [posts, setPosts] = useState([
    { id:"1", platform:"tiktok",    brand:"dollhouse", title:"", views:"", likes:"", comments:"", shares:"", saves:"", hook:"", why:"" },
    { id:"2", platform:"instagram", brand:"dollhouse", title:"", views:"", likes:"", comments:"", shares:"", saves:"", hook:"", why:"" },
    { id:"3", platform:"threads",   brand:"dollhouse", title:"", views:"", likes:"", comments:"", shares:"", saves:"", hook:"", why:"" },
  ]);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(null);
  const [genBrand, setGenBrand] = useState("dollhouse");
  const [savedNotif, setSavedNotif] = useState(false);

  const monthLabel = `${MONTH_FULL[parseInt(selMonth)]} ${selYear}`;

  function addPost() {
    setPosts(ps => [...ps, { id:Date.now().toString(), platform:"tiktok", brand:"dollhouse", title:"", views:"", likes:"", comments:"", shares:"", saves:"", hook:"", why:"" }]);
  }
  function removePost(id) { setPosts(ps => ps.filter(p => p.id !== id)); }
  function updatePost(id, field, val) { setPosts(ps => ps.map(p => p.id===id ? {...p,[field]:val} : p)); }

  function calcEngagement(p) {
    const v = parseInt(p.views)||0;
    const eng = (parseInt(p.likes)||0)+(parseInt(p.comments)||0)+(parseInt(p.shares)||0)+(parseInt(p.saves)||0);
    if (!v) return 0;
    return ((eng/v)*100).toFixed(1);
  }

  function saveReview() {
    const review = { id:Date.now().toString(), month:selMonth, year:selYear, label:monthLabel, savedAt:Date.now(), posts:[...posts] };
    setReviews(rs => { const filtered = rs.filter(r=>!(r.month===selMonth&&r.year===selYear)); return [review,...filtered]; });
    setSavedNotif(true);
    setTimeout(()=>setSavedNotif(false), 2500);
  }

  async function generateContent() {
    const filledPosts = posts.filter(p=>p.title.trim());
    if (!filledPosts.length) return;
    setGenerating(true);
    setGenerated(null);

    const brand = brands.find(b=>b.id===genBrand)||brands[0];
    const topPosts = [...filledPosts].map(p=>({
      platform: p.platform,
      title: p.title,
      views: p.views,
      engagement: calcEngagement(p)+"%",
      hook: p.hook,
      why: p.why,
    }));

    const sourceReview = reviews.find(r=>r.month===selMonth&&r.year===selYear);
    const sourcePosts = sourceReview ? sourceReview.posts.filter(p=>p.title.trim()) : filledPosts;

    const prompt = `You are a social media strategist for ${brand.name} (${brand.handle}). This brand builds resilience through personal story, sells digital products (ebook + coaching) to women starting businesses.

Here are the top-performing posts from ${monthLabel}:
${JSON.stringify(sourcePosts.map(p=>({ platform:p.platform, title:p.title, views:p.views, engagement:calcEngagement(p)+"%", hook:p.hook, why:p.why })), null, 2)}

Based purely on what performed best — the hooks, topics, formats, and patterns — create a content plan for NEXT month.

Respond ONLY in this exact JSON format, no preamble, no markdown:
{
  "patterns": ["pattern 1", "pattern 2", "pattern 3"],
  "tiktok": [
    {"hook":"hook text","topic":"what the video is about","why":"why this will work","cta":"call to action"},
    {"hook":"...","topic":"...","why":"...","cta":"..."},
    {"hook":"...","topic":"...","why":"...","cta":"..."},
    {"hook":"...","topic":"...","why":"...","cta":"..."},
    {"hook":"...","topic":"...","why":"...","cta":"..."},
    {"hook":"...","topic":"...","why":"...","cta":"..."},
    {"hook":"...","topic":"...","why":"...","cta":"..."},
    {"hook":"...","topic":"...","why":"...","cta":"..."}
  ],
  "instagram": [
    {"hook":"...","topic":"...","why":"...","cta":"..."},
    {"hook":"...","topic":"...","why":"...","cta":"..."},
    {"hook":"...","topic":"...","why":"...","cta":"..."},
    {"hook":"...","topic":"...","why":"...","cta":"..."},
    {"hook":"...","topic":"...","why":"...","cta":"..."},
    {"hook":"...","topic":"...","why":"...","cta":"..."},
    {"hook":"...","topic":"...","why":"...","cta":"..."},
    {"hook":"...","topic":"...","why":"...","cta":"..."}
  ],
  "threads": [
    {"hook":"...","topic":"...","why":"...","cta":"..."},
    {"hook":"...","topic":"...","why":"...","cta":"..."},
    {"hook":"...","topic":"...","why":"...","cta":"..."},
    {"hook":"...","topic":"...","why":"...","cta":"..."},
    {"hook":"...","topic":"...","why":"...","cta":"..."},
    {"hook":"...","topic":"...","why":"...","cta":"..."},
    {"hook":"...","topic":"...","why":"...","cta":"..."},
    {"hook":"...","topic":"...","why":"...","cta":"..."}
  ]
}`;

    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, { method:"POST", headers:{"Content-Type":"application/json","Authorization":`Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`}, body:JSON.stringify({ messages:[{role:"user",content:prompt}], max_tokens:2500 }) });
      if (!res.ok) { const e = await res.json().catch(()=>({})); throw new Error(e?.error?.message||`API error ${res.status}`); }
      const data = await res.json();
      if (!data.content?.length) throw new Error("Empty response");
      const raw = data.content.map(c=>c.text||"").join("");
      setGenerated(safeParseJSON(raw));
    } catch(e) { alert(`Generation failed: ${e.message}. Try again.`); }
    setGenerating(false);
  }

  // All saved patterns across all months
  const allPatterns = reviews.flatMap(r => r.posts.filter(p=>p.why).map(p=>({ label:r.label, platform:p.platform, title:p.title, why:p.why, eng:calcEngagement(p) })));

  const currentReview = reviews.find(r=>r.month===selMonth&&r.year===selYear);

  const yearOpts = ["2024","2025","2026","2027"].map(y=>({value:y,label:y}));

  return (
    <Page title="Content Intelligence" sub="Log what performed, find patterns, generate next month's content">

      {/* Tabs */}
      <div style={{ display:"flex", gap:8, marginBottom:24, flexWrap:"wrap" }}>
        {[{id:"review",label:"◫ Log Performance"},{id:"generate",label:"✦ Generate Next Month"},{id:"patterns",label:"✵ What's Working"}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{ padding:"8px 18px", border:`1px solid ${tab===t.id?T.p3:T.border}`, borderRadius:999, background:tab===t.id?`${T.p3}18`:"transparent", fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:tab===t.id?T.p4:T.light, cursor:"pointer" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── LOG PERFORMANCE TAB ── */}
      {tab==="review" && (
        <>
          <div style={{ padding:"12px 16px", background:`${T.p3}0d`, border:`1px solid ${T.border}`, borderRadius:10, marginBottom:20 }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.mid }}>
              <strong>How to use:</strong> At the end of each month, go to TikTok Analytics, Instagram Insights, and Threads — copy your top 3–5 posts per platform and log them here. The AI will use this data to generate next month's content.
            </div>
          </div>

          {/* Month + Year picker */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:22, flexWrap:"wrap" }}>
            <Label style={{ margin:0 }}>Reviewing:</Label>
            <select value={selMonth} onChange={e=>setSelMonth(e.target.value)}
              style={{ padding:"8px 12px", background:T.card, border:`1px solid ${T.border}`, borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.ink, outline:"none", cursor:"pointer" }}>
              {INSIGHT_MONTHS_OPTS.map(m=><option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
            <select value={selYear} onChange={e=>setSelYear(e.target.value)}
              style={{ padding:"8px 12px", background:T.card, border:`1px solid ${T.border}`, borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.ink, outline:"none", cursor:"pointer" }}>
              {yearOpts.map(y=><option key={y.value} value={y.value}>{y.label}</option>)}
            </select>
            {currentReview && <span style={{ padding:"3px 10px", background:"rgba(100,170,100,0.1)", border:"1px solid rgba(100,170,100,0.25)", borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:"#5a9a5a" }}>✓ Saved</span>}
          </div>

          {/* Post entry cards */}
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {posts.map((p, idx) => (
              <Card key={p.id} style={{ padding:"20px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14, flexWrap:"wrap" }}>
                  <span style={{ fontFamily:"'Cormorant SC',serif", fontSize:14, color:T.mid, fontStyle:"italic" }}>Post {idx+1}</span>
                  <select value={p.platform} onChange={e=>updatePost(p.id,"platform",e.target.value)}
                    style={{ padding:"5px 10px", background:T.surface, border:`1px solid ${T.border}`, borderRadius:6, fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.ink, outline:"none", cursor:"pointer" }}>
                    {INSIGHT_PLATFORMS.map(pl=><option key={pl} value={pl}>{pl.charAt(0).toUpperCase()+pl.slice(1)}</option>)}
                  </select>
                  <select value={p.brand} onChange={e=>updatePost(p.id,"brand",e.target.value)}
                    style={{ padding:"5px 10px", background:T.surface, border:`1px solid ${T.border}`, borderRadius:6, fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.ink, outline:"none", cursor:"pointer" }}>
                    {brands.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                  <span style={{ padding:"3px 10px", background:`${PLATFORM_COLORS[p.platform]}15`, border:`1px solid ${PLATFORM_COLORS[p.platform]}30`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:1, color:PLATFORM_COLORS[p.platform] }}>
                    {PLATFORM_ICONS[p.platform]} {p.platform}
                  </span>
                  {calcEngagement(p)>0 && <span style={{ marginLeft:"auto", fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:1, color:"#6aaa6c" }}>{calcEngagement(p)}% eng</span>}
                  {posts.length>1 && <button onClick={()=>removePost(p.id)} style={{ background:"none", border:"none", color:T.light, cursor:"pointer", fontSize:13, marginLeft:"auto" }}>✕</button>}
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:10 }}>
                  <div style={{ gridColumn:"1/-1" }}>
                    <Label>Post Title / Topic</Label>
                    <input value={p.title} onChange={e=>updatePost(p.id,"title",e.target.value)} placeholder="e.g. Why I quit my job to build this brand"
                      style={{ width:"100%", padding:"8px 12px", background:`rgba(0,0,0,0.02)`, border:`1px solid ${T.border}`, borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.ink, outline:"none" }} />
                  </div>
                  {[["Views","views"],["Likes","likes"],["Comments","comments"],["Shares","shares"],["Saves","saves"]].map(([lbl,field])=>(
                    <div key={field}>
                      <Label>{lbl}</Label>
                      <input value={p[field]} onChange={e=>updatePost(p.id,field,e.target.value)} placeholder="0" type="number"
                        style={{ width:"100%", padding:"8px 12px", background:`rgba(0,0,0,0.02)`, border:`1px solid ${T.border}`, borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.ink, outline:"none" }} />
                    </div>
                  ))}
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  <div>
                    <Label>Opening Hook (first line / text)</Label>
                    <textarea value={p.hook} onChange={e=>updatePost(p.id,"hook",e.target.value)} placeholder="The exact opening line or on-screen text..." rows={2}
                      style={{ width:"100%", padding:"8px 12px", background:`rgba(0,0,0,0.02)`, border:`1px solid ${T.border}`, borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.ink, outline:"none", resize:"none", lineHeight:1.6 }} />
                  </div>
                  <div>
                    <Label>Why You Think It Performed (optional)</Label>
                    <textarea value={p.why} onChange={e=>updatePost(p.id,"why",e.target.value)} placeholder="e.g. Personal story, relatable, strong hook..." rows={2}
                      style={{ width:"100%", padding:"8px 12px", background:`rgba(0,0,0,0.02)`, border:`1px solid ${T.border}`, borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.ink, outline:"none", resize:"none", lineHeight:1.6 }} />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div style={{ display:"flex", gap:10, marginTop:16, flexWrap:"wrap", alignItems:"center" }}>
            <Btn variant="ghost" onClick={addPost}>+ Add Another Post</Btn>
            <Btn onClick={saveReview} disabled={!posts.some(p=>p.title.trim())}>Save {monthLabel} Review</Btn>
            {savedNotif && <span style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, color:"#6aaa6c", textTransform:"uppercase" }}>✓ Saved!</span>}
          </div>

          {/* Past reviews list */}
          {reviews.length>0 && (
            <div style={{ marginTop:32 }}>
              <Label>Past Reviews</Label>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:8 }}>
                {reviews.map(r=>(
                  <div key={r.id} style={{ padding:"8px 14px", background:T.card, border:`1px solid ${T.border}`, borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.mid }}>
                    <span style={{ fontFamily:"'Cormorant SC',serif", fontSize:14, fontStyle:"italic", color:T.ink }}>{r.label}</span>
                    <span style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, color:T.light, marginLeft:8, textTransform:"uppercase" }}>{r.posts.length} posts</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* ── GENERATE TAB ── */}
      {tab==="generate" && (
        <>
          <div style={{ padding:"14px 18px", background:`${T.p3}0d`, border:`1px solid ${T.border}`, borderRadius:10, marginBottom:22 }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.mid, lineHeight:1.7 }}>
              <strong>How this works:</strong> The AI reads your logged top posts from the current month, finds what hooks, topics, and formats performed best, then generates a full batch of content ideas for next month — built to replicate what's already working for <em>your</em> audience.
            </div>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20, flexWrap:"wrap" }}>
            <Label style={{margin:0}}>Generate for:</Label>
            <select value={genBrand} onChange={e=>setGenBrand(e.target.value)}
              style={{ padding:"8px 12px", background:T.card, border:`1px solid ${T.border}`, borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.ink, outline:"none", cursor:"pointer" }}>
              {brands.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            <select value={selMonth} onChange={e=>setSelMonth(e.target.value)}
              style={{ padding:"8px 12px", background:T.card, border:`1px solid ${T.border}`, borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.ink, outline:"none", cursor:"pointer" }}>
              {INSIGHT_MONTHS_OPTS.map(m=><option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
            <Btn onClick={generateContent} disabled={generating||!posts.some(p=>p.title.trim())}>
              {generating ? "Generating..." : "✦ Generate Next Month"}
            </Btn>
          </div>

          {!posts.some(p=>p.title.trim()) && !generated && (
            <Card style={{ padding:"36px", textAlign:"center" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, color:T.light, fontStyle:"italic", marginBottom:8 }}>No posts logged yet.</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.light, marginBottom:20 }}>Go to Log Performance first and enter your top posts from this month.</div>
              <Btn variant="ghost" onClick={()=>setTab("review")}>→ Go Log Performance</Btn>
            </Card>
          )}

          {generating && (
            <Card style={{ padding:"48px", textAlign:"center" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, color:T.mid, fontStyle:"italic", marginBottom:12, animation:"pulse 1.5s ease infinite" }}>Analysing your top content...</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.light }}>Finding patterns. Building your next month. This takes a few seconds.</div>
            </Card>
          )}

          {generated && !generating && (
            <>
              {/* Patterns */}
              {generated.patterns?.length>0 && (
                <Card style={{ padding:"22px", marginBottom:16, borderTop:`2px solid ${T.p3}` }}>
                  <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:17, color:T.ink, fontStyle:"italic", marginBottom:12 }}>✦ What's Driving Your Growth</div>
                  {generated.patterns.map((pat,i)=>(
                    <div key={i} style={{ display:"flex", gap:10, padding:"8px 0", borderBottom:`1px solid ${T.border}` }}>
                      <span style={{ color:T.p3, fontWeight:"bold", flexShrink:0 }}>{i+1}.</span>
                      <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.mid, lineHeight:1.65 }}>{pat}</div>
                    </div>
                  ))}
                </Card>
              )}

              {/* Platform content grids */}
              {INSIGHT_PLATFORMS.map(pl => generated[pl]?.length>0 && (
                <Card key={pl} style={{ padding:"22px", marginBottom:16 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
                    <span style={{ color:PLATFORM_COLORS[pl], fontSize:18 }}>{PLATFORM_ICONS[pl]}</span>
                    <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:17, color:T.ink, fontStyle:"italic" }}>{pl.charAt(0).toUpperCase()+pl.slice(1)} — Next Month</div>
                    <span style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, color:T.light, textTransform:"uppercase" }}>{generated[pl].length} ideas</span>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:12 }}>
                    {generated[pl].map((item,i)=>(
                      <div key={i} style={{ padding:"14px 16px", background:`rgba(0,0,0,0.02)`, border:`1px solid ${T.border}`, borderRadius:10 }}>
                        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:3, textTransform:"uppercase", color:T.p4, marginBottom:6 }}>Idea {i+1}</div>
                        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:T.ink, fontStyle:"italic", marginBottom:6, lineHeight:1.5 }}>"{item.hook}"</div>
                        <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.mid, marginBottom:8, lineHeight:1.6 }}>{item.topic}</div>
                        <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                          {item.why && <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:T.light }}>◎ {item.why}</div>}
                          {item.cta && <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:1, color:T.p4, textTransform:"uppercase" }}>CTA: {item.cta}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </>
          )}
        </>
      )}

      {/* ── PATTERNS TAB ── */}
      {tab==="patterns" && (
        <>
          <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:18, color:T.ink, fontStyle:"italic", marginBottom:18 }}>Your Content Patterns Over Time</div>
          {allPatterns.length===0 ? (
            <Card style={{ padding:"48px", textAlign:"center" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, color:T.light, fontStyle:"italic", marginBottom:8 }}>No patterns yet.</div>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.light, marginBottom:20 }}>Log your monthly top posts and the patterns will build automatically here.</div>
              <Btn variant="ghost" onClick={()=>setTab("review")}>→ Log First Month</Btn>
            </Card>
          ) : (
            <>
              {/* Platform breakdown */}
              {INSIGHT_PLATFORMS.map(pl => {
                const platPosts = allPatterns.filter(p=>p.platform===pl);
                if (!platPosts.length) return null;
                return (
                  <Card key={pl} style={{ padding:"22px", marginBottom:14 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                      <span style={{ color:PLATFORM_COLORS[pl], fontSize:18 }}>{PLATFORM_ICONS[pl]}</span>
                      <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:16, color:T.ink, fontStyle:"italic" }}>{pl.charAt(0).toUpperCase()+pl.slice(1)} · Top Performers</div>
                    </div>
                    {platPosts.sort((a,b)=>parseFloat(b.eng)-parseFloat(a.eng)).map((p,i)=>(
                      <div key={i} style={{ display:"flex", gap:12, padding:"10px 0", borderBottom:`1px solid ${T.border}`, alignItems:"flex-start" }}>
                        <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:22, color:T.p3, fontStyle:"italic", minWidth:40 }}>{p.eng}%</div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.ink, marginBottom:3 }}>{p.title}</div>
                          {p.why && <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.light }}>◎ {p.why}</div>}
                        </div>
                        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, color:T.light, textTransform:"uppercase", flexShrink:0 }}>{p.label}</div>
                      </div>
                    ))}
                  </Card>
                );
              })}
            </>
          )}
        </>
      )}
    </Page>
  );
}


// ─── PDF / EXPORT UTILITIES ───────────────────────────────────────────────────

function downloadCanvas(canvas, filename) {
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png", 1.0);
  a.download = filename;
  a.click();
}

function buildScriptPDF(scripts, T) {
  // We render to a hidden canvas then download as PNG (works without external libs)
  // For a true multi-page PDF we use a print-window approach
  const w = window.open("", "_blank");
  if (!w) { alert("Allow popups to download PDF"); return; }

  const html = `<!DOCTYPE html><html><head>
  <meta charset="utf-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400&family=DM+Sans:wght@300;400&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'DM Sans',sans-serif;background:#fff;color:#2a1a14;padding:48px;max-width:720px;margin:0 auto}
    .header{text-align:center;margin-bottom:48px;padding-bottom:24px;border-bottom:1px solid #e8d8d0}
    .logo{font-family:'Cormorant Garamond',serif;font-size:28px;color:#9c7b6e;font-style:italic;letter-spacing:2px}
    .sub{font-family:'Jost',sans-serif;font-size:9px;letter-spacing:4px;text-transform:uppercase;color:#a8908a;margin-top:4px}
    .script{page-break-inside:avoid;margin-bottom:48px;padding-bottom:32px;border-bottom:1px solid #f0e8e0}
    .script-title{font-family:'Cormorant Garamond',serif;font-size:22px;color:#3a2d29;font-style:italic;margin-bottom:6px}
    .script-meta{font-family:'Jost',sans-serif;font-size:8px;letter-spacing:3px;text-transform:uppercase;color:#a8908a;margin-bottom:18px}
    .shot{margin-bottom:20px;padding:16px;background:#fdf8f4;border-left:2px solid #c4a89a;border-radius:4px}
    .shot-label{font-family:'Jost',sans-serif;font-size:7px;letter-spacing:3px;text-transform:uppercase;color:#9c7b6e;margin-bottom:8px}
    .shot-say{font-family:'Cormorant Garamond',serif;font-size:16px;color:#2a1a14;font-style:italic;line-height:1.8;margin-bottom:8px}
    .shot-do{font-family:'DM Sans',sans-serif;font-size:11px;color:#6e5650;line-height:1.6}
    .caption{padding:16px;background:#f8f0ec;border:1px solid #e8d8d0;border-radius:6px;font-family:'DM Sans',sans-serif;font-size:12px;color:#3a2d29;line-height:1.8;white-space:pre-wrap}
    .caption-label{font-family:'Jost',sans-serif;font-size:7px;letter-spacing:3px;text-transform:uppercase;color:#9c7b6e;margin-bottom:8px}
    @media print{body{padding:24px}.script{page-break-after:always}}
  </style>
  <title>The Dollhouse · Scripts</title>
  </head><body>
  <div class="header">
    <div class="logo">The Dollhouse</div>
    <div class="sub">Content Studio · Scripts</div>
  </div>
  ${scripts.map(s => {
    const shots = s.fourx4?.shots || [];
    return `<div class="script">
      <div class="script-title">${s.title||s.topic||"Untitled"}</div>
      <div class="script-meta">${s.type||""} ${s.brand?" · "+s.brand:""}</div>
      ${shots.length ? shots.map(sh => `
        <div class="shot">
          <div class="shot-label">${sh.label||""} — ${sh.timing||""}</div>
          <div class="shot-say">"${sh.say_this||""}"</div>
          ${sh.do_this ? `<div class="shot-do">${sh.do_this}</div>` : ""}
        </div>`).join("") : `<div class="shot"><div class="shot-say">${(s.body||"").replace(/\n/g,"<br>")}</div></div>`}
      ${s.fourx4?.caption ? `<div style="margin-top:16px"><div class="caption-label">Caption</div><div class="caption">${s.fourx4.caption}</div></div>` : ""}
    </div>`;
  }).join("")}
  <script>window.onload=()=>{window.print();}<\/script>
  </body></html>`;

  w.document.write(html);
  w.document.close();
}

function exportWallpaper(images, layout, size, T) {
  const canvas = document.createElement("canvas");
  const SIZES = {
    phone:    { w:1170, h:2532, label:"iPhone Wallpaper" },
    imac:     { w:5120, h:2880, label:"iMac Wallpaper" },
    square:   { w:2048, h:2048, label:"Square" },
    a4:       { w:2480, h:3508, label:"A4 Print" },
  };
  const { w, h } = SIZES[size] || SIZES.phone;
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d");

  // Background — use theme bg colour
  const bgMap = {
    blush: "#fdf0ee", dusk: "#f5ede8", dawn: "#fffaf8", noir: "#1c1c1e"
  };
  ctx.fillStyle = bgMap[T] || "#fdf0ee";
  ctx.fillRect(0, 0, w, h);

  if (!images.length) {
    downloadCanvas(canvas, `dollhouse-wallpaper-${size}.png`);
    return;
  }

  // Grid layout: determine positions
  const count = Math.min(images.length, layout === "single" ? 1 : layout === "trio" ? 3 : layout === "quad" ? 4 : layout === "five" ? 5 : 9);
  const padding = w * 0.06;
  const gap = w * 0.04;

  function drawCircleImage(img, cx, cy, r) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();
    // Cover-fit the image
    const scale = Math.max((r*2) / img.width, (r*2) / img.height);
    const sw = img.width * scale, sh = img.height * scale;
    ctx.drawImage(img, cx - sw/2, cy - sh/2, sw, sh);
    ctx.restore();
    // Subtle ring
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(196,168,154,0.3)";
    ctx.lineWidth = w * 0.003;
    ctx.stroke();
    ctx.restore();
  }

  const loadedImgs = [];
  let pending = count;
  for (let i = 0; i < count; i++) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      loadedImgs[i] = img;
      pending--;
      if (pending === 0) renderWallpaper();
    };
    img.onerror = () => { loadedImgs[i] = null; pending--; if (pending === 0) renderWallpaper(); };
    img.src = images[i].dataUrl;
  }

  function renderWallpaper() {
    // Re-draw background
    ctx.fillStyle = bgMap[T] || "#fdf0ee";
    ctx.fillRect(0, 0, w, h);

    // Decorative text watermark
    ctx.save();
    ctx.font = `300 ${w*0.022}px 'Georgia', serif`;
    ctx.fillStyle = T === "noir" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
    ctx.textAlign = "center";
    for (let row = 0; row < 8; row++) {
      ctx.fillText("THE DOLLHOUSE · CONTENT STUDIO · ", w/2, h * 0.1 * row + 40);
    }
    ctx.restore();

    const usable_w = w - padding * 2;
    const usable_h = h - padding * 2;

    let positions = [];
    if (count === 1) {
      const r = Math.min(usable_w, usable_h) * 0.38;
      positions = [{ cx: w/2, cy: h/2, r }];
    } else if (count === 2) {
      const r = usable_w * 0.28;
      positions = [
        { cx: padding + r, cy: h/2, r },
        { cx: w - padding - r, cy: h/2, r },
      ];
    } else if (count === 3) {
      const r = Math.min(usable_w * 0.28, usable_h * 0.22);
      positions = [
        { cx: w/2, cy: padding + r, r: r * 1.1 },
        { cx: padding + r, cy: h - padding - r, r },
        { cx: w - padding - r, cy: h - padding - r, r },
      ];
    } else if (count === 4) {
      const r = Math.min(usable_w * 0.22, usable_h * 0.2);
      const cols = [padding + r, w - padding - r];
      const rows = [padding + r + gap, h - padding - r - gap];
      positions = cols.flatMap(cx => rows.map(cy => ({ cx, cy, r })));
    } else if (count === 5) {
      const r = Math.min(usable_w * 0.18, usable_h * 0.16);
      const bigR = r * 1.3;
      positions = [
        { cx: w/2, cy: h/2, r: bigR },
        { cx: padding + r, cy: padding + r * 1.2, r },
        { cx: w - padding - r, cy: padding + r * 1.2, r },
        { cx: padding + r, cy: h - padding - r * 1.2, r },
        { cx: w - padding - r, cy: h - padding - r * 1.2, r },
      ];
    } else {
      const cols = 3, rows_count = 3;
      const r = Math.min((usable_w - gap * (cols-1)) / cols, (usable_h - gap * (rows_count-1)) / rows_count) / 2 * 0.9;
      for (let row = 0; row < rows_count; row++) {
        for (let col = 0; col < cols; col++) {
          if (positions.length >= count) break;
          positions.push({
            cx: padding + col * (r*2 + gap) + r,
            cy: padding + row * (r*2 + gap) + r,
            r,
          });
        }
      }
    }

    positions.forEach((pos, i) => {
      if (loadedImgs[i]) {
        drawCircleImage(loadedImgs[i], pos.cx, pos.cy, pos.r);
      } else {
        // Placeholder circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(pos.cx, pos.cy, pos.r, 0, Math.PI * 2);
        ctx.fillStyle = T === "noir" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
        ctx.fill();
        ctx.restore();
      }
    });

    // Footer watermark
    ctx.save();
    ctx.font = `300 ${w*0.016}px 'Georgia', serif`;
    ctx.fillStyle = T === "noir" ? "rgba(255,255,255,0.2)" : "rgba(156,123,110,0.4)";
    ctx.textAlign = "center";
    ctx.fillText("THE DOLLHOUSE", w/2, h - padding * 0.5);
    ctx.restore();

    downloadCanvas(canvas, `dollhouse-${size}-wallpaper.png`);
  }

  if (count === 0) renderWallpaper();
}

// ─── VISION BOARD ────────────────────────────────────────────────────────────
function VisionBoard() {
  const T = useTheme();
  const [images, setImages, _] = usePersist("dh_vision_v1", []);
  const [dragOver, setDragOver] = useState(false);
  const [selected, setSelected] = useState(null);
  const [exportModal, setExportModal] = useState(false);
  const [exportType, setExportType] = useState("wallpaper"); // wallpaper | print
  const [wallSize, setWallSize] = useState("phone");
  const [wallLayout, setWallLayout] = useState("auto");
  const [caption, setCaption] = useState("");
  const [editCaption, setEditCaption] = useState(null);
  const fileRef = useRef(null);

  function handleFiles(files) {
    Array.from(files).forEach(file => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = e => {
        const newImg = {
          id: Date.now().toString() + Math.random(),
          dataUrl: e.target.result,
          caption: "",
          addedAt: Date.now(),
        };
        setImages(imgs => [...imgs, newImg]);
      };
      reader.readAsDataURL(file);
    });
  }

  function handleDrop(e) {
    e.preventDefault(); setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }

  function removeImage(id) {
    setImages(imgs => imgs.filter(i => i.id !== id));
    if (selected === id) setSelected(null);
  }

  function saveCaption(id, text) {
    setImages(imgs => imgs.map(i => i.id === id ? { ...i, caption: text } : i));
    setEditCaption(null);
  }

  function doExport() {
    if (exportType === "wallpaper") {
      // Get the themeKey from context via T — we need to map back
      const themeKey = T.bg === "#1c1c1e" ? "noir" : T.bg === "#f5ede8" ? "dusk" : T.bg === "#fffaf8" ? "dawn" : "blush";
      const layout = wallLayout === "auto" ? (
        images.length <= 1 ? "single" : images.length === 2 ? "double" :
        images.length === 3 ? "trio" : images.length === 4 ? "quad" :
        images.length === 5 ? "five" : "nine"
      ) : wallLayout;
      exportWallpaper(images, layout, wallSize, themeKey);
    }
    setExportModal(false);
  }

  const SIZES = [
    { id:"phone",  label:"iPhone", sub:"1170 × 2532" },
    { id:"imac",   label:"iMac",   sub:"5120 × 2880" },
    { id:"square", label:"Square", sub:"2048 × 2048" },
    { id:"a4",     label:"A4 Print", sub:"2480 × 3508" },
  ];

  const LAYOUTS = [
    { id:"auto",   label:"Auto" },
    { id:"single", label:"1 — Hero" },
    { id:"trio",   label:"3 — Triangle" },
    { id:"quad",   label:"4 — Grid" },
    { id:"five",   label:"5 — Centered" },
    { id:"nine",   label:"9 — Gallery" },
  ];

  return (
    <Page title="Vision Board" sub="Your world, your proof, your why — all in one place">

      {/* Toolbar */}
      <div style={{ display:"flex", gap:10, marginBottom:24, flexWrap:"wrap", alignItems:"center" }}>
        <Btn onClick={() => fileRef.current?.click()}>+ Add Images</Btn>
        {images.length > 0 && <>
          <Btn variant="ghost" onClick={() => setExportModal(true)}>◇ Export / Download</Btn>
          <span style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, color:T.light, textTransform:"uppercase", marginLeft:4 }}>{images.length} image{images.length!==1?"s":""}</span>
        </>}
        <input ref={fileRef} type="file" accept="image/*" multiple style={{ display:"none" }} onChange={e => handleFiles(e.target.files)} />
      </div>

      {/* Drop zone / board */}
      {images.length === 0 ? (
        <div
          onDragOver={e=>{e.preventDefault();setDragOver(true)}}
          onDragLeave={()=>setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          style={{
            minHeight:400, border:`2px dashed ${dragOver?T.p3:T.borderMid}`, borderRadius:18,
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
            cursor:"pointer", transition:"all 0.2s",
            background: dragOver ? `${T.p3}08` : `rgba(0,0,0,0.01)`,
            animation:"riseIn 0.4s ease both",
          }}>
          <div style={{ fontSize:32, marginBottom:16, opacity:0.3 }}>◈</div>
          <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:20, color:T.mid, fontStyle:"italic", marginBottom:8 }}>Drop your vision here</div>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:T.light, textAlign:"center", maxWidth:320, lineHeight:1.7 }}>Upload images — places, people, feelings, goals, anything that pulls you forward. They'll be masked into clean circles.</div>
          <div style={{ marginTop:24, fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:3, color:T.p3, textTransform:"uppercase" }}>Click or drag & drop</div>
        </div>
      ) : (
        <div
          onDragOver={e=>{e.preventDefault();setDragOver(true)}}
          onDragLeave={()=>setDragOver(false)}
          onDrop={handleDrop}>
          {/* Masonry-style circle grid */}
          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))",
            gap:32,
            padding:"8px 0 32px",
          }}>
            {images.map((img, idx) => (
              <VisionCircle
                key={img.id}
                img={img}
                idx={idx}
                T={T}
                selected={selected === img.id}
                onSelect={() => setSelected(selected === img.id ? null : img.id)}
                onRemove={() => removeImage(img.id)}
                onEditCaption={() => { setCaption(img.caption||""); setEditCaption(img.id); }}
                onSaveCaption={(text) => saveCaption(img.id, text)}
                editCaption={editCaption === img.id}
                captionDraft={caption}
                setCaption={setCaption}
              />
            ))}
            {/* Add more drop cell */}
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                aspectRatio:"1", borderRadius:"50%", border:`2px dashed ${dragOver?T.p3:T.borderMid}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                cursor:"pointer", transition:"all 0.2s", opacity:0.5,
                background: dragOver ? `${T.p3}08` : "transparent",
              }}
              onMouseEnter={e=>e.currentTarget.style.opacity="0.9"}
              onMouseLeave={e=>e.currentTarget.style.opacity="0.5"}>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:22, color:T.p3, marginBottom:4 }}>+</div>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, color:T.light, textTransform:"uppercase" }}>Add more</div>
              </div>
            </div>
          </div>

          {dragOver && (
            <div style={{ textAlign:"center", padding:"12px", fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:T.p3, fontStyle:"italic" }}>
              Drop to add to your board
            </div>
          )}
        </div>
      )}

      {/* Export Modal */}
      <Modal open={exportModal} onClose={() => setExportModal(false)} title="Export Your Vision" width={520}>
        <div style={{ display:"flex", gap:8, marginBottom:22 }}>
          {[{id:"wallpaper",label:"◇ Wallpaper"},{id:"print",label:"◫ Print Sheet"}].map(t=>(
            <button key={t.id} onClick={()=>setExportType(t.id)}
              style={{ flex:1, padding:"10px", border:`1px solid ${exportType===t.id?T.p3:T.border}`, borderRadius:9, background:exportType===t.id?`${T.p3}18`:"transparent", fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:exportType===t.id?T.p4:T.light, cursor:"pointer" }}>
              {t.label}
            </button>
          ))}
        </div>

        {exportType === "wallpaper" && (<>
          <Label>Size</Label>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:18 }}>
            {SIZES.map(s=>(
              <button key={s.id} onClick={()=>setWallSize(s.id)}
                style={{ padding:"12px", border:`1px solid ${wallSize===s.id?T.p3:T.border}`, borderRadius:10, background:wallSize===s.id?`${T.p3}14`:"transparent", cursor:"pointer", textAlign:"left", transition:"all 0.15s" }}>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:wallSize===s.id?T.p4:T.mid }}>{s.label}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:10, color:T.light, marginTop:2 }}>{s.sub}</div>
              </button>
            ))}
          </div>
          <Label>Layout</Label>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:22 }}>
            {LAYOUTS.map(l=>(
              <button key={l.id} onClick={()=>setWallLayout(l.id)}
                style={{ padding:"6px 13px", border:`1px solid ${wallLayout===l.id?T.p3:T.border}`, borderRadius:999, background:wallLayout===l.id?`${T.p3}14`:"transparent", fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, textTransform:"uppercase", color:wallLayout===l.id?T.p4:T.light, cursor:"pointer" }}>
                {l.label}
              </button>
            ))}
          </div>
          <div style={{ padding:"10px 14px", background:`${T.p3}0c`, border:`1px solid ${T.border}`, borderRadius:8, marginBottom:16 }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.mid }}>Images are masked into circles on a {["phone","imac","square","a4"].find(s=>s===wallSize)?SIZES.find(s=>s.id===wallSize)?.sub:""} canvas using your current theme background. Downloads as a PNG.</div>
          </div>
        </>)}

        {exportType === "print" && (<>
          <div style={{ padding:"12px 14px", background:`${T.p3}0c`, border:`1px solid ${T.border}`, borderRadius:8, marginBottom:16 }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:T.mid, lineHeight:1.7 }}>Opens a print-ready page with all your vision board images in a grid. Use your browser's Print → Save as PDF to save it.</div>
          </div>
        </>)}

        <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
          <Btn variant="ghost" onClick={()=>setExportModal(false)}>Cancel</Btn>
          <Btn onClick={exportType==="print" ? ()=>printVisionBoard(images, T) : doExport}>
            {exportType==="wallpaper" ? "◇ Download PNG" : "◫ Open Print View"}
          </Btn>
        </div>
      </Modal>
    </Page>
  );
}

function printVisionBoard(images, T) {
  const w = window.open("", "_blank");
  if (!w) { alert("Allow popups to print"); return; }
  const cols = images.length <= 4 ? 2 : 3;
  const html = `<!DOCTYPE html><html><head>
  <meta charset="utf-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Jost:wght@300;400&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:sans-serif;background:#fff;padding:32px}
    .header{text-align:center;margin-bottom:32px}
    .title{font-family:'Cormorant Garamond',serif;font-size:26px;color:#9c7b6e;font-style:italic;letter-spacing:2px}
    .sub{font-family:'Jost',sans-serif;font-size:8px;letter-spacing:4px;text-transform:uppercase;color:#c4a89a;margin-top:4px}
    .grid{display:grid;grid-template-columns:repeat(${cols},1fr);gap:28px;justify-items:center}
    .cell{display:flex;flex-direction:column;align-items:center;gap:10px}
    .circle{width:200px;height:200px;border-radius:50%;overflow:hidden;border:1.5px solid rgba(196,168,154,0.3)}
    .circle img{width:100%;height:100%;object-fit:cover}
    .cap{font-family:'Cormorant Garamond',serif;font-size:12px;color:#6e5650;font-style:italic;text-align:center;max-width:180px;line-height:1.5}
    .footer{text-align:center;margin-top:40px;font-family:'Jost',sans-serif;font-size:7px;letter-spacing:3px;text-transform:uppercase;color:#c4a89a}
    @media print{body{padding:16px}}
  </style>
  <title>The Dollhouse · Vision Board</title>
  </head><body>
  <div class="header">
    <div class="title">The Dollhouse</div>
    <div class="sub">Vision Board</div>
  </div>
  <div class="grid">
    ${images.map(img => `
      <div class="cell">
        <div class="circle"><img src="${img.dataUrl}" /></div>
        ${img.caption ? `<div class="cap">${img.caption}</div>` : ""}
      </div>`).join("")}
  </div>
  <div class="footer">The Dollhouse Content Studio · Your Vision</div>
  <script>window.onload=()=>window.print();<\/script>
  </body></html>`;
  w.document.write(html);
  w.document.close();
}

function VisionCircle({ img, idx, T, selected, onSelect, onRemove, onEditCaption, onSaveCaption, editCaption, captionDraft, setCaption }) {
  const [hov, setHov] = useState(false);

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, animation:`riseIn 0.4s ease ${idx*0.05}s both` }}>
      {/* Circle image */}
      <div
        style={{ position:"relative", width:"100%", aspectRatio:"1", cursor:"pointer" }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={onSelect}>
        {/* Outer ring */}
        <div style={{
          position:"absolute", inset:-3, borderRadius:"50%",
          border:`2px solid ${selected ? T.p3 : hov ? T.p3+"66" : T.border}`,
          transition:"all 0.2s", zIndex:2,
        }}/>
        {/* Circle mask */}
        <div style={{
          width:"100%", height:"100%", borderRadius:"50%", overflow:"hidden",
          boxShadow: selected ? `0 8px 32px ${T.p3}40` : hov ? `0 4px 20px rgba(0,0,0,0.12)` : "0 2px 8px rgba(0,0,0,0.06)",
          transition:"box-shadow 0.2s",
        }}>
          <img
            src={img.dataUrl}
            alt={img.caption||"Vision"}
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.35s ease" }}
            onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"}
            onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
          />
        </div>
        {/* Hover controls */}
        {hov && (
          <div style={{ position:"absolute", top:6, right:6, display:"flex", gap:4, zIndex:3 }}>
            <button onClick={e=>{e.stopPropagation();onEditCaption();}}
              style={{ width:26, height:26, borderRadius:"50%", background:"rgba(255,255,255,0.9)", border:`1px solid ${T.border}`, color:T.mid, fontSize:11, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>✎</button>
            <button onClick={e=>{e.stopPropagation();onRemove();}}
              style={{ width:26, height:26, borderRadius:"50%", background:"rgba(255,255,255,0.9)", border:"1px solid rgba(220,80,80,0.3)", color:"#cc4444", fontSize:11, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
          </div>
        )}
        {/* Selection indicator */}
        {selected && (
          <div style={{ position:"absolute", bottom:6, right:6, width:20, height:20, borderRadius:"50%", background:T.p3, border:"2px solid #fff", zIndex:3, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ color:"#fff", fontSize:9 }}>✓</span>
          </div>
        )}
      </div>
      {/* Caption */}
      {editCaption ? (
        <div style={{ width:"100%", textAlign:"center" }}>
          <input
            autoFocus
            value={captionDraft}
            onChange={e=>setCaption(e.target.value)}
            onKeyDown={e=>{ if(e.key==="Enter") onSaveCaption(captionDraft); if(e.key==="Escape") onSaveCaption(img.caption||""); }}
            onBlur={()=>onSaveCaption(captionDraft)}
            placeholder="Add a word or intention..."
            style={{ width:"90%", textAlign:"center", background:"transparent", border:"none", borderBottom:`1px solid ${T.p3}`, outline:"none", fontFamily:"'Cormorant Garamond',serif", fontSize:13, color:T.ink, fontStyle:"italic", padding:"4px 0" }}
          />
        </div>
      ) : (
        <div
          onClick={onEditCaption}
          style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:13, color:img.caption?T.mid:T.light, fontStyle:"italic", textAlign:"center", cursor:"text", lineHeight:1.5, minHeight:18, opacity:img.caption?1:0.4 }}>
          {img.caption || "add intention..."}
        </div>
      )}
    </div>
  );
}

// ─── SCRIPT PDF DOWNLOAD (attached to Scripts page) ───────────────────────────
function ScriptPDFButton({ scripts, T }) {
  return (
    <Btn variant="ghost" small onClick={() => buildScriptPDF(scripts, T)}>
      ◫ Print / PDF
    </Btn>
  );
}


// ─── GOALS ────────────────────────────────────────────────────────────────────
const GOAL_HORIZONS = ["This Week","This Month","This Quarter","This Year","Long-Term"];
const GOAL_CATEGORIES = ["Revenue","Content","Growth","Mindset","Brand","Personal","Other"];
const CAT_COLORS = { Revenue:"#6aaa6c", Content:"#c4a89a", Growth:"#7ab0d4", Mindset:"#c49ac4", Brand:"#d4a96a", Personal:"#cc7766", Other:"#9a9a9a" };

function Goals() {
  const T = useTheme();
  const [goals, setGoals, _loaded] = usePersist("dh_goals_v1", []);
  const [wordOfYear, setWordOfYear, _w] = usePersist("dh_woy_v1", "");
  const [intention, setIntention, _i] = usePersist("dh_intention_v1", "");
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [editWoy, setEditWoy] = useState(false);
  const [editInt, setEditInt] = useState(false);
  const [woyDraft, setWoyDraft] = useState("");
  const [intDraft, setIntDraft] = useState("");
  const [activeHorizon, setActiveHorizon] = useState("All");
  const [form, setForm] = useState({ title:"", body:"", horizon:"This Month", category:"Content", dueDate:"", progress:0, done:false });

  function openNew(horizon="") {
    setEdit(null);
    setForm({ title:"", body:"", horizon:horizon||"This Month", category:"Content", dueDate:"", progress:0, done:false });
    setModal(true);
  }
  function openEdit(g) { setEdit(g); setForm({...g}); setModal(true); }
  function save() {
    if (!form.title.trim()) return;
    if (edit) { setGoals(gs=>gs.map(g=>g.id===edit.id?{...form,id:edit.id,updatedAt:Date.now()}:g)); }
    else { setGoals(gs=>[{...form,id:Date.now().toString(),createdAt:Date.now(),updatedAt:Date.now()},...gs]); }
    setModal(false);
  }
  function del(id) { setGoals(gs=>gs.filter(g=>g.id!==id)); setModal(false); }
  function toggleDone(id) { setGoals(gs=>gs.map(g=>g.id===id?{...g,done:!g.done,progress:g.done?g.progress:100}:g)); }
  function setProgress(id, v) { setGoals(gs=>gs.map(g=>g.id===id?{...g,progress:v,done:v>=100}:g)); }

  const filtered = activeHorizon==="All" ? goals : goals.filter(g=>g.horizon===activeHorizon);
  const active = filtered.filter(g=>!g.done);
  const done = filtered.filter(g=>g.done);
  const completionRate = goals.length ? Math.round((goals.filter(g=>g.done).length/goals.length)*100) : 0;

  return (
    <Page title="Goals" sub="Quarterly vision, annual intention, weekly wins — anchored here">

      {/* Word of Year + Intention anchors */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
        <Card style={{ padding:"24px", background:`linear-gradient(135deg,${T.card},${T.surface})`, position:"relative" }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${T.p3},${T.p4})`, borderRadius:"12px 12px 0 0" }} />
          <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:4, textTransform:"uppercase", color:T.p3, marginBottom:10 }}>Word of the Year</div>
          {editWoy ? (
            <input autoFocus value={woyDraft} onChange={e=>setWoyDraft(e.target.value)}
              onBlur={()=>{ setWordOfYear(woyDraft); setEditWoy(false); }}
              onKeyDown={e=>{ if(e.key==="Enter"){setWordOfYear(woyDraft);setEditWoy(false);} if(e.key==="Escape")setEditWoy(false); }}
              style={{ width:"100%", background:"transparent", border:"none", borderBottom:`1px solid ${T.p3}`, outline:"none", fontFamily:"'Cormorant SC',serif", fontSize:36, color:T.p4, fontStyle:"italic", padding:"4px 0", letterSpacing:2 }} />
          ) : (
            <div onClick={()=>{setWoyDraft(wordOfYear);setEditWoy(true);}} style={{ cursor:"text" }}>
              {wordOfYear
                ? <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:36, color:T.p4, fontStyle:"italic", letterSpacing:2, lineHeight:1.1 }}>{wordOfYear}</div>
                : <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, color:T.light, fontStyle:"italic" }}>Click to set your word...</div>
              }
            </div>
          )}
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:T.light, fontStyle:"italic", marginTop:8 }}>The one word that guides every decision this year</div>
        </Card>

        <Card style={{ padding:"24px", background:`linear-gradient(135deg,${T.card},${T.surface})`, position:"relative" }}>
          <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${T.p4},${T.p3})`, borderRadius:"12px 12px 0 0" }} />
          <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:4, textTransform:"uppercase", color:T.p3, marginBottom:10 }}>Daily Intention</div>
          {editInt ? (
            <textarea autoFocus value={intDraft} onChange={e=>setIntDraft(e.target.value)}
              onBlur={()=>{ setIntention(intDraft); setEditInt(false); }}
              style={{ width:"100%", background:"transparent", border:`1px solid ${T.border}`, borderRadius:6, outline:"none", fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:T.ink, fontStyle:"italic", padding:"8px", lineHeight:1.7, resize:"none", minHeight:72 }} />
          ) : (
            <div onClick={()=>{setIntDraft(intention);setEditInt(true);}} style={{ cursor:"text", minHeight:72 }}>
              {intention
                ? <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:15, color:T.mid, fontStyle:"italic", lineHeight:1.8 }}>{intention}</div>
                : <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:14, color:T.light, fontStyle:"italic" }}>Click to write your daily intention...</div>
              }
            </div>
          )}
        </Card>
      </div>

      {/* Stats row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:12, marginBottom:24 }}>
        <StatCard label="Total Goals" value={goals.length} sub="set" color={T.p4} />
        <StatCard label="Completed" value={goals.filter(g=>g.done).length} sub="done" color="#6aaa6c" />
        <StatCard label="Active" value={goals.filter(g=>!g.done).length} sub="in progress" color={T.p3} />
        <StatCard label="Completion" value={`${completionRate}%`} sub="overall" color={T.gold} />
      </div>

      {/* Toolbar */}
      <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap", alignItems:"center" }}>
        <Btn onClick={()=>openNew()}>+ New Goal</Btn>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {["All",...GOAL_HORIZONS].map(h=>(
            <button key={h} onClick={()=>setActiveHorizon(h)}
              style={{ padding:"5px 12px", border:`1px solid ${activeHorizon===h?T.p3:T.border}`, borderRadius:999, background:activeHorizon===h?`${T.p3}18`:"transparent", fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:2, textTransform:"uppercase", color:activeHorizon===h?T.p4:T.light, cursor:"pointer" }}>
              {h}
            </button>
          ))}
        </div>
      </div>

      {goals.length === 0 && (
        <Card style={{ padding:"48px", textAlign:"center" }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, color:T.light, fontStyle:"italic", marginBottom:16 }}>No goals yet. Plant your first seed.</div>
          <Btn onClick={()=>openNew()}>+ First Goal</Btn>
        </Card>
      )}

      {/* Active goals by horizon */}
      {active.length > 0 && (
        <>
          <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:4, textTransform:"uppercase", color:T.p4, marginBottom:12 }}>◆ Active — {active.length}</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:14, marginBottom:28 }}>
            {active.map(g=><GoalCard key={g.id} g={g} T={T} onEdit={openEdit} onToggle={toggleDone} onProgress={setProgress} />)}
          </div>
        </>
      )}

      {/* Done goals */}
      {done.length > 0 && (
        <>
          <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:4, textTransform:"uppercase", color:"#6aaa6c", marginBottom:12 }}>✓ Completed — {done.length}</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:14 }}>
            {done.map(g=><GoalCard key={g.id} g={g} T={T} onEdit={openEdit} onToggle={toggleDone} onProgress={setProgress} />)}
          </div>
        </>
      )}

      <Modal open={modal} onClose={()=>setModal(false)} title={edit?"Edit Goal":"New Goal"} width={520}>
        <Input label="Goal" value={form.title} onChange={v=>setForm(f=>({...f,title:v}))} placeholder="e.g. Hit $10k this month" />
        <Textarea label="Why this matters" value={form.body} onChange={v=>setForm(f=>({...f,body:v}))} placeholder="The reason behind it..." rows={3} />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <Sel label="Horizon" value={form.horizon} onChange={v=>setForm(f=>({...f,horizon:v}))} options={GOAL_HORIZONS} />
          <Sel label="Category" value={form.category} onChange={v=>setForm(f=>({...f,category:v}))} options={GOAL_CATEGORIES} />
        </div>
        <Input label="Due Date (optional)" value={form.dueDate||""} onChange={v=>setForm(f=>({...f,dueDate:v}))} type="date" />
        <div>
          <Label>Progress — {form.progress}%</Label>
          <input type="range" min="0" max="100" step="5" value={form.progress} onChange={e=>setForm(f=>({...f,progress:parseInt(e.target.value),done:parseInt(e.target.value)>=100}))}
            style={{ width:"100%", accentColor:T.p3 }} />
        </div>
        <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:8 }}>
          {edit && <Btn variant="danger" onClick={()=>del(edit.id)}>Delete</Btn>}
          <Btn variant="ghost" onClick={()=>setModal(false)}>Cancel</Btn>
          <Btn onClick={save} disabled={!form.title.trim()}>Save Goal</Btn>
        </div>
      </Modal>
    </Page>
  );
}

function GoalCard({ g, T, onEdit, onToggle, onProgress }) {
  const [hov, setHov] = useState(false);
  const catColor = CAT_COLORS[g.category] || T.light;
  const daysLeft = g.dueDate ? Math.ceil((new Date(g.dueDate+"T12:00:00") - new Date()) / 86400000) : null;

  return (
    <Card style={{ padding:"20px", opacity:g.done?0.65:1, transition:"opacity 0.2s", position:"relative" }}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}>
      {/* Category stripe */}
      <div style={{ position:"absolute", top:0, left:0, bottom:0, width:3, background:catColor, borderRadius:"12px 0 0 12px", opacity:0.7 }} />
      <div style={{ paddingLeft:8 }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:10 }}>
          {/* Done circle */}
          <button onClick={()=>onToggle(g.id)} style={{ width:20, height:20, borderRadius:"50%", border:`2px solid ${g.done?"#6aaa6c":T.borderMid}`, background:g.done?"#6aaa6c":"transparent", flexShrink:0, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", marginTop:1, transition:"all 0.2s" }}>
            {g.done && <span style={{ color:"#fff", fontSize:10 }}>✓</span>}
          </button>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:15, color:g.done?T.light:T.ink, fontStyle:"italic", textDecoration:g.done?"line-through":"none", lineHeight:1.3 }}>{g.title}</div>
            {g.body && <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:12, color:T.light, fontStyle:"italic", marginTop:3, lineHeight:1.5 }}>{g.body}</div>}
          </div>
          {hov && <button onClick={()=>onEdit(g)} style={{ background:"none", border:"none", color:T.light, cursor:"pointer", fontSize:12, padding:0, flexShrink:0 }}>✎</button>}
        </div>

        {/* Progress bar */}
        {!g.done && (
          <div style={{ marginBottom:10 }}>
            <div style={{ height:4, background:`rgba(0,0,0,0.07)`, borderRadius:99, overflow:"hidden", marginBottom:4 }}>
              <div style={{ height:"100%", width:`${g.progress||0}%`, background:`linear-gradient(90deg,${catColor}88,${catColor})`, borderRadius:99, transition:"width 0.4s ease" }} />
            </div>
            <input type="range" min="0" max="100" step="5" value={g.progress||0}
              onChange={e=>onProgress(g.id, parseInt(e.target.value))}
              style={{ width:"100%", accentColor:catColor, height:3, cursor:"pointer" }} />
          </div>
        )}

        {/* Footer tags */}
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>
          <span style={{ padding:"2px 8px", border:`1px solid ${catColor}44`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:catColor }}>{g.category}</span>
          <span style={{ padding:"2px 8px", border:`1px solid ${T.border}`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:T.light }}>{g.horizon}</span>
          {daysLeft !== null && !g.done && (
            <span style={{ padding:"2px 8px", border:`1px solid ${daysLeft<3?"rgba(200,80,60,0.3)":T.border}`, borderRadius:999, fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:2, textTransform:"uppercase", color:daysLeft<3?"#cc4444":T.light, marginLeft:"auto" }}>
              {daysLeft<0?"overdue":daysLeft===0?"due today":`${daysLeft}d left`}
            </span>
          )}
          {!g.done && <span style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:1, color:T.light, marginLeft:"auto" }}>{g.progress||0}%</span>}
        </div>
      </div>
    </Card>
  );
}

// ─── ROOT APP ──────────────────────────────────────────────────────────────────
// 60-Minute Live Sales Loop — Pre-loaded continuous live stream script
// Structured in 3 loops (0-20, 20-40, 40-60 minutes) for seamless teleprompter reading
function SIXTY_MINUTE_LIVE_SALES_LOOP(id) {
  const sections = [
    { 
      label: "LOOP 1: Minutes 0-20", 
      duration_min: 20, 
      type: "loop1", 
      cue: "[LOOP 1 START]",
      script: `Are you sitting at a normal job right now, making the same exact amount of money every single week? Are you looking for a real way to launch your own physical product brand and leave that job without losing all your savings? If you are looking for freedom, do not scroll away.

What if I told you that you do not need to spend thousands of dollars hiring a fancy design studio to start your own physical product brand? Most successful people who sell products online do not start with a huge team. They start with a beautiful, expensive-looking brand style that makes their products look high-end from day one. It sounds simple, but it will make you stop and think about how real product wealth is made today.

My name is Mandy, and I am the creator of The Dollhouse Brand Studio. Not long ago, I was trapped in a regular job, trading all my time for a small paycheck. I used to look for jobs that paid a little bit more per hour, or thought about getting a second job. But guess what? There are only so many hours in a day. Making a few extra dollars an hour does not change your life. It just helps you get by, but it never sets you free.

I built a premium physical product business ecosystem that runs completely on autopilot, and it allowed me to leave my regular job for good. I am telling you this because I actually do this every single day. This works right now, and I have helped complete beginners do the exact same thing.

You do not need to be a professional designer, you do not need an audience of millions, and you do not need to spend months guessing your style to build a premium brand. You just need a simple system that works.

Look at the screen right now. There are exactly three simple steps you need to build a premium product business and leave your regular job.

Step one is finding a real problem that people have every single day. Do not try to invent something super complicated. Just find one simple problem, find a beautiful product that fixes it, and wrap it up nicely.

Step two is building your online store page. You do not need a huge web page that costs a fortune. You just need one simple, clean page that shows people why your product is amazing, shows them proof that it works, and looks incredibly luxurious so people trust you instantly.

Step three is keeping your price high. Beginners always make the mistake of making their products look cheap and selling them for ten or twenty dollars because they think it is easier. But it is actually much easier to sell a high-quality, premium product at a higher price to a few serious people than it is to chase thousands of cheap clicks. A premium look means you make much more money on every single sale, which helps you replace your job paycheck way faster.

Double tap the screen right now if this makes total sense. Tap the screen and type YES in the chat if you are ready to stop guessing and start building. I want to see everyone who is tired of the nine to five grind drop a YES in the comments right now. If you want to build a premium brand, show me some energy in the chat.

Now, I know exactly what you might be thinking right now because I see these questions in the chat all the time. Let us talk about them directly and clear them up.

If you think you do not have enough money to hire a designer to make your store look expensive, this system is built so you can do it yourself in minutes for almost nothing.

If you think you do not have enough time because of your day job, do not worry. You do not need to spend weeks learning complex software. This engine asks you nineteen simple questions and creates your entire brand identity for you right inside your web browser.

If you think you are not creative enough or do not have an eye for design, you do not need a graphic design degree. The high-end fonts, beautiful color styles, and luxury layouts are already built into the engine for you.

And if you think you can just figure this out all by yourself by trying to piece together random graphics online, you are wasting time. You will spend months making your business look messy, which costs you sales and keeps you stuck, instead of building a real plan to leave your job.

You do not need to reinvent the wheel. To help you start right away, I made The Dollhouse Brand Kit. This is an interactive software application that guides you through a nineteen-question engine to generate your professional, high-end brand identity all in one easy place.

If you hired a professional designer to build all of this brand infrastructure for you, it would easily cost you thousands of dollars. But because I spent years making this software simple and entirely independent, I can give it to you today for a tiny fraction of that cost.

When you secure your copy today, you also get a special bonus pack that you cannot find anywhere else. It includes my secret launch checklists, premium template guides, and access to our private community.

I am taking all the risk off your shoulders and putting it on mine. My promise is simple: if you use this system, answer the questions, and do the work, my team will help you until your brand identity is successfully ready to launch.

But here is the real catch: because this is a special live stream event, I have set a live countdown timer right on the page in my bio. This special discount and the entire luxury bonus pack are attached to that timer. Once the clock hits zero, the price goes back up to normal and the bonuses disappear. I do this because the application runs instantly, and I want to reward the serious people who take action right now.

Do not wait until this live stream ends and the timer runs out. Click my profile picture right now, go straight to the link in my bio, and lock in your special deal before the clock drops to zero.`
    },
    { 
      label: "LOOP 2: Minutes 20-40", 
      duration_min: 20, 
      type: "loop2", 
      cue: "[LOOP 2 START]",
      script: `Welcome in to everyone who is just swiping onto the live stream right now. If you are sitting at a normal job, working hard for a boss, and making the same exact salary every week, listen closely. We are talking about how to launch your own physical product brand and leave that job without losing your life savings. Do not swipe away, because this can change everything for you.

You do not need to spend thousands of dollars hiring a graphic designer to start your brand. Most successful product sellers start with a simple, high-end look that makes their products look like luxury items from day one. When your packaging and website look expensive, customers trust you instantly.

Again, my name is Mandy, and I am the creator of The Dollhouse Brand Studio. I used to be stuck in that exact same corporate cycle, trading my precious hours for a limited paycheck. I would try to find jobs with a higher hourly wage, or consider working a second job. But we all know there are only twenty-four hours in a day. A small raise does not change your life. It just keeps you floating, but it never gives you true freedom.

I built a premium physical product business ecosystem that runs smoothly on autopilot using zero-server architecture, which let me walk away from my job forever. I am not just talking about theories here. This is my actual business that I run every single day, and I have mapped it out so complete beginners can do it too.

You do not need to buy tons of stock upfront, you do not need a huge social media following, and you do not need to guess your design style. You just need a system that works.

Let us look back at the screen for everyone who just joined us. There are three simple steps you must follow to build a premium product business and leave your regular job.

First, find a real problem that people face every day. Keep it simple. Find a product that fixes that problem perfectly, and make it look beautiful.

Second, set up your online store page. Skip the massive, complicated websites. You need a clean, luxury landing page that displays your product, shows proof that it works, and looks so high-end that people do not hesitate to buy.

Third, price your products for high margins. Beginners always sell cheap ten dollar items because they think it is easier to get a sale. That is a trap. It is much easier to sell a premium product at a higher price to a few serious buyers than it is to look for thousands of cheap clicks. A premium look lets you make real money on every sale, replacing your day job income much faster.

Double tap the screen right now if this makes total sense to you. Let us get the likes up on this stream. Tap the screen and type YES in the chat right now if you are ready to build a real asset and stop trading time for pennies. I see you dropping those responses in the chat, and that is exactly the kind of energy it takes to win.

Let us address the doubts that might be holding you back right now, because I hear them from beginners every single day.

If you are worried that you do not have the money to hire a luxury designer to build your brand look, you do not need one. This system lets you create a professional, high-end identity yourself in just a few minutes for almost nothing.

If you think you do not have enough time because you work a full-time job, listen to me. You do not need to spend weeks learning confusing software. This app asks you nineteen simple questions and automatically designs your entire brand identity right inside your web browser.

If you think you are not creative or do not know anything about style, you do not need a design degree. The high-end fonts, beautiful gold and blush color palettes, and luxury layouts are already built right into the tool for you.

And if you think you can just do this all alone by searching for free graphics online, you are slowing yourself down. You will end up making your business look messy, which scares away customers and keeps you stuck at your job, instead of executing a clean launch plan.

You do not have to do this the hard way. To help you start right now, I built The Dollhouse Brand Kit. It is an interactive web application that guides you through a nineteen-question engine to generate your professional, high-end brand identity instantly.

If you went to a professional design studio for this, they would charge you thousands of dollars. But because I designed this software to be entirely independent and run right in your browser, I can give it to you today for a tiny fraction of that cost.

When you secure your copy during this live stream, you also get my exclusive bonus pack, including my secret launch checklists, premium template guides, and access to our private community of action-takers.

I am taking all the risk off your shoulders. My promise is simple: if you use the app, answer the questions, and do the work, my team will help you until your brand identity is completely ready to launch.

Remember, this is a special live stream event. I have a live countdown timer running right on the page in my bio. This massive discount and the luxury bonus pack are locked to that timer. When the clock hits zero, the price goes back up and the bonuses are gone forever. The software works instantly, and I want to reward the people who move fast.

Do not miss out before the timer runs out. Click my profile picture right now, go straight to the link in my bio, and lock in your special deal before the clock drops to zero.`
    },
    { 
      label: "LOOP 3: Minutes 40-60", 
      duration_min: 20, 
      type: "loop3", 
      cue: "[LOOP 3 START]",
      script: `We are entering the final part of our live stream today, so if you are just joining us, stop scrolling and pay close attention. If you are working a nine to five job, making a fixed salary, and looking for a real way to launch your own physical product brand and escape the grind, this is for you.

You do not need a huge warehouse or thousands of dollars in design fees to launch an online brand. Most successful product creators start by making their brand look incredibly premium from day one. When your online store looks high-end, you can charge premium prices, which means you make more money with fewer sales.

My name is Mandy, and I am the creator of The Dollhouse Brand Studio. I spent years trapped in a regular job, trading my time for a fixed paycheck. I tried getting jobs that paid a little more per hour, and I thought about getting a second job. But there are only so many hours in a single day. A tiny raise does not change your lifestyle. It just keeps you afloat, but it never sets you free.

I built an independent physical product business ecosystem that runs on autopilot with zero server dependencies, and it allowed me to leave my job behind. I actually do this every single day, and I have made it simple so complete beginners can do it too.

You do not need to buy massive amounts of inventory upfront, you do not need millions of followers, and you do not need to guess your style. You just need a simple system that works.

Look at the screen one last time. There are exactly three simple steps to build a premium product business and leave your job.

Step one is finding a real problem that people face every day. Do not make it complicated. Find a product that fixes that problem perfectly, and make it look beautiful.

Step two is building your online store page. Skip the massive, expensive websites. You just need a simple, clean page that shows why your product is amazing, shows proof that it works, and looks completely luxurious so people trust you instantly.

Step three is keeping your price high. Beginners always make the mistake of making their products look cheap and selling them for ten or twenty dollars because they think it is easier. That is a mistake. It is much easier to sell a high-quality, premium product at a higher price to a few serious buyers than it is to chase thousands of cheap clicks. A premium look means you make much more profit on every sale, which replaces your day job paycheck way faster.

Double tap the screen right now to help out the stream. Tap the screen and type YES in the chat right now if you are ready to stop guessing and start building your brand identity today. I want to see everyone who is ready to take action drop a YES in the comments before we close out.

Let us clear out the final doubts that might be keeping you stuck, because I want to make sure you have complete clarity before the stream ends.

If you think you do not have the money to hire a professional designer to make your store look expensive, you do not need one. This system lets you build a professional, high-end identity yourself in just minutes for almost nothing.

If you think you do not have enough time because of your day job, do not worry. You do not need to spend weeks learning confusing design software. This app asks you nineteen simple questions and automatically creates your entire brand identity right inside your web browser.

If you think you are not creative enough or do not have an eye for design, you do not need a graphic design degree. The high-end fonts, beautiful color styles, and luxury layouts are already built right into the engine for you.

And if you think you can just figure this out all by yourself by trying to piece together random graphics online, you are wasting your time. You will spend months making your business look messy, which costs you sales and keeps you stuck, instead of executing a clean plan to leave your job.

You do not need to reinvent the wheel from scratch. To help you start right away, I made The Dollhouse Brand Kit. This is an interactive software application that guides you through a nineteen-question engine to generate your professional, high-end brand identity all in one easy place.

If you hired a professional designer to build all of this brand infrastructure for you, it would easily cost you thousands of dollars. But because I spent years making this software simple and entirely independent, I can give it to you today for a tiny fraction of that cost.

When you secure your copy today, you also get a special bonus pack that you cannot find anywhere else. It includes my secret launch checklists, premium template guides, and access to our private community.

I am taking all the risk off your shoulders and putting it on mine. My promise is simple: if you use this system, answer the questions, and do the work, my team will help you until your brand identity is successfully ready to launch.

But remember, this is a special live stream event, and the clock is ticking. I have set a live countdown timer right on the page in my bio. This special discount and the entire luxury bonus pack are attached directly to that timer. Once the clock hits zero, the price goes back up to normal and the bonuses disappear forever. I do this because the application runs instantly, and I want to reward the serious action-takers who move right now.

Do not wait until this live stream ends and the timer hits zero. Click my profile picture right now, go straight to the link in my bio, and lock in your special deal before the clock drops to zero.

Thank you so much for hanging out with me today. Go grab the kit, start answering those nineteen questions, and let us build your premium brand. I will see you inside the community. Bye for now!`
    }
  ];

  const liveData = {
    title: "60-Minute Live Sales Loop",
    hook_statement: "⚡ 9-5 ESCAPE SYSTEM: Click my profile icon to grab the brand kit before the timer hits zero",
    sections,
    engagement_bank: [
      "Double tap the screen right now if this makes sense.",
      "Type YES in the chat if you are ready to build.",
      "Type YES if you want to stop trading time for pennies.",
      "Click my profile picture and grab the kit before the timer hits zero.",
      "Tap the screen if you are ready to build a premium brand.",
    ],
    product_mention: "The Dollhouse Brand Kit is an interactive software application with a 19-question engine that builds your professional brand identity instantly in your browser.",
    closing_script: "Click my profile picture right now, go straight to the link in my bio, and lock in your special deal before the clock drops to zero. Thank you for being here today!",
    if_nervous_card: "You are doing great. Keep reading. Your viewers are here for YOU and your message. Just breathe and keep going.",
  };

  return {
    id,
    title: "60-Minute Live Sales Loop",
    brand: "The Dollhouse Brand Kit",
    type: "TikTok Live",
    topic: "60-Minute Continuous Live Sales Loop",
    body: sections.map(s => `[${s.label}]\n${s.script}`).join("\n\n"),
    status: "ready",
    isLive: true,
    liveData,
  };
}

// Hard-coded Masterclass Escape Hatch script — seeded into Starred Lives on first
// load so the 8 AM launch ALWAYS has a teleprompter-ready script, even offline.
function MASTERCLASS_ESCAPE_HATCH_SEED(id) {
  const sections = [
    { label:"00:00 - The Hook (Wake Up Call)", duration_min:5, type:"opening", cue:"[ACTION: SHOW FACE]",
      script:`[ACTION: SHOW FACE] Welcome in, girls. Tap that screen. We are getting to 10k likes because someone in here is tired of being a 'good worker' for a boss that doesn't care about them. I looked for a job for 2 years. I got ghosted. I got rejected. So I took my last bit of money and built my own exit. I stopped begging for a job and built my own house. If you want to stop trading your soul for a check, stay right here.\n\nListen, I need you to hear me like a real person, not a business page. The problem is not that you are lazy. The problem is you were never handed a real plan. You were told to work hard, stay quiet, and be thankful for scraps. This live is about building the kind of brand that gives you options, soft-life money, and a way out.\n\n[STOP & WRITE] Get your pens out, this is the part most people skip. Write this down — this is the difference between a worker and a boss: "A brand is your insurance policy, not a logo."\n\nType YES if you are done building someone else's dream.` },
    { label:"05:00 - Ice Breaker (Insurance Framing)", duration_min:5, type:"engagement", cue:"[ACTION: SHOW FACE]",
      script:`[ACTION: SHOW FACE] Quick question for the chat: have you ever sat in your car and cried before walking into your shift? Put a YES in the chat if that's been you. I'm not here to inspire you. I'm here to give you a SAFETY NET. Your own brand is your INSURANCE POLICY. It means you never have to stay with a dusty dude or a bad boss just to pay bills.\n\nAnd I want you to picture the real outcome. Not just a cute logo. I mean waking up with your own money coming in. I mean being able to leave when something feels wrong. I mean looking at your brand and thinking, wait, this looks expensive, this looks like me, this could really change my life.\n\n[STOP & WRITE] Get your pens out — write this down. This is the difference between a worker and a boss: "Your time is the only thing you can't earn back."\n\nType SAFETY NET if you want your own money so you never have to settle again.` },
    { label:"10:00 - 🔴 RESET THE LOOP (Quick Wins Recap)", duration_min:5, type:"value", is_loop_reset:true, cue:"🔴 RED FLASH — RESET THE LOOP", script:
`🔴 RESET THE LOOP — if you just joined, welcome in. Quick Wins recap so you don't feel behind:\n  ① We are building your ESCAPE PLAN from the 9-5.\n  ② Your own brand is your INSURANCE POLICY against bad bosses, dusty dudes, and toxic situations.\n  ③ I'm about to show you the 19-question engine that builds it for you.\nYou are NOT behind. You are right on time.\n\n[ACTION: SHOW MACBOOK SCREEN] Look at the screen. This is The Dollhouse Brand Kit. You answer 19 easy questions and my software builds your professional brand for you. The look. The plan. The exit.\n\nThis is why digital products change everything. You do not need to beg a boss. You do not need to wait for a man. You need a clear offer, a brand people trust, and a story that makes buyers feel, I need this in my life.\n\nType INSURANCE if you're ready to stop being one paycheck from disaster.` },
    { label:"15:00 - Success Loves Speed (Demo)", duration_min:5, type:"product", cue:"[ACTION: SHOW MACBOOK SCREEN]", script:
`[ACTION: SHOW MACBOOK SCREEN] Watch how fast this is. I'm opening Printify. I take the colors my Brand Kit gave me. I drop them on this product. Done. I have a business ready to sell on Etsy or TikTok Shop in minutes. You don't need a warehouse. You need a professional brand foundation. You need to look like a boss to get paid like one.\n\nThis is the part most people miss. Buyers do not just buy a file. They buy a feeling. They buy the dream of becoming the girl who finally has her own thing, her own money, her own name, her own soft life. That is why your brand has to feel expensive before they ever click buy.\n\n[STOP & WRITE] Get your pens out — write this. This is the difference between a worker and a boss: "Action takers are the money makers. Speed beats perfection."\n\nType 97 if you're ready to learn sales psychology.` },
    { label:"20:00 - The Close (Secure Your Policy)", duration_min:5, type:"closing", cue:"[ACTION: SHOW FACE]", script:
`[ACTION: SHOW FACE] Action takers are the money makers. You've been watching me for weeks waiting for a sign. This is it. Stop being a 'good girl' for a company that would replace you in a week.\n\nHere is the problem: you know you want more, but you keep trying to build from confusion. Here is the fix: the Brand Kit gives you the words, the look, the offer, and the next step. Here is the outcome: you start moving like the woman who has options. You stop asking, "What do I post?" and start saying, "This is my brand. This is what I sell. This is where my freedom starts."\n\nYou're not buying a kit — you're locking in your safety net. Securing your exit costs $97. Staying stuck costs your whole life. Click the link in my bio. Secure your insurance policy. When you get yours, come back and type GOT MINE so I can shout you out. We are running up the bag today.\n\n[STOP & WRITE] Last one — write this down: "Most people consume all day while a few monetize. Be one of the few."` },
    { label:"FINAL — The Closing Ceremony", duration_min:3, type:"closing", cue:"[ACTION: SHOW FACE]", script:
`[ACTION: SHOW FACE] I'm headed out to support the new owners. If you just got yours, check your email — your freedom starts today. If you're on the fence, remember: most people consume all day while a few monetize. Action takers are the money makers. The $97 price stays up for 60 minutes, then it goes back to $145. I'll see you in the shop. Go run up that bag. I'm out. Bye!\n\n[ACTION: END LIVE]` },
  ];
  const liveData = {
    title: "MASTERCLASS — The Escape Hatch (8 AM Launch)",
    sections,
    engagement_bank: [
      "Type YES if you are done building someone else's dream.",
      "Type 97 if you're ready to learn sales psychology.",
      "Type SAFETY NET if you want your own money so you never have to settle.",
      "Type INSURANCE if you're ready to stop being one paycheck from disaster.",
      "Type GOT MINE the second you secure your policy.",
      "Comment WAKE UP if you've ever cried in your car before a shift.",
      "Comment ENGINE if you want to see the 19-question engine.",
      "Comment EXIT if you're ready to build your way out.",
      "Comment WORTH IT if $97 for your freedom sounds like a deal.",
      "Comment WE EATING if you're locking in your insurance policy today.",
    ],
    closing_script:
`[ACTION: SHOW FACE] Action takers are the money makers. Stop being a 'good girl' for a company that would replace you in a week.\n\nHere is the truth: people do not buy because you sound corporate. They buy because you made them feel seen. They buy because you named the problem in their life, showed them the bridge, and helped them picture the woman they become on the other side. The Dollhouse Brand Kit is that bridge. It gives you the words, the look, the offer, and the plan so your brand feels clear, luxury, and ready to sell.\n\nYou're not buying a kit — you're locking in your safety net. Click the link in my bio and secure your insurance policy. Type GOT MINE when you're in.\n\n⏳ TIERED URGENCY:\n  • 10 minutes left at $97. After that it goes back to $145.\n  • 60 seconds. When I tap End, $97 dies and it's $145 forever.\n\n[ACTION: SHOW FACE] I'm headed out to support the new owners. If you just got yours, check your email — your freedom starts today. If you're on the fence, remember: most people consume all day while a few monetize. Action takers are the money makers. The $97 price stays up for 60 minutes, then it goes back to $145. I'll see you in the shop. Go run up that bag. I'm out. Bye!\n[ACTION: END LIVE]`,
  };
  return {
    id,
    title: liveData.title,
    brand: "The Dollhouse Brand Kit",
    type: "TikTok Live",
    topic: "The Escape Hatch — Quit Your 9-5 Masterclass",
    body: sections.map(s => `[${s.label}]\n${s.script}`).join("\n\n"),
    status: "draft",
    isLive: true,
    liveData,
  };
}

export default function DollhouseContentStudio() {
  useFonts();
  const [themeKey, setThemeKey, themeLoaded] = usePersist("dh_theme", "latte");
  const T_early = THEMES[themeKey] || THEMES.latte;
  useScrollbarTheme(T_early);

  const [page, setPage, pageLoaded] = usePersist("dh_page", "dashboard");
  const [posts, setPosts, postsLoaded] = usePersist("dh_posts_v2", []);
  const [scripts, setScripts, scriptsLoaded] = usePersist("dh_scripts_v2", []);
  const [brands, setBrands, brandsLoaded] = usePersist("dh_brands_v2", DEFAULT_BRANDS);
  const [finances, setFinances, financesLoaded] = usePersist("dh_finances_v2", []);
  const [growth, setGrowth, growthLoaded] = usePersist("dh_growth_v2", []);
  const [notes, setNotes, notesLoaded] = usePersist("dh_notes_v2", []);
  const [goals, setGoals, goalsLoaded] = usePersist("dh_goals_v1", []);
  const [savedPin, setSavedPin, pinLoaded] = usePersist("dh_pin", DEFAULT_PIN);
  const [unlocked, setUnlocked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loaded = themeLoaded && postsLoaded && scriptsLoaded && brandsLoaded && financesLoaded && growthLoaded && notesLoaded && pinLoaded && goalsLoaded;
  const T = THEMES[themeKey] || THEMES.latte;

  function saveTheme(k) { setThemeKey(k); }

  // ── PRE-LOADED SCRIPTS: Seed essential scripts into the Live Studio
  // so users ALWAYS have ready-to-read teleprompter scripts available
  useEffect(() => {
    if (!scriptsLoaded) return;
    
    // Seed 60-Minute Live Sales Loop
    const SIXTY_MIN_ID = "60-minute-live-sales-loop-v1";
    if (!scripts.some(s => s.id === SIXTY_MIN_ID)) {
      const sixtyMinScript = SIXTY_MINUTE_LIVE_SALES_LOOP(SIXTY_MIN_ID);
      setScripts(ss => [sixtyMinScript, ...ss]);
      try {
        const raw = localStorage.getItem("dh_starred_lives_v1");
        const starred = raw ? JSON.parse(raw) : [];
        if (Array.isArray(starred) && !starred.includes(SIXTY_MIN_ID)) {
          localStorage.setItem("dh_starred_lives_v1", JSON.stringify([SIXTY_MIN_ID, ...starred]));
        } else if (!Array.isArray(starred)) {
          localStorage.setItem("dh_starred_lives_v1", JSON.stringify([SIXTY_MIN_ID]));
        }
      } catch {}
    }
    
    // Seed Masterclass Escape Hatch
    const SEED_ID = "masterclass-escape-hatch-v2";
    if (!scripts.some(s => s.id === SEED_ID)) {
      const seed = MASTERCLASS_ESCAPE_HATCH_SEED(SEED_ID);
      setScripts(ss => [seed, ...ss]);
      try {
        const raw = localStorage.getItem("dh_starred_lives_v1");
        const starred = raw ? JSON.parse(raw) : [];
        if (Array.isArray(starred) && !starred.includes(SEED_ID)) {
          localStorage.setItem("dh_starred_lives_v1", JSON.stringify([SEED_ID, ...starred]));
        } else if (!Array.isArray(starred)) {
          localStorage.setItem("dh_starred_lives_v1", JSON.stringify([SEED_ID]));
        }
      } catch {}
    }
  }, [scriptsLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!loaded) {
    const LT = THEMES[themeKey] || THEMES.latte;
    return (
      <div style={{ minHeight:"100vh", background:LT.bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ textAlign:"center" }}>
          <Logo size={48} color={LT.p3} />
          <div style={{ fontFamily:"'Cormorant SC',serif", fontSize:14, color:LT.p4, fontStyle:"italic", marginTop:16, letterSpacing:2 }}>Loading your studio...</div>
        </div>
      </div>
    );
  }

  // PIN lock removed — direct access

  function renderPage() {
    const props = { brands, posts, scripts, finances, growth, notes };
    switch(page) {
      case "dashboard": return <Dashboard posts={posts} scripts={scripts} brands={brands} finances={finances} growth={growth} notes={notes} goals={goals} onNav={setPage} />;
      case "calendar":  return <Calendar posts={posts} setPosts={setPosts} brands={brands} scripts={scripts} />;
      case "scripts":   return <Scripts scripts={scripts} setScripts={setScripts} brands={brands} />;
      case "live":      return <LiveStudio scripts={scripts} setScripts={setScripts} brands={brands} />;
      case "finance":   return <Finance finances={finances} setFinances={setFinances} />;
      case "growth":    return <Growth growth={growth} setGrowth={setGrowth} brands={brands} />;
      case "insights":  return <ContentIntelligence brands={brands} />;
      case "notes":     return <Notes notes={notes} setNotes={setNotes} />;
      case "brands":    return <Brands brands={brands} setBrands={setBrands} />;
      case "vision":    return <VisionBoard />;
      case "goals":     return <Goals />;
      default: return null;
    }
  }

  return (
    <ThemeCtx.Provider value={T}>
      <div style={{ display:"flex", minHeight:"100vh", background:T.bg }}>
        <Sidebar active={page} onNav={setPage} theme={themeKey} setTheme={saveTheme} onLock={() => setUnlocked(false)} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        {sidebarOpen && <div onClick={()=>setSidebarOpen(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.3)", zIndex:99 }} />}
        <div className="dh-main" style={{ flex:1, marginLeft:210, minHeight:"100vh", position:"relative" }}>
          <button onClick={()=>setSidebarOpen(true)} style={{ display:"none", position:"fixed", top:16, left:16, zIndex:98, width:38, height:38, borderRadius:10, background:T.card, border:`1px solid ${T.border}`, color:T.mid, fontSize:16, cursor:"pointer", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 8px rgba(0,0,0,0.08)" }} className="dh-hamburger">≡</button>
          {renderPage()}
        </div>
      </div>
    </ThemeCtx.Provider>
  );
}
