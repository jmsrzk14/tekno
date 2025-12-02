"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Star,
  X,
  Save,
  ArrowLeft,
} from "lucide-react";

interface HotelItem {
  id: number;
  name: string;
  type: string;
  location: string;
  pricePerNight: number;
  rating: number;
  facilities: string[];
  description: string;
  image: string;
}

export default function HotelAdmin() {
  // ===================== DATA =====================
  const [hotels, setHotels] = useState<HotelItem[]>([
    {
      id: 1,
      name: "Toledo Inn",
      type: "Hotel",
      location: "Parapat",
      pricePerNight: 350000,
      rating: 4.6,
      facilities: ["WiFi", "Restaurant", "Pool"],
      description: "Hotel nyaman dengan pemandangan Danau Toba",
      image: "🏨",
    },
    {
      id: 2,
      name: "Samosir Villa Resort",
      type: "Resort",
      location: "Samosir",
      pricePerNight: 550000,
      rating: 4.8,
      facilities: ["WiFi", "Restaurant", "Spa"],
      description: "Resort mewah di tepi Danau Toba",
      image: "🏖️",
    },
    {
      id: 3,
      name: "Danau Toba Guest House",
      type: "Guest House",
      location: "Tuktuk",
      pricePerNight: 150000,
      rating: 4.3,
      facilities: ["WiFi", "Breakfast"],
      description: "Penginapan budget dengan suasana homey",
      image: "🏠",
    },
  ]);

  // ===================== MODAL CONTROL =====================
  const [modalType, setModalType] = useState<
    "create" | "edit" | "delete" | null
  >(null);
  const [showModal, setShowModal] = useState(false);

  // Sync modal URL
  const openModalWithUrl = (query: string) => {
    window.history.pushState({}, "", `/admin/hotel?${query}`);
    setShowModal(true);
  };

  const closeModal = () => {
    window.history.pushState({}, "", "/admin/hotel");
    setShowModal(false);
    setModalType(null);
  };

  // ===================== FORM STATE =====================
  const emptyForm: HotelItem = {
    id: 0,
    name: "",
    type: "",
    location: "",
    pricePerNight: 0,
    rating: 0,
    facilities: [],
    description: "",
    image: "🏨",
  };

  const [formData, setFormData] = useState<HotelItem>(emptyForm);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // ===================== OPTIONS =====================
  const types = ["Hotel", "Resort", "Guest House", "Villa", "Homestay", "Cottage"];
  const locations = ["Parapat", "Samosir", "Tuktuk", "Tomok", "Balige", "Siantar"];
  const availableFacilities = [
    "WiFi",
    "Restaurant",
    "Pool",
    "Spa",
    "Breakfast",
    "Parking",
    "Gym",
    "Beach Access",
  ];

  const [searchQuery, setSearchQuery] = useState("");

  // ===================== ACTION HANDLERS =====================

  const handleCreate = () => {
    setModalType("create");
    setFormData(emptyForm);
    openModalWithUrl("modal=create");
  };

  const handleEdit = (hotel: HotelItem) => {
    setModalType("edit");
    setFormData(hotel);
    openModalWithUrl(`modal=edit&id=${hotel.id}`);
  };

  const handleDelete = (id: number) => {
    setModalType("delete");
    setDeleteId(id);
    openModalWithUrl(`modal=delete&id=${id}`);
  };

  const handleSave = () => {
    if (!formData.name || !formData.type || !formData.location) {
      alert("Mohon lengkapi semua field!");
      return;
    }

    if (modalType === "edit") {
      setHotels(hotels.map(h => (h.id === formData.id ? formData : h)));
    } else {
      const newHotel = { ...formData, id: Date.now() };
      setHotels([...hotels, newHotel]);
    }

    closeModal();
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    setHotels(hotels.filter(h => h.id !== deleteId));
    closeModal();
  };

  const toggleFacility = (facility: string) => {
    const updatedFacilities = formData.facilities.includes(facility)
      ? formData.facilities.filter(f => f !== facility)
      : [...formData.facilities, facility];

    setFormData({ ...formData, facilities: updatedFacilities });
  };

  // ===================== AUTO OPEN MODAL FROM URL =====================
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const modal = params.get("modal");
    const id = params.get("id");

    if (modal === "create") {
      setModalType("create");
      setFormData(emptyForm);
      setShowModal(true);
    }

    if (modal === "edit" && id) {
      const found = hotels.find(h => h.id === Number(id));
      if (found) {
        setModalType("edit");
        setFormData(found);
        setShowModal(true);
      }
    }

    if (modal === "delete" && id) {
      setModalType("delete");
      setDeleteId(Number(id));
      setShowModal(true);
    }
  }, []);

  // ===================== FILTER =====================
  const filteredHotels = hotels.filter(h =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // =====================================================================
  // ========================== UI START ================================
  // =====================================================================

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => (window.location.href = "/admin/dashboard")}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Manajemen Hotel</h1>
            <p className="text-gray-600 text-sm">Kelola penginapan di Danau Toba</p>
          </div>
        </div>

        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Tambah Hotel
        </button>
      </div>

      {/* SEARCH */}
      <div className="p-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-3 text-gray-400 w-5 h-5" />
            <input
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl"
              placeholder="Cari hotel..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <tr>
                <th className="px-6 py-4">Icon</th>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4">Tipe</th>
                <th className="px-6 py-4">Lokasi</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredHotels.map(hotel => (
                <tr key={hotel.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-3xl">{hotel.image}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold">{hotel.name}</div>
                    <div className="text-sm text-gray-600">{hotel.description}</div>
                  </td>
                  <td className="px-6 py-4">{hotel.type}</td>
                  <td className="px-6 py-4">{hotel.location}</td>
                  <td className="px-6 py-4 font-semibold">
                    Rp {hotel.pricePerNight.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    {hotel.rating}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(hotel)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(hotel.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg"
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

      {/* ===================== MODALS ===================== */}

      {/* CREATE / EDIT MODAL */}
      {showModal && (modalType === "create" || modalType === "edit") && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">
                {modalType === "create" ? "Tambah Hotel" : "Edit Hotel"}
              </h3>
              <button onClick={closeModal}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* FORM */}
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  className="border px-4 py-3 rounded-xl w-full"
                  placeholder="Nama Hotel"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />

                <select
                  className="border px-4 py-3 rounded-xl w-full"
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="">Pilih Tipe</option>
                  {types.map(t => (
                    <option key={t}>{t}</option>
                  ))}
                </select>

                <select
                  className="border px-4 py-3 rounded-xl w-full"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                >
                  <option value="">Pilih Lokasi</option>
                  {locations.map(l => (
                    <option key={l}>{l}</option>
                  ))}
                </select>

                <input
                  type="number"
                className="border px-4 py-3 rounded-xl"
                  placeholder="Harga"
                  value={formData.pricePerNight}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      pricePerNight: parseInt(e.target.value) || 0,
                    })
                  }
                />

                <input
                  type="number"
                  step="0.1"
                  className="border px-4 py-3 rounded-xl"
                  placeholder="Rating (1-5)"
                  value={formData.rating}
                  onChange={e =>
                    setFormData({ ...formData, rating: parseFloat(e.target.value) })
                  }
                />
              </div>

              {/* FACILITIES */}
              <div>
                <label className="font-semibold">Fasilitas</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {availableFacilities.map(fac => (
                    <button
                      key={fac}
                      type="button"
                      className={`px-4 py-2 rounded-lg text-sm ${
                        formData.facilities.includes(fac)
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100"
                      }`}
                      onClick={() => toggleFacility(fac)}
                    >
                      {fac}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows={4}
                className="border px-4 py-3 rounded-xl w-full"
                placeholder="Deskripsi..."
                value={formData.description}
                onChange={e =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              <div className="flex gap-4">
                <button
                  onClick={closeModal}
                  className="flex-1 border py-3 rounded-xl"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-xl"
                >
                  <Save className="w-5 h-5 inline-block mr-2" />
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showModal && modalType === "delete" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl max-w-md text-center space-y-4">
            <h3 className="text-xl font-bold">Hapus Hotel?</h3>
            <p className="text-gray-600">Hotel akan dihapus secara permanen.</p>

            <div className="flex gap-4 mt-6">
              <button
                onClick={closeModal}
                className="flex-1 border py-3 rounded-xl"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white py-3 rounded-xl"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
