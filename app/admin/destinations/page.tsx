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
  Eye,
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
    {
      id: 1,
      name: "Pulau Samosir",
      category: "Pulau",
      duration: "4-6 jam",
      price: 50000,
      description: "Pulau indah di tengah Danau Toba",
      image: "🏝️",
    },
    {
      id: 2,
      name: "Bukit Holbung",
      category: "Pemandangan",
      duration: "2-3 jam",
      price: 25000,
      description: "Pemandangan spektakuler Danau Toba",
      image: "⛰️",
    },
    {
      id: 3,
      name: "Air Terjun Sipiso-piso",
      category: "Air Terjun",
      duration: "2 jam",
      price: 10000,
      description: "Air terjun setinggi 120 meter",
      image: "💦",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
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

  /* ---------------------------------------------------
     🔥 OPEN MODAL BERDASARKAN QUERY URL
  -----------------------------------------------------*/
  useEffect(() => {
    const create = searchParams.get("create");
    const editId = searchParams.get("edit");
    const viewId = searchParams.get("view");

    if (create) {
      setEditMode(false);
      setViewMode(false);
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
        setViewMode(false);
        setFormData(data);
        setShowModal(true);
      }
    }

    if (viewId) {
      const data = destinations.find((d) => d.id === Number(viewId));
      if (data) {
        setViewMode(true);
        setEditMode(false);
        setFormData(data);
        setShowModal(true);
      }
    }
  }, [searchParams]);

  const openCreateModal = () => {
    router.push("/admin/destinations?create=true");
  };

  const openEditModal = (item: Destination) => {
    router.push(`/admin/destinations?edit=${item.id}`);
  };

  const openViewModal = (item: Destination) => {
    router.push(`/admin/destinations?view=${item.id}`);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setViewMode(false);
    router.push("/admin/destinations");
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus destinasi ini?")) {
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
      setDestinations([...destinations, { ...formData, id: Date.now() }]);
    }

    closeModal();
  };

  const filtered = destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => (window.location.href = "/admin/dashboard")}
            className="p-2 hover:bg-gray-100 rounded-lg"
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
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg"
        >
          <Plus className="w-5 h-5" /> Tambah Destinasi
        </button>
      </div>

      {/* Search */}
      <div className="p-8">
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg border">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari destinasi..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Icon
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Nama
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Kategori
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Durasi
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Harga
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-3xl">{item.image}</td>

                  <td className="px-6 py-4">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-600">
                      {item.description}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {item.category}
                    </span>
                  </td>

                  <td className="px-6 py-4">{item.duration}</td>

                  <td className="px-6 py-4 font-semibold">
                    Rp {item.price.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openViewModal(item)}
                        className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => openEditModal(item)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between">
              <h3 className="text-xl font-bold">
                {viewMode
                  ? "Detail Destinasi"
                  : editMode
                  ? "Edit Destinasi"
                  : "Tambah Destinasi"}
              </h3>

              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* VIEW MODE */}
              {viewMode ? (
                <div className="space-y-4">
                  <div className="text-center text-6xl">{formData.image}</div>

                  <h2 className="text-2xl font-bold text-center">
                    {formData.name}
                  </h2>

                  <div className="text-center text-gray-500">
                    {formData.category} • {formData.duration}
                  </div>

                  <div className="text-center text-xl font-semibold text-emerald-700">
                    Rp {formData.price.toLocaleString()}
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    {formData.description}
                  </p>

                  <div className="pt-6">
                    <button
                      onClick={closeModal}
                      className="w-full py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* FORM MODE */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-semibold">Nama Destinasi</label>
                      <input
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 mt-2 border-2 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="font-semibold">Kategori</label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 mt-2 border-2 rounded-xl"
                      >
                        <option value="">Pilih Kategori</option>
                        {categories.map((cat) => (
                          <option key={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold">Durasi</label>
                      <input
                        value={formData.duration}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            duration: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 mt-2 border-2 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="font-semibold">Harga (Rp)</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            price: Number(e.target.value),
                          })
                        }
                        className="w-full px-4 py-3 mt-2 border-2 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold">Deskripsi</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-4 py-3 mt-2 border-2 rounded-xl resize-none"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={closeModal}
                      className="flex-1 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50"
                    >
                      Batal
                    </button>

                    <button
                      onClick={handleSave}
                      className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      {editMode ? "Update" : "Simpan"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
