"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ArrowLeft, CreditCard, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/lib/api/auth-service";
import { paymentService } from "@/lib/api/payment-service";
import {
  CreatePaymentIntentRequest,
  ShippingAddress,
} from "@/lib/types/ecommerce";
import { getAppliedCoupon } from "@/lib/utils/applied-coupon";
import { clearGuestCart } from "@/lib/utils/guest-cart";
import { useCartQuery } from "@/hooks/use-cart-query";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

type CheckoutFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNum: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: "US" | "CA";
};

type RegisteredUserData = {
  userId?: string;
  token?: string;
  accessToken?: string;
  user?: {
    _id?: string;
    id?: string;
  };
};

const initialValues: CheckoutFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNum: "",
  address: "",
  city: "",
  province: "",
  postalCode: "",
  country: "US",
};

function getErrorMessage(error: unknown, fallback: string) {
  const axiosError = error as AxiosError<{ message?: string }>;
  return axiosError.response?.data?.message || (error as Error)?.message || fallback;
}

function CheckoutPaymentForm({
  clientSecret,
  paymentId,
}: {
  clientSecret: string;
  paymentId?: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isPaying, setIsPaying] = useState(false);

  const handlePayment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsPaying(true);
    const submitResult = await elements.submit();
    if (submitResult.error) {
      toast.error(submitResult.error.message || "Please check your card details.");
      setIsPaying(false);
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success`,
      },
      redirect: "if_required",
    });

    setIsPaying(false);

    if (result.error) {
      toast.error(result.error.message || "Payment failed. Please try again.");
      return;
    }

    clearGuestCart();
    toast.success("Payment completed successfully.");
    router.push(`/payment/success${paymentId ? `?paymentId=${paymentId}` : ""}`);
  };

  return (
    <form onSubmit={handlePayment} className="space-y-6">
      <PaymentElement />
      <Button
        type="submit"
        disabled={!stripe || !elements || isPaying}
        className="h-12 w-full bg-primary text-white hover:bg-[#111111]"
      >
        {isPaying ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
        Pay now
      </Button>
    </form>
  );
}

export default function CheckoutPage() {
  const { data: session, update: updateSession } = useSession();
  const { data: cart, isLoading } = useCartQuery();
  const [values, setValues] = useState<CheckoutFormValues>(initialValues);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [checkoutUserId, setCheckoutUserId] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<ReturnType<
    typeof getAppliedCoupon
  >>(null);
  const [isPreparingPayment, setIsPreparingPayment] = useState(false);

  const isAuthenticated = Boolean(session?.user?.id);
  const items = useMemo(() => cart?.productIds || [], [cart?.productIds]);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + (item.productId?.price || 0) * item.quantity,
        0
      ),
    [items]
  );

  useEffect(() => {
    setAppliedCoupon(getAppliedCoupon());
  }, []);

  const shippingPreview = values.country === "CA" ? 15 : 5;
  const couponDiscount = Math.min(appliedCoupon?.discountAmount || 0, subtotal);
  const totalPreview = Math.max(0, subtotal - couponDiscount) + shippingPreview;

  const updateField =
    (field: keyof CheckoutFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const ensureCheckoutUser = async () => {
    if (session?.user?.id) return session.user.id;
    if (checkoutUserId) return checkoutUserId;

    const response = await authService.register({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      address: values.address,
      phoneNum: values.phoneNum,
    });

    const data = response.data as RegisteredUserData | undefined;
    const userId = data?.userId || data?.user?._id || data?.user?.id;
    if (!userId) {
      throw new Error("Registration succeeded but no user ID was returned.");
    }

    const token = data?.accessToken || data?.token;
    if (token) {
      localStorage.setItem("authToken", token);
      const signInResult = await signIn("credentials", {
        token,
        email: values.email,
        redirect: false,
      });

      if (signInResult?.error || !signInResult?.ok) {
        throw new Error(signInResult?.error || "Auto login failed.");
      }

      await updateSession();
    }

    setCheckoutUserId(userId);
    return userId;
  };

  const handleCreateIntent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!stripePromise) {
      toast.error("Stripe publishable key is missing.");
      return;
    }

    setIsPreparingPayment(true);
    try {
      const userId = await ensureCheckoutUser();
      const checkoutItems = items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      }));

      if (checkoutItems.some((item) => !item.productId)) {
        throw new Error("Some cart items are missing product details.");
      }

      const shippingAddress: ShippingAddress = {
        street: values.address,
        city: values.city,
        province: values.province,
        postalCode: values.postalCode,
        country: values.country,
      };

      const payload: CreatePaymentIntentRequest = {
        userId,
        items: checkoutItems,
        shippingAddress,
        couponCode: appliedCoupon?.code?.trim() || undefined,
      };

      const response = await paymentService.createPaymentIntent(payload);

      setClientSecret(response.data.clientSecret);
      setPaymentId(response.data.paymentId);
      toast.success("Secure payment form is ready.");
    } catch (error) {
      toast.error(
        getErrorMessage(error, "Could not prepare checkout. Please try again.")
      );
    } finally {
      setIsPreparingPayment(false);
    }
  };

  return (
    <div className="bg-[#FBFBFB]">
      <main className="container mx-auto px-6 py-8">
        <Link
          href="/cart"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary decoration-2 underline-offset-4 transition-all hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#111111]">Checkout</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#666666]">
            Enter your details and complete payment securely on this page.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
          <form
            onSubmit={handleCreateIntent}
            className="rounded-2xl border border-[#EFEFEF] bg-white p-6 shadow-[0px_8px_24px_rgba(0,0,0,0.03)] lg:p-8"
          >
            {!isAuthenticated && (
              <section className="mb-8">
                <h2 className="mb-5 text-lg font-bold text-[#111111]">
                  Contact details
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      required
                      value={values.firstName}
                      onChange={updateField("firstName")}
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      required
                      value={values.lastName}
                      onChange={updateField("lastName")}
                      placeholder="Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={values.email}
                      onChange={updateField("email")}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNum">Phone</Label>
                    <Input
                      id="phoneNum"
                      type="tel"
                      required
                      value={values.phoneNum}
                      onChange={updateField("phoneNum")}
                      placeholder="+1234567890"
                    />
                  </div>
                </div>
              </section>
            )}

            <section>
              <h2 className="mb-5 text-lg font-bold text-[#111111]">
                Shipping address
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    required
                    value={values.address}
                    onChange={updateField("address")}
                    placeholder="123 Main St"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    required
                    value={values.city}
                    onChange={updateField("city")}
                    placeholder="New York"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="province">State / Province</Label>
                  <Input
                    id="province"
                    required
                    value={values.province}
                    onChange={updateField("province")}
                    placeholder="NY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal code</Label>
                  <Input
                    id="postalCode"
                    required
                    value={values.postalCode}
                    onChange={updateField("postalCode")}
                    placeholder="10001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <select
                    id="country"
                    required
                    value={values.country}
                    onChange={updateField("country")}
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                  </select>
                </div>
              </div>
            </section>

            <Button
              type="submit"
              disabled={isPreparingPayment || Boolean(clientSecret) || isLoading}
              className="mt-8 h-12 w-full bg-primary text-white hover:bg-[#111111] md:w-auto"
            >
              {isPreparingPayment ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ShieldCheck className="h-4 w-4" />
              )}
              {clientSecret ? "Payment form ready" : "Continue to payment"}
            </Button>
          </form>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-[#EFEFEF] bg-white p-6 shadow-[0px_8px_24px_rgba(0,0,0,0.03)]">
              <h2 className="mb-5 text-lg font-bold text-[#111111]">
                Order summary
              </h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#666666]">Items</span>
                  <span className="font-semibold text-[#111111]">
                    {items.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Subtotal</span>
                  <span className="font-semibold text-[#111111]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Shipping estimate</span>
                  <span className="font-semibold text-[#111111]">
                    ${shippingPreview.toFixed(2)}
                  </span>
                </div>
                {couponDiscount > 0 ? (
                  <div className="flex justify-between text-emerald-600">
                    <span>Coupon ({appliedCoupon?.code})</span>
                    <span className="font-semibold">
                      - ${couponDiscount.toFixed(2)}
                    </span>
                  </div>
                ) : null}
                <div className="border-t border-[#EFEFEF] pt-4">
                  <div className="flex justify-between text-base font-bold">
                    <span>Total estimate</span>
                    <span className="text-primary">${totalPreview.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#EFEFEF] bg-white p-6 shadow-[0px_8px_24px_rgba(0,0,0,0.03)]">
              <div className="mb-5 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold text-[#111111]">Payment</h2>
              </div>

              {!stripePromise && (
                <p className="text-sm text-red-600">
                  Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to the storefront env to
                  enable Stripe Elements.
                </p>
              )}

              {stripePromise && clientSecret && (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: "stripe",
                      variables: {
                        colorPrimary: "#F04D2A",
                        borderRadius: "8px",
                      },
                    },
                  }}
                >
                  <CheckoutPaymentForm
                    clientSecret={clientSecret}
                    paymentId={paymentId}
                  />
                </Elements>
              )}

              {stripePromise && !clientSecret && (
                <p className="text-sm text-[#666666]">
                  Complete the checkout details first. The secure card form will
                  appear here.
                </p>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
