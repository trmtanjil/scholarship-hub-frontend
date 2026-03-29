/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const StripeWrapper = ({ clientSecret, amount, scholarshipId }: any) => {
  
  // --- DEBUGGING START ---
  useEffect(() => {
    console.log("=== StripeWrapper Debugging ===");
    console.log("1. Scholarship ID:", scholarshipId);
    console.log("2. Amount:", amount);
    console.log("3. Client Secret:", clientSecret);
    
    if (!clientSecret) {
      console.error("❌ Error: clientSecret is missing! Check your Page or Action.");
    } else if (typeof clientSecret !== "string") {
      console.error("❌ Error: clientSecret is not a string. Type is:", typeof clientSecret);
    } else if (!clientSecret.startsWith("pi_")) {
      console.warn("⚠️ Warning: clientSecret might be invalid. It usually starts with 'pi_'.");
    } else {
      console.log("✅ clientSecret is valid and ready.");
    }
  }, [clientSecret, amount, scholarshipId]);
  // --- DEBUGGING END ---

  // যদি clientSecret না থাকে, তবে Elements লোড হবে না, তাই এখানে একটি চেক দাও
  if (!clientSecret) {
    return (
      <div className="p-4 text-center border border-dashed rounded-xl">
        <p className="text-red-500 font-medium">Initializing payment session...</p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm 
        clientSecret={clientSecret} 
        amount={amount} 
        scholarshipId={scholarshipId} 
      />
    </Elements>
  );
};