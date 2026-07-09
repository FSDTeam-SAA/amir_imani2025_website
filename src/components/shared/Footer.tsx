"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialIcons from "../footer/SocialIcons";
import FooterLinks from "../footer/FooterLinks";
import NewsletterForm from "../footer/NewsletterForm";
// import NewsletterForm from "../footer/NewsletterForm";

// Constants for maintainability
const COMPANY_INFO = {
  name: "DoUndo",
  description: "A Universe of Games for Curious Minds.",
  logo: "/footerlogo.svg",
  logoAlt: "DoUndo Logo",
};

const PRODUCTS_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Games", href: "/game" },
  { label: "Merchandise", href: "/merchandise" },
  { label: "Fortune Telling", href: "/fortune-telling" },
  { label: "Contact", href: "/contact" },
];

const RESOURCES_LINKS = [
  { label: "Cart", href: "/cart" },
  { label: "Blog", href: "/blogs" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/term-condition" },
  { label: "Shipping policy", href: "/shipping-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const LEGAL_LINKS = [
  { label: "Terms", href: "/term-condition" },
  { label: "Privacy", href: "/privacy-policy" },
  // { label: "Cookies", href: "/cookies" },
  // { label: "Sitemap", href: "/sitemap.xml" },
];

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY_INFO.name,
  url: "https://yourdomain.com",
  logo: "https://yourdomain.com/logo.svg",
  sameAs: [
    "https://twitter.com/yourcompany",
    "https://facebook.com/yourcompany",
    "https://instagram.com/yourcompany",
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isFortunePage = pathname === "/fortune-telling";

  return (
    <footer
      className="text-white "
      role="contentinfo"
      aria-label="Website footer"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Main Footer Content */}
      <div
        className={`py-10 text-white md:py-12 ${
          isFortunePage ? "bg-[#0b191d]" : "bg-[#3D8D9A]"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-0 ">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-4">
            {/* Company Info - Column 1 */}
            <div className="col-span-2 md:col-span-2 lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-2 pl-3">
                <Link href="/" className="block">
                  <Image
                    src={COMPANY_INFO.logo}
                    alt={COMPANY_INFO.logoAlt}
                    width={320}
                    height={47}
                    className="w-[60%] md:w-full object-cover max-w-81"
                    priority={false}
                    loading="lazy"
                    // sizes="(max-width: 328px) 100px, 120px"
                  />
                </Link>
              </div>

              <p className="text-sm text-[#FFFFFF] md:text-base leading-relaxed max-w-sm pl-3">
                {COMPANY_INFO.description}
              </p>

              <div className="w-full">
                <SocialIcons />
              </div>
            </div>
            <div className="pl-3">
              {/* Products Links - Column 2 */}
              <FooterLinks title="Products" links={PRODUCTS_LINKS} />
            </div>
            <div className="pl-3">
              {/* Resources Links - Column 3 */}
              <FooterLinks title="Resources" links={RESOURCES_LINKS} />
              
            </div>

            {/* Newsletter - Column 4 */}
            <div className="col-span-2 md:col-span-1 lg:col-span-2 pl-3">
              <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
              {/* <p className="text-white/80 text-sm mb-4">
                Subscribe to our newsletter for the latest updates and offers.
              </p>
               */}
              <NewsletterForm />

              {/* <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-xs text-white/60">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates.
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className={`${isFortunePage ? "bg-[#081316]" : "bg-white"} py-2`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            {/* Copyright */}
            <p
              className={`order-2 text-xs md:order-1 md:text-sm ${
                isFortunePage ? "text-white/65" : "text-[#717680]"
              }`}
            >
              &copy; {currentYear} {COMPANY_INFO.name}. All rights reserved.
            </p>

            {/* Legal Links */}
            <nav
              className="order-1 md:order-2"
              aria-label="Legal links"
              itemScope
              itemType="https://schema.org/SiteNavigationElement"
            >
              <ul className="flex flex-wrap justify-center gap-3 md:gap-6">
                {LEGAL_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`text-xs font-medium underline transition-colors duration-300 md:text-sm ${
                        isFortunePage
                          ? "text-white/70 hover:text-white"
                          : "text-[#717680] hover:text-primary"
                      }`}
                      prefetch={false}
                      itemProp="url"
                    >
                      <span itemProp="name">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Additional Info */}
          {/* <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <p className="text-xs text-white/60">
              Made with ❤️ for amazing digital experiences
            </p>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
