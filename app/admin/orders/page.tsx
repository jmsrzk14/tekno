"use client";

import React, { useState } from 'react';
import { Search, Filter, Eye, Check, X, Clock, MapPin, Utensils, Hotel, Car, ArrowLeft, Calendar, User, Phone, Mail, DollarSign } from 'lucide-react';

interface Order {
  id: number;
  orderNumber: string;
  type: 'destinasi' | 'kuliner' | 'hotel' | 'transportasi';
  itemName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingDate: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'rejected' | 'completed';
  notes: string;
  createdAt: string;
}

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      orderNumber: 'ORD-2024-001',
      type: 'destinasi',
      itemName: 'Pulau Samosir',
      customerName: 'Budi Santoso',
      customerEmail: 'budi@email.com',
      customerPhone: '08123456789',
      bookingDate: '2024-12-15',
      quantity: 4,
      totalPrice: 200000,
      status: 'pending',
      notes: 'Tour untuk 4 orang',
      createdAt: '2024-12-01 10:30'
    },
    {
      id: 2,
      orderNumber: 'ORD-2024-002',
      type: 'kuliner',
      itemName: 'RM Siantar Top',
      customerName: 'Siti Aminah',
      customerEmail: 'siti@email.com',
      customerPhone: '08234567890',
      bookingDate: '2024-12-10',
      quantity: 2,
      totalPrice: 150000,
      status: 'confirmed',
      notes: 'Reservasi meja untuk 2 orang',
      createdAt: '2024-12-01 11:15'
    },
    {
      id: 3,
      orderNumber: 'ORD-2024-003',
      type: 'hotel',
      itemName: 'Toledo Inn',
      customerName: 'Andi Wijaya',
      customerEmail: 'andi@email.com',
      customerPhone: '08345678901',
      bookingDate: '2024-12-20',
      quantity: 2,
      totalPrice: 700000,
      status: 'pending',
      notes: 'Kamar double, 2 malam',
      createdAt: '2024-12-01 14:20'
    },
    {
      id: 4,
      orderNumber: 'ORD-2024-004',
      type: 'transportasi',
      itemName: 'Toyota Avanza',
      customerName: 'Dewi Lestari',
      customerEmail: 'dewi@email.com',
      customerPhone: '08456789012',
      bookingDate: '2024-12-18',
      quantity: 3,
      totalPrice: 1200000,
      status: 'confirmed',
      notes: 'Rental 3 hari dengan driver',
      createdAt: '2024-12-01 09:45'
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'destinasi': return MapPin;
      case 'kuliner': return Utensils;
      case 'hotel': return Hotel;
      case 'transportasi': return Car;
      default: return MapPin;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'destinasi': return 'bg-blue-100 text-blue-700';
      case 'kuliner': return 'bg-orange-100 text-orange-700';
      case 'hotel': return 'bg-purple-100 text-purple-700';
      case 'transportasi': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'completed': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending': return 'Menunggu';
      case 'confirmed': return 'Dikonfirmasi';
      case 'rejected': return 'Ditolak';
      case 'completed': return 'Selesai';
      default: return status;
    }
  };

  const handleUpdateStatus = (orderId: number, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    setShowDetailModal(false);
  };

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const filteredOrders = orders.filter(order => {
    const matchSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       order.itemName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = filterType === 'all' || order.type === filterType;
    const matchStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    completed: orders.filter(o => o.status === 'completed').length,
  };

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
              <h1 className="text-2xl font-bold text-gray-900">Manajemen Pesanan</h1>
              <p className="text-gray-600 text-sm">Kelola semua pesanan pelanggan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Pesanan</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Menunggu</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Dikonfirmasi</p>
                <p className="text-3xl font-bold text-blue-600">{stats.confirmed}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Selesai</p>
                <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-gray-100">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari pesanan..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
            >
              <option value="all">Semua Tipe</option>
              <option value="destinasi">Destinasi</option>
              <option value="kuliner">Kuliner</option>
              <option value="hotel">Hotel</option>
              <option value="transportasi">Transportasi</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Menunggu</option>
              <option value="confirmed">Dikonfirmasi</option>
              <option value="rejected">Ditolak</option>
              <option value="completed">Selesai</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">No. Pesanan</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Tipe</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Item</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Pelanggan</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Tanggal Booking</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => {
                  const TypeIcon = getTypeIcon(order.type);
                  return (
                    <tr key={order.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{order.orderNumber}</div>
                        <div className="text-xs text-gray-500">{order.createdAt}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-2 w-fit px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(order.type)}`}>
                          <TypeIcon className="w-4 h-4" />
                          {order.type.charAt(0).toUpperCase() + order.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{order.itemName}</div>
                        <div className="text-sm text-gray-600">Qty: {order.quantity}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{order.customerName}</div>
                        <div className="text-sm text-gray-600">{order.customerPhone}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{order.bookingDate}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        Rp {order.totalPrice.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewDetail(order)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Detail Pesanan</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Nomor Pesanan</p>
                    <p className="text-xl font-bold text-gray-900">{selectedOrder.orderNumber}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusText(selectedOrder.status)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Dibuat</p>
                    <p className="font-semibold text-gray-900">{selectedOrder.createdAt}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tanggal Booking</p>
                    <p className="font-semibold text-gray-900">{selectedOrder.bookingDate}</p>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Informasi Pelanggan
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Nama</p>
                      <p className="font-semibold text-gray-900">{selectedOrder.customerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Telepon</p>
                      <p className="font-semibold text-gray-900">{selectedOrder.customerPhone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">{selectedOrder.customerEmail}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Detail Pesanan
                </h4>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipe</span>
                    <span className="font-semibold text-gray-900 capitalize">{selectedOrder.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Item</span>
                    <span className="font-semibold text-gray-900">{selectedOrder.itemName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity</span>
                    <span className="font-semibold text-gray-900">{selectedOrder.quantity}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-blue-600 text-lg">Rp {selectedOrder.totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Catatan</h4>
                  <p className="text-gray-700 bg-gray-50 rounded-xl p-4">{selectedOrder.notes}</p>
                </div>
              )}

              {/* Actions */}
              {selectedOrder.status === 'pending' && (
                <div className="flex gap-4">
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'rejected')}
                    className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Tolak
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedOrder.id, 'confirmed')}
                    className="flex-1 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Konfirmasi
                  </button>
                </div>
              )}

              {selectedOrder.status === 'confirmed' && (
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'completed')}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Tandai Selesai
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}