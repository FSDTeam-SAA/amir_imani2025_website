import React from "react";
import Link from "next/link";

const LegalDisclaimerPage = () => {
  return (
    <section className="py-10 w-[95%] mx-auto md:w-full bg-[#FAF7F0]">
      <div className="container mx-auto px-4 overflow-hidden">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-primary leading-[150%] mb-2">
            Legal Disclaimer
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Intro */}
          <div className="space-y-4">
            <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
              Legal Disclaimer – DoUndo Corp.
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
                1. General Information
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                All content and information provided on the DoUndo websites and
                in our products is offered in good faith for general
                informational and entertainment purposes only. We make no
                representation or warranty of any kind regarding:
              </p>
              <ul className="space-y-2 ml-4 mt-2">
                {[
                  "Accuracy or completeness of any information",
                  "Availability, reliability, or suitability of the Site or products for your particular purposes",
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
                You use the Site and products at your own risk.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                2. Entertainment and Non-Advice
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                Some DoUndo products and content may include:
              </p>
              <ul className="space-y-2 ml-4 mt-2 mb-4">
                {[
                  "Symbols and visual language",
                  "Storytelling elements",
                  'Interpretive or "fortune-like" formats',
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
                These are intended solely as entertainment and creative tools.
                They do not constitute:
              </p>
              <ul className="space-y-2 ml-4 mt-2">
                {[
                  "Psychological or therapeutic advice",
                  "Medical, financial, legal, or professional advice",
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
                You should not rely on game outcomes, symbols, or narratives for
                real-life decisions in these areas.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                3. No Guarantees
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                We do not guarantee:
              </p>
              <ul className="space-y-2 ml-4 mt-2">
                {[
                  "Any particular emotional, psychological, or practical outcome from using our products",
                  "That you will gain specific insights or results",
                  "That interpretations, symbols, or meanings are objectively accurate or predictive",
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
                All experiences with DoUndo are subjective and vary from person
                to person.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                4. Third-Party Content and Links
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                The Site may include:
              </p>
              <ul className="space-y-2 ml-4 mt-2 mb-4">
                {[
                  "Links to third-party websites",
                  "Embedded third-party content",
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
                We are not responsible for:
              </p>
              <ul className="space-y-2 ml-4 mt-2">
                {[
                  "The content, availability, or accuracy of third-party sites",
                  "Their privacy policies or practices",
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
                Your use of third-party sites is at your own risk.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                5. Product Safety
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                DoUndo products may contain small components. Please:
              </p>
              <ul className="space-y-2 ml-4 mt-2">
                {[
                  "Check the age recommendation on the box",
                  "Keep small parts away from young children",
                  "Use the game only as intended and under appropriate supervision",
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
                We are not responsible for injuries or damages arising from
                misuse.
              </p>
            </div>

            {/* Section 6 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                6. Limitation of Liability
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal mb-4">
                To the fullest extent permitted by law:
              </p>
              <ul className="space-y-2 ml-4 mb-4">
                <li className="flex gap-3">
                  <span className="text-[#6C757D]">•</span>
                  <span className="text-[#6C757D] text-xl leading-[150%] font-normal">
                    DoUndo Corp. and its directors, officers, employees, and
                    agents shall not be liable for any indirect, incidental,
                    consequential, special, punitive, or exemplary damages
                    arising out of your use of the Site or products.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#6C757D]">•</span>
                  <span className="text-[#6C757D] text-xl leading-[150%] font-normal">
                    Our total liability shall not exceed the amount you paid for
                    the product giving rise to the claim, or one hundred (100)
                    Canadian dollars, whichever is greater.
                  </span>
                </li>
              </ul>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                Some jurisdictions do not allow certain limitations; in such
                cases, your statutory rights may apply.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                7. Consumer Rights
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                Nothing in this Disclaimer is intended to limit any non-waivable
                rights you may have under applicable consumer protection laws in
                your jurisdiction.
              </p>
            </div>

            {/* Section 8 */}
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
                8. Contact
              </h3>
              <p className="text-[#6C757D] text-xl leading-[150%] font-normal mb-4">
                For questions about this Disclaimer:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex gap-3">
                  <span className="text-[#6C757D]">•</span>
                  <span className="text-[#6C757D] text-xl leading-[150%] font-normal">
                    Email:{" "}
                    <Link
                      href="mailto:info@doundogames.com"
                      className="text-blue-600 hover:underline transition-colors"
                    >
                      info@doundogames.com
                    </Link>
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

export default LegalDisclaimerPage;
