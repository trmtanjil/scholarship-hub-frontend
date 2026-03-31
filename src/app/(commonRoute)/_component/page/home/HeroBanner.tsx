import HeroBannerClient from "./HeroBannerClient";

const bannerData = [
  {
    image: "/scholar1.png",
    title: "Scholarships that Open Doors to Success",
    description:
      "Unlock your potential with our curated selection of top-tier scholarships worldwide.",
    cta: "Explore Scholarships",
  },
  {
    image: "/scholar2.png",
    title: "Unlock Your Future with Scholarships",
    description:
      "Find the perfect financial aid and guidance to pursue your academic dreams.",
    cta: "Start Application",
  },
  {
    image: "/scholar3.png",
    title: "Build Your Academic Journey",
    description:
      "Get access to trusted scholarships and make your education affordable.",
    cta: "Get Started",
  },
];

export default function HeroBanner() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Card Container */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-white to-blue-100 shadow-lg">
        <HeroBannerClient bannerData={bannerData} />
      </div>

      {/* Decorative Background Blur */}
      <div className="absolute -top-16 -right-16 w-72 h-72 bg-blue-500/20 blur-[140px] rounded-full -z-10" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-500/20 blur-[160px] rounded-full -z-10" />
    </section>
  );
}