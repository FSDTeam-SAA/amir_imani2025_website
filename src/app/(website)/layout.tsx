"use client";

import { Poppins } from "next/font/google";
import "../globals.css";
import TanstackProvider from "@/provider/Tanstack-provider";
import Provider from "@/provider/authprovider";
import { CartProvider } from "@/provider/cart-provider";

import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/Footer";
import { usePathname } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased font-sans">
        <TanstackProvider>
          <Provider>
            <CartProvider>
              <div className="website-shell min-h-screen flex flex-col text-primary-foreground">
                <Navbar />
                <main className={`flex-1 ${!isHome ? "pt-16 lg:pt-20" : ""}`}>
                  {children}
                </main>
                <Footer />
              </div>
            </CartProvider>
          </Provider>
        </TanstackProvider>
      </body>
    </html>
  );
}
