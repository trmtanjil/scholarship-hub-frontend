"use client";

import { useEffect, useState, useCallback } from "react";
import { getMyReviewsAction, deleteReviewAction } from "@/action/review.action";
import { IReview } from "@/types/review.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Star, Trash2, Edit, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal";

export default function MyReviews() {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getMyReviewsAction();
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
      if (res && res.data) {
        toast.success(res.data.message || "Review deleted");
        fetchReviews();
      } else {
        toast.error(res?.error || res.data?.message || "Delete failed");
      }
    } finally {
      setDeletingId(null);
    }
  };

  if (loading){
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin h-8 w-8 text-primary"/>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">My Reviews</h1>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Scholarship</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium text-slate-700">
                    {/* এখানে স্কলারশিপের নাম দেখানোর জন্য রিলেশন থাকতে হবে */}
                    Scholarship ID: {review.scholarshipId.substring(0, 8)}...
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {review.rating} <Star className="h-4 w-4 fill-current" />
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate text-slate-600">
                    {review.comment}
                  </TableCell>
                  <TableCell className="text-slate-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    {/* Edit Button (তুমি চাইলে UpdateReviewModal তৈরি করে নিতে পারো) */}
                    <Button variant="outline" size="icon" className="h-8 w-8 text-blue-600">
                      <Edit className="h-4 w-4" />
                    </Button>

                    {/* Delete Modal */}
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
                <TableCell colSpan={5} className="text-center py-20 text-slate-400">
                  No reviews found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}