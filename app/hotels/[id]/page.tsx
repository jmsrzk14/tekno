"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, Star, ChevronLeft, Heart, Share2, Check, X,
  Wifi, Coffee, Dumbbell, Utensils, Car, Wind, Waves,
  Shield, Users, Calendar, Clock, Phone, Mail, ChevronRight,
  Award, TrendingUp, Camera, MessageCircle
} from 'lucide-react';

interface HotelDetailProps {
  params: {
    id: string;
  };
}

export default function HotelDetailPage({ params }: HotelDetailProps) {
  const [selectedRoom, setSelectedRoom] = useState<string>('deluxe');
  const [checkIn, setCheckIn] = useState('2024-12-15');
  const [checkOut, setCheckOut] = useState('2024-12-18');
  const [guests, setGuests] = useState(2);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Data dummy berdasarkan params.id
  const hotel = {
    id: params.id,
    name: "Grand Hyatt Bali",
    location: "Nusa Dua, Bali",
    fullAddress: "Kawasan Wisata Nusa Dua, BTDC Lot N5, Bali 80363",
    rating: 4.8,
    reviews: 1847,
    stars: 5,
    pricePerNight: 1500000,
    description: "Grand Hyatt Bali adalah resort bintang 5 yang terletak di jantung kawasan wisata Nusa Dua. Dengan akses langsung ke pantai berpasir putih, kolam renang yang luas, dan pemandangan laut yang menakjubkan, hotel ini menawarkan pengalaman menginap yang tak terlupakan dengan sentuhan kemewahan Bali yang autentik.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&auto=format&fit=crop"
    ],
    amenities: [
      { icon: Wifi, name: "Free WiFi", description: "High-speed internet" },
      { icon: Waves, name: "Swimming Pool", description: "3 outdoor pools" },
      { icon: Utensils, name: "Restaurant", description: "5 dining options" },
      { icon: Dumbbell, name: "Fitness Center", description: "24-hour gym" },
      { icon: Coffee, name: "Bar & Lounge", description: "3 bars" },
      { icon: Wind, name: "Spa", description: "Full-service spa" },
      { icon: Car, name: "Parking", description: "Free parking" },
      { icon: Shield, name: "Security", description: "24/7 security" }
    ],
    highlights: [
      "Direct beach access",
      "5 swimming pools",
      "Kids club & playground",
      "Ballroom & meeting rooms",
      "Water sports center",
      "Traditional Balinese spa"
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "12:00",
      cancellation: "Free cancellation up to 48 hours before check-in",
      pets: "Pets not allowed",
      smoking: "Non-smoking rooms available"
    }
  };

  const roomTypes = [
    {
      id: 'standard',
      name: 'Standard Room',
      size: '32 m²',
      capacity: 2,
      beds: '1 King Bed',
      price: 1200000,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&auto=format&fit=crop',
      features: ['City View', 'WiFi', 'TV', 'Mini Bar', 'Safe']
    },
    {
      id: 'deluxe',
      name: 'Deluxe Ocean View',
      size: '42 m²',
      capacity: 2,
      beds: '1 King or 2 Twin Beds',
      price: 1500000,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&auto=format&fit=crop',
      features: ['Ocean View', 'Balcony', 'WiFi', 'TV', 'Mini Bar', 'Safe', 'Bathtub'],
      popular: true
    },
    {
      id: 'suite',
      name: 'Grand Suite',
      size: '85 m²',
      capacity: 4,
      beds: '1 King Bed + Living Room',
      price: 3500000,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop',
      features: ['Ocean View', 'Large Balcony', 'WiFi', 'TV', 'Mini Bar', 'Safe', 'Jacuzzi', 'Living Room', 'Kitchenette']
    }
  ];

  const reviews = [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "SJ",
      rating: 5,
      date: "2 weeks ago",
      title: "Perfect Beach Resort!",
      comment: "Absolutely loved our stay! The beach access is amazing, staff are super friendly, and the rooms are spotless. The breakfast buffet has so many options. Highly recommend!",
      helpful: 45,
      verified: true
    },
    {
      id: 2,
      user: "Michael Chen",
      avatar: "MC",
      rating: 5,
      date: "1 month ago",
      title: "Best Hotel in Bali",
      comment: "Everything was perfect - from check-in to check-out. The pools are incredible, spa treatments are world-class. Great for families with kids!",
      helpful: 38,
      verified: true
    },
    {
      id: 3,
      user: "Amanda Putri",
      avatar: "AP",
      rating: 4,
      date: "3 weeks ago",
      title: "Great Stay with Minor Issues",
      comment: "Overall excellent hotel. Room was spacious and clean. Only issue was WiFi was a bit slow in our room. But everything else was fantastic!",
      helpful: 29,
      verified: true
    }
  ];

  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  const calculateTotal = () => {
    const room = roomTypes.find(r => r.id === selectedRoom);
    const nights = calculateNights();
    const roomTotal = (room?.price || 0) * nights;
    const tax = roomTotal * 0.11; // 11% tax
    const service = roomTotal * 0.1; // 10% service
    return {
      roomTotal,
      tax,
      service,
      total: roomTotal + tax + service
    };
  };

  const costs = calculateTotal();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-4">
        <Link 
          href="/hotels"
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Hotels
        </Link>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="relative">
          <div className="grid grid-cols-4 gap-2 rounded-3xl overflow-hidden">
            <div className="col-span-4 md:col-span-2 md:row-span-2 relative">
              <img
                src={hotel.images[activeImageIndex]}
                alt={hotel.name}
                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition"
                onClick={() => setActiveImageIndex(0)}
              />
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Camera className="w-4 h-4" />
                <span>{hotel.images.length} Photos</span>
              </div>
            </div>
            {hotel.images.slice(1, 5).map((image, index) => (
              <div key={index} className="col-span-2 md:col-span-1 h-48 md:h-auto">
                <img
                  src={image}
                  alt={`${hotel.name} ${index + 2}`}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition"
                  onClick={() => setActiveImageIndex(index + 1)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-green-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex">
                      {[...Array(hotel.stars)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Verified Property
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-3">{hotel.name}</h1>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="w-5 h-5" />
                    <span>{hotel.fullAddress}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-emerald-600 text-white px-3 py-1 rounded-lg font-bold">
                        {hotel.rating}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Excellent</div>
                        <div className="text-sm text-gray-600">{hotel.reviews} reviews</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition">
                    <Heart className="w-6 h-6 text-gray-600" />
                  </button>
                  <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition">
                    <Share2 className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-green-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Hotel</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{hotel.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {hotel.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3 bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-900 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-green-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities & Facilities</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {hotel.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-3 rounded-xl">
                      <amenity.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{amenity.name}</h3>
                      <p className="text-sm text-gray-600">{amenity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Types */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-green-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Room</h2>
              <div className="space-y-6">
                {roomTypes.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoom(room.id)}
                    className={`relative border-2 rounded-2xl overflow-hidden cursor-pointer transition ${
                      selectedRoom === room.id
                        ? 'border-emerald-600 shadow-lg'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    {room.popular && (
                      <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                        Most Popular
                      </div>
                    )}
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <span>📏 {room.size}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{room.capacity} guests</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>🛏️ {room.beds}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {room.features.map((feature, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-600">Price per night</div>
                            <div className="text-2xl font-bold text-emerald-600">
                              Rp {(room.price / 1000).toFixed(0)}k
                            </div>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedRoom === room.id
                              ? 'border-emerald-600 bg-emerald-600'
                              : 'border-gray-300'
                          }`}>
                            {selectedRoom === room.id && (
                              <Check className="w-4 h-4 text-white" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotel Policies */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-green-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Hotel Policies</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-gray-900">Check-in</span>
                  </div>
                  <p className="text-gray-700 ml-8">{hotel.policies.checkIn}</p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-gray-900">Check-out</span>
                  </div>
                  <p className="text-gray-700 ml-8">{hotel.policies.checkOut}</p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-gray-900">Cancellation</span>
                  </div>
                  <p className="text-gray-700 ml-8">{hotel.policies.cancellation}</p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <X className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-gray-900">Pets</span>
                  </div>
                  <p className="text-gray-700 ml-8">{hotel.policies.pets}</p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-green-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Guest Reviews</h2>
                <button className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-2">
                  View All
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Rating Summary */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200 mb-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-center md:text-left">
                    <div className="text-6xl font-bold text-emerald-600 mb-2">{hotel.rating}</div>
                    <div className="text-xl font-semibold text-gray-900 mb-2">Excellent</div>
                    <div className="text-gray-600">{hotel.reviews} verified reviews</div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: 'Cleanliness', value: 4.9 },
                      { label: 'Service', value: 4.8 },
                      { label: 'Location', value: 4.7 },
                      { label: 'Value', value: 4.6 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="w-24 text-sm text-gray-700">{item.label}</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-600"
                            style={{ width: `${(item.value / 5) * 100}%` }}
                          />
                        </div>
                        <span className="w-12 text-sm font-semibold text-gray-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {review.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-gray-900">{review.user}</h4>
                              {review.verified && (
                                <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                                  <Check className="w-3 h-3" />
                                  Verified
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-600">{review.date}</div>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'text-amber-500 fill-amber-500'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition text-sm">
                          <Heart className="w-4 h-4" />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-2xl border border-green-100 sticky top-24">
              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-1">Starting from</div>
                <div className="text-4xl font-bold text-emerald-600 mb-1">
                  Rp {(roomTypes.find(r => r.id === selectedRoom)?.price! / 1000).toFixed(0)}k
                </div>
                <div className="text-sm text-gray-600">per night</div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Check-in</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Check-out</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6 space-y-3">
                <div className="flex items-center justify-between text-gray-700">
                  <span>Rp {(roomTypes.find(r => r.id === selectedRoom)?.price! / 1000).toFixed(0)}k × {calculateNights()} nights</span>
                  <span>Rp {(costs.roomTotal / 1000).toFixed(0)}k</span>
                </div>
                <div className="flex items-center justify-between text-gray-700">
                  <span>Tax (11%)</span>
                  <span>Rp {(costs.tax / 1000).toFixed(0)}k</span>
                </div>
                <div className="flex items-center justify-between text-gray-700">
                  <span>Service (10%)</span>
                  <span>Rp {(costs.service / 1000).toFixed(0)}k</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex items-center justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-emerald-600">Rp {(costs.total / 1000).toFixed(0)}k</span>
                </div>
              </div>

              <Link href="/booking">
                <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition transform hover:scale-105 mb-3">
                  Book Now
                </button>
              </Link>
              
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Contact Hotel
              </button>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>Free cancellation</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>No prepayment needed</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>Best price guarantee</span>
                </div>
              </div>

              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-900 mb-2">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                  <span className="font-semibold">In High Demand!</span>
                </div>
                <p className="text-sm text-amber-800">
                  This hotel is booked 8 times in the last 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}