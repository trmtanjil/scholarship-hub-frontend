"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  { id: 1, name: "Tanjil Ahmed", role: "Student", comment: "The scholarship process was so smooth and easy!", rating: 5 },
  { id: 2, name: "Sakib Khan", role: "Applicant", comment: "Found my dream university through this platform.", rating: 4 },
  { id: 3, name: "Anika Tabassum", role: "Student", comment: "Highly recommended for all diploma students.", rating: 5 },
  { id: 4, name: "Rahat Karim", role: "Scholar", comment: "Best UI and user experience I've ever seen.", rating: 5 },
  { id: 5, name: "Nusrat Jahan", role: "Student", comment: "Got a full fund scholarship in China!", rating: 4 },
  { id: 6, name: "Zubair Islam", role: "Applicant", comment: "Very helpful support team and clear instructions.", rating: 5 },
  { id: 7, name: "Farhana Mili", role: "Student", comment: "The tracking system is very accurate.", rating: 5 },
  { id: 8, name: "Imran Hossain", role: "Student", comment: "Finally, a reliable scholarship portal for us.", rating: 4 },
  { id: 9, name: "Sadiya Afrin", role: "Scholar", comment: "Great platform to manage all my applications.", rating: 5 },
  { id: 10, name: "Mehedi Hasan", role: "Student", comment: "Easy to use and very fast response.", rating: 5 },
];

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
  <div className="min-w-[300px] bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mx-4">
    <Quote className="h-6 w-6 text-blue-500 mb-2 opacity-50" />
    <p className="text-slate-600 text-sm italic mb-4">{review.comment}</p>
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-bold text-slate-800 text-sm">{review.name}</h4>
        <p className="text-xs text-slate-400">{review.role}</p>
      </div>
      <div className="flex gap-1 text-yellow-500">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} size={12} fill="currentColor" />
        ))}
      </div>
    </div>
  </div>
);

export default function UserSay() {
  const row1 = reviews.slice(0, 5);
  const row2 = reviews.slice(5, 10);

  return (
    <div className="py-20 bg-slate-50 overflow-hidden space-y-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900">What Our Students Say</h2>
        <p className="text-slate-500 mt-2">Trusted by thousands of students worldwide</p>
      </div>

      {/* Line 1: Left to Right */}
      <div className="flex relative">
        <motion.div
          className="flex"
          animate={{ x: [0, -1500] }}
          transition={{
            x: { repeat: Infinity, duration: 30, ease: "linear" }
          }}
        >
          {[...row1, ...row1].map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </motion.div>
      </div>

      {/* Line 2: Right to Left */}
      <div className="flex relative">
        <motion.div
          className="flex"
          animate={{ x: [-1500, 0] }}
          transition={{
            x: { repeat: Infinity, duration: 30, ease: "linear" }
          }}
        >
          {[...row2, ...row2].map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </motion.div>
      </div>

      {/* Overlay to fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50"></div>
    </div>
  );
}