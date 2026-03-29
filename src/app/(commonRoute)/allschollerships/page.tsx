import { getAllScholarshipsAction } from "@/action/scholarship.action";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function AllScholarshipsPage() {
  const { data: scholarships, error } = await getAllScholarshipsAction();

  if (error) return <div className="p-10 text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10">
      <div className="mb-10 space-y-2">
        <h1 className="text-4xl font-black text-slate-900">সব স্কলারশিপ দেখুন</h1>
        <p className="text-slate-500 italic">আপনার উচ্চশিক্ষার স্বপ্ন পূরণে সঠিক স্কলারশিপটি খুঁজে নিন।</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {scholarships?.map((s) => (
          <Card key={s.id} className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all rounded-[2rem] bg-white group">
            <div className="h-3 bg-primary" />
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                  {s.category} Funded
                </Badge>
              </div>
              <CardTitle className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">
                {s.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                <MapPin className="w-4 h-4 text-primary" />
                {s.universityName}
              </div>
              <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                <GraduationCap className="w-4 h-4 text-primary" />
                {s.subject}
              </div>
              <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                {s.description}
              </p>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-6 bg-slate-50/50">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Fee</span>
                <span className="text-lg font-black text-slate-900">${s.applicationFee}</span>
              </div>
              <Button asChild className="rounded-xl px-5 group/btn">
                <Link href={`/allschollerships/${s.id}`} className="flex items-center gap-2">
                  Details <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}