"use server";

import { apiFetch } from "@/services/schollarship.service";
import { ServiceResult } from "@/types/category.type";

export interface IPaymentIntentResponse {
  clientSecret: string;
  transactionId: string;
}

/**
 * ১. পেমেন্ট ইনটেন্ট তৈরি করার অ্যাকশন
 */
export const createPaymentIntentAction = async (
  amount: number
): Promise<ServiceResult<IPaymentIntentResponse>> => {
  // এন্ডপয়েন্টটি তোমার ব্যাকএন্ড রাউট অনুযায়ী চেক করো (payment vs payments)
  // আমি এখানে '/payments/create-payment-intent' দিচ্ছি কারণ সাধারণত এটিই স্ট্যান্ডার্ড
  const result = await apiFetch<IPaymentIntentResponse>("/payment/create-payment-intent", {
    method: "POST",
    body: JSON.stringify({ amount }),
  });

  // ডিবাগিং এর জন্য সার্ভার কনসোলে চেক করো ডাটা আসছে কি না
  console.log("Create Intent Result:", result);

  return result;
};

/**
 * ২. পেমেন্ট কনফার্ম করার অ্যাকশন (যদি আলাদাভাবে প্রয়োজন হয়)
 */
export const confirmPaymentAction = async (payload: {
  scholarshipId: string;
  transactionId: string;
  amount: number;
  sscResult: number;
  hscResult: number;
  documents: string;
}) => {
  // তোমার নতুন ব্যাকএন্ড এন্ডপয়েন্ট অনুযায়ী এটি আপডেট করা হয়েছে
  return await apiFetch("/applications/complete-registration", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};