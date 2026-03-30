import React from "react";
import { Search, FolderHeart, Trophy } from "lucide-react";

export default function HowToWork() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-4xl font-extrabold text-slate-900">
          How ScholarshipHub Works
        </h2>
        <p className="mt-4 text-slate-600 text-lg">
          ScholarshipHub is a free platform that matches you with college
          scholarships you qualify for, helping you save time and increase
          your chances of success.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="group rounded-3xl bg-white p-8 shadow-md hover:shadow-xl transition-all border border-slate-200">
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            Find College Scholarships
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Complete your profile and instantly get matched with millions of
            scholarships tailored to your academic background, interests, and
            goals.
          </p>
        </div>

        {/* Card 2 */}
        <div className="group rounded-3xl bg-white p-8 shadow-md hover:shadow-xl transition-all border border-slate-200">
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
            <FolderHeart className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            Organize Your Matches
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Filter scholarships by deadline or award amount. Save your
            favorites, track applications, and never miss an opportunity.
          </p>
        </div>

        {/* Card 3 */}
        <div className="group rounded-3xl bg-white p-8 shadow-md hover:shadow-xl transition-all border border-slate-200">
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
            <Trophy className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            Apply and Win
          </h3>
          <p className="text-slate-600 leading-relaxed">
            We create a personalized list of scholarships just for you.
            Apply with confidence and take the next step toward affordable
            education.
          </p>
        </div>
      </div>
    </section>
  );
}