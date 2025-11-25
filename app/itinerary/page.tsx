"use client";

import React, { useState } from 'react';
import { MapPin, Users, Star, Mountain, Calendar, DollarSign, Search, Clock, Utensils, Hotel, Camera } from 'lucide-react';

interface Activity {
  time: string;
  activity: string;
  icon: string;
}

interface DayPlan {
  day: number;
  activities: Activity[];
}

interface Itinerary {
  id: number;
  title: string;
  destination: string;
  days: number;
  people: number;
  totalBudget: number;
  budgetLevel: string;
  rating: number;
  activities: number;
  description: string;
  dailyPlan: DayPlan[];
  detailUrl: string;
  includes: string[];
}

export default function ItineraryPage() {
  const [days, setDays] = useState<string>('');
  const [budget, setBudget] = useState<string>('');
  const [people, setPeople] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Itinerary[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Data pariwisata Danau Toba
  const tobaAttractions = {
    popular: [
      { name: "Pulau Samosir", category: "Pulau", duration: "4-6 jam", price: 50000 },
      { name: "Bukit Holbung", category: "Pemandangan", duration: "2-3 jam", price: 25000 },
      { name: "Air Terjun Sipiso-piso", category: "Air Terjun", duration: "2 jam", price: 10000 },
      { name: "Pantai Pasir Putih Parbaba", category: "Pantai", duration: "3 jam", price: 15000 },
      { name: "Desa Huta Bolon", category: "Budaya", duration: "2 jam", price: 20000 },
      { name: "Museum Batak", category: "Museum", duration: "2 jam", price: 15000 },
      { name: "Bukit Siadtaratas", category: "Pemandangan", duration: "2 jam", price: 20000 },
      { name: "Desa Tomok", category: "Budaya", duration: "3 jam", price: 10000 },
      { name: "Batu Gantung", category: "Wisata Alam", duration: "1-2 jam", price: 5000 },
      { name: "Pantai Bebas", category: "Pantai", duration: "2-3 jam", price: 10000 },
    ],
  };

  // Update URL saat pencarian dilakukan
  const updateSearchURL = (numDays: number, numBudget: number, numPeople: number): void => {
    const params = new URLSearchParams();
    params.set('days', numDays.toString());
    params.set('budget', numBudget.toString());
    params.set('people', numPeople.toString());
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({ days: numDays, budget: numBudget, people: numPeople }, '', newUrl);
  };

  // Fungsi generate itinerary
  const generateItinerary = (): void => {
    if (!days || !budget || !people) {
      return;
    }

    setIsSearching(true);
    
    const numDays: number = parseInt(days);
    const numBudget: number = parseInt(budget);
    const numPeople: number = parseInt(people);

    // Update URL dengan parameter pencarian
    updateSearchURL(numDays, numBudget, numPeople);
    
    setTimeout(() => {
      const itineraries: Itinerary[] = [
        {
          id: 1,
          title: `Paket Danau Toba ${numDays} Hari - Ekonomis`,
          destination: "Danau Toba",
          days: numDays,
          people: numPeople,
          totalBudget: numBudget,
          budgetLevel: "Ekonomis",
          rating: 4.8,
          activities: numDays * 3,
          description: "Paket hemat untuk menikmati keindahan Danau Toba",
          dailyPlan: generateDailyPlan(numDays, 'ekonomis', numPeople),
          detailUrl: `/itinerary/detail/ekonomis?days=${numDays}&budget=${numBudget}&people=${numPeople}`,
          includes: [
            "Tiket masuk wisata",
            "Transportasi lokal",
            "Makan 3x sehari",
            "Hotel budget",
            "Guide lokal"
          ]
        },
        {
          id: 2,
          title: `Paket Danau Toba ${numDays} Hari - Standar`,
          destination: "Danau Toba",
          days: numDays,
          people: numPeople,
          totalBudget: Math.round(numBudget * 1.5),
          budgetLevel: "Standar",
          rating: 4.9,
          activities: numDays * 4,
          description: "Paket lengkap dengan akomodasi nyaman",
          dailyPlan: generateDailyPlan(numDays, 'standar', numPeople),
          detailUrl: `/itinerary/detail/standar?days=${numDays}&budget=${Math.round(numBudget * 1.5)}&people=${numPeople}`,
          includes: [
            "Tiket masuk wisata",
            "Transportasi AC",
            "Makan 3x sehari",
            "Hotel mid-range",
            "Guide profesional",
            "Asuransi perjalanan"
          ]
        },
        {
          id: 3,
          title: `Paket Danau Toba ${numDays} Hari - Premium`,
          destination: "Danau Toba",
          days: numDays,
          people: numPeople,
          totalBudget: Math.round(numBudget * 2),
          budgetLevel: "Premium",
          rating: 5.0,
          activities: numDays * 5,
          description: "Pengalaman mewah dengan fasilitas terbaik",
          dailyPlan: generateDailyPlan(numDays, 'premium', numPeople),
          detailUrl: `/itinerary/detail/premium?days=${numDays}&budget=${Math.round(numBudget * 2)}&people=${numPeople}`,
          includes: [
            "Tiket masuk semua wisata",
            "Private car + driver",
            "Makan di restoran terbaik",
            "Hotel luxury",
            "Guide profesional",
            "Asuransi perjalanan",
            "Welcome dinner",
            "Fotografi profesional"
          ]
        }
      ];

      setSearchResults(itineraries);
      setIsSearching(false);
    }, 1500);
  };

  // Fungsi generateDailyPlan
  const generateDailyPlan = (numDays: number, level: string, peopleCount: number): DayPlan[] => {
    const plans: DayPlan[] = [];

    for (let day = 1; day <= numDays; day++) {
      const dayPlan: DayPlan = { day, activities: [] };

      if (day === 1) {
        dayPlan.activities = [
          { time: "08:00", activity: "Check-in Hotel", icon: "hotel" },
          { time: "10:00", activity: "Kunjungi Air Terjun Sipiso-piso", icon: "camera" },
          { time: "13:00", activity: "Makan siang di RM Sinar Pagi", icon: "utensils" },
          { time: "15:00", activity: "Eksplorasi Bukit Holbung", icon: "mountain" },
          { time: "18:00", activity: "Sunset di Pantai Pasir Putih Parbaba", icon: "camera" },
        ];
      } else if (day === 2) {
        dayPlan.activities = [
          { time: "07:00", activity: "Sarapan di hotel", icon: "utensils" },
          { time: "09:00", activity: "Ferry ke Pulau Samosir", icon: "map" },
          { time: "11:00", activity: "Kunjungi Desa Tomok & Museum Batak", icon: "camera" },
          { time: "13:00", activity: "Makan siang seafood di Bagus Bay", icon: "utensils" },
          { time: "15:00", activity: "Jelajahi Desa Huta Bolon", icon: "camera" },
          { time: "17:00", activity: "Kembali ke hotel", icon: "hotel" },
        ];
      } else if (day === 3) {
        dayPlan.activities = [
          { time: "08:00", activity: "Sarapan & check-out", icon: "utensils" },
          { time: "10:00", activity: "Kunjungi Bukit Siadtaratas", icon: "mountain" },
          { time: "12:00", activity: "Makan siang di Warung Ikan Mas", icon: "utensils" },
          { time: "14:00", activity: "Shopping oleh-oleh Ulos", icon: "camera" },
          { time: "16:00", activity: "Transfer ke bandara/stasiun", icon: "map" },
        ];
      } else {
        // Additional days
        dayPlan.activities = [
          { time: "08:00", activity: "Sarapan di hotel", icon: "utensils" },
          { time: "09:30", activity: `Kunjungi destinasi wisata`, icon: "camera" },
          { time: "13:00", activity: "Makan siang", icon: "utensils" },
          { time: "15:00", activity: `Eksplorasi tempat baru`, icon: "mountain" },
          { time: "18:00", activity: "Kembali ke hotel & istirahat", icon: "hotel" },
        ];
      }

      plans.push(dayPlan);
    }

    return plans;
  };

  const getIcon = (iconName: string): JSX.Element => {
    const icons: Record<string, JSX.Element> = {
      hotel: <Hotel className="w-4 h-4" />,
      camera: <Camera className="w-4 h-4" />,
      utensils: <Utensils className="w-4 h-4" />,
      mountain: <Mountain className="w-4 h-4" />,
      map: <MapPin className="w-4 h-4" />,
    };
    return icons[iconName] || <Clock className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Itinerary Otomatis AI</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Biarkan AI kami merencanakan perjalanan sempurna ke Danau Toba untuk Anda
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-3xl p-8 mb-12 shadow-xl border border-green-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Rencanakan Perjalanan Anda</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Days */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Berapa Hari?
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  placeholder="3"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimal 1 hari</p>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Budget Total (Rp)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  min="100000"
                  step="100000"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="1000000"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Per orang</p>
            </div>

            {/* People */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Jumlah Orang
              </label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  placeholder="2"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Maksimal 20 orang</p>
            </div>
          </div>

          <button
            onClick={generateItinerary}
            disabled={isSearching || !days || !budget || !people}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
          >
            {isSearching ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Mencari Itinerary Terbaik...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Cari Itinerary
              </>
            )}
          </button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Rekomendasi Itinerary Danau Toba untuk Anda
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {searchResults.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition border-2 border-green-100">
                  <div className={`p-6 text-white ${item.budgetLevel === 'Ekonomis' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                    item.budgetLevel === 'Standar' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' :
                      'bg-gradient-to-br from-purple-500 to-pink-600'
                    }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                        <div className="flex items-center gap-2 text-sm opacity-90">
                          <MapPin className="w-4 h-4" />
                          {item.destination}
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs font-bold">
                        {item.budgetLevel}
                      </div>
                    </div>
                    <p className="text-sm opacity-90">{item.description}</p>
                  </div>

                  <div className="p-6">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">{item.days}</div>
                        <div className="text-xs text-gray-600">Hari</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">{item.people}</div>
                        <div className="text-xs text-gray-600">Orang</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span className="text-2xl font-bold text-emerald-600">{item.rating}</span>
                        </div>
                        <div className="text-xs text-gray-600">Rating</div>
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-4 mb-6 border border-green-200">
                      <div className="text-sm text-gray-600 mb-1">Total Budget</div>
                      <div className="text-2xl font-bold text-emerald-700">
                        Rp {item.totalBudget.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {item.activities} aktivitas • Per orang
                      </div>
                    </div>

                    {/* Includes */}
                    <div className="mb-6">
                      <div className="text-sm font-semibold text-gray-700 mb-3">Termasuk:</div>
                      <div className="space-y-2">
                        {item.includes.slice(0, 4).map((inc: string, i: number) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                            {inc}
                          </div>
                        ))}
                        {item.includes.length > 4 && (
                          <div className="text-xs text-gray-500">
                            +{item.includes.length - 4} lainnya
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Daily Plan Preview */}
                    <div className="mb-6 border-t pt-4">
                      <div className="text-sm font-semibold text-gray-700 mb-3">
                        Contoh Hari Pertama:
                      </div>
                      <div className="space-y-2">
                        {item.dailyPlan[0].activities.slice(0, 3).map((act: Activity, i: number) => (
                          <div key={i} className="flex items-start gap-3 text-xs">
                            <div className="text-emerald-600 font-semibold w-12 flex-shrink-0">
                              {act.time}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-gray-400">
                                {getIcon(act.icon)}
                              </div>
                              <span className="text-gray-700">{act.activity}</span>
                            </div>
                          </div>
                        ))}
                        <div className="text-xs text-gray-500 italic">
                          ... dan {item.dailyPlan[0].activities.length - 3} aktivitas lainnya
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => window.location.href = item.detailUrl}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition"
                    >
                      Lihat Detail & Pesan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Danau Toba */}
        {searchResults.length === 0 && (
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-12 text-white shadow-2xl">
            <div className="max-w-3xl mx-auto text-center">
              <Mountain className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Jelajahi Keindahan Danau Toba</h2>
              <p className="text-lg mb-6 opacity-90">
                Danau vulkanik terbesar di Indonesia dengan pemandangan spektakuler, budaya Batak yang kaya, dan Pulau Samosir yang memukau.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-white bg-opacity-10 rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">10+</div>
                  <div className="text-sm opacity-90">Destinasi Wisata</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">4.9★</div>
                  <div className="text-sm opacity-90">Rating Pengunjung</div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-xl p-4">
                  <div className="text-2xl font-bold mb-1">100K+</div>
                  <div className="text-sm opacity-90">Wisatawan/Tahun</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}