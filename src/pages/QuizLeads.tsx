import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface LeadEntry {
  name: string;
  email: string;
  date: string;
  result: string | null;
}

const QuizLeads = () => {
  const [leads, setLeads] = useState<LeadEntry[]>([]);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("dh_quiz_leads") || "[]");
      setLeads(data);
    } catch {
      setLeads([]);
    }
  }, []);

  const handleCopyCSV = () => {
    const header = "Name,Email,Date,Result";
    const rows = leads.map(
      (l) => `${l.name || ""},${l.email || ""},${l.date},${l.result || ""}`
    );
    const csv = [header, ...rows].join("\n");
    navigator.clipboard.writeText(csv);
  };

  const handleClearAll = () => {
    if (!window.confirm("Clear all quiz leads? This cannot be undone.")) return;
    localStorage.removeItem("dh_quiz_leads");
    setLeads([]);
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, hsl(18 55% 95%) 0%, hsl(20 60% 98%) 40%, hsl(0 0% 100%) 100%)" }}>
      <nav className="sticky top-0 z-50 bg-dollhouse-p0/95 backdrop-blur-sm border-b border-dollhouse-p3/15 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display italic text-dollhouse-ink no-underline flex flex-col items-start leading-tight">
          <span className="text-[9px] tracking-[4px] text-dollhouse-text-light font-normal">the</span>
          <span className="text-[15px] tracking-[4px] uppercase">Dollhouse</span>
        </Link>
        <Link to="/" className="font-accent text-[9px] tracking-[3px] uppercase text-dollhouse-text-light hover:text-dollhouse-ink transition-colors no-underline">
          &larr; Back to Home
        </Link>
      </nav>

      <div className="max-w-[800px] mx-auto px-6 py-12">
        <h1 className="font-display italic font-normal text-dollhouse-ink text-[clamp(28px,4vw,44px)] mb-2">
          Quiz Leads
        </h1>
        <p className="text-[13px] text-dollhouse-text-light font-light mb-8">
          {leads.length} {leads.length === 1 ? "entry" : "entries"} collected
        </p>

        <div className="flex gap-3 mb-8">
          <button
            onClick={handleCopyCSV}
            disabled={leads.length === 0}
            className="bg-dollhouse-ink text-card rounded-pill font-accent text-[10px] tracking-[3px] uppercase font-medium px-6 py-3 border-none cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-30 disabled:pointer-events-none"
          >
            Copy as CSV
          </button>
          <button
            onClick={handleClearAll}
            disabled={leads.length === 0}
            className="border border-dollhouse-p3/30 text-dollhouse-text-light rounded-pill font-accent text-[10px] tracking-[3px] uppercase px-6 py-3 bg-transparent cursor-pointer transition-colors hover:text-dollhouse-ink disabled:opacity-30 disabled:pointer-events-none"
          >
            Clear All
          </button>
        </div>

        {leads.length === 0 ? (
          <p className="text-[13px] text-dollhouse-text-light font-light italic">No leads collected yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {["Name", "Email", "Date", "Result"].map((h) => (
                    <th key={h} className="font-accent text-[9px] tracking-[3px] uppercase text-dollhouse-text-light font-semibold text-left py-3 px-3 border-b border-dollhouse-p2">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-dollhouse-p1"}>
                    <td className="text-[12px] text-dollhouse-text-mid py-3 px-3">{lead.name || "—"}</td>
                    <td className="text-[12px] text-dollhouse-text-mid py-3 px-3">{lead.email || "—"}</td>
                    <td className="text-[12px] text-dollhouse-text-mid py-3 px-3">
                      {lead.date ? new Date(lead.date).toLocaleDateString() : "—"}
                    </td>
                    <td className="font-display italic text-[13px] text-dollhouse-ink py-3 px-3">{lead.result || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizLeads;
