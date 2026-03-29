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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateApplicationAction } from "@/action/application.action";
import { IApplication } from "@/types/application.type";

export function UpdateApplicationModal({ application }: { application: IApplication }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      sscResult: Number(formData.get("sscResult")),
      hscResult: Number(formData.get("hscResult")),
      documents: formData.get("documents") as string,
    };

    try {
      setLoading(true);
      const res = await updateApplicationAction(application.id, payload);

      if (res && res.data) {
        toast.success("Application updated successfully!");
        setOpen(false);
      } else {
        toast.error(res?.error || "Update failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 text-blue-600 hover:bg-blue-50"
          disabled={application.status !== "Pending"} // শুধু পেন্ডিং হলে এডিট করা যাবে
        >
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Scholarship Application</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sscResult">SSC Result (GPA)</Label>
              <Input 
                id="sscResult" 
                name="sscResult" 
                type="number" 
                step="0.01" 
                defaultValue={application.sscResult} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hscResult">HSC Result (GPA)</Label>
              <Input 
                id="hscResult" 
                name="hscResult" 
                type="number" 
                step="0.01" 
                defaultValue={application.hscResult} 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="documents">Documents Link (Google Drive/Cloud)</Label>
            <Input 
              id="documents" 
              name="documents" 
              defaultValue={application.hscResult} 
              placeholder="https://drive.google.com/..." 
              required 
            />
          </div>

          <div className="flex justify-end ga p-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}