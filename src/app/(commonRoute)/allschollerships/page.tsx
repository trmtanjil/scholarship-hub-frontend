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
  ImageIcon,
} from "lucide-react";
import Image from "next/image";
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
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12 text-center space-y-3">
        <h2 className="text-4xl font-extrabold text-slate-900">
          Featured Scholarships
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Discover the best scholarship opportunities to support your academic journey.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featured?.map((s) => (
          <Card
            key={s.id}
            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all"
          >
            {/* Image */}
            {/* <div className="relative h-40 w-full bg-slate-100 flex items-center justify-center">
              {s.imag ? (
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-slate-400">
                  <ImageIcon className="w-10 h-10" />
                  <span className="text-xs mt-1">No Image</span>
                </div>
              )}

              <Badge className="absolute top-4 left-4 bg-primary/90">
                {s.category}
              </Badge>
            </div> */}

            {/* Content */}
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">
                {s.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-primary" />
                {s.universityName}
              </div>

              <div className="flex items-center gap-2 text-slate-600">
                <GraduationCap className="w-4 h-4 text-primary" />
                {s.subject}
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

      {/* View All Button */}
      <div className="mt-14 text-center">
        <Button asChild size="lg" className="rounded-2xl px-10">
          <Link href="/allschollerships">
            View All Scholarships
          </Link>
        </Button>
      </div>
    </section>
  );
}