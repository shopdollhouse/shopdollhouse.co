import { useState } from "react";
import { X, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AnnouncementBar = () => {
  const [visible, setVisible] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError("Enter your name"); return; }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Enter a valid email"); return; }
    const entry = { name: name.trim(), email: email.trim(), date: new Date().toISOString(), result: null, source: "announcement-bar" };
    const existing = JSON.parse(localStorage.getItem("dh_quiz_leads") || "[]");
    existing.push(entry);
    localStorage.setItem("dh_quiz_leads", JSON.stringify(existing));
    const oldLeads = JSON.parse(localStorage.getItem("quizLeads") || "[]");
    oldLeads.push({ email: email.trim(), name: name.trim(), source: "announcement-bar", timestamp: new Date().toISOString() });
    localStorage.setItem("quizLeads", JSON.stringify(oldLeads));
    navigate("/quiz");
  };

  if (!visible) return null;

  return (
    <div className="relative bg-dollhouse-ink text-card py-2.5 px-10 text-center z-[60]">
      {!showForm ? (
        <p className="font-accent text-[9px] tracking-[3px] uppercase m-0">
          <Heart size={10} className="inline text-dollhouse-p3 fill-dollhouse-p3 -mt-0.5" />
          {" "}Free Brand Clarity Quiz — Find out what's holding your brand back{" "}
          <button
            onClick={() => setShowForm(true)}
            className="text-dollhouse-p3 bg-transparent border-none cursor-pointer font-accent text-[9px] tracking-[3px] uppercase font-semibold border-b border-dollhouse-p3/40 pb-px hover:border-dollhouse-p3 transition-colors ml-1"
          >
            Take it now →
          </button>
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex items-center justify-center gap-2 flex-wrap">
          <input
            type="text"
            placeholder="First name"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(""); }}
            className="px-3 py-1.5 rounded-md text-[11px] font-display text-dollhouse-ink bg-card border border-card/20 outline-none w-[120px]"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            className="px-3 py-1.5 rounded-md text-[11px] font-display text-dollhouse-ink bg-card border border-card/20 outline-none w-[160px]"
          />
          <button
            type="submit"
            className="px-4 py-1.5 rounded-md bg-dollhouse-gold text-dollhouse-ink font-accent text-[8px] tracking-[2px] uppercase font-bold border-none cursor-pointer hover:opacity-90 transition-opacity"
          >
            Start Quiz →
          </button>
          {error && <span className="text-[10px] text-red-300">{error}</span>}
        </form>
      )}
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-card/60 cursor-pointer hover:text-card transition-colors p-1"
        aria-label="Close announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default AnnouncementBar;
