"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { getSafeCallbackUrl } from "@/lib/auth/redirect";

// ✅ Zod validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.ok) {
        const callbackUrl = getSafeCallbackUrl(
          new URLSearchParams(window.location.search).get("callbackUrl"),
        );
        window.location.assign(callbackUrl);
        toast.success("Logged in successfully!");
      } else {
        // Login failed → show error
        toast.error(result?.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center flex-col gap-5 px-4">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <Image
          src="/logo.svg"
          alt="logo"
          width={50}
          height={60}
          className="w-full h-full"
          priority
        />
      </div>

      {/* Wider container with responsive max-width */}
      <div className="w-full max-w-[500px] rounded-xl border border-gray-100 bg-white p-8 shadow-[0_18px_45px_rgba(17,17,17,0.10)] lg:p-10">
        <h2 className="text-2xl font-semibold text-center mb-1">Welcome!</h2>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="hello@example.com"
                      {...field}
                      disabled={isLoading}
                      className="placeholder:text-gray-400 w-full h-12 text-base px-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...field}
                        disabled={isLoading}
                        placeholder="Enter Your password"
                        className="placeholder:text-gray-400 w-full h-12 text-base px-4"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-700 transition-colors"
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center">
              {/* Remember Me Checkbox */}
              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                        className="
                          border-gray-400
                          checked:bg-blue-600
                          text-white
                          focus:ring-2
                          focus:ring-blue-400
                          transition-colors
                          w-5 h-5
                        "
                      />
                    </FormControl>
                    <FormLabel className="text-base font-normal cursor-pointer">
                      Remember me
                    </FormLabel>
                  </FormItem>
                )}
              />

              <Link
                href="/forget-password"
                className="text-base font-medium text-orange-500 hover:text-orange-700 cursor-pointer transition-colors"
              >
                Forgot Password
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full !rounded-none bg-black hover:bg-gray-800 h-12 text-base"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>

        <p className="text-base text-gray-500 mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-orange-500 hover:text-orange-700 cursor-pointer font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
