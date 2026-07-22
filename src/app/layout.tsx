import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import TanstackProvider from "@/provider/Tanstack-provider";
import Provider from "@/provider/authprovider";
import { CartProvider } from "@/provider/cart-provider";
import { Toaster } from "sonner";
import CustomCursor from "@/components/shared/CustomCursor";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "DOUNDO | GAME",
  description:
    "Explore the world of Unique Card Games and Merchandise products",
  keywords: ["Card Games", "Unique Card Games", "DOUNDO"],
  openGraph: {
    title: "DOUNDO | GAME",
    description: "Explore the world of Unique Card Games",
    type: "website",
    locale: "en_US",
    siteName: "DOUNDO | GAME",
  },
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased">
        <TanstackProvider>
          <Provider>
            <CartProvider>
               <CustomCursor/>
              {children}
              <Toaster position="top-right" richColors />
            </CartProvider>
          </Provider>
        </TanstackProvider>
      </body>
    </html>
  );
}
