import type { Metadata } from "next";
import "../globals.css";
import { RiCloseLargeLine } from "react-icons/ri";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Authentication Layout",
  description: "Authentication Layout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="min-h-screen flex items-center justify-center flex-col gap-5 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/login.jpg')",
      }}
    >
      <Link href={"/"} className=" absolute top-10 right-10 ">
        <RiCloseLargeLine className=" w-9! h-9!  p-2 rounded-full bg-primary text-white transform transition duration-700 hover:bg-[#3D8D9A] cursor-pointer " />
      </Link>

      {/* Logo */}
      {/* <div className=" flex items-center justify-center mb-4">
        <Image
          src="/logo.svg"
          alt="logo"
          width={50}
          height={60}
          className="w-full "
          priority
        />
      </div> */}

      {children}
    </div>
  );
}
