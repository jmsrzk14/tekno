"use client";

import Link from "next/link";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";

export default function PremiumSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full border border-green-100">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
          <CheckCircle className="w-14 h-14 text-white" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Selamat! Anda Sekarang <span className="text-emerald-600">Premium Member</span>
        </h1>

        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Pembayaran berhasil diproses. Nikmati semua fitur eksklusif seperti rekomendasi AI canggih, itinerary tanpa batas, dan dukungan prioritas 24/7.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition transform hover:scale-105"
          >
            Mulai Jelajahi Sekarang
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-10">
          Terima kasih telah mempercayakan perjalanan Anda bersama kami
        </p>
      </div>
    </div>
  );
}