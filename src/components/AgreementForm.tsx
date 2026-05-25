import { useEffect, useMemo, useState, type FormEvent } from "react";
import Eyebrow from "@/components/Eyebrow";
import { ChevronDown, ChevronUp } from "lucide-react";

const CONTACT_EMAIL = "hello@shopdollhouse.co";
const STUDIO_NAME = "The Dollhouse Brand Studio";
const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/mwvrvrzj";

const packages = [
  "Standard $1,500/mo",
  "Pro $2,500/mo",
  "Premium $5,000/mo",
];

const packagePrices: Record<string, number> = {
  "Standard $1,500/mo": 1500,
  "Pro $2,500/mo": 2500,
  "Premium $5,000/mo": 5000,
};

const contractLengths = [
  "3 months",
  "6 months",
  "12 months",
];

const addons = [
  "Merch Design - $1,000 per project",
  "Website Refresh - $1,500+",
  "Website Build - $3,000+",
  "Logo Refresh - $800+",
  "Social Post Design - $400+",
];

const oneTimeAddonPrices: Record<string, number> = {
  "Merch Design - $1,000 per project": 1000,
  "Website Refresh - $1,500+": 1500,
  "Website Build - $3,000+": 3000,
  "Logo Refresh - $800+": 800,
  "Social Post Design - $400+": 400,
};

const additionalServices = [
  "Meta Ads Management - +$600/mo",
  "Extra Email Graphic - +$300/mo",
  "Extra Content - +$400/mo",
];
const metaAdsService = "Meta Ads Management - +$600/mo";

const monthlyAddonPrices: Record<string, number> = {
  "Meta Ads Management - +$600/mo": 600,
  "Extra Email Graphic - +$300/mo": 300,
  "Extra Content - +$400/mo": 400,
};

const platforms = [
  "Instagram",
  "Facebook",
  "Threads",
  "TikTok",
  "Instagram + Facebook",
  "Instagram + Facebook + Threads",
  "Instagram + Facebook + TikTok",
  "All platforms (Instagram, Facebook, Threads, TikTok)",
];

const agreementSections = [
  {
    title: "What's Included",
    body: "The Dollhouse Brand Studio will provide the selected done-for-you content creation package, approved add-ons, and approved additional services listed in this agreement. Services may include profile setup, branding, designed posts, carousels, reels, captions, hashtags, scheduling, publishing, promotional email graphics, Meta ads management, reporting, merch concepts, and strategy recommendations based on the selected scope.",
  },
  {
    title: "Communication",
    body: "All client communication is handled by email only. No calls, meetings, rush work, additional revisions, or services outside the selected package are included unless approved in writing and may require an additional fee.",
  },
  {
    title: "Payment",
    body: "Payment is not collected through this form. The Dollhouse Brand Studio will review the agreement and manually send the correct payment link. Package fees are service fees only and do not include Meta advertising spend, hosting, domains, paid tools, printing, or third-party platform fees.",
  },
  {
    title: "No Refund Policy",
    body: "All payments are final and non-refundable once paid, including setup fees, monthly service fees, design add-ons, rush fees, and approved extra work, unless otherwise required by law.",
  },
  {
    title: "Timelines",
    body: "Timelines depend on the client providing access, assets, information, feedback, and approvals on time. Client delays may move delivery dates, publishing dates, campaign launch dates, reporting, revisions, or access.",
  },
  {
    title: "Results",
    body: "The Dollhouse Brand Studio does not guarantee specific revenue, leads, reach, followers, sales, engagement, or platform approval outcomes. Results depend on industry, offer, audience, creative, budget, consistency, market conditions, and platform performance.",
  },
  {
    title: "Cancellation",
    body: "Standard begins with a no-commitment first month; if the client continues, the 3-month minimum begins from month 2. Pro and Premium require a 3-month minimum from the first month. After the minimum period is complete, either party may end future work in writing. Fees already paid remain non-refundable.",
  },
  {
    title: "Dispute Resolution",
    body: "The parties agree to first try to resolve disputes in writing. This agreement is governed by the laws of Ontario, Canada, and eligible claims may be brought in Ontario Small Claims Court or another Ontario court with jurisdiction.",
  },
  {
    title: "Electronic Signature",
    body: "By typing their full legal name and sending this agreement, the client agrees that the typed name is their electronic signature and confirms their intent to enter this agreement.",
  },
];

