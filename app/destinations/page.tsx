"use client";

import React, { useState } from 'react';
import { Star, Clock } from 'lucide-react';
import { Destination } from '@/types';

const destinations: Destination[] = [
  {
    id: 1,
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop",
    rating: 4.8,
    reviews: 2453,
    price: "Rp 2.500.000",
    duration: "3-5 hari",
    description: "Pulau dewata dengan pantai eksotis dan budaya yang kaya"
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop",
    rating: 4.9,
    reviews: 3821,
    price: "Rp 8.500.000",
    duration: "5-7 hari",
    description: "Perpaduan sempurna antara tradisi dan modernitas"
  },
  {
    id: 3,
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop",
    rating: 4.7,
    reviews: 4192,
    price: "Rp 12.000.000",
    duration: "4-6 hari",
    description: "Kota cinta dengan arsitektur yang memukau"
  },
  {
    id: 4,
    name: "Yogyakarta, Indonesia",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop",
    rating: 4.6,
    reviews: 1876,
    price: "Rp 1.800.000",
    duration: "2-4 hari",
    description: "Kota budaya dengan candi bersejarah dan kuliner legendaris"
  },
  {
    id: 5,
    name: "Singapore",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop",
    rating: 4.8,
    reviews: 3245,
    price: "Rp 4.500.000",
    duration: "3-4 hari",
    description: "Kota modern dengan perpaduan budaya yang unik"
  },
  {
    id: 6,
    name: "Bangkok, Thailand",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&auto=format&fit=crop",
    rating: 4.7,
    reviews: 2987,
    price: "Rp 3.200.000",
    duration: "4-5 hari",
    description: "Kuil megah, street food legendaris, dan kehidupan malam"
  }
];

export default function DestinationsPage() {
  const [filter, setFilter] = useState<string>('all');

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Jelajahi Destinasi</h1>
          <p className="text-xl text-gray-600">Temukan tempat impian Anda dengan rekomendasi AI personal</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {['all', 'asia', 'europe', 'local', 'budget'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                filter === f
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-green-50 border border-green-200'
              }`}
            >
              {f === 'all' ? 'Semua' : f === 'asia' ? 'Asia' : f === 'europe' ? 'Eropa' : f === 'local' ? 'Lokal' : 'Budget Friendly'}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <div key={dest.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group border border-green-100">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{dest.name}</h3>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span className="text-white font-semibold">{dest.rating}</span>
                    <span className="text-gray-200 text-sm">({dest.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{dest.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Mulai dari</div>
                    <div className="text-2xl font-bold text-emerald-600">{dest.price}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Durasi</div>
                    <div className="font-semibold text-gray-900">{dest.duration}</div>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition">
                  Rencanakan Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}