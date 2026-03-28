import { getAllScholarshipsAction } from "@/action/scholarship.action";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IScholarship } from "@/types/scholarship.type";
import { FileText, MapPin, CalendarDays, DollarSign } from "lucide-react";

/**
 * সিঙ্গেল কার্ড কম্পোনেন্ট (ইউনিক ডিজাইন)
 */
function ScholarshipItem({ s }: { s: IScholarship }) {
  // স্যাম্পল ইউনিভার্সিটি লোগো (backent-এ image না থাকলে এটি ব্যবহার করা যাবে)
  const fallbackLogo = `https://api.dicebear.com/8.x/icons/svg?seed=${s.universityName.replaceAll(' ', '+')}`;
  const deadline = new Date(s.deadline).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl border border-muted hover:border-primary/20 group">
      
      {/* ইমেজ সেকশন (Gradient Overlay সহ) */}
      <div className="relative h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-primary p-6 flex items-center justify-between overflow-hidden">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all"></div>
        
        {/* University Logo */}
        <Avatar className="h-20 w-20 border-4 border-white shadow-xl relative z-10 transition-transform duration-300 group-hover:scale-110">
          <AvatarImage src={fallbackLogo} alt={s.universityName} />
          <AvatarFallback className="bg-white text-primary text-xl font-bold">
            {s.universityName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Category Badge (Top Right) */}
        <Badge variant={s.category === "Full" ? "default" : "secondary"} className="absolute top-4 right-4 text-xs z-10 font-semibold px-3 py-1 uppercase tracking-wider">
          {s.category} Funded
        </Badge>
        
        {/* Subject Background (Top Left) */}
        <span className="absolute -bottom-4 -left-6 text-white/10 text-9xl font-black uppercase z-0 rotate-[-10deg]">
          {s.subject.substring(0, 2)}
        </span>
      </div>

      <CardHeader className="pb-3 pt-6 relative">
        <CardTitle className="text-xl font-extrabold line-clamp-2 leading-tight tracking-tight group-hover:text-primary transition-colors">
          {s.title}
        </CardTitle>
        <CardDescription className="text-sm font-medium text-muted-foreground flex items-center gap-2 mt-1">
          <MapPin className="h-4 w-4 text-primary" />
          {s.universityName}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow space-y-4 text-sm pt-0">
        {/* key features with icons */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-3 border-t border-muted">
          <div className="flex items-center gap-2.5">
            <div className="bg-primary/10 p-2 rounded-full text-primary">
                <FileText className="h-4 w-4" />
            </div>
            <span className="font-semibold text-foreground line-clamp-1">{s.subject}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="bg-primary/10 p-2 rounded-full text-primary">
                <CalendarDays className="h-4 w-4" />
            </div>
            <span className="font-medium text-muted-foreground">{deadline}</span>
          </div>
        </div>
        
        {/* application fee */}
        <div className="bg-muted p-4 rounded-lg flex items-center justify-between border">
            <div className="flex items-center gap-3">
                <DollarSign className="h-6 w-6 text-blue-600 bg-white p-1 rounded-md shadow-sm" />
                <span className="text-sm text-muted-foreground">Application Fee</span>
            </div>
            <span className="text-2xl font-bold text-foreground">${s.applicationFee.toFixed(2)}</span>
        </div>

        <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
          {s.description}
        </p>
      </CardContent>

      <CardFooter className="pt-2 border-t border-muted bg-muted/20">
        <Button className="w-full font-semibold text-md h-12 shadow-md hover:shadow-primary/20" asChild>
          <a href={`/scholarships/${s.id}`}>
            View Scholarship Details
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

/**
 * মেইন লিস্ট কম্পোনেন্ট
 */
export default async function ScholarshipCardList() {
  const { data: scholarships, error } = await getAllScholarshipsAction();

  if (error) {
    return <div className="text-center p-12 text-red-500 bg-red-50 rounded-xl border border-red-200 font-medium">Error: {error}</div>;
  }

  return (
    <div className="p-6 md:p-8 lg:p-10 bg-background min-h-screen">
      <div className="flex items-center justify-between mb-8 pb-4 border-b">
        <h2 className="text-3xl font-extrabold tracking-tighter text-foreground">Available Scholarships</h2>
        <Badge variant="outline" className="text-lg px-4 py-2 font-mono font-medium shadow-inner">
          Total: {scholarships?.length ?? 0}
        </Badge>
      </div>
      
      {/* Grid Layout (ইউনিক রেসপনসিভ) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {scholarships?.map((s) => (
          <ScholarshipItem key={s.id} s={s} />
        ))}
      </div>
    </div>
  );
}