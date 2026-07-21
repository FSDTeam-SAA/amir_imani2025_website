"use client";

import { useContact } from "@/hooks/use-contact";
import type React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[+]?[\d\s\-()]+$/, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  privacyAgreed: z.literal(true, {
    message: "You must agree to the privacy policy",
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof ContactFormData, string>>;

const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const GetInTouch = () => {
  const { mutate, isPending } = useContact();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    phone: "",
    privacyAgreed: false as unknown as true,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const [fullName, setFullName] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFullName(value);

    const parts = value.trim().split(" ");
    const fName = parts[0] || "";
    const lName = parts.slice(1).join(" ") || "";

    setFormData((prev) => ({
      ...prev,
      firstName: fName,
      lastName: lName,
    }));

    if (errors.firstName || errors.lastName) {
      setErrors((prev) => ({
        ...prev,
        firstName: undefined,
        lastName: undefined,
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof ContactFormData] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    mutate({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phone,
      message: formData.message,
    });
  };

  return (
    <section className="bg-[#faf7f0] space-y-20  text-[#222222] font-sans px-4 py-20 md:py-28 flex flex-col items-center w-full">
      {/* Header Info */}
      <div className="mx-auto text-center mb-12 md:mb-16">
        <span className="text-[10px] tracking-[0.2em] font-bold text-[#bba185] uppercase block mb-3">
          Get in Touch
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-primary">
          Let&apos;s <span className="text-[#577b8a]">Talk.</span>
        </h2>
        <p className="text-xs md:text-[13px] text-[#777777] leading-relaxed max-w-md mx-auto">
          Have a question, partnership idea, or just want to say hello?
          We&apos;d love to hear from you.
        </p>
      </div>

      {/* Main Contact Card Container */}
      <div className="w-full container  overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[520px]">
        {/* Left Panel: Reach Out / Map Info */}
        <div className="md:col-span-5 bg-[#15120e] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          <div>
            <h3 className="text-xl font-bold tracking-tight mb-2">Reach Out</h3>
            <p className="text-xs text-[#999999] font-light mb-10">
              We typically respond within 2–3 business days.
            </p>

            {/* Information Blocks */}
            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 -full border border-neutral-800 bg-neutral-900 flex items-center justify-center shrink-0 mt-0.5 text-[#ba6143]">
                  <MapPinIcon />
                </div>
                <div>
                  <span className="text-[9px] tracking-wider font-bold text-[#888888] uppercase block mb-1">
                    Address
                  </span>
                  <p className="text-xs text-[#cccccc] leading-relaxed font-light">
                    DoUndo Corp.
                    <br />
                    Unit 277, 7025 Markham Road, Markham, Ontario
                    <br />
                    Canada - L3S 0C3
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 -full border border-neutral-800 bg-neutral-900 flex items-center justify-center shrink-0 mt-0.5 text-[#ba6143]">
                  <MailIcon />
                </div>
                <div>
                  <span className="text-[9px] tracking-wider font-bold text-[#888888] uppercase block mb-1">
                    Email
                  </span>
                  <a
                    href="mailto:hello@doundo.com"
                    className="text-xs text-[#cccccc] hover:text-white transition-colors font-light"
                  >
                    Info@doundogames.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Subdued ambient glowing background */}
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-[#ba6143]/10 blur-[50px] -full pointer-events-none" />
        </div>

        {/* Right Panel: Functional Form */}
        <form
          onSubmit={handleSubmit}
          className="md:col-span-7 p-8 md:p-12 flex flex-col justify-between bg-white text-[#222222]"
        >
          <div>
            <h3 className="text-xl font-bold tracking-tight mb-1 text-[#111111]">
              Send us a message
            </h3>
            <p className="text-xs text-[#777777] font-light mb-8">
              Fill in the form below and we&apos;ll get back to you shortly.
            </p>

            {/* Input fields row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Name (Combined First + Last Input) */}
              <div>
                <label className="text-[9px] tracking-wider font-bold text-[#666666] uppercase block mb-2">
                  First Name
                </label>

                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full bg-[#fcfaf4] border  px-3 py-2 text-xs text-[#222222] placeholder-neutral-400 focus:outline-none transition-colors ${
                    errors.firstName
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-neutral-200/60 focus:border-neutral-400"
                  }`}
                />

                {errors.firstName && (
                  <span className="text-red-500 text-[10px] mt-1 block">
                    {errors.firstName}
                  </span>
                )}
              </div>

              <div>
                <label className="text-[9px] tracking-wider font-bold text-[#666666] uppercase block mb-2">
                  Last Name
                </label>

                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full bg-[#fcfaf4] border  px-3 py-2 text-xs text-[#222222] placeholder-neutral-400 focus:outline-none transition-colors ${
                    errors.lastName
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-neutral-200/60 focus:border-neutral-400"
                  }`}
                />

                {errors.lastName && (
                  <span className="text-red-500 text-[10px] mt-1 block">
                    {errors.lastName}
                  </span>
                )}
              </div>
              {/* Email */}
              <div>
                <label className="text-[9px] tracking-wider font-bold text-[#666666] uppercase block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-[#fcfaf4] border  px-3 py-2 text-xs text-[#222222] placeholder-neutral-400 focus:outline-none transition-colors ${
                    errors.email
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-neutral-200/60 focus:border-neutral-400"
                  }`}
                />
                {errors.email && (
                  <span className="text-red-500 text-[10px] mt-1 block">
                    {errors.email}
                  </span>
                )}
              </div>

              <div>
                <label className="text-[9px] tracking-wider font-bold text-[#666666] uppercase block mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 (123) 456-7890"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full bg-[#fcfaf4] border  px-3 py-2 text-xs text-[#222222] placeholder-neutral-400 focus:outline-none transition-colors ${
                    errors.phone
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-neutral-200/60 focus:border-neutral-400"
                  }`}
                />

                {errors.phone && (
                  <span className="text-red-500 text-[10px] mt-1 block">
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>

            {/* Message Area */}
            <div className="mb-6">
              <label className="text-[9px] tracking-wider font-bold text-[#666666] uppercase block mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us how we can help..."
                value={formData.message}
                onChange={handleChange}
                className={`w-full bg-[#fcfaf4] border  px-3 py-2 text-xs text-[#222222] placeholder-neutral-400 focus:outline-none transition-colors resize-none ${
                  errors.message
                    ? "border-red-500 ring-1 ring-red-500"
                    : "border-neutral-200/60 focus:border-neutral-400"
                }`}
              />
              {errors.message && (
                <span className="text-red-500 text-[10px] mt-1 block">
                  {errors.message}
                </span>
              )}
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="flex flex-col mb-8">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={formData.privacyAgreed as boolean}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      privacyAgreed: e.target.checked as unknown as true,
                    }));
                    if (errors.privacyAgreed) {
                      setErrors((prev) => ({
                        ...prev,
                        privacyAgreed: undefined,
                      }));
                    }
                  }}
                  className="w-3.5 h-3.5 accent-[#ba6143] border-neutral-300  cursor-pointer"
                />
                <label
                  htmlFor="privacy"
                  className="text-xs text-[#555555] cursor-pointer font-light select-none"
                >
                  I agree to the{" "}
                  <Link
                    href="/privacy-policy"
                    className="underline hover:text-black"
                  >
                    privacy policy
                  </Link>
                </label>
              </div>
              {errors.privacyAgreed && (
                <span className="text-red-500 text-[10px] mt-1 block">
                  {errors.privacyAgreed}
                </span>
              )}
            </div>
          </div>

          {/* Shadcn UI / Custom Button Integration with isPending status */}
          <div>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-[#ba6143] text-white font-bold tracking-wider text-[10px] uppercase px-6 py-3  shadow-sm hover:bg-[#a35237] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed h-auto"
            >
              {isPending ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </div>

      <div className="w-full container h-[350px] md:h-[450px] -lg overflow-hidden ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d963.6179371730356!2d-79.27375832139533!3d43.83166698826154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d6bbc2dca6db%3A0xdcb08ca7548aaf0c!2s7011%20McCowan%20Rd%2C%20Markham%2C%20ON%20L3S%203L7%2C%20Canada!5e0!3m2!1sen!2sbd!4v1767039079283!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
};

export default GetInTouch;
