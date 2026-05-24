const TrustStrip = () => (
  <div className="py-6 px-6 max-w-[800px] mx-auto">
    <div className="flex flex-wrap justify-center gap-y-3 gap-x-6">
      {[
        { icon: "🔒", text: "Secure Checkout" },
        { icon: "⚡", text: "Instant Access" },
        { icon: "💳", text: "One-Time Payment" },
        { icon: "📱", text: "Any Device" },
        { icon: "🎨", text: "No Design Skills" },
      ].map((item) => (
        <div key={item.text} className="flex items-center gap-2">
          <span className="text-[14px]">{item.icon}</span>
          <span className="font-accent text-[8px] tracking-[2px] uppercase text-dollhouse-text-light font-medium whitespace-nowrap">
            {item.text}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default TrustStrip;
