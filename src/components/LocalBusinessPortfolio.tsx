import { useEffect, useState } from "react";
import Eyebrow from "@/components/Eyebrow";
import { ChevronLeft, ChevronRight } from "lucide-react";

import portfolio3 from "@/assets/portfolio-local-business/portfolio-3.jpg";
import portfolio5 from "@/assets/portfolio-local-business/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-local-business/portfolio-6.jpg";
import portfolio9 from "@/assets/portfolio-local-business/portfolio-9.jpg";
import mandyPhoto from "@/assets/mandy.jpg";

type DigitalProduct = {
  image: string;
  name: string;
  description: string;
  link: string;
};

const digitalProducts: DigitalProduct[] = [
  {
    image: "/products/digital-life-planner.webp",
    name: "Digital Life Interactive Planner",
    description:
      "A luxury 3-year planning workspace for 2026, 2027 and 2028. Google Calendar integrated. Works in your browser instantly.",
    link: "https://www.etsy.com/ca/listing/4470613314/digital-life-interactive-planner-2026",
  },
  {
    image: "/products/adhd-cleaning-planner.webp",
    name: "ADHD Cleaning Interactive Planner",
    description:
      "Finally designed with your brain not against it. A cleaning planner built specifically for ADHD brains. No subscriptions, no ads.",
    link: "https://www.etsy.com/ca/listing/4491029244/adhd-cleaning-interactive-planner-web",
  },
  {
    image: "/products/wedding-planner.webp",
    name: "The Vow — Luxury Wedding Planner",
    description:
      "A full wedding planning workspace with real-time budget tracking, guest seating, vendor compare, and more. Works on all devices.",
    link: "https://www.etsy.com/ca/listing/4487657759/the-vow-luxury-wedding-planner",
  },
];

const portfolioItems = [
  mandyPhoto, // Mandy Fortune
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

        <div className="max-w-[1320px] mx-auto">
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
        </div>
      </div>

      <div className="mt-16">
        <div className="text-center mb-12">
          <Eyebrow text="Recent Work" className="mb-4" />
          <h2 className="font-display italic font-normal text-dollhouse-ink text-[clamp(28px,4vw,44px)] leading-tight">
            Interactive Web Apps
          </h2>
          <p className="text-[13px] text-dollhouse-text-light font-light max-w-[620px] mx-auto mt-3 leading-[1.7]">
            A selection of interactive web applications I designed and built — browser based, no downloads required.
          </p>
        </div>

        <div className="mx-auto grid max-w-[1080px] gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {digitalProducts.map((product) => (
            <article
              key={product.name}
              className="flex h-full flex-col overflow-hidden rounded-[18px] border border-[#D4C9C0] bg-[#F5F0EB] shadow-[0_10px_30px_rgba(60,45,39,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(60,45,39,0.1)]"
            >
              <div className="w-full overflow-hidden bg-card" style={{ aspectRatio: "1 / 0.7" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display italic text-[18px] font-normal text-dollhouse-ink leading-snug">
                  {product.name}
                </h3>
                <p className="mt-2 text-[12px] font-light leading-[1.7] text-dollhouse-text-light">
                  {product.description}
                </p>

                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto pt-5 inline-block"
                >
                  <span className="font-accent text-[10px] uppercase tracking-[2.5px] text-dollhouse-ink no-underline border-b border-dollhouse-ink/30 pb-0.5 transition-all duration-300 hover:border-dollhouse-ink hover:tracking-[3px]">
                    View Project →
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[11px] font-light italic" style={{ color: "#9b7a5d" }}>
            Available on Etsy — herdollhouse
          </p>
        </div>
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
