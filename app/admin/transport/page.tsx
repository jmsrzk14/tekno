"use client";

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, Car, DollarSign, Users, X, Save, ArrowLeft, Settings } from 'lucide-react';

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
      image: "🚗" 
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
      image: "🛵" 
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
      image: "🚐" 
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState<Transport>({
    id: 0,
    name: '',
    type: '',
    capacity: 0,
    pricePerDay: 0,
    driver: false,
    features: [],
    description: '',
    image: '🚗'
  });

  const types = ['Mobil', 'Motor', 'Minibus', 'Bus', 'Sepeda', 'Kapal'];
  const availableFeatures = ['AC', 'Audio', 'GPS', 'WiFi', 'TV', 'Reclining Seat', 'Helm', 'Jaket', 'USB Charger'];

  const handleAdd = () => {
    setEditMode(false);
    setFormData({
      id: 0,
      name: '',
      type: '',
      capacity: 0,
      pricePerDay: 0,
      driver: false,
      features: [],
      description: '',
      image: '🚗'
    });
    setShowModal(true);
  };

  const handleEdit = (transport: Transport) => {
    setEditMode(true);
    setFormData(transport);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus transportasi ini?')) {
      setTransports(transports.filter(t => t.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.type || !formData.capacity || !formData.pricePerDay) {
      alert('Mohon lengkapi semua field!');
      return;
    }

    if (editMode) {
      setTransports(transports.map(t => t.id === formData.id ? formData : t));
    } else {
      const newTransport = { ...formData, id: Date.now() };
      setTransports([...transports, newTransport]);
    }
    setShowModal(false);
  };

  const toggleFeature = (feature: string) => {
    const features = formData.features.includes(feature)
      ? formData.features.filter(f => f !== feature)
      : [...formData.features, feature];
    setFormData({ ...formData, features });
  };

  const filteredTransports = transports.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.location.href = '/admin/dashboard'}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manajemen Transportasi</h1>
              <p className="text-gray-600 text-sm">Kelola kendaraan rental & transportasi</p>
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition"
          >
            <Plus className="w-5 h-5" />
            Tambah Transportasi
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
              placeholder="Cari transportasi..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Icon</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Nama</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Tipe</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Kapasitas</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Harga/Hari</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Driver</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Fitur</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransports.map((transport) => (
                  <tr key={transport.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <span className="text-3xl">{transport.image}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{transport.name}</div>
                      <div className="text-sm text-gray-600">{transport.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {transport.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Users className="w-4 h-4" />
                        <span className="font-semibold">{transport.capacity}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">
                      Rp {transport.pricePerDay.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {transport.driver ? (
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                          Dengan Driver
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                          Tanpa Driver
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {transport.features.slice(0, 2).map((feat, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {feat}
                          </span>
                        ))}
                        {transport.features.length > 2 && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            +{transport.features.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(transport)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(transport.id)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">
                {editMode ? 'Edit Transportasi' : 'Tambah Transportasi Baru'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Kendaraan
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                    placeholder="Contoh: Toyota Avanza"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipe
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                  >
                    <option value="">Pilih Tipe</option>
                    {types.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kapasitas Penumpang
                  </label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                    placeholder="7"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Harga per Hari (Rp)
                  </label>
                  <input
                    type="number"
                    value={formData.pricePerDay}
                    onChange={(e) => setFormData({ ...formData, pricePerDay: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                    placeholder="400000"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.driver}
                      onChange={(e) => setFormData({ ...formData, driver: e.target.checked })}
                      className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">
                      Termasuk Driver
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fitur & Kelengkapan
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableFeatures.map((feature) => (
                    <button
                      key={feature}
                      type="button"
                      onClick={() => toggleFeature(feature)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                        formData.features.includes(feature)
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 resize-none"
                  placeholder="Deskripsi kendaraan..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editMode ? 'Update' : 'Simpan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}