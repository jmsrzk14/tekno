"use client";

import React, { useState } from "react";
import { ArrowLeft, CreditCard, User, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BookingPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    people: 2,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ Pemesanan berhasil!\nKami akan menghubungi Anda segera.");
    router.push("/"); // bisa diarahkan ke halaman sukses
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-green-100">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-emerald-600 mb-6"
        >
          <ArrowLeft className="w-5 h-5" /> Kembali
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">Formulir Pemesanan</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
            <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Nama Anda"
                className="flex-1 bg-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="email@example.com"
                className="flex-1 bg-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
            <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50">
              <Phone className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="0812xxxxxxx"
                className="flex-1 bg-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Orang</label>
            <input
              type="number"
              name="people"
              value={form.people}
              onChange={handleChange}
              min="1"
              className="w-full border rounded-xl px-3 py-2 bg-gray-50 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" /> Lanjutkan Pembayaran
          </button>
        </form>

        <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <h2 className="font-bold text-emerald-700 mb-2">Ringkasan Paket</h2>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Paket:</span> Danau Toba 3 Hari - Standar <br />
            <span className="font-medium">Total:</span> Rp 1.500.000 / orang
          </p>
        </div>
      </div>
    </div>
  );
}
