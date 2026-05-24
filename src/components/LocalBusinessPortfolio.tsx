import { useEffect, useState } from "react";
import Eyebrow from "@/components/Eyebrow";
import { ChevronLeft, ChevronRight } from "lucide-react";

import portfolio3 from "@/assets/portfolio-local-business/portfolio-3.jpg";
import portfolio5 from "@/assets/portfolio-local-business/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-local-business/portfolio-6.jpg";
import portfolio9 from "@/assets/portfolio-local-business/portfolio-9.jpg";
import mandyPhoto from "@/assets/mandy-photo.jpg";

const portfolioItems = [
  portfolio5, // Jerk & Jollof — Event Branding & Promotion
  portfolio3, // CandiiShop — Merch Designs
  portfolio6, // Real Yardie — Merch & Merchandising
  portfolio9, // D'Addario — Promotional Campaigns & Email Marketing
];

const LocalBusinessPortfolio = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const selectedImage = portfolioItems[selectedIndex];
  const previousImage = () =>
    setSelectedIndex((current) => (current === 0 ? portfolioItems.length - 1 : current - 1));
  const nextImage = () =>
    setSelectedIndex((current) => (current === portfolioItems.length - 1 ? 0 : current + 1));

  useEffect(() => {
    if (!isExpanded) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsExpanded(false);
      if (event.key === "ArrowLeft") previousImage();
      if (event.key === "ArrowRight") nextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded]);

  return (
    <section className="px-6 pt-[60px] pb-20 max-w-[1320px] mx-auto">
      <div className="mb-12">
        <div className="text-center mb-8">
          <Eyebrow text="About Me + Portfolio" className="mb-4" />
          <h2 className="font-display italic font-normal text-dollhouse-ink text-[clamp(28px,4vw,44px)] leading-tight">
            Meet Mandy + View the Work
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-10 max-w-[900px] mx-auto">
          <div className="flex-shrink-0 w-[200px] h-[200px] rounded-full overflow-hidden border border-dollhouse-p3/35 mx-auto shadow-lg">
            <img
              src={mandyPhoto}
              alt="Mandy Fortune — founder of The Dollhouse"
              className="w-full h-full object-cover"
              style={{ objectPosition: "60% 52%" }}
            />
          </div>

          <div className="flex-1 min-w-[280px]">
            <p className="text-[14px] text-dollhouse-text-mid font-light leading-relaxed mb-4">
              I'm a Product Designer and brand strategist from the Greater Toronto Area — with 10+ years in graphic and product design, building brands for companies, creators, and entrepreneurs. My product design work has been recognized by BuzzFeed and HuffPost, and I've been in the design world long enough to know exactly what makes a brand stick.
            </p>
            <p className="text-[14px] text-dollhouse-text-mid font-light leading-relaxed mb-4">
              I built The Dollhouse because I kept seeing the same problem: talented people with incredible ideas, stuck because their brand didn't match their vision.
            </p>
            <p className="text-[13px] text-dollhouse-text-light font-light leading-relaxed">
              A look at the design style behind the creative work. Ads, social content, merch, websites, and brand visuals all work better when the business looks polished first.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioItems.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => {
              setSelectedIndex(index);
              setIsExpanded(true);
            }}
            aria-label={`Open portfolio sample ${index + 1} larger`}
            className="group overflow-hidden rounded-[22px] border border-dollhouse-p3/20 bg-[#f7f1ec] p-2 shadow-[0_18px_55px_rgba(60,45,39,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(60,45,39,0.12)]"
          >
            <img
              src={image}
              alt={`The Dollhouse Brand Studio portfolio sample ${index + 1}`}
              className="w-full aspect-video rounded-[16px] bg-card object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              loading={index < 4 ? "eager" : "lazy"}
            />
          </button>
        ))}
      </div>

      {isExpanded && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-dollhouse-ink/88 p-3 sm:p-6"
          onClick={() => setIsExpanded(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Portfolio sample ${selectedIndex + 1}`}
        >
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            aria-label="Close larger portfolio sample"
            className="absolute right-4 top-4 z-[101] inline-flex h-10 w-10 items-center justify-center rounded-full bg-card text-dollhouse-ink shadow-lg transition-opacity hover:opacity-80"
          >
            ×
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              previousImage();
            }}
            aria-label="View previous portfolio sample"
            className="absolute left-4 top-1/2 z-[101] inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-card/95 text-dollhouse-ink shadow-lg transition-opacity hover:opacity-80"
          >
            <ChevronLeft size={22} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              nextImage();
            }}
            aria-label="View next portfolio sample"
            className="absolute right-4 top-1/2 z-[101] inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-card/95 text-dollhouse-ink shadow-lg transition-opacity hover:opacity-80"
          >
            <ChevronRight size={22} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <img
            src={selectedImage}
            alt={`The Dollhouse Brand Studio enlarged portfolio sample ${selectedIndex + 1}`}
            className="max-h-[90vh] w-auto max-w-[92vw] object-contain rounded-xl bg-card shadow-[0_24px_70px_rgba(0,0,0,0.3)]"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default LocalBusinessPortfolio;
