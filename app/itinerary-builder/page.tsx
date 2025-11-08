"use client";

import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Plus, Trash2, Save, Download, Share2, Edit } from 'lucide-react';

interface Activity {
  id: string;
  time: string;
  title: string;
  location: string;
  duration: string;
  type: 'attraction' | 'food' | 'transport' | 'hotel';
}

interface DayPlan {
  day: number;
  date: string;
  activities: Activity[];
}

export default function ItineraryBuilderPage() {
  const [destination, setDestination] = useState('Bali, Indonesia');
  const [startDate, setStartDate] = useState('2024-12-01');
  const [endDate, setEndDate] = useState('2024-12-05');
  const [days, setDays] = useState<DayPlan[]>([
    {
      day: 1,
      date: '2024-12-01',
      activities: [
        {
          id: '1',
          time: '08:00',
          title: 'Arrival at Ngurah Rai Airport',
          location: 'Ngurah Rai International Airport',
          duration: '2 hours',
          type: 'transport'
        },
        {
          id: '2',
          time: '10:00',
          title: 'Check-in Hotel',
          location: 'Grand Hyatt Bali',
          duration: '1 hour',
          type: 'hotel'
        },
        {
          id: '3',
          time: '12:00',
          title: 'Lunch at Warung Babi Guling',
          location: 'Jl. Raya Ubud',
          duration: '1.5 hours',
          type: 'food'
        },
        {
          id: '4',
          time: '15:00',
          title: 'Visit Tanah Lot Temple',
          location: 'Tabanan, Bali',
          duration: '3 hours',
          type: 'attraction'
        }
      ]
    },
    {
      day: 2,
      date: '2024-12-02',
      activities: [
        {
          id: '5',
          time: '06:00',
          title: 'Sunrise at Mount Batur',
          location: 'Mount Batur, Kintamani',
          duration: '6 hours',
          type: 'attraction'
        },
        {
          id: '6',
          time: '13:00',
          title: 'Lunch with Volcano View',
          location: 'Kintamani Restaurant',
          duration: '1.5 hours',
          type: 'food'
        },
        {
          id: '7',
          time: '16:00',
          title: 'Tegallalang Rice Terraces',
          location: 'Ubud, Bali',
          duration: '2 hours',
          type: 'attraction'
        }
      ]
    }
  ]);

  const activityTypeColors = {
    attraction: 'bg-blue-100 text-blue-700 border-blue-200',
    food: 'bg-orange-100 text-orange-700 border-orange-200',
    transport: 'bg-purple-100 text-purple-700 border-purple-200',
    hotel: 'bg-pink-100 text-pink-700 border-pink-200'
  };

  const activityTypeIcons = {
    attraction: '🏛️',
    food: '🍜',
    transport: '✈️',
    hotel: '🏨'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Itinerary Builder</h1>
          <p className="text-xl text-gray-600">
            Buat rencana perjalanan yang sempurna dengan bantuan AI
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Trip Details</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Destinasi</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Mulai</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Selesai</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold mb-3 hover:shadow-lg transition flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Generate dengan AI
              </button>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                    <Save className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Save Itinerary</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                    <Download className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Export PDF</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition">
                    <Share2 className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-700">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {days.map((day) => (
                <div key={day.day} className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold">
                        {day.day}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Day {day.day}</h3>
                        <p className="text-gray-600">{day.date}</p>
                      </div>
                    </div>
                    <button className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      Add Activity
                    </button>
                  </div>

                  <div className="space-y-4">
                    {day.activities.map((activity, index) => (
                      <div key={activity.id} className="relative">
                        {index < day.activities.length - 1 && (
                          <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-200 z-0"></div>
                        )}
                        
                        <div className="relative bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-200 hover:border-emerald-300 transition group">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-white border-2 border-emerald-200 rounded-full flex items-center justify-center font-semibold text-emerald-600 shadow-sm">
                                {activity.time}
                              </div>
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${activityTypeColors[activity.type]} mb-2`}>
                                    {activityTypeIcons[activity.type]} {activity.type}
                                  </span>
                                  <h4 className="text-lg font-bold text-gray-900 mb-1">{activity.title}</h4>
                                  <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                      <MapPin className="w-4 h-4" />
                                      {activity.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      {activity.duration}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                  <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 transition">
                                    <Edit className="w-4 h-4 text-gray-600" />
                                  </button>
                                  <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition">
                                    <Trash2 className="w-4 h-4 text-gray-600" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Day Button */}
            <button className="w-full mt-8 border-2 border-dashed border-emerald-300 bg-emerald-50 text-emerald-600 py-6 rounded-2xl font-bold text-lg hover:bg-emerald-100 transition flex items-center justify-center gap-2">
              <Plus className="w-6 h-6" />
              Add Another Day
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}