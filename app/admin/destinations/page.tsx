"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  ArrowLeft,
  X,
  Save,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface Destination {
  id: number;
  name: string;
  category: string;
  duration: string;
  price: number;
  description: string;
  image: string;
}

export default function DestinationsAdmin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [destinations, setDestinations] = useState<Destination[]>([
    { id: 1, name: "Pulau Samosir", category: "Pulau", duration: "4-6 jam", price: 50000, description: "Pulau indah di tengah Danau Toba", image: "🏝️" },
    { id: 2, name: "Bukit Holbung", category: "Pemandangan", duration: "2-3 jam", price: 25000, description: "Pemandangan spektakuler Danau Toba", image: "⛰️" },
    { id: 3, name: "Air Terjun Sipiso-piso", category: "Air Terjun", duration: "2 jam", price: 10000, description: "Air terjun setinggi 120 meter", image: "💦" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState<Destination>({
    id: 0,
    name: "",
    category: "",
    duration: "",
    price: 0,
    description: "",
    image: "🏖️",
  });

  const categories = [
    "Pulau",
    "Pemandangan",
    "Air Terjun",
    "Pantai",
    "Budaya",
    "Museum",
    "Wisata Alam",
  ];

  /* ----------------------------------------------
      🔥 OPEN MODAL BASED ON URL QUERY PARAMS
  ------------------------------------------------*/
  useEffect(() => {
    const create = searchParams.get("create");
    const editId = searchParams.get("edit");

    if (create) {
      setEditMode(false);
      setFormData({
        id: 0,
        name: "",
        category: "",
        duration: "",
        price: 0,
        description: "",
        image: "🏖️",
      });
      setShowModal(true);
    }

    if (editId) {
      const data = destinations.find((d) => d.id === Number(editId));
      if (data) {
        setEditMode(true);
        setFormData(data);
        setShowModal(true);
      }
    }
  }, [searchParams]);

  /* ---------------------------------------------- */

  const openCreateModal = () => {
    router.push("/admin/destinations?create=true");
  };

  const openEditModal = (destination: Destination) => {
    router.push(`/admin/destinations?edit=${destination.id}`);
  };

  const closeModal = () => {
    setShowModal(false);
    router.push("/admin/destinations"); // 🧹 Bersihkan URL
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus destinasi ini?")) {
      setDestinations(destinations.filter((d) => d.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.category || !formData.price) {
      alert("Mohon lengkapi semua field!");
      return;
    }

    if (editMode) {
      setDestinations(
        destinations.map((d) => (d.id === formData.id ? formData : d))
      );
    } else {
      const newDest = { ...formData, id: Date.now() };
      setDestinations([...destinations, newDest]);
    }

    closeModal();
  };

  const filteredDestinations = destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => (window.location.href = "/admin/dashboard")}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Manajemen Destinasi
              </h1>
              <p className="text-gray-600 text-sm">
                Kelola destinasi wisata Danau Toba
              </p>
            </div>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition"
          >
            <Plus className="w-5 h-5" />
            Tambah Destinasi
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Search */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-gray-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari destinasi..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Icon</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Nama</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Kategori</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Durasi</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Harga</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredDestinations.map((dest) => (
                  <tr key={dest.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-3xl">{dest.image}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">
                        {dest.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {dest.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {dest.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{dest.duration}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      Rp {dest.price.toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(dest)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(dest.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">
                {editMode ? "Edit Destinasi" : "Tambah Destinasi Baru"}
              </h3>

              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Destinasi
                  </label>

                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500"
                    placeholder="Contoh: Pulau Samosir"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kategori
                  </label>

                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500"
                  >
                    <option value="">Pilih Kategori</option>

                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Durasi
                  </label>

                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500"
                    placeholder="Contoh: 2-3 jam"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Harga (Rp)
                  </label>

                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500"
                    placeholder="50000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi
                </label>

                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 resize-none"
                  placeholder="Deskripsi destinasi..."
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={closeModal}
                  className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
                >
                  Batal
                </button>

                <button
                  onClick={handleSave}
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editMode ? "Update" : "Simpan"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
