"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, LogOut, Search, ShoppingCart, User2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useUserProfile } from "@/hooks/use-user-profile";
import { useCart } from "@/provider/cart-provider";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import SearchMotal from "../search/SearchMotal";
import StarfieldBackground from "@/app/(website)/fortune-telling/_components/starfield-background";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Games", href: "/game" },
  { name: "Merchandise", href: "/merchandise" },
  { name: "Fortune Telling", href: "/fortune-telling" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { profile, loading } = useUserProfile();
  const { cart } = useCart();
  const isFortunePage = pathname === "/fortune-telling";

  const cartItemCount = cart?.productIds?.length || 0;
  const isAdmin = profile?.role?.toLowerCase() === "admin";

  const getUserInitials = () => {
    if (!profile) return "U";
    const firstInitial = profile.firstName ? profile.firstName[0] : "";
    const lastInitial = profile.lastName ? profile.lastName[0] : "";
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  const getFullName = () => {
    if (!profile) return "User";
    return (
      `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || "User"
    );
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <header className="fixed top-0 z-50 w-full animate-in fade-in duration-500">
      <div
        className={`relative w-full border-b backdrop-blur-md transition-all duration-300 ${
          isFortunePage
            ? "border-[#1e3136] bg-[#0b191d]/95 text-white"
            : "border-white/10 bg-[#FFFFFF]"
        }`}
      >
        {isFortunePage && (
          <StarfieldBackground
            showBackdrop={false}
            densityScale={0.12}
            durationMs={3400}
            canvasOpacity={0.7}
          />
        )}
        <div className="container relative z-10 mx-auto px-4 2xl:px-0">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={271}
                  height={60}
                  className="h-10 w-40 md:w-60 sm:h-12 lg:h-14"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation - Hidden on mobile/tablet */}
            <nav className="hidden lg:flex xl:items-center xl:space-x-1 2xl:space-x-2">
              {navigationItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/") ||
                  (item.href === "/game" && pathname.startsWith("/product/"));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      isActive
                        ? isFortunePage
                          ? "bg-white/10 text-white font-semibold"
                          : "text-primary font-semibold"
                        : isFortunePage
                          ? "text-white/80"
                          : "text-[#0E1D2B]"
                    } px-3 py-2 text-sm 2xl:text-base rounded-lg transition-all duration-200 ${
                      isFortunePage
                        ? "hover:bg-white/10 hover:text-white"
                        : "hover:text-primary hover:bg-white/30"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                className={`relative bg-transparent transition-colors ${
                  isFortunePage ? "hover:bg-white/10" : "hover:bg-white/20"
                }`}
                aria-label="Search"
              >
                <Search
                  className={`h-5 w-5 sm:h-8 sm:w-8 ${
                    isFortunePage ? "text-white" : "text-primary"
                  }`}
                />
              </Button>

              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                className={`relative bg-transparent transition-colors ${
                  isFortunePage ? "hover:bg-white/10" : "hover:bg-white/20"
                }`}
                aria-label={`Shopping cart with ${cartItemCount} items`}
                asChild
              >
                <Link href="/cart">
                  <ShoppingCart
                    className={`h-5 w-5 sm:h-8 sm:w-8 ${
                      isFortunePage ? "text-white" : "text-primary"
                    }`}
                  />
                  {cartItemCount > 0 && (
                    <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center shadow-lg animate-in fade-in zoom-in">
                      {cartItemCount > 99 ? "99+" : cartItemCount}
                    </span>
                  )}
                </Link>
              </Button>

              {/* User Profile/Login - Desktop */}
              <div className="hidden lg:block">
                {status === "authenticated" && session ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`relative bg-transparent transition-colors ${
                          isFortunePage ? "hover:bg-white/10" : "hover:bg-white/20"
                        }`}
                        aria-label="User menu"
                      >
                        {profile?.imageLink ? (
                          <Image
                            src={profile.imageLink}
                            alt={getFullName()}
                            width={32}
                            height={32}
                            className="rounded-full object-cover border-2 border-primary"
                          />
                        ) : (
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              isFortunePage ? "bg-white/15" : "bg-primary"
                            }`}
                          >
                            <span className="text-white text-sm font-semibold">
                              {getUserInitials()}
                            </span>
                          </div>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64">
                      <div className="flex items-center space-x-3 p-3">
                        {profile?.imageLink ? (
                          <Image
                            src={profile.imageLink}
                            alt={getFullName()}
                            width={40}
                            height={40}
                            className="rounded-full object-cover border-2 border-primary"
                          />
                        ) : (
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center ${
                              isFortunePage ? "bg-white/15" : "bg-primary"
                            }`}
                          >
                            <span className="text-white font-semibold">
                              {getUserInitials()}
                            </span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">
                            {loading ? "Loading..." : getFullName()}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {loading
                              ? "Loading..."
                              : profile?.email ||
                                session.user?.email ||
                                "No email"}
                          </p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {profile?.role || "User"}
                          </p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        {isAdmin ? (
                          <Link
                            href="https://admin.doundogames.com/"
                            className="cursor-pointer"
                            target="_blank"
                          >
                            Dashboard
                          </Link>
                        ) : (
                          <Link href="/profile" className="cursor-pointer">
                            Account Settings
                          </Link>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                        onClick={() => signOut()}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/login">
                    <Button
                      size="sm"
                      className={`text-white font-medium ${
                        isFortunePage
                          ? "bg-white/10 hover:bg-white/20"
                          : "bg-primary hover:bg-[#D63E1F]"
                      }`}
                    >
                      Log In
                    </Button>
                  </Link>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="block lg:hidden ">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild className="">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`${
                        isFortunePage
                          ? "text-white hover:bg-white/10"
                          : "text-[#0E1D2B] hover:bg-white/20"
                      }`}
                      aria-label="Open menu"
                    >
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className={`w-[85vw] sm:w-[400px] p-0 `}
                  >
                    <div className="flex flex-col h-full">
                      {/* Mobile Header */}
                      {/* <div className="flex items-center justify-between p-6 border-b">
                        <Image
                          src="/logo.svg"
                          alt="Logo"
                          width={150}
                          height={40}
                          className="h-10 w-auto"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsOpen(false)}
                          aria-label="Close menu"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div> */}

                      {/* User info section for mobile */}
                      {status === "authenticated" && session && (
                        <div className="p-6 bg-gradient-to-r from-primary/10 to-transparent border-b">
                          <div className="flex items-center space-x-4">
                            {profile?.imageLink ? (
                              <Image
                                src={profile.imageLink}
                                alt={getFullName()}
                                width={48}
                                height={48}
                                className="rounded-full object-cover border-2 border-primary"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                {loading ? (
                                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <span className="text-white font-semibold">
                                    {getUserInitials()}
                                  </span>
                                )}
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-base truncate">
                                {loading ? "Loading..." : getFullName()}
                              </p>
                              <p className="text-sm text-muted-foreground truncate">
                                {loading
                                  ? "Loading..."
                                  : profile?.email ||
                                    session.user?.email ||
                                    "No email"}
                              </p>
                              {profile?.role && !isAdmin && (
                                <p className="text-xs text-muted-foreground capitalize mt-1">
                                  {profile.role}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Navigation items */}
                      <nav className="flex-1 overflow-hidden  py-6 mt-8">
                        <div className="space-y-1 px-4">
                          {navigationItems.map((item) => {
                            const isActive =
                              pathname === item.href ||
                              pathname.startsWith(item.href + "/") ||
                              (item.href === "/game" &&
                                pathname.startsWith("/product/"));
                            return (
                              <Link
                                key={item.name}
                                href={item.href}
                                className={`${
                                  isActive
                                    ? "bg-primary/10 text-primary font-semibold"
                                    : "text-[#0E1D2B] font-medium"
                                } block px-4 py-3 rounded-lg hover:bg-primary/5 transition-colors duration-200`}
                                onClick={() => setIsOpen(false)}
                              >
                                {item.name}
                              </Link>
                            );
                          })}
                        </div>
                      </nav>

                      {/* Mobile Footer Actions */}
                      <div className="border-t p-6 space-y-3">
                        {status === "authenticated" && session ? (
                          <>
                            <Button
                              variant="outline"
                              className="w-full justify-start"
                              asChild
                            >
                              <Link
                                href="/profile"
                                onClick={() => setIsOpen(false)}
                              >
                                <User2Icon className="mr-2 h-4 w-4" />
                                Account Settings
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                              onClick={() => {
                                signOut();
                                setIsOpen(false);
                              }}
                            >
                              <LogOut className="mr-2 h-4 w-4" />
                              Log Out
                            </Button>
                          </>
                        ) : (
                          <Button
                            className="w-full bg-primary hover:bg-[#D63E1F] text-white"
                            asChild
                          >
                            <Link
                              href="/login"
                              onClick={() => setIsOpen(false)}
                            >
                              Log In
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>

        <SearchMotal open={searchOpen} onSetSearchOpen={setSearchOpen} />
      </div>
    </header>
  );
}
