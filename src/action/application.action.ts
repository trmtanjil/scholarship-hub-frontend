/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { applicationService } from "@/services/applications.service";
import { apiFetch } from "@/services/schollarship.service";
import { IApplication, IUpdateApplicationPayload } from "@/types/application.type";
import { ServiceResult } from "@/types/category.type";
 import { revalidatePath, revalidateTag } from "next/cache";

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
export const getMyApplicationsAction = async (): Promise<ServiceResult<IApplication[]>> => {
  // এখানে তোমার ব্যাকএন্ডের সঠিক এন্ডপয়েন্টটি দাও
  return await apiFetch<IApplication[]>("/applications/my-applications", {
    method: "GET",
    cache: "no-store", // সবসময় লেটেস্ট ডেটা পাওয়ার জন্য
  });
};

export const updateApplicationAction = async (
  id: string,
  payload: IUpdateApplicationPayload
): Promise<ServiceResult<IApplication>> => {
  try {
    const result = await applicationService.updateApplication(id, payload);
    if (result.data) {
      revalidatePath("/myscholarships");
    }
    return result;
  } catch (error: any) {
    return { data: null, error: error?.message || "Failed to update" };
  }
};