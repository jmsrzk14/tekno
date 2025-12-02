"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  ArrowLeft,
  Star,
  X,
  Save,
  Eye,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface Culinary {
  id: number;
  name: string;
  category: string;
  location: string;
  priceRange: string;
  rating: number;
  description: string;
  image: string;
}

export default function CulinaryAdmin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [culinary, setCulinary] = useState<Culinary[]>([
    {
      id: 1,
      name: "RM Siantar Top",
      category: "Masakan Batak",
      location: "Parapat",
      priceRange: "Rp 30.000 - 75.000",
      rating: 4.5,
      description: "Restoran masakan Batak asli dengan cita rasa khas",
      image: "🍛",
    },
    {
      id: 2,
      name: "Warung Kopi Apan",
      category: "Kopi & Snack",
      location: "Samosir",
      priceRange: "Rp 15.000 - 35.000",
      rating: 4.8,
      description: "Kopi lokal dengan pemandangan Danau Toba",
      image: "☕",
    },
    {
      id: 3,
      name: "Arsik Ikan Mas",
      category: "Seafood",
      location: "Tuktuk",
      priceRange: "Rp 50.000 - 100.000",
      rating: 4.7,
      description: "Spesialis arsik ikan mas segar dari Danau Toba",
      image: "🐟",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState<Culinary>({
    id: 0,
    name: "",
    category: "",
    location: "",
    priceRange: "",
    rating: 0,
    description: "",
    image: "🍽️",
  });

  const categories = [
    "Masakan Batak",
    "Seafood",
    "Kopi & Snack",
    "Makanan Tradisional",
    "Restoran",
    "Cafe",
    "Street Food",
  ];

  const locations = ["Parapat", "Samosir", "Tuktuk", "Tomok", "Balige", "Siantar"];

  // =====================================================
  // HANDLE URL CHANGE & SHOW MODAL
  // =====================================================
  useEffect(() => {
    const create = searchParams.get("create");
    const editId = searchParams.get("edit");
    const viewId = searchParams.get("view");
    const deleteId = searchParams.get("delete");

    // CREATE MODE
    if (create) {
      setEditMode(false);
      setViewMode(false);
      setFormData({
        id: 0,
        name: "",
        category: "",
        location: "",
        priceRange: "",
        rating: 0,
        description: "",
        image: "🍽️",
      });
      setShowModal(true);
      return;
    }

    // EDIT MODE
    if (editId) {
      const data = culinary.find((c) => c.id === Number(editId));
      if (data) {
        setEditMode(true);
        setViewMode(false);
        setFormData(data);
        setShowModal(true);
      }
      return;
    }

    // VIEW MODE
    if (viewId) {
      const data = culinary.find((c) => c.id === Number(viewId));
      if (data) {
        setEditMode(false);
        setViewMode(true);
        setFormData(data);
        setShowModal(true);
      }
      return;
    }

    // DELETE MODE
    if (deleteId) {
      if (confirm("Apakah Anda ingin menghapus kuliner ini?")) {
        setCulinary(culinary.filter((c) => c.id !== Number(deleteId)));
      }
      router.push("/admin/culinary");
      return;
    }

    // DEFAULT: CLOSE MODAL
    setShowModal(false);
  }, [searchParams]);

  // =====================================================
  // EVENTS
  // =====================================================

  const openCreate = () => {
    router.push("/admin/culinary?create=true");
  };

  const handleEdit = (item: Culinary) => {
    router.push(`/admin/culinary?edit=${item.id}`);
  };

  const handleView = (item: Culinary) => {
    router.push(`/admin/culinary?view=${item.id}`);
  };

  const handleDelete = (item: Culinary) => {
    router.push(`/admin/culinary?delete=${item.id}`);
  };

  const closeModal = () => {
    setShowModal(false);
    router.push("/admin/culinary");
  };

  const handleSave = () => {
    if (!formData.name || !formData.category || !formData.location) {
      alert("Mohon lengkapi semua field!");
      return;
    }

    if (editMode) {
      setCulinary(culinary.map((c) => (c.id === formData.id ? formData : c)));
    } else {
      const newItem = { ...formData, id: Date.now() };
      setCulinary([...culinary, newItem]);
    }

    closeModal();
  };

  const filteredCulinary = culinary.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // =====================================================
  // UI RENDERING
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => (window.location.href = "/admin/dashboard")}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-2xl font-bold">Manajemen Kuliner</h1>
              <p className="text-sm text-gray-600">Kelola tempat kuliner Danau Toba</p>
            </div>
          </div>

          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl"
          >
            <Plus className="w-5 h-5" /> Tambah Kuliner
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="p-8">
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kuliner..."
              className="w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:border-orange-500"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
              <tr>
                <th className="px-6 py-4">Icon</th>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Lokasi</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredCulinary.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-3xl">{item.image}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-600">{item.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">{item.location}</td>
                  <td className="px-6 py-4 font-semibold">{item.priceRange}</td>
                  <td className="px-6 pt-6 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    {item.rating}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleView(item)}
                      className="p-2 mx-1 bg-green-100 text-green-600 rounded-lg"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 mx-1 bg-blue-100 text-blue-600 rounded-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(item)}
                      className="p-2 mx-1 bg-red-100 text-red-600 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* HEADER */}
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-2xl font-bold">
                {viewMode
                  ? "Detail Kuliner"
                  : editMode
                  ? "Edit Kuliner"
                  : "Tambah Kuliner"}
              </h3>

              <button onClick={closeModal} className="p-2 hover:bg-gray-200 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* FORM */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {/* NAMA */}
                <div>
                  <label className="font-semibold">Nama Tempat</label>
                  <input
                    disabled={viewMode}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-xl mt-2"
                  />
                </div>

                {/* KATEGORI */}
                <div>
                  <label className="font-semibold">Kategori</label>
                  <select
                    disabled={viewMode}
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-xl mt-2"
                  >
                    <option value="">Pilih Kategori</option>
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* LOKASI */}
                <div>
                  <label className="font-semibold">Lokasi</label>
                  <select
                    disabled={viewMode}
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-xl mt-2"
                  >
                    <option value="">Pilih Lokasi</option>
                    {locations.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </div>

                {/* HARGA */}
                <div>
                  <label className="font-semibold">Harga</label>
                  <input
                    disabled={viewMode}
                    value={formData.priceRange}
                    onChange={(e) =>
                      setFormData({ ...formData, priceRange: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-xl mt-2"
                  />
                </div>

                {/* RATING */}
                <div>
                  <label className="font-semibold">Rating (1–5)</label>
                  <input
                    type="number"
                    disabled={viewMode}
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rating: parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-4 py-3 border rounded-xl mt-2"
                  />
                </div>
              </div>

              {/* DESKRIPSI */}
              <div>
                <label className="font-semibold">Deskripsi</label>
                <textarea
                  disabled={viewMode}
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-xl mt-2"
                />
              </div>

              {/* BUTTONS */}
              {!viewMode && (
                <div className="flex gap-4">
                  <button
                    onClick={closeModal}
                    className="flex-1 py-3 border rounded-xl"
                  >
                    Batal
                  </button>

                  <button
                    onClick={handleSave}
                    className="flex-1 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {editMode ? "Update" : "Simpan"}
                  </button>
                </div>
              )}

              {viewMode && (
                <button
                  onClick={closeModal}
                  className="w-full py-3 border rounded-xl"
                >
                  Tutup
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
