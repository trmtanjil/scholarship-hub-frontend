export interface IReview {
  id: string;
  userId: string;
  scholarshipId: string;
  rating: number; // ১ থেকে ৫ এর মধ্যে
  comment: string;
  user?: {
    name: string;
    email?: string;
    image?: string;
  };
  createdAt: string;
}

// Optionally include populated relations returned by some endpoints
export interface IReviewWithRelations extends IReview {
  scholarship?: {
    id?: string;
    title?: string;
    universityName?: string;
  };
}

export interface ICreateReviewPayload {
  scholarshipId: string;
  rating: number;
  comment: string;
}