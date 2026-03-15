<script setup lang="ts">
import { 
  CalendarDays, 
  Users, 
  QrCode, 
  Clock, 
  ShieldCheck, 
  BarChart3,
  CheckCircle,
  ArrowRight
} from "lucide-vue-next";
</script>

<template>
  <!-- Hero Section -->
  <section class="bg-linear-to-br from-teal-600 to-teal-800 text-white">
    <div class="mx-auto px-4 py-16 sm:px-6 lg:px-24 lg:py-24">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div class="text-center lg:text-left">
          <h1 class="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            WeSign
          </h1>
          <p class="mt-2 text-xl font-medium text-teal-100">
            Sistem Registrasi Tamu & Pengunjung Acara
          </p>
          <p class="mt-6 text-lg leading-relaxed text-teal-50">
            Solusi modern untuk mendaftarkan dan mengelola pengunjung pada acara Anda. 
            Cepat, aman, dan efisien dengan teknologi QR Code untuk check-in instan.
          </p>
          <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="/register"
              class="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-teal-700 shadow-lg transition hover:bg-teal-50 hover:shadow-xl"
            >
              Daftar Sekarang
              <ArrowRight class="h-4 w-4" />
            </a>
            <a
              href="#features"
              class="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>
        <div class="relative">
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800"
            class="rounded-2xl shadow-2xl"
            alt="Event Registration"
          />
          <div class="absolute -bottom-6 -left-6 rounded-xl bg-white p-4 shadow-lg">
            <div class="flex items-center gap-3">
              <div class="rounded-full bg-green-100 p-2">
                <CheckCircle class="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p class="text-sm font-semibold text-gray-900">500+</p>
                <p class="text-xs text-gray-500">Tamu Terdaftar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Stats Section -->
  <section class="bg-gray-50 py-12">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div class="text-center">
          <p class="text-3xl font-bold text-teal-600">1000+</p>
          <p class="mt-1 text-sm text-gray-600">Acara Terselenggara</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-teal-600">50K+</p>
          <p class="mt-1 text-sm text-gray-600">Tamu Terdaftar</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-teal-600">98%</p>
          <p class="mt-1 text-sm text-gray-600">Kepuasan Pengguna</p>
        </div>
        <div class="text-center">
          <p class="text-3xl font-bold text-teal-600"><5s</p>
          <p class="mt-1 text-sm text-gray-600">Waktu Check-in</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="py-16 lg:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Fitur Unggulan
        </h2>
        <p class="mt-4 text-lg text-gray-600">
          Semua yang Anda butuhkan untuk mengelola registrasi tamu dengan mudah
        </p>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <!-- Feature 1 -->
        <div class="rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-100 transition hover:shadow-xl">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100">
            <CalendarDays class="h-6 w-6 text-teal-600" />
          </div>
          <h3 class="mt-4 text-lg font-semibold text-gray-900">Manajemen Acara</h3>
          <p class="mt-2 text-gray-600">
            Buat dan kelola berbagai acara dengan mudah. Tentukan kapasitas, jadwal, dan detail acara Anda.
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-100 transition hover:shadow-xl">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
            <Users class="h-6 w-6 text-blue-600" />
          </div>
          <h3 class="mt-4 text-lg font-semibold text-gray-900">Registrasi Online</h3>
          <p class="mt-2 text-gray-600">
            Tamu dapat mendaftar secara online kapan saja dan di mana saja melalui formulir digital.
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-100 transition hover:shadow-xl">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
            <QrCode class="h-6 w-6 text-purple-600" />
          </div>
          <h3 class="mt-4 text-lg font-semibold text-gray-900">QR Code Check-in</h3>
          <p class="mt-2 text-gray-600">
            Check-in cepat dengan QR Code. Cukup scan dan tamu siap masuk dalam hitungan detik.
          </p>
        </div>

        <!-- Feature 4 -->
        <div class="rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-100 transition hover:shadow-xl">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
            <Clock class="h-6 w-6 text-orange-600" />
          </div>
          <h3 class="mt-4 text-lg font-semibold text-gray-900">Real-time Tracking</h3>
          <p class="mt-2 text-gray-600">
            Pantau kedatangan tamu secara real-time. Dapatkan notifikasi instan saat tamu check-in.
          </p>
        </div>

        <!-- Feature 5 -->
        <div class="rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-100 transition hover:shadow-xl">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
            <ShieldCheck class="h-6 w-6 text-green-600" />
          </div>
          <h3 class="mt-4 text-lg font-semibold text-gray-900">Keamanan Data</h3>
          <p class="mt-2 text-gray-600">
            Data tamu tersimpan dengan aman dan terenkripsi. Privasi terjamin sesuai standar.
          </p>
        </div>

        <!-- Feature 6 -->
        <div class="rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-100 transition hover:shadow-xl">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100">
            <BarChart3 class="h-6 w-6 text-pink-600" />
          </div>
          <h3 class="mt-4 text-lg font-semibold text-gray-900">Laporan & Analitik</h3>
          <p class="mt-2 text-gray-600">
            Dapatkan laporan lengkap dan analitik kehadiran untuk evaluasi acara Anda.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- How It Works Section -->
  <section class="bg-gray-50 py-16 lg:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Cara Kerja
        </h2>
        <p class="mt-4 text-lg text-gray-600">
          Tiga langkah mudah untuk memulai
        </p>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- Step 1 -->
        <div class="relative text-center">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-600 text-2xl font-bold text-white">
            1
          </div>
          <h3 class="mt-6 text-xl font-semibold text-gray-900">Buat Acara</h3>
          <p class="mt-3 text-gray-600">
            Daftarkan acara Anda dan tentukan detail seperti tanggal, lokasi, dan kapasitas tamu.
          </p>
        </div>

        <!-- Connector -->
        <div class="hidden md:absolute md:left-1/3 md:top-24 md:block md:w-1/3 md:border-t-2 md:border-dashed md:border-gray-300"></div>

        <!-- Step 2 -->
        <div class="relative text-center">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-600 text-2xl font-bold text-white">
            2
          </div>
          <h3 class="mt-6 text-xl font-semibold text-gray-900">Bagikan Link</h3>
          <p class="mt-3 text-gray-600">
            Sebarkan link registrasi ke calon tamu melalui email, sosial media, atau undangan.
          </p>
        </div>

        <!-- Step 3 -->
        <div class="relative text-center">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-600 text-2xl font-bold text-white">
            3
          </div>
          <h3 class="mt-6 text-xl font-semibold text-gray-900">Tamu Check-in</h3>
          <p class="mt-3 text-gray-600">
            Tamu mendaftar online dan mendapat QR Code. Scan QR Code saat check-in di acara.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="bg-teal-700 py-16 lg:py-20">
    <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Siap Mengelola Acara Anda?
      </h2>
      <p class="mt-4 text-lg text-teal-100">
        Bergabunglah dengan ribuan penyelenggara acara yang telah menggunakan WeSign 
        untuk pengalaman registrasi tamu yang lebih baik.
      </p>
      <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
        <a
          href="/register"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-semibold text-teal-700 shadow-lg transition hover:bg-teal-50 hover:shadow-xl"
        >
          Mulai Gratis Sekarang
          <ArrowRight class="h-5 w-5" />
        </a>
        <a
          href="/contact"
          class="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
        >
          Hubungi Kami
        </a>
      </div>
    </div>
  </section>
</template>
