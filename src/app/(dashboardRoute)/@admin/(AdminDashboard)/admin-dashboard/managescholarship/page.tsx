"use client";

import { useEffect, useState, useCallback } from "react";
import { getAllScholarshipsAction, deleteScholarshipAction } from "@/action/scholarship.action";
import { IScholarship } from "@/types/scholarship.type";
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
import { Edit, Loader2, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal";

export default function ManageScholarships() {
  const [scholarships, setScholarships] = useState<IScholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchScholarships = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllScholarshipsAction();
      if (res?.data) {
        setScholarships(res.data);
      }
    } catch (error) {
      toast.error("Could not load scholarships");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScholarships();
  }, [fetchScholarships]);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      const res = await deleteScholarshipAction(id);
      if (res.data) {
        toast.success("Scholarship deleted successfully");
        fetchScholarships();
      } else {
        toast.error(res.data || "Failed to delete");
      }
    } catch (error) {
      toast.error("An error occurred while deleting");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredScholarships = scholarships.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.universityName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manage Scholarships</h1>
          <p className="text-slate-500 text-sm">Update or remove existing scholarships</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search scholarships..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Link href="/admin-dashboard/addscholarship">
            <Button className="flex gap-2">
              <Plus className="h-4 w-4" /> Add New
            </Button>
          </Link>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-semibold text-slate-900">Scholarship Name</TableHead>
              <TableHead className="font-semibold text-slate-900">University</TableHead>
              <TableHead className="font-semibold text-slate-900">Category</TableHead>
              <TableHead className="font-semibold text-slate-900">Fee</TableHead>
              <TableHead className="font-semibold text-slate-900">Deadline</TableHead>
              <TableHead className="text-right font-semibold text-slate-900">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredScholarships.length > 0 ? (
              filteredScholarships.map((s) => (
                <TableRow key={s.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-medium text-slate-700">{s.title}</TableCell>
                  <TableCell className="text-slate-600">{s.universityName}</TableCell>
                  <TableCell>
                    <Badge variant={s.category === "Full" ? "default" : "secondary"}>
                      {s.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-slate-700">${s.applicationFee}</TableCell>
                  <TableCell className="text-slate-500">
                    {new Date(s.deadline).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {/* Edit Button - Redirects to an edit page */}
                      <Link href={`/admin-dashboard/editscholarship/${s.id}`}>
                        <Button variant="outline" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>

                      {/* Delete Modal */}
                      <DeleteConfirmationModal
                        onDelete={() => handleDelete(s.id)}
                        itemName={s.title}
                        isLoading={deletingId === s.id}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-20 text-slate-400 italic">
                  No scholarships found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}