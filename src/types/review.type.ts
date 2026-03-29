export interface IReview {
  id: string;
  userId: string;
  scholarshipId: string;
  rating: number; // ১ থেকে ৫ এর মধ্যে
  comment: string;
  user?: {
    name: string;
    image?: string;
  };
  createdAt: string;
}

export interface ICreateReviewPayload {
  scholarshipId: string;
  rating: number;
  comment: string;
}