"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, Star, Clock, Users, Calendar, ChevronLeft, 
  Edit2, Plus, Trash2, Save, Download, Share2, Check,
  Hotel, Utensils, Camera, Navigation, Plane, Coffee,
  Mountain, Sunrise, ShoppingBag, Heart
} from 'lucide-react';

interface ItineraryDetailProps {
  params: {
    id: string;
  };
}

interface DayActivity {
  id: string;
  time: string;
  title: string;
  location: string;
  duration: string;
  type: 'transport' | 'food' | 'attraction' | 'hotel' | 'activity';
  description: string;
  cost?: number;
}

interface DayPlan {
  day: number;
  date: string;
  title: string;
  activities: DayActivity[];
}

export default function ItineraryDetailPage({ params }: ItineraryDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2024-12-15');
  const [travelers, setTravelers] = useState(2);

  // Data dummy berdasarkan params.id
  const itinerary = {
    id: params.id,
    title: "Petualangan Bali 5 Hari",
    destination: "Bali, Indonesia",
    description: "Jelajahi keindahan Bali dari pantai hingga pegunungan, dengan kombinasi sempurna antara petualangan, budaya, dan relaksasi.",
    days: 5,
    activities: 15,
    rating: 4.9,
    reviews: 1243,
    users: 1243,
    totalCost: 2500000,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop",
    highlights: [
      "Pantai Kuta & Seminyak",
      "Pura Tanah Lot",
      "Ubud Monkey Forest",
      "Sunset Uluwatu",
      "Tegallalang Rice Terrace",
      "Traditional Balinese Spa"
    ],
    includes: [
      "Hotel 4 bintang",
      "Sarapan harian",
      "Tour guide profesional",
      "Transportasi AC",
      "Tiket masuk wisata",
      "Asuransi perjalanan"
    ]
  };

  const [dayPlans, setDayPlans] = useState<DayPlan[]>([
    {
      day: 1,
      date: "2024-12-15",
      title: "Arrival & South Bali Exploration",
      activities: [
        {
          id: '1-1',
          time: '10:00',
          title: 'Arrival at Ngurah Rai Airport',
          location: 'Ngurah Rai International Airport',
          duration: '2 hours',
          type: 'transport',
          description: 'Pick up from airport and transfer to hotel',
          cost: 200000
        },
        {
          id: '1-2',
          time: '12:00',
          title: 'Check-in & Lunch',
          location: 'Grand Hyatt Bali',
          duration: '2 hours',
          type: 'hotel',
          description: 'Check-in to hotel and enjoy welcome lunch',
          cost: 150000
        },
        {
          id: '1-3',
          time: '15:00',
          title: 'Uluwatu Temple',
          location: 'Uluwatu Temple, South Kuta',
          duration: '3 hours',
          type: 'attraction',
          description: 'Visit the iconic clifftop temple with stunning ocean views',
          cost: 50000
        },
        {
          id: '1-4',
          time: '18:00',
          title: 'Kecak Fire Dance',
          location: 'Uluwatu Temple Amphitheater',
          duration: '1 hour',
          type: 'activity',
          description: 'Watch the traditional Balinese Kecak dance at sunset',
          cost: 100000
        },
        {
          id: '1-5',
          time: '20:00',
          title: 'Seafood Dinner',
          location: 'Jimbaran Beach',
          duration: '2 hours',
          type: 'food',
          description: 'Fresh seafood BBQ dinner on the beach',
          cost: 250000
        }
      ]
    },
    {
      day: 2,
      date: "2024-12-16",
      title: "Ubud Cultural Experience",
      activities: [
        {
          id: '2-1',
          time: '07:00',
          title: 'Breakfast at Hotel',
          location: 'Grand Hyatt Bali',
          duration: '1 hour',
          type: 'food',
          description: 'Buffet breakfast with international and local cuisine',
          cost: 0
        },
        {
          id: '2-2',
          time: '09:00',
          title: 'Tegallalang Rice Terrace',
          location: 'Tegallalang, Ubud',
          duration: '2 hours',
          type: 'attraction',
          description: 'Iconic terraced rice fields with photo opportunities',
          cost: 20000
        },
        {
          id: '2-3',
          time: '11:00',
          title: 'Coffee Plantation Tour',
          location: 'Bali Coffee Plantation',
          duration: '1.5 hours',
          type: 'activity',
          description: 'Learn about coffee making and taste Luwak coffee',
          cost: 50000
        },
        {
          id: '2-4',
          time: '13:00',
          title: 'Lunch with Rice Field View',
          location: 'Sari Organik Restaurant',
          duration: '1.5 hours',
          type: 'food',
          description: 'Organic Indonesian cuisine overlooking rice fields',
          cost: 120000
        },
        {
          id: '2-5',
          time: '15:00',
          title: 'Ubud Monkey Forest',
          location: 'Sacred Monkey Forest Sanctuary',
          duration: '2 hours',
          type: 'attraction',
          description: 'Walk through the forest home to hundreds of monkeys',
          cost: 80000
        },
        {
          id: '2-6',
          time: '17:30',
          title: 'Ubud Traditional Market',
          location: 'Ubud Art Market',
          duration: '1.5 hours',
          type: 'activity',
          description: 'Shop for traditional Balinese handicrafts and souvenirs',
          cost: 0
        }
      ]
    },
    {
      day: 3,
      date: "2024-12-17",
      title: "Water Temple & Beach Relaxation",
      activities: [
        {
          id: '3-1',
          time: '06:00',
          title: 'Sunrise at Mount Batur',
          location: 'Mount Batur, Kintamani',
          duration: '5 hours',
          type: 'activity',
          description: 'Early morning trek to catch the spectacular sunrise',
          cost: 350000
        },
        {
          id: '3-2',
          time: '11:30',
          title: 'Breakfast with Volcano View',
          location: 'Kintamani Restaurant',
          duration: '1 hour',
          type: 'food',
          description: 'Buffet breakfast overlooking Mount Batur',
          cost: 100000
        },
        {
          id: '3-3',
          time: '13:00',
          title: 'Tirta Empul Temple',
          location: 'Tirta Empul Holy Spring Water Temple',
          duration: '2 hours',
          type: 'attraction',
          description: 'Sacred water temple with natural spring',
          cost: 50000
        },
        {
          id: '3-4',
          time: '16:00',
          title: 'Traditional Balinese Spa',
          location: 'Seminyak Spa',
          duration: '2 hours',
          type: 'activity',
          description: 'Relaxing massage and spa treatment',
          cost: 300000
        },
        {
          id: '3-5',
          time: '19:00',
          title: 'Dinner at Beach Club',
          location: 'Ku De Ta, Seminyak',
          duration: '2 hours',
          type: 'food',
          description: 'Sunset dinner at iconic beach club',
          cost: 350000
        }
      ]
    }
  ]);

  const activityTypeConfig = {
    transport: { icon: Plane, color: 'purple', bgColor: 'bg-purple-100', textColor: 'text-purple-700', borderColor: 'border-purple-200' },
    food: { icon: Utensils, color: 'orange', bgColor: 'bg-orange-100', textColor: 'text-orange-700', borderColor: 'border-orange-200' },
    attraction: { icon: Camera, color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-700', borderColor: 'border-blue-200' },
    hotel: { icon: Hotel, color: 'pink', bgColor: 'bg-pink-100', textColor: 'text-pink-700', borderColor: 'border-pink-200' },
    activity: { icon: Mountain, color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-700', borderColor: 'border-green-200' }
  };

  const calculateTotalCost = () => {
    let total = 0;
    dayPlans.forEach(day => {
      day.activities.forEach(activity => {
        total += activity.cost || 0;
      });
    });
    return total * travelers;
  };

  const handleSaveItinerary = () => {
    console.log('Saving itinerary...', dayPlans);
    alert('Itinerary saved successfully!');
  };

  const handleUseTemplate = () => {
    // Redirect to customization or booking
    window.location.href = '/itinerary-builder';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Link 
            href="/itinerary"
            className="inline-flex items-center gap-2 text-white hover:text-emerald-100 font-semibold mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Templates
          </Link>

          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                  {itinerary.days} Days Template
                </span>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                  <span className="font-bold">{itinerary.rating}</span>
                  <span className="text-emerald-100">({itinerary.reviews} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{itinerary.title}</h1>
              <p className="text-xl text-emerald-100 mb-4">{itinerary.description}</p>
              
              <div className="flex items-center gap-6 text-emerald-100">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{itinerary.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{itinerary.users.toLocaleString()} used this</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-gray-900">
              <div className="text-sm text-gray-600 mb-1">Starting from</div>
              <div className="text-3xl font-bold text-emerald-600 mb-4">
                Rp {(itinerary.totalCost / 1000).toFixed(0)}k
              </div>
              <button 
                onClick={handleUseTemplate}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition mb-3"
              >
                Use This Template
              </button>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                {isEditing ? 'View Mode' : 'Customize Itinerary'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Itinerary Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trip Settings */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Trip Settings</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Travelers</label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Cost</label>
                  <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl font-bold text-emerald-600 flex items-center justify-center">
                    Rp {(calculateTotalCost() / 1000).toFixed(0)}k
                  </div>
                </div>
              </div>
            </div>

            {/* Day by Day Itinerary */}
            {dayPlans.map((day) => (
              <div key={day.day} className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {day.day}
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Day {day.day}</div>
                      <h3 className="text-2xl font-bold text-gray-900">{day.title}</h3>
                      <div className="text-sm text-gray-600">{day.date}</div>
                    </div>
                  </div>
                  {isEditing && (
                    <button className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-2">
                      <Plus className="w-5 h-5" />
                      Add Activity
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {day.activities.map((activity, index) => {
                    const config = activityTypeConfig[activity.type];
                    const ActivityIcon = config.icon;

                    return (
                      <div key={activity.id} className="relative">
                        {index < day.activities.length - 1 && (
                          <div className="absolute left-6 top-20 bottom-0 w-0.5 bg-gray-200 z-0"></div>
                        )}
                        
                        <div className={`relative bg-gradient-to-r from-gray-50 to-white p-5 rounded-xl border ${isEditing ? 'hover:border-emerald-300' : 'border-gray-200'} transition group`}>
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <div className={`w-12 h-12 ${config.bgColor} border-2 ${config.borderColor} rounded-full flex items-center justify-center`}>
                                <ActivityIcon className={`w-6 h-6 ${config.textColor}`} />
                              </div>
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <span className="text-emerald-600 font-bold">{activity.time}</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bgColor} ${config.textColor}`}>
                                      {activity.type}
                                    </span>
                                    <span className="text-sm text-gray-600 flex items-center gap-1">
                                      <Clock className="w-4 h-4" />
                                      {activity.duration}
                                    </span>
                                  </div>
                                  <h4 className="text-lg font-bold text-gray-900 mb-1">{activity.title}</h4>
                                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                    <MapPin className="w-4 h-4" />
                                    {activity.location}
                                  </div>
                                  <p className="text-gray-700 text-sm">{activity.description}</p>
                                  {activity.cost && activity.cost > 0 && (
                                    <div className="mt-2 text-emerald-600 font-semibold">
                                      Rp {activity.cost.toLocaleString()}
                                    </div>
                                  )}
                                </div>
                                
                                {isEditing && (
                                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition ml-4">
                                    <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 transition">
                                      <Edit2 className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition">
                                      <Trash2 className="w-4 h-4 text-gray-600" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 sticky top-24 space-y-6">
              {/* What's Included */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
                <div className="space-y-3">
                  {itinerary.includes.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Highlights</h3>
                <div className="space-y-2">
                  {itinerary.highlights.map((highlight, index) => (
                    <div key={index} className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-emerald-900 text-sm font-medium">
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={handleSaveItinerary}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-100 transition"
                  >
                    <Save className="w-5 h-5" />
                    Save Itinerary
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition">
                    <Download className="w-5 h-5" />
                    Download PDF
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition">
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-amber-900 mb-2">
                    <Heart className="w-5 h-5 text-amber-600" />
                    <span className="font-semibold">Pro Tip!</span>
                  </div>
                  <p className="text-sm text-amber-800">
                    Book at least 2 weeks in advance to get better hotel rates and availability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-xl mb-6 opacity-90">
            Customize this itinerary or use it as-is to book your perfect trip
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleUseTemplate}
              className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition transform hover:scale-105"
            >
              Use This Template
            </button>
            <Link href="/booking">
              <button className="bg-emerald-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-900 transition">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}