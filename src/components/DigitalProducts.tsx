import Eyebrow from "@/components/Eyebrow";

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

const DigitalProducts = () => {
  return (
    <section className="px-6 py-20 max-w-[1320px] mx-auto">
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
    </section>
  );
};

export default DigitalProducts;
