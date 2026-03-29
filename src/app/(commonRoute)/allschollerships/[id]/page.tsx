import { getSingleScholarshipAction } from "@/action/scholarship.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, GraduationCap, DollarSign, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ScholarshipDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: scholarship, error } = await getSingleScholarshipAction(id);

  if (error || !scholarship) return notFound();

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 space-y-8">
      {/* Back Button */}
      <Link href="/allschollerships" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to all scholarships
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary border-none text-md px-4 py-1">
              {scholarship.category} Scholarship
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900">
              {scholarship.title}
            </h1>
          </div>

          <div className="flex flex-wrap gap-6 py-4 border-y">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-semibold text-slate-700">{scholarship.universityName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-semibold text-slate-700">
                Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-800">বিস্তারিত তথ্য</h3>
            <p className="text-slate-600 leading-loose text-lg whitespace-pre-line">
              {scholarship.description}
            </p>
          </div>
        </div>

        {/* Right: Application Card */}
        <div className="space-y-6">
          <Card className="rounded-[2.5rem] shadow-2xl border-none overflow-hidden sticky top-20">
            <div className="bg-slate-900 p-8 text-white text-center">
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Application Fee</p>
              <h2 className="text-5xl font-black mt-2 text-white">${scholarship.applicationFee}</h2>
            </div>
            <CardContent className="p-8 space-y-6 bg-white">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 text-green-500" /> Secure Application
                </div>
                <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 text-green-500" /> 24/7 Support
                </div>
              </div>

              <Button asChild className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 transition-transform active:scale-95">
                <Link href={`/payment/${scholarship.id}`}>
                  Apply Now
                </Link>
              </Button>
              <p className="text-[10px] text-center text-slate-400 uppercase font-bold">
                By clicking Apply, you agree to our terms.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}