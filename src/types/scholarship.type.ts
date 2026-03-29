// Category enum (ONE ONLY)
export enum Category {
  Full = "Full",
  Partial = "Partial",
}

// Scholarship interface
export interface IScholarship {
  id: string;
  title: string;
  universityName: string;
  category: Category;
  subject: string;
  description: string;
  deadline: Date | string;
  applicationFee: number;
  postedById: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Query params (merged)
export interface ScholarshipParams {
  search?: string;
  category?: Category;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Create scholarship type
export type TCreateScholarship = Omit<
  IScholarship,
  "id" | "createdAt" | "updatedAt" | "postedById"
>;
 


export interface ICreateScholarshipPayload {
  title: string;
  universityName: string;
  category: Category;
  subject: string;
  description: string;
  deadline: string;
  applicationFee: number;
}