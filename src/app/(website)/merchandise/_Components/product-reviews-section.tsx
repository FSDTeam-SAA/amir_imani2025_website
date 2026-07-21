"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Loader2, Star } from "lucide-react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { reviewService } from "@/lib/api/review-service";
import {
  ProductReview,
  ProductReviewSummary,
  ReviewEligibility,
} from "@/lib/types/ecommerce";

const emptySummary: ProductReviewSummary = {
  totalReviews: 0,
  averageRating: 0,
  ratingBreakdown: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
};

export default function ProductReviewsSection({
  productId,
}: {
  productId: string;
}) {
  const { data: session, status } = useSession();
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [summary, setSummary] = useState<ProductReviewSummary>(emptySummary);
  const [eligibility, setEligibility] = useState<ReviewEligibility | null>(
    null,
  );
  const [selectedRating, setSelectedRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAuthenticated = Boolean(session?.user?.id);
  const reviewerName = isAuthenticated ? guestName.trim() : guestName.trim();
  const reviewerEmail = isAuthenticated ? guestEmail.trim() : guestEmail.trim();
  const canSubmitReview = isAuthenticated
    ? Boolean(eligibility?.canReview) &&
      reviewerName.length >= 2 &&
      reviewerEmail.length > 0
    : reviewerName.length >= 2 && reviewerEmail.length > 0;

  useEffect(() => {
    if (!isAuthenticated) return;

    const fallbackName =
      session?.user?.name?.trim() || session?.user?.email?.split("@")[0] || "";
    const fallbackEmail = session?.user?.email?.trim() || "";

    setGuestName((current) => current || fallbackName);
    setGuestEmail((current) => current || fallbackEmail);
  }, [isAuthenticated, session?.user?.email, session?.user?.name]);

  const loadReviews = async () => {
    const response = await reviewService.getProductReviews(productId);
    setReviews(response.data.reviews);
    setSummary(response.data.summary);
  };

  const loadEligibility = async () => {
    if (!isAuthenticated) {
      setEligibility(null);
      return;
    }

    const response = await reviewService.getReviewEligibility(productId);
    setEligibility(response.data);
  };

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      setIsLoading(true);
      try {
        const reviewsResponse =
          await reviewService.getProductReviews(productId);
        if (!isMounted) return;

        setReviews(reviewsResponse.data.reviews);
        setSummary(reviewsResponse.data.summary);

        if (isAuthenticated) {
          const eligibilityResponse =
            await reviewService.getReviewEligibility(productId);
          if (!isMounted) return;
          setEligibility(eligibilityResponse.data);
        } else {
          setEligibility(null);
        }
      } catch (error) {
        console.error("Failed to load reviews:", error);
        if (isMounted) {
          toast.error("Could not load product reviews right now.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (productId && status !== "loading") {
      run();
    }

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, productId, status]);

  const reviewGateMessage = useMemo(() => {
    if (status === "loading") {
      return "Checking your account status for review access.";
    }

    if (!isAuthenticated) {
      return "Anyone can submit a review from this form. Add your name, email, rating, and message below.";
    }

    if (eligibility?.review) {
      return `You already submitted a review. Current status: ${eligibility.review.status}.`;
    }

    return "You can submit your review now. Check your name and email before sending.";
  }, [eligibility, isAuthenticated, status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isAuthenticated && !eligibility?.canReview) {
      toast.error("You are not eligible to review this product yet.");
      return;
    }

    setIsSubmitting(true);
    try {
      await reviewService.createReview({
        productId,
        rating: selectedRating,
        review: reviewText.trim(),
        userName: reviewerName,
        userEmail: reviewerEmail,
      });

      toast.success("Review submitted for moderation.");
      setReviewText("");
      setSelectedRating(5);
      if (!isAuthenticated) {
        setGuestName("");
        setGuestEmail("");
        await loadReviews();
      } else {
        await Promise.all([loadReviews(), loadEligibility()]);
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          "Could not submit your review. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="border-t  bg-[#fcf8ef]">
      <div className="container mx-auto grid gap-8 px-4 py-12 lg:grid-cols-[minmax(0,1.2fr)_420px]">
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                Customer reviews
              </p>
              <h2 className="mt-2 text-2xl font-bold text-[#111111]">
                What buyers are saying
              </h2>
            </div>

            <div className=" border bg-[#fcf8ef]/50 px-5 py-4">
              <p className="text-3xl font-bold text-[#111111]">
                {summary.averageRating.toFixed(1)}
              </p>
              <StarRow rating={Math.round(summary.averageRating)} size="md" />
              <p className="mt-1 text-sm text-[#666666]">
                Based on {summary.totalReviews} published review
                {summary.totalReviews === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {isLoading ? (
              <div className="flex items-center gap-2 border bg-[#fcf8ef]/50 p-6 text-sm text-[#666666]">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading reviews...
              </div>
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <article
                  key={review.id}
                  className=" border bg-[#fcf8ef]/50 p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-[#111111]">
                        {review.userName}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#8B8B8B]">
                        {formatReviewDate(review.createdAt)}
                      </p>
                    </div>
                    <StarRow rating={review.rating} size="sm" />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[#444444]">
                    {review.review}
                  </p>
                </article>
              ))
            ) : (
              <div className=" border border-dashed border-[#E4D5B7] bg-white p-6 text-sm text-[#666666]">
                No published reviews yet. Be the first verified buyer to share
                one.
              </div>
            )}
          </div>
        </div>

        <aside className=" border bg-[#fcf8ef]/50 p-6 shadow-[0px_20px_50px_rgba(0,0,0,0.04)]">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
            Leave a review
          </p>
          <h3 className="mt-2 text-2xl font-bold text-[#111111]">
            Share your experience
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#666666]">
            Submit a quick review here. Every new review goes into moderation
            before it appears publicly.
          </p>

          {eligibility?.review ? (
            <div className="mt-6  border border-[#EFEFEF] bg-[#FBFBFB] p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[#111111]">
                  Your submitted review
                </p>
                <StatusPill status={eligibility.review.status} />
              </div>
              <div className="mt-3">
                <StarRow rating={eligibility.review.rating} size="sm" />
              </div>
              <p className="mt-3 text-sm leading-7 text-[#444444]">
                {eligibility.review.review}
              </p>
            </div>
          ) : null}

          <div className="mt-6  border border-dashed border-[#E4D5B7] bg-[#FFF9EC] p-5 text-sm leading-6 text-[#6B5C3E]">
            <p>{reviewGateMessage}</p>
            <Link
              href="/login"
              className="mt-3 inline-flex text-sm font-semibold text-primary underline underline-offset-4"
            >
              {isAuthenticated
                ? "Signed in? Update account if needed"
                : "Already have an account? Log in"}
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="review-name"
                  className="mb-3 block text-sm font-semibold text-[#111111]"
                >
                  Your name
                </label>
                <input
                  id="review-name"
                  type="text"
                  value={guestName}
                  onChange={(event) => setGuestName(event.target.value)}
                  required
                  className="w-full  border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition focus:border-primary focus:ring-4 focus:ring-[#F04D2A]/10"
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="review-email"
                  className="mb-3 block text-sm font-semibold text-[#111111]"
                >
                  Your email
                </label>
                <input
                  id="review-email"
                  type="email"
                  value={guestEmail}
                  onChange={(event) => setGuestEmail(event.target.value)}
                  required
                  className="w-full  border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition focus:border-primary focus:ring-4 focus:ring-[#F04D2A]/10"
                  placeholder="jane@example.com"
                />
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-[#111111]">
                Your rating
              </p>
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }, (_, index) => {
                  const value = index + 1;
                  const isActive = value <= selectedRating;

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setSelectedRating(value)}
                      className=" p-1 transition-transform hover:scale-110"
                      aria-label={`Give ${value} star${value === 1 ? "" : "s"}`}
                    >
                      <Star
                        className={`h-7 w-7 ${
                          isActive
                            ? "fill-[#F59E0B] text-[#F59E0B]"
                            : "text-[#D1D5DB]"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="review-text"
                className="mb-3 block text-sm font-semibold text-[#111111]"
              >
                Your review
              </label>
              <textarea
                id="review-text"
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
                minLength={10}
                maxLength={1000}
                required
                rows={6}
                className="w-full  border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111111] outline-none transition focus:border-primary focus:ring-4 focus:ring-[#F04D2A]/10"
                placeholder="Tell future buyers about the fit, quality, comfort, or overall experience."
              />
              <p className="mt-2 text-xs text-[#8B8B8B]">
                {reviewText.length}/1000 characters
              </p>
            </div>

            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !canSubmitReview ||
                reviewText.trim().length < 10
              }
              className="h-11 w-full !rounded-none bg-primary text-white hover:bg-[#111111]"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : null}
              {canSubmitReview
                ? "Submit review"
                : "Complete the form to review"}
            </Button>
          </form>
        </aside>
      </div>
    </section>
  );
}

function StarRow({ rating, size }: { rating: number; size: "sm" | "md" }) {
  const starClass = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";

  return (
    <div className="mt-2 flex items-center gap-1 text-[#F59E0B]">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`${starClass} ${
            index < rating ? "fill-current" : "text-[#E5E7EB]"
          }`}
        />
      ))}
    </div>
  );
}

function StatusPill({ status }: { status: ProductReview["status"] }) {
  const classes =
    status === "published"
      ? "bg-emerald-50 text-emerald-700"
      : status === "rejected"
        ? "bg-rose-50 text-rose-700"
        : "bg-amber-50 text-amber-700";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${classes}`}
    >
      {status}
    </span>
  );
}

function formatReviewDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
