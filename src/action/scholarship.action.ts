/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { applicationService } from "@/services/applications.service";
import { apiFetch, buildQuery, ScholarshipService } from "@/services/schollarship.service";
import { ServiceResult } from "@/types/category.type";
import { ICreateScholarshipPayload, IScholarship, ScholarshipParams } from "@/types/scholarship.type";
import { IApplication, IUpdateApplicationPayload, IMessageResponse } from "@/types/application.type";
import { revalidatePath } from "next/cache";

/**
 * সকল স্কলারশিপ লিস্ট নিয়ে আসা
 */
export const getAllScholarshipsAction = async (
  params?: ScholarshipParams
): Promise<ServiceResult<IScholarship[]>> => {
  const query = buildQuery(params);
  const endpoint = `/scholarship${query ? `?${query}` : ""}`;

  return await apiFetch<IScholarship[]>(endpoint, {
    method: "GET",
    next: { revalidate: 60, tags: ["scholarships"] }, 
  });
};

/**
 * সিঙ্গেল স্কলারশিপ ডিটেইলস নিয়ে আসা
 */
export const getSingleScholarshipAction = async (
  id: string
): Promise<ServiceResult<IScholarship>> => {
  return await apiFetch<IScholarship>(`/scholarship/${id}`, {
    method: "GET",
    next: { tags: [`scholarship-${id}`] },
  });
};

/**
 * অ্যাপ্লিকেশন ডিলিট অ্যাকশন
 */
export const deleteApplicationAction = async (id: string): Promise<{ success: boolean; message: string }> => {
  const result = await applicationService.deleteApplication(id);
  
  // এখানে result.data চেক করা হচ্ছে কারণ ServiceResult এ সাধারণত data থাকে
  if (result.data) {
    revalidatePath("/dashboard/user/my-scholarships"); 
    return { success: true, message: result.data.message || "Application cancelled successfully" };
  }
  
  return { success: false, message: result.error || "Failed to delete application" };
};

/**
 * আপডেট অ্যাকশন
 */
export const updateApplicationAction = async (
  id: string, 
  payload: IUpdateApplicationPayload
): Promise<{ success: boolean; data?: IApplication; message?: string }> => {
  const result = await applicationService.updateApplication(id, payload);
  
  if (result.data) {
    revalidatePath("admin-dashboard/managescholarship");
    return { success: true, data: result.data };
  }
  
  return { success: false, message: result.error || "Failed to update application" };
};

export const createScholarshipAction = async (payload: ICreateScholarshipPayload) => {
  try {
    const result = await ScholarshipService.createScholarship(payload);
    if (result.data) {
      // revalidatePath("/scholarships");
      revalidatePath("/admin-dashboard/addscholarship");
    }

    return result as ServiceResult<IScholarship>;
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || "Something went wrong while adding scholarship",
    };
  }
};

 
export const deleteScholarshipAction = async (id: string) => {
  const res = await ScholarshipService.delete(id);
  if (res.data) revalidatePath("/dashboard/admin/manage-scholarships");
  return res;
};

 

// স্কলারশিপ আপডেট করা
export const updateScholarshipAction = async (
  id: string,
  payload: Partial<ICreateScholarshipPayload>
): Promise<ServiceResult<IScholarship>> => {
  try {
    const result = await ScholarshipService.update(id, payload);
    if (result.data) {
      revalidatePath("/dashboard/admin/manage-scholarships");
    }
    return result;
  } catch (error: any) {
    return { data: null, error: error?.message || "Failed to update" };
  }
};