import { apiFetch } from "./schollarship.service";
import { IReview, ICreateReviewPayload } from "@/types/review.type";
import { ServiceResult } from "@/types/category.type";
import { IMessageResponse } from "@/types/application.type";

export const reviewService = {

    getMyReviews: async (): Promise<ServiceResult<IReview[]>> => {
  return await apiFetch<IReview[]>("/reviews", {
    method: "GET",
    cache: "no-store",
  });
},

// রিভিউ ডিলিট করা
deleteReview: async (id: string): Promise<ServiceResult<IMessageResponse>> => {
  return await apiFetch<IMessageResponse>(`/reviews/${id}`, {
    method: "DELETE",
  });
},

updateReview: async (id: string, payload: { rating: number; comment: string }): Promise<ServiceResult<IReview>> => {
  return await apiFetch<IReview>(`/reviews/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
},

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