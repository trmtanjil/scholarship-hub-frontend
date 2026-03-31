"use client";

import { useEffect, useState, useCallback } from "react";
import { getMyApplicationsAction } from "@/action/application.action";
import { deleteApplicationAction } from "@/action/scholarship.action";
import { IApplication } from "@/types/application.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

// নতুন কম্পোনেন্ট ইমপোর্ট
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal";
import { AddReviewModal } from "@/components/modals/add-review-modal";
import { UpdateApplicationModal } from "@/components/modals/update-application-modal";

export default function MyScholarships() {
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
console.log(applications)
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getMyApplicationsAction();
      if (res?.data) {
        setApplications(res.data);
      }
    } catch (error) {
      toast.error("Could not load applications");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      const res = await deleteApplicationAction(id);
      if (res.success) {
        toast.success("Application deleted successfully");
        fetchApplications();
      } else {
        toast.error(res.message || "Failed to delete");
      }
    } catch (error) {
      toast.error("An error occurred while deleting");
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
    <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">My Applications</h1>
        <p className="text-slate-500 text-sm font-medium">
          Total: {applications.length}
        </p>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold text-slate-900">Scholarship Name</TableHead>
              <TableHead className="font-semibold text-slate-900">University</TableHead>
              <TableHead className="font-semibold text-slate-900">Status</TableHead>
              <TableHead className="font-semibold text-slate-900">Applied Date</TableHead>
              <TableHead className="text-right font-semibold text-slate-900">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length > 0 ? (
              applications.map((app) => (
                 <TableRow key={app.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-medium text-slate-700">
                    {app.scholarship?.title || "N/A"}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {app.scholarship?.universityName || "N/A"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        app.status === "Accepted" ? "bg-green-100 text-green-700" :
                        app.status === "Review" ? "bg-red-100 text-red-700" :
                        app.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                        "bg-blue-100 text-blue-700"
                      }
                    >
                     
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500">
                    {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {/* View Details */}
                      <Link href={`/myapplications/${app.id}`}>
                        <Button variant="outline" size="icon" className="h-8 w-8 hover:bg-slate-100" title="View Details">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>

                      {/* Edit Button */}
                      <Button variant="outline" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50" title="Edit Application">
                       <UpdateApplicationModal application={app} />
                      </Button>

                      {/* Review Modal */}
                      <AddReviewModal 
                        scholarshipId={app.scholarshipId} 
                        scholarshipName={app.scholarship?.title || "Scholarship"} 
                      />

                      {/* Delete Modal */}
                      <DeleteConfirmationModal
                        onDelete={() => handleDelete(app.id)}
                        itemName={app.scholarship?.title || "this application"}
                        disabled={app.status !== "Pending"}
                        isLoading={deletingId === app.id}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-20 text-slate-400 italic">
                  No applications found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}