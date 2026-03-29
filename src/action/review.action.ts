/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { reviewService } from "@/services/review.service";
import { ICreateReviewPayload } from "@/types/review.type";
import { revalidatePath } from "next/cache";

export const createReviewAction = async (payload: ICreateReviewPayload) => {
  try {
    const result = await reviewService.createReview(payload);
    
    if (result.data) {
      // ডাটা রিvalidate করা যাতে ইউজার সাথে সাথে তার রিভিউ দেখতে পায়
      revalidatePath(`/scholarships/${payload.scholarshipId}`);
      revalidatePath("/dashboard/user/my-applications");
    }

    return result;
  } catch (error: any) {
    return {
      data: null,
      error: error?.message || "Failed to submit review",
    };
  }
};