'use client';

import { ContactFormData, sendContactForm } from "@/lib/api/contact";
import { useMutation } from "@tanstack/react-query";

export const useContact = () => {
  return useMutation({
    mutationFn: (formData: ContactFormData) =>
      sendContactForm(formData),
  });
};
