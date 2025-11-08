"use client";

import React from 'react';
import { Hotel as HotelIcon, MapPin, Star } from 'lucide-react';
import { Hotel } from '@/types';
import Link from 'next/link';

const hotels: Hotel[] = [
  {
    id: 1,
    name: "Grand Hyatt Bali",
    location: "Nusa Dua, Bali",
    rating: 4.8,
    price: "Rp 1.500.000",
    amenities: ["Pool", "Spa", "Beach Access", "Restaurant"]
  },
  {
    id: 2,
    name: "Park Hyatt Tokyo",
    location: "Shinjuku, Tokyo",
    rating: 4.9,
    price: "¥45.000",
    amenities: ["Gym", "Bar", "City View", "Concierge"]
  },
  {
    id: 3,
    name: "Raffles Hotel Singapore",
    location: "Beach Road, Singapore",
    rating: 4.8,
    price: "S$650",
    amenities: ["Pool", "Spa", "Restaurant", "Bar"]
  },
  {
    id: 4,
    name: "The Peninsula Paris",
    location: "16th Arrondissement, Paris",
    rating: 4.9,
    price: "€800",
    amenities: ["Spa", "Restaurant", "Rooftop", "Concierge"]
  }
];

export default function HotelsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <HotelIcon className="w-16 h-16 mx-auto mb-4 text-emerald-600" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Hotel & Akomodasi</h1>
          <p className="text-xl text-gray-600">Temukan penginapan terbaik dengan harga terjangkau</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-12 border border-green-100">
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Destinasi"
              className="px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="date"
              className="px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="date"
              className="px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition">
              Cari Hotel
            </button>
          </div>
        </div>

        {/* Hotels List */}
        <div className="space-y-6">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition flex flex-col md:flex-row border border-green-100">
              <div className="md:w-1/3 h-64 md:h-auto bg-gradient-to-br from-emerald-400 to-teal-400"></div>
              <div className="flex-1 p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <MapPin className="w-5 h-5" />
                      {hotel.location}
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(hotel.rating)
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 font-semibold text-gray-900">{hotel.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Mulai dari</div>
                    <div className="text-3xl font-bold text-emerald-600">{hotel.price}</div>
                    <div className="text-sm text-gray-500">per malam</div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-sm font-semibold text-gray-700 mb-3">Fasilitas:</div>
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity, i) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link href={`/hotels/${hotel.id}`}>
                    <button className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition">
                      Lihat Detail
                    </button>
                  </Link>
                  <Link href={`/hotels/${hotel.id}`}>
                    <button className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition">
                      Pesan Sekarang
                    </button>
                  </Link>  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}