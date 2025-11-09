"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CreditCard, Lock, CheckCircle, ArrowRight, Calendar, Users, MapPin } from 'lucide-react';

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get step from URL, default to 1
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    passengers: 1,
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const bookingDetails = {
    destination: "Bali Paradise Package",
    duration: "5 Days 4 Nights",
    date: "15 Dec 2024 - 20 Dec 2024",
    hotel: "Grand Hyatt Bali",
    transport: "Round-trip Flight",
    price: 8500000,
    tax: 850000,
    total: 9350000
  };

  // Sync step with URL on mount and when searchParams change
  useEffect(() => {
    const stepFromUrl = searchParams.get('step');
    if (stepFromUrl) {
      const stepNumber = parseInt(stepFromUrl);
      if (stepNumber >= 1 && stepNumber <= 3) {
        setStep(stepNumber);
      }
    } else {
      // If no step in URL, set it to 1
      router.push('/booking?step=1', { scroll: false });
    }
  }, [searchParams, router]);

  // Function to change step and update URL
  const changeStep = (newStep: number) => {
    setStep(newStep);
    router.push(`/booking?step=${newStep}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Complete Your Booking</h1>
          <p className="text-xl text-gray-600">Secure payment & instant confirmation</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 mb-8">
              <div className="flex items-center justify-between">
                {[
                  { num: 1, label: 'Details' },
                  { num: 2, label: 'Payment' },
                  { num: 3, label: 'Confirm' }
                ].map((s, index) => (
                  <div key={s.num} className="flex items-center">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => s.num < step && changeStep(s.num)}
                        disabled={s.num >= step}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                          step >= s.num 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-gray-200 text-gray-500'
                        } ${s.num < step ? 'cursor-pointer hover:bg-emerald-700' : 'cursor-default'}`}
                      >
                        {step > s.num ? <CheckCircle className="w-6 h-6" /> : s.num}
                      </button>
                      <span className={`font-semibold ${step >= s.num ? 'text-emerald-600' : 'text-gray-500'}`}>
                        {s.label}
                      </span>
                    </div>
                    {index < 2 && (
                      <div className={`w-20 h-1 mx-4 ${step > s.num ? 'bg-emerald-600' : 'bg-gray-200'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Personal Details */}
            {step === 1 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        value={bookingData.email}
                        onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        placeholder="+62 812 3456 7890"
                        className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Passengers</label>
                    <select
                      value={bookingData.passengers}
                      onChange={(e) => setBookingData({ ...bookingData, passengers: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-emerald-600 rounded border-emerald-300 focus:ring-emerald-500" />
                      <span className="text-sm text-gray-700">
                        I agree to the <a href="#" className="text-emerald-600 font-semibold hover:underline">Terms & Conditions</a> and <a href="#" className="text-emerald-600 font-semibold hover:underline">Privacy Policy</a>
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={() => changeStep(2)}
                  className="mt-8 w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  Continue to Payment
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-6 h-6 text-emerald-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Secure Payment</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {['Credit Card', 'Debit Card', 'Bank Transfer'].map((method) => (
                        <button
                          key={method}
                          className="p-4 border-2 border-emerald-600 bg-emerald-50 rounded-xl font-semibold text-emerald-700 hover:bg-emerald-100 transition"
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number *</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={bookingData.cardNumber}
                        onChange={(e) => setBookingData({ ...bookingData, cardNumber: e.target.value })}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-12"
                      />
                      <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        value={bookingData.expiryDate}
                        onChange={(e) => setBookingData({ ...bookingData, expiryDate: e.target.value })}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">CVV *</label>
                      <input
                        type="text"
                        value={bookingData.cvv}
                        onChange={(e) => setBookingData({ ...bookingData, cvv: e.target.value })}
                        placeholder="123"
                        maxLength={3}
                        className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                    <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                      <p className="font-semibold mb-1">Your payment is secure</p>
                      <p className="text-blue-700">We use industry-standard encryption to protect your information</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => changeStep(1)}
                    className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => changeStep(3)}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    Complete Booking
                    <CheckCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 text-center">
                <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed! 🎉</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Your booking has been successfully confirmed. Check your email for details.
                </p>

                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <div className="grid grid-cols-2 gap-6 text-left">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Booking ID</p>
                      <p className="font-bold text-gray-900">BK-2024-12-001</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Paid</p>
                      <p className="font-bold text-emerald-600">Rp {bookingDetails.total.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => router.push('/profile')}
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition"
                  >
                    View Booking Details
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition">
                    Download Receipt
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">{bookingDetails.destination}</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{bookingDetails.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{bookingDetails.hotel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{bookingData.passengers} Passenger{bookingData.passengers > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Package Price</span>
                  <span>Rp {bookingDetails.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax & Service</span>
                  <span>Rp {bookingDetails.tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span className="text-emerald-600">Rp {bookingDetails.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <p className="text-sm text-emerald-900">
                  <span className="font-semibold">Special Offer:</span> Get 10% cashback for your next booking!
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span className="font-semibold text-emerald-600">Step {step} of 3</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-500"
                    style={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}