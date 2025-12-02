"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Users,
  X,
  Save,
  ArrowLeft,
  Eye,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface Transport {
  id: number;
  name: string;
  type: string;
  capacity: number;
  pricePerDay: number;
  driver: boolean;
  features: string[];
  description: string;
  image: string;
}

export default function TransportAdmin() {
  const router = useRouter();
  const params = useSearchParams();

  const modal = params.get("modal");
  const selectedId = params.get("id");

  const [transports, setTransports] = useState<Transport[]>([
    {
      id: 1,
      name: "Toyota Avanza",
      type: "Mobil",
      capacity: 7,
      pricePerDay: 400000,
      driver: true,
      features: ["AC", "Audio", "GPS"],
      description: "Mobil keluarga nyaman untuk wisata",
      image: "🚗",
    },
    {
      id: 2,
      name: "Motor Yamaha NMAX",
      type: "Motor",
      capacity: 2,
      pricePerDay: 80000,
      driver: false,
      features: ["Helm", "Jaket"],
      description: "Motor matic untuk jelajah pulau",
      image: "🛵",
    },
    {
      id: 3,
      name: "Hiace Commuter",
      type: "Minibus",
      capacity: 15,
      pricePerDay: 800000,
      driver: true,
      features: ["AC", "Audio", "Reclining Seat"],
      description: "Bus untuk rombongan besar",
      image: "🚐",
    },
  ]);

  const [formData, setFormData] = useState<Transport>({
    id: 0,
    name: "",
    type: "",
    capacity: 0,
    pricePerDay: 0,
    driver: false,
    features: [],
    description: "",
    image: "🚗",
  });

  const types = ["Mobil", "Motor", "Minibus", "Bus", "Sepeda", "Kapal"];
  const availableFeatures = [
    "AC",
    "Audio",
    "GPS",
    "WiFi",
    "TV",
    "Reclining Seat",
    "Helm",
    "Jaket",
    "USB Charger",
  ];

  const openModal = (mode: string, id?: number) => {
    const query = id ? `?modal=${mode}&id=${id}` : `?modal=${mode}`;
    router.push(query, { scroll: false });
  };

  const closeModal = () => {
    router.push("", { scroll: false });
  };

  useEffect(() => {
    if (modal === "edit" && selectedId) {
      const item = transports.find((t) => t.id === Number(selectedId));
      if (item) setFormData(item);
    }

    if (modal === "create") {
      setFormData({
        id: 0,
        name: "",
        type: "",
        capacity: 0,
        pricePerDay: 0,
        driver: false,
        features: [],
        description: "",
        image: "🚗",
      });
    }
  }, [modal, selectedId]);

  const handleSave = () => {
    if (!formData.name || !formData.type) {
      alert("Lengkapi semua data!");
      return;
    }

    if (modal === "edit") {
      setTransports(
        transports.map((t) => (t.id === formData.id ? formData : t))
      );
    } else {
      setTransports([...transports, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (confirm("Hapus transportasi ini?")) {
      setTransports(transports.filter((t) => t.id !== id));
    }
  };

  const toggleFeature = (feature: string) => {
    const features = formData.features.includes(feature)
      ? formData.features.filter((f) => f !== feature)
      : [...formData.features, feature];

    setFormData({ ...formData, features });
  };

  const selectedData =
    modal === "view" && selectedId
      ? transports.find((t) => t.id === Number(selectedId))
      : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => (window.location.href = "/admin/dashboard")}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Manajemen Transportasi
              </h1>
              <p className="text-gray-600 text-sm">
                Kelola kendaraan rental & transportasi
              </p>
            </div>
          </div>

          <button
            onClick={() => openModal("create")}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            <Plus className="w-5 h-5" />
            Tambah Transportasi
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="p-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Icon</th>
                <th className="px-6 py-4 text-left">Nama</th>
                <th className="px-6 py-4 text-left">Tipe</th>
                <th className="px-6 py-4 text-left">Kapasitas</th>
                <th className="px-6 py-4 text-left">Harga/Hari</th>
                <th className="px-6 py-4 text-left">Driver</th>
                <th className="px-6 py-4 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {transports.map((transport) => (
                <tr key={transport.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-3xl">{transport.image}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold">{transport.name}</div>
                    <div className="text-sm text-gray-600">
                      {transport.description}
                    </div>
                  </td>
                  <td className="px-6 py-4">{transport.type}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {transport.capacity}
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    Rp {transport.pricePerDay.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {transport.driver ? "Dengan Driver" : "Tanpa Driver"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal("view", transport.id)}
                        className="p-2 bg-gray-100 rounded-lg text-gray-700"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openModal("edit", transport.id)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(transport.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg"
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

      {/* VIEW MODAL */}
      {modal === "view" && selectedData && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Detail Transportasi</h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="text-8xl text-center mb-4">{selectedData.image}</div>

            <p><b>Nama:</b> {selectedData.name}</p>
            <p><b>Tipe:</b> {selectedData.type}</p>
            <p><b>Kapasitas:</b> {selectedData.capacity} orang</p>
            <p><b>Harga:</b> Rp {selectedData.pricePerDay.toLocaleString()}</p>
            <p><b>Driver:</b> {selectedData.driver ? "Ya" : "Tidak"}</p>

            <div className="mt-3">
              <b>Fitur:</b>
              <div className="flex gap-2 mt-1 flex-wrap">
                {selectedData.features.map((f) => (
                  <span
                    key={f}
                    className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-3">
              <b>Deskripsi:</b> {selectedData.description}
            </p>
          </div>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {(modal === "create" || modal === "edit") && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold">
                {modal === "edit" ? "Edit Transportasi" : "Tambah Transportasi"}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Nama Kendaraan"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
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
                  {types.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Kapasitas"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      capacity: parseInt(e.target.value),
                    })
                  }
                  className="border p-3 rounded-xl"
                />

                <input
                  type="number"
                  placeholder="Harga per Hari"
                  value={formData.pricePerDay}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pricePerDay: parseInt(e.target.value),
                    })
                  }
                  className="border p-3 rounded-xl"
                />
              </div>

              <textarea
                placeholder="Deskripsi"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border p-3 rounded-xl"
              />

              <b>Pilih Fitur:</b>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {availableFeatures.map((feature) => (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => toggleFeature(feature)}
                    className={`px-3 py-2 rounded-lg ${
                      formData.features.includes(feature)
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {feature}
                  </button>
                ))}
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={closeModal}
                  className="flex-1 py-3 border rounded-xl"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 bg-green-600 text-white rounded-xl flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
