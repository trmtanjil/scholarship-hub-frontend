"use server";

import { apiFetch } from "@/services/schollarship.service";
 import { revalidateTag } from "next/cache";

interface IApplicationResponse {
  id: string;
  status: string;
}

export const createFullApplicationAction = async (payload: {
  scholarshipId: string;
  transactionId: string;
  amount: number;
  sscResult: number;
  hscResult: number;
  documents: string;
}) => {
  const result = await apiFetch<IApplicationResponse>("/applications/complete-registration", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!result.error) {
    // এখানে দ্বিতীয় আর্গুমেন্ট হিসেবে "default" বা তোমার ক্যাশ প্রোফাইল নাম যোগ করো
    revalidateTag("scholarships", "default"); 
  }
  return result;
};