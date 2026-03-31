export interface IApplication {
  id: string;
  userId: string;
  scholarshipId: string;
  sscResult: number;
  hscResult: number;
  status: "Pending" | "Review" | "Accepted" | "Rejected";
  createdAt: string;
  updatedAt: string;
  scholarship?: {
    title: string;
    universityName: string;
    category: string;
  };
  user?: {
    id?: string;
    name?: string;
    email?: string;
    image?: string;
  };
  documents?: string;
  payment?: {
    transactionId: string;
    amount: number;
    status: string;
  };
}

export interface IMessageResponse {
  success: boolean;
  message: string;
}

// আপডেট করার সময় সব ফিল্ড পাঠানোর দরকার হয় না, তাই Partial ব্যবহার করা হয়
export interface IUpdateApplicationPayload {
  sscResult?: number;
  hscResult?: number;
  documents?: string;
  // প্রয়োজন অনুযায়ী আরও ফিল্ড যোগ করতে পারো
}