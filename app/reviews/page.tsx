"use client";

import React from 'react';
import { MessageCircle, Award, Heart, Users, Star, MapPin } from 'lucide-react';
import { Review } from '@/types';

const reviews: Review[] = [
  {
    id: 1,
    user: "Sarah Johnson",
    avatar: "SJ",
    rating: 5,
    destination: "Bali",
    comment: "AI itinerary sangat membantu! Semua rekomendasi tempat wisata sesuai dengan preferensi saya.",
    date: "2 minggu lalu",
    helpful: 45
  },
  {
    id: 2,
    user: "Michael Chen",
    avatar: "MC",
    rating: 5,
    destination: "Tokyo",
    comment: "Fitur integrasi transportasi membuat perjalanan sangat efisien. Highly recommended!",
    date: "1 bulan lalu",
    helpful: 67
  },
  {
    id: 3,
    user: "Amanda Putri",
    avatar: "AP",
    rating: 4,
    destination: "Yogyakarta",
    comment: "Rekomendasi kuliner lokalnya mantap! Menemukan warung tersembunyi yang enak banget.",
    date: "3 minggu lalu",
    helpful: 52
  },
  {
    id: 4,
    user: "David Lee",
    avatar: "DL",
    rating: 5,
    destination: "Paris",
    comment: "Platform yang luar biasa! AI-nya bisa menyesuaikan dengan budget dan preferensi saya.",
    date: "1 minggu lalu",
    helpful: 38
  },
  {
    id: 5,
    user: "Siti Nurhaliza",
    avatar: "SN",
    rating: 5,
    destination: "Singapore",
    comment: "Booking hotel dan transportasi jadi lebih mudah. Semua dalam satu aplikasi!",
    date: "2 minggu lalu",
    helpful: 29
  }
];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <MessageCircle className="w-16 h-16 mx-auto mb-4 text-emerald-600" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Review Pengguna</h1>
          <p className="text-xl text-gray-600">Pengalaman nyata dari para traveler</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl text-center shadow-lg border border-green-100">
            <div className="text-4xl font-bold text-emerald-600 mb-2">4.9</div>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
              ))}
            </div>
            <div className="text-gray-600">Rating Keseluruhan</div>
          </div>
          <div className="bg-white p-6 rounded-2xl text-center shadow-lg border border-green-100">
            <Award className="w-12 h-12 mx-auto text-emerald-600 mb-2" />
            <div className="text-2xl font-bold text-gray-900 mb-1">8,542</div>
            <div className="text-gray-600">Total Review</div>
          </div>
          <div className="bg-white p-6 rounded-2xl text-center shadow-lg border border-green-100">
            <Heart className="w-12 h-12 mx-auto text-teal-500 mb-2" />
            <div className="text-2xl font-bold text-gray-900 mb-1">96%</div>
            <div className="text-gray-600">Rekomendasi</div>
          </div>
          <div className="bg-white p-6 rounded-2xl text-center shadow-lg border border-green-100">
            <Users className="w-12 h-12 mx-auto text-green-600 mb-2" />
            <div className="text-2xl font-bold text-gray-900 mb-1">50K+</div>
            <div className="text-gray-600">Pengguna Aktif</div>
          </div>
        </div>

        {/* Reviews */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition border border-green-100">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {review.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{review.user}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {review.destination}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition">
                      <Heart className="w-5 h-5" />
                      <span className="font-semibold">{review.helpful}</span>
                    </button>
                    <button className="text-gray-600 hover:text-emerald-600 transition font-semibold">
                      Balas
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Write Review Button */}
        <div className="mt-12 text-center">
          <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition transform hover:scale-105">
            Tulis Review
          </button>
        </div>
      </div>
    </div>
  );
}