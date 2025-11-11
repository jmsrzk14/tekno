"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MapPin, Star, Users, Calendar, DollarSign, Hotel, Car, Plane, Clock, Utensils,
  Camera, Mountain, ChevronDown, ChevronUp, Check, ArrowRight
} from "lucide-react";

export default function ItineraryDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dayFromUrl = parseInt(searchParams.get("day") || "1");
  const [expandedDay, setExpandedDay] = useState(dayFromUrl);

  const handleToggleDay = (day: number) => {
    const newDay = expandedDay === day ? 0 : day;
    setExpandedDay(newDay);
    router.push(`?day=${newDay}`, { scroll: false });
  };

  const itinerary = {
    id: 1,
    title: "Paket Danau Toba 3 Hari - Standar",
    destination: "Danau Toba, Sumatera Utara",
    days: 3,
    people: 2,
    totalBudget: 1500000,
    budgetLevel: "Standar",
    rating: 4.9,
    reviews: 156,
    hotel: {
      name: "Toledo Inn",
      type: "Mid-range Hotel",
      rating: 4.5,
      address: "Jl. Sisingamangaraja, Parapat",
      facilities: ["Free WiFi", "AC", "Hot Water", "Restaurant", "Lake View"],
      price: 450000,
      image: "🏨"
    },
    transport: {
      type: "Private Car",
      model: "Toyota Avanza",
      capacity: "6 orang",
      driver: "Termasuk driver",
      ac: true,
      price: 600000,
      image: "🚗"
    },
    includes: [
      "Hotel 2 malam (Toledo Inn)",
      "Private car + driver 3 hari",
      "Makan 3x sehari",
      "Tiket masuk semua destinasi",
      "Guide lokal profesional",
      "Asuransi perjalanan",
      "Air mineral selama tour"
    ],
    excludes: [
      "Tiket pesawat/kereta",
      "Pengeluaran pribadi",
      "Tip driver & guide",
      "Aktivitas tambahan di luar paket"
    ]
  };

  const dailySchedule = [
    {
      day: 1,
      title: "Kedatangan & Eksplorasi Parapat",
      activities: [
        {
          time: "08:00",
          title: "Tiba di Bandara Silangit",
          description: "Penjemputan oleh driver dengan private car",
          icon: "plane",
          type: "transport",
          duration: "30 menit"
        },
        {
          time: "08:30",
          title: "Perjalanan ke Parapat",
          description: "Perjalanan sekitar 4 jam dengan pemandangan pegunungan",
          icon: "car",
          type: "transport",
          duration: "4 jam"
        },
        {
          time: "12:30",
          title: "Makan Siang di RM Sinar Pagi",
          description: "Nikmati masakan khas Batak: Arsik, Saksang, Naniura",
          icon: "utensils",
          type: "meal",
          duration: "1 jam",
          price: 50000
        },
        {
          time: "13:30",
          title: "Check-in Hotel Toledo Inn",
          description: "Istirahat sejenak dan persiapan untuk aktivitas sore",
          icon: "hotel",
          type: "accommodation",
          duration: "30 menit"
        },
        {
          time: "14:30",
          title: "Kunjungi Air Terjun Sipiso-piso",
          description: "Air terjun setinggi 120 meter dengan pemandangan Danau Toba yang spektakuler",
          icon: "camera",
          type: "activity",
          duration: "2 jam",
          price: 10000
        },
        {
          time: "17:00",
          title: "Sunset di Bukit Holbung",
          description: "Spot foto terbaik untuk melihat Danau Toba dari ketinggian",
          icon: "mountain",
          type: "activity",
          duration: "2 jam",
          price: 25000
        },
        {
          time: "19:00",
          title: "Makan Malam di Hotel",
          description: "Menu set dinner dengan pemandangan danau",
          icon: "utensils",
          type: "meal",
          duration: "1 jam",
          price: 75000
        },
        {
          time: "20:00",
          title: "Istirahat di Hotel",
          description: "Free time untuk istirahat atau jalan-jalan di sekitar hotel",
          icon: "hotel",
          type: "accommodation",
          duration: "-"
        }
      ]
    },
    {
      day: 2,
      title: "Petualangan Pulau Samosir",
      activities: [
        {
          time: "07:00",
          title: "Sarapan di Hotel",
          description: "Buffet breakfast dengan menu lokal dan internasional",
          icon: "utensils",
          type: "meal",
          duration: "1 jam"
        },
        {
          time: "08:30",
          title: "Perjalanan ke Pelabuhan Ajibata",
          description: "Persiapan menyeberang ke Pulau Samosir",
          icon: "car",
          type: "transport",
          duration: "30 menit"
        },
        {
          time: "09:00",
          title: "Ferry ke Pulau Samosir",
          description: "Nikmati pemandangan Danau Toba dari atas ferry",
          icon: "car",
          type: "transport",
          duration: "45 menit",
          price: 50000
        },
        {
          time: "10:00",
          title: "Kunjungi Desa Tomok",
          description: "Jelajahi makam Raja Sidabutar dan belanja souvenir Ulos",
          icon: "camera",
          type: "activity",
          duration: "2 jam",
          price: 10000
        },
        {
          time: "12:00",
          title: "Makan Siang di Bagus Bay Resto",
          description: "Seafood segar dengan view danau yang menakjubkan",
          icon: "utensils",
          type: "meal",
          duration: "1.5 jam",
          price: 100000
        },
        {
          time: "14:00",
          title: "Museum Batak & Desa Huta Bolon",
          description: "Pelajari sejarah dan budaya suku Batak Toba",
          icon: "camera",
          type: "activity",
          duration: "2 jam",
          price: 20000
        },
        {
          time: "16:00",
          title: "Pantai Bebas Parapat",
          description: "Bersantai di pantai dan berenang di Danau Toba",
          icon: "camera",
          type: "activity",
          duration: "2 jam",
          price: 10000
        },
        {
          time: "18:00",
          title: "Ferry Kembali ke Parapat",
          description: "Menyeberang kembali ke daratan utama",
          icon: "car",
          type: "transport",
          duration: "45 menit",
          price: 50000
        },
        {
          time: "19:00",
          title: "Makan Malam di Warung Ikan Mas Harobean",
          description: "Ikan mas bakar segar langsung dari Danau Toba",
          icon: "utensils",
          type: "meal",
          duration: "1 jam",
          price: 75000
        },
        {
          time: "20:30",
          title: "Kembali ke Hotel & Istirahat",
          description: "Free time untuk bersantai",
          icon: "hotel",
          type: "accommodation",
          duration: "-"
        }
      ]
    },
    {
      day: 3,
      title: "Wisata Alam & Kepulangan",
      activities: [
        {
          time: "06:30",
          title: "Sunrise di Bukit Siadtaratas",
          description: "Nikmati sunrise terbaik di Danau Toba",
          icon: "mountain",
          type: "activity",
          duration: "2 jam",
          price: 20000
        },
        {
          time: "08:30",
          title: "Sarapan & Check-out Hotel",
          description: "Persiapan check-out dan melanjutkan perjalanan",
          icon: "hotel",
          type: "accommodation",
          duration: "1 jam"
        },
        {
          time: "10:00",
          title: "Kunjungi Pantai Pasir Putih Parbaba",
          description: "Pantai cantik dengan pasir putih yang bersih",
          icon: "camera",
          type: "activity",
          duration: "2 jam",
          price: 15000
        },
        {
          time: "12:00",
          title: "Makan Siang di RM Sederhana",
          description: "Menu Padang untuk penutup kuliner tour",
          icon: "utensils",
          type: "meal",
          duration: "1 jam",
          price: 40000
        },
        {
          time: "13:30",
          title: "Shopping Oleh-oleh Ulos",
          description: "Beli kain Ulos khas Batak dan souvenir lainnya",
          icon: "camera",
          type: "activity",
          duration: "1.5 jam"
        },
        {
          time: "15:00",
          title: "Perjalanan ke Bandara Silangit",
          description: "Transfer kembali ke bandara",
          icon: "car",
          type: "transport",
          duration: "4 jam"
        },
        {
          time: "19:00",
          title: "Tiba di Bandara - Tour Selesai",
          description: "Terima kasih telah mempercayai perjalanan Anda bersama kami!",
          icon: "plane",
          type: "transport",
          duration: "-"
        }
      ]
    }
  ];

  const getActivityIcon = (iconName: string): JSX.Element => {
    const icons: Record<typeof iconName, JSX.Element> = {
      plane: <Plane className="w-5 h-5" />,
      car: <Car className="w-5 h-5" />,
      hotel: <Hotel className="w-5 h-5" />,
      utensils: <Utensils className="w-5 h-5" />,
      camera: <Camera className="w-5 h-5" />,
      mountain: <Mountain className="w-5 h-5" />
    };
    return icons[iconName] ?? <Clock className="w-5 h-5" />;
  };

  const getActivityColor = (type: string): string => {
    const colors: Record<typeof type, string> = {
      transport: "bg-blue-100 text-blue-600 border-blue-300",
      accommodation: "bg-purple-100 text-purple-600 border-purple-300",
      meal: "bg-orange-100 text-orange-600 border-orange-300",
      activity: "bg-emerald-100 text-emerald-600 border-emerald-300"
    };
    return colors[type] ?? "bg-gray-100 text-gray-600 border-gray-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 mb-8 text-white shadow-2xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-3">{itinerary.title}</h1>
              <div className="flex items-center gap-4 text-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {itinerary.destination}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-amber-300 text-amber-300" />
                  <span className="font-bold">{itinerary.rating}</span>
                  <span className="opacity-75">({itinerary.reviews} reviews)</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90 mb-1">Total Budget</div>
              <div className="text-3xl font-bold">Rp {itinerary.totalBudget.toLocaleString()}</div>
              <div className="text-sm opacity-75">per orang</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
              <Calendar className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{itinerary.days} Hari</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
              <Users className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{itinerary.people} Orang</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
              <DollarSign className="w-6 h-6 mx-auto mb-2" />
              <div className="text-2xl font-bold">{itinerary.budgetLevel}</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hotel Info */}
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-green-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{itinerary.hotel.image}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{itinerary.hotel.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{itinerary.hotel.type}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>{itinerary.hotel.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{itinerary.hotel.address}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {itinerary.hotel.facilities.map((facility, i) => (
                  <span key={i} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                    {facility}
                  </span>
                ))}
              </div>
              <div className="text-sm font-semibold text-emerald-600">
                Rp {itinerary.hotel.price.toLocaleString()} / malam
              </div>
            </div>

            {/* Transport Info */}
            <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-green-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{itinerary.transport.image}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{itinerary.transport.type}</h3>
                  <div className="text-sm text-gray-600">{itinerary.transport.model}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-emerald-600" />
                  {itinerary.transport.capacity}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-emerald-600" />
                  {itinerary.transport.driver}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-emerald-600" />
                  {itinerary.transport.ac ? 'AC' : 'Non-AC'}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-emerald-600" />
                  BBM included
                </div>
              </div>
              <div className="text-sm font-semibold text-emerald-600">
                Rp {itinerary.transport.price.toLocaleString()} / 3 hari
              </div>
            </div>

            {/* Daily Schedule */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Jadwal Kegiatan Detail</h2>

              {dailySchedule.map((day) => (
                <div key={day.day} className="mb-6">
                  <button
                    onClick={() => handleToggleDay(day.day)}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl p-4 mb-4 flex items-center justify-between hover:shadow-lg transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-white text-emerald-600 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                        {day.day}
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-lg">Hari {day.day}</div>
                        <div className="text-sm opacity-90">{day.title}</div>
                      </div>
                    </div>
                    {expandedDay === day.day ? <ChevronUp /> : <ChevronDown />}
                  </button>

                  {expandedDay === day.day && (
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                      <div className="relative">
                        {day.activities.map((activity, index) => (
                          <div key={index} className="relative pb-8 last:pb-0">
                            {/* Timeline Line */}
                            {index < day.activities.length - 1 && (
                              <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 to-teal-400"></div>
                            )}

                            <div className="flex gap-4">
                              {/* Time & Icon */}
                              <div className="flex flex-col items-center flex-shrink-0">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${getActivityColor(activity.type)} bg-white`}>
                                  {getActivityIcon(activity.icon)}
                                </div>
                                <div className="text-sm font-bold text-gray-700 mt-2">
                                  {activity.time}
                                </div>
                              </div>

                              {/* Content */}
                              <div className="flex-1 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-4 border border-green-200">
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="font-bold text-gray-900">{activity.title}</h4>
                                  {activity.price && (
                                    <span className="text-sm font-semibold text-emerald-600 bg-white px-3 py-1 rounded-full">
                                      Rp {activity.price.toLocaleString()}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-700 mb-2">{activity.description}</p>
                                {activity.duration && (
                                  <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <Clock className="w-3 h-3" />
                                    <span>Durasi: {activity.duration}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Includes */}
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-green-100 sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Sudah Termasuk</h3>
              <div className="space-y-3 mb-6">
                {itinerary.includes.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-4">Tidak Termasuk</h3>
              <div className="space-y-3 mb-6">
                {itinerary.excludes.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Harga per orang</span>
                  <span className="font-semibold">Rp {itinerary.totalBudget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Jumlah orang ({itinerary.people}x)</span>
                  <span className="font-semibold">Rp {(itinerary.totalBudget * itinerary.people).toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-emerald-600">
                      Rp {(itinerary.totalBudget * itinerary.people).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push("/itinerary/booking")}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition flex items-center justify-center gap-2"
              >
                Pesan Sekarang
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  💳 Pembayaran aman & terpercaya
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}