"use client";

import React, { useState } from 'react';
import { Bus, Car, User, Mail, Phone, MapPin, Calendar, Users, CreditCard, Building, Smartphone, QrCode, ArrowLeft, ArrowRight, Check, Shield, Clock, AlertCircle } from 'lucide-react';

export default function TransportBookingPage() {
  const [step, setStep] = useState(1);
  const [transportType] = useState('bus'); // 'bus' or 'car'
  const [bookingData, setBookingData] = useState({
    // Passenger Info
    fullName: '',
    email: '',
    phone: '',
    idNumber: '',
    // Booking Details
    pickupLocation: '',
    dropLocation: '',
    specialRequest: '',
    // Payment
    paymentMethod: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  // Sample transport data
  const transport = {
    type: transportType,
    operator: transportType === 'bus' ? 'Pahala Kencana' : 'Toyota Avanza',
    class: transportType === 'bus' ? 'Executive' : 'MPV',
    departure: 'Jakarta',
    arrival: 'Bandung',
    departureTime: '07:00',
    arrivalTime: '10:30',
    date: '2024-01-15',
    duration: '3h 30m',
    price: 150000,
    seats: transportType === 'bus' ? 2 : 1,
    facilities: ['AC', 'Reclining Seat', 'Charging Port']
  };

  const handleInputChange = (field, value) => {
    setBookingData({ ...bookingData, [field]: value });
  };

  const handleNextStep = () => {
    if (step === 1) {
      // Validate passenger info
      if (!bookingData.fullName || !bookingData.email || !bookingData.phone) {
        alert('Mohon lengkapi semua data penumpang');
        return;
      }
    }
    if (step === 2) {
      // Validate payment method
      if (!bookingData.paymentMethod) {
        alert('Mohon pilih metode pembayaran');
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setBookingComplete(true);
    }, 2000);
  };

  const formatCurrency = (amount) => {
    return `Rp ${amount.toLocaleString()}`;
  };

  const totalPrice = transport.price * transport.seats;
  const adminFee = 5000;
  const insuranceFee = 10000;
  const grandTotal = totalPrice + adminFee + insuranceFee;

  // Booking Complete Screen
  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20 flex items-center justify-center">
        <div className="max-w-2xl w-full mx-4">
          <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Pembayaran Berhasil!</h2>
            <p className="text-gray-600 mb-8">Booking Anda telah dikonfirmasi</p>

            {/* Booking Details */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 mb-6 border border-green-200 text-left">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-green-200">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Kode Booking</div>
                  <div className="text-2xl font-bold text-emerald-600">BKG-2024-{Math.floor(Math.random() * 10000)}</div>
                </div>
                <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold">
                  Confirmed
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Nama Penumpang</div>
                  <div className="font-semibold text-gray-900">{bookingData.fullName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Email</div>
                  <div className="font-semibold text-gray-900">{bookingData.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">No. Telepon</div>
                  <div className="font-semibold text-gray-900">{bookingData.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Tanggal Keberangkatan</div>
                  <div className="font-semibold text-gray-900">{transport.date}</div>
                </div>
              </div>

              <div className="border-t border-green-200 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">{transport.operator}</span>
                  <span className="font-bold text-gray-900">{formatCurrency(grandTotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{transport.departure} → {transport.arrival}</span>
                  <span>{transport.departureTime} - {transport.arrivalTime}</span>
                </div>
              </div>
            </div>

            {/* E-Ticket Info */}
            <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
              <div className="flex items-start gap-3 text-left">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">E-Ticket Dikirim</p>
                  <p className="text-xs text-gray-600">
                    E-ticket dan detail booking telah dikirim ke email Anda. Silakan cek inbox atau folder spam.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 border-2 border-emerald-600 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition"
              >
                Print E-Ticket
              </button>
              <button
                onClick={() => window.location.href = '/transportation'}
                className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
              >
                Booking Lagi
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((s, index) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition ${
                    step >= s 
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > s ? <Check className="w-6 h-6" /> : s}
                  </div>
                  <div className={`text-sm mt-2 font-semibold ${
                    step >= s ? 'text-emerald-600' : 'text-gray-500'
                  }`}>
                    {s === 1 ? 'Data Diri' : s === 2 ? 'Pembayaran' : 'Konfirmasi'}
                  </div>
                </div>
                {index < 2 && (
                  <div className={`w-24 h-1 mx-4 rounded transition ${
                    step > s ? 'bg-emerald-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Passenger Information */}
            {step === 1 && (
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Penumpang</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={bookingData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="Nama sesuai KTP/Paspor"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={bookingData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="email@example.com"
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        No. Telepon <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          value={bookingData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="08123456789"
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      No. KTP/Paspor
                    </label>
                    <input
                      type="text"
                      value={bookingData.idNumber}
                      onChange={(e) => handleInputChange('idNumber', e.target.value)}
                      placeholder="Nomor identitas"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {transportType === 'bus' && (
                    <>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Titik Jemput
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              value={bookingData.pickupLocation}
                              onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                              placeholder="Terminal/Lokasi penjemputan"
                              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Titik Antar
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              value={bookingData.dropLocation}
                              onChange={(e) => handleInputChange('dropLocation', e.target.value)}
                              placeholder="Terminal/Lokasi tujuan"
                              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Permintaan Khusus (Opsional)
                    </label>
                    <textarea
                      value={bookingData.specialRequest}
                      onChange={(e) => handleInputChange('specialRequest', e.target.value)}
                      placeholder="Contoh: Butuh kursi roda, traveling dengan bayi, dll"
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 resize-none"
                    />
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">Informasi Penting</p>
                        <p className="text-xs text-gray-600">
                          Pastikan data yang Anda masukkan sudah benar. E-ticket akan dikirim ke email yang terdaftar.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Metode Pembayaran</h2>

                <div className="space-y-4">
                  {/* Credit Card */}
                  <button
                    onClick={() => handleInputChange('paymentMethod', 'credit-card')}
                    className={`w-full p-4 border-2 rounded-xl transition flex items-center gap-4 ${
                      bookingData.paymentMethod === 'credit-card'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-lg">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-bold text-gray-900">Credit/Debit Card</div>
                      <div className="text-sm text-gray-600">Visa, Mastercard, JCB</div>
                    </div>
                    {bookingData.paymentMethod === 'credit-card' && (
                      <Check className="w-6 h-6 text-emerald-600" />
                    )}
                  </button>

                  {/* Bank Transfer */}
                  <button
                    onClick={() => handleInputChange('paymentMethod', 'bank-transfer')}
                    className={`w-full p-4 border-2 rounded-xl transition flex items-center gap-4 ${
                      bookingData.paymentMethod === 'bank-transfer'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-lg">
                      <Building className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-bold text-gray-900">Bank Transfer</div>
                      <div className="text-sm text-gray-600">BCA, Mandiri, BNI, BRI</div>
                    </div>
                    {bookingData.paymentMethod === 'bank-transfer' && (
                      <Check className="w-6 h-6 text-emerald-600" />
                    )}
                  </button>

                  {/* E-Wallet */}
                  <button
                    onClick={() => handleInputChange('paymentMethod', 'e-wallet')}
                    className={`w-full p-4 border-2 rounded-xl transition flex items-center gap-4 ${
                      bookingData.paymentMethod === 'e-wallet'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="bg-gradient-to-br from-green-100 to-green-200 p-3 rounded-lg">
                      <Smartphone className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-bold text-gray-900">E-Wallet</div>
                      <div className="text-sm text-gray-600">GoPay, OVO, Dana, ShopeePay</div>
                    </div>
                    {bookingData.paymentMethod === 'e-wallet' && (
                      <Check className="w-6 h-6 text-emerald-600" />
                    )}
                  </button>

                  {/* QRIS */}
                  <button
                    onClick={() => handleInputChange('paymentMethod', 'qris')}
                    className={`w-full p-4 border-2 rounded-xl transition flex items-center gap-4 ${
                      bookingData.paymentMethod === 'qris'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="bg-gradient-to-br from-red-100 to-red-200 p-3 rounded-lg">
                      <QrCode className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-bold text-gray-900">QRIS</div>
                      <div className="text-sm text-gray-600">Scan & Pay instantly</div>
                    </div>
                    {bookingData.paymentMethod === 'qris' && (
                      <Check className="w-6 h-6 text-emerald-600" />
                    )}
                  </button>
                </div>

                <div className="mt-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-emerald-600" />
                    <p className="text-sm text-gray-700">
                      Pembayaran Anda dilindungi dengan enkripsi standar industri
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Konfirmasi Booking</h2>

                {/* Passenger Info Review */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Data Penumpang</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Nama:</span>
                      <div className="font-semibold text-gray-900">{bookingData.fullName}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <div className="font-semibold text-gray-900">{bookingData.email}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">No. Telepon:</span>
                      <div className="font-semibold text-gray-900">{bookingData.phone}</div>
                    </div>
                    {bookingData.idNumber && (
                      <div>
                        <span className="text-gray-600">No. KTP:</span>
                        <div className="font-semibold text-gray-900">{bookingData.idNumber}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Method Review */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Metode Pembayaran</h3>
                  <div className="flex items-center gap-3">
                    {bookingData.paymentMethod === 'credit-card' && <CreditCard className="w-5 h-5 text-blue-600" />}
                    {bookingData.paymentMethod === 'bank-transfer' && <Building className="w-5 h-5 text-purple-600" />}
                    {bookingData.paymentMethod === 'e-wallet' && <Smartphone className="w-5 h-5 text-green-600" />}
                    {bookingData.paymentMethod === 'qris' && <QrCode className="w-5 h-5 text-red-600" />}
                    <span className="font-semibold text-gray-900">
                      {bookingData.paymentMethod === 'credit-card' && 'Credit/Debit Card'}
                      {bookingData.paymentMethod === 'bank-transfer' && 'Bank Transfer'}
                      {bookingData.paymentMethod === 'e-wallet' && 'E-Wallet'}
                      {bookingData.paymentMethod === 'qris' && 'QRIS'}
                    </span>
                  </div>
                </div>

                {/* Terms */}
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 mb-6">
                  <div className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" required />
                    <p className="text-sm text-gray-700">
                      Saya setuju dengan <span className="text-emerald-600 font-semibold cursor-pointer">syarat dan ketentuan</span> yang berlaku, termasuk kebijakan pembatalan dan pengembalian dana.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Memproses Pembayaran...
                    </>
                  ) : (
                    <>
                      Bayar Sekarang {formatCurrency(grandTotal)}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
            {step < 3 && (
              <div className="flex gap-4 mt-6">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Kembali
                  </button>
                )}
                <button
                  onClick={handleNextStep}
                  className="flex-1 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold hover:shadow-xl transition flex items-center justify-center gap-2"
                >
                  Lanjutkan
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-green-100 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h3>

              {/* Transport Info */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 mb-6 border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  {transportType === 'bus' ? (
                    <Bus className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <Car className="w-6 h-6 text-emerald-600" />
                  )}
                  <div>
                    <div className="font-bold text-gray-900">{transport.operator}</div>
                    <div className="text-sm text-gray-600">{transport.class}</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-4 h-4" />
                    <span>{transport.departure} → {transport.arrival}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-4 h-4" />
                    <span>{transport.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-4 h-4" />
                    <span>{transport.departureTime} - {transport.arrivalTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users className="w-4 h-4" />
                    <span>{transport.seats} {transportType === 'bus' ? 'Penumpang' : 'Unit'}</span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Harga tiket ({transport.seats}x)</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Biaya admin</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(adminFee)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Asuransi perjalanan</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(insuranceFee)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total Pembayaran</span>
                    <span className="text-2xl font-bold text-emerald-600">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Facilities */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Fasilitas:</h4>
                <div className="space-y-2">
                  {transport.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">Butuh Bantuan?</p>
                    <p className="text-xs text-gray-600 mb-2">Hubungi customer service kami</p>
                    <a href="tel:+6281234567890" className="text-sm font-bold text-blue-600">
                      +62 812-3456-7890
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}