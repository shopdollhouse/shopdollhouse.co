import Eyebrow from "./Eyebrow";
import HeartDivider from "./HeartDivider";
import mandyPhoto from "@/assets/mandy-photo.jpg";
import { Mail } from "lucide-react";

const AboutSection = () => (
  <section id="about" className="px-6 py-16 max-w-[900px] mx-auto">
    <div className="text-center mb-12">
      <Eyebrow text="The Person Behind the Brand" className="mb-4" />
      <h2 className="font-display italic font-normal text-dollhouse-ink text-[clamp(28px,4vw,44px)]">
        Hi, I'm Mandy
      </h2>
    </div>

    <div className="flex flex-wrap items-center gap-12">
      <div className="flex-shrink-0 w-[220px] h-[220px] rounded-full overflow-hidden border border-dollhouse-p3/35 mx-auto shadow-lg">
        <img
          src={mandyPhoto}
          alt="Mandy — founder of The Dollhouse"
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
        <p className="text-[14px] text-dollhouse-text-mid font-light leading-relaxed mb-7">
          Whether you DIY it or hand it over to me — your brand gets built right.
        </p>

        <HeartDivider className="mb-6 !mx-0 !justify-start" />

        <div className="flex flex-wrap gap-4 items-center mb-7">
          <span className="font-display text-[9px] tracking-[2px] uppercase text-dollhouse-text-light">As seen in</span>
          <a href="https://www.buzzfeed.com/sarahrohoman/black-owned-stores-etsy-canada" target="_blank" rel="noopener noreferrer" className="font-serif text-[15px] text-dollhouse-p3 opacity-85 no-underline border-b border-dollhouse-p3/30 pb-px">BuzzFeed</a>
          <a href="https://www.huffpost.com/entry/get-out-and-vote-merch-election-2020_l_5f344d83c5b6960c066fef03" target="_blank" rel="noopener noreferrer" className="font-sans text-[15px] font-bold text-dollhouse-ink opacity-80 no-underline border-b border-dollhouse-ink/25 pb-px">HuffPost</a>
        </div>

        <div className="flex flex-wrap gap-7">
          {[["10+ Years", "Brand & Design"], ["500+", "Brand Builders Helped"]].map(([value, label]) => (
            <div key={value}>
              <p className="font-display italic text-[18px] text-dollhouse-ink">{value}</p>
              <p className="font-accent text-[8px] tracking-[2px] uppercase text-dollhouse-text-light">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
