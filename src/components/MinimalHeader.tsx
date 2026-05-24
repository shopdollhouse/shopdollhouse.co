const MinimalHeader = () => (
  <header
    aria-label="The Dollhouse"
    className="sticky top-0 z-50 bg-dollhouse-p0/97 backdrop-blur-md shadow-sm py-4"
  >
    <div className="max-w-[1100px] mx-auto px-6 flex items-center">
      <a
        href="/"
        className="font-display italic text-dollhouse-ink no-underline flex flex-col items-start leading-tight"
      >
        <span className="text-[9px] tracking-[4px] text-dollhouse-text-light font-normal">the</span>
        <span className="text-[15px] tracking-[4px] uppercase">Dollhouse</span>
      </a>
    </div>
  </header>
);

export default MinimalHeader;
