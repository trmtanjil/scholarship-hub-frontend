"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, CreditCard, GraduationCap, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Find Your Scholarship",
    description: "Browse through our massive database of global scholarships tailored to your background.",
    icon: <Search className="w-8 h-8" />,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Create An Account",
    description: "Sign up and build your professional profile to get personalized recommendations.",
    icon: <UserPlus className="w-8 h-8" />,
    color: "bg-purple-500",
  },
  {
    id: 3,
    title: "Pay Application Fee",
    description: "Securely pay the processing fee via Stripe to verify your serious intent.",
    icon: <CreditCard className="w-8 h-8" />,
    color: "bg-pink-500",
  },
  {
    id: 4,
    title: "Get Enrolled",
    description: "Submit your documents and wait for the university's confirmation letter.",
    icon: <GraduationCap className="w-8 h-8" />,
    color: "bg-green-500",
  },
];

export default function HowItWork() {
  return (
    <section className=" bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-4"
          >
             {/* Your Logo Representation */}
            <div className="flex items-center gap-2 bg-blue-50 px-4  rounded-full">
              <GraduationCap className="text-blue-600 w-6 h-6" />
              <span className="font-bold text-blue-900 tracking-tight">ScholarshipHub Process</span>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4"
          >
            How It <span className="text-blue-600">Works?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500 max-w-2xl mx-auto"
          >
            Four simple steps to secure your future. We guide you from discovery to enrollment.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Background Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute   left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group flex flex-col items-center text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50"
              >
                {/* Icon Circle */}
                <div className={`relative mb-6 p-5 rounded-2xl ${step.color} text-white shadow-lg group-hover:rotate-6 transition-transform duration-300`}>
                  {step.icon}
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
                    {step.id}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow for small screens (Vertical) */}
                {index !== steps.length - 1 && (
                  <div className="mt-6 lg:hidden text-slate-300">
                    <ArrowRight className="rotate-90 w-6 h-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA Animation */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 text-center"
        >
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 pb-4 rounded-full font-bold shadow-lg shadow-blue-200 transition-all flex items-center gap-2 mx-auto group">
            Start Your Journey Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}