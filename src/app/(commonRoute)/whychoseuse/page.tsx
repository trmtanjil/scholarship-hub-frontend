"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Globe2, Banknote } from 'lucide-react';

const stats = [
  { id: 1, label: "Success Students", value: "5K+", icon: <Users className="w-8 h-8" />, color: "text-blue-600" },
  { id: 2, label: "Scholarships", value: "1.2K+", icon: <GraduationCap className="w-8 h-8" />, color: "text-emerald-600" },
  { id: 3, label: "Countries", value: "50+", icon: <Globe2 className="w-8 h-8" />, color: "text-orange-600" },
  { id: 4, label: "Total Funding", value: "$2M+", icon: <Banknote className="w-8 h-8" />, color: "text-purple-600" },
];

export default function StatsSection() {
  return (
    <section className="  bg-white border-y border-slate-100">
      <div className="container mx-auto px-4">
        
        {/* Headline Section */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            Our Impact in Global Education
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-slate-500 text-lg"
          >
            We take pride in helping students reach their full potential. Here is a quick look at our journey and the lives we`ve touched so far.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 group"
            >
              <div className={`mb-4 p-4 rounded-2xl bg-slate-50 group-hover:bg-white group-hover:shadow-xl group-hover:shadow-slate-200 transition-all duration-300 ${stat.color}`}>
                {stat.icon}
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-slate-500 font-medium uppercase tracking-wider text-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}