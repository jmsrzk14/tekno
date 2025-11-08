"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, Star, Clock, Users, Calendar, Heart, Share2, 
  ChevronLeft, Check, MessageCircle, Camera, Utensils,
  Hotel, Plane, TrendingUp, Award, Navigation
} from 'lucide-react';

interface DestinationDetailProps {
  params: {
    id: string;
  };
}

export default function DestinationDetailPage({ params }: DestinationDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'reviews' | 'tips'>('overview');
  const [selectedPackage, setSelectedPackage] = useState('standard');

  // Dalam aplikasi nyata, data ini akan di-fetch dari API berdasarkan params.id
  const destination = {
    id: params.id,
    name: "Bali, Indonesia",
    shortDesc: "Pulau Dewata - Surga Tropis dengan Budaya yang Kaya",
    description: "Bali adalah destinasi impian dengan kombinasi sempurna antara pantai eksotis, budaya yang kaya, pemandangan sawah yang menakjubkan, dan keramahan penduduk lokal. Pulau ini menawarkan pengalaman yang tak terlupakan untuk setiap jenis traveler.",
    location: "Bali, Indonesia",
    rating: 4.8,
    reviews: 2453,
    basePrice: 2500000,
    duration: "3-5 hari",
    category: "Beach & Culture",
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&auto=format&fit=crop"
    ],
    highlights: [
      "Pantai Kuta & Seminyak",
      "Pura Tanah Lot & Uluwatu",
      "Tegallalang Rice Terrace",
      "Ubud Monkey Forest",
      "Sunset di Pantai Jimbaran",
      "Water Temple Tirta Empul"
    ],
    included: [
      "Akomodasi hotel bintang 4",
      "Sarapan setiap hari",
      "Tour guide lokal berpengalaman",
      "Transportasi selama tour",
      "Tiket masuk objek wisata",
      "Asuransi perjalanan"
    ],
    notIncluded: [
      "Tiket pesawat",
      "Makan siang & malam",
      "Pengeluaran pribadi",
      "Tips guide & driver"
    ],
    bestTime: "April - Oktober (Musim Kemarau)",
    weather: "Tropis, 25-32°C",
    language: "Bahasa Indonesia, Bahasa Bali, English"
  };

  const packages = [
    {
      id: 'budget',
      name: 'Budget Package',
      price: 1800000,
      duration: '3D2N',
      features: [
        'Hotel bintang 3',
        'Breakfast included',
        'Shared tour',
        '3 destinasi utama',
        'Tour guide'
      ]
    },
    {
      id: 'standard',
      name: 'Standard Package',
      price: 2500000,
      duration: '4D3N',
      features: [
        'Hotel bintang 4',
        'Breakfast included',
        'Private tour option',
        '5 destinasi utama',
        'Professional tour guide',
        'Airport transfer'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium Package',
      price: 4500000,
      duration: '5D4N',
      features: [
        'Hotel bintang 5',
        'All meals included',
        'Private tour',
        '8 destinasi premium',
        'Expert tour guide',
        'Airport transfer',
        'Spa session',
        'Sunset dinner'
      ]
    }
  ];

  const itinerarySample = [
    {
      day: 1,
      title: "Arrival & South Bali Exploration",
      activities: [
        { time: "10:00", activity: "Arrival at Ngurah Rai Airport", icon: Plane },
        { time: "12:00", activity: "Check-in at hotel", icon: Hotel },
        { time: "15:00", activity: "Visit Uluwatu Temple", icon: MapPin },
        { time: "18:00", activity: "Kecak Dance & Sunset", icon: Camera },
        { time: "20:00", activity: "Seafood dinner at Jimbaran", icon: Utensils }
      ]
    },
    {
      day: 2,
      title: "Ubud Cultural Experience",
      activities: [
        { time: "08:00", activity: "Breakfast at hotel", icon: Utensils },
        { time: "09:00", activity: "Tegallalang Rice Terrace", icon: Camera },
        { time: "11:00", activity: "Coffee plantation tour", icon: MapPin },
        { time: "13:00", activity: "Lunch with rice field view", icon: Utensils },
        { time: "15:00", activity: "Ubud Monkey Forest", icon: MapPin },
        { time: "17:00", activity: "Traditional market shopping", icon: MapPin }
      ]
    },
    {
      day: 3,
      title: "Water Temple & Beach Relaxation",
      activities: [
        { time: "07:00", activity: "Tirta Empul Water Temple", icon: MapPin },
        { time: "10:00", activity: "Breakfast at local warung", icon: Utensils },
        { time: "12:00", activity: "Seminyak Beach relaxation", icon: Camera },
        { time: "15:00", activity: "Beach club experience", icon: MapPin },
        { time: "18:00", activity: "Sunset at Tanah Lot", icon: Camera }
      ]
    }
  ];

  const reviewsData = [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "SJ",
      rating: 5,
      date: "2 weeks ago",
      comment: "Pengalaman yang luar biasa! Tour guide sangat ramah dan profesional. Bali benar-benar surga di dunia!",
      helpful: 45,
      images: 3
    },
    {
      id: 2,
      user: "Michael Chen",
      avatar: "MC",
      rating: 5,
      date: "1 month ago",
      comment: "Itinerary sangat well-planned. Tidak terlalu padat tapi bisa mengunjungi banyak tempat menarik. Highly recommended!",
      helpful: 38,
      images: 5
    },
    {
      id: 3,
      user: "Amanda Putri",
      avatar: "AP",
      rating: 4,
      date: "3 weeks ago",
      comment: "Overall bagus! Hotel nyaman, tour guide informatif. Cuma waktu di beberapa tempat agak terburu-buru.",
      helpful: 29,
      images: 2
    }
  ];

  const travelTips = [
    {
      category: "Best Time to Visit",
      tips: [
        "April - Oktober adalah musim kemarau, ideal untuk aktivitas outdoor",
        "Hindari peak season (Juli-Agustus) jika ingin menghindari keramaian",
        "Nyepi (Hari Raya Nyepi) biasanya Maret, seluruh aktivitas berhenti 24 jam"
      ]
    },
    {
      category: "What to Pack",
      tips: [
        "Pakaian ringan dan breathable (cuaca tropis)",
        "Sunscreen SPF 50+ (matahari Bali sangat terik)",
        "Sarung atau selendang untuk mengunjungi pura",
        "Alas kaki nyaman untuk berjalan"
      ]
    },
    {
      category: "Money & Budget",
      tips: [
        "Tukar uang di money changer resmi untuk rate terbaik",
        "Siapkan cash, tidak semua tempat terima kartu",
        "Budget makan Rp 50k-150k per orang per kali makan",
        "Tawar-menawar adalah hal biasa di pasar tradisional"
      ]
    },
    {
      category: "Safety & Health",
      tips: [
        "Pakai sunscreen dan topi saat outdoor activities",
        "Minum air mineral kemasan, hindari air keran",
        "Hati-hati dengan monyet di Ubud, jaga barang berharga",
        "Simpan photocopy paspor terpisah dari aslinya"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-4 mt-[-10vh]">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Destinations
        </Link>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="grid grid-cols-4 gap-4 rounded-3xl overflow-hidden">
          <div className="col-span-4 md:col-span-2 md:row-span-2">
            <img
              src={destination.images[0]}
              alt={destination.name}
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>
          {destination.images.slice(1, 4).map((image, index) => (
            <div key={index} className="col-span-2 md:col-span-1">
              <img
                src={image}
                alt={`${destination.name} ${index + 2}`}
                className="w-full h-48 md:h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
          ))}
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
                    <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-semibold">
                      {destination.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-gray-900">{destination.rating}</span>
                      <span className="text-gray-600">({destination.reviews} reviews)</span>
                    </div>
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-3">{destination.name}</h1>
                  <p className="text-xl text-gray-600 mb-4">{destination.shortDesc}</p>
                  <div className="flex items-center gap-6 text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>{destination.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{destination.duration}</span>
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

            {/* Tabs */}
            <div className="bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden">
              <div className="flex border-b border-gray-200">
                {[
                  { key: 'overview', label: 'Overview' },
                  { key: 'itinerary', label: 'Itinerary' },
                  { key: 'reviews', label: 'Reviews' },
                  { key: 'tips', label: 'Travel Tips' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex-1 py-4 font-semibold transition ${
                      activeTab === tab.key
                        ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Tentang Destinasi</h3>
                      <p className="text-gray-700 leading-relaxed">{destination.description}</p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Highlights</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {destination.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-3 bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                            <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                            <span className="text-gray-900 font-medium">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Yang Termasuk</h3>
                        <ul className="space-y-3">
                          {destination.included.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Tidak Termasuk</h3>
                        <ul className="space-y-3">
                          {destination.notIncluded.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 border border-emerald-200">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Info Penting</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Best Time</div>
                          <div className="font-semibold text-gray-900">{destination.bestTime}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Weather</div>
                          <div className="font-semibold text-gray-900">{destination.weather}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">Language</div>
                          <div className="font-semibold text-gray-900">{destination.language}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Itinerary Tab */}
                {activeTab === 'itinerary' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Navigation className="w-6 h-6 text-emerald-600" />
                      <h3 className="text-2xl font-bold text-gray-900">Sample Itinerary</h3>
                    </div>

                    {itinerarySample.map((day) => (
                      <div key={day.day} className="border-l-4 border-emerald-600 pl-6 pb-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                            {day.day}
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Day {day.day}</div>
                            <h4 className="text-xl font-bold text-gray-900">{day.title}</h4>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {day.activities.map((activity, index) => (
                            <div key={index} className="flex items-start gap-4 bg-gray-50 p-4 rounded-xl">
                              <div className="text-emerald-600 font-semibold min-w-[60px]">
                                {activity.time}
                              </div>
                              <div className="flex items-center gap-3 flex-1">
                                <activity.icon className="w-5 h-5 text-gray-600" />
                                <span className="text-gray-900">{activity.activity}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mt-8">
                      <p className="text-emerald-900">
                        <span className="font-semibold">Note:</span> This is a sample itinerary. The actual schedule may vary based on your chosen package and weather conditions.
                      </p>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>
                      <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition">
                        Write Review
                      </button>
                    </div>

                    {/* Rating Summary */}
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-200">
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <div className="text-6xl font-bold text-emerald-600 mb-2">{destination.rating}</div>
                          <div className="flex gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-6 h-6 text-amber-500 fill-amber-500" />
                            ))}
                          </div>
                          <div className="text-gray-600">{destination.reviews} reviews</div>
                        </div>

                        <div className="flex-1">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="flex items-center gap-3 mb-2">
                              <span className="w-12 text-sm text-gray-600">{star} star</span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-amber-500"
                                  style={{ width: `${star === 5 ? 75 : star === 4 ? 20 : 5}%` }}
                                />
                              </div>
                              <span className="w-12 text-sm text-gray-600 text-right">
                                {star === 5 ? '75%' : star === 4 ? '20%' : '5%'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                      {reviewsData.map((review) => (
                        <div key={review.id} className="bg-white border border-gray-200 rounded-2xl p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                              {review.avatar}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h4 className="font-bold text-gray-900">{review.user}</h4>
                                  <div className="flex items-center gap-3 text-sm text-gray-600">
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
                                    <span>{review.date}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-700 mb-4">{review.comment}</p>
                              <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition">
                                  <Heart className="w-5 h-5" />
                                  <span className="font-semibold">{review.helpful}</span>
                                </button>
                                {review.images > 0 && (
                                  <div className="flex items-center gap-2 text-gray-600">
                                    <Camera className="w-5 h-5" />
                                    <span>{review.images} photos</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tips Tab */}
                {activeTab === 'tips' && (
                  <div className="space-y-8">
                    {travelTips.map((section, index) => (
                      <div key={index}>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{section.category}</h3>
                        <div className="space-y-3">
                          {section.tips.map((tip, tipIndex) => (
                            <div key={tipIndex} className="flex items-start gap-3 bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                              <TrendingUp className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <p className="text-gray-700">{tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-2xl border border-green-100 sticky top-24">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Pilih Paket</h3>

              <div className="space-y-4 mb-6">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`relative p-5 rounded-2xl border-2 cursor-pointer transition ${
                      selectedPackage === pkg.id
                        ? 'border-emerald-600 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Most Popular
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900">{pkg.name}</h4>
                        <p className="text-sm text-gray-600">{pkg.duration}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-600">
                          Rp {(pkg.price / 1000).toFixed(0)}k
                        </div>
                        <div className="text-xs text-gray-500">per person</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {pkg.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <Check className="w-4 h-4 text-emerald-600" />
                          {feature}
                        </div>
                      ))}
                      {pkg.features.length > 3 && (
                        <div className="text-sm text-emerald-600 font-semibold">
                          +{pkg.features.length - 3} more features
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Keberangkatan</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Jumlah Orang</label>
                  <select className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:outline-none focus:border-emerald-500">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    Rp {packages.find(p => p.id === selectedPackage)?.price.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Tax & Service</span>
                  <span className="font-semibold text-gray-900">Rp 250.000</span>
                </div>
                <div className="flex items-center justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-emerald-600">
                    Rp {((packages.find(p => p.id === selectedPackage)?.price || 0) + 250000).toLocaleString()}
                  </span>
                </div>
              </div>

              <Link href="/booking">
                <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition transform hover:scale-105 mb-3">
                  Book Now
                </button>
              </Link>
              
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Chat with Expert
              </button>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>Free cancellation up to 7 days</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>Best price guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>24/7 customer support</span>
                </div>
              </div>

              <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <div className="flex items-center gap-2 text-emerald-900 mb-2">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold">Special Offer!</span>
                </div>
                <p className="text-sm text-emerald-800">
                  Book now and get 10% cashback for your next trip!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Destinations */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Similar Destinations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                id: 2,
                name: "Lombok, Indonesia",
                image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=600&auto=format&fit=crop",
                price: "Rp 2.200.000",
                rating: 4.7
              },
              {
                id: 3,
                name: "Komodo Island",
                image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop",
                price: "Rp 3.500.000",
                rating: 4.9
              },
              {
                id: 4,
                name: "Raja Ampat",
                image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&auto=format&fit=crop",
                price: "Rp 8.500.000",
                rating: 4.9
              }
            ].map((dest) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border border-green-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-semibold text-sm">{dest.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{dest.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-600 font-bold text-lg">{dest.price}</span>
                    <button className="text-emerald-600 font-semibold hover:text-emerald-700">
                      View Details →
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}