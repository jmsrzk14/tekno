"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Star, Search, Clock, TrendingUp, Leaf, Mountain, Trees } from 'lucide-react';
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
  }
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600 via-teal-700 to-green-800 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <div className="flex justify-center mb-6">
            <Leaf className="w-16 h-16 text-green-300 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Jelajahi Keindahan <br />Alam dengan <span className="text-green-300">AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto">
            Itinerary otomatis, rekomendasi personal, dan petualangan alam yang tak terlupakan
          </p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto bg-white rounded-full p-2 shadow-2xl flex items-center">
            <input
              type="text"
              placeholder="Mau kemana hari ini?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-6 py-4 rounded-full focus:outline-none text-gray-800 text-lg"
            />
            <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition flex items-center gap-2">
              <Search className="w-5 h-5" />
              Cari Destinasi
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-gray-200">Destinasi</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-gray-200">Pengguna</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">4.9★</div>
              <div className="text-gray-200">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fitur Unggulan</h2>
            <p className="text-xl text-gray-600">Teknologi AI untuk pengalaman perjalanan terbaik</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-8 rounded-2xl hover:shadow-xl transition transform hover:-translate-y-2 border border-emerald-200">
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Mountain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Itinerary</h3>
              <p className="text-gray-600 leading-relaxed">
                Rencana perjalanan otomatis yang disesuaikan dengan preferensi, budget, dan waktu Anda
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-emerald-100 p-8 rounded-2xl hover:shadow-xl transition transform hover:-translate-y-2 border border-teal-200">
              <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Trees className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pencarian Personal</h3>
              <p className="text-gray-600 leading-relaxed">
                Rekomendasi destinasi yang dipersonalisasi berdasarkan minat dan riwayat perjalanan Anda
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-100 p-8 rounded-2xl hover:shadow-xl transition transform hover:-translate-y-2 border border-green-200">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Integrasi Lengkap</h3>
              <p className="text-gray-600 leading-relaxed">
                Booking hotel, transportasi, dan aktivitas dalam satu platform yang terintegrasi
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Destinasi Popular</h2>
              <p className="text-gray-600">Pilihan favorit traveler di seluruh dunia</p>
            </div>
            <Link href="/destinations" className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-2">
              Lihat Semua
              <TrendingUp className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <div key={dest.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border border-green-100">
                <div className="relative h-48 overflow-hidden">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover hover:scale-110 transition duration-500" />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-semibold text-sm">{dest.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{dest.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{dest.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-emerald-600 font-bold text-lg">{dest.price}</span>
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {dest.duration}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    {dest.reviews.toLocaleString()} reviews
                  </div>
                  <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition">
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 w-10 h-10 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">TravelAI</span>
              </div>
              <p className="text-gray-300">
                Platform perjalanan berbasis AI untuk pengalaman wisata yang tak terlupakan
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Fitur</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-white cursor-pointer transition">AI Itinerary</li>
                <li className="hover:text-white cursor-pointer transition">Pencarian Personal</li>
                <li className="hover:text-white cursor-pointer transition">Booking Hotel</li>
                <li className="hover:text-white cursor-pointer transition">Transportasi</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Perusahaan</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-white cursor-pointer transition">Tentang Kami</li>
                <li className="hover:text-white cursor-pointer transition">Karir</li>
                <li className="hover:text-white cursor-pointer transition">Blog</li>
                <li className="hover:text-white cursor-pointer transition">Kontak</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Dukungan</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-white cursor-pointer transition">FAQ</li>
                <li className="hover:text-white cursor-pointer transition">Kebijakan Privasi</li>
                <li className="hover:text-white cursor-pointer transition">Syarat & Ketentuan</li>
                <li className="hover:text-white cursor-pointer transition">Hubungi Kami</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-emerald-800 pt-8 text-center text-gray-300">
            <p>&copy; 2024 TravelAI. All rights reserved. Made with 🌿 for nature lovers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}