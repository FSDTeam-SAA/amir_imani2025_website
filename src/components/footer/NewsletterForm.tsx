"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import z from "zod";

import { subscribeToNewsletter } from "@/lib/api/subscriber-service";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface NewsletterFormProps {
  className?: string;
}

const formSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewsletterForm({
  className = "",
}: NewsletterFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormValues) =>
      subscribeToNewsletter({ email: data.email }),
    onSuccess: (data) => {
      toast.success(data.message || "Successfully subscribed to newsletter.");
      reset();
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to subscribe. Please try again.");
    },
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-3 ${className}`}
      noValidate
      aria-label="Newsletter subscription form"
    >
      <div className="flex gap-2">
        <div className="grow">
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="w-full rounded-none px-4 py-3 bg-white border-white/20 text-primary-foreground placeholder-gray-500 focus:ring-2 focus:ring-white/30"
            aria-label="Email address"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            disabled={mutation.isPending}
          />
          {errors.email && (
            <p
              id="email-error"
              className="mt-1 text-sm text-red-300"
              role="alert"
            >
              {errors.email.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="!rounded-none px-6 whitespace-nowrap text-white transition-colors disabled:opacity-50"
          disabled={mutation.isPending}
          aria-label="Subscribe to newsletter"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </Button>
      </div>

      {mutation.isSuccess && (
        <p className="text-sm text-green-300" role="alert">
          You are subscribed for future updates.
        </p>
      )}

      {mutation.error && (
        <p className="text-sm text-red-300" role="alert">
          {mutation.error.message || "Failed to subscribe. Please try again."}
        </p>
      )}
    </form>
  );
}
