"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { useMutation } from "@tanstack/react-query";
import { Download } from "@/lib/api/download";
import { toast } from "sonner";

/* ------------------ validation schema ------------------ */
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
});

type FormValues = z.infer<typeof formSchema>;

const DownloadForm = ({ gameName }: { gameName: string }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
  console.log("product name", gameName);
  const mutation = useMutation({
    mutationFn: (data: { name: string; email: string }) =>
      Download(data.name, data.email),
    onSuccess: (data) => {
      toast.success(data.message || "Successfuly added your Request");
    },
    onError: (err) => {
      toast.error(err.message || "Successfuly added your Request");
    },
  });

  /* ------------------ submit function ------------------ */
  const onSubmit = (values: FormValues) => {
    const name = gameName + " print and play request by " + values.name;
    const email = values.email;
    const form = { name, email };
    mutation.mutate(form, {
      onSuccess: (data) => {
        console.log("Success:", data);
        toast.success(
          data.message || "Successfuly submitted for 'Print and Play'"
        );
        // form.reset(); // optional
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });
  };

  return (
    <section className="w-full flex justify-center my-10 lg:my-20 lg:px-8 !rounded-none ">
      <div className="w-full lg:max-w-2xl rounded-none bg-secondary p-6 shadow-sm">
        <h2 className="text-center text-gray-600 text-lg font-semibold mb-6">
          EMAIL FOR DOWNLOAD 
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      className=" border border-gray-400 outline-none shadow-none h-10   lg:text-base"
                      {...field}
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
                  <FormLabel className="text-gray-600">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className=" border border-gray-400 outline-none shadow-none h-10   lg:text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              className="w-full !rounded-none bg-primary hover:bg-primary/80 text-white"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default DownloadForm;
