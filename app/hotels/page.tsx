"use client";

import React from 'react';
import { Plane, Hotel, MapPin, Users } from 'lucide-react';

interface TransportType {
  icon: any;
  name: string;
  description: string;
}

const transportTypes: TransportType[] = [
  { icon: Plane, name: 'Pesawat', description: 'Penerbangan domestik & internasional' },
  { icon: Hotel, name: 'Kereta', description: 'Perjalanan nyaman antar kota' },
  { icon: MapPin, name: 'Bus', description: 'Transportasi ekonomis' },
  { icon: Users, name: 'Rental Mobil', description: 'Kebebasan eksplorasi' }
];

export default function TransportationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Plane className="w-16 h-16 mx-auto mb-4 text-emerald-600" />
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Transportasi</h1>
          <p className="text-xl text-gray-600">Booking transportasi terintegrasi dalam satu platform</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {transportTypes.map((type, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer border border-green-100"
            >
              <div className="bg-gradient-to-br from-green-100 to-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <type.icon className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{type.name}</h3>
              <p className="text-gray-600 text-sm">{type.description}</p>
            </div>
          ))}
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cari Transportasi</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Dari</label>
              <input
                type="text"
                placeholder="Kota asal"
                className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Ke</label>
              <input
                type="text"
                placeholder="Kota tujuan"
                className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Berangkat</label>
              <input
                type="date"
                className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Penumpang</label>
              <input
                type="number"
                placeholder="Jumlah penumpang"
                defaultValue="1"
                className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
          <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition">
            Cari Transportasi
          </button>
        </div>
      </div>
    </div>
  );
}