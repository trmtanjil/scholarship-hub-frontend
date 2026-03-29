"use client";

import { useEffect, useState, useCallback } from "react";
import { deleteReviewAction, getAllReviewsAction,  } from "@/action/review.action";
import { IReview } from "@/types/review.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star, Loader2, MessageSquareQuote } from "lucide-react";
import { toast } from "sonner";
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ManageReviews() {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllReviewsAction();
      if (res?.data) {
        setReviews(res.data);
      }
    } catch (error) {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      const res = await deleteReviewAction(id);
      if (res && res.data?.success) {
        toast.success(res.data.message || "Review deleted successfully");
        fetchReviews(); // List refresh korbe
      } else {
        toast.error(res?.error || res.data?.message || "Failed to delete");
      }
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card className="border-none shadow-none bg-transparent">
        <CardHeader className="px-0">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <MessageSquareQuote className="h-6 w-6 text-primary" />
            Manage User Reviews
          </CardTitle>
          <p className="text-slate-500">Monitor and manage all scholarship reviews from users.</p>
        </CardHeader>
        <CardContent className="px-0">
          <div className="rounded-lg border bg-white overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[200px]">User</TableHead>
                  <TableHead>Scholarship</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="max-w-[300px]">Comment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <TableRow key={review.id} className="hover:bg-slate-50/50">
                      <TableCell>
                        <div className="font-medium text-slate-900">{review.user?.name || "Unknown User"}</div>
                        <div className="text-xs text-slate-500">{review.user?.email}</div>
                      </TableCell>
                      <TableCell className="font-medium text-slate-700">
                        {review.scholarshipId || "N/A"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-md w-fit font-bold">
                          {review.rating} <Star className="h-3 w-3 fill-yellow-500" />
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 italic">
                        {review.comment || "No comment provided"}
                      </TableCell>
                      <TableCell className="text-slate-500 text-sm">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DeleteConfirmationModal
                          onDelete={() => handleDelete(review.id)}
                          itemName="this review"
                          isLoading={deletingId === review.id}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-20 text-slate-400 italic">
                      No reviews found in the system.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}