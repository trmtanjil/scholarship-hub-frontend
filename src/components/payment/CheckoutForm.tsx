/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createFullApplicationAction } from "@/action/application.action";
import { Loader2, CheckCircle2, GraduationCap, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const CheckoutForm = ({ clientSecret, amount, scholarshipId }: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  // Form States
  const [ssc, setSsc] = useState("");
  const [hsc, setHsc] = useState("");

  // ১. পেমেন্ট হ্যান্ডলার
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement)! },
    });
 
    if (error) {
      toast.error(error.message || "Payment Failed");
      setLoading(false);
    } else if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      setIsPaid(true);
      setLoading(false);
      toast.success("Payment Verified! Now complete your academic details.");
    }
  };

  // ২. ফাইনাল অ্যাপ্লিকেশন সাবমিশন
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await createFullApplicationAction({
      scholarshipId,
      transactionId,
      amount,
      sscResult: Number(ssc),
      hscResult: Number(hsc),
      documents: "https://uploaded-docs-link.com", // এখানে তোমার ড্রপজোন বা ফাইল আপলোড লজিক বসবে
    });

    if (res.data) {
      toast.success("Application Submitted Successfully!");
      window.location.href = "/myapplications";
    } else {
      toast.error(res.error || "Something went wrong");
    }
    setLoading(false);
  };

  // পেমেন্ট সফল হওয়ার পরের ফর্ম UI
  if (isPaid) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-2xl text-green-700">
          <div className="bg-green-500 text-white p-1 rounded-full">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-sm">Payment Confirmed</p>
            <p className="text-xs opacity-80">ID: {transactionId}</p>
          </div>
        </div>

        <form onSubmit={handleFinalSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              Academic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-slate-600 font-semibold">SSC GPA</Label>
                <Input 
                  type="number" 
                  step="0.01" 
                  value={ssc} 
                  onChange={(e) => setSsc(e.target.value)} 
                  required 
                  placeholder="e.g. 5.00"
                  className="h-12 rounded-xl border-slate-200 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-600 font-semibold">HSC GPA</Label>
                <Input 
                  type="number" 
                  step="0.01" 
                  value={hsc} 
                  onChange={(e) => setHsc(e.target.value)} 
                  required 
                  placeholder="e.g. 4.80"
                  className="h-12 rounded-xl border-slate-200 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full h-14 bg-primary text-lg font-bold rounded-2xl shadow-lg" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Confirm & Submit Application"}
          </Button>
        </form>
      </div>
    );
  }

  // পেমেন্ট করার আগের UI (Stripe Card Input)
  return (
    <form onSubmit={handlePayment} className="space-y-8">
      <div className="space-y-4">
        <Label className="text-slate-600 font-semibold">Credit or Debit Card</Label>
        <div className="p-4 border-2 border-slate-100 rounded-2xl bg-slate-50 focus-within:border-primary transition-all">
          <CardElement 
            options={{ 
              style: { 
                base: { 
                  fontSize: "16px", 
                  color: "#1e293b",
                  "::placeholder": { color: "#94a3b8" } 
                } 
              } 
            }} 
          />
        </div>
      </div>
      
      <Button type="submit" disabled={!stripe || loading} className="w-full h-14 text-lg font-black rounded-2xl bg-slate-900 hover:bg-black transition-all">
        {loading ? <Loader2 className="animate-spin mr-2" /> : `Pay $${amount} & Unlock Form`}
      </Button>

      <div className="flex justify-center items-center gap-4 opacity-40 grayscale">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" />
      </div>
    </form>
  );
};