import AgreementForm from "@/components/AgreementForm";
import BackToTopButton from "@/components/BackToTopButton";
import CookieConsent from "@/components/CookieConsent";
import HeartDivider from "@/components/HeartDivider";
import FirstClientNotice from "@/components/FirstClientNotice";
import LocalBusinessPackages from "@/components/LocalBusinessPackages";
import LocalBusinessPortfolio from "@/components/LocalBusinessPortfolio";
import MinimalHeader from "@/components/MinimalHeader";
import LegalModal, { useLegalModal } from "@/components/LegalModal";
import useScrollReveal from "@/hooks/useScrollReveal";

const LocalBusiness = () => {
  useScrollReveal();
  const { activeModal, openModal, closeModal } = useLegalModal();

  return (
    <div className="min-h-screen [&_p]:leading-[1.7] [&_li]:leading-[1.7]">
      <MinimalHeader />

      <main>
        <section className="px-6 py-20 text-center max-w-[760px] mx-auto">
          <p className="font-accent text-[9px] tracking-[4px] uppercase text-dollhouse-p3 mb-4">
            Done-for-You Social Media Marketing
          </p>
          <h1 className="font-display italic font-normal text-dollhouse-ink text-[clamp(38px,6vw,68px)] leading-tight">
            Social Media Support for Busy Local Business Owners
          </h1>
          <p className="text-[17px] text-dollhouse-text-mid font-light mt-5 max-w-[560px] mx-auto">
            Your business is established. Your social media isn&apos;t. We fix that.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#local-business"
              className="inline-flex items-center justify-center px-10 py-3.5 bg-dollhouse-ink text-card rounded-pill font-accent text-[10px] tracking-[3px] uppercase font-medium no-underline transition-all duration-300 hover:shadow-lg hover:shadow-dollhouse-ink/10 hover:-translate-y-0.5"
            >
              View Packages
            </a>
          </div>
        </section>

        <FirstClientNotice />
        <div className="w-full border-t border-[#D4C9C0]" aria-hidden="true" />
        <LocalBusinessPortfolio />
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="w-full border-t border-[#D4C9C0]" aria-hidden="true" />
        </div>
        <LocalBusinessPackages />
        <AgreementForm />
      </main>

      <footer className="py-12 text-center border-t border-dollhouse-p3/15">
        <HeartDivider className="mb-8" />
        <div className="font-display italic text-dollhouse-text-light text-[15px] tracking-[6px] mb-[2px]">
          the
        </div>
        <p className="font-display italic text-dollhouse-ink text-2xl tracking-[6px] uppercase mb-4">
          Dollhouse
        </p>
        <p className="text-[12px] text-dollhouse-text-light font-light mb-6">
          Done-for-you social media content for established local businesses
        </p>

        <div className="flex justify-center gap-5 mb-5 flex-wrap">
          {[
            { label: "Privacy Policy", key: "privacy" },
            { label: "Terms of Use", key: "terms" },
            { label: "Refund Policy", key: "refund" },
            { label: "Contact", key: "contact" },
          ].map((l) => (
            <button
              key={l.key}
              onClick={() => openModal(l.key)}
              className="font-accent text-[8px] tracking-[2px] uppercase text-dollhouse-text-light bg-transparent border-none cursor-pointer hover:text-dollhouse-ink transition-colors p-0"
            >
              {l.label}
            </button>
          ))}
        </div>

        <p className="font-accent text-[8px] tracking-[3px] uppercase text-dollhouse-p3">
          © {new Date().getFullYear()} The Dollhouse · All Rights Reserved
        </p>
      </footer>

      <CookieConsent />
      <BackToTopButton />
      <LegalModal activeModal={activeModal} onClose={closeModal} />
    </div>
  );
};

export default LocalBusiness;
