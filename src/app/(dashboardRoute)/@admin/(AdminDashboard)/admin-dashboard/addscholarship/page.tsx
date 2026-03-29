"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createScholarshipAction } from "@/action/scholarship.action";
import { Category } from "@/types/scholarship.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, GraduationCap } from "lucide-react";

export default function AddScholarshipPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    const payload = {
      title: formData.get("title") as string,
      universityName: formData.get("universityName") as string,
      category: formData.get("category") as Category,
      subject: formData.get("subject") as string,
      description: formData.get("description") as string,
      deadline: new Date(formData.get("deadline") as string).toISOString(),
      applicationFee: Number(formData.get("applicationFee")),
    };

    try {
      const res = await createScholarshipAction(payload);
      if (res && res.data) {
        toast.success("Scholarship added successfully!");
        router.push("/dashboard/admin/manage-scholarships"); // লিস্ট পেজে পাঠিয়ে দিবে
      } else {
        toast.error(res?.error || "Failed to create scholarship");
      }
    } catch (error) {
      toast.error("Failed to create scholarship");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Card className="shadow-lg border-slate-200">
        <CardHeader className="bg-slate-50 border-b">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <GraduationCap className="h-6 w-6 text-primary" />
            Add New Scholarship
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Scholarship Title</Label>
                <Input id="title" name="title" placeholder="Full Bright Scholarship" required />
              </div>

              {/* University */}
              <div className="space-y-2">
                <Label htmlFor="universityName">University Name</Label>
                <Input id="universityName" name="universityName" placeholder="Oxford University" required />
              </div>

              {/* Category (Enum) */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Category.Full}>Full Scholarship</SelectItem>
                    <SelectItem value={Category.Partial}>Partial Scholarship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">Subject / Department</Label>
                <Input id="subject" name="subject" placeholder="Computer Science" required />
              </div>

              {/* Deadline */}
              <div className="space-y-2">
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input id="deadline" name="deadline" type="date" required />
              </div>

              {/* Fee */}
              <div className="space-y-2">
                <Label htmlFor="applicationFee">Application Fee ($)</Label>
                <Input id="applicationFee" name="applicationFee" type="number" placeholder="50" required />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                placeholder="Write about requirements, benefits..." 
                className="min-h-[150px]"
                required 
              />
            </div>

            <div className="flex justify-end gap-4 border-t pt-6">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="px-8">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Publish Scholarship
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}