const AgreementForm = () => {
  const [clientName, setClientName] = useState("");
  const [legalName, setLegalName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(packages[0]);
  const [contractLength, setContractLength] = useState(contractLengths[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState("Instagram + Facebook + Threads");
  const [startDate, setStartDate] = useState("");
  const [notes, setNotes] = useState("");
  const [signature, setSignature] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [platformMenuOpen, setPlatformMenuOpen] = useState(false);
  const [packageMenuOpen, setPackageMenuOpen] = useState(false);
  const [contractLengthMenuOpen, setContractLengthMenuOpen] = useState(false);
  const [agreementModalOpen, setAgreementModalOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);

  const pricingSummary = useMemo(() => {
    const basePackageTotal = packagePrices[selectedPackage] ?? 0;
    const monthlyAddonItems = selectedServices.map((service) => ({
      label: service.split(" - ")[0],
      amount: monthlyAddonPrices[service] ?? 0,
    }));
    const oneTimeAddonItems = selectedAddons.map((addon) => ({
      label: addon.split(" - ")[0],
      amount: oneTimeAddonPrices[addon] ?? 0,
    }));
    const monthlyAddonsTotal = monthlyAddonItems.reduce((total, item) => total + item.amount, 0);
    const oneTimeTotal = oneTimeAddonItems.reduce((total, item) => total + item.amount, 0);
    const monthlyTotal = basePackageTotal + monthlyAddonsTotal;
    const firstPaymentDue = monthlyTotal + oneTimeTotal;

    return {
      packageLine: `Package: ${selectedPackage.replace(" $", " — $")}`,
      monthlyAddonItems,
      oneTimeAddonItems,
      monthlyTotal,
      oneTimeTotal,
      firstPaymentDue,
      monthlyTotalFormatted: `${formatCurrency(monthlyTotal)}/mo`,
      oneTimeTotalFormatted: formatCurrency(oneTimeTotal),
      firstPaymentDueFormatted: formatCurrency(firstPaymentDue),
      emailSummary: [
        `Package: ${selectedPackage.replace(" $", " — $")}`,
        ...monthlyAddonItems.map((item) => `${item.label} - +${formatCurrency(item.amount)}/mo`),
        ...oneTimeAddonItems.map((item) => `${item.label} - +${formatCurrency(item.amount)} one-time`),
        `Monthly total: ${formatCurrency(monthlyTotal)}/mo`,
        `One-time total: ${formatCurrency(oneTimeTotal)}`,
        `First payment due: ${formatCurrency(firstPaymentDue)}`,
      ].join("\n"),
    };
  }, [selectedAddons, selectedPackage, selectedServices]);

  const isStandardPackage = selectedPackage.startsWith("Standard");
  const availableAdditionalServices = isStandardPackage
    ? additionalServices.filter((service) => service !== metaAdsService)
    : additionalServices;

  useEffect(() => {
    if (!isStandardPackage) return;
    setSelectedServices((current) => current.filter((service) => service !== metaAdsService));
  }, [isStandardPackage]);

  const agreementText = useMemo(() => {
    const addonsText = selectedAddons.length > 0 ? selectedAddons.join(", ") : "None selected";
    const servicesText = selectedServices.length > 0 ? selectedServices.join(", ") : "None selected";
    const standardTrialText = selectedPackage.startsWith("Standard")
      ? "\nStandard Trial Note: Month 1 has no long-term commitment. If the client continues after month 1, the 3-month minimum begins from month 2."
      : "";

    return `Social Media Marketing Agreement

Client: ${clientName || "[Client Name]"}
Legal Name / Contracting Party: ${legalName || "[Legal Name]"}
Business: ${businessName || "[Business Name]"}
Business Address: ${businessAddress || "[Business Address]"}
Email: ${email || "[Email]"}
Phone: ${phone || "[Phone]"}
Selected Package: ${selectedPackage}
Contract Length: ${contractLength}${standardTrialText}
Design Add-Ons: ${addonsText}
Additional Services Requested: ${servicesText}
Preferred Platform: ${selectedPlatform}
Preferred Start Date: ${startDate || "[To Be Confirmed]"}

Pricing Summary:
${pricingSummary.emailSummary}

Agreement Summary:
${STUDIO_NAME} will provide done-for-you content creation, social media management, Meta ads management when included in the selected package or add-ons, approved monthly add-ons, or approved standalone additional services for the selected package and contract length. Services may include Instagram and Facebook setup and branding, designed posts, carousels, reels, captions, hashtags, scheduling, publishing, promotional email graphics, Threads support, TikTok support, Meta ads management, custom ad creatives, content strategy, analytics reporting, merch design concepts, and strategy recommendations based on the selected package. All client communication is handled by email only. No calls are included unless separately agreed in writing. If "Additional Service Only" is selected, the requested service must be reviewed, scoped, and quoted before payment. Adjustments and creative refreshes are made when needed based on package scope, platform performance, budget, campaign goals, and client approvals.

Design work and additional agency services are optional and scoped separately. Monthly add-ons may include Meta ads management, extra email graphics, and extra content. One-time project add-ons may include merch design, website refreshes, website builds, logo refreshes, and social post design only when approved in writing.

Scope & Changes:
Only the package, add-ons, and approved additional services listed in this agreement are included. Any extra requests, rush work, additional revisions, extra creative, website pages, meetings, calls, platform setup, or services not listed here must be approved separately and may require an additional fee.

Client Responsibilities:
The client agrees to provide timely access, business details, brand assets, approvals, account permissions, and email feedback needed to complete the work. The client is responsible for the accuracy of business information, offers, prices, claims, promotions, and any required permissions. Meta ad spend, domain registration, hosting, paid tools, printing, and third-party platform fees are billed separately.

Payment:
Payment is not collected through this form. After this agreement is reviewed, ${STUDIO_NAME} will manually send the correct payment link for the selected package and any approved add-ons. Package fees are service fees paid to ${STUDIO_NAME} only and do not include Meta advertising spend. The client pays all Meta ad spend separately through their own Meta account or approved ad payment method. Work does not begin until the agreement is accepted and the required payment is received. Standard includes a no-commitment first month; if the client continues after month 1, the 3-month minimum begins from month 2. Pro and Premium require a 3-month minimum commitment from the first month. Monthly package fees are due before the service month begins unless otherwise agreed in writing. Late or failed payments may pause work, delivery, reporting, revisions, launches, publishing, or access until the account is brought current.

No Refund Policy:
All payments are final and non-refundable once paid, including setup fees, monthly service fees, design add-ons, rush fees, and approved extra work, unless otherwise required by law. The client is paying for reserved time, strategy, setup, creative direction, campaign work, and service availability, not guaranteed outcomes.

Approvals, Delays & Access:
Timelines depend on the client providing access, assets, information, and approvals on time. Client delays may move delivery dates and campaign launch dates. ${STUDIO_NAME} is not responsible for missed launch dates, paused ads, rejected ads, or delayed results caused by missing access, late approvals, platform issues, payment issues, or incomplete client information.

Results:
${STUDIO_NAME} does not guarantee specific revenue, leads, reach, sales, or platform approval outcomes. Results depend on offer, audience, budget, creative, market conditions, and platform performance.

Platform Rules & Ad Spend:
Facebook, Instagram, Meta, payment processors, hosting providers, and other third-party platforms may change rules, reject ads, restrict accounts, pause campaigns, or change performance. The client is responsible for Meta ad spend and third-party charges unless otherwise agreed in writing.

Ownership & Portfolio:
Final approved creative made specifically for the client may be used by the client after full payment is received. Unused drafts, source files, strategy documents, internal processes, templates, and working files remain the property of ${STUDIO_NAME} unless otherwise agreed in writing. ${STUDIO_NAME} may display completed work in a portfolio or marketing materials unless the client requests confidentiality in writing.

Cancellation & Termination:
Either party may request to end future work in writing. Fees already paid are non-refundable unless otherwise required by law. The client remains responsible for approved work, completed work, active billing periods, third-party costs, and any unpaid balances owed at the time of cancellation.

Dispute Resolution, Governing Law & Venue:
The parties agree to first try to resolve disputes in writing. If a dispute cannot be resolved, this agreement is governed by the laws of Ontario, Canada. The parties agree that eligible claims may be brought in Ontario Small Claims Court or another Ontario court with jurisdiction. The client agrees that the typed signature, submitted agreement email, payment records, written communications, invoices, and project records may be used as evidence of the agreement and work performed.

Electronic Signature:
By typing their name below and sending this agreement, the client agrees that the typed name is their electronic signature and confirms their intent to enter this agreement.

Signature:
By typing their name and submitting this form, the client confirms they reviewed this agreement and wants ${STUDIO_NAME} to prepare the payment link and next steps.

Signed By: ${signature || "[Typed Signature]"}
Date: ${today}

Additional Notes:
${notes || "None"}`;
  }, [businessAddress, businessName, clientName, contractLength, email, legalName, notes, phone, pricingSummary.emailSummary, selectedAddons, selectedPackage, selectedPlatform, selectedServices, signature, startDate, today]);

  const toggleAddon = (addon: string) => {
    setSelectedAddons((current) =>
      current.includes(addon) ? current.filter((item) => item !== addon) : [...current, addon]
    );
  };

  const toggleService = (service: string) => {
    setSelectedServices((current) =>
      current.includes(service) ? current.filter((item) => item !== service) : [...current, service]
    );
  };

  const packageNote = isStandardPackage
    ? "Your first month has no long-term commitment. If you choose to continue, a 3-month minimum begins from month 2."
    : "This package requires a 3-month minimum from day one.";
  const inputClass = "mt-2 w-full border-0 border-b border-[#C4B5A5] bg-transparent px-0 py-3 text-[14px] text-dollhouse-ink outline-none transition-colors focus:border-dollhouse-ink";
  const selectClass = `${inputClass} [&&]:text-dollhouse-ink [&&]:accent-[#C9A0A0]`;
  const labelClass = "block font-accent text-[8px] tracking-[2px] uppercase text-dollhouse-text-mid font-medium";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus("sending");

    if (!FORMSPREE_ENDPOINT) {
      setSubmitStatus("error");
      return;
    }

    const payload = {
      _subject: `Signed Local Business Agreement - ${businessName || clientName || "New Client"}`,
      clientName,
      legalName,
      businessName,
      businessAddress,
      email,
      phone,
      selectedPackage,
      contractLength,
      designAddons: selectedAddons.length > 0 ? selectedAddons.join(", ") : "None selected",
      additionalServices: selectedServices.length > 0 ? selectedServices.join(", ") : "None selected",
      selectedPlatform,
      pricingSummary: pricingSummary.emailSummary,
      monthlyTotal: pricingSummary.monthlyTotalFormatted,
      oneTimeTotal: pricingSummary.oneTimeTotalFormatted,
      firstPaymentDue: pricingSummary.firstPaymentDueFormatted,
      startDate: startDate || "To be confirmed",
      notes: notes || "None",
      accepted: accepted ? "Yes" : "No",
      signature,
      agreementText,
    };

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      setSubmitStatus(response.ok ? "success" : "error");
    } catch {
      setSubmitStatus("error");
    }
  };

  const StepHeader = ({ number, title }: { number: string; title: string }) => (
    <div className="border-b border-dollhouse-p3/20 pb-4">
      <p className="font-accent text-[9px] tracking-[3px] uppercase text-dollhouse-p3">Step {number}</p>
      <h3 className="mt-2 font-display italic text-[28px] font-normal text-dollhouse-ink">{title}</h3>
    </div>
  );

  return (
    <section id="agreement" className="px-6 py-20 max-w-[680px] mx-auto">
      <div className="text-center mb-12">
        <Eyebrow text="Agreement First" className="mb-4" />
        <p className="mx-auto mb-5 max-w-[560px] font-display text-[13px] font-light italic leading-relaxed text-dollhouse-text-mid">
          Still have questions? Email me directly at{" "}
          <a href="mailto:hello@shopdollhouse.co" className="text-dollhouse-text-mid no-underline hover:text-dollhouse-ink">
            hello@shopdollhouse.co
          </a>{" "}
          — I respond within 1 to 2 business days.
        </p>
        <h2 className="font-display italic font-normal text-dollhouse-ink text-[clamp(28px,4vw,44px)]">
          Review & Sign Before Payment
        </h2>
        <p className="text-[13px] text-dollhouse-text-light font-light mt-3 max-w-[560px] mx-auto leading-relaxed">
          Complete the agreement first. Once it is received, {STUDIO_NAME} will review the scope and manually send the correct payment link.
        </p>
      </div>

      <form className="space-y-12" onSubmit={handleSubmit} action={FORMSPREE_ENDPOINT} method="POST">
        <div className="space-y-6">
          <StepHeader number="1" title="Business Details" />
          {[
            ["Client Name", clientName, setClientName, "text"],
            ["Legal Name", legalName, setLegalName, "text"],
            ["Business Name", businessName, setBusinessName, "text"],
            ["Business Address", businessAddress, setBusinessAddress, "text"],
            ["Email", email, setEmail, "email"],
            ["Phone", phone, setPhone, "text"],
          ].map(([label, value, setter, type]) => (
            <label key={label as string} className="block">
              <span className={labelClass}>{label as string}</span>
              <input
                type={type as string}
                value={value as string}
                onChange={(e) => (setter as (next: string) => void)(e.target.value)}
                className={inputClass}
              />
            </label>
          ))}
        </div>

        <div className="space-y-6">
          <StepHeader number="2" title="Package & Scope" />
          <label className="block">
            <span className={labelClass}>Selected Package</span>
            <div className="relative mt-2">
              <button
                type="button"
                onClick={() => setPackageMenuOpen((open) => !open)}
                className="w-full border-0 border-b border-[#C4B5A5] bg-transparent px-0 py-3 text-left text-[14px] text-dollhouse-ink outline-none transition-colors focus:border-dollhouse-ink flex items-center justify-between"
                aria-haspopup="listbox"
                aria-expanded={packageMenuOpen}
              >
                {selectedPackage}
                <ChevronDown size={16} className="text-dollhouse-text-light" />
              </button>
              {packageMenuOpen && (
                <div
                  role="listbox"
                  className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-2xl border border-dollhouse-p3/20 bg-card shadow-[0_18px_45px_rgba(60,45,39,0.13)]"
                >
                  {packages.map((pkg) => {
                    const isSelected = selectedPackage === pkg;

                    return (
                      <button
                        key={pkg}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          setSelectedPackage(pkg);
                          setPackageMenuOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-[14px] transition-colors ${
                          isSelected ? "bg-[#C9A0A0] text-white" : "text-dollhouse-ink hover:bg-[#f7f1ec]"
                        }`}
                      >
                        {pkg}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <span className="mt-3 block rounded-xl bg-[#f7f1ec] px-4 py-3 text-[12px] text-dollhouse-text-mid font-light leading-relaxed">
              {packageNote}
            </span>
          </label>

          <label className="block">
            <span className={labelClass}>Contract Length</span>
            <div className="relative mt-2">
              <button
                type="button"
                onClick={() => setContractLengthMenuOpen((open) => !open)}
                className="w-full border-0 border-b border-[#C4B5A5] bg-transparent px-0 py-3 text-left text-[14px] text-dollhouse-ink outline-none transition-colors focus:border-dollhouse-ink flex items-center justify-between"
                aria-haspopup="listbox"
                aria-expanded={contractLengthMenuOpen}
              >
                {contractLength}
                <ChevronDown size={16} className="text-dollhouse-text-light" />
              </button>
              {contractLengthMenuOpen && (
                <div
                  role="listbox"
                  className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-2xl border border-dollhouse-p3/20 bg-card shadow-[0_18px_45px_rgba(60,45,39,0.13)]"
                >
                  {contractLengths.map((length) => {
                    const isSelected = contractLength === length;

                    return (
                      <button
                        key={length}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          setContractLength(length);
                          setContractLengthMenuOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-[14px] transition-colors ${
                          isSelected ? "bg-[#C9A0A0] text-white" : "text-dollhouse-ink hover:bg-[#f7f1ec]"
                        }`}
                      >
                        {length}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </label>

          <div>
            <p className={`${labelClass} mb-3`}>Design Add-Ons</p>
            <div className="space-y-2">
              {addons.map((addon) => (
                <label key={addon} className="flex w-full items-start gap-3 border-y border-dollhouse-p3/15 px-1 py-3 cursor-pointer">
                  <input type="checkbox" checked={selectedAddons.includes(addon)} onChange={() => toggleAddon(addon)} className="mt-1" />
                  <span className="text-[13px] text-dollhouse-text-mid font-light leading-relaxed">{addon}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className={`${labelClass} mb-3`}>Additional Services</p>
            <div className="space-y-2">
              {availableAdditionalServices.map((service) => (
                <label key={service} className="flex w-full items-start gap-3 border-y border-dollhouse-p3/15 px-1 py-3 cursor-pointer">
                  <input type="checkbox" checked={selectedServices.includes(service)} onChange={() => toggleService(service)} className="mt-1" />
                  <span className="text-[13px] text-dollhouse-text-mid font-light leading-relaxed">{service}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <StepHeader number="3" title="Platform & Notes" />
          <label className="block">
            <span className={labelClass}>Preferred Platform</span>
            <div className="relative mt-2">
              <button
                type="button"
                onClick={() => setPlatformMenuOpen((open) => !open)}
                className="w-full border-0 border-b border-[#C4B5A5] bg-transparent px-0 py-3 text-left text-[14px] text-dollhouse-ink outline-none transition-colors focus:border-dollhouse-ink flex items-center justify-between"
                aria-haspopup="listbox"
                aria-expanded={platformMenuOpen}
              >
                {selectedPlatform}
                <ChevronDown size={16} className="text-dollhouse-text-light" />
              </button>
              {platformMenuOpen && (
                <div
                  role="listbox"
                  className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-2xl border border-dollhouse-p3/20 bg-card shadow-[0_18px_45px_rgba(60,45,39,0.13)]"
                >
                  {platforms.map((platform) => {
                    const isSelected = selectedPlatform === platform;

                    return (
                      <button
                        key={platform}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          setSelectedPlatform(platform);
                          setPlatformMenuOpen(false);
                        }}
                        className={`block w-full px-4 py-3 text-left text-[13px] transition-colors ${
                          isSelected
                            ? "bg-[#C9A0A0] text-white"
                            : "bg-card text-dollhouse-ink hover:bg-[#C9A0A0] hover:text-white"
                        }`}
                      >
                        {platform}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </label>

          <label className="block">
            <span className={labelClass}>Preferred Start Date</span>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClass} />
          </label>

          <label className="block">
            <span className={labelClass}>Anything else we should know? (optional)</span>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className={`${inputClass} resize-none`} />
          </label>
        </div>

        <div className="space-y-6">
          <StepHeader number="4" title="Review Summary" />
          <div className="rounded-2xl border border-dollhouse-p3/20 bg-[#f7f1ec] p-6">
            <div className="grid gap-4">
              {[
                ["Selected Package", selectedPackage],
                ["Contract Length", contractLength],
                ["Platforms", selectedPlatform],
                ["Design Add-Ons", selectedAddons.length > 0 ? selectedAddons.join(", ") : "None selected"],
                ["Additional Services", selectedServices.length > 0 ? selectedServices.join(", ") : "None selected"],
              ].map(([label, value]) => (
                <div key={label} className="border-t border-dollhouse-p3/20 pt-3 first:border-t-0 first:pt-0">
                  <p className="font-accent text-[8px] tracking-[2px] uppercase text-dollhouse-p3">{label}</p>
                  <p className="mt-1 text-[13px] text-dollhouse-text-mid font-light leading-relaxed">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#C9A0A0]/35 bg-card p-6 shadow-[0_16px_45px_rgba(60,45,39,0.06)]">
            <p className="font-accent text-[8px] tracking-[2px] uppercase text-dollhouse-p3">Estimated Total</p>
            <div className="mt-4 space-y-2 text-[13px] font-light leading-relaxed text-dollhouse-text-mid">
              <div className="text-dollhouse-ink">
                <span>{pricingSummary.packageLine}</span>
              </div>

              {pricingSummary.monthlyAddonItems.map((item) => (
                <div key={item.label} className="flex items-start justify-between gap-4">
                  <span>{item.label}</span>
                  <span className="whitespace-nowrap text-dollhouse-ink">+{formatCurrency(item.amount)}/mo</span>
                </div>
              ))}

              {pricingSummary.oneTimeAddonItems.map((item) => (
                <div key={item.label} className="flex items-start justify-between gap-4">
                  <span>{item.label}</span>
                  <span className="whitespace-nowrap text-dollhouse-ink">+{formatCurrency(item.amount)} one-time</span>
                </div>
              ))}
            </div>

            <div className="my-5 h-px w-full bg-dollhouse-p3/25" />

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4 text-[14px] text-dollhouse-text-mid">
                <span>Monthly total:</span>
                <span className="font-display italic text-[22px] text-[#A66F78]">{pricingSummary.monthlyTotalFormatted}</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-[14px] text-dollhouse-text-mid">
                <span>One-time total:</span>
                <span className="font-display italic text-[22px] text-[#A66F78]">{pricingSummary.oneTimeTotalFormatted}</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-dollhouse-p3/20 pt-3 text-[15px] text-dollhouse-ink">
                <span>First payment due:</span>
                <span className="font-display italic text-[28px] text-[#A66F78]">{pricingSummary.firstPaymentDueFormatted}</span>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <button
              type="button"
              onClick={() => setAgreementModalOpen(true)}
              className="w-full rounded-2xl border border-dollhouse-p3/30 bg-card px-6 py-4 text-left transition-all hover:border-dollhouse-p3/50 hover:bg-[#f7f1ec]"
            >
              <span className="font-display italic text-[16px] font-normal text-dollhouse-ink">View Agreement</span>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <StepHeader number="5" title="Sign & Submit" />
          <label className="block">
            <span className={labelClass}>Type your full legal name as your electronic signature</span>
            <input value={signature} onChange={(e) => setSignature(e.target.value)} className="mt-3 w-full border-0 border-b border-[#C4B5A5] bg-transparent px-0 py-4 font-display italic text-[28px] text-dollhouse-ink outline-none transition-colors focus:border-dollhouse-ink" />
          </label>

          <label className="flex w-full items-start gap-3 rounded-2xl border border-dollhouse-p3/20 bg-card px-4 py-4">
            <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-1" />
            <span className="text-[12.5px] text-dollhouse-text-light font-light leading-relaxed">
              I have read and understand this agreement. I confirm that Meta ad spend is separate from my package fee, all payments are final and non-refundable, and The Dollhouse Brand Studio will manually send my payment link after reviewing this agreement.
            </span>
          </label>

          {submitStatus === "success" && (
            <p className="rounded-2xl border border-dollhouse-p3/20 bg-[#f7f1ec] px-4 py-4 text-[12.5px] text-dollhouse-text-mid font-light leading-relaxed">
              Your agreement has been received. The Dollhouse Brand Studio will review your submission and send your payment link within 1 to 2 business days.
            </p>
          )}

          {submitStatus === "error" && (
            <p className="rounded-2xl border border-[#C9A0A0] bg-[#f7f1ec] px-4 py-4 text-[12.5px] text-dollhouse-text-mid font-light leading-relaxed">
              Something went wrong. Please try again or email us directly at {CONTACT_EMAIL}
            </p>
          )}

          <button
            type="submit"
            disabled={submitStatus === "sending"}
            className="flex items-center justify-center w-full px-5 py-4 rounded-pill font-accent text-[9px] tracking-[3px] uppercase font-medium no-underline transition-all duration-300 bg-dollhouse-ink text-card hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
          >
            {submitStatus === "sending" ? "Sending Agreement..." : "Send Signed Agreement →"}
          </button>
        </div>
      </form>

      {agreementModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setAgreementModalOpen(false)}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-card p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setAgreementModalOpen(false)}
              className="absolute right-6 top-6 text-dollhouse-text-light hover:text-dollhouse-ink transition-colors"
            >
              <ChevronUp size={24} className="rotate-45" />
            </button>

            <h2 className="font-display italic text-[28px] font-normal text-dollhouse-ink mb-6">Service Agreement</h2>

            <div className="space-y-6">
              {agreementSections.map((section) => (
                <div key={section.title}>
                  <h3 className="font-display italic text-[18px] font-normal text-dollhouse-ink mb-2">{section.title}</h3>
                  <p className="text-[13px] text-dollhouse-text-mid font-light leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setAgreementModalOpen(false)}
              className="mt-8 w-full rounded-2xl bg-dollhouse-ink px-6 py-4 font-display italic text-[16px] font-normal text-white transition-all hover:bg-dollhouse-text-mid"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AgreementForm;
