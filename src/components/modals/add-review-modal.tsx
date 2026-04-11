"use client";

import { useState } from "react";
 import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Star, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createReviewAction } from "@/action/review.action";

export function AddReviewModal({ scholarshipId, scholarshipName }: { scholarshipId: string, scholarshipName: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const comment = formData.get("comment") as string;

    if (!comment || comment.length < 10) {
      return toast.error("Comment must be at least 10 characters long");
    }

    try {
      setLoading(true);
      const res = await createReviewAction({
        scholarshipId,
        rating,
        comment,
      });

      if (res && res.data) {
        toast.success("Review submitted successfully!");
        setOpen(false);
      } else {
        toast.error(res?.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8 text-purple-600 hover:bg-purple-50">
          <MessageSquare className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write a Review  {scholarshipName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="flex gap-2 justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-8 w-8 cursor-pointer transition-colors ${
                  star <= rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <Textarea
            name="comment"
            placeholder="Share your experience with this scholarship..."
            className="min-h-[120px]"
            required
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700">
              {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
              Submit Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}