"use client";

import React, { useState, useEffect } from 'react';
import { LayoutDashboard, MapPin, Utensils, Hotel, Car, Users, TrendingUp, LogOut, Menu, X, Plus } from 'lucide-react';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
    }
    window.location.href = '/admin/login';
  };

  const stats = [
    { label: 'Total Destinasi', value: '24', icon: MapPin, color: 'from-blue-500 to-blue-600', change: '+12%' },
    { label: 'Kuliner', value: '18', icon: Utensils, color: 'from-orange-500 to-orange-600', change: '+8%' },
    { label: 'Hotel', value: '15', icon: Hotel, color: 'from-purple-500 to-purple-600', change: '+15%' },
    { label: 'Transportasi', value: '32', icon: Car, color: 'from-green-500 to-green-600', change: '+5%' },
  ];

  const recentActivities = [
    { action: 'Destinasi baru ditambahkan', item: 'Bukit Holbung', time: '2 jam lalu', type: 'add' },
    { action: 'Hotel diupdate', item: 'Toledo Inn', time: '5 jam lalu', type: 'edit' },
    { action: 'Restoran dihapus', item: 'RM Sederhana', time: '1 hari lalu', type: 'delete' },
    { action: 'Transportasi ditambahkan', item: 'Toyota Avanza', time: '2 hari lalu', type: 'add' },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, url: '/admin/dashboard' },
    { id: 'orders', label: 'Pesanan', icon: TrendingUp, url: '/admin/orders' },
    { id: 'destinations', label: 'Destinasi', icon: MapPin, url: '/admin/destinations' },
    { id: 'culinary', label: 'Kuliner', icon: Utensils, url: '/admin/culinary' },
    { id: 'hotels', label: 'Hotel', icon: Hotel, url: '/admin/hotels' },
    { id: 'transport', label: 'Transportasi', icon: Car, url: '/admin/transport' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-emerald-600 to-teal-700 text-white transition-all duration-300 fixed h-full z-10`}>
        <div className="p-4 flex items-center justify-between border-b border-emerald-500">
          {sidebarOpen && <h2 className="text-xl font-bold">Admin Panel</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-emerald-700 rounded-lg transition"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveMenu(item.id);
                if (item.url) window.location.href = item.url;
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-emerald-700 transition ${
                activeMenu === item.id ? 'bg-emerald-700 border-l-4 border-white' : ''
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-emerald-500">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-emerald-700 rounded-lg transition"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 text-sm">Selamat datang kembali, Admin!</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-emerald-600 text-sm font-semibold flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Activities */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Aktivitas Terbaru</h2>
                <button className="text-emerald-600 text-sm font-semibold hover:text-emerald-700">
                  Lihat Semua
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'add' ? 'bg-green-100' :
                      activity.type === 'edit' ? 'bg-blue-100' :
                      'bg-red-100'
                    }`}>
                      <Plus className={`w-5 h-5 ${
                        activity.type === 'add' ? 'text-green-600' :
                        activity.type === 'edit' ? 'text-blue-600' :
                        'text-red-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{activity.action}</p>
                      <p className="text-emerald-600 text-sm font-semibold">{activity.item}</p>
                      <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Tambah Destinasi', icon: MapPin, color: 'blue', url: '/admin/destinations' },
                  { label: 'Tambah Kuliner', icon: Utensils, color: 'orange', url: '/admin/culinary' },
                  { label: 'Tambah Hotel', icon: Hotel, color: 'purple', url: '/admin/hotels' },
                  { label: 'Tambah Transport', icon: Car, color: 'green', url: '/admin/transport' },
                ].map((action, index) => (
                  <button
                    key={index}
                    onClick={() => window.location.href = action.url}
                    className={`p-6 rounded-xl border-2 hover:shadow-lg transition ${
                      action.color === 'blue' ? 'border-blue-200 hover:border-blue-400 hover:bg-blue-50' :
                      action.color === 'orange' ? 'border-orange-200 hover:border-orange-400 hover:bg-orange-50' :
                      action.color === 'purple' ? 'border-purple-200 hover:border-purple-400 hover:bg-purple-50' :
                      'border-green-200 hover:border-green-400 hover:bg-green-50'
                    }`}
                  >
                    <action.icon className={`w-8 h-8 mb-3 ${
                      action.color === 'blue' ? 'text-blue-600' :
                      action.color === 'orange' ? 'text-orange-600' :
                      action.color === 'purple' ? 'text-purple-600' :
                      'text-green-600'
                    }`} />
                    <p className="text-gray-900 font-semibold text-sm">{action.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}