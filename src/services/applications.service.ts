import { apiFetch } from "./schollarship.service"; // তোমার মেইন API সার্ভিস
import { IApplication, IMessageResponse, IUpdateApplicationPayload } from "@/types/application.type";
import { ServiceResult } from "@/types/category.type";

export const applicationService = {

deleteApplication: async (id: string): Promise<ServiceResult<IMessageResponse>> => {
    return await apiFetch<IMessageResponse>(`/applications/${id}`, {
      method: "DELETE",
    });
  },

  /**
   * ২. অ্যাপ্লিকেশন আপডেট করা
   * ইনপুট হিসেবে IUpdateApplicationPayload এবং আউটপুট হিসেবে আপডেট হওয়া IApplication পাবো
   */
  updateApplication: async (
    id: string, 
    payload: IUpdateApplicationPayload
  ): Promise<ServiceResult<IApplication>> => {
    return await apiFetch<IApplication>(`/applications/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },
    
  // ব্যাকএন্ড থেকে ইউজারের সব অ্যাপ্লিকেশন নিয়ে আসা
  getMyApplications: async (): Promise<ServiceResult<IApplication[]>> => {
    return await apiFetch<IApplication[]>("/applications/my-applications", {
      method: "GET",
      cache: "no-store",
    });
  },

  // নির্দিষ্ট একটি অ্যাপ্লিকেশনের ডিটেইলস আনা
  getSingleApplication: async (id: string): Promise<ServiceResult<IApplication>> => {
    return await apiFetch<IApplication>(`/applications/${id}`, {
      method: "GET",
    });
  },
};