import React, { useState, useEffect, useRef } from "react";

/* 🔳🔳🔳 THEME 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳 */
const TAB_COLORS = {
  White: { bg: "#cdc4c3", text: "#3a2e28" },
  Dark: { bg: "#1a1a1a", text: "#f0ede8" },
  Rose:  { bg: "#d3b3b3", text: "#3c1f1f" },
  Top: { bg: "#b9a898", text: "#3a3028" },
  Latte: { bg: "#c9b0a7", text: "#3E2723" },
  Mocha: { bg: "#150a00", text: "#faf5ee" },
};

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTHS_SHORT = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
const DAY_NAMES_LONG = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const DAY_NAMES_SHORT = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const fmt12 = h => h === 0 ? "12 AM" : h < 12 ? `${h} AM` : h === 12 ? "12 PM" : `${h-12} PM`;

const buildGCalUrl = (title, dateStr, hStart, hEnd) => {
  const d = dateStr;
  const hh = hStart !== undefined ? `${d}T${String(hStart).padStart(2,"0")}0000/${d}T${String(hEnd||hStart+1).padStart(2,"0")}0000` : `${d}/${d}`;
  return `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(title)}&dates=${hh}`;
};
const MOODS = ["😸", "🎨", "😐", "😭", "😩", "😤", "🥰", "😴", "😍", "😌"];
const MOOD_LABELS = ["Happy", "Great", "Neutral", "Sad", "Exhausted", "Frustrated", "Loved", "Tired", "Excited", "Calm"];
// Pastel mood colors for the tracker
const MOOD_PASTELS = ["#f7c5d5", "#f9e4b7","#b8e0c8","#b8cce8","#d4b8e0","#f7b8b8","#f2b8d8","#c8c0e8","#f7e0a0","#b8e8d0"];

function getDaysInMonth(m, y) { return new Date(y, m+1, 0).getDate(); }
function getFirstDayMon(m, y) { let d = new Date(y, m, 1).getDay(); return d===0?6:d-1; }

