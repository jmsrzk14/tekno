"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Plane, Train, Bus, Car, MapPin, Users, Calendar, Clock, ArrowRight, Star, Shield, Check, Fuel, Briefcase } from 'lucide-react';

interface TransportType {
  icon: any;
  name: string;
  description: string;
  value: string;
}

interface TransportResult {
  id: number;
  type: string;
  operator: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  class?: string;
  seats?: number;
  rating: number;
  facilities: string[];
  departureTime: string;
  arrivalTime: string;
  // Car specific
  carType?: string;
  transmission?: string;
  fuel?: string;
  capacity?: number;
  luggage?: number;
}

const transportTypes: TransportType[] = [
  { icon: Plane, name: 'Pesawat', description: 'Penerbangan domestik & internasional', value: 'plane' },
  { icon: Train, name: 'Kereta', description: 'Perjalanan nyaman antar kota', value: 'train' },
  { icon: Bus, name: 'Bus', description: 'Transportasi ekonomis', value: 'bus' },
  { icon: Car, name: 'Rental Mobil', description: 'Kebebasan eksplorasi', value: 'car' }
];

export default function TransportationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedType, setSelectedType] = useState<string>('bus');
  const [showResults, setShowResults] = useState(false);
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1
  });

  // Sync with URL on mount
  useEffect(() => {
    const type = searchParams.get('type');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const date = searchParams.get('date');
    const passengers = searchParams.get('passengers');
    const search = searchParams.get('search');

    if (type) setSelectedType(type);
    if (from || to || date) {
      setSearchData({
        from: from || '',
        to: to || '',
        date: date || '',
        passengers: passengers ? parseInt(passengers) : 1
      });
      if (search === 'true') {
        setShowResults(true);
      }
    }
  }, [searchParams]);

  // Data untuk Bus
  const busResults: TransportResult[] = [
    {
      id: 1,
      type: 'bus',
      operator: 'Pahala Kencana',
      departure: 'Jakarta',
      arrival: 'Bandung',
      duration: '3h 30m',
      price: 150000,
      class: 'Executive',
      seats: 12,
      rating: 4.7,
      facilities: ['AC', 'Reclining Seat', 'Selimut', 'Snack', 'Charging Port'],
      departureTime: '07:00',
      arrivalTime: '10:30'
    },
    {
      id: 2,
      type: 'bus',
      operator: 'Rosalia Indah',
      departure: 'Jakarta',
      arrival: 'Bandung',
      duration: '3h 45m',
      price: 120000,
      class: 'Business',
      seats: 8,
      rating: 4.5,
      facilities: ['AC', 'Reclining Seat', 'Snack'],
      departureTime: '09:30',
      arrivalTime: '13:15'
    },
    {
      id: 3,
      type: 'bus',
      operator: 'Kramat Djati',
      departure: 'Jakarta',
      arrival: 'Bandung',
      duration: '3h 20m',
      price: 180000,
      class: 'Executive Plus',
      seats: 15,
      rating: 4.8,
      facilities: ['AC', 'Reclining Seat', 'Selimut', 'Snack', 'Charging Port', 'Toilet', 'WiFi'],
      departureTime: '12:00',
      arrivalTime: '15:20'
    },
    {
      id: 4,
      type: 'bus',
      operator: 'Haryanto',
      departure: 'Jakarta',
      arrival: 'Bandung',
      duration: '3h 40m',
      price: 135000,
      class: 'Executive',
      seats: 5,
      rating: 4.6,
      facilities: ['AC', 'Reclining Seat', 'Snack', 'Charging Port'],
      departureTime: '15:30',
      arrivalTime: '19:10'
    },
    {
      id: 5,
      type: 'bus',
      operator: 'Primajasa',
      departure: 'Jakarta',
      arrival: 'Bandung',
      duration: '3h 50m',
      price: 110000,
      class: 'Economy',
      seats: 20,
      rating: 4.3,
      facilities: ['AC', 'Standard Seat'],
      departureTime: '18:00',
      arrivalTime: '21:50'
    }
  ];

  // Data untuk Rental Mobil
  const carResults: TransportResult[] = [
    {
      id: 1,
      type: 'car',
      operator: 'Toyota Avanza',
      departure: 'Jakarta',
      arrival: 'Self Drive',
      duration: '24 hours',
      price: 350000,
      rating: 4.8,
      facilities: ['AC', 'Power Steering', 'Audio System'],
      departureTime: 'Pickup',
      arrivalTime: 'Anytime',
      carType: 'MPV',
      transmission: 'Manual',
      fuel: 'Bensin',
      capacity: 7,
      luggage: 3
    },
    {
      id: 2,
      type: 'car',
      operator: 'Honda Jazz',
      departure: 'Jakarta',
      arrival: 'Self Drive',
      duration: '24 hours',
      price: 300000,
      rating: 4.7,
      facilities: ['AC', 'Power Steering', 'Audio System', 'Bluetooth'],
      departureTime: 'Pickup',
      arrivalTime: 'Anytime',
      carType: 'Hatchback',
      transmission: 'Automatic',
      fuel: 'Bensin',
      capacity: 5,
      luggage: 2
    },
    {
      id: 3,
      type: 'car',
      operator: 'Toyota Innova Reborn',
      departure: 'Jakarta',
      arrival: 'Self Drive',
      duration: '24 hours',
      price: 450000,
      rating: 4.9,
      facilities: ['AC', 'Power Steering', 'Audio System', 'Bluetooth', 'Leather Seat'],
      departureTime: 'Pickup',
      arrivalTime: 'Anytime',
      carType: 'MPV',
      transmission: 'Automatic',
      fuel: 'Diesel',
      capacity: 7,
      luggage: 4
    },
    {
      id: 4,
      type: 'car',
      operator: 'Daihatsu Xenia',
      departure: 'Jakarta',
      arrival: 'Self Drive',
      duration: '24 hours',
      price: 280000,
      rating: 4.5,
      facilities: ['AC', 'Power Steering', 'Audio System'],
      departureTime: 'Pickup',
      arrivalTime: 'Anytime',
      carType: 'MPV',
      transmission: 'Manual',
      fuel: 'Bensin',
      capacity: 7,
      luggage: 2
    },
    {
      id: 5,
      type: 'car',
      operator: 'Mitsubishi Pajero Sport',
      departure: 'Jakarta',
      arrival: 'Self Drive',
      duration: '24 hours',
      price: 750000,
      rating: 4.9,
      facilities: ['AC', 'Power Steering', 'Audio System', 'Bluetooth', 'Leather Seat', '4WD'],
      departureTime: 'Pickup',
      arrivalTime: 'Anytime',
      carType: 'SUV',
      transmission: 'Automatic',
      fuel: 'Diesel',
      capacity: 7,
      luggage: 5
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if selected type is available
    if (selectedType !== 'bus' && selectedType !== 'car') {
      alert('Maaf, layanan ini akan segera hadir! Saat ini hanya tersedia Bus dan Rental Mobil.');
      return;
    }

    // Update URL with search params
    const params = new URLSearchParams();
    params.set('type', selectedType);
    params.set('from', searchData.from);
    params.set('to', searchData.to);
    params.set('date', searchData.date);
    params.set('passengers', searchData.passengers.toString());
    params.set('search', 'true');

    router.push(`/transportation?${params.toString()}`, { scroll: false });
    setShowResults(true);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    // Update URL when type changes
    const params = new URLSearchParams(searchParams.toString());
    params.set('type', type);
    router.push(`/transportation?${params.toString()}`, { scroll: false });
  };

  const handleResetSearch = () => {
    setShowResults(false);
    router.push('/transportation', { scroll: false });
  };

  const getTypeIcon = (type: string) => {
    const typeMap: { [key: string]: any } = {
      plane: Plane,
      train: Train,
      bus: Bus,
      car: Car
    };
    return typeMap[type] || Bus;
  };

  // Get results based on selected type
  const currentResults = selectedType === 'car' ? carResults : busResults;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Car className="w-16 h-16 mx-auto mb-4 text-emerald-600" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Transportasi</h1>
          <p className="text-xl text-gray-600">Booking transportasi terintegrasi dalam satu platform</p>
        </div>

        {/* Transport Type Selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {transportTypes.map((type, index) => {
            const isAvailable = type.value === 'bus' || type.value === 'car';
            
            return (
              <button
                key={index}
                onClick={() => handleTypeSelect(type.value)}
                disabled={!isAvailable}
                className={`bg-white rounded-2xl p-8 text-center shadow-lg transition transform cursor-pointer border-2 relative ${
                  selectedType === type.value
                    ? 'border-emerald-600 bg-emerald-50 -translate-y-2'
                    : isAvailable
                    ? 'border-green-100 hover:shadow-2xl hover:-translate-y-2'
                    : 'border-gray-200 opacity-50 cursor-not-allowed'
                }`}
              >
                {!isAvailable && (
                  <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Coming Soon
                  </div>
                )}
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  selectedType === type.value
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
                    : 'bg-gradient-to-br from-green-100 to-teal-100'
                }`}>
                  <type.icon className={`w-10 h-10 ${
                    selectedType === type.value ? 'text-white' : 'text-emerald-600'
                  }`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{type.name}</h3>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </button>
            );
          })}
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedType === 'car' ? 'Cari Rental Mobil' : 'Cari Bus'}
          </h2>
          <form onSubmit={handleSearch}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {selectedType === 'car' ? 'Lokasi Pickup' : 'Dari'}
                </label>
                <input
                  type="text"
                  placeholder={selectedType === 'car' ? 'Contoh: Jakarta' : 'Kota asal'}
                  value={searchData.from}
                  onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
                  className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              {selectedType !== 'car' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ke</label>
                  <input
                    type="text"
                    placeholder="Kota tujuan"
                    value={searchData.to}
                    onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
                    className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {selectedType === 'car' ? 'Tanggal Mulai' : 'Tanggal Berangkat'}
                </label>
                <input
                  type="date"
                  value={searchData.date}
                  onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                  className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              {selectedType === 'car' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Durasi Sewa</label>
                  <select className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option value="1">1 Hari</option>
                    <option value="2">2 Hari</option>
                    <option value="3">3 Hari</option>
                    <option value="7">1 Minggu</option>
                    <option value="30">1 Bulan</option>
                  </select>
                </div>
              )}
              {selectedType !== 'car' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Penumpang</label>
                  <input
                    type="number"
                    placeholder="Jumlah penumpang"
                    value={searchData.passengers}
                    onChange={(e) => setSearchData({ ...searchData, passengers: parseInt(e.target.value) })}
                    min="1"
                    max="10"
                    className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              )}
            </div>
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition"
            >
              {selectedType === 'car' ? 'Cari Mobil' : 'Cari Bus'}
            </button>
          </form>
        </div>

        {/* Search Results */}
        {showResults && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Hasil Pencarian</h2>
                <p className="text-gray-600">
                  Ditemukan {currentResults.length} pilihan {selectedType === 'car' ? 'mobil' : 'bus'} 
                  {selectedType !== 'car' && ` dari ${searchData.from || 'Jakarta'} ke ${searchData.to || 'Bandung'}`}
                </p>
              </div>
              <button 
                onClick={handleResetSearch}
                className="text-emerald-600 font-semibold hover:text-emerald-700"
              >
                Ubah Pencarian
              </button>
            </div>

            {/* Sort & Filter */}
            <div className="bg-white rounded-xl p-4 shadow-lg border border-green-100 mb-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">Urutkan:</span>
                <select className="px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>Harga Termurah</option>
                  <option>Harga Termahal</option>
                  <option>Rating Tertinggi</option>
                  {selectedType !== 'car' && <option>Keberangkatan Paling Awal</option>}
                </select>
              </div>
            </div>

            {/* Results List */}
            <div className="space-y-4">
              {currentResults.map((result) => {
                const TypeIcon = getTypeIcon(result.type);
                
                return (
                  <div key={result.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition border border-green-100">
                    {selectedType === 'car' ? (
                      // Car Layout
                      <div className="grid md:grid-cols-12 gap-6 items-center">
                        {/* Car Image Placeholder */}
                        <div className="md:col-span-3">
                          <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl p-6 aspect-video flex items-center justify-center">
                            <Car className="w-20 h-20 text-emerald-600" />
                          </div>
                        </div>

                        {/* Car Details */}
                        <div className="md:col-span-6">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-2xl font-bold text-gray-900">{result.operator}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                              <span className="text-sm font-semibold text-gray-900">{result.rating}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Briefcase className="w-4 h-4" />
                              <span>{result.carType}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Users className="w-4 h-4" />
                              <span>{result.capacity} Seats</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>⚙️</span>
                              <span>{result.transmission}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Fuel className="w-4 h-4" />
                              <span>{result.fuel}</span>
                            </div>
                          </div>

                          {/* Facilities */}
                          <div className="flex flex-wrap gap-2">
                            {result.facilities.map((facility, index) => (
                              <div key={index} className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                                <Check className="w-3 h-3 text-emerald-600" />
                                {facility}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Price & Book */}
                        <div className="md:col-span-3 text-center md:text-right">
                          <div className="mb-4">
                            <div className="text-sm text-gray-600 mb-1">Harga sewa</div>
                            <div className="text-3xl font-bold text-emerald-600">
                              Rp {(result.price / 1000).toFixed(0)}k
                            </div>
                            <div className="text-xs text-gray-500">per hari</div>
                          </div>

                          <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2">
                            Sewa Sekarang
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Bus Layout
                      <div className="grid md:grid-cols-12 gap-6 items-center">
                        {/* Operator Info */}
                        <div className="md:col-span-3">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-2 rounded-lg">
                              <TypeIcon className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">{result.operator}</h3>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span className="text-sm text-gray-600">{result.rating}</span>
                              </div>
                            </div>
                          </div>
                          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                            {result.class}
                          </span>
                        </div>

                        {/* Bus Details */}
                        <div className="md:col-span-6">
                          <div className="flex items-center justify-between">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900">{result.departureTime}</div>
                              <div className="text-sm text-gray-600">{result.departure}</div>
                            </div>

                            <div className="flex-1 px-6">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="flex-1 h-1 bg-gray-300 rounded"></div>
                                <TypeIcon className="w-5 h-5 text-emerald-600" />
                                <div className="flex-1 h-1 bg-gray-300 rounded"></div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {result.duration}
                                </div>
                              </div>
                            </div>

                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900">{result.arrivalTime}</div>
                              <div className="text-sm text-gray-600">{result.arrival}</div>
                            </div>
                          </div>

                          {/* Facilities */}
                          <div className="mt-4 flex flex-wrap gap-2">
                            {result.facilities.map((facility, index) => (
                              <div key={index} className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                                <Check className="w-3 h-3 text-emerald-600" />
                                {facility}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Price & Book */}
                        <div className="md:col-span-3 text-center md:text-right">
                          <div className="mb-4">
                            <div className="text-sm text-gray-600 mb-1">Mulai dari</div>
                            <div className="text-3xl font-bold text-emerald-600">
                              Rp {(result.price / 1000).toFixed(0)}k
                            </div>
                            <div className="text-xs text-gray-500">per orang</div>
                          </div>
                          
                          <div className="flex items-center justify-center md:justify-end gap-2 text-sm text-gray-600 mb-4">
                            <Users className="w-4 h-4" />
                            <span>{result.seats} kursi tersisa</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Info Banner */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Jaminan Harga Terbaik</h3>
                  <p className="text-gray-700">
                    Kami menjamin harga terbaik untuk semua pemesanan transportasi. Jika menemukan harga lebih murah di tempat lain, kami akan mengembalikan selisihnya.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}