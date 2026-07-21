import React from "react";

const TermCondition = () => {
  return (
    <section className="my-10 md:my-16 lg:my-20 w-[95%] mx-auto md:w-full">
      <div className="container mx-auto px-4 overflow-hidden">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-primary leading-[150%] mb-2">
            Terms & Conditions
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Intro */}
          <div className="space-y-4">
            <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
              Terms & Conditions – DoUndo Corp.
            </h3>
            <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
              Last Updated: September 2025
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {/* Section 1 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                1. Agreement to Terms
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                These Terms & Conditions (&quot;Terms&quot;) govern your access
                to and use of the DoUndo websites (doundogames.com,
                doundogames.com) and your purchase and use of our products and
                services (collectively, the &quot;Services&quot;).
              </p>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                By accessing the Site, creating an account, or placing an order,
                you agree to be bound by these Terms. If you do not agree, you
                must not use the Site or Services.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                2. Intellectual Property Rights
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal mb-4">
                All content on the Site and in DoUndo products is owned or
                licensed by DoUndo Corp., including but not limited to:
              </p>
              <ul className="space-y-2 ml-4">
                {[
                  "Game rules, mechanics, and systems",
                  "Artwork, illustrations, symbols, icons, and visual language",
                  "Logos, brand names, and trademarks",
                  "Manuals, packaging designs, and layout",
                  "Text, audio, video, and digital content",
                ].map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-[#6C757D]">•</span>
                    <span className="text-[#6C757D] text-xl leading-[150%] font-normal">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal mt-4">
                You may not copy, reproduce, distribute, modify, adapt, create
                derivative works, or otherwise exploit any content without our
                prior written consent.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                3. Use of the Site
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal mb-4">
                You agree not to:
              </p>
              <ul className="space-y-2 ml-4">
                {[
                  "Use the Site for any unlawful purpose",
                  "Interfere with or disrupt the operation of the Site",
                  "Attempt to gain unauthorized access to any part of the Site or systems",
                  "Use automated tools (e.g., bots, scrapers) without our permission",
                  "Upload or transmit malware, viruses, or harmful code",
                  "Impersonate any person or misrepresent your identity",
                ].map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-[#6C757D]">•</span>
                    <span className="text-[#6C757D] text-xl leading-[150%] font-normal">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal mt-4">
                We reserve the right to suspend or terminate access if we
                believe you have violated these Terms.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                4. Product Information and Availability
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal mb-4">
                We make reasonable efforts to ensure that product descriptions,
                images, and prices are accurate. However:
              </p>
              <ul className="space-y-2 ml-4">
                {[
                  "We do not warrant that all information is error-free, current, or complete",
                  "Products, prices, and availability may change without notice",
                  "We may limit quantities or discontinue products at any time",
                ].map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-[#6C757D]">•</span>
                    <span className="text-[#6C757D] text-xl leading-[150%] font-normal">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 5 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                5. Orders, Pricing, and Payments
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal mb-4">
                By placing an order, you represent that:
              </p>
              <ul className="space-y-2 ml-4 mb-6">
                {[
                  "You are legally able to enter into a binding contract",
                  "The information you provide is accurate and complete",
                  "You are authorized to use the payment method provided",
                ].map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-[#6C757D]">•</span>
                    <span className="text-[#6C757D] text-xl leading-[150%] font-normal">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal mb-4">
                We reserve the right to:
              </p>
              <ul className="space-y-2 ml-4">
                {[
                  "Accept or decline any order",
                  "Cancel orders in cases of suspected fraud or errors",
                  "Correct pricing mistakes, even after order submission (with option to cancel)",
                ].map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-[#6C757D]">•</span>
                    <span className="text-[#6C757D] text-xl leading-[150%] font-normal">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal mt-4">
                Payments are processed via third-party payment processors (e.g.,
                Stripe, PayPal). Your use of those services may be governed by
                their own terms.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                6. Contact
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal mb-4">
                For questions regarding these Terms:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex gap-3">
                  <span className="text-[#6C757D]">•</span>
                  <span className="text-[#6C757D] text-xl leading-[150%] font-normal">
                    Email:{" "}
                    <a
                      href="mailto:info@doundogames.com"
                      className="text-blue-600 hover:underline"
                    >
                      info@doundogames.com
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermCondition;
