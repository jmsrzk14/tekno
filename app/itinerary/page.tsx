"use client";

import React from 'react';
import { MapPin, Users, Star, Mountain } from 'lucide-react';
import { Itinerary } from '@/types';

const itineraries: Itinerary[] = [
  {
    id: 1,
    title: "Petualangan Bali 5 Hari",
    destination: "Bali",
    days: 5,
    activities: 15,
    rating: 4.9,
    users: 1243,
    highlights: ["Pantai Kuta", "Pura Tanah Lot", "Ubud Monkey Forest", "Sunset Uluwatu"]
  },
  {
    id: 2,
    title: "Tokyo Modern Heritage",
    destination: "Tokyo",
    days: 7,
    activities: 22,
    rating: 4.8,
    users: 2156,
    highlights: ["Shibuya Crossing", "Tokyo Tower", "Sensoji Temple", "Mount Fuji"]
  },
  {
    id: 3,
    title: "Paris Romantic Gateway",
    destination: "Paris",
    days: 6,
    activities: 18,
    rating: 4.9,
    users: 1892,
    highlights: ["Eiffel Tower", "Louvre Museum", "Notre Dame", "Champs-Élysées"]
  }
];

export default function ItineraryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Itinerary Otomatis AI</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Biarkan AI kami merencanakan perjalanan sempurna untuk Anda berdasarkan preferensi dan budget
          </p>
        </div>

        {/* Create New Itinerary Card */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-12 mb-12 text-white shadow-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <Mountain className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Buat Itinerary Baru</h2>
            <p className="text-lg mb-8 opacity-90">
              Jawab beberapa pertanyaan dan AI akan membuat rencana perjalanan yang sempurna untuk Anda
            </p>
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition transform hover:scale-105">
              Mulai Sekarang
            </button>
          </div>
        </div>

        {/* Saved Itineraries */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Itinerary Populer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {itineraries.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition border border-green-100">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <MapPin className="w-4 h-4" />
                    {item.destination}
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">{item.days}</div>
                      <div className="text-sm text-gray-600">Hari</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">{item.activities}</div>
                      <div className="text-sm text-gray-600">Aktivitas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600 flex items-center justify-center gap-1">
                        {item.rating}
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      </div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-semibold text-gray-700 mb-3">Highlights:</div>
                    <div className="flex flex-wrap gap-2">
                      {item.highlights.slice(0, 3).map((h, i) => (
                        <span key={i} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      {item.users.toLocaleString()} pengguna
                    </div>
                  </div>

                  <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition">
                    Gunakan Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}