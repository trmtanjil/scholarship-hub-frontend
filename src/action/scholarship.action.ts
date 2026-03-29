"use server";

import { apiFetch, buildQuery } from "@/services/schollarship.service";
  import { ServiceResult } from "@/types/category.type";
import { IScholarship, ScholarshipParams } from "@/types/scholarship.type";

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
    next: { revalidate: 60, tags: ["scholarships"] }, // ১ মিনিট ক্যাশ থাকবে
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