export type AppliedCoupon = {
  code: string;
  discountAmount: number;
};

const APPLIED_COUPON_KEY = "applied-coupon";

export const saveAppliedCoupon = (coupon: AppliedCoupon) => {
  if (typeof window === "undefined") return;

  window.sessionStorage.setItem(APPLIED_COUPON_KEY, JSON.stringify(coupon));
};

export const getAppliedCoupon = (): AppliedCoupon | null => {
  if (typeof window === "undefined") return null;

  try {
    const value = window.sessionStorage.getItem(APPLIED_COUPON_KEY);
    return value ? (JSON.parse(value) as AppliedCoupon) : null;
  } catch {
    return null;
  }
};

export const clearAppliedCoupon = () => {
  if (typeof window === "undefined") return;

  window.sessionStorage.removeItem(APPLIED_COUPON_KEY);
};

