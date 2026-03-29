"use client";

import { useEffect, useState, useCallback } from "react"; // useCallback যোগ করা হয়েছে
import { getMyApplicationsAction } from "@/action/application.action";
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
import { Loader2, Edit, Trash2, MessageSquare, Eye } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { deleteApplicationAction } from "@/action/scholarship.action";

export default function MyScholarships() {
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [loading, setLoading] = useState(true);

  // ১. Data Fetch kora (useCallback দিয়ে অপ্টিমাইজ করা হয়েছে)
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getMyApplicationsAction();
      if (res?.data) {
        setApplications(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
      toast.error("Could not load applications");
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect এখন শুধু মাউন্ট হওয়ার সময় একবারই চলবে
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // ২. Delete Handler
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;

    const res = await deleteApplicationAction(id);
    if (res.success) {
      toast.success("Application deleted successfully");
      fetchApplications(); 
    } else {
      toast.error(res.message || "Failed to delete");
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
        <p className="text-slate-500 text-sm">Total: {applications.length}</p>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold">Scholarship Name</TableHead>
              <TableHead className="font-semibold">University</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Applied Date</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length > 0 ? (
              applications.map((app) => (
                <TableRow key={app.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-medium text-slate-700">
                    {app.scholarship?.title || "N/A"}
                  </TableCell>
                  <TableCell>{app.scholarship?.universityName || "N/A"}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        app.status === "Approved" ? "bg-green-100 text-green-700 hover:bg-green-200" :
                        app.status === "Rejected" ? "bg-red-100 text-red-700 hover:bg-red-200" :
                        app.status === "Pending" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" :
                        "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      }
                    >
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/dashboard/user/my-applications/${app.id}`}>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>

                      {/* Edit Button */}
                      <Button variant="outline" size="icon" className="h-8 w-8 text-blue-600">
                        <Edit className="h-4 w-4" />
                      </Button>

                      {/* Review Button */}
                      <Button variant="outline" size="icon" className="h-8 w-8 text-purple-600">
                        <MessageSquare className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDelete(app.id)}
                        disabled={app.status !== "Pending"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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