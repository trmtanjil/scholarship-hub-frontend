import { getSingleScholarshipAction } from "@/action/scholarship.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, MapPin, GraduationCap, 
  DollarSign, ArrowLeft, CheckCircle, 
  Globe, BookOpen, ShieldCheck, Info 
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ScholarshipDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: scholarship, error } = await getSingleScholarshipAction(id);

  if (error || !scholarship) return notFound();

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Header / Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Link 
            href="/allschollerships" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Discover
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-4 max-w-3xl">
              <div className="flex gap-2">
                <Badge className="bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-50 px-3">
                  {scholarship.category}
                </Badge>
                <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-50 px-3">
                  Open for Applications
                </Badge>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                {scholarship.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-semibold">{scholarship.universityName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-semibold text-rose-600">
                    Deadline: {new Date(scholarship.deadline).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Side: Content */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Tuition Cover</p>
                <p className="text-lg font-bold text-slate-800">Up to 100%</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Duration</p>
                <p className="text-lg font-bold text-slate-800">4 Years</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Region</p>
                <p className="text-lg font-bold text-slate-800">Global</p>
              </div>
            </div>

            {/* Detailed Description */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1.5 bg-primary rounded-full"></div>
                <h3 className="text-2xl font-bold text-slate-800">Scholarship Description</h3>
              </div>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                  {scholarship.description}
                </p>
              </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-blue-600 rounded-[2.5rem] p-8 md:p-12 text-white overflow-hidden relative">
              <Globe className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 rotate-12" />
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <ShieldCheck className="w-7 h-7" /> Program Benefits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {[
                  "Full or Partial Tuition Fee Waiver",
                  "Monthly Living Stipend (If applicable)",
                  "Access to Premium University Facilities",
                  "Global Networking Opportunities",
                  "Dedicated Mentor Support",
                  "Post-Graduation Career Guidance"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <CheckCircle className="w-5 h-5 text-blue-200 shrink-0" />
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Side: Sidebar Card */}
          <div className="space-y-6">
            <Card className="rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border-none overflow-hidden sticky top-10">
              <div className="bg-slate-900 p-10 text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Info size={80} />
                </div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] relative z-10">Total Application Fee</p>
                <h2 className="text-6xl font-black mt-4 text-white relative z-10 flex items-center justify-center">
                  <span className="text-3xl font-light mr-1">$</span>
                  {scholarship.applicationFee}
                </h2>
              </div>
              
              <CardContent className="p-10 space-y-8 bg-white">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">Verified Provider</p>
                      <p className="text-xs text-slate-500">Official scholarship listed by {scholarship.universityName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">Secure Payment</p>
                      <p className="text-xs text-slate-500">Processed via encrypted Stripe gateway</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button asChild className="w-full h-16 rounded-[1.25rem] text-lg font-black shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95 group">
                    <Link href={`/payment/${scholarship.id}`}>
                      Apply for Scholarship
                    </Link>
                  </Button>
                  <p className="mt-6 text-[11px] text-center text-slate-400 uppercase font-bold tracking-wider leading-relaxed">
                    Application fee is non-refundable. <br />
                    Secure connection established.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Extra Info Card */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
               <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <BookOpen className="w-4 h-4 text-primary" /> Eligibility Note
               </h4>
               <p className="text-sm text-slate-500 leading-relaxed">
                 Please ensure you have all digital copies of your transcripts and identity documents ready before starting the application.
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}