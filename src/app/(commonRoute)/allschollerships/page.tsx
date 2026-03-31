import { getAllScholarshipsAction } from "@/action/scholarship.action";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default async function FeaturedScholarships() {
  const { data: scholarships, error } = await getAllScholarshipsAction();

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load scholarships
      </div>
    );
  }

  const featured = scholarships?.slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
      {/* Header */}
      <div className="mb-14 text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
            <GraduationCap className="w-7 h-7 text-primary" />
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Featured Scholarships
        </h2>

        <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base">
          Discover the best scholarship opportunities to support your academic journey.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featured?.map((s) => (
          <Card
            key={s.id}
            className="group rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
          >
            {/* Logo / Category Header */}
            <div className="flex items-center justify-between px-5 pt-5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  Scholarship
                </span>
              </div>

              <Badge variant="secondary" className="text-xs">
                {s.category}
              </Badge>
            </div>

            {/* Content */}
            <CardHeader className="pb-2 pt-4">
              <CardTitle className="text-base font-bold line-clamp-2 group-hover:text-primary transition-colors">
                {s.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="line-clamp-1">
                  {s.universityName}
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-600">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="line-clamp-1">
                  {s.subject}
                </span>
              </div>

              <p className="text-slate-500 line-clamp-2">
                {s.description}
              </p>
            </CardContent>

            {/* Footer */}
            <CardFooter className="flex items-center justify-between border-t bg-slate-50 px-5 py-4">
              <div>
                <p className="text-[11px] uppercase font-semibold text-slate-400">
                  Application Fee
                </p>
                <p className="text-lg font-extrabold text-slate-900">
                  ${s.applicationFee}
                </p>
              </div>

              <Button asChild size="sm" className="rounded-xl group/btn">
                <Link href={`/allschollerships/${s.id}`}>
                  Details
                  <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* View All */}
      <div className="mt-16 text-center">
        <Button asChild size="lg" className="rounded-2xl px-12">
          <Link href="/allscholarshippublic">
            View All Scholarships
          </Link>
        </Button>
      </div>
    </section>
  );
}