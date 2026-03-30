"use client";

import { useEffect, useState, useCallback } from "react";
 import { IScholarship, Category } from "@/types/scholarship.type";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, GraduationCap, Calendar, DollarSign, FilterX, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { getAllScholarshipsAction } from "@/action/scholarship.action";

export default function AllScholarshipPublic() {
  const [scholarships, setScholarships] = useState<IScholarship[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const fetchScholarships = useCallback(async () => {
    try {
      setLoading(false);
      const res = await getAllScholarshipsAction();
      if (res?.data) {
        setScholarships(res.data);
      }
    } catch (error) {
      toast.error("Failed to load scholarships");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScholarships();
  }, [fetchScholarships]);

  // Client-side Filtering Logic
  const filteredData = scholarships.filter((s) => {
    const matchesSearch = 
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.universityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || s.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Explore Scholarships</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Find the best opportunities to fund your education. Filter by category, 
          search by university, or browse all available grants.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by title, university, or subject..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value={Category.Full}>Full Scholarship</SelectItem>
            <SelectItem value={Category.Partial}>Partial Scholarship</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={resetFilters} className="gap-2">
          <FilterX className="h-4 w-4" /> Reset
        </Button>
      </div>

      {/* Scholarship Grid */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((s) => (
            <Card key={s.id} className="group hover:shadow-md transition-shadow flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={s.category === "Full" ? "default" : "secondary"}>
                    {s.category}
                  </Badge>
                  <div className="flex items-center text-xs text-slate-500 gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(s.deadline).toLocaleDateString()}
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {s.title}
                </CardTitle>
                <p className="text-sm text-slate-500 font-medium">{s.universityName}</p>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <GraduationCap className="h-4 w-4" />
                    <span>{s.subject}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <DollarSign className="h-4 w-4" />
                    <span>Fee: ${s.applicationFee}</span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-3 mt-4">
                    {s.description}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="border-t pt-4">
                <Link href={`/allscholarshippublic/${s.id}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed">
          <p className="text-slate-400 text-lg">No scholarships found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}