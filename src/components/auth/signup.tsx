/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  // gender: z.string().min(1, "Gender is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  age: z.string().optional(),
  address: z.string().optional(),
  phoneNum: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Signup = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      // gender: "",
      password: "",
      age: "",
      address: "",
      phoneNum: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsPending(true);
    setError("");
    console.log("values", values);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      // console.log("datas", data?.message);
      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      } else if (data.success === "mail already registered") {
        // router.push(`/email-verify?email=${values.email}`);
        router.push(`/login`);

        throw new Error("Email already registered");
      }

      toast.success("Account created successfully!");
      // router.push(`/email-verify?email=${values.email}`);
      router.push(`/login`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-white flex-col gap-5 px-4 py-8">
      {/* Logo */}
      <div className="flex justify-center mb-2">
        <Image
          src="/logo.svg"
          alt="logo"
          width={50}
          height={60}
          className="w-auto h-auto"
        />
      </div>

      <div className="w-full max-w-[600px] rounded-xl border border-gray-100 bg-white p-8 shadow-[0_18px_45px_rgba(17,17,17,0.10)] lg:p-10">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Create Your Account
        </h2>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* First Name & Last Name - Side by side */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Lorem"
                        {...field}
                        className=" placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ipsum"
                        {...field}
                        className=" placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phoneNum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(704) 555-0027"
                      {...field}
                      className=" placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="hello@example.com"
                      {...field}
                      className=" placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
             {/* <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl  className="w-full">
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Select your gender"
                          className=" placeholder:text-gray-400  "
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="26"
                      {...field}
                      className=" placeholder:text-gray-400"
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
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        // type="password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        placeholder="••••••••"
                        className=" placeholder:text-gray-400"
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-500"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="2972 Westheimer Rd. Santa Ana, Illinois 85488"
                      {...field}
                      className=" placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sign Up Button */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full !rounded-none bg-black hover:bg-gray-800 text-white font-semibold py-2.5 mt-2"
            >
              {isPending ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>
        </Form>

        {/* Sign In link */}
        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account?{" "}
          <span
            className="text-orange-500 hover:text-orange-600 cursor-pointer  font-medium transition-colors"
            onClick={() => router.push("/login")}
          >
            Sign in
          </span>
        </p>
      </div>
    </section>
  );
};

export default Signup;
