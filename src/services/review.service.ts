import { apiFetch } from "./schollarship.service";
import { IReview, ICreateReviewPayload } from "@/types/review.type";
import { ServiceResult } from "@/types/category.type";

export const reviewService = {
  // নতুন রিভিউ তৈরি করা
  createReview: async (payload: ICreateReviewPayload): Promise<ServiceResult<IReview>> => {
    return await apiFetch<IReview>("/reviews", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // নির্দিষ্ট স্কলারশিপের সব রিভিউ দেখা
  getScholarshipReviews: async (scholarshipId: string): Promise<ServiceResult<IReview[]>> => {
    return await apiFetch<IReview[]>(`/reviews/scholarship/${scholarshipId}`, {
      method: "GET",
    });
  },
};