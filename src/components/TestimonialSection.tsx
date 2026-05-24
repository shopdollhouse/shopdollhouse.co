import { Heart, Star } from "lucide-react";
import Eyebrow from "./Eyebrow";

const testimonials = [
  {
    quote: "I had zero clarity before this. Now I have a brand name, a niche, and an actual plan. Wild.",
    name: "Sarah K.",
    tag: "Brand Kit",
  },
  {
    quote: "I handed it over to Mandy and got back something I genuinely love. Worth every cent.",
    name: "Jess T.",
    tag: "Full House",
  },
  {
    quote: "I was spending hundreds on freelancers who didn't get my vision. This gave me everything in one place for a fraction of the cost.",
    name: "Aisha R.",
    tag: "Brand Kit",
  },
];

const Pill = ({ text }: { text: string }) => (
  <span className="inline-block px-2.5 py-1 rounded-pill bg-dollhouse-p3/12 text-dollhouse-p3 font-accent text-[7px] tracking-[2px] uppercase">
    {text}
  </span>
);

const TestimonialSection = () => (
  <section className="px-6 py-10 max-w-[1100px] mx-auto text-center">
    <Eyebrow text="From the Rooms" className="mb-4" />
    <h2 className="font-display italic font-normal text-dollhouse-ink text-[clamp(28px,4vw,44px)] mb-3">
      What They're Saying
    </h2>
    <p className="text-[13px] text-dollhouse-text-light font-light mb-10 max-w-[400px] mx-auto">
      Real results from real women building real brands.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[960px] mx-auto">
      {testimonials.map((t, i) => (
        <div
          key={i}
          className={`dh-reveal d${(i % 3) + 1} bg-dollhouse-p1 border border-dollhouse-p3/20 rounded-2xl p-7 text-left`}
        >
          <div className="flex gap-1 mb-2.5">
            {[...Array(5)].map((_, j) => (
              <Star key={j} size={13} className="text-dollhouse-ink fill-dollhouse-ink" />
            ))}
          </div>
          <p className="font-display italic text-[15px] text-dollhouse-text-mid leading-relaxed mb-5">
            "{t.quote}"
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-dollhouse-p3/15 border-2 border-dollhouse-p2 flex items-center justify-center">
                <Heart size={14} className="text-dollhouse-ink fill-dollhouse-ink" />
              </div>
              <span className="font-accent text-[10px] tracking-[2px] uppercase text-dollhouse-ink font-medium">
                {t.name}
              </span>
            </div>
            <Pill text={t.tag} />
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default TestimonialSection;
