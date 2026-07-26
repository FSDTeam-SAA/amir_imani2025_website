'use client';

import { ContactFormData, sendContactForm } from "@/lib/api/contact";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";



export const useContact = () => {
  return useMutation({
    mutationFn: (formData: ContactFormData) =>
      sendContactForm(formData),
    onSuccess:(data)=>{
      toast.success(data?.message || "Message sent successfully!");
    },
    onError:(error)=>{
      toast.error(`Failed to send message: ${error.message}`);
    }
  });
};
