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
    <section className="px-6 py-16 max-w-[1320px] mx-auto">
      <div className="text-center mb-12">
        <Eyebrow text="Recent Work" className="mb-4" />
        <h2 className="font-display italic font-normal text-dollhouse-ink text-[clamp(28px,4vw,44px)] leading-tight">
          Interactive Web Apps
        </h2>
        <p className="text-[13px] text-dollhouse-text-light font-light max-w-[620px] mx-auto mt-3 leading-relaxed">
          A selection of interactive web applications I designed and built — browser based, no downloads required.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
        {digitalProducts.map((product) => (
          <article
            key={product.name}
            className="flex h-full flex-col overflow-hidden rounded-[22px] border border-[#D4C9C0] bg-[#F5F0EB] shadow-[0_18px_55px_rgba(60,45,39,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(60,45,39,0.12)]"
          >
            <div className="w-full aspect-square overflow-hidden bg-card">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display italic text-[22px] font-normal text-dollhouse-ink leading-snug">
                {product.name}
              </h3>
              <p className="mt-3 text-[12.5px] font-light leading-relaxed text-dollhouse-text-light">
                {product.description}
              </p>

              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto pt-6"
              >
                <span className="flex items-center justify-center rounded-pill border border-dollhouse-ink bg-transparent px-5 py-3 font-accent text-[9px] uppercase tracking-[3px] text-dollhouse-ink no-underline transition-all duration-300 hover:bg-dollhouse-ink hover:text-card">
                  View Project →
                </span>
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-[11px] text-dollhouse-text-light font-light italic">
          These products are available on my Etsy shop — herdollhouse on Etsy
        </p>
      </div>
    </section>
  );
};

export default DigitalProducts;
