"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, Target, Users, 
  CheckCircle2, Globe, Sparkles, 
  ArrowRight, ShieldCheck 
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-slate-900 text-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Empowering Future <span className="text-blue-400">Global Leaders</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Scholarship Hub is Bangladeshs most trusted platform for international education. 
              আমরা মেধাবী শিক্ষার্থীদের বৈশ্বিক স্কলারশিপের সাথে সংযুক্ত করি।
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-bold text-sm uppercase tracking-wider">
              <Target size={16} /> Our Mission
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-snug">
              Making Quality Education <br /> Accessible to All
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Our mission is to break the financial barriers that stop students from achieving their dreams. 
              আমাদের লক্ষ্য হলো উচ্চশিক্ষার পথে অর্থের অভাবকে বাধা হতে না দেয়া। আমরা প্রতিটি স্কলারশিপ যাচাই করি যাতে আপনি পান সেরা সুযোগ।
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" />
                <span className="font-semibold text-slate-700">Verified Info</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500" />
                <span className="font-semibold text-slate-700">Fast Process</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-blue-600 rounded-[3rem] p-12 text-white relative z-10">
              <Sparkles className="w-12 h-12 mb-6 text-blue-200" />
              <h3 className="text-2xl font-bold mb-4 italic">Scholarship Hub changed my life. I am now studying in Europe with a full scholarship!</h3>
              <p className="font-bold opacity-80">— A Happy Student</p>
            </div>
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-slate-100 rounded-[3rem] -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* How It Works - The Process */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">How We Help You</h2>
            <p className="text-slate-500 mt-4 uppercase tracking-widest font-bold text-sm">আবেদন করার সহজ ধাপসমূহ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                step: "01", 
                title: "Find Scholarship", 
                desc: "Browse through hundreds of verified global opportunities.",
                bn: "আপনার পছন্দের স্কলারশিপ খুঁজে নিন।"
              },
              { 
                step: "02", 
                title: "Pay & Apply", 
                desc: "Pay the secure application fee via Stripe and submit details.",
                bn: "নিরাপদে আবেদন ফি প্রদান করুন।"
              },
              { 
                step: "03", 
                title: "Get Support", 
                desc: "Our team will guide you through the admission process.",
                bn: "ভর্তি প্রক্রিয়ায় আমাদের সহায়তা নিন।"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm"
              >
                <span className="text-6xl font-black text-slate-100 block mb-6">{item.step}</span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm mb-4 leading-relaxed">{item.desc}</p>
                <p className="text-blue-600 font-medium text-sm">{item.bn}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-24 container mx-auto px-6 text-center">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
          <Globe className="absolute -top-10 -right-10 w-64 h-64 opacity-5" />
          <h2 className="text-3xl md:text-5xl font-black mb-8 relative z-10">
            Why Trust Us? <br /> <span className="text-blue-400 font-bold text-2xl">কেন আমাদের বেছে নেবেন?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="text-blue-400" size={32} />
              </div>
              <h4 className="font-bold text-xl">100% Secure</h4>
              <p className="text-slate-400 text-sm italic">আপনার তথ্য এবং পেমেন্ট আমাদের কাছে সম্পূর্ণ নিরাপদ।</p>
            </div>
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                <Users className="text-emerald-400" size={32} />
              </div>
              <h4 className="font-bold text-xl">Expert Team</h4>
              <p className="text-slate-400 text-sm italic">আমাদের দক্ষ টিম আপনাকে প্রতিটি ধাপে গাইড করবে।</p>
            </div>
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                <GraduationCap className="text-purple-400" size={32} />
              </div>
              <h4 className="font-bold text-xl">Success Stories</h4>
              <p className="text-slate-400 text-sm italic">হাজারো শিক্ষার্থী আমাদের মাধ্যমে সফল হয়েছে।</p>
            </div>
          </div>
          
          <motion.div className="mt-16 relative z-10">
            <Link href="/allschollerships">
              <button className="bg-white text-slate-900 px-10 py-4 rounded-full font-black flex items-center gap-2 mx-auto hover:bg-blue-400 hover:text-white transition-all shadow-xl shadow-blue-500/10">
                Explore Scholarships <ArrowRight size={20} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Developer Credit (Optional but good for portfolio) */}
      <footer className="py-12 text-center border-t border-slate-50">
        <p className="text-slate-400 text-sm font-medium uppercase tracking-[0.3em]">
          Designed & Developed by <span className="text-slate-900 font-black">Tanjil</span>
        </p>
      </footer>
    </div>
  );
}