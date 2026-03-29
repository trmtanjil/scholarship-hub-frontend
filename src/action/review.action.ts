/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { reviewService } from "@/services/review.service";
import { ICreateReviewPayload } from "@/types/review.type";
import { IMessageResponse } from "@/types/application.type";
import { revalidatePath } from "next/cache";
import { ServiceResult } from "@/types/category.type";

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

export const getMyReviewsAction = async () => {
  return await reviewService.getMyReviews();
};

export const deleteReviewAction = async (id: string): Promise<ServiceResult<IMessageResponse>> => {
  const res = await reviewService.deleteReview(id);
  if (res.data?.success) revalidatePath("/dashboard/user/my-reviews");
  return res;
};

export const updateReviewAction = async (
  id: string,
  payload: { rating: number; comment: string }
): Promise<ServiceResult<any>> => {
  const res = await reviewService.updateReview(id, payload);
  if (res.data) revalidatePath("/dashboard/user/my-reviews");
  return res;
};