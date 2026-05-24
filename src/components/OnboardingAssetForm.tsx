import { useRef, useState, type DragEvent, type FormEvent } from "react";
import { Upload } from "lucide-react";

const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/mwvrvrzj";

const packages = ["Standard", "Pro", "Premium"];

const inputClass =
  "mt-2 w-full border-0 border-b border-[#C4B5A5] bg-transparent px-0 py-3 text-[14px] leading-[1.7] text-dollhouse-ink outline-none transition-colors focus:border-dollhouse-ink";
const textareaClass = `${inputClass} resize-none`;
const labelClass =
  "block font-accent text-[8px] tracking-[2px] uppercase text-dollhouse-text-mid font-medium";

const OnboardingAssetForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [brandColors, setBrandColors] = useState("");
  const [brandFonts, setBrandFonts] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [contentPreferences, setContentPreferences] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleFiles = (fileList: FileList | null) => {
    setFiles(fileList);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    const formData = new FormData();
    formData.append("_subject", `Client Onboarding Assets - ${businessName || name || "New Client"}`);
    formData.append("formType", "Client onboarding assets");
    formData.append("email", email);
    formData.append("_replyto", email);
    formData.append("name", name);
    formData.append("businessName", businessName);
    formData.append("selectedPackage", selectedPackage);
    formData.append("brandColors", brandColors || "Not provided");
    formData.append("brandFonts", brandFonts || "Not provided");
    formData.append("businessDescription", businessDescription);
    formData.append("targetAudience", targetAudience);
    formData.append("contentPreferences", contentPreferences || "Not provided");
    formData.append("additionalNotes", additionalNotes || "None");

    if (files) {
      Array.from(files).forEach((file) => {
        formData.append("attachments", file);
      });
    }

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setBusinessName("");
      setEmail("");
      setSelectedPackage("");
      setBrandColors("");
      setBrandFonts("");
      setBusinessDescription("");
      setTargetAudience("");
      setContentPreferences("");
      setAdditionalNotes("");
      setFiles(null);
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className="rounded-2xl border border-[#D4C9C0] bg-[#F2E8E8] px-6 py-5 text-center font-display text-[15px] font-light italic leading-[1.7] text-[#3D2B1F]">
        Your assets have been received. I will review everything and follow up by email within 1 to 2
        business days. Let&apos;s get to work! ♡
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="space-y-6 rounded-2xl border border-dollhouse-p3/25 bg-card p-8 shadow-[0_18px_55px_rgba(60,45,39,0.06)]"
    >
      <label className="block">
        <span className={labelClass}>Your Name</span>
        <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
      </label>

      <label className="block">
        <span className={labelClass}>Your Business Name</span>
        <input
          required
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Your Email</span>
        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
      </label>

      <label className="block">
        <span className={labelClass}>Selected Package</span>
        <select
          required
          value={selectedPackage}
          onChange={(e) => setSelectedPackage(e.target.value)}
          className={`${inputClass} [&&]:text-dollhouse-ink`}
        >
          <option value="">Select your package</option>
          {packages.map((pkg) => (
            <option key={pkg} value={pkg}>
              {pkg}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className={labelClass}>Brand Colors</span>
        <input
          type="text"
          value={brandColors}
          onChange={(e) => setBrandColors(e.target.value)}
          placeholder="eg. Navy blue, gold, white — or paste your hex codes if you have them"
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Brand Fonts if Known</span>
        <input
          type="text"
          value={brandFonts}
          onChange={(e) => setBrandFonts(e.target.value)}
          placeholder="eg. Helvetica, Garamond — leave blank if unsure"
          className={inputClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Business Description</span>
        <textarea
          required
          rows={4}
          value={businessDescription}
          onChange={(e) => setBusinessDescription(e.target.value)}
          placeholder="Tell me about your business, what you do, who your customers are, and what makes you different"
          className={textareaClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Target Audience</span>
        <textarea
          required
          rows={3}
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          placeholder="Who is your ideal customer? Age, location, interests, etc."
          className={textareaClass}
        />
      </label>

      <label className="block">
        <span className={labelClass}>Anything Specific You Want Included or Avoided in Your Content</span>
        <textarea
          rows={3}
          value={contentPreferences}
          onChange={(e) => setContentPreferences(e.target.value)}
          className={textareaClass}
        />
      </label>

      <div className="block">
        <span className={labelClass}>Upload Your Logo, Brand Photos, or Any Other Assets Here</span>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.svg,.pdf,.zip,.ai,.psd,image/*,application/pdf,application/zip"
          onChange={(e) => handleFiles(e.target.files)}
          className="sr-only"
        />
        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`mt-3 flex min-h-[80px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-4 py-5 text-center transition-colors ${
            isDragging
              ? "border-[#3D2B1F]/35 bg-[#F5F0EB]"
              : "border-[#C4B5A5] bg-[#F0EAE4]"
          }`}
        >
          <Upload size={18} strokeWidth={1.7} className="mb-2 text-[#3D2B1F]" aria-hidden="true" />
          <span className="font-display text-[14px] leading-[1.7] text-[#3D2B1F]">
            Click to upload or drag and drop your files here
          </span>
          <span className="mt-1 text-[11px] leading-[1.7] text-dollhouse-text-light">
            Accepted: JPG, PNG, PDF, SVG, AI, PSD, ZIP
          </span>
        </div>
        {files && files.length > 0 && (
          <ul className="mt-3 list-none space-y-1 p-0">
            {Array.from(files).map((file) => (
              <li key={`${file.name}-${file.lastModified}`} className="text-[12px] leading-[1.7] text-dollhouse-text-mid">
                {file.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <label className="block">
        <span className={labelClass}>Anything Else I Should Know?</span>
        <textarea
          rows={3}
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          className={textareaClass}
        />
      </label>

      {status === "error" && (
        <p className="rounded-2xl border border-[#C9A0A0]/40 bg-[#f7f1ec] px-4 py-4 text-[13px] font-light leading-[1.7] text-dollhouse-text-mid">
          Something went wrong. Please try again or email your assets directly to{" "}
          <a href="mailto:hello@shopdollhouse.co" className="text-dollhouse-ink no-underline">
            hello@shopdollhouse.co
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex w-full items-center justify-center rounded-pill bg-dollhouse-ink px-5 py-3.5 font-accent text-[9px] uppercase tracking-[3px] text-card transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send My Assets →"}
      </button>
    </form>
  );
};

export default OnboardingAssetForm;
