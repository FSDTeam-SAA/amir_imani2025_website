import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <section className="my-10 md:my-16 lg:my-20 w-[95%] mx-auto md:w-full">
      <div className="container mx-auto px-4 overflow-hidden">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-primary leading-[150%] mb-2">
            Privacy policy
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Intro */}
          <div className="space-y-4">
            <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
              Privacy Policy – DoUndo Corp.
            </h3>
            <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
              Last Updated: September 2025
            </p>
            <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
              DoUndo Corp. (&quot;DoUndo&quot;, &quot;we&quot;, &quot;us&quot;,
              or &quot;our&quot;) respects your privacy and is committed to
              protecting your personal information. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when
              you visit or use our websites, including doundo.games,
              doundogames.com, and any related subdomains or pages that link to
              this Policy (collectively, the &quot;Site&quot;).
            </p>
            <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
              By accessing or using the Site, purchasing our products, or
              interacting with us, you agree to this Privacy Policy. If you do
              not agree with any part of this Policy, please do not use the
              Site.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {/* Section 1 */}
            <Section
              title="1. Information We Collect"
              content={
                <>
                  <p className="text-[#6C757D] text-xl leading-[150%] font-normal mb-4">
                    We may collect the following categories of information:
                  </p>
                  <div className="space-y-6 ml-4">
                    <SubSection
                      title="1.1 Information You Provide Directly"
                      items={[
                        "Name, email address, phone number, billing and shipping address",
                        "Account details (if you create an account)",
                        "Order and transaction information",
                        "Messages and content you send to us (e.g., support requests, feedback, surveys)",
                      ]}
                    />
                    <SubSection
                      title="1.2 Information Collected Automatically"
                      description="When you use the Site, we may automatically collect:"
                      items={[
                        "IP address and approximate location",
                        "Browser type, device type, operating system",
                        "Pages viewed, time spent on pages, referring URLs, clickstream data",
                        "Cookie and tracking data (e.g., Google Analytics, Meta Pixel)",
                      ]}
                    />
                    <SubSection
                      title="1.3 Payment Information"
                      description={
                        <>
                          Payments are processed by third-party providers such
                          as Stripe or PayPal.
                          <br />
                          They collect and process your payment card details
                          directly. We do not store your full card number or
                          CVV. We may receive:
                        </>
                      }
                      items={[
                        "Confirmation of payment",
                        "Partial card details (e.g., last 4 digits)",
                        "Transaction IDs for record-keeping and fraud prevention",
                      ]}
                    />
                    <SubSection
                      title="1.4 Information from Third Parties"
                      description="We may receive limited information from:"
                      items={[
                        "Analytics providers",
                        "Advertising partners",
                        "Payment and fraud prevention services",
                      ]}
                    />
                  </div>
                </>
              }
            />

            {/* Section 2 */}
            <Section
              title="2. How We Use Your Information"
              content={
                <>
                  <p className="text-[#6C757D] text-xl leading-[150%] font-normal mb-4">
                    We use your information to:
                  </p>
                  <ul className="space-y-2 ml-4 mb-4">
                    {[
                      "Process, fulfill, and ship your orders",
                      "Communicate with you about orders, updates, and support",
                      "Provide, maintain, and improve the Site and our products",
                      "Personalize your experience and content",
                      "Send marketing communications where allowed (you can opt out at any time)",
                      "Monitor Site performance and usage",
                      "Detect, prevent, and investigate fraud, abuse, and security incidents",
                      "Comply with legal and regulatory requirements",
                    ].map((item, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="text-[#6C757D]">•</span>
                        <span className="text-[#6C757D] text-xl leading-[150%] font-normal">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[#6C757D] text-xl leading-[150%] font-semibold">
                    We do not sell your personal information.
                  </p>
                </>
              }
            />

            {/* Section 3 */}
            <Section
              title="3. Legal Bases (EEA/UK Users)"
              content={
                <>
                  <p className="text-[#6C757D] text-xl leading-[150%] font-normal mb-4">
                    If you are in the EEA or UK, we process your personal data
                    based on:
                  </p>
                  <List
                    items={[
                      "Performance of a contract (e.g., order fulfillment)",
                      "Legitimate interests (e.g., improving services, preventing fraud)",
                      "Compliance with legal obligations (e.g., tax, accounting)",
                      "Consent (e.g., certain marketing or cookies where required)",
                    ]}
                  />
                </>
              }
            />

            {/* Section 4 */}
            <Section
              title="4. Cookies and Tracking Technologies"
              content={
                <>
                  <p className="text-[#6C757D] text-xl leading-[150%] font-normal mb-4">
                    We use cookies and similar technologies to:
                  </p>
                  <List
                    items={[
                      "Enable core Site functions",
                      "Remember your preferences",
                      "Analyze traffic and performance",
                      "Support advertising and retargeting (where applicable)",
                    ]}
                  />
                  <p className="text-[#6C757D] text-xl leading-[150%] font-normal mt-4">
                    You can manage or disable cookies in your browser settings.
                    Some features may not work properly if cookies are disabled.
                  </p>
                </>
              }
            />

            {/* Section 5 */}
            <Section
              title="5. How We Share Your Information"
              content={
                <>
                  <p className="text-[#6C757D] text-xl leading-[150%] font-normal mb-4">
                    We may share your information with:
                  </p>
                  <List
                    items={[
                      "Service providers (hosting, payment, analytics, email services, support tools)",
                      "Shipping and logistics partners (for delivery of products)",
                      "Professional advisors (lawyers, accountants)",
                      "Authorities or law enforcement when required by law or to protect rights and safety",
                      "Successors in business transactions (e.g., merger, acquisition), subject to safeguards",
                    ]}
                  />
                  <p className="text-[#6C757D] text-xl leading-[150%] font-semibold mt-4">
                    We do not allow service providers to use your data for their
                    own independent marketing.
                  </p>
                </>
              }
            />

            {/* Section 6 */}
            <Section
              title="6. Data Retention"
              content={
                <>
                  <p className="text-[#6C757D] text-xl leading-[150%] font-normal mb-4">
                    We retain personal information for as long as necessary to:
                  </p>
                  <List
                    items={[
                      "Provide products and services",
                      "Comply with legal, tax, and accounting obligations",
                      "Resolve disputes and enforce agreements",
                    ]}
                  />
                  <p className="text-[#6C757D] text-xl leading-[150%] font-normal mt-4">
                    When data is no longer required, it will be deleted,
                    anonymized, or securely archived.
                  </p>
                </>
              }
            />

            {/* Section 7 */}
            <Section
              title="7. Data Security"
              content={
                <>
                  <p className="text-[#6C757D] text-xl leading-[150%] font-normal mb-4">
                    We implement reasonable technical and organizational
                    measures, such as:
                  </p>
                  <List
                    items={[
                      "SSL/HTTPS encryption",
                      "Restricted access to data",
                      "Secure storage practices",
                    ]}
                  />
                  <p className="text-[#6C757D] text-xl leading-[150%] font-normal mt-4">
                    However, no method of transmission or storage is 100%
                    secure. We cannot guarantee absolute security.
                  </p>
                </>
              }
            />

            {/* Section 8 */}
            <Section
              title="8. International Transfers"
              content={
                <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                  Your information may be transferred and processed in countries
                  other than your own, including Canada and the United States.
                  These countries may have different data protection laws. Where
                  required, we use appropriate safeguards for such transfers.
                </p>
              }
            />

            {/* Section 9 */}
            <Section
              title="9. Your Rights"
              content={
                <>
                  <p className="text-[#6C757D] text-xl leading-[150%] font-normal mb-4">
                    Depending on your jurisdiction, you may have the right to:
                  </p>
                  <List
                    items={[
                      "Access the personal information we hold about you",
                      "Request corrections to inaccurate information",
                      "Request deletion of your information (subject to legal exceptions)",
                      "Object to or restrict certain processing",
                      "Request data portability",
                      "Withdraw consent where we rely on consent",
                    ]}
                  />
                  <p className="text-[#6C757D] text-xl leading-[150%] font-normal mt-4">
                    To exercise your rights, contact: info@doundogames.com
                  </p>
                  <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                    We may ask you to verify your identity before responding.
                  </p>
                </>
              }
            />

            {/* Section 10 */}
            <Section
              title="10. Children's Privacy"
              content={
                <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                  Our Site is intended primarily for adults (such as parents and
                  guardians). We do not knowingly collect personal information
                  from children under 13 (or as defined by local law) without
                  parental consent. If you believe we have collected such data,
                  contact us and we will act promptly.
                </p>
              }
            />

            {/* Section 11 */}
            <Section
              title="11. Third-Party Websites"
              content={
                <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                  The Site may contain links to third-party websites or
                  services. We are not responsible for their content, privacy
                  policies, or practices. You should review their policies
                  separately.
                </p>
              }
            />

            {/* Section 12 */}
            <Section
              title="12. Changes to This Policy"
              content={
                <p className="text-[#6C757D] text-xl leading-[150%] font-normal">
                  We may update this Privacy Policy from time to time. Updates
                  will be posted on this page with a new &quot;Last
                  Updated&quot; date. Continued use of the Site after changes
                  means you accept the updated Policy.
                </p>
              }
            />

            {/* Section 13 */}
            <Section
              title="13. Contact Us"
              content={
                <>
                  <p className="text-[#6C757D] text-xl leading-[150%] font-normal mb-4">
                    For questions about this Privacy Policy or our data
                    practices:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-center gap-3">
                      <span className="text-[#6C757D]">•</span>
                      <span className="text-[#6C757D] text-xl leading-[150%] font-normal">
                        Email:{" "}
                        <Link
                          href="mailto:info@doundogames.com"
                          className="text-blue-600 hover:underline transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          info@doundogames.com
                        </Link>
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#6C757D]">•</span>
                      <span className="text-[#6C757D] text-xl leading-[150%] font-normal">
                        Mailing Address: DoUndo Corp., 7011 McCowan Road,
                        Markham, Ontario, L3S 3L7, Canada
                      </span>
                    </li>
                  </ul>
                </>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable Section Component
const Section = ({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) => (
  <div className="space-y-4">
    <h3 className="font-inter font-semibold text-2xl leading-[150%] text-primary">
      {title}
    </h3>
    {content}
  </div>
);

// Reusable SubSection Component
const SubSection = ({
  title,
  description,
  items,
}: {
  title: string;
  description?: string | React.ReactNode;
  items: string[];
}) => (
  <div>
    <h4 className="font-inter font-semibold text-xl leading-[150%] text-primary mb-2">
      {title}
    </h4>
    {description && (
      <p className="text-[#6C757D] text-xl leading-[150%] font-normal mb-2">
        {description}
      </p>
    )}
    <ul className="space-y-1">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span className="text-[#6C757D]">•</span>
          <span className="text-[#6C757D] text-xl leading-[150%] font-normal">
            {item}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

// Reusable List Component
const List = ({ items }: { items: string[] }) => (
  <ul className="space-y-2 ml-4">
    {items.map((item, index) => (
      <li key={index} className="flex gap-3">
        <span className="text-[#6C757D]">•</span>
        <span className="text-[#6C757D] text-xl leading-[150%] font-normal">
          {item}
        </span>
      </li>
    ))}
  </ul>
);

export default PrivacyPolicy;
