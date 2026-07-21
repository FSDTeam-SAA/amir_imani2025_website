"use client";

import React from "react";
import { ShieldCheck, Loader2, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CurrencySelect from "@/components/shared/CurrencySelect";
import { Currency } from "@/hooks/use-currency";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  couponCode?: string;
  couponDiscount?: number;
  couponError?: string;
  isApplyingCoupon?: boolean;
  onCheckout?: () => void;
  onCouponCodeChange?: (value: string) => void;
  onApplyCoupon?: () => void;
  onRemoveCoupon?: () => void;
  isCheckoutLoading?: boolean;
  isDisabled?: boolean;
  shippingCountry?: "CA" | "US";
  onShippingCountryChange?: (country: "CA" | "US") => void;
  currency?: Currency;
  onCurrencyChange?: (currency: Currency) => void;
}

const OrderSummary = React.memo(function OrderSummary({
  subtotal,
  shipping,
  couponCode = "",
  couponDiscount = 0,
  couponError = "",
  isApplyingCoupon = false,
  onCheckout,
  onCouponCodeChange,
  onApplyCoupon,
  onRemoveCoupon,
  isCheckoutLoading,
  isDisabled,
  shippingCountry,
  onShippingCountryChange,
  currency = "USD",
  onCurrencyChange,
}: OrderSummaryProps) {
  const discount = Math.min(couponDiscount, subtotal);
  const total = Math.max(0, subtotal - discount) + shipping;

  return (
    <div className="bg-white border border-[#EFEFEF] rounded-2xl p-6 lg:p-10 shadow-[0px_8px_24px_rgba(0,0,0,0.03)] h-fit sticky top-24">
      <h2 className="text-lg md:text-xl font-bold text-[#111111] mb-8">Order Summary</h2>

      <div className="space-y-4 mb-8">
        {onCurrencyChange ? (
          <label className="flex items-center justify-between gap-4 text-sm font-medium text-[#333333]">
            Currency
            <CurrencySelect currency={currency} onChange={onCurrencyChange} />
          </label>
        ) : null}
        {shippingCountry ? (
          <label className="block text-sm font-medium text-[#333333]">
            Shipping destination
            <select
              value={shippingCountry}
              onChange={(event) =>
                onShippingCountryChange?.(event.target.value as "CA" | "US")
              }
              className="mt-2 h-10 w-full rounded-full border border-[#E5E5E5] bg-white px-4 text-sm outline-none focus:border-primary"
            >
              <option value="CA">Canada</option>
              <option value="US">USA</option>
            </select>
          </label>
        ) : null}
        <div className="flex justify-between items-center text-sm font-medium">
          <span className="text-[#333333]">Subtotal</span>
          <span className="text-[#111111]">${subtotal.toFixed(2)} {currency}</span>
        </div>
        <div className="flex justify-between items-center text-sm font-medium">
          <span className="text-gray-500">Shipping</span>
          <span className="text-gray-500">
            {shipping === 0 ? "Free" : `+ $${shipping.toFixed(2)} ${currency}`}
          </span>
        </div> 
        {discount > 0 ? (
          <div className="flex justify-between items-center text-sm font-medium text-emerald-600">
            <span>Coupon discount</span>
            <span>- ${discount.toFixed(2)}</span>
          </div>
        ) : null}
      </div>

      <div className="mb-8 rounded-xl bg-[#FBFBFB] px-4 py-3 text-xs leading-5 text-[#666666]">
        <p>Canada: Flat rate $9.99 {currency}</p>
        <p>USA: Flat rate $19.99 {currency}</p>
        <p>Free shipping on orders of $150.00 {currency} or more</p>
      </div>

      <div className="mb-8 rounded-2xl border border-[#EFEFEF] bg-[#FBFBFB] p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#111111]">
          <Tag className="h-4 w-4 text-primary" />
          Apply Coupon
        </div>
        {discount > 0 ? (
          <div className="flex items-center justify-between rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            <span>{couponCode}</span>
            <button
              type="button"
              onClick={onRemoveCoupon}
              className="rounded-full p-1 transition hover:bg-emerald-100"
              aria-label="Remove coupon"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              value={couponCode}
              onChange={(event) =>
                onCouponCodeChange?.(event.target.value.toUpperCase())
              }
              placeholder="Coupon code"
              className="h-10 rounded-full border-[#E5E5E5] bg-white text-sm"
            />
            <Button
              type="button"
              onClick={onApplyCoupon}
              disabled={isApplyingCoupon || !couponCode.trim() || isDisabled}
              className="h-10 rounded-full bg-primary px-5 text-white hover:bg-[#111111]"
            >
              {isApplyingCoupon ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Apply"
              )}
            </Button>
          </div>
        )}
        {couponError ? (
          <p className="mt-2 text-xs font-medium text-red-600">
            {couponError}
          </p>
        ) : null}
      </div>

      <div className="pt-6 border-t border-[#EFEFEF] mb-8">
        <div className="flex justify-between items-center">
          <span className="text-lg md:text-xl font-bold text-[#111111]">Total</span>
          <span className="text-xl font-bold text-[#FF7F50]">
            ${total.toFixed(2)} {currency}
          </span>
        </div>
      </div>

      <Button
        onClick={onCheckout}
        disabled={isDisabled || isCheckoutLoading}
        className="w-full md:h-12 bg-primary hover:bg-[#111111] text-white rounded-full font-bold text-sm tracking-wide shadow-[0px_4px_16px_rgba(0,0,0,0.1)] mb-6"
      >
        {isCheckoutLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          "Proceed to Checkout"
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-[13px] text-[#8B8B8B]">
        <ShieldCheck className="w-4 h-4 text-[#2E8F8A]" />
        <span>Secure checkout powered by Stripe</span>
      </div>
    </div>
  );
});

export default OrderSummary;