/* 🔳🔳🔳 POLAROID TRAY 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳 */
function PolaroidTray({ dragDataRef, activeStickerColor, B }) {
  const [polImages, setPolImages] = useState({});
  const polFileRef = useRef();
  const [activeSlot, setActiveSlot] = useState(null);
  const ROTS   = [-2,1,-1,2,0,-2];
  const CAPS   = ["memory 🔴", "always 🎀", "my fave", "lovely", "2026 🔴", "cherish"];

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file || activeSlot === null) return;
    const reader = new FileReader();
    reader.onload = ev => setPolImages(p => ({ ...p, [activeSlot]: ev.target.result }));
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div style={{ fontSize: "9px", letterSpacing: "0.16em", color: "#bbb", textTransform: "uppercase", marginBottom: "6px" }}>Polaroid Frames</div>
      <div style={{ fontSize: "10px", color: "#bbb", fontStyle: "italic", marginBottom: "12px" }}>Click + to add a photo, then drag to place</div>
      <input ref={polFileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleUpload}/>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {[0,1,2,3,4,5].map(i => {
          const img = polImages[i];
          const rot = ROTS[i];
          const caption = CAPS[i];
          const polContent = '<div style="background:' + activeStickerColor + '18;padding:7px 7px 22px 7px;box-shadow:0 3px 14px rgba(0,0,0,0.18);display:inline-block;transform:rotate(' + rot + 'deg);font-family:Cormoran Garamond,serif;border:1px solid ' + activeStickerColor + '30"><div style="width:72px;height:72px;overflow:hidden;background:' + activeStickerColor + '28;display:flex;align-items:center;justify-content:center">' + (img ? '<img src="' + img + '" style="width:100%;height:100%;object-fit:cover"/>' : '<div style="color:' + activeStickerColor + ';opacity:0.5;font-size:22px">📸</div>') + '</div><div style="font-size:9px;color:' + activeStickerColor + ';font-style:italic;text-align:center;margin-top:6px">' + caption + '</div></div>';
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              <div
                draggable
                onDragStart={() => dragDataRef.current = { type: "html", colour: activeStickerColor, content: polContent }}
                onTouchStart={() => dragDataRef.current = { type: "html", colour: activeStickerColor, content: polContent }}
                style={{ background: `${activeStickerColor}18`, padding: "7px 7px 22px 7px", boxShadow: "0 3px 14px rgba(0,0,0,0.18)", transform: `rotate(${rot}deg)`, cursor: "grab", transition: "transform 0.15s", border: `1px solid ${activeStickerColor}30` }}
                onMouseEnter={e => e.currentTarget.style.transform = `rotate(${rot}deg) scale(1.07)`}
                onMouseLeave={e => e.currentTarget.style.transform = `rotate(${rot}deg) scale(1)`}
              >
                <div style={{ width: "72px", height: "72px", overflow: "hidden", background: `${activeStickerColor}28`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {img ? <img src={img} style={{ width: "100%", height: "100%", objectFit: "cover" }}/> : <span style={{ color: activeStickerColor, opacity: 0.5, fontSize: "22px" }}>📸</span>}
                </div>
                <div style={{ fontSize: "9px", color: activeStickerColor, fontStyle: "italic", textAlign: "center", marginTop: "6px", fontFamily: "'Cormoran Garamond',serif" }}>{caption}</div>
              </div>
              <button onClick={() => { setActiveSlot(i); polFileRef.current.click(); }} style={{
                  background: "none", border: `1px solid ${B.border}`, cursor: "pointer",
                  fontSize: "9px", letterSpacing: "0.1em", color: B.mocha, padding: "2px 8px",
                  fontFamily: "'Cormoran Garamond',serif",
                }}>{img ? "change" : "+ photo"}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* 🔳🔳🔳 MAIN APP 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳 */
export default function Dollhouse() {
  const [view, setView] = useState("cover");
  const [prevView, setPrevView] = useState(null);
  const [fading, setFading] = useState(false);
  const [yearFading, setYearFading] = useState(false);
  const isFirstRender = useRef(true);
  const [tabColor, setTabColor] = useState("Mocha");
  const [weekStart, setWeekStart] = useState("monday");
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [weekLayout, setWeekLayout] = useState("classic");
  const [currentQuarter, setCurrentQuarter] = useState(0);
  const [noteTemplate, setNoteTemplate] = useState("lined");
  const [noteSection, setNoteSection] = useState(0);
  const [monthSubTab, setMonthSubTab] = useState("calendar");
  const [yearSubTab, setYearSubTab] = useState("calendar");
  const [habitMonth, setHabitMonth] = useState(new Date().getMonth());
  const [store, setStore] = useState({});
  const [storageReady, setStorageReady] = useState(false);
  const [saveIndicator, setSaveIndicator] = useState(false);
  const [showStickerTray, setShowStickerTray] = useState(false);
  const [trayTab, setTrayTab] = useState("labels");
  const [placedStickers, setPlacedStickers] = useState({});
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredSticker, setHoveredSticker] = useState(null);
  const dragDataRef = useRef(null);
  const [stickerColor, setStickerColor] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [drawTool, setDrawTool] = useState("pen");
  const [drawSize, setDrawSize] = useState(3);
  const [drawColor, setDrawColor] = useState("#1a1a1a");
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState(null);
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef(null);
  const drawToolRef = useRef("pen");
  const drawSizeRef = useRef(3);
  const drawColorRef = useRef("#1a1a1a");
  const coverNameInputRef = useRef(null);
  const pwInputRef = useRef(null);
  const [pwError, setPwError] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [customPassword, setCustomPassword] = useState("dollhouse2026");
  const [stickerHistory, setStickerHistory] = useState({});
  const [stickerSizes, setStickerSizes] = useState({});
  const [stickerRotations, setStickerRotations] = useState({});
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState("focus");
  const [pomodoroSecs, setPomodroSecs] = useState(25*60);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const pomodoroRef = useRef(null);
  const [stickerSearch, setStickerSearch] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [year, setYear] = useState(() => {
    try { const y = parseInt(localStorage.getItem("dollhouse-year")); return [2026,2027,2028].includes(y)?y:2026; } catch(e) { return 2026; }
  });

  useEffect(() => {
    try { localStorage.setItem("dollhouse-year", String(year)); } catch(e) {}
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    setYearFading(true);
    setTimeout(() => {
      setSelectedDay(null);
      setSelectedMonth(0);
      setCurrentWeek(0);
      setCurrentQuarter(0);
      setYearSubTab("calendar");
      setMonthSubTab("calendar");
      setView("yearly");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setYearFading(false);
        });
      });
    }, 280);
  }, [year]);
  const tab = TAB_COLORS[tabColor];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* 🔳🔳🔳 PERSISTENT STORAGE 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳 */
  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem("dollhouse-data");
        if (raw) {
          const parsed = JSON.parse(raw);
          setStore(parsed.store || {});
          setTabColor(parsed.tabColor || "Mocha");
          setWeekStart(parsed.weekStart || "monday");
          if (parsed.unlocked) setUnlocked(true);
          if (parsed.customPassword) setCustomPassword(parsed.customPassword);
          if (parsed.stickerSizes) setStickerSizes(parsed.stickerSizes);
          if (parsed.stickerRotations) setStickerRotations(parsed.stickerRotations);
          if (parsed.darkMode !== undefined) setDarkMode(parsed.darkMode);
        }
      } catch(e) {}
      setStorageReady(true);
    };
    load();
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    const save = () => {
      try {
        localStorage.setItem("dollhouse-data", JSON.stringify({ store, tabColor, weekStart, unlocked, customPassword, stickerSizes, stickerRotations, darkMode }));
        setSaveIndicator(true);
        setTimeout(() => setSaveIndicator(false), 1200);
      } catch(e) {}
    };
    const timer = setTimeout(save, 400);
    return () => clearTimeout(timer);
  }, [store, tabColor, weekStart, unlocked, customPassword, stickerSizes, stickerRotations, darkMode, storageReady]);

  const get = key => store[`${year}:${key}`] ?? "";
  const set = (key, val) => setStore(p => ({ ...p, [`${year}:${key}`]: val }));

  /* 🔳🔳🔳 ANIMATED VIEW TRANSITION 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳 */
  const navigate = (newView) => {
    if (newView === view) return;
    setPrevView(view);
    setFading(true);
    if (isMobile) setSidebarOpen(false);
    setTimeout(() => {
      setView(newView);
      setFading(false);
    }, 160);
  };
  const goBack = () => { if (prevView) navigate(prevView); };

  /* 🔳🔳🔳 EXPORT / BACKUP 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳 */
  const exportData = () => {
    const data = { store, tabColor, weekStart, customPassword, exportedAt: new Date().toISOString(), version: "dollhouse-2026" };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `dollhouse-backup-${new Date().toISOString().slice(0,10)}.json`; a.click();
    URL.revokeObjectURL(url);
  };
  const importData = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (parsed.store) setStore(parsed.store);
        if (parsed.tabColor) setTabColor(parsed.tabColor);
        if (parsed.weekStart) setWeekStart(parsed.weekStart);
        if (parsed.customPassword) setCustomPassword(parsed.customPassword);
      } catch(err) { alert("Could not read backup file. Make sure it's a valid Dollhouse backup."); }
    };
    reader.readAsText(file);
  };

  /* 🔳🔳🔳 UNDO STICKER 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳 */
  const pushHistory = (pageKey, stickers) => {
    setStickerHistory(h => ({ ...h, [pageKey]: [...(h[pageKey]||[]).slice(-19), stickers] }));
  };
  const undoSticker = (pageKey) => {
    const hist = stickerHistory[pageKey] || [];
    if (!hist.length) return;
    const prev = hist[hist.length - 1];
    setPlacedStickers(p => ({ ...p, [pageKey]: prev }));
    setStickerHistory(h => ({ ...h, [pageKey]: (h[pageKey]||[]).slice(0,-1) }));
  };

  /* 🔳🔳🔳 KEYBOARD SHORTCUTS 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳 */
  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable) return;
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        const pageKey = view + (view==="monthly"?selectedMonth:"") + (view==="daily"?dk:"") + (view==="weekly"?currentWeek:"");
        undoSticker(pageKey);
        return;
      }
      switch(e.key) {
        case "s": case "S": if (!e.metaKey && !e.ctrlKey) setShowStickerTray(p=>!p); break;
        case "t": case "T": if (!e.metaKey && !e.ctrlKey && view==="daily") { setSelectedDay(new Date()); navigate("daily"); } break;
        case "p": case "P": if (!e.metaKey && !e.ctrlKey && view==="daily") setPomodoroActive(p=>!p); break;
        case "?": setShowShortcuts(p=>!p); break;
        case "Escape": setShowSearch(false); setShowStickerTray(false); setShowShortcuts(false); break;
        case "ArrowLeft": if (view==="weekly") setCurrentWeek(w=>Math.max(0,w-1)); break;
        case "ArrowRight": if (view==="weekly") setCurrentWeek(w=>Math.min(51,w+1)); break;
        default: break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [view, selectedMonth, currentWeek]);

  /* 🔳🔳🔳 POMODORO TIMER TICK 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳 */
  useEffect(() => {
    if (pomodoroActive) {
      pomodoroRef.current = setInterval(() => {
        setPomodroSecs(s => {
          if (s <= 1) {
            setPomodoroMode(m => {
              const next = m === "focus" ? "break" : "focus";
              setPomodroSecs(next === "focus" ? 25*60 : 5*60);
              if (m === "focus") setPomodoroCount(c => c+1);
              return next;
            });
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(pomodoroRef.current);
    }
    return () => clearInterval(pomodoroRef.current);
  }, [pomodoroActive]);

  /* 🔳🔳🔳 STICKER TEXT CONTRAST HELPER 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳 */
  const stickerTextColor = (hex = "") => {
    const h = hex.replace("#", "").slice(0,6);
    if (h.length < 6) return "#2a1a0e";
    const r = parseInt(h.slice(0,2),16);
    const g = parseInt(h.slice(2,4),16);
    const b = parseInt(h.slice(4,6),16);
    const lum = 0.29*r + 0.587*g + 0.114*b;
    return lum > 148 ? "#2a1a0e" : "#ffffff";
  };

  /* 🔳🔳🔳 BRAND TOKENS 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳 */
  const B = darkMode ? {
    cream:    "#1a1a1a",
    white:    "#222222",
    espresso: "#f0ede8",
    mocha:    "#aaaaaa",
    blush:    "#888888",
    border:   "#333333",
    rose:     "#d3b3b3",
  } : {
    cream:   "#ffffff",
    white:   "#ffffff",
    espresso:"#1a1a1a",
    mocha:   "#888888",
    blush:   "#aaaaaa",
    border:  "#ebebeb",
    rose:    "#d3b3b3",
  };

  /* 🔳🔳🔳 SHARED STYLES 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳 */
  const css = {
    app: { fontFamily: "'Cormoran Garamond','Georgia',serif", background: darkMode?"#141414":"#fafafa", minHeight: "100vh", display: "flex", flexDirection: "column" },
    header: { background: darkMode?"#1a1a1a":"#fff", borderBottom:`1px solid ${B.border}`, padding: isMobile?"0 10px":"0 28px", display:"flex", alignItems:"center", gap: isMobile?"8px":"20px", height: isMobile?"48px":"58px", position:"sticky", top:0, zIndex:200 },
    logo: { display:"flex", alignItems:"center", gap:"8px", textDecoration:"none", whiteSpace:"nowrap" },
    divider: { width:"1px", height:"22px", background:B.border, display: isMobile?"none":"block" },
    navBtn: a => ({ background:"none", border:"none", cursor:"pointer", padding: isMobile?"0 10px":"6px 12px", fontSize: isMobile?"8px":"10px", letterSpacing:"0.16em", fontFamily:"'Cormoran Garamond',serif", color: a?B.espresso:"#aaa", borderBottom: a?`1.5px solid ${B.espresso}`:`1.5px solid transparent`, transition:"all 0.2s", fontWeight: a?"600":"400", textTransform:"uppercase", minHeight:"44px", display:"inline-flex", alignItems:"center", WebkitTapHighlightColor:"transparent", touchAction:"manipulation" }),
    main: { display:"flex", flex:1, flexDirection: isMobile?"column":"row" },
    sidebar: isMobile ? { width: sidebarOpen?"100%":"0", height: sidebarOpen?"auto":"0", overflow:"hidden", background: darkMode?"#1a1a1a":"#fff", borderBottom: sidebarOpen?`1px solid ${B.border}`:"none", transition:"all 0.3s ease", display:"flex", flexDirection:"column", position: sidebarOpen?"relative":"absolute", zIndex:150 } : { width: sidebarOpen?"220px":"0", minWidth: sidebarOpen?"220px":"0", overflow:"hidden", background: darkMode?"#1a1a1a":"#fff", borderRight:`1px solid ${B.border}`, transition:"all 0.3s ease", display:"flex", flexDirection:"column" },
    sidebarInner: { padding: isMobile?"16px 0":"24px 0", width: isMobile?"100%":"220px" },
    sbLabel: { fontSize:"9px", letterSpacing:"0.18em", color:"#bbb", textTransform:"uppercase", padding:"0 22px", marginBottom:"8px", display:"block", fontFamily:"'Cormoran Garamond',serif" },
    sbBtn: a => ({ display: isMobile?"inline-flex":"flex", width: isMobile?"auto":"100%", textAlign:"left", background: a?"#f7f7f7":"none", border:"none", padding: isMobile?"0 14px":"0 22px", fontSize: isMobile?"12px":"13px", color: a?B.espresso:"#999", cursor:"pointer", letterSpacing:"0.03em", fontFamily:"'Cormoran Garamond',serif", borderLeft: isMobile?"none":(a?`2px solid ${tab.bg}`:`2px solid transparent`), borderBottom: isMobile?(a?`2px solid ${tab.bg}`:`2px solid transparent`):"none", transition:"all 0.12s", minHeight:"44px", alignItems:"center", WebkitTapHighlightColor:"transparent", touchAction:"manipulation" }),
    sbSection: { marginBottom: isMobile?"12px":"22px", ...(isMobile ? { display:"flex", flexWrap:"wrap", gap:"2px", padding:"0 12px" } : {}) },
    content: { flex:1, padding: isMobile?"16px 12px":"40px 52px", overflowY:"auto", maxWidth: isMobile?"100%":"1060px" },
    pageTitle: { fontFamily:"'Cormoran Garamond',serif", fontStyle:"italic", fontSize: isMobile?"24px":"36px", color:B.espresso, marginBottom:"4px", fontWeight:"300", letterSpacing:"0.02em" },
    subtitle: { fontSize:"10px", letterSpacing:"0.18em", color:"#bbb", textTransform:"uppercase", marginBottom:"30px", fontFamily:"'Cormoran Garamond',serif" },
    card: { background: darkMode?"#1e1e1e":"#fff", border:`1px solid ${B.border}`, borderRadius:"0", padding:"22px 26px", marginBottom:"14px" },
    secTitle: { fontSize:"9px", letterSpacing:"0.2em", color:"#bbb", textTransform:"uppercase", marginBottom:"14px", fontFamily:"'Cormoran Garamond',serif" },
    inp: { width:"100%", border:"none", borderBottom:`1px solid #ebebeb`, padding:"7px 0", fontSize:"14px", fontFamily:"'Cormoran Garamond',serif", color:B.espresso, background:"transparent", outline:"none", boxSizing:"border-box" },
    ta: (h=80) => ({ width:"100%", border:"none", borderBottom:`1px solid #ebebeb`, padding:"7px 0", fontSize:"14px", fontFamily:"'Cormoran Garamond',serif", color:B.espresso, background:"transparent", outline:"none", resize:"none", boxSizing:"border-box", lineHeight:"1.9", height:`${h}px` }),
    pill: a => ({ background: a?tab.bg:"transparent", color: a?tab.text:"#888", border:`1px solid ${a?tab.bg:"#ddd"}`, borderRadius:"2px", padding:"5px 14px", fontSize:"9px", letterSpacing:"0.12em", cursor:"pointer", fontFamily:"'Cormoran Garamond',serif", textTransform:"uppercase", transition:"all 0.15s", minHeight:"44px", display:"inline-flex", alignItems:"center", WebkitTapHighlightColor:"transparent", touchAction:"manipulation" }),
    dot: (c, a) => ({ width:"17px", height:"17px", borderRadius:"50%", background:TAB_COLORS[c].bg, border: a?`2px solid ${B.espresso}`:`1px solid ${B.border}`, cursor:"pointer", transition:"transform 0.15s", transform: a?"scale(1.25)":"scale(1)", flexShrink:0 }),
    checkbox: { width:"20px", height:"20px", border:`1px solid #ddd`, borderRadius:"2px", flexShrink:0, cursor:"pointer", minWidth:"20px", minHeight:"20px" },
    star: (filled) => ({ cursor:"pointer", fontSize:"18px", color: filled?tab.bg:"#ddd", marginRight:"2px", minWidth:"28px", minHeight:"28px", display:"inline-flex", alignItems:"center", justifyContent:"center", WebkitTapHighlightColor:"transparent" }),
    calDay: (tod, sel, other) => ({ aspectRatio:"1", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px", color: other?"#e0e0e0":(tod?tab.text:B.espresso), background: tod?tab.bg:"transparent", border: sel?`2px solid ${tab.bg}80`:`2px solid transparent`, cursor: other?"default":"pointer", borderRadius:"50%", transition:"all 0.12s", fontSize: isMobile?"10px":"12px", padding: isMobile?"2px":"3px", fontFamily:"'Cormoran Garamond',serif", fontWeight: (tod||sel)?"600":"normal", minHeight:"36px", WebkitTapHighlightColor:"transparent", touchAction:"manipulation" }),
    calHead: { fontSize:"9px", letterSpacing:"0.1em", color:"#ccc", textAlign:"center", padding:"5px 0", textTransform:"uppercase" },
    row: { display:"flex", alignItems:"center", gap:"10px", marginBottom:"8px" },
    subTab: a => ({ background:"none", border:"none", cursor:"pointer", padding:"0 12px", fontSize:"9px", letterSpacing:"0.14em", color: a?B.espresso:"#aaa", borderBottom: a?`1.5px solid ${B.espresso}`:`1.5px solid transparent`, fontFamily:"'Cormoran Garamond',serif", textTransform:"uppercase", transition:"all 0.2s", fontWeight: a?"600":"400", minHeight:"44px", display:"inline-flex", alignItems:"center", WebkitTapHighlightColor:"transparent", touchAction:"manipulation" }),
  };

  const today = new Date();
  const isToday = d => d && d.getFullYear()===today.getFullYear() && d.getMonth()===today.getMonth() && d.getDate()===today.getDate();

  /* 🔳🔳🔳 HELPERS 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳 */
  const CalGrid = ({ month, year: yr, small, onDayClick }) => {
    const days = getDaysInMonth(month, yr);
    const first = weekStart==="sunday"
      ? new Date(yr,month,1).getDay()      // Sun=0…Sat=6
      : getFirstDayMon(month, yr);         // Mon=0…Sun=6
    const cells = Array(first).fill(null);
    for (let d=1; d<=days; d++) cells.push(d);
    const hdrs = weekStart==="sunday"?["S","M","T","W","T","F","S"]:["M","T","W","T","F","S","S"];
    return (
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"1px" }}>
        {hdrs.map((h,i)=><div key={i} style={css.calHead}>{h}</div>)}
        {cells.map((d,i)=>{
          const date = d?new Date(yr,month,d):null;
          const sel = selectedDay && date && selectedDay.getTime()===date.getTime();
          return (
            <div key={i} style={{ ...css.calDay(date&&isToday(date), sel, !d), fontSize: small?"10px":"11px", padding: small?"2px":"3px" }}
              onClick={()=>{ if(d&&onDayClick) onDayClick(new Date(yr,month,d)); }}>
              {d||""}
            </div>
          );
        })}
      </div>
    );
  };

  const StarRating = ({ storeKey, max=5 }) => {
    const val = parseInt(get(storeKey)|"0");
    return (
      <div style={{ display:"flex" }}>
        {Array.from({length:max},(_,i)=>(
          <span key={i} style={css.star(i<val)} onClick={()=>set(storeKey, String(i+1))}>⭐</span>
        ))}
      </div>
    );
  };

  const getWeekDates = (wi) => {
    const jan1 = new Date(year,0,1);
    const offset = weekStart==="monday"?(jan1.getDay()===0?-6:1-jan1.getDay()):-jan1.getDay();
    const start = new Date(year,0,1+offset+wi*7);
    return Array.from({length:7},(_,i)=>{ const d=new Date(start); d.setDate(start.getDate()+i); return d; });
  };

  const weekDates = getWeekDates(currentWeek);
  const wk = `w${currentWeek}`;
  const mk = `m${selectedMonth}`;
  const dk = selectedDay ? `d${selectedDay.getFullYear()}-${selectedDay.getMonth()}-${selectedDay.getDate()}` : "d0";

  /* 🔳🔳🔳 INDEX PAGE 🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳🔳 */
  const IndexView = () => (
    <div>
      <div style={css.pageTitle}>Index</div>
      <div style={css.subtitle}>the Dollhouse © {year} Planner</div>
      <div style={{ display:"grid", gridTemplateColumns: isMobile?"1fr":"1fr 1fr 1fr", gap:"16px" }}>
        {/* How to Use */}
        <div style={{ ...css.card, gridColumn:"1 / -1", background: darkMode?"#1e1e1e":tab.bg+"12", border:`1px solid ${tab.bg}30` }}>
          <div style={{ display:"flex", alignItems:"center", gap:"16px", flexWrap:"wrap" }}>
            <div style={{ ...css.secTitle, marginBottom:0, color:tab.bg }}>How to Use Your Planner</div>
            <div style={{ display:"flex", gap:"20px", flexWrap:"wrap", flex:1 }}>
              {[
                ["📱", "Open in Browser", "Works in Chrome, Safari, Firefox – bookmark this page for daily access."],
                ["🎯", "iPad & Tablet", "Open in Safari/Chrome on iPad. Add to Home Screen for a full-screen app experience."],
                ["🖨️", "Print Pages", "Use browser Print (Ctrl+P / Cmd+P) on any page. Set to landscape for weekly views."],
                ["💾", "Auto-Saves", "All your entries save automatically to this browser. Use the same device for continuity."],
              ].map(([icon,title,desc])=>(
                <div key={title} style={{ display:"flex", gap:"8px", alignItems:"flex-start", minWidth:"180px", flex:1 }}>
                  <span style={{ fontSize:"16px" }}>{icon}</span>
                  <div>
                    <div style={{ fontSize:"11px", fontWeight:"600", color:B.espresso, letterSpacing:"0.04em", marginBottom:"2px" }}>{title}</div>
                    <div style={{ fontSize:"12px", color:B.mocha, lineHeight:1.5 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Monthly progress */}
        {((()=>{
          const now = new Date();
          const curMonth = now.getMonth();
          const curDay = now.getDate();
          const daysInCur = getDaysInMonth(curMonth, year);
          const habitsCount = Array.from({length:8},(_, hi)=>
            Array.from({length:curDay},(_, di)=>get(`habit-${curMonth}-${hi}-${di}`)=="1").filter(Boolean).length
          ).reduce((a,b)=>a+b,0);
          const waterDays = Array.from({length:curDay},(_, di)=>parseInt(get(`water-${curMonth}-${di}`))||0).filter(v=>v>=8).length;
          const scDays = Array.from({length:curDay},(_, di)=>
            ["journaled","moved","outside","connected","nourished","hydrated","rested","mindful","creative","grateful"]
            .some(k=>get(`sc-${curMonth}-${di}-${k}`)=="1") ? 1 : 0
          ).filter(Boolean).length;
          return (
            <div style={{ ...css.card, gridColumn:"1 / -1" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"14px" }}>
                <div style={{ fontSize:"13px", letterSpacing:"0.1em", color:"#1a1a1a", textTransform:"uppercase" }}>Monthly Progress</div>
                <span style={{ fontSize:"12px", color:B.mocha, fontStyle:"italic" }}>Day {curDay} of {daysInCur}</span>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"20px" }}>
                {[
                  ["Habit completions", habitsCount, curDay*8, "💚"],
                  ["Days at water goal", waterDays, curDay, "💧"],
                  ["Self-care check-ins", scDays, curDay, "🧘"],
                ].map(([label,val,max,icon])=>{
                  const pct = max>0?Math.min(Math.round(val/max*100),100):0;
                  return (
                    <div key={label}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                        <span style={{ fontSize:"13px", color:B.espresso }}>{icon} {label}</span>
                        <span style={{ fontSize:"13px", fontWeight:"600", color:tab.bg }}>{pct}%</span>
                      </div>
                      <div style={{ height:"5px", background:B.border, borderRadius:"3px" }}>
                        <div style={{ height:"100%", width:`${pct}%`, background:tab.bg, borderRadius:"3px", transition:"width 0.6s ease" }}/>
                      </div>
                      <div style={{ fontSize:"11px", color:"#bbb", marginTop:"4px" }}>{val} / {max}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })())}
        <div style={css.card}>
          <div style={css.secTitle}>Planning</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:"0" }}>
            {[[`${year} Overview`,"yearly"],["Quarterly","quarterly"],["Monthly","monthly"],["Weekly","weekly"],["Daily","daily"],["Projects","projects"],["Meal Planner","meals"],["Shopping","shopping"]].map(([label,v])=>(
              <div key={v} style={{ ...css.row, justifyContent:"space-between", borderBottom:"1px solid #f5f5f5", paddingBottom:"7px", cursor:"pointer" }} onClick={()=>navigate(v)}>
                <span style={{ fontSize:"14px", color:B.espresso }}>{label}</span>
                <span style={{ fontSize:"14px", color:tab.bg }}>‹</span>
              </div>
            ))}
          </div>
        </div>
        <div style={css.card}>
          <div style={css.secTitle}>Wellness & Tracking</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:"0" }}>
            {[["Goals","goals"],["Habits","habits"],["Mood Tracker","mood"],["Energy Tracker","energy"],["Sleep Tracker","sleep"],["Water Tracker","water"],["Self-Care","selfcare"],["Medication","medication"],["Period Tracker","period"],["Year in Pixels","pixels"]].map(([label,v])=>(
              <div key={v} style={{ ...css.row, justifyContent:"space-between", borderBottom:"1px solid #f5f5f5", paddingBottom:"7px", cursor:"pointer" }} onClick={()=>navigate(v)}>
                <span style={{ fontSize:"14px", color:B.espresso }}>{label}</span>
                <span style={{ fontSize:"14px", color:tab.bg }}>‹</span>
              </div>
            ))}
          </div>
        </div>
        <div style={css.card}>
          <div style={css.secTitle}>Life</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:"0" }}>
            {[["Gratitude Log","gratitude"],["Reading Log","reading"],["Finance Tracker","finance"],["Contacts","contacts"],["Birthdays","birthdays"],["Brain Dump","braindump"],["Bucket List","bucket"],["Vision Board","vision"]].map(([label,v])=>(
              <div key={v} style={{ ...css.row, justifyContent:"space-between", borderBottom:"1px solid #f5f5f5", paddingBottom:"7px", cursor:"pointer" }} onClick={()=>navigate(v)}>
                <span style={{ fontSize:"14px", color:B.espresso }}>{label}</span>
                <span style={{ fontSize:"14px", color:tab.bg }}>‹</span>
              </div>
            ))}
          </div>
        </div>
        <div style={css.card}>
          <div style={css.secTitle}>Notes & Extras</div>
          {[["Notes","notes"],["Custom Sections","sections"],["Settings","settings"]].map(([label,v])=>(
            <div key={v} style={{ ...css.row, justifyContent:"space-between", borderBottom:"1px solid #f5f5f5", paddingBottom:"7px", cursor:"pointer" }} onClick={()=>navigate(v)}>
              <span style={{ fontSize:"14px", color:B.espresso }}>{label}</span>
              <span style={{ fontSize:"14px", color:tab.bg }}>‹</span>
            </div>
          ))}
          <div style={{ marginTop:"16px" }}>
            <div style={css.secTitle}>Notes Templates</div>
            <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
              {["Lined","Grid","Dotted","To Do","Cornell","Blank"].map(t=>(
                <div key={t} style={{ fontSize:"12px", color:B.espresso, cursor:"pointer", padding:"4px 10px", border:"1px solid #ebebeb", borderRadius:"2px" }}
                  onClick={()=>{setNoteTemplate(t.toLowerCase().replace(" ","")); navigate("notes");}}>
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={css.card}>
          <div style={css.secTitle}>Custom Sections</div>
          {Array.from({length:10},(_,i)=>(
            <div key={i} style={{ ...css.row, justifyContent:"space-between", borderBottom:"1px solid #f5f5f5", paddingBottom:"6px", cursor:"pointer" }} onClick={()=>{setNoteSection(i); navigate("sections");}}>
              <input style={{ ...css.inp, borderBottom:"none", fontSize:"14px", width:"80%" }} placeholder={`Section ${i+1}`} value={get(`secname${i}`)} onChange={e=>set(`secname${i}`,e.target.value)} onClick={e=>e.stopPropagation()}/>
              <span style={{ fontSize:"14px", color:tab.bg }}>‹</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  /* === SECTIONS VIEW === */
  const SectionsView = () => {
    const [sectionTexts, setSectionTexts] = useState({});
    const saveTimeoutRef = useRef(null);

    const handleInputChange = (sectionId, value) => {
      setSectionTexts(p => ({ ...p, [sectionId]: value }));
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        set(`section${sectionId}`, value);
      }, 500);
    };

    useEffect(() => {
      setSectionTexts({
        0: get("section0"),
        1: get("section1"),
        2: get("section2"),
        3: get("section3"),
        4: get("section4"),
        5: get("section5"),
        6: get("section6"),
        7: get("section7"),
        8: get("section8"),
        9: get("section9"),
      });
    }, [year]);

    return (
      <div>
        <div style={css.pageTitle}>{get(`secname${noteSection}`)||`Section ${noteSection+1}`}</div>
        <div style={css.subtitle}>Custom Section</div>
        <div style={css.card}>
          <textarea
            style={{ ...css.ta(300), fontSize: "14px" }}
            placeholder="Write here..."
            value={sectionTexts[noteSection]||""}
            onChange={e => handleInputChange(noteSection, e.target.value)}
          />
        </div>
      </div>
    );
  };

  /* render view */
  const renderView = () => {
    switch(view) {
      case "cover": return (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flex:1, gap:"20px" }}>
          <div style={{ fontFamily:"'Cormoran Garamond',serif", fontSize:"48px", fontStyle:"italic", color:B.espresso, textAlign:"center" }}>the Dollhouse Planner © {year}</div>
          <div style={{ fontSize:"14px", color:B.mocha, textAlign:"center", maxWidth:"400px" }}>A comprehensive planner designed for planning, tracking, and living intentionally.<br/><br/>Perfect for digital or printable use.</div>
          <div style={{ display:"flex", gap:"12px" }}>
            <button onClick={()=>navigate("index")} style={{ ...css.pill(false), background:tab.bg, color:tab.text }}>Enter Planner</button>
            <button onClick={()=>setShowShortcuts(true)} style={css.pill(false)}>?</button>
          </div>
          <div style={{ marginTop:"40px", fontSize:"11px", color:"#bbb", textAlign:"center" }}>💾 All data saves locally. No ads, no tracking.</div>
        </div>
      );
      case "index": return <IndexView/>;
      case "sections": return <SectionsView/>;
      default: return <div style={css.pageTitle}>Page not found</div>;
    }
  };

  return (
    <div style={css.app}>
      <header style={css.header}>
        <div style={css.logo}>
          <span style={{ fontSize:"18px" }}>📖</span>
          <span style={{ fontSize:"14px", fontWeight:"600", color:B.espresso, fontFamily:"'Cormoran Garamond',serif" }}>Dollhouse</span>
        </div>
        <div style={css.divider}/>
        {["index","yearly","quarterly","monthly","weekly","daily"].map(v=>(
          <button key={v} style={css.navBtn(view===v)} onClick={()=>navigate(v)}>
            {v}
          </button>
        ))}
        <div style={{ marginLeft:"auto", display:"flex", gap:"8px", alignItems:"center" }}>
          <button onClick={()=>setDarkMode(p=>!p)} style={css.navBtn(false)} title="Dark Mode">
            {darkMode?"☀️":"🌙"}
          </button>
          <button onClick={()=>setSidebarOpen(p=>!p)} style={css.navBtn(sidebarOpen)} title="Menu">
            {sidebarOpen?"✕":"☰"}
          </button>
        </div>
      </header>

      <div style={css.main}>
        <aside style={css.sidebar}>
          <div style={css.sidebarInner}>
            <div style={css.sbLabel}>Color Theme</div>
            <div style={css.sbSection}>
              {Object.keys(TAB_COLORS).map(c=>(
                <button key={c} style={{ ...css.pill(tabColor===c), padding:"3px 8px", fontSize:"8px" }} onClick={()=>setTabColor(c)}>{c}</button>
              ))}
            </div>

            <div style={css.sbLabel}>Year</div>
            <div style={css.sbSection}>
              {[2026,2027,2028].map(y=>(
                <button key={y} style={{ ...css.pill(year===y), padding:"3px 8px", fontSize:"8px" }} onClick={()=>setYear(y)}>{y}</button>
              ))}
            </div>

            <div style={css.sbLabel}>Data</div>
            <div style={css.sbSection}>
              <button onClick={exportData} style={{ ...css.pill(false), padding:"3px 8px", fontSize:"8px", width:"100%" }}>Export</button>
              <label style={{ ...css.pill(false), padding:"3px 8px", fontSize:"8px", width:"100%", cursor:"pointer" }}>
                Import
                <input type="file" accept=".json" onChange={importData} style={{ display:"none" }}/>
              </label>
            </div>

            <div style={css.sbLabel}>Settings</div>
            <div style={css.sbSection}>
              <label style={{ fontSize:"11px", display:"flex", alignItems:"center", gap:"8px", cursor:"pointer", padding:"4px 0" }}>
                <input type="checkbox" checked={weekStart==="sunday"} onChange={()=>setWeekStart(weekStart==="sunday"?"monday":"sunday")} style={{ width:"16px", height:"16px" }}/>
                Start week on Sunday
              </label>
            </div>
          </div>
        </aside>

        <main style={css.content}>
          <div style={{ opacity: fading?0.5:1, transition:"opacity 0.16s" }}>
            {renderView()}
          </div>
          {saveIndicator && (
            <div style={{ position:"fixed", bottom:"20px", right:"20px", fontSize:"11px", color:tab.bg, fontStyle:"italic" }}>💾 Saved</div>
          )}
        </main>
      </div>
    </div>
  );
}
