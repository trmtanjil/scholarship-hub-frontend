import * as React from "react";
import HeroBannerClient from "./HeroBannerClient";

const bannerData = [
  {
    image: "/Scholarships that open doors to success.png",
    title: "Scholarships that Open Doors to Success",
    description:
      "Unlock your potential with our curated selection of top-tier scholarships worldwide.",
    cta: "Explore Scholarships",
  },
  {
    image: "/Unlock your future with scholarships.png",
    title: "Unlock Your Future with Scholarships",
    description:
      "Find the perfect financial aid and guidance to pursue your academic dreams.",
    cta: "Start Application",
  },
];

export default function HeroBanner() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 py-8">
      <HeroBannerClient bannerData={bannerData} />

      {/* Decorative Blur */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-500/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-blue-500/10 blur-[140px] rounded-full -z-10" />
    </section>
  );
}