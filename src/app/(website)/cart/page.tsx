"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import ProductNavbar from "@/components/shared/ProductNavbar";
import ProductFooter from "@/components/shared/ProductFooter";
import CartItem from "@/components/shared/CartItem";
import OrderSummary from "@/components/shared/OrderSummary";
import {
  useCartQuery,
  useUpdateCartQuantity,
  useRemoveFromCart,
} from "@/hooks/use-cart-query";
import { useCartLogic, getCartItemKey } from "@/hooks/use-cart-logic";
import CartSkeleton from "@/components/shared/CartSkeleton";
import { couponService } from "@/lib/api/coupon-service";
import {
  clearAppliedCoupon,
  saveAppliedCoupon,
} from "@/lib/utils/applied-coupon";
import {
  calculateShippingCad,
  ShippingCountry,
} from "@/lib/utils/shipping";
import { useCurrency } from "@/hooks/use-currency";

export default function CartPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [couponCode, setCouponCode] = React.useState("");
  const [couponDiscount, setCouponDiscount] = React.useState(0);
  const [couponError, setCouponError] = React.useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = React.useState(false);
  const [shippingCountry, setShippingCountry] =
    React.useState<ShippingCountry>("CA");
  const { currency, setCurrency } = useCurrency();

  // Fetch cart data
  const { data: cart, isLoading } = useCartQuery();

  // Mutations
  const { mutate: updateQuantity } = useUpdateCartQuantity();
  const { mutate: removeFromCart } = useRemoveFromCart();

  // Cart UI logic
  const {
    items,
    localQuantities,
    subtotal,
    handleQuantityChange,
    handleRemove,
  } = useCartLogic({
    cart: cart || null,
    currency,
    onUpdateQuantity: updateQuantity,
    onRemoveFromCart: removeFromCart,
  });

  // Shipping is free from $150 CAD; otherwise the destination flat rate applies.
  const shipping = calculateShippingCad(subtotal, shippingCountry);
  React.useEffect(() => {
    setCouponDiscount(0);
    setCouponError("");
    clearAppliedCoupon();
  }, [subtotal]);

  const handleApplyCoupon = async () => {
    const userId = session?.user?.id;

    // if (!userId) {
    //   setCouponError("Please login before applying a coupon.");
    //   return;
    // }

    if (!couponCode.trim()) return;

    setIsApplyingCoupon(true);
    setCouponError("");

    try {
      const response = await couponService.applyCoupon({
        code: couponCode.trim(),
        cartTotal: subtotal,
      });

      const discountAmount = response.data?.discountAmount || 0;
      setCouponDiscount(discountAmount);
      saveAppliedCoupon({
        code: couponCode.trim(),
        discountAmount,
      });
      toast.success(response.message || "Coupon applied successfully.");
    } catch (error) {
      const message =
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message || "Invalid coupon code.";
      setCouponDiscount(0);
      clearAppliedCoupon();
      setCouponError(message);
      toast.error(message);
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setCouponDiscount(0);
    setCouponError("");
    clearAppliedCoupon();
  };

  const handleCheckout = () => {
    if (!cart || items.length === 0) return;
    router.push("/checkout");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FBFBFB]">
        <ProductNavbar />
        <CartSkeleton />
        <ProductFooter />
      </div>
    );
  }

  return (
    <div className=" bg-[#faf7f0]">
      {/* <ProductNavbar /> */}

      <main className="container mx-auto px-6 py-8">
        {/* Back Link */}
        <Link
          href="/game"
          className="inline-flex items-center gap-2 text-primary text-sm font-semibold mb-8 hover:underline decoration-2 underline-offset-4 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Cart Items List */}
          <div className="w-full lg:flex-1">
            {items.length > 0 ? (
              <div className="flex flex-col item-between">
                {items.map((item) => {
                  const key = getCartItemKey(
                    item?.productId?._id,
                    item.color,
                    item.size
                  );
                  return (
                    <CartItem
                      key={key}
                      id={item?.productId?._id}
                      title={item?.productId?.productName}
                      description={item?.productId?.description}
                      price={currency === "CAD" ? (item?.productId?.ca_price ?? 0) : item?.productId?.price}
                      currency={currency}
                      color={item.color}
                      size={item.size}
                      imageUrl={
                        item?.productId?.imgs?.[0] ||
                        item?.productId?.img ||
                        "/no-image.jpg"
                      }
                      quantity={localQuantities[key] ?? item.quantity}
                      onQuantityChange={(id, qty) =>
                        handleQuantityChange(id, qty, item.color, item.size)
                      }
                      onRemove={() =>
                        handleRemove(
                          item?.productId?._id,
                          item.color,
                          item.size
                        )
                      }
                    />
                  );
                })}
              </div>
            ) : (
              <div className="bg-white border border-[#EFEFEF] rounded-2xl p-12 text-center flex flex-col items-center gap-4">
                <div className="text-4xl">🛒</div>
                <h3 className="text-xl font-bold text-[#111111]">
                  Your cart is empty
                </h3>
                <p className="text-[#8B8B8B]">
                  Looks like you haven&apos;t added anything to your cart yet.
                </p>
                <Link href="/game/">
                  <span className="inline-block bg-black text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide hover:bg-[#111111] transition-colors">
                    Start Shopping
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-[380px]">
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              currency={currency}
              onCurrencyChange={setCurrency}
              shippingCountry={shippingCountry}
              onShippingCountryChange={setShippingCountry}
              couponCode={couponCode}
              couponDiscount={couponDiscount}
              couponError={couponError}
              isApplyingCoupon={isApplyingCoupon}
              onCouponCodeChange={setCouponCode}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
              onCheckout={handleCheckout}
              isDisabled={items.length === 0}
            />
          </div>
        </div>
      </main>

      {/* <ProductFooter /> */}
    </div>
  );
}
