<script setup lang="ts">
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Calendar,
} from "lucide-vue-next";

const stats = [
  {
    title: "Total Dokumen",
    value: "24",
    icon: FileText,
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    title: "Menunggu Tanda Tangan",
    value: "8",
    icon: Clock,
    color: "bg-yellow-500",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-600",
  },
  {
    title: "Selesai",
    value: "14",
    icon: CheckCircle,
    color: "bg-green-500",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
  },
  {
    title: "Ditolak",
    value: "2",
    icon: XCircle,
    color: "bg-red-500",
    bgColor: "bg-red-50",
    textColor: "text-red-600",
  },
];

const recentDocuments = [
  {
    id: 1,
    name: "Kontrak Kerja PT ABC",
    status: "Menunggu",
    date: "17 Feb 2026",
    statusColor: "bg-yellow-100 text-yellow-700",
  },
  {
    id: 2,
    name: "Perjanjian Kerjasama XYZ",
    status: "Selesai",
    date: "16 Feb 2026",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    id: 3,
    name: "Surat Kuasa Mandiri",
    status: "Selesai",
    date: "15 Feb 2026",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    id: 4,
    name: "Dokumen Legal PT DEF",
    status: "Ditolak",
    date: "14 Feb 2026",
    statusColor: "bg-red-100 text-red-700",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Deadline Tanda Tangan Kontrak ABC",
    date: "18 Feb 2026",
    time: "14:00",
  },
  {
    id: 2,
    title: "Meeting Review Dokumen",
    date: "19 Feb 2026",
    time: "10:00",
  },
  {
    id: 3,
    title: "Pelatihan E-Signature",
    date: "20 Feb 2026",
    time: "09:00",
  },
];
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p class="text-gray-500 mt-1">Selamat datang kembali, John Doe!</p>
      </div>
      <a
        href="/documents/create"
        class="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-teal-700"
      >
        <FileText class="h-4 w-4" />
        Buat Dokumen Baru
      </a>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">{{ stat.title }}</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ stat.value }}</p>
          </div>
          <div :class="[stat.bgColor, 'p-3 rounded-lg']">
            <component :is="stat.icon" :class="[stat.textColor, 'h-6 w-6']" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Documents -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="p-6 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">Dokumen Terbaru</h2>
            <a
              href="/documents"
              class="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              Lihat Semua
            </a>
          </div>
        </div>
        <div class="divide-y divide-gray-100">
          <div
            v-for="doc in recentDocuments"
            :key="doc.id"
            class="p-4 hover:bg-gray-50 transition cursor-pointer"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-gray-100 rounded-lg">
                  <FileText class="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ doc.name }}</p>
                  <p class="text-sm text-gray-500">{{ doc.date }}</p>
                </div>
              </div>
              <span
                :class="[
                  doc.statusColor,
                  'px-3 py-1 rounded-full text-xs font-medium',
                ]"
              >
                {{ doc.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Events -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="p-6 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">Acara Mendatang</h2>
            <a
              href="/events"
              class="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >
              Lihat Semua
            </a>
          </div>
        </div>
        <div class="divide-y divide-gray-100">
          <div
            v-for="event in upcomingEvents"
            :key="event.id"
            class="p-4 hover:bg-gray-50 transition cursor-pointer"
          >
            <div class="flex items-start gap-3">
              <div class="p-2 bg-teal-50 rounded-lg">
                <Calendar class="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ event.title }}</p>
                <p class="text-sm text-gray-500 mt-1">
                  {{ event.date }} • {{ event.time }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-linear-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 class="text-lg font-semibold">Mulai Menggunakan WeSign</h3>
          <p class="text-teal-100 mt-1">
            Pelajari cara membuat dan mengelola dokumen digital dengan mudah.
          </p>
        </div>
        <a
          href="/tutorial"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-teal-600 shadow transition hover:bg-teal-50"
        >
          <TrendingUp class="h-4 w-4" />
          Lihat Tutorial
        </a>
      </div>
    </div>
  </div>
</template>
