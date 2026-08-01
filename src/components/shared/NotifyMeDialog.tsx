"use client";

import { useState } from "react";
import { BellRing, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import axiosInstance from "@/lib/api/axios-instance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function NotifyMeDialog({ productId, productName, className }: { productId: string; productName: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const mutation = useMutation({
    mutationFn: () => axiosInstance.post("/product-notifications", { productId, email }),
    onSuccess: (response) => { toast.success(response.data.message || "We will notify you when it is available."); setEmail(""); setOpen(false); },
    onError: (error: { response?: { data?: { message?: string } } }) => toast.error(error.response?.data?.message || "Could not save your notification request."),
  });

  return <>
    <Button type="button" onClick={() => setOpen(true)} className={className}>
      Notify Me <BellRing className="h-4 w-4" />
    </Button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[calc(100%-2rem)] rounded-2xl border-[#e6ddd2] bg-[#fffdf9] p-6 sm:max-w-md sm:p-7">
        <DialogHeader className="pr-7 text-left">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"><BellRing className="h-5 w-5" /></div>
          <DialogTitle className="text-xl text-[#111111]">Notify me when available</DialogTitle>
          <DialogDescription className="leading-6 text-[#666666]">Leave your email and we&apos;ll let you know when {productName} is available.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); mutation.mutate(); }}>
          <div className="space-y-2"><Label htmlFor={`notify-${productId}`}>Email address</Label><Input id={`notify-${productId}`} type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></div>
          <Button type="submit" disabled={mutation.isPending} className="h-11 w-full bg-primary text-white hover:bg-primary/85">{mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <BellRing className="h-4 w-4" />} Notify me</Button>
        </form>
      </DialogContent>
    </Dialog>
  </>;
}
