"use client";

import React, { useState } from "react";
import { CreditCard, Wallet, Smartphone, ArrowLeft, ShieldCheck, CheckCircle } from "lucide-react";

export default function PremiumPaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const plan = {
    name: "Premium",
    price: 99000,
    period: "per bulan",
    features: [
      "Advanced AI recommendations",
      "Unlimited itineraries",
      "Priority support 24/7",
      "Zero booking fees",
      "Exclusive travel deals",
    ],
  };

  const paymentMethods = [
    { id: "credit", label: "Kartu Kredit/Debit", icon: CreditCard },
    { id: "ewallet", label: "E-Wallet (GoPay, OVO, DANA, ShopeePay)", icon: Smartphone },
    { id: "bank", label: "Transfer Bank (BCA, BNI, Mandiri, BRI)", icon: Wallet },
  ];

  const handlePayment = () => {
    if (!selectedMethod) return alert("Pilih metode pembayaran terlebih dahulu!");

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Pembayaran Berhasil!</h2>
          <p className="text-gray-600 mb-6">
            Selamat, akun Anda telah diupgrade ke <span className="font-semibold">Premium Plan</span>.
            Nikmati semua fitur eksklusif mulai hari ini 🎉
          </p>
          <button
            onClick={() => window.location.href = "/"}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => window.history.back()}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Pembayaran Premium</h1>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Payment Options */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl border border-green-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Pilih Metode Pembayaran</h2>

            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex items-center gap-4 p-5 border-2 rounded-xl cursor-pointer transition ${
                    selectedMethod === method.id
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-200 hover:border-emerald-300"
                  }`}
                >
                  <method.icon
                    className={`w-7 h-7 ${
                      selectedMethod === method.id ? "text-emerald-600" : "text-gray-500"
                    }`}
                  />
                  <span className="text-gray-800 font-medium">{method.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Keamanan Pembayaran</h2>
              <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 p-4 rounded-xl">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
                <p className="text-gray-600 text-sm">
                  Transaksi Anda dilindungi dengan enkripsi SSL dan sistem keamanan berlapis.
                </p>
              </div>
            </div>
          </div>

          {/* Right - Plan Summary */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pembayaran</h2>

            <div className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.name} Plan</h3>
              <p className="text-sm text-gray-600">{plan.period}</p>
            </div>

            <ul className="space-y-2 mb-6 text-gray-700">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> {f}
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center border-t border-gray-200 pt-4 mb-6">
              <span className="text-gray-600 font-semibold">Total Pembayaran</span>
              <span className="text-3xl font-bold text-gray-900">
                Rp {plan.price.toLocaleString()}
              </span>
            </div>

            <button
              disabled={isProcessing}
              onClick={handlePayment}
              className={`w-full py-4 rounded-xl font-bold text-lg text-white transition ${
                isProcessing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-xl hover:scale-[1.02]"
              }`}
            >
              {isProcessing ? "Memproses Pembayaran..." : "Bayar Sekarang"}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Dengan melanjutkan, Anda menyetujui <span className="underline">Syarat & Ketentuan</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
