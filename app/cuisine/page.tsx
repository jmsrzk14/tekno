"use client";

import React from 'react';
import { Utensils, MapPin, Star } from 'lucide-react';
import { Cuisine } from '@/types';

const cuisines: Cuisine[] = [
  {
    id: 1,
    name: "Nasi Goreng Kambing",
    location: "Yogyakarta",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&auto=format&fit=crop",
    rating: 4.7,
    price: "Rp 25.000",
    category: "Lokal"
  },
  {
    id: 2,
    name: "Sushi Omakase",
    location: "Tokyo",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&auto=format&fit=crop",
    rating: 4.9,
    price: "¥8.000",
    category: "Premium"
  },
  {
    id: 3,
    name: "Croissant & Coffee",
    location: "Paris",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&auto=format&fit=crop",
    rating: 4.8,
    price: "€12",
    category: "Breakfast"
  },
  {
    id: 4,
    name: "Babi Guling",
    location: "Bali",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&auto=format&fit=crop",
    rating: 4.6,
    price: "Rp 35.000",
    category: "Lokal"
  },
  {
    id: 5,
    name: "Pad Thai",
    location: "Bangkok",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&auto=format&fit=crop",
    rating: 4.7,
    price: "฿120",
    category: "Street Food"
  },
  {
    id: 6,
    name: "Laksa",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&auto=format&fit=crop",
    rating: 4.8,
    price: "S$8",
    category: "Lokal"
  },
  {
    id: 7,
    name: "Rendang",
    location: "Padang",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&auto=format&fit=crop",
    rating: 4.9,
    price: "Rp 30.000",
    category: "Lokal"
  },
  {
    id: 8,
    name: "Ramen",
    location: "Tokyo",
    image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400&auto=format&fit=crop",
    rating: 4.8,
    price: "¥1.200",
    category: "Comfort Food"
  }
];

export default function CuisinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Utensils className="w-16 h-16 mx-auto mb-4 text-emerald-600" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Kuliner Lokal</h1>
          <p className="text-xl text-gray-600">Jelajahi cita rasa autentik dari berbagai destinasi</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cuisines.map((food) => (
            <div key={food.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group border border-green-100">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-emerald-600">{food.category}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{food.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  {food.location}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-semibold">{food.rating}</span>
                  </div>
                  <div className="text-emerald-600 font-bold">{food.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}