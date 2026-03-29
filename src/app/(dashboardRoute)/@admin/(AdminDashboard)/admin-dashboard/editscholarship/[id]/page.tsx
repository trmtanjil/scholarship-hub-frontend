"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getSingleScholarshipAction, updateScholarshipAction } from "@/action/scholarship.action";
import { IScholarship, Category, ICreateScholarshipPayload } from "@/types/scholarship.type";
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
import { Loader2, Save, ArrowLeft } from "lucide-react";

export default function EditScholarshipPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params?.id ?? "");

  const [scholarship, setScholarship] = useState<IScholarship | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        setLoading(true);
        const res = await getSingleScholarshipAction(id);
        if (res && res.data) {
          setScholarship(res.data);
        } else {
          toast.error("Scholarship not found");
          router.push("/dashboard/admin/manage-scholarships");
        }
      } catch (err) {
        toast.error("Failed to load scholarship");
        router.push("/dashboard/admin/manage-scholarships");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchScholarship();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating(true);

    const formData = new FormData(e.currentTarget);
    const payload: Partial<ICreateScholarshipPayload> = {
      title: String(formData.get("title") ?? ""),
      universityName: String(formData.get("universityName") ?? ""),
      category: (formData.get("category") as Category) ?? undefined,
      subject: String(formData.get("subject") ?? ""),
      description: String(formData.get("description") ?? ""),
      deadline: formData.get("deadline") ? String(formData.get("deadline")) : undefined,
      applicationFee: formData.get("applicationFee") ? Number(formData.get("applicationFee")) : undefined,
    };

    try {
      const res = await updateScholarshipAction(id, payload);
      if (res && res.data) {
        toast.success("Scholarship updated successfully!");
        router.push("/dashboard/admin/manage-scholarships");
      } else {
        toast.error(res?.error || "Failed to update scholarship");
      }
    } catch (err) {
      toast.error("Failed to update scholarship");
    } finally {
      setUpdating(false);
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
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Button 
        variant="ghost" 
        onClick={() => router.back()} 
        className="mb-4 gap-2 text-slate-600"
      >
        <ArrowLeft className="h-4 w-4" /> Back to List
      </Button>

      <Card className="shadow-lg border-slate-200">
        <CardHeader className="bg-slate-50 border-b">
          <CardTitle className="text-2xl font-bold text-slate-800">
            Edit Scholarship
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Scholarship Title</Label>
                <Input id="title" name="title" defaultValue={scholarship?.title ?? ""} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="universityName">University Name</Label>
                <Input id="universityName" name="universityName" defaultValue={scholarship?.universityName ?? ""} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" defaultValue={scholarship?.category}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Category.Full}>Full Scholarship</SelectItem>
                    <SelectItem value={Category.Partial}>Partial Scholarship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" defaultValue={scholarship?.subject ?? ""} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input 
                  id="deadline" 
                  name="deadline" 
                  type="date" 
                  defaultValue={scholarship?.deadline ? new Date(scholarship.deadline).toISOString().split('T')[0] : ""} 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="applicationFee">Application Fee ($)</Label>
                <Input id="applicationFee" name="applicationFee" type="number" defaultValue={scholarship?.applicationFee ?? 0} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                defaultValue={scholarship?.description ?? ""} 
                className="min-h-[120px]" 
                required 
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={updating} className="px-10 gap-2">
                {updating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Update Scholarship
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
