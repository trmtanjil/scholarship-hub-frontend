"use client";

import { useEffect, useState, useCallback } from "react";
import { getAllApplicationsAction, updateApplicationStatusAction } from "@/action/application.action";
import { IApplication } from "@/types/application.type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Loader2, Search } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function AllApplicationsPage() {
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllApps = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllApplicationsAction();
      if (res?.data) setApplications(res.data);
    } catch (error) {
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllApps();
  }, [fetchAllApps]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await updateApplicationStatusAction(id, newStatus);
      if (res && res.data) {
        toast.success(`Status updated to ${newStatus}`);
        fetchAllApps(); // ডাটা রিফ্রেশ
      } else {
        toast.error(res?.error || "Update failed");
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  // সার্চ ফিল্টার
  const filteredApps = applications.filter(app => 
    app.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.scholarship?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">All Student Applications</h1>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search by student or scholarship..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Scholarship</TableHead>
              <TableHead>SSC/HSC</TableHead>
               <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <div className="font-medium">{app.user?.name}</div>
                    <div className="text-xs text-slate-500">{app.user?.email}</div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {app.scholarship?.title}
                  </TableCell>
                  <TableCell>
                    <div className="text-xs font-semibold">S: {app.sscResult} | H: {app.hscResult}</div>
                  </TableCell>
                 
                  <TableCell>
                    <Select 
                      defaultValue={app.status} 
                      onValueChange={(value) => handleStatusChange(app.id, value)}
                    >
                      <SelectTrigger className="w-[130px] h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Review">Review</SelectItem>
                        <SelectItem value="Accepted">Accepted</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin-dashboard/allapplication/${app.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4 text-slate-600" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-20 text-slate-400">
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