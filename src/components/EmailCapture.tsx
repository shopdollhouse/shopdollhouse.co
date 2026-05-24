import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailCapture = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const clearError = () => { if (error) setError(""); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Please enter your first name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    // Save to quiz leads (same key the quiz uses) so quiz skips email step
    const entry = { name: name.trim(), email: email.trim(), date: new Date().toISOString(), result: null, source: "homepage" };
    const existing = JSON.parse(localStorage.getItem("dh_quiz_leads") || "[]");
    existing.push(entry);
    localStorage.setItem("dh_quiz_leads", JSON.stringify(existing));
    // Also save to quizLeads for backward compat
    const oldLeads = JSON.parse(localStorage.getItem("quizLeads") || "[]");
    oldLeads.push({ email: email.trim(), name: name.trim(), source: "homepage", timestamp: new Date().toISOString() });
    localStorage.setItem("quizLeads", JSON.stringify(oldLeads));
    navigate("/quiz");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label className="block text-left font-accent text-[9px] tracking-[2.5px] uppercase text-dollhouse-text-light mb-2">
        Enter your details to start the quiz
      </label>
      <div className="flex flex-col gap-2.5">
        <input
          type="text"
          placeholder="First name"
          value={name}
          onChange={(e) => { setName(e.target.value); clearError(); }}
          className="w-full px-4 py-3.5 border border-dollhouse-p3/35 rounded-lg font-display text-[14px] text-dollhouse-ink bg-card outline-none focus:border-dollhouse-p3 transition-colors placeholder:text-dollhouse-text-light"
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => { setEmail(e.target.value); clearError(); }}
          className="w-full px-4 py-3.5 border border-dollhouse-p3/35 rounded-lg font-display text-[14px] text-dollhouse-ink bg-card outline-none focus:border-dollhouse-p3 transition-colors placeholder:text-dollhouse-text-light"
        />
        <button
          type="submit"
          className="w-full font-accent text-[10px] tracking-[2.5px] uppercase px-6 py-3.5 bg-dollhouse-ink text-card rounded-lg border-none cursor-pointer font-medium whitespace-nowrap hover:opacity-90 transition-opacity"
        >
          Start the Quiz →
        </button>
      </div>
      {error && (
        <p className="text-left text-[12px] text-destructive mt-2">{error}</p>
      )}
      <p className="mt-4 text-center font-accent text-[8px] tracking-[3px] uppercase text-dollhouse-text-light">
        No spam · Unsubscribe anytime
      </p>
    </form>
  );
};

export default EmailCapture;
