import React from "react";

const ShipingPolicy = () => {
  return (
    <section className="my-10 md:my-16 lg:my-20 w-[95%] mx-auto md:w-full">
      <div className="container mx-auto px-4 overflow-hidden">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-primary leading-[150%] mb-2">
            Shipping Policy
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Sections */}
          <div className="space-y-8">
            {/* Section 6 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                1. Shipping and Delivery
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                Shipping, delivery, customs, and related matters are governed by
                our Shipping & Delivery Policy, which is incorporated into these
                Terms by reference.
              </p>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                Risk of loss passes to you once we deliver the product to the
                carrier.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                2. Returns, Refunds, and Replacements
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal mb-4">
                Because our products are physical board games with components:
              </p>
              <ul className="space-y-2 ml-4 mb-4">
                {[
                  "We generally accept returns/replacements only in cases of damaged, defective, or incorrect items",
                  "Requests must be made within the time period stated in our policies",
                  "We may request photos or other proof of issue",
                ].map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-[#6C757D]">•</span>
                    <span className="text-[#6C757D] text-xl leading-[150%] font-normal">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                We reserve the right to refuse refunds or replacements if the
                product was misused or damaged after delivery.
              </p>
            </div>

            {/* Section 8 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                3. Pre-orders and Special Campaigns
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal mb-4">
                For pre-orders or crowdfunding campaigns:
              </p>
              <ul className="space-y-2 ml-4">
                {[
                  "Estimated delivery dates are approximate only",
                  "Production, shipping, or regulatory delays may occur",
                  "We will use reasonable efforts to communicate significant changes",
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

            {/* Section 9 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                4. Game Experience and No Professional Advice
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                DoUndo is an entertainment and strategy product. Any symbolic,
                narrative, or &quot;fortune-like&quot; elements are for creative
                and entertainment purposes only.
              </p>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal mt-4 mb-4">
                They do not represent:
              </p>
              <ul className="space-y-2 ml-4 mb-6">
                {[
                  "Psychological counselling",
                  "Medical, financial, or legal advice",
                  "Guarantees of outcomes, predictions, or personal improvement",
                ].map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-[#6C757D]">•</span>
                    <span className="text-[#6C757D] text-xl leading-[150%] font-normal">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                Real-life decisions should not be based solely on game results
                or symbolic interpretations.
              </p>
            </div>

            {/* Section 10 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                5. Disclaimer of Warranties
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal mb-4">
                To the fullest extent permitted by law:
              </p>
              <ul className="space-y-2 ml-4">
                {[
                  "The Site and all products are provided &quot;as is&quot; and &quot;as available&quot;.",
                  "We make no warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.",
                  "We do not warrant that the Site will be uninterrupted, secure, or error-free.",
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

            {/* Section 11 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                6. Limitation of Liability
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal mb-4">
                To the fullest extent permitted by law, in no event shall DoUndo
                Corp., its directors, officers, employees, or agents be liable
                for any:
              </p>
              <ul className="space-y-2 ml-4 mb-6">
                {[
                  "Indirect, incidental, consequential, special, punitive, or exemplary damages",
                  "Loss of profits, revenue, data, goodwill, or other intangible losses",
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
                Our total liability for any claim arising out of or relating to
                the Site or products shall not exceed the amount you actually
                paid for the product that gave rise to the claim, or one hundred
                (100) Canadian dollars, whichever is greater.
              </p>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                Some jurisdictions do not allow certain limitations, so some of
                these may not apply to you.
              </p>
            </div>

            {/* Section 12 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                7. Indemnification
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                You agree to indemnify, defend, and hold harmless DoUndo Corp.
                and its affiliates from any claims, liabilities, damages,
                losses, and expenses (including reasonable legal fees) arising
                out of or connected with:
              </p>
              <ul className="space-y-2 ml-4 mt-4">
                {[
                  "Your use of the Site or products",
                  "Your breach of these Terms",
                  "Your violation of any law or third-party rights",
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

            {/* Section 13 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                8. Third-Party Links
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                The Site may contain links to third-party websites. We are not
                responsible for the content, policies, or practices of those
                websites. Your use of them is at your own risk.
              </p>
            </div>

            {/* Section 14 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                9. Governing Law and Jurisdiction
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                These Terms are governed by the laws of the Province of Ontario
                and the federal laws of Canada applicable therein, without
                regard to conflict-of-law rules.
              </p>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal mt-4">
                You agree to submit to the exclusive jurisdiction of the courts
                located in Ontario, Canada.
              </p>
            </div>

            {/* Section 15 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                10. Changes to These Terms
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                We may update these Terms periodically. Any changes will be
                posted on the Site with a &quot;Last Updated&quot; date.
                Continued use of the Site constitutes acceptance of the updated
                Terms.
              </p>
            </div>

            {/* Section 16 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                11. Contact
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

export default ShipingPolicy;
