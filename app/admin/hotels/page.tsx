"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const params = useSearchParams();

  const modal = params.get("modal"); // create | view | edit | delete
  const hotelId = params.get("id");

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

  const [formData, setFormData] = useState<HotelItem>({
    id: 0,
    name: "",
    type: "",
    location: "",
    pricePerNight: 0,
    rating: 0,
    facilities: [],
    description: "",
    image: "🏨",
  });

  const types = ["Hotel", "Resort", "Guest House", "Villa", "Homestay"];
  const locations = ["Parapat", "Samosir", "Tuktuk", "Tomok", "Balige"];
  const facilitiesList = [
    "WiFi",
    "Restaurant",
    "Pool",
    "Spa",
    "Breakfast",
    "Parking",
  ];

  // === OPEN MODALS BY SETTING URL ===
  const openCreate = () => router.push("?modal=create");
  const openView = (id: number) => router.push(`?modal=view&id=${id}`);
  const openEdit = (id: number) => router.push(`?modal=edit&id=${id}`);
  const openDelete = (id: number) => router.push(`?modal=delete&id=${id}`);

  const closeModal = () => router.push("/admin/hotels");

  // === LOAD DATA WHEN URL CHANGES ===
  useEffect(() => {
    if (hotelId) {
      const h = hotels.find((x) => x.id === Number(hotelId));
      if (h) setFormData(h);
    } else {
      setFormData({
        id: 0,
        name: "",
        type: "",
        location: "",
        pricePerNight: 0,
        rating: 0,
        facilities: [],
        description: "",
        image: "🏨",
      });
    }
  }, [hotelId]);

  const saveHotel = () => {
    if (modal === "edit") {
      setHotels((prev) =>
        prev.map((h) => (h.id === formData.id ? formData : h))
      );
    } else {
      setHotels((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const deleteHotel = () => {
    setHotels((prev) => prev.filter((h) => h.id !== Number(hotelId)));
    closeModal();
  };

  // SEARCH
  const [search, setSearch] = useState("");
  const filtered = hotels.filter(
    (h) =>
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.location.toLowerCase().includes(search.toLowerCase()) ||
      h.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Manajemen Hotel</h1>
            <p className="text-gray-500">Kelola hotel di Danau Toba</p>
          </div>
        </div>

        <button
          onClick={openCreate}
          className="px-5 py-3 rounded-xl bg-purple-600 text-white flex items-center gap-2"
        >
          <Plus /> Tambah Hotel
        </button>
      </div>

      {/* SEARCH */}
      <div className="p-8">
        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari hotel..."
              className="w-full pl-10 py-3 border rounded-xl"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="mt-6 bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="p-4 text-left">Icon</th>
                <th className="p-4 text-left">Nama</th>
                <th className="p-4 text-left">Tipe</th>
                <th className="p-4 text-left">Lokasi</th>
                <th className="p-4 text-left">Harga</th>
                <th className="p-4 text-left">Rating</th>
                <th className="p-4 text-left">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((h) => (
                <tr
                  key={h.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 text-3xl">{h.image}</td>
                  <td className="p-4">{h.name}</td>
                  <td className="p-4">{h.type}</td>
                  <td className="p-4">{h.location}</td>
                  <td className="p-4">Rp {h.pricePerNight.toLocaleString()}</td>
                  <td className="p-4 flex items-center gap-1">
                    <Star className="text-yellow-400 fill-yellow-400" />
                    {h.rating}
                  </td>
                  <td className="p-4 gap-2">
                    <button
                      onClick={() => openView(h.id)}
                      className="p-2 mx-1 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg"
                    >
                      <Eye />
                    </button>
                    <button
                      onClick={() => openEdit(h.id)}
                      className="p-2 mx-1 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg"
                    >
                      <Edit />
                    </button>
                    <button
                      onClick={() => openDelete(h.id)}
                      className="p-2 mx-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg"
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6 relative">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-gray-600 hover:text-black"
            >
              <X />
            </button>

            {/* ==== VIEW HOTEL ==== */}
            {modal === "view" && (
              <>
                <h2 className="text-2xl font-bold mb-4">Detail Hotel</h2>
                <p className="text-6xl mb-4">{formData.image}</p>
                <p className="font-bold text-xl">{formData.name}</p>
                <p className="text-gray-600 mb-2">{formData.type}</p>
                <p className="mb-2">Lokasi: {formData.location}</p>
                <p className="mb-2">
                  Harga: Rp {formData.pricePerNight.toLocaleString()}
                </p>
                <p className="mb-2">Rating: ⭐ {formData.rating}</p>
                <p className="mb-4">
                  Fasilitas: {formData.facilities.join(", ")}
                </p>
                <p className="text-gray-800">{formData.description}</p>
              </>
            )}

            {/* ==== DELETE CONFIRM ==== */}
            {modal === "delete" && (
              <div className="text-center">
                <h2 className="text-xl font-bold mb-4">
                  Hapus Hotel "{formData.name}"?
                </h2>
                <p className="text-gray-600 mb-6">
                  Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 py-2 border rounded-xl"
                  >
                    Batal
                  </button>
                  <button
                    onClick={deleteHotel}
                    className="flex-1 py-2 bg-red-600 text-white rounded-xl"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            )}

            {/* ==== CREATE & EDIT ==== */}
            {(modal === "create" || modal === "edit") && (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  {modal === "create" ? "Tambah Hotel" : "Edit Hotel"}
                </h2>

                {/* Form */}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Nama Hotel"
                    className="border p-3 rounded-xl"
                  />

                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="border p-3 rounded-xl"
                  >
                    <option value="">Pilih Tipe</option>
                    {types.map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>

                  <select
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="border p-3 rounded-xl"
                  >
                    <option value="">Pilih Lokasi</option>
                    {locations.map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>

                  <input
                    type="number"
                    value={formData.pricePerNight}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pricePerNight: parseInt(e.target.value),
                      })
                    }
                    placeholder="Harga / malam"
                    className="border p-3 rounded-xl"
                  />

                  <input
                    type="number"
                    value={formData.rating}
                    step="0.1"
                    min={0}
                    max={5}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        rating: parseFloat(e.target.value),
                      })
                    }
                    placeholder="Rating"
                    className="border p-3 rounded-xl"
                  />
                </div>

                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  placeholder="Deskripsi hotel..."
                  className="w-full mt-4 p-3 border rounded-xl"
                />

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={closeModal}
                    className="flex-1 py-2 border rounded-xl"
                  >
                    Batal
                  </button>

                  <button
                    onClick={saveHotel}
                    className="flex-1 py-2 bg-purple-600 text-white rounded-xl flex items-center justify-center gap-2"
                  >
                    <Save /> Simpan
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
