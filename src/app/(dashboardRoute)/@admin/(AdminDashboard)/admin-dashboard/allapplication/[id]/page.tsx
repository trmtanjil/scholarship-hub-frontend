"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
 import { IApplication } from "@/types/application.type";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, User, GraduationCap, DollarSign, Calendar } from "lucide-react";
import { toast } from "sonner";
import { getSingleApplicationAction } from "@/action/application.action";

export default function ApplicationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [app, setApp] = useState<IApplication | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getSingleApplicationAction(id);
        if (res?.data) {
          setApp(res.data);
        } else {
          toast.error("Application not found");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading details...</div>;
  if (!app) return <div className="p-10 text-center text-red-500">Application not found!</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => router.back()} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Back to List
      </Button>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">Application Review</h1>
        <Badge className="text-lg px-4 py-1">{app.status}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <User className="h-5 w-5" /> Student Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Name:</strong> {app.user?.name}</p>
            <p><strong>Email:</strong> {app.user?.email}</p>
            {/* <p><strong>Phone:</strong> {app.user?.n || "N/A"}</p> */}
          </CardContent>
        </Card>

        {/* Academic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <GraduationCap className="h-5 w-5" /> Academic Records
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>SSC Result:</strong> {app.sscResult} GPA</p>
            <p><strong>HSC Result:</strong> {app.hscResult} GPA</p>
          </CardContent>
        </Card>

        {/* Scholarship Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <FileText className="h-5 w-5" /> Scholarship Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Title:</strong> {app.scholarship?.title}</p>
            <p><strong>University:</strong> {app.scholarship?.universityName}</p>
            <p><strong>Applied Date:</strong> {new Date(app.createdAt).toLocaleDateString()}</p>
          </CardContent>
        </Card>

        {/* Payment & Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <DollarSign className="h-5 w-5" /> Payment & Docs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p><strong>Status:</strong> {app.payment ? "Paid" : "Unpaid"}</p>
              {app.payment && <p><strong>TrxID:</strong> {app.payment.transactionId}</p>}
            </div>
            <Button asChild className="w-full" variant="outline">
              <a href={app.documents} target="_blank" rel="noreferrer">
                View Submitted Documents
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}