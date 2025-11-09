"use client";

import React, { useState } from "react";
import {
  Star,
  MapPin,
  Camera,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// ✅ Tipe data untuk gambar
interface UploadedImage {
  id: number;
  url: string;
  name: string;
}

// ✅ Tipe data untuk error form
interface ReviewErrors {
  rating?: string;
  destination?: string;
  comment?: string;
}

export default function WriteReviewPage() {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [destination, setDestination] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<ReviewErrors>({});

  const popularDestinations: string[] = [
    "Bali",
    "Jakarta",
    "Yogyakarta",
    "Bandung",
    "Lombok",
    "Surabaya",
    "Tokyo",
    "Singapore",
    "Bangkok",
    "Paris",
  ];

  // ✅ Upload gambar (maks 5)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages: UploadedImage[] = files
      .slice(0, 5 - images.length)
      .map((file) => ({
        id: Date.now() + Math.random(),
        url: URL.createObjectURL(file),
        name: file.name,
      }));

    setImages((prev) => [...prev, ...newImages]);
  };

  // ✅ Hapus gambar
  const removeImage = (id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  // ✅ Validasi form sebelum submit
  const validateForm = (): boolean => {
    const newErrors: ReviewErrors = {};
    if (rating === 0) newErrors.rating = "Pilih rating terlebih dahulu";
    if (!destination.trim()) newErrors.destination = "Destinasi wajib diisi";
    if (comment.trim().length < 20)
      newErrors.comment = "Review minimal 20 karakter";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle submit
  const handleSubmit = () => {
    if (validateForm()) {
      setTimeout(() => {
        setSubmitted(true);
        setTimeout(() => {
          setRating(0);
          setDestination("");
          setComment("");
          setImages([]);
          setSubmitted(false);
          setErrors({});
        }, 3000);
      }, 500);
    }
  };

  // ✅ Tampilan setelah submit
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-3xl p-12 shadow-2xl text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Review Berhasil Dikirim!
            </h2>
            <p className="text-gray-600 mb-6">
              Terima kasih atas kontribusi Anda. Review Anda akan membantu
              traveler lain dalam merencanakan perjalanan mereka.
            </p>
            <div className="flex gap-1 justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < rating ? "text-amber-500 fill-amber-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition"
            >
              Tulis Review Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Tampilan utama (form review)
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tulis Review
          </h1>
          <p className="text-lg text-gray-600">
            Bagikan pengalaman perjalanan Anda dengan traveler lainnya
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-green-100">
          {/* Rating */}
          <div className="mb-8 text-center">
            <label className="block text-lg font-bold text-gray-900 mb-4">
              Berikan Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3 justify-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transform transition hover:scale-110"
                >
                  <Star
                    className={`w-12 h-12 ${
                      star <= (hoverRating || rating)
                        ? "text-amber-500 fill-amber-500"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <span className="text-gray-600 font-semibold">
                {rating === 1 && "Sangat Buruk"}
                {rating === 2 && "Buruk"}
                {rating === 3 && "Cukup"}
                {rating === 4 && "Baik"}
                {rating === 5 && "Sangat Baik"}
              </span>
            )}
            {errors.rating && (
              <div className="flex items-center gap-2 text-red-600 text-sm mt-2 justify-center">
                <AlertCircle className="w-4 h-4" />
                {errors.rating}
              </div>
            )}
          </div>

          {/* Destination */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-gray-900 mb-3">
              Destinasi <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Masukkan nama destinasi"
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:outline-none focus:border-emerald-500 transition ${
                  errors.destination ? "border-red-300" : "border-gray-200"
                }`}
              />
            </div>
            {errors.destination && (
              <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
                <AlertCircle className="w-4 h-4" />
                {errors.destination}
              </div>
            )}

            {/* Popular Destinations */}
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">Destinasi Populer:</p>
              <div className="flex flex-wrap gap-2">
                {popularDestinations.map((dest) => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => setDestination(dest)}
                    className="px-4 py-2 bg-gradient-to-r from-green-50 to-teal-50 text-emerald-700 rounded-full text-sm font-semibold hover:from-emerald-100 hover:to-teal-100 transition border border-green-200"
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Comment */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-gray-900 mb-3">
              Review Anda <span className="text-red-500">*</span>
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ceritakan pengalaman perjalanan Anda... (minimal 20 karakter)"
              rows={6}
              className={`w-full px-4 py-4 border-2 rounded-xl focus:outline-none focus:border-emerald-500 transition resize-none ${
                errors.comment ? "border-red-300" : "border-gray-200"
              }`}
            />
            <div className="flex justify-between items-center mt-2">
              <div>
                {errors.comment && (
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.comment}
                  </div>
                )}
              </div>
              <span
                className={`text-sm ${
                  comment.length < 20 ? "text-gray-400" : "text-emerald-600"
                }`}
              >
                {comment.length} karakter
              </span>
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-8">
            <label className="block text-lg font-bold text-gray-900 mb-3">
              Tambah Foto (Opsional)
            </label>
            <p className="text-sm text-gray-600 mb-4">Maksimal 5 foto</p>

            {images.length < 5 && (
              <label className="block w-full p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="text-center">
                  <Camera className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-600 font-semibold mb-1">
                    Klik untuk upload foto
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, JPEG (Max 5MB per foto)
                  </p>
                </div>
              </label>
            )}

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="grid grid-cols-5 gap-3 mt-4">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.url}
                      alt={image.name}
                      className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition transform hover:scale-105"
            >
              Kirim Review
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="font-bold text-gray-900 mb-2">
            💡 Tips Menulis Review yang Baik:
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Ceritakan pengalaman spesifik yang Anda alami</li>
            <li>• Berikan informasi yang bermanfaat untuk traveler lain</li>
            <li>• Sertakan foto untuk membuat review lebih menarik</li>
            <li>• Bersikap jujur dan objektif dalam memberikan penilaian</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